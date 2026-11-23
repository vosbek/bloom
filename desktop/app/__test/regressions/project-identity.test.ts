import { describe, expect, test, vi } from 'vitest'

import { createConversationIngestRuntime, describeProjectPath } from '@blume/app-core'
import type { ProviderProjectionParsedConversation as ParsedConversation } from '@blume/conversations-model'

/** Build the smallest parsed conversation shape needed to exercise ingest identity. */
function parsedConversation(input: {
  ref: string
  cwd: string
  projectName: string
  projectRoot: string
  workspaceName?: string
}): ParsedConversation {
  return {
    sourcePath: `/sessions/${input.ref}.jsonl`,
    sourceMtimeMs: 1,
    sourceSize: 1,
    conv: {
      id: input.ref,
      source: 'codex',
      project: input.cwd,
      ref: input.ref,
      lastActivityTs: 1,
      cwd: input.cwd,
      projectName: input.projectName,
      projectRoot: input.projectRoot,
      workspaceName: input.workspaceName,
      workspaceKind: '.codex',
      preview: '',
      state: 'finished'
    },
    transcript: {
      messages: [],
      toolCalls: [],
      todoLists: [],
      userTurns: []
    }
  }
}

describe('Codex project identity', () => {
  test('global worktrees share a stable project root while keeping worktree ids', async () => {
    vi.resetModules()

    const first = describeProjectPath('/Users/me/.codex/worktrees/011f/quick-start-sidecar')
    const second = describeProjectPath('/Users/me/.codex/worktrees/055e/quick-start-sidecar')
    const workspace = describeProjectPath('/Users/me/.codex/workspaces/099a/quick-start-sidecar')

    expect(first.projectRoot).toBe('/Users/me/.codex/projects/quick-start-sidecar')
    expect(second.projectRoot).toBe(first.projectRoot)
    expect(workspace.projectRoot).toBe(first.projectRoot)
    expect(first.project).toBe('quick-start-sidecar')
    expect(second.project).toBe('quick-start-sidecar')
    expect(workspace.project).toBe('quick-start-sidecar')
    expect(first.worktree).toBe('011f')
    expect(second.worktree).toBe('055e')
    expect(workspace.worktree).toBe('099a')
    expect(first.display).toBe('quick-start-sidecar · 011f')
    expect(second.display).toBe('quick-start-sidecar · 055e')
    expect(workspace.display).toBe('quick-start-sidecar · 099a')
  })

  test('ingest stores conversations from global worktrees under one project row', async () => {
    vi.resetModules()
    const projects = new Map<string, { id: number; path: string; name: string }>()
    const conversations: { ref: string; projectId: number | null; workspace: string | null }[] = []

    const ingest = createConversationIngestRuntime({
      sourceCursors: {
        getSourceCursor: async () => null,
        upsertSourceCursor: async () => undefined
      },
      conversations: {
        getSkippedConversation: async () => null,
        applySkippedConversationUpdate: async () => undefined,
        replaceConversation: async (input: {
          project: { path: string; name: string }
          conversation: { ref: string; workspace?: string | null }
        }) => {
          const existing = projects.get(input.project.path)
          const project =
            existing ??
            (() => {
              const created = {
                id: projects.size + 1,
                path: input.project.path,
                name: input.project.name
              }
              projects.set(input.project.path, created)
              return created
            })()
          conversations.push({
            ref: input.conversation.ref,
            projectId: project.id,
            workspace: input.conversation.workspace ?? null
          })
          return {
            conversationId: conversations.length,
            projectId: project.id,
            sourceId: 1
          }
        }
      },
      isSelfRunPath: () => false,
      applyDeferredOverrides: () => undefined,
      now: () => Date.now()
    })

    const first = describeProjectPath('/Users/me/.codex/worktrees/011f/quick-start-sidecar')
    const second = describeProjectPath('/Users/me/.codex/worktrees/055e/quick-start-sidecar')

    await ingest.ingestConversation(
      parsedConversation({
        ref: 'codex-worktree-011f',
        cwd: '/Users/me/.codex/worktrees/011f/quick-start-sidecar',
        projectName: first.project,
        projectRoot: first.projectRoot,
        workspaceName: first.worktree
      })
    )
    await ingest.ingestConversation(
      parsedConversation({
        ref: 'codex-worktree-055e',
        cwd: '/Users/me/.codex/worktrees/055e/quick-start-sidecar',
        projectName: second.project,
        projectRoot: second.projectRoot,
        workspaceName: second.worktree
      })
    )

    expect(conversations).toHaveLength(2)
    expect(conversations[0].projectId).toBe(conversations[1].projectId)
    expect(conversations.map((row) => row.workspace)).toEqual(['011f', '055e'])
    expect([...projects.values()]).toEqual([
      {
        id: conversations[0].projectId,
        path: '/Users/me/.codex/projects/quick-start-sidecar',
        name: 'quick-start-sidecar'
      }
    ])
  })

  test('ingest skip path projects Cursor todo and cursor updates through shared storage', async () => {
    vi.resetModules()
    const skippedUpdates: unknown[] = []
    const sourceCursorWrites: unknown[] = []

    const ingest = createConversationIngestRuntime({
      sourceCursors: {
        getSourceCursor: async () => ({
          kind: 'cursor',
          path: '/sessions/cursor-skip.jsonl',
          sourceMtimeMs: 10,
          sourceSize: 100,
          sourceBytesParsed: 100,
          sourceCursor: '1',
          lastFetchedAt: 50
        }),
        upsertSourceCursor: async (input: unknown) => {
          sourceCursorWrites.push(input)
        }
      },
      conversations: {
        getSkippedConversation: async () => ({
          conversationId: 7,
          state: 'running',
          dismissedAt: null,
          stateOverrideTurnPosition: null,
          latestUserTurnId: 42
        }),
        applySkippedConversationUpdate: async (input: unknown) => {
          skippedUpdates.push(input)
        },
        replaceConversation: async () => {
          throw new Error('replace should not run for skipped ingest')
        }
      },
      isSelfRunPath: () => false,
      applyDeferredOverrides: () => undefined,
      now: () => 1_000
    })

    const result = await ingest.ingestConversation({
      sourcePath: '/sessions/cursor-skip.jsonl',
      sourceMtimeMs: 10,
      sourceSize: 100,
      composerStateMtimeMs: 2,
      conv: {
        id: 'cursor-skip',
        source: 'cursor',
        project: '/tmp/project',
        ref: 'cursor-skip',
        lastActivityTs: 100,
        cwd: '/tmp/project',
        projectName: 'project',
        projectRoot: '/tmp/project',
        preview: '',
        state: 'finished'
      },
      transcript: {
        messages: [],
        toolCalls: [],
        userTurns: [{ position: 3, prompt: 'do it', state: 'finished' }],
        todoLists: [
          {
            source: 'composer',
            todos: [{ position: 0, content: 'ship it', state: 'current' }]
          }
        ],
        sourceBytesParsed: 100
      }
    } satisfies ParsedConversation)

    expect(result).toEqual({ conversationId: 7, skipped: true })
    expect(skippedUpdates).toEqual([
      {
        ref: 'cursor-skip',
        statePatch: {
          state: 'finished',
          dismissedAt: null,
          stateOverrideTurnPosition: null
        },
        providerTodoLists: [
          {
            userTurnId: 42,
            sourceEventId: null,
            source: 'composer',
            isInferred: true,
            todos: [{ position: 0, content: 'ship it', state: 'current' }]
          }
        ]
      }
    ])
    expect(sourceCursorWrites).toEqual([
      {
        kind: 'cursor',
        path: '/sessions/cursor-skip.jsonl',
        lastMtimeMs: 10,
        lastSize: 100,
        lastByteOffset: 100,
        lastCursor: '2',
        lastFetchedAt: expect.any(Number)
      }
    ])
  })
})
