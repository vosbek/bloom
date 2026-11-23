import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  execFile: vi.fn(),
  captureTelemetryEvent: vi.fn(async () => true),
  isPosthogFeatureEnabled: vi.fn(async () => true),
  mkdir: vi.fn(),
  readFile: vi.fn(),
  rename: vi.fn(),
  settings: new Map<string, string>(),
  secrets: new Map<string, string>(),
  writeFile: vi.fn()
}))

vi.mock('node:child_process', () => ({
  execFile: mocks.execFile
}))

vi.mock('node:fs/promises', () => ({
  mkdir: mocks.mkdir,
  readFile: mocks.readFile,
  rename: mocks.rename,
  writeFile: mocks.writeFile
}))

vi.mock('../../src/main/secureStore', () => ({
  clearSecret: vi.fn((key: string) => {
    mocks.secrets.delete(key)
  }),
  getSecret: vi.fn((key: string) => mocks.secrets.get(key) ?? null),
  setSecret: vi.fn((key: string, value: string) => {
    mocks.secrets.set(key, value)
  })
}))

vi.mock('../../src/main/settingsStore', () => ({
  getSetting: vi.fn((key: string) => mocks.settings.get(key) ?? null),
  setSetting: vi.fn((key: string, value: string) => {
    mocks.settings.set(key, value)
  }),
  initializeSettingsStore: vi.fn(async () => undefined)
}))

vi.mock('../../src/main/telemetry', () => ({
  captureTelemetryEvent: mocks.captureTelemetryEvent,
  isPosthogFeatureEnabled: mocks.isPosthogFeatureEnabled
}))

const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, 'platform')
const originalCodexHome = process.env.CODEX_HOME

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    json: async () => body
  } as Response
}

function fakeJwt(payload: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `header.${body}.signature`
}

function execFileResult(stdout: string): { stdout: string; stderr: string } {
  return { stdout, stderr: '' }
}

