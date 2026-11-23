import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

import { diffParseCounts } from '@blume/conversations-parser-binding'
import { resolveHarnessParserBinaryPath } from '@blume/conversations-parser-binding/node'

const desktopRoot = fileURLToPath(new URL('../..', import.meta.url))

const base = {
  devAppPath: '/repo/apps/desktop',
  resourcesPath: '/Applications/Blume.app/Contents/Resources',
  platform: 'darwin' as NodeJS.Platform,
  env: {} as NodeJS.ProcessEnv
}

describe('resolveHarnessParserBinaryPath', () => {
  test('HARNESS_PARSER_BIN override wins when it exists', () => {
    const resolved = resolveHarnessParserBinaryPath({
      ...base,
      env: { HARNESS_PARSER_BIN: '/custom/harness-parser' },
      exists: (path) => path === '/custom/harness-parser'
    })
    expect(resolved).toBe('/custom/harness-parser')
  })

  test('dev resolves the built crate binary above the app dir', () => {
    const expected = '/repo/crates/harness-parser/target/release/harness-parser'
    const resolved = resolveHarnessParserBinaryPath({
      ...base,
      exists: (path) => path === expected
    })
    expect(resolved).toBe(expected)
  })

  test('packaged resolves the asarUnpacked resource binary', () => {
    const expected =
      '/Applications/Blume.app/Contents/Resources/app.asar.unpacked/resources/harness-parser/harness-parser'
    const resolved = resolveHarnessParserBinaryPath({
      resourcesPath: base.resourcesPath,
      platform: base.platform,
      env: base.env,
      exists: (path) => path === expected
    })
    expect(resolved).toBe(expected)
  })

  test('win32 uses the .exe binary name', () => {
    const resolved = resolveHarnessParserBinaryPath({
      ...base,
      platform: 'win32',
      exists: () => true
    })
    expect(resolved?.endsWith('harness-parser.exe')).toBe(true)
  })

  test('returns null when no candidate exists', () => {
    const resolved = resolveHarnessParserBinaryPath({ ...base, exists: () => false })
    expect(resolved).toBeNull()
  })
})

describe('packaged harness parser build wiring', () => {
  test('desktop builds prepare the asarUnpacked parser resource', () => {
    const packageJson = JSON.parse(
      readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
    ) as { scripts: Record<string, string> }
    const builderConfig = readFileSync(`${desktopRoot}/electron-builder.yml`, 'utf8')

    expect(packageJson.scripts['prepare:harness-parser']).toContain(
      'scripts/prepare-harness-parser.mjs'
    )
    expect(packageJson.scripts.build).toMatch(/prepare:harness-parser/)
    expect(packageJson.scripts['build:mac']).toMatch(/prepare:harness-parser/)
    expect(packageJson.scripts['build:linux']).toMatch(/prepare:harness-parser/)
    expect(builderConfig).toMatch(/asarUnpack:\n\s+- resources\/\*\*/)
  })

  test('desktop dev prepares the canonical parser before Electron starts', () => {
    const devScript = readFileSync(new URL('../../scripts/dev.mjs', import.meta.url), 'utf8')

    expect(devScript).toContain("execFileSync('pnpm', ['run', 'prepare:harness-parser']")
    const electronSpawn = devScript.indexOf("child = spawn(\n  'electron-vite'")
    expect(electronSpawn).toBeGreaterThanOrEqual(0)
    expect(devScript.indexOf("['run', 'prepare:harness-parser']")).toBeLessThan(electronSpawn)
  })
})

describe('diffParseCounts (Phase 7 parity shadow)', () => {
  const counts = { messages: 4, toolCalls: 1, todos: 2, state: 'finished' }

  test('identical parses produce no diffs', () => {
    expect(diffParseCounts(counts, { ...counts })).toEqual([])
  })

  test('reports each divergent field', () => {
    const diffs = diffParseCounts(counts, { messages: 4, toolCalls: 0, todos: 5, state: 'running' })
    expect(diffs).toHaveLength(3)
    expect(diffs.some((d) => d.startsWith('toolCalls'))).toBe(true)
    expect(diffs.some((d) => d.startsWith('todos'))).toBe(true)
    expect(diffs.some((d) => d.startsWith('state'))).toBe(true)
    expect(diffs.some((d) => d.startsWith('messages'))).toBe(false)
  })
})
