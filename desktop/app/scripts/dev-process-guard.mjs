/* eslint-disable @typescript-eslint/explicit-function-return-type */
// Process bookkeeping for `pnpm dev`: which wrapper owns a checkout's dev app, which Electron
// processes are true strays, and a durable record of why a dev app stopped.
//
// Every `pnpm dev` wrapper claims apps/desktop/.dev/dev.pid in its own checkout while it runs.
// The claim is per checkout, not per HOME, so a fresh-home run and a normal run of the same
// checkout still see each other. A recorded pid counts only while that process runs
// `scripts/dev.mjs` from this checkout's apps/desktop, so a stale or reused pid owns nothing.
// Electron processes that descend from another live wrapper are never strays. Each signal or exit
// is appended to dev-exits.log in the dev sandbox, so the next unexpected quit names its cause.
import { execFileSync, execSync } from 'node:child_process'
import {
  appendFileSync,
  closeSync,
  linkSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

import { devSandboxSlug } from './dev-label.mjs'

export const WRAPPER_MARKER = 'scripts/dev.mjs'

/** The checkout's dev sandbox directory (~/.blume/.dev/<slug>), where logs are kept. */
export function devSandboxDir(projectRoot, home = homedir()) {
  return join(home, '.blume', '.dev', devSandboxSlug(projectRoot))
}

/** The per-checkout ownership record, independent of HOME. */
export function wrapperRecordPath(projectRoot) {
  return join(projectRoot, '.dev', 'dev.pid')
}

/** The marker the wrapper writes once electron-vite is running. */
export function launchedRecordPath(projectRoot) {
  return join(projectRoot, '.dev', 'dev.launched')
}

/** Parse `ps -axo pid=,ppid=,command=` into a pid → { ppid, command } map. */
export function parseProcessTable(output) {
  const table = new Map()
  for (const line of output.split('\n')) {
    const match = line.match(/^\s*(\d+)\s+(\d+)\s+(.*)$/)
    if (match) table.set(Number(match[1]), { ppid: Number(match[2]), command: match[3] })
  }
  return table
}

export function readProcessTable() {
  try {
    return parseProcessTable(execSync('ps -axo pid=,ppid=,command=', { encoding: 'utf-8' }))
  } catch {
    return new Map()
  }
}

/** A process's working directory, or undefined when it cannot be read. */
export function processCwd(pid) {
  try {
    const out = execFileSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore']
    })
    const line = out.split('\n').find((entry) => entry.startsWith('n'))
    return line ? line.slice(1) : undefined
  } catch {
    return undefined
  }
}

/**
 * Whether `pid` is a live dev wrapper of this checkout: it runs `scripts/dev.mjs` and its working
 * directory is this checkout's apps/desktop. An unreadable working directory counts as live, so
 * the guard errs towards refusing and never towards killing.
 */
export function isLiveWrapper(pid, { projectRoot, table, cwdOf = processCwd }) {
  if (!Number.isInteger(pid) || pid <= 0) return false
  const entry = table.get(pid)
  if (!entry || !entry.command.includes(WRAPPER_MARKER)) return false
  const cwd = cwdOf(pid)
  return cwd === undefined || cwd === projectRoot
}

/** Whether `pid` is an ancestor of (or is) `descendant` in the table. */
function descendsFrom(descendant, pid, table) {
  const seen = new Set()
  for (
    let current = descendant;
    current && !seen.has(current);
    current = table.get(current)?.ppid
  ) {
    if (current === pid) return true
    seen.add(current)
  }
  return false
}

/**
 * Split this checkout's Electron processes into strays (safe to kill) and ones owned by another
 * live wrapper (never killed). Matching is unchanged from before: the command line must reference
 * this checkout's app path.
 */
export function classifyElectronProcesses(table, { projectRoot, selfPid, ownerPid }) {
  const strays = []
  const owned = []
  for (const [pid, { command }] of table) {
    if (pid === selfPid) continue
    if (!command.includes(projectRoot) || !/Electron(\.app|\s+Helper)/.test(command)) continue
    if (ownerPid && descendsFrom(pid, ownerPid, table)) owned.push({ pid, command })
    else strays.push({ pid, command })
  }
  return { strays, owned }
}

function readPid(path) {
  try {
    const pid = Number(readFileSync(path, 'utf8').trim())
    return Number.isInteger(pid) && pid > 0 ? pid : null
  } catch {
    return null
  }
}

export function readRecordedWrapper(projectRoot) {
  return readPid(wrapperRecordPath(projectRoot))
}

