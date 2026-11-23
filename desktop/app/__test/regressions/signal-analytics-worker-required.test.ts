import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')

describe('signal analytics process boundary', () => {
  test('keeps SQLite aggregation in a bundled utility process', () => {
    const host = readFileSync(resolve(SRC_MAIN, 'signalAnalyticsHost.ts'), 'utf8')
    const worker = readFileSync(resolve(SRC_MAIN, 'signalAnalyticsWorker.ts'), 'utf8')
    const sqliteAdapter = readFileSync(resolve(SRC_MAIN, 'db/sqliteStorage.ts'), 'utf8')
    const sharedAdapter = readFileSync(
      resolve(HERE, '../../../../packages/storage/sqlite/src/desktopSignalAnalytics.ts'),
      'utf8'
    )
    const build = readFileSync(resolve(HERE, '../../electron.vite.config.ts'), 'utf8')

    expect(host).toContain('utilityProcess.fork')
    expect(host).not.toContain("from 'better-sqlite3'")
    expect(worker).not.toContain("from 'better-sqlite3'")
    expect(worker).toContain('aggregateStoredSignalAnalytics')
    expect(worker).toContain('openDesktopSignalAnalyticsStorage')
    expect(sqliteAdapter).toContain("from 'better-sqlite3'")
    expect(sqliteAdapter).toContain('createDesktopSignalAnalyticsStore')
    expect(sharedAdapter).not.toContain("from 'electron'")
    expect(sharedAdapter).toContain('WHERE type IN (?, ?, ?)')
    expect(sharedAdapter).not.toContain('kind IN (?, ?, ?)')
    expect(build).toContain("signalAnalyticsWorker: resolve('src/main/signalAnalyticsWorker.ts')")
  })

  test('keeps Web Lab on the shared runner capability instead of an empty host stub', () => {
    const webHost = readFileSync(
      resolve(HERE, '../../../../packages/sidecar/host-web/src/webHost.ts'),
      'utf8'
    )
    const runner = readFileSync(
      resolve(HERE, '../../../../services/interactive-runner/src/server.ts'),
      'utf8'
    )
    expect(webHost).toContain('client.getSignalAnalytics(sessionId, input)')
    expect(webHost).not.toContain("syncStatus: 'local-only' as const")
    expect(runner).toContain("parts[3] === 'signal-analytics'")
    expect(runner).toContain('aggregateStoredSignalAnalytics(session.storage.signalAnalytics, hosted)')
  })

  test('uploads only aggregate DTOs and never source content', () => {
    const host = readFileSync(resolve(SRC_MAIN, 'signalAnalyticsHost.ts'), 'utf8')
    expect(host).toContain('daily: local.daily')
    expect(host).not.toContain('evidenceJson')
    expect(host).not.toContain('conversationId')
  })

  test('gates PostHog app-error capture for expected worker operational failures', () => {
    const host = readFileSync(resolve(SRC_MAIN, 'signalAnalyticsHost.ts'), 'utf8')
    const main = readFileSync(resolve(SRC_MAIN, 'index.ts'), 'utf8')
    const lifecycle = readFileSync(resolve(SRC_MAIN, 'nativeLifecycle.ts'), 'utf8')

    expect(host).toContain('shouldReportSignalAnalyticsAppError')
    expect(host).toContain('SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE')
    expect(host).toContain('SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE')
    expect(host).toContain('SignalAnalyticsWorkerUnavailableError')
    expect(host).toContain(
      'new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE)'
    )
    expect(host).toContain(
      'new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE)'
    )
    expect(host).toContain(
      'new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE)'
    )
    expect(host).toContain(
      'new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE)'
    )
    expect(host).toMatch(
      /EXPECTED_SIGNAL_ANALYTICS_WORKER_OPERATIONAL_MESSAGES = new Set\(\[[\s\S]*?SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE/
    )
    expect(host).toContain('requestLocalSignalAnalytics(signals, true)')
    expect(host).toContain('isSignalAnalyticsWorkerExitedError')
    expect(host).not.toContain("new Error('signal analytics worker timed out')")
    expect(host).not.toContain("new Error('signal analytics worker disposed')")
    expect(host).not.toContain("new Error('signal analytics worker exited')")
    expect(host).not.toContain("new Error('signal analytics worker unavailable')")

    expect(main).toContain('if (!shouldReportSignalAnalyticsAppError(error)) return')
    expect(lifecycle).toContain('isExpectedSignalAnalyticsWorkerShutdownError')
  })
})
