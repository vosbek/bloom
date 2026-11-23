import { EventEmitter } from 'node:events'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  fork: vi.fn(),
  captureAppError: vi.fn(async () => undefined)
}))

vi.mock('electron', () => ({ utilityProcess: { fork: mocks.fork } }))
vi.mock('../../src/main/db', () => ({ getDbPath: () => '/tmp/blume-search-index-test.sqlite' }))
vi.mock('../../src/main/telemetry', () => ({ captureAppError: mocks.captureAppError }))

class FakeWorker extends EventEmitter {
  posted: Array<{ type: string; id: number; commits: boolean }> = []
  killed = false
  postMessage(message: { type: string; id: number; commits: boolean }): void {
    this.posted.push(message)
  }
  kill(): boolean {
    this.killed = true
    return true
  }
}

const progress = {
  phase: 'backfill',
  backfilledRows: 5000,
  backfillDone: false,
  repositories: 0,
  commits: 0,
  errors: 0
}

describe('desktop search index host', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.useFakeTimers()
    mocks.fork.mockReset()
    mocks.captureAppError.mockClear()
  })
  afterEach(() => vi.useRealTimers())

  it('waits for startup to settle, then runs one pass at a time on an interval', async () => {
    const workers: FakeWorker[] = []
    mocks.fork.mockImplementation(() => {
      const worker = new FakeWorker()
      workers.push(worker)
      return worker
    })
    const host = await import('../../src/main/search/searchIndexHost')
    const { SEARCH_INDEX_START_DELAY_MS, SEARCH_INDEX_INTERVAL_MS } =
      await import('@blume/app-core/features/search/searchIndexing')
    host.startSearchIndexing()
    expect(mocks.fork).not.toHaveBeenCalled()
    vi.advanceTimersByTime(SEARCH_INDEX_START_DELAY_MS)
    expect(mocks.fork).toHaveBeenCalledTimes(1)
    expect(workers[0]?.posted[0]).toMatchObject({ type: 'run', commits: true })
    // A pass is running: no second worker.
    expect(host.runSearchIndexPassNow()).toBe(false)
    const id = workers[0]!.posted[0]!.id
    workers[0]!.emit('message', { type: 'done', id, ok: true, progress, durationMs: 10 })
    vi.advanceTimersByTime(SEARCH_INDEX_INTERVAL_MS)
    expect(mocks.fork).toHaveBeenCalledTimes(2)
    host.disposeSearchIndexing()
    expect(workers[1]?.posted.at(-1)).toMatchObject({ type: 'stop' })
    expect(workers[1]?.killed).toBe(true)
    // A pass that finished is not asked to stop.
    expect(workers[0]?.posted.some((message) => message.type === 'stop')).toBe(false)
  })

  it('heartbeats keep a long pass alive; silence stops it and cools down', async () => {
    const worker = new FakeWorker()
    mocks.fork.mockReturnValue(worker)
    const host = await import('../../src/main/search/searchIndexHost')
    expect(host.runSearchIndexPassNow()).toBe(true)
    const id = worker.posted[0]!.id
    for (let beat = 0; beat < 3; beat += 1) {
      vi.advanceTimersByTime(host.SEARCH_INDEX_INACTIVITY_MS - 1_000)
      worker.emit('message', { type: 'progress', id, progress })
    }
    expect(worker.killed).toBe(false)
    vi.advanceTimersByTime(host.SEARCH_INDEX_INACTIVITY_MS)
    expect(worker.killed).toBe(true)
    // Asked to stop first, so the worker aborts and kills its Git subprocess (as SIGTERM does).
    expect(worker.posted.at(-1)).toEqual({ type: 'stop', id })
    expect(mocks.captureAppError).toHaveBeenCalledWith(
      'main.search.index_worker_failed',
      expect.any(Error),
      { phase: 'timeout', main_process_fallback: false }
    )
    expect(host.runSearchIndexPassNow()).toBe(false)
    vi.advanceTimersByTime(host.SEARCH_INDEX_RETRY_COOLDOWN_MS)
    expect(host.runSearchIndexPassNow()).toBe(true)
    host.disposeSearchIndexing()
  })
})
