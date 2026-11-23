import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const WATCHER = resolve(HERE, '../../src/main/conversations/watch.ts')
const DESKTOP_PACKAGE = resolve(HERE, '../../package.json')

describe('desktop conversation watcher main-thread safety', () => {
  test('uses the responsive native watcher instead of Chokidar FSEvents', () => {
    const source = readFileSync(WATCHER, 'utf8')
    const packageJson = JSON.parse(readFileSync(DESKTOP_PACKAGE, 'utf8')) as {
      dependencies?: Record<string, string>
    }

    expect(source).toContain('watch as fsWatch')
    expect(source).toContain('scheduleRetry(root, recursive, error)')
    expect(source).toContain("queueMicrotask(() => this.emit('error', error))")
    expect(source).not.toContain("from 'chokidar'")
    expect(packageJson.dependencies?.chokidar).toBeUndefined()
  })
})
