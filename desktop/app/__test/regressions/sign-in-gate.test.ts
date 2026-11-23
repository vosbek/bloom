import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '../../../..')
const read = (path: string) => readFileSync(resolve(ROOT, path), 'utf8')

describe('sign-in gate', () => {
  test('a confirmed sign-out holds the desktop at sign-in, with no experiment in between', () => {
    const desktop = read('apps/desktop/src/renderer/src/App.tsx')
    const webLab = read('apps/web-lab/src/main.tsx')
    const desktopUsage = read('apps/desktop/src/main/appUsage.ts')
    const productFlags = read('packages/sidecar/ui/src/shell/productFlags.ts')
    const blumeApp = read('packages/sidecar/ui/src/shell/BlumeApp.tsx')
    const shared = read('packages/sidecar/ui/src/shell/SidecarApp.tsx')

    // The desktop's workspace is the account's; mock deliveries run without one. Web Lab needs
    // the account only when it reads the hosted Deliveries runtime (it signs in to that).
    expect(desktop).toMatch(/requiresAccount=\{!MOCK_DELIVERIES\}/)
    expect(webLab).toMatch(/requiresAccount=\{Boolean\(resolvedHost\.deliveryHost\)\}/)
    expect(productFlags).not.toMatch(/loginRequired|requireLogin/)

    // The gate is the app session: only a confirmed sign-out gates it, every page goes to
    // sign-in, and the frame shows the title bar alone.
    expect(blumeApp).toMatch(
      /const gated = props\.requiresAccount && session\?\.status === 'signedOut'/
    )
    expect(blumeApp).toMatch(/account=\{props\.requiresAccount \? 'all' : 'none'\}/)
    expect(blumeApp).toMatch(/signedOut=\{gated\}/)
    expect(blumeApp).toMatch(/onProductAccessChange\?\.\(!gated\)/)
    expect(desktop).toMatch(/setAppUsageProductAccessAvailable\(available\)/)
    expect(desktopUsage).toMatch(
      /startAppUsageTracking[\s\S]*tracker\.setProductAccessAvailable\(false\)/
    )
    // The local pages render only inside the frame, so they keep no gate of their own.
    expect(shared).not.toMatch(/LoginRequiredGate|loginRequired|AccountPage/)
    expect(desktop).not.toMatch(/Pinned(Agents|Compact)View|pinned(Expanded|Mode|Content)/)
    expect(webLab).not.toMatch(/WebLabPinnedView|pinned &&|pinned(Expanded|Mode|Content)/)
  })
})
