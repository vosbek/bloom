#!/usr/bin/env node
// Downloads Electron and rebuilds native dependencies (better-sqlite3, node-pty) for its ABI.
//
// BLUME_SKIP_ELECTRON_POSTINSTALL=1 skips both. Only CI jobs that never run, test or package
// Electron may set it: Product PR Preview deploys Workers, the Web Lab and the VPS runner, none
// of which load the desktop app's Electron binary or its Electron-ABI native modules (the
// runner installs its own dependencies on the VPS). The same holds for release web-service
// jobs and promotion of already-built artifacts. Every job that runs/tests/packages Electron
// keeps the default, and `pnpm dev` re-runs `electron-builder install-app-deps` itself.
//
// BLUME_SKIP_ELECTRON_NATIVE_REBUILD=1 still downloads Electron but leaves the native rebuild to
// the caller. Only the release build sets it: it restores its cached Electron-ABI builds first
// and then runs `electron-builder install-app-deps` itself (see native-module-cache.mjs).
import { execSync } from 'node:child_process'

if (process.env.BLUME_SKIP_ELECTRON_POSTINSTALL === '1') {
  console.log(
    'Skipping Electron download and native rebuild (BLUME_SKIP_ELECTRON_POSTINSTALL=1; this install never runs Electron).'
  )
} else {
  execSync('install-electron', { stdio: 'inherit' })
  if (process.env.BLUME_SKIP_ELECTRON_NATIVE_REBUILD === '1') {
    console.log(
      'Skipping the native rebuild (BLUME_SKIP_ELECTRON_NATIVE_REBUILD=1; the caller runs electron-builder install-app-deps).'
    )
  } else {
    execSync('electron-builder install-app-deps', { stdio: 'inherit' })
  }
}
