import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const HERE = dirname(fileURLToPath(import.meta.url))
const DESKTOP_SRC = resolve(HERE, '../../src')
const WORKSPACE_ROOT = resolve(HERE, '../../../..')

describe('job-board rollout flag', () => {
  test('fails closed and gates both the desktop and landing-page entry points', () => {
    const policy = readFileSync(
      resolve(WORKSPACE_ROOT, 'packages/app/core/src/features/careers/policy.ts'),
      'utf8'
    )
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
    const landing = readFileSync(
      resolve(WORKSPACE_ROOT, 'apps/website/src/components/sidecar/SidecarLandingPage.astro'),
      'utf8'
    )
    const conclusion = readFileSync(
      resolve(WORKSPACE_ROOT, 'apps/website/src/components/sidecar/SidecarConclusion.astro'),
      'utf8'
    )

    expect(policy).toContain("JOB_BOARD_FLAG = 'job-board'")
    expect(flags).toMatch(/key: JOB_BOARD_FLAG[\s\S]*rolloutPercentage: 0/)
    expect(catalog).toMatch(/jobBoard: JOB_BOARD_FLAG/)
    expect(blumeApp).toMatch(/<SidecarApp[\s\S]*jobBoardEnabled=\{flags\.jobBoard\}/)
    expect(sidecarAppProps).toMatch(/jobBoardEnabled = false/)
    expect(feedbackRoute).toMatch(/<FeedbackView[\s\S]*jobBoardEnabled=\{jobBoardEnabled\}/)
    expect(feedbackView).toMatch(/if \(!jobBoardEnabled \|\| mode !== 'full'\)/)
    expect(feedbackView).toMatch(/\{jobBoardEnabled && openings\.length \? \(/)
    expect(landing).toMatch(/featureFlags\[JOB_BOARD_FLAG\] === true/)
    expect(conclusion).toMatch(/jobBoardEnabled = false/)
    expect(conclusion).toMatch(
      /\.\.\.\(jobBoardEnabled \? \[\{ label: 'Careers', href: '\/careers' \}\] : \[\]\)/
    )
  })
})
