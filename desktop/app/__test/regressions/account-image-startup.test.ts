import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'

test('native startup registers the Better Auth image scheme before backend IO', () => {
  const native = readFileSync(new URL('../../src/main/nativeStartup.ts', import.meta.url), 'utf8')
  const bootstrap = readFileSync(
    new URL('../../src/main/backendManifestBootstrap.ts', import.meta.url),
    'utf8'
  )
  assert.match(native, /import \{ registerUserImageScheme \} from '@better-auth\/electron\/client'/)
  assert.match(native, /^registerUserImageScheme\(\)/m)
  assert.ok(
    bootstrap.indexOf("from './nativeStartup'") < bootstrap.indexOf('configureStableBackends()')
  )
  assert.doesNotMatch(native, /from ['"]\.\/accounts['"]|createAuthClient/)
})
