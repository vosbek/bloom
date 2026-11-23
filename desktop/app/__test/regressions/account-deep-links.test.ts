import { describe, expect, test } from 'vitest'

import {
  accountCallbackToken,
  findAccountCallbackUrl
} from '../../src/main/accountDeepLinks'

describe('account deep links', () => {
  test('extracts the Better Auth token from the registered development callback', () => {
    const url = 'blume-dev://auth/callback#token=encoded%2Btoken%3D'

    expect(accountCallbackToken(url, 'blume-dev')).toBe('encoded%2Btoken%3D')
    expect(findAccountCallbackUrl(['Electron', '/workspace/apps/desktop', url], 'blume-dev')).toBe(
      url
    )
  })

  test('rejects other schemes, routes, and empty callback tokens', () => {
    expect(accountCallbackToken('codes.blume://auth/callback#token=value', 'blume-dev')).toBeNull()
    expect(accountCallbackToken('blume-dev://setup/codex#token=value', 'blume-dev')).toBeNull()
    expect(accountCallbackToken('blume-dev://auth/callback#token=', 'blume-dev')).toBeNull()
    expect(findAccountCallbackUrl(['Electron', 'blume-dev://agents'], 'blume-dev')).toBeNull()
  })
})
