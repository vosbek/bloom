import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const MAIN_SOURCE = readFileSync(resolve(HERE, '../../src/renderer/src/main.tsx'), 'utf8')

describe('renderer bootstrap preload guard', () => {
  test('checks the Electron bridge before initializing PostHog and does not retry on failure', () => {
    const bootstrapStart = MAIN_SOURCE.indexOf('async function bootstrap()')
    const missingPreloadGuard = MAIN_SOURCE.indexOf('if (!window.api)', bootstrapStart)
    const posthogInitialization = MAIN_SOURCE.indexOf('await initPosthog(', bootstrapStart)
    const failureHandler = MAIN_SOURCE.slice(MAIN_SOURCE.indexOf('void bootstrap().catch'))

    expect(bootstrapStart).toBeGreaterThanOrEqual(0)
    expect(missingPreloadGuard).toBeGreaterThan(bootstrapStart)
    expect(posthogInitialization).toBeGreaterThan(missingPreloadGuard)
    expect(failureHandler).not.toContain('initPosthog(')
  })

  test('refreshes the PostHog identity when the desktop account changes', () => {
    expect(MAIN_SOURCE).toMatch(
      /electronSidecarHost\.account\.onChanged\(\(\) => \{\s*void syncPosthogIdentity\(\)/
    )
  })
})
