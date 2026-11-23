"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="0dbcff0c-8bdb-5432-8d60-f2f6dbbbb7ae")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fs = require("node:fs");
const searchIndexing = require("./searchIndexing-C4lh6bB5.js");
const node_child_process = require("node:child_process");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("better-sqlite3");
require("fs");
require("path");
require("./index-DvaJIvS-.js");
require("./insights-CJUxz2Be.js");
require("./deliveryBriefs-CbTihYeZ.js");
require("./index-UFoqNX7c.js");
require("./hash-DCMQIns_.js");
require("./identity-C50QOXIb.js");
require("./desktopSearch-UUzZxN96.js");
require("./repositoryKey-CSvrvo7G.js");
const GIT_COMMIT_LOG_FORMAT = "%H%x00%an%x00%at%x00%S%x00%s%x00%b%x1e";
const GIT_COMMIT_BODY_MAX_CHARS = 4096;
const SUBJECT_MAX_CHARS = 1024;
const SHA_PATTERN = /^[0-9a-f]{40}$/;
function parseGitCommitLog(output) {
  const commits = [];
  const seen = /* @__PURE__ */ new Set();
  for (const chunk of output.split("")) {
    const record = chunk.replace(/^\n+/, "");
    if (!record) continue;
    const fields = record.split("\0");
    if (fields.length < 6) continue;
    const [sha = "", author = "", at = "", source = "", subject = ""] = fields;
    const body = fields.slice(5).join(" ");
    if (!SHA_PATTERN.test(sha) || seen.has(sha)) continue;
    const seconds = Number(at);
    if (!Number.isFinite(seconds)) continue;
    seen.add(sha);
    commits.push({
      sha,
      author: author.trim(),
      committedAtMs: Math.trunc(seconds) * 1e3,
      branch: source.trim() && !SHA_PATTERN.test(source.trim()) ? source.trim() : null,
      subject: subject.trim().slice(0, SUBJECT_MAX_CHARS),
      body: body.trim().slice(0, GIT_COMMIT_BODY_MAX_CHARS)
    });
  }
  return commits;
}
function parseGitRefTips(output) {
  const tips = [];
  for (const line of output.split("\n")) {
    const match = /^([0-9a-f]{40}) (\S+)$/.exec(line.trim());
    if (match) tips.push({ sha: match[1], ref: match[2] });
  }
  return tips;
}
function gitLogRevisionInput(tips, indexedTips) {
  const lines = [
    ...new Set(tips.map((tip) => tip.ref)),
    ...[...new Set(indexedTips)].filter((sha) => SHA_PATTERN.test(sha)).map((sha) => `^${sha}`)
  ];
  return `${lines.join("\n")}
`;
}
const GIT_COMMIT_LOG_TIMEOUT_MS = 6e4;
const GIT_COMMIT_LOG_MAX_BYTES = 32 * 1024 * 1024;
const GIT_COMMIT_LOG_MAX_COMMITS = 5e4;
const GIT_COMMIT_LOG_MIN_COMMITS = 500;
class GitCommandError extends Error {
  constructor(message, reason) {
    super(message);
    this.name = "GitCommandError";
    this.reason = reason;
  }
}
function runGit(cwd, args, stdin, options) {
  const timeoutMs = options.timeoutMs ?? GIT_COMMIT_LOG_TIMEOUT_MS;
  const maxBytes = options.maxBytes ?? GIT_COMMIT_LOG_MAX_BYTES;
  return new Promise((resolve, reject) => {
    if (options.signal?.aborted) {
      reject(new GitCommandError("git command aborted", "aborted"));
      return;
    }
    const child = node_child_process.spawn(options.gitPath ?? "git", ["-C", cwd, ...args], {
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GIT_OPTIONAL_LOCKS: "0", LC_ALL: "C" },
      windowsHide: true
    });
    const chunks = [];
    let bytes = 0;
    let stderr = "";
    let settled = false;
    const finish = (error, output) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
      if (error) {
        child.kill("SIGKILL");
        reject(error);
      } else resolve(output ?? "");
    };
    const onAbort = () => finish(new GitCommandError("git command aborted", "aborted"));
    options.signal?.addEventListener("abort", onAbort, { once: true });
    const timer = setTimeout(
      () => finish(new GitCommandError(`git ${args[0]} timed out`, "timeout")),
      timeoutMs
    );
    timer.unref?.();
    child.stdout.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        finish(
          new GitCommandError(`git ${args[0]} output exceeded ${maxBytes} bytes`, "output-limit")
        );
        return;
      }
      chunks.push(chunk);
    });
    child.stderr.on("data", (chunk) => {
      if (stderr.length < 4096) stderr += chunk.toString("utf8");
    });
    child.on(
      "error",
      (error) => finish(new GitCommandError(error.message || "git failed to start", "spawn"))
    );
    child.on("close", (code) => {
      if (code === 0) finish(null, Buffer.concat(chunks).toString("utf8"));
      else
        finish(
          new GitCommandError(
            `git ${args[0]} exited with ${code}: ${stderr.trim().slice(0, 500)}`,
            "exit"
          )
        );
    });
    child.stdin.on("error", () => void 0);
    child.stdin.end(stdin ?? "");
  });
}
async function readGitRefTips(root, options = {}) {
  const output = await runGit(
    root,
    ["for-each-ref", "--format=%(objectname) %(refname)", "refs/heads", "refs/remotes"],
    null,
    { ...options, maxBytes: Math.min(options.maxBytes ?? 4 * 1024 * 1024, 4 * 1024 * 1024) }
  );
  const tips = parseGitRefTips(output).filter((tip) => !tip.ref.endsWith("/HEAD"));
  try {
    const head = (await runGit(root, ["rev-parse", "--verify", "-q", "HEAD"], null, options)).trim();
    if (/^[0-9a-f]{40}$/.test(head) && !tips.some((tip) => tip.sha === head)) {
      tips.push({ ref: "HEAD", sha: head });
    }
  } catch {
  }
  return tips;
}
async function readGitCommits(root, tips, indexedTips, options = {}) {
  if (tips.length === 0) return [];
  const known = await existingObjects(root, indexedTips, options);
  const input = gitLogRevisionInput(tips, known);
  const floor = Math.max(1, options.minCommits ?? GIT_COMMIT_LOG_MIN_COMMITS);
  let count = options.maxCommits ?? GIT_COMMIT_LOG_MAX_COMMITS;
  for (; ; ) {
    try {
      const output = await runGit(
        root,
        [
          "log",
          "--no-show-signature",
          "--stdin",
          "--ignore-missing",
          "--source",
          "--no-color",
          `--max-count=${count}`,
          `--format=${GIT_COMMIT_LOG_FORMAT}`
        ],
        input,
        options
      );
      return parseGitCommitLog(output);
    } catch (error) {
      const overflow = error instanceof GitCommandError && error.reason === "output-limit";
      if (!overflow || count <= floor) throw error;
      count = Math.max(floor, Math.floor(count / 4));
    }
  }
}
async function existingObjects(root, shas, options) {
  const unique = [...new Set(shas)].filter((sha) => /^[0-9a-f]{40}$/.test(sha));
  if (unique.length === 0) return [];
  const output = await runGit(
    root,
    ["cat-file", "--batch-check=%(objectname) %(objecttype)"],
    `${unique.join("\n")}
`,
    options
  );
  const present = /* @__PURE__ */ new Set();
  for (const line of output.split("\n")) {
    const [sha, type] = line.trim().split(" ");
    if (sha && type === "commit") present.add(sha);
  }
  return unique.filter((sha) => present.has(sha));
}
const parentPort = process.parentPort;
function post(message) {
  parentPort?.postMessage(message);
}
const MAC_GIT_CANDIDATES = [
  "/Library/Developer/CommandLineTools/usr/bin/git",
  "/Applications/Xcode.app/Contents/Developer/usr/bin/git",
  "/opt/homebrew/bin/git",
  "/usr/local/bin/git"
];
function resolveIndexGit(platform = process.platform) {
  if (platform !== "darwin") return "git";
  return MAC_GIT_CANDIDATES.find((candidate) => fs.existsSync(candidate)) ?? null;
}
function gitPort(gitPath) {
  return {
    readTips: (root, signal) => readGitRefTips(root, { gitPath, ...signal ? { signal } : {} }),
    readCommits: (root, tips, indexed, signal) => readGitCommits(root, tips, indexed, { gitPath, ...signal ? { signal } : {} })
  };
}
const stopping = new AbortController();
process.on("SIGTERM", () => {
  stopping.abort();
  setImmediate(() => process.exit(0));
});
async function run(request) {
  const startedAtMs = Date.now();
  let handle = null;
  try {
    handle = sqliteStorage.openDesktopSearchIndex(request.dbPath);
    const gitPath = request.commits ? resolveIndexGit() : null;
    const progress = await searchIndexing.runSearchIndexPass(handle.index, gitPath ? gitPort(gitPath) : null, {
      signal: stopping.signal,
      onProgress: (current) => post({ type: "progress", id: request.id, progress: current })
    });
    post({
      type: "done",
      id: request.id,
      ok: true,
      progress,
      durationMs: Date.now() - startedAtMs
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    post({
      type: "done",
      id: request.id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name
    });
  } finally {
    handle?.close();
    setImmediate(() => process.exit(0));
  }
}
parentPort?.on("message", (event) => {
  const request = event.data;
  if (request?.type === "stop") stopping.abort();
  else if (request?.type === "run") void run(request);
});
exports.resolveIndexGit = resolveIndexGit;
//# sourceMappingURL=searchIndexWorker.js.map

//# debugId=0dbcff0c-8bdb-5432-8d60-f2f6dbbbb7ae
