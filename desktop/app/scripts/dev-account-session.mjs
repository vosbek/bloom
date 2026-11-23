import { existsSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'

const ACCOUNT_COOKIE_KEY = 'account.blume-account.cookie'

export function devAccountSessionDatabaseCandidates({ homeDir, stableDbPath }) {
  return [
    { source: 'stable', dbPath: stableDbPath ?? join(homeDir, '.blume', 'blume.sqlite') },
    { source: 'canary', dbPath: join(homeDir, '.blume', '.canary', 'blume.sqlite') }
  ]
}

function hasAccountSession(dbPath) {
  if (!existsSync(dbPath)) return false
  let db
  try {
    db = new DatabaseSync(dbPath, { readOnly: true })
    const hasSettings = db
      .prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'settings'")
      .get()
    if (!hasSettings) return false
    const row = db
      .prepare('SELECT value FROM settings WHERE key = ? AND value != ? LIMIT 1')
      .get(ACCOUNT_COOKIE_KEY, '')
    return typeof row?.value === 'string' && row.value.length > 0
  } catch {
    return false
  } finally {
    db?.close()
  }
}

export function findDevAccountSessionSource(candidates) {
  return candidates.find((candidate) => hasAccountSession(candidate.dbPath)) ?? null
}

export async function validateDevAccountSession(settings, authUrl, fetchImpl = fetch) {
  const cookie = settings.find(
    (entry) => entry?.key === ACCOUNT_COOKIE_KEY && typeof entry.value === 'string'
  )?.value
  if (!cookie) return 'invalid'

  try {
    const response = await fetchImpl(`${authUrl.replace(/\/+$/, '')}/api/auth/get-session`, {
      headers: { Cookie: cookie },
      signal: AbortSignal.timeout(3_000)
    })
    if (!response.ok) return 'unknown'
    const body = await response.json().catch(() => null)
    return body?.session && body?.user ? 'authenticated' : 'invalid'
  } catch {
    // Offline development should still inherit a locally present session. The
    // account client will validate it when the service becomes reachable.
    return 'unknown'
  }
}