/** The live wrapper recorded for this checkout, unless it is `selfPid`. */
export function liveWrapper(projectRoot, { selfPid, table = readProcessTable(), cwdOf } = {}) {
  const pid = readRecordedWrapper(projectRoot)
  if (pid === null || pid === selfPid) return null
  return isLiveWrapper(pid, { projectRoot, table, cwdOf }) ? pid : null
}

// Replacing a stale record takes milliseconds, so a reclaim lock older than this was left by a
// killed wrapper.
const RECLAIM_LOCK_STALE_MS = 10_000

/**
 * Remove a stale record under a short reclaim lock, re-reading it first: only a wrapper holding
 * the lock removes a record, and a live owner's record is never removed by anyone but that owner,
 * so the re-read cannot go stale before the removal.
 */
function reclaimStale(projectRoot, { table, cwdOf }) {
  const path = wrapperRecordPath(projectRoot)
  const lock = `${path}.reclaim`
  let fd
  try {
    fd = openSync(lock, 'wx')
  } catch (error) {
    if (error?.code !== 'EEXIST') throw error
    try {
      if (Date.now() - statSync(lock).mtimeMs > RECLAIM_LOCK_STALE_MS) rmSync(lock, { force: true })
    } catch {
      /* already gone */
    }
    return
  }
  try {
    const owner = readPid(path)
    if (owner === null || !isLiveWrapper(owner, { projectRoot, table, cwdOf }))
      rmSync(path, { force: true })
  } finally {
    closeSync(fd)
    rmSync(lock, { force: true })
  }
}

/**
 * Atomically claim this checkout's dev app for `pid`. A record whose process is not a live
 * wrapper of this checkout is replaced under the reclaim lock; a live one is returned as the owner
 * and left alone.
 */
export function claimWrapper(projectRoot, pid, { table = readProcessTable(), cwdOf } = {}) {
  const path = wrapperRecordPath(projectRoot)
  mkdirSync(join(projectRoot, '.dev'), { recursive: true })
  const pending = `${path}.${pid}`
  writeFileSync(pending, `${pid}\n`)
  try {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      try {
        // link() fails if a record exists, so two wrappers cannot both create it.
        linkSync(pending, path)
        return { ok: true }
      } catch (error) {
        if (error?.code !== 'EEXIST') throw error
        const owner = readPid(path)
        if (owner === pid) return { ok: true }
        if (owner !== null && isLiveWrapper(owner, { projectRoot, table, cwdOf }))
          return { ok: false, owner }
        reclaimStale(projectRoot, { table, cwdOf })
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25)
      }
    }
    return { ok: false, owner: readPid(path) }
  } finally {
    rmSync(pending, { force: true })
  }
}

/** Every live descendant of `pid` in the table, deepest first. */
export function descendantsOf(pid, table) {
  const children = new Map()
  for (const [child, { ppid }] of table) {
    if (!children.has(ppid)) children.set(ppid, [])
    children.get(ppid).push(child)
  }
  const out = []
  const walk = (parent) => {
    for (const child of children.get(parent) ?? []) {
      walk(child)
      out.push(child)
    }
  }
  walk(pid)
  return out
}

/** Remove the claim and launch marker only while they still name `pid`. */
export function releaseWrapper(projectRoot, pid) {
  if (readPid(launchedRecordPath(projectRoot)) === pid)
    rmSync(launchedRecordPath(projectRoot), { force: true })
  if (readRecordedWrapper(projectRoot) === pid)
    rmSync(wrapperRecordPath(projectRoot), { force: true })
}

export function markLaunched(projectRoot, pid) {
  writeFileSync(launchedRecordPath(projectRoot), `${pid}\n`)
}

export function readLaunched(projectRoot) {
  return readPid(launchedRecordPath(projectRoot))
}

/** Describe the parent process, so a signal record says who was above the wrapper. */
export function describeParent(table, ppid) {
  const parent = table.get(ppid)
  return parent ? `${ppid} ${parent.command.slice(0, 160)}` : `${ppid} (gone)`
}

/** Append one JSON line to dev-exits.log; bookkeeping must never break the dev run. */
export function appendExitRecord(sandboxDir, record) {
  try {
    mkdirSync(sandboxDir, { recursive: true })
    appendFileSync(
      join(sandboxDir, 'dev-exits.log'),
      `${JSON.stringify({ at: new Date().toISOString(), ...record })}\n`
    )
  } catch {
    /* best effort */
  }
}
