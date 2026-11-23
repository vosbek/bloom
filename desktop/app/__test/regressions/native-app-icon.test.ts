import { describe, expect, test, vi } from 'vitest'
import { execFile } from 'node:child_process'
import { macAppBundlePath, setMacAppIcon, SET_APP_ICON_SCRIPT } from '../../src/main/nativeAppIcon'

vi.mock('node:child_process', () => ({ execFile: vi.fn() }))

describe('macOS custom icon adapter', () => {
  test('only targets the packaged application containing the running executable', () => {
    expect(
      macAppBundlePath('darwin', true, '/Applications/Blume Canary.app/Contents/MacOS/Blume Canary')
    ).toBe('/Applications/Blume Canary.app')
    expect(
      macAppBundlePath('darwin', false, '/modules/Electron.app/Contents/MacOS/Electron')
    ).toBeNull()
    expect(macAppBundlePath('linux', true, '/usr/bin/blume')).toBeNull()
    expect(macAppBundlePath('darwin', true, '/tmp/blume')).toBeNull()
    expect(macAppBundlePath('darwin', true, '/tmp/Foo.app/Helpers/bin')).toBeNull()
  })

  test('passes paths as arguments, unpacks image path, and bounds the helper', async () => {
    vi.mocked(execFile).mockImplementation((...args: unknown[]) => {
      ;(args[3] as (error: Error | null) => void)(null)
      return {} as ReturnType<typeof execFile>
    })
    const signal = new AbortController().signal
    const bundle = '/Applications/Blume "test".app'
    await setMacAppIcon(
      bundle,
      '/Applications/Blume.app/Contents/Resources/app.asar/resources/dock-icons/canary/tulip.png',
      signal
    )
    expect(execFile).toHaveBeenLastCalledWith(
      '/usr/bin/osascript',
      [
        '-l',
        'JavaScript',
        '-e',
        SET_APP_ICON_SCRIPT,
        '/Applications/Blume.app/Contents/Resources/app.asar.unpacked/resources/dock-icons/canary/tulip.png',
        bundle
      ],
      { timeout: 15_000, maxBuffer: 16 * 1024, signal },
      expect.any(Function)
    )
    expect(SET_APP_ICON_SCRIPT).not.toContain(bundle)
  })

  test('surfaces helper failures to the caller', async () => {
    const error = new Error('timeout')
    vi.mocked(execFile).mockImplementation((...args: unknown[]) => {
      ;(args[3] as (error: Error | null) => void)(error)
      return {} as ReturnType<typeof execFile>
    })
    await expect(
      setMacAppIcon('/tmp/Blume.app', '/tmp/flower.png', new AbortController().signal)
    ).rejects.toThrow('timeout')
  })
})
