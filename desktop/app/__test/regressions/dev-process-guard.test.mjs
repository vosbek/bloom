/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import {
  appendExitRecord,
  claimWrapper,
  descendantsOf,
  classifyElectronProcesses,
  devSandboxDir,
  isLiveWrapper,
  liveWrapper,
  markLaunched,
  parseProcessTable,
  readLaunched,
  readRecordedWrapper,
  releaseWrapper,
  wrapperRecordPath
} from '../../scripts/dev-process-guard.mjs'

const ROOT = '/work/wt-a/apps/desktop'
const ELECTRON = '/work/wt-a/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron'
const HELPER = `${ELECTRON.replace('MacOS/Electron', 'Frameworks/Electron Helper.app/Contents/MacOS/Electron Helper')} --type=gpu-process --app-path=${ROOT}`

const tempDirs = []
afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})
const tempDir = () => {
  const dir = mkdtempSync(join(tmpdir(), 'blume-dev-guard-'))
  tempDirs.push(dir)
  return dir
}

// pid ppid command: wrapper 100 → electron-vite 101 → Electron 102 → helper 103; a stray 200
// whose wrapper is gone (reparented to launchd); another checkout's Electron 300; the root
// `pnpm dev` launcher 500, whose command also contains scripts/dev.mjs.
const table = parseProcessTable(
  [
    '  100   500 node ./scripts/dev.mjs',
    '  101   100 node /work/wt-a/node_modules/.bin/electron-vite dev',
    `  102   101 ${ELECTRON} ${ROOT}`,
    `  103   102 ${HELPER}`,
    `  200     1 ${ELECTRON} ${ROOT}`,
    `  300     1 /work/wt-b/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron /work/wt-b/apps/desktop`,
    '  400     1 /usr/bin/some-daemon',
    '  500     1 node scripts/dev.mjs'
  ].join('\n')
)
const cwds = { 100: ROOT, 500: '/work/wt-a' }
const cwdOf = (pid) => cwds[pid]

