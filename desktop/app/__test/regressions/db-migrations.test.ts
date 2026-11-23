import { describe, expect, test } from 'vitest'
import {
  CURRENT_DESKTOP_SCHEMA_VERSION,
  runDesktopMigration,
  runDesktopMigrations
} from '@blume/storage-sqlite'

const CURRENT_SCHEMA_VERSION = String(CURRENT_DESKTOP_SCHEMA_VERSION)

interface PreparedStatement {
  get: (...args: unknown[]) => unknown
  run: (...args: unknown[]) => unknown
}

interface FakeConversationRow {
  title: string | null
  title_source: string | null
  provider_title: string | null
}

class FakeMigrationDb {
  tables = new Set(['meta'])
  indexes = new Set<string>()
  columnsByTable = new Map<string, Set<string>>([
    ['app_usage_intervals', new Set<string>()],
    ['conversations', new Set<string>()]
  ])
  conversationRows: FakeConversationRow[] = []
  schemaVersion = '6'

  addColumn(table: string, column: string): void {
    const columns = this.columnsByTable.get(table) ?? new Set<string>()
    if (columns.has(column)) throw new Error(`duplicate column name: ${column}`)
    columns.add(column)
    this.columnsByTable.set(table, columns)
  }

  hasColumn(table: string, column: string): boolean {
    return this.columnsByTable.get(table)?.has(column) ?? false
  }

  prepare(sql: string): PreparedStatement {
    if (sql.includes("sqlite_master WHERE type = 'table' AND name = 'meta'")) {
      return {
        get: () => ({ name: 'meta' }),
        run: () => undefined
      }
    }
    if (sql.includes("sqlite_master WHERE type = 'table' AND name = ?")) {
      return {
        get: (table: unknown) =>
          typeof table === 'string' && this.tables.has(table) ? { name: table } : undefined,
        run: () => undefined
      }
    }
    if (sql.includes('SELECT value FROM meta WHERE key = ?')) {
      return {
        get: () => ({ value: this.schemaVersion }),
        run: () => undefined
      }
    }
    if (sql.includes('INSERT INTO meta')) {
      return {
        get: () => undefined,
        run: (_key: unknown, value: unknown) => {
          this.schemaVersion = String(value)
        }
      }
    }
    throw new Error(`Unexpected SQL: ${sql}`)
  }

  exec(sql: string): void {
    if (/IF NOT EXISTS\s+IF NOT EXISTS/.test(sql)) {
      throw new Error(`Invalid duplicate IF NOT EXISTS in SQL: ${sql}`)
    }
    for (const createTable of sql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)/g)) {
      this.tables.add(createTable[1])
      if (!this.columnsByTable.has(createTable[1])) {
        this.columnsByTable.set(createTable[1], new Set<string>())
      }
    }
    for (const createIndex of sql.matchAll(
      /CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)/g
    )) {
      this.indexes.add(createIndex[1])
    }
    if (sql.includes('CREATE TABLE IF NOT EXISTS app_usage_intervals')) {
      this.tables.add('app_usage_intervals')
    }
    if (sql.includes('CREATE INDEX IF NOT EXISTS idx_app_usage_intervals_unsent')) {
      this.indexes.add('idx_app_usage_intervals_unsent')
    }
    if (sql.includes('CREATE INDEX IF NOT EXISTS idx_app_usage_intervals_week')) {
      this.indexes.add('idx_app_usage_intervals_week')
    }
    for (const addColumn of sql.matchAll(/ALTER TABLE (\w+) ADD COLUMN (\w+)/g)) {
      const [, table, column] = addColumn
      this.addColumn(table, column)
    }
    if (sql.includes('UPDATE conversations') && sql.includes('SET provider_title = title')) {
      for (const row of this.conversationRows) {
        if (row.title_source === 'provider' && row.provider_title === null) {
          row.provider_title = row.title
        }
      }
    }
  }

  pragma(sql: string): unknown {
    const tableInfo = sql.match(/table_info\('([^']+)'\)/)
    if (tableInfo) {
      return Array.from(this.columnsByTable.get(tableInfo[1]) ?? [], (name) => ({ name }))
    }
    return undefined
  }

  transaction<T>(fn: () => T): () => T {
    return fn
  }
}

