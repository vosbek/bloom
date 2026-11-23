import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const MAIN_TELEMETRY = resolve(HERE, '../../src/main/telemetry.ts')
const REFRESH_WORKER = resolve(HERE, '../../src/main/conversations/refreshWorker.ts')
const WEB_LAB_FLAG_SOURCE = resolve(HERE, '../../../web-lab/src/usePosthogFeatureFlag.ts')
const RENDERER_POSTHOG = resolve(HERE, '../../src/renderer/src/lib/posthog.ts')

describe('SQLite disk-full PostHog capture wiring', () => {
  test('demotes SQLITE_FULL at captureAppError without capturing exceptions', () => {
    const telemetry = readFileSync(MAIN_TELEMETRY, 'utf8')
    expect(telemetry).toContain("import { isExpectedSqliteDiskFullError } from '@blume/app-core'")
    expect(telemetry).toMatch(
      /export async function captureAppError\([\s\S]*?if \(isExpectedSqliteDiskFullError\(err\)\) \{[\s\S]*?writeAppLog\(\s*'warn'/
    )
    expect(telemetry).toMatch(/if \(isExpectedSqliteDiskFullError\(err\)\) \{[\s\S]*?return/)
  })

  test('project-setup summary refresh stops on SQLITE_FULL instead of posting app-error', () => {
    const worker = readFileSync(REFRESH_WORKER, 'utf8')
    expect(worker).toContain('isExpectedSqliteDiskFullError')
    expect(worker).toContain("name: 'main.setup.project_summary_scan_disk_full'")
    expect(worker).toContain("kind: 'event'")
  })

  test('does not enable PostHog exception capture in the renderer or web-lab', () => {
    expect(readFileSync(RENDERER_POSTHOG, 'utf8')).toContain('capture_exceptions: false')
    expect(readFileSync(WEB_LAB_FLAG_SOURCE, 'utf8')).toContain('capture_exceptions: false')
  })
})
