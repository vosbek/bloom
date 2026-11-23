import { beforeEach, describe, expect, test, vi } from 'vitest'

import {
  CURSOR_USAGE_FLAG,
  CONVERSATION_CONTINUATION_MENU_FLAG,
  POSTHOG_FEATURE_FLAG_OVERRIDES_SETTING_KEY
} from '../../src/shared/featureFlags'
import { POSTHOG_EXPERIMENT_OVERRIDES_SETTING_KEY } from '../../src/shared/experiments'

const mocks = vi.hoisted(() => ({
  getSetting: vi.fn(async () => null),
  getPosthogFeatureFlagEnabled: vi.fn(async () => true),
  getPosthogFeatureFlagValue: vi.fn(async () => 'control'),
  getProductAnalyticsIdentity: vi.fn(async () => ({
    distinctId: 'blume-test-id',
    email: null,
    name: 'Test',
    blumeId: 'blume-test-id',
    generatedName: 'Test',
    nameSource: 'generated' as const
  })),
  getBlumeProfile: vi.fn(async () => ({
    id: 'blume-test-id',
    displayName: 'Test',
    generatedName: 'Test',
    nameSource: 'generated' as const,
    email: null
  })),
  setBlumeProfileEmail: vi.fn(),
  setSetting: vi.fn(),
  unsubscribeFeatureFlags: vi.fn(),
  posthog: {
    capture: vi.fn(),
    init: vi.fn(),
    register: vi.fn(),
    identify: vi.fn(),
    get_distinct_id: vi.fn(),
    reset: vi.fn(),
    getActiveMatchingSurveys: vi.fn(),
    onFeatureFlags: vi.fn(),
    isFeatureEnabled: vi.fn(() => true),
    opt_in_capturing: vi.fn(),
    opt_out_capturing: vi.fn()
  }
}))

vi.mock('posthog-js/dist/module.full.no-external', () => ({
  default: mocks.posthog
}))

vi.mock('../../src/renderer/src/lib/telemetryProperties', () => ({
  DESKTOP_TELEMETRY_PROPERTIES: {}
}))

beforeEach(() => {
  vi.resetModules()
  mocks.getSetting.mockClear()
  mocks.getPosthogFeatureFlagEnabled.mockReset()
  mocks.getPosthogFeatureFlagEnabled.mockResolvedValue(true)
  mocks.getPosthogFeatureFlagValue.mockReset()
  mocks.getPosthogFeatureFlagValue.mockResolvedValue('control')
  mocks.getProductAnalyticsIdentity.mockReset()
  mocks.getProductAnalyticsIdentity.mockResolvedValue({
    distinctId: 'blume-test-id',
    email: null,
    name: 'Test',
    blumeId: 'blume-test-id',
    generatedName: 'Test',
    nameSource: 'generated'
  })
  mocks.getBlumeProfile.mockReset()
  mocks.getBlumeProfile.mockResolvedValue({
    id: 'blume-test-id',
    displayName: 'Test',
    generatedName: 'Test',
    nameSource: 'generated' as const,
    email: null
  })
  mocks.setBlumeProfileEmail.mockReset()
  mocks.setBlumeProfileEmail.mockImplementation(async (email: string) => ({
    id: 'blume-test-id',
    displayName: email.trim().toLowerCase(),
    generatedName: 'Test',
    nameSource: 'email' as const,
    email: email.trim().toLowerCase()
  }))
  mocks.setSetting.mockReset()
  mocks.unsubscribeFeatureFlags.mockClear()
  mocks.posthog.capture.mockClear()
  mocks.posthog.init.mockClear()
  mocks.posthog.register.mockClear()
  mocks.posthog.identify.mockReset()
  mocks.posthog.get_distinct_id.mockReset()
  mocks.posthog.get_distinct_id.mockReturnValue('blume-test-id')
  mocks.posthog.reset.mockReset()
  mocks.posthog.getActiveMatchingSurveys.mockClear()
  mocks.posthog.onFeatureFlags.mockReset()
  mocks.posthog.onFeatureFlags.mockImplementation(() => mocks.unsubscribeFeatureFlags)
  mocks.posthog.isFeatureEnabled.mockClear()
  mocks.posthog.isFeatureEnabled.mockReturnValue(true)
  mocks.posthog.opt_in_capturing.mockClear()
  mocks.posthog.opt_out_capturing.mockClear()
  vi.stubEnv('VITE_POSTHOG_KEY', 'test-posthog-key')
  vi.stubGlobal('window', {
    api: {
      getSetting: mocks.getSetting,
      getPosthogFeatureFlagEnabled: mocks.getPosthogFeatureFlagEnabled,
      getPosthogFeatureFlagValue: mocks.getPosthogFeatureFlagValue,
      setSetting: mocks.setSetting,
      getBlumeProfile: mocks.getBlumeProfile,
      setBlumeProfileEmail: mocks.setBlumeProfileEmail
    },
    dispatchEvent: vi.fn()
  })
})

