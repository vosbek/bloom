import { describe, expect, test } from 'vitest'
import { registerPerfIpcHandlers, resetSections, snapshot, track } from '../../src/main/perf'

describe('performance diagnostics', () => {
  test('retains a bounded history and resets it with section diagnostics', async () => {
    resetSections()
    track('diagnostics-test', () => undefined)

    const first = await snapshot()
    expect(first.history.retentionMs).toBe(30 * 60_000)
    expect(first.history.sampleIntervalMs).toBe(5_000)
    expect(first.history.samples).toHaveLength(1)
    expect(first.sections['diagnostics-test']?.count).toBe(1)
    expect(Array.isArray(first.externalProcesses)).toBe(true)
    expect(first.caches).toEqual({})

    resetSections()
    const afterReset = await snapshot()
    expect(afterReset.history.samples).toHaveLength(1)
    expect(afterReset.sections).toEqual({})
  })

  test('registers asynchronous snapshot IPC and reset handlers', async () => {
    const handlers = new Map<string, (...args: unknown[]) => unknown>()
    registerPerfIpcHandlers((channel, listener) => handlers.set(channel, listener))

    const result = await handlers.get('perf:snapshot')?.({})
    expect(result).toMatchObject({ history: { sampleIntervalMs: 5_000 } })
    expect(handlers.get('perf:reset')).toBeTypeOf('function')
  })
})
