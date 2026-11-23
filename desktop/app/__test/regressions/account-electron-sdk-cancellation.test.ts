import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { createAuthClient } from 'better-auth/client'
// Exercise the installed, patched SDK rather than the usual desktop-test stub.
import { electronClient } from '../../node_modules/@better-auth/electron/dist/client.mjs'

const native = vi.hoisted(() => ({ openExternal: vi.fn(), send: vi.fn(), fetcher: vi.fn() }))
vi.mock('electron', () => {
  const electron = {
    app: { userAgentFallback: 'Blume Test' },
    shell: { openExternal: native.openExternal },
    safeStorage: {
      isEncryptionAvailable: () => true,
      encryptString: (value: string) => Buffer.from(value),
      decryptString: (value: Buffer) => value.toString()
    },
    webContents: { getFocusedWebContents: () => ({ send: native.send }) }
  }
  return { default: electron, shell: electron.shell }
})

const processType = Object.getOwnPropertyDescriptor(process, 'type')
beforeEach(() => {
  Object.defineProperty(process, 'type', { configurable: true, value: 'browser' })
  native.openExternal.mockReset().mockResolvedValue(undefined)
  native.send.mockReset()
  native.fetcher.mockReset().mockResolvedValue(Response.json({ user: { id: 'current' } }))
  vi.stubGlobal('fetch', native.fetcher)
})
afterEach(() => {
  if (processType) Object.defineProperty(process, 'type', processType)
  else Reflect.deleteProperty(process, 'type')
  vi.unstubAllGlobals()
})

function client() {
  const storage = new Map<string, string>()
  const auth = createAuthClient({
    baseURL: 'https://auth.example',
    plugins: [
      electronClient({
        signInURL: 'https://auth.example/login',
        protocol: { scheme: 'codes.blume' },
        storage: {
          getItem: (name) => storage.get(name),
          setItem: (name, value) => {
            storage.set(name, value)
          }
        }
      })
    ]
  })
  return { auth, storage }
}

function callback() {
  const url = new URL(native.openExternal.mock.calls.at(-1)![0])
  expect(url.searchParams.has('signal')).toBe(false)
  return Buffer.from(
    JSON.stringify({ state: url.searchParams.get('state'), identifier: 'test-code' })
  ).toString('base64url')
}

test('cancel removes only the old verifier; its callback cannot consume the new attempt', async () => {
  const { auth } = client()
  const old = new AbortController()
  await auth.requestAuth({ provider: 'google', signal: old.signal })
  const oldToken = callback()
  old.abort()
  const current = new AbortController()
  await auth.requestAuth({ provider: 'github', signal: current.signal })
  const token = callback()
  const fetcher = native.fetcher
  await expect(auth.authenticate({ token: oldToken })).rejects.toThrow('Code verifier not found')
  expect(fetcher).not.toHaveBeenCalled()
  await auth.authenticate({ token, fetchOptions: { signal: current.signal } })
  expect(fetcher).toHaveBeenCalledTimes(1)
  current.abort()
})

test('an already cancelled attempt never opens the browser', async () => {
  const { auth } = client()
  const controller = new AbortController()
  controller.abort()
  await expect(
    auth.requestAuth({ provider: 'google', signal: controller.signal })
  ).rejects.toThrow()
  expect(native.openExternal).not.toHaveBeenCalled()
})

test('cancel after the response arrives but before its body is read never stores session cookies', async () => {
  const { auth, storage } = client()
  const controller = new AbortController()
  await auth.requestAuth({ provider: 'google', signal: controller.signal })
  const token = callback()
  let body!: ReadableStreamDefaultController<Uint8Array>
  let received!: () => void
  const receivedResponse = new Promise<void>((resolve) => {
    received = resolve
  })
  native.fetcher.mockResolvedValue(
    new Response(
      new ReadableStream({
        start(value) {
          body = value
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'better-auth.session_token=abandoned; Path=/; HttpOnly'
        }
      }
    )
  )
  const exchange = expect(
    auth.authenticate({
      token,
      fetchOptions: {
        signal: controller.signal,
        onResponse: () => {
          received()
        }
      }
    })
  ).rejects.toThrow()
  await receivedResponse
  controller.abort()
  body.enqueue(new TextEncoder().encode(JSON.stringify({ user: { id: 'abandoned' } })))
  body.close()
  await exchange
  expect(storage.size).toBe(0)
  expect(native.send).not.toHaveBeenCalled()
})
