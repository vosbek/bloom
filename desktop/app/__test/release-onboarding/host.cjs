// Test-only native host. Loads the unchanged production renderer AND preload from --out.
// It cannot contact customer services, run agents, or mutate a real ledger.
const { app, BrowserWindow, ipcMain, MessageChannelMain, session, protocol } = require('electron')
const path = require('node:path')
const out = process.env.BLUME_ONBOARDING_OUT
const profile = process.env.BLUME_ONBOARDING_PROFILE
if (!out || !profile)
  throw new Error('The release check needs an explicit build and isolated profile')
// Consume diagnostics locally; no Sentry transport or customer backend is installed.
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'sentry-ipc',
    privileges: {
      secure: true,
      standard: true,
      corsEnabled: true,
      supportFetchAPI: true,
      bypassCSP: true
    }
  }
])
app.setPath('userData', profile)
app.setPath('sessionData', path.join(profile, 'session'))
const settings = { posthogTrackingDisabled: 'true' }
// The production installer always reports the known harnesses, even when unavailable.
// Empty status arrays hid every install tile in the old evidence captures.
const pluginStatuses = [
  { harness: 'claude', label: 'Claude Code' },
  { harness: 'codex', label: 'Codex' }
].map((agent) => ({
  ...agent,
  available: process.env.BLUME_ONBOARDING_AGENTS !== 'unavailable',
  installed: false,
  version: null,
  latest: '1.0.0',
  autoUpdate: true,
  lastUpdate: null
}))
global.releaseCheckInstalls = []
const account = {
  user: {
    id: 'release-check-user',
    name: 'Release check',
    email: 'release-check@example.invalid',
    emailVerified: true,
    roles: []
  },
  expiresAt: Date.now() + 86400000
}
const reads = new Set([
  'context',
  'plugin_installations',
  'test_catalog_get',
  'test_history_get',
  'project_list',
  'review_preferences_get'
])
global.releaseCheckUnexpected = []
function unexpected(label) {
  global.releaseCheckUnexpected.push(label)
  throw new Error(`Unexpected host operation: ${label}`)
}
const handle = (name, fn) => ipcMain.handle(name, (_event, ...args) => fn(...args))
handle('account:getSession', () => account)
handle('control:account', (op) => (op === 'session' ? account : unexpected(`account:${op}`)))
handle('db:settings:all', () => settings)
handle('db:settings:get', (key) => settings[key] ?? null)
handle('db:settings:set', (key, value) => {
  settings[key] = value
})
handle('identity:get', () => 'release-check-installation')
handle('identity:getProfile', () => ({ blumeId: 'release-check-installation' }))
handle('posthog:featureFlagEvaluations', () => ({}))
handle('posthog:featureFlagEnabled', () => false)
handle('posthog:featureFlagValue', () => false)
for (const name of [
  'db:projects:list',
  'db:projects:listRecent',
  'db:conversations:list',
  'db:conversations:listForView',
  'db:conversations:listForViewCancelable',
  'db:userTurns:active',
  'harnesses:list',
  'harnesses:listSetup',
  'announcements:listActive',
  'careers:listOpenings',
  'terminal:list'
])
  handle(name, () => [])
for (const name of [
  'app:setAppBadge',
  'app:setCommandMenu',
  'appUsage:setProductAccessAvailable',
  'diagnostics:log'
])
  handle(name, () => null)
handle('usage:fetch', () => ({ providers: [], fetchedAt: Date.now() }))
handle('appUsage:getTotalProcessRunningSeconds', () => 0)
handle('referrals:getStatus', () => null)
handle('updater:getReadyState', () => null)
handle('dev:info', () => null)
handle('window:isFullscreen', () => false)
handle('harnesses:codexBrand', () => null)
handle('control:projects', (op) => (op === 'list' ? [] : unexpected(`projects:${op}`)))
handle('control:github', (op) =>
  op === 'status' ? { connected: false } : unexpected(`github:${op}`)
)
handle('control:plugin', (op, input) => {
  if (op === 'devBuild') return { status: 'release' }
  if (op === 'status') return pluginStatuses
  if (op === 'agents') return []
  if (op === 'install') {
    const harnesses = input?.harnesses
    if (
      !Array.isArray(harnesses) ||
      !harnesses.length ||
      harnesses.some(
        (harness) => !pluginStatuses.some((agent) => agent.harness === harness && agent.available)
      )
    )
      return unexpected('plugin:install:invalid-harness')
    global.releaseCheckInstalls.push([...harnesses])
    // Simulate only the native result; no key, file, agent or network is touched.
    return harnesses.map((harness) => {
      const agent = pluginStatuses.find((entry) => entry.harness === harness)
      agent.installed = true
      agent.version = agent.latest
      return { harness, ok: true, version: agent.version }
    })
  }
  return unexpected(`plugin:${op}`)
})
handle('control:request', (op, input) => {
  if (op === 'workspace') return { kind: 'personal', id: '0' }
  if (op !== 'call' || !reads.has(input.operation))
    return unexpected(`ledger:${op}:${input?.operation}`)
  if (input.operation === 'plugin_installations')
    return {
      scope: 'local',
      checkedAt: Date.now(),
      installations: [],
      note: 'Isolated release check'
    }
  if (input.operation === 'context') return { viewerId: account.user.id, capabilities: {} }
  return { items: [], more: false, offset: 0 }
})
ipcMain.on('control:feed', (event) => {
  const { port1, port2 } = new MessageChannelMain()
  port1.on('message', ({ data }) => {
    if (data.op !== 'changes') return
    const result = {
      ledger: '0',
      cursor: 1,
      ...(data.cursor < 1 ? { reset: true } : {})
    }
    for (const key of [
      'deliveries',
      'threads',
      'messages',
      'projects',
      'setupChanges',
      'clusters',
      'improvements',
      'applications',
      'scenarios',
      'suites',
      'acceptanceSets',
      'executions',
      'removed'
    ])
      result[key] = []
    port1.postMessage({ id: data.id, result })
  })
  port1.start()
  event.sender.postMessage('control:feed', null, [port2])
  event.sender.once('destroyed', () => port1.close())
})
app.whenReady().then(async () => {
  protocol.handle(
    'sentry-ipc',
    () =>
      new Response(null, {
        status: 204,
        headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' }
      })
  )
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    callback({
      cancel: !['file:', 'data:', 'blob:', 'devtools:', 'sentry-ipc:'].some((scheme) =>
        details.url.startsWith(scheme)
      )
    })
  })
  const window = new BrowserWindow({
    width: 1440,
    height: 960,
    show: true,
    // Match nativeWindow.ts: Windows uses the renderer's custom titlebar.
    // A native frame changes how Windows routes input in its draggable regions.
    frame: process.platform !== 'win32',
    webPreferences: {
      preload: path.join(out, 'preload/index.js'),
      contextIsolation: true,
      sandbox: false,
      nodeIntegration: false
    }
  })
  handle('control:expand', () => {
    window.setSize(window.getSize()[0] > 620 ? 430 : 1440, 960)
    return true
  })
  await window.loadFile(path.join(out, 'renderer/index.html'), { hash: '/deliveries' })
})
app.on('window-all-closed', () => app.quit())