describe('dev process guard', () => {
  it('keeps logs in the HOME sandbox and the ownership claim in the checkout', () => {
    expect(devSandboxDir(ROOT, '/home/u')).toBe('/home/u/.blume/.dev/work_wt-a_apps_desktop')
    expect(wrapperRecordPath(ROOT)).toBe('/work/wt-a/apps/desktop/.dev/dev.pid')
  })

  it('counts a pid as a live wrapper only while it runs dev.mjs from this checkout', () => {
    expect(isLiveWrapper(100, { projectRoot: ROOT, table, cwdOf })).toBe(true)
    // The root launcher's command also contains scripts/dev.mjs, but it runs elsewhere.
    expect(isLiveWrapper(500, { projectRoot: ROOT, table, cwdOf })).toBe(false)
    expect(isLiveWrapper(400, { projectRoot: ROOT, table, cwdOf })).toBe(false)
    expect(isLiveWrapper(555, { projectRoot: ROOT, table, cwdOf })).toBe(false)
    // An unreadable working directory errs towards refusing, never towards killing.
    expect(isLiveWrapper(100, { projectRoot: ROOT, table, cwdOf: () => undefined })).toBe(true)
  })

  it("never classifies another live wrapper's app as a stray", () => {
    const { strays, owned } = classifyElectronProcesses(table, {
      projectRoot: ROOT,
      selfPid: 999,
      ownerPid: 100
    })
    expect(owned.map(({ pid }) => pid).sort()).toEqual([102, 103])
    expect(strays.map(({ pid }) => pid)).toEqual([200])
  })

  it('without a live owner, every Electron process of this checkout is a stray, and no other', () => {
    const { strays, owned } = classifyElectronProcesses(table, {
      projectRoot: ROOT,
      selfPid: 999,
      ownerPid: null
    })
    expect(owned).toEqual([])
    expect(strays.map(({ pid }) => pid).sort()).toEqual([102, 103, 200])
  })

  it('claims a checkout once, refuses a second wrapper and replaces a stale record', () => {
    const root = join(tempDir(), 'apps', 'desktop')
    const live = parseProcessTable(
      ['  100 1 node ./scripts/dev.mjs', '  700 1 node ./scripts/dev.mjs'].join('\n')
    )
    const here = () => root
    expect(claimWrapper(root, 100, { table: live, cwdOf: here })).toEqual({ ok: true })
    expect(claimWrapper(root, 700, { table: live, cwdOf: here })).toEqual({ ok: false, owner: 100 })
    expect(liveWrapper(root, { selfPid: 700, table: live, cwdOf: here })).toBe(100)
    // The owner is gone (or its pid now runs something else): the record is replaced.
    const after = parseProcessTable(
      ['  100 1 /usr/bin/other', '  700 1 node ./scripts/dev.mjs'].join('\n')
    )
    expect(claimWrapper(root, 700, { table: after, cwdOf: here })).toEqual({ ok: true })
    expect(readRecordedWrapper(root)).toBe(700)
  })

  it('leaves a live record alone even when the reclaim lock is free, and clears an old lock', () => {
    const root = join(tempDir(), 'apps', 'desktop')
    const live = parseProcessTable(
      ['  100 1 node ./scripts/dev.mjs', '  700 1 node ./scripts/dev.mjs'].join('\n')
    )
    const here = () => root
    // A stale record and a reclaim lock left by a killed wrapper long ago.
    mkdirSync(join(root, '.dev'), { recursive: true })
    writeFileSync(wrapperRecordPath(root), '4242\n')
    writeFileSync(`${wrapperRecordPath(root)}.reclaim`, '')
    const old = new Date(Date.now() - 60_000)
    utimesSync(`${wrapperRecordPath(root)}.reclaim`, old, old)
    expect(claimWrapper(root, 100, { table: live, cwdOf: here })).toEqual({ ok: true })
    // Now the record is live: another wrapper is refused and nothing is reclaimed.
    expect(claimWrapper(root, 700, { table: live, cwdOf: here })).toEqual({ ok: false, owner: 100 })
    expect(readRecordedWrapper(root)).toBe(100)
  })

  it("lists a wrapper's whole process tree, deepest first", () => {
    expect(descendantsOf(100, table)).toEqual([103, 102, 101])
    expect(descendantsOf(400, table)).toEqual([])
  })

  it('is independent of HOME: a run with another HOME still sees the claim', () => {
    const root = join(tempDir(), 'apps', 'desktop')
    const live = parseProcessTable('  100 1 node ./scripts/dev.mjs')
    claimWrapper(root, 100, { table: live, cwdOf: () => root })
    const previousHome = process.env.HOME
    process.env.HOME = tempDir()
    try {
      expect(liveWrapper(root, { selfPid: 700, table: live, cwdOf: () => root })).toBe(100)
    } finally {
      process.env.HOME = previousHome
    }
  })

  it('releases the claim and launch marker only while they still name this wrapper', () => {
    const root = join(tempDir(), 'apps', 'desktop')
    mkdirSync(join(root, '.dev'), { recursive: true })
    writeFileSync(wrapperRecordPath(root), '100\n')
    markLaunched(root, 100)
    releaseWrapper(root, 101)
    expect(readRecordedWrapper(root)).toBe(100)
    expect(readLaunched(root)).toBe(100)
    releaseWrapper(root, 100)
    expect(readRecordedWrapper(root)).toBeNull()
    expect(readLaunched(root)).toBeNull()
  })

  it('appends one JSON record per stop', () => {
    const dir = tempDir()
    appendExitRecord(dir, { event: 'dev-stopped', signal: 'SIGHUP', phase: 'pre-launch' })
    appendExitRecord(dir, { event: 'dev-stopped', childExit: 0 })
    const lines = readFileSync(join(dir, 'dev-exits.log'), 'utf8').trim().split('\n')
    expect(lines.map((line) => JSON.parse(line).event)).toEqual(['dev-stopped', 'dev-stopped'])
    expect(JSON.parse(lines[0]).signal).toBe('SIGHUP')
  })
})
