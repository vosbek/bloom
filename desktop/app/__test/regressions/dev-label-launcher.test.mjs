/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { afterEach, describe, expect, it } from 'vitest'

import {
  devLabelDatabaseCandidates,
  devRunnerArguments,
  inferWorktreeName,
  parseDevLauncherArguments,
  readConversationTitleParameter,
  readRemoteDebuggingPortParameter,
  resolveDevLabel
} from '../../scripts/dev-label.mjs'

const tempDirs = []

afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true })
})

function createMainDb() {
  const dir = mkdtempSync(join(tmpdir(), 'blume-dev-label-'))
  tempDirs.push(dir)
  const dbPath = join(dir, 'blume.sqlite')
  const db = new DatabaseSync(dbPath)
  db.exec(`
    CREATE TABLE conversations (
      id INTEGER PRIMARY KEY,
      ref TEXT NOT NULL,
      source TEXT NOT NULL,
      external_id TEXT,
      project_id INTEGER,
      workspace TEXT,
      workspace_kind TEXT,
      cwd TEXT,
      title TEXT,
      provider_title TEXT,
      parent_thread_id TEXT,
      thread_source TEXT,
      last_activity_ts INTEGER NOT NULL
    );
    INSERT INTO conversations
      (id, ref, source, external_id, project_id, workspace, workspace_kind, cwd, title,
       parent_thread_id, thread_source, last_activity_ts)
    VALUES
      (1, 'codex/old', 'codex', 'thread-old', 1, '17c8', '.codex', '/Users/me/.codex/worktrees/17c8/repo', 'Older title', NULL, 'user', 100),
      (2, 'codex/current', 'codex', 'thread-current', 1, '17c8', '.codex', '/Users/me/.codex/worktrees/17c8/repo', 'Current task title', NULL, 'user', 200),
      (3, 'codex/other', 'codex', 'thread-other', 1, '99aa', '.codex', '/Users/me/.codex/worktrees/99aa/repo', 'Other worktree', NULL, 'user', 300),
      (4, 'codex/subagent', 'codex', 'thread-subagent', 1, '17c8', '.codex', '/Users/me/.codex/worktrees/17c8/repo', NULL, 'thread-current', 'subagent', 400),
      (5, 'codex/orphan-subagent', 'codex', 'thread-orphan', 1, '17c8', '.codex', '/Users/me/.codex/worktrees/17c8/repo', 'Wrong sub-agent title', NULL, 'subagent', 500);
  `)
  db.close()
  return dbPath
}

function onlyStable(dbPath) {
  return [{ source: 'stable', dbPath }]
}

