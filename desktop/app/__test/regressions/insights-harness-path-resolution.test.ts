import { EventEmitter } from 'node:events'
import { readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

/**
 * Regression: BSI-58 — the canary (Finder/Dock-launched) reported Claude Code
 * and Codex as unavailable and insights silently fell back to the fixture, while
 * a terminal-launched build worked. Root cause: the harness probed/ran the CLIs
 * through a non-interactive login shell (`zsh -lc`), which never sources
 * ~/.zshrc — where tool-manager PATH entries (bun, n, …) live. A GUI launch gets
 * a minimal launchd PATH, so the bare-name lookup missed the CLIs.
 *
 * The fix resolves each CLI to an absolute path against a PATH discovered ONCE
 * from the user's *interactive* login shell (`-ilc`), then runs it through the
 * original *non-interactive* `-lc` shell with that PATH injected. The interactive
 * shell is confined to the no-input PATH probe, so the untrusted-transcript
 * analysis run never sources ~/.zshrc. These tests pin that topology: an
 * interactive probe, a non-interactive run, absolute-path invocation, and a clean
 * failure when the CLI is genuinely missing. `spawn` is mocked so no real shell
 * runs under CI.
 */

const mocks = vi.hoisted(() => ({ spawn: vi.fn() }))

vi.mock('node:child_process', () => ({ spawn: mocks.spawn }))

/** Minimal stand-in for a spawned child: emits a clean exit on the next tick. */
class FakeChild extends EventEmitter {
  exitCode: number | null = 0
  kill(): boolean {
    return true
  }
}

const ENV_KEYS = ['BLUME_REALCLI_BIN', 'BLUME_MYCLI_BIN'] as const

async function loadRunProcess(): Promise<
  typeof import('../../src/main/insights/nodeHarnessProcess')
> {
  // Fresh module each test so the process-lifetime PATH cache is reset.
  return import('../../src/main/insights/nodeHarnessProcess')
}

/** argv[0] of each mocked spawn call (the shell mode flag, e.g. -lc / -ilc). */
function shellModes(): string[] {
  return mocks.spawn.mock.calls.map((call) => call[1][0])
}

beforeEach(() => {
  vi.resetModules()
  mocks.spawn.mockReset()
  mocks.spawn.mockImplementation(() => {
    const child = new FakeChild()
    // Resolve waitForChild after its listeners attach. The fake writes no output
    // file, so captures/PATH probe read back empty — fine; these tests assert on
    // spawn arguments and the resolve/not-found contract, not parsed output.
    setImmediate(() => child.emit('close', 0, null))
    return child
  })
  for (const key of ENV_KEYS) delete process.env[key]
})

afterEach(() => {
  for (const key of ENV_KEYS) delete process.env[key]
})

describe('insights harness CLI resolution (BSI-58)', () => {
  test('resolveCommand resolves via an env override and rejects an unknown bin', async () => {
    const { resolveCommand, commandExists } = await loadRunProcess()
    process.env.BLUME_REALCLI_BIN = process.execPath // a real, absolute executable

    expect(await resolveCommand('realcli')).toBe(process.execPath)
    expect(await commandExists('realcli')).toBe(true)
    expect(await commandExists('totally-missing-cli-xyz')).toBe(false)
  })

  test('the PATH probe is interactive (-ilc); the analysis run is not (-lc)', async () => {
    const { runCliJson } = await loadRunProcess()
    process.env.BLUME_MYCLI_BIN = process.execPath

    await runCliJson({
      bin: 'mycli',
      args: ['--print'],
      prompt: 'hi',
      cwd: tmpdir(),
      timeoutMs: 1000
    })

    const modes = shellModes()
    expect(modes).toContain('-ilc') // one-time PATH probe sources ~/.zshrc
    expect(modes).toContain('-lc') // the actual run stays non-interactive
    // The untrusted-transcript run must never use an interactive shell.
    expect(modes).not.toContain('-lic')
    expect(modes).not.toContain('-i')
  })

  test('the run invokes the resolved absolute path, never the bare name', async () => {
    const { runCliJson } = await loadRunProcess()
    process.env.BLUME_MYCLI_BIN = process.execPath

    await runCliJson({
      bin: 'mycli',
      args: ['--print'],
      prompt: 'hi',
      cwd: tmpdir(),
      timeoutMs: 1000
    })

    const runCall = mocks.spawn.mock.calls.find((call) => call[1][0] === '-lc')
    expect(runCall).toBeTruthy()
    const commandLine = runCall?.[1][1] ?? ''
    expect(commandLine).toContain(process.execPath)
    expect(commandLine).toContain('--print')
  })

  test('an unresolvable CLI fails cleanly instead of running the bare name', async () => {
    const { runCliJson } = await loadRunProcess()

    const res = await runCliJson({
      bin: 'ghost-cli-xyz',
      args: [],
      prompt: 'hi',
      cwd: tmpdir(),
      timeoutMs: 1000
    })

    expect(res.json).toBeNull()
    expect(res.parseError).toMatch(/command not found/i)
    expect(res.exitCode).toBeNull()
    // No analysis run should have been spawned for an unresolved CLI.
    const ranAnalysis = mocks.spawn.mock.calls.some((call) => {
      return call[1][0] === '-lc' && String(call[1][1]).includes('ghost-cli-xyz')
    })
    expect(ranAnalysis).toBe(false)
  })

  test('Windows candidate names probe .exe/.cmd/.bat for a bare bin name', async () => {
    const { executableCandidateNames } = await loadRunProcess()
    expect(executableCandidateNames('claude', true)).toEqual([
      'claude.exe',
      'claude.cmd',
      'claude.bat'
    ])
    // A name that already carries an extension is used as-is.
    expect(executableCandidateNames('claude.exe', true)).toEqual(['claude.exe'])
    // POSIX keeps the bare name only.
    expect(executableCandidateNames('claude', false)).toEqual(['claude'])
  })

  test('Windows spawn plan: direct for .exe, cmd.exe /d /s /c for .cmd shims', async () => {
    const { win32SpawnPlan } = await loadRunProcess()

    expect(win32SpawnPlan('C:\\Users\\p\\.local\\bin\\claude.exe', ['--print'])).toEqual({
      file: 'C:\\Users\\p\\.local\\bin\\claude.exe',
      args: ['--print'],
      windowsVerbatimArguments: false
    })

    const shim = win32SpawnPlan('C:\\Users\\p q\\AppData\\Roaming\\npm\\claude.cmd', ['--print'])
    expect(shim.file).toBe(process.env.ComSpec ?? 'cmd.exe')
    expect(shim.windowsVerbatimArguments).toBe(true)
    // Spacey path is CRT-quoted, bare flags stay bare, outer quotes pair with /s.
    expect(shim.args).toEqual([
      '/d',
      '/v:off',
      '/s',
      '/c',
      '""C:\\Users\\p q\\AppData\\Roaming\\npm\\claude.cmd" --print"'
    ])

    // Embedded quotes (inline JSON config) survive via CRT escaping.
    const json = win32SpawnPlan('C:\\x\\claude.cmd', ['--mcp-config', '{"a":"b c"}'])
    expect(json.args[4]).toBe('""C:\\x\\claude.cmd" --mcp-config "{\\"a\\":\\"b c\\"}""')

    // cmd.exe metacharacters are refused rather than escaped — argv is
    // app-controlled (the untrusted prompt travels over stdin), so a hit is an
    // upstream bug, not a quoting need.
    expect(() => win32SpawnPlan('C:\\x\\claude.cmd', ['--flag=a&b'])).toThrow(/unsupported/)
  })

  test('captures through non-interactive zsh with temp-file stdio', async () => {
    const { runCliCapture } = await loadRunProcess()
    const spawnCalls: Array<any[]> = []
    const nowValues = [100, 145]
    const nowMs = () => nowValues.shift() ?? 145
    const fakeSpawn = ((...args: any[]) => {
      spawnCalls.push(args)
      const child = new FakeChild()
      setImmediate(async () => {
        const commandLine = String(args[1][1])
        const match = / < '([^']+)' > '([^']+)' 2> '([^']+)'$/.exec(commandLine)
        expect(match).toBeTruthy()
        const [, promptPath, stdoutPath, stderrPath] = match ?? []
        expect(await readFile(promptPath, 'utf8')).toBe('prompt text')
        await writeFile(stdoutPath, '{"ok":true}', 'utf8')
        await writeFile(stderrPath, 'diagnostic', 'utf8')
        child.emit('close', 0, null)
      })
      return child
    }) as any

    const capture = await runCliCapture({
      commandBase: "'/opt/bin/claude' '--print'",
      prompt: 'prompt text',
      cwd: tmpdir(),
      timeoutMs: 1000,
      env: { PATH: '/usr/bin' },
      spawnImpl: fakeSpawn,
      nowMs
    })

    expect(spawnCalls).toHaveLength(1)
    expect(spawnCalls[0][0]).toBe('/bin/zsh')
    expect(spawnCalls[0][1].slice(0, 1)).toEqual(['-lc'])
    expect(spawnCalls[0][2]?.stdio).toBe('ignore')
    expect(spawnCalls[0][2]?.env?.PATH).toBe('/usr/bin')
    expect(String(spawnCalls[0][1][1])).toMatch(/^'\/opt\/bin\/claude' '--print' < /)
    expect(capture).toEqual({
      stdout: '{"ok":true}',
      stderr: 'diagnostic',
      exitCode: 0,
      signal: null,
      timedOut: false,
      durationMs: 45
    })
  })
})
