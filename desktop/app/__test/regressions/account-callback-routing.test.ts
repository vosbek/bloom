import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const authenticate = vi.fn()
  const setupMain = vi.fn()
  return {
    channel: 'stable',
    electronClient: vi.fn(() => ({ id: 'electron' })),
    authenticate,
    setupMain,
    authClient: {
      authenticate,
      getCookie: vi.fn(() => '__Secure-better-auth-release.session_token=stored-session'),
      setupMain,
      requestAuth: vi.fn(),
      getSession: vi.fn(),
      listAccounts: vi.fn()
    }
  }
})

vi.mock('electron', () => ({
  app: {
    getVersion: () => '1.0.69',
    userAgentFallback: 'Blume/1.0.69'
  },
  BrowserWindow: {
    getFocusedWindow: () => null
  }
}))

vi.mock('better-auth/client', () => ({
  createAuthClient: () => mocks.authClient
}))

vi.mock('better-auth/client/plugins', () => ({
  adminClient: () => ({ id: 'admin' })
}))

vi.mock('@better-auth/electron/client', () => ({
  electronClient: mocks.electronClient,
  normalizeUserOutput: (value: unknown) => value
}))

vi.mock('../../src/main/blume-user-host', () => ({
  getOrCreateBlumeDeviceId: vi.fn(),
  getOrCreateBlumeId: vi.fn()
}))

vi.mock('../../src/main/secureStore', () => ({
  getSecret: vi.fn(),
  setSecret: vi.fn()
}))

vi.mock('../../src/main/releaseMetadata', () => ({
  resolveDesktopReleaseMetadata: () => ({
    version: '1.0.69',
    channel: mocks.channel,
    sourceSha: null,
    bundleId: null
  })
}))

