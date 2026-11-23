"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c0f82221-9994-51fe-afd5-bb602ddc7173")}catch(e){}}();

const node_child_process = require("node:child_process");
const fs = require("node:fs");
const Nl = require("node:os");
const _n = require("node:path");
const index = require("./index-UFoqNX7c.js");
function nonEmptyString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function record(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function codexSubagentKind(source) {
  const subagent = record(record(source).subagent);
  const direct = nonEmptyString(subagent.kind) ?? nonEmptyString(subagent.role) ?? nonEmptyString(subagent.agent_role) ?? nonEmptyString(subagent.other);
  if (direct) return direct;
  const spawn = record(subagent.thread_spawn);
  const role2 = nonEmptyString(spawn.agent_role) ?? nonEmptyString(spawn.role);
  if (role2) return role2;
  const path = nonEmptyString(spawn.agent_path);
  if (path) {
    const leaf = path.split("/").map((part) => part.trim()).filter(Boolean).at(-1);
    if (leaf) return leaf;
  }
  return nonEmptyString(spawn.agent_nickname) ?? nonEmptyString(spawn.nickname);
}
class ParserValidationError extends Error {
  constructor(path, message2) {
    super(`${path}: ${message2}`);
    this.name = "ParserValidationError";
    this.path = path;
  }
}
function obj(value, path) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ParserValidationError(path, "expected object");
  }
  const record2 = {};
  for (const key of Object.keys(value)) record2[key] = Reflect.get(value, key);
  return record2;
}
function arr(value, path) {
  if (!Array.isArray(value)) throw new ParserValidationError(path, "expected array");
  return value;
}
function str(value, path) {
  if (typeof value !== "string") throw new ParserValidationError(path, "expected string");
  return value;
}
function optStr(value, path) {
  return value === void 0 || value === null ? void 0 : str(value, path);
}
function num(value, path) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ParserValidationError(path, "expected finite number");
  }
  return value;
}
function position(value, path) {
  const valueAsNumber = num(value, path);
  if (!Number.isInteger(valueAsNumber) || valueAsNumber < 0) {
    throw new ParserValidationError(path, "expected non-negative integer");
  }
  return valueAsNumber;
}
function optNum(value, path) {
  return value === void 0 || value === null ? void 0 : num(value, path);
}
function optPosition(value, path) {
  return value === void 0 || value === null ? void 0 : position(value, path);
}
function optNumArr(value, path) {
  if (value === void 0 || value === null) return void 0;
  return arr(value, path).map((n, i) => position(n, `${path}[${i}]`));
}
function optBool(value, path) {
  if (value === void 0 || value === null) return void 0;
  if (typeof value !== "boolean") throw new ParserValidationError(path, "expected boolean");
  return value;
}
const ROLES = ["user", "assistant", "tool", "system", "other"];
function role(value, path) {
  const s = str(value, path);
  if (!ROLES.includes(s))
    throw new ParserValidationError(path, `bad role "${s}"`);
  return s === "user" || s === "assistant" || s === "tool" || s === "system" ? s : "other";
}
function message(value, path) {
  const m = obj(value, path);
  const id = optStr(m.id, `${path}.id`);
  return {
    position: position(m.position, `${path}.position`),
    ...id ? { id } : {},
    role: role(m.role, `${path}.role`),
    text: str(m.text, `${path}.text`),
    timestampMs: optNum(m.timestampMs, `${path}.timestampMs`),
    source: optStr(m.source, `${path}.source`)
  };
}
function toolCall(value, path) {
  const t = obj(value, path);
  return {
    name: str(t.name, `${path}.name`),
    toolUseId: optStr(t.toolUseId, `${path}.toolUseId`),
    position: optPosition(t.position, `${path}.position`),
    input: t.input,
    resultText: optStr(t.resultText, `${path}.resultText`),
    isError: optBool(t.isError, `${path}.isError`),
    startedAtMs: optNum(t.startedAtMs, `${path}.startedAtMs`),
    endedAtMs: optNum(t.endedAtMs, `${path}.endedAtMs`),
    source: optStr(t.source, `${path}.source`)
  };
}
function todo(value, path) {
  const t = obj(value, path);
  const state = str(t.state, `${path}.state`);
  if (state !== "pending" && state !== "current" && state !== "done") {
    throw new ParserValidationError(`${path}.state`, `bad todo state "${state}"`);
  }
  return {
    ...t.id === void 0 || t.id === null ? {} : { id: str(t.id, `${path}.id`) },
    position: optPosition(t.position, `${path}.position`),
    content: str(t.content, `${path}.content`),
    state,
    source: optStr(t.source, `${path}.source`)
  };
}
function userTurn(value, path) {
  const t = obj(value, path);
  const state = t.state;
  if (!index.isConversationState(state))
    throw new ParserValidationError(`${path}.state`, "bad conversation state");
  return {
    position: position(t.position, `${path}.position`),
    prompt: str(t.prompt, `${path}.prompt`),
    state,
    startedAt: optNum(t.startedAt, `${path}.startedAt`),
    endedAt: optNum(t.endedAt, `${path}.endedAt`),
    startMessagePosition: optPosition(t.startMessagePosition, `${path}.startMessagePosition`),
    messagePositions: optNumArr(t.messagePositions, `${path}.messagePositions`),
    toolCallPositions: optNumArr(t.toolCallPositions, `${path}.toolCallPositions`),
    todoPositions: optNumArr(t.todoPositions, `${path}.todoPositions`)
  };
}
function subAgent(value, path) {
  const s = obj(value, path);
  const state = s.state;
  if (!index.isConversationState(state))
    throw new ParserValidationError(`${path}.state`, "bad conversation state");
  return {
    id: str(s.id, `${path}.id`),
    title: str(s.title, `${path}.title`),
    prompt: str(s.prompt, `${path}.prompt`),
    state,
    source: optStr(s.source, `${path}.source`)
  };
}
function parseConversationJson(value) {
  const c = obj(value, "$");
  const state = c.state;
  if (!index.isConversationState(state))
    throw new ParserValidationError("$.state", "bad conversation state");
  return {
    ref: str(c.ref, "$.ref"),
    sessionId: optStr(c.sessionId, "$.sessionId"),
    harnessId: str(c.harnessId, "$.harnessId"),
    cwd: optStr(c.cwd, "$.cwd"),
    projectRoot: optStr(c.projectRoot, "$.projectRoot"),
    workspaceName: optStr(c.workspaceName, "$.workspaceName"),
    branch: optStr(c.branch, "$.branch"),
    parentThreadId: optStr(c.parentThreadId, "$.parentThreadId"),
    threadSource: optStr(c.threadSource, "$.threadSource"),
    subagentKind: optStr(c.subagentKind, "$.subagentKind"),
    title: optStr(c.title, "$.title"),
    preview: str(c.preview, "$.preview"),
    state,
    startedAt: optNum(c.startedAt, "$.startedAt"),
    parsedAt: optNum(c.parsedAt, "$.parsedAt"),
    lastActivityTs: num(c.lastActivityTs, "$.lastActivityTs"),
    lastEventKind: optStr(c.lastEventKind, "$.lastEventKind"),
    ...optStr(c.activityReason, "$.activityReason") ? { activityReason: optStr(c.activityReason, "$.activityReason") } : {},
    activitySource: optStr(c.activitySource, "$.activitySource"),
    messages: arr(c.messages, "$.messages").map((m, i) => message(m, `$.messages[${i}]`)),
    toolCalls: arr(c.toolCalls, "$.toolCalls").map((t, i) => toolCall(t, `$.toolCalls[${i}]`)),
    todos: arr(c.todos, "$.todos").map((t, i) => todo(t, `$.todos[${i}]`)),
    userTurns: arr(c.userTurns, "$.userTurns").map((t, i) => userTurn(t, `$.userTurns[${i}]`)),
    subAgents: c.subAgents === void 0 || c.subAgents === null ? void 0 : arr(c.subAgents, "$.subAgents").map((s, i) => subAgent(s, `$.subAgents[${i}]`))
  };
}
function validateParsedConversation(input, value) {
  const parsed = parseConversationJson(value);
  if (parsed.harnessId !== input.harnessId) {
    throw new ParserValidationError(
      "$.harnessId",
      `expected "${input.harnessId}" but got "${parsed.harnessId}"`
    );
  }
  return parsed;
}
function toRecord(value) {
  if (typeof value !== "object" || value === null) return {};
  const out = {};
  for (const key of Object.keys(value)) out[key] = Reflect.get(value, key);
  return out;
}
function asArray(value) {
  return Array.isArray(value) ? value : [];
}
function asString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function asNumber(value, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}
function asOptString(value) {
  return typeof value === "string" ? value : void 0;
}
function asOptNumber(value) {
  return typeof value === "number" ? value : void 0;
}
function asRunId(value, fallback) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}
function asNumberArray(value) {
  if (!Array.isArray(value)) return void 0;
  return value.filter((n) => typeof n === "number");
}
function requiredRecord(value, path) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ParserValidationError(path, "expected object");
  }
  return toRecord(value);
}
function requiredArray(value, path) {
  if (!Array.isArray(value)) throw new ParserValidationError(path, "expected array");
  return value;
}
function requiredString(value, path) {
  if (typeof value !== "string") throw new ParserValidationError(path, "expected string");
  return value;
}
function requiredBoolean(value, path) {
  if (typeof value !== "boolean") throw new ParserValidationError(path, "expected boolean");
  return value;
}
function requiredFiniteNumber(value, path) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ParserValidationError(path, "expected finite number");
  }
  return value;
}
function requiredPosition(value, path) {
  const number = requiredFiniteNumber(value, path);
  if (!Number.isInteger(number) || number < 0) {
    throw new ParserValidationError(path, "expected non-negative integer");
  }
  return number;
}
function optionalString(value, path) {
  if (value !== void 0 && value !== null) requiredString(value, path);
}
function optionalTimestamp(value, path) {
  if (value === void 0 || value === null) return;
  const timestamp = requiredString(value, path);
  if (Number.isNaN(Date.parse(timestamp))) {
    throw new ParserValidationError(path, "expected valid timestamp string");
  }
}
const RAW_ACTIVITY_STATES = /* @__PURE__ */ new Set([
  "running",
  "needs-approval",
  "finished",
  "failed",
  "cancelled",
  "unknown"
]);
function rawActivityState(value, path) {
  const state = requiredString(value, path);
  if (!RAW_ACTIVITY_STATES.has(state)) {
    throw new ParserValidationError(path, `bad activity state "${state}"`);
  }
}
function validateParserOutputJson(value) {
  const root = requiredRecord(value, "$");
  requiredString(root.harness, "$.harness");
  requiredFiniteNumber(root.parsedAt, "$.parsedAt");
  const state = requiredRecord(root.state, "$.state");
  optionalString(state.title, "$.state.title");
  const activity = requiredRecord(state.activity, "$.state.activity");
  rawActivityState(activity.state, "$.state.activity.state");
  requiredString(activity.lastEventKind, "$.state.activity.lastEventKind");
  optionalString(activity.reason, "$.state.activity.reason");
  optionalString(activity.source, "$.state.activity.source");
  for (const [index2, entry] of requiredArray(state.messages, "$.state.messages").entries()) {
    const path = `$.state.messages[${index2}]`;
    const message2 = requiredRecord(entry, path);
    requiredPosition(message2.position, `${path}.position`);
    optionalString(message2.id, `${path}.id`);
    requiredString(message2.role, `${path}.role`);
    requiredString(message2.text, `${path}.text`);
    optionalTimestamp(message2.timestamp, `${path}.timestamp`);
    requiredString(message2.source, `${path}.source`);
  }
  for (const [index2, entry] of requiredArray(state.toolCalls, "$.state.toolCalls").entries()) {
    const path = `$.state.toolCalls[${index2}]`;
    const call = requiredRecord(entry, path);
    requiredPosition(call.position, `${path}.position`);
    optionalString(call.toolUseId, `${path}.toolUseId`);
    requiredString(call.name, `${path}.name`);
    optionalString(call.resultText, `${path}.resultText`);
    requiredBoolean(call.isError, `${path}.isError`);
    optionalTimestamp(call.startedAt, `${path}.startedAt`);
    optionalTimestamp(call.endedAt, `${path}.endedAt`);
    requiredString(call.source, `${path}.source`);
  }
  for (const [index2, entry] of requiredArray(state.todos, "$.state.todos").entries()) {
    const path = `$.state.todos[${index2}]`;
    const todo2 = requiredRecord(entry, path);
    requiredPosition(todo2.position, `${path}.position`);
    optionalString(todo2.id, `${path}.id`);
    requiredString(todo2.content, `${path}.content`);
    const todoState = requiredString(todo2.state, `${path}.state`);
    if (todoState !== "pending" && todoState !== "current" && todoState !== "done") {
      throw new ParserValidationError(`${path}.state`, `bad todo state "${todoState}"`);
    }
    requiredString(todo2.source, `${path}.source`);
  }
  for (const [index2, entry] of requiredArray(state.userTurns, "$.state.userTurns").entries()) {
    const path = `$.state.userTurns[${index2}]`;
    const turn = requiredRecord(entry, path);
    requiredPosition(turn.position, `${path}.position`);
    requiredPosition(turn.startMessagePosition, `${path}.startMessagePosition`);
    requiredString(turn.prompt, `${path}.prompt`);
    rawActivityState(turn.state, `${path}.state`);
    for (const field of ["messagePositions", "toolCallPositions", "todoPositions"]) {
      for (const [positionIndex, positionValue] of requiredArray(
        turn[field],
        `${path}.${field}`
      ).entries()) {
        requiredPosition(positionValue, `${path}.${field}[${positionIndex}]`);
      }
    }
  }
  if (state.subAgents !== void 0 && state.subAgents !== null) {
    for (const [index2, entry] of requiredArray(state.subAgents, "$.state.subAgents").entries()) {
      const path = `$.state.subAgents[${index2}]`;
      const subAgent2 = requiredRecord(entry, path);
      requiredString(subAgent2.id, `${path}.id`);
      requiredString(subAgent2.title, `${path}.title`);
      requiredString(subAgent2.prompt, `${path}.prompt`);
      rawActivityState(subAgent2.state, `${path}.state`);
      requiredString(subAgent2.source, `${path}.source`);
    }
  }
}
function parseTimestamp(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? void 0 : ms;
  }
  return void 0;
}
function mapState(state) {
  switch (state) {
    case "running":
      return "running";
    case "needs-approval":
      return "needs-approval";
    case "finished":
      return "finished";
    case "failed":
      return "failed";
    case "cancelled":
      return "inactive";
    default:
      return "idle";
  }
}
function mapRole(role2) {
  return role2 === "user" || role2 === "assistant" || role2 === "tool" || role2 === "system" ? role2 : "other";
}
function mapTodoState(state) {
  return state === "current" || state === "done" ? state : "pending";
}
function derivePreview(messages) {
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const source = lastAssistant ?? messages[messages.length - 1];
  if (!source) return "";
  return source.text.split("\n")[0]?.slice(0, 280) ?? "";
}
function latestTimestampMs(messages, toolCalls, fallback) {
  let latest = 0;
  for (const message2 of messages) {
    if (message2.timestampMs !== void 0 && message2.timestampMs > latest)
      latest = message2.timestampMs;
  }
  for (const toolCall2 of toolCalls) {
    if (toolCall2.startedAtMs !== void 0 && toolCall2.startedAtMs > latest)
      latest = toolCall2.startedAtMs;
    if (toolCall2.endedAtMs !== void 0 && toolCall2.endedAtMs > latest) latest = toolCall2.endedAtMs;
  }
  return latest || fallback;
}
function firstTimestampMs(messages) {
  for (const message2 of messages) {
    if (message2.timestampMs !== void 0) return message2.timestampMs;
  }
  return void 0;
}
function collectCodexSessionMetadata(raw) {
  const state = toRecord(toRecord(raw).state);
  const snapshots = toRecord(state.snapshots);
  const out = {};
  for (const entry of asArray(snapshots.codexSessionMeta)) {
    const payload = toRecord(entry);
    if (!out.cwd) out.cwd = asOptString(payload.cwd);
    if (!out.sessionId) out.sessionId = asOptString(payload.id);
    if (!out.parentThreadId) out.parentThreadId = asOptString(payload.parent_thread_id);
    if (!out.threadSource) out.threadSource = asOptString(payload.thread_source);
    if (!out.subagentKind) out.subagentKind = codexSubagentKind(payload.source);
  }
  return out;
}
function collectClaudeSessionMetadata(raw) {
  const state = toRecord(toRecord(raw).state);
  const snapshots = toRecord(state.snapshots);
  const out = {};
  for (const entry of asArray(snapshots.claudeSessionMeta)) {
    const payload = toRecord(entry);
    if (!out.cwd) out.cwd = asOptString(payload.cwd);
    if (!out.sessionId) out.sessionId = asOptString(payload.sessionId);
    if (!out.conversationId) out.conversationId = asOptString(payload.conversationId);
    if (!out.branch) out.branch = asOptString(payload.gitBranch) ?? asOptString(payload.branch);
  }
  return out;
}
function cleanTitle(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function mapParserOutput(raw, overrides = {}) {
  validateParserOutputJson(raw);
  const root = toRecord(raw);
  const state = toRecord(root.state);
  const activity = toRecord(state.activity);
  const parsedAt = asNumber(root.parsedAt);
  const messages = asArray(state.messages).map((entry, index2) => {
    const message2 = toRecord(entry);
    const id = asOptString(message2.id);
    return {
      position: asNumber(message2.position, index2),
      ...id ? { id } : {},
      role: mapRole(asString(message2.role)),
      text: asString(message2.text),
      timestampMs: parseTimestamp(message2.timestamp),
      source: asOptString(message2.source)
    };
  });
  const toolCalls = asArray(state.toolCalls).map((entry, index2) => {
    const call = toRecord(entry);
    return {
      name: asString(call.name),
      toolUseId: asOptString(call.toolUseId),
      position: asNumber(call.position, index2),
      input: call.input,
      resultText: typeof call.resultText === "string" ? call.resultText : void 0,
      isError: call.isError === true,
      startedAtMs: parseTimestamp(call.startedAtMs ?? call.startedAt),
      endedAtMs: parseTimestamp(call.endedAtMs ?? call.endedAt),
      source: asOptString(call.source)
    };
  });
  const todos = asArray(state.todos).map((entry, index2) => {
    const todo2 = toRecord(entry);
    return {
      ...todo2.id === void 0 || todo2.id === null ? {} : { id: asString(todo2.id) },
      position: asNumber(todo2.position, index2),
      content: asString(todo2.content),
      state: mapTodoState(asString(todo2.state)),
      source: asOptString(todo2.source)
    };
  });
  const messageTimestamps = new Map(
    messages.map((message2) => [message2.position, message2.timestampMs])
  );
  const userTurns = asArray(state.userTurns).map((entry, index2) => {
    const turn = toRecord(entry);
    const startMessagePosition = asOptNumber(turn.startMessagePosition);
    return {
      position: asNumber(turn.position, index2),
      prompt: asString(turn.prompt),
      state: mapState(asString(turn.state, "unknown")),
      startMessagePosition,
      startedAt: startMessagePosition === void 0 ? void 0 : messageTimestamps.get(startMessagePosition),
      messagePositions: asNumberArray(turn.messagePositions),
      toolCallPositions: asNumberArray(turn.toolCallPositions),
      todoPositions: asNumberArray(turn.todoPositions)
    };
  });
  const subAgents = asArray(state.subAgents).map((entry) => {
    const sub = toRecord(entry);
    return {
      id: asString(sub.id),
      title: asString(sub.title),
      prompt: asString(sub.prompt),
      state: mapState(asString(sub.state, "unknown")),
      source: asOptString(sub.source)
    };
  });
  const harness = asString(root.harness);
  const metadata = harness === "codex" ? collectCodexSessionMetadata(raw) : harness === "claude" ? collectClaudeSessionMetadata(raw) : {};
  const lastActivityTs = latestTimestampMs(messages, toolCalls, parsedAt);
  const title = overrides.title ?? cleanTitle(state.title);
  return {
    ref: overrides.ref ?? (harness === "codex" && metadata.sessionId ? metadata.sessionId : harness === "claude" && metadata.conversationId ? `claude:${metadata.conversationId}` : asRunId(root.runId, metadata.sessionId ?? "unknown")),
    ...metadata.sessionId ? { sessionId: metadata.sessionId } : {},
    harnessId: harness,
    state: mapState(asString(activity.state, "unknown")),
    preview: derivePreview(messages),
    parsedAt,
    startedAt: firstTimestampMs(messages),
    lastActivityTs,
    lastEventKind: asOptString(activity.lastEventKind),
    ...asOptString(activity.reason) ? { activityReason: asOptString(activity.reason) } : {},
    activitySource: asOptString(activity.source),
    messages,
    toolCalls,
    todos,
    userTurns,
    ...subAgents.length > 0 ? { subAgents } : {},
    ...overrides.projectRoot ? { projectRoot: overrides.projectRoot } : {},
    ...overrides.cwd || metadata.cwd ? { cwd: overrides.cwd ?? metadata.cwd } : {},
    ...overrides.branch || metadata.branch ? { branch: overrides.branch ?? metadata.branch } : {},
    ...title ? { title } : {},
    ...overrides.workspaceName ? { workspaceName: overrides.workspaceName } : {},
    ...metadata.parentThreadId ? { parentThreadId: metadata.parentThreadId } : {},
    ...metadata.threadSource ? { threadSource: metadata.threadSource } : {},
    ...metadata.subagentKind ? { subagentKind: metadata.subagentKind } : {}
  };
}
function harnessParserBinaryName(platform = process.platform) {
  return platform === "win32" ? "harness-parser.exe" : "harness-parser";
}
function resolveHarnessParserBinaryPath(ctx = {}) {
  const binaryName = harnessParserBinaryName(ctx.platform);
  const candidates = [];
  const override = ctx.env?.HARNESS_PARSER_BIN;
  if (override) candidates.push(override);
  candidates.push(...ctx.candidates ?? []);
  if (ctx.devAppPath) {
    candidates.push(
      _n.join(ctx.devAppPath, "..", "..", "crates", "harness-parser", "target", "release", binaryName),
      _n.join(
        ctx.devAppPath,
        "..",
        "..",
        "..",
        "crates",
        "harness-parser",
        "target",
        "release",
        binaryName
      )
    );
  }
  if (ctx.resourcesPath) {
    candidates.push(
      _n.join(ctx.resourcesPath, "app.asar.unpacked", "resources", "harness-parser", binaryName),
      _n.join(ctx.resourcesPath, "harness-parser", binaryName)
    );
  }
  const exists = ctx.exists ?? fs.existsSync;
  return candidates.find((candidate) => exists(candidate)) ?? null;
}
function materializeInput(input) {
  if (!input.raw || input.raw.length === 0) {
    return { path: input.sourcePath, cleanup: () => {
    } };
  }
  const root = fs.mkdtempSync(_n.join(Nl.tmpdir(), "blume-parser-"));
  const rel = input.sourcePath.replace(/^([A-Za-z]:)?[\\/]+/, "").replace(/\\/g, "/") || "session.jsonl";
  const path = _n.join(root, rel);
  fs.mkdirSync(_n.dirname(path), { recursive: true });
  fs.writeFileSync(path, input.raw, "utf8");
  return { path, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}
function createSubprocessBinding(options) {
  return {
    async parse(input) {
      const materialized = materializeInput(input);
      const outputDir = fs.mkdtempSync(_n.join(Nl.tmpdir(), "blume-parser-output-"));
      const outputPath = _n.join(outputDir, "parser-output.json");
      const outputFd = fs.openSync(outputPath, "w");
      try {
        let result;
        try {
          result = node_child_process.spawnSync(
            options.binaryPath,
            [
              ...options.binaryArgs ?? [],
              "parse-run",
              "--input",
              materialized.path,
              "--harness",
              input.harnessId,
              "--version",
              input.formatVersion ?? options.defaultVersion ?? "family"
            ],
            // Large Codex/Claude sessions can emit parser JSON beyond Node's
            // child-process stdout buffer. Write stdout to disk and keep only
            // stderr buffered for diagnostics. windowsHide: the parser is a
            // console-subsystem exe; without it every parse flashes a console
            // window on Windows.
            {
              encoding: "utf8",
              stdio: ["ignore", outputFd, "pipe"],
              maxBuffer: 1024 * 1024,
              windowsHide: true
            }
          );
        } finally {
          fs.closeSync(outputFd);
        }
        if (result.error) throw result.error;
        if (result.status !== 0) {
          throw new Error(`harness-parser exited ${result.status}: ${result.stderr}`);
        }
        const raw = JSON.parse(fs.readFileSync(outputPath, "utf8"));
        return validateParsedConversation(input, mapParserOutput(raw));
      } finally {
        fs.rmSync(outputDir, { recursive: true, force: true });
        materialized.cleanup();
      }
    }
  };
}
exports.createSubprocessBinding = createSubprocessBinding;
exports.resolveHarnessParserBinaryPath = resolveHarnessParserBinaryPath;
//# sourceMappingURL=rustBinding.node-BougJ60f.js.map

//# debugId=c0f82221-9994-51fe-afd5-bb602ddc7173
