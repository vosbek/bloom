"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="290f54da-9f5b-5cab-85bb-7d9c13c288bb")}catch(e){}}();

const Nl = require("node:os");
const node_child_process = require("node:child_process");
const fs = require("node:fs");
const require$$0 = require("node:fs/promises");
const node_module = require("node:module");
const _n = require("node:path");
const probe_node = require("./probe.node-DZT3fHhO.js");
class AsyncQueue {
  constructor() {
    this.buffer = [];
    this.waiters = [];
    this.closed = false;
  }
  push(item) {
    if (this.closed) return;
    const waiter = this.waiters.shift();
    if (waiter) waiter({ value: item, done: false });
    else this.buffer.push(item);
  }
  close() {
    this.closed = true;
    let waiter = this.waiters.shift();
    while (waiter) {
      waiter({ value: void 0, done: true });
      waiter = this.waiters.shift();
    }
  }
  [Symbol.asyncIterator]() {
    return {
      next: () => {
        if (this.buffer.length > 0) {
          const [value] = this.buffer.splice(0, 1);
          return Promise.resolve({ value, done: false });
        }
        if (this.closed) return Promise.resolve({ value: void 0, done: true });
        return new Promise((resolve) => this.waiters.push(resolve));
      },
      return: () => {
        this.close();
        return Promise.resolve({ value: void 0, done: true });
      }
    };
  }
}
const DEFAULT_WATCH_IGNORES = [
  "node_modules",
  ".git/objects",
  ".git/lfs",
  "dist",
  "out",
  "build",
  "target",
  ".cache",
  ".turbo",
  ".next",
  ".venv",
  "__pycache__",
  ".DS_Store",
  "tmp"
];
async function stopTerminalProcess(terminal, timeoutMs = 5e3) {
  let timer;
  try {
    terminal.kill();
    await Promise.race([
      terminal.exited,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("Terminal exit was not confirmed.")), timeoutMs);
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}
const decoder = new TextDecoder();
const requireModule = node_module.createRequire(require("url").pathToFileURL(__filename).href);
let nodePtyModule;
function defaultHomeRoot() {
  return process.env.HOME || Nl.homedir();
}
function sessionDirName(sessionId) {
  return sessionId.replace(/[^a-zA-Z0-9._-]/g, "_") || "session";
}
function isIgnoredRelativePath(parts, ignore) {
  const relativePath = parts.join("/");
  return ignore.some((entry) => {
    if (entry.includes("/")) {
      return relativePath === entry || relativePath.startsWith(`${entry}/`) || relativePath.includes(`/${entry}/`);
    }
    return parts.includes(entry);
  });
}
async function writeLocalFile(path, content) {
  await require$$0.mkdir(_n.dirname(path), { recursive: true });
  await require$$0.writeFile(path, content);
}
async function listLocalFiles(roots, ignore) {
  const out = [];
  const walk = async (dir, relativeParts) => {
    const entries = await require$$0.readdir(dir, { withFileTypes: true }).catch(() => null);
    if (!entries) return;
    for (const entry of entries) {
      const entryParts = [...relativeParts, entry.name];
      if (isIgnoredRelativePath(entryParts, ignore)) continue;
      const full = _n.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full, entryParts);
      } else if (entry.isFile()) {
        const stats = await require$$0.stat(full).catch(() => null);
        if (stats) out.push({ path: full, mtimeMs: stats.mtimeMs, size: stats.size });
      }
    }
  };
  for (const root of roots) await walk(root, []);
  return out.sort((a, b) => a.path.localeCompare(b.path));
}
function spawnForExec(handle, command) {
  return new Promise((resolve2) => {
    const startedAt = Date.now();
    const child = node_child_process.spawn(command.command, command.args ?? [], {
      cwd: command.cwd ?? handle.project,
      env: { ...process.env, HOME: handle.home, ...command.env }
    });
    const stdout = [];
    const stderr = [];
    let timedOut = false;
    let settled = false;
    const timer = command.timeoutMs ? setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, command.timeoutMs) : null;
    const finish = (exitCode) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      resolve2({
        exitCode,
        stdout: Buffer.concat(stdout).toString("utf8"),
        stderr: Buffer.concat(stderr).toString("utf8"),
        timedOut,
        durationMs: Date.now() - startedAt
      });
    };
    child.stdout.on("data", (chunk) => stdout.push(Buffer.from(chunk)));
    child.stderr.on("data", (chunk) => stderr.push(Buffer.from(chunk)));
    child.on("error", (error) => {
      stderr.push(Buffer.from(String(error)));
      finish(-1);
    });
    child.on("close", (code) => finish(code ?? -1));
  });
}
function loadNodePty() {
  if (nodePtyModule !== void 0) return nodePtyModule;
  try {
    nodePtyModule = requireModule("@homebridge/node-pty-prebuilt-multiarch");
  } catch {
    nodePtyModule = null;
  }
  return nodePtyModule;
}
function resolveTerminalBackend(config, scriptPath) {
  if (config.useScriptPty === true) return "script";
  if (config.useScriptPty === false) return "plain";
  if (loadNodePty()) return "node-pty";
  return process.platform === "linux" && fs.existsSync(scriptPath) ? "script" : "plain";
}
const INHERITED_ENV_BLOCKLIST = /^(?:npm_config_|npm_package_|npm_lifecycle_|npm_command$|npm_execpath$|npm_node_execpath$|pnpm_config_|PNPM_SCRIPT_SRC_DIR$|INIT_CWD$|NODE_OPTIONS$|ELECTRON_RENDERER_URL$)/;
const PTY_CONFUSING_ENV = [
  "TMUX",
  "TMUX_PANE",
  "STY",
  "WINDOW",
  "WINDOWID",
  "TERMCAP",
  "COLUMNS",
  "LINES"
];
function terminalEnv(home) {
  const inherited = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (INHERITED_ENV_BLOCKLIST.test(key) || PTY_CONFUSING_ENV.includes(key)) continue;
    inherited[key] = value;
  }
  return {
    ...inherited,
    HOME: home,
    ...process.platform === "win32" ? { USERPROFILE: home } : {},
    TERM: process.env.TERM || "xterm-256color"
  };
}
const COMMAND_EXIT_SENTINEL_TERMINATOR = "\x07";
function commandExitSentinelPrefix(nonce) {
  return `\x1B]1337;blume-command-exit;${nonce};`;
}
function commandExitSentinelPattern(nonce) {
  return new RegExp(`\x1B\\]1337;blume-command-exit;${nonce};(-?\\d+)\x07`, "g");
}
function commandExitSentinelScript(nonce) {
  const emit = `blume_report_exit() { [ -n "$__blume_reported" ] && return 0; __blume_reported=1; printf '${commandExitSentinelPrefix(nonce)}%s${COMMAND_EXIT_SENTINEL_TERMINATOR}' "$1"; }`;
  return `${emit}
trap 'blume_report_exit $?' EXIT INT TERM HUP`;
}
function createSentinelFilter(nonce) {
  let pending = "";
  const prefix = commandExitSentinelPrefix(nonce);
  const pattern = commandExitSentinelPattern(nonce);
  return (chunk) => {
    const buffer = pending + chunk;
    const exits = [];
    pattern.lastIndex = 0;
    const text = buffer.replace(pattern, (_match, code) => {
      exits.push(Number.parseInt(code, 10));
      return "";
    });
    let hold = 0;
    for (let size = Math.min(prefix.length + 24, text.length); size > 0; size--) {
      const tail = text.slice(text.length - size);
      if (prefix.startsWith(tail) || tail.startsWith(prefix) && !tail.includes(COMMAND_EXIT_SENTINEL_TERMINATOR)) {
        hold = size;
        break;
      }
    }
    pending = hold > 0 ? text.slice(text.length - hold) : "";
    return { text: hold > 0 ? text.slice(0, text.length - hold) : text, exits };
  };
}
function startTerminal(launch) {
  const windows = process.platform === "win32";
  const sizePrefix = !windows && launch.size ? `stty cols ${launch.size.cols} rows ${launch.size.rows} 2>/dev/null; ` : "";
  const interactive = launch.backend === "node-pty" || launch.backend === "script";
  const body = launch.keepAlive && interactive ? `${commandExitSentinelScript(launch.sentinelNonce)}
${launch.command}
blume_report_exit $?
exec ${launch.shell} -il` : interactive ? `exec ${launch.command}` : launch.command;
  const shellCommand = windows ? launch.command : `${sizePrefix}${body}`;
  const shellArgs = windows ? ["/d", "/s", "/c", shellCommand] : [interactive ? "-ilc" : "-lc", shellCommand];
  if (launch.backend === "node-pty") {
    const nodePty = loadNodePty();
    if (nodePty) {
      return nodePtyLocalPty(
        nodePty.spawn(launch.shell, shellArgs, {
          cwd: launch.cwd,
          env: terminalEnv(launch.home),
          name: "xterm-256color",
          cols: launch.size?.cols ?? 80,
          rows: launch.size?.rows ?? 24
        })
      );
    }
  }
  const child = launch.backend === "script" ? node_child_process.spawn(launch.scriptPath, ["-qfec", shellCommand, "/dev/null"], {
    cwd: launch.cwd,
    env: terminalEnv(launch.home)
  }) : node_child_process.spawn(launch.shell, shellArgs, {
    cwd: launch.cwd,
    env: terminalEnv(launch.home),
    detached: !windows
  });
  return childPty(child, launch.backend === "plain" && !windows);
}
function nodePtyLocalPty(pty) {
  const exited = new Promise((resolve2) => {
    pty.onExit(() => resolve2());
  });
  return {
    exited,
    write: (data) => {
      pty.write(data);
    },
    onData: (callback) => {
      const disposable = pty.onData(callback);
      return () => disposable.dispose();
    },
    onExit: (callback) => {
      const disposable = pty.onExit((event) => callback(event.exitCode ?? null));
      return () => disposable.dispose();
    },
    resize: (cols, rows) => {
      try {
        pty.resize(cols, rows);
      } catch {
      }
    },
    kill: () => {
      try {
        if (process.platform !== "win32" && pty.destroy) pty.destroy();
        else pty.kill();
      } catch {
      }
    }
  };
}
function childPty(child, ownsProcessGroup = false) {
  const exited = new Promise((resolve2) => child.once("close", () => resolve2()));
  const subscribers = /* @__PURE__ */ new Set();
  const exitSubscribers = /* @__PURE__ */ new Set();
  let backlog = [];
  let exitCode;
  const emit = (data) => {
    if (backlog) backlog.push(data);
    for (const subscriber of subscribers) subscriber(data);
  };
  child.stdout.on("data", (chunk) => emit(chunk.toString("utf8")));
  child.stderr.on("data", (chunk) => emit(chunk.toString("utf8")));
  child.on("error", (error) => emit(String(error)));
  child.on("close", (code) => {
    exitCode = code;
    for (const subscriber of exitSubscribers) subscriber(code);
  });
  return {
    exited,
    write: (data) => {
      child.stdin.write(data);
    },
    onData: (callback) => {
      subscribers.add(callback);
      if (backlog) {
        const pending = backlog;
        backlog = null;
        for (const data of pending) callback(data);
      }
      return () => subscribers.delete(callback);
    },
    onExit: (callback) => {
      exitSubscribers.add(callback);
      if (exitCode !== void 0) callback(exitCode);
      return () => exitSubscribers.delete(callback);
    },
    resize: () => {
    },
    kill: () => {
      try {
        if (ownsProcessGroup && child.pid) process.kill(-child.pid, "SIGKILL");
        else child.kill("SIGKILL");
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
  };
}
function defaultShell$1() {
  const fromEnv = process.env.SHELL?.trim();
  return fromEnv && fromEnv.startsWith("/") ? fromEnv : "/bin/sh";
}
function createLocalRuntime(config = {}) {
  const now = config.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  const baseDir = config.baseDir ?? _n.join(defaultHomeRoot(), ".blume", "runner-sessions");
  const pollMs = config.pollMs ?? 500;
  const shell = config.shell ?? defaultShell$1();
  const scriptPath = config.scriptPath ?? "/usr/bin/script";
  const terminalBackend = resolveTerminalBackend(config, scriptPath);
  const watchers = /* @__PURE__ */ new Set();
  const terminals2 = /* @__PURE__ */ new Map();
  let terminalCounter = 0;
  let destroying = 0;
  const sessionDir = (id) => _n.join(baseDir, sessionDirName(id));
  return {
    id: "local",
    async createSession(input) {
      const home = config.homeDir ?? _n.join(sessionDir(input.sessionId), "home");
      const project = config.homeDir ? config.projectDir ?? _n.join(config.homeDir, "workspace") : _n.join(home, "project");
      await require$$0.mkdir(home, { recursive: true });
      await require$$0.mkdir(project, { recursive: true });
      for (const [rel, content] of Object.entries(input.seedFiles ?? {})) {
        const path = rel.startsWith("/") ? rel : _n.join(project, rel);
        await writeLocalFile(path, content);
      }
      return { id: input.sessionId, runtime: "local", home, project };
    },
    async exec(handle, command) {
      return spawnForExec(handle, command);
    },
    async openTerminal(handle, input) {
      if (destroying) throw new Error("Workspace destruction is in progress.");
      const id = `term_${++terminalCounter}`;
      const cwd = input.cwd ?? handle.project;
      const launch = {
        command: input.command ?? input.harnessId,
        cwd,
        home: handle.home,
        shell,
        scriptPath,
        backend: terminalBackend,
        sentinelNonce: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`,
        ...input.keepAlive ? { keepAlive: true } : {},
        ...input.cols && input.rows ? { size: { cols: input.cols, rows: input.rows } } : {}
      };
      const pty = startTerminal(launch);
      const terminalHandle = {
        id,
        workspaceId: handle.id,
        harnessId: input.harnessId
      };
      const terminal = {
        generation: 0,
        closing: false,
        handle: terminalHandle,
        pty,
        launch,
        size: launch.size,
        subscribers: /* @__PURE__ */ new Set(),
        statusSubscribers: /* @__PURE__ */ new Set(),
        commandExitSubscribers: /* @__PURE__ */ new Set(),
        pendingExits: [],
        reportedCommandExit: false,
        filterSentinels: createSentinelFilter(launch.sentinelNonce),
        backlog: [],
        detach: () => {
        },
        detachExit: () => {
        }
      };
      terminal.detach = pty.onData((raw) => {
        const { text, exits } = terminal.filterSentinels(raw);
        if (text) {
          if (terminal.backlog) terminal.backlog.push(text);
          for (const subscriber of terminal.subscribers) subscriber(text);
        }
        for (const exitCode of exits) {
          terminal.reportedCommandExit = true;
          if (terminal.commandExitSubscribers.size === 0) {
            terminal.pendingExits.push(exitCode);
            continue;
          }
          for (const subscriber of terminal.commandExitSubscribers) subscriber({ exitCode });
        }
      });
      terminal.detachExit = pty.onExit((exitCode) => {
        if (!terminal.reportedCommandExit) {
          terminal.reportedCommandExit = true;
          const code = exitCode ?? 1;
          if (terminal.commandExitSubscribers.size === 0) {
            terminal.pendingExits.push(code);
          } else {
            for (const subscriber of terminal.commandExitSubscribers) subscriber({ exitCode: code });
          }
        }
        const status = exitCode === 0 ? "exited" : "failed";
        for (const subscriber of terminal.statusSubscribers) subscriber(status);
      });
      terminals2.set(id, terminal);
      return terminalHandle;
    },
    async writeTerminal(handle, data) {
      terminals2.get(handle.id)?.pty.write(data);
    },
    async resizeTerminal(handle, size) {
      const terminal = terminals2.get(handle.id);
      if (!terminal) return;
      terminal.size = size;
      terminal.launch.size = size;
      terminal.pty.resize(size.cols, size.rows);
    },
    async restartTerminal(handle) {
      const terminal = terminals2.get(handle.id);
      if (!terminal || terminal.closing || destroying) return;
      const generation = ++terminal.generation;
      terminal.detach();
      terminal.detachExit();
      await stopTerminalProcess(terminal.pty);
      if (terminal.closing || destroying || terminal.generation !== generation) return;
      terminal.backlog = terminal.subscribers.size === 0 ? [] : null;
      const pty = startTerminal(terminal.launch);
      terminal.pty = pty;
      terminal.filterSentinels = createSentinelFilter(terminal.launch.sentinelNonce);
      terminal.reportedCommandExit = false;
      terminal.detach = pty.onData((raw) => {
        const { text, exits } = terminal.filterSentinels(raw);
        if (text) {
          if (terminal.backlog) terminal.backlog.push(text);
          for (const subscriber of terminal.subscribers) subscriber(text);
        }
        for (const exitCode of exits) {
          terminal.reportedCommandExit = true;
          if (terminal.commandExitSubscribers.size === 0) {
            terminal.pendingExits.push(exitCode);
            continue;
          }
          for (const subscriber of terminal.commandExitSubscribers) subscriber({ exitCode });
        }
      });
      terminal.detachExit = pty.onExit((exitCode) => {
        if (!terminal.reportedCommandExit) {
          terminal.reportedCommandExit = true;
          const code = exitCode ?? 1;
          if (terminal.commandExitSubscribers.size === 0) {
            terminal.pendingExits.push(code);
          } else {
            for (const subscriber of terminal.commandExitSubscribers) subscriber({ exitCode: code });
          }
        }
        const status = exitCode === 0 ? "exited" : "failed";
        for (const subscriber of terminal.statusSubscribers) subscriber(status);
      });
    },
    async closeTerminal(handle) {
      const terminal = terminals2.get(handle.id);
      if (!terminal) return;
      terminal.closing = true;
      terminal.detach();
      terminal.detachExit();
      await stopTerminalProcess(terminal.pty);
      terminal.subscribers.clear();
      terminal.statusSubscribers.clear();
      terminal.commandExitSubscribers.clear();
      terminals2.delete(handle.id);
    },
    onTerminalData(handle, callback) {
      const terminal = terminals2.get(handle.id);
      if (!terminal) return () => {
      };
      terminal.subscribers.add(callback);
      if (terminal.backlog) {
        const pending = terminal.backlog;
        terminal.backlog = null;
        for (const data of pending) callback(data);
      }
      return () => {
        terminal.subscribers.delete(callback);
      };
    },
    onTerminalStatus(handle, callback) {
      const terminal = terminals2.get(handle.id);
      if (!terminal) return () => {
      };
      terminal.statusSubscribers.add(callback);
      return () => {
        terminal.statusSubscribers.delete(callback);
      };
    },
    onTerminalCommandExit(handle, callback) {
      const terminal = terminals2.get(handle.id);
      if (!terminal) return () => {
      };
      terminal.commandExitSubscribers.add(callback);
      const missed = terminal.pendingExits;
      terminal.pendingExits = [];
      for (const exitCode of missed) callback({ exitCode });
      return () => {
        terminal.commandExitSubscribers.delete(callback);
      };
    },
    watch(_handle, input) {
      const ignore = input.ignore ?? [...DEFAULT_WATCH_IGNORES];
      const watcher = { queue: new AsyncQueue(), stopped: false, timer: null };
      watchers.add(watcher);
      let previous = /* @__PURE__ */ new Map();
      let first = true;
      const startedAtMs = Date.now();
      const poll = async () => {
        if (watcher.stopped) return;
        const files = await listLocalFiles(input.roots, ignore);
        if (!watcher.stopped) {
          const next = new Map(files.map((file) => [file.path, file]));
          for (const file of files) {
            if (first) {
              if ((file.mtimeMs ?? 0) >= startedAtMs) {
                watcher.queue.push({
                  type: "add",
                  path: file.path,
                  mtimeMs: file.mtimeMs,
                  size: file.size
                });
              }
            } else {
              const prior = previous.get(file.path);
              if (!prior)
                watcher.queue.push({
                  type: "add",
                  path: file.path,
                  mtimeMs: file.mtimeMs,
                  size: file.size
                });
              else if (prior.mtimeMs !== file.mtimeMs || prior.size !== file.size) {
                watcher.queue.push({
                  type: "change",
                  path: file.path,
                  mtimeMs: file.mtimeMs,
                  size: file.size
                });
              }
            }
          }
          if (!first) {
            for (const path of previous.keys()) {
              if (!next.has(path)) watcher.queue.push({ type: "unlink", path });
            }
          }
          previous = next;
          first = false;
        }
        if (!watcher.stopped) watcher.timer = setTimeout(() => void poll(), pollMs);
      };
      void poll();
      return watcher.queue;
    },
    async readFile(_handle, path) {
      return require$$0.readFile(path);
    },
    async writeFile(_handle, path, content) {
      await writeLocalFile(path, content);
    },
    async lstat(_handle, path) {
      const result = await require$$0.lstat(path);
      return {
        isFile: result.isFile(),
        isDirectory: result.isDirectory(),
        isSymbolicLink: result.isSymbolicLink()
      };
    },
    realpath(_handle, path) {
      return require$$0.realpath(path);
    },
    async removeFile(_handle, path) {
      await require$$0.rm(path, { force: true });
    },
    async removeDirectory(_handle, path) {
      await require$$0.rm(path, { recursive: true, force: true });
    },
    async movePath(_handle, source, destination) {
      const normalizedSource = _n.resolve(source);
      const normalizedDestination = _n.resolve(destination);
      if (normalizedDestination === normalizedSource || normalizedDestination.startsWith(`${normalizedSource}${_n.sep}`)) {
        throw new Error(`EINVAL: cannot move ${source} to ${destination}`);
      }
      try {
        await require$$0.lstat(normalizedDestination);
        throw new Error(`EEXIST: ${destination}`);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      await require$$0.rename(source, destination);
    },
    async inspectProjectPath(_handle, path) {
      try {
        if (!(await require$$0.stat(path)).isDirectory()) return { isDirectory: false, isRepo: false };
      } catch (error) {
        if (error && typeof error === "object" && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR")) {
          return { isDirectory: false, isRepo: false };
        }
        throw error;
      }
      return { isDirectory: true, ...probe_node.probeGitIdentity(path) };
    },
    async listFiles(handle, input = {}) {
      return listLocalFiles(
        input.roots ?? [handle.home],
        input.ignore ?? [...DEFAULT_WATCH_IGNORES]
      );
    },
    async snapshot(handle) {
      const files = {};
      for (const entry of await listLocalFiles([handle.home], [...DEFAULT_WATCH_IGNORES])) {
        files[entry.path] = decoder.decode(await require$$0.readFile(entry.path));
      }
      return { sessionId: handle.id, capturedAt: now(), files };
    },
    async destroy(handle) {
      destroying++;
      try {
        for (const watcher of watchers) {
          watcher.stopped = true;
          if (watcher.timer) clearTimeout(watcher.timer);
          watcher.queue.close();
        }
        watchers.clear();
        await Promise.all(
          Array.from(terminals2.values(), async (terminal) => {
            terminal.closing = true;
            terminal.detach();
            terminal.detachExit();
            await stopTerminalProcess(terminal.pty);
          })
        );
        terminals2.clear();
        if (!config.homeDir) await require$$0.rm(sessionDir(handle.id), { recursive: true, force: true });
      } finally {
        destroying--;
      }
    }
  };
}
const parentPort = process.parentPort;
const MAX_OUTPUT_CHUNK_CHARS = 16 * 1024;
const defaultShell = process.platform === "win32" ? process.env.ComSpec ?? "cmd.exe" : process.env.SHELL ?? "/bin/sh";
const runtime = createLocalRuntime({
  homeDir: Nl.homedir(),
  projectDir: Nl.homedir(),
  shell: defaultShell
});
const terminals = /* @__PURE__ */ new Map();
function post(message) {
  parentPort?.postMessage(message);
}
function postOutput(tabId, data) {
  let offset = 0;
  while (offset < data.length) {
    let end = Math.min(offset + MAX_OUTPUT_CHUNK_CHARS, data.length);
    if (end < data.length && data.charCodeAt(end - 1) >= 55296 && data.charCodeAt(end - 1) <= 56319) {
      end -= 1;
    }
    post({ type: "output", tabId, data: data.slice(offset, end) });
    offset = end;
  }
}
function terminalTitle(input) {
  const explicit = input.title?.trim();
  if (explicit) return explicit;
  if (input.harnessId === "shell") return "Terminal";
  return input.harnessId === "claude" ? "Claude Code" : input.harnessId === "codex" ? "Codex" : input.harnessId;
}
async function openTerminal(input) {
  const workspace = await runtime.createSession({
    sessionId: `desktop-terminal-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    projectId: "desktop-terminal"
  });
  const cwd = input.cwd?.trim() || Nl.homedir();
  const handle = await runtime.openTerminal(workspace, {
    harnessId: input.harnessId,
    cwd,
    command: input.command ?? (input.harnessId === "shell" ? process.platform === "win32" ? defaultShell : `${defaultShell} -l` : void 0),
    cols: input.cols,
    rows: input.rows,
    ...input.keepAlive ? { keepAlive: true } : {}
  });
  const tab = {
    id: handle.id,
    harnessId: input.harnessId,
    title: terminalTitle(input),
    status: "running",
    cwd
  };
  const detachData = runtime.onTerminalData(handle, (data) => postOutput(handle.id, data));
  const detachCommandExit = runtime.onTerminalCommandExit?.(
    handle,
    ({ exitCode }) => post({ type: "commandExit", tabId: handle.id, exitCode })
  ) ?? (() => {
  });
  const detachStatus = runtime.onTerminalStatus?.(handle, (status) => {
    tab.status = status;
    post({ type: "status", tab: { ...tab } });
  }) ?? (() => {
  });
  terminals.set(handle.id, { handle, workspace, tab, detachData, detachStatus, detachCommandExit });
  return tab;
}
function requireTerminal(tabId) {
  const terminal = terminals.get(tabId);
  if (!terminal) throw new Error(`Unknown terminal: ${tabId}`);
  return terminal;
}
async function handleRequest(message) {
  if (message.type === "stop") {
    await Promise.all(
      [...terminals.values()].map(async (terminal) => {
        terminal.detachData();
        terminal.detachStatus();
        terminal.detachCommandExit();
        await runtime.destroy(terminal.workspace).catch(() => void 0);
      })
    );
    terminals.clear();
    process.exit(0);
  }
  try {
    if (message.type === "open") {
      const tab = await openTerminal(message.input);
      post({ type: "response", requestId: message.requestId, ok: true, tab });
      post({ type: "status", tab });
      return;
    }
    const terminal = requireTerminal(message.tabId);
    if (message.type === "write") {
      await runtime.writeTerminal(terminal.handle, message.data);
    } else if (message.type === "resize") {
      await runtime.resizeTerminal(terminal.handle, message.size);
    } else if (message.type === "close") {
      await runtime.closeTerminal(terminal.handle);
      terminal.detachData();
      terminal.detachStatus();
      terminal.detachCommandExit();
      terminals.delete(message.tabId);
    } else {
      terminal.tab.status = "starting";
      post({ type: "status", tab: { ...terminal.tab } });
      await runtime.restartTerminal(terminal.handle);
      terminal.tab.status = "running";
      post({ type: "status", tab: { ...terminal.tab } });
    }
    post({ type: "response", requestId: message.requestId, ok: true });
  } catch (error) {
    post({
      type: "response",
      requestId: message.requestId,
      ok: false,
      errorMessage: error instanceof Error ? error.message : String(error),
      ...error instanceof Error ? { errorName: error.name } : {}
    });
  }
}
parentPort?.on("message", (event) => {
  void handleRequest(event.data);
});
//# sourceMappingURL=terminalWorker.js.map

//# debugId=290f54da-9f5b-5cab-85bb-7d9c13c288bb
