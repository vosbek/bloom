/**
 * Main answers the account session and PostHog flags without a network round trip per read
 * (docs/desktop-runtime-performance.md, October 27, 2026): concurrent session reads share one
 * request, a flag is asked of PostHog at most once a minute, and an account change forgets both.
 */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  settings: new Map<string, string>(),
  getFeatureFlagResult: vi.fn(),
  authClient: {
    authenticate: vi.fn(),
    setupMain: vi.fn(),
    signIn: { email: vi.fn() },
    signUp: { email: vi.fn() },
    signOut: vi.fn(),
    getSession: vi.fn(),
    updateUser: vi.fn(),
    listAccounts: vi.fn()
  }
}))

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
  electronClient: () => ({ id: 'electron' }),
  normalizeUserOutput: (value: { id: string }) => ({ ...value, image: null })
}))

vi.mock('../../src/main/blume-user-host', () => ({
  getOrCreateBlumeDeviceId: vi.fn(async () => 'device-test-id'),
  getOrCreateBlumeId: vi.fn(async () => 'blume-test-id')
}))

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

vi.mock('../../src/main/settingsStore', () => ({
  getSetting: vi.fn((key: string) => mocks.settings.get(key) ?? null)
}))

vi.mock('../../src/main/logger', () => ({
  writeAppLog: vi.fn()
}))

vi.mock('../../src/main/sentry', () => ({
  captureSentryException: vi.fn()
}))

vi.mock('posthog-node', () => ({
  PostHog: class {
    getFeatureFlagResult = mocks.getFeatureFlagResult
  }
}))

const FLAG = 'desktop-menu-bar-status-item'

function deferred<T>(): { promise: Promise<T>; resolve(value: T): void } {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => (resolve = done))
  return { promise, resolve }
}

function sessionOf(userId: string | null) {
  return userId
    ? {
        session: { expiresAt: new Date(Date.now() + 24 * 60 * 60_000).toISOString() },
        user: { id: userId, name: 'Preview', email: 'preview@example.invalid', role: '' }
      }
    : null
}

/** The account service, answering `user` (null: signed out) once `release` is called, if given. */
function answerSessionAs(user: () => string | null, gate?: Promise<void>): void {
  mocks.authClient.getSession.mockImplementation(async ({ fetchOptions }) => {
    await gate
    const data = sessionOf(user())
    await fetchOptions.onResponse({ response: Response.json(data) })
    return { data, error: null }
  })
}

async function settle(): Promise<void> {
  for (let i = 0; i < 10; i++) await Promise.resolve()
  await new Promise((done) => setTimeout(done, 0))
}

async function load() {
  vi.resetModules()
  const accounts = await import('../../src/main/accounts')
  const telemetry = await import('../../src/main/telemetry')
  // As the main entry wires it (src/main/index.ts).
  accounts.deliveryAccounts.onChanged?.(telemetry.clearPosthogFeatureFlagCache)
  return { ...accounts, ...telemetry }
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-10-27T12:00:00Z'))
  process.env.VITE_POSTHOG_KEY = 'test-posthog-key'
  mocks.settings.clear()
  mocks.getFeatureFlagResult.mockResolvedValue({ key: FLAG, enabled: true })
  mocks.authClient.listAccounts.mockResolvedValue({ data: [], error: null })
  mocks.authClient.signOut.mockResolvedValue({ error: null })
})

afterEach(() => {
  vi.useRealTimers()
  delete process.env.VITE_POSTHOG_KEY
})

