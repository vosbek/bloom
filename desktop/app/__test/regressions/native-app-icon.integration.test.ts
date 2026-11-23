import { execFile as execFileCallback } from 'node:child_process'
import { promisify } from 'node:util'
import { cp, mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'
import { setMacAppIcon } from '../../src/main/nativeAppIcon'

const execFile = promisify(execFileCallback)
const enabled = process.platform === 'darwin' && process.env.BLUME_TEST_MAC_APP_ICON === '1'

test.skipIf(!enabled)(
  'macOS persists the last flower without changing signed Contents',
  async () => {
    const root = await mkdtemp(join(tmpdir(), 'blume-flower-'))
    const bundle = join(root, 'Blume Test.app')
    const contents = join(bundle, 'Contents')
    try {
      await mkdir(join(contents, 'MacOS'), { recursive: true })
      await cp('/usr/bin/true', join(contents, 'MacOS', 'probe'))
      await writeFile(
        join(contents, 'Info.plist'),
        '<?xml version="1.0"?><plist version="1.0"><dict><key>CFBundleIdentifier</key><string>codes.blume.icon-test</string><key>CFBundleExecutable</key><string>probe</string><key>CFBundlePackageType</key><string>APPL</string></dict></plist>'
      )
      await execFile('/usr/bin/codesign', ['--force', '--sign', '-', bundle])
      await execFile('/usr/bin/codesign', ['--verify', '--deep', '--strict', bundle])
      const seal = await readFile(join(contents, '_CodeSignature', 'CodeResources'))
      const resourceFork = join(bundle, 'Icon\r', '..namedfork', 'rsrc')
      const asset = (flower: string) =>
        fileURLToPath(new URL(`../../resources/dock-icons/canary/${flower}.png`, import.meta.url))
      await setMacAppIcon(bundle, asset('tulip'), new AbortController().signal)
      const tulip = await readFile(resourceFork)
      await setMacAppIcon(bundle, asset('daylily'), new AbortController().signal)
      const daylily = await readFile(resourceFork)
      expect(daylily.length).toBeGreaterThan(1000)
      expect(daylily.equals(tulip)).toBe(false)
      // Reapplying after a fresh launch writes the same last-selected artwork.
      await setMacAppIcon(bundle, asset('daylily'), new AbortController().signal)
      expect(await readFile(resourceFork)).toEqual(daylily)
      expect(await readFile(join(contents, '_CodeSignature', 'CodeResources'))).toEqual(seal)
      await execFile('/usr/bin/codesign', ['--verify', '--deep', bundle])
      // Strict signing rejects Finder metadata added by the OS. Do not hide this
      // distinction: Developer ID launch/updater verification remains a release gate.
      await expect(
        execFile('/usr/bin/codesign', ['--verify', '--deep', '--strict', bundle])
      ).rejects.toThrow('Finder information')
      await execFile(join(contents, 'MacOS', 'probe'))
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  },
  60_000
)
