import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

import {
  compareDesktopVersions,
  computeNextCanaryVersion,
  computePostStableCanaryBaseline,
  parseDesktopVersion,
  validateCanaryVersion,
  validateStableVersion
} from '../../../../.github/scripts/desktop-release/desktop-version.mjs'

const desktopRoot = fileURLToPath(new URL('../..', import.meta.url))

function hasRuntimeWorkspaceImport(source: string) {
  const normalized = source.replace(/\s+/g, ' ')
  return (
    /\bimport\s+(?!type\b)[^;]*?\sfrom\s*['"]@blume\//.test(normalized) ||
    /\b(?:require|import)\s*\(\s*['"]@blume\//.test(normalized)
  )
}

describe('packaged app never loads raw workspace TypeScript', () => {
  test('desktop builds include the local Raycast search helper', () => {
    const viteConfig = readFileSync(join(desktopRoot, 'electron.vite.config.ts'), 'utf8')
    expect(viteConfig).toContain("raycastSearch: resolve('src/main/raycastSearch.ts')")
  })

  // Workspace packages export raw src/*.ts. Electron cannot require those from
  // app.asar/node_modules (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING crashed
  // a packaged canary), so every workspace dependency of the main process must
  // be bundled by electron-vite instead of externalized to node_modules.
  test('every workspace dependency is excluded from main externalizeDeps', () => {
    const packageJson = JSON.parse(readFileSync(join(desktopRoot, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
    }
    const workspaceDeps = Object.entries(packageJson.dependencies ?? {})
      .filter(([, range]) => range.startsWith('workspace:'))
      .map(([name]) => name)
    expect(workspaceDeps.length).toBeGreaterThan(0)

    const viteConfig = readFileSync(join(desktopRoot, 'electron.vite.config.ts'), 'utf8')
    const excludeMatch = /externalizeDeps:\s*\{\s*exclude:\s*\[([^\]]*)\]/.exec(viteConfig)
    expect(
      excludeMatch,
      'main.build.externalizeDeps.exclude missing from electron.vite.config.ts'
    ).toBeTruthy()
    const excludeList = excludeMatch ? excludeMatch[1] : ''
    const excluded = Array.from(excludeList.matchAll(/['"]([^'"]+)['"]/g), (m) => m[1])

    for (const dep of workspaceDeps) {
      expect(excluded, `${dep} must be bundled into out/main (externalizeDeps.exclude)`).toContain(
        dep
      )
    }
  })

  // The exclude list above only covers the main-process build. Preload also
  // externalizes package.json dependencies by default, so a workspace import
  // there would reintroduce the same packaged-app crash.
  test('preload workspace imports are bundled instead of loaded as raw TypeScript', () => {
    const config = readFileSync(join(desktopRoot, 'electron.vite.config.ts'), 'utf8').split(
      'preload:'
    )[1]
    const excluded = [
      ...(config.match(/exclude:\s*\[([^\]]*)\]/)?.[1] ?? '').matchAll(/['"]([^'"]+)['"]/g)
    ].map((m) => m[1])
    const preloadDir = join(desktopRoot, 'src', 'preload')
    const offenders: string[] = []
    for (const entry of readdirSync(preloadDir, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile() || entry.name.endsWith('.d.ts')) continue
      if (!/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) continue
      const filePath = join(entry.parentPath, entry.name)
      const source = readFileSync(filePath, 'utf8').replace(
        /import type[\s\S]*?from\s*['"][^'"]+['"]/g,
        ''
      )
      for (const match of source.matchAll(/['"](@blume\/[^/'"]+)(?:[^'"]*)['"]/g)) {
        if (!excluded.includes(match[1])) offenders.push(`${filePath}: ${match[1]}`)
      }
    }
    expect(offenders).toEqual([])
  })

  test('runtime workspace import detector covers multiline preload imports', () => {
    expect(
      hasRuntimeWorkspaceImport("import {\n  createClient\n} from '@blume/insights-control'")
    ).toBe(true)
    expect(
      hasRuntimeWorkspaceImport("const mod = await import(\n  '@blume/insights-control'\n)")
    ).toBe(true)
    expect(hasRuntimeWorkspaceImport("const mod = require(\n  '@blume/insights-control'\n)")).toBe(
      true
    )
    expect(
      hasRuntimeWorkspaceImport("import type {\n  Client\n} from '@blume/insights-control'")
    ).toBe(false)
  })
})

describe('desktop release version ordering', () => {
  test('stable release computes the next canary baseline', () => {
    expect(computePostStableCanaryBaseline('1.0.51')).toBe('1.0.52-c.0')
    expect(computePostStableCanaryBaseline('1.2.9')).toBe('1.2.10-c.0')
  })

  test('manual canaries continue the baseline train', () => {
    expect(computeNextCanaryVersion({ latestStable: '1.0.51', latestCanary: '1.0.52-c.0' })).toBe(
      '1.0.52-c.1'
    )
    expect(computeNextCanaryVersion({ latestStable: '1.0.51', latestCanary: '1.0.52-c.4' })).toBe(
      '1.0.52-c.5'
    )
  })

  test('a canary train left over from the released stable restarts at the new baseline', () => {
    expect(computeNextCanaryVersion({ latestStable: '1.0.51', latestCanary: '1.0.51-c.7' })).toBe(
      '1.0.52-c.0'
    )
    expect(computeNextCanaryVersion({ latestStable: '1.0.51', latestCanary: null })).toBe(
      '1.0.52-c.0'
    )
  })

  test('stable supersedes every canary of the same base so canary users converge', () => {
    expect(compareDesktopVersions('1.0.52', '1.0.52-c.9')).toBe(1)
    expect(compareDesktopVersions('1.0.52-c.0', '1.0.51')).toBe(1)
  })

  test('canary numbers compare numerically, not lexicographically', () => {
    expect(compareDesktopVersions('1.0.52-c.2', '1.0.52-c.10')).toBe(-1)
  })

  test('stable validation allows releasing the version the canary train was testing', () => {
    expect(() =>
      validateStableVersion({
        requested: '1.0.52',
        latestStable: '1.0.51',
        latestCanary: '1.0.52-c.3'
      })
    ).not.toThrow()
    expect(() =>
      validateStableVersion({ requested: '1.0.51', latestStable: '1.0.51', latestCanary: null })
    ).toThrow(/greater than latest stable/)
    expect(() =>
      validateStableVersion({
        requested: '1.0.52',
        latestStable: '1.0.51',
        latestCanary: '1.0.53-c.0'
      })
    ).toThrow(/behind current canary train/)
  })

  test('canary validation refuses to move the canary feed backwards', () => {
    expect(() =>
      validateCanaryVersion({
        requested: '1.0.52-c.1',
        latestStable: '1.0.51',
        latestCanary: '1.0.52-c.0'
      })
    ).not.toThrow()
    expect(() =>
      validateCanaryVersion({
        requested: '1.0.52-c.0',
        latestStable: '1.0.51',
        latestCanary: '1.0.52-c.3'
      })
    ).toThrow(/greater than latest canary/)
    expect(() =>
      validateCanaryVersion({ requested: '1.0.51-c.4', latestStable: '1.0.51', latestCanary: null })
    ).toThrow(/greater than latest stable/)
  })

  test('only stable X.Y.Z and canary X.Y.Z-c.N versions are accepted', () => {
    expect(parseDesktopVersion('1.0.52').kind).toBe('stable')
    expect(parseDesktopVersion('1.0.52-c.3').kind).toBe('canary')
    expect(() => parseDesktopVersion('1.0.52-beta.1')).toThrow(/Unsupported desktop version/)
    expect(() => parseDesktopVersion('1.0.52-c.01x')).toThrow(/Unsupported desktop version/)
  })
})

describe('stable and canary package identity', () => {
  test('release workflow config and runtime use matching non-conflicting identities', () => {
    const releaseChannel = readFileSync(join(desktopRoot, 'src/main/releaseChannel.ts'), 'utf8')
    const desktopEntry = readFileSync(join(desktopRoot, 'src/main/index.ts'), 'utf8')
    const builderConfig = readFileSync(join(desktopRoot, 'electron-builder.yml'), 'utf8')
    const packageConfig = readFileSync(
      join(desktopRoot, '../../.github/scripts/desktop-release/configure-desktop-package.mjs'),
      'utf8'
    )

    for (const expected of ['page.blume.sidecar', 'page.blume.sidecar.canary', 'Blume Canary']) {
      expect(releaseChannel).toContain(expected)
      expect(packageConfig).toContain(expected)
    }
    expect(packageConfig).toContain("packageName: '@blume/desktop-canary'")
    expect(packageConfig).toContain("protocolScheme: 'blume-canary'")
    expect(packageConfig).toContain("executableName: 'blume-canary'")
    expect(builderConfig).toContain('artifactName: Blume-${version}-${arch}-mac.${ext}')
    expect(desktopEntry).toContain('skipStartupInstall: isCanaryRelease')
    const nativeStartup = readFileSync(join(desktopRoot, 'src/main/nativeStartup.ts'), 'utf8')
    expect(nativeStartup).toContain('getCanaryUserDataDir()')
    expect(nativeStartup).toContain('app.setPath(')
    expect(desktopEntry).toContain('nativeStartupEvents')
  })

  test('operator installer recognizes stable and canary app bundles', () => {
    const installer = readFileSync(join(desktopRoot, 'scripts/install-macos-dmg.mjs'), 'utf8')
    expect(installer).toContain("['Blume Canary.app', 'Blume.app']")
  })
})
