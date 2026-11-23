import { test } from 'vitest'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { configureRecordedLedger } from './recordedLedgerEnvironment.mjs'

test('recordings require an isolated signed-out UI launch and do not retain remote backends', () => {
  const root = mkdtempSync(join(tmpdir(), 'blume-recording-'))
  try {
    const file = join(root, 'ledger.json')
    writeFileSync(file, JSON.stringify({ reset: true, deliveries: [], projects: [] }))
    const args = { runtimeProfile: 'ui', signedOut: true, runnerMode: 'hmr' }
    const env = {
      BLUME_DEV_LEDGER_RECORDING: file,
      BLUME_E2E_MODE: '1',
      ELECTRON_USER_DATA_DIR: join(root, 'user-data'),
      BLUME_AUTH_URL: 'https://account.example',
      MAIN_VITE_BLUME_AUTH_URL: 'https://account.example',
      BLUME_CONTROL_REMOTE_ENDPOINT: 'https://ledger.example'
    }
    assert.equal(configureRecordedLedger({}, args), false)
    for (const change of [
      { runtimeProfile: 'full' },
      { signedOut: false },
      { runnerMode: 'static' }
    ])
      assert.throws(() => configureRecordedLedger({ ...env }, { ...args, ...change }))
    assert.throws(() => configureRecordedLedger({ ...env, BLUME_E2E_MODE: '0' }, args))
    assert.throws(() => configureRecordedLedger({ ...env, ELECTRON_USER_DATA_DIR: '' }, args))
    // .env files must not authorize a recording if the child receives the default profile.
    assert.throws(() => configureRecordedLedger({ ...env }, args, ''))
    assert.throws(() => configureRecordedLedger({ ...env }, args, 'relative-profile'))
    assert.equal(configureRecordedLedger(env, args), true)
    assert.equal(env.BLUME_AUTH_URL, 'http://127.0.0.1:9')
    assert.equal(env.MAIN_VITE_BLUME_AUTH_URL, 'http://127.0.0.1:9')
    assert.equal(env.BLUME_CONTROL_REMOTE_ENDPOINT, 'http://127.0.0.1:9')
    assert.equal(env.VITE_BLUME_DELIVERIES_MOCK, '1')
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