describe('account session reads in main', () => {
  test('concurrent reads make one request to the account service', async () => {
    const gate = deferred<void>()
    answerSessionAs(() => 'person-a', gate.promise)
    const { getAccountSession } = await load()

    const reads = Array.from({ length: 8 }, () => getAccountSession())
    gate.resolve()
    const sessions = await Promise.all(reads)

    expect(mocks.authClient.getSession).toHaveBeenCalledTimes(1)
    expect(sessions.every((session) => session?.user.id === 'person-a')).toBe(true)
  })

  test('the accounts are read side by side with the session, not after it', async () => {
    const gate = deferred<void>()
    answerSessionAs(() => 'person-a', gate.promise)
    const { getAccountSession } = await load()

    const read = getAccountSession()
    await settle()
    expect(mocks.authClient.listAccounts).toHaveBeenCalledTimes(1)
    gate.resolve()
    await expect(read).resolves.toMatchObject({ user: { id: 'person-a', hasPassword: false } })
  })

  test('an older answer is given at once while one newer read runs', async () => {
    answerSessionAs(() => 'person-a')
    const { getAccountSession } = await load()
    await getAccountSession()

    vi.setSystemTime(Date.now() + 5_000)
    await getAccountSession()
    expect(mocks.authClient.getSession).toHaveBeenCalledTimes(1)

    vi.setSystemTime(Date.now() + 20_000)
    const gate = deferred<void>()
    answerSessionAs(() => 'person-a', gate.promise)
    // Neither waits for the service; together they start one read.
    await expect(getAccountSession()).resolves.toMatchObject({ user: { id: 'person-a' } })
    await expect(getAccountSession()).resolves.toMatchObject({ user: { id: 'person-a' } })
    expect(mocks.authClient.getSession).toHaveBeenCalledTimes(2)
    gate.resolve()
  })

  test('a session revoked elsewhere reaches the app as an account change', async () => {
    let user: string | null = 'person-a'
    answerSessionAs(() => user)
    const { getAccountSession, deliveryAccounts } = await load()
    const changed = vi.fn()
    deliveryAccounts.onChanged?.(changed)
    await getAccountSession()

    user = null
    vi.setSystemTime(Date.now() + 20_000)
    // The read that finds it gone runs behind the last answer...
    await getAccountSession()
    await settle()
    expect(changed).toHaveBeenCalledTimes(1)
    // ...and the next reader is told at once, without another request.
    await expect(getAccountSession()).resolves.toBeNull()
    expect(mocks.authClient.getSession).toHaveBeenCalledTimes(2)
  })

  test('an answer older than ten minutes is not given', async () => {
    let user: string | null = 'person-a'
    answerSessionAs(() => user)
    const { getAccountSession } = await load()
    await getAccountSession()

    user = null
    vi.setSystemTime(Date.now() + 11 * 60_000)
    await expect(getAccountSession()).resolves.toBeNull()
  })

  test('a failed read is not hidden behind the last answer', async () => {
    answerSessionAs(() => 'person-a')
    const { getAccountSession } = await load()
    await getAccountSession()

    vi.setSystemTime(Date.now() + 20_000)
    mocks.authClient.getSession.mockImplementation(async ({ fetchOptions }) => {
      await fetchOptions.onResponse({ response: new Response('bad gateway', { status: 502 }) })
      return { data: null, error: { status: 502 } }
    })
    await getAccountSession()
    await settle()
    await expect(getAccountSession()).rejects.toThrow()
  })
})

describe('PostHog flag reads in main', () => {
  test('reads within a minute make no PostHog request', async () => {
    const { isPosthogFeatureEnabled, getPosthogFeatureFlagValue } = await load()

    await expect(isPosthogFeatureEnabled(FLAG)).resolves.toBe(true)
    vi.setSystemTime(Date.now() + 30_000)
    for (let i = 0; i < 20; i++) await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(true)

    expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(1)
  })

  test('concurrent first reads share one PostHog request', async () => {
    const answer = deferred<{ key: string; enabled: boolean; variant: string }>()
    mocks.getFeatureFlagResult.mockReturnValue(answer.promise)
    const { getPosthogFeatureFlagValue } = await load()

    const reads = Array.from({ length: 5 }, () => getPosthogFeatureFlagValue(FLAG))
    answer.resolve({ key: FLAG, enabled: true, variant: 'page_footer' })

    expect(await Promise.all(reads)).toEqual(Array(5).fill('page_footer'))
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(1)
  })

  test('an older assignment is answered at once and renewed behind it', async () => {
    const { getPosthogFeatureFlagValue } = await load()
    await getPosthogFeatureFlagValue(FLAG)

    vi.setSystemTime(Date.now() + 61_000)
    const answer = deferred<{ key: string; enabled: boolean }>()
    mocks.getFeatureFlagResult.mockReturnValue(answer.promise)
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(true)
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(true)
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(2)

    answer.resolve({ key: FLAG, enabled: false })
    await settle()
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(false)
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(2)
  })

  test('a request that fails keeps the last assignment and tries again soon', async () => {
    const { getPosthogFeatureFlagValue } = await load()
    await getPosthogFeatureFlagValue(FLAG)

    vi.setSystemTime(Date.now() + 61_000)
    mocks.getFeatureFlagResult.mockRejectedValue(new Error('offline'))
    await getPosthogFeatureFlagValue(FLAG)
    await settle()
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(true)
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(2)

    vi.setSystemTime(Date.now() + 11_000)
    await getPosthogFeatureFlagValue(FLAG)
    expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(3)
  })

  test('a flag PostHog stops answering (switched off or deleted) is off', async () => {
    const { getPosthogFeatureFlagValue } = await load()
    await getPosthogFeatureFlagValue(FLAG)

    vi.setSystemTime(Date.now() + 61_000)
    mocks.getFeatureFlagResult.mockResolvedValue(undefined)
    await getPosthogFeatureFlagValue(FLAG)
    await settle()
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(false)
  })

  test('an assignment five minutes old is not given: the read waits for PostHog', async () => {
    const { getPosthogFeatureFlagValue } = await load()
    await getPosthogFeatureFlagValue(FLAG)

    vi.setSystemTime(Date.now() + 5 * 60_000)
    mocks.getFeatureFlagResult.mockResolvedValue({ key: FLAG, enabled: false })
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(false)
  })

  test('a renewed assignment that differs is announced once, so subscribers read again', async () => {
    const { getPosthogFeatureFlagValue, onPosthogFeatureFlagsChanged } = await load()
    const announced = vi.fn()
    onPosthogFeatureFlagsChanged(announced)
    await getPosthogFeatureFlagValue(FLAG)

    vi.setSystemTime(Date.now() + 61_000)
    await getPosthogFeatureFlagValue(FLAG)
    await settle()
    expect(announced).not.toHaveBeenCalled()

    vi.setSystemTime(Date.now() + 61_000)
    mocks.getFeatureFlagResult.mockResolvedValue({ key: FLAG, enabled: false })
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(true)
    await settle()
    expect(announced).toHaveBeenCalledTimes(1)
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(false)
  })

  test('a first read that fails answers false, as before', async () => {
    mocks.getFeatureFlagResult.mockRejectedValue(new Error('offline'))
    const { getPosthogFeatureFlagValue } = await load()
    await expect(getPosthogFeatureFlagValue(FLAG)).resolves.toBe(false)
  })
})

