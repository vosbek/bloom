import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'
import { promisify } from 'node:util'

import { afterEach, describe, expect, test } from 'vitest'

const require = createRequire(import.meta.url)
const execFileAsync = promisify(execFile)
const tempDirectories: string[] = []

afterEach(() => {
  for (const directory of tempDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true })
  }
})

describe('settings SQLite connection boundary', () => {
  test('fails fast at the real adapter while a second connection owns the write lock', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'blume-settings-boundary-'))
    tempDirectories.push(directory)
    const databasePath = join(directory, 'blume.sqlite')
    const electronPath = require('electron') as string
    const viteNodePath = join(dirname(require.resolve('vite-node/package.json')), 'dist', 'cli.mjs')
    const fixturePath = fileURLToPath(
      new URL('./settings-sqlite-boundary.fixture.ts', import.meta.url)
    )

    const { stdout } = await execFileAsync(
      electronPath,
      [viteNodePath, fixturePath, databasePath],
      {
        env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
        timeout: 8_000
      }
    )
    const result = JSON.parse(stdout.trim()) as {
      code?: string
      status: string
      timerElapsedMs: number
    }

    expect(result).toMatchObject({ status: 'rejected', code: 'SQLITE_BUSY' })
    expect(result.timerElapsedMs).toBeLessThan(500)
  }, 10_000)
})
