import { describe, expect, test } from 'vitest'

import {
  childProcessGoneDiagnosticProperties,
  renderProcessGoneDiagnosticProperties,
  type ChildProcessGoneDetails,
  type ChildProcessGoneReason,
  type RenderProcessGoneDetails,
  type RenderProcessGoneReason,
  type ShouldCaptureChildProcessGoneOptions,
  shouldCaptureChildProcessGone,
  shouldCaptureRenderProcessGone
} from '../../src/main/processGone'

function details(reason: ChildProcessGoneReason): ChildProcessGoneDetails {
  return {
    reason,
    type: 'Utility',
    exitCode: 0,
    name: 'Network Service'
  }
}

function managedDetails(reason: ChildProcessGoneReason): ChildProcessGoneDetails {
  return {
    reason,
    type: 'Utility',
    exitCode: 15,
    name: 'blume-refresh-worker',
    serviceName: 'node.mojom.NodeService'
  }
}

function renderDetails(reason: RenderProcessGoneReason): RenderProcessGoneDetails {
  return { reason, exitCode: 15 }
}

function captureOptions(
  overrides: { managedBackgroundProcess?: boolean } = {}
): ShouldCaptureChildProcessGoneOptions {
  return {
    managedBackgroundProcess: overrides.managedBackgroundProcess ?? true
  }
}