describe('renderer PostHog feature flag overrides', () => {
  test('identifies a signed-in PostHog user by account id with email properties', async () => {
    mocks.getProductAnalyticsIdentity.mockResolvedValue({
      distinctId: 'account-user-id',
      email: 'person@example.com',
      name: 'person@example.com',
      blumeId: 'blume-test-id',
      generatedName: 'Test',
      nameSource: 'email'
    })

    const { initPosthog } = await import('../../src/renderer/src/lib/posthog')
    await initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })

    // The first render does not wait for the account identity; it is applied as soon as it arrives.
    await vi.waitFor(() => expect(mocks.posthog.reset).toHaveBeenCalledOnce())
    expect(mocks.posthog.identify).toHaveBeenCalledWith(
      'account-user-id',
      expect.objectContaining({
        name: 'person@example.com',
        email: 'person@example.com',
        blume_display_name: 'person@example.com',
        blume_name_source: 'email'
      })
    )
  })

  test('resets to the stable local identity without email after sign-out', async () => {
    let distinctId = 'blume-test-id'
    let identity: import('@blume/sidecar-host').ProductAnalyticsIdentityView = {
      distinctId: 'account-a',
      email: 'a@example.com',
      name: 'a@example.com',
      blumeId: 'blume-test-id',
      generatedName: 'Quiet Sage 456',
      nameSource: 'email'
    }
    mocks.getProductAnalyticsIdentity.mockImplementation(async () => identity)
    mocks.getBlumeProfile.mockResolvedValue({
      id: 'blume-test-id',
      displayName: 'old-feedback@example.com',
      generatedName: 'Quiet Sage 456',
      nameSource: 'email' as const,
      email: 'old-feedback@example.com'
    })
    mocks.posthog.get_distinct_id.mockImplementation(() => distinctId)
    mocks.posthog.reset.mockImplementation(() => {
      distinctId = 'posthog-anonymous-id'
    })
    mocks.posthog.identify.mockImplementation((nextDistinctId: string) => {
      distinctId = nextDistinctId
    })

    const { initPosthog, syncPosthogIdentity } = await import('../../src/renderer/src/lib/posthog')
    await initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
    identity = {
      distinctId: 'blume-test-id',
      email: null,
      name: 'Quiet Sage 456',
      blumeId: 'blume-test-id',
      generatedName: 'Quiet Sage 456',
      nameSource: 'generated'
    }
    await syncPosthogIdentity()

    expect(mocks.posthog.reset).toHaveBeenCalledTimes(2)
    expect(mocks.posthog.identify).toHaveBeenLastCalledWith(
      'blume-test-id',
      expect.objectContaining({
        name: 'Quiet Sage 456',
        email: null,
        blume_display_name: 'Quiet Sage 456',
        blume_name_source: 'generated'
      })
    )
  })

  test('resets before switching between signed-in accounts', async () => {
    let distinctId = 'blume-test-id'
    let identity: import('@blume/sidecar-host').ProductAnalyticsIdentityView = {
      distinctId: 'account-a',
      email: 'a@example.com',
      name: 'a@example.com',
      blumeId: 'blume-test-id',
      generatedName: 'Test',
      nameSource: 'email'
    }
    mocks.getProductAnalyticsIdentity.mockImplementation(async () => identity)
    mocks.posthog.get_distinct_id.mockImplementation(() => distinctId)
    mocks.posthog.reset.mockImplementation(() => {
      distinctId = 'posthog-anonymous-id'
    })
    mocks.posthog.identify.mockImplementation((nextDistinctId: string) => {
      distinctId = nextDistinctId
    })

    const { initPosthog, syncPosthogIdentity } = await import('../../src/renderer/src/lib/posthog')
    await initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
    identity = {
      ...identity,
      distinctId: 'account-b',
      email: 'b@example.com',
      name: 'b@example.com'
    }
    await syncPosthogIdentity()

    expect(mocks.posthog.reset).toHaveBeenCalledTimes(2)
    expect(mocks.posthog.identify).toHaveBeenLastCalledWith(
      'account-b',
      expect.objectContaining({
        name: 'b@example.com',
        email: 'b@example.com'
      })
    )
  })

  test('keeps the stable account id when a feedback email is captured', async () => {
    mocks.getProductAnalyticsIdentity.mockResolvedValue({
      distinctId: 'account-user-id',
      email: 'account@example.com',
      name: 'account@example.com',
      blumeId: 'blume-test-id',
      generatedName: 'Test',
      nameSource: 'email'
    })

    const { captureFeedbackChatEmail, initPosthog } =
      await import('../../src/renderer/src/lib/posthog')
    await initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
    await captureFeedbackChatEmail(' Contact@Example.COM ')

    expect(mocks.posthog.identify).toHaveBeenLastCalledWith(
      'account-user-id',
      expect.objectContaining({
        email: 'contact@example.com',
        name: 'contact@example.com',
        feedback_chat_email_capture: true
      })
    )
    expect(mocks.posthog.identify.mock.calls.map(([distinctId]) => distinctId)).not.toContain(
      'contact@example.com'
    )
  })

  test('synchronizes an account change when tracking is enabled again', async () => {
    let distinctId = 'blume-test-id'
    let identity: import('@blume/sidecar-host').ProductAnalyticsIdentityView = {
      distinctId: 'account-a',
      email: 'a@example.com',
      name: 'a@example.com',
      blumeId: 'blume-test-id',
      generatedName: 'Test',
      nameSource: 'email'
    }
    mocks.getProductAnalyticsIdentity.mockImplementation(async () => identity)
    mocks.posthog.get_distinct_id.mockImplementation(() => distinctId)
    mocks.posthog.reset.mockImplementation(() => {
      distinctId = 'posthog-anonymous-id'
    })
    mocks.posthog.identify.mockImplementation((nextDistinctId: string) => {
      distinctId = nextDistinctId
    })

    const { initPosthog, setPosthogTrackingDisabled, syncPosthogIdentity } =
      await import('../../src/renderer/src/lib/posthog')
    await initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
    await setPosthogTrackingDisabled(true)
    identity = {
      ...identity,
      distinctId: 'account-b',
      email: 'b@example.com',
      name: 'b@example.com'
    }
    await expect(syncPosthogIdentity()).resolves.toBe(false)
    await setPosthogTrackingDisabled(false)

    expect(mocks.posthog.identify).toHaveBeenLastCalledWith(
      'account-b',
      expect.objectContaining({ email: 'b@example.com' })
    )
    expect(distinctId).toBe('account-b')
  })

  test('serializes concurrent writes so each update builds on the latest state', async () => {
    let resolveFirstWrite: (() => void) | undefined
    mocks.setSetting
      .mockImplementationOnce(
        async () =>
          new Promise<void>((resolve) => {
            resolveFirstWrite = resolve
          })
      )
      .mockResolvedValue(undefined)

    const { setPosthogFeatureFlagOverride } = await import('../../src/renderer/src/lib/posthog')
    const first = setPosthogFeatureFlagOverride(CURSOR_USAGE_FLAG, true)
    const second = setPosthogFeatureFlagOverride(CONVERSATION_CONTINUATION_MENU_FLAG, false)

    await vi.waitFor(() => expect(mocks.setSetting).toHaveBeenCalledTimes(1))
    resolveFirstWrite?.()
    await expect(first).resolves.toEqual({ [CURSOR_USAGE_FLAG]: true })
    await expect(second).resolves.toEqual({
      [CURSOR_USAGE_FLAG]: true,
      [CONVERSATION_CONTINUATION_MENU_FLAG]: false
    })

    expect(mocks.setSetting).toHaveBeenNthCalledWith(
      1,
      POSTHOG_FEATURE_FLAG_OVERRIDES_SETTING_KEY,
      JSON.stringify({ [CURSOR_USAGE_FLAG]: true })
    )
    expect(mocks.setSetting).toHaveBeenNthCalledWith(
      2,
      POSTHOG_FEATURE_FLAG_OVERRIDES_SETTING_KEY,
      JSON.stringify({
        [CURSOR_USAGE_FLAG]: true,
        [CONVERSATION_CONTINUATION_MENU_FLAG]: false
      })
    )
  })

  test('persists an experiment variant and refreshes active experiment subscribers', async () => {
    mocks.setSetting.mockResolvedValue(undefined)
    mocks.getPosthogFeatureFlagValue.mockResolvedValue('persistent_header')
    const { setPosthogExperimentOverride, watchFeatureFlagValue } =
      await import('../../src/renderer/src/lib/posthog')
    const onVariantChanged = vi.fn()
    const stop = watchFeatureFlagValue('referral-share-prompt-placement', onVariantChanged)

    await vi.waitFor(() => expect(onVariantChanged).toHaveBeenLastCalledWith('persistent_header'))
    await expect(
      setPosthogExperimentOverride('referral-share-prompt-placement', 'page_footer')
    ).resolves.toEqual({
      'referral-share-prompt-placement': 'page_footer'
    })

    expect(mocks.setSetting).toHaveBeenCalledWith(
      POSTHOG_EXPERIMENT_OVERRIDES_SETTING_KEY,
      JSON.stringify({ 'referral-share-prompt-placement': 'page_footer' })
    )
    await vi.waitFor(() => expect(mocks.getPosthogFeatureFlagValue).toHaveBeenCalledTimes(2))
    stop()
  })

  test('uses the installation assignment instead of the renderer PostHog identity', async () => {
    mocks.getPosthogFeatureFlagEnabled.mockResolvedValue(false)
    mocks.posthog.isFeatureEnabled.mockReturnValue(true)
    const { watchFeatureFlag } = await import('../../src/renderer/src/lib/posthog')
    const onFlagChanged = vi.fn()

    const stop = watchFeatureFlag(CURSOR_USAGE_FLAG, onFlagChanged)

    await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(false))
    expect(mocks.getPosthogFeatureFlagEnabled).toHaveBeenCalledWith(CURSOR_USAGE_FLAG)
    expect(mocks.posthog.isFeatureEnabled).not.toHaveBeenCalled()
    stop()
  })

  test('uses installation assignments while renderer tracking subscriptions follow opt-out', async () => {
    mocks.setSetting.mockResolvedValue(undefined)
    const { setPosthogTrackingDisabled, watchFeatureFlag } =
      await import('../../src/renderer/src/lib/posthog')

    await setPosthogTrackingDisabled(true)
    const onFlagChanged = vi.fn()
    const stop = watchFeatureFlag(CURSOR_USAGE_FLAG, onFlagChanged)

    expect(mocks.posthog.onFeatureFlags).not.toHaveBeenCalled()
    await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(true))

    await setPosthogTrackingDisabled(false)
    expect(mocks.posthog.init).toHaveBeenCalledOnce()
    expect(mocks.posthog.onFeatureFlags).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(true))

    await setPosthogTrackingDisabled(true)
    expect(mocks.unsubscribeFeatureFlags).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(true))

    await setPosthogTrackingDisabled(false)
    expect(mocks.posthog.onFeatureFlags).toHaveBeenCalledTimes(2)
    await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(true))

    stop()
    expect(mocks.unsubscribeFeatureFlags).toHaveBeenCalledTimes(2)
  })
})


