import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

const devModeBarUrl = new URL(
  '../../src/renderer/src/components/sidecar/DevModeBar.tsx',
  import.meta.url
)
const useDevInfoUrl = new URL('../../src/renderer/src/lib/useDevInfo.ts', import.meta.url)
const rendererMainUrl = new URL('../../src/renderer/src/main.tsx', import.meta.url)
const desktopPackageUrl = new URL('../../package.json', import.meta.url)
const packagedBuildUrl = new URL('../../scripts/electron-vite-build.mjs', import.meta.url)

describe('dev mode bar', () => {
  it('keeps the macOS identity panel visible while the header is hovered', async () => {
    const source =
      (await readFile(devModeBarUrl, 'utf8')) +
      (await readFile(
        new URL(
          '../../../../packages/sidecar/ui/src/components/RuntimeIdentityBar.tsx',
          import.meta.url
        ),
        'utf8'
      ))

    expect(source).not.toContain('group-hover/topbar:opacity-0')
    expect(source).not.toContain('reveals the native controls on header hover')
  })

  it('shows the active CDP port directly above the macOS DEV label', async () => {
    const source =
      (await readFile(devModeBarUrl, 'utf8')) +
      (await readFile(
        new URL(
          '../../../../packages/sidecar/ui/src/components/RuntimeIdentityBar.tsx',
          import.meta.url
        ),
        'utf8'
      ))

    expect(source).toContain('CDP {cdpPort}')
    expect(source.indexOf('CDP {cdpPort}')).toBeLessThan(source.indexOf('{label}'))
    expect(source).toContain('CDP port ${cdpPort}')
  })

  it('shares one bounded best-effort development metadata request', async () => {
    const [loaderSource, mainSource] = await Promise.all([
      readFile(useDevInfoUrl, 'utf8'),
      readFile(rendererMainUrl, 'utf8')
    ])

    expect(loaderSource).toContain('if (pending) return pending')
    expect(loaderSource).toContain('setTimeout(() => finish(null), DEV_INFO_TIMEOUT_MS)')
    expect(loaderSource).toContain('getDevInfo().then(finish, () => finish(null))')
    expect(mainSource).toContain('await loadDevInfo()')
    expect(mainSource).not.toContain('await window.api.getDevInfo()')
  })

  it('clears the static development flag for packaged renderer builds', async () => {
    const [packageSource, buildSource] = await Promise.all([
      readFile(desktopPackageUrl, 'utf8'),
      readFile(packagedBuildUrl, 'utf8')
    ])

    expect(packageSource).toContain('node ./scripts/electron-vite-build.mjs')
    expect(buildSource).toContain("VITE_BLUME_STATIC_DEV: '0'")
  })
})
