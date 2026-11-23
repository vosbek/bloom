import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const desktopRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(desktopRoot, '../..')
const outDir = resolve(desktopRoot, 'out')
const pkg = JSON.parse(readFileSync(resolve(desktopRoot, 'package.json'), 'utf8'))
const command = process.argv[2]
const pnpmCommand = 'pnpm'

const releaseName = process.env.POSTHOG_RELEASE_NAME ?? 'blume-desktop'
const releaseVersion = process.env.POSTHOG_RELEASE_VERSION ?? pkg.version
const host = process.env.POSTHOG_CLI_HOST ?? 'https://eu.posthog.com'

if (command !== 'inject' && command !== 'upload') {
  console.error('Usage: node ./scripts/posthog-sourcemaps.mjs <inject|upload>')
  process.exit(1)
}

if (!existsSync(outDir)) {
  console.error(`Missing build output directory: ${outDir}`)
  process.exit(1)
}

if (command === 'upload') {
  for (const name of ['POSTHOG_CLI_API_KEY', 'POSTHOG_CLI_PROJECT_ID']) {
    if (!process.env[name]) {
      console.error(`Missing ${name}. Cannot upload PostHog source maps.`)
      process.exit(1)
    }
  }
}

const args = [
  'exec',
  'posthog-cli',
  '--host',
  host,
  'sourcemap',
  command,
  '--directory',
  outDir,
  '--release-name',
  releaseName,
  '--release-version',
  releaseVersion
]

if (command === 'inject') {
  // macOS and Linux build the same renderer chunks in parallel. Whichever
  // platform registers a chunk first owns its symbol set; the other should
  // still inject the same IDs instead of failing the release build.
  args.push('--skip-release-on-fail')
} else {
  args.push('--skip-on-conflict')
}

console.log(`Running PostHog source map ${command} for ${releaseName}@${releaseVersion}`)
const result = spawnSync(pnpmCommand, args, {
  cwd: repoRoot,
  shell: process.platform === 'win32',
  stdio: 'inherit',
  env: process.env
})

if (result.error) {
  console.error(`Failed to run ${pnpmCommand}: ${result.error.message}`)
}
process.exit(result.status ?? 1)
