import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const trays: Array<{
    tooltip: string
    menu: unknown
    destroy: ReturnType<typeof vi.fn>
    listeners: Map<string, () => void>
  }> = []
  return {
    trays,
    appActive: true,
    darkTheme: false,
    workAreaHeight: 900,
    measuredPopoverHeight: 400,
    popoverMeasurementError: null as Error | null,
    popoverLoad: null as (() => Promise<void>) | null,
    nativeThemeListeners: new Map<string, () => void>(),
    browserWindows: [] as Array<{
      show: ReturnType<typeof vi.fn>
      hide: ReturnType<typeof vi.fn>
      destroy: ReturnType<typeof vi.fn>
      isFocused: ReturnType<typeof vi.fn>
      loadURL: ReturnType<typeof vi.fn>
      setBounds: ReturnType<typeof vi.fn>
      setVisibleOnAllWorkspaces: ReturnType<typeof vi.fn>
      webContentsListeners: Map<string, (...args: unknown[]) => void>
      webContents: { executeJavaScript: ReturnType<typeof vi.fn> }
    }>,
    menuTemplates: [] as unknown[][],
    createFromBuffer: vi.fn(),
    createFromPath: vi.fn(),
    renderSvg: vi.fn()
  }
})

function image() {
  return {
    isEmpty: () => false,
    resize: () => image(),
    setTemplateImage: vi.fn(),
    toDataURL: () => 'data:image/png;base64,AA=='
  }
}

vi.mock('electron', () => ({
  app: {
    isActive: vi.fn(() => mocks.appActive)
  },
  BrowserWindow: class {
    visible = false
    webContentsListeners = new Map<string, (...args: unknown[]) => void>()
    webContents = {
      isDestroyed: vi.fn(() => false),
      on: vi.fn((event: string, listener: (...args: unknown[]) => void) => {
        this.webContentsListeners.set(event, listener)
      }),
      executeJavaScript: vi.fn(async (script: string) => {
        if (!script.includes("document.querySelector('.panel')")) {
          return 'data:image/png;base64,AA=='
        }
        if (mocks.popoverMeasurementError) throw mocks.popoverMeasurementError
        return mocks.measuredPopoverHeight
      })
    }

    constructor() {
      mocks.browserWindows.push(this)
    }

    isDestroyed = vi.fn(() => false)
    isVisible = vi.fn(() => this.visible)
    isFocused = vi.fn(() => true)
    loadURL = vi.fn(() => mocks.popoverLoad?.() ?? Promise.resolve())
    on = vi.fn()
    destroy = vi.fn()
    hide = vi.fn(() => {
      this.visible = false
    })
    show = vi.fn(() => {
      this.visible = true
    })
    focus = vi.fn()
    setAlwaysOnTop = vi.fn()
    setVisibleOnAllWorkspaces = vi.fn()
    setBounds = vi.fn()
  },
  Menu: {
    buildFromTemplate: (template: unknown[]) => {
      mocks.menuTemplates.push(template)
      return { on: vi.fn() }
    }
  },
  Tray: class {
    tooltip = ''
    menu: unknown = null
    destroy = vi.fn()
    listeners = new Map<string, () => void>()

    constructor() {
      mocks.trays.push(this)
    }

    setIgnoreDoubleClickEvents = vi.fn()
    on = vi.fn((event: string, listener: () => void) => {
      this.listeners.set(event, listener)
    })
    setHighlightMode = vi.fn()
    setImage = vi.fn()
    setTitle = vi.fn()
    setToolTip = (value: string) => {
      this.tooltip = value
    }
    setContextMenu = (value: unknown) => {
      this.menu = value
    }
    popUpContextMenu = vi.fn()
    getBounds = vi.fn(() => ({ x: 100, y: 0, width: 24, height: 24 }))
  },
  nativeImage: {
    createFromBuffer: mocks.createFromBuffer,
    createFromPath: mocks.createFromPath
  },
  nativeTheme: {
    get shouldUseDarkColors() {
      return mocks.darkTheme
    },
    on: vi.fn((event: string, listener: () => void) => {
      mocks.nativeThemeListeners.set(event, listener)
    }),
    removeListener: vi.fn((event: string, listener: () => void) => {
      if (mocks.nativeThemeListeners.get(event) === listener) {
        mocks.nativeThemeListeners.delete(event)
      }
    })
  },
  screen: {
    getDisplayNearestPoint: vi.fn(() => ({
      workArea: { x: 0, y: 0, width: 1440, height: mocks.workAreaHeight }
    }))
  }
}))

