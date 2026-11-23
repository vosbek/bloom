import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { ProjectSetupSummary } from '@blume/setup-model'
import { assemblePluginBuild } from '@blume/agent-mcp-node/plugin-build'
import {
  blumeHome,
  writeEvidencePin
} from '../../../../packages/agent-mcp-node/src/controlSignalEvidence'
import { evidencePinsDirectory } from '../../src/main/conversations/evidencePins'

import type {
  ConversationRefreshWorkerHostMessage,
  ConversationRefreshWorkerMessage,
  ConversationRefreshWorkerRequest
} from '../../src/main/conversations/refreshProtocol'

interface ParsedFixture {
  conv: { ref: string; cwd?: string; projectRoot?: string }
  sourcePath: string
  sourceMtimeMs: number
}

interface TestProvider {
  source: string
  iterate(options?: {
    maxAgeMs?: number
    shouldStop?: () => boolean
    skipIfSourceMatches?: Map<string, { sourceMtimeMs: number | null; sourceCursor: string | null }>
  }): AsyncIterable<ParsedFixture>
}

const state = vi.hoisted(() => ({
  providers: [] as TestProvider[],
  ingest: async (): Promise<void> => {},
  cursors: [] as Array<{
    kind: string
    path: string
    sourceMtimeMs: number | null
    sourceSize: number | null
    sourceBytesParsed: number | null
    sourceCursor: string | null
    lastFetchedAt: number | null
  }>,
  meta: {
    codex_parser_v12_at: 'done',
    claude_parser_v5_at: 'done',
    claude_todo_turn_projection_v5_at: 'done'
  } as Record<string, string>,
  recentProjects: [] as Array<{ path: string; display_path: string | null }>,
  recentProjectLimits: [] as number[],
  summaries: new Map<string, ProjectSetupSummary>(),
  observedProjects: [] as string[],
  observedWorkspaces: [] as string[],
  projectPersistenceError: undefined as Error | undefined,
  selfRunPaths: new Set<string>(),
  walkCacheInvalidations: 0,
  menuBarSnapshotOptions: [] as Array<{ sinceMs: number; limit: number }>,
  registered: [] as Array<{ harness: string; conversationId: string }>,
  /** Stored conversations the gate checks when it changes. */
  storedSources: [] as Array<{
    sourceKind: string
    sourcePath: string
    cwd: string | null
    projectPath: string | null
    gitRemote: string | null
  }>,
  forgotten: [] as string[],
  upsertedCursors: [] as Array<{ kind: string; path: string; lastMtimeMs?: number | null }>,
  /** Rows of the retired excluded-projects table not yet moved into Use Blume. */
  legacyExclusions: null as null | {
    rows: Array<{
      id: string
      root: string
      canonicalRemote: string | null
      pattern: string | null
    }>
    total: number
  },
  links: [] as Array<{ conversationRef: string; messageId: string | null; cloudId: string }>,
  localMessages: [] as Array<{
    messageId: string
    eventId: number
    turnPosition: number
    role: 'user' | 'assistant' | 'tool'
    text: string
    timestampMs: number | null
  }>
}))

vi.mock('@blume/app-core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@blume/app-core')>()
  return {
    ...actual,
    applyDeferredLegacyConversationOverrides: vi.fn(),
    createConversationIngestRuntime: () => ({
      ingestConversation: (parsed: ParsedFixture) => state.ingest(parsed)
    })
  }
})

vi.mock('@blume/conversations-parser-binding/node', () => ({
  createSubprocessBinding: vi.fn()
}))

vi.mock('@blume/filesystem-local', () => ({
  invalidateWalkCache: () => {
    state.walkCacheInvalidations += 1
  }
}))

vi.mock('@blume/projects-identity', () => ({
  identify: (path: string) => ({
    project: { kind: 'folder', id: `project:${path}`, root: path },
    workspace: {
      id: `workspace:${path}`,
      projectId: `project:${path}`,
      path,
      kind: 'folder-root'
    }
  }),
  isSymlinkAwareBlumeHarnessRunsPath: (path: string) => state.selfRunPaths.has(path),
  projectRootOf: (project: { root: string }) => project.root,
  projectDisplayName: (project: { root: string }) => project.root,
  repositoryMatchKey: (value: string | null | undefined) => (value ? `path:${value}` : null)
}))

vi.mock('@blume/storage-sqlite', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@blume/storage-sqlite')>()),
  readLegacyProjectExclusions: () => state.legacyExclusions,
  listStoredConversationSources: () => state.storedSources,
  listSourcesWithoutConversation: () => [],
  forgetConversationSources: (_db: unknown, paths: string[]) => {
    state.forgotten.push(...paths)
    return paths.length
  }
}))

