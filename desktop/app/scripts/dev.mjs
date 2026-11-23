#!/usr/bin/env node
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// scripts/dev.mjs
//
// Wraps `electron-vite dev` so the macOS Dock entry never lingers after a
// dev session. The in-process JS handlers in src/main/index.ts cover graceful
// shutdown paths (SIGTERM/SIGINT/uncaught exceptions), but they can't catch
// SIGKILL or native crashes — and when Electron's main process dies that way,
// the renderer/GPU/Helper subprocesses survive and macOS keeps "Electron"
// pinned in the Dock until something kills them.
//
// This wrapper:
//   1. Sweeps stray Electron processes from prior dev runs of THIS project
//      before launching.
//   2. Forwards signals to the electron-vite child and re-sweeps on exit
//      so Ctrl+C / kill of `pnpm dev` always leaves a clean Dock.
//   3. Refuses to start while another `pnpm dev` of this checkout runs, never
//      kills that wrapper's app, and logs every signal and exit to
//      ~/.blume/.dev/<slug>/dev-exits.log (see dev-process-guard.mjs).
//
// Scoped by absolute project path, so it never touches Electron apps from
// unrelated checkouts/worktrees. To keep a dev app alive after the agent
// session or terminal that started it ends, use `pnpm dev:detached`.

import { createHash } from 'node:crypto'
import { spawn, execFileSync } from 'node:child_process'
import { existsSync, lstatSync, readFileSync, realpathSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { constants as osConstants, homedir } from 'node:os'
import { dirname, isAbsolute, join, resolve } from 'node:path'

import { replaceWorkspacePackageLink } from '../../../scripts/link-workspace-packages.mjs'
import { findWorkspacePackages } from '../../../scripts/workspace-packages.mjs'
import {
  devLabelDatabaseCandidates,
  devRunnerArguments,
  devSandboxSlug,
  parseDevLauncherArguments,
  resolveDevLabel,
  resolveLaunchPath
} from './dev-label.mjs'
import { applyPullRequestPreviewEnvironment } from './previewEnvironment.mjs'
import { configureRecordedLedger } from './recordedLedgerEnvironment.mjs'
import {
  appendExitRecord,
  claimWrapper,
  classifyElectronProcesses,
  describeParent,
  devSandboxDir,
  liveWrapper,
  markLaunched,
  readProcessTable,
  releaseWrapper
} from './dev-process-guard.mjs'
import {
  devAccountSessionDatabaseCandidates,
  findDevAccountSessionSource,
  validateDevAccountSession
} from './dev-account-session.mjs'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceRoot = resolve(projectRoot, '../..')
const devSlug = devSandboxSlug(projectRoot)
const defaultElectronUserDataDir = join(homedir(), '.blume', '.dev', devSlug, 'electron-user-data')
const electronUserDataDir = process.env.ELECTRON_USER_DATA_DIR ?? defaultElectronUserDataDir

// Claim this checkout's dev app before anything else. A second `pnpm dev` of the same checkout
// (also one with another HOME) used to share its app and silently quit the first one's Electron
// in the stray sweep; now it refuses and says how to stop the running one.
const devSandbox = devSandboxDir(projectRoot)
const claim = claimWrapper(projectRoot, process.pid)
if (!claim.ok) {
  console.error(
    `[pre-dev] another pnpm dev (pid ${claim.owner}) is already running this checkout's dev app.\n` +
      `[pre-dev] Electron web tests and dev:e2e: run them from another worktree; do not stop that app, ` +
      `someone may be using it.\n` +
      `[pre-dev] Restarting your own app: stop it first (pnpm dev:detached --stop, or kill ${claim.owner}).`
  )
  process.exit(1)
}

// Every stop is recorded from here on, including signals and exits before Electron launches.
// SIGKILL cannot be observed; a missing record after a quit therefore means SIGKILL or a crash.
let child = null
let exitRecorded = false
function recordStop(reason) {
  if (exitRecorded) return
  exitRecorded = true
  appendExitRecord(devSandbox, {
    event: 'dev-stopped',
    ...reason,
    wrapperPid: process.pid,
    parent: describeParent(readProcessTable(), process.ppid)
  })
}
// A signal names who stopped the app: SIGHUP is a closed terminal or an ended session, SIGTERM a
// kill or a stopped preview server.
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    console.warn(
      `[dev] received ${signal}; stopping the dev app (record in ${devSandbox}/dev-exits.log)`
    )
    if (child) void finalize(0, { signal })
    else {
      recordStop({ signal, phase: 'pre-launch' })
      process.exit(128 + (osConstants.signals[signal] ?? 0))
    }
  })
}
process.on('exit', (code) => {
  recordStop({ exitCode: code })
  releaseWrapper(projectRoot, process.pid)
})

