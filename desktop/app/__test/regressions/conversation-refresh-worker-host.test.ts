import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
    kill: vi.fn()
  }
  return {
    handlers,
    worker,
    fork: vi.fn(() => worker),
    captureAppError: vi.fn(async () => undefined),
    captureTelemetryEvent: vi.fn(async () => true),
    startBackgroundProcessRequest: vi.fn(),
    finishBackgroundProcessRequest: vi.fn(),
    clearBackgroundProcessRequests: vi.fn(),
    terminateBackgroundProcess: vi.fn((process: { kill: () => boolean }) => process.kill())
  }
})

vi.mock('electron', () => ({ utilityProcess: { fork: mocks.fork } }))
vi.mock('../../src/main/blume-home', () => ({ getBlumeRoot: () => '/tmp/blume-root' }))
vi.mock('../../src/main/db', () => ({ getDbPath: () => '/tmp/blume-refresh-test.sqlite' }))
vi.mock('../../src/main/conversations/parserBinding', () => ({
  getHarnessParserBinaryPath: () => '/tmp/parser'
}))
vi.mock('../../src/main/conversations/watch', () => ({
  getKnownFiles: () => [],
  isWatcherReady: () => true
}))
vi.mock('../../src/main/backgroundProcessActivity', () => ({
  BLUME_BACKGROUND_PROCESS_SERVICES: { refresh: 'blume-conversation-refresh-worker' },
  startBackgroundProcessRequest: mocks.startBackgroundProcessRequest,
  finishBackgroundProcessRequest: mocks.finishBackgroundProcessRequest,
  clearBackgroundProcessRequests: mocks.clearBackgroundProcessRequests,
  terminateBackgroundProcess: mocks.terminateBackgroundProcess
}))
vi.mock('../../src/main/telemetry', () => ({
  captureAppError: mocks.captureAppError,
  captureTelemetryEvent: mocks.captureTelemetryEvent
}))

async function waitForPostMessage(): Promise<void> {
  await vi.waitFor(() => {
    expect(mocks.worker.postMessage).toHaveBeenCalled()
  })
}

