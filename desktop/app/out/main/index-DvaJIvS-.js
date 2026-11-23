"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7c56dbd3-5297-53c2-b48f-22b264a75d40")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const insights$1 = require("./insights-CJUxz2Be.js");
const deliveryBriefs = require("./deliveryBriefs-CbTihYeZ.js");
const index = require("./index-UFoqNX7c.js");
const identity = require("./identity-C50QOXIb.js");
const desktopSearch = require("./desktopSearch-UUzZxN96.js");
const repositoryKey = require("./repositoryKey-CSvrvo7G.js");
require("./hash-DCMQIns_.js");
const LEGACY_CREATOR_AGENT_VERSION_ID$1 = "legacy-3-step-workflow";
function isRow$6(value) {
  return typeof value === "object" && value !== null;
}
function int$4(value) {
  if (typeof value === "number" && Number.isSafeInteger(value)) return value;
  if (typeof value === "bigint") return Number(value);
  return null;
}
function preferredNumericId(id) {
  const value = Number(id);
  return Number.isSafeInteger(value) && value > 0 ? value : null;
}
function tableExists$2(db, table) {
  return isRow$6(
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(table)
  );
}
function initializeCompatibilityTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS storage_compatibility_ids (
      domain TEXT NOT NULL,
      shared_id TEXT NOT NULL,
      legacy_id INTEGER NOT NULL,
      natural_key TEXT,
      PRIMARY KEY (domain, shared_id)
    );
    CREATE INDEX IF NOT EXISTS idx_storage_compatibility_ids_legacy
      ON storage_compatibility_ids (domain, legacy_id);
    CREATE TABLE IF NOT EXISTS storage_compatibility_projects (
      legacy_id INTEGER PRIMARY KEY,
      kind TEXT NOT NULL,
      git_common_dir TEXT
    );
    CREATE TABLE IF NOT EXISTS storage_compatibility_suggestions (
      legacy_id INTEGER PRIMARY KEY,
      change_json TEXT,
      evidence_count INTEGER NOT NULL DEFAULT 0
    );
  `);
}
function mappedLegacyId(db, domain, sharedId) {
  if (!tableExists$2(db, "storage_compatibility_ids")) return preferredNumericId(sharedId);
  const row = db.prepare("SELECT legacy_id FROM storage_compatibility_ids WHERE domain = ? AND shared_id = ?").get(domain, sharedId);
  return isRow$6(row) ? int$4(row.legacy_id) : null;
}
function sharedIdForLegacy(db, domain, legacyId) {
  if (!tableExists$2(db, "storage_compatibility_ids")) return String(legacyId);
  const row = db.prepare(
    `SELECT shared_id FROM storage_compatibility_ids
     WHERE domain = ? AND legacy_id = ? ORDER BY rowid LIMIT 1`
  ).get(domain, legacyId);
  return isRow$6(row) && typeof row.shared_id === "string" ? row.shared_id : String(legacyId);
}
function rememberId(db, domain, sharedId, legacyId, naturalKey) {
  db.prepare(
    `INSERT INTO storage_compatibility_ids (domain, shared_id, legacy_id, natural_key)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(domain, shared_id) DO UPDATE SET
       legacy_id = excluded.legacy_id,
       natural_key = excluded.natural_key`
  ).run(domain, sharedId, legacyId, naturalKey ?? null);
}
function resolvedLegacyId(db, domain, sharedId) {
  return mappedLegacyId(db, domain, sharedId) ?? preferredNumericId(sharedId);
}
function pathName(path) {
  const normalized = path.replace(/[\\/]+$/, "");
  return normalized.split(/[\\/]/).at(-1) || normalized;
}
function projectFromDesktop(db, row) {
  const id = sharedIdForLegacy(db, "project", row.id);
  const metadata = db.prepare("SELECT kind, git_common_dir FROM storage_compatibility_projects WHERE legacy_id = ?").get(row.id);
  if (row.git_remote || isRow$6(metadata) && metadata.kind === "git") {
    return {
      kind: "git",
      id,
      repoRoot: row.path,
      gitCommonDir: isRow$6(metadata) && typeof metadata.git_common_dir === "string" ? metadata.git_common_dir : `${row.path}/.git`,
      ...row.git_remote ? { canonicalRemote: row.git_remote } : {}
    };
  }
  return { kind: "folder", id, root: row.path };
}
function listDesktopProjectPathResolutionCandidates(db, targetPath) {
  const target = insights$1.normalizeProjectResolutionPath(targetPath);
  if (!target) return [];
  const project = db.prepare(
    `SELECT id, path
       FROM projects
       WHERE ? = path
          OR (
            SUBSTR(path, LENGTH(path), 1) = '/'
            AND SUBSTR(?, 1, LENGTH(path)) = path
          )
          OR (
            SUBSTR(path, LENGTH(path), 1) <> '/'
            AND SUBSTR(?, 1, LENGTH(path) + 1) = path || '/'
          )
       ORDER BY LENGTH(path) DESC
       LIMIT 1`
  ).get(target, target, target);
  const workspace = db.prepare(
    `SELECT id, project_id, path
       FROM workspace_locations
       WHERE ? = path
          OR (
            SUBSTR(path, LENGTH(path), 1) = '/'
            AND SUBSTR(?, 1, LENGTH(path)) = path
          )
          OR (
            SUBSTR(path, LENGTH(path), 1) <> '/'
            AND SUBSTR(?, 1, LENGTH(path) + 1) = path || '/'
          )
       ORDER BY LENGTH(path) DESC
       LIMIT 1`
  ).get(target, target, target);
  return [
    ...isRow$6(project) && int$4(project.id) !== null && typeof project.path === "string" ? [
      {
        projectId: sharedIdForLegacy(db, "project", int$4(project.id)),
        path: project.path
      }
    ] : [],
    ...isRow$6(workspace) && typeof workspace.id === "string" && typeof workspace.project_id === "string" && typeof workspace.path === "string" ? [
      {
        projectId: workspace.project_id,
        workspaceLocationId: workspace.id,
        path: workspace.path
      }
    ] : []
  ];
}
function conversationFromDesktop(db, row) {
  const workspace = row.workspace === null ? null : db.prepare("SELECT id FROM workspace_locations WHERE path = ? ORDER BY rowid LIMIT 1").get(row.workspace);
  return {
    id: sharedIdForLegacy(db, "conversation", row.id),
    ref: row.ref,
    harnessId: row.source,
    projectId: row.project_id === null ? null : sharedIdForLegacy(db, "project", row.project_id),
    workspaceLocationId: isRow$6(workspace) && typeof workspace.id === "string" ? workspace.id : null,
    title: row.title,
    preview: row.preview,
    state: row.state,
    failureReason: row.failure_reason,
    ...row.started_at === null ? {} : { startedAt: row.started_at },
    lastActivityTs: row.last_activity_ts
  };
}
function parseJson(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
function suggestionFromDesktop(db, row) {
  const evidence = parseJson(row.evidence_json);
  const metadata = tableExists$2(db, "storage_compatibility_suggestions") ? db.prepare(
    "SELECT change_json, evidence_count FROM storage_compatibility_suggestions WHERE legacy_id = ?"
  ).get(row.id) : null;
  const clusterRows = tableExists$2(db, "suggestion_clusters") ? db.prepare(
    "SELECT cluster_id FROM suggestion_clusters WHERE suggestion_id = ? ORDER BY cluster_id"
  ).all(row.id) : [{ cluster_id: row.cluster_id }];
  const clusterIds = clusterRows.flatMap(
    (clusterRow) => isRow$6(clusterRow) && int$4(clusterRow.cluster_id) !== null ? [String(int$4(clusterRow.cluster_id))] : []
  );
  return {
    id: sharedIdForLegacy(db, "suggestion", row.id),
    clusterId: String(row.cluster_id),
    clusterIds,
    creatorAgentVersionId: row.creator_agent_version_id ?? LEGACY_CREATOR_AGENT_VERSION_ID$1,
    title: row.title,
    summary: row.summary,
    status: row.status,
    evidenceCount: isRow$6(metadata) && int$4(metadata.evidence_count) !== null ? int$4(metadata.evidence_count) : Array.isArray(evidence) ? evidence.length : 0,
    change: isRow$6(metadata) && typeof metadata.change_json === "string" ? parseJson(metadata.change_json) : null,
    operations: parseJson(row.operations_json),
    evidence,
    applyResult: parseJson(row.apply_result_json),
    snoozedUntil: row.snoozed_until,
    hiddenAt: row.hidden_at,
    hiddenReason: row.hidden_reason,
    hiddenUntil: row.hidden_until,
    lastShownAt: row.last_shown_at,
    shownCount: row.shown_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
function signalFromDesktop(db, row) {
  return {
    ...row,
    run_id: sharedIdForLegacy(db, "run", row.run_id),
    conversation_id: sharedIdForLegacy(db, "conversation", row.conversation_id)
  };
}
function signalsFromDesktop(db, rows2) {
  if (!rows2.length) return [];
  const aliases = /* @__PURE__ */ new Map();
  if (tableExists$2(db, "storage_compatibility_ids")) {
    for (const [domain, field] of [
      ["run", "run_id"],
      ["conversation", "conversation_id"]
    ]) {
      const ids = [...new Set(rows2.map((row) => row[field]))];
      const mapped = db.prepare(
        `
        SELECT legacy_id, shared_id FROM (
          SELECT legacy_id, shared_id,
            ROW_NUMBER() OVER (PARTITION BY legacy_id ORDER BY rowid) AS ordinal
          FROM storage_compatibility_ids
          WHERE domain = ? AND legacy_id IN (SELECT value FROM json_each(?))
        ) WHERE ordinal = 1
      `
      ).all(domain, JSON.stringify(ids));
      for (const row of mapped) {
        if (isRow$6(row) && typeof row.shared_id === "string")
          aliases.set(`${domain}:${row.legacy_id}`, row.shared_id);
      }
    }
  }
  return rows2.map((row) => ({
    ...row,
    run_id: aliases.get(`run:${row.run_id}`) ?? String(row.run_id),
    conversation_id: aliases.get(`conversation:${row.conversation_id}`) ?? String(row.conversation_id)
  }));
}
function clusterFromDesktop(row) {
  return row;
}
function creatorMatches(row, scope) {
  return !scope || (row.creator_agent_version_id ?? LEGACY_CREATOR_AGENT_VERSION_ID$1) === scope;
}
function ensureConversationProject(db, sharedProjectId, workspacePath) {
  const compatibilityId = sharedProjectId ?? "__unassigned__";
  let legacyId = resolvedLegacyId(db, "project", compatibilityId);
  let row = legacyId === null ? null : db.prepare("SELECT * FROM projects WHERE id = ?").get(legacyId);
  if (!isRow$6(row)) {
    const path = workspacePath ?? `blume-compat://project/${encodeURIComponent(compatibilityId)}`;
    const byPath = db.prepare("SELECT * FROM projects WHERE path = ?").get(path);
    if (isRow$6(byPath)) {
      row = byPath;
      legacyId = int$4(byPath.id);
    } else {
      const preferredId = preferredNumericId(compatibilityId);
      const now = Date.now();
      const result = preferredId === null ? db.prepare(
        `INSERT INTO projects (path, name, display_path, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?)`
      ).run(path, pathName(path), path, now, now) : db.prepare(
        `INSERT INTO projects (id, path, name, display_path, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?)`
      ).run(preferredId, path, pathName(path), path, now, now);
      legacyId = int$4(isRow$6(result) ? result.lastInsertRowid : null);
      row = legacyId === null ? null : db.prepare("SELECT * FROM projects WHERE id = ?").get(legacyId);
    }
  }
  if (!isRow$6(row) || legacyId === null) throw new Error("Canonical project resolution failed");
  rememberId(
    db,
    "project",
    compatibilityId,
    legacyId,
    typeof row.path === "string" ? row.path : void 0
  );
  return row;
}
function workspaceForConversation(db, workspaceLocationId) {
  if (!workspaceLocationId) return { path: null, kind: null };
  const row = db.prepare("SELECT path, kind FROM workspace_locations WHERE id = ?").get(workspaceLocationId);
  return isRow$6(row) ? {
    path: typeof row.path === "string" ? row.path : null,
    kind: typeof row.kind === "string" ? row.kind : null
  } : { path: null, kind: null };
}
async function upsertCanonicalConversations(db, desktop, batch) {
  for (const summary of batch.conversations) {
    const workspace = workspaceForConversation(db, summary.workspaceLocationId);
    const project = ensureConversationProject(db, summary.projectId, workspace.path);
    const transcript = batch.transcripts?.find(
      (candidate) => candidate.conversationId === summary.id
    );
    const turnPositionById = new Map(
      transcript?.userTurns.map((turn) => [turn.id, turn.position]) ?? []
    );
    const resultEventByToolId = new Map(
      transcript?.events.flatMap(
        (event) => event.tool_call_id === null ? [] : [[event.tool_call_id, event.id]]
      ) ?? []
    );
    const existingByRef = db.prepare("SELECT id FROM conversations WHERE ref = ?").get(summary.ref);
    const mappedId = mappedLegacyId(db, "conversation", summary.id);
    const preferredId = mappedId ?? preferredNumericId(summary.id);
    let legacyId = isRow$6(existingByRef) ? int$4(existingByRef.id) : null;
    if (legacyId === null && preferredId !== null) {
      const existingById = db.prepare("SELECT id, ref FROM conversations WHERE id = ?").get(preferredId);
      if (isRow$6(existingById)) {
        legacyId = int$4(existingById.id);
        if (legacyId !== null && existingById.ref !== summary.ref) {
          db.prepare("UPDATE conversations SET ref = ? WHERE id = ?").run(summary.ref, legacyId);
        }
      } else {
        db.prepare(
          `INSERT INTO conversations (
             id, ref, source, project_id, title, preview, state, failure_reason,
             last_activity_ts, ingested_at, created_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(
          preferredId,
          summary.ref,
          summary.harnessId,
          project.id,
          summary.title,
          summary.preview,
          summary.state,
          summary.failureReason ?? null,
          summary.lastActivityTs,
          summary.lastActivityTs,
          summary.lastActivityTs
        );
        legacyId = preferredId;
      }
    }
    if (legacyId !== null && !transcript) {
      db.prepare(
        `UPDATE conversations SET
           ref = ?, source = ?, external_id = ?, project_id = ?, workspace = ?,
           workspace_kind = ?, cwd = ?, title = ?, preview = ?, state = ?,
           failure_reason = ?, last_activity_ts = ?, ingested_at = ?
         WHERE id = ?`
      ).run(
        summary.ref,
        summary.harnessId,
        summary.id,
        summary.projectId === null ? null : project.id,
        workspace.path,
        workspace.kind,
        workspace.path,
        summary.title,
        summary.preview,
        summary.state,
        summary.failureReason ?? null,
        summary.lastActivityTs,
        Date.now(),
        legacyId
      );
      rememberId(db, "conversation", summary.id, legacyId, summary.ref);
      continue;
    }
    const replaced = await desktop.replaceConversation({
      project: {
        path: project.path,
        name: project.name,
        displayPath: project.display_path,
        gitRemote: project.git_remote
      },
      sourceCursor: {
        kind: summary.harnessId,
        path: `blume-compat://${summary.ref}`,
        lastFetchedAt: summary.lastActivityTs
      },
      conversation: {
        ref: summary.ref,
        source: summary.harnessId,
        externalId: summary.id,
        workspace: workspace.path,
        workspaceKind: workspace.kind,
        cwd: workspace.path,
        title: summary.title,
        preview: summary.preview,
        state: summary.state,
        failureReason: summary.failureReason ?? null,
        lastActivityTs: summary.lastActivityTs,
        latestUserTurnPosition: transcript?.userTurns.at(-1)?.position ?? null
      },
      userTurns: transcript?.userTurns.map((turn) => ({
        position: turn.position,
        prompt: turn.prompt,
        state: turn.state,
        startedAt: turn.started_at,
        endedAt: turn.ended_at
      })) ?? [],
      events: transcript?.events.flatMap((event) => {
        const userTurnPosition = turnPositionById.get(event.user_turn_id);
        return userTurnPosition === void 0 ? [] : [
          {
            userTurnPosition,
            sourcePosition: event.id,
            position: event.position,
            kind: event.kind,
            text: event.text,
            timestampMs: event.timestamp_ms
          }
        ];
      }) ?? [],
      toolCalls: transcript?.toolCalls.map((toolCall) => ({
        toolUseId: toolCall.tool_use_id,
        sourceEventPosition: toolCall.event_id,
        resultEventPosition: resultEventByToolId.get(toolCall.id) ?? null,
        name: toolCall.name,
        input: parseJson(toolCall.input_json),
        resultText: toolCall.result_text,
        isError: toolCall.is_error === 1,
        startedAtMs: toolCall.started_at_ms,
        endedAtMs: toolCall.ended_at_ms
      })) ?? [],
      todoLists: transcript?.todoLists.flatMap(({ list, todos }) => {
        const userTurnPosition = turnPositionById.get(list.user_turn_id);
        return userTurnPosition === void 0 ? [] : [
          {
            userTurnPosition,
            sourceEventPosition: list.source_event_id,
            source: list.source,
            isInferred: list.is_inferred === 1,
            todos: todos.map((todo) => ({
              position: todo.position,
              content: todo.content,
              state: todo.state
            }))
          }
        ];
      }) ?? []
    });
    legacyId = replaced.conversationId;
    if (summary.projectId === null) {
      db.prepare("UPDATE conversations SET project_id = NULL WHERE id = ?").run(legacyId);
    }
    rememberId(db, "conversation", summary.id, legacyId, summary.ref);
  }
}
function createDesktopProjectCompatibilityStore(db, desktop, shared) {
  initializeCompatibilityTables(db);
  return {
    async upsertProject(project) {
      const path = project.kind === "git" ? project.repoRoot : project.root;
      const name = identity.projectDisplayName(project);
      const natural = db.prepare("SELECT id FROM projects WHERE path = ?").get(path);
      const mappedId = mappedLegacyId(db, "project", project.id);
      const preferredId = mappedId ?? preferredNumericId(project.id);
      const preferred = preferredId === null ? null : db.prepare("SELECT id FROM projects WHERE id = ?").get(preferredId);
      let legacyId = isRow$6(natural) ? int$4(natural.id) : null;
      if (legacyId === null && isRow$6(preferred)) legacyId = int$4(preferred.id);
      const now = Date.now();
      if (legacyId === null) {
        const result = preferredId === null ? db.prepare(
          `INSERT INTO projects (path, name, git_remote, display_path, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?)`
        ).run(
          path,
          name,
          project.kind === "git" ? project.canonicalRemote ?? null : null,
          path,
          now,
          now
        ) : db.prepare(
          `INSERT INTO projects (id, path, name, git_remote, display_path, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).run(
          preferredId,
          path,
          name,
          project.kind === "git" ? project.canonicalRemote ?? null : null,
          path,
          now,
          now
        );
        legacyId = int$4(isRow$6(result) ? result.lastInsertRowid : null);
      } else {
        db.prepare(
          `UPDATE projects SET path = ?, name = ?, git_remote = ?, display_path = ?
           WHERE id = ?`
        ).run(
          path,
          name,
          project.kind === "git" ? project.canonicalRemote ?? null : null,
          path,
          legacyId
        );
      }
      if (legacyId === null)
        throw new Error("Canonical desktop project could not be resolved after upsert");
      rememberId(db, "project", project.id, legacyId, path);
      db.prepare(
        `INSERT INTO storage_compatibility_projects (legacy_id, kind, git_common_dir)
         VALUES (?, ?, ?)
         ON CONFLICT(legacy_id) DO UPDATE SET
           kind = excluded.kind,
           git_common_dir = excluded.git_common_dir`
      ).run(legacyId, project.kind, project.kind === "git" ? project.gitCommonDir : null);
    },
    async getProject(id) {
      const legacyId = resolvedLegacyId(db, "project", id);
      if (legacyId === null) return null;
      const row = await desktop.getProject(legacyId);
      return row ? projectFromDesktop(db, row) : null;
    },
    async listProjects() {
      return (await desktop.listProjects()).map((row) => projectFromDesktop(db, row));
    },
    async listProjectsByRoots(roots) {
      return (await desktop.listProjectsByPaths(roots)).map((row) => projectFromDesktop(db, row));
    },
    async listPathResolutionCandidates(targetPath) {
      return listDesktopProjectPathResolutionCandidates(db, targetPath);
    },
    upsertWorkspaceLocation: shared.upsertWorkspaceLocation.bind(shared),
    listWorkspaceLocations: shared.listWorkspaceLocations.bind(shared),
    listWorkspaceLocationsForProjects: shared.listWorkspaceLocationsForProjects.bind(shared)
  };
}
function createDesktopConversationCompatibilityStore(db, desktop) {
  initializeCompatibilityTables(db);
  return {
    async latestActivityByProject(projectIds) {
      const latest = {};
      for (const projectId of projectIds) {
        const legacyProjectId = resolvedLegacyId(db, "project", projectId);
        if (legacyProjectId === null) continue;
        const [row] = await desktop.listConversations({ projectId: legacyProjectId, limit: 1 });
        if (row) latest[projectId] = row.last_activity_ts;
      }
      return latest;
    },
    async listProjectConversations(projectId) {
      const legacyProjectId = resolvedLegacyId(db, "project", projectId);
      if (legacyProjectId === null) return [];
      return (await desktop.listConversations({
        projectId: legacyProjectId
      })).map((row) => conversationFromDesktop(db, row));
    },
    async getConversation(id) {
      const legacyId = resolvedLegacyId(db, "conversation", id);
      if (legacyId === null) return null;
      const row = await desktop.getConversationById(legacyId);
      return row ? conversationFromDesktop(db, row) : null;
    },
    async getConversationByRef(ref) {
      const row = await desktop.getConversationByRef(ref);
      return row ? conversationFromDesktop(db, row) : null;
    },
    async getConversationTranscript(id, options) {
      const legacyId = resolvedLegacyId(db, "conversation", id);
      if (legacyId === null) return null;
      const conversation = await desktop.getConversationById(legacyId);
      if (!conversation) return null;
      const transcript = await desktop.getConversationTranscriptByRef(conversation.ref, options);
      return transcript ? { ...transcript, conversation: conversationFromDesktop(db, transcript.conversation) } : null;
    },
    async searchConversationTranscript(id, query, beforeTurnPosition) {
      const legacyId = resolvedLegacyId(db, "conversation", id);
      if (legacyId === null) {
        return { matches: [], nextBeforeTurnPosition: null, done: true };
      }
      const conversation = await desktop.getConversationById(legacyId);
      return conversation ? desktop.searchConversationTranscriptByRef(conversation.ref, query, beforeTurnPosition) : { matches: [], nextBeforeTurnPosition: null, done: true };
    },
    async markConversationIdle(id) {
      const legacyId = resolvedLegacyId(db, "conversation", id);
      if (legacyId === null) return;
      const conversation = await desktop.getConversationById(legacyId);
      if (conversation) await desktop.markConversationIdle(conversation.ref);
    },
    async dismissConversation(id, dismissedAt) {
      const legacyId = resolvedLegacyId(db, "conversation", id);
      if (legacyId === null) return;
      const conversation = await desktop.getConversationById(legacyId);
      if (conversation) await desktop.dismissConversation(conversation.ref, dismissedAt);
    },
    async upsertConversationIngest(batch) {
      await upsertCanonicalConversations(db, desktop, batch);
    }
  };
}
function createDesktopImproveCompatibilityStore(db, desktop, options, runtime = {}) {
  const namespaceScope = (creatorAgentVersionId) => creatorAgentVersionId ?? options.improveNamespace();
  if (runtime.initializeCompatibilityTables !== false) initializeCompatibilityTables(db);
  const suggestionColumns = new Set(
    db.prepare("PRAGMA table_info('suggestions')").all().flatMap((row) => isRow$6(row) && typeof row.name === "string" ? [row.name] : [])
  );
  const hasSuggestionDisplayState = suggestionColumns.has("hidden_at");
  const hasSuggestionCreator = suggestionColumns.has("creator_agent_version_id");
  const hasSuggestionFeedbackReasons = suggestionColumns.has("feedback_reasons_json");
  return {
    async listImproveSuggestions(filter) {
      const now = Date.now();
      const rows2 = filter?.status === void 0 ? [
        ...await desktop.listVisibleSuggestions(now),
        ...await desktop.listResolvedSuggestions(now)
      ] : [
        ...await desktop.listVisibleSuggestions(now),
        ...await desktop.listResolvedSuggestions(now)
      ].filter((row) => row.status === filter.status);
      return rows2.map((row) => suggestionFromDesktop(db, row));
    },
    async upsertSuggestion(suggestion) {
      const clusterIds = [.../* @__PURE__ */ new Set([...suggestion.clusterIds ?? [], suggestion.clusterId])].map(
        (clusterId) => {
          const id = preferredNumericId(clusterId);
          if (id === null)
            throw new Error(`Canonical signal cluster not found for shared id ${clusterId}`);
          return id;
        }
      );
      const primaryClusterId = clusterIds[0];
      if (primaryClusterId === void 0)
        throw new Error("Suggestion requires a canonical signal cluster");
      let legacyId = resolvedLegacyId(db, "suggestion", suggestion.id);
      let existing = legacyId === null ? null : await desktop.getSuggestion(legacyId);
      if (!existing) {
        const preferredId = preferredNumericId(suggestion.id);
        if (preferredId !== null && !db.prepare("SELECT id FROM suggestions WHERE id = ?").get(preferredId)) {
          const columns = [
            "id",
            "schema_version",
            "cluster_id",
            "title",
            "summary",
            "operations_json",
            "evidence_json",
            "status",
            "snoozed_until",
            "apply_result_json",
            "created_at",
            "updated_at"
          ];
          const values = [
            preferredId,
            1,
            primaryClusterId,
            suggestion.title,
            suggestion.summary,
            JSON.stringify(suggestion.operations ?? null),
            JSON.stringify(suggestion.evidence ?? null),
            suggestion.status,
            suggestion.snoozedUntil ?? null,
            JSON.stringify(suggestion.applyResult ?? null),
            suggestion.createdAt,
            suggestion.updatedAt
          ];
          if (hasSuggestionCreator) {
            columns.push("creator_agent_version_id");
            values.push(namespaceScope(suggestion.creatorAgentVersionId));
          }
          if (hasSuggestionFeedbackReasons) {
            columns.push("feedback_reasons_json");
            values.push(JSON.stringify(suggestion.feedbackReasons ?? null));
          }
          db.prepare(
            `INSERT INTO suggestions (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`
          ).run(...values);
          legacyId = preferredId;
          existing = await desktop.getSuggestion(preferredId);
        } else {
          existing = await desktop.insertSuggestion({
            clusterId: primaryClusterId,
            clusterIds,
            creatorAgentVersionId: suggestion.creatorAgentVersionId,
            title: suggestion.title,
            summary: suggestion.summary,
            feedbackReasons: suggestion.feedbackReasons ?? void 0,
            operationsJson: JSON.stringify(suggestion.operations ?? null),
            evidenceJson: JSON.stringify(suggestion.evidence ?? null),
            status: suggestion.status
          });
          legacyId = existing.id;
        }
      }
      if (legacyId === null || !existing)
        throw new Error("Canonical suggestion could not be resolved");
      await desktop.updateSuggestion(legacyId, {
        status: suggestion.status,
        snoozedUntil: suggestion.snoozedUntil ?? null,
        applyResultJson: JSON.stringify(suggestion.applyResult ?? null),
        title: suggestion.title,
        summary: suggestion.summary,
        feedbackReasonsJson: JSON.stringify(suggestion.feedbackReasons ?? null),
        operationsJson: JSON.stringify(suggestion.operations ?? null),
        evidenceJson: JSON.stringify(suggestion.evidence ?? null),
        clusterIds
      });
      const displaySets = hasSuggestionDisplayState ? `, hidden_at = ?, hidden_reason = ?, hidden_until = ?, last_shown_at = ?, shown_count = ?` : "";
      db.prepare(
        `UPDATE suggestions SET created_at = ?, updated_at = ?${displaySets} WHERE id = ?`
      ).run(
        suggestion.createdAt,
        suggestion.updatedAt,
        ...hasSuggestionDisplayState ? [
          suggestion.hiddenAt ?? null,
          suggestion.hiddenReason ?? null,
          suggestion.hiddenUntil ?? null,
          suggestion.lastShownAt ?? null,
          suggestion.shownCount ?? 0
        ] : [],
        legacyId
      );
      if (hasSuggestionCreator) {
        db.prepare("UPDATE suggestions SET creator_agent_version_id = ? WHERE id = ?").run(
          namespaceScope(suggestion.creatorAgentVersionId),
          legacyId
        );
      }
      db.prepare(
        `INSERT INTO storage_compatibility_suggestions (legacy_id, change_json, evidence_count)
         VALUES (?, ?, ?)
         ON CONFLICT(legacy_id) DO UPDATE SET
           change_json = excluded.change_json,
           evidence_count = excluded.evidence_count`
      ).run(legacyId, JSON.stringify(suggestion.change ?? null), suggestion.evidenceCount);
      rememberId(db, "suggestion", suggestion.id, legacyId);
    },
    async recordRun(run) {
      const conversationId = resolvedLegacyId(db, "conversation", run.conversationId) ?? int$4(
        db.prepare("SELECT id FROM conversations WHERE ref = ? OR external_id = ? LIMIT 1").get(run.conversationId, run.conversationId)?.id
      );
      if (conversationId === null) {
        throw new Error(`Canonical conversation not found for improve run ${run.id}`);
      }
      let legacyId = resolvedLegacyId(db, "run", run.id);
      const existing = legacyId === null ? null : db.prepare("SELECT id FROM insight_runs WHERE id = ?").get(legacyId);
      if (!isRow$6(existing)) {
        const preferredId = preferredNumericId(run.id);
        if (preferredId !== null && !db.prepare("SELECT id FROM insight_runs WHERE id = ?").get(preferredId)) {
          db.prepare(
            `INSERT INTO insight_runs (
               id, schema_version, conversation_id, provider, harness_id, model, prompt_hash,
               transcript_hash, status, stage, task_type, project_path, created_at, finished_at
             ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ).run(
            preferredId,
            conversationId,
            run.modelProvider ?? run.harnessId,
            run.harnessId,
            run.model ?? null,
            `shared-compat:${run.id}:prompt`,
            `shared-compat:${run.id}:transcript`,
            run.status,
            run.stage,
            run.taskType ?? null,
            run.projectPath ?? null,
            run.createdAt,
            run.finishedAt
          );
          legacyId = preferredId;
        } else {
          const created = await desktop.createInsightRun({
            conversationId,
            provider: run.modelProvider ?? run.harnessId,
            harnessId: run.harnessId,
            model: run.model ?? null,
            promptHash: `shared-compat:${run.id}:prompt`,
            transcriptHash: `shared-compat:${run.id}:transcript`,
            status: run.status,
            stage: run.stage,
            taskType: run.taskType ?? null,
            projectPath: run.projectPath ?? null
          });
          legacyId = created.id;
        }
      }
      if (legacyId === null) throw new Error("Canonical improve run could not be resolved");
      await desktop.updateInsightRun(legacyId, {
        status: run.status,
        stage: run.stage,
        finishedAt: run.finishedAt
      });
      db.prepare(
        `UPDATE insight_runs SET created_at = ?, provider = COALESCE(?, provider),
           model = COALESCE(?, model),
           task_type = COALESCE(?, task_type),
           project_path = COALESCE(?, project_path)
         WHERE id = ?`
      ).run(
        run.createdAt,
        run.modelProvider ?? null,
        run.model ?? null,
        run.taskType ?? null,
        run.projectPath ?? null,
        legacyId
      );
      rememberId(db, "run", run.id, legacyId);
    },
    async listRuns(limit, offset) {
      const rows2 = limit === void 0 ? await desktop.listInsightRunViews(Number.MAX_SAFE_INTEGER, offset) : await desktop.listInsightRunViews(limit, offset);
      return rows2.map(({ run }) => ({
        id: sharedIdForLegacy(db, "run", run.id),
        conversationId: sharedIdForLegacy(db, "conversation", run.conversation_id),
        harnessId: run.harness_id,
        processingProvider: run.provider === "google" ? "cloud" : "local-plans",
        modelProvider: run.provider,
        model: run.model,
        status: run.status,
        stage: run.stage,
        createdAt: run.created_at,
        finishedAt: run.finished_at
      }));
    },
    async getSuggestion(id) {
      const legacyId = resolvedLegacyId(db, "suggestion", id);
      if (legacyId === null) return null;
      const row = await desktop.getSuggestion(legacyId);
      return row ? suggestionFromDesktop(db, row) : null;
    },
    async listVisibleSuggestions(now) {
      return (await desktop.listVisibleSuggestions(now)).map(
        (row) => suggestionFromDesktop(db, row)
      );
    },
    async listResolvedSuggestions(now) {
      return (await desktop.listResolvedSuggestions(now)).map(
        (row) => suggestionFromDesktop(db, row)
      );
    },
    async updateSuggestion(id, patch) {
      const legacyId = resolvedLegacyId(db, "suggestion", id);
      if (legacyId === null) return;
      await desktop.updateSuggestion(legacyId, {
        status: patch.status,
        snoozedUntil: patch.snoozedUntil,
        applyResultJson: patch.applyResult === void 0 ? void 0 : JSON.stringify(patch.applyResult ?? null),
        title: patch.title,
        summary: patch.summary,
        operationsJson: patch.operations === void 0 ? void 0 : JSON.stringify(patch.operations ?? null),
        evidenceJson: patch.evidence === void 0 ? void 0 : JSON.stringify(patch.evidence ?? null),
        clusterIds: patch.clusterIds?.map((clusterId) => {
          const clusterIdNumber = preferredNumericId(clusterId);
          if (clusterIdNumber === null)
            throw new Error(`Canonical signal cluster not found for ${clusterId}`);
          return clusterIdNumber;
        })
      });
      const directSets = [];
      const directValues = [];
      if (hasSuggestionDisplayState) {
        for (const [column, value] of [
          ["hidden_at", patch.hiddenAt],
          ["hidden_reason", patch.hiddenReason],
          ["hidden_until", patch.hiddenUntil]
        ]) {
          if (value !== void 0) {
            directSets.push(`${column} = ?`);
            directValues.push(value);
          }
        }
      }
      if (directSets.length > 0) {
        directValues.push(legacyId);
        db.prepare(`UPDATE suggestions SET ${directSets.join(", ")} WHERE id = ?`).run(
          ...directValues
        );
      }
      if (patch.change !== void 0) {
        db.prepare(
          `INSERT INTO storage_compatibility_suggestions (legacy_id, change_json, evidence_count)
           VALUES (?, ?, 0)
           ON CONFLICT(legacy_id) DO UPDATE SET change_json = excluded.change_json`
        ).run(legacyId, JSON.stringify(patch.change ?? null));
      }
    },
    async insertSuggestionFeedbackEvent(input) {
      const legacyId = resolvedLegacyId(db, "suggestion", input.suggestionId);
      if (legacyId === null) return;
      const createdAt = input.createdAt ?? Date.now();
      const eventId = input.type === "suggestion_shown_not_applied" ? `suggestion-${legacyId}-${input.type}-${createdAt}` : `suggestion-${legacyId}-${input.type}`;
      db.exec("SAVEPOINT blume_suggestion_feedback");
      try {
        const inserted = db.prepare(
          `INSERT OR IGNORE INTO suggestion_feedback_events (
             event_id, suggestion_id, agent_version_id, type, metadata_json, created_at
           ) VALUES (?, ?, ?, ?, ?, ?)`
        ).run(
          eventId,
          legacyId,
          input.agentVersionId,
          input.type,
          input.metadataJson || "{}",
          createdAt
        );
        if (inserted.changes !== 0 && input.type === "suggestion_shown_not_applied") {
          db.prepare(
            `UPDATE suggestions
             SET last_shown_at = ?, shown_count = shown_count + 1
             WHERE id = ?`
          ).run(createdAt, legacyId);
        }
        db.exec("RELEASE SAVEPOINT blume_suggestion_feedback");
      } catch (error) {
        db.exec("ROLLBACK TO SAVEPOINT blume_suggestion_feedback");
        db.exec("RELEASE SAVEPOINT blume_suggestion_feedback");
        throw error;
      }
    },
    async insertSignal(input) {
      const runId = resolvedLegacyId(db, "run", input.runId);
      const conversationId = resolvedLegacyId(db, "conversation", input.conversationId);
      if (runId === null || conversationId === null) {
        throw new Error("Canonical run and conversation are required before inserting a signal");
      }
      return signalFromDesktop(
        db,
        await desktop.insertSignal({
          ...input,
          runId,
          conversationId
        })
      );
    },
    async listSignalsByRun(runId) {
      const legacyId = resolvedLegacyId(db, "run", runId);
      if (legacyId === null) return [];
      return signalsFromDesktop(db, await desktop.listSignalsByRun(legacyId));
    },
    async listSignalsByConversation(conversationId) {
      const legacyId = resolvedLegacyId(db, "conversation", conversationId);
      if (legacyId === null) return [];
      return signalsFromDesktop(db, await desktop.listSignalsByConversation(legacyId));
    },
    async searchSignals(query) {
      return signalsFromDesktop(
        db,
        await desktop.searchSignals({
          ...query,
          creatorAgentVersionId: namespaceScope(query.creatorAgentVersionId)
        })
      );
    },
    async getSignalsByIds(ids, filter) {
      return signalsFromDesktop(
        db,
        await desktop.getSignalsByIds(ids, {
          creatorAgentVersionId: namespaceScope(filter?.creatorAgentVersionId)
        })
      );
    },
    async listRecentSignals(limit, filter) {
      return signalsFromDesktop(
        db,
        await desktop.listRecentSignals(limit, {
          creatorAgentVersionId: namespaceScope(filter?.creatorAgentVersionId)
        })
      );
    },
    async listSignalsByNormalizedKey(normalizedKey, filter) {
      return signalsFromDesktop(
        db,
        (await desktop.listSignalsByNormalizedKey(normalizedKey, {
          creatorAgentVersionId: namespaceScope(filter?.creatorAgentVersionId)
        })).filter((row) => creatorMatches(row, namespaceScope(filter?.creatorAgentVersionId)))
      );
    },
    async searchSignalClusters(query) {
      return (await desktop.searchSignalClusters({
        ...query,
        creatorAgentVersionId: namespaceScope(query.creatorAgentVersionId)
      })).map(clusterFromDesktop);
    },
    async listSignalClusters(status, filter) {
      return (await desktop.listSignalClusters(status, {
        creatorAgentVersionId: namespaceScope(filter?.creatorAgentVersionId)
      })).filter((row) => creatorMatches(row, namespaceScope(filter?.creatorAgentVersionId))).map(clusterFromDesktop);
    },
    async getSignalCluster(id, filter) {
      const row = await desktop.getSignalCluster(id);
      return row && creatorMatches(row, namespaceScope(filter?.creatorAgentVersionId)) ? clusterFromDesktop(row) : null;
    },
    async listSignalClustersByNormalizedKey(normalizedKey, filter) {
      return (await desktop.listSignalClustersByNormalizedKey(normalizedKey, {
        creatorAgentVersionId: namespaceScope(filter?.creatorAgentVersionId)
      })).filter((row) => creatorMatches(row, namespaceScope(filter?.creatorAgentVersionId))).map(clusterFromDesktop);
    },
    async createSignalCluster(input) {
      return clusterFromDesktop(await desktop.createSignalCluster(input));
    },
    addSignalClusterMember: desktop.addSignalClusterMember.bind(desktop),
    recomputeSignalClusterStats: desktop.recomputeSignalClusterStats.bind(desktop),
    async listClusterMemberSignals(clusterId, filter) {
      return signalsFromDesktop(
        db,
        (await desktop.listClusterMemberSignals(clusterId, {
          creatorAgentVersionId: namespaceScope(filter?.creatorAgentVersionId)
        })).filter((row) => creatorMatches(row, namespaceScope(filter?.creatorAgentVersionId)))
      );
    },
    async listClustersTouchedByRun(runId) {
      const legacyId = resolvedLegacyId(db, "run", runId);
      if (legacyId === null) return [];
      return (await desktop.listClustersTouchedByRun(legacyId)).map(clusterFromDesktop);
    },
    setSignalClusterStatus: desktop.setSignalClusterStatus.bind(desktop),
    incrementSignalClusterDismissed: desktop.incrementSignalClusterDismissed.bind(desktop),
    decrementSignalClusterDismissed: desktop.decrementSignalClusterDismissed.bind(desktop),
    insertSignalClusterDuplicateCandidate: desktop.insertSignalClusterDuplicateCandidate.bind(desktop),
    listSignalClusterDuplicateCandidates: desktop.listSignalClusterDuplicateCandidates.bind(desktop),
    getProjectAudit: desktop.getProjectAudit.bind(desktop),
    listProjectAudits: desktop.listProjectAudits.bind(desktop),
    upsertProjectAudit: desktop.upsertProjectAudit.bind(desktop)
  };
}
function isRow$5(value) {
  return typeof value === "object" && value !== null;
}
function int$3(value) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") return Number(value);
  return 0;
}
function textOrNull$4(value) {
  return value == null ? null : String(value);
}
function escapeLike(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}
function replacementActivityEventCount(input) {
  const toolSourcePositions = new Set(
    input.toolCalls.flatMap(
      (tool) => tool.sourceEventPosition == null ? [] : [tool.sourceEventPosition]
    )
  );
  const toolResultPositions = new Set(
    input.toolCalls.flatMap(
      (tool) => tool.resultEventPosition == null ? [] : [tool.resultEventPosition]
    )
  );
  const visibleEvents = input.events.filter((event) => {
    if (event.sourcePosition == null) return true;
    if (event.kind === "tool_result" && toolResultPositions.has(event.sourcePosition)) return false;
    return !(event.kind === "assistant_text" && toolSourcePositions.has(event.sourcePosition) && !event.text?.trim());
  }).length;
  return visibleEvents + input.toolCalls.length;
}
function transcriptSearchExcerpt(text2, query) {
  const compact = text2.replace(/\s+/g, " ").trim();
  const index2 = compact.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (index2 < 0 || compact.length <= 260) return compact.slice(0, 260);
  const start = Math.max(0, index2 - 84);
  const end = Math.min(compact.length, index2 + query.length + 164);
  return `${start > 0 ? "…" : ""}${compact.slice(start, end).trim()}${end < compact.length ? "…" : ""}`;
}
function conversationState(value) {
  return typeof value === "string" && index.CONVERSATION_STATES.includes(value) ? value : "running";
}
function numberValue$1(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  return null;
}
function stringValue$1(value) {
  return typeof value === "string" ? value : null;
}
function nullableNumberValue$1(value) {
  return value == null ? null : numberValue$1(value);
}
function nullableStringValue$1(value) {
  return value == null ? null : stringValue$1(value);
}
function titleSourceValue(value) {
  return value === "provider" || value === "llm" || value === "user" ? value : null;
}
function desktopConversationRow(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const ref = stringValue$1(value.ref);
  const source = stringValue$1(value.source);
  const state = stringValue$1(value.state);
  const lastActivityTs = numberValue$1(value.last_activity_ts);
  const ingestedAt = numberValue$1(value.ingested_at);
  const createdAt = numberValue$1(value.created_at);
  const userTurnCount = numberValue$1(value.user_turn_count);
  const latestUserTurnPosition = nullableNumberValue$1(value.latest_user_turn_position);
  if (id === null || ref === null || source === null || state === null || lastActivityTs === null || ingestedAt === null || createdAt === null) {
    return null;
  }
  return {
    id,
    ref,
    source,
    external_id: nullableStringValue$1(value.external_id),
    project_id: nullableNumberValue$1(value.project_id),
    source_id: nullableNumberValue$1(value.source_id),
    ...value.source_path !== void 0 ? { source_path: nullableStringValue$1(value.source_path) } : {},
    workspace: nullableStringValue$1(value.workspace),
    workspace_kind: nullableStringValue$1(value.workspace_kind),
    cwd: nullableStringValue$1(value.cwd),
    branch: nullableStringValue$1(value.branch),
    entrypoint: nullableStringValue$1(value.entrypoint),
    parent_thread_id: nullableStringValue$1(value.parent_thread_id),
    thread_source: nullableStringValue$1(value.thread_source),
    subagent_kind: nullableStringValue$1(value.subagent_kind),
    title: nullableStringValue$1(value.title),
    provider_title: nullableStringValue$1(value.provider_title),
    title_source: titleSourceValue(value.title_source),
    preview: nullableStringValue$1(value.preview),
    state,
    failure_reason: nullableStringValue$1(value.failure_reason),
    last_kind: nullableStringValue$1(value.last_kind),
    started_at: nullableNumberValue$1(value.started_at),
    last_activity_ts: lastActivityTs,
    last_activity: nullableStringValue$1(value.last_activity),
    dismissed_at: nullableNumberValue$1(value.dismissed_at),
    state_override_turn_position: nullableNumberValue$1(value.state_override_turn_position),
    ingested_at: ingestedAt,
    created_at: createdAt,
    ...userTurnCount === null ? {} : {
      user_turn_count: userTurnCount,
      latest_user_turn_position: latestUserTurnPosition
    }
  };
}
function desktopConversationRows(values) {
  return values.map(desktopConversationRow).filter((row) => row !== null);
}
function desktopConversationMenuBarRow(value) {
  if (!isRow$5(value)) return null;
  const ref = stringValue$1(value.ref);
  const source = stringValue$1(value.source);
  const state = stringValue$1(value.state);
  const lastActivityTs = numberValue$1(value.last_activity_ts);
  if (ref === null || source === null || state === null || lastActivityTs === null) return null;
  return {
    ref,
    source,
    workspace: nullableStringValue$1(value.workspace),
    cwd: nullableStringValue$1(value.cwd),
    thread_source: nullableStringValue$1(value.thread_source),
    title: nullableStringValue$1(value.title),
    provider_title: nullableStringValue$1(value.provider_title),
    preview: nullableStringValue$1(value.preview),
    state,
    last_activity_ts: lastActivityTs
  };
}
function compactMappedRows$1(values, mapper) {
  return values.map(mapper).filter((row) => row !== null);
}
function sqliteFlag$1(value) {
  const n = numberValue$1(value);
  return n === 0 || n === 1 ? n : null;
}
function desktopProjectRow$1(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const path = stringValue$1(value.path);
  const name = stringValue$1(value.name);
  const createdAt = numberValue$1(value.created_at);
  const updatedAt = numberValue$1(value.updated_at);
  if (id === null || path === null || name === null || createdAt === null || updatedAt === null) {
    return null;
  }
  return {
    id,
    path,
    name,
    git_remote: nullableStringValue$1(value.git_remote),
    display_path: nullableStringValue$1(value.display_path),
    created_at: createdAt,
    updated_at: updatedAt
  };
}
function transcriptEventKind(value) {
  return value === "user_text" || value === "assistant_text" || value === "tool_result" ? value : null;
}
function transcriptTodoState(value) {
  return value === "pending" || value === "current" || value === "done" ? value : null;
}
function transcriptUserTurnRow(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const conversationId = numberValue$1(value.conversation_id);
  const position = numberValue$1(value.position);
  const prompt = stringValue$1(value.prompt);
  const state = stringValue$1(value.state);
  if (id === null || conversationId === null || position === null || prompt === null || state === null) {
    return null;
  }
  return {
    id,
    conversation_id: conversationId,
    position,
    prompt,
    state,
    started_at: nullableNumberValue$1(value.started_at),
    ended_at: nullableNumberValue$1(value.ended_at)
  };
}
function transcriptEventRow(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const userTurnId = numberValue$1(value.user_turn_id);
  const position = numberValue$1(value.position);
  const kind = transcriptEventKind(value.kind);
  if (id === null || userTurnId === null || position === null || kind === null) return null;
  return {
    id,
    user_turn_id: userTurnId,
    position,
    kind,
    text: nullableStringValue$1(value.text),
    timestamp_ms: nullableNumberValue$1(value.timestamp_ms),
    tool_call_id: nullableNumberValue$1(value.tool_call_id)
  };
}
function transcriptToolCallRow(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const conversationId = numberValue$1(value.conversation_id);
  const name = stringValue$1(value.name);
  const isError = sqliteFlag$1(value.is_error);
  if (id === null || conversationId === null || name === null || isError === null) return null;
  return {
    id,
    conversation_id: conversationId,
    event_id: nullableNumberValue$1(value.event_id),
    tool_use_id: nullableStringValue$1(value.tool_use_id),
    name,
    input_json: nullableStringValue$1(value.input_json),
    result_text: nullableStringValue$1(value.result_text),
    is_error: isError,
    started_at_ms: nullableNumberValue$1(value.started_at_ms),
    ended_at_ms: nullableNumberValue$1(value.ended_at_ms)
  };
}
function transcriptTodoListRow(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const conversationId = numberValue$1(value.conversation_id);
  const userTurnId = numberValue$1(value.user_turn_id);
  const source = stringValue$1(value.source);
  const isInferred = sqliteFlag$1(value.is_inferred);
  const createdAt = numberValue$1(value.created_at);
  const updatedAt = numberValue$1(value.updated_at);
  if (id === null || conversationId === null || userTurnId === null || source === null || isInferred === null || createdAt === null || updatedAt === null) {
    return null;
  }
  return {
    id,
    conversation_id: conversationId,
    user_turn_id: userTurnId,
    source_event_id: nullableNumberValue$1(value.source_event_id),
    source,
    is_inferred: isInferred,
    created_at: createdAt,
    updated_at: updatedAt
  };
}
function transcriptTodoRow(value) {
  if (!isRow$5(value)) return null;
  const id = numberValue$1(value.id);
  const listId = numberValue$1(value.list_id);
  const position = numberValue$1(value.position);
  const content = stringValue$1(value.content);
  const state = transcriptTodoState(value.state);
  if (id === null || listId === null || position === null || content === null || state === null) {
    return null;
  }
  return {
    id,
    list_id: listId,
    position,
    content,
    state
  };
}
function lastInsertId(value) {
  if (!isRow$5(value)) return 0;
  return int$3(value.lastInsertRowid);
}
function transcriptTurnLimit(value) {
  if (!value || !Number.isFinite(value)) return 3;
  return Math.max(1, Math.min(25, Math.floor(value)));
}
const SQLITE_BATCH_SIZE = 900;
function uniqueNumbers(values) {
  const out = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) out.add(value);
  }
  return Array.from(out);
}
function uniqueStrings(values) {
  const out = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (typeof value === "string" && value) out.add(value);
  }
  return Array.from(out);
}
function chunkValues(values, size = SQLITE_BATCH_SIZE) {
  const chunks = [];
  for (let index2 = 0; index2 < values.length; index2 += size) {
    chunks.push(values.slice(index2, index2 + size));
  }
  return chunks;
}
function placeholders(values) {
  return values.map(() => "?").join(",");
}
function conversationWhere(opts) {
  const where = [];
  const params = [];
  if (opts.state) {
    const states = Array.isArray(opts.state) ? opts.state : [opts.state];
    where.push(`state IN (${states.map(() => "?").join(", ")})`);
    params.push(...states);
  }
  if (opts.excludeState) {
    const states = Array.isArray(opts.excludeState) ? opts.excludeState : [opts.excludeState];
    where.push(`state NOT IN (${states.map(() => "?").join(", ")})`);
    params.push(...states);
  }
  if (opts.source) {
    const sources2 = Array.isArray(opts.source) ? opts.source : [opts.source];
    where.push(`source IN (${sources2.map(() => "?").join(", ")})`);
    params.push(...sources2);
  }
  if (opts.excludeCodexSubagents) {
    where.push(
      `(source <> 'codex' OR thread_source IS NULL OR thread_source NOT IN (${placeholders(index.CODEX_SUBAGENT_THREAD_SOURCES)}))`
    );
    params.push(...index.CODEX_SUBAGENT_THREAD_SOURCES);
  }
  if (opts.projectId !== void 0) {
    where.push("project_id = ?");
    params.push(opts.projectId);
  }
  if (!opts.includeDismissed) {
    where.push(
      "(dismissed_at IS NULL OR (state_override_turn_position IS NULL AND dismissed_at < last_activity_ts))"
    );
  }
  if (opts.sinceMs !== void 0) {
    where.push("last_activity_ts >= ?");
    params.push(opts.sinceMs);
  }
  return { where, params };
}
function listConversationRows(db, opts = {}) {
  const { where, params } = conversationWhere(opts);
  const sourcePath = "(SELECT path FROM sources WHERE sources.id = conversations.source_id) AS source_path";
  let sql = opts.includeUserTurnCount ? `SELECT conversations.*, ${sourcePath},
         (SELECT COUNT(*) FROM user_turns WHERE user_turns.conversation_id = conversations.id)
           AS user_turn_count,
         (SELECT MAX(position) FROM user_turns WHERE user_turns.conversation_id = conversations.id)
           AS latest_user_turn_position
       FROM conversations` : `SELECT conversations.*, ${sourcePath} FROM conversations`;
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY last_activity_ts DESC, id DESC";
  if (opts.limit !== void 0) {
    sql += " LIMIT ?";
    params.push(opts.limit);
  } else if (opts.offset !== void 0) {
    sql += " LIMIT -1";
  }
  if (opts.offset !== void 0) {
    sql += " OFFSET ?";
    params.push(opts.offset);
  }
  return desktopConversationRows(db.prepare(sql).all(...params));
}
function loadMenuBarConversationSnapshot(db, options) {
  const { where, params } = conversationWhere({
    sinceMs: options.sinceMs,
    excludeState: ["inactive", "idle"],
    excludeCodexSubagents: true
  });
  const rows2 = db.prepare(
    `SELECT ref, source, workspace, cwd, thread_source,
              substr(title, 1, ${insights$1.DESKTOP_MENU_BAR_SNAPSHOT_TEXT_MAX_CHARS}) AS title,
              substr(provider_title, 1, ${insights$1.DESKTOP_MENU_BAR_SNAPSHOT_TEXT_MAX_CHARS})
                AS provider_title,
              substr(preview, 1, ${insights$1.DESKTOP_MENU_BAR_SNAPSHOT_TEXT_MAX_CHARS}) AS preview,
              state, last_activity_ts,
              COUNT(*) OVER () AS menu_bar_total_count,
              SUM(CASE WHEN state = 'running' THEN 1 ELSE 0 END) OVER ()
                AS menu_bar_running_count,
              SUM(CASE WHEN state = 'needs-approval' THEN 1 ELSE 0 END) OVER ()
                AS menu_bar_waiting_count,
              SUM(CASE WHEN state = 'finished' THEN 1 ELSE 0 END) OVER ()
                AS menu_bar_finished_count
       FROM conversations
       WHERE ${where.join(" AND ")}
       ORDER BY last_activity_ts DESC, id DESC
       LIMIT ?`
  ).all(...params, Math.max(1, Math.trunc(options.limit)));
  const first = rows2.find(isRow$5);
  return {
    rows: compactMappedRows$1(rows2, desktopConversationMenuBarRow),
    totalConversationCount: int$3(first?.menu_bar_total_count),
    counts: {
      running: int$3(first?.menu_bar_running_count),
      waiting: int$3(first?.menu_bar_waiting_count),
      finished: int$3(first?.menu_bar_finished_count)
    }
  };
}
function listProjectsByIds(db, ids) {
  const out = /* @__PURE__ */ new Map();
  for (const chunk of chunkValues(ids)) {
    if (chunk.length === 0) continue;
    const rows2 = compactMappedRows$1(
      db.prepare(`SELECT * FROM projects WHERE id IN (${placeholders(chunk)})`).all(...chunk),
      desktopProjectRow$1
    );
    for (const row of rows2) out.set(row.id, row);
  }
  return out;
}
function listActiveTodoListsByConversation(db, conversationIds) {
  const lists = [];
  for (const chunk of chunkValues(conversationIds)) {
    if (chunk.length === 0) continue;
    const listRows = compactMappedRows$1(
      db.prepare(
        `SELECT tl.* FROM todo_lists tl
           JOIN user_turns ut ON ut.id = tl.user_turn_id
           JOIN (
             SELECT conversation_id, MAX(position) AS max_position
             FROM user_turns
             WHERE conversation_id IN (${placeholders(chunk)})
             GROUP BY conversation_id
           ) latest ON latest.conversation_id = tl.conversation_id
           WHERE tl.conversation_id IN (${placeholders(chunk)})
             AND ut.position = latest.max_position
           ORDER BY tl.conversation_id`
      ).all(...chunk, ...chunk),
      transcriptTodoListRow
    );
    lists.push(...listRows);
  }
  const todosByList = /* @__PURE__ */ new Map();
  const listIds = lists.map((list) => list.id);
  for (const chunk of chunkValues(listIds)) {
    if (chunk.length === 0) continue;
    const todoRows = compactMappedRows$1(
      db.prepare(
        `SELECT * FROM todos
           WHERE list_id IN (${placeholders(chunk)})
           ORDER BY list_id, position`
      ).all(...chunk),
      transcriptTodoRow
    );
    for (const todo of todoRows) {
      const existing = todosByList.get(todo.list_id);
      if (existing) existing.push(todo);
      else todosByList.set(todo.list_id, [todo]);
    }
  }
  const out = /* @__PURE__ */ new Map();
  for (const list of lists) {
    out.set(list.conversation_id, { list, todos: todosByList.get(list.id) ?? [] });
  }
  return out;
}
function listRunningSubAgentToolCallsByConversation(db, conversationIds) {
  const out = /* @__PURE__ */ new Map();
  for (const chunk of chunkValues(conversationIds)) {
    if (chunk.length === 0) continue;
    const rows2 = compactMappedRows$1(
      db.prepare(
        `SELECT * FROM tool_calls
           WHERE conversation_id IN (${placeholders(chunk)})
             AND ended_at_ms IS NULL
             AND name IN ('Task', 'Agent', 'subagent', 'task')
           ORDER BY conversation_id, id`
      ).all(...chunk),
      transcriptToolCallRow
    );
    for (const row of rows2) {
      const existing = out.get(row.conversation_id);
      if (existing) existing.push(row);
      else out.set(row.conversation_id, [row]);
    }
  }
  return out;
}
function listCodexChildConversationsByParent(db, parentThreadIds) {
  const out = /* @__PURE__ */ new Map();
  for (const id of parentThreadIds) out.set(id, []);
  for (const chunk of chunkValues(parentThreadIds)) {
    if (chunk.length === 0) continue;
    const rows2 = desktopConversationRows(
      db.prepare(
        `SELECT * FROM conversations
           WHERE source = 'codex'
             AND parent_thread_id IN (${placeholders(chunk)})
           ORDER BY last_activity_ts DESC`
      ).all(...chunk)
    );
    for (const row of rows2) {
      if (!row.parent_thread_id) continue;
      const existing = out.get(row.parent_thread_id);
      if (existing) existing.push(row);
      else out.set(row.parent_thread_id, [row]);
    }
  }
  return out;
}
function listUserTurnsByConversation(db, conversationIds) {
  const out = /* @__PURE__ */ new Map();
  for (const chunk of chunkValues(conversationIds)) {
    if (chunk.length === 0) continue;
    const rows2 = compactMappedRows$1(
      db.prepare(
        `SELECT * FROM user_turns
           WHERE conversation_id IN (${placeholders(chunk)})
           ORDER BY conversation_id, position`
      ).all(...chunk),
      transcriptUserTurnRow
    );
    for (const row of rows2) {
      const existing = out.get(row.conversation_id);
      if (existing) existing.push(row);
      else out.set(row.conversation_id, [row]);
    }
  }
  return out;
}
function getRequired(db, query, params) {
  const row = db.prepare(query).get(...params);
  if (!isRow$5(row)) throw new Error("desktop conversation replacement: expected row");
  return row;
}
function hasAnyKey(obj) {
  for (const key in obj) {
    if (obj[key] !== void 0) return true;
  }
  return false;
}
function runInTransaction$1(db, fn) {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
function createDesktopConversationStore(db, options = {}) {
  const nowMs = options.nowMs ?? (() => Date.now());
  let eventMessageIds;
  const hasEventMessageIds = () => eventMessageIds ??= db.prepare("SELECT 1 FROM pragma_table_info('events') WHERE name = 'message_id'").all().length > 0;
  return {
    async hasAnyConversation() {
      return isRow$5(db.prepare("SELECT id FROM conversations LIMIT 1").get());
    },
    async listConversations(options2) {
      return listConversationRows(db, options2);
    },
    async countConversations(options2 = {}) {
      const { where, params } = conversationWhere(options2);
      let sql = "SELECT COUNT(*) AS count FROM conversations";
      if (where.length) sql += " WHERE " + where.join(" AND ");
      return int$3(db.prepare(sql).get(...params)?.count);
    },
    async loadMenuBarConversationSnapshot(options2) {
      return loadMenuBarConversationSnapshot(db, options2);
    },
    async listConversationViewRecords(options2) {
      const conversations = listConversationRows(db, { ...options2, excludeCodexSubagents: true });
      const conversationIds = conversations.map((conversation) => conversation.id);
      const projectsById = listProjectsByIds(
        db,
        uniqueNumbers(conversations.map((conversation) => conversation.project_id))
      );
      const activeTodosByConversation = listActiveTodoListsByConversation(db, conversationIds);
      const toolCallsByConversation = listRunningSubAgentToolCallsByConversation(
        db,
        conversationIds
      );
      const childConversationsByParent = listCodexChildConversationsByParent(
        db,
        uniqueStrings(
          conversations.flatMap(
            (conversation) => conversation.source === "codex" ? [conversation.external_id] : []
          )
        )
      );
      const userTurnsByConversation = options2?.includeUserTurns === true ? listUserTurnsByConversation(db, conversationIds) : /* @__PURE__ */ new Map();
      return conversations.map((conversation) => {
        const conversationId = conversation.id;
        return {
          conversation,
          project: conversation.project_id == null ? null : projectsById.get(conversation.project_id) ?? null,
          activeTodos: activeTodosByConversation.get(conversationId)?.todos ?? [],
          toolCalls: toolCallsByConversation.get(conversationId) ?? [],
          userTurns: userTurnsByConversation.get(conversationId) ?? [],
          codexChildConversations: conversation.external_id ? childConversationsByParent.get(conversation.external_id) ?? [] : []
        };
      });
    },
    async getConversationPacketRows(conversationId) {
      return {
        events: compactMappedRows$1(
          db.prepare(
            `SELECT e.* FROM events e
               JOIN user_turns t ON t.id = e.user_turn_id
               WHERE t.conversation_id = ?
               ORDER BY t.position, e.position`
          ).all(conversationId),
          transcriptEventRow
        ),
        toolCalls: compactMappedRows$1(
          db.prepare("SELECT * FROM tool_calls WHERE conversation_id = ? ORDER BY id").all(conversationId),
          transcriptToolCallRow
        ),
        userTurns: compactMappedRows$1(
          db.prepare("SELECT * FROM user_turns WHERE conversation_id = ? ORDER BY position").all(conversationId),
          transcriptUserTurnRow
        )
      };
    },
    async getConversationById(id) {
      const row = db.prepare("SELECT * FROM conversations WHERE id = ?").get(id);
      return desktopConversationRow(row);
    },
    async getConversationByRef(ref) {
      const row = db.prepare("SELECT * FROM conversations WHERE ref = ?").get(ref);
      return desktopConversationRow(row);
    },
    async getConversationByIdentifier(value) {
      const byRef = db.prepare("SELECT * FROM conversations WHERE ref = ?").get(value);
      if (byRef) return desktopConversationRow(byRef);
      if (/^\d+$/.test(value)) {
        const byId = db.prepare("SELECT * FROM conversations WHERE id = ?").get(Number(value));
        if (byId) return desktopConversationRow(byId);
      }
      const byExternalId = db.prepare(
        `SELECT * FROM conversations WHERE external_id = ?
           ORDER BY (source = 'codex' AND coalesce(thread_source IN (${placeholders(index.CODEX_SUBAGENT_THREAD_SOURCES)}), 0)), last_activity_ts DESC
           LIMIT 1`
      ).get(value, ...index.CODEX_SUBAGENT_THREAD_SOURCES);
      return desktopConversationRow(byExternalId);
    },
    async getConversationTranscriptByRef(ref, opts = {}) {
      const conversation = desktopConversationRow(
        db.prepare("SELECT * FROM conversations WHERE ref = ?").get(ref)
      );
      if (!conversation) return null;
      const conversationId = int$3(conversation.id);
      const countRow = db.prepare(
        `SELECT COUNT(*) AS count, MIN(position) AS first_position,
                  MAX(position) AS latest_position,
                  (SELECT activity_event_count FROM conversations WHERE id = ?) AS activity_event_count
           FROM user_turns WHERE conversation_id = ?`
      ).get(conversationId, conversationId);
      const totalTurns = isRow$5(countRow) ? int$3(countRow.count) : 0;
      const totalActivityEvents = isRow$5(countRow) ? nullableNumberValue$1(countRow.activity_event_count) : null;
      const firstAvailablePosition = isRow$5(countRow) ? nullableNumberValue$1(countRow.first_position) : null;
      const latestAvailablePosition = isRow$5(countRow) ? nullableNumberValue$1(countRow.latest_position) : null;
      const beforePosition = typeof opts.beforeTurnPosition === "number" && Number.isFinite(opts.beforeTurnPosition) ? opts.beforeTurnPosition : Number.MAX_SAFE_INTEGER;
      const afterPosition = typeof opts.afterTurnPosition === "number" && Number.isFinite(opts.afterTurnPosition) ? opts.afterTurnPosition : Number.MIN_SAFE_INTEGER;
      const limit = transcriptTurnLimit(opts.limit);
      let focusedPosition = typeof opts.aroundTurnPosition === "number" && Number.isFinite(opts.aroundTurnPosition) ? opts.aroundTurnPosition : null;
      if (typeof opts.focusEventId === "number" && Number.isFinite(opts.focusEventId)) {
        const focusedEvent = db.prepare(
          `SELECT ut.position FROM events e
             JOIN user_turns ut ON ut.id = e.user_turn_id
             WHERE ut.conversation_id = ? AND e.id = ?`
        ).get(conversationId, opts.focusEventId);
        if (isRow$5(focusedEvent)) {
          focusedPosition = nullableNumberValue$1(focusedEvent.position) ?? focusedPosition;
        }
      }
      if (typeof opts.focusToolCallId === "number" && Number.isFinite(opts.focusToolCallId)) {
        const focusedTool = db.prepare(
          `SELECT coalesce(ut.position, ?) AS position FROM tool_calls tc
             LEFT JOIN events e ON e.id = tc.event_id
             LEFT JOIN user_turns ut ON ut.id = e.user_turn_id
             WHERE tc.conversation_id = ? AND tc.id = ?`
        ).get(latestAvailablePosition, conversationId, opts.focusToolCallId);
        if (isRow$5(focusedTool)) {
          focusedPosition = nullableNumberValue$1(focusedTool.position) ?? focusedPosition;
        }
      }
      let userTurns2;
      if (beforePosition !== Number.MAX_SAFE_INTEGER || afterPosition !== Number.MIN_SAFE_INTEGER) {
        userTurns2 = compactMappedRows$1(
          db.prepare(
            `SELECT * FROM user_turns
               WHERE conversation_id = ? AND position < ? AND position > ?
               ORDER BY position DESC
               LIMIT ?`
          ).all(conversationId, beforePosition, afterPosition, limit),
          transcriptUserTurnRow
        ).reverse();
      } else if (focusedPosition !== null) {
        const atOrBeforeFocus = db.prepare(
          `SELECT COUNT(*) AS count FROM user_turns
             WHERE conversation_id = ? AND position <= ?`
        ).get(conversationId, focusedPosition);
        const focusOffset = Math.max(
          0,
          Math.min(
            Math.max(0, totalTurns - limit),
            (isRow$5(atOrBeforeFocus) ? int$3(atOrBeforeFocus.count) : 0) - Math.ceil(limit / 2)
          )
        );
        userTurns2 = compactMappedRows$1(
          db.prepare(
            `SELECT * FROM user_turns
               WHERE conversation_id = ?
               ORDER BY position ASC
               LIMIT ? OFFSET ?`
          ).all(conversationId, limit, focusOffset),
          transcriptUserTurnRow
        );
      } else {
        userTurns2 = compactMappedRows$1(
          db.prepare(
            `SELECT * FROM user_turns
               WHERE conversation_id = ?
               ORDER BY position DESC
               LIMIT ?`
          ).all(conversationId, limit),
          transcriptUserTurnRow
        ).reverse();
      }
      const turnIds = userTurns2.map((turn) => turn.id);
      const events = turnIds.length === 0 ? [] : compactMappedRows$1(
        db.prepare(
          `SELECT e.* FROM events e
                   JOIN user_turns t ON t.id = e.user_turn_id
                   WHERE t.conversation_id = ? AND e.user_turn_id IN (${turnIds.map(() => "?").join(",")})
                   ORDER BY t.position, e.position`
        ).all(conversationId, ...turnIds),
        transcriptEventRow
      );
      const eventIds = events.map((event) => event.id);
      const latestLoadedPosition = userTurns2[userTurns2.length - 1]?.position ?? null;
      const includeOrphanTools = latestLoadedPosition === latestAvailablePosition;
      const toolClauses = [];
      const toolArgs = [conversationId];
      if (eventIds.length > 0) {
        toolClauses.push(`event_id IN (${eventIds.map(() => "?").join(",")})`);
        toolArgs.push(...eventIds);
      }
      if (includeOrphanTools) toolClauses.push("event_id IS NULL");
      const toolCalls = toolClauses.length === 0 ? [] : latestAvailablePosition === null ? (
        // No user turns at all: return only the newest unlinked calls.
        compactMappedRows$1(
          db.prepare(
            `SELECT * FROM tool_calls
                     WHERE conversation_id = ? AND event_id IS NULL
                     ORDER BY id DESC
                     LIMIT ?`
          ).all(conversationId, insights$1.UNATTRIBUTED_TRANSCRIPT_TOOL_CALL_LIMIT),
          transcriptToolCallRow
        ).reverse()
      ) : compactMappedRows$1(
        db.prepare(
          `SELECT * FROM tool_calls
                     WHERE conversation_id = ? AND (${toolClauses.join(" OR ")})
                     ORDER BY id`
        ).all(...toolArgs),
        transcriptToolCallRow
      );
      const todoLists = turnIds.length === 0 ? [] : compactMappedRows$1(
        db.prepare(
          `SELECT tl.* FROM todo_lists tl
                   JOIN user_turns ut ON ut.id = tl.user_turn_id
                   WHERE tl.conversation_id = ? AND tl.user_turn_id IN (${turnIds.map(() => "?").join(",")})
                   ORDER BY ut.position DESC`
        ).all(conversationId, ...turnIds),
        transcriptTodoListRow
      ).map((list) => ({
        list,
        todos: compactMappedRows$1(
          db.prepare("SELECT * FROM todos WHERE list_id = ? ORDER BY position").all(list.id),
          transcriptTodoRow
        )
      }));
      const firstPosition = userTurns2[0]?.position ?? null;
      return {
        conversation,
        events,
        toolCalls,
        todoLists,
        userTurns: userTurns2,
        pagination: {
          totalTurns,
          totalActivityEvents,
          returnedTurns: userTurns2.length,
          hasMoreBefore: firstPosition !== null && firstAvailablePosition !== null && firstPosition > firstAvailablePosition,
          nextBeforeTurnPosition: firstPosition,
          hasMoreAfter: latestLoadedPosition !== null && latestAvailablePosition !== null && latestLoadedPosition < latestAvailablePosition,
          nextAfterTurnPosition: latestLoadedPosition ?? null
        }
      };
    },
    async searchConversationTranscriptByRef(ref, query, beforeTurnPosition) {
      const needle = query.trim();
      if (needle.length < 2) return { matches: [], nextBeforeTurnPosition: null, done: true };
      const conversation = desktopConversationRow(
        db.prepare("SELECT * FROM conversations WHERE ref = ?").get(ref)
      );
      if (!conversation) return { matches: [], nextBeforeTurnPosition: null, done: true };
      const conversationId = int$3(conversation.id);
      const turn = db.prepare(
        `SELECT id, position FROM user_turns
           WHERE conversation_id = ? AND (? IS NULL OR position < ?)
           ORDER BY position DESC LIMIT 1`
      ).get(conversationId, beforeTurnPosition ?? null, beforeTurnPosition ?? null);
      if (!isRow$5(turn)) return { matches: [], nextBeforeTurnPosition: null, done: true };
      const turnId = int$3(turn.id);
      const turnPosition = int$3(turn.position);
      const pattern = `%${escapeLike(needle.toLowerCase())}%`;
      const rows2 = db.prepare(
        `SELECT key, label, text, turn_position, focus_event_id, focus_tool_call_id
           FROM (
             SELECT 'turn-' || ut.id || '-prompt' AS key, 'User' AS label, ut.prompt AS text,
               ut.position AS turn_position, NULL AS focus_event_id, NULL AS focus_tool_call_id,
               0 AS kind_order, ut.id AS row_id
             FROM user_turns ut
             WHERE ut.id = ? AND lower(ut.prompt) LIKE ? ESCAPE '\\'
               AND NOT EXISTS (SELECT 1 FROM events e WHERE e.user_turn_id = ut.id AND e.kind = 'user_text')
             UNION ALL
             SELECT 'event-' || e.id,
               CASE e.kind WHEN 'user_text' THEN 'User' WHEN 'assistant_text' THEN 'Assistant' ELSE 'Tool result' END,
               e.text, ut.position, e.id, NULL, 1, e.id
             FROM events e JOIN user_turns ut ON ut.id = e.user_turn_id
             WHERE ut.id = ? AND e.text IS NOT NULL AND lower(e.text) LIKE ? ESCAPE '\\'
               AND NOT (e.kind = 'tool_result' AND e.tool_call_id IS NOT NULL)
             UNION ALL
             SELECT 'tool-' || tc.id, 'Tool',
               trim(tc.name || ' ' || coalesce(tc.input_json, '') || ' ' || coalesce(tc.result_text, '')),
               coalesce(ut.position, ?), tc.event_id, tc.id, 2, tc.id
             FROM tool_calls tc
             LEFT JOIN events e ON e.id = tc.event_id
             LEFT JOIN user_turns ut ON ut.id = e.user_turn_id
             WHERE tc.conversation_id = ?
               AND (ut.id = ? OR (tc.event_id IS NULL AND ? = (
                 SELECT max(position) FROM user_turns latest WHERE latest.conversation_id = tc.conversation_id
               )))
               AND lower(tc.name || ' ' || coalesce(tc.input_json, '') || ' ' || coalesce(tc.result_text, ''))
                 LIKE ? ESCAPE '\\'
             UNION ALL
             SELECT 'todos-' || tl.id, 'Tasks updated', todo.content, ut.position,
               NULL, NULL, 3, todo.id
             FROM todos todo
             JOIN todo_lists tl ON tl.id = todo.list_id
             JOIN user_turns ut ON ut.id = tl.user_turn_id
             WHERE ut.id = ? AND lower(todo.content) LIKE ? ESCAPE '\\'
           )
           ORDER BY kind_order DESC, row_id DESC
           LIMIT 100`
      ).all(
        turnId,
        pattern,
        turnId,
        pattern,
        turnPosition,
        conversationId,
        turnId,
        turnPosition,
        pattern,
        turnId,
        pattern
      );
      const matches = rows2.flatMap((row) => {
        if (!isRow$5(row)) return [];
        const label = String(row.label);
        return [
          {
            key: String(row.key),
            label,
            excerpt: transcriptSearchExcerpt(String(row.text ?? ""), needle),
            turnPosition: int$3(row.turn_position),
            focusEventId: nullableNumberValue$1(row.focus_event_id),
            focusToolCallId: nullableNumberValue$1(row.focus_tool_call_id)
          }
        ];
      });
      const previous = db.prepare(
        "SELECT max(position) AS position FROM user_turns WHERE conversation_id = ? AND position < ?"
      ).get(conversationId, turnPosition);
      const previousPosition = isRow$5(previous) ? nullableNumberValue$1(previous.position) : null;
      return {
        matches,
        nextBeforeTurnPosition: previousPosition === null ? null : turnPosition,
        done: previousPosition === null
      };
    },
    async getSkippedConversation(ref) {
      const row = db.prepare(
        `SELECT id, state, dismissed_at, state_override_turn_position
           FROM conversations
           WHERE ref = ?`
      ).get(ref);
      if (!isRow$5(row)) return null;
      const conversationId = numberValue$1(row.id);
      if (conversationId === null) return null;
      const latestTurn = db.prepare(
        `SELECT id FROM user_turns
           WHERE conversation_id = ?
           ORDER BY position DESC LIMIT 1`
      ).get(conversationId);
      const latestUserTurnId = isRow$5(latestTurn) ? numberValue$1(latestTurn.id) : null;
      return {
        conversationId,
        state: conversationState(row.state),
        dismissedAt: row.dismissed_at == null ? null : int$3(row.dismissed_at),
        stateOverrideTurnPosition: row.state_override_turn_position == null ? null : int$3(row.state_override_turn_position),
        latestUserTurnId
      };
    },
    async applySkippedConversationUpdate(input) {
      runInTransaction$1(db, () => {
        const row = db.prepare("SELECT id FROM conversations WHERE ref = ?").get(input.ref);
        if (!isRow$5(row)) return;
        const conversationId = int$3(row.id);
        db.prepare(
          `UPDATE conversations
           SET state = ?,
               dismissed_at = ?,
               state_override_turn_position = ?
           WHERE id = ?`
        ).run(
          input.statePatch.state,
          input.statePatch.dismissedAt,
          input.statePatch.stateOverrideTurnPosition,
          conversationId
        );
        if (input.providerTodoLists !== void 0) {
          const plannedTodoLists = index.planConversationTodoListReplacement(
            input.providerTodoLists.map((list) => ({
              userTurnId: list.userTurnId,
              sourceEventId: list.sourceEventId ?? null,
              source: list.source,
              isInferred: list.isInferred,
              todos: list.todos
            })),
            nowMs()
          );
          db.prepare("DELETE FROM todo_lists WHERE conversation_id = ?").run(conversationId);
          const insertTodoList = db.prepare(
            `INSERT INTO todo_lists (
               conversation_id, user_turn_id, source_event_id, source, is_inferred, created_at, updated_at
             ) VALUES (?, ?, ?, ?, ?, ?, ?)`
          );
          const insertTodo = db.prepare(
            "INSERT INTO todos (list_id, position, content, state) VALUES (?, ?, ?, ?)"
          );
          for (const list of plannedTodoLists) {
            const info = insertTodoList.run(
              conversationId,
              list.userTurnId,
              list.sourceEventId,
              list.source,
              list.isInferred,
              list.createdAt,
              list.updatedAt
            );
            const listId = lastInsertId(info);
            for (const todo of list.todos) {
              insertTodo.run(listId, todo.position, todo.content, todo.state);
            }
          }
        }
      });
    },
    async getConversationTitle(ref) {
      const row = db.prepare("SELECT ref, source FROM conversations WHERE ref = ?").get(ref);
      if (!isRow$5(row)) return null;
      const rowRef = stringValue$1(row.ref);
      const source = stringValue$1(row.source);
      if (rowRef === null || source === null) return null;
      return {
        ref: rowRef,
        source
      };
    },
    async getConversationTitleMessages(ref) {
      const conversation = db.prepare("SELECT id FROM conversations WHERE ref = ?").get(ref);
      if (!isRow$5(conversation)) return [];
      const rows2 = db.prepare(
        `SELECT e.kind, e.text, e.timestamp_ms
           FROM events e
           JOIN user_turns t ON t.id = e.user_turn_id
           WHERE t.conversation_id = ?
           ORDER BY t.position, e.position`
      ).all(int$3(conversation.id)).filter(isRow$5);
      return rows2.map((event) => ({
        role: event.kind === "user_text" ? "user" : event.kind === "tool_result" ? "tool" : "assistant",
        text: textOrNull$4(event.text) ?? "",
        timestamp: event.timestamp_ms ? new Date(int$3(event.timestamp_ms)).toISOString() : void 0
      }));
    },
    async setConversationTitle(ref, title, source) {
      db.prepare(
        `UPDATE conversations
         SET title = ?,
             title_source = ?,
             provider_title = CASE WHEN ? = 'provider' THEN ? ELSE provider_title END
         WHERE ref = ?`
      ).run(title, source, source, title, ref);
    },
    async deleteConversationsBySourcePaths(paths) {
      const uniquePaths = [...new Set(paths)];
      if (uniquePaths.length === 0) return 0;
      return runInTransaction$1(db, () => {
        const statement = db.prepare(
          `DELETE FROM conversations
           WHERE source_id IN (SELECT id FROM sources WHERE path = ?)`
        );
        let deleted = 0;
        for (const path of uniquePaths) {
          const result = statement.run(path);
          if (isRow$5(result)) deleted += int$3(result.changes);
        }
        return deleted;
      });
    },
    async markStaleConversationsInactive(cutoffMs) {
      const result = db.prepare(
        `UPDATE conversations
         SET state = 'inactive',
             failure_reason = NULL,
             dismissed_at = NULL,
             state_override_turn_position = NULL,
             ingested_at = ?
         WHERE state NOT IN ('idle', 'inactive', 'needs-approval')
           AND last_activity_ts <= ?`
      ).run(nowMs(), cutoffMs);
      return isRow$5(result) ? int$3(result.changes) : 0;
    },
    async dismissConversation(ref, dismissedAt) {
      db.prepare(
        `UPDATE conversations
         SET dismissed_at = ?,
             state = 'inactive',
             failure_reason = NULL,
             state_override_turn_position = COALESCE(
               (
                 SELECT MAX(position)
                 FROM user_turns
                 WHERE user_turns.conversation_id = conversations.id
               ),
               -1
             )
         WHERE ref = ?`
      ).run(dismissedAt, ref);
    },
    async markConversationIdle(ref) {
      db.prepare(
        `UPDATE conversations
         SET state = 'idle',
             failure_reason = NULL,
             dismissed_at = NULL,
             state_override_turn_position = COALESCE(
               (
                 SELECT MAX(position)
                 FROM user_turns
                 WHERE user_turns.conversation_id = conversations.id
               ),
               -1
             )
         WHERE ref = ?`
      ).run(ref);
    },
    async setConversationState(ref, state, failureReason = null) {
      const result = db.prepare("UPDATE conversations SET state = ?, failure_reason = ? WHERE ref = ?").run(state, state === "failed" ? failureReason : null, ref);
      return isRow$5(result) && int$3(result.changes) > 0;
    },
    async applyLegacyConversationOverrides(overrides) {
      if (overrides.length === 0) return [];
      return runInTransaction$1(db, () => {
        const deferred = [];
        const exists = db.prepare("SELECT 1 FROM conversations WHERE ref = ?");
        const updateTitle = db.prepare(
          "UPDATE conversations SET title = ?, title_source = 'user' WHERE ref = ? AND title_source IS NOT 'user'"
        );
        const updateDismissed = db.prepare(
          "UPDATE conversations SET dismissed_at = ? WHERE ref = ?"
        );
        for (const override of overrides) {
          if (!isRow$5(exists.get(override.ref))) {
            deferred.push(override);
            continue;
          }
          if (override.title) updateTitle.run(override.title, override.ref);
          if (override.dismissedAt !== void 0) {
            updateDismissed.run(override.dismissedAt, override.ref);
          }
        }
        return deferred;
      });
    },
    async countUserTurns(conversationId) {
      const row = db.prepare("SELECT COUNT(*) AS count FROM user_turns WHERE conversation_id = ?").get(conversationId);
      return isRow$5(row) ? int$3(row.count) : 0;
    },
    async listActiveUserTurns() {
      return compactMappedRows$1(
        db.prepare(
          "SELECT * FROM user_turns WHERE state IN ('running', 'needs-approval') ORDER BY started_at DESC"
        ).all(),
        transcriptUserTurnRow
      );
    },
    async replaceConversation(input) {
      return runInTransaction$1(db, () => {
        const now = nowMs();
        const existingProject = db.prepare("SELECT * FROM projects WHERE path = ?").get(input.project.path);
        let projectId;
        if (isRow$5(existingProject)) {
          projectId = int$3(existingProject.id);
          const nextDisplay = input.project.displayPath ?? textOrNull$4(existingProject.display_path);
          const nextGitRemote = input.project.gitRemote ?? textOrNull$4(existingProject.git_remote);
          if (input.project.name !== textOrNull$4(existingProject.name) || nextDisplay !== textOrNull$4(existingProject.display_path) || nextGitRemote !== textOrNull$4(existingProject.git_remote)) {
            db.prepare(
              "UPDATE projects SET name = ?, display_path = ?, git_remote = ? WHERE id = ?"
            ).run(input.project.name, nextDisplay, nextGitRemote, projectId);
          }
        } else {
          const info = db.prepare(
            `INSERT INTO projects (path, name, git_remote, display_path, created_at, updated_at)
               VALUES (?, ?, ?, ?, ?, 0)`
          ).run(
            input.project.path,
            input.project.name,
            input.project.gitRemote ?? null,
            input.project.displayPath ?? null,
            now
          );
          projectId = lastInsertId(info);
        }
        db.prepare("UPDATE projects SET updated_at = ? WHERE id = ? AND updated_at < ?").run(
          input.conversation.lastActivityTs,
          projectId,
          input.conversation.lastActivityTs
        );
        db.prepare(
          `INSERT INTO sources (
             kind, path, last_mtime_ms, last_size, last_byte_offset, last_cursor, last_fetched_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(kind, path) DO UPDATE SET
             last_mtime_ms = excluded.last_mtime_ms,
             last_size = excluded.last_size,
             last_byte_offset = excluded.last_byte_offset,
             last_cursor = excluded.last_cursor,
             last_fetched_at = excluded.last_fetched_at`
        ).run(
          input.sourceCursor.kind,
          input.sourceCursor.path,
          input.sourceCursor.lastMtimeMs ?? null,
          input.sourceCursor.lastSize ?? null,
          input.sourceCursor.lastByteOffset ?? null,
          input.sourceCursor.lastCursor ?? null,
          input.sourceCursor.lastFetchedAt ?? now
        );
        const sourceRow = getRequired(db, "SELECT id FROM sources WHERE kind = ? AND path = ?", [
          input.sourceCursor.kind,
          input.sourceCursor.path
        ]);
        const sourceId = int$3(sourceRow.id);
        if (input.conversation.source === "claude" && input.conversation.ref.startsWith("claude:")) {
          let canonicalConversation = db.prepare(
            `SELECT id, title, title_source, state, dismissed_at, state_override_turn_position
             FROM conversations WHERE ref = ?`
          ).get(input.conversation.ref);
          const aliasRows = db.prepare(
            `SELECT c.id, c.title, c.title_source, c.state, c.dismissed_at,
                    c.state_override_turn_position
             FROM conversations c
             JOIN sources s ON s.id = c.source_id
             WHERE c.source_id = ?
               AND c.source = 'claude'
               AND c.ref <> ?
               AND (c.ref = s.path OR c.ref = ?)`
          ).all(sourceId, input.conversation.ref, input.conversation.externalId ?? "");
          for (const legacyAlias of aliasRows) {
            if (!isRow$5(canonicalConversation) && isRow$5(legacyAlias)) {
              db.prepare("UPDATE conversations SET ref = ? WHERE id = ?").run(
                input.conversation.ref,
                int$3(legacyAlias.id)
              );
              canonicalConversation = db.prepare(
                `SELECT id, title, title_source, state, dismissed_at, state_override_turn_position
                 FROM conversations WHERE ref = ?`
              ).get(input.conversation.ref);
            } else if (isRow$5(canonicalConversation) && isRow$5(legacyAlias)) {
              const transferTitle = canonicalConversation.title_source !== "user" && legacyAlias.title_source === "user";
              const transferState = canonicalConversation.state_override_turn_position == null && canonicalConversation.dismissed_at == null && (legacyAlias.state_override_turn_position != null || legacyAlias.dismissed_at != null);
              if (transferTitle || transferState) {
                db.prepare(
                  `UPDATE conversations
                 SET title = ?, title_source = ?, state = ?, dismissed_at = ?,
                     state_override_turn_position = ?
                 WHERE id = ?`
                ).run(
                  transferTitle ? textOrNull$4(legacyAlias.title) : textOrNull$4(canonicalConversation.title),
                  transferTitle ? "user" : textOrNull$4(canonicalConversation.title_source),
                  transferState ? textOrNull$4(legacyAlias.state) : textOrNull$4(canonicalConversation.state),
                  transferState ? legacyAlias.dismissed_at == null ? null : int$3(legacyAlias.dismissed_at) : canonicalConversation.dismissed_at == null ? null : int$3(canonicalConversation.dismissed_at),
                  transferState ? legacyAlias.state_override_turn_position == null ? null : int$3(legacyAlias.state_override_turn_position) : canonicalConversation.state_override_turn_position == null ? null : int$3(canonicalConversation.state_override_turn_position),
                  int$3(canonicalConversation.id)
                );
              }
              db.prepare("DELETE FROM conversations WHERE id = ?").run(int$3(legacyAlias.id));
            }
          }
        }
        const existingConversation = db.prepare(
          `SELECT id, title, provider_title, title_source, state, dismissed_at,
                    state_override_turn_position, last_activity_ts
             FROM conversations
             WHERE ref = ?`
        ).get(input.conversation.ref);
        if (isRow$5(existingConversation) && !index.shouldReplaceConversationSnapshot(
          int$3(existingConversation.last_activity_ts),
          input.conversation.lastActivityTs
        )) {
          return { conversationId: int$3(existingConversation.id), projectId, sourceId };
        }
        const providerTitleIsSet = Object.prototype.hasOwnProperty.call(input.conversation, "providerTitle") || Object.prototype.hasOwnProperty.call(input.conversation, "title");
        const providerTitle2 = Object.prototype.hasOwnProperty.call(
          input.conversation,
          "providerTitle"
        ) ? input.conversation.providerTitle : input.conversation.title ?? null;
        const titleSource = input.conversation.titleSource ?? (input.conversation.title ? "provider" : null);
        const merged = index.mergeConversationPersistenceState(
          isRow$5(existingConversation) ? {
            title: textOrNull$4(existingConversation.title),
            providerTitle: textOrNull$4(existingConversation.provider_title),
            titleSource: existingConversation.title_source === "provider" || existingConversation.title_source === "llm" || existingConversation.title_source === "user" ? existingConversation.title_source : null,
            state: existingConversation.state === "running" || existingConversation.state === "needs-approval" || existingConversation.state === "finished" || existingConversation.state === "idle" || existingConversation.state === "failed" || existingConversation.state === "inactive" ? existingConversation.state : "running",
            dismissedAt: existingConversation.dismissed_at == null ? null : int$3(existingConversation.dismissed_at),
            stateOverrideTurnPosition: existingConversation.state_override_turn_position == null ? null : int$3(existingConversation.state_override_turn_position)
          } : null,
          {
            title: input.conversation.title ?? null,
            providerTitle: providerTitle2 ?? null,
            titleSource,
            state: input.conversation.state,
            dismissedAt: input.conversation.dismissedAt ?? null,
            stateOverrideTurnPosition: input.conversation.stateOverrideTurnPosition ?? null,
            lastActivityTs: input.conversation.lastActivityTs,
            latestUserTurnPosition: input.conversation.latestUserTurnPosition ?? null,
            providerTitleIsSet
          }
        );
        const activityEventCount = replacementActivityEventCount(input);
        db.prepare(
          `INSERT INTO conversations (
             ref, source, external_id, project_id, source_id,
             workspace, workspace_kind, cwd, branch, entrypoint,
             parent_thread_id, thread_source, subagent_kind,
             title, provider_title, title_source, preview, state, failure_reason, last_kind,
             started_at, last_activity_ts, last_activity, activity_event_count,
             dismissed_at, state_override_turn_position,
             ingested_at, created_at
           ) VALUES (
             ?, ?, ?, ?, ?,
             ?, ?, ?, ?, ?,
             ?, ?, ?,
             ?, ?, ?, ?, ?, ?, ?,
             ?, ?, ?, ?,
             ?, ?,
             ?, ?
           )
           ON CONFLICT(ref) DO UPDATE SET
             source = excluded.source,
             external_id = excluded.external_id,
             project_id = excluded.project_id,
             source_id = excluded.source_id,
             workspace = excluded.workspace,
             workspace_kind = excluded.workspace_kind,
             cwd = excluded.cwd,
             branch = excluded.branch,
             entrypoint = excluded.entrypoint,
             parent_thread_id = excluded.parent_thread_id,
             thread_source = excluded.thread_source,
             subagent_kind = excluded.subagent_kind,
             provider_title = excluded.provider_title,
             title = excluded.title,
             title_source = excluded.title_source,
             preview = excluded.preview,
             state = excluded.state,
             failure_reason = excluded.failure_reason,
             dismissed_at = excluded.dismissed_at,
             state_override_turn_position = excluded.state_override_turn_position,
             last_kind = excluded.last_kind,
             started_at = COALESCE(conversations.started_at, excluded.started_at),
             last_activity_ts = excluded.last_activity_ts,
             last_activity = excluded.last_activity,
             activity_event_count = excluded.activity_event_count,
             ingested_at = excluded.ingested_at`
        ).run(
          input.conversation.ref,
          input.conversation.source,
          input.conversation.externalId ?? null,
          projectId,
          sourceId,
          input.conversation.workspace ?? null,
          input.conversation.workspaceKind ?? null,
          input.conversation.cwd ?? null,
          input.conversation.branch ?? null,
          input.conversation.entrypoint ?? null,
          input.conversation.parentThreadId ?? null,
          input.conversation.threadSource ?? null,
          input.conversation.subagentKind ?? null,
          merged.title,
          merged.providerTitle,
          merged.titleSource,
          input.conversation.preview ?? null,
          merged.state,
          merged.state === "failed" ? input.conversation.failureReason ?? null : null,
          input.conversation.lastKind ?? null,
          input.conversation.startedAt ?? null,
          input.conversation.lastActivityTs,
          input.conversation.lastActivity && hasAnyKey(input.conversation.lastActivity) ? JSON.stringify(input.conversation.lastActivity) : null,
          activityEventCount,
          merged.dismissedAt,
          merged.stateOverrideTurnPosition,
          now,
          now
        );
        const conversationRow = getRequired(db, "SELECT id FROM conversations WHERE ref = ?", [
          input.conversation.ref
        ]);
        const conversationId = int$3(conversationRow.id);
        db.prepare("DELETE FROM tool_calls WHERE conversation_id = ?").run(conversationId);
        db.prepare("DELETE FROM todo_lists WHERE conversation_id = ?").run(conversationId);
        db.prepare(
          `DELETE FROM events
           WHERE user_turn_id IN (SELECT id FROM user_turns WHERE conversation_id = ?)`
        ).run(conversationId);
        db.prepare("DELETE FROM user_turns WHERE conversation_id = ?").run(conversationId);
        const insertTurn = db.prepare(
          `INSERT INTO user_turns (conversation_id, position, prompt, state, started_at, ended_at)
           VALUES (?, ?, ?, ?, ?, ?)`
        );
        for (const turn of input.userTurns) {
          insertTurn.run(
            conversationId,
            turn.position,
            turn.prompt,
            turn.state,
            turn.startedAt ?? null,
            turn.endedAt ?? null
          );
        }
        const turnRows = db.prepare("SELECT id, position FROM user_turns WHERE conversation_id = ?").all(conversationId).filter(isRow$5);
        const turnIdByPosition = /* @__PURE__ */ new Map();
        for (const row of turnRows) turnIdByPosition.set(int$3(row.position), int$3(row.id));
        const withMessageIds = hasEventMessageIds();
        const insertEvent = db.prepare(
          withMessageIds ? `INSERT INTO events (user_turn_id, position, kind, text, timestamp_ms, message_id)
               VALUES (?, ?, ?, ?, ?, ?)` : `INSERT INTO events (user_turn_id, position, kind, text, timestamp_ms)
               VALUES (?, ?, ?, ?, ?)`
        );
        for (const event of input.events) {
          const userTurnId = turnIdByPosition.get(event.userTurnPosition);
          if (userTurnId === void 0) continue;
          const values = [
            userTurnId,
            event.position,
            event.kind,
            event.text ?? null,
            event.timestampMs ?? null
          ];
          if (withMessageIds) insertEvent.run(...values, event.messageId ?? null);
          else insertEvent.run(...values);
        }
        const eventRows = db.prepare(
          `SELECT e.id, e.user_turn_id, e.position
             FROM events e
             JOIN user_turns t ON t.id = e.user_turn_id
             WHERE t.conversation_id = ?`
        ).all(conversationId).filter(isRow$5);
        const eventIdByTurnAndPosition = /* @__PURE__ */ new Map();
        for (const row of eventRows) {
          eventIdByTurnAndPosition.set(
            `${int$3(row.user_turn_id)}\0${int$3(row.position)}`,
            int$3(row.id)
          );
        }
        const eventIdBySourcePosition = /* @__PURE__ */ new Map();
        for (const event of input.events) {
          if (event.sourcePosition == null) continue;
          const userTurnId = turnIdByPosition.get(event.userTurnPosition);
          if (userTurnId === void 0) continue;
          const eventId = eventIdByTurnAndPosition.get(`${userTurnId}\0${event.position}`);
          if (eventId !== void 0) eventIdBySourcePosition.set(event.sourcePosition, eventId);
        }
        const insertToolCall = db.prepare(
          `INSERT INTO tool_calls (
             conversation_id, event_id, tool_use_id, name, input_json, result_text,
             is_error, started_at_ms, ended_at_ms
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        for (const toolCall of input.toolCalls) {
          insertToolCall.run(
            conversationId,
            toolCall.sourceEventPosition == null ? null : eventIdBySourcePosition.get(toolCall.sourceEventPosition) ?? null,
            toolCall.toolUseId ?? null,
            toolCall.name,
            toolCall.input === void 0 ? null : JSON.stringify(toolCall.input),
            toolCall.resultText ?? null,
            toolCall.isError ? 1 : 0,
            toolCall.startedAtMs ?? null,
            toolCall.endedAtMs ?? null
          );
        }
        const toolCallRows = db.prepare("SELECT id, tool_use_id FROM tool_calls WHERE conversation_id = ?").all(conversationId).filter(isRow$5);
        const toolCallIdByToolUseId = /* @__PURE__ */ new Map();
        for (const row of toolCallRows) {
          const toolUseId = textOrNull$4(row.tool_use_id);
          if (toolUseId) toolCallIdByToolUseId.set(toolUseId, int$3(row.id));
        }
        const linkToolResultEvent = db.prepare(
          `UPDATE events
           SET tool_call_id = ?
           WHERE id = ? AND kind = 'tool_result'`
        );
        for (const toolCall of input.toolCalls) {
          if (!toolCall.toolUseId || toolCall.resultEventPosition == null) continue;
          const toolCallId = toolCallIdByToolUseId.get(toolCall.toolUseId);
          const resultEventId = eventIdBySourcePosition.get(toolCall.resultEventPosition);
          if (toolCallId === void 0 || resultEventId === void 0) continue;
          linkToolResultEvent.run(toolCallId, resultEventId);
        }
        const plannedTodoLists = index.planConversationTodoListReplacement(
          input.todoLists.flatMap((list) => {
            const userTurnId = turnIdByPosition.get(list.userTurnPosition);
            if (userTurnId === void 0) return [];
            return [
              {
                userTurnId,
                sourceEventId: list.sourceEventPosition == null ? null : eventIdBySourcePosition.get(list.sourceEventPosition) ?? null,
                source: list.source,
                isInferred: list.isInferred,
                todos: list.todos
              }
            ];
          }),
          nowMs()
        );
        const insertTodoList = db.prepare(
          `INSERT INTO todo_lists (
             conversation_id, user_turn_id, source_event_id, source, is_inferred, created_at, updated_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        );
        const insertTodo = db.prepare(
          "INSERT INTO todos (list_id, position, content, state) VALUES (?, ?, ?, ?)"
        );
        for (const list of plannedTodoLists) {
          const info = insertTodoList.run(
            conversationId,
            list.userTurnId,
            list.sourceEventId,
            list.source,
            list.isInferred,
            list.createdAt,
            list.updatedAt
          );
          const listId = lastInsertId(info);
          for (const todo of list.todos) {
            insertTodo.run(listId, todo.position, todo.content, todo.state);
          }
        }
        return { conversationId, projectId, sourceId };
      });
    }
  };
}
const LEGACY_CREATOR_AGENT_VERSION_ID = "legacy-3-step-workflow";
function creatorStamp(improveNamespace, input) {
  return input?.creatorAgentVersionId ?? improveNamespace();
}
function uniquePositiveIds(ids) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const value of ids) {
    const id = Math.floor(Number(value));
    if (!Number.isFinite(id) || id <= 0 || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}
function isRow$4(value) {
  return typeof value === "object" && value !== null;
}
function numberValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  return null;
}
function stringValue(value) {
  return typeof value === "string" ? value : null;
}
function nullableNumberValue(value) {
  return value == null ? null : numberValue(value);
}
function nullableStringValue(value) {
  return value == null ? null : stringValue(value);
}
function int$2(value) {
  return numberValue(value) ?? 0;
}
function textOrNull$3(value) {
  return nullableStringValue(value);
}
function sqliteFlag(value) {
  const n = numberValue(value);
  return n === 0 || n === 1 ? n : null;
}
function compactMappedRows(values, mapper) {
  return values.map(mapper).filter((row) => row !== null);
}
function tableExists$1(db, table) {
  const row = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(table);
  return isRow$4(row);
}
function columnExists$1(db, table, column) {
  try {
    return db.prepare(`PRAGMA table_info('${table}')`).all().some((row) => {
      return isRow$4(row) && row.name === column;
    });
  } catch {
    return false;
  }
}
function requireMappedRow(value, mapper, message) {
  const row = mapper(value);
  if (!row) throw new Error(message);
  return row;
}
function desktopInsightRunRow(value) {
  if (!isRow$4(value)) return null;
  const id = numberValue(value.id);
  const schemaVersion = numberValue(value.schema_version);
  const conversationId = numberValue(value.conversation_id);
  const provider = stringValue(value.provider);
  const harnessId = stringValue(value.harness_id);
  const promptHash = stringValue(value.prompt_hash);
  const transcriptHash = stringValue(value.transcript_hash);
  const status = stringValue(value.status);
  const createdAt = numberValue(value.created_at);
  if (id === null || schemaVersion === null || conversationId === null || provider === null || harnessId === null || promptHash === null || transcriptHash === null || status === null || createdAt === null) {
    return null;
  }
  return {
    id,
    schema_version: schemaVersion,
    conversation_id: conversationId,
    provider,
    harness_id: harnessId,
    model: nullableStringValue(value.model),
    prompt_hash: promptHash,
    transcript_hash: transcriptHash,
    status,
    stage: nullableStringValue(value.stage),
    exit_code: nullableNumberValue(value.exit_code),
    stdout_snippet: nullableStringValue(value.stdout_snippet),
    stderr_snippet: nullableStringValue(value.stderr_snippet),
    json_output: nullableStringValue(value.json_output),
    parse_error: nullableStringValue(value.parse_error),
    duration_ms: nullableNumberValue(value.duration_ms),
    usage_json: nullableStringValue(value.usage_json),
    task_type: nullableStringValue(value.task_type),
    project_path: nullableStringValue(value.project_path),
    created_at: createdAt,
    finished_at: nullableNumberValue(value.finished_at)
  };
}
function desktopSignalClusterRow(value) {
  if (!isRow$4(value)) return null;
  const id = numberValue(value.id);
  const schemaVersion = numberValue(value.schema_version);
  const normalizedKey = stringValue(value.normalized_key);
  const canonicalSummary = stringValue(value.canonical_summary);
  const status = stringValue(value.status);
  const signalCount = numberValue(value.signal_count);
  const conversationCount = numberValue(value.conversation_count);
  const projectCount = numberValue(value.project_count);
  const harnessesJson = stringValue(value.harnesses_json);
  const highPainConversationCount = numberValue(value.high_pain_conversation_count);
  const dismissedCount = numberValue(value.dismissed_count);
  const firstSeenAt = numberValue(value.first_seen_at);
  const lastSeenAt = numberValue(value.last_seen_at);
  if (id === null || schemaVersion === null || normalizedKey === null || canonicalSummary === null || status === null || signalCount === null || conversationCount === null || projectCount === null || harnessesJson === null || highPainConversationCount === null || dismissedCount === null || firstSeenAt === null || lastSeenAt === null) {
    return null;
  }
  return {
    id,
    schema_version: schemaVersion,
    creator_agent_version_id: stringValue(value.creator_agent_version_id) ?? LEGACY_CREATOR_AGENT_VERSION_ID,
    normalized_key: normalizedKey,
    canonical_summary: canonicalSummary,
    status,
    signal_count: signalCount,
    conversation_count: conversationCount,
    project_count: projectCount,
    harnesses_json: harnessesJson,
    tags_json: stringValue(value.tags_json) ?? "[]",
    high_pain_conversation_count: highPainConversationCount,
    dismissed_count: dismissedCount,
    first_seen_at: firstSeenAt,
    last_seen_at: lastSeenAt,
    promoted_at: nullableNumberValue(value.promoted_at)
  };
}
function desktopSignalRow(value) {
  if (!isRow$4(value)) return null;
  const id = numberValue(value.id);
  const schemaVersion = numberValue(value.schema_version);
  const runId = numberValue(value.run_id);
  const conversationId = numberValue(value.conversation_id);
  const kind = stringValue(value.kind);
  const normalizedKey = stringValue(value.normalized_key);
  const summary = stringValue(value.summary);
  const evidenceJson = stringValue(value.evidence_json);
  const setupRefsJson = stringValue(value.setup_refs_json);
  const scope = stringValue(value.scope);
  const observedHarness = stringValue(value.observed_harness);
  const harnessApplicabilityJson = stringValue(value.harness_applicability_json);
  const painScore = numberValue(value.pain_score);
  const confidence = numberValue(value.confidence);
  const createdAt = numberValue(value.created_at);
  const signalType2 = stringValue(value.type);
  if (id === null || schemaVersion === null || runId === null || conversationId === null || kind === null || normalizedKey === null || summary === null || evidenceJson === null || setupRefsJson === null || scope === null || observedHarness === null || harnessApplicabilityJson === null || painScore === null || confidence === null || createdAt === null) {
    return null;
  }
  return {
    id,
    schema_version: schemaVersion,
    run_id: runId,
    conversation_id: conversationId,
    creator_agent_version_id: stringValue(value.creator_agent_version_id) ?? LEGACY_CREATOR_AGENT_VERSION_ID,
    ...signalType2 ? { type: signalType2 } : {},
    kind,
    normalized_key: normalizedKey,
    summary,
    evidence_json: evidenceJson,
    setup_refs_json: setupRefsJson,
    setup_mismatch_json: nullableStringValue(value.setup_mismatch_json),
    scope,
    observed_harness: observedHarness,
    harness_applicability_json: harnessApplicabilityJson,
    pain_score: painScore,
    confidence,
    tags_json: stringValue(value.tags_json) ?? "[]",
    created_at: createdAt
  };
}
function desktopInsightHarnessCallRow(value) {
  if (!isRow$4(value)) return null;
  const id = numberValue(value.id);
  const runId = numberValue(value.run_id);
  const tokenEstimate = numberValue(value.token_estimate);
  if (id === null || runId === null || tokenEstimate === null) return null;
  return {
    id,
    run_id: runId,
    phase: stringValue(value.phase) ?? "",
    cluster_id: nullableNumberValue(value.cluster_id),
    provider: stringValue(value.provider) ?? "",
    harness_id: stringValue(value.harness_id) ?? "",
    model: nullableStringValue(value.model),
    prompt: stringValue(value.prompt) ?? "",
    stdout: nullableStringValue(value.stdout),
    stderr: nullableStringValue(value.stderr),
    json_output: nullableStringValue(value.json_output),
    parse_error: nullableStringValue(value.parse_error),
    exit_code: nullableNumberValue(value.exit_code),
    timed_out: sqliteFlag(value.timed_out) ?? 0,
    duration_ms: nullableNumberValue(value.duration_ms),
    prompt_chars: numberValue(value.prompt_chars) ?? 0,
    output_chars: numberValue(value.output_chars) ?? 0,
    token_estimate: tokenEstimate,
    created_at: numberValue(value.created_at) ?? 0
  };
}
function desktopSuggestionRow(value) {
  if (!isRow$4(value)) return null;
  const id = numberValue(value.id);
  const schemaVersion = numberValue(value.schema_version);
  const clusterId = numberValue(value.cluster_id);
  const title = stringValue(value.title);
  const summary = stringValue(value.summary);
  const operationsJson = stringValue(value.operations_json);
  const evidenceJson = stringValue(value.evidence_json);
  const status = stringValue(value.status);
  const createdAt = numberValue(value.created_at);
  const updatedAt = numberValue(value.updated_at);
  if (id === null || schemaVersion === null || clusterId === null || title === null || summary === null || operationsJson === null || evidenceJson === null || status === null || createdAt === null || updatedAt === null) {
    return null;
  }
  return {
    id,
    schema_version: schemaVersion,
    cluster_id: clusterId,
    run_id: nullableNumberValue(value.run_id),
    creator_agent_version_id: stringValue(value.creator_agent_version_id) ?? LEGACY_CREATOR_AGENT_VERSION_ID,
    title,
    summary,
    feedback_reasons_json: nullableStringValue(value.feedback_reasons_json),
    operations_json: operationsJson,
    evidence_json: evidenceJson,
    status,
    snoozed_until: nullableNumberValue(value.snoozed_until),
    apply_result_json: nullableStringValue(value.apply_result_json),
    hidden_at: nullableNumberValue(value.hidden_at),
    hidden_reason: nullableStringValue(value.hidden_reason),
    hidden_until: nullableNumberValue(value.hidden_until),
    last_shown_at: nullableNumberValue(value.last_shown_at),
    shown_count: numberValue(value.shown_count) ?? 0,
    created_at: createdAt,
    updated_at: updatedAt
  };
}
function desktopSignalClusterDuplicateCandidateRow(value) {
  if (!isRow$4(value)) return null;
  const id = numberValue(value.id);
  const clusterIdsJson = stringValue(value.cluster_ids_json);
  const reason = stringValue(value.reason);
  const confidence = numberValue(value.confidence);
  const status = stringValue(value.status);
  const createdAt = numberValue(value.created_at);
  if (id === null || clusterIdsJson === null || reason === null || confidence === null || status === null || createdAt === null) {
    return null;
  }
  return {
    id,
    cluster_ids_json: clusterIdsJson,
    reason,
    confidence,
    status,
    created_at: createdAt
  };
}
function projectAuditFromRow(value, agentVersionId) {
  return {
    project_path: stringValue(value.project_path) ?? "",
    agent_version_id: stringValue(value.agent_version_id) ?? agentVersionId,
    setup_state_hash: stringValue(value.setup_state_hash) ?? "",
    conversations_seen_count: int$2(value.conversations_seen_count),
    last_run_id: nullableStringValue(value.last_run_id),
    last_run_at: int$2(value.last_run_at),
    audit_count: int$2(value.audit_count)
  };
}
function runViewFromRow(value) {
  if (!isRow$4(value)) return null;
  const row = value;
  const run = desktopInsightRunRow(row);
  if (!run) return null;
  return {
    run,
    conversationRef: textOrNull$3(row.conversation_ref),
    conversationTitle: textOrNull$3(row.conversation_title),
    projectPath: run.project_path ?? textOrNull$3(row.conversation_project_path) ?? textOrNull$3(row.conversation_cwd),
    signalCount: int$2(row.signal_count),
    clusterCount: int$2(row.cluster_count),
    suggestionCount: int$2(row.suggestion_count),
    tokenEstimate: int$2(row.token_estimate)
  };
}
const RUN_VIEW_SELECT = `
  SELECT
    r.*,
    c.ref AS conversation_ref,
    c.title AS conversation_title,
    c.cwd AS conversation_cwd,
    p.path AS conversation_project_path,
    (SELECT COUNT(*) FROM signals s WHERE s.run_id = r.id) AS signal_count,
    (
      SELECT COUNT(DISTINCT m.cluster_id)
      FROM signal_cluster_members m
      JOIN signals s ON s.id = m.signal_id
      WHERE s.run_id = r.id
    ) AS cluster_count,
    (SELECT COUNT(*) FROM suggestions su WHERE su.run_id = r.id) AS suggestion_count,
    (
      SELECT COALESCE(SUM(h.token_estimate), 0)
      FROM insight_harness_calls h
      WHERE h.run_id = r.id
    ) AS token_estimate
  FROM insight_runs r
  LEFT JOIN conversations c ON c.id = r.conversation_id
  LEFT JOIN projects p ON p.id = c.project_id
`;
function recomputeSignalClusterStats(db, clusterId, highPainScore) {
  const agg = db.prepare(
    `SELECT
         COUNT(*) AS signal_count,
         COUNT(DISTINCT s.conversation_id) AS conversation_count,
         COUNT(DISTINCT c.project_id) AS project_count,
         MIN(s.created_at) AS first_seen,
         MAX(s.created_at) AS last_seen
       FROM signal_cluster_members m
       JOIN signals s ON s.id = m.signal_id
       LEFT JOIN conversations c ON c.id = s.conversation_id
       WHERE m.cluster_id = ?`
  ).get(clusterId);
  const stats = isRow$4(agg) ? {
    signalCount: int$2(agg.signal_count),
    conversationCount: int$2(agg.conversation_count),
    projectCount: int$2(agg.project_count),
    firstSeen: agg.first_seen == null ? null : int$2(agg.first_seen),
    lastSeen: agg.last_seen == null ? null : int$2(agg.last_seen)
  } : {
    signalCount: 0,
    conversationCount: 0,
    projectCount: 0,
    firstSeen: null,
    lastSeen: null
  };
  const harnessRows = db.prepare(
    `SELECT DISTINCT s.observed_harness AS h
       FROM signal_cluster_members m
       JOIN signals s ON s.id = m.signal_id
       WHERE m.cluster_id = ?`
  ).all(clusterId).filter(isRow$4);
  const harnesses = harnessRows.map((row) => textOrNull$3(row.h)).filter(Boolean);
  const highPain = db.prepare(
    `SELECT COUNT(DISTINCT s.conversation_id) AS n
       FROM signal_cluster_members m
       JOIN signals s ON s.id = m.signal_id
       WHERE m.cluster_id = ? AND s.pain_score >= ?`
  ).get(clusterId, highPainScore);
  const highPainConversationCount = isRow$4(highPain) ? int$2(highPain.n) : 0;
  const now = Date.now();
  db.prepare(
    `UPDATE signal_clusters
     SET signal_count = ?, conversation_count = ?, project_count = ?,
         harnesses_json = ?, high_pain_conversation_count = ?,
         first_seen_at = COALESCE(?, first_seen_at),
         last_seen_at = ?
     WHERE id = ?`
  ).run(
    stats.signalCount,
    stats.conversationCount,
    stats.projectCount,
    JSON.stringify(harnesses),
    highPainConversationCount,
    stats.firstSeen,
    stats.lastSeen ?? now,
    clusterId
  );
}
function replaceSuggestionClusters(db, suggestionId, clusterIds) {
  if (!tableExists$1(db, "suggestion_clusters")) return;
  const ids = uniquePositiveIds(clusterIds);
  const now = Date.now();
  db.exec("BEGIN IMMEDIATE");
  try {
    db.prepare("DELETE FROM suggestion_clusters WHERE suggestion_id = ?").run(suggestionId);
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO suggestion_clusters (suggestion_id, cluster_id, created_at)
       VALUES (?, ?, ?)`
    );
    for (const clusterId of ids) stmt.run(suggestionId, clusterId, now);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
function createDesktopImproveStore(db, options) {
  const creatorAgentVersionId = (input) => creatorStamp(options.improveNamespace, input);
  const creatorReadScope = (hasColumn2, filter) => {
    const creator = filter?.creatorAgentVersionId;
    if (!creator) return { clause: "", params: [], empty: false };
    if (!hasColumn2)
      return { clause: "", params: [], empty: creator !== LEGACY_CREATOR_AGENT_VERSION_ID };
    return { clause: "creator_agent_version_id = ?", params: [creator], empty: false };
  };
  const signalsHaveType = columnExists$1(db, "signals", "type");
  const signalsHaveCreator = columnExists$1(db, "signals", "creator_agent_version_id");
  const signalsHaveTags = columnExists$1(db, "signals", "tags_json");
  let searchFunctionsReady = false;
  const ensureSearchFunctions = () => {
    if (searchFunctionsReady) return;
    if (!db.function)
      throw Error("This SQLite driver cannot provide deterministic Improve search functions");
    db.function(
      "blume_improve_fold",
      { deterministic: true },
      (value) => typeof value === "string" ? value.toLowerCase() : ""
    );
    db.function(
      "blume_improve_tags",
      { deterministic: true },
      (value) => insights$1.improveSearchProjection("", "", typeof value === "string" ? value : "").tags
    );
    searchFunctionsReady = true;
  };
  const clustersHaveCreator = columnExists$1(db, "signal_clusters", "creator_agent_version_id");
  const clustersHaveTags = columnExists$1(db, "signal_clusters", "tags_json");
  const suggestionsHaveCreator = columnExists$1(db, "suggestions", "creator_agent_version_id");
  const suggestionsHaveHidden = columnExists$1(db, "suggestions", "hidden_at");
  const suggestionsHaveFeedbackReasons = columnExists$1(db, "suggestions", "feedback_reasons_json");
  return {
    async markConversationReadByAgent(input) {
      const readAt = input.readAt ?? Date.now();
      db.prepare(
        `INSERT INTO insight_agent_conversation_reads (
           conversation_id, agent_version_id, transcript_hash,
           conversation_activity_ts, last_processed_message_position, read_at, read_count
         ) VALUES (?, ?, ?, ?, ?, ?, 1)
         ON CONFLICT (conversation_id, agent_version_id) DO UPDATE SET
           transcript_hash = excluded.transcript_hash,
           conversation_activity_ts = excluded.conversation_activity_ts,
           last_processed_message_position = excluded.last_processed_message_position,
           read_at = excluded.read_at,
           read_count = insight_agent_conversation_reads.read_count + 1`
      ).run(
        input.conversationId,
        input.agentVersionId,
        input.transcriptHash ?? null,
        input.conversationActivityTs,
        input.lastProcessedMessagePosition ?? null,
        readAt
      );
    },
    async getConversationReadByAgent(conversationId, agentVersionId) {
      const value = db.prepare(
        `SELECT conversation_id, agent_version_id, transcript_hash,
                  conversation_activity_ts, last_processed_message_position, read_at, read_count
           FROM insight_agent_conversation_reads
           WHERE conversation_id = ? AND agent_version_id = ?`
      ).get(conversationId, agentVersionId);
      if (!isRow$4(value)) return null;
      return {
        conversation_id: String(int$2(value.conversation_id)),
        agent_version_id: stringValue(value.agent_version_id) ?? agentVersionId,
        transcript_hash: nullableStringValue(value.transcript_hash),
        conversation_activity_ts: int$2(value.conversation_activity_ts),
        last_processed_message_position: nullableNumberValue(value.last_processed_message_position),
        read_at: int$2(value.read_at),
        read_count: int$2(value.read_count)
      };
    },
    async countConversationReadsByAgent(agentVersionId) {
      const value = agentVersionId ? db.prepare(
        `SELECT COUNT(DISTINCT conversation_id) AS count
               FROM insight_agent_conversation_reads
               WHERE agent_version_id = ?`
      ).get(agentVersionId) : db.prepare(
        `SELECT COUNT(DISTINCT conversation_id) AS count
               FROM insight_agent_conversation_reads`
      ).get();
      return isRow$4(value) ? int$2(value.count) : 0;
    },
    async conversationNeedsAgentRead(conversationId, agentVersionId, conversationActivityTs, latestMessagePosition) {
      const read = await this.getConversationReadByAgent(conversationId, agentVersionId);
      if (!read) return true;
      return latestMessagePosition != null && (read.last_processed_message_position ?? -1) < latestMessagePosition || read.conversation_activity_ts < conversationActivityTs;
    },
    async getProjectAudit(projectPath, agentVersionId) {
      const value = db.prepare(
        `SELECT project_path, agent_version_id, setup_state_hash,
                  conversations_seen_count, last_run_id, last_run_at, audit_count
           FROM insight_project_audits
           WHERE project_path = ? AND agent_version_id = ?`
      ).get(projectPath, agentVersionId);
      if (!isRow$4(value)) return null;
      return projectAuditFromRow(value, agentVersionId);
    },
    async listProjectAudits(agentVersionId) {
      const rows2 = db.prepare(
        `SELECT project_path, agent_version_id, setup_state_hash,
                  conversations_seen_count, last_run_id, last_run_at, audit_count
           FROM insight_project_audits
           WHERE agent_version_id = ?
           ORDER BY last_run_at DESC`
      ).all(agentVersionId);
      return rows2.filter(isRow$4).map((row) => projectAuditFromRow(row, agentVersionId));
    },
    async upsertProjectAudit(input) {
      const lastRunAt = input.lastRunAt ?? Date.now();
      db.prepare(
        `INSERT INTO insight_project_audits (
           project_path, agent_version_id, setup_state_hash,
           conversations_seen_count, last_run_id, last_run_at, audit_count
         ) VALUES (?, ?, ?, ?, ?, ?, 1)
         ON CONFLICT (project_path, agent_version_id) DO UPDATE SET
           setup_state_hash = excluded.setup_state_hash,
           conversations_seen_count = excluded.conversations_seen_count,
           last_run_id = excluded.last_run_id,
           last_run_at = excluded.last_run_at,
           audit_count = insight_project_audits.audit_count + 1`
      ).run(
        input.projectPath,
        input.agentVersionId,
        input.setupStateHash,
        input.conversationsSeenCount,
        input.lastRunId ?? null,
        lastRunAt
      );
    },
    async createInsightRun(input) {
      const now = Date.now();
      const info = db.prepare(
        `INSERT INTO insight_runs
            (schema_version, conversation_id, provider, harness_id, model,
             prompt_hash, transcript_hash, status, stage, task_type, project_path, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        insights$1.INSIGHTS_SCHEMA_VERSION,
        input.conversationId,
        input.provider,
        input.harnessId,
        input.model ?? null,
        input.promptHash,
        input.transcriptHash,
        input.status,
        input.stage ?? null,
        input.taskType ?? null,
        input.projectPath ?? null,
        now
      );
      const id = isRow$4(info) ? int$2(info.lastInsertRowid) : 0;
      const row = db.prepare("SELECT * FROM insight_runs WHERE id = ?").get(id);
      return requireMappedRow(
        row,
        desktopInsightRunRow,
        "Inserted insight run could not be read back"
      );
    },
    async getInsightRunView(runId) {
      const row = db.prepare(`${RUN_VIEW_SELECT} WHERE r.id = ?`).get(runId);
      return isRow$4(row) ? runViewFromRow(row) : null;
    },
    async listInsightRunViews(limit = 25, offset = 0) {
      return db.prepare(`${RUN_VIEW_SELECT} ORDER BY r.id DESC LIMIT ? OFFSET ?`).all(limit, offset).map(runViewFromRow).filter((row) => row !== null);
    },
    async findSucceededInsightRun(conversationId, transcriptHash) {
      const row = db.prepare(
        `SELECT * FROM insight_runs
           WHERE conversation_id = ? AND transcript_hash = ? AND status = 'succeeded'
           ORDER BY id DESC LIMIT 1`
      ).get(conversationId, transcriptHash);
      return desktopInsightRunRow(row);
    },
    async updateInsightRun(id, patch) {
      const sets = [];
      const params = [];
      const map = {
        status: patch.status,
        stage: patch.stage,
        exit_code: patch.exitCode,
        stdout_snippet: patch.stdoutSnippet,
        stderr_snippet: patch.stderrSnippet,
        json_output: patch.jsonOutput,
        parse_error: patch.parseError,
        duration_ms: patch.durationMs,
        usage_json: patch.usageJson,
        finished_at: patch.finishedAt
      };
      for (const [column, value] of Object.entries(map)) {
        if (value !== void 0) {
          sets.push(`${column} = ?`);
          params.push(value);
        }
      }
      if (sets.length === 0) return;
      params.push(id);
      db.prepare(`UPDATE insight_runs SET ${sets.join(", ")} WHERE id = ?`).run(...params);
    },
    async searchSignalClusters(query) {
      const scope = creatorReadScope(clustersHaveCreator, query);
      if (scope.empty) return [];
      ensureSearchFunctions();
      const { where, params } = insights$1.improveSearchWhere(
        {
          ...query,
          creatorAgentVersionId: clustersHaveCreator ? query.creatorAgentVersionId : void 0
        },
        {
          text: "blume_improve_fold(COALESCE(normalized_key, '') || ' ' || COALESCE(canonical_summary, ''))",
          tags: `blume_improve_tags(${clustersHaveTags ? "tags_json" : "'[]'"})`
        }
      );
      const eligibility = [
        where.slice(7),
        ...query.status ? ["status = ?"] : [],
        ...query.candidates ? ["status IN ('open', 'promoted')"] : []
      ].filter(Boolean);
      if (query.status) params.push(query.status);
      let score = "0";
      if (query.candidates) {
        const weights = insights$1.improveCandidateWeights(query.candidates);
        db.function(
          "blume_improve_score",
          { deterministic: true },
          (key, summary, harnesses) => insights$1.improveCandidateScore(
            {
              normalized_key: stringValue(key) ?? "",
              canonical_summary: stringValue(summary) ?? "",
              harnesses_json: stringValue(harnesses) ?? "[]"
            },
            weights
          )
        );
        score = "blume_improve_score(normalized_key, canonical_summary, harnesses_json)";
      }
      return compactMappedRows(
        db.prepare(
          `WITH ranked AS (SELECT *, ${score} AS candidate_score FROM signal_clusters${eligibility.length ? " WHERE " + eligibility.join(" AND ") : ""}) SELECT * FROM ranked ${query.candidates ? "WHERE candidate_score > 0" : ""} ORDER BY candidate_score DESC, last_seen_at DESC, id ASC LIMIT ?`
        ).all(...params, Math.max(0, Math.trunc(query.limit))),
        desktopSignalClusterRow
      );
    },
    async listSignalClusters(status, filter) {
      const scope = creatorReadScope(clustersHaveCreator, filter);
      if (scope.empty) return [];
      const clauses = [];
      const params = [];
      if (status) {
        clauses.push("status = ?");
        params.push(status);
      }
      if (scope.clause) {
        clauses.push(scope.clause);
        params.push(...scope.params);
      }
      const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
      return compactMappedRows(
        db.prepare(`SELECT * FROM signal_clusters${where} ORDER BY last_seen_at DESC`).all(...params),
        desktopSignalClusterRow
      );
    },
    async listSignalClustersByNormalizedKey(normalizedKey, filter) {
      const scope = creatorReadScope(clustersHaveCreator, filter);
      if (scope.empty) return [];
      const extra = scope.clause ? ` AND ${scope.clause}` : "";
      return compactMappedRows(
        db.prepare(`SELECT * FROM signal_clusters WHERE normalized_key = ?${extra}`).all(normalizedKey, ...scope.params),
        desktopSignalClusterRow
      );
    },
    async createSignalCluster(input) {
      const now = Date.now();
      const columns = [
        "schema_version",
        ...clustersHaveCreator ? ["creator_agent_version_id"] : [],
        "normalized_key",
        "canonical_summary",
        "status",
        "signal_count",
        "conversation_count",
        "project_count",
        "harnesses_json",
        ...clustersHaveTags ? ["tags_json"] : [],
        "high_pain_conversation_count",
        "dismissed_count",
        "first_seen_at",
        "last_seen_at"
      ];
      const params = [
        insights$1.INSIGHTS_SCHEMA_VERSION,
        ...clustersHaveCreator ? [creatorAgentVersionId(input)] : [],
        input.normalizedKey,
        input.canonicalSummary,
        input.status ?? "open",
        0,
        0,
        0,
        "[]",
        ...clustersHaveTags ? [input.tagsJson ?? "[]"] : [],
        0,
        0,
        now,
        now
      ];
      const info = db.prepare(
        `INSERT INTO signal_clusters (${columns.join(", ")})
           VALUES (${columns.map(() => "?").join(", ")})`
      ).run(...params);
      const id = isRow$4(info) ? int$2(info.lastInsertRowid) : 0;
      const row = db.prepare("SELECT * FROM signal_clusters WHERE id = ?").get(id);
      return requireMappedRow(
        row,
        desktopSignalClusterRow,
        "Inserted signal cluster could not be read back"
      );
    },
    async addSignalClusterMember(clusterId, signalId, matchReason) {
      if (signalsHaveCreator && clustersHaveCreator) {
        const ownership = db.prepare(
          `SELECT
               c.creator_agent_version_id AS cluster_creator,
               s.creator_agent_version_id AS signal_creator
             FROM signal_clusters c
             JOIN signals s ON s.id = ?
             WHERE c.id = ?`
        ).get(signalId, clusterId);
        if (!isRow$4(ownership))
          throw new Error(`Cluster ${clusterId} or signal ${signalId} not found`);
        if (stringValue(ownership.cluster_creator) !== stringValue(ownership.signal_creator)) {
          throw new Error(
            "Cannot assign a signal to a cluster created by a different agent version"
          );
        }
      }
      db.prepare(
        `INSERT OR IGNORE INTO signal_cluster_members (cluster_id, signal_id, match_reason)
         VALUES (?, ?, ?)`
      ).run(clusterId, signalId, matchReason);
    },
    async recomputeSignalClusterStats(clusterId, highPainScore) {
      recomputeSignalClusterStats(db, clusterId, highPainScore);
    },
    async clearPriorRunSignals(conversationId, transcriptHash, exceptRunId, highPainScore) {
      const sigRows = db.prepare(
        `SELECT s.id AS id FROM signals s
           JOIN insight_runs r ON r.id = s.run_id
           WHERE s.conversation_id = ? AND r.transcript_hash = ? AND s.run_id != ?`
      ).all(conversationId, transcriptHash, exceptRunId).filter(isRow$4);
      if (sigRows.length === 0) return 0;
      const signalIds = sigRows.map((row) => int$2(row.id));
      const placeholders2 = signalIds.map(() => "?").join(",");
      db.exec("BEGIN IMMEDIATE");
      try {
        const clusterRows = db.prepare(
          `SELECT DISTINCT cluster_id AS id FROM signal_cluster_members
             WHERE signal_id IN (${placeholders2})`
        ).all(...signalIds).filter(isRow$4);
        const clusterIds = clusterRows.map((row) => int$2(row.id));
        db.prepare(`DELETE FROM signal_cluster_members WHERE signal_id IN (${placeholders2})`).run(
          ...signalIds
        );
        db.prepare(`DELETE FROM signals WHERE id IN (${placeholders2})`).run(...signalIds);
        for (const clusterId of clusterIds) {
          recomputeSignalClusterStats(db, clusterId, highPainScore);
        }
        db.exec("COMMIT");
        return signalIds.length;
      } catch (err) {
        db.exec("ROLLBACK");
        throw err;
      }
    },
    async listClusterMemberSignals(clusterId, filter) {
      const scope = creatorReadScope(signalsHaveCreator, filter);
      if (scope.empty) return [];
      const extra = scope.clause ? ` AND s.${scope.clause}` : "";
      return compactMappedRows(
        db.prepare(
          `SELECT s.* FROM signal_cluster_members m
             JOIN signals s ON s.id = m.signal_id
             WHERE m.cluster_id = ?${extra} ORDER BY s.id`
        ).all(clusterId, ...scope.params),
        desktopSignalRow
      );
    },
    async insertSignal(input) {
      const columns = [
        "schema_version",
        "run_id",
        "conversation_id",
        ...signalsHaveCreator ? ["creator_agent_version_id"] : [],
        ...signalsHaveType ? ["type"] : [],
        "kind",
        "normalized_key",
        "summary",
        "evidence_json",
        "setup_refs_json",
        "setup_mismatch_json",
        "scope",
        "observed_harness",
        "harness_applicability_json",
        "pain_score",
        "confidence",
        ...signalsHaveTags ? ["tags_json"] : [],
        "created_at"
      ];
      const params = [
        insights$1.INSIGHTS_SCHEMA_VERSION,
        input.runId,
        input.conversationId,
        ...signalsHaveCreator ? [creatorAgentVersionId(input)] : [],
        ...signalsHaveType ? [input.signalType ?? null] : [],
        input.kind,
        input.normalizedKey,
        input.summary,
        input.evidenceJson,
        input.setupRefsJson,
        input.setupMismatchJson ?? null,
        input.scope,
        input.observedHarness,
        input.harnessApplicabilityJson,
        input.painScore,
        input.confidence,
        ...signalsHaveTags ? [input.tagsJson ?? "[]"] : [],
        Date.now()
      ];
      const info = db.prepare(
        `INSERT INTO signals (${columns.join(", ")})
           VALUES (${columns.map(() => "?").join(", ")})`
      ).run(...params);
      const id = isRow$4(info) ? int$2(info.lastInsertRowid) : 0;
      const row = db.prepare("SELECT * FROM signals WHERE id = ?").get(id);
      return requireMappedRow(row, desktopSignalRow, "Inserted signal could not be read back");
    },
    async searchSignals(query) {
      const scope = creatorReadScope(signalsHaveCreator, query);
      if (scope.empty) return [];
      ensureSearchFunctions();
      const { where, params } = insights$1.improveSearchWhere(
        {
          ...query,
          creatorAgentVersionId: signalsHaveCreator ? query.creatorAgentVersionId : void 0
        },
        {
          text: "blume_improve_fold(COALESCE(normalized_key, '') || ' ' || COALESCE(summary, ''))",
          tags: `blume_improve_tags(${signalsHaveTags ? "tags_json" : "'[]'"})`
        }
      );
      return compactMappedRows(
        db.prepare(`SELECT * FROM signals${where} ORDER BY created_at DESC, id DESC LIMIT ?`).all(...params, Math.max(0, Math.trunc(query.limit))),
        desktopSignalRow
      );
    },
    async getSignalsByIds(ids, filter) {
      if (!ids.length) return [];
      const scope = creatorReadScope(signalsHaveCreator, filter);
      if (scope.empty) return [];
      const extra = scope.clause ? ` AND ${scope.clause}` : "";
      return compactMappedRows(
        db.prepare(
          `SELECT * FROM signals WHERE id IN (SELECT value FROM json_each(?))${extra} ORDER BY id DESC`
        ).all(JSON.stringify(ids), ...scope.params),
        desktopSignalRow
      );
    },
    async listRecentSignals(limit = 100, filter) {
      const scope = creatorReadScope(signalsHaveCreator, filter);
      if (scope.empty) return [];
      const where = scope.clause ? ` WHERE ${scope.clause}` : "";
      return compactMappedRows(
        db.prepare(`SELECT * FROM signals${where} ORDER BY id DESC LIMIT ?`).all(...scope.params, limit),
        desktopSignalRow
      );
    },
    async listSignalsByNormalizedKey(normalizedKey, filter) {
      const scope = creatorReadScope(signalsHaveCreator, filter);
      if (scope.empty) return [];
      const extra = scope.clause ? ` AND ${scope.clause}` : "";
      return compactMappedRows(
        db.prepare(`SELECT * FROM signals WHERE normalized_key = ?${extra} ORDER BY id DESC`).all(normalizedKey, ...scope.params),
        desktopSignalRow
      );
    },
    async listSignalsByConversation(conversationId) {
      return compactMappedRows(
        db.prepare("SELECT * FROM signals WHERE conversation_id = ? ORDER BY id DESC").all(conversationId),
        desktopSignalRow
      );
    },
    async listSignalsByRun(runId) {
      return compactMappedRows(
        db.prepare("SELECT * FROM signals WHERE run_id = ? ORDER BY id").all(runId),
        desktopSignalRow
      );
    },
    async insertHarnessCall(input) {
      const info = db.prepare(
        `INSERT INTO insight_harness_calls
            (run_id, phase, cluster_id, provider, harness_id, model, prompt, stdout, stderr,
             json_output, parse_error, exit_code, timed_out, duration_ms,
             prompt_chars, output_chars, token_estimate, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        input.runId,
        input.phase,
        input.clusterId ?? null,
        input.provider,
        input.harnessId,
        input.model ?? null,
        input.prompt,
        input.stdout ?? null,
        input.stderr ?? null,
        input.jsonOutput ?? null,
        input.parseError ?? null,
        input.exitCode ?? null,
        input.timedOut ? 1 : 0,
        input.durationMs ?? null,
        input.promptChars,
        input.outputChars,
        input.tokenEstimate,
        Date.now()
      );
      const id = isRow$4(info) ? int$2(info.lastInsertRowid) : 0;
      const row = db.prepare("SELECT * FROM insight_harness_calls WHERE id = ?").get(id);
      return requireMappedRow(
        row,
        desktopInsightHarnessCallRow,
        "Inserted insight harness call could not be read back"
      );
    },
    async listHarnessCallsByRun(runId) {
      return compactMappedRows(
        db.prepare("SELECT * FROM insight_harness_calls WHERE run_id = ? ORDER BY id").all(runId),
        desktopInsightHarnessCallRow
      );
    },
    async listClustersTouchedByRun(runId) {
      return compactMappedRows(
        db.prepare(
          `SELECT DISTINCT c.* FROM signal_clusters c
             JOIN signal_cluster_members m ON m.cluster_id = c.id
             JOIN signals s ON s.id = m.signal_id
             WHERE s.run_id = ? ORDER BY c.last_seen_at DESC`
        ).all(runId),
        desktopSignalClusterRow
      );
    },
    async listSuggestionsByRun(runId) {
      return compactMappedRows(
        db.prepare("SELECT * FROM suggestions WHERE run_id = ? ORDER BY id DESC").all(runId),
        desktopSuggestionRow
      );
    },
    async insertSuggestion(input) {
      const now = Date.now();
      const clusterIds = uniquePositiveIds([...input.clusterIds ?? [], input.clusterId]);
      const primaryClusterId = clusterIds[0] ?? input.clusterId;
      const columns = [
        "schema_version",
        "cluster_id",
        "run_id",
        ...suggestionsHaveCreator ? ["creator_agent_version_id"] : [],
        "title",
        "summary",
        ...suggestionsHaveFeedbackReasons ? ["feedback_reasons_json"] : [],
        "operations_json",
        "evidence_json",
        "status",
        "created_at",
        "updated_at"
      ];
      const params = [
        insights$1.INSIGHTS_SCHEMA_VERSION,
        primaryClusterId,
        input.runId ?? null,
        ...suggestionsHaveCreator ? [creatorAgentVersionId(input)] : [],
        input.title,
        input.summary,
        ...suggestionsHaveFeedbackReasons ? [input.feedbackReasons ? JSON.stringify(input.feedbackReasons) : null] : [],
        input.operationsJson,
        input.evidenceJson,
        input.status ?? "active",
        now,
        now
      ];
      const info = db.prepare(
        `INSERT INTO suggestions (${columns.join(", ")})
           VALUES (${columns.map(() => "?").join(", ")})`
      ).run(...params);
      const id = isRow$4(info) ? int$2(info.lastInsertRowid) : 0;
      const row = db.prepare("SELECT * FROM suggestions WHERE id = ?").get(id);
      const suggestion = requireMappedRow(
        row,
        desktopSuggestionRow,
        "Inserted suggestion could not be read back"
      );
      replaceSuggestionClusters(db, suggestion.id, clusterIds);
      return suggestion;
    },
    async getSuggestion(id) {
      const row = db.prepare("SELECT * FROM suggestions WHERE id = ?").get(id);
      return desktopSuggestionRow(row);
    },
    async getSuggestionClusterIds(id) {
      if (!tableExists$1(db, "suggestion_clusters")) return [];
      return db.prepare(
        "SELECT cluster_id FROM suggestion_clusters WHERE suggestion_id = ? ORDER BY cluster_id"
      ).all(id).flatMap((row) => {
        const clusterId = isRow$4(row) ? int$2(row.cluster_id) : 0;
        return clusterId > 0 ? [clusterId] : [];
      });
    },
    async listVisibleSuggestions(now = Date.now()) {
      const where = suggestionsHaveHidden ? insights$1.VISIBLE_SUGGESTIONS_WHERE : `status IN ('active', 'needs_review')
      OR (status = 'snoozed' AND snoozed_until IS NOT NULL AND snoozed_until <= ?)`;
      return db.prepare(`SELECT * FROM suggestions WHERE ${where} ORDER BY updated_at DESC`).all(...suggestionsHaveHidden ? [now, now] : [now]).map(desktopSuggestionRow).filter((row) => row !== null);
    },
    async failOrphanedInsightRuns(input) {
      const result = db.prepare(
        `UPDATE insight_runs
           SET status = 'failed', parse_error = ?, finished_at = ?
           WHERE status IN ('queued', 'running')`
      ).run(input.reason, input.finishedAt);
      return Number(result.changes ?? 0);
    },
    async listPendingSuggestionClusterRefs() {
      const statuses = `('draft', 'active', 'needs_review', 'snoozed')`;
      const creatorColumn = suggestionsHaveCreator ? "s.creator_agent_version_id" : "NULL";
      const linkRows = tableExists$1(db, "suggestion_clusters") ? db.prepare(
        `SELECT sc.cluster_id AS cluster_id, ${creatorColumn} AS creator
               FROM suggestion_clusters sc JOIN suggestions s ON s.id = sc.suggestion_id
               WHERE s.status IN ${statuses}`
      ).all() : [];
      const primaryRows = db.prepare(
        `SELECT s.cluster_id AS cluster_id, ${creatorColumn} AS creator
           FROM suggestions s WHERE s.status IN ${statuses}`
      ).all();
      const refs = [];
      for (const raw of [...primaryRows, ...linkRows]) {
        if (!isRow$4(raw)) continue;
        const clusterId = numberValue(raw.cluster_id);
        if (clusterId === null) continue;
        const creator = stringValue(raw.creator);
        refs.push({
          cluster_id: clusterId,
          ...creator ? { creator_agent_version_id: creator } : {}
        });
      }
      return refs;
    },
    async listResolvedSuggestions(now = Date.now()) {
      const where = suggestionsHaveHidden ? insights$1.RESOLVED_SUGGESTIONS_WHERE : `status IN ('applied', 'dismissed', 'archived')
      OR (status = 'snoozed' AND snoozed_until IS NOT NULL AND snoozed_until > ?)`;
      return db.prepare(`SELECT * FROM suggestions WHERE ${where} ORDER BY updated_at DESC`).all(...suggestionsHaveHidden ? [now, now] : [now]).map(desktopSuggestionRow).filter((row) => row !== null);
    },
    async updateSuggestion(id, patch) {
      const sets = [];
      const params = [];
      if (patch.status !== void 0) {
        sets.push("status = ?");
        params.push(patch.status);
      }
      if (patch.snoozedUntil !== void 0) {
        sets.push("snoozed_until = ?");
        params.push(patch.snoozedUntil);
      }
      if (patch.applyResultJson !== void 0) {
        sets.push("apply_result_json = ?");
        params.push(patch.applyResultJson);
      }
      if (patch.title !== void 0) {
        sets.push("title = ?");
        params.push(patch.title);
      }
      if (patch.summary !== void 0) {
        sets.push("summary = ?");
        params.push(patch.summary);
      }
      if (suggestionsHaveFeedbackReasons && patch.feedbackReasonsJson !== void 0) {
        sets.push("feedback_reasons_json = ?");
        params.push(patch.feedbackReasonsJson);
      }
      if (patch.operationsJson !== void 0) {
        sets.push("operations_json = ?");
        params.push(patch.operationsJson);
      }
      if (patch.evidenceJson !== void 0) {
        sets.push("evidence_json = ?");
        params.push(patch.evidenceJson);
      }
      if (patch.clusterIds !== void 0) {
        const [primaryClusterId] = uniquePositiveIds(patch.clusterIds);
        if (primaryClusterId) {
          sets.push("cluster_id = ?");
          params.push(primaryClusterId);
        }
      }
      sets.push("updated_at = ?");
      params.push(Date.now());
      params.push(id);
      db.prepare(`UPDATE suggestions SET ${sets.join(", ")} WHERE id = ?`).run(...params);
      if (patch.clusterIds !== void 0) {
        replaceSuggestionClusters(db, id, patch.clusterIds);
      }
    },
    async getSignalCluster(id, filter) {
      const row = db.prepare("SELECT * FROM signal_clusters WHERE id = ?").get(id);
      const mapped = desktopSignalClusterRow(row);
      const creator = filter?.creatorAgentVersionId;
      if (mapped && creator && mapped.creator_agent_version_id !== creator) return null;
      return mapped;
    },
    async listSignalClusterDuplicateCandidates() {
      return db.prepare("SELECT * FROM signal_cluster_duplicate_candidates ORDER BY id DESC").all().map(desktopSignalClusterDuplicateCandidateRow).filter((row) => row !== null);
    },
    async insertSignalClusterDuplicateCandidate(input) {
      db.prepare(
        `INSERT INTO signal_cluster_duplicate_candidates
          (cluster_ids_json, reason, confidence, status, created_at)
         VALUES (?, ?, ?, 'open', ?)`
      ).run(JSON.stringify(input.clusterIds), input.reason, input.confidence, Date.now());
    },
    async setSignalClusterStatus(id, status, promotedAt) {
      if (promotedAt !== void 0) {
        db.prepare("UPDATE signal_clusters SET status = ?, promoted_at = ? WHERE id = ?").run(
          status,
          promotedAt,
          id
        );
        return;
      }
      db.prepare("UPDATE signal_clusters SET status = ? WHERE id = ?").run(status, id);
    },
    async incrementSignalClusterDismissed(id) {
      db.prepare(
        "UPDATE signal_clusters SET dismissed_count = dismissed_count + 1 WHERE id = ?"
      ).run(id);
    },
    async decrementSignalClusterDismissed(id) {
      db.prepare(
        "UPDATE signal_clusters SET dismissed_count = MAX(0, dismissed_count - 1) WHERE id = ?"
      ).run(id);
    }
  };
}
const initial = `-- Blume local DB. Source of truth for everything the app surfaces;
-- conversation rows are projected from on-disk JSONL via the ingestion
-- pipeline (see @blume/app-core conversation ingest runtime).
--
-- All timestamps are unix epoch milliseconds (Date.now()) unless suffixed
-- otherwise. Text fields use TEXT (utf8); JSON payloads are stored as TEXT
-- containing JSON for application-level decode.

CREATE TABLE meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Auto-created on conversation ingest, keyed by the canonical absolute
-- path of the project root (the directory above any tooling marker like
-- .claude / .git / .cursor). Different worktrees / harnesses of the same
-- repo share this path and therefore one row — they show up as different
-- conversations under one project, not as separate projects.
--
-- \`name\` is the display leaf (basename of \`path\`); the user can rename it
-- without breaking the upsert because identity is \`path\`. \`git_remote\` is
-- recorded for future cross-machine identity work but not used as a key
-- yet (left null in v0).
CREATE TABLE projects (
  id           INTEGER PRIMARY KEY,
  path         TEXT NOT NULL UNIQUE,
  name         TEXT NOT NULL,
  git_remote   TEXT,
  display_path TEXT,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);
CREATE INDEX idx_projects_name ON projects (name);

CREATE TABLE conversations (
  id                INTEGER PRIMARY KEY,
  ref               TEXT NOT NULL UNIQUE,
  source            TEXT NOT NULL,                     -- harness id: claude / cursor / codex / pi / omp
  external_id       TEXT,
  project_id        INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  workspace         TEXT,                              -- worktree / sub-context id; null when conv runs from project root
  workspace_kind    TEXT,                              -- tooling dir that introduced the workspace (".claude", ".git", …)
  cwd               TEXT,
  branch            TEXT,
  entrypoint        TEXT,
  title             TEXT,
  title_source      TEXT,                              -- 'provider' | 'llm' | 'user'
  preview           TEXT,
  state             TEXT NOT NULL,                     -- 'running' | 'needs-approval' | 'finished' | 'idle' | 'failed' | 'inactive'
  last_kind         TEXT,
  started_at        INTEGER,
  last_activity_ts  INTEGER NOT NULL,
  -- ---- Denormalized UI cache (display only) --------------------------
  -- Populated by the ingest in the same transaction as the source events.
  -- Lets the agents-list card render without joins. JSON shape (all keys
  -- optional):
  --   { user_message?:      string, user_message_ts?:      number,
  --     assistant_message?: string, assistant_message_ts?: number,
  --     tool_call?:         string, tool_call_ts?:         number,
  --     tool_result?:       string, tool_result_ts?:       number }
  -- Drift is impossible by construction: one writer, one tx.
  last_activity     TEXT,                              -- JSON; null when empty
  -- --------------------------------------------------------------------
  dismissed_at      INTEGER,
  source_path       TEXT,
  source_mtime_ms   INTEGER,
  source_size       INTEGER,
  source_bytes_parsed INTEGER,
  ingested_at       INTEGER NOT NULL,
  created_at        INTEGER NOT NULL
);
CREATE INDEX idx_conversations_state_activity ON conversations (state, last_activity_ts DESC);
CREATE INDEX idx_conversations_project ON conversations (project_id);
CREATE INDEX idx_conversations_source ON conversations (source);
CREATE INDEX idx_conversations_source_path ON conversations (source_path);

-- Chronological event log within an agent run. Renamed from \`messages\`;
-- the rename is semantic — these aren't just chat messages, they're every
-- observable thing the agent emitted in one run.
--
-- \`agent_run_id\` is the owning run. Conversation membership is reachable
-- via \`agent_runs.conversation_id\` — no duplicated FK on the event row.
--
-- \`kind\` discriminates: 'user_text' (a user message), 'assistant_text'
-- (an assistant text block), 'tool_result' (a tool result that came
-- back). Tool USES (the assistant asking to run a tool) are not their
-- own event row in v0 — the assistant message that contained them is
-- the event; the structured payload lives in tool_calls and joins back
-- via \`tool_calls.event_id\`.
--
-- \`position\` is run-scoped, monotonic, source-line order. The tuple
-- (agent_run_id, position) is unique. Ordering by position is the
-- canonical transcript order; \`timestamp_ms\` is wall-clock data only,
-- not authoritative (tool_result events may share timestamps with their
-- parent assistant message).
CREATE TABLE events (
  id              INTEGER PRIMARY KEY,
  agent_run_id    INTEGER NOT NULL REFERENCES agent_runs(id) ON DELETE CASCADE,
  position        INTEGER NOT NULL,
  kind            TEXT NOT NULL,                    -- 'user_text' | 'assistant_text' | 'tool_result'
  text            TEXT,
  timestamp_ms    INTEGER,
  UNIQUE (agent_run_id, position)
);
CREATE INDEX idx_events_run_pos ON events (agent_run_id, position);

CREATE TABLE tool_calls (
  id              INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  event_id        INTEGER REFERENCES events(id) ON DELETE SET NULL,
  tool_use_id     TEXT,
  name            TEXT NOT NULL,
  input_json      TEXT,
  result_text     TEXT,
  is_error        INTEGER NOT NULL DEFAULT 0,
  started_at_ms   INTEGER,
  ended_at_ms     INTEGER
);
CREATE INDEX idx_tool_calls_conv    ON tool_calls (conversation_id);
CREATE INDEX idx_tool_calls_use_id  ON tool_calls (conversation_id, tool_use_id);
CREATE INDEX idx_tool_calls_name    ON tool_calls (name);
CREATE INDEX idx_tool_calls_event   ON tool_calls (event_id);

-- One row per cycle of agent processing in a conversation. A run is
-- triggered by either a user message (kind='user_turn') or a parent
-- tool_use that spawned this conversation as a sub-agent
-- (kind='sub_agent_spawn'). Approval pauses stay inside one run; a fresh
-- user message opens a new run.
--
-- \`position\` is sequential per conversation; the tuple
-- (conversation_id, position) is unique. We never order by started_at
-- alone — runs can be fast back-to-back in programmatic flows.
--
-- \`parent_tool_use_id\` is null for user_turn runs. For sub_agent_spawn
-- runs it carries the tool_use_id of the Task/Agent tool call that
-- spawned this run — a string FK into the tool_calls table within the
-- same conversation. Read "parent" as "predecessor / triggering": the
-- tool_use came first, this run is what it produced. Stored as a string
-- (not an INTEGER FK) because cross-file ingest ordering is not
-- guaranteed.
--
-- \`title\` is null for user_turn (no spawn description); set to the
-- spawning tool call's \`description\` for sub_agent_spawn. The UI uses
-- it for the sub-agent chip label.
--
-- \`prompt\` is the input that started the run: the user's message text
-- for user_turn, the full spawn prompt for sub_agent_spawn.
--
-- \`position\` is conversation-scoped and assigned in source-line order;
-- user_turn and sub_agent_spawn rows share the position space so the
-- "what happened next" timeline is structurally captured.
CREATE TABLE agent_runs (
  id                 INTEGER PRIMARY KEY,
  conversation_id    INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  position           INTEGER NOT NULL,
  kind               TEXT NOT NULL,                 -- 'user_turn' | 'sub_agent_spawn'
  parent_tool_use_id TEXT,
  title              TEXT,
  prompt             TEXT NOT NULL,
  state              TEXT NOT NULL,
  started_at         INTEGER,
  ended_at           INTEGER,
  UNIQUE (conversation_id, position)
);
CREATE INDEX idx_agent_runs_conv_pos ON agent_runs (conversation_id, position);
CREATE INDEX idx_agent_runs_kind     ON agent_runs (kind);

-- Append-only versioned todo lists. Each \`TodoWrite\` call in a conversation
-- emits a new row in \`todo_lists\` (the harnesses' TodoWrite API takes a
-- complete list snapshot, not item-level patches — so a "new list" is the
-- natural representation). The previous list's \`superseded_at\` gets set to
-- the new list's \`created_at\` at ingest time. Active list = the row where
-- \`superseded_at IS NULL\`.
--
-- Bonus: keeping every version gives us the trajectory of any todo for
-- free — query historic lists to see "task X was pending in list 3,
-- current in list 5, done in list 8."
CREATE TABLE todo_lists (
  id              INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  source_event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
  created_at      INTEGER NOT NULL,
  superseded_at   INTEGER                    -- null = currently active
);
CREATE INDEX idx_todo_lists_conv_active ON todo_lists (conversation_id, superseded_at);

CREATE TABLE todos (
  id        INTEGER PRIMARY KEY,
  list_id   INTEGER NOT NULL REFERENCES todo_lists(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL,
  content   TEXT NOT NULL,
  state     TEXT NOT NULL,                   -- 'pending' | 'current' | 'done'
  UNIQUE (list_id, position)
);
CREATE INDEX idx_todos_list_pos ON todos (list_id, position);

-- Reserved for canonical agentic_setup_artifacts + agentic_setup_artifact_versions
-- in a follow-up migration. The previous prototype table (\`setup_files\`) was
-- removed because it stored Blume's own install log under a name that would
-- collide with the canonical artifact identity table.

CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;
const todoListRunSource = `ALTER TABLE todo_lists ADD COLUMN agent_run_id INTEGER REFERENCES agent_runs(id) ON DELETE SET NULL;
ALTER TABLE todo_lists ADD COLUMN source TEXT NOT NULL DEFAULT 'transcript';
CREATE INDEX idx_todo_lists_run ON todo_lists (agent_run_id);
`;
const sources = `CREATE TABLE sources (
  id               INTEGER PRIMARY KEY,
  kind             TEXT NOT NULL,
  path             TEXT NOT NULL,
  last_mtime_ms    INTEGER,
  last_size        INTEGER,
  last_byte_offset INTEGER,
  last_cursor      TEXT,
  last_fetched_at  INTEGER,
  UNIQUE (kind, path)
);
CREATE INDEX idx_sources_kind_path ON sources (kind, path);

INSERT INTO sources (
  kind, path, last_mtime_ms, last_size, last_byte_offset, last_cursor, last_fetched_at
)
SELECT
  source,
  source_path,
  MAX(source_mtime_ms),
  MAX(source_size),
  MAX(source_bytes_parsed),
  NULL,
  MAX(ingested_at)
FROM conversations
WHERE source_path IS NOT NULL
GROUP BY source, source_path;

CREATE TABLE conversations_new (
  id                INTEGER PRIMARY KEY,
  ref               TEXT NOT NULL UNIQUE,
  source            TEXT NOT NULL,
  external_id       TEXT,
  project_id        INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  source_id         INTEGER REFERENCES sources(id) ON DELETE SET NULL,
  workspace         TEXT,
  workspace_kind    TEXT,
  cwd               TEXT,
  branch            TEXT,
  entrypoint        TEXT,
  title             TEXT,
  title_source      TEXT,
  preview           TEXT,
  state             TEXT NOT NULL,
  last_kind         TEXT,
  started_at        INTEGER,
  last_activity_ts  INTEGER NOT NULL,
  last_activity     TEXT,
  dismissed_at      INTEGER,
  ingested_at       INTEGER NOT NULL,
  created_at        INTEGER NOT NULL
);

INSERT INTO conversations_new (
  id, ref, source, external_id, project_id, source_id,
  workspace, workspace_kind, cwd, branch, entrypoint,
  title, title_source, preview, state, last_kind,
  started_at, last_activity_ts, last_activity,
  dismissed_at, ingested_at, created_at
)
SELECT
  c.id,
  c.ref,
  c.source,
  c.external_id,
  c.project_id,
  s.id,
  c.workspace,
  c.workspace_kind,
  c.cwd,
  c.branch,
  c.entrypoint,
  c.title,
  c.title_source,
  c.preview,
  c.state,
  c.last_kind,
  c.started_at,
  c.last_activity_ts,
  c.last_activity,
  c.dismissed_at,
  c.ingested_at,
  c.created_at
FROM conversations c
LEFT JOIN sources s ON s.kind = c.source AND s.path = c.source_path;

DROP TABLE conversations;
ALTER TABLE conversations_new RENAME TO conversations;

CREATE INDEX idx_conversations_state_activity ON conversations (state, last_activity_ts DESC);
CREATE INDEX idx_conversations_project ON conversations (project_id);
CREATE INDEX idx_conversations_source ON conversations (source);
CREATE INDEX idx_conversations_source_id ON conversations (source_id);
`;
const userTurns = `CREATE TABLE user_turns (
  id              INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  position        INTEGER NOT NULL,
  prompt          TEXT NOT NULL,
  state           TEXT NOT NULL,
  started_at      INTEGER,
  ended_at        INTEGER,
  UNIQUE (conversation_id, position)
);

INSERT INTO user_turns (
  id, conversation_id, position, prompt, state, started_at, ended_at
)
SELECT
  r.id,
  r.conversation_id,
  (
    SELECT COUNT(*)
    FROM agent_runs prior
    WHERE prior.conversation_id = r.conversation_id
      AND prior.kind = 'user_turn'
      AND prior.position < r.position
  ) AS position,
  r.prompt,
  r.state,
  r.started_at,
  r.ended_at
FROM agent_runs r
WHERE r.kind = 'user_turn';

CREATE TABLE events_new (
  id              INTEGER PRIMARY KEY,
  user_turn_id    INTEGER NOT NULL REFERENCES user_turns(id) ON DELETE CASCADE,
  position        INTEGER NOT NULL,
  kind            TEXT NOT NULL,
  text            TEXT,
  timestamp_ms    INTEGER,
  UNIQUE (user_turn_id, position)
);

INSERT INTO events_new (id, user_turn_id, position, kind, text, timestamp_ms)
SELECT e.id, e.agent_run_id, e.position, e.kind, e.text, e.timestamp_ms
FROM events e
JOIN user_turns ut ON ut.id = e.agent_run_id;

DROP TABLE events;
ALTER TABLE events_new RENAME TO events;
CREATE INDEX idx_events_turn_pos ON events (user_turn_id, position);

CREATE TEMP TABLE todo_list_candidates AS
SELECT
  tl.id AS old_list_id,
  tl.conversation_id,
  COALESCE(
    ut.id,
    (
      SELECT latest.id
      FROM user_turns latest
      WHERE latest.conversation_id = tl.conversation_id
      ORDER BY latest.position DESC
      LIMIT 1
    )
  ) AS user_turn_id,
  tl.source_event_id,
  tl.source,
  tl.created_at,
  CASE WHEN ut.id IS NULL THEN 1 ELSE 0 END AS is_inferred
FROM todo_lists tl
LEFT JOIN user_turns ut ON ut.id = tl.agent_run_id;

CREATE TABLE todo_lists_new (
  id              INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_turn_id    INTEGER NOT NULL REFERENCES user_turns(id) ON DELETE CASCADE,
  source_event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
  source          TEXT NOT NULL DEFAULT 'transcript',
  is_inferred     INTEGER NOT NULL DEFAULT 0,
  created_at      INTEGER NOT NULL,
  updated_at      INTEGER NOT NULL,
  UNIQUE (user_turn_id)
);

INSERT INTO todo_lists_new (
  id, conversation_id, user_turn_id, source_event_id, source,
  is_inferred, created_at, updated_at
)
SELECT
  c.old_list_id,
  c.conversation_id,
  c.user_turn_id,
  c.source_event_id,
  c.source,
  c.is_inferred,
  c.created_at,
  c.created_at
FROM todo_list_candidates c
WHERE c.user_turn_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM todo_list_candidates newer
    WHERE newer.user_turn_id = c.user_turn_id
      AND (
        newer.created_at > c.created_at OR
        (newer.created_at = c.created_at AND newer.old_list_id > c.old_list_id)
      )
  );

CREATE TABLE todos_new (
  id        INTEGER PRIMARY KEY,
  list_id   INTEGER NOT NULL REFERENCES todo_lists_new(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL,
  content   TEXT NOT NULL,
  state     TEXT NOT NULL,
  UNIQUE (list_id, position)
);

INSERT INTO todos_new (id, list_id, position, content, state)
SELECT t.id, t.list_id, t.position, t.content, t.state
FROM todos t
JOIN todo_lists_new tl ON tl.id = t.list_id;

DROP TABLE todos;
DROP TABLE todo_lists;
ALTER TABLE todo_lists_new RENAME TO todo_lists;
ALTER TABLE todos_new RENAME TO todos;

CREATE INDEX idx_todo_lists_conv_turn ON todo_lists (conversation_id, user_turn_id);
CREATE INDEX idx_todo_lists_turn ON todo_lists (user_turn_id);
CREATE INDEX idx_todos_list_pos ON todos (list_id, position);

DROP TABLE todo_list_candidates;
DROP TABLE agent_runs;

CREATE INDEX idx_user_turns_conv_pos ON user_turns (conversation_id, position);
CREATE INDEX idx_user_turns_state ON user_turns (state);
`;
const stateOverrides = `ALTER TABLE conversations ADD COLUMN state_override_turn_position INTEGER;

UPDATE conversations
SET state_override_turn_position = COALESCE(
  (
    SELECT MAX(position)
    FROM user_turns
    WHERE user_turns.conversation_id = conversations.id
  ),
  -1
)
WHERE state = 'idle'
  OR (state = 'inactive' AND dismissed_at IS NOT NULL);
`;
const appUsageIntervals = `CREATE TABLE app_usage_intervals (
  id                      INTEGER PRIMARY KEY,
  started_at_ms           INTEGER NOT NULL,
  ended_at_ms             INTEGER NOT NULL,
  process_running_seconds INTEGER NOT NULL,
  window_visible_seconds  INTEGER NOT NULL,
  week_start              TEXT NOT NULL,
  local_day_of_week       TEXT NOT NULL,
  local_hour              INTEGER NOT NULL,
  timezone                TEXT NOT NULL,
  sent_at_ms              INTEGER,
  created_at              INTEGER NOT NULL
);

CREATE INDEX idx_app_usage_intervals_unsent ON app_usage_intervals (sent_at_ms, created_at);
CREATE INDEX idx_app_usage_intervals_week ON app_usage_intervals (week_start);
`;
const repairAppUsageIntervals = `CREATE TABLE IF NOT EXISTS app_usage_intervals (
  id                      INTEGER PRIMARY KEY,
  started_at_ms           INTEGER NOT NULL,
  ended_at_ms             INTEGER NOT NULL,
  process_running_seconds INTEGER NOT NULL,
  window_visible_seconds  INTEGER NOT NULL,
  week_start              TEXT NOT NULL,
  local_day_of_week       TEXT NOT NULL,
  local_hour              INTEGER NOT NULL,
  timezone                TEXT NOT NULL,
  sent_at_ms              INTEGER,
  created_at              INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_app_usage_intervals_unsent ON app_usage_intervals (sent_at_ms, created_at);
CREATE INDEX IF NOT EXISTS idx_app_usage_intervals_week ON app_usage_intervals (week_start);
`;
const toolResultEventLink = `ALTER TABLE events ADD COLUMN tool_call_id INTEGER REFERENCES tool_calls(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_events_tool_call_id ON events (tool_call_id);
`;
const codexSessionParent = `ALTER TABLE conversations ADD COLUMN parent_thread_id TEXT;
ALTER TABLE conversations ADD COLUMN thread_source TEXT;
ALTER TABLE conversations ADD COLUMN subagent_kind TEXT;

CREATE INDEX idx_conversations_parent_thread ON conversations (source, parent_thread_id);
`;
const providerTitle = `ALTER TABLE conversations ADD COLUMN provider_title TEXT;

UPDATE conversations
SET provider_title = title
WHERE title_source = 'provider' AND title IS NOT NULL;
`;
const conversationFailureReason = `ALTER TABLE conversations ADD COLUMN failure_reason TEXT;
`;
const insights = `-- Signal-Based Suggestions V1.
-- Learns reusable "signals" from completed conversations, clusters them, and
-- promotes strong clusters into user-visible suggestions that can patch
-- guidance artifacts. See apps/desktop/plans/SIGNAL_BASED_SUGGESTIONS_V1.md.

CREATE TABLE insight_runs (
  id INTEGER PRIMARY KEY,
  schema_version INTEGER NOT NULL,
  conversation_id INTEGER NOT NULL,
  provider TEXT NOT NULL,
  harness_id TEXT NOT NULL,
  model TEXT,
  prompt_hash TEXT NOT NULL,
  transcript_hash TEXT NOT NULL,
  status TEXT NOT NULL,          -- queued | running | succeeded | failed
  stage TEXT,                    -- building-packet | extracting | retrieving | clustering | promoting | planning | done
  exit_code INTEGER,
  stdout_snippet TEXT,
  stderr_snippet TEXT,
  json_output TEXT,
  parse_error TEXT,
  duration_ms INTEGER,
  created_at INTEGER NOT NULL,
  finished_at INTEGER
);

CREATE TABLE signals (
  id INTEGER PRIMARY KEY,
  schema_version INTEGER NOT NULL,
  run_id INTEGER NOT NULL REFERENCES insight_runs(id) ON DELETE CASCADE,
  conversation_id INTEGER NOT NULL,
  kind TEXT NOT NULL,
  normalized_key TEXT NOT NULL,
  summary TEXT NOT NULL,
  evidence_json TEXT NOT NULL,
  setup_refs_json TEXT NOT NULL,
  setup_mismatch_json TEXT,
  scope TEXT NOT NULL,
  observed_harness TEXT NOT NULL,
  harness_applicability_json TEXT NOT NULL,
  pain_score INTEGER NOT NULL,
  confidence REAL NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE signal_clusters (
  id INTEGER PRIMARY KEY,
  schema_version INTEGER NOT NULL,
  normalized_key TEXT NOT NULL,
  canonical_summary TEXT NOT NULL,
  status TEXT NOT NULL,          -- open | promoted | planned | dismissed | archived
  -- The *_count / harnesses_json columns below are denormalized aggregates over
  -- signal_cluster_members, kept for cheap reads on the list/promotion paths.
  -- They are the single source of truth for promotion thresholds and are always
  -- rebuilt from membership by the shared SQLite Improve storage adapter
  -- whenever members change — never incremented ad hoc — so they stay in sync.
  signal_count INTEGER NOT NULL,
  conversation_count INTEGER NOT NULL,
  project_count INTEGER NOT NULL,
  harnesses_json TEXT NOT NULL,
  high_pain_conversation_count INTEGER NOT NULL,
  dismissed_count INTEGER NOT NULL DEFAULT 0,
  first_seen_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  promoted_at INTEGER
);

CREATE TABLE signal_cluster_members (
  cluster_id INTEGER NOT NULL REFERENCES signal_clusters(id) ON DELETE CASCADE,
  signal_id INTEGER NOT NULL REFERENCES signals(id) ON DELETE CASCADE,
  match_reason TEXT NOT NULL,
  PRIMARY KEY (cluster_id, signal_id)
);

CREATE TABLE signal_cluster_duplicate_candidates (
  id INTEGER PRIMARY KEY,
  cluster_ids_json TEXT NOT NULL,
  reason TEXT NOT NULL,
  confidence REAL NOT NULL,
  status TEXT NOT NULL,          -- open | resolved
  created_at INTEGER NOT NULL
);

CREATE TABLE suggestions (
  id INTEGER PRIMARY KEY,
  schema_version INTEGER NOT NULL,
  cluster_id INTEGER NOT NULL REFERENCES signal_clusters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  feedback_reasons_json TEXT,
  operations_json TEXT NOT NULL,
  evidence_json TEXT NOT NULL,
  status TEXT NOT NULL,          -- active | applied | needs_review | snoozed | dismissed | archived
  snoozed_until INTEGER,
  apply_result_json TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_signals_normalized_key ON signals(normalized_key);
CREATE INDEX idx_signals_conversation_id ON signals(conversation_id);
CREATE INDEX idx_signals_run_id ON signals(run_id);
CREATE INDEX idx_signal_clusters_status ON signal_clusters(status);
CREATE INDEX idx_signal_cluster_members_signal ON signal_cluster_members(signal_id);
CREATE INDEX idx_suggestions_status_snoozed ON suggestions(status, snoozed_until);
CREATE INDEX idx_suggestions_cluster ON suggestions(cluster_id);
CREATE INDEX idx_insight_runs_conversation ON insight_runs(conversation_id);
CREATE INDEX idx_insight_runs_dedupe ON insight_runs(conversation_id, transcript_hash);
`;
const insightHarnessCalls = `-- Full per-phase harness call traces for the signal pipeline dev page, so a
-- run's extraction/clustering/planning steps are inspectable (prompt, raw
-- stdout/stderr, parsed JSON, parse error, exit code, duration, token estimate)
-- without digging into the harness directly.

CREATE TABLE insight_harness_calls (
  id INTEGER PRIMARY KEY,
  run_id INTEGER NOT NULL REFERENCES insight_runs(id) ON DELETE CASCADE,
  phase TEXT NOT NULL,            -- extraction | clustering | planning
  cluster_id INTEGER,             -- planning: the cluster being planned; else null
  provider TEXT NOT NULL,
  harness_id TEXT NOT NULL,
  model TEXT,
  prompt TEXT NOT NULL,
  stdout TEXT,
  stderr TEXT,
  json_output TEXT,
  parse_error TEXT,
  exit_code INTEGER,
  timed_out INTEGER NOT NULL DEFAULT 0,
  duration_ms INTEGER,
  prompt_chars INTEGER NOT NULL DEFAULT 0,
  output_chars INTEGER NOT NULL DEFAULT 0,
  token_estimate INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_insight_harness_calls_run ON insight_harness_calls(run_id);

-- Tie suggestions to the run that produced them (the dev run-trace lists
-- "suggestions produced by the run").
--
-- Intentionally no FOREIGN KEY here: SQLite cannot add a column-level FK via
-- ALTER TABLE ADD COLUMN (FKs can only be declared at CREATE TABLE time), and
-- we don't rebuild the shipped \`suggestions\` table just for this. It's safe in
-- practice — insight_runs are an append-only audit trail (never deleted), and
-- run_id is only used to *display* the producing run, never joined for
-- integrity, so a dangling id would at worst show a blank run link.
ALTER TABLE suggestions ADD COLUMN run_id INTEGER;
CREATE INDEX idx_suggestions_run ON suggestions(run_id);
`;
const insightRunUsage = `-- Persist provider-usage before/after snapshots for each insight run. The dev
-- run trace uses this to show how much of the user's plan usage the run
-- consumed without relying on the current live usage response.

ALTER TABLE insight_runs ADD COLUMN usage_json TEXT;
`;
const insightTags = `ALTER TABLE signals ADD COLUMN tags_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE signal_clusters ADD COLUMN tags_json TEXT NOT NULL DEFAULT '[]';
`;
const insightAgentAttribution = `ALTER TABLE signals
  ADD COLUMN creator_agent_version_id TEXT NOT NULL DEFAULT 'legacy-3-step-workflow';

ALTER TABLE signal_clusters
  ADD COLUMN creator_agent_version_id TEXT NOT NULL DEFAULT 'legacy-3-step-workflow';

ALTER TABLE suggestions
  ADD COLUMN creator_agent_version_id TEXT NOT NULL DEFAULT 'legacy-3-step-workflow';

CREATE INDEX idx_signals_creator_agent_version_id
  ON signals(creator_agent_version_id);

CREATE INDEX idx_signal_clusters_creator_agent_version_id
  ON signal_clusters(creator_agent_version_id);

CREATE INDEX idx_suggestions_creator_agent_version_id
  ON suggestions(creator_agent_version_id);
`;
const insightAgentConversationReads = `CREATE TABLE IF NOT EXISTS insight_agent_conversation_reads (
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  agent_version_id TEXT NOT NULL,
  transcript_hash TEXT,
  conversation_activity_ts INTEGER NOT NULL DEFAULT 0,
  read_at INTEGER NOT NULL,
  read_count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (conversation_id, agent_version_id)
);

CREATE INDEX IF NOT EXISTS idx_insight_agent_conversation_reads_agent
  ON insight_agent_conversation_reads(agent_version_id, read_at DESC);
`;
const suggestionDisplayState = `ALTER TABLE suggestions ADD COLUMN hidden_at INTEGER;
ALTER TABLE suggestions ADD COLUMN hidden_reason TEXT;
ALTER TABLE suggestions ADD COLUMN hidden_until INTEGER;
ALTER TABLE suggestions ADD COLUMN last_shown_at INTEGER;
ALTER TABLE suggestions ADD COLUMN shown_count INTEGER NOT NULL DEFAULT 0;

CREATE TABLE suggestion_feedback_events (
  event_id TEXT PRIMARY KEY,
  suggestion_id INTEGER NOT NULL REFERENCES suggestions(id) ON DELETE CASCADE,
  agent_version_id TEXT NOT NULL,
  type TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_suggestion_feedback_events_suggestion
  ON suggestion_feedback_events(suggestion_id, created_at);
`;
const suggestionClusters = `CREATE TABLE suggestion_clusters (
  suggestion_id INTEGER NOT NULL REFERENCES suggestions(id) ON DELETE CASCADE,
  cluster_id INTEGER NOT NULL REFERENCES signal_clusters(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (suggestion_id, cluster_id)
);

CREATE INDEX idx_suggestion_clusters_cluster
  ON suggestion_clusters(cluster_id, suggestion_id);

INSERT OR IGNORE INTO suggestion_clusters (suggestion_id, cluster_id, created_at)
SELECT id, cluster_id, created_at
FROM suggestions;
`;
const purgeInsightsData = `-- Drop every row produced by the pre-existing signal pipeline: signals,
-- clusters, suggestions (including applied ones), and their supporting run
-- traces. The extraction/clustering/planning output format is changing in a way
-- the old rows cannot be migrated into, and a suggestion is only meaningful
-- alongside the cluster and evidence it was planned from.
--
-- Schema is left intact, this is data-only. Deletes run in explicit dependency
-- order rather than leaning on ON DELETE CASCADE so the result is the same
-- whether or not foreign_keys is enabled when the migration runs.
DELETE FROM suggestion_feedback_events;
DELETE FROM suggestion_clusters;
DELETE FROM suggestions;
DELETE FROM signal_cluster_duplicate_candidates;
DELETE FROM signal_cluster_members;
DELETE FROM signal_clusters;
DELETE FROM signals;
DELETE FROM insight_harness_calls;
DELETE FROM insight_runs;

-- Conversations are only ever read once per agent version. Clearing the ledger
-- lets the next pipeline run re-extract from full history instead of seeing
-- every past conversation as already processed.
DELETE FROM insight_agent_conversation_reads;
`;
const projectSetupSummaries = `CREATE TABLE IF NOT EXISTS project_setup_summaries (
  workspace_path TEXT PRIMARY KEY,
  skills INTEGER NOT NULL,
  agents INTEGER NOT NULL,
  commands INTEGER NOT NULL,
  hooks INTEGER NOT NULL,
  rules INTEGER NOT NULL,
  total_entries INTEGER NOT NULL,
  scanned_at INTEGER NOT NULL
);
`;
const claudeAuxiliaryConversationCleanup = `-- Claude Code can create top-level
-- agent-*.jsonl sidechain files plus an empty parent placeholder. They are runtime
-- artifacts, not standalone user conversations. Remove rows produced by older
-- parsers; provider discovery now excludes the corresponding sources.
UPDATE sources
SET last_size = 0
WHERE kind = 'claude'
  AND last_size IS NULL
  AND id IN (
    SELECT placeholder.source_id
    FROM conversations placeholder
    JOIN conversations sidechain ON sidechain.external_id = placeholder.external_id
    JOIN sources sidechain_source ON sidechain_source.id = sidechain.source_id
    WHERE placeholder.source = 'claude'
      AND sidechain.source = 'claude'
      AND lower(replace(sidechain_source.path, '\\', '/')) GLOB '*/agent-*.jsonl'
  );

DELETE FROM conversations
WHERE source = 'claude'
  AND (
    source_id IN (
      SELECT id
      FROM sources
      WHERE kind = 'claude'
        AND lower(replace(path, '\\', '/')) GLOB '*/agent-*.jsonl'
    )
    OR (
      source_id IN (
        SELECT id
        FROM sources
        WHERE kind = 'claude'
          AND last_size = 0
      )
      AND state IN ('idle', 'inactive')
      AND trim(coalesce(title, '')) = ''
      AND trim(coalesce(provider_title, '')) = ''
      AND trim(coalesce(preview, '')) = ''
      AND NOT EXISTS (
        SELECT 1 FROM user_turns WHERE user_turns.conversation_id = conversations.id
      )
      AND NOT EXISTS (
        SELECT 1 FROM tool_calls WHERE tool_calls.conversation_id = conversations.id
      )
    )
  );
`;
const insightProjectAudits = `CREATE TABLE IF NOT EXISTS insight_project_audits (
  project_path TEXT NOT NULL,
  agent_version_id TEXT NOT NULL,
  setup_state_hash TEXT NOT NULL,
  conversations_seen_count INTEGER NOT NULL DEFAULT 0,
  last_run_id TEXT,
  last_run_at INTEGER NOT NULL,
  audit_count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (project_path, agent_version_id)
);

CREATE INDEX IF NOT EXISTS idx_insight_project_audits_agent
  ON insight_project_audits(agent_version_id, last_run_at DESC);
`;
const wrappedRecords = `CREATE TABLE IF NOT EXISTS wrapped_records (
  id TEXT PRIMARY KEY,
  period_start TEXT NOT NULL,
  period_kind TEXT NOT NULL,
  started_at_ms INTEGER NOT NULL,
  ended_at_ms INTEGER NOT NULL,
  account_user_id TEXT,
  schema_version INTEGER NOT NULL,
  summary_json TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_wrapped_records_created ON wrapped_records (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wrapped_records_period ON wrapped_records (period_start, period_kind);
`;
const APP_USAGE_VISIBLE_MODE_COLUMNS = [
  "window_visible_pinned_seconds",
  "window_visible_pinned_expanded_seconds",
  "window_visible_regular_expanded_seconds"
];
function tableExists(db, table) {
  const row = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(table);
  return !!row;
}
function columnExists(db, table, column) {
  const rows2 = db.pragma(`table_info('${table}')`);
  if (!Array.isArray(rows2)) return false;
  return rows2.some((row) => row.name === column);
}
function addColumnIfMissing(db, table, column, definition) {
  if (!tableExists(db, table)) return;
  if (columnExists(db, table, column)) return;
  db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}
function addMissingAppUsageVisibleModeColumns(db) {
  for (const column of APP_USAGE_VISIBLE_MODE_COLUMNS) {
    addColumnIfMissing(db, "app_usage_intervals", column, "INTEGER NOT NULL DEFAULT 0");
  }
}
function idempotentCreateSql(sql) {
  return sql.replace(/\bCREATE TABLE\b(?!\s+IF\s+NOT\s+EXISTS)/g, "CREATE TABLE IF NOT EXISTS").replace(
    /\bCREATE\s+(UNIQUE\s+)?INDEX\b(?!\s+IF\s+NOT\s+EXISTS)/g,
    (_match, unique = "") => `CREATE ${unique}INDEX IF NOT EXISTS`
  );
}
function repairConversationColumns(db) {
  addColumnIfMissing(db, "conversations", "parent_thread_id", "TEXT");
  addColumnIfMissing(db, "conversations", "thread_source", "TEXT");
  addColumnIfMissing(db, "conversations", "subagent_kind", "TEXT");
  addColumnIfMissing(db, "conversations", "provider_title", "TEXT");
  if (columnExists(db, "conversations", "provider_title")) {
    db.exec(`
      UPDATE conversations
      SET provider_title = title
      WHERE title_source = 'provider' AND provider_title IS NULL;
    `);
  }
}
function repairConversationFailureReason(db, currentVersion) {
  if (currentVersion < 21) return;
  addColumnIfMissing(db, "conversations", "failure_reason", "TEXT");
}
function repairConversationActivityEventCount(db, currentVersion) {
  if (currentVersion < 25) return;
  addColumnIfMissing(db, "conversations", "activity_event_count", "INTEGER");
}
function addConversationActivityEventCount(db) {
  addColumnIfMissing(db, "conversations", "activity_event_count", "INTEGER");
}
function addInsightRunTaskContext(db) {
  addColumnIfMissing(db, "insight_runs", "task_type", "TEXT");
  addColumnIfMissing(db, "insight_runs", "project_path", "TEXT");
}
function addInsightConversationMessageCheckpoint(db) {
  addColumnIfMissing(
    db,
    "insight_agent_conversation_reads",
    "last_processed_message_position",
    "INTEGER"
  );
}
function addSuggestionFeedbackReasons(db) {
  addColumnIfMissing(db, "suggestions", "feedback_reasons_json", "TEXT");
}
function repairInsightsSchema(db, currentVersion) {
  if (currentVersion < 12) return;
  db.exec(idempotentCreateSql(insights));
  if (currentVersion < 13) return;
  const harnessCallsSql = insightHarnessCalls.split("ALTER TABLE suggestions ADD COLUMN run_id")[0];
  db.exec(idempotentCreateSql(harnessCallsSql));
  addColumnIfMissing(db, "suggestions", "run_id", "INTEGER");
  if (tableExists(db, "suggestions")) {
    db.exec("CREATE INDEX IF NOT EXISTS idx_suggestions_run ON suggestions(run_id)");
  }
  if (currentVersion < 14) return;
  addColumnIfMissing(db, "insight_runs", "usage_json", "TEXT");
  if (currentVersion < 15) return;
  addColumnIfMissing(db, "signals", "tags_json", "TEXT NOT NULL DEFAULT '[]'");
  addColumnIfMissing(db, "signal_clusters", "tags_json", "TEXT NOT NULL DEFAULT '[]'");
  if (currentVersion < 16) return;
  addColumnIfMissing(
    db,
    "signals",
    "creator_agent_version_id",
    "TEXT NOT NULL DEFAULT 'legacy-3-step-workflow'"
  );
  addColumnIfMissing(
    db,
    "signal_clusters",
    "creator_agent_version_id",
    "TEXT NOT NULL DEFAULT 'legacy-3-step-workflow'"
  );
  addColumnIfMissing(
    db,
    "suggestions",
    "creator_agent_version_id",
    "TEXT NOT NULL DEFAULT 'legacy-3-step-workflow'"
  );
  if (tableExists(db, "signals")) {
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_signals_creator_agent_version_id ON signals(creator_agent_version_id)"
    );
  }
  if (tableExists(db, "signal_clusters")) {
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_signal_clusters_creator_agent_version_id ON signal_clusters(creator_agent_version_id)"
    );
  }
  if (tableExists(db, "suggestions")) {
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_suggestions_creator_agent_version_id ON suggestions(creator_agent_version_id)"
    );
  }
  if (currentVersion < 17) return;
  db.exec(idempotentCreateSql(insightAgentConversationReads));
  if (currentVersion < 18) return;
  addColumnIfMissing(db, "suggestions", "hidden_at", "INTEGER");
  addColumnIfMissing(db, "suggestions", "hidden_reason", "TEXT");
  addColumnIfMissing(db, "suggestions", "hidden_until", "INTEGER");
  addColumnIfMissing(db, "suggestions", "last_shown_at", "INTEGER");
  addColumnIfMissing(db, "suggestions", "shown_count", "INTEGER NOT NULL DEFAULT 0");
  db.exec(`
    CREATE TABLE IF NOT EXISTS suggestion_feedback_events (
      event_id TEXT PRIMARY KEY,
      suggestion_id INTEGER NOT NULL REFERENCES suggestions(id) ON DELETE CASCADE,
      agent_version_id TEXT NOT NULL,
      type TEXT NOT NULL,
      metadata_json TEXT NOT NULL DEFAULT '{}',
      created_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_suggestion_feedback_events_suggestion
      ON suggestion_feedback_events(suggestion_id, created_at);
  `);
  if (currentVersion < 19) return;
  db.exec(idempotentCreateSql(suggestionClusters));
  if (currentVersion < 26) return;
  addColumnIfMissing(
    db,
    "insight_agent_conversation_reads",
    "last_processed_message_position",
    "INTEGER"
  );
  if (currentVersion < 27) return;
  db.exec(idempotentCreateSql(insightProjectAudits));
  if (currentVersion < 28) return;
  addColumnIfMissing(db, "insight_runs", "task_type", "TEXT");
  addColumnIfMissing(db, "insight_runs", "project_path", "TEXT");
  if (currentVersion < 29) return;
  addSuggestionFeedbackReasons(db);
}
function repairProjectSetupSummarySchema(db, currentVersion) {
  if (currentVersion < 20) return;
  db.exec(idempotentCreateSql(projectSetupSummaries));
}
function addSignalTypeColumn(db) {
  addColumnIfMissing(
    db,
    "signals",
    "type",
    "TEXT CHECK (type IS NULL OR type IN ('correction', 'steering', 'frustration'))"
  );
  db.exec(
    "UPDATE signals SET type = kind WHERE type IS NULL AND kind IN ('correction', 'steering', 'frustration')"
  );
}
function repairCurrentSchema(db, currentVersion) {
  if (currentVersion >= 8) addMissingAppUsageVisibleModeColumns(db);
  if (currentVersion >= 10) repairConversationColumns(db);
  repairConversationFailureReason(db, currentVersion);
  repairConversationActivityEventCount(db, currentVersion);
  repairInsightsSchema(db, currentVersion);
  repairProjectSetupSummarySchema(db, currentVersion);
  if (currentVersion >= 23) addSignalTypeColumn(db);
  if (currentVersion >= 34) addLocalReferences(db);
  if (currentVersion >= 35) addSearchIndexes(db);
}
function addSearchIndexes(db) {
  desktopSearch.installDesktopSearchIndexes(db);
}
function retiredProjectExclusions() {
}
function addLocalReferences(db) {
  addColumnIfMissing(db, "events", "message_id", "TEXT");
  if (tableExists(db, "events"))
    db.exec(
      "CREATE INDEX IF NOT EXISTS idx_events_message_id ON events(message_id) WHERE message_id IS NOT NULL"
    );
  db.exec(`
    CREATE TABLE IF NOT EXISTS registered_conversations (
      harness          TEXT NOT NULL,
      conversation_id  TEXT NOT NULL,
      refreshed_at     INTEGER NOT NULL,
      PRIMARY KEY (harness, conversation_id)
    );
    CREATE TABLE IF NOT EXISTS conversation_links (
      conversation_ref TEXT NOT NULL,
      message_id       TEXT NOT NULL DEFAULT '',
      kind             TEXT NOT NULL CHECK (kind IN ('thread', 'project', 'delivery', 'signal')),
      cloud_id         TEXT NOT NULL,
      created_at       INTEGER NOT NULL,
      PRIMARY KEY (conversation_ref, message_id, kind, cloud_id)
    );
    CREATE INDEX IF NOT EXISTS idx_conversation_links_cloud ON conversation_links(kind, cloud_id);
  `);
}
function cleanupClaudeAuxiliaryConversations(db) {
  if (!tableExists(db, "conversations") || !tableExists(db, "sources") || !tableExists(db, "user_turns") || !tableExists(db, "tool_calls") || !columnExists(db, "conversations", "source") || !columnExists(db, "conversations", "source_id") || !columnExists(db, "conversations", "provider_title")) {
    return;
  }
  db.exec(claudeAuxiliaryConversationCleanup);
}
const MIGRATIONS = [
  { version: 1, name: "001-initial", sql: initial },
  { version: 2, name: "002-todo-list-run-source", sql: todoListRunSource },
  { version: 3, name: "003-sources", sql: sources, rebuildsTables: true },
  { version: 4, name: "004-user-turns", sql: userTurns, rebuildsTables: true },
  { version: 5, name: "005-state-overrides", sql: stateOverrides },
  { version: 6, name: "006-app-usage-intervals", sql: appUsageIntervals },
  { version: 7, name: "007-repair-app-usage-intervals", sql: repairAppUsageIntervals },
  {
    version: 8,
    name: "008-app-usage-visible-mode-seconds",
    run: addMissingAppUsageVisibleModeColumns
  },
  { version: 9, name: "009-tool-result-event-link", sql: toolResultEventLink },
  { version: 10, name: "010-codex-session-parent", sql: codexSessionParent },
  { version: 11, name: "011-provider-title", sql: providerTitle },
  { version: 12, name: "012-insights", sql: insights },
  { version: 13, name: "013-insight-harness-calls", sql: insightHarnessCalls },
  { version: 14, name: "014-insight-run-usage", sql: insightRunUsage },
  { version: 15, name: "015-insight-tags", sql: insightTags },
  { version: 16, name: "016-insight-agent-attribution", sql: insightAgentAttribution },
  { version: 17, name: "017-insight-agent-conversation-reads", sql: insightAgentConversationReads },
  { version: 18, name: "018-suggestion-display-state", sql: suggestionDisplayState },
  { version: 19, name: "019-suggestion-clusters", sql: suggestionClusters },
  { version: 20, name: "020-project-setup-summaries", sql: projectSetupSummaries },
  { version: 21, name: "021-conversation-failure-reason", sql: conversationFailureReason },
  {
    version: 22,
    name: "022-claude-auxiliary-conversation-cleanup",
    run: cleanupClaudeAuxiliaryConversations
  },
  { version: 23, name: "023-signal-type", run: addSignalTypeColumn },
  { version: 24, name: "024-purge-insights-data", sql: purgeInsightsData },
  {
    version: 25,
    name: "025-conversation-activity-event-count",
    run: addConversationActivityEventCount
  },
  {
    version: 26,
    name: "026-insight-conversation-message-checkpoints",
    run: addInsightConversationMessageCheckpoint
  },
  { version: 27, name: "027-insight-project-audits", sql: insightProjectAudits },
  // Replay-safe (idempotent): tests rewind schema_version and replay tails.
  { version: 28, name: "028-insight-run-task-context", run: addInsightRunTaskContext },
  {
    version: 29,
    name: "029-suggestion-feedback-reasons",
    run: addSuggestionFeedbackReasons
  },
  { version: 30, name: "030-project-exclusions", run: retiredProjectExclusions },
  { version: 31, name: "031-project-exclusion-patterns", run: retiredProjectExclusions },
  { version: 32, name: "032-project-exclusion-match-count", run: retiredProjectExclusions },
  // Replay-safe (idempotent): CREATE TABLE/INDEX IF NOT EXISTS only.
  { version: 33, name: "033-wrapped-records", sql: wrappedRecords },
  // Replay-safe (idempotent): additive column, CREATE TABLE/INDEX IF NOT EXISTS only.
  { version: 34, name: "034-local-references", run: addLocalReferences },
  // Replay-safe (idempotent): IF NOT EXISTS DDL and a watermark row inserted once.
  { version: 35, name: "035-search-indexes", run: addSearchIndexes }
];
const SCHEMA_VERSION_KEY = "schema_version";
function readSchemaVersion(db) {
  const metaTable = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'meta'").get();
  if (!metaTable) return 0;
  const row = db.prepare("SELECT value FROM meta WHERE key = ?").get(SCHEMA_VERSION_KEY);
  return row ? parseInt(row.value, 10) || 0 : 0;
}
function runDesktopMigration(db, migration) {
  const sql = migration.sql;
  const runner = migration.run;
  const hasSql = typeof sql === "string" && sql.trim().length > 0;
  const hasRun = typeof runner === "function";
  if (hasSql === hasRun) {
    throw new Error(`Invalid migration ${migration.version} (${migration.name})`);
  }
  if (runner) {
    runner(db);
    return;
  }
  if (hasSql) db.exec(sql);
}
function runDesktopMigrations(db) {
  const current = readSchemaVersion(db);
  const pending = MIGRATIONS.filter((m) => m.version > current).sort(
    (a, b) => a.version - b.version
  );
  for (const m of pending) {
    const writeVersion = () => {
      db.prepare(
        "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      ).run(SCHEMA_VERSION_KEY, String(m.version));
    };
    if (m.rebuildsTables) {
      db.pragma("foreign_keys = OFF");
      try {
        db.transaction(() => {
          runDesktopMigration(db, m);
          writeVersion();
        })();
      } finally {
        db.pragma("foreign_keys = ON");
      }
    } else {
      db.transaction(() => {
        runDesktopMigration(db, m);
        writeVersion();
      })();
    }
  }
  const latest = MIGRATIONS[MIGRATIONS.length - 1]?.version ?? current;
  repairCurrentSchema(db, Math.max(current, latest));
}
function isRow$3(value) {
  return typeof value === "object" && value !== null;
}
function int$1(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  return null;
}
function text$3(value) {
  return typeof value === "string" ? value : null;
}
function nullableText(value) {
  return value == null ? null : text$3(value);
}
function desktopProjectRow(value) {
  if (!isRow$3(value)) return null;
  const id = int$1(value.id);
  const path = text$3(value.path);
  const name = text$3(value.name);
  const createdAt = int$1(value.created_at);
  const updatedAt = int$1(value.updated_at);
  const projectKind = text$3(value.project_kind);
  if (id === null || path === null || name === null || createdAt === null || updatedAt === null) {
    return null;
  }
  const gitRemote = nullableText(value.git_remote);
  return {
    id,
    path,
    name,
    kind: projectKind === "git" || projectKind === "folder" ? projectKind : gitRemote ? "git" : "folder",
    git_remote: gitRemote,
    display_path: nullableText(value.display_path),
    created_at: createdAt,
    updated_at: updatedAt
  };
}
function createDesktopProjectStore(db) {
  return {
    async getProject(id) {
      const row = db.prepare(
        `SELECT p.*, compatibility.kind AS project_kind
           FROM projects p
           LEFT JOIN storage_compatibility_projects compatibility
             ON compatibility.legacy_id = p.id
           WHERE p.id = ?`
      ).get(id);
      return desktopProjectRow(row);
    },
    async listProjects() {
      return db.prepare(
        `SELECT p.*, compatibility.kind AS project_kind
           FROM projects p
           LEFT JOIN storage_compatibility_projects compatibility
             ON compatibility.legacy_id = p.id
           ORDER BY p.name COLLATE NOCASE, p.path`
      ).all().map(desktopProjectRow).filter((row) => row !== null);
    },
    async listProjectsByPaths(paths) {
      if (paths.length === 0) return [];
      const rows2 = [];
      const uniquePaths = [...new Set(paths)];
      for (let index2 = 0; index2 < uniquePaths.length; index2 += 250) {
        const batch = uniquePaths.slice(index2, index2 + 250);
        const marks = batch.map(() => "?").join(", ");
        rows2.push(
          ...db.prepare(
            `SELECT p.*, compatibility.kind AS project_kind
               FROM projects p
               LEFT JOIN storage_compatibility_projects compatibility
                 ON compatibility.legacy_id = p.id
               WHERE p.path IN (${marks})`
          ).all(...batch).map(desktopProjectRow).filter((row) => row !== null)
        );
      }
      return rows2;
    },
    async listRecentProjects(limit = 5) {
      return db.prepare(
        `SELECT p.*, compatibility.kind AS project_kind
           FROM projects p
           LEFT JOIN storage_compatibility_projects compatibility
             ON compatibility.legacy_id = p.id
           ORDER BY p.updated_at DESC, p.name COLLATE NOCASE LIMIT ?`
      ).all(limit).map(desktopProjectRow).filter((row) => row !== null);
    }
  };
}
function sharedIndex(name) {
  const index2 = desktopSearch.SHARED_FTS_INDEXES.find((definition) => definition.name === name);
  if (!index2) throw new Error(`missing shared search index ${name}`);
  return index2;
}
const FIRST_PROMPT = `(SELECT first_turn.prompt FROM conversation_transcript_user_turns first_turn
    WHERE first_turn.conversation_id = c.id AND trim(coalesce(first_turn.prompt, '')) != ''
    ORDER BY first_turn.position LIMIT 1) AS first_prompt`;
const MESSAGE_COLUMNS = `c.id AS conversation_id, c.ref AS conversation_ref, c.title AS title,
  ${FIRST_PROMPT},
  c.harness_id AS harness, c.last_activity_ts AS last_activity_ts,
  coalesce(p.repo_root, p.root) AS project_label`;
[
  {
    kind: "prompt",
    index: sharedIndex("search_fts_prompts"),
    metadataSql: (scope) => `SELECT t.rowid AS rid, ${MESSAGE_COLUMNS}, t.position AS turn_position,
        t.id AS match_id, NULL AS event_id, NULL AS list_id, NULL AS event_kind
      FROM conversation_transcript_user_turns t
      JOIN conversations c ON c.id = t.conversation_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE t.rowid IN ${desktopSearch.JSON_IDS}${scope}`,
    scopedRowidsSql: (scope) => `SELECT t.rowid FROM conversation_transcript_user_turns t
      JOIN conversations c ON c.id = t.conversation_id WHERE 1 = 1${scope}`
  },
  {
    kind: "event",
    index: sharedIndex("search_fts_events"),
    metadataSql: (scope) => `SELECT e.rowid AS rid, ${MESSAGE_COLUMNS}, t.position AS turn_position,
        e.id AS match_id, NULL AS event_id, NULL AS list_id, e.kind AS event_kind
      FROM conversation_transcript_events e
      JOIN conversation_transcript_user_turns t
        ON t.conversation_id = e.conversation_id AND t.id = e.user_turn_id
      JOIN conversations c ON c.id = e.conversation_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE e.rowid IN ${desktopSearch.JSON_IDS} AND e.kind != 'user_text' AND e.text IS NOT NULL
        AND NOT (e.kind = 'tool_result' AND e.tool_call_id IS NOT NULL)${scope}`,
    scopedRowidsSql: (scope) => `SELECT e.rowid FROM conversation_transcript_events e
      JOIN conversations c ON c.id = e.conversation_id WHERE 1 = 1${scope}`
  },
  {
    kind: "tool",
    index: sharedIndex("search_fts_tool_calls"),
    metadataSql: (scope) => `SELECT tc.rowid AS rid, ${MESSAGE_COLUMNS}, t.position AS turn_position,
        tc.id AS match_id, tc.event_id AS event_id, NULL AS list_id, NULL AS event_kind
      FROM conversation_transcript_tool_calls tc
      JOIN conversations c ON c.id = tc.conversation_id
      LEFT JOIN conversation_transcript_events e
        ON e.conversation_id = tc.conversation_id AND e.id = tc.event_id
      LEFT JOIN conversation_transcript_user_turns t
        ON t.conversation_id = e.conversation_id AND t.id = e.user_turn_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE tc.rowid IN ${desktopSearch.JSON_IDS}${scope}`,
    scopedRowidsSql: (scope) => `SELECT tc.rowid FROM conversation_transcript_tool_calls tc
      JOIN conversations c ON c.id = tc.conversation_id WHERE 1 = 1${scope}`
  },
  {
    kind: "todo",
    index: sharedIndex("search_fts_todos"),
    metadataSql: (scope) => `SELECT todo.rowid AS rid, ${MESSAGE_COLUMNS}, t.position AS turn_position,
        todo.id AS match_id, NULL AS event_id, tl.id AS list_id, NULL AS event_kind
      FROM conversation_transcript_todos todo
      JOIN conversation_transcript_todo_lists tl
        ON tl.conversation_id = todo.conversation_id AND tl.id = todo.list_id
      JOIN conversation_transcript_user_turns t
        ON t.conversation_id = tl.conversation_id AND t.id = tl.user_turn_id
      JOIN conversations c ON c.id = todo.conversation_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE todo.rowid IN ${desktopSearch.JSON_IDS}${scope}`,
    scopedRowidsSql: (scope) => `SELECT todo.rowid FROM conversation_transcript_todos todo
      JOIN conversations c ON c.id = todo.conversation_id WHERE 1 = 1${scope}`
  }
];
({
  index: sharedIndex("search_fts_conversations")
});
function isRow$2(value) {
  return typeof value === "object" && value !== null;
}
function numberOrNull(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  return null;
}
function signalType(value) {
  return value === "correction" || value === "steering" || value === "frustration" ? value : null;
}
function auditTagIdentity(value) {
  if (typeof value !== "string") return null;
  let tags;
  try {
    tags = JSON.parse(value);
  } catch {
    return null;
  }
  if (!Array.isArray(tags)) return null;
  const check = tags.find(
    (tag) => typeof tag === "string" && tag.startsWith("check:")
  );
  const catalog = tags.find(
    (tag) => typeof tag === "string" && tag.startsWith("catalog:v")
  );
  const checkId = check?.slice("check:".length).trim() ?? "";
  const catalogVersion = Number(catalog?.slice("catalog:v".length));
  return checkId && Number.isSafeInteger(catalogVersion) && catalogVersion > 0 ? { checkId, catalogVersion } : null;
}
function hasTable$1(db, name) {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name)
  );
}
function createDesktopSignalAnalyticsStore(db) {
  return {
    async listTurns() {
      return db.prepare(
        `WITH processed_conversations AS (
             SELECT conversation_id, MAX(finished_at) AS processed_through
             FROM insight_runs
             WHERE status = 'succeeded' AND stage = 'done' AND finished_at IS NOT NULL
             GROUP BY conversation_id
           ), analytics_turns AS (
             SELECT turns.id,
               turns.conversation_id,
               turns.position,
               COALESCE(
                 turns.started_at,
                 MIN(events.timestamp_ms),
                 turns.ended_at,
                 conversations.started_at,
                 conversations.created_at
               ) AS occurred_at,
               processed.processed_through
             FROM user_turns AS turns
             JOIN processed_conversations AS processed
               ON processed.conversation_id = turns.conversation_id
             LEFT JOIN events ON events.user_turn_id = turns.id
             LEFT JOIN conversations ON conversations.id = turns.conversation_id
             GROUP BY turns.id, turns.conversation_id, turns.position,
               turns.started_at, turns.ended_at,
               conversations.started_at, conversations.created_at,
               processed.processed_through
           )
           SELECT CAST(conversation_id AS TEXT) AS conversation_id,
             position,
             occurred_at
           FROM analytics_turns
           WHERE occurred_at IS NULL OR occurred_at <= processed_through`
      ).all().flatMap((row) => {
        if (!isRow$2(row)) return [];
        const position = numberOrNull(row.position);
        if (typeof row.conversation_id !== "string" || position === null) return [];
        return [
          {
            conversationId: row.conversation_id,
            position,
            occurredAt: numberOrNull(row.occurred_at)
          }
        ];
      });
    },
    async listSignals() {
      const signalColumns = db.prepare("PRAGMA table_info('signals')").all().flatMap((row) => isRow$2(row) && typeof row.name === "string" ? [row.name] : []);
      if (!signalColumns.includes("type")) {
        throw new Error("signals.type is required for signal analytics");
      }
      return db.prepare(
        `SELECT CAST(id AS TEXT) AS id,
             CAST(conversation_id AS TEXT) AS conversation_id,
             type,
             evidence_json,
             created_at
           FROM signals
           WHERE type IN (?, ?, ?)`
      ).all("correction", "steering", "frustration").flatMap((row) => {
        if (!isRow$2(row)) return [];
        const type = signalType(row.type);
        const createdAt = numberOrNull(row.created_at);
        if (typeof row.id !== "string" || typeof row.conversation_id !== "string" || typeof row.evidence_json !== "string" || !type || createdAt === null) {
          return [];
        }
        return [
          {
            id: row.id,
            conversationId: row.conversation_id,
            type,
            evidenceJson: row.evidence_json,
            createdAt
          }
        ];
      });
    },
    async listAuditCheckEvents() {
      if (!hasTable$1(db, "signals") || !hasTable$1(db, "signal_clusters") || !hasTable$1(db, "suggestions") || !hasTable$1(db, "suggestion_clusters") || !hasTable$1(db, "suggestion_feedback_events")) {
        return [];
      }
      const events = [];
      const append = (rows2, type) => {
        for (const value of rows2) {
          if (!isRow$2(value)) continue;
          const identity2 = auditTagIdentity(value.tags_json);
          const createdAt = numberOrNull(value.created_at);
          if (identity2 && createdAt !== null) events.push({ ...identity2, type, createdAt });
        }
      };
      append(
        db.prepare(
          `SELECT tags_json, created_at
             FROM signals
             WHERE normalized_key LIKE 'audit:%'`
        ).all(),
        "found"
      );
      append(
        db.prepare(
          `SELECT tags_json, promoted_at AS created_at
             FROM signal_clusters
             WHERE promoted_at IS NOT NULL`
        ).all(),
        "promoted"
      );
      append(
        db.prepare(
          `SELECT DISTINCT suggestions.id, signal_clusters.tags_json,
                    suggestions.created_at AS created_at
             FROM suggestions
             JOIN suggestion_clusters
               ON suggestion_clusters.suggestion_id = suggestions.id
             JOIN signal_clusters
               ON signal_clusters.id = suggestion_clusters.cluster_id`
        ).all(),
        "suggested"
      );
      const feedback = db.prepare(
        `SELECT DISTINCT suggestion_feedback_events.event_id,
                  suggestion_feedback_events.type,
                  suggestion_feedback_events.created_at,
                  signal_clusters.tags_json
           FROM suggestion_feedback_events
           JOIN suggestion_clusters
             ON suggestion_clusters.suggestion_id = suggestion_feedback_events.suggestion_id
           JOIN signal_clusters
             ON signal_clusters.id = suggestion_clusters.cluster_id
           WHERE suggestion_feedback_events.type IN ('suggestion_applied', 'suggestion_dismissed')`
      ).all();
      append(
        feedback.filter((value) => isRow$2(value) && value.type === "suggestion_applied"),
        "applied"
      );
      append(
        feedback.filter((value) => isRow$2(value) && value.type === "suggestion_dismissed"),
        "dismissed"
      );
      return events;
    }
  };
}
function seedFor(root, remote, compatibilityKind) {
  if (!root) return null;
  const kind = remote && remote.length > 0 || compatibilityKind === "git" ? "git" : "folder";
  return identity.projectFlowerSeedFor({ kind, root, canonicalRemote: remote });
}
function isRow$1(value) {
  return typeof value === "object" && value !== null;
}
function int(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") return Number(value) || 0;
  return 0;
}
function intOrNull(value) {
  if (value == null) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "bigint") return Number(value);
  return null;
}
function text$2(value) {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}
function textOrNull$2(value) {
  return value == null ? null : text$2(value);
}
function wrappedRecordRow(row) {
  return {
    id: text$2(row.id),
    period_start: text$2(row.period_start),
    period_kind: text$2(row.period_kind),
    started_at_ms: int(row.started_at_ms),
    ended_at_ms: int(row.ended_at_ms),
    account_user_id: textOrNull$2(row.account_user_id),
    schema_version: int(row.schema_version),
    summary_json: text$2(row.summary_json),
    created_at: int(row.created_at)
  };
}
function createDesktopWrappedStore(db) {
  let compatibilityProjects = null;
  const hasCompatibilityProjects = () => {
    if (compatibilityProjects === null) {
      compatibilityProjects = isRow$1(
        db.prepare(
          "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'storage_compatibility_projects'"
        ).get()
      );
    }
    return compatibilityProjects;
  };
  return {
    async listWrapped(limit) {
      return db.prepare("SELECT * FROM wrapped_records ORDER BY created_at DESC, id DESC LIMIT ?").all(Math.max(0, Math.trunc(limit))).flatMap((row) => isRow$1(row) ? [wrappedRecordRow(row)] : []);
    },
    async getWrapped(id) {
      const row = db.prepare("SELECT * FROM wrapped_records WHERE id = ?").get(id);
      return isRow$1(row) ? wrappedRecordRow(row) : null;
    },
    async saveWrapped(input) {
      db.prepare(
        `INSERT INTO wrapped_records (
           id, period_start, period_kind, started_at_ms, ended_at_ms,
           account_user_id, schema_version, summary_json, created_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           period_start = excluded.period_start,
           period_kind = excluded.period_kind,
           started_at_ms = excluded.started_at_ms,
           ended_at_ms = excluded.ended_at_ms,
           account_user_id = excluded.account_user_id,
           schema_version = excluded.schema_version,
           summary_json = excluded.summary_json,
           created_at = excluded.created_at`
      ).run(
        input.id,
        input.periodStart,
        input.periodKind,
        input.startedAtMs,
        input.endedAtMs,
        input.accountUserId,
        input.schemaVersion,
        input.summaryJson,
        input.createdAt
      );
    },
    async deleteWrapped(id) {
      db.prepare("DELETE FROM wrapped_records WHERE id = ?").run(id);
    },
    async listWrappedActivity(startMs, endMs, idleGapMs = deliveryBriefs.WRAPPED_DEFAULT_IDLE_GAP_MS) {
      if (!(endMs > startMs)) return [];
      const includeCompatibilityProjects = hasCompatibilityProjects();
      const compatibilityProjectJoins = includeCompatibilityProjects ? `LEFT JOIN storage_compatibility_projects AS activity_compatibility
             ON activity_compatibility.legacy_id = activity_project.id
           LEFT JOIN storage_compatibility_projects AS canonical_compatibility
             ON canonical_compatibility.legacy_id = canonical_project.id` : "";
      const compatibilityKind = includeCompatibilityProjects ? `COALESCE(
             MAX(canonical_compatibility.kind),
             CASE WHEN MAX(name_canonical.project_remote) IS NOT NULL THEN 'git' END,
             MAX(activity_compatibility.kind)
           )` : `CASE
             WHEN COALESCE(
               MAX(canonical_project.git_remote),
               MAX(name_canonical.project_remote),
               activity_project.git_remote
             ) IS NOT NULL
             THEN 'git' ELSE NULL
           END`;
      const sessionRows = db.prepare(
        `WITH canonical_project_by_name AS (
             -- Very old Codex rows predate workspace_locations and contain no
             -- Git metadata. Recover only recognized global worktree shapes,
             -- and only when the project name resolves to one unambiguous
             -- canonical remote. The remote is the avatar identity, so clone
             -- path choice cannot change the crown.
             SELECT named_project.name,
                    COALESCE(
                      MAX(CASE
                        WHEN named_canonical_id.legacy_id IS NOT NULL THEN named_project.id
                      END),
                      MIN(named_project.id)
                    ) AS project_id,
                    MAX(named_project.git_remote) AS project_remote,
                    MAX(named_project.path) AS project_root
             FROM projects AS named_project
             LEFT JOIN storage_compatibility_ids AS named_canonical_id
               ON named_canonical_id.domain = 'project'
               AND named_canonical_id.legacy_id = named_project.id
             WHERE named_project.git_remote IS NOT NULL AND named_project.git_remote <> ''
             GROUP BY named_project.name
             HAVING COUNT(DISTINCT named_project.git_remote) = 1
           ),
           project_identity AS (
             SELECT activity_project.id AS activity_project_id,
                    COALESCE(
                      MAX(canonical_project.id),
                      MAX(name_canonical.project_id),
                      activity_project.id
                    ) AS project_id,
                    COALESCE(
                      MAX(canonical_project.path),
                      MAX(name_canonical.project_root),
                      activity_project.path
                    ) AS project_root,
                    COALESCE(
                      MAX(canonical_project.git_remote),
                      MAX(name_canonical.project_remote),
                      activity_project.git_remote
                    ) AS project_remote,
                    ${compatibilityKind} AS project_compatibility_kind
             FROM projects AS activity_project
             LEFT JOIN workspace_locations AS activity_workspace
               ON activity_workspace.path = activity_project.path
             LEFT JOIN storage_compatibility_ids AS canonical_id
               ON canonical_id.domain = 'project'
               AND canonical_id.shared_id = activity_workspace.project_id
             LEFT JOIN projects AS canonical_project
               ON canonical_project.id = canonical_id.legacy_id
             LEFT JOIN canonical_project_by_name AS name_canonical
               ON name_canonical.name = activity_project.name
               AND (
                 replace(activity_project.path, '\\', '/') LIKE
                   '%/.codex/worktrees/%/' || activity_project.name
                 OR replace(activity_project.path, '\\', '/') LIKE
                   '%/projects/worktrees/codex/%/' || activity_project.name
               )
             ${compatibilityProjectJoins}
             GROUP BY activity_project.id, activity_project.path, activity_project.git_remote
           )
           SELECT conversations.id AS conversation_id,
                  COALESCE(project_identity.project_id, conversations.project_id) AS project_id,
                  -- The avatar seed is derived in JS by projectFlowerSeedFor,
                  -- not spelled out here: the rule (remote parsing, path
                  -- normalization) belongs in one place, and three SQL dialects
                  -- reimplementing it is exactly how the meadow grew the wrong
                  -- flowers once already.
                  project_identity.project_root AS project_root,
                  project_identity.project_remote AS project_remote,
                  project_identity.project_compatibility_kind AS project_compatibility_kind,
                  COALESCE(conversations.started_at, conversations.last_activity_ts) AS started_at,
                  conversations.last_activity_ts AS ended_at,
                  conversations.state AS state,
                  (
                    SELECT COUNT(*)
                    FROM user_turns
                    WHERE user_turns.conversation_id = conversations.id
                  ) AS turns,
                  (
                    -- A conversation with no events at all cannot be measured
                    -- and falls back to the caller's capped span. One that has
                    -- events but none inside the window worked zero minutes in
                    -- it, and must NOT inherit the fallback's phantom hours.
                    SELECT CASE
                      WHEN NOT EXISTS (
                        SELECT 1 FROM events
                        JOIN user_turns ON user_turns.id = events.user_turn_id
                        WHERE user_turns.conversation_id = conversations.id
                          AND events.timestamp_ms IS NOT NULL
                      ) THEN NULL
                      ELSE COALESCE(active.ms, 0)
                    END FROM (
                      SELECT SUM(burst_end - burst_start) AS ms FROM (
                        SELECT MIN(ts) AS burst_start, MAX(ts) AS burst_end
                        FROM (
                          SELECT ts,
                                 SUM(gap) OVER (ORDER BY ts ROWS UNBOUNDED PRECEDING) AS burst
                          FROM (
                            SELECT ts,
                                   CASE
                                     WHEN LAG(ts) OVER (ORDER BY ts) IS NULL
                                       OR ts - LAG(ts) OVER (ORDER BY ts) > ?
                                     THEN 1 ELSE 0
                                   END AS gap
                            FROM (
                              SELECT events.timestamp_ms AS ts
                              FROM events
                              JOIN user_turns ON user_turns.id = events.user_turn_id
                              WHERE user_turns.conversation_id = conversations.id
                                AND events.timestamp_ms >= ?
                                AND events.timestamp_ms < ?
                            )
                          )
                        )
                        GROUP BY burst
                      )
                    ) AS active
                  ) AS active_ms
           FROM conversations
           LEFT JOIN project_identity
             ON project_identity.activity_project_id = conversations.project_id
           WHERE COALESCE(conversations.started_at, conversations.last_activity_ts) < ?
             AND COALESCE(conversations.last_activity_ts, conversations.started_at) >= ?
           ORDER BY started_at ASC`
      ).all(idleGapMs, startMs, endMs, endMs, startMs);
      const intervalsByConversation = /* @__PURE__ */ new Map();
      const conversationIds = sessionRows.flatMap(
        (row) => isRow$1(row) ? [int(row.conversation_id)] : []
      );
      for (let offset = 0; offset < conversationIds.length; offset += 200) {
        const batch = conversationIds.slice(offset, offset + 200);
        const placeholders2 = batch.map(() => "?").join(", ");
        const intervals = db.prepare(
          `WITH points AS (
               SELECT user_turns.conversation_id AS conversation_id,
                      events.timestamp_ms AS ts
               FROM events
               JOIN user_turns ON user_turns.id = events.user_turn_id
               WHERE user_turns.conversation_id IN (${placeholders2})
                 AND events.timestamp_ms >= ? AND events.timestamp_ms < ?
             ), gapped AS (
               SELECT conversation_id, ts,
                      CASE
                        WHEN LAG(ts) OVER (PARTITION BY conversation_id ORDER BY ts) IS NULL
                          OR ts - LAG(ts) OVER (PARTITION BY conversation_id ORDER BY ts) > ?
                        THEN 1 ELSE 0
                      END AS gap
               FROM points
             ), grouped AS (
               SELECT conversation_id, ts,
                      SUM(gap) OVER (
                        PARTITION BY conversation_id ORDER BY ts ROWS UNBOUNDED PRECEDING
                      ) AS burst
               FROM gapped
             )
             SELECT conversation_id, MIN(ts) AS started_at, MAX(ts) AS ended_at
             FROM grouped
             GROUP BY conversation_id, burst
             ORDER BY conversation_id, started_at`
        ).all(...batch, startMs, endMs, idleGapMs);
        for (const interval of intervals) {
          if (!isRow$1(interval)) continue;
          const conversationId = int(interval.conversation_id);
          const activeIntervals = intervalsByConversation.get(conversationId) ?? [];
          activeIntervals.push({
            started_at: int(interval.started_at),
            ended_at: int(interval.ended_at)
          });
          intervalsByConversation.set(conversationId, activeIntervals);
        }
      }
      return sessionRows.flatMap(
        (row) => isRow$1(row) ? [
          {
            active_intervals: intOrNull(row.active_ms) === null ? null : intervalsByConversation.get(int(row.conversation_id)) ?? [],
            project_id: intOrNull(row.project_id),
            project_seed: seedFor(
              textOrNull$2(row.project_root),
              textOrNull$2(row.project_remote),
              textOrNull$2(row.project_compatibility_kind)
            ),
            started_at: int(row.started_at),
            ended_at: intOrNull(row.ended_at),
            turns: int(row.turns),
            finished: text$2(row.state) === "finished",
            active_ms: intOrNull(row.active_ms)
          }
        ] : []
      );
    },
    async listWrappedSessionStarts(beforeStartedAtMs, beforeSessionId, limit) {
      const bounded = Math.max(0, Math.trunc(limit));
      if (bounded === 0 || !Number.isFinite(beforeStartedAtMs)) return [];
      const cursorSessionId = beforeSessionId === null ? null : Number(beforeSessionId);
      if (cursorSessionId !== null && !Number.isSafeInteger(cursorSessionId)) return [];
      const cursor = cursorSessionId === null ? {
        clause: "COALESCE(conversations.started_at, conversations.last_activity_ts) < ?",
        params: [beforeStartedAtMs]
      } : {
        clause: `(COALESCE(conversations.started_at, conversations.last_activity_ts) < ?
                        OR (
                          COALESCE(conversations.started_at, conversations.last_activity_ts) = ?
                          AND conversations.id < ?
                        ))`,
        params: [beforeStartedAtMs, beforeStartedAtMs, cursorSessionId]
      };
      return db.prepare(
        `SELECT conversations.id AS session_id,
                  COALESCE(conversations.started_at, conversations.last_activity_ts) AS started_at
           FROM conversations
           WHERE ${cursor.clause}
           ORDER BY started_at DESC, conversations.id DESC
           LIMIT ?`
      ).all(...cursor.params, bounded).flatMap(
        (row) => isRow$1(row) ? [{ session_id: text$2(row.session_id), started_at: int(row.started_at) }] : []
      );
    },
    async sumWrappedVisibleMinutes(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const row = db.prepare(
        `SELECT COALESCE(SUM(
                    (window_visible_seconds / 60.0)
                    * (MIN(ended_at_ms, ?) - MAX(started_at_ms, ?))
                    / (ended_at_ms - started_at_ms)
                  ), 0) AS minutes
           FROM app_usage_intervals
           WHERE started_at_ms < ? AND ended_at_ms > ? AND ended_at_ms > started_at_ms`
      ).get(endMs, startMs, endMs, startMs);
      const minutes = isRow$1(row) ? Number(row.minutes) || 0 : 0;
      return Math.round(minutes * 10) / 10;
    },
    async countWrappedFrictionSignals(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const row = db.prepare("SELECT COUNT(*) AS count FROM signals WHERE created_at >= ? AND created_at < ?").get(startMs, endMs);
      return isRow$1(row) ? int(row.count) : 0;
    },
    async countWrappedMergedPullRequests(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const rows2 = db.prepare(
        `SELECT conversation_id, name, input_json, result_text, is_error
           FROM tool_calls
           WHERE started_at_ms >= ? AND started_at_ms < ?
             AND (
               (name = 'Bash' AND input_json LIKE '%gh pr merge%')
               OR lower(name) LIKE '%github_merge_pull_request'
             )`
      ).all(startMs, endMs);
      return insights$1.countConfirmedWrappedPullRequestMerges(
        rows2.flatMap(
          (row) => isRow$1(row) ? [
            {
              conversationKey: int(row.conversation_id),
              name: text$2(row.name),
              inputJson: textOrNull$2(row.input_json),
              resultText: textOrNull$2(row.result_text),
              isError: int(row.is_error) !== 0
            }
          ] : []
        )
      );
    },
    async countWrappedFilesTouched(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const row = db.prepare(
        `SELECT COUNT(DISTINCT json_extract(input_json, '$.file_path')) AS count
           FROM tool_calls
           WHERE started_at_ms >= ? AND started_at_ms < ?
             AND name IN ('Edit', 'Write', 'MultiEdit')`
      ).get(startMs, endMs);
      return isRow$1(row) ? int(row.count) : 0;
    }
  };
}
const isRow = (value) => typeof value === "object" && value !== null;
const LINK_KINDS = ["thread", "project", "delivery", "signal"];
const MAX_REGISTERED_CONVERSATIONS = 5e3;
const MAX_LINKS = 1e3;
function runInTransaction(db, fn) {
  db.exec("BEGIN IMMEDIATE");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}
function text$1(value) {
  return typeof value === "string" ? value : String(value ?? "");
}
function linkRow(row) {
  const messageId = text$1(row.message_id);
  return {
    conversationRef: text$1(row.conversation_ref),
    messageId: messageId === "" ? null : messageId,
    kind: text$1(row.kind),
    cloudId: text$1(row.cloud_id),
    createdAtMs: Number(row.created_at)
  };
}
function messageRow(row) {
  const kind = text$1(row.kind);
  return {
    messageId: text$1(row.message_id),
    eventId: Number(row.id),
    turnPosition: Number(row.turn_position),
    role: kind === "user_text" ? "user" : kind === "tool_result" ? "tool" : "assistant",
    text: text$1(row.text),
    timestampMs: row.timestamp_ms === null || row.timestamp_ms === void 0 ? null : Number(row.timestamp_ms)
  };
}
function assertLink(link) {
  if (!link.conversationRef || link.conversationRef.length > 512)
    throw new Error("A conversation link needs a conversation ref");
  if (!LINK_KINDS.includes(link.kind))
    throw new Error(`Unknown conversation link kind ${link.kind}`);
  if (!link.cloudId || link.cloudId.length > 256) throw new Error("A conversation link needs a cloud id");
}
function createDesktopReferenceStore(db) {
  return {
    async replaceRegisteredConversations(registrations, refreshedAtMs) {
      const unique = /* @__PURE__ */ new Map();
      for (const registration of registrations) {
        if (!registration.harness || !registration.conversationId) continue;
        unique.set(`${registration.harness}\0${registration.conversationId}`, registration);
        if (unique.size > MAX_REGISTERED_CONVERSATIONS)
          throw new Error("Too many registered conversations to cache");
      }
      runInTransaction(db, () => {
        db.exec("DELETE FROM registered_conversations");
        const insert = db.prepare(
          "INSERT INTO registered_conversations (harness, conversation_id, refreshed_at) VALUES (?, ?, ?)"
        );
        for (const { harness, conversationId } of unique.values())
          insert.run(harness, conversationId, refreshedAtMs);
      });
    },
    async listRegisteredConversations() {
      return db.prepare(
        "SELECT harness, conversation_id FROM registered_conversations ORDER BY harness, conversation_id LIMIT ?"
      ).all(MAX_REGISTERED_CONVERSATIONS).filter(isRow).map((row) => ({ harness: text$1(row.harness), conversationId: text$1(row.conversation_id) }));
    },
    async upsertConversationLink(link) {
      assertLink(link);
      db.prepare(
        `INSERT INTO conversation_links (conversation_ref, message_id, kind, cloud_id, created_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(conversation_ref, message_id, kind, cloud_id) DO NOTHING`
      ).run(link.conversationRef, link.messageId ?? "", link.kind, link.cloudId, link.createdAtMs ?? Date.now());
    },
    async listConversationLinks(query) {
      const where = [];
      const params = [];
      if (query.conversationRef !== void 0) {
        where.push("conversation_ref = ?");
        params.push(query.conversationRef);
      }
      if (query.messageId !== void 0) {
        where.push("message_id = ?");
        params.push(query.messageId ?? "");
      }
      if (query.kind !== void 0) {
        where.push("kind = ?");
        params.push(query.kind);
      }
      if (query.cloudId !== void 0) {
        where.push("cloud_id = ?");
        params.push(query.cloudId);
      }
      const limit = Math.max(1, Math.min(MAX_LINKS, Math.trunc(query.limit ?? 200)));
      return db.prepare(
        `SELECT conversation_ref, message_id, kind, cloud_id, created_at FROM conversation_links
           ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
           ORDER BY created_at DESC, conversation_ref, message_id LIMIT ?`
      ).all(...params, limit).filter(isRow).map(linkRow);
    },
    async deleteConversationLink(link) {
      db.prepare(
        "DELETE FROM conversation_links WHERE conversation_ref = ? AND message_id = ? AND kind = ? AND cloud_id = ?"
      ).run(link.conversationRef, link.messageId ?? "", link.kind, link.cloudId);
    },
    async findConversationBySession(harness, sessionId) {
      const row = db.prepare(
        `SELECT id, ref, source, external_id FROM conversations
           WHERE source = ? AND (ref = ? OR external_id = ?)
           ORDER BY (ref = ?) DESC, last_activity_ts DESC LIMIT 1`
      ).get(harness, `${harness}:${sessionId}`, sessionId, `${harness}:${sessionId}`);
      if (!isRow(row)) return null;
      return { id: Number(row.id), ref: text$1(row.ref), harness: text$1(row.source), sessionId };
    },
    async listConversationMessages(conversationId, limit) {
      return db.prepare(
        `SELECT e.id, e.message_id, e.kind, e.text, e.timestamp_ms, t.position AS turn_position FROM events e
           JOIN user_turns t ON t.id = e.user_turn_id
           WHERE t.conversation_id = ? AND e.message_id IS NOT NULL
           ORDER BY t.position DESC, e.position DESC LIMIT ?`
      ).all(conversationId, Math.max(1, Math.min(5e3, Math.trunc(limit)))).filter(isRow).map(messageRow);
    },
    async findConversationMessage(conversationId, messageId) {
      const row = db.prepare(
        `SELECT e.id, e.message_id, e.kind, e.text, e.timestamp_ms, t.position AS turn_position FROM events e
           JOIN user_turns t ON t.id = e.user_turn_id
           WHERE t.conversation_id = ? AND e.message_id = ? LIMIT 1`
      ).get(conversationId, messageId);
      return isRow(row) ? messageRow(row) : null;
    }
  };
}
const COMMIT_WRITE_CHUNK = 2e3;
function rows(value) {
  return value.filter(insights$1.isRecord);
}
function text(value) {
  return value == null ? "" : String(value);
}
function hasColumn(db, table, column) {
  return rows(db.prepare(`PRAGMA table_info('${table}')`).all()).some((row) => row.name === column);
}
function isLegacyDesktop(db) {
  return hasColumn(db, "projects", "path") && !hasColumn(db, "projects", "kind");
}
function hasTable(db, name) {
  return rows(db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").all(name)).length > 0;
}
function commitRepositoryIdentity(remote, root) {
  const key = repositoryKey.repositoryMatchKey(remote);
  return key?.startsWith("git:") ? key.slice(4) : root;
}
function inTransaction(db, run) {
  db.exec("BEGIN IMMEDIATE");
  try {
    run();
    db.exec("COMMIT");
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
    }
    throw error;
  }
}
function createSqliteSearchIndexStore(db, options = {}) {
  const nowMs = options.nowMs ?? Date.now;
  const legacy = isLegacyDesktop(db);
  const definitions = legacy ? desktopSearch.DESKTOP_FTS_INDEXES : desktopSearch.SHARED_FTS_INDEXES;
  let installed = null;
  const available = () => {
    if (installed !== null) return installed;
    if (!desktopSearch.sqliteSupportsSearchIndex(db)) installed = false;
    else if (legacy)
      installed = hasTable(db, "search_index_backfill") && hasTable(db, "git_commits");
    else installed = desktopSearch.installSharedSearchIndexes(db, nowMs());
    return installed;
  };
  function listRepositories() {
    const byRepository = /* @__PURE__ */ new Map();
    const add = (remote, root, projectId, paths) => {
      if (!root) return;
      const repository = commitRepositoryIdentity(remote, root);
      const existing = byRepository.get(repository);
      const unique = [...new Set(paths.filter(Boolean))];
      if (!existing) byRepository.set(repository, { repository, projectId, paths: unique });
      else for (const path of unique) if (!existing.paths.includes(path)) existing.paths.push(path);
    };
    if (legacy) {
      const projects = desktopSearch.identifyLegacyDesktopProjects(
        rows(
          db.prepare("SELECT id, path, name, git_remote, display_path, updated_at FROM projects").all()
        ).map((row) => ({
          id: text(row.id),
          path: text(row.path),
          name: text(row.name),
          git_remote: row.git_remote == null ? null : text(row.git_remote),
          display_path: row.display_path == null ? null : text(row.display_path),
          updated_at: Number(row.updated_at) || 0
        }))
      );
      for (const project of projects) {
        if (project.kind !== "git") continue;
        add(project.canonicalRemote ?? null, project.root, project.id, [
          project.root,
          ...project.workspaceLocations.map((workspace) => workspace.path)
        ]);
      }
    } else {
      const workspaces = /* @__PURE__ */ new Map();
      if (hasTable(db, "workspace_locations")) {
        for (const row of rows(
          db.prepare("SELECT project_id, path FROM workspace_locations").all()
        )) {
          const list = workspaces.get(text(row.project_id)) ?? [];
          list.push(text(row.path));
          workspaces.set(text(row.project_id), list);
        }
      }
      for (const row of rows(
        db.prepare("SELECT id, repo_root, canonical_remote FROM projects WHERE kind = 'git'").all()
      )) {
        const root = text(row.repo_root);
        add(row.canonical_remote == null ? null : text(row.canonical_remote), root, text(row.id), [
          root,
          ...workspaces.get(text(row.id)) ?? []
        ]);
      }
    }
    return [...byRepository.values()];
  }
  const upsertRepository = (input) => {
    const count = Number(
      db.prepare("SELECT count(*) AS n FROM git_commits WHERE repository = ?").get(input.repository)?.n ?? 0
    );
    db.prepare(
      `INSERT INTO git_commit_repositories (repository, root, project_id, heads_json, commit_count, indexed_at, last_error)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (repository) DO UPDATE SET
         root = excluded.root,
         project_id = excluded.project_id,
         heads_json = CASE WHEN ? THEN excluded.heads_json ELSE git_commit_repositories.heads_json END,
         commit_count = excluded.commit_count,
         indexed_at = excluded.indexed_at,
         last_error = excluded.last_error`
    ).run(
      input.repository,
      input.root,
      input.projectId,
      JSON.stringify(input.heads ?? []),
      count,
      nowMs(),
      input.error,
      input.heads ? 1 : 0
    );
  };
  return {
    async available() {
      return available();
    },
    async backfillStep() {
      if (!available()) return { indexed: 0, done: true, remaining: 0 };
      return desktopSearch.runSearchIndexBackfillStep(db, definitions, { nowMs: nowMs() });
    },
    async optimize() {
      if (available()) desktopSearch.mergeSearchIndexes(db, definitions);
    },
    async listCommitRepositories() {
      return available() ? listRepositories() : [];
    },
    async getCommitRepositoryState(repository) {
      if (!available()) return null;
      const row = db.prepare(
        "SELECT repository, heads_json, commit_count, indexed_at FROM git_commit_repositories WHERE repository = ?"
      ).get(repository);
      if (!insights$1.isRecord(row)) return null;
      let heads = [];
      try {
        const parsed = JSON.parse(text(row.heads_json));
        if (Array.isArray(parsed))
          heads = parsed.filter((sha) => typeof sha === "string");
      } catch {
        heads = [];
      }
      return {
        repository: text(row.repository),
        heads,
        commitCount: Number(row.commit_count) || 0,
        indexedAt: Number(row.indexed_at) || 0
      };
    },
    async writeCommits(input) {
      if (!available()) return;
      const insert = db.prepare(
        `INSERT OR IGNORE INTO git_commits
           (repository, sha, project_id, author, committed_at, subject, body, branch)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      );
      for (let start = 0; start < input.commits.length || start === 0; start += COMMIT_WRITE_CHUNK) {
        const chunk = input.commits.slice(start, start + COMMIT_WRITE_CHUNK);
        const last = start + COMMIT_WRITE_CHUNK >= input.commits.length;
        inTransaction(db, () => {
          for (const commit of chunk) {
            insert.run(
              input.repository,
              commit.sha,
              input.projectId,
              commit.author,
              commit.committedAtMs,
              commit.subject,
              commit.body,
              commit.branch
            );
          }
          if (last) {
            upsertRepository({
              repository: input.repository,
              root: input.root,
              projectId: input.projectId,
              heads: input.heads,
              error: null
            });
          }
        });
        if (last) break;
      }
    },
    async recordCommitIndexError(input) {
      if (!available()) return;
      inTransaction(db, () => upsertRepository({ ...input, error: input.error.slice(0, 500) }));
    }
  };
}
const MAX_LEGACY_PROJECT_EXCLUSIONS = 1e3;
const MAX_FIELD_LENGTH = 1001;
const MAX_WORKSPACE_PATHS = 256;
const MAX_PATH_LENGTH = 4096;
function tableColumns(db) {
  return new Set(
    db.prepare("SELECT name FROM pragma_table_info('project_exclusions')").all().flatMap(
      (row) => typeof row === "object" && row !== null && typeof row.name === "string" ? [row.name] : []
    )
  );
}
const textOrNull$1 = (value) => typeof value === "string" && value !== "" ? value : null;
function workspacePaths(value) {
  if (typeof value !== "string") return [];
  try {
    const paths = JSON.parse(value);
    return Array.isArray(paths) ? paths.filter(
      (path) => typeof path === "string" && path.length <= MAX_PATH_LENGTH
    ).slice(0, MAX_WORKSPACE_PATHS) : [];
  } catch {
    return [];
  }
}
function readLegacyProjectExclusions(db, options = {}) {
  const columns = tableColumns(db);
  if (columns.size === 0) return null;
  const pattern = columns.has("pattern") ? `substr(pattern, 1, ${MAX_FIELD_LENGTH})` : "NULL";
  const rows2 = db.prepare(
    `SELECT id,
              substr(root, 1, ${MAX_FIELD_LENGTH}) AS root,
              substr(canonical_remote, 1, ${MAX_FIELD_LENGTH}) AS canonical_remote,
              ${pattern} AS pattern
              ${options.workspacePaths ? ", workspace_paths_json" : ""}
         FROM project_exclusions
        ORDER BY excluded_at DESC
        LIMIT ${MAX_LEGACY_PROJECT_EXCLUSIONS}`
  ).all().flatMap((row) => {
    if (typeof row !== "object" || row === null) return [];
    const value = row;
    return [
      {
        id: String(value.id),
        root: typeof value.root === "string" ? value.root : "",
        canonicalRemote: textOrNull$1(value.canonical_remote),
        pattern: textOrNull$1(value.pattern),
        ...options.workspacePaths ? { workspacePaths: workspacePaths(value.workspace_paths_json) } : {}
      }
    ];
  });
  const count = db.prepare("SELECT COUNT(*) AS total FROM project_exclusions").get();
  return { rows: rows2, total: Number(count?.total ?? rows2.length) };
}
function removeLegacyProjectExclusions(db, ids) {
  if (tableColumns(db).size === 0) return 0;
  const remove = db.prepare("DELETE FROM project_exclusions WHERE id = ?");
  db.exec("BEGIN IMMEDIATE");
  try {
    for (const id of ids) remove.run(id);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  const count = db.prepare("SELECT COUNT(*) AS total FROM project_exclusions").get();
  const remaining = Number(count?.total ?? 0);
  if (remaining === 0) db.exec("DROP TABLE IF EXISTS project_exclusions");
  return remaining;
}
const MAX_GATE_CONVERSATION_SOURCES = 5e4;
const BATCH = 250;
const textOrNull = (value) => typeof value === "string" && value !== "" ? value : null;
function listStoredConversationSources(db, limit = MAX_GATE_CONVERSATION_SOURCES) {
  return db.prepare(
    `SELECT s.kind AS source_kind, s.path AS source_path, c.cwd AS cwd,
              p.path AS project_path, p.git_remote AS git_remote
       FROM conversations c
       JOIN sources s ON s.id = c.source_id
       LEFT JOIN projects p ON p.id = c.project_id
       ORDER BY c.last_activity_ts DESC
       LIMIT ?`
  ).all(limit).flatMap((row) => {
    const r = row;
    const sourceKind = textOrNull(r.source_kind);
    const sourcePath = textOrNull(r.source_path);
    if (!sourceKind || !sourcePath) return [];
    return [
      {
        sourceKind,
        sourcePath,
        cwd: textOrNull(r.cwd),
        projectPath: textOrNull(r.project_path),
        gitRemote: textOrNull(r.git_remote)
      }
    ];
  });
}
function listSourcesWithoutConversation(db, limit = MAX_GATE_CONVERSATION_SOURCES) {
  return db.prepare(
    `SELECT s.path AS path FROM sources s
       WHERE s.last_mtime_ms IS NOT NULL
         AND NOT EXISTS (SELECT 1 FROM conversations c WHERE c.source_id = s.id)
       LIMIT ?`
  ).all(limit).flatMap((row) => {
    const path = textOrNull(row.path);
    return path ? [path] : [];
  });
}
function forgetConversationSources(db, paths) {
  const unique = [...new Set(paths)];
  if (unique.length === 0) return 0;
  let removed = 0;
  db.exec("BEGIN IMMEDIATE");
  try {
    for (let index2 = 0; index2 < unique.length; index2 += BATCH) {
      const batch = unique.slice(index2, index2 + BATCH);
      const placeholders2 = batch.map(() => "?").join(", ");
      const result = db.prepare(
        `DELETE FROM conversations
           WHERE source_id IN (SELECT id FROM sources WHERE path IN (${placeholders2}))`
      ).run(...batch);
      removed += Number(result?.changes ?? 0);
      db.prepare(
        `UPDATE sources
         SET last_mtime_ms = NULL, last_size = NULL, last_byte_offset = NULL, last_cursor = NULL
         WHERE path IN (${placeholders2})`
      ).run(...batch);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return removed;
}
function createSqliteStorage(db, options = {}) {
  return insights$1.createSqlStorage(createAsyncSql(db), options);
}
function createAsyncSql(db) {
  return {
    async exec(ddl) {
      db.exec(ddl);
    },
    async run(query, params) {
      db.prepare(query).run(...params);
    },
    async get(query, params) {
      const row = db.prepare(query).get(...params);
      return insights$1.isRecord(row) ? row : null;
    },
    async all(query, params) {
      return db.prepare(query).all(...params).flatMap((row) => insights$1.isRecord(row) ? [row] : []);
    }
  };
}
function createDesktopSqliteStorage(db, options) {
  const { tablePrefix: _legacyTablePrefix, ...sharedOptions } = options;
  const shared = createSqliteStorage(db, sharedOptions);
  const desktopConversations = createDesktopConversationStore(db, options);
  const desktopImprove = createDesktopImproveStore(db, options);
  const desktopProjects = createDesktopProjectStore(db);
  return {
    ...shared,
    search: desktopSearch.createDesktopSearchStore(db),
    projects: createDesktopProjectCompatibilityStore(db, desktopProjects, shared.projects),
    conversations: createDesktopConversationCompatibilityStore(db, desktopConversations),
    improve: createDesktopImproveCompatibilityStore(db, desktopImprove, options),
    signalAnalytics: createDesktopSignalAnalyticsStore(db),
    wrapped: createDesktopWrappedStore(db),
    desktopConversations,
    desktopImprove,
    desktopProjects,
    desktopReferences: createDesktopReferenceStore(db)
  };
}
function createReadOnlySqliteSourceCursorStore(db) {
  return insights$1.createReadOnlySqlSourceCursorStore(createAsyncSql(db));
}
exports.SCHEMA = insights$1.SCHEMA;
exports.DESKTOP_FTS_INDEXES = desktopSearch.DESKTOP_FTS_INDEXES;
exports.SHARED_FTS_INDEXES = desktopSearch.SHARED_FTS_INDEXES;
exports.createDesktopSearchStore = desktopSearch.createDesktopSearchStore;
exports.installDesktopSearchIndexes = desktopSearch.installDesktopSearchIndexes;
exports.installSharedSearchIndexes = desktopSearch.installSharedSearchIndexes;
exports.readSearchIndexWatermarks = desktopSearch.readSearchIndexWatermarks;
exports.runSearchIndexBackfillStep = desktopSearch.runSearchIndexBackfillStep;
exports.sqliteSupportsSearchIndex = desktopSearch.sqliteSupportsSearchIndex;
exports.MAX_GATE_CONVERSATION_SOURCES = MAX_GATE_CONVERSATION_SOURCES;
exports.MAX_LEGACY_PROJECT_EXCLUSIONS = MAX_LEGACY_PROJECT_EXCLUSIONS;
exports.commitRepositoryIdentity = commitRepositoryIdentity;
exports.createAsyncSql = createAsyncSql;
exports.createDesktopConversationStore = createDesktopConversationStore;
exports.createDesktopImproveCompatibilityStore = createDesktopImproveCompatibilityStore;
exports.createDesktopImproveStore = createDesktopImproveStore;
exports.createDesktopReferenceStore = createDesktopReferenceStore;
exports.createDesktopSignalAnalyticsStore = createDesktopSignalAnalyticsStore;
exports.createDesktopSqliteStorage = createDesktopSqliteStorage;
exports.createDesktopWrappedStore = createDesktopWrappedStore;
exports.createReadOnlySqliteSourceCursorStore = createReadOnlySqliteSourceCursorStore;
exports.createSqliteSearchIndexStore = createSqliteSearchIndexStore;
exports.createSqliteStorage = createSqliteStorage;
exports.forgetConversationSources = forgetConversationSources;
exports.listDesktopProjectPathResolutionCandidates = listDesktopProjectPathResolutionCandidates;
exports.listSourcesWithoutConversation = listSourcesWithoutConversation;
exports.listStoredConversationSources = listStoredConversationSources;
exports.readLegacyProjectExclusions = readLegacyProjectExclusions;
exports.removeLegacyProjectExclusions = removeLegacyProjectExclusions;
exports.runDesktopMigration = runDesktopMigration;
exports.runDesktopMigrations = runDesktopMigrations;
//# sourceMappingURL=index-DvaJIvS-.js.map

//# debugId=7c56dbd3-5297-53c2-b48f-22b264a75d40
