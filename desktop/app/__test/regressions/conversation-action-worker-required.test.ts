import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')
const WORKER_ENTRY = resolve(SRC_MAIN, 'conversations/actionWorker.ts')
const WORKER_HOST = resolve(SRC_MAIN, 'conversations/actionHost.ts')
const NATIVE_IPC = resolve(SRC_MAIN, 'nativeIpcRegistration.ts')
const BUILD_CONFIG = resolve(HERE, '../../electron.vite.config.ts')
const IMPORT_RE = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g

function resolveRelative(fromFile: string, spec: string): string | null {
  const base = resolve(dirname(fromFile), spec)
  for (const candidate of [base, `${base}.ts`, resolve(base, 'index.ts')]) {
    if (candidate.endsWith('.ts') && existsSync(candidate)) return candidate
  }
  return null
}

function workerImportGraph(entry: string): { files: Set<string>; externals: Set<string> } {
  const files = new Set<string>()
  const externals = new Set<string>()
  const queue = [entry]
  while (queue.length > 0) {
    const file = queue.pop()
    if (!file || files.has(file)) continue
    files.add(file)
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(IMPORT_RE)) {
      const spec = match[1]
      if (spec.startsWith('.')) {
        const imported = resolveRelative(file, spec)
        if (imported) queue.push(imported)
      } else {
        externals.add(spec)
      }
    }
  }
  return { files, externals }
}

describe('desktop conversation action worker policy', () => {
  test('routes scalable actions through a bundled utility worker without a main fallback', () => {
    const host = readFileSync(WORKER_HOST, 'utf8')
    const config = readFileSync(BUILD_CONFIG, 'utf8')

    expect(host).toContain('utilityProcess.fork')
    expect(host).toContain('WORKER_INACTIVITY_TIMEOUT_MS')
    expect(host).toContain('WORKER_TOTAL_TIMEOUT_MS')
    expect(host).toContain('serializedActions')
    expect(host).toContain(
      "if (disposed) throw new Error('Conversation action workers are disposed')"
    )
    expect(host).toContain('disposed = true')
    expect(host).not.toContain('openDesktopSqliteStorage')
    expect(host).not.toContain('git worktree add')
    expect(config).toContain("actionWorker: resolve('src/main/conversations/actionWorker.ts')")
  })

  test('keeps the action worker graph independent from Electron and its main adapter', () => {
    const { files, externals } = workerImportGraph(WORKER_ENTRY)

    expect(externals.has('electron')).toBe(false)
    expect(files.has(WORKER_HOST)).toBe(false)
    expect(files.has(WORKER_ENTRY)).toBe(true)
  })

  test('opens installed macOS editors by bundle id and reports open failures', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(worker).toContain("'com.microsoft.VSCode'")
    expect(worker).toContain("'dev.zed.Zed'")
    expect(worker).toContain("await runProcess('open', ['-b', bundleId, path]")
    expect(worker).not.toContain("process.platform === 'darwin') await runProcess('open'")
  })

  test('reveals explicit files through the same utility worker before opening storage', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')
    const nativeIpc = readFileSync(NATIVE_IPC, 'utf8')
    const explicitFileAction = worker.indexOf("input.action === 'open-file'")
    const storageOpen = worker.indexOf('openDesktopSqliteStorage(input.dbPath)')

    expect(explicitFileAction).toBeGreaterThan(-1)
    expect(explicitFileAction).toBeLessThan(storageOpen)
    expect(worker).toContain("await runProcess('open', ['-R', path]")
    expect(worker).toContain("await runProcess('explorer.exe', [`/select,${path}`]")
    expect(worker).not.toContain('function spawnDetached(')
    expect(nativeIpc).toContain("handleIpc('system:openFileLocation'")
    expect(nativeIpc).toContain("runConversationAction({ action: 'open-file', path, target })")
    expect(worker).toContain("input.action === 'open-folder'")
    expect(worker).toContain(
      "await openLocation(await nearestExistingFolder(input.path), 'finder')"
    )
    expect(nativeIpc).toContain("handleIpc('system:openFolderLocation'")
    expect(nativeIpc).toContain("runConversationAction({ action: 'open-folder', path })")
  })

  test('uses the shared injection-safe Windows spawn plan for the VS Code command shim', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(worker).toContain("win32SpawnPlan('code.cmd', [path], process.env.ComSpec)")
    expect(worker).toContain('windowsVerbatimArguments: plan.windowsVerbatimArguments')
    expect(worker).not.toContain('BLUME_OPEN_PATH')
  })

  test('runs and reports every rollback step when session creation fails', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(worker).toMatch(/unlink\(continuation\.sourcePath\)/)
    expect(worker).toMatch(/'worktree',[\s\S]*'remove',[\s\S]*'--force'/)
    expect(worker).toMatch(/'branch',[\s\S]*'-D',[\s\S]*continuation\.branch/)
    expect(worker).toContain('Failed to remove conversation source during rollback')
    expect(worker).toContain('Failed to remove conversation worktree during rollback')
    expect(worker).toContain('Failed to delete conversation branch during rollback')
    expect(worker).not.toContain("if (error.code !== 'ENOENT') throw error")
    expect(worker).toContain('prepareConversationContinuation(')
  })

  test('keeps worker-owned storage open until continuation preparation settles', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(worker).toContain('return await prepareConversationContinuation(')
    expect(worker).toMatch(
      /return await prepareConversationContinuation\([\s\S]*finally \{\s*handle\.close\(\)/
    )
  })

  test('waits for timed-out child processes and escalates termination once', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(worker).toContain("child.kill('SIGTERM')")
    expect(worker).toContain("child.kill('SIGKILL')")
    expect(worker).toContain('if (settled) return')
    expect(worker).toMatch(/if \(timedOut\) finish\(\(\) => reject/)
  })

  test('ingests continued conversations without launching a harness or terminal', () => {
    const nativeIpc = readFileSync(NATIVE_IPC, 'utf8')
    const continuationStart = nativeIpc.indexOf("handleIpc('conversations:continue'")
    const continuation = nativeIpc.slice(
      continuationStart,
      nativeIpc.indexOf('registerDesktopDbIpcHandlers', continuationStart)
    )

    expect(nativeIpc).toContain('createConversationContinuationService({')
    expect(nativeIpc).toContain('targetPaths: [prepared.sourcePath]')
    expect(nativeIpc).toContain('rollback: rollbackConversationViaWorker')
    expect(continuation).toContain('return continueConversation(ref, target)')
    expect(continuation).not.toContain('conversationRuntime.resume')
  })
})
