import { describe, expect, test } from 'vitest'

import {
  getPosthogExperimentOverride,
  parsePosthogExperimentOverrides,
  POSTHOG_EXPERIMENTS,
  serializePosthogExperimentOverrides
} from '../../src/shared/experiments'
import { SHARE_PROMOTION_EXPERIMENT_FLAG } from '../../src/shared/featureFlags'

describe('PostHog experiment overrides', () => {
  test('round-trips a known experiment variant', () => {
    const serialized = serializePosthogExperimentOverrides({
      [SHARE_PROMOTION_EXPERIMENT_FLAG]: 'persistent_header'
    })
    const overrides = parsePosthogExperimentOverrides(serialized)

    expect(getPosthogExperimentOverride(overrides, SHARE_PROMOTION_EXPERIMENT_FLAG)).toBe(
      'persistent_header'
    )
  })

  test('ignores malformed, unknown experiments, and unknown variants', () => {
    expect(parsePosthogExperimentOverrides('{')).toEqual({})
    expect(
      parsePosthogExperimentOverrides(
        JSON.stringify({
          [SHARE_PROMOTION_EXPERIMENT_FLAG]: 'not-a-real-variant',
          'not-a-blume-experiment': 'control'
        })
      )
    ).toEqual({})
  })

  test('keeps experiment and variant keys unique', () => {
    expect(new Set(POSTHOG_EXPERIMENTS.map(({ key }) => key)).size).toBe(POSTHOG_EXPERIMENTS.length)
    for (const experiment of POSTHOG_EXPERIMENTS) {
      expect(new Set(experiment.variants.map(({ key }) => key)).size).toBe(
        experiment.variants.length
      )
    }
  })
})
