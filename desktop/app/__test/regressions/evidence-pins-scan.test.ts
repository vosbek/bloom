import assert from 'node:assert/strict'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'vitest'

import { EVIDENCE_PIN_LIMITS } from '@blume/app-core'

import {
  EVIDENCE_PINS_PER_REFRESH,
  evidencePinScanOrder,
  resolveEvidencePinDirectory,
  resolveEvidencePinRoots
} from '../../src/main/conversations/evidencePins'

const pin = (sessionId: string) =>
  JSON.stringify({
    quote: 'please stop renaming my variables',
    harness: 'claude',
    sessionId,
    recordedAt: 1
  })

/** Only `session-ok` is parsed on this computer; every other pin's conversation is missing. */
function references(lookups: string[]) {
  return {
    async findConversationBySession(harness: string, sessionId: string) {
      lookups.push(sessionId)
      return sessionId === 'session-ok'
        ? { id: 1, ref: `${harness}:${sessionId}`, harness, sessionId }
        : null
    },
    async listConversationMessages() {
      return [
        {
          messageId: 'm1',
          eventId: 1,
          turnPosition: 0,
          role: 'user' as const,
          text: 'Please stop renaming my variables',
          timestampMs: null
        }
      ]
    },
    async upsertConversationLink() {}
  }
}

test('scan order resumes after the cursor and wraps to the start', () => {
  const names = ['c.json', 'a.json', 'notes.txt', 'b.json']
  assert.deepEqual(evidencePinScanOrder(names, null), ['a.json', 'b.json', 'c.json'])
  assert.deepEqual(evidencePinScanOrder(names, 'a.json'), ['b.json', 'c.json', 'a.json'])
  assert.deepEqual(evidencePinScanOrder(names, 'c.json'), ['a.json', 'b.json', 'c.json'])
  assert.deepEqual(
    evidencePinScanOrder(names, 'bb.json'),
    ['c.json', 'a.json', 'b.json'],
    'a deleted cursor still resumes in order'
  )
})

test('pins that never resolve cannot hide a later pin from the bounded scan', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'blume-evidence-pins-'))
  try {
    for (let i = 0; i < EVIDENCE_PIN_LIMITS.files; i++)
      await writeFile(
        join(directory, `sig_a${String(i).padStart(3, '0')}.json`),
        pin(`deleted-${i}`)
      )
    await writeFile(join(directory, 'sig_z_valid.json'), pin('session-ok'))
    const lookups: string[] = []
    let cursor: string | null = null
    const found: string[] = []
    for (let pass = 0; pass < 3 && !found.length; pass++) {
      const result = await resolveEvidencePinDirectory({
        directory,
        completed: [],
        references: references(lookups),
        cursor
      })
      cursor = result.cursor
      found.push(...result.resolved.map((r) => r.signalId))
    }
    assert.deepEqual(found, ['sig_z_valid'], 'the valid pin resolves on a later pass')
    assert.ok(lookups.includes('session-ok'))
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('resolved pins beyond one refresh share come first in the next pass', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'blume-evidence-pins-'))
  try {
    const total = EVIDENCE_PINS_PER_REFRESH + 5
    for (let i = 0; i < total; i++)
      await writeFile(join(directory, `sig_${String(i).padStart(3, '0')}.json`), pin('session-ok'))
    const first = await resolveEvidencePinDirectory({
      directory,
      completed: [],
      references: references([]),
      cursor: null
    })
    assert.equal(first.resolved.length, EVIDENCE_PINS_PER_REFRESH)
    const second = await resolveEvidencePinDirectory({
      directory,
      completed: [],
      references: references([]),
      cursor: first.cursor
    })
    assert.deepEqual(
      second.resolved.slice(0, 5).map((r) => r.signalId),
      Array.from(
        { length: 5 },
        (_, i) => `sig_${String(EVIDENCE_PINS_PER_REFRESH + i).padStart(3, '0')}`
      )
    )
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test('app and shared pins keep independent cursors within the same completion budget', async () => {
  const root = await mkdtemp(join(tmpdir(), 'blume-evidence-roots-'))
  try {
    const app = join(root, 'dev', 'evidence-pins')
    const shared = join(root, 'evidence-pins')
    await mkdir(app, { recursive: true })
    await mkdir(shared)
    for (const [name, directory] of [
      ['dev', app],
      ['shared', shared]
    ])
      for (let index = 0; index < 15; index++)
        await writeFile(
          join(directory, `sig_${name}_${String(index).padStart(2, '0')}.json`),
          pin('session-ok')
        )
    const input = {
      blumeRoot: join(root, 'dev'),
      sharedDirectory: shared,
      completed: [],
      references: references([])
    }
    const first = await resolveEvidencePinRoots(input)
    const second = await resolveEvidencePinRoots({ ...input, cursor: first.cursor })
    assert.equal(first.resolved.length, EVIDENCE_PINS_PER_REFRESH)
    assert.equal(second.resolved.length, EVIDENCE_PINS_PER_REFRESH)
    assert.equal(
      new Set([...first.resolved, ...second.resolved].map((item) => item.signalId)).size,
      30
    )
    for (const result of [first, second]) {
      assert.equal(
        result.resolved.filter((item) => item.signalId.startsWith('sig_dev_')).length,
        10
      )
      assert.equal(
        result.resolved.filter((item) => item.signalId.startsWith('sig_shared_')).length,
        10
      )
    }
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('unresolvable pins in both roots cannot starve later pins or exceed the read budget', async () => {
  const root = await mkdtemp(join(tmpdir(), 'blume-evidence-root-budget-'))
  try {
    const app = join(root, 'dev', 'evidence-pins')
    const shared = join(root, 'evidence-pins')
    await mkdir(app, { recursive: true })
    await mkdir(shared)
    for (const directory of [app, shared]) {
      for (let index = 0; index < EVIDENCE_PIN_LIMITS.files / 2; index++)
        await writeFile(
          join(directory, `sig_a${String(index).padStart(3, '0')}.json`),
          pin(`missing-${index}`)
        )
      await writeFile(
        join(directory, directory === app ? 'sig_z_dev.json' : 'sig_z_shared.json'),
        pin('session-ok')
      )
    }
    const lookups: string[] = []
    const input = {
      blumeRoot: join(root, 'dev'),
      sharedDirectory: shared,
      completed: [],
      references: references(lookups)
    }
    const first = await resolveEvidencePinRoots(input)
    assert.deepEqual(first.resolved, [])
    assert.equal(lookups.length, EVIDENCE_PIN_LIMITS.files)
    lookups.length = 0
    const second = await resolveEvidencePinRoots({ ...input, cursor: first.cursor })
    assert.deepEqual(
      second.resolved.map((item) => item.signalId),
      ['sig_z_dev', 'sig_z_shared']
    )
    assert.equal(lookups.length, EVIDENCE_PIN_LIMITS.files)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('a legacy filename cursor still resumes the shared root when an app root is added', async () => {
  const root = await mkdtemp(join(tmpdir(), 'blume-evidence-legacy-cursor-'))
  try {
    await writeFile(join(root, 'sig_a.json'), pin('session-ok'))
    await writeFile(join(root, 'sig_b.json'), pin('session-ok'))
    const result = await resolveEvidencePinRoots({
      blumeRoot: join(root, 'dev'),
      sharedDirectory: root,
      completed: [],
      references: references([]),
      cursor: 'sig_a.json'
    })
    assert.deepEqual(
      result.resolved.map((item) => item.signalId),
      ['sig_b', 'sig_a']
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
