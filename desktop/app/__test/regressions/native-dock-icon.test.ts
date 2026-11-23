import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, test, vi } from 'vitest'

import { FLOWER_IDS, FLOWER_SETTING_KEY, type FlowerId } from '@blume/app-core'

import { createDesktopNativeDockIconFacade } from '../../src/main/nativeDockIcon'

const flowerAssets: Record<FlowerId, string> = {
  bluebell: '/flowers/bluebell.png',
  forgetmenot: '/flowers/forgetmenot.png',
  tulip: '/flowers/tulip.png',
  sunflower: '/flowers/sunflower.png',
  lantana: '/flowers/lantana.png',
  daylily: '/flowers/daylily.png'
}

function createFacade({
  setting = 'bluebell',
  setDockIcon = vi.fn(),
  captureAppError = vi.fn()
}: {
  setting?: string | null
  setDockIcon?: ReturnType<typeof vi.fn>
  captureAppError?: ReturnType<typeof vi.fn>
} = {}) {
  const facade = createDesktopNativeDockIconFacade({
    flowerAssets,
    getSetting: () => setting,
    setDockIcon,
    captureAppError
  })

  return { facade, setDockIcon, captureAppError }
}

function pngDimensions(filePath: string): { width: number; height: number } {
  const png = readFileSync(filePath)
  expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20)
  }
}

describe('native Dock icon', () => {
  test('ships a 512px Dock icon for every flower and release variant', () => {
    const resourcesDir = fileURLToPath(new URL('../../resources/dock-icons', import.meta.url))

    for (const variant of ['stable', 'dev', 'canary']) {
      for (const flower of FLOWER_IDS) {
        expect(pngDimensions(join(resourcesDir, variant, `${flower}.png`))).toEqual({
          width: 512,
          height: 512
        })
      }
    }
  })

  test('applies the persisted flower at startup', () => {
    const { facade, setDockIcon } = createFacade({ setting: 'sunflower' })

    facade.sync()

    expect(setDockIcon).toHaveBeenCalledWith('/flowers/sunflower.png')
  })

  test('updates immediately when the flower setting changes', () => {
    const { facade, setDockIcon } = createFacade()

    facade.notifySettingChanged(FLOWER_SETTING_KEY, 'tulip')
    facade.notifySettingChanged('unrelated.setting', 'daylily')

    expect(setDockIcon).toHaveBeenCalledTimes(1)
    expect(setDockIcon).toHaveBeenCalledWith('/flowers/tulip.png')
  })

  test('falls back to bluebell for an invalid persisted flower', () => {
    const { facade, setDockIcon } = createFacade({ setting: 'rose' })

    facade.sync()

    expect(setDockIcon).toHaveBeenCalledWith('/flowers/bluebell.png')
  })

  test('reports native Dock update failures without replacing the packaged icon', () => {
    const error = new Error('Dock rejected icon')
    const setDockIcon = vi.fn(() => {
      throw error
    })
    const { facade, captureAppError } = createFacade({ setDockIcon })

    facade.sync()

    expect(captureAppError).toHaveBeenCalledWith('main.dock-icon-set', error)
  })

  test('does no work when the platform has no Dock capability', () => {
    const getSetting = vi.fn(() => 'tulip')
    const facade = createDesktopNativeDockIconFacade({
      flowerAssets,
      getSetting,
      captureAppError: vi.fn()
    })

    facade.sync()

    expect(getSetting).not.toHaveBeenCalled()
  })
})

