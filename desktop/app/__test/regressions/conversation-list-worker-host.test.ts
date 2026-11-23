import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const handlers = {
    message: null as null | ((message: unknown) => void),
    exit: null as null | (() => void)
  }
  const worker = {
    on: vi.fn((event: string, handler: (...args: unknown[]) => void) => {
      if (event === 'message') handlers.message = handler as (message: unknown) => void
      if (event === 'exit') handlers.exit = handler as () => void
      return worker
    }),
    postMessage: vi.fn(),
    kill: vi.fn(() => true)
  }
  return {
    handlers,
    worker,
    fork: vi.fn(() => worker),
    getStorage: vi.fn(() => {
      throw new Error('Electron main must not read the conversation list')
    }),
    captureAppError: vi.fn(async () => undefined),
    startBackgroundProcessRequest: vi.fn(),
    finishBackgroundProcessRequest: vi.fn(),
    clearBackgroundProcessRequests: vi.fn(),
    terminateBackgroundProcess: vi.fn((process: { kill: () => boolean }) => process.kill())
  }
})

vi.mock('electron', () => ({ utilityProcess: { fork: mocks.fork } }))
vi.mock('../../src/main/db', () => ({ getDbPath: () => '/tmp/blume-list-test.sqlite' }))
vi.mock('../../src/main/db/storage', () => ({ getStorage: mocks.getStorage }))
vi.mock('../../src/main/backgroundProcessActivity', () => ({
  BLUME_BACKGROUND_PROCESS_SERVICES: { conversationList: 'blume-conversation-list-worker' },
  startBackgroundProcessRequest: mocks.startBackgroundProcessRequest,
  finishBackgroundProcessRequest: mocks.finishBackgroundProcessRequest,
  clearBackgroundProcessRequests: mocks.clearBackgroundProcessRequests,
  terminateBackgroundProcess: mocks.terminateBackgroundProcess
}))
vi.mock('../../src/main/telemetry', () => ({ captureAppError: mocks.captureAppError }))

type ListHost = typeof import('../../src/main/conversations/listHost')

async function loadHost(): Promise<ListHost> {
  return import('../../src/main/conversations/listHost')
}

interface PostedRequest {
  type: string
  id: number
  dbPath: string
  options: Record<string, unknown>
}

function posted(): PostedRequest[] {
  return mocks.worker.postMessage.mock.calls.map((call) => call[0] as PostedRequest)
}

function answer(id: number, items: unknown[] = [{ ref: `row-${id}` }]): void {
  mocks.handlers.message?.({ type: 'list-for-view-result', id, ok: true, items, queryMs: 3 })
}

