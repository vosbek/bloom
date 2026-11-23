import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, isAbsolute, join } from 'node:path'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import {
  buildConversationPacket,
  createImproveApplyRuntime,
  formatToolCallForPacket,
  parseExtraction,
  parsePlanning
} from '@blume/app-core'
import type { RevertRecord, SuggestionOperation } from '@blume/app-core'
import { buildScrubbedEnv } from '../../src/main/insights/nodeHarnessProcess'

const sha256 = (s: string): string => createHash('sha256').update(s, 'utf8').digest('hex')

async function readTextFile(path: string): Promise<string | null> {
  try {
    const s = await stat(path)
    if (!s.isFile()) return null
    return await readFile(path, 'utf8')
  } catch {
    return null
  }
}

const applyRuntime = createImproveApplyRuntime({
  filesystem: {
    isAbsolutePath: isAbsolute,
    readTextFile,
    async writeTextFile(path: string, content: string): Promise<void> {
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, content, 'utf8')
    },
    async removeFile(path: string): Promise<void> {
      await rm(path, { force: true })
    }
  },
  hashText: sha256
})

const applyOperations = applyRuntime.applyOperations
const undoOperations = applyRuntime.undoOperations

describe('formatToolCallForPacket', () => {
  test('keeps call name and parameters but omits successful output', () => {
    const text = formatToolCallForPacket({
      name: 'exec_command',
      input_json: JSON.stringify({
        cmd: 'pnpm test',
        prompt: 'x'.repeat(1_200)
      }),
      result_text: 'SUCCESSFUL TOOL OUTPUT '.repeat(200),
      is_error: 0
    })

    expect(text).toContain('Tool call: exec_command')
    expect(text).toContain('Parameters:')
    expect(text).toContain('"cmd":"pnpm test"')
    expect(text).toContain('Errored: no')
    expect(text).toContain('chars)')
    expect(text).not.toContain('SUCCESSFUL TOOL OUTPUT')
    expect(text).not.toContain('x'.repeat(800))
  })

  test('includes only the error text for failed calls', () => {
    const text = formatToolCallForPacket({
      name: 'read_file',
      input_json: JSON.stringify({ path: '/tmp/missing.jsonl' }),
      result_text: 'ENOENT: no such file or directory',
      is_error: 1
    })

    expect(text).toContain('Tool call: read_file')
    expect(text).toContain('Errored: yes')
    expect(text).toContain('Error: ENOENT: no such file or directory')
  })
})

describe('buildConversationPacket', () => {
  test('hashes tool parameters while excluding successful tool output', async () => {
    let inputJson = JSON.stringify({ cmd: 'pnpm test' })
    let resultText = 'first successful command output'
    const events = [
      {
        id: 1,
        user_turn_id: 1,
        position: 0,
        kind: 'user_text',
        text: 'run the checks',
        timestamp_ms: null,
        tool_call_id: null
      },
      {
        id: 2,
        user_turn_id: 1,
        position: 1,
        kind: 'assistant_text',
        text: null,
        timestamp_ms: null,
        tool_call_id: null
      },
      {
        id: 3,
        user_turn_id: 1,
        position: 2,
        kind: 'tool_result',
        text: resultText,
        timestamp_ms: null,
        tool_call_id: 1
      }
    ]
    const reader = {
      async getConversationPacketRows() {
        return {
          events,
          toolCalls: [
            {
              id: 1,
              conversation_id: 1,
              event_id: 2,
              tool_use_id: 'call-1',
              name: 'exec_command',
              input_json: inputJson,
              result_text: resultText,
              is_error: 0,
              started_at_ms: null,
              ended_at_ms: null
            }
          ],
          userTurns: [
            {
              id: 1,
              conversation_id: 1,
              position: 1,
              prompt: 'run the checks',
              state: 'finished',
              started_at: null,
              ended_at: null
            }
          ]
        }
      }
    }

    const first = await buildConversationPacket(reader, 1)
    resultText = 'second successful command output'
    events[2].text = resultText
    const changedOutput = await buildConversationPacket(reader, 1)

    expect(changedOutput.messages).toEqual(first.messages)
    expect(changedOutput.transcriptHash).toBe(first.transcriptHash)
    expect(JSON.stringify(first.messages)).not.toContain('successful command output')

    inputJson = JSON.stringify({ cmd: 'pnpm typecheck' })
    const changedInput = await buildConversationPacket(reader, 1)

    expect(changedInput.messages).not.toEqual(first.messages)
    expect(changedInput.transcriptHash).not.toBe(first.transcriptHash)
    expect(JSON.stringify(changedInput.messages)).toContain('pnpm typecheck')
  })
})

