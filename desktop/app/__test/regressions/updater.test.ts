import { beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  appExit: vi.fn(),
  appGetPath: vi.fn(() => '/tmp/blume-updater-test-logs'),
  appGetName: vi.fn(() => 'Blume'),
  appGetVersion: vi.fn(() => '1.2.2'),
  appOnce: vi.fn(),
  captureAppError: vi.fn(),
  checkForUpdates: vi.fn(),
  dialogShowMessageBox: vi.fn(),
  fileClose: vi.fn(),
  fileRead: vi.fn(),
  getAllWindows: vi.fn(),
  logError: vi.fn(),
  logInfo: vi.fn(),
  logWarn: vi.fn(),
  nativeUpdaterOn: vi.fn(),
  open: vi.fn(),
  openExternal: vi.fn(),
  quitAndInstall: vi.fn(),
  spawn: vi.fn(),
  unlink: vi.fn(),
  updaterOn: vi.fn(),
  writeFile: vi.fn()
}))

vi.mock('electron', () => ({
  app: {
    exit: mocks.appExit,
    getName: mocks.appGetName,
    getPath: mocks.appGetPath,
    getVersion: mocks.appGetVersion,
    once: mocks.appOnce
  },
  BrowserWindow: {
    getAllWindows: mocks.getAllWindows
  },
  dialog: {
    showMessageBox: mocks.dialogShowMessageBox
  },
  shell: {
    openExternal: mocks.openExternal
  }
}))

vi.mock('electron-updater', () => ({
  autoUpdater: {
    autoDownload: false,
    checkForUpdates: mocks.checkForUpdates,
    nativeUpdater: {
      on: mocks.nativeUpdaterOn
    },
    on: mocks.updaterOn,
    quitAndInstall: mocks.quitAndInstall
  }
}))

vi.mock('node:child_process', () => ({
  spawn: mocks.spawn
}))

vi.mock('node:fs/promises', () => ({
  open: mocks.open,
  unlink: mocks.unlink,
  writeFile: mocks.writeFile
}))

vi.mock('@electron-toolkit/utils', () => ({
  is: { dev: false }
}))

vi.mock('../../src/main/logger', () => ({
  createAppLogger: vi.fn(() => ({
    debug: vi.fn(),
    error: mocks.logError,
    fatal: vi.fn(),
    info: mocks.logInfo,
    warn: mocks.logWarn
  }))
}))

vi.mock('../../src/main/telemetry', () => ({
  captureAppError: mocks.captureAppError
}))

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

function setPlatform(value: NodeJS.Platform): void {
  Object.defineProperty(process, 'platform', { value, configurable: true })
}

function restorePlatform(): void {
  if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
}

