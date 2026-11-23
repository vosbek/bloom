import { describe, expect, test, vi } from 'vitest'
import type { DesktopCareersFacade } from '../../src/main/careers'

const mocks = vi.hoisted(() => ({
  commandExists: vi.fn(async (bin: string) => bin === 'claude'),
  searchViaUtilityProcess: vi.fn(),
  registerAccountIpcHandlers: vi.fn(),
  registerFeedbackBoardIpcHandlers: vi.fn()
}))

vi.mock('../../src/main/insights/nodeHarnessProcess', () => ({
  commandExists: mocks.commandExists
}))
vi.mock('../../src/main/search/searchHost', () => ({
  searchViaUtilityProcess: mocks.searchViaUtilityProcess
}))
vi.mock('../../src/main/accounts', () => ({
  registerAccountIpcHandlers: mocks.registerAccountIpcHandlers
}))
vi.mock('../../src/main/feedbackBoard', () => ({
  registerFeedbackBoardIpcHandlers: mocks.registerFeedbackBoardIpcHandlers
}))

import { registerNativeIpcHandlers } from '../../src/main/nativeIpcRegistration'

describe('desktop native IPC after the local Improve pipeline was retired', () => {
  test('registers no Improve or user-agent MCP channels and lists harness CLIs', async () => {
    const handlers = new Map<string, (...args: unknown[]) => unknown>()
    const broadcast = vi.fn()

    registerNativeIpcHandlers({
      handleIpc: (channel, handler) => handlers.set(channel, handler),
      conversationRuntime: {} as never,
      notifyRenderersChanged: vi.fn(),
      desktopSetup: { registerIpcHandlers: vi.fn() } as never,
      desktopSettings: { registerIpcHandlers: vi.fn() } as never,
      announcements: { registerIpcHandlers: vi.fn() } as never,
      careers: { registerIpcHandlers: vi.fn() } satisfies DesktopCareersFacade,
      nativeWindow: { broadcast, registerIpcHandlers: vi.fn() },
      nativeImageExport: { registerIpcHandlers: vi.fn() },
      isPosthogFeatureEnabled: vi.fn(async () => false),
      getPosthogFeatureFlagValue: vi.fn(async () => false),
      getPosthogFeatureFlagEvaluations: vi.fn(async () => ({
        'desktop-harness-title-writeback': {
          posthogStatus: 'not-active',
          installationEnabled: false
        },
        'desktop-menu-bar-status-item': {
          posthogStatus: 'enabled',
          installationEnabled: true
        },
        'cursor-usage': { posthogStatus: 'not-active', installationEnabled: false },
        'desktop-conversation-continuation-menu': {
          posthogStatus: 'enabled',
          installationEnabled: false
        },
        'artifact-sync': { posthogStatus: 'not-active', installationEnabled: false }
      }))
    })
    expect(handlers.has('devSuggestions:create')).toBe(false)
    // The feature-flag evaluations handler is gated by staff account, not by the
    // dev build channel, so it registers even when isDev is false.
    expect(handlers.has('posthog:featureFlagEvaluations')).toBe(true)
    await expect(handlers.get('posthog:featureFlagEvaluations')?.()).resolves.toMatchObject({
      'artifact-sync': { posthogStatus: 'not-active', installationEnabled: false }
    })
    await expect(
      handlers.get('posthog:featureFlagEnabled')?.({}, 'accounts-and-feature-requests')
    ).resolves.toBe(false)
    expect(() => handlers.get('posthog:featureFlagEnabled')?.({}, 'unknown-flag')).toThrow(
      'Invalid PostHog feature flag key'
    )

    for (const retired of [
      'insights:listAgentVersions',
      'insights:runControlledAgent',
      'insights:listSuggestions',
      'insights:runForConversation',
      'insights:runOnboardingBootstrap',
      'insights:runPlannerForCluster',
      'insights:setImproveSettings',
      'settings:userAgentMcp:applyClientSetup'
    ])
      expect(handlers.has(retired)).toBe(false)
    await expect(handlers.get('harnesses:list')?.()).resolves.toEqual([
      { harnessId: 'claude', label: 'Claude Code', available: true },
      { harnessId: 'codex', label: 'Codex', available: false }
    ])

    mocks.searchViaUtilityProcess.mockResolvedValue({ results: [], truncated: false })
    await handlers.get('search:query')?.(
      {},
      {
        query: '  exact result  ',
        categories: ['messages', 'messages'],
        limit: 500
      }
    )
    expect(mocks.searchViaUtilityProcess).toHaveBeenCalledWith({
      query: 'exact result',
      categories: ['messages'],
      limit: 100
    })
    expect(() =>
      handlers.get('search:query')?.({}, { query: 'x', categories: ['messages', 'invalid'] })
    ).toThrow('Invalid global search request')
    expect(() =>
      handlers.get('search:query')?.({}, { query: 'x', categories: 'messages' })
    ).toThrow('Invalid global search request')
    expect(mocks.searchViaUtilityProcess).toHaveBeenCalledTimes(1)

    expect(broadcast).not.toHaveBeenCalled()
  })
})