describe('persistent macOS flower icon', () => {
  test('uses the same artwork, coalesces rapid changes and finishes on the latest flower', async () => {
    let finish!: () => void
    const setAppIcon = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve
          })
      )
      .mockResolvedValue(undefined)
    const setDockIcon = vi.fn()
    const facade = createDesktopNativeDockIconFacade({
      flowerAssets,
      getSetting: () => 'sunflower',
      setDockIcon,
      setAppIcon,
      captureAppError: vi.fn()
    })
    facade.sync()
    facade.notifySettingChanged(FLOWER_SETTING_KEY, 'tulip')
    facade.notifySettingChanged(FLOWER_SETTING_KEY, 'daylily')
    expect(setDockIcon).toHaveBeenLastCalledWith(flowerAssets.daylily)
    expect(setAppIcon).toHaveBeenCalledTimes(1)
    finish()
    await vi.waitFor(() => expect(setAppIcon).toHaveBeenCalledTimes(2))
    expect(setAppIcon.mock.calls.map(([icon]) => icon)).toEqual([
      flowerAssets.sunflower,
      flowerAssets.daylily
    ])
    facade.notifySettingChanged(FLOWER_SETTING_KEY, 'daylily')
    await Promise.resolve()
    expect(setAppIcon).toHaveBeenCalledTimes(2)
  })

  test('persistent and Dock failures are independent and persistence can retry', async () => {
    const captureAppError = vi.fn()
    const error = new Error('read-only install')
    const setAppIcon = vi.fn().mockRejectedValueOnce(error).mockResolvedValue(undefined)
    const setDockIcon = vi.fn().mockImplementationOnce(() => {
      throw new Error('Dock unavailable')
    })
    const facade = createDesktopNativeDockIconFacade({
      flowerAssets,
      getSetting: () => 'tulip',
      setDockIcon,
      setAppIcon,
      captureAppError
    })
    facade.sync()
    await vi.waitFor(() => expect(captureAppError).toHaveBeenCalledWith('main.app-icon-set', error))
    facade.sync()
    await vi.waitFor(() => expect(setAppIcon).toHaveBeenCalledTimes(2))
    expect(setDockIcon).toHaveBeenLastCalledWith(flowerAssets.tulip)
  })

  test('a fresh launch reapplies the saved flower even after bundle replacement', async () => {
    const setAppIcon = vi.fn().mockResolvedValue(undefined)
    for (let launch = 0; launch < 2; launch++) {
      const facade = createDesktopNativeDockIconFacade({
        flowerAssets,
        getSetting: () => 'daylily',
        setAppIcon,
        captureAppError: vi.fn()
      })
      facade.sync()
      await Promise.resolve()
    }
    expect(setAppIcon).toHaveBeenCalledTimes(2)
    expect(setAppIcon).toHaveBeenLastCalledWith(flowerAssets.daylily, expect.any(AbortSignal))
  })

  test('quit cancels the helper and drops queued work without reporting an error', async () => {
    let signal!: AbortSignal
    const captureAppError = vi.fn()
    const setAppIcon = vi.fn(
      (_icon, abort: AbortSignal) =>
        new Promise<void>((_resolve, reject) => {
          signal = abort
          abort.addEventListener('abort', () => reject(new Error('aborted')))
        })
    )
    const facade = createDesktopNativeDockIconFacade({
      flowerAssets,
      getSetting: () => 'tulip',
      setAppIcon,
      captureAppError
    })
    facade.sync()
    facade.notifySettingChanged(FLOWER_SETTING_KEY, 'daylily')
    facade.stop()
    await Promise.resolve()
    facade.sync()
    expect(signal.aborted).toBe(true)
    expect(setAppIcon).toHaveBeenCalledTimes(1)
    expect(captureAppError).not.toHaveBeenCalled()
  })
})

test('ordinary quit drains the final queued flower before resuming once', async () => {
  let finishFirst!: () => void
  let finishLast!: () => void
  const setAppIcon = vi
    .fn()
    .mockImplementationOnce(
      () =>
        new Promise<void>((r) => {
          finishFirst = r
        })
    )
    .mockImplementationOnce(
      () =>
        new Promise<void>((r) => {
          finishLast = r
        })
    )
  const facade = createDesktopNativeDockIconFacade({
    flowerAssets,
    getSetting: () => 'tulip',
    setAppIcon,
    captureAppError: vi.fn()
  })
  const resume = vi.fn()
  facade.sync()
  facade.notifySettingChanged(FLOWER_SETTING_KEY, 'daylily')
  expect(facade.deferQuit(resume)).toBe(true)
  expect(facade.deferQuit(resume)).toBe(true)
  finishFirst()
  await vi.waitFor(() => expect(setAppIcon).toHaveBeenCalledTimes(2))
  expect(resume).not.toHaveBeenCalled()
  finishLast()
  await vi.waitFor(() => expect(resume).toHaveBeenCalledTimes(1))
  expect(setAppIcon.mock.calls[1][0]).toBe(flowerAssets.daylily)
  expect(facade.deferQuit(resume)).toBe(false)
})

test('a hung icon never holds ordinary quit beyond two seconds', async () => {
  vi.useFakeTimers()
  try {
    let signal!: AbortSignal
    const captureAppError = vi.fn()
    const facade = createDesktopNativeDockIconFacade({
      flowerAssets,
      getSetting: () => 'tulip',
      captureAppError,
      setAppIcon: (_icon, abort) => {
        signal = abort
        return new Promise(() => {})
      }
    })
    const resume = vi.fn()
    facade.sync()
    expect(facade.deferQuit(resume)).toBe(true)
    await vi.advanceTimersByTimeAsync(2_000)
    expect(signal.aborted).toBe(true)
    expect(resume).toHaveBeenCalledTimes(1)
    expect(captureAppError).toHaveBeenCalledWith('main.app-icon-quit-timeout', expect.any(Error))
  } finally {
    vi.useRealTimers()
  }
})

test('updater cancellation bypasses an ordinary-quit drain without retrying app.quit', async () => {
  vi.useFakeTimers()
  try {
    let complete!: () => void
    const facade = createDesktopNativeDockIconFacade({
      flowerAssets,
      getSetting: () => 'tulip',
      captureAppError: vi.fn(),
      setAppIcon: () =>
        new Promise<void>((r) => {
          complete = r
        })
    })
    const resume = vi.fn()
    facade.sync()
    expect(facade.deferQuit(resume)).toBe(true)
    facade.stop() // Electron autoUpdater before-quit-for-update
    expect(facade.deferQuit(resume)).toBe(false)
    complete()
    await vi.advanceTimersByTimeAsync(3_000)
    expect(resume).not.toHaveBeenCalled()
  } finally {
    vi.useRealTimers()
  }
})
