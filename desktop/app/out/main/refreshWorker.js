"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a8bfab2e-f19c-5de8-9576-7f9142923212")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const legacyExclusions = require("./legacyExclusions-DC3wHYCy.js");
const evidencePins = require("./evidencePins-DGYf0g3u.js");
require("./deliveryBriefs-CbTihYeZ.js");
const harnessRuns = require("./harnessRuns-C9zOkWLa.js");
require("./desktopSearch-UUzZxN96.js");
const index = require("./index-DvaJIvS-.js");
const require$$0 = require("os");
const pn = require("path");
const un = require("fs");
const promises = require("fs/promises");
const identity = require("./identity-C50QOXIb.js");
require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
const index$1 = require("./index-TxTRDZxy.js");
const browser = require("./browser-DmfmUSN8.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./useCases-CApkWXtQ.js");
const rustBinding_node = require("./rustBinding.node-BougJ60f.js");
require("node:fs");
require("node:path");
const probe_node = require("./probe.node-DZT3fHhO.js");
require("node:fs/promises");
const jsonlFiles = require("./jsonlFiles-B8t4SSDo.js");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("./repositoryKey-CSvrvo7G.js");
require("./index-UFoqNX7c.js");
require("better-sqlite3");
require("./insights-CJUxz2Be.js");
require("./hash-DCMQIns_.js");
require("node:child_process");
require("node:os");
function isPermanentlyMissingPath(error) {
  if (!error || typeof error !== "object" || !("code" in error)) return false;
  return error.code === "ENOENT" || error.code === "ENOTDIR";
}
function createObservedWorkspaceIdentityService(deps) {
  const observedWorkspaces = /* @__PURE__ */ new Map();
  async function identifyWorkspace(candidate) {
    if (!candidate || deps.shouldIgnore?.(candidate)) return null;
    const workspacePath = deps.resolvePath(candidate);
    if (observedWorkspaces.has(workspacePath)) {
      return observedWorkspaces.get(workspacePath) ?? null;
    }
    try {
      if (!await deps.isDirectory(workspacePath)) {
        observedWorkspaces.set(workspacePath, null);
        return null;
      }
      const identity$1 = identity.identify(workspacePath, await deps.probe(workspacePath));
      await deps.projects.upsertProject(identity$1.project);
      await deps.projects.upsertWorkspaceLocation(identity$1.workspace);
      observedWorkspaces.set(workspacePath, identity$1);
      return identity$1;
    } catch (error) {
      if (isPermanentlyMissingPath(error)) {
        observedWorkspaces.set(workspacePath, null);
        return null;
      }
      deps.captureError?.(error, { workspacePath });
      throw error;
    }
  }
  return {
    identifyWorkspace,
    async identifyWorkspaces(candidates) {
      const identities = [];
      const uniqueCandidates = new Set(
        candidates.map((candidate) => candidate.trim()).filter(Boolean)
      );
      for (const candidate of uniqueCandidates) {
        const identity2 = await identifyWorkspace(candidate);
        if (identity2) identities.push(identity2);
      }
      return identities;
    },
    async canonicalizeConversation(parsed) {
      const identity$1 = await identifyWorkspace(parsed.conv.cwd ?? parsed.conv.projectRoot);
      if (!identity$1) return parsed;
      return {
        ...parsed,
        conv: {
          ...parsed.conv,
          projectName: identity.projectDisplayName(identity$1.project),
          projectRoot: identity.projectRootOf(identity$1.project)
        }
      };
    }
  };
}
const CONVERSATION_SKIPS_META_KEY = "conversation_gate_skips_v1";
const CONVERSATION_GATE_META_KEY = "conversation_gate_fingerprint_v1";
const CONVERSATION_GATE_SHAPE_META_KEY = "conversation_gate_shape_v1";
const CONVERSATION_GATE_WORKSPACES_META_KEY = "conversation_gate_workspaces_v1";
const CONVERSATION_GATE_FORGET_BATCH = 250;
function parseSkips(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed.conversations) || !Array.isArray(parsed.repositories)) return null;
    return {
      conversations: parsed.conversations.slice(0, evidencePins.MAX_CACHED_SKIPPED_CONVERSATIONS),
      repositories: parsed.repositories.slice(0, evidencePins.MAX_CACHED_SKIPPED_REPOSITORIES)
    };
  } catch {
    return null;
  }
}
async function forgetInBatches(store, paths, ports) {
  let removed = 0;
  for (let index2 = 0; index2 < paths.length; index2 += CONVERSATION_GATE_FORGET_BATCH) {
    if (ports.shouldStop()) return { removed, complete: false };
    removed += await store.forgetSources(paths.slice(index2, index2 + CONVERSATION_GATE_FORGET_BATCH));
    await ports.yieldToEventLoop();
  }
  return { removed, complete: true };
}
async function prepareConversationGate(request, store, ports) {
  let registrations;
  if (request.registeredAgents) {
    await store.replaceRegistrations(request.registeredAgents);
    registrations = request.registeredAgents;
  } else {
    registrations = await store.listRegistrations();
  }
  let skips = parseSkips(await store.getMeta(CONVERSATION_SKIPS_META_KEY));
  if (request.registeredAgents && request.conversationSkips) {
    skips = request.conversationSkips;
    await store.setMeta(CONVERSATION_SKIPS_META_KEY, JSON.stringify(skips));
  }
  const scope = evidencePins.effectiveConversationScope(request.conversationScope, skips, registrations.length);
  const gate = evidencePins.conversationGate(scope, registrations, skips, request.legacyRows);
  if (!request.fullPass || scope !== request.conversationScope)
    return { gate, scope, registrations, changed: false };
  const fingerprint = evidencePins.conversationGateFingerprint(scope, registrations, skips);
  const workspaces = JSON.stringify([
    [...skips?.repositories ?? []].sort(),
    request.legacyRows.map((row) => row.id).sort()
  ]);
  const shape = evidencePins.conversationGateFingerprint(scope, [], skips);
  const before = await store.getMeta(CONVERSATION_GATE_META_KEY);
  const workspacesBefore = await store.getMeta(CONVERSATION_GATE_WORKSPACES_META_KEY);
  const shapeBefore = await store.getMeta(CONVERSATION_GATE_SHAPE_META_KEY);
  if (before === fingerprint && workspacesBefore === workspaces)
    return { gate, scope, registrations, changed: false };
  const startedAtMs = ports.now();
  const outside = before === fingerprint ? [] : evidencePins.conversationSourcesOutsideGate(gate, await store.listStoredSources());
  const removal = await forgetInBatches(store, outside, ports);
  const forgotten = removal.complete && workspacesBefore !== workspaces ? await store.listSourcesWithoutConversation() : [];
  const forgetting = removal.complete ? await forgetInBatches(store, forgotten, ports) : { complete: false };
  if (removal.complete && forgetting.complete) {
    await store.setMeta(CONVERSATION_GATE_META_KEY, fingerprint);
    await store.setMeta(CONVERSATION_GATE_WORKSPACES_META_KEY, workspaces);
    await store.setMeta(CONVERSATION_GATE_SHAPE_META_KEY, shape);
  }
  ports.onReconciled?.({
    scope,
    removedConversations: removal.removed,
    forgottenSources: forgotten.length,
    durationMs: ports.now() - startedAtMs
  });
  return {
    gate,
    scope,
    registrations,
    // The first check has nothing to compare with: the boot pass and the history parser read
    // everything anyway, so it must not widen the first pass to a week.
    changed: shapeBefore != null && (shapeBefore !== shape || workspacesBefore !== workspaces)
  };
}
const parentPort = process.parentPort;
const CONVERSATION_REFRESH_WORKER_HEARTBEAT_INTERVAL_MS = 15e3;
let storageHandle = null;
let storagePath = null;
let parserBinding;
let parserBinaryPath;
let knownFiles = [];
let watcherReady = false;
let activeRefreshService = null;
let activeRefreshId = null;
let activeRequestAbortController = null;
const PROJECT_SETUP_SUMMARY_LIMIT = 5;
const PROJECT_SETUP_SUMMARY_TTL_MS = 5 * 6e4;
const setupBrowserService = new browser.SetupBrowserService({
  home: require$$0.homedir(),
  fs: {
    readdir: promises.readdir,
    stat: promises.stat,
    readFile: (path) => promises.readFile(path, "utf8")
  },
  accessFs: {
    lstat: promises.lstat,
    realpath: promises.realpath,
    readFile: (path) => promises.readFile(path, "utf8"),
    writeFile: (path, content) => promises.writeFile(path, content, "utf8"),
    removeFile: (path) => promises.rm(path, { force: true }),
    removeDirectory: (path) => promises.rm(path, { recursive: true, force: true })
  },
  devFormatFs: { readdir: promises.readdir, stat: promises.stat },
  path: { resolve: pn.resolve, relative: pn.relative, isAbsolute: pn.isAbsolute, dirname: pn.dirname, basename: pn.basename, join: pn.join, sep: pn.sep },
  platform: process.platform
});
function post(message) {
  parentPort?.postMessage(message);
}
function serializeError(id, err, performance) {
  if (err instanceof Error) {
    return {
      type: "refresh-result",
      id,
      ok: false,
      ...performance,
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack
    };
  }
  return {
    type: "refresh-result",
    id,
    ok: false,
    ...performance,
    errorMessage: String(err)
  };
}
function serializeMenuBarSnapshotError(id, err) {
  if (err instanceof Error) {
    return {
      type: "menu-bar-snapshot-result",
      id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack
    };
  }
  return {
    type: "menu-bar-snapshot-result",
    id,
    ok: false,
    errorMessage: String(err)
  };
}
function errorMessage(err) {
  if (err instanceof Error) return err.stack ?? err.message;
  return String(err);
}
function getStorageHandle(dbPath) {
  if (storageHandle && storagePath === dbPath) return storageHandle;
  storageHandle?.close();
  storageHandle = sqliteStorage.openDesktopSqliteStorage(dbPath);
  storagePath = dbPath;
  return storageHandle;
}
function getParserBinding() {
  if (!parserBinaryPath) return null;
  if (parserBinding === void 0) {
    parserBinding = rustBinding_node.createSubprocessBinding({ binaryPath: parserBinaryPath });
  }
  return parserBinding;
}
function configureRequest(input) {
  if (input.invalidateDiscoveryCache) jsonlFiles.invalidateWalkCache();
  knownFiles = input.knownFiles;
  watcherReady = input.watcherReady;
  if (parserBinaryPath !== input.parserBinaryPath) {
    parserBinaryPath = input.parserBinaryPath;
    parserBinding = void 0;
  }
}
function isSelfRunPath(input, path) {
  return harnessRuns.isSymlinkAwareBlumeHarnessRunsPath(path, {
    currentBlumeRoot: input.blumeRoot,
    homeBlumeRoot: input.homeBlumeRoot || pn.join(require$$0.homedir(), ".blume"),
    realpath: (candidate) => un.realpathSync.native(candidate)
  });
}
async function refreshRecentProjectSetupSummaries(input, storage, signal) {
  if (signal.aborted) return;
  const projects = await storage.desktopProjects.listRecentProjects(PROJECT_SETUP_SUMMARY_LIMIT);
  for (const project of projects) {
    if (signal.aborted) return;
    const scanPath = project.display_path ?? project.path;
    const existing = await storage.projectSetupSummaries.get(scanPath);
    if (existing && Date.now() - existing.scannedAt < PROJECT_SETUP_SUMMARY_TTL_MS) continue;
    try {
      const scan = await setupBrowserService.scanProject(scanPath, {
        signal,
        summaryOnly: true
      });
      if (signal.aborted) return;
      await storage.projectSetupSummaries.upsert(
        index$1.summarizeSetupBrowserProjectScan(scanPath, scan, Date.now())
      );
      post({
        type: "project-setup-summary-progress",
        id: input.id,
        workspacePath: scanPath
      });
    } catch (error) {
      if (signal.aborted) return;
      if (evidencePins.isExpectedSqliteDiskFullError(error)) {
        post({
          type: "telemetry",
          kind: "event",
          name: "main.setup.project_summary_scan_disk_full",
          properties: { workspace_path: scanPath, project_path: project.path }
        });
        return;
      }
      post({
        type: "telemetry",
        kind: "app-error",
        name: "main.setup.project_summary_scan",
        properties: { workspace_path: scanPath, project_path: project.path },
        errorMessage: errorMessage(error)
      });
    }
  }
}
function conversationGateStore(handle) {
  const { storage } = handle;
  const db = handle.db;
  return {
    getMeta: (key) => storage.meta.get(key),
    setMeta: (key, value) => storage.meta.set(key, value),
    replaceRegistrations: (registrations) => storage.desktopReferences.replaceRegisteredConversations(registrations, Date.now()),
    listRegistrations: () => storage.desktopReferences.listRegisteredConversations(),
    listStoredSources: async () => index.listStoredConversationSources(db),
    listSourcesWithoutConversation: async () => index.listSourcesWithoutConversation(db),
    forgetSources: async (paths) => index.forgetConversationSources(db, paths)
  };
}
async function resolveEvidence(input, storage, signal) {
  const unchanged = { resolved: [], cursor: input.evidencePinCursor ?? null };
  if (signal.aborted) return unchanged;
  try {
    return await evidencePins.resolveEvidencePinRoots({
      blumeRoot: input.blumeRoot,
      sharedDirectory: input.evidencePinsDir,
      completed: input.completedEvidence ?? [],
      references: storage.desktopReferences,
      cursor: input.evidencePinCursor ?? null,
      shouldStop: () => signal.aborted
    });
  } catch (error) {
    post({
      type: "telemetry",
      kind: "app-error",
      name: "main.parser.worker_evidence_pins",
      errorMessage: errorMessage(error)
    });
    return unchanged;
  }
}
async function refresh(input, performance, signal) {
  configureRequest(input);
  const handle = getStorageHandle(input.dbPath);
  const { storage } = handle;
  const legacyRows = index.readLegacyProjectExclusions(handle.db, { workspacePaths: true })?.rows ?? [];
  const { gate, scope, registrations, changed } = await prepareConversationGate(
    {
      registeredAgents: input.registeredAgents,
      conversationSkips: input.conversationSkips,
      conversationScope: input.conversationScope ?? "blume",
      legacyRows,
      fullPass: input.targetPaths === null
    },
    conversationGateStore(handle),
    {
      now: () => Date.now(),
      yieldToEventLoop: () => new Promise((done) => setImmediate(done)),
      shouldStop: () => signal.aborted,
      onReconciled: (result) => post({
        type: "telemetry",
        kind: "event",
        name: "main.parser.worker_gate_reconciled",
        properties: {
          refresh_id: input.id,
          scope: result.scope,
          removed_conversations: result.removedConversations,
          forgotten_sources: result.forgottenSources,
          duration_ms: result.durationMs
        }
      })
    }
  );
  if (scope === "blume" && !registrations.length)
    return {
      registeredConversations: 0,
      conversationScope: scope,
      resolvedEvidence: [],
      evidencePinCursor: input.evidencePinCursor ?? null
    };
  let ingestSequence = 0;
  const meta = evidencePins.createCachedKeyValueStore(
    {
      loadAll: () => storage.meta.getAll(),
      set: (key, value) => storage.meta.set(key, value),
      delete: (key) => storage.meta.delete(key)
    },
    {
      onPersistError: ({ operation, key, error }) => {
        post({
          type: "telemetry",
          kind: "app-error",
          name: "main.parser.worker_meta",
          properties: { operation, key },
          errorMessage: errorMessage(error)
        });
      }
    }
  );
  await meta.initialize();
  const providerHost = evidencePins.createDesktopLocalProviderHost({
    getParserBinding,
    isWatcherReady: () => watcherReady,
    getKnownFiles: () => knownFiles,
    telemetry: {
      captureError: (name, error, properties) => {
        post({
          type: "telemetry",
          kind: "app-error",
          name,
          properties,
          errorMessage: errorMessage(error)
        });
      },
      captureEvent: (name, properties) => {
        post({ type: "telemetry", kind: "event", name, properties });
      }
    },
    readCursorComposerState: evidencePins.loadCursorComposerState,
    readCursorComposerRepoPath: evidencePins.loadCursorComposerRepoPath,
    cursorComposerStateMtimeMs: evidencePins.cursorStateMtimeMs
  });
  const ingestRuntime = evidencePins.createConversationIngestRuntime({
    sourceCursors: {
      getSourceCursor: (kind, path) => storage.sourceCursors.getSourceCursor(kind, path),
      upsertSourceCursor: (cursor) => storage.sourceCursors.upsertSourceCursor(cursor)
    },
    conversations: {
      getSkippedConversation: (ref) => storage.desktopConversations.getSkippedConversation(ref),
      applySkippedConversationUpdate: (update) => storage.desktopConversations.applySkippedConversationUpdate(update),
      replaceConversation: (replacement) => storage.desktopConversations.replaceConversation(replacement)
    },
    isSelfRunPath: (path) => isSelfRunPath(input, path),
    applyDeferredOverrides: (ref) => evidencePins.applyDeferredLegacyConversationOverrides(ref, {
      meta: storage.meta,
      storage: {
        applyLegacyConversationOverrides: (overrides) => storage.desktopConversations.applyLegacyConversationOverrides(overrides)
      }
    }),
    now: () => Date.now()
  });
  const observedWorkspaceIdentity = createObservedWorkspaceIdentityService({
    projects: storage.projects,
    resolvePath: pn.resolve,
    isDirectory: async (path) => (await promises.stat(path)).isDirectory(),
    probe: probe_node.probeGitIdentity,
    shouldIgnore: (path) => signal.aborted || isSelfRunPath(input, path),
    captureError: (error, { workspacePath }) => {
      post({
        type: "telemetry",
        kind: "app-error",
        name: "main.parser.worker_project_workspace",
        properties: { workspace_path: workspacePath },
        errorMessage: errorMessage(error)
      });
    }
  });
  let oldestSourceMs = null;
  const refreshService = evidencePins.createConversationRefreshService({
    providers: providerHost.providers,
    allowSource: gate.allowSource,
    sourceCursors: {
      listSourceCursors: () => storage.sourceCursors.listSourceCursors(),
      resetSourceCursorsForKind: (kind) => storage.sourceCursors.resetSourceCursorsForKind(kind),
      upsertSourceCursor: (cursor) => storage.sourceCursors.upsertSourceCursor(cursor)
    },
    ...typeof input.activityCutoffMs === "number" ? { activityCutoffMs: () => input.activityCutoffMs } : {},
    // A changed gate re-checks the whole window, never a history step's slice.
    mtimeBeforeMs: () => changed ? null : input.mtimeBeforeMs ?? null,
    mtimeAfterMs: () => changed ? null : input.mtimeAfterMs ?? null,
    onOldestSource: (oldestMtimeMs) => {
      oldestSourceMs = oldestMtimeMs;
    },
    isStoredConversation: async (ref) => await storage.desktopConversations.getConversationByRef(ref) !== null,
    conversations: {
      deleteConversationsBySourcePaths: (paths) => storage.desktopConversations.deleteConversationsBySourcePaths(paths),
      markStaleConversationsInactive: (cutoffMs) => storage.desktopConversations.markStaleConversationsInactive(cutoffMs)
    },
    isSelfRunPath: (path) => isSelfRunPath(input, path),
    ingestConversation: async (parsed) => {
      const seq = ingestSequence++;
      const startedAtMs = Date.now();
      let ok = false;
      let ingestError;
      try {
        if (await legacyExclusions.legacyExclusionExcludesConversation(
          {
            size: gate.exclusions,
            excludes: (workspace) => gate.excludesConversation(parsed.conv.source, parsed.sourcePath, workspace)
          },
          parsed.conv,
          (candidate) => observedWorkspaceIdentity.identifyWorkspace(candidate)
        )) {
          const version = evidencePins.sourceVersionFromParsed(parsed);
          await storage.sourceCursors.upsertSourceCursor({
            kind: parsed.conv.source,
            path: parsed.sourcePath,
            lastMtimeMs: version.sourceMtimeMs,
            lastSize: version.sourceSize ?? null,
            lastCursor: version.sourceCursor,
            lastFetchedAt: Date.now()
          });
          performance.parsed += 1;
          ok = true;
          return { conversationId: -1, skipped: true, sourceRecorded: true };
        }
        const canonicalParsed = await observedWorkspaceIdentity.canonicalizeConversation(parsed);
        const result = await ingestRuntime.ingestConversation(canonicalParsed);
        performance.parsed += 1;
        if (result && !result.skipped) performance.stored = (performance.stored ?? 0) + 1;
        ok = true;
        return result;
      } catch (error) {
        ingestError = errorMessage(error);
        throw error;
      } finally {
        const ingestMs = Date.now() - startedAtMs;
        performance.maxIngestMs = Math.max(performance.maxIngestMs, ingestMs);
        post({
          type: "refresh-progress",
          id: input.id,
          seq,
          sourcePath: parsed.sourcePath,
          ref: parsed.conv.ref,
          ingestMs,
          ok,
          errorMessage: ingestError
        });
      }
    },
    getMeta: meta.get,
    setMeta: meta.set,
    captureError: (name, error, context) => {
      post({
        type: "telemetry",
        kind: "app-error",
        name,
        properties: { ...context ?? {} },
        errorMessage: errorMessage(error)
      });
    },
    onIngestError: (error, context) => {
      post({
        type: "telemetry",
        kind: "app-error",
        name: "main.parser.worker_ingest",
        properties: context,
        errorMessage: errorMessage(error)
      });
    },
    track: async (_name, fn) => fn(),
    now: () => Date.now()
  });
  activeRefreshService = refreshService;
  const requestRefreshStop = () => refreshService.requestStop();
  signal.addEventListener("abort", requestRefreshStop, { once: true });
  if (signal.aborted) requestRefreshStop();
  let refreshError;
  try {
    await refreshService.refreshFromDisk(
      changed ? Math.max(
        input.maxAgeMs,
        typeof input.activityCutoffMs === "number" ? Date.now() - input.activityCutoffMs : evidencePins.CONVERSATION_WEEK_MS
      ) : input.maxAgeMs,
      {
        targetPaths: input.targetPaths ?? void 0
      }
    );
  } catch (error) {
    refreshError = error;
  } finally {
    signal.removeEventListener("abort", requestRefreshStop);
    if (activeRefreshService === refreshService) activeRefreshService = null;
  }
  await refreshRecentProjectSetupSummaries(input, storage, signal);
  if (refreshError) throw refreshError;
  const evidence = await resolveEvidence(input, storage, signal);
  return {
    registeredConversations: registrations.length,
    conversationScope: scope,
    oldestSourceMs,
    resolvedEvidence: evidence.resolved,
    evidencePinCursor: evidence.cursor
  };
}
async function locateConversationEvidence(input) {
  try {
    const { storage } = getStorageHandle(input.dbPath);
    const location = await evidencePins.locateEvidence(storage.desktopReferences, input.request);
    post({ type: "evidence-location-result", id: input.id, ok: true, location });
  } catch (error) {
    post({
      type: "evidence-location-result",
      id: input.id,
      ok: false,
      errorMessage: errorMessage(error)
    });
  }
}
async function listRecentProjects(input) {
  try {
    const { storage } = getStorageHandle(input.dbPath);
    const limit = evidencePins.recentProjectRowLimit(input.limit);
    const rows = await storage.desktopProjects.listRecentProjects(limit);
    const projects = await evidencePins.withProjectSetupSummaries(storage, rows);
    post({ type: "recent-projects-result", id: input.id, ok: true, projects });
  } catch (error) {
    post({
      type: "recent-projects-result",
      id: input.id,
      ok: false,
      errorMessage: errorMessage(error)
    });
  }
}
async function loadMenuBarSnapshot(input) {
  try {
    const { storage } = getStorageHandle(input.dbPath);
    const projection = await evidencePins.loadMenuBarConversationProjection(
      storage.desktopConversations,
      input.nowMs
    );
    post({ type: "menu-bar-snapshot-result", id: input.id, ok: true, projection });
  } catch (error) {
    post(serializeMenuBarSnapshotError(input.id, error));
  }
}
async function handleMessage(message) {
  if (message.type === "stop") {
    activeRefreshService?.requestStop();
    activeRequestAbortController?.abort();
    return;
  }
  if (message.type === "menu-bar-snapshot") {
    await loadMenuBarSnapshot(message);
    return;
  }
  if (message.type === "evidence-location") {
    await locateConversationEvidence(message);
    return;
  }
  if (message.type === "recent-projects") {
    await listRecentProjects(message);
    return;
  }
  const performance = {
    parsed: 0,
    stored: 0,
    maxIngestMs: 0,
    durationMs: 0
  };
  if (activeRefreshId !== null) {
    post(
      serializeError(
        message.id,
        new Error("conversation refresh worker already has a refresh in flight"),
        performance
      )
    );
    return;
  }
  activeRefreshId = message.id;
  const requestAbortController = new AbortController();
  activeRequestAbortController = requestAbortController;
  const startedAtMs = Date.now();
  const heartbeat = setInterval(() => {
    post({ type: "heartbeat", id: message.id });
  }, CONVERSATION_REFRESH_WORKER_HEARTBEAT_INTERVAL_MS);
  try {
    const outcome = await refresh(message, performance, requestAbortController.signal);
    performance.durationMs = Date.now() - startedAtMs;
    post({ type: "refresh-result", id: message.id, ok: true, ...performance, ...outcome });
  } catch (err) {
    performance.durationMs = Date.now() - startedAtMs;
    post(serializeError(message.id, err, performance));
  } finally {
    clearInterval(heartbeat);
    if (activeRequestAbortController === requestAbortController) {
      activeRequestAbortController = null;
    }
    activeRefreshId = null;
  }
}
parentPort?.on("message", (event) => {
  void handleMessage(event.data);
});
exports.CONVERSATION_REFRESH_WORKER_HEARTBEAT_INTERVAL_MS = CONVERSATION_REFRESH_WORKER_HEARTBEAT_INTERVAL_MS;
//# sourceMappingURL=refreshWorker.js.map

//# debugId=a8bfab2e-f19c-5de8-9576-7f9142923212
