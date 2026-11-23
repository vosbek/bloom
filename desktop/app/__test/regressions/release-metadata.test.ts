import { describe, expect, it } from 'vitest'
import { resolveDesktopReleaseMetadata } from '../../src/main/releaseMetadata'

describe('desktop release metadata', () => {
  it('reports the complete release tuple embedded by the release workflow', () => {
    expect(
      resolveDesktopReleaseMetadata('1.0.65-c.1', {
        MAIN_VITE_BLUME_RELEASE_VERSION: '1.0.65-c.1',
        MAIN_VITE_BLUME_RELEASE_CHANNEL: 'canary',
        MAIN_VITE_BLUME_RELEASE_SHA: '0123456789abcdef0123456789abcdef01234567',
        MAIN_VITE_BLUME_RELEASE_BUNDLE: 'blume-1-0-65-c-1-01234567'
      })
    ).toEqual({
      version: '1.0.65-c.1',
      channel: 'canary',
      sourceSha: '0123456789abcdef0123456789abcdef01234567',
      bundleId: 'blume-1-0-65-c-1-01234567'
    })
  })

  it('uses explicit development metadata when no release tuple was embedded', () => {
    expect(resolveDesktopReleaseMetadata('1.0.54', {})).toEqual({
      version: '1.0.54',
      channel: 'development',
      sourceSha: null,
      bundleId: null
    })
  })
})
