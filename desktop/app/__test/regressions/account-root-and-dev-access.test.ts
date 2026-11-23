import { describe, expect, test } from 'vitest'
import type { AccountSessionView } from '@blume/sidecar-host'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { canAccessDevPage, devPageAccess } from '../../src/renderer/src/lib/devAccess'
import { analyticsForPath, ROUTES } from '../../src/renderer/src/lib/routes'
import { mainTabForPath, pathForMainTab } from '@blume/sidecar-ui'

function session(roles: string[]): AccountSessionView {
  return {
    user: {
      id: 'account-1',
      name: 'Blume User',
      email: 'user@blume.test',
      image: null,
      hasPassword: true,
      roles
    },
    expiresAt: Date.now() + 60_000
  }
}

describe('account root navigation', () => {
  test('maps the Account tab to a first-class route', () => {
    expect(pathForMainTab('account')).toBe(ROUTES.account)
    expect(mainTabForPath(ROUTES.account)).toBe('account')
    expect(analyticsForPath(ROUTES.account).app_screen).toBe('account')
  })
})

describe('developer page access', () => {
  test('fails closed without an authenticated admin role', () => {
    expect(canAccessDevPage(null)).toBe(false)
    expect(canAccessDevPage(session([]))).toBe(false)
    expect(canAccessDevPage(session(['user']))).toBe(false)
  })

  test('allows an authenticated account carrying the admin role', () => {
    expect(canAccessDevPage(session(['user', 'admin']))).toBe(true)
  })

  test('power-user role does not unlock the full dev page', () => {
    expect(canAccessDevPage(session(['user', 'power-user']))).toBe(false)
  })
})

describe('developer page access levels', () => {
  test('fails closed without an authenticated session or known role', () => {
    expect(devPageAccess(null)).toBe('none')
    expect(devPageAccess(session([]))).toBe('none')
    expect(devPageAccess(session(['user']))).toBe('none')
  })

  test('admin gets full access, with or without power-user', () => {
    expect(devPageAccess(session(['user', 'admin']))).toBe('full')
    expect(devPageAccess(session(['admin', 'power-user']))).toBe('full')
  })

  test('power-user gets the performance view only', () => {
    expect(devPageAccess(session(['user', 'power-user']))).toBe('performance-only')
  })

  test('gates both desktop and Web Lab developer surfaces and preserves header actions', () => {
    const workspaceRoot = resolve(import.meta.dirname, '../../../..')
    // One gate for both shells: BlumeApp's developer route. Web Lab, screenshot captures included,
    // renders BlumeApp, so it has no developer gate of its own.
    const gate = readFileSync(
      resolve(workspaceRoot, 'packages/sidecar/ui/src/shell/DevAccessGate.tsx'),
      'utf8'
    )
    const blumeApp = readFileSync(
      resolve(workspaceRoot, 'packages/sidecar/ui/src/shell/BlumeApp.tsx'),
      'utf8'
    )
    const webLab = readFileSync(resolve(workspaceRoot, 'apps/web-lab/src/main.tsx'), 'utf8')
    const pageChrome = readFileSync(
      resolve(workspaceRoot, 'packages/sidecar/ui/src/shell/PageChrome.tsx'),
      'utf8'
    )

    expect(gate).toMatch(/const access = devPageAccess\(session\.session \?\? null\)/)
    expect(gate).toMatch(/access === 'none' \? <Navigate to="\/account" replace \/>/)
    expect(blumeApp).toMatch(/dev=\{\s*<DevAccessGate>/)
    expect(webLab).toMatch(/<BlumeApp\b/)
    expect(webLab).not.toMatch(/canAccessDevPage|DevAccessGate|SidecarApp/)
    expect(pageChrome).toContain('trailing={trailing}')
  })
})
