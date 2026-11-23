import { spawn, spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const isWindows = process.platform === 'win32'
const command = isWindows ? (process.env.ComSpec ?? 'cmd.exe') : 'pnpm'
const args = isWindows
  ? ['/d', '/s', '/c', 'pnpm exec electron-vite build']
  : ['exec', 'electron-vite', 'build']
// The renderer bundle outgrows Node's default heap (about 2 GB); keep a caller's own limit.
const nodeOptions = process.env.NODE_OPTIONS ?? ''
const heap = /--max-old-space-size/.test(nodeOptions)
  ? nodeOptions
  : `${nodeOptions} --max-old-space-size=6144`.trim()
const child = spawn(command, args, {
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: heap, VITE_BLUME_STATIC_DEV: '0' }
})

child.once('error', (error) => {
  console.error(error)
  process.exitCode = 1
})
child.once('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  if (code !== 0) {
    process.exitCode = code ?? 1
    return
  }
  // Outside out/, which release steps rewrite (source-map debug IDs); the installer checks hashes.
  const bundlePath = fileURLToPath(new URL('../plugin-bundle-out', import.meta.url))
  const bundleArgs = ['--filter', '@blume/agent-mcp-node', 'plugin:bundle', '--out', bundlePath]
  const bundle = spawnSync(
    command,
    isWindows ? ['/d', '/s', '/c', 'pnpm', ...bundleArgs] : bundleArgs,
    {
      stdio: 'inherit'
    }
  )
  if (bundle.error) console.error(bundle.error)
  process.exitCode = bundle.status ?? 1
})
