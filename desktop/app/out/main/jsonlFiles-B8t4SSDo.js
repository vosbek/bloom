"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8f04fb94-25a9-5f32-9dc7-695a27a6f944")}catch(e){}}();

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const index = require("./index-UFoqNX7c.js");
const desktopSearch = require("./desktopSearch-UUzZxN96.js");
const fs = require("node:fs");
const _n = require("node:path");
const MAX_TRANSCRIPT_TEXT_CHARS = 2e5;
const TRUNCATED_TEXT_SUFFIX = "\n[truncated]";
function stripCursorXml(text) {
  if (!text || !text.includes("<")) return text;
  const match = text.match(/<user_query[^>]*>([\s\S]*?)<\/user_query>/i);
  if (match) return collapse(match[1]);
  const noisyTags = [
    "timestamp",
    "context",
    "additional_context",
    "editor_state",
    "open_files",
    "file_content",
    "attached_files",
    "codebase_context",
    "environment",
    "cursor_rules"
  ];
  let out = text;
  for (const tag of noisyTags) {
    const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, "gi");
    out = out.replace(re, "");
  }
  out = out.replace(/<\/?[a-zA-Z_][^>]*>/g, "");
  return collapse(out);
}
function truncateTranscriptText(value, maxChars = MAX_TRANSCRIPT_TEXT_CHARS) {
  if (!value || value.length <= maxChars) return value;
  if (maxChars <= TRUNCATED_TEXT_SUFFIX.length) return TRUNCATED_TEXT_SUFFIX.slice(0, maxChars);
  const keep = Math.max(0, maxChars - TRUNCATED_TEXT_SUFFIX.length);
  return value.slice(0, keep).trimEnd() + TRUNCATED_TEXT_SUFFIX;
}
function extractText(content, maxChars = MAX_TRANSCRIPT_TEXT_CHARS) {
  if (typeof content === "string") return truncateTranscriptText(content, maxChars);
  if (!Array.isArray(content)) return "";
  const parts = [];
  const state = { chars: 0 };
  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const b = block;
    const type = typeof b.type === "string" ? b.type : "";
    if (type === "thinking" && typeof b.thinking === "string") {
      pushTextPart(parts, `[thinking] ${b.thinking}`, state, maxChars);
    } else if (type === "tool_use" || type === "toolCall" || type === "tool_call" || type === "function_call") {
      pushTextPart(parts, `[tool: ${String(b.name ?? "")}]`, state, maxChars);
    } else if (type === "tool_result" || type === "toolResult") {
      const c = b.content;
      if (typeof c === "string") pushTextPart(parts, `[tool_result] ${c}`, state, maxChars);
      else pushTextPart(parts, `[tool_result]`, state, maxChars);
    } else if (typeof b.text === "string") {
      pushTextPart(parts, b.text, state, maxChars);
    }
  }
  return parts.join("\n");
}
function isPureToolResult(content) {
  if (!Array.isArray(content) || content.length === 0) return false;
  for (const block of content) {
    if (!block || typeof block !== "object") return false;
    const b = block;
    const type = typeof b.type === "string" ? b.type : "";
    if (type !== "tool_result" && type !== "toolResult") return false;
  }
  return true;
}
function stripSyntheticWorkMarkers(text) {
  if (!text) return "";
  const out = [];
  let blank = 0;
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (isSyntheticWorkMarkerLine(line)) continue;
    if (line === "") {
      blank += 1;
      if (blank === 1 && out.length > 0) out.push("");
      continue;
    }
    blank = 0;
    out.push(line);
  }
  return out.join("\n").trim();
}
function compactReadable(text, maxChars = 1500) {
  if (!text) return "";
  const source = truncateTranscriptText(text, Math.max(maxChars * 8, maxChars));
  let joined = stripSyntheticWorkMarkers(source);
  if (joined.length > maxChars) joined = `${joined.slice(0, maxChars).trimEnd()}…`;
  return joined;
}
function collapse(value) {
  return value.replace(/\s+/g, " ").trim();
}
function pushTextPart(parts, value, state, maxChars) {
  if (!value || state.chars >= maxChars) return;
  const separatorChars = parts.length > 0 ? 1 : 0;
  const remaining = maxChars - state.chars - separatorChars;
  if (remaining <= 0) return;
  const next = truncateTranscriptText(value, remaining);
  parts.push(next);
  state.chars += separatorChars + next.length;
}
function isSyntheticWorkMarkerLine(line) {
  return /^\[(?:tool:[^\]]*|thinking|tool_result)\](?:\s|$)/i.test(line.trim());
}
const SUB_AGENT_TOOL_NAMES = /* @__PURE__ */ new Set(["Task", "Agent", "subagent", "task"]);
function isSubAgentToolName(name) {
  return SUB_AGENT_TOOL_NAMES.has(name);
}
function subAgentFromToolCall(id, call) {
  if (!isSubAgentToolName(call.name)) return null;
  let title;
  let prompt = "";
  if (call.input && typeof call.input === "object") {
    const input = call.input;
    const raw = input.description ?? input.title ?? input.task ?? "";
    const text = String(raw).trim();
    if (text) title = text;
    prompt = String(input.prompt ?? "").slice(0, 400);
  }
  const state = call.isError ? "failed" : call.endedAtMs ? "finished" : "running";
  return {
    id,
    title: title ?? "sub-agent",
    prompt,
    state,
    startedAt: call.startedAtMs,
    endedAt: call.endedAtMs
  };
}
const DEFAULT_TRANSCRIPT_TURN_LIMIT = 3;
const MAX_TRANSCRIPT_TURN_LIMIT = 25;
function parseConversationLastActivity(raw) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
  }
  return {};
}
function parseConversationToolInput(inputJson2) {
  if (!inputJson2) return void 0;
  try {
    return JSON.parse(inputJson2);
  } catch {
    return inputJson2;
  }
}
function codexChildConversationTitle(row) {
  if (row.subagent_kind === "guardian" || row.thread_source === "guardian_review")
    return "Approval review";
  if (row.title?.trim()) return row.title.trim();
  if (row.subagent_kind?.trim()) return `Codex ${row.subagent_kind.trim()} sub-agent`;
  return "Codex sub-agent";
}
function codexChildConversationAsSubAgent(row) {
  if (!row.external_id || row.state === "inactive" || row.state === "idle") return null;
  return {
    id: row.external_id,
    title: codexChildConversationTitle(row),
    prompt: row.preview ?? "",
    state: row.state,
    startedAt: row.started_at ?? void 0,
    endedAt: row.state === "finished" || row.state === "failed" ? row.last_activity_ts : void 0
  };
}
function activeCodexChildConversationSubAgents(rows) {
  return rows.flatMap((row) => {
    const subAgent = codexChildConversationAsSubAgent(row);
    return subAgent && (subAgent.state === "running" || subAgent.state === "needs-approval") ? [subAgent] : [];
  });
}
function codexChildConversationFromDesktopRow(row) {
  return {
    external_id: row.external_id,
    state: row.state,
    subagent_kind: row.subagent_kind,
    thread_source: row.thread_source,
    title: row.title,
    preview: row.preview,
    started_at: row.started_at,
    last_activity_ts: row.last_activity_ts
  };
}
function subAgentsForConversation(record2) {
  const row = record2.conversation;
  const toolSubAgents = record2.toolCalls.flatMap((toolCall) => {
    const subAgent = subAgentFromToolCall(toolCall.tool_use_id ?? String(toolCall.id), {
      name: toolCall.name,
      toolUseId: toolCall.tool_use_id ?? void 0,
      input: parseConversationToolInput(toolCall.input_json),
      isError: toolCall.is_error === 1,
      startedAtMs: toolCall.started_at_ms ?? void 0,
      endedAtMs: toolCall.ended_at_ms ?? void 0
    });
    return subAgent?.state === "running" ? [subAgent] : [];
  });
  if (row.source !== "codex" || !row.external_id) return toolSubAgents;
  const childSubAgents = activeCodexChildConversationSubAgents(
    record2.codexChildConversations.map(codexChildConversationFromDesktopRow)
  );
  return [...toolSubAgents, ...childSubAgents];
}
function codexWorkspaceDisplayInfo(row, branchLabel) {
  const normCwd = row.cwd ? desktopSearch.normalizePathSeparators(row.cwd) : "";
  if (row.source !== "codex" || !normCwd || !normCwd.includes("/.codex/worktrees/") && !normCwd.includes("/.codex/workspaces/")) {
    return null;
  }
  const info = desktopSearch.describeProjectPath(normCwd, branchLabel(normCwd));
  return {
    projectName: info.project,
    projectPath: info.projectRoot,
    workspace: info.worktree ?? row.workspace,
    workspaceKind: info.toolingDir ?? row.workspace_kind
  };
}
function projectConversationListItemsForView(input) {
  return input.records.filter(
    ({ conversation }) => !(conversation.source === "codex" && index.isCodexSubagentThreadSource(conversation.thread_source))
  ).map((record2) => {
    const row = record2.conversation;
    const project = record2.project;
    const codexDisplay = codexWorkspaceDisplayInfo(row, input.branchLabel);
    return {
      ...row,
      workspace: codexDisplay?.workspace ?? row.workspace,
      workspace_kind: codexDisplay?.workspaceKind ?? row.workspace_kind,
      last_activity: parseConversationLastActivity(row.last_activity),
      // The persisted project has already been canonicalized from the git remote.
      // Path-derived Codex information is only a fallback for legacy/unjoined rows.
      project_name: project?.name ?? codexDisplay?.projectName ?? null,
      project_kind: codexDisplay || project?.git_remote ? "git" : project ? "folder" : null,
      project_path: project?.path ?? codexDisplay?.projectPath ?? null,
      todos: record2.activeTodos,
      subAgents: subAgentsForConversation(record2),
      userTurns: record2.userTurns
    };
  });
}
async function loadConversationListItemsForView(storage, options, branchLabel) {
  const records = await storage.listConversationViewRecords(options);
  return projectConversationListItemsForView({ records, branchLabel });
}
function transcriptTurnLimit(value) {
  if (!value || !Number.isFinite(value)) return DEFAULT_TRANSCRIPT_TURN_LIMIT;
  return Math.max(1, Math.min(MAX_TRANSCRIPT_TURN_LIMIT, Math.floor(value)));
}
const LIVE_TAIL_MAX_BYTES = 2 * 1024 * 1024;
function record(value) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function cleanCodexUserText(text) {
  const trimmed = text.trim();
  const userQuery = trimmed.match(/<user_query[^>]*>([\s\S]*?)<\/user_query>/i);
  if (userQuery) return userQuery[1].replace(/\s+/g, " ").trim();
  return trimmed.startsWith("# AGENTS.md instructions") || trimmed.startsWith("<environment_context>") || trimmed.startsWith("# In app browser:") || trimmed.startsWith("<turn_aborted>") || trimmed.startsWith("<subagent_notification>") ? "" : trimmed;
}
function inputJson(value) {
  if (value == null) return null;
  if (typeof value !== "string") return JSON.stringify(value);
  const trimmed = value.trim();
  if (!trimmed) return null;
  return JSON.stringify(record(trimmed) ?? trimmed);
}
function cloneTranscript(transcript) {
  return {
    ...transcript,
    conversation: { ...transcript.conversation },
    events: transcript.events.map((event) => ({ ...event })),
    toolCalls: transcript.toolCalls.map((tool) => ({ ...tool })),
    userTurns: transcript.userTurns.map((turn) => ({ ...turn })),
    todoLists: transcript.todoLists,
    pagination: { ...transcript.pagination }
  };
}
async function appendCodexLiveTail(ports, transcript, sourceBytesParsed) {
  if (transcript.conversation.source !== "codex" || !sourceBytesParsed || sourceBytesParsed < 0)
    return transcript;
  const stat = await ports.stat(transcript.conversation.ref);
  if (!stat || stat.isFile === false || stat.size <= sourceBytesParsed || stat.size - sourceBytesParsed > LIVE_TAIL_MAX_BYTES)
    return transcript;
  const lines = await ports.readLinesFromOffset(transcript.conversation.ref, sourceBytesParsed);
  if (lines.length === 0) return transcript;
  const next = cloneTranscript(transcript);
  next.conversation.last_activity_ts = Math.max(next.conversation.last_activity_ts, stat.mtimeMs);
  const eventPositions = /* @__PURE__ */ new Map();
  for (const event of next.events)
    eventPositions.set(
      event.user_turn_id,
      Math.max(eventPositions.get(event.user_turn_id) ?? 0, event.position + 1)
    );
  let turn = next.userTurns.at(-1) ?? null;
  let nextTurnId = -1;
  let nextToolId = -1;
  let nextPosition = next.pagination.totalTurns;
  const tools = /* @__PURE__ */ new Map();
  for (const tool of next.toolCalls) if (tool.tool_use_id) tools.set(tool.tool_use_id, tool);
  const ensureTurn = (timestamp) => {
    if (turn) return turn;
    turn = {
      id: nextTurnId--,
      conversation_id: next.conversation.id,
      position: nextPosition++,
      prompt: "Live activity",
      state: next.conversation.state === "inactive" ? "running" : next.conversation.state,
      started_at: timestamp || null,
      ended_at: null
    };
    next.userTurns.push(turn);
    return turn;
  };
  const appendEvent = (row) => {
    const position = eventPositions.get(row.user_turn_id) ?? 0;
    eventPositions.set(row.user_turn_id, position + 1);
    next.events.push({ ...row, id: -1 - next.events.length, position });
  };
  for (const line of lines) {
    const raw = record(line);
    if (!raw || raw.type !== "response_item") continue;
    const payload = raw.payload && typeof raw.payload === "object" && !Array.isArray(raw.payload) ? raw.payload : {};
    const timestamp = typeof raw.timestamp === "string" ? Date.parse(raw.timestamp) || 0 : 0;
    if (payload.type === "message" && (payload.role === "user" || payload.role === "assistant")) {
      const text = payload.role === "user" ? cleanCodexUserText(extractText(payload.content)) : extractText(payload.content);
      if (!text.trim()) continue;
      if (payload.role === "user") {
        turn = {
          id: nextTurnId--,
          conversation_id: next.conversation.id,
          position: nextPosition++,
          prompt: text,
          state: next.conversation.state === "inactive" ? "running" : next.conversation.state,
          started_at: timestamp || null,
          ended_at: null
        };
        next.userTurns.push(turn);
      }
      appendEvent({
        user_turn_id: ensureTurn(timestamp).id,
        kind: payload.role === "user" ? "user_text" : "assistant_text",
        text,
        timestamp_ms: timestamp || null,
        tool_call_id: null
      });
      continue;
    }
    if (payload.type === "function_call" || payload.type === "custom_tool_call") {
      const callId = typeof payload.call_id === "string" ? payload.call_id : typeof payload.id === "string" ? payload.id : null;
      const tool = {
        id: nextToolId--,
        conversation_id: next.conversation.id,
        event_id: null,
        tool_use_id: callId,
        name: typeof payload.name === "string" && payload.name.trim() ? payload.name : "tool",
        input_json: inputJson(
          payload.type === "custom_tool_call" ? payload.input : payload.arguments
        ),
        result_text: null,
        is_error: 0,
        started_at_ms: timestamp || null,
        ended_at_ms: null
      };
      next.toolCalls.push(tool);
      if (callId) tools.set(callId, tool);
      ensureTurn(timestamp);
      continue;
    }
    if (payload.type === "function_call_output" || payload.type === "custom_tool_call_output") {
      const callId = typeof payload.call_id === "string" ? payload.call_id : null;
      let tool = callId ? tools.get(callId) : void 0;
      if (!tool) {
        tool = {
          id: nextToolId--,
          conversation_id: next.conversation.id,
          event_id: null,
          tool_use_id: callId,
          name: "tool",
          input_json: null,
          result_text: null,
          is_error: 0,
          started_at_ms: null,
          ended_at_ms: null
        };
        next.toolCalls.push(tool);
        if (callId) tools.set(callId, tool);
      }
      tool.result_text = truncateTranscriptText(
        typeof payload.output === "string" ? payload.output : ""
      );
      tool.ended_at_ms = timestamp || tool.ended_at_ms;
      ensureTurn(timestamp);
    }
  }
  if (next.userTurns.length > transcript.userTurns.length) {
    next.pagination.totalTurns += next.userTurns.length - transcript.userTurns.length;
    next.pagination.returnedTurns = next.userTurns.length;
  }
  if (next.pagination.totalActivityEvents !== null) {
    next.pagination.totalActivityEvents += next.events.length - transcript.events.length + (next.toolCalls.length - transcript.toolCalls.length);
  }
  return next;
}
function createConversationReadService(deps) {
  const now = deps.now ?? (() => Date.now());
  return {
    async getTranscript(ref, opts = {}) {
      const transcript = await deps.storage.getConversationTranscriptByRef(ref, {
        beforeTurnPosition: opts.beforeTurnPosition,
        ...opts.afterTurnPosition === void 0 ? {} : { afterTurnPosition: opts.afterTurnPosition },
        ...opts.aroundTurnPosition === void 0 ? {} : { aroundTurnPosition: opts.aroundTurnPosition },
        ...opts.focusEventId === void 0 ? {} : { focusEventId: opts.focusEventId },
        ...opts.focusToolCallId === void 0 ? {} : { focusToolCallId: opts.focusToolCallId },
        limit: transcriptTurnLimit(opts.limit)
      });
      if (!transcript || !deps.liveTail) return transcript;
      if (transcript.pagination.hasMoreAfter) return transcript;
      return appendCodexLiveTail(
        deps.liveTail,
        transcript,
        await deps.liveTail.getSourceBytesParsed(ref)
      );
    },
    searchTranscript(ref, query, beforeTurnPosition) {
      return deps.storage.searchConversationTranscriptByRef(ref, query, beforeTurnPosition);
    },
    load(ref) {
      return deps.storage.getConversationTitleMessages(ref);
    },
    async dismissConversation(ref) {
      await deps.storage.dismissConversation(ref, now());
    },
    async setConversationIdle(ref) {
      await deps.storage.markConversationIdle(ref);
    }
  };
}
const gitDirCache = /* @__PURE__ */ new Map();
const headCache = /* @__PURE__ */ new Map();
function findGitDir(cwd) {
  if (gitDirCache.has(cwd)) return gitDirCache.get(cwd) ?? null;
  let dir = _n.resolve(cwd);
  while (true) {
    const candidate = _n.join(dir, ".git");
    if (fs.existsSync(candidate)) {
      try {
        const st = fs.statSync(candidate);
        if (st.isDirectory()) {
          gitDirCache.set(cwd, candidate);
          return candidate;
        }
        const contents = fs.readFileSync(candidate, "utf8").trim();
        const m = contents.match(/^gitdir:\s*(.+)$/m);
        if (m) {
          const ref = m[1].trim();
          const resolved = _n.isAbsolute(ref) ? ref : _n.resolve(dir, ref);
          gitDirCache.set(cwd, resolved);
          return resolved;
        }
      } catch {
      }
    }
    const parent = _n.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  gitDirCache.set(cwd, null);
  return null;
}
function gitContext(cwd) {
  const gitDir = findGitDir(cwd);
  if (!gitDir) return { isRepo: false };
  const headPath = _n.join(gitDir, "HEAD");
  try {
    const st = fs.statSync(headPath);
    const cached = headCache.get(headPath);
    if (cached && cached.mtimeMs === st.mtimeMs) return cached.ctx;
    const head = fs.readFileSync(headPath, "utf8").trim();
    const ref = head.match(/^ref:\s*refs\/heads\/(.+)$/);
    const ctx = ref ? { isRepo: true, branch: ref[1] } : {
      isRepo: true,
      detachedSha: head.replace(/^ref:\s*/, "").slice(0, 7) || head.slice(0, 7)
    };
    headCache.set(headPath, { mtimeMs: st.mtimeMs, ctx });
    return ctx;
  } catch {
    return { isRepo: false };
  }
}
const GIT_BRANCH_NO_REPO = "(no git)";
function gitBranchLabel(cwd) {
  const ctx = gitContext(cwd);
  if (ctx.branch) return ctx.branch;
  if (ctx.detachedSha) return `@${ctx.detachedSha}`;
  if (!ctx.isRepo) return GIT_BRANCH_NO_REPO;
  return void 0;
}
function yieldToEventLoop() {
  return new Promise((resolve) => setImmediate(resolve));
}
const SKIPPABLE_JSONL_READ_ERROR_CODES = /* @__PURE__ */ new Set([
  "EBADF",
  "EISDIR",
  "EMFILE",
  "ENFILE",
  "ENOENT",
  "ENOTDIR"
]);
function jsonlReadErrorCode(error) {
  if (!error || typeof error !== "object") return void 0;
  const code = error.code;
  return typeof code === "string" ? code : void 0;
}
function isSkippableJsonlReadError(error) {
  const code = jsonlReadErrorCode(error);
  return code !== void 0 && SKIPPABLE_JSONL_READ_ERROR_CODES.has(code);
}
async function* readJsonlLines(path, opts = {}) {
  const { createReadStream } = await import("node:fs");
  const { createInterface } = await import("node:readline");
  const stream = createReadStream(path, { encoding: "utf8" });
  const lines = createInterface({
    input: stream,
    crlfDelay: Infinity
  });
  const yieldEveryLines = opts.yieldEveryLines ?? 500;
  let lineIndex = 0;
  try {
    for await (const line of lines) {
      if (opts.shouldStop?.()) break;
      if (lineIndex > 0 && lineIndex % yieldEveryLines === 0) {
        await yieldToEventLoop();
        if (opts.shouldStop?.()) break;
      }
      lineIndex += 1;
      yield line;
    }
  } finally {
    lines.close();
    stream.destroy();
  }
}
async function readJsonlLinesFromOffset(path, start) {
  const { createReadStream } = await import("node:fs");
  const { createInterface } = await import("node:readline");
  const stream = createReadStream(path, { encoding: "utf8", start });
  const lines = createInterface({ input: stream, crlfDelay: Infinity });
  const out = [];
  try {
    for await (const line of lines) out.push(line);
  } finally {
    lines.close();
    stream.destroy();
  }
  return out;
}
const WALK_YIELD_EVERY_ENTRIES = 100;
const STAT_BATCH_SIZE = 64;
async function walkJsonl(dir, opts = {}) {
  const { readdir } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const out = [];
  const pending = [dir];
  let visitedEntries = 0;
  while (pending.length > 0) {
    if (opts.shouldStop?.()) return out;
    const current = pending.pop();
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (opts.shouldStop?.()) return out;
      visitedEntries += 1;
      if (visitedEntries % WALK_YIELD_EVERY_ENTRIES === 0) {
        await yieldToEventLoop();
        if (opts.shouldStop?.()) return out;
      }
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        pending.push(full);
      } else if (entry.isFile() && entry.name.endsWith(".jsonl")) {
        out.push(full);
      }
    }
  }
  return out;
}
async function readJsonlFileMeta(path, statFile) {
  try {
    const stats = await statFile(path);
    return { path, mtimeMs: stats.mtimeMs, size: stats.size };
  } catch {
    return { path, mtimeMs: 0 };
  }
}
const WALK_TTL_MS = 5 * 60 * 1e3;
const walkCache = /* @__PURE__ */ new Map();
const inFlight = /* @__PURE__ */ new Map();
async function walkJsonlWithStat(dir, opts = {}) {
  const now = Date.now();
  const cached = walkCache.get(dir);
  if (cached && now - cached.at < WALK_TTL_MS) {
    return cached.result;
  }
  const pending = inFlight.get(dir);
  if (pending) return pending;
  const promise = (async () => {
    const { stat } = await import("node:fs/promises");
    const files = await walkJsonl(dir, opts);
    const result = [];
    for (let i = 0; i < files.length; i += STAT_BATCH_SIZE) {
      if (opts.shouldStop?.()) return result;
      const batch = files.slice(i, i + STAT_BATCH_SIZE);
      result.push(...await Promise.all(batch.map((path) => readJsonlFileMeta(path, stat))));
      await yieldToEventLoop();
    }
    if (!opts.shouldStop?.()) {
      walkCache.set(dir, { at: Date.now(), result });
    }
    return result;
  })();
  inFlight.set(dir, promise);
  try {
    return await promise;
  } finally {
    inFlight.delete(dir);
  }
}
function invalidateWalkCache(dir) {
  if (dir) walkCache.delete(dir);
  else walkCache.clear();
}
exports.compactReadable = compactReadable;
exports.createConversationReadService = createConversationReadService;
exports.extractText = extractText;
exports.gitBranchLabel = gitBranchLabel;
exports.invalidateWalkCache = invalidateWalkCache;
exports.isPureToolResult = isPureToolResult;
exports.isSkippableJsonlReadError = isSkippableJsonlReadError;
exports.jsonlReadErrorCode = jsonlReadErrorCode;
exports.loadConversationListItemsForView = loadConversationListItemsForView;
exports.readJsonlLines = readJsonlLines;
exports.readJsonlLinesFromOffset = readJsonlLinesFromOffset;
exports.stripCursorXml = stripCursorXml;
exports.stripSyntheticWorkMarkers = stripSyntheticWorkMarkers;
exports.transcriptTurnLimit = transcriptTurnLimit;
exports.walkJsonlWithStat = walkJsonlWithStat;
//# sourceMappingURL=jsonlFiles-B8t4SSDo.js.map

//# debugId=8f04fb94-25a9-5f32-9dc7-695a27a6f944
