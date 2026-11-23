import { describe, expect, test } from 'vitest'

import {
  CURSOR_USAGE_FLAG,
  emptyPosthogFeatureFlagEvaluations,
  getPosthogFeatureFlagOverride,
  CONVERSATION_CONTINUATION_MENU_FLAG,
  normalizePosthogFeatureFlagEvaluations,
  parsePosthogFeatureFlagDefinitionDate,
  parsePosthogFeatureFlagOverrides,
  POSTHOG_FEATURE_FLAGS,
  serializePosthogFeatureFlagOverrides
} from '../../src/shared/featureFlags'

describe('PostHog feature flag overrides', () => {
  test('round-trips enabled and disabled overrides', () => {
    const serialized = serializePosthogFeatureFlagOverrides({
      [CURSOR_USAGE_FLAG]: true,
      [CONVERSATION_CONTINUATION_MENU_FLAG]: false
    })
    const overrides = parsePosthogFeatureFlagOverrides(serialized)

    expect(getPosthogFeatureFlagOverride(overrides, CURSOR_USAGE_FLAG)).toBe(true)
    expect(getPosthogFeatureFlagOverride(overrides, CONVERSATION_CONTINUATION_MENU_FLAG)).toBe(
      false
    )
  })

  test('ignores malformed, unknown, and non-boolean values', () => {
    expect(parsePosthogFeatureFlagOverrides('{')).toEqual({})
    expect(
      parsePosthogFeatureFlagOverrides(
        JSON.stringify({
          [CURSOR_USAGE_FLAG]: 'true',
          'not-a-blume-feature': true
        })
      )
    ).toEqual({})
  })

  test('returns undefined when PostHog should remain authoritative', () => {
    expect(getPosthogFeatureFlagOverride({}, CURSOR_USAGE_FLAG)).toBeUndefined()
    expect(getPosthogFeatureFlagOverride({ [CURSOR_USAGE_FLAG]: true }, 'unknown')).toBeUndefined()
  })

  test('rejects invalid mirrored definition timestamps before renderer formatting', () => {
    expect(parsePosthogFeatureFlagDefinitionDate(null)).toBeNull()
    expect(parsePosthogFeatureFlagDefinitionDate('not-a-date')).toBeNull()
    expect(parsePosthogFeatureFlagDefinitionDate('2026-07-27T12:00:00Z')?.toISOString()).toBe(
      '2026-07-27T12:00:00.000Z'
    )
  })

  test('keeps definition metadata valid and chronologically ordered', () => {
    expect(new Set(POSTHOG_FEATURE_FLAGS.map(({ key }) => key)).size).toBe(
      POSTHOG_FEATURE_FLAGS.length
    )

    for (const flag of POSTHOG_FEATURE_FLAGS) {
      expect(flag.rolloutPercentage === null || flag.rolloutPercentage >= 0).toBe(true)
      expect(flag.rolloutPercentage === null || flag.rolloutPercentage <= 100).toBe(true)
      if (flag.createdAt === null || flag.updatedAt === null) {
        expect(flag.createdAt).toBeNull()
        expect(flag.updatedAt).toBeNull()
        continue
      }

      const createdAt = Date.parse(flag.createdAt)
      const updatedAt = Date.parse(flag.updatedAt)
      expect(Number.isNaN(createdAt)).toBe(false)
      expect(Number.isNaN(updatedAt)).toBe(false)
      expect(updatedAt).toBeGreaterThanOrEqual(createdAt)
    }
  })

  test('fills stale or malformed main-process evaluations instead of crashing the dev page', () => {
    const evaluations = normalizePosthogFeatureFlagEvaluations({
      [CURSOR_USAGE_FLAG]: {
        posthogStatus: 'enabled',
        installationEnabled: true
      },
      [CONVERSATION_CONTINUATION_MENU_FLAG]: {
        posthogStatus: 'unknown',
        installationEnabled: 'yes'
      }
    })
    const unavailable = emptyPosthogFeatureFlagEvaluations()

    expect(evaluations[CURSOR_USAGE_FLAG]).toEqual({
      posthogStatus: 'enabled',
      installationEnabled: true
    })
    expect(evaluations[CONVERSATION_CONTINUATION_MENU_FLAG]).toEqual(
      unavailable[CONVERSATION_CONTINUATION_MENU_FLAG]
    )
    for (const flag of POSTHOG_FEATURE_FLAGS) {
      expect(evaluations[flag.key]).toBeDefined()
    }
  })
})
