import { spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

const hook = fileURLToPath(new URL('../../build/afterSign.cjs', import.meta.url))

function snapshot(app: string) {
  return readdirSync(app, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const file = join(entry.parentPath, entry.name)
      return [file.slice(app.length), readFileSync(file).toString('hex')]
    })
    .sort(([left], [right]) => left.localeCompare(right))
}

test.each([
  { name: 'signed and stapled app', platform: 'darwin', ticket: true, status: '0' },
  { name: 'failed signature verification', platform: 'darwin', ticket: true, status: '1' },
  { name: 'app without a staple', platform: 'darwin', ticket: false, status: '0' },
  { name: 'non-macOS invocation', platform: 'win32', ticket: true, status: '0' },
  {
    name: 'missing domain grant',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'domain'
  },
  {
    name: 'wrong app identifier',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'identity'
  },
  {
    name: 'missing embedded profile',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'profile'
  },
  {
    name: 'profile names another certificate',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'certificate'
  },
  {
    name: 'profile has no certificates',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'empty-certificates'
  },
  {
    name: 'certificate extraction fails',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'extraction'
  },
  {
    name: 'profile decoding fails',
    platform: 'darwin',
    ticket: true,
    status: '0',
    invalid: 'decode'
  }
])(
  'afterSign preserves all bundle bytes for $name',
  ({ platform, ticket, status, invalid }) => {
    const root = mkdtempSync(join(tmpdir(), 'blume-after-sign-'))
    try {
      const app = join(root, 'Fixture.app')
      const files = {
        'Contents/Info.plist': Buffer.from('inert plist fixture'),
        'Contents/MacOS/Fixture': Buffer.from('inert executable fixture'),
        'Contents/_CodeSignature/CodeResources': Buffer.from('inert resource seal fixture'),
        ...(invalid !== 'profile'
          ? { 'Contents/embedded.provisionprofile': Buffer.from('inert profile fixture') }
          : {}),
        ...(ticket
          ? { 'Contents/CodeResources': Buffer.from([0x73, 0x38, 0x63, 0x68, 0, 255, 1, 2]) }
          : {})
      }
      for (const [relative, bytes] of Object.entries(files)) {
        const file = join(app, relative)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, bytes)
      }
      const before = snapshot(app)
      const bin = join(root, 'bin')
      mkdirSync(bin)
      writeFileSync(
        join(bin, 'codesign'),
        '#!/bin/bash\nprintf "%s\\n" "$@" >> "$TRACE"\nif [[ "$2" == --extract-certificates=* ]]; then [ "$INVALID" = "extraction" ] && exit 1; prefix="${2#--extract-certificates=}"; printf "%s" "fixture signed leaf" > "${prefix}0"; elif [ "$2" = "--extract-certificates" ]; then exit 1; elif [ "$1" = "-d" ]; then printf "%s" "fixture plist"; fi\nexit "$SIGN_STATUS"\n',
        { mode: 0o755 }
      )
      // Conversion is an OS boundary; the fixture supplies the signed entitlement projection.
      writeFileSync(
        join(bin, 'plutil'),
        '#!/bin/bash\ncat >/dev/null\nprintf "%s" "$SIGNED_ENTITLEMENTS"\n',
        { mode: 0o755 }
      )
      writeFileSync(join(bin, 'security'), '#!/bin/bash\nprintf "%s" "$PROFILE_PLIST"\n', {
        mode: 0o755
      })
      const trace = join(root, 'trace')
      const result = spawnSync(
        process.execPath,
        [
          '-e',
          `
      require(process.argv[1])({
        electronPlatformName: process.argv[3], appOutDir: process.argv[2],
        packager: { appInfo: { productFilename: 'Fixture', id: 'page.blume.sidecar' } }
      }).catch(error => { console.error(error.message); process.exitCode = 1 })
    `,
          hook,
          root,
          platform
        ],
        {
          encoding: 'utf8',
          env: {
            ...process.env,
            PATH: `${bin}:${process.env.PATH}`,
            TRACE: trace,
            SIGN_STATUS: status,
            INVALID: invalid ?? '',
            PROFILE_PLIST:
              invalid === 'decode'
                ? 'not a plist'
                : '<?xml version="1.0"?><plist version="1.0"><dict><key>DeveloperCertificates</key><array>' +
                  (invalid === 'empty-certificates'
                    ? []
                    : invalid === 'certificate'
                      ? ['other leaf']
                      : ['other leaf', 'fixture signed leaf']
                  )
                    .map((cert) => `<data>${Buffer.from(cert).toString('base64')}</data>`)
                    .join('') +
                  '</array></dict></plist>',
            SIGNED_ENTITLEMENTS: JSON.stringify({
              'com.apple.application-identifier':
                invalid === 'identity'
                  ? '5YWNUNABHW.page.blume.sidecar.canary'
                  : '5YWNUNABHW.page.blume.sidecar',
              'com.apple.developer.team-identifier': '5YWNUNABHW',
              'com.apple.developer.associated-domains':
                invalid === 'domain' ? [] : ['applinks:blume.codes']
            })
          }
        }
      )
      expect(result.status).toBe(invalid ? 1 : Number(status))
      expect(snapshot(app)).toEqual(before)
      if (platform === 'darwin') {
        const calls = readFileSync(trace, 'utf8').trim().split('\n')
        const initialCalls = [
          '--verify',
          '--deep',
          '--strict',
          '--verbose=2',
          app,
          ...(status === '0' ? ['-d', '--entitlements', ':-', app] : [])
        ]
        expect(calls.slice(0, initialCalls.length)).toEqual(initialCalls)
        if (status === '0' && !['domain', 'identity', 'profile'].includes(invalid ?? '')) {
          const certificateCalls = calls.slice(initialCalls.length)
          expect(certificateCalls).toEqual([
            '-d',
            expect.stringMatching(/^--extract-certificates=.+/),
            app
          ])
          expect(
            existsSync(dirname(certificateCalls[1].slice('--extract-certificates='.length)))
          ).toBe(false)
        } else expect(calls).toEqual(initialCalls)
        if (status !== '0')
          expect(result.stderr).toContain('macOS app signature verification failed')
        if (['domain', 'identity', 'profile'].includes(invalid ?? ''))
          expect(result.stderr).toContain('Signed app is missing its Universal Links')
        if (['certificate', 'empty-certificates', 'decode'].includes(invalid ?? ''))
          expect(result.stderr).toContain('Signed certificate is not authorized')
        if (invalid === 'extraction')
          expect(result.stderr).toContain('Could not inspect the signed certificate')
      } else {
        expect(existsSync(trace)).toBe(false)
      }
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  },
  15_000
)
