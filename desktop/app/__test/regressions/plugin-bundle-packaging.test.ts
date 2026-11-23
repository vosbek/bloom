import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const desktopRoot = fileURLToPath(new URL('../..', import.meta.url))
const read = (path: string) => readFileSync(join(desktopRoot, path), 'utf8')

// The in-app plugin installer runs the setup script the app ships. If the bundle is not built
// into plugin-bundle-out (outside out/, which release steps rewrite), copied into Resources, and named to the Deliveries worker, every
// install in a packaged app fails with "does not include the plugin installer".
describe('the desktop app ships the plugin bundle its installer runs', () => {
  test('the production build writes plugin:bundle into plugin-bundle-out, outside out/', () => {
    const build = read('scripts/electron-vite-build.mjs')
    expect(build).toContain("new URL('../plugin-bundle-out', import.meta.url)")
    expect(build).not.toContain('out/plugin-bundle')
    expect(build).toContain("'plugin:bundle', '--out', bundlePath")
  })

  test('electron-builder copies it into Resources/plugin-bundle', () => {
    const config = read('electron-builder.yml')
    expect(config).toMatch(
      /extraResources:\s*\n\s*- from: plugin-bundle-out\s*\n\s*to: plugin-bundle/
    )
  })

  test('main names the shipped bundle (or the dev launcher’s) to the Deliveries worker', () => {
    const main = read('src/main/index.ts')
    expect(main).toContain("join(process.resourcesPath, 'plugin-bundle')")
    expect(main).toContain('process.env.BLUME_PLUGIN_BUNDLE_DIR')
    expect(read('scripts/dev.mjs')).toContain('BLUME_PLUGIN_BUNDLE_DIR')
  })
})