test('account opens precede delivery events once per account and reject delayed cross-account actions', async () => {
  vi.stubEnv('VITE_POSTHOG_KEY', 'test-key')
  vi.stubGlobal('__BLUME_APP_VERSION__', '2.0.9')
  const identity = (id: string) => ({ distinctId: id, accountId: id, email: null, name: 'Test', blumeId: 'device', generatedName: 'Test', nameSource: 'generated' as const })
  mocks.getProductAnalyticsIdentity.mockResolvedValue(identity('alice'))
  mocks.posthog.identify.mockImplementation((id) => mocks.posthog.get_distinct_id.mockReturnValue(id))
  const analytics = await import('../../src/renderer/src/lib/posthog')
  await analytics.initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
  await analytics.syncPosthogIdentity()
  analytics.captureEvent('deliveries_viewed', { product_area: 'deliveries', analytics_user_id: 'alice' })
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture.mock.calls.map(([name]) => name)).toEqual(['app_opened_identified', 'deliveries_viewed'])
  mocks.getProductAnalyticsIdentity.mockResolvedValue(identity('bob'))
  void analytics.syncPosthogIdentity()
  analytics.captureEvent('deliveries_plugin_installed', { product_area: 'deliveries', analytics_user_id: 'alice' })
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture.mock.calls.map(([name]) => name)).toEqual(['app_opened_identified', 'deliveries_viewed', 'app_opened_identified'])
  await analytics.setPosthogTrackingDisabled(true)
  analytics.captureEvent('deliveries_viewed', { product_area: 'deliveries', analytics_user_id: 'bob' })
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture).toHaveBeenCalledTimes(3)
})

