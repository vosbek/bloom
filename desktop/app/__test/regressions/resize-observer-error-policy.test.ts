import { describe, expect, it } from 'vitest'

import {
  RESIZE_OBSERVER_LOOP_MESSAGES,
  isResizeObserverLoopError,
  shouldReportResizeObserverAppError
} from '../../src/renderer/src/lib/resizeObserverErrorPolicy'

describe('resize observer loop error policy', () => {
  it('classifies well-known Chromium ResizeObserver loop messages as non-reportable', () => {
    for (const message of RESIZE_OBSERVER_LOOP_MESSAGES) {
      expect(isResizeObserverLoopError(message)).toBe(true)
      expect(isResizeObserverLoopError(new Error(message))).toBe(true)
      expect(shouldReportResizeObserverAppError(message)).toBe(false)
      expect(shouldReportResizeObserverAppError(new Error(message))).toBe(false)
    }
  })

  it('still reports unrelated errors and near-miss messages', () => {
    const unrelated = [
      new Error('layout failed'),
      'ResizeObserver',
      'ResizeObserver loop completed with undelivered notifications',
      'ResizeObserver loop limit exceeded!',
      new Error('ResizeObserver loop completed with undelivered notifications. '),
      null,
      undefined,
      42
    ]

    for (const value of unrelated) {
      expect(isResizeObserverLoopError(value)).toBe(false)
      expect(shouldReportResizeObserverAppError(value)).toBe(true)
    }
  })
})
