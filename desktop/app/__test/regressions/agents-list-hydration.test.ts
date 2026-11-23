import { DatabaseSync } from 'node:sqlite'
import { describe, expect, test } from 'vitest'

import { createDesktopSqliteStorage, type SqlDatabase } from '@blume/storage-sqlite'

function createConversationViewSchema(db: DatabaseSync): void {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE sources (
      id INTEGER PRIMARY KEY,
      kind TEXT NOT NULL,
      path TEXT NOT NULL,
      last_mtime_ms INTEGER,
      last_size INTEGER,
      last_byte_offset INTEGER,
      last_cursor TEXT,
      last_fetched_at INTEGER,
      UNIQUE (kind, path)
    );

    CREATE TABLE projects (
      id INTEGER PRIMARY KEY,
      path TEXT NOT NULL,
      name TEXT NOT NULL,
      git_remote TEXT,
      display_path TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE conversations (
      id INTEGER PRIMARY KEY,
      ref TEXT NOT NULL UNIQUE,
      source TEXT NOT NULL,
      external_id TEXT,
      project_id INTEGER,
      source_id INTEGER,
      workspace TEXT,
      workspace_kind TEXT,
      cwd TEXT,
      branch TEXT,
      entrypoint TEXT,
      parent_thread_id TEXT,
      thread_source TEXT,
      subagent_kind TEXT,
      title TEXT,
      provider_title TEXT,
      title_source TEXT,
      preview TEXT,
      state TEXT NOT NULL,
      last_kind TEXT,
      started_at INTEGER,
      last_activity_ts INTEGER NOT NULL,
      last_activity TEXT,
      dismissed_at INTEGER,
      state_override_turn_position INTEGER,
      ingested_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE user_turns (
      id INTEGER PRIMARY KEY,
      conversation_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      prompt TEXT NOT NULL,
      state TEXT NOT NULL,
      started_at INTEGER,
      ended_at INTEGER
    );

    CREATE TABLE tool_calls (
      id INTEGER PRIMARY KEY,
      conversation_id INTEGER NOT NULL,
      event_id INTEGER,
      tool_use_id TEXT,
      name TEXT NOT NULL,
      input_json TEXT,
      result_text TEXT,
      is_error INTEGER NOT NULL DEFAULT 0,
      started_at_ms INTEGER,
      ended_at_ms INTEGER
    );

    CREATE TABLE todo_lists (
      id INTEGER PRIMARY KEY,
      conversation_id INTEGER NOT NULL,
      user_turn_id INTEGER NOT NULL,
      source_event_id INTEGER,
      source TEXT NOT NULL,
      is_inferred INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE todos (
      id INTEGER PRIMARY KEY,
      list_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      content TEXT NOT NULL,
      state TEXT NOT NULL
    );
  `)
}

describe('agents list hydration', () => {
  test('shared storage batches list hydration and skips user turns unless requested', async () => {
    const db = new DatabaseSync(':memory:')
    createConversationViewSchema(db)
    const insertConversation = db.prepare(`
      INSERT INTO conversations (
        id, ref, source, state, last_activity_ts, ingested_at, created_at
      ) VALUES (?, ?, 'claude', 'running', ?, ?, ?)
    `)
    const insertTurn = db.prepare(`
      INSERT INTO user_turns (
        id, conversation_id, position, prompt, state, started_at
      ) VALUES (?, ?, 0, ?, 'running', ?)
    `)
    const insertToolCall = db.prepare(`
      INSERT INTO tool_calls (
        id, conversation_id, tool_use_id, name, input_json, is_error, started_at_ms
      ) VALUES (?, ?, ?, 'Agent', ?, 0, ?)
    `)

    for (let id = 1; id <= 40; id++) {
      insertConversation.run(id, `claude:${id}`, id, id, id)
      insertTurn.run(id, id, `Prompt ${id}`, id)
      insertToolCall.run(
        id,
        id,
        `agent-${id}`,
        JSON.stringify({ description: `Research ${id}`, prompt: `Research ${id}` }),
        id
      )
    }

    const selectQueries: string[] = []
    const countedDb: SqlDatabase = {
      exec: (sql) => db.exec(sql),
      prepare(sql) {
        if (/^\s*SELECT\b/i.test(sql)) selectQueries.push(sql.replace(/\s+/g, ' ').trim())
        return db.prepare(sql)
      }
    }
    const storage = createDesktopSqliteStorage(countedDb, {
      improveNamespace: () => 'legacy-3-step-workflow'
    })

    const leanRows = await storage.desktopConversations.listConversationViewRecords({
      includeDismissed: true
    })

    expect(leanRows).toHaveLength(40)
    expect(leanRows.every((row) => row.userTurns.length === 0)).toBe(true)
    expect(leanRows.every((row) => row.toolCalls.length === 1)).toBe(true)
    expect(selectQueries).toHaveLength(3)
    expect(selectQueries.every((query) => !query.includes('conversation_id = ?'))).toBe(true)

    selectQueries.length = 0
    const fullRows = await storage.desktopConversations.listConversationViewRecords({
      includeDismissed: true,
      includeUserTurns: true
    })

    expect(fullRows.every((row) => row.userTurns.length === 1)).toBe(true)
    expect(selectQueries).toHaveLength(4)
    expect(selectQueries.every((query) => !query.includes('conversation_id = ?'))).toBe(true)
  })
})
