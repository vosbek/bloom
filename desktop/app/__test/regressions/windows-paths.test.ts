import { describe, expect, test } from 'vitest'

import {
  basenameIfPath,
  condenseHomePaths,
  describeProjectPath,
  normalizePathSeparators as normalizeSeparators,
  pathLeaf as pathBasename
} from '@blume/app-core'

describe('Windows path handling', () => {
  test('normalizeSeparators flips backslashes and keeps drive letters', () => {
    expect(normalizeSeparators('C:\\Users\\me\\proj')).toBe('C:/Users/me/proj')
    expect(normalizeSeparators('/Users/me/proj')).toBe('/Users/me/proj')
  })

  test('pathBasename handles both separators', () => {
    expect(pathBasename('C:\\Users\\me\\sessions\\abc.jsonl')).toBe('abc.jsonl')
    expect(pathBasename('/Users/me/sessions/abc.jsonl')).toBe('abc.jsonl')
  })

  test('describeProjectPath parses a plain Windows cwd', () => {
    const info = describeProjectPath('C:\\Users\\me\\dev\\my-app')
    expect(info.project).toBe('my-app')
    expect(info.projectRoot).toBe('C:/Users/me/dev/my-app')
    expect(info.display).toBe('my-app')
  })

  test('describeProjectPath parses a Windows tooling worktree', () => {
    const info = describeProjectPath('C:\\Users\\me\\dev\\my-app\\.claude\\worktrees\\bold-fox')
    expect(info.project).toBe('my-app')
    expect(info.projectRoot).toBe('C:/Users/me/dev/my-app')
    expect(info.worktree).toBe('bold-fox')
    expect(info.display).toBe('my-app · bold-fox')
  })

  test('describeProjectPath keeps Codex global worktree identity on Windows', () => {
    const first = describeProjectPath('C:\\Users\\me\\.codex\\worktrees\\011f\\my-app')
    const second = describeProjectPath('C:\\Users\\me\\.codex\\worktrees\\055e\\my-app')
    expect(first.projectRoot).toBe('C:/Users/me/.codex/projects/my-app')
    expect(second.projectRoot).toBe(first.projectRoot)
    expect(first.worktree).toBe('011f')
  })

  test('describeProjectPath preserves UNC roots', () => {
    const info = describeProjectPath('\\\\server\\share\\my-app\\.claude\\worktrees\\bold-fox')
    expect(info.project).toBe('my-app')
    expect(info.projectRoot).toBe('//server/share/my-app')
    expect(info.worktree).toBe('bold-fox')
  })

  test('POSIX paths keep their existing identity values', () => {
    const info = describeProjectPath('/Users/me/dev/my-app/.claude/worktrees/bold-fox')
    expect(info.projectRoot).toBe('/Users/me/dev/my-app')
    expect(info.display).toBe('my-app · bold-fox')
  })

  test('basenameIfPath strips Windows paths', () => {
    expect(basenameIfPath('C:\\Users\\me\\dev\\file.ts')).toBe('file.ts')
  })

  test('condenseHomePaths condenses Windows home paths', () => {
    expect(condenseHomePaths('cat C:\\Users\\me\\dev\\file.ts && pnpm build')).toBe(
      'cat file.ts && pnpm build'
    )
    expect(condenseHomePaths('cat /Users/olav/prosjekt/foo/bar.ts && pnpm build')).toBe(
      'cat bar.ts && pnpm build'
    )
  })
})
