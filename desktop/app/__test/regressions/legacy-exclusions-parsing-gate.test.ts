import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')

// Registrations name only a harness and a conversation id, so the old excluded projects are
// honoured where the conversation's workspace is known: in the refresh worker, before storing.
test('the refresh worker leaves out conversations in excluded projects that have not moved yet', () => {
  const source = readFileSync(resolve(SRC_MAIN, 'conversations/refreshWorker.ts'), 'utf8')
  const read = source.indexOf('readLegacyProjectExclusions(')
  const gate = source.indexOf('legacyExclusionExcludesConversation(')
  const canonicalize = source.indexOf('observedWorkspaceIdentity.canonicalizeConversation(parsed)')
  const ingest = source.indexOf('ingestRuntime.ingestConversation(')
  expect(read).toBeGreaterThan(-1)
  expect(gate).toBeGreaterThan(read)
  expect(canonicalize).toBeGreaterThan(gate)
  expect(ingest).toBeGreaterThan(gate)
  // Read inside each refresh, so a row the move removes stops excluding at the next pass.
  expect(read).toBeGreaterThan(source.indexOf('async function refresh('))
})

test('Electron main only schedules the move; SQLite work stays in the action worker', () => {
  const source = readFileSync(resolve(SRC_MAIN, 'legacyProjectExclusions.ts'), 'utf8')
  expect(source).not.toMatch(/better-sqlite3|@blume\/storage-sqlite|getStorage\(/)
  expect(source).toContain("action: 'legacy-exclusions-read'")
  expect(source).toContain("action: 'legacy-exclusions-remove'")
})