describe('dev label resolution', () => {
  it('accepts a conversation title argument or environment fallback', () => {
    expect(readConversationTitleParameter(['--conversation-title', 'Search work'])).toBe(
      'Search work'
    )
    expect(readConversationTitleParameter(['--conversation=Compact title'])).toBe('Compact title')
    expect(readConversationTitleParameter([], { BLUME_DEV_CONVERSATION_TITLE: 'From env' })).toBe(
      'From env'
    )
    expect(() => readConversationTitleParameter(['--conversation-title'])).toThrow(
      'requires a non-empty title'
    )
  })

  it('forwards electron-vite CDP options while consuming launcher-only title flags', () => {
    expect(
      parseDevLauncherArguments([
        '--',
        '--conversation-title',
        'Profile project renders',
        '--remoteDebuggingPort',
        '9223',
        '--sourcemap'
      ])
    ).toEqual({
      conversationTitle: 'Profile project renders',
      runtimeProfile: 'full',
      runnerMode: 'hmr',
      signedOut: false,
      electronViteArgs: ['--remoteDebuggingPort', '9223', '--sourcemap'],
      cdpPort: 9223
    })

    expect(
      parseDevLauncherArguments(['--remoteDebuggingPort=9331', '--conversation=Explicit title'])
    ).toEqual({
      conversationTitle: 'Explicit title',
      runtimeProfile: 'full',
      runnerMode: 'hmr',
      signedOut: false,
      electronViteArgs: ['--remoteDebuggingPort=9331'],
      cdpPort: 9331
    })
  })

  it('only exposes valid CDP ports and preserves the last valid option', () => {
    expect(readRemoteDebuggingPortParameter(['--remoteDebuggingPort', '9223'])).toBe(9223)
    expect(
      readRemoteDebuggingPortParameter([
        '--remoteDebuggingPort=9223',
        '--remoteDebuggingPort',
        '9331'
      ])
    ).toBe(9331)
    expect(readRemoteDebuggingPortParameter(['--remoteDebuggingPort=70000'])).toBeNull()
    expect(readRemoteDebuggingPortParameter(['--remoteDebuggingPort', 'not-a-port'])).toBeNull()
  })

  it('keeps DB label resolution available when a CDP launch has no explicit title', () => {
    expect(
      parseDevLauncherArguments(['--remoteDebuggingPort', '9223'], {
        BLUME_DEV_CONVERSATION_TITLE: ''
      })
    ).toEqual({
      conversationTitle: null,
      runtimeProfile: 'full',
      runnerMode: 'hmr',
      signedOut: false,
      electronViteArgs: ['--remoteDebuggingPort', '9223'],
      cdpPort: 9223
    })
  })

  it('consumes and validates lightweight runtime profiles', () => {
    expect(parseDevLauncherArguments(['--profile', 'ui', '--sourcemap'])).toMatchObject({
      runtimeProfile: 'ui',
      electronViteArgs: ['--sourcemap']
    })
    expect(parseDevLauncherArguments([], { BLUME_DEV_PROFILE: 'conversations' })).toMatchObject({
      runtimeProfile: 'conversations'
    })
    expect(() => parseDevLauncherArguments(['--profile=unknown'])).toThrow(
      'must be one of: full, ui, conversations, native'
    )
    expect(() => parseDevLauncherArguments(['--profile'])).toThrow(
      'requires a non-empty profile'
    )
    expect(() => parseDevLauncherArguments(['--profile', '--sourcemap'])).toThrow(
      'requires a non-empty profile'
    )
    expect(() => parseDevLauncherArguments(['--profile='])).toThrow(
      'requires a non-empty profile'
    )
  })

  it('consumes the static manual-test runner without forwarding it to electron-vite', () => {
    expect(parseDevLauncherArguments(['--profile', 'ui', '--static', '--sourcemap'])).toMatchObject(
      {
        runtimeProfile: 'ui',
        runnerMode: 'static',
        electronViteArgs: ['--sourcemap']
      }
    )
    expect(parseDevLauncherArguments([], { BLUME_DEV_RUNNER: 'static' })).toMatchObject({
      runnerMode: 'static'
    })
    expect(
      devRunnerArguments('static', [
        '--remoteDebuggingPort',
        '9337',
        '--sourcemap',
        '--remoteDebuggingPort=9448'
      ])
    ).toEqual(['preview', '--skipBuild', '--sourcemap'])
    expect(devRunnerArguments('hmr', ['--remoteDebuggingPort', '9337'])).toEqual([
      'dev',
      '--remoteDebuggingPort',
      '9337'
    ])
  })

  it('consumes the signed-out launcher flag without forwarding it to electron-vite', () => {
    expect(parseDevLauncherArguments(['--signed-out', '--sourcemap'])).toEqual({
      conversationTitle: null,
      runtimeProfile: 'full',
      runnerMode: 'hmr',
      signedOut: true,
      electronViteArgs: ['--sourcemap'],
      cdpPort: null
    })
    expect(parseDevLauncherArguments([], { BLUME_DEV_SIGNED_OUT: '1' }).signedOut).toBe(true)
  })

  it('builds database candidates in canary, stable, current-worktree dev order', () => {
    expect(
      devLabelDatabaseCandidates({
        homeDir: '/Users/me',
        devAppPath: '/Users/me/.codex/worktrees/17c8/repo/apps/desktop'
      })
    ).toEqual([
      {
        source: 'canary',
        dbPath: '/Users/me/.blume/.canary/blume.sqlite'
      },
      {
        source: 'stable',
        dbPath: '/Users/me/.blume/blume.sqlite'
      },
      {
        source: 'dev-worktree',
        dbPath:
          '/Users/me/.blume/.dev/Users_me_.codex_worktrees_17c8_repo_apps_desktop/blume.sqlite'
      }
    ])
  })

  it('uses the configured main database as the stable candidate without changing priority', () => {
    expect(
      devLabelDatabaseCandidates({
        homeDir: '/Users/me',
        devAppPath: '/Users/me/worktree/apps/desktop',
        stableDbPath: '/tmp/custom-main.sqlite'
      })
    ).toEqual([
      {
        source: 'canary',
        dbPath: '/Users/me/.blume/.canary/blume.sqlite'
      },
      {
        source: 'stable',
        dbPath: '/tmp/custom-main.sqlite'
      },
      {
        source: 'dev-worktree',
        dbPath: '/Users/me/.blume/.dev/Users_me_worktree_apps_desktop/blume.sqlite'
      }
    ])
  })

  it('uses the latest user-owned conversation for the exact checkout path', () => {
    const label = resolveDevLabel({
      dbCandidates: onlyStable(createMainDb()),
      launchPath: '/Users/me/.codex/worktrees/17c8/repo/apps/desktop',
      workingDirectory: '/Users/me/.codex/worktrees/17c8/repo',
      conversationTitle: null
    })
    expect(label).toMatchObject({
      conversationName: 'Current task title',
      worktreeName: '17c8',
      source: 'stable',
      error: null
    })
  })

  it('resolves titles from canary, then stable, then the current-worktree dev database', () => {
    const canaryDbPath = createMainDb()
    const stableDbPath = createMainDb()
    const devDbPath = createMainDb()
    const dbCandidates = [
      { source: 'canary', dbPath: canaryDbPath },
      { source: 'stable', dbPath: stableDbPath },
      { source: 'dev-worktree', dbPath: devDbPath }
    ]

    for (const [dbPath, title] of [
      [canaryDbPath, 'Canary title'],
      [stableDbPath, 'Stable title'],
      [devDbPath, 'Dev worktree title']
    ]) {
      const db = new DatabaseSync(dbPath)
      db.prepare('UPDATE conversations SET title = ? WHERE id = 2').run(title)
      db.close()
    }

    const input = {
      dbCandidates,
      launchPath: '/Users/me/.codex/worktrees/17c8/repo',
      workingDirectory: '/Users/me/.codex/worktrees/17c8/repo',
      conversationTitle: null
    }
    expect(resolveDevLabel(input)).toMatchObject({
      conversationName: 'Canary title',
      source: 'canary'
    })

    let db = new DatabaseSync(canaryDbPath)
    db.exec('UPDATE conversations SET title = NULL, provider_title = NULL WHERE id = 2;')
    db.close()
    expect(resolveDevLabel(input)).toMatchObject({
      conversationName: 'Stable title',
      source: 'stable'
    })

    db = new DatabaseSync(stableDbPath)
    db.exec('DELETE FROM conversations;')
    db.close()
    expect(resolveDevLabel(input)).toMatchObject({
      conversationName: 'Dev worktree title',
      source: 'dev-worktree'
    })
  })

  it('ignores guardian reviews when choosing the user conversation title', () => {
    const dbPath = createMainDb()
    const db = new DatabaseSync(dbPath)
    db.prepare(
      `INSERT INTO conversations
      (id, ref, source, cwd, title, thread_source, last_activity_ts)
      VALUES (8, 'guardian', 'codex', ?, 'Guardian review', 'guardian_review', 999)`
    ).run('/Users/me/.codex/worktrees/17c8/repo')
    db.close()
    const label = resolveDevLabel({
      dbCandidates: onlyStable(dbPath),
      launchPath: '/Users/me/.codex/worktrees/17c8/repo',
      workingDirectory: '/Users/me/.codex/worktrees/17c8/repo',
      conversationTitle: null
    })
    expect(label.conversationName).toBe('Current task title')
  })

  it('does not cross into another checkout or a parent directory', () => {
    const dbPath = createMainDb()
    const db = new DatabaseSync(dbPath)
    db.exec(`
      INSERT INTO conversations
        (id, ref, source, project_id, cwd, title, thread_source, last_activity_ts)
      VALUES
        (6, 'codex/home', 'codex', 2, '/Users/me', 'Unrelated parent directory', 'user', 900),
        (7, 'codex/nested', 'codex', 1, '/Users/me/.codex/worktrees/17c8/repo/apps/desktop', 'Nested checkout task', 'user', 150);
    `)
    db.close()

    const label = resolveDevLabel({
      dbCandidates: onlyStable(dbPath),
      launchPath: '/Users/me/.codex/worktrees/17c8/repo/apps/desktop',
      workingDirectory: '/Users/me/.codex/worktrees/17c8/repo',
      conversationTitle: null
    })
    expect(label.conversationName).toBe('Current task title')
  })

  it('requires an explicit title when the exact path has no conversation', () => {
    const dbCandidates = ['canary', 'stable', 'dev-worktree'].map((source) => ({
      source,
      dbPath: createMainDb()
    }))
    const label = resolveDevLabel({
      dbCandidates,
      launchPath: '/Users/me/.codex/worktrees/missing/repo',
      workingDirectory: '/Users/me/.codex/worktrees/missing/repo',
      conversationTitle: null
    })
    expect(label.conversationName).toBeNull()
    expect(label.source).toBe('missing')
    expect(label.error).toContain('no user-owned conversation')
    expect(label.error).toContain('canary:')
    expect(label.error).toContain('stable:')
    expect(label.error).toContain('dev-worktree:')
    expect(label.error).toContain('--conversation-title')
    expect(label.error).toContain('short, descriptive title')
  })

  it('requires an explicit title when the latest matching conversation is untitled', () => {
    const dbPath = createMainDb()
    const db = new DatabaseSync(dbPath)
    db.exec(`
      UPDATE conversations
      SET title = NULL, provider_title = NULL, last_activity_ts = 600
      WHERE id = 2;
    `)
    db.close()

    const label = resolveDevLabel({
      dbCandidates: onlyStable(dbPath),
      launchPath: '/Users/me/.codex/worktrees/17c8/repo',
      workingDirectory: '/Users/me/.codex/worktrees/17c8/repo',
      conversationTitle: null
    })
    expect(label.conversationName).toBeNull()
    expect(label.error).toContain('does not have a title yet')
    expect(label.error).toContain('--conversation-title')
    expect(label.error).toContain('short, descriptive title')
  })

  it('lets an explicit title override the main-db title while preserving worktree identity', () => {
    const label = resolveDevLabel({
      dbCandidates: onlyStable(createMainDb()),
      launchPath: '/Users/me/.codex/worktrees/17c8/repo',
      workingDirectory: '/Users/me/.codex/worktrees/missing/repo',
      conversationTitle: 'Explicit title'
    })
    expect(label.conversationName).toBe('Explicit title')
    expect(label.worktreeName).toBe('17c8')
    expect(label.source).toBe('parameter')
  })

  it('can infer common harness worktree names without a database row', () => {
    expect(inferWorktreeName('/Users/me/.codex/worktrees/17c8/repo')).toBe('17c8')
    expect(inferWorktreeName('/Users/me/repo/.claude/worktrees/search-ui')).toBe('search-ui')
    expect(inferWorktreeName('/Users/me/repo')).toBeNull()
  })
})
