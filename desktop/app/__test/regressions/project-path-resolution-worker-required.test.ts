import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const SRC_MAIN = resolve(HERE, '../../src/main')

describe('desktop project path resolution worker policy', () => {
  test('uses a cancellable bundled worker and never lists projects in the renderer host', () => {
    const host = readFileSync(resolve(SRC_MAIN, 'projects/projectPathResolutionHost.ts'), 'utf8')
    const worker = readFileSync(
      resolve(SRC_MAIN, 'projects/projectPathResolutionWorker.ts'),
      'utf8'
    )
    const electronHost = readFileSync(
      resolve(HERE, '../../../../packages/sidecar/host-electron/src/electronHost.ts'),
      'utf8'
    )
    const webHost = readFileSync(
      resolve(HERE, '../../../../packages/sidecar/host-web/src/webHost.ts'),
      'utf8'
    )
    const config = readFileSync(resolve(HERE, '../../electron.vite.config.ts'), 'utf8')

    expect(host).toContain('utilityProcess.fork')
    expect(host).toContain('cancelProjectPathResolution')
    expect(host).toContain('BLUME_BACKGROUND_PROCESS_SERVICES.projectPathResolution')
    expect(host).toContain('backgroundProcessServiceInstanceName(')
    expect(host).toContain('startBackgroundProcessRequest(')
    expect(host).toContain('finishBackgroundProcessRequest(')
    expect(host).toContain('terminateBackgroundProcess(')
    expect(worker).toContain('listDesktopProjectPathResolutionCandidates')
    expect(config).toContain(
      "projectPathResolutionWorker: resolve('src/main/projects/projectPathResolutionWorker.ts')"
    )
    expect(electronHost).toContain('api.resolveProjectPath(path, requestId)')
    expect(electronHost).not.toContain(
      'resolveProjectLocationForPath(toViews(await api.listProjects()), path)'
    )
    expect(webHost).toContain('client.resolveProjectPath(sessionId, path, { signal })')
  })
})