describe('parseExtraction', () => {
  test('clamps painScore and confidence, normalizes kind', () => {
    const [sig] = parseExtraction({
      signals: [{ kind: 'nonsense', normalizedKey: 'k', summary: 's', painScore: 9, confidence: 2 }]
    })
    expect(sig.kind).toBe('other')
    expect(sig.painScore).toBe(3)
    expect(sig.confidence).toBe(1)
  })
  test('drops entries missing a summary or key', () => {
    const out = parseExtraction({
      signals: [{ kind: 'command', normalizedKey: 'k' }, { summary: 'no key' }]
    })
    expect(out).toHaveLength(0)
  })
  test('accepts snake_case fields from the model', () => {
    const [sig] = parseExtraction({
      signals: [{ kind: 'command', normalized_key: 'pm.pnpm', summary: 'use pnpm' }]
    })
    expect(sig.normalizedKey).toBe('pm.pnpm')
  })
})

describe('parsePlanning', () => {
  test('returns null when there are no operations', () => {
    expect(parsePlanning({ title: 't', summary: 's', operations: [] })).toBeNull()
  })
  test('parses an operation and defaults the title', () => {
    const planned = parsePlanning({
      operations: [{ action: 'update', targetPath: '/x', summary: 'u', patchPreview: 'p' }]
    })
    expect(planned).not.toBeNull()
    expect(planned?.operations[0].action).toBe('update')
    expect(planned?.title.length).toBeGreaterThan(0)
  })
})

describe('applyOperations', () => {
  let dir = ''
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'blume-insights-test-'))
  })
  afterEach(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  test('applies an update when the base hash matches', async () => {
    const path = join(dir, 'AGENTS.md')
    const original = '# Guide\n'
    await writeFile(path, original, 'utf8')
    const op: SuggestionOperation = {
      action: 'update',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: path,
      baseHash: sha256(original),
      summary: 'append',
      patchPreview: '+line',
      newContent: original + '- new rule\n'
    }
    const result = await applyOperations([op])
    expect(result.status).toBe('applied')
    expect(await readFile(path, 'utf8')).toContain('- new rule')
  })

  test('returns needs_review when the file changed (hash mismatch)', async () => {
    const path = join(dir, 'AGENTS.md')
    await writeFile(path, 'changed since planning\n', 'utf8')
    const op: SuggestionOperation = {
      action: 'update',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: path,
      baseHash: sha256('the original content'),
      summary: 'append',
      patchPreview: '+line',
      newContent: 'overwrite'
    }
    const result = await applyOperations([op])
    expect(result.status).toBe('needs_review')
    // The file must be untouched.
    expect(await readFile(path, 'utf8')).toBe('changed since planning\n')
  })

  test('creates a new file and refuses to create over an existing one', async () => {
    const path = join(dir, 'sub', 'new.md')
    const create: SuggestionOperation = {
      action: 'create',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: path,
      baseHash: null,
      summary: 'create',
      patchPreview: '+file',
      newContent: '# new\n'
    }
    expect((await applyOperations([create])).status).toBe('applied')
    expect((await stat(path)).isFile()).toBe(true)
    // Second create over the now-existing file → needs_review, no overwrite.
    expect((await applyOperations([create])).status).toBe('needs_review')
  })

  test('removes a file', async () => {
    const path = join(dir, 'gone.md')
    await writeFile(path, 'bye', 'utf8')
    const op: SuggestionOperation = {
      action: 'remove',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: path,
      baseHash: sha256('bye'),
      summary: 'remove',
      patchPreview: '-file'
    }
    expect((await applyOperations([op])).status).toBe('applied')
    await expect(stat(path)).rejects.toThrow()
  })

  test('refuses an update with no base hash (fail closed)', async () => {
    const path = join(dir, 'AGENTS.md')
    const original = '# Guide\n'
    await writeFile(path, original, 'utf8')
    const op: SuggestionOperation = {
      action: 'update',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: path,
      baseHash: null,
      summary: 'append',
      patchPreview: '+line',
      newContent: original + '- new rule\n'
    }
    const result = await applyOperations([op])
    expect(result.status).toBe('needs_review')
    expect(await readFile(path, 'utf8')).toBe(original) // untouched
  })

  test('rolls back earlier writes when a later op fails (atomic)', async () => {
    const keep = join(dir, 'keep.md')
    const original = '# keep\n'
    await writeFile(keep, original, 'utf8')
    const update: SuggestionOperation = {
      action: 'update',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: keep,
      baseHash: sha256(original),
      summary: 'edit',
      patchPreview: '~',
      newContent: '# keep\n- edited\n'
    }
    // A create whose parent dir is actually a file → mkdir fails at apply time,
    // after the update has already been written.
    const doomed: SuggestionOperation = {
      action: 'create',
      artifactType: 'doc',
      artifactScope: 'project',
      harnessApplicability: 'shared',
      targetPath: join(keep, 'child.md'),
      baseHash: null,
      summary: 'create',
      patchPreview: '+',
      newContent: 'x'
    }
    const result = await applyOperations([update, doomed])
    expect(result.status).toBe('error')
    // The earlier update must have been rolled back to the original bytes.
    expect(await readFile(keep, 'utf8')).toBe(original)
  })
})

