import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { Project, WorkspaceLocation } from '@blume/projects-identity'
import type { ProjectSetupSummary } from '@blume/setup-model'
import type { DesktopProjectRow } from '@blume/storage-port'

const state = vi.hoisted(() => ({
  projects: [] as DesktopProjectRow[],
  canonicalProjects: [] as Project[],
  workspaces: [] as WorkspaceLocation[],
  summaries: new Map<string, ProjectSetupSummary>(),
  requestedPaths: [] as string[],
  desktopListCalls: 0,
  exactGetCalls: 0,
  canonicalLookupCalls: 0,
  workspaceLookupCalls: 0,
  summaryLookupCalls: 0
}))

vi.mock('../../src/main/db/storage', () => ({
  getStorage: () => ({
    desktopProjects: {
      listProjects: async () => {
        state.desktopListCalls += 1
        return state.projects
      },
      listRecentProjects: async (limit = 5) => state.projects.slice(0, limit),
      getProject: async (id: number) => {
        state.exactGetCalls += 1
        return state.projects.find((project) => project.id === id) ?? null
      }
    },
    projects: {
      listProjectsByRoots: async (roots: string[]) => {
        state.canonicalLookupCalls += 1
        const selected = new Set(roots)
        return state.canonicalProjects.filter((project) =>
          selected.has(project.kind === 'git' ? project.repoRoot : project.root)
        )
      },
      listWorkspaceLocationsForProjects: async (projectIds: string[]) => {
        state.workspaceLookupCalls += 1
        const selected = new Set(projectIds)
        return state.workspaces.filter((workspace) => selected.has(workspace.projectId))
      }
    },
    projectSetupSummaries: {
      listForWorkspacePaths: async (paths: string[]) => {
        state.summaryLookupCalls += 1
        state.requestedPaths = paths
        return paths.flatMap((path) => {
          const summary = state.summaries.get(path)
          return summary ? [summary] : []
        })
      }
    }
  })
}))

// The refresh worker answers db:projects:listRecent with the same enrichment over its own handle.
vi.mock('../../src/main/conversations/refreshHost', async () => {
  const { withProjectSetupSummaries } = await import('@blume/app-core')
  const { getStorage } = await import('../../src/main/db/storage')
  return {
    listRecentProjectsViaWorker: async (limit = 5) => {
      const storage = getStorage() as never as Parameters<typeof withProjectSetupSummaries>[0] & {
        desktopProjects: { listRecentProjects(limit: number): Promise<DesktopProjectRow[]> }
      }
      return withProjectSetupSummaries(
        storage,
        await storage.desktopProjects.listRecentProjects(limit)
      )
    }
  }
})

import { registerDesktopDbIpcHandlers } from '../../src/main/db/ipc'

type Handler = (event: never, ...args: any[]) => any

function summary(workspacePath: string): ProjectSetupSummary {
  return {
    workspacePath,
    skills: 2,
    agents: 0,
    commands: 0,
    hooks: 0,
    rules: 1,
    totalEntries: 3,
    scannedAt: 123
  }
}

describe('project setup summary IPC hydration', () => {
  const handlers = new Map<string, Handler>()

  beforeEach(() => {
    handlers.clear()
    state.projects = []
    state.canonicalProjects = []
    state.workspaces = []
    state.summaries.clear()
    state.requestedPaths = []
    state.desktopListCalls = 0
    state.exactGetCalls = 0
    state.canonicalLookupCalls = 0
    state.workspaceLookupCalls = 0
    state.summaryLookupCalls = 0
    registerDesktopDbIpcHandlers((channel, listener) => handlers.set(channel, listener))
  })

  test('hydrates the summary for the display workspace without assigning it to the project key', async () => {
    const root = '/Users/me/.codex/projects/blume'
    const worktree = '/Users/me/.codex/worktrees/abcd/blume'
    state.projects = [
      {
        id: 1,
        path: root,
        display_path: worktree,
        name: 'blume',
        git_remote: null,
        created_at: 1,
        updated_at: 2
      }
    ]
    state.summaries.set(worktree, summary(worktree))

    const rows = await handlers.get('db:projects:listRecent')?.({} as never, 5)

    expect(state.requestedPaths).toEqual([root, worktree])
    expect(rows).toEqual([
      expect.objectContaining({
        path: root,
        display_path: worktree,
        setup_summary: expect.objectContaining({ workspacePath: worktree, totalEntries: 3 })
      })
    ])
  })

  test('hydrates all cached canonical worktrees for a desktop project row', async () => {
    const root = '/Users/me/code/blume'
    const first = '/Users/me/.codex/worktrees/aaaa/blume'
    const second = '/Users/me/.codex/worktrees/bbbb/blume'
    state.projects = [
      {
        id: 1,
        path: root,
        display_path: second,
        name: 'blume',
        git_remote: null,
        created_at: 1,
        updated_at: 2
      }
    ]
    state.canonicalProjects = [
      { kind: 'git', id: 'git-blume', repoRoot: root, gitCommonDir: `${root}/.git` }
    ]
    state.workspaces = [
      { id: 'root', projectId: 'git-blume', path: root, kind: 'repo-root' },
      { id: 'first', projectId: 'git-blume', path: first, kind: 'worktree' },
      { id: 'second', projectId: 'git-blume', path: second, kind: 'worktree' }
    ]
    state.summaries.set(first, summary(first))

    const rows = await handlers.get('db:projects:list')?.({} as never)

    expect(rows?.[0].workspace_locations).toEqual([
      expect.objectContaining({ id: 'root', path: root, kind: 'repo-root' }),
      expect.objectContaining({
        id: 'first',
        path: first,
        kind: 'worktree',
        setup_summary: expect.objectContaining({ workspacePath: first })
      }),
      expect.objectContaining({ id: 'second', path: second, kind: 'worktree' })
    ])
  })

  test('returns one exact desktop project without list or setup-summary hydration', async () => {
    const root = '/Users/me/code/blume'
    state.projects = [
      {
        id: 1,
        path: root,
        display_path: null,
        name: 'blume',
        git_remote: null,
        created_at: 1,
        updated_at: 2
      },
      {
        id: 2,
        path: '/Users/me/code/other',
        display_path: null,
        name: 'other',
        git_remote: null,
        created_at: 1,
        updated_at: 2
      }
    ]
    const row = await handlers.get('db:projects:get')?.({} as never, 1)

    expect(row).toEqual(
      expect.objectContaining({
        id: 1,
        path: root,
        name: 'blume'
      })
    )
    expect(row).not.toHaveProperty('setup_summary')
    expect(state.exactGetCalls).toBe(1)
    expect(state.desktopListCalls).toBe(0)
    expect(state.canonicalLookupCalls).toBe(0)
    expect(state.workspaceLookupCalls).toBe(0)
    expect(state.summaryLookupCalls).toBe(0)
    expect(state.requestedPaths).toEqual([])
  })
})

describe('recent projects stay off Electron main', () => {
  test('db:projects:listRecent is answered by the refresh worker, never a main SQLite read', async () => {
    const { readFileSync } = await import('node:fs')
    const { resolve } = await import('node:path')
    const ipc = readFileSync(resolve(__dirname, '../../src/main/db/ipc.ts'), 'utf8')
    expect(ipc).toContain('listRecentProjectsViaWorker(limit)')
    expect(ipc).not.toContain('desktopProjects.listRecentProjects')
  })
})
