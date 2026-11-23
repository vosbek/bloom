import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const require = createRequire(import.meta.url)
const root = await mkdtemp(join(tmpdir(), 'blume-evidence-electron-'))
try {
  for (const name of ['evidence-image-cache', 'evidence-image-cache-worker']) {
    await build({
      entryPoints: [fileURLToPath(new URL(`../__test/fixtures/${name}.ts`, import.meta.url))],
      outfile: join(root, `${name}.cjs`),
      bundle: true,
      platform: 'node',
      format: 'cjs',
      external: ['electron']
    })
  }
  const env = {
    ...process.env,
    BLUME_CACHE_TEST_ROOT: root,
    BLUME_CACHE_TEST_WORKER: join(root, 'evidence-image-cache-worker.cjs'),
    BLUME_CACHE_TEST_HTML: fileURLToPath(new URL('../src/renderer/index.html', import.meta.url))
  }
  delete env.ELECTRON_RUN_AS_NODE
  const child = spawn(require('electron'), [join(root, 'evidence-image-cache.cjs')], {
    env,
    stdio: 'inherit'
  })
  const deadline = setTimeout(() => child.kill('SIGKILL'), 30_000)
  const code = await new Promise((resolve, reject) => {
    child.on('exit', resolve)
    child.on('error', reject)
  }).finally(() => clearTimeout(deadline))
  assert.equal(code, 0, 'Electron evidence cache regression failed')
} finally {
  await rm(root, { recursive: true, force: true })
}