describe('buildScrubbedEnv', () => {
  test('drops secret-bearing vars but keeps provider CLI auth + session vars', () => {
    const env = buildScrubbedEnv({
      PATH: '/usr/bin',
      HOME: '/Users/x',
      GITHUB_TOKEN: 'ghp_secret',
      AWS_SECRET_ACCESS_KEY: 'aws',
      MY_PASSWORD: 'pw',
      DB_SESSION: 'sess',
      SSH_AUTH_SOCK: '/tmp/agent.sock',
      ANTHROPIC_API_KEY: 'sk-ant',
      OPENAI_API_KEY: 'sk-oai'
    })
    // Non-secret config passes through.
    expect(env.PATH).toBe('/usr/bin')
    expect(env.HOME).toBe('/Users/x')
    // Unrelated secrets are scrubbed.
    expect(env.GITHUB_TOKEN).toBeUndefined()
    expect(env.AWS_SECRET_ACCESS_KEY).toBeUndefined()
    expect(env.MY_PASSWORD).toBeUndefined()
    expect(env.DB_SESSION).toBeUndefined()
    // Allowlisted: session var + the provider CLIs' own auth keys.
    expect(env.SSH_AUTH_SOCK).toBe('/tmp/agent.sock')
    expect(env.ANTHROPIC_API_KEY).toBe('sk-ant')
    expect(env.OPENAI_API_KEY).toBe('sk-oai')
  })
})

describe('undoOperations', () => {
  let dir = ''
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'blume-undo-test-'))
  })
  afterEach(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  test('fails closed when a create/update revert record has no applied hash', async () => {
    const path = join(dir, 'doc.md')
    await writeFile(path, 'CURRENT', 'utf8')
    const revert: RevertRecord[] = [
      { path, action: 'update', previousContent: 'OLD', appliedHash: null }
    ]
    const result = await undoOperations(revert)
    expect(result.status).toBe('needs_review')
    expect(await readFile(path, 'utf8')).toBe('CURRENT') // untouched
  })

  test('rolls back an earlier revert when a later one fails (atomic)', async () => {
    const a = join(dir, 'A.md')
    await writeFile(a, 'APPLIED-A', 'utf8')
    // `B` is a regular file; the 2nd record targets a path *under* it, so undo's
    // mkdir(dirname) hits ENOTDIR and throws mid-loop.
    const bFile = join(dir, 'B')
    await writeFile(bFile, 'iamafile', 'utf8')
    const revert: RevertRecord[] = [
      { path: a, action: 'update', previousContent: 'OLD-A', appliedHash: sha256('APPLIED-A') },
      {
        path: join(bFile, 'child.md'),
        action: 'update',
        previousContent: 'OLD-B',
        appliedHash: sha256('x')
      }
    ]
    const result = await undoOperations(revert)
    expect(result.status).toBe('error')
    // A must be rolled back to its applied bytes, not left at the reverted 'OLD-A'.
    expect(await readFile(a, 'utf8')).toBe('APPLIED-A')
  })
})