test('static development opens stay out of stable reports and known-account events survive an auth outage', async () => {
  vi.stubEnv('VITE_POSTHOG_KEY', 'test-key')
  vi.stubEnv('DEV', false)
  vi.stubEnv('VITE_BLUME_STATIC_DEV', '1')
  vi.stubGlobal('__BLUME_APP_VERSION__', '2.0.9')
  mocks.getProductAnalyticsIdentity.mockResolvedValue({ distinctId: 'alice', accountId: 'alice', email: null, name: 'Test', blumeId: 'device', generatedName: 'Test', nameSource: 'generated' as const })
  mocks.posthog.identify.mockImplementation((id) => mocks.posthog.get_distinct_id.mockReturnValue(id))
  const analytics = await import('../../src/renderer/src/lib/posthog')
  await analytics.initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture).toHaveBeenCalledWith('app_opened_identified', expect.objectContaining({ environment: 'development' }))

  mocks.getProductAnalyticsIdentity.mockRejectedValue(new Error('account service unavailable'))
  await analytics.syncPosthogIdentity()
  const readsBeforeCapture = mocks.getProductAnalyticsIdentity.mock.calls.length
  analytics.captureEvent('deliveries_setup_command_copied', { product_area: 'deliveries', analytics_user_id: 'alice' })
  await vi.waitFor(() => expect(mocks.posthog.capture).toHaveBeenCalledWith('deliveries_setup_command_copied', expect.objectContaining({ analytics_user_id: 'alice' })))
  expect(mocks.getProductAnalyticsIdentity).toHaveBeenCalledTimes(readsBeforeCapture)
  vi.unstubAllEnvs()
})

