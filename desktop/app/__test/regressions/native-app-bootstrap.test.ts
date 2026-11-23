import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  appOn: vi.fn(),
  appSetName: vi.fn(),
  buildFromTemplate: vi.fn((template: unknown[]) => template),
  setAppUserModelId: vi.fn(),
  setApplicationMenu: vi.fn(),
  watchWindowShortcuts: vi.fn()
}))

vi.mock('electron', () => ({
  app: {
    on: mocks.appOn,
    setName: mocks.appSetName
  },
  Menu: {
    buildFromTemplate: mocks.buildFromTemplate,
    setApplicationMenu: mocks.setApplicationMenu
  }
}))

vi.mock('@electron-toolkit/utils', () => ({
  electronApp: { setAppUserModelId: mocks.setAppUserModelId },
  optimizer: { watchWindowShortcuts: mocks.watchWindowShortcuts }
}))

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

describe('native app bootstrap', () => {
  beforeEach(() => {
    for (const mock of Object.values(mocks)) mock.mockClear()
    Object.defineProperty(process, 'platform', { configurable: true, value: 'darwin' })
  })

  afterEach(() => {
    if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
    vi.resetModules()
  })

  test('keeps a channel-aware manual installer action in the macOS Help menu', async () => {
    const openLatestInstaller = vi.fn(async () => undefined)
    const { bootstrapReadyNativeApp } = await import('../../src/main/nativeAppBootstrap')

    bootstrapReadyNativeApp({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      openLatestInstaller,
      runStartupInstall: vi.fn(),
      writeDevSandboxMeta: vi.fn(async () => undefined)
    })

    const template = mocks.buildFromTemplate.mock.calls[0]?.[0] as Array<{
      role?: string
      submenu?: Array<{ label?: string; click?: () => void }>
    }>
    const helpMenu = template.find((item) => item.role === 'help')
    const downloadLatest = helpMenu?.submenu?.find(
      (item) => item.label === 'Download Latest Blume…'
    )

    expect(downloadLatest).toBeDefined()
    downloadLatest?.click?.()
    await Promise.resolve()
    expect(openLatestInstaller).toHaveBeenCalledTimes(1)
  })
})
