import { describe, expect, test, vi } from 'vitest'
import { createNativeStartupEvents } from '../../src/main/nativeStartupEvents'

import {
  createDesktopNativeDeepLinkFacade,
  CANARY_DEEP_LINK_PROTOCOL,
  DEEP_LINK_PROTOCOL,
  DEV_DEEP_LINK_PROTOCOL,
  E2E_DEEP_LINK_PROTOCOL_ENV,
  E2E_MODE_ENV
} from '../../src/main/nativeDeepLinks'

function createFacade(
  overrides: Partial<Parameters<typeof createDesktopNativeDeepLinkFacade>[0]> = {}
): {
  facade: ReturnType<typeof createDesktopNativeDeepLinkFacade>
  claimInvite: ReturnType<typeof vi.fn>
  deliverDeepLinkPath: ReturnType<typeof vi.fn>
  setAsDefaultProtocolClient: ReturnType<typeof vi.fn>
} {
  const claimInvite = vi.fn(async () => undefined)
  const deliverDeepLinkPath = vi.fn()
  const setAsDefaultProtocolClient = vi.fn(() => true)

  const facade = createDesktopNativeDeepLinkFacade({
    isDev: true,
    platform: 'darwin',
    releaseChannel: 'stable',
    shouldTrackUsageTelemetry: false,
    env: {},
    appPath: () => '/workspace/apps/desktop',
    execPath: '/Applications/Electron.app/Contents/MacOS/Electron',
    argv: [],
    setAsDefaultProtocolClient,
    onOpenUrl: vi.fn(),
    deliverDeepLinkPath,
    claimInvite,
    maybeReportReferralActivation: vi.fn(async () => undefined),
    captureTelemetryEvent: vi.fn(async () => undefined),
    aliasTelemetryDistinctId: vi.fn(async () => undefined),
    captureAppError: vi.fn(async () => undefined),
    log: {
      debug: vi.fn(),
      info: vi.fn(),
      error: vi.fn()
    },
    ...overrides
  })

  return { facade, claimInvite, deliverDeepLinkPath, setAsDefaultProtocolClient }
}

