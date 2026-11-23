import { describe, expect, it } from 'vitest'

import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  getOrCreateBlumeDeviceIdAtRoot,
  isHarnessRunsPath,
  resolveBlumeRoot
} from '../../src/main/blume-home'

describe('resolveBlumeRoot', () => {
  it('keeps stable at the historical root and isolates canary', () => {
    const shared = {
      homeDir: '/Users/x',
      isDev: false,
      appPath: '/Applications/Blume.app/Contents/Resources/app.asar'
    }

    expect(resolveBlumeRoot({ ...shared, releaseChannel: 'stable' })).toBe('/Users/x/.blume')
    expect(resolveBlumeRoot({ ...shared, releaseChannel: 'canary' })).toBe(
      '/Users/x/.blume/.canary'
    )
  })

  it('gives dev checkout isolation precedence over the packaged channel', () => {
    expect(
      resolveBlumeRoot({
        homeDir: '/Users/x',
        isDev: true,
        releaseChannel: 'canary',
        appPath: '/Users/x/project/apps/desktop'
      })
    ).toBe('/Users/x/.blume/.dev/Users_x_project_apps_desktop')
  })
})

describe('shared physical device identity', () => {
  it('converges simultaneous installations on one exclusively-created id', async () => {
    const root = await mkdtemp(join(tmpdir(), 'blume-device-id-'))
    try {
      let next = 0
      const ids = await Promise.all(
        Array.from({ length: 8 }, () =>
          getOrCreateBlumeDeviceIdAtRoot(root, () => `device-${++next}-identity`)
        )
      )
      expect(new Set(ids).size).toBe(1)
      expect(await getOrCreateBlumeDeviceIdAtRoot(root, () => 'device-never-used')).toBe(ids[0])
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })
})

// Regression coverage for the insights recursion bug: harness runs spawned by
// one Blume instance are written to the GLOBAL `~/.claude` / `~/.codex` session
// stores and ingested by every instance. The matcher must recognize a
// harness-runs dir regardless of which instance's `getBlumeRoot` produced it
// (packaged root or any dev-sandbox slug), or self-runs leak into the
// conversations DB and get analyzed.
describe('isHarnessRunsPath', () => {
  it('matches the packaged root harnessruns dir', () => {
    expect(isHarnessRunsPath('/Users/x/.blume/harnessrunsqdfpv5')).toBe(true)
    expect(isHarnessRunsPath('/Users/x/.blume/harnessrunsqdfpv5/')).toBe(true)
    expect(isHarnessRunsPath('/Users/x/.blume/harnessrunsqdfpv5/sub/file.txt')).toBe(true)
  })

  it('still matches the legacy harness-runs dir (backward compatible)', () => {
    expect(isHarnessRunsPath('/Users/x/.blume/harness-runs')).toBe(true)
    expect(isHarnessRunsPath('/Users/x/.blume/harness-runs/')).toBe(true)
    expect(isHarnessRunsPath('/Users/x/.blume/harness-runs/sub/file.txt')).toBe(true)
  })

  it('matches a dev-sandbox harnessruns dir under ANY slug (cross-instance leak)', () => {
    expect(
      isHarnessRunsPath(
        '/Users/x/.blume/.dev/Users_x_sidecar-prototype_apps_desktop/harnessrunsqdfpv5'
      )
    ).toBe(true)
    expect(
      isHarnessRunsPath('/Users/x/.blume/.dev/some-other-worktree-slug/harnessrunsqdfpv5')
    ).toBe(true)
    // The legacy name is still recognized cross-instance too.
    expect(isHarnessRunsPath('/Users/x/.blume/.dev/some-slug/harness-runs')).toBe(true)
  })

  it('matches the canary sandbox harnessruns dir', () => {
    expect(isHarnessRunsPath('/Users/x/.blume/.canary/harnessrunsqdfpv5')).toBe(true)
  })

  it('normalizes Windows separators', () => {
    expect(isHarnessRunsPath('C:\\Users\\x\\.blume\\harnessrunsqdfpv5')).toBe(true)
    expect(isHarnessRunsPath('C:\\Users\\x\\.blume\\harness-runs')).toBe(true)
  })

  it('matches legacy blume probe cwd paths', () => {
    expect(isHarnessRunsPath('/tmp/blume-probe')).toBe(true)
    expect(isHarnessRunsPath('/tmp/blume-probe/sub/file.jsonl')).toBe(true)
    expect(isHarnessRunsPath('/private/tmp/blume-probe')).toBe(true)
  })

  it('does not match real user conversations', () => {
    expect(isHarnessRunsPath('/Users/x/sidecar-prototype')).toBe(false)
    expect(isHarnessRunsPath('/Users/x')).toBe(false)
    // Legacy `harness-runs` carries no unique id, so a sibling must not match.
    expect(isHarnessRunsPath('/Users/x/.blume/harness-runs-backup')).toBe(false)
    // NOTE: strings that merely CONTAIN the unique id (e.g.
    // `harnessrunsqdfpv5-backup`, or a slugified `.claude/projects/<slug>` name)
    // now match by design — the id is treated as a self-run identifier wherever
    // it appears. That's harmless: a real conversation cwd is never such a string.
  })

  it('handles empty / nullish input', () => {
    expect(isHarnessRunsPath(null)).toBe(false)
    expect(isHarnessRunsPath(undefined)).toBe(false)
    expect(isHarnessRunsPath('')).toBe(false)
  })
})
