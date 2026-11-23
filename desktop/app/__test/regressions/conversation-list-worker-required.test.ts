import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const DESKTOP = resolve(HERE, '../..')
const SRC_MAIN = resolve(DESKTOP, 'src/main')
const CONVERSATION_RUNTIME = resolve(SRC_MAIN, 'conversations/index.ts')
const LIST_HOST = resolve(SRC_MAIN, 'conversations/listHost.ts')
const LIST_WORKER = resolve(SRC_MAIN, 'conversations/listWorker.ts')
const MAIN_INDEX = resolve(SRC_MAIN, 'index.ts')
const VITE_CONFIG = resolve(DESKTOP, 'electron.vite.config.ts')

const FORBIDDEN_EXTERNALS = new Set(['electron', '@electron-toolkit/utils'])
const FORBIDDEN_FILES = new Set(
  [
    'telemetry.ts',
    'perf.ts',
    'settingsStore.ts',
    'metaStore.ts',
    'blume-home.ts',
    'db/index.ts',
    'db/storage.ts',
    'conversations/index.ts',
    'conversations/listHost.ts',
    'conversations/refreshHost.ts',
    'conversations/providerHost.ts',
    'conversations/parserBinding.ts',
    'conversations/watch.ts'
  ].map((rel) => resolve(SRC_MAIN, rel))
)

const IMPORT_RE = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g

function walkImportGraph(entry: string): { files: Set<string>; externals: Set<string> } {
  const files = new Set<string>()
  const externals = new Set<string>()
  const queue = [entry]
  while (queue.length > 0) {
    const file = queue.pop()
    if (!file || files.has(file)) continue
    files.add(file)
    for (const match of readFileSync(file, 'utf8').matchAll(IMPORT_RE)) {
      const spec = match[1]
      if (!spec.startsWith('.')) {
        externals.add(spec)
        continue
      }
      const base = resolve(dirname(file), spec)
      const resolved = [base, `${base}.ts`, resolve(base, 'index.ts')].find(
        (candidate) => candidate.endsWith('.ts') && existsSync(candidate)
      )
      if (resolved) queue.push(resolved)
    }
  }
  return { files, externals }
}

describe('conversation view list stays off Electron main', () => {
  test('db:conversations:listForView is served by the conversation list utility process', () => {
    const runtime = readFileSync(CONVERSATION_RUNTIME, 'utf8')
    const host = readFileSync(LIST_HOST, 'utf8')

    expect(runtime).toContain('return listConversationsForViewViaWorker(opts)')
    expect(runtime).toContain('return getTranscriptViaWorker(ref, opts)')
    expect(runtime).not.toContain('coreConversationRuntime.getTranscript(')
    expect(runtime).not.toContain('coreConversationRuntime.listConversationsForView')
    expect(host).toContain("utilityProcess.fork(join(__dirname, 'listWorker.js')")
    // No main-process fallback: the host never opens SQLite, reaches main storage or runs the read.
    for (const forbidden of [
      'getStorage',
      'openDesktopSqlite',
      'listConversationViewRecords',
      'loadConversationListItemsForView',
      'gitBranchLabel',
      'better-sqlite3'
    ]) {
      expect(host).not.toContain(forbidden)
    }
  })

  test('the worker is Electron-free, query-only and owns the branch-label filesystem reads', () => {
    const worker = readFileSync(LIST_WORKER, 'utf8')
    const { files, externals } = walkImportGraph(LIST_WORKER)

    expect([...externals].filter((spec) => FORBIDDEN_EXTERNALS.has(spec))).toEqual([])
    expect([...files].filter((file) => FORBIDDEN_FILES.has(file))).toEqual([])
    expect(worker).toContain('openDesktopSqliteConversationReads(')
    expect(worker).not.toContain('openDesktopSqliteStorage')
    expect(worker).toContain('loadConversationListItemsForView(')
    expect(worker).toContain('gitBranchLabel')

    const sqliteStorage = readFileSync(resolve(SRC_MAIN, 'db/sqliteStorage.ts'), 'utf8')
    const opener = sqliteStorage.slice(
      sqliteStorage.indexOf('export function openDesktopSqliteConversationReads'),
      sqliteStorage.indexOf('export function openDesktopSignalAnalyticsStorage')
    )
    expect(opener).toContain('readonly: true')
    expect(opener).toContain('fileMustExist: true')
    expect(opener).toContain("db.pragma('query_only = ON')")
    expect(opener).not.toContain('runDesktopMigrations')
    expect(opener).not.toContain('journal_mode = WAL')
  })

  test('the worker is built as its own entry and stopped on quit', () => {
    expect(readFileSync(VITE_CONFIG, 'utf8')).toContain(
      "listWorker: resolve('src/main/conversations/listWorker.ts')"
    )
    const main = readFileSync(MAIN_INDEX, 'utf8')
    const quit = main.slice(main.indexOf('prepareNativeWindowsForQuit'))
    expect(quit).toContain('disposeConversationListWorker()')
  })
})
