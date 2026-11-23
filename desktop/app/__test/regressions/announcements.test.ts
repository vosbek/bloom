import { describe, expect, test, vi } from 'vitest'

import {
  createDesktopAnnouncementsFacade,
  type DesktopAnnouncementsDeps
} from '../../src/main/announcements'

function createHarness(overrides: Partial<DesktopAnnouncementsDeps> = {}) {
  const handlers = new Map<string, (...args: unknown[]) => unknown>()
  const copyText = vi.fn()
  const openExternal = vi.fn(async () => {})
  const fetch = vi.fn(async () => ({
    ok: true,
    status: 200,
    async json() {
      return { announcements: [] }
    }
  }))
  const facade = createDesktopAnnouncementsFacade({
    appVersion: () => '1.0.54',
    platform: 'darwin',
    channel: 'stable',
    fetch,
    copyText,
    openExternal,
    ...overrides
  })
  facade.registerIpcHandlers((channel, listener) => {
    handlers.set(channel, listener as (...args: unknown[]) => unknown)
  })
  return { handlers, fetch, copyText, openExternal }
}

describe('desktop announcements facade', () => {
  test('fetches the public auth proxy with the exact desktop target', async () => {
    const fetch = vi.fn(async () => ({
      ok: true,
      status: 200,
      async json() {
        return {
          announcements: [
            {
              id: 'recovery-1',
              title: 'Recovery',
              subtitle: 'Follow the recovery steps.',
              url: 'https://blume.codes/recovery'
            }
          ]
        }
      }
    }))
    const { handlers } = createHarness({ fetch })

    await expect(handlers.get('announcements:listActive')?.({})).resolves.toEqual([
      {
        id: 'recovery-1',
        title: 'Recovery',
        subtitle: 'Follow the recovery steps.',
        url: 'https://blume.codes/recovery'
      }
    ])
    const requestUrl = new URL(fetch.mock.calls[0][0])
    expect(requestUrl.origin).toBe('https://auth.blume.codes')
    expect(requestUrl.pathname).toBe('/v1/announcements/active')
    expect(Object.fromEntries(requestUrl.searchParams)).toEqual({
      platform: 'macos',
      channel: 'stable',
      appVersion: '1.0.54'
    })
    expect(fetch.mock.calls[0][1]).toMatchObject({ redirect: 'error' })
  })

  test('fails closed for redirects and malformed JSON', async () => {
    const redirect = createHarness({
      fetch: async () => ({ ok: false, status: 302, json: async () => ({}) })
    })
    await expect(redirect.handlers.get('announcements:listActive')?.({})).rejects.toThrow(
      'announcements request failed (302)'
    )

    const malformed = createHarness({
      fetch: async () => ({
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError('not JSON')
        }
      })
    })
    await expect(malformed.handlers.get('announcements:listActive')?.({})).rejects.toThrow(
      'not JSON'
    )
  })

  test('treats an older control plane without the endpoint as no announcements', async () => {
    const missing = createHarness({
      fetch: async () => ({ ok: false, status: 404, json: async () => ({}) })
    })

    await expect(missing.handlers.get('announcements:listActive')?.({})).resolves.toEqual([])
  })

  test('copies prompts without executing them and opens only HTTPS URLs', async () => {
    const { handlers, copyText, openExternal } = createHarness()
    await handlers.get('announcements:copyPrompt')?.({}, 'Inspect these instructions first.')
    expect(copyText).toHaveBeenCalledWith('Inspect these instructions first.')

    await handlers.get('announcements:openUrl')?.({}, 'https://blume.codes/recovery')
    expect(openExternal).toHaveBeenCalledWith('https://blume.codes/recovery')
    expect(() => handlers.get('announcements:openUrl')?.({}, 'http://example.com')).toThrow(
      'Announcement URLs must use HTTPS'
    )
  })
})
