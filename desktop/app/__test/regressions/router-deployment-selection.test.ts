import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const desktopRoot = fileURLToPath(new URL('../..', import.meta.url))
const source = (path: string): string => readFileSync(join(desktopRoot, path), 'utf8')

describe('router deployment selection', () => {
  test('PR preview startup requires and exports the exact Router endpoint', () => {
    const devLauncher = source('scripts/previewEnvironment.mjs')

    expect(devLauncher).toContain('validatePreviewDeploymentSetEnvelope(await response.json()')
    expect(devLauncher).toContain('BLUME_ROUTER_URL: services.router.url')
    expect(devLauncher).toContain('MAIN_VITE_BLUME_ROUTER_URL: services.router.url')
  })

  test('packaged startup embeds release backends before importing the application', () => {
    const viteConfig = source('electron.vite.config.ts')
    const bootstrap = source('src/main/backendManifestBootstrap.ts')
    const envTypes = source('src/main/env.d.ts')

    expect(viteConfig).toContain("index: resolve('src/main/backendManifestBootstrap.ts')")
    expect(bootstrap).toContain('BLUME_ROUTER_URL: import.meta.env.MAIN_VITE_BLUME_ROUTER_URL')
    expect(bootstrap).toContain(
      'BLUME_ARTIFACT_SYNC_URL: import.meta.env.MAIN_VITE_BLUME_ARTIFACT_SYNC_URL'
    )
    const bundledDefaults = bootstrap.indexOf(
      'applyBundledBackendDefaults(bundledBackends, process.env, app.isPackaged)'
    )
    expect(bundledDefaults).toBeGreaterThanOrEqual(0)
    expect(bundledDefaults).toBeLessThan(bootstrap.indexOf("import('./index')"))
    expect(envTypes).toContain('readonly MAIN_VITE_BLUME_ROUTER_URL?: string')
    expect(envTypes).toContain('readonly MAIN_VITE_BLUME_ARTIFACT_SYNC_URL?: string')
  })

  test('managed Router uses only the endpoint selected by startup', () => {
    const managedRouter = source('src/main/harnessManagedRouter.ts')

    expect(managedRouter).toContain('process.env.BLUME_ROUTER_URL')
    expect(managedRouter).not.toContain('blume-router.agentic-cms-olav.workers.dev')
  })
})