describe('updater restart install', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.resetModules()
    restorePlatform()
    for (const mock of Object.values(mocks)) mock.mockReset()
    mocks.captureAppError.mockResolvedValue(undefined)
    mocks.checkForUpdates.mockResolvedValue(null)
    mocks.dialogShowMessageBox.mockResolvedValue({ response: 2 })
    mocks.fileClose.mockResolvedValue(undefined)
    mocks.openExternal.mockResolvedValue(undefined)
    mocks.open.mockRejectedValue(Object.assign(new Error('not found'), { code: 'ENOENT' }))
    mocks.unlink.mockResolvedValue(undefined)
    mocks.writeFile.mockResolvedValue(undefined)
    mocks.spawn.mockReturnValue({
      kill: vi.fn(),
      unref: vi.fn()
    })
  })

  test('destroys live windows before invoking native quitAndInstall', async () => {
    const liveWindow = {
      destroy: vi.fn(),
      isDestroyed: vi.fn(() => false)
    }
    const alreadyDestroyedWindow = {
      destroy: vi.fn(),
      isDestroyed: vi.fn(() => true)
    }
    mocks.getAllWindows.mockReturnValue([liveWindow, alreadyDestroyedWindow])

    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')

    installDownloadedUpdateForRestart()

    expect(liveWindow.destroy).toHaveBeenCalledTimes(1)
    expect(alreadyDestroyedWindow.destroy).not.toHaveBeenCalled()
    expect(mocks.quitAndInstall).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.quitAndInstall).toHaveBeenCalledTimes(1)
  })

  test('keeps restart handoff timers referenced and arms fallbacks before native updater', async () => {
    vi.useRealTimers()
    mocks.getAllWindows.mockReturnValue([])
    const watchdog = {
      kill: vi.fn(),
      unref: vi.fn()
    }
    mocks.spawn.mockReturnValue(watchdog)

    const originalSetTimeout = globalThis.setTimeout
    const scheduled: Array<{
      delay: number | undefined
      run: () => void
      unref: ReturnType<typeof vi.fn>
    }> = []
    const fakeSetTimeout = ((
      handler: Parameters<typeof setTimeout>[0],
      delay?: number,
      ...args: unknown[]
    ) => {
      const unref = vi.fn()
      scheduled.push({
        delay,
        run: () => {
          if (typeof handler === 'function') handler(...args)
        },
        unref
      })
      return { unref } as unknown as ReturnType<typeof setTimeout>
    }) as typeof setTimeout
    vi.stubGlobal('setTimeout', fakeSetTimeout)
    mocks.quitAndInstall.mockImplementation(() => {
      expect(mocks.spawn).toHaveBeenCalledTimes(1)
      expect(scheduled).toHaveLength(2)
    })

    try {
      const { installDownloadedUpdateForRestart, isInstallingDownloadedUpdateForRestart } =
        await import('../../src/main/updater')

      expect(isInstallingDownloadedUpdateForRestart()).toBe(false)
      installDownloadedUpdateForRestart()

      expect(isInstallingDownloadedUpdateForRestart()).toBe(true)
      expect(scheduled).toHaveLength(1)
      expect(scheduled[0]?.delay).toBe(250)
      expect(scheduled[0]?.unref).not.toHaveBeenCalled()

      scheduled[0]?.run()

      expect(mocks.quitAndInstall).toHaveBeenCalledTimes(1)
      expect(mocks.spawn).toHaveBeenCalledWith(
        '/bin/sh',
        [
          '-c',
          'sleep "$1"; kill -TERM "$2" 2>/dev/null || true; sleep "$3"; kill -KILL "$2" 2>/dev/null || true',
          'blume-update-exit-watchdog',
          '15',
          String(process.pid),
          '5'
        ],
        {
          detached: true,
          stdio: 'ignore'
        }
      )
      expect(watchdog.unref).toHaveBeenCalledTimes(1)
      expect(watchdog.kill).not.toHaveBeenCalled()
      expect(scheduled).toHaveLength(2)
      expect(scheduled[1]?.delay).toBe(15_000)
      expect(scheduled[1]?.unref).not.toHaveBeenCalled()
    } finally {
      vi.stubGlobal('setTimeout', originalSetTimeout)
    }
  })

  test('forces a zero-exit fallback if the native updater leaves helpers alive', async () => {
    mocks.getAllWindows.mockReturnValue([])
    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')

    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.quitAndInstall).toHaveBeenCalledTimes(1)
    expect(mocks.spawn).toHaveBeenCalledTimes(1)
    expect(mocks.appExit).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(15_000)

    expect(mocks.appExit).toHaveBeenCalledWith(0)
  })

  test('still forces a zero-exit fallback if native quitAndInstall throws', async () => {
    mocks.getAllWindows.mockReturnValue([])
    const watchdog = {
      kill: vi.fn(),
      unref: vi.fn()
    }
    mocks.spawn.mockReturnValue(watchdog)
    mocks.quitAndInstall.mockImplementation(() => {
      throw new Error('quit failed')
    })
    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')

    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.quitAndInstall).toHaveBeenCalledTimes(1)
    expect(watchdog.kill).toHaveBeenCalledTimes(1)
    expect(mocks.appExit).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(15_000)

    expect(mocks.appExit).toHaveBeenCalledWith(0)
  })

  test('still forces a zero-exit fallback if fallback logging throws', async () => {
    mocks.getAllWindows.mockReturnValue([])
    mocks.logInfo.mockImplementation((message: string) => {
      if (message === 'forcing app exit after update quit grace period') {
        throw new Error('log failed')
      }
    })
    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')

    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)
    await vi.advanceTimersByTimeAsync(15_000)

    expect(mocks.appExit).toHaveBeenCalledWith(0)
  })

  test('still schedules the failure fallback if quitAndInstall error logging throws', async () => {
    mocks.getAllWindows.mockReturnValue([])
    mocks.quitAndInstall.mockImplementation(() => {
      throw new Error('quit failed')
    })
    mocks.logError.mockImplementation(() => {
      throw new Error('log failed')
    })
    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')

    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.appExit).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(15_000)

    expect(mocks.appExit).toHaveBeenCalledWith(0)
  })

  test('ignores repeated restart clicks while an update install is in progress', async () => {
    mocks.getAllWindows.mockReturnValue([])
    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')

    installDownloadedUpdateForRestart()
    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.quitAndInstall).toHaveBeenCalledTimes(1)
  })

  test('waits for macOS native staging before publishing update-ready state', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    const resumeAfterUpdateCheck = vi.fn()
    const notifyUpdateReady = vi.fn()
    const { getUpdateReadyState, startAutoUpdates } = await import('../../src/main/updater')

    startAutoUpdates({ resumeAfterUpdateCheck, notifyUpdateReady })

    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })

    expect(getUpdateReadyState()).toBeNull()
    expect(notifyUpdateReady).not.toHaveBeenCalled()

    nativeListeners.get('update-downloaded')?.()
    await Promise.resolve()

    expect(getUpdateReadyState()).toEqual({ version: '1.2.3' })
    expect(notifyUpdateReady).toHaveBeenCalledWith({ version: '1.2.3' })
    expect(resumeAfterUpdateCheck).toHaveBeenCalledTimes(1)
  })

  test('matches a native staging event that arrives before wrapper update-downloaded', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    const resumeAfterUpdateCheck = vi.fn()
    const notifyUpdateReady = vi.fn()
    const { getUpdateReadyState, startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates({ resumeAfterUpdateCheck, notifyUpdateReady })

    nativeListeners.get('update-downloaded')?.()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    await Promise.resolve()

    expect(getUpdateReadyState()).toEqual({ version: '1.2.3' })
    expect(notifyUpdateReady).toHaveBeenCalledWith({ version: '1.2.3' })
    expect(resumeAfterUpdateCheck).toHaveBeenCalledTimes(1)
    expect(mocks.logInfo).toHaveBeenCalledWith(
      'matched early macOS native staging event to downloaded update',
      { update_version: 'v1.2.3', stage: 'native-updater-ready' }
    )
  })

  test('times out native staging, blocks an unsafe retry, and ignores a late native event', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    const resumeAfterUpdateCheck = vi.fn()
    const notifyUpdateReady = vi.fn()
    const { getUpdateReadyState, startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates({ resumeAfterUpdateCheck, notifyUpdateReady })
    await vi.advanceTimersByTimeAsync(0)

    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    await vi.advanceTimersByTimeAsync(120_000)

    expect(resumeAfterUpdateCheck).toHaveBeenCalledTimes(1)
    expect(mocks.logError).toHaveBeenCalledWith(
      'macOS native updater staging timed out',
      expect.objectContaining({
        message: expect.stringContaining('did not stage v1.2.3 within 120000ms')
      })
    )
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledTimes(1)
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Update Couldn\u2019t Finish',
        message: 'Blume v1.2.3 could not be prepared for restart.'
      })
    )

    await vi.advanceTimersByTimeAsync(60 * 60_000)
    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)

    nativeListeners.get('update-downloaded')?.()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.4' })
    await Promise.resolve()

    expect(getUpdateReadyState()).toBeNull()
    expect(notifyUpdateReady).not.toHaveBeenCalled()
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledTimes(1)
    expect(resumeAfterUpdateCheck).toHaveBeenCalledTimes(1)
    expect(mocks.logWarn).toHaveBeenCalledWith('ignoring late macOS native updater staging event')
  })

  test('blocks retries when an early native stage is followed by a wrapper download failure', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    let rejectDownload: ((reason: Error) => void) | undefined
    const downloadPromise = new Promise<never>((_resolve, reject) => {
      rejectDownload = reject
    })
    mocks.checkForUpdates.mockResolvedValue({ downloadPromise })

    const notifyUpdateReady = vi.fn()
    const { getUpdateReadyState, startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates({ notifyUpdateReady })
    await vi.advanceTimersByTimeAsync(0)

    nativeListeners.get('update-downloaded')?.()
    rejectDownload?.(new Error('wrapper download failed after native staging'))
    await vi.advanceTimersByTimeAsync(0)

    await vi.advanceTimersByTimeAsync(60 * 60_000)
    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)

    updaterListeners.get('update-downloaded')?.({ version: '1.2.4' })
    expect(getUpdateReadyState()).toBeNull()
    expect(notifyUpdateReady).not.toHaveBeenCalled()
    expect(mocks.logWarn).toHaveBeenCalledWith(
      'blocking automatic update retries after macOS native staging failure',
      { update_version: 'unknown version', reason: 'download-error' }
    )
  })

  test('keeps manual installer URLs channel-correct', async () => {
    const { manualInstallerUrlForReleaseChannel } = await import('../../src/main/updater')
    expect(manualInstallerUrlForReleaseChannel('stable')).toBe(
      'https://updates.blume-page.com/desktop/stable/download'
    )
    expect(manualInstallerUrlForReleaseChannel('canary')).toBe(
      'https://updates.blume-page.com/desktop/canary/isolated-internal/download'
    )
  })

  test('records a bounded install attempt before restart handoff', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )
    mocks.getAllWindows.mockReturnValue([])

    const { restartReadyUpdate, startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    nativeListeners.get('update-downloaded')?.()
    expect(await restartReadyUpdate()).toBe(true)
    await vi.waitFor(() => expect(mocks.writeFile).toHaveBeenCalledTimes(1))
    await vi.waitFor(() =>
      expect(mocks.logInfo).toHaveBeenCalledWith('quitting to install update', {
        destroyed_windows: 0
      })
    )

    const [path, contents, options] = mocks.writeFile.mock.calls[0] ?? []
    expect(path).toBe('/tmp/blume-updater-test-logs/pending-update-install.json')
    expect(options).toEqual({ encoding: 'utf8', mode: 0o600 })
    expect(JSON.parse(String(contents))).toEqual(
      expect.objectContaining({ schema: 1, sourceVersion: '1.2.2', targetVersion: '1.2.3' })
    )
  })

  test('allows another restart attempt after install-attempt preparation rejects', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )
    mocks.appGetVersion
      .mockImplementationOnce(() => {
        throw new Error('version lookup failed')
      })
      .mockReturnValue('1.2.2')
    mocks.getAllWindows.mockReturnValue([])

    const { restartReadyUpdate, startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    nativeListeners.get('update-downloaded')?.()

    await expect(restartReadyUpdate()).rejects.toThrow('version lookup failed')
    expect(await restartReadyUpdate()).toBe(true)
    expect(mocks.appGetVersion).toHaveBeenCalledTimes(2)
    expect(mocks.getAllWindows).toHaveBeenCalledTimes(1)
  })

  test('correlates and clears a successful install attempt on next launch', async () => {
    const record = JSON.stringify({
      schema: 1,
      sourceVersion: '1.2.2',
      targetVersion: '1.2.3',
      recordedAt: '2026-07-21T12:00:00.000Z'
    })
    mocks.appGetVersion.mockReturnValue('1.2.3')
    mocks.fileRead.mockImplementation(async (buffer: Buffer) => {
      const bytesRead = buffer.write(record, 'utf8')
      return { bytesRead, buffer }
    })
    mocks.open.mockResolvedValue({ read: mocks.fileRead, close: mocks.fileClose })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.waitFor(() =>
      expect(mocks.logInfo).toHaveBeenCalledWith('update install confirmed on next launch', {
        source_version: '1.2.2',
        target_version: '1.2.3',
        current_version: '1.2.3'
      })
    )

    expect(mocks.unlink).toHaveBeenCalledWith(
      '/tmp/blume-updater-test-logs/pending-update-install.json'
    )
    expect(mocks.fileRead).toHaveBeenCalledWith(expect.any(Buffer), 0, 1_025, 0)
    expect(mocks.fileClose).toHaveBeenCalledTimes(1)
    expect(mocks.dialogShowMessageBox).not.toHaveBeenCalled()
  })

  test('offers manual recovery when the previous install target is still missing', async () => {
    const record = JSON.stringify({
      schema: 1,
      sourceVersion: '1.2.2',
      targetVersion: '1.2.3',
      recordedAt: '2026-07-21T12:00:00.000Z'
    })
    mocks.fileRead.mockImplementation(async (buffer: Buffer) => {
      const bytesRead = buffer.write(record, 'utf8')
      return { bytesRead, buffer }
    })
    mocks.open.mockResolvedValue({ read: mocks.fileRead, close: mocks.fileClose })
    mocks.dialogShowMessageBox.mockResolvedValue({ response: 0 })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.waitFor(() =>
      expect(mocks.logError).toHaveBeenCalledWith(
        'previous update install was not confirmed',
        expect.objectContaining({ message: expect.stringContaining('current version is 1.2.2') })
      )
    )
    await vi.waitFor(() =>
      expect(mocks.openExternal).toHaveBeenCalledWith(
        'https://updates.blume-page.com/desktop/stable/download'
      )
    )

    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Update Couldn\u2019t Finish',
        message: 'Blume 1.2.3 may not have installed.'
      })
    )
    expect(mocks.unlink).toHaveBeenCalledTimes(1)
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('treats a newer current version as a superseded install attempt without recovery or capture', async () => {
    const record = JSON.stringify({
      schema: 1,
      sourceVersion: '1.0.58',
      targetVersion: '1.0.59',
      recordedAt: '2026-08-25T12:00:00.000Z'
    })
    mocks.appGetVersion.mockReturnValue('1.0.71')
    mocks.fileRead.mockImplementation(async (buffer: Buffer) => {
      const bytesRead = buffer.write(record, 'utf8')
      return { bytesRead, buffer }
    })
    mocks.open.mockResolvedValue({ read: mocks.fileRead, close: mocks.fileClose })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.waitFor(() =>
      expect(mocks.logInfo).toHaveBeenCalledWith(
        'previous update install superseded by newer version',
        {
          source_version: '1.0.58',
          target_version: '1.0.59',
          current_version: '1.0.71'
        }
      )
    )

    expect(mocks.logError).not.toHaveBeenCalledWith(
      'previous update install was not confirmed',
      expect.anything()
    )
    expect(mocks.dialogShowMessageBox).not.toHaveBeenCalled()
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    expect(mocks.unlink).toHaveBeenCalledWith(
      '/tmp/blume-updater-test-logs/pending-update-install.json'
    )
  })

  test('pauses background services before macOS update checks and resumes when no download starts', async () => {
    const calls: string[] = []
    const prepareForUpdateCheck = vi.fn(async () => {
      calls.push('prepare')
    })
    const resumeAfterUpdateCheck = vi.fn(() => {
      calls.push('resume')
    })
    mocks.checkForUpdates.mockImplementation(() => {
      calls.push('check')
      return Promise.resolve(null)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')

    startAutoUpdates({ prepareForUpdateCheck, resumeAfterUpdateCheck })
    await vi.advanceTimersByTimeAsync(10_000)
    await Promise.resolve()
    await Promise.resolve()

    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)
    expect(calls).toEqual(['prepare', 'check', 'resume'])
  })

  test('checks again each hour without overlapping a check already in flight', async () => {
    let resolveFirstCheck: ((value: null) => void) | undefined
    mocks.checkForUpdates.mockImplementationOnce(
      () =>
        new Promise<null>((resolve) => {
          resolveFirstCheck = resolve
        })
    )

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.advanceTimersByTimeAsync(0)

    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(60 * 60_000)
    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)

    resolveFirstCheck?.(null)
    await vi.advanceTimersByTimeAsync(0)
    await vi.advanceTimersByTimeAsync(60 * 60_000)

    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(2)
  })

  test('stops periodic checks after an update is ready to restart', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.advanceTimersByTimeAsync(0)

    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    nativeListeners.get('update-downloaded')?.()
    await vi.advanceTimersByTimeAsync(3 * 60 * 60_000)

    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)
  })

  test('adapts native updater Error objects before forwarding them to the app logger', async () => {
    const nativeError = new Error('The operation couldn’t be completed. Bad file descriptor')
    const { startAutoUpdates } = await import('../../src/main/updater')
    const { autoUpdater } = await import('electron-updater')

    startAutoUpdates()

    expect(() => autoUpdater.logger?.warn(nativeError)).not.toThrow()
    expect(mocks.logWarn).toHaveBeenCalledWith(
      'Error: The operation couldn’t be completed. Bad file descriptor',
      { updater_error: nativeError }
    )
  })

  test('clears pending macOS restart prompt when native staging fails', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    const { startAutoUpdates } = await import('../../src/main/updater')

    const resumeAfterUpdateCheck = vi.fn()
    startAutoUpdates({ resumeAfterUpdateCheck })

    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    updaterListeners.get('error')?.(
      new Error('The operation couldn’t be completed. Bad file descriptor')
    )
    nativeListeners.get('update-downloaded')?.()
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).toHaveBeenCalledTimes(1)
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Update Couldn\u2019t Finish',
        message: 'Blume could not prepare the downloaded update.'
      })
    )
    expect(resumeAfterUpdateCheck).toHaveBeenCalledTimes(1)
    expect(mocks.logWarn).toHaveBeenCalledWith(
      'clearing pending macOS update after updater error',
      { update_version: 'v1.2.3' }
    )
    expect(mocks.logWarn).toHaveBeenCalledWith('ignoring late macOS native updater staging event')
  })

  test('handles late download promise rejection from updater checks', async () => {
    const downloadError = new Error('native staging failed')
    const downloadPromise = Promise.reject(downloadError)
    downloadPromise.catch(() => undefined)
    mocks.checkForUpdates.mockResolvedValue({ downloadPromise })

    const { startAutoUpdates } = await import('../../src/main/updater')

    startAutoUpdates()
    await vi.advanceTimersByTimeAsync(10_000)
    await Promise.resolve()
    await Promise.resolve()

    expect(mocks.checkForUpdates).toHaveBeenCalledTimes(1)
    expect(mocks.logError).toHaveBeenCalledWith('download update failed', downloadError)
  })

  test('keeps routine blocked-feed updater failures non-modal', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    updaterListeners.get('error')?.(
      new Error(
        'Cannot download "https://updates.blume-page.com/desktop/canary/internal/Blume-1.2.3-arm64-mac.zip", status 410: Gone'
      )
    )
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).not.toHaveBeenCalled()
    expect(mocks.logError).toHaveBeenCalledWith('update check failed', expect.any(Error))
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('keeps transient network failures non-modal during native staging', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    updaterListeners.get('error')?.(new Error('net::ERR_NETWORK_CHANGED'))
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).not.toHaveBeenCalled()
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('keeps HTTP/2 protocol failures non-modal during native staging', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    updaterListeners.get('error')?.(new Error('net::ERR_HTTP2_PROTOCOL_ERROR'))
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).not.toHaveBeenCalled()
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('prompts for manual recovery on reportable security failures during native staging', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    updaterListeners.get('error')?.(new Error('net::ERR_CERT_AUTHORITY_INVALID'))
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Blume could not prepare the downloaded update.' })
    )
    expect(mocks.captureAppError).toHaveBeenCalledWith(
      'main.updater',
      expect.objectContaining({ message: 'net::ERR_CERT_AUTHORITY_INVALID' }),
      { updater_message: 'update check failed' }
    )
  })

  test('classifies blocked Blume update downloads as non-fatal updater errors', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error(
          'Cannot download "https://updates.blume-page.com/desktop/canary/internal/Blume-1.0.54-c.0-arm64-mac.zip", status 410: Gone'
        )
      )
    ).toBe(true)
  })

  test('classifies nested Blume update feed failures as non-fatal updater errors', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError({
        message: 'Cannot download update metadata',
        cause: {
          url: 'https://updates.blume-page.com/desktop/stable/latest-mac.yml',
          status: 404
        }
      })
    ).toBe(true)
  })

  test('classifies transient Electron updater network failures without requiring a feed URL', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    for (const message of [
      'net::ERR_INTERNET_DISCONNECTED',
      'net::ERR_NETWORK_CHANGED',
      'net::ERR_NETWORK_IO_SUSPENDED',
      'net::ERR_NETWORK_ACCESS_DENIED',
      'net::ERR_NAME_NOT_RESOLVED',
      'net::ERR_CONNECTION_REFUSED',
      'net::ERR_CONNECTION_RESET',
      'net::ERR_TIMED_OUT',
      'net::ERR_PROXY_CONNECTION_FAILED',
      'net::ERR_TUNNEL_CONNECTION_FAILED',
      'net::ERR_CONTENT_LENGTH_MISMATCH',
      'net::ERR_HTTP2_PROTOCOL_ERROR',
      'net::ERR_QUIC_PROTOCOL_ERROR'
    ]) {
      expect(isNonFatalUpdaterError(new Error(message)), message).toBe(true)
    }
  })

  test('keeps certificate and signing failures reportable', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(isNonFatalUpdaterError(new Error('net::ERR_CERT_AUTHORITY_INVALID'))).toBe(false)
    expect(isNonFatalUpdaterError(new Error('New version is not signed'))).toBe(false)
    expect(
      isNonFatalUpdaterError(
        new Error(
          'Cannot download "https://updates.blume-page.com/desktop/stable/latest-mac.yml": net::ERR_CERT_AUTHORITY_INVALID'
        )
      )
    ).toBe(false)
    expect(
      isNonFatalUpdaterError(
        new Error(
          'Cannot download "https://updates.blume-page.com/desktop/stable/latest-mac.yml": net::ERR_SSL_PROTOCOL_ERROR'
        )
      )
    ).toBe(false)
    // Security markers must win even if a dialog-presentation substring is present.
    expect(
      isNonFatalUpdaterError(new Error('New version is not signed (OSStatus error -60006.)'))
    ).toBe(false)
  })

  test('does not capture transient updater network failures as PostHog exceptions', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()

    for (const message of [
      'net::ERR_NETWORK_CHANGED',
      'net::ERR_TUNNEL_CONNECTION_FAILED',
      'net::ERR_CONNECTION_REFUSED'
    ]) {
      mocks.logError.mockClear()
      mocks.captureAppError.mockClear()
      updaterListeners.get('error')?.(new Error(message))
      await Promise.resolve()

      expect(mocks.logError).toHaveBeenCalledWith(
        'update check failed',
        expect.objectContaining({ message })
      )
      expect(mocks.captureAppError).not.toHaveBeenCalled()
    }
  })

  test('classifies Windows installer spawn permission failures as non-fatal only on win32', async () => {
    const spawnEperm = Object.assign(new Error('spawn EPERM'), {
      code: 'EPERM',
      errno: -4048,
      syscall: 'spawn'
    })
    const spawnEacces = Object.assign(new Error('spawn EACCES'), {
      code: 'EACCES',
      errno: -13,
      syscall: 'spawn'
    })
    const spawnWithPath = Object.assign(
      new Error("spawn 'C:\\Users\\user\\AppData\\Local\\Temp\\blume-setup.exe' EPERM"),
      { code: 'EPERM', syscall: 'spawn' }
    )

    setPlatform('win32')
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')
    expect(isNonFatalUpdaterError(spawnEperm)).toBe(true)
    expect(isNonFatalUpdaterError(spawnEacces)).toBe(true)
    expect(isNonFatalUpdaterError(spawnWithPath)).toBe(true)
    expect(isNonFatalUpdaterError(new Error('EPERM'))).toBe(false)
    expect(isNonFatalUpdaterError(new Error('permission denied'))).toBe(false)

    setPlatform('darwin')
    vi.resetModules()
    const { isNonFatalUpdaterError: isNonFatalOnDarwin } = await import('../../src/main/updater')
    expect(isNonFatalOnDarwin(spawnEperm)).toBe(false)
    expect(isNonFatalOnDarwin(spawnEacces)).toBe(false)
    expect(isNonFatalOnDarwin(spawnWithPath)).toBe(false)

    setPlatform('linux')
    vi.resetModules()
    const { isNonFatalUpdaterError: isNonFatalOnLinux } = await import('../../src/main/updater')
    expect(isNonFatalOnLinux(spawnEperm)).toBe(false)
    expect(isNonFatalOnLinux(spawnEacces)).toBe(false)
  })

  test('classifies update-install target mismatches as non-fatal updater errors', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error('Update install did not reach target version 1.0.59; current version is 1.0.71')
      )
    ).toBe(true)
    expect(
      isNonFatalUpdaterError(
        new Error('Update install did not reach target version 1.0.66; current version is 1.0.60')
      )
    ).toBe(true)
  })

  test('classifies macOS native staging timeouts as non-fatal updater errors', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error('macOS native updater did not stage v1.0.72 within 120000ms')
      )
    ).toBe(true)
    expect(
      isNonFatalUpdaterError(new Error('macOS native updater did not stage v1.2.3 within 120000ms'))
    ).toBe(true)
  })

  test('classifies manual-recovery dialog presentation failures as non-fatal', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error('The operation couldn\u2019t be completed. (OSStatus error -60006.)')
      )
    ).toBe(true)
    expect(isNonFatalUpdaterError(new Error('The request timed out.'))).toBe(true)
    expect(isNonFatalUpdaterError(new Error('Превышен лимит времени на запрос.'))).toBe(true)
    // Substring-only English timeout without the Apple dialog terminator stays fatal.
    expect(
      isNonFatalUpdaterError(
        new Error('The request timed out while contacting the update proxy')
      )
    ).toBe(false)
    // Keep unrelated timeout strings reportable unless they have their own marker.
    expect(isNonFatalUpdaterError(new Error('request timed out waiting for socket'))).toBe(false)
    expect(isNonFatalUpdaterError(new Error('operation timed out'))).toBe(false)
  })

  test('does not capture manual-recovery dialog presentation failures as PostHog exceptions', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        // Native staging listener is registered but unused in this scenario.
        void event
        void listener
      }
    )

    const dialogError = new Error(
      'The operation couldn\u2019t be completed. (OSStatus error -60006.)'
    )
    mocks.dialogShowMessageBox.mockRejectedValue(dialogError)

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.advanceTimersByTimeAsync(0)

    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    mocks.logError.mockClear()
    mocks.captureAppError.mockClear()
    await vi.advanceTimersByTimeAsync(120_000)
    await Promise.resolve()
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).toHaveBeenCalled()
    expect(mocks.logError).toHaveBeenCalledWith('manual update prompt failed', dialogError)
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('classifies read-only volume updater failures as non-fatal updater errors', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error(
          "Cannot update while running on a read-only volume. The application is on a read-only volume. Please move the application and try again. If you're on macOS Sierra or later, you'll need to move the application out of the Downloads directory. See https://github.com/Squirrel/Squirrel.Mac/issues/182 for more information."
        )
      )
    ).toBe(true)
    expect(
      isNonFatalUpdaterError(
        new Error('Cannot update while running on a READ-ONLY VOLUME. Please move the application.')
      )
    ).toBe(true)
    expect(isNonFatalUpdaterError(new Error('The application is on a read-only volume.'))).toBe(
      true
    )
  })

  test('does not capture read-only volume updater failures as PostHog exceptions', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()

    const readOnlyError = new Error(
      "Cannot update while running on a read-only volume. The application is on a read-only volume. Please move the application and try again. If you're on macOS Sierra or later, you'll need to move the application out of the Downloads directory. See https://github.com/Squirrel/Squirrel.Mac/issues/182 for more information."
    )
    mocks.logError.mockClear()
    mocks.captureAppError.mockClear()
    updaterListeners.get('error')?.(readOnlyError)
    await Promise.resolve()

    expect(mocks.logError).toHaveBeenCalledWith('update check failed', readOnlyError)
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    expect(mocks.dialogShowMessageBox).not.toHaveBeenCalled()
  })

  test('prompts for manual recovery on read-only volume failures during uncorrelated native staging', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })

    const readOnlyError = new Error(
      "Cannot update while running on a read-only volume. The application is on a read-only volume. Please move the application and try again. If you're on macOS Sierra or later, you'll need to move the application out of the Downloads directory. See https://github.com/Squirrel/Squirrel.Mac/issues/182 for more information."
    )
    mocks.logError.mockClear()
    mocks.captureAppError.mockClear()
    updaterListeners.get('error')?.(readOnlyError)
    await Promise.resolve()
    updaterListeners.get('error')?.(readOnlyError)
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).toHaveBeenCalledTimes(1)
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Update Couldn\u2019t Finish',
        message: 'Blume could not prepare the downloaded update.'
      })
    )
    expect(mocks.logError).toHaveBeenCalledWith('update check failed', readOnlyError)
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('prompts for manual recovery on read-only volume failures after early native staging', async () => {
    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    const nativeListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })
    mocks.nativeUpdaterOn.mockImplementation(
      (event: string, listener: (...args: unknown[]) => void) => {
        nativeListeners.set(event, listener)
      }
    )

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    nativeListeners.get('update-downloaded')?.()

    const readOnlyError = new Error(
      'Cannot update while running on a read-only volume. Please move the application and try again.'
    )
    mocks.captureAppError.mockClear()
    updaterListeners.get('error')?.(readOnlyError)
    await Promise.resolve()

    expect(mocks.dialogShowMessageBox).toHaveBeenCalledTimes(1)
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Blume could not prepare the downloaded update.' })
    )
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('prompts for manual recovery when download fails with read-only volume during native staging', async () => {
    let rejectDownload: (err: Error) => void = () => undefined
    const downloadPromise = new Promise<never>((_, reject) => {
      rejectDownload = reject
    })
    downloadPromise.catch(() => undefined)
    mocks.checkForUpdates.mockResolvedValue({ downloadPromise })

    const updaterListeners = new Map<string, (...args: unknown[]) => void>()
    mocks.updaterOn.mockImplementation((event: string, listener: (...args: unknown[]) => void) => {
      updaterListeners.set(event, listener)
    })

    const { startAutoUpdates } = await import('../../src/main/updater')
    startAutoUpdates()
    await vi.advanceTimersByTimeAsync(0)
    await Promise.resolve()
    await Promise.resolve()

    updaterListeners.get('update-downloaded')?.({ version: '1.2.3' })
    const readOnlyError = new Error(
      'Cannot update while running on a read-only volume. Please move the application and try again.'
    )
    mocks.logError.mockClear()
    mocks.captureAppError.mockClear()
    mocks.dialogShowMessageBox.mockClear()
    rejectDownload(readOnlyError)
    await Promise.resolve()
    await Promise.resolve()

    expect(mocks.logError).toHaveBeenCalledWith('download update failed', readOnlyError)
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledTimes(1)
    expect(mocks.dialogShowMessageBox).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Blume could not prepare the downloaded update.' })
    )
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('keeps signing failures reportable even when paired with staging-timeout wording', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error(
          'macOS native updater did not stage v1.0.72 within 120000ms; New version is not signed'
        )
      )
    ).toBe(false)
    expect(
      isNonFatalUpdaterError(
        new Error(
          'macOS native updater did not stage v1.0.72 within 120000ms; net::ERR_CERT_AUTHORITY_INVALID'
        )
      )
    ).toBe(false)
  })

  test('keeps signing failures reportable even when paired with read-only volume wording', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error('Cannot update while running on a read-only volume; New version is not signed')
      )
    ).toBe(false)
    expect(
      isNonFatalUpdaterError(
        new Error(
          'Cannot update while running on a read-only volume; net::ERR_CERT_AUTHORITY_INVALID'
        )
      )
    ).toBe(false)
    expect(
      isNonFatalUpdaterError(new Error('signature verification failed while on a read-only volume'))
    ).toBe(false)
  })

  test('keeps signing failures reportable even when paired with install-mismatch wording', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(
      isNonFatalUpdaterError(
        new Error('Update install did not reach target version 1.0.66; New version is not signed')
      )
    ).toBe(false)
    expect(
      isNonFatalUpdaterError(
        new Error('signature verification failed during update install correlation')
      )
    ).toBe(false)
  })

  test('does not capture Windows installer spawn EPERM as PostHog exceptions', async () => {
    setPlatform('win32')
    mocks.getAllWindows.mockReturnValue([])
    const spawnEperm = Object.assign(new Error('spawn EPERM'), {
      code: 'EPERM',
      errno: -4048,
      syscall: 'spawn'
    })
    mocks.quitAndInstall.mockImplementation(() => {
      throw spawnEperm
    })

    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')
    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.logError).toHaveBeenCalledWith('quitAndInstall failed', spawnEperm)
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('does not capture Windows installer spawn EACCES as PostHog exceptions', async () => {
    setPlatform('win32')
    mocks.getAllWindows.mockReturnValue([])
    const spawnEacces = Object.assign(new Error('spawn EACCES'), {
      code: 'EACCES',
      errno: -13,
      syscall: 'spawn'
    })
    mocks.quitAndInstall.mockImplementation(() => {
      throw spawnEacces
    })

    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')
    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.logError).toHaveBeenCalledWith('quitAndInstall failed', spawnEacces)
    expect(mocks.captureAppError).not.toHaveBeenCalled()
  })

  test('still captures installer spawn EPERM on non-Windows platforms', async () => {
    setPlatform('darwin')
    mocks.getAllWindows.mockReturnValue([])
    const spawnEperm = Object.assign(new Error('spawn EPERM'), {
      code: 'EPERM',
      errno: -1,
      syscall: 'spawn'
    })
    mocks.quitAndInstall.mockImplementation(() => {
      throw spawnEperm
    })

    const { installDownloadedUpdateForRestart } = await import('../../src/main/updater')
    installDownloadedUpdateForRestart()
    await vi.advanceTimersByTimeAsync(250)

    expect(mocks.logError).toHaveBeenCalledWith('quitAndInstall failed', spawnEperm)
    expect(mocks.captureAppError).toHaveBeenCalledWith('main.updater', spawnEperm, {
      updater_message: 'quitAndInstall failed'
    })
  })

  test('does not classify unrelated main-process errors as updater errors', async () => {
    const { isNonFatalUpdaterError } = await import('../../src/main/updater')

    expect(isNonFatalUpdaterError(new Error('database migration failed'))).toBe(false)
    expect(
      isNonFatalUpdaterError(
        new Error('Cannot download "https://example.com/asset.zip", status 410: Gone')
      )
    ).toBe(false)
  })
})
