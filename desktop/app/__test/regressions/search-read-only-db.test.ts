import { readFileSync } from 'fs'
import { describe, expect, it } from 'vitest'

const sqliteStorageSource = readFileSync(
  new URL('../../src/main/db/sqliteStorage.ts', import.meta.url),
  'utf8'
)
const searchWorkerSource = readFileSync(
  new URL('../../src/main/search/searchWorker.ts', import.meta.url),
  'utf8'
)
const desktopSearchSource = readFileSync(
  new URL('../../../../packages/storage/sqlite/src/desktopSearch.ts', import.meta.url),
  'utf8'
)

describe('desktop search database connection', () => {
  it('uses a dedicated query-only opener without migrations or WAL mutation', () => {
    const searchOpener = sqliteStorageSource.slice(
      sqliteStorageSource.indexOf('export function openDesktopSqliteSearch')
    )

    expect(searchOpener).toContain('readonly: true')
    expect(searchOpener).toContain('fileMustExist: true')
    expect(searchOpener).toContain("db.pragma('query_only = ON')")
    expect(searchOpener).not.toContain('runDesktopMigrations')
    expect(searchOpener).not.toContain('journal_mode = WAL')
    expect(searchWorkerSource).toContain('openDesktopSqliteSearch(dbPath)')
    expect(searchWorkerSource).not.toContain('openDesktopSqliteStorage')
  })

  it('reports database-open failures and reuses one connection across queries', () => {
    const openIndex = searchWorkerSource.indexOf('handle = openDesktopSqliteSearch')
    const runIndex = searchWorkerSource.indexOf('async function runSearch')
    const tryIndex = searchWorkerSource.indexOf('try {', runIndex)
    const callIndex = searchWorkerSource.indexOf('searchFor(request.dbPath)', runIndex)
    const catchIndex = searchWorkerSource.indexOf('catch (error)', runIndex)

    expect(openIndex).toBeGreaterThan(-1)
    expect(callIndex).toBeGreaterThan(tryIndex)
    expect(catchIndex).toBeGreaterThan(callIndex)
    // Long-lived: the worker no longer exits after each query.
    expect(searchWorkerSource).not.toContain('process.exit')
    expect(searchWorkerSource).toContain('handlePath === dbPath')
  })

  it('keeps search candidates independent of page size and tolerates null operation JSON', () => {
    expect(desktopSearchSource).toContain('Math.max(limit + 1, 200)')
    expect(desktopSearchSource).toContain("coalesce(operations_json, '')")
  })
})
