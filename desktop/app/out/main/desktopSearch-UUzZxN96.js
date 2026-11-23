"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="44088ec2-7e51-560c-ac57-fc49db231417")}catch(e){}}();

const deliveryBriefs = require("./deliveryBriefs-CbTihYeZ.js");
const TOOLING_DIRS = /* @__PURE__ */ new Set([".git", ".claude", ".cursor", ".codex", ".pi", ".omp"]);
const WORKTREE_BUCKETS = /* @__PURE__ */ new Set(["worktrees", "workspaces", "worktree", "projects", "sessions"]);
function normalizePathSeparators(path) {
  return path.replace(/\\/g, "/");
}
function pathLeaf(path) {
  const segments = normalizePathSeparators(path).split("/").filter(Boolean);
  return segments[segments.length - 1] ?? path;
}
function describeProjectPath(cwd, branch, options = {}) {
  const norm = normalizePathSeparators(cwd);
  const rootPrefix = norm.startsWith("//") ? "//" : norm.startsWith("/") ? "/" : "";
  const parts = norm.split("/").filter(Boolean);
  if (parts.length === 0) {
    const fallback = cwd || "(unknown)";
    return {
      project: fallback,
      projectRoot: cwd || fallback,
      branch,
      display: fallback
    };
  }
  const toolingIdx = parts.findIndex((part) => TOOLING_DIRS.has(part));
  if (toolingIdx === -1) {
    const project2 = parts[parts.length - 1];
    return { project: project2, projectRoot: norm, branch, display: project2 };
  }
  if (parts[toolingIdx] === ".codex" && (parts[toolingIdx + 1] === "worktrees" || parts[toolingIdx + 1] === "workspaces")) {
    const worktree2 = parts[toolingIdx + 2];
    const project2 = parts[toolingIdx + 3] ?? worktree2 ?? parts[parts.length - 1];
    const projectRoot2 = parts[toolingIdx + 3] !== void 0 ? `${rootPrefix}${parts.slice(0, toolingIdx + 1).join("/")}/projects/${project2}` : norm;
    const display2 = worktree2 ? `${project2} · ${worktree2}` : project2;
    return { project: project2, projectRoot: projectRoot2, worktree: worktree2, toolingDir: ".codex", branch, display: display2 };
  }
  const normalizedHome = normalizePathSeparators(options.homeDir ?? "").replace(/\/+$/, "");
  const cursorToolingRoot = `${rootPrefix}${parts.slice(0, toolingIdx + 1).join("/")}`;
  if (parts[toolingIdx] === ".cursor" && parts[toolingIdx + 1] === "worktrees" && parts[toolingIdx + 2] !== void 0 && parts[toolingIdx + 3] !== void 0 && normalizedHome !== "" && cursorToolingRoot === `${normalizedHome}/.cursor`) {
    const project2 = parts[toolingIdx + 2];
    const worktree2 = parts[toolingIdx + 3];
    const projectRoot2 = `${rootPrefix}${parts.slice(0, toolingIdx + 1).join("/")}/projects/${project2}`;
    return {
      project: project2,
      projectRoot: projectRoot2,
      worktree: worktree2,
      toolingDir: ".cursor",
      branch,
      display: `${project2} · ${worktree2}`
    };
  }
  const project = toolingIdx > 0 ? parts[toolingIdx - 1] : parts[parts.length - 1];
  const toolingDir = parts[toolingIdx];
  const projectRoot = toolingIdx > 0 ? rootPrefix + parts.slice(0, toolingIdx).join("/") : norm;
  const bucket = parts[toolingIdx + 1];
  let worktree;
  if (bucket && WORKTREE_BUCKETS.has(bucket)) {
    worktree = parts[toolingIdx + 2];
  }
  const display = worktree ? `${project} · ${worktree}` : project;
  return { project, projectRoot, worktree, toolingDir, branch, display };
}
const LEGACY_UNDOTTED_WORKTREE_PATH_RE = /(?:^|\/)(claude|cursor|pi|omp)\/(?:worktrees|workspaces|worktree|sessions)\/(.+)$/;
const CODEX_PROJECT_PATH_RE = /(?:^|\/)\.codex\/projects\/([^/]+)$/;
const CODEX_WORKTREE_PATH_RE = /(?:^|\/)\.codex\/worktrees\/[^/]+\/.+$/;
const SYNTHETIC_CODEX_DATE_RE = /^codex\/\d{4}\/\d{2}\/\d{2}$/;
function normalizeLegacyPath(path) {
  return normalizePathSeparators(path).replace(/\/{2,}/g, "/");
}
function isSyntheticCodexDatePath(path) {
  return SYNTHETIC_CODEX_DATE_RE.test(normalizeLegacyPath(path));
}
function splitProjectName(value) {
  return value.split(/[-_\s/]+/).filter(Boolean).map((part) => part.toLocaleLowerCase());
}
function pathParts(path) {
  return normalizeLegacyPath(path).split("/").filter(Boolean).map((part) => part.toLocaleLowerCase());
}
function endsWithParts(parts, suffix) {
  if (suffix.length === 0 || suffix.length > parts.length) return false;
  return suffix.every((part, index) => parts[parts.length - suffix.length + index] === part);
}
function remoteRepoName(remote) {
  if (!remote) return null;
  const trimmed = remote.trim().replace(/\.git$/i, "");
  const lastSeparator = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf(":"));
  const name = lastSeparator >= 0 ? trimmed.slice(lastSeparator + 1) : trimmed;
  return name || null;
}
function describeLegacyWorktreePath(path, options) {
  const normalized = normalizeLegacyPath(path);
  if (CODEX_PROJECT_PATH_RE.test(normalized)) return null;
  const pathInfo = describeProjectPath(normalized, void 0, options);
  if (pathInfo.worktree && pathInfo.toolingDir) {
    return { root: pathInfo.projectRoot };
  }
  const match = LEGACY_UNDOTTED_WORKTREE_PATH_RE.exec(normalized);
  if (!match) return null;
  const root = normalized.slice(0, match.index).replace(/\/$/, "");
  return { root: root || normalized };
}
function workspaceClaimedByAnotherRow(workspacePath, row, rows2) {
  const normalizedWorkspacePath = normalizeLegacyPath(workspacePath);
  return rows2.some(
    (candidate) => String(candidate.id) !== String(row.id) && candidate.workspace_locations?.some(
      (workspace) => normalizeLegacyPath(workspace.path) === normalizedWorkspacePath
    )
  );
}
function codexProjectName(path) {
  const match = CODEX_PROJECT_PATH_RE.exec(normalizeLegacyPath(path));
  return match?.[1] ?? null;
}
function hasCodexProjectIdentity(name, rows2) {
  return rows2.some((row) => codexProjectName(row.path) === name);
}
function findCanonicalRow(path, rows2) {
  const parts = pathParts(path);
  const matches = rows2.filter((row) => !isSyntheticCodexDatePath(row.path)).map((row) => ({ row, nameParts: splitProjectName(row.name) })).filter(
    ({ row, nameParts }) => nameParts.length > 1 && normalizeLegacyPath(row.path) !== normalizeLegacyPath(path) && endsWithParts(parts, nameParts)
  ).sort((a, b) => b.nameParts.length - a.nameParts.length);
  return matches[0]?.row ?? null;
}
function findCanonicalCodexProjectRow(name, rows2) {
  const normalizedName = name.toLocaleLowerCase();
  const candidates = rows2.filter(
    (row) => Boolean(row.git_remote) && !codexProjectName(row.path) && pathLeaf(row.path).toLocaleLowerCase() === normalizedName
  );
  const remotes = new Set(candidates.map((row) => row.git_remote?.trim()).filter(Boolean));
  if (remotes.size !== 1) return null;
  return candidates.sort((left, right) => (right.updated_at ?? 0) - (left.updated_at ?? 0))[0] ?? null;
}
function workspaceKind(path, kind, options) {
  if (describeLegacyWorktreePath(path, options) || CODEX_WORKTREE_PATH_RE.test(normalizeLegacyPath(path))) {
    return "worktree";
  }
  return kind === "git" ? "repo-root" : "folder-root";
}
function projectIdentityForRow(row, rows2, options) {
  if (isSyntheticCodexDatePath(row.path)) return null;
  const normalized = normalizeLegacyPath(row.path);
  const displayWorkspacePath = normalizeLegacyPath(row.display_path ?? row.path);
  const displayClaimedElsewhere = workspaceClaimedByAnotherRow(displayWorkspacePath, row, rows2);
  if (displayClaimedElsewhere && codexProjectName(normalized)) return null;
  const workspacePath = displayClaimedElsewhere ? normalized : displayWorkspacePath;
  const remoteName = remoteRepoName(row.git_remote);
  const worktree = describeLegacyWorktreePath(workspacePath, options);
  const rootCandidate = worktree?.root ?? normalized;
  const syntheticCodexName = codexProjectName(normalized);
  const managedWorktreeName = worktree ? describeProjectPath(workspacePath, void 0, options).project : null;
  const syntheticManagedName = syntheticCodexName ?? managedWorktreeName;
  const canonicalRow = findCanonicalRow(rootCandidate, rows2) ?? (syntheticManagedName ? findCanonicalCodexProjectRow(syntheticManagedName, rows2) : null);
  const canonicalPath = canonicalRow ? normalizeLegacyPath(canonicalRow.path) : rootCandidate;
  const codexName = codexProjectName(canonicalPath) ?? codexProjectName(normalized);
  const managedIdentityName = codexName ?? managedWorktreeName ?? (hasCodexProjectIdentity(row.name, rows2) ? row.name : null);
  const pathInfo = describeProjectPath(canonicalPath, void 0, options);
  const name = remoteName ?? remoteRepoName(canonicalRow?.git_remote) ?? managedIdentityName ?? canonicalRow?.name ?? pathInfo.project ?? pathLeaf(canonicalPath);
  const kind = row.git_remote || canonicalRow?.git_remote || worktree || codexName || hasCodexProjectIdentity(name, rows2) ? "git" : "folder";
  const id = String(canonicalRow?.id ?? row.id);
  const canonicalRemote = row.git_remote ?? canonicalRow?.git_remote ?? void 0;
  const key = canonicalRemote ?? (managedIdentityName ? `git:${managedIdentityName}` : `${kind}:${canonicalPath}`);
  return {
    id,
    key,
    kind,
    name,
    root: canonicalPath,
    lastActivityTs: row.updated_at ?? canonicalRow?.updated_at ?? void 0,
    canonicalRemote,
    workspaces: [
      ...row.workspace_locations ?? [],
      {
        id: String(row.id),
        path: workspacePath,
        kind: workspaceKind(workspacePath, kind, options)
      }
    ],
    legacyId: String(row.id)
  };
}
function identifyLegacyDesktopProjects(rows2, options = {}) {
  const byKey = /* @__PURE__ */ new Map();
  for (const row of rows2) {
    const identity = projectIdentityForRow(row, rows2, options);
    if (!identity) continue;
    const existing = byKey.get(identity.key);
    if (!existing) {
      byKey.set(identity.key, {
        id: identity.id,
        kind: identity.kind,
        name: identity.name,
        root: identity.root,
        ...identity.lastActivityTs === void 0 ? {} : { lastActivityTs: identity.lastActivityTs },
        canonicalRemote: identity.canonicalRemote,
        workspaceLocations: identity.workspaces.filter(
          (workspace, index, locations) => locations.findIndex((candidate) => candidate.path === workspace.path) === index
        ),
        legacyIds: [identity.legacyId]
      });
      continue;
    }
    if (codexProjectName(existing.root) && !codexProjectName(identity.root)) {
      existing.id = identity.id;
      existing.root = identity.root;
    }
    if (identity.lastActivityTs !== void 0) {
      existing.lastActivityTs = Math.max(existing.lastActivityTs ?? 0, identity.lastActivityTs);
    }
    for (const workspace of identity.workspaces) {
      if (!existing.workspaceLocations.some((candidate) => candidate.path === workspace.path)) {
        existing.workspaceLocations.push(workspace);
      }
    }
    if (!existing.legacyIds.includes(identity.legacyId)) existing.legacyIds.push(identity.legacyId);
  }
  return [...byKey.values()].sort(
    (left, right) => (right.lastActivityTs ?? 0) - (left.lastActivityTs ?? 0) || left.name.localeCompare(right.name)
  );
}
const MAX_SEARCH_TERMS = 16;
const MAX_TOKEN_CHARS = 64;
const TOKEN_PATTERN = /[\p{L}\p{N}\p{Co}]+/gu;
const COMBINING_MARKS = new RegExp("\\p{M}+", "gu");
function foldSearchText(value) {
  return value.normalize("NFD").replace(COMBINING_MARKS, "").toLowerCase();
}
function tokensOf(value) {
  const tokens = [];
  for (const match of value.matchAll(TOKEN_PATTERN)) {
    const folded = foldSearchText(match[0]);
    if (folded) tokens.push(folded.slice(0, MAX_TOKEN_CHARS));
  }
  return tokens;
}
function parseSearchTerms(query) {
  const terms = [];
  const pattern = /"([^"]*)"?|(\S+)/g;
  for (const match of query.matchAll(pattern)) {
    const quoted = match[1];
    const typed = (quoted ?? match[2] ?? "").trim();
    const tokens = tokensOf(typed);
    if (tokens.length === 0) continue;
    const prefix = quoted === void 0 && !(tokens.length === 1 && tokens[0].length < 2);
    terms.push({ tokens, prefix, raw: typed.toLowerCase().replace(/\s+/g, " ") });
    if (terms.length === MAX_SEARCH_TERMS) break;
  }
  return terms;
}
function buildFtsMatchExpression(terms) {
  if (terms.length === 0) return null;
  return terms.map((term) => `"${term.tokens.join(" ").replaceAll('"', '""')}"${term.prefix ? "*" : ""}`).join(" AND ");
}
function ftsColumnExpression(column2, expression) {
  if (!/^[a-z_]+$/.test(column2)) throw new Error(`invalid FTS column ${column2}`);
  return `${column2} : (${expression})`;
}
function likePatternsForTerms(terms) {
  return terms.map((term) => `%${escapeLikePattern(term.raw)}%`);
}
function escapeLikePattern(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}
const EXCERPT_CHARS = 220;
const EXCERPT_LEAD_CHARS = 72;
const MAX_SCANNED_CHARS = 256 * 1024;
function compact(value) {
  const head = value.length > MAX_SCANNED_CHARS ? value.slice(0, MAX_SCANNED_CHARS) : value;
  return head.replace(/\s+/g, " ").trim();
}
function originalPrefixLength(token, foldedLength) {
  let folded = 0;
  let length = 0;
  for (const char of token) {
    if (folded >= foldedLength) break;
    folded += foldSearchText(char).length;
    length += char.length;
  }
  return length;
}
function tokenMatchRanges(text2, terms) {
  const wanted = terms.flatMap(
    (term) => term.tokens.map((token, index) => ({
      token,
      prefix: term.prefix && index === term.tokens.length - 1
    }))
  );
  const ranges = [];
  for (const match of text2.matchAll(TOKEN_PATTERN)) {
    const folded = foldSearchText(match[0]);
    let best = 0;
    for (const { token, prefix } of wanted) {
      if (prefix ? folded.startsWith(token) : folded === token) {
        best = Math.max(best, prefix ? token.length : folded.length);
      }
    }
    if (best === 0) continue;
    const start = match.index;
    const length = best >= folded.length ? match[0].length : originalPrefixLength(match[0], best);
    ranges.push([start, start + length]);
  }
  return ranges;
}
function substringMatchRanges(text2, terms) {
  const lower = text2.toLowerCase();
  const ranges = [];
  for (const term of terms) {
    const needle = term.raw;
    if (!needle) continue;
    let from = 0;
    while (ranges.length < 64) {
      const index = lower.indexOf(needle, from);
      if (index < 0) break;
      ranges.push([index, index + needle.length]);
      from = index + needle.length;
    }
  }
  return mergeRanges(ranges);
}
function mergeRanges(ranges) {
  const sorted = [...ranges].sort((left, right) => left[0] - right[0] || left[1] - right[1]);
  const merged = [];
  for (const range of sorted) {
    const last = merged.at(-1);
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  return merged;
}
function searchExcerpt(value, terms) {
  const text2 = compact(value == null ? "" : String(value));
  let ranges = tokenMatchRanges(text2, terms);
  if (ranges.length === 0) ranges = substringMatchRanges(text2, terms);
  const first = ranges[0];
  if (text2.length <= EXCERPT_CHARS || !first) {
    const excerpt2 = text2.slice(0, EXCERPT_CHARS);
    return { excerpt: excerpt2, ranges: clipRanges(ranges, 0, excerpt2.length, 0) };
  }
  const start = Math.max(0, first[0] - EXCERPT_LEAD_CHARS);
  const end = Math.min(text2.length, Math.max(first[1], start + EXCERPT_CHARS));
  const leading = start > 0 ? "…" : "";
  const body = text2.slice(start, end);
  const trimmedStart = body.length - body.trimStart().length;
  const trimmed = body.trim();
  const excerpt = `${leading}${trimmed}${end < text2.length ? "…" : ""}`;
  return {
    excerpt,
    ranges: clipRanges(
      ranges,
      start + trimmedStart,
      start + trimmedStart + trimmed.length,
      leading.length - start - trimmedStart
    )
  };
}
function clipRanges(ranges, from, to, shift) {
  return ranges.filter(([start, end]) => end > from && start < to).map(([start, end]) => [
    Math.max(start, from) + shift,
    Math.min(end, to) + shift
  ]).filter(([start, end]) => end > start);
}
function termsMatchText(value, terms) {
  if (terms.length === 0) return false;
  const tokens = tokensOf(value);
  return terms.every((term) => {
    const [first] = term.tokens;
    if (first === void 0) return false;
    for (let index = 0; index + term.tokens.length <= tokens.length; index += 1) {
      const fits = term.tokens.every((token, offset) => {
        const candidate = tokens[index + offset];
        const last = offset === term.tokens.length - 1;
        return last && term.prefix ? candidate.startsWith(token) : candidate === token;
      });
      if (fits) return true;
    }
    return false;
  });
}
function searchRank(title, terms, bm25) {
  const foldedTitle = tokensOf(title).join(" ");
  const foldedQuery = terms.map((term) => term.tokens.join(" ")).join(" ");
  if (foldedQuery && foldedTitle === foldedQuery) return 0;
  if (foldedQuery && foldedTitle.startsWith(foldedQuery)) return 1;
  if (termsMatchText(title, terms)) return 2;
  return 5;
}
const SEARCH_FTS_TOKENIZE = "tokenize='unicode61 remove_diacritics 2', prefix='2 3 4'";
const FTS_OPTIONS = `content='', contentless_delete=1, ${SEARCH_FTS_TOKENIZE}`;
const SEARCH_INDEX_RESULT_CHARS = 8 * 1024;
const SEARCH_INDEX_INPUT_CHARS = 16 * 1024;
const SEARCH_BACKFILL_CHUNK_ROWS = 5e3;
const SEARCH_BACKFILL_CHUNK_CHARS = 4 * 1024 * 1024;
const column = (name, source = name) => ({
  name,
  expr: (row) => `${row}.${source}`
});
const headColumn = (name, source, chars) => ({
  name,
  expr: (row) => `substr(coalesce(${row}.${source}, ''), 1, ${chars})`,
  full: (row) => `${row}.${source}`
});
const eventText = {
  name: "text",
  expr: (row) => `CASE WHEN ${row}.kind = 'tool_result' THEN substr(${row}.text, 1, ${SEARCH_INDEX_RESULT_CHARS}) ELSE ${row}.text END`,
  full: (row) => `${row}.text`
};
const eventIndexed = (row) => `${row}.text IS NOT NULL AND NOT (${row}.kind = 'tool_result' AND ${row}.tool_call_id IS NOT NULL)`;
const COMMIT_FTS_INDEX = {
  name: "search_fts_commits",
  table: "git_commits",
  rowid: "id",
  columns: [column("subject"), column("body")],
  updateOf: ["subject", "body"]
};
const DESKTOP_FTS_INDEXES = [
  {
    name: "search_fts_conversations",
    table: "conversations",
    rowid: "id",
    columns: [
      column("title"),
      column("ref"),
      column("preview"),
      column("branch"),
      column("cwd"),
      column("workspace")
    ],
    updateOf: ["title", "ref", "preview", "branch", "cwd", "workspace"]
  },
  {
    name: "search_fts_prompts",
    table: "user_turns",
    rowid: "id",
    columns: [column("prompt")],
    updateOf: ["prompt"]
  },
  {
    name: "search_fts_events",
    table: "events",
    rowid: "id",
    columns: [eventText],
    when: eventIndexed,
    updateOf: ["text", "kind", "tool_call_id"]
  },
  {
    name: "search_fts_tool_calls",
    table: "tool_calls",
    rowid: "id",
    columns: [
      column("name"),
      headColumn("input", "input_json", SEARCH_INDEX_INPUT_CHARS),
      headColumn("result", "result_text", SEARCH_INDEX_RESULT_CHARS)
    ],
    updateOf: ["name", "input_json", "result_text"]
  },
  {
    name: "search_fts_todos",
    table: "todos",
    rowid: "id",
    columns: [column("content")],
    updateOf: ["content"]
  },
  COMMIT_FTS_INDEX
];
const SHARED_FTS_INDEXES = [
  {
    name: "search_fts_conversations",
    table: "conversations",
    rowid: "rowid",
    columns: [column("title"), column("ref"), column("preview")],
    updateOf: ["title", "ref", "preview"]
  },
  {
    name: "search_fts_prompts",
    table: "conversation_transcript_user_turns",
    rowid: "rowid",
    columns: [column("prompt")],
    updateOf: ["prompt"]
  },
  {
    name: "search_fts_events",
    table: "conversation_transcript_events",
    rowid: "rowid",
    columns: [eventText],
    // The shared schema finds user text through the turn's prompt.
    when: (row) => `${row}.kind != 'user_text' AND ${eventIndexed(row)}`,
    updateOf: ["text", "kind", "tool_call_id"]
  },
  {
    name: "search_fts_tool_calls",
    table: "conversation_transcript_tool_calls",
    rowid: "rowid",
    columns: [
      column("name"),
      headColumn("input", "input_json", SEARCH_INDEX_INPUT_CHARS),
      headColumn("result", "result_text", SEARCH_INDEX_RESULT_CHARS)
    ],
    updateOf: ["name", "input_json", "result_text"]
  },
  {
    name: "search_fts_todos",
    table: "conversation_transcript_todos",
    rowid: "rowid",
    columns: [column("content")],
    updateOf: ["content"]
  },
  COMMIT_FTS_INDEX
];
const COMMIT_INDEX_DDL = `
CREATE TABLE IF NOT EXISTS git_commits (
  id           INTEGER PRIMARY KEY,
  repository   TEXT NOT NULL,
  sha          TEXT NOT NULL,
  project_id   TEXT,
  author       TEXT NOT NULL,
  committed_at INTEGER NOT NULL,
  subject      TEXT NOT NULL,
  body         TEXT NOT NULL DEFAULT '',
  branch       TEXT,
  UNIQUE (repository, sha)
);
CREATE INDEX IF NOT EXISTS idx_git_commits_sha ON git_commits (sha);
CREATE INDEX IF NOT EXISTS idx_git_commits_committed_at ON git_commits (committed_at);
CREATE TABLE IF NOT EXISTS git_commit_repositories (
  repository   TEXT PRIMARY KEY,
  root         TEXT NOT NULL,
  project_id   TEXT,
  heads_json   TEXT NOT NULL DEFAULT '[]',
  commit_count INTEGER NOT NULL DEFAULT 0,
  indexed_at   INTEGER NOT NULL,
  last_error   TEXT
);
`;
const BACKFILL_DDL = `
CREATE TABLE IF NOT EXISTS search_index_backfill (
  name       TEXT PRIMARY KEY,
  high_rowid INTEGER NOT NULL,
  low_rowid  INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
`;
function columnNames(definition) {
  return definition.columns.map((entry) => entry.name).join(", ");
}
function columnExprs(definition, row) {
  return definition.columns.map((entry) => entry.expr(row)).join(", ");
}
function ftsIndexDdl(definition) {
  const { name, table, rowid } = definition;
  const cols = columnNames(definition);
  const insertWhen = definition.when ? ` WHEN ${definition.when("new")}` : "";
  const updateWhere = definition.when ? ` WHERE ${definition.when("new")}` : "";
  return `
CREATE VIRTUAL TABLE IF NOT EXISTS ${name} USING fts5(${cols}, ${FTS_OPTIONS});
CREATE TRIGGER IF NOT EXISTS ${name}_ai AFTER INSERT ON ${table}${insertWhen} BEGIN
  INSERT OR REPLACE INTO ${name}(rowid, ${cols}) VALUES (new.${rowid}, ${columnExprs(definition, "new")});
END;
CREATE TRIGGER IF NOT EXISTS ${name}_ad AFTER DELETE ON ${table} BEGIN
  DELETE FROM ${name} WHERE rowid = old.${rowid};
END;
CREATE TRIGGER IF NOT EXISTS ${name}_au AFTER UPDATE OF ${definition.updateOf.join(", ")} ON ${table} BEGIN
  DELETE FROM ${name} WHERE rowid = old.${rowid};
  INSERT OR REPLACE INTO ${name}(rowid, ${cols})
    SELECT new.${rowid}, ${columnExprs(definition, "new")}${updateWhere};
END;
`;
}
function tableExists(db, name) {
  return !!db.prepare("SELECT name FROM sqlite_master WHERE type IN ('table', 'view') AND name = ?").get(name);
}
function sqliteSupportsSearchIndex(db) {
  try {
    const row = db.prepare(
      "SELECT sqlite_compileoption_used('ENABLE_FTS5') AS fts5, sqlite_version() AS version"
    ).get();
    if (Number(row?.fts5) !== 1) return false;
    const [major = 0, minor = 0] = String(row?.version ?? "").split(".").map((part) => Number(part));
    return major > 3 || major === 3 && minor >= 43;
  } catch {
    return false;
  }
}
function installSearchIndexes(db, definitions, nowMs = Date.now()) {
  if (!sqliteSupportsSearchIndex(db)) return false;
  db.exec(COMMIT_INDEX_DDL);
  db.exec(BACKFILL_DDL);
  for (const definition of definitions) {
    if (!tableExists(db, definition.table)) continue;
    const created = !tableExists(db, definition.name);
    db.exec(ftsIndexDdl(definition));
    db.prepare(
      `INSERT OR ${created ? "REPLACE" : "IGNORE"} INTO search_index_backfill (name, high_rowid, low_rowid, updated_at)
       SELECT ?, coalesce(max(${definition.rowid}), 0), coalesce(max(${definition.rowid}), 0) + 1, ?
       FROM ${definition.table}`
    ).run(definition.name, nowMs);
  }
  return true;
}
function installDesktopSearchIndexes(db, nowMs) {
  return installSearchIndexes(db, DESKTOP_FTS_INDEXES, nowMs);
}
function installSharedSearchIndexes(db, nowMs) {
  return installSearchIndexes(db, SHARED_FTS_INDEXES, nowMs);
}
function readSearchIndexWatermarks(db) {
  try {
    const rows2 = db.prepare("SELECT name, low_rowid FROM search_index_backfill").all();
    db.prepare(
      "SELECT rowid FROM search_fts_commits WHERE search_fts_commits MATCH 'x' LIMIT 0"
    ).all();
    return new Map(rows2.map((row) => [String(row.name), Number(row.low_rowid) || 0]));
  } catch {
    return null;
  }
}
function runSearchIndexBackfillStep(db, definitions, options = {}) {
  const chunkRows = options.chunkRows ?? SEARCH_BACKFILL_CHUNK_ROWS;
  const chunkChars = options.chunkChars ?? SEARCH_BACKFILL_CHUNK_CHARS;
  const pending = db.prepare("SELECT name, low_rowid FROM search_index_backfill WHERE low_rowid > 1").all().map((row) => ({ name: String(row.name), low_rowid: Number(row.low_rowid) }));
  const definitionByName = new Map(definitions.map((definition2) => [definition2.name, definition2]));
  const next = pending.filter((row) => definitionByName.has(row.name)).sort((left, right) => right.low_rowid - left.low_rowid)[0];
  if (!next) return { indexed: 0, done: true, remaining: 0 };
  const definition = definitionByName.get(next.name);
  const cols = columnNames(definition);
  const where = definition.when ? ` AND ${definition.when("t")}` : "";
  let indexed = 0;
  db.exec("BEGIN IMMEDIATE");
  try {
    const current = db.prepare("SELECT low_rowid FROM search_index_backfill WHERE name = ?").get(definition.name);
    const low = Number(current?.low_rowid ?? 0);
    const rows2 = db.prepare(
      `SELECT t.${definition.rowid} AS rid, ${columnExprs(definition, "t")}
         FROM ${definition.table} t
         WHERE t.${definition.rowid} < ?${where}
         ORDER BY t.${definition.rowid} DESC
         LIMIT ?`
    ).all(low, chunkRows);
    const insert = db.prepare(
      `INSERT OR REPLACE INTO ${definition.name}(rowid, ${cols}) VALUES (?${", ?".repeat(definition.columns.length)})`
    );
    let chars = 0;
    let nextLow = low;
    for (const row of rows2) {
      const values = Object.entries(row).filter(([key]) => key !== "rid").map(([, value]) => value == null ? null : value);
      insert.run(Number(row.rid), ...values);
      indexed += 1;
      nextLow = Number(row.rid);
      for (const value of values) if (typeof value === "string") chars += value.length;
      if (chars >= chunkChars) break;
    }
    if (indexed === rows2.length && rows2.length < chunkRows) nextLow = 0;
    db.prepare("UPDATE search_index_backfill SET low_rowid = ?, updated_at = ? WHERE name = ?").run(
      nextLow,
      options.nowMs ?? Date.now(),
      definition.name
    );
    db.exec("COMMIT");
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch {
    }
    throw error;
  }
  const remaining = db.prepare(
    "SELECT coalesce(sum(low_rowid), 0) AS n FROM search_index_backfill WHERE low_rowid > 1"
  ).get().n;
  return { indexed, done: Number(remaining) === 0, remaining: Number(remaining) || 0 };
}
function mergeSearchIndexes(db, definitions, pages = 200) {
  for (const definition of definitions) {
    try {
      db.prepare(
        `INSERT INTO ${definition.name}(${definition.name}, rank) VALUES ('merge', ?)`
      ).run(pages);
    } catch {
    }
  }
}
const JSON_IDS = "(SELECT value FROM json_each(?))";
const RECENCY_MS = 60 * 864e5;
const COMMON_MATCHES = 5e3;
function rankOf(row) {
  return row.tier + 1 / (1 + Math.abs(row.score));
}
function rankedRows(context, source, index, options = {}) {
  const parts = [];
  const phrase = context.phrase;
  const tier = () => options.title && phrase ? `(CASE WHEN lower(${options.title}) = ? THEN 0 WHEN lower(${options.title}) LIKE ? ESCAPE '\\' THEN 1 ELSE 2 END)` : "2";
  const tierParams = () => options.title && phrase ? [phrase, `${escapeLikePattern(phrase)}%`] : [];
  const scoped = (column2) => options.scopedRowids ? ` AND ${column2} IN (${options.scopedRowids})` : "";
  const scopeParams = () => options.scopedRowids ? options.scopeParams ?? [] : [];
  const extraWhere = options.where ? ` AND ${options.where}` : "";
  const whereParams = options.where ? options.whereParams ?? [] : [];
  const watermarks = context.watermarks;
  if (context.match && watermarks?.has(index.name)) {
    const weights = options.weights?.length ? `, ${options.weights.join(", ")}` : "";
    const recency = options.at ? ` / (1.0 + max(0, ? - coalesce(${options.at}, 0)) / ${RECENCY_MS}.0)` : "";
    const needsRow = Boolean(options.title || options.at || options.where);
    const fts = index.name;
    const join = needsRow ? ` CROSS JOIN ${index.table} t ON t.${index.rowid} = ${fts}.rowid` : "";
    const common = !options.title && !options.at && int$1(
      all(
        context.db,
        `SELECT count(*) AS n FROM (SELECT 1 FROM ${fts} WHERE ${fts} MATCH ?${scoped(`+${fts}.rowid`)} LIMIT ${COMMON_MATCHES + 1})`,
        [context.match, ...scopeParams()]
      )[0]?.n
    ) > COMMON_MATCHES;
    if (common)
      parts.push({
        sql: `SELECT ${fts}.rowid AS rid, 2 AS tier, 0.0 AS score FROM ${fts}${join}
          WHERE ${fts} MATCH ?${scoped(`+${fts}.rowid`)}${needsRow ? extraWhere : ""}`,
        params: [context.match, ...scopeParams(), ...needsRow ? whereParams : []],
        streaming: { rowid: `${fts}.rowid` }
      });
    else
      parts.push({
        sql: `SELECT ${fts}.rowid AS rid, ${tier()} AS tier, bm25(${fts}${weights})${recency} AS score
        FROM ${fts}${join}
        WHERE ${fts} MATCH ?${scoped(`+${fts}.rowid`)}${needsRow ? extraWhere : ""}`,
        params: [
          ...tierParams(),
          ...options.at ? [context.now] : [],
          context.match,
          ...scopeParams(),
          ...needsRow ? whereParams : []
        ]
      });
  }
  const low = watermarks?.get(index.name);
  if (context.likePatterns.length > 0 && !(low !== void 0 && low <= 1)) {
    const below = low === void 0 ? "" : ` AND t.${index.rowid} < ?`;
    const text2 = `lower(${concatColumns(index, "t", context.substring)})`;
    const likes = context.likePatterns.map(() => ` AND ${text2} LIKE ? ESCAPE '\\'`).join("");
    parts.push({
      ...options.title && phrase ? {} : { streaming: { rowid: `t.${index.rowid}` } },
      sql: `SELECT t.${index.rowid} AS rid, ${tier()} AS tier, 0.0 AS score FROM ${index.table} t
        WHERE 1 = 1${below}${whenSql(index, "t")}${likes}${scoped(`t.${index.rowid}`)}${extraWhere}`,
      params: [
        ...tierParams(),
        ...low === void 0 ? [] : [low],
        ...context.likePatterns,
        ...scopeParams(),
        ...whereParams
      ]
    });
  }
  if (options.extra) {
    const found2 = context.match && watermarks?.has(index.name);
    parts.push({
      sql: `SELECT x.rid AS rid, 2 AS tier, 0.0 AS score FROM (${options.extra.sql}) x${found2 ? ` WHERE x.rid NOT IN (SELECT rowid FROM ${index.name} WHERE ${index.name} MATCH ?)` : ""}`,
      params: [...options.extra.params, ...found2 ? [context.match] : []]
    });
  }
  if (!parts.length) return [];
  const after = context.after.get(source);
  const resume = after ? " WHERE (tier, score, -rid) > (?, ?, ?)" : "";
  const streamFrom = !after ? "all" : after[0] < 2 || after[0] === 2 && after[1] < 0 ? "all" : after[0] === 2 && after[1] === 0 ? "below" : "none";
  const live = parts.filter((entry) => !entry.streaming || streamFrom !== "none");
  if (!live.length) return [];
  const sql = live.map(
    (entry) => entry.streaming ? `SELECT * FROM (${entry.sql}${streamFrom === "below" ? ` AND ${entry.streaming.rowid} < ?` : ""} ORDER BY ${entry.streaming.rowid} DESC LIMIT ?)` : `SELECT * FROM (SELECT rid, tier, score FROM (${entry.sql})${resume} ORDER BY tier, score, -rid LIMIT ?)`
  ).join(" UNION ALL ");
  const params = live.flatMap(
    (entry) => entry.streaming ? [...entry.params, ...streamFrom === "below" ? [-after[2]] : [], context.pageLimit] : [...entry.params, ...after ?? [], context.pageLimit]
  );
  const found = all(
    context.db,
    `SELECT rid, min(tier) AS tier, min(score) AS score FROM (${sql}) GROUP BY rid ORDER BY tier, score, -rid LIMIT ?`,
    [...params, context.pageLimit]
  ).map((row) => ({ rid: int$1(row.rid), tier: int$1(row.tier), score: Number(row.score) }));
  if (found.length >= context.pageLimit) context.more.add(source);
  return found.slice(0, context.pageLimit - 1);
}
function listedRows(context, source, sql, params) {
  const after = context.after.get(source);
  const found = all(
    context.db,
    `SELECT rid, 3 AS tier, score FROM (${sql})${after ? " WHERE (3, score, -rid) > (?, ?, ?)" : ""} ORDER BY score, -rid LIMIT ?`,
    [...params, ...after ?? [], context.pageLimit]
  ).map((row) => ({ rid: int$1(row.rid), tier: 3, score: Number(row.score) }));
  if (found.length >= context.pageLimit) context.more.add(source);
  return found.slice(0, context.pageLimit - 1);
}
function placed(context, result, source, row) {
  context.ranked.set(result, { source, cursor: [row.tier, row.score, -row.rid] });
}
function nextCursor(context, page, truncated) {
  if (!truncated) return void 0;
  const next = new Map(context.after);
  const onPage = new Set(page);
  const earlier = (result) => {
    const rid = context.ridOf.get(result);
    return rid !== void 0 && context.shownBefore.has(rid);
  };
  const bySource = /* @__PURE__ */ new Map();
  for (const [result, place] of context.ranked)
    bySource.set(place.source, [
      ...bySource.get(place.source) ?? [],
      { result, cursor: place.cursor }
    ]);
  for (const [source, rows2] of bySource) {
    rows2.sort((left, right) => compareCursor(left.cursor, right.cursor));
    let last;
    for (const row of rows2) {
      if (!onPage.has(row.result) && !earlier(row.result)) break;
      last = row.cursor;
    }
    if (last) next.set(source, last);
  }
  const shown = [
    ...context.shownBefore,
    ...page.flatMap((result) => context.exactRids.get(result) ?? [])
  ].slice(0, 80);
  return JSON.stringify({ now: context.now, after: Object.fromEntries(next), shown });
}
function compareCursor(left, right) {
  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
}
function decodeCursor(value) {
  const none = { now: null, after: /* @__PURE__ */ new Map(), shown: [], valid: false };
  if (!value) return none;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed.now !== "number" || !Number.isFinite(parsed.now) || typeof parsed.after !== "object" || !parsed.after)
      return none;
    const cursors = /* @__PURE__ */ new Map();
    for (const [source, cursor] of Object.entries(parsed.after)) {
      if (/^[a-z:-]{1,24}$/.test(source) && Array.isArray(cursor) && cursor.length === 3 && cursor.every((part) => typeof part === "number" && Number.isFinite(part)))
        cursors.set(source, cursor);
    }
    const shown = Array.isArray(parsed.shown) ? parsed.shown.filter((id) => Number.isSafeInteger(id)).slice(0, 80) : [];
    return { now: parsed.now, after: cursors, shown, valid: true };
  } catch {
    return none;
  }
}
function rows$1(value) {
  return value.filter((row) => typeof row === "object" && row !== null);
}
function text$1(value) {
  return value == null ? "" : String(value);
}
function textOrNull$1(value) {
  const valueText = text$1(value);
  return valueText ? valueText : null;
}
function int$1(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function intOrNull(value) {
  return value == null ? null : int$1(value);
}
function abortError() {
  const error = new Error("search query superseded");
  error.name = "AbortError";
  return error;
}
const yieldTurn = () => new Promise((resolve) => {
  const immediate = globalThis.setImmediate;
  if (immediate) immediate(resolve);
  else setTimeout(resolve, 0);
});
async function checkpoint(signal) {
  if (!signal) return;
  await yieldTurn();
  if (signal.aborted) throw abortError();
}
function inOrder(rows2, ids, column2 = "rid") {
  const at = new Map(ids.map((id, index) => [id, index]));
  return rows2.sort((a, b) => (at.get(int$1(a[column2])) ?? 0) - (at.get(int$1(b[column2])) ?? 0));
}
function all(db, sql, params) {
  return rows$1(db.prepare(sql).all(...params));
}
function concatColumns(index, alias, full = false) {
  return index.columns.map((entry) => `coalesce(${full && entry.full ? entry.full(alias) : entry.expr(alias)}, '')`).join(" || ' ' || ");
}
function hasQuery(context) {
  return context.match !== null || context.likePatterns.length > 0;
}
function whenSql(index, alias) {
  return index.when ? ` AND ${index.when(alias)}` : "";
}
function matchedTexts(db, index, rids, full = false) {
  if (rids.length === 0) return /* @__PURE__ */ new Map();
  const found = all(
    db,
    `SELECT t.${index.rowid} AS rid, ${concatColumns(index, "t", full)} AS matched_text
     FROM ${index.table} t WHERE t.${index.rowid} IN ${JSON_IDS}`,
    [JSON.stringify(rids)]
  );
  return new Map(found.map((row) => [int$1(row.rid), text$1(row.matched_text)]));
}
function conversationName(row, ref) {
  const title = text$1(row.title).trim();
  if (title) return title;
  const prompt = text$1(row.first_prompt).replace(/\s+/g, " ").trim();
  return prompt ? prompt.slice(0, 200) : ref;
}
function scopeSuffix(scope) {
  return scope ? ` AND ${scope.sql}` : "";
}
async function searchMessages(context, sources) {
  const pending = [];
  if (!hasQuery(context)) return { results: [], finish() {
  } };
  const scope = context.scope;
  for (const source of sources) {
    await checkpoint(context.signal);
    const scopedRowids = scope ? source.scopedRowidsSql(` AND ${scope.sql}`) : null;
    const key = `m-${source.kind}`;
    const ranked = new Map(
      rankedRows(context, key, source.index, {
        scopedRowids,
        scopeParams: scope?.params ?? [],
        ...source.rankWhere ? { where: source.rankWhere } : {}
      }).map((row) => [row.rid, row])
    );
    if (ranked.size === 0) continue;
    const metadata = inOrder(
      all(context.db, source.metadataSql(scopeSuffix(scope)), [
        JSON.stringify([...ranked.keys()]),
        ...scope?.params ?? []
      ]),
      [...ranked.keys()]
    );
    for (const row of metadata) {
      const rid = int$1(row.rid);
      const title = conversationName(row, text$1(row.conversation_ref));
      const matchId = intOrNull(row.match_id);
      const transcriptMatchKey = source.kind === "prompt" ? `turn-${matchId ?? 0}-prompt` : source.kind === "tool" ? `tool-${matchId ?? 0}` : source.kind === "todo" ? `todos-${int$1(row.list_id)}` : `event-${matchId ?? 0}`;
      const eventKind = text$1(row.event_kind);
      const matchLabel = source.kind === "prompt" ? "User" : source.kind === "tool" ? "Tool" : source.kind === "todo" ? "Tasks updated" : eventKind === "user_text" ? "User" : eventKind === "tool_result" ? "Tool result" : "Assistant";
      const place = ranked.get(rid);
      if (!place) continue;
      const result = {
        id: `message:${text$1(row.conversation_id)}:${transcriptMatchKey}`,
        category: "messages",
        title,
        subtitle: [text$1(row.project_label), text$1(row.harness)].filter(Boolean).join(" · ") || null,
        excerpt: null,
        rank: rankOf(place),
        updatedAt: int$1(row.last_activity_ts),
        conversationRef: text$1(row.conversation_ref),
        conversationId: text$1(row.conversation_id),
        transcriptMatchKey,
        matchLabel,
        turnPosition: intOrNull(row.turn_position),
        focusEventId: source.kind === "event" ? matchId : intOrNull(row.event_id),
        focusToolCallId: source.kind === "tool" ? matchId : null
      };
      placed(context, result, key, place);
      pending.push({ source, rid, result });
    }
  }
  return {
    results: pending.map((entry) => entry.result),
    finish(page) {
      const onPage = new Set(page);
      const bySource = /* @__PURE__ */ new Map();
      for (const entry of pending) {
        if (!onPage.has(entry.result)) continue;
        bySource.set(entry.source, [...bySource.get(entry.source) ?? [], entry]);
      }
      for (const [source, entries] of bySource) {
        const texts = matchedTexts(
          context.db,
          source.index,
          entries.map((entry) => entry.rid),
          context.substring
        );
        for (const entry of entries) applyExcerpt(entry.result, texts.get(entry.rid), context.terms);
      }
    }
  };
}
function applyExcerpt(result, value, terms) {
  if (value === void 0) return;
  const { excerpt, ranges } = searchExcerpt(value, terms);
  result.excerpt = excerpt || null;
  if (excerpt && ranges.length > 0) result.ranges = ranges;
}
async function searchConversations(context, source) {
  const scope = context.scope;
  const key = "c";
  let found = [];
  if (hasQuery(context)) {
    const scopedRowids = scope ? source.scopedRowidsSql(` AND ${scope.sql}`) : null;
    found = rankedRows(context, key, source.index, {
      weights: source.weights,
      title: "t.title",
      at: "t.last_activity_ts",
      scopedRowids,
      scopeParams: scope?.params ?? [],
      ...context.likePatterns.length > 0 ? {
        extra: {
          sql: source.projectMatchSql(
            context.likePatterns.length,
            scope ? ` AND ${scope.sql}` : ""
          ),
          params: [...context.likePatterns, ...scope?.params ?? []]
        }
      } : {}
    });
  } else if (scope) {
    found = listedRows(context, key, source.listSql(` AND ${scope.sql}`), scope.params);
  }
  const scores = new Map(found.map((row) => [row.rid, row]));
  if (scores.size === 0) return [];
  await checkpoint(context.signal);
  const metadata = inOrder(
    all(context.db, source.metadataSql(scopeSuffix(scope)), [
      JSON.stringify([...scores.keys()]),
      ...scope?.params ?? []
    ]),
    [...scores.keys()]
  );
  return metadata.map((row) => {
    const rid = int$1(row.rid);
    const title = conversationName(row, text$1(row.ref));
    const matchedText = [text$1(row.title), text$1(row.preview), text$1(row.branch), text$1(row.location)].filter(Boolean).join(" · ");
    const result = {
      id: `conversation:${text$1(row.id)}`,
      category: "conversations",
      title,
      subtitle: [text$1(row.project_label), text$1(row.location), text$1(row.harness)].filter(Boolean).join(" · ") || null,
      excerpt: null,
      rank: rankOf(scores.get(rid)),
      updatedAt: int$1(row.last_activity_ts),
      conversationRef: text$1(row.ref),
      conversationId: text$1(row.id),
      projectId: textOrNull$1(row.project_id),
      workspaceLocationId: textOrNull$1(row.workspace_location_id),
      harnessId: text$1(row.harness)
    };
    applyExcerpt(result, matchedText, context.terms);
    placed(context, result, key, scores.get(rid));
    return result;
  });
}
async function searchCommits(context, input) {
  if (!context.watermarks && !hasTable(context.db, "git_commits")) return [];
  const candidates = /* @__PURE__ */ new Map();
  const add = (candidate) => {
    const existing = candidates.get(candidate.rid);
    if (!existing) {
      candidates.set(candidate.rid, candidate);
      return;
    }
    if (candidate.rank !== void 0 && (existing.rank === void 0 || candidate.rank < existing.rank))
      existing.rank = candidate.rank;
    if (existing.score === null) existing.score = candidate.score;
    existing.ranked ??= candidate.ranked;
  };
  const rangeLookup = context.db.prepare(
    "SELECT id FROM git_commits WHERE sha >= ? AND sha < ? ORDER BY committed_at DESC LIMIT ?"
  );
  let scoped = null;
  if (input.commitShas) {
    scoped = /* @__PURE__ */ new Set();
    for (const prefix of input.commitShas) {
      for (const row of rows$1(rangeLookup.all(prefix, `${prefix}g`, context.candidateLimit))) {
        scoped.add(int$1(row.id));
      }
    }
    if (scoped.size === 0) return [];
  }
  const exactId = input.exactId;
  const digitsOnly = exactId !== void 0 && /^\d+$/.test(exactId);
  const firstPage = context.firstPage;
  const inScopeSql = scoped ? " AND id IN (SELECT value FROM json_each(?))" : "";
  const inScopeParams = scoped ? [JSON.stringify([...scoped])] : [];
  if (firstPage && exactId && exactId.length >= 4) {
    for (const row of all(
      context.db,
      `SELECT id FROM git_commits WHERE sha >= ? AND sha < ?${inScopeSql} ORDER BY committed_at DESC LIMIT 20`,
      [exactId, `${exactId}g`, ...inScopeParams]
    ))
      add({ rid: int$1(row.id), score: null, rank: digitsOnly ? -0.5 : -1 });
  }
  await checkpoint(context.signal);
  const pullRequestNumber = digitsOnly ? exactId : void 0;
  if (firstPage && pullRequestNumber && context.watermarks?.has(COMMIT_FTS_INDEX.name)) {
    for (const row of all(
      context.db,
      `SELECT id FROM git_commits WHERE id IN (SELECT rowid FROM ${COMMIT_FTS_INDEX.name} WHERE ${COMMIT_FTS_INDEX.name} MATCH ?)
         AND (subject || ' ') GLOB ?${inScopeSql} ORDER BY committed_at DESC LIMIT 50`,
      [
        ftsColumnExpression("subject", `"${pullRequestNumber}"`),
        `*#${pullRequestNumber}[^0-9]*`,
        ...inScopeParams
      ]
    ))
      add({ rid: int$1(row.id), score: null, rank: -1 });
  }
  if (hasQuery(context)) {
    const scopedIds = scoped ? "SELECT value FROM json_each(?)" : null;
    for (const row of rankedRows(context, "g", COMMIT_FTS_INDEX, {
      weights: [4, 1],
      title: "t.subject",
      at: "t.committed_at",
      scopedRowids: scopedIds,
      scopeParams: scoped ? [JSON.stringify([...scoped])] : []
    }))
      add({ rid: row.rid, score: row.score, ranked: row });
  } else if (scoped && !exactId) {
    for (const row of listedRows(
      context,
      "g",
      "SELECT id AS rid, -coalesce(committed_at, 0) AS score FROM git_commits WHERE id IN (SELECT value FROM json_each(?))",
      [JSON.stringify([...scoped])]
    ))
      add({ rid: row.rid, score: row.score, ranked: row });
  }
  if (candidates.size === 0) return [];
  await checkpoint(context.signal);
  const metadata = inOrder(
    all(
      context.db,
      `SELECT id, repository, sha, project_id, author, committed_at, subject, body, branch
     FROM git_commits WHERE id IN ${JSON_IDS}`,
      [JSON.stringify([...candidates.keys()])]
    ),
    [...candidates.keys()],
    "id"
  );
  const results = [];
  for (const row of metadata) {
    const candidate = candidates.get(int$1(row.id));
    if (!candidate) continue;
    const subject = text$1(row.subject);
    const rank = candidate.rank;
    const sha = text$1(row.sha);
    const shortSha = sha.slice(0, 7);
    const author = text$1(row.author);
    const committedAt = int$1(row.committed_at);
    const result = {
      id: `commit:${text$1(row.repository)}:${sha}`,
      category: "commits",
      title: subject,
      subtitle: `${shortSha} · ${author}`,
      excerpt: null,
      rank: rank ?? (candidate.ranked ? rankOf(candidate.ranked) : 3),
      updatedAt: committedAt,
      sha,
      shortSha,
      repository: text$1(row.repository),
      projectId: textOrNull$1(row.project_id),
      subject,
      author,
      committedAt,
      branch: textOrNull$1(row.branch)
    };
    if (rank !== void 0 && rank < 0) result.exact = true;
    if (candidate.ranked) placed(context, result, "g", candidate.ranked);
    const body = text$1(row.body);
    if (body && context.terms.length > 0) {
      const { excerpt, ranges } = searchExcerpt(body, context.terms);
      if (ranges.length > 0) {
        result.excerpt = excerpt;
        result.ranges = ranges;
      }
    }
    context.ridOf.set(result, int$1(row.id));
    if (rank !== void 0 && rank < 0) context.exactRids.set(result, int$1(row.id));
    if (context.shownBefore.has(int$1(row.id))) continue;
    results.push(result);
  }
  return results;
}
function hasTable(db, name) {
  return rows$1(db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").all(name)).length > 0;
}
function conversationScope(input, harnessColumn = "c.source") {
  const parts = [];
  const params = [];
  if (input.harnesses?.length) {
    parts.push(`${harnessColumn} IN ${JSON_IDS}`);
    params.push(JSON.stringify(input.harnesses));
  }
  if (input.conversationSessions) {
    const sessions = input.conversationSessions.map(
      () => `(${harnessColumn} = ? AND instr(c.ref, ?) > 0)`
    );
    parts.push(sessions.length ? `(${sessions.join(" OR ")})` : "0");
    for (const session of input.conversationSessions)
      params.push(session.harness, session.sessionId);
  }
  if (input.conversationRef) {
    parts.push("c.ref = ?");
    params.push(input.conversationRef);
  }
  if (input.conversationRefs) {
    parts.push(`c.ref IN ${JSON_IDS}`);
    params.push(JSON.stringify(input.conversationRefs));
  }
  return parts.length > 0 ? { sql: parts.join(" AND "), params } : null;
}
function createWatermarkReader(db, nowMs = Date.now) {
  let cached = null;
  let readAtMs = -Infinity;
  return () => {
    const now = nowMs();
    const ttl = cached ? 1e3 : 3e4;
    if (now - readAtMs >= ttl) {
      cached = readSearchIndexWatermarks(db);
      readAtMs = now;
    }
    return cached;
  };
}
function pageFields(input, phrase) {
  const cursor = decodeCursor(input.after);
  return {
    pageLimit: deliveryBriefs.normalizeGlobalSearchLimit(input.limit) + 1,
    phrase: phrase.toLowerCase(),
    after: cursor.after,
    ranked: /* @__PURE__ */ new Map(),
    more: /* @__PURE__ */ new Set(),
    now: cursor.now ?? Date.now(),
    firstPage: !cursor.valid,
    shownBefore: new Set(cursor.shown),
    exactRids: /* @__PURE__ */ new Map(),
    ridOf: /* @__PURE__ */ new Map()
  };
}
function createFtsSearchContext(db, input, watermarks, candidateLimit, options = {}, harnessColumn = "c.source") {
  const parsed = parseSearchTerms(input.query);
  if (input.matching === "substring") {
    const needle = input.query.trim().toLowerCase();
    return {
      db,
      terms: parsed.length > 0 ? parsed : [{ tokens: [], prefix: false, raw: needle }],
      match: null,
      likePatterns: needle.length >= 2 ? [`%${escapeLikePattern(needle)}%`] : [],
      substring: true,
      watermarks: null,
      candidateLimit,
      ...pageFields(input, needle),
      scope: conversationScope(input, harnessColumn),
      ...options.signal ? { signal: options.signal } : {}
    };
  }
  return {
    db,
    terms: parsed,
    match: buildFtsMatchExpression(parsed),
    likePatterns: likePatternsForTerms(parsed),
    substring: false,
    ...pageFields(input, parsed.map((term) => term.raw).join(" ")),
    watermarks,
    candidateLimit,
    scope: conversationScope(input, harnessColumn),
    ...options.signal ? { signal: options.signal } : {}
  };
}
function sortSearchResults(results) {
  return results.sort((left, right) => left.rank - right.rank);
}
function rows(value) {
  return value.filter((row) => typeof row === "object" && row !== null);
}
function text(value) {
  return value == null ? "" : String(value);
}
function textOrNull(value) {
  const valueText = text(value);
  return valueText ? valueText : null;
}
function int(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function desktopIndex(name) {
  const index = DESKTOP_FTS_INDEXES.find((definition) => definition.name === name);
  if (!index) throw new Error(`missing desktop search index ${name}`);
  return index;
}
const FIRST_PROMPT = `(SELECT first_turn.prompt FROM user_turns first_turn
    WHERE first_turn.conversation_id = c.id AND trim(coalesce(first_turn.prompt, '')) != ''
    ORDER BY first_turn.position LIMIT 1) AS first_prompt`;
const MESSAGE_COLUMNS = `c.id AS conversation_id, c.ref AS conversation_ref, c.title AS title,
  ${FIRST_PROMPT},
  c.source AS harness, c.last_activity_ts AS last_activity_ts, p.name AS project_label`;
const DESKTOP_MESSAGE_SOURCES = [
  {
    kind: "prompt",
    index: desktopIndex("search_fts_prompts"),
    // A turn whose prompt is also a user_text event is found through the event instead.
    metadataSql: (scope) => `SELECT ut.id AS rid, ${MESSAGE_COLUMNS}, ut.position AS turn_position,
        ut.id AS match_id, NULL AS event_id, NULL AS list_id, NULL AS event_kind
      FROM user_turns ut JOIN conversations c ON c.id = ut.conversation_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE ut.id IN ${JSON_IDS}${scope}`,
    rankWhere: `NOT EXISTS (SELECT 1 FROM events user_event
      WHERE user_event.user_turn_id = t.id AND user_event.kind = 'user_text')`,
    scopedRowidsSql: (scope) => `SELECT ut.id FROM user_turns ut
      JOIN conversations c ON c.id = ut.conversation_id WHERE 1 = 1${scope}`
  },
  {
    kind: "event",
    index: desktopIndex("search_fts_events"),
    metadataSql: (scope) => `SELECT e.id AS rid, ${MESSAGE_COLUMNS}, ut.position AS turn_position,
        e.id AS match_id, NULL AS event_id, NULL AS list_id, e.kind AS event_kind
      FROM events e JOIN user_turns ut ON ut.id = e.user_turn_id
      JOIN conversations c ON c.id = ut.conversation_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE e.id IN ${JSON_IDS} AND e.text IS NOT NULL
        AND NOT (e.kind = 'tool_result' AND e.tool_call_id IS NOT NULL)${scope}`,
    scopedRowidsSql: (scope) => `SELECT e.id FROM events e
      JOIN user_turns ut ON ut.id = e.user_turn_id
      JOIN conversations c ON c.id = ut.conversation_id WHERE 1 = 1${scope}`
  },
  {
    kind: "tool",
    index: desktopIndex("search_fts_tool_calls"),
    metadataSql: (scope) => `SELECT tc.id AS rid, ${MESSAGE_COLUMNS}, ut.position AS turn_position,
        tc.id AS match_id, tc.event_id AS event_id, NULL AS list_id, NULL AS event_kind
      FROM tool_calls tc JOIN conversations c ON c.id = tc.conversation_id
      LEFT JOIN events e ON e.id = tc.event_id
      LEFT JOIN user_turns ut ON ut.id = e.user_turn_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE tc.id IN ${JSON_IDS}${scope}`,
    scopedRowidsSql: (scope) => `SELECT tc.id FROM tool_calls tc
      JOIN conversations c ON c.id = tc.conversation_id WHERE 1 = 1${scope}`
  },
  {
    kind: "todo",
    index: desktopIndex("search_fts_todos"),
    metadataSql: (scope) => `SELECT todo.id AS rid, ${MESSAGE_COLUMNS}, ut.position AS turn_position,
        todo.id AS match_id, NULL AS event_id, tl.id AS list_id, NULL AS event_kind
      FROM todos todo JOIN todo_lists tl ON tl.id = todo.list_id
      JOIN user_turns ut ON ut.id = tl.user_turn_id
      JOIN conversations c ON c.id = tl.conversation_id
      LEFT JOIN projects p ON p.id = c.project_id
      WHERE todo.id IN ${JSON_IDS}${scope}`,
    scopedRowidsSql: (scope) => `SELECT todo.id FROM todos todo
      JOIN todo_lists tl ON tl.id = todo.list_id
      JOIN conversations c ON c.id = tl.conversation_id WHERE 1 = 1${scope}`
  }
];
const PROJECT_TEXT = `lower(p.name || ' ' || p.path || ' ' || coalesce(p.display_path, '') || ' ' ||
  coalesce(p.git_remote, ''))`;
const DESKTOP_CONVERSATION_SOURCE = {
  index: desktopIndex("search_fts_conversations"),
  // title, ref, preview, branch, cwd, workspace
  weights: [4, 1, 1, 1, 1, 1],
  metadataSql: (scope) => `SELECT c.id AS rid, c.id AS id, c.ref AS ref, c.title AS title,
      c.preview AS preview, ${FIRST_PROMPT}, c.branch AS branch, c.source AS harness,
      c.project_id AS project_id,
      NULL AS workspace_location_id, c.last_activity_ts AS last_activity_ts,
      p.name AS project_label,
      coalesce(nullif(c.workspace, ''), nullif(c.cwd, ''), nullif(p.display_path, ''), p.path) AS location
    FROM conversations c LEFT JOIN projects p ON p.id = c.project_id
    WHERE c.id IN ${JSON_IDS}${scope}`,
  listSql: (scope) => `SELECT c.id AS rid, -coalesce(c.last_activity_ts, 0) AS score FROM conversations c WHERE 1 = 1${scope}`,
  scopedRowidsSql: (scope) => `SELECT c.id FROM conversations c WHERE 1 = 1${scope}`,
  projectMatchSql: (patternCount, scope) => `SELECT c.id AS rid FROM conversations c
    JOIN projects p ON p.id = c.project_id
    WHERE 1 = 1${` AND ${PROJECT_TEXT} LIKE ? ESCAPE '\\'`.repeat(patternCount)}${scope}`
};
function likeAll(expression, patternCount) {
  return Array.from({ length: patternCount }, () => `${expression} LIKE ? ESCAPE '\\'`).join(
    " AND "
  );
}
function createDesktopSearchStore(db) {
  const all2 = (sql, params) => rows(db.prepare(sql).all(...params));
  const watermarks = createWatermarkReader(db);
  return {
    async query(input, options = {}) {
      const categories = new Set(input.categories);
      const limit = deliveryBriefs.normalizeGlobalSearchLimit(input.limit);
      if (categories.size === 0) return { results: [], truncated: false };
      const candidateLimit = Math.max(limit + 1, 200);
      const context = createFtsSearchContext(db, input, watermarks(), candidateLimit, options);
      const results = [];
      const finishers = [];
      if (categories.has("conversations")) {
        results.push(...await searchConversations(context, DESKTOP_CONVERSATION_SOURCE));
      }
      if (categories.has("messages")) {
        const messages = await searchMessages(context, DESKTOP_MESSAGE_SOURCES);
        results.push(...messages.results);
        finishers.push(messages.finish);
      }
      if (categories.has("commits")) {
        results.push(...await searchCommits(context, input));
      }
      if (context.likePatterns.length > 0 && context.firstPage) {
        await checkpoint(options.signal);
        results.push(...searchSmallTables(context, categories, all2));
      }
      const ordered = sortSearchResults(results);
      const page = ordered.slice(0, limit);
      for (const finish of finishers) finish(page);
      const truncated = ordered.length > limit || context.more.size > 0;
      const next = nextCursor(context, page, truncated);
      return { results: page, truncated, ...next ? { next } : {} };
    }
  };
}
function searchSmallTables(context, categories, all2) {
  const { terms, likePatterns, candidateLimit } = context;
  const results = [];
  const canonicalFor = (ids) => {
    if (!ids.length) return [];
    const projectRows = all2(
      `SELECT id, path, name, git_remote, display_path, updated_at FROM projects
       WHERE id IN ${JSON_IDS}
          OR (git_remote IS NOT NULL AND git_remote IN (SELECT git_remote FROM projects WHERE id IN ${JSON_IDS}))
          OR path IN (SELECT path FROM projects WHERE id IN ${JSON_IDS})
          OR name IN (SELECT name FROM projects WHERE id IN ${JSON_IDS})`,
      [JSON.stringify(ids), JSON.stringify(ids), JSON.stringify(ids), JSON.stringify(ids)]
    );
    return identifyLegacyDesktopProjects(
      projectRows.map((row) => ({
        id: text(row.id),
        path: text(row.path),
        name: text(row.name),
        git_remote: textOrNull(row.git_remote),
        display_path: textOrNull(row.display_path),
        updated_at: int(row.updated_at)
      }))
    );
  };
  if (categories.has("projects")) {
    const projectText = `lower(name || ' ' || path || ' ' || coalesce(display_path, '') || ' ' || coalesce(git_remote, ''))`;
    const phrase = context.phrase;
    const matched = all2(
      `SELECT id FROM projects WHERE ${likeAll(projectText, likePatterns.length)}
       ORDER BY (CASE WHEN lower(name) = ? THEN 0 WHEN lower(name) LIKE ? ESCAPE '\\' THEN 1 ELSE 2 END),
                updated_at DESC, id LIMIT ?`,
      [...likePatterns, phrase, `${escapeLikePattern(phrase)}%`, candidateLimit]
    ).map((row) => text(row.id));
    const order = new Map(matched.map((id, index) => [id, index]));
    const place = (project) => Math.min(...project.legacyIds.map((id) => order.get(id) ?? Number.POSITIVE_INFINITY));
    const projects = canonicalFor(matched).filter((project) => Number.isFinite(place(project)));
    for (const project of projects) {
      const matchedText = [
        project.name,
        project.root,
        project.canonicalRemote,
        ...project.workspaceLocations.map((workspace) => workspace.path)
      ].filter(Boolean).join(" ");
      const { excerpt, ranges } = searchExcerpt(matchedText, terms);
      const at = place(project);
      results.push({
        id: `project:${project.id}`,
        category: "projects",
        title: project.name,
        subtitle: project.canonicalRemote ?? null,
        excerpt,
        ...ranges.length > 0 ? { ranges } : {},
        // Its SQL position: the name tier, then recency.
        rank: 2 + at / (matched.length + 1),
        updatedAt: project.lastActivityTs ?? 0,
        projectId: project.id,
        root: project.root
      });
    }
  }
  if (categories.has("setup")) {
    const setupText = `lower(coalesce(a.source_path, '') || ' ' || a.harness_id || ' ' || a.kind || ' ' || v.content)`;
    let setupRows = [];
    try {
      setupRows = all2(
        `SELECT a.id, a.project_id, a.harness_id, a.kind, a.scope, a.source_path,
                v.content, v.created_at
         FROM setup_artifacts a JOIN setup_versions v ON v.id = a.current_version_id
         WHERE ${likeAll(setupText, likePatterns.length)}
         ORDER BY v.created_at DESC
         LIMIT ?`,
        [...likePatterns, candidateLimit]
      );
    } catch (error) {
      if (!/no such table/i.test(String(error))) throw error;
    }
    const setupProjectIds = new Map(
      canonicalFor([
        ...new Set(setupRows.map((row) => text(row.project_id)).filter(Boolean))
      ]).flatMap((project) => project.legacyIds.map((legacyId) => [legacyId, project.id]))
    );
    for (const row of setupRows) {
      const sourcePath = textOrNull(row.source_path);
      const title = sourcePath?.split(/[\\/]/).filter(Boolean).at(-1) ?? `${text(row.harness_id)} ${text(row.kind)}`;
      const { excerpt, ranges } = searchExcerpt(row.content, terms);
      results.push({
        id: `setup:${text(row.id)}`,
        category: "setup",
        title,
        subtitle: `${text(row.harness_id)} · ${text(row.scope)} · ${text(row.kind)}`,
        excerpt,
        ...ranges.length > 0 ? { ranges } : {},
        rank: termsMatchText(title, terms) ? searchRank(title, terms) : 4.5,
        updatedAt: Date.parse(text(row.created_at)) || 0,
        artifactId: text(row.id),
        projectId: textOrNull(row.project_id) === null ? null : setupProjectIds.get(text(row.project_id)) ?? text(row.project_id),
        harnessId: text(row.harness_id),
        sourcePath
      });
    }
  }
  if (categories.has("suggestions")) {
    const suggestionText = `lower(title || ' ' || summary || ' ' || coalesce(operations_json, ''))`;
    const suggestionRows = all2(
      `SELECT id, title, summary, status, updated_at,
              (title || ' ' || summary || ' ' || coalesce(operations_json, '')) AS matched_text
       FROM suggestions
       WHERE ${likeAll(suggestionText, likePatterns.length)}
       ORDER BY updated_at DESC
       LIMIT ?`,
      [...likePatterns, candidateLimit]
    );
    for (const row of suggestionRows) {
      const title = text(row.title);
      const { excerpt, ranges } = searchExcerpt(row.matched_text, terms);
      results.push({
        id: `suggestion:${text(row.id)}`,
        category: "suggestions",
        title,
        subtitle: text(row.status),
        excerpt,
        ...ranges.length > 0 ? { ranges } : {},
        rank: termsMatchText(title, terms) ? searchRank(title, terms) : 4.5,
        updatedAt: int(row.updated_at),
        suggestionId: text(row.id),
        status: text(row.status)
      });
    }
  }
  return results;
}
exports.DESKTOP_FTS_INDEXES = DESKTOP_FTS_INDEXES;
exports.JSON_IDS = JSON_IDS;
exports.MAX_SEARCH_TERMS = MAX_SEARCH_TERMS;
exports.SHARED_FTS_INDEXES = SHARED_FTS_INDEXES;
exports.buildFtsMatchExpression = buildFtsMatchExpression;
exports.createDesktopSearchStore = createDesktopSearchStore;
exports.describeProjectPath = describeProjectPath;
exports.escapeLikePattern = escapeLikePattern;
exports.foldSearchText = foldSearchText;
exports.ftsColumnExpression = ftsColumnExpression;
exports.identifyLegacyDesktopProjects = identifyLegacyDesktopProjects;
exports.installDesktopSearchIndexes = installDesktopSearchIndexes;
exports.installSharedSearchIndexes = installSharedSearchIndexes;
exports.likePatternsForTerms = likePatternsForTerms;
exports.mergeSearchIndexes = mergeSearchIndexes;
exports.normalizePathSeparators = normalizePathSeparators;
exports.parseSearchTerms = parseSearchTerms;
exports.readSearchIndexWatermarks = readSearchIndexWatermarks;
exports.runSearchIndexBackfillStep = runSearchIndexBackfillStep;
exports.searchExcerpt = searchExcerpt;
exports.searchRank = searchRank;
exports.sqliteSupportsSearchIndex = sqliteSupportsSearchIndex;
exports.termsMatchText = termsMatchText;
//# sourceMappingURL=desktopSearch-UUzZxN96.js.map

//# debugId=44088ec2-7e51-560c-ac57-fc49db231417
