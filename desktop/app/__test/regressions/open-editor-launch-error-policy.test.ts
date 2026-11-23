import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const POLICY = resolve(
  HERE,
  '../../../../packages/app/core/src/features/nativeShell/openEditorLaunchErrorPolicy.ts'
)
const IPC_POLICY = resolve(
  HERE,
  '../../../../packages/app/core/src/features/nativeShell/ipcErrorReportingPolicy.ts'
)
const ACTION_WORKER = resolve(HERE, '../../src/main/conversations/actionWorker.ts')
const NATIVE_IPC = resolve(HERE, '../../src/main/nativeIpcRegistration.ts')

describe('open-editor launch error policy wiring', () => {
  it('keeps a dedicated policy for missing VS Code / Zed open failures', () => {
    const policy = readFileSync(POLICY, 'utf8')

    expect(policy).toContain('LSCopyApplicationURLsForBundleIdentifier')
    expect(policy).toContain('com.microsoft.VSCode')
    expect(policy).toContain('dev.zed.Zed')
    expect(policy).toContain('The file .+ does not exist')
    expect(policy).toContain('is not recognized as an internal or external command')
    expect(policy).toContain('failed \\(9009\\)')
    expect(policy).toContain('spawn(?:Sync)? (?:code(?:\\.cmd)?|zed) ENOENT')
    expect(policy).toContain('explorer\\.exe failed')
    expect(policy).toContain('The system cannot find the file specified')
    expect(policy).toContain("'conversations:openLocation'")
    expect(policy).toContain("'system:openFileLocation'")
    expect(policy).toContain("'system:openFolderLocation'")
  })

  it('classifies open-editor launch failures inside shared IPC error reporting', () => {
    const ipcPolicy = readFileSync(IPC_POLICY, 'utf8')

    expect(ipcPolicy).toContain(
      "import { isExpectedOpenEditorLaunchIpcFailure } from './openEditorLaunchErrorPolicy.ts'"
    )
    expect(ipcPolicy).toContain('isExpectedOpenEditorLaunchIpcFailure(channel, error)')
    expect(ipcPolicy).toContain("code: 'OPEN_EDITOR_LAUNCH_FAILED'")
  })

  it('keeps actionWorker open shapes aligned with the demotion policy', () => {
    const worker = readFileSync(ACTION_WORKER, 'utf8')
    const nativeIpc = readFileSync(NATIVE_IPC, 'utf8')

    expect(worker).toContain("'com.microsoft.VSCode'")
    expect(worker).toContain("'dev.zed.Zed'")
    expect(worker).toContain("await runProcess('open', ['-b', bundleId, path]")
    expect(worker).toContain("win32SpawnPlan('code.cmd', [path], process.env.ComSpec)")
    expect(worker).toContain("await runProcess('zed', [path]")
    expect(worker).toContain("await runProcess('explorer.exe', [path]")
    expect(worker).toContain("await runProcess('explorer.exe', [`/select,${path}`]")
    expect(worker).toContain('${command} failed')
    expect(worker).toContain('stderr.trim()')
    expect(nativeIpc).toContain("handleIpc('conversations:openLocation'")
    expect(nativeIpc).toContain("handleIpc('system:openFileLocation'")
    expect(nativeIpc).toContain("handleIpc('system:openFolderLocation'")
  })
})
