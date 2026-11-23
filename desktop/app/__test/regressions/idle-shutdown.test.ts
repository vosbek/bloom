import { afterEach, describe, expect, test, vi } from 'vitest'
import { createIdleShutdown } from '../../src/main/idleShutdown'

afterEach(() => vi.useRealTimers())

describe('idle worker shutdown', () => {
  test('coalesces schedules and can be cancelled before reclaiming a worker', () => {
    vi.useFakeTimers()
    const shutdown = vi.fn()
    const idle = createIdleShutdown(1_000, shutdown)

    idle.schedule()
    vi.advanceTimersByTime(500)
    idle.schedule()
    vi.advanceTimersByTime(999)
    expect(shutdown).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(shutdown).toHaveBeenCalledOnce()

    idle.schedule()
    idle.cancel()
    vi.runAllTimers()
    expect(shutdown).toHaveBeenCalledOnce()
  })
})
