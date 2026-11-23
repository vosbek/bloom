import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'vitest'

const root = join(__dirname, '../..')
const host = readFileSync(join(root, 'src/main/terminal/host.ts'), 'utf8')
const worker = readFileSync(join(root, 'src/main/terminal/worker.ts'), 'utf8')
const preload = readFileSync(join(root, 'src/preload/index.ts'), 'utf8')
const resume = readFileSync(join(root, 'src/main/conversations/resume.ts'), 'utf8')
const devView = readFileSync(join(root, 'src/renderer/src/DevView.tsx'), 'utf8')
const webHost = readFileSync(join(root, '../../packages/sidecar/host-web/src/webHost.ts'), 'utf8')
const runnerController = readFileSync(
  join(root, '../../services/interactive-runner/src/sessionController.ts'),
  'utf8'
)
const runnerServer = readFileSync(
  join(root, '../../services/interactive-runner/src/server.ts'),
  'utf8'
)
// The app's main navigation is the rail.
const rail = readFileSync(join(root, '../../packages/sidecar/ui/src/shell/rail.ts'), 'utf8')

describe('embedded terminal architecture', () => {
  test('records terminal worker timeouts as intentional background terminations', () => {
    expect(host).toContain('BLUME_BACKGROUND_PROCESS_SERVICES.terminal')
    expect(host).toContain('startBackgroundProcessRequest(')
    expect(host).toContain('finishBackgroundProcessRequest(')
    expect(host).toContain('terminateBackgroundProcess(')
  })

  test('keeps PTY execution in a utility process with bounded renderer messages', () => {
    expect(host).toMatch(/utilityProcess\.fork/)
    expect(host).toMatch(/MAX_INPUT_BYTES = 64 \* 1024/)
    expect(host).toMatch(/MAX_BACKLOG_CHARS = 128 \* 1024/)
    expect(worker).toMatch(/MAX_OUTPUT_CHUNK_CHARS = 16 \* 1024/)
    expect(worker).toMatch(/data\.charCodeAt\(end - 1\)/)
    expect(preload).toMatch(/queuedChars > maxQueuedChars/)
    expect(host).toMatch(/ensureTerminalCapacity/)
    expect(host).toMatch(/serializeOpen/)
    expect(host).toMatch(/terminateBackgroundProcess\(next,/)
    expect(host).toMatch(/if \(worker !== next\) return/)
    expect(worker).toMatch(/createLocalRuntime/)
    expect(worker).toMatch(/runtime\.closeTerminal/)
    expect(worker).toMatch(
      /await runtime\.closeTerminal\(terminal\.handle\)[\s\S]*terminal\.detachStatus\(\)/
    )
    expect(worker).toMatch(/input\.harnessId === 'shell'/)
    expect(worker).toMatch(/`\$\{defaultShell\} -l`/)
    expect(worker).not.toMatch(/from ['"]electron['"]/)
  })

  test('replays bounded Web Lab output instead of dropping startup frames', () => {
    expect(webHost).toMatch(/maxTerminalBacklogChars = 128 \* 1024/)
    expect(webHost).toMatch(/mergeTerminalOutputSnapshot/)
    expect(runnerController).toMatch(/MAX_TERMINAL_BACKLOG_CHARS = 128 \* 1024/)
    expect(runnerController).toMatch(/terminalOutputSnapshots/)
    expect(runnerServer).toMatch(/Subscribe first, then replay the bounded per-tab backlog/)
  })

  test('conversation resumes request the embedded page without native terminal launchers', () => {
    expect(resume).toMatch(/openTerminalPage\(\{/)
    expect(resume).not.toMatch(/osascript/)
    expect(resume).not.toMatch(/wt\.exe/)
    expect(resume).not.toMatch(/cmd\.exe/)
  })

  test('exposes the terminal from diagnostics without adding a general navigation action', () => {
    expect(devView).toMatch(/title="Embedded terminal"/)
    expect(devView).toMatch(/<DevTerminalPage onBack=\{goMenu\}/)
    expect(rail).not.toMatch(/open-terminal/)
    expect(rail).not.toMatch(/terminal\.openPage/)
  })
})
