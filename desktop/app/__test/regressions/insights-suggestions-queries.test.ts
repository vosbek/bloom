import { DatabaseSync } from 'node:sqlite'

import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import {
  RESOLVED_SUGGESTIONS_WHERE,
  VISIBLE_SUGGESTIONS_WHERE
} from '@blume/storage-sql'

// Exercises the real WHERE fragments the repository builds its list queries
// from (see insights.ts), against an in-memory DB. better-sqlite3 can't load
// under vitest (its native ABI is built for Electron), so we use Node's
// built-in SQLite — the SQL dialect is the same for these clauses.

const NOW = 1_000_000

interface Row {
  id: number
  status: string
  snoozed_until: number | null
  hidden_at: number | null
  hidden_until: number | null
}

describe('suggestion list WHERE fragments', () => {
  let db: DatabaseSync

  beforeEach(() => {
    db = new DatabaseSync(':memory:')
    db.exec(
      `CREATE TABLE suggestions (
         id INTEGER PRIMARY KEY,
         status TEXT NOT NULL,
         snoozed_until INTEGER,
         hidden_at INTEGER,
         hidden_until INTEGER,
         updated_at INTEGER NOT NULL DEFAULT 0
       )`
    )
    const insert = db.prepare(
      'INSERT INTO suggestions (id, status, snoozed_until) VALUES (?, ?, ?)'
    )
    insert.run(1, 'active', null)
    insert.run(2, 'needs_review', null)
    insert.run(3, 'snoozed', NOW - 1) // timer elapsed → open
    insert.run(4, 'snoozed', NOW + 1) // timer in the future → resolved
    insert.run(5, 'snoozed', null) // malformed: no timer
    insert.run(6, 'dismissed', null)
    insert.run(7, 'applied', null)
    insert.run(8, 'archived', null)
    insert.run(9, 'draft', null)
    db.prepare('UPDATE suggestions SET hidden_at = ? WHERE id = ?').run(NOW - 10, 1)
  })

  afterEach(() => db.close())

  const ids = (where: string): number[] =>
    (
      db.prepare(`SELECT id FROM suggestions WHERE ${where} ORDER BY id`).all(NOW, NOW) as Row[]
    ).map((r) => r.id)

  test('visible list = active/needs_review + elapsed snooze (not NULL-timer)', () => {
    expect(ids(VISIBLE_SUGGESTIONS_WHERE)).toEqual([2, 3])
  })

  test('resolved list = applied/dismissed/archived + future snooze (not NULL-timer)', () => {
    expect(ids(RESOLVED_SUGGESTIONS_WHERE)).toEqual([1, 4, 6, 7, 8])
  })

  test('a snoozed row with NULL snoozed_until appears in neither list', () => {
    expect(ids(VISIBLE_SUGGESTIONS_WHERE)).not.toContain(5)
    expect(ids(RESOLVED_SUGGESTIONS_WHERE)).not.toContain(5)
  })

  test('a draft suggestion appears in neither list', () => {
    expect(ids(VISIBLE_SUGGESTIONS_WHERE)).not.toContain(9)
    expect(ids(RESOLVED_SUGGESTIONS_WHERE)).not.toContain(9)
  })
})
