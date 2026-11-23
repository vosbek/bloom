import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const RENDERER_SRC = resolve(HERE, '../../src/renderer/src')
const MAIN_SOURCE = readFileSync(resolve(RENDERER_SRC, 'main.tsx'), 'utf8')
const POSTHOG_SOURCE = readFileSync(resolve(RENDERER_SRC, 'lib/posthog.ts'), 'utf8')
const WEB_LAB_FLAG_SOURCE = readFileSync(
  resolve(HERE, '../../../web-lab/src/usePosthogFeatureFlag.ts'),
  'utf8'
)

describe('resize observer PostHog capture wiring', () => {
  test('filters ResizeObserver loop errors at captureAppError and the window error handler', () => {
    expect(POSTHOG_SOURCE).toContain("import { isResizeObserverLoopError } from './resizeObserverErrorPolicy'")
    expect(POSTHOG_SOURCE).toMatch(
      /export function captureAppError\([\s\S]*?if \(isResizeObserverLoopError\(err\)\) return/
    )
    expect(POSTHOG_SOURCE).toContain('capture_exceptions: false')

    expect(MAIN_SOURCE).toContain(
      "import { isResizeObserverLoopError } from './lib/resizeObserverErrorPolicy'"
    )
    expect(MAIN_SOURCE).toContain('if (isResizeObserverLoopError(error)) return')
    expect(MAIN_SOURCE).not.toContain('renderer.resize-observer-loop')
    expect(MAIN_SOURCE).not.toContain('captureResizeObserverDiagnostic')
  })

  test('does not enable PostHog exception capture in web-lab', () => {
    expect(WEB_LAB_FLAG_SOURCE).toContain('capture_exceptions: false')
  })
})
