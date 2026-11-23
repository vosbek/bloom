"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="76db114b-580b-5912-958a-05647eec140d")}catch(e){}}();

const deliveryBriefs = require("./deliveryBriefs-CbTihYeZ.js");
const index = require("./index-UFoqNX7c.js");
const hash = require("./hash-DCMQIns_.js");
const identity = require("./identity-C50QOXIb.js");
const SEP = "\0";
function setupArtifactKey(obs) {
  return [
    obs.harnessId,
    obs.scope,
    obs.kind,
    obs.projectId ?? "",
    obs.workspaceLocationId ?? "",
    obs.sourcePath ?? ""
  ].join(SEP);
}
function setupArtifactId(key) {
  return `setup_${hash.fnv1a64Hex(key)}`;
}
function setupVersionId(artifactId, seq) {
  return `${artifactId}_v${seq}`;
}
function createCompactTextDelta(before, after) {
  let start = 0;
  const sharedLength = Math.min(before.length, after.length);
  while (start < sharedLength && before[start] === after[start]) start++;
  let suffix = 0;
  const maxSuffix = Math.min(before.length - start, after.length - start);
  while (suffix < maxSuffix && before[before.length - 1 - suffix] === after[after.length - 1 - suffix]) {
    suffix++;
  }
  return {
    version: 1,
    start,
    deleteCount: before.length - start - suffix,
    insert: after.slice(start, after.length - suffix)
  };
}
function applyCompactTextDelta(before, delta) {
  if (delta.version !== 1) throw new Error(`Unsupported text delta version: ${delta.version}`);
  if (!Number.isSafeInteger(delta.start) || !Number.isSafeInteger(delta.deleteCount) || delta.start < 0 || delta.deleteCount < 0 || delta.start + delta.deleteCount > before.length) {
    throw new Error("Invalid text delta range");
  }
  return before.slice(0, delta.start) + delta.insert + before.slice(delta.start + delta.deleteCount);
}
function serializeCompactTextDelta(delta) {
  return JSON.stringify(delta);
}
function parseCompactTextDelta(value) {
  const parsed = JSON.parse(value);
  if (parsed.version !== 1 || typeof parsed.start !== "number" || typeof parsed.deleteCount !== "number" || typeof parsed.insert !== "string") {
    throw new Error("Invalid serialized text delta");
  }
  return parsed;
}
const MERGE_FAILURE = /permission[^\n]*denied|not mergeable|merge (?:failed|conflict)|already merged|pull request was not merged|exit code [1-9]|\berror:/i;
const BASH_MERGE = /(?:^|[;\n]|&&|\|\|)\s*(?:env\s+)?(?:[A-Za-z_][A-Za-z0-9_]*=(?:"[^"]*"|'[^']*'|[^\s;&|]+)\s+)*gh\s+pr\s+merge\s+(https:\/\/github\.com\/[^\s/]+\/[^\s/]+\/pull\/\d+|\d+)(?=\s|$)/gi;
function parsedInput(inputJson) {
  if (!inputJson) return null;
  try {
    const value = JSON.parse(inputJson);
    return typeof value === "object" && value !== null ? value : null;
  } catch {
    return null;
  }
}
function confirmedGithubMerge(call) {
  if (!/github_merge_pull_request$/i.test(call.name) || call.isError) return null;
  if (!/"merged"\s*:\s*true|Pull Request successfully merged/i.test(call.resultText ?? "")) {
    return null;
  }
  const input = parsedInput(call.inputJson);
  const repository = input?.repository_full_name;
  const pullRequest = input?.pr_number;
  return typeof repository === "string" && (typeof pullRequest === "number" || typeof pullRequest === "string") ? `${repository.toLowerCase()}#${pullRequest}` : null;
}
function confirmedBashMerges(call) {
  if (call.name !== "Bash" || call.isError || MERGE_FAILURE.test(call.resultText ?? "")) return [];
  const input = parsedInput(call.inputJson);
  const command = typeof input?.command === "string" ? input.command : "";
  if (command.length === 0 || command.length > 1024) return [];
  const repositoryMatch = command.match(/--repo(?:sitory)?\s+([^\s;&|]+)/i);
  const repository = repositoryMatch?.[1]?.toLowerCase() ?? String(call.conversationKey);
  const confirmed = [];
  for (const match of command.matchAll(BASH_MERGE)) {
    const target = match[1];
    if (/^https:/i.test(target)) {
      const url = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)$/i.exec(target);
      if (url) confirmed.push(`${url[1]}/${url[2]}#${url[3]}`.toLowerCase());
    } else {
      confirmed.push(`${repository}#${target}`);
    }
  }
  return confirmed;
}
function countConfirmedWrappedPullRequestMerges(calls) {
  const merged = /* @__PURE__ */ new Set();
  for (const call of calls) {
    const github = confirmedGithubMerge(call);
    if (github) merged.add(github);
    for (const bash of confirmedBashMerges(call)) merged.add(bash);
  }
  return merged.size;
}
function normalizeProjectResolutionPath(path) {
  const value = path.trim().replace(/\\/g, "/");
  if (!value) return null;
  let prefix;
  let remainder;
  let protectedSegments = 0;
  if (/^[A-Za-z]:\//.test(value)) {
    prefix = `${value[0].toUpperCase()}:/`;
    remainder = value.slice(3);
  } else if (value.startsWith("//")) {
    prefix = "//";
    remainder = value.slice(2);
    protectedSegments = 2;
  } else if (value.startsWith("/")) {
    prefix = "/";
    remainder = value.slice(1);
  } else {
    return null;
  }
  const segments = [];
  for (const segment of remainder.split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") {
      if (segments.length > protectedSegments) segments.pop();
      continue;
    }
    segments.push(segment);
  }
  if (prefix === "//") {
    if (segments.length < protectedSegments) return null;
    return `//${segments.join("/")}`;
  }
  return segments.length === 0 ? prefix : `${prefix}${segments.join("/")}`;
}
function projectResolutionPathContains(root, target) {
  if (root.endsWith("/")) return target.startsWith(root);
  return target === root || target.startsWith(`${root}/`);
}
const UNATTRIBUTED_TRANSCRIPT_TOOL_CALL_LIMIT = 80;
const DESKTOP_MENU_BAR_SNAPSHOT_TEXT_MAX_CHARS = 512;
function improveSearchProjection(key, summary, tagsJson) {
  let tags = [];
  try {
    const parsed = JSON.parse(tagsJson || "[]");
    if (Array.isArray(parsed))
      tags = [
        ...new Set(
          parsed.filter((v) => typeof v === "string").map((v) => v.trim().toLowerCase()).filter((v) => /^[a-z0-9][a-z0-9_-]{1,39}$/.test(v))
        )
      ].slice(0, 12);
  } catch {
  }
  return { text: `${key} ${summary}`.toLowerCase(), tags: `|${tags.join("|")}|` };
}
const STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "use",
  "used",
  "user",
  "should",
  "when",
  "into",
  "from",
  "not",
  "always",
  "prefer",
  "prefers",
  "before",
  "after",
  "run"
]);
function tokenizeImproveSearch(text2) {
  const out = /* @__PURE__ */ new Set();
  for (const raw of text2.toLowerCase().split(/[^a-z0-9.]+/)) {
    const tok = raw.replace(/^\.+|\.+$/g, "");
    if (tok.length < 3) continue;
    if (STOPWORDS.has(tok)) continue;
    out.add(tok);
    for (const seg of tok.split(".")) {
      if (seg.length >= 3 && !STOPWORDS.has(seg)) out.add(seg);
    }
  }
  return out;
}
function improveCandidateWeights(signals) {
  const tokens = /* @__PURE__ */ new Map();
  for (const signal of signals) {
    for (const token of tokenizeImproveSearch(`${signal.normalized_key} ${signal.summary}`)) {
      tokens.set(token, (tokens.get(token) ?? 0) + 1);
    }
  }
  return {
    keys: [...new Set(signals.map((signal) => signal.normalized_key))],
    harnesses: [...new Set(signals.map((signal) => signal.observed_harness))],
    tokens: [...tokens].map(([token, weight]) => ({ token, weight }))
  };
}
function improveCandidateScore(cluster, weights) {
  let score = weights.keys.includes(cluster.normalized_key) ? 100 : 0;
  const tokens = tokenizeImproveSearch(`${cluster.normalized_key} ${cluster.canonical_summary}`);
  for (const { token, weight } of weights.tokens) if (tokens.has(token)) score += weight;
  try {
    const harnesses = JSON.parse(cluster.harnesses_json);
    if (Array.isArray(harnesses) && harnesses.some((harness) => weights.harnesses.includes(harness)))
      score++;
  } catch {
  }
  return score;
}
function improveClusterProjection(key, summary, tags) {
  return {
    ...improveSearchProjection(key, summary, tags),
    tokens: `|${[...tokenizeImproveSearch(`${key} ${summary}`)].join("|")}|`
  };
}
function improveSearchWhere(query, columns = { text: "search_text", tags: "search_tags" }) {
  const clauses = [];
  const params = [];
  const pattern = (text2) => `%${text2.replace(/[\\%_]/g, (ch) => `\\${ch}`)}%`;
  if (query.creatorAgentVersionId) {
    clauses.push("creator_agent_version_id = ?");
    params.push(query.creatorAgentVersionId);
  }
  if (query.textTerms?.length) {
    clauses.push(
      `(${query.textTerms.map(() => `${columns.text} LIKE ? ESCAPE '\\'`).join(" OR ")})`
    );
    params.push(...query.textTerms.map(pattern));
  }
  for (const tag of query.tags ?? []) {
    clauses.push(`${columns.tags} LIKE ? ESCAPE '\\'`);
    params.push(pattern(`|${tag}|`));
  }
  return { where: clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "", params };
}
function improveSearchBackfill(rows) {
  const projected = rows.map((row) => ({
    id: row.id,
    ...improveSearchProjection(row.key, row.summary, row.tags)
  }));
  const cases = rows.map(() => "WHEN ? THEN ?").join(" ");
  return {
    update: `SET search_text = CASE id ${cases} END, search_tags = CASE id ${cases} END WHERE search_text IS NULL AND id IN (${rows.map(() => "?").join(",")})`,
    params: [
      ...projected.flatMap((row) => [row.id, row.text]),
      ...projected.flatMap((row) => [row.id, row.tags]),
      ...projected.map((row) => row.id)
    ]
  };
}
function improveClusterRanking(query, dialect) {
  if (!query.candidates) return { cte: "", score: "0", params: [] };
  const weights = improveCandidateWeights(query.candidates);
  const pg = dialect === "postgres";
  const strings = (parameter) => pg ? `SELECT entry #>> '{}' AS value FROM jsonb_array_elements(CAST(${parameter} AS jsonb)) AS entries(entry) WHERE jsonb_typeof(entry) = 'string'` : `SELECT value FROM json_each(${parameter}) WHERE type = 'text'`;
  const tokens = pg ? "SELECT entry->>'token' AS token, CAST(entry->>'weight' AS INTEGER) AS weight FROM jsonb_array_elements(CAST(? AS jsonb)) AS entries(entry)" : "SELECT json_extract(value, '$.token') AS token, json_extract(value, '$.weight') AS weight FROM json_each(?)";
  const harnesses = pg ? "CASE WHEN harnesses_json IS JSON ARRAY THEN harnesses_json ELSE '[]' END" : "CASE WHEN json_valid(harnesses_json) THEN CASE WHEN json_type(harnesses_json) = 'array' THEN harnesses_json ELSE '[]' END ELSE '[]' END";
  return {
    cte: `WITH candidate_keys AS (${strings("?")}), candidate_tokens AS (${tokens}), candidate_harnesses AS (${strings("?")}),`,
    score: `(CASE WHEN normalized_key IN (SELECT value FROM candidate_keys) THEN 100 ELSE 0 END
      + COALESCE((SELECT SUM(weight) FROM candidate_tokens WHERE search_tokens LIKE '%|' || token || '|%'), 0)
      + CASE WHEN EXISTS (SELECT 1 FROM (${strings(harnesses)}) AS observed WHERE observed.value IN (SELECT value FROM candidate_harnesses)) THEN 1 ELSE 0 END)`,
    params: [
      JSON.stringify(weights.keys),
      JSON.stringify(weights.tokens),
      JSON.stringify(weights.harnesses)
    ]
  };
}
function improveClusterBackfill(rows) {
  const projected = rows.map((row) => ({
    id: row.id,
    ...improveClusterProjection(row.key, row.summary, row.tags)
  }));
  const cases = rows.map(() => "WHEN ? THEN ?").join(" ");
  return {
    update: `SET search_text = CASE id ${cases} END, search_tags = CASE id ${cases} END, search_tokens = CASE id ${cases} END WHERE search_text IS NULL AND id IN (${rows.map(() => "?").join(",")})`,
    params: [
      ...projected.flatMap((row) => [row.id, row.text]),
      ...projected.flatMap((row) => [row.id, row.tags]),
      ...projected.flatMap((row) => [row.id, row.tokens]),
      ...projected.map((row) => row.id)
    ]
  };
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function text(value) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "bigint") return String(value);
  return "";
}
function textOrNull(value) {
  return value == null ? null : text(value);
}
function int(value) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") return Number(value);
  return 0;
}
function intOrNull(value) {
  return value == null ? null : int(value);
}
function json(value) {
  if (typeof value !== "string" || value.length === 0) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
const SCHEMA = `
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  repo_root TEXT,
  git_common_dir TEXT,
  canonical_remote TEXT,
  root TEXT
);

CREATE TABLE IF NOT EXISTS workspace_locations (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  path TEXT NOT NULL,
  kind TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS project_setup_summaries (
  workspace_path TEXT PRIMARY KEY,
  skills BIGINT NOT NULL,
  agents BIGINT NOT NULL,
  commands BIGINT NOT NULL,
  hooks BIGINT NOT NULL,
  rules BIGINT NOT NULL,
  total_entries BIGINT NOT NULL,
  scanned_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS setup_artifacts (
  id TEXT PRIMARY KEY,
  harness_id TEXT NOT NULL,
  project_id TEXT,
  workspace_location_id TEXT,
  scope TEXT NOT NULL,
  kind TEXT NOT NULL,
  source_path TEXT,
  current_version_id TEXT NOT NULL,
  parser_version TEXT NOT NULL,
  scanner_version TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS setup_versions (
  id TEXT PRIMARY KEY,
  artifact_id TEXT NOT NULL,
  seq BIGINT NOT NULL,
  content TEXT NOT NULL,
  content_storage TEXT NOT NULL DEFAULT 'full',
  parsed_shape TEXT,
  raw_shape TEXT,
  content_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  created_by TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_setup_versions_artifact ON setup_versions (artifact_id, seq);

CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  ref TEXT NOT NULL,
  harness_id TEXT NOT NULL,
  project_id TEXT,
  workspace_location_id TEXT,
  title TEXT,
  preview TEXT,
  state TEXT NOT NULL,
  failure_reason TEXT,
  state_override_turn_position BIGINT,
  activity_event_count BIGINT,
  started_at BIGINT,
  last_activity_ts BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS conversation_transcript_user_turns (
  conversation_id TEXT NOT NULL,
  id BIGINT NOT NULL,
  conversation_numeric_id BIGINT NOT NULL,
  position BIGINT NOT NULL,
  prompt TEXT NOT NULL,
  state TEXT NOT NULL,
  started_at BIGINT,
  ended_at BIGINT,
  PRIMARY KEY (conversation_id, id)
);
CREATE INDEX IF NOT EXISTS idx_conv_transcript_turns_position ON conversation_transcript_user_turns (conversation_id, position);

CREATE TABLE IF NOT EXISTS conversation_transcript_events (
  conversation_id TEXT NOT NULL,
  id BIGINT NOT NULL,
  user_turn_id BIGINT NOT NULL,
  position BIGINT NOT NULL,
  kind TEXT NOT NULL,
  text TEXT,
  timestamp_ms BIGINT,
  tool_call_id BIGINT,
  PRIMARY KEY (conversation_id, id)
);
CREATE INDEX IF NOT EXISTS idx_conv_transcript_events_turn ON conversation_transcript_events (conversation_id, user_turn_id, position);

CREATE TABLE IF NOT EXISTS conversation_transcript_tool_calls (
  conversation_id TEXT NOT NULL,
  id BIGINT NOT NULL,
  conversation_numeric_id BIGINT NOT NULL,
  event_id BIGINT,
  tool_use_id TEXT,
  name TEXT NOT NULL,
  input_json TEXT,
  result_text TEXT,
  is_error BIGINT NOT NULL,
  started_at_ms BIGINT,
  ended_at_ms BIGINT,
  PRIMARY KEY (conversation_id, id)
);

CREATE TABLE IF NOT EXISTS conversation_transcript_todo_lists (
  conversation_id TEXT NOT NULL,
  id BIGINT NOT NULL,
  conversation_numeric_id BIGINT NOT NULL,
  user_turn_id BIGINT NOT NULL,
  source_event_id BIGINT,
  source TEXT NOT NULL,
  is_inferred BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  PRIMARY KEY (conversation_id, id)
);
CREATE INDEX IF NOT EXISTS idx_conv_transcript_todo_lists_turn ON conversation_transcript_todo_lists (conversation_id, user_turn_id);

CREATE TABLE IF NOT EXISTS conversation_transcript_todos (
  conversation_id TEXT NOT NULL,
  id BIGINT NOT NULL,
  list_id BIGINT NOT NULL,
  position BIGINT NOT NULL,
  content TEXT NOT NULL,
  state TEXT NOT NULL,
  PRIMARY KEY (conversation_id, id)
);
CREATE INDEX IF NOT EXISTS idx_conv_transcript_todos_list ON conversation_transcript_todos (conversation_id, list_id, position);

CREATE TABLE IF NOT EXISTS sources (
  kind TEXT NOT NULL,
  path TEXT NOT NULL,
  last_mtime_ms BIGINT,
  last_size BIGINT,
  last_byte_offset BIGINT,
  last_cursor TEXT,
  last_fetched_at BIGINT,
  PRIMARY KEY (kind, path)
);
CREATE INDEX IF NOT EXISTS idx_sources_kind_path ON sources (kind, path);
CREATE INDEX IF NOT EXISTS idx_sources_path ON sources (path);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  runtime TEXT NOT NULL,
  project_id TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  expires_at BIGINT
);

CREATE TABLE IF NOT EXISTS improve_suggestions (
  id TEXT PRIMARY KEY,
  cluster_id TEXT NOT NULL,
  creator_agent_version_id TEXT NOT NULL DEFAULT 'legacy-3-step-workflow',
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  feedback_reasons_json TEXT,
  status TEXT NOT NULL,
  evidence_count BIGINT NOT NULL,
  change_json TEXT,
  operations_json TEXT,
  evidence_json TEXT,
  apply_result_json TEXT,
  snoozed_until BIGINT,
  hidden_at BIGINT,
  hidden_reason TEXT,
  hidden_until BIGINT,
  last_shown_at BIGINT,
  shown_count BIGINT NOT NULL DEFAULT 0,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS improve_runs (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  harness_id TEXT NOT NULL,
  status TEXT NOT NULL,
  stage TEXT,
  task_type TEXT,
  project_path TEXT,
  created_at BIGINT NOT NULL,
  finished_at BIGINT
);

CREATE TABLE IF NOT EXISTS improve_signals (
  id BIGINT PRIMARY KEY,
  schema_version BIGINT NOT NULL,
  run_id TEXT NOT NULL,
  conversation_id TEXT NOT NULL,
  creator_agent_version_id TEXT NOT NULL DEFAULT 'legacy-3-step-workflow',
  type TEXT,
  kind TEXT NOT NULL,
  normalized_key TEXT NOT NULL,
  summary TEXT NOT NULL,
  evidence_json TEXT NOT NULL,
  setup_refs_json TEXT NOT NULL,
  setup_mismatch_json TEXT,
  scope TEXT NOT NULL,
  observed_harness TEXT NOT NULL,
  harness_applicability_json TEXT NOT NULL,
  pain_score BIGINT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL,
  tags_json TEXT NOT NULL DEFAULT '[]',
  created_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_improve_signals_run ON improve_signals (run_id, id);
CREATE INDEX IF NOT EXISTS idx_improve_signals_conversation ON improve_signals (conversation_id, id);

CREATE TABLE IF NOT EXISTS improve_signal_clusters (
  id BIGINT PRIMARY KEY,
  schema_version BIGINT NOT NULL,
  creator_agent_version_id TEXT NOT NULL DEFAULT 'legacy-3-step-workflow',
  normalized_key TEXT NOT NULL,
  canonical_summary TEXT NOT NULL,
  status TEXT NOT NULL,
  signal_count BIGINT NOT NULL,
  conversation_count BIGINT NOT NULL,
  project_count BIGINT NOT NULL,
  harnesses_json TEXT NOT NULL,
  tags_json TEXT NOT NULL DEFAULT '[]',
  high_pain_conversation_count BIGINT NOT NULL,
  dismissed_count BIGINT NOT NULL,
  first_seen_at BIGINT NOT NULL,
  last_seen_at BIGINT NOT NULL,
  promoted_at BIGINT
);
CREATE INDEX IF NOT EXISTS idx_improve_signal_clusters_key ON improve_signal_clusters (normalized_key);
CREATE INDEX IF NOT EXISTS idx_improve_signal_clusters_status ON improve_signal_clusters (status);

CREATE TABLE IF NOT EXISTS improve_signal_cluster_members (
  cluster_id BIGINT NOT NULL,
  signal_id BIGINT NOT NULL,
  match_reason TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (cluster_id, signal_id)
);
CREATE INDEX IF NOT EXISTS idx_improve_signal_cluster_members_signal ON improve_signal_cluster_members (signal_id);

CREATE TABLE IF NOT EXISTS improve_signal_cluster_duplicate_candidates (
  id BIGINT PRIMARY KEY,
  cluster_ids_json TEXT NOT NULL,
  reason TEXT NOT NULL,
  confidence DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL,
  created_at BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS improve_agent_conversation_reads (
  conversation_id TEXT NOT NULL,
  agent_version_id TEXT NOT NULL,
  transcript_hash TEXT,
  conversation_activity_ts BIGINT NOT NULL DEFAULT 0,
  last_processed_message_position BIGINT,
  read_at BIGINT NOT NULL,
  read_count BIGINT NOT NULL DEFAULT 1,
  PRIMARY KEY (conversation_id, agent_version_id)
);
CREATE INDEX IF NOT EXISTS idx_improve_agent_conversation_reads_agent
  ON improve_agent_conversation_reads (agent_version_id, read_at DESC);

CREATE TABLE IF NOT EXISTS improve_project_audits (
  project_path TEXT NOT NULL,
  agent_version_id TEXT NOT NULL,
  setup_state_hash TEXT NOT NULL,
  conversations_seen_count BIGINT NOT NULL DEFAULT 0,
  last_run_id TEXT,
  last_run_at BIGINT NOT NULL,
  audit_count BIGINT NOT NULL DEFAULT 1,
  PRIMARY KEY (project_path, agent_version_id)
);
CREATE INDEX IF NOT EXISTS idx_improve_project_audits_agent
  ON improve_project_audits (agent_version_id, last_run_at DESC);

CREATE TABLE IF NOT EXISTS improve_suggestion_feedback_events (
  event_id TEXT PRIMARY KEY,
  suggestion_id TEXT NOT NULL,
  agent_version_id TEXT NOT NULL,
  type TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_improve_suggestion_feedback_events_suggestion
  ON improve_suggestion_feedback_events (suggestion_id, created_at);

CREATE TABLE IF NOT EXISTS improve_suggestion_clusters (
  suggestion_id TEXT NOT NULL,
  cluster_id TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  PRIMARY KEY (suggestion_id, cluster_id)
);
CREATE INDEX IF NOT EXISTS idx_improve_suggestion_clusters_cluster
  ON improve_suggestion_clusters (cluster_id, suggestion_id);

CREATE TABLE IF NOT EXISTS usage_snapshots (
  harness_id TEXT PRIMARY KEY,
  fetched_at BIGINT NOT NULL,
  payload TEXT
);

CREATE TABLE IF NOT EXISTS app_usage_intervals (
  id BIGINT PRIMARY KEY,
  started_at_ms BIGINT NOT NULL,
  ended_at_ms BIGINT NOT NULL,
  process_running_seconds BIGINT NOT NULL,
  window_visible_seconds BIGINT NOT NULL,
  window_visible_pinned_seconds BIGINT NOT NULL DEFAULT 0,
  window_visible_pinned_expanded_seconds BIGINT NOT NULL DEFAULT 0,
  window_visible_regular_expanded_seconds BIGINT NOT NULL DEFAULT 0,
  week_start TEXT NOT NULL,
  local_day_of_week TEXT NOT NULL,
  local_hour BIGINT NOT NULL,
  timezone TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  sent_at_ms BIGINT
);
CREATE INDEX IF NOT EXISTS idx_app_usage_unsent ON app_usage_intervals (sent_at_ms, created_at);

CREATE TABLE IF NOT EXISTS app_usage_interval_ids (
  singleton BIGINT PRIMARY KEY,
  next_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS wrapped_records (
  id TEXT PRIMARY KEY,
  period_start TEXT NOT NULL,
  period_kind TEXT NOT NULL,
  started_at_ms BIGINT NOT NULL,
  ended_at_ms BIGINT NOT NULL,
  account_user_id TEXT,
  schema_version BIGINT NOT NULL,
  summary_json TEXT NOT NULL,
  created_at BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_wrapped_records_created ON wrapped_records (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wrapped_records_period ON wrapped_records (period_start, period_kind);

CREATE TABLE IF NOT EXISTS harnesses (
  harness_id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  available BIGINT NOT NULL
);
`;
const VISIBLE_SUGGESTIONS_WHERE = `(hidden_at IS NULL OR (hidden_until IS NOT NULL AND hidden_until <= ?))
      AND (status IN ('active', 'needs_review')
      OR (status = 'snoozed' AND snoozed_until IS NOT NULL AND snoozed_until <= ?))`;
const RESOLVED_SUGGESTIONS_WHERE = `(hidden_at IS NOT NULL AND (hidden_until IS NULL OR hidden_until > ?))
      OR status IN ('applied', 'dismissed', 'archived')
      OR (status = 'snoozed' AND snoozed_until IS NOT NULL AND snoozed_until > ?)`;
function seedFor(kind, root, remote) {
  if (!root) return null;
  return identity.projectFlowerSeedFor({ kind, root, canonicalRemote: remote });
}
function wrappedProjectKey(projectId) {
  if (projectId === null || projectId.length === 0) return null;
  const numeric = Number(projectId);
  if (Number.isSafeInteger(numeric) && numeric > 0) return numeric;
  return Number(BigInt(`0x${identity.fnv1a64Hex(projectId)}`) & 0x7fffffffn);
}
function rowToWrappedRecord(row) {
  return {
    id: text(row.id),
    period_start: text(row.period_start),
    period_kind: text(row.period_kind),
    started_at_ms: int(row.started_at_ms),
    ended_at_ms: int(row.ended_at_ms),
    account_user_id: textOrNull(row.account_user_id),
    schema_version: int(row.schema_version),
    summary_json: text(row.summary_json),
    created_at: int(row.created_at)
  };
}
function createSqlWrappedStore({ run, get, all }) {
  return {
    async listWrapped(limit) {
      return (await all("SELECT * FROM wrapped_records ORDER BY created_at DESC, id DESC LIMIT ?", [
        Math.max(0, Math.trunc(limit))
      ])).map(rowToWrappedRecord);
    },
    async getWrapped(id) {
      const row = await get("SELECT * FROM wrapped_records WHERE id = ?", [id]);
      return row ? rowToWrappedRecord(row) : null;
    },
    async saveWrapped(input) {
      await run(
        `INSERT INTO wrapped_records (
           id, period_start, period_kind, started_at_ms, ended_at_ms,
           account_user_id, schema_version, summary_json, created_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT (id) DO UPDATE SET
           period_start = excluded.period_start,
           period_kind = excluded.period_kind,
           started_at_ms = excluded.started_at_ms,
           ended_at_ms = excluded.ended_at_ms,
           account_user_id = excluded.account_user_id,
           schema_version = excluded.schema_version,
           summary_json = excluded.summary_json,
           created_at = excluded.created_at`,
        [
          input.id,
          input.periodStart,
          input.periodKind,
          input.startedAtMs,
          input.endedAtMs,
          input.accountUserId,
          input.schemaVersion,
          input.summaryJson,
          input.createdAt
        ]
      );
    },
    async deleteWrapped(id) {
      await run("DELETE FROM wrapped_records WHERE id = ?", [id]);
    },
    async listWrappedActivity(startMs, endMs, idleGapMs = deliveryBriefs.WRAPPED_DEFAULT_IDLE_GAP_MS) {
      if (!(endMs > startMs)) return [];
      const rows = await all(
        `SELECT conversations.id AS conversation_id,
                conversations.project_id AS project_id,
                -- Raw identity columns; projectFlowerSeedFor derives the
                -- avatar seed below, so every dialect agrees with the avatar.
                (SELECT projects.kind FROM projects WHERE projects.id = conversations.project_id) AS project_kind,
                (SELECT COALESCE(projects.repo_root, projects.root) FROM projects WHERE projects.id = conversations.project_id) AS project_root,
                (SELECT projects.canonical_remote FROM projects WHERE projects.id = conversations.project_id) AS project_remote,
                COALESCE(conversations.started_at, conversations.last_activity_ts) AS started_at,
                conversations.last_activity_ts AS ended_at,
                conversations.state AS state,
                (
                  SELECT COUNT(*)
                  FROM conversation_transcript_user_turns AS turns
                  WHERE turns.conversation_id = conversations.id
                ) AS turns,
                (
                  -- A conversation with no events at all cannot be measured and
                  -- falls back to the caller's capped span. One that has events
                  -- but none inside the window worked zero minutes in it.
                  SELECT CASE
                    WHEN NOT EXISTS (
                      SELECT 1 FROM conversation_transcript_events e2
                      WHERE e2.conversation_id = conversations.id
                        AND e2.timestamp_ms IS NOT NULL
                    ) THEN NULL
                    ELSE COALESCE(SUM(burst_end - burst_start), 0)
                  END FROM (
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
                          SELECT e.timestamp_ms AS ts
                          FROM conversation_transcript_events e
                          WHERE e.conversation_id = conversations.id
                            AND e.timestamp_ms >= ?
                            AND e.timestamp_ms < ?
                        ) AS pts
                      ) AS gapped
                    ) AS grouped
                    GROUP BY burst
                  ) AS bursts
                ) AS active_ms
         FROM conversations
         WHERE COALESCE(conversations.started_at, conversations.last_activity_ts) < ?
           AND COALESCE(conversations.last_activity_ts, conversations.started_at) >= ?
         ORDER BY started_at ASC`,
        [idleGapMs, startMs, endMs, endMs, startMs]
      );
      const intervalsByConversation = /* @__PURE__ */ new Map();
      const conversationIds = rows.map((row) => text(row.conversation_id));
      for (let offset = 0; offset < conversationIds.length; offset += 200) {
        const batch = conversationIds.slice(offset, offset + 200);
        const placeholders = batch.map(() => "?").join(", ");
        const intervals = await all(
          `WITH points AS (
             SELECT conversation_id, timestamp_ms AS ts
             FROM conversation_transcript_events
             WHERE conversation_id IN (${placeholders})
               AND timestamp_ms >= ? AND timestamp_ms < ?
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
           ORDER BY conversation_id, started_at`,
          [...batch, startMs, endMs, idleGapMs]
        );
        for (const interval of intervals) {
          const conversationId = text(interval.conversation_id);
          const activeIntervals = intervalsByConversation.get(conversationId) ?? [];
          activeIntervals.push({
            started_at: int(interval.started_at),
            ended_at: int(interval.ended_at)
          });
          intervalsByConversation.set(conversationId, activeIntervals);
        }
      }
      return rows.map(
        (row) => ({
          active_intervals: intOrNull(row.active_ms) === null ? null : intervalsByConversation.get(text(row.conversation_id)) ?? [],
          project_seed: seedFor(
            text(row.project_kind) === "git" ? "git" : "folder",
            textOrNull(row.project_root),
            textOrNull(row.project_remote)
          ),
          project_id: wrappedProjectKey(textOrNull(row.project_id)),
          started_at: int(row.started_at),
          ended_at: intOrNull(row.ended_at),
          turns: int(row.turns),
          finished: text(row.state) === "finished",
          active_ms: intOrNull(row.active_ms)
        })
      );
    },
    async listWrappedSessionStarts(beforeStartedAtMs, beforeSessionId, limit) {
      const bounded = Math.max(0, Math.trunc(limit));
      if (bounded === 0 || !Number.isFinite(beforeStartedAtMs)) return [];
      const cursor = beforeSessionId === null ? {
        clause: "COALESCE(conversations.started_at, conversations.last_activity_ts) < ?",
        params: [beforeStartedAtMs]
      } : {
        clause: `(COALESCE(conversations.started_at, conversations.last_activity_ts) < ?
                        OR (
                          COALESCE(conversations.started_at, conversations.last_activity_ts) = ?
                          AND conversations.id < ?
                        ))`,
        params: [beforeStartedAtMs, beforeStartedAtMs, beforeSessionId]
      };
      const rows = await all(
        `SELECT conversations.id AS session_id,
                COALESCE(conversations.started_at, conversations.last_activity_ts) AS started_at
         FROM conversations
         WHERE ${cursor.clause}
         ORDER BY started_at DESC, session_id DESC
         LIMIT ?`,
        [...cursor.params, bounded]
      );
      return rows.map(
        (row) => ({
          session_id: text(row.session_id),
          started_at: int(row.started_at)
        })
      );
    },
    async sumWrappedVisibleMinutes(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const rows = await all(
        `SELECT started_at_ms, ended_at_ms, window_visible_seconds
         FROM app_usage_intervals
         WHERE started_at_ms < ? AND ended_at_ms > ?`,
        [endMs, startMs]
      );
      let minutes = 0;
      for (const row of rows) {
        const startedAt = int(row.started_at_ms);
        const endedAt = int(row.ended_at_ms);
        const duration = endedAt - startedAt;
        if (!(duration > 0)) continue;
        const overlap = Math.min(endedAt, endMs) - Math.max(startedAt, startMs);
        if (!(overlap > 0)) continue;
        minutes += int(row.window_visible_seconds) / 60 * (overlap / duration);
      }
      return Math.round(minutes * 10) / 10;
    },
    async countWrappedFrictionSignals(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const row = await get(
        "SELECT COUNT(*) AS count FROM improve_signals WHERE created_at >= ? AND created_at < ?",
        [startMs, endMs]
      );
      return row ? int(row.count) : 0;
    },
    async countWrappedMergedPullRequests(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const rows = await all(
        `SELECT conversation_id, name, input_json, result_text, is_error
         FROM conversation_transcript_tool_calls
         WHERE started_at_ms >= ? AND started_at_ms < ?
           AND (
             (name = 'Bash' AND input_json LIKE '%gh pr merge%')
             OR lower(name) LIKE '%github_merge_pull_request'
           )`,
        [startMs, endMs]
      );
      return countConfirmedWrappedPullRequestMerges(
        rows.map(
          (row) => ({
            conversationKey: text(row.conversation_id),
            name: text(row.name),
            inputJson: textOrNull(row.input_json),
            resultText: textOrNull(row.result_text),
            isError: int(row.is_error) !== 0
          })
        )
      );
    },
    async countWrappedFilesTouched(startMs, endMs) {
      if (!(endMs > startMs)) return 0;
      const rows = await all(
        `SELECT input_json
         FROM conversation_transcript_tool_calls
         WHERE started_at_ms >= ? AND started_at_ms < ?
           AND name IN ('Edit', 'Write', 'MultiEdit')`,
        [startMs, endMs]
      );
      const files = /* @__PURE__ */ new Set();
      for (const row of rows) {
        const inputJson = textOrNull(row.input_json);
        if (!inputJson) continue;
        try {
          const parsed = JSON.parse(inputJson);
          if (typeof parsed !== "object" || parsed === null) continue;
          const filePath = parsed.file_path;
          if (typeof filePath === "string" && filePath.length > 0) files.add(filePath);
        } catch {
        }
      }
      return files.size;
    }
  };
}
function eventsForTurnsCappedSql(turnCount) {
  const placeholders = Array.from({ length: turnCount }, () => "?").join(",");
  return `SELECT capped.* FROM (
    SELECT e.*, ROW_NUMBER() OVER (PARTITION BY e.user_turn_id ORDER BY e.position DESC) AS recency,
           COUNT(*) OVER (PARTITION BY e.user_turn_id) AS total_count
    FROM conversation_transcript_events e
    WHERE e.conversation_id = ? AND e.user_turn_id IN (${placeholders})
  ) capped
  JOIN conversation_transcript_user_turns t ON t.id = capped.user_turn_id AND t.conversation_id = capped.conversation_id
  WHERE recency <= ? ORDER BY t.position, capped.position`;
}
const DEFAULT_TRANSCRIPT_EVENTS_PER_TURN = 250;
const SQL_IDENTIFIERS = [
  "conversation_transcript_todo_lists",
  "conversation_transcript_user_turns",
  "conversation_transcript_tool_calls",
  "conversation_transcript_events",
  "conversation_transcript_todos",
  "improve_suggestion_feedback_events",
  "improve_agent_conversation_reads",
  "improve_project_audits",
  "improve_maintenance_steps",
  "improve_signal_cluster_duplicate_candidates",
  "improve_signal_cluster_members",
  "improve_signal_clusters",
  "improve_suggestion_clusters",
  "improve_suggestions",
  "improve_signals",
  "workspace_locations",
  "project_setup_summaries",
  "app_usage_interval_ids",
  "app_usage_intervals",
  "setup_artifacts",
  "usage_snapshots",
  "setup_versions",
  "improve_runs",
  "conversations",
  "wrapped_records",
  "harnesses",
  "projects",
  "sessions",
  "settings",
  "sources",
  "meta",
  "idx_setup_versions_artifact",
  "idx_conv_transcript_turns_position",
  "idx_conv_transcript_events_turn",
  "idx_conv_transcript_todo_lists_turn",
  "idx_conv_transcript_todos_list",
  "idx_sources_kind_path",
  "idx_improve_signals_run",
  "idx_improve_signals_conversation",
  "idx_improve_signal_clusters_key",
  "idx_improve_signal_clusters_status",
  "idx_improve_signal_clusters_creator_agent_version_id",
  "idx_improve_signal_cluster_members_signal",
  "idx_improve_suggestion_clusters_cluster",
  "idx_improve_suggestion_feedback_events_suggestion",
  "idx_improve_agent_conversation_reads_agent",
  "idx_improve_project_audits_agent",
  "idx_improve_suggestions_creator_agent_version_id",
  "idx_improve_signals_creator_agent_version_id",
  "idx_improve_signals_missing_search",
  "idx_improve_clusters_missing_search",
  "idx_app_usage_unsent",
  "idx_conversations_ref",
  "idx_wrapped_records_created",
  "idx_wrapped_records_period"
];
const SQL_IDENTIFIER_RE = new RegExp(`\\b(${SQL_IDENTIFIERS.join("|")})\\b`, "g");
function validateTablePrefix(prefix) {
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(prefix)) return;
  throw new Error(`Invalid SQL table prefix: ${prefix}`);
}
function namespaceSql(sql, prefix) {
  if (!prefix) return sql;
  validateTablePrefix(prefix);
  return sql.replace(SQL_IDENTIFIER_RE, (identifier) => `${prefix}${identifier}`);
}
function setupKind(value) {
  switch (value) {
    case "rule":
    case "skill":
    case "plugin":
    case "hook":
    case "command":
    case "agent":
    case "mcp":
    case "setting":
    case "doc":
    case "auth-layout":
    case "usage-layout":
      return value;
    default:
      return "unknown";
  }
}
function setupAuthor(value) {
  return value === "user" || value === "improve" || value === "migration" || value === "harness-lab" ? value : "scanner";
}
function mapProjectSetupSummary(row) {
  return {
    workspacePath: text(row.workspace_path),
    skills: int(row.skills),
    agents: int(row.agents),
    commands: int(row.commands),
    hooks: int(row.hooks),
    rules: int(row.rules),
    totalEntries: int(row.total_entries),
    scannedAt: int(row.scanned_at)
  };
}
function mapVersion(row, materializedContent) {
  return {
    id: text(row.id),
    artifactId: text(row.artifact_id),
    content: materializedContent ?? text(row.content),
    parsedShape: json(row.parsed_shape),
    rawShape: json(row.raw_shape),
    contentHash: text(row.content_hash),
    createdAt: text(row.created_at),
    createdBy: setupAuthor(text(row.created_by))
  };
}
function materializeVersionRows(rows) {
  let previous = "";
  return rows.map((row) => {
    const stored = text(row.content);
    const content = row.content_storage === "delta" ? applyCompactTextDelta(previous, parseCompactTextDelta(stored)) : stored;
    previous = content;
    return mapVersion(row, content);
  });
}
function mapArtifact(row) {
  const projectId = textOrNull(row.project_id);
  const workspaceLocationId = textOrNull(row.workspace_location_id);
  const sourcePath = textOrNull(row.source_path);
  return {
    id: text(row.id),
    harnessId: text(row.harness_id),
    scope: text(row.scope) === "global" ? "global" : "project",
    kind: setupKind(text(row.kind)),
    currentVersionId: text(row.current_version_id),
    parserVersion: text(row.parser_version),
    scannerVersion: text(row.scanner_version),
    ...projectId ? { projectId } : {},
    ...workspaceLocationId ? { workspaceLocationId } : {},
    ...sourcePath ? { sourcePath } : {}
  };
}
function rowToProject(row) {
  if (text(row.kind) === "git") {
    const canonicalRemote = textOrNull(row.canonical_remote);
    return {
      kind: "git",
      id: text(row.id),
      repoRoot: text(row.repo_root),
      gitCommonDir: text(row.git_common_dir),
      ...canonicalRemote ? { canonicalRemote } : {}
    };
  }
  return { kind: "folder", id: text(row.id), root: text(row.root) };
}
function rowToWorkspace(row) {
  const kind = text(row.kind);
  return {
    id: text(row.id),
    projectId: text(row.project_id),
    path: text(row.path),
    kind: kind === "repo-root" || kind === "worktree" ? kind : "folder-root"
  };
}
function rowToConversation(row) {
  const startedAt = intOrNull(row.started_at);
  return {
    id: text(row.id),
    ref: text(row.ref),
    harnessId: text(row.harness_id),
    projectId: textOrNull(row.project_id),
    workspaceLocationId: textOrNull(row.workspace_location_id),
    title: textOrNull(row.title),
    preview: textOrNull(row.preview),
    state: text(row.state),
    failureReason: textOrNull(row.failure_reason),
    ...startedAt === null ? {} : { startedAt },
    lastActivityTs: int(row.last_activity_ts)
  };
}
function rowToTranscriptTurn(row) {
  return {
    id: int(row.id),
    conversation_id: int(row.conversation_numeric_id),
    position: int(row.position),
    prompt: text(row.prompt),
    state: text(row.state),
    started_at: intOrNull(row.started_at),
    ended_at: intOrNull(row.ended_at)
  };
}
function rowToTranscriptToolCall(row) {
  return {
    id: int(row.id),
    conversation_id: int(row.conversation_numeric_id),
    event_id: intOrNull(row.event_id),
    tool_use_id: textOrNull(row.tool_use_id),
    name: text(row.name),
    input_json: textOrNull(row.input_json),
    result_text: textOrNull(row.result_text),
    is_error: int(row.is_error) === 1 ? 1 : 0,
    started_at_ms: intOrNull(row.started_at_ms),
    ended_at_ms: intOrNull(row.ended_at_ms)
  };
}
function todoState(value) {
  const state = text(value);
  return state === "pending" || state === "current" || state === "done" ? state : "pending";
}
function transcriptExcerpt(textValue, query) {
  const compact = textValue.replace(/\s+/g, " ").trim();
  const index2 = compact.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (index2 < 0 || compact.length <= 260) return compact.slice(0, 260);
  const start = Math.max(0, index2 - 84);
  const end = Math.min(compact.length, index2 + query.length + 164);
  return `${start > 0 ? "…" : ""}${compact.slice(start, end).trim()}${end < compact.length ? "…" : ""}`;
}
function escapeLike(value) {
  return value.replace(/[\\%_]/g, "\\$&");
}
function rowToAppUsageInterval(row) {
  return {
    id: int(row.id),
    started_at_ms: int(row.started_at_ms),
    ended_at_ms: int(row.ended_at_ms),
    process_running_seconds: int(row.process_running_seconds),
    window_visible_seconds: int(row.window_visible_seconds),
    window_visible_pinned_seconds: int(row.window_visible_pinned_seconds),
    window_visible_pinned_expanded_seconds: int(row.window_visible_pinned_expanded_seconds),
    window_visible_regular_expanded_seconds: int(row.window_visible_regular_expanded_seconds),
    week_start: text(row.week_start),
    local_day_of_week: text(row.local_day_of_week),
    local_hour: int(row.local_hour),
    timezone: text(row.timezone),
    created_at: int(row.created_at),
    sent_at_ms: intOrNull(row.sent_at_ms)
  };
}
function isDuplicateColumnError(error) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return message.includes("duplicate column") || message.includes("already exists");
}
async function addColumnIfMissing(sql, table, column, definition) {
  try {
    await sql.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, []);
  } catch (error) {
    if (!isDuplicateColumnError(error)) throw error;
  }
}
const RESYNC_APP_USAGE_INTERVAL_IDS_SQL = `INSERT INTO app_usage_interval_ids (singleton, next_id)
     SELECT 1, COALESCE(MAX(id), 0) FROM app_usage_intervals
     WHERE 1 = 1
     ON CONFLICT (singleton) DO UPDATE SET next_id = CASE
       WHEN app_usage_interval_ids.next_id < excluded.next_id THEN excluded.next_id
       ELSE app_usage_interval_ids.next_id
     END`;
