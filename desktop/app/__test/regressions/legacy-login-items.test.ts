import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, test, vi } from 'vitest'

import {
  cleanupLegacyBlumeTauriLaunchAgent,
  legacyBlumeTauriLaunchAgentPath
} from '../../src/main/legacyLoginItems'
import { shouldMigrateLegacyLoginItem } from '../../src/main/releaseChannel'

function tempHome(): string {
  return join(tmpdir(), `blume-legacy-login-items-${randomUUID()}`)
}

function writeLaunchAgent(homeDir: string, contents: string): string {
  const path = legacyBlumeTauriLaunchAgentPath(homeDir)
  mkdirSync(join(homeDir, 'Library', 'LaunchAgents'), { recursive: true })
  writeFileSync(path, contents)
  return path
}

const LEGACY_PLIST = `<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>Blume Tauri</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/test/project/apps/tauri-desktop/src-tauri/target/debug/blume-desktop</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
`

describe('legacy login item cleanup', () => {
  test('only stable may migrate the machine-global legacy login item', () => {
    expect(shouldMigrateLegacyLoginItem('stable')).toBe(true)
    expect(shouldMigrateLegacyLoginItem('canary')).toBe(false)
  })

  test('disables the old Blume Tauri LaunchAgent', async () => {
    const homeDir = tempHome()
    const bootout = vi.fn(async () => {})

    try {
      const path = writeLaunchAgent(homeDir, LEGACY_PLIST)
      const result = await cleanupLegacyBlumeTauriLaunchAgent({
        homeDir,
        platform: 'darwin',
        bootout,
        disabledSuffix: '.disabled-test'
      })

      expect(result.cleaned).toBe(true)
      expect(result.disabledPath).toBe(`${path}.disabled-test`)
      expect(bootout).toHaveBeenCalledWith(path, expect.any(AbortSignal))
      expect(existsSync(path)).toBe(false)
      expect(readFileSync(`${path}.disabled-test`, 'utf8')).toBe(LEGACY_PLIST)
    } finally {
      rmSync(homeDir, { recursive: true, force: true })
    }
  })

  test('leaves unrelated LaunchAgents alone', async () => {
    const homeDir = tempHome()
    const bootout = vi.fn(async () => {})

    try {
      const contents = LEGACY_PLIST.replace('blume-desktop', 'something-else')
      const path = writeLaunchAgent(homeDir, contents)
      const result = await cleanupLegacyBlumeTauriLaunchAgent({
        homeDir,
        platform: 'darwin',
        bootout
      })

      expect(result).toMatchObject({
        cleaned: false,
        path,
        reason: 'not-legacy-blume-tauri'
      })
      expect(bootout).not.toHaveBeenCalled()
      expect(readFileSync(path, 'utf8')).toBe(contents)
    } finally {
      rmSync(homeDir, { recursive: true, force: true })
    }
  })

  test('bounds a stalled launchctl cleanup and still archives the legacy item', async () => {
    const homeDir = tempHome()

    try {
      const path = writeLaunchAgent(homeDir, LEGACY_PLIST)
      const startedAt = Date.now()
      const result = await cleanupLegacyBlumeTauriLaunchAgent({
        homeDir,
        platform: 'darwin',
        bootout: async () => await new Promise(() => {}),
        bootoutTimeoutMs: 20,
        disabledSuffix: '.disabled-timeout-test'
      })

      expect(Date.now() - startedAt).toBeLessThan(500)
      expect(result.cleaned).toBe(true)
      expect(existsSync(`${path}.disabled-timeout-test`)).toBe(true)
    } finally {
      rmSync(homeDir, { recursive: true, force: true })
    }
  })

  test('keeps synchronous filesystem and subprocess work out of the migration adapter', () => {
    const source = readFileSync(
      join(import.meta.dirname, '../../src/main/legacyLoginItems.ts'),
      'utf8'
    )
    expect(source).not.toMatch(/\b(?:spawnSync|execFileSync|\w+Sync)\b/)
  })
})
