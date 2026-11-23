import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  posted: [] as unknown[],
  onMessage: null as null | ((event: { data: unknown }) => void),
  openedPaths: [] as string[],
  listOptions: [] as unknown[],
  branchReads: [] as string[],
  records: [] as unknown[],
  transcript: null as unknown,
  transcriptOptions: [] as unknown[]
}))

vi.mock('../../src/main/db/sqliteStorage', () => ({
  openDesktopSqliteConversationReads: (path: string) => {
    state.openedPaths.push(path)
    return {
      sourceCursors: { getSourceCursor: async () => null },
      conversations: {
        getConversationTranscriptByRef: async (ref: string, options: unknown) => {
          state.transcriptOptions.push({ ref, options })
          return state.transcript
        },
        listConversationViewRecords: async (options: unknown) => {
          state.listOptions.push(options)
          return state.records
        }
      },
      close: () => undefined
    }
  },
  openDesktopSqliteStorage: () => {
    throw new Error('the conversation list worker must open the database query-only')
  }
}))
vi.mock('@blume/projects-identity/node', () => ({
  gitBranchLabel: (cwd: string) => {
    state.branchReads.push(cwd)
    return 'feature/list-worker'
  }
}))

function codexWorktreeRecord(id: number): Record<string, unknown> {
  return {
    conversation: {
      id,
      ref: `codex:${id}`,
      source: 'codex',
      external_id: null,
      thread_source: null,
      cwd: '/Users/me/.codex/worktrees/abcd/blume',
      workspace: null,
      workspace_kind: null,
      project_id: null,
      last_activity: null,
      last_activity_ts: id
    },
    project: null,
    activeTodos: [],
    toolCalls: [],
    userTurns: [],
    codexChildConversations: []
  }
}

async function request(id: number, options: Record<string, unknown>): Promise<unknown> {
  const before = state.posted.length
  state.onMessage?.({
    data: { type: 'list-for-view', id, dbPath: '/tmp/blume-list.sqlite', options }
  })
  await vi.waitFor(() => expect(state.posted.length).toBe(before + 1))
  return state.posted.at(-1)
}

describe('conversation list worker', () => {
  const originalParentPort = (process as { parentPort?: unknown }).parentPort

  beforeAll(async () => {
    ;(process as { parentPort?: unknown }).parentPort = {
      on: (event: string, handler: (event: { data: unknown }) => void) => {
        if (event === 'message') state.onMessage = handler
      },
      postMessage: (message: unknown) => state.posted.push(message)
    }
    // Compile the shared package graph before timing worker behavior.
    await import('../../src/main/conversations/listWorker')
  }, 180_000)

  afterAll(() => {
    ;(process as { parentPort?: unknown }).parentPort = originalParentPort
  })

  it('answers view-list reads from its query-only handle with shared projections', async () => {
    state.records = [codexWorktreeRecord(1), codexWorktreeRecord(2)]

    const result = (await request(7, { sinceMs: 1_000, limit: 2_000 })) as {
      type: string
      id: number
      ok: boolean
      items: Array<{ ref: string; workspace: string | null }>
    }

    expect(result).toMatchObject({ type: 'list-for-view-result', id: 7, ok: true })
    expect(result.items.map((item) => item.ref)).toEqual(['codex:1', 'codex:2'])
    expect(state.openedPaths).toEqual(['/tmp/blume-list.sqlite'])
    expect(state.listOptions).toEqual([{ sinceMs: 1_000, limit: 2_000 }])
    // Both rows share a worktree: HEAD is read once and cached for the next read too.
    expect(state.branchReads).toEqual(['/Users/me/.codex/worktrees/abcd/blume'])

    await request(8, { limit: 5 })
    expect(state.openedPaths).toHaveLength(1)
    expect(state.branchReads).toHaveLength(1)
  })

  it('reports a failed read as that request’s error', async () => {
    state.records = null as unknown as unknown[]
    const result = await request(9, {})
    expect(result).toMatchObject({ type: 'list-for-view-result', id: 9, ok: false })
  })

  it('returns native transcript pages and rejects oversized replies inside the worker', async () => {
    const send = async (id: number): Promise<unknown> => {
      const before = state.posted.length
      state.onMessage?.({
        data: {
          type: 'transcript',
          id,
          dbPath: '/tmp/blume-list.sqlite',
          ref: 'claude:session',
          options: { limit: 6 }
        }
      })
      await vi.waitFor(() => expect(state.posted.length).toBe(before + 1))
      return state.posted.at(-1)
    }
    state.transcript = {
      conversation: { source: 'claude' },
      pagination: { hasMoreAfter: true },
      events: []
    }
    expect(await send(10)).toMatchObject({
      type: 'transcript-result',
      id: 10,
      ok: true,
      transcript: state.transcript
    })
    expect(state.transcriptOptions.at(-1)).toMatchObject({
      ref: 'claude:session',
      options: { limit: 6 }
    })
    state.transcript = { ...(state.transcript as object), text: 'x'.repeat(17 * 1024 * 1024) }
    expect(await send(11)).toMatchObject({
      type: 'transcript-result',
      id: 11,
      ok: false,
      errorMessage: 'Conversation page exceeds the background read limit'
    })
  })

  it('re-reads a branch label once its short cache entry expires', async () => {
    const { cachedBranchLabel, CONVERSATION_LIST_BRANCH_LABEL_TTL_MS } =
      await import('../../src/main/conversations/listWorker')
    const read = vi.fn(() => 'main')
    expect(cachedBranchLabel('/repo/a', 0, read)).toBe('main')
    expect(cachedBranchLabel('/repo/a', CONVERSATION_LIST_BRANCH_LABEL_TTL_MS - 1, read)).toBe(
      'main'
    )
    expect(read).toHaveBeenCalledTimes(1)
    cachedBranchLabel('/repo/a', CONVERSATION_LIST_BRANCH_LABEL_TTL_MS, read)
    expect(read).toHaveBeenCalledTimes(2)
  })
})
