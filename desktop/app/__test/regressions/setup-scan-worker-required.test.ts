import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')
const WORKER_ENTRY = resolve(SRC_MAIN, 'setupScanWorker.ts')
const SETUP_ADAPTER = resolve(SRC_MAIN, 'setup.ts')
const WORKER_HOST = resolve(SRC_MAIN, 'setupScanHost.ts')
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

describe('desktop setup scan worker policy', () => {
  test('routes project traversal through the bundled utility worker without a main fallback', () => {
    const setup = readFileSync(SETUP_ADAPTER, 'utf8')
    const host = readFileSync(WORKER_HOST, 'utf8')
    const config = readFileSync(BUILD_CONFIG, 'utf8')

    expect(setup).toContain('scanProjectInSetupWorker(path, requestId, context)')
    expect(setup).toContain('listHarnessSetup: () => scanGlobalSetupInSetupWorker()')
    expect(setup).toContain('desktopSetupBrowserService.registerProjectRoot(scan.path)')
    expect(setup).toContain('desktopSetupBrowserService.isUnsafeScanRoot(scan.path)')
    expect(setup).not.toContain('desktopSetupBrowserService.scanProject(path)')
    expect(setup).not.toContain(
      'listHarnessSetup: () => desktopSetupBrowserService.listHarnessSetup()'
    )
    expect(host).toContain('utilityProcess.fork')
    expect(host).toContain("type: 'cancel'")
    expect(host).toContain('WORKER_INACTIVITY_TIMEOUT_MS')
    expect(config).toContain("setupScanWorker: resolve('src/main/setupScanWorker.ts')")
  })

  test('keeps expected unresponsive/dispose/circuit-breaker reporting skips wired at capture sites', () => {
    const host = readFileSync(WORKER_HOST, 'utf8')
    const main = readFileSync(resolve(SRC_MAIN, 'index.ts'), 'utf8')
    const lifecycle = readFileSync(resolve(SRC_MAIN, 'nativeLifecycle.ts'), 'utf8')

    expect(host).toContain('shouldReportSetupScanAppError')
    expect(host).toContain('SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE')
    expect(host).toContain('SETUP_SCAN_WORKER_DISPOSED_MESSAGE')
    expect(host).toContain('SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE')
    expect(host).toMatch(
      /EXPECTED_SETUP_SCAN_WORKER_OPERATIONAL_MESSAGES = new Set\(\[[^\]]*SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE[^\]]*\]\)/
    )
    expect(host).toContain(
      'new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE)'
    )
    expect(host).toContain(
      'new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_DISPOSED_MESSAGE)'
    )
    expect(host).toContain(
      'new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE)'
    )
    expect(host).not.toContain("new SetupScanWorkerUnavailableError('setup scan worker unresponsive')")
    expect(host).not.toContain("new SetupScanWorkerUnavailableError('setup scan worker disposed')")
    expect(host).not.toContain(
      "new SetupScanWorkerUnavailableError('setup scan worker circuit breaker is cooling down')"
    )

    expect(main).toContain('if (!shouldReportSetupScanAppError(error)) return')
    expect(lifecycle).toContain('isExpectedSetupScanWorkerShutdownError')
  })

  test('keeps the setup scanner import graph independent from Electron', () => {
    const { files, externals } = workerImportGraph(WORKER_ENTRY)

    expect(externals.has('electron')).toBe(false)
    expect(files.has(WORKER_HOST)).toBe(false)
    expect(files.has(WORKER_ENTRY)).toBe(true)
  })

  test('serializes bounded scans and propagates AbortSignal to filesystem discovery', () => {
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(worker).toContain('SETUP_SCAN_WORKER_MAX_QUEUE')
    expect(worker).toContain('if (active || queue.length === 0) return')
    expect(worker).toContain('signal: controller.signal')
    expect(worker).toContain('active.controller.abort()')
  })

  test('keeps artifact snapshot and cloud transfer work in the utility worker', () => {
    const setup = readFileSync(SETUP_ADAPTER, 'utf8')
    const host = readFileSync(WORKER_HOST, 'utf8')
    const worker = readFileSync(WORKER_ENTRY, 'utf8')

    expect(setup).toContain('discoverArtifactSyncStatesInSetupWorker')
    expect(setup).toContain('syncArtifactsInSetupWorker')
    expect(setup).toContain('placeArtifactSyncedInSetupWorker')
    expect(host).toContain("type: 'sync-artifacts'")
    expect(worker).toContain('createArtifactCloudSyncRuntime')
    expect(worker).toContain('controller.signal')
    expect(worker).toContain('resolveAllowedArtifactSyncPath')
    expect(worker).toContain('createDesktopArtifactSyncFilePort')
    expect(worker).toContain('filePort:')
    expect(setup).not.toMatch(/\breadFile\(.*artifact/i)
    expect(setup).not.toMatch(/\bfetch\(/)
  })
})
