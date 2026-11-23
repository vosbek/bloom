import { describe, expect, it, vi } from 'vitest'

import {
  isExpectedMenuBarBlumeMenuLoadFailure,
  isExpectedMenuBarDataUrlLoadFailure,
  isExpectedMenuBarPopoverLoadFailure,
  isExpectedMenuBarPopoverLoadTimeout,
  MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE,
  reportMenuBarPopoverLoadFailure,
  shouldCaptureMenuBarPopoverLoadAppError,
  summarizeMenuBarPopoverLoadErrorMessage
} from '../../src/main/menuBarPopoverLoadErrorPolicy'

function errFailedDataHtml(documentSnippet: string): Error {
  return new Error(
    `ERR_FAILED (-2) loading 'data:text/html;charset=utf-8,${encodeURIComponent(documentSnippet)}'`
  )
}

function errAbortedBlumeMenu(action: string): Error {
  return new Error(`ERR_ABORTED (-3) loading 'blume-menu://${action}'`)
}

describe('menu bar popover data:URL load failure policy', () => {
  it('treats Chromium ERR_FAILED on menu-bar popover data:HTML as expected non-reportable noise', () => {
    const error = errFailedDataHtml(
      '<!doctype html>\n<html class="dark"><head><title>Blume</title></head></html>'
    )

    expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(true)
    expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(false)
  })

  it('treats legacy Blume tray icon renderer ERR_FAILED data:URL loads as expected', () => {
    const error = errFailedDataHtml(
      '<!doctype html><meta charset="utf-8"><title>Blume tray icon renderer</title>'
    )

    expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(true)
    expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(false)
  })

  it('treats ERR_ABORTED data:text/html load aborts as expected', () => {
    const error = new Error(
      `ERR_ABORTED (-3) loading 'data:text/html;charset=utf-8,${encodeURIComponent('<html></html>')}'`
    )

    expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(true)
  })

  it('treats destroyed-window races that still mention data:text/html as expected', () => {
    const error = new Error(
      "Object has been destroyed while loading 'data:text/html;charset=utf-8,<html></html>'"
    )

    expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(true)
  })

  it('does not call captureAppError for expected data:URL load failures', () => {
    const captureAppError = vi.fn()
    const logInfo = vi.fn()
    const error = errFailedDataHtml(
      '<!doctype html><meta charset="utf-8"><title>Blume tray icon renderer</title>'
    )

    reportMenuBarPopoverLoadFailure('main.menu-bar-popover-preload', error, {
      captureAppError,
      logInfo
    })

    expect(captureAppError).not.toHaveBeenCalled()
    expect(logInfo).toHaveBeenCalledWith(
      'expected menu bar data URL load failure',
      expect.objectContaining({
        source: 'main.menu-bar-popover-preload',
        error_name: 'Error',
        reporting_action: 'local_log_only'
      })
    )

    const logged = logInfo.mock.calls[0]?.[1] as { error_message?: string }
    expect(logged.error_message).toEqual(summarizeMenuBarPopoverLoadErrorMessage(error.message))
    expect(logged.error_message).toContain('ERR_FAILED')
    expect(logged.error_message).toContain('data:text/html;<redacted>')
    expect(logged.error_message).not.toContain('<!doctype')
    expect(logged.error_message).not.toContain(encodeURIComponent('<!doctype'))
    expect(logged.error_message).not.toBe(error.message)
    expect(logged.error_message!.length).toBeLessThanOrEqual(200)
  })

  it('summarizeMenuBarPopoverLoadErrorMessage redacts data:URL bodies and preserves markers', () => {
    const raw =
      "ERR_FAILED (-2) loading 'data:text/html;charset=utf-8," +
      encodeURIComponent(
        '<!doctype html><title>Blume tray icon renderer</title><body>secret</body>'
      ) +
      "'"

    const summary = summarizeMenuBarPopoverLoadErrorMessage(raw)
    expect(summary).toContain('ERR_FAILED')
    expect(summary).toContain('data:text/html;<redacted>')
    expect(summary).not.toContain('<!doctype')
    expect(summary).not.toContain('secret')
    expect(summary.length).toBeLessThanOrEqual(200)
  })

  it('treats ERR_ABORTED on blume-menu://open and blume-menu://quit as expected', () => {
    for (const action of ['open', 'quit'] as const) {
      const error = errAbortedBlumeMenu(action)

      expect(isExpectedMenuBarBlumeMenuLoadFailure(error)).toBe(true)
      expect(isExpectedMenuBarPopoverLoadFailure(error)).toBe(true)
      expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(false)
      expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(false)
    }
  })

  it('treats related transient Chromium failures on other blume-menu:// actions as expected', () => {
    const cases = [
      new Error("ERR_FAILED (-2) loading 'blume-menu://preferences'"),
      new Error("ERR_CONNECTION_RESET (-101) loading 'blume-menu://open'"),
      new Error("Object has been destroyed while loading 'blume-menu://conversation?ref=abc'")
    ]

    for (const error of cases) {
      expect(isExpectedMenuBarBlumeMenuLoadFailure(error)).toBe(true)
      expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(false)
    }
  })

  it('does not call captureAppError for expected blume-menu:// load aborts', () => {
    const captureAppError = vi.fn()
    const logInfo = vi.fn()
    const error = errAbortedBlumeMenu('open')

    reportMenuBarPopoverLoadFailure('main.menu-bar-popover', error, {
      captureAppError,
      logInfo
    })

    expect(captureAppError).not.toHaveBeenCalled()
    expect(logInfo).toHaveBeenCalledWith(
      'expected menu bar blume-menu protocol load abort',
      expect.objectContaining({
        source: 'main.menu-bar-popover',
        error_name: 'Error',
        error_message: "ERR_ABORTED (-3) loading 'blume-menu://open'",
        reporting_action: 'local_log_only'
      })
    )
  })

  it('treats the exact menu-bar popover load timeout as expected non-reportable noise', () => {
    const error = new Error(MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE)

    expect(isExpectedMenuBarPopoverLoadTimeout(error)).toBe(true)
    expect(isExpectedMenuBarPopoverLoadFailure(error)).toBe(true)
    expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(false)
    expect(isExpectedMenuBarBlumeMenuLoadFailure(error)).toBe(false)
    expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(false)
  })

  it('does not call captureAppError for the dedicated load timeout', () => {
    const captureAppError = vi.fn()
    const logInfo = vi.fn()
    const error = new Error(MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE)

    reportMenuBarPopoverLoadFailure('main.menu-bar-popover', error, {
      captureAppError,
      logInfo
    })

    expect(captureAppError).not.toHaveBeenCalled()
    expect(logInfo).toHaveBeenCalledWith(
      'expected menu bar popover load timeout',
      expect.objectContaining({
        source: 'main.menu-bar-popover',
        error_name: 'Error',
        error_message: MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE,
        reporting_action: 'local_log_only'
      })
    )
  })

  it('does not demote height-measurement timeouts or updater staging timeouts', () => {
    const cases: unknown[] = [
      new Error('Menu bar popover height measurement timed out'),
      new Error('macOS native updater did not stage v1.0.72 within 120000ms'),
      new Error('Menu bar popover load timed out; extra context')
    ]

    for (const error of cases) {
      expect(isExpectedMenuBarPopoverLoadTimeout(error)).toBe(false)
      expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(true)
    }
  })

  it('still reports HTTPS ERR_ABORTED when blume-menu:// appears only in the query', () => {
    const error = new Error(
      "ERR_ABORTED (-3) loading 'https://example.com/popover?next=blume-menu://open'"
    )

    expect(isExpectedMenuBarBlumeMenuLoadFailure(error)).toBe(false)
    expect(isExpectedMenuBarPopoverLoadFailure(error)).toBe(false)
    expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(true)

    const captureAppError = vi.fn()
    reportMenuBarPopoverLoadFailure('main.menu-bar-popover', error, {
      captureAppError,
      logInfo: vi.fn()
    })
    expect(captureAppError).toHaveBeenCalledWith('main.menu-bar-popover', error)
  })

  it('still reports unrelated URL load failures and non-lifecycle exceptions', () => {
    const cases: unknown[] = [
      new Error("ERR_FAILED (-2) loading 'https://example.com/popover'"),
      new Error("ERR_ABORTED (-3) loading 'https://example.com/popover'"),
      new Error('Object has been destroyed'),
      new Error('Unexpected height measurement failure'),
      new TypeError('Cannot read properties of null')
    ]

    for (const error of cases) {
      expect(isExpectedMenuBarDataUrlLoadFailure(error)).toBe(false)
      expect(isExpectedMenuBarBlumeMenuLoadFailure(error)).toBe(false)
      expect(isExpectedMenuBarPopoverLoadTimeout(error)).toBe(false)
      expect(shouldCaptureMenuBarPopoverLoadAppError(error)).toBe(true)

      const captureAppError = vi.fn()
      reportMenuBarPopoverLoadFailure('main.menu-bar-popover', error, {
        captureAppError,
        logInfo: vi.fn()
      })
      expect(captureAppError).toHaveBeenCalledWith('main.menu-bar-popover', error)
    }
  })

  it('routes update and click sources through the same capture gate', () => {
    const cases = [
      errFailedDataHtml('<html class="light"></html>'),
      errAbortedBlumeMenu('quit'),
      new Error(MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE)
    ]

    for (const error of cases) {
      for (const source of [
        'main.menu-bar-popover',
        'main.menu-bar-popover-preload',
        'main.menu-bar-popover-update'
      ] as const) {
        const captureAppError = vi.fn()
        reportMenuBarPopoverLoadFailure(source, error, {
          captureAppError,
          logInfo: vi.fn()
        })
        expect(captureAppError).not.toHaveBeenCalled()
      }
    }
  })
})
