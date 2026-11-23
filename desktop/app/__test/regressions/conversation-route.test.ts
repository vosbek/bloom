import { describe, expect, test } from 'vitest'

import {
  analyticsForPath,
  routePathFromDeepLink,
  settingsPathForSection,
  settingsSectionForPath
} from '../../src/renderer/src/lib/routes'
import {
  conversationPath,
  conversationRefFromPath,
  hybridRedirect
} from '@blume/sidecar-ui/features/control-plane/hybridNavigation.ts'
import { pathWithSearchParam } from '@blume/sidecar-ui'

describe('conversation route helpers', () => {
  test('round-trips conversation refs through route and deep-link paths', () => {
    const ref = 'codex/project/feature branch'
    const path = conversationPath(ref)

    expect(path).toBe('/agents/codex%2Fproject%2Ffeature%20branch')
    expect(conversationRefFromPath(path)).toBe(ref)
    expect(routePathFromDeepLink('blume://agents/codex%2Fproject%2Ffeature%20branch')).toBe(path)
  })

  test('attributes a conversation detail URL with its decoded ref', () => {
    expect(analyticsForPath('/agents/codex%2Fproject')).toEqual({
      app_route: '/agents/:conversationRef',
      app_screen: 'agent_conversation',
      properties: { conversationRef: 'codex/project' }
    })
  })

  test('sends the retired improvement settings to Settings', () => {
    // Improvements are hosted; the local pipeline's settings page is gone.
    expect(hybridRedirect('/settings/improvements')).toBe('/settings')
  })

  test('round-trips the Lists settings section through the desktop route', () => {
    expect(settingsPathForSection('lists')).toBe('/settings/lists')
    expect(settingsSectionForPath('/settings/lists')).toBe('lists')
    expect(settingsSectionForPath('/settings')).toBe('list')
    expect(settingsPathForSection('system')).toBe('/settings/system')
    expect(settingsSectionForPath('/settings/system')).toBe('system')
    expect(analyticsForPath('/settings/lists')).toEqual({
      app_route: '/settings/lists',
      app_screen: 'settings_lists',
      properties: {}
    })
    expect(analyticsForPath('/settings/system')).toEqual({
      app_route: '/settings/system',
      app_screen: 'settings_system',
      properties: {}
    })
  })

  test('round-trips entity query state through URL query state', () => {
    expect(pathWithSearchParam('/agents/ref', '?from=search', 'tab', 'todos')).toBe(
      '/agents/ref?from=search&tab=todos'
    )
    // A local project's setup lives on its project page; old setup links still land there.
    expect(hybridRedirect('/setup/project/project%2Fwith%20space', '?tab=conversations')).toBe(
      '/projects?local=project%2Fwith+space&tab=conversations'
    )
    expect(settingsSectionForPath('/settings/plan')).toBe('plan')
    expect(settingsPathForSection('plan')).toBe('/settings/plan')
    // The plans' usage is the Usage tab's now, not a settings page.
    expect(hybridRedirect('/settings/usage', '')).toBe('/usage')
    for (const [path, screen] of [
      ['/deliveries', 'deliveries'],
      ['/projects', 'projects'],
      ['/improve', 'improve'],
      ['/projects/scenario/s1', 'tests'],
      ['/plugin', 'plugin'],
      ['/settings/workspace', 'settings_workspace'],
      ['/settings/plan', 'settings_plan'],
      ['/usage', 'usage']
    ])
      expect(analyticsForPath(path).app_screen).toBe(screen)
    expect(routePathFromDeepLink('blume://agents/codex%2Fproject?tab=sub-agents')).toBe(
      '/agents/codex%2Fproject?tab=sub-agents'
    )
  })

  test('attributes the background-process dev page before the dev overview', () => {
    expect(analyticsForPath('/dev/processes')).toEqual({
      app_route: '/dev/processes',
      app_screen: 'dev_processes',
      properties: {}
    })
  })
})