function findPrimaryWorktreeRoot() {
  try {
    const out = execFileSync('git', ['worktree', 'list', '--porcelain'], {
      cwd: workspaceRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    })
    for (const line of out.split(/\r?\n/)) {
      const match = line.match(/^worktree (.+)$/)
      if (match) return resolve(match[1])
    }
  } catch {
    /* Not a git checkout, or git is unavailable. */
  }
  return workspaceRoot
}

const primaryWorkspaceRoot = findPrimaryWorktreeRoot()

function findWorkspacePackageDirs() {
  const packages = findWorkspacePackages(
    ['packages', 'apps', 'services'].map((base) => join(workspaceRoot, base))
  )
  return new Map([...packages].map(([name, { dir }]) => [name, dir]))
}

function ensureWorkspacePackageLinks() {
  const nodeModules = join(workspaceRoot, 'node_modules')
  if (!existsSync(nodeModules)) {
    throw new Error('node_modules is missing; run pnpm install before pnpm dev')
  }
  if (lstatSync(nodeModules).isSymbolicLink()) {
    throw new Error(
      `node_modules is shared through a symlink (${realpathSync(nodeModules)}). ` +
        'Use a checkout-local pnpm install before running Electron from this worktree.'
    )
  }

  let repaired = 0
  for (const [name, packageDir] of findWorkspacePackageDirs()) {
    const linkPath = join(nodeModules, name)
    let currentTarget = null
    try {
      currentTarget = realpathSync(linkPath)
    } catch {
      /* missing or broken workspace link */
    }
    if (currentTarget === realpathSync(packageDir)) continue
    replaceWorkspacePackageLink(nodeModules, linkPath, packageDir)
    repaired += 1
  }
  if (repaired > 0) {
    console.log(`[pre-dev] repaired ${repaired} stale workspace package link(s)`)
  }
}

// Electron processes of this checkout, split into true strays and ones that belong to another
// live `pnpm dev` (another session's app). Only strays are ever killed, loudly.
async function killStrays(label) {
  const table = readProcessTable()
  const ownerPid = liveWrapper(projectRoot, { selfPid: process.pid, table })
  const { strays, owned } = classifyElectronProcesses(table, {
    projectRoot,
    selfPid: process.pid,
    ownerPid
  })
  if (owned.length > 0)
    console.warn(
      `[${label}] leaving ${owned.length} Electron process(es) alone: they belong to the running pnpm dev (pid ${ownerPid})`
    )
  if (strays.length === 0) return
  console.warn(`[${label}] killing ${strays.length} stray Electron process(es) of this checkout:`)
  for (const { pid, command } of strays)
    console.warn(`[${label}]   ${pid} ${command.slice(0, 160)}`)
  appendExitRecord(devSandbox, {
    event: 'killed-strays',
    label,
    wrapperPid: process.pid,
    pids: strays.map(({ pid }) => pid)
  })
  for (const { pid } of strays) {
    try {
      process.kill(pid, 'SIGTERM')
    } catch {
      /* already gone */
    }
  }
  await new Promise((r) => setTimeout(r, 500))
  for (const { pid } of strays) {
    try {
      // probe — throws if dead, so we don't SIGKILL a recycled pid
      process.kill(pid, 0)
      process.kill(pid, 'SIGKILL')
    } catch {
      /* gone */
    }
  }
}

