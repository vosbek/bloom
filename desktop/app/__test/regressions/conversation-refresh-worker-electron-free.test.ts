import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')
const WORKER_ENTRY = resolve(SRC_MAIN, 'conversations/refreshWorker.ts')

const FORBIDDEN_EXTERNALS = new Set(['electron', '@electron-toolkit/utils'])
const FORBIDDEN_FILES = new Set(
  [
    'telemetry.ts',
    'perf.ts',
    'settingsStore.ts',
    'metaStore.ts',
    'blume-home.ts',
    'legacyOverrides.ts',
    'db/index.ts',
    'db/storage.ts',
    'conversations/index.ts',
    'conversations/providerHost.ts',
    'conversations/parserBinding.ts',
    'conversations/watch.ts',
    'conversations/resume.ts'
  ].map((rel) => resolve(SRC_MAIN, rel))
)

const IMPORT_RE = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g

function resolveRelative(fromFile: string, spec: string): string | null {
  const base = resolve(dirname(fromFile), spec)
  for (const candidate of [base, `${base}.ts`, resolve(base, 'index.ts')]) {
    if (candidate.endsWith('.ts') && existsSync(candidate)) return candidate
  }
  return null
}

function walkImportGraph(entry: string): { files: Set<string>; externals: Set<string> } {
  const files = new Set<string>()
  const externals = new Set<string>()
  const queue = [entry]
  while (queue.length > 0) {
    const file = queue.pop()
    if (!file || files.has(file)) continue
    files.add(file)
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(IMPORT_RE)) {
      const spec = match[1]
      if (spec.startsWith('.')) {
        const resolved = resolveRelative(file, spec)
        if (resolved) queue.push(resolved)
      } else {
        externals.add(spec)
      }
    }
  }
  return { files, externals }
}

describe('conversation refresh worker import graph', () => {
  test('stays independent from Electron and desktop main process adapters', () => {
    const { files, externals } = walkImportGraph(WORKER_ENTRY)

    expect(
      [...externals].filter((spec) => FORBIDDEN_EXTERNALS.has(spec)),
      'forbidden external imports in refresh worker graph'
    ).toEqual([])
    expect(
      [...files].filter((file) => FORBIDDEN_FILES.has(file)),
      'forbidden desktop main modules in refresh worker graph'
    ).toEqual([])
    expect(files.has(WORKER_ENTRY)).toBe(true)
  })
})