test('the first account action retries a failed startup opening before the action', async () => {
  vi.stubEnv('VITE_POSTHOG_KEY', 'test-key')
  vi.stubGlobal('__BLUME_APP_VERSION__', '2.0.9')
  mocks.getProductAnalyticsIdentity.mockRejectedValue(new Error('offline at startup'))
  mocks.posthog.get_distinct_id.mockReturnValue('alice')
  mocks.posthog.identify.mockImplementation((id) => mocks.posthog.get_distinct_id.mockReturnValue(id))
  const analytics = await import('../../src/renderer/src/lib/posthog')
  await analytics.initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture).not.toHaveBeenCalled()
  const recovered = { distinctId: 'alice', accountId: 'alice', email: null, name: 'Test', blumeId: 'device', generatedName: 'Test', nameSource: 'generated' as const }
  mocks.getProductAnalyticsIdentity.mockResolvedValue(recovered)
  analytics.captureEvent('deliveries_viewed', { product_area: 'deliveries', analytics_user_id: 'alice' })
  await vi.waitFor(() => expect(mocks.posthog.capture.mock.calls.map(([name]) => name)).toEqual(['app_opened_identified', 'deliveries_viewed']))
  vi.unstubAllEnvs()
})

test('reads again when main announces a renewed assignment', async () => {
  let announce: (() => void) | undefined
  const onPosthogFeatureFlagsChanged = vi.fn((cb: () => void) => {
    announce = cb
    return () => undefined
  })
  vi.stubGlobal('window', {
    api: {
      getSetting: mocks.getSetting,
      getPosthogFeatureFlagEnabled: mocks.getPosthogFeatureFlagEnabled,
      getPosthogFeatureFlagValue: mocks.getPosthogFeatureFlagValue,
      setSetting: mocks.setSetting,
      getBlumeProfile: mocks.getBlumeProfile,
      setBlumeProfileEmail: mocks.setBlumeProfileEmail,
      onPosthogFeatureFlagsChanged
    },
    dispatchEvent: vi.fn()
  })
  const { watchFeatureFlag, watchFeatureFlagValue } =
    await import('../../src/renderer/src/lib/posthog')
  const onFlagChanged = vi.fn()
  const onVariantChanged = vi.fn()
  const stopFlag = watchFeatureFlag(CURSOR_USAGE_FLAG, onFlagChanged)
  const stopVariant = watchFeatureFlagValue('referral-share-prompt-placement', onVariantChanged)
  await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(true))
  expect(onPosthogFeatureFlagsChanged).toHaveBeenCalledOnce()

  mocks.getPosthogFeatureFlagEnabled.mockResolvedValue(false)
  mocks.getPosthogFeatureFlagValue.mockResolvedValue('page_footer')
  announce!()

  await vi.waitFor(() => expect(onFlagChanged).toHaveBeenLastCalledWith(false))
  await vi.waitFor(() => expect(onVariantChanged).toHaveBeenLastCalledWith('page_footer'))
  stopFlag()
  stopVariant()
})