vi.mock('@blume/projects-identity/node', () => ({
  probeGitIdentity: () => ({ isRepo: false })
}))

vi.mock('../../src/main/cursorComposerState', () => ({
  cursorStateMtimeMs: () => 0,
  loadCursorComposerRepoPath: vi.fn(),
  loadCursorComposerState: vi.fn()
}))

vi.mock('../../src/main/conversations/providerHostFactory', () => ({
  createDesktopLocalProviderHost: () => ({ providers: state.providers })
}))

vi.mock('../../src/main/db/sqliteStorage', () => ({
  openDesktopSqliteStorage: () => ({
    db: {},
    close: vi.fn(),
    storage: {
      meta: {
        getAll: async () => ({ ...state.meta }),
        get: async (key: string) => state.meta[key] ?? null,
        set: async (key: string, value: string) => {
          state.meta[key] = value
        },
        delete: async (key: string) => {
          delete state.meta[key]
        }
      },
      sourceCursors: {
        getSourceCursor: async () => null,
        upsertSourceCursor: async (cursor: { kind: string; path: string }) => {
          state.upsertedCursors.push(cursor)
        },
        listSourceCursors: async () => state.cursors,
        resetSourceCursorsForKind: async () => {}
      },
      desktopConversations: {
        loadMenuBarConversationSnapshot: async (options: { sinceMs: number; limit: number }) => {
          state.menuBarSnapshotOptions.push(options)
          return {
            rows: [
              {
                ref: 'codex:menu-bar',
                source: 'codex',
                title: 'Prepared menu bar',
                provider_title: null,
                preview: null,
                workspace: null,
                cwd: null,
                state: 'running',
                last_activity_ts: 123,
                thread_source: null
              }
            ],
            totalConversationCount: 3,
            counts: { running: 1, waiting: 1, finished: 1 }
          }
        },
        getSkippedConversation: async () => null,
        applySkippedConversationUpdate: async () => {},
        replaceConversation: async () => {},
        deleteConversationsBySourcePaths: async () => 0,
        markStaleConversationsInactive: async () => {}
      },
      desktopProjects: {
        listRecentProjects: async (limit: number) => {
          state.recentProjectLimits.push(limit)
          return state.recentProjects.slice(0, limit)
        }
      },
      desktopReferences: {
        replaceRegisteredConversations: async (
          registrations: Array<{ harness: string; conversationId: string }>
        ) => {
          state.registered = [...registrations]
        },
        listRegisteredConversations: async () => [...state.registered],
        findConversationBySession: async (harness: string, sessionId: string) =>
          harness === 'claude' && sessionId === 'session-1'
            ? { id: 1, ref: 'claude:session-1', harness, sessionId }
            : null,
        listConversationMessages: async () => state.localMessages,
        findConversationMessage: async (_id: number, messageId: string) =>
          state.localMessages.find((message) => message.messageId === messageId) ?? null,
        upsertConversationLink: async (link: {
          conversationRef: string
          messageId: string | null
          cloudId: string
        }) => {
          state.links.push(link)
        }
      },
      projects: {
        listProjectsByRoots: async () => [],
        listWorkspaceLocationsForProjects: async () => [],
        upsertProject: async (project: { id: string }) => {
          if (state.projectPersistenceError) throw state.projectPersistenceError
          state.observedProjects.push(project.id)
        },
        upsertWorkspaceLocation: async (workspace: { id: string }) => {
          state.observedWorkspaces.push(workspace.id)
        }
      },
      projectSetupSummaries: {
        get: async (workspacePath: string) => state.summaries.get(workspacePath) ?? null,
        listForWorkspacePaths: async (paths: string[]) =>
          paths.flatMap((path) => {
            const summary = state.summaries.get(path)
            return summary ? [summary] : []
          }),
        upsert: async (summary: ProjectSetupSummary) => {
          state.summaries.set(summary.workspacePath, summary)
        }
      }
    }
  })
}))

type MessageWaiter = {
  predicate: (message: ConversationRefreshWorkerMessage) => boolean
  resolve: (message: ConversationRefreshWorkerMessage) => void
}

const sent: ConversationRefreshWorkerMessage[] = []
const waiters = new Set<MessageWaiter>()
let onParentMessage: ((event: { data: ConversationRefreshWorkerHostMessage }) => void) | undefined

