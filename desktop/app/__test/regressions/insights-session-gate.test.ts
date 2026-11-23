import { describe, expect, test } from 'vitest'

import { sessionWindowQuietScore, sessionWindowReady } from '@blume/app-core'

describe('insights session gate', () => {
  test('smart timing opens only near reset with enough unused quota', () => {
    const now = 1_000

    expect(
      sessionWindowReady(
        { id: 'session', label: 'Session', usedPercent: 50, resetsAt: now + 10 * 60_000 },
        now
      )
    ).toBe(true)

    expect(
      sessionWindowReady(
        { id: 'session', label: 'Session', usedPercent: 50, resetsAt: now + 30 * 60_000 },
        now
      )
    ).toBe(false)

    expect(
      sessionWindowReady(
        { id: 'session', label: 'Session', usedPercent: 80, resetsAt: now + 10 * 60_000 },
        now
      )
    ).toBe(false)
  })

  test('quiet-chats score prefers more unused quota and less reset time', () => {
    const now = 1_000

    const urgentUnused = sessionWindowQuietScore(
      { id: 'session', label: 'Session', usedPercent: 40, resetsAt: now + 10 * 60_000 },
      now
    )
    const laterMoreUnused = sessionWindowQuietScore(
      { id: 'session', label: 'Session', usedPercent: 10, resetsAt: now + 60 * 60_000 },
      now
    )

    expect(urgentUnused).not.toBeNull()
    expect(laterMoreUnused).not.toBeNull()
    expect(urgentUnused!).toBeGreaterThan(laterMoreUnused!)
  })

  test('quiet-chats score ignores expired or unmeasurable windows', () => {
    const now = 1_000

    expect(
      sessionWindowQuietScore(
        { id: 'session', label: 'Session', usedPercent: 40, resetsAt: now },
        now
      )
    ).toBeNull()
    expect(
      sessionWindowQuietScore(
        { id: 'session', label: 'Session', usedPercent: null, resetsAt: now + 60_000 },
        now
      )
    ).toBeNull()
  })
})
