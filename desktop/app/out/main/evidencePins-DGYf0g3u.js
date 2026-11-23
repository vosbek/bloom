"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0bdc7547-7b4f-5e0c-92d0-6bad43ef3f63")}catch(e){}}();

const index = require("./index-UFoqNX7c.js");
const jsonlFiles = require("./jsonlFiles-B8t4SSDo.js");
const identity = require("./identity-C50QOXIb.js");
const repositoryKey = require("./repositoryKey-CSvrvo7G.js");
const legacyExclusions = require("./legacyExclusions-DC3wHYCy.js");
const Database = require("better-sqlite3");
const un = require("fs");
const require$$0 = require("os");
const pn = require("path");
const neverthrow = require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
require("./useCases-CApkWXtQ.js");
const promises = require("fs/promises");
require("node:fs/promises");
require("node:path");
const desktopSearch = require("./desktopSearch-UUzZxN96.js");
require("node:fs");
const WAITING_MS = 60 * 6e4;
function deactivateStaleActivityState(state, lastActivityTs, now = Date.now(), waitingMs = WAITING_MS) {
  if (state === "idle" || state === "inactive" || state === "needs-approval") return state;
  return lastActivityTs <= now - waitingMs ? "inactive" : state;
}
function classifyActivity(a, b, c) {
  const inputs = typeof a === "number" ? { lastEventTs: a, lastEventKind: b ?? "other" } : a;
  const now = typeof a === "number" ? Date.now() : b ?? Date.now();
  const {
    lastEventTs,
    lastEventKind: lastEventKind2,
    lastMessageTs = 0,
    lastToolCallTs = 0,
    lastToolResultTs = 0,
    needsApproval = false
  } = inputs;
  const age = now - lastEventTs;
  if (lastEventKind2 === "assistant-error") return "failed";
  if (needsApproval) return "needs-approval";
  if (age >= WAITING_MS) return "inactive";
  if (lastEventKind2 === "user" && lastEventTs > Math.max(lastMessageTs, lastToolCallTs, lastToolResultTs)) {
    return "running";
  }
  if (lastMessageTs > 0 || lastToolCallTs > 0) {
    if (lastMessageTs > lastToolCallTs && lastMessageTs >= lastToolResultTs) return "finished";
    if (lastToolCallTs > lastToolResultTs) {
      return "running";
    }
    if (lastToolResultTs >= lastToolCallTs) {
      if (lastEventKind2 === "user" && lastEventTs >= lastToolResultTs) return "running";
      return "finished";
    }
    return "running";
  }
  if (lastEventKind2 === "assistant-final") return "finished";
  if (lastEventKind2 === "assistant-tool-use") {
    return "running";
  }
  return "running";
}
function isRejectedToolUseText(text) {
  const lower = text.toLowerCase();
  return lower.includes("doesn't want to proceed with this tool use") || lower.includes("tool use was rejected") || lower.includes("user rejected tool use");
}
function isInterruptedToolUseText(text) {
  return /^\s*\[request interrupted by user(?: for tool use)?\]\s*$/i.test(text);
}
function stoppedAfterLatestAssistantAction(input) {
  return input.stopMarker > 0 && input.stopMarker >= input.lastToolCall && input.stopMarker >= input.lastMessage && input.stopMarker >= input.lastUserMessage;
}
function parseJsonObjectRecord(text) {
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function parseJsonRecord(text) {
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return neverthrow.ok(parsed);
    }
    return neverthrow.err({
      error: new Error("Expected JSON object"),
      length: text.length
    });
  } catch (error) {
    return neverthrow.err({ error, length: text.length });
  }
}
const DEFAULT_APPROVAL_TOOLS = /* @__PURE__ */ new Set([
  "Agent",
  "Edit",
  "MultiEdit",
  "NotebookEdit",
  "Write"
]);
const CLAUDE_APPROVAL_ATTENTION_MS = 2 * 6e4;
function parseClaudeAskRules(settings) {
  const raw = typeof settings === "string" ? parseJsonObjectRecord(settings) : asRecord(settings);
  const permissions = asRecord(raw?.permissions);
  const ask = Array.isArray(permissions?.ask) ? permissions.ask : [];
  return ask.map((value) => {
    if (typeof value !== "string") return null;
    const match = value.match(/^([^()]+)\(([\s\S]*)\)$/);
    if (!match) return null;
    return { tool: match[1], pattern: match[2] };
  }).filter((value) => value !== null);
}
function claudeToolRequiresApproval(block, rules) {
  const name = String(block.name ?? "");
  const input = block.input ?? block.arguments;
  if (DEFAULT_APPROVAL_TOOLS.has(name)) return true;
  if (name === "Bash" && input?.dangerouslyDisableSandbox === true) return true;
  const command = String(input?.command ?? input?.cmd ?? "").trim();
  const value = command || name;
  return rules.some((rule) => rule.tool === name && wildcardMatches$1(rule.pattern, value));
}
function hasFreshPendingApproval(pendingApprovals, nowMs, attentionMs) {
  let any = false;
  let latest = 0;
  for (const ts of pendingApprovals) {
    any = true;
    if (ts > latest) latest = ts;
  }
  if (!any) return false;
  if (!latest) return true;
  return nowMs - latest <= attentionMs;
}
function mapClaudeTaskStatus(status) {
  if (status === "completed" || status === "done" || status === "deleted") {
    return "done";
  }
  if (status === "in_progress" || status === "current") return "current";
  return "pending";
}
function projectClaudeDesktopTitleRecord(value, meta) {
  const raw = typeof value === "string" ? parseJsonObjectRecord(value) : asRecord(value);
  const cliSessionId = typeof raw?.cliSessionId === "string" ? raw.cliSessionId.trim() : "";
  if (!cliSessionId) return null;
  const title = typeof raw?.title === "string" ? raw.title.trim() : "";
  const titleSource = typeof raw?.titleSource === "string" ? raw.titleSource.trim() || void 0 : void 0;
  return {
    cliSessionId,
    title: title.length > 0 ? title : void 0,
    titleSource,
    mtimeMs: meta.mtimeMs,
    path: meta.path
  };
}
function projectClaudeSessionStateRecord(value, meta) {
  const raw = typeof value === "string" ? parseJsonObjectRecord(value) : asRecord(value);
  const sessionId = typeof raw?.sessionId === "string" ? raw.sessionId.trim() : "";
  if (!sessionId) return null;
  const status = typeof raw?.status === "string" ? raw.status.trim() || void 0 : void 0;
  const waitingFor = typeof raw?.waitingFor === "string" ? raw.waitingFor.trim() || void 0 : void 0;
  const updatedAt = typeof raw?.updatedAt === "number" && Number.isFinite(raw.updatedAt) ? raw.updatedAt : void 0;
  const statusUpdatedAt = typeof raw?.statusUpdatedAt === "number" && Number.isFinite(raw.statusUpdatedAt) ? raw.statusUpdatedAt : void 0;
  return {
    sessionId,
    status,
    waitingFor,
    mtimeMs: meta.mtimeMs,
    path: meta.path,
    updatedAt,
    statusUpdatedAt
  };
}
function claudeSessionStateNeedsApproval(state) {
  return state?.status === "waiting" && state.waitingFor === "permission prompt";
}
function claudeSessionStateIsRunning(state) {
  return state?.status === "running";
}
function normalizeClaudeDesktopTitleWritebackTitle(title) {
  const normalized = title.trim();
  if (!normalized) throw new Error("Title cannot be empty.");
  return normalized;
}
function projectClaudeDesktopTitleWritebackRecord(value, title) {
  const normalized = normalizeClaudeDesktopTitleWritebackTitle(title);
  const raw = asRecord(value);
  if (!raw) throw new Error("Claude Desktop title metadata is not valid JSON.");
  return {
    ...raw,
    title: normalized,
    titleSource: "user"
  };
}
function projectClaudeTaskStateRecord(value, fallbackId) {
  const raw = typeof value === "string" ? parseJsonObjectRecord(value) : asRecord(value);
  if (!raw) return null;
  const id = String(raw.id ?? fallbackId ?? "").trim();
  if (!id) return null;
  return { id, state: mapClaudeTaskStatus(raw.status) };
}
async function collectClaudeDesktopSessionJsonFiles(root, deps, out = [], depth = 0) {
  const maxDepth = deps.maxDepth ?? 8;
  if (depth > maxDepth) return out;
  let entries;
  try {
    entries = await deps.fs.readdir(root);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const childPath = deps.path.join(root, entry.name);
    if (entry.isDirectory()) {
      await collectClaudeDesktopSessionJsonFiles(childPath, deps, out, depth + 1);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      out.push(childPath);
    }
  }
  return out;
}
async function loadClaudeDesktopTitleRecords(root, deps) {
  const titles = /* @__PURE__ */ new Map();
  const files = await collectClaudeDesktopSessionJsonFiles(root, deps);
  for (const file of files) {
    try {
      const [rawText, stat] = await Promise.all([deps.fs.readFile(file), deps.fs.stat(file)]);
      const projected = projectClaudeDesktopTitleRecord(rawText, {
        path: file,
        mtimeMs: stat.mtimeMs
      });
      if (!projected) continue;
      const existing = titles.get(projected.cliSessionId);
      if (!existing || stat.mtimeMs >= existing.mtimeMs) {
        titles.set(projected.cliSessionId, projected);
      }
    } catch {
    }
  }
  return titles;
}
async function loadClaudeSessionStateRecords(root, deps) {
  const states = /* @__PURE__ */ new Map();
  const files = await collectClaudeDesktopSessionJsonFiles(root, deps);
  for (const file of files) {
    try {
      const [rawText, stat] = await Promise.all([deps.fs.readFile(file), deps.fs.stat(file)]);
      const projected = projectClaudeSessionStateRecord(rawText, {
        path: file,
        mtimeMs: stat.mtimeMs
      });
      if (!projected) continue;
      const existing = states.get(projected.sessionId);
      if (!existing || stat.mtimeMs >= existing.mtimeMs) {
        states.set(projected.sessionId, projected);
      }
    } catch {
    }
  }
  return states;
}
async function collectClaudeTaskStateFiles(tasksRoot, sessionId, deps) {
  const dir = deps.path.join(tasksRoot, sessionId);
  let entries;
  let latestMtimeMs = 0;
  try {
    const [dirEntries, dirStat] = await Promise.all([deps.fs.readdir(dir), deps.fs.stat(dir)]);
    entries = dirEntries;
    latestMtimeMs = dirStat.mtimeMs;
  } catch {
    return void 0;
  }
  const files = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const childPath = deps.path.join(dir, entry.name);
    try {
      const stat = await deps.fs.stat(childPath);
      latestMtimeMs = Math.max(latestMtimeMs, stat.mtimeMs);
      files.push({ path: childPath, mtimeMs: stat.mtimeMs });
    } catch {
    }
  }
  return { mtimeMs: latestMtimeMs, files };
}
async function loadClaudeTaskStateRecords(tasksRoot, sessionId, deps) {
  const taskFiles = await collectClaudeTaskStateFiles(tasksRoot, sessionId, deps);
  if (!taskFiles) return void 0;
  const states = /* @__PURE__ */ new Map();
  for (const file of taskFiles.files) {
    try {
      const projected = projectClaudeTaskStateRecord(
        await deps.fs.readFile(file.path),
        deps.path.basename(file.path).replace(/\.json$/, "")
      );
      if (projected) states.set(projected.id, projected.state);
    } catch {
    }
  }
  return { mtimeMs: taskFiles.mtimeMs, states };
}
function createClaudeExternalStateRuntime(input) {
  let askRuleCache;
  let desktopTitleCache;
  let sessionStateCache;
  const ttlMs = input.desktopTitleCacheTtlMs;
  const now = input.now ?? Date.now;
  const settingsPath = () => resolveRuntimePath(input.settingsPath);
  const desktopSessionsRoot = () => resolveRuntimePath(input.desktopSessionsRoot);
  const tasksRoot = () => resolveRuntimePath(input.tasksRoot);
  async function loadDesktopTitles(force = false) {
    const root = desktopSessionsRoot();
    const loadedAt = now();
    if (!force && desktopTitleCache && desktopTitleCache.root === root && loadedAt - desktopTitleCache.loadedAt < ttlMs) {
      return desktopTitleCache.titles;
    }
    const titles = await loadClaudeDesktopTitleRecords(root, input.deps);
    desktopTitleCache = { root, loadedAt, titles };
    return titles;
  }
  async function loadSessionStates(force = false) {
    const root = desktopSessionsRoot();
    const loadedAt = now();
    if (!force && sessionStateCache && sessionStateCache.root === root && loadedAt - sessionStateCache.loadedAt < ttlMs) {
      return sessionStateCache.states;
    }
    const states = await loadClaudeSessionStateRecords(root, input.deps);
    sessionStateCache = { root, loadedAt, states };
    return states;
  }
  return {
    async readAskRules() {
      const path = settingsPath();
      let mtimeMs = 0;
      try {
        mtimeMs = (await input.deps.fs.stat(path)).mtimeMs;
        if (askRuleCache?.settingsPath === path && askRuleCache.mtimeMs === mtimeMs) {
          return askRuleCache.rules;
        }
        const rules = parseClaudeAskRules(await input.deps.fs.readFile(path));
        askRuleCache = { settingsPath: path, mtimeMs, rules };
        return rules;
      } catch {
        askRuleCache = { settingsPath: path, mtimeMs, rules: [] };
        return [];
      }
    },
    async readDesktopTitle(sessionId) {
      return (await loadDesktopTitles()).get(sessionId);
    },
    async readSessionState(sessionId) {
      return (await loadSessionStates()).get(sessionId);
    },
    async readSessionStateVersion(sessionId) {
      return (await loadSessionStates()).get(sessionId);
    },
    readTaskState(sessionId) {
      return loadClaudeTaskStateRecords(tasksRoot(), sessionId, input.deps);
    },
    readTaskStateVersion(sessionId) {
      return collectClaudeTaskStateFiles(tasksRoot(), sessionId, input.deps);
    },
    async applyDesktopTitle(cliSessionId, title) {
      normalizeClaudeDesktopTitleWritebackTitle(title);
      const records = await loadDesktopTitles(true);
      const record = records.get(cliSessionId);
      if (!record) {
        throw new Error("No Claude Desktop title metadata found for this conversation.");
      }
      const parsed = parseJsonRecord(await input.deps.fs.readFile(record.path));
      if (parsed.isErr()) {
        throw new Error("Claude Desktop title metadata is not valid JSON.");
      }
      const raw = projectClaudeDesktopTitleWritebackRecord(parsed.value, title);
      await input.deps.fs.writeFile(record.path, JSON.stringify(raw));
      desktopTitleCache = void 0;
    },
    resetDesktopTitleCache() {
      desktopTitleCache = void 0;
      sessionStateCache = void 0;
    }
  };
}
function wildcardMatches$1(pattern, value) {
  if (pattern === "*") return true;
  const normalized = pattern.endsWith(":*") ? pattern.slice(0, -2) + "*" : pattern;
  const escaped = normalized.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^${escaped.replace(/\*/g, ".*")}$`);
  return re.test(value);
}
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function resolveRuntimePath(value) {
  return typeof value === "function" ? value() : value;
}
const LAST_EVENT_KINDS = /* @__PURE__ */ new Set([
  "assistant-final",
  "assistant-tool-use",
  "assistant-error",
  "user",
  "other"
]);
function lastEventKind(value) {
  return value && LAST_EVENT_KINDS.has(value) ? value : "other";
}
function firstReadableUserLine(text) {
  return text.split("\n").map((part) => part.trim()).find((part) => part && !part.startsWith("["))?.slice(0, 500).replace(/\s+/g, " ").trim();
}
const CLAUDE_LOCAL_COMMAND_CAVEAT = "Caveat: The messages below were generated by the user while running local commands.";
function isClaudeLocalCommandCaveat(text) {
  return comparableText(text).startsWith(CLAUDE_LOCAL_COMMAND_CAVEAT);
}
function comparableText(text) {
  return text.replace(/\s+/g, " ").trim();
}
const ECHO_PREFIX_CHARS = 60;
function stripTruncationMarker(text) {
  return text.endsWith("…") ? text.slice(0, -1) : text;
}
function parsedToolResultTexts(parsed) {
  const exact = /* @__PURE__ */ new Set();
  const byPrefix = /* @__PURE__ */ new Map();
  for (const toolCall of parsed.toolCalls) {
    if (!toolCall.resultText) continue;
    const text = comparableText(toolCall.resultText);
    if (!text) continue;
    exact.add(text);
    const stripped = stripTruncationMarker(text);
    if (stripped.length < ECHO_PREFIX_CHARS) continue;
    const key = stripped.slice(0, ECHO_PREFIX_CHARS);
    const entry = { text: stripped, truncated: stripped !== text };
    const bucket = byPrefix.get(key);
    if (bucket) bucket.push(entry);
    else byPrefix.set(key, [entry]);
  }
  return { exact, byPrefix };
}
function isToolResultText(text, toolResultTexts) {
  const comparable = comparableText(text);
  if (!comparable) return false;
  if (toolResultTexts.exact.has(comparable)) return true;
  const stripped = stripTruncationMarker(comparable);
  if (stripped.length < ECHO_PREFIX_CHARS) return false;
  const candidates = toolResultTexts.byPrefix.get(stripped.slice(0, ECHO_PREFIX_CHARS));
  if (!candidates) return false;
  const messageTruncated = comparable !== stripped;
  return candidates.some((candidate) => {
    if (!messageTruncated || !candidate.truncated) return false;
    return candidate.text.startsWith(stripped) || stripped.startsWith(candidate.text);
  });
}
function projectedMessageRole(message, toolResultTexts) {
  if (message.role === "user" && isToolResultText(message.text, toolResultTexts)) return "tool";
  return message.role;
}
function toolCallActivityTs(toolCall) {
  return Math.max(toolCall.endedAtMs ?? 0, toolCall.startedAtMs ?? 0);
}
function isToolUseStopText(text) {
  return !!text && (isRejectedToolUseText(text) || isInterruptedToolUseText(text));
}
function latestToolUseStopMarkerTs(parsed, messages) {
  let latest = 0;
  for (const message of messages) {
    if (isToolUseStopText(message.text)) latest = Math.max(latest, message.timestampMs ?? 0);
  }
  for (const toolCall of parsed.toolCalls) {
    if (isToolUseStopText(toolCall.resultText))
      latest = Math.max(latest, toolCallActivityTs(toolCall));
  }
  return latest;
}
function latestTerminalErrorTs(parsed) {
  let latest = 0;
  for (const toolCall of parsed.toolCalls) {
    if (!toolCall.isError || toolCall.name === "turn_aborted" || isToolUseStopText(toolCall.resultText))
      continue;
    latest = Math.max(latest, toolCallActivityTs(toolCall));
  }
  return latest;
}
function pendingApprovalTimes(source, toolCalls, fallbackTimestampMs) {
  if (source !== "claude") return [];
  const pending = [];
  for (const toolCall of toolCalls) {
    if (toolCall.endedAtMs !== void 0 || toolCall.resultText !== void 0) continue;
    if (claudeToolRequiresApproval({ name: toolCall.name, input: toolCall.input }, [])) {
      pending.push(toolCall.startedAtMs ?? fallbackTimestampMs);
    }
  }
  return pending;
}
function toolCallLabel(toolCall) {
  const input = toolCall.input;
  let arg = "";
  if (typeof input === "string") {
    arg = input;
  } else if (input && typeof input === "object") {
    const record = input;
    for (const key of [
      "command",
      "cmd",
      "file_path",
      "path",
      "pattern",
      "query",
      "description",
      "prompt",
      "subagent_type",
      "url"
    ]) {
      const value = record[key];
      if (typeof value === "string" && value.trim()) {
        arg = value;
        break;
      }
    }
  }
  const compactArg = arg.replace(/\s+/g, " ").trim();
  return compactArg ? `${toolCall.name} · ${compactArg.slice(0, 300)}` : toolCall.name;
}
const MAX_LAST_TOOL_INPUT_CHARS = 4e3;
function toolCallInputText(toolCall) {
  const input = toolCall.input;
  if (input === void 0 || input === null) return void 0;
  const text = typeof input === "string" ? input : JSON.stringify(input);
  return text.length <= MAX_LAST_TOOL_INPUT_CHARS ? text : void 0;
}
function parseSourceLocation(source) {
  const match = source?.match(/^(.*):(\d+)$/);
  if (!match) return null;
  const line = Number(match[2]);
  return Number.isFinite(line) ? { path: match[1] ?? "", line } : null;
}
function terminalSignalLocations(parsed) {
  const locations = parsed.toolCalls.filter((toolCall) => toolCall.isError || toolCall.name === "turn_aborted").map((toolCall) => parseSourceLocation(toolCall.source)).filter((location) => location !== null);
  if (parsed.state === "failed" || parsed.state === "inactive") {
    const activityLocation = parseSourceLocation(parsed.activitySource);
    if (activityLocation) locations.push(activityLocation);
  }
  return locations;
}
function isAfterTerminalSignal(location, terminalSignals) {
  if (!location) return false;
  return terminalSignals.some(
    (errorLocation) => location.path === errorLocation.path && location.line > errorLocation.line
  );
}
function hasActivityAfterTerminalSignal(parsed, messages) {
  const terminalSignals = terminalSignalLocations(parsed);
  if (terminalSignals.length === 0) return false;
  return messages.some(
    (message) => isAfterTerminalSignal(parseSourceLocation(message.source), terminalSignals)
  ) || parsed.toolCalls.some(
    (toolCall) => isAfterTerminalSignal(parseSourceLocation(toolCall.source), terminalSignals)
  );
}
function shouldTrustExplicitLastKind(explicit, timestamps) {
  if (explicit === "assistant-tool-use") {
    return timestamps.lastToolResultTs === 0 || timestamps.lastToolCallTs > timestamps.lastToolResultTs;
  }
  if (explicit === "assistant-final") {
    return timestamps.lastToolCallTs <= timestamps.lastMessageTs;
  }
  if (explicit === "user") {
    return timestamps.lastToolCallTs <= Math.max(timestamps.lastMessageTs, timestamps.lastToolResultTs);
  }
  return true;
}
function deriveLastKind(parsed, messages) {
  const lastMessage = [...messages].reverse().find((message) => message.timestampMs !== void 0);
  const lastToolCall = [...parsed.toolCalls].reverse().find((toolCall) => toolCall.startedAtMs !== void 0);
  const lastToolResult = [...parsed.toolCalls].reverse().find((toolCall) => toolCall.endedAtMs !== void 0);
  const lastMessageTs = lastMessage?.timestampMs ?? 0;
  const lastToolCallTs = lastToolCall?.startedAtMs ?? 0;
  const lastToolResultTs = lastToolResult?.endedAtMs ?? 0;
  const errorTs = latestTerminalErrorTs(parsed);
  if (errorTs > 0 && errorTs >= Math.max(lastMessageTs, lastToolCallTs, lastToolResultTs)) {
    return "assistant-error";
  }
  if (parsed.state === "inactive" && parsed.toolCalls.some((toolCall) => toolCall.name === "turn_aborted") && !hasActivityAfterTerminalSignal(parsed, messages)) {
    return "user";
  }
  const explicit = lastEventKind(parsed.lastEventKind);
  if (explicit !== "other" && !hasActivityAfterTerminalSignal(parsed, messages) && shouldTrustExplicitLastKind(explicit, { lastMessageTs, lastToolCallTs, lastToolResultTs })) {
    return explicit;
  }
  if (lastToolCallTs > lastMessageTs && lastToolCallTs > lastToolResultTs)
    return "assistant-tool-use";
  if (lastToolResultTs > lastMessageTs && lastToolResultTs >= lastToolCallTs) return "user";
  if (!lastMessage) return "other";
  if (lastMessage.role === "user" || lastMessage.role === "tool") return "user";
  if (lastMessage.role === "assistant") {
    const hasToolCall = parsed.toolCalls.some(
      (toolCall) => toolCall.startedAtMs !== void 0 && lastMessage.timestampMs !== void 0 && toolCall.startedAtMs === lastMessage.timestampMs
    );
    return hasToolCall ? "assistant-tool-use" : "assistant-final";
  }
  return "other";
}
function mapMessages(parsed) {
  const toolResultTexts = parsedToolResultTexts(parsed);
  return parsed.messages.filter((message) => !isClaudeLocalCommandCaveat(message.text)).map((message) => ({
    position: message.position,
    ...message.id ? { id: message.id } : {},
    role: projectedMessageRole(message, toolResultTexts),
    text: message.text,
    timestampMs: message.timestampMs,
    source: message.source
  }));
}
function mapToolCalls(parsed, messages) {
  const sourceLocation = (source) => {
    const match = source?.match(/:(\d+)$/);
    if (!match) return null;
    const value = Number(match[1]);
    return Number.isSafeInteger(value) ? { path: source?.slice(0, -(match[0]?.length ?? 0)) ?? "", order: value } : null;
  };
  const sourceOrder = (source) => sourceLocation(source)?.order ?? null;
  const toolOrders = parsed.toolCalls.map((toolCall) => sourceOrder(toolCall.source));
  const nextToolOrders = new Array(toolOrders.length);
  let nextOrder;
  for (let index2 = toolOrders.length - 1; index2 >= 0; index2--) {
    nextToolOrders[index2] = nextOrder;
    if (toolOrders[index2] !== null) nextOrder = toolOrders[index2];
  }
  const messageByPosition = new Map(messages.map((message) => [message.position, message]));
  const candidateOwnersByToolPosition = /* @__PURE__ */ new Map();
  const ownerByMessagePosition = /* @__PURE__ */ new Map();
  const messagesByOwner = /* @__PURE__ */ new Map();
  for (const turn of parsed.userTurns) {
    for (const toolPosition of turn.toolCallPositions ?? []) {
      const owners = candidateOwnersByToolPosition.get(toolPosition) ?? /* @__PURE__ */ new Set();
      owners.add(turn.position);
      candidateOwnersByToolPosition.set(toolPosition, owners);
    }
    const ownedMessages = (turn.messagePositions ?? []).flatMap((position) => {
      const message = messageByPosition.get(position);
      return message ? [message] : [];
    });
    messagesByOwner.set(turn.position, ownedMessages);
    for (const message of ownedMessages) ownerByMessagePosition.set(message.position, turn.position);
  }
  const userBoundariesByPath = /* @__PURE__ */ new Map();
  for (const message of messages) {
    if (message.role !== "user") continue;
    const location = sourceLocation(message.source);
    const owner = ownerByMessagePosition.get(message.position);
    if (!location || owner === void 0) continue;
    const boundaries = userBoundariesByPath.get(location.path) ?? [];
    boundaries.push({ order: location.order, owner });
    userBoundariesByPath.set(location.path, boundaries);
  }
  for (const boundaries of userBoundariesByPath.values()) {
    boundaries.sort((left, right) => left.order - right.order || left.owner - right.owner);
  }
  const ownerFromSource = (source) => {
    const location = sourceLocation(source);
    if (!location) return void 0;
    const boundaries = userBoundariesByPath.get(location.path);
    if (!boundaries) return void 0;
    let low = 0;
    let high = boundaries.length;
    while (low < high) {
      const middle = low + high >> 1;
      if (boundaries[middle].order <= location.order) low = middle + 1;
      else high = middle;
    }
    return low === 0 ? void 0 : boundaries[low - 1].owner;
  };
  const orderedByOwner = /* @__PURE__ */ new Map();
  const orderedMessages = (ownerPosition) => {
    const key = ownerPosition ?? -1;
    const cached = orderedByOwner.get(key);
    if (cached) return cached;
    const ownedMessages = ownerPosition === void 0 ? messages : messagesByOwner.get(key) ?? [];
    const assistants = [];
    const results = [];
    for (const message of ownedMessages) {
      const order = sourceOrder(message.source);
      if (order === null) continue;
      const entry = { order, position: message.position };
      if (message.role === "assistant") assistants.push(entry);
      if (message.role === "tool") results.push(entry);
    }
    assistants.sort((left, right) => left.order - right.order);
    results.sort((left, right) => left.order - right.order);
    const ordered = { assistants, results };
    orderedByOwner.set(key, ordered);
    return ordered;
  };
  const latestAtOrBefore = (items, order) => {
    let low = 0;
    let high = items.length - 1;
    let match;
    while (low <= high) {
      const middle = low + high >> 1;
      const candidate = items[middle];
      if (candidate.order <= order) {
        match = candidate;
        low = middle + 1;
      } else high = middle - 1;
    }
    return match?.position;
  };
  const firstAfter = (items, order, before) => {
    let low = 0;
    let high = items.length;
    while (low < high) {
      const middle = low + high >> 1;
      if (items[middle].order <= order) low = middle + 1;
      else high = middle;
    }
    const match = items[low];
    return match && (before === void 0 || match.order < before) ? match.position : void 0;
  };
  return parsed.toolCalls.map((toolCall, toolIndex) => {
    const candidateOwners = candidateOwnersByToolPosition.get(toolCall.position ?? toolIndex);
    const ownerPosition = ownerFromSource(toolCall.source) ?? (candidateOwners?.size === 1 ? candidateOwners.values().next().value : void 0);
    const ownedMessages = ownerPosition === void 0 ? messages : messagesByOwner.get(ownerPosition) ?? [];
    const ordered = orderedMessages(ownerPosition);
    const order = toolOrders[toolIndex];
    const sourceEventPosition = (order === null ? void 0 : latestAtOrBefore(ordered.assistants, order)) ?? ownedMessages.find(
      (message) => message.role === "assistant" && toolCall.startedAtMs !== void 0 && message.timestampMs === toolCall.startedAtMs
    )?.position;
    const nextToolOrder = nextToolOrders[toolIndex];
    const resultEventPosition = ownedMessages.find(
      (message) => message.role === "tool" && toolCall.endedAtMs !== void 0 && message.timestampMs === toolCall.endedAtMs
    )?.position ?? (order === null ? void 0 : firstAfter(ordered.results, order, nextToolOrder));
    return {
      toolUseId: toolCall.toolUseId,
      sourceEventPosition,
      resultEventPosition,
      name: toolCall.name,
      input: toolCall.input,
      resultText: toolCall.resultText,
      isError: toolCall.isError,
      startedAtMs: toolCall.startedAtMs,
      endedAtMs: toolCall.endedAtMs
    };
  });
}
function mapTodos(parsed) {
  return parsed.todos.map((todo, index2) => ({
    position: todo.position ?? index2,
    content: todo.content,
    state: todo.state
  }));
}
function mapUserTurns(parsed, messages) {
  const toolResultTexts = parsedToolResultTexts(parsed);
  const messageByPosition = new Map(messages.map((message) => [message.position, message]));
  const firstUserPosition = messages.find((message) => message.role === "user")?.position ?? 0;
  const turns = parsed.userTurns.filter(
    (turn) => !isToolResultText(turn.prompt, toolResultTexts) && !isClaudeLocalCommandCaveat(turn.prompt)
  );
  if (turns.length === 0) {
    return messages.filter((message) => message.role === "user").map((message, index2) => ({
      position: index2,
      startMessagePosition: message.position,
      prompt: firstReadableUserLine(message.text) ?? message.text,
      state: parsed.state,
      startedAt: message.timestampMs,
      endedAt: parsed.lastActivityTs
    }));
  }
  return turns.map((turn) => {
    const startMessagePosition = turn.startMessagePosition ?? messages.find(
      (message) => message.role === "user" && turn.messagePositions?.includes(message.position)
    )?.position ?? firstUserPosition;
    const startMessage = messageByPosition.get(startMessagePosition);
    return {
      position: turn.position,
      startMessagePosition: startMessage?.role === "user" ? startMessagePosition : firstUserPosition,
      prompt: firstReadableUserLine(turn.prompt) ?? turn.prompt,
      state: turn.state,
      startedAt: turn.startedAt,
      endedAt: turn.endedAt
    };
  });
}
function mapSubAgents(parsed) {
  if (!parsed.subAgents?.length) return void 0;
  return parsed.subAgents.map((subAgent) => ({
    id: subAgent.id,
    title: subAgent.title,
    prompt: subAgent.prompt,
    state: subAgent.state
  }));
}
function defaultProjectInfo(projectPath, parsed, branchLabel) {
  return desktopSearch.describeProjectPath(projectPath, parsed.branch ?? branchLabel?.(projectPath));
}
function latestTimestamp(values, fallback) {
  let latest = 0;
  for (const value of values) {
    if (value !== void 0 && value > latest) latest = value;
  }
  return latest || fallback;
}
function shouldProjectStateFromActivity(parsed, messages) {
  if (parsed.state === "idle") return messages.length > 0 || parsed.toolCalls.length > 0;
  if (parsed.state === "running") return true;
  if (parsed.state !== "inactive" && parsed.state !== "failed") return false;
  return hasActivityAfterTerminalSignal(parsed, messages);
}
function conversationIdentity(input) {
  const fileId = input.sourcePath.split(/[\\/]/).pop()?.replace(/\.jsonl$/, "") || input.parsed.ref;
  if (input.source === "codex" && input.parsed.ref) return input.parsed.ref;
  if (input.source === "claude" && input.parsed.sessionId) return input.parsed.sessionId;
  return fileId;
}
function projectCanonicalParserConversation(input) {
  const messages = mapMessages(input.parsed);
  const toolCalls = mapToolCalls(input.parsed, messages);
  const todos = mapTodos(input.parsed);
  const userTurns = mapUserTurns(input.parsed, messages);
  const localCommandOnly = input.source === "claude" && (input.parsed.messages.some((message) => isClaudeLocalCommandCaveat(message.text)) || isClaudeLocalCommandCaveat(input.parsed.preview)) && messages.length === 0 && toolCalls.length === 0 && todos.length === 0 && userTurns.length === 0;
  const lastUser = [...messages].reverse().find((message) => message.role === "user");
  const lastAssistant = [...messages].reverse().find((message) => message.role === "assistant");
  const lastToolMessage = [...messages].reverse().find((message) => message.role === "tool");
  const lastToolCall = input.parsed.toolCalls.at(-1);
  const lastActivityTs = latestTimestamp(
    [
      ...messages.map((message) => message.timestampMs),
      ...input.parsed.toolCalls.flatMap((toolCall) => [toolCall.startedAtMs, toolCall.endedAtMs])
    ],
    input.sourceMtimeMs
  );
  const projectPath = input.parsed.cwd ?? input.parsed.projectRoot ?? input.fallbackProject;
  const info = input.resolveProjectInfo ? input.resolveProjectInfo(projectPath, input.parsed) : defaultProjectInfo(projectPath, input.parsed, input.branchLabel);
  const lastKind = localCommandOnly ? "other" : deriveLastKind(input.parsed, messages);
  const id = conversationIdentity(input);
  const nowMs = input.now?.() ?? Date.now();
  const needsApproval = input.externalNeedsApproval === true || hasFreshPendingApproval(
    pendingApprovalTimes(input.source, toolCalls, lastActivityTs),
    nowMs,
    CLAUDE_APPROVAL_ATTENTION_MS
  );
  const externalIsRunning = input.externalIsRunning === true;
  const lastToolResultTs = lastToolMessage?.timestampMs ?? lastToolCall?.endedAtMs;
  const hasUnansweredToolResult = input.source === "claude" && input.parsed.state === "finished" && lastToolResultTs !== void 0 && lastToolResultTs > (lastAssistant?.timestampMs ?? 0);
  const projectedLastKind = hasUnansweredToolResult ? "user" : lastKind;
  const classifyFromActivity = shouldProjectStateFromActivity(input.parsed, messages) || needsApproval || hasUnansweredToolResult;
  const activityState = localCommandOnly ? "idle" : classifyFromActivity ? classifyActivity(
    {
      lastEventTs: lastActivityTs,
      lastEventKind: projectedLastKind,
      lastMessageTs: projectedLastKind === "assistant-tool-use" ? void 0 : lastAssistant?.timestampMs,
      lastToolCallTs: lastToolCall?.startedAtMs,
      lastToolResultTs,
      needsApproval
    },
    nowMs
  ) : input.parsed.state;
  const stopMarkerTs = latestToolUseStopMarkerTs(input.parsed, messages);
  const projectedState = externalIsRunning && !needsApproval ? "running" : stopMarkerTs > 0 && shouldProjectStateFromActivity(input.parsed, messages) && stoppedAfterLatestAssistantAction({
    stopMarker: stopMarkerTs,
    lastToolCall: lastToolCall?.startedAtMs ?? 0,
    lastMessage: lastAssistant?.timestampMs ?? 0,
    lastUserMessage: lastUser?.timestampMs ?? 0
  }) ? "idle" : input.parsed.state === "running" && !localCommandOnly ? needsApproval ? "needs-approval" : "running" : activityState;
  return {
    conv: {
      id,
      source: input.source,
      project: projectPath,
      ref: input.source === "claude" && input.parsed.ref ? input.parsed.ref : input.sourcePath,
      lastActivityTs,
      startedAt: input.parsed.startedAt,
      cwd: input.parsed.cwd,
      projectName: info.project,
      projectRoot: input.parsed.projectRoot ?? info.projectRoot,
      workspaceName: input.parsed.workspaceName ?? info.worktree,
      workspaceKind: info.toolingDir,
      branch: input.parsed.branch ?? info.branch,
      parentThreadId: input.parsed.parentThreadId,
      threadSource: input.parsed.threadSource,
      subagentKind: input.parsed.subagentKind,
      title: input.parsed.title,
      preview: localCommandOnly ? "" : input.parsed.preview,
      lastUserMessage: lastUser ? firstReadableUserLine(lastUser.text) : void 0,
      lastUserMessageTs: lastUser?.timestampMs,
      lastMessage: lastAssistant ? jsonlFiles.compactReadable(lastAssistant.text) : void 0,
      lastMessageTs: lastAssistant?.timestampMs,
      lastToolCall: lastToolCall ? toolCallLabel(lastToolCall) : void 0,
      lastToolInput: lastToolCall ? toolCallInputText(lastToolCall) : void 0,
      lastToolCallTs: lastToolCall?.startedAtMs,
      lastToolResult: lastToolMessage ? jsonlFiles.compactReadable(lastToolMessage.text) : lastToolCall?.resultText ? jsonlFiles.compactReadable(lastToolCall.resultText) : void 0,
      lastToolResultTs,
      needsApproval: needsApproval || projectedState === "needs-approval" || input.parsed.state === "needs-approval",
      todos: todos.length > 0 ? todos : void 0,
      subAgents: mapSubAgents(input.parsed),
      state: projectedState,
      ...projectedState === "failed" && input.parsed.activityReason ? { failureReason: input.parsed.activityReason } : {},
      lastKind: projectedLastKind
    },
    transcript: {
      messages,
      toolCalls,
      todoLists: todos.length > 0 ? [{ source: "transcript", todos }] : [],
      userTurns,
      sourceBytesParsed: input.sourceSize
    },
    sourcePath: input.sourcePath,
    sourceMtimeMs: input.sourceMtimeMs,
    sourceSize: input.sourceSize
  };
}
function canonicalParserProjectionToParsedConversation(projection) {
  const messages = projection.transcript.messages.map(
    (message) => ({
      position: message.position,
      ...message.id ? { id: message.id } : {},
      role: message.role,
      text: message.text,
      timestampMs: message.timestampMs,
      ...message.source ? { ext: { source: message.source } } : {}
    })
  );
  const toolCalls = projection.transcript.toolCalls.map(
    (toolCall) => ({
      toolUseId: toolCall.toolUseId,
      sourceEventPosition: toolCall.sourceEventPosition,
      resultEventPosition: toolCall.resultEventPosition,
      name: toolCall.name,
      input: toolCall.input,
      resultText: toolCall.resultText,
      isError: toolCall.isError,
      startedAtMs: toolCall.startedAtMs,
      endedAtMs: toolCall.endedAtMs
    })
  );
  const todoLists = projection.transcript.todoLists.map((todoList) => ({
    source: todoList.source,
    todos: todoList.todos.map((todo) => ({ ...todo }))
  }));
  const userTurns = projection.transcript.userTurns.map(
    (turn) => ({ ...turn })
  );
  const conv = {
    ...projection.conv,
    todos: projection.conv.todos?.map((todo) => ({ ...todo })),
    subAgents: projection.conv.subAgents?.map(
      (subAgent) => ({ ...subAgent })
    )
  };
  return {
    conv,
    transcript: {
      messages,
      toolCalls,
      todoLists,
      userTurns,
      sourceBytesParsed: projection.transcript.sourceBytesParsed
    },
    sourcePath: projection.sourcePath,
    sourceMtimeMs: projection.sourceMtimeMs,
    sourceSize: projection.sourceSize
  };
}
function projectCanonicalParserParsedConversation(input) {
  return canonicalParserProjectionToParsedConversation(projectCanonicalParserConversation(input));
}
const CODEX_ROLLOUT_TIMESTAMP_RE = /(?:^|\/)rollout-(\d{4}-\d{2}-\d{2}T\d{2})-(\d{2})-(\d{2})/;
function conversationSourcePathTimestampMs(path) {
  const match = CODEX_ROLLOUT_TIMESTAMP_RE.exec(desktopSearch.normalizePathSeparators(path));
  if (!match) return 0;
  const parsed = Date.parse(`${match[1]}:${match[2]}:${match[3]}`);
  return Number.isFinite(parsed) ? parsed : 0;
}
function conversationSourceRecencyMs(meta) {
  return Math.max(meta.mtimeMs, conversationSourcePathTimestampMs(meta.path));
}
function newestConversationSourceFirst(a, b) {
  return conversationSourceRecencyMs(b) - conversationSourceRecencyMs(a) || b.mtimeMs - a.mtimeMs || a.path.localeCompare(b.path);
}
function relativeToHome(file, home) {
  const normalizedFile = desktopSearch.normalizePathSeparators(file);
  const normalizedHome = desktopSearch.normalizePathSeparators(home);
  return normalizedFile.startsWith(normalizedHome) ? normalizedFile.slice(normalizedHome.length) : normalizedFile;
}
function claudeProjectNameFromPath(file, home) {
  const rel = relativeToHome(file, home);
  const match = rel.match(/\.claude\/projects\/([^/]+)/);
  if (!match) return "claude";
  return "claude";
}
function isClaudeTranscriptMeta(meta, cutoffMs) {
  const normalizedPath = desktopSearch.normalizePathSeparators(meta.path);
  const filename = normalizedPath.slice(normalizedPath.lastIndexOf("/") + 1);
  return !normalizedPath.includes("/subagents/") && !/^agent-[^/]+\.jsonl$/i.test(filename) && meta.size !== 0 && meta.mtimeMs >= cutoffMs;
}
function cursorProjectNameFromPath(file, home) {
  const rel = relativeToHome(file, home);
  const match = rel.match(/\.cursor\/projects\/([^/]+)/);
  if (!match) return "cursor";
  return match[1].replace(/-/g, "/");
}
function cursorCwdFromProjectPath(file) {
  const match = desktopSearch.normalizePathSeparators(file).match(/\.cursor\/projects\/([^/]+)/);
  if (!match) return void 0;
  const slug = match[1];
  if (/^\d+$/.test(slug)) return void 0;
  return `/${slug.replace(/-/g, "/")}`;
}
function isCursorAgentTranscriptMeta(meta, cutoffMs) {
  const normalizedPath = desktopSearch.normalizePathSeparators(meta.path);
  return normalizedPath.includes("/agent-transcripts/") && !normalizedPath.includes("/subagents/") && meta.mtimeMs >= cutoffMs;
}
function isSessionJsonlSourceMeta(meta, root, cutoffMs) {
  return meta.path.startsWith(root) && meta.path.endsWith(".jsonl") && meta.mtimeMs >= cutoffMs;
}
async function discoverConversationSourceMetas(root, ports, opts = {}) {
  const byPath = /* @__PURE__ */ new Map();
  for (const meta of await ports.walk(root, { shouldStop: opts.shouldStop })) {
    byPath.set(meta.path, meta);
  }
  for (const meta of ports.getKnownFiles()) {
    if (!meta.path.startsWith(root)) continue;
    const existing = byPath.get(meta.path);
    if (!existing || meta.mtimeMs > existing.mtimeMs) byPath.set(meta.path, meta);
  }
  return [...byPath.values()].sort(newestConversationSourceFirst);
}
function codexSessionRoot(pathApi) {
  return pathApi.join(pathApi.homedir(), ".codex", "sessions");
}
function codexSessionIndexPathFromRoot(root) {
  return `${desktopSearch.normalizePathSeparators(root).replace(/\/sessions\/?$/, "")}/session_index.jsonl`;
}
function codexSessionIndexPathForSession(file) {
  const normalized = desktopSearch.normalizePathSeparators(file);
  const marker = "/.codex/sessions/";
  const markerIndex = normalized.indexOf(marker);
  if (markerIndex < 0) return null;
  return `${normalized.slice(0, markerIndex + "/.codex".length)}/session_index.jsonl`;
}
function piSessionRoot(pathApi) {
  return pathApi.join(pathApi.homedir(), ".pi", "agent", "sessions");
}
function codexFallbackProjectFromSessionPath(_file, _home) {
  return "codex";
}
function sessionJsonlFallbackProject(source, file, home) {
  const rel = relativeToHome(file, home);
  return rel.split("/").slice(0, 5).join("/") || source;
}
function conversationWatchRoots(home, cursorStatePaths) {
  const normalizedHome = desktopSearch.normalizePathSeparators(home).replace(/\/$/, "");
  return [
    `${normalizedHome}/.claude/projects`,
    `${normalizedHome}/.claude/tasks`,
    `${normalizedHome}/.cursor/projects`,
    `${normalizedHome}/.codex/sessions`,
    `${normalizedHome}/.codex/session_index.jsonl`,
    `${normalizedHome}/.pi/agent/sessions`,
    `${normalizedHome}/.omp/agent/sessions`,
    ...cursorStatePaths
  ];
}
function cursorUserDataDir(input) {
  const { platform, env, homeDir, path } = input;
  if (platform === "win32") {
    return path.join(env.APPDATA ?? path.join(homeDir, "AppData", "Roaming"), "Cursor");
  }
  if (platform === "darwin") {
    return path.join(homeDir, "Library", "Application Support", "Cursor");
  }
  return path.join(env.XDG_CONFIG_HOME ?? path.join(homeDir, ".config"), "Cursor");
}
function cursorStateDbPath(input) {
  return input.path.join(cursorUserDataDir(input), "User", "globalStorage", "state.vscdb");
}
function cursorComposerStatePaths$1(cursorStateDb2) {
  return [cursorStateDb2, `${cursorStateDb2}-wal`, `${cursorStateDb2}-shm`];
}
function isConversationWatchFile(path, cursorStatePaths) {
  return path.endsWith(".jsonl") || cursorStatePaths.has(path);
}
function shouldIgnoreConversationWatchPath(path, stats, cursorStatePaths) {
  return stats?.isFile() === true && !isConversationWatchFile(path, cursorStatePaths);
}
const SQLITE_FULL_CODE = "SQLITE_FULL";
const SQLITE_FULL_MESSAGE_PATTERN = /database or disk is full/i;
function errorMessage$3(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function primaryErrorLine$2(message) {
  const firstLine = message.split("\n", 1)[0]?.trim() ?? "";
  return firstLine.replace(/^(?:Sqlite)?Error:\s*/i, "").trim();
}
function readSqliteCode(error) {
  if (!error || typeof error !== "object") return void 0;
  if (!("code" in error)) return void 0;
  const value = error.code;
  return typeof value === "string" ? value : void 0;
}
function haystackFor(error) {
  const message = errorMessage$3(error).trim();
  const primary = primaryErrorLine$2(message);
  return [message, primary].filter(Boolean).join("\n");
}
function isExpectedSqliteDiskFullError(error) {
  if (readSqliteCode(error) === SQLITE_FULL_CODE) return true;
  return SQLITE_FULL_MESSAGE_PATTERN.test(haystackFor(error));
}
const CLAUDE_CANONICAL_PARSER_BINDING_UNAVAILABLE_MESSAGE = "Claude canonical parser binding is unavailable.";
const CANONICAL_PARSER_UNAVAILABLE_MESSAGES = /* @__PURE__ */ new Set([
  CLAUDE_CANONICAL_PARSER_BINDING_UNAVAILABLE_MESSAGE,
  "Cursor canonical parser unavailable",
  "Codex canonical parser unavailable",
  "Pi canonical parser unavailable",
  "OMP canonical parser unavailable",
  // session-jsonl Claude display-name shape (distinct from the binding message).
  "Claude canonical parser unavailable"
]);
const PARSER_TEMP_DIR_PATTERN = /blume-parser(?:-output)?-/i;
const ENOSPC_MESSAGE_PATTERN = /\bENOSPC\b|no space left on device/i;
const OS_ERROR_ENOSPC_PATTERN = /\bos error 28\b/i;
const ENOENT_MESSAGE_PATTERN = /\bENOENT\b|no such file or directory/i;
const MISSING_FILE_SYSCALLS = /* @__PURE__ */ new Set(["stat", "lstat", "open"]);
const MISSING_FILE_SYSCALL_MESSAGE_PATTERN = /\b(?:stat|lstat|open)\b/i;
const PARSER_TEMP_ENOSPC_SYSCALLS = /* @__PURE__ */ new Set(["mkdtemp", "open", "write", "read"]);
const PARSER_TEMP_ENOSPC_SYSCALL_MESSAGE_PATTERN = /\b(?:mkdtemp|open|write|read)\b/i;
const MASKED_ENOSPC_SYSCALLS = /* @__PURE__ */ new Set(["open", "write"]);
const MASKED_ENOSPC_SYSCALL_MESSAGE_PATTERN = /\b(?:open|write)\b/i;
const HARNESS_PARSER_EXITED_PATTERN = /\bharness-parser exited (?:\d+|0x[0-9a-fA-F]+)\b/i;
const PRINTING_TO_STDOUT_PATTERN = /failed printing to stdout|printing to stdout/i;
const HARNESS_PARSER_WINDOWS_HARD_FAULT_EXIT_PATTERN = /\bharness-parser exited (?:3221225477|3221226505|3221225794|0x[cC]0000005|0x[cC]0000409|0x[cC]0000142)\b/;
const HARNESS_PARSER_MEMORY_ALLOCATION_FAILED_PATTERN = /memory allocation of \d+ bytes failed/i;
const SPAWN_SYNC_EXPECTED_CODE_MESSAGE_PATTERN = /\bspawnSync\b\s+(?:(?:[^\n]*[\\/])?harness-parser(?:\.exe)?|\[Path\])\s+(?:ENOENT|UNKNOWN|EACCES|EPERM)\b/i;
const HARNESS_PARSER_BINARY_PATTERN = /(?:^|[\\/])harness-parser(?:\.exe)?$/i;
const ENOTEMPTY_MESSAGE_PATTERN = /\bENOTEMPTY\b|directory not empty/i;
const PARSER_TEMP_CLEANUP_SYSCALLS = /* @__PURE__ */ new Set(["rmdir", "rm", "unlink"]);
const PARSER_TEMP_CLEANUP_SYSCALL_MESSAGE_PATTERN = /\b(?:rmdir|rmSync|unlink)\b/i;
const MASKED_PATH_PATTERN = /\[Path\]/;
const PROVIDER_SESSION_PATH_PATTERN = /(?:\/\.codex\/sessions\/|\/\.codex\/session_index\.jsonl|\/\.claude\/projects\/|\/\.claude\/tasks\/|\/\.cursor\/projects\/|\/\.pi\/(?:agent\/)?sessions\/|\/\.omp\/(?:agent\/)?sessions\/)/i;
function errorMessage$2(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function primaryErrorLine$1(message) {
  const firstLine = message.split("\n", 1)[0]?.trim() ?? "";
  return firstLine.replace(/^Error:\s*/i, "").trim();
}
function readStringProperty(error, key) {
  if (!error || typeof error !== "object") return void 0;
  if (!(key in error)) return void 0;
  const value = error[key];
  return typeof value === "string" ? value : void 0;
}
function normalizePathText(text) {
  return text.replace(/\\/g, "/");
}
function mentionsParserTempDir(text) {
  return PARSER_TEMP_DIR_PATTERN.test(text);
}
function isEnospc(error, text) {
  if (readStringProperty(error, "code") === "ENOSPC") return true;
  return ENOSPC_MESSAGE_PATTERN.test(text);
}
function isDiskFullSignal(error, text) {
  return isEnospc(error, text) || OS_ERROR_ENOSPC_PATTERN.test(text);
}
function isEnoent(error, text) {
  if (readStringProperty(error, "code") === "ENOENT") return true;
  return ENOENT_MESSAGE_PATTERN.test(text);
}
function isEnotempty(error, text) {
  if (readStringProperty(error, "code") === "ENOTEMPTY") return true;
  return ENOTEMPTY_MESSAGE_PATTERN.test(text);
}
function isParserTempEnospcSyscall(error, text) {
  const syscall = readStringProperty(error, "syscall");
  if (syscall && PARSER_TEMP_ENOSPC_SYSCALLS.has(syscall)) return true;
  return PARSER_TEMP_ENOSPC_SYSCALL_MESSAGE_PATTERN.test(text);
}
function isParserTempPath(error, text) {
  const path = readStringProperty(error, "path");
  if (path && mentionsParserTempDir(path)) return true;
  return mentionsParserTempDir(text);
}
function isMaskedEnospcSyscall(error, text) {
  const syscall = readStringProperty(error, "syscall");
  if (syscall && MASKED_ENOSPC_SYSCALLS.has(syscall)) return true;
  return MASKED_ENOSPC_SYSCALL_MESSAGE_PATTERN.test(text);
}
function isMissingFileSyscall(error, text) {
  const syscall = readStringProperty(error, "syscall");
  if (syscall && MISSING_FILE_SYSCALLS.has(syscall)) return true;
  return MISSING_FILE_SYSCALL_MESSAGE_PATTERN.test(text);
}
function isProviderSessionPath(text) {
  return PROVIDER_SESSION_PATH_PATTERN.test(normalizePathText(text));
}
function isMaskedPath(text) {
  return MASKED_PATH_PATTERN.test(text);
}
function isMissingSessionFilePath(error, text) {
  const path = readStringProperty(error, "path");
  if (path && (isProviderSessionPath(path) || isMaskedPath(path))) return true;
  return isProviderSessionPath(text) || isMaskedPath(text);
}
function isParserTempEnospc(error, haystack) {
  if (!isEnospc(error, haystack)) return false;
  if (isParserTempEnospcSyscall(error, haystack) && isParserTempPath(error, haystack)) {
    return true;
  }
  return isMaskedEnospcSyscall(error, haystack) && isMaskedPath(haystack);
}
function isMissingSessionFileEnoent(error, haystack) {
  if (!isEnoent(error, haystack)) return false;
  if (!isMissingFileSyscall(error, haystack)) return false;
  return isMissingSessionFilePath(error, haystack);
}
function isHarnessParserStdoutEnospc(error, haystack) {
  if (!HARNESS_PARSER_EXITED_PATTERN.test(haystack)) return false;
  if (!PRINTING_TO_STDOUT_PATTERN.test(haystack)) return false;
  return isDiskFullSignal(error, haystack);
}
function isHarnessParserWindowsHardFaultExit(haystack) {
  return HARNESS_PARSER_WINDOWS_HARD_FAULT_EXIT_PATTERN.test(haystack);
}
function isHarnessParserMemoryAllocationFailed(haystack) {
  if (!HARNESS_PARSER_EXITED_PATTERN.test(haystack)) return false;
  return HARNESS_PARSER_MEMORY_ALLOCATION_FAILED_PATTERN.test(haystack);
}
function isSpawnSyncPermissionDenied(error, text) {
  const code = readStringProperty(error, "code");
  if (code === "EACCES" || code === "EPERM") return true;
  return /\b(?:EACCES|EPERM)\b/.test(text);
}
function isSpawnSyncExpectedCode(error, text) {
  const code = readStringProperty(error, "code");
  if (code === "UNKNOWN" || /\bUNKNOWN\b/.test(text)) return true;
  if (isSpawnSyncPermissionDenied(error, text)) return true;
  return isEnoent(error, text);
}
function isHarnessParserOrMaskedSpawnSyncPath(error) {
  const path = readStringProperty(error, "path");
  if (!path) return false;
  return HARNESS_PARSER_BINARY_PATTERN.test(path) || MASKED_PATH_PATTERN.test(path);
}
function isHarnessParserSpawnSyncExpected(error, haystack) {
  if (!isSpawnSyncExpectedCode(error, haystack)) return false;
  const messageMatches = SPAWN_SYNC_EXPECTED_CODE_MESSAGE_PATTERN.test(haystack);
  const syscall = readStringProperty(error, "syscall");
  if (syscall === "spawnSync") {
    return isHarnessParserOrMaskedSpawnSyncPath(error) || messageMatches;
  }
  return messageMatches;
}
function isParserTempCleanupSyscall(error, text) {
  const syscall = readStringProperty(error, "syscall");
  if (syscall && PARSER_TEMP_CLEANUP_SYSCALLS.has(syscall)) return true;
  return PARSER_TEMP_CLEANUP_SYSCALL_MESSAGE_PATTERN.test(text);
}
function isParserTempCleanupEnotempty(error, haystack) {
  if (!isEnotempty(error, haystack)) return false;
  const directoryNotEmpty = /directory not empty/i.test(haystack);
  if (!directoryNotEmpty && !isParserTempCleanupSyscall(error, haystack)) return false;
  return isParserTempPath(error, haystack) || isMaskedPath(haystack);
}
function isCanonicalParserBindingUnavailable(primary) {
  if (!primary) return false;
  return CANONICAL_PARSER_UNAVAILABLE_MESSAGES.has(primary);
}
function isExpectedConversationParserEnvironmentalError(error) {
  const message = errorMessage$2(error).trim();
  const code = readStringProperty(error, "code");
  if (!message && code !== "ENOSPC" && code !== "ENOENT" && code !== "UNKNOWN" && code !== "EACCES" && code !== "EPERM" && code !== "ENOTEMPTY") {
    return false;
  }
  const primary = primaryErrorLine$1(message);
  const haystack = [message, primary].filter(Boolean).join("\n");
  if (isCanonicalParserBindingUnavailable(primary)) return true;
  if (isParserTempEnospc(error, haystack)) return true;
  if (isMissingSessionFileEnoent(error, haystack)) return true;
  if (isHarnessParserStdoutEnospc(error, haystack)) return true;
  if (isHarnessParserWindowsHardFaultExit(haystack)) return true;
  if (isHarnessParserMemoryAllocationFailed(haystack)) return true;
  if (isHarnessParserSpawnSyncExpected(error, haystack)) return true;
  return isParserTempCleanupEnotempty(error, haystack);
}
const CONVERSATION_REFRESH_WORKER_UNAVAILABLE_ERROR_NAME = "ConversationRefreshWorkerUnavailableError";
const CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE = "refresh worker unresponsive";
const CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE = "refresh worker menu snapshot unresponsive";
const CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE = "refresh worker disposed";
const CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE = "conversation refresh worker disabled";
const CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE = "refresh worker circuit breaker is cooling down";
const EXPECTED_CONVERSATION_REFRESH_WORKER_OPERATIONAL_MESSAGES = /* @__PURE__ */ new Set([
  CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE,
  CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE,
  CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE,
  CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE,
  CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE
]);
function errorName(error) {
  if (error instanceof Error) return error.name;
  return null;
}
function errorMessage$1(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function isExpectedConversationRefreshWorkerOperationalError(error) {
  if (errorName(error) !== CONVERSATION_REFRESH_WORKER_UNAVAILABLE_ERROR_NAME) return false;
  return EXPECTED_CONVERSATION_REFRESH_WORKER_OPERATIONAL_MESSAGES.has(errorMessage$1(error));
}
const CLAUDE_CANONICAL_PARSING_STOPPED_MESSAGE = "Claude canonical parsing stopped.";
const CURSOR_CANONICAL_PARSING_STOPPED_MESSAGE = "Cursor canonical parsing stopped.";
const CODEX_CANONICAL_PARSER_STOPPED_MESSAGE = "Codex canonical parser skipped because ingestion stopped";
const EXACT_PROVIDER_STOP_MESSAGES = /* @__PURE__ */ new Set([
  CLAUDE_CANONICAL_PARSING_STOPPED_MESSAGE,
  CURSOR_CANONICAL_PARSING_STOPPED_MESSAGE,
  CODEX_CANONICAL_PARSER_STOPPED_MESSAGE
]);
const SESSION_JSONL_PARSER_STOPPED_PATTERN = /^.+ canonical parser skipped because ingestion stopped$/;
function errorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function primaryErrorLine(message) {
  const firstLine = message.split("\n", 1)[0]?.trim() ?? "";
  return firstLine.replace(/^Error:\s*/i, "").trim();
}
function isExpectedConversationProviderStopError(error) {
  const message = errorMessage(error).trim();
  if (!message) return false;
  if (EXACT_PROVIDER_STOP_MESSAGES.has(message)) return true;
  const primary = primaryErrorLine(message);
  if (!primary) return false;
  if (EXACT_PROVIDER_STOP_MESSAGES.has(primary)) return true;
  return SESSION_JSONL_PARSER_STOPPED_PATTERN.test(primary);
}
function shouldReportConversationProviderAppError(error) {
  if (isExpectedConversationProviderStopError(error)) return false;
  if (isExpectedConversationParserEnvironmentalError(error)) return false;
  if (isExpectedSqliteDiskFullError(error)) return false;
  return !isExpectedConversationRefreshWorkerOperationalError(error);
}
function sourceVersionFromMtime(mtimeMs, sourceSize) {
  return { sourceMtimeMs: mtimeMs, ...sourceSize === void 0 ? {} : { sourceSize }, sourceCursor: null };
}
function sourceVersionFromMetaTree(meta) {
  return sourceVersionFromMtime(
    Math.max(meta.mtimeMs, ...(meta.relatedMetas ?? []).map((m) => m.mtimeMs)),
    meta.size ?? void 0
  );
}
function sourceVersionFromParsed(parsed) {
  return {
    sourceMtimeMs: parsed.sourceMtimeMs,
    ...(() => {
      const sourceSize = parsed.sourceSize ?? parsed.transcript?.sourceBytesParsed;
      return sourceSize === void 0 ? {} : { sourceSize };
    })(),
    sourceCursor: parsed.composerStateMtimeMs === void 0 ? null : String(parsed.composerStateMtimeMs)
  };
}
async function currentSourceVersion(provider, meta, opts) {
  return provider.currentSourceVersion ? await provider.currentSourceVersion(meta, opts) : sourceVersionFromMetaTree(meta);
}
function sourceVersionsMatch(stored, current) {
  if (!stored) return false;
  return stored.sourceMtimeMs === current.sourceMtimeMs && (stored.sourceSize ?? null) === (current.sourceSize ?? null) && (stored.sourceCursor ?? null) === (current.sourceCursor ?? null);
}
async function shouldSkipSource(provider, meta, opts) {
  const stored = opts?.skipIfSourceMatches?.get(meta.path);
  if (!stored) return false;
  return sourceVersionsMatch(stored, await currentSourceVersion(provider, meta, opts));
}
async function captureError$4(port, key, error, context) {
  await port?.captureError?.(key, error, context);
}
async function listCodexSessionMetas(root, ports, shouldStop) {
  const metas = await discoverConversationSourceMetas(root, ports, { shouldStop });
  const indexPath = codexSessionIndexPathFromRoot(root);
  let indexMeta = null;
  try {
    const stat = await ports.stat(indexPath);
    indexMeta = { path: indexPath, mtimeMs: stat.mtimeMs, size: stat.size };
  } catch {
    indexMeta = null;
  }
  if (!indexMeta) return metas;
  return metas.map((meta) => ({
    ...meta,
    relatedMetas: [...meta.relatedMetas ?? [], indexMeta]
  }));
}
function cleanTitle(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function parseCodexSessionIndexTitle(raw, sessionId) {
  let title;
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim()) continue;
    let record;
    try {
      const parsed = JSON.parse(line);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
      record = parsed;
    } catch {
      continue;
    }
    if (record.id !== sessionId) continue;
    title = cleanTitle(record.thread_name) ?? title;
  }
  return title;
}
async function readCodexSessionIndex(sessionPath, sessionId, ports) {
  const indexPath = codexSessionIndexPathForSession(sessionPath);
  if (!indexPath || !ports.readText) return void 0;
  let raw;
  try {
    raw = await ports.readText(indexPath);
  } catch {
    return void 0;
  }
  const title = parseCodexSessionIndexTitle(raw, sessionId);
  let mtimeMs = 0;
  try {
    mtimeMs = (await ports.stat(indexPath)).mtimeMs;
  } catch {
    mtimeMs = 0;
  }
  return title ? { title, mtimeMs } : { mtimeMs };
}
async function summarizeCodexSessionConversation(input, ports) {
  let mtimeMs = input.knownMtimeMs ?? 0;
  let sourceSize = 0;
  if (input.knownMtimeMs === void 0) {
    try {
      const stat = await ports.stat(input.path);
      mtimeMs = stat.mtimeMs;
      sourceSize = stat.size;
    } catch (err) {
      if (shouldReportConversationProviderAppError(err)) {
        void captureError$4(ports.telemetry, "main.parser.stat", err, {
          provider: "codex",
          source_path: input.path
        });
      }
    }
  }
  if (!input.canonicalParser) {
    const err = new Error("Codex canonical parser unavailable");
    if (shouldReportConversationProviderAppError(err)) {
      void captureError$4(ports.telemetry, "main.parser.codex-canonical", err, {
        provider: "codex",
        source_path: input.path,
        source_bytes: sourceSize || void 0
      });
    }
    throw err;
  }
  try {
    if (input.shouldStop?.()) throw new Error(CODEX_CANONICAL_PARSER_STOPPED_MESSAGE);
    const parsed = await input.canonicalParser.parse({
      path: input.path,
      fallbackProject: input.fallbackProject,
      sourceMtimeMs: mtimeMs
    });
    const index2 = await readCodexSessionIndex(input.path, parsed.conv.id, ports);
    if (!index2) return parsed;
    return {
      ...parsed,
      ...index2.title ? { conv: { ...parsed.conv, title: index2.title } } : {},
      sourceMtimeMs: Math.max(parsed.sourceMtimeMs, index2.mtimeMs)
    };
  } catch (err) {
    if (shouldReportConversationProviderAppError(err)) {
      void captureError$4(ports.telemetry, "main.parser.codex-canonical", err, {
        provider: "codex",
        source_path: input.path,
        source_bytes: sourceSize || void 0
      });
    }
    throw err;
  }
}
function createCodexSessionConversationProvider(input) {
  const provider = {
    source: "codex",
    currentSourceVersion: input.provider?.currentSourceVersion,
    async *iterate(listOpts) {
      if (listOpts?.shouldStop?.()) return;
      const cutoff = listOpts?.maxAgeMs ? (input.ports.now?.() ?? Date.now()) - listOpts.maxAgeMs : 0;
      const discovered = await listCodexSessionMetas(input.root, input.ports, listOpts?.shouldStop);
      listOpts?.onDiscovered?.(
        oldestMtime$4(
          discovered.filter((meta) => listOpts?.allowSource?.("codex", meta.path) ?? true)
        )
      );
      const metas = discovered.filter((meta) => meta.mtimeMs >= cutoff).filter(
        (meta) => (listOpts?.mtimeBeforeMs == null || meta.mtimeMs < listOpts.mtimeBeforeMs) && (listOpts?.mtimeAfterMs == null || meta.mtimeMs >= listOpts.mtimeAfterMs)
      ).filter((meta) => !listOpts?.targetPaths || listOpts.targetPaths.includes(meta.path)).filter((meta) => listOpts?.allowSource?.("codex", meta.path) ?? true);
      const canonicalParser = await input.ports.canonicalParser?.() ?? null;
      for (const meta of metas) {
        const { path, mtimeMs } = meta;
        if (listOpts?.shouldStop?.()) return;
        const storedSourceVersion = listOpts?.skipIfSourceMatches?.get(path);
        if (storedSourceVersion) {
          const currentSourceVersion2 = provider.currentSourceVersion ? await provider.currentSourceVersion(meta, listOpts) : sourceVersionFromMetaTree(meta);
          if (sourceVersionsMatch(storedSourceVersion, currentSourceVersion2)) continue;
        }
        yield await summarizeCodexSessionConversation(
          {
            path,
            fallbackProject: input.ports.fallbackProject(path),
            knownMtimeMs: mtimeMs,
            shouldStop: listOpts?.shouldStop,
            canonicalParser: canonicalParser ?? void 0
          },
          input.ports
        );
      }
    }
  };
  return provider;
}
function oldestMtime$4(metas) {
  let oldest = null;
  for (const meta of metas) if (oldest === null || meta.mtimeMs < oldest) oldest = meta.mtimeMs;
  return oldest;
}
const TITLE_WRITABLE_SOURCES = /* @__PURE__ */ new Set(["claude", "pi", "omp"]);
function normalizeConversationTitle(title) {
  const normalized = title.trim();
  if (!normalized) throw new Error("Title cannot be empty.");
  return normalized;
}
function isTitleWritableSource(source) {
  return TITLE_WRITABLE_SOURCES.has(source);
}
async function applyConversationTitle(input, deps) {
  if (!await deps.isEnabled()) {
    throw new Error("Applying titles to harness conversations is disabled.");
  }
  const normalized = normalizeConversationTitle(input.title);
  const row = await deps.getConversationByRef(input.ref);
  if (!row) throw new Error(`Unknown conversation: ${input.ref}`);
  if (row.source !== input.source) {
    throw new Error(`Conversation source mismatch: expected ${row.source}, got ${input.source}.`);
  }
  if (!isTitleWritableSource(input.source)) {
    throw new Error(`Applying titles to ${input.source} conversations is not supported.`);
  }
  if (input.source === "claude") {
    await deps.writeClaudeTitle(conversationIdFromRef(input.ref), normalized);
  } else {
    await deps.appendSessionInfoTitle(input.ref, normalized);
  }
  await deps.setTitle(input.ref, normalized, "provider");
}
async function setConversationUserTitle(input, deps) {
  await deps.setTitle(input.ref, input.title, "user");
}
async function revertConversationTitleToProvider(input, deps) {
  const row = await deps.getConversationByRef(input.ref);
  if (!row) throw new Error(`unknown conversation: ${input.ref}`);
  const title = row.provider_title?.trim();
  if (!title) throw new Error("No provider title is available for this conversation");
  await deps.setTitle(input.ref, title, "provider");
  return title;
}
function buildSessionInfoTitleAppend(transcript, title, deps) {
  const normalized = normalizeConversationTitle(title);
  const ids = /* @__PURE__ */ new Set();
  let parentId = null;
  let sawHeader = false;
  for (const line of transcript.split("\n")) {
    if (!line.trim()) continue;
    const obj = parseJsonObjectRecord(line);
    if (!obj) continue;
    if (!sawHeader) {
      if (obj.type !== "session") throw new Error("Session file is missing a Pi session header.");
      sawHeader = true;
    }
    if (typeof obj.id === "string") {
      ids.add(obj.id);
      if (obj.type !== "session") parentId = obj.id;
    }
  }
  if (!sawHeader) throw new Error("Session file is empty.");
  const entry = {
    type: "session_info",
    id: shortId(ids, deps.createId),
    parentId,
    timestamp: deps.nowIso(),
    name: normalized
  };
  const prefix = transcript.length > 0 && !transcript.endsWith("\n") ? "\n" : "";
  return { prefix, line: `${prefix}${JSON.stringify(entry)}
`, entry };
}
async function appendSessionInfoTitleToFile(path, title, deps) {
  const transcript = await deps.readFile(path);
  const append = buildSessionInfoTitleAppend(transcript, title, deps);
  await deps.appendFile(path, append.line);
  return append;
}
function shortId(existing, createId) {
  for (let i = 0; i < 100; i++) {
    const id = createId().slice(0, 8);
    if (!existing.has(id)) return id;
  }
  return createId();
}
function conversationIdFromRef(ref) {
  return ref.split(/[\\/]/).pop()?.replace(/\.jsonl$/, "") ?? "";
}
const MAX_TITLE_WORDS = 3;
const CONVERSATION_TITLE_SYSTEM_PROMPT = `You generate short, descriptive titles for coding-agent conversations.
Rules:
- Prefer 1 to 2 words.
- Use 3 words only when needed for clarity.
- Never exceed 3 words.
- Title case is fine; no trailing punctuation.
- No quotes, no emoji, no prefixes like "Conversation about".
- Focus on the user's actual task or goal, not the agent's tools.
Reply with ONLY the title, nothing else.`;
function buildConversationTitleExcerpt(messages, maxChars = 4e3) {
  const firstUser = messages.find((m) => m.role === "user");
  const tail = messages.slice(-12);
  const seen = /* @__PURE__ */ new Set();
  const lines = [];
  for (const m of firstUser ? [firstUser, ...tail] : tail) {
    const key = `${m.role}:${m.text.slice(0, 80)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const text = m.text.replace(/\s+/g, " ").trim();
    if (!text) continue;
    lines.push(`${m.role}: ${text}`);
  }
  let out = lines.join("\n");
  if (out.length > maxChars) out = `${out.slice(0, maxChars)}…`;
  return out;
}
function cleanGeneratedConversationTitle(raw) {
  const firstLine = raw.split("\n").map((line) => line.trim()).find(Boolean);
  if (!firstLine) return "";
  const title = firstLine.replace(/^["'`]+|["'`]+$/g, "").replace(/^(?:title|conversation):\s*/i, "").replace(/[.!?]+$/, "").trim();
  return title.split(/\s+/).filter(Boolean).slice(0, MAX_TITLE_WORDS).join(" ");
}
async function generateConversationTitle(messages, deps) {
  if (messages.length === 0) {
    throw new Error("Conversation has no messages");
  }
  const excerpt = buildConversationTitleExcerpt(messages);
  const title = await deps.chat(
    [
      { role: "system", content: CONVERSATION_TITLE_SYSTEM_PROMPT },
      { role: "user", content: `Conversation transcript:

${excerpt}` }
    ],
    { maxTokens: 20, temperature: 0.3 }
  );
  return cleanGeneratedConversationTitle(title);
}
const MENU_BAR_ACTIVE_WINDOW_MS = 24 * 60 * 60 * 1e3;
const MENU_BAR_ACTIVE_CONVERSATION_LIMIT = 12;
const TRAY_STATUS_COLORS = {
  running: "#8a8680",
  waiting: "#fb923c",
  finished: "#5b8fd6"
};
const TRAY_STATUS_FILL_COLORS = {
  running: "#42403d",
  waiting: "#78461d",
  finished: "#2c4567"
};
const TRAY_IMAGE_HEIGHT = 22;
const TRAY_IMAGE_SCALE = 2;
const TRAY_FLOWER_SIZE = 20;
const TRAY_FLOWER_Y = 1;
const TRAY_STATUS_CIRCLE_SIZE = 12;
const TRAY_STATUS_ITEM_WIDTH = 15;
const TRAY_STATUS_GAP = 3.5;
const TRAY_COUNTER_GAP = 2.5;
const TRAY_STATUS_BADGE_HEIGHT = 7;
const TRAY_STATUS_BADGE_MIN_WIDTH = 7;
const TRAY_STATUS_BADGE_PADDING_X = 1.75;
const TRAY_STATUS_BADGE_OVERHANG = 3.2;
const TRAY_STATUS_RING_STROKE_WIDTH = 1.05;
const TRAY_STATUS_GLYPH_STROKE_WIDTH = 1.05;
const TRAY_USAGE_PROGRESS_STROKE_WIDTH = 1.15;
const TRAY_USAGE_ICON_SIZE = 6.6;
const TRAY_SEPARATOR_WIDTH = 1;
const TRAY_SEPARATOR_HEIGHT = 8;
const TRAY_SEPARATOR_GAP = 4;
const TRAY_ANIMATION_FRAME_MS = 120;
const TRAY_RUNNING_ANIMATION_FRAMES = 24;
const TRAY_WAITING_ANIMATION_STEP = Math.PI * 2 / 12;
const TRAY_STATUS_BADGE_FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';
const TRAY_STATUS_BADGE_FONT_SIZE = 5.8;
const TRAY_STATUS_BADGE_FONT_WEIGHT = 600;
const TRAY_MONO_INK = "rgba(0, 0, 0, 1)";
const TRAY_COLORED_INK = "rgba(255, 255, 255, 0.96)";
const TRAY_MONO_SEPARATOR_INK = "rgba(0, 0, 0, 0.28)";
const TRAY_COLORED_SEPARATOR_INK = "rgba(255, 255, 255, 0.26)";
const MENU_BAR_USAGE_PROVIDER_ORDER = ["cursor", "claude", "codex"];
const MENU_BAR_USAGE_PROVIDER_LABELS = {
  cursor: "Cursor",
  claude: "Claude",
  codex: "Codex"
};
function currentSessionUsageWindow(windows) {
  return windows.find((window) => window.id === "session") ?? windows.find((window) => /\bsession\b/i.test(window.label)) ?? null;
}
function formatMenuBarUsageReset(resetsAt, now) {
  if (!resetsAt) return null;
  const remainingMs = resetsAt - now;
  if (remainingMs <= 0) return "resets soon";
  const minutes = Math.ceil(remainingMs / 6e4);
  if (minutes < 60) return `resets in ${minutes}m`;
  const hours = Math.ceil(minutes / 60);
  if (hours < 48) return `resets in ${hours}h`;
  return `resets in ${Math.ceil(hours / 24)}d`;
}
function menuBarUsageItemFromWindow(snapshot, window, now) {
  if (snapshot.status !== "ok" || !window || window.usedPercent === null) return null;
  const usedPercent = Math.min(100, Math.max(0, window.usedPercent));
  return {
    windowId: window.id,
    label: window.label,
    remainingPercent: 100 - usedPercent,
    resetText: formatMenuBarUsageReset(window.resetsAt, now)
  };
}
function projectMenuBarUsage(report, visibleProviders, now = Date.now()) {
  const byProvider = /* @__PURE__ */ new Map();
  for (const snapshot of report?.providers ?? []) byProvider.set(snapshot.provider, snapshot);
  const items = visibleProviders.flatMap((provider) => {
    const snapshot = byProvider.get(provider);
    if (!snapshot) return [];
    const windows = snapshot.windows.flatMap((window) => {
      const item = menuBarUsageItemFromWindow(snapshot, window, now);
      return item ? [item] : [];
    });
    return windows.length > 0 ? [{ provider, windows }] : [];
  });
  const indicators = visibleProviders.flatMap((provider) => {
    const snapshot = byProvider.get(provider);
    if (!snapshot) return [];
    const item = menuBarUsageItemFromWindow(
      snapshot,
      currentSessionUsageWindow(snapshot.windows),
      now
    );
    return item ? [{ provider, ...item }] : [];
  });
  return { items, indicators };
}
const TRAY_USAGE_COLORS = {
  cursor: "#1f2024",
  claude: "#cc7a4a",
  codex: "#556cdb"
};
const TRAY_USAGE_BACKDROP_COLORS = {
  cursor: "#42403d",
  claude: "#42403d",
  codex: "#283477"
};
const MENU_BAR_STATUS_COLORS = {
  running: "#8a8680",
  "needs-approval": "#fb923c",
  failed: "#e25d5d",
  finished: "#5b8fd6",
  idle: "#a09886",
  inactive: "#a09886"
};
const MENU_BAR_HARNESS_COLORS = {
  cursor: "#1f2024",
  claude: "#cc7a4a",
  codex: "#556cdb",
  pi: "#0a0a0a",
  omp: "#0f0a14"
};
const MENU_BAR_DEFAULT_STATUS_COLOR = "#a09886";
const MENU_BAR_DEFAULT_HARNESS_COLOR = "#4b5563";
function menuBarTrayCountLabel(count) {
  return count > 99 ? "99+" : String(count);
}
function visibleMenuBarTrayCounters(counts) {
  const counters = [
    { status: "running", count: counts.running, label: menuBarTrayCountLabel(counts.running) },
    { status: "waiting", count: counts.waiting, label: menuBarTrayCountLabel(counts.waiting) },
    { status: "finished", count: counts.finished, label: menuBarTrayCountLabel(counts.finished) }
  ];
  return counters.filter((counter) => counter.count > 0).map(({ count: _count, ...counter }) => counter);
}
function shouldAnimateMenuBarIcon(counts) {
  return counts.running > 0 || counts.waiting > 0;
}
function menuBarColorForStatus(state) {
  return MENU_BAR_STATUS_COLORS[state] ?? MENU_BAR_DEFAULT_STATUS_COLOR;
}
function menuBarColorForHarness(source) {
  return MENU_BAR_HARNESS_COLORS[source] ?? MENU_BAR_DEFAULT_HARNESS_COLOR;
}
function createMenuBarTrayIconRenderPayload({
  counts,
  colored,
  statusIndicatorsFilled,
  animationFrame,
  flowerDataUrl,
  usageIndicators = [],
  harnessIconDataUrls = {},
  monoInk = TRAY_MONO_INK,
  coloredInk = TRAY_COLORED_INK,
  flowerInk
}) {
  return {
    height: TRAY_IMAGE_HEIGHT,
    scale: TRAY_IMAGE_SCALE,
    flowerSize: TRAY_FLOWER_SIZE,
    flowerY: TRAY_FLOWER_Y,
    statusCircleSize: TRAY_STATUS_CIRCLE_SIZE,
    statusItemWidth: TRAY_STATUS_ITEM_WIDTH,
    statusGap: TRAY_STATUS_GAP,
    counterGap: TRAY_COUNTER_GAP,
    statusBadgeFontFamily: TRAY_STATUS_BADGE_FONT_FAMILY,
    statusBadgeFontSize: TRAY_STATUS_BADGE_FONT_SIZE,
    statusBadgeFontWeight: TRAY_STATUS_BADGE_FONT_WEIGHT,
    statusBadgeHeight: TRAY_STATUS_BADGE_HEIGHT,
    statusBadgeMinWidth: TRAY_STATUS_BADGE_MIN_WIDTH,
    statusBadgePaddingX: TRAY_STATUS_BADGE_PADDING_X,
    statusBadgeOverhang: TRAY_STATUS_BADGE_OVERHANG,
    colored,
    statusIndicatorsFilled,
    animationFrame,
    flowerDataUrl,
    flowerInk: flowerInk ?? (colored ? coloredInk : monoInk),
    monoInk,
    coloredInk,
    statusColors: TRAY_STATUS_COLORS,
    statusFillColors: TRAY_STATUS_FILL_COLORS,
    usageColors: TRAY_USAGE_COLORS,
    usageBackdropColors: TRAY_USAGE_BACKDROP_COLORS,
    harnessIconDataUrls: {
      cursor: harnessIconDataUrls.cursor ?? null,
      claude: harnessIconDataUrls.claude ?? null,
      codex: harnessIconDataUrls.codex ?? null
    },
    counters: visibleMenuBarTrayCounters(counts),
    usageIndicators
  };
}
function menuBarTrayIconWidth(payload) {
  const statusWidth = payload.counters.length > 0 ? (payload.counters.length - 1) * (payload.statusItemWidth + payload.counterGap) + payload.statusCircleSize : 0;
  const usageWidth = payload.usageIndicators.length * payload.statusCircleSize + Math.max(0, payload.usageIndicators.length - 1) * payload.counterGap;
  let width = payload.flowerSize;
  if (statusWidth > 0) {
    width += TRAY_SEPARATOR_GAP * 2 + TRAY_SEPARATOR_WIDTH + statusWidth;
  } else if (usageWidth > 0) {
    width += payload.statusGap;
  }
  if (usageWidth > 0) {
    width += (statusWidth > 0 ? TRAY_SEPARATOR_GAP * 2 + TRAY_SEPARATOR_WIDTH : 0) + usageWidth;
  }
  return Math.ceil(width + 1);
}
function clampMenuBarPercent(value) {
  return Math.min(100, Math.max(0, value));
}
function createMenuBarUsageGlyphSvg(provider, cx, cy, paint, payload, index2) {
  const icon = payload.harnessIconDataUrls[provider];
  if (icon) {
    const size = TRAY_USAGE_ICON_SIZE;
    const maskId = `menu-bar-usage-glyph-${index2}`;
    return `<mask id="${maskId}" mask-type="alpha"><image href="${escapeMenuBarSvgText(icon)}" x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}"/></mask><rect x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" fill="${paint}" mask="url(#${maskId})"/>`;
  }
  return `<text x="${cx}" y="${cy + 0.2}" text-anchor="middle" dominant-baseline="central" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif" font-size="6" font-weight="700" fill="${paint}">${provider.slice(0, 1).toUpperCase()}</text>`;
}
function createMenuBarUsageIndicatorSvg(indicator, x, index2, payload) {
  const cx = x + payload.statusCircleSize / 2;
  const cy = payload.height / 2;
  const radius = payload.statusCircleSize / 2;
  const percent = clampMenuBarPercent(indicator.remainingPercent);
  const accent = payload.colored ? payload.usageColors[indicator.provider] : payload.monoInk;
  const backdrop = payload.colored ? payload.usageBackdropColors[indicator.provider] : "rgba(0, 0, 0, 0.22)";
  const glyphPaint = payload.colored ? payload.coloredInk : payload.monoInk;
  const circumference = 2 * Math.PI * (radius - TRAY_USAGE_PROGRESS_STROKE_WIDTH / 2);
  const progress = circumference * percent / 100;
  if (payload.statusIndicatorsFilled) {
    const clipId = `menu-bar-usage-fill-${index2}`;
    const fillHeight = radius * 2 * percent / 100;
    return `<clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${radius}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${radius}" fill="${backdrop}"/><rect x="${cx - radius}" y="${cy + radius - fillHeight}" width="${radius * 2}" height="${fillHeight}" fill="${accent}" clip-path="url(#${clipId})"/>${createMenuBarUsageGlyphSvg(indicator.provider, cx, cy, glyphPaint, payload, index2)}`;
  }
  return `${payload.colored ? `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${backdrop}"/>` : ""}<circle cx="${cx}" cy="${cy}" r="${radius - TRAY_USAGE_PROGRESS_STROKE_WIDTH / 2}" fill="none" stroke="${backdrop}" stroke-width="${TRAY_USAGE_PROGRESS_STROKE_WIDTH}"/><circle cx="${cx}" cy="${cy}" r="${radius - TRAY_USAGE_PROGRESS_STROKE_WIDTH / 2}" fill="none" stroke="${accent}" stroke-width="${TRAY_USAGE_PROGRESS_STROKE_WIDTH}" stroke-linecap="round" stroke-dasharray="${progress} ${circumference}" transform="rotate(-90 ${cx} ${cy})"/>${createMenuBarUsageGlyphSvg(indicator.provider, cx, cy, accent, payload, index2)}`;
}
function estimateMenuBarBadgeWidth(label, payload) {
  const digitWidth = 3.55;
  const plusWidth = 3.2;
  const labelWidth = [...label].reduce(
    (width, char) => width + (char === "+" ? plusWidth : digitWidth),
    0
  );
  return Math.max(
    payload.statusBadgeMinWidth,
    Math.ceil(labelWidth + payload.statusBadgePaddingX * 2)
  );
}
function createMenuBarFallbackFlowerSvg(payload, paint) {
  const cx = payload.flowerSize / 2;
  const cy = payload.flowerY + payload.flowerSize / 2;
  const petals = Array.from({ length: 5 }, (_value, index2) => {
    const angle = Math.PI * 2 * index2 / 5 - Math.PI / 2;
    const x = cx + Math.cos(angle) * 4.6;
    const y = cy + Math.sin(angle) * 4.6;
    const degrees = angle * 180 / Math.PI;
    return `<ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="3.7" ry="5.2" transform="rotate(${degrees.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})"/>`;
  }).join("");
  return `<g fill="${paint}">${petals}<circle cx="${cx}" cy="${cy}" r="3.1"/></g>`;
}
function createMenuBarStatusGlyphSvg(status, cx, cy, paint, animationFrame) {
  if (status === "running") {
    const rotation = animationFrame % TRAY_RUNNING_ANIMATION_FRAMES / TRAY_RUNNING_ANIMATION_FRAMES * 360 - 77;
    return `<circle cx="${cx}" cy="${cy}" r="3.05" fill="none" stroke="${paint}" stroke-width="${TRAY_STATUS_GLYPH_STROKE_WIDTH}" stroke-linecap="round" stroke-dasharray="15.1 4.2" transform="rotate(${rotation.toFixed(2)} ${cx} ${cy})"/>`;
  }
  if (status === "waiting") {
    const pulse = (Math.sin(animationFrame * TRAY_WAITING_ANIMATION_STEP) + 1) / 2;
    return `<circle cx="${cx}" cy="${cy}" r="${(1.15 + pulse * 0.55).toFixed(2)}" fill="${paint}"/>`;
  }
  return `<path d="M ${cx - 3} ${cy - 0.15} L ${cx - 0.9} ${cy + 2.05} L ${cx + 3.25} ${cy - 3}" fill="none" stroke="${paint}" stroke-width="${TRAY_STATUS_GLYPH_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function createMenuBarStatusBadgeSvg(counter, x, index2, payload) {
  const badgeHeight = payload.statusBadgeHeight;
  const badgeWidth = estimateMenuBarBadgeWidth(counter.label, payload);
  const badgeX = x + payload.statusCircleSize + payload.statusBadgeOverhang - badgeWidth;
  const badgeY = 1.15;
  const textX = badgeX + badgeWidth / 2;
  const textY = badgeY + badgeHeight / 2 + 0.1;
  const label = escapeMenuBarSvgText(counter.label);
  const badgePaint = payload.colored ? payload.statusFillColors[counter.status] : payload.monoInk;
  const textPaint = payload.colored ? payload.coloredInk : "rgba(0, 0, 0, 1)";
  const fontAttributes = `font-family="${escapeMenuBarSvgText(payload.statusBadgeFontFamily)}" font-size="${payload.statusBadgeFontSize}" font-weight="${payload.statusBadgeFontWeight}"`;
  if (payload.colored) {
    return `
      <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" rx="${badgeHeight / 2}" fill="${badgePaint}"/>
      <text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="central" ${fontAttributes} fill="${textPaint}">${label}</text>`;
  }
  const maskId = `menu-bar-badge-mask-${index2}`;
  return `
    <mask id="${maskId}">
      <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" rx="${badgeHeight / 2}" fill="white"/>
      <text x="${textX}" y="${textY}" text-anchor="middle" dominant-baseline="central" ${fontAttributes} fill="black">${label}</text>
    </mask>
    <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" rx="${badgeHeight / 2}" fill="${badgePaint}" mask="url(#${maskId})"/>`;
}
function createMenuBarStatusIndicatorSvg(counter, x, index2, payload) {
  const status = counter.status;
  const circleX = x + payload.statusCircleSize / 2;
  const circleY = payload.height / 2;
  const accentPaint = payload.colored ? payload.statusColors[status] : payload.monoInk;
  const fillPaint = payload.colored ? payload.statusColors[status] : payload.monoInk;
  const backdropPaint = payload.colored ? payload.statusFillColors[status] : payload.monoInk;
  const glyphPaint = payload.colored ? payload.coloredInk : payload.monoInk;
  const badge = createMenuBarStatusBadgeSvg(counter, x, index2, payload);
  if (payload.statusIndicatorsFilled) {
    if (payload.colored) {
      return `
        <circle cx="${circleX}" cy="${circleY}" r="${payload.statusCircleSize / 2}" fill="${fillPaint}"/>
        ${createMenuBarStatusGlyphSvg(status, circleX, circleY, glyphPaint, payload.animationFrame)}
        ${badge}`;
    }
    const maskId = `menu-bar-status-mask-${index2}`;
    return `
      <mask id="${maskId}">
        <circle cx="${circleX}" cy="${circleY}" r="${payload.statusCircleSize / 2}" fill="white"/>
        ${createMenuBarStatusGlyphSvg(status, circleX, circleY, "black", payload.animationFrame)}
      </mask>
      <circle cx="${circleX}" cy="${circleY}" r="${payload.statusCircleSize / 2}" fill="${fillPaint}" mask="url(#${maskId})"/>
      ${badge}`;
  }
  const backdrop = payload.colored ? `<circle cx="${circleX}" cy="${circleY}" r="${payload.statusCircleSize / 2}" fill="${backdropPaint}"/>` : "";
  return `
    ${backdrop}
    <circle cx="${circleX}" cy="${circleY}" r="${payload.statusCircleSize / 2 - 0.75}" fill="none" stroke="${accentPaint}" stroke-width="${TRAY_STATUS_RING_STROKE_WIDTH}"/>
    ${createMenuBarStatusGlyphSvg(status, circleX, circleY, accentPaint, payload.animationFrame)}
    ${badge}`;
}
function createMenuBarTrayIconSvg(payload) {
  const width = menuBarTrayIconWidth(payload);
  const flower = payload.flowerDataUrl ? `<mask id="menu-bar-flower-mask" mask-type="alpha"><image href="${escapeMenuBarSvgText(payload.flowerDataUrl)}" x="0" y="${payload.flowerY}" width="${payload.flowerSize}" height="${payload.flowerSize}"/></mask><rect x="0" y="${payload.flowerY}" width="${payload.flowerSize}" height="${payload.flowerSize}" fill="${payload.flowerInk}" mask="url(#menu-bar-flower-mask)"/>` : createMenuBarFallbackFlowerSvg(payload, payload.flowerInk);
  const separator = (x) => `<rect x="${x}" y="${(payload.height - TRAY_SEPARATOR_HEIGHT) / 2}" width="${TRAY_SEPARATOR_WIDTH}" height="${TRAY_SEPARATOR_HEIGHT}" rx="${TRAY_SEPARATOR_WIDTH / 2}" fill="${payload.colored ? TRAY_COLORED_SEPARATOR_INK : TRAY_MONO_SEPARATOR_INK}"/>`;
  let statusX = payload.flowerSize;
  let separators = "";
  if (payload.counters.length > 0) {
    statusX += TRAY_SEPARATOR_GAP;
    separators += separator(statusX);
    statusX += TRAY_SEPARATOR_WIDTH + TRAY_SEPARATOR_GAP;
  } else if (payload.usageIndicators.length > 0) {
    statusX += payload.statusGap;
  }
  const statuses = payload.counters.map((counter, index2) => {
    const status = createMenuBarStatusIndicatorSvg(counter, statusX, index2, payload);
    statusX += index2 === payload.counters.length - 1 ? payload.statusCircleSize : payload.statusItemWidth + payload.counterGap;
    return status;
  }).join("");
  if (payload.counters.length > 0 && payload.usageIndicators.length > 0) {
    statusX += TRAY_SEPARATOR_GAP;
    separators += separator(statusX);
    statusX += TRAY_SEPARATOR_WIDTH + TRAY_SEPARATOR_GAP;
  }
  const usage = payload.usageIndicators.map((indicator, index2) => {
    const svg = createMenuBarUsageIndicatorSvg(indicator, statusX, index2, payload);
    statusX += payload.statusCircleSize + (index2 === payload.usageIndicators.length - 1 ? 0 : payload.counterGap);
    return svg;
  }).join("");
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${payload.height}" viewBox="0 0 ${width} ${payload.height}">
  ${flower}
  ${separators}
  ${statuses}
  ${usage}
</svg>`;
}
function escapeMenuBarSvgText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const MENU_BAR_AGENT_STATUS_LABELS = {
  running: "running",
  waiting: "waiting for approval",
  finished: "complete"
};
const CONVERSATION_STATUS_PRIORITY = {
  running: 0,
  "needs-approval": 1,
  failed: 2,
  finished: 3,
  idle: 4,
  inactive: 5
};
function basenameOnly(path) {
  const parts = path.split(/[\\/]/).filter(Boolean);
  return parts[parts.length - 1] ?? path;
}
function isMenuBarConversationVisible(conversation) {
  if (conversation.source === "codex" && index.isCodexSubagentThreadSource(conversation.thread_source))
    return false;
  return conversation.state !== "inactive" && conversation.state !== "idle";
}
function menuBarConversationTitle(conversation) {
  const cwdName = conversation.cwd ? basenameOnly(conversation.cwd) : null;
  const title = conversation.title ?? conversation.provider_title ?? conversation.preview ?? conversation.workspace ?? cwdName ?? "Untitled conversation";
  const cleaned = title.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 88) return cleaned || "Untitled conversation";
  return `${cleaned.slice(0, 85).trimEnd()}...`;
}
function compareMenuBarConversations(a, b) {
  const ap = CONVERSATION_STATUS_PRIORITY[a.state] ?? 99;
  const bp = CONVERSATION_STATUS_PRIORITY[b.state] ?? 99;
  return ap - bp || b.last_activity_ts - a.last_activity_ts;
}
function projectMenuBarConversation(conversation) {
  return {
    ref: conversation.ref,
    title: menuBarConversationTitle(conversation),
    source: conversation.source,
    state: conversation.state
  };
}
function projectMenuBarStatusCounts(conversations) {
  const counts = { running: 0, waiting: 0, finished: 0 };
  for (const conversation of conversations) {
    if (!isMenuBarConversationVisible(conversation)) continue;
    if (conversation.state === "running") counts.running += 1;
    else if (conversation.state === "needs-approval") counts.waiting += 1;
    else if (conversation.state === "finished") counts.finished += 1;
  }
  return counts;
}
function projectMenuBarConversations(conversations, options = {}) {
  const visible = conversations.filter(isMenuBarConversationVisible).sort(compareMenuBarConversations);
  const limited = options.limit === void 0 ? visible : visible.slice(0, options.limit);
  return {
    rows: limited.map(projectMenuBarConversation),
    totalConversationCount: visible.length,
    counts: projectMenuBarStatusCounts(conversations)
  };
}
async function loadMenuBarConversationProjection(conversations, nowMs = Date.now()) {
  const sinceMs = nowMs - MENU_BAR_ACTIVE_WINDOW_MS;
  const snapshot = await conversations.loadMenuBarConversationSnapshot({
    sinceMs,
    limit: MENU_BAR_ACTIVE_CONVERSATION_LIMIT + 1
  });
  return {
    ...projectMenuBarConversations(snapshot.rows, {
      limit: MENU_BAR_ACTIVE_CONVERSATION_LIMIT
    }),
    totalConversationCount: snapshot.totalConversationCount,
    counts: snapshot.counts
  };
}
const EVIDENCE_PINS_DIRNAME = "evidence-pins";
const EVIDENCE_PIN_LIMITS = {
  /** Pins read per pass; the rest wait for the next refresh. */
  files: 100,
  bytes: 32 * 1024,
  quoteChars: 4e3,
  /** Newest messages of a conversation searched for a quote. */
  messages: 2e3,
  /** Shortest quote that may identify a message. */
  minimumQuoteChars: 8
};
const SIGNAL_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
const SESSION_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,255}$/;
const HARNESS = /^[a-z][a-z0-9-]{0,31}$/;
function evidencePinFileName(signalId) {
  return SIGNAL_ID.test(signalId) ? `${signalId}.json` : null;
}
function evidencePinSignalId(fileName) {
  const match = /^(.+)\.json$/.exec(fileName);
  return match && SIGNAL_ID.test(match[1]) ? match[1] : null;
}
function parseEvidencePin(signalId, raw) {
  if (!SIGNAL_ID.test(signalId) || raw.length > EVIDENCE_PIN_LIMITS.bytes) return null;
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!value || typeof value !== "object") return null;
  const pin = value;
  const recordedAt = typeof pin.recordedAt === "string" ? Date.parse(pin.recordedAt) : pin.recordedAt;
  if (typeof pin.quote !== "string" || typeof pin.harness !== "string" || typeof pin.sessionId !== "string" || typeof recordedAt !== "number" || !Number.isFinite(recordedAt) || !HARNESS.test(pin.harness) || !SESSION_ID.test(pin.sessionId))
    return null;
  const quote = pin.quote.slice(0, EVIDENCE_PIN_LIMITS.quoteChars);
  if (normalizeEvidenceText(quote).length < EVIDENCE_PIN_LIMITS.minimumQuoteChars) return null;
  return { signalId, quote, harness: pin.harness, sessionId: pin.sessionId, recordedAt };
}
function normalizeEvidenceText(text) {
  return text.normalize("NFKC").replace(/[‘’‚‛]/g, "'").replace(/[“”„‟]/g, '"').replace(/[–—]/g, "-").replace(/…/g, "...").toLowerCase().replace(/\s+/g, " ").trim();
}
function matchEvidencePin(pin, messages) {
  const quote = normalizeEvidenceText(pin.quote);
  if (quote.length < EVIDENCE_PIN_LIMITS.minimumQuoteChars) return null;
  for (const message of messages) {
    if (message.role === "tool") continue;
    if (normalizeEvidenceText(message.text).includes(quote)) return message;
  }
  return null;
}
async function resolveEvidencePins(ports) {
  const resolved = [];
  const messagesByConversation = /* @__PURE__ */ new Map();
  for (const { signalId, raw } of await ports.listPins(EVIDENCE_PIN_LIMITS.files)) {
    const pin = parseEvidencePin(signalId, raw);
    if (!pin) continue;
    const conversation = await ports.references.findConversationBySession(pin.harness, pin.sessionId);
    if (!conversation) continue;
    let messages = messagesByConversation.get(conversation.id);
    if (!messages) {
      messages = await ports.references.listConversationMessages(
        conversation.id,
        EVIDENCE_PIN_LIMITS.messages
      );
      messagesByConversation.set(conversation.id, messages);
    }
    const message = matchEvidencePin(pin, messages);
    if (!message) continue;
    await ports.references.upsertConversationLink({
      conversationRef: conversation.ref,
      messageId: message.messageId,
      kind: "signal",
      cloudId: pin.signalId,
      createdAtMs: ports.now()
    });
    resolved.push({
      signalId: pin.signalId,
      messageId: message.messageId,
      conversationRef: conversation.ref
    });
  }
  return resolved;
}
const EVIDENCE_ELSEWHERE_MESSAGE = "This evidence is on another computer.";
async function locateEvidence(references, request) {
  const conversation = await references.findConversationBySession(request.harness, request.sessionId);
  if (!conversation) return { status: "elsewhere", message: EVIDENCE_ELSEWHERE_MESSAGE };
  const message = request.messageId ? await references.findConversationMessage(conversation.id, request.messageId) : null;
  return {
    status: "local",
    conversationRef: conversation.ref,
    message: message ? { eventId: message.eventId, turnPosition: message.turnPosition, role: message.role } : null
  };
}
const CONVERSATION_TARGETED_REFRESH_MAX_PATHS = 512;
function mergeConversationRefreshTargetPaths(current, incoming, maxPaths = CONVERSATION_TARGETED_REFRESH_MAX_PATHS) {
  if (current === null || incoming === null) return null;
  const limit = Math.max(1, Math.floor(maxPaths));
  for (const path of incoming) {
    current.add(path);
    if (current.size > limit) return null;
  }
  return current;
}
function createWatchRefreshScheduler(onRefresh, options) {
  const now = options.now ?? Date.now;
  const setTimer = options.setTimer ?? ((fn, delayMs) => setTimeout(fn, delayMs));
  const clearTimer = options.clearTimer ?? ((timer2) => clearTimeout(timer2));
  const gap = () => typeof options.minGapMs === "function" ? options.minGapMs() : options.minGapMs;
  const priorityGap = () => Math.min(gap(), options.priorityGapMs ?? gap());
  const fullGap = () => Math.max(options.fullRefreshMinGapMs ?? 0, gap());
  const maxTargetPaths = Math.max(
    1,
    Math.floor(options.maxTargetPaths ?? CONVERSATION_TARGETED_REFRESH_MAX_PATHS)
  );
  const smallPaths = /* @__PURE__ */ new Set();
  const largeFiles = /* @__PURE__ */ new Map();
  let fullPending = false;
  let lastRefreshAt = 0;
  let lastPriorityRefreshAt = 0;
  let lastFullRefreshAt = 0;
  let timer = null;
  let disposed = false;
  const promoteTargetOverflowToFullRefresh = () => {
    if (smallPaths.size + largeFiles.size <= maxTargetPaths) return;
    fullPending = true;
    smallPaths.clear();
    largeFiles.clear();
  };
  const largeDueAt = (file) => Math.min(
    file.lastChangedAtMs + options.largeIdleMs,
    file.firstDeferredAtMs + options.largeMaxDeferMs
  );
  const fullDueAt = () => lastFullRefreshAt + fullGap();
  const isPriority = (path) => options.isPriorityPath?.(path) === true;
  const priorityPaths = (at) => [
    ...[...smallPaths].filter(isPriority),
    ...[...largeFiles].filter(([path, file]) => isPriority(path) && at >= largeDueAt(file)).map(([path]) => path)
  ];
  const priorityDueAt = () => {
    let due = Infinity;
    for (const path of smallPaths) if (isPriority(path)) return 0;
    for (const [path, file] of largeFiles)
      if (isPriority(path)) due = Math.min(due, largeDueAt(file));
    return due;
  };
  const nextFlushAt = () => {
    let next = smallPaths.size > 0 ? 0 : Infinity;
    if (fullPending) next = Math.min(next, fullDueAt());
    for (const file of largeFiles.values()) next = Math.min(next, largeDueAt(file));
    if (next === Infinity) return next;
    const regular = Math.max(next, lastRefreshAt + gap());
    const priority = priorityDueAt();
    return priority === Infinity ? regular : Math.min(regular, Math.max(priority, lastPriorityRefreshAt + priorityGap()));
  };
  const arm = () => {
    if (disposed) return;
    if (timer !== null) clearTimer(timer);
    const at = nextFlushAt();
    timer = at === Infinity ? null : setTimer(flush, Math.max(0, at - now()));
  };
  const flush = () => {
    timer = null;
    if (disposed) return;
    const at = now();
    if (at < lastRefreshAt + gap()) {
      const priority = at >= lastPriorityRefreshAt + priorityGap() ? priorityPaths(at) : [];
      if (priority.length === 0) return arm();
      for (const path of priority) {
        smallPaths.delete(path);
        largeFiles.delete(path);
      }
      lastPriorityRefreshAt = at;
      onRefresh({ targetPaths: priority, invalidateDiscoveryCache: false });
      return arm();
    }
    const dueLarge = [...largeFiles].filter(([, file]) => at >= largeDueAt(file)).map(([path]) => path);
    const fullDue = fullPending && at >= fullDueAt();
    if (!fullDue && smallPaths.size === 0 && dueLarge.length === 0) return arm();
    const targetPaths = fullDue ? null : [...smallPaths, ...dueLarge];
    smallPaths.clear();
    if (fullDue) {
      fullPending = false;
      lastFullRefreshAt = at;
      largeFiles.clear();
    } else {
      for (const path of dueLarge) largeFiles.delete(path);
    }
    lastRefreshAt = at;
    lastPriorityRefreshAt = at;
    onRefresh({ targetPaths, invalidateDiscoveryCache: fullDue });
    arm();
  };
  return {
    handleChanges(changes) {
      if (disposed || changes.length === 0) return;
      const at = now();
      for (const change of changes) {
        if (options.isFullRefreshPath?.(change.path)) {
          fullPending = true;
        } else if (change.size >= options.largeFileBytes) {
          const prior = largeFiles.get(change.path);
          largeFiles.set(change.path, {
            firstDeferredAtMs: prior?.firstDeferredAtMs ?? at,
            lastChangedAtMs: at
          });
          smallPaths.delete(change.path);
        } else if (!largeFiles.has(change.path)) {
          smallPaths.add(change.path);
        }
        promoteTargetOverflowToFullRefresh();
      }
      arm();
    },
    reschedule() {
      arm();
    },
    requestFullRefresh() {
      if (disposed) return;
      fullPending = true;
      arm();
    },
    dispose() {
      disposed = true;
      if (timer !== null) clearTimer(timer);
      timer = null;
    }
  };
}
const CONVERSATION_DAY_MS = 24 * 60 * 60 * 1e3;
const CONVERSATION_WEEK_MS = 7 * CONVERSATION_DAY_MS;
const CONVERSATION_BACKFILL_DELAY_MS = 6e4;
const CODEX_PARSER_BACKFILL_KEY = "codex_parser_v13_at";
const CLAUDE_PARSER_BACKFILL_KEY = "claude_parser_v6_at";
const CLAUDE_TODO_BACKFILL_KEY = "claude_todo_turn_projection_v5_at";
const PROJECT_IDENTITY_BACKFILL_KEY = "project_identity_v1_at";
const HISTORY_DEFERRED_META_KEY = "history_deferred_v1";
const MAX_DEFERRED_SOURCES = 5e3;
function defaultTrack(_name, fn) {
  return fn();
}
function isoTimestamp(now) {
  return new Date(now).toISOString();
}
function defaultUnrefTimeout(handle) {
  if (typeof handle !== "object" || handle === null) return;
  const unref = handle.unref;
  if (typeof unref === "function") unref.call(handle);
}
function storedNothing(result) {
  if (!result || typeof result !== "object") return false;
  const { conversationId, skipped, sourceRecorded } = result;
  return skipped === true && conversationId === -1 && sourceRecorded !== true;
}
function createConversationRefreshService(deps) {
  const dayMs = deps.dayMs ?? CONVERSATION_DAY_MS;
  const weekMs = deps.weekMs ?? CONVERSATION_WEEK_MS;
  const waitingMs = deps.waitingMs ?? WAITING_MS;
  const backfillDelayMs = deps.backfillDelayMs ?? CONVERSATION_BACKFILL_DELAY_MS;
  const timers = deps.timers ?? {
    setTimeout: (callback, ms) => setTimeout(callback, ms),
    unrefTimeout: defaultUnrefTimeout
  };
  const now = deps.now ?? (() => Date.now());
  const track = deps.track ?? defaultTrack;
  let refreshStopRequested = false;
  const activeRefreshes = /* @__PURE__ */ new Set();
  let refreshInFlight = null;
  let pendingRefresh = null;
  function shouldStopRefresh() {
    return refreshStopRequested;
  }
  const activityCutoff = () => deps.activityCutoffMs?.() ?? now() - weekMs;
  let deferredCache = null;
  let deferredDirty = false;
  function deferredSources() {
    if (deferredCache) return deferredCache;
    try {
      deferredCache = JSON.parse(deps.getMeta(HISTORY_DEFERRED_META_KEY) ?? "{}");
    } catch {
      deferredCache = {};
    }
    return deferredCache;
  }
  let deferredVersions = [];
  async function flushDeferredSources() {
    if (deferredCache && deferredDirty)
      deps.setMeta(HISTORY_DEFERRED_META_KEY, JSON.stringify(deferredCache));
    deferredCache = null;
    deferredDirty = false;
    const versions = deferredVersions;
    deferredVersions = [];
    for (const version of versions) await deps.sourceCursors.upsertSourceCursor?.(version);
  }
  function deferSource(kind, path, lastActivityTs) {
    const deferred = deferredSources();
    if (!(path in deferred) && Object.keys(deferred).length >= MAX_DEFERRED_SOURCES) return false;
    deferred[path] = [kind, lastActivityTs];
    deferredDirty = true;
    return true;
  }
  async function admitDeferredSources() {
    const deferred = deferredSources();
    const cutoff = activityCutoff();
    const due = Object.entries(deferred).filter(([, [, at]]) => at >= cutoff);
    if (due.length === 0 || !deps.sourceCursors.upsertSourceCursor) return [];
    for (const [path, [kind]] of due) {
      await deps.sourceCursors.upsertSourceCursor({
        kind,
        path,
        lastMtimeMs: null,
        lastSize: null,
        lastCursor: null
      });
    }
    return due.map(([path]) => path);
  }
  function forgetDeferredSources(paths) {
    if (paths.length === 0) return;
    const deferred = deferredSources();
    for (const path of paths) delete deferred[path];
    deferredDirty = true;
  }
  async function isStaleUnstoredConversation(parsed, fullPass) {
    if (!fullPass || !deps.isStoredConversation || !deps.sourceCursors.upsertSourceCursor)
      return false;
    const lastActivityTs = parsed.conv.lastActivityTs;
    if (typeof lastActivityTs !== "number" || lastActivityTs >= activityCutoff()) return false;
    return !await deps.isStoredConversation(parsed.conv.ref);
  }
  async function runRefreshFromDisk(maxAgeMs = dayMs, targetPaths = null) {
    const capped = targetPaths === null && deps.mtimeAfterMs?.() != null ? maxAgeMs : Math.min(maxAgeMs, Math.max(weekMs, now() - activityCutoff()));
    try {
      return await runPass(capped, targetPaths);
    } finally {
      await flushDeferredSources();
    }
  }
  async function runPass(capped, targetPaths) {
    return track("conversations:refreshFromDisk", async () => {
      if (shouldStopRefresh()) return;
      const fullPass = targetPaths === null;
      const backfillCodexRows = fullPass && !deps.getMeta(CODEX_PARSER_BACKFILL_KEY);
      const backfillClaudeParserRows = fullPass && !deps.getMeta(CLAUDE_PARSER_BACKFILL_KEY);
      const backfillClaudeTodos = fullPass && !deps.getMeta(CLAUDE_TODO_BACKFILL_KEY);
      const backfillProjectIdentity = fullPass && !deps.getMeta(PROJECT_IDENTITY_BACKFILL_KEY);
      let projectIdentityBackfillSucceeded = true;
      const backfillClaudeRows = backfillClaudeParserRows || backfillClaudeTodos;
      const backfillKinds = /* @__PURE__ */ new Set();
      if (backfillCodexRows) backfillKinds.add("codex");
      if (backfillClaudeRows) backfillKinds.add("claude");
      if (backfillProjectIdentity) {
        for (const provider of deps.providers) backfillKinds.add(provider.source);
      }
      if (fullPass && deps.isSelfRunPath && deps.conversations.deleteConversationsBySourcePaths) {
        const selfRunSourcePaths = (await deps.sourceCursors.listSourceCursors()).map((cursor) => cursor.path).filter((path) => deps.isSelfRunPath?.(path) === true);
        if (selfRunSourcePaths.length > 0) {
          await deps.conversations.deleteConversationsBySourcePaths(selfRunSourcePaths);
        }
      }
      for (const kind of backfillKinds) await deps.sourceCursors.resetSourceCursorsForKind(kind);
      const admittedPaths = fullPass ? await admitDeferredSources() : [];
      const admitted = new Set(admittedPaths);
      const sourceCursors = await deps.sourceCursors.listSourceCursors();
      const skipIfSourceMatches = new Map(
        sourceCursors.map((cursor) => [
          cursor.path,
          {
            sourceMtimeMs: cursor.sourceMtimeMs,
            ...cursor.sourceSize == null ? {} : { sourceSize: cursor.sourceSize },
            sourceCursor: cursor.sourceCursor
          }
        ])
      );
      const mtimeBefore = fullPass ? deps.mtimeBeforeMs?.() ?? null : null;
      const mtimeAfter = fullPass ? deps.mtimeAfterMs?.() ?? null : null;
      let oldestSource = null;
      const noteOldest = (mtimeMs) => {
        if (mtimeMs !== null && (oldestSource === null || mtimeMs < oldestSource))
          oldestSource = mtimeMs;
      };
      for (const provider of deps.providers) {
        if (shouldStopRefresh()) return;
        let providerStoppedCooperatively = false;
        await track(`provider:${provider.source}.iterate`, async () => {
          try {
            for await (const parsed of provider.iterate({
              maxAgeMs: capped,
              allowSource: deps.allowSource,
              ...fullPass && deps.onOldestSource ? { onDiscovered: noteOldest } : {},
              ...fullPass && mtimeBefore != null ? { mtimeBeforeMs: mtimeBefore } : {},
              ...fullPass && mtimeAfter != null ? { mtimeAfterMs: mtimeAfter } : {},
              ...targetPaths === null ? {} : { targetPaths: [...targetPaths] },
              shouldStop: shouldStopRefresh,
              skipIfSourceMatches: provider.source === "codex" && backfillCodexRows || provider.source === "claude" && backfillClaudeRows || backfillProjectIdentity ? void 0 : skipIfSourceMatches
            })) {
              if (shouldStopRefresh()) return;
              admitted.delete(parsed.sourcePath);
              if (await isStaleUnstoredConversation(parsed, fullPass) && deferSource(provider.source, parsed.sourcePath, parsed.conv.lastActivityTs ?? 0)) {
                const version = sourceVersionFromParsed(parsed);
                deferredVersions.push({
                  kind: provider.source,
                  path: parsed.sourcePath,
                  lastMtimeMs: version.sourceMtimeMs,
                  lastSize: version.sourceSize ?? null,
                  lastCursor: version.sourceCursor,
                  lastFetchedAt: now()
                });
                skipIfSourceMatches.set(parsed.sourcePath, version);
                continue;
              }
              try {
                const result = await deps.ingestConversation(parsed);
                const version = sourceVersionFromParsed(parsed);
                if (fullPass && storedNothing(result)) {
                  await deps.sourceCursors.upsertSourceCursor?.({
                    kind: provider.source,
                    path: parsed.sourcePath,
                    lastMtimeMs: version.sourceMtimeMs,
                    lastSize: version.sourceSize ?? null,
                    lastCursor: version.sourceCursor,
                    lastFetchedAt: now()
                  });
                }
                skipIfSourceMatches.set(parsed.sourcePath, version);
              } catch (error) {
                if (backfillProjectIdentity) projectIdentityBackfillSucceeded = false;
                const context = {
                  provider: provider.source,
                  ref: parsed.conv.ref,
                  sourcePath: parsed.sourcePath
                };
                deps.onIngestError?.(error, context);
                deps.captureError?.("main.parser.ingest", error, {
                  provider: provider.source,
                  ref: parsed.conv.ref,
                  sourcePath: parsed.sourcePath
                });
              }
            }
          } catch (error) {
            if (isExpectedConversationProviderStopError(error)) {
              providerStoppedCooperatively = true;
              return;
            }
            if (shouldReportConversationProviderAppError(error)) {
              deps.captureError?.("main.parser.provider", error, { provider: provider.source });
            }
            throw error;
          }
        });
        if (providerStoppedCooperatively || shouldStopRefresh()) return;
      }
      if (shouldStopRefresh()) return;
      if (backfillCodexRows) {
        deps.setMeta(CODEX_PARSER_BACKFILL_KEY, isoTimestamp(now()));
      }
      if (backfillClaudeParserRows) {
        deps.setMeta(CLAUDE_PARSER_BACKFILL_KEY, isoTimestamp(now()));
      }
      if (backfillClaudeTodos) {
        deps.setMeta(CLAUDE_TODO_BACKFILL_KEY, isoTimestamp(now()));
      }
      if (backfillProjectIdentity && projectIdentityBackfillSucceeded) {
        deps.setMeta(PROJECT_IDENTITY_BACKFILL_KEY, isoTimestamp(now()));
      }
      if (admitted.size > 0 && !shouldStopRefresh())
        await runRefreshFromDisk(Number.MAX_SAFE_INTEGER, admitted);
      if (!shouldStopRefresh()) forgetDeferredSources(admittedPaths);
      if (fullPass) deps.onOldestSource?.(oldestSource);
      await deps.conversations.markStaleConversationsInactive(now() - waitingMs);
    });
  }
  async function runRefreshQueue(maxAgeMs, targetPaths) {
    let next = { maxAgeMs, targetPaths };
    while (!shouldStopRefresh()) {
      await runRefreshFromDisk(next.maxAgeMs, next.targetPaths);
      if (!pendingRefresh) return;
      next = pendingRefresh;
      pendingRefresh = null;
    }
  }
  function mergePendingRefresh(maxAgeMs, targetPaths) {
    const pending = pendingRefresh ?? { maxAgeMs: 0, targetPaths: /* @__PURE__ */ new Set() };
    pending.maxAgeMs = Math.max(pending.maxAgeMs, maxAgeMs);
    pending.targetPaths = mergeConversationRefreshTargetPaths(pending.targetPaths, targetPaths);
    pendingRefresh = pending;
  }
  async function refreshFromDisk(maxAgeMs = dayMs, options = {}) {
    if (shouldStopRefresh()) return;
    const targetPaths = options.targetPaths ? mergeConversationRefreshTargetPaths(/* @__PURE__ */ new Set(), options.targetPaths) : null;
    if (refreshInFlight) {
      mergePendingRefresh(maxAgeMs, targetPaths);
      return refreshInFlight;
    }
    const refresh = runRefreshQueue(maxAgeMs, targetPaths);
    refreshInFlight = refresh;
    activeRefreshes.add(refresh);
    try {
      await refresh;
    } finally {
      activeRefreshes.delete(refresh);
      if (refreshInFlight === refresh) refreshInFlight = null;
    }
  }
  async function bootIngest(options = {}) {
    await refreshFromDisk(dayMs);
    options.onFirstPassDone?.();
    const timeout = timers.setTimeout(() => {
      void refreshFromDisk(weekMs).catch((error) => {
        options.onBackfillError?.(error);
      });
    }, backfillDelayMs);
    timers.unrefTimeout?.(timeout);
  }
  return {
    dayMs,
    weekMs,
    shouldStopRefresh,
    requestStop() {
      refreshStopRequested = true;
    },
    resume() {
      refreshStopRequested = false;
      pendingRefresh = null;
    },
    async waitForRefreshes() {
      await Promise.allSettled(Array.from(activeRefreshes));
    },
    refreshFromDisk,
    bootIngest
  };
}
function createConversationUseCases(deps) {
  const readService = jsonlFiles.createConversationReadService({
    storage: deps.storage,
    liveTail: deps.liveTail,
    now: deps.now
  });
  return {
    listConversationRows(opts = {}) {
      return deps.storage.listConversations(opts);
    },
    countConversationRows(opts = {}) {
      return deps.storage.countConversations(opts);
    },
    getConversationRow(idOrRef) {
      return deps.storage.getConversationByIdentifier(idOrRef);
    },
    listConversationsForView(opts = {}) {
      return jsonlFiles.loadConversationListItemsForView(deps.storage, opts, deps.branchLabel);
    },
    getTranscript(ref, opts = {}) {
      return readService.getTranscript(ref, opts);
    },
    searchTranscript(ref, query, beforeTurnPosition) {
      return readService.searchTranscript(ref, query, beforeTurnPosition);
    },
    loadTitleMessages(ref) {
      return readService.load(ref);
    },
    async regenerateConversationTitle(input) {
      void input.source;
      const messages = await readService.load(input.ref);
      const title = await generateConversationTitle(messages, { chat: deps.title.chat });
      await deps.storage.setConversationTitle(input.ref, title, "llm");
      return title;
    },
    async applyGeneratedTitleToProvider(input) {
      await applyConversationTitle(input, {
        isEnabled: deps.title.isHarnessTitleWritebackEnabled,
        getConversationByRef: (ref) => deps.storage.getConversationTitle(ref),
        writeClaudeTitle: deps.title.writeClaudeTitle,
        appendSessionInfoTitle: deps.title.appendSessionInfoTitle,
        setTitle: (ref, title, source) => deps.storage.setConversationTitle(ref, title, source)
      });
    },
    async setUserTitle(input) {
      await setConversationUserTitle(input, {
        setTitle: (ref, title, source) => deps.storage.setConversationTitle(ref, title, source)
      });
    },
    async revertTitleToProvider(input) {
      return revertConversationTitleToProvider(input, {
        getConversationByRef: (ref) => deps.storage.getConversationByRef(ref),
        setTitle: (ref, title, source) => deps.storage.setConversationTitle(ref, title, source)
      });
    },
    dismissConversation(ref) {
      return readService.dismissConversation(ref);
    },
    setConversationIdle(ref) {
      return readService.setConversationIdle(ref);
    }
  };
}
function agentSessionKey(harness, sessionId) {
  return JSON.stringify([harness, sessionId]);
}
function registeredAgentSourceFilter(registrations) {
  const keys = new Set(
    registrations.map((agent) => agentSessionKey(agent.harness, agent.conversationId))
  );
  return (harness, path) => {
    const filename = path.replace(/\\/g, "/").split("/").pop() ?? "";
    if (!filename.endsWith(".jsonl")) return false;
    let id = filename.slice(0, -6);
    if (harness === "codex") {
      id = id.replace(/^rollout-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-/, "");
    } else if (harness === "pi" || harness === "omp") {
      id = id.replace(/^\d{4}-\d{2}-\d{2}T[\d_.:-]+Z_/, "");
    }
    return keys.has(agentSessionKey(harness, id));
  };
}
function projectConversationReplacementPersistence(input) {
  const title = input.title ?? null;
  return {
    project: {
      path: input.projectRoot,
      name: input.projectName,
      displayPath: input.cwd ?? null
    },
    conversation: {
      ref: input.ref,
      source: input.source,
      externalId: input.id ?? null,
      workspace: input.workspaceName ?? null,
      workspaceKind: input.workspaceKind ?? null,
      cwd: input.cwd ?? null,
      branch: input.branch ?? null,
      entrypoint: input.entrypoint ?? null,
      parentThreadId: input.parentThreadId ?? null,
      threadSource: input.threadSource ?? null,
      subagentKind: input.subagentKind ?? null,
      title,
      providerTitle: title,
      titleSource: title ? "provider" : null,
      preview: input.preview,
      state: input.state,
      failureReason: input.state === "failed" ? input.failureReason ?? null : null,
      latestUserTurnPosition: input.userTurns.map((turn) => turn.position).at(-1) ?? null,
      lastKind: input.lastKind ?? null,
      startedAt: input.startedAt ?? null,
      lastActivityTs: input.lastActivityTs,
      lastActivity: {
        user_message: input.lastUserMessage ?? void 0,
        user_message_ts: input.lastUserMessageTs ?? void 0,
        assistant_message: input.lastMessage ?? void 0,
        assistant_message_ts: input.lastMessageTs ?? void 0,
        tool_call: input.lastToolCall ?? void 0,
        tool_input: input.lastToolInput ?? void 0,
        tool_call_ts: input.lastToolCallTs ?? void 0,
        tool_result: input.lastToolResult ?? void 0,
        tool_result_ts: input.lastToolResultTs ?? void 0,
        needs_approval: input.needsApproval ?? void 0
      }
    },
    userTurns: input.userTurns.map((turn) => ({
      position: turn.position,
      prompt: turn.prompt,
      state: turn.state,
      startedAt: turn.startedAt ?? null,
      endedAt: turn.endedAt ?? null
    }))
  };
}
function eventKindFromRole(role) {
  if (role === "user") return "user_text";
  if (role === "tool") return "tool_result";
  return "assistant_text";
}
function partitionMessagesIntoUserTurns(messages, turns) {
  const starts = sortedTurnStarts(turns);
  if (starts.length === 0) return [];
  let cursor = 0;
  const out = [];
  for (const m of messages) {
    while (cursor + 1 < starts.length && m.position >= starts[cursor + 1].messagePosition) {
      cursor++;
    }
    if (m.position < starts[cursor].messagePosition) continue;
    out.push({ msg: m, turnPosition: starts[cursor].turnPosition });
  }
  return out;
}
function turnPositionForSourcePosition(position, turns) {
  const starts = sortedTurnStarts(turns);
  if (starts.length === 0) return null;
  let cursor = 0;
  while (cursor + 1 < starts.length && position >= starts[cursor + 1].messagePosition) {
    cursor++;
  }
  if (position < starts[cursor].messagePosition) return null;
  return starts[cursor].turnPosition;
}
function projectTranscriptPersistenceEvents(input) {
  const assigned = partitionMessagesIntoUserTurns(input.messages, input.userTurns);
  const positionInTurn = /* @__PURE__ */ new Map();
  const sourcePositionToTurnId = /* @__PURE__ */ new Map();
  const sourcePositionToEventPosition = /* @__PURE__ */ new Map();
  const assignedMessageByPosition = /* @__PURE__ */ new Map();
  const sourcePositionsByTurnId = /* @__PURE__ */ new Map();
  const events = [];
  for (const { msg, turnPosition } of assigned) {
    const turnId = input.turnPositionToId.get(turnPosition);
    if (turnId === void 0) continue;
    sourcePositionToTurnId.set(msg.position, turnId);
    assignedMessageByPosition.set(msg.position, { msg, turnId });
    addSourcePosition(sourcePositionsByTurnId, turnId, msg.position);
  }
  for (const toolCall of input.toolCalls) {
    if (toolCall.sourceEventPosition === void 0) continue;
    const turnPosition = turnPositionForSourcePosition(
      toolCall.sourceEventPosition,
      input.userTurns
    );
    if (turnPosition === null) continue;
    const turnId = input.turnPositionToId.get(turnPosition);
    if (turnId === void 0) continue;
    sourcePositionToTurnId.set(toolCall.sourceEventPosition, turnId);
    addSourcePosition(sourcePositionsByTurnId, turnId, toolCall.sourceEventPosition);
  }
  const toolCallSourcePositions = new Set(
    input.toolCalls.map((toolCall) => toolCall.sourceEventPosition).filter((position) => position !== void 0)
  );
  for (const [turnId, sourcePositions] of sourcePositionsByTurnId) {
    for (const sourcePosition of [...sourcePositions].sort((a, b) => a - b)) {
      const assignedMessage = assignedMessageByPosition.get(sourcePosition);
      const msg = assignedMessage?.msg;
      const hasToolCall = toolCallSourcePositions.has(sourcePosition);
      let kind = "assistant_text";
      let text = null;
      let timestampMs = null;
      if (msg) {
        kind = eventKindFromRole(msg.role);
        text = msg.role === "assistant" ? jsonlFiles.stripSyntheticWorkMarkers(msg.text) : msg.text;
        timestampMs = msg.timestampMs ?? null;
        if (msg.role === "assistant" && !text && !hasToolCall) continue;
      } else if (!hasToolCall) {
        continue;
      }
      const next = (positionInTurn.get(turnId) ?? -1) + 1;
      positionInTurn.set(turnId, next);
      events.push({
        userTurnId: turnId,
        position: next,
        kind,
        text,
        timestampMs,
        ...msg?.id ? { messageId: msg.id } : {}
      });
      sourcePositionToEventPosition.set(sourcePosition, { turnId, eventPosition: next });
    }
  }
  return {
    events,
    sourcePositionEvents: [...sourcePositionToEventPosition].map(([sourcePosition, event]) => ({
      sourcePosition,
      turnId: event.turnId,
      eventPosition: event.eventPosition
    })),
    sourcePositionTurns: [...sourcePositionToTurnId].map(([sourcePosition, turnId]) => ({
      sourcePosition,
      turnId
    }))
  };
}
function projectConversationTranscriptForPersistence(input) {
  const eventProjection = projectTranscriptPersistenceEvents(input);
  const sourcePositionToTurnId = new Map(
    eventProjection.sourcePositionTurns.map((link) => [link.sourcePosition, link.turnId])
  );
  const latestTodoTurnPosition = input.userTurns.map((turn) => turn.position).at(-1);
  const latestUserTurnId = latestTodoTurnPosition === void 0 ? null : input.turnPositionToId.get(latestTodoTurnPosition) ?? null;
  return {
    ...eventProjection,
    toolCalls: input.toolCalls.map((toolCall) => ({
      toolUseId: toolCall.toolUseId ?? null,
      sourceEventPosition: toolCall.sourceEventPosition ?? null,
      name: toolCall.name,
      input: toolCall.input,
      resultText: toolCall.resultText ?? null,
      isError: toolCall.isError ?? false,
      startedAtMs: toolCall.startedAtMs ?? null,
      endedAtMs: toolCall.endedAtMs ?? null
    })),
    toolResultLinks: input.toolCalls.flatMap(
      (toolCall) => toolCall.toolUseId && toolCall.resultEventPosition !== void 0 ? [{ toolUseId: toolCall.toolUseId, resultEventPosition: toolCall.resultEventPosition }] : []
    ),
    todoLists: input.todoLists.flatMap((todoList) => {
      const userTurnId = todoList.sourceEventPosition === void 0 ? latestUserTurnId : sourcePositionToTurnId.get(todoList.sourceEventPosition) ?? latestUserTurnId;
      if (userTurnId === null) return [];
      return [
        {
          userTurnId,
          sourceEventId: null,
          source: todoList.source ?? "transcript",
          isInferred: todoList.sourceEventPosition === void 0,
          sourceEventPosition: todoList.sourceEventPosition ?? null,
          todos: todoList.todos.map((todo) => ({
            position: todo.position,
            content: todo.content,
            state: todo.state
          }))
        }
      ];
    })
  };
}
function sortedTurnStarts(turns) {
  return turns.map((turn) => ({
    messagePosition: turn.startMessagePosition,
    turnPosition: turn.position
  })).sort((a, b) => a.messagePosition - b.messagePosition);
}
function addSourcePosition(byTurnId, turnId, sourcePosition) {
  let positions = byTurnId.get(turnId);
  if (!positions) {
    positions = /* @__PURE__ */ new Set();
    byTurnId.set(turnId, positions);
  }
  positions.add(sourcePosition);
}
function createConversationIngestRuntime(deps) {
  return {
    async ingestConversation(parsed) {
      const { conv, transcript, sourcePath, sourceMtimeMs, sourceSize } = parsed;
      if (deps.isSelfRunPath(sourcePath) || deps.isSelfRunPath(conv.cwd) || deps.isSelfRunPath(conv.projectRoot)) {
        return { conversationId: -1, skipped: true };
      }
      const fetchedAtMs = deps.now();
      const conversation = {
        ...conv,
        state: deactivateStaleActivityState(conv.state, conv.lastActivityTs, fetchedAtMs)
      };
      const cursor = await deps.sourceCursors.getSourceCursor(conversation.source, sourcePath);
      const ingestPlan = planConversationIngest({
        conversation,
        transcript,
        sourcePath,
        sourceMtimeMs,
        composerStateMtimeMs: parsed.composerStateMtimeMs,
        sourceSize,
        cursor
      });
      if (ingestPlan.kind !== "replace") {
        const row = await deps.conversations.getSkippedConversation(conversation.ref);
        if (row) {
          const skipped = ingestPlan.projectSkippedUpdate(row, fetchedAtMs);
          await deps.conversations.applySkippedConversationUpdate(skipped.update);
          if (skipped.sourceCursor) {
            await deps.sourceCursors.upsertSourceCursor(skipped.sourceCursor);
          }
        }
        return { conversationId: row?.conversationId ?? -1, skipped: true };
      }
      const result = await deps.conversations.replaceConversation(
        ingestPlan.projectReplacement(fetchedAtMs)
      );
      await deps.applyDeferredOverrides(conversation.ref);
      return { conversationId: result.conversationId, skipped: false };
    }
  };
}
function composerStateMtimeFromCursor(cursor) {
  if (!cursor) return null;
  const value = Number(cursor);
  return Number.isFinite(value) ? value : null;
}
function conversationIngestCursorFromSourceCursor(cursor) {
  return cursor ? {
    sourceMtimeMs: cursor.sourceMtimeMs,
    composerStateMtimeMs: composerStateMtimeFromCursor(cursor.sourceCursor)
  } : null;
}
function projectConversationSourceCursor(input) {
  return {
    kind: input.source,
    path: input.sourcePath,
    lastMtimeMs: input.sourceMtimeMs,
    lastSize: input.sourceSize ?? null,
    lastByteOffset: input.sourceBytesParsed ?? null,
    lastCursor: input.composerStateMtimeMs === void 0 || input.composerStateMtimeMs === null ? null : String(input.composerStateMtimeMs),
    lastFetchedAt: input.fetchedAtMs ?? null
  };
}
function shouldSyncProviderTodosOnSkip(input) {
  return input.source === "cursor" && (input.state === "finished" || input.state === "idle" || input.state === "inactive");
}
function planConversationIngest(input) {
  if ("conversation" in input) return planConversationIngestRuntime(input);
  return planConversationIngestKind(input);
}
function planConversationIngestKind(input) {
  const sameTranscript = input.cursor !== null && input.cursor.sourceMtimeMs !== null && input.cursor.sourceMtimeMs === input.sourceMtimeMs;
  const sameComposerState = input.source !== "cursor" || input.composerStateMtimeMs === null || input.cursor?.composerStateMtimeMs === input.composerStateMtimeMs;
  if (sameTranscript && sameComposerState) {
    return {
      kind: shouldSyncProviderTodosOnSkip(input) ? "skip-sync-provider-todos" : "skip-state-only"
    };
  }
  if (sameTranscript && input.source === "cursor") {
    return { kind: "skip-sync-provider-todos" };
  }
  return { kind: "replace" };
}
function planConversationIngestRuntime(input) {
  const replacement = projectConversationReplacementPersistence({
    ...input.conversation,
    userTurns: input.transcript.userTurns
  });
  const latestUserTurnPosition = replacement.conversation.latestUserTurnPosition;
  const kind = planConversationIngestKind({
    source: input.conversation.source,
    state: input.conversation.state,
    sourceMtimeMs: input.sourceMtimeMs,
    composerStateMtimeMs: input.composerStateMtimeMs ?? null,
    cursor: conversationIngestCursorFromSourceCursor(input.cursor)
  }).kind;
  if (kind !== "replace") {
    return {
      kind,
      latestUserTurnPosition,
      projectSkippedUpdate: (row, fetchedAtMs) => {
        const skipped = projectSkippedConversationPersistence({
          source: input.conversation.source,
          state: input.conversation.state,
          existingState: {
            state: row.state,
            dismissedAt: row.dismissedAt,
            stateOverrideTurnPosition: row.stateOverrideTurnPosition
          },
          latestUserTurnPosition,
          latestUserTurnId: row.latestUserTurnId,
          syncProviderTodos: kind === "skip-sync-provider-todos",
          todoLists: input.transcript.todoLists,
          sourceCursor: {
            source: input.conversation.source,
            sourcePath: input.sourcePath,
            sourceMtimeMs: input.sourceMtimeMs,
            sourceSize: input.sourceSize ?? null,
            sourceBytesParsed: input.transcript.sourceBytesParsed ?? null,
            composerStateMtimeMs: input.composerStateMtimeMs,
            fetchedAtMs
          }
        });
        return {
          update: {
            ref: input.conversation.ref,
            statePatch: skipped.statePatch,
            providerTodoLists: kind === "skip-sync-provider-todos" ? skipped.providerTodoLists : void 0
          },
          sourceCursor: skipped.sourceCursor
        };
      }
    };
  }
  return {
    kind,
    latestUserTurnPosition,
    projectReplacement: (fetchedAtMs) => {
      const turnPositionToId = /* @__PURE__ */ new Map();
      for (const turn of replacement.userTurns) turnPositionToId.set(turn.position, turn.position);
      const projection = projectConversationTranscriptForPersistence({
        messages: input.transcript.messages,
        userTurns: input.transcript.userTurns,
        toolCalls: input.transcript.toolCalls,
        todoLists: input.transcript.todoLists,
        turnPositionToId
      });
      const sourcePositionByTurnAndEventPosition = /* @__PURE__ */ new Map();
      for (const event of projection.sourcePositionEvents) {
        sourcePositionByTurnAndEventPosition.set(
          `${event.turnId}\0${event.eventPosition}`,
          event.sourcePosition
        );
      }
      const toolResultPositionByToolUseId = /* @__PURE__ */ new Map();
      for (const link of projection.toolResultLinks) {
        toolResultPositionByToolUseId.set(link.toolUseId, link.resultEventPosition);
      }
      const sourceCursor = projectConversationSourceCursor({
        source: input.conversation.source,
        sourcePath: input.sourcePath,
        sourceMtimeMs: input.sourceMtimeMs,
        sourceSize: input.sourceSize ?? null,
        sourceBytesParsed: input.transcript.sourceBytesParsed ?? null,
        composerStateMtimeMs: input.composerStateMtimeMs,
        fetchedAtMs
      });
      return {
        project: replacement.project,
        sourceCursor: {
          ...sourceCursor,
          lastCursor: input.conversation.source === "cursor" ? sourceCursor.lastCursor : null
        },
        conversation: replacement.conversation,
        userTurns: replacement.userTurns,
        events: projection.events.map((event) => ({
          userTurnPosition: event.userTurnId,
          sourcePosition: sourcePositionByTurnAndEventPosition.get(
            `${event.userTurnId}\0${event.position}`
          ) ?? null,
          position: event.position,
          kind: event.kind,
          text: event.text,
          timestampMs: event.timestampMs,
          ...event.messageId ? { messageId: event.messageId } : {}
        })),
        toolCalls: projection.toolCalls.map((toolCall) => ({
          toolUseId: toolCall.toolUseId,
          sourceEventPosition: toolCall.sourceEventPosition,
          resultEventPosition: toolCall.toolUseId ? toolResultPositionByToolUseId.get(toolCall.toolUseId) ?? null : null,
          name: toolCall.name,
          input: toolCall.input,
          resultText: toolCall.resultText,
          isError: toolCall.isError,
          startedAtMs: toolCall.startedAtMs,
          endedAtMs: toolCall.endedAtMs
        })),
        todoLists: projection.todoLists.map((todoList) => ({
          userTurnPosition: todoList.userTurnId,
          sourceEventPosition: todoList.sourceEventPosition,
          source: todoList.source,
          isInferred: todoList.isInferred,
          todos: todoList.todos
        }))
      };
    }
  };
}
function projectSkippedProviderTodoLists(todoLists, latestUserTurnId) {
  if (latestUserTurnId === null) return [];
  return todoLists.map((todoList) => ({
    userTurnId: latestUserTurnId,
    sourceEventId: null,
    source: todoList.source ?? "transcript",
    isInferred: true,
    todos: todoList.todos.map((todo) => ({
      position: todo.position,
      content: todo.content,
      state: todo.state
    }))
  }));
}
function projectSkippedConversationPersistence(input) {
  return {
    statePatch: index.mergeSkippedConversationState(input.existingState, {
      state: input.state,
      latestUserTurnPosition: input.latestUserTurnPosition
    }),
    providerTodoLists: input.syncProviderTodos ? projectSkippedProviderTodoLists(input.todoLists, input.latestUserTurnId) : [],
    sourceCursor: input.syncProviderTodos && input.sourceCursor?.composerStateMtimeMs !== void 0 ? projectConversationSourceCursor(input.sourceCursor) : null
  };
}
function cursorDiskSubAgentFromPrompt(input, now) {
  const prompt = input.prompt.trim();
  const title = prompt.split("\n")[0].slice(0, 80).trim() || "sub-agent";
  const state = classifyActivity(input.mtimeMs, "assistant-final");
  return {
    id: input.id,
    title,
    prompt: prompt.slice(0, 400),
    state,
    startedAt: input.mtimeMs || void 0,
    endedAt: state === "running" ? void 0 : input.mtimeMs || void 0
  };
}
function cursorDiskSubAgentPromptFromTranscriptLine(line) {
  if (!line.trim()) return null;
  const parsedJson = parseJsonRecord(line);
  if (parsedJson.isErr()) return null;
  const obj = parsedJson.value;
  if (obj.role !== "user") return null;
  const message = obj.message;
  const content = message ? message.content : void 0;
  if (jsonlFiles.isPureToolResult(content)) return null;
  const prompt = jsonlFiles.stripCursorXml(jsonlFiles.extractText(content)).trim();
  return prompt || null;
}
function mergeCursorSubAgents(inTranscript, disk) {
  const seen = new Set(inTranscript.map((s) => s.id));
  return [
    ...inTranscript,
    ...disk.filter((s) => s.state === "running" && !seen.has(s.id))
  ];
}
function captureError$3(port, key, error, context) {
  void port?.captureError?.(key, error, context);
}
function sessionIdFromPath(path, basename) {
  return basename(path).replace(/\.jsonl$/, "");
}
function isClaudeSessionSourceMeta(meta, root, cutoffMs) {
  return meta.path.startsWith(root) && meta.path.endsWith(".jsonl") && isClaudeTranscriptMeta(meta, cutoffMs);
}
async function currentClaudeSessionSourceVersion(path, transcriptMtimeMs, ports, transcriptSize) {
  const sessionId = sessionIdFromPath(path, ports.basename);
  const [taskState, desktopTitle, sessionState] = await Promise.all([
    ports.readTaskStateVersion(sessionId),
    ports.readDesktopTitle(sessionId),
    ports.readSessionStateVersion(sessionId)
  ]);
  return {
    sourceMtimeMs: Math.max(
      transcriptMtimeMs,
      taskState?.mtimeMs ?? 0,
      desktopTitle?.mtimeMs ?? 0,
      sessionState?.mtimeMs ?? 0
    ),
    ...transcriptSize == null ? {} : { sourceSize: transcriptSize },
    sourceCursor: null
  };
}
function applyClaudeTaskStateOverlayToCanonicalParsed(parsed, taskState) {
  if (!taskState || taskState.states.size === 0) return parsed;
  let changed = false;
  const todos = parsed.todos.map((todo) => {
    const id = todo.id;
    if (!id) return todo;
    const state = taskState.states.get(id);
    if (!state || state === todo.state) return todo;
    changed = true;
    return { ...todo, state };
  });
  return changed ? { ...parsed, todos } : parsed;
}
async function parseClaudeSessionWithBinding(input, ports) {
  const parsed = await input.binding.parse({
    harnessId: "claude",
    sourcePath: input.path,
    raw: ""
  });
  const overlaid = applyClaudeTaskStateOverlayToCanonicalParsed(parsed, input.taskState);
  return projectCanonicalParserParsedConversation({
    parsed: overlaid,
    source: "claude",
    sourcePath: input.path,
    fallbackProject: input.fallbackProject,
    sourceMtimeMs: input.sourceMtimeMs,
    sourceSize: input.sourceSize,
    branchLabel: ports.branchLabel,
    resolveProjectInfo: (projectPath) => desktopSearch.describeProjectPath(projectPath, ports.branchLabel?.(projectPath), {
      homeDir: ports.homeDir
    })
  });
}
function pendingCanonicalApprovalTimes(toolCalls, askRules, fallbackTimestampMs) {
  const pending = [];
  for (const toolCall of toolCalls) {
    if (toolCall.endedAtMs !== void 0 || toolCall.resultText !== void 0) continue;
    if (claudeToolRequiresApproval(
      { name: toolCall.name, input: toolCall.input },
      askRules
    )) {
      pending.push(toolCall.startedAtMs ?? fallbackTimestampMs);
    }
  }
  return pending;
}
function hasPendingCanonicalUserQuestion(toolCalls) {
  const seenToolUseIds = /* @__PURE__ */ new Set();
  for (let index2 = toolCalls.length - 1; index2 >= 0; index2 -= 1) {
    const toolCall = toolCalls[index2];
    if (toolCall.name !== "AskUserQuestion") continue;
    if (toolCall.toolUseId) {
      if (seenToolUseIds.has(toolCall.toolUseId)) continue;
      seenToolUseIds.add(toolCall.toolUseId);
    }
    if (toolCall.endedAtMs === void 0 && toolCall.resultText === void 0) return true;
  }
  return false;
}
function applyClaudeExternalStatePolicyToCanonicalProjection(parsed, overlay) {
  const sourceMtimeMs = Math.max(
    parsed.sourceMtimeMs,
    overlay.desktopTitle?.mtimeMs ?? 0,
    overlay.sessionState?.mtimeMs ?? 0,
    overlay.taskState?.mtimeMs ?? 0
  );
  const sessionIsRunning = claudeSessionStateIsRunning(overlay.sessionState);
  const sessionNeedsApproval = claudeSessionStateNeedsApproval(overlay.sessionState);
  const hasTerminalParserError = parsed.conv.state === "failed" || parsed.conv.lastKind === "assistant-error";
  const parserNeedsApproval = (parsed.conv.needsApproval === true || parsed.conv.state === "needs-approval") && hasPendingCanonicalUserQuestion(parsed.transcript.toolCalls);
  const needsApproval = parserNeedsApproval || !sessionIsRunning && (sessionNeedsApproval || !hasTerminalParserError && hasFreshPendingApproval(
    pendingCanonicalApprovalTimes(
      parsed.transcript.toolCalls,
      overlay.askRules,
      parsed.conv.lastToolCallTs ?? parsed.sourceMtimeMs
    ),
    overlay.nowMs,
    CLAUDE_APPROVAL_ATTENTION_MS
  ));
  const projectedConv = { ...parsed.conv };
  if (sessionIsRunning || sessionNeedsApproval) delete projectedConv.failureReason;
  return {
    ...parsed,
    conv: {
      ...projectedConv,
      ...overlay.desktopTitle ? { title: overlay.desktopTitle.title } : {},
      needsApproval,
      ...needsApproval && (sessionNeedsApproval || !hasTerminalParserError) ? {
        state: "needs-approval",
        lastKind: "assistant-tool-use"
      } : {},
      ...sessionIsRunning && !needsApproval ? {
        state: "running"
      } : {}
    },
    sourceMtimeMs
  };
}
async function summarizeClaudeSessionConversation(input, ports) {
  const askRules = await ports.readAskRules();
  const fallbackProject = ports.fallbackProject(input.path);
  let mtimeMs = input.knownMtimeMs ?? 0;
  let sourceSize = input.knownSize ?? 0;
  if (input.knownMtimeMs === void 0) {
    try {
      const stat = await ports.stat(input.path);
      mtimeMs = stat.mtimeMs;
      sourceSize = stat.size;
    } catch (err) {
      if (shouldReportConversationProviderAppError(err)) {
        captureError$3(ports.telemetry, "main.parser.stat", err, {
          provider: "claude",
          source_path: input.path
        });
      }
    }
  }
  const sessionId = sessionIdFromPath(input.path, ports.basename);
  const [desktopTitle, sessionState, taskState] = await Promise.all([
    ports.readDesktopTitle(sessionId),
    ports.readSessionState(sessionId),
    ports.readTaskState(sessionId)
  ]);
  const nowMs = input.nowMs ?? ports.now?.() ?? Date.now();
  const externalSourceMtimeMs = Math.max(
    mtimeMs,
    taskState?.mtimeMs ?? 0,
    desktopTitle?.mtimeMs ?? 0,
    sessionState?.mtimeMs ?? 0
  );
  const binding = input.parserBinding === void 0 ? await ports.getParserBinding?.() : input.parserBinding;
  if (!binding) {
    const err = new Error("Claude canonical parser binding is unavailable.");
    if (shouldReportConversationProviderAppError(err)) {
      captureError$3(ports.telemetry, "main.parser.claude-canonical", err, {
        provider: "claude",
        source_path: input.path,
        source_bytes: sourceSize || void 0
      });
    }
    throw err;
  }
  if (input.shouldStop?.()) {
    throw new Error(CLAUDE_CANONICAL_PARSING_STOPPED_MESSAGE);
  }
  try {
    const parsed = await parseClaudeSessionWithBinding(
      {
        binding,
        path: input.path,
        fallbackProject,
        sourceMtimeMs: externalSourceMtimeMs,
        sourceSize: sourceSize || void 0,
        taskState
      },
      ports
    );
    return applyClaudeExternalStatePolicyToCanonicalProjection(parsed, {
      desktopTitle,
      sessionState,
      taskState,
      askRules,
      nowMs
    });
  } catch (err) {
    if (shouldReportConversationProviderAppError(err)) {
      captureError$3(ports.telemetry, "main.parser.claude-canonical", err, {
        provider: "claude",
        source_path: input.path,
        source_bytes: sourceSize || void 0
      });
    }
    throw err;
  }
}
function createClaudeSessionConversationProvider(input) {
  const provider = {
    source: "claude",
    async currentSourceVersion(meta) {
      return currentClaudeSessionSourceVersion(meta.path, meta.mtimeMs, input.ports, meta.size);
    },
    async *iterate(opts) {
      if (opts?.shouldStop?.()) return;
      const cutoff = opts?.maxAgeMs ? (input.ports.now?.() ?? Date.now()) - opts.maxAgeMs : 0;
      const all = await discoverConversationSourceMetas(input.root, input.ports, {
        shouldStop: opts?.shouldStop
      });
      opts?.onDiscovered?.(
        oldestMtime$3(
          all.filter(
            (meta) => isClaudeSessionSourceMeta(meta, input.root, 0) && (opts?.allowSource?.("claude", meta.path) ?? true)
          )
        )
      );
      const metas = all.filter((meta) => isClaudeSessionSourceMeta(meta, input.root, cutoff)).filter(
        (meta) => (opts?.mtimeBeforeMs == null || meta.mtimeMs < opts.mtimeBeforeMs) && (opts?.mtimeAfterMs == null || meta.mtimeMs >= opts.mtimeAfterMs)
      ).filter((meta) => !opts?.targetPaths || opts.targetPaths.includes(meta.path)).filter((meta) => opts?.allowSource?.("claude", meta.path) ?? true);
      const parserBinding = await input.ports.getParserBinding?.() ?? null;
      for (const meta of metas) {
        const { path, mtimeMs } = meta;
        if (opts?.shouldStop?.()) return;
        const storedSourceVersion = opts?.skipIfSourceMatches?.get(path);
        if (storedSourceVersion) {
          const currentSourceVersion2 = await provider.currentSourceVersion?.(meta, opts);
          if (currentSourceVersion2 && sourceVersionsMatch(storedSourceVersion, currentSourceVersion2)) {
            continue;
          }
        }
        const parsed = await summarizeClaudeSessionConversation(
          {
            path,
            knownMtimeMs: mtimeMs,
            knownSize: meta.size,
            nowMs: input.ports.now?.() ?? Date.now(),
            shouldStop: opts?.shouldStop,
            parserBinding
          },
          input.ports
        );
        if (opts?.shouldStop?.()) return;
        yield parsed;
      }
    }
  };
  return provider;
}
function oldestMtime$3(metas) {
  let oldest = null;
  for (const meta of metas) if (oldest === null || meta.mtimeMs < oldest) oldest = meta.mtimeMs;
  return oldest;
}
function partitionOmpSessionMetas(metas, pathApi) {
  const parents = [];
  const consumed = /* @__PURE__ */ new Set();
  for (const meta of metas) {
    const dir = pathApi.dirname(meta.path);
    const id = pathApi.basename(meta.path, ".jsonl");
    const subagentDir = pathApi.join(dir, id);
    const children = metas.filter((child) => child.path.startsWith(subagentDir + pathApi.sep));
    if (children.length === 0) continue;
    parents.push({ meta, subagentDir, children });
    consumed.add(meta.path);
    for (const child of children) consumed.add(child.path);
  }
  return {
    parents,
    orphans: metas.filter((meta) => !consumed.has(meta.path))
  };
}
function planOmpSessionSources(metas, pathApi) {
  const { parents, orphans } = partitionOmpSessionMetas(metas, pathApi);
  return [
    ...parents.map(({ meta, subagentDir, children }) => {
      const sortedChildren = children.slice().sort((a, b) => a.path.localeCompare(b.path));
      return {
        kind: "parent",
        meta,
        sourceMeta: { ...meta, relatedMetas: sortedChildren },
        subagentDir,
        children: sortedChildren
      };
    }),
    ...orphans.map((meta) => ({
      kind: "orphan",
      meta,
      sourceMeta: meta
    }))
  ];
}
function ompTitleFromFilename(filename) {
  const stem = filename.replace(/\.jsonl$/, "").replace(/^\d+-/, "");
  return stem.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").trim();
}
function mergeOmpSubAgents(childSubAgents, inlineSubAgents) {
  const activeChildSubAgents = childSubAgents.filter((subAgent) => subAgent.state === "running");
  const seenTitles = new Set(activeChildSubAgents.map((subAgent) => subAgent.title));
  return [
    ...activeChildSubAgents,
    ...inlineSubAgents.filter(
      (subAgent) => subAgent.state === "running" && !seenTitles.has(subAgent.title)
    )
  ];
}
function attachOmpChildSubAgents(parsed, childSubAgents, sourceMtimeMs) {
  return {
    ...parsed,
    sourceMtimeMs,
    conv: {
      ...parsed.conv,
      subAgents: mergeOmpSubAgents(childSubAgents, parsed.conv.subAgents ?? [])
    }
  };
}
function ompChildConversationAsSubAgent(input) {
  const endedAt = input.state === "finished" || input.state === "failed" || input.state === "inactive" ? input.lastActivityTs : void 0;
  return {
    id: input.id,
    title: ompTitleFromFilename(input.filename),
    prompt: input.preview || input.lastUserMessage || "",
    state: input.state,
    startedAt: input.startedAt,
    endedAt
  };
}
async function handleOmpSkippableReadError(meta, err, input) {
  if (!input.isSkippableReadError(err)) return false;
  await input.onSkippedTranscript?.(meta, err);
  return true;
}
async function* iterateOmpSessionSources(input) {
  for (const plan of input.plans) {
    if (input.opts?.shouldStop?.()) return;
    if (plan.kind === "parent") {
      const version = await currentSourceVersion(
        input.sourceVersionProvider,
        plan.sourceMeta,
        input.opts
      );
      if (sourceVersionsMatch(input.opts?.skipIfSourceMatches?.get(plan.meta.path), version)) {
        continue;
      }
      let parsed;
      try {
        parsed = await input.parseSession(plan.meta, "parent");
      } catch (err) {
        if (await handleOmpSkippableReadError(plan.meta, err, input)) continue;
        throw err;
      }
      const childSubAgents = [];
      for (const childMeta of plan.children) {
        if (input.opts?.shouldStop?.()) return;
        let childParsed;
        try {
          childParsed = await input.parseSession(childMeta, "child");
        } catch (err) {
          if (await handleOmpSkippableReadError(childMeta, err, input)) continue;
          throw err;
        }
        childSubAgents.push(
          ompChildConversationAsSubAgent({
            id: childMeta.path,
            filename: input.filenameFromPath(childMeta.path),
            preview: childParsed.conv.preview,
            lastUserMessage: childParsed.conv.lastUserMessage,
            state: childParsed.conv.state,
            startedAt: childParsed.conv.startedAt,
            lastActivityTs: childParsed.conv.lastActivityTs
          })
        );
      }
      yield attachOmpChildSubAgents(parsed, childSubAgents, version.sourceMtimeMs);
      continue;
    }
    if (await shouldSkipSource(input.sourceVersionProvider, plan.meta, input.opts)) continue;
    try {
      yield await input.parseSession(plan.meta, "orphan");
    } catch (err) {
      if (await handleOmpSkippableReadError(plan.meta, err, input)) continue;
      throw err;
    }
  }
}
function ompSessionRoot(path) {
  return path.join(path.homedir(), ".omp", "agent", "sessions");
}
function captureError$2(port, key, error, context) {
  void port?.captureError?.(key, error, context);
}
function captureEvent$1(port, name, properties) {
  void port?.captureEvent?.(name, properties);
}
async function listOmpSessionMetas(root, ports, shouldStop) {
  return discoverConversationSourceMetas(root, ports, { shouldStop });
}
async function summarizeOmpSession(meta, input) {
  const fallbackProject = sessionJsonlFallbackProject("omp", meta.path, input.ports.path.homedir());
  if (!input.canonicalParser) {
    const err = new Error("OMP canonical parser unavailable");
    if (shouldReportConversationProviderAppError(err)) {
      captureError$2(input.ports.telemetry, "main.parser.omp-canonical", err, {
        provider: "omp",
        source_path: meta.path
      });
    }
    throw err;
  }
  try {
    return await input.canonicalParser.parse({
      path: meta.path,
      fallbackProject,
      sourceMtimeMs: meta.mtimeMs
    });
  } catch (err) {
    if (shouldReportConversationProviderAppError(err)) {
      captureError$2(input.ports.telemetry, "main.parser.omp-canonical", err, {
        provider: "omp",
        source_path: meta.path
      });
    }
    throw err;
  }
}
function createOmpSessionConversationProvider(input) {
  const provider = {
    source: "omp",
    currentSourceVersion: input.provider?.currentSourceVersion,
    async *iterate(opts) {
      if (opts?.shouldStop?.()) return;
      const root = ompSessionRoot(input.ports.path);
      const cutoff = opts?.maxAgeMs ? (input.ports.now?.() ?? Date.now()) - opts.maxAgeMs : 0;
      const discovered = await listOmpSessionMetas(root, input.ports, opts?.shouldStop);
      opts?.onDiscovered?.(
        oldestMtime$2(discovered.filter((meta) => opts?.allowSource?.("omp", meta.path) ?? true))
      );
      const metas = discovered.filter(
        (meta) => meta.mtimeMs >= cutoff && (opts?.mtimeBeforeMs == null || meta.mtimeMs < opts.mtimeBeforeMs) && (opts?.mtimeAfterMs == null || meta.mtimeMs >= opts.mtimeAfterMs) && (opts?.allowSource?.("omp", meta.path) ?? true)
      );
      const plans = planOmpSessionSources(metas, input.ports.path);
      const canonicalParser = await input.ports.canonicalParser?.() ?? null;
      const currentSourceVersion2 = provider.currentSourceVersion;
      const sourceVersionProvider = {
        currentSourceVersion: currentSourceVersion2 ? (meta, versionOpts) => currentSourceVersion2(meta, versionOpts) : void 0
      };
      for await (const parsed of iterateOmpSessionSources({
        plans,
        sourceVersionProvider,
        opts,
        parseSession: (meta) => summarizeOmpSession(meta, {
          ports: input.ports,
          canonicalParser,
          shouldStop: opts?.shouldStop
        }),
        filenameFromPath: input.ports.path.basename,
        isSkippableReadError: input.ports.isSkippableReadError,
        onSkippedTranscript: (meta, err) => {
          captureEvent$1(input.ports.telemetry, "parser_transcript_skipped", {
            provider: "omp",
            source_path: meta.path,
            error_code: input.ports.readErrorCode(err) ?? "unknown"
          });
        }
      })) {
        yield parsed;
      }
    }
  };
  return provider;
}
function oldestMtime$2(metas) {
  let oldest = null;
  for (const meta of metas) if (oldest === null || meta.mtimeMs < oldest) oldest = meta.mtimeMs;
  return oldest;
}
async function captureError$1(port, key, error, context) {
  await port?.captureError?.(key, error, context);
}
async function captureEvent(port, name, properties) {
  await port?.captureEvent?.(name, properties);
}
function canonicalParserTelemetryKey(source) {
  return source === "pi" ? "main.parser.pi-canonical" : `main.parser.${source}-canonical`;
}
function canonicalParserDisplayName(source) {
  if (source === "omp") return "OMP";
  if (source === "pi") return "Pi";
  return `${source.charAt(0).toUpperCase()}${source.slice(1)}`;
}
async function summarizeSessionJsonlConversation(input, ports) {
  let mtimeMs = input.knownMtimeMs ?? 0;
  if (input.knownMtimeMs === void 0) {
    try {
      const stat = await ports.stat(input.path);
      mtimeMs = stat.mtimeMs;
    } catch (err) {
      if (shouldReportConversationProviderAppError(err)) {
        void captureError$1(ports.telemetry, "main.parser.stat", err, {
          provider: input.source,
          source_path: input.path
        });
      }
    }
  }
  if (!input.canonicalParser) {
    const err = new Error(
      `${canonicalParserDisplayName(input.source)} canonical parser unavailable`
    );
    if (shouldReportConversationProviderAppError(err)) {
      void captureError$1(ports.telemetry, canonicalParserTelemetryKey(input.source), err, {
        provider: input.source,
        source_path: input.path
      });
    }
    throw err;
  }
  try {
    if (input.shouldStop?.()) {
      throw new Error(
        `${canonicalParserDisplayName(input.source)} canonical parser skipped because ingestion stopped`
      );
    }
    return await input.canonicalParser.parse({
      source: input.canonicalParser.source,
      path: input.path,
      fallbackProject: input.fallbackProject,
      sourceMtimeMs: mtimeMs
    });
  } catch (err) {
    if (shouldReportConversationProviderAppError(err)) {
      void captureError$1(ports.telemetry, input.canonicalParser.telemetryKey, err, {
        provider: input.source,
        source_path: input.path
      });
    }
    throw err;
  }
}
function createSessionJsonlConversationProvider(input) {
  const provider = {
    source: input.source,
    currentSourceVersion: input.provider?.currentSourceVersion,
    async *iterate(listOpts) {
      if (listOpts?.shouldStop?.()) return;
      const cutoffMs = listOpts?.maxAgeMs ? (input.ports.now?.() ?? Date.now()) - listOpts.maxAgeMs : 0;
      const all = await discoverConversationSourceMetas(input.root, input.ports, {
        shouldStop: listOpts?.shouldStop
      });
      if (listOpts?.shouldStop?.()) return;
      listOpts?.onDiscovered?.(
        oldestMtime$1(
          all.filter(
            (meta) => isSessionJsonlSourceMeta(meta, input.root, 0) && (listOpts?.allowSource?.(input.source, meta.path) ?? true)
          )
        )
      );
      const metas = all.filter((meta) => isSessionJsonlSourceMeta(meta, input.root, cutoffMs)).filter(
        (meta) => (listOpts?.mtimeBeforeMs == null || meta.mtimeMs < listOpts.mtimeBeforeMs) && (listOpts?.mtimeAfterMs == null || meta.mtimeMs >= listOpts.mtimeAfterMs)
      ).filter((meta) => !listOpts?.targetPaths || listOpts.targetPaths.includes(meta.path)).filter((meta) => listOpts?.allowSource?.(input.source, meta.path) ?? true);
      const canonicalParser = input.ports.canonicalParser?.() ?? null;
      for (const meta of metas) {
        const { path, mtimeMs } = meta;
        if (listOpts?.shouldStop?.()) return;
        const storedSourceVersion = listOpts?.skipIfSourceMatches?.get(path);
        if (storedSourceVersion) {
          const currentSourceVersion2 = provider.currentSourceVersion ? await provider.currentSourceVersion(meta, listOpts) : sourceVersionFromMetaTree(meta);
          if (sourceVersionsMatch(storedSourceVersion, currentSourceVersion2)) continue;
        }
        try {
          yield await summarizeSessionJsonlConversation(
            {
              path,
              source: input.source,
              fallbackProject: input.ports.fallbackProject(path),
              shouldStop: listOpts?.shouldStop,
              canonicalParser: canonicalParser ?? void 0,
              knownMtimeMs: mtimeMs
            },
            input.ports
          );
        } catch (err) {
          if (input.ports.isSkippableReadError(err)) {
            void captureEvent(input.ports.telemetry, "parser_transcript_skipped", {
              provider: input.source,
              source_path: path,
              error_code: input.ports.readErrorCode(err) ?? "unknown"
            });
            continue;
          }
          throw err;
        }
      }
    }
  };
  return provider;
}
function oldestMtime$1(metas) {
  let oldest = null;
  for (const meta of metas) if (oldest === null || meta.mtimeMs < oldest) oldest = meta.mtimeMs;
  return oldest;
}
function parseCursorDiskValue(value) {
  const text = value instanceof Uint8Array ? new TextDecoder().decode(value) : typeof value === "string" ? value : "";
  return text ? parseJsonObjectRecord(text) : null;
}
function parseCursorApprovalConfig(value) {
  const raw = value && typeof value === "object" ? value : {};
  const permissions = raw.permissions && typeof raw.permissions === "object" ? raw.permissions : void 0;
  const allow = Array.isArray(permissions?.allow) ? permissions.allow.filter((v) => typeof v === "string") : [];
  if (typeof raw.approvalMode !== "string") return { allow };
  return { approvalMode: raw.approvalMode, allow };
}
function parseCursorComposerStateValue(value) {
  const json = parseCursorDiskValue(value);
  const status = typeof json?.status === "string" ? json.status : void 0;
  const rawTodos = json?.todos;
  if (!Array.isArray(rawTodos)) return status ? { status } : void 0;
  const todos = [];
  for (const raw of rawTodos) {
    if (!raw || typeof raw !== "object") continue;
    const todo = raw;
    const content = String(todo.content ?? "").trim();
    if (!content) continue;
    todos.push({ content, state: mapCursorTodoStatus(todo.status) });
  }
  return todos.length > 0 || status ? { todos, status } : void 0;
}
function parseCursorComposerRepoPathValue(value) {
  const json = parseCursorDiskValue(value);
  const repos = json?.trackedGitRepos;
  if (!Array.isArray(repos)) return void 0;
  for (const repo of repos) {
    if (!repo || typeof repo !== "object") continue;
    const path = repo.repoPath;
    if (typeof path === "string" && path.trim()) return path;
  }
  return void 0;
}
function shouldShowCursorCompletedTodos(state) {
  return state === "finished" || state === "idle" || state === "inactive";
}
function cursorToolRequiresApproval(block, config) {
  if (config.approvalMode !== "allowlist") return false;
  return !cursorToolAllowed(block, config.allow);
}
function mapCursorTodoStatus(status) {
  if (status === "completed" || status === "done" || status === "cancelled") {
    return "done";
  }
  if (status === "in_progress" || status === "current") return "current";
  return "pending";
}
function wildcardMatches(pattern, value) {
  if (pattern === "*") return true;
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^${escaped.replace(/\*/g, ".*")}$`);
  return re.test(value);
}
function cursorToolAllowed(block, allow) {
  const name = String(block.name ?? "");
  const input = block.input ?? block.arguments;
  const command = String(input?.command ?? input?.cmd ?? "").trim();
  const value = command || name;
  return allow.some((rule) => {
    const match = rule.match(/^([^()]+)\(([\s\S]*)\)$/);
    if (!match) return rule === name;
    return match[1] === name && wildcardMatches(match[2], value);
  });
}
function createCursorComposerStateRuntime(ports) {
  const cache = createCursorComposerStateCache();
  const statePaths = () => cursorComposerStatePaths$1(ports.cursorStateDbPath);
  const stateMtimeMs = () => {
    let latest = 0;
    for (const path of statePaths()) {
      latest = Math.max(latest, ports.statMtimeMs(path) ?? 0);
    }
    return latest;
  };
  const readComposerData = (composerId) => ports.readCursorDiskKV(`composerData:${composerId}`);
  const loadComposerState = (composerId) => {
    const currentMtimeMs = stateMtimeMs();
    const cached = getCursorComposerStateCache(cache, composerId, currentMtimeMs);
    if (cached.kind === "hit") return cached.value;
    const parsed = parseCursorComposerStateValue(readComposerData(composerId));
    const result = parsed ? { ...parsed, mtimeMs: currentMtimeMs } : void 0;
    setCursorComposerStateCache(cache, composerId, result);
    return result;
  };
  return {
    statePaths,
    stateMtimeMs,
    invalidateCache: () => invalidateCursorComposerStateCache(cache),
    loadComposerState,
    loadComposerRepoPath: (composerId) => parseCursorComposerRepoPathValue(readComposerData(composerId))
  };
}
function createCursorComposerStateCache() {
  return { mtimeMs: 0, values: /* @__PURE__ */ new Map() };
}
function invalidateCursorComposerStateCache(cache) {
  cache.values.clear();
  cache.mtimeMs = 0;
}
function getCursorComposerStateCache(cache, composerId, currentMtimeMs) {
  if (currentMtimeMs !== cache.mtimeMs) {
    cache.values.clear();
    cache.mtimeMs = currentMtimeMs;
  }
  if (!cache.values.has(composerId)) return { kind: "miss" };
  return { kind: "hit", value: cache.values.get(composerId) };
}
function setCursorComposerStateCache(cache, composerId, value) {
  cache.values.set(composerId, value);
}
function composerStatusState(status) {
  if (status === "completed" || status === "none") return "finished";
  if (status === "aborted") return "idle";
  return void 0;
}
function composerIsActive(status) {
  return !!status && status !== "completed" && status !== "none" && status !== "aborted";
}
function pendingToolRequiresApproval(toolCalls, config) {
  const pending = [...toolCalls].reverse().find((toolCall) => toolCall.endedAtMs === void 0 && toolCall.resultText === void 0);
  if (!pending) return false;
  return cursorToolRequiresApproval(
    { name: pending.name, input: pending.input },
    config
  );
}
function cursorDbTodoList(todos) {
  if (!todos || todos.length === 0) return void 0;
  return {
    source: "cursor-db",
    todos: todos.map((todo, position) => ({
      position,
      content: todo.content,
      state: todo.state
    }))
  };
}
function applyCursorExternalStatePolicyToCanonicalProjection(parsed, overlay) {
  const projectPath = overlay.cwd ?? overlay.fallbackProject;
  const info = overlay.projectInfo ?? desktopSearch.describeProjectPath(projectPath, overlay.branchLabel?.(projectPath), {
    homeDir: overlay.homeDir
  });
  const statusState = composerStatusState(overlay.composerState?.status);
  const needsApproval = statusState === void 0 && composerIsActive(overlay.composerState?.status) && pendingToolRequiresApproval(parsed.transcript.toolCalls, overlay.approvalConfig);
  const state = statusState ?? (needsApproval ? "needs-approval" : parsed.conv.state);
  const useTranscriptTodos = overlay.composerState?.todos && overlay.composerState.todos.length === 0 && shouldShowCursorCompletedTodos(state) && parsed.conv.todos !== void 0;
  const todos = useTranscriptTodos ? parsed.conv.todos : overlay.composerState ? overlay.composerState.todos : parsed.conv.todos;
  const cursorTodos = useTranscriptTodos ? void 0 : cursorDbTodoList(overlay.composerState?.todos);
  const subAgents = mergeCursorSubAgents(parsed.conv.subAgents ?? [], overlay.diskSubAgents ?? []);
  const lastKind = needsApproval ? "assistant-tool-use" : parsed.conv.lastKind;
  return {
    ...parsed,
    conv: {
      ...parsed.conv,
      project: overlay.fallbackProject,
      cwd: overlay.cwd,
      projectName: info.project,
      projectRoot: info.projectRoot,
      workspaceName: info.worktree,
      workspaceKind: info.toolingDir,
      branch: parsed.conv.branch ?? info.branch,
      needsApproval,
      todos,
      subAgents: subAgents.length > 0 ? subAgents : parsed.conv.subAgents,
      state,
      ...lastKind ? { lastKind } : {}
    },
    transcript: {
      ...parsed.transcript,
      todoLists: cursorTodos ? [cursorTodos] : parsed.transcript.todoLists
    },
    ...overlay.composerStateMtimeMs !== void 0 ? { composerStateMtimeMs: overlay.composerStateMtimeMs } : {}
  };
}
const approvalConfigLoaders = /* @__PURE__ */ new WeakMap();
function captureError(port, key, error, context) {
  void port?.captureError?.(key, error, context);
}
function conversationIdFromPath(path, basename) {
  return basename(path).replace(/\.jsonl$/, "");
}
async function listCursorSessionMetas(root, ports, shouldStop) {
  return discoverConversationSourceMetas(root, ports, { shouldStop });
}
function isCursorSessionSourceMeta(meta, cutoffMs) {
  return isCursorAgentTranscriptMeta(meta, cutoffMs);
}
async function currentCursorSessionSourceVersion(transcriptMtimeMs, ports) {
  return {
    sourceMtimeMs: transcriptMtimeMs,
    sourceCursor: String(ports.composerStateMtimeMs())
  };
}
async function parseCursorSessionWithBinding(input, ports) {
  const parsed = await input.binding.parse({
    harnessId: "cursor",
    sourcePath: input.path,
    raw: ""
  });
  return projectCanonicalParserParsedConversation({
    parsed,
    source: "cursor",
    sourcePath: input.path,
    fallbackProject: input.fallbackProject,
    sourceMtimeMs: input.sourceMtimeMs,
    sourceSize: input.sourceSize,
    branchLabel: ports.branchLabel,
    resolveProjectInfo: (projectPath) => input.projectInfo ?? desktopSearch.describeProjectPath(projectPath, ports.branchLabel?.(projectPath), {
      homeDir: ports.homeDir
    })
  });
}
async function loadCursorSubAgents(parentFile, ports, shouldStop) {
  let entries;
  try {
    entries = await ports.readDir(ports.subAgentDir(parentFile));
  } catch {
    return [];
  }
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".jsonl"));
  const subAgents = [];
  for (const entry of files) {
    if (shouldStop?.()) break;
    const full = ports.subAgentPath(parentFile, entry.name);
    const id = entry.name.replace(/\.jsonl$/, "");
    let mtimeMs = 0;
    try {
      mtimeMs = (await ports.stat(full)).mtimeMs;
    } catch {
    }
    let prompt = "";
    try {
      for await (const line of ports.readLines(full, { shouldStop })) {
        const projected = cursorDiskSubAgentPromptFromTranscriptLine(line);
        if (projected) {
          prompt = projected;
          break;
        }
      }
    } catch {
    }
    subAgents.push(cursorDiskSubAgentFromPrompt({ id, prompt, mtimeMs }));
  }
  return subAgents;
}
function createCursorApprovalConfigLoader(ports) {
  let cache;
  return async () => {
    let mtimeMs = 0;
    try {
      mtimeMs = (await ports.stat(ports.approvalConfigPath)).mtimeMs;
      if (cache?.mtimeMs === mtimeMs) return cache;
      const raw = JSON.parse(await ports.readText(ports.approvalConfigPath));
      cache = {
        mtimeMs,
        ...parseCursorApprovalConfig(raw)
      };
      return cache;
    } catch {
      cache = { mtimeMs, allow: [] };
      return cache;
    }
  };
}
function approvalConfigLoaderForPorts(ports) {
  const cached = approvalConfigLoaders.get(ports);
  if (cached) return cached;
  const loader = createCursorApprovalConfigLoader(ports);
  approvalConfigLoaders.set(ports, loader);
  return loader;
}
async function summarizeCursorSessionConversation(input, ports, loadApprovalConfig = approvalConfigLoaderForPorts(ports)) {
  let mtimeMs = input.knownMtimeMs ?? 0;
  let sourceSize = 0;
  if (input.knownMtimeMs === void 0) {
    try {
      const stat = await ports.stat(input.path);
      mtimeMs = stat.mtimeMs;
      sourceSize = stat.size;
    } catch (err) {
      if (shouldReportConversationProviderAppError(err)) {
        captureError(ports.telemetry, "main.parser.stat", err, {
          provider: "cursor",
          source_path: input.path
        });
      }
    }
  }
  const conversationId = conversationIdFromPath(input.path, ports.basename);
  const currentComposerState = ports.readComposerState(conversationId);
  const composerStateMtimeMs = ports.composerStateMtimeMs();
  const cwd = ports.readComposerRepoPath(conversationId) ?? (ports.deriveCwd ?? cursorCwdFromProjectPath)(input.path);
  let diskSubAgents = [];
  try {
    diskSubAgents = await loadCursorSubAgents(input.path, ports, input.shouldStop);
  } catch {
    diskSubAgents = [];
  }
  const fallbackProject = ports.fallbackProject(input.path);
  const approvalConfig = await loadApprovalConfig();
  const binding = input.parserBinding === void 0 ? await ports.getParserBinding?.() : input.parserBinding;
  if (!binding) {
    const err = new Error("Cursor canonical parser unavailable");
    if (shouldReportConversationProviderAppError(err)) {
      captureError(ports.telemetry, "main.parser.cursor-canonical", err, {
        provider: "cursor",
        source_path: input.path,
        source_bytes: sourceSize || void 0
      });
    }
    throw err;
  }
  if (input.shouldStop?.()) {
    throw new Error(CURSOR_CANONICAL_PARSING_STOPPED_MESSAGE);
  }
  try {
    const projectPath = cwd ?? fallbackProject;
    const projectInfo = desktopSearch.describeProjectPath(projectPath, ports.branchLabel?.(projectPath), {
      homeDir: ports.homeDir
    });
    const parsed = await parseCursorSessionWithBinding(
      {
        binding,
        path: input.path,
        fallbackProject: cwd ?? fallbackProject,
        sourceMtimeMs: mtimeMs,
        sourceSize: sourceSize || void 0,
        projectInfo
      },
      ports
    );
    return applyCursorExternalStatePolicyToCanonicalProjection(parsed, {
      fallbackProject,
      cwd,
      approvalConfig,
      composerState: currentComposerState,
      composerStateMtimeMs,
      diskSubAgents,
      projectInfo
    });
  } catch (err) {
    if (shouldReportConversationProviderAppError(err)) {
      captureError(ports.telemetry, "main.parser.cursor-canonical", err, {
        provider: "cursor",
        source_path: input.path,
        source_bytes: sourceSize || void 0
      });
    }
    throw err;
  }
}
function createCursorSessionConversationProvider(input) {
  const loadApprovalConfig = approvalConfigLoaderForPorts(input.ports);
  const provider = {
    source: "cursor",
    async currentSourceVersion(meta) {
      return currentCursorSessionSourceVersion(meta.mtimeMs, input.ports);
    },
    async *iterate(opts) {
      if (opts?.shouldStop?.()) return;
      const cutoff = opts?.maxAgeMs ? (input.ports.now?.() ?? Date.now()) - opts.maxAgeMs : 0;
      const discovered = await listCursorSessionMetas(input.root, input.ports, opts?.shouldStop);
      opts?.onDiscovered?.(
        oldestMtime(
          discovered.filter(
            (meta) => isCursorSessionSourceMeta(meta, 0) && (opts?.allowSource?.("cursor", meta.path) ?? true)
          )
        )
      );
      const metas = discovered.filter((meta) => isCursorSessionSourceMeta(meta, cutoff)).filter(
        (meta) => (opts?.mtimeBeforeMs == null || meta.mtimeMs < opts.mtimeBeforeMs) && (opts?.mtimeAfterMs == null || meta.mtimeMs >= opts.mtimeAfterMs)
      ).filter((meta) => !opts?.targetPaths || opts.targetPaths.includes(meta.path)).filter((meta) => opts?.allowSource?.("cursor", meta.path) ?? true);
      const cursorSourceCursor = String(input.ports.composerStateMtimeMs());
      const parserBinding = await input.ports.getParserBinding?.() ?? null;
      for (const meta of metas) {
        const { path, mtimeMs } = meta;
        if (opts?.shouldStop?.()) return;
        const storedSourceVersion = opts?.skipIfSourceMatches?.get(path);
        if (storedSourceVersion) {
          if (sourceVersionsMatch(storedSourceVersion, {
            sourceMtimeMs: mtimeMs,
            sourceCursor: cursorSourceCursor
          })) {
            continue;
          }
        }
        const parsed = await summarizeCursorSessionConversation(
          {
            path,
            knownMtimeMs: mtimeMs,
            shouldStop: opts?.shouldStop,
            parserBinding
          },
          input.ports,
          loadApprovalConfig
        );
        if (opts?.shouldStop?.()) return;
        yield parsed;
      }
    }
  };
  return provider;
}
function oldestMtime(metas) {
  let oldest = null;
  for (const meta of metas) if (oldest === null || meta.mtimeMs < oldest) oldest = meta.mtimeMs;
  return oldest;
}
function localSessionCanonicalParserTelemetryKey(source) {
  return source === "pi" ? "main.parser.pi-canonical" : `main.parser.${source}-canonical`;
}
async function parseLocalJsonlConversationWithBinding(input, ports) {
  const fileStat = await ports.stat(input.path);
  const parsed = await input.binding.parse({
    harnessId: input.source,
    sourcePath: input.path,
    raw: ""
  });
  if (input.requireHarnessId && parsed.harnessId !== input.requireHarnessId) {
    throw new Error(
      `Canonical parser returned ${parsed.harnessId} output for ${input.requireHarnessId}`
    );
  }
  return projectCanonicalParserParsedConversation({
    parsed,
    source: input.source,
    sourcePath: input.path,
    fallbackProject: input.fallbackProject,
    sourceMtimeMs: input.sourceMtimeMs,
    sourceSize: fileStat.size,
    branchLabel: ports.branchLabel,
    resolveProjectInfo: (projectPath) => desktopSearch.describeProjectPath(projectPath, ports.branchLabel?.(projectPath), {
      homeDir: ports.homeDir
    })
  });
}
function createLocalSessionSourceProviderHost(ports) {
  function defaultFallbackProject(source, file) {
    return sessionJsonlFallbackProject(source, file, ports.homedir());
  }
  function codexFallbackProject(file) {
    return codexFallbackProjectFromSessionPath(file, ports.homedir());
  }
  async function parseConversationWithBinding(input) {
    return parseLocalJsonlConversationWithBinding(input, {
      stat: ports.stat,
      branchLabel: ports.branchLabel,
      homeDir: ports.homedir()
    });
  }
  function makeSessionCanonicalParser(opts) {
    return {
      source: opts.source,
      telemetryKey: localSessionCanonicalParserTelemetryKey(opts.source),
      parse(input) {
        return parseConversationWithBinding({
          binding: opts.binding,
          source: input.source,
          path: input.path,
          fallbackProject: input.fallbackProject,
          sourceMtimeMs: input.sourceMtimeMs
        });
      }
    };
  }
  function makeLocalCanonicalParser(binding, source, opts = {}) {
    return {
      parse(input) {
        return parseConversationWithBinding({
          binding,
          source,
          path: input.path,
          fallbackProject: input.fallbackProject,
          sourceMtimeMs: input.sourceMtimeMs,
          requireHarnessId: opts.requireHarnessId
        });
      }
    };
  }
  const basePorts = {
    stat: ports.stat,
    readLines: ports.readLines,
    readText: ports.readText,
    walk: ports.walk,
    isWatcherReady: ports.isWatcherReady,
    getKnownFiles: ports.getKnownFiles,
    isSkippableReadError: ports.isSkippableReadError,
    readErrorCode: ports.readErrorCode,
    branchLabel: ports.branchLabel,
    telemetry: ports.telemetry,
    now: ports.now
  };
  function sessionJsonlPorts(input) {
    return {
      ...basePorts,
      fallbackProject: input.fallbackProject ?? ((file) => defaultFallbackProject(input.source, file)),
      canonicalParser: input.canonicalParser
    };
  }
  function makeSessionProvider(input) {
    return createSessionJsonlConversationProvider({
      source: input.source,
      root: input.root,
      ports: sessionJsonlPorts({
        source: input.source,
        fallbackProject: input.fallbackProject,
        canonicalParser: () => {
          if (!input.canonicalParser) return null;
          const binding = (input.canonicalParser.getBinding ?? ports.getParserBinding)();
          if (binding && typeof binding.then === "function") {
            throw new Error("Session JSONL canonical parser binding must be synchronous");
          }
          return binding ? makeSessionCanonicalParser({
            binding,
            source: input.canonicalParser.source
          }) : null;
        }
      })
    });
  }
  function makeCodexProvider(input) {
    return createCodexSessionConversationProvider({
      root: input.root,
      ports: {
        ...basePorts,
        fallbackProject: codexFallbackProject,
        canonicalParser: async () => {
          const binding = await ports.getParserBinding();
          return binding ? makeLocalCanonicalParser(binding, "codex", { requireHarnessId: "codex" }) : null;
        }
      }
    });
  }
  function makePiProvider(input) {
    return makeSessionProvider({
      source: "pi",
      root: input.root,
      canonicalParser: { source: "pi" }
    });
  }
  function makeOmpProvider() {
    return createOmpSessionConversationProvider({
      ports: {
        path: ports.path,
        walk: ports.walk,
        isWatcherReady: ports.isWatcherReady,
        getKnownFiles: ports.getKnownFiles,
        isSkippableReadError: ports.isSkippableReadError,
        readErrorCode: ports.readErrorCode,
        canonicalParser: async () => {
          const binding = await ports.getParserBinding();
          return binding ? makeLocalCanonicalParser(binding, "omp") : null;
        },
        telemetry: ports.telemetry,
        now: ports.now
      }
    });
  }
  function makeLocalJsonlProviders() {
    return {
      codexProvider: makeCodexProvider({ root: codexSessionRoot(ports.path) }),
      piProvider: makePiProvider({ root: piSessionRoot(ports.path) }),
      ompProvider: makeOmpProvider()
    };
  }
  async function summarizeCodexSession(path, knownMtimeMs, shouldStop, binding = null) {
    return summarizeCodexSessionConversation(
      {
        path,
        fallbackProject: codexFallbackProject(path),
        knownMtimeMs,
        shouldStop,
        canonicalParser: binding ? makeLocalCanonicalParser(binding, "codex", { requireHarnessId: "codex" }) : void 0
      },
      {
        ...basePorts
      }
    );
  }
  async function summarizeSessionJsonl(path, opts, knownMtimeMs) {
    const fallback = opts.fallbackProject ?? ((file) => defaultFallbackProject(opts.source, file));
    return summarizeSessionJsonlConversation(
      {
        path,
        source: opts.source,
        fallbackProject: fallback(path),
        shouldStop: opts.shouldStop,
        canonicalParser: opts.canonicalParser ? makeSessionCanonicalParser(opts.canonicalParser) : void 0,
        knownMtimeMs
      },
      sessionJsonlPorts({
        source: opts.source,
        fallbackProject: opts.fallbackProject,
        canonicalParser: () => null
      })
    );
  }
  return {
    parseConversationWithBinding,
    summarizeCodexSession,
    summarizeSessionJsonl,
    makeCodexProvider,
    makeSessionProvider,
    makePiProvider,
    makeOmpProvider,
    makeLocalJsonlProviders
  };
}
const LEGACY_OVERRIDES_MIGRATED_META_KEY = "overrides_migrated_at";
const LEGACY_OVERRIDES_DEFERRED_META_KEY = "overrides_deferred";
const TERMINALS = /* @__PURE__ */ new Set(["Terminal", "iTerm", "Warp", "Ghostty"]);
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function projectLegacyConversationOverrides(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;
  const terminal = TERMINALS.has(parsed.terminal) ? parsed.terminal : void 0;
  const dismissed = isRecord(parsed.dismissed) ? parsed.dismissed : {};
  const titles = isRecord(parsed.titles) ? parsed.titles : {};
  const refs = /* @__PURE__ */ new Set([...Object.keys(dismissed), ...Object.keys(titles)]);
  const overrides = [...refs].map((ref) => {
    const title = typeof titles[ref] === "string" ? titles[ref] : void 0;
    const dismissedAt = typeof dismissed[ref] === "number" ? dismissed[ref] : void 0;
    return { ref, title, dismissedAt };
  });
  return { terminal, overrides };
}
async function migrateLegacyConversationOverrides(deps) {
  if (await deps.meta.get(LEGACY_OVERRIDES_MIGRATED_META_KEY)) return;
  const file = await deps.file.readLegacyOverrides();
  if (file.kind === "missing") {
    await setMigratedAt(deps);
    return;
  }
  const projected = projectLegacyConversationOverrides(file.raw);
  if (!projected) {
    await setMigratedAt(deps);
    return;
  }
  if (projected.terminal) {
    await deps.settings.setTerminal(projected.terminal);
  }
  const deferred = await deps.storage.applyLegacyConversationOverrides(projected.overrides);
  await setDeferredLegacyOverrides(deps.meta, deferred);
  await setMigratedAt(deps);
  try {
    await deps.file.renameLegacyOverridesMigrated();
  } catch {
  }
}
async function applyDeferredLegacyConversationOverrides(ref, deps) {
  const blob = await deps.meta.get(LEGACY_OVERRIDES_DEFERRED_META_KEY);
  if (!blob) return;
  const map = parseDeferredLegacyOverrides(blob);
  if (!map) return;
  const entry = map[ref];
  if (!entry) return;
  const deferred = await deps.storage.applyLegacyConversationOverrides([
    { ref, title: entry.title, dismissedAt: entry.dismissedAt }
  ]);
  if (deferred.length > 0) return;
  delete map[ref];
  if (Object.keys(map).length === 0) {
    await deps.meta.delete(LEGACY_OVERRIDES_DEFERRED_META_KEY);
  } else {
    await deps.meta.set(LEGACY_OVERRIDES_DEFERRED_META_KEY, JSON.stringify(map));
  }
}
function parseDeferredLegacyOverrides(blob) {
  try {
    const parsed = JSON.parse(blob);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
async function setDeferredLegacyOverrides(meta, overrides) {
  const deferred = {};
  for (const override of overrides) {
    deferred[override.ref] = {
      title: override.title,
      dismissedAt: override.dismissedAt
    };
  }
  if (Object.keys(deferred).length > 0) {
    await meta.set(LEGACY_OVERRIDES_DEFERRED_META_KEY, JSON.stringify(deferred));
  }
}
async function setMigratedAt(deps) {
  const now = deps.now?.() ?? /* @__PURE__ */ new Date();
  await deps.meta.set(
    LEGACY_OVERRIDES_MIGRATED_META_KEY,
    typeof now === "string" ? now : now.toISOString()
  );
}
function createCachedKeyValueStore(ports, options = {}) {
  let initialized = false;
  let loading = null;
  let values = /* @__PURE__ */ new Map();
  async function initialize() {
    if (initialized) return;
    loading ??= ports.loadAll().then((rows) => {
      values = new Map(Object.entries(rows));
      initialized = true;
    }).finally(() => {
      loading = null;
    });
    await loading;
  }
  function get(key) {
    return values.get(key) ?? null;
  }
  function getAll() {
    return Object.fromEntries(values);
  }
  function set(key, value) {
    values.set(key, value);
    ports.set(key, value).catch((error) => {
      options.onPersistError?.({ operation: "set", key, value, error });
    });
  }
  async function setAsync(key, value) {
    await initialize();
    values.set(key, value);
    await ports.set(key, value);
  }
  function deleteValue(key) {
    values.delete(key);
    ports.delete?.(key).catch((error) => {
      options.onPersistError?.({ operation: "delete", key, error });
    });
  }
  return {
    initialize,
    get,
    getAll,
    set,
    setAsync,
    delete: deleteValue
  };
}
const RECENT_PROJECT_ROWS_LIMIT = 2e3;
function recentProjectRowLimit(limit) {
  const value = typeof limit === "number" && Number.isFinite(limit) ? Math.floor(limit) : 5;
  return Math.min(RECENT_PROJECT_ROWS_LIMIT, Math.max(1, value));
}
async function withProjectSetupSummaries(storage, rows) {
  const canonicalProjects = await storage.projects.listProjectsByRoots(
    rows.map((row) => row.path.replace(/\\/g, "/"))
  );
  const workspaceLocations = await storage.projects.listWorkspaceLocationsForProjects(
    canonicalProjects.map((project) => project.id)
  );
  const rootByProjectId = new Map(
    canonicalProjects.map((project) => [project.id, identity.projectRootOf(project).replace(/\\/g, "/")])
  );
  const workspacesByRoot = /* @__PURE__ */ new Map();
  for (const workspace of workspaceLocations) {
    const root = rootByProjectId.get(workspace.projectId);
    if (!root) continue;
    const list = workspacesByRoot.get(root) ?? [];
    list.push({ id: workspace.id, path: workspace.path, kind: workspace.kind });
    workspacesByRoot.set(root, list);
  }
  const rowsWithWorkspaces = rows.map((row) => ({
    ...row,
    workspace_locations: workspacesByRoot.get(row.path.replace(/\\/g, "/")) ?? []
  }));
  const summaries = await storage.projectSetupSummaries.listForWorkspacePaths(
    rowsWithWorkspaces.flatMap((row) => [
      row.path,
      ...row.display_path ? [row.display_path] : [],
      ...row.workspace_locations.map((workspace) => workspace.path)
    ])
  );
  const byPath = new Map(summaries.map((summary) => [summary.workspacePath, summary]));
  return rowsWithWorkspaces.map((row) => ({
    ...row,
    setup_summary: byPath.get(row.display_path ?? row.path) ?? byPath.get(row.path) ?? null,
    workspace_locations: row.workspace_locations.map((workspace) => ({
      ...workspace,
      setup_summary: byPath.get(workspace.path) ?? null
    }))
  }));
}
const CONVERSATION_SCOPE_SETTING = "conversations.scope";
function conversationScopeFromSetting(value) {
  return value === "blume" ? "blume" : "all";
}
const MAX_CACHED_SKIPPED_CONVERSATIONS = 2e4;
const MAX_CACHED_SKIPPED_REPOSITORIES = 1e3;
function effectiveConversationScope(scope, skips, cachedRegistrations) {
  if (scope === "blume" || skips) return scope;
  return cachedRegistrations > 0 ? "blume" : "all";
}
function skippedRepositoryMatcher(repositories) {
  const keys = new Set(
    repositories.map((repository) => repositoryKey.repositoryMatchKey(repository)).filter((key) => key !== null)
  );
  return {
    size: keys.size,
    matches(workspace) {
      if (keys.size === 0) return false;
      const remote = repositoryKey.repositoryMatchKey(workspace.canonicalRemote);
      if (remote && keys.has(remote)) return true;
      const folder = repositoryKey.repositoryMatchKey(workspace.root ?? workspace.path);
      return folder !== null && keys.has(folder);
    }
  };
}
function conversationGate(scope, registrations, skips, legacyRows = []) {
  const registered = registeredAgentSourceFilter(registrations);
  const skipped = registeredAgentSourceFilter(skips?.conversations ?? []);
  const legacy = legacyExclusions.legacyExclusionGate(legacyRows);
  const skippedRepositories = skippedRepositoryMatcher(skips?.repositories ?? []);
  return {
    scope,
    allowSource: scope === "blume" ? (harness, path) => registered(harness, path) : (harness, path) => !skipped(harness, path),
    excludesConversation: (harness, sourcePath, workspace) => legacy.excludes(workspace) || skippedRepositories.matches(workspace) && !registered(harness, sourcePath),
    exclusions: legacy.size + skippedRepositories.size
  };
}
function conversationGateFingerprint(scope, registrations, skips) {
  const key = (agents) => agents.map((a) => `${a.harness}\0${a.conversationId}`).sort();
  return JSON.stringify([
    scope,
    // Registrations decide what `blume` admits, and which conversations a Skip repository keeps.
    (skips?.repositories.length ?? 0) > 0 || scope === "blume" ? key(registrations) : [],
    key(skips?.conversations ?? []),
    [...skips?.repositories ?? []].map((r) => repositoryKey.repositoryMatchKey(r) ?? r).sort()
  ]);
}
function conversationSourcesOutsideGate(gate, rows) {
  const outside = /* @__PURE__ */ new Set();
  for (const row of rows) {
    if (!gate.allowSource(row.sourceKind, row.sourcePath) || gate.exclusions > 0 && gate.excludesConversation(row.sourceKind, row.sourcePath, {
      path: row.cwd,
      root: row.projectPath,
      canonicalRemote: row.gitRemote
    }))
      outside.add(row.sourcePath);
  }
  return [...outside];
}
function ledgerConversationSkips(policy) {
  if (!Array.isArray(policy.skipped) || !Array.isArray(policy.skippedRepositories)) return null;
  return {
    conversations: policy.skipped.slice(0, MAX_CACHED_SKIPPED_CONVERSATIONS),
    repositories: policy.skippedRepositories.slice(0, MAX_CACHED_SKIPPED_REPOSITORIES)
  };
}
const CURSOR_STATE_DB = cursorStateDbPath({
  platform: process.platform,
  env: process.env,
  homeDir: require$$0.homedir(),
  path: { join: pn.join }
});
let cursorStateDb;
function getCursorStateDb() {
  if (cursorStateDb !== void 0) return cursorStateDb;
  try {
    cursorStateDb = new Database(CURSOR_STATE_DB, {
      readonly: true,
      fileMustExist: true
    });
  } catch {
    cursorStateDb = null;
  }
  return cursorStateDb;
}
function readCursorDiskKV(key) {
  const db = getCursorStateDb();
  if (!db) return void 0;
  const row = db.prepare("SELECT value FROM cursorDiskKV WHERE key = ?").get(key);
  return row?.value;
}
const cursorComposerStateRuntime = createCursorComposerStateRuntime({
  cursorStateDbPath: CURSOR_STATE_DB,
  readCursorDiskKV,
  statMtimeMs: (path) => {
    try {
      return un.statSync(path).mtimeMs;
    } catch {
      return void 0;
    }
  }
});
function cursorComposerStatePaths() {
  return cursorComposerStateRuntime.statePaths();
}
function cursorStateMtimeMs() {
  return cursorComposerStateRuntime.stateMtimeMs();
}
function invalidateCursorTodoCache() {
  cursorComposerStateRuntime.invalidateCache();
}
function loadCursorComposerState(composerId) {
  return cursorComposerStateRuntime.loadComposerState(composerId);
}
function loadCursorComposerRepoPath(composerId) {
  return cursorComposerStateRuntime.loadComposerRepoPath(composerId);
}
const DESKTOP_TITLE_CACHE_MS = 1e3;
function defaultClaudeDesktopSessionsRoot(path) {
  return path.join(
    path.homedir(),
    "Library",
    "Application Support",
    "Claude",
    "claude-code-sessions"
  );
}
function createDesktopRootResolver(resolver, fallback) {
  return () => resolver?.() || fallback();
}
function createLocalDesktopProviderHost(ports) {
  const { path } = ports;
  const claudeProjectsRoot = path.join(path.homedir(), ".claude", "projects");
  const claudeSettingsPath = path.join(path.homedir(), ".claude", "settings.json");
  const claudeTasksRoot = () => path.join(path.homedir(), ".claude", "tasks");
  const cursorProjectsRoot = path.join(path.homedir(), ".cursor", "projects");
  const cursorCliConfigPath = path.join(path.homedir(), ".cursor", "cli-config.json");
  const externalStateRuntime = createClaudeExternalStateRuntime({
    settingsPath: claudeSettingsPath,
    desktopSessionsRoot: createDesktopRootResolver(
      ports.claudeDesktopSessionsRoot,
      () => defaultClaudeDesktopSessionsRoot(path)
    ),
    tasksRoot: createDesktopRootResolver(ports.claudeTasksRoot, claudeTasksRoot),
    deps: {
      fs: {
        readdir: ports.readDir,
        stat: ports.stat,
        readFile: ports.readText,
        writeFile: ports.writeText
      },
      path: {
        join: path.join,
        basename: path.basename
      }
    },
    desktopTitleCacheTtlMs: DESKTOP_TITLE_CACHE_MS,
    now: ports.now
  });
  const baseJsonlPorts = {
    stat: ports.stat,
    readLines: ports.readLines,
    walk: ports.walk,
    isWatcherReady: ports.isWatcherReady,
    getKnownFiles: ports.getKnownFiles,
    isSkippableReadError: ports.isSkippableReadError,
    readErrorCode: ports.readErrorCode,
    branchLabel: ports.branchLabel,
    telemetry: ports.telemetry,
    now: ports.now
  };
  const claudeSessionProviderPorts = {
    ...baseJsonlPorts,
    basename: path.basename,
    fallbackProject: (file) => claudeProjectNameFromPath(file, path.homedir()),
    readAskRules: externalStateRuntime.readAskRules,
    readDesktopTitle: externalStateRuntime.readDesktopTitle,
    readSessionState: externalStateRuntime.readSessionState,
    readSessionStateVersion: externalStateRuntime.readSessionStateVersion,
    readTaskState: externalStateRuntime.readTaskState,
    readTaskStateVersion: externalStateRuntime.readTaskStateVersion,
    homeDir: path.homedir(),
    getParserBinding: ports.getParserBinding
  };
  const cursorSessionProviderPorts = {
    ...baseJsonlPorts,
    readText: ports.readText,
    readDir: ports.readDir,
    basename: path.basename,
    subAgentDir: (parentPath) => path.join(path.dirname(parentPath), "subagents"),
    subAgentPath: (parentPath, entryName) => path.join(path.dirname(parentPath), "subagents", entryName),
    fallbackProject: (file) => cursorProjectNameFromPath(file, path.homedir()),
    deriveCwd: cursorCwdFromProjectPath,
    readComposerState: ports.readCursorComposerState,
    readComposerRepoPath: ports.readCursorComposerRepoPath,
    composerStateMtimeMs: ports.cursorComposerStateMtimeMs,
    approvalConfigPath: cursorCliConfigPath,
    homeDir: path.homedir(),
    getParserBinding: ports.getParserBinding
  };
  const localSessionSourceProviderHost = createLocalSessionSourceProviderHost({
    ...baseJsonlPorts,
    readText: ports.readText,
    getParserBinding: ports.getParserBinding,
    homedir: path.homedir,
    path
  });
  const claudeFsProvider = createClaudeSessionConversationProvider({
    root: claudeProjectsRoot,
    ports: claudeSessionProviderPorts
  });
  const cursorFsProvider = createCursorSessionConversationProvider({
    root: cursorProjectsRoot,
    ports: cursorSessionProviderPorts
  });
  const localJsonlProviders = localSessionSourceProviderHost.makeLocalJsonlProviders();
  const codexFsProvider = localJsonlProviders.codexProvider;
  const piFsProvider = localJsonlProviders.piProvider;
  const ompFsProvider = localJsonlProviders.ompProvider;
  async function currentClaudeSourceMtimeMs(file, transcriptMtimeMs) {
    return (await currentClaudeSessionSourceVersion(file, transcriptMtimeMs, claudeSessionProviderPorts)).sourceMtimeMs;
  }
  async function summarizeClaudeTranscript(file, knownMtimeMs, nowMs = ports.now?.() ?? Date.now(), shouldStop) {
    return summarizeClaudeSessionConversation(
      {
        path: file,
        knownMtimeMs,
        nowMs,
        shouldStop
      },
      claudeSessionProviderPorts
    );
  }
  async function summarizeCursorTranscript(file, knownMtimeMs, shouldStop) {
    return summarizeCursorSessionConversation(
      {
        path: file,
        knownMtimeMs,
        shouldStop
      },
      cursorSessionProviderPorts
    );
  }
  return {
    providers: [
      claudeFsProvider,
      cursorFsProvider,
      codexFsProvider,
      piFsProvider,
      ompFsProvider
    ],
    claudeFsProvider,
    cursorFsProvider,
    codexFsProvider,
    piFsProvider,
    ompFsProvider,
    parseConversationWithBinding: localSessionSourceProviderHost.parseConversationWithBinding,
    summarizeClaudeTranscript,
    summarizeCursorTranscript,
    summarizeCodexSession: localSessionSourceProviderHost.summarizeCodexSession,
    summarizeSessionJsonl: localSessionSourceProviderHost.summarizeSessionJsonl,
    makeSessionProvider: (opts) => localSessionSourceProviderHost.makeSessionProvider(opts),
    applyClaudeDesktopTitle: externalStateRuntime.applyDesktopTitle,
    resetClaudeDesktopTitleCache: externalStateRuntime.resetDesktopTitleCache,
    currentClaudeSourceMtimeMs
  };
}
function noCursorComposerState() {
  return void 0;
}
function zeroMtime() {
  return 0;
}
function createDesktopLocalProviderHost({
  getParserBinding,
  isWatcherReady = () => false,
  getKnownFiles = () => [],
  telemetry,
  readCursorComposerState = noCursorComposerState,
  readCursorComposerRepoPath = noCursorComposerState,
  cursorComposerStateMtimeMs = zeroMtime,
  claudeDesktopSessionsRoot,
  claudeTasksRoot,
  now
}) {
  return createLocalDesktopProviderHost({
    stat: promises.stat,
    readText: (path) => promises.readFile(path, "utf8"),
    readDir: (path) => promises.readdir(path, { withFileTypes: true }),
    writeText: (path, text) => promises.writeFile(path, text, "utf8"),
    readLines: jsonlFiles.readJsonlLines,
    walk: jsonlFiles.walkJsonlWithStat,
    isWatcherReady,
    getKnownFiles,
    isSkippableReadError: jsonlFiles.isSkippableJsonlReadError,
    readErrorCode: jsonlFiles.jsonlReadErrorCode,
    path: {
      homedir: require$$0.homedir,
      dirname: pn.dirname,
      basename: pn.basename,
      join: pn.join,
      sep: pn.sep
    },
    getParserBinding,
    branchLabel: jsonlFiles.gitBranchLabel,
    telemetry,
    readCursorComposerState,
    readCursorComposerRepoPath,
    cursorComposerStateMtimeMs,
    claudeDesktopSessionsRoot,
    claudeTasksRoot,
    now
  });
}
function evidencePinsDirectory(env = process.env, home = require$$0.homedir()) {
  return pn.join(env.BLUME_HOME || pn.join(home, ".blume"), EVIDENCE_PINS_DIRNAME);
}
const EVIDENCE_PINS_PER_REFRESH = 20;
function evidencePinScanOrder(names, after) {
  const sorted = names.filter((name) => evidencePinSignalId(name)).sort();
  const start = after === null ? -1 : sorted.findIndex((name) => name > after);
  return start <= 0 ? sorted : [...sorted.slice(start), ...sorted.slice(0, start)];
}
async function listEvidencePins(directory, limit, after = null) {
  let names;
  try {
    names = await promises.readdir(directory);
  } catch {
    return { pins: [], last: null };
  }
  const pins = [];
  let last = null;
  for (const name of evidencePinScanOrder(names, after)) {
    if (pins.length >= limit) break;
    last = name;
    const signalId = evidencePinSignalId(name);
    if (!signalId) continue;
    const path = pn.join(directory, name);
    try {
      const info = await promises.lstat(path);
      if (!info.isFile() || info.size > EVIDENCE_PIN_LIMITS.bytes) continue;
      pins.push({ signalId, raw: await promises.readFile(path, "utf8") });
    } catch {
    }
  }
  return { pins, last };
}
async function deleteEvidencePins(directory, signalIds) {
  for (const signalId of signalIds.slice(0, EVIDENCE_PIN_LIMITS.files)) {
    const name = evidencePinFileName(signalId);
    if (name) await promises.rm(pn.join(directory, name), { force: true }).catch(() => void 0);
  }
}
async function resolveEvidencePinDirectory(input) {
  await deleteEvidencePins(input.directory, input.completed);
  let last = input.cursor ?? null;
  const resolved = await resolveEvidencePins({
    listPins: async (limit) => {
      const listed = await listEvidencePins(
        input.directory,
        Math.min(limit, input.maximumFiles ?? limit),
        input.cursor ?? null
      );
      last = listed.last;
      return listed.pins;
    },
    references: input.references,
    now: input.now ?? Date.now
  });
  const maximumResolved = input.maximumResolved ?? EVIDENCE_PINS_PER_REFRESH;
  const cursor = resolved.length > maximumResolved ? evidencePinFileName(resolved[maximumResolved - 1].signalId) : last;
  return { resolved: resolved.slice(0, maximumResolved), cursor };
}
async function resolveEvidencePinRoots(input) {
  const appDirectory = evidencePinsDirectory({ BLUME_HOME: input.blumeRoot });
  let cursors = {
    app: null,
    shared: input.cursor ?? null
  };
  try {
    const parsed = JSON.parse(input.cursor ?? "");
    if (parsed.version === 1 && (parsed.app === null || typeof parsed.app === "string") && (parsed.shared === null || typeof parsed.shared === "string")) {
      cursors = { app: parsed.app, shared: parsed.shared };
    }
  } catch {
  }
  if (!input.sharedDirectory || appDirectory === input.sharedDirectory) {
    return resolveEvidencePinDirectory({
      ...input,
      directory: appDirectory,
      cursor: cursors.app ?? cursors.shared
    });
  }
  const resolved = [];
  for (const [key, directory] of [
    ["app", appDirectory],
    ["shared", input.sharedDirectory]
  ]) {
    if (input.shouldStop?.()) break;
    const result = await resolveEvidencePinDirectory({
      ...input,
      directory,
      cursor: cursors[key],
      maximumResolved: EVIDENCE_PINS_PER_REFRESH / 2,
      maximumFiles: Math.floor(EVIDENCE_PIN_LIMITS.files / 2)
    });
    cursors[key] = result.cursor;
    resolved.push(...result.resolved);
  }
  return { resolved, cursor: JSON.stringify({ version: 1, ...cursors }) };
}
exports.CONVERSATION_BACKFILL_DELAY_MS = CONVERSATION_BACKFILL_DELAY_MS;
exports.CONVERSATION_DAY_MS = CONVERSATION_DAY_MS;
exports.CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE = CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE;
exports.CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE = CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE;
exports.CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE = CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE;
exports.CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE = CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE;
exports.CONVERSATION_REFRESH_WORKER_UNAVAILABLE_ERROR_NAME = CONVERSATION_REFRESH_WORKER_UNAVAILABLE_ERROR_NAME;
exports.CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE = CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE;
exports.CONVERSATION_SCOPE_SETTING = CONVERSATION_SCOPE_SETTING;
exports.CONVERSATION_TARGETED_REFRESH_MAX_PATHS = CONVERSATION_TARGETED_REFRESH_MAX_PATHS;
exports.CONVERSATION_WEEK_MS = CONVERSATION_WEEK_MS;
exports.MAX_CACHED_SKIPPED_CONVERSATIONS = MAX_CACHED_SKIPPED_CONVERSATIONS;
exports.MAX_CACHED_SKIPPED_REPOSITORIES = MAX_CACHED_SKIPPED_REPOSITORIES;
exports.MENU_BAR_AGENT_STATUS_LABELS = MENU_BAR_AGENT_STATUS_LABELS;
exports.MENU_BAR_USAGE_PROVIDER_LABELS = MENU_BAR_USAGE_PROVIDER_LABELS;
exports.MENU_BAR_USAGE_PROVIDER_ORDER = MENU_BAR_USAGE_PROVIDER_ORDER;
exports.TRAY_ANIMATION_FRAME_MS = TRAY_ANIMATION_FRAME_MS;
exports.TRAY_FLOWER_SIZE = TRAY_FLOWER_SIZE;
exports.TRAY_IMAGE_SCALE = TRAY_IMAGE_SCALE;
exports.TRAY_RUNNING_ANIMATION_FRAMES = TRAY_RUNNING_ANIMATION_FRAMES;
exports.WAITING_MS = WAITING_MS;
exports.appendSessionInfoTitleToFile = appendSessionInfoTitleToFile;
exports.applyDeferredLegacyConversationOverrides = applyDeferredLegacyConversationOverrides;
exports.conversationGate = conversationGate;
exports.conversationGateFingerprint = conversationGateFingerprint;
exports.conversationScopeFromSetting = conversationScopeFromSetting;
exports.conversationSourcesOutsideGate = conversationSourcesOutsideGate;
exports.conversationWatchRoots = conversationWatchRoots;
exports.createCachedKeyValueStore = createCachedKeyValueStore;
exports.createConversationIngestRuntime = createConversationIngestRuntime;
exports.createConversationRefreshService = createConversationRefreshService;
exports.createConversationUseCases = createConversationUseCases;
exports.createDesktopLocalProviderHost = createDesktopLocalProviderHost;
exports.createMenuBarTrayIconRenderPayload = createMenuBarTrayIconRenderPayload;
exports.createMenuBarTrayIconSvg = createMenuBarTrayIconSvg;
exports.createWatchRefreshScheduler = createWatchRefreshScheduler;
exports.cursorComposerStatePaths = cursorComposerStatePaths;
exports.cursorStateMtimeMs = cursorStateMtimeMs;
exports.effectiveConversationScope = effectiveConversationScope;
exports.evidencePinsDirectory = evidencePinsDirectory;
exports.generateConversationTitle = generateConversationTitle;
exports.invalidateCursorTodoCache = invalidateCursorTodoCache;
exports.isExpectedConversationProviderStopError = isExpectedConversationProviderStopError;
exports.isExpectedSqliteDiskFullError = isExpectedSqliteDiskFullError;
exports.ledgerConversationSkips = ledgerConversationSkips;
exports.loadCursorComposerRepoPath = loadCursorComposerRepoPath;
exports.loadCursorComposerState = loadCursorComposerState;
exports.loadMenuBarConversationProjection = loadMenuBarConversationProjection;
exports.locateEvidence = locateEvidence;
exports.menuBarColorForHarness = menuBarColorForHarness;
exports.menuBarColorForStatus = menuBarColorForStatus;
exports.mergeConversationRefreshTargetPaths = mergeConversationRefreshTargetPaths;
exports.migrateLegacyConversationOverrides = migrateLegacyConversationOverrides;
exports.projectMenuBarUsage = projectMenuBarUsage;
exports.recentProjectRowLimit = recentProjectRowLimit;
exports.registeredAgentSourceFilter = registeredAgentSourceFilter;
exports.resolveEvidencePinRoots = resolveEvidencePinRoots;
exports.shouldAnimateMenuBarIcon = shouldAnimateMenuBarIcon;
exports.shouldIgnoreConversationWatchPath = shouldIgnoreConversationWatchPath;
exports.shouldReportConversationProviderAppError = shouldReportConversationProviderAppError;
exports.sourceVersionFromParsed = sourceVersionFromParsed;
exports.withProjectSetupSummaries = withProjectSetupSummaries;
//# sourceMappingURL=evidencePins-DGYf0g3u.js.map

//# debugId=0bdc7547-7b4f-5e0c-92d0-6bad43ef3f63