const ALLOCATE_APP_USAGE_INTERVAL_ID_SQL = `INSERT INTO app_usage_interval_ids (singleton, next_id) VALUES (1, 1)
           ON CONFLICT (singleton) DO UPDATE SET next_id = app_usage_interval_ids.next_id + 1
           RETURNING next_id`;
const APP_USAGE_INTERVAL_INSERT_ATTEMPTS = 8;
async function ensureSharedMigrations(sql) {
  await sql.run(RESYNC_APP_USAGE_INTERVAL_IDS_SQL, []);
  await addColumnIfMissing(sql, "setup_versions", "content_storage", "TEXT NOT NULL DEFAULT 'full'");
  await addColumnIfMissing(sql, "conversations", "state_override_turn_position", "BIGINT");
  await addColumnIfMissing(sql, "conversations", "failure_reason", "TEXT");
  await addColumnIfMissing(sql, "conversations", "activity_event_count", "BIGINT");
  await addColumnIfMissing(sql, "conversations", "started_at", "BIGINT");
  await addColumnIfMissing(sql, "improve_suggestions", "change_json", "TEXT");
  await addColumnIfMissing(sql, "improve_suggestions", "operations_json", "TEXT");
  await addColumnIfMissing(sql, "improve_suggestions", "evidence_json", "TEXT");
  await addColumnIfMissing(sql, "improve_suggestions", "feedback_reasons_json", "TEXT");
  await addColumnIfMissing(sql, "improve_suggestions", "apply_result_json", "TEXT");
  await addColumnIfMissing(sql, "improve_suggestions", "snoozed_until", "BIGINT");
  await addColumnIfMissing(
    sql,
    "improve_suggestions",
    "creator_agent_version_id",
    "TEXT NOT NULL DEFAULT 'legacy-3-step-workflow'"
  );
  await addColumnIfMissing(sql, "improve_suggestions", "hidden_at", "BIGINT");
  await addColumnIfMissing(sql, "improve_suggestions", "hidden_reason", "TEXT");
  await addColumnIfMissing(sql, "improve_suggestions", "hidden_until", "BIGINT");
  await addColumnIfMissing(sql, "improve_suggestions", "last_shown_at", "BIGINT");
  await addColumnIfMissing(sql, "improve_suggestions", "shown_count", "BIGINT NOT NULL DEFAULT 0");
  await addColumnIfMissing(
    sql,
    "improve_signals",
    "creator_agent_version_id",
    "TEXT NOT NULL DEFAULT 'legacy-3-step-workflow'"
  );
  await addColumnIfMissing(sql, "improve_signals", "type", "TEXT");
  await sql.exec(
    "UPDATE improve_signals SET type = kind WHERE type IS NULL AND kind IN ('correction', 'steering', 'frustration')"
  );
  await addColumnIfMissing(sql, "improve_signals", "tags_json", "TEXT NOT NULL DEFAULT '[]'");
  await addColumnIfMissing(sql, "improve_signals", "search_text", "TEXT");
  await addColumnIfMissing(sql, "improve_signals", "search_tags", "TEXT");
  for (const column of ["search_text", "search_tags", "search_tokens"])
    await addColumnIfMissing(sql, "improve_signal_clusters", column, "TEXT");
  await addColumnIfMissing(
    sql,
    "improve_signal_clusters",
    "creator_agent_version_id",
    "TEXT NOT NULL DEFAULT 'legacy-3-step-workflow'"
  );
  await addColumnIfMissing(
    sql,
    "improve_signal_clusters",
    "tags_json",
    "TEXT NOT NULL DEFAULT '[]'"
  );
  await sql.exec(`
    CREATE INDEX IF NOT EXISTS idx_improve_suggestions_creator_agent_version_id
      ON improve_suggestions (creator_agent_version_id);
    CREATE INDEX IF NOT EXISTS idx_improve_signals_creator_agent_version_id
      ON improve_signals (creator_agent_version_id);
    CREATE INDEX IF NOT EXISTS idx_improve_signal_clusters_creator_agent_version_id
      ON improve_signal_clusters (creator_agent_version_id);
    CREATE TABLE IF NOT EXISTS improve_agent_conversation_reads (
      conversation_id TEXT NOT NULL,
      agent_version_id TEXT NOT NULL,
      transcript_hash TEXT,
      conversation_activity_ts BIGINT NOT NULL DEFAULT 0,
      last_processed_message_position BIGINT,
      read_at BIGINT NOT NULL,
      read_count BIGINT NOT NULL DEFAULT 1,
      PRIMARY KEY (conversation_id, agent_version_id)
    );
    CREATE INDEX IF NOT EXISTS idx_improve_agent_conversation_reads_agent
      ON improve_agent_conversation_reads (agent_version_id, read_at DESC);
    CREATE TABLE IF NOT EXISTS improve_suggestion_feedback_events (
      event_id TEXT PRIMARY KEY,
      suggestion_id TEXT NOT NULL,
      agent_version_id TEXT NOT NULL,
      type TEXT NOT NULL,
      metadata_json TEXT NOT NULL DEFAULT '{}',
      created_at BIGINT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_improve_suggestion_feedback_events_suggestion
      ON improve_suggestion_feedback_events (suggestion_id, created_at);
    CREATE TABLE IF NOT EXISTS improve_suggestion_clusters (
      suggestion_id TEXT NOT NULL,
      cluster_id TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      PRIMARY KEY (suggestion_id, cluster_id)
    );
    CREATE INDEX IF NOT EXISTS idx_improve_suggestion_clusters_cluster
      ON improve_suggestion_clusters (cluster_id, suggestion_id);
    INSERT INTO improve_suggestion_clusters (suggestion_id, cluster_id, created_at)
    SELECT id, cluster_id, created_at FROM improve_suggestions WHERE 1 = 1
    ON CONFLICT (suggestion_id, cluster_id) DO NOTHING;
  `);
  await addColumnIfMissing(
    sql,
    "improve_agent_conversation_reads",
    "last_processed_message_position",
    "BIGINT"
  );
  await addColumnIfMissing(sql, "improve_runs", "task_type", "TEXT");
  await addColumnIfMissing(sql, "improve_runs", "project_path", "TEXT");
  await addColumnIfMissing(sql, "improve_runs", "processing_provider", "TEXT");
  await addColumnIfMissing(sql, "improve_runs", "model_provider", "TEXT");
  await addColumnIfMissing(sql, "improve_runs", "model", "TEXT");
  await purgeLegacyImproveData(sql);
}
const PURGE_INSIGHTS_STEP = "purge-legacy-improve-data";
async function purgeLegacyImproveData(sql) {
  await sql.exec(`
    CREATE TABLE IF NOT EXISTS improve_maintenance_steps (
      step TEXT PRIMARY KEY,
      completed_at BIGINT NOT NULL
    );
  `);
  const done = await sql.get("SELECT step FROM improve_maintenance_steps WHERE step = ?", [
    PURGE_INSIGHTS_STEP
  ]);
  if (done) return;
  await sql.exec(`
    DELETE FROM improve_suggestion_feedback_events;
    DELETE FROM improve_suggestion_clusters;
    DELETE FROM improve_suggestions;
    DELETE FROM improve_signal_cluster_duplicate_candidates;
    DELETE FROM improve_signal_cluster_members;
    DELETE FROM improve_signal_clusters;
    DELETE FROM improve_signals;
    DELETE FROM improve_runs;
    DELETE FROM improve_agent_conversation_reads;
  `);
  await sql.run(
    "INSERT INTO improve_maintenance_steps (step, completed_at) VALUES (?, ?) ON CONFLICT (step) DO NOTHING",
    [PURGE_INSIGHTS_STEP, Date.now()]
  );
}
const LEGACY_CREATOR_AGENT_VERSION_ID = "legacy-3-step-workflow";
function searchExcerpt(value, query) {
  const compact = text(value).replace(/\s+/g, " ").trim();
  const index2 = compact.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
  if (index2 < 0 || compact.length <= 220) return compact.slice(0, 220);
  const start = Math.max(0, index2 - 72);
  const end = Math.min(compact.length, index2 + query.length + 140);
  return `${start > 0 ? "…" : ""}${compact.slice(start, end).trim()}${end < compact.length ? "…" : ""}`;
}
function searchTitle(value, fallback) {
  return text(value).trim() || text(fallback).trim() || "Untitled";
}
function searchRank(title, excerpt, query, base) {
  const needle = query.toLocaleLowerCase();
  const normalizedTitle = title.toLocaleLowerCase();
  if (normalizedTitle === needle) return base;
  if (normalizedTitle.startsWith(needle)) return base + 1;
  if (normalizedTitle.includes(needle)) return base + 2;
  if (excerpt?.toLocaleLowerCase().includes(needle)) return base + 3;
  return base + 4;
}
function sortSearchResults(results) {
  return results.sort(
    (left, right) => left.rank - right.rank || right.updatedAt - left.updatedAt || left.title.localeCompare(right.title)
  );
}
function signalAnalyticsType(value) {
  return value === "correction" || value === "steering" || value === "frustration" ? value : null;
}
function auditTagIdentity(value) {
  let tags;
  try {
    tags = JSON.parse(text(value));
  } catch {
    return null;
  }
  if (!Array.isArray(tags)) return null;
  const checkTag = tags.find(
    (tag) => typeof tag === "string" && tag.startsWith("check:")
  );
  const catalogTag = tags.find(
    (tag) => typeof tag === "string" && tag.startsWith("catalog:v")
  );
  const checkId = checkTag?.slice("check:".length).trim() ?? "";
  const catalogVersion = Number(catalogTag?.slice("catalog:v".length));
  return checkId && Number.isSafeInteger(catalogVersion) && catalogVersion > 0 ? { checkId, catalogVersion } : null;
}
function creatorAgentVersionId(input) {
  return input?.creatorAgentVersionId ?? LEGACY_CREATOR_AGENT_VERSION_ID;
}
function uniqueClusterIds(ids) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const value of ids) {
    const id = String(value ?? "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}
function rowToImproveSuggestion(row) {
  const operations = json(row.operations_json);
  const evidence = json(row.evidence_json);
  const feedbackReasons = json(row.feedback_reasons_json);
  const applyResult = json(row.apply_result_json);
  return {
    id: text(row.id),
    clusterId: text(row.cluster_id),
    creatorAgentVersionId: text(row.creator_agent_version_id) || LEGACY_CREATOR_AGENT_VERSION_ID,
    title: text(row.title),
    summary: text(row.summary),
    feedbackReasons: Array.isArray(feedbackReasons) ? feedbackReasons.filter((reason) => typeof reason === "string").slice(0, 3) : null,
    status: text(row.status),
    evidenceCount: int(row.evidence_count),
    change: json(row.change_json),
    operations: Array.isArray(operations) ? operations : null,
    evidence: Array.isArray(evidence) ? evidence : null,
    applyResult: applyResult && typeof applyResult === "object" && !Array.isArray(applyResult) ? applyResult : null,
    snoozedUntil: intOrNull(row.snoozed_until),
    hiddenAt: intOrNull(row.hidden_at),
    hiddenReason: textOrNull(row.hidden_reason),
    hiddenUntil: intOrNull(row.hidden_until),
    lastShownAt: intOrNull(row.last_shown_at),
    shownCount: int(row.shown_count),
    createdAt: int(row.created_at),
    updatedAt: int(row.updated_at)
  };
}
function rowToImproveSignal(row) {
  const signalType = text(row.type);
  return {
    id: int(row.id),
    schema_version: int(row.schema_version),
    run_id: text(row.run_id),
    conversation_id: text(row.conversation_id),
    creator_agent_version_id: text(row.creator_agent_version_id) || LEGACY_CREATOR_AGENT_VERSION_ID,
    ...signalType ? { type: signalType } : {},
    kind: text(row.kind),
    normalized_key: text(row.normalized_key),
    summary: text(row.summary),
    evidence_json: text(row.evidence_json),
    setup_refs_json: text(row.setup_refs_json),
    setup_mismatch_json: textOrNull(row.setup_mismatch_json),
    scope: text(row.scope),
    observed_harness: text(row.observed_harness),
    harness_applicability_json: text(row.harness_applicability_json),
    pain_score: int(row.pain_score),
    confidence: Number(row.confidence),
    tags_json: text(row.tags_json) || "[]",
    created_at: int(row.created_at)
  };
}
function rowToImproveSignalCluster(row) {
  return {
    id: int(row.id),
    schema_version: int(row.schema_version),
    creator_agent_version_id: text(row.creator_agent_version_id) || LEGACY_CREATOR_AGENT_VERSION_ID,
    normalized_key: text(row.normalized_key),
    canonical_summary: text(row.canonical_summary),
    status: text(row.status),
    signal_count: int(row.signal_count),
    conversation_count: int(row.conversation_count),
    project_count: int(row.project_count),
    harnesses_json: text(row.harnesses_json),
    tags_json: text(row.tags_json) || "[]",
    high_pain_conversation_count: int(row.high_pain_conversation_count),
    dismissed_count: int(row.dismissed_count),
    first_seen_at: int(row.first_seen_at),
    last_seen_at: int(row.last_seen_at),
    promoted_at: intOrNull(row.promoted_at)
  };
}
function rowToImproveSuggestionCluster(row) {
  return {
    suggestion_id: text(row.suggestion_id),
    cluster_id: text(row.cluster_id),
    created_at: int(row.created_at),
    normalized_key: textOrNull(row.normalized_key),
    canonical_summary: textOrNull(row.canonical_summary),
    status: textOrNull(row.status)
  };
}
function rowToSuggestionFeedbackEvent(row) {
  return {
    event_id: text(row.event_id),
    suggestion_id: text(row.suggestion_id),
    agent_version_id: text(row.agent_version_id),
    type: text(row.type),
    metadata_json: text(row.metadata_json) || "{}",
    created_at: int(row.created_at)
  };
}
function rowToConversationRead(row) {
  return {
    conversation_id: text(row.conversation_id),
    agent_version_id: text(row.agent_version_id),
    transcript_hash: textOrNull(row.transcript_hash),
    conversation_activity_ts: int(row.conversation_activity_ts),
    last_processed_message_position: intOrNull(row.last_processed_message_position),
    read_at: int(row.read_at),
    read_count: int(row.read_count)
  };
}
function rowToProjectAudit(row) {
  return {
    project_path: text(row.project_path),
    agent_version_id: text(row.agent_version_id),
    setup_state_hash: text(row.setup_state_hash),
    conversations_seen_count: int(row.conversations_seen_count),
    last_run_id: textOrNull(row.last_run_id),
    last_run_at: int(row.last_run_at),
    audit_count: int(row.audit_count)
  };
}
function rowToImproveDuplicateCandidate(row) {
  return {
    id: int(row.id),
    cluster_ids_json: text(row.cluster_ids_json),
    reason: text(row.reason),
    confidence: Number(row.confidence),
    status: text(row.status),
    created_at: int(row.created_at)
  };
}
function createSqlStorageBundle(sql, options, initializeSchema) {
  const prefix = options.tablePrefix;
  const ready = initializeSchema ? sql.exec(namespaceSql(SCHEMA, prefix)).then(async () => {
    await ensureSharedMigrations({
      exec: (ddl) => sql.exec(namespaceSql(ddl, prefix)),
      run: (query, params) => sql.run(namespaceSql(query, prefix), params),
      get: (query, params) => sql.get(namespaceSql(query, prefix), params),
      all: (query, params) => sql.all(namespaceSql(query, prefix), params)
    });
    try {
      await sql.exec(
        namespaceSql(
          "CREATE INDEX IF NOT EXISTS idx_conversations_ref ON conversations (ref)",
          prefix
        )
      );
    } catch (error) {
      const message = String(error).toLowerCase();
      if (!message.includes("no such column: ref") && !message.includes('ref" does not exist')) {
        throw error;
      }
    }
  }) : Promise.resolve();
  const now = options.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  const all = async (query, params = []) => {
    await ready;
    return sql.all(namespaceSql(query, prefix), params);
  };
  const get = async (query, params = []) => {
    await ready;
    return sql.get(namespaceSql(query, prefix), params);
  };
  const run = async (query, params = []) => {
    await ready;
    await sql.run(namespaceSql(query, prefix), params);
  };
  async function getMaterializedSetupVersion(versionId) {
    const target = await get("SELECT artifact_id, seq FROM setup_versions WHERE id = ?", [
      versionId
    ]);
    if (!target) return null;
    const rows = await all(
      "SELECT * FROM setup_versions WHERE artifact_id = ? AND seq <= ? ORDER BY seq ASC",
      [text(target.artifact_id), int(target.seq)]
    );
    return materializeVersionRows(rows).at(-1) ?? null;
  }
  async function replaceImproveSuggestionClusters(suggestionId, clusterIds) {
    const ids = uniqueClusterIds(clusterIds);
    const nowMs = Date.now();
    await run("DELETE FROM improve_suggestion_clusters WHERE suggestion_id = ?", [suggestionId]);
    for (const clusterId of ids) {
      await run(
        `INSERT INTO improve_suggestion_clusters (suggestion_id, cluster_id, created_at)
         VALUES (?, ?, ?)
         ON CONFLICT (suggestion_id, cluster_id) DO UPDATE SET created_at = excluded.created_at`,
        [suggestionId, clusterId, nowMs]
      );
    }
  }
  async function listImproveSuggestionClusters(suggestionId) {
    return (await all(
      `SELECT sc.suggestion_id, sc.cluster_id, sc.created_at,
              c.normalized_key, c.canonical_summary, c.status
       FROM improve_suggestion_clusters sc
       LEFT JOIN improve_signal_clusters c ON CAST(c.id AS TEXT) = sc.cluster_id
       WHERE sc.suggestion_id = ?
       ORDER BY sc.cluster_id`,
      [suggestionId]
    )).map(rowToImproveSuggestionCluster);
  }
  async function recordSetup(observation) {
    const id = setupArtifactId(setupArtifactKey(observation));
    const hash$1 = hash.contentHash(observation.content);
    const existing = await get("SELECT * FROM setup_artifacts WHERE id = ?", [id]);
    if (!existing) {
      const versionId2 = setupVersionId(id, 1);
      await run(
        `INSERT INTO setup_versions (id, artifact_id, seq, content, content_storage, parsed_shape, raw_shape, content_hash, created_at, created_by)
         VALUES (?, ?, 1, ?, 'full', ?, ?, ?, ?, ?)`,
        [
          versionId2,
          id,
          observation.content,
          JSON.stringify(observation.parsedShape ?? null),
          JSON.stringify(observation.rawShape ?? null),
          hash$1,
          now(),
          observation.createdBy ?? "scanner"
        ]
      );
      await run(
        `INSERT INTO setup_artifacts (id, harness_id, project_id, workspace_location_id, scope, kind, source_path, current_version_id, parser_version, scanner_version)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          observation.harnessId,
          observation.projectId ?? null,
          observation.workspaceLocationId ?? null,
          observation.scope,
          observation.kind,
          observation.sourcePath ?? null,
          versionId2,
          observation.parserVersion,
          observation.scannerVersion
        ]
      );
      return { created: true, changed: true };
    }
    await run(
      "UPDATE setup_artifacts SET parser_version = ?, scanner_version = ?, source_path = COALESCE(?, source_path) WHERE id = ?",
      [observation.parserVersion, observation.scannerVersion, observation.sourcePath ?? null, id]
    );
    const current = await get("SELECT content_hash FROM setup_versions WHERE id = ?", [
      text(existing.current_version_id)
    ]);
    if (current && text(current.content_hash) === hash$1) {
      return { created: false, changed: false };
    }
    const historyRows = await all(
      "SELECT * FROM setup_versions WHERE artifact_id = ? ORDER BY seq ASC",
      [id]
    );
    const materializedHistory = materializeVersionRows(historyRows);
    const seq = historyRows.length + 1;
    if (historyRows.length > 1) {
      const latestRow = historyRows.at(-1);
      const latestVersion = materializedHistory.at(-1);
      const previousVersion = materializedHistory.at(-2);
      if (latestRow.content_storage !== "delta") {
        const delta = serializeCompactTextDelta(
          createCompactTextDelta(previousVersion.content, latestVersion.content)
        );
        await run("UPDATE setup_versions SET content = ?, content_storage = 'delta' WHERE id = ?", [
          delta,
          latestVersion.id
        ]);
      }
    }
    const versionId = setupVersionId(id, seq);
    await run(
      `INSERT INTO setup_versions (id, artifact_id, seq, content, content_storage, parsed_shape, raw_shape, content_hash, created_at, created_by)
       VALUES (?, ?, ?, ?, 'full', ?, ?, ?, ?, ?)`,
      [
        versionId,
        id,
        seq,
        observation.content,
        JSON.stringify(observation.parsedShape ?? null),
        JSON.stringify(observation.rawShape ?? null),
        hash$1,
        now(),
        observation.createdBy ?? "scanner"
      ]
    );
    await run("UPDATE setup_artifacts SET current_version_id = ? WHERE id = ?", [versionId, id]);
    return { created: false, changed: true };
  }
  return {
    search: {
      async query(input) {
        const query = input.query.trim();
        const categories = new Set(input.categories);
        const limit = deliveryBriefs.normalizeGlobalSearchLimit(input.limit);
        if (query.length < 2 || categories.size === 0) {
          return { results: [], truncated: false };
        }
        const rowLimit = limit + 1;
        const normalizedQuery = query.toLocaleLowerCase();
        const escapedQuery = escapeLike(normalizedQuery);
        const pattern = `%${escapedQuery}%`;
        const prefixPattern = `${escapedQuery}%`;
        const results = [];
        if (categories.has("conversations")) {
          const rows = await all(
            `SELECT c.id, c.ref, c.title, c.preview, c.harness_id, c.project_id,
                    c.workspace_location_id, c.last_activity_ts, p.repo_root, p.root,
                    p.canonical_remote, w.path AS workspace_path,
                    (coalesce(c.title, '') || ' ' || c.ref || ' ' || coalesce(c.preview, '') || ' ' ||
                     coalesce(p.repo_root, '') || ' ' || coalesce(p.root, '') || ' ' ||
                     coalesce(p.canonical_remote, '') || ' ' || coalesce(w.path, '')) AS matched_text
             FROM conversations c
             LEFT JOIN projects p ON p.id = c.project_id
             LEFT JOIN workspace_locations w ON w.id = c.workspace_location_id
             WHERE lower(coalesce(c.title, '') || ' ' || c.ref || ' ' || coalesce(c.preview, '') || ' ' ||
                         coalesce(p.repo_root, '') || ' ' || coalesce(p.root, '') || ' ' ||
                         coalesce(p.canonical_remote, '') || ' ' || coalesce(w.path, '')) LIKE ? ESCAPE '\\'
             ORDER BY CASE
                        WHEN lower(coalesce(nullif(trim(c.title), ''), c.ref)) = ? THEN 0
                        WHEN lower(coalesce(nullif(trim(c.title), ''), c.ref)) LIKE ? ESCAPE '\\' THEN 1
                        WHEN lower(coalesce(nullif(trim(c.title), ''), c.ref)) LIKE ? ESCAPE '\\' THEN 2
                        ELSE 3
                      END,
                      c.last_activity_ts DESC
             LIMIT ?`,
            [pattern, normalizedQuery, prefixPattern, pattern, rowLimit]
          );
          for (const row of rows) {
            const title = searchTitle(row.title, row.ref);
            const resultExcerpt = searchExcerpt(row.matched_text, query);
            const location = text(row.workspace_path) || text(row.repo_root) || text(row.root);
            results.push({
              id: `conversation:${text(row.id)}`,
              category: "conversations",
              title,
              subtitle: [location, text(row.harness_id)].filter(Boolean).join(" · ") || null,
              excerpt: resultExcerpt,
              rank: searchRank(title, resultExcerpt, query, 0),
              updatedAt: int(row.last_activity_ts),
              conversationRef: text(row.ref),
              conversationId: text(row.id),
              projectId: textOrNull(row.project_id),
              workspaceLocationId: textOrNull(row.workspace_location_id),
              harnessId: text(row.harness_id)
            });
          }
        }
        if (categories.has("messages")) {
          const scopeSql = input.conversationRef ? " AND c.ref = ?" : "";
          const params = (extra = []) => [
            pattern,
            ...input.conversationRef ? [input.conversationRef] : [],
            ...extra,
            rowLimit
          ];
          const [promptRows, eventRows, toolRows, todoRows] = await Promise.all([
            all(
              `SELECT c.id, c.ref, c.title, t.prompt AS matched_text, c.harness_id,
                      c.last_activity_ts, p.repo_root, p.root, t.position AS turn_position, t.id AS match_id
               FROM conversation_transcript_user_turns t
               JOIN conversations c ON c.id = t.conversation_id
               LEFT JOIN projects p ON p.id = c.project_id
               WHERE lower(t.prompt) LIKE ? ESCAPE '\\'${scopeSql}
               ORDER BY c.last_activity_ts DESC, t.position DESC LIMIT ?`,
              params()
            ),
            all(
              `SELECT c.id, c.ref, c.title, e.text AS matched_text, c.harness_id,
                      c.last_activity_ts, p.repo_root, p.root, t.position AS turn_position,
                      e.id AS match_id, e.kind
               FROM conversation_transcript_events e
               JOIN conversation_transcript_user_turns t
                 ON t.conversation_id = e.conversation_id AND t.id = e.user_turn_id
               JOIN conversations c ON c.id = e.conversation_id
               LEFT JOIN projects p ON p.id = c.project_id
               WHERE e.kind != 'user_text' AND e.text IS NOT NULL
                 AND NOT (e.kind = 'tool_result' AND e.tool_call_id IS NOT NULL)
                 AND lower(e.text) LIKE ? ESCAPE '\\'${scopeSql}
               ORDER BY c.last_activity_ts DESC, t.position DESC, e.id DESC LIMIT ?`,
              params()
            ),
            all(
              `SELECT c.id, c.ref, c.title,
                      (tc.name || ' ' || coalesce(tc.input_json, '') || ' ' || coalesce(tc.result_text, '')) AS matched_text,
                      c.harness_id, c.last_activity_ts, p.repo_root, p.root,
                      t.position AS turn_position, tc.id AS match_id, tc.event_id
               FROM conversation_transcript_tool_calls tc
               JOIN conversations c ON c.id = tc.conversation_id
               LEFT JOIN conversation_transcript_events e
                 ON e.conversation_id = tc.conversation_id AND e.id = tc.event_id
               LEFT JOIN conversation_transcript_user_turns t
                 ON t.conversation_id = e.conversation_id AND t.id = e.user_turn_id
               LEFT JOIN projects p ON p.id = c.project_id
               WHERE lower(tc.name || ' ' || coalesce(tc.input_json, '') || ' ' || coalesce(tc.result_text, '')) LIKE ? ESCAPE '\\'${scopeSql}
               ORDER BY c.last_activity_ts DESC, t.position DESC, tc.id DESC LIMIT ?`,
              params()
            ),
            all(
              `SELECT c.id, c.ref, c.title, todo.content AS matched_text, c.harness_id,
                      c.last_activity_ts, p.repo_root, p.root, t.position AS turn_position,
                      todo.id AS match_id, tl.id AS list_id
               FROM conversation_transcript_todos todo
               JOIN conversation_transcript_todo_lists tl
                 ON tl.conversation_id = todo.conversation_id AND tl.id = todo.list_id
               JOIN conversation_transcript_user_turns t
                 ON t.conversation_id = tl.conversation_id AND t.id = tl.user_turn_id
               JOIN conversations c ON c.id = todo.conversation_id
               LEFT JOIN projects p ON p.id = c.project_id
               WHERE lower(todo.content) LIKE ? ESCAPE '\\'${scopeSql}
               ORDER BY c.last_activity_ts DESC, t.position DESC, todo.id DESC LIMIT ?`,
              params()
            )
          ]);
          const appendMessage = (row, id, transcriptMatchKey, matchLabel, focusEventId, focusToolCallId) => {
            const title = searchTitle(row.title, row.ref);
            const excerpt = searchExcerpt(row.matched_text, query);
            const root = text(row.repo_root) || text(row.root);
            results.push({
              id,
              category: "messages",
              title,
              subtitle: [root, text(row.harness_id)].filter(Boolean).join(" · ") || null,
              excerpt,
              rank: searchRank(title, excerpt, query, 0),
              updatedAt: int(row.last_activity_ts),
              conversationRef: text(row.ref),
              conversationId: text(row.id),
              transcriptMatchKey,
              matchLabel,
              turnPosition: intOrNull(row.turn_position),
              focusEventId,
              focusToolCallId
            });
          };
          for (const row of promptRows)
            appendMessage(
              row,
              `prompt:${text(row.id)}:${int(row.match_id)}`,
              `turn-${int(row.match_id)}-prompt`,
              "User",
              null,
              null
            );
          for (const row of eventRows) {
            appendMessage(
              row,
              `event:${text(row.id)}:${int(row.match_id)}`,
              `event-${int(row.match_id)}`,
              text(row.kind) === "tool_result" ? "Tool result" : "Assistant",
              int(row.match_id),
              null
            );
          }
          for (const row of toolRows)
            appendMessage(
              row,
              `tool:${text(row.id)}:${int(row.match_id)}`,
              `tool-${int(row.match_id)}`,
              "Tool",
              intOrNull(row.event_id),
              int(row.match_id)
            );
          for (const row of todoRows)
            appendMessage(
              row,
              `todo:${text(row.id)}:${int(row.match_id)}`,
              `todos-${int(row.list_id)}`,
              "Tasks updated",
              null,
              null
            );
        }
        if (categories.has("projects")) {
          const rows = await all(
            `SELECT p.id, p.kind, coalesce(p.repo_root, p.root, '') AS project_root,
                    p.canonical_remote, coalesce(MAX(c.last_activity_ts), 0) AS updated_at
             FROM projects p LEFT JOIN conversations c ON c.project_id = p.id
             WHERE lower(coalesce(p.repo_root, '') || ' ' || coalesce(p.root, '') || ' ' || coalesce(p.canonical_remote, '')) LIKE ? ESCAPE '\\'
             GROUP BY p.id, p.kind, p.repo_root, p.root, p.canonical_remote
             ORDER BY CASE
                        WHEN lower(coalesce(p.repo_root, p.root, '')) = ?
                          OR lower(coalesce(p.canonical_remote, '')) = ?
                          OR lower(coalesce(p.repo_root, p.root, '')) LIKE ? ESCAPE '\\'
                          OR lower(coalesce(p.repo_root, p.root, '')) LIKE ? ESCAPE '\\'
                          THEN 0
                        WHEN lower(coalesce(p.repo_root, p.root, '')) LIKE ? ESCAPE '\\'
                          OR lower(coalesce(p.canonical_remote, '')) LIKE ? ESCAPE '\\'
                          THEN 2
                        ELSE 3
                      END,
                      updated_at DESC
             LIMIT ?`,
            [
              pattern,
              normalizedQuery,
              normalizedQuery,
              `%/${escapedQuery}`,
              `%\\\\${escapedQuery}`,
              pattern,
              pattern,
              rowLimit
            ]
          );
          for (const row of rows) {
            const root = text(row.project_root);
            const title = root.split(/[\\/]/).filter(Boolean).at(-1) ?? root;
            results.push({
              id: `project:${text(row.id)}`,
              category: "projects",
              title,
              subtitle: textOrNull(row.canonical_remote),
              excerpt: root,
              rank: searchRank(title, root, query, 0),
              updatedAt: int(row.updated_at),
              projectId: text(row.id),
              root
            });
          }
        }
        if (categories.has("setup")) {
          const rows = await all(
            `SELECT a.id, a.project_id, a.harness_id, a.kind, a.scope, a.source_path,
                    v.content, v.created_at
             FROM setup_artifacts a JOIN setup_versions v ON v.id = a.current_version_id
             WHERE lower(coalesce(a.source_path, '') || ' ' || a.harness_id || ' ' || a.kind || ' ' || v.content) LIKE ? ESCAPE '\\'
             ORDER BY v.created_at DESC LIMIT ?`,
            [pattern, rowLimit]
          );
          for (const row of rows) {
            const sourcePath = textOrNull(row.source_path);
            const title = sourcePath?.split(/[\\/]/).filter(Boolean).at(-1) ?? `${text(row.harness_id)} ${text(row.kind)}`;
            const excerpt = searchExcerpt(row.content, query);
            results.push({
              id: `setup:${text(row.id)}`,
              category: "setup",
              title,
              subtitle: `${text(row.harness_id)} · ${text(row.scope)} · ${text(row.kind)}`,
              excerpt,
              rank: searchRank(title, excerpt, query, 0),
              updatedAt: Date.parse(text(row.created_at)) || 0,
              artifactId: text(row.id),
              projectId: textOrNull(row.project_id),
              harnessId: text(row.harness_id),
              sourcePath
            });
          }
        }
        if (categories.has("suggestions")) {
          const rows = await all(
            `SELECT id, title, summary, status, updated_at,
                    (title || ' ' || summary || ' ' || coalesce(operations_json, '')) AS matched_text
             FROM improve_suggestions
             WHERE lower(title || ' ' || summary || ' ' || coalesce(operations_json, '')) LIKE ? ESCAPE '\\'
             ORDER BY CASE
                        WHEN lower(title) = ? THEN 0
                        WHEN lower(title) LIKE ? ESCAPE '\\' THEN 1
                        WHEN lower(title) LIKE ? ESCAPE '\\' THEN 2
                        ELSE 3
                      END,
                      updated_at DESC
             LIMIT ?`,
            [pattern, normalizedQuery, prefixPattern, pattern, rowLimit]
          );
          for (const row of rows) {
            const title = text(row.title);
            const excerpt = searchExcerpt(row.matched_text, query);
            results.push({
              id: `suggestion:${text(row.id)}`,
              category: "suggestions",
              title,
              subtitle: text(row.status),
              excerpt,
              rank: searchRank(title, excerpt, query, 0),
              updatedAt: int(row.updated_at),
              suggestionId: text(row.id),
              status: text(row.status)
            });
          }
        }
        const sorted = sortSearchResults(results);
        return { results: sorted.slice(0, limit), truncated: sorted.length > limit };
      }
    },
    settings: {
      async getAll() {
        const rows = await all("SELECT key, value FROM settings");
        const out = {};
        for (const row of rows) out[text(row.key)] = text(row.value);
        return out;
      },
      async get(key) {
        const row = await get("SELECT value FROM settings WHERE key = ?", [key]);
        return row ? text(row.value) : null;
      },
      async set(key, value) {
        await run(
          "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value",
          [key, value]
        );
      }
    },
    meta: {
      async getAll() {
        const rows = await all("SELECT key, value FROM meta");
        const out = {};
        for (const row of rows) out[text(row.key)] = text(row.value);
        return out;
      },
      async get(key) {
        const row = await get("SELECT value FROM meta WHERE key = ?", [key]);
        return row ? text(row.value) : null;
      },
      async set(key, value) {
        await run(
          "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value",
          [key, value]
        );
      },
      async delete(key) {
        await run("DELETE FROM meta WHERE key = ?", [key]);
      }
    },
    projects: {
      async upsertProject(project) {
        const repoRoot = project.kind === "git" ? project.repoRoot : null;
        const gitCommonDir = project.kind === "git" ? project.gitCommonDir : null;
        const canonicalRemote = project.kind === "git" ? project.canonicalRemote ?? null : null;
        const root = project.kind === "folder" ? project.root : null;
        await run(
          `INSERT INTO projects (id, kind, repo_root, git_common_dir, canonical_remote, root) VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT (id) DO UPDATE SET kind=excluded.kind, repo_root=excluded.repo_root, git_common_dir=excluded.git_common_dir,
             canonical_remote=excluded.canonical_remote, root=excluded.root`,
          [project.id, project.kind, repoRoot, gitCommonDir, canonicalRemote, root]
        );
      },
      async getProject(id) {
        const row = await get("SELECT * FROM projects WHERE id = ?", [id]);
        return row ? rowToProject(row) : null;
      },
      async listProjects() {
        return (await all("SELECT * FROM projects")).map(rowToProject);
      },
      async listProjectsByRoots(roots) {
        if (roots.length === 0) return [];
        const uniqueRoots = [...new Set(roots)];
        const projects = [];
        for (let index2 = 0; index2 < uniqueRoots.length; index2 += 250) {
          const batch = uniqueRoots.slice(index2, index2 + 250);
          const marks = batch.map(() => "?").join(", ");
          projects.push(
            ...(await all(
              `SELECT * FROM projects WHERE repo_root IN (${marks}) OR root IN (${marks})`,
              [...batch, ...batch]
            )).map(rowToProject)
          );
        }
        return projects;
      },
      async listPathResolutionCandidates(targetPath) {
        const target = normalizeProjectResolutionPath(targetPath);
        if (!target) return [];
        const [project, workspace] = await Promise.all([
          get(
            `SELECT id AS project_id, COALESCE(repo_root, root) AS path
             FROM projects
             WHERE ? = COALESCE(repo_root, root)
                OR (
                  SUBSTR(
                    COALESCE(repo_root, root),
                    LENGTH(COALESCE(repo_root, root)),
                    1
                  ) = '/'
                  AND SUBSTR(?, 1, LENGTH(COALESCE(repo_root, root)))
                    = COALESCE(repo_root, root)
                )
                OR (
                  SUBSTR(
                    COALESCE(repo_root, root),
                    LENGTH(COALESCE(repo_root, root)),
                    1
                  ) <> '/'
                  AND SUBSTR(?, 1, LENGTH(COALESCE(repo_root, root)) + 1)
                    = COALESCE(repo_root, root) || '/'
                )
             ORDER BY LENGTH(COALESCE(repo_root, root)) DESC
             LIMIT 1`,
            [target, target, target]
          ),
          get(
            `SELECT project_id, id AS workspace_location_id, path
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
             LIMIT 1`,
            [target, target, target]
          )
        ]);
        return [
          ...project ? [{ projectId: text(project.project_id), path: text(project.path) }] : [],
          ...workspace ? [
            {
              projectId: text(workspace.project_id),
              workspaceLocationId: text(workspace.workspace_location_id),
              path: text(workspace.path)
            }
          ] : []
        ];
      },
      async upsertWorkspaceLocation(location) {
        await run(
          `INSERT INTO workspace_locations (id, project_id, path, kind) VALUES (?, ?, ?, ?)
           ON CONFLICT (id) DO UPDATE SET project_id=excluded.project_id, path=excluded.path, kind=excluded.kind`,
          [location.id, location.projectId, location.path, location.kind]
        );
      },
      async listWorkspaceLocations(projectId) {
        return (await all("SELECT * FROM workspace_locations WHERE project_id = ?", [projectId])).map(rowToWorkspace);
      },
      async listWorkspaceLocationsByPaths(paths) {
        if (paths.length === 0) return [];
        const uniquePaths = [...new Set(paths)];
        const rows = [];
        for (let index2 = 0; index2 < uniquePaths.length; index2 += 250) {
          const batch = uniquePaths.slice(index2, index2 + 250);
          const marks = batch.map(() => "?").join(", ");
          rows.push(
            ...(await all(`SELECT * FROM workspace_locations WHERE path IN (${marks})`, batch)).map(
              rowToWorkspace
            )
          );
        }
        return rows;
      },
      async listWorkspaceLocationsForProjects(projectIds) {
        if (projectIds.length === 0) return [];
        const uniqueIds = [...new Set(projectIds)];
        const rows = [];
        for (let index2 = 0; index2 < uniqueIds.length; index2 += 250) {
          const batch = uniqueIds.slice(index2, index2 + 250);
          const marks = batch.map(() => "?").join(", ");
          rows.push(
            ...(await all(`SELECT * FROM workspace_locations WHERE project_id IN (${marks})`, batch)).map(rowToWorkspace)
          );
        }
        return rows;
      }
    },
    projectSetupSummaries: {
      async get(workspacePath) {
        const row = await get("SELECT * FROM project_setup_summaries WHERE workspace_path = ?", [
          workspacePath
        ]);
        return row ? mapProjectSetupSummary(row) : null;
      },
      async listForWorkspacePaths(workspacePaths) {
        if (workspacePaths.length === 0) return [];
        const uniquePaths = [...new Set(workspacePaths)];
        const summaries = [];
        for (let index2 = 0; index2 < uniquePaths.length; index2 += 250) {
          const batch = uniquePaths.slice(index2, index2 + 250);
          const placeholders = batch.map(() => "?").join(", ");
          summaries.push(
            ...(await all(
              `SELECT * FROM project_setup_summaries WHERE workspace_path IN (${placeholders})`,
              batch
            )).map(mapProjectSetupSummary)
          );
        }
        return summaries;
      },
      async upsert(summary) {
        await run(
          `INSERT INTO project_setup_summaries
             (workspace_path, skills, agents, commands, hooks, rules, total_entries, scanned_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (workspace_path) DO UPDATE SET
             skills=excluded.skills, agents=excluded.agents, commands=excluded.commands,
             hooks=excluded.hooks, rules=excluded.rules, total_entries=excluded.total_entries,
             scanned_at=excluded.scanned_at`,
          [
            summary.workspacePath,
            summary.skills,
            summary.agents,
            summary.commands,
            summary.hooks,
            summary.rules,
            summary.totalEntries,
            summary.scannedAt
          ]
        );
      }
    },
    sourceCursors: {
      async getSourceCursor(kind, path) {
        const row = await get(
          `SELECT kind, path, last_mtime_ms, last_size, last_byte_offset, last_cursor, last_fetched_at
           FROM sources
           WHERE kind = ? AND path = ?`,
          [kind, path]
        );
        return row ? {
          kind: text(row.kind),
          path: text(row.path),
          sourceMtimeMs: intOrNull(row.last_mtime_ms),
          sourceSize: intOrNull(row.last_size),
          sourceBytesParsed: intOrNull(row.last_byte_offset),
          sourceCursor: textOrNull(row.last_cursor),
          lastFetchedAt: intOrNull(row.last_fetched_at)
        } : null;
      },
      async upsertSourceCursor(input) {
        await run(
          `INSERT INTO sources (
             kind, path, last_mtime_ms, last_size, last_byte_offset, last_cursor, last_fetched_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(kind, path) DO UPDATE SET
             last_mtime_ms = excluded.last_mtime_ms,
             last_size = excluded.last_size,
             last_byte_offset = excluded.last_byte_offset,
             last_cursor = excluded.last_cursor,
             last_fetched_at = excluded.last_fetched_at`,
          [
            input.kind,
            input.path,
            input.lastMtimeMs ?? null,
            input.lastSize ?? null,
            input.lastByteOffset ?? null,
            input.lastCursor ?? null,
            input.lastFetchedAt ?? Date.now()
          ]
        );
      },
      async listSourceCursors() {
        const rows = await all(
          "SELECT path, last_mtime_ms, last_size, last_cursor FROM sources WHERE last_mtime_ms IS NOT NULL"
        );
        return rows.map((row) => ({
          path: text(row.path),
          sourceMtimeMs: int(row.last_mtime_ms),
          sourceSize: intOrNull(row.last_size),
          sourceCursor: textOrNull(row.last_cursor)
        }));
      },
      async listSourceCursorsForPaths(paths) {
        if (paths.length === 0) return [];
        const selected = [...new Set(paths)];
        const rows = [];
        for (let index2 = 0; index2 < selected.length; index2 += 250) {
          const batch = selected.slice(index2, index2 + 250);
          const placeholders = batch.map(() => "?").join(", ");
          rows.push(
            ...await all(
              `SELECT path, last_mtime_ms, last_size, last_cursor
               FROM sources
               WHERE last_mtime_ms IS NOT NULL AND path IN (${placeholders})`,
              batch
            )
          );
        }
        return rows.map((row) => ({
          path: text(row.path),
          sourceMtimeMs: int(row.last_mtime_ms),
          sourceSize: intOrNull(row.last_size),
          sourceCursor: textOrNull(row.last_cursor)
        }));
      },
      async resetSourceCursorsForKind(kind) {
        const rows = await all(
          "SELECT path FROM sources WHERE kind = ? AND last_mtime_ms IS NOT NULL",
          [kind]
        );
        await run(
          `UPDATE sources
           SET last_mtime_ms = NULL,
               last_size = NULL,
               last_byte_offset = NULL,
               last_cursor = NULL
           WHERE kind = ?`,
          [kind]
        );
        return rows.length;
      }
    },
    setup: {
      async listSetup(filter) {
        const clauses = [];
        const params = [];
        if (filter?.scope) {
          clauses.push("scope = ?");
          params.push(filter.scope);
        }
        if (filter?.kind) {
          clauses.push("kind = ?");
          params.push(filter.kind);
        }
        if (filter?.harnessId) {
          clauses.push("harness_id = ?");
          params.push(filter.harnessId);
        }
        if (filter?.projectId) {
          clauses.push("project_id = ?");
          params.push(filter.projectId);
        }
        const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
        const rows = await all(`SELECT * FROM setup_artifacts${where}`, params);
        const out = [];
        for (const row of rows) {
          const artifact = mapArtifact(row);
          const current = await getMaterializedSetupVersion(artifact.currentVersionId);
          if (current) out.push({ artifact, current });
        }
        return out;
      },
      async getArtifact(artifactId) {
        const row = await get("SELECT * FROM setup_artifacts WHERE id = ?", [artifactId]);
        return row ? mapArtifact(row) : null;
      },
      async getCurrentVersion(artifactId) {
        const artifact = await get("SELECT current_version_id FROM setup_artifacts WHERE id = ?", [
          artifactId
        ]);
        if (!artifact) return null;
        return getMaterializedSetupVersion(text(artifact.current_version_id));
      },
      async listVersions(artifactId) {
        return materializeVersionRows(
          await all("SELECT * FROM setup_versions WHERE artifact_id = ? ORDER BY seq ASC", [
            artifactId
          ])
        );
      },
      async getVersion(versionId) {
        return getMaterializedSetupVersion(versionId);
      },
      async ingestScan(observations) {
        let created = 0;
        let changed = 0;
        let unchanged = 0;
        for (const observation of observations) {
          const result = await recordSetup(observation);
          if (result.created) created++;
          else if (result.changed) changed++;
          else unchanged++;
        }
        return { created, changed, unchanged };
      },
      async createSetupVersion(change) {
        await recordSetup({ createdBy: "user", ...change });
        const id = setupArtifactId(setupArtifactKey(change));
        const artifact = await get("SELECT current_version_id FROM setup_artifacts WHERE id = ?", [
          id
        ]);
        const version = artifact ? await getMaterializedSetupVersion(text(artifact.current_version_id)) : null;
        if (!version) throw new Error("createSetupVersion: version not found after write");
        return version;
      },
      async undoSetupArtifact(artifactId) {
        const artifact = await get("SELECT current_version_id FROM setup_artifacts WHERE id = ?", [
          artifactId
        ]);
        if (!artifact) return null;
        const current = await get("SELECT seq FROM setup_versions WHERE id = ?", [
          text(artifact.current_version_id)
        ]);
        if (!current) return null;
        const previous = await get(
          "SELECT id FROM setup_versions WHERE artifact_id = ? AND seq < ? ORDER BY seq DESC LIMIT 1",
          [artifactId, int(current.seq)]
        );
        if (!previous) return null;
        await run("UPDATE setup_artifacts SET current_version_id = ? WHERE id = ?", [
          text(previous.id),
          artifactId
        ]);
        return getMaterializedSetupVersion(text(previous.id));
      }
    },
    conversations: {
      async listProjectConversations(projectId) {
        return (await all(
          "SELECT * FROM conversations WHERE project_id = ? ORDER BY last_activity_ts DESC",
          [projectId]
        )).map(rowToConversation);
      },
      async latestActivityByProject(projectIds) {
        const latest = {};
        for (let index2 = 0; index2 < projectIds.length; index2 += 500) {
          const batch = projectIds.slice(index2, index2 + 500);
          const rows = await all(
            `SELECT project_id, MAX(last_activity_ts) AS latest FROM conversations
             WHERE project_id IN (${batch.map(() => "?").join(", ")})
             GROUP BY project_id`,
            batch
          );
          for (const row of rows) latest[text(row.project_id)] = Number(row.latest);
        }
        return latest;
      },
      async getConversation(id) {
        const row = await get("SELECT * FROM conversations WHERE id = ?", [id]);
        return row ? rowToConversation(row) : null;
      },
      async getConversationByRef(ref) {
        const row = await get("SELECT * FROM conversations WHERE ref = ?", [ref]);
        return row ? rowToConversation(row) : null;
      },
      async getConversationTranscript(id, options2) {
        const conversationRow = await get("SELECT * FROM conversations WHERE id = ?", [id]);
        if (!conversationRow) return null;
        const conversation = rowToConversation(conversationRow);
        const stats = await get(
          `SELECT COUNT(t.id) AS total_turns, MIN(t.position) AS first_position,
                  MAX(t.position) AS latest_position, MAX(c.activity_event_count) AS activity_event_count
           FROM conversations c
           LEFT JOIN conversation_transcript_user_turns t ON t.conversation_id = c.id
           WHERE c.id = ?`,
          [id]
        );
        const totalTurns = int(stats?.total_turns);
        const totalActivityEvents = intOrNull(stats?.activity_event_count);
        const firstPosition = intOrNull(stats?.first_position);
        const latestPosition = intOrNull(stats?.latest_position);
        const before = Number.isFinite(options2?.beforeTurnPosition) ? Number(options2?.beforeTurnPosition) : Number.POSITIVE_INFINITY;
        const after = Number.isFinite(options2?.afterTurnPosition) ? Number(options2?.afterTurnPosition) : Number.NEGATIVE_INFINITY;
        const limit = Number.isFinite(options2?.limit) && Number(options2?.limit) > 0 ? Math.min(Number(options2?.limit), 200) : 200;
        let focusedPosition = Number.isFinite(options2?.aroundTurnPosition) ? Number(options2?.aroundTurnPosition) : void 0;
        if (Number.isFinite(options2?.focusEventId)) {
          const focus = await get(
            `SELECT t.position FROM conversation_transcript_events e
             JOIN conversation_transcript_user_turns t ON t.id = e.user_turn_id AND t.conversation_id = e.conversation_id
             WHERE e.conversation_id = ? AND e.id = ?`,
            [id, Number(options2?.focusEventId)]
          );
          focusedPosition = intOrNull(focus?.position) ?? focusedPosition;
        }
        if (Number.isFinite(options2?.focusToolCallId)) {
          const focus = await get(
            `SELECT COALESCE(t.position, ?) AS position
             FROM conversation_transcript_tool_calls tc
             LEFT JOIN conversation_transcript_events e ON e.id = tc.event_id AND e.conversation_id = tc.conversation_id
             LEFT JOIN conversation_transcript_user_turns t ON t.id = e.user_turn_id AND t.conversation_id = e.conversation_id
             WHERE tc.conversation_id = ? AND tc.id = ?`,
            [latestPosition, id, Number(options2?.focusToolCallId)]
          );
          focusedPosition = intOrNull(focus?.position) ?? focusedPosition;
        }
        let userTurns;
        if (before !== Number.POSITIVE_INFINITY || after !== Number.NEGATIVE_INFINITY) {
          userTurns = (await all(
            `SELECT * FROM conversation_transcript_user_turns
             WHERE conversation_id = ? AND position < ? AND position > ?
             ORDER BY position DESC LIMIT ?`,
            [id, before, after, limit]
          )).map(rowToTranscriptTurn).reverse();
        } else if (focusedPosition !== void 0) {
          const beforeOrAtFocus = await get(
            `SELECT COUNT(*) AS count FROM conversation_transcript_user_turns
             WHERE conversation_id = ? AND position <= ?`,
            [id, focusedPosition]
          );
          const offset = Math.max(
            0,
            Math.min(totalTurns - limit, int(beforeOrAtFocus?.count) - Math.ceil(limit / 2))
          );
          userTurns = (await all(
            `SELECT * FROM conversation_transcript_user_turns
             WHERE conversation_id = ? ORDER BY position ASC LIMIT ? OFFSET ?`,
            [id, limit, offset]
          )).map(rowToTranscriptTurn);
        } else {
          userTurns = (await all(
            `SELECT * FROM conversation_transcript_user_turns
             WHERE conversation_id = ? ORDER BY position DESC LIMIT ?`,
            [id, limit]
          )).map(rowToTranscriptTurn).reverse();
        }
        const turnIds = userTurns.map((turn) => turn.id);
        const events = turnIds.length === 0 ? [] : (await all(eventsForTurnsCappedSql(turnIds.length), [
          id,
          ...turnIds,
          DEFAULT_TRANSCRIPT_EVENTS_PER_TURN
        ])).map((row) => ({
          id: int(row.id),
          user_turn_id: int(row.user_turn_id),
          position: int(row.position),
          kind: text(row.kind) === "user_text" || text(row.kind) === "tool_result" ? text(row.kind) : "assistant_text",
          text: textOrNull(row.text),
          timestamp_ms: intOrNull(row.timestamp_ms),
          tool_call_id: intOrNull(row.tool_call_id),
          ...int(row.recency) === DEFAULT_TRANSCRIPT_EVENTS_PER_TURN && int(row.total_count) > DEFAULT_TRANSCRIPT_EVENTS_PER_TURN ? {
            hidden_before_count: int(row.total_count) - DEFAULT_TRANSCRIPT_EVENTS_PER_TURN
          } : {}
        }));
        const eventIds = events.map((event) => event.id);
        const includesLatestTurn = (userTurns.at(-1)?.position ?? null) === latestPosition;
        const toolClauses = [];
        const toolParams = [id];
        if (eventIds.length > 0) {
          toolClauses.push(`event_id IN (${eventIds.map(() => "?").join(",")})`);
          toolParams.push(...eventIds);
        }
        if (includesLatestTurn) toolClauses.push("event_id IS NULL");
        const toolCalls = toolClauses.length === 0 ? [] : latestPosition === null ? (
          // No user turns at all: return only the newest unlinked calls.
          (await all(
            `SELECT * FROM conversation_transcript_tool_calls WHERE conversation_id = ?
           AND event_id IS NULL ORDER BY id DESC LIMIT ?`,
            [id, UNATTRIBUTED_TRANSCRIPT_TOOL_CALL_LIMIT]
          )).map(rowToTranscriptToolCall).reverse()
        ) : (await all(
          `SELECT * FROM conversation_transcript_tool_calls WHERE conversation_id = ?
           AND (${toolClauses.join(" OR ")}) ORDER BY id ASC`,
          toolParams
        )).map(rowToTranscriptToolCall);
        const listRows = turnIds.length === 0 ? [] : await all(
          `SELECT * FROM conversation_transcript_todo_lists WHERE conversation_id = ?
           AND user_turn_id IN (${turnIds.map(() => "?").join(",")}) ORDER BY user_turn_id ASC, id ASC`,
          [id, ...turnIds]
        );
        const listIds = listRows.map((row) => int(row.id));
        const todoRows = listIds.length === 0 ? [] : await all(
          `SELECT * FROM conversation_transcript_todos WHERE conversation_id = ?
           AND list_id IN (${listIds.map(() => "?").join(",")}) ORDER BY list_id ASC, position ASC`,
          [id, ...listIds]
        );
        const todosByList = /* @__PURE__ */ new Map();
        for (const row of todoRows) {
          const listId = int(row.list_id);
          const todos = todosByList.get(listId) ?? [];
          todos.push({
            id: int(row.id),
            list_id: listId,
            position: int(row.position),
            content: text(row.content),
            state: todoState(row.state)
          });
          todosByList.set(listId, todos);
        }
        const todoLists = listRows.map((row) => {
          const listId = int(row.id);
          return {
            list: {
              id: listId,
              conversation_id: int(row.conversation_numeric_id),
              user_turn_id: int(row.user_turn_id),
              source_event_id: intOrNull(row.source_event_id),
              source: text(row.source),
              is_inferred: int(row.is_inferred) === 1 ? 1 : 0,
              created_at: int(row.created_at),
              updated_at: int(row.updated_at)
            },
            todos: todosByList.get(listId) ?? []
          };
        });
        const loadedFirstPosition = userTurns[0]?.position ?? null;
        const loadedLatestPosition = userTurns.at(-1)?.position ?? null;
        return {
          conversation,
          userTurns,
          events,
          toolCalls,
          todoLists,
          pagination: {
            totalTurns,
            totalActivityEvents,
            returnedTurns: userTurns.length,
            hasMoreBefore: loadedFirstPosition !== null && firstPosition !== null && loadedFirstPosition > firstPosition,
            nextBeforeTurnPosition: loadedFirstPosition,
            hasMoreAfter: loadedLatestPosition !== null && latestPosition !== null && loadedLatestPosition < latestPosition,
            nextAfterTurnPosition: loadedLatestPosition
          }
        };
      },
      async searchConversationTranscript(id, query, beforeTurnPosition) {
        const needle = query.trim();
        if (needle.length < 2) return { matches: [], nextBeforeTurnPosition: null, done: true };
        const turn = await get(
          `SELECT id, position, prompt FROM conversation_transcript_user_turns
           WHERE conversation_id = ? AND (? IS NULL OR position < ?)
           ORDER BY position DESC LIMIT 1`,
          [id, beforeTurnPosition ?? null, beforeTurnPosition ?? null]
        );
        if (!turn) return { matches: [], nextBeforeTurnPosition: null, done: true };
        const turnId = int(turn.id);
        const turnPosition = int(turn.position);
        const pattern = `%${escapeLike(needle.toLowerCase())}%`;
        const latest = await get(
          "SELECT MAX(position) AS position FROM conversation_transcript_user_turns WHERE conversation_id = ?",
          [id]
        );
        const isLatestTurn = intOrNull(latest?.position) === turnPosition ? 1 : 0;
        const [userEvent, eventRows, toolRows, todoRows] = await Promise.all([
          get(
            `SELECT 1 AS matched FROM conversation_transcript_events
             WHERE conversation_id = ? AND user_turn_id = ? AND kind = 'user_text' LIMIT 1`,
            [id, turnId]
          ),
          all(
            `SELECT id, kind, text FROM conversation_transcript_events
             WHERE conversation_id = ? AND user_turn_id = ? AND text IS NOT NULL
               AND lower(text) LIKE ? ESCAPE '\\'
               AND NOT (kind = 'tool_result' AND tool_call_id IS NOT NULL)
             ORDER BY id DESC LIMIT 100`,
            [id, turnId, pattern]
          ),
          all(
            `SELECT id, event_id, name, input_json, result_text FROM conversation_transcript_tool_calls
             WHERE conversation_id = ?
               AND (event_id IN (SELECT id FROM conversation_transcript_events WHERE conversation_id = ? AND user_turn_id = ?)
                 OR (event_id IS NULL AND ? = 1))
               AND lower(name || ' ' || coalesce(input_json, '') || ' ' || coalesce(result_text, '')) LIKE ? ESCAPE '\\'
             ORDER BY id DESC LIMIT 100`,
            [id, id, turnId, isLatestTurn, pattern]
          ),
          all(
            `SELECT tl.id AS list_id, todo.id, todo.content FROM conversation_transcript_todos todo
             JOIN conversation_transcript_todo_lists tl ON tl.id = todo.list_id AND tl.conversation_id = todo.conversation_id
             WHERE todo.conversation_id = ? AND tl.user_turn_id = ? AND lower(todo.content) LIKE ? ESCAPE '\\'
             ORDER BY todo.id DESC LIMIT 100`,
            [id, turnId, pattern]
          )
        ]);
        const todoMatches = todoRows.map((row) => ({
          key: `todos-${int(row.list_id)}`,
          label: "Tasks updated",
          excerpt: transcriptExcerpt(text(row.content), needle),
          turnPosition,
          focusEventId: null,
          focusToolCallId: null
        }));
        const toolMatches = toolRows.map((row) => ({
          key: `tool-${int(row.id)}`,
          label: "Tool",
          excerpt: transcriptExcerpt(
            `${text(row.name)} ${text(row.input_json)} ${text(row.result_text)}`.trim(),
            needle
          ),
          turnPosition,
          focusEventId: intOrNull(row.event_id),
          focusToolCallId: int(row.id)
        }));
        const eventMatches = eventRows.map((row) => ({
          key: `event-${int(row.id)}`,
          label: text(row.kind) === "user_text" ? "User" : text(row.kind) === "tool_result" ? "Tool result" : "Assistant",
          excerpt: transcriptExcerpt(text(row.text), needle),
          turnPosition,
          focusEventId: int(row.id),
          focusToolCallId: null
        }));
        const promptMatches = !userEvent && text(turn.prompt).toLowerCase().includes(needle.toLowerCase()) ? [
          {
            key: `turn-${turnId}-prompt`,
            label: "User",
            excerpt: transcriptExcerpt(text(turn.prompt), needle),
            turnPosition,
            focusEventId: null,
            focusToolCallId: null
          }
        ] : [];
        const previous = await get(
          `SELECT MAX(position) AS position FROM conversation_transcript_user_turns
           WHERE conversation_id = ? AND position < ?`,
          [id, turnPosition]
        );
        const hasPrevious = intOrNull(previous?.position) !== null;
        return {
          matches: [...todoMatches, ...toolMatches, ...eventMatches, ...promptMatches].slice(
            0,
            100
          ),
          nextBeforeTurnPosition: hasPrevious ? turnPosition : null,
          done: !hasPrevious
        };
      },
      async markConversationIdle(id) {
        const latest = await get(
          `SELECT MAX(position) AS position
           FROM conversation_transcript_user_turns
           WHERE conversation_id = ?`,
          [id]
        );
        await run(
          `UPDATE conversations
           SET state = 'idle',
               failure_reason = NULL,
               state_override_turn_position = ?
           WHERE id = ?`,
          [intOrNull(latest?.position) ?? -1, id]
        );
      },
      async dismissConversation(id) {
        const latest = await get(
          `SELECT MAX(position) AS position
           FROM conversation_transcript_user_turns
           WHERE conversation_id = ?`,
          [id]
        );
        await run(
          `UPDATE conversations
           SET state = 'inactive',
               failure_reason = NULL,
               state_override_turn_position = ?
           WHERE id = ?`,
          [intOrNull(latest?.position) ?? -1, id]
        );
      },
      async upsertConversationIngest(batch) {
        const acceptedConversationIds = /* @__PURE__ */ new Set();
        const transcriptsByConversationId = new Map(
          (batch.transcripts ?? []).map((transcript) => [transcript.conversationId, transcript])
        );
        for (const conversation of batch.conversations) {
          const incomingTranscript = transcriptsByConversationId.get(conversation.id);
          const latestUserTurnPosition = incomingTranscript ? Math.max(-1, ...incomingTranscript.userTurns.map((turn) => turn.position)) : intOrNull(
            (await get(
              `SELECT MAX(position) AS position
               FROM conversation_transcript_user_turns
               WHERE conversation_id = ?`,
              [conversation.id]
            ))?.position
          );
          const existing = await get(
            "SELECT state, state_override_turn_position, started_at, last_activity_ts FROM conversations WHERE id = ?",
            [conversation.id]
          );
          if (existing && !index.shouldReplaceConversationSnapshot(
            int(existing.last_activity_ts),
            conversation.lastActivityTs
          )) {
            if (intOrNull(existing.started_at) === null && conversation.startedAt !== void 0) {
              await run(
                "UPDATE conversations SET started_at = ? WHERE id = ? AND started_at IS NULL",
                [conversation.startedAt, conversation.id]
              );
            }
            continue;
          }
          acceptedConversationIds.add(conversation.id);
          const stateOverrideTurnPosition = intOrNull(existing?.state_override_turn_position);
          const overrideStillCurrent = stateOverrideTurnPosition !== null && (latestUserTurnPosition === null || latestUserTurnPosition <= stateOverrideTurnPosition);
          await run(
            `INSERT INTO conversations (
             id, ref, harness_id, project_id, workspace_location_id, title, preview,
             state, failure_reason, state_override_turn_position, activity_event_count,
             started_at, last_activity_ts
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (id) DO UPDATE SET ref=excluded.ref, harness_id=excluded.harness_id, project_id=excluded.project_id,
             workspace_location_id=excluded.workspace_location_id, title=excluded.title, preview=excluded.preview,
             state=excluded.state, failure_reason=excluded.failure_reason,
             state_override_turn_position=excluded.state_override_turn_position,
             activity_event_count=COALESCE(excluded.activity_event_count, conversations.activity_event_count),
             started_at=COALESCE(conversations.started_at, excluded.started_at),
             last_activity_ts=excluded.last_activity_ts`,
            [
              conversation.id,
              conversation.ref,
              conversation.harnessId,
              conversation.projectId,
              conversation.workspaceLocationId,
              conversation.title,
              conversation.preview,
              overrideStillCurrent ? text(existing?.state) : conversation.state,
              overrideStillCurrent ? null : conversation.failureReason ?? null,
              overrideStillCurrent ? stateOverrideTurnPosition : null,
              incomingTranscript?.activityEventCount ?? null,
              conversation.startedAt ?? null,
              conversation.lastActivityTs
            ]
          );
        }
        for (const transcript of batch.transcripts ?? []) {
          if (!acceptedConversationIds.has(transcript.conversationId)) continue;
          await run("DELETE FROM conversation_transcript_todos WHERE conversation_id = ?", [
            transcript.conversationId
          ]);
          await run("DELETE FROM conversation_transcript_todo_lists WHERE conversation_id = ?", [
            transcript.conversationId
          ]);
          await run("DELETE FROM conversation_transcript_tool_calls WHERE conversation_id = ?", [
            transcript.conversationId
          ]);
          await run("DELETE FROM conversation_transcript_events WHERE conversation_id = ?", [
            transcript.conversationId
          ]);
          await run("DELETE FROM conversation_transcript_user_turns WHERE conversation_id = ?", [
            transcript.conversationId
          ]);
          for (const turn of transcript.userTurns) {
            await run(
              `INSERT INTO conversation_transcript_user_turns (
               conversation_id, id, conversation_numeric_id, position, prompt, state, started_at, ended_at
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                transcript.conversationId,
                turn.id,
                turn.conversation_id,
                turn.position,
                turn.prompt,
                turn.state,
                turn.started_at,
                turn.ended_at
              ]
            );
          }
          for (const event of transcript.events) {
            await run(
              `INSERT INTO conversation_transcript_events (
               conversation_id, id, user_turn_id, position, kind, text, timestamp_ms, tool_call_id
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                transcript.conversationId,
                event.id,
                event.user_turn_id,
                event.position,
                event.kind,
                event.text,
                event.timestamp_ms,
                event.tool_call_id
              ]
            );
          }
          for (const toolCall of transcript.toolCalls) {
            await run(
              `INSERT INTO conversation_transcript_tool_calls (
               conversation_id, id, conversation_numeric_id, event_id, tool_use_id, name, input_json,
               result_text, is_error, started_at_ms, ended_at_ms
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                transcript.conversationId,
                toolCall.id,
                toolCall.conversation_id,
                toolCall.event_id,
                toolCall.tool_use_id,
                toolCall.name,
                toolCall.input_json,
                toolCall.result_text,
                toolCall.is_error,
                toolCall.started_at_ms,
                toolCall.ended_at_ms
              ]
            );
          }
          for (const { list, todos } of transcript.todoLists) {
            await run(
              `INSERT INTO conversation_transcript_todo_lists (
               conversation_id, id, conversation_numeric_id, user_turn_id, source_event_id, source,
               is_inferred, created_at, updated_at
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                transcript.conversationId,
                list.id,
                list.conversation_id,
                list.user_turn_id,
                list.source_event_id,
                list.source,
                list.is_inferred,
                list.created_at,
                list.updated_at
              ]
            );
            for (const todo of todos) {
              await run(
                `INSERT INTO conversation_transcript_todos (
                 conversation_id, id, list_id, position, content, state
               ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                  transcript.conversationId,
                  todo.id,
                  todo.list_id,
                  todo.position,
                  todo.content,
                  todo.state
                ]
              );
            }
          }
        }
      }
    },
    improve: {
      async listImproveSuggestions(filter) {
        const rows = filter?.status ? await all("SELECT * FROM improve_suggestions WHERE status = ?", [filter.status]) : await all("SELECT * FROM improve_suggestions");
        return rows.map(rowToImproveSuggestion);
      },
      async upsertSuggestion(suggestion) {
        const clusterIds = uniqueClusterIds([
          ...suggestion.clusterIds ?? [],
          suggestion.clusterId
        ]);
        const primaryClusterId = clusterIds[0] ?? suggestion.clusterId;
        await run(
          `INSERT INTO improve_suggestions (
             id, cluster_id, creator_agent_version_id, title, summary, feedback_reasons_json, status, evidence_count,
             change_json, operations_json, evidence_json, apply_result_json, snoozed_until,
             hidden_at, hidden_reason, hidden_until, last_shown_at, shown_count, created_at, updated_at
           )
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (id) DO UPDATE SET cluster_id=excluded.cluster_id,
             creator_agent_version_id=excluded.creator_agent_version_id,
             title=excluded.title, summary=excluded.summary,
             feedback_reasons_json=excluded.feedback_reasons_json,
             status=excluded.status, evidence_count=excluded.evidence_count, change_json=excluded.change_json,
             operations_json=excluded.operations_json, evidence_json=excluded.evidence_json, apply_result_json=excluded.apply_result_json,
             snoozed_until=excluded.snoozed_until,
             hidden_at=COALESCE(excluded.hidden_at, improve_suggestions.hidden_at),
             hidden_reason=COALESCE(excluded.hidden_reason, improve_suggestions.hidden_reason),
             hidden_until=COALESCE(excluded.hidden_until, improve_suggestions.hidden_until),
             last_shown_at=COALESCE(excluded.last_shown_at, improve_suggestions.last_shown_at),
             shown_count=CASE
               WHEN excluded.shown_count > 0 THEN excluded.shown_count
               ELSE improve_suggestions.shown_count
             END,
             updated_at=excluded.updated_at`,
          [
            suggestion.id,
            primaryClusterId,
            creatorAgentVersionId(suggestion),
            suggestion.title,
            suggestion.summary,
            JSON.stringify(suggestion.feedbackReasons ?? null),
            suggestion.status,
            suggestion.evidenceCount,
            JSON.stringify(suggestion.change ?? null),
            JSON.stringify(suggestion.operations ?? null),
            JSON.stringify(suggestion.evidence ?? null),
            JSON.stringify(suggestion.applyResult ?? null),
            suggestion.snoozedUntil ?? null,
            suggestion.hiddenAt ?? null,
            suggestion.hiddenReason ?? null,
            suggestion.hiddenUntil ?? null,
            suggestion.lastShownAt ?? null,
            suggestion.shownCount ?? 0,
            suggestion.createdAt,
            suggestion.updatedAt
          ]
        );
        await replaceImproveSuggestionClusters(suggestion.id, clusterIds);
      },
      async getSuggestion(id) {
        const row = await get("SELECT * FROM improve_suggestions WHERE id = ?", [id]);
        return row ? rowToImproveSuggestion(row) : null;
      },
      async listVisibleSuggestions(nowMs = Date.now()) {
        return (await all(
          `SELECT * FROM improve_suggestions
           WHERE ${VISIBLE_SUGGESTIONS_WHERE}
           ORDER BY updated_at DESC`,
          [nowMs, nowMs]
        )).map(rowToImproveSuggestion);
      },
      async listResolvedSuggestions(nowMs = Date.now()) {
        return (await all(
          `SELECT * FROM improve_suggestions
           WHERE ${RESOLVED_SUGGESTIONS_WHERE}
           ORDER BY updated_at DESC`,
          [nowMs, nowMs]
        )).map(rowToImproveSuggestion);
      },
      async listSuggestionsByCluster(clusterId, filter) {
        const creator = filter?.creatorAgentVersionId;
        const params = creator ? [String(clusterId), creator] : [String(clusterId)];
        const creatorClause = creator ? " AND s.creator_agent_version_id = ?" : "";
        return (await all(
          `SELECT DISTINCT s.*
           FROM improve_suggestions s
           JOIN improve_suggestion_clusters sc ON sc.suggestion_id = s.id
           WHERE sc.cluster_id = ?${creatorClause}
           ORDER BY s.updated_at DESC, s.id DESC`,
          params
        )).map(rowToImproveSuggestion);
      },
      async updateSuggestion(id, patch) {
        const sets = [];
        const params = [];
        const add = (column, value) => {
          if (value === void 0) return;
          sets.push(`${column} = ?`);
          params.push(value);
        };
        add("status", patch.status);
        add("snoozed_until", patch.snoozedUntil);
        add(
          "apply_result_json",
          patch.applyResult === void 0 ? void 0 : JSON.stringify(patch.applyResult ?? null)
        );
        add("title", patch.title);
        add("summary", patch.summary);
        add(
          "feedback_reasons_json",
          patch.feedbackReasons === void 0 ? void 0 : JSON.stringify(patch.feedbackReasons ?? null)
        );
        add(
          "change_json",
          patch.change === void 0 ? void 0 : JSON.stringify(patch.change ?? null)
        );
        add(
          "operations_json",
          patch.operations === void 0 ? void 0 : JSON.stringify(patch.operations ?? null)
        );
        add(
          "evidence_json",
          patch.evidence === void 0 ? void 0 : JSON.stringify(patch.evidence ?? null)
        );
        add("hidden_at", patch.hiddenAt);
        add("hidden_reason", patch.hiddenReason);
        add("hidden_until", patch.hiddenUntil);
        if (patch.clusterIds !== void 0) {
          const [primaryClusterId] = uniqueClusterIds(patch.clusterIds);
          if (primaryClusterId) add("cluster_id", primaryClusterId);
        }
        sets.push("updated_at = ?");
        params.push(Date.now(), id);
        await run(`UPDATE improve_suggestions SET ${sets.join(", ")} WHERE id = ?`, params);
        if (patch.clusterIds !== void 0) {
          await replaceImproveSuggestionClusters(id, patch.clusterIds);
        }
      },
      async hideSuggestion(id, reason, hiddenUntil = null) {
        const nowMs = Date.now();
        await run(
          `UPDATE improve_suggestions
           SET hidden_at = ?, hidden_reason = ?, hidden_until = ?, updated_at = ?
           WHERE id = ?`,
          [nowMs, reason, hiddenUntil, nowMs, id]
        );
      },
      async replaceSuggestionClusters(suggestionId, clusterIds) {
        await replaceImproveSuggestionClusters(suggestionId, clusterIds);
      },
      async listSuggestionClusters(suggestionId) {
        return listImproveSuggestionClusters(suggestionId);
      },
      async getSuggestionClusterIds(suggestionId) {
        return (await listImproveSuggestionClusters(suggestionId)).map((row) => row.cluster_id);
      },
      async insertSuggestionFeedbackEvent(input) {
        const createdAt = input.createdAt ?? Date.now();
        const eventId = input.type === "suggestion_shown_not_applied" ? `suggestion-${input.suggestionId}-${input.type}-${createdAt}` : `suggestion-${input.suggestionId}-${input.type}`;
        const existing = await get(
          "SELECT event_id FROM improve_suggestion_feedback_events WHERE event_id = ?",
          [eventId]
        );
        if (existing) return;
        await run(
          `INSERT INTO improve_suggestion_feedback_events (
             event_id, suggestion_id, agent_version_id, type, metadata_json, created_at
           ) VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT (event_id) DO NOTHING`,
          [
            eventId,
            input.suggestionId,
            input.agentVersionId,
            input.type,
            input.metadataJson || "{}",
            createdAt
          ]
        );
        if (input.type === "suggestion_shown_not_applied") {
          await run(
            `UPDATE improve_suggestions
             SET last_shown_at = ?, shown_count = shown_count + 1
             WHERE id = ?`,
            [createdAt, input.suggestionId]
          );
        }
      },
      async listSuggestionFeedbackEvents(suggestionId, limit = 20) {
        return (await all(
          `SELECT * FROM improve_suggestion_feedback_events
           WHERE suggestion_id = ?
           ORDER BY created_at DESC
           LIMIT ?`,
          [suggestionId, Math.max(1, Math.min(100, Math.floor(limit)))]
        )).map(rowToSuggestionFeedbackEvent);
      },
      async recordRun(runRecord) {
        await run(
          `INSERT INTO improve_runs (id, conversation_id, harness_id, processing_provider, model_provider, model, status, stage, task_type, project_path, created_at, finished_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (id) DO UPDATE SET status=excluded.status, stage=excluded.stage,
             processing_provider=COALESCE(excluded.processing_provider, improve_runs.processing_provider),
             model_provider=COALESCE(excluded.model_provider, improve_runs.model_provider),
             model=COALESCE(excluded.model, improve_runs.model),
             task_type=COALESCE(excluded.task_type, improve_runs.task_type),
             project_path=COALESCE(excluded.project_path, improve_runs.project_path),
             finished_at=excluded.finished_at`,
          [
            runRecord.id,
            runRecord.conversationId,
            runRecord.harnessId,
            runRecord.processingProvider ?? null,
            runRecord.modelProvider ?? null,
            runRecord.model ?? null,
            runRecord.status,
            runRecord.stage,
            runRecord.taskType ?? null,
            runRecord.projectPath ?? null,
            runRecord.createdAt,
            runRecord.finishedAt
          ]
        );
      },
      async listRuns(limit, offset = 0) {
        const sqlText = "SELECT * FROM improve_runs ORDER BY created_at DESC" + (typeof limit === "number" ? " LIMIT ? OFFSET ?" : offset > 0 ? " LIMIT -1 OFFSET ?" : "");
        const params = typeof limit === "number" ? [limit, offset] : offset > 0 ? [offset] : [];
        const rows = await all(sqlText, params);
        return rows.map((row) => ({
          id: text(row.id),
          conversationId: text(row.conversation_id),
          harnessId: text(row.harness_id),
          processingProvider: row.processing_provider === "cloud" ? "cloud" : row.processing_provider === "local-plans" ? "local-plans" : null,
          modelProvider: textOrNull(row.model_provider),
          model: textOrNull(row.model),
          status: text(row.status),
          stage: textOrNull(row.stage),
          taskType: textOrNull(row.task_type),
          projectPath: textOrNull(row.project_path),
          createdAt: int(row.created_at),
          finishedAt: intOrNull(row.finished_at)
        }));
      },
      async insertSignal(input) {
        const projection = improveSearchProjection(
          input.normalizedKey,
          input.summary,
          input.tagsJson
        );
        const maxRow = await get("SELECT COALESCE(MAX(id), 0) AS max_id FROM improve_signals");
        const id = (maxRow ? int(maxRow.max_id) : 0) + 1;
        const createdAt = input.createdAt ?? Date.now();
        await run(
          `INSERT INTO improve_signals (
             id, schema_version, run_id, conversation_id, creator_agent_version_id, type, kind, normalized_key, summary,
             evidence_json, setup_refs_json, setup_mismatch_json, scope, observed_harness,
             harness_applicability_json, pain_score, confidence, tags_json, created_at, search_text, search_tags
           ) VALUES (?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            id,
            input.runId,
            input.conversationId,
            creatorAgentVersionId(input),
            input.signalType ?? null,
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
            input.tagsJson ?? "[]",
            createdAt,
            projection.text,
            projection.tags
          ]
        );
        const row = await get("SELECT * FROM improve_signals WHERE id = ?", [id]);
        if (!row) throw new Error("insertSignal: row not found after write");
        return rowToImproveSignal(row);
      },
      async listSignalsByRun(runId) {
        return (await all("SELECT * FROM improve_signals WHERE run_id = ? ORDER BY id ASC", [runId])).map(rowToImproveSignal);
      },
      async listSignalsByConversation(conversationId) {
        return (await all("SELECT * FROM improve_signals WHERE conversation_id = ? ORDER BY id ASC", [
          conversationId
        ])).map(rowToImproveSignal);
      },
      async searchSignals(query) {
        await run(
          "CREATE INDEX IF NOT EXISTS idx_improve_signals_missing_search ON improve_signals (creator_agent_version_id, id) WHERE search_text IS NULL",
          []
        );
        for (; ; ) {
          const missing = await all(
            `SELECT id, normalized_key, summary, tags_json FROM improve_signals WHERE search_text IS NULL${query.creatorAgentVersionId ? " AND creator_agent_version_id = ?" : ""} ORDER BY id LIMIT 100`,
            query.creatorAgentVersionId ? [query.creatorAgentVersionId] : []
          );
          if (!missing.length) break;
          const batch = improveSearchBackfill(
            missing.map((row) => ({
              id: int(row.id),
              key: text(row.normalized_key),
              summary: text(row.summary),
              tags: text(row.tags_json)
            }))
          );
          await run(`UPDATE improve_signals ${batch.update}`, batch.params);
        }
        const { where, params } = improveSearchWhere(query);
        return (await all(
          `SELECT * FROM improve_signals${where} ORDER BY created_at DESC, id DESC LIMIT ?`,
          [...params, Math.max(0, Math.trunc(query.limit))]
        )).map(rowToImproveSignal);
      },
      async getSignalsByIds(ids, filter) {
        if (!ids.length) return [];
        const creator = filter?.creatorAgentVersionId;
        const selected = [...new Set(ids)];
        const rows = [];
        for (let offset = 0; offset < selected.length; offset += 500) {
          const batch = selected.slice(offset, offset + 500);
          rows.push(
            ...(await all(
              `SELECT * FROM improve_signals WHERE id IN (${batch.map(() => "?").join(",")})${creator ? " AND creator_agent_version_id = ?" : ""}`,
              creator ? [...batch, creator] : batch
            )).map(rowToImproveSignal)
          );
        }
        return rows.sort((a, b) => b.created_at - a.created_at || b.id - a.id);
      },
      async listRecentSignals(limit = 50, filter) {
        const creator = filter?.creatorAgentVersionId;
        return (await all(
          `SELECT * FROM improve_signals
           ${creator ? "WHERE creator_agent_version_id = ?" : ""}
           ORDER BY created_at DESC, id DESC LIMIT ?`,
          creator ? [creator, limit] : [limit]
        )).map(rowToImproveSignal);
      },
      async listSignalsByNormalizedKey(normalizedKey, filter) {
        const creator = filter?.creatorAgentVersionId;
        return (await all(
          `SELECT * FROM improve_signals
             WHERE normalized_key = ?
             ${creator ? "AND creator_agent_version_id = ?" : ""}
             ORDER BY created_at DESC, id DESC`,
          creator ? [normalizedKey, creator] : [normalizedKey]
        )).map(rowToImproveSignal);
      },
      async searchSignalClusters(query) {
        await run(
          "CREATE INDEX IF NOT EXISTS idx_improve_clusters_missing_search ON improve_signal_clusters (creator_agent_version_id, id) WHERE search_text IS NULL",
          []
        );
        for (; ; ) {
          const missing = await all(
            `SELECT id, normalized_key, canonical_summary, tags_json FROM improve_signal_clusters WHERE search_text IS NULL${query.creatorAgentVersionId ? " AND creator_agent_version_id = ?" : ""} ORDER BY id LIMIT 100`,
            query.creatorAgentVersionId ? [query.creatorAgentVersionId] : []
          );
          if (!missing.length) break;
          const batch = improveClusterBackfill(
            missing.map((row) => ({
              id: int(row.id),
              key: text(row.normalized_key),
              summary: text(row.canonical_summary),
              tags: text(row.tags_json)
            }))
          );
          await run(`UPDATE improve_signal_clusters ${batch.update}`, batch.params);
        }
        const { where, params } = improveSearchWhere(query);
        const eligibility = [
          where.slice(7),
          ...query.status ? ["status = ?"] : [],
          ...query.candidates ? ["status IN ('open', 'promoted')"] : []
        ].filter(Boolean);
        if (query.status) params.push(query.status);
        const rank = improveClusterRanking(query, sql.dialect);
        return (await all(
          `${rank.cte || "WITH"} ranked AS (SELECT *, ${rank.score} AS candidate_score FROM improve_signal_clusters${eligibility.length ? " WHERE " + eligibility.join(" AND ") : ""})
          SELECT * FROM ranked ${query.candidates ? "WHERE candidate_score > 0" : ""} ORDER BY candidate_score DESC, last_seen_at DESC, id ASC LIMIT ?`,
          [...rank.params, ...params, Math.max(0, Math.trunc(query.limit))]
        )).map(rowToImproveSignalCluster);
      },
      async listSignalClusters(status, filter) {
        const clauses = [];
        const params = [];
        if (status) {
          clauses.push("status = ?");
          params.push(status);
        }
        if (filter?.creatorAgentVersionId) {
          clauses.push("creator_agent_version_id = ?");
          params.push(filter.creatorAgentVersionId);
        }
        const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
        const rows = await all(
          `SELECT * FROM improve_signal_clusters${where} ORDER BY id ASC`,
          params
        );
        return rows.map(rowToImproveSignalCluster);
      },
      async getSignalCluster(id, filter) {
        const row = filter?.creatorAgentVersionId ? await get(
          "SELECT * FROM improve_signal_clusters WHERE id = ? AND creator_agent_version_id = ?",
          [id, filter.creatorAgentVersionId]
        ) : await get("SELECT * FROM improve_signal_clusters WHERE id = ?", [id]);
        return row ? rowToImproveSignalCluster(row) : null;
      },
      async listSignalClustersByNormalizedKey(normalizedKey, filter) {
        const creator = filter?.creatorAgentVersionId;
        return (await all(
          `SELECT * FROM improve_signal_clusters
           WHERE normalized_key = ?${creator ? " AND creator_agent_version_id = ?" : ""}
           ORDER BY id ASC`,
          creator ? [normalizedKey, creator] : [normalizedKey]
        )).map(rowToImproveSignalCluster);
      },
      async createSignalCluster(input) {
        const projection = improveClusterProjection(
          input.normalizedKey,
          input.canonicalSummary,
          input.tagsJson
        );
        const maxRow = await get(
          "SELECT COALESCE(MAX(id), 0) AS max_id FROM improve_signal_clusters"
        );
        const id = (maxRow ? int(maxRow.max_id) : 0) + 1;
        const nowMs = Date.now();
        await run(
          `INSERT INTO improve_signal_clusters (
             id, schema_version, creator_agent_version_id, normalized_key, canonical_summary, status, signal_count,
             conversation_count, project_count, harnesses_json, tags_json, high_pain_conversation_count,
             dismissed_count, first_seen_at, last_seen_at, promoted_at, search_text, search_tags, search_tokens
           ) VALUES (?, 1, ?, ?, ?, ?, 0, 0, 0, '[]', ?, 0, 0, ?, ?, NULL, ?, ?, ?)`,
          [
            id,
            creatorAgentVersionId(input),
            input.normalizedKey,
            input.canonicalSummary,
            input.status ?? "open",
            input.tagsJson ?? "[]",
            nowMs,
            nowMs,
            projection.text,
            projection.tags,
            projection.tokens
          ]
        );
        const row = await get("SELECT * FROM improve_signal_clusters WHERE id = ?", [id]);
        if (!row) throw new Error("createSignalCluster: row not found after write");
        return rowToImproveSignalCluster(row);
      },
      async addSignalClusterMember(clusterId, signalId, matchReason) {
        const ownership = await get(
          `SELECT c.creator_agent_version_id AS cluster_creator,
                  s.creator_agent_version_id AS signal_creator
           FROM improve_signal_clusters c
           JOIN improve_signals s ON s.id = ?
           WHERE c.id = ?`,
          [signalId, clusterId]
        );
        if (!ownership) throw new Error(`Cluster ${clusterId} or signal ${signalId} not found`);
        if (text(ownership.cluster_creator) !== text(ownership.signal_creator)) {
          throw new Error(
            "Cannot assign a signal to a cluster created by a different agent version"
          );
        }
        await run(
          `INSERT INTO improve_signal_cluster_members (cluster_id, signal_id, match_reason, created_at)
           VALUES (?, ?, ?, ?)
           ON CONFLICT (cluster_id, signal_id) DO UPDATE SET match_reason=excluded.match_reason`,
          [clusterId, signalId, matchReason, Date.now()]
        );
      },
      async recomputeSignalClusterStats(clusterId, highPainScore) {
        const rows = (await all(
          `SELECT s.*
           FROM improve_signals s
           JOIN improve_signal_cluster_members m ON m.signal_id = s.id
           WHERE m.cluster_id = ?
           ORDER BY s.id ASC`,
          [clusterId]
        )).map(rowToImproveSignal);
        const conversations = new Set(rows.map((row) => row.conversation_id));
        const highPainConversations = new Set(
          rows.filter((row) => row.pain_score >= highPainScore).map((row) => row.conversation_id)
        );
        const harnesses = [...new Set(rows.map((row) => row.observed_harness))].sort();
        const firstSeen = rows.length ? Math.min(...rows.map((row) => row.created_at)) : Date.now();
        const lastSeen = rows.length ? Math.max(...rows.map((row) => row.created_at)) : firstSeen;
        await run(
          `UPDATE improve_signal_clusters
           SET signal_count = ?,
               conversation_count = ?,
               project_count = ?,
               harnesses_json = ?,
               high_pain_conversation_count = ?,
               first_seen_at = ?,
               last_seen_at = ?
           WHERE id = ?`,
          [
            rows.length,
            conversations.size,
            0,
            JSON.stringify(harnesses),
            highPainConversations.size,
            firstSeen,
            lastSeen,
            clusterId
          ]
        );
      },
      async listClusterMemberSignals(clusterId, filter) {
        const creator = filter?.creatorAgentVersionId;
        return (await all(
          `SELECT s.*
           FROM improve_signals s
           JOIN improve_signal_cluster_members m ON m.signal_id = s.id
           WHERE m.cluster_id = ?${creator ? " AND s.creator_agent_version_id = ?" : ""}
           ORDER BY s.id ASC`,
          creator ? [clusterId, creator] : [clusterId]
        )).map(rowToImproveSignal);
      },
      async listClustersTouchedByRun(runId) {
        return (await all(
          `SELECT DISTINCT c.*
           FROM improve_signal_clusters c
           JOIN improve_signal_cluster_members m ON m.cluster_id = c.id
           JOIN improve_signals s ON s.id = m.signal_id
           WHERE s.run_id = ?
           ORDER BY c.id ASC`,
          [runId]
        )).map(rowToImproveSignalCluster);
      },
      async setSignalClusterStatus(id, status, promotedAt = null) {
        await run("UPDATE improve_signal_clusters SET status = ?, promoted_at = ? WHERE id = ?", [
          status,
          promotedAt,
          id
        ]);
      },
      async incrementSignalClusterDismissed(id) {
        await run(
          "UPDATE improve_signal_clusters SET dismissed_count = dismissed_count + 1 WHERE id = ?",
          [id]
        );
      },
      async decrementSignalClusterDismissed(id) {
        const row = await get("SELECT dismissed_count FROM improve_signal_clusters WHERE id = ?", [
          id
        ]);
        if (!row) return;
        await run("UPDATE improve_signal_clusters SET dismissed_count = ? WHERE id = ?", [
          Math.max(0, int(row.dismissed_count) - 1),
          id
        ]);
      },
      async insertSignalClusterDuplicateCandidate(input) {
        const maxRow = await get(
          "SELECT COALESCE(MAX(id), 0) AS max_id FROM improve_signal_cluster_duplicate_candidates"
        );
        const id = (maxRow ? int(maxRow.max_id) : 0) + 1;
        await run(
          `INSERT INTO improve_signal_cluster_duplicate_candidates (
             id, cluster_ids_json, reason, confidence, status, created_at
           ) VALUES (?, ?, ?, ?, 'open', ?)`,
          [
            id,
            JSON.stringify(input.clusterIds),
            input.reason,
            input.confidence,
            input.createdAt ?? Date.now()
          ]
        );
      },
      async listSignalClusterDuplicateCandidates() {
        return (await all("SELECT * FROM improve_signal_cluster_duplicate_candidates ORDER BY id ASC")).map(rowToImproveDuplicateCandidate);
      },
      async markConversationReadByAgent(input) {
        const readAt = input.readAt ?? Date.now();
        await run(
          `INSERT INTO improve_agent_conversation_reads (
             conversation_id, agent_version_id, transcript_hash, conversation_activity_ts,
             last_processed_message_position, read_at, read_count
           ) VALUES (?, ?, ?, ?, ?, ?, 1)
           ON CONFLICT (conversation_id, agent_version_id) DO UPDATE SET
             transcript_hash = excluded.transcript_hash,
             conversation_activity_ts = excluded.conversation_activity_ts,
             last_processed_message_position = excluded.last_processed_message_position,
             read_at = excluded.read_at,
             read_count = improve_agent_conversation_reads.read_count + 1`,
          [
            input.conversationId,
            input.agentVersionId,
            input.transcriptHash ?? null,
            input.conversationActivityTs,
            input.lastProcessedMessagePosition ?? null,
            readAt
          ]
        );
      },
      async getConversationReadByAgent(conversationId, agentVersionId) {
        const row = await get(
          `SELECT * FROM improve_agent_conversation_reads
           WHERE conversation_id = ? AND agent_version_id = ?`,
          [conversationId, agentVersionId]
        );
        return row ? rowToConversationRead(row) : null;
      },
      async countConversationReadsByAgent(agentVersionId) {
        const row = agentVersionId ? await get(
          `SELECT COUNT(DISTINCT conversation_id) AS count
               FROM improve_agent_conversation_reads
               WHERE agent_version_id = ?`,
          [agentVersionId]
        ) : await get(
          `SELECT COUNT(DISTINCT conversation_id) AS count
               FROM improve_agent_conversation_reads`
        );
        return row ? int(row.count) : 0;
      },
      async conversationNeedsAgentRead(conversationId, agentVersionId, conversationActivityTs, latestMessagePosition) {
        const row = await get(
          `SELECT conversation_activity_ts, last_processed_message_position
           FROM improve_agent_conversation_reads
           WHERE conversation_id = ? AND agent_version_id = ?`,
          [conversationId, agentVersionId]
        );
        if (!row) return true;
        return latestMessagePosition != null && (intOrNull(row.last_processed_message_position) ?? -1) < latestMessagePosition || int(row.conversation_activity_ts) < conversationActivityTs;
      },
      async getProjectAudit(projectPath, agentVersionId) {
        const row = await get(
          `SELECT * FROM improve_project_audits
           WHERE project_path = ? AND agent_version_id = ?`,
          [projectPath, agentVersionId]
        );
        return row ? rowToProjectAudit(row) : null;
      },
      async listProjectAudits(agentVersionId) {
        return (await all(
          `SELECT * FROM improve_project_audits
             WHERE agent_version_id = ?
             ORDER BY last_run_at DESC`,
          [agentVersionId]
        )).map(rowToProjectAudit);
      },
      async upsertProjectAudit(input) {
        const lastRunAt = input.lastRunAt ?? Date.now();
        await run(
          `INSERT INTO improve_project_audits (
             project_path, agent_version_id, setup_state_hash,
             conversations_seen_count, last_run_id, last_run_at, audit_count
           ) VALUES (?, ?, ?, ?, ?, ?, 1)
           ON CONFLICT (project_path, agent_version_id) DO UPDATE SET
             setup_state_hash = excluded.setup_state_hash,
             conversations_seen_count = excluded.conversations_seen_count,
             last_run_id = excluded.last_run_id,
             last_run_at = excluded.last_run_at,
             audit_count = improve_project_audits.audit_count + 1`,
          [
            input.projectPath,
            input.agentVersionId,
            input.setupStateHash,
            input.conversationsSeenCount,
            input.lastRunId ?? null,
            lastRunAt
          ]
        );
      }
    },
    wrapped: createSqlWrappedStore({ run, get, all }),
    signalAnalytics: {
      async listTurns() {
        return (await all(
          `WITH processed_conversations AS (
               SELECT conversation_id, MAX(finished_at) AS processed_through
               FROM improve_runs
               WHERE status = 'succeeded' AND stage = 'done' AND finished_at IS NOT NULL
               GROUP BY conversation_id
             )
             SELECT turns.conversation_id, turns.position,
               COALESCE(turns.started_at, turns.ended_at) AS occurred_at
             FROM conversation_transcript_user_turns AS turns
             JOIN processed_conversations AS processed
               ON processed.conversation_id = turns.conversation_id
             WHERE COALESCE(turns.started_at, turns.ended_at) IS NULL
                OR COALESCE(turns.started_at, turns.ended_at) <= processed.processed_through`
        )).map((row) => ({
          conversationId: text(row.conversation_id),
          position: int(row.position),
          occurredAt: intOrNull(row.occurred_at)
        }));
      },
      async listSignals() {
        return (await all(
          `SELECT id, conversation_id, type, evidence_json, created_at
             FROM improve_signals
             WHERE type IN (?, ?, ?)`,
          ["correction", "steering", "frustration"]
        )).flatMap((row) => {
          const type = signalAnalyticsType(row.type);
          return type ? [
            {
              id: text(row.id),
              conversationId: text(row.conversation_id),
              type,
              evidenceJson: text(row.evidence_json),
              createdAt: int(row.created_at)
            }
          ] : [];
        });
      },
      async listAuditCheckEvents() {
        const events = [];
        const append = (rows, type) => {
          for (const row of rows) {
            const identity2 = auditTagIdentity(row.tags_json);
            const createdAt = intOrNull(row.created_at);
            if (!identity2 || createdAt === null) continue;
            events.push({ ...identity2, type, createdAt });
          }
        };
        append(
          await all(
            `SELECT tags_json, created_at
             FROM improve_signals
             WHERE normalized_key LIKE 'audit:%'`
          ),
          "found"
        );
        append(
          await all(
            `SELECT tags_json, promoted_at AS created_at
             FROM improve_signal_clusters
             WHERE promoted_at IS NOT NULL`
          ),
          "promoted"
        );
        append(
          await all(
            `SELECT DISTINCT suggestions.id, clusters.tags_json,
                    suggestions.created_at AS created_at
             FROM improve_suggestions AS suggestions
             JOIN improve_suggestion_clusters AS links
               ON links.suggestion_id = suggestions.id
             JOIN improve_signal_clusters AS clusters
               ON CAST(clusters.id AS TEXT) = links.cluster_id`
          ),
          "suggested"
        );
        const feedbackRows = await all(
          `SELECT DISTINCT feedback.event_id, feedback.type, feedback.created_at,
                  clusters.tags_json
           FROM improve_suggestion_feedback_events AS feedback
           JOIN improve_suggestion_clusters AS links
             ON links.suggestion_id = feedback.suggestion_id
           JOIN improve_signal_clusters AS clusters
             ON CAST(clusters.id AS TEXT) = links.cluster_id
           WHERE feedback.type IN ('suggestion_applied', 'suggestion_dismissed')`
        );
        append(
          feedbackRows.filter((row) => text(row.type) === "suggestion_applied"),
          "applied"
        );
        append(
          feedbackRows.filter((row) => text(row.type) === "suggestion_dismissed"),
          "dismissed"
        );
        return events;
      }
    },
    usage: {
      async getLatest(harnessId) {
        const row = await get("SELECT * FROM usage_snapshots WHERE harness_id = ?", [harnessId]);
        return row ? {
          harnessId: text(row.harness_id),
          fetchedAt: int(row.fetched_at),
          payload: json(row.payload)
        } : null;
      },
      async put(snapshot) {
        await run(
          `INSERT INTO usage_snapshots (harness_id, fetched_at, payload) VALUES (?, ?, ?)
           ON CONFLICT (harness_id) DO UPDATE SET fetched_at=excluded.fetched_at, payload=excluded.payload`,
          [snapshot.harnessId, snapshot.fetchedAt, JSON.stringify(snapshot.payload ?? null)]
        );
      },
      async insertAppUsageInterval(interval) {
        for (let attempt = 0; attempt < APP_USAGE_INTERVAL_INSERT_ATTEMPTS; attempt++) {
          const idRow = await get(ALLOCATE_APP_USAGE_INTERVAL_ID_SQL);
          if (!idRow) throw new Error("failed to allocate app usage interval id");
          const id = int(idRow.next_id);
          const inserted = await get(
            `INSERT INTO app_usage_intervals (
              id,
              started_at_ms,
              ended_at_ms,
              process_running_seconds,
              window_visible_seconds,
              window_visible_pinned_seconds,
              window_visible_pinned_expanded_seconds,
              window_visible_regular_expanded_seconds,
              week_start,
              local_day_of_week,
              local_hour,
              timezone,
              created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT (id) DO NOTHING
             RETURNING id`,
            [
              id,
              interval.started_at_ms,
              interval.ended_at_ms,
              interval.process_running_seconds,
              interval.window_visible_seconds,
              interval.window_visible_pinned_seconds,
              interval.window_visible_pinned_expanded_seconds,
              interval.window_visible_regular_expanded_seconds,
              interval.week_start,
              interval.local_day_of_week,
              interval.local_hour,
              interval.timezone,
              interval.created_at
            ]
          );
          if (inserted) return;
          await run(RESYNC_APP_USAGE_INTERVAL_IDS_SQL, []);
        }
        throw new Error("failed to insert app usage interval after unique-id retries");
      },
      async listUnsentAppUsageIntervals(limit = 100) {
        return (await all(
          `SELECT *
           FROM app_usage_intervals
           WHERE sent_at_ms IS NULL
           ORDER BY created_at ASC
           LIMIT ?`,
          [limit]
        )).map(rowToAppUsageInterval);
      },
      async markAppUsageIntervalSent(id, sentAtMs) {
        await run(
          "UPDATE app_usage_intervals SET sent_at_ms = ? WHERE id = ? AND sent_at_ms IS NULL",
          [sentAtMs, id]
        );
      },
      async sumAppUsageProcessRunningSeconds() {
        const row = await get(
          "SELECT COALESCE(SUM(process_running_seconds), 0) AS seconds FROM app_usage_intervals"
        );
        return row ? int(row.seconds) : 0;
      }
    },
    harnesses: {
      async listHarnesses() {
        return (await all("SELECT * FROM harnesses")).map((row) => ({
          harnessId: text(row.harness_id),
          label: text(row.label),
          available: int(row.available) === 1
        }));
      },
      async upsertHarness(descriptor) {
        await run(
          `INSERT INTO harnesses (harness_id, label, available) VALUES (?, ?, ?)
           ON CONFLICT (harness_id) DO UPDATE SET label=excluded.label, available=excluded.available`,
          [descriptor.harnessId, descriptor.label, descriptor.available ? 1 : 0]
        );
      }
    },
    sessions: {
      async createSession(session) {
        await run(
          `INSERT INTO sessions (id, status, runtime, project_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT (id) DO UPDATE SET status=excluded.status, runtime=excluded.runtime, project_id=excluded.project_id,
             created_at=excluded.created_at, expires_at=excluded.expires_at`,
          [
            session.id,
            session.status,
            session.runtime,
            session.projectId,
            session.createdAt,
            session.expiresAt
          ]
        );
      },
      async getSession(id) {
        const row = await get("SELECT * FROM sessions WHERE id = ?", [id]);
        return row ? {
          id: text(row.id),
          status: text(row.status),
          runtime: text(row.runtime),
          projectId: text(row.project_id),
          createdAt: int(row.created_at),
          expiresAt: intOrNull(row.expires_at)
        } : null;
      },
      async listSessions() {
        return (await all("SELECT * FROM sessions")).map((row) => ({
          id: text(row.id),
          status: text(row.status),
          runtime: text(row.runtime),
          projectId: text(row.project_id),
          createdAt: int(row.created_at),
          expiresAt: intOrNull(row.expires_at)
        }));
      },
      async updateSessionStatus(id, status) {
        await run("UPDATE sessions SET status = ? WHERE id = ?", [status, id]);
      },
      async deleteSession(id) {
        await run("DELETE FROM sessions WHERE id = ?", [id]);
      }
    }
  };
}
function createSqlStorage(sql, options = {}) {
  return createSqlStorageBundle(sql, options, true);
}
function createReadOnlySqlSourceCursorStore(sql) {
  const { getSourceCursor } = createSqlStorageBundle(sql, {}, false).sourceCursors;
  return { getSourceCursor };
}
const INSIGHTS_SCHEMA_VERSION = 1;
exports.DEFAULT_TRANSCRIPT_EVENTS_PER_TURN = DEFAULT_TRANSCRIPT_EVENTS_PER_TURN;
exports.DESKTOP_MENU_BAR_SNAPSHOT_TEXT_MAX_CHARS = DESKTOP_MENU_BAR_SNAPSHOT_TEXT_MAX_CHARS;
exports.INSIGHTS_SCHEMA_VERSION = INSIGHTS_SCHEMA_VERSION;
exports.RESOLVED_SUGGESTIONS_WHERE = RESOLVED_SUGGESTIONS_WHERE;
exports.SCHEMA = SCHEMA;
exports.UNATTRIBUTED_TRANSCRIPT_TOOL_CALL_LIMIT = UNATTRIBUTED_TRANSCRIPT_TOOL_CALL_LIMIT;
exports.VISIBLE_SUGGESTIONS_WHERE = VISIBLE_SUGGESTIONS_WHERE;
exports.countConfirmedWrappedPullRequestMerges = countConfirmedWrappedPullRequestMerges;
exports.createReadOnlySqlSourceCursorStore = createReadOnlySqlSourceCursorStore;
exports.createSqlStorage = createSqlStorage;
exports.createSqlWrappedStore = createSqlWrappedStore;
exports.eventsForTurnsCappedSql = eventsForTurnsCappedSql;
exports.improveCandidateScore = improveCandidateScore;
exports.improveCandidateWeights = improveCandidateWeights;
exports.improveSearchBackfill = improveSearchBackfill;
exports.improveSearchProjection = improveSearchProjection;
exports.improveSearchWhere = improveSearchWhere;
exports.int = int;
exports.intOrNull = intOrNull;
exports.isRecord = isRecord;
exports.json = json;
exports.normalizeProjectResolutionPath = normalizeProjectResolutionPath;
exports.projectResolutionPathContains = projectResolutionPathContains;
exports.text = text;
exports.textOrNull = textOrNull;
//# sourceMappingURL=insights-CJUxz2Be.js.map

//# debugId=76db114b-580b-5912-958a-05647eec140d
