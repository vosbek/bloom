import { describe, expect, test } from 'vitest'

import {
  canShowFeedbackRatingSurvey,
  FEEDBACK_RATING_MIN_APP_RUNNING_SECONDS
} from '../../src/renderer/src/lib/feedbackGate'

describe('feedback rating gate', () => {
  test('hides ratings before five hours of app runtime', () => {
    expect(
      canShowFeedbackRatingSurvey({
        surveyAvailable: true,
        appProcessRunningSeconds: FEEDBACK_RATING_MIN_APP_RUNNING_SECONDS - 1
      })
    ).toBe(false)
  })

  test('keeps ratings hidden until app runtime is known', () => {
    expect(
      canShowFeedbackRatingSurvey({
        surveyAvailable: true,
        appProcessRunningSeconds: null
      })
    ).toBe(false)
  })

  test('shows ratings once the survey is available and five hours have elapsed', () => {
    expect(
      canShowFeedbackRatingSurvey({
        surveyAvailable: true,
        appProcessRunningSeconds: FEEDBACK_RATING_MIN_APP_RUNNING_SECONDS
      })
    ).toBe(true)
  })

  test('keeps ratings hidden when PostHog has no matching survey', () => {
    expect(
      canShowFeedbackRatingSurvey({
        surveyAvailable: false,
        appProcessRunningSeconds: FEEDBACK_RATING_MIN_APP_RUNNING_SECONDS + 60
      })
    ).toBe(false)
  })
})