// Allow `pnpm dev --onboarding` (or `BLUME_ONBOARDING=1 pnpm dev`) to force the
// first-run onboarding guide to show even when it was already completed. The
// flag is forwarded to the Electron main process via an env var.
const forceOnboarding =
  process.argv.slice(2).some((arg) => arg === '--onboarding' || arg === '--onboard') ||
  process.env.BLUME_ONBOARDING === '1'
if (forceOnboarding) {
  console.log('[pre-dev] onboarding guide forced on for this dev session')
}

function parseEnvLine(line) {
  const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)?\s*$/)
  if (!match) return null

  const key = match[1]
  let value = match[2] ?? ''
  value = value.trim()

  const quoted = value.match(/^(['"])([\s\S]*)\1(?:\s+#.*)?$/)
  if (quoted) {
    const quote = quoted[1]
    value = quoted[2]
    if (quote === '"') {
      value = value
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
    }
  } else {
    value = value.replace(/\s+#.*$/, '').trimEnd()
  }

  return [key, value]
}

function loadEnvFiles() {
  const env = { ...process.env }
  const shellKeys = new Set(Object.keys(process.env))
  const files = []
  const loaded = []

  function addWorkspaceEnvFiles(root, label) {
    const entries = [
      ['.env', resolve(root, '.env')],
      ['.env.local', resolve(root, '.env.local')],
      ['.env.development', resolve(root, '.env.development')],
      ['.env.development.local', resolve(root, '.env.development.local')],
      ['apps/desktop/.env', resolve(root, 'apps', 'desktop', '.env')],
      ['apps/desktop/.env.local', resolve(root, 'apps', 'desktop', '.env.local')],
      ['apps/desktop/.env.development', resolve(root, 'apps', 'desktop', '.env.development')],
      [
        'apps/desktop/.env.development.local',
        resolve(root, 'apps', 'desktop', '.env.development.local')
      ]
    ]
    files.push(
      ...entries.map(([name, file]) => ({
        file,
        label: `${label}:${name}`
      }))
    )
  }

  if (primaryWorkspaceRoot !== workspaceRoot) {
    addWorkspaceEnvFiles(primaryWorkspaceRoot, 'primary-worktree')
  }

  addWorkspaceEnvFiles(workspaceRoot, 'current-worktree')

  for (const { file, label } of files) {
    if (!existsSync(file)) continue
    loaded.push(label)
    const text = readFileSync(file, 'utf8')
    for (const line of text.split(/\r?\n/)) {
      const parsed = parseEnvLine(line)
      if (!parsed) continue
      const [key, value] = parsed
      if (shellKeys.has(key)) continue
      env[key] = value
    }
  }

  return { env, loaded }
}

const devEnv = loadEnvFiles()
if (devEnv.loaded.length > 0) {
  console.log(`[pre-dev] loaded env files: ${devEnv.loaded.join(', ')}`)
}
const launcherArgs = parseDevLauncherArguments(process.argv.slice(2), devEnv.env)
try {
  if (configureRecordedLedger(devEnv.env, launcherArgs, electronUserDataDir === defaultElectronUserDataDir ? '' : electronUserDataDir)) {
    console.log('[pre-dev] recorded trial viewer: read-only; no hosted integration evidence')
  } else {
    await applyPullRequestPreviewEnvironment(devEnv.env, { cwd: workspaceRoot })
  }
} catch (error) {
  console.error(`[pre-dev] ${error instanceof Error ? error.message : String(error)}`)
  process.exit(1)
}

const launchPath = resolveLaunchPath(process.env.INIT_CWD ?? process.cwd())
const mainDbOverride = devEnv.env.BLUME_MAIN_DB_PATH?.trim()
const mainDbPath = mainDbOverride
  ? isAbsolute(mainDbOverride)
    ? mainDbOverride
    : resolve(launchPath, mainDbOverride)
  : join(homedir(), '.blume', 'blume.sqlite')
const usesProductionAccountService =
  !devEnv.env.BLUME_AUTH_URL ||
  ['https://auth.blume.codes', 'https://auth.blume-codes.com'].includes(devEnv.env.BLUME_AUTH_URL.replace(/\/+$/, ''))
const usesIsolatedE2eSandbox = devEnv.env.BLUME_E2E_MODE === '1'
const devLabel = resolveDevLabel({
  dbCandidates: devLabelDatabaseCandidates({
    homeDir: homedir(),
    devAppPath: projectRoot,
    stableDbPath: mainDbPath
  }),
  launchPath,
  workingDirectory: resolveLaunchPath(workspaceRoot),
  conversationTitle: launcherArgs.conversationTitle
})
if (devLabel.error) {
  console.error(`[pre-dev] cannot determine the dev conversation: ${devLabel.error}`)
  process.exit(1)
}
console.log(
  `[pre-dev] dev label (${devLabel.source}): ${devLabel.conversationName}${devLabel.worktreeName ? ` · ${devLabel.worktreeName}` : ''}`
)

console.log(
  process.env.ELECTRON_USER_DATA_DIR
    ? `[pre-dev] Electron userData override: ${electronUserDataDir}`
    : `[pre-dev] Electron userData: ${electronUserDataDir}`
)
console.log(`[pre-dev] runtime profile: ${launcherArgs.runtimeProfile}`)
console.log(`[pre-dev] runner mode: ${launcherArgs.runnerMode}`)
ensureWorkspacePackageLinks()
if (launcherArgs.runtimeProfile === 'full' || launcherArgs.runtimeProfile === 'conversations') {
  console.log('[pre-dev] ensuring canonical harness parser is built')
  execFileSync('pnpm', ['run', 'prepare:harness-parser'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: devEnv.env
  })
} else {
  console.log('[pre-dev] skipping canonical parser preparation for lightweight profile')
}
console.log('[pre-dev] ensuring native dependencies are rebuilt for Electron')
execFileSync('electron-builder', ['install-app-deps'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: devEnv.env
})

let accountSessionImport = null
let accountSessionSource = null
if (!launcherArgs.signedOut && usesProductionAccountService && !usesIsolatedE2eSandbox) {
  const candidates = devAccountSessionDatabaseCandidates({
    homeDir: homedir(),
    stableDbPath: mainDbPath
  })
  while (candidates.length > 0) {
    const candidate = findDevAccountSessionSource(candidates)
    if (!candidate) break
    try {
      const helper = join(projectRoot, 'scripts', 'dev-account-session-helper.cjs')
      const sourceAppName = candidate.source === 'canary' ? 'Blume Canary' : 'Blume'
      let decrypted = execFileSync(
        'electron',
        [helper, 'decrypt', sourceAppName, candidate.dbPath],
        {
          cwd: projectRoot,
          encoding: 'utf8',
          env: devEnv.env,
          maxBuffer: 4_000_000,
          timeout: 10_000
        }
      )
      const decryptedSettings = JSON.parse(decrypted)
      const validation = await validateDevAccountSession(
        decryptedSettings,
        devEnv.env.BLUME_AUTH_URL || 'https://auth.blume.codes'
      )
      if (validation === 'invalid') {
        decrypted = ''
        console.log(`[pre-dev] account session: ${candidate.source} session is signed out`)
        candidates.splice(0, candidates.indexOf(candidate) + 1)
        continue
      }

      const devAppName = `Blume Dev - ${devLabel.conversationName}`
      const encrypted = execFileSync('electron', [helper, 'encrypt', devAppName], {
        cwd: projectRoot,
        encoding: 'utf8',
        env: devEnv.env,
        input: decrypted,
        maxBuffer: 4_000_000,
        timeout: 10_000
      })
      decrypted = ''
      accountSessionImport = Buffer.from(encrypted).toString('base64')
      accountSessionSource = candidate
      break
    } catch {
      console.warn(`[pre-dev] account session: could not read ${candidate.source}; trying fallback`)
      candidates.splice(0, candidates.indexOf(candidate) + 1)
    }
  }
}

if (launcherArgs.signedOut) {
  console.log('[pre-dev] account session: signed out (--signed-out)')
} else if (accountSessionSource) {
  console.log(`[pre-dev] account session: inheriting ${accountSessionSource.source}`)
} else if (!usesProductionAccountService) {
  console.log('[pre-dev] account session: isolated for the non-production auth service')
} else if (usesIsolatedE2eSandbox) {
  console.log('[pre-dev] account session: isolated for the E2E sandbox')
} else {
  console.log('[pre-dev] account session: no readable installed-app session found')
}
await killStrays('pre-dev')

const deliveryPluginBundle = resolve(projectRoot, '.dev/plugin-bundle')
execFileSync(
  'pnpm',
  ['--filter', '@blume/agent-mcp-node', 'plugin:bundle', '--out', deliveryPluginBundle],
  {
    cwd: workspaceRoot,
    stdio: ['ignore', 'ignore', 'inherit']
  }
)
const childEnvironment = {
  ...devEnv.env,
  BLUME_CONTROL_PORT:
    devEnv.env.BLUME_CONTROL_PORT ||
    String(20000 + (createHash('sha256').update(projectRoot).digest().readUInt32BE(0) % 10000)),
  BLUME_PLUGIN_BUNDLE_DIR: devEnv.env.BLUME_PLUGIN_BUNDLE_DIR || deliveryPluginBundle,
  BLUME_DEV_INSTALL: '1',
  BLUME_DEV_CONVERSATION_TITLE: devLabel.conversationName,
  BLUME_DEV_WORKTREE_NAME: devLabel.worktreeName ?? '',
  BLUME_DEV_CDP_PORT: launcherArgs.cdpPort === null ? '' : String(launcherArgs.cdpPort),
  BLUME_DEV_PROFILE: launcherArgs.runtimeProfile,
  ...(launcherArgs.runtimeProfile === 'ui' || launcherArgs.runtimeProfile === 'native'
    ? { BLUME_DISABLE_REFRESH_WORKER: '1', BLUME_DISABLE_PARSE_WORKER: '1' }
    : {}),
  ELECTRON_USER_DATA_DIR: electronUserDataDir,
  ...(launcherArgs.signedOut ? { BLUME_DEV_SIGNED_OUT: '1' } : {}),
  ...(accountSessionImport ? { BLUME_DEV_ACCOUNT_SESSION_IMPORT: accountSessionImport } : {}),
  ...(forceOnboarding ? { BLUME_FORCE_ONBOARDING: '1' } : {})
}

if (launcherArgs.runnerMode === 'static') {
  console.log('[pre-dev] building static manual-test runtime (hot reload disabled)')
  execFileSync('electron-vite', ['build'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...childEnvironment, VITE_BLUME_STATIC_DEV: '1' }
  })
}

child = spawn(
  'electron-vite',
  devRunnerArguments(launcherArgs.runnerMode, launcherArgs.electronViteArgs),
  {
    stdio: 'inherit',
    env: {
      ...childEnvironment,
      ...(launcherArgs.runnerMode === 'static'
        ? { NODE_ENV: 'development', VITE_BLUME_STATIC_DEV: '1' }
        : {})
    }
  }
)

let finalizing = false
async function finalize(code, reason) {
  if (finalizing) return
  finalizing = true
  recordStop(reason)
  if (child.exitCode === null && !child.killed) {
    try {
      child.kill('SIGTERM')
    } catch {
      /* gone */
    }
    // Give electron-vite a beat to tear down its Electron child cleanly.
    await new Promise((r) => setTimeout(r, 800))
  }
  await killStrays('post-dev')
  releaseWrapper(projectRoot, process.pid)
  process.exit(code)
}

markLaunched(projectRoot, process.pid)
child.on(
  'exit',
  (code, signal) => void finalize(code ?? 0, { childExit: code, childSignal: signal })
)
