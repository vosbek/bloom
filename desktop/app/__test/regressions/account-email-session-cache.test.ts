import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const authenticate = vi.fn()
  const setupMain = vi.fn()
  return {
    authenticate,
    setupMain,
    electronClient: vi.fn(() => ({ id: 'electron' })),
    authClient: {
      authenticate,
      setupMain,
      getCookie: () => 'synthetic-session-cookie',
      signIn: { email: vi.fn() },
      signUp: { email: vi.fn() },
      getSession: vi.fn(),
      updateUser: vi.fn(),
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
  normalizeUserOutput: (value: { id: string; image?: string }) => ({
    ...value,
    image: value.image ? `user-image://${value.id}` : null
  })
}))

vi.mock('../../src/main/blume-user-host', () => ({
  getOrCreateBlumeDeviceId: async () => 'synthetic-device',
  getOrCreateBlumeId: async () => 'synthetic-installation'
}))

afterEach(() => vi.unstubAllGlobals())

test.each([
  [401, 'sign-in-required'],
  [403, 'account-forbidden'],
  [409, 'installation-conflict'],
  [410, 'installation-revoked'],
  [429, 'account-unavailable'],
  [500, 'account-unavailable']
] as const)(
  'cloud account token HTTP %s preserves a safe recovery reason',
  async (status, code) => {
    vi.resetModules()
    const fetcher = vi.fn(async () => Response.json({ error: 'private response body' }, { status }))
    vi.stubGlobal('fetch', fetcher)
    const { deliveryAccounts } = await import('../../src/main/accounts')
    const failure = await deliveryAccounts.cloudAccessToken!().catch((error) => error)
    expect(failure.cloudAccountFailure).toBe(code)
    expect(failure.message).not.toContain('private response body')
    expect(fetcher).toHaveBeenCalledTimes(1)
    const [url, request] = fetcher.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toMatch(/\/v1\/account\/token$/)
    expect(JSON.parse(request.body as string)).toMatchObject({
      installationId: 'synthetic-installation',
      audience: 'deliveries',
      scopes: ['deliveries:use']
    })
  }
)

test('cloud account network failure stays retryable without asking for provider sign-in', async () => {
  vi.resetModules()
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      throw Error('private network detail')
    })
  )
  const { deliveryAccounts } = await import('../../src/main/accounts')
  await expect(deliveryAccounts.cloudAccessToken!()).rejects.toMatchObject({
    cloudAccountFailure: 'account-unavailable',
    message: 'Blume could not verify your account. Try again shortly.'
  })
})

vi.mock('../../src/main/secureStore', () => ({
  getSecret: vi.fn(),
  setSecret: vi.fn()
}))

vi.mock('../../src/main/releaseMetadata', () => ({
  resolveDesktopReleaseMetadata: () => ({
    version: '1.0.69',
    channel: 'stable',
    sourceSha: null,
    bundleId: null
  })
}))

describe('email authentication after a cached signed-out read', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  test.each(['signIn', 'signUp'] as const)(
    '%s reads the newly established session',
    async (action) => {
      let signedIn = false
      const session = {
        session: { expiresAt: new Date(Date.now() + 60_000).toISOString() },
        user: { id: 'synthetic', name: 'Preview', email: 'preview@example.invalid', role: 'admin' }
      }
      mocks.authClient.getSession.mockImplementation(async ({ fetchOptions }) => {
        const data = signedIn ? session : null
        await fetchOptions.onResponse({ response: Response.json(data) })
        return { data, error: null }
      })
      mocks.authClient.listAccounts.mockResolvedValue({
        data: [{ providerId: 'credential' }],
        error: null
      })
      mocks.authClient[action].email.mockImplementation(async () => {
        signedIn = true
        return { data: {}, error: null }
      })
      const { getAccountSession, registerAccountIpcHandlers } =
        await import('../../src/main/accounts')
      type Handler = Parameters<Parameters<typeof registerAccountIpcHandlers>[0]>[1]
      const handlers = new Map<string, Handler>()
      registerAccountIpcHandlers((name, handler) => handlers.set(name, handler))
      await expect(getAccountSession()).resolves.toBeNull()
      await expect(
        handlers.get(`account:${action}`)!(undefined as never, {
          email: 'preview@example.invalid',
          password: 'synthetic-password',
          name: 'Preview'
        })
      ).resolves.toMatchObject({ user: { id: 'synthetic' } })
      expect(mocks.authClient.getSession).toHaveBeenCalledTimes(2)
      await expect(getAccountSession()).resolves.toMatchObject({ user: { id: 'synthetic' } })
    }
  )
})

test('profile updates replace a cached session and refresh the Electron image proxy URL', async () => {
  vi.resetModules()
  vi.clearAllMocks()
  let user = {
    id: 'synthetic',
    name: 'Preview',
    email: 'preview@example.invalid',
    image: 'data:image/png;base64,b2xk',
    updatedAt: new Date(1000)
  }
  mocks.authClient.getSession.mockImplementation(async ({ fetchOptions }) => {
    const data = { session: { expiresAt: new Date(Date.now() + 60_000) }, user }
    await fetchOptions.onResponse({ response: Response.json(data) })
    return { data, error: null }
  })
  mocks.authClient.listAccounts.mockResolvedValue({ data: [], error: null })
  mocks.authClient.updateUser.mockImplementation(async (input) => {
    user = { ...user, ...input, updatedAt: new Date(2000) }
    return { error: null }
  })
  const { getAccountSession, registerAccountIpcHandlers } = await import('../../src/main/accounts')
  type Handler = Parameters<Parameters<typeof registerAccountIpcHandlers>[0]>[1]
  const handlers = new Map<string, Handler>()
  registerAccountIpcHandlers((name, handler) => handlers.set(name, handler))
  expect((await getAccountSession())?.user.image).toBe('user-image://synthetic?v=1000')
  await expect(
    handlers.get('account:updateProfile')!(undefined as never, {
      image: 'data:image/png;base64,bmV3'
    })
  ).resolves.toMatchObject({ user: { name: 'Preview', image: 'user-image://synthetic?v=2000' } })
  expect(mocks.authClient.updateUser).toHaveBeenCalledWith({ image: 'data:image/png;base64,bmV3' })
  expect(mocks.authClient.getSession).toHaveBeenCalledTimes(2)
  expect((await getAccountSession())?.user.image).toBe('user-image://synthetic?v=2000')
})

describe('Electron preview cookie namespace', () => {
  afterEach(() => vi.unstubAllEnvs())

  test.each([
    ['https://blume-auth-pr-1636.petal-preview.com', '__Host-blumepr-1636-__Secure-better-auth'],
    ['https://blume-auth-pr-42.petal-preview.com/', '__Host-blumepr-42-__Secure-better-auth'],
    ['https://auth.blume-codes.com', 'better-auth'],
    ['https://blume-auth-pr-1636.example.com', 'better-auth'],
    ['http://blume-auth-pr-1636.petal-preview.com', 'better-auth']
  ])('selects the cookie prefix for %s', async (url, cookiePrefix) => {
    vi.resetModules()
    mocks.electronClient.mockClear()
    vi.stubEnv('BLUME_AUTH_URL', url)
    await import('../../src/main/accounts')
    expect(mocks.electronClient).toHaveBeenCalledWith(expect.objectContaining({ cookiePrefix }))
  })
})
