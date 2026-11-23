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
  return { handlers, worker, fork: vi.fn(() => worker) }
})

vi.mock('electron', () => ({ utilityProcess: { fork: mocks.fork } }))

type TerminalHostModule = typeof import('../../src/main/terminal/host')
type BackgroundActivityModule = typeof import('../../src/main/backgroundProcessActivity')
let terminalHost: TerminalHostModule | null = null
let backgroundActivity: BackgroundActivityModule | null = null

function postedRequests(): Array<Record<string, unknown>> {
  return mocks.worker.postMessage.mock.calls.map(([message]) => message as Record<string, unknown>)
}

function respond(requestId: number, tabId: string): void {
  mocks.handlers.message?.({
    type: 'response',
    requestId,
    ok: true,
    tab: {
      id: tabId,
      harnessId: 'shell',
      title: 'Terminal',
      status: 'running',
      cwd: '/repo'
    }
  })
}

describe('embedded terminal worker host lifecycle', () => {
  beforeEach(async () => {
    vi.resetModules()
    vi.useRealTimers()
    mocks.handlers.message = null
    mocks.handlers.exit = null
    mocks.fork.mockClear()
    mocks.worker.on.mockClear()
    mocks.worker.postMessage.mockReset()
    mocks.worker.kill.mockReset()
    terminalHost = await import('../../src/main/terminal/host')
    backgroundActivity = await import('../../src/main/backgroundProcessActivity')
    backgroundActivity.resetBackgroundProcessActivity()
  })

  afterEach(() => {
    terminalHost?.disposeTerminalWorker()
    backgroundActivity?.resetBackgroundProcessActivity()
    terminalHost = null
    backgroundActivity = null
    vi.useRealTimers()
  })

  it('serializes opens so the eight-terminal capacity check is atomic', async () => {
    let tab = 0
    mocks.worker.postMessage.mockImplementation((message: { type: string; requestId: number }) => {
      if (message.type !== 'open') return
      const tabId = `tab-${++tab}`
      queueMicrotask(() => respond(message.requestId, tabId))
    })

    const results = await Promise.allSettled(
      Array.from({ length: 9 }, () =>
        terminalHost!.openTerminalPage({ harnessId: 'shell', cwd: '/repo' })
      )
    )

    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(8)
    expect(results.filter((result) => result.status === 'rejected')).toEqual([
      expect.objectContaining({
        reason: expect.objectContaining({ message: 'Blume supports at most 8 open terminals' })
      })
    ])
    expect(postedRequests().filter((request) => request.type === 'open')).toHaveLength(8)
  })

  it('terminates the worker on timeout and ignores a late open result', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    const ipc = new Map<string, (...args: unknown[]) => unknown>()
    terminalHost!.registerTerminalIpcHandlers(
      ((channel, handler) => ipc.set(channel, handler)) as never,
      { broadcast: vi.fn() }
    )

    const opening = terminalHost!.openTerminalPage({ harnessId: 'shell', cwd: '/repo' })
    await vi.waitFor(() => expect(postedRequests()).toHaveLength(1))
    expect(backgroundActivity!.getBackgroundProcessActiveRequestCount('blume-terminal')).toBe(1)
    const rejection = expect(opening).rejects.toMatchObject({
      name: 'TerminalWorkerUnavailableError',
      message: 'Terminal worker timed out and was terminated'
    })
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(15_000)
    await rejection

    expect(mocks.worker.kill).toHaveBeenCalledTimes(1)
    expect(backgroundActivity!.getBackgroundProcessActiveRequestCount('blume-terminal')).toBe(0)
    mocks.handlers.message?.({
      type: 'status',
      tab: {
        id: 'late-tab',
        harnessId: 'shell',
        title: 'Terminal',
        status: 'running',
        cwd: '/repo'
      }
    })
    expect(ipc.get('terminal:list')?.()).toEqual([])
  })

  it('keeps a tab until close is acknowledged while the worker is alive', async () => {
    const ipc = new Map<string, (...args: unknown[]) => unknown>()
    terminalHost!.registerTerminalIpcHandlers(
      ((channel, handler) => ipc.set(channel, handler)) as never,
      { broadcast: vi.fn() }
    )
    const opening = terminalHost!.openTerminalPage({ harnessId: 'shell', cwd: '/repo' })
    await vi.waitFor(() => expect(postedRequests()).toHaveLength(1))
    expect(backgroundActivity!.getBackgroundProcessActiveRequestCount('blume-terminal')).toBe(1)
    respond(postedRequests()[0]!.requestId as number, 'close-me')
    await opening
    expect(backgroundActivity!.getBackgroundProcessActiveRequestCount('blume-terminal')).toBe(0)

    const closing = ipc.get('terminal:close')?.({}, 'close-me') as Promise<void>
    await vi.waitFor(() => expect(postedRequests()).toHaveLength(2))
    mocks.handlers.message?.({
      type: 'response',
      requestId: postedRequests()[1]!.requestId,
      ok: false,
      errorMessage: 'close failed'
    })

    await expect(closing).rejects.toThrow('close failed')
    expect(ipc.get('terminal:list')?.()).toEqual([
      expect.objectContaining({ id: 'close-me', status: 'running' })
    ])
  })

  it('clears active request tracking when the terminal worker is disposed', async () => {
    const opening = terminalHost!.openTerminalPage({ harnessId: 'shell', cwd: '/repo' })
    const result = opening.catch((error: unknown) => error)
    await vi.waitFor(() => expect(postedRequests()).toHaveLength(1))
    expect(backgroundActivity!.getBackgroundProcessActiveRequestCount('blume-terminal')).toBe(1)

    terminalHost!.disposeTerminalWorker()

    await expect(result).resolves.toMatchObject({ message: 'Terminal worker disposed' })
    expect(backgroundActivity!.getBackgroundProcessActiveRequestCount('blume-terminal')).toBe(0)
  })

  it('buffers output when every attached renderer has been destroyed', async () => {
    const ipc = new Map<string, (...args: unknown[]) => unknown>()
    terminalHost!.registerTerminalIpcHandlers(
      ((channel, handler) => ipc.set(channel, handler)) as never,
      { broadcast: vi.fn() }
    )
    const opening = terminalHost!.openTerminalPage({ harnessId: 'shell', cwd: '/repo' })
    await vi.waitFor(() => expect(postedRequests()).toHaveLength(1))
    respond(postedRequests()[0]!.requestId as number, 'buffer-me')
    await opening

    const destroyed = { isDestroyed: () => true, send: vi.fn() }
    expect(ipc.get('terminal:attach')?.({ sender: destroyed }, 'buffer-me')).toBe('')
    mocks.handlers.message?.({ type: 'output', tabId: 'buffer-me', data: 'still here' })

    const live = { isDestroyed: () => false, send: vi.fn() }
    expect(ipc.get('terminal:attach')?.({ sender: live }, 'buffer-me')).toBe('still here')
    expect(destroyed.send).not.toHaveBeenCalled()
  })
})
