import { describe, expect, it } from 'vitest'

import {
  SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE,
  SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE,
  SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE,
  SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE,
  SignalAnalyticsWorkerUnavailableError,
  isExpectedSignalAnalyticsWorkerOperationalError,
  isExpectedSignalAnalyticsWorkerShutdownError,
  isSignalAnalyticsWorkerUnavailableError,
  shouldReportSignalAnalyticsAppError
} from '../../src/main/signalAnalyticsHost'

describe('signal analytics worker operational error policy', () => {
  it('classifies timeout, exit, and dispose as expected operational skips', () => {
    const errors = [
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE),
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE),
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE)
    ]

    for (const error of errors) {
      expect(isSignalAnalyticsWorkerUnavailableError(error)).toBe(true)
      expect(isExpectedSignalAnalyticsWorkerOperationalError(error)).toBe(true)
      expect(shouldReportSignalAnalyticsAppError(error)).toBe(false)
    }
  })

  it('still reports typed unavailable infrastructure failures', () => {
    // EXITED is demoted: one host retry absorbs the common race, and exhausted
    // EXITED after that retry is environmental (utility-process death / OS
    // reclaim), not a signal-analytics product defect. Missing fork stays
    // reportable. OOM / launch-failed still surface via child-process-gone.
    const error = new SignalAnalyticsWorkerUnavailableError(
      SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE
    )

    expect(isSignalAnalyticsWorkerUnavailableError(error)).toBe(true)
    expect(isExpectedSignalAnalyticsWorkerOperationalError(error)).toBe(false)
    expect(shouldReportSignalAnalyticsAppError(error)).toBe(true)
  })

  it('keeps dispose-on-quit as the only expected shutdown rejection', () => {
    const dispose = new SignalAnalyticsWorkerUnavailableError(
      SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE
    )
    expect(isExpectedSignalAnalyticsWorkerShutdownError(dispose)).toBe(true)

    const notShutdown = [
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE),
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE),
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE)
    ]
    for (const error of notShutdown) {
      expect(isExpectedSignalAnalyticsWorkerShutdownError(error)).toBe(false)
    }
  })

  it('still reports unexpected aggregation and untyped message matches', () => {
    const errors = [
      new Error('failed to aggregate signal analytics'),
      new Error(SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE),
      new Error(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE),
      new Error(SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE),
      new Error(SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE),
      new SignalAnalyticsWorkerUnavailableError('signal analytics worker message failed')
    ]

    for (const error of errors) {
      expect(isExpectedSignalAnalyticsWorkerOperationalError(error)).toBe(false)
      expect(isExpectedSignalAnalyticsWorkerShutdownError(error)).toBe(false)
      expect(shouldReportSignalAnalyticsAppError(error)).toBe(true)
    }
  })
})
