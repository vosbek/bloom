import { describe, expect, test } from 'vitest'
import {
  asEpochMs,
  decodeJwtClaims,
  normalizeCursorCookie,
  parseRetryAfterMs,
  parseClaudeCredentials,
  parseClaudeUsage,
  parseCodexAuth,
  parseCodexUsage,
  parseCursorUsage
} from '@blume/app-core'

const NOW = Date.parse('2026-06-10T12:00:00Z')

function fakeJwt(payload: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `header.${body}.signature`
}

describe('usage parsing', () => {
  test('asEpochMs handles ISO strings, seconds, and ms', () => {
    expect(asEpochMs('2026-06-10T12:00:00Z')).toBe(NOW)
    expect(asEpochMs(NOW / 1000)).toBe(NOW)
    expect(asEpochMs(NOW)).toBe(NOW)
    expect(asEpochMs('not a date')).toBeNull()
    expect(asEpochMs(null)).toBeNull()
  })

  test('parseClaudeCredentials reads the claudeAiOauth wrapper', () => {
    const creds = parseClaudeCredentials({
      claudeAiOauth: {
        accessToken: 'sk-ant-oat-123',
        refreshToken: 'refresh-123',
        subscriptionType: 'max',
        expiresAt: NOW + 60_000,
        scopes: ['user:profile'],
        rateLimitTier: 'standard'
      }
    })
    expect(creds).toEqual({
      accessToken: 'sk-ant-oat-123',
      refreshToken: 'refresh-123',
      subscriptionType: 'max',
      expiresAt: NOW + 60_000,
      scopes: ['user:profile'],
      rateLimitTier: 'standard'
    })
    expect(parseClaudeCredentials({})).toBeNull()
    expect(parseClaudeCredentials(null)).toBeNull()
  })

  test('parseClaudeUsage maps five_hour/seven_day windows', () => {
    const { windows, costUsd } = parseClaudeUsage({
      five_hour: { utilization: 42, resets_at: '2026-06-10T14:00:00Z' },
      seven_day: { utilization: 18, resets_at: '2026-06-14T00:00:00Z' },
      seven_day_sonnet: null,
      seven_day_opus: { utilization: 7, resets_at: '2026-06-14T00:00:00Z' },
      extra_usage: { used_cents: 1250 }
    })
    expect(windows.map((w) => w.id)).toEqual(['session', 'weekly', 'weekly-opus'])
    expect(windows[0]).toMatchObject({
      label: 'Session (5h)',
      usedPercent: 42,
      resetsAt: Date.parse('2026-06-10T14:00:00Z')
    })
    expect(costUsd).toBe(12.5)
  })

  test('parseClaudeUsage tolerates unknown payloads', () => {
    expect(parseClaudeUsage(null)).toEqual({ windows: [], costUsd: null })
    expect(parseClaudeUsage({ five_hour: 'oops' }).windows).toEqual([])
  })

  test('parseCodexAuth extracts account id and plan from the id_token', () => {
    const auth = parseCodexAuth({
      tokens: {
        access_token: 'access-123',
        refresh_token: 'refresh-123',
        last_refresh: '2026-06-01T12:00:00Z',
        id_token: fakeJwt({
          email: 'demo@blume.page',
          'https://api.openai.com/auth': {
            chatgpt_account_id: 'acct-9',
            chatgpt_plan_type: 'plus'
          }
        })
      }
    })
    expect(auth).toEqual({
      accessToken: 'access-123',
      refreshToken: 'refresh-123',
      idToken: expect.any(String),
      lastRefreshAt: Date.parse('2026-06-01T12:00:00Z'),
      accountId: 'acct-9',
      plan: 'plus',
      email: 'demo@blume.page'
    })
    expect(parseCodexAuth({ tokens: {} })).toBeNull()
    expect(decodeJwtClaims('garbage')).toBeNull()
  })

  test('parseCodexUsage maps primary/secondary rate-limit windows', () => {
    const { windows, plan } = parseCodexUsage(
      {
        plan_type: 'plus',
        rate_limit: {
          primary_window: {
            used_percent: 88,
            limit_window_seconds: 18_000,
            resets_in_seconds: 3_600
          },
          secondary_window: {
            used_percent: 51,
            window_minutes: 10_080,
            resets_at: NOW / 1000 + 172_800
          }
        }
      },
      NOW
    )
    expect(windows).toHaveLength(2)
    expect(windows[0]).toMatchObject({
      id: 'session',
      label: 'Session (5h)',
      usedPercent: 88,
      resetsAt: NOW + 3_600_000
    })
    expect(windows[1]).toMatchObject({ id: 'weekly', label: 'Weekly', usedPercent: 51 })
    expect(plan).toBe('plus')
  })

  test('parseCursorUsage reads the individualUsage summary shape', () => {
    // Trimmed real /api/usage-summary response (2026-06).
    const { windows, plan, account, costUsd } = parseCursorUsage(
      {
        summary: {
          billingCycleStart: '2026-05-25T00:05:29.000Z',
          billingCycleEnd: '2026-06-25T00:05:29.000Z',
          membershipType: 'pro_plus',
          limitType: 'user',
          isUnlimited: false,
          individualUsage: {
            plan: {
              enabled: true,
              used: 7000,
              limit: 7000,
              remaining: 0,
              breakdown: { included: 7000, bonus: 5989, total: 12989 },
              autoPercentUsed: 4.835,
              apiPercentUsed: 100,
              totalPercentUsed: 25.468627450980392
            },
            onDemand: { enabled: true, used: 4511, limit: 20000, remaining: 15489 }
          },
          teamUsage: {}
        },
        legacy: {
          'gpt-4': { numRequests: 0, maxRequestUsage: null },
          startOfMonth: '2026-05-25T00:05:29.000Z'
        },
        me: { email: 'demo@blume.page' }
      },
      NOW
    )
    expect(plan).toBe('Pro+')
    expect(account).toBe('demo@blume.page')
    expect(costUsd).toBe(45.11)
    const cycleEnd = Date.parse('2026-06-25T00:05:29.000Z')
    expect(windows).toEqual([
      { id: 'plan', label: 'Included usage', usedPercent: 25.468627450980392, resetsAt: cycleEnd },
      { id: 'api', label: 'Named models (API)', usedPercent: 100, resetsAt: cycleEnd },
      {
        id: 'on-demand',
        label: 'On-demand ($45.11 / $200.00)',
        usedPercent: 22.555,
        resetsAt: cycleEnd
      }
    ])
  })

  test('parseCursorUsage falls back to the legacy request counter', () => {
    const { windows, plan, costUsd } = parseCursorUsage(
      {
        summary: { membershipType: 'pro', onDemandSpendCents: 340 },
        legacy: {
          'gpt-4': { numRequests: 120, maxRequestUsage: 500 },
          startOfMonth: '2026-06-01T00:00:00Z'
        },
        me: { email: 'demo@blume.page' }
      },
      NOW
    )
    expect(plan).toBe('Pro')
    expect(costUsd).toBe(3.4)
    const requests = windows.find((w) => w.id === 'requests')
    expect(requests).toMatchObject({ usedPercent: 24 })
    expect(requests?.resetsAt).toBe(Date.parse('2026-07-01T00:00:00Z'))
  })

  test('parseRetryAfterMs handles delta-seconds, HTTP-dates, and garbage', () => {
    expect(parseRetryAfterMs('120', NOW)).toBe(120_000)
    expect(parseRetryAfterMs(' 0 ', NOW)).toBe(0)
    expect(parseRetryAfterMs('Wed, 10 Jun 2026 12:05:00 GMT', NOW)).toBe(300_000)
    // Dates in the past clamp to zero instead of going negative.
    expect(parseRetryAfterMs('Wed, 10 Jun 2026 11:00:00 GMT', NOW)).toBe(0)
    expect(parseRetryAfterMs('soon', NOW)).toBeNull()
    expect(parseRetryAfterMs(null, NOW)).toBeNull()
  })

  test('normalizeCursorCookie accepts bare tokens and full cookie strings', () => {
    expect(normalizeCursorCookie('abc123')).toBe('WorkosCursorSessionToken=abc123')
    expect(normalizeCursorCookie('WorkosCursorSessionToken=abc123')).toBe(
      'WorkosCursorSessionToken=abc123'
    )
    expect(normalizeCursorCookie('abc123==')).toBe('WorkosCursorSessionToken=abc123==')
    expect(normalizeCursorCookie('other=1; WorkosCursorSessionToken=abc123')).toBe(
      'other=1; WorkosCursorSessionToken=abc123'
    )
    expect(normalizeCursorCookie('   ')).toBeNull()
  })
})
