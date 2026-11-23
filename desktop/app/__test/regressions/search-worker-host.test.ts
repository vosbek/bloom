import { EventEmitter } from 'node:events'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { GlobalSearchPage, GlobalSearchQuery } from '@blume/storage-port'

const mocks = vi.hoisted(() => ({
  fork: vi.fn(),
  captureAppError: vi.fn(async () => undefined)
}))

vi.mock('electron', () => ({ utilityProcess: { fork: mocks.fork } }))
vi.mock('../../src/main/db', () => ({ getDbPath: () => '/tmp/blume-search-test.sqlite' }))
vi.mock('../../src/main/telemetry', () => ({ captureAppError: mocks.captureAppError }))

class FakeWorker extends EventEmitter {
  posted: Array<{ type: string; id: number }> = []
  killed = false
  postMessage(message: { type: string; id: number }): void {
    this.posted.push(message)
  }
  kill(): boolean {
    this.killed = true
    return true
  }
  answer(id: number, page: GlobalSearchPage): void {
    this.emit('message', { type: 'search-result', id, ok: true, page })
  }
}

const input: GlobalSearchQuery = { query: 'worker', categories: ['messages'] }
const page = (title: string): GlobalSearchPage => ({
  results: [
    {
      id: title,
      category: 'suggestions',
      title,
      subtitle: null,
      excerpt: null,
      rank: 0,
      updatedAt: 0,
      suggestionId: title,
      status: 'active'
    }
  ],
  truncated: false
})

describe('desktop search worker host', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.fork.mockReset()
    mocks.captureAppError.mockClear()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('cools down and emits bounded telemetry after worker spawn failure', async () => {
    mocks.fork.mockImplementation(() => {
      throw new Error('worker unavailable')
    })
    const { searchViaUtilityProcess } = await import('../../src/main/search/searchHost')

    await expect(searchViaUtilityProcess(input)).rejects.toThrow('worker unavailable')
    await expect(searchViaUtilityProcess(input)).rejects.toThrow('circuit breaker is cooling down')

    expect(mocks.fork).toHaveBeenCalledTimes(1)
    expect(mocks.captureAppError).toHaveBeenCalledTimes(1)
    expect(mocks.captureAppError).toHaveBeenCalledWith(
      'main.search.worker_unavailable',
      expect.any(Error),
      { phase: 'spawn', main_process_fallback: false }
    )
  })

  it('keeps one warm worker, supersedes older queries and drops their late answers', async () => {
    const worker = new FakeWorker()
    mocks.fork.mockReturnValue(worker)
    const { searchViaUtilityProcess } = await import('../../src/main/search/searchHost')

    const first = searchViaUtilityProcess(input)
    const second = searchViaUtilityProcess({ ...input, query: 'worker two' })
    // The superseded caller is answered at once with an empty page.
    // A replaced search tells its caller so, instead of answering an empty page.
    await expect(first).rejects.toMatchObject({ name: 'SearchSupersededError' })
    const [firstRequest, secondRequest] = worker.posted
    expect(firstRequest?.id).toBeLessThan(secondRequest?.id ?? 0)

    worker.answer(firstRequest!.id, page('stale'))
    worker.answer(secondRequest!.id, page('fresh'))
    await expect(second).resolves.toEqual(page('fresh'))

    const third = searchViaUtilityProcess(input)
    worker.answer(worker.posted[2]!.id, page('third'))
    await expect(third).resolves.toEqual(page('third'))
    // One process for every query, and it is still alive.
    expect(mocks.fork).toHaveBeenCalledTimes(1)
    expect(worker.killed).toBe(false)
  })

  it('times out, stops the worker and cools down without a main-process fallback', async () => {
    vi.useFakeTimers()
    const worker = new FakeWorker()
    mocks.fork.mockReturnValue(worker)
    const { searchViaUtilityProcess, SEARCH_TIMEOUT_MS } =
      await import('../../src/main/search/searchHost')
    const pending = searchViaUtilityProcess(input)
    const rejection = expect(pending).rejects.toThrow('search worker timed out')
    vi.advanceTimersByTime(SEARCH_TIMEOUT_MS)
    await rejection
    expect(worker.killed).toBe(true)
    await expect(searchViaUtilityProcess(input)).rejects.toThrow('cooling down')
    expect(mocks.captureAppError).toHaveBeenCalledWith(
      'main.search.worker_unavailable',
      expect.any(Error),
      { phase: 'timeout', main_process_fallback: false }
    )
  })

  it('a failed query rejects only itself and the worker stays warm', async () => {
    const worker = new FakeWorker()
    mocks.fork.mockReturnValue(worker)
    const { searchViaUtilityProcess } = await import('../../src/main/search/searchHost')
    const failing = searchViaUtilityProcess(input)
    worker.emit('message', {
      type: 'search-result',
      id: worker.posted[0]!.id,
      ok: false,
      errorMessage: 'no such column'
    })
    await expect(failing).rejects.toThrow('no such column')
    const next = searchViaUtilityProcess(input)
    worker.answer(worker.posted[1]!.id, page('ok'))
    await expect(next).resolves.toEqual(page('ok'))
    expect(mocks.fork).toHaveBeenCalledTimes(1)
  })

  it('stops the idle worker after five minutes and starts a new one on the next query', async () => {
    vi.useFakeTimers()
    const workers = [new FakeWorker(), new FakeWorker()]
    mocks.fork.mockImplementation(() => workers.shift())
    const { searchViaUtilityProcess, SEARCH_IDLE_MS } =
      await import('../../src/main/search/searchHost')
    const first = searchViaUtilityProcess(input)
    const worker = mocks.fork.mock.results[0]!.value as FakeWorker
    worker.answer(worker.posted[0]!.id, page('one'))
    await first
    vi.advanceTimersByTime(SEARCH_IDLE_MS)
    expect(worker.killed).toBe(true)
    void searchViaUtilityProcess(input)
    expect(mocks.fork).toHaveBeenCalledTimes(2)
  })
})
