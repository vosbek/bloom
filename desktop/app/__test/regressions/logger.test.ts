import { homedir } from 'node:os'
import { beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  debug: vi.fn(),
  destination: vi.fn(() => ({})),
  error: vi.fn(),
  fatal: vi.fn(),
  info: vi.fn(),
  isoTime: vi.fn(),
  mkdirSync: vi.fn(),
  warn: vi.fn()
}))

vi.mock('fs', () => ({
  mkdirSync: mocks.mkdirSync
}))

vi.mock('electron', () => ({
  app: {
    getPath: vi.fn(() => '/tmp/blume-logger-test'),
    getVersion: vi.fn(() => '1.0.56-test')
  }
}))

vi.mock('pino', () => {
  const pino = Object.assign(
    vi.fn(() => ({
      debug: mocks.debug,
      error: mocks.error,
      fatal: mocks.fatal,
      flush: vi.fn(),
      info: mocks.info,
      warn: mocks.warn
    })),
    {
      destination: mocks.destination,
      stdTimeFunctions: {
        isoTime: mocks.isoTime
      }
    }
  )

  return { default: pino }
})

describe('desktop logger', () => {
  beforeEach(() => {
    vi.resetModules()
    for (const mock of Object.values(mocks)) mock.mockClear()
  })

  test('normalizes a top-level Error message without throwing and preserves its details', async () => {
    const error = new Error(`native update failed under ${homedir()}/Library/Caches/Blume`)
    const { writeAppLog } = await import('../../src/main/logger')

    expect(() => writeAppLog('warn', 'main.updater', error)).not.toThrow()

    expect(mocks.warn).toHaveBeenCalledTimes(1)
    const [record, message] = mocks.warn.mock.calls[0] as [Record<string, unknown>, string]
    expect(message).toBe('Error: native update failed under ~/Library/Caches/Blume')
    expect(record).toMatchObject({
      runtime: 'main',
      source: 'main.updater',
      err: {
        name: 'Error',
        message: 'native update failed under ~/Library/Caches/Blume'
      }
    })
  })
})
