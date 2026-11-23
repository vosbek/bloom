"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d11870b5-9750-5550-bbf4-8c066a9fd1f9")}catch(e){}}();

const COMPLETE_TRANSCRIPT_PAGE_LIMIT = 25;
const MAX_TRANSCRIPT_PAGES = 1e5;
async function loadCompleteConversationTranscript(loadPage, onProgress, signal) {
  let beforeTurnPosition;
  let conversation;
  let completed = false;
  const seenCursors = /* @__PURE__ */ new Set();
  const turns = /* @__PURE__ */ new Map();
  const events = /* @__PURE__ */ new Map();
  const tools = /* @__PURE__ */ new Map();
  for (let pageIndex = 0; pageIndex < MAX_TRANSCRIPT_PAGES; pageIndex += 1) {
    signal?.throwIfAborted();
    const page = await loadPage({
      ...beforeTurnPosition === void 0 ? {} : { beforeTurnPosition },
      limit: COMPLETE_TRANSCRIPT_PAGE_LIMIT,
      ...signal ? { signal } : {}
    });
    signal?.throwIfAborted();
    if (!page) return null;
    conversation ??= page.conversation;
    for (const turn of page.userTurns) turns.set(turn.id, turn);
    for (const event of page.events) events.set(event.id, event);
    for (const tool of page.toolCalls) tools.set(tool.id, tool);
    onProgress?.();
    if (!page.pagination.hasMoreBefore) {
      completed = true;
      break;
    }
    const next = page.pagination.nextBeforeTurnPosition;
    if (next === null || seenCursors.has(next)) {
      throw new Error("conversation transcript pagination did not advance");
    }
    seenCursors.add(next);
    beforeTurnPosition = next;
  }
  if (conversation === void 0) return null;
  if (!completed) throw new Error("conversation transcript exceeded the maximum page count");
  return {
    conversation,
    userTurns: [...turns.values()].sort((a, b) => a.position - b.position),
    events: [...events.values()].sort((a, b) => a.position - b.position || a.id - b.id),
    toolCalls: [...tools.values()].sort(
      (a, b) => (a.started_at_ms ?? a.ended_at_ms ?? a.id) - (b.started_at_ms ?? b.ended_at_ms ?? b.id)
    )
  };
}
function continuationProjectPath(location, paths) {
  if (location.cwd && paths.isAbsolute(location.cwd)) return paths.resolve(location.cwd);
  if (location.projectPath && paths.isAbsolute(location.projectPath)) {
    return paths.resolve(location.projectPath);
  }
  throw new Error("This conversation does not have a local project path");
}
async function prepareConversationContinuation(input, ports) {
  input.signal?.throwIfAborted();
  const location = await ports.loadLocation(input.ref);
  if (!location) throw new Error(`Unknown conversation: ${input.ref}`);
  const projectPath = continuationProjectPath(location, ports.paths);
  const transcript = await loadCompleteConversationTranscript(
    (options) => ports.loadTranscriptPage(input.ref, options),
    input.onProgress,
    input.signal
  );
  if (!transcript) throw new Error(`Conversation transcript is unavailable: ${input.ref}`);
  const repositoryRoot = await ports.resolveRepositoryRoot(projectPath, input.signal);
  if (!repositoryRoot || !ports.paths.isAbsolute(repositoryRoot)) {
    throw new Error("Could not resolve the conversation Git repository");
  }
  const cwdRelativeToRoot = ports.paths.relative(repositoryRoot, projectPath);
  if (cwdRelativeToRoot.startsWith("..") || ports.paths.isAbsolute(cwdRelativeToRoot)) {
    throw new Error("Conversation path is outside its Git repository");
  }
  const branch = continuationBranchName(input.target, input.sessionId);
  const repositoryName = ports.paths.basename(repositoryRoot);
  const worktreeParent = ports.paths.join(
    ports.paths.dirname(repositoryRoot),
    `${repositoryName}.blume-worktrees`
  );
  const worktreeRoot = ports.paths.join(
    worktreeParent,
    continuationWorktreeDirectoryName(repositoryName, input.target, input.sessionId)
  );
  const cwd = cwdRelativeToRoot ? ports.paths.join(worktreeRoot, cwdRelativeToRoot) : worktreeRoot;
  const source = buildHarnessTranscript({
    target: input.target,
    sessionId: input.sessionId,
    cwd,
    branch,
    transcript,
    createdAt: input.createdAt,
    nextId: input.nextId
  });
  const sourceDirectory = ports.paths.join(input.homeDir, ...source.sourceDirectoryParts);
  const sourcePath = ports.paths.join(sourceDirectory, source.sourceFileName);
  const prepared = {
    conversationRef: source.conversationRef,
    cwd,
    branch,
    sourcePath,
    sessionId: input.sessionId,
    target: input.target,
    repositoryRoot,
    worktreeRoot
  };
  try {
    await ports.createWorktree({ repositoryRoot, branch, worktreeParent, worktreeRoot }, input.signal);
    await ports.writeHarnessSource(
      { sourceDirectory, sourcePath, content: source.content },
      input.signal
    );
    return prepared;
  } catch (error) {
    await ports.rollback(prepared).catch(() => void 0);
    throw error;
  }
}
function createConversationContinuationService(ports) {
  return async (ref, target) => {
    const prepared = await ports.prepare(ref, target);
    try {
      await ports.ingest(prepared);
    } catch (error) {
      try {
        await ports.rollback(prepared);
      } catch (rollbackError) {
        throw new AggregateError(
          [error, rollbackError],
          "Conversation continuation ingestion failed and rollback was incomplete"
        );
      }
      throw error;
    }
    await ports.onCommitted();
    const { repositoryRoot: _repositoryRoot, worktreeRoot: _worktreeRoot, ...result } = prepared;
    return result;
  };
}
function transcriptMessages(transcript) {
  const eventsByTurn = /* @__PURE__ */ new Map();
  for (const event of transcript.events) {
    const bucket = eventsByTurn.get(event.user_turn_id) ?? [];
    bucket.push(event);
    eventsByTurn.set(event.user_turn_id, bucket);
  }
  const messages = [];
  for (const turn of transcript.userTurns) {
    const events = (eventsByTurn.get(turn.id) ?? []).sort(
      (a, b) => a.position - b.position || a.id - b.id
    );
    if (!events.some((event) => event.kind === "user_text") && turn.prompt.trim()) {
      messages.push({ role: "user", text: turn.prompt.trim(), timestampMs: turn.started_at });
    }
    for (const event of events) {
      const text = event.text?.trim();
      if (!text) continue;
      if (event.kind === "user_text") {
        messages.push({ role: "user", text, timestampMs: event.timestamp_ms });
      } else if (event.kind === "assistant_text") {
        messages.push({ role: "assistant", text, timestampMs: event.timestamp_ms });
      } else {
        messages.push({
          role: "assistant",
          text: `Tool result:
${text}`,
          timestampMs: event.timestamp_ms
        });
      }
    }
  }
  return messages;
}
function formatConversationTranscript(transcript, kind) {
  const messages = transcriptMessages(transcript).filter(
    (message) => kind === "full-transcript" || message.role === "user"
  );
  return messages.map((message) => `${message.role === "user" ? "User" : "Assistant"}:
${message.text}`).join("\n\n").trim();
}
function encodeClaudeProjectDirectory(cwd) {
  const normalized = cwd.replace(/\\/g, "/");
  return normalized.replace(/[^A-Za-z0-9]/g, "-") || "-";
}
function isoTimestamp(baseMs, offset) {
  return new Date(baseMs + offset).toISOString();
}
function claudeTranscript(input) {
  const messages = transcriptMessages(input.transcript);
  let parentUuid = null;
  let firstUserUuid = null;
  const lines = [];
  const baseMs = input.createdAt.getTime();
  for (const [index, message] of messages.entries()) {
    const uuid = firstUserUuid === null && message.role === "user" ? input.sessionId : input.nextId();
    if (message.role === "user" && firstUserUuid === null) firstUserUuid = uuid;
    const common = {
      parentUuid,
      isSidechain: false,
      userType: "external",
      cwd: input.cwd,
      sessionId: input.sessionId,
      version: "2.1.0",
      gitBranch: input.branch,
      type: message.role,
      uuid,
      timestamp: isoTimestamp(baseMs, index)
    };
    const record = message.role === "user" ? { ...common, message: { role: "user", content: message.text } } : {
      ...common,
      message: {
        id: `msg_${uuid.replace(/-/g, "")}`,
        type: "message",
        role: "assistant",
        model: "blume-conversation-transfer",
        content: [{ type: "text", text: message.text }],
        stop_reason: "end_turn",
        stop_sequence: null,
        usage: { input_tokens: 0, output_tokens: 0 }
      }
    };
    lines.push(JSON.stringify(record));
    parentUuid = uuid;
  }
  if (!firstUserUuid) {
    const uuid = input.sessionId;
    lines.push(
      JSON.stringify({
        parentUuid: null,
        isSidechain: false,
        userType: "external",
        cwd: input.cwd,
        sessionId: input.sessionId,
        version: "2.1.0",
        gitBranch: input.branch,
        type: "user",
        uuid,
        timestamp: input.createdAt.toISOString(),
        message: { role: "user", content: "Continue this transferred conversation." }
      })
    );
    firstUserUuid = uuid;
  }
  const projectDirectoryName = encodeClaudeProjectDirectory(input.cwd);
  return {
    content: `${lines.join("\n")}
`,
    conversationRef: `claude:${firstUserUuid}`,
    projectDirectoryName,
    sessionId: input.sessionId,
    sourceDirectoryParts: [".claude", "projects", projectDirectoryName],
    sourceFileName: `${input.sessionId}.jsonl`
  };
}
function codexTranscript(input) {
  const baseMs = input.createdAt.getTime();
  const messages = transcriptMessages(input.transcript);
  const lines = [
    JSON.stringify({
      timestamp: input.createdAt.toISOString(),
      type: "session_meta",
      payload: {
        id: input.sessionId,
        session_id: input.sessionId,
        timestamp: input.createdAt.toISOString(),
        cwd: input.cwd,
        originator: "codex-tui",
        cli_version: "blume-transfer",
        source: "cli",
        thread_source: "user",
        git: { branch: input.branch }
      }
    })
  ];
  for (const [index, message] of messages.entries()) {
    const timestamp = isoTimestamp(baseMs, index + 1);
    const contentType = message.role === "user" ? "input_text" : "output_text";
    lines.push(
      JSON.stringify({
        timestamp,
        type: "response_item",
        payload: {
          type: "message",
          role: message.role,
          content: [{ type: contentType, text: message.text }]
        }
      })
    );
    lines.push(
      JSON.stringify({
        timestamp,
        type: "event_msg",
        payload: {
          type: message.role === "user" ? "user_message" : "agent_message",
          message: message.text
        }
      })
    );
  }
  const year = String(input.createdAt.getUTCFullYear());
  const month = String(input.createdAt.getUTCMonth() + 1).padStart(2, "0");
  const day = String(input.createdAt.getUTCDate()).padStart(2, "0");
  const fileStamp = input.createdAt.toISOString().replace(/\.\d{3}Z$/, "").replace(/:/g, "-");
  return {
    content: `${lines.join("\n")}
`,
    conversationRef: input.sessionId,
    sessionId: input.sessionId,
    sourceDirectoryParts: [".codex", "sessions", year, month, day],
    sourceFileName: `rollout-${fileStamp}-${input.sessionId}.jsonl`
  };
}
function buildHarnessTranscript(input) {
  return input.target === "claude" ? claudeTranscript(input) : codexTranscript(input);
}
function continuationBranchName(target, sessionId) {
  return `blume/continue-${target}-${sessionId.replace(/[^A-Za-z0-9]/g, "").slice(0, 8)}`;
}
function continuationWorktreeDirectoryName(repositoryName, target, sessionId) {
  const safeRepository = repositoryName.replace(/[^A-Za-z0-9._-]/g, "-") || "project";
  return `${safeRepository}-blume-${target}-${sessionId.replace(/[^A-Za-z0-9]/g, "").slice(0, 8)}`;
}
function shellQuote(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}
function executableCandidateNames(bin, windows) {
  if (!windows) return [bin];
  if (/\.[^\\/.]+$/.test(bin)) return [bin];
  return [`${bin}.exe`, `${bin}.cmd`, `${bin}.bat`];
}
function windowsCrtQuote(token, force = false) {
  if (!force && token.length > 0 && !/[\s"]/.test(token)) return token;
  let quoted = '"';
  let backslashes = 0;
  for (const ch of token) {
    if (ch === "\\") {
      backslashes += 1;
      continue;
    }
    if (ch === '"') {
      quoted += "\\".repeat(backslashes * 2 + 1) + '"';
      backslashes = 0;
      continue;
    }
    quoted += "\\".repeat(backslashes) + ch;
    backslashes = 0;
  }
  return quoted + "\\".repeat(backslashes * 2) + '"';
}
const CMD_UNSAFE_TOKEN = /[&|<>^%\r\n\0]/;
function win32SpawnPlan(file, args, comSpec) {
  if (!/\.(cmd|bat)$/i.test(file)) {
    return { file, args: [...args], windowsVerbatimArguments: false };
  }
  for (const token of [file, ...args]) {
    if (CMD_UNSAFE_TOKEN.test(token)) {
      throw new Error(`unsupported cmd.exe metacharacter in argument: ${token}`);
    }
  }
  const commandLine = [
    windowsCrtQuote(file, true),
    ...args.map((token) => windowsCrtQuote(token))
  ].join(" ");
  return {
    file: comSpec || "cmd.exe",
    args: ["/d", "/v:off", "/s", "/c", `"${commandLine}"`],
    windowsVerbatimArguments: true
  };
}
exports.createConversationContinuationService = createConversationContinuationService;
exports.executableCandidateNames = executableCandidateNames;
exports.formatConversationTranscript = formatConversationTranscript;
exports.loadCompleteConversationTranscript = loadCompleteConversationTranscript;
exports.prepareConversationContinuation = prepareConversationContinuation;
exports.shellQuote = shellQuote;
exports.win32SpawnPlan = win32SpawnPlan;
//# sourceMappingURL=harnessCli-Bmy0uVpC.js.map

//# debugId=d11870b5-9750-5550-bbf4-8c066a9fd1f9
