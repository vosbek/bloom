import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'vitest'
import { StableVersionRetiredError } from '../../src/main/backendManifest'
import { reportBackendStartupFailure } from '../../src/main/backendStartupFailure'

test('retirement shows installer guidance before exit, without trusting server error text', () => {
  const events: string[] = []
  reportBackendStartupFailure(
    new StableVersionRetiredError('https://untrusted.example/download'),
    '1.2.3',
    (title, content) => {
      assert.equal(title, 'Update Blume to continue')
      assert.match(content, /Blume 1\.2\.3 is no longer supported/)
      assert.match(content, /https:\/\/updates\.blume-page\.com\/desktop\/stable\/download/)
      assert.match(content, /Keep your existing Blume data folder/)
      assert.doesNotMatch(content, /untrusted/)
      events.push('dialog')
    },
    (code) => events.push(`exit:${code}`)
  )
  assert.deepEqual(events, ['dialog', 'exit:1'])
})

test.each([new Error('https://untrusted.example/secret'), 'untrusted', { secret: 'untrusted' }])(
  'ordinary startup failures show trusted recovery guidance before exiting: %s',
  (error) => {
    const events: string[] = []
    reportBackendStartupFailure(
      error,
      '1.2.3',
      (title, content) => {
        assert.equal(title, 'Blume could not start')
        assert.match(content, /Try opening Blume again/)
        assert.match(content, /https:\/\/updates\.blume-page\.com\/desktop\/stable\/download/)
        assert.match(content, /Keep your existing Blume data folder/)
        assert.doesNotMatch(content, /untrusted|secret|no longer supported/)
        events.push('dialog')
      },
      (code) => events.push(`exit:${code}`)
    )
    assert.deepEqual(events, ['dialog', 'exit:1'])
  }
)

test.each([new StableVersionRetiredError(), new Error('unavailable')])(
  'dialog failure cannot allow startup to continue: %s',
  (error) => {
    let exited = false
    assert.throws(() =>
      reportBackendStartupFailure(
        error,
        '1.2.3',
        () => {
          throw new Error('native dialog unavailable')
        },
        () => {
          exited = true
        }
      )
    )
    assert.equal(exited, true)
  }
)

test('bootstrap failure discards native callbacks then invokes the native failure reporter', () => {
  const source = readFileSync(
    new URL('../../src/main/backendManifestBootstrap.ts', import.meta.url),
    'utf8'
  )
  assert.match(
    source,
    /\.catch\(\(error\) => \{\s*nativeStartupEvents\.dispose\(\)[\s\S]*?reportBackendStartupFailure\(error, version, dialog\.showErrorBox/
  )
})
