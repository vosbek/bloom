#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { chmodSync, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const desktopDir = resolve(scriptDir, '..')
const repoRoot = resolve(desktopDir, '..', '..')
const manifestPath = join(repoRoot, 'crates', 'harness-parser', 'Cargo.toml')

// HARNESS_PARSER_TARGET (a Rust target triple, e.g. x86_64-pc-windows-gnu) cross-builds
// the parser for a packaging platform other than the host. Without it, a macOS host
// stages a Mach-O binary that a Windows package cannot run — the win32 resolver looks
// for harness-parser.exe and conversation ingestion dies. See resolveHarnessParserBinaryPath.
const target = process.env.HARNESS_PARSER_TARGET
const forWindows = target ? target.includes('windows') : process.platform === 'win32'
const binaryName = forWindows ? 'harness-parser.exe' : 'harness-parser'
const releaseDir = target
  ? join(repoRoot, 'crates', 'harness-parser', 'target', target, 'release')
  : join(repoRoot, 'crates', 'harness-parser', 'target', 'release')
const sourcePath = join(releaseDir, binaryName)
const outputDir = join(desktopDir, 'resources', 'harness-parser')
const outputPath = join(outputDir, binaryName)

const cargoArgs = ['build', '--release', '--manifest-path', manifestPath]
const cargoEnv = { ...process.env }
if (target) {
  cargoArgs.push('--target', target)
  if (target === 'x86_64-pc-windows-gnu' && !cargoEnv.CARGO_TARGET_X86_64_PC_WINDOWS_GNU_LINKER) {
    cargoEnv.CARGO_TARGET_X86_64_PC_WINDOWS_GNU_LINKER = 'x86_64-w64-mingw32-gcc'
  }
}

execFileSync('cargo', cargoArgs, {
  cwd: repoRoot,
  stdio: 'inherit',
  env: cargoEnv
})

if (!existsSync(sourcePath)) {
  throw new Error(`Expected built harness parser at ${sourcePath}`)
}

mkdirSync(outputDir, { recursive: true })
copyFileSync(sourcePath, outputPath)
if (!forWindows) chmodSync(outputPath, 0o755)

console.log(
  `[desktop] harness parser prepared: ${outputPath}${target ? ` (target ${target})` : ''}`
)
