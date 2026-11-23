/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { afterEach, describe, expect, it } from 'vitest'

import {
  devAccountSessionDatabaseCandidates,
  findDevAccountSessionSource,
  validateDevAccountSession
} from '../../scripts/dev-account-session.mjs'

const tempDirs = []

afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

function createSettingsDb(accountCookie = null) {
  const dir = mkdtempSync(join(tmpdir(), 'blume-dev-account-'))
  tempDirs.push(dir)
  const dbPath = join(dir, 'blume.sqlite')
  const db = new DatabaseSync(dbPath)
  db.exec('CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)')
  if (accountCookie !== null) {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(
      'account.blume-account.cookie',
      accountCookie
    )
  }
  db.close()
  return dbPath
}

describe('dev account session discovery', () => {
  it('prefers stable and falls back to canary', () => {
    const stableDbPath = createSettingsDb('stable-session')
    const canaryDbPath = createSettingsDb('canary-session')
    const candidates = [
      { source: 'stable', dbPath: stableDbPath },
      { source: 'canary', dbPath: canaryDbPath }
    ]
    expect(findDevAccountSessionSource(candidates)).toEqual(candidates[0])

    const db = new DatabaseSync(stableDbPath)
    db.prepare('UPDATE settings SET value = ?').run('')
    db.close()
    expect(findDevAccountSessionSource(candidates)).toEqual(candidates[1])
  })

  it('ignores missing, malformed, and signed-out databases', () => {
    const emptyDb = createSettingsDb()
    expect(
      findDevAccountSessionSource([
        { source: 'missing', dbPath: join(tmpdir(), 'does-not-exist-blume.sqlite') },
        { source: 'empty', dbPath: emptyDb }
      ])
    ).toBeNull()
  })

  it('builds stable and canary candidates without using a dev database', () => {
    expect(
      devAccountSessionDatabaseCandidates({
        homeDir: '/Users/me',
        stableDbPath: '/tmp/main.sqlite'
      })
    ).toEqual([
      { source: 'stable', dbPath: '/tmp/main.sqlite' },
      { source: 'canary', dbPath: '/Users/me/.blume/.canary/blume.sqlite' }
    ])
  })

  it('validates live sessions and distinguishes signed-out records from outages', async () => {
    const settings = [{ key: 'account.blume-account.cookie', value: 'session-cookie' }]
    expect(
      await validateDevAccountSession(settings, 'https://auth.example/', async () =>
        Response.json({ session: { id: 'session' }, user: { id: 'user' } })
      )
    ).toBe('authenticated')
    expect(
      await validateDevAccountSession(settings, 'https://auth.example', async () =>
        Response.json(null)
      )
    ).toBe('invalid')
    expect(
      await validateDevAccountSession(settings, 'https://auth.example', async () => {
        throw new Error('offline')
      })
    ).toBe('unknown')
    expect(await validateDevAccountSession([], 'https://auth.example')).toBe('invalid')
  })
})
