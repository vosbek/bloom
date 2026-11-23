"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ee0e9685-5362-50c1-be94-92ce41f92e6d")}catch(e){}}();

const node_child_process = require("node:child_process");
const require$$0 = require("node:crypto");
const require$$0$1 = require("node:fs/promises");
const _n = require("node:path");
require("neverthrow");
const harnessCli = require("./harnessCli-Bmy0uVpC.js");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
require("./useCases-CApkWXtQ.js");
require("./desktopSearch-UUzZxN96.js");
const index = require("./index-DvaJIvS-.js");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("./hash-DCMQIns_.js");
require("./insights-CJUxz2Be.js");
require("./index-UFoqNX7c.js");
require("./identity-C50QOXIb.js");
require("./repositoryKey-CSvrvo7G.js");
require("better-sqlite3");
require("fs");
require("path");
const parentPort = process.parentPort;
const HEARTBEAT_MS = 1e4;
const PROCESS_TIMEOUT_MS = 9e4;
const PROCESS_TERMINATION_GRACE_MS = 5e3;
function post(message) {
  parentPort?.postMessage(message);
}
function serializeError(id, error) {
  if (error instanceof Error) {
    return {
      type: "conversation-action-result",
      id,
      ok: false,
      errorMessage: error.message,
      errorName: error.name,
      errorStack: error.stack
    };
  }
  return {
    type: "conversation-action-result",
    id,
    ok: false,
    errorMessage: String(error)
  };
}
function runProcess(command, args, options = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = node_child_process.spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      stdio: [options.input === void 0 ? "ignore" : "pipe", "pipe", "pipe"],
      windowsVerbatimArguments: options.windowsVerbatimArguments
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    let timedOut = false;
    let aborted = false;
    let terminating = false;
    let terminationTimer = null;
    const finish = (callback) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      if (terminationTimer) clearTimeout(terminationTimer);
      options.signal?.removeEventListener("abort", abort);
      callback();
    };
    const terminate = () => {
      if (terminating) return;
      terminating = true;
      child.kill("SIGTERM");
      terminationTimer = setTimeout(() => child.kill("SIGKILL"), PROCESS_TERMINATION_GRACE_MS);
      terminationTimer.unref();
    };
    const abort = () => {
      aborted = true;
      terminate();
    };
    child.stdout?.setEncoding("utf8");
    child.stderr?.setEncoding("utf8");
    child.stdout?.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk;
    });
    const timeout = setTimeout(() => {
      timedOut = true;
      terminate();
    }, options.timeoutMs ?? PROCESS_TIMEOUT_MS);
    timeout.unref();
    if (options.signal?.aborted) abort();
    else options.signal?.addEventListener("abort", abort, { once: true });
    child.once("error", (error) => {
      finish(() => reject(error));
    });
    child.once("exit", (code, signal) => {
      if (timedOut) finish(() => reject(new Error(`${command} timed out`)));
      else if (aborted) {
        finish(() => reject(options.signal?.reason ?? new DOMException("Aborted", "AbortError")));
      } else if (code === 0) finish(() => resolvePromise({ stdout, stderr }));
      else
        finish(
          () => reject(
            new Error(
              `${command} failed${code === null ? ` (${signal ?? "unknown signal"})` : ` (${code})`}${stderr.trim() ? `: ${stderr.trim()}` : ""}`
            )
          )
        );
    });
    if (options.input !== void 0) child.stdin?.end(options.input);
  });
}
async function writeClipboard(text) {
  if (process.platform === "darwin") {
    await runProcess("pbcopy", [], { input: text, timeoutMs: 15e3 });
    return;
  }
  if (process.platform === "win32") {
    await runProcess("clip.exe", [], { input: text, timeoutMs: 15e3 });
    return;
  }
  const candidates = [
    ["wl-copy", []],
    ["xclip", ["-selection", "clipboard"]],
    ["xsel", ["--clipboard", "--input"]]
  ];
  let lastError;
  for (const [command, args] of candidates) {
    try {
      await runProcess(command, args, { input: text, timeoutMs: 15e3 });
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("No clipboard command is available");
}
async function openInVsCode(path) {
  if (process.platform === "win32") {
    const plan = harnessCli.win32SpawnPlan("code.cmd", [path], process.env.ComSpec);
    await runProcess(plan.file, plan.args, {
      timeoutMs: 15e3,
      windowsVerbatimArguments: plan.windowsVerbatimArguments
    });
    return;
  }
  await runProcess("code", [path], { timeoutMs: 15e3 });
}
async function openLocation(path, target) {
  if (process.platform === "darwin") {
    if (target === "finder") {
      await runProcess("open", [path], { timeoutMs: 15e3 });
      return;
    }
    const bundleId = target === "vscode" ? "com.microsoft.VSCode" : "dev.zed.Zed";
    await runProcess("open", ["-b", bundleId, path], { timeoutMs: 15e3 });
    return;
  }
  if (target === "vscode") {
    await openInVsCode(path);
    return;
  }
  if (target === "zed") {
    await runProcess("zed", [path], { timeoutMs: 15e3 });
    return;
  }
  if (process.platform === "win32") await runProcess("explorer.exe", [path], { timeoutMs: 15e3 });
  else await runProcess("xdg-open", [path], { timeoutMs: 15e3 });
}
async function openFile(path, target) {
  if (process.platform === "darwin") {
    if (target === "finder") {
      await runProcess("open", ["-R", path], { timeoutMs: 15e3 });
      return;
    }
    const bundleId = target === "vscode" ? "com.microsoft.VSCode" : "dev.zed.Zed";
    await runProcess("open", ["-b", bundleId, path], { timeoutMs: 15e3 });
    return;
  }
  if (target === "vscode") {
    await openInVsCode(path);
    return;
  }
  if (target === "zed") {
    await runProcess("zed", [path], { timeoutMs: 15e3 });
    return;
  }
  if (process.platform === "win32")
    await runProcess("explorer.exe", [`/select,${path}`], { timeoutMs: 15e3 });
  else await runProcess("xdg-open", [_n.dirname(path)], { timeoutMs: 15e3 });
}
async function nearestExistingFolder(path) {
  let candidate = _n.resolve(path);
  while (true) {
    try {
      if ((await require$$0$1.stat(candidate)).isDirectory()) return candidate;
    } catch (error) {
      const code = error.code;
      if (code !== "ENOENT" && code !== "ENOTDIR") throw error;
    }
    const parent = _n.dirname(candidate);
    if (parent === candidate) throw new Error(`No existing folder contains ${path}`);
    candidate = parent;
  }
}
async function rollbackContinuation(continuation) {
  await require$$0$1.unlink(continuation.sourcePath).catch((error) => {
    if (error.code !== "ENOENT") {
      console.error("Failed to remove conversation source during rollback", {
        sourcePath: continuation.sourcePath,
        error
      });
    }
  });
  await runProcess("git", [
    "-C",
    continuation.repositoryRoot,
    "worktree",
    "remove",
    "--force",
    continuation.worktreeRoot
  ]).catch((error) => {
    console.error("Failed to remove conversation worktree during rollback", {
      worktreeRoot: continuation.worktreeRoot,
      error
    });
  });
  await runProcess("git", [
    "-C",
    continuation.repositoryRoot,
    "branch",
    "-D",
    continuation.branch
  ]).catch((error) => {
    console.error("Failed to delete conversation branch during rollback", {
      repositoryRoot: continuation.repositoryRoot,
      branch: continuation.branch,
      error
    });
  });
}
async function handleRequest(input) {
  if (input.action === "rollback-continuation") {
    await rollbackContinuation(input.continuation);
    return { ok: true };
  }
  if (input.action === "open-file") {
    if (!_n.isAbsolute(input.path)) throw new Error("File path must be absolute");
    await openFile(_n.resolve(input.path), input.target);
    return { ok: true };
  }
  if (input.action === "open-folder") {
    if (!_n.isAbsolute(input.path)) throw new Error("Folder path must be absolute");
    await openLocation(await nearestExistingFolder(input.path), "finder");
    return { ok: true };
  }
  if (input.action === "legacy-exclusions-read" || input.action === "legacy-exclusions-remove") {
    const db = sqliteStorage.openDesktopSqliteDatabase(input.dbPath);
    try {
      if (input.action === "legacy-exclusions-read")
        return { legacyExclusions: index.readLegacyProjectExclusions(db) };
      return { remaining: index.removeLegacyProjectExclusions(db, input.ids) };
    } finally {
      db.close();
    }
  }
  const handle = sqliteStorage.openDesktopSqliteStorage(input.dbPath);
  try {
    const row = await handle.storage.desktopConversations.getConversationByRef(input.ref);
    if (!row) throw new Error(`Unknown conversation: ${input.ref}`);
    const project = row.project_id === null ? void 0 : handle.db.prepare("SELECT path FROM projects WHERE id = ?").get(row.project_id);
    const location = {
      cwd: row.cwd,
      projectPath: typeof project?.path === "string" ? project.path : null
    };
    const path = location.cwd && _n.isAbsolute(location.cwd) ? _n.resolve(location.cwd) : location.projectPath && _n.isAbsolute(location.projectPath) ? _n.resolve(location.projectPath) : null;
    if (!path) throw new Error("This conversation does not have a local project path");
    if (input.action === "open") {
      await openLocation(path, input.target);
      return { ok: true };
    }
    if (input.action === "copy" && input.kind === "path") {
      await writeClipboard(path);
      return { ok: true };
    }
    if (input.action === "copy") {
      if (input.kind === "path") throw new Error("Path copy completed without transcript loading");
      const transcript = await harnessCli.loadCompleteConversationTranscript(
        (options) => handle.storage.desktopConversations.getConversationTranscriptByRef(input.ref, options),
        () => post({ type: "heartbeat", id: input.id })
      );
      if (!transcript) throw new Error(`Conversation transcript is unavailable: ${input.ref}`);
      await writeClipboard(harnessCli.formatConversationTranscript(transcript, input.kind));
      return { ok: true };
    }
    return await harnessCli.prepareConversationContinuation(
      {
        ref: input.ref,
        target: input.target,
        homeDir: input.homeDir,
        sessionId: require$$0.randomUUID(),
        createdAt: /* @__PURE__ */ new Date(),
        nextId: require$$0.randomUUID,
        onProgress: () => post({ type: "heartbeat", id: input.id })
      },
      {
        paths: { basename: _n.basename, dirname: _n.dirname, isAbsolute: _n.isAbsolute, join: _n.join, relative: _n.relative, resolve: _n.resolve },
        loadLocation: async () => location,
        loadTranscriptPage: async (_ref, options) => {
          options.signal?.throwIfAborted();
          return handle.storage.desktopConversations.getConversationTranscriptByRef(input.ref, {
            ...options.beforeTurnPosition === void 0 ? {} : { beforeTurnPosition: options.beforeTurnPosition },
            limit: options.limit
          });
        },
        resolveRepositoryRoot: async (projectPath, signal) => (await runProcess("git", ["-C", projectPath, "rev-parse", "--show-toplevel"], {
          signal
        })).stdout.trim(),
        createWorktree: async (plan, signal) => {
          signal?.throwIfAborted();
          await require$$0$1.mkdir(plan.worktreeParent, { recursive: true });
          await runProcess(
            "git",
            [
              "-C",
              plan.repositoryRoot,
              "worktree",
              "add",
              "-b",
              plan.branch,
              plan.worktreeRoot,
              "HEAD"
            ],
            { signal }
          );
        },
        writeHarnessSource: async (source, signal) => {
          signal?.throwIfAborted();
          await require$$0$1.mkdir(source.sourceDirectory, { recursive: true });
          await require$$0$1.writeFile(source.sourcePath, source.content, { encoding: "utf8", flag: "wx" });
          signal?.throwIfAborted();
        },
        rollback: rollbackContinuation
      }
    );
  } finally {
    handle.close();
  }
}
parentPort?.on("message", (event) => {
  const input = event.data;
  if (input?.type !== "conversation-action") return;
  const heartbeat = setInterval(() => post({ type: "heartbeat", id: input.id }), HEARTBEAT_MS);
  heartbeat.unref();
  void handleRequest(input).then(
    (result) => post({ type: "conversation-action-result", id: input.id, ok: true, result }),
    (error) => post(serializeError(input.id, error))
  ).finally(() => clearInterval(heartbeat));
});
//# sourceMappingURL=actionWorker.js.map

//# debugId=ee0e9685-5362-50c1-be94-92ce41f92e6d
