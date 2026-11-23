/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const desktopRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(desktopRoot, '../..')
const outDir = resolve(desktopRoot, 'out')
const pkg = JSON.parse(readFileSync(resolve(desktopRoot, 'package.json'), 'utf8'))

const org = process.env.SENTRY_ORG ?? 'blume-0d'
const project = process.env.SENTRY_PROJECT ?? 'electron'
const release = `blume-desktop@${pkg.version}`
const pnpmCommand = 'pnpm'

if (!process.env.SENTRY_AUTH_TOKEN) {
  console.error('Missing SENTRY_AUTH_TOKEN. Cannot upload Sentry source maps.')
  process.exit(1)
}

if (!existsSync(outDir)) {
  console.error(`Missing build output directory: ${outDir}`)
  process.exit(1)
}

function run(args, options = {}) {
  const result = spawnSync(pnpmCommand, ['exec', 'sentry-cli', ...args], {
    cwd: repoRoot,
    shell: process.platform === 'win32',
    stdio: 'inherit',
    env: {
      ...process.env,
      SENTRY_ORG: org,
      SENTRY_PROJECT: project
    }
  })

  if (result.status === 0) return
  if (result.error) {
    console.error(`Failed to run ${pnpmCommand}: ${result.error.message}`)
  }
  if (options.optional) {
    console.warn(`sentry-cli ${args.join(' ')} failed; continuing.`)
    return
  }
  process.exit(result.status ?? 1)
}

console.log(`Uploading Sentry source maps for ${release}`)
run(['releases', 'new', release], { optional: true })
run(['releases', 'set-commits', release, '--auto', '--ignore-missing'], { optional: true })
run(['sourcemaps', 'upload', '--release', release, outDir])
