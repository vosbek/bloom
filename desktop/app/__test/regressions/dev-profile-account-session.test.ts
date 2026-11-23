import { describe, expect, test } from 'vitest'
import { createFixtureHost } from '@blume/sidecar-ui/testing'
import { createDevProfileHost } from '../../src/renderer/src/lib/devProfileHost'

describe('development profile account sessions', () => {
  test.each(['ui', 'conversations', 'native'] as const)(
    '%s presents the account gate for a signed-out launch',
    async (profile) => {
      const realHost = createFixtureHost()
      const profileHost = await createDevProfileHost(realHost, profile, true)

      expect(await profileHost.account.getSession()).toBeNull()
    }
  )

  test('lightweight profiles retain their fixture account by default', async () => {
    const realHost = createFixtureHost()
    const profileHost = await createDevProfileHost(realHost, 'ui')

    expect(await profileHost.account.getSession()).not.toBeNull()
  })
})
