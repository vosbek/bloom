import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const DESKTOP_SRC = resolve(HERE, '../../src')
const WORKSPACE_ROOT = resolve(HERE, '../../../..')

describe('artifact sync feature flag', () => {
  test('fails closed and gates sync reads and every shared setup surface in both runtimes', () => {
    const flags = readFileSync(resolve(DESKTOP_SRC, 'shared/featureFlags.ts'), 'utf8')
    // One catalog and one composition for both shells.
    const catalog = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/app/core/src/features/productFlags/catalog.ts'),
      'utf8'
    )
    const blumeApp = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/BlumeApp.tsx'),
      'utf8'
    )
    const desktopMain = readFileSync(resolve(DESKTOP_SRC, 'main/index.ts'), 'utf8')
    const desktopAccount = readFileSync(resolve(DESKTOP_SRC, 'main/accounts.ts'), 'utf8')
    const setupMain = readFileSync(resolve(DESKTOP_SRC, 'main/setup.ts'), 'utf8')
    const preload = readFileSync(resolve(DESKTOP_SRC, 'preload/index.ts'), 'utf8')
    const sidecarAppProps = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/sidecarAppProps.ts'),
      'utf8'
    )
    const setupRoute = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/pages/SetupRoute.tsx'),
      'utf8'
    )
    const setupView = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/features/setup/SetupView.tsx'),
      'utf8'
    )
    const inventory = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/features/setup/ArtifactInventory.tsx'),
      'utf8'
    )
    const moreMenu = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/features/setup/artifactActions.tsx'),
      'utf8'
    )

    expect(catalog).toContain("ARTIFACT_SYNC_FLAG = 'artifact-sync'")
    expect(catalog).toMatch(/artifactSync: ARTIFACT_SYNC_FLAG/)
    expect(flags).toMatch(/key: ARTIFACT_SYNC_FLAG[\s\S]*rolloutPercentage: 0/)
    expect(blumeApp).toMatch(/<SidecarApp[\s\S]*artifactSyncEnabled=\{flags\.artifactSync\}/)
    expect(desktopMain).toMatch(
      /isArtifactSyncEnabled: \(\) => isPosthogFeatureEnabled\(ARTIFACT_SYNC_FLAG\)/
    )
    expect(setupMain).toMatch(/if \(!\(await deps\.isArtifactSyncEnabled\(\)\)\) return/)
    expect(setupMain).toMatch(/if \(!\(await deps\.isArtifactSyncEnabled\(\)\)\) return \[\]/)
    expect(setupMain).toMatch(/isAccountAuthenticationRequired\(error\)\) return \[\]/)
    expect(preload).toMatch(
      /const serializedValue = JSON\.stringify\(value\)[\s\S]*serializedValue !== undefined[\s\S]*Buffer\.byteLength\(serializedValue, 'utf8'\)/
    )
    expect(sidecarAppProps).toMatch(/artifactSyncEnabled = false/)
    expect(setupRoute).toMatch(/<SetupView[\s\S]*artifactSyncEnabled=\{artifactSyncEnabled\}/)
    expect(setupView).toMatch(/host\.account\.getSession\(\)/)
    expect(setupView).toMatch(/host\.account\.onChanged\(onChanged\)/)
    expect(setupView).toMatch(/readArtifactSyncAccountAvailability\(/)
    expect(setupView).toMatch(/canReadArtifactSyncState\(/)
    expect(desktopAccount).toMatch(
      /if \(answer\.kind === 'signedOut'\) return null\s+if \(answer\.kind === 'unavailable'\) throw new AccountServiceUnavailableError/
    )
    expect(setupView).toMatch(
      /artifactSyncAvailable \? \([\s\S]*<MissingSyncedArtifacts[\s\S]*onOpenSyncSettings=[\s\S]*\) : null/
    )
    expect(setupView).toMatch(
      /artifactSyncAvailable && view\.kind === 'artifact'[\s\S]*host\.setup\.listSyncStates/
    )
    expect(inventory).toMatch(
      /syncEnabled \? host\.setup\.listSyncStates\(availableSyncTargets\) : Promise\.resolve\(\[\]\)/
    )
    expect(inventory).toMatch(/syncEnabled && folderSyncTarget/)
    // Sync actions exist only when the flag makes sync available.
    expect(moreMenu).toMatch(/sync &&\s+syncSubmenu\(/)
    expect(inventory).toMatch(/sync: syncEnabled\s*\?/)
    expect(setupView).toMatch(/sync: artifactSyncAvailable\s*\?/)
  })
})
