import { beforeEach, describe, expect, it, vi } from 'vitest'

const settings = new Map<string, string>()

vi.mock('../../src/main/settingsStore', () => ({
  getAllSettings: () => Object.fromEntries(settings),
  setSettingAsync: async (key: string, value: string) => {
    settings.set(key, value)
  }
}))

import { initializeDevAccountSession } from '../../src/main/devAccountSession'

function encodedImport(entries: Array<{ key: string; value: string }>): string {
  return Buffer.from(JSON.stringify(entries)).toString('base64')
}

describe('dev account session initialization', () => {
  beforeEach(() => {
    settings.clear()
    process.env.BLUME_DEV_INSTALL = '1'
    delete process.env.BLUME_DEV_SIGNED_OUT
    delete process.env.BLUME_DEV_ACCOUNT_SESSION_IMPORT
  })

  it('replaces only account settings with the re-encrypted installed session', async () => {
    settings.set('account.old', 'old')
    settings.set('theme', 'dark')
    process.env.BLUME_DEV_ACCOUNT_SESSION_IMPORT = encodedImport([
      { key: 'account.blume-account.cookie', value: 'enc:v1:encrypted-cookie' },
      { key: 'account.blume-account.local_cache', value: 'enc:v1:encrypted-cache' }
    ])

    await initializeDevAccountSession()

    expect(Object.fromEntries(settings)).toEqual({
      'account.old': '',
      'account.blume-account.cookie': 'enc:v1:encrypted-cookie',
      'account.blume-account.local_cache': 'enc:v1:encrypted-cache',
      theme: 'dark'
    })
  })

  it('clears only the dev account copy in explicit signed-out mode', async () => {
    settings.set('account.blume-account.cookie', 'enc:v1:cookie')
    settings.set('theme', 'light')
    process.env.BLUME_DEV_SIGNED_OUT = '1'

    await initializeDevAccountSession()

    expect(settings.get('account.blume-account.cookie')).toBe('')
    expect(settings.get('theme')).toBe('light')
  })

  it('does nothing outside the dev launcher', async () => {
    settings.set('account.blume-account.cookie', 'existing')
    delete process.env.BLUME_DEV_INSTALL
    process.env.BLUME_DEV_SIGNED_OUT = '1'

    await initializeDevAccountSession()

    expect(settings.get('account.blume-account.cookie')).toBe('existing')
  })
})
