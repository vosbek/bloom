import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const DESKTOP_SRC = resolve(HERE, '../../src')
const WORKSPACE_ROOT = resolve(HERE, '../../../..')

describe('accounts and feature requests rollout flag', () => {
  test('fails closed and gates both account entry points and the shared board', () => {
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
    const desktopSource = readFileSync(
      resolve(DESKTOP_SRC, 'renderer/src/product/flagSource.ts'),
      'utf8'
    )
    const nativeIpc = readFileSync(resolve(DESKTOP_SRC, 'main/nativeIpcRegistration.ts'), 'utf8')
    const preload = readFileSync(resolve(DESKTOP_SRC, 'preload/index.ts'), 'utf8')
    const sidecarAppProps = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/sidecarAppProps.ts'),
      'utf8'
    )
    const feedbackRoute = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/shell/pages/FeedbackRoute.tsx'),
      'utf8'
    )
    const feedbackView = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/sidecar/ui/src/features/feedback/FeedbackView.tsx'),
      'utf8'
    )
    const webLabSource = readFileSync(
      resolve(WORKSPACE_ROOT, 'apps/web-lab/src/runtime/flagSource.ts'),
      'utf8'
    )
    const deployedWebLabWorkflows = [
      '.github/workflows/web-lab-pr-preview.yml',
      '.github/workflows/release-canary.yml',
      // release.yml calls this workflow to build and deploy the stable Web Lab.
      '.github/workflows/release-backend-deploy.yml'
    ].map((path) => readFileSync(resolve(WORKSPACE_ROOT, path), 'utf8'))

    // One catalog; the desktop lists its rollout, both shells read it through useProductFlags.
    expect(catalog).toContain(
      "ACCOUNTS_AND_FEATURE_REQUESTS_FLAG = 'accounts-and-feature-requests'"
    )
    expect(catalog).toMatch(/accountsAndFeatureRequests: ACCOUNTS_AND_FEATURE_REQUESTS_FLAG/)
    expect(flags).toMatch(/key: ACCOUNTS_AND_FEATURE_REQUESTS_FLAG/)
    expect(flags).toMatch(/key: ACCOUNTS_AND_FEATURE_REQUESTS_FLAG[\s\S]*rolloutPercentage: 100/)
    // Fails closed: every flag starts off until its source answers.
    expect(productFlags).toMatch(/PRODUCT_BOOLEAN_FLAGS\)\.map\(\(name\) => \[name, false\]\)/)
    expect(desktopSource).toMatch(
      /isPosthogFeatureFlagKey\(key\)\) return watchFeatureFlag\(key, onChange\)/
    )
    expect(preload).toMatch(
      /getPosthogFeatureFlagEnabled:[\s\S]*ipcRenderer\.invoke\('posthog:featureFlagEnabled', key\)/
    )
    expect(nativeIpc).toMatch(
      /handleIpc\('posthog:featureFlagEnabled'[\s\S]*isPosthogFeatureFlagKey\(flagKey\)[\s\S]*isPosthogFeatureEnabled\(flagKey\)/
    )
    expect(blumeApp).toMatch(
      /<SidecarApp[\s\S]*accountsAndFeatureRequestsEnabled=\{flags\.accountsAndFeatureRequests\}/
    )
    expect(blumeApp).toMatch(
      /<UsageFooter[\s\S]*accountEnabled=\{flags\.accountsAndFeatureRequests\}/
    )
    expect(webLabSource).toMatch(/watchPosthogEnabled\(key, onChange\)/)
    expect(sidecarAppProps).toMatch(/accountsAndFeatureRequestsEnabled = false/)
    expect(feedbackRoute).toMatch(
      /<FeedbackView[\s\S]*featureRequestsEnabled=\{accountsAndFeatureRequestsEnabled\}/
    )
    expect(feedbackView).toMatch(
      /const board = featureRequestsEnabled \? host\.feedback\.board : null/
    )
    expect(feedbackView).toMatch(/useFeedbackBoardAccess\(board\)/)
    // The board preview renders only for a board the flag allowed (inline or held in a variable).
    expect(feedbackView).toMatch(/[{=] board \? \(\s*<FeedbackBoardPreview/)
    for (const workflow of deployedWebLabWorkflows) {
      expect(workflow).toMatch(/VITE_POSTHOG_KEY: \$\{\{ secrets\.VITE_POSTHOG_KEY \}\}/)
      expect(workflow).not.toContain('VITE_ACCOUNTS_AND_FEATURE_REQUESTS_ENABLED')
    }
  })
})
