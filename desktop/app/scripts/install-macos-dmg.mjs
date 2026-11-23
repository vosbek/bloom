#!/usr/bin/env node
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { spawnSync } from 'node:child_process'
import { createWriteStream, existsSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const APP_NAMES = ['Blume Canary.app', 'Blume.app']
const APPLICATIONS_DIR = '/Applications'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function backupAppNamePattern(appName) {
  return new RegExp(
    `^${escapeRegExp(appName)}\\.(?:previous|backup|pre|broken)-[A-Za-z0-9._-]+$`
  )
}

function usage() {
  console.log(`Usage: pnpm --filter @blume/desktop internal:install-macos-dmg -- <dmg-path-or-url> [--launch]

Internal operator recovery tool. Installs Blume.app or Blume Canary.app from a macOS DMG.

For installed canaries, prefer the built-in updater for normal canary-to-canary
updates. Use this only for first canary install, local testing, or recovery when
the updater path is already broken.

This intentionally deletes the old app for the same channel instead of moving
it to a backup app bundle. Stable and canary have separate names and bundle ids,
so installing one leaves the other running installation untouched.`)
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit'
  })
  if (result.error && !options.allowFailure) {
    throw new Error(`${command} ${args.join(' ')} failed: ${result.error.message}`)
  }
  if (result.status !== 0 && !options.allowFailure) {
    const details = [result.stdout, result.stderr].filter(Boolean).join('\n').trim()
    throw new Error(`${command} ${args.join(' ')} failed${details ? `:\n${details}` : ''}`)
  }
  return result
}

function isUrl(value) {
  return /^https?:\/\//.test(value)
}

async function downloadDmg(url) {
  const response = await fetch(url)
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`)
  }
  const outputPath = join(tmpdir(), basename(new URL(url).pathname) || 'Blume.dmg')
  await pipeline(Readable.fromWeb(response.body), createWriteStream(outputPath))
  return outputPath
}

function removeStaleBackupApps(appName) {
  const backupPattern = backupAppNamePattern(appName)
  const roots = Array.from(new Set([APPLICATIONS_DIR, '/private/tmp', tmpdir()]))
  for (const root of roots) {
    if (!existsSync(root)) continue
    for (const name of readdirSync(root)) {
      if (!backupPattern.test(name)) continue
      const candidate = join(root, name)
      if (!statSync(candidate).isDirectory()) continue
      rmSync(candidate, { recursive: true, force: true })
      console.log(`Removed stale Blume backup app: ${candidate}`)
    }
  }
}

function waitForProcessExit(processName, attempts = 50, delaySeconds = '0.1') {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const result = spawnSync('pgrep', ['-x', processName], { stdio: 'ignore' })
    if (result.status !== 0) return
    spawnSync('sleep', [delaySeconds], { stdio: 'ignore' })
  }
  throw new Error(`${processName} did not exit after ${attempts} checks`)
}

function refreshLaunchServices(installPath) {
  const lsregister = '/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister'
  if (existsSync(lsregister)) run(lsregister, ['-f', installPath], { allowFailure: true })
}

function findAppInMountedDmg(mountPath) {
  for (const appName of APP_NAMES) {
    const direct = join(mountPath, appName)
    if (existsSync(direct)) return direct
  }

  for (const name of readdirSync(mountPath)) {
    for (const appName of APP_NAMES) {
      const candidate = join(mountPath, name, appName)
      if (existsSync(candidate)) return candidate
    }
  }
  throw new Error(`Could not find ${APP_NAMES.join(' or ')} in mounted DMG at ${mountPath}`)
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.length === 0) {
    usage()
    process.exit(args.length === 0 ? 1 : 0)
  }
  if (process.platform !== 'darwin') {
    throw new Error('install-macos-dmg is macOS-only.')
  }

  const launch = args.includes('--launch')
  const input = args.find((arg) => !arg.startsWith('--'))
  if (!input) {
    usage()
    process.exit(1)
  }

  const dmgPath = isUrl(input) ? await downloadDmg(input) : input
  if (!existsSync(dmgPath)) throw new Error(`DMG not found: ${dmgPath}`)

  const mountPath = mkdtempSync(join(tmpdir(), 'blume-dmg-'))
  let mounted = false
  try {
    run('hdiutil', ['attach', dmgPath, '-nobrowse', '-readonly', '-quiet', '-mountpoint', mountPath])
    mounted = true
    const sourceApp = findAppInMountedDmg(mountPath)
    const appName = basename(sourceApp)
    const productName = appName.replace(/\.app$/, '')
    const installPath = join(APPLICATIONS_DIR, appName)

    run('pkill', ['-x', productName], { allowFailure: true })
    waitForProcessExit(productName)
    removeStaleBackupApps(appName)

    rmSync(installPath, { recursive: true, force: true })
    run('ditto', [sourceApp, installPath])
    removeStaleBackupApps(appName)
    refreshLaunchServices(installPath)

    const version = run(
      'plutil',
      ['-extract', 'CFBundleShortVersionString', 'raw', '-o', '-', join(installPath, 'Contents', 'Info.plist')],
      { capture: true }
    ).stdout.trim()
    console.log(`Installed ${installPath} ${version}`)

    if (launch) run('open', [installPath])
  } finally {
    if (mounted) run('hdiutil', ['detach', mountPath, '-quiet'], { allowFailure: true })
    rmSync(mountPath, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
