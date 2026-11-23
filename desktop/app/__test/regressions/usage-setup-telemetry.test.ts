import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { ProviderUsageSnapshot, UsageReport } from '@blume/app-core'

const mocks = vi.hoisted(() => ({
  captureTelemetryEvent: vi.fn(async () => true),
  settings: new Map<string, string>()
}))

vi.mock('../../src/main/settingsStore', () => ({
  getSetting: vi.fn((key: string) => mocks.settings.get(key) ?? null),
  setSetting: vi.fn((key: string, value: string) => {
    mocks.settings.set(key, value)
  }),
  initializeSettingsStore: vi.fn(async () => undefined)
}))

vi.mock('../../src/main/telemetry', () => ({
  captureTelemetryEvent: mocks.captureTelemetryEvent
}))

vi.mock('../../src/main/secureStore', () => ({
  clearSecret: vi.fn(),
  getSecret: vi.fn(() => null),
  setSecret: vi.fn()
}))

import {
  resetUsageSetupTelemetryForTests,
  trackUsageSetupTelemetry
} from '../../src/main/usage/providerUsage'

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

function setPlatform(value: NodeJS.Platform): void {
  Object.defineProperty(process, 'platform', { value, configurable: true })
}

function snapshot(
  provider: ProviderUsageSnapshot['provider'],
  status: ProviderUsageSnapshot['status'],
  cta: ProviderUsageSnapshot['cta'] = null
): ProviderUsageSnapshot {
  return {
    provider,
    status,
    account: null,
    plan: provider === 'claude' && status === 'ok' ? 'max' : null,
    windows:
      status === 'ok' ? [{ id: 'session', label: 'Session', usedPercent: 10, resetsAt: null }] : [],
    costUsd: null,
    detail: status === 'ok' ? null : 'Setup needed',
    cta
  }
}

function report(providers: ProviderUsageSnapshot[]): UsageReport {
  return { providers, fetchedAt: Date.now() }
}

function captured(event: string): Record<string, unknown>[] {
  return mocks.captureTelemetryEvent.mock.calls
    .filter(([name]) => name === event)
    .map(([, properties]) => properties as Record<string, unknown>)
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-06-22T10:00:00Z'))
  mocks.captureTelemetryEvent.mockClear()
  mocks.settings.clear()
  resetUsageSetupTelemetryForTests()
  setPlatform('darwin')
})

afterEach(() => {
  vi.useRealTimers()
  if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
})

describe('usage setup telemetry', () => {
  test('classifies first successful usage as immediate setup', () => {
    trackUsageSetupTelemetry(report([snapshot('claude', 'ok')]), false)
    trackUsageSetupTelemetry(report([snapshot('claude', 'ok')]), false)

    const successes = captured('usage_provider_setup_succeeded')
    expect(successes).toHaveLength(1)
    expect(successes[0]).toMatchObject({
      harness: 'claude',
      provider: 'claude',
      os_platform: 'darwin',
      setup_state: 'usage',
      setup_path: 'immediate',
      first_observed_state: 'usage',
      seen_login_state: false,
      seen_keychain_issue_state: false,
      has_usage_windows: true,
      usage_window_count: 1
    })
  })

  test('classifies login state followed by usage as login_then_usage across restarts', () => {
    trackUsageSetupTelemetry(
      report([snapshot('claude', 'unauthenticated', 'terminal-login')]),
      false
    )
    resetUsageSetupTelemetryForTests()
    vi.setSystemTime(new Date('2026-06-22T10:05:00Z'))

    trackUsageSetupTelemetry(report([snapshot('claude', 'ok')]), true)

    const successes = captured('usage_provider_setup_succeeded')
    expect(successes).toHaveLength(1)
    expect(successes[0]).toMatchObject({
      harness: 'claude',
      setup_path: 'login_then_usage',
      first_observed_state: 'login',
      seen_login_state: true,
      seen_keychain_issue_state: false,
      force_fetch: true,
      success_elapsed_ms: 5 * 60_000
    })
  })

  test('classifies Claude keychain issue followed by usage as keychain_then_usage', () => {
    trackUsageSetupTelemetry(report([snapshot('claude', 'error', 'claude-keychain-access')]), false)
    vi.setSystemTime(new Date('2026-06-22T10:03:00Z'))

    trackUsageSetupTelemetry(report([snapshot('claude', 'ok')]), true)

    const states = captured('usage_provider_setup_state_observed')
    expect(states.map((state) => state.setup_state)).toEqual(['keychain_issue', 'usage'])

    const successes = captured('usage_provider_setup_succeeded')
    expect(successes).toHaveLength(1)
    expect(successes[0]).toMatchObject({
      harness: 'claude',
      setup_path: 'keychain_then_usage',
      first_observed_state: 'keychain_issue',
      seen_login_state: false,
      seen_keychain_issue_state: true,
      success_elapsed_ms: 3 * 60_000
    })
  })
})