describe('desktop account callback routing', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.channel = 'stable'
    mocks.electronClient.mockClear()
    mocks.authenticate.mockReset()
    mocks.setupMain.mockReset()
    mocks.authenticate.mockResolvedValue({ data: {}, error: null })
    mocks.authClient.requestAuth.mockReset().mockResolvedValue(undefined)
    mocks.authClient.getSession.mockReset()
    mocks.authClient.listAccounts.mockReset().mockResolvedValue({ data: [], error: null })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  test.each(['stable', 'canary'])(
    'waits for the %s callback and rejects the other app without session polling',
    async (channel) => {
      mocks.channel = channel
      const scheme = channel === 'canary' ? 'codes.blume-canary' : 'codes.blume'
      const otherScheme = channel === 'canary' ? 'codes.blume' : 'codes.blume-canary'
      vi.useFakeTimers()
      let signedIn = false
      mocks.authenticate.mockImplementation(async () => {
        signedIn = true
        return { data: {}, error: null }
      })
      const session = {
        session: { expiresAt: new Date(Date.now() + 600_000).toISOString() },
        user: { id: 'synthetic', name: 'Preview', email: 'preview@example.invalid' }
      }
      mocks.authClient.getSession.mockImplementation(async ({ fetchOptions }) => {
        const data = signedIn ? session : null
        await fetchOptions.onResponse({ response: Response.json(data) })
        return { data, error: null }
      })
      const { deliveryAccounts, handleAccountDeepLink } = await import('../../src/main/accounts')
      const pending = deliveryAccounts.signInSocial('google')
      await vi.advanceTimersByTimeAsync(65_000)
      expect(mocks.authClient.getSession).not.toHaveBeenCalled()
      expect(mocks.electronClient).toHaveBeenCalledWith(
        expect.objectContaining({ protocol: { scheme } })
      )
      expect(mocks.authClient.requestAuth).toHaveBeenCalledWith({
        provider: 'google',
        signal: expect.any(AbortSignal),
        ...(channel === 'canary' ? { additionalData: { callbackScheme: scheme } } : {})
      })
      await expect(
        handleAccountDeepLink(`${otherScheme}://auth/callback#token=wrong-app`)
      ).resolves.toBe(false)
      expect(mocks.authenticate).not.toHaveBeenCalled()
      await handleAccountDeepLink(`${scheme}://auth/callback#token=delayed-callback`)
      await expect(pending).resolves.toMatchObject({ user: { id: 'synthetic' } })
      expect(mocks.authClient.getSession).toHaveBeenCalledTimes(1)
      expect(vi.getTimerCount()).toBe(0)
    }
  )

  test('a cancelled browser flow times out without session reads and allows another attempt', async () => {
    vi.useFakeTimers()
    const { deliveryAccounts } = await import('../../src/main/accounts')
    const first = expect(deliveryAccounts.signInSocial('github')).rejects.toThrow(
      'Social sign-in timed out.'
    )
    await vi.advanceTimersByTimeAsync(120_000)
    await first
    const second = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow(
      'Social sign-in timed out.'
    )
    await vi.advanceTimersByTimeAsync(120_000)
    await second
    expect(mocks.authClient.getSession).not.toHaveBeenCalled()
    expect(mocks.authClient.requestAuth).toHaveBeenCalledTimes(2)
    expect(vi.getTimerCount()).toBe(0)
  })

  test('cancel releases the lock immediately, stops timers, and ignores a late callback', async () => {
    vi.useFakeTimers()
    const { deliveryAccounts, handleAccountDeepLink } = await import('../../src/main/accounts')
    const first = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow(
      'Social sign-in was cancelled.'
    )
    const firstSignal = mocks.authClient.requestAuth.mock.calls[0][0].signal
    await expect(deliveryAccounts.cancelSocialSignIn()).resolves.toBe(true)
    expect(firstSignal.aborted).toBe(true)
    await first
    await expect(
      handleAccountDeepLink('codes.blume://auth/callback#token=abandoned')
    ).resolves.toBe(true)
    expect(mocks.authenticate).not.toHaveBeenCalled()
    expect(mocks.authClient.getSession).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
    const second = expect(deliveryAccounts.signInSocial('github')).rejects.toThrow(
      'Social sign-in was cancelled.'
    )
    expect(mocks.authClient.requestAuth).toHaveBeenCalledTimes(2)
    await deliveryAccounts.cancelSocialSignIn()
    await second
    expect(vi.getTimerCount()).toBe(0)
  })

  test('cancel while opening the browser does not let old cleanup unlock the next attempt', async () => {
    vi.useFakeTimers()
    let opened!: () => void
    mocks.authClient.requestAuth.mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          opened = resolve
        })
    )
    const { deliveryAccounts } = await import('../../src/main/accounts')
    const first = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow('cancelled')
    await deliveryAccounts.cancelSocialSignIn()
    const second = expect(deliveryAccounts.signInSocial('github')).rejects.toThrow('cancelled')
    opened()
    await first
    await expect(deliveryAccounts.signInSocial('google')).rejects.toThrow('already in progress')
    await deliveryAccounts.cancelSocialSignIn()
    await second
    expect(vi.getTimerCount()).toBe(0)
  })

  test('cancelling an exchange in flight prevents session reads and account change notifications', async () => {
    vi.useFakeTimers()
    let finish!: () => void
    mocks.authenticate.mockImplementation(
      ({ fetchOptions }) =>
        new Promise((resolve) => {
          finish = () => {
            expect(fetchOptions.signal.aborted).toBe(true)
            resolve({ data: {}, error: null })
          }
        })
    )
    const { deliveryAccounts, handleAccountDeepLink } = await import('../../src/main/accounts')
    const changed = vi.fn()
    deliveryAccounts.onChanged!(changed)
    const pending = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow('cancelled')
    const callback = expect(
      handleAccountDeepLink('codes.blume://auth/callback#token=in-flight')
    ).rejects.toThrow('cancelled')
    await deliveryAccounts.cancelSocialSignIn()
    await pending
    finish()
    await callback
    expect(changed).not.toHaveBeenCalled()
    expect(mocks.authClient.getSession).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  test('a committed sign-in wins a late Cancel while its session finishes loading', async () => {
    let finish!: () => void
    mocks.authenticate.mockImplementation(async ({ fetchOptions }) => {
      fetchOptions.onSuccess()
      await new Promise<void>((resolve) => {
        finish = resolve
      })
      return { data: {}, error: null }
    })
    const data = {
      session: { expiresAt: new Date(Date.now() + 600_000).toISOString() },
      user: { id: 'committed', name: 'Test', email: 'test@example.invalid' }
    }
    mocks.authClient.getSession.mockImplementation(async ({ fetchOptions }) => {
      await fetchOptions.onResponse({ response: Response.json(data) })
      return { data, error: null }
    })
    const { deliveryAccounts, handleAccountDeepLink } = await import('../../src/main/accounts')
    const pending = deliveryAccounts.signInSocial('google')
    const callback = handleAccountDeepLink('codes.blume://auth/callback#token=committed')
    await expect(deliveryAccounts.cancelSocialSignIn()).resolves.toBe(false)
    finish()
    await callback
    await expect(pending).resolves.toMatchObject({ user: { id: 'committed' } })
  })

  test('development cancellation closes the local callback server before retry', async () => {
    const original = Object.getOwnPropertyDescriptor(process, 'defaultApp')
    Object.defineProperty(process, 'defaultApp', { configurable: true, value: true })
    try {
      const { deliveryAccounts } = await import('../../src/main/accounts')
      const pending = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow('cancelled')
      await vi.waitFor(() => expect(mocks.authClient.requestAuth).toHaveBeenCalledOnce())
      const callbackUrl = mocks.authClient.requestAuth.mock.calls[0][0].additionalData.callbackUrl
      await deliveryAccounts.cancelSocialSignIn()
      await pending
      await expect(fetch(callbackUrl + '?token=abandoned')).rejects.toThrow()
      expect(mocks.authenticate).not.toHaveBeenCalled()
      expect(mocks.authClient.getSession).not.toHaveBeenCalled()
    } finally {
      if (original) Object.defineProperty(process, 'defaultApp', original)
      else Reflect.deleteProperty(process, 'defaultApp')
    }
  })

  test('rejects overlapping provider attempts before opening another browser', async () => {
    vi.useFakeTimers()
    const { deliveryAccounts } = await import('../../src/main/accounts')
    const first = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow(
      'Social sign-in timed out.'
    )
    await expect(deliveryAccounts.signInSocial('github')).rejects.toThrow(
      'A browser sign-in is already in progress.'
    )
    expect(mocks.authClient.requestAuth).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(120_000)
    await first
  })

  test('does not load a session after an invalid callback exchange', async () => {
    vi.useFakeTimers()
    mocks.authenticate.mockResolvedValue({ data: null, error: { message: 'Invalid code' } })
    const { deliveryAccounts, handleAccountDeepLink } = await import('../../src/main/accounts')
    const pending = expect(deliveryAccounts.signInSocial('google')).rejects.toThrow(
      'Social sign-in timed out.'
    )
    await expect(
      handleAccountDeepLink('codes.blume://auth/callback#token=invalid')
    ).rejects.toThrow('Invalid code')
    await vi.advanceTimersByTimeAsync(120_000)
    await pending
    expect(mocks.authClient.getSession).not.toHaveBeenCalled()
  })

  test('cleans up when opening the browser fails', async () => {
    vi.useFakeTimers()
    mocks.authClient.requestAuth.mockRejectedValue(new Error('Browser unavailable'))
    const { deliveryAccounts, handleAccountDeepLink } = await import('../../src/main/accounts')
    await expect(deliveryAccounts.signInSocial('google')).rejects.toThrow('Browser unavailable')
    await handleAccountDeepLink('codes.blume://auth/callback#token=later-callback')
    expect(mocks.authClient.getSession).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })

  test.each(['stable', 'canary', 'development'])(
    'exchanges a packaged %s cold-start callback exactly once',
    async (channel) => {
      mocks.channel = channel
      const scheme = channel === 'canary' ? 'codes.blume-canary' : 'codes.blume'
      const { handleAccountDeepLinkFromArgv } = await import('../../src/main/accounts')

      await expect(
        handleAccountDeepLinkFromArgv(['Blume', `${scheme}://auth/callback#token=cold-start-token`])
      ).resolves.toBe(true)
      expect(mocks.authenticate).toHaveBeenCalledTimes(1)
      expect(mocks.authenticate).toHaveBeenCalledWith({ token: 'cold-start-token' })
    }
  )

  test('shares one authenticate call for concurrent duplicate callback deliveries', async () => {
    let resolveAuthenticate!: (value: { data: unknown; error: null }) => void
    mocks.authenticate.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveAuthenticate = resolve
        })
    )
    const { handleAccountDeepLink } = await import('../../src/main/accounts')
    const url = 'codes.blume://auth/callback#token=shared-callback-token'

    const first = handleAccountDeepLink(url)
    const second = handleAccountDeepLink(url)

    expect(mocks.authenticate).toHaveBeenCalledTimes(1)
    resolveAuthenticate({ data: {}, error: null })
    await expect(Promise.all([first, second])).resolves.toEqual([true, true])
    expect(mocks.authenticate).toHaveBeenCalledTimes(1)
  })

  test('propagates Code verifier not found from authenticate without swallowing it', async () => {
    const error = Object.assign(new Error('Code verifier not found.'), {
      name: 'BetterAuthError'
    })
    mocks.authenticate.mockRejectedValue(error)
    const { handleAccountDeepLink } = await import('../../src/main/accounts')

    await expect(
      handleAccountDeepLink('codes.blume://auth/callback#token=stale-callback-token')
    ).rejects.toBe(error)
    expect(mocks.authenticate).toHaveBeenCalledTimes(1)
  })

  test.each(['stable', 'canary'])(
    'acknowledges %s only after authenticate stores the cookie',
    async (channel) => {
      mocks.channel = channel
      const scheme = channel === 'canary' ? 'codes.blume-canary' : 'codes.blume'
      let finish!: (value: { data: unknown; error: null }) => void
      mocks.authenticate.mockImplementation(
        () =>
          new Promise((resolve) => {
            finish = resolve
          })
      )
      const fetcher = vi.fn().mockResolvedValue(Response.json({ confirmed: true }))
      vi.stubGlobal('fetch', fetcher)
      const { handleAccountDeepLink } = await import('../../src/main/accounts')
      const code = Buffer.from(
        JSON.stringify({ identifier: 'a'.repeat(32), state: 'test' })
      ).toString('base64url')
      const otherScheme = channel === 'canary' ? 'codes.blume' : 'codes.blume-canary'
      await expect(
        handleAccountDeepLink(`${otherScheme}://auth/callback#token=` + code)
      ).resolves.toBe(false)
      expect(mocks.authenticate).not.toHaveBeenCalled()
      expect(fetcher).not.toHaveBeenCalled()
      const pending = handleAccountDeepLink(`${scheme}://auth/callback#token=` + code)
      expect(fetcher).not.toHaveBeenCalled()
      finish({ data: {}, error: null })
      await expect(pending).resolves.toBe(true)
      expect(fetcher).toHaveBeenCalledTimes(1)
      const [url, init] = fetcher.mock.calls[0]
      expect(url.pathname).toBe('/api/auth/blume/electron/acknowledge')
      expect(init.headers.cookie).toBe('__Secure-better-auth-release.session_token=stored-session')
      expect(init.headers.origin).toBe(url.origin)
    }
  )

  test.each(['stable', 'canary'])(
    '%s rejects failed exchange and tolerates unavailable ACK',
    async (channel) => {
      mocks.channel = channel
      const scheme = channel === 'canary' ? 'codes.blume-canary' : 'codes.blume'
      const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 404 }))
      vi.stubGlobal('fetch', fetcher)
      const { handleAccountDeepLink } = await import('../../src/main/accounts')
      const code = Buffer.from(JSON.stringify({ identifier: 'a'.repeat(32) })).toString('base64url')
      mocks.authenticate.mockResolvedValueOnce({ data: null, error: { message: 'Invalid code' } })
      await expect(
        handleAccountDeepLink(`${scheme}://auth/callback#token=` + code)
      ).rejects.toThrow('Invalid code')
      expect(fetcher).not.toHaveBeenCalled()
      await expect(handleAccountDeepLink(`${scheme}://auth/callback#token=` + code)).resolves.toBe(
        true
      )
      expect(fetcher).toHaveBeenCalledTimes(1)
    }
  )

  test('leaves non-account launch arguments for native deep-link routing', async () => {
    const { handleAccountDeepLinkFromArgv } = await import('../../src/main/accounts')

    await expect(handleAccountDeepLinkFromArgv(['Blume', 'blume://agents'])).resolves.toBe(false)
    expect(mocks.authenticate).not.toHaveBeenCalled()
  })
})
