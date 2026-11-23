import { describe, expect, test } from 'vitest'
import {
  desktopDevRuntimeCapabilities,
  normalizeDevCdpPort
} from '../../src/main/devRuntimeProfile'

describe('desktop development runtime profiles', () => {
  test('only enables valid TCP ports for development CDP', () => {
    expect(normalizeDevCdpPort('9223')).toBe(9223)
    expect(normalizeDevCdpPort(' 9331 ')).toBe(9331)
    expect(normalizeDevCdpPort('1')).toBe(1)
    expect(normalizeDevCdpPort('65535')).toBe(65535)
    expect(normalizeDevCdpPort('0')).toBeNull()
    expect(normalizeDevCdpPort('70000')).toBeNull()
    expect(normalizeDevCdpPort('not-a-port')).toBeNull()
  })

  test('keeps packaged and default development behavior full fidelity', () => {
    const fullCapabilities = {
      profile: 'full',
      fixtureProductHost: false,
      conversationBackground: true,
      menuBarStatus: true,
      startupInstall: true
    } as const
    expect(desktopDevRuntimeCapabilities('ui', false)).toEqual(fullCapabilities)

    const inheritedProfile = process.env.BLUME_DEV_PROFILE
    try {
      delete process.env.BLUME_DEV_PROFILE
      expect(desktopDevRuntimeCapabilities(undefined, true)).toEqual(fullCapabilities)
    } finally {
      if (inheritedProfile === undefined) delete process.env.BLUME_DEV_PROFILE
      else process.env.BLUME_DEV_PROFILE = inheritedProfile
    }
  })

  test('selects only the requested expensive native capabilities', () => {
    expect(desktopDevRuntimeCapabilities('ui', true)).toMatchObject({
      fixtureProductHost: true,
      conversationBackground: false,
      menuBarStatus: false,
      startupInstall: false
    })
    expect(desktopDevRuntimeCapabilities('conversations', true)).toMatchObject({
      fixtureProductHost: true,
      conversationBackground: true,
      menuBarStatus: false,
      startupInstall: false
    })
    expect(desktopDevRuntimeCapabilities('native', true)).toMatchObject({
      fixtureProductHost: true,
      conversationBackground: false,
      menuBarStatus: true,
      startupInstall: false
    })
  })
})
