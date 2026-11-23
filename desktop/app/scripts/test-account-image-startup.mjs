import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const executable = process.env.BLUME_TEST_ELECTRON_BINARY || require('electron')
const fixture = fileURLToPath(
  new URL('../__test/fixtures/account-image-startup.cjs', import.meta.url)
)
for (const late of [true, false]) {
  const home = mkdtempSync(join(tmpdir(), 'blume-account-startup-'))
  try {
    const env = {
      ...process.env,
      HOME: home,
      ELECTRON_USER_DATA_DIR: home,
      BLUME_TEST_LATE_SCHEME: late ? '1' : '0'
    }
    delete env.ELECTRON_RUN_AS_NODE
    const result = spawnSync(executable, [fixture], {
      env,
      encoding: 'utf8',
      timeout: 30_000,
      killSignal: 'SIGKILL'
    })
    const output = `${result.stdout}\n${result.stderr}`
    assert.ifError(result.error)
    if (late) {
      assert.equal(result.status, 1, output)
      assert.match(output, /registerSchemesAsPrivileged should be called before app is ready/)
      console.log('PASS: reproduces 2.0 stable late-registration failure')
    } else {
      assert.equal(result.status, 0, output)
      assert.match(output, /PASS: delayed stable startup and authenticated avatar proxy/)
      console.log('PASS: early registration survives delayed stable setup and serves avatar bytes')
    }
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
}
