import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { expect, test } from 'vitest'

const mainDir = join(import.meta.dirname, '../../src/main')

test('desktop login registration uses native service state and matching Windows arguments', async () => {
  const settings = await readFile(join(mainDir, 'settingsIpc.ts'), 'utf8')

  expect(settings).toMatch(/getLoginItemSettings\(\{ type: 'mainAppService' \}\)/)
  expect(settings).toMatch(
    /setLoginItemSettings\(\{ openAtLogin: enabled, type: 'mainAppService' \}\)/
  )
  expect(settings).toMatch(/getLoginItemSettings\(\{ args: \[LAUNCH_AT_LOGIN_ARG\] \}\)/)
  expect(settings).toMatch(
    /setLoginItemSettings\(\{ openAtLogin: enabled, args: \[LAUNCH_AT_LOGIN_ARG\] \}\)/
  )
  expect(settings).toContain("input.status === 'requires-approval'")
  expect(settings).toContain("process.platform === 'darwin' || process.platform === 'win32'")
})

test('login startup shows the full app and initializes the native default once', async () => {
  const [index, nativeWindow] = await Promise.all([
    readFile(join(mainDir, 'index.ts'), 'utf8'),
    readFile(join(mainDir, 'nativeWindow.ts'), 'utf8')
  ])

  expect(index).toContain('focusOnReady: !launchedAtLogin')
  expect(index).toContain('desktopSettings.initializeLaunchAtLoginDefault()')
  expect(index).toContain("if (legacyLoginItemCleanup?.reason !== 'failed')")
  expect(index).toContain('await cleanupLegacyBlumeTauriLaunchAgent()')
  expect(index).toMatch(/launch_source: launchedAtLogin \? 'login' : 'normal'/)
  expect(nativeWindow).not.toContain('showOnReady')
  expect(nativeWindow).not.toContain('setSkipTaskbar(true)')
  expect(nativeWindow).not.toContain('hideDockIcon')
  expect(nativeWindow).toContain("mainWindow.on('ready-to-show'")
  expect(nativeWindow).toContain('mainWindow.showInactive()')
  expect(nativeWindow).toMatch(/options\.focusOnReady !== false \|\|/)
  // Login startup never hides and re-shows the window (that rehome existed only for pinned mode).
  expect(nativeWindow).not.toMatch(/rehome|win\.hide\(\)/)
  expect(nativeWindow).toMatch(/if \(!win\.isVisible\(\)\) win\.show\(\)/)
})
