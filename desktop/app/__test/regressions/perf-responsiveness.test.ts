import { describe, expect, test } from 'vitest'
import {
  OVERFLOW_CHANNEL,
  SampleRing,
  createBlockingAttribution,
  createIpcLatencyRecorder,
  createLoopStallTracker,
  createRateLimiter,
  percentile
} from '../../src/main/perfLatency'
import { resetSections, snapshot, timeIpcHandler } from '../../src/main/perf'

describe('main responsiveness bookkeeping', () => {
  test('the sample ring keeps only the most recent samples', () => {
    const ring = new SampleRing(4)
    for (const value of [9, 1, 2, 3, 4, 5]) ring.push(value)
    expect(ring.size).toBe(4)
    expect(ring.sorted()).toEqual([2, 3, 4, 5])
    ring.clear()
    expect(ring.sorted()).toEqual([])
  })

  test('nearest-rank percentiles', () => {
    const sorted = Array.from({ length: 100 }, (_, index) => index + 1)
    expect(percentile(sorted, 50)).toBe(50)
    expect(percentile(sorted, 95)).toBe(95)
    expect(percentile(sorted, 100)).toBe(100)
    expect(percentile([], 95)).toBe(0)
    expect(percentile([7], 50)).toBe(7)
  })

  test('IPC stats are per channel, windowed for percentiles and lifetime for max', () => {
    const recorder = createIpcLatencyRecorder({ sampleWindow: 10, slowCallMinMs: 16 })
    recorder.record('settings:get', 400, 1, 1)
    for (let index = 0; index < 20; index += 1) recorder.record('settings:get', 2, 1, index)
    const stat = recorder.snapshot().channels['settings:get']
    expect(stat.count).toBe(21)
    expect(stat.maxMs).toBe(400)
    // The 400 ms outlier has left the 10-sample window.
    expect(stat.p95Ms).toBe(2)
    expect(stat.overBudget).toBe(1)
    expect(stat.maxSyncMs).toBe(1)
  })

  test('the channel table and slow-call ring are bounded', () => {
    const recorder = createIpcLatencyRecorder({ maxChannels: 3, slowCallCapacity: 2 })
    for (const channel of ['a', 'b', 'c', 'd', 'e']) recorder.record(channel, 20, 0, 1)
    const { channels, slowCalls } = recorder.snapshot()
    expect(Object.keys(channels).sort()).toEqual([OVERFLOW_CHANNEL, 'a', 'b'].sort())
    expect(channels[OVERFLOW_CHANNEL].count).toBe(3)
    expect(slowCalls.map((call) => call.channel)).toEqual(['e', 'd'])
    recorder.reset()
    expect(recorder.snapshot()).toMatchObject({ channels: {}, slowCalls: [] })
  })

  test('fast calls do not enter the slow-call ring or exceed the budget', () => {
    const recorder = createIpcLatencyRecorder()
    expect(recorder.record('fast', 3, 3, 1)).toEqual({ overBudget: false })
    expect(recorder.record('slow', 51, 0, 1)).toEqual({ overBudget: true })
    expect(recorder.snapshot().slowCalls.map((call) => call.channel)).toEqual(['slow'])
  })

  test('loop stall windows are bounded and count windows over budget', () => {
    const tracker = createLoopStallTracker({ capacity: 3, budgetMs: 50 })
    expect(tracker.push({ at: 1, maxMs: 10, p99Ms: 5, meanMs: 1 })).toEqual({ stalled: false })
    expect(tracker.push({ at: 2, maxMs: 80, p99Ms: 60, meanMs: 2, culprit: 'db:query' })).toEqual({
      stalled: true
    })
    tracker.push({ at: 3, maxMs: 12, p99Ms: 5, meanMs: 1 })
    tracker.push({ at: 4, maxMs: 51, p99Ms: 40, meanMs: 1 })
    const summary = tracker.summary()
    expect(summary.windows.map((window) => window.at)).toEqual([2, 3, 4])
    expect(summary.stallCount).toBe(2)
    expect(summary.worstMs).toBe(80)
    expect(summary.lastStall?.at).toBe(4)
    tracker.reset()
    expect(tracker.summary()).toEqual({ windows: [], stallCount: 0, worstMs: 0, lastStall: null })
  })

  test('blocking attribution names the longest block since it was last taken', () => {
    const attribution = createBlockingAttribution()
    attribution.note('perf:snapshot', 2)
    attribution.note('conversations:list', 70)
    attribution.note('settings:get', 5)
    expect(attribution.take()).toEqual({ label: 'conversations:list', ms: 70 })
    expect(attribution.take()).toBeNull()
  })

  test('warnings are rate limited per key and report what they suppressed', () => {
    const shouldWarn = createRateLimiter({ intervalMs: 1_000, maxKeys: 2 })
    expect(shouldWarn('ipc:a', 0)).toEqual({ emit: true, suppressed: 0 })
    expect(shouldWarn('ipc:a', 10)).toEqual({ emit: false, suppressed: 1 })
    expect(shouldWarn('ipc:a', 20)).toEqual({ emit: false, suppressed: 2 })
    expect(shouldWarn('loop', 20)).toEqual({ emit: true, suppressed: 0 })
    expect(shouldWarn('ipc:a', 1_000)).toEqual({ emit: true, suppressed: 2 })
    // A third key evicts the oldest (`loop`), which then starts fresh.
    shouldWarn('ipc:b', 1_000)
    expect(shouldWarn('loop', 1_001)).toEqual({ emit: true, suppressed: 0 })
  })
})

describe('IPC handler timing', () => {
  test('times sync and async handlers and surfaces them in the snapshot', async () => {
    resetSections()
    expect(timeIpcHandler('test:sync', () => 42)).toBe(42)
    await expect(
      timeIpcHandler(
        'test:async',
        () => new Promise((resolve) => setTimeout(() => resolve('ok'), 5))
      )
    ).resolves.toBe('ok')
    expect(() =>
      timeIpcHandler('test:throws', () => {
        throw new Error('boom')
      })
    ).toThrow('boom')
    await expect(
      timeIpcHandler('test:rejects', () => Promise.reject(new Error('no')))
    ).rejects.toThrow('no')

    const snap = await snapshot()
    expect(Object.keys(snap.ipcHandlers.channels).sort()).toEqual([
      'test:async',
      'test:rejects',
      'test:sync',
      'test:throws'
    ])
    expect(snap.ipcHandlers.channels['test:async'].maxMs).toBeGreaterThanOrEqual(4)
    expect(snap.ipcHandlers.channels['test:async'].maxSyncMs).toBeLessThan(
      snap.ipcHandlers.channels['test:async'].maxMs
    )
    expect(snap.ipcHandlers.budgetMs).toBe(50)
    // The loop monitor stays off in tests until diagnostics ask for it.
    expect(snap.eventLoop).toMatchObject({ enabled: false, current: null, stallCount: 0 })

    resetSections()
    expect((await snapshot()).ipcHandlers.channels).toEqual({})
  })
})
