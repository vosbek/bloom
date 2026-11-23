import { describe, expect, it, vi } from 'vitest'

import {
  ACCOUNT_OAUTH_CODE_VERIFIER_NOT_FOUND_MESSAGE,
  isExpectedAccountOAuthCallbackFailure,
  reportAccountDeepLinkFailure,
  shouldReportAccountDeepLinkAppError
} from '../../src/main/accountOAuthCallbackFailurePolicy'

function betterAuthCodeVerifierError(): Error {
  const error = new Error(ACCOUNT_OAUTH_CODE_VERIFIER_NOT_FOUND_MESSAGE)
  error.name = 'BetterAuthError'
  return error
}

describe('account OAuth callback failure policy', () => {
  it('treats explicit social cancellation as normal', () => {
    expect(shouldReportAccountDeepLinkAppError(new Error('Social sign-in was cancelled.'))).toBe(false)
  })
  it('treats BetterAuth Code verifier not found as expected non-reportable noise', () => {
    const error = betterAuthCodeVerifierError()

    expect(isExpectedAccountOAuthCallbackFailure(error)).toBe(true)
    expect(shouldReportAccountDeepLinkAppError(error)).toBe(false)
  })

  it('does not call captureAppError for Code verifier not found', () => {
    const captureAppError = vi.fn()
    const logInfo = vi.fn()
    const error = betterAuthCodeVerifierError()

    reportAccountDeepLinkFailure(error, { captureAppError, logInfo })

    expect(captureAppError).not.toHaveBeenCalled()
    expect(logInfo).toHaveBeenCalledWith(
      'expected account OAuth callback failure',
      expect.objectContaining({
        error_name: 'BetterAuthError',
        error_message: ACCOUNT_OAUTH_CODE_VERIFIER_NOT_FOUND_MESSAGE,
        reporting_action: 'local_log_only'
      })
    )
  })

  it('does not treat a same-message Error without BetterAuthError name as expected', () => {
    const error = new Error(ACCOUNT_OAUTH_CODE_VERIFIER_NOT_FOUND_MESSAGE)
    const captureAppError = vi.fn()

    expect(isExpectedAccountOAuthCallbackFailure(error)).toBe(false)
    expect(shouldReportAccountDeepLinkAppError(error)).toBe(true)

    reportAccountDeepLinkFailure(error, {
      captureAppError,
      logInfo: vi.fn()
    })
    expect(captureAppError).toHaveBeenCalledWith('main.account-deep-link', error)
  })

  it('still reports unexpected account callback failures', () => {
    const errors = [
      new Error('Account sign-in callback could not be completed.'),
      Object.assign(new Error('invalid_grant'), { name: 'BetterAuthError' }),
      new Error('Network request failed')
    ]

    for (const error of errors) {
      expect(isExpectedAccountOAuthCallbackFailure(error)).toBe(false)
      expect(shouldReportAccountDeepLinkAppError(error)).toBe(true)

      const captureAppError = vi.fn()
      reportAccountDeepLinkFailure(error, {
        captureAppError,
        logInfo: vi.fn()
      })
      expect(captureAppError).toHaveBeenCalledWith('main.account-deep-link', error)
    }
  })
})