const fakeParentPort = {
  postMessage(message: ConversationRefreshWorkerMessage) {
    sent.push(message)
    for (const waiter of waiters) {
      if (!waiter.predicate(message)) continue
      waiters.delete(waiter)
      waiter.resolve(message)
    }
  },
  on(event: string, listener: (event: { data: ConversationRefreshWorkerHostMessage }) => void) {
    if (event === 'message') onParentMessage = listener
  }
}

const processWithParentPort = process as typeof process & { parentPort?: typeof fakeParentPort }
const originalParentPort = Object.getOwnPropertyDescriptor(process, 'parentPort')

function parsedFixture(sourcePath: string, cwd?: string): ParsedFixture {
  return { conv: { ref: sourcePath, cwd }, sourcePath, sourceMtimeMs: 1 }
}

function request(id = 1): ConversationRefreshWorkerRequest {
  return {
    type: 'refresh',
    registeredAgents: [{ harness: 'codex', conversationId: 'registered-session' }],
    evidencePinsDir: '',
    completedEvidence: [],
    evidencePinCursor: null,
    id,
    maxAgeMs: 24 * 60 * 60 * 1000,
    dbPath: '/tmp/blume-worker-test.sqlite',
    blumeRoot: '/tmp/blume-worker-test',
    homeBlumeRoot: '/tmp/home-blume',
    parserBinaryPath: null,
    watcherReady: true,
    invalidateDiscoveryCache: false,
    knownFiles: [],
    targetPaths: null
  }
}

function dispatch(message: ConversationRefreshWorkerHostMessage): void {
  if (!onParentMessage) throw new Error('refresh worker did not register its parent-port listener')
  onParentMessage({ data: message })
}

function waitForMessage<T extends ConversationRefreshWorkerMessage>(
  predicate: (message: ConversationRefreshWorkerMessage) => message is T
): Promise<T> {
  const existing = sent.find(predicate)
  if (existing) return Promise.resolve(existing)
  return new Promise((resolve) => {
    waiters.add({ predicate, resolve: (message) => resolve(message as T) })
  })
}

function waitForResult(
  id: number
): Promise<Extract<ConversationRefreshWorkerMessage, { type: 'refresh-result' }>> {
  return waitForMessage(
    (message): message is Extract<ConversationRefreshWorkerMessage, { type: 'refresh-result' }> =>
      message.type === 'refresh-result' && message.id === id
  )
}

