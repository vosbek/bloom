import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const DESKTOP_SRC = resolve(HERE, '../../src')
const WORKSPACE_ROOT = resolve(HERE, '../../../..')

describe('conversation continuation feature flag', () => {
  test('is read once, from the shared catalog, and passed into shared UI', () => {
    const flags = readFileSync(resolve(DESKTOP_SRC, 'shared/featureFlags.ts'), 'utf8')
    const catalog = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/app/core/src/features/productFlags/catalog.ts'),
      'utf8'
    )
    const productFlags = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/productFlags.ts'),
      'utf8'
    )
    const blumeApp = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/BlumeApp.tsx'),
      'utf8'
    )

    expect(catalog).toContain(
      "CONVERSATION_CONTINUATION_MENU_FLAG = 'desktop-conversation-continuation-menu'"
    )
    expect(catalog).toMatch(/conversationContinuation: CONVERSATION_CONTINUATION_MENU_FLAG/)
    expect(flags).toMatch(/key: CONVERSATION_CONTINUATION_MENU_FLAG/)
    // One watch per catalog flag, made by the shared hook.
    expect(productFlags).toMatch(
      /Object\.entries\(PRODUCT_BOOLEAN_FLAGS\)\.map\(\(\[name, key\]\) =>\s*source\.watchEnabled\(key/
    )
    expect(blumeApp).toMatch(
      /<SidecarApp[\s\S]*conversationContinuationEnabled=\{flags\.conversationContinuation\}/
    )
  })
})