describe('desktop conversation refresh worker host shutdown', { timeout: 15_000 }, () => {
  beforeEach(async () => {
    vi.resetModules()
    mocks.handlers.message = null
    mocks.handlers.exit = null
    mocks.fork.mockClear()
    mocks.fork.mockImplementation(() => mocks.worker)
    mocks.worker.on.mockClear()
    mocks.worker.postMessage.mockClear()
    mocks.worker.kill.mockClear()
    mocks.captureAppError.mockClear()
    mocks.captureTelemetryEvent.mockClear()
    mocks.startBackgroundProcessRequest.mockClear()
    mocks.finishBackgroundProcessRequest.mockClear()
    mocks.clearBackgroundProcessRequests.mockClear()
    mocks.terminateBackgroundProcess.mockClear()
    const { configureConversationRegistrations } =
      await import('../../src/main/conversations/refreshHost')
    configureConversationRegistrations(async () => ({
      registrations: [{ harness: 'codex', conversationId: 'registered-session' }]
    }))
  })

  afterEach(async () => {
    vi.useRealTimers()
    const { disposeConversationRefreshWorker } =
      await import('../../src/main/conversations/refreshHost')
    disposeConversationRefreshWorker()
  })

  function lastRequest(): {
    id: number
    registeredAgents: unknown
    conversationSkips: unknown
    conversationScope: unknown
    completedEvidence: string[]
    evidencePinCursor: string | null
  } {
    return mocks.worker.postMessage.mock.calls.at(-1)?.[0] as never
  }

  function answer(
    registeredConversations: number,
    resolvedEvidence: { signalId: string; messageId: string; conversationRef: string }[] = [],
    evidencePinCursor: string | null = null,
    conversationScope: 'all' | 'blume' = 'blume'
  ): void {
    mocks.handlers.message?.({
      type: 'refresh-result',
      id: lastRequest().id,
      ok: true,
      parsed: 0,
      maxIngestMs: 0,
      durationMs: 0,
      registeredConversations,
      conversationScope,
      resolvedEvidence,
      evidencePinCursor
    })
  }

  it('reads every project by default, with the ledger Skip choices, even with nothing registered', async () => {
    const { configureConversationRegistrations, refreshViaConversationRefreshWorker } =
      await import('../../src/main/conversations/refreshHost')
    configureConversationRegistrations(async () => ({
      registrations: [],
      skipped: [{ harness: 'codex', conversationId: 'said-no' }],
      skippedRepositories: ['https://github.com/acme/docs']
    }))
    for (let index = 0; index < 2; index += 1) {
      const refresh = refreshViaConversationRefreshWorker(60_000)
      await vi.waitFor(() => expect(mocks.worker.postMessage).toHaveBeenCalledTimes(index + 1))
      expect(lastRequest().conversationScope).toBe('all')
      answer(0, [], null, 'all')
      await refresh
    }
    // The first request carries the Skip choices; the unchanged answer is not sent again.
    expect(mocks.worker.postMessage.mock.calls[0]?.[0]).toMatchObject({
      registeredAgents: [],
      conversationSkips: {
        conversations: [{ harness: 'codex', conversationId: 'said-no' }],
        repositories: ['https://github.com/acme/docs']
      }
    })
    expect(lastRequest()).toMatchObject({ registeredAgents: null, conversationSkips: null })
  })

  it('a ledger without Skip lists sends registrations with unknown skips', async () => {
    const { configureConversationRegistrations, refreshViaConversationRefreshWorker } =
      await import('../../src/main/conversations/refreshHost')
    configureConversationRegistrations(async () => ({
      registrations: [{ harness: 'codex', conversationId: 'registered-session' }]
    }))
    const refresh = refreshViaConversationRefreshWorker(60_000)
    await waitForPostMessage()
    expect(lastRequest()).toMatchObject({ conversationSkips: null, conversationScope: 'all' })
    answer(1, [], null, 'blume')
    await refresh
  })

  it('only projects that use Blume: parses cached registrations offline, and nothing when none are registered', async () => {
    const {
      configureConversationRegistrations,
      configureConversationScope,
      refreshViaConversationRefreshWorker
    } = await import('../../src/main/conversations/refreshHost')
    configureConversationScope(() => 'blume')
    // Signed out or offline before anything is known: the worker parses its SQLite cache.
    configureConversationRegistrations(async () => {
      throw Error('Account ledger unavailable')
    })
    const offline = refreshViaConversationRefreshWorker(60_000)
    await waitForPostMessage()
    expect(lastRequest().registeredAgents).toBeNull()
    answer(2)
    await offline
    // An empty registration set clears the cache; afterwards nothing starts the worker.
    configureConversationRegistrations(async () => ({ registrations: [] }))
    const cleared = refreshViaConversationRefreshWorker(60_000)
    await vi.waitFor(() => expect(mocks.worker.postMessage).toHaveBeenCalledTimes(2))
    expect(lastRequest().registeredAgents).toEqual([])
    answer(0)
    await cleared
    await refreshViaConversationRefreshWorker(60_000)
    configureConversationRegistrations(async () => {
      throw Error('Account ledger unavailable')
    })
    await refreshViaConversationRefreshWorker(60_000)
    expect(mocks.worker.postMessage).toHaveBeenCalledTimes(2)
  })

  it('reads registrations from the ledger at most once per interval', async () => {
    const { configureConversationRegistrations, refreshViaConversationRefreshWorker } =
      await import('../../src/main/conversations/refreshHost')
    const load = vi.fn(async () => ({
      registrations: [{ harness: 'codex', conversationId: 'registered-session' }]
    }))
    configureConversationRegistrations(load)
    const sent: unknown[] = []
    for (let index = 0; index < 3; index += 1) {
      const refresh = refreshViaConversationRefreshWorker(60_000)
      await vi.waitFor(() => expect(mocks.worker.postMessage).toHaveBeenCalledTimes(index + 1))
      sent.push(lastRequest().registeredAgents)
      answer(1)
      await refresh
    }
    expect(load).toHaveBeenCalledTimes(1)
    // The worker stored the set once; unchanged sets are neither re-sent nor rewritten.
    expect(sent).toEqual([[{ harness: 'codex', conversationId: 'registered-session' }], null, null])
  })

  it('completes resolved evidence through the ledger and deletes only accepted pins', async () => {
    const {
      configureConversationRegistrations,
      configureEvidenceCompletion,
      refreshViaConversationRefreshWorker
    } = await import('../../src/main/conversations/refreshHost')
    configureConversationRegistrations(async () => ({
      registrations: [{ harness: 'claude', conversationId: 'session-1' }]
    }))
    const complete = vi.fn(async (pin: { signalId: string }) => {
      if (pin.signalId === 'sig_later')
        throw Error('Blume ledger timed out. Refresh before retrying.')
    })
    configureEvidenceCompletion(complete)
    const first = refreshViaConversationRefreshWorker(60_000)
    await waitForPostMessage()
    expect(lastRequest().completedEvidence).toEqual([])
    answer(
      1,
      [
        { signalId: 'sig_ok', messageId: 'uuid-1', conversationRef: 'claude:session-1' },
        { signalId: 'sig_later', messageId: 'uuid-2', conversationRef: 'claude:session-1' }
      ],
      'sig_later.json'
    )
    await first
    await vi.waitFor(() => expect(complete).toHaveBeenCalledTimes(2))
    const second = refreshViaConversationRefreshWorker(60_000)
    await vi.waitFor(() => expect(mocks.worker.postMessage).toHaveBeenCalledTimes(2))
    expect(lastRequest().completedEvidence).toEqual(['sig_ok'])
    // The next pin pass resumes where the worker stopped, even if the worker restarted.
    expect(lastRequest().evidencePinCursor).toBe('sig_later.json')
    answer(1)
    await second
  })

  it('settles pending menu-bar snapshot work during native disposal without reporting app errors', async () => {
    const { disposeConversationRefreshWorker, loadMenuBarConversationProjectionViaWorker } =
      await import('../../src/main/conversations/refreshHost')

    const pending = loadMenuBarConversationProjectionViaWorker()
    await waitForPostMessage()
    disposeConversationRefreshWorker()

    await expect(pending).rejects.toMatchObject({
      name: 'ConversationRefreshWorkerUnavailableError',
      message: 'refresh worker disposed'
    })
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    expect(mocks.terminateBackgroundProcess).toHaveBeenCalledTimes(1)
    expect(mocks.clearBackgroundProcessRequests).toHaveBeenCalledWith(
      'blume-conversation-refresh-worker'
    )
  })

  it('classifies inactivity watchdog failures as unresponsive without app-error capture', async () => {
    vi.useFakeTimers({
      toFake: ['Date', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']
    })
    const { refreshViaConversationRefreshWorker } =
      await import('../../src/main/conversations/refreshHost')

    const pending = refreshViaConversationRefreshWorker(60_000)
    await waitForPostMessage()
    expect(mocks.worker.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        registeredAgents: [{ harness: 'codex', conversationId: 'registered-session' }]
      })
    )
    const expectation = expect(pending).rejects.toMatchObject({
      name: 'ConversationRefreshWorkerUnavailableError',
      message: 'refresh worker unresponsive'
    })

    await vi.advanceTimersByTimeAsync(60_000)
    expect(mocks.captureTelemetryEvent).toHaveBeenCalledWith(
      'conversation_refresh_worker_watchdog_probe',
      expect.objectContaining({
        requested_max_age_ms: 60_000,
        inactivity_ms: 60_000
      })
    )

    await vi.advanceTimersByTimeAsync(15_000)
    await expectation
    expect(mocks.captureTelemetryEvent).toHaveBeenCalledWith(
      'conversation_refresh_worker_failed',
      expect.objectContaining({
        outcome: 'unresponsive',
        main_process_fallback: false
      })
    )
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    expect(mocks.terminateBackgroundProcess).toHaveBeenCalledTimes(1)
  })

  it('does not report circuit-breaker cooldown as an app error', async () => {
    vi.useFakeTimers({
      toFake: ['Date', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']
    })
    const { refreshViaConversationRefreshWorker } =
      await import('../../src/main/conversations/refreshHost')

    const first = refreshViaConversationRefreshWorker(60_000)
    await waitForPostMessage()
    const firstExpectation = expect(first).rejects.toMatchObject({
      name: 'ConversationRefreshWorkerUnavailableError',
      message: 'refresh worker exited with work pending'
    })
    mocks.handlers.exit?.()
    await firstExpectation
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    mocks.captureAppError.mockClear()

    await expect(refreshViaConversationRefreshWorker(60_000)).rejects.toMatchObject({
      name: 'ConversationRefreshWorkerUnavailableError',
      message: 'refresh worker circuit breaker is cooling down'
    })
    expect(mocks.captureAppError).not.toHaveBeenCalled()
    expect(mocks.fork).toHaveBeenCalledTimes(1)
  })

  it('does not report intentional env-flag disable as an app error', async () => {
    const previous = process.env.BLUME_DISABLE_REFRESH_WORKER
    process.env.BLUME_DISABLE_REFRESH_WORKER = '1'
    try {
      const {
        getConversationRefreshWorkerUnavailableReason,
        reportConversationRefreshWorkerUnavailable
      } = await import('../../src/main/conversations/refreshHost')

      expect(getConversationRefreshWorkerUnavailableReason()).toBe(
        'conversation refresh worker disabled'
      )
      const error = reportConversationRefreshWorkerUnavailable('refresh')
      expect(error).toMatchObject({
        name: 'ConversationRefreshWorkerUnavailableError',
        message: 'conversation refresh worker disabled'
      })
      expect(mocks.captureAppError).not.toHaveBeenCalled()
    } finally {
      if (previous === undefined) {
        delete process.env.BLUME_DISABLE_REFRESH_WORKER
      } else {
        process.env.BLUME_DISABLE_REFRESH_WORKER = previous
      }
    }
  })

  it('still reports generic refresh-worker unavailability as an app error', async () => {
    const previous = process.env.BLUME_DISABLE_REFRESH_WORKER
    delete process.env.BLUME_DISABLE_REFRESH_WORKER
    try {
      const {
        getConversationRefreshWorkerUnavailableReason,
        reportConversationRefreshWorkerUnavailable
      } = await import('../../src/main/conversations/refreshHost')

      // Fork is mocked as available, so the reason is null and the reporter
      // falls back to the generic unavailable message — still reportable.
      expect(getConversationRefreshWorkerUnavailableReason()).toBeNull()
      const error = reportConversationRefreshWorkerUnavailable('refresh')
      expect(error).toMatchObject({
        name: 'ConversationRefreshWorkerUnavailableError',
        message: 'conversation refresh worker unavailable'
      })
      expect(mocks.captureAppError).toHaveBeenCalledWith(
        'main.parser.refresh_worker_unavailable',
        error,
        expect.objectContaining({
          operation: 'refresh',
          main_process_fallback: false
        })
      )
    } finally {
      if (previous === undefined) {
        delete process.env.BLUME_DISABLE_REFRESH_WORKER
      } else {
        process.env.BLUME_DISABLE_REFRESH_WORKER = previous
      }
    }
  })
})
