import { EventEmitter } from 'node:events'
import { afterEach, describe, expect, test, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  getSetting: vi.fn(() => 'Terminal'),
  openExternal: vi.fn(() => Promise.resolve()),
  openTerminalPage: vi.fn(() => Promise.resolve()),
  spawn: vi.fn()
}))

vi.mock('electron', () => ({
  shell: {
    openExternal: mocks.openExternal
  }
}))
vi.mock('child_process', () => ({ spawn: mocks.spawn }))
vi.mock('../../src/main/settingsStore', () => ({ getSetting: mocks.getSetting }))
vi.mock('../../src/main/terminal/host', () => ({ openTerminalPage: mocks.openTerminalPage }))

import { openInTerminal, resumeConversation } from '../../src/main/conversations/resume'

const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

function setPlatform(value: NodeJS.Platform): void {
  Object.defineProperty(process, 'platform', { value, configurable: true })
}

function childProcess(options: { spawn?: boolean; error?: Error; exitCode?: number } = {}) {
  const child = Object.assign(new EventEmitter(), { unref: vi.fn() })
  process.nextTick(() => {
    if (options.error) child.emit('error', options.error)
    if (options.spawn) child.emit('spawn')
    if (options.exitCode !== undefined) child.emit('exit', options.exitCode)
  })
  return child
}

afterEach(() => {
  if (originalPlatform) Object.defineProperty(process, 'platform', originalPlatform)
  mocks.getSetting.mockReset()
  mocks.getSetting.mockReturnValue('Terminal')
  mocks.openExternal.mockReset()
  mocks.openExternal.mockResolvedValue(undefined)
  mocks.openTerminalPage.mockReset()
  mocks.openTerminalPage.mockResolvedValue(undefined)
  mocks.spawn.mockReset()
})

describe('conversation resume native adapter', () => {
  test('opens commands in Blume terminal without launching a native terminal app', async () => {
    setPlatform('darwin')

    await openInTerminal('codex', '/repo/app', 'codex login')

    expect(mocks.openTerminalPage).toHaveBeenCalledWith({
      harnessId: 'codex',
      cwd: '/repo/app',
      command: 'codex login',
      title: 'Codex'
    })
    expect(mocks.spawn).not.toHaveBeenCalled()
  })

  test('opens Claude by app name on macOS', async () => {
    setPlatform('darwin')
    const child = childProcess()
    mocks.spawn.mockReturnValue(child)

    await resumeConversation({ source: 'claude', id: 'abc', entrypoint: 'claude-desktop' })

    expect(mocks.spawn).toHaveBeenCalledWith('open', ['-a', 'Claude'], { detached: true })
    expect(child.unref).toHaveBeenCalled()
  })

  test('opens Claude protocol off macOS for Claude app resume', async () => {
    setPlatform('linux')

    await resumeConversation({ source: 'claude', id: 'abc', entrypoint: 'claude-desktop' })

    expect(mocks.openExternal).toHaveBeenCalledWith('claude://')
    expect(mocks.spawn).not.toHaveBeenCalled()
  })

  test('resumes terminal conversations in the embedded terminal page', async () => {
    setPlatform('darwin')
    await resumeConversation({ source: 'codex', id: 'codex-1', cwd: '/repo/app' })

    expect(mocks.getSetting).not.toHaveBeenCalled()
    expect(mocks.openTerminalPage).toHaveBeenCalledWith({
      harnessId: 'codex',
      cwd: '/repo/app',
      command: 'codex resume codex-1',
      title: 'Codex'
    })
    expect(mocks.spawn).not.toHaveBeenCalled()
  })

  test('preserves the harness identity for terminal commands without a harness prefix', async () => {
    await resumeConversation({ source: 'pi', id: 'pi-1', cwd: '/repo/app' })

    expect(mocks.openTerminalPage).toHaveBeenCalledWith({
      harnessId: 'pi',
      cwd: '/repo/app',
      command: 'pi',
      title: 'pi'
    })
  })
})
