// Smoke test for the shared install host with desktop native ports. Points HOME
// at a tempdir, runs the installer twice (first to install, second to confirm
// the marker short-circuits), and asserts the side effects.
import { mkdtempSync, readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { cp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { homedir, tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { createInstallHost } from '@blume/app-core'
import { is } from '@electron-toolkit/utils'
import { app } from 'electron'

const DESKTOP_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
process.chdir(DESKTOP_ROOT)

const FAKE_HOME = mkdtempSync(join(tmpdir(), 'blume-install-test-'))
process.env.HOME = FAKE_HOME

// Seed an existing ~/.claude/settings.json with an unrelated user setting,
// so we can verify the merge preserves it.
const claudeDir = join(FAKE_HOME, '.claude')
mkdirSync(claudeDir, { recursive: true })
const seedSettings = {
  permissions: { allow: ['Bash(ls)'] },
  hooks: {
    UserPromptSubmit: [
      { hooks: [{ type: 'command', command: 'echo pre-existing-user-hook' }] },
      { hooks: [{ type: 'command', command: 'node ~/.blume/hooks/inject-rules.mjs' }] }
    ]
  }
}
writeFileSync(join(claudeDir, 'settings.json'), JSON.stringify(seedSettings, null, 2))
mkdirSync(join(FAKE_HOME, '.blume', 'rules'), { recursive: true })
mkdirSync(join(FAKE_HOME, '.blume', 'hooks'), { recursive: true })
mkdirSync(join(FAKE_HOME, '.cursor', 'rules'), { recursive: true })
writeFileSync(join(FAKE_HOME, '.blume', 'rules', 'todo-list.md'), 'todo list')
writeFileSync(join(FAKE_HOME, '.blume', 'hooks', 'inject-rules.mjs'), 'legacy hook')
writeFileSync(join(FAKE_HOME, '.cursor', 'rules', 'blume-todo-list.mdc'), 'legacy rule')

console.log('[test] HOME =', FAKE_HOME)

const { getBlumeRoot } = await import('../src/main/blume-home.ts')
const installHost = createInstallHost({
  currentAppVersion: () => app.getVersion(),
  appPath: () => app.getAppPath(),
  resourcesPath: () => process.resourcesPath,
  isDev: is.dev,
  blumeHome: getBlumeRoot,
  homeDir: homedir,
  platform: () => process.platform,
  pid: () => process.pid,
  fs: {
    copy: (src, dest, options) => cp(src, dest, options),
    async mkdir(path, options) {
      await mkdir(path, options)
    },
    readTextFile: (path) => readFile(path, 'utf-8'),
    writeTextFile: (path, contents) => writeFile(path, contents, 'utf-8'),
    rename,
    removeFile: (path) => rm(path, { force: true })
  },
  path: { dirname, join },
  now: () => new Date()
})
const blumeHome = getBlumeRoot()
assert.ok(
  blumeHome.startsWith(join(FAKE_HOME, '.blume')),
  'install should write inside the fake HOME .blume tree'
)

// --- first run: should do work
const first = await installHost.runInstall()
console.log('[test] first run state:', JSON.stringify(first, null, 2))

// Marker file written
const markerPath = join(blumeHome, 'install-state.json')
assert.ok(existsSync(markerPath), 'install-state.json should exist')
const marker = JSON.parse(readFileSync(markerPath, 'utf-8'))
assert.equal(marker.appVersion, '1.0.10-test')
assert.equal(marker.harnesses.claude.status, 'skipped')
assert.equal(marker.harnesses.cursor.status, 'skipped')
assert.equal(marker.harnesses.codex.status, 'skipped')
assert.equal(marker.migrations['remove-todo-list-integration'].status, 'ok')

// Legacy global integrations removed
const hookPath = join(blumeHome, 'hooks', 'inject-rules.mjs')
const rulePath = join(blumeHome, 'rules', 'todo-list.md')
const cursorRule = join(FAKE_HOME, '.cursor', 'rules', 'blume-todo-list.mdc')
assert.ok(!existsSync(hookPath), 'legacy hook script should be removed')
assert.ok(!existsSync(rulePath), 'legacy Claude todo rule should be removed')
assert.ok(!existsSync(cursorRule), 'legacy Cursor todo rule should be removed')

// Claude settings.json migrated: pre-existing user hook preserved, Blume hook removed.
const mergedRaw = readFileSync(join(claudeDir, 'settings.json'), 'utf-8')
const merged = JSON.parse(mergedRaw)
assert.deepEqual(merged.permissions, { allow: ['Bash(ls)'] }, 'unrelated keys preserved')
const ups = merged.hooks.UserPromptSubmit
assert.equal(ups.length, 1, 'should keep only the user hook')
assert.equal(ups[0].hooks[0].command, 'echo pre-existing-user-hook')

// Backup written
const backupDir = join(blumeHome, 'backups')
assert.ok(existsSync(backupDir), 'backup dir should exist')

// --- second run: marker should short-circuit
const before = readFileSync(markerPath, 'utf-8')
const second = await installHost.runInstall()
console.log('[test] second run state matched marker:', second.appVersion === marker.appVersion)
const after = readFileSync(markerPath, 'utf-8')
assert.equal(before, after, 'marker file should be untouched on no-op re-run')

// --- third run: force=true remains idempotent and does not restore the integration
await installHost.runInstall({ force: true })
const reMerged = JSON.parse(readFileSync(join(claudeDir, 'settings.json'), 'utf-8'))
assert.equal(
  reMerged.hooks.UserPromptSubmit.length,
  1,
  'force re-run must not restore the Blume hook entry'
)

console.log('\n[test] all assertions passed ✓')