describe('conversation list worker host', { timeout: 15_000 }, () => {
  // Transform the shared package graph before timing individual worker behavior.
  beforeAll(async () => {
    await loadHost()
  }, 180_000)
  beforeEach(() => {
    vi.resetModules()
    mocks.handlers.message = null
    mocks.handlers.exit = null
    mocks.fork.mockReset()
    mocks.fork.mockImplementation(() => mocks.worker)
    mocks.worker.on.mockClear()
    mocks.worker.postMessage.mockReset()
    mocks.worker.kill.mockClear()
    mocks.getStorage.mockClear()
    mocks.captureAppError.mockClear()
    mocks.startBackgroundProcessRequest.mockClear()
    mocks.finishBackgroundProcessRequest.mockClear()
    mocks.clearBackgroundProcessRequests.mockClear()
    mocks.terminateBackgroundProcess.mockClear()
  })

  afterEach(async () => {
    vi.useRealTimers()
    ;(await loadHost()).disposeConversationListWorker()
  })

  it('reads transcripts off main with normalized options and fresh coalesced follow-up', async () => {
    const { getTranscriptViaWorker } = await loadHost()
    const first = getTranscriptViaWorker('claude:session', { limit: 1e9, beforeTurnPosition: 8 })
    const second = getTranscriptViaWorker('claude:session', { limit: 1e9, beforeTurnPosition: 8 })
    expect(posted()).toHaveLength(1)
    expect(posted()[0]).toMatchObject({
      type: 'transcript',
      ref: 'claude:session',
      options: { limit: 25, beforeTurnPosition: 8 }
    })
    const result = { userTurns: [{ id: 1 }] }
    mocks.handlers.message?.({
      type: 'transcript-result',
      id: posted()[0].id,
      ok: true,
      transcript: result,
      queryMs: 4
    })
    expect(await first).toEqual(result)
    await vi.waitFor(() => expect(posted()).toHaveLength(2))
    mocks.handlers.message?.({
      type: 'transcript-result',
      id: posted()[1].id,
      ok: true,
      transcript: null,
      queryMs: 4
    })
    expect(await second).toBeNull()
    expect(mocks.getStorage).not.toHaveBeenCalled()
  })

  it('fails transcript reads on worker timeout without main-process fallback', async () => {
    vi.useFakeTimers()
    const host = await loadHost()
    const read = host.getTranscriptViaWorker('claude:session')
    const rejected = expect(read).rejects.toThrow(host.CONVERSATION_LIST_WORKER_TIMEOUT_MESSAGE)
    await vi.advanceTimersByTimeAsync(host.CONVERSATION_LIST_TIMEOUT_MS)
    await rejected
    expect(mocks.worker.kill).toHaveBeenCalled()
    expect(mocks.getStorage).not.toHaveBeenCalled()
  })

  it('sends normalized, bounded options to one warm worker and returns its rows', async () => {
    const { listConversationsForViewViaWorker } = await loadHost()

    const first = listConversationsForViewViaWorker({
      sinceMs: 1_700_000_000_123,
      limit: 1e9,
      bogus: 'dropped'
    })
    expect(posted()).toEqual([
      {
        type: 'list-for-view',
        id: 1,
        dbPath: '/tmp/blume-list-test.sqlite',
        options: { sinceMs: 1_700_000_000_000, limit: 2_000 }
      }
    ])
    answer(1)
    await expect(first).resolves.toEqual([{ ref: 'row-1' }])

    const second = listConversationsForViewViaWorker({ state: ['running'] })
    answer(posted()[1].id)
    await second
    expect(mocks.fork).toHaveBeenCalledTimes(1)
    expect(mocks.getStorage).not.toHaveBeenCalled()
  })

  it('cancels abandoned follow-ups while keeping another consumer alive', async () => {
    const { listConversationsForViewViaWorker } = await loadHost()
    const first = listConversationsForViewViaWorker({ limit: 10 })
    const gone = new AbortController()
    const cancelled = listConversationsForViewViaWorker({ limit: 10 }, gone.signal)
    const cancellation = expect(cancelled).rejects.toMatchObject({ name: 'AbortError' })
    const survivor = listConversationsForViewViaWorker({ limit: 10 })
    gone.abort()
    await cancellation
    expect(mocks.worker.kill).not.toHaveBeenCalled()
    answer(posted()[0].id)
    await first
    await vi.waitFor(() => expect(posted()).toHaveLength(2))
    answer(posted()[1].id)
    await survivor

    const active = listConversationsForViewViaWorker({ limit: 20 })
    const queuedAbort = new AbortController()
    const queued = listConversationsForViewViaWorker({ limit: 20 }, queuedAbort.signal)
    const rejected = expect(queued).rejects.toMatchObject({ name: 'AbortError' })
    queuedAbort.abort()
    await rejected
    answer(posted()[2].id)
    await active
    await Promise.resolve()
    expect(posted()).toHaveLength(3)
  })

  it('stops work only when no active consumer remains, without a failure cooldown', async () => {
    const { listConversationsForViewViaWorker, getConversationListWorkerStats } = await loadHost()
    const a = new AbortController()
    const b = new AbortController()
    const readA = listConversationsForViewViaWorker({ projectId: 1 }, a.signal)
    const readB = listConversationsForViewViaWorker({ projectId: 2 }, b.signal)
    const rejectedA = expect(readA).rejects.toMatchObject({ name: 'AbortError' })
    const rejectedB = expect(readB).rejects.toMatchObject({ name: 'AbortError' })
    a.abort()
    await rejectedA
    expect(mocks.worker.kill).not.toHaveBeenCalled()
    b.abort()
    await rejectedB
    expect(mocks.worker.kill).toHaveBeenCalledTimes(1)
    expect(getConversationListWorkerStats().failures).toBe(0)
    const next = listConversationsForViewViaWorker({ projectId: 3 })
    expect(mocks.fork).toHaveBeenCalledTimes(2)
    answer(posted()[2].id)
    await next
  })

  it('coalesces equal requests and runs one fresh follow-up for requests that arrive meanwhile', async () => {
    const { listConversationsForViewViaWorker, getConversationListWorkerStats } = await loadHost()

    const a = listConversationsForViewViaWorker({ state: 'running' })
    const b = listConversationsForViewViaWorker({ state: 'running' })
    const c = listConversationsForViewViaWorker({ state: 'running' })
    // Only the first request reaches the worker; b and c share one read that starts after it.
    expect(posted()).toHaveLength(1)
    answer(posted()[0].id, [{ ref: 'before-change' }])
    await expect(a).resolves.toEqual([{ ref: 'before-change' }])
    await vi.waitFor(() => expect(posted()).toHaveLength(2))
    answer(posted()[1].id, [{ ref: 'after-change' }])
    await expect(b).resolves.toEqual([{ ref: 'after-change' }])
    await expect(c).resolves.toEqual([{ ref: 'after-change' }])
    expect(getConversationListWorkerStats()).toMatchObject({ requests: 3, coalesced: 2 })

    // Distinct requests are not merged.
    const project = listConversationsForViewViaWorker({ projectId: 1, limit: 5 })
    const other = listConversationsForViewViaWorker({ projectId: 2, limit: 5 })
    expect(posted()).toHaveLength(4)
    answer(posted()[2].id)
    answer(posted()[3].id)
    await Promise.all([project, other])
  })

  it('fails a stuck read, stops the worker and cools down without running the query on main', async () => {
    vi.useFakeTimers({ toFake: ['Date', 'setTimeout', 'clearTimeout'] })
    const { listConversationsForViewViaWorker } = await loadHost()

    const pending = listConversationsForViewViaWorker({})
    const expectation = expect(pending).rejects.toMatchObject({
      name: 'ConversationListWorkerUnavailableError',
      message: 'conversation list worker timed out'
    })
    await vi.advanceTimersByTimeAsync(15_000)
    await expectation
    expect(mocks.terminateBackgroundProcess).toHaveBeenCalledWith(
      mocks.worker,
      'blume-conversation-list-worker',
      'request-timeout'
    )
    expect(mocks.captureAppError).toHaveBeenCalledWith(
      'main.conversations.list_worker_unavailable',
      expect.any(Error),
      { phase: 'timeout', main_process_fallback: false }
    )

    await expect(listConversationsForViewViaWorker({ limit: 1 })).rejects.toMatchObject({
      message: 'conversation list worker circuit breaker is cooling down'
    })
    expect(mocks.fork).toHaveBeenCalledTimes(1)
    expect(mocks.getStorage).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(60_000)
    const retried = listConversationsForViewViaWorker({ limit: 1 })
    expect(mocks.fork).toHaveBeenCalledTimes(2)
    answer(posted().at(-1)!.id)
    await retried
  })

  it('rejects when the worker cannot start and reports it once per cooldown', async () => {
    mocks.fork.mockImplementation(() => {
      throw new Error('utility process unavailable')
    })
    const { listConversationsForViewViaWorker } = await loadHost()

    await expect(listConversationsForViewViaWorker({})).rejects.toThrow(
      'utility process unavailable'
    )
    await expect(listConversationsForViewViaWorker({ limit: 3 })).rejects.toThrow(
      'circuit breaker is cooling down'
    )
    expect(mocks.fork).toHaveBeenCalledTimes(1)
    expect(mocks.captureAppError).toHaveBeenCalledTimes(1)
    expect(mocks.getStorage).not.toHaveBeenCalled()
  })

  it('keeps the worker warm after a query error and fails reads pending when it exits', async () => {
    const { listConversationsForViewViaWorker } = await loadHost()

    const failing = listConversationsForViewViaWorker({})
    mocks.handlers.message?.({
      type: 'list-for-view-result',
      id: posted()[0].id,
      ok: false,
      errorMessage: 'no such column',
      errorName: 'SqliteError'
    })
    await expect(failing).rejects.toMatchObject({ name: 'SqliteError', message: 'no such column' })
    expect(mocks.captureAppError).not.toHaveBeenCalled()

    const orphaned = listConversationsForViewViaWorker({ limit: 9 })
    expect(mocks.fork).toHaveBeenCalledTimes(1)
    mocks.handlers.exit?.()
    await expect(orphaned).rejects.toMatchObject({
      name: 'ConversationListWorkerUnavailableError',
      message: 'conversation list worker exited with reads pending'
    })
  })

  it('bounds the number of reads waiting on the worker', async () => {
    const { listConversationsForViewViaWorker, MAX_PENDING_CONVERSATION_LISTS } = await loadHost()

    const reads = Array.from({ length: MAX_PENDING_CONVERSATION_LISTS }, (_, projectId) =>
      listConversationsForViewViaWorker({ projectId })
    )
    await expect(listConversationsForViewViaWorker({ projectId: 999 })).rejects.toMatchObject({
      message: 'conversation list worker is busy'
    })
    expect(posted()).toHaveLength(MAX_PENDING_CONVERSATION_LISTS)
    for (const request of posted()) answer(request.id)
    await Promise.all(reads)
  })

  it('settles waiting reads on quit without reporting app errors', async () => {
    const { disposeConversationListWorker, listConversationsForViewViaWorker } = await loadHost()

    const pending = listConversationsForViewViaWorker({})
    disposeConversationListWorker()

    await expect(pending).rejects.toMatchObject({
      name: 'ConversationListWorkerUnavailableError',
      message: 'conversation list worker disposed'
    })
    expect(mocks.terminateBackgroundProcess).toHaveBeenCalledWith(
      mocks.worker,
      'blume-conversation-list-worker',
      'dispose'
    )
    expect(mocks.clearBackgroundProcessRequests).toHaveBeenCalledWith(
      'blume-conversation-list-worker'
    )
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    await expect(listConversationsForViewViaWorker({})).rejects.toThrow(
      'conversation list worker disposed'
    )
    expect(mocks.fork).toHaveBeenCalledTimes(1)
  })
})
