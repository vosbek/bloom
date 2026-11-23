import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

import { isDevRendererNavigation, isExternallyOpenableUrl } from '../../src/main/nativeWindow'

const nativeWindow = readFileSync(
  new URL('../../src/main/nativeWindow.ts', import.meta.url),
  'utf8'
)

describe('main window navigation', () => {
  test('the primary window cannot be stranded in macOS background throttling', () => {
    const primaryWindow = nativeWindow.match(
      /const mainWindow = new BrowserWindow\(\{[\s\S]*?\n {4}\}\)/
    )
    expect(primaryWindow).not.toBeNull()
    expect(primaryWindow?.[0]).toContain('backgroundThrottling: true')
    expect(nativeWindow).toMatch(
      /mainWindow\.on\('focus',[\s\S]*?setBackgroundThrottling\(false\)/
    )
    expect(nativeWindow).toMatch(
      /const restoreBackgroundThrottling[\s\S]*?setBackgroundThrottling\(true\)/
    )
    expect(nativeWindow).toContain("mainWindow.on('blur', restoreBackgroundThrottling)")
    expect(nativeWindow).toContain("mainWindow.on('minimize', restoreBackgroundThrottling)")
    expect(nativeWindow).toContain("mainWindow.on('hide', restoreBackgroundThrottling)")
  })

  test('a top-level navigation is intercepted, not just a new-window request', () => {
    // `setWindowOpenHandler` only fires for requests to open a *new* window. A
    // plain in-page link is a top-level navigation, so without this guard it
    // replaces the app with the page — in a window with no chrome to go back.
    const guard = nativeWindow.match(
      /mainWindow\.webContents\.on\('will-navigate'[\s\S]*?\n {4}\}\)/
    )
    expect(guard).not.toBeNull()
    expect(guard?.[0]).toContain('event.preventDefault()')
    expect(guard?.[0]).toContain('openExternallyIfSafe(url)')
  })

  test('the dev renderer is still allowed to navigate itself', () => {
    // Vite reloads the renderer by navigating it; denying that would break dev.
    const guard = nativeWindow.match(
      /mainWindow\.webContents\.on\('will-navigate'[\s\S]*?\n {4}\}\)/
    )
    expect(guard?.[0]).toContain(
      'deps.isDev && deps.rendererUrl && isDevRendererNavigation(url, deps.rendererUrl)'
    )

    expect(
      isDevRendererNavigation('http://localhost:5173/conversations/1', 'http://localhost:5173')
    ).toBe(true)
    expect(
      isDevRendererNavigation('http://localhost:5173@evil.example/path', 'http://localhost:5173')
    ).toBe(false)
    expect(isDevRendererNavigation('not a URL', 'http://localhost:5173')).toBe(false)
  })

  test('only browser and mail schemes are handed to the OS', () => {
    // `shell.openExternal` delegates to the OS: a `file:` URL opens or launches
    // whatever it points at, and dropping a file onto the window is itself a
    // renderer-initiated navigation to `file://`. Anything that is not plainly
    // a web or mail address must die at the guard.
    for (const url of [
      'https://example.com/docs',
      'http://localhost:5173/',
      'mailto:someone@example.com'
    ]) {
      expect(isExternallyOpenableUrl(url), `should open: ${url}`).toBe(true)
    }

    for (const url of [
      'file:///Users/someone/Downloads/installer.dmg',
      'file:///Applications/Calculator.app',
      'javascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'vscode://file/etc/passwd',
      'smb://attacker.example/share',
      'ftp://example.com/payload',
      'blume://deep-link',
      'not a url at all',
      ''
    ]) {
      expect(isExternallyOpenableUrl(url), `must not reach the OS: ${url}`).toBe(false)
    }
  })

  test('every path out to the OS shares the same guard', () => {
    // Three call sites can hand a URL to the OS: the new-window handler (a
    // link with target="_blank" reaches it rather than will-navigate), the
    // will-navigate guard, and the rejected-webview branch, whose `src` is
    // renderer-authored. None may call openExternal directly.
    const openHandler = nativeWindow.match(
      /setWindowOpenHandler\(\(details\) => \{[\s\S]*?\n {4}\}\)/
    )
    expect(openHandler?.[0]).toContain('openExternallyIfSafe(details.url)')

    const webview = nativeWindow.match(/on\('will-attach-webview'[\s\S]*?\n {4}\}\)/)
    expect(webview?.[0]).toContain('openExternallyIfSafe(params.src)')

    // Only the helper itself may reach deps.openExternal.
    const directCalls = [...nativeWindow.matchAll(/deps\.openExternal\(/g)]
    expect(directCalls.length, 'openExternal should have exactly one call site').toBe(1)
  })

  test('the preferences shortcut ignores keyboard auto-repeat', () => {
    const shortcut = nativeWindow.match(/function wirePreferencesShortcut[\s\S]*?\n {2}\}/)
    expect(shortcut).not.toBeNull()
    expect(shortcut?.[0]).toContain('if (input.isAutoRepeat) return')
    expect(shortcut?.[0].indexOf('input.isAutoRepeat')).toBeLessThan(
      shortcut?.[0].indexOf("openPathFromNativeMenu('/settings')") ?? -1
    )
  })
})
