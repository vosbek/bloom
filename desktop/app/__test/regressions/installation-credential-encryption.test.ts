import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import {
  IMPROVE_INSTALLATION_ID_SETTING,
  IMPROVE_INSTALLATION_TOKEN_SETTING
} from '@blume/app-core'
const fixture = vi.hoisted(() => ({ values: new Map<string, string>(), available: true }))
vi.mock('../../src/main/settingsStore', () => ({
  getSetting: (key: string) => fixture.values.get(key) ?? null,
  setSetting: (key: string, value: string) => {
    fixture.values.set(key, value)
  }
}))
vi.mock('../../src/main/blume-user-host', () => ({
  getOrCreateBlumeId: async () => 'fixture-installation'
}))
vi.mock('electron', () => ({
  safeStorage: {
    isEncryptionAvailable: () => fixture.available,
    encryptString: (value: string) => Buffer.from(`encrypted:${value}`),
    decryptString: (value: Buffer) => {
      const encoded = value.toString()
      if (!encoded.startsWith('encrypted:')) throw new Error('Cannot decrypt')
      return encoded.slice('encrypted:'.length)
    }
  }
}))
const release = {
  version: '1.0.76-c.0',
  channel: 'canary',
  sourceSha: 'a'.repeat(40),
  bundleId: 'fixture-bundle'
} as const
beforeEach(() => {
  vi.resetModules()
  fixture.values.clear()
  fixture.available = true
})
afterEach(() => vi.unstubAllGlobals())

test('main decrypts an existing installation credential before minting a worker access token', async () => {
  fixture.values.set(IMPROVE_INSTALLATION_ID_SETTING, 'fixture-installation')
  const ciphertext = `enc:v1:${Buffer.from('encrypted:stored-installation-secret').toString('base64')}`
  fixture.values.set(IMPROVE_INSTALLATION_TOKEN_SETTING, ciphertext)
  const request = vi.fn(async (input: string, init: RequestInit) => {
    expect(input.endsWith('/v1/token')).toBe(true)
    expect(new Headers(init.headers).get('x-blume-installation-token')).toBe(
      'stored-installation-secret'
    )
    expect(init.body).not.toContain('enc:v1:')
    return Response.json({
      accessToken: 'short-lived-worker-jwt',
      expiresAt: new Date(Date.now() + 120_000).toISOString()
    })
  })
  vi.stubGlobal('fetch', request)
  const { getLlmInstallationAccessToken } = await import('../../src/main/installationCredentials')
  await expect(getLlmInstallationAccessToken(release)).resolves.toBe('short-lived-worker-jwt')
  expect(request).toHaveBeenCalledTimes(1)
  expect(fixture.values.get(IMPROVE_INSTALLATION_TOKEN_SETTING)).toBe(ciphertext)
})

test('main registers a new installation once and persists only encrypted credentials', async () => {
  const request = vi.fn(async () =>
    Response.json({
      installationId: 'fixture-installation',
      clientToken: 'new-installation-secret'
    })
  )
  vi.stubGlobal('fetch', request)
  const { getInstallationCredentials } = await import('../../src/main/installationCredentials')
  await Promise.all([getInstallationCredentials(), getInstallationCredentials()])
  expect(request).toHaveBeenCalledTimes(1)
  const stored = fixture.values.get(IMPROVE_INSTALLATION_TOKEN_SETTING)!
  expect(stored.startsWith('enc:v1:')).toBe(true)
  expect(stored).not.toBe('new-installation-secret')
})

test('unavailable OS encryption never persists a plaintext bootstrap credential', async () => {
  fixture.available = false
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      Response.json({
        installationId: 'fixture-installation',
        clientToken: 'new-installation-secret'
      })
    )
  )
  const { getInstallationCredentials } = await import('../../src/main/installationCredentials')
  await expect(getInstallationCredentials()).rejects.toThrow(
    'refusing to store the secret in plaintext'
  )
  expect(fixture.values.has(IMPROVE_INSTALLATION_TOKEN_SETTING)).toBe(false)
})