vi.mock('@resvg/resvg-js', () => ({
  renderAsync: mocks.renderSvg
}))

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

describe('native menu bar status', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.trays.length = 0
    mocks.appActive = true
    mocks.browserWindows.length = 0
    mocks.menuTemplates.length = 0
    mocks.createFromBuffer.mockImplementation(() => image())
    mocks.createFromPath.mockImplementation(() => image())
    mocks.renderSvg.mockResolvedValue({ asPng: () => Buffer.from([137, 80, 78, 71]) })
    mocks.darkTheme = false
    mocks.workAreaHeight = 900
    mocks.measuredPopoverHeight = 400
    mocks.popoverMeasurementError = null
    mocks.popoverLoad = null
    mocks.nativeThemeListeners.clear()
    Object.defineProperty(process, 'platform', { configurable: true, value: 'darwin' })
  })

  afterEach(() => {
    if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
    vi.resetModules()
  })

  test('loads and renders status counts when conversations are hidden', async () => {
    let runningTitle = 'Initial running conversation'
    mocks.workAreaHeight = 300
    mocks.popoverMeasurementError = new Error('measurement failed')
    const captureAppError = vi.fn()
    const settings = new Map<string, string>([
      ['menuBarShowStatusRunning', 'false'],
      ['menuBarShowConversations', 'false']
    ])
    const loadConversationProjection = vi.fn(async () => ({
      rows: [
        { ref: 'running', source: 'claude', title: runningTitle, state: 'running' },
        { ref: 'waiting', source: 'claude', title: 'Waiting', state: 'needs-approval' },
        { ref: 'finished', source: 'claude', title: 'Finished', state: 'finished' }
      ],
      totalConversationCount: 3,
      counts: { running: 1, waiting: 1, finished: 1 }
    }))
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume Dev – Timeline design comparison',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection,
      fetchUsageReport: vi.fn(() => new Promise(() => undefined)),
      isFeatureEnabled: async () => true,
      captureAppError,
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })

    await facade.sync()

    expect(loadConversationProjection).toHaveBeenCalled()
    expect(mocks.browserWindows).toHaveLength(0)
    expect(mocks.trays[0]?.tooltip).toBe(
      'Blume Dev – Timeline design comparison: 1 waiting for approval, 1 complete'
    )
    expect(mocks.menuTemplates).toHaveLength(0)
    expect(mocks.trays[0]?.menu).toBeNull()
    let resolvePopoverLoad!: () => void
    const pendingPopoverLoad = new Promise<void>((resolve) => {
      resolvePopoverLoad = resolve
    })
    mocks.popoverLoad = () => pendingPopoverLoad
    mocks.trays[0]?.listeners.get('mouse-enter')?.()
    expect(mocks.browserWindows).toHaveLength(0)
    await vi.waitFor(() => expect(mocks.browserWindows).toHaveLength(1))
    // Hover preloading must not hide the app from the Dock before any click.
    expect(mocks.browserWindows[0]?.setVisibleOnAllWorkspaces).toHaveBeenCalledWith(true, {
      visibleOnFullScreen: true,
      skipTransformProcessType: true
    })
    mocks.trays[0]?.listeners.get('click')?.()
    expect(mocks.browserWindows[0]?.show).not.toHaveBeenCalled()
    resolvePopoverLoad()
    mocks.popoverLoad = null
    await vi.waitFor(() =>
      expect(mocks.browserWindows.some((window) => window.show.mock.calls.length > 0)).toBe(true)
    )
    const popover = mocks.browserWindows.find((window) => window.show.mock.calls.length > 0)
    expect(
      decodeURIComponent(String(popover?.loadURL.mock.calls[0]?.[0]).split(',').slice(1).join(','))
    ).not.toContain('background-image:url("data:image/png;base64,AA==")')
    expect(captureAppError).toHaveBeenCalledWith(
      'main.menu-bar-popover-height',
      mocks.popoverMeasurementError
    )
    mocks.popoverMeasurementError = null
    const loadCount = popover?.loadURL.mock.calls.length
    mocks.trays[0]?.listeners.get('click')?.()
    mocks.trays[0]?.listeners.get('click')?.()
    expect(popover?.loadURL).toHaveBeenCalledTimes(loadCount ?? 0)
    await vi.waitFor(() => expect(popover?.show).toHaveBeenCalledTimes(2))
    expect(popover?.setBounds).toHaveBeenCalledWith(expect.objectContaining({ height: 284 }), false)
    // Its spinners run only while it is open.
    expect(popover?.webContents.executeJavaScript).toHaveBeenCalledWith(
      "document.body.dataset.motion = 'running'",
      true
    )

    runningTitle = 'Updated without refreshing the cached worker snapshot'
    mocks.workAreaHeight = 900
    mocks.measuredPopoverHeight = 240
    settings.set('menuBarShowConversations', 'true')
    await facade.notifySettingChanged('menuBarShowConversations')
    expect(loadConversationProjection).toHaveBeenCalledTimes(1)
    mocks.trays[0]?.listeners.get('click')?.()
    mocks.trays[0]?.listeners.get('click')?.()
    await vi.waitFor(() => expect(popover?.loadURL).toHaveBeenCalledTimes((loadCount ?? 0) + 1))
    expect(
      decodeURIComponent(String(popover?.loadURL.mock.lastCall?.[0]).split(',').slice(1).join(','))
    ).toContain('Initial running conversation')
    await vi.waitFor(() =>
      expect(popover?.setBounds).toHaveBeenLastCalledWith(
        expect.objectContaining({ height: 240 }),
        false
      )
    )

    popover?.hide()
    mocks.measuredPopoverHeight = Number.NaN
    mocks.darkTheme = true
    mocks.nativeThemeListeners.get('updated')?.()
    expect(loadConversationProjection).toHaveBeenCalledTimes(1)
    mocks.trays[0]?.listeners.get('click')?.()
    await vi.waitFor(() =>
      expect(
        decodeURIComponent(
          String(popover?.loadURL.mock.lastCall?.[0]).split(',').slice(1).join(',')
        )
      ).toContain('<html class="dark">')
    )
    expect(popover?.setBounds).toHaveBeenLastCalledWith(
      expect.objectContaining({ height: 240 }),
      false
    )
    const hideCount = popover?.hide.mock.calls.length ?? 0
    await vi.waitFor(() => expect(popover?.show.mock.calls.length).toBeGreaterThan(2))
    expect(popover?.isFocused()).toBe(true)
    mocks.appActive = false
    await vi.waitFor(() => expect(popover?.hide).toHaveBeenCalledTimes(hideCount + 1))
    expect(popover?.webContents.executeJavaScript).toHaveBeenLastCalledWith(
      "document.body.dataset.motion = 'paused'",
      true
    )
    facade.destroy()
    expect(mocks.nativeThemeListeners.has('updated')).toBe(false)
  }, 30_000)

  test('runs the popover spinners only while it is open', async () => {
    const settings = new Map<string, string>([['menuBarShowConversations', 'true']])
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection: vi.fn(async () => ({
        rows: [{ ref: 'running', source: 'claude', title: 'Working', state: 'running' }],
        totalConversationCount: 1,
        counts: { running: 1, waiting: 0, finished: 0 }
      })),
      fetchUsageReport: vi.fn(() => new Promise(() => undefined)),
      isFeatureEnabled: async () => true,
      captureAppError: vi.fn(),
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })
    await facade.sync()
    const motionCalls = () =>
      (mocks.browserWindows[0]?.webContents.executeJavaScript.mock.calls ?? [])
        .map(([script]) => String(script))
        .filter((script) => script.startsWith('document.body.dataset.motion'))

    // Preloaded on hover but never shown: a hidden popover must never start its loops.
    mocks.trays[0]?.listeners.get('mouse-enter')?.()
    await vi.waitFor(() => expect(mocks.browserWindows[0]?.loadURL).toHaveBeenCalled())
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(motionCalls()).toEqual([])
    const popover = mocks.browserWindows[0]

    mocks.trays[0]?.listeners.get('click')?.()
    await vi.waitFor(() => expect(popover?.show).toHaveBeenCalled())
    expect(motionCalls().at(-1)).toBe("document.body.dataset.motion = 'running'")

    // A model change while it is open reloads the page, which starts paused; it keeps moving.
    const loads = popover?.loadURL.mock.calls.length ?? 0
    mocks.darkTheme = true
    mocks.nativeThemeListeners.get('updated')?.()
    await vi.waitFor(() => expect(popover?.loadURL.mock.calls.length).toBeGreaterThan(loads))
    await vi.waitFor(() => expect(motionCalls().length).toBe(2))
    expect(motionCalls().at(-1)).toBe("document.body.dataset.motion = 'running'")

    const blur = (popover as unknown as { on: ReturnType<typeof vi.fn> }).on.mock.calls.find(
      ([event]) => event === 'blur'
    )?.[1] as () => void
    blur()
    expect(motionCalls().at(-1)).toBe("document.body.dataset.motion = 'paused'")
    expect(popover?.hide).toHaveBeenCalled()

    // Re-rendered while hidden (warm): still paused, no 'running'.
    const pausedAt = motionCalls().length
    mocks.darkTheme = false
    mocks.nativeThemeListeners.get('updated')?.()
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(motionCalls().slice(pausedAt)).not.toContain("document.body.dataset.motion = 'running'")
    facade.destroy()
  })

  test('shows a first click after the initial conversation snapshot arrives', async () => {
    let resolveConversationProjection!: (projection: {
      rows: Array<{ ref: string; source: 'codex'; title: string; state: 'running' }>
      totalConversationCount: number
      counts: { running: number; waiting: number; finished: number }
    }) => void
    const conversationProjection = new Promise<{
      rows: Array<{ ref: string; source: 'codex'; title: string; state: 'running' }>
      totalConversationCount: number
      counts: { running: number; waiting: number; finished: number }
    }>((resolve) => {
      resolveConversationProjection = resolve
    })
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: () => null,
      loadConversationProjection: () => conversationProjection,
      fetchUsageReport: vi.fn(() => new Promise(() => undefined)),
      isFeatureEnabled: async () => true,
      captureAppError: vi.fn(),
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })

    const sync = facade.sync()
    await vi.waitFor(() => expect(mocks.trays).toHaveLength(1))
    mocks.trays[0]?.listeners.get('click')?.()
    expect(mocks.browserWindows).toHaveLength(0)

    resolveConversationProjection({
      rows: [{ ref: 'codex:first-click', source: 'codex', title: 'Ready', state: 'running' }],
      totalConversationCount: 1,
      counts: { running: 1, waiting: 0, finished: 0 }
    })
    await sync

    await vi.waitFor(() => expect(mocks.browserWindows).toHaveLength(1))
    await vi.waitFor(() => expect(mocks.browserWindows[0]?.show).toHaveBeenCalledOnce())
    expect(
      decodeURIComponent(
        String(mocks.browserWindows[0]?.loadURL.mock.calls[0]?.[0]).split(',').slice(1).join(',')
      )
    ).toContain('Ready')

    facade.destroy()
  })

  test('rerenders refreshed usage before showing an in-flight popover', async () => {
    const settings = new Map<string, string>([['menuBarShowUsage', 'true']])
    const usageReport = (usedPercent: number) => ({
      fetchedAt: Date.now(),
      providers: [
        {
          provider: 'cursor' as const,
          status: 'ok' as const,
          account: null,
          plan: null,
          windows: [{ id: 'session', label: 'Session', usedPercent, resetsAt: null }],
          costUsd: null,
          detail: null,
          cta: null
        }
      ]
    })
    let resolveRefreshedUsage!: (report: ReturnType<typeof usageReport>) => void
    const refreshedUsage = new Promise<ReturnType<typeof usageReport>>((resolve) => {
      resolveRefreshedUsage = resolve
    })
    const fetchUsageReport = vi.fn(() =>
      fetchUsageReport.mock.calls.length === 1 ? Promise.resolve(usageReport(20)) : refreshedUsage
    )
    let resolveInitialLoad!: () => void
    const initialLoad = new Promise<void>((resolve) => {
      resolveInitialLoad = resolve
    })
    let popoverLoadCount = 0
    mocks.popoverLoad = () => (++popoverLoadCount === 1 ? initialLoad : Promise.resolve())

    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection: async () => ({
        rows: [{ ref: 'running', source: 'cursor', title: 'Running', state: 'running' }],
        totalConversationCount: 1,
        counts: { running: 1, waiting: 0, finished: 0 }
      }),
      fetchUsageReport,
      isFeatureEnabled: async () => true,
      captureAppError: vi.fn(),
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })

    await facade.sync()
    await vi.waitFor(() => expect(mocks.trays[0]?.tooltip).toContain('Cursor 80% remaining'))
    mocks.trays[0]?.listeners.get('click')?.()
    await vi.waitFor(() => expect(mocks.browserWindows[0]?.loadURL).toHaveBeenCalledTimes(1))
    expect(mocks.browserWindows[0]?.show).not.toHaveBeenCalled()

    resolveRefreshedUsage(usageReport(60))
    await vi.waitFor(() => expect(mocks.trays[0]?.tooltip).toContain('Cursor 40% remaining'))
    resolveInitialLoad()

    await vi.waitFor(() => expect(mocks.browserWindows[0]?.loadURL).toHaveBeenCalledTimes(2))
    await vi.waitFor(() => expect(mocks.browserWindows[0]?.show).toHaveBeenCalledOnce())
    const renderedHtml = mocks.browserWindows[0]?.loadURL.mock.calls.map(([url]) =>
      decodeURIComponent(String(url).split(',').slice(1).join(','))
    )
    expect(renderedHtml?.[0]).toContain('80% remaining')
    expect(renderedHtml?.[1]).toContain('40% remaining')

    facade.destroy()
  })

  test('keeps shared status and usage indicators in the native fallback image', async () => {
    const settings = new Map<string, string>([
      ['menuBarShowConversations', 'false'],
      ['menuBarShowUsage', 'true']
    ])
    mocks.createFromBuffer.mockImplementation((buffer: Buffer) => {
      return buffer[0] === 137 ? image() : { ...image(), isEmpty: () => true }
    })
    mocks.renderSvg.mockRejectedValue(new Error('rasterizer unavailable'))
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection: async () => ({
        rows: [{ ref: 'running', source: 'claude', title: 'Running', state: 'running' }],
        totalConversationCount: 1,
        counts: { running: 1, waiting: 0, finished: 0 }
      }),
      fetchUsageReport: vi.fn(async () => ({
        fetchedAt: Date.now(),
        providers: [
          {
            provider: 'cursor' as const,
            status: 'ok' as const,
            account: null,
            plan: null,
            windows: [{ id: 'session', label: 'Session', usedPercent: 20, resetsAt: null }],
            costUsd: null,
            detail: null,
            cta: null
          }
        ]
      })),
      isFeatureEnabled: async () => true,
      captureAppError: vi.fn(),
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })

    await facade.sync()
    await vi.waitFor(() =>
      expect(mocks.createFromBuffer.mock.calls.some(([buffer]) => buffer[0] === 137)).toBe(true)
    )
    const fallbackBuffer = mocks.createFromBuffer.mock.calls
      .map(([buffer]) => buffer as Buffer)
      .find((buffer) => buffer[0] === 137)
    expect(fallbackBuffer?.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    expect(fallbackBuffer?.readUInt32BE(16)).toBeGreaterThan(100)
    facade.destroy()
  })

  test('rasterizes one finite tray animation cycle and reuses its native images', async () => {
    vi.useFakeTimers()
    const settings = new Map<string, string>([['menuBarShowUsage', 'false']])
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection: async () => ({
        rows: [{ ref: 'running', source: 'claude', title: 'Running', state: 'running' }],
        totalConversationCount: 1,
        counts: { running: 1, waiting: 1, finished: 0 }
      }),
      fetchUsageReport: vi.fn(() => new Promise(() => undefined)),
      isFeatureEnabled: async () => true,
      captureAppError: vi.fn(),
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })

    await facade.sync()
    await vi.advanceTimersByTimeAsync(24 * 120)
    // Initial sync paints the empty pre-snapshot model once, then the running
    // projection fills one complete 24-frame cache.
    expect(mocks.renderSvg).toHaveBeenCalledTimes(25)
    const rasterizedCycle = mocks.renderSvg.mock.calls.map(([svg]) => svg)
    expect(new Set(rasterizedCycle).size).toBe(25)

    await vi.advanceTimersByTimeAsync(48 * 120)
    expect(mocks.renderSvg).toHaveBeenCalledTimes(25)
    expect(mocks.trays[0]?.setImage).toHaveBeenCalledTimes(2 + 24 + 48)

    facade.destroy()
    vi.useRealTimers()
  })

  test('bounds fallback rasterization when the rasterizer keeps failing', async () => {
    vi.useFakeTimers()
    mocks.renderSvg.mockRejectedValue(new Error('rasterizer unavailable'))
    const captureAppError = vi.fn()
    const settings = new Map<string, string>([['menuBarShowUsage', 'false']])
    let counts = { running: 1, waiting: 1, finished: 0 }
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection: async () => ({
        rows: [{ ref: 'running', source: 'claude', title: 'Running', state: 'running' }],
        totalConversationCount: 1,
        counts
      }),
      fetchUsageReport: vi.fn(() => new Promise(() => undefined)),
      isFeatureEnabled: async () => true,
      captureAppError,
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu: async () => undefined,
        openConversationFromNativeMenu: async () => undefined
      }
    })

    await facade.sync()
    await vi.advanceTimersByTimeAsync(24 * 120)
    // Pre-snapshot model plus one complete 24-frame cycle, every attempt
    // rejected and replaced by one cached fallback rasterization each.
    expect(mocks.renderSvg).toHaveBeenCalledTimes(25)
    expect(mocks.createFromBuffer).toHaveBeenCalledTimes(25)

    await vi.advanceTimersByTimeAsync(48 * 120)
    // Two more full cycles reuse the cached fallback frames: no new
    // rasterizer attempts and no repeated fallback PNG encoding on main.
    expect(mocks.renderSvg).toHaveBeenCalledTimes(25)
    expect(mocks.createFromBuffer).toHaveBeenCalledTimes(25)
    expect(mocks.trays[0]?.setImage).toHaveBeenCalledTimes(2 + 24 + 48)
    expect(captureAppError).toHaveBeenCalledTimes(1)
    expect(captureAppError).toHaveBeenCalledWith('main.menu-bar-render', expect.any(Error))

    // A visual-model change replaces the cache key and retries the real
    // rasterizer instead of sticking with stale fallback frames forever.
    counts = { running: 2, waiting: 1, finished: 0 }
    await facade.sync()
    await vi.advanceTimersByTimeAsync(0)
    expect(mocks.renderSvg).toHaveBeenCalledTimes(26)
    expect(mocks.createFromBuffer).toHaveBeenCalledTimes(26)

    facade.destroy()
    vi.useRealTimers()
  })

  test('orders enabled provider usage and renders session reset rows and tooltip', async () => {
    const settings = new Map<string, string>([['menuBarShowUsage', 'true']])
    const now = Date.now()
    const fetchUsageReport = vi.fn(async () => ({
      fetchedAt: now,
      providers: [
        {
          provider: 'codex' as const,
          status: 'ok' as const,
          account: null,
          plan: null,
          windows: [
            { id: 'session', label: 'Session (5h)', usedPercent: 40, resetsAt: now + 120_000 },
            { id: 'weekly', label: 'Weekly', usedPercent: 25, resetsAt: now + 604_800_000 }
          ],
          costUsd: null,
          detail: null,
          cta: null
        },
        {
          provider: 'cursor' as const,
          status: 'ok' as const,
          account: null,
          plan: null,
          windows: [{ id: 'session', label: 'Session', usedPercent: 20, resetsAt: now + 60_000 }],
          costUsd: null,
          detail: null,
          cta: null
        },
        {
          provider: 'claude' as const,
          status: 'ok' as const,
          account: null,
          plan: null,
          windows: [{ id: 'weekly', label: 'Weekly', usedPercent: 10, resetsAt: null }],
          costUsd: null,
          detail: null,
          cta: null
        }
      ]
    }))
    const { createDesktopNativeMenuBarStatusFacade } =
      await import('../../src/main/nativeMenuBarStatus')
    const openPathFromNativeMenu = vi.fn(async () => undefined)
    const openConversationFromNativeMenu = vi.fn(async () => undefined)
    const facade = createDesktopNativeMenuBarStatusFacade({
      appDisplayName: 'Blume',
      appIcon: '/tmp/blume.png',
      flowerAssets: {
        bluebell: '/tmp/bluebell.png',
        forgetmenot: '/tmp/forgetmenot.png',
        tulip: '/tmp/tulip.png',
        sunflower: '/tmp/sunflower.png',
        lantana: '/tmp/lantana.png',
        daylily: '/tmp/daylily.png'
      },
      harnessIconAssets: {},
      trayFontFiles: ['/tmp/tray-font.ttf'],
      getSetting: (key) => settings.get(key) ?? null,
      loadConversationProjection: async () => ({
        rows: [
          {
            ref: 'conversation-1',
            source: 'codex',
            title: 'Keep the main conversation row',
            state: 'running'
          }
        ],
        totalConversationCount: 1,
        counts: { running: 1, waiting: 0, finished: 0 }
      }),
      fetchUsageReport,
      isFeatureEnabled: async () => true,
      captureAppError: vi.fn(),
      logInfo: vi.fn(),
      requestQuit: vi.fn(),
      nativeWindow: {
        focusPrimaryWindow: vi.fn(),
        openPathFromNativeMenu,
        openConversationFromNativeMenu
      }
    })

    await facade.sync()
    await vi.waitFor(() => expect(mocks.trays[0]?.tooltip).toContain('Cursor 80% remaining'))
    expect(mocks.menuTemplates).toHaveLength(0)
    expect(mocks.trays[0]?.menu).toBeNull()
    expect(openConversationFromNativeMenu).not.toHaveBeenCalled()
    expect(openPathFromNativeMenu).not.toHaveBeenCalled()
    expect(fetchUsageReport).toHaveBeenCalledTimes(1)
    mocks.trays[0]?.listeners.get('mouse-enter')?.()
    await vi.waitFor(() => expect(mocks.browserWindows).toHaveLength(1))
    const popover = mocks.browserWindows.find((window) =>
      String(window.loadURL.mock.calls[0]?.[0]).startsWith('data:text/html')
    )
    const preventDefault = vi.fn()
    popover?.webContentsListeners.get('will-navigate')?.(
      { preventDefault },
      'blume-menu://usage?provider=claude'
    )
    expect(preventDefault).toHaveBeenCalledOnce()
    expect(openPathFromNativeMenu).toHaveBeenCalledWith('/settings/usage')
    facade.destroy()
  })
})
