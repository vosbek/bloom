import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { afterEach, describe, expect, test, vi } from 'vitest'

import {
  assertSafeNodeModules,
  replaceWorkspacePackageLink
} from '../../../../scripts/link-workspace-packages.mjs'
import { createWorkspacePackageResolve } from '../../../../scripts/workspace-package-loader.mjs'
import { findWorkspacePackages } from '../../../../scripts/workspace-packages.mjs'

const tempDirectories: string[] = []

afterEach(() => {
  for (const directory of tempDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true })
  }
})

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(value))
}

describe('workspace package test isolation', () => {
  test('resolves the current checkout without falling through to shared node_modules', async () => {
    const fixtureRoot = mkdtempSync(join(tmpdir(), 'blume-workspace-loader-'))
    tempDirectories.push(fixtureRoot)
    const checkoutRoot = join(fixtureRoot, 'checkout')
    const packageRoot = join(checkoutRoot, 'packages', 'example')
    const currentEntry = join(packageRoot, 'src', 'index.ts')
    writeJson(join(packageRoot, 'package.json'), {
      name: '@blume/example',
      exports: { '.': './src/index.ts' }
    })
    mkdirSync(dirname(currentEntry), { recursive: true })
    writeFileSync(currentEntry, 'export const source = "current"\n')

    const sharedNodeModules = join(fixtureRoot, 'shared-node-modules')
    const stalePackage = join(sharedNodeModules, '@blume', 'example')
    const staleEntry = join(stalePackage, 'stale.ts')
    writeJson(join(stalePackage, 'package.json'), {
      name: '@blume/example',
      exports: { '.': './index.ts', './stale': './stale.ts' }
    })
    writeFileSync(staleEntry, 'export const source = "stale"\n')
    mkdirSync(checkoutRoot, { recursive: true })
    const nodeModulesLink = join(checkoutRoot, 'node_modules')
    symlinkSync(sharedNodeModules, nodeModulesLink, 'dir')

    const packages = findWorkspacePackages([join(checkoutRoot, 'packages')])
    const resolve = createWorkspacePackageResolve(packages)
    const nextResolve = vi.fn(async () => ({ url: pathToFileURL(staleEntry).href }))

    const result = await resolve('@blume/example', { conditions: ['node', 'import'] }, nextResolve)
    expect(fileURLToPath(result.url)).toBe(currentEntry)
    await expect(
      resolve('@blume/example/stale', { conditions: ['node', 'import'] }, nextResolve)
    ).rejects.toMatchObject({
      code: 'ERR_PACKAGE_PATH_NOT_EXPORTED',
      packageName: '@blume/example',
      subpath: './stale'
    })
    expect(nextResolve).not.toHaveBeenCalled()
    expect(readlinkSync(nodeModulesLink)).toBe(sharedNodeModules)

    await expect(
      resolve('@blume/not-in-this-checkout', { conditions: ['node', 'import'] }, nextResolve)
    ).resolves.toEqual({ url: pathToFileURL(staleEntry).href })
    expect(nextResolve).toHaveBeenCalledOnce()
  })

  test('local link repair refuses a shared node_modules symlink', () => {
    const fixtureRoot = mkdtempSync(join(tmpdir(), 'blume-workspace-links-'))
    tempDirectories.push(fixtureRoot)
    const sharedNodeModules = join(fixtureRoot, 'shared-node-modules')
    const nodeModulesLink = join(fixtureRoot, 'checkout', 'node_modules')
    mkdirSync(sharedNodeModules, { recursive: true })
    mkdirSync(dirname(nodeModulesLink), { recursive: true })
    symlinkSync(sharedNodeModules, nodeModulesLink, 'dir')

    expect(() => assertSafeNodeModules(nodeModulesLink)).toThrow(
      /Refusing to rewrite shared node_modules/
    )
    expect(readlinkSync(nodeModulesLink)).toBe(sharedNodeModules)
  })

  test('local link repair refuses a symlinked workspace package scope', () => {
    const fixtureRoot = mkdtempSync(join(tmpdir(), 'blume-workspace-scope-'))
    tempDirectories.push(fixtureRoot)
    const nodeModules = join(fixtureRoot, 'checkout', 'node_modules')
    const sharedScope = join(fixtureRoot, 'shared-node-modules', '@blume')
    const stalePackage = join(sharedScope, 'example')
    const marker = join(stalePackage, 'keep.txt')
    const currentPackage = join(fixtureRoot, 'checkout', 'packages', 'example')
    mkdirSync(stalePackage, { recursive: true })
    mkdirSync(currentPackage, { recursive: true })
    writeFileSync(marker, 'must remain untouched\n')
    mkdirSync(nodeModules, { recursive: true })
    const scopeLink = join(nodeModules, '@blume')
    symlinkSync(sharedScope, scopeLink, 'dir')

    expect(() =>
      replaceWorkspacePackageLink(nodeModules, join(scopeLink, 'example'), currentPackage)
    ).toThrow(/Refusing to rewrite workspace package through symlinked parent/)
    expect(readlinkSync(scopeLink)).toBe(sharedScope)
    expect(readFileSync(marker, 'utf8')).toBe('must remain untouched\n')
  })
})
