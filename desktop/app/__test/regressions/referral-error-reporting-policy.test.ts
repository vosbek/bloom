import { describe, expect, it, vi } from 'vitest'

import { reportReferralBackgroundFailure } from '../../src/main/referralErrorReportingPolicy'

function undiciFetchFailed(cause: Error): TypeError {
  const wrapper = new TypeError('fetch failed')
  ;(wrapper as { cause?: unknown }).cause = cause
  return wrapper
}

function nodeSystemError(code: string, message: string, hostname?: string): Error {
  const error = new Error(message)
  ;(error as { code?: string }).code = code
  if (hostname !== undefined) (error as { hostname?: string }).hostname = hostname
  return error
}

describe('referral background error reporting policy', () => {
  it('does not captureAppError for referrals DNS / fetch / abort network noise', () => {
    const captureAppError = vi.fn()
    const logInfo = vi.fn()
    const cases: unknown[] = [
      undiciFetchFailed(
        nodeSystemError(
          'ENOTFOUND',
          'getaddrinfo ENOTFOUND referrals.blume-page.com',
          'referrals.blume-page.com'
        )
      ),
      new TypeError('fetch failed'),
      nodeSystemError('ECONNRESET', 'socket hang up'),
      nodeSystemError('ETIMEDOUT', 'connect ETIMEDOUT'),
      Object.assign(new Error('This operation was aborted'), { name: 'AbortError' }),
      Object.assign(new Error('The operation was aborted due to timeout'), {
        name: 'TimeoutError'
      })
    ]

    for (const error of cases) {
      captureAppError.mockClear()
      logInfo.mockClear()
      reportReferralBackgroundFailure('main.referral-activation', error, {
        captureAppError,
        logInfo
      })
      expect(captureAppError).not.toHaveBeenCalled()
      expect(logInfo).toHaveBeenCalledWith(
        'expected referral activation service failure',
        expect.objectContaining({ reporting_action: 'local_log_only' })
      )
    }
  })

  it('still captures unexpected referral background failures', () => {
    const captureAppError = vi.fn()
    const unexpected = new Error('referrals /activate -> 500')

    reportReferralBackgroundFailure('main.referral-claim', unexpected, {
      captureAppError,
      logInfo: vi.fn()
    })

    expect(captureAppError).toHaveBeenCalledWith('main.referral-claim', unexpected)
  })
})
