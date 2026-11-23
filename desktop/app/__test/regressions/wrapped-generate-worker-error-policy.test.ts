import { describe, expect, it } from 'vitest'

import {
  WRAPPED_GENERATE_WORKER_CIRCUIT_BREAKER_MESSAGE,
  WRAPPED_GENERATE_WORKER_DISPOSED_MESSAGE,
  WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE,
  WrappedGenerateWorkerUnavailableError,
  isExpectedWrappedGenerateWorkerOperationalError,
  isWrappedGenerateWorkerUnavailableError,
  shouldReportWrappedGenerateAppError
} from '../../src/main/wrapped/generateHost'

describe('wrapped generate worker operational error policy', () => {
  it('classifies unresponsive, dispose, and circuit-breaker as expected', () => {
    const errors = [
      new WrappedGenerateWorkerUnavailableError(WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE),
      new WrappedGenerateWorkerUnavailableError(WRAPPED_GENERATE_WORKER_DISPOSED_MESSAGE),
      new WrappedGenerateWorkerUnavailableError(WRAPPED_GENERATE_WORKER_CIRCUIT_BREAKER_MESSAGE)
    ]

    for (const error of errors) {
      expect(isWrappedGenerateWorkerUnavailableError(error)).toBe(true)
      expect(isExpectedWrappedGenerateWorkerOperationalError(error)).toBe(true)
      expect(shouldReportWrappedGenerateAppError(error)).toBe(false)
    }
  })

  it('still reports unexpected worker infrastructure failures', () => {
    const errors = [
      new WrappedGenerateWorkerUnavailableError('wrapped generate worker exited'),
      new WrappedGenerateWorkerUnavailableError('failed to message wrapped generate worker'),
      new WrappedGenerateWorkerUnavailableError('failed to cancel wrapped worker request'),
      new WrappedGenerateWorkerUnavailableError('failed to spawn wrapped generate worker'),
      new WrappedGenerateWorkerUnavailableError('wrapped generate worker unavailable'),
      new WrappedGenerateWorkerUnavailableError('wrapped generate worker disabled'),
      new Error(WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE)
    ]

    for (const error of errors) {
      expect(isExpectedWrappedGenerateWorkerOperationalError(error)).toBe(false)
      expect(shouldReportWrappedGenerateAppError(error)).toBe(true)
    }
  })
})
