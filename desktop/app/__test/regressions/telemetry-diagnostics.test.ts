import { describe, expect, test } from 'vitest'

import {
  classifyFailure,
  classifyTelemetryPath,
  diagnosticPropertiesForError,
  isSensitiveTelemetryKey,
  safeTelemetryError,
  sanitizeTelemetryText
} from '../../src/main/telemetryDiagnostics'

describe('telemetry diagnostics', () => {
  test('labels feature-level user impact for high-volume production error families', () => {
    expect(
      diagnosticPropertiesForError(
        'main.parser.worker_ingest',
        new Error('EIO: i/o error, stat \\wsl.localhost\\Ubuntu\\home\\person\\project'),
        { provider: 'codex' }
      )
    ).toMatchObject({
      feature_area: 'conversations',
      failure_class: 'path_io_failed',
      failure_stage: 'conversation_ingest',
      user_impact: 'conversations_may_be_stale',
      impact_scope: 'feature_degraded',
      recovery_mode: 'stale_data_retained'
    })

    expect(
      diagnosticPropertiesForError('main.ipc', new Error('This operation was aborted'), {
        channel: 'referrals:getStatus'
      })
    ).toMatchObject({
      feature_area: 'referrals',
      user_impact: 'referral_status_unavailable',
      failure_stage: 'ipc_request'
    })

    expect(
      diagnosticPropertiesForError('insights.pipeline', new Error('Clustering failed: timed out'), {
        stage: 'clustering'
      })
    ).toMatchObject({
      feature_area: 'improve',
      failure_class: 'timeout',
      failure_stage: 'clustering',
      user_impact: 'improve_result_unavailable'
    })
  })

  test('classifies failures without preserving high-cardinality messages', () => {
    expect(classifyFailure(new Error('file is not a database'))).toBe('sqlite_corruption')
    expect(classifyFailure(new Error('unable to get local issuer certificate'))).toBe(
      'certificate_validation_failed'
    )
    expect(
      classifyFailure(
        new Error('codex exited with code 1: failed to decode models response: unknown variant max')
      )
    ).toBe('harness_version_incompatible')
  })

  test('removes content-bearing identifiers and classifies paths', () => {
    expect(isSensitiveTelemetryKey('sourcePath')).toBe(true)
    expect(isSensitiveTelemetryKey('workspace_path')).toBe(true)
    expect(isSensitiveTelemetryKey('conversation_id')).toBe(true)
    expect(isSensitiveTelemetryKey('run_id')).toBe(true)
    expect(isSensitiveTelemetryKey('path_kind')).toBe(false)
    expect(classifyTelemetryPath('\\\\wsl.localhost\\Ubuntu\\home\\person\\project')).toBe(
      'wsl_unc'
    )
    expect(classifyTelemetryPath('C:\\Users\\person\\project')).toBe('windows_absolute')
    expect(classifyTelemetryPath('/Users/person/project')).toBe('unix_absolute')
  })

  test('redacts filesystem locations from messages and stacks', () => {
    const raw =
      "ENOENT: no such file, stat 'C:\\Users\\Person\\secret-project\\session.jsonl' at parse (/Users/person/project/parser.ts:4:2); mirrors: file://server/share/private/project and C:/Users/Person/forward-secret/session.jsonl"
    const sanitized = sanitizeTelemetryText(raw)
    expect(sanitized).not.toContain('Person')
    expect(sanitized).not.toContain('secret-project')
    expect(sanitized).not.toContain('/Users/person/project')
    expect(sanitized).not.toContain('server/share/private')
    expect(sanitized).not.toContain('forward-secret')
    expect(sanitizeTelemetryText('request failed at https://updates.example.test/feed')).toContain(
      'https://updates.example.test/feed'
    )
    expect(sanitized).toContain('[Path]')
  })

  test('redacts complete quoted filesystem locations containing spaces', () => {
    const raw = [
      "open 'file:///Users/person/My Secret/project.ts'",
      'open "C:/Users/person/My Secret/project.ts"',
      "open 'C:\\Users\\person\\My Secret\\project.ts'",
      'open "/Users/person/My Secret/project.ts"',
      'open "/Users/O\'Connor/My Project/file.ts"'
    ].join('; ')
    const sanitized = sanitizeTelemetryText(raw)

    expect(sanitized).toBe(
      'open \'[Path]\'; open "[Path]"; open \'[Path]\'; open "[Path]"; open "[Path]"'
    )
    expect(sanitizeTelemetryText('normal prose: "please retry later"')).toBe(
      'normal prose: "please retry later"'
    )
    expect(sanitizeTelemetryText('request failed at "https://updates.example.test/My Feed"')).toBe(
      'request failed at "https://updates.example.test/My Feed"'
    )
  })

  test('replaces Improve subprocess output with a stable safe exception', () => {
    const error = new Error(
      'codex exited with code 1: {"type":"error","message":"response content that must not leave the app"}'
    )
    const safe = safeTelemetryError('insights.pipeline', error)
    expect(safe.message).toBe('External analysis process exited with code 1')
    expect(safe.message).not.toContain('response content')
  })
})