describe('child process gone telemetry', () => {
  test('builds queryable lifecycle context for Blume worker exits', () => {
    expect(
      childProcessGoneDiagnosticProperties(
        {
          ...details('killed'),
          exitCode: 15,
          name: 'blume-refresh-worker',
          serviceName: 'node.mojom.NodeService'
        },
        {
          appIsQuitting: false,
          reportingAction: 'ignored',
          managedBackgroundProcess: true,
          activeRequestCount: 2,
          terminationIntent: 'request-timeout'
        }
      )
    ).toMatchObject({
      lifecycle_event: 'child_process_gone',
      process_kind: 'child',
      process_name: 'blume-refresh-worker',
      process_service_name: 'node.mojom.NodeService',
      exit_reason: 'killed',
      exit_code: 15,
      app_is_quitting: false,
      reporting_action: 'ignored',
      managed_background_process: true,
      active_request_count: 2,
      expected_termination: true,
      termination_intent: 'request-timeout'
    })
  })

  test('ignores clean helper exits', () => {
    expect(shouldCaptureChildProcessGone(managedDetails('clean-exit'), captureOptions())).toBe(
      false
    )
    expect(
      shouldCaptureChildProcessGone(
        managedDetails('clean-exit'),
        captureOptions({ managedBackgroundProcess: true })
      )
    ).toBe(false)
  })

  test('never captures unmanaged Chromium helpers as exceptions', () => {
    for (const reason of [
      'killed',
      'abnormal-exit',
      'crashed',
      'oom',
      'launch-failed',
      'integrity-failure',
      'memory-eviction'
    ] as const) {
      expect(
        shouldCaptureChildProcessGone(
          details(reason),
          captureOptions({ managedBackgroundProcess: false })
        )
      ).toBe(false)
    }
  })

  test('ignores managed worker killed or abnormal-exit during quit', () => {
    // Quit-in-flight still produces killed/abnormal-exit; the reason filter
    // covers them without a separate appIsQuitting branch.
    expect(shouldCaptureChildProcessGone(managedDetails('killed'), captureOptions())).toBe(false)
    expect(shouldCaptureChildProcessGone(managedDetails('abnormal-exit'), captureOptions())).toBe(
      false
    )
  })

  test('logs intentional worker termination without capturing an exception', () => {
    // Recorded termination intents also produce killed/abnormal-exit; those
    // reasons are never exception-worthy. Managed-worker crashed is also
    // log-only (Chromium mislabels environmental OS kills). Keep oom /
    // integrity as exceptions even if they race the intent record.
    expect(shouldCaptureChildProcessGone(managedDetails('killed'), captureOptions())).toBe(false)
    expect(shouldCaptureChildProcessGone(managedDetails('abnormal-exit'), captureOptions())).toBe(
      false
    )
    expect(shouldCaptureChildProcessGone(managedDetails('crashed'), captureOptions())).toBe(false)
    expect(shouldCaptureChildProcessGone(managedDetails('oom'), captureOptions())).toBe(true)
    expect(
      shouldCaptureChildProcessGone(managedDetails('integrity-failure'), captureOptions())
    ).toBe(true)
  })

  test('labels ignored managed-worker crash diagnostics without expected-termination', () => {
    expect(
      childProcessGoneDiagnosticProperties(
        {
          ...details('crashed'),
          name: 'blume-refresh-worker',
          exitCode: -1073741205
        },
        {
          appIsQuitting: false,
          reportingAction: 'ignored',
          managedBackgroundProcess: true,
          activeRequestCount: 1,
          terminationIntent: undefined
        }
      )
    ).toMatchObject({
      reporting_action: 'ignored',
      expected_termination: false,
      exit_code: -1073741205,
      user_impact: 'background_feature_interrupted',
      impact_scope: 'feature_degraded',
      recovery_mode: 'automatic_retry'
    })
  })

  test('labels a genuine managed oom as user-impacting even when it races a termination intent', () => {
    expect(
      childProcessGoneDiagnosticProperties(
        {
          ...details('oom'),
          name: 'blume-refresh-worker'
        },
        {
          appIsQuitting: false,
          reportingAction: 'captured',
          managedBackgroundProcess: true,
          activeRequestCount: 1,
          terminationIntent: 'request-timeout'
        }
      )
    ).toMatchObject({
      reporting_action: 'captured',
      expected_termination: false,
      user_impact: 'background_feature_interrupted',
      impact_scope: 'feature_degraded',
      recovery_mode: 'automatic_retry'
    })
  })

  test('does not capture managed worker killed or abnormal-exit as exceptions', () => {
    expect(shouldCaptureChildProcessGone(managedDetails('killed'), captureOptions())).toBe(false)
    expect(shouldCaptureChildProcessGone(managedDetails('abnormal-exit'), captureOptions())).toBe(
      false
    )
  })

  test('does not capture managed worker crashed as exceptions (v1.0.73 stick)', () => {
    // Production stick: Utility blume-refresh-worker / node.mojom.NodeService
    // reason=crashed with Windows STATUS_DLL_INIT_FAILED_LOGOFF (-1073741205)
    // or generic -1. Host already reports pending-work exits via
    // ConversationRefreshWorkerUnavailableError.
    expect(
      shouldCaptureChildProcessGone(
        {
          reason: 'crashed',
          type: 'Utility',
          exitCode: -1073741205,
          name: 'blume-refresh-worker',
          serviceName: 'node.mojom.NodeService'
        },
        captureOptions({ managedBackgroundProcess: true })
      )
    ).toBe(false)
    expect(
      shouldCaptureChildProcessGone(
        {
          reason: 'crashed',
          type: 'Utility',
          exitCode: -1,
          name: 'blume-refresh-worker',
          serviceName: 'node.mojom.NodeService'
        },
        captureOptions({ managedBackgroundProcess: true })
      )
    ).toBe(false)
    expect(shouldCaptureChildProcessGone(managedDetails('crashed'), captureOptions())).toBe(false)
  })

  test('captures genuine managed worker failures while the app is running', () => {
    expect(shouldCaptureChildProcessGone(managedDetails('oom'), captureOptions())).toBe(true)
    expect(shouldCaptureChildProcessGone(managedDetails('launch-failed'), captureOptions())).toBe(
      true
    )
    expect(
      shouldCaptureChildProcessGone(managedDetails('integrity-failure'), captureOptions())
    ).toBe(true)
    expect(shouldCaptureChildProcessGone(managedDetails('memory-eviction'), captureOptions())).toBe(
      true
    )
  })
})

