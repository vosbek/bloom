"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5c92816e-ba49-5781-bbf5-ae1bc6e7f639")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require$$0 = require("node:fs/promises");
require("node:path");
const jsonlFiles = require("./jsonlFiles-B8t4SSDo.js");
require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
require("./useCases-CApkWXtQ.js");
require("node:fs");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("./index-UFoqNX7c.js");
require("./desktopSearch-UUzZxN96.js");
require("./hash-DCMQIns_.js");
require("better-sqlite3");
require("fs");
require("path");
require("./index-DvaJIvS-.js");
require("./insights-CJUxz2Be.js");
require("./identity-C50QOXIb.js");
require("./repositoryKey-CSvrvo7G.js");
const MAX_TRANSCRIPT_REPLY_BYTES = 16 * 1024 * 1024;
const parentPort = process.parentPort;
const CONVERSATION_LIST_BRANCH_LABEL_TTL_MS = 5e3;
const CONVERSATION_LIST_MAX_BRANCH_LABELS = 512;
let readHandle = null;
let readHandlePath = null;
const branchLabels = /* @__PURE__ */ new Map();
function cachedBranchLabel(cwd, nowMs = Date.now(), read = jsonlFiles.gitBranchLabel) {
  const cached = branchLabels.get(cwd);
  if (cached && cached.expiresAtMs > nowMs) return cached.label;
  const label = read(cwd);
  if (!cached && branchLabels.size >= CONVERSATION_LIST_MAX_BRANCH_LABELS) branchLabels.clear();
  branchLabels.set(cwd, { label, expiresAtMs: nowMs + CONVERSATION_LIST_BRANCH_LABEL_TTL_MS });
  return label;
}
function post(message) {
  parentPort?.postMessage(message);
}
function getReadHandle(dbPath) {
  if (readHandle && readHandlePath === dbPath) return readHandle;
  readHandle?.close();
  readHandle = null;
  readHandle = sqliteStorage.openDesktopSqliteConversationReads(dbPath);
  readHandlePath = dbPath;
  return readHandle;
}
async function listForView(request) {
  const startedAtMs = Date.now();
  try {
    const { conversations } = getReadHandle(request.dbPath);
    const items = await jsonlFiles.loadConversationListItemsForView(
      conversations,
      request.options,
      (cwd) => cachedBranchLabel(cwd)
    );
    post({
      type: "list-for-view-result",
      id: request.id,
      ok: true,
      items,
      queryMs: Date.now() - startedAtMs
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    post({
      type: "list-for-view-result",
      id: request.id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack
    });
  }
}
async function transcript(request) {
  const startedAtMs = Date.now();
  try {
    const { conversations, sourceCursors } = getReadHandle(request.dbPath);
    const service = jsonlFiles.createConversationReadService({
      storage: conversations,
      liveTail: {
        stat: async (path) => {
          const file = await require$$0.stat(path).catch(() => null);
          return file ? { size: file.size, mtimeMs: file.mtimeMs, isFile: file.isFile() } : null;
        },
        readLinesFromOffset: jsonlFiles.readJsonlLinesFromOffset,
        getSourceBytesParsed: async (ref) => (await sourceCursors.getSourceCursor("codex", ref))?.sourceBytesParsed
      }
    });
    const result = await service.getTranscript(request.ref, request.options);
    if (Buffer.byteLength(JSON.stringify(result), "utf8") > MAX_TRANSCRIPT_REPLY_BYTES)
      throw new Error("Conversation page exceeds the background read limit");
    post({
      type: "transcript-result",
      id: request.id,
      ok: true,
      transcript: result,
      queryMs: Date.now() - startedAtMs
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    post({
      type: "transcript-result",
      id: request.id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name
    });
  }
}
parentPort?.on("message", (event) => {
  const message = event.data;
  if (message?.type === "list-for-view") void listForView(message);
  if (message?.type === "transcript") void transcript(message);
});
exports.CONVERSATION_LIST_BRANCH_LABEL_TTL_MS = CONVERSATION_LIST_BRANCH_LABEL_TTL_MS;
exports.CONVERSATION_LIST_MAX_BRANCH_LABELS = CONVERSATION_LIST_MAX_BRANCH_LABELS;
exports.cachedBranchLabel = cachedBranchLabel;
//# sourceMappingURL=listWorker.js.map

//# debugId=5c92816e-ba49-5781-bbf5-ae1bc6e7f639
