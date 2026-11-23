import { describe, expect, it } from 'vitest'

import { CLAUDE_CANONICAL_PARSING_STOPPED_MESSAGE } from '@blume/app-core'

import {
  CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE,
  CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE,
  CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE,
  CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE,
  CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE,
  ConversationRefreshWorkerUnavailableError,
  isConversationRefreshWorkerUnavailableError,
  isExpectedConversationRefreshWorkerOperationalError,
  isExpectedConversationRefreshWorkerShutdownError,
  shouldReportConversationRefreshAppError
} from '../../src/main/conversations/refreshHost'

describe('conversation refresh worker operational error policy', () => {
  it('classifies unresponsive, dispose, disable, and circuit-breaker as expected', () => {
    const errors = [
      new ConversationRefreshWorkerUnavailableError(
        CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE
      ),
      new ConversationRefreshWorkerUnavailableError(
        CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE
      ),
      new ConversationRefreshWorkerUnavailableError(CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE),
      new ConversationRefreshWorkerUnavailableError(CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE),
      new ConversationRefreshWorkerUnavailableError(
        CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE
      )
    ]

    for (const error of errors) {
      expect(isConversationRefreshWorkerUnavailableError(error)).toBe(true)
      expect(isExpectedConversationRefreshWorkerOperationalError(error)).toBe(true)
      expect(shouldReportConversationRefreshAppError(error)).toBe(false)
    }
  })

  it('keeps dispose-on-quit as the only expected shutdown rejection', () => {
    const dispose = new ConversationRefreshWorkerUnavailableError(
      CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE
    )
    expect(isExpectedConversationRefreshWorkerShutdownError(dispose)).toBe(true)

    const operationalButNotShutdown = [
      new ConversationRefreshWorkerUnavailableError(
        CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE
      ),
      new ConversationRefreshWorkerUnavailableError(CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE),
      new ConversationRefreshWorkerUnavailableError(
        CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE
      )
    ]
    for (const error of operationalButNotShutdown) {
      expect(isExpectedConversationRefreshWorkerShutdownError(error)).toBe(false)
      expect(isExpectedConversationRefreshWorkerOperationalError(error)).toBe(true)
    }
  })

  it('does not report cooperative Claude canonical parse-stop as a refresh app error', () => {
    const stop = new Error(CLAUDE_CANONICAL_PARSING_STOPPED_MESSAGE)
    const stackInMessage = new Error(
      `Error: ${CLAUDE_CANONICAL_PARSING_STOPPED_MESSAGE}\n` +
        '    at summarizeClaudeSessionConversation (refreshWorker.js:1:1)\n' +
        '    at async runRefreshQueue (refreshWorker.js:2:1)'
    )

    expect(shouldReportConversationRefreshAppError(stop)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
  })

  it('does not report parser-temp ENOSPC as a refresh app error', () => {
    const enospc = new Error(
      "ENOSPC: no space left on device, mkdtemp '/var/folders/sy/czv8m_m56dv1fj4jh8m6_ffw0000gn/T/blume-parser-output-XXXXXX'"
    )
    const stackInMessage = new Error(
      "Error: ENOSPC: no space left on device, mkdtemp '/var/folders/sy/czv8m_m56dv1fj4jh8m6_ffw0000gn/T/blume-parser-output-XXXXXX'\n" +
        '    at Object.mkdtempSync (node:fs:3050:18)\n' +
        '    at Object.parse (rustBinding.node.js:585:33)'
    )
    const openMasked = new Error("ENOSPC: no space left on device, open '[Path]'")
    const openMaskedStack = new Error(
      "Error: ENOSPC: no space left on device, open '[Path]'\n" +
        '    at Object.openSync (node:fs:561:18)\n' +
        '    at parseCursorSessionWithBinding (providerHostFactory.js:3854:38)\n' +
        '    at async forwardTelemetry (refreshHost.ts:317:5)'
    )
    const openParserOutput = new Error(
      "ENOSPC: no space left on device, open '/tmp/blume-parser-output-abcd/parser-output.json'"
    )

    expect(shouldReportConversationRefreshAppError(enospc)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
    expect(shouldReportConversationRefreshAppError(openMasked)).toBe(false)
    expect(shouldReportConversationRefreshAppError(openMaskedStack)).toBe(false)
    expect(shouldReportConversationRefreshAppError(openParserOutput)).toBe(false)
  })

  it('does not report harness-parser stdout ENOSPC exit as a refresh app error', () => {
    const clean = new Error(
      'harness-parser exited 101: \n' +
        "thread 'main' (198982266) panicked at [Path]:1165:9:\n" +
        'failed printing to stdout: No space left on device (os error 28)\n' +
        'note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n'
    )
    const stackInMessage = new Error(
      'Error: harness-parser exited 101: \n' +
        "thread 'main' (198982266) panicked at [Path]:1165:9:\n" +
        'failed printing to stdout: No space left on device (os error 28)\n' +
        'note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n' +
        '\n' +
        '    at Object.parse ([Path]:587:32)\n' +
        '    at parseCursorSessionWithBinding ([Path]:3854:38)\n' +
        '    at async forwardTelemetry (refreshHost.ts:317:5)'
    )

    expect(shouldReportConversationRefreshAppError(clean)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
  })

  it('does not report harness-parser Windows NTSTATUS hard-fault / OOM exits as refresh app errors', () => {
    // 3221226505 = 0xC0000409 STATUS_STACK_BUFFER_OVERRUN
    const stackBufferOverrun = new Error('harness-parser exited 3221226505: ')
    // 3221225477 = 0xC0000005 STATUS_ACCESS_VIOLATION
    const accessViolation = new Error('harness-parser exited 3221225477: ')
    // 3221225794 = 0xC0000142 STATUS_DLL_INIT_FAILED
    const dllInitFailed = new Error('harness-parser exited 3221225794: ')
    const oomAbort = new Error(
      'harness-parser exited 3221226505: memory allocation of 6500869287 bytes failed\n' +
        'note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n'
    )
    const stackInMessage = new Error(
      'Error: harness-parser exited 3221226505: memory allocation of 6500869287 bytes failed\n' +
        'note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n' +
        '\n' +
        '    at Object.parse ([Path]:620:17)\n' +
        '    at parseLocalJsonlConversationWithBinding ([Path]:4088:38)\n' +
        '    at async summarizeCodexSessionConversation ([Path]:1344:20)\n' +
        '    at async forwardTelemetry (refreshHost.ts:317:5)'
    )

    expect(shouldReportConversationRefreshAppError(stackBufferOverrun)).toBe(false)
    expect(shouldReportConversationRefreshAppError(accessViolation)).toBe(false)
    expect(shouldReportConversationRefreshAppError(dllInitFailed)).toBe(false)
    expect(shouldReportConversationRefreshAppError(oomAbort)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
  })

  it('does not report missing session-file ENOENT as a refresh app error', () => {
    const codexPath =
      '/Users/ericwillroth/.codex/sessions/2026/09/01/rollout-2026-09-01T19-34-24-01a05f52-e95d-7210-8a1f-290a515caee9.jsonl'
    const enoent = new Error(`ENOENT: no such file or directory, stat '${codexPath}'`)
    const masked = new Error("Error: ENOENT: no such file or directory, stat '[Path]'")
    const stackInMessage = new Error(
      `Error: ENOENT: no such file or directory, stat '${codexPath}'\n` +
        '    at Object.statSync (node:fs:1200:18)\n' +
        '    at forwardTelemetry (refreshHost.ts:317:5)'
    )

    expect(shouldReportConversationRefreshAppError(enoent)).toBe(false)
    expect(shouldReportConversationRefreshAppError(masked)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
  })

  it('does not report missing harness-parser spawnSync ENOENT as a refresh app error', () => {
    const clean = new Error('spawnSync [Path] ENOENT')
    const stackInMessage = new Error(
      'Error: spawnSync [Path] ENOENT\n' +
        '    at Object.spawnSync (node:internal/child_process:1143:20)\n' +
        '    at Object.spawnSync (node:child_process:925:24)\n' +
        '    at Object.parse ([Path]:591:39)\n' +
        '    at parseLocalJsonlConversationWithBinding ([Path]:4052:38)\n' +
        '    at async summarizeCodexSessionConversation ([Path]:1318:20)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )
    const withPath = new Error(
      'spawnSync /Applications/Blume.app/Contents/Resources/app.asar.unpacked/harness-parser ENOENT'
    )

    expect(shouldReportConversationRefreshAppError(clean)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
    expect(shouldReportConversationRefreshAppError(withPath)).toBe(false)
  })

  it('does not report harness-parser spawnSync UNKNOWN as a refresh app error', () => {
    const clean = new Error('spawnSync [Path] UNKNOWN')
    const stackInMessage = new Error(
      'Error: spawnSync [Path] UNKNOWN\n' +
        '    at Object.spawnSync (node:internal/child_process:1143:20)\n' +
        '    at Object.spawnSync (node:child_process:925:24)\n' +
        '    at Object.parse ([Path]:591:39)\n' +
        '    at parseClaudeSessionWithBinding ([Path]:3144:38)\n' +
        '    at summarizeClaudeSessionConversation ([Path]:2834:26)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )
    const windows = new Error(
      'spawnSync C:\\Users\\jaska\\AppData\\Local\\Programs\\@blumedesktop\\resources\\app.asar.unpacked\\resources\\harness-parser\\harness-parser.exe UNKNOWN'
    )
    const windowsStack = new Error(
      'Error: spawnSync C:\\Users\\jaska\\AppData\\Local\\Programs\\@blumedesktop\\resources\\app.asar.unpacked\\resources\\harness-parser\\harness-parser.exe UNKNOWN\n' +
        '    at Object.spawnSync (node:internal/child_process:1143:20)\n' +
        '    at Object.spawnSync (node:child_process:925:24)\n' +
        '    at Object.parse ([Path]:591:39)\n' +
        '    at parseClaudeSessionWithBinding ([Path]:2706:38)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )

    expect(shouldReportConversationRefreshAppError(clean)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
    expect(shouldReportConversationRefreshAppError(windows)).toBe(false)
    expect(shouldReportConversationRefreshAppError(windowsStack)).toBe(false)
  })

  it('does not report harness-parser spawnSync EACCES/EPERM as a refresh app error', () => {
    const eacces = new Error('spawnSync [Path] EACCES')
    const eaccesClaudeStack = new Error(
      'Error: spawnSync [Path] EACCES\n' +
        '    at Object.spawnSync (node:internal/child_process:1143:20)\n' +
        '    at Object.spawnSync (node:child_process:925:24)\n' +
        '    at Object.parse ([Path]:591:39)\n' +
        '    at parseClaudeSessionWithBinding ([Path]:3144:38)\n' +
        '    at summarizeClaudeSessionConversation ([Path]:2834:26)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )
    // Codex sibling path — same demotion class as Claude primary.
    const eaccesCodexStack = new Error(
      'Error: spawnSync [Path] EACCES\n' +
        '    at Object.spawnSync (node:internal/child_process:1143:20)\n' +
        '    at Object.spawnSync (node:child_process:925:24)\n' +
        '    at Object.parse ([Path]:591:39)\n' +
        '    at parseLocalJsonlConversationWithBinding ([Path]:4052:38)\n' +
        '    at async summarizeCodexSessionConversation ([Path]:1318:20)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )
    const eaccesUnmasked = new Error(
      'spawnSync /Applications/Blume.app/Contents/Resources/app.asar.unpacked/harness-parser EACCES'
    )
    const eperm = new Error('spawnSync [Path] EPERM')
    const epermStack = new Error(
      'Error: spawnSync [Path] EPERM\n' +
        '    at Object.spawnSync (node:internal/child_process:1143:20)\n' +
        '    at Object.spawnSync (node:child_process:925:24)\n' +
        '    at Object.parse ([Path]:591:39)\n' +
        '    at parseClaudeSessionWithBinding ([Path]:3144:38)\n' +
        '    at summarizeClaudeSessionConversation ([Path]:2834:26)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )
    const epermWindows = new Error(
      'spawnSync C:\\Users\\jaska\\AppData\\Local\\Programs\\@blumedesktop\\resources\\app.asar.unpacked\\resources\\harness-parser\\harness-parser.exe EPERM'
    )

    expect(shouldReportConversationRefreshAppError(eacces)).toBe(false)
    expect(shouldReportConversationRefreshAppError(eaccesClaudeStack)).toBe(false)
    expect(shouldReportConversationRefreshAppError(eaccesCodexStack)).toBe(false)
    expect(shouldReportConversationRefreshAppError(eaccesUnmasked)).toBe(false)
    expect(shouldReportConversationRefreshAppError(eperm)).toBe(false)
    expect(shouldReportConversationRefreshAppError(epermStack)).toBe(false)
    expect(shouldReportConversationRefreshAppError(epermWindows)).toBe(false)
  })

  it('does not report null canonical parser binding as a refresh app error', () => {
    const claude = new Error('Claude canonical parser binding is unavailable.')
    const claudeStack = new Error(
      'Error: Claude canonical parser binding is unavailable.\n' +
        '    at summarizeClaudeSessionConversation ([Path]:3294:17)\n' +
        '    at async Object.iterate ([Path]:3357:24)\n' +
        '    at async runRefreshQueue ([Path]:2542:7)\n' +
        '    at async Object.refreshFromDisk ([Path]:2565:7)\n' +
        '    at async refresh ([Path]:402:5)\n' +
        '    at async handleMessage ([Path]:459:5)'
    )
    const cursor = new Error('Cursor canonical parser unavailable')
    const cursorStack = new Error(
      'Error: Cursor canonical parser unavailable\n' +
        '    at summarizeCursorSessionConversation ([Path]:302:17)\n' +
        '    at async Object.iterate ([Path]:374:24)\n' +
        '    at async runRefreshQueue ([Path]:2542:7)\n' +
        '    at async Object.refreshFromDisk ([Path]:2565:7)'
    )
    const codex = new Error('Codex canonical parser unavailable')
    const codexStack = new Error(
      'Error: Codex canonical parser unavailable\n' +
        '    at summarizeCodexSessionConversation ([Path]:1334:17)\n' +
        '    at Object.iterate ([Path]:1387:21)\n' +
        '    at async [Path]:2487:30\n' +
        '    at async [Path]:2485:9\n' +
        '    at async runRefreshQueue ([Path]:2542:7)\n' +
        '    at async Object.refreshFromDisk ([Path]:2565:7)\n' +
        '    at async refresh ([Path]:402:5)\n' +
        '    at async handleMessage ([Path]:459:5)'
    )

    expect(shouldReportConversationRefreshAppError(claude)).toBe(false)
    expect(shouldReportConversationRefreshAppError(claudeStack)).toBe(false)
    expect(shouldReportConversationRefreshAppError(cursor)).toBe(false)
    expect(shouldReportConversationRefreshAppError(cursorStack)).toBe(false)
    expect(shouldReportConversationRefreshAppError(codex)).toBe(false)
    expect(shouldReportConversationRefreshAppError(codexStack)).toBe(false)
  })

  it('does not report parser-temp cleanup ENOTEMPTY as a refresh app error', () => {
    const masked = new Error("ENOTEMPTY, Directory not empty: [Path] '[Path]'")
    const stackInMessage = new Error(
      "Error: ENOTEMPTY, Directory not empty: [Path] '[Path]'\n" +
        '    at Object.rmSync (node:fs:1222:18)\n' +
        '    at Object.parse ([Path]:625:17)\n' +
        '    at parseLocalJsonlConversationWithBinding ([Path]:4052:38)\n' +
        '    at async Object.refreshFromDisk ([Path]:2531:7)'
    )
    const unmasked = new Error(
      "ENOTEMPTY: directory not empty, rmdir '/tmp/blume-parser-output-abcd'"
    )

    expect(shouldReportConversationRefreshAppError(masked)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
    expect(shouldReportConversationRefreshAppError(unmasked)).toBe(false)
  })

  it('does not report SQLite SQLITE_FULL as a refresh app error', () => {
    const full = new Error('database or disk is full') as Error & { code?: string }
    full.name = 'SqliteError'
    full.code = 'SQLITE_FULL'
    const stackInMessage = new Error(
      'SqliteError: database or disk is full\n' +
        '    at Object.run ([Path]:4747:25)\n' +
        '    at async Object.upsert ([Path]:2450:9)\n' +
        '    at async refreshRecentProjectSetupSummaries ([Path]:226:7)\n' +
        '    at async forwardTelemetry (refreshHost.ts:317:5)'
    )

    expect(shouldReportConversationRefreshAppError(full)).toBe(false)
    expect(shouldReportConversationRefreshAppError(stackInMessage)).toBe(false)
    expect(shouldReportConversationRefreshAppError('database or disk is full')).toBe(false)
  })

  it('still reports unexpected worker infrastructure failures', () => {
    const errors = [
      new ConversationRefreshWorkerUnavailableError('refresh worker exited with work pending'),
      new ConversationRefreshWorkerUnavailableError('failed to spawn refresh worker'),
      new ConversationRefreshWorkerUnavailableError('failed to message refresh worker'),
      new ConversationRefreshWorkerUnavailableError('refresh worker not available'),
      new ConversationRefreshWorkerUnavailableError('conversation refresh worker unavailable'),
      new Error(CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE),
      new Error(CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE),
      new Error(CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE),
      new Error('failed: Claude canonical parser binding is unavailable.'),
      new Error('harness-parser exited 1: panic'),
      new Error('harness-parser exited 101: panic'),
      new Error('harness-parser exited 3221225478: '),
      new Error("ENOENT: no such file or directory, stat '/Users/me/Documents/notes.txt'"),
      new Error('spawn /usr/bin/missing ENOENT'),
      new Error('spawnSync [Path] EIO'),
      new Error('spawnSync /usr/bin/curl EACCES'),
      new Error('spawnSync /usr/bin/curl EPERM'),
      new Error('UNKNOWN'),
      new Error('spawn /usr/bin/missing UNKNOWN'),
      new Error("ENOTEMPTY: directory not empty, rmdir '/Users/me/Documents/notes'"),
      new Error('UNIQUE constraint failed: conversations.id'),
      new Error('database is locked'),
      new Error('attempt to write a readonly database')
    ]

    for (const error of errors) {
      expect(isExpectedConversationRefreshWorkerOperationalError(error)).toBe(false)
      expect(isExpectedConversationRefreshWorkerShutdownError(error)).toBe(false)
      expect(shouldReportConversationRefreshAppError(error)).toBe(true)
    }
  })
})