test('walkthrough progress uses the current account and is suppressed by opt-out', async () => {
  vi.stubEnv('VITE_POSTHOG_KEY', 'test-key')
  vi.stubGlobal('__BLUME_APP_VERSION__', '2.0.9')
  mocks.getProductAnalyticsIdentity.mockResolvedValue({ distinctId: 'alice', accountId: 'alice', email: null, name: 'Test', blumeId: 'device', generatedName: 'Test', nameSource: 'generated' as const })
  mocks.posthog.identify.mockImplementation((id) => mocks.posthog.get_distinct_id.mockReturnValue(id))
  const analytics = await import('../../src/renderer/src/lib/posthog')
  await analytics.initPosthog({ getProductAnalyticsIdentity: mocks.getProductAnalyticsIdentity })
  await analytics.syncPosthogIdentity()
  const properties = { product_area: 'deliveries', analytics_user_id: 'alice', walkthrough_version: 1, walkthrough_mode: 'initial', step_key: 'outcome_review', step_number: 2, completed_steps: 1, total_steps: 4 }
  analytics.captureEvent('deliveries_walkthrough_skipped', properties)
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture).toHaveBeenCalledWith('deliveries_walkthrough_skipped', expect.objectContaining(properties))
  const count = mocks.posthog.capture.mock.calls.length
  await analytics.setPosthogTrackingDisabled(true)
  analytics.captureEvent('deliveries_walkthrough_skipped', properties)
  await analytics.syncPosthogIdentity()
  expect(mocks.posthog.capture).toHaveBeenCalledTimes(count)
})
