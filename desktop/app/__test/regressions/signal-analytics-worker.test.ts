import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { afterEach, describe, expect, test } from 'vitest'

import { aggregateStoredSignalAnalytics } from '@blume/app-core/features/improve/signalAnalytics'
import { createDesktopSignalAnalyticsStore } from '@blume/storage-sqlite'

const directories: string[] = []

afterEach(() => {
  for (const directory of directories.splice(0)) {
    rmSync(directory, { recursive: true, force: true })
  }
})

describe('signal analytics SQLite worker storage adapter', () => {
  test('uses real signal types and origin user-turn positions without classifying legacy rows', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'blume-signal-analytics-'))
    directories.push(directory)
    const path = join(directory, 'blume.sqlite')
    const db = new DatabaseSync(path)
    const day = Date.UTC(2026, 6, 17, 12)
    db.exec(`
      CREATE TABLE conversations (
        id INTEGER PRIMARY KEY,
        started_at INTEGER,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE user_turns (
        id INTEGER PRIMARY KEY,
        conversation_id INTEGER NOT NULL,
        position INTEGER NOT NULL,
        started_at INTEGER,
        ended_at INTEGER
      );
      CREATE TABLE events (
        id INTEGER PRIMARY KEY,
        user_turn_id INTEGER NOT NULL,
        timestamp_ms INTEGER
      );
      CREATE TABLE signals (
        id INTEGER PRIMARY KEY,
        conversation_id INTEGER NOT NULL,
        type TEXT,
        kind TEXT NOT NULL,
        evidence_json TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE insight_agent_conversation_reads (
        conversation_id INTEGER NOT NULL,
        agent_version_id TEXT NOT NULL,
        conversation_activity_ts INTEGER NOT NULL,
        PRIMARY KEY (conversation_id, agent_version_id)
      );
      CREATE TABLE insight_runs (
        id INTEGER PRIMARY KEY,
        conversation_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        stage TEXT,
        finished_at INTEGER
      );
    `)
    db.prepare('INSERT INTO conversations (id, started_at, created_at) VALUES (?, ?, ?)').run(
      7,
      day,
      day
    )
    db.prepare('INSERT INTO conversations (id, started_at, created_at) VALUES (?, ?, ?)').run(
      8,
      day + 2_000,
      day + 2_000
    )
    const insertTurn = db.prepare(
      'INSERT INTO user_turns (id, conversation_id, position, started_at) VALUES (?, ?, ?, ?)'
    )
    insertTurn.run(1, 7, 0, day)
    insertTurn.run(2, 7, 1, day + 1_000)
    insertTurn.run(3, 8, 0, null)
    insertTurn.run(4, 8, 1, day + 4_000)
    db.prepare('INSERT INTO events (user_turn_id, timestamp_ms) VALUES (?, ?)').run(3, day + 2_000)
    const markProcessed = db.prepare(
      `INSERT INTO insight_agent_conversation_reads
       (conversation_id, agent_version_id, conversation_activity_ts) VALUES (?, ?, ?)`
    )
    markProcessed.run(7, 'agent-v1', day + 1_000)
    markProcessed.run(8, 'agent-v1', day + 2_000)
    const insertRun = db.prepare(
      `INSERT INTO insight_runs (id, conversation_id, status, stage, finished_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    insertRun.run(1, 7, 'succeeded', 'done', day + 1_000)
    insertRun.run(2, 8, 'succeeded', 'done', day + 2_000)
    const insertSignal = db.prepare(
      `INSERT INTO signals (id, conversation_id, type, kind, evidence_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    insertSignal.run(1, 7, 'correction', 'workflow', '[{"turn":0,"role":"user"}]', day)
    insertSignal.run(2, 7, 'frustration', 'domain', '[{"turn":0,"role":"user"}]', day)
    insertSignal.run(3, 8, 'steering', 'preference', '[{"turn":0,"role":"user"}]', day)
    insertSignal.run(4, 7, null, 'workflow', '[{"turn":1,"role":"user"}]', day)

    const summary = await aggregateStoredSignalAnalytics(
      createDesktopSignalAnalyticsStore(db as never)
    )
    db.close()

    expect(summary.totalTurns).toBe(3)
    expect(summary.turnsWithAnySignal).toBe(2)
    expect(summary.signalCounts).toEqual({ correction: 1, steering: 1, frustration: 1 })
    expect(summary.affectedTurnCounts).toEqual({ correction: 1, steering: 1, frustration: 1 })
  })

  test('excludes turns from conversations the pipeline has not processed', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'blume-signal-analytics-'))
    directories.push(directory)
    const path = join(directory, 'blume.sqlite')
    const db = new DatabaseSync(path)
    const day = Date.UTC(2026, 6, 17, 12)
    db.exec(`
      CREATE TABLE conversations (id INTEGER PRIMARY KEY, started_at INTEGER, created_at INTEGER);
      CREATE TABLE user_turns (
        id INTEGER PRIMARY KEY, conversation_id INTEGER, position INTEGER,
        started_at INTEGER, ended_at INTEGER
      );
      CREATE TABLE events (id INTEGER PRIMARY KEY, user_turn_id INTEGER, timestamp_ms INTEGER);
      CREATE TABLE signals (
        id INTEGER PRIMARY KEY, conversation_id INTEGER, type TEXT, evidence_json TEXT,
        created_at INTEGER
      );
      CREATE TABLE insight_agent_conversation_reads (
        conversation_id INTEGER NOT NULL, agent_version_id TEXT NOT NULL,
        conversation_activity_ts INTEGER NOT NULL,
        PRIMARY KEY (conversation_id, agent_version_id)
      );
      CREATE TABLE insight_runs (
        id INTEGER PRIMARY KEY, conversation_id INTEGER NOT NULL,
        status TEXT NOT NULL, stage TEXT, finished_at INTEGER
      );
      INSERT INTO conversations VALUES (1, ${day}, ${day});
      INSERT INTO conversations VALUES (2, ${day}, ${day});
      INSERT INTO user_turns VALUES (1, 1, 0, ${day}, ${day});
      INSERT INTO user_turns VALUES (2, 2, 0, ${day}, ${day});
      INSERT INTO insight_runs VALUES (1, 1, 'succeeded', 'done', ${day});
    `)

    const summary = await aggregateStoredSignalAnalytics(
      createDesktopSignalAnalyticsStore(db as never)
    )
    db.close()

    expect(summary.totalTurns).toBe(1)
  })

  test('reports zero counts once the retired local Improve pipeline stops writing', async () => {
    const directory = mkdtempSync(join(tmpdir(), 'blume-signal-analytics-'))
    directories.push(directory)
    const db = new DatabaseSync(join(directory, 'blume.sqlite'))
    const day = Date.UTC(2026, 9, 3, 12)
    // Conversations keep arriving, but no signal, run or read rows are written any more.
    db.exec(`
      CREATE TABLE conversations (id INTEGER PRIMARY KEY, started_at INTEGER, created_at INTEGER);
      CREATE TABLE user_turns (
        id INTEGER PRIMARY KEY, conversation_id INTEGER, position INTEGER,
        started_at INTEGER, ended_at INTEGER
      );
      CREATE TABLE events (id INTEGER PRIMARY KEY, user_turn_id INTEGER, timestamp_ms INTEGER);
      CREATE TABLE signals (
        id INTEGER PRIMARY KEY, conversation_id INTEGER, type TEXT, kind TEXT, evidence_json TEXT,
        created_at INTEGER
      );
      CREATE TABLE insight_agent_conversation_reads (
        conversation_id INTEGER NOT NULL, agent_version_id TEXT NOT NULL,
        conversation_activity_ts INTEGER NOT NULL,
        PRIMARY KEY (conversation_id, agent_version_id)
      );
      CREATE TABLE insight_runs (
        id INTEGER PRIMARY KEY, conversation_id INTEGER NOT NULL,
        status TEXT NOT NULL, stage TEXT, finished_at INTEGER
      );
      INSERT INTO conversations VALUES (1, ${day}, ${day});
      INSERT INTO user_turns VALUES (1, 1, 0, ${day}, ${day});
    `)

    const summary = await aggregateStoredSignalAnalytics(
      createDesktopSignalAnalyticsStore(db as never)
    )
    db.close()

    expect(summary.totalTurns).toBe(0)
    expect(summary.turnsWithAnySignal).toBe(0)
    expect(summary.signalRate).toBe(0)
    expect(summary.daily).toEqual([])
  })
})