describe('Claude usage credentials', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.restoreAllMocks()
    mocks.execFile.mockReset()
    mocks.captureTelemetryEvent.mockClear()
    mocks.isPosthogFeatureEnabled.mockReset()
    mocks.isPosthogFeatureEnabled.mockResolvedValue(true)
    mocks.mkdir.mockReset()
    mocks.readFile.mockReset()
    mocks.rename.mockReset()
    mocks.writeFile.mockReset()
    mocks.settings.clear()
    mocks.secrets.clear()
    if (originalCodexHome === undefined) delete process.env.CODEX_HOME
    else process.env.CODEX_HOME = originalCodexHome
    Object.defineProperty(process, 'platform', { configurable: true, value: 'darwin' })
  })

  afterEach(() => {
    if (originalPlatformDescriptor)
      Object.defineProperty(process, 'platform', originalPlatformDescriptor)
    if (originalCodexHome === undefined) delete process.env.CODEX_HOME
    else process.env.CODEX_HOME = originalCodexHome
    vi.unstubAllGlobals()
  })

  test('uses cached Claude credentials when Keychain becomes unreadable', async () => {
    const expiresAt = Date.now() + 60 * 60_000
    mocks.secrets.set(
      'usage.claudeCredentialsCache',
      JSON.stringify({
        creds: {
          accessToken: 'cached-claude-token',
          subscriptionType: 'max',
          expiresAt
        },
        storedAt: Date.now() - 5_000
      })
    )

    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path.endsWith('.codex/auth.json')) {
        return JSON.stringify({ tokens: { access_token: 'codex-token' } })
      }
      throw new Error(`Unexpected read: ${path}`)
    })

    mocks.execFile.mockImplementation((_file, _args, _options, callback) => {
      const err = Object.assign(new Error('keychain denied'), { code: 51 })
      callback(err, '', '')
    })

    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (url === 'https://api.anthropic.com/api/oauth/usage') {
        expect(init?.headers).toMatchObject({ Authorization: 'Bearer cached-claude-token' })
        return jsonResponse({
          five_hour: { utilization: 12, resets_at: '2026-06-12T22:00:00Z' }
        })
      }
      if (url === 'https://chatgpt.com/backend-api/wham/usage') {
        return jsonResponse({
          plan_type: 'plus',
          rate_limit: {
            primary_window: {
              used_percent: 1,
              resets_in_seconds: 60
            }
          }
        })
      }
      throw new Error(`Unexpected fetch: ${url}`)
    })
    vi.stubGlobal('fetch', fetchMock)

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport(null, true)
    const claude = report.providers.find((provider) => provider.provider === 'claude')

    expect(claude).toMatchObject({
      provider: 'claude',
      status: 'ok',
      plan: 'max',
      cta: null
    })
    expect(mocks.execFile).toHaveBeenCalledWith(
      '/usr/bin/security',
      ['find-generic-password', '-s', 'Claude Code-credentials', '-w'],
      expect.objectContaining({ timeout: 1_500 }),
      expect.any(Function)
    )
  }, 30_000)

  test('evicts cached Claude credentials when Anthropic rejects the token', async () => {
    const expiresAt = Date.now() + 60 * 60_000
    mocks.secrets.set(
      'usage.claudeCredentialsCache',
      JSON.stringify({
        creds: {
          accessToken: 'stale-claude-token',
          subscriptionType: 'max',
          expiresAt
        },
        storedAt: Date.now() - 5_000
      })
    )

    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path.endsWith('.codex/auth.json')) {
        return JSON.stringify({ tokens: { access_token: 'codex-token' } })
      }
      throw new Error(`Unexpected read: ${path}`)
    })

    mocks.execFile.mockImplementation((_file, _args, _options, callback) => {
      const err = Object.assign(new Error('keychain denied'), { code: 51 })
      callback(err, '', '')
    })

    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (url === 'https://api.anthropic.com/api/oauth/usage') return jsonResponse({}, 401)
        if (url === 'https://chatgpt.com/backend-api/wham/usage') {
          return jsonResponse({
            plan_type: 'plus',
            rate_limit: {
              primary_window: {
                used_percent: 1,
                resets_in_seconds: 60
              }
            }
          })
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })
    )

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport(null, true)
    const claude = report.providers.find((provider) => provider.provider === 'claude')

    expect(claude).toMatchObject({
      provider: 'claude',
      status: 'unauthenticated',
      cta: 'terminal-login'
    })
    expect(mocks.secrets.has('usage.claudeCredentialsCache')).toBe(false)
  }, 30_000)

  test('shows Claude sign-in when Keychain fails but Claude CLI is logged out', async () => {
    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path.endsWith('.codex/auth.json')) {
        return JSON.stringify({ tokens: { access_token: 'codex-token' } })
      }
      throw new Error(`Unexpected read: ${path}`)
    })

    mocks.execFile.mockImplementation((file: string, args: string[], _options, callback) => {
      if (file === '/usr/bin/security') {
        const err = Object.assign(new Error('keychain denied'), { code: 51 })
        callback(err, '', '')
        return
      }
      if (file === process.env.SHELL || file === '/bin/zsh' || file.endsWith('/zsh')) {
        expect(args).toContain('-lic')
        callback(null, execFileResult('__BLUME_CLAUDE_BIN__/terminal/bin/claude\n'))
        return
      }
      if (file === '/terminal/bin/claude' || file.endsWith('/claude') || file === 'claude') {
        const stdout = JSON.stringify({
          loggedIn: false,
          authMethod: 'none',
          apiProvider: 'firstParty'
        })
        const err = Object.assign(new Error('logged out'), { code: 1, stdout })
        expect(args).toEqual(['auth', 'status'])
        callback(err, stdout, '')
        return
      }
      throw new Error(`Unexpected execFile: ${file}`)
    })

    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (url === 'https://chatgpt.com/backend-api/wham/usage') {
          return jsonResponse({
            plan_type: 'plus',
            rate_limit: {
              primary_window: {
                used_percent: 1,
                resets_in_seconds: 60
              }
            }
          })
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })
    )

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport(null, true)
    const claude = report.providers.find((provider) => provider.provider === 'claude')

    expect(claude).toMatchObject({
      provider: 'claude',
      status: 'unauthenticated',
      detail: 'No Claude Code credentials found. Sign in with the claude CLI first.',
      cta: 'terminal-login'
    })
  })

  test('shows Claude sign-in when the readable Keychain item has no Claude OAuth token', async () => {
    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path.endsWith('.codex/auth.json')) {
        return JSON.stringify({ tokens: { access_token: 'codex-token' } })
      }
      throw new Error(`Unexpected read: ${path}`)
    })

    mocks.execFile.mockImplementation((file: string, _args, _options, callback) => {
      if (file === '/usr/bin/security') {
        callback(null, execFileResult(JSON.stringify({ mcpOAuth: { example: {} } })))
        return
      }
      throw new Error(`Unexpected execFile: ${file}`)
    })

    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (url === 'https://chatgpt.com/backend-api/wham/usage') {
          return jsonResponse({
            plan_type: 'plus',
            rate_limit: {
              primary_window: {
                used_percent: 1,
                resets_in_seconds: 60
              }
            }
          })
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })
    )

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport(null, true)
    const claude = report.providers.find((provider) => provider.provider === 'claude')

    expect(claude).toMatchObject({
      provider: 'claude',
      status: 'unauthenticated',
      detail: 'No Claude Code credentials found. Sign in with the claude CLI first.',
      cta: 'terminal-login'
    })
  })

  test('shows expired CLI credentials without launching Claude, then recovers after normal CLI use', async () => {
    const oldExpiresAt = Date.now() - 60_000
    const newExpiresAt = Date.now() + 60 * 60_000
    const oldKeychainPayload = JSON.stringify({
      claudeAiOauth: {
        accessToken: 'expired-claude-token',
        refreshToken: 'claude-refresh-token',
        subscriptionType: 'team',
        expiresAt: oldExpiresAt,
        scopes: ['user:profile']
      }
    })
    const newKeychainPayload = JSON.stringify({
      claudeAiOauth: {
        accessToken: 'refreshed-claude-token',
        refreshToken: 'rotated-claude-refresh-token',
        subscriptionType: 'team',
        expiresAt: newExpiresAt,
        scopes: ['user:profile']
      }
    })
    let refreshedByUser = false

    mocks.mkdir.mockResolvedValue(undefined)
    mocks.writeFile.mockResolvedValue(undefined)
    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path.endsWith('.codex/auth.json')) {
        return JSON.stringify({ tokens: { access_token: 'codex-token' } })
      }
      throw new Error(`Unexpected read: ${path}`)
    })

    mocks.execFile.mockImplementation((file: string, args: string[], _options, callback) => {
      if (file === '/usr/bin/security') {
        callback(null, execFileResult(refreshedByUser ? newKeychainPayload : oldKeychainPayload))
        return
      }
      throw new Error(`Unexpected execFile: ${file}`)
    })

    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (url === 'https://api.anthropic.com/api/oauth/usage') {
        expect(init?.headers).toMatchObject({ Authorization: 'Bearer refreshed-claude-token' })
        return jsonResponse({
          five_hour: { utilization: 17, resets_at: '2026-06-12T22:00:00Z' }
        })
      }
      if (url === 'https://chatgpt.com/backend-api/wham/usage') {
        return jsonResponse({
          plan_type: 'plus',
          rate_limit: {
            primary_window: {
              used_percent: 1,
              resets_in_seconds: 60
            }
          }
        })
      }
      throw new Error(`Unexpected fetch: ${url}`)
    })
    vi.stubGlobal('fetch', fetchMock)

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const expired = await fetchUsageReport(null, true)
    expect(expired.providers.find((provider) => provider.provider === 'claude')).toMatchObject({
      status: 'unauthenticated',
      cta: 'terminal-login'
    })
    expect(mocks.execFile.mock.calls.every((call) => call[0] === '/usr/bin/security')).toBe(true)
    expect(mocks.mkdir).not.toHaveBeenCalled()
    expect(mocks.writeFile).not.toHaveBeenCalled()
    refreshedByUser = true
    const report = await fetchUsageReport(null, true)
    const claude = report.providers.find((provider) => provider.provider === 'claude')

    expect(claude).toMatchObject({
      provider: 'claude',
      status: 'ok',
      plan: 'team'
    })
    expect(fetchMock).not.toHaveBeenCalledWith(
      'https://platform.claude.com/v1/oauth/token',
      expect.anything()
    )
    expect(mocks.secrets.has('usage.claudeCredentialsCache')).toBe(true)
  })

  test('directly refreshes expired Blume-owned Claude cache credentials', async () => {
    const oldExpiresAt = Date.now() - 60_000
    mocks.secrets.set(
      'usage.claudeCredentialsCache',
      JSON.stringify({
        creds: {
          accessToken: 'old-blume-claude-token',
          refreshToken: 'old-blume-refresh-token',
          subscriptionType: 'team',
          expiresAt: oldExpiresAt,
          scopes: ['user:profile'],
          rateLimitTier: 'standard'
        },
        owner: 'blume',
        storedAt: Date.now() - 5_000
      })
    )

    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path.endsWith('.codex/auth.json')) {
        return JSON.stringify({ tokens: { access_token: 'codex-token' } })
      }
      throw new Error(`Unexpected read: ${path}`)
    })
    mocks.execFile.mockImplementation((_file, _args, _options, callback) => {
      const err = Object.assign(new Error('not found'), { code: 44 })
      callback(err, '', '')
    })

    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (url === 'https://platform.claude.com/v1/oauth/token') {
        expect(init?.method).toBe('POST')
        expect(init?.body).toBe(
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: 'old-blume-refresh-token',
            client_id: '9d1c250a-e61b-44d9-88ed-5944d1962f5e'
          }).toString()
        )
        return jsonResponse({
          access_token: 'new-blume-claude-token',
          refresh_token: 'new-blume-refresh-token',
          expires_in: 3600
        })
      }
      if (url === 'https://api.anthropic.com/api/oauth/usage') {
        expect(init?.headers).toMatchObject({ Authorization: 'Bearer new-blume-claude-token' })
        return jsonResponse({
          five_hour: { utilization: 21, resets_at: '2026-06-12T22:00:00Z' }
        })
      }
      if (url === 'https://chatgpt.com/backend-api/wham/usage') {
        return jsonResponse({
          plan_type: 'plus',
          rate_limit: {
            primary_window: {
              used_percent: 1,
              resets_in_seconds: 60
            }
          }
        })
      }
      throw new Error(`Unexpected fetch: ${url}`)
    })
    vi.stubGlobal('fetch', fetchMock)

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport(null, false)
    const claude = report.providers.find((provider) => provider.provider === 'claude')

    expect(claude).toMatchObject({
      provider: 'claude',
      status: 'ok',
      plan: 'team'
    })
    const cached = JSON.parse(mocks.secrets.get('usage.claudeCredentialsCache') ?? '{}')
    expect(cached).toMatchObject({
      owner: 'blume',
      creds: {
        accessToken: 'new-blume-claude-token',
        refreshToken: 'new-blume-refresh-token'
      }
    })
  })

  test('refreshes stale Codex OAuth tokens and writes the rotated auth file', async () => {
    process.env.CODEX_HOME = '/tmp/blume-codex-test'
    const oldAuth = {
      last_refresh: '2000-01-01T00:00:00Z',
      tokens: {
        access_token: 'old-codex-token',
        refresh_token: 'old-refresh-token',
        id_token: fakeJwt({
          email: 'old@blume.page',
          'https://api.openai.com/auth': {
            chatgpt_account_id: 'acct-old',
            chatgpt_plan_type: 'plus'
          }
        })
      }
    }
    const newIdToken = fakeJwt({
      email: 'new@blume.page',
      'https://api.openai.com/auth': {
        chatgpt_account_id: 'acct-new',
        chatgpt_plan_type: 'pro'
      }
    })

    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      if (path === '/tmp/blume-codex-test/auth.json') return JSON.stringify(oldAuth)
      throw new Error(`Unexpected read: ${path}`)
    })
    mocks.execFile.mockImplementation((_file, _args, _options, callback) => {
      const err = Object.assign(new Error('not found'), { code: 44 })
      callback(err, '', '')
    })
    mocks.writeFile.mockResolvedValue(undefined)
    mocks.rename.mockResolvedValue(undefined)

    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (url === 'https://auth.openai.com/oauth/token') {
        expect(init?.method).toBe('POST')
        expect(init?.body).toBe(
          JSON.stringify({
            client_id: 'app_EMoamEEZ73f0CkXaXp7hrann',
            grant_type: 'refresh_token',
            refresh_token: 'old-refresh-token',
            scope: 'openid profile email'
          })
        )
        return jsonResponse({
          access_token: 'new-codex-token',
          refresh_token: 'new-refresh-token',
          id_token: newIdToken
        })
      }
      if (url === 'https://chatgpt.com/backend-api/wham/usage') {
        expect(init?.headers).toMatchObject({
          Authorization: 'Bearer new-codex-token',
          'chatgpt-account-id': 'acct-new'
        })
        return jsonResponse({
          plan_type: 'pro',
          rate_limit: {
            primary_window: {
              used_percent: 9,
              resets_in_seconds: 60
            }
          }
        })
      }
      throw new Error(`Unexpected fetch: ${url}`)
    })
    vi.stubGlobal('fetch', fetchMock)

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport(null, true)
    const codex = report.providers.find((provider) => provider.provider === 'codex')

    expect(codex).toMatchObject({
      provider: 'codex',
      status: 'ok',
      account: 'new@blume.page',
      plan: 'pro'
    })
    expect(mocks.writeFile).toHaveBeenCalledTimes(1)
    const [, written] = mocks.writeFile.mock.calls[0]
    expect(JSON.parse(String(written))).toMatchObject({
      last_refresh: expect.any(String),
      tokens: {
        access_token: 'new-codex-token',
        refresh_token: 'new-refresh-token',
        id_token: newIdToken
      }
    })
    expect(mocks.rename).toHaveBeenCalledWith(
      expect.stringContaining('/tmp/blume-codex-test/.'),
      '/tmp/blume-codex-test/auth.json'
    )
  })

  test('omits Cursor usage when the Cursor usage feature is disabled', async () => {
    mocks.readFile.mockImplementation(async (path: string) => {
      if (path.endsWith('.claude/.credentials.json') || path.endsWith('.codex/auth.json')) {
        throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      }
      throw new Error(`Unexpected read: ${path}`)
    })
    mocks.execFile.mockImplementation((_file, _args, _options, callback) => {
      callback(Object.assign(new Error('not found'), { code: 44 }), '', '')
    })
    const fetchMock = vi.fn(async (url: string) => {
      throw new Error(`Unexpected fetch: ${url}`)
    })
    vi.stubGlobal('fetch', fetchMock)
    mocks.isPosthogFeatureEnabled.mockResolvedValue(false)

    const { fetchUsageReport } = await import('../../src/main/usage/providerUsage')

    const report = await fetchUsageReport('cursor-session=present', true)

    expect(report.providers.map((provider) => provider.provider)).not.toContain('cursor')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
