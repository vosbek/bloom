import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  settings: new Map<string, string>(),
  getFeatureFlagResult: vi.fn(async () => ({ enabled: true })),
  getAllFlags: vi.fn(async () => ({})),
  posthogConstructor: vi.fn()
}))

vi.mock('electron', () => ({
  app: {
    getVersion: vi.fn(() => '0.0.0-test')
  }
}))

vi.mock('../../src/main/settingsStore', () => ({
  getSetting: vi.fn((key: string) => mocks.settings.get(key) ?? null)
}))

vi.mock('../../src/main/blume-user-host', () => ({
  getOrCreateBlumeId: vi.fn(async () => 'blume-test-id')
}))

vi.mock('../../src/main/logger', () => ({
  writeAppLog: vi.fn()
}))

vi.mock('../../src/main/sentry', () => ({
  captureSentryException: vi.fn()
}))

vi.mock('posthog-node', () => ({
  PostHog: class {
    getFeatureFlagResult = mocks.getFeatureFlagResult
    getAllFlags = mocks.getAllFlags

    constructor(apiKey: string, options: Record<string, unknown>) {
      mocks.posthogConstructor(apiKey, options)
    }
  }
}))

async function loadTelemetry(): Promise<typeof import('../../src/main/telemetry')> {
  vi.resetModules()
  return import('../../src/main/telemetry')
}

beforeEach(() => {
  process.env.VITE_POSTHOG_KEY = 'test-posthog-key'
  mocks.settings.clear()
  mocks.getFeatureFlagResult.mockClear()
  mocks.getFeatureFlagResult.mockResolvedValue({ enabled: true })
  mocks.getAllFlags.mockClear()
  mocks.getAllFlags.mockResolvedValue({})
  mocks.posthogConstructor.mockClear()
})

afterEach(() => {
  delete process.env.VITE_POSTHOG_KEY
})

describe('main telemetry feature flags', () => {
  test('evaluates feature flags when event capture is disabled', async () => {
    mocks.settings.set('posthogTrackingDisabled', 'true')

    const { isPosthogFeatureEnabled } = await loadTelemetry()

    await expect(isPosthogFeatureEnabled('desktop-menu-bar-status-item')).resolves.toBe(true)
    expect(mocks.posthogConstructor).toHaveBeenCalledWith(
      'test-posthog-key',
      expect.objectContaining({ host: 'https://eu.i.posthog.com' })
    )
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledWith(
      'desktop-menu-bar-status-item',
      'blume-test-id',
      { sendFeatureFlagEvents: false }
    )
  })

  test('keeps feature flag exposure events enabled when capture is allowed', async () => {
    const { isPosthogFeatureEnabled } = await loadTelemetry()

    await expect(isPosthogFeatureEnabled('desktop-menu-bar-status-item')).resolves.toBe(true)
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledWith(
      'desktop-menu-bar-status-item',
      'blume-test-id',
      { sendFeatureFlagEvents: true }
    )
  })

  test('preserves a multivariate feature flag assignment', async () => {
    mocks.getFeatureFlagResult.mockResolvedValue({
      key: 'referral-share-prompt-placement',
      enabled: true,
      variant: 'page_footer',
      payload: undefined
    })

    const { getPosthogFeatureFlagValue } = await loadTelemetry()

    await expect(getPosthogFeatureFlagValue('referral-share-prompt-placement')).resolves.toBe(
      'page_footer'
    )
  })

  test.each([
    ['enabled', true],
    ['disabled', false]
  ])('uses a locally forced %s value without asking PostHog', async (_label, enabled) => {
    mocks.settings.set(
      'posthogFeatureFlagOverrides',
      JSON.stringify({ 'desktop-menu-bar-status-item': enabled })
    )

    const { isPosthogFeatureEnabled } = await loadTelemetry()

    await expect(isPosthogFeatureEnabled('desktop-menu-bar-status-item')).resolves.toBe(enabled)
    expect(mocks.posthogConstructor).not.toHaveBeenCalled()
    expect(mocks.getFeatureFlagResult).not.toHaveBeenCalled()
  })

  test('uses a locally forced experiment variant without asking PostHog', async () => {
    mocks.settings.set(
      'posthogExperimentOverrides',
      JSON.stringify({ 'referral-share-prompt-placement': 'page_footer' })
    )

    const { getPosthogFeatureFlagValue } = await loadTelemetry()

    await expect(getPosthogFeatureFlagValue('referral-share-prompt-placement')).resolves.toBe(
      'page_footer'
    )
    expect(mocks.posthogConstructor).not.toHaveBeenCalled()
    expect(mocks.getFeatureFlagResult).not.toHaveBeenCalled()
  })

  test('separates PostHog status from this installation evaluation', async () => {
    mocks.settings.set(
      'posthogFeatureFlagOverrides',
      JSON.stringify({ 'desktop-menu-bar-status-item': true })
    )
    mocks.getAllFlags.mockResolvedValue({
      'desktop-menu-bar-status-item': false,
      'cursor-usage': true,
      'desktop-conversation-continuation-menu': 'test-variant'
    })

    const { getPosthogFeatureFlagEvaluations } = await loadTelemetry()
    const evaluations = await getPosthogFeatureFlagEvaluations()

    expect(evaluations['desktop-menu-bar-status-item']).toEqual({
      posthogStatus: 'enabled',
      installationEnabled: false
    })
    expect(evaluations['cursor-usage']).toEqual({
      posthogStatus: 'enabled',
      installationEnabled: true
    })
    expect(evaluations['desktop-conversation-continuation-menu']).toEqual({
      posthogStatus: 'enabled',
      installationEnabled: true
    })
    expect(evaluations['artifact-sync']).toEqual({
      posthogStatus: 'not-active',
      installationEnabled: false
    })
    expect(mocks.getAllFlags).toHaveBeenCalledWith(
      'blume-test-id',
      expect.objectContaining({
        flagKeys: expect.arrayContaining([
          'desktop-menu-bar-status-item',
          'cursor-usage',
          'artifact-sync'
        ])
      })
    )
  })
})
