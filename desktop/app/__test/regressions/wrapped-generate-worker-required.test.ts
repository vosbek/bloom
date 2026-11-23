import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')
const WORKER_HOST = resolve(SRC_MAIN, 'wrapped/generateHost.ts')
const SCHEDULER = resolve(SRC_MAIN, 'wrapped/scheduler.ts')
const MAIN_ENTRY = resolve(SRC_MAIN, 'index.ts')

describe('desktop wrapped generate worker reporting policy', () => {
  test('gates expected operational unavailability before PostHog app-error capture', () => {
    const host = readFileSync(WORKER_HOST, 'utf8')
    const scheduler = readFileSync(SCHEDULER, 'utf8')
    const main = readFileSync(MAIN_ENTRY, 'utf8')

    expect(host).toContain('shouldReportWrappedGenerateAppError')
    expect(host).toContain('WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE')
    expect(host).toContain('WRAPPED_GENERATE_WORKER_DISPOSED_MESSAGE')
    expect(host).toContain('WRAPPED_GENERATE_WORKER_CIRCUIT_BREAKER_MESSAGE')
    expect(host).toContain('if (shouldReportWrappedGenerateAppError(error))')
    expect(host).toContain("captureAppError('main.wrapped.generate_worker_unavailable'")
    expect(host).toContain("captureAppError('main.wrapped.generate_worker_spawn'")
    expect(scheduler).toContain('if (!shouldReportWrappedGenerateAppError(error)) return')
    expect(main).toContain('if (!shouldReportWrappedGenerateAppError(error)) return')
  })
})