describe('native deep links', () => {
  test('reports rejected HTTPS destinations without logging private URL fields', () => {
    const log = { debug: vi.fn(), info: vi.fn(), error: vi.fn() }
    const { facade, deliverDeepLinkPath } = createFacade({ isDev: false, log })
    facade.handleUrl('https://blume.codes/open/deliveries/private-id?work=&workspace=secret')
    facade.handleUrl('https://blume.codes/open/deliveries/private-id/extra')
    expect(deliverDeepLinkPath).not.toHaveBeenCalled()
    expect(log.info.mock.calls).toEqual(
      Array(2).fill([
        'deep link rejected',
        { transport: 'universal-link', reason: 'invalid-or-unsupported-destination' }
      ])
    )
  })

  test.each(['stable', 'canary'] as const)(
    'routes cold and warm %s browsing activities exactly once',
    (releaseChannel) => {
      const events = createNativeStartupEvents()
      const query = releaseChannel === 'canary' ? '&app=canary' : ''
      const url = `https://blume.codes/open/deliveries/dlv_1?work=w&workspace=org_7${query}&launch=old`
      const event = { preventDefault: vi.fn() }
      events.receiveContinueActivity(event, 'NSUserActivityTypeBrowsingWeb', null, {
        webpageURL: url
      })
      const { facade, deliverDeepLinkPath } = createFacade({
        isDev: false,
        releaseChannel,
        onOpenUrl: events.onOpenUrl
      })
      facade.registerOpenUrlHandler()
      expect(deliverDeepLinkPath).not.toHaveBeenCalled()
      events.activate()
      events.activate()
      expect(deliverDeepLinkPath.mock.calls).toEqual([['/deliveries/dlv_1?work=w&workspace=org_7']])
      events.receiveContinueActivity(
        event,
        'NSUserActivityTypeBrowsingWeb',
        {},
        { webpageURL: url }
      )
      expect(deliverDeepLinkPath).toHaveBeenCalledTimes(2)
      expect(event.preventDefault).toHaveBeenCalledTimes(2)
      facade.handleUrl(
        `https://blume.codes/open/deliveries/wrong?app=${releaseChannel === 'canary' ? 'stable' : 'canary'}`
      )
      facade.handleUrl('https://evil.test/open/deliveries/wrong')
      expect(deliverDeepLinkPath).toHaveBeenCalledTimes(2)
    }
  )

  test.each(['stable', 'canary'] as const)(
    'registers only the matching Windows %s account callback protocol',
    (releaseChannel) => {
      const { facade, setAsDefaultProtocolClient } = createFacade({
        isDev: false,
        platform: 'win32',
        releaseChannel
      })
      facade.registerProtocol()
      expect(setAsDefaultProtocolClient.mock.calls).toEqual(
        releaseChannel === 'canary'
          ? [['blume-canary'], ['codes.blume-canary']]
          : [['blume'], ['codes.blume']]
      )
    }
  )

  test('Windows dev does not claim packaged account protocols', () => {
    const { facade, setAsDefaultProtocolClient } = createFacade({ platform: 'win32' })
    facade.registerProtocol()
    expect(setAsDefaultProtocolClient.mock.calls).toEqual([
      [
        DEV_DEEP_LINK_PROTOCOL,
        '/Applications/Electron.app/Contents/MacOS/Electron',
        ['/workspace/apps/desktop']
      ]
    ])
  })

  test('keeps dev protocol behavior unchanged when e2e protocol env is absent', () => {
    const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade()

    facade.registerProtocol()
    facade.handleArgv(['Electron', 'blume-e2e-test://setup/codex'])

    expect(setAsDefaultProtocolClient).toHaveBeenCalledTimes(1)
    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(
      DEV_DEEP_LINK_PROTOCOL,
      '/Applications/Electron.app/Contents/MacOS/Electron',
      ['/workspace/apps/desktop']
    )
    expect(deliverDeepLinkPath).not.toHaveBeenCalled()
  })

  test('opens the Plugin page from an agent app link on the running channel', () => {
    const dev = createFacade()
    dev.facade.handleUrl('blume-dev://plugin')
    dev.facade.handleArgv(['Electron', '/workspace/apps/desktop', 'blume-dev://deliveries/dlv_1'])
    // The app's route table maps the path form to the delivery (see shell/routes.ts aliases).
    expect(dev.deliverDeepLinkPath.mock.calls).toEqual([['/plugin'], ['/deliveries/dlv_1']])

    const canary = createFacade({ isDev: false, releaseChannel: 'canary' })
    canary.facade.handleUrl('blume-canary://plugin')
    // A link for another channel's app, or the retired Deliveries app, opens nothing here.
    canary.facade.handleUrl('blume://plugin')
    canary.facade.handleUrl('blume-deliveries://plugin')
    expect(canary.deliverDeepLinkPath.mock.calls).toEqual([['/plugin']])
  })

  test('preserves the billing tab when Polar returns to the development app', () => {
    const { facade, deliverDeepLinkPath } = createFacade()

    facade.handleUrl('blume-dev://account?tab=billing')

    expect(deliverDeepLinkPath).toHaveBeenCalledWith('/account?tab=billing')
  })

  test('registers and routes a unique e2e protocol in the current dev runtime', () => {
    const protocol = 'blume-e2e-native-test'
    const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade({
      env: {
        [E2E_MODE_ENV]: '1',
        [E2E_DEEP_LINK_PROTOCOL_ENV]: protocol
      }
    })

    facade.registerProtocol()
    facade.handleArgv([
      'Electron',
      '/workspace/apps/desktop',
      `${protocol}://setup/codex?source=e2e&download_id=warm`
    ])

    expect(setAsDefaultProtocolClient).toHaveBeenCalledTimes(2)
    expect(setAsDefaultProtocolClient).toHaveBeenNthCalledWith(
      1,
      DEV_DEEP_LINK_PROTOCOL,
      '/Applications/Electron.app/Contents/MacOS/Electron',
      ['/workspace/apps/desktop']
    )
    expect(setAsDefaultProtocolClient).toHaveBeenNthCalledWith(
      2,
      protocol,
      '/Applications/Electron.app/Contents/MacOS/Electron',
      ['/workspace/apps/desktop']
    )
    expect(deliverDeepLinkPath).toHaveBeenCalledTimes(1)
    expect(deliverDeepLinkPath).toHaveBeenCalledWith('/setup/codex')
  })

  test('does not enable the e2e protocol outside dev protocol registration', () => {
    const protocol = 'blume-e2e-native-test'
    const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade({
      isDev: false,
      env: {
        [E2E_MODE_ENV]: '1',
        [E2E_DEEP_LINK_PROTOCOL_ENV]: protocol
      }
    })

    facade.registerProtocol()
    facade.handleArgv(['Blume', `${protocol}://setup/codex`])

    expect(setAsDefaultProtocolClient).toHaveBeenCalledTimes(1)
    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(DEEP_LINK_PROTOCOL)
    expect(deliverDeepLinkPath).not.toHaveBeenCalled()
  })

  test('registers and routes an isolated protocol for packaged canary', () => {
    const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade({
      isDev: false,
      releaseChannel: 'canary'
    })

    facade.registerProtocol()
    facade.handleArgv(['Blume Canary', 'blume-canary://setup/codex'])
    facade.handleArgv(['Blume Canary', 'blume://agents'])

    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(CANARY_DEEP_LINK_PROTOCOL)
    expect(deliverDeepLinkPath).toHaveBeenCalledTimes(1)
    expect(deliverDeepLinkPath).toHaveBeenCalledWith('/setup/codex')
  })

  test('packaged stable rejects the canary protocol', () => {
    const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade({
      isDev: false,
      releaseChannel: 'stable'
    })

    facade.registerProtocol()
    facade.handleArgv(['Blume', 'blume://agents'])
    facade.handleArgv(['Blume', 'blume-canary://setup/codex'])

    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(DEEP_LINK_PROTOCOL)
    expect(deliverDeepLinkPath).toHaveBeenCalledTimes(1)
    expect(deliverDeepLinkPath).toHaveBeenCalledWith('/agents')
  })

  test('packaged channels reject cross-channel referral invites from open-url', () => {
    const canary = createFacade({ isDev: false, releaseChannel: 'canary' })
    canary.facade.handleUrl('blume://invite/stable-code')
    canary.facade.handleUrl('blume-canary://invite/canary-code')

    expect(canary.claimInvite).toHaveBeenCalledTimes(1)
    expect(canary.claimInvite).toHaveBeenCalledWith('CANARY-CODE', undefined)

    const stable = createFacade({ isDev: false, releaseChannel: 'stable' })
    stable.facade.handleUrl('blume-canary://invite/canary-code')
    stable.facade.handleUrl('blume://invite/stable-code')

    expect(stable.claimInvite).toHaveBeenCalledTimes(1)
    expect(stable.claimInvite).toHaveBeenCalledWith('STABLE-CODE', undefined)
  })

  test('rejects malformed protocol values for the e2e protocol env', () => {
    for (const protocol of ['1-invalid', 'blume e2e']) {
      const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade({
        env: {
          [E2E_MODE_ENV]: '1',
          [E2E_DEEP_LINK_PROTOCOL_ENV]: protocol
        }
      })

      facade.registerProtocol()
      facade.handleArgv(['Electron', `${protocol}://setup/codex`])

      expect(setAsDefaultProtocolClient).toHaveBeenCalledTimes(1)
      expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(
        DEV_DEEP_LINK_PROTOCOL,
        '/Applications/Electron.app/Contents/MacOS/Electron',
        ['/workspace/apps/desktop']
      )
      expect(deliverDeepLinkPath).not.toHaveBeenCalled()
    }
  })

  test('does not captureAppError for expected referral claim network failures', async () => {
    const captureAppError = vi.fn(async () => undefined)
    const logInfo = vi.fn()
    const networkError = new TypeError('fetch failed')
    ;(networkError as { cause?: unknown }).cause = Object.assign(
      new Error('getaddrinfo ENOTFOUND referrals.blume-page.com'),
      { code: 'ENOTFOUND', hostname: 'referrals.blume-page.com' }
    )
    const claimInvite = vi.fn(async () => {
      throw networkError
    })
    const { facade, deliverDeepLinkPath } = createFacade({
      claimInvite,
      captureAppError,
      log: {
        debug: vi.fn(),
        info: logInfo,
        error: vi.fn()
      }
    })

    facade.handleUrl('blume://invite/Tiny-Red-Tulip')
    await vi.waitFor(() => {
      expect(claimInvite).toHaveBeenCalled()
    })
    // Allow the rejected claim promise to settle through the catch handler.
    await Promise.resolve()
    await Promise.resolve()

    expect(deliverDeepLinkPath).toHaveBeenCalledWith('/deliveries')
    expect(captureAppError).not.toHaveBeenCalled()
    expect(logInfo).toHaveBeenCalledWith(
      'expected referral claim service failure',
      expect.objectContaining({
        reporting_action: 'local_log_only'
      })
    )
  })

  test('still captures unexpected referral claim failures', async () => {
    const captureAppError = vi.fn(async () => undefined)
    const unexpected = new Error('referrals /claim -> 500')
    const claimInvite = vi.fn(async () => {
      throw unexpected
    })
    const { facade } = createFacade({ claimInvite, captureAppError })

    facade.handleUrl('blume://invite/Tiny-Red-Tulip')
    await vi.waitFor(() => {
      expect(captureAppError).toHaveBeenCalledWith('main.referral-claim', unexpected)
    })
  })

  test('does not register public protocols as extra e2e protocols', () => {
    const { facade, deliverDeepLinkPath, setAsDefaultProtocolClient } = createFacade({
      env: {
        [E2E_MODE_ENV]: '1',
        [E2E_DEEP_LINK_PROTOCOL_ENV]: DEV_DEEP_LINK_PROTOCOL
      }
    })

    facade.registerProtocol()
    facade.handleArgv(['Electron', `${DEV_DEEP_LINK_PROTOCOL}://setup/codex`])

    expect(setAsDefaultProtocolClient).toHaveBeenCalledTimes(1)
    expect(setAsDefaultProtocolClient).toHaveBeenCalledWith(
      DEV_DEEP_LINK_PROTOCOL,
      '/Applications/Electron.app/Contents/MacOS/Electron',
      ['/workspace/apps/desktop']
    )
    expect(deliverDeepLinkPath).toHaveBeenCalledWith('/setup/codex')
  })
})
