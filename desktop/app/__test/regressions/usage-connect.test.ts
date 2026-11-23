import { EventEmitter } from 'node:events'
import { afterEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  homedir: vi.fn(() => '/Users/tester'),
  spawn: vi.fn(),
  openInTerminal: vi.fn()
}))

vi.mock('node:child_process', () => ({ spawn: mocks.spawn }))
vi.mock('node:os', () => ({ homedir: mocks.homedir }))
// connect.ts imports these from conversations/resume, which transitively pulls
// in electron and the DB layer. Stub the module so the unit stays isolated.
vi.mock('../../src/main/conversations/resume', () => ({
  openInTerminal: mocks.openInTerminal
}))

import { openKeychainAccess, openProviderLogin } from '../../src/main/usage/connect'
import { CLAUDE_KEYCHAIN_SERVICE } from '@blume/app-core'

/** A spawned child that reports success on the next tick, like a real `open`. */
function spawnedChild(): EventEmitter & { unref: () => void } {
  const child = Object.assign(new EventEmitter(), { unref: vi.fn() })
  process.nextTick(() => child.emit('spawn'))
  return child
}

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

function setPlatform(value: NodeJS.Platform): void {
  Object.defineProperty(process, 'platform', { value, configurable: true })
}

afterEach(() => {
  if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
  mocks.homedir.mockReset()
  mocks.homedir.mockReturnValue('/Users/tester')
  mocks.spawn.mockReset()
  mocks.openInTerminal.mockReset()
})

describe('usage connection helpers', () => {
  test('opens the Keychain Access app by bundle id on macOS', async () => {
    setPlatform('darwin')
    mocks.spawn.mockImplementation(() => spawnedChild())

    await openKeychainAccess()

    expect(mocks.spawn).toHaveBeenCalledWith('open', ['-b', 'com.apple.keychainaccess'], {
      detached: true,
      stdio: 'ignore'
    })
  })

  test('refuses to launch Keychain Access off macOS', async () => {
    setPlatform('linux')

    await expect(openKeychainAccess()).rejects.toThrow(/only available on macOS/)
    expect(mocks.spawn).not.toHaveBeenCalled()
  })

  test('Claude keychain service name stays in sync with the CLI', () => {
    expect(CLAUDE_KEYCHAIN_SERVICE).toBe('Claude Code-credentials')
  })

  test('terminal sign-in opens the embedded terminal with the projected command', async () => {
    await openProviderLogin('codex')

    expect(mocks.openInTerminal).toHaveBeenCalledWith('codex', '/Users/tester', 'codex login')
  })

  test('terminal sign-in no longer falls back to a native terminal app', async () => {
    await openProviderLogin('claude')

    expect(mocks.openInTerminal).toHaveBeenCalledWith(
      'claude',
      '/Users/tester',
      'claude auth login'
    )
  })

  test('terminal sign-in failure explains how to complete login manually', async () => {
    mocks.openInTerminal.mockRejectedValue(new Error('terminal worker exited'))

    await expect(openProviderLogin('claude')).rejects.toThrow(
      "Blume couldn't open its terminal. Run “claude auth login” in a terminal, then return to Blume and try again."
    )
  })

  test('terminal sign-in refuses providers without touching terminal adapters', async () => {
    await expect(openProviderLogin('cursor')).rejects.toThrow(
      'No terminal sign-in flow for provider: cursor'
    )
    await expect(
      openProviderLogin('unknown' as Parameters<typeof openProviderLogin>[0])
    ).rejects.toThrow('No terminal sign-in flow for provider: unknown')

    expect(mocks.homedir).not.toHaveBeenCalled()
    expect(mocks.openInTerminal).not.toHaveBeenCalled()
  })
})