describe('database migrations', () => {
  test('fake migration DB extracts guarded table and index names', () => {
    const db = new FakeMigrationDb()

    db.exec(`
      CREATE TABLE IF NOT EXISTS guarded_table (id INTEGER);
      CREATE INDEX IF NOT EXISTS guarded_index ON guarded_table(id);
      CREATE UNIQUE INDEX IF NOT EXISTS guarded_unique_index ON guarded_table(id);
    `)

    expect(db.tables.has('guarded_table')).toBe(true)
    expect(db.tables.has('IF')).toBe(false)
    expect(db.indexes.has('guarded_index')).toBe(true)
    expect(db.indexes.has('guarded_unique_index')).toBe(true)
    expect(db.indexes.has('IF')).toBe(false)
  })

  test('repair app usage table when schema version 6 was already recorded', () => {
    const db = new FakeMigrationDb()

    runDesktopMigrations(db as never)

    expect(db.tables.has('app_usage_intervals')).toBe(true)
    expect(db.indexes.has('idx_app_usage_intervals_unsent')).toBe(true)
    expect(db.indexes.has('idx_app_usage_intervals_week')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_pinned_seconds')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_pinned_expanded_seconds')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_regular_expanded_seconds')).toBe(
      true
    )
    expect(db.hasColumn('conversations', 'parent_thread_id')).toBe(true)
    expect(db.hasColumn('conversations', 'thread_source')).toBe(true)
    expect(db.hasColumn('conversations', 'subagent_kind')).toBe(true)
    expect(db.hasColumn('conversations', 'provider_title')).toBe(true)
    expect(db.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
  })

  test('app usage repair remains idempotent when table already exists', () => {
    const db = new FakeMigrationDb()
    db.tables.add('app_usage_intervals')
    db.indexes.add('idx_app_usage_intervals_unsent')
    db.indexes.add('idx_app_usage_intervals_week')

    runDesktopMigrations(db as never)

    expect(db.tables.has('app_usage_intervals')).toBe(true)
    expect(db.indexes.has('idx_app_usage_intervals_unsent')).toBe(true)
    expect(db.indexes.has('idx_app_usage_intervals_week')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_pinned_seconds')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_pinned_expanded_seconds')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_regular_expanded_seconds')).toBe(
      true
    )
    expect(db.hasColumn('conversations', 'parent_thread_id')).toBe(true)
    expect(db.hasColumn('conversations', 'thread_source')).toBe(true)
    expect(db.hasColumn('conversations', 'subagent_kind')).toBe(true)
    expect(db.hasColumn('conversations', 'provider_title')).toBe(true)
    expect(db.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
  })

  test('migration 8 adds visible mode columns after app usage repair', () => {
    const db = new FakeMigrationDb()
    db.schemaVersion = '7'
    db.tables.add('app_usage_intervals')
    db.indexes.add('idx_app_usage_intervals_unsent')
    db.indexes.add('idx_app_usage_intervals_week')

    runDesktopMigrations(db as never)

    expect(db.hasColumn('app_usage_intervals', 'window_visible_pinned_seconds')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_pinned_expanded_seconds')).toBe(true)
    expect(db.hasColumn('app_usage_intervals', 'window_visible_regular_expanded_seconds')).toBe(
      true
    )
    expect(db.hasColumn('conversations', 'parent_thread_id')).toBe(true)
    expect(db.hasColumn('conversations', 'thread_source')).toBe(true)
    expect(db.hasColumn('conversations', 'subagent_kind')).toBe(true)
    expect(db.hasColumn('conversations', 'provider_title')).toBe(true)
    expect(db.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
  })

  test('migration 8 skips visible mode columns that already exist', () => {
    const db = new FakeMigrationDb()
    db.schemaVersion = '7'
    db.tables.add('app_usage_intervals')
    db.indexes.add('idx_app_usage_intervals_unsent')
    db.indexes.add('idx_app_usage_intervals_week')
    db.addColumn('app_usage_intervals', 'window_visible_pinned_seconds')
    db.addColumn('app_usage_intervals', 'window_visible_pinned_expanded_seconds')
    db.addColumn('app_usage_intervals', 'window_visible_regular_expanded_seconds')

    expect(() => runDesktopMigrations(db as never)).not.toThrow()
    expect(db.hasColumn('conversations', 'parent_thread_id')).toBe(true)
    expect(db.hasColumn('conversations', 'thread_source')).toBe(true)
    expect(db.hasColumn('conversations', 'subagent_kind')).toBe(true)
    expect(db.hasColumn('conversations', 'provider_title')).toBe(true)
    expect(db.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
  })

  test('current schema repair restores missing insights tables and columns', () => {
    const db = new FakeMigrationDb()
    db.schemaVersion = CURRENT_SCHEMA_VERSION
    db.tables.add('conversations')
    db.columnsByTable.set(
      'conversations',
      new Set(['id', 'title', 'title_source', 'parent_thread_id', 'thread_source'])
    )

    runDesktopMigrations(db as never)

    expect(db.tables.has('insight_runs')).toBe(true)
    expect(db.tables.has('signals')).toBe(true)
    expect(db.tables.has('suggestions')).toBe(true)
    expect(db.tables.has('suggestion_clusters')).toBe(true)
    expect(db.tables.has('project_setup_summaries')).toBe(true)
    expect(db.tables.has('insight_harness_calls')).toBe(true)
    expect(db.tables.has('insight_agent_conversation_reads')).toBe(true)
    expect(db.hasColumn('suggestions', 'run_id')).toBe(true)
    expect(db.hasColumn('insight_runs', 'usage_json')).toBe(true)
    expect(db.hasColumn('signals', 'tags_json')).toBe(true)
    expect(db.hasColumn('signal_clusters', 'tags_json')).toBe(true)
    expect(db.hasColumn('signals', 'creator_agent_version_id')).toBe(true)
    expect(db.hasColumn('signal_clusters', 'creator_agent_version_id')).toBe(true)
    expect(db.hasColumn('suggestions', 'creator_agent_version_id')).toBe(true)
    expect(db.indexes.has('idx_suggestions_run')).toBe(true)
    expect(db.indexes.has('idx_signals_creator_agent_version_id')).toBe(true)
    expect(db.indexes.has('idx_signal_clusters_creator_agent_version_id')).toBe(true)
    expect(db.indexes.has('idx_suggestions_creator_agent_version_id')).toBe(true)
    expect(db.indexes.has('idx_suggestion_clusters_cluster')).toBe(true)
    expect(db.hasColumn('conversations', 'provider_title')).toBe(true)
    expect(db.hasColumn('conversations', 'subagent_kind')).toBe(true)
  })

  test('current schema repair backfills existing provider title column', () => {
    const db = new FakeMigrationDb()
    db.schemaVersion = CURRENT_SCHEMA_VERSION
    db.tables.add('conversations')
    db.columnsByTable.set(
      'conversations',
      new Set(['id', 'title', 'title_source', 'provider_title'])
    )
    db.conversationRows = [
      { title: 'Provider title', title_source: 'provider', provider_title: null },
      { title: 'Existing title', title_source: 'provider', provider_title: 'Existing provider' },
      { title: 'User title', title_source: 'user', provider_title: null }
    ]

    runDesktopMigrations(db as never)

    expect(db.conversationRows[0].provider_title).toBe('Provider title')
    expect(db.conversationRows[1].provider_title).toBe('Existing provider')
    expect(db.conversationRows[2].provider_title).toBeNull()
  })

  test('migration runner rejects empty SQL migrations', () => {
    const db = new FakeMigrationDb()

    expect(() =>
      runDesktopMigration(db as never, { version: 9, name: 'empty-sql', sql: '   ' } as never)
    ).toThrow('Invalid migration 9 (empty-sql)')
  })
})