describe.sequential('conversation refresh utility worker protocol', () => {
  beforeAll(async () => {
    Object.defineProperty(processWithParentPort, 'parentPort', {
      configurable: true,
      value: fakeParentPort
    })
    await import('../../src/main/conversations/refreshWorker')
  }, 30_000)
  afterAll(() => {
    if (originalParentPort) Object.defineProperty(process, 'parentPort', originalParentPort)
    else delete processWithParentPort.parentPort
  })

  beforeEach(() => {
    vi.useRealTimers()
    sent.length = 0
    waiters.clear()
    state.providers = []
    state.cursors = []
    state.ingest = async () => {}
    state.recentProjects = []
    state.summaries.clear()
    state.observedProjects = []
    state.observedWorkspaces = []
    state.projectPersistenceError = undefined
    state.selfRunPaths.clear()
    state.walkCacheInvalidations = 0
    state.menuBarSnapshotOptions = []
    state.registered = []
    state.storedSources = []
    state.forgotten = []
    state.upsertedCursors = []
    for (const key of Object.keys(state.meta))
      if (key.startsWith('conversation_gate_')) delete state.meta[key]
    state.legacyExclusions = null
    state.links = []
    state.localMessages = []
  })

  test('caches registrations and keeps parsing the cached set offline or signed out', async () => {
    const ingested: string[] = []
    state.ingest = async (parsed) => {
      ingested.push((parsed as ParsedFixture).sourcePath)
    }
    state.providers = [
      {
        source: 'codex',
        async *iterate() {
          yield parsedFixture('/sessions/registered-session.jsonl')
        }
      }
    ]
    dispatch(request(61))
    expect(await waitForResult(61)).toMatchObject({ ok: true, registeredConversations: 1 })
    expect(state.registered).toEqual([{ harness: 'codex', conversationId: 'registered-session' }])

    // Signed out / offline: main sends null and the worker parses what it cached.
    dispatch({ ...request(62), registeredAgents: null })
    expect(await waitForResult(62)).toMatchObject({
      ok: true,
      registeredConversations: 1,
      parsed: 1
    })
    expect(ingested).toEqual([
      '/sessions/registered-session.jsonl',
      '/sessions/registered-session.jsonl'
    ])

    // Nothing registered (fresh or cached): nothing is parsed, never every file.
    dispatch({ ...request(63), registeredAgents: [] })
    expect(await waitForResult(63)).toMatchObject({
      ok: true,
      registeredConversations: 0,
      parsed: 0
    })
    dispatch({ ...request(64), registeredAgents: null })
    expect(await waitForResult(64)).toMatchObject({
      ok: true,
      registeredConversations: 0,
      parsed: 0
    })
    expect(ingested).toHaveLength(2)
  })

  test('resolves evidence pins to linked messages and deletes completed pins', async () => {
    const pins = await mkdtemp(join(tmpdir(), 'blume-evidence-pins-'))
    try {
      const pin = (quote: string, sessionId = 'session-1') =>
        JSON.stringify({ quote, harness: 'claude', sessionId, recordedAt: 1 })
      await writeFile(join(pins, 'sig_match.json'), pin('please stop renaming my variables'))
      await writeFile(
        join(pins, 'sig_elsewhere.json'),
        pin('please stop renaming', 'other-session')
      )
      await writeFile(join(pins, 'sig_done.json'), pin('already completed quote'))
      await writeFile(join(pins, 'notes.txt'), 'not a pin')
      state.localMessages = [
        {
          messageId: 'uuid-7',
          eventId: 7,
          turnPosition: 2,
          role: 'user',
          text: 'Please STOP renaming my   variables.',
          timestampMs: null
        }
      ]
      dispatch({ ...request(65), evidencePinsDir: pins, completedEvidence: ['sig_done'] })
      expect(await waitForResult(65)).toMatchObject({
        ok: true,
        resolvedEvidence: [
          { signalId: 'sig_match', messageId: 'uuid-7', conversationRef: 'claude:session-1' }
        ]
      })
      expect(state.links).toMatchObject([
        { conversationRef: 'claude:session-1', messageId: 'uuid-7', cloudId: 'sig_match' }
      ])
      const { readdir } = await import('node:fs/promises')
      // The pin stays until the hosted ledger accepted its pointer; completed pins are deleted.
      expect((await readdir(pins)).sort()).toEqual([
        'notes.txt',
        'sig_elsewhere.json',
        'sig_match.json'
      ])
    } finally {
      await rm(pins, { recursive: true, force: true })
    }
  })

  test('dev-build signal pins resolve in their own worker alongside installed-plugin pins, without reading another dev root', async () => {
    const home = await mkdtemp(join(tmpdir(), 'blume-dev-evidence-'))
    try {
      const sharedRoot = join(home, '.blume')
      const appRoot = join(sharedRoot, '.dev', 'checkout-a')
      const otherRoot = join(sharedRoot, '.dev', 'checkout-b')
      const files = assemblePluginBuild({
        build: join(appRoot, 'plugin', 'builds', 'fixture'),
        hash: 'a'.repeat(12),
        root: appRoot,
        runtime: null,
        scripts: { bridge: '', hook: '', codexSession: '' }
      })
      const env = JSON.parse(files['claude/blume/.mcp.json']).mcpServers.blume.env
      const pin = {
        quote: 'Please stop renaming my variables',
        harness: 'claude',
        sessionId: 'session-1',
        recordedAt: 1
      }
      const devPin = writeEvidencePin('sig_dev', pin, blumeHome(env))
      const sharedPin = writeEvidencePin('sig_installed', pin, sharedRoot)
      const otherPin = writeEvidencePin('sig_other_dev', pin, otherRoot)
      state.localMessages = [
        {
          messageId: 'uuid-dev',
          eventId: 1,
          turnPosition: 0,
          role: 'user',
          text: pin.quote,
          timestampMs: null
        }
      ]
      const input = {
        ...request(68),
        blumeRoot: appRoot,
        evidencePinsDir: evidencePinsDirectory({}, home)
      }
      dispatch(input)
      const first = await waitForResult(68)
      expect(first.ok).toBe(true)
      if (!first.ok) return
      expect(first.resolvedEvidence.map((pin) => pin.signalId).sort()).toEqual([
        'sig_dev',
        'sig_installed'
      ])
      expect(JSON.stringify(first)).not.toContain(pin.quote)
      // Stable reads only its shared root; it must not discover or remove sandboxed pins.
      dispatch({ ...input, id: 69, blumeRoot: sharedRoot })
      const stable = await waitForResult(69)
      expect(stable).toMatchObject({
        ok: true,
        resolvedEvidence: [{ signalId: 'sig_installed', messageId: 'uuid-dev' }]
      })
      dispatch({
        ...input,
        id: 70,
        evidencePinCursor: first.evidencePinCursor,
        completedEvidence: ['sig_dev', 'sig_installed']
      })
      expect(await waitForResult(70)).toMatchObject({ ok: true, resolvedEvidence: [] })
      const { access } = await import('node:fs/promises')
      await expect(access(devPin)).rejects.toThrow()
      await expect(access(sharedPin)).rejects.toThrow()
      await expect(access(otherPin)).resolves.toBeUndefined()
    } finally {
      await rm(home, { recursive: true, force: true })
    }
  })

  test('locates evidence on this computer or reports another computer', async () => {
    state.localMessages = [
      {
        messageId: 'uuid-7',
        eventId: 7,
        turnPosition: 2,
        role: 'user',
        text: 'x',
        timestampMs: null
      }
    ]
    dispatch({
      type: 'evidence-location',
      id: 66,
      dbPath: '/tmp/blume-worker-test.sqlite',
      request: { harness: 'claude', sessionId: 'session-1', messageId: 'uuid-7' }
    })
    dispatch({
      type: 'evidence-location',
      id: 67,
      dbPath: '/tmp/blume-worker-test.sqlite',
      request: { harness: 'codex', sessionId: 'elsewhere', messageId: null }
    })
    const located = (id: number) =>
      waitForMessage(
        (
          message
        ): message is Extract<
          ConversationRefreshWorkerMessage,
          { type: 'evidence-location-result' }
        > => message.type === 'evidence-location-result' && message.id === id
      )
    expect(await located(66)).toMatchObject({
      ok: true,
      location: {
        status: 'local',
        conversationRef: 'claude:session-1',
        message: { eventId: 7, turnPosition: 2 }
      }
    })
    expect(await located(67)).toMatchObject({ ok: true, location: { status: 'elsewhere' } })
  })

  test('lists recent projects with their setup summaries on the utility worker, bounded', async () => {
    state.recentProjects = [
      {
        id: 1,
        path: '/repo/app',
        name: 'app',
        git_remote: 'git@github.com:acme/app.git',
        display_path: null,
        created_at: 1,
        updated_at: 2
      }
    ] as never
    dispatch({
      type: 'recent-projects',
      id: 68,
      dbPath: '/tmp/blume-worker-test.sqlite',
      limit: 10_000
    })
    const result = await waitForMessage(
      (
        message
      ): message is Extract<ConversationRefreshWorkerMessage, { type: 'recent-projects-result' }> =>
        message.type === 'recent-projects-result' && message.id === 68
    )
    expect(result).toMatchObject({
      ok: true,
      projects: [
        { path: '/repo/app', git_remote: 'git@github.com:acme/app.git', setup_summary: null }
      ]
    })
    // 100 projects at 20 rows each: never more than 2,000 raw rows.
    expect(state.recentProjectLimits.at(-1)).toBe(2_000)
  })

  test('loads one bounded menu-bar snapshot through the utility worker', async () => {
    dispatch({
      type: 'menu-bar-snapshot',
      id: 45,
      dbPath: '/tmp/blume-worker-test.sqlite',
      nowMs: 100_000_000
    })
    const result = await waitForMessage(
      (
        message
      ): message is Extract<
        ConversationRefreshWorkerMessage,
        { type: 'menu-bar-snapshot-result'; ok: true }
      > => message.type === 'menu-bar-snapshot-result' && message.id === 45 && message.ok
    )

    expect(state.menuBarSnapshotOptions).toEqual([{ sinceMs: 13_600_000, limit: 13 }])
    expect(result.projection).toEqual({
      rows: [
        {
          ref: 'codex:menu-bar',
          source: 'codex',
          title: 'Prepared menu bar',
          state: 'running'
        }
      ],
      totalConversationCount: 3,
      counts: { running: 1, waiting: 1, finished: 1 }
    })
  })

  test('invalidates the utility-process discovery cache only when requested', async () => {
    const ordinary = request(46)
    dispatch(ordinary)
    await waitForResult(46)
    expect(state.walkCacheInvalidations).toBe(0)

    const reconciliation = request(47)
    reconciliation.invalidateDiscoveryCache = true
    reconciliation.targetPaths = null
    dispatch(reconciliation)
    await waitForResult(47)
    expect(state.walkCacheInvalidations).toBe(1)
  })

  test('persists a summary-only setup count for the workspace actually scanned', async () => {
    const project = await mkdtemp(join(tmpdir(), 'blume-project-summary-'))
    try {
      await mkdir(join(project, '.claude', 'skills', 'release'), { recursive: true })
      await writeFile(join(project, '.claude', 'skills', 'release', 'SKILL.md'), '# Release')
      await writeFile(join(project, 'CLAUDE.md'), '# Rules')
      const canonicalPath = '/virtual/projects/release'
      state.recentProjects = [{ path: canonicalPath, display_path: project }]

      dispatch(request(41))
      await waitForResult(41)

      expect(state.summaries.has(canonicalPath)).toBe(false)
      expect(state.summaries.get(project)).toMatchObject({
        workspacePath: project,
        skills: 1,
        rules: 1,
        totalEntries: 2
      })
      expect(sent).toContainEqual({
        type: 'project-setup-summary-progress',
        id: 41,
        workspacePath: project
      })
    } finally {
      await rm(project, { recursive: true, force: true })
    }
  })

  test('persists each observed workspace once in the utility worker', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'blume-observed-workspace-'))
    try {
      state.providers = [
        {
          source: 'codex',
          async *iterate() {
            yield parsedFixture('/first.jsonl', workspace)
            yield parsedFixture('/second.jsonl', workspace)
          }
        }
      ]

      dispatch(request(43))
      await waitForResult(43)

      expect(state.observedProjects).toEqual([`project:${workspace}`])
      expect(state.observedWorkspaces).toEqual([`workspace:${workspace}`])
    } finally {
      await rm(workspace, { recursive: true, force: true })
    }
  })

  test('leaves out conversations in excluded projects until their rows move to Use Blume', async () => {
    const root = await mkdtemp(join(tmpdir(), 'blume-legacy-exclusion-'))
    const excluded = join(root, 'shop')
    const kept = join(root, 'blog')
    await mkdir(join(excluded, 'src'), { recursive: true })
    await mkdir(kept, { recursive: true })
    try {
      state.providers = [
        {
          source: 'codex',
          async *iterate() {
            yield parsedFixture('/in-shop.jsonl', join(excluded, 'src'))
            yield parsedFixture('/in-blog.jsonl', kept)
          }
        }
      ]
      const ingested: string[] = []
      state.ingest = async (parsed) => {
        ingested.push(parsed.sourcePath)
      }
      state.legacyExclusions = {
        rows: [{ id: 'a', root: excluded, canonicalRemote: null, pattern: null }],
        total: 1
      }

      dispatch(request(45))
      expect(await waitForResult(45)).toMatchObject({ ok: true })
      expect(ingested).toEqual(['/in-blog.jsonl'])

      // The move removed the row (Skip now keeps it out of the registrations instead).
      state.legacyExclusions = null
      ingested.length = 0
      dispatch(request(46))
      expect(await waitForResult(46)).toMatchObject({ ok: true })
      expect(ingested).toEqual(['/in-shop.jsonl', '/in-blog.jsonl'])
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })

  test('reads every project when asked, but never a conversation or repository that skips Blume', async () => {
    const root = await mkdtemp(join(tmpdir(), 'blume-scope-all-'))
    const skipped = join(root, 'notes')
    const kept = join(root, 'shop')
    await mkdir(join(skipped, 'daily'), { recursive: true })
    await mkdir(kept, { recursive: true })
    try {
      let allowSource: ((harness: string, path: string) => boolean) | undefined
      state.providers = [
        {
          source: 'codex',
          async *iterate(options?: { allowSource?: (harness: string, path: string) => boolean }) {
            allowSource = options?.allowSource
            yield parsedFixture('/in-notes.jsonl', skipped)
            // A repository inside the skipped folder is its own repository: the plugin uses
            // Blume there, so the app reads it too.
            yield parsedFixture('/in-nested.jsonl', join(skipped, 'daily'))
            yield parsedFixture('/in-shop.jsonl', kept)
          }
        } as TestProvider
      ]
      const ingested: string[] = []
      state.ingest = async (parsed) => {
        ingested.push(parsed.sourcePath)
      }
      dispatch({
        ...request(60),
        registeredAgents: [],
        conversationSkips: {
          conversations: [{ harness: 'codex', conversationId: 'said-no' }],
          repositories: [skipped]
        },
        conversationScope: 'all'
      })
      expect(await waitForResult(60)).toMatchObject({
        ok: true,
        registeredConversations: 0,
        conversationScope: 'all'
      })
      // Nothing is registered, yet every conversation outside the skipped repository is read.
      expect(ingested).toEqual(['/in-nested.jsonl', '/in-shop.jsonl'])
      expect(allowSource?.('codex', '/s/rollout-2026-10-16T09-00-00-anything.jsonl')).toBe(true)
      expect(allowSource?.('codex', '/s/rollout-2026-10-16T09-00-00-said-no.jsonl')).toBe(false)
      // The skipped file's version is remembered, so it is not parsed again while unchanged.
      expect(state.upsertedCursors.map((cursor) => cursor.path)).toEqual(['/in-notes.jsonl'])
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })

  test('without known Skip choices, a computer with registrations reads only those', async () => {
    dispatch({ ...request(61), conversationSkips: null, conversationScope: 'all' })
    expect(await waitForResult(61)).toMatchObject({ ok: true, conversationScope: 'blume' })
  })

  test('a narrower gate removes the stored conversations it no longer shows, once', async () => {
    const row = (sourcePath: string) => ({
      sourceKind: 'codex',
      sourcePath,
      cwd: null,
      projectPath: null,
      gitRemote: null
    })
    state.storedSources = [
      row('/s/rollout-2026-10-16T09-00-00-registered-session.jsonl'),
      row('/s/rollout-2026-10-16T09-00-00-unregistered.jsonl')
    ]
    dispatch({ ...request(62), conversationSkips: { conversations: [], repositories: [] } })
    expect(await waitForResult(62)).toMatchObject({ ok: true, conversationScope: 'blume' })
    expect(state.forgotten).toEqual(['/s/rollout-2026-10-16T09-00-00-unregistered.jsonl'])
    expect(sent).toContainEqual(
      expect.objectContaining({
        type: 'telemetry',
        name: 'main.parser.worker_gate_reconciled',
        properties: expect.objectContaining({ removed_conversations: 1 })
      })
    )
    // The same gate again: nothing is checked or removed.
    state.forgotten = []
    dispatch({ ...request(63), registeredAgents: null })
    expect(await waitForResult(63)).toMatchObject({ ok: true })
    expect(state.forgotten).toEqual([])
  })

  test('does not persist Blume self-run workspaces as user projects', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'blume-self-run-workspace-'))
    try {
      state.selfRunPaths.add(workspace)
      state.providers = [
        {
          source: 'codex',
          async *iterate() {
            yield parsedFixture('/self-run.jsonl', workspace)
          }
        }
      ]

      dispatch(request(44))
      await waitForResult(44)

      expect(state.observedProjects).toEqual([])
      expect(state.observedWorkspaces).toEqual([])
    } finally {
      await rm(workspace, { recursive: true, force: true })
    }
  })

  test('contains an ingest failure per file and continues in provider order', async () => {
    state.providers = [
      {
        source: 'pi',
        async *iterate() {
          yield parsedFixture('/good.jsonl')
          yield parsedFixture('/bad.jsonl')
          yield parsedFixture('/also-good.jsonl')
        }
      }
    ]
    state.ingest = async (parsed) => {
      if (parsed.sourcePath === '/bad.jsonl') throw new Error('constraint violated')
    }

    dispatch(request())
    const result = await waitForResult(1)

    expect(result).toMatchObject({ ok: true, parsed: 2 })
    expect(sent.filter((message) => message.type === 'refresh-progress')).toEqual([
      expect.objectContaining({ seq: 0, sourcePath: '/good.jsonl', ok: true }),
      expect.objectContaining({
        seq: 1,
        sourcePath: '/bad.jsonl',
        ok: false,
        errorMessage: expect.stringContaining('constraint violated')
      }),
      expect.objectContaining({ seq: 2, sourcePath: '/also-good.jsonl', ok: true })
    ])
  })

  test('reports canonicalization failures as ingest progress and continues', async () => {
    const workspace = await mkdtemp(join(tmpdir(), 'blume-canonicalization-failure-'))
    try {
      state.projectPersistenceError = new Error('project persistence failed')
      state.providers = [
        {
          source: 'codex',
          async *iterate() {
            yield parsedFixture('/identity-fails.jsonl', workspace)
            yield parsedFixture('/no-workspace.jsonl')
          }
        }
      ]

      dispatch(request(45))
      const result = await waitForResult(45)

      expect(result).toMatchObject({ ok: true, parsed: 1 })
      expect(sent.filter((message) => message.type === 'refresh-progress')).toEqual([
        expect.objectContaining({
          seq: 0,
          sourcePath: '/identity-fails.jsonl',
          ok: false,
          errorMessage: expect.stringContaining('project persistence failed')
        }),
        expect.objectContaining({ seq: 1, sourcePath: '/no-workspace.jsonl', ok: true })
      ])
    } finally {
      await rm(workspace, { recursive: true, force: true })
    }
  })

  test('reports provider failure telemetry and fails the refresh', async () => {
    state.providers = [
      {
        source: 'pi',
        // eslint-disable-next-line require-yield
        async *iterate() {
          throw new Error('bad transcript root')
        }
      }
    ]

    dispatch(request())
    const result = await waitForResult(1)

    expect(result).toMatchObject({
      ok: false,
      errorMessage: expect.stringContaining('bad transcript root')
    })
    expect(sent).toContainEqual(
      expect.objectContaining({
        type: 'telemetry',
        kind: 'app-error',
        name: 'main.parser.provider',
        properties: { provider: 'pi' }
      })
    )
  })

  test('stop ends an active refresh before the remaining files are ingested', async () => {
    const ingested: string[] = []
    state.ingest = async (parsed) => {
      ingested.push(parsed.sourcePath)
    }
    state.providers = [
      {
        source: 'pi',
        async *iterate(options) {
          for (let index = 0; index < 100; index++) {
            if (options?.shouldStop?.()) return
            if (index === 1) dispatch({ type: 'stop' })
            yield parsedFixture(`/file-${index}.jsonl`)
          }
        }
      }
    ]

    dispatch(request())
    const result = await waitForResult(1)

    expect(result.ok).toBe(true)
    expect(ingested).toEqual(['/file-0.jsonl'])
  })

  test('stop during conversation refresh prevents project summary scanning from starting', async () => {
    const project = await mkdtemp(join(tmpdir(), 'blume-project-stop-summary-'))
    let release: (() => void) | undefined
    try {
      await writeFile(join(project, 'CLAUDE.md'), '# Rules')
      state.recentProjects = [{ path: '/virtual/projects/stopped', display_path: project }]
      state.providers = [
        {
          source: 'pi',
          // eslint-disable-next-line require-yield
          async *iterate() {
            await new Promise<void>((resolve) => {
              release = resolve
            })
          }
        }
      ]

      dispatch(request(42))
      await vi.waitFor(() => expect(release).toBeTypeOf('function'))
      dispatch({ type: 'stop' })
      release?.()
      expect(await waitForResult(42)).toMatchObject({ id: 42, ok: true })

      expect(state.summaries.size).toBe(0)
      expect(sent).not.toContainEqual(
        expect.objectContaining({ type: 'project-setup-summary-progress', id: 42 })
      )
    } finally {
      await rm(project, { recursive: true, force: true })
    }
  })

  test('propagates stored source cursors to providers', async () => {
    let receivedCursor: { sourceMtimeMs: number | null; sourceCursor: string | null } | undefined
    state.cursors = [
      {
        kind: 'pi',
        path: '/known.jsonl',
        sourceMtimeMs: 42,
        sourceSize: null,
        sourceBytesParsed: null,
        sourceCursor: 'offset-7',
        lastFetchedAt: null
      }
    ]
    state.providers = [
      {
        source: 'pi',
        // eslint-disable-next-line require-yield
        async *iterate(options) {
          receivedCursor = options?.skipIfSourceMatches?.get('/known.jsonl')
        }
      }
    ]

    dispatch(request())
    await waitForResult(1)

    expect(receivedCursor).toEqual({ sourceMtimeMs: 42, sourceCursor: 'offset-7' })
  })

  test('posts heartbeats during a silent refresh and clears them after completion', async () => {
    vi.useFakeTimers()
    let release: (() => void) | undefined
    state.providers = [
      {
        source: 'pi',
        // eslint-disable-next-line require-yield
        async *iterate() {
          await new Promise<void>((resolve) => {
            release = resolve
          })
        }
      }
    ]

    dispatch(request())
    await Promise.resolve()
    await vi.advanceTimersByTimeAsync(45_000)

    expect(sent.filter((message) => message.type === 'heartbeat')).toEqual([
      { type: 'heartbeat', id: 1 },
      { type: 'heartbeat', id: 1 },
      { type: 'heartbeat', id: 1 }
    ])

    release?.()
    await waitForResult(1)
    const heartbeatCount = sent.filter((message) => message.type === 'heartbeat').length
    await vi.advanceTimersByTimeAsync(30_000)
    expect(sent.filter((message) => message.type === 'heartbeat')).toHaveLength(heartbeatCount)
  })

  test('rejects a concurrent refresh without interrupting the active request', async () => {
    let release: (() => void) | undefined
    let markStarted: (() => void) | undefined
    const started = new Promise<void>((resolve) => {
      markStarted = resolve
    })
    state.providers = [
      {
        source: 'pi',
        // eslint-disable-next-line require-yield
        async *iterate() {
          markStarted?.()
          await new Promise<void>((resolve) => {
            release = resolve
          })
        }
      }
    ]

    dispatch(request(1))
    await started
    dispatch(request(2))
    const busy = await waitForResult(2)

    expect(busy).toMatchObject({
      ok: false,
      errorMessage: 'conversation refresh worker already has a refresh in flight'
    })

    release?.()
    expect(await waitForResult(1)).toMatchObject({ id: 1, ok: true })
  })
})