test('signing out forgets both the session and the flags', async () => {
  answerSessionAs(() => 'person-a')
  const { getAccountSession, getPosthogFeatureFlagValue, deliveryAccounts } = await load()
  await getAccountSession()
  await getPosthogFeatureFlagValue(FLAG)

  answerSessionAs(() => null)
  await deliveryAccounts.signOut()

  // Neither the last session nor the last assignment is given: both are asked again.
  await expect(getAccountSession()).resolves.toBeNull()
  await getPosthogFeatureFlagValue(FLAG)
  expect(mocks.authClient.getSession).toHaveBeenCalledTimes(2)
  expect(mocks.getFeatureFlagResult).toHaveBeenCalledTimes(2)
})

test('an account change announces the flags, so subscribers read them again', async () => {
  answerSessionAs(() => 'person-a')
  const { getPosthogFeatureFlagValue, onPosthogFeatureFlagsChanged, deliveryAccounts } = await load()
  const announced = vi.fn()
  onPosthogFeatureFlagsChanged(announced)
  await getPosthogFeatureFlagValue(FLAG)

  await deliveryAccounts.signOut()
  await settle()
  expect(announced).toHaveBeenCalledTimes(1)
})

test('signing in keeps the session it read, so the next reader does not ask again', async () => {
  answerSessionAs(() => null)
  const { getAccountSession, registerAccountIpcHandlers } = await load()
  await expect(getAccountSession()).resolves.toBeNull()

  answerSessionAs(() => 'person-b')
  mocks.authClient.signIn.email.mockResolvedValue({ data: {}, error: null })
  type Handler = Parameters<Parameters<typeof registerAccountIpcHandlers>[0]>[1]
  const handlers = new Map<string, Handler>()
  registerAccountIpcHandlers((name, handler) => handlers.set(name, handler))
  await handlers.get('account:signIn')!(undefined as never, {
    email: 'preview@example.invalid',
    password: 'synthetic-password'
  })

  await expect(getAccountSession()).resolves.toMatchObject({ user: { id: 'person-b' } })
  expect(mocks.authClient.getSession).toHaveBeenCalledTimes(2)
})

test('a sign-in read that an account change overtakes is not kept', async () => {
  answerSessionAs(() => null)
  const { getAccountSession, registerAccountIpcHandlers, deliveryAccounts } = await load()
  await getAccountSession()

  const gate = deferred<void>()
  answerSessionAs(() => 'person-b', gate.promise)
  mocks.authClient.signIn.email.mockResolvedValue({ data: {}, error: null })
  type Handler = Parameters<Parameters<typeof registerAccountIpcHandlers>[0]>[1]
  const handlers = new Map<string, Handler>()
  registerAccountIpcHandlers((name, handler) => handlers.set(name, handler))
  const signingIn = handlers.get('account:signIn')!(undefined as never, {
    email: 'preview@example.invalid',
    password: 'synthetic-password'
  })
  await settle()
  // A sign-out lands while the sign-in is still reading its session.
  await deliveryAccounts.signOut()
  gate.resolve()
  await signingIn

  answerSessionAs(() => null)
  await expect(getAccountSession()).resolves.toBeNull()
})

test('a sign-in read that a revocation found behind the last answer overtakes is not kept', async () => {
  let user: string | null = 'person-a'
  answerSessionAs(() => user)
  const { getAccountSession, registerAccountIpcHandlers } = await load()
  await getAccountSession()

  // A sign-in starts reading its session, and is held there.
  const signInGate = deferred<void>()
  mocks.authClient.signIn.email.mockResolvedValue({ data: {}, error: null })
  mocks.authClient.getSession.mockImplementationOnce(async ({ fetchOptions }) => {
    await signInGate.promise
    const data = sessionOf('person-a')
    await fetchOptions.onResponse({ response: Response.json(data) })
    return { data, error: null }
  })
  type Handler = Parameters<Parameters<typeof registerAccountIpcHandlers>[0]>[1]
  const handlers = new Map<string, Handler>()
  registerAccountIpcHandlers((name, handler) => handlers.set(name, handler))
  const signingIn = handlers.get('account:signIn')!(undefined as never, {
    email: 'preview@example.invalid',
    password: 'synthetic-password'
  })
  await settle()

  // Meanwhile a newer read finds the session revoked.
  user = null
  vi.setSystemTime(Date.now() + 20_000)
  await getAccountSession()
  await settle()

  signInGate.resolve()
  await signingIn
  await expect(getAccountSession()).resolves.toBeNull()
})