describe('render process gone telemetry', () => {
  test('builds queryable renderer lifecycle context', () => {
    expect(
      renderProcessGoneDiagnosticProperties(renderDetails('crashed'), {
        appIsQuitting: false,
        reportingAction: 'captured'
      })
    ).toMatchObject({
      lifecycle_event: 'render_process_gone',
      process_kind: 'renderer',
      exit_reason: 'crashed',
      exit_code: 15,
      app_is_quitting: false,
      reporting_action: 'captured'
    })
  })

  test('ignores clean renderer exits', () => {
    expect(shouldCaptureRenderProcessGone(renderDetails('clean-exit'), false)).toBe(false)
    expect(shouldCaptureRenderProcessGone(renderDetails('clean-exit'), true)).toBe(false)
  })

  test('never captures killed or abnormal-exit while the app is running', () => {
    // Same SHUTDOWN_REASONS policy as child-process-gone: external kills are
    // not exception-worthy even when appIsQuitting is false.
    expect(shouldCaptureRenderProcessGone(renderDetails('killed'), false)).toBe(false)
    expect(shouldCaptureRenderProcessGone(renderDetails('abnormal-exit'), false)).toBe(false)
  })

  test('ignores external terminations while the app is quitting', () => {
    expect(shouldCaptureRenderProcessGone(renderDetails('killed'), true)).toBe(false)
    expect(shouldCaptureRenderProcessGone(renderDetails('abnormal-exit'), true)).toBe(false)
  })

  test('captures unexpected renderer failures while the app is running', () => {
    expect(shouldCaptureRenderProcessGone(renderDetails('crashed'), false)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('oom'), false)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('launch-failed'), false)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('integrity-failure'), false)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('memory-eviction'), false)).toBe(true)
  })

  test('captures genuine crashes even during quit', () => {
    expect(shouldCaptureRenderProcessGone(renderDetails('crashed'), true)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('oom'), true)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('launch-failed'), true)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('integrity-failure'), true)).toBe(true)
    expect(shouldCaptureRenderProcessGone(renderDetails('memory-eviction'), true)).toBe(true)
  })

  test('ignored quit-in-flight kills keep no-impact diagnostic fields', () => {
    expect(
      renderProcessGoneDiagnosticProperties(renderDetails('killed'), {
        appIsQuitting: true,
        reportingAction: 'ignored'
      })
    ).toMatchObject({
      reporting_action: 'ignored',
      app_is_quitting: true,
      user_impact: 'no_user_impact_expected',
      impact_scope: 'none_expected',
      recovery_mode: 'none_required'
    })
  })

  test('ignored running hard-exit kills use closed-app impact fields', () => {
    expect(
      renderProcessGoneDiagnosticProperties(renderDetails('killed'), {
        appIsQuitting: false,
        reportingAction: 'ignored'
      })
    ).toMatchObject({
      reporting_action: 'ignored',
      app_is_quitting: false,
      user_impact: 'application_closed_unexpectedly',
      impact_scope: 'app_blocked',
      recovery_mode: 'next_launch'
    })
    expect(
      renderProcessGoneDiagnosticProperties(renderDetails('abnormal-exit'), {
        appIsQuitting: false,
        reportingAction: 'ignored'
      })
    ).toMatchObject({
      reporting_action: 'ignored',
      user_impact: 'application_closed_unexpectedly',
      impact_scope: 'app_blocked',
      recovery_mode: 'next_launch'
    })
  })

  test('captured renderer failures still use closed-app impact fields', () => {
    expect(
      renderProcessGoneDiagnosticProperties(renderDetails('crashed'), {
        appIsQuitting: false,
        reportingAction: 'captured'
      })
    ).toMatchObject({
      reporting_action: 'captured',
      user_impact: 'application_closed_unexpectedly',
      impact_scope: 'app_blocked',
      recovery_mode: 'next_launch'
    })
  })
})
