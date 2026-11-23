import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const getAll = vi.fn(async () => ({}))
  const persist = vi.fn(async () => undefined)
  return {
    getAll,
    persist,
    storage: { getAll, set: persist }
  }
})

vi.mock('../../src/main/db/index', () => ({
  getDbPath: () => '/tmp/settings-non-blocking-write.sqlite'
}))

vi.mock('../../src/main/db/sqliteStorage', () => ({
  DB_BUSY_TIMEOUT_MS: 100
}))

vi.mock('../../src/main/db/settingsStorage', () => ({
  getSettingsStorage: () => mocks.storage
}))

import { setSetting, setSettingAsync } from '../../src/main/settingsStore'

beforeEach(() => {
  mocks.getAll.mockClear()
  mocks.persist.mockReset()
  mocks.persist.mockResolvedValue(undefined)
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('non-blocking settings writes', () => {
  test('yields to the event loop before retrying a busy database write', async () => {
    vi.useFakeTimers()
    const busy = Object.assign(new Error('database is locked'), { code: 'SQLITE_BUSY' })
    mocks.persist.mockRejectedValueOnce(busy)

    let settled = false
    let timerFired = false
    const write = setSettingAsync('menuBar.enabled', 'false').then(() => {
      settled = true
    })

    setTimeout(() => {
      timerFired = true
    }, 10)

    await vi.advanceTimersByTimeAsync(10)

    expect(timerFired).toBe(true)
    expect(settled).toBe(false)

    await vi.advanceTimersByTimeAsync(15)
    await write

    expect(mocks.persist).toHaveBeenCalledTimes(2)
    expect(mocks.persist).toHaveBeenLastCalledWith('menuBar.enabled', 'false')
  })

  test('preserves the order of concurrent setting writes', async () => {
    await Promise.all([setSettingAsync('first', '1'), setSettingAsync('second', '2')])

    expect(mocks.persist.mock.calls).toEqual([
      ['first', '1'],
      ['second', '2']
    ])
  })

  test('reports a non-busy persistence error without retrying', async () => {
    const error = new Error('write failed')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    mocks.persist.mockRejectedValueOnce(error)

    setSetting('theme', 'dark')

    await vi.waitFor(() => {
      expect(warn).toHaveBeenCalledWith('[settings] failed to persist setting:', 'theme', error)
    })
    expect(mocks.persist).toHaveBeenCalledTimes(1)
  })

  test('reports a busy persistence error after the retry deadline', async () => {
    vi.useFakeTimers()
    const busy = Object.assign(new Error('database is locked'), { code: 'SQLITE_BUSY' })
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    mocks.persist.mockRejectedValue(busy)

    setSetting('menuBar.enabled', 'false')
    await vi.advanceTimersByTimeAsync(100)

    expect(mocks.persist).toHaveBeenCalledTimes(5)
    expect(warn).toHaveBeenCalledWith(
      '[settings] failed to persist setting:',
      'menuBar.enabled',
      busy
    )
  })
})
