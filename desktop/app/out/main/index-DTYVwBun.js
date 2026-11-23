"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="49f07bf9-f775-5aa9-9121-c4aafc8c3d41")}catch(e){}}();

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
const deliveryNative = require("electron");
const pullRequestContent = require("./pullRequestContent-CnL3-kOG.js");
require("./deliveryBriefs-CbTihYeZ.js");
const _n = require("node:path");
const require$$0 = require("node:crypto");
const require$$0$1 = require("node:fs/promises");
const require$$2 = require("node:http");
const client = require("better-auth/client");
const plugins = require("better-auth/client/plugins");
const client$1 = require("@better-auth/electron/client");
const crypto$1 = require("crypto");
require("neverthrow");
const flowerUnlocks = require("./flowerUnlocks-C4stZB4n.js");
const index = require("./index-TxTRDZxy.js");
const userAgentMcp = require("./userAgentMcp-eMSr23l4.js");
require("diff");
const useCases$1 = require("./useCases-CApkWXtQ.js");
const index$1 = require("./index.js");
const evidencePins = require("./evidencePins-DGYf0g3u.js");
const utils = require("@electron-toolkit/utils");
const pn = require("path");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
const legacyExclusions = require("./legacyExclusions-DC3wHYCy.js");
const Nl = require("node:os");
const un = require("fs");
const require$$0$2 = require("os");
const pino = require("pino");
const apiLogs = require("@opentelemetry/api-logs");
const exporterLogsOtlpHttp = require("@opentelemetry/exporter-logs-otlp-http");
const resources = require("@opentelemetry/resources");
const sdkLogs = require("@opentelemetry/sdk-logs");
const useCases = require("./useCases-CLjkUKfw.js");
const node_child_process = require("node:child_process");
const require$$5 = require("node:perf_hooks");
const require$$1 = require("node:util");
const promises = require("fs/promises");
const rustBinding_node = require("./rustBinding.node-BougJ60f.js");
const jsonlFiles = require("./jsonlFiles-B8t4SSDo.js");
const require$$0$3 = require("child_process");
const index$2 = require("./index-DvaJIvS-.js");
const fs = require("node:fs");
const harnessCli = require("./harnessCli-Bmy0uVpC.js");
const setupScanProtocol = require("./setupScanProtocol-IIuZVeL1.js");
const signalAnalytics = require("./signalAnalytics-CSLxOeHK.js");
const electronUpdater = require("electron-updater");
const require$$1$1 = require("node:dns");
const require$$1$2 = require("node:net");
const zlib = require("zlib");
const searchIndexing = require("./searchIndexing-C4lh6bB5.js");
require("process");
require("buffer");
require("./hash-DCMQIns_.js");
require("./harnessRuns-C9zOkWLa.js");
require("./index-UFoqNX7c.js");
require("./identity-C50QOXIb.js");
require("./repositoryKey-CSvrvo7G.js");
require("./desktopSearch-UUzZxN96.js");
require("better-sqlite3");
require("./insights-CJUxz2Be.js");
require("./browser-DmfmUSN8.js");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const deliveryNative__namespace = /* @__PURE__ */ _interopNamespaceDefault(deliveryNative);
const GENERATED_NAME_ADJECTIVES = [
  "Amber",
  "Bright",
  "Calm",
  "Clear",
  "Clever",
  "Kind",
  "Lively",
  "Lucky",
  "Mellow",
  "Quiet",
  "Sunny",
  "Swift",
  "Warm"
];
const GENERATED_NAME_NOUNS = [
  "Aster",
  "Bloom",
  "Cedar",
  "Clover",
  "Dahlia",
  "Fern",
  "Iris",
  "Juniper",
  "Laurel",
  "Lumen",
  "Maple",
  "Orchid",
  "Sage",
  "Violet"
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function generateIdentityProfileName(randomInt) {
  const adjective = GENERATED_NAME_ADJECTIVES[randomInt(GENERATED_NAME_ADJECTIVES.length)];
  const noun = GENERATED_NAME_NOUNS[randomInt(GENERATED_NAME_NOUNS.length)];
  return `${adjective} ${noun} ${randomInt(100, 1e3)}`;
}
function normalizeIdentityEmail(value) {
  const email = value?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return null;
  return email;
}
function projectBlumeProfileFromIdentityFile(file, deps) {
  const email = normalizeIdentityEmail(file.profile?.email);
  const generatedName = file.profile?.generatedName?.trim() || deps?.createGeneratedName() || "";
  return {
    id: file.id,
    displayName: email ?? generatedName,
    email,
    generatedName,
    nameSource: email ? "email" : "generated",
    createdAt: file.createdAt,
    createdWithAppVersion: file.createdWithAppVersion?.trim() || null,
    updatedAt: file.profile?.updatedAt ?? file.createdAt
  };
}
function normalizeIdentityFile(existing, deps) {
  const now = deps.now();
  const id = existing?.id || deps.createId();
  const createdAt = existing?.createdAt || now;
  const email = normalizeIdentityEmail(existing?.profile?.email);
  const generatedName = existing?.profile?.generatedName?.trim() || deps.createGeneratedName();
  const file = {
    id,
    createdAt,
    ...!existing && deps.appVersion?.trim() ? { createdWithAppVersion: deps.appVersion.trim() } : existing?.createdWithAppVersion?.trim() ? { createdWithAppVersion: existing.createdWithAppVersion.trim() } : {},
    profile: {
      generatedName,
      email,
      updatedAt: existing?.profile?.updatedAt ?? now
    }
  };
  const changed = !existing || existing.id !== file.id || existing.createdAt !== file.createdAt || existing.createdWithAppVersion !== file.createdWithAppVersion || existing.profile?.generatedName !== file.profile?.generatedName || normalizeIdentityEmail(existing.profile?.email) !== file.profile?.email || existing.profile?.updatedAt !== file.profile?.updatedAt;
  return { file, changed };
}
function projectIdentityFileWithEmail(existing, email, deps) {
  const normalizedEmail = normalizeIdentityEmail(email);
  if (!normalizedEmail) throw new Error("invalid email");
  return {
    ...existing,
    profile: {
      generatedName: existing.profile?.generatedName?.trim() || deps.createGeneratedName(),
      email: normalizedEmail,
      updatedAt: deps.now()
    }
  };
}
const IDENTITY_FILE_NAME = "identity";
function createIdentityHost(deps) {
  let cached2 = null;
  let inFlight = null;
  const generateProfileName = () => generateIdentityProfileName(deps.randomInt);
  async function loadIdentityFile() {
    const { file, changed } = normalizeIdentityFile(
      await deps.readJson(IDENTITY_FILE_NAME),
      {
        createId: deps.createId,
        createGeneratedName: generateProfileName,
        now: deps.now,
        appVersion: deps.appVersion
      }
    );
    if (changed) await deps.writeJson(IDENTITY_FILE_NAME, file);
    cached2 = file;
    return file;
  }
  function getOrCreateIdentityFile() {
    if (cached2) return Promise.resolve(cached2);
    if (!inFlight) {
      inFlight = loadIdentityFile().finally(() => {
        inFlight = null;
      });
    }
    return inFlight;
  }
  return {
    async getOrCreateBlumeId() {
      return (await getOrCreateIdentityFile()).id;
    },
    async getOrCreateBlumeProfile() {
      return projectBlumeProfileFromIdentityFile(await getOrCreateIdentityFile(), {
        createGeneratedName: generateProfileName
      });
    },
    async setBlumeProfileEmail(email) {
      const normalizedEmail = normalizeIdentityEmail(email);
      if (!normalizedEmail) throw new Error("invalid email");
      const existing = await getOrCreateIdentityFile();
      const next = projectIdentityFileWithEmail(existing, normalizedEmail, {
        createGeneratedName: generateProfileName,
        now: deps.now
      });
      await deps.writeJson(IDENTITY_FILE_NAME, next);
      cached2 = next;
      return projectBlumeProfileFromIdentityFile(next, {
        createGeneratedName: generateProfileName
      });
    }
  };
}
function shellEscape(s) {
  return `'${s.replace(/'/g, `'\\''`)}'`;
}
function createTerminalLaunchPlan(input, ports) {
  const { platform, app, cwd, command } = input;
  let plan;
  if (platform === "win32") {
    plan = createWindowsTerminalLaunchPlan(app, cwd, command);
  } else if (platform !== "darwin") {
    plan = createLinuxTerminalLaunchPlan(cwd, command);
  } else {
    plan = createMacTerminalLaunchPlan(app, cwd, command);
  }
  if (ports) return executeTerminalLaunchPlan(plan, ports);
  return plan;
}
async function executeTerminalLaunchPlan(plan, ports) {
  if (plan.kind === "windows-candidates") {
    await openFirstTerminalCandidate(plan.candidates, ports);
    return;
  }
  if (plan.kind === "linux-candidates") {
    await openFirstTerminalCandidate(
      plan.candidates,
      ports,
      "no supported terminal emulator found"
    );
    return;
  }
  if (plan.kind === "osascript") {
    await ports.osascript(plan.script);
    return;
  }
  if (plan.kind === "openExternal") {
    await ports.openExternal(plan.url);
    return;
  }
  await ports.spawnDetached(plan.cmd, plan.args, plan.cwd);
}
async function openFirstTerminalCandidate(candidates, ports, finalErrorMessage) {
  let lastError;
  for (const { cmd, args, cwd } of candidates) {
    try {
      await ports.spawnDetached(cmd, args, cwd);
      return;
    } catch (err) {
      lastError = err;
    }
  }
  if (finalErrorMessage) throw new Error(finalErrorMessage);
  throw lastError;
}
function createWindowsTerminalLaunchPlan(app, cwd, command) {
  const defaultCmd = {
    cmd: "cmd.exe",
    args: ["/c", "start", "", "cmd", "/k", command],
    cwd
  };
  if (app === "WindowsTerminal") {
    return {
      kind: "windows-candidates",
      candidates: [
        { cmd: "wt.exe", args: ["-d", cwd, "cmd", "/k", command] },
        defaultCmd
      ]
    };
  }
  if (app === "PowerShell") {
    return {
      kind: "windows-candidates",
      candidates: [
        {
          cmd: "cmd.exe",
          args: ["/c", "start", "", "powershell", "-NoExit", "-Command", command],
          cwd
        },
        defaultCmd
      ]
    };
  }
  return { kind: "windows-candidates", candidates: [defaultCmd] };
}
function createLinuxTerminalLaunchPlan(cwd, command) {
  const shellCmd = `cd ${shellEscape(cwd)} && ${command}; exec bash`;
  return {
    kind: "linux-candidates",
    candidates: [
      { cmd: "x-terminal-emulator", args: ["-e", "bash", "-c", shellCmd], cwd },
      {
        cmd: "gnome-terminal",
        args: [`--working-directory=${cwd}`, "--", "bash", "-c", shellCmd],
        cwd
      },
      { cmd: "konsole", args: ["--workdir", cwd, "-e", "bash", "-c", shellCmd], cwd },
      { cmd: "xterm", args: ["-e", "bash", "-c", shellCmd], cwd }
    ]
  };
}
function createMacTerminalLaunchPlan(app, cwd, command) {
  const cdCmd = `cd ${shellEscape(cwd)} && ${command}`;
  if (app === "Terminal") {
    const escaped = cdCmd.replace(/"/g, '\\"');
    return {
      kind: "osascript",
      script: `tell application "Terminal" to do script "${escaped}"
activate application "Terminal"`
    };
  }
  if (app === "iTerm") {
    const escaped = cdCmd.replace(/"/g, '\\"');
    return {
      kind: "osascript",
      script: `tell application "iTerm"
  create window with default profile command "${escaped}"
  activate
end tell`
    };
  }
  if (app === "Warp") {
    return {
      kind: "openExternal",
      url: `warp://action/new_tab?path=${encodeURIComponent(cwd)}`
    };
  }
  return {
    kind: "spawnDetached",
    cmd: "open",
    args: ["-a", "Ghostty", cwd]
  };
}
function resumeConversationInputFromRow(row) {
  return {
    id: row.external_id ?? (row.source === "codex" ? "" : String(row.id)),
    source: row.source,
    cwd: row.cwd ?? void 0,
    entrypoint: row.entrypoint ?? void 0
  };
}
function resumeActionForConversation(conversation, ports) {
  const cwd = conversation.cwd;
  const action = resumeActionForConversationOnly(conversation, cwd);
  return action;
}
function resumeActionForConversationOnly(conversation, cwd) {
  switch (conversation.source) {
    case "cursor": {
      if (!cwd) return null;
      return { kind: "url", url: `cursor://file/${encodeURI(normalizeSeparators(cwd))}` };
    }
    case "claude": {
      if (conversation.entrypoint === "claude-desktop") {
        return { kind: "app", appName: "Claude" };
      }
      if (!cwd) return null;
      return {
        kind: "terminal",
        harnessId: "claude",
        cwd,
        command: `claude --resume ${conversation.id}`
      };
    }
    case "codex": {
      if (!cwd || !conversation.id) return null;
      return {
        kind: "terminal",
        harnessId: "codex",
        cwd,
        command: `codex resume ${conversation.id}`
      };
    }
    case "pi": {
      if (!cwd) return null;
      return { kind: "terminal", harnessId: "pi", cwd, command: "pi" };
    }
    case "omp": {
      if (!cwd) return null;
      return { kind: "terminal", harnessId: "omp", cwd, command: "omp" };
    }
    default:
      return null;
  }
}
function normalizeSeparators(path) {
  return path.replace(/\\/g, "/");
}
const SQLITE_BUSY_CODE = "SQLITE_BUSY";
const SQLITE_BUSY_MESSAGE_PATTERN = /^database is locked$/i;
function errorMessage$4(error) {
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
function isExpectedSqliteBusyError(error) {
  const code = readSqliteCode(error);
  if (code !== void 0) return code === SQLITE_BUSY_CODE;
  return SQLITE_BUSY_MESSAGE_PATTERN.test(primaryErrorLine$2(errorMessage$4(error)));
}
function shouldReportStateTickAppError(error) {
  return !isExpectedSqliteBusyError(error);
}
const CONVERSATION_PARSE_INTERVAL_SETTING = "conversations.parseInterval";
const CONVERSATION_PARSE_INTERVALS = ["live", "30s", "1m", "5m", "15m"];
const CONVERSATION_PARSE_INTERVAL_MS = {
  live: 5e3,
  "30s": 3e4,
  "1m": 6e4,
  "5m": 5 * 6e4,
  "15m": 15 * 6e4
};
function defaultConversationParseInterval(_channel) {
  return "live";
}
function conversationParseInterval(value, channel) {
  return CONVERSATION_PARSE_INTERVALS.includes(value ?? "") ? value : defaultConversationParseInterval();
}
const OPEN_CONVERSATION_TTL_MS = 15 * 6e4;
const MAX_OPEN_CONVERSATIONS = 20;
function createOpenConversationSet(now = () => Date.now()) {
  const opened = /* @__PURE__ */ new Map();
  return {
    open(ref) {
      opened.delete(ref);
      opened.set(ref, now());
      while (opened.size > MAX_OPEN_CONVERSATIONS) opened.delete(opened.keys().next().value);
    },
    includesPath(path) {
      const cutoff = now() - OPEN_CONVERSATION_TTL_MS;
      for (const [ref, at] of opened) {
        if (at < cutoff) {
          opened.delete(ref);
          continue;
        }
        const split = ref.indexOf(":");
        if (split <= 0) continue;
        const harness = ref.slice(0, split);
        const conversationId = ref.slice(split + 1);
        if (evidencePins.registeredAgentSourceFilter([{ harness, conversationId }])(harness, path)) return true;
      }
      return false;
    }
  };
}
const CONVERSATION_BOOT_INGEST_DELAY_MS = 3e3;
const CONVERSATION_UPDATE_REFRESH_DRAIN_TIMEOUT_MS = 5e3;
const CONVERSATION_STATE_TICK_INTERVAL_MS = 15e3;
const CONVERSATION_WATCH_FALLBACK_POLL_INTERVAL_MS = 5e3;
const CONVERSATION_UPDATE_SETTLE_DELAY_MS = 250;
const CONVERSATION_WATCH_REFRESH_MIN_GAP_MS = 5e3;
const CONVERSATION_RENDERER_NOTIFY_MIN_GAP_MS = 1e3;
const CONVERSATION_WATCH_LARGE_FILE_BYTES = 50 * 1024 * 1024;
const CONVERSATION_WATCH_LARGE_IDLE_MS = 6e4;
const CONVERSATION_WATCH_LARGE_MAX_DEFER_MS = 5 * 6e4;
function createConversationBackgroundService(deps) {
  const dayMs = deps.dayMs ?? evidencePins.CONVERSATION_DAY_MS;
  const waitingMs = deps.waitingMs ?? evidencePins.WAITING_MS;
  const now = deps.now ?? (() => Date.now());
  const bootIngestDelayMs = deps.bootIngestDelayMs ?? CONVERSATION_BOOT_INGEST_DELAY_MS;
  const stateTickIntervalMs = deps.stateTickIntervalMs ?? CONVERSATION_STATE_TICK_INTERVAL_MS;
  const watchFallbackPollIntervalMs = deps.watchFallbackPollIntervalMs ?? CONVERSATION_WATCH_FALLBACK_POLL_INTERVAL_MS;
  const updateRefreshDrainTimeoutMs = deps.updateRefreshDrainTimeoutMs ?? CONVERSATION_UPDATE_REFRESH_DRAIN_TIMEOUT_MS;
  const updateSettleDelayMs = deps.updateSettleDelayMs ?? CONVERSATION_UPDATE_SETTLE_DELAY_MS;
  const watchRefreshMinGapMs = deps.watchRefreshMinGapMs ?? CONVERSATION_WATCH_REFRESH_MIN_GAP_MS;
  const rendererNotifyMinGapMs = deps.rendererNotifyMinGapMs ?? CONVERSATION_RENDERER_NOTIFY_MIN_GAP_MS;
  const watchLargeFileBytes = deps.watchLargeFileBytes ?? CONVERSATION_WATCH_LARGE_FILE_BYTES;
  const watchLargeIdleMs = deps.watchLargeIdleMs ?? CONVERSATION_WATCH_LARGE_IDLE_MS;
  const watchLargeMaxDeferMs = deps.watchLargeMaxDeferMs ?? CONVERSATION_WATCH_LARGE_MAX_DEFER_MS;
  let backgroundRefreshEnabled = false;
  let bootIngestTimer = null;
  let watcher2 = null;
  let watcherCloseStarted = false;
  let backgroundServicesPausedForUpdate = false;
  let fallbackPollInFlight = false;
  let rendererNotifyTimer = null;
  let rendererNotifyPending = false;
  let lastRendererNotifyAt = Number.NEGATIVE_INFINITY;
  let lastFallbackPollAt = Number.NEGATIVE_INFINITY;
  let lastFocusRefreshAt = Number.NEGATIVE_INFINITY;
  const openConversations = createOpenConversationSet(now);
  const parseGapMs = () => Math.max(watchRefreshMinGapMs, deps.parseIntervalMs?.() ?? watchRefreshMinGapMs);
  function notifyRenderersChangedNow() {
    if (rendererNotifyTimer !== null) {
      deps.timers.clearTimeout(rendererNotifyTimer);
      rendererNotifyTimer = null;
    }
    rendererNotifyPending = false;
    if (deps.isQuitting()) return;
    lastRendererNotifyAt = now();
    deps.notifyRenderersChanged();
  }
  function notifyRenderersChangedForProgress() {
    if (deps.isQuitting()) return;
    const remainingMs = rendererNotifyMinGapMs - (now() - lastRendererNotifyAt);
    if (remainingMs <= 0 && rendererNotifyTimer === null) {
      notifyRenderersChangedNow();
      return;
    }
    rendererNotifyPending = true;
    if (rendererNotifyTimer !== null) return;
    rendererNotifyTimer = deps.timers.setTimeout(
      () => {
        rendererNotifyTimer = null;
        if (!rendererNotifyPending || deps.isQuitting()) return;
        notifyRenderersChangedNow();
      },
      Math.max(0, remainingMs)
    );
  }
  function notifyRenderersChangedForCompletion() {
    if (deps.isQuitting()) return;
    rendererNotifyPending = true;
    if (rendererNotifyTimer !== null) return;
    const remainingMs = rendererNotifyMinGapMs - (now() - lastRendererNotifyAt);
    rendererNotifyTimer = deps.timers.setTimeout(
      () => {
        rendererNotifyTimer = null;
        if (!rendererNotifyPending || deps.isQuitting()) return;
        notifyRenderersChangedNow();
      },
      Math.max(0, remainingMs)
    );
  }
  function finishProgressNotifications(_reportedProgress) {
    notifyRenderersChangedForCompletion();
  }
  let releaseInitialUpdateGate = null;
  let initialUpdateGateReleased = !deps.shouldDeferBootIngestForInitialUpdate;
  const initialUpdateGate = deps.shouldDeferBootIngestForInitialUpdate ? new Promise((resolve) => {
    releaseInitialUpdateGate = resolve;
  }) : Promise.resolve();
  let bootIngestReady = false;
  let bootIngestQueued = false;
  let bootIngestStarted = false;
  async function markStaleConversationsInactiveWithBusyRetry(cutoffMs) {
    try {
      return await deps.conversations.markStaleConversationsInactive(cutoffMs);
    } catch (error) {
      if (!isExpectedSqliteBusyError(error)) throw error;
      await deps.timers.yieldToEventLoop();
      return await deps.conversations.markStaleConversationsInactive(cutoffMs);
    }
  }
  const stateTick = deps.timers.setInterval(() => {
    if (deps.isQuitting()) return;
    if (!backgroundRefreshEnabled) return;
    void markStaleConversationsInactiveWithBusyRetry(now() - waitingMs).then((changed) => {
      if (changed > 0) notifyRenderersChangedNow();
    }).catch((err) => {
      if (deps.isQuitting()) return;
      if (!shouldReportStateTickAppError(err)) {
        deps.log.info("[blume] state-tick skipped expected SQLite busy", {
          failure_class: "sqlite_busy",
          reporting_action: "local_log_only"
        });
        return;
      }
      deps.log.error("[blume] state-tick failed:", err);
      deps.captureAppError("main.state-tick", err);
    });
  }, stateTickIntervalMs);
  function pollChangedConversationSources() {
    if (fallbackPollInFlight || deps.isQuitting() || !backgroundRefreshEnabled || !deps.conversations.findChangedConversationSourcePaths || parseGapMs() > watchFallbackPollIntervalMs && now() - lastFallbackPollAt < parseGapMs()) {
      return;
    }
    lastFallbackPollAt = now();
    fallbackPollInFlight = true;
    void deps.conversations.findChangedConversationSourcePaths().then(async (paths) => {
      if (paths.length === 0 || deps.isQuitting() || !backgroundRefreshEnabled) return;
      if (deps.conversations.applyCodexLiveStateForChangedSources) {
        await deps.conversations.applyCodexLiveStateForChangedSources(paths).then((changed) => {
          if (changed > 0) notifyRenderersChangedNow();
        }).catch((err) => {
          if (deps.isQuitting()) return;
          deps.log.error("[blume] fallback live-state poll failed:", err);
          deps.captureAppError("main.fallback-live-state-poll", err);
        });
      }
      await refreshAndNotify(
        "[blume] fallback source refresh failed:",
        "main.fallback-source-refresh",
        {
          targetPaths: paths
        }
      );
    }).catch((err) => {
      if (deps.isQuitting()) return;
      deps.log.error("[blume] fallback source poll failed:", err);
      deps.captureAppError("main.fallback-source-poll", err);
    }).finally(() => {
      fallbackPollInFlight = false;
    });
  }
  const fallbackPollTick = deps.timers.setInterval(
    pollChangedConversationSources,
    watchFallbackPollIntervalMs
  );
  function delay2(ms) {
    return new Promise((resolve) => {
      deps.timers.setTimeout(resolve, ms);
    });
  }
  function waitForRefreshesToDrainForUpdate() {
    return new Promise((resolve, reject) => {
      let settled = false;
      const timeout = deps.timers.setTimeout(() => {
        if (settled) return;
        settled = true;
        resolve("timed_out");
      }, updateRefreshDrainTimeoutMs);
      void deps.conversations.waitForRefreshes().then(() => {
        if (settled) return;
        settled = true;
        deps.timers.clearTimeout(timeout);
        resolve("drained");
      }).catch((err) => {
        if (settled) return;
        settled = true;
        deps.timers.clearTimeout(timeout);
        reject(err);
      });
    });
  }
  function releaseStartupScanGate() {
    if (initialUpdateGateReleased) return;
    initialUpdateGateReleased = true;
    releaseInitialUpdateGate?.();
    releaseInitialUpdateGate = null;
  }
  function refreshAndNotify(errorMessage2, errorSource, options) {
    return deps.conversations.refreshFromDisk(dayMs, options, () => {
      notifyRenderersChangedForProgress();
    }).then(() => {
      finishProgressNotifications();
    }).catch((err) => {
      if (deps.isQuitting()) return;
      if (evidencePins.isExpectedConversationProviderStopError(err)) return;
      deps.log.error(errorMessage2, err);
      if (!evidencePins.shouldReportConversationProviderAppError(err)) return;
      deps.captureAppError(errorSource, err);
    });
  }
  function refreshOnWatch(request2) {
    if (deps.isQuitting()) return;
    if (!backgroundRefreshEnabled) return;
    void refreshAndNotify("[blume] refresh-on-watch failed:", "main.refresh-on-watch", request2);
  }
  const watchRefreshScheduler = evidencePins.createWatchRefreshScheduler(refreshOnWatch, {
    minGapMs: parseGapMs,
    priorityGapMs: watchRefreshMinGapMs,
    isPriorityPath: (path) => openConversations.includesPath(path),
    largeFileBytes: watchLargeFileBytes,
    largeIdleMs: watchLargeIdleMs,
    largeMaxDeferMs: watchLargeMaxDeferMs,
    fullRefreshMinGapMs: watchLargeIdleMs,
    now,
    setTimer: deps.timers.setTimeout,
    clearTimer: (handle) => deps.timers.clearTimeout(handle)
  });
  function onWatchChanges(batch) {
    if (deps.isQuitting() || !backgroundRefreshEnabled) return;
    if (batch.watcherStatus === "degraded") {
      pollChangedConversationSources();
    }
    if (batch.invalidateWalk || batch.requiresFullRefresh)
      watchRefreshScheduler.requestFullRefresh();
    if (batch.changes.length === 0) return;
    const changes = batch.changes.map(({ path, size }) => ({ path, size }));
    if (deps.conversations.applyCodexLiveStateForChangedSources) {
      void deps.conversations.applyCodexLiveStateForChangedSources(batch.changes.map((change) => change.path)).then((changed) => {
        if (changed > 0) notifyRenderersChangedNow();
      }).catch((err) => {
        if (deps.isQuitting()) return;
        deps.log.error("[blume] live-state-on-watch failed:", err);
        deps.captureAppError("main.live-state-on-watch", err);
      });
    }
    watchRefreshScheduler.handleChanges(changes);
  }
  function startConversationWatcher() {
    if (deps.isQuitting() || watcherCloseStarted || backgroundServicesPausedForUpdate || watcher2) {
      return;
    }
    watcher2 = deps.startWatcher(onWatchChanges);
  }
  function startBootIngestIfReady() {
    if (deps.isQuitting() || bootIngestQueued || bootIngestStarted || !bootIngestReady) return;
    bootIngestQueued = true;
    void initialUpdateGate.then(() => {
      bootIngestQueued = false;
      if (deps.isQuitting()) return;
      bootIngestStarted = true;
      backgroundRefreshEnabled = true;
      startConversationWatcher();
      void deps.conversations.bootIngest(() => {
        notifyRenderersChangedForProgress();
      }).then(() => finishProgressNotifications()).catch((err) => {
        if (deps.isQuitting()) return;
        deps.log.error("[blume] bootIngest failed:", err);
        if (!evidencePins.shouldReportConversationProviderAppError(err)) return;
        deps.captureAppError("main.boot-ingest", err);
      });
    });
  }
  return {
    readyToShow() {
      if (bootIngestTimer) return;
      bootIngestTimer = deps.timers.setTimeout(() => {
        bootIngestTimer = null;
        if (deps.isQuitting()) return;
        bootIngestReady = true;
        startBootIngestIfReady();
      }, bootIngestDelayMs);
    },
    focus() {
      if (!backgroundRefreshEnabled) return;
      if (deps.isQuitting()) return;
      if (deps.canRefreshOnFocus && !deps.canRefreshOnFocus()) return;
      const gap = parseGapMs();
      if (gap > watchRefreshMinGapMs && now() - lastFocusRefreshAt < gap) return;
      lastFocusRefreshAt = now();
      void refreshAndNotify("[blume] refresh-on-focus failed:", "main.refresh-on-focus");
    },
    openConversation(ref) {
      openConversations.open(ref);
      watchRefreshScheduler.reschedule();
    },
    async prepareForUpdateCheck() {
      if (!deps.shouldPauseForUpdate || deps.isQuitting() || watcherCloseStarted) return;
      const before = deps.sampleOwnFileDescriptors();
      deps.log.info("pausing background services for macOS update check", before);
      backgroundServicesPausedForUpdate = true;
      backgroundRefreshEnabled = false;
      deps.conversations.requestRefreshStop();
      const activeWatcher = watcher2;
      watcher2 = null;
      if (activeWatcher) {
        try {
          await activeWatcher.close();
          await delay2(updateSettleDelayMs);
        } catch (err) {
          deps.log.error("[blume] failed to pause watcher for update:", err);
          deps.captureAppError("main.update-pause-watcher", err);
        }
      }
      const afterWatcher = deps.sampleOwnFileDescriptors();
      let refresh_drain = "drained";
      try {
        refresh_drain = await waitForRefreshesToDrainForUpdate();
        await delay2(updateSettleDelayMs);
      } catch (err) {
        refresh_drain = "timed_out";
        deps.log.error("[blume] failed to pause refreshes for update:", err);
        deps.captureAppError("main.update-pause-refreshes", err);
      }
      deps.log.info("paused background services for macOS update check", {
        before,
        after_watcher: afterWatcher,
        after_refreshes: deps.sampleOwnFileDescriptors(),
        refresh_drain
      });
    },
    resumeAfterUpdateCheck() {
      if (!deps.shouldPauseForUpdate || deps.isQuitting() || watcherCloseStarted) return;
      if (!backgroundServicesPausedForUpdate) {
        releaseStartupScanGate();
        return;
      }
      backgroundServicesPausedForUpdate = false;
      releaseStartupScanGate();
      deps.conversations.resumeRefreshes();
      if (!bootIngestStarted) {
        startBootIngestIfReady();
        return;
      }
      backgroundRefreshEnabled = true;
      startConversationWatcher();
      void refreshAndNotify(
        "[blume] refresh-after-update-resume failed:",
        "main.refresh-after-update-resume"
      );
    },
    stop() {
      watchRefreshScheduler.dispose();
      if (rendererNotifyTimer !== null) {
        deps.timers.clearTimeout(rendererNotifyTimer);
        rendererNotifyTimer = null;
      }
      rendererNotifyPending = false;
      if (bootIngestTimer) {
        deps.timers.clearTimeout(bootIngestTimer);
        bootIngestTimer = null;
      }
      deps.timers.clearInterval(stateTick);
      deps.timers.clearInterval(fallbackPollTick);
      if (watcherCloseStarted) return;
      if (!watcher2) return;
      watcherCloseStarted = true;
      void watcher2.close().catch((err) => {
        deps.log.error("[blume] failed to close watcher during quit:", err);
      });
    }
  };
}
const MAC_TERMINALS = ["Terminal", "iTerm", "Warp", "Ghostty"];
const WIN_TERMINALS = ["WindowsTerminal", "PowerShell", "Cmd"];
function parseTerminalApp(value) {
  return isTerminalApp(value) ? value : null;
}
function defaultTerminalApp(platform) {
  return platform === "win32" ? "WindowsTerminal" : "Terminal";
}
function normalizeTerminalPreference(value, platform) {
  const parsed = parseTerminalApp(value);
  if (!parsed) return defaultTerminalApp(platform);
  if (platform === "win32" && !WIN_TERMINALS.includes(parsed)) return defaultTerminalApp(platform);
  if (platform !== "win32" && !MAC_TERMINALS.includes(parsed)) return defaultTerminalApp(platform);
  return parsed;
}
function isTerminalApp(value) {
  return typeof value === "string" && [...MAC_TERMINALS, ...WIN_TERMINALS].includes(value);
}
const CODEX_LIVE_STATE_WINDOW_BYTES = 512 * 1024;
function jsonRecord(line) {
  try {
    const parsed = JSON.parse(line);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function approvalCallId(payload) {
  return typeof payload.call_id === "string" ? payload.call_id : typeof payload.id === "string" ? payload.id : null;
}
function requiresEscalatedApproval(payload) {
  if (payload.type !== "function_call" || typeof payload.arguments !== "string") return false;
  return jsonRecord(payload.arguments)?.sandbox_permissions === "require_escalated";
}
function taskCompletedWithoutFinalMessage(payload) {
  if (!Object.hasOwn(payload, "last_agent_message")) return false;
  const message = payload.last_agent_message;
  return message === null || typeof message === "string" && message.trim().length === 0;
}
function deriveCodexLiveState(lines, currentState) {
  let lifecycle = null;
  let lifecycleTs = 0;
  let lifecycleOrder = -1;
  let latestApprovalTs = 0;
  let latestApprovalOrder = -1;
  let latestContinuationTs = 0;
  let latestContinuationOrder = -1;
  let latestToolOutputTs = 0;
  let latestToolOutputOrder = -1;
  let sawToolOutput = false;
  const approvals = /* @__PURE__ */ new Set();
  for (const [order, line] of lines.entries()) {
    const raw = jsonRecord(line);
    if (!raw) continue;
    const payload = raw.payload && typeof raw.payload === "object" && !Array.isArray(raw.payload) ? raw.payload : {};
    const ts = typeof raw.timestamp === "string" ? Date.parse(raw.timestamp) || 0 : 0;
    if (raw.type === "event_msg") {
      const next = payload.type === "task_started" ? "running" : payload.type === "user_message" || payload.type === "agent_message" ? "running" : payload.type === "task_complete" ? taskCompletedWithoutFinalMessage(payload) ? "failed" : "finished" : payload.type === "turn_aborted" ? "idle" : null;
      if (next) {
        lifecycle = next;
        lifecycleTs = ts;
        lifecycleOrder = order;
      }
      continue;
    }
    if (raw.type !== "response_item") continue;
    const isToolOutput = payload.type === "function_call_output" || payload.type === "custom_tool_call_output";
    if (!isToolOutput) {
      latestContinuationTs = ts;
      latestContinuationOrder = order;
    }
    if (requiresEscalatedApproval(payload)) {
      const id = approvalCallId(payload);
      if (id) {
        approvals.add(id);
        latestApprovalTs = ts;
        latestApprovalOrder = order;
      }
    } else if (isToolOutput) {
      sawToolOutput = true;
      latestToolOutputTs = ts;
      latestToolOutputOrder = order;
      if (typeof payload.call_id === "string") approvals.delete(payload.call_id);
    }
  }
  if (approvals.size > 0 && latestApprovalOrder > lifecycleOrder) {
    return { state: "needs-approval", eventTs: latestApprovalTs };
  }
  if (latestContinuationOrder > lifecycleOrder) {
    if (currentState === "needs-approval" && !sawToolOutput && approvals.size === 0) return null;
    return { state: "running", eventTs: latestContinuationTs };
  }
  if (currentState === "needs-approval" && sawToolOutput && latestToolOutputOrder > lifecycleOrder) {
    return { state: "running", eventTs: latestToolOutputTs };
  }
  if (!lifecycle) return null;
  if (lifecycle === "running" && approvals.size > 0)
    return { state: "needs-approval", eventTs: lifecycleTs };
  if (lifecycle === "running" && currentState === "needs-approval" && !sawToolOutput) return null;
  return {
    state: lifecycle,
    eventTs: lifecycleTs,
    ...lifecycle === "failed" ? { failureReason: "task completed without a final agent message" } : {}
  };
}
async function classifyCodexLiveState(ports, path, fromBytes, currentState) {
  if (fromBytes < 0) return null;
  const stat = await ports.stat(path);
  if (!stat || stat.isFile === false || stat.size <= fromBytes) return null;
  const start = Math.max(fromBytes, stat.size - CODEX_LIVE_STATE_WINDOW_BYTES);
  const lines = await ports.readLinesFromOffset(path, start);
  return deriveCodexLiveState(start > fromBytes ? lines.slice(1) : lines, currentState);
}
const TERMINAL_SETTING_KEY = "terminal";
const CONVERSATION_SOURCE_POLL_LIMIT = 64;
function createConversationMainRuntime(deps) {
  let refreshService = null;
  let conversationUseCases = null;
  const liveStateInFlight = /* @__PURE__ */ new Set();
  const now = deps.now ?? (() => Date.now());
  const conversationIngestRuntime = evidencePins.createConversationIngestRuntime({
    sourceCursors: {
      getSourceCursor: (kind, path) => deps.getStorage().sourceCursors.getSourceCursor(kind, path),
      upsertSourceCursor: (input) => deps.getStorage().sourceCursors.upsertSourceCursor(input)
    },
    conversations: {
      getSkippedConversation: (ref) => deps.getStorage().desktopConversations.getSkippedConversation(ref),
      applySkippedConversationUpdate: (input) => deps.getStorage().desktopConversations.applySkippedConversationUpdate(input),
      replaceConversation: (input) => deps.getStorage().desktopConversations.replaceConversation(input)
    },
    isSelfRunPath: deps.isSelfRunPath,
    applyDeferredOverrides: deps.applyDeferredOverrides,
    now
  });
  function getConversationRefreshService() {
    if (!refreshService) {
      refreshService = evidencePins.createConversationRefreshService({
        providers: deps.providers,
        sourceCursors: {
          listSourceCursors: () => deps.getStorage().sourceCursors.listSourceCursors(),
          resetSourceCursorsForKind: (kind) => deps.getStorage().sourceCursors.resetSourceCursorsForKind(kind)
        },
        conversations: {
          deleteConversationsBySourcePaths: (paths) => deps.getStorage().desktopConversations.deleteConversationsBySourcePaths(paths),
          markStaleConversationsInactive: (cutoffMs) => deps.getStorage().desktopConversations.markStaleConversationsInactive(cutoffMs)
        },
        isSelfRunPath: (path) => deps.isSelfRunPath(path),
        ingestConversation: (parsed) => conversationIngestRuntime.ingestConversation(parsed),
        getMeta: deps.getMeta,
        setMeta: deps.setMeta,
        track: deps.track,
        now,
        captureError: deps.captureRefreshError,
        onIngestError: deps.onIngestError
      });
    }
    return refreshService;
  }
  function getConversationUseCases() {
    if (!conversationUseCases) {
      conversationUseCases = evidencePins.createConversationUseCases({
        storage: {
          listConversations: (opts) => deps.getStorage().desktopConversations.listConversations(opts),
          countConversations: (opts) => deps.getStorage().desktopConversations.countConversations(opts),
          listConversationViewRecords: (opts) => deps.getStorage().desktopConversations.listConversationViewRecords(opts),
          getConversationByRef: (ref) => deps.getStorage().desktopConversations.getConversationByRef(ref),
          getConversationByIdentifier: (value) => deps.getStorage().desktopConversations.getConversationByIdentifier(value),
          getConversationTitle: (ref) => deps.getStorage().desktopConversations.getConversationTitle(ref),
          getConversationTranscriptByRef: (ref, opts) => deps.getStorage().desktopConversations.getConversationTranscriptByRef(ref, opts),
          searchConversationTranscriptByRef: (ref, query, beforeTurnPosition) => deps.getStorage().desktopConversations.searchConversationTranscriptByRef(
            ref,
            query,
            beforeTurnPosition
          ),
          getConversationTitleMessages: (ref) => deps.getStorage().desktopConversations.getConversationTitleMessages(ref),
          setConversationTitle: (ref, title, source) => deps.getStorage().desktopConversations.setConversationTitle(ref, title, source),
          dismissConversation: (ref, dismissedAt) => deps.getStorage().desktopConversations.dismissConversation(ref, dismissedAt),
          markConversationIdle: (ref) => deps.getStorage().desktopConversations.markConversationIdle(ref)
        },
        title: deps.title,
        branchLabel: deps.branchLabel,
        liveTail: deps.liveTail ? {
          ...deps.liveTail,
          getSourceBytesParsed: async (ref) => (await deps.getStorage().sourceCursors.getSourceCursor("codex", ref))?.sourceBytesParsed
        } : void 0,
        now
      });
    }
    return conversationUseCases;
  }
  return {
    dayMs: evidencePins.CONVERSATION_DAY_MS,
    weekMs: evidencePins.CONVERSATION_WEEK_MS,
    requestConversationRefreshStop() {
      getConversationRefreshService().requestStop();
    },
    resumeConversationRefreshes() {
      getConversationRefreshService().resume();
    },
    waitForConversationRefreshes() {
      return getConversationRefreshService().waitForRefreshes();
    },
    async findChangedConversationSourcePaths() {
      if (!deps.sourceStat) return [];
      const storage = deps.getStorage();
      const [activeRows, recentRows] = await Promise.all([
        storage.desktopConversations.listConversations({
          state: ["running", "needs-approval"],
          limit: CONVERSATION_SOURCE_POLL_LIMIT
        }),
        storage.desktopConversations.listConversations({
          sinceMs: now() - evidencePins.CONVERSATION_DAY_MS,
          limit: CONVERSATION_SOURCE_POLL_LIMIT
        })
      ]);
      const paths = [
        ...new Set([...activeRows, ...recentRows].map((row) => row.source_path ?? row.ref))
      ];
      const cursors = await storage.sourceCursors.listSourceCursorsForPaths(paths);
      const cursorByPath = new Map(cursors.map((cursor) => [cursor.path, cursor]));
      const changed = await Promise.all(
        paths.map(async (path) => {
          const current = await deps.sourceStat?.(path);
          if (!current?.isFile) return null;
          const cursor = cursorByPath.get(path);
          if (!cursor) return { path, ...current };
          return current.mtimeMs !== cursor.sourceMtimeMs || cursor.sourceSize != null && current.size !== cursor.sourceSize ? { path, ...current } : null;
        })
      );
      const changes = changed.filter(
        (change) => change !== null
      );
      deps.recordSourceChanges?.(changes);
      return changes.map((change) => change.path);
    },
    async applyCodexLiveStateForChangedSources(paths) {
      if (!deps.liveState) return 0;
      let changed = 0;
      for (const path of paths) {
        if (!path.endsWith(".jsonl") || liveStateInFlight.has(path)) continue;
        const row = await deps.getStorage().desktopConversations.getConversationByRef(path);
        if (!row || row.source !== "codex") continue;
        const cursor = await deps.getStorage().sourceCursors.getSourceCursor("codex", path);
        const fromBytes = cursor?.sourceBytesParsed;
        if (fromBytes == null) continue;
        liveStateInFlight.add(path);
        try {
          const next = await classifyCodexLiveState(
            deps.liveState,
            path,
            fromBytes,
            row.state
          );
          if (next && (next.state !== row.state || (next.failureReason ?? null) !== row.failure_reason)) {
            if (await deps.getStorage().desktopConversations.setConversationState(
              path,
              next.state,
              next.state === "failed" ? next.failureReason ?? null : null
            ))
              changed += 1;
          }
        } finally {
          liveStateInFlight.delete(path);
        }
      }
      return changed;
    },
    refreshFromDisk(maxAgeMs = evidencePins.CONVERSATION_DAY_MS, options = {}) {
      return getConversationRefreshService().refreshFromDisk(maxAgeMs, options);
    },
    bootIngest(options = {}) {
      deps.onBootIngestStart?.();
      const bootOptions = { ...options };
      if (!bootOptions.onBackfillError && deps.onBootIngestBackfillError) {
        bootOptions.onBackfillError = deps.onBootIngestBackfillError;
      }
      return getConversationRefreshService().bootIngest(bootOptions);
    },
    listConversationRows(opts = {}) {
      return getConversationUseCases().listConversationRows(opts);
    },
    countConversationRows(opts = {}) {
      return getConversationUseCases().countConversationRows(opts);
    },
    loadMenuBarConversationProjection() {
      return evidencePins.loadMenuBarConversationProjection(deps.getStorage().desktopConversations);
    },
    getConversationRow(ref) {
      return getConversationUseCases().getConversationRow(ref);
    },
    listConversationsForView(opts = {}) {
      return getConversationUseCases().listConversationsForView(opts);
    },
    getTranscript(ref, opts = {}) {
      return getConversationUseCases().getTranscript(ref, opts);
    },
    searchTranscript(ref, query, beforeTurnPosition) {
      return getConversationUseCases().searchTranscript(ref, query, beforeTurnPosition);
    },
    dismissConversation(ref) {
      return getConversationUseCases().dismissConversation(ref);
    },
    setConversationIdle(ref) {
      return getConversationUseCases().setConversationIdle(ref);
    },
    async resume(ref) {
      const row = await deps.getStorage().desktopConversations.getConversationByRef(ref);
      if (!row) throw new Error(`unknown conversation: ${ref}`);
      await deps.resumeConversation(resumeConversationInputFromRow(row));
    },
    regenerateConversationTitle(input) {
      return getConversationUseCases().regenerateConversationTitle(input);
    },
    applyGeneratedTitleToProvider(input) {
      return getConversationUseCases().applyGeneratedTitleToProvider(input);
    },
    setUserTitle(input) {
      return getConversationUseCases().setUserTitle(input);
    },
    revertTitleToProvider(input) {
      return getConversationUseCases().revertTitleToProvider(input);
    },
    getTerminalPreference() {
      return normalizeTerminalPreference(deps.getSetting(TERMINAL_SETTING_KEY), deps.platform);
    },
    setTerminalPreference(app) {
      deps.setSetting(TERMINAL_SETTING_KEY, app);
    }
  };
}
const CONVERSATION_VIEW_LIST_MAX_ROWS = 2e3;
const CONVERSATION_VIEW_LIST_MAX_ROWS_WITH_USER_TURNS = 200;
const CONVERSATION_VIEW_LIST_MAX_FILTER_VALUES = 32;
function projectConversationRefreshMaxAgeMs(input, dayMs) {
  return Math.min(input ?? dayMs, dayMs);
}
function projectConversationListOptions(input) {
  return input ?? {};
}
function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function stringFilter(value) {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return void 0;
  return value.filter((item) => typeof item === "string").slice(0, CONVERSATION_VIEW_LIST_MAX_FILTER_VALUES);
}
function normalizeConversationViewListOptions(input) {
  const raw = input && typeof input === "object" ? input : {};
  const options = {};
  const state = stringFilter(raw.state);
  if (state !== void 0) options.state = state;
  const excludeState = stringFilter(raw.excludeState);
  if (excludeState !== void 0) options.excludeState = excludeState;
  const source = stringFilter(raw.source);
  if (source !== void 0) options.source = source;
  if (raw.excludeCodexSubagents === true) options.excludeCodexSubagents = true;
  const projectId = finiteNumber(raw.projectId);
  if (projectId !== void 0) options.projectId = projectId;
  if (raw.includeDismissed === true) options.includeDismissed = true;
  if (raw.includeUserTurns === true) options.includeUserTurns = true;
  if (raw.includeUserTurnCount === true) options.includeUserTurnCount = true;
  const sinceMs = finiteNumber(raw.sinceMs);
  if (sinceMs !== void 0) options.sinceMs = sinceMs;
  const maxRows = options.includeUserTurns ? CONVERSATION_VIEW_LIST_MAX_ROWS_WITH_USER_TURNS : CONVERSATION_VIEW_LIST_MAX_ROWS;
  const limit = finiteNumber(raw.limit);
  options.limit = limit === void 0 ? maxRows : Math.min(maxRows, Math.max(0, Math.floor(limit)));
  const offset = finiteNumber(raw.offset);
  if (offset !== void 0 && offset > 0) options.offset = Math.floor(offset);
  return options;
}
function projectConversationTranscriptOptions(input) {
  return input && typeof input === "object" ? input : {};
}
function createConversationMainIpcHandlers({
  runtime,
  notifyChanged,
  onConversationOpened
}) {
  return [
    {
      channel: "db:conversations:refresh",
      handler: async (_event, maxAgeMs) => {
        await runtime.refreshFromDisk(
          projectConversationRefreshMaxAgeMs(maxAgeMs, evidencePins.CONVERSATION_DAY_MS)
        );
        notifyChanged();
      }
    },
    {
      channel: "db:conversations:list",
      handler: (_event, opts) => runtime.listConversationRows(
        projectConversationListOptions(opts)
      )
    },
    {
      channel: "db:conversations:listForView",
      handler: (_event, opts) => runtime.listConversationsForView(
        projectConversationListOptions(opts)
      )
    },
    {
      channel: "db:conversations:get",
      handler: (_event, ref) => runtime.getConversationRow(ref)
    },
    {
      channel: "db:conversations:transcript",
      handler: (_event, ref, opts) => {
        if (typeof ref === "string") onConversationOpened?.(ref);
        return runtime.getTranscript(ref, projectConversationTranscriptOptions(opts));
      }
    },
    {
      channel: "db:conversations:searchTranscript",
      handler: (_event, ref, query, beforeTurnPosition) => runtime.searchTranscript(
        ref,
        query,
        typeof beforeTurnPosition === "number" ? beforeTurnPosition : void 0
      )
    },
    {
      channel: "db:conversations:dismiss",
      handler: async (_event, ref) => {
        await runtime.dismissConversation(ref);
        notifyChanged();
      }
    },
    {
      channel: "db:conversations:idle",
      handler: async (_event, ref) => {
        await runtime.setConversationIdle(ref);
        notifyChanged();
      }
    },
    {
      channel: "db:conversations:resume",
      handler: (_event, ref) => runtime.resume(ref)
    },
    {
      channel: "db:conversations:regenerateTitle",
      handler: async (_event, source, ref) => {
        const title = await runtime.regenerateConversationTitle({
          source,
          ref
        });
        notifyChanged();
        return title;
      }
    },
    {
      channel: "db:conversations:applyTitleToHarness",
      handler: async (_event, source, ref, title) => {
        await runtime.applyGeneratedTitleToProvider({
          source,
          ref,
          title
        });
        notifyChanged();
      }
    },
    {
      channel: "db:conversations:setTitle",
      handler: async (_event, ref, title) => {
        await runtime.setUserTitle({ ref, title });
        notifyChanged();
      }
    },
    {
      channel: "db:conversations:revertTitleToProvider",
      handler: async (_event, ref) => {
        const title = await runtime.revertTitleToProvider({ ref });
        notifyChanged();
        return title;
      }
    }
  ];
}
const CONVERSATION_WATCH_INDEX_MAX_ENTRIES = 512;
function createConversationWatchIndex(options = {}) {
  const maxEntries = Math.max(
    1,
    Math.floor(options.maxEntries ?? CONVERSATION_WATCH_INDEX_MAX_ENTRIES)
  );
  const fileIndex = /* @__PURE__ */ new Map();
  let ready = false;
  const record = (path, stats2) => {
    if (!stats2) return;
    fileIndex.delete(path);
    fileIndex.set(path, { mtimeMs: stats2.mtimeMs, size: stats2.size });
    while (fileIndex.size > maxEntries) {
      const oldest = fileIndex.keys().next().value;
      if (oldest === void 0) break;
      fileIndex.delete(oldest);
    }
  };
  return {
    snapshot: (snapshotOptions = {}) => {
      const selectedPaths = snapshotOptions.paths ? new Set(snapshotOptions.paths) : null;
      const limit = Math.max(
        0,
        Math.min(maxEntries, Math.floor(snapshotOptions.limit ?? maxEntries))
      );
      const out = [];
      if (limit === 0) return out;
      const entries = [...fileIndex.entries()];
      for (let index2 = entries.length - 1; index2 >= 0; index2 -= 1) {
        const [path, meta] = entries[index2];
        if (selectedPaths && !selectedPaths.has(path)) continue;
        out.push({ path, ...meta });
        if (out.length >= limit) break;
      }
      return out.reverse();
    },
    isReady: () => ready,
    markReady: () => {
      ready = true;
    },
    recordAdd: record,
    recordChange: record,
    recordUnlink: (path) => {
      fileIndex.delete(path);
    }
  };
}
function createConversationWatchRuntime(options) {
  let timer2 = null;
  let pendingWalkInvalidation = false;
  let pendingFullRefresh = false;
  let watcherDegraded = false;
  const changedFiles = /* @__PURE__ */ new Map();
  const maxChangedFiles = Math.max(
    1,
    Math.floor(options.maxChangedFiles ?? evidencePins.CONVERSATION_TARGETED_REFRESH_MAX_PATHS)
  );
  const cursorStatePaths = new Set(options.watch?.cursorStatePaths ?? []);
  const watchRoots = options.watch ? evidencePins.conversationWatchRoots(options.watch.home, options.watch.cursorStatePaths) : [];
  const shouldIgnorePath = options.watch ? (path, stats2) => evidencePins.shouldIgnoreConversationWatchPath(path, stats2, cursorStatePaths) : () => false;
  const recordChangedFile = (path, stats2) => {
    if (!stats2 || pendingFullRefresh) return { overflowed: false };
    changedFiles.set(path, { path, mtimeMs: stats2.mtimeMs, size: stats2.size });
    if (changedFiles.size <= maxChangedFiles) return { overflowed: false };
    changedFiles.clear();
    pendingFullRefresh = true;
    return { overflowed: true };
  };
  const fire = (notifyChanges, invalidateWalkCache) => {
    options.recordWatcherEvent();
    if (invalidateWalkCache) {
      options.invalidateWalkCache();
      pendingWalkInvalidation = true;
    }
    options.invalidateCursorTodoCache();
    if (!notifyChanges) return;
    if (timer2 !== null) options.scheduler.clearTimeout(timer2);
    timer2 = options.scheduler.setTimeout(() => {
      timer2 = null;
      options.recordWatcherFire();
      const changes = [...changedFiles.values()];
      const invalidateWalk = pendingWalkInvalidation;
      const requiresFullRefresh = pendingFullRefresh;
      changedFiles.clear();
      pendingWalkInvalidation = false;
      pendingFullRefresh = false;
      if (options.onChanges) options.onChanges({ changes, invalidateWalk, requiresFullRefresh });
      else options.notifyRenderer?.();
    }, options.debounceMs);
  };
  const runtime = {
    watchRoots,
    shouldIgnorePath,
    attachWatcher: (watcher2) => {
      watcher2.on("add", (path, stats2) => {
        runtime.onAdd(path, stats2);
      });
      watcher2.on("change", (path, stats2) => {
        runtime.onChange(path, stats2);
      });
      watcher2.on("unlink", (path) => {
        runtime.onUnlink(path);
      });
      watcher2.on("addDir", () => {
        runtime.onAddDir();
      });
      watcher2.on("unlinkDir", () => {
        runtime.onUnlinkDir();
      });
      watcher2.on("ready", () => {
        runtime.onReady();
      });
      watcher2.on("error", () => {
        if (watcherDegraded) return;
        watcherDegraded = true;
        options.invalidateWalkCache();
        options.invalidateCursorTodoCache();
        options.onChanges?.({
          changes: [],
          invalidateWalk: true,
          requiresFullRefresh: true,
          watcherStatus: "degraded"
        });
      });
    },
    onAdd: (path, stats2) => {
      options.index.recordAdd(path, stats2);
      recordChangedFile(path, stats2);
      if (cursorStatePaths.has(path)) pendingFullRefresh = true;
      fire(options.index.isReady(), true);
    },
    onChange: (path, stats2) => {
      options.index.recordChange(path, stats2);
      const { overflowed } = recordChangedFile(path, stats2);
      if (cursorStatePaths.has(path)) pendingFullRefresh = true;
      fire(true, overflowed);
    },
    onUnlink: (path) => {
      options.index.recordUnlink(path);
      changedFiles.delete(path);
      if (cursorStatePaths.has(path)) pendingFullRefresh = true;
      fire(true, true);
    },
    onAddDir: () => {
      fire(options.index.isReady(), true);
    },
    onUnlinkDir: () => {
      fire(true, true);
    },
    onReady: () => {
      watcherDegraded = false;
      options.index.markReady();
      if (options.onChanges) {
        options.onChanges({
          changes: [],
          invalidateWalk: false,
          requiresFullRefresh: false,
          watcherStatus: "healthy"
        });
      } else {
        options.notifyRenderer?.();
      }
    },
    close: () => {
      if (timer2 !== null) options.scheduler.clearTimeout(timer2);
      timer2 = null;
    }
  };
  return runtime;
}
function createConversationWatchHost(ports) {
  const index2 = createConversationWatchIndex();
  return {
    getKnownFiles: (options) => index2.snapshot(options),
    recordChanges: (changes) => {
      for (const change of changes) index2.recordChange(change.path, change);
    },
    isWatcherReady: () => index2.isReady(),
    watchConversations: (onChanges, debounceMs = 250) => {
      const runtime = createConversationWatchRuntime({
        index: index2,
        debounceMs,
        watch: {
          home: ports.home(),
          cursorStatePaths: ports.cursorStatePaths()
        },
        scheduler: ports.scheduler,
        recordWatcherEvent: ports.recordWatcherEvent,
        recordWatcherFire: ports.recordWatcherFire,
        invalidateWalkCache: ports.invalidateWalkCache,
        invalidateCursorTodoCache: ports.invalidateCursorTodoCache,
        onChanges
      });
      const watcher2 = ports.createWatcher(runtime.watchRoots, {
        ignoreInitial: true,
        alwaysStat: true,
        ignored: runtime.shouldIgnorePath,
        awaitWriteFinish: {
          stabilityThreshold: 100,
          pollInterval: 50
        }
      });
      runtime.attachWatcher(watcher2);
      return {
        close: async () => {
          runtime.close();
          await watcher2.close();
        }
      };
    }
  };
}
const HISTORY_PARSER_DAY_MS = 24 * 60 * 60 * 1e3;
const HISTORY_PARSER_CHECK_MS = 3e4;
const HISTORY_PARSER_REST_MS = 15e3;
const HISTORY_PARSER_EMPTY_GAP_MS = 1e3;
const HISTORY_PARSER_IDLE_MS = 5 * 6e4;
const MAX_STEPS_KEPT = 90;
function initialState(now, stored) {
  return {
    status: stored?.status === "done" ? "done" : "starting",
    horizonMs: stored?.horizonMs ?? null,
    oldestSourceMs: stored?.oldestSourceMs ?? null,
    readingFromMs: null,
    conversationsRead: stored?.conversationsRead ?? 0,
    steps: stored?.steps ?? [],
    updatedAt: now,
    lastSeenMs: stored?.lastSeenMs ?? null
  };
}
function createHistoryParser(ports) {
  const stored = ports.load();
  let state = initialState(ports.now(), stored);
  let timer2 = null;
  let stopped = false;
  let started2 = false;
  let paused = stored?.status === "paused";
  let catchUpFromMs = stored?.horizonMs != null ? stored.lastSeenMs ?? stored.updatedAt : null;
  function update(patch) {
    state = { ...state, ...patch, updatedAt: ports.now() };
    ports.save(state);
    ports.onChanged?.(state);
  }
  function settle2(status) {
    if (state.status !== status || state.readingFromMs !== null)
      update({ status, readingFromMs: null });
  }
  function schedule2(ms) {
    if (stopped || paused) return;
    if (timer2 !== null) ports.clearTimeout(timer2);
    timer2 = ports.setTimeout(() => {
      timer2 = null;
      void step();
    }, ms);
  }
  function nextFromMs(horizon) {
    const fromMs = horizon - HISTORY_PARSER_DAY_MS;
    return state.oldestSourceMs !== null && fromMs <= state.oldestSourceMs ? 0 : fromMs;
  }
  async function step() {
    if (stopped || paused || state.horizonMs === null) return;
    const catchingUp = catchUpFromMs !== null;
    if (state.status === "done" && !catchingUp) return;
    const resting = () => paused ? "paused" : state.status === "done" ? "done" : "waiting";
    if (!ports.isQuiet()) {
      settle2(resting());
      schedule2(HISTORY_PARSER_CHECK_MS);
      return;
    }
    const horizon = state.horizonMs;
    const fromMs = catchingUp ? horizon : nextFromMs(horizon);
    const request2 = catchingUp ? { cutoffMs: horizon, mtimeAfterMs: catchUpFromMs, mtimeBeforeMs: null } : { cutoffMs: fromMs, mtimeAfterMs: fromMs, mtimeBeforeMs: horizon };
    if (!catchingUp) update({ status: "reading", readingFromMs: fromMs });
    const startedAt = ports.now();
    try {
      const result = await ports.read(request2);
      if (stopped) return;
      if (result.ran === false) {
        settle2(resting());
        schedule2(HISTORY_PARSER_CHECK_MS);
        return;
      }
      if (catchingUp) {
        catchUpFromMs = null;
        if (result.conversations > 0)
          update({ conversationsRead: state.conversationsRead + result.conversations });
        schedule2(HISTORY_PARSER_EMPTY_GAP_MS);
        return;
      }
      const oldestSourceMs = result.oldestSourceMs ?? state.oldestSourceMs;
      if (oldestSourceMs === null) {
        settle2(resting());
        schedule2(HISTORY_PARSER_IDLE_MS);
        return;
      }
      const steps = [
        {
          fromMs,
          conversations: result.conversations,
          durationMs: ports.now() - startedAt,
          at: ports.now()
        },
        ...state.steps
      ].slice(0, MAX_STEPS_KEPT);
      const done = fromMs === 0;
      update({
        horizonMs: fromMs,
        oldestSourceMs,
        readingFromMs: null,
        status: done ? "done" : paused ? "paused" : "waiting",
        conversationsRead: state.conversationsRead + result.conversations,
        steps
      });
      if (done) return;
      schedule2(result.conversations === 0 ? HISTORY_PARSER_EMPTY_GAP_MS : HISTORY_PARSER_REST_MS);
    } catch (error) {
      if (stopped) return;
      ports.onError?.(error);
      settle2(resting());
      schedule2(HISTORY_PARSER_IDLE_MS);
    }
  }
  return {
    start(fromMs) {
      if (stopped || started2) return;
      started2 = true;
      if (state.status !== "done")
        update({
          horizonMs: Math.min(state.horizonMs ?? fromMs, fromMs),
          status: paused ? "paused" : "waiting"
        });
      schedule2(0);
    },
    pause() {
      paused = true;
      if (timer2 !== null) ports.clearTimeout(timer2);
      timer2 = null;
      if (state.status !== "done") update({ status: "paused", readingFromMs: null });
    },
    resume() {
      if (!paused) return;
      paused = false;
      if (state.status !== "done") update({ status: "waiting" });
      if (started2) schedule2(0);
    },
    stop() {
      if (stopped) return;
      stopped = true;
      if (timer2 !== null) ports.clearTimeout(timer2);
      timer2 = null;
      if (started2) {
        state = { ...state, readingFromMs: null, lastSeenMs: ports.now() };
        if (state.status === "reading") state = { ...state, status: "waiting" };
        ports.save(state);
      }
    },
    state: () => state,
    horizonMs: (fallbackMs) => state.horizonMs ?? fallbackMs
  };
}
const REFERRAL_DEEP_LINK_PROTOCOLS = ["blume", "blume-canary", "blume-dev"];
const REFERRALS_DEFAULT_TIMEOUT_MS = 1e4;
const PUBLIC_REFERRAL_INVITE_BASE_URL = "https://blume.codes/invite";
function normalizeReferralInviteCode(value) {
  const trimmed = value.trim();
  return /^[a-z]+(?:-[a-z]+){2,}$/i.test(trimmed) ? trimmed.toLowerCase() : trimmed.toUpperCase();
}
function publicReferralInviteUrl(code) {
  return `${PUBLIC_REFERRAL_INVITE_BASE_URL}/${encodeURIComponent(normalizeReferralInviteCode(code))}`;
}
function normalizeReferralLink(link) {
  return {
    ...link,
    code: normalizeReferralInviteCode(link.code),
    inviteUrl: publicReferralInviteUrl(link.code)
  };
}
function parseReferralInviteDeepLink(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!REFERRAL_DEEP_LINK_PROTOCOLS.some((protocol) => parsed.protocol === `${protocol}:`)) {
    return null;
  }
  const parts = parsed.hostname === "app" ? parsed.pathname.split("/").filter(Boolean) : [parsed.hostname, ...parsed.pathname.split("/").filter(Boolean)];
  if (parts[0] !== "invite" || !parts[1]) return null;
  let code;
  try {
    code = normalizeReferralInviteCode(decodeURIComponent(parts[1]));
  } catch {
    return null;
  }
  return {
    code,
    cid: parsed.searchParams.get("cid") ?? void 0
  };
}
function patchReferralState(current, patch) {
  return { ...current, ...patch };
}
function isReferralActivationPending(state) {
  return Boolean(state.claimedCode) && !state.activated;
}
function shouldClaimReferralInvite(state) {
  return !state.claimedCode;
}
function buildReferralCodeRequest(blumeId) {
  return {
    path: "/code",
    body: { blumeId }
  };
}
function buildReferralStatusPath(blumeId) {
  return `/status?blumeId=${encodeURIComponent(blumeId)}`;
}
function buildReferralClaimRequest(input) {
  return {
    path: "/claim",
    body: { code: input.code, inviteeBlumeId: input.blumeId, cid: input.cid }
  };
}
function buildReferralActivateRequest(blumeId) {
  return {
    path: "/activate",
    body: { blumeId }
  };
}
function createReferralClient(deps) {
  const timeoutMs = deps.timeoutMs ?? REFERRALS_DEFAULT_TIMEOUT_MS;
  let claimInFlight = null;
  let activationInFlight = null;
  async function patchLocalState(patch) {
    const current = await deps.readLocalState();
    await deps.writeLocalState(patchReferralState(current, patch));
  }
  async function fetchJson(path, errorPath = path) {
    const res = await deps.fetch({
      url: `${deps.baseUrl}${path}`,
      timeoutMs
    });
    if (!res.ok) throw new Error(`referrals ${errorPath} -> ${res.status}`);
    return await res.json();
  }
  async function postJson(path, body) {
    const res = await deps.fetch({
      url: `${deps.baseUrl}${path}`,
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      timeoutMs
    });
    if (!res.ok) throw new Error(`referrals ${path} -> ${res.status}`);
    return await res.json();
  }
  async function isActivationPending() {
    const state = await deps.readLocalState();
    return isReferralActivationPending(state);
  }
  async function reportActivation() {
    if (activationInFlight) return activationInFlight;
    activationInFlight = (async () => {
      const state = await deps.readLocalState();
      if (!isReferralActivationPending(state)) return;
      const blumeId = await deps.getBlumeId();
      try {
        const request2 = buildReferralActivateRequest(blumeId);
        await postJson(request2.path, request2.body);
        await patchLocalState({ activated: true });
        deps.capture?.("referral_activation_reported", {});
        deps.logger.info("reported activation");
      } catch (err) {
        deps.logger.warn("activation failed", { error: err });
        throw err;
      }
    })();
    try {
      await activationInFlight;
    } finally {
      activationInFlight = null;
    }
  }
  async function maybeReportActivation() {
    const state = await deps.readLocalState();
    if (!isReferralActivationPending(state)) return;
    if (!await deps.hasAnyConversation()) return;
    await reportActivation();
  }
  return {
    async getReferralLink() {
      const blumeId = await deps.getBlumeId();
      const request2 = buildReferralCodeRequest(blumeId);
      const data = await postJson(request2.path, request2.body);
      const link = normalizeReferralLink(data);
      await patchLocalState({ code: link.code });
      return link;
    },
    async getReferralStatus() {
      const blumeId = await deps.getBlumeId();
      return fetchJson(buildReferralStatusPath(blumeId), "/status");
    },
    async claimInvite(code, cid) {
      if (claimInFlight) return claimInFlight;
      claimInFlight = (async () => {
        const state = await deps.readLocalState();
        if (!shouldClaimReferralInvite(state)) return;
        const blumeId = await deps.getBlumeId();
        try {
          const request2 = buildReferralClaimRequest({ code, blumeId, cid });
          await postJson(request2.path, request2.body);
          await patchLocalState({ claimedCode: code });
          deps.capture?.("referral_invite_claimed", { had_click_id: Boolean(cid) });
          deps.logger.info("claimed invite", { code });
        } catch (err) {
          deps.logger.warn("claim failed", { code, error: err });
          throw err;
        }
      })();
      try {
        await claimInFlight;
      } finally {
        claimInFlight = null;
      }
    },
    isActivationPending,
    reportActivation,
    maybeReportActivation
  };
}
const CHAT_PATH = "/v1/chat/completions";
const DEFAULT_CHAT_MODEL = "anthropic/claude-haiku-4-5";
const DEFAULT_TEMPERATURE = 0.4;
const DEFAULT_MAX_TOKENS = 256;
function createLlmAccessTokenRequestBody(installationId, clientRelease2) {
  return JSON.stringify({
    installationId,
    audience: "llm",
    scopes: ["llm:invoke"],
    clientRelease: clientRelease2
  });
}
class LlmGatewayError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "LlmError";
    this.status = status;
  }
}
function resolveLlmChatEndpoint(serviceUrl) {
  const trimmed = serviceUrl.replace(/\/+$/, "");
  return trimmed.endsWith(CHAT_PATH) ? trimmed : `${trimmed}${CHAT_PATH}`;
}
function createLlmChatRequestBody(messages, opts = {}) {
  return JSON.stringify({
    model: opts.model ?? DEFAULT_CHAT_MODEL,
    messages,
    temperature: opts.temperature ?? DEFAULT_TEMPERATURE,
    max_tokens: opts.maxTokens ?? DEFAULT_MAX_TOKENS
  });
}
function parseLlmChatCompletionContent(value) {
  const content = typeof value === "object" && value !== null ? value.choices?.[0]?.message?.content : void 0;
  if (typeof content !== "string" || !content) {
    throw new LlmGatewayError("LLM service returned no content");
  }
  return content.trim();
}
function createLlmGatewayChatClient(deps) {
  return async function chat2(messages, opts = {}) {
    const body = createLlmChatRequestBody(messages, opts);
    const service2 = await deps.getServiceConfig();
    const headers = {
      "Content-Type": "application/json"
    };
    if (service2.token && deps.signRequest) {
      const url = new URL(service2.endpoint);
      Object.assign(
        headers,
        await deps.signRequest?.({
          token: service2.token,
          method: "POST",
          path: `${url.pathname}${url.search}`,
          body
        })
      );
    }
    const res = await deps.fetch({
      endpoint: service2.endpoint,
      method: "POST",
      headers,
      body
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new LlmGatewayError(`LLM service ${res.status}: ${text.slice(0, 300)}`, res.status);
    }
    return parseLlmChatCompletionContent(await res.json());
  };
}
const DEEP_LINK_ROUTE_PROTOCOLS = ["blume:", "blume-canary:", "blume-dev:"];
const DEEP_LINK_HOME_PATH = "/deliveries";
const TELEMETRY_PARAMS = /* @__PURE__ */ new Set(["source", "download_id", "ph_distinct_id"]);
const MAX_PATH = 2e3;
function routePathFromDeepLink(url, options = {}) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const protocols = options.protocols ?? DEEP_LINK_ROUTE_PROTOCOLS;
  if (!protocols.includes(parsed.protocol)) return null;
  const raw = parsed.hostname === "app" ? parsed.pathname.split("/").filter(Boolean) : [parsed.hostname, ...parsed.pathname.split("/").filter(Boolean)].filter(Boolean);
  if (raw.length === 0) return DEEP_LINK_HOME_PATH;
  const segments = [];
  for (const part of raw) {
    let decoded;
    try {
      decoded = decodeURIComponent(part);
    } catch {
      decoded = part;
    }
    if (!decoded || decoded === "." || decoded === ".." || /[\u0000-\u001f]/.test(decoded))
      return null;
    segments.push(encodeURIComponent(decoded));
  }
  const query = new URLSearchParams();
  for (const [key, value] of parsed.searchParams)
    if (!TELEMETRY_PARAMS.has(key)) query.append(key, value);
  const path = `/${segments.join("/")}${query.size ? `?${query}` : ""}`;
  return path.length <= MAX_PATH ? path : null;
}
function deepLinkTelemetryProperties(url, path) {
  try {
    const parsed = new URL(url);
    return {
      deep_link_url: url,
      deep_link_path: path,
      deep_link_source: parsed.searchParams.get("source") ?? void 0,
      website_download_id: parsed.searchParams.get("download_id") ?? void 0,
      website_distinct_id: parsed.searchParams.get("ph_distinct_id") ?? void 0
    };
  } catch {
    return { deep_link_url: url, deep_link_path: path };
  }
}
const ELECTRON_SETUP_VERSION = "electron-fs-1";
function withElectronSetupVersionDefaults(value) {
  return {
    ...value,
    parserVersion: value.parserVersion || ELECTRON_SETUP_VERSION,
    scannerVersion: value.scannerVersion || ELECTRON_SETUP_VERSION
  };
}
const INSTALL_STATE_FILENAME = "install-state.json";
function isJsonObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseInstallState(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!isJsonObject(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}
function serializeInstallState(state) {
  return JSON.stringify(state, null, 2);
}
class SetupService {
  constructor(deps) {
    this.deps = deps;
  }
  list(filter) {
    return this.deps.setup.listSetup(filter);
  }
  listVersions(artifactId) {
    return this.deps.setup.listVersions(artifactId);
  }
  getVersion(versionId) {
    return this.deps.setup.getVersion(versionId);
  }
  async applyChange(change) {
    const version2 = await this.deps.setup.createSetupVersion(change);
    if (this.deps.sync && change.sourcePath) {
      await this.deps.sync.write(change.scope, change.sourcePath, change.content);
    }
    return version2;
  }
  async undo(artifactId) {
    const version2 = await this.deps.setup.undoSetupArtifact(artifactId);
    if (version2 && this.deps.sync) {
      const artifact = await this.deps.setup.getArtifact(artifactId);
      if (artifact?.sourcePath) {
        await this.deps.sync.write(artifact.scope, artifact.sourcePath, version2.content);
      }
    }
    return version2;
  }
  async refreshHarnessSetup(input) {
    const setups = await input.listHarnessSetup();
    const observations = [];
    for (const setup of setups) {
      for (const category of setup.categories) {
        for (const entry of category.entries) {
          if (!entry.contentPath) continue;
          let content;
          try {
            content = await input.readHarnessEntry(entry.contentPath);
          } catch {
            continue;
          }
          observations.push({
            harnessId: setup.source,
            scope: "global",
            kind: index.kindFromPath(entry.contentPath),
            sourcePath: entry.contentPath,
            content,
            parserVersion: input.parserVersion,
            scannerVersion: input.scannerVersion,
            createdBy: "scanner"
          });
        }
      }
    }
    return this.deps.setup.ingestScan(observations);
  }
}
function createSetupDesktopMainUseCases(deps) {
  let setupService = null;
  let hydrated = false;
  function getSetupService() {
    setupService ??= new SetupService({
      setup: deps.getSetupStore(),
      sync: {
        async write(scope, sourcePath, content) {
          if (scope === "project") await deps.browser.writeProjectFile(sourcePath, content);
          else await deps.browser.writeHarnessEntry(sourcePath, content);
        }
      }
    });
    return setupService;
  }
  async function refresh() {
    const result = await getSetupService().refreshHarnessSetup({
      listHarnessSetup: () => deps.browser.listHarnessSetup(),
      readHarnessEntry: (path) => deps.browser.readHarnessEntry(path),
      parserVersion: ELECTRON_SETUP_VERSION,
      scannerVersion: ELECTRON_SETUP_VERSION
    });
    hydrated = true;
    return result;
  }
  async function ensureHydrated() {
    if (!hydrated) await refresh();
  }
  return {
    async list(filter) {
      await ensureHydrated();
      return getSetupService().list(filter);
    },
    listVersions: (artifactId) => getSetupService().listVersions(artifactId),
    getVersion: (versionId) => getSetupService().getVersion(versionId),
    applyChange: (change) => getSetupService().applyChange(withElectronSetupVersionDefaults(change)),
    undo: (artifactId) => getSetupService().undo(artifactId),
    refresh
  };
}
class SocialSignInAttempt {
  constructor() {
    this.controller = new AbortController();
    this.signal = this.controller.signal;
    this.committed = false;
    this.timer = setTimeout(() => {
      if (!this.committed) this.controller.abort(new Error("Social sign-in timed out."));
    }, 12e4);
  }
  cancel() {
    if (this.committed) return false;
    this.controller.abort(new Error("Social sign-in was cancelled."));
    this.dispose();
    return true;
  }
  /** Call immediately before the session is committed, so a completed login wins a late Cancel. */
  commit() {
    this.signal.throwIfAborted();
    this.committed = true;
    clearTimeout(this.timer);
  }
  async wait(work) {
    let stop;
    try {
      return await Promise.race([
        work,
        new Promise((_, reject) => {
          stop = () => reject(this.signal.reason);
          if (this.signal.aborted) stop();
          else this.signal.addEventListener("abort", stop, { once: true });
        })
      ]);
    } finally {
      if (stop) this.signal.removeEventListener("abort", stop);
    }
  }
  dispose() {
    clearTimeout(this.timer);
    if (!this.signal.aborted) this.controller.abort(new Error("Social sign-in was cancelled."));
  }
}
function isSocialSignInCancelled(error) {
  const message = error instanceof Error ? error.message : typeof error === "string" ? error : "";
  return /(?:^|: )Social sign-in was cancelled\.$/.test(message);
}
const ABORTABLE_IPC_CHANNELS = /* @__PURE__ */ new Set([
  "harnesses:scanProject",
  "wrapped:listAvailableWeeks",
  "db:conversations:listForViewCancelable",
  // Project choices leaving mid-read (`db:projects:cancelList`, a navigation or a closed window).
  "db:projects:listRecentCancelable",
  // Renderer cancel/supersede via `db:projects:cancelResolvePath` rejects the
  // in-flight resolve promise with AbortError ("Project path resolution was cancelled.").
  "db:projects:resolvePath"
]);
function isExpectedIpcCancellation(channel, error) {
  if (channel === "account:signInSocial" && isSocialSignInCancelled(error)) return true;
  if (channel === "search:query" && errorName(error) === "SearchSupersededError") return true;
  return ABORTABLE_IPC_CHANNELS.has(channel) && errorName(error) === "AbortError";
}
function errorName(error) {
  return error instanceof Error ? error.name : void 0;
}
const SETUP_IPC_PATH_REJECTION_MESSAGE = "path not allowed";
const SETUP_BROWSER_PATH_VALIDATION_MESSAGES = /* @__PURE__ */ new Set([
  SETUP_IPC_PATH_REJECTION_MESSAGE,
  "path is not a file",
  "path is not a directory",
  "path cannot be deleted"
]);
const SETUP_BROWSER_MISSING_PATH_ENOENT_MESSAGE_PATTERN = /^(?:Error:\s*)?ENOENT:/i;
const SETUP_BROWSER_MISSING_PATH_LSTAT_MESSAGE_PATTERN = /^(?:Error:\s*)?[^,\n]*,\s*lstat\s+['"]/i;
const ARTIFACT_SYNC_OUTSIDE_SETUP_ROOTS_MESSAGES = /* @__PURE__ */ new Set([
  "Artifact sync source is outside the allowed setup roots.",
  "Artifact sync destination is outside the allowed setup roots.",
  "Artifact sync path is outside the allowed setup roots."
]);
const ARTIFACT_SYNC_IPC_CHANNELS = /* @__PURE__ */ new Set([
  "setup:previewSync",
  "setup:setSynced",
  "setup:placeSynced"
]);
const ARTIFACT_SYNC_DISABLED_MESSAGE = "Artifact sync is disabled.";
function isExpectedSetupIpcPathRejection(channel, error) {
  const message = errorMessage$3(error);
  if (isSetupBrowserPathIpcChannel(channel)) {
    if (SETUP_BROWSER_PATH_VALIDATION_MESSAGES.has(message)) return true;
    if (isSetupBrowserMissingPathEnoent(error, message)) return true;
  }
  return ARTIFACT_SYNC_OUTSIDE_SETUP_ROOTS_MESSAGES.has(message) && ARTIFACT_SYNC_IPC_CHANNELS.has(channel);
}
function isExpectedArtifactSyncDisabled(channel, error) {
  return ARTIFACT_SYNC_IPC_CHANNELS.has(channel) && errorMessage$3(error) === ARTIFACT_SYNC_DISABLED_MESSAGE;
}
function isExpectedSetupIpcCancellation(channel, error) {
  return isExpectedIpcCancellation(channel, error);
}
function isSetupBrowserPathIpcChannel(channel) {
  return channel.startsWith("harnesses:") || channel.startsWith("devFormats:");
}
function isSetupBrowserMissingPathEnoent(error, message) {
  const code = readStringProperty$1(error, "code");
  const syscall = readStringProperty$1(error, "syscall");
  const primaryLine = primaryErrorLine$1(message);
  const isEnoent = code !== void 0 ? code === "ENOENT" : SETUP_BROWSER_MISSING_PATH_ENOENT_MESSAGE_PATTERN.test(primaryLine);
  if (!isEnoent) return false;
  return syscall !== void 0 ? syscall === "lstat" : SETUP_BROWSER_MISSING_PATH_LSTAT_MESSAGE_PATTERN.test(primaryLine);
}
function primaryErrorLine$1(message) {
  return message.split("\n", 1)[0]?.trim() ?? "";
}
function readStringProperty$1(error, key) {
  if (!error || typeof error !== "object") return void 0;
  if (!(key in error)) return void 0;
  const value = error[key];
  return typeof value === "string" ? value : void 0;
}
function errorMessage$3(error) {
  return error instanceof Error ? error.message : String(error);
}
const INSTALL_HARNESSES = ["claude", "cursor", "codex", "omp", "pi"];
const SKIPPED_HARNESSES = {
  claude: { status: "skipped", reason: "no global config installed" },
  codex: { status: "skipped", reason: "project-local config only" },
  cursor: { status: "skipped", reason: "no global config installed" },
  omp: { status: "skipped", reason: "not yet implemented" },
  pi: { status: "skipped", reason: "not yet implemented" }
};
function createInstallPlan(input) {
  if (!input.options?.force && input.prior?.appVersion === input.appVersion) {
    return { action: "skip", state: input.prior };
  }
  return {
    action: "run",
    appVersion: input.appVersion,
    harnesses: INSTALL_HARNESSES
  };
}
function shouldRunStartupInstall(input) {
  return !input.isDev || input.devInstallEnv === "1";
}
function defaultInstallOutcomeForHarness(id) {
  return SKIPPED_HARNESSES[id] ?? null;
}
function installOutcomeFromError(err) {
  return {
    status: "error",
    message: err instanceof Error ? err.message : String(err)
  };
}
async function runInstallHarness(id, install) {
  const defaultOutcome = defaultInstallOutcomeForHarness(id);
  if (defaultOutcome) return defaultOutcome;
  if (!install) return { status: "error", message: `Missing installer for ${id}` };
  try {
    return await install();
  } catch (err) {
    return installOutcomeFromError(err);
  }
}
function createInstallState(input) {
  return {
    appVersion: input.appVersion,
    installedAt: input.installedAt,
    harnesses: input.harnesses,
    ...input.migrations && Object.keys(input.migrations).length > 0 ? { migrations: input.migrations } : {}
  };
}
async function runInstall(ports, opts = {}) {
  const version2 = ports.currentAppVersion();
  const prior = await ports.readInstallState();
  const migrations = { ...prior?.migrations ?? {} };
  let migrationsChanged = false;
  for (const [id, migrate] of ports.migrations) {
    if (migrations[id]?.status === "ok") continue;
    migrations[id] = await migrate();
    migrationsChanged = true;
  }
  const plan = createInstallPlan({ appVersion: version2, prior, options: opts });
  if (plan.action === "skip") {
    if (!migrationsChanged) return plan.state;
    const state2 = { ...plan.state, migrations };
    await ports.writeInstallState(state2);
    return state2;
  }
  const harnesses = {};
  for (const id of plan.harnesses) {
    harnesses[id] = await runInstallHarness(id, ports.harnessInstallers.get(id));
  }
  const state = createInstallState({
    appVersion: plan.appVersion,
    installedAt: ports.now().toISOString(),
    harnesses,
    migrations
  });
  await ports.writeInstallState(state);
  return state;
}
const CLAUDE_HOOK_COMMAND_MARKER = ".blume/hooks/inject-rules.mjs";
function removeBlumeClaudeHook(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { changed: false, settings: null };
  }
  if (!isRecord$4(parsed)) return { changed: false, settings: null };
  const settings = parsed;
  const userPromptSubmit = settings.hooks?.UserPromptSubmit;
  if (!Array.isArray(userPromptSubmit)) return { changed: false, settings };
  let changed = false;
  const filtered = userPromptSubmit.flatMap((entry) => {
    if (!isRecord$4(entry) || !Array.isArray(entry.hooks)) return [entry];
    const hooks = entry.hooks.filter(
      (hook) => !(isRecord$4(hook) && typeof hook.command === "string" && hook.command.includes(CLAUDE_HOOK_COMMAND_MARKER))
    );
    if (hooks.length === entry.hooks.length) return [entry];
    changed = true;
    return hooks.length > 0 ? [{ ...entry, hooks }] : [];
  });
  if (!changed) return { changed: false, settings };
  if (filtered.length > 0) {
    settings.hooks.UserPromptSubmit = filtered;
  } else {
    delete settings.hooks.UserPromptSubmit;
    if (Object.keys(settings.hooks).length === 0) delete settings.hooks;
  }
  return { changed: true, settings };
}
function isRecord$4(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function removeTodoListIntegration(deps) {
  try {
    await removeClaudeHookFromSettings(deps);
    await Promise.all([
      deps.fs.removeFile(deps.path.join(deps.blumeHome, "rules", "todo-list.md")),
      deps.fs.removeFile(deps.path.join(deps.blumeHome, "hooks", "inject-rules.mjs")),
      deps.fs.removeFile(deps.path.join(deps.homeDir, ".cursor", "rules", "blume-todo-list.mdc"))
    ]);
    return { status: "ok" };
  } catch (err) {
    return installOutcomeFromError(err);
  }
}
async function removeClaudeHookFromSettings(deps) {
  const settingsPath = deps.path.join(deps.homeDir, ".claude", "settings.json");
  let raw;
  try {
    raw = await deps.fs.readTextFile(settingsPath);
  } catch (err) {
    if (isFileNotFoundError(err)) return;
    throw err;
  }
  const removed = removeBlumeClaudeHook(raw);
  if (!removed.changed || !removed.settings) return;
  await backupClaudeSettings(raw, deps);
  const tmp = `${settingsPath}.${deps.pid}.tmp`;
  await deps.fs.writeTextFile(tmp, JSON.stringify(removed.settings, null, 2));
  await deps.fs.rename(tmp, settingsPath);
}
async function backupClaudeSettings(raw, deps) {
  const backupDir = deps.path.join(deps.blumeHome, "backups");
  await deps.fs.mkdir(backupDir);
  const ts = deps.now().toISOString().replace(/[:.]/g, "-");
  await deps.fs.writeTextFile(deps.path.join(backupDir, `claude-settings-${ts}.json`), raw);
}
function isFileNotFoundError(err) {
  return isRecord$3(err) && err.code === "ENOENT";
}
function isRecord$3(value) {
  return typeof value === "object" && value !== null;
}
function createInstallHost(ports) {
  const installFileSystem = {
    async copyTree(src, dest) {
      await ports.fs.mkdir(ports.path.dirname(dest), { recursive: true });
      await ports.fs.copy(src, dest, { recursive: true, force: true });
    },
    mkdir(path) {
      return ports.fs.mkdir(path, { recursive: true });
    },
    readTextFile: ports.fs.readTextFile,
    writeTextFile: ports.fs.writeTextFile,
    rename: ports.fs.rename,
    removeFile: ports.fs.removeFile
  };
  const getInstallPaths = () => {
    const blumeHome = ports.blumeHome();
    const bundleRoot = ports.isDev ? ports.path.join(ports.appPath(), "resources", "harness-integrations") : ports.path.join(
      ports.resourcesPath(),
      "app.asar.unpacked",
      "resources",
      "harness-integrations"
    );
    return { bundleRoot, blumeHome };
  };
  const createInstallHarnessRuntimeDeps = () => {
    const { bundleRoot, blumeHome } = getInstallPaths();
    return {
      bundleRoot,
      blumeHome,
      homeDir: ports.homeDir(),
      platform: ports.platform(),
      pid: ports.pid(),
      fs: installFileSystem,
      path: { join: ports.path.join },
      now: ports.now
    };
  };
  const harnessInstallers = /* @__PURE__ */ new Map();
  const migrations = /* @__PURE__ */ new Map([
    [
      "remove-todo-list-integration",
      () => removeTodoListIntegration(createInstallHarnessRuntimeDeps())
    ]
  ]);
  const installStatePath = () => ports.path.join(getInstallPaths().blumeHome, INSTALL_STATE_FILENAME);
  const readInstallState = async () => {
    try {
      return parseInstallState(await ports.fs.readTextFile(installStatePath()));
    } catch {
      return null;
    }
  };
  const writeInstallState = async (state) => {
    const { blumeHome } = getInstallPaths();
    await ports.fs.mkdir(blumeHome, { recursive: true });
    const target = installStatePath();
    const tmp = `${target}.${ports.pid()}.tmp`;
    await ports.fs.writeTextFile(tmp, serializeInstallState(state));
    await ports.fs.rename(tmp, target);
  };
  const runInstall$1 = (opts = {}) => runInstall(
    {
      currentAppVersion: ports.currentAppVersion,
      readInstallState,
      writeInstallState,
      harnessInstallers,
      migrations,
      now: ports.now
    },
    opts
  );
  return {
    getInstallPaths,
    createInstallHarnessRuntimeDeps,
    installStatePath,
    readInstallState,
    writeInstallState,
    runInstall: runInstall$1
  };
}
class ImproveSchedulerRuntime {
  constructor(deps) {
    this.timer = null;
    this.deps = deps;
  }
  /** Start the periodic scan/drain. Idempotent. */
  start() {
    if (this.timer) return;
    this.timer = this.deps.setInterval(() => this.invokeTick(), this.deps.intervalMs);
    this.deps.unrefInterval?.(this.timer);
    this.invokeTick();
  }
  stop() {
    if (!this.timer) return;
    this.deps.clearInterval(this.timer);
    this.timer = null;
  }
  /** Re-evaluate immediately after a settings change (enable/mode/harness). */
  refresh() {
    if (this.deps.isEnabled()) {
      this.start();
    } else {
      this.deps.clearPending();
    }
    this.invokeTick();
  }
  invokeTick() {
    void this.deps.tick();
  }
}
const IMPROVE_INSTALLATION_ID_SETTING = "insights.controlPlane.installationId";
const IMPROVE_INSTALLATION_TOKEN_SETTING = "insights.controlPlane.installationToken";
const IMPROVE_CONTROL_TIMEOUT_MS = 8e3;
function asRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? value : null;
}
function asNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function asString$1(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}
function clampPercent(value) {
  if (value === null) return null;
  return Math.min(100, Math.max(0, value));
}
function asEpochMs(value) {
  const num = asNumber(value);
  if (num !== null) {
    if (num <= 0) return null;
    return num < 1e12 ? num * 1e3 : num;
  }
  const str = asString$1(value);
  if (str !== null) {
    const parsed = Date.parse(str);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}
function firstNumber(record, keys) {
  for (const key of keys) {
    const value = asNumber(record[key]);
    if (value !== null) return value;
  }
  return null;
}
function parseClaudeCredentials(json) {
  const root = asRecord(json);
  const oauth = asRecord(root?.claudeAiOauth) ?? root;
  if (!oauth) return null;
  const accessToken = asString$1(oauth.accessToken) ?? asString$1(oauth.access_token);
  if (!accessToken) return null;
  return {
    accessToken,
    refreshToken: asString$1(oauth.refreshToken) ?? asString$1(oauth.refresh_token),
    subscriptionType: asString$1(oauth.subscriptionType) ?? asString$1(oauth.subscription_type),
    expiresAt: asEpochMs(oauth.expiresAt ?? oauth.expires_at),
    scopes: asStringArray(oauth.scopes),
    rateLimitTier: asString$1(oauth.rateLimitTier) ?? asString$1(oauth.rate_limit_tier)
  };
}
function claudeWindow(id, label, value) {
  const record = asRecord(value);
  if (!record) return null;
  return {
    id,
    label,
    usedPercent: clampPercent(firstNumber(record, ["utilization", "used_percent", "usage"])),
    resetsAt: asEpochMs(record.resets_at ?? record.resetsAt)
  };
}
function parseClaudeUsage(json) {
  const root = asRecord(json) ?? {};
  const windows = [
    claudeWindow("session", "Session (5h)", root.five_hour),
    claudeWindow("weekly", "Weekly · all models", root.seven_day),
    claudeWindow("weekly-sonnet", "Weekly · Sonnet", root.seven_day_sonnet),
    claudeWindow("weekly-opus", "Weekly · Opus", root.seven_day_opus)
  ].filter((w) => w !== null);
  let costUsd = null;
  const extra = asRecord(root.extra_usage);
  if (extra) {
    const cents = firstNumber(extra, [
      "used_cents",
      "spend_cents",
      "monthly_spend_cents",
      "used_credits"
    ]);
    const limitCents = firstNumber(extra, [
      "monthly_limit",
      "limit_cents",
      "monthly_limit_cents",
      "spend_limit_cents"
    ]);
    if (cents !== null) costUsd = cents / 100;
    else costUsd = firstNumber(extra, ["used_usd", "spend_usd", "amount_spent"]);
    const utilization = clampPercent(firstNumber(extra, ["utilization", "used_percent", "usage"])) ?? (cents !== null && limitCents !== null && limitCents > 0 ? clampPercent(cents / limitCents * 100) : null);
    if (extra.is_enabled !== false && extra.enabled !== false && utilization !== null) {
      windows.push({
        id: "extra-usage",
        label: cents !== null && limitCents !== null ? `Extra usage ($${(cents / 100).toFixed(2)} / $${(limitCents / 100).toFixed(2)})` : "Extra usage",
        usedPercent: utilization,
        resetsAt: asEpochMs(extra.resets_at ?? extra.resetsAt)
      });
    }
  }
  return { windows, costUsd };
}
function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  if (typeof globalThis.atob !== "function") return null;
  try {
    const binary = globalThis.atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}
function decodeJwtClaims(token) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = decodeBase64Url(parts[1]);
    return payload ? asRecord(JSON.parse(payload)) : null;
  } catch {
    return null;
  }
}
function parseCodexAuth(json) {
  const root = asRecord(json);
  const tokens = asRecord(root?.tokens);
  if (!root || !tokens) return null;
  const accessToken = asString$1(tokens.access_token) ?? asString$1(tokens.accessToken);
  if (!accessToken) return null;
  let accountId = asString$1(tokens.account_id) ?? asString$1(tokens.accountId);
  let plan = null;
  let email = null;
  const idToken = asString$1(tokens.id_token) ?? asString$1(tokens.idToken);
  const claims = idToken ? decodeJwtClaims(idToken) : null;
  if (claims) {
    email = asString$1(claims.email);
    const auth = asRecord(claims["https://api.openai.com/auth"]);
    if (auth) {
      accountId = accountId ?? asString$1(auth.chatgpt_account_id);
      plan = asString$1(auth.chatgpt_plan_type);
    }
  }
  return {
    accessToken,
    refreshToken: asString$1(tokens.refresh_token) ?? asString$1(tokens.refreshToken),
    idToken,
    lastRefreshAt: asEpochMs(
      root.last_refresh ?? root.lastRefresh ?? tokens.last_refresh ?? tokens.lastRefresh
    ),
    accountId,
    plan,
    email
  };
}
function codexWindowLabel(id, windowSeconds) {
  if (windowSeconds !== null) {
    const hours = windowSeconds / 3600;
    if (hours <= 12) return `Session (${Math.round(hours)}h)`;
    const days = hours / 24;
    if (days <= 10) return "Weekly";
    return "Monthly";
  }
  return id === "session" ? "Session" : "Weekly";
}
function codexWindow(id, value, now) {
  const record = asRecord(value);
  if (!record) return null;
  const windowSeconds = firstNumber(record, ["limit_window_seconds", "window_seconds"]) ?? (() => {
    const minutes = firstNumber(record, ["window_minutes", "limit_window_minutes"]);
    return minutes !== null ? minutes * 60 : null;
  })();
  let resetsAt = asEpochMs(record.reset_at ?? record.resets_at ?? record.resetsAt);
  if (resetsAt === null) {
    const resetIn = firstNumber(record, ["resets_in_seconds", "reset_after_seconds"]);
    if (resetIn !== null) resetsAt = now + resetIn * 1e3;
  }
  return {
    id,
    label: codexWindowLabel(id, windowSeconds),
    usedPercent: clampPercent(
      firstNumber(record, [
        "used_percent",
        "usedPercent",
        "percent_used",
        "usage_percent",
        "utilization"
      ])
    ),
    resetsAt
  };
}
function parseCodexUsage(json, now) {
  const root = asRecord(json) ?? {};
  const rateLimit = asRecord(root.rate_limit) ?? asRecord(root.rate_limits) ?? root;
  const windows = [
    codexWindow("session", rateLimit.primary_window ?? rateLimit.primary, now),
    codexWindow("weekly", rateLimit.secondary_window ?? rateLimit.secondary, now)
  ].filter((w) => w !== null);
  return { windows, plan: asString$1(root.plan_type) };
}
const CURSOR_PLAN_LABELS = {
  free: "Free",
  free_trial: "Free trial",
  pro: "Pro",
  pro_plus: "Pro+",
  ultra: "Ultra",
  business: "Business",
  enterprise: "Enterprise"
};
function parseRetryAfterMs(header, now) {
  if (!header) return null;
  const trimmed = header.trim();
  if (/^\d+$/.test(trimmed)) return Number(trimmed) * 1e3;
  const date = Date.parse(trimmed);
  if (Number.isNaN(date)) return null;
  return Math.max(0, date - now);
}
function normalizeCursorCookie(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.includes("WorkosCursorSessionToken=")) return trimmed;
  return `WorkosCursorSessionToken=${trimmed}`;
}
function parseCursorUsage(payload, now) {
  const summary = asRecord(payload.summary) ?? {};
  const legacy = asRecord(payload.legacy) ?? {};
  const me = asRecord(payload.me) ?? {};
  const account = asString$1(me.email) ?? asString$1(summary.email);
  const planRaw = asString$1(summary.membershipType) ?? asString$1(me.membershipType);
  const plan = planRaw ? CURSOR_PLAN_LABELS[planRaw] ?? planRaw : null;
  const windows = [];
  let resetsAt = asEpochMs(
    summary.billingCycleEnd ?? summary.endOfCycle ?? summary.usageCycleEnd ?? summary.resetDate
  );
  if (resetsAt === null) {
    const start = asEpochMs(legacy.startOfMonth);
    if (start !== null) {
      const reset = new Date(start);
      reset.setMonth(reset.getMonth() + 1);
      resetsAt = reset.getTime();
    }
  }
  if (resetsAt !== null && resetsAt < now) resetsAt = null;
  let costUsd = null;
  const individual = asRecord(summary.individualUsage);
  const planUsage = asRecord(individual?.plan);
  if (planUsage) {
    const totalPercent = clampPercent(firstNumber(planUsage, ["totalPercentUsed"]));
    if (totalPercent !== null) {
      windows.push({ id: "plan", label: "Included usage", usedPercent: totalPercent, resetsAt });
    }
    const apiPercent = clampPercent(firstNumber(planUsage, ["apiPercentUsed"]));
    if (apiPercent !== null) {
      windows.push({ id: "api", label: "Named models (API)", usedPercent: apiPercent, resetsAt });
    }
  }
  const onDemand = asRecord(individual?.onDemand);
  if (onDemand && onDemand.enabled !== false) {
    const usedCents = asNumber(onDemand.used);
    const limitCents = asNumber(onDemand.limit);
    if (usedCents !== null && limitCents !== null && limitCents > 0) {
      windows.push({
        id: "on-demand",
        label: `On-demand ($${(usedCents / 100).toFixed(2)} / $${(limitCents / 100).toFixed(2)})`,
        usedPercent: clampPercent(usedCents / limitCents * 100),
        resetsAt
      });
      costUsd = usedCents / 100;
    }
  }
  if (windows.length === 0) {
    const planPercent = clampPercent(
      firstNumber(summary, [
        "planUsagePercent",
        "usagePercent",
        "percentUsed",
        "includedUsagePercent"
      ])
    );
    if (planPercent !== null) {
      windows.push({ id: "plan", label: "Plan usage", usedPercent: planPercent, resetsAt });
    }
  }
  const gpt4 = asRecord(legacy["gpt-4"]);
  if (gpt4) {
    const used = firstNumber(gpt4, ["numRequests", "numRequestsTotal"]);
    const max = asNumber(gpt4.maxRequestUsage);
    if (used !== null && max !== null && max > 0) {
      windows.push({
        id: "requests",
        label: `Included requests (${used} / ${max})`,
        usedPercent: clampPercent(used / max * 100),
        resetsAt
      });
    }
  }
  if (windows.length === 0 && resetsAt !== null) {
    windows.push({ id: "cycle", label: "Billing cycle", usedPercent: null, resetsAt });
  }
  if (costUsd === null) {
    const cents = firstNumber(summary, [
      "onDemandSpendCents",
      "usageBasedSpendCents",
      "totalSpendCents",
      "spendCents"
    ]);
    costUsd = cents !== null ? cents / 100 : firstNumber(summary, ["onDemandSpend", "spend"]);
  }
  return { windows, plan, account, costUsd };
}
const DEFAULT_REPORT_CACHE_TTL_MS = 2 * 6e4;
const DEFAULT_RATE_LIMIT_MIN_BACKOFF_MS = 6e4;
const DEFAULT_RATE_LIMIT_MAX_BACKOFF_MS$1 = 15 * 6e4;
class UsageRateLimitError extends Error {
  constructor(retryAfterMs) {
    super("rate limited");
    this.retryAfterMs = retryAfterMs;
  }
}
function createUsageErrorSnapshot(provider, status, detail, cta = null) {
  return { provider, status, account: null, plan: null, windows: [], costUsd: null, detail, cta };
}
function emptyProviderResilience() {
  return { lastGood: null, lastGoodAt: 0, blockedUntil: 0, backoffMs: 0 };
}
function defaultFormatClock(ms) {
  return new Date(ms).toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
class UsageProviderReportService {
  constructor(deps) {
    this.cachedReport = null;
    this.inFlightReport = null;
    this.stateCookie = null;
    this.stateCursorEnabled = true;
    this.resilience = {
      claude: emptyProviderResilience(),
      codex: emptyProviderResilience(),
      cursor: emptyProviderResilience()
    };
    this.deps = deps;
  }
  async fetchUsageReport(cursorCookie, force = false, options = {}) {
    const cursorEnabled = options.cursorEnabled !== false;
    const effectiveCursorCookie = cursorEnabled ? cursorCookie : null;
    if (effectiveCursorCookie !== this.stateCookie || cursorEnabled !== this.stateCursorEnabled) {
      this.stateCookie = effectiveCursorCookie;
      this.stateCursorEnabled = cursorEnabled;
      this.cachedReport = null;
      this.inFlightReport = null;
      this.resilience.cursor = emptyProviderResilience();
    }
    if (this.inFlightReport) return this.inFlightReport;
    const now = this.readNow();
    if (!force && this.cachedReport && now - this.cachedReport.fetchedAt < this.cacheTtlMs()) {
      return this.cachedReport;
    }
    const promise = (async () => {
      const tasks = [
        ["claude", () => this.deps.providers.claude(force)],
        ["codex", () => this.deps.providers.codex(force)]
      ];
      if (cursorEnabled) {
        tasks.push([
          "cursor",
          () => this.deps.providers.cursor(effectiveCursorCookie)
        ]);
      }
      const providers2 = await Promise.all(
        tasks.map(
          ([provider, fn]) => this.fetchWithBackoff(provider, fn).catch(
            (err) => createUsageErrorSnapshot(
              provider,
              "error",
              err instanceof Error ? err.message : String(err)
            )
          )
        )
      );
      const report = { providers: providers2, fetchedAt: this.readNow() };
      if (effectiveCursorCookie === this.stateCookie && cursorEnabled === this.stateCursorEnabled) {
        this.deps.trackSetupTelemetry?.(report, force);
        this.cachedReport = report;
      }
      return report;
    })();
    this.inFlightReport = promise;
    try {
      return await promise;
    } finally {
      if (this.inFlightReport === promise) this.inFlightReport = null;
    }
  }
  reset() {
    this.cachedReport = null;
    this.inFlightReport = null;
    this.stateCookie = null;
    this.stateCursorEnabled = true;
    this.resilience.claude = emptyProviderResilience();
    this.resilience.codex = emptyProviderResilience();
    this.resilience.cursor = emptyProviderResilience();
  }
  async fetchWithBackoff(provider, fn) {
    const state = this.resilience[provider];
    if (this.readNow() < state.blockedUntil) return this.rateLimitedSnapshot(provider, state);
    try {
      const snapshot2 = await fn();
      if (snapshot2.status === "ok") {
        state.lastGood = snapshot2;
        state.lastGoodAt = this.readNow();
        state.blockedUntil = 0;
        state.backoffMs = 0;
      }
      return snapshot2;
    } catch (err) {
      if (err instanceof UsageRateLimitError) {
        state.backoffMs = Math.min(
          Math.max(state.backoffMs * 2, this.rateLimitMinBackoffMs()),
          this.rateLimitMaxBackoffMs()
        );
        state.blockedUntil = this.readNow() + Math.max(err.retryAfterMs ?? 0, state.backoffMs);
        return this.rateLimitedSnapshot(provider, state);
      }
      throw err;
    }
  }
  rateLimitedSnapshot(provider, state) {
    if (state.lastGood) {
      return {
        ...state.lastGood,
        detail: `Rate limited; showing usage from ${this.formatClock()(state.lastGoodAt)}.`
      };
    }
    return createUsageErrorSnapshot(
      provider,
      "error",
      `Rate limited (HTTP 429). Retrying after ${this.formatClock()(state.blockedUntil)}.`
    );
  }
  readNow() {
    return this.deps.now?.() ?? Date.now();
  }
  cacheTtlMs() {
    return this.deps.cacheTtlMs ?? DEFAULT_REPORT_CACHE_TTL_MS;
  }
  rateLimitMinBackoffMs() {
    return this.deps.rateLimitMinBackoffMs ?? DEFAULT_RATE_LIMIT_MIN_BACKOFF_MS;
  }
  rateLimitMaxBackoffMs() {
    return this.deps.rateLimitMaxBackoffMs ?? DEFAULT_RATE_LIMIT_MAX_BACKOFF_MS$1;
  }
  formatClock() {
    return this.deps.formatClock ?? defaultFormatClock;
  }
}
function unwrapProviderUsageSnapshotProjection(projection) {
  if (projection.kind === "rate-limited") throw new UsageRateLimitError(projection.retryAfterMs);
  return projection.snapshot;
}
function projectClaudeUsageSnapshot(input) {
  if (input.credentialStatus === "unreadable") {
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot("claude", "error", input.detail, "claude-keychain-access")
    };
  }
  if (input.credentialStatus === "absent") {
    const { cliInstalled } = input;
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "claude",
        "unauthenticated",
        cliInstalled ? "No Claude Code credentials found. Sign in with the claude CLI first." : "Claude Code is not installed. Install it, then sign in to show usage.",
        cliInstalled ? "terminal-login" : "terminal-install"
      )
    };
  }
  if (input.credentialStatus === "expired") {
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "claude",
        "unauthenticated",
        "Claude Code OAuth token is expired. Run `claude` to refresh it, then try again.",
        "terminal-login"
      )
    };
  }
  const { creds, usage } = input;
  if (usage.status === 429) {
    return { kind: "rate-limited", retryAfterMs: usage.retryAfterMs };
  }
  if (!usage.ok) {
    const status = usage.status === 401 || usage.status === 403 ? "unauthenticated" : "error";
    const cta = status === "unauthenticated" ? "terminal-login" : null;
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "claude",
        status,
        `Claude usage API returned HTTP ${usage.status}.`,
        cta
      )
    };
  }
  const { windows, costUsd } = parseClaudeUsage(usage.json);
  return {
    kind: "snapshot",
    snapshot: {
      provider: "claude",
      status: "ok",
      account: null,
      plan: creds.subscriptionType,
      windows,
      costUsd,
      detail: windows.length === 0 ? "Connected, but no usage windows in the response." : null,
      cta: null
    }
  };
}
function projectCodexUsageSnapshot(input) {
  if (!input.hasCredentials) {
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "codex",
        "unauthenticated",
        "No Codex credentials found. Sign in with the codex CLI first.",
        "terminal-login"
      )
    };
  }
  const { creds, usage } = input;
  if (usage.status === 429) {
    return { kind: "rate-limited", retryAfterMs: usage.retryAfterMs };
  }
  if (!usage.ok) {
    const status = usage.status === 401 || usage.status === 403 ? "unauthenticated" : "error";
    const cta = status === "unauthenticated" ? "terminal-login" : null;
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "codex",
        status,
        status === "unauthenticated" ? `Codex token was rejected.${input.refreshFailure ? ` ${input.refreshFailure}` : " Run `codex login` again."}` : `Codex usage API returned HTTP ${usage.status}.`,
        cta
      )
    };
  }
  const { windows, plan } = parseCodexUsage(usage.json, input.now);
  return {
    kind: "snapshot",
    snapshot: {
      provider: "codex",
      status: "ok",
      account: creds.email,
      plan: plan ?? creds.plan,
      windows,
      costUsd: null,
      detail: windows.length === 0 ? "Connected, but no usage windows in the response." : null,
      cta: null
    }
  };
}
function projectCursorUsageSnapshot(input) {
  if (!input.hasCookie) {
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "cursor",
        "unauthenticated",
        "Paste your cursor.com session cookie (WorkosCursorSessionToken) to connect."
      )
    };
  }
  const { summary, me, legacy } = input;
  const limited = [summary, me, legacy].filter((res) => res.status === 429);
  if (limited.length > 0) {
    const retryAfter = Math.max(...limited.map((res) => res.retryAfterMs ?? 0));
    return { kind: "rate-limited", retryAfterMs: retryAfter > 0 ? retryAfter : null };
  }
  const authFailed = [summary, me].every((res) => res.status === 401 || res.status === 403);
  if (authFailed) {
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "cursor",
        "unauthenticated",
        "Cursor rejected the session cookie. Grab a fresh one from cursor.com and paste it again."
      )
    };
  }
  if (!summary.ok && !me.ok && !legacy.ok) {
    return {
      kind: "snapshot",
      snapshot: createUsageErrorSnapshot(
        "cursor",
        "error",
        `Cursor API returned HTTP ${summary.status}.`
      )
    };
  }
  const { windows, plan, account, costUsd } = parseCursorUsage(
    { summary: summary.json, legacy: legacy.json, me: me.json },
    input.now
  );
  return {
    kind: "snapshot",
    snapshot: {
      provider: "cursor",
      status: "ok",
      account,
      plan,
      windows,
      costUsd,
      detail: windows.length === 0 ? "Connected, but no usage windows in the response." : null,
      cta: null
    }
  };
}
function isUsageAuthRejectionStatus(status) {
  return status === 401 || status === 403;
}
function shouldRetryClaudeUsageAfterAuthRejection(input) {
  return isUsageAuthRejectionStatus(input.status) && input.refreshedCredentials != null && input.refreshedCredentials.accessToken !== input.currentAccessToken;
}
function shouldClearClaudeCredentialCacheAfterUsageSnapshot(input) {
  return input.snapshot.provider === "claude" && input.snapshot.status === "unauthenticated" && isUsageAuthRejectionStatus(input.usageStatus);
}
function shouldRetryCodexUsageAfterAuthRejection(input) {
  return isUsageAuthRejectionStatus(input.status) && Boolean(input.credentials.refreshToken) && true;
}
const DEFAULT_CODEX_REFRESH_AFTER_MS = 8 * 24 * 60 * 6e4;
const CLAUDE_CREDENTIAL_MEMORY_TTL_MS = 30 * 6e4;
const CLAUDE_SHELL_BIN_MARKER = "__BLUME_CLAUDE_BIN__";
function asFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function claudeOAuthErrorCode(body) {
  const root = asRecord(body);
  const nested = asRecord(root?.error);
  return asString$1(root?.error) ?? asString$1(nested?.code) ?? asString$1(root?.code);
}
function refreshedClaudeCredentials(current, body, now = Date.now()) {
  const json = asRecord(body);
  if (!json) return null;
  const accessToken = asString$1(json.access_token) ?? asString$1(json.accessToken);
  if (!accessToken) return null;
  const expiresInSeconds = asFiniteNumber(json.expires_in ?? json.expiresIn);
  return {
    accessToken,
    refreshToken: asString$1(json.refresh_token) ?? asString$1(json.refreshToken) ?? current.refreshToken,
    expiresAt: expiresInSeconds !== null ? now + expiresInSeconds * 1e3 : current.expiresAt,
    scopes: current.scopes,
    rateLimitTier: current.rateLimitTier,
    subscriptionType: current.subscriptionType
  };
}
function planClaudeDirectRefresh(input) {
  if (!input.current.refreshToken) return { kind: "skip", reason: "missing-refresh-token" };
  const now = input.now ?? Date.now();
  if (input.force !== true && now < input.blockedUntil) return { kind: "skip", reason: "blocked" };
  return { kind: "refresh", refreshToken: input.current.refreshToken, refreshedAt: now };
}
function projectClaudeDirectRefreshResponse(input) {
  const now = input.now ?? Date.now();
  if (!input.response.ok) {
    const code = claudeOAuthErrorCode(input.response.json)?.toLowerCase();
    if ((input.response.status === 400 || input.response.status === 401) && code === "invalid_grant") {
      return { kind: "clear-cache", result: null };
    }
    return { kind: "backoff", result: null, blockedUntil: now + input.rateLimitMaxBackoffMs };
  }
  const refreshedAt = input.refreshedAt ?? now;
  const creds = refreshedClaudeCredentials(input.current, input.response.json, refreshedAt);
  if (!creds) {
    return { kind: "backoff", result: null, blockedUntil: now + input.rateLimitMaxBackoffMs };
  }
  return {
    kind: "refreshed",
    result: { kind: "found", creds, owner: "blume", source: "memory-cache" },
    blockedUntil: 0,
    rememberedAt: refreshedAt
  };
}
function isClaudeCredentialUsable(creds, now = Date.now()) {
  return creds.expiresAt === null || creds.expiresAt > now;
}
function defaultClaudeCredentialOwner(owner) {
  return owner === "blume" ? "blume" : "claude-cli";
}
function isClaudeCredentialCacheEntryUsable(input) {
  const now = input.now ?? Date.now();
  if (input.enforceMemoryTtl === true && typeof input.storedAt === "number" && now - input.storedAt > (input.memoryTtlMs ?? CLAUDE_CREDENTIAL_MEMORY_TTL_MS)) {
    return false;
  }
  const owner = defaultClaudeCredentialOwner(input.owner);
  return isClaudeCredentialUsable(input.creds, now) || owner === "blume";
}
function projectClaudeCredentialCacheEntry(input) {
  const entry = asRecord(input.entry);
  if (!entry) return null;
  const creds = parseClaudeCredentials(entry.creds);
  if (!creds) return null;
  const owner = defaultClaudeCredentialOwner(entry.owner);
  const storedAt = asFiniteNumber(entry.storedAt);
  if (!isClaudeCredentialCacheEntryUsable({
    creds,
    owner,
    storedAt,
    now: input.now,
    enforceMemoryTtl: input.enforceMemoryTtl,
    memoryTtlMs: input.memoryTtlMs
  })) {
    return null;
  }
  return { creds, owner, storedAt };
}
function parseShellResolvedClaudeBin(output) {
  const line = output.split(/\r?\n/).find((candidate) => candidate.startsWith(CLAUDE_SHELL_BIN_MARKER));
  if (!line) return null;
  const bin = line.slice(CLAUDE_SHELL_BIN_MARKER.length).trim();
  return bin.length > 0 ? bin : null;
}
function claudeBinCandidates(input) {
  return [
    input.shellResolved,
    input.envBlumeClaudeBin,
    input.envClaudeBin,
    ...input.homeBinCandidates ?? [],
    "/opt/homebrew/bin/claude",
    "/usr/local/bin/claude",
    "claude"
  ].filter((candidate, index2, all) => {
    return typeof candidate === "string" && candidate.length > 0 && all.indexOf(candidate) === index2;
  });
}
function parseClaudeCliAuthStatus(raw) {
  const text = raw instanceof Uint8Array ? new TextDecoder().decode(raw) : typeof raw === "string" ? raw : "";
  if (!text.trim()) return "unknown";
  try {
    const parsed = asRecord(JSON.parse(text));
    if (parsed?.loggedIn === true) return "logged-in";
    if (parsed?.loggedIn === false) return "logged-out";
  } catch {
    return "unknown";
  }
  return "unknown";
}
async function readClaudeCliAuthStatusFromCandidates(input) {
  for (const candidate of await input.candidates()) {
    const result = await input.probe(candidate);
    const parsed = parseClaudeCliAuthStatus(result.stdout);
    if (parsed !== "unknown") return parsed;
    if (result.kind === "error" && result.code === "ENOENT") continue;
    if (result.kind === "error") return "unknown";
  }
  return "unknown";
}
function projectClaudeKeychainReadError(input) {
  if (input.code === 44) return { kind: "absent" };
  if (input.cliStatus === "logged-out") return { kind: "absent" };
  return {
    kind: "unreadable",
    detail: input.timedOut ? "Claude Code credentials could not be read from macOS Keychain before the request timed out. Grant Blume access in Keychain Access, then refresh." : "Claude Code credentials could not be read from macOS Keychain. Grant Blume access in Keychain Access, then refresh."
  };
}
function projectClaudeKeychainCredentialResult(raw) {
  if (raw.kind === "absent") return null;
  if (raw.kind === "unreadable") return raw;
  let parsed;
  try {
    parsed = JSON.parse(raw.raw);
  } catch {
    return null;
  }
  const creds = parseClaudeCredentials(parsed);
  if (creds) return { kind: "found", creds, owner: "claude-cli", source: "keychain" };
  return null;
}
function shouldRefreshCodexCredentials(creds, now = Date.now(), refreshAfterMs = DEFAULT_CODEX_REFRESH_AFTER_MS) {
  if (!creds?.refreshToken) return false;
  if (creds.lastRefreshAt === null) return true;
  return now - creds.lastRefreshAt > refreshAfterMs;
}
function codexRefreshSuppressedMessage(blockedUntilFormatted) {
  return `Codex token refresh is temporarily suppressed until ${blockedUntilFormatted}.`;
}
function planCodexOAuthRefresh(input) {
  if (!input.current.refreshToken) {
    return { kind: "error", message: "Codex credentials do not include a refresh token." };
  }
  const now = input.now ?? Date.now();
  if (input.force !== true && now < input.blockedUntil) {
    return {
      kind: "error",
      message: codexRefreshSuppressedMessage(
        input.blockedUntilFormatted ?? String(input.blockedUntil)
      )
    };
  }
  return { kind: "refresh", refreshToken: input.current.refreshToken };
}
function writableCodexAuthJson(authJson) {
  const root = asRecord(authJson);
  const tokens = asRecord(root?.tokens);
  if (!root || !tokens) throw new Error("Codex auth file is not writable JSON.");
  return { root, tokens };
}
function assertWritableCodexAuthJson(authJson) {
  writableCodexAuthJson(authJson);
}
function applyCodexOAuthRefreshResponse(input) {
  const { root, tokens } = writableCodexAuthJson(input.authJson);
  const body = asRecord(input.responseJson);
  if (!body) throw new Error("Codex OAuth refresh returned invalid JSON.");
  tokens.access_token = asString$1(body.access_token) ?? input.current.accessToken;
  tokens.refresh_token = asString$1(body.refresh_token) ?? input.current.refreshToken;
  const idToken = asString$1(body.id_token) ?? input.current.idToken;
  if (idToken) tokens.id_token = idToken;
  root.last_refresh = new Date(input.refreshedAt ?? Date.now()).toISOString();
  return root;
}
function codexRefreshErrorMessage(status, body) {
  const root = asRecord(body);
  const nested = asRecord(root?.error);
  const code = asString$1(nested?.code) ?? asString$1(root?.error) ?? asString$1(root?.code);
  if (!code) return `Codex OAuth refresh returned HTTP ${status}.`;
  switch (code.toLowerCase()) {
    case "refresh_token_expired":
      return "Codex refresh token expired. Run `codex login` again.";
    case "refresh_token_reused":
      return "Codex refresh token was already used. Run `codex login` again.";
    case "invalid_grant":
    case "refresh_token_invalidated":
      return "Codex refresh token was revoked. Run `codex login` again.";
    default:
      return `Codex OAuth refresh returned ${code}.`;
  }
}
function projectCodexOAuthRefreshResponse(input) {
  const now = input.now ?? Date.now();
  if (!input.response.ok) {
    return {
      kind: "backoff",
      message: codexRefreshErrorMessage(input.response.status, input.response.json),
      blockedUntil: now + input.rateLimitMaxBackoffMs
    };
  }
  let authJson;
  try {
    authJson = applyCodexOAuthRefreshResponse({
      authJson: input.authJson,
      current: input.current,
      responseJson: input.response.json,
      refreshedAt: now
    });
  } catch (err) {
    return {
      kind: "backoff",
      message: err instanceof Error ? err.message : String(err),
      blockedUntil: now + input.rateLimitMaxBackoffMs
    };
  }
  const credentials = parseCodexAuth(authJson);
  if (!credentials?.accessToken) {
    return {
      kind: "backoff",
      message: "Codex refresh response did not include an access token.",
      blockedUntil: now + input.rateLimitMaxBackoffMs
    };
  }
  return { kind: "refreshed", authJson, credentials, blockedUntil: 0 };
}
const CLAUDE_USAGE_ENDPOINT = "https://api.anthropic.com/api/oauth/usage";
const CLAUDE_OAUTH_TOKEN_URL = "https://platform.claude.com/v1/oauth/token";
const CLAUDE_OAUTH_CLIENT_ID = "9d1c250a-e61b-44d9-88ed-5944d1962f5e";
const CODEX_USAGE_ENDPOINT = "https://chatgpt.com/backend-api/wham/usage";
const CODEX_OAUTH_TOKEN_URL = "https://auth.openai.com/oauth/token";
const CODEX_OAUTH_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
const CURSOR_USAGE_SUMMARY_ENDPOINT = "https://cursor.com/api/usage-summary";
const CURSOR_AUTH_ME_ENDPOINT = "https://cursor.com/api/auth/me";
const CURSOR_LEGACY_USAGE_ENDPOINT = "https://cursor.com/api/usage";
function claudeUsageRequestConfig(creds) {
  return {
    url: CLAUDE_USAGE_ENDPOINT,
    init: {
      headers: {
        Authorization: `Bearer ${creds.accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "anthropic-beta": "oauth-2025-04-20"
      }
    }
  };
}
function claudeOAuthRefreshRequestConfig(refreshToken) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CLAUDE_OAUTH_CLIENT_ID
  });
  return {
    url: CLAUDE_OAUTH_TOKEN_URL,
    init: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: body.toString()
    }
  };
}
function codexUsageRequestConfig(creds) {
  const headers = { Authorization: `Bearer ${creds.accessToken}` };
  if (creds.accountId) headers["chatgpt-account-id"] = creds.accountId;
  return {
    url: CODEX_USAGE_ENDPOINT,
    init: { headers }
  };
}
function codexOAuthRefreshRequestConfig(refreshToken) {
  return {
    url: CODEX_OAUTH_TOKEN_URL,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CODEX_OAUTH_CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        scope: "openid profile email"
      })
    }
  };
}
function cursorUsageRequestConfigs(normalizedCookie) {
  const init = { headers: { Cookie: normalizedCookie } };
  return {
    summary: { url: CURSOR_USAGE_SUMMARY_ENDPOINT, init },
    me: { url: CURSOR_AUTH_ME_ENDPOINT, init },
    legacy: { url: CURSOR_LEGACY_USAGE_ENDPOINT, init }
  };
}
function planCursorUsageRequests(rawCookie) {
  const cookie = rawCookie ? normalizeCursorCookie(rawCookie) : null;
  if (!cookie) {
    return {
      kind: "snapshot",
      projection: projectCursorUsageSnapshot({ hasCookie: false })
    };
  }
  return {
    kind: "requests",
    requests: cursorUsageRequestConfigs(cookie)
  };
}
async function fetchClaudeUsageSnapshotFlow(input) {
  const force = input.force === true;
  const now = input.deps.now ?? Date.now;
  const result = await input.deps.readCredentials(force);
  if (result.kind === "unreadable") {
    return unwrapProviderUsageSnapshotProjection(
      projectClaudeUsageSnapshot({
        credentialStatus: "unreadable",
        detail: result.detail
      })
    );
  }
  if (result.kind === "absent") {
    return unwrapProviderUsageSnapshotProjection(
      projectClaudeUsageSnapshot({
        credentialStatus: "absent",
        cliInstalled: result.cliInstalled
      })
    );
  }
  let record = result;
  let creds = record.creds;
  if (creds.expiresAt !== null && creds.expiresAt < now()) {
    const refreshed = await input.deps.refreshCredentials(record, force);
    if (refreshed?.kind === "found") {
      record = refreshed;
      creds = refreshed.creds;
    } else {
      return unwrapProviderUsageSnapshotProjection(
        projectClaudeUsageSnapshot({ credentialStatus: "expired" })
      );
    }
  }
  let usage = await input.deps.fetchUsage(creds);
  let projection = projectClaudeUsageSnapshot({
    credentialStatus: "found",
    creds,
    usage
  });
  unwrapProviderUsageSnapshotProjection(projection);
  if (isUsageAuthRejectionStatus(usage.status)) {
    const refreshed = await input.deps.refreshCredentials(record, force);
    if (refreshed?.kind === "found" && shouldRetryClaudeUsageAfterAuthRejection({
      status: usage.status,
      currentAccessToken: creds.accessToken,
      refreshedCredentials: refreshed.creds
    })) {
      record = refreshed;
      creds = refreshed.creds;
      usage = await input.deps.fetchUsage(creds);
      projection = projectClaudeUsageSnapshot({
        credentialStatus: "found",
        creds,
        usage
      });
      unwrapProviderUsageSnapshotProjection(projection);
    }
  }
  projection = projectClaudeUsageSnapshot({
    credentialStatus: "found",
    creds,
    usage
  });
  const snapshot2 = unwrapProviderUsageSnapshotProjection(projection);
  if (shouldClearClaudeCredentialCacheAfterUsageSnapshot({
    snapshot: snapshot2,
    usageStatus: usage.status
  })) {
    input.deps.clearCredentialCache();
  }
  return snapshot2;
}
function planCodexUsageFetchFlow(input) {
  if (!input.credentials) {
    return {
      kind: "snapshot",
      projection: projectCodexUsageSnapshot({ hasCredentials: false })
    };
  }
  return {
    kind: "fetch",
    credentials: input.credentials,
    refreshBeforeUsage: shouldRefreshCodexCredentials(input.credentials, input.now) && (input.force || input.now >= input.refreshBlockedUntil)
  };
}
function projectCodexUsageFetchFlowResult(input) {
  const projection = projectCodexUsageSnapshot({
    hasCredentials: true,
    creds: input.credentials,
    usage: input.usage,
    refreshFailure: input.refreshFailure,
    now: input.now
  });
  if (input.allowAuthRetry && shouldRetryCodexUsageAfterAuthRejection({
    status: input.usage.status,
    credentials: input.credentials
  })) {
    return { kind: "retry-refresh", projection };
  }
  return { kind: "snapshot", projection };
}
function formatUsageFlowError(err) {
  return err instanceof Error ? err.message : String(err);
}
async function fetchCodexUsageSnapshotFlow(input) {
  const force = input.force === true;
  const now = input.deps.now ?? Date.now;
  const credentials = await input.deps.readCredentials();
  const plan = planCodexUsageFetchFlow({
    credentials,
    force,
    now: now(),
    refreshBlockedUntil: input.refreshBlockedUntil
  });
  if (plan.kind === "snapshot") {
    return unwrapProviderUsageSnapshotProjection(plan.projection);
  }
  let creds = plan.credentials;
  let refreshFailure = null;
  let refreshedBeforeUsage = false;
  if (plan.refreshBeforeUsage) {
    try {
      creds = await input.deps.refreshCredentials(creds, force);
      refreshedBeforeUsage = true;
    } catch (err) {
      refreshFailure = formatUsageFlowError(err);
    }
  }
  let usage = await input.deps.fetchUsage(creds);
  let result = projectCodexUsageFetchFlowResult({
    credentials: creds,
    usage,
    refreshFailure,
    allowAuthRetry: !refreshedBeforeUsage,
    now: now()
  });
  unwrapProviderUsageSnapshotProjection(result.projection);
  if (result.kind === "retry-refresh") {
    try {
      creds = await input.deps.refreshCredentials(creds, force);
      usage = await input.deps.fetchUsage(creds);
      result = projectCodexUsageFetchFlowResult({
        credentials: creds,
        usage,
        refreshFailure: null,
        allowAuthRetry: false,
        now: now()
      });
      unwrapProviderUsageSnapshotProjection(result.projection);
      refreshFailure = null;
    } catch (err) {
      if (err instanceof UsageRateLimitError) throw err;
      refreshFailure = formatUsageFlowError(err);
      result = projectCodexUsageFetchFlowResult({
        credentials: creds,
        usage,
        refreshFailure,
        allowAuthRetry: false,
        now: now()
      });
    }
  }
  return unwrapProviderUsageSnapshotProjection(result.projection);
}
async function fetchCursorUsageSnapshotFlow(input) {
  const now = input.deps.now ?? Date.now;
  const plan = planCursorUsageRequests(input.rawCookie);
  if (plan.kind === "snapshot") {
    return unwrapProviderUsageSnapshotProjection(plan.projection);
  }
  const [summary, me, legacy] = await Promise.all([
    input.deps.fetchUsage(plan.requests.summary),
    input.deps.fetchUsage(plan.requests.me),
    input.deps.fetchUsage(plan.requests.legacy)
  ]);
  return unwrapProviderUsageSnapshotProjection(
    projectCursorUsageSnapshot({
      hasCookie: true,
      summary,
      me,
      legacy,
      now: now()
    })
  );
}
const TERMINAL_LOGIN_COMMANDS = {
  claude: "claude auth login",
  codex: "codex login"
};
function unsupportedProviderLoginDetail(provider) {
  return `No terminal sign-in flow for provider: ${provider}`;
}
function terminalLoginCommandForProvider(provider) {
  return TERMINAL_LOGIN_COMMANDS[provider] ?? null;
}
function projectProviderLoginLaunch(provider) {
  const command = terminalLoginCommandForProvider(provider);
  if (!command) {
    return {
      status: "unsupported",
      detail: unsupportedProviderLoginDetail(provider)
    };
  }
  return { status: "ready", kind: "terminal", harnessId: provider, command };
}
function projectKeychainAccessLaunch(platform) {
  if (platform !== "darwin") {
    return {
      status: "unsupported",
      detail: "Keychain Access is only available on macOS"
    };
  }
  return {
    status: "ready",
    command: "open",
    args: ["-b", "com.apple.keychainaccess"]
  };
}
const SETTING_PREFIX = "usage.setupTelemetry.";
const EVENT_VERSION = 1;
function emptyState() {
  return {
    firstState: null,
    lastState: null,
    seenStates: [],
    firstObservedAt: null,
    lastObservedAt: null,
    successCapturedAt: null,
    successPath: null
  };
}
function stateSettingKey(provider) {
  return `${SETTING_PREFIX}${provider}`;
}
function normalizeState(value) {
  return value === "usage" || value === "login" || value === "keychain_issue" || value === "error" ? value : null;
}
function normalizePath(value) {
  return value === "immediate" || value === "login_then_usage" || value === "keychain_then_usage" || value === "other_then_usage" ? value : null;
}
function parseUsageSetupTelemetryState(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return {
      firstState: normalizeState(parsed.firstState),
      lastState: normalizeState(parsed.lastState),
      seenStates: Array.isArray(parsed.seenStates) ? parsed.seenStates.filter((state) => {
        return normalizeState(state) !== null;
      }) : [],
      firstObservedAt: typeof parsed.firstObservedAt === "number" && Number.isFinite(parsed.firstObservedAt) ? parsed.firstObservedAt : null,
      lastObservedAt: typeof parsed.lastObservedAt === "number" && Number.isFinite(parsed.lastObservedAt) ? parsed.lastObservedAt : null,
      successCapturedAt: typeof parsed.successCapturedAt === "number" && Number.isFinite(parsed.successCapturedAt) ? parsed.successCapturedAt : null,
      successPath: normalizePath(parsed.successPath)
    };
  } catch {
    return null;
  }
}
function observedState(snapshot2) {
  if (snapshot2.status === "ok") return "usage";
  if (snapshot2.cta === "claude-keychain-access") return "keychain_issue";
  if (snapshot2.status === "unauthenticated") return "login";
  return "error";
}
function successPath(seenStates) {
  const priorStates = seenStates.filter((state) => state !== "usage");
  if (priorStates.length === 0) return "immediate";
  if (priorStates.includes("keychain_issue")) return "keychain_then_usage";
  if (priorStates.includes("login")) return "login_then_usage";
  return "other_then_usage";
}
class UsageSetupTelemetryTracker {
  constructor(deps) {
    this.memoryState = /* @__PURE__ */ new Map();
    this.deps = deps;
  }
  track(report, force) {
    const now = this.deps.now?.() ?? Date.now();
    for (const snapshot2 of report.providers) {
      this.trackSnapshot(snapshot2, force, now);
    }
  }
  resetForTests() {
    this.memoryState.clear();
  }
  readState(provider) {
    const inMemory = this.memoryState.get(provider);
    if (inMemory) return inMemory;
    try {
      const stored = parseUsageSetupTelemetryState(this.deps.store?.get(stateSettingKey(provider)) ?? null);
      if (stored) {
        this.memoryState.set(provider, stored);
        return stored;
      }
    } catch {
    }
    const next = emptyState();
    this.memoryState.set(provider, next);
    return next;
  }
  writeState(provider, state) {
    this.memoryState.set(provider, state);
    try {
      this.deps.store?.set(stateSettingKey(provider), JSON.stringify(state));
    } catch {
    }
  }
  captureUsageSetupEvent(event, properties) {
    Promise.resolve(this.deps.capture(event, properties)).catch(() => void 0);
  }
  baseProperties(snapshot2, state, setupState, force) {
    const seenStates = state.seenStates;
    return {
      event_version: EVENT_VERSION,
      harness: snapshot2.provider,
      provider: snapshot2.provider,
      os_platform: this.deps.platform(),
      os_arch: this.deps.arch(),
      setup_state: setupState,
      provider_status: snapshot2.status,
      provider_cta: snapshot2.cta,
      first_observed_state: state.firstState,
      previous_observed_state: state.lastState,
      seen_login_state: seenStates.includes("login"),
      seen_keychain_issue_state: seenStates.includes("keychain_issue"),
      seen_error_state: seenStates.includes("error"),
      seen_state_count: seenStates.length,
      usage_window_count: snapshot2.windows.length,
      has_usage_windows: snapshot2.windows.length > 0,
      plan: snapshot2.plan,
      force_fetch: force
    };
  }
  trackSnapshot(snapshot2, force, now) {
    const state = this.readState(snapshot2.provider);
    const setupState = observedState(snapshot2);
    const stateChanged = state.lastState !== setupState;
    if (!state.firstState) {
      state.firstState = setupState;
      state.firstObservedAt = now;
    }
    if (!state.seenStates.includes(setupState)) state.seenStates.push(setupState);
    const properties = this.baseProperties(snapshot2, state, setupState, force);
    if (stateChanged) {
      this.captureUsageSetupEvent("usage_provider_setup_state_observed", {
        ...properties,
        first_state_for_harness: state.lastState === null
      });
    }
    state.lastState = setupState;
    state.lastObservedAt = now;
    if (setupState === "usage" && state.successCapturedAt === null) {
      const path = successPath(state.seenStates);
      state.successCapturedAt = now;
      state.successPath = path;
      this.captureUsageSetupEvent("usage_provider_setup_succeeded", {
        ...properties,
        setup_path: path,
        first_observed_at: state.firstObservedAt,
        success_elapsed_ms: state.firstObservedAt === null ? null : now - state.firstObservedAt
      });
    }
    this.writeState(snapshot2.provider, state);
  }
}
const DEFAULT_RATE_LIMIT_MAX_BACKOFF_MS = 15 * 6e4;
const DEFAULT_PROVIDER_FETCH_TIMEOUT_MS = 1e4;
function createDefaultProviderUsageRuntimeFetchJson(options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_PROVIDER_FETCH_TIMEOUT_MS;
  const now = options.now ?? Date.now;
  const fetchImpl = options.fetch ?? fetch;
  return async function defaultProviderUsageRuntimeFetchJson(request2) {
    const controller = new AbortController();
    const timer2 = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetchImpl(request2.url, { ...request2.init, signal: controller.signal });
      let json = null;
      try {
        json = await res.json();
      } catch {
      }
      return {
        ok: res.ok,
        status: res.status,
        json,
        retryAfterMs: parseRetryAfterMs(res.headers.get("retry-after"), now())
      };
    } finally {
      clearTimeout(timer2);
    }
  };
}
function createProviderUsageRuntimeService(deps) {
  const now = deps.now ?? Date.now;
  const fetchJson = deps.fetchJson;
  const rateLimitMaxBackoffMs = deps.rateLimitMaxBackoffMs ?? DEFAULT_RATE_LIMIT_MAX_BACKOFF_MS;
  let claudeCredentialMemoryCache = null;
  let claudeUsageInFlight = null;
  let claudeDirectRefreshBlockedUntil = 0;
  let codexRefreshBlockedUntil = 0;
  function rememberClaudeCredentials(creds, owner, storedAt = now()) {
    claudeCredentialMemoryCache = { creds, owner, storedAt };
    if (!isClaudeCredentialUsable(creds, storedAt)) return;
    try {
      deps.claude.writeSecureCredentialCache(JSON.stringify({ creds, owner, storedAt }));
    } catch {
    }
  }
  function clearClaudeCredentialCache() {
    claudeCredentialMemoryCache = null;
    claudeDirectRefreshBlockedUntil = 0;
    try {
      deps.claude.clearSecureCredentialCache();
    } catch {
    }
  }
  function readClaudeCredentialsFromMemory(readAt = now()) {
    if (!claudeCredentialMemoryCache) return null;
    const projected = projectClaudeCredentialCacheEntry({
      entry: claudeCredentialMemoryCache,
      now: readAt,
      enforceMemoryTtl: true,
      memoryTtlMs: CLAUDE_CREDENTIAL_MEMORY_TTL_MS
    });
    if (!projected) return null;
    return {
      creds: projected.creds,
      owner: projected.owner,
      source: "memory-cache"
    };
  }
  function readClaudeCredentialsFromSecureCache(readAt = now()) {
    const raw = deps.claude.readSecureCredentialCache();
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      const projected = projectClaudeCredentialCacheEntry({ entry: parsed, now: readAt });
      if (!projected) {
        clearClaudeCredentialCache();
        return null;
      }
      claudeCredentialMemoryCache = {
        creds: projected.creds,
        owner: projected.owner,
        storedAt: projected.storedAt ?? readAt
      };
      return { creds: projected.creds, owner: projected.owner, source: "secure-cache" };
    } catch {
      clearClaudeCredentialCache();
      return null;
    }
  }
  async function readClaudeKeychainRaw() {
    const raw = await deps.claude.readKeychainPassword();
    if (raw.kind === "found") return raw;
    const cliStatus = raw.code === 44 ? "unknown" : await readClaudeCliAuthStatusFromCandidates({
      candidates: deps.claude.cliAuthStatusCandidates,
      probe: deps.claude.probeCliAuthStatus
    });
    return projectClaudeKeychainReadError({
      code: raw.code,
      cliStatus,
      timedOut: raw.timedOut
    });
  }
  async function readClaudeKeychainCredentials() {
    const raw = await readClaudeKeychainRaw();
    return projectClaudeKeychainCredentialResult(raw);
  }
  async function readClaudeCredentials(force = false) {
    let expiredCredential = null;
    const readAt = now();
    const fromFile = parseClaudeCredentials(await deps.claude.readCredentialsFile());
    if (fromFile) {
      if (isClaudeCredentialUsable(fromFile, readAt)) {
        rememberClaudeCredentials(fromFile, "claude-cli", readAt);
        return { kind: "found", creds: fromFile, owner: "claude-cli", source: "credentials-file" };
      }
      expiredCredential = {
        kind: "found",
        creds: fromFile,
        owner: "claude-cli",
        source: "credentials-file"
      };
    }
    if (!force) {
      const fromMemory = readClaudeCredentialsFromMemory(readAt);
      if (fromMemory) return { kind: "found", ...fromMemory };
      const fromSecureCache = readClaudeCredentialsFromSecureCache(readAt);
      if (fromSecureCache) return { kind: "found", ...fromSecureCache };
    }
    if (deps.claude.isKeychainAvailable()) {
      const fromKeychain = await readClaudeKeychainCredentials();
      if (fromKeychain?.kind === "found") {
        rememberClaudeCredentials(fromKeychain.creds, fromKeychain.owner, readAt);
        return fromKeychain;
      }
      if (fromKeychain?.kind === "unreadable") {
        const fromSecureCache = readClaudeCredentialsFromSecureCache(readAt);
        if (fromSecureCache) return { kind: "found", ...fromSecureCache };
        return fromKeychain;
      }
    }
    const candidates = await deps.claude.cliAuthStatusCandidates();
    let cliInstalled = false;
    for (const candidate of candidates) {
      const result = await deps.claude.probeCliAuthStatus(candidate);
      if (result.kind === "error" && result.code === "ENOENT") continue;
      cliInstalled = true;
      break;
    }
    if (expiredCredential && cliInstalled) return expiredCredential;
    return { kind: "absent", cliInstalled };
  }
  async function refreshBlumeOwnedClaudeCredentials(record, force) {
    const plan = planClaudeDirectRefresh({
      current: record.creds,
      blockedUntil: claudeDirectRefreshBlockedUntil,
      force,
      now: now()
    });
    if (plan.kind === "skip") return null;
    const response = await fetchJson(claudeOAuthRefreshRequestConfig(plan.refreshToken));
    const projected = projectClaudeDirectRefreshResponse({
      current: record.creds,
      response,
      rateLimitMaxBackoffMs,
      refreshedAt: plan.refreshedAt,
      now: now()
    });
    if (projected.kind === "clear-cache") {
      clearClaudeCredentialCache();
      return null;
    }
    if (projected.kind === "backoff") {
      claudeDirectRefreshBlockedUntil = projected.blockedUntil;
      return null;
    }
    claudeDirectRefreshBlockedUntil = projected.blockedUntil;
    rememberClaudeCredentials(
      projected.result.creds,
      projected.result.owner,
      projected.rememberedAt
    );
    return projected.result;
  }
  async function refreshClaudeCredentials(record, force) {
    if (record.owner === "blume") return refreshBlumeOwnedClaudeCredentials(record, force);
    return null;
  }
  function fetchClaudeUsage(force = false) {
    const previous = claudeUsageInFlight;
    if (previous && (!force || previous.force)) return previous.promise;
    const promise = (previous ? previous.promise.catch(() => void 0).then(() => performClaudeUsageFetch(force)) : performClaudeUsageFetch(force)).finally(() => {
      if (claudeUsageInFlight?.promise === promise) claudeUsageInFlight = null;
    });
    claudeUsageInFlight = { force, promise };
    return promise;
  }
  async function performClaudeUsageFetch(force) {
    return fetchClaudeUsageSnapshotFlow({
      force,
      deps: {
        readCredentials: readClaudeCredentials,
        refreshCredentials: refreshClaudeCredentials,
        fetchUsage: (creds) => fetchJson(claudeUsageRequestConfig(creds)),
        clearCredentialCache: clearClaudeCredentialCache,
        now
      }
    });
  }
  async function refreshCodexCredentials(authJson, creds, force = false) {
    const plan = planCodexOAuthRefresh({
      current: creds,
      blockedUntil: codexRefreshBlockedUntil,
      force,
      now: now(),
      blockedUntilFormatted: formatClock(codexRefreshBlockedUntil)
    });
    if (plan.kind === "error") throw new Error(plan.message);
    assertWritableCodexAuthJson(authJson);
    const response = await fetchJson(codexOAuthRefreshRequestConfig(plan.refreshToken));
    const projected = projectCodexOAuthRefreshResponse({
      authJson,
      current: creds,
      response,
      rateLimitMaxBackoffMs,
      now: now()
    });
    if (projected.kind === "backoff") {
      codexRefreshBlockedUntil = projected.blockedUntil;
      throw new Error(projected.message);
    }
    await deps.codex.writeAuthJson(projected.authJson);
    codexRefreshBlockedUntil = projected.blockedUntil;
    return projected.credentials;
  }
  async function fetchCodexUsage(force = false) {
    const authJson = await deps.codex.readAuthJson();
    return fetchCodexUsageSnapshotFlow({
      force,
      refreshBlockedUntil: codexRefreshBlockedUntil,
      deps: {
        async readCredentials() {
          return parseCodexAuth(authJson);
        },
        async refreshCredentials(creds, refreshForce) {
          return refreshCodexCredentials(authJson, creds, refreshForce);
        },
        async fetchUsage(creds) {
          return fetchJson(codexUsageRequestConfig(creds));
        },
        now
      }
    });
  }
  async function fetchCursorUsage(rawCookie) {
    return fetchCursorUsageSnapshotFlow({
      rawCookie,
      deps: {
        fetchUsage(request2) {
          return fetchJson(request2);
        },
        now
      }
    });
  }
  const reportService = new UsageProviderReportService({
    providers: {
      claude: fetchClaudeUsage,
      codex: fetchCodexUsage,
      cursor: fetchCursorUsage
    },
    trackSetupTelemetry: deps.trackSetupTelemetry,
    rateLimitMaxBackoffMs,
    formatClock,
    now
  });
  function formatClock(ms) {
    return deps.formatClock?.(ms) ?? new Date(ms).toLocaleTimeString(void 0, {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  return {
    async fetchProviderUsageSnapshot(input) {
      switch (input.provider) {
        case "claude":
          return fetchClaudeUsage(input.force === true);
        case "codex":
          return fetchCodexUsage(input.force === true);
        case "cursor":
          return fetchCursorUsage(input.cursorCookie);
      }
    },
    fetchUsageReport(cursorCookie, force = false, options = {}) {
      return reportService.fetchUsageReport(cursorCookie, force, options);
    },
    reset() {
      claudeCredentialMemoryCache = null;
      claudeDirectRefreshBlockedUntil = 0;
      codexRefreshBlockedUntil = 0;
      reportService.reset();
    }
  };
}
const DEFAULT_CLAUDE_KEYCHAIN_READ_TIMEOUT_MS = 1500;
const DEFAULT_CLAUDE_AUTH_STATUS_TIMEOUT_MS = 2500;
const DEFAULT_PROVIDER_USAGE_FETCH_TIMEOUT_MS = 1e4;
const CLAUDE_KEYCHAIN_SERVICE = "Claude Code-credentials";
const PROVIDER_USAGE_CURSOR_COOKIE_SETTING_KEY = "usage.cursorSessionCookie";
const PROVIDER_USAGE_CLAUDE_CREDENTIAL_CACHE_SETTING_KEY = "usage.claudeCredentialsCache";
const PROVIDER_USAGE_SECRET_SETTING_KEYS = [
  PROVIDER_USAGE_CURSOR_COOKIE_SETTING_KEY,
  PROVIDER_USAGE_CLAUDE_CREDENTIAL_CACHE_SETTING_KEY
];
const MACOS_SECURITY_BIN = "/usr/bin/security";
function providerUsageHostPolicyOptions() {
  return {
    cursorCookieSettingKey: PROVIDER_USAGE_CURSOR_COOKIE_SETTING_KEY,
    claudeCredentialCacheSettingKey: PROVIDER_USAGE_CLAUDE_CREDENTIAL_CACHE_SETTING_KEY,
    claudeKeychainService: CLAUDE_KEYCHAIN_SERVICE
  };
}
function stdoutToString(stdout) {
  return typeof stdout === "string" ? stdout : stdout && typeof stdout.toString === "function" ? stdout.toString() : "";
}
async function readJsonFile(ports, path) {
  try {
    return JSON.parse(await ports.fs.readTextFile(path));
  } catch {
    return null;
  }
}
async function writeJsonFileAtomic(ports, path, value, now) {
  const tmp = ports.path.join(
    ports.path.dirname(path),
    `.${ports.process.pid()}.${now()}.auth.json.tmp`
  );
  await ports.fs.writeTextFile(tmp, `${JSON.stringify(value, null, 2)}
`);
  await ports.fs.rename(tmp, path);
}
function codexAuthPathFromHost(ports) {
  const codexHome = ports.env("CODEX_HOME") ?? ports.join(ports.homedir(), ".codex");
  return ports.join(codexHome, "auth.json");
}
function createProviderUsageHostService(options) {
  const { ports } = options;
  const now = options.now ?? Date.now;
  const claudeKeychainReadMs = options.timeouts?.claudeKeychainReadMs ?? DEFAULT_CLAUDE_KEYCHAIN_READ_TIMEOUT_MS;
  const claudeAuthStatusMs = options.timeouts?.claudeAuthStatusMs ?? DEFAULT_CLAUDE_AUTH_STATUS_TIMEOUT_MS;
  const providerFetchMs = options.timeouts?.providerFetchMs ?? DEFAULT_PROVIDER_USAGE_FETCH_TIMEOUT_MS;
  async function resolveClaudeBinFromUserShell() {
    const shell = ports.process.env("SHELL") || "/bin/zsh";
    try {
      const { stdout } = await ports.execFile(
        shell,
        [
          "-lic",
          `printf "${CLAUDE_SHELL_BIN_MARKER}%s\\n" "$(command -v claude 2>/dev/null || true)"`
        ],
        { timeout: claudeAuthStatusMs, maxBuffer: 64 * 1024 }
      );
      return parseShellResolvedClaudeBin(stdoutToString(stdout));
    } catch (err) {
      return parseShellResolvedClaudeBin(stdoutToString(err.stdout));
    }
  }
  async function claudeBinCandidates$1() {
    const home = ports.homedir();
    return claudeBinCandidates({
      shellResolved: await resolveClaudeBinFromUserShell(),
      envBlumeClaudeBin: ports.process.env("BLUME_CLAUDE_BIN"),
      envClaudeBin: ports.process.env("CLAUDE_BIN"),
      homeBinCandidates: [
        ports.path.join(home, ".n", "bin", "claude"),
        ports.path.join(home, ".local", "bin", "claude")
      ]
    });
  }
  async function probeClaudeCliAuthStatus(candidate) {
    try {
      const { stdout } = await ports.execFile(candidate, ["auth", "status"], {
        timeout: claudeAuthStatusMs,
        maxBuffer: 64 * 1024
      });
      return { kind: "ok", stdout };
    } catch (err) {
      return {
        kind: "error",
        stdout: err.stdout,
        code: err.code
      };
    }
  }
  async function readClaudeKeychainPassword() {
    try {
      const { stdout } = await ports.execFile(
        MACOS_SECURITY_BIN,
        ["find-generic-password", "-s", options.claudeKeychainService, "-w"],
        { timeout: claudeKeychainReadMs, maxBuffer: 1024 * 1024 }
      );
      return { kind: "found", raw: stdoutToString(stdout).trim() };
    } catch (err) {
      return {
        kind: "error",
        code: err.code,
        timedOut: err.killed === true
      };
    }
  }
  const fetchProviderUsageJson = createDefaultProviderUsageRuntimeFetchJson({
    now,
    timeoutMs: providerFetchMs,
    fetch: (input, init) => ports.fetch(input, init)
  });
  const setupTelemetryTracker = new UsageSetupTelemetryTracker({
    store: options.ports.settings,
    platform: () => ports.process.platform(),
    arch: () => ports.process.arch(),
    capture(event, properties) {
      return ports.captureTelemetry(event, properties);
    }
  });
  function trackUsageSetupTelemetry(report, force) {
    setupTelemetryTracker.track(report, force);
  }
  const codexAuthPath = () => codexAuthPathFromHost({
    env: (name) => ports.process.env(name),
    homedir: ports.homedir,
    join: ports.path.join
  });
  const runtimeService = createProviderUsageRuntimeService({
    fetchJson: fetchProviderUsageJson,
    claude: {
      readCredentialsFile: () => readJsonFile(ports, ports.path.join(ports.homedir(), ".claude", ".credentials.json")),
      readSecureCredentialCache: () => ports.secrets.get(options.claudeCredentialCacheSettingKey),
      writeSecureCredentialCache: (value) => ports.secrets.set(options.claudeCredentialCacheSettingKey, value),
      clearSecureCredentialCache: () => ports.secrets.clear(options.claudeCredentialCacheSettingKey),
      isKeychainAvailable: () => ports.process.platform() === "darwin",
      readKeychainPassword: readClaudeKeychainPassword,
      cliAuthStatusCandidates: claudeBinCandidates$1,
      probeCliAuthStatus: probeClaudeCliAuthStatus
    },
    codex: {
      readAuthJson: () => readJsonFile(ports, codexAuthPath()),
      writeAuthJson: (value) => writeJsonFileAtomic(ports, codexAuthPath(), value, now)
    },
    trackSetupTelemetry: trackUsageSetupTelemetry,
    now
  });
  return {
    fetchProviderUsageSnapshot: runtimeService.fetchProviderUsageSnapshot,
    fetchUsageReport(cursorCookie, force = false, options2 = {}) {
      return runtimeService.fetchUsageReport(cursorCookie, force, options2);
    },
    trackUsageSetupTelemetry,
    reset() {
      runtimeService.reset();
      setupTelemetryTracker.resetForTests();
    },
    resetUsageSetupTelemetryForTests() {
      setupTelemetryTracker.resetForTests();
    }
  };
}
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function defaultTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function appUsageWeekStartFor(ms) {
  const date = new Date(ms);
  date.setHours(0, 0, 0, 0);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  return formatLocalDate(date);
}
function appUsageIntervalTelemetryProperties(row) {
  const classifiedVisibleSeconds = row.window_visible_pinned_seconds + row.window_visible_pinned_expanded_seconds + row.window_visible_regular_expanded_seconds;
  return {
    event_version: 2,
    started_at: new Date(row.started_at_ms).toISOString(),
    ended_at: new Date(row.ended_at_ms).toISOString(),
    started_at_ms: row.started_at_ms,
    ended_at_ms: row.ended_at_ms,
    process_running_seconds: row.process_running_seconds,
    window_visible_seconds: row.window_visible_seconds,
    window_visible_pinned_seconds: row.window_visible_pinned_seconds,
    window_visible_pinned_expanded_seconds: row.window_visible_pinned_expanded_seconds,
    window_visible_regular_expanded_seconds: row.window_visible_regular_expanded_seconds,
    window_visible_unclassified_seconds: Math.max(
      0,
      row.window_visible_seconds - classifiedVisibleSeconds
    ),
    week_start: row.week_start,
    local_day_of_week: row.local_day_of_week,
    local_hour: row.local_hour,
    timezone: row.timezone
  };
}
class AppUsageAccumulator {
  constructor(deps = {}) {
    this.processRunningMs = 0;
    this.windowVisibleMs = 0;
    this.windowVisiblePinnedMs = 0;
    this.windowVisiblePinnedExpandedMs = 0;
    this.windowVisibleRegularExpandedMs = 0;
    this.windowMode = "regular_expanded";
    this.suspended = false;
    this.productAccessAvailable = true;
    this.visible = false;
    this.deps = deps;
    const now = this.readNow();
    this.intervalStartMs = now;
    this.lastUpdatedMs = now;
  }
  start(now = this.readNow()) {
    this.intervalStartMs = now;
    this.lastUpdatedMs = now;
    this.processRunningMs = 0;
    this.windowVisibleMs = 0;
    this.windowVisiblePinnedMs = 0;
    this.windowVisiblePinnedExpandedMs = 0;
    this.windowVisibleRegularExpandedMs = 0;
    this.windowMode = "regular_expanded";
    this.suspended = false;
    this.productAccessAvailable = true;
    this.visible = false;
  }
  setProductAccessAvailable(available, now = this.readNow()) {
    if (available === this.productAccessAvailable) return null;
    this.accumulate(now);
    const draft = this.flushAccumulated(now);
    this.productAccessAvailable = available;
    this.resetInterval(now);
    return draft;
  }
  setWindowMode(mode, now = this.readNow()) {
    if (mode === this.windowMode) return;
    this.accumulate(now);
    this.windowMode = mode;
  }
  setVisible(nextVisible, now = this.readNow()) {
    if (nextVisible === this.visible) return null;
    this.accumulate(now);
    const draft = this.flushAccumulated(now);
    this.visible = nextVisible;
    this.resetInterval(now);
    return draft;
  }
  suspend(now = this.readNow()) {
    this.accumulate(now);
    const draft = this.flushAccumulated(now);
    this.suspended = true;
    this.visible = false;
    this.resetInterval(now);
    return draft;
  }
  resume(visible, now = this.readNow()) {
    this.suspended = false;
    this.visible = visible;
    this.resetInterval(now);
  }
  flush(now = this.readNow()) {
    this.accumulate(now);
    const draft = this.flushAccumulated(now);
    this.resetInterval(now);
    return draft;
  }
  currentProcessRunningSeconds(now = this.readNow()) {
    const pendingMs = this.suspended || !this.productAccessAvailable ? 0 : Math.max(0, now - this.lastUpdatedMs);
    return Math.round((this.processRunningMs + pendingMs) / 1e3);
  }
  readNow() {
    return this.deps.now?.() ?? Date.now();
  }
  readTimezone() {
    return this.deps.timezone?.() ?? defaultTimezone();
  }
  accumulate(now) {
    const elapsedMs = Math.max(0, now - this.lastUpdatedMs);
    if (!this.suspended && this.productAccessAvailable) {
      this.processRunningMs += elapsedMs;
      if (this.visible) {
        this.windowVisibleMs += elapsedMs;
        if (this.windowMode === "pinned_compact") {
          this.windowVisiblePinnedMs += elapsedMs;
        } else if (this.windowMode === "pinned_expanded") {
          this.windowVisiblePinnedExpandedMs += elapsedMs;
        } else {
          this.windowVisibleRegularExpandedMs += elapsedMs;
        }
      }
    }
    this.lastUpdatedMs = now;
  }
  flushAccumulated(now) {
    const processRunningSeconds = Math.round(this.processRunningMs / 1e3);
    const windowVisibleSeconds = Math.round(this.windowVisibleMs / 1e3);
    const windowVisiblePinnedSeconds = Math.round(this.windowVisiblePinnedMs / 1e3);
    const windowVisiblePinnedExpandedSeconds = Math.round(this.windowVisiblePinnedExpandedMs / 1e3);
    const windowVisibleRegularExpandedSeconds = Math.round(
      this.windowVisibleRegularExpandedMs / 1e3
    );
    if (processRunningSeconds <= 0 && windowVisibleSeconds <= 0) return null;
    const startedAt = new Date(this.intervalStartMs);
    return {
      started_at_ms: this.intervalStartMs,
      ended_at_ms: now,
      process_running_seconds: processRunningSeconds,
      window_visible_seconds: windowVisibleSeconds,
      window_visible_pinned_seconds: windowVisiblePinnedSeconds,
      window_visible_pinned_expanded_seconds: windowVisiblePinnedExpandedSeconds,
      window_visible_regular_expanded_seconds: windowVisibleRegularExpandedSeconds,
      week_start: appUsageWeekStartFor(this.intervalStartMs),
      local_day_of_week: DAY_NAMES[startedAt.getDay()],
      local_hour: startedAt.getHours(),
      timezone: this.readTimezone(),
      created_at: now
    };
  }
  resetInterval(now) {
    this.intervalStartMs = now;
    this.lastUpdatedMs = now;
    this.processRunningMs = 0;
    this.windowVisibleMs = 0;
    this.windowVisiblePinnedMs = 0;
    this.windowVisiblePinnedExpandedMs = 0;
    this.windowVisibleRegularExpandedMs = 0;
  }
}
class AppUsageService {
  constructor(deps) {
    this.flushing = false;
    this.deps = deps;
    this.accumulator = new AppUsageAccumulator(deps);
    this.maxFlushBatch = deps.maxFlushBatch ?? 100;
  }
  start(now = this.readNow()) {
    this.accumulator.start(now);
    return this.flushPending();
  }
  setWindowMode(mode, now = this.readNow()) {
    this.accumulator.setWindowMode(mode, now);
  }
  setProductAccessAvailable(available, now = this.readNow()) {
    return this.persistInterval(this.accumulator.setProductAccessAvailable(available, now), true);
  }
  setVisible(nextVisible, now = this.readNow(), shouldFlush = true) {
    return this.persistInterval(this.accumulator.setVisible(nextVisible, now), shouldFlush);
  }
  suspend(now = this.readNow()) {
    return this.persistInterval(this.accumulator.suspend(now), false);
  }
  resume(visible, now = this.readNow()) {
    this.accumulator.resume(visible, now);
    void this.flushPending();
  }
  flushCurrentInterval(now = this.readNow(), shouldFlush = true) {
    return this.persistInterval(this.accumulator.flush(now), shouldFlush);
  }
  currentProcessRunningSeconds(now = this.readNow()) {
    return this.accumulator.currentProcessRunningSeconds(now);
  }
  async totalProcessRunningSeconds(now = this.readNow()) {
    return await this.deps.usage.sumAppUsageProcessRunningSeconds() + this.currentProcessRunningSeconds(now);
  }
  async flushPending() {
    if (this.flushing || !this.deps.telemetry.isConfigured()) return;
    this.flushing = true;
    try {
      const rows = await this.deps.usage.listUnsentAppUsageIntervals(this.maxFlushBatch);
      for (const row of rows) {
        const sent = await this.deps.telemetry.capture(
          "app_usage_interval",
          appUsageIntervalTelemetryProperties(row)
        );
        if (!sent) break;
        await this.deps.usage.markAppUsageIntervalSent(row.id, this.readNow());
      }
    } catch (err) {
      this.deps.onFlushError?.(err);
    } finally {
      this.flushing = false;
    }
  }
  readNow() {
    return this.deps.now?.() ?? Date.now();
  }
  async persistInterval(interval, shouldFlush) {
    if (!interval) return;
    try {
      await this.deps.usage.insertAppUsageInterval(interval);
      if (shouldFlush) await this.flushPending();
    } catch (err) {
      await this.deps.onInsertError?.(err);
    }
  }
}
const DEFAULT_FLUSH_INTERVAL_MS = 10 * 60 * 1e3;
class AppUsageRuntimeTracker {
  constructor(deps) {
    this.timer = null;
    this.stopping = false;
    this.deps = deps;
    this.service = new AppUsageService(deps);
  }
  start(visible, now = this.readNow()) {
    if (this.timer) {
      this.setVisible(visible, now);
      return;
    }
    this.stopping = false;
    void this.service.start(now);
    this.setVisible(visible, now);
    this.timer = this.deps.scheduler.setInterval(() => {
      this.flushCurrentInterval();
    }, this.deps.flushIntervalMs ?? DEFAULT_FLUSH_INTERVAL_MS);
  }
  stop(now = this.readNow()) {
    if (!this.timer) return;
    this.stopping = true;
    this.flushCurrentInterval(now);
    if (this.timer) {
      this.deps.scheduler.clearInterval(this.timer);
      this.timer = null;
    }
  }
  isStarted() {
    return this.timer !== null;
  }
  setWindowMode(mode, now = this.readNow()) {
    this.service.setWindowMode(mode, now);
  }
  setProductAccessAvailable(available, now = this.readNow()) {
    void this.service.setProductAccessAvailable(available, now);
  }
  setVisible(nextVisible, now = this.readNow()) {
    void this.service.setVisible(nextVisible, now, !this.stopping);
  }
  suspend(now = this.readNow()) {
    void this.service.suspend(now);
  }
  resume(visible, now = this.readNow()) {
    this.service.resume(visible, now);
  }
  currentProcessRunningSeconds(now = this.readNow()) {
    if (!this.timer) return 0;
    return this.service.currentProcessRunningSeconds(now);
  }
  totalProcessRunningSeconds(now = this.readNow()) {
    if (!this.timer) return this.deps.usage.sumAppUsageProcessRunningSeconds();
    return this.service.totalProcessRunningSeconds(now);
  }
  flushCurrentInterval(now = this.readNow()) {
    void this.service.flushCurrentInterval(now, !this.stopping);
  }
  readNow() {
    return this.deps.now?.() ?? Date.now();
  }
}
const WINDOW_VISIBILITY_EVENTS = [
  "show",
  "hide",
  "minimize",
  "restore",
  "closed"
];
function shouldCountVisible(win) {
  if (!win || win.isDestroyed()) return false;
  return win.isVisible() && !win.isMinimized();
}
class AppUsageHost {
  constructor(deps) {
    this.win = null;
    this.disposers = [];
    this.deps = deps;
    this.runtime = new AppUsageRuntimeTracker(deps);
  }
  start(win) {
    if (this.runtime.isStarted()) {
      this.attachWindow(win);
      return;
    }
    this.runtime.start(shouldCountVisible(win));
    this.attachWindow(win);
    this.registerPowerListeners();
  }
  stop() {
    if (!this.runtime.isStarted()) return;
    this.runtime.stop();
    for (const dispose of this.disposers) dispose();
    this.disposers = [];
  }
  setWindowMode(mode) {
    this.runtime.setWindowMode(mode);
  }
  setProductAccessAvailable(available) {
    this.runtime.setProductAccessAvailable(available);
  }
  totalProcessRunningSeconds(now = Date.now()) {
    return this.runtime.totalProcessRunningSeconds(now);
  }
  attachWindow(win) {
    this.win = win;
    this.handleVisibilityChange(shouldCountVisible(win));
    this.registerWindowListeners(win);
  }
  registerWindowListeners(win) {
    const onVisibilityChange = () => {
      this.handleVisibilityChange(shouldCountVisible(win));
    };
    for (const event of WINDOW_VISIBILITY_EVENTS) {
      win.on(event, onVisibilityChange);
      this.disposers.push(() => win.off(event, onVisibilityChange));
    }
  }
  registerPowerListeners() {
    const onSuspend = () => {
      this.runtime.suspend();
    };
    const onResume = () => {
      this.runtime.resume(shouldCountVisible(this.win));
    };
    this.deps.power.on("suspend", onSuspend);
    this.deps.power.on("resume", onResume);
    this.disposers.push(() => this.deps.power.off("suspend", onSuspend));
    this.disposers.push(() => this.deps.power.off("resume", onResume));
  }
  handleVisibilityChange(nextVisible) {
    this.runtime.setVisible(nextVisible);
  }
}
function assertPublicSettingKey(key, secretKeys) {
  if (secretKeys.has(key)) {
    throw new Error(`Setting "${key}" must be accessed via its dedicated secure-store IPC.`);
  }
}
function projectPublicSettings(settings, secretKeys) {
  const publicSettings = {};
  for (const [key, value] of Object.entries(settings)) {
    if (!secretKeys.has(key)) publicSettings[key] = value;
  }
  return publicSettings;
}
const LAUNCH_AT_LOGIN_SETTING_KEY = "launchAtLogin";
const ONBOARDING_COMPLETED_SETTING_KEY = "onboardingCompleted";
const TRUE_SETTING_VALUE = "true";
function shouldSupportLaunchAtLogin(isDev, allowLoginItemInDev, nativeSupported = true) {
  return nativeSupported && (!isDev || allowLoginItemInDev);
}
function unsupportedLaunchAtLoginStatus() {
  return { status: "unsupported" };
}
function projectLaunchAtLoginStatus(status) {
  return { status };
}
function shouldShowOnboarding(input) {
  if (input.forceOnboarding) return true;
  if (input.isDev) return false;
  return input.completedSetting !== TRUE_SETTING_VALUE;
}
function createAppShellSettingsUseCases(deps) {
  const launchAtLoginSupported = () => shouldSupportLaunchAtLogin(
    deps.isDev,
    deps.allowLoginItemInDev(),
    deps.launchAtLogin.isSupported()
  );
  const applyLaunchAtLoginPreference = (enabled) => {
    if (!launchAtLoginSupported()) return false;
    try {
      deps.launchAtLogin.setEnabled(enabled);
      return true;
    } catch (error) {
      deps.onLaunchAtLoginError?.("apply", error);
      return false;
    }
  };
  const getLaunchAtLoginStatus = () => {
    if (!launchAtLoginSupported()) return unsupportedLaunchAtLoginStatus();
    try {
      return projectLaunchAtLoginStatus(deps.launchAtLogin.getStatus());
    } catch (error) {
      deps.onLaunchAtLoginError?.("status", error);
      return unsupportedLaunchAtLoginStatus();
    }
  };
  const markLaunchAtLoginInitialized = () => {
    if (deps.settings.get(LAUNCH_AT_LOGIN_SETTING_KEY) !== TRUE_SETTING_VALUE) {
      deps.settings.set(LAUNCH_AT_LOGIN_SETTING_KEY, TRUE_SETTING_VALUE);
    }
  };
  return {
    supportsLaunchAtLogin() {
      return launchAtLoginSupported();
    },
    initializeLaunchAtLoginDefault() {
      if (!launchAtLoginSupported() || deps.settings.get(LAUNCH_AT_LOGIN_SETTING_KEY) === TRUE_SETTING_VALUE) {
        return;
      }
      if (applyLaunchAtLoginPreference(true)) markLaunchAtLoginInitialized();
    },
    adoptLegacyLaunchAtLoginMigration() {
      if (applyLaunchAtLoginPreference(true)) markLaunchAtLoginInitialized();
    },
    getOnboardingState() {
      return {
        shouldShow: shouldShowOnboarding({
          completedSetting: deps.settings.get(ONBOARDING_COMPLETED_SETTING_KEY),
          isDev: deps.isDev,
          forceOnboarding: deps.forceOnboarding
        })
      };
    },
    completeOnboarding() {
      deps.settings.set(ONBOARDING_COMPLETED_SETTING_KEY, TRUE_SETTING_VALUE);
    },
    getLaunchAtLoginStatus,
    setLaunchAtLogin(enabled) {
      markLaunchAtLoginInitialized();
      applyLaunchAtLoginPreference(enabled);
      return getLaunchAtLoginStatus();
    },
    async openLaunchAtLoginSettings() {
      if (!launchAtLoginSupported()) return;
      try {
        await deps.launchAtLogin.openSettings();
      } catch (error) {
        deps.onLaunchAtLoginError?.("open-settings", error);
        throw error;
      }
    }
  };
}
const DEFAULT_CHATWOOT_BASE_URL = "https://support.blume-codes.com";
function normalizeChatwootBaseUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("invalid chatwoot base url");
  }
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("invalid chatwoot base url");
  }
  const hostname = parsed.hostname.toLowerCase();
  const isLocalHttp = parsed.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(hostname);
  if (parsed.protocol !== "https:" && !isLocalHttp) {
    throw new Error("invalid chatwoot base url protocol");
  }
  parsed.pathname = "";
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
}
function cleanRequiredString(value, label) {
  if (typeof value !== "string") throw new Error(`invalid ${label}`);
  const clean = value.trim();
  if (!clean || /[\r\n]/.test(clean)) throw new Error(`invalid ${label}`);
  return clean;
}
function optionalAuthHeader(value) {
  if (value === void 0 || value === null || value === "") return {};
  return { "X-Auth-Token": cleanRequiredString(value, "chatwoot auth token") };
}
function normalizeChatwootContactEmail(value) {
  const email = typeof value === "string" && value.trim() ? value.trim().toLowerCase() : null;
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}
function buildChatwootWidgetConfigFetchRequest(request2) {
  if (!request2 || typeof request2 !== "object") {
    throw new Error("invalid chatwoot widget config request");
  }
  const { baseUrl, websiteToken, authToken } = request2;
  const origin = normalizeChatwootBaseUrl(baseUrl);
  const safeWebsiteToken = cleanRequiredString(websiteToken, "chatwoot website token");
  return {
    url: new URL("/api/v1/widget/config", origin).toString(),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...optionalAuthHeader(authToken)
    },
    body: JSON.stringify({ website_token: safeWebsiteToken })
  };
}
function buildChatwootWidgetSendMessageFetchRequest(request2) {
  if (!request2 || typeof request2 !== "object") {
    throw new Error("invalid chatwoot widget send message request");
  }
  const { baseUrl, websiteToken, authToken, content, refererUrl } = request2;
  const origin = normalizeChatwootBaseUrl(baseUrl);
  const safeWebsiteToken = cleanRequiredString(websiteToken, "chatwoot website token");
  const safeAuthToken = cleanRequiredString(authToken, "chatwoot auth token");
  const safeContent = cleanRequiredString(content, "chatwoot message");
  if (safeContent.length > 1e4) throw new Error("chatwoot message is too long");
  const safeRefererUrl = typeof refererUrl === "string" && refererUrl.trim() ? refererUrl.trim() : origin;
  return {
    url: new URL("/api/v1/widget/messages", origin).toString(),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": safeAuthToken
    },
    body: JSON.stringify({
      website_token: safeWebsiteToken,
      message: {
        content: safeContent,
        referer_url: safeRefererUrl,
        timestamp: Math.floor(Date.now() / 1e3),
        echo_id: `blume-${Date.now()}`
      }
    })
  };
}
function buildChatwootWidgetContactUpdateFetchRequest(request2) {
  if (!request2 || typeof request2 !== "object") {
    throw new Error("invalid chatwoot widget contact update request");
  }
  const { baseUrl, websiteToken, authToken, name, email } = request2;
  const origin = normalizeChatwootBaseUrl(baseUrl);
  const safeWebsiteToken = cleanRequiredString(websiteToken, "chatwoot website token");
  const safeAuthToken = cleanRequiredString(authToken, "chatwoot auth token");
  const safeName = name === void 0 || name === null || name === "" ? null : cleanRequiredString(name, "chatwoot contact name");
  if (safeName && !/^LP-[A-Z0-9]{8}$/.test(safeName)) {
    throw new Error("invalid chatwoot landing page contact name");
  }
  const safeEmail = normalizeChatwootContactEmail(email);
  if (email !== void 0 && email !== null && email !== "" && !safeEmail) {
    throw new Error("invalid chatwoot contact email");
  }
  if (!safeName && !safeEmail) throw new Error("empty chatwoot contact update");
  const contactName = safeEmail ?? safeName;
  return {
    url: new URL("/api/v1/widget/contact", origin).toString(),
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": safeAuthToken
    },
    body: JSON.stringify({
      website_token: safeWebsiteToken,
      ...contactName ? { name: contactName } : {},
      ...safeEmail ? { email: safeEmail } : {}
    })
  };
}
function buildChatwootWidgetMessagesFetchRequest(request2) {
  if (!request2 || typeof request2 !== "object") {
    throw new Error("invalid chatwoot widget messages request");
  }
  const { baseUrl, websiteToken, authToken } = request2;
  const origin = normalizeChatwootBaseUrl(baseUrl);
  const safeWebsiteToken = cleanRequiredString(websiteToken, "chatwoot website token");
  const safeAuthToken = cleanRequiredString(authToken, "chatwoot auth token");
  const url = new URL("/api/v1/widget/messages", origin);
  url.searchParams.set("website_token", safeWebsiteToken);
  return {
    url: url.toString(),
    headers: {
      Accept: "application/json",
      "X-Auth-Token": safeAuthToken
    }
  };
}
function assertChatwootWidgetMessagesResponseOk(response) {
  if (!response.ok) {
    throw new Error(`chatwoot widget messages failed: ${response.status}`);
  }
}
function projectAllowedChatwootWebviewOrigins(optionalBaseUrls = []) {
  const origins = /* @__PURE__ */ new Set();
  for (const raw of [...optionalBaseUrls, DEFAULT_CHATWOOT_BASE_URL]) {
    if (!raw) continue;
    try {
      origins.add(new URL(normalizeChatwootBaseUrl(raw)).origin);
    } catch {
    }
  }
  return origins;
}
const POSTHOG_TRACKING_DISABLED_SETTING_KEY = "posthogTrackingDisabled";
const MENU_BAR_ENABLED_SETTING_KEY = "menuBarEnabled";
const MENU_BAR_STATUS_INDICATORS_COLORED_SETTING_KEY = "menuBarStatusIndicatorsColored";
const MENU_BAR_STATUS_INDICATOR_STYLE_SETTING_KEY = "menuBarStatusIndicatorStyle";
const MENU_BAR_SHOW_STATUS_SETTING_KEY = "menuBarShowStatus";
const MENU_BAR_SHOW_RUNNING_STATUS_SETTING_KEY = "menuBarShowStatusRunning";
const MENU_BAR_SHOW_WAITING_STATUS_SETTING_KEY = "menuBarShowStatusWaiting";
const MENU_BAR_SHOW_FINISHED_STATUS_SETTING_KEY = "menuBarShowStatusFinished";
const MENU_BAR_SHOW_USAGE_SETTING_KEY = "menuBarShowUsage";
const MENU_BAR_SHOW_CURSOR_USAGE_SETTING_KEY = "menuBarShowUsageCursor";
const MENU_BAR_SHOW_CLAUDE_USAGE_SETTING_KEY = "menuBarShowUsageClaude";
const MENU_BAR_SHOW_CODEX_USAGE_SETTING_KEY = "menuBarShowUsageCodex";
const MENU_BAR_SHOW_CONVERSATIONS_SETTING_KEY = "menuBarShowConversations";
const MENU_BAR_SHOW_USAGE_IN_DROPDOWN_SETTING_KEY = "menuBarShowUsageInDropdown";
const USER_AGENT_MCP_ENABLED_SETTING_KEY = "userAgentMcp.enabled";
const USER_AGENT_MCP_PERMISSION_SETTING_KEY = "userAgentMcp.permission";
function configuredSettingKey(clientId) {
  return `userAgentMcp.client.${clientId}.configured`;
}
function parseUserAgentMcpPermission(value) {
  return value === "contribute" ? "contribute" : "read";
}
function buildUserAgentMcpClientApplySpecs(launch, skill) {
  const envArgs = Object.entries(launch.env ?? {}).flatMap(([key, value]) => [
    "--env",
    `${key}=${value}`
  ]);
  const claudeConfig = JSON.stringify({
    type: "stdio",
    command: launch.command,
    args: launch.args,
    ...launch.env && Object.keys(launch.env).length ? { env: launch.env } : {}
  });
  return [
    {
      clientId: "codex",
      command: "codex",
      args: ["mcp", "add", "blume", ...envArgs, "--", launch.command, ...launch.args],
      skill: clientSkillSetup("codex", skill)
    },
    {
      clientId: "claude-code",
      command: "claude",
      args: ["mcp", "add-json", "--scope", "user", "blume", claudeConfig],
      skill: clientSkillSetup("claude-code", skill)
    }
  ];
}
function buildUserAgentMcpClientSetups(launch, skill, configured = {}) {
  const applySpecs = buildUserAgentMcpClientApplySpecs(launch, skill);
  const spec = (clientId) => {
    const value = applySpecs.find((candidate) => candidate.clientId === clientId);
    if (!value) throw new Error(`Unsupported MCP client: ${clientId}`);
    return value;
  };
  const codex = spec("codex");
  const claude = spec("claude-code");
  return [
    {
      id: "codex",
      label: "Codex",
      configured: configured.codex === true,
      command: formatPosixCommand(codex.command, codex.args),
      verifyPrompt: "Continue the most recent work another agent did on this branch. Tell me what you found before changing anything.",
      skill: codex.skill
    },
    {
      id: "claude-code",
      label: "Claude Code",
      configured: configured["claude-code"] === true,
      command: formatPosixCommand(claude.command, claude.args),
      verifyPrompt: "Continue the most recent work another agent did on this branch. Tell me what you found before changing anything.",
      skill: claude.skill
    }
  ];
}
function createUserAgentMcpSettingsUseCases(deps) {
  const getSettingsForSupport = async (supported) => {
    const [enabled, permission, codexConfigured, claudeConfigured] = await Promise.all([
      deps.settings.getAsync(USER_AGENT_MCP_ENABLED_SETTING_KEY),
      deps.settings.getAsync(USER_AGENT_MCP_PERMISSION_SETTING_KEY),
      deps.settings.getAsync(configuredSettingKey("codex")),
      deps.settings.getAsync(configuredSettingKey("claude-code"))
    ]);
    const parsedPermission = parseUserAgentMcpPermission(permission);
    return {
      supported,
      enabled: supported && enabled === "true",
      permission: parsedPermission,
      clients: supported ? buildUserAgentMcpClientSetups(
        deps.runtime.getLaunchSpec(),
        deps.runtime.getSkillBundle(),
        {
          codex: codexConfigured === "true",
          "claude-code": claudeConfigured === "true"
        }
      ) : [],
      specification: userAgentMcp.getUserAgentMcpSpecification(parsedPermission),
      ...!supported && deps.runtime.unavailableReason ? { unavailableReason: deps.runtime.unavailableReason } : {}
    };
  };
  const getSettings = async () => getSettingsForSupport(await deps.runtime.supported());
  return {
    getSettings,
    async setSettings(patch) {
      const supported = await deps.runtime.supported();
      if (!supported) throw new Error("Blume MCP is unavailable in this runtime");
      if (patch.enabled !== void 0) {
        if (typeof patch.enabled !== "boolean") throw new Error("enabled must be a boolean");
        await deps.settings.setAsync(USER_AGENT_MCP_ENABLED_SETTING_KEY, String(patch.enabled));
      }
      if (patch.permission !== void 0) {
        if (patch.permission !== "read" && patch.permission !== "contribute") {
          throw new Error("permission must be read or contribute");
        }
        await deps.settings.setAsync(USER_AGENT_MCP_PERMISSION_SETTING_KEY, patch.permission);
      }
      return getSettingsForSupport(supported);
    },
    async applyClientSetup(clientId) {
      if (!await deps.runtime.supported()) {
        throw new Error("Blume MCP is unavailable in this runtime");
      }
      const spec = buildUserAgentMcpClientApplySpecs(
        deps.runtime.getLaunchSpec(),
        deps.runtime.getSkillBundle()
      ).find((candidate) => candidate.clientId === clientId);
      if (!spec) throw new Error(`Unsupported MCP client: ${String(clientId)}`);
      const applied = await deps.runtime.applyClientSetup(spec);
      await Promise.all([
        deps.settings.setAsync(USER_AGENT_MCP_ENABLED_SETTING_KEY, "true"),
        deps.settings.setAsync(configuredSettingKey(clientId), "true")
      ]);
      return {
        clientId,
        status: "applied",
        detail: applied.detail ?? `${clientId === "codex" ? "Codex" : "Claude Code"} can now use Blume with the continuity skill.`
      };
    }
  };
}
function clientSkillSetup(clientId, skill) {
  return {
    ...skill,
    files: skill.files.map((file) => ({ ...file })),
    targetDirectory: clientId === "codex" ? `~/.agents/skills/${skill.name}` : `~/.claude/skills/${skill.name}`
  };
}
function formatPosixCommand(command, args) {
  return [command, ...args].map(quotePosixArgument).join(" ");
}
function quotePosixArgument(value) {
  if (/^[A-Za-z0-9_@%+=:,./-]+$/.test(value)) return value;
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}
class GitHubAuthorizationError extends Error {
  constructor(message, reason) {
    super(message);
    this.name = "GitHubAuthorizationError";
    this.reason = reason;
  }
}
const DEVICE_CODE_URL = "https://github.com/login/device/code";
const TOKEN_URL = "https://github.com/login/oauth/access_token";
const CLIENT_ID = /^Iv[A-Za-z0-9.]{8,40}$/;
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
const TOKEN = /^[\x21-\x7e]{20,512}$/;
const USER_CODE = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
function githubAppIdentity(input) {
  const clientId = input.clientId?.trim();
  const slug = input.slug?.trim();
  return clientId && slug && CLIENT_ID.test(clientId) && SLUG.test(slug) ? { clientId, slug } : void 0;
}
function githubAppInstallUrl(app, options = {}) {
  const base = `https://github.com/apps/${app.slug}/installations`;
  if (options.chooseAccount) return `${base}/select_target`;
  if (options.targetId && Number.isSafeInteger(options.targetId) && options.targetId > 0)
    return `${base}/new/permissions?target_id=${options.targetId}`;
  return `${base}/new`;
}
function isGitHubVerificationUri(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "github.com" && url.pathname === "/login/device";
  } catch {
    return false;
  }
}
async function post(fetcher, url, form, signal) {
  let response;
  try {
    response = await fetcher(url, {
      method: "POST",
      redirect: "error",
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15e3)]) : AbortSignal.timeout(15e3),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Blume-Deliveries"
      },
      body: new URLSearchParams(form).toString()
    });
  } catch {
    if (signal?.aborted) throw new GitHubAuthorizationError("GitHub authorization was cancelled.", "cancelled");
    throw new GitHubAuthorizationError("GitHub could not be reached. Check your connection and try again.", "unavailable");
  }
  const text = await response.text();
  if (text.length > 64 * 1024) throw new GitHubAuthorizationError("GitHub returned an unexpected response.", "unavailable");
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new GitHubAuthorizationError(`GitHub responded with ${response.status}. Try again.`, "unavailable");
  }
  if (!body || typeof body !== "object") throw new GitHubAuthorizationError("GitHub returned an unexpected response.", "unavailable");
  return { status: response.status, body };
}
const seconds = (value) => typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
function credentialFrom(body, now) {
  const accessToken = body.access_token;
  if (typeof accessToken !== "string" || !TOKEN.test(accessToken))
    throw new GitHubAuthorizationError("GitHub returned an unexpected response.", "unavailable");
  const refresh = typeof body.refresh_token === "string" && TOKEN.test(body.refresh_token) ? body.refresh_token : void 0;
  const expiresIn = seconds(body.expires_in);
  const refreshExpiresIn = seconds(body.refresh_token_expires_in);
  return {
    accessToken,
    ...refresh ? { refreshToken: refresh } : {},
    ...expiresIn ? { expiresAt: now + expiresIn * 1e3 } : {},
    ...refresh && refreshExpiresIn ? { refreshExpiresAt: now + refreshExpiresIn * 1e3 } : {}
  };
}
function oauthError(body) {
  const error = typeof body.error === "string" ? body.error : "";
  if (error === "access_denied") return new GitHubAuthorizationError("Access was not granted on GitHub.", "denied");
  if (error === "expired_token" || error === "token_expired")
    return new GitHubAuthorizationError("The GitHub code expired. Start again.", "expired");
  if (error === "device_flow_disabled")
    return new GitHubAuthorizationError("The Blume GitHub App does not allow device authorization. Enable “Device Flow” in its settings.", "disabled");
  if (error === "bad_refresh_token")
    return new GitHubAuthorizationError("GitHub access expired. Connect GitHub again.", "expired");
  if (error === "incorrect_client_credentials" || error === "unsupported_grant_type" || error === "incorrect_device_code")
    return new GitHubAuthorizationError("This build’s GitHub App configuration was rejected by GitHub.", "invalid");
  return new GitHubAuthorizationError("GitHub could not complete the authorization. Try again.", "unavailable");
}
async function requestGitHubDeviceCode(deps) {
  const { status, body } = await post(deps.fetch, DEVICE_CODE_URL, { client_id: deps.app.clientId }, deps.signal);
  if (typeof body.error === "string") throw oauthError(body);
  if (status === 404) throw new GitHubAuthorizationError("GitHub does not know this build’s GitHub App.", "invalid");
  const { device_code, user_code, verification_uri } = body;
  const expiresIn = seconds(body.expires_in) ?? 900;
  if (typeof device_code !== "string" || !/^[A-Za-z0-9_-]{10,200}$/.test(device_code) || typeof user_code !== "string" || !USER_CODE.test(user_code) || typeof verification_uri !== "string" || !isGitHubVerificationUri(verification_uri))
    throw new GitHubAuthorizationError("GitHub returned an unexpected response.", "unavailable");
  return {
    deviceCode: device_code,
    userCode: user_code,
    verificationUri: verification_uri,
    expiresAt: deps.now() + Math.min(expiresIn, 1800) * 1e3,
    intervalMs: Math.min(Math.max(seconds(body.interval) ?? 5, 5), 60) * 1e3
  };
}
async function pollGitHubDeviceAuthorization(deps) {
  let interval = deps.code.intervalMs;
  let transientFailures = 0;
  while (true) {
    await deps.sleep(interval, deps.signal);
    if (deps.signal?.aborted) throw new GitHubAuthorizationError("GitHub authorization was cancelled.", "cancelled");
    if (deps.now() >= deps.code.expiresAt) throw new GitHubAuthorizationError("The GitHub code expired. Start again.", "expired");
    let body;
    try {
      ;
      ({ body } = await post(
        deps.fetch,
        TOKEN_URL,
        {
          client_id: deps.app.clientId,
          device_code: deps.code.deviceCode,
          grant_type: "urn:ietf:params:oauth:grant-type:device_code"
        },
        deps.signal
      ));
    } catch (error) {
      if (error instanceof GitHubAuthorizationError && error.reason === "unavailable" && ++transientFailures < 5) continue;
      throw error;
    }
    transientFailures = 0;
    if (body.error === "authorization_pending") continue;
    if (body.error === "slow_down") {
      interval = Math.min((seconds(body.interval) ?? interval / 1e3 + 5) * 1e3, 6e4);
      continue;
    }
    if (typeof body.error === "string") throw oauthError(body);
    return credentialFrom(body, deps.now());
  }
}
async function refreshGitHubUserCredential(deps) {
  if (!deps.credential.refreshToken)
    throw new GitHubAuthorizationError("GitHub access expired. Connect GitHub again.", "expired");
  if (deps.credential.refreshExpiresAt && deps.now() >= deps.credential.refreshExpiresAt)
    throw new GitHubAuthorizationError("GitHub access expired. Connect GitHub again.", "expired");
  const { body } = await post(deps.fetch, TOKEN_URL, {
    client_id: deps.app.clientId,
    grant_type: "refresh_token",
    refresh_token: deps.credential.refreshToken
  });
  if (typeof body.error === "string") throw oauthError(body);
  return credentialFrom(body, deps.now());
}
function githubCredentialNeedsRefresh(credential, now) {
  return credential.expiresAt !== void 0 && now >= credential.expiresAt - 5 * 6e4;
}
function parseGitHubUserCredential(value) {
  if (!value || typeof value !== "object") return void 0;
  const raw = value;
  if (typeof raw.accessToken !== "string" || !TOKEN.test(raw.accessToken)) return void 0;
  const finite2 = (input) => typeof input === "number" && Number.isFinite(input) ? input : void 0;
  const refreshToken = typeof raw.refreshToken === "string" && TOKEN.test(raw.refreshToken) ? raw.refreshToken : void 0;
  const expiresAt = finite2(raw.expiresAt);
  const refreshExpiresAt = finite2(raw.refreshExpiresAt);
  return {
    accessToken: raw.accessToken,
    ...refreshToken ? { refreshToken } : {},
    ...expiresAt !== void 0 ? { expiresAt } : {},
    ...refreshExpiresAt !== void 0 ? { refreshExpiresAt } : {}
  };
}
function createPluginUpdateScheduler(options) {
  const interval = 15 * 6e4;
  let retryDelay = 6e4;
  let cancel;
  let running;
  let requested = false;
  let stopped = false;
  function schedule2(delay2) {
    cancel?.();
    if (!stopped) cancel = options.schedule(() => void request2(), delay2);
  }
  function request2() {
    if (stopped) return Promise.resolve();
    cancel?.();
    cancel = void 0;
    requested = true;
    if (running) return running;
    running = Promise.resolve().then(async () => {
      let delay2 = interval;
      do {
        if (stopped) break;
        requested = false;
        let ok = false;
        try {
          ok = await options.run();
        } catch (error) {
          options.onError(error);
        }
        delay2 = ok ? interval : retryDelay;
        retryDelay = ok ? 6e4 : Math.min(interval, retryDelay * 2);
      } while (requested && !stopped);
      running = void 0;
      schedule2(delay2);
    });
    return running;
  }
  schedule2(options.startupDelayMs ?? 3e4);
  return {
    request: request2,
    stop() {
      stopped = true;
      requested = false;
      cancel?.();
      cancel = void 0;
    }
  };
}
const BLUME_GITHUB_APP = { clientId: "Iv23liFLg99cICncv3X9", slug: "blume-desktop" };
const githubApp = githubAppIdentity({
  clientId: process.env.BLUME_GITHUB_APP_CLIENT_ID || BLUME_GITHUB_APP.clientId,
  slug: process.env.BLUME_GITHUB_APP_SLUG || BLUME_GITHUB_APP.slug
});
async function runForAccount(ready, currentEpoch, dispatch) {
  const epoch = currentEpoch();
  const check = () => {
    if (epoch !== currentEpoch()) throw Error("Account changed. Refresh to continue.");
  };
  await ready;
  check();
  const result = await dispatch();
  check();
  return result;
}
const LEDGER_IN_FLIGHT = 16;
const LEDGER_QUEUED = 256;
const WORKSPACE_CHANGED = "Workspace changed. Refresh to continue.";
function createLedgerQueue(options) {
  const maxInFlight = options.inFlight ?? LEDGER_IN_FLIGHT;
  const maxQueued = options.queued ?? LEDGER_QUEUED;
  const sent = /* @__PURE__ */ new Map();
  const waiting = [];
  let generation = 0;
  let barrier;
  function refuse(request2, reason) {
    clearTimeout(request2.timer);
    request2.reject(Error(reason));
  }
  function fence(reason) {
    generation++;
    for (const request2 of waiting.splice(0)) refuse(request2, reason);
    options.onFence?.();
  }
  function finished(request2) {
    sent.delete(request2.message.id);
    if (barrier === request2) {
      barrier = void 0;
      fence(WORKSPACE_CHANGED);
    }
  }
  function next() {
    while (!barrier && sent.size < maxInFlight && waiting.length) {
      const request2 = waiting.shift();
      if (request2.generation !== generation) {
        refuse(request2, WORKSPACE_CHANGED);
        continue;
      }
      if (request2.fence && sent.size) {
        waiting.unshift(request2);
        return;
      }
      sent.set(request2.message.id, request2);
      if (request2.fence) barrier = request2;
      if (!options.post(request2.message)) {
        if (barrier === request2) barrier = void 0;
        sent.delete(request2.message.id);
        refuse(request2, "Blume ledger is unavailable. Restart the app to reconnect.");
      }
    }
  }
  return {
    /** Sends now when a slot is free, otherwise queues; rejects when the queue is full. A `fence`
     * request (a workspace switch) is sent alone and moves the generation on when it answers.
     * `generation`: the one the caller read when it was asked (default: now); an older one is
     * refused. */
    request(operation, input, cookie, timeoutMs, requestOptions = {}) {
      return new Promise((resolve, reject) => {
        if ((requestOptions.generation ?? generation) !== generation) {
          reject(Error(WORKSPACE_CHANGED));
          return;
        }
        if (waiting.length >= maxQueued) {
          reject(Error("Blume ledger is busy. Try again in a moment."));
          return;
        }
        const message = { id: require$$0.randomUUID(), operation, input, cookie };
        const request2 = {
          message,
          generation,
          fence: requestOptions.fence === true,
          resolve,
          reject,
          timer: setTimeout(() => {
            const queuedAt = waiting.indexOf(request2);
            if (queuedAt >= 0) {
              waiting.splice(queuedAt, 1);
              reject(Error("Blume ledger is busy. Try again in a moment."));
              next();
              return;
            }
            if (!sent.has(message.id)) return;
            finished(request2);
            reject(Error("Blume ledger timed out. Refresh before retrying."));
            next();
          }, timeoutMs)
        };
        waiting.push(request2);
        next();
      });
    },
    /** The worker answered a request (an unknown id was already timed out). */
    settle(id, outcome) {
      const request2 = sent.get(id);
      if (!request2) return false;
      clearTimeout(request2.timer);
      finished(request2);
      if (!outcome.error && options.fenceAfter?.(request2.message, outcome.result)) fence(WORKSPACE_CHANGED);
      if (outcome.error) request2.reject(Error(outcome.error));
      else request2.resolve(outcome.result);
      next();
      return true;
    },
    /** The account changed: what was asked for the previous one is refused, never sent. */
    dropQueued(reason) {
      fence(reason);
    },
    /** Rejects everything, sent or queued (the worker stopped). */
    failAll(reason) {
      const all = [...sent.values(), ...waiting.splice(0)];
      sent.clear();
      barrier = void 0;
      generation++;
      for (const request2 of all) refuse(request2, reason);
    },
    get inFlight() {
      return sent.size;
    },
    get queued() {
      return waiting.length;
    },
    get generation() {
      return generation;
    },
    get switchingWorkspace() {
      return Boolean(barrier) || waiting.some((request2) => request2.fence);
    }
  };
}
function fitWindowToDisplay(current, area, size) {
  const width = Math.min(size.width, area.width);
  const height = Math.min(size.height, area.height);
  return {
    x: Math.max(area.x, Math.min(current.x + current.width - width, area.x + area.width - width)),
    y: Math.max(area.y, Math.min(current.y, area.y + area.height - height)),
    width,
    height
  };
}
function interpolateWindowBounds(from, to, progress) {
  const t = Math.max(0, Math.min(1, progress));
  const ease = t * t * t * (t * (t * 6 - 15) + 10);
  return Object.fromEntries(
    ["x", "y", "width", "height"].map((key) => [
      key,
      Math.round(from[key] + (to[key] - from[key]) * ease)
    ])
  );
}
function fitWindowWidth(current, area, width) {
  const horizontal = fitWindowToDisplay(current, area, { width, height: current.height });
  return { ...horizontal, y: current.y, height: current.height };
}
const WINDOW_WIDTHS_SETTING_KEY = "windowWidths";
function parseWindowWidths(raw) {
  if (!raw) return {};
  try {
    const value = JSON.parse(raw);
    const width = (key) => {
      const item = value?.[key];
      return typeof item === "number" && Number.isFinite(item) && item >= 320 && item <= 1e4 ? Math.round(item) : void 0;
    };
    const expanded = width("expanded");
    const compact = width("compact");
    return { ...expanded ? { expanded } : {}, ...compact ? { compact } : {} };
  } catch {
    return {};
  }
}
const PLUGIN_PREFERENCES_SETTING_KEY = "deliveryPluginUpdates";
const PLUGIN_HARNESS_IDS = ["claude", "codex"];
const isControlPluginHarness = (value) => PLUGIN_HARNESS_IDS.includes(value);
const version = (value) => typeof value === "string" && /^[0-9A-Za-z.+-]{1,64}$/.test(value) ? value : null;
function parsePluginPreferences(raw) {
  let value;
  try {
    value = raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
  const result = {};
  if (!value || typeof value !== "object") return result;
  for (const harness of PLUGIN_HARNESS_IDS) {
    const entry = value[harness];
    if (!entry || typeof entry !== "object") continue;
    const preference = {};
    if (typeof entry.autoUpdate === "boolean") preference.autoUpdate = entry.autoUpdate;
    const last = entry.lastUpdate;
    if (last && typeof last === "object" && Number.isSafeInteger(last.at) && version(last.to))
      preference.lastUpdate = {
        at: last.at,
        from: version(last.from),
        to: version(last.to)
      };
    result[harness] = preference;
  }
  return result;
}
function pluginHarnessStatus(facts, preferences) {
  if (!Array.isArray(facts)) throw Error("Plugin status unavailable");
  return facts.filter((item) => isControlPluginHarness(item?.harness)).map((item) => ({
    harness: item.harness,
    label: String(item.label).slice(0, 80),
    available: item.available === true,
    installed: item.installed === true,
    version: version(item.version),
    latest: version(item.latest) ?? "",
    autoUpdate: preferences[item.harness]?.autoUpdate !== false,
    lastUpdate: preferences[item.harness]?.lastUpdate ?? null,
    connection: item.installed === true && (item.connection === "connected" || item.connection === "rejected") ? item.connection : null
  }));
}
const STEPS = /* @__PURE__ */ new Set(["key", "files", "register", "verify", "done", "failed"]);
function pluginInstallProgress(value) {
  const progress = value;
  if (!progress || !isControlPluginHarness(progress.harness) || !STEPS.has(progress.step) || typeof progress.message !== "string")
    return null;
  return {
    harness: progress.harness,
    step: progress.step,
    message: progress.message.slice(0, 300)
  };
}
function pluginInstallHarnesses(value) {
  if (!Array.isArray(value) || value.length === 0 || value.length > PLUGIN_HARNESS_IDS.length)
    throw Error("Choose Claude Code, Codex or both");
  if (!value.every(isControlPluginHarness)) throw Error("Unknown agent");
  return [...new Set(value)];
}
const SECRET = "github-credential.bin";
const META = "github-connection.json";
function createGitHubCredentialStore(deps) {
  return {
    /** Returns false when the keychain is unavailable; the caller keeps the credential in memory only. */
    async save(credential, meta) {
      if (!deps.box.isEncryptionAvailable()) {
        await this.clear();
        return false;
      }
      await deps.files.write(SECRET, deps.box.encryptString(JSON.stringify(credential)));
      await deps.files.write(META, Buffer.from(JSON.stringify(meta)));
      return true;
    },
    /** Connections saved by earlier builds (GitHub CLI or pasted tokens) are not restored. */
    async load() {
      const [secret, meta] = await Promise.all([deps.files.read(SECRET), deps.files.read(META)]);
      if (!secret || !meta || !deps.box.isEncryptionAvailable()) return void 0;
      try {
        const parsed = JSON.parse(meta.toString("utf8"));
        if (parsed.method !== "github-app" || typeof parsed.login !== "string") return void 0;
        const credential = parseGitHubUserCredential(JSON.parse(deps.box.decryptString(secret)));
        if (!credential) return void 0;
        return {
          credential,
          meta: {
            login: parsed.login.slice(0, 100),
            ...Number.isSafeInteger(parsed.userId) && Number(parsed.userId) > 0 ? { userId: Number(parsed.userId) } : {},
            method: "github-app",
            connectedAt: Number(parsed.connectedAt) || 0
          }
        };
      } catch {
        return void 0;
      }
    },
    async clear() {
      await Promise.all([deps.files.remove(SECRET), deps.files.remove(META)]);
    }
  };
}
const finite = (value) => typeof value === "number" && Number.isFinite(value) ? value : void 0;
const short = (value, max) => typeof value === "string" ? value.slice(0, max) : void 0;
function githubStatusView(meta, worker2, extra = {}) {
  const authorization = extra.authorization ? {
    userCode: String(extra.authorization.userCode).slice(0, 16),
    verificationUri: String(extra.authorization.verificationUri).slice(0, 200),
    expiresAt: finite(extra.authorization.expiresAt) ?? 0,
    ...extra.authorization.copied === true ? { copied: true } : {}
  } : void 0;
  const common = {
    ...extra.appConfigured !== void 0 ? { appConfigured: extra.appConfigured } : {},
    ...authorization ? { authorization } : {}
  };
  if (!meta) {
    const view2 = {
      connected: false,
      ...common,
      error: short(extra.error, 500)
    };
    return JSON.parse(JSON.stringify(view2));
  }
  const rate = worker2?.rateLimit;
  const view = {
    connected: true,
    login: short(meta.login, 100),
    method: "github-app",
    persisted: meta.persisted,
    connectedAt: finite(meta.connectedAt),
    lastSyncAt: finite(worker2?.lastSyncAt),
    syncing: worker2?.syncing === true,
    error: short(extra.error ?? worker2?.error, 500),
    rateLimit: rate ? {
      remaining: finite(rate.remaining),
      resetAt: finite(rate.resetAt),
      pausedUntil: finite(rate.pausedUntil)
    } : void 0,
    ...common
  };
  return JSON.parse(JSON.stringify(view));
}
function rendererLedgerRequestAllowed(operation, input) {
  if (operation === "githubSync") return false;
  return !(operation === "call" && input?.operation === "github_sync");
}
function createGitHubController(deps) {
  let meta;
  let credential;
  let pending2;
  let lastError;
  let queue = Promise.resolve();
  const serial = (work) => {
    const next = queue.then(work);
    queue = next.then(
      () => void 0,
      () => void 0
    );
    return next;
  };
  const sleep = deps.sleep ?? ((ms, signal) => new Promise((resolve) => {
    const timer2 = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer2);
      resolve();
    });
  }));
  async function status() {
    const extra = {
      appConfigured: Boolean(deps.app),
      authorization: pending2?.authorization,
      error: lastError
    };
    if (!meta) return githubStatusView(void 0, void 0, extra);
    const worker2 = await deps.worker.status().catch(() => ({ connected: false, error: "GitHub sync is unavailable. Restart Blume." }));
    return githubStatusView(meta, worker2, extra);
  }
  async function adopt(next, login, connectedAt) {
    const configured = await deps.worker.configure({
      token: next.accessToken,
      ...login ? { login } : {}
    });
    const nextMeta = {
      login: configured.login,
      ...configured.id ? { userId: configured.id } : {},
      method: "github-app",
      connectedAt
    };
    const persisted = await deps.credentials.save(next, nextMeta);
    credential = next;
    meta = { ...nextMeta, persisted };
  }
  function forget() {
    credential = void 0;
    meta = void 0;
  }
  const fresh = () => serial(async () => {
    if (!credential || !meta || !deps.app || !githubCredentialNeedsRefresh(credential, deps.now()))
      return;
    try {
      await adopt(
        await refreshGitHubUserCredential({
          fetch: deps.fetch,
          app: deps.app,
          credential,
          now: deps.now
        }),
        meta.login,
        meta.connectedAt
      );
      lastError = void 0;
    } catch (error) {
      if (error instanceof GitHubAuthorizationError && error.reason !== "unavailable") {
        await deps.worker.clear().catch(() => {
        });
        await deps.credentials.clear();
        forget();
      }
      lastError = error instanceof Error ? error.message : "GitHub access could not be renewed.";
    } finally {
      deps.changed();
    }
  });
  async function authorize(app, abort) {
    try {
      const code = await requestGitHubDeviceCode({
        fetch: deps.fetch,
        app,
        now: deps.now,
        signal: abort.signal
      });
      let copied = false;
      try {
        deps.copyText?.(code.userCode);
        copied = Boolean(deps.copyText);
      } catch {
        copied = false;
      }
      pending2 = {
        abort,
        authorization: {
          userCode: code.userCode,
          verificationUri: code.verificationUri,
          expiresAt: code.expiresAt,
          ...copied ? { copied } : {}
        }
      };
      deps.changed();
      void deps.openExternal(code.verificationUri).catch(() => {
      });
      const next = await pollGitHubDeviceAuthorization({
        fetch: deps.fetch,
        app,
        code,
        now: deps.now,
        sleep,
        signal: abort.signal
      });
      if (abort.signal.aborted) return;
      await serial(() => adopt(next, void 0, deps.now()));
      lastError = void 0;
      void deps.worker.sync({}).catch(() => {
      });
    } catch (error) {
      if (!(error instanceof GitHubAuthorizationError && error.reason === "cancelled"))
        lastError = error instanceof Error ? error.message : "GitHub could not be connected.";
    } finally {
      if (pending2?.abort === abort) pending2 = void 0;
      deps.changed();
    }
  }
  return {
    status,
    /** Restores a saved connection at startup, renewing an expired token first. */
    restore: () => serial(async () => {
      const saved = await deps.credentials.load();
      if (!saved) return;
      credential = saved.credential;
      meta = { ...saved.meta, persisted: true };
      if (!githubCredentialNeedsRefresh(saved.credential, deps.now()))
        await deps.worker.configure({
          token: saved.credential.accessToken,
          login: saved.meta.login
        });
      deps.changed();
    }).then(fresh),
    /** Starts authorization and returns at once with the code; completion arrives via `changed`. */
    async connect() {
      if (!deps.app)
        throw Error(
          "This build of Blume has no GitHub App configured. Set BLUME_GITHUB_APP_CLIENT_ID and BLUME_GITHUB_APP_SLUG."
        );
      if (!pending2) {
        lastError = void 0;
        const abort = new AbortController();
        pending2 = { abort, authorization: { userCode: "", verificationUri: "", expiresAt: 0 } };
        void authorize(deps.app, abort);
        for (let i = 0; i < 40 && pending2?.abort === abort && !pending2.authorization.userCode; i++)
          await sleep(50);
      }
      return status();
    },
    async cancelConnect() {
      pending2?.abort.abort();
      pending2 = void 0;
      deps.changed();
      return status();
    },
    async openAuthorization() {
      const uri = pending2?.authorization.verificationUri;
      if (uri) await deps.openExternal(uri);
    },
    /** Opens installing the app at the person's own repositories, or at the account chooser. */
    async openInstallation(input = {}) {
      if (!deps.app) throw Error("This build of Blume has no GitHub App configured.");
      await deps.openExternal(
        githubAppInstallUrl(deps.app, input.chooseAccount ? { chooseAccount: true } : { targetId: meta?.userId })
      );
    },
    disconnect: () => serial(async () => {
      pending2?.abort.abort();
      pending2 = void 0;
      lastError = void 0;
      await deps.worker.clear().catch(() => {
      });
      await deps.credentials.clear();
      forget();
      deps.changed();
      return status();
    }),
    async sync(input = {}) {
      await fresh();
      if (!meta) return status();
      const deliveryId = typeof input.deliveryId === "string" && input.deliveryId.length <= 160 ? input.deliveryId : void 0;
      await deps.worker.sync(deliveryId ? { deliveryId } : {});
      return status();
    },
    /**
     * A pull request's description and files at its synced head, read in the worker (cached there
     * by head commit). Invalid input is refused; anything GitHub or the worker does wrong is a
     * status, never a throw, so the review can say so.
     */
    async pullRequestContent(value) {
      const { target, headSha, updatedAt, baseBranch } = pullRequestContent.pullRequestContentRequest(value);
      const request2 = { pullRequestUrl: target.url, headSha };
      await fresh();
      if (!meta) return { status: "failed", ...request2, message: lastError ?? "Connect GitHub to read this pull request." };
      try {
        return await deps.worker.pullRequestContent({ ...request2, ...updatedAt !== void 0 ? { updatedAt } : {}, ...baseBranch ? { baseBranch } : {} });
      } catch (error) {
        return pullRequestContent.pullRequestContentFailure(request2, error instanceof Error && /timed out/i.test(error.message) ? Error("GitHub took too long to answer") : error);
      }
    },
    /** Runs GitHub work in the worker with a current token; rejects when not connected. */
    async withConnection(work) {
      await fresh();
      if (!meta) throw Error("Connect GitHub to see your projects.");
      return work();
    },
    connected: () => Boolean(meta)
  };
}
const SWITCHING = /* @__PURE__ */ new Set(["switch", "create", "accept", "leave"]);
function workspaceSwitches(input) {
  return SWITCHING.has(String(input?.action));
}
function workspaceRepaired(input, result) {
  return input?.action === "list" && result?.stale === true;
}
const REMOTE_IMAGE_ORIGINS = /* @__PURE__ */ new Set([
  "https://eu.i.posthog.com",
  "https://eu-assets.i.posthog.com"
]);
function remoteMediaAllowed(request2, ledgerEndpoint) {
  if (request2.resourceType !== "image" && request2.resourceType !== "media") return true;
  let target;
  try {
    target = new URL(request2.url);
  } catch {
    return false;
  }
  if (target.protocol !== "https:") return true;
  return ledgerEndpoint !== "" && target.origin === ledgerEndpoint || request2.resourceType === "image" && REMOTE_IMAGE_ORIGINS.has(target.origin);
}
function remoteMediaRequest(request2, ledgerEndpoint) {
  if (remoteMediaAllowed(request2, ledgerEndpoint)) return { cancel: false };
  const moved = ledgerEndpoint ? pullRequestContent.channelEvidenceUrl(request2.url, ledgerEndpoint) : void 0;
  return moved ? { redirectURL: moved } : { cancel: true };
}
function runtimeEvidence(request2) {
  if (request2.resourceType !== "image" && request2.resourceType !== "media") return false;
  try {
    const target = new URL(request2.url);
    return target.protocol === "https:" && target.hostname.startsWith("blume-dlv-runtime-") && target.pathname.startsWith("/evidence/");
  } catch {
    return false;
  }
}
function createLedgerMediaGate({ limit = 200, waitMs = 15e3 } = {}) {
  let endpoint = "";
  const held = /* @__PURE__ */ new Set();
  return {
    request(request2, callback) {
      if (endpoint || held.size >= limit || !runtimeEvidence(request2))
        return callback(remoteMediaRequest(request2, endpoint));
      const entry = {
        request: request2,
        callback,
        timer: setTimeout(() => {
          held.delete(entry);
          callback({ cancel: true });
        }, waitMs)
      };
      entry.timer.unref?.();
      held.add(entry);
    },
    /** The connected runtime is known (or changed): decide every request that waited for it. */
    connect(next) {
      endpoint = next;
      for (const entry of held) {
        clearTimeout(entry.timer);
        entry.callback(remoteMediaRequest(entry.request, endpoint));
      }
      held.clear();
    }
  };
}
function startDeliveryRuntime(options) {
  const { window, accounts, icon: appIcon2, native } = options;
  const requestContents = window.webContents;
  const requestContentsId = requestContents.id;
  const requestSession = requestContents.session;
  const webRequest = requestSession.webRequest;
  let requestHooksStopped = false;
  const requestOwnerGone = () => requestHooksStopped || window.isDestroyed() || requestContents.isDestroyed();
  const { ipcMain, safeStorage } = native;
  const lifecycle = (event, details = {}) => console.error(`[deliveries] ${event}`, details);
  let worker2;
  let cloudChatsEnabled = false;
  let flagEpoch = 0;
  async function refreshCloudFlag() {
    const epoch = ++flagEpoch;
    const enabled = await (options.cloudChats?.enabled().catch(() => false) ?? false);
    if (epoch !== flagEpoch) return;
    cloudChatsEnabled = enabled === true;
    worker2?.postMessage({ cloudChatsEnabled });
  }
  const stopCloudFlag = options.cloudChats?.subscribe(() => {
    void refreshCloudFlag();
  });
  const cloudFlagTimer = options.cloudChats ? setInterval(() => void refreshCloudFlag(), 3e4) : void 0;
  cloudFlagTimer?.unref();
  let workspaceEpoch = require$$0.randomUUID();
  const ledgerCookie = () => {
    const cookie = accounts?.cookie();
    return cookie ? `${cookie}; blume_workspace_epoch=${workspaceEpoch}` : cookie;
  };
  const cacheQueue = createLedgerQueue({
    post: (message) => {
      if (!worker2) return false;
      worker2.postMessage({ ...message, cloudChatsEnabled });
      return true;
    },
    inFlight: 8,
    queued: 1
  });
  const queue = createLedgerQueue({
    post: (message) => {
      if (!worker2) return false;
      worker2.postMessage({ ...message, cloudChatsEnabled });
      return true;
    },
    onFence: () => {
      workspaceEpoch = require$$0.randomUUID();
      ownedImageSources.clear();
      cacheQueue.failAll("Workspace changed");
    },
    fenceAfter: (message, result) => message.operation === "workspace" && workspaceRepaired(message.input, result)
  });
  let ready;
  let accountEpoch = 0;
  let changingAccount = false;
  let socialAccountChange;
  let accountChangeDone = Promise.resolve();
  let finishAccountChange;
  let ledgerEndpoint = "";
  const mediaGate = createLedgerMediaGate();
  let evidenceCacheOrigin = "";
  const ownedImageSources = /* @__PURE__ */ new Set();
  const evidenceWindows = /* @__PURE__ */ new Set();
  function dispatch(operation, input, timeoutMs, options2 = {}) {
    if (!worker2)
      return Promise.reject(Error("Blume ledger is unavailable. Restart the app to reconnect."));
    return queue.request(operation, input, ledgerCookie(), timeoutMs, options2);
  }
  function request2(operation, input = {}, timeoutMs = 65e3, fence = false) {
    const generation = queue.generation;
    return runForAccount(
      ready,
      () => accountEpoch,
      () => dispatch(operation, input, timeoutMs, { fence, generation })
    );
  }
  function local(operation, input, timeoutMs) {
    return ready.then(() => dispatch(operation, input, timeoutMs));
  }
  ready = new Promise((resolve, reject) => {
    worker2 = native.fork(options.workerPath, [
      ...options.plugin?.bundleDir ? [`--blume-plugin-bundle=${options.plugin.bundleDir}`] : [],
      ...options.pluginRegistry?.root ? [`--blume-evidence-root=${options.pluginRegistry.root}`] : []
    ]);
    const timeout = setTimeout(() => {
      reject(Error("Ledger startup timed out"));
      worker2?.kill();
    }, 15e3);
    worker2.on("message", (message) => {
      if (Array.isArray(message.ownedImageSources)) {
        if (changingAccount || queue.switchingWorkspace || !accounts.cookie() || message.cookie !== ledgerCookie() || message.ownedImageSources.length > 64)
          return;
        for (const source of message.ownedImageSources) {
          if (typeof source !== "string" || source.length > 8192) continue;
          try {
            const url = new URL(source);
            if (url.username || url.password || url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "127.0.0.1"))
              continue;
            url.hash = "";
            ownedImageSources.add(url.href);
            if (ownedImageSources.size > 1e3)
              ownedImageSources.delete(ownedImageSources.values().next().value);
          } catch {
          }
        }
        return;
      }
      if (typeof message.ownedTitleRequest === "string") {
        const target = worker2;
        const id = message.ownedTitleRequest;
        const epoch = accountEpoch;
        const generation = queue.generation;
        const cookie = ledgerCookie();
        const messages = ownedTitleMessages(message.messages);
        const current = () => !changingAccount && !queue.switchingWorkspace && epoch === accountEpoch && generation === queue.generation && Boolean(cookie) && cookie === ledgerCookie() && message.cookie === cookie;
        void (async () => {
          try {
            if (!options.ownedTitles || !messages || !current()) throw Error("No title");
            const title = (await options.ownedTitles.generate(messages))?.trim().slice(0, 100);
            if (!title || !current()) throw Error("No title");
            target?.postMessage({ ownedTitleResponse: id, title });
          } catch {
            target?.postMessage({ ownedTitleResponse: id, error: "No title" });
          }
        })();
        return;
      }
      if (typeof message.cloudTokenRequest === "string") {
        const target = worker2;
        const epoch = accountEpoch;
        const generation = queue.generation;
        const cookie = ledgerCookie();
        void (async () => {
          try {
            if (!cookie) throw new pullRequestContent.CloudAccountFailure("sign-in-required");
            if (changingAccount || queue.switchingWorkspace || message.cookie !== cookie)
              throw new pullRequestContent.CloudAccountFailure("account-changed");
            if (!accounts.cloudAccessToken) throw new pullRequestContent.CloudAccountFailure("account-unavailable");
            const token = await accounts.cloudAccessToken();
            if (changingAccount || queue.switchingWorkspace || epoch !== accountEpoch || generation !== queue.generation || cookie !== ledgerCookie())
              throw new pullRequestContent.CloudAccountFailure("account-changed");
            target?.postMessage({ cloudTokenResponse: message.cloudTokenRequest, token });
          } catch (error) {
            const failure = pullRequestContent.readCloudAccountFailure(error);
            console.warn("[deliveries] cloud-account-token-failed", {
              reason: failure.cloudAccountFailure
            });
            target?.postMessage({
              cloudTokenResponse: message.cloudTokenRequest,
              error: failure.message,
              cloudAccountFailure: failure.cloudAccountFailure
            });
          }
        })();
        return;
      }
      if (message.ready) {
        ledgerEndpoint = message.endpoint;
        evidenceCacheOrigin = typeof message.evidenceCacheOrigin === "string" ? message.evidenceCacheOrigin : "";
        mediaGate.connect(ledgerEndpoint);
        clearTimeout(timeout);
        void refreshCloudFlag();
        resolve();
        return;
      }
      if (message.pluginProgress) {
        const progress = pluginInstallProgress(message.pluginProgress);
        if (progress && !window.isDestroyed())
          window.webContents.send("control:plugin-progress", progress);
        return;
      }
      if (!cacheQueue.settle(message.id, message)) queue.settle(message.id, message);
    });
    worker2.once("exit", (code) => {
      ownedImageSources.clear();
      lifecycle("ledger-worker-exit", { code });
      clearTimeout(timeout);
      reject(Error("Ledger worker stopped"));
      worker2 = void 0;
      queue.failAll("Ledger worker stopped. Restart Blume.");
      cacheQueue.failAll("Ledger worker stopped");
    });
  });
  void ready.catch(() => {
  });
  const userData = native.userData;
  const github = createGitHubController({
    credentials: createGitHubCredentialStore({
      box: safeStorage,
      files: {
        read: (name) => require$$0$1.readFile(_n.join(userData, name)).catch(() => void 0),
        write: (name, data) => require$$0$1.writeFile(_n.join(userData, name), data, { mode: 384 }),
        remove: (name) => require$$0$1.rm(_n.join(userData, name), { force: true })
      }
    }),
    app: githubApp,
    fetch,
    openExternal: async (url) => {
      const target = new URL(url);
      if (target.protocol !== "https:" || target.hostname !== "github.com")
        throw Error("Unsupported GitHub URL");
      await native.openExternal(target.toString());
    },
    ...native.copyText ? { copyText: native.copyText } : {},
    worker: {
      configure: (input) => request2("github-configure", input),
      clear: () => request2("github-clear"),
      status: () => request2("github-status"),
      sync: (input) => request2("github-sync", input),
      // The worker answers `loading` after 30 seconds and keeps reading; this outlasts that.
      pullRequestContent: (input) => request2("github-pull-request-content", input, 45e3)
    },
    now: Date.now,
    changed: () => {
      if (!window.isDestroyed()) {
        window.webContents.send("control:github-changed");
        window.webContents.send("control:projects-changed");
      }
    }
  });
  void ready.then(() => github.restore()).catch(
    (error) => lifecycle("github-restore-failed", {
      message: error instanceof Error ? error.message : "unknown"
    })
  );
  const githubTimer = setInterval(() => {
    if (github.connected() && !changingAccount && accounts.cookie())
      void github.sync().catch(() => {
      });
  }, 6e4);
  const validSender = (event) => {
    if (requestOwnerGone() || event.sender !== requestContents || event.senderFrame !== requestContents.mainFrame)
      throw Error("Unknown sender");
  };
  function changed() {
    boundCookie = void 0;
    accountEpoch++;
    ownedImageSources.clear();
    queue.dropQueued("Account changed. Refresh to continue.");
    worker2?.postMessage({ feedClose: true });
    if (!requestOwnerGone()) requestContents.stop();
    for (const viewer of evidenceWindows) viewer.close();
    evidenceWindows.clear();
    if (!requestOwnerGone()) requestContents.send("control:account-changed");
    scheduleRegistry(3e3);
  }
  const unsubscribeAccount = accounts.onChanged?.(changed);
  ipcMain.handle("control:account", async (event, operation, input) => {
    validSender(event);
    if (operation === "cancelSocialSignIn") {
      const change = socialAccountChange;
      if (!change) return true;
      const cancelled = await accounts.cancelSocialSignIn();
      if (cancelled) {
        change.cancel();
        await accountChangeDone;
      }
      return cancelled;
    }
    if (operation === "providers") return accounts.providers();
    if (operation === "session") return changingAccount ? null : accounts.session();
    if (operation !== "signIn" && operation !== "signOut" && operation !== "signInSocial" && operation !== "signUp")
      throw Error("Unknown account operation");
    if (changingAccount) throw Error("An account change is already in progress");
    changingAccount = true;
    const socialChange = operation === "signInSocial" ? new SocialSignInAttempt() : void 0;
    socialAccountChange = socialChange;
    accountChangeDone = new Promise((resolve) => {
      finishAccountChange = resolve;
    });
    changed();
    try {
      if (registryApp && accounts.cookie()) {
        const revoke = local("plugin-registry-revoke", { root: registryApp.root }, 15e3).catch(() => {
        });
        await (socialChange ? socialChange.wait(revoke) : revoke);
      }
      socialChange?.signal.throwIfAborted();
      return operation === "signUp" ? await accounts.signUp(input) : operation === "signIn" ? await accounts.signIn(input) : operation === "signInSocial" ? await accounts.signInSocial(input) : await accounts.signOut();
    } finally {
      try {
        await requestSession.clearCache();
      } finally {
        socialChange?.dispose();
        socialAccountChange = void 0;
        changingAccount = false;
        finishAccountChange?.();
        changed();
      }
    }
  });
  const fromEvidenceWindow = (id) => [...evidenceWindows].some(
    (viewer) => !viewer.isDestroyed() && viewer.webContents.id === id
  );
  webRequest.onBeforeRequest((details, callback) => {
    const evidenceOwner = fromEvidenceWindow(details.webContentsId);
    const owned = details.webContentsId === requestContentsId || evidenceOwner;
    const finish2 = (decision) => callback(requestOwnerGone() && owned ? { cancel: true } : decision);
    if (requestOwnerGone()) {
      callback({ cancel: owned });
      return;
    }
    const fromAppDocument = details.webContentsId === requestContentsId && !details.frame?.parent;
    const fromEvidenceViewer = evidenceOwner && !details.frame?.parent;
    const cacheRequest = fromAppDocument && details.resourceType === "image" || fromEvidenceViewer && ["image", "mainFrame"].includes(details.resourceType);
    const target = new URL(details.url);
    if (cacheRequest && details.resourceType === "image" && ownedImageSources.has(target.href)) {
      finish2({ cancel: changingAccount || queue.switchingWorkspace || !accounts.cookie() });
      return;
    }
    if (cacheRequest && target.protocol === "http:" && target.hostname === "127.0.0.1") {
      const documentUrl = window.webContents.getURL?.();
      if (documentUrl && target.origin === new URL(documentUrl).origin) {
        finish2({ cancel: false });
        return;
      }
      finish2({
        cancel: changingAccount || !accounts.cookie() || target.origin !== evidenceCacheOrigin
      });
      return;
    }
    const fromCache = () => {
      if (requestOwnerGone()) {
        finish2({ cancel: owned });
        return;
      }
      if (!cacheRequest || target.origin !== ledgerEndpoint || !target.pathname.startsWith("/evidence/") || !evidenceCacheOrigin || changingAccount || !accounts.cookie()) {
        finish2({ cancel: false });
        return;
      }
      const epoch = accountEpoch;
      const lookup = cacheQueue.inFlight >= 8 ? Promise.resolve(null) : cacheQueue.request("evidence-cache-lookup", { url: details.url }, ledgerCookie(), 250);
      void lookup.then(
        (url) => {
          if (epoch !== accountEpoch || changingAccount) {
            finish2({ cancel: true });
            return;
          }
          finish2(
            typeof url === "string" && url.startsWith(`${evidenceCacheOrigin}/`) ? { redirectURL: url } : { cancel: false }
          );
        },
        () => finish2({ cancel: epoch !== accountEpoch || changingAccount })
      );
    };
    if (!fromAppDocument) {
      fromCache();
      return;
    }
    mediaGate.request(details, (decision) => {
      if ("cancel" in decision && !decision.cancel) fromCache();
      else finish2(decision);
    });
  });
  webRequest.onBeforeSendHeaders((details, callback) => {
    const owned = details.webContentsId === requestContentsId || fromEvidenceWindow(details.webContentsId);
    if (owned && requestOwnerGone()) {
      callback({ cancel: true });
      return;
    }
    const target = new URL(details.url);
    if (target.origin === evidenceCacheOrigin || target.origin !== ledgerEndpoint && ownedImageSources.has(target.href)) {
      const headers = Object.fromEntries(
        Object.entries(details.requestHeaders).filter(
          ([name]) => !["cookie", "authorization"].includes(name.toLowerCase())
        )
      );
      callback({ requestHeaders: headers });
      return;
    }
    if (owned && target.origin === ledgerEndpoint && target.pathname.startsWith("/evidence/")) {
      callback({
        requestHeaders: {
          ...details.requestHeaders,
          Cookie: changingAccount ? "" : ledgerCookie()
        }
      });
    } else callback({ requestHeaders: details.requestHeaders });
  });
  const messageChannel = native.messageChannel;
  if (messageChannel)
    ipcMain.on?.("control:feed", (event) => {
      try {
        validSender(event);
      } catch {
        return;
      }
      void ready.then(() => {
        if (event.sender.isDestroyed()) return;
        if (!worker2) throw Error("Ledger worker stopped");
        const { port1, port2 } = messageChannel();
        worker2.postMessage(
          {
            feed: {
              cookie: changingAccount ? "" : ledgerCookie(),
              ...registryApp ? { root: registryApp.root } : {}
            }
          },
          [port1]
        );
        event.sender.postMessage("control:feed", null, [port2]);
      }).catch(() => {
        if (!event.sender.isDestroyed()) event.sender.postMessage("control:feed", null);
      });
    });
  ipcMain.handle("control:request", (event, operation, input) => {
    validSender(event);
    if (!["call", "connect", "installations", "workspace"].includes(operation))
      throw Error("Unknown operation");
    if (!rendererLedgerRequestAllowed(operation, input))
      throw Error("GitHub facts are recorded only by Blume’s GitHub sync");
    if (changingAccount) throw Error("Account is changing. Try again after sign-in.");
    return (async () => {
      const call = operation === "call" ? input : void 0;
      if (call?.operation === "owned_codex_available") return true;
      if (["owned_cloud_files", "owned_cloud_subscription", "owned_local_tools"].includes(
        call?.operation ?? ""
      )) {
        const epoch = accountEpoch;
        await refreshCloudFlag();
        if (epoch !== accountEpoch || changingAccount) throw Error("Account changed. Try again.");
        if (!cloudChatsEnabled) throw Error("Cloud agents are not enabled.");
      }
      const ownedInput = input;
      const ownedAction = call?.operation === "owned_codex_chat" ? ownedInput?.input?.action : void 0;
      const provisioning = ownedAction === "create" && Boolean(ownedInput?.input?.cloud);
      if (registryApp && (ownedAction === "create" || ownedAction === "send")) {
        const epoch = accountEpoch;
        const cookie = ledgerCookie();
        if (!cookie) throw Error("Sign in to your Blume account.");
        if (boundCookie !== cookie) await syncRegistry();
        if (epoch !== accountEpoch || cookie !== ledgerCookie() || queue.switchingWorkspace)
          throw Error("Account or workspace changed. Try again.");
        if (boundCookie !== cookie)
          throw Error("Sign in to Blume and configure the agent connection first.");
      }
      return request2(
        operation,
        input,
        provisioning ? 365e3 : void 0,
        operation === "workspace" && workspaceSwitches(input)
      ).then((result) => {
        if (operation === "workspace" && (workspaceSwitches(input) || workspaceRepaired(input, result)))
          changed();
        return withAppLink(operation, result, options.appLink);
      }).catch((error) => {
        if (error instanceof Error && error.message.includes("Account session expired")) changed();
        throw error;
      });
    })();
  });
  ipcMain.handle("control:github", async (event, operation, input) => {
    validSender(event);
    if (operation === "status") return github.status();
    if (operation === "connect") return github.connect();
    if (operation === "cancel") return github.cancelConnect();
    if (operation === "openAuthorization") return github.openAuthorization();
    if (operation === "openInstallation")
      return github.openInstallation({ chooseAccount: input?.chooseAccount === true });
    if (operation === "disconnect") return github.disconnect();
    if (operation === "sync") {
      if (changingAccount) return github.status();
      return github.sync(input ?? {});
    }
    if (operation === "pullRequestContent") return github.pullRequestContent(input);
    throw Error("Unknown GitHub operation");
  });
  ipcMain.handle("control:projects", async (event, operation, input) => {
    validSender(event);
    const value = input ?? {};
    const path = typeof value.path === "string" && value.path.length <= 4096 ? value.path : void 0;
    if (operation === "browseGlobal") return request2("setup-global", {}, 3e4);
    if (operation === "readGlobalEntry") {
      if (!path) throw Error("Path required");
      return request2("setup-global-read", { path });
    }
    if (operation === "list")
      return github.withConnection(
        () => request2("github-projects", { refresh: value.refresh === true }, 6e4)
      );
    if (operation === "scan") {
      if (typeof value.projectId !== "string" || value.projectId.length > 64)
        throw Error("Project required");
      const projectId = value.projectId;
      return github.withConnection(() => request2("github-scan", { projectId }, 6e4));
    }
    if (operation === "readFile") {
      if (!path) throw Error("Path required");
      return github.withConnection(() => request2("github-read-file", { path }, 3e4));
    }
    throw Error("Unknown projects operation");
  });
  ipcMain.handle("control:open", async (event, url) => {
    validSender(event);
    const u = new URL(typeof url === "string" && ledgerEndpoint && pullRequestContent.channelEvidenceUrl(url, ledgerEndpoint) || url);
    if (!["https:", "http:"].includes(u.protocol)) throw Error("Unsupported evidence URL");
    if (u.origin === ledgerEndpoint && u.pathname.startsWith("/evidence/")) {
      const viewer = native.createWindow({
        icon: appIcon2,
        width: 900,
        height: 700,
        webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false }
      });
      evidenceWindows.add(viewer);
      viewer.on("closed", () => evidenceWindows.delete(viewer));
      viewer.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
      viewer.webContents.on("will-navigate", (event2) => event2.preventDefault());
      await viewer.loadURL(u.toString());
    } else await native.openExternal(u.toString());
  });
  const plugin = options.plugin;
  const preferences = () => parsePluginPreferences(plugin?.preferences.read());
  const pluginChanged = () => {
    if (!window.isDestroyed()) window.webContents.send("control:plugin-changed");
  };
  const pluginFlowerInput = () => {
    const flower = plugin?.flower?.();
    return flower ? { flower } : {};
  };
  const pluginMaintenance = Boolean(plugin?.automaticUpdates || plugin?.endpointMoves);
  const pluginSkipReasons = /* @__PURE__ */ new Map();
  async function updatePlugins() {
    if (!plugin || !pluginMaintenance || stopping) return true;
    const updates = plugin.automaticUpdates;
    let ok = true;
    const chosen = preferences();
    const outcomes = await local(
      "plugin-update",
      {
        autoUpdate: Object.fromEntries(
          PLUGIN_HARNESS_IDS.map((id) => [id, chosen[id]?.autoUpdate !== false])
        ),
        enabled: updates,
        moves: true,
        development: plugin.development,
        appLink: options.appLink,
        ...pluginFlowerInput()
      },
      6e5
    );
    const next = preferences();
    let changed2 = false;
    let moved = false;
    for (const outcome of Array.isArray(outcomes) ? outcomes : []) {
      if (!isControlPluginHarness(outcome.harness)) continue;
      if (outcome.updated && outcome.to && outcome.to !== outcome.from) {
        next[outcome.harness] = {
          ...next[outcome.harness],
          lastUpdate: { at: Date.now(), from: outcome.from, to: outcome.to }
        };
        changed2 = true;
      }
      if (outcome.recovery)
        lifecycle("plugin-move-recovered", { harness: outcome.harness, recovery: outcome.recovery });
      if (outcome.moved) {
        moved = true;
        lifecycle("plugin-endpoint-moved", { harness: outcome.harness, version: outcome.to });
      }
      if (!outcome.ok || outcome.reason === "unavailable") ok = false;
      const skip = JSON.stringify([outcome.reason ?? null, outcome.moveReason ?? null]);
      if ((outcome.reason || outcome.moveReason) && pluginSkipReasons.get(outcome.harness) !== skip)
        lifecycle("plugin-update-skipped", {
          harness: outcome.harness,
          reason: outcome.reason,
          moveReason: outcome.moveReason
        });
      pluginSkipReasons.set(outcome.harness, skip);
      if (outcome.error)
        lifecycle("plugin-update-failed", { harness: outcome.harness, message: outcome.error });
    }
    if (changed2) plugin.preferences.write(JSON.stringify(next));
    if (changed2 || moved) pluginChanged();
    if (registry && updates)
      await local(
        "plugin-agents-update",
        { root: registry.root, route: registry.channel },
        6e4
      ).catch((error) => {
        ok = false;
        lifecycle("plugin-update-failed", {
          harness: "agents",
          message: error instanceof Error ? error.message : "unknown"
        });
      });
    return ok;
  }
  const pluginUpdates = pluginMaintenance ? createPluginUpdateScheduler({
    run: updatePlugins,
    startupDelayMs: plugin?.updateDelayMs,
    schedule: (callback, delay2) => {
      const timer2 = setTimeout(callback, delay2);
      return () => clearTimeout(timer2);
    },
    onError: (error) => lifecycle("plugin-update-failed", {
      message: error instanceof Error ? error.message : "unknown"
    })
  }) : void 0;
  const registry = options.pluginRegistry;
  const registryApp = registry && {
    root: registry.root,
    channel: registry.channel,
    checkout: registry.checkout,
    label: registry.label,
    appLink: options.appLink ?? null,
    pid: process.pid,
    startedAt: Date.now()
  };
  let registrySync;
  let boundCookie;
  let registryTimer;
  function syncRegistry() {
    if (!registryApp || stopping) return;
    const cookie = ledgerCookie();
    const epoch = accountEpoch;
    if (registrySync?.cookie === cookie && registrySync.epoch === epoch) return registrySync.done;
    const current = () => epoch === accountEpoch && cookie === ledgerCookie() && !changingAccount && !stopping;
    const run = async () => {
      if (!current()) return;
      if (!accounts.cookie()) {
        await local("plugin-registry-clear", { root: registryApp.root }, 1e4);
        return;
      }
      const session = await accounts.session();
      if (!session || !current()) return;
      await request2("plugin-registry-sync", { ...registryApp, userId: session.user.id }, 12e4);
      if (!current()) return;
      boundCookie = cookie;
      void local(
        "plugin-registry-beat",
        {
          root: registryApp.root,
          pid: registryApp.pid,
          telemetry: registry?.telemetry?.() ?? null
        },
        1e4
      ).catch((error) => lifecycle("plugin-registry-beat-failed", { message: String(error) }));
    };
    const done = (registrySync?.done ?? Promise.resolve()).then(run, run).finally(() => {
      if (registrySync?.done === done) registrySync = void 0;
    });
    registrySync = { cookie, epoch, done };
    return done;
  }
  function refreshRegistry() {
    void syncRegistry()?.catch(
      (error) => lifecycle("plugin-registry-failed", {
        message: error instanceof Error ? error.message : "unknown"
      })
    );
  }
  const scheduleRegistry = (delayMs) => {
    clearTimeout(registryTimer);
    registryTimer = setTimeout(refreshRegistry, delayMs);
  };
  const registryRefresh = registryApp ? setInterval(refreshRegistry, 10 * 6e4) : void 0;
  const registryBeat = registryApp ? setInterval(
    () => void local(
      "plugin-registry-beat",
      {
        root: registryApp.root,
        pid: registryApp.pid,
        telemetry: registry?.telemetry?.() ?? null
      },
      1e4
    ).catch(() => {
    }),
    3e4
  ) : void 0;
  if (registryApp) scheduleRegistry(registry?.syncDelayMs ?? 5e3);
  ipcMain.handle("control:plugin", async (event, operation, input) => {
    validSender(event);
    if (!plugin) throw Error("The plugin installer is not available in this app");
    if (operation === "status")
      return pluginHarnessStatus(await local("plugin-status", {}, 3e4), preferences());
    if (operation === "devBuild") {
      if (registry?.channel !== "development") return { status: "release" };
      const build = boundCookie && boundCookie === ledgerCookie() && registryApp ? await local(
        "plugin-dev-build",
        { root: registryApp.root, pid: registryApp.pid },
        1e4
      ) : null;
      return build ? { status: "ready", build } : { status: "pending" };
    }
    if (operation === "install") {
      const harnesses = pluginInstallHarnesses(input?.harnesses);
      if (changingAccount) throw Error("Account is changing. Try again after sign-in.");
      try {
        return await local(
          "plugin-install",
          {
            harnesses,
            development: plugin.development,
            appLink: options.appLink,
            ...pluginFlowerInput()
          },
          harnesses.length * 33e4
        );
      } finally {
        pluginChanged();
      }
    }
    if ([
      "agents",
      "agentInstall",
      "agentRemove",
      "agentPrompt",
      "agentSetup",
      "agentInstallation"
    ].includes(operation)) {
      if (!registry) throw Error("Other agents are not available in this app");
      const id = input?.id;
      if (operation !== "agents" && (typeof id !== "string" || !/^[a-z][a-z0-9-]{0,39}$/.test(id)))
        throw Error("Unknown agent");
      const where = { root: registry.root, route: registry.channel, id };
      if (operation === "agents") return local("plugin-agents", where, 3e4);
      if (operation === "agentPrompt") return local("plugin-agent-prompt", where, 6e4);
      if (operation === "agentInstallation")
        return local("plugin-agent-installation", where, 3e4);
      if (operation === "agentSetup") {
        try {
          return await request2("plugin-agent-setup", where, 6e4);
        } finally {
          pluginChanged();
        }
      }
      try {
        return await local(
          operation === "agentInstall" ? "plugin-agent-install" : "plugin-agent-remove",
          where,
          33e4
        );
      } finally {
        pluginChanged();
      }
    }
    if (operation === "installation") {
      const harness = input?.harness;
      if (!isControlPluginHarness(harness)) throw Error("Unknown agent");
      return local("plugin-installation", { harness }, 3e4);
    }
    if (operation === "setAutoUpdate") {
      const value = input ?? {};
      if (!isControlPluginHarness(value.harness) || typeof value.enabled !== "boolean")
        throw Error("Invalid automatic update choice");
      const next = preferences();
      next[value.harness] = { ...next[value.harness], autoUpdate: value.enabled };
      plugin.preferences.write(JSON.stringify(next));
      pluginChanged();
      if (value.enabled) void pluginUpdates?.request();
      return;
    }
    throw Error("Unknown plugin operation");
  });
  let compactBounds;
  let resizing = false;
  const widths = { ...options.windowWidths?.read() };
  const layoutWidth = async () => {
    let timer2;
    try {
      const width = await Promise.race([
        window.webContents.executeJavaScript("document.querySelector('.cp-root')?.clientWidth"),
        new Promise((_, reject) => {
          timer2 = setTimeout(() => reject(Error("Window layout unavailable")), 1e3);
        })
      ]);
      if (typeof width !== "number" || !Number.isFinite(width) || width < 100 || width > 2e4)
        throw Error("Window layout unavailable");
      return width;
    } finally {
      clearTimeout(timer2);
    }
  };
  let widthTimer;
  let appWidth;
  window.on("resize", () => {
    if (resizing) return;
    clearTimeout(widthTimer);
    widthTimer = setTimeout(async () => {
      if (window.isDestroyed() || resizing) return;
      if (window.isMaximized() || window.isFullScreen()) return;
      const { width } = window.getBounds();
      if (width === appWidth) return;
      let renderedWidth;
      try {
        renderedWidth = await layoutWidth();
      } catch {
        return;
      }
      if (window.isDestroyed() || resizing || window.getBounds().width !== width) return;
      if (renderedWidth > 1200) widths.expanded = width;
      else widths.compact = width;
      options.windowWidths?.write(widths);
    }, 500);
  });
  ipcMain.handle("control:open-conversation-at", (event, pointer) => {
    validSender(event);
    if (!options.openConversationAt) throw Error("Conversations are not on this computer");
    const input = pointer ?? {};
    const bounded = (value) => typeof value === "string" && value.length > 0 && value.length <= 256;
    if (!bounded(input.harness) || !bounded(input.sessionId))
      throw Error("Invalid evidence pointer");
    if (input.messageId != null && !bounded(input.messageId))
      throw Error("Invalid evidence pointer");
    return options.openConversationAt({
      harness: input.harness,
      sessionId: input.sessionId,
      messageId: input.messageId ?? null
    });
  });
  ipcMain.handle("control:expand", async (event) => {
    validSender(event);
    if (!window || window.isDestroyed()) return false;
    if (resizing) return Boolean(compactBounds);
    const targetWindow = window;
    const current = targetWindow.getBounds();
    const area = native.workArea(current);
    const renderedWidth = await layoutWidth();
    if (targetWindow.isDestroyed() || targetWindow.getBounds().width !== current.width)
      throw Error("Window resized; try again");
    const scale = current.width / renderedWidth;
    const expandedWidth = (width) => width !== void 0 && width / scale > 1200;
    const compactWidth = (width) => width !== void 0 && width / scale <= 1200;
    if (!expandedWidth(widths.expanded)) delete widths.expanded;
    if (!compactWidth(widths.compact)) delete widths.compact;
    const expandedTarget = Math.min(
      expandedWidth(widths.expanded) ? widths.expanded : Math.round(1440 * scale),
      area.width - 60
    );
    const canExpand = expandedTarget / scale > 1200;
    const expanding = renderedWidth <= 1200 && canExpand;
    const compactTarget = compactWidth(compactBounds?.width) ? compactBounds.width : compactWidth(widths.compact) ? widths.compact : Math.round(400 * scale);
    const size = expanding ? { width: expandedTarget, height: current.height } : {
      width: canExpand ? compactTarget : Math.min(compactTarget, Math.round(400 * scale)),
      height: current.height
    };
    compactBounds = expanding ? current : void 0;
    const target = fitWindowWidth(current, area, size.width);
    appWidth = target.width;
    if (targetWindow.isMaximized()) targetWindow.unmaximize();
    const reduced = native.reducedMotion();
    if (reduced) targetWindow.setBounds(target);
    else {
      resizing = true;
      try {
        await new Promise((resolve) => {
          const started2 = performance.now();
          const timer2 = setInterval(() => {
            if (targetWindow.isDestroyed()) {
              clearInterval(timer2);
              resolve();
              return;
            }
            const progress = Math.min(1, (performance.now() - started2) / 420);
            targetWindow.setBounds(interpolateWindowBounds(current, target, progress));
            if (progress === 1) {
              clearInterval(timer2);
              resolve();
            }
          }, 16);
        });
      } finally {
        resizing = false;
      }
    }
    return target.width / scale > 1200;
  });
  let stopping;
  async function drain() {
    requestHooksStopped = true;
    stopCloudFlag?.();
    clearInterval(cloudFlagTimer);
    flagEpoch++;
    clearInterval(githubTimer);
    pluginUpdates?.stop();
    clearTimeout(registryTimer);
    clearInterval(registryRefresh);
    clearInterval(registryBeat);
    if (registryApp)
      await Promise.race([
        local(
          "plugin-registry-quit",
          { root: registryApp.root, pid: registryApp.pid },
          1e3
        ).catch(() => {
        }),
        new Promise((resolve) => setTimeout(resolve, 1e3))
      ]);
    unsubscribeAccount?.();
    let deadline;
    try {
      await Promise.race([
        request2("shutdown"),
        new Promise((resolve) => {
          deadline = setTimeout(resolve, 1800);
        })
      ]);
    } finally {
      clearTimeout(deadline);
      worker2?.kill();
      worker2 = void 0;
      for (const channel of [
        "account",
        "request",
        "github",
        "projects",
        "open",
        "expand",
        "open-conversation-at",
        "plugin"
      ])
        ipcMain.removeHandler(`control:${channel}`);
      ipcMain.removeAllListeners?.("control:feed");
      queue.failAll("Blume is closing");
      cacheQueue.failAll("Blume is closing");
    }
  }
  return {
    /** Registered conversations and the Skip choices, for the desktop parsing gate. */
    async conversationPolicy() {
      return await request2("agent-registrations");
    },
    /** Completes a signal's hosted evidence pointer from a pin resolved on this computer. */
    signalEvidenceComplete(input) {
      return request2("signal-evidence-complete", input);
    },
    /** Saves excluded projects' repositories as Use Blume Skip choices in the active workspace. */
    importLegacyExclusions(repositories) {
      return request2(
        "legacy-exclusions",
        { repositories },
        12e4
      );
    },
    /** The person chose another theme flower: installed plugins show it as their icon. */
    pluginFlowerChanged() {
      return pluginUpdates?.request() ?? Promise.resolve();
    },
    stop() {
      return stopping ??= drain();
    }
  };
}
function ownedTitleMessages(value) {
  if (!Array.isArray(value) || !value.length || value.length > pullRequestContent.OWNED_TITLE_EXCERPT.messages)
    return void 0;
  const messages = [];
  for (const item of value) {
    const { role, text } = item ?? {};
    if (role !== "user" && role !== "assistant" || typeof text !== "string" || !text.trim() || text.length > pullRequestContent.OWNED_TITLE_EXCERPT.chars)
      return void 0;
    messages.push({ role, text });
  }
  return messages.some((message) => message.role === "user") ? messages : void 0;
}
function withAppLink(operation, result, appLink) {
  if (operation !== "installations" || !appLink || !result || typeof result !== "object")
    return result;
  return { ...result, appLink };
}
const JSON_CONTENT_TYPE = /^application\/(?:[\w.+-]+\+)?json\s*(?:;|$)/i;
function readAccountSessionAnswer(response) {
  if (!response) return { kind: "unavailable", status: null };
  const unavailable = { kind: "unavailable", status: response.status };
  if (!JSON_CONTENT_TYPE.test(response.contentType?.trim() ?? "")) return unavailable;
  let body;
  try {
    body = JSON.parse(response.text);
  } catch {
    return unavailable;
  }
  if (response.status === 401) return { kind: "signedOut" };
  if (response.status !== 200) return unavailable;
  if (body === null) return { kind: "signedOut" };
  return isBetterAuthSession(body) ? { kind: "session", body } : unavailable;
}
function accountSessionExpiry(value) {
  if (!(value instanceof Date) && typeof value !== "string" && typeof value !== "number")
    return null;
  const parsed = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}
function isBetterAuthSession(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const { user, session } = value;
  return !!user && typeof user === "object" && typeof user.id === "string" && !!session && typeof session === "object" && accountSessionExpiry(session.expiresAt) !== null;
}
class AccountServiceUnavailableError extends Error {
  constructor(status = null) {
    super("The account service is temporarily unavailable. Try again shortly.");
    this.name = "AccountServiceUnavailableError";
    this.status = status === 401 ? null : status;
  }
}
function recordAccountSessionResponse() {
  let recorded = null;
  return {
    async onResponse({ response }) {
      recorded = {
        status: response.status,
        contentType: response.headers.get("content-type"),
        text: await response.clone().text().catch(() => "")
      };
    },
    response: () => recorded
  };
}
const loginFlowerDataUrl = "data:image/png;base64,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";
const escapeHtml$1 = (value) => value.replace(
  /[&<>"']/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
);
function accountOAuthPage({
  nonce = "",
  callback,
  script = ""
} = {}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>${callback ? "Opening Blume" : "Signed in to Blume"}</title>
    <style nonce="${nonce}">
      * { box-sizing: border-box; }
      html, body { min-height: 100%; }
      body {
        min-height: 100vh;
        min-height: 100dvh;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: #fbf1dc;
        color: #1a1a1a;
        font-family: "SN Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      main {
        width: min(360px, 100%);
        padding: 40px 32px 32px;
        border: 1px solid #ede3c6;
        border-radius: 12px;
        background: #fffcf2;
        box-shadow: 0 1px 2px rgba(94, 87, 71, 0.06);
        text-align: center;
      }
      .blume-flower {
        display: block;
        width: 64px;
        height: 64px;
        margin: 0 auto 18px;
        object-fit: contain;
      }
      h1 {
        margin: 0 0 8px;
        color: #1a1a1a;
        font-family: Gelica, Georgia, serif;
        font-size: 22px;
        font-weight: 500;
        letter-spacing: -0.01em;
        line-height: 1.25;
      }
      p {
        max-width: 26ch;
        margin: 0 auto;
        color: #5e5747;
        font-size: 14.5px;
        line-height: 1.55;
      }
      [hidden] { display: none !important; }
      a { display: inline-block; margin-top: 18px; color: #5e5747; font-size: 14px; }
      a:focus-visible { outline: 2px solid #5e5747; outline-offset: 4px; }
      footer {
        margin-top: 28px;
        padding-top: 16px;
        border-top: 1px solid #ede3c6;
        color: #8a8270;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.04em;
      }
      @media (prefers-reduced-motion: no-preference) {
        main {
          animation: settle 350ms ease-out both;
        }
        .blume-flower {
          animation: bloom 280ms 120ms ease-out both;
        }
        @keyframes settle {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bloom {
          from { opacity: 0; transform: translateY(2px) scale(0.88); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      }
    </style>
  </head>
  <body>
    <main>
      <img class="blume-flower" src="${loginFlowerDataUrl}" alt="">
      <h1 id="heading">${callback ? "Opening Blume" : "You're signed in"}</h1>
      <p id="message" role="status">${callback ? "Choose Open Blume in your browser to finish signing in." : "Blume is ready in the desktop app. You can close this tab."}</p>
      ${callback ? `<a id="open-blume" href="${escapeHtml$1(callback.href)}">Open Blume</a>` : ""}
      <footer>Blume</footer>
    </main>
    ${script ? `<script nonce="${nonce}">${script}<\/script>` : ""}
  </body>
</html>`;
}
const ELECTRON_LOGIN_ACK_PATH = "/api/auth/blume/electron/acknowledge";
const ELECTRON_LOGIN_RECEIPT_HEADER = "x-blume-login-receipt";
async function electronLoginReceipt(identifier) {
  if (!/^[a-zA-Z0-9]{32}$/.test(identifier)) return null;
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(identifier));
  return Array.from(new Uint8Array(hash), (value) => value.toString(16).padStart(2, "0")).join("");
}
async function electronReceiptFromCode(code) {
  if (code.length > 2048) return null;
  try {
    const encoded = decodeURIComponent(code).replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(encoded));
    return typeof decoded.identifier === "string" ? electronLoginReceipt(decoded.identifier) : null;
  } catch {
    return null;
  }
}
async function acknowledgeElectronLogin(code, authBaseUrl, getCookie, fetcher = fetch) {
  const receipt = await electronReceiptFromCode(code);
  if (!receipt) return false;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetcher(new URL(ELECTRON_LOGIN_ACK_PATH, authBaseUrl), {
        method: "POST",
        headers: {
          cookie: getCookie(),
          origin: new URL(authBaseUrl).origin,
          [ELECTRON_LOGIN_RECEIPT_HEADER]: receipt,
          "content-type": "application/json"
        },
        body: "{}",
        signal: AbortSignal.timeout(3e3),
        redirect: "error"
      });
      if (response.ok) return true;
      if (response.status < 500) return false;
    } catch {
    }
  }
  return false;
}
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
function parseAccountSessionDevices(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Auth service returned an invalid device list.");
  }
  const sessions = value.sessions;
  if (!Array.isArray(sessions)) throw new Error("Auth service returned an invalid device list.");
  return sessions.map((candidate) => {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
      throw new Error("Auth service returned an invalid device.");
    }
    const session = candidate;
    if (typeof session.id !== "string" || !session.id || typeof session.current !== "boolean" || !isFiniteNumber(session.createdAt) || !isFiniteNumber(session.updatedAt) || !isFiniteNumber(session.expiresAt) || session.ipAddress !== null && typeof session.ipAddress !== "string" || session.userAgent !== null && typeof session.userAgent !== "string") {
      throw new Error("Auth service returned an invalid device.");
    }
    return {
      id: session.id,
      current: session.current,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      expiresAt: session.expiresAt,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent
    };
  });
}
function loopbackLink(input) {
  if (typeof input !== "string" || input.length === 0 || input.length > 2048) return null;
  let url;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (host === "localhost" || host.endsWith(".localhost") || host === "::1") return url;
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  return ipv4 && Number(ipv4[1]) === 127 ? url : null;
}
function loopbackPort(url) {
  return url.port ? Number(url.port) : url.protocol === "https:" ? 443 : 80;
}
function accountCallbackToken(url, scheme) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== `${scheme}:`) return null;
  if (`/${parsed.hostname}${parsed.pathname}` !== "/auth/callback") return null;
  if (!parsed.hash.startsWith("#token=")) return null;
  const token = parsed.hash.slice("#token=".length);
  return token || null;
}
function findAccountCallbackUrl(argv, scheme) {
  return argv.find((value) => accountCallbackToken(value, scheme) !== null) ?? null;
}
const identityHost = createIdentityHost({
  createId: crypto$1.randomUUID,
  randomInt: crypto$1.randomInt,
  now: Date.now,
  appVersion: deliveryNative.app.getVersion(),
  readJson: index$1.readBlumeJson,
  writeJson: index$1.writeBlumeJson
});
function getOrCreateBlumeId() {
  return identityHost.getOrCreateBlumeId();
}
function getOrCreateBlumeDeviceId() {
  return index$1.getOrCreateSharedBlumeDeviceId();
}
function getOrCreateBlumeProfile() {
  return identityHost.getOrCreateBlumeProfile();
}
function setBlumeProfileEmail(email) {
  return identityHost.setBlumeProfileEmail(email);
}
function registerIdentityIpcHandlers(handleIpc2) {
  handleIpc2("identity:get", () => getOrCreateBlumeId());
  handleIpc2("identity:getProfile", () => getOrCreateBlumeProfile());
  handleIpc2("identity:setEmail", (_evt, email) => setBlumeProfileEmail(email));
}
const blumeUserHost = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getOrCreateBlumeDeviceId,
  getOrCreateBlumeId,
  getOrCreateBlumeProfile,
  registerIdentityIpcHandlers,
  setBlumeProfileEmail
}, Symbol.toStringTag, { value: "Module" }));
const SCHEMES = { stable: "blume", canary: "blume-canary", dev: "blume-dev" };
const ID = /^[A-Za-z0-9._:-]{1,160}$/;
function openAppChannel(value) {
  return value === "canary" || value === "dev" ? value : "stable";
}
function openAppLink(path, search) {
  if (path.length > 2e3) return null;
  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 2 || parts[0] !== "deliveries") return null;
  let id;
  try {
    id = decodeURIComponent(parts[1]);
  } catch {
    return null;
  }
  if (!ID.test(id)) return null;
  const query = new URLSearchParams();
  for (const key of ["work", "workspace"]) {
    const value = search.get(key);
    if (value !== null && ID.test(value)) query.set(key, value);
  }
  return `${SCHEMES[openAppChannel(search.get("app"))]}://deliveries/${encodeURIComponent(id)}${query.size ? `?${query}` : ""}`;
}
function appLinkFromUniversalLink(url, channel) {
  if (url.length > 2e3 || channel === "dev") return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.origin !== "https://blume.codes" || parsed.username || parsed.password || parsed.hash || !/^\/open\/deliveries\/[^/]+\/?$/.test(parsed.pathname))
    return null;
  const apps = parsed.searchParams.getAll("app");
  if (apps.length > 1 || apps.length === 1 && !["", "stable", "canary"].includes(apps[0]))
    return null;
  if ((apps[0] || "stable") !== channel) return null;
  for (const key of ["work", "workspace"]) {
    const values = parsed.searchParams.getAll(key);
    if (values.length > 1 || values.length === 1 && !ID.test(values[0])) return null;
  }
  return openAppLink(parsed.pathname.slice("/open/".length), parsed.searchParams);
}
const OPEN_EDITOR_LAUNCH_IPC_CHANNELS = /* @__PURE__ */ new Set([
  "conversations:openLocation",
  "system:openFileLocation",
  "system:openFolderLocation"
]);
const VSCODE_BUNDLE_ID = "com.microsoft.VSCode";
const ZED_BUNDLE_ID = "dev.zed.Zed";
const MACOS_MISSING_BUNDLE_PATTERN = /^open failed \(\d+\): LSCopyApplicationURLsForBundleIdentifier\(\) failed while trying to determine the application with bundle identifier (?:com\.microsoft\.VSCode|dev\.zed\.Zed)\.?$/;
const MACOS_MISSING_OPEN_TARGET_PATTERN = /^open failed \(\d+\): The file .+ does not exist\.?$/;
const WINDOWS_COMMAND_NOT_FOUND_MARKER = "is not recognized as an internal or external command";
const WINDOWS_EXIT_9009_PATTERN = /\bfailed \(9009\):/i;
const WINDOWS_EDITOR_LAUNCH_TARGET_PATTERN = /(?:^|[\s'"\\])(?:code(?:\.cmd)?|zed)(?:[\s'"]|$)|com\.microsoft\.VSCode|dev\.zed\.Zed/i;
const SPAWN_EDITOR_ENOENT_PATTERN = /\bspawn(?:Sync)? (?:code(?:\.cmd)?|zed) ENOENT\b/i;
const WINDOWS_EXPLORER_OPEN_FAILURE_PATTERN = /^explorer\.exe failed \(\d+\)(?:: The system cannot find the file specified\.?)?$/i;
function errorMessage$2(error) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return String(error ?? "");
}
function primaryErrorLine(message) {
  const firstLine = message.split(/\r?\n/, 1)[0]?.trim() ?? "";
  return firstLine.replace(/^Error:\s*/i, "").trim();
}
function isMacOsMissingEditorBundleFailure(message) {
  const line = primaryErrorLine(message);
  if (!MACOS_MISSING_BUNDLE_PATTERN.test(line)) return false;
  return line.includes(VSCODE_BUNDLE_ID) || line.includes(ZED_BUNDLE_ID);
}
function isMacOsMissingOpenTargetFailure(message) {
  return MACOS_MISSING_OPEN_TARGET_PATTERN.test(primaryErrorLine(message));
}
function isWindowsMissingEditorCommandFailure(message) {
  if (!WINDOWS_EXIT_9009_PATTERN.test(message)) return false;
  if (!message.includes(WINDOWS_COMMAND_NOT_FOUND_MARKER)) return false;
  return WINDOWS_EDITOR_LAUNCH_TARGET_PATTERN.test(message);
}
function isWindowsExplorerOpenFailure(message) {
  const normalized = message.replace(/^Error:\s*/i, "").trim();
  return WINDOWS_EXPLORER_OPEN_FAILURE_PATTERN.test(normalized);
}
function readStringProperty(error, key) {
  if (!error || typeof error !== "object") return void 0;
  if (!(key in error)) return void 0;
  const value = error[key];
  return typeof value === "string" ? value : void 0;
}
function isMissingEditorBinaryEnoent(error, message) {
  if (SPAWN_EDITOR_ENOENT_PATTERN.test(message)) return true;
  if (readStringProperty(error, "code") !== "ENOENT") return false;
  const syscall = readStringProperty(error, "syscall");
  if (syscall !== "spawn" && syscall !== "spawnSync") return false;
  const path = readStringProperty(error, "path");
  if (path === void 0) return false;
  const base = path.replace(/^.*[/\\]/, "").toLowerCase();
  return base === "code" || base === "code.cmd" || base === "zed";
}
function isExpectedOpenEditorLaunchFailure(error) {
  if (!(error instanceof Error) || error.constructor !== Error) return false;
  const message = errorMessage$2(error);
  if (!message) return false;
  if (isMacOsMissingEditorBundleFailure(message)) return true;
  if (isMacOsMissingOpenTargetFailure(message)) return true;
  if (isWindowsMissingEditorCommandFailure(message)) return true;
  if (isWindowsExplorerOpenFailure(message)) return true;
  if (isMissingEditorBinaryEnoent(error, message)) return true;
  return false;
}
function isExpectedOpenEditorLaunchIpcFailure(channel, error) {
  return OPEN_EDITOR_LAUNCH_IPC_CHANNELS.has(channel) && isExpectedOpenEditorLaunchFailure(error);
}
const SIGNED_OUT_MESSAGE = /^(?:unauthorized\.?|unauthenticated\.?|sign in required\.?)$/i;
function isAccountAuthenticationRequired(error) {
  if (typeof error === "string") return SIGNED_OUT_MESSAGE.test(error.trim());
  if (!error || typeof error !== "object") return false;
  const value = error;
  if (value.status === 401 || value.statusCode === 401) return true;
  if (value.code === "UNAUTHORIZED" || value.code === "UNAUTHENTICATED") return true;
  return typeof value.message === "string" && SIGNED_OUT_MESSAGE.test(value.message.trim());
}
const OPTIONAL_READ_CHANNELS = /* @__PURE__ */ new Set([
  "announcements:listActive",
  "chatwoot:widgetConfig",
  "chatwoot:widgetMessages",
  // Soft referrals worker calls; DNS/host/network/timeout churn is expected.
  "referrals:getStatus",
  "referrals:getLink",
  // Soft feedback board reads (guest-capable); host/network churn is expected.
  "feedbackBoard:listTop",
  "feedbackBoard:getAccess"
]);
const REFERRALS_OPTIONAL_SERVICE_CHANNEL = "referrals:getStatus";
const ACCOUNT_AUTH_TIMEOUT_CHANNELS = /* @__PURE__ */ new Set([
  "account:getSession",
  "account:signUp",
  "account:listSessions",
  "account:listDevices"
]);
const ACCOUNT_SESSION_CONNECTIVITY_CHANNELS = /* @__PURE__ */ new Set(["account:getSession"]);
const CONVERSATION_TITLE_REGENERATION_CONNECTIVITY_CHANNELS = /* @__PURE__ */ new Set([
  "db:conversations:regenerateTitle"
]);
const CONVERSATION_TITLE_EMPTY_MESSAGES_MESSAGE = "Conversation has no messages";
const INSIGHTS_COUNT_ABORT_TIMEOUT_CHANNELS = /* @__PURE__ */ new Set(["insights:countProcessedConversations"]);
const ACCOUNT_SOCIAL_SIGN_IN_TIMEOUT_MESSAGE = "Social sign-in timed out.";
const ACCOUNT_SERVICE_UNAVAILABLE_MESSAGE = "The account service is temporarily unavailable. Try again shortly.";
const ACCOUNT_AUTH_REQUEST_CHANNELS = /* @__PURE__ */ new Set([
  "account:getSocialProviders",
  "account:listSessions",
  "account:listDevices",
  "account:revokeSession"
]);
const ACCOUNT_SESSION_NOT_FRESH_MESSAGE = "Session is not fresh";
const SIGNED_OUT_READ_CHANNELS = /* @__PURE__ */ new Set(["account:listDevices", "account:listSessions"]);
const ACCOUNT_SIGN_IN_SIGN_UP_CHANNELS = /* @__PURE__ */ new Set(["account:signIn", "account:signUp"]);
const ACCOUNT_PASSWORD_VALIDATION_MESSAGE = "Password must be 10-128 characters";
const ACCOUNT_INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";
const ACCOUNT_USER_EXISTS_MESSAGE = "User already exists. Use another email.";
const TERMINAL_RESIZE_INVALID_SIZE_MESSAGE = "Invalid terminal size";
const TERMINAL_RESIZE_CHANNEL = "terminal:resize";
const UNKNOWN_TERMINAL_MESSAGE_PREFIX = "Unknown terminal:";
const TERMINAL_REQUIRE_TERMINAL_CHANNELS = /* @__PURE__ */ new Set([
  "terminal:write",
  "terminal:resize",
  "terminal:restart",
  "terminal:close"
]);
const ANNOUNCEMENTS_LIST_ACTIVE_CHANNEL = "announcements:listActive";
const ANNOUNCEMENTS_REQUEST_FAILED_MESSAGE = /^announcements request failed \(([1-5]\d{2})\)$/;
const CHATWOOT_WIDGET_MESSAGES_CHANNEL = "chatwoot:widgetMessages";
const CHATWOOT_WIDGET_MESSAGES_REQUEST_FAILED_MESSAGE = /^chatwoot widget messages failed: ([1-5]\d{2})$/;
const REFERRALS_HTTP_STATUS_CHANNELS = /* @__PURE__ */ new Set(["referrals:getStatus", "referrals:getLink"]);
const REFERRALS_REQUEST_FAILED_MESSAGE = /^referrals \/(?:status|code) -> ([1-5]\d{2})$/;
const CHATWOOT_WIDGET_SEND_MESSAGE_CHANNEL = "chatwoot:widgetSendMessage";
const CHATWOOT_SEND_MESSAGE_VALIDATION_MESSAGES = /* @__PURE__ */ new Set([
  "invalid chatwoot message",
  "chatwoot message is too long",
  "invalid chatwoot widget send message request"
]);
const NODE_NETWORK_FAILURE_KINDS = /* @__PURE__ */ new Map([
  ["ENOTFOUND", "name-resolution-failed"],
  ["EAI_AGAIN", "name-resolution-failed"],
  ["ENETDOWN", "network-unreachable"],
  ["ENETUNREACH", "network-unreachable"],
  ["EHOSTDOWN", "network-unreachable"],
  ["EHOSTUNREACH", "network-unreachable"],
  ["ETIMEDOUT", "request-timeout"],
  ["ECONNABORTED", "request-timeout"],
  ["ECONNRESET", "request-failed"],
  ["ECONNREFUSED", "request-failed"]
]);
const CHROMIUM_NETWORK_FAILURE_KINDS = /* @__PURE__ */ new Map([
  ["ERR_INTERNET_DISCONNECTED", "internet-disconnected"],
  ["ERR_NAME_NOT_RESOLVED", "name-resolution-failed"]
]);
const MAX_CAUSE_DEPTH = 8;
function classifyIpcErrorForReporting({
  channel,
  error,
  readIsOnline
}) {
  if (isExpectedSetupIpcPathRejection(channel, error)) {
    return { kind: "path-rejected" };
  }
  if (isExpectedIpcCancellation(channel, error)) {
    return { kind: "cancelled" };
  }
  if (SIGNED_OUT_READ_CHANNELS.has(channel)) {
    if (isAccountAuthenticationRequired(error)) {
      return { kind: "expected-auth-state" };
    }
    if (error instanceof Error && error.message === ACCOUNT_SESSION_NOT_FRESH_MESSAGE) {
      return { kind: "expected-auth-state" };
    }
  }
  const network = findNetworkFailure(error, 0, /* @__PURE__ */ new Set());
  if (!network) {
    const expected = findOptionalServiceFailure(channel, error);
    return expected ? { kind: "expected-service-failure", network: expected } : { kind: "unexpected" };
  }
  if (network.kind === "internet-disconnected" || (network.kind === "name-resolution-failed" || network.kind === "network-unreachable") && !readIsOnline()) {
    return { kind: "confirmed-offline", network };
  }
  if (OPTIONAL_READ_CHANNELS.has(channel) || ACCOUNT_SESSION_CONNECTIVITY_CHANNELS.has(channel) || CONVERSATION_TITLE_REGENERATION_CONNECTIVITY_CHANNELS.has(channel) && network.kind !== "request-timeout") {
    return { kind: "expected-service-failure", network };
  }
  return { kind: "unexpected" };
}
function shouldCaptureReferralServiceAppError(error) {
  return classifyIpcErrorForReporting({
    channel: REFERRALS_OPTIONAL_SERVICE_CHANNEL,
    error,
    // Online vs offline only chooses confirmed-offline vs expected-service-
    // failure; both are non-capturing for referrals. Force online so the
    // helper stays Electron-free for background adapters.
    readIsOnline: () => true
  }).kind === "unexpected";
}
async function invokeWithIpcErrorReporting({
  channel,
  invoke,
  readIsOnline,
  onPathRejected,
  onExpectedAuthState,
  onConfirmedOffline,
  onExpectedServiceFailure,
  onUnexpected
}) {
  try {
    return await invoke();
  } catch (error) {
    let disposition;
    try {
      disposition = classifyIpcErrorForReporting({
        channel,
        error,
        readIsOnline
      });
    } catch {
      throw error;
    }
    try {
      if (disposition.kind === "path-rejected") {
        onPathRejected();
      } else if (disposition.kind === "expected-auth-state") {
        onExpectedAuthState?.();
      } else if (disposition.kind === "confirmed-offline") {
        onConfirmedOffline(disposition.network, error);
      } else if (disposition.kind === "expected-service-failure") {
        onExpectedServiceFailure(disposition.network, error);
      } else if (disposition.kind === "unexpected") {
        onUnexpected(error);
      }
    } catch {
    }
    throw error;
  }
}
function isAbortOrTimeoutFailure(error) {
  return error.name === "TimeoutError" || error.message === "The operation was aborted due to timeout" || error.message === "The request timed out." || error.name === "AbortError" && error.message === "This operation was aborted";
}
function findOptionalServiceFailure(channel, error) {
  if (isExpectedOpenEditorLaunchIpcFailure(channel, error)) {
    return { kind: "request-failed", code: "OPEN_EDITOR_LAUNCH_FAILED" };
  }
  if (!(error instanceof Error)) return void 0;
  if (isAbortOrTimeoutFailure(error)) {
    if (OPTIONAL_READ_CHANNELS.has(channel) || ACCOUNT_AUTH_TIMEOUT_CHANNELS.has(channel) || INSIGHTS_COUNT_ABORT_TIMEOUT_CHANNELS.has(channel)) {
      return { kind: "request-timeout", code: "TIMEOUT" };
    }
    return void 0;
  }
  if (channel === "account:signInSocial" && error.message === ACCOUNT_SOCIAL_SIGN_IN_TIMEOUT_MESSAGE) {
    return { kind: "request-timeout", code: "TIMEOUT" };
  }
  if (ACCOUNT_AUTH_REQUEST_CHANNELS.has(channel) && error.message === ACCOUNT_SERVICE_UNAVAILABLE_MESSAGE) {
    return { kind: "request-failed", code: "ACCOUNT_SERVICE_UNAVAILABLE" };
  }
  if (ACCOUNT_SIGN_IN_SIGN_UP_CHANNELS.has(channel) && error instanceof TypeError && error.message === ACCOUNT_PASSWORD_VALIDATION_MESSAGE) {
    return { kind: "request-failed", code: "ACCOUNT_PASSWORD_VALIDATION" };
  }
  if (ACCOUNT_SIGN_IN_SIGN_UP_CHANNELS.has(channel) && error.constructor === Error) {
    if (error.message === ACCOUNT_INVALID_CREDENTIALS_MESSAGE) {
      return { kind: "request-failed", code: "ACCOUNT_INVALID_CREDENTIALS" };
    }
    if (error.message === ACCOUNT_USER_EXISTS_MESSAGE) {
      return { kind: "request-failed", code: "ACCOUNT_USER_EXISTS" };
    }
  }
  if (channel === TERMINAL_RESIZE_CHANNEL && error instanceof TypeError && error.message === TERMINAL_RESIZE_INVALID_SIZE_MESSAGE) {
    return { kind: "request-failed", code: "INVALID_TERMINAL_SIZE" };
  }
  if (TERMINAL_REQUIRE_TERMINAL_CHANNELS.has(channel) && error.constructor === Error && error.message.startsWith(UNKNOWN_TERMINAL_MESSAGE_PREFIX)) {
    return { kind: "request-failed", code: "UNKNOWN_TERMINAL" };
  }
  if (channel === ANNOUNCEMENTS_LIST_ACTIVE_CHANNEL && error.constructor === Error && ANNOUNCEMENTS_REQUEST_FAILED_MESSAGE.test(error.message)) {
    return { kind: "request-failed", code: "ANNOUNCEMENTS_REQUEST_FAILED" };
  }
  if (channel === CHATWOOT_WIDGET_MESSAGES_CHANNEL && error.constructor === Error && CHATWOOT_WIDGET_MESSAGES_REQUEST_FAILED_MESSAGE.test(error.message)) {
    return { kind: "request-failed", code: "CHATWOOT_WIDGET_MESSAGES_REQUEST_FAILED" };
  }
  if (REFERRALS_HTTP_STATUS_CHANNELS.has(channel) && error.constructor === Error && REFERRALS_REQUEST_FAILED_MESSAGE.test(error.message)) {
    return { kind: "request-failed", code: "REFERRALS_REQUEST_FAILED" };
  }
  if (channel === CHATWOOT_WIDGET_SEND_MESSAGE_CHANNEL && error.constructor === Error && CHATWOOT_SEND_MESSAGE_VALIDATION_MESSAGES.has(error.message)) {
    return { kind: "request-failed", code: "CHATWOOT_SEND_MESSAGE_VALIDATION" };
  }
  if (CONVERSATION_TITLE_REGENERATION_CONNECTIVITY_CHANNELS.has(channel) && error.constructor === Error && error.name === "Error" && error.message === CONVERSATION_TITLE_EMPTY_MESSAGES_MESSAGE) {
    return { kind: "request-failed", code: "CONVERSATION_TITLE_EMPTY_MESSAGES" };
  }
  if (isExpectedArtifactSyncDisabled(channel, error)) {
    return { kind: "request-failed", code: "ARTIFACT_SYNC_DISABLED" };
  }
  if (!(OPTIONAL_READ_CHANNELS.has(channel) || ACCOUNT_SESSION_CONNECTIVITY_CHANNELS.has(channel) || CONVERSATION_TITLE_REGENERATION_CONNECTIVITY_CHANNELS.has(channel))) {
    return void 0;
  }
  if (error instanceof TypeError && error.message === "fetch failed") {
    return { kind: "request-failed", code: "FETCH_FAILED" };
  }
  return void 0;
}
function findNetworkFailure(error, depth, seen) {
  if (depth > MAX_CAUSE_DEPTH || typeof error !== "object" || error === null || seen.has(error)) {
    return void 0;
  }
  seen.add(error);
  const candidate = error;
  if (typeof candidate.code === "string") {
    const kind = NODE_NETWORK_FAILURE_KINDS.get(candidate.code);
    if (kind) {
      return {
        kind,
        code: candidate.code,
        hostname: typeof candidate.hostname === "string" ? candidate.hostname : void 0
      };
    }
  }
  if (typeof candidate.message === "string") {
    for (const [code, kind] of CHROMIUM_NETWORK_FAILURE_KINDS) {
      if (candidate.message === `net::${code}`) return { kind, code };
    }
  }
  const fromCause = findNetworkFailure(candidate.cause, depth + 1, seen);
  if (fromCause) return fromCause;
  if (Array.isArray(candidate.errors)) {
    for (const member of candidate.errors) {
      const fromMember = findNetworkFailure(member, depth + 1, seen);
      if (fromMember) return fromMember;
    }
  }
  return void 0;
}
function reportReferralBackgroundFailure(source, error, deps) {
  if (!shouldCaptureReferralServiceAppError(error)) {
    deps.logInfo(
      source === "main.referral-claim" ? "expected referral claim service failure" : "expected referral activation service failure",
      {
        error_name: error instanceof Error ? error.name : typeof error,
        error_message: error instanceof Error ? error.message : String(error),
        reporting_action: "local_log_only"
      }
    );
    return;
  }
  deps.captureAppError(source, error);
}
const DEEP_LINK_PROTOCOL = "blume";
const CANARY_DEEP_LINK_PROTOCOL = "blume-canary";
const DEV_DEEP_LINK_PROTOCOL = "blume-dev";
const E2E_DEEP_LINK_PROTOCOL_ENV = "BLUME_E2E_DEEP_LINK_PROTOCOL";
const E2E_MODE_ENV = "BLUME_E2E_MODE";
const DEEP_LINK_PROTOCOL_PATTERN = /^[a-z][a-z0-9+.-]*$/;
function agentAppLink(isDev, releaseChannel) {
  const protocol = isDev ? DEV_DEEP_LINK_PROTOCOL : DEEP_LINK_PROTOCOL;
  return `${protocol}://plugin`;
}
function createDesktopNativeDeepLinkFacade(deps) {
  const e2eProtocol = e2eDeepLinkProtocol(deps);
  const e2eRouteProtocol = e2eProtocol ? `${e2eProtocol}:` : null;
  const packagedProtocol = deps.releaseChannel === "canary" ? CANARY_DEEP_LINK_PROTOCOL : DEEP_LINK_PROTOCOL;
  const packagedRouteProtocol = `${packagedProtocol}:`;
  const routeProtocols = Array.from(
    /* @__PURE__ */ new Set([
      ...deps.isDev ? DEEP_LINK_ROUTE_PROTOCOLS : [packagedRouteProtocol],
      ...e2eRouteProtocol ? [e2eRouteProtocol] : []
    ])
  );
  function registerProtocol() {
    try {
      if (deps.isDev) {
        const appPath = deps.appPath();
        deps.setAsDefaultProtocolClient(DEV_DEEP_LINK_PROTOCOL, deps.execPath, [appPath]);
        deps.log.debug("registered dev deep-link protocol", {
          protocol: DEV_DEEP_LINK_PROTOCOL,
          app_path: appPath
        });
        if (e2eProtocol) {
          deps.setAsDefaultProtocolClient(e2eProtocol, deps.execPath, [appPath]);
          deps.log.debug("registered e2e deep-link protocol", {
            protocol: e2eProtocol,
            app_path: appPath
          });
        }
        return;
      }
      deps.setAsDefaultProtocolClient(packagedProtocol);
      if ((deps.platform ?? process.platform) === "win32") {
        const accountProtocol = deps.releaseChannel === "canary" ? "codes.blume-canary" : "codes.blume";
        deps.setAsDefaultProtocolClient(accountProtocol);
      }
    } catch (err) {
      deps.log.error("failed to register deep-link protocol", err);
      void deps.captureAppError("main.deep-link-protocol", err);
    }
  }
  function handleUrl(url) {
    const universalLink = appLinkFromUniversalLink(url, deps.isDev ? "dev" : deps.releaseChannel);
    if (universalLink) url = universalLink;
    const protocol = urlProtocol(url);
    if (!universalLink && protocol === "https:") {
      deps.log.info("deep link rejected", {
        transport: "universal-link",
        reason: "invalid-or-unsupported-destination"
      });
    }
    if (!protocol || !routeProtocols.includes(protocol)) return;
    const invite = parseReferralInviteDeepLink(url);
    if (invite) {
      void deps.claimInvite(invite.code, invite.cid).then(() => deps.maybeReportReferralActivation()).catch((err) => {
        reportReferralBackgroundFailure("main.referral-claim", err, {
          logInfo: (message, properties2) => deps.log.info(message, properties2),
          captureAppError: (source, error) => {
            void deps.captureAppError(source, error);
          }
        });
      });
      deps.log.info("invite deep link claimed", { code: invite.code });
      deps.deliverDeepLinkPath("/deliveries");
      return;
    }
    const path = routePathFromDeepLink(url, { protocols: routeProtocols });
    if (!path) return;
    const properties = deepLinkTelemetryProperties(url, path);
    const websiteDistinctId = typeof properties.website_distinct_id === "string" ? properties.website_distinct_id : null;
    if (deps.shouldTrackUsageTelemetry && websiteDistinctId) {
      void deps.aliasTelemetryDistinctId(websiteDistinctId, properties);
    }
    if (deps.shouldTrackUsageTelemetry) {
      void deps.captureTelemetryEvent("app_deep_link_opened", properties);
      void deps.captureTelemetryEvent("app_opened", {
        ...properties,
        launch_source: "deep_link"
      });
    }
    deps.log.info("deep link routed", {
      protocol: routedProtocolFromUrl(url),
      transport: universalLink ? "universal-link" : "custom-scheme",
      path
    });
    deps.deliverDeepLinkPath(path);
  }
  function handleArgv(argv) {
    const url = argv.find(
      (arg) => routeProtocols.some((protocol) => arg.toLowerCase().startsWith(`${protocol}//`))
    );
    if (url) handleUrl(url);
  }
  function registerOpenUrlHandler() {
    deps.onOpenUrl((event, url) => {
      event.preventDefault();
      handleUrl(url);
    });
  }
  return {
    registerProtocol,
    registerOpenUrlHandler,
    handleArgv,
    handleLaunchArgv: () => handleArgv(deps.argv),
    handleUrl
  };
}
function e2eDeepLinkProtocol(deps) {
  const env = deps.env ?? process.env;
  if (!deps.isDev) return null;
  if (env[E2E_MODE_ENV] !== "1") return null;
  const protocol = env[E2E_DEEP_LINK_PROTOCOL_ENV]?.trim().toLowerCase();
  if (!protocol) return null;
  if (!DEEP_LINK_PROTOCOL_PATTERN.test(protocol)) return null;
  if (protocol === DEEP_LINK_PROTOCOL || protocol === CANARY_DEEP_LINK_PROTOCOL || protocol === DEV_DEEP_LINK_PROTOCOL) {
    return null;
  }
  return protocol;
}
function routedProtocolFromUrl(url) {
  return urlProtocol(url)?.slice(0, -1) ?? DEEP_LINK_PROTOCOL;
}
function urlProtocol(url) {
  try {
    return new URL(url).protocol;
  } catch {
    return null;
  }
}
const MAIN_BUSY_TIMEOUT_MS = 250;
const RETRY_DEADLINE_MS = 3e4;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function retryBusyAsync(store) {
  return new Proxy(store, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (typeof value !== "function") return value;
      return function(...args) {
        const call = () => Reflect.apply(value, target, args);
        const first = call();
        if (!(first instanceof Promise)) return first;
        const started2 = Date.now();
        const retry = async (attempt, result) => {
          try {
            return await result;
          } catch (error) {
            if (!isExpectedSqliteBusyError(error) || Date.now() - started2 > RETRY_DEADLINE_MS)
              throw error;
            await delay(Math.min(50 * 2 ** attempt, 1e3));
            return retry(attempt + 1, Promise.resolve().then(call));
          }
        };
        return retry(0, first);
      };
    }
  });
}
let cached$2 = null;
function getSettingsStorage(path) {
  if (cached$2 && cached$2.path !== path) {
    throw new Error(`Settings storage is already open for a different database: ${cached$2.path}`);
  }
  if (!cached$2) {
    cached$2 = {
      path,
      handle: sqliteStorage.openDesktopSqliteStorage(path, { busyTimeoutMs: 0 })
    };
  }
  return cached$2.handle.storage.settings;
}
function closeSettingsStorage() {
  if (!cached$2) return;
  cached$2.handle.close();
  cached$2 = null;
}
let cached$1 = null;
function getDbPath() {
  const override = utils.is.dev ? process.env.BLUME_DB_PATH?.trim() : void 0;
  if (override) return pn.isAbsolute(override) ? override : pn.resolve(process.cwd(), override);
  return pn.join(index$1.getBlumeRoot(), "blume.sqlite");
}
function getDb() {
  if (cached$1) return cached$1;
  const db = sqliteStorage.openDesktopSqliteDatabase(getDbPath());
  db.pragma(`busy_timeout = ${MAIN_BUSY_TIMEOUT_MS}`);
  cached$1 = db;
  return db;
}
function closeDb() {
  closeSettingsStorage();
  if (!cached$1) return;
  cached$1.close();
  cached$1 = null;
}
const SETTINGS_WRITE_RETRY_INTERVAL_MS = 25;
let settingsWriteQueue = Promise.resolve();
function isSqliteBusyError(error) {
  return !!error && typeof error === "object" && "code" in error && error.code === "SQLITE_BUSY";
}
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function attemptSettingsWrite(key, value) {
  return getSettingsStorage(getDbPath()).set(key, value);
}
async function persistSettingWithoutBlockingMain(key, value) {
  const deadline = Date.now() + sqliteStorage.DB_BUSY_TIMEOUT_MS;
  while (true) {
    try {
      await attemptSettingsWrite(key, value);
      return;
    } catch (error) {
      if (!isSqliteBusyError(error) || Date.now() >= deadline) throw error;
    }
    await wait(Math.min(SETTINGS_WRITE_RETRY_INTERVAL_MS, Math.max(1, deadline - Date.now())));
  }
}
function queueSettingWrite(key, value) {
  const write = settingsWriteQueue.then(() => persistSettingWithoutBlockingMain(key, value));
  settingsWriteQueue = write.catch(() => void 0);
  return write;
}
const settingsStore = evidencePins.createCachedKeyValueStore(
  {
    loadAll: () => getSettingsStorage(getDbPath()).getAll(),
    set: queueSettingWrite
  },
  {
    onPersistError: ({ key, error }) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[settings] failed to persist setting:", key, error);
      }
    }
  }
);
async function initializeSettingsStore() {
  await settingsStore.initialize();
}
function getSetting(key) {
  return settingsStore.get(key);
}
function getAllSettings() {
  return settingsStore.getAll();
}
function setSetting(key, value) {
  settingsStore.set(key, value);
}
async function getSettingAsync(key) {
  await initializeSettingsStore();
  return getSetting(key);
}
async function getAllSettingsAsync() {
  await initializeSettingsStore();
  return getAllSettings();
}
async function setSettingAsync(key, value) {
  await settingsStore.setAsync(key, value);
}
const ENC_PREFIX = "enc:v1:";
function setSecret(key, value) {
  if (!deliveryNative.safeStorage.isEncryptionAvailable()) {
    throw new Error("OS secure storage is unavailable; refusing to store the secret in plaintext.");
  }
  setSetting(key, ENC_PREFIX + deliveryNative.safeStorage.encryptString(value).toString("base64"));
}
function clearSecret(key) {
  setSetting(key, "");
}
function getSecret(key) {
  const raw = getSetting(key);
  if (raw === null || raw === "") return null;
  if (raw.startsWith(ENC_PREFIX)) {
    if (!deliveryNative.safeStorage.isEncryptionAvailable()) return null;
    try {
      return deliveryNative.safeStorage.decryptString(Buffer.from(raw.slice(ENC_PREFIX.length), "base64"));
    } catch {
      return null;
    }
  }
  if (deliveryNative.safeStorage.isEncryptionAvailable()) setSecret(key, raw);
  return raw;
}
const __vite_import_meta_env__$1 = { "MAIN_VITE_BLUME_RELEASE_BUNDLE": "blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9", "MAIN_VITE_BLUME_RELEASE_CHANNEL": "stable", "MAIN_VITE_BLUME_RELEASE_SHA": "bd358244228f4c4fa316832ce3ec57d2bd4b9ce9", "MAIN_VITE_BLUME_RELEASE_VERSION": "2.0.26" };
const AUTH_BASE_URL = process.env.BLUME_AUTH_URL?.replace(/\/+$/, "") || "https://auth.blume.codes";
const previewAuthPr = /^https:\/\/blume-auth-pr-([1-9][0-9]*)\.petal-preview\.com$/.exec(
  AUTH_BASE_URL
)?.[1];
const REQUEST_TIMEOUT_MS$6 = 1e4;
const releaseMetadata$1 = index$1.resolveDesktopReleaseMetadata(deliveryNative.app.getVersion(), __vite_import_meta_env__$1);
const ACCOUNT_PROTOCOL = process.defaultApp ? DEV_DEEP_LINK_PROTOCOL : releaseMetadata$1.channel === "canary" ? "codes.blume-canary" : "codes.blume";
const ACCOUNT_SIGN_IN_URL = process.env.BLUME_ACCOUNT_SIGN_IN_URL || "https://blume.codes/account/sign-in";
deliveryNative.app.userAgentFallback = deliveryNative.app.userAgentFallback.replace(/[^\x20-\x7e]/g, "").replace(/\s+/g, " ").trim();
const desktopDevice = {
  kind: "desktop",
  platform: process.platform === "darwin" ? "macos" : process.platform === "win32" ? "windows" : process.platform === "linux" ? "linux" : "unknown",
  name: "Blume desktop"
};
const desktopClientRelease = {
  version: releaseMetadata$1.version,
  channel: releaseMetadata$1.channel,
  sourceSha: releaseMetadata$1.sourceSha ?? "0000000000000000000000000000000000000000",
  bundleId: releaseMetadata$1.bundleId ?? "development"
};
async function registeredDesktopDevice() {
  return { ...desktopDevice, deviceId: await getOrCreateBlumeDeviceId() };
}
const accountChangeListeners = /* @__PURE__ */ new Set();
const cachedAccountTokens = /* @__PURE__ */ new Map();
const SESSION_REUSE_MS = 15e3;
const SESSION_STALE_MS = 10 * 6e4;
let sessionRead = null;
let lastSession = null;
let sessionEpoch = 0;
let knownSessionUser;
function invalidateAccountAccessTokens(next, readEpoch) {
  const keep = next !== void 0 && readEpoch === sessionEpoch;
  cachedAccountTokens.clear();
  sessionEpoch++;
  sessionRead = null;
  lastSession = null;
  knownSessionUser = void 0;
  if (keep) rememberSession(next);
  for (const listener of accountChangeListeners) listener();
}
const MAX_AVATAR_DATA_URL_LENGTH = 4e5;
const authClient = client.createAuthClient({
  baseURL: AUTH_BASE_URL,
  fetchOptions: {
    timeout: REQUEST_TIMEOUT_MS$6
  },
  plugins: [
    plugins.adminClient(),
    client$1.electronClient({
      signInURL: ACCOUNT_SIGN_IN_URL,
      protocol: { scheme: ACCOUNT_PROTOCOL },
      clientID: process.defaultApp ? "electron-dev" : "electron",
      storagePrefix: "blume-account",
      cookiePrefix: previewAuthPr ? `__Host-blumepr-${previewAuthPr}-__Secure-better-auth` : "better-auth",
      storage: {
        getItem: (name) => getSecret(`account.${name}`),
        setItem: (name, value) => setSecret(`account.${name}`, typeof value === "string" ? value : JSON.stringify(value))
      }
    })
  ]
});
const electronAccountClient = authClient;
const pendingAccountCallbackExchanges = /* @__PURE__ */ new Map();
const accountCallbackListeners = /* @__PURE__ */ new Set();
async function handleAccountDeepLink(url) {
  const token = accountCallbackToken(url, ACCOUNT_PROTOCOL);
  if (!token) return false;
  if (socialSignInStarted && !socialSignInAttempt) return true;
  const pending2 = pendingAccountCallbackExchanges.get(token);
  if (pending2) return pending2;
  const exchange = exchangeAccountCallbackToken(token).finally(() => {
    pendingAccountCallbackExchanges.delete(token);
  });
  pendingAccountCallbackExchanges.set(token, exchange);
  return exchange;
}
async function exchangeAccountCallbackToken(token) {
  const attempt = socialSignInAttempt;
  const { error } = await electronAccountClient.authenticate({
    token,
    ...attempt ? { fetchOptions: { signal: attempt.signal, onSuccess: () => attempt.commit() } } : {}
  });
  attempt?.signal.throwIfAborted();
  if (error) throw authError(error, "Account sign-in callback could not be completed.");
  invalidateAccountAccessTokens();
  for (const listener of accountCallbackListeners) listener();
  await acknowledgeElectronLogin(token, AUTH_BASE_URL, () => electronAccountClient.getCookie());
  return true;
}
async function handleAccountDeepLinkFromArgv(argv) {
  const url = findAccountCallbackUrl(argv, ACCOUNT_PROTOCOL);
  return url ? handleAccountDeepLink(url) : false;
}
electronAccountClient.setupMain({
  bridges: false,
  csp: false,
  scheme: false,
  getWindow: () => deliveryNative.BrowserWindow.getFocusedWindow()
});
function authError(error, fallback) {
  return new Error(error?.message?.trim() || fallback);
}
async function createAccountOAuthLoopback() {
  const successHtml = accountOAuthPage();
  let resolveToken;
  const token = new Promise((resolve) => {
    resolveToken = resolve;
  });
  let browserResponse;
  let accepted = false;
  const complete = (succeeded) => {
    if (!browserResponse || browserResponse.writableEnded) return;
    browserResponse.writeHead(succeeded ? 200 : 400, {
      "content-type": succeeded ? "text/html; charset=utf-8" : "text/plain; charset=utf-8",
      "cache-control": "no-store"
    });
    browserResponse.end(
      succeeded ? successHtml : "Sign-in could not be confirmed. Please try again in Blume."
    );
  };
  const server = require$$2.createServer((request2, response) => {
    const url = new URL(request2.url ?? "/", "http://127.0.0.1");
    const callbackToken = url.pathname === "/auth/callback" ? url.searchParams.get("token") : null;
    if (request2.method !== "GET" || !callbackToken || accepted) {
      response.writeHead(404).end();
      return;
    }
    accepted = true;
    browserResponse = response;
    resolveToken(callbackToken);
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Could not start the local account callback.");
  }
  return {
    callbackUrl: `http://127.0.0.1:${address.port}/auth/callback`,
    server,
    token,
    complete
  };
}
function requireEmail(value) {
  if (typeof value !== "string") throw new TypeError("Email is required");
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 254 || !email.includes("@")) {
    throw new TypeError("Enter a valid email address");
  }
  return email;
}
function requirePassword(value) {
  if (typeof value !== "string" || value.length < 10 || value.length > 128) {
    throw new TypeError("Password must be 10-128 characters");
  }
  return value;
}
function requireSignIn(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid sign-in request");
  }
  const input = value;
  return { email: requireEmail(input.email), password: requirePassword(input.password) };
}
function requireSignUp(value) {
  const signIn2 = requireSignIn(value);
  const name = value && typeof value === "object" && !Array.isArray(value) ? value.name : null;
  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
    throw new TypeError("Name must be 2-60 characters");
  }
  return { ...signIn2, name: name.trim() };
}
function requireName(value) {
  if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > 60) {
    throw new TypeError("Name must be 2-60 characters");
  }
  return value.trim();
}
function requireAvatar(value) {
  if (value === void 0 || value === null) return value;
  if (typeof value !== "string" || value.length > MAX_AVATAR_DATA_URL_LENGTH || !/^data:image\/(?:png|jpeg|webp|gif);base64,[a-z0-9+/]+={0,2}$/i.test(value)) {
    throw new TypeError("Avatar must be a PNG, JPEG, WebP, or GIF under 300 KB");
  }
  return value;
}
function requireProfileUpdate(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid profile update");
  }
  const input = value;
  if (input.name === void 0 && input.image === void 0) {
    throw new TypeError("Profile update must include a name or image");
  }
  return {
    ...input.name === void 0 ? {} : { name: requireName(input.name) },
    ...input.image === void 0 ? {} : { image: requireAvatar(input.image) ?? null }
  };
}
function requirePasswordChange(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid password change");
  }
  const input = value;
  return {
    currentPassword: requirePassword(input.currentPassword),
    newPassword: requirePassword(input.newPassword),
    revokeOtherSessions: input.revokeOtherSessions !== false
  };
}
function requireDelete(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid account deletion");
  }
  const password = value.password;
  return password === void 0 || password === "" ? {} : { password: requirePassword(password) };
}
function requireSocialProvider(value) {
  if (value !== "google" && value !== "github") {
    throw new TypeError("Unsupported social sign-in provider");
  }
  return value;
}
function timestamp(value) {
  if (!(value instanceof Date) && typeof value !== "string" && typeof value !== "number")
    return null;
  const parsed = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}
function accountSession(value, hasPassword = true) {
  if (!value) return null;
  const expiresAt = timestamp(value.session.expiresAt);
  if (!Number.isFinite(expiresAt)) return null;
  const user = client$1.normalizeUserOutput(value.user);
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      // Better Auth's proxy caches by URL for an hour; include the profile revision so
      // replacing an image refreshes every renderer without exposing the original URL.
      image: user.image ? `${user.image}?v=${timestamp(value.user.updatedAt) ?? 0}` : null,
      hasPassword,
      roles: (value.user.role ?? "").split(",").map((role) => role.trim()).filter(Boolean)
    },
    expiresAt
  };
}
class AccountRequestError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
async function authRequest(path, init = {}) {
  let response;
  try {
    response = await fetch(`${AUTH_BASE_URL}${path}`, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS$6),
      headers: {
        Accept: "application/json",
        Cookie: electronAccountClient.getCookie(),
        "Electron-Origin": `${ACCOUNT_PROTOCOL}:/`,
        ...init.body ? { "Content-Type": "application/json" } : {},
        ...init.headers
      }
    });
  } catch {
    throw new Error("The account service is temporarily unavailable. Try again shortly.");
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new AccountRequestError(
      response.status,
      typeof body?.message === "string" ? body.message : typeof body?.error === "string" ? body.error : `Account request failed (${response.status})`
    );
  }
  return body;
}
function getAccountSession() {
  const now = Date.now();
  const read = sessionRead;
  if (read && (!read.settled || now - read.at < SESSION_REUSE_MS)) {
    return !read.settled && staleSession(now) ? Promise.resolve(lastSession.value) : read.promise;
  }
  const promise = startSessionRead();
  return staleSession(now) ? Promise.resolve(lastSession.value) : promise;
}
function staleSession(now) {
  if (!lastSession || now - lastSession.at >= SESSION_STALE_MS) return false;
  return lastSession.value === null || lastSession.value.expiresAt > now;
}
function startSessionRead() {
  const epoch = sessionEpoch;
  const promise = readAccountSession();
  const read = { at: Date.now(), promise, settled: false };
  sessionRead = read;
  promise.then(
    (value) => {
      read.settled = true;
      if (epoch !== sessionEpoch) return;
      lastSession = { at: read.at, value };
      const user = value?.user.id ?? null;
      const previousUser = knownSessionUser;
      knownSessionUser = user;
      if (previousUser !== void 0 && previousUser !== user) {
        sessionEpoch++;
        cachedAccountTokens.clear();
        for (const listener of accountChangeListeners) listener();
      }
    },
    () => {
      read.settled = true;
      if (sessionRead === read) sessionRead = null;
      if (epoch === sessionEpoch) lastSession = null;
    }
  );
  return promise;
}
function rememberSession(value) {
  const at = Date.now();
  sessionRead = { at, promise: Promise.resolve(value), settled: true };
  lastSession = { at, value };
  knownSessionUser = value.user.id;
}
async function readAccountSession() {
  const recorder = recordAccountSessionResponse();
  const accountsRead = authClient.listAccounts().catch(() => ({ data: null, error: true }));
  const { data } = await authClient.getSession({
    fetchOptions: { onResponse: recorder.onResponse }
  });
  const answer = readAccountSessionAnswer(recorder.response());
  if (answer.kind === "signedOut") return null;
  if (answer.kind === "unavailable") throw new AccountServiceUnavailableError(answer.status);
  const { data: accounts, error: accountsError } = await accountsRead;
  const hasPassword = accountsError || !Array.isArray(accounts) ? true : accounts.some((account) => account.providerId === "credential");
  const session = accountSession(data, hasPassword);
  if (!session) throw new AccountServiceUnavailableError();
  return session;
}
async function getSocialProviders() {
  const body = await authRequest("/v1/account/providers");
  if (!Array.isArray(body.providers)) return [];
  return body.providers.flatMap((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return [];
    const provider = value;
    if (provider.id !== "google" && provider.id !== "github" || typeof provider.enabled !== "boolean") {
      return [];
    }
    return [{ id: provider.id, enabled: provider.enabled }];
  });
}
let socialSignInAttempt = null;
let socialSignInStarted = false;
async function cancelSocialSignIn() {
  const attempt = socialSignInAttempt;
  if (!attempt) return true;
  if (!attempt.cancel()) return false;
  if (socialSignInAttempt === attempt) socialSignInAttempt = null;
  return true;
}
async function signInSocial(provider) {
  if (socialSignInAttempt) throw new Error("A browser sign-in is already in progress.");
  const attempt = new SocialSignInAttempt();
  socialSignInStarted = true;
  socialSignInAttempt = attempt;
  try {
    return await completeSocialSignIn(provider, attempt);
  } finally {
    attempt.dispose();
    if (socialSignInAttempt === attempt) socialSignInAttempt = null;
  }
}
async function completeSocialSignIn(provider, attempt) {
  let loopback = null;
  let onCallback;
  const cleanup = () => {
    if (onCallback) accountCallbackListeners.delete(onCallback);
    loopback?.complete(false);
    loopback?.server.close();
  };
  attempt.signal.addEventListener("abort", cleanup, { once: true });
  try {
    if (process.defaultApp) loopback = await createAccountOAuthLoopback();
    attempt.signal.throwIfAborted();
    const callback = loopback ? null : new Promise((resolve) => {
      onCallback = resolve;
      accountCallbackListeners.add(resolve);
    });
    await attempt.wait(
      electronAccountClient.requestAuth({
        provider,
        signal: attempt.signal,
        ...loopback ? { additionalData: { callbackUrl: loopback.callbackUrl } } : ACCOUNT_PROTOCOL === "codes.blume-canary" ? { additionalData: { callbackScheme: ACCOUNT_PROTOCOL } } : {}
      })
    );
    if (loopback) {
      const token = await attempt.wait(loopback.token);
      attempt.signal.throwIfAborted();
      const { error } = await attempt.wait(
        electronAccountClient.authenticate({
          token,
          fetchOptions: { signal: attempt.signal, onSuccess: () => attempt.commit() }
        })
      );
      if (error) throw authError(error, "Account sign-in callback could not be completed.");
    } else {
      await attempt.wait(callback);
    }
    attempt.signal.throwIfAborted();
    const readEpoch = sessionEpoch;
    const session = await attempt.wait(readAccountSession());
    attempt.signal.throwIfAborted();
    if (!session) throw new Error("Signed in, but the session could not be loaded");
    loopback?.complete(true);
    invalidateAccountAccessTokens(session, readEpoch);
    return session;
  } finally {
    attempt.signal.removeEventListener("abort", cleanup);
    cleanup();
  }
}
async function signUp(input) {
  const { error } = await authClient.signUp.email({
    name: input.name,
    email: input.email,
    password: input.password
  });
  if (error) throw authError(error, "Account could not be created.");
  const readEpoch = sessionEpoch;
  const session = await readAccountSession();
  if (!session) throw new Error("Account was created, but the session could not be loaded");
  invalidateAccountAccessTokens(session, readEpoch);
  return session;
}
async function signIn(input) {
  const { error } = await authClient.signIn.email({
    email: input.email,
    password: input.password
  });
  if (error) throw authError(error, "Sign in failed.");
  const readEpoch = sessionEpoch;
  const session = await readAccountSession();
  if (!session) throw new Error("Signed in, but the session could not be loaded");
  invalidateAccountAccessTokens(session, readEpoch);
  return session;
}
async function signOut() {
  const { error } = await authClient.signOut();
  if (error) throw authError(error, "Sign out failed.");
  invalidateAccountAccessTokens();
}
async function updateProfile(input) {
  const { error } = await authClient.updateUser({
    ...input.name === void 0 ? {} : { name: input.name },
    ...input.image === void 0 ? {} : { image: input.image }
  });
  if (error) throw authError(error, "Profile could not be updated.");
  invalidateAccountAccessTokens();
  const session = await getAccountSession();
  if (!session) throw new Error("Profile was updated, but the session could not be loaded");
  return session;
}
async function changePassword(input) {
  const { error } = await authClient.changePassword({
    currentPassword: input.currentPassword,
    newPassword: input.newPassword,
    revokeOtherSessions: input.revokeOtherSessions !== false
  });
  if (error) throw authError(error, "Password could not be changed.");
}
async function listSessions() {
  if (!await getAccountSession()) return [];
  return parseAccountSessionDevices(await authRequest("/api/auth/blume/device-sessions"));
}
async function listDevices() {
  const [installationId, device] = await Promise.all([
    getOrCreateBlumeId(),
    registeredDesktopDevice()
  ]);
  let response;
  try {
    response = await authRequest("/v1/account/devices", {
      method: "POST",
      body: JSON.stringify({ installationId, device, clientRelease: desktopClientRelease })
    });
  } catch (error) {
    if (!(error instanceof Error) || error.message !== "Not found.") throw error;
    if (!await getAccountSession()) return [];
    const now = Date.now();
    return [
      { id: installationId, current: true, createdAt: now, lastSeenAt: now, ...desktopDevice }
    ];
  }
  return (response.devices ?? []).flatMap((device2) => {
    if (typeof device2.id !== "string" || device2.client_kind !== "desktop" && device2.client_kind !== "web" || !["macos", "windows", "linux", "unknown"].includes(String(device2.platform)) || typeof device2.display_name !== "string") {
      return [];
    }
    const createdAt = timestamp(device2.created_at);
    const lastSeenAt = timestamp(device2.last_seen_at);
    if (createdAt === null || lastSeenAt === null) return [];
    return [
      {
        id: device2.id,
        current: device2.id === installationId,
        createdAt,
        lastSeenAt,
        kind: ["desktop", "runner", "browser"].includes(String(device2.runtime_kind)) ? device2.runtime_kind : device2.client_kind === "desktop" ? "desktop" : "browser",
        platform: device2.platform,
        name: device2.display_name
      }
    ];
  });
}
async function revokeSession(sessionId) {
  if (!sessionId || sessionId.length > 200) throw new TypeError("Invalid session");
  await authRequest(`/api/auth/blume/device-sessions/${encodeURIComponent(sessionId)}`, {
    method: "POST",
    body: JSON.stringify({})
  });
}
async function revokeOtherSessions() {
  const { error } = await authClient.revokeOtherSessions();
  if (error) throw authError(error, "Other sessions could not be revoked.");
}
async function deleteAccount(input) {
  const { error } = await authClient.deleteUser(input.password ? { password: input.password } : {});
  if (error) throw authError(error, "Account could not be deleted.");
  invalidateAccountAccessTokens();
}
async function accountAccessToken(audience, scopes) {
  const cached2 = cachedAccountTokens.get(audience);
  if (cached2 && cached2.expiresAt > Date.now() + 3e4) return cached2.value;
  const [installationId, device] = await Promise.all([
    getOrCreateBlumeId(),
    registeredDesktopDevice()
  ]);
  const token = await authRequest("/v1/account/token", {
    method: "POST",
    body: JSON.stringify({
      installationId,
      device,
      clientRelease: desktopClientRelease,
      audience,
      scopes
    })
  });
  if (typeof token.accessToken !== "string") throw new Error("Auth service returned no token");
  const expiresAt = Date.parse(String(token.expiresAt));
  if (!Number.isFinite(expiresAt)) throw new Error("Auth service returned an invalid token expiry");
  cachedAccountTokens.set(audience, { value: token.accessToken, expiresAt });
  return token.accessToken;
}
async function getFeedbackAccountAccessToken() {
  return accountAccessToken("feedback-board", ["feedback:read", "feedback:write"]);
}
async function getArtifactSyncAccountAccessToken() {
  return accountAccessToken("artifact-sync", ["artifact-sync:read", "artifact-sync:write"]);
}
async function getRouterAccountAccessToken() {
  return accountAccessToken("router", ["router:provision"]);
}
function registerAccountIpcHandlers(handleIpc2) {
  handleIpc2("account:requestPasswordReset", async (_event, email) => {
    const { error } = await authClient.requestPasswordReset({
      email: requireEmail(email),
      redirectTo: new URL("/account/reset-password", AUTH_BASE_URL).href
    });
    if (error) throw authError(error, "Password recovery is temporarily unavailable.");
  });
  handleIpc2("account:getSession", () => getAccountSession());
  handleIpc2("account:getSocialProviders", () => getSocialProviders());
  handleIpc2("account:signUp", (_event, input) => signUp(requireSignUp(input)));
  handleIpc2("account:signIn", (_event, input) => signIn(requireSignIn(input)));
  handleIpc2("account:cancelSocialSignIn", () => cancelSocialSignIn());
  handleIpc2(
    "account:signInSocial",
    (_event, provider) => signInSocial(requireSocialProvider(provider))
  );
  handleIpc2("account:updateProfile", (_event, input) => updateProfile(requireProfileUpdate(input)));
  handleIpc2(
    "account:changePassword",
    (_event, input) => changePassword(requirePasswordChange(input))
  );
  handleIpc2("account:listSessions", () => listSessions());
  handleIpc2("account:listDevices", () => listDevices());
  handleIpc2(
    "account:revokeSession",
    (_event, sessionId) => revokeSession(typeof sessionId === "string" ? sessionId : "")
  );
  handleIpc2("account:revokeOtherSessions", () => revokeOtherSessions());
  handleIpc2("account:delete", (_event, input) => deleteAccount(requireDelete(input)));
  handleIpc2("account:signOut", () => signOut());
}
const deliveryAccounts = {
  cookie: () => electronAccountClient.getCookie(),
  cloudAccessToken: async () => {
    try {
      return await accountAccessToken("deliveries", ["deliveries:use"]);
    } catch (error) {
      throw pullRequestContent.cloudAccountTokenFailure(
        error instanceof AccountRequestError ? error.status : void 0
      );
    }
  },
  session: getAccountSession,
  providers: async () => (await getSocialProviders()).filter((p) => p.enabled).map((p) => p.id),
  signIn: (input) => signIn(requireSignIn(input)),
  signUp: (input) => signUp(requireSignUp(input)),
  signInSocial: (provider) => signInSocial(requireSocialProvider(provider)),
  cancelSocialSignIn,
  signOut,
  onChanged: (listener) => {
    accountChangeListeners.add(listener);
    return () => {
      accountChangeListeners.delete(listener);
    };
  }
};
const BLUME_BACKGROUND_PROCESS_SERVICES = {
  conversationAction: "blume-conversation-action-worker",
  conversationList: "blume-conversation-list-worker",
  parserBinding: "blume-parser-binding",
  projectPathResolution: "blume-project-path-resolution-worker",
  refresh: "blume-refresh-worker",
  search: "blume-search-worker",
  searchIndex: "blume-search-index-worker",
  setupScan: "blume-setup-scan-worker",
  signalAnalytics: "blume-signal-analytics-worker",
  terminal: "blume-terminal",
  wrappedGenerate: "blume-wrapped-generate-worker"
};
const TERMINATION_INTENT_MAX_AGE_MS = 3e4;
const TERMINATION_INTENT_QUEUE_LIMIT = 20;
const activeRequestIds = /* @__PURE__ */ new Map();
const terminationIntents = /* @__PURE__ */ new Map();
const blumeBackgroundProcessServices = new Set(
  Object.values(BLUME_BACKGROUND_PROCESS_SERVICES)
);
function backgroundProcessServiceInstanceName(serviceName, instanceId) {
  return `${serviceName}#${instanceId}`;
}
function getBlumeBackgroundProcessServiceName(serviceName) {
  if (typeof serviceName !== "string") return void 0;
  for (const candidate of blumeBackgroundProcessServices) {
    if (serviceName === candidate || serviceName.startsWith(`${candidate}#`)) return candidate;
  }
  return void 0;
}
function startBackgroundProcessRequest(serviceName, requestId2) {
  const requests = activeRequestIds.get(serviceName) ?? /* @__PURE__ */ new Set();
  requests.add(requestId2);
  activeRequestIds.set(serviceName, requests);
}
function finishBackgroundProcessRequest(serviceName, requestId2) {
  const requests = activeRequestIds.get(serviceName);
  if (!requests) return;
  requests.delete(requestId2);
  if (requests.size === 0) activeRequestIds.delete(serviceName);
}
function clearBackgroundProcessRequests(serviceName) {
  activeRequestIds.delete(serviceName);
}
function getBackgroundProcessActiveRequestCount(serviceName) {
  return activeRequestIds.get(serviceName)?.size ?? 0;
}
function isBlumeBackgroundProcessService(serviceName) {
  return getBlumeBackgroundProcessServiceName(serviceName) !== void 0;
}
function terminateBackgroundProcess(process2, serviceName, intent) {
  const terminated = process2.kill();
  if (!terminated) return false;
  const intents = terminationIntents.get(serviceName) ?? [];
  intents.push({ intent, recordedAt: Date.now() });
  if (intents.length > TERMINATION_INTENT_QUEUE_LIMIT) intents.shift();
  terminationIntents.set(serviceName, intents);
  return true;
}
function consumeBackgroundProcessTerminationIntent(serviceName, now = Date.now()) {
  const intents = terminationIntents.get(serviceName);
  if (!intents) return void 0;
  while (intents.length > 0) {
    const entry = intents.shift();
    if (entry && now - entry.recordedAt <= TERMINATION_INTENT_MAX_AGE_MS) {
      if (intents.length === 0) terminationIntents.delete(serviceName);
      return entry.intent;
    }
  }
  terminationIntents.delete(serviceName);
  return void 0;
}
function getBackgroundProcessActivity() {
  return Array.from(activeRequestIds, ([serviceName, requests]) => ({
    serviceName,
    activeRequests: requests.size
  })).sort((left, right) => left.serviceName.localeCompare(right.serviceName));
}
const WORKER_INACTIVITY_TIMEOUT_MS$3 = 6e4;
const WORKER_TOTAL_TIMEOUT_MS = 5 * 6e4;
let requestId$3 = 0;
let serializedActions = Promise.resolve();
let disposed$4 = false;
const activeWorkers = /* @__PURE__ */ new Set();
function responseError$5(message) {
  const error = new Error(message.errorMessage);
  if (message.errorName) error.name = message.errorName;
  if (message.errorStack) error.stack = message.errorStack;
  return error;
}
function runActionNow(payload) {
  return new Promise((resolvePromise, reject) => {
    const id = ++requestId$3;
    let settled = false;
    let watchdog = null;
    let deadline = null;
    let worker2 = null;
    const finish2 = (callback) => {
      if (settled) return;
      settled = true;
      if (watchdog) clearTimeout(watchdog);
      if (deadline) clearTimeout(deadline);
      finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.conversationAction, id);
      if (worker2) {
        activeWorkers.delete(worker2);
        try {
          terminateBackgroundProcess(
            worker2,
            BLUME_BACKGROUND_PROCESS_SERVICES.conversationAction,
            "request-settled"
          );
        } catch {
        }
      }
      callback();
    };
    const resetWatchdog2 = () => {
      if (watchdog) clearTimeout(watchdog);
      watchdog = setTimeout(
        () => finish2(() => reject(new Error("Conversation action worker became unresponsive"))),
        WORKER_INACTIVITY_TIMEOUT_MS$3
      );
      watchdog.unref();
    };
    try {
      worker2 = deliveryNative.utilityProcess.fork(_n.join(__dirname, "actionWorker.js"), [], {
        serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.conversationAction
      });
      activeWorkers.add(worker2);
      startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.conversationAction, id);
      deadline = setTimeout(
        () => finish2(() => reject(new Error("Conversation action worker exceeded its deadline"))),
        WORKER_TOTAL_TIMEOUT_MS
      );
      deadline.unref();
      worker2.on("message", (message) => {
        if (message.id !== id) return;
        resetWatchdog2();
        if (message.type === "heartbeat") return;
        if (message.ok) finish2(() => resolvePromise(message.result));
        else finish2(() => reject(responseError$5(message)));
      });
      worker2.on("exit", () => {
        finish2(() => reject(new Error("Conversation action worker exited before completing")));
      });
      resetWatchdog2();
      worker2.postMessage({
        type: "conversation-action",
        id,
        dbPath: getDbPath(),
        homeDir: Nl.homedir(),
        ...payload
      });
    } catch (error) {
      finish2(() => reject(error instanceof Error ? error : new Error(String(error))));
    }
  });
}
function runConversationAction(payload) {
  const action = serializedActions.then(() => {
    if (disposed$4) throw new Error("Conversation action workers are disposed");
    return runActionNow(payload);
  });
  serializedActions = action.then(
    () => void 0,
    () => void 0
  );
  return action;
}
async function prepareConversationViaWorker(ref, target) {
  const result = await runConversationAction({ action: "continue", ref, target });
  if (!("conversationRef" in result) || !("repositoryRoot" in result))
    throw new Error("Continuation worker returned no conversation");
  return result;
}
async function rollbackConversationViaWorker(continuation) {
  await runConversationAction({ action: "rollback-continuation", continuation });
}
function disposeConversationActionWorkers() {
  disposed$4 = true;
  clearBackgroundProcessRequests(BLUME_BACKGROUND_PROCESS_SERVICES.conversationAction);
  for (const worker2 of activeWorkers) {
    try {
      terminateBackgroundProcess(
        worker2,
        BLUME_BACKGROUND_PROCESS_SERVICES.conversationAction,
        "dispose"
      );
    } catch {
    }
  }
  activeWorkers.clear();
}
const HOME = require$$0$2.homedir();
const LOG_FILE_NAME = "main.ndjson";
const MAX_STRING_LENGTH = 2e3;
const MAX_ERROR_STACK_LENGTH = 6e3;
const MAX_OBJECT_KEYS = 40;
const MAX_ARRAY_LENGTH = 20;
const REDACTED$1 = "[Redacted]";
const SECRET_KEY_PATTERN$1 = /(token|secret|password|cookie|authorization|api[_-]?key|dsn)/i;
const LEVELS = /* @__PURE__ */ new Set(["debug", "info", "warn", "error", "fatal"]);
let appLogger = null;
let appLogFilePath = null;
function appVersion$2() {
  try {
    return deliveryNative.app.getVersion();
  } catch {
    return process.env.npm_package_version;
  }
}
function redactHome$1(value) {
  return HOME ? value.replaceAll(HOME, "~") : value;
}
function logMessageText(value) {
  try {
    if (typeof value === "string") return value;
    if (value instanceof Error) {
      if (value.message) return `${value.name || "Error"}: ${value.message}`;
      return value.name || "Error";
    }
    return String(value);
  } catch {
    return "[Unserializable log message]";
  }
}
function appLogPath() {
  if (appLogFilePath) return appLogFilePath;
  const dir = deliveryNative.app.getPath("logs");
  appLogFilePath = pn.join(dir, LOG_FILE_NAME);
  return appLogFilePath;
}
function normalizeValue$1(value, seen = /* @__PURE__ */ new WeakSet()) {
  if (typeof value === "string") return redactHome$1(value).slice(0, MAX_STRING_LENGTH);
  if (typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (value === void 0) return void 0;
  if (value instanceof Error) return serializeError$1(value);
  if (Array.isArray(value)) {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    return value.slice(0, MAX_ARRAY_LENGTH).map((item) => normalizeValue$1(item, seen));
  }
  if (typeof value === "object") {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const out = {};
    for (const [key, nested] of Object.entries(value).slice(
      0,
      MAX_OBJECT_KEYS
    )) {
      if (SECRET_KEY_PATTERN$1.test(key)) {
        out[key] = REDACTED$1;
        continue;
      }
      const normalized = normalizeValue$1(nested, seen);
      if (normalized !== void 0) out[key] = normalized;
    }
    return out;
  }
  return String(value).slice(0, MAX_STRING_LENGTH);
}
function normalizeProperties$1(properties = {}) {
  const out = {};
  for (const [key, value] of Object.entries(properties).slice(0, MAX_OBJECT_KEYS)) {
    if (SECRET_KEY_PATTERN$1.test(key)) {
      out[key] = REDACTED$1;
      continue;
    }
    const normalized = normalizeValue$1(value);
    if (normalized !== void 0) out[key] = normalized;
  }
  return out;
}
function serializeError$1(err) {
  if (err instanceof Error) {
    return normalizeProperties$1({
      name: err.name,
      message: err.message,
      stack: err.stack ? redactHome$1(err.stack).slice(0, MAX_ERROR_STACK_LENGTH) : void 0
    });
  }
  return normalizeProperties$1({
    name: typeof err,
    message: String(err)
  });
}
function pinoLogger() {
  if (appLogger) return appLogger;
  const destinationPath = appLogPath();
  un.mkdirSync(pn.dirname(destinationPath), { recursive: true });
  appLogger = pino(
    {
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      base: {
        app_product: "blume",
        app_surface: "desktop",
        app_client: "electron",
        app_version: appVersion$2(),
        platform: process.platform
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      formatters: {
        level(label) {
          return { level: label };
        }
      },
      redact: {
        paths: [
          "token",
          "secret",
          "password",
          "cookie",
          "authorization",
          "api_key",
          "apiKey",
          "*.token",
          "*.secret",
          "*.password",
          "*.cookie",
          "*.authorization",
          "*.api_key",
          "*.apiKey"
        ],
        censor: REDACTED$1
      }
    },
    pino.destination({
      dest: destinationPath,
      sync: false
    })
  );
  return appLogger;
}
function mirrorToConsole(level, source, message, record) {
  const text = `[blume] ${source}: ${message}`;
  if (level === "error" || level === "fatal") console.error(text, record);
  else if (level === "warn") console.warn(text, record);
  else if (process.env.NODE_ENV !== "production") console.log(text, record);
}
function writeAppLog(level, source, message, properties = {}, err) {
  const record = {
    runtime: source.startsWith("renderer.") ? "renderer" : "main",
    source,
    ...normalizeProperties$1(properties)
  };
  if (err !== void 0) record.err = serializeError$1(err);
  else if (message instanceof Error) record.err = serializeError$1(message);
  const sanitizedMessage = redactHome$1(logMessageText(message)).slice(0, MAX_STRING_LENGTH);
  pinoLogger()[level](record, sanitizedMessage);
  mirrorToConsole(level, source, sanitizedMessage, record);
}
function createAppLogger(source) {
  return {
    debug: (message, properties) => writeAppLog("debug", source, message, properties),
    info: (message, properties) => writeAppLog("info", source, message, properties),
    warn: (message, properties) => writeAppLog("warn", source, message, properties),
    error: (message, err, properties) => writeAppLog("error", source, message, properties, err),
    fatal: (message, err, properties) => writeAppLog("fatal", source, message, properties, err)
  };
}
function writeRendererLog(input) {
  if (!input || typeof input !== "object") return;
  const entry = input;
  const level = typeof entry.level === "string" && LEVELS.has(entry.level) ? entry.level : "info";
  const source = typeof entry.source === "string" && entry.source.startsWith("renderer.") ? entry.source : "renderer.unknown";
  const message = typeof entry.message === "string" ? entry.message : "renderer log";
  const properties = entry.properties && typeof entry.properties === "object" ? entry.properties : void 0;
  writeAppLog(level, source, message, properties, entry.err);
}
function getAppLogFilePath() {
  return appLogPath();
}
function flushAppLogs() {
  appLogger?.flush();
}
function registerLoggerIpcHandlers(handleIpc2) {
  handleIpc2("diagnostics:log", (_evt, entry) => writeRendererLog(entry));
  handleIpc2("diagnostics:getLogFilePath", () => getAppLogFilePath());
}
const log$2 = createAppLogger("main.legacy-exclusions");
const START_DELAY_MS = 45e3;
const ACCOUNT_DELAY_MS = 1e4;
function startLegacyProjectExclusionMigration(options) {
  let finished = false;
  let running = false;
  let timer2;
  const schedule2 = (delayMs) => {
    if (finished) return;
    clearTimeout(timer2);
    timer2 = setTimeout(run, delayMs);
    timer2.unref?.();
  };
  function run() {
    if (finished) return;
    if (running) return schedule2(ACCOUNT_DELAY_MS);
    running = true;
    legacyExclusions.migrateLegacyExclusions({
      read: async () => {
        const result = await runConversationAction({ action: "legacy-exclusions-read" });
        if (!("legacyExclusions" in result)) throw Error("Unexpected action worker result");
        return result.legacyExclusions;
      },
      signedIn: options.signedIn,
      importSkips: options.importSkips,
      remove: async (ids) => {
        const result = await runConversationAction({ action: "legacy-exclusions-remove", ids });
        if (!("remaining" in result)) throw Error("Unexpected action worker result");
        return result.remaining;
      },
      log: (message, properties) => log$2.info(message, properties)
    }).then((outcome) => {
      if (outcome === "absent" || outcome === "done") stop();
    }).catch((error) => log$2.error("excluded projects move failed", error)).finally(() => {
      running = false;
    });
  }
  const unsubscribe = options.onAccountChanged?.(() => schedule2(ACCOUNT_DELAY_MS));
  function stop() {
    finished = true;
    clearTimeout(timer2);
    unsubscribe?.();
  }
  schedule2(START_DELAY_MS);
  return { stop };
}
const SENTRY_DSN = "https://ee3a878327bd3cf0aea1c7630de61505@o4511489746468864.ingest.de.sentry.io/4511489760886864";
let initialized = false;
let sentryPromise = null;
function loadSentry() {
  sentryPromise ??= import("@sentry/electron/main");
  return sentryPromise;
}
function sentryDsn() {
  return SENTRY_DSN;
}
function sentryEnvironment() {
  return "production";
}
function appVersion$1() {
  try {
    return deliveryNative.app.getVersion();
  } catch {
    return process.env.npm_package_version ?? "unknown";
  }
}
function normalizeThrowable$1(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : JSON.stringify(err));
}
function initSentry() {
  if (initialized) return;
  const dsn = sentryDsn();
  initialized = true;
  const version2 = appVersion$1();
  void loadSentry().then((Sentry) => {
    Sentry.init({
      dsn,
      environment: sentryEnvironment(),
      release: `blume-desktop@${version2}`,
      attachStacktrace: true
    });
    Sentry.setTag("app_product", "blume");
    Sentry.setTag("app_surface", "desktop");
    Sentry.setTag("app_client", "electron");
    Sentry.setTag("runtime", "main");
    Sentry.setTag("app_version", version2);
    Sentry.setContext("app", {
      version: version2,
      platform: process.platform
    });
    void Promise.resolve().then(() => blumeUserHost).then(({ getOrCreateBlumeId: getOrCreateBlumeId2 }) => getOrCreateBlumeId2()).then((id) => Sentry.setUser({ id })).catch(() => {
    });
  }).catch(() => {
    initialized = false;
  });
}
function captureSentryException(source, err, extra = {}) {
  if (!initialized) return;
  void loadSentry().then((Sentry) => {
    Sentry.withScope((scope) => {
      scope.setTag("source", source);
      for (const [key, value] of Object.entries(extra)) {
        if (value !== void 0) scope.setExtra(key, value);
      }
      Sentry.captureException(normalizeThrowable$1(err));
    });
  });
}
const JOB_BOARD_FLAG = "job-board";
const CAREERS_PRODUCTION_URL = "https://blume.codes/api/careers/jobs";
const MAX_PUBLIC_CAREER_OPENINGS = 30;
function boundedString(value, maxLength) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) return null;
  return normalized;
}
function httpsUrl$1(value) {
  const candidate = boundedString(value, 2048);
  if (!candidate) return null;
  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}
function opening(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value;
  const id = boundedString(candidate.id, 160);
  const title = boundedString(candidate.title, 240);
  const pitch = boundedString(candidate.pitch, 600);
  const jobUrl = httpsUrl$1(candidate.jobUrl);
  const applyUrl = httpsUrl$1(candidate.applyUrl);
  if (!id || !title || !pitch || !jobUrl || !applyUrl || !isAllowedCareerDestination(jobUrl) || !isAllowedCareerDestination(applyUrl)) {
    return null;
  }
  const remoteStatus = candidate.remoteStatus === "none" || candidate.remoteStatus === "temporary" || candidate.remoteStatus === "hybrid" || candidate.remoteStatus === "fully" ? candidate.remoteStatus : null;
  return {
    id,
    title,
    pitch,
    department: boundedString(candidate.department, 160),
    location: boundedString(candidate.location, 240),
    remoteStatus,
    employmentType: boundedString(candidate.employmentType, 120),
    jobUrl,
    applyUrl
  };
}
function parseCareerOpeningsResponse(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { openings: [] };
  const rows = value.openings;
  if (!Array.isArray(rows)) return { openings: [] };
  return {
    openings: rows.slice(0, MAX_PUBLIC_CAREER_OPENINGS).map(opening).filter((candidate) => candidate !== null)
  };
}
function isAllowedCareerDestination(value) {
  const normalized = httpsUrl$1(value);
  if (!normalized) return false;
  const hostname = new URL(normalized).hostname.toLowerCase();
  return hostname === "blume.codes" || hostname.endsWith(".blume.codes") || hostname === "teamtailor.com" || hostname.endsWith(".teamtailor.com");
}
const HARNESS_TITLE_WRITEBACK_FLAG = "desktop-harness-title-writeback";
const CURSOR_USAGE_FLAG = "cursor-usage";
const CONVERSATION_CONTINUATION_MENU_FLAG = "desktop-conversation-continuation-menu";
const ACCOUNTS_AND_FEATURE_REQUESTS_FLAG = "accounts-and-feature-requests";
const CLOUD_AGENT_CHATS_FLAG = "cloud-agent-chats";
const ARTIFACT_SYNC_FLAG = "artifact-sync";
const FIRST_RUN_WIZARD_FLAG = "first-run-wizard";
const FIRST_RUN_BLUME_ROUTER_FLAG = "first-run-blume-router";
const MAC_MENU_BAR_STATUS_ITEM_FLAG = "desktop-menu-bar-status-item";
const POSTHOG_FEATURE_FLAG_OVERRIDES_SETTING_KEY = "posthogFeatureFlagOverrides";
const POSTHOG_FEATURE_FLAGS = [
  {
    key: CLOUD_AGENT_CHATS_FLAG,
    label: "Cloud agents",
    detail: "Run Codex and Claude in the cloud. Enabled by default only in canary.",
    rolloutPercentage: null,
    createdAt: "2026-11-04T21:37:33.040219Z",
    updatedAt: "2026-11-04T21:37:33.043307Z"
  },
  {
    key: useCases.WRAPPED_FLAG,
    label: "Blume Wrapped",
    detail: "Weekly recap cards: the Monday delivery and the one-time launch recap.",
    rolloutPercentage: 0,
    createdAt: "2026-08-19T02:06:50.374601Z",
    updatedAt: "2026-08-19T02:06:50.378591Z"
  },
  {
    key: HARNESS_TITLE_WRITEBACK_FLAG,
    label: "Harness title writeback",
    detail: "Write generated conversation titles back to the source harness.",
    rolloutPercentage: null,
    createdAt: null,
    updatedAt: null
  },
  {
    key: MAC_MENU_BAR_STATUS_ITEM_FLAG,
    label: "macOS menu bar status item",
    detail: "Show the native status item when the menu bar setting is enabled.",
    rolloutPercentage: 100,
    createdAt: "2026-07-07T18:48:56.357670Z",
    updatedAt: "2026-07-07T20:53:07.577343Z"
  },
  {
    key: CURSOR_USAGE_FLAG,
    label: "Cursor usage",
    detail: "Fetch and display Cursor usage alongside Claude and Codex.",
    rolloutPercentage: 0,
    createdAt: "2026-07-08T23:01:33.321137Z",
    updatedAt: "2026-07-08T23:01:33.765033Z"
  },
  {
    key: CONVERSATION_CONTINUATION_MENU_FLAG,
    label: "Conversation continuation menu",
    detail: "Allow conversations to be continued in a supported harness.",
    rolloutPercentage: 0,
    createdAt: "2026-07-18T18:48:09.277179Z",
    updatedAt: "2026-07-18T18:48:10.131096Z"
  },
  {
    key: ACCOUNTS_AND_FEATURE_REQUESTS_FLAG,
    label: "Feature request board",
    detail: "Enable the shared feature-request board and its account login and profile controls.",
    rolloutPercentage: 100,
    createdAt: "2026-07-30T11:47:32.229210Z",
    updatedAt: "2026-08-07T14:24:28.219335Z"
  },
  {
    key: ARTIFACT_SYNC_FLAG,
    label: "Artifact sync",
    detail: "Sync selected setup artifacts and folders between devices on the same account.",
    rolloutPercentage: 0,
    createdAt: "2026-08-14T22:09:37.378386Z",
    updatedAt: "2026-08-14T22:09:37.382965Z"
  },
  {
    key: FIRST_RUN_WIZARD_FLAG,
    label: "First-run wizard",
    detail: "Show the guided first-run wizard when a machine has no agent sessions.",
    rolloutPercentage: 0,
    createdAt: "2026-08-18T16:03:54.022932Z",
    updatedAt: "2026-08-18T16:03:54.028007Z"
  },
  {
    key: FIRST_RUN_BLUME_ROUTER_FLAG,
    label: "First-run Blume router option",
    detail: "Offer Pi with Blume credits ($5 free, then usage billing) in the wizard.",
    rolloutPercentage: 0,
    createdAt: "2026-08-18T16:04:06.762348Z",
    updatedAt: "2026-08-18T16:04:06.767520Z"
  },
  {
    key: JOB_BOARD_FLAG,
    label: "Job board",
    detail: "Show the public job-board entry points in the app and on the landing page.",
    rolloutPercentage: 0,
    createdAt: "2026-08-01T20:55:58.182981Z",
    updatedAt: "2026-08-01T20:55:58.494427Z"
  }
];
const POSTHOG_FEATURE_FLAG_KEYS = new Set(POSTHOG_FEATURE_FLAGS.map(({ key }) => key));
function isPosthogFeatureFlagKey(value) {
  return typeof value === "string" && POSTHOG_FEATURE_FLAG_KEYS.has(value);
}
function parsePosthogFeatureFlagOverrides(value) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const overrides = {};
    for (const [key, enabled] of Object.entries(parsed)) {
      if (!POSTHOG_FEATURE_FLAG_KEYS.has(key) || typeof enabled !== "boolean") continue;
      overrides[key] = enabled;
    }
    return overrides;
  } catch {
    return {};
  }
}
function getPosthogFeatureFlagOverride(overrides, flagKey) {
  if (!POSTHOG_FEATURE_FLAG_KEYS.has(flagKey)) return void 0;
  return overrides[flagKey];
}
function emptyPosthogFeatureFlagEvaluations() {
  return Object.fromEntries(
    POSTHOG_FEATURE_FLAGS.map(({ key }) => [
      key,
      { posthogStatus: "unavailable", installationEnabled: null }
    ])
  );
}
const POSTHOG_EXPERIMENT_OVERRIDES_SETTING_KEY = "posthogExperimentOverrides";
const SHARE_PROMOTION_VARIANT_METADATA = {
  control: {
    label: "On success",
    detail: "Temporarily replaces the footer shortcut after a success event."
  },
  persistent_header: {
    label: "Always visible",
    detail: "Keeps a share action visible in the app header."
  },
  page_footer: {
    label: "Page footer",
    detail: "Shows a compact share prompt after scrolling through Setup or Improve."
  }
};
const POSTHOG_EXPERIMENTS = [
  {
    key: flowerUnlocks.SHARE_PROMOTION_EXPERIMENT_FLAG,
    label: "Share promotion placement",
    detail: "Choose where Blume prompts people to share after a successful action.",
    variants: flowerUnlocks.SHARE_PROMOTION_VARIANTS.map((key) => ({
      key,
      ...SHARE_PROMOTION_VARIANT_METADATA[key]
    }))
  }
];
const EXPERIMENT_VARIANTS = new Map(
  POSTHOG_EXPERIMENTS.map((experiment) => [
    experiment.key,
    new Set(experiment.variants.map(({ key }) => key))
  ])
);
function isPosthogExperimentKey(value) {
  return typeof value === "string" && EXPERIMENT_VARIANTS.has(value);
}
function parsePosthogExperimentOverrides(value) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const overrides = {};
    for (const [key, variant] of Object.entries(parsed)) {
      if (typeof variant !== "string" || !EXPERIMENT_VARIANTS.get(key)?.has(variant)) continue;
      overrides[key] = variant;
    }
    return overrides;
  } catch {
    return {};
  }
}
function getPosthogExperimentOverride(overrides, experimentKey) {
  if (!EXPERIMENT_VARIANTS.has(experimentKey)) return void 0;
  return overrides[experimentKey];
}
const SENSITIVE_IDENTIFIER_KEYS = /* @__PURE__ */ new Set([
  "conversationid",
  "conversationref",
  "messageid",
  "projectid",
  "ref",
  "runid",
  "sourceid",
  "threadid"
]);
const SAFE_PATH_METADATA_KEYS = /* @__PURE__ */ new Set(["pathkind", "pathcount"]);
function compactKey(key) {
  return key.replace(/[^a-z0-9]/gi, "").toLowerCase();
}
function isSensitiveTelemetryKey(key) {
  const compact = compactKey(key);
  if (SENSITIVE_IDENTIFIER_KEYS.has(compact)) return true;
  if (SAFE_PATH_METADATA_KEYS.has(compact)) return false;
  return compact === "path" || compact.endsWith("path") || compact.endsWith("paths");
}
function classifyTelemetryPath(value) {
  if (typeof value !== "string" || value.length === 0) return "unknown";
  if (/^file:\/\//i.test(value)) return "file_url";
  if (/^(?:\\\\\?\\)?\\\\wsl(?:\.localhost|\$)\\/i.test(value)) return "wsl_unc";
  if (/^(?:\\\\\?\\)?\\\\/i.test(value)) return "network_unc";
  if (/^[a-z]:[\\/]/i.test(value)) return "windows_absolute";
  if (value.startsWith("/")) return "unix_absolute";
  return "relative";
}
function sanitizeTelemetryText(value) {
  return value.replace(
    /(['"])(?:file:\/\/|(?:\\\\\\?\\)?\\\\|[a-z]:[\\/]|\/)(?:\\.|(?!\1)[^\r\n])*\1/gi,
    (_match, quote) => `${quote}[Path]${quote}`
  ).replace(/file:\/\/[^\s)'"\]]+/gi, "[Path]").replace(/(?:\\\\\?\\)?\\\\[^\s\\'"\]]+(?:\\[^\s\\'"\]]+)+/g, "[Path]").replace(/(^|[\s('"=])[a-z]:[\\/][^\s:'"\]]*/gi, "$1[Path]").replace(/(^|[\s('"=])\/(?:[^/\s:'"\])]+\/)*[^/\s:'"\])]+/g, "$1[Path]").replace(/\{[^\n]{500,}\}/g, "[Structured payload omitted]");
}
function errorText$1(error) {
  if (error instanceof Error) {
    const cause = error.cause;
    return `${error.name}
${error.message}
${cause === void 0 ? "" : errorText$1(cause)}`;
  }
  return typeof error === "string" ? error : String(error ?? "");
}
function classifyFailure(error) {
  const text = errorText$1(error).toLowerCase();
  if (/file is not a database|database disk image is malformed/.test(text)) {
    return "sqlite_corruption";
  }
  if (/unable to open database|cannot open database/.test(text)) return "sqlite_open_failed";
  if (/enotempty|directory not empty/.test(text)) return "temporary_cleanup_failed";
  if (/enoent|no such file or directory/.test(text)) return "path_missing";
  if (/\beio\b|i\/o error/.test(text)) return "path_io_failed";
  if (/unable to get local issuer certificate|certificate|cert_has_expired/.test(text)) {
    return "certificate_validation_failed";
  }
  if (/resizeobserver loop/.test(text)) return "layout_observer_loop";
  if (/failed to load .*credentials|credentials.*(?:missing|unavailable)/.test(text)) {
    return "provider_auth_failed";
  }
  if (/unknown variant.*expected one of|failed to decode models response/.test(text)) {
    return "harness_version_incompatible";
  }
  if (/stream disconnected before completion/.test(text)) return "model_stream_disconnected";
  if (/unresponsive|watchdog/.test(text)) return "worker_unresponsive";
  if (/circuit breaker|cooling down/.test(text)) return "circuit_breaker_open";
  if (/timed out|timeouterror|timeout/.test(text)) return "timeout";
  if (/fetch failed|err_(?:internet|network|connection|name|proxy|address|socket)/.test(text)) {
    return "network_request_failed";
  }
  if (/exited with code|child process gone|process gone/.test(text)) return "process_exit";
  if (/aborterror|operation was aborted/.test(text)) return "request_aborted";
  return "unknown";
}
function ipcImpact(channel) {
  if (typeof channel !== "string") return null;
  if (channel.startsWith("account:") || channel.startsWith("auth:")) {
    return impact("authentication", "sign_in_completion_blocked", "feature_blocked", "user_retry");
  }
  if (channel.startsWith("referrals:")) {
    return impact("referrals", "referral_status_unavailable", "feature_degraded", "automatic_retry");
  }
  if (channel.startsWith("announcements:")) {
    return impact(
      "announcements",
      "announcements_unavailable",
      "feature_degraded",
      "stale_data_retained"
    );
  }
  if (channel.startsWith("chatwoot:")) {
    return impact("support", "support_messages_unavailable", "feature_degraded", "automatic_retry");
  }
  if (channel.startsWith("conversations:")) {
    return impact(
      "conversations",
      "conversations_may_be_stale",
      "feature_degraded",
      "stale_data_retained"
    );
  }
  if (channel.startsWith("insights:") || channel.startsWith("improve:")) {
    return impact("improve", "improve_result_unavailable", "feature_blocked", "user_retry");
  }
  return null;
}
function impact(featureArea, userImpact, impactScope, recoveryMode) {
  return {
    diagnostic_schema_version: 1,
    feature_area: featureArea,
    user_impact: userImpact,
    impact_scope: impactScope,
    recovery_mode: recoveryMode
  };
}
function diagnosticPropertiesForError(source, error, properties = {}) {
  const failureClass = classifyFailure(error);
  const normalizedSource = source.toLowerCase();
  let result = null;
  if (normalizedSource === "main.ipc") result = ipcImpact(properties.channel);
  if (!result && normalizedSource.includes("updater")) {
    result = impact(
      "updates",
      "update_check_or_install_unavailable",
      "feature_degraded",
      "automatic_retry"
    );
  }
  if (!result && /account|auth|deep-link/.test(normalizedSource)) {
    result = impact("authentication", "sign_in_completion_blocked", "feature_blocked", "user_retry");
  }
  if (!result && normalizedSource.includes("referral")) {
    result = impact(
      "referrals",
      "referral_status_unavailable",
      "feature_degraded",
      "automatic_retry"
    );
  }
  if (!result && /parser|refresh|conversation/.test(normalizedSource)) {
    result = impact(
      "conversations",
      "conversations_may_be_stale",
      failureClass.startsWith("sqlite_") ? "feature_blocked" : "feature_degraded",
      "stale_data_retained"
    );
  }
  if (!result && /improve|insights\.pipeline|clustering/.test(normalizedSource)) {
    result = impact("improve", "improve_result_unavailable", "feature_blocked", "user_retry");
  }
  if (!result && normalizedSource.includes("child-process-gone")) {
    result = impact(
      "background_processing",
      properties.expected_termination === true ? "no_user_impact_expected" : "background_feature_interrupted",
      properties.expected_termination === true ? "none_expected" : "feature_degraded",
      properties.expected_termination === true ? "none_required" : "automatic_retry"
    );
  }
  if (!result && normalizedSource.includes("search")) {
    result = impact("search", "search_unavailable", "feature_blocked", "user_retry");
  }
  if (!result && normalizedSource.includes("setup")) {
    result = impact("setup", "setup_scan_unavailable", "feature_degraded", "user_retry");
  }
  if (!result && normalizedSource.includes("wrapped")) {
    result = impact("wrapped", "wrapped_generation_unavailable", "feature_blocked", "user_retry");
  }
  if (!result && failureClass.startsWith("sqlite_")) {
    result = impact("local_storage", "local_data_unavailable", "app_blocked", "manual_action");
  }
  if (!result && failureClass === "layout_observer_loop") {
    result = impact("layout", "layout_impact_unknown", "unknown", "unknown");
  }
  result ??= impact("unknown", "application_behavior_unknown", "unknown", "unknown");
  return { ...result, failure_class: failureClass, failure_stage: failureStage(source, properties) };
}
function failureStage(source, properties) {
  const normalizedSource = source.toLowerCase();
  const reportedStage = String(properties.stage ?? properties.phase ?? "").toLowerCase();
  if ((/* @__PURE__ */ new Set([
    "extraction",
    "clustering",
    "planning",
    "apply",
    "discovery",
    "ingest",
    "parse",
    "persist"
  ])).has(reportedStage)) {
    return reportedStage;
  }
  if (normalizedSource === "main.ipc") return "ipc_request";
  if (normalizedSource.includes("worker_project_workspace")) return "workspace_resolution";
  if (normalizedSource.includes("worker_ingest") || normalizedSource.endsWith(".ingest")) {
    return "conversation_ingest";
  }
  if (normalizedSource.includes("parser-binding") || normalizedSource.includes("parser_binding")) {
    return "session_parse";
  }
  if (normalizedSource.includes("refresh_worker")) return "worker_lifecycle";
  if (normalizedSource.includes("clustering")) return "clustering";
  if (normalizedSource.includes("updater")) {
    const updaterMessage = String(properties.updater_message ?? "").toLowerCase();
    if (updaterMessage.includes("download")) return "download";
    if (updaterMessage.includes("install") || updaterMessage.includes("quitandinstall")) {
      return "install";
    }
    if (updaterMessage.includes("stage")) return "staging";
    return "update_check";
  }
  if (normalizedSource.includes("child-process-gone")) return "process_lifecycle";
  return "unknown";
}
function safeTelemetryError(source, error) {
  const original = error instanceof Error ? error : new Error(String(error));
  const failureClass = classifyFailure(original);
  let message = sanitizeTelemetryText(original.message);
  if (/improve|insights\.pipeline|clustering/.test(source.toLowerCase()) && /exited with code/i.test(original.message)) {
    const exitCode = original.message.match(/exited with code\s+(-?\d+)/i)?.[1] ?? "unknown";
    message = `External analysis process exited with code ${exitCode}`;
  }
  const safe = new Error(message);
  safe.name = original.name;
  const sanitizedStack = original.stack ? sanitizeTelemetryText(original.stack) : void 0;
  safe.stack = sanitizedStack?.includes(original.message) ? sanitizedStack.replace(sanitizeTelemetryText(original.message), message) : sanitizedStack;
  safe.failureClass = failureClass;
  return safe;
}
const DEFAULT_HOST = "https://eu.i.posthog.com";
const DEDUPE_WINDOW_MS = 6e4;
const POSTHOG_LOGGER_NAME = "blume-desktop-main";
const LOG_BODY_MAX_LENGTH = 4e3;
const SECRET_KEY_PATTERN = /(token|secret|password|cookie|authorization|api[_-]?key|dsn)/i;
const REDACTED = "[Redacted]";
const recentEvents = /* @__PURE__ */ new Map();
let posthogClientPromise = null;
let posthogLoggerProvider = null;
let posthogLogger = null;
let telemetryDistinctIdPromise = null;
const LOG_SEVERITY_NUMBERS = {
  debug: apiLogs.SeverityNumber.DEBUG,
  info: apiLogs.SeverityNumber.INFO,
  warn: apiLogs.SeverityNumber.WARN,
  error: apiLogs.SeverityNumber.ERROR,
  fatal: apiLogs.SeverityNumber.FATAL
};
function posthogApiKey() {
  return "phc_mevo39heWzHfMwQWQ5Q8LPsHviHFE3inpgdeWYExbVBH";
}
function telemetryKey() {
  if (isPosthogTrackingDisabled()) return void 0;
  return posthogApiKey();
}
function pluginTelemetryConfig() {
  try {
    if (getSetting(POSTHOG_TRACKING_DISABLED_SETTING_KEY) === "true") return null;
    const key = posthogApiKey();
    return key && telemetryHost() === DEFAULT_HOST ? { key, version: deliveryNative.app.getVersion() } : null;
  } catch {
    return null;
  }
}
function isPosthogTrackingDisabled() {
  try {
    return getSetting(POSTHOG_TRACKING_DISABLED_SETTING_KEY) === "true";
  } catch {
    return false;
  }
}
function telemetryHost() {
  return "https://eu.i.posthog.com".replace(/\/+$/, "");
}
function telemetryLogsEndpoint() {
  return (process.env.MAIN_VITE_POSTHOG_LOGS_ENDPOINT || `${telemetryHost()}/i/v1/logs`).replace(/\/+$/, "");
}
function appVersion() {
  try {
    return deliveryNative.app.getVersion();
  } catch {
    return process.env.npm_package_version;
  }
}
function mainTelemetryProperties() {
  return {
    app_product: "blume",
    app_surface: "desktop",
    app_client: "electron",
    runtime: "main",
    app_version: appVersion(),
    platform: process.platform
  };
}
function isTelemetryConfigured() {
  return telemetryKey() !== void 0;
}
function redactHome(value) {
  return sanitizeTelemetryText(value);
}
function normalizeValue(value, seen = /* @__PURE__ */ new WeakSet()) {
  if (typeof value === "string") return redactHome(value).slice(0, 2e3);
  if (typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (value === void 0) return void 0;
  if (Array.isArray(value)) {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    return value.slice(0, 20).map((item) => normalizeValue(item, seen));
  }
  if (value instanceof Error) return serializeError(value);
  if (typeof value === "object") {
    if (seen.has(value)) return "[Circular]";
    seen.add(value);
    const out = {};
    for (const [key, nested] of Object.entries(value).slice(0, 40)) {
      if (SECRET_KEY_PATTERN.test(key)) {
        out[key] = REDACTED;
        continue;
      }
      if (isSensitiveTelemetryKey(key)) {
        const pathKind = compactPathKind(nested);
        if (pathKind !== "unknown" && out.path_kind === void 0) out.path_kind = pathKind;
        continue;
      }
      const normalized = normalizeValue(nested, seen);
      if (normalized !== void 0) out[key] = normalized;
    }
    return out;
  }
  return String(value).slice(0, 500);
}
function serializeError(err) {
  if (err instanceof Error) {
    return {
      error_name: err.name,
      error_message: redactHome(err.message).slice(0, 1e3),
      error_stack: err.stack ? redactHome(err.stack).slice(0, 6e3) : void 0
    };
  }
  return {
    error_name: typeof err,
    error_message: redactHome(String(err)).slice(0, 1e3)
  };
}
function normalizeThrowable(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : JSON.stringify(err));
}
function normalizeProperties(properties) {
  const out = {};
  for (const [key, value] of Object.entries(properties)) {
    if (SECRET_KEY_PATTERN.test(key)) {
      out[key] = REDACTED;
      continue;
    }
    if (isSensitiveTelemetryKey(key)) {
      if (compactPathKind(value) !== "unknown" && out.path_kind === void 0) {
        out.path_kind = compactPathKind(value);
      }
      continue;
    }
    const normalized = normalizeValue(value);
    if (normalized !== void 0) out[key] = normalized;
  }
  return out;
}
function compactPathKind(value) {
  if (Array.isArray(value)) {
    const kinds = [...new Set(value.map(classifyTelemetryPath))];
    return kinds.length === 1 ? kinds[0] : kinds.length > 1 ? "mixed" : "unknown";
  }
  return classifyTelemetryPath(value);
}
function normalizeLogAttributes(properties) {
  return normalizeProperties(properties);
}
function dedupeKey(source, properties) {
  return [
    properties.feature_area ?? source,
    properties.error_name,
    properties.error_message,
    properties.failure_class,
    properties.provider,
    properties.channel
  ].filter((part) => typeof part === "string" || typeof part === "number").join("|");
}
function shouldSend(source, properties) {
  const key = dedupeKey(source, properties);
  if (!key) return true;
  const now = Date.now();
  const last = recentEvents.get(key);
  if (last && now - last < DEDUPE_WINDOW_MS) return false;
  recentEvents.set(key, now);
  if (recentEvents.size > 200) {
    for (const [eventKey, ts] of recentEvents) {
      if (now - ts > DEDUPE_WINDOW_MS) recentEvents.delete(eventKey);
    }
  }
  return true;
}
function getTelemetryDistinctId() {
  telemetryDistinctIdPromise ??= Promise.resolve().then(() => blumeUserHost).then(({ getOrCreateBlumeId: getOrCreateBlumeId2 }) => getOrCreateBlumeId2()).catch(() => "main-process");
  return telemetryDistinctIdPromise;
}
async function getPosthogClient() {
  const apiKey = posthogApiKey();
  posthogClientPromise ??= import("posthog-node").then(({ PostHog }) => {
    return new PostHog(apiKey, {
      host: telemetryHost(),
      enableExceptionAutocapture: false
    });
  }).catch((err) => {
    posthogClientPromise = null;
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] main error tracking init failed:", err);
    }
    return null;
  });
  return posthogClientPromise;
}
function initPosthogLogging() {
  const apiKey = telemetryKey();
  if (!apiKey) return false;
  if (posthogLoggerProvider && posthogLogger) return true;
  try {
    const version2 = appVersion() ?? "unknown";
    const provider = new sdkLogs.LoggerProvider({
      resource: resources.resourceFromAttributes({
        "service.name": "blume-desktop",
        "service.version": version2,
        "deployment.environment.name": false ? "development" : "production",
        "app.product": "blume",
        "app.surface": "desktop",
        "app.client": "electron",
        "process.runtime.name": "electron",
        "process.runtime.version": process.versions.electron ?? process.version,
        "process.pid": process.pid,
        "os.type": process.platform,
        "os.arch": process.arch
      }),
      processors: [
        new sdkLogs.BatchLogRecordProcessor(
          new exporterLogsOtlpHttp.OTLPLogExporter({
            url: telemetryLogsEndpoint(),
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }),
          {
            maxQueueSize: 512,
            maxExportBatchSize: 64,
            scheduledDelayMillis: 5e3,
            exportTimeoutMillis: 1e4
          }
        )
      ]
    });
    apiLogs.logs.setGlobalLoggerProvider(provider);
    posthogLoggerProvider = provider;
    posthogLogger = apiLogs.logs.getLogger(POSTHOG_LOGGER_NAME, version2);
    void capturePosthogLog("info", "PostHog log capture initialized", {
      source: "main.telemetry",
      log_source: "telemetry_init"
    });
    return true;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] main log capture init failed:", err);
    }
    posthogLoggerProvider = null;
    posthogLogger = null;
    return false;
  }
}
async function capturePosthogLog(severity, body, properties = {}) {
  if (isPosthogTrackingDisabled()) return false;
  const logger = posthogLogger;
  if (!logger) return false;
  const distinctId = await getTelemetryDistinctId().catch(() => "main-process");
  logger.emit({
    severityNumber: LOG_SEVERITY_NUMBERS[severity],
    severityText: severity.toUpperCase(),
    body: redactHome(body).slice(0, LOG_BODY_MAX_LENGTH),
    attributes: normalizeLogAttributes({
      ...mainTelemetryProperties(),
      ...properties,
      posthogDistinctId: distinctId,
      distinct_id: distinctId
    })
  });
  return true;
}
async function flushPosthogLogging() {
  try {
    await posthogLoggerProvider?.forceFlush();
  } catch {
  }
}
async function shutdownPosthogLogging() {
  const provider = posthogLoggerProvider;
  posthogLoggerProvider = null;
  posthogLogger = null;
  if (!provider) return;
  try {
    await provider.shutdown();
  } catch {
  }
}
async function capturePosthogException(source, err, properties = {}) {
  if (isPosthogTrackingDisabled()) return false;
  const client2 = await getPosthogClient();
  if (!client2) return false;
  try {
    const { getOrCreateBlumeId: getOrCreateBlumeId2 } = await Promise.resolve().then(() => blumeUserHost);
    const distinctId = await getOrCreateBlumeId2().catch(() => "main-process");
    const eventProperties = normalizeProperties({
      ...properties,
      ...mainTelemetryProperties(),
      source
    });
    await client2.captureExceptionImmediate(normalizeThrowable(err), distinctId, eventProperties);
    return true;
  } catch (captureErr) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] main error tracking capture failed:", captureErr);
    }
    return false;
  }
}
async function captureTelemetryEvent(event, properties = {}) {
  if (isPosthogTrackingDisabled()) return false;
  const apiKey = telemetryKey();
  if (!apiKey) return false;
  const eventProperties = normalizeProperties({
    ...properties,
    ...mainTelemetryProperties()
  });
  try {
    const { getOrCreateBlumeId: getOrCreateBlumeId2 } = await Promise.resolve().then(() => blumeUserHost);
    const distinctId = await getOrCreateBlumeId2().catch(() => "main-process");
    await fetch(`${telemetryHost()}/capture/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        event,
        distinct_id: distinctId,
        properties: eventProperties
      })
    });
    return true;
  } catch (telemetryErr) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] main capture failed:", telemetryErr);
    }
    return false;
  }
}
async function isPosthogFeatureEnabled(flagKey) {
  return await getPosthogFeatureFlagValue(flagKey) !== false;
}
async function getPosthogFeatureFlagValue(flagKey) {
  const featureFlagOverride = getPosthogFeatureFlagOverride(
    parsePosthogFeatureFlagOverrides(getSetting(POSTHOG_FEATURE_FLAG_OVERRIDES_SETTING_KEY)),
    flagKey
  );
  if (featureFlagOverride !== void 0) return featureFlagOverride;
  const experimentOverride = getPosthogExperimentOverride(
    parsePosthogExperimentOverrides(getSetting(POSTHOG_EXPERIMENT_OVERRIDES_SETTING_KEY)),
    flagKey
  );
  if (experimentOverride !== void 0) return experimentOverride;
  const client2 = await getPosthogClient();
  if (!client2) return false;
  let distinctId;
  try {
    flagUserHost ??= Promise.resolve().then(() => blumeUserHost).catch((err) => {
      flagUserHost = null;
      throw err;
    });
    const { getOrCreateBlumeId: getOrCreateBlumeId2 } = await flagUserHost;
    distinctId = await getOrCreateBlumeId2().catch(() => "main-process");
  } catch {
    distinctId = "main-process";
  }
  return cachedPosthogFeatureFlag(client2, flagKey, distinctId);
}
let flagUserHost = null;
const FEATURE_FLAG_FRESH_MS = 6e4;
const FEATURE_FLAG_MAX_AGE_MS = 5 * 6e4;
const FEATURE_FLAG_RETRY_MS = 1e4;
const MAX_CACHED_FEATURE_FLAGS = 200;
const featureFlagCache = /* @__PURE__ */ new Map();
const featureFlagChangeListeners = /* @__PURE__ */ new Set();
let featureFlagChangeAnnounced = false;
function onPosthogFeatureFlagsChanged(listener) {
  featureFlagChangeListeners.add(listener);
  return () => {
    featureFlagChangeListeners.delete(listener);
  };
}
function announceFeatureFlagsChanged() {
  if (featureFlagChangeAnnounced) return;
  featureFlagChangeAnnounced = true;
  setTimeout(() => {
    featureFlagChangeAnnounced = false;
    for (const listener of featureFlagChangeListeners) listener();
  }, 0);
}
function clearPosthogFeatureFlagCache() {
  const hadAssignments = featureFlagCache.size > 0;
  featureFlagCache.clear();
  if (hadAssignments) announceFeatureFlagsChanged();
}
function cachedPosthogFeatureFlag(client2, flagKey, distinctId) {
  const key = `${distinctId}\0${flagKey}`;
  let entry = featureFlagCache.get(key);
  if (!entry) {
    if (featureFlagCache.size >= MAX_CACHED_FEATURE_FLAGS) featureFlagCache.clear();
    entry = { value: void 0, answeredAt: 0, freshUntil: 0, pending: null };
    featureFlagCache.set(key, entry);
  }
  const now = Date.now();
  const usable = entry.value !== void 0 && now - entry.answeredAt < FEATURE_FLAG_MAX_AGE_MS;
  if (usable && now < entry.freshUntil) return Promise.resolve(entry.value);
  if (!entry.pending) {
    const target = entry;
    const current = () => featureFlagCache.get(key) === target;
    const answered = (value, freshMs) => {
      if (current()) {
        const changed = target.value !== void 0 && target.value !== value;
        target.value = value;
        target.answeredAt = Date.now();
        target.freshUntil = target.answeredAt + freshMs;
        if (changed) announceFeatureFlagsChanged();
      }
      return value;
    };
    target.pending = client2.getFeatureFlagResult(flagKey, distinctId, {
      sendFeatureFlagEvents: !isPosthogTrackingDisabled()
    }).then(
      (result) => {
        if (!result) return answered(false, FEATURE_FLAG_RETRY_MS);
        return answered(
          result.enabled !== true ? false : result.variant ?? true,
          FEATURE_FLAG_FRESH_MS
        );
      },
      (err) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[posthog] feature flag "${flagKey}" evaluation failed:`, err);
        }
        const kept = target.value !== void 0 && Date.now() - target.answeredAt < FEATURE_FLAG_MAX_AGE_MS;
        if (!kept) return answered(false, FEATURE_FLAG_RETRY_MS);
        if (current()) target.freshUntil = Date.now() + FEATURE_FLAG_RETRY_MS;
        return target.value;
      }
    ).finally(() => {
      target.pending = null;
    });
  }
  return usable ? Promise.resolve(entry.value) : entry.pending;
}
async function getPosthogFeatureFlagEvaluations() {
  const evaluations = emptyPosthogFeatureFlagEvaluations();
  const client2 = await getPosthogClient();
  if (!client2) return evaluations;
  try {
    const { getOrCreateBlumeId: getOrCreateBlumeId2 } = await Promise.resolve().then(() => blumeUserHost);
    const distinctId = await getOrCreateBlumeId2().catch(() => "main-process");
    const keys = POSTHOG_FEATURE_FLAGS.map(({ key }) => key);
    const flags = await client2.getAllFlags(distinctId, { flagKeys: keys });
    for (const key of keys) {
      const posthogEnabled = Object.hasOwn(flags, key);
      const value = flags[key];
      evaluations[key] = {
        posthogStatus: posthogEnabled ? "enabled" : "not-active",
        installationEnabled: posthogEnabled ? value !== false : false
      };
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] feature flag evaluation read failed:", err);
    }
  }
  return evaluations;
}
async function aliasTelemetryDistinctId(alias, properties = {}) {
  if (isPosthogTrackingDisabled()) return false;
  const apiKey = telemetryKey();
  if (!apiKey || !alias) return false;
  try {
    const { getOrCreateBlumeId: getOrCreateBlumeId2 } = await Promise.resolve().then(() => blumeUserHost);
    const distinctId = await getOrCreateBlumeId2();
    const eventProperties = normalizeProperties({
      ...properties,
      ...mainTelemetryProperties(),
      distinct_id: distinctId,
      alias
    });
    await fetch(`${telemetryHost()}/capture/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        event: "$create_alias",
        distinct_id: distinctId,
        properties: eventProperties
      })
    });
    return true;
  } catch (telemetryErr) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] main alias failed:", telemetryErr);
    }
    return false;
  }
}
async function captureAppError(source, err, properties = {}) {
  if (evidencePins.isExpectedSqliteDiskFullError(err)) {
    const telemetryError2 = safeTelemetryError(source, err);
    writeAppLog(
      "warn",
      source,
      `SQLite disk is full: ${source}`,
      normalizeProperties({
        ...diagnosticPropertiesForError(source, err, properties),
        ...properties,
        ...serializeError(telemetryError2),
        source,
        failure_class: "sqlite_disk_full",
        reporting_action: "local_log_only"
      }),
      err
    );
    return;
  }
  const telemetryError = safeTelemetryError(source, err);
  const eventProperties = normalizeProperties({
    ...diagnosticPropertiesForError(source, err, properties),
    ...properties,
    ...serializeError(telemetryError),
    source
  });
  if (!shouldSend(source, eventProperties)) return;
  writeAppLog("error", source, `Application error: ${source}`, eventProperties, err);
  await capturePosthogLog("error", `Application error: ${source}`, {
    ...eventProperties,
    log_source: "app_error"
  });
  captureSentryException(source, telemetryError, eventProperties);
  await capturePosthogException(source, telemetryError, eventProperties);
}
const MAIN_RESPONSIVENESS_BUDGET_MS = 50;
class SampleRing {
  constructor(capacity) {
    this.capacity = capacity;
    this.buffer = new Float64Array(Math.max(1, Math.floor(capacity)));
  }
  capacity;
  buffer;
  next = 0;
  filled = 0;
  push(value) {
    this.buffer[this.next] = value;
    this.next = (this.next + 1) % this.buffer.length;
    if (this.filled < this.buffer.length) this.filled += 1;
  }
  get size() {
    return this.filled;
  }
  /** Samples sorted ascending (a copy; the ring is untouched). */
  sorted() {
    return Array.from(this.buffer.subarray(0, this.filled)).sort((a, b) => a - b);
  }
  clear() {
    this.next = 0;
    this.filled = 0;
  }
}
function percentile(sorted, p) {
  if (sorted.length === 0) return 0;
  const rank = Math.ceil(Math.min(100, Math.max(0, p)) / 100 * sorted.length);
  return sorted[Math.min(sorted.length - 1, Math.max(0, rank - 1))];
}
const OVERFLOW_CHANNEL = "(other)";
function createIpcLatencyRecorder(options = {}) {
  const sampleWindow = options.sampleWindow ?? 128;
  const maxChannels = options.maxChannels ?? 512;
  const slowCallCapacity = options.slowCallCapacity ?? 20;
  const slowCallMinMs = options.slowCallMinMs ?? 16;
  const budgetMs = options.budgetMs ?? MAIN_RESPONSIVENESS_BUDGET_MS;
  const channels = /* @__PURE__ */ new Map();
  const slowCalls = [];
  function stateFor(channel) {
    const existing = channels.get(channel);
    if (existing) return existing;
    const key = channels.size >= maxChannels - 1 ? OVERFLOW_CHANNEL : channel;
    const shared = channels.get(key);
    if (shared) return shared;
    const created = {
      count: 0,
      totalMs: 0,
      lastMs: 0,
      maxMs: 0,
      maxSyncMs: 0,
      overBudget: 0,
      samples: new SampleRing(sampleWindow)
    };
    channels.set(key, created);
    return created;
  }
  return {
    budgetMs,
    record(channel, ms, syncMs, at) {
      const state = stateFor(channel);
      state.count += 1;
      state.totalMs += ms;
      state.lastMs = ms;
      if (ms > state.maxMs) state.maxMs = ms;
      if (syncMs > state.maxSyncMs) state.maxSyncMs = syncMs;
      state.samples.push(ms);
      const overBudget = ms > budgetMs;
      if (overBudget) state.overBudget += 1;
      if (ms >= slowCallMinMs) {
        slowCalls.push({ channel, ms, syncMs, at });
        if (slowCalls.length > slowCallCapacity) slowCalls.shift();
      }
      return { overBudget };
    },
    snapshot() {
      const out = {};
      for (const [channel, state] of channels) {
        const sorted = state.samples.sorted();
        out[channel] = {
          count: state.count,
          totalMs: state.totalMs,
          lastMs: state.lastMs,
          maxMs: state.maxMs,
          p50Ms: percentile(sorted, 50),
          p95Ms: percentile(sorted, 95),
          maxSyncMs: state.maxSyncMs,
          overBudget: state.overBudget
        };
      }
      return { budgetMs, sampleWindow, channels: out, slowCalls: slowCalls.slice().reverse() };
    },
    reset() {
      channels.clear();
      slowCalls.length = 0;
    }
  };
}
function createBlockingAttribution() {
  let label = null;
  let ms = 0;
  return {
    note(nextLabel, nextMs) {
      if (nextMs > ms) {
        label = nextLabel;
        ms = nextMs;
      }
    },
    take() {
      const out = label === null ? null : { label, ms };
      label = null;
      ms = 0;
      return out;
    }
  };
}
function createLoopStallTracker(options = {}) {
  const capacity = options.capacity ?? 60;
  const budgetMs = options.budgetMs ?? MAIN_RESPONSIVENESS_BUDGET_MS;
  const windows = [];
  let stallCount = 0;
  let worstMs = 0;
  let lastStall = null;
  return {
    budgetMs,
    push(window) {
      windows.push(window);
      if (windows.length > capacity) windows.shift();
      if (window.maxMs > worstMs) worstMs = window.maxMs;
      const stalled = window.maxMs > budgetMs;
      if (stalled) {
        stallCount += 1;
        lastStall = window;
      }
      return { stalled };
    },
    summary() {
      return { windows: windows.slice(), stallCount, worstMs, lastStall };
    },
    reset() {
      windows.length = 0;
      stallCount = 0;
      worstMs = 0;
      lastStall = null;
    }
  };
}
function createRateLimiter(options) {
  const maxKeys = options.maxKeys ?? 256;
  const keys = /* @__PURE__ */ new Map();
  return (key, now) => {
    const entry = keys.get(key);
    if (entry && now - entry.lastAt < options.intervalMs) {
      entry.suppressed += 1;
      return { emit: false, suppressed: entry.suppressed };
    }
    const suppressed = entry?.suppressed ?? 0;
    keys.delete(key);
    keys.set(key, { lastAt: now, suppressed: 0 });
    if (keys.size > maxKeys) {
      const oldest = keys.keys().next().value;
      if (oldest !== void 0) keys.delete(oldest);
    }
    return { emit: true, suppressed };
  };
}
const execFileAsync$2 = require$$1.promisify(node_child_process.execFile);
const SAMPLE_WINDOW = 20;
const HISTORY_RETENTION_MS = 30 * 6e4;
const HISTORY_SAMPLE_INTERVAL_MS = 5e3;
const BACKGROUND_HISTORY_SAMPLE_INTERVAL_MS = 6e4;
const MIN_HISTORY_SAMPLE_GAP_MS = HISTORY_SAMPLE_INTERVAL_MS - 500;
const EXTERNAL_PROCESS_REFRESH_TIMEOUT_MS = 2e3;
const MAX_EXTERNAL_PROCESS_DEPTH = 4;
const MAX_EXTERNAL_PROCESSES = 64;
const sections = /* @__PURE__ */ new Map();
function median(sorted) {
  if (sorted.length === 0) return 0;
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function track(name, fn) {
  const start = performance.now();
  const cpuStart = process.cpuUsage();
  const finish2 = () => {
    const ms = performance.now() - start;
    const cpu = process.cpuUsage(cpuStart);
    const cpuMs = (cpu.user + cpu.system) / 1e3;
    const s = sections.get(name) ?? {
      count: 0,
      totalMs: 0,
      lastMs: 0,
      maxMs: 0,
      cpuMs: 0,
      p50Ms: 0,
      samples: []
    };
    s.count += 1;
    s.totalMs += ms;
    s.lastMs = ms;
    if (ms > s.maxMs) s.maxMs = ms;
    s.cpuMs += cpuMs;
    s.samples.push(ms);
    if (s.samples.length > SAMPLE_WINDOW) s.samples.shift();
    sections.set(name, s);
  };
  try {
    const out = fn();
    if (out && typeof out.then === "function") {
      blocking.note(name, performance.now() - start);
      return out.finally(finish2);
    }
    finish2();
    blocking.note(name, performance.now() - start);
    return out;
  } catch (e) {
    finish2();
    throw e;
  }
}
const LOOP_RESOLUTION_MS = 20;
const LOOP_WINDOW_MS = 5e3;
const LOOP_WINDOW_CAPACITY = 60;
const WARNING_INTERVAL_MS = 6e4;
const perfLog = createAppLogger("main.perf");
const ipcLatency = createIpcLatencyRecorder();
const blocking = createBlockingAttribution();
const loopStalls = createLoopStallTracker({ capacity: LOOP_WINDOW_CAPACITY });
const shouldWarn = createRateLimiter({ intervalMs: WARNING_INTERVAL_MS });
let loopHistogram = null;
function roundMs(ms) {
  return Math.round(ms * 10) / 10;
}
function finishIpc(channel, start, syncMs) {
  const ms = performance.now() - start;
  const { overBudget } = ipcLatency.record(channel, ms, syncMs, Date.now());
  if (!overBudget || channel.startsWith("perf:")) return;
  const { emit, suppressed } = shouldWarn(`ipc:${channel}`, Date.now());
  if (!emit) return;
  perfLog.warn("slow IPC handler", {
    channel,
    duration_ms: roundMs(ms),
    sync_ms: roundMs(syncMs),
    budget_ms: MAIN_RESPONSIVENESS_BUDGET_MS,
    blocked_main: syncMs > MAIN_RESPONSIVENESS_BUDGET_MS,
    suppressed_since_last: suppressed
  });
}
function timeIpcHandler(channel, invoke) {
  const start = performance.now();
  let out;
  try {
    out = invoke();
  } catch (error) {
    const syncMs2 = performance.now() - start;
    blocking.note(channel, syncMs2);
    finishIpc(channel, start, syncMs2);
    throw error;
  }
  const syncMs = performance.now() - start;
  blocking.note(channel, syncMs);
  if (out && typeof out.then === "function") {
    return out.finally(() => finishIpc(channel, start, syncMs));
  }
  finishIpc(channel, start, syncMs);
  return out;
}
function timedIpcMain(ipc) {
  return {
    handle: (channel, listener) => ipc.handle(channel, (event, ...args) => timeIpcHandler(channel, () => listener(event, ...args))),
    removeHandler: (channel) => ipc.removeHandler(channel),
    on(channel, listener) {
      ipc.on(channel, listener);
      return this;
    },
    removeAllListeners(channel) {
      ipc.removeAllListeners(channel);
      return this;
    }
  };
}
function readLoopHistogram(histogram) {
  if (histogram.count === 0) return { maxMs: 0, p99Ms: 0, meanMs: 0 };
  return {
    maxMs: histogram.max / 1e6,
    p99Ms: histogram.percentile(99) / 1e6,
    meanMs: histogram.mean / 1e6
  };
}
function closeLoopWindow() {
  const histogram = loopHistogram;
  if (!histogram) return;
  const window = { at: Date.now(), ...readLoopHistogram(histogram) };
  histogram.reset();
  const culprit = blocking.take();
  if (culprit && culprit.ms >= window.maxMs * 0.25) {
    window.culprit = culprit.label;
    window.culpritMs = culprit.ms;
  }
  const { stalled } = loopStalls.push(window);
  if (!stalled) return;
  const { emit, suppressed } = shouldWarn("loop", window.at);
  if (!emit) return;
  perfLog.warn("main event loop stalled", {
    max_delay_ms: roundMs(window.maxMs),
    p99_delay_ms: roundMs(window.p99Ms),
    window_ms: LOOP_WINDOW_MS,
    budget_ms: MAIN_RESPONSIVENESS_BUDGET_MS,
    // The longest synchronous IPC handler or tracked section in the window, if any.
    channel: window.culprit ?? null,
    channel_sync_ms: window.culpritMs === void 0 ? null : roundMs(window.culpritMs),
    suppressed_since_last: suppressed
  });
}
function startEventLoopMonitor() {
  if (loopHistogram) return;
  try {
    loopHistogram = require$$5.monitorEventLoopDelay({ resolution: LOOP_RESOLUTION_MS });
    loopHistogram.enable();
  } catch {
    loopHistogram = null;
    return;
  }
  const timer2 = setInterval(closeLoopWindow, LOOP_WINDOW_MS);
  timer2.unref?.();
}
function eventLoopSnapshot() {
  return {
    enabled: loopHistogram !== null,
    resolutionMs: LOOP_RESOLUTION_MS,
    windowMs: LOOP_WINDOW_MS,
    budgetMs: loopStalls.budgetMs,
    current: loopHistogram ? readLoopHistogram(loopHistogram) : null,
    ...loopStalls.summary()
  };
}
const watcher = { eventsTotal: 0, debouncedFires: 0, windowEvents: [] };
function recordWatcherEvent() {
  watcher.eventsTotal += 1;
  const now = Date.now();
  watcher.windowEvents.push(now);
  const cutoff = now - 5e3;
  while (watcher.windowEvents.length && watcher.windowEvents[0] < cutoff) {
    watcher.windowEvents.shift();
  }
}
function recordWatcherFire() {
  watcher.debouncedFires += 1;
}
let lastCpu = process.cpuUsage();
let lastCpuAt = performance.now();
function mainCpuPercent() {
  const now = performance.now();
  const usage = process.cpuUsage(lastCpu);
  const elapsedMs = now - lastCpuAt;
  lastCpu = process.cpuUsage();
  lastCpuAt = now;
  if (elapsedMs <= 0) return 0;
  const cpuMs = (usage.user + usage.system) / 1e3;
  return cpuMs / elapsedMs * 100;
}
function electronAppMetrics() {
  try {
    if (typeof deliveryNative.app?.getAppMetrics !== "function") return [];
    const rendererRoles = /* @__PURE__ */ new Map();
    if (typeof deliveryNative.BrowserWindow?.getAllWindows === "function") {
      for (const window of deliveryNative.BrowserWindow.getAllWindows()) {
        if (window.isDestroyed() || window.webContents.isDestroyed()) continue;
        const pid = window.webContents.getOSProcessId();
        if (pid <= 0) continue;
        rendererRoles.set(
          pid,
          window.webContents.getURL().startsWith("data:text/html") ? "tray-renderer" : "ui-renderer"
        );
      }
    }
    return deliveryNative.app.getAppMetrics().map((m) => ({
      pid: m.pid,
      type: m.type,
      name: m.name,
      role: rendererRoles.get(m.pid),
      cpuPercent: m.cpu?.percentCPUUsage ?? 0,
      memoryMB: (m.memory?.workingSetSize ?? 0) / 1024
    }));
  } catch {
    return [];
  }
}
let externalProcessCache = [];
let externalProcessCacheAt = 0;
let externalProcessRefresh = null;
function parsePsRows(stdout) {
  const rows = [];
  for (const line of stdout.split("\n")) {
    const match = line.match(/^\s*(\d+)\s+(\d+)\s+([\d.]+)\s+(\d+)\s+(.+?)\s*$/);
    if (!match) continue;
    rows.push({
      pid: Number(match[1]),
      ppid: Number(match[2]),
      cpuPercent: Number(match[3]),
      memoryMB: Number(match[4]) / 1024,
      command: match[5]
    });
  }
  return rows;
}
function roleForCommand(command) {
  if (command.includes("parseWorker") || command.includes("blume-parse-worker"))
    return "parse worker";
  if (/\bclaude\b/i.test(command)) return "claude cli";
  if (/\bcodex\b/i.test(command)) return "codex cli";
  if (/\bnode\b/i.test(command)) return "node child";
  if (/\bbun\b/i.test(command)) return "bun child";
  if (/\bpython[0-9.]*\b/i.test(command)) return "python child";
  return "child process";
}
async function refreshExternalProcesses(appMetricPids) {
  if (process.platform !== "darwin") return;
  if (Date.now() - externalProcessCacheAt < HISTORY_SAMPLE_INTERVAL_MS) return;
  if (externalProcessRefresh) return externalProcessRefresh;
  externalProcessRefresh = (async () => {
    try {
      const { stdout } = await execFileAsync$2("/bin/ps", ["-Ao", "pid=,ppid=,pcpu=,rss=,command="], {
        timeout: EXTERNAL_PROCESS_REFRESH_TIMEOUT_MS,
        maxBuffer: 512 * 1024
      });
      const byParent = /* @__PURE__ */ new Map();
      for (const row of parsePsRows(stdout)) {
        const children2 = byParent.get(row.ppid) ?? [];
        children2.push(row);
        byParent.set(row.ppid, children2);
      }
      const out = [];
      const stack = (byParent.get(process.pid) ?? []).map((row) => ({ row, depth: 1 }));
      const seen = /* @__PURE__ */ new Set();
      while (stack.length > 0 && out.length < MAX_EXTERNAL_PROCESSES) {
        const entry = stack.pop();
        if (!entry || seen.has(entry.row.pid)) continue;
        seen.add(entry.row.pid);
        if (entry.depth < MAX_EXTERNAL_PROCESS_DEPTH) {
          for (const child of byParent.get(entry.row.pid) ?? []) {
            stack.push({ row: child, depth: entry.depth + 1 });
          }
        }
        if (appMetricPids.has(entry.row.pid)) continue;
        out.push({
          pid: entry.row.pid,
          ppid: entry.row.ppid,
          role: roleForCommand(entry.row.command),
          cpuPercent: entry.row.cpuPercent,
          memoryMB: entry.row.memoryMB,
          command: entry.row.command
        });
      }
      externalProcessCache = out;
    } catch {
    } finally {
      externalProcessCacheAt = Date.now();
      externalProcessRefresh = null;
    }
  })();
  return externalProcessRefresh;
}
const history = [];
let lastHistorySampleAt = 0;
function sumMetrics(metrics, predicate) {
  return metrics.reduce(
    (acc, metric) => {
      if (!predicate(metric)) return acc;
      acc.cpuPercent += metric.cpuPercent;
      acc.memoryMB += metric.memoryMB;
      return acc;
    },
    { cpuPercent: 0, memoryMB: 0 }
  );
}
function pushHistorySample(sample) {
  if (sample.at - lastHistorySampleAt < MIN_HISTORY_SAMPLE_GAP_MS) return;
  lastHistorySampleAt = sample.at;
  history.push(sample);
  const cutoff = sample.at - HISTORY_RETENTION_MS;
  while (history.length > 0 && history[0].at < cutoff) history.shift();
}
async function collectSnapshot() {
  const mem = process.memoryUsage();
  const sectionsOut = {};
  for (const [k, v] of sections) {
    const sorted = v.samples.slice().sort((a, b) => a - b);
    sectionsOut[k] = {
      count: v.count,
      totalMs: v.totalMs,
      lastMs: v.lastMs,
      maxMs: v.maxMs,
      cpuMs: v.cpuMs,
      p50Ms: median(sorted)
    };
  }
  const appMetrics = electronAppMetrics();
  await refreshExternalProcesses(new Set(appMetrics.map((metric) => metric.pid)));
  const eventsPerSec = watcher.windowEvents.length / 5;
  const mainCpu = mainCpuPercent();
  const mainMemory = mem.rss / 1024 / 1024;
  const renderers = sumMetrics(
    appMetrics,
    (metric) => metric.type === "Tab" || metric.type === "Renderer"
  );
  const gpu = sumMetrics(appMetrics, (metric) => metric.type === "GPU");
  const utility = sumMetrics(
    appMetrics,
    (metric) => !["Browser", "Tab", "Renderer", "GPU"].includes(metric.type)
  );
  const external = externalProcessCache.reduce(
    (acc, metric) => {
      acc.cpuPercent += metric.cpuPercent;
      acc.memoryMB += metric.memoryMB;
      return acc;
    },
    { cpuPercent: 0, memoryMB: 0 }
  );
  const totalCpuPercent = mainCpu + renderers.cpuPercent + gpu.cpuPercent + utility.cpuPercent + external.cpuPercent;
  const totalMemoryMB = mainMemory + renderers.memoryMB + gpu.memoryMB + utility.memoryMB + external.memoryMB;
  pushHistorySample({
    at: Date.now(),
    mainCpuPercent: mainCpu,
    mainMemoryMB: mainMemory,
    rendererCpuPercent: renderers.cpuPercent,
    rendererMemoryMB: renderers.memoryMB,
    gpuCpuPercent: gpu.cpuPercent,
    gpuMemoryMB: gpu.memoryMB,
    utilityCpuPercent: utility.cpuPercent,
    utilityMemoryMB: utility.memoryMB,
    externalCpuPercent: external.cpuPercent,
    externalMemoryMB: external.memoryMB,
    totalCpuPercent,
    totalMemoryMB,
    processCount: appMetrics.length + externalProcessCache.length
  });
  return {
    uptimeSec: process.uptime(),
    main: {
      pid: process.pid,
      rssMB: mainMemory,
      heapUsedMB: mem.heapUsed / 1024 / 1024,
      heapTotalMB: mem.heapTotal / 1024 / 1024,
      externalMB: mem.external / 1024 / 1024,
      cpuPercent: mainCpu
    },
    appMetrics,
    externalProcesses: externalProcessCache,
    backgroundProcesses: getBackgroundProcessActivity(),
    history: {
      retentionMs: HISTORY_RETENTION_MS,
      sampleIntervalMs: HISTORY_SAMPLE_INTERVAL_MS,
      samples: history.slice()
    },
    sections: sectionsOut,
    watcher: {
      eventsTotal: watcher.eventsTotal,
      eventsPerSec,
      debouncedFires: watcher.debouncedFires
    },
    caches: {},
    ipcHandlers: ipcLatency.snapshot(),
    eventLoop: eventLoopSnapshot()
  };
}
async function snapshot() {
  return collectSnapshot();
}
function resetSections() {
  sections.clear();
  ipcLatency.reset();
  loopStalls.reset();
  loopHistogram?.reset();
  blocking.take();
  history.length = 0;
  lastHistorySampleAt = 0;
  externalProcessCache = [];
  externalProcessCacheAt = 0;
}
function registerPerfIpcHandlers(handleIpc2) {
  handleIpc2("perf:snapshot", () => {
    startEventLoopMonitor();
    return snapshot();
  });
  handleIpc2("perf:reset", () => resetSections());
}
const sampler = setInterval(() => {
  void collectSnapshot().catch(() => {
  });
}, BACKGROUND_HISTORY_SAMPLE_INTERVAL_MS);
sampler.unref?.();
if (process.env.NODE_ENV === "development" || process.env.BLUME_PERF_LOOP_MONITOR === "1") {
  startEventLoopMonitor();
}
function normalizeDevCdpPort(value) {
  const trimmed = value?.trim();
  if (!trimmed || !/^\d+$/.test(trimmed)) return null;
  const port = Number(trimmed);
  return Number.isSafeInteger(port) && port >= 1 && port <= 65535 ? port : null;
}
function desktopDevRuntimeCapabilities(value = process.env.BLUME_DEV_PROFILE, dev = utils.is.dev) {
  const profile = dev ? index$1.normalizeDevRuntimeProfile(value) : "full";
  return {
    profile,
    fixtureProductHost: profile !== "full",
    conversationBackground: profile === "full" || profile === "conversations",
    menuBarStatus: profile === "full" || profile === "native",
    startupInstall: profile === "full"
  };
}
const icon = pn.join(__dirname, "../../resources/icon.png");
pn.join(__dirname, "../../resources/icon-canary.png");
const devIcon = pn.join(__dirname, "../../resources/icon-dev.png");
const bluebellFlowerIcon = pn.join(__dirname, "./chunks/purple-bluebell-B6UJHSR9.png");
const forgetmenotFlowerIcon = pn.join(__dirname, "./chunks/blue-forgetmenot-BAws048N.png");
const tulipFlowerIcon = pn.join(__dirname, "./chunks/red-tulip-VlhzxOLV.png");
const sunflowerFlowerIcon = pn.join(__dirname, "./chunks/yellow-sunflower-BAow68v-.png");
const lantanaFlowerIcon = pn.join(__dirname, "./chunks/orange-lantana-CZ07uvmJ.png");
const daylilyFlowerIcon = pn.join(__dirname, "./chunks/orange-daylily-BYI6SyRv.png");
const stableBluebellDockIcon = pn.join(__dirname, "../../resources/dock-icons/stable/bluebell.png");
const stableForgetmenotDockIcon = pn.join(__dirname, "../../resources/dock-icons/stable/forgetmenot.png");
const stableTulipDockIcon = pn.join(__dirname, "../../resources/dock-icons/stable/tulip.png");
const stableSunflowerDockIcon = pn.join(__dirname, "../../resources/dock-icons/stable/sunflower.png");
const stableLantanaDockIcon = pn.join(__dirname, "../../resources/dock-icons/stable/lantana.png");
const stableDaylilyDockIcon = pn.join(__dirname, "../../resources/dock-icons/stable/daylily.png");
const devBluebellDockIcon = pn.join(__dirname, "../../resources/dock-icons/dev/bluebell.png");
const devForgetmenotDockIcon = pn.join(__dirname, "../../resources/dock-icons/dev/forgetmenot.png");
const devTulipDockIcon = pn.join(__dirname, "../../resources/dock-icons/dev/tulip.png");
const devSunflowerDockIcon = pn.join(__dirname, "../../resources/dock-icons/dev/sunflower.png");
const devLantanaDockIcon = pn.join(__dirname, "../../resources/dock-icons/dev/lantana.png");
const devDaylilyDockIcon = pn.join(__dirname, "../../resources/dock-icons/dev/daylily.png");
pn.join(__dirname, "../../resources/dock-icons/canary/bluebell.png");
pn.join(__dirname, "../../resources/dock-icons/canary/forgetmenot.png");
pn.join(__dirname, "../../resources/dock-icons/canary/tulip.png");
pn.join(__dirname, "../../resources/dock-icons/canary/sunflower.png");
pn.join(__dirname, "../../resources/dock-icons/canary/lantana.png");
pn.join(__dirname, "../../resources/dock-icons/canary/daylily.png");
const trayBadgeFont = pn.join(__dirname, "../../resources/fonts/IBMPlexMono-Bold.ttf").replace("app.asar", "app.asar.unpacked");
const claudeHarnessIcon = pn.join(__dirname, "./chunks/claude-BjlfIf8i.svg");
const codexHarnessIcon = pn.join(__dirname, "./chunks/codex-BCRGHP5D.svg");
const cursorHarnessIcon = pn.join(__dirname, "./chunks/cursor-DySahzQu.svg");
const ompHarnessIcon = pn.join(__dirname, "./chunks/omp-O5aRTSEZ.svg");
const piHarnessIcon = pn.join(__dirname, "./chunks/pi-D84axEc9.svg");
function createIdleShutdown(delayMs, shutdown) {
  let timer2 = null;
  return {
    cancel() {
      if (!timer2) return;
      clearTimeout(timer2);
      timer2 = null;
    },
    schedule() {
      if (timer2) clearTimeout(timer2);
      timer2 = setTimeout(() => {
        timer2 = null;
        shutdown();
      }, delayMs);
      timer2.unref?.();
    }
  };
}
function parserResolveContext() {
  return {
    devAppPath: utils.is.dev ? deliveryNative.app.getAppPath() : void 0,
    resourcesPath: utils.is.dev ? void 0 : process.resourcesPath,
    env: process.env,
    platform: process.platform
  };
}
let cachedPath;
function getHarnessParserBinaryPath() {
  if (cachedPath === void 0) {
    cachedPath = rustBinding_node.resolveHarnessParserBinaryPath(parserResolveContext());
  }
  return cachedPath;
}
let cachedBinding;
let parserWorker = null;
let parserWorkerAlive = false;
let parserWorkerRequestId = 0;
const pendingParserRequests = /* @__PURE__ */ new Map();
const PARSER_WORKER_IDLE_MS = 6e4;
const parserWorkerIdle = createIdleShutdown(PARSER_WORKER_IDLE_MS, () => {
  if (pendingParserRequests.size > 0) return;
  const worker2 = parserWorker;
  parserWorker = null;
  parserWorkerAlive = false;
  try {
    if (worker2) {
      terminateBackgroundProcess(worker2, BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding, "idle");
    }
  } catch {
  }
});
function isUtilityParserExpected() {
  if (process.env.BLUME_DISABLE_PARSE_WORKER === "1") return false;
  return typeof deliveryNative.utilityProcess?.fork === "function";
}
function rejectPendingParserRequests(err) {
  for (const [id, request2] of pendingParserRequests) {
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding, id);
    request2.reject(err);
  }
  pendingParserRequests.clear();
}
function responseError$4(response) {
  const err = new Error(response.errorMessage);
  if (response.errorName) err.name = response.errorName;
  if (response.errorStack) err.stack = response.errorStack;
  return err;
}
function ensureParserWorker() {
  parserWorkerIdle.cancel();
  if (parserWorker && parserWorkerAlive) return parserWorker;
  const worker2 = deliveryNative.utilityProcess.fork(pn.join(__dirname, "parserBindingWorker.js"), [], {
    serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding
  });
  worker2.on("message", (response) => {
    if (response.type !== "parse-result") return;
    const pending2 = pendingParserRequests.get(response.id);
    if (!pending2) return;
    pendingParserRequests.delete(response.id);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding, response.id);
    if (pendingParserRequests.size === 0) parserWorkerIdle.schedule();
    if (response.ok) pending2.resolve(response.parsed);
    else pending2.reject(responseError$4(response));
  });
  worker2.on("exit", () => {
    if (parserWorker !== worker2) return;
    parserWorker = null;
    parserWorkerAlive = false;
    rejectPendingParserRequests(new Error("parser worker exited"));
  });
  parserWorker = worker2;
  parserWorkerAlive = true;
  return worker2;
}
function createUtilityProcessBinding(binaryPath) {
  return {
    parse(input) {
      const id = ++parserWorkerRequestId;
      return new Promise((resolve, reject) => {
        let worker2;
        try {
          worker2 = ensureParserWorker();
        } catch (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
          return;
        }
        pendingParserRequests.set(id, { resolve, reject });
        startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding, id);
        try {
          worker2.postMessage({
            type: "parse",
            id,
            binaryPath,
            input
          });
        } catch (err) {
          pendingParserRequests.delete(id);
          finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding, id);
          if (pendingParserRequests.size === 0) parserWorkerIdle.schedule();
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      });
    }
  };
}
function disposeParserBindingWorker() {
  parserWorkerIdle.cancel();
  const worker2 = parserWorker;
  parserWorker = null;
  parserWorkerAlive = false;
  clearBackgroundProcessRequests(BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding);
  rejectPendingParserRequests(new Error("parser worker disposed"));
  if (!worker2) return;
  try {
    terminateBackgroundProcess(worker2, BLUME_BACKGROUND_PROCESS_SERVICES.parserBinding, "dispose");
  } catch {
  }
}
function getParserBinding() {
  if (cachedBinding === void 0) {
    const binaryPath = getHarnessParserBinaryPath();
    cachedBinding = binaryPath && isUtilityParserExpected() ? createUtilityProcessBinding(binaryPath) : null;
  }
  return cachedBinding;
}
const WATCH_RETRY_MS = 5e3;
const WATCH_HEALTH_SETTLE_MS = 2e3;
function nativeRecursiveWatchSupported() {
  return process.platform === "darwin" || process.platform === "win32";
}
function resolveEventPath(root, filename) {
  if (!filename) return null;
  const name = filename.toString();
  if (!name) return null;
  return pn.isAbsolute(name) ? name : pn.join(root, name);
}
class NativeConversationWatcher {
  constructor(roots, ignored) {
    this.ignored = ignored;
    for (const root of roots) this.openRoot(root);
    this.readyTimer = setTimeout(() => {
      if (this.failedPaths.size === 0) this.emit("ready");
    }, WATCH_HEALTH_SETTLE_MS);
  }
  ignored;
  handlers = /* @__PURE__ */ new Map();
  watchers = /* @__PURE__ */ new Map();
  watchedPaths = /* @__PURE__ */ new Set();
  failedPaths = /* @__PURE__ */ new Set();
  retryTimers = /* @__PURE__ */ new Map();
  healthTimers = /* @__PURE__ */ new Set();
  readyTimer;
  closed = false;
  on(event, handler) {
    const handlers = this.handlers.get(event) ?? /* @__PURE__ */ new Set();
    handlers.add(handler);
    this.handlers.set(event, handlers);
    return this;
  }
  close() {
    if (this.closed) return;
    this.closed = true;
    clearTimeout(this.readyTimer);
    for (const timer2 of this.retryTimers.values()) clearTimeout(timer2);
    for (const timer2 of this.healthTimers) clearTimeout(timer2);
    this.retryTimers.clear();
    this.healthTimers.clear();
    for (const watcher2 of this.watchers.values()) {
      try {
        watcher2.close();
      } catch {
      }
    }
    this.watchers.clear();
    this.handlers.clear();
  }
  emit(event, ...args) {
    if (this.closed) return;
    for (const handler of this.handlers.get(event) ?? []) {
      try {
        handler(...args);
      } catch {
      }
    }
  }
  openRoot(root) {
    try {
      const stats2 = un.statSync(root);
      if (stats2.isDirectory()) {
        if (nativeRecursiveWatchSupported()) this.openFsWatcher(root, true);
        else this.watchDirectoryTree(root);
        return;
      }
      if (stats2.isFile()) this.openFsWatcher(pn.dirname(root), false);
    } catch {
    }
  }
  openFsWatcher(root, recursive) {
    if (this.closed || this.watchedPaths.has(root)) return;
    this.watchedPaths.add(root);
    try {
      const watcher2 = un.watch(root, { persistent: true, recursive }, (eventType, filename) => {
        const eventPath = resolveEventPath(root, filename);
        if (!eventPath) return;
        void this.handlePathEvent(eventPath, eventType);
      });
      this.watchers.set(root, watcher2);
      watcher2.on("error", (error) => {
        if (this.watchers.get(root) !== watcher2) return;
        this.watchers.delete(root);
        this.watchedPaths.delete(root);
        try {
          watcher2.close();
        } catch {
        }
        this.scheduleRetry(root, recursive, error);
      });
      const healthTimer = setTimeout(() => {
        this.healthTimers.delete(healthTimer);
        if (this.closed || this.watchers.get(root) !== watcher2) return;
        if (this.failedPaths.delete(root) && this.failedPaths.size === 0) this.emit("ready");
      }, WATCH_HEALTH_SETTLE_MS);
      healthTimer.unref();
      this.healthTimers.add(healthTimer);
    } catch (error) {
      this.watchedPaths.delete(root);
      this.scheduleRetry(root, recursive, error);
    }
  }
  scheduleRetry(root, recursive, error) {
    if (this.closed) return;
    this.failedPaths.add(root);
    queueMicrotask(() => this.emit("error", error));
    const previous = this.retryTimers.get(root);
    if (previous) clearTimeout(previous);
    const timer2 = setTimeout(() => {
      this.retryTimers.delete(root);
      this.openFsWatcher(root, recursive);
    }, WATCH_RETRY_MS);
    timer2.unref();
    this.retryTimers.set(root, timer2);
  }
  watchDirectoryTree(root) {
    if (this.closed || this.watchedPaths.has(root)) return;
    let entries;
    try {
      entries = un.readdirSync(root, { withFileTypes: true });
    } catch {
      return;
    }
    this.openFsWatcher(root, false);
    for (const entry of entries) {
      if (entry.isDirectory()) this.watchDirectoryTree(pn.join(root, entry.name));
    }
  }
  async handlePathEvent(path, eventType) {
    if (this.closed) return;
    try {
      const stats2 = await promises.stat(path);
      if (this.closed || this.ignored(path, stats2)) return;
      if (stats2.isDirectory()) {
        if (eventType === "rename") {
          if (!nativeRecursiveWatchSupported()) this.watchDirectoryTree(path);
          this.emit("addDir", path, stats2);
        }
        return;
      }
      if (!stats2.isFile()) return;
      this.emit(eventType === "rename" ? "add" : "change", path, stats2);
    } catch {
      if (this.closed || this.ignored(path)) return;
      this.emit("unlink", path);
      if (eventType === "rename") this.emit("unlinkDir", path);
    }
  }
}
const watchHost = createConversationWatchHost({
  home: require$$0$2.homedir,
  cursorStatePaths: evidencePins.cursorComposerStatePaths,
  scheduler: {
    setTimeout,
    clearTimeout
  },
  recordWatcherEvent,
  recordWatcherFire,
  invalidateWalkCache: jsonlFiles.invalidateWalkCache,
  invalidateCursorTodoCache: evidencePins.invalidateCursorTodoCache,
  createWatcher: (roots, { ignored }) => new NativeConversationWatcher(roots, ignored)
});
function getKnownFiles(options) {
  return watchHost.getKnownFiles(options);
}
function recordKnownFileChanges(changes) {
  watchHost.recordChanges(changes);
}
function isWatcherReady() {
  return watchHost.isWatcherReady();
}
function watchConversations(onChanges, debounceMs = 250) {
  return watchHost.watchConversations(onChanges, debounceMs);
}
let localSessionParserBinding = getParserBinding;
function configureLocalSessionParserBinding(getBinding) {
  localSessionParserBinding = getBinding;
}
function claudeDesktopSessionsRoot() {
  return process.env.BLUME_CLAUDE_DESKTOP_SESSIONS_DIR || void 0;
}
function claudeTasksRoot() {
  return process.env.BLUME_CLAUDE_TASKS_DIR || void 0;
}
const localDesktopProviderHost = evidencePins.createDesktopLocalProviderHost({
  isWatcherReady,
  getKnownFiles,
  getParserBinding: () => localSessionParserBinding(),
  telemetry: {
    captureError: captureAppError,
    captureEvent: captureTelemetryEvent
  },
  readCursorComposerState: evidencePins.loadCursorComposerState,
  readCursorComposerRepoPath: evidencePins.loadCursorComposerRepoPath,
  cursorComposerStateMtimeMs: evidencePins.cursorStateMtimeMs,
  claudeDesktopSessionsRoot,
  claudeTasksRoot
});
const providers = localDesktopProviderHost.providers;
const applyClaudeDesktopTitle = localDesktopProviderHost.applyClaudeDesktopTitle;
function osascript(script) {
  return new Promise((resolve, reject) => {
    const child = node_child_process.spawn("osascript", ["-e", script], { stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`osascript exit ${code}`));
    });
  });
}
function spawnDetached(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = node_child_process.spawn(cmd, args, { cwd, detached: true, stdio: "ignore" });
    child.once("error", reject);
    child.once("spawn", () => {
      child.unref();
      resolve();
    });
  });
}
async function launchExternalTerminal(cwd, command) {
  await createTerminalLaunchPlan(
    {
      platform: process.platform,
      app: normalizeTerminalPreference(getSetting("terminal"), process.platform),
      cwd,
      command
    },
    { openExternal: (url) => deliveryNative.shell.openExternal(url), osascript, spawnDetached }
  );
}
async function openWorkingDirectoryInTerminalApp(cwd) {
  await launchExternalTerminal(cwd, "clear");
}
const HARNESS_START = {
  claude: { label: "Start Claude Code", command: "claude" },
  codex: { label: "Start Codex", command: "codex" },
  pi: { label: "Start Pi", command: "pi" },
  omp: { label: "Start OMP", command: "omp" },
  cursor: { label: "Start Cursor agent", command: "cursor-agent" }
};
const MAX_SUGGESTIONS = 4;
function shellQuote(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}
function worktreeName(now) {
  const stamp = now.toISOString().slice(0, 10);
  return `blume-${stamp}`;
}
function suggestTerminalCommands(context, now = /* @__PURE__ */ new Date()) {
  const suggestions = [];
  if (context.isRepositoryRoot) {
    const name = worktreeName(now);
    suggestions.push({
      label: "New worktree",
      command: `git worktree add ${shellQuote(`../${name}`)} -b ${shellQuote(name)}`
    });
  } else {
    const recent = context.recentProjects.find((project) => project.path !== context.cwd);
    if (recent) {
      suggestions.push({ label: `Go to ${recent.name}`, command: `cd ${shellQuote(recent.path)}` });
    }
  }
  for (const harnessId of context.availableHarnesses) {
    const start = HARNESS_START[harnessId];
    if (start) suggestions.push(start);
  }
  if (context.isRepositoryRoot) {
    suggestions.push({ label: "Status", command: "git status --short --branch" });
  }
  return suggestions.slice(0, MAX_SUGGESTIONS);
}
let cached = null;
function getStorage() {
  if (!cached) {
    const bundle = index$2.createDesktopSqliteStorage(getDb(), {
      improveNamespace: () => sqliteStorage.activeImproveNamespace()
    });
    cached = Object.fromEntries(
      Object.entries(bundle).map(([name, store]) => [
        name,
        store && typeof store === "object" ? retryBusyAsync(store) : store
      ])
    );
  }
  return cached;
}
const MAX_TIMEOUT_MS = 10 * 6e4;
const KILL_GRACE_MS = 1500;
const BACKGROUND_HARNESS_MARKER = "BLUME_BACKGROUND_HARNESS";
const MAX_CAPTURE_BYTES = 2 * 1024 * 1024;
const children = /* @__PURE__ */ new Set();
const settledSurvivors = /* @__PURE__ */ new Set();
function boundedProcessTimeout(ms) {
  if (!Number.isFinite(ms) || ms <= 0)
    throw new Error("A finite positive process timeout is required.");
  return Math.min(ms, MAX_TIMEOUT_MS);
}
function killGroup(child, signal) {
  if (child.pid === void 0) return;
  if (process.platform !== "win32") {
    try {
      process.kill(-child.pid, signal);
      return;
    } catch (error) {
      if (error.code === "ESRCH") return;
    }
  }
  try {
    child.kill(signal);
  } catch {
  }
}
function stopTree(child) {
  if (process.platform !== "win32" || child.pid === void 0) {
    killGroup(child, "SIGKILL");
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const deadline = setTimeout(() => resolve(), KILL_GRACE_MS);
    const killer = node_child_process.spawn("taskkill.exe", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
      timeout: KILL_GRACE_MS
    });
    killer.once("error", () => {
      killGroup(child, "SIGKILL");
      clearTimeout(deadline);
      resolve();
    });
    killer.once("close", () => {
      clearTimeout(deadline);
      resolve();
    });
  });
}
function stopOwnedGroupsOnExit() {
  for (const child of children) killGroup(child, "SIGKILL");
}
function waitForManagedChild(child, timeoutMs, output) {
  let invalidTimeout;
  try {
    timeoutMs = boundedProcessTimeout(timeoutMs);
  } catch (error) {
    invalidTimeout = error;
    timeoutMs = 1;
  }
  children.add(child);
  if (children.size === 1) process.on("exit", stopOwnedGroupsOnExit);
  return new Promise((resolve, reject) => {
    let timedOut = false;
    let failure = invalidTimeout;
    let settled = false;
    let finishing = false;
    let terminating = false;
    let exited = false;
    let checkingOutput = false;
    let killTimer;
    let settlementTimer;
    const releaseOwnership = () => {
      children.delete(child);
      settledSurvivors.delete(child);
      if (!children.size) process.removeListener("exit", stopOwnedGroupsOnExit);
      child.removeListener("exit", onExit);
      child.removeListener("close", onClose);
      child.removeListener("error", onError);
    };
    const clearTimers = () => {
      clearTimeout(timer2);
      if (killTimer) clearTimeout(killTimer);
      if (settlementTimer) clearTimeout(settlementTimer);
      if (outputTimer) clearInterval(outputTimer);
    };
    const terminate = () => {
      if (terminating || settled) return;
      terminating = true;
      settlementTimer = setTimeout(() => {
        if (settled) return;
        settled = true;
        clearTimers();
        if (exited || child.pid === void 0) releaseOwnership();
        else settledSurvivors.add(child);
        reject(failure ?? new Error("Background harness failed to settle after termination."));
      }, KILL_GRACE_MS * 3);
      if (process.platform === "win32") void stopTree(child);
      else killGroup(child, "SIGTERM");
      killTimer = setTimeout(() => {
        void stopTree(child);
      }, KILL_GRACE_MS);
    };
    const timer2 = setTimeout(() => {
      timedOut = true;
      terminate();
    }, timeoutMs);
    const outputTimer = output ? setInterval(() => {
      if (checkingOutput || settled) return;
      checkingOutput = true;
      void Promise.all(output.paths.map((path) => require$$0$1.stat(path))).then((stats2) => {
        if (!settled && stats2.some((value) => value.size > output.maxBytes)) {
          failure = new Error("Background harness output limit exceeded.");
          terminate();
        }
      }).catch((error) => {
        if (!settled) {
          failure = error;
          terminate();
        }
      }).finally(() => {
        checkingOutput = false;
      });
    }, 100) : void 0;
    const finish2 = async (exitCode, signal, error) => {
      if (settled || finishing) return;
      finishing = true;
      await stopTree(child);
      if (output && !error && !failure) {
        try {
          const stats2 = await Promise.all(output.paths.map((path) => require$$0$1.stat(path)));
          if (stats2.some((value) => value.size > output.maxBytes)) {
            failure = new Error("Background harness output limit exceeded.");
          }
        } catch (readError) {
          failure = readError;
        }
      }
      if (settled) return;
      settled = true;
      clearTimers();
      if (exited || child.pid === void 0) releaseOwnership();
      if (error || failure) reject(error ?? failure);
      else resolve({ exitCode, signal, timedOut });
    };
    const onError = (error) => {
      if (child.pid === void 0) void finish2(null, null, error);
      else {
        failure = error;
        terminate();
      }
    };
    let cleaningLateExit = false;
    const cleanupLateExit = async () => {
      if (cleaningLateExit) return;
      cleaningLateExit = true;
      await stopTree(child);
      releaseOwnership();
    };
    const onExit = () => {
      exited = true;
      if (settled) void cleanupLateExit();
    };
    const onClose = (code, signal) => {
      exited = true;
      if (settled) void cleanupLateExit();
      else void finish2(code, signal);
    };
    child.once("exit", onExit);
    child.on("error", onError);
    child.once("close", onClose);
  });
}
async function readBoundedProcessOutput(path, maxBytes = MAX_CAPTURE_BYTES, keep = "head") {
  const handle = await require$$0$1.open(path, "r");
  try {
    const size = (await handle.stat()).size;
    const buffer = Buffer.alloc(Math.min(size, maxBytes));
    const { bytesRead } = await handle.read(
      buffer,
      0,
      buffer.length,
      keep === "head" ? 0 : Math.max(0, size - buffer.length)
    );
    return buffer.subarray(0, bytesRead).toString("utf8");
  } finally {
    await handle.close();
  }
}
const IS_WINDOWS = process.platform === "win32";
function knownCliDirs() {
  const home = Nl.homedir();
  if (IS_WINDOWS) {
    const appData = process.env.APPDATA ?? _n.join(home, "AppData", "Roaming");
    return [_n.join(home, ".local", "bin"), _n.join(appData, "npm"), _n.join(home, ".bun", "bin")];
  }
  return [
    _n.join(home, ".local", "bin"),
    _n.join(home, "bin"),
    _n.join(home, ".bun", "bin"),
    _n.join(home, ".n", "bin"),
    _n.join(home, ".npm-global", "bin"),
    "/opt/homebrew/bin",
    "/usr/local/bin"
  ];
}
const SHELL_PROBE_TIMEOUT_MS = 5e3;
let shellPathPromise;
function resolveShellPath() {
  if (!shellPathPromise) {
    shellPathPromise = (async () => {
      const discovered = IS_WINDOWS ? "" : await probeInteractiveShellPath().catch(() => "");
      const dirs = [
        ...discovered.split(_n.delimiter),
        ...(process.env.PATH ?? "").split(_n.delimiter),
        ...knownCliDirs()
      ].filter(Boolean);
      const seen = /* @__PURE__ */ new Set();
      const merged = [];
      for (const dir of dirs) {
        if (!seen.has(dir)) {
          seen.add(dir);
          merged.push(dir);
        }
      }
      return merged.join(_n.delimiter);
    })();
  }
  return shellPathPromise;
}
async function probeInteractiveShellPath() {
  const shell = process.env.SHELL && process.env.SHELL.startsWith("/") ? process.env.SHELL : "/bin/zsh";
  const tmpRoot = await require$$0$1.mkdtemp(_n.join(Nl.tmpdir(), "blume-path-"));
  const outPath = _n.join(tmpRoot, "path.txt");
  try {
    await require$$0$1.writeFile(outPath, "");
    const child = node_child_process.spawn(shell, ["-ilc", `printf %s "$PATH" > ${harnessCli.shellQuote(outPath)}`], {
      env: { ...process.env, [BACKGROUND_HARNESS_MARKER]: "1" },
      detached: !IS_WINDOWS,
      stdio: "ignore"
    });
    await waitForManagedChild(child, SHELL_PROBE_TIMEOUT_MS, {
      paths: [outPath],
      maxBytes: MAX_CAPTURE_BYTES
    }).catch(() => {
    });
    return (await readBoundedProcessOutput(outPath).catch(() => "")).trim();
  } finally {
    await require$$0$1.rm(tmpRoot, { recursive: true, force: true }).catch(() => {
    });
  }
}
async function isExecutableFile(path) {
  if (!_n.isAbsolute(path)) return false;
  return require$$0$1.access(path, fs.constants.X_OK).then(
    () => true,
    () => false
  );
}
function executableCandidateNames(bin, windows = IS_WINDOWS) {
  return harnessCli.executableCandidateNames(bin, windows);
}
async function resolveCommand(bin) {
  const override = index.harnessCliBinaryOverride(bin, process.env);
  if (override && await isExecutableFile(override)) return override;
  const path = await resolveShellPath();
  const names = executableCandidateNames(bin);
  for (const dir of path.split(_n.delimiter)) {
    if (!dir) continue;
    for (const name of names) {
      const candidate = _n.join(dir, name);
      if (await isExecutableFile(candidate)) return candidate;
    }
  }
  return null;
}
async function commandExists(bin) {
  return await resolveCommand(bin) !== null;
}
async function isRepositoryRoot(cwd) {
  try {
    await require$$0$1.access(_n.join(cwd, ".git"));
    return true;
  } catch {
    return false;
  }
}
async function currentBranch(cwd) {
  try {
    const head = await require$$0$1.readFile(_n.join(cwd, ".git", "HEAD"), "utf8");
    const match = /ref:\s*refs\/heads\/(.+)/.exec(head.trim());
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}
async function installedHarnesses() {
  const found = [];
  for (const harnessId of index.harnessIds()) {
    const bin = harnessId === "cursor" ? "cursor-agent" : harnessId;
    if (await resolveCommand(bin)) found.push(harnessId);
  }
  return found;
}
async function deriveTerminalSuggestions(cwd) {
  try {
    const [repositoryRoot, branch, availableHarnesses] = await Promise.all([
      isRepositoryRoot(cwd),
      currentBranch(cwd),
      installedHarnesses()
    ]);
    let recentProjects = [];
    try {
      const recent = await getStorage().desktopProjects.listRecentProjects(5);
      recentProjects = recent.map((project) => ({ name: project.name, path: project.path }));
    } catch {
    }
    return suggestTerminalCommands({
      cwd,
      isRepositoryRoot: repositoryRoot,
      branch,
      availableHarnesses,
      recentProjects
    });
  } catch {
    return [];
  }
}
const MAX_TABS = 8;
const MAX_INPUT_BYTES = 64 * 1024;
const REQUEST_TIMEOUT_MS$5 = 15e3;
class TerminalWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "TerminalWorkerUnavailableError";
  }
}
let worker$5 = null;
let requestId$2 = 0;
const pending$4 = /* @__PURE__ */ new Map();
const tabs = /* @__PURE__ */ new Map();
const detachedTabs = /* @__PURE__ */ new Set();
const backlog = /* @__PURE__ */ new Map();
const attached = /* @__PURE__ */ new Map();
let broadcaster = null;
let openBarrier = Promise.resolve();
async function ensureTerminalCapacity() {
  if (tabs.size < MAX_TABS) return;
  for (const [id, tab] of tabs) {
    if (tab.status !== "exited" && tab.status !== "failed") continue;
    await closeTerminal(id);
    if (tabs.size < MAX_TABS) return;
  }
  throw new Error(`Blume supports at most ${MAX_TABS} open terminals`);
}
function forgetTerminal(tabId) {
  tabs.delete(tabId);
  detachedTabs.delete(tabId);
  backlog.delete(tabId);
  attached.delete(tabId);
}
function failPending(error) {
  for (const [id, request2] of pending$4) {
    clearTimeout(request2.timeout);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.terminal, id);
    request2.reject(error);
  }
  pending$4.clear();
}
function markTabsDetached() {
  for (const [id, tab] of tabs) {
    detachedTabs.add(id);
    if (tab.status === "exited" || tab.status === "failed") continue;
    const failed = { ...tab, status: "failed" };
    tabs.set(id, failed);
    broadcaster?.broadcast("terminal:status", failed);
  }
}
function terminateWorker(next, error) {
  if (worker$5 !== next) return;
  worker$5 = null;
  try {
    terminateBackgroundProcess(next, BLUME_BACKGROUND_PROCESS_SERVICES.terminal, "request-timeout");
  } catch {
  }
  failPending(error);
  markTabsDetached();
}
function rememberOutput(tabId, data) {
  const next = `${backlog.get(tabId) ?? ""}${data}`;
  backlog.set(tabId, next.slice(-131072));
}
function forwardOutput(tabId, data) {
  const subscribers = attached.get(tabId);
  if (!subscribers?.size) {
    rememberOutput(tabId, data);
    return;
  }
  let delivered = false;
  for (const webContents of [...subscribers]) {
    if (webContents.isDestroyed()) {
      subscribers.delete(webContents);
      continue;
    }
    webContents.send("terminal:output", tabId, data);
    delivered = true;
  }
  if (!delivered) rememberOutput(tabId, data);
}
function ensureWorker$5() {
  if (worker$5) return worker$5;
  const next = deliveryNative.utilityProcess.fork(_n.join(__dirname, "terminalWorker.js"), [], {
    serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.terminal
  });
  next.on("message", (message) => {
    if (worker$5 !== next) return;
    if (message.type === "output") {
      forwardOutput(message.tabId, message.data);
      return;
    }
    if (message.type === "status") {
      const known = tabs.get(message.tab.id);
      const ended = message.tab.status === "exited" || message.tab.status === "failed";
      const stillRunning = known?.commandRunning === true && !ended;
      const merged = {
        ...message.tab,
        ...known?.suggestions ? { suggestions: known.suggestions } : {},
        ...known?.continueLabel ? { continueLabel: known.continueLabel } : {},
        ...known?.command ? { command: known.command } : {},
        ...known?.commandRunning !== void 0 ? { commandRunning: stillRunning } : {}
      };
      tabs.set(merged.id, merged);
      broadcaster?.broadcast("terminal:status", merged);
      if (known?.commandRunning === true && ended) {
        broadcaster?.broadcast("terminal:commandExit", merged.id, 1);
      }
      return;
    }
    if (message.type === "commandExit") {
      const known = tabs.get(message.tabId);
      if (known?.commandRunning) {
        const idle = { ...known, commandRunning: false };
        tabs.set(idle.id, idle);
        broadcaster?.broadcast("terminal:status", idle);
      }
      broadcaster?.broadcast("terminal:commandExit", message.tabId, message.exitCode);
      return;
    }
    const request2 = pending$4.get(message.requestId);
    if (!request2) return;
    pending$4.delete(message.requestId);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.terminal, message.requestId);
    clearTimeout(request2.timeout);
    if (message.ok) request2.resolve(message.tab);
    else {
      const error = new Error(message.errorMessage);
      if (message.errorName) error.name = message.errorName;
      request2.reject(error);
    }
  });
  next.on("exit", () => {
    if (worker$5 !== next) return;
    worker$5 = null;
    failPending(new TerminalWorkerUnavailableError("Terminal worker exited"));
    markTabsDetached();
  });
  worker$5 = next;
  return next;
}
function request$1(message) {
  const next = ensureWorker$5();
  const id = ++requestId$2;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (!pending$4.has(id)) return;
      terminateWorker(
        next,
        new TerminalWorkerUnavailableError("Terminal worker timed out and was terminated")
      );
    }, REQUEST_TIMEOUT_MS$5);
    timeout.unref();
    pending$4.set(id, { resolve, reject, timeout });
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.terminal, id);
    try {
      next.postMessage({ ...message, requestId: id });
    } catch (error) {
      pending$4.delete(id);
      clearTimeout(timeout);
      finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.terminal, id);
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}
async function serializeOpen(operation) {
  const previous = openBarrier;
  let release;
  openBarrier = new Promise((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}
async function openTerminal(input, requestPage) {
  const validated = validateOpenInput(input);
  return serializeOpen(async () => {
    await ensureTerminalCapacity();
    const workerTab = await request$1({ type: "open", input: validated });
    if (!workerTab) throw new Error("Terminal worker returned no tab");
    const suggestions = validated.suggestions?.length ? validated.suggestions : await deriveTerminalSuggestions(workerTab.cwd);
    const tab = {
      ...workerTab,
      ...suggestions.length ? { suggestions } : {},
      ...validated.continueLabel ? { continueLabel: validated.continueLabel } : {},
      ...validated.command ? { command: validated.command } : {},
      // Only keepAlive sessions outlive their command and therefore report
      // completion; without that signal the terminal is treated as free.
      ...validated.keepAlive && validated.command ? { commandRunning: true } : {}
    };
    tabs.set(tab.id, tab);
    detachedTabs.delete(tab.id);
    if (requestPage) broadcaster?.broadcast("terminal:page-requested", tab);
    return tab;
  });
}
async function closeTerminal(tabId) {
  if (detachedTabs.has(tabId)) {
    forgetTerminal(tabId);
    return;
  }
  await request$1({ type: "close", tabId });
  forgetTerminal(tabId);
}
function validateOpenInput(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid terminal request");
  }
  const input = value;
  if (typeof input.harnessId !== "string" || !input.harnessId.trim()) {
    throw new TypeError("Invalid terminal harness");
  }
  for (const key of ["cwd", "command", "title"]) {
    if (input[key] !== void 0 && typeof input[key] !== "string") {
      throw new TypeError(`Invalid terminal ${key}`);
    }
  }
  const size = validateSize(input);
  const suggestions = validateSuggestions(input.suggestions);
  return {
    harnessId: input.harnessId.trim().slice(0, 80),
    ...typeof input.cwd === "string" ? { cwd: input.cwd.slice(0, 4096) } : {},
    ...typeof input.command === "string" ? { command: input.command.slice(0, 16384) } : {},
    ...typeof input.title === "string" ? { title: input.title.slice(0, 160) } : {},
    ...input.keepAlive === true ? { keepAlive: true } : {},
    ...suggestions.length > 0 ? { suggestions } : {},
    ...typeof input.continueLabel === "string" ? { continueLabel: input.continueLabel.slice(0, 60) } : {},
    ...size ? size : {}
  };
}
function validateSuggestions(value) {
  if (value === void 0) return [];
  if (!Array.isArray(value)) throw new TypeError("Invalid terminal suggestions");
  return value.slice(0, 6).map((entry) => {
    if (!entry || typeof entry !== "object") throw new TypeError("Invalid terminal suggestion");
    const item = entry;
    if (typeof item.label !== "string" || typeof item.command !== "string") {
      throw new TypeError("Invalid terminal suggestion");
    }
    return { label: item.label.slice(0, 60), command: item.command.slice(0, 4096) };
  });
}
function validateTabId(value) {
  if (typeof value !== "string" || !value || value.length > 160) {
    throw new TypeError("Invalid terminal id");
  }
  return value;
}
function validateSize(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const size = value;
  if (size.cols === void 0 && size.rows === void 0) return null;
  if (typeof size.cols !== "number" || !Number.isInteger(size.cols) || size.cols < 2 || size.cols > 500 || typeof size.rows !== "number" || !Number.isInteger(size.rows) || size.rows < 2 || size.rows > 300) {
    throw new TypeError("Invalid terminal size");
  }
  return { cols: size.cols, rows: size.rows };
}
async function openTerminalPage(input) {
  return openTerminal(input, true);
}
function registerTerminalIpcHandlers(handleIpc2, nativeWindow2) {
  broadcaster = nativeWindow2;
  handleIpc2("terminal:list", () => [...tabs.values()]);
  handleIpc2("terminal:openTerminalApp", async (_event, tabId) => {
    const tab = tabs.get(validateTabId(tabId));
    if (!tab) throw new Error("Terminal is no longer available");
    await openWorkingDirectoryInTerminalApp(tab.cwd);
  });
  handleIpc2(
    "terminal:open",
    (_event, input) => openTerminal(validateOpenInput(input), false)
  );
  handleIpc2(
    "terminal:openPage",
    (_event, input) => openTerminalPage(validateOpenInput(input))
  );
  handleIpc2("terminal:write", async (_event, tabId, data) => {
    const id = validateTabId(tabId);
    if (typeof data !== "string" || Buffer.byteLength(data) > MAX_INPUT_BYTES) {
      throw new TypeError("Invalid terminal input");
    }
    await request$1({ type: "write", tabId: id, data });
  });
  handleIpc2("terminal:resize", async (_event, tabId, size) => {
    const validSize = validateSize(size);
    if (!validSize) throw new TypeError("Invalid terminal size");
    await request$1({ type: "resize", tabId: validateTabId(tabId), size: validSize });
  });
  handleIpc2("terminal:restart", async (_event, tabId) => {
    await request$1({ type: "restart", tabId: validateTabId(tabId) });
  });
  handleIpc2("terminal:close", async (_event, tabId) => {
    await closeTerminal(validateTabId(tabId));
  });
  handleIpc2("terminal:attach", (event, tabId) => {
    const id = validateTabId(tabId);
    const subscribers = attached.get(id) ?? /* @__PURE__ */ new Set();
    subscribers.add(event.sender);
    attached.set(id, subscribers);
    const pendingOutput = backlog.get(id) ?? "";
    backlog.delete(id);
    return pendingOutput;
  });
  handleIpc2("terminal:detach", (event, tabId) => {
    const id = validateTabId(tabId);
    const subscribers = attached.get(id);
    subscribers?.delete(event.sender);
    if (subscribers?.size === 0) attached.delete(id);
  });
}
function disposeTerminalWorker() {
  try {
    worker$5?.postMessage({ type: "stop" });
  } catch {
  }
  worker$5 = null;
  failPending(new TerminalWorkerUnavailableError("Terminal worker disposed"));
  tabs.clear();
  detachedTabs.clear();
  backlog.clear();
  attached.clear();
}
async function openInTerminal(harnessId, cwd, command) {
  await openTerminalPage({
    harnessId,
    cwd,
    command,
    title: harnessId === "claude" ? "Claude Code" : harnessId === "codex" ? "Codex" : harnessId === "shell" ? "Terminal" : harnessId
  });
}
function openDesktopApp(appName) {
  if (process.platform === "darwin") {
    require$$0$3.spawn("open", ["-a", appName], { detached: true }).unref();
    return;
  }
  if (appName === "Claude") {
    void deliveryNative.shell.openExternal("claude://");
  }
}
async function resumeConversation(conv) {
  const action = resumeActionForConversation(conv);
  if (!action) throw new Error("no resume action available for this conversation");
  if (action.kind === "terminal") {
    await openInTerminal(action.harnessId, action.cwd, action.command);
    return;
  }
  if (action.kind === "url") await deliveryNative.shell.openExternal(action.url);
  else openDesktopApp(action.appName);
}
const metaStore = evidencePins.createCachedKeyValueStore(
  {
    loadAll: () => getStorage().meta.getAll(),
    set: (key, value) => getStorage().meta.set(key, value),
    delete: (key) => getStorage().meta.delete(key)
  },
  {
    onPersistError: ({ operation, key, error }) => {
      if (process.env.NODE_ENV === "production") return;
      if (operation === "delete") {
        console.warn("[meta] failed to delete meta:", key, error);
        return;
      }
      console.warn("[meta] failed to persist meta:", key, error);
    }
  }
);
async function initializeMetaStore() {
  await metaStore.initialize();
}
function getMeta(key) {
  return metaStore.get(key);
}
function setMeta(key, value) {
  metaStore.set(key, value);
}
function deleteMeta(key) {
  metaStore.delete(key);
}
const AUTH_URL = process.env.BLUME_AUTH_URL?.replace(/\/+$/, "") || "https://auth.blume.codes";
const REQUEST_TIMEOUT_MS$4 = 8e3;
let registrationInFlight = null;
let llmAccessToken = null;
let llmTokenInFlight = null;
async function registerInstallation(installationId) {
  const response = await fetch(
    `${AUTH_URL}/v1/installations/${encodeURIComponent(installationId)}/register`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS$4)
    }
  );
  if (!response.ok) {
    throw new Error(`Installation registration failed (${response.status}).`);
  }
  const body = await response.json().catch(() => null);
  if (typeof body?.clientToken !== "string" || !body.clientToken) {
    throw new Error(`Installation registration failed (${response.status}).`);
  }
  setSecret(IMPROVE_INSTALLATION_TOKEN_SETTING, body.clientToken);
  if (!getSetting(IMPROVE_INSTALLATION_ID_SETTING)) {
    setSetting(IMPROVE_INSTALLATION_ID_SETTING, installationId);
  }
  return { installationId, token: body.clientToken };
}
async function getInstallationCredentials() {
  const installationId = getSetting(IMPROVE_INSTALLATION_ID_SETTING) || await getOrCreateBlumeId();
  const token = getSecret(IMPROVE_INSTALLATION_TOKEN_SETTING);
  if (token) return { installationId, token };
  registrationInFlight ??= registerInstallation(installationId).finally(() => {
    registrationInFlight = null;
  });
  return registrationInFlight;
}
async function getLlmInstallationAccessToken(clientRelease2) {
  const releaseKey = JSON.stringify(clientRelease2);
  if (llmAccessToken?.releaseKey === releaseKey && llmAccessToken.expiresAt > Date.now() + 3e4) {
    return llmAccessToken.value;
  }
  llmTokenInFlight ??= (async () => {
    const credentials = await getInstallationCredentials();
    const response = await fetch(`${AUTH_URL}/v1/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-blume-installation-token": credentials.token
      },
      body: createLlmAccessTokenRequestBody(credentials.installationId, clientRelease2),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS$4)
    });
    if (!response.ok) {
      throw new Error(`LLM installation authorization failed (${response.status}).`);
    }
    const body = await response.json().catch(() => null);
    const expiresAt = typeof body?.expiresAt === "string" ? Date.parse(body.expiresAt) : NaN;
    if (typeof body?.accessToken !== "string" || !body.accessToken || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      throw new Error(`LLM installation authorization failed (${response.status}).`);
    }
    llmAccessToken = { value: body.accessToken, expiresAt, releaseKey };
    return body.accessToken;
  })().finally(() => {
    llmTokenInFlight = null;
  });
  return llmTokenInFlight;
}
function getAuthUrl() {
  return AUTH_URL;
}
async function getServiceConfig() {
  const serviceUrl = process.env.BLUME_LLM_SERVICE_URL || process.env.MAIN_VITE_LLM_SERVICE_URL || "https://blume-llm-bd-s-2-0-26-bd358244228f.agentic-cms-olav.workers.dev";
  return { endpoint: resolveLlmChatEndpoint(serviceUrl), token: await getAccessToken() };
}
const clientRelease = {
  version: "2.0.26",
  channel: "stable",
  sourceSha: "bd358244228f4c4fa316832ce3ec57d2bd4b9ce9",
  bundleId: "blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9"
};
const getAccessToken = () => getLlmInstallationAccessToken(clientRelease);
const chat = createLlmGatewayChatClient({
  getServiceConfig,
  signRequest({ token }) {
    return { Authorization: `Bearer ${token}` };
  },
  fetch: ({ endpoint, method, headers, body }) => fetch(endpoint, { method, headers, body })
});
async function migrateLegacyOverrides() {
  const legacyPath = pn.join(deliveryNative.app.getPath("userData"), "conversation-overrides.json");
  await evidencePins.migrateLegacyConversationOverrides({
    meta: metaPort,
    settings: {
      setTerminal: (terminal) => setSetting("terminal", terminal)
    },
    storage: storagePort,
    file: {
      readLegacyOverrides: () => readLegacyOverridesFile(legacyPath),
      renameLegacyOverridesMigrated: () => promises.rename(legacyPath, `${legacyPath}.migrated`)
    }
  });
}
async function applyDeferredOverrides(ref) {
  await evidencePins.applyDeferredLegacyConversationOverrides(ref, {
    meta: metaPort,
    storage: storagePort
  });
}
const metaPort = {
  get: getMeta,
  set: setMeta,
  delete: deleteMeta
};
const storagePort = {
  applyLegacyConversationOverrides: (overrides) => getStorage().desktopConversations.applyLegacyConversationOverrides(overrides)
};
async function readLegacyOverridesFile(path) {
  try {
    return { kind: "found", raw: await promises.readFile(path, "utf-8") };
  } catch (err) {
    if (err.code === "ENOENT") {
      return { kind: "missing" };
    }
    throw err;
  }
}
let loadConversationPolicy = async () => ({
  registrations: []
});
function configureConversationRegistrations(load) {
  loadConversationPolicy = load;
  invalidateConversationRegistrations();
}
let readActivityCutoff = () => null;
function configureConversationActivityCutoff(read) {
  readActivityCutoff = read;
}
let historyStep = null;
let refreshStopCount = 0;
const HISTORY_WINDOW_SLACK_MS = 10 * 6e4;
let historyStepResult = null;
let readConversationScope = () => "all";
function configureConversationScope(read) {
  readConversationScope = read;
}
const CONVERSATION_REGISTRATION_TTL_MS = 3e4;
let registrationMemo = null;
let registrationRequest = null;
let cachedRegistrationCount = null;
let appliedConversationScope = null;
let storedPolicy = null;
function invalidateConversationRegistrations() {
  registrationMemo = null;
  storedPolicy = null;
}
function currentConversationPolicy() {
  if (registrationMemo && Date.now() - registrationMemo.atMs < CONVERSATION_REGISTRATION_TTL_MS)
    return Promise.resolve(registrationMemo.policy);
  registrationRequest ??= loadConversationPolicy().then(
    (policy) => {
      registrationMemo = { atMs: Date.now(), policy };
      return policy;
    },
    () => null
  ).finally(() => {
    registrationRequest = null;
  });
  return registrationRequest;
}
let completeEvidence = null;
const completedEvidence = /* @__PURE__ */ new Set();
const evidenceInFlight = /* @__PURE__ */ new Set();
let evidencePinCursor = null;
let evidenceCompletionPausedUntilMs = 0;
const EVIDENCE_COMPLETION_PAUSE_MS = 10 * 6e4;
const MAX_COMPLETED_EVIDENCE = 100;
function configureEvidenceCompletion(complete) {
  completeEvidence = complete;
}
async function completeResolvedEvidence(resolved) {
  const complete = completeEvidence;
  if (!complete || Date.now() < evidenceCompletionPausedUntilMs) return;
  for (const pin of resolved) {
    if (evidenceInFlight.has(pin.signalId) || completedEvidence.has(pin.signalId)) continue;
    if (completedEvidence.size >= MAX_COMPLETED_EVIDENCE) return;
    evidenceInFlight.add(pin.signalId);
    try {
      await complete(pin);
      completedEvidence.add(pin.signalId);
    } catch (error) {
      if (error instanceof Error && /unknown operation|sign in|session expired/i.test(error.message)) {
        evidenceCompletionPausedUntilMs = Date.now() + EVIDENCE_COMPLETION_PAUSE_MS;
        return;
      }
    } finally {
      evidenceInFlight.delete(pin.signalId);
    }
  }
}
class ConversationRefreshWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = evidencePins.CONVERSATION_REFRESH_WORKER_UNAVAILABLE_ERROR_NAME;
  }
}
function isConversationRefreshWorkerUnavailableError(error) {
  return error instanceof ConversationRefreshWorkerUnavailableError;
}
function isExpectedConversationRefreshWorkerShutdownError(error) {
  return isConversationRefreshWorkerUnavailableError(error) && error.message === evidencePins.CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE;
}
function shouldReportConversationRefreshAppError(error) {
  return evidencePins.shouldReportConversationProviderAppError(error);
}
const RETRY_COOLDOWN_MS$2 = 5 * 6e4;
const WORKER_INACTIVITY_TIMEOUT_MS$2 = 6e4;
const WORKER_WATCHDOG_GRACE_MS = 15e3;
const SLOW_INGEST_WARN_MS = 1e3;
const WORKER_IDLE_MS$3 = 5 * 6e4;
const refreshStats = {
  workerRefreshes: 0,
  workerUnavailableSkips: 0,
  parsedTotal: 0,
  maxIngestMs: 0
};
let refreshWorker = null;
let refreshWorkerAlive = false;
let refreshWorkerRequestId = 0;
let lastWorkerFailureAtMs = 0;
let refreshStopRequested = false;
let refreshInFlight = null;
let pendingRefresh = null;
const pendingRefreshRequests = /* @__PURE__ */ new Map();
const pendingMenuBarSnapshotRequests = /* @__PURE__ */ new Map();
const activeRefreshPromises = /* @__PURE__ */ new Set();
let menuBarSnapshotInFlight = null;
const refreshProgressCallbacks = /* @__PURE__ */ new Set();
let refreshWorkerUnavailableReported = false;
const refreshWorkerIdle = createIdleShutdown(WORKER_IDLE_MS$3, () => {
  if (pendingRefreshRequests.size > 0 || pendingMenuBarSnapshotRequests.size > 0 || refreshInFlight || pendingRefresh || menuBarSnapshotInFlight)
    return;
  const idleWorker = refreshWorker;
  refreshWorker = null;
  refreshWorkerAlive = false;
  try {
    if (idleWorker) {
      terminateBackgroundProcess(idleWorker, BLUME_BACKGROUND_PROCESS_SERVICES.refresh, "idle");
    }
  } catch {
  }
});
function getConversationRefreshWorkerUnavailableReason() {
  if (process.env.BLUME_DISABLE_REFRESH_WORKER === "1") {
    return evidencePins.CONVERSATION_REFRESH_WORKER_DISABLED_MESSAGE;
  }
  if (typeof deliveryNative.utilityProcess?.fork !== "function") {
    return "conversation refresh worker unavailable";
  }
  return null;
}
function isConversationRefreshWorkerExpected() {
  return getConversationRefreshWorkerUnavailableReason() === null;
}
function reportConversationRefreshWorkerUnavailable(operation) {
  const error = new ConversationRefreshWorkerUnavailableError(
    getConversationRefreshWorkerUnavailableReason() ?? "conversation refresh worker unavailable"
  );
  if (!refreshWorkerUnavailableReported && shouldReportConversationRefreshAppError(error)) {
    refreshWorkerUnavailableReported = true;
    void captureAppError("main.parser.refresh_worker_unavailable", error, {
      operation,
      main_process_fallback: false
    });
  }
  return error;
}
function rejectPendingRefreshes(err) {
  for (const [id, pending2] of pendingRefreshRequests) {
    if (pending2.watchdog) clearTimeout(pending2.watchdog);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
    pending2.reject(err);
  }
  pendingRefreshRequests.clear();
  for (const [id, pending2] of pendingMenuBarSnapshotRequests) {
    if (pending2.watchdog) clearTimeout(pending2.watchdog);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
    pending2.reject(err);
  }
  pendingMenuBarSnapshotRequests.clear();
}
function failRefreshWorker(err) {
  const worker2 = refreshWorker;
  const now = Date.now();
  void captureTelemetryEvent("conversation_refresh_worker_failed", {
    outcome: err.message.includes("unresponsive") ? "unresponsive" : "unavailable",
    pending_count: pendingRefreshRequests.size + pendingMenuBarSnapshotRequests.size,
    menu_bar_snapshot_count: pendingMenuBarSnapshotRequests.size,
    oldest_request_ms: Math.max(
      0,
      ...[...pendingRefreshRequests.values()].map((request2) => now - request2.startedAtMs)
    ),
    longest_silence_ms: Math.max(
      0,
      ...[...pendingRefreshRequests.values()].map((request2) => now - request2.lastMessageAtMs)
    ),
    max_requested_age_ms: Math.max(
      0,
      ...[...pendingRefreshRequests.values()].map((request2) => request2.maxAgeMs)
    ),
    targeted_request_count: [...pendingRefreshRequests.values()].filter(
      (request2) => request2.targetPathCount !== null
    ).length,
    main_process_fallback: false
  });
  refreshWorker = null;
  refreshWorkerAlive = false;
  lastWorkerFailureAtMs = Date.now();
  rejectPendingRefreshes(err);
  if (!worker2) return;
  try {
    terminateBackgroundProcess(
      worker2,
      BLUME_BACKGROUND_PROCESS_SERVICES.refresh,
      "worker-unavailable"
    );
  } catch {
  }
}
function resetWatchdog$2(id, pending2) {
  if (pending2.watchdog) clearTimeout(pending2.watchdog);
  pending2.lastMessageAtMs = Date.now();
  pending2.watchdog = setTimeout(() => {
    if (pendingRefreshRequests.get(id) !== pending2) return;
    void captureTelemetryEvent("conversation_refresh_worker_watchdog_probe", {
      requested_max_age_ms: pending2.maxAgeMs,
      target_path_count: pending2.targetPathCount,
      inactivity_ms: WORKER_INACTIVITY_TIMEOUT_MS$2
    });
    pending2.watchdog = setTimeout(() => {
      if (pendingRefreshRequests.get(id) !== pending2) return;
      failRefreshWorker(
        new ConversationRefreshWorkerUnavailableError(
          evidencePins.CONVERSATION_REFRESH_WORKER_UNRESPONSIVE_MESSAGE
        )
      );
    }, WORKER_WATCHDOG_GRACE_MS);
    pending2.watchdog.unref();
  }, WORKER_INACTIVITY_TIMEOUT_MS$2);
  pending2.watchdog.unref();
}
function takePendingRefresh(id) {
  const pending2 = pendingRefreshRequests.get(id);
  if (!pending2) return void 0;
  pendingRefreshRequests.delete(id);
  finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
  if (pending2.watchdog) clearTimeout(pending2.watchdog);
  pending2.watchdog = null;
  if (pendingRefreshRequests.size === 0 && pendingMenuBarSnapshotRequests.size === 0)
    refreshWorkerIdle.schedule();
  return pending2;
}
function takePendingMenuBarSnapshot(id) {
  const pending2 = pendingMenuBarSnapshotRequests.get(id);
  if (!pending2) return void 0;
  pendingMenuBarSnapshotRequests.delete(id);
  finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
  if (pending2.watchdog) clearTimeout(pending2.watchdog);
  pending2.watchdog = null;
  if (pendingRefreshRequests.size === 0 && pendingMenuBarSnapshotRequests.size === 0)
    refreshWorkerIdle.schedule();
  return pending2;
}
function responseError$3(response) {
  const err = new Error(response.errorMessage);
  if (response.errorName) err.name = response.errorName;
  if (response.errorStack) err.stack = response.errorStack;
  return err;
}
function forwardTelemetry(message) {
  const properties = { ...message.properties, parse_worker: true };
  if (message.kind === "app-error") {
    const error = new Error(message.errorMessage ?? "unknown refresh worker error");
    if (!evidencePins.shouldReportConversationProviderAppError(error)) return;
    void captureAppError(message.name, error, properties);
  } else {
    void captureTelemetryEvent(message.name, properties);
  }
}
function emitRefreshProgress() {
  for (const callback of refreshProgressCallbacks) {
    try {
      callback();
    } catch (err) {
      void captureAppError("main.parser.progress_callback", err);
    }
  }
}
function recordRefreshPerformance(performance2, completed) {
  if (completed) refreshStats.workerRefreshes += 1;
  refreshStats.parsedTotal += performance2.parsed;
  refreshStats.maxIngestMs = Math.max(refreshStats.maxIngestMs, performance2.maxIngestMs);
  if (performance2.parsed > 0 || performance2.durationMs > 1e3) {
    console.log(
      `[blume] refresh done (mode=worker, parsed=${performance2.parsed}, stored=${performance2.stored ?? "?"}, ${performance2.durationMs}ms, maxIngestMs=${performance2.maxIngestMs}, workerSkips=${refreshStats.workerUnavailableSkips})`
    );
  }
}
function recordUnavailableSkip(maxAgeMs) {
  refreshStats.workerUnavailableSkips += 1;
  if (refreshStats.workerUnavailableSkips === 1 || refreshStats.workerUnavailableSkips % 10 === 0) {
    console.warn(
      `[blume] refresh skipped: conversation refresh worker unavailable (skips=${refreshStats.workerUnavailableSkips}); retrying after cooldown`
    );
  }
  void captureTelemetryEvent("parser_refresh_skipped_worker_unavailable", {
    requested_max_age_ms: maxAgeMs,
    skips: refreshStats.workerUnavailableSkips
  });
}
function ensureRefreshWorker() {
  refreshWorkerIdle.cancel();
  if (refreshWorker && refreshWorkerAlive) return refreshWorker;
  if (lastWorkerFailureAtMs > 0 && Date.now() - lastWorkerFailureAtMs < RETRY_COOLDOWN_MS$2) {
    throw new ConversationRefreshWorkerUnavailableError(
      evidencePins.CONVERSATION_REFRESH_WORKER_CIRCUIT_BREAKER_MESSAGE
    );
  }
  try {
    const worker2 = deliveryNative.utilityProcess.fork(pn.join(__dirname, "refreshWorker.js"), [], {
      serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.refresh
    });
    worker2.on("message", (message) => {
      if (message.type === "telemetry") {
        forwardTelemetry(message);
        return;
      }
      if (message.type === "recent-projects-result") {
        const pending22 = takePendingMenuBarSnapshot(message.id);
        if (!pending22) return;
        if (message.ok)
          pending22.resolve(message.projects);
        else pending22.reject(new Error(message.errorMessage));
        return;
      }
      if (message.type === "evidence-location-result") {
        const pending22 = takePendingMenuBarSnapshot(message.id);
        if (!pending22) return;
        if (message.ok) pending22.resolve(message.location);
        else pending22.reject(new Error(message.errorMessage));
        return;
      }
      if (message.type === "menu-bar-snapshot-result") {
        const pending22 = takePendingMenuBarSnapshot(message.id);
        if (!pending22) return;
        if (message.ok) {
          lastWorkerFailureAtMs = 0;
          refreshWorkerUnavailableReported = false;
          pending22.resolve(
            message.projection
          );
        } else {
          pending22.reject(responseError$3(message));
        }
        return;
      }
      const pending2 = pendingRefreshRequests.get(message.id);
      if (!pending2) return;
      resetWatchdog$2(message.id, pending2);
      if (message.type === "heartbeat") return;
      if (message.type === "refresh-progress") {
        if (message.ingestMs > SLOW_INGEST_WARN_MS) {
          console.warn(`[blume] slow ingest (${message.ingestMs}ms, worker-side): ${message.ref}`);
        }
        if (message.ok) emitRefreshProgress();
        return;
      }
      if (message.type === "project-setup-summary-progress") {
        emitRefreshProgress();
        return;
      }
      takePendingRefresh(message.id);
      recordRefreshPerformance(message, message.ok);
      if (message.ok) {
        lastWorkerFailureAtMs = 0;
        refreshWorkerUnavailableReported = false;
        pending2.resolve(message);
      } else {
        pending2.reject(responseError$3(message));
      }
    });
    worker2.on("exit", () => {
      if (refreshWorker !== worker2) return;
      refreshWorker = null;
      refreshWorkerAlive = false;
      lastWorkerFailureAtMs = Date.now();
      rejectPendingRefreshes(
        new ConversationRefreshWorkerUnavailableError("refresh worker exited with work pending")
      );
    });
    refreshWorker = worker2;
    refreshWorkerAlive = true;
    return worker2;
  } catch (err) {
    lastWorkerFailureAtMs = Date.now();
    void captureAppError("main.parser.refresh_worker_spawn", err);
    throw new ConversationRefreshWorkerUnavailableError("failed to spawn refresh worker");
  }
}
function requestConversationRefreshWorkerStop() {
  refreshStopCount += 1;
  refreshStopRequested = true;
  try {
    refreshWorker?.postMessage({ type: "stop" });
  } catch {
  }
}
function resumeConversationRefreshWorker() {
  refreshStopRequested = false;
  pendingRefresh = null;
}
async function waitForConversationRefreshWorker() {
  await Promise.allSettled([
    ...activeRefreshPromises,
    ...menuBarSnapshotInFlight ? [menuBarSnapshotInFlight] : []
  ]);
}
function disposeConversationRefreshWorker() {
  refreshWorkerIdle.cancel();
  const worker2 = refreshWorker;
  refreshWorker = null;
  refreshWorkerAlive = false;
  clearBackgroundProcessRequests(BLUME_BACKGROUND_PROCESS_SERVICES.refresh);
  rejectPendingRefreshes(
    new ConversationRefreshWorkerUnavailableError(evidencePins.CONVERSATION_REFRESH_WORKER_DISPOSED_MESSAGE)
  );
  if (!worker2) return;
  try {
    terminateBackgroundProcess(worker2, BLUME_BACKGROUND_PROCESS_SERVICES.refresh, "dispose");
  } catch {
  }
}
const RECENT_PROJECTS_TIMEOUT_MS = 15e3;
const MAX_RECENT_PROJECT_REQUESTS = 4;
let recentProjectRequests = 0;
function listRecentProjectsViaWorker(limit, signal) {
  if (signal?.aborted) return Promise.reject(signal.reason);
  if (!isConversationRefreshWorkerExpected()) {
    return Promise.reject(reportConversationRefreshWorkerUnavailable("recent-projects"));
  }
  if (recentProjectRequests >= MAX_RECENT_PROJECT_REQUESTS)
    return Promise.reject(new Error("Blume is still reading projects. Try again."));
  const id = ++refreshWorkerRequestId;
  recentProjectRequests += 1;
  let onAbort = null;
  return new Promise((resolve, reject) => {
    let worker2;
    try {
      worker2 = ensureRefreshWorker();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve,
      reject,
      watchdog: null
    };
    pending2.watchdog = setTimeout(() => {
      if (takePendingMenuBarSnapshot(id) === pending2)
        reject(new Error("Reading projects took too long. Try again."));
    }, RECENT_PROJECTS_TIMEOUT_MS);
    pending2.watchdog.unref();
    pendingMenuBarSnapshotRequests.set(id, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
    onAbort = () => {
      if (takePendingMenuBarSnapshot(id) === pending2) reject(signal?.reason);
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    try {
      worker2.postMessage({
        type: "recent-projects",
        id,
        dbPath: getDbPath(),
        limit: evidencePins.recentProjectRowLimit(limit)
      });
    } catch {
      takePendingMenuBarSnapshot(id);
      reject(new ConversationRefreshWorkerUnavailableError("failed to message refresh worker"));
    }
  }).finally(() => {
    recentProjectRequests -= 1;
    if (onAbort) signal?.removeEventListener("abort", onAbort);
  });
}
const EVIDENCE_LOCATION_TIMEOUT_MS = 15e3;
const MAX_EVIDENCE_LOCATION_REQUESTS = 4;
let evidenceLocationRequests = 0;
function locateConversationEvidenceViaWorker(request2) {
  if (!isConversationRefreshWorkerExpected()) {
    return Promise.reject(reportConversationRefreshWorkerUnavailable("evidence-location"));
  }
  if (evidenceLocationRequests >= MAX_EVIDENCE_LOCATION_REQUESTS)
    return Promise.reject(new Error("Blume is still finding earlier evidence. Try again."));
  const id = ++refreshWorkerRequestId;
  evidenceLocationRequests += 1;
  return new Promise((resolve, reject) => {
    let worker2;
    try {
      worker2 = ensureRefreshWorker();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve,
      reject,
      watchdog: null
    };
    pending2.watchdog = setTimeout(() => {
      if (takePendingMenuBarSnapshot(id) === pending2)
        reject(new Error("Finding the conversation took too long. Try again."));
    }, EVIDENCE_LOCATION_TIMEOUT_MS);
    pending2.watchdog.unref();
    pendingMenuBarSnapshotRequests.set(id, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
    try {
      worker2.postMessage({ type: "evidence-location", id, dbPath: getDbPath(), request: request2 });
    } catch {
      takePendingMenuBarSnapshot(id);
      reject(new ConversationRefreshWorkerUnavailableError("failed to message refresh worker"));
    }
  }).finally(() => {
    evidenceLocationRequests -= 1;
  });
}
function loadMenuBarConversationProjectionViaWorker() {
  if (menuBarSnapshotInFlight) return menuBarSnapshotInFlight;
  if (!isConversationRefreshWorkerExpected()) {
    return Promise.reject(reportConversationRefreshWorkerUnavailable("menu-bar-snapshot"));
  }
  const id = ++refreshWorkerRequestId;
  const request2 = new Promise((resolve, reject) => {
    let worker2;
    try {
      worker2 = ensureRefreshWorker();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve,
      reject,
      watchdog: null
    };
    pending2.watchdog = setTimeout(() => {
      if (pendingMenuBarSnapshotRequests.get(id) !== pending2) return;
      failRefreshWorker(
        new ConversationRefreshWorkerUnavailableError(
          evidencePins.CONVERSATION_REFRESH_WORKER_MENU_SNAPSHOT_UNRESPONSIVE_MESSAGE
        )
      );
    }, WORKER_INACTIVITY_TIMEOUT_MS$2);
    pending2.watchdog.unref();
    pendingMenuBarSnapshotRequests.set(id, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
    try {
      worker2.postMessage({
        type: "menu-bar-snapshot",
        id,
        dbPath: getDbPath(),
        nowMs: Date.now()
      });
    } catch {
      failRefreshWorker(
        new ConversationRefreshWorkerUnavailableError(
          "failed to message refresh worker for menu snapshot"
        )
      );
    }
  });
  menuBarSnapshotInFlight = request2;
  void request2.then(
    () => {
      if (menuBarSnapshotInFlight === request2) menuBarSnapshotInFlight = null;
    },
    () => {
      if (menuBarSnapshotInFlight === request2) menuBarSnapshotInFlight = null;
    }
  );
  return request2;
}
async function runSingleRefreshViaWorker(maxAgeMs, targetPaths, invalidateDiscoveryCache) {
  const step = targetPaths === null ? historyStep : null;
  historyStep = null;
  const stopsAtStart = refreshStopCount;
  if (!isConversationRefreshWorkerExpected()) {
    recordUnavailableSkip(maxAgeMs);
    throw new ConversationRefreshWorkerUnavailableError("refresh worker not available");
  }
  const policy = await currentConversationPolicy();
  const conversationScope = readConversationScope();
  if (conversationScope === "blume" && appliedConversationScope === "blume" && cachedRegistrationCount === 0 && !policy?.registrations.length) {
    if (step) historyStepResult = { parsed: 0, oldestSourceMs: null };
    return;
  }
  const sentPolicy = policy !== null && policy === storedPolicy ? null : policy;
  const completed = [...completedEvidence];
  const id = ++refreshWorkerRequestId;
  try {
    await new Promise((resolve, reject) => {
      let worker2;
      try {
        worker2 = ensureRefreshWorker();
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)));
        return;
      }
      const now = Date.now();
      const pending2 = {
        resolve,
        reject,
        watchdog: null,
        startedAtMs: now,
        lastMessageAtMs: now,
        maxAgeMs,
        targetPathCount: targetPaths?.size ?? null
      };
      pendingRefreshRequests.set(id, pending2);
      startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.refresh, id);
      resetWatchdog$2(id, pending2);
      try {
        worker2.postMessage({
          type: "refresh",
          registeredAgents: sentPolicy?.registrations ?? null,
          conversationSkips: sentPolicy ? evidencePins.ledgerConversationSkips(sentPolicy) : null,
          conversationScope,
          activityCutoffMs: step ? step.cutoffMs : readActivityCutoff(),
          mtimeBeforeMs: step?.mtimeBeforeMs ?? null,
          mtimeAfterMs: step?.mtimeAfterMs ?? null,
          evidencePinsDir: evidencePins.evidencePinsDirectory(),
          completedEvidence: completed,
          evidencePinCursor,
          id,
          maxAgeMs,
          dbPath: getDbPath(),
          blumeRoot: index$1.getBlumeRoot(),
          homeBlumeRoot: pn.join(require$$0$2.homedir(), ".blume"),
          parserBinaryPath: getHarnessParserBinaryPath(),
          watcherReady: isWatcherReady(),
          invalidateDiscoveryCache,
          knownFiles: getKnownFiles(targetPaths ? { paths: [...targetPaths] } : void 0),
          targetPaths: targetPaths ? [...targetPaths] : null
        });
      } catch (err) {
        failRefreshWorker(
          new ConversationRefreshWorkerUnavailableError("failed to message refresh worker")
        );
      }
    }).then((result) => {
      cachedRegistrationCount = result.registeredConversations;
      appliedConversationScope = result.conversationScope;
      if (step && refreshStopCount === stopsAtStart)
        historyStepResult = {
          parsed: result.stored ?? result.parsed,
          oldestSourceMs: result.oldestSourceMs ?? null
        };
      if (sentPolicy) storedPolicy = sentPolicy;
      evidencePinCursor = result.evidencePinCursor ?? null;
      for (const signalId of completed) completedEvidence.delete(signalId);
      if (result.resolvedEvidence.length) void completeResolvedEvidence(result.resolvedEvidence);
    });
  } catch (error) {
    if (error instanceof ConversationRefreshWorkerUnavailableError) {
      recordUnavailableSkip(maxAgeMs);
    }
    throw error;
  }
}
function mergePendingRefresh(maxAgeMs, targetPaths, invalidateDiscoveryCache) {
  const next = pendingRefresh ?? {
    maxAgeMs: 0,
    targetPaths: /* @__PURE__ */ new Set(),
    invalidateDiscoveryCache: false
  };
  next.maxAgeMs = Math.max(next.maxAgeMs, maxAgeMs);
  const priorTargets = next.targetPaths;
  next.targetPaths = evidencePins.mergeConversationRefreshTargetPaths(priorTargets, targetPaths);
  const targetOverflow = priorTargets !== null && targetPaths !== null && next.targetPaths === null;
  next.invalidateDiscoveryCache ||= invalidateDiscoveryCache || targetOverflow;
  pendingRefresh = next;
}
async function runRefreshQueue(maxAgeMs, targetPaths, invalidateDiscoveryCache) {
  let next = { maxAgeMs, targetPaths, invalidateDiscoveryCache };
  while (!refreshStopRequested) {
    await runSingleRefreshViaWorker(next.maxAgeMs, next.targetPaths, next.invalidateDiscoveryCache);
    if (pendingRefresh === null) return;
    next = pendingRefresh;
    pendingRefresh = null;
  }
}
async function refreshViaConversationRefreshWorker(maxAgeMs, onConversationIngested, options = {}) {
  const targetPaths = options.targetPaths ? evidencePins.mergeConversationRefreshTargetPaths(/* @__PURE__ */ new Set(), options.targetPaths) : null;
  const targetOverflow = options.targetPaths != null && targetPaths === null;
  const invalidateDiscoveryCache = options.invalidateDiscoveryCache === true || targetOverflow;
  if (onConversationIngested) refreshProgressCallbacks.add(onConversationIngested);
  try {
    if (refreshStopRequested) return;
    if (refreshInFlight) {
      mergePendingRefresh(maxAgeMs, targetPaths, invalidateDiscoveryCache);
      await refreshInFlight;
      return;
    }
    const refresh = runRefreshQueue(maxAgeMs, targetPaths, invalidateDiscoveryCache);
    refreshInFlight = refresh;
    activeRefreshPromises.add(refresh);
    try {
      await refresh;
    } finally {
      activeRefreshPromises.delete(refresh);
      if (refreshInFlight === refresh) refreshInFlight = null;
    }
  } finally {
    if (onConversationIngested) refreshProgressCallbacks.delete(onConversationIngested);
  }
}
function isConversationRefreshBusy() {
  return refreshInFlight !== null;
}
async function readConversationHistoryViaWorker(request2) {
  if (refreshInFlight || refreshStopRequested)
    return { conversations: 0, oldestSourceMs: null, ran: false };
  historyStep = { ...request2 };
  historyStepResult = null;
  try {
    await refreshViaConversationRefreshWorker(
      Math.max(0, Date.now() - request2.mtimeAfterMs) + HISTORY_WINDOW_SLACK_MS
    );
  } finally {
    historyStep = null;
  }
  const pass = historyStepResult;
  historyStepResult = null;
  if (!pass) return { conversations: 0, oldestSourceMs: null, ran: false };
  return { conversations: pass.parsed, oldestSourceMs: pass.oldestSourceMs, ran: true };
}
const CONVERSATION_LIST_TIMEOUT_MS = 15e3;
const CONVERSATION_LIST_RETRY_COOLDOWN_MS = 6e4;
const MAX_PENDING_CONVERSATION_LISTS = 32;
const CONVERSATION_LIST_IDLE_MS = 5 * 6e4;
const SINCE_MS_COALESCING_STEP_MS = 1e3;
const CONVERSATION_LIST_WORKER_DISPOSED_MESSAGE = "conversation list worker disposed";
const CONVERSATION_LIST_WORKER_COOLING_DOWN_MESSAGE = "conversation list worker circuit breaker is cooling down";
const CONVERSATION_LIST_WORKER_TIMEOUT_MESSAGE = "conversation list worker timed out";
const CONVERSATION_LIST_WORKER_BUSY_MESSAGE = "conversation list worker is busy";
class ConversationListWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConversationListWorkerUnavailableError";
  }
}
const SERVICE$2 = BLUME_BACKGROUND_PROCESS_SERVICES.conversationList;
let worker$4 = null;
let nextRequestId = 0;
let disposed$3 = false;
let lastFailureAtMs$4 = null;
let lastFailureTelemetryAtMs$1 = null;
const pendingLists = /* @__PURE__ */ new Map();
const coalescedLists = /* @__PURE__ */ new Map();
const stats = {
  requests: 0,
  workerReads: 0,
  coalesced: 0,
  failures: 0,
  maxQueryMs: 0
};
const idleShutdown$1 = createIdleShutdown(CONVERSATION_LIST_IDLE_MS, () => {
  if (pendingLists.size > 0) return;
  stopWorker$1("idle");
});
function stopWorker$1(intent) {
  const current = worker$4;
  worker$4 = null;
  if (!current) return;
  try {
    terminateBackgroundProcess(current, SERVICE$2, intent);
  } catch {
  }
}
function coolingDown$1() {
  return lastFailureAtMs$4 !== null && Date.now() - lastFailureAtMs$4 < CONVERSATION_LIST_RETRY_COOLDOWN_MS;
}
function recordWorkerFailure$1(error, phase) {
  const now = Date.now();
  stats.failures += 1;
  lastFailureAtMs$4 = now;
  if (lastFailureTelemetryAtMs$1 !== null && now - lastFailureTelemetryAtMs$1 < CONVERSATION_LIST_RETRY_COOLDOWN_MS) {
    return;
  }
  lastFailureTelemetryAtMs$1 = now;
  void captureAppError("main.conversations.list_worker_unavailable", error, {
    phase,
    main_process_fallback: false
  });
}
function takePendingList(id) {
  const pending2 = pendingLists.get(id);
  if (!pending2) return void 0;
  pendingLists.delete(id);
  clearTimeout(pending2.timeout);
  pending2.cleanup();
  finishBackgroundProcessRequest(SERVICE$2, id);
  if (pendingLists.size === 0 && worker$4) idleShutdown$1.schedule();
  return pending2;
}
function rejectPendingLists(error) {
  for (const id of [...pendingLists.keys()]) takePendingList(id)?.reject(error);
}
function failWorker$3(error, phase, intent) {
  stopWorker$1(intent);
  recordWorkerFailure$1(error, phase);
  rejectPendingLists(error);
}
function responseError$2(message) {
  const error = new Error(message.errorMessage);
  if (message.errorName) error.name = message.errorName;
  if (message.errorStack) error.stack = message.errorStack;
  return error;
}
function ensureWorker$4() {
  idleShutdown$1.cancel();
  if (worker$4) return worker$4;
  if (coolingDown$1()) {
    throw new ConversationListWorkerUnavailableError(CONVERSATION_LIST_WORKER_COOLING_DOWN_MESSAGE);
  }
  let forked;
  try {
    forked = deliveryNative.utilityProcess.fork(pn.join(__dirname, "listWorker.js"), [], { serviceName: SERVICE$2 });
  } catch (error) {
    const unavailable = new ConversationListWorkerUnavailableError(
      error instanceof Error && error.message ? error.message : "failed to spawn conversation list worker"
    );
    recordWorkerFailure$1(unavailable, "spawn");
    throw unavailable;
  }
  forked.on("message", (message) => {
    if (message?.type !== "list-for-view-result" && message?.type !== "transcript-result") return;
    const pending2 = takePendingList(message.id);
    if (!pending2) return;
    if (message.ok) {
      lastFailureAtMs$4 = null;
      stats.workerReads += 1;
      stats.maxQueryMs = Math.max(stats.maxQueryMs, message.queryMs);
      pending2.resolve(message.type === "transcript-result" ? message.transcript : message.items);
    } else {
      pending2.reject(responseError$2(message));
    }
  });
  forked.on("exit", () => {
    if (worker$4 !== forked) return;
    worker$4 = null;
    if (pendingLists.size === 0) return;
    recordWorkerFailure$1(
      new ConversationListWorkerUnavailableError("conversation list worker exited"),
      "exit"
    );
    rejectPendingLists(
      new ConversationListWorkerUnavailableError(
        "conversation list worker exited with reads pending"
      )
    );
  });
  worker$4 = forked;
  return forked;
}
function readViaWorker(request2, signal) {
  if (signal.aborted) return Promise.reject(signal.reason);
  if (disposed$3) {
    return Promise.reject(
      new ConversationListWorkerUnavailableError(CONVERSATION_LIST_WORKER_DISPOSED_MESSAGE)
    );
  }
  if (pendingLists.size >= MAX_PENDING_CONVERSATION_LISTS) {
    return Promise.reject(
      new ConversationListWorkerUnavailableError(CONVERSATION_LIST_WORKER_BUSY_MESSAGE)
    );
  }
  return new Promise((resolve, reject) => {
    let target;
    try {
      target = ensureWorker$4();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const id = ++nextRequestId;
    const timeout = setTimeout(() => {
      if (!pendingLists.has(id)) return;
      failWorker$3(
        new ConversationListWorkerUnavailableError(CONVERSATION_LIST_WORKER_TIMEOUT_MESSAGE),
        "timeout",
        "request-timeout"
      );
    }, CONVERSATION_LIST_TIMEOUT_MS);
    timeout.unref();
    const onAbort = () => {
      takePendingList(id)?.reject(signal.reason);
      if (pendingLists.size === 0) {
        idleShutdown$1.cancel();
        stopWorker$1("request-settled");
      }
    };
    signal.addEventListener("abort", onAbort, { once: true });
    pendingLists.set(id, {
      resolve,
      reject,
      timeout,
      cleanup: () => signal.removeEventListener("abort", onAbort)
    });
    startBackgroundProcessRequest(SERVICE$2, id);
    try {
      target.postMessage({ ...request2, id, dbPath: getDbPath() });
    } catch (error) {
      failWorker$3(
        new ConversationListWorkerUnavailableError(
          error instanceof Error && error.message ? error.message : "failed to message conversation list worker"
        ),
        "message",
        "worker-unavailable"
      );
    }
  });
}
function settledQuietly(read) {
  return read.then(
    () => void 0,
    () => void 0
  );
}
function makeRead(request2, previous) {
  const controller = new AbortController();
  const read = {
    controller,
    consumers: 0,
    promise: previous ? settledQuietly(previous.promise).then(() => readViaWorker(request2, controller.signal)) : readViaWorker(request2, controller.signal)
  };
  return read;
}
function consume(read, signal) {
  read.consumers++;
  return new Promise((resolve, reject) => {
    let done = false;
    const finish2 = () => {
      if (done) return false;
      done = true;
      signal?.removeEventListener("abort", onAbort);
      read.consumers--;
      return true;
    };
    const onAbort = () => {
      if (!finish2()) return;
      reject(signal?.reason);
      if (read.consumers === 0) read.controller.abort();
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    read.promise.then(
      (items) => {
        if (finish2()) resolve(items);
      },
      (error) => {
        if (finish2()) reject(error);
      }
    );
    if (signal?.aborted) onAbort();
  });
}
function listConversationsForViewViaWorker(input, signal) {
  if (signal?.aborted) return Promise.reject(signal.reason);
  const options = normalizeConversationViewListOptions(input);
  if (options.sinceMs !== void 0) {
    options.sinceMs = Math.floor(options.sinceMs / SINCE_MS_COALESCING_STEP_MS) * SINCE_MS_COALESCING_STEP_MS;
  }
  return readCoalesced({ type: "list-for-view", options }, signal);
}
function getTranscriptViaWorker(ref, input = {}, signal) {
  if (ref.length > 4096) return Promise.reject(new Error("Conversation reference is too long"));
  const options = { limit: jsonlFiles.transcriptTurnLimit(input.limit) };
  for (const key of [
    "beforeTurnPosition",
    "afterTurnPosition",
    "aroundTurnPosition",
    "focusEventId",
    "focusToolCallId"
  ]) {
    const value = input[key];
    if (typeof value === "number" && Number.isFinite(value)) options[key] = Math.floor(value);
  }
  return readCoalesced(
    { type: "transcript", ref, options },
    signal
  );
}
function readCoalesced(request2, signal) {
  if (signal?.aborted) return Promise.reject(signal.reason);
  stats.requests += 1;
  const key = JSON.stringify(request2);
  const existing = coalescedLists.get(key);
  if (!existing) {
    const inFlight = makeRead(request2);
    const entry = { inFlight, followUp: null };
    coalescedLists.set(key, entry);
    void settledQuietly(inFlight.promise).then(() => {
      if (!entry.followUp && coalescedLists.get(key) === entry) coalescedLists.delete(key);
    });
    return consume(inFlight, signal);
  }
  stats.coalesced += 1;
  if (!existing.followUp || existing.followUp.controller.signal.aborted) {
    const followUp = makeRead(request2, existing.inFlight);
    existing.followUp = followUp;
    void settledQuietly(existing.inFlight.promise).then(() => {
      if (existing.followUp === followUp) {
        existing.inFlight = followUp;
        existing.followUp = null;
      }
    });
    void settledQuietly(followUp.promise).then(() => {
      if (existing.inFlight === followUp && !existing.followUp && coalescedLists.get(key) === existing)
        coalescedLists.delete(key);
    });
  }
  return consume(existing.followUp, signal);
}
function disposeConversationListWorker() {
  disposed$3 = true;
  idleShutdown$1.cancel();
  coalescedLists.clear();
  rejectPendingLists(
    new ConversationListWorkerUnavailableError(CONVERSATION_LIST_WORKER_DISPOSED_MESSAGE)
  );
  clearBackgroundProcessRequests(SERVICE$2);
  stopWorker$1("dispose");
}
configureLocalSessionParserBinding(getParserBinding);
async function appendSessionInfoTitle(path, title) {
  await evidencePins.appendSessionInfoTitleToFile(path, title, {
    createId: crypto$1.randomUUID,
    nowIso: () => (/* @__PURE__ */ new Date()).toISOString(),
    readFile: (filePath) => promises.readFile(filePath, "utf8"),
    appendFile: (filePath, data) => promises.appendFile(filePath, data, "utf8")
  });
}
const coreConversationRuntime = createConversationMainRuntime({
  providers,
  getStorage,
  isSelfRunPath: index$1.isHarnessRunsPath,
  applyDeferredOverrides,
  getMeta,
  setMeta,
  track,
  captureRefreshError: (key, err, context) => {
    if (!shouldReportConversationRefreshAppError(err)) return;
    const payload = {};
    if (context?.provider) payload.provider = context.provider;
    if (context?.ref) payload.ref = context.ref;
    if (context?.sourcePath) payload.source_path = context.sourcePath;
    void captureAppError(key, err, payload);
  },
  onBootIngestStart: () => {
    const parserBinding = getParserBinding();
    console.info(
      parserBinding ? `[blume] shared harness-parser available at ${getHarnessParserBinaryPath()}` : "[blume] shared harness-parser not bundled; conversation ingest requires canonical parser availability"
    );
  },
  onBootIngestBackfillError: (err) => {
    console.error("[blume] 7d backfill failed:", err);
    if (!shouldReportConversationRefreshAppError(err)) return;
    void captureAppError("main.parser.backfill", err);
  },
  onIngestError: (err, context) => {
    console.error("[blume] ingest failed", {
      ref: context.ref,
      err
    });
  },
  title: {
    chat,
    isHarnessTitleWritebackEnabled: () => isPosthogFeatureEnabled(HARNESS_TITLE_WRITEBACK_FLAG),
    writeClaudeTitle: applyClaudeDesktopTitle,
    appendSessionInfoTitle
  },
  branchLabel: jsonlFiles.gitBranchLabel,
  resumeConversation,
  getSetting,
  setSetting,
  platform: process.platform,
  liveTail: {
    stat: async (path) => {
      const file = await promises.stat(path).catch(() => null);
      if (!file) return null;
      return { size: file.size, mtimeMs: file.mtimeMs, isFile: file.isFile() };
    },
    readLinesFromOffset: jsonlFiles.readJsonlLinesFromOffset
  },
  liveState: {
    stat: async (path) => {
      const file = await promises.stat(path).catch(() => null);
      if (!file) return null;
      return { size: file.size, isFile: file.isFile() };
    },
    readLinesFromOffset: jsonlFiles.readJsonlLinesFromOffset
  },
  sourceStat: async (path) => {
    const file = await promises.stat(path).catch(() => null);
    if (!file) return null;
    return { mtimeMs: file.mtimeMs, size: file.size, isFile: file.isFile() };
  },
  recordSourceChanges: recordKnownFileChanges,
  now: () => Date.now()
});
let startHistory = null;
async function generateOwnedChatTitle(messages) {
  if (!await isPosthogFeatureEnabled(HARNESS_TITLE_WRITEBACK_FLAG)) return void 0;
  return await evidencePins.generateConversationTitle(messages, { chat }) || void 0;
}
function configureConversationHistoryStart(start) {
  startHistory = start;
}
function runBootBackfill(onBackfillError) {
  const timeout = setTimeout(() => {
    void conversationRuntime.refreshFromDisk(evidencePins.CONVERSATION_WEEK_MS).catch((error) => {
      onBackfillError?.(error);
    });
  }, evidencePins.CONVERSATION_BACKFILL_DELAY_MS);
  timeout.unref();
}
const conversationRuntime = {
  ...coreConversationRuntime,
  requestConversationRefreshStop() {
    requestConversationRefreshWorkerStop();
  },
  resumeConversationRefreshes() {
    resumeConversationRefreshWorker();
  },
  async waitForConversationRefreshes() {
    await waitForConversationRefreshWorker();
  },
  applyCodexLiveStateForChangedSources(paths) {
    return coreConversationRuntime.applyCodexLiveStateForChangedSources(paths);
  },
  getTranscript(ref, opts = {}) {
    return getTranscriptViaWorker(ref, opts);
  },
  listConversationsForView(opts = {}) {
    return listConversationsForViewViaWorker(opts);
  },
  refreshFromDisk(maxAgeMs = evidencePins.CONVERSATION_DAY_MS, options = {}) {
    if (isConversationRefreshWorkerExpected()) {
      return refreshViaConversationRefreshWorker(maxAgeMs, void 0, options);
    }
    reportConversationRefreshWorkerUnavailable("refresh");
    return Promise.resolve();
  },
  async bootIngest(options = {}) {
    if (!isConversationRefreshWorkerExpected()) {
      const error = reportConversationRefreshWorkerUnavailable("boot-ingest");
      options.onFirstPassDone?.();
      options.onBackfillError?.(error);
      return;
    }
    await refreshViaConversationRefreshWorker(evidencePins.CONVERSATION_DAY_MS, options.onFirstPassDone);
    options.onFirstPassDone?.();
    if (startHistory) startHistory(Date.now() - evidencePins.CONVERSATION_DAY_MS);
    else runBootBackfill(options.onBackfillError);
  }
};
function requestConversationRefreshStop() {
  conversationRuntime.requestConversationRefreshStop();
}
function resumeConversationRefreshes() {
  conversationRuntime.resumeConversationRefreshes();
}
async function waitForConversationRefreshes() {
  await conversationRuntime.waitForConversationRefreshes();
}
const DAY_MS = evidencePins.CONVERSATION_DAY_MS;
const WEEK_MS = evidencePins.CONVERSATION_WEEK_MS;
async function refreshFromDisk(maxAgeMs = DAY_MS, options = {}, onConversationIngested) {
  if (isConversationRefreshWorkerExpected()) {
    await refreshViaConversationRefreshWorker(maxAgeMs, onConversationIngested, options);
    return;
  }
  await conversationRuntime.refreshFromDisk(maxAgeMs, options);
}
async function bootIngest(onFirstPassDone) {
  await conversationRuntime.bootIngest({ onFirstPassDone });
}
function getTerminalPreference() {
  return conversationRuntime.getTerminalPreference();
}
function setTerminalPreference(app) {
  conversationRuntime.setTerminalPreference(app);
}
function conversationRoute(conversationRef) {
  return `/agents/${encodeURIComponent(conversationRef)}`;
}
function conversationLocation(location) {
  if (location.status === "elsewhere") return location;
  return {
    status: "local",
    route: conversationRoute(location.conversationRef),
    conversationRef: location.conversationRef,
    focus: location.message ? { eventId: location.message.eventId, turnPosition: location.message.turnPosition } : null
  };
}
const RETRY_COOLDOWN_MS$1 = 5 * 6e4;
const WORKER_INACTIVITY_TIMEOUT_MS$1 = 6e4;
const MAX_PENDING_SCANS = 32;
const WORKER_IDLE_MS$2 = 6e4;
class SetupScanWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "SetupScanWorkerUnavailableError";
  }
}
const SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE = "setup scan worker unresponsive";
const SETUP_SCAN_WORKER_DISPOSED_MESSAGE = "setup scan worker disposed";
const SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE = "setup scan worker circuit breaker is cooling down";
const EXPECTED_SETUP_SCAN_WORKER_OPERATIONAL_MESSAGES = /* @__PURE__ */ new Set([
  SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE,
  SETUP_SCAN_WORKER_DISPOSED_MESSAGE,
  SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE
]);
function isSetupScanWorkerUnavailableError(error) {
  return error instanceof SetupScanWorkerUnavailableError;
}
function isExpectedSetupScanWorkerShutdownError(error) {
  return isSetupScanWorkerUnavailableError(error) && error.message === SETUP_SCAN_WORKER_DISPOSED_MESSAGE;
}
function isExpectedSetupScanWorkerOperationalError(error) {
  return isSetupScanWorkerUnavailableError(error) && EXPECTED_SETUP_SCAN_WORKER_OPERATIONAL_MESSAGES.has(error.message);
}
function shouldReportSetupScanAppError(error) {
  return !isExpectedSetupScanWorkerOperationalError(error);
}
let worker$3 = null;
let workerAlive$1 = false;
let lastFailureAtMs$3 = 0;
const pendingScans = /* @__PURE__ */ new Map();
let nextGlobalRequestId = -1;
let nextDeleteRequestId = -1e6;
let nextSyncRequestId = -2e6;
const workerIdle$2 = createIdleShutdown(WORKER_IDLE_MS$2, () => {
  if (pendingScans.size > 0) return;
  const idleWorker = worker$3;
  worker$3 = null;
  workerAlive$1 = false;
  try {
    if (idleWorker) {
      terminateBackgroundProcess(idleWorker, BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, "idle");
    }
  } catch {
  }
});
function responseError$1(response) {
  const error = new Error(response.errorMessage);
  if (response.errorName) error.name = response.errorName;
  if (response.errorStack) error.stack = response.errorStack;
  return error;
}
function rejectPending$2(error) {
  for (const [id, pending2] of pendingScans) {
    if (pending2.watchdog) clearTimeout(pending2.watchdog);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, id);
    pending2.reject(error);
  }
  pendingScans.clear();
}
function failWorker$2(error) {
  const failed = worker$3;
  worker$3 = null;
  workerAlive$1 = false;
  lastFailureAtMs$3 = Date.now();
  rejectPending$2(error);
  if (shouldReportSetupScanAppError(error)) {
    void captureAppError("main.setup.scan_worker_unavailable", error, {
      main_process_fallback: false
    });
  }
  try {
    if (failed) {
      terminateBackgroundProcess(
        failed,
        BLUME_BACKGROUND_PROCESS_SERVICES.setupScan,
        "worker-unavailable"
      );
    }
  } catch {
  }
}
function resetWatchdog$1(id, pending2) {
  if (pending2.watchdog) clearTimeout(pending2.watchdog);
  pending2.watchdog = setTimeout(() => {
    if (pendingScans.get(id) !== pending2) return;
    failWorker$2(new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE));
  }, WORKER_INACTIVITY_TIMEOUT_MS$1);
  pending2.watchdog.unref();
}
function takePending$2(id) {
  const pending2 = pendingScans.get(id);
  if (!pending2) return void 0;
  pendingScans.delete(id);
  finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, id);
  if (pending2.watchdog) clearTimeout(pending2.watchdog);
  pending2.watchdog = null;
  if (pendingScans.size === 0) workerIdle$2.schedule();
  return pending2;
}
function ensureWorker$3() {
  workerIdle$2.cancel();
  if (worker$3 && workerAlive$1) return worker$3;
  if (lastFailureAtMs$3 > 0 && Date.now() - lastFailureAtMs$3 < RETRY_COOLDOWN_MS$1) {
    throw new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE);
  }
  if (typeof deliveryNative.utilityProcess?.fork !== "function") {
    throw new SetupScanWorkerUnavailableError("setup scan worker unavailable");
  }
  try {
    const nextWorker = deliveryNative.utilityProcess.fork(pn.join(__dirname, "setupScanWorker.js"), [], {
      serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.setupScan
    });
    nextWorker.on("message", (message) => {
      const pending2 = pendingScans.get(message.id);
      if (!pending2) return;
      resetWatchdog$1(message.id, pending2);
      if (message.type === "heartbeat") return;
      takePending$2(message.id);
      if (message.ok) {
        lastFailureAtMs$3 = 0;
        pending2.resolve(message);
      } else {
        pending2.reject(responseError$1(message));
      }
    });
    nextWorker.on("exit", () => {
      if (worker$3 !== nextWorker) return;
      worker$3 = null;
      workerAlive$1 = false;
      lastFailureAtMs$3 = Date.now();
      rejectPending$2(new SetupScanWorkerUnavailableError("setup scan worker exited"));
    });
    worker$3 = nextWorker;
    workerAlive$1 = true;
    return nextWorker;
  } catch (error) {
    lastFailureAtMs$3 = Date.now();
    void captureAppError("main.setup.scan_worker_spawn", error);
    throw new SetupScanWorkerUnavailableError("failed to spawn setup scan worker");
  }
}
function scanProjectInSetupWorker(path, requestId2, context = {}) {
  if (pendingScans.has(requestId2)) {
    return Promise.reject(new Error(`duplicate setup scan request ${requestId2}`));
  }
  if (pendingScans.size >= MAX_PENDING_SCANS) {
    return Promise.reject(new Error("too many pending setup scans"));
  }
  return new Promise((resolve, reject) => {
    let activeWorker;
    try {
      activeWorker = ensureWorker$3();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve: (response) => {
        if (response.type === "project-result") resolve(response.scan);
        else reject(new Error("setup scan worker returned the wrong result type"));
      },
      reject,
      watchdog: null
    };
    pendingScans.set(requestId2, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, requestId2);
    resetWatchdog$1(requestId2, pending2);
    try {
      activeWorker.postMessage({ type: "scan-project", id: requestId2, path, ...context });
    } catch {
      failWorker$2(new SetupScanWorkerUnavailableError("failed to message setup scan worker"));
    }
  });
}
function scanGlobalSetupInSetupWorker() {
  const requestId2 = nextGlobalRequestId--;
  if (pendingScans.size >= MAX_PENDING_SCANS) {
    return Promise.reject(new Error("too many pending setup scans"));
  }
  return new Promise((resolve, reject) => {
    let activeWorker;
    try {
      activeWorker = ensureWorker$3();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve: (response) => {
        if (response.type === "global-result") resolve(response.setups);
        else reject(new Error("setup scan worker returned the wrong result type"));
      },
      reject,
      watchdog: null
    };
    pendingScans.set(requestId2, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, requestId2);
    resetWatchdog$1(requestId2, pending2);
    try {
      activeWorker.postMessage({ type: "scan-global", id: requestId2 });
    } catch {
      failWorker$2(new SetupScanWorkerUnavailableError("failed to message setup scan worker"));
    }
  });
}
function deleteArtifactInSetupWorker(artifact) {
  const requestId2 = nextDeleteRequestId--;
  if (pendingScans.size >= MAX_PENDING_SCANS) {
    return Promise.reject(new Error("too many pending setup requests"));
  }
  return new Promise((resolve, reject) => {
    let activeWorker;
    try {
      activeWorker = ensureWorker$3();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve: (response) => {
        if (response.type === "delete-result") resolve();
        else reject(new Error("setup scan worker returned the wrong result type"));
      },
      reject,
      watchdog: null
    };
    pendingScans.set(requestId2, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, requestId2);
    resetWatchdog$1(requestId2, pending2);
    try {
      activeWorker.postMessage({
        type: "delete-artifact",
        id: requestId2,
        artifact
      });
    } catch {
      failWorker$2(new SetupScanWorkerUnavailableError("failed to message setup scan worker"));
    }
  });
}
function artifactSyncRequest(input) {
  const itemCount = input.availableArtifacts?.length ?? input.selection?.artifacts.length ?? input.artifactIds?.length ?? 0;
  setupScanProtocol.assertBoundedArtifactSyncMessage(input, itemCount);
  const requestId2 = nextSyncRequestId--;
  if (pendingScans.size >= MAX_PENDING_SCANS) {
    return Promise.reject(new Error("too many pending setup requests"));
  }
  return new Promise((resolve, reject) => {
    let activeWorker;
    try {
      activeWorker = ensureWorker$3();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve: (response) => {
        if (response.type === "artifact-sync-result") resolve(response.states);
        else reject(new Error("setup scan worker returned the wrong result type"));
      },
      reject,
      watchdog: null
    };
    pendingScans.set(requestId2, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, requestId2);
    resetWatchdog$1(requestId2, pending2);
    try {
      activeWorker.postMessage(
        input.accessToken ? {
          type: "sync-artifacts",
          id: requestId2,
          statePath: input.statePath,
          accessToken: input.accessToken,
          baseUrl: input.baseUrl,
          selection: input.selection,
          placement: input.placement,
          availableArtifacts: input.availableArtifacts
        } : {
          type: "list-artifact-sync",
          id: requestId2,
          statePath: input.statePath,
          baseUrl: input.baseUrl,
          artifactIds: input.artifactIds
        }
      );
    } catch {
      failWorker$2(new SetupScanWorkerUnavailableError("failed to message setup scan worker"));
    }
  });
}
function artifactSyncPreviewRequest(input, requestId2 = nextSyncRequestId--) {
  const itemCount = input.preview.type === "enable" ? input.preview.artifacts.length : 1;
  setupScanProtocol.assertBoundedArtifactSyncMessage(input, itemCount);
  if (pendingScans.size >= MAX_PENDING_SCANS) {
    return Promise.reject(new Error("too many pending setup requests"));
  }
  return new Promise((resolve, reject) => {
    let activeWorker;
    try {
      activeWorker = ensureWorker$3();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const pending2 = {
      resolve: (response) => {
        if (response.type === "artifact-sync-preview-result") resolve(response.preview);
        else reject(new Error("setup scan worker returned the wrong result type"));
      },
      reject,
      watchdog: null
    };
    pendingScans.set(requestId2, pending2);
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan, requestId2);
    resetWatchdog$1(requestId2, pending2);
    try {
      activeWorker.postMessage({
        type: "preview-artifact-sync",
        id: requestId2,
        ...input
      });
    } catch {
      failWorker$2(new SetupScanWorkerUnavailableError("failed to message setup scan worker"));
    }
  });
}
function listArtifactSyncStatesInSetupWorker(statePath, artifactIds, baseUrl) {
  return artifactSyncRequest({ statePath, artifactIds, baseUrl });
}
function setArtifactSyncedInSetupWorker(input) {
  return artifactSyncRequest(input);
}
function previewArtifactSyncInSetupWorker(input, requestId2) {
  return artifactSyncPreviewRequest(input, requestId2);
}
function cancelArtifactSyncPreviewInSetupWorker(requestId2) {
  cancelProjectSetupScan(requestId2);
}
function placeArtifactSyncedInSetupWorker(input) {
  return artifactSyncRequest(input);
}
function syncArtifactsInSetupWorker(input) {
  return artifactSyncRequest(input);
}
function discoverArtifactSyncStatesInSetupWorker(input) {
  return artifactSyncRequest(input);
}
function cancelProjectSetupScan(requestId2) {
  const pending2 = takePending$2(requestId2);
  if (!pending2) return;
  const error = new Error("setup scan cancelled");
  error.name = "AbortError";
  pending2.reject(error);
  try {
    worker$3?.postMessage({ type: "cancel", id: requestId2 });
  } catch {
  }
}
function disposeSetupScanWorker() {
  workerIdle$2.cancel();
  const activeWorker = worker$3;
  worker$3 = null;
  workerAlive$1 = false;
  clearBackgroundProcessRequests(BLUME_BACKGROUND_PROCESS_SERVICES.setupScan);
  rejectPending$2(new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_DISPOSED_MESSAGE));
  try {
    if (activeWorker) {
      terminateBackgroundProcess(
        activeWorker,
        BLUME_BACKGROUND_PROCESS_SERVICES.setupScan,
        "dispose"
      );
    }
  } catch {
  }
}
const ANALYTICS_URL = process.env.BLUME_USER_ANALYTICS_URL?.replace(/\/+$/, "") || "https://analytics.blume-page.com";
const REQUEST_TIMEOUT_MS$3 = 8e3;
async function requestJson(url, init) {
  const response = await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS$3) });
  const body = await response.text();
  if (!response.ok)
    throw new Error(`HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  return JSON.parse(body);
}
async function analyticsToken() {
  const credentials = await getInstallationCredentials();
  const response = await requestJson(`${getAuthUrl()}/v1/token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-blume-installation-token": credentials.token
    },
    body: JSON.stringify({
      installationId: credentials.installationId,
      audience: "user-analytics",
      scopes: ["analytics:metrics:write", "analytics:comparison:read"]
    })
  });
  return response.accessToken;
}
const WORKER_TIMEOUT_MS = 3e4;
const WORKER_IDLE_MS$1 = 15e3;
class SignalAnalyticsWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "SignalAnalyticsWorkerUnavailableError";
  }
}
const SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE = "signal analytics worker timed out";
const SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE = "signal analytics worker exited";
const SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE = "signal analytics worker disposed";
const SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE = "signal analytics worker unavailable";
const EXPECTED_SIGNAL_ANALYTICS_WORKER_OPERATIONAL_MESSAGES = /* @__PURE__ */ new Set([
  SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE,
  SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE,
  SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE
]);
function isSignalAnalyticsWorkerUnavailableError(error) {
  return error instanceof SignalAnalyticsWorkerUnavailableError;
}
function isExpectedSignalAnalyticsWorkerShutdownError(error) {
  return isSignalAnalyticsWorkerUnavailableError(error) && error.message === SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE;
}
function isExpectedSignalAnalyticsWorkerOperationalError(error) {
  return isSignalAnalyticsWorkerUnavailableError(error) && EXPECTED_SIGNAL_ANALYTICS_WORKER_OPERATIONAL_MESSAGES.has(error.message);
}
function shouldReportSignalAnalyticsAppError(error) {
  return !isExpectedSignalAnalyticsWorkerOperationalError(error);
}
function isSignalAnalyticsWorkerExitedError(error) {
  return isSignalAnalyticsWorkerUnavailableError(error) && error.message === SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE;
}
let worker$2 = null;
let disposed$2 = false;
let requestId$1 = 0;
let aggregateInFlight = null;
const pending$3 = /* @__PURE__ */ new Map();
const workerIdle$1 = createIdleShutdown(WORKER_IDLE_MS$1, () => {
  if (pending$3.size > 0) return;
  const idleWorker = worker$2;
  worker$2 = null;
  try {
    if (idleWorker) {
      terminateBackgroundProcess(
        idleWorker,
        BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics,
        "idle"
      );
    }
  } catch {
  }
});
function errorFromFailure(value) {
  const error = new Error(value.errorMessage);
  if (value.errorName) error.name = value.errorName;
  if (value.errorStack) error.stack = value.errorStack;
  return error;
}
function rejectPending$1(error) {
  const items = [...pending$3.entries()];
  pending$3.clear();
  for (const [id, item] of items) {
    clearTimeout(item.timeout);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics, id);
    item.reject(error);
  }
}
function ensureWorker$2() {
  workerIdle$1.cancel();
  if (disposed$2) {
    throw new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE);
  }
  if (worker$2) return worker$2;
  if (typeof deliveryNative.utilityProcess?.fork !== "function") {
    throw new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_UNAVAILABLE_MESSAGE);
  }
  const next = deliveryNative.utilityProcess.fork(pn.join(__dirname, "signalAnalyticsWorker.js"), [], {
    serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics
  });
  next.on("message", (message) => {
    const item = pending$3.get(message.id);
    if (!item) return;
    pending$3.delete(message.id);
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics, message.id);
    clearTimeout(item.timeout);
    if (pending$3.size === 0) workerIdle$1.schedule();
    if (message.ok) item.resolve(message.summary);
    else item.reject(errorFromFailure(message));
  });
  next.on("exit", () => {
    if (worker$2 !== next) return;
    worker$2 = null;
    rejectPending$1(new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE));
  });
  worker$2 = next;
  return next;
}
function requestLocalSignalAnalytics(signals, isRetry = false) {
  if (disposed$2) {
    return Promise.reject(
      new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE)
    );
  }
  const id = ++requestId$1;
  return new Promise((resolve, reject) => {
    let active2;
    try {
      active2 = ensureWorker$2();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
      return;
    }
    const timeout = setTimeout(() => {
      pending$3.delete(id);
      finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics, id);
      if (worker$2 === active2) worker$2 = null;
      try {
        terminateBackgroundProcess(
          active2,
          BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics,
          "request-timeout"
        );
      } catch {
      }
      reject(new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_TIMED_OUT_MESSAGE));
    }, WORKER_TIMEOUT_MS);
    timeout.unref();
    const settleReject = (error) => {
      if (!isRetry && !disposed$2 && isSignalAnalyticsWorkerExitedError(error)) {
        void requestLocalSignalAnalytics(signals, true).then(resolve, reject);
        return;
      }
      reject(error);
    };
    pending$3.set(id, { resolve, reject: settleReject, timeout });
    startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics, id);
    try {
      active2.postMessage({ type: "aggregate", id, dbPath: getDbPath(), signals });
    } catch {
      pending$3.delete(id);
      clearTimeout(timeout);
      finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics, id);
      if (worker$2 === active2) worker$2 = null;
      settleReject(
        new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE)
      );
    }
  });
}
function aggregateLocalSignalAnalytics(signals) {
  const key = signals ? JSON.stringify(signals) : "";
  if (aggregateInFlight?.key === key) return aggregateInFlight.promise;
  const entry = {
    key,
    promise: requestLocalSignalAnalytics(signals).finally(() => {
      if (aggregateInFlight === entry) aggregateInFlight = null;
    })
  };
  aggregateInFlight = entry;
  return entry.promise;
}
const remoteSignalAnalytics = {
  async sync(local) {
    const token = await analyticsToken();
    const upload = {
      schemaVersion: 2,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      daily: local.daily
    };
    await requestJson(`${ANALYTICS_URL}/v1/metrics/daily`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify(upload)
    });
    const comparison = await requestJson(
      `${ANALYTICS_URL}/v1/comparison?windowDays=30`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    return { comparison, syncedAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
};
const signalAnalyticsUseCases = signalAnalytics.createSignalAnalyticsUseCases({
  local: { summarize: aggregateLocalSignalAnalytics },
  remote: remoteSignalAnalytics
});
const getSignalAnalyticsDashboard = signalAnalyticsUseCases.getDashboard;
function disposeSignalAnalyticsWorker() {
  disposed$2 = true;
  workerIdle$1.cancel();
  const active2 = worker$2;
  worker$2 = null;
  aggregateInFlight = null;
  clearBackgroundProcessRequests(BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics);
  rejectPending$1(new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_DISPOSED_MESSAGE));
  try {
    if (active2) {
      terminateBackgroundProcess(
        active2,
        BLUME_BACKGROUND_PROCESS_SERVICES.signalAnalytics,
        "dispose"
      );
    }
  } catch {
  }
}
const UPDATE_QUIT_WINDOW_TEARDOWN_MS = 250;
const UPDATE_QUIT_FALLBACK_EXIT_MS = 15e3;
const UPDATE_QUIT_EXTERNAL_KILL_GRACE_SECONDS = 15;
const UPDATE_QUIT_EXTERNAL_KILL_FORCE_SECONDS = 5;
const MAC_NATIVE_STAGING_TIMEOUT_MS = 12e4;
const UPDATE_CHECK_INTERVAL_MS = 60 * 6e4;
const UPDATE_SERVICE_HOST = "updates.blume-page.com/desktop/";
const UPDATE_INSTALL_ATTEMPT_FILE = "pending-update-install.json";
const MAX_UPDATE_INSTALL_ATTEMPT_BYTES = 1024;
const TRANSIENT_UPDATER_NETWORK_ERRORS = [
  "err_address_unreachable",
  "err_connection_closed",
  "err_connection_refused",
  "err_connection_reset",
  "err_connection_timed_out",
  "err_content_length_mismatch",
  "err_http2_protocol_error",
  "err_internet_disconnected",
  "err_name_not_resolved",
  "err_network_access_denied",
  "err_network_changed",
  "err_network_io_suspended",
  "err_proxy_connection_failed",
  "err_quic_protocol_error",
  "err_socket_not_connected",
  "err_timed_out",
  "err_tunnel_connection_failed"
];
const REPORTABLE_UPDATER_SECURITY_ERRORS = [
  "err_cert_",
  "err_ssl_",
  "not signed",
  "signature verification"
];
const NON_FATAL_UPDATER_INSTALL_SPAWN_ERRORS = ["eperm", "eacces"];
const UPDATE_INSTALL_TARGET_MISMATCH_MARKER = "update install did not reach target version";
const MAC_NATIVE_STAGING_TIMEOUT_MARKER = "macos native updater did not stage";
const READ_ONLY_VOLUME_UPDATE_MARKER = "read-only volume";
const MANUAL_RECOVERY_DIALOG_PRESENTATION_MARKERS = [
  "osstatus error -60006",
  // Apple EN dialog timeout — require the terminator so unrelated strings that
  // only share the substring (e.g. "…timed out while contacting…") stay fatal.
  "the request timed out.",
  // Production sibling locale (ru): Apple NSError for the same dialog timeout.
  "превышен лимит времени на запрос."
];
let recoveryPromptOpen = false;
let updateFailurePrompted = false;
let installingUpdate = false;
let appQuitting = false;
let updateLifecyclePaused = false;
let updateCheckInFlight = null;
let updateCheckTimer = null;
let readyUpdateInfo = null;
let restartReadyUpdatePending = false;
let macNativeStageRetryBlocked = false;
let lifecycleHooks = {};
const log$1 = createAppLogger("main.updater");
let macNativeStageState = { status: "idle" };
function logError(message, err) {
  try {
    log$1.error(message, err);
    if (isNonFatalUpdaterError(err)) return;
    void captureAppError("main.updater", err, { updater_message: message }).catch(() => void 0);
  } catch {
  }
}
function updaterLogMessage(value) {
  if (typeof value === "string") return value;
  if (value instanceof Error) {
    if (value.message) return `${value.name || "Error"}: ${value.message}`;
    return value.name || "Error";
  }
  if (value === void 0) return "electron-updater log";
  if (value === null) return "electron-updater log: null";
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint" || typeof value === "symbol") {
    return `electron-updater log: ${String(value)}`;
  }
  return `electron-updater ${typeof value} log`;
}
function updaterLogProperties(value) {
  if (value instanceof Error) return { updater_error: value };
  if (value !== null && typeof value === "object") return { updater_message: value };
  return void 0;
}
function writeUpdaterLog(level, value) {
  const message = updaterLogMessage(value);
  const properties = updaterLogProperties(value);
  if (level === "debug") log$1.debug(message, properties);
  else if (level === "info") log$1.info(message, properties);
  else if (level === "warn") log$1.warn(message, properties);
  else if (value instanceof Error) log$1.error(message, value);
  else log$1.error(message, void 0, properties);
}
const updaterLogger = {
  debug: (value) => writeUpdaterLog("debug", value),
  info: (value) => writeUpdaterLog("info", value),
  warn: (value) => writeUpdaterLog("warn", value),
  error: (value) => writeUpdaterLog("error", value)
};
function errorText(err, seen = /* @__PURE__ */ new WeakSet()) {
  if (err === null || err === void 0) return "";
  if (err instanceof Error) {
    const cause = err.cause;
    return [
      err.name,
      err.message,
      err.stack,
      cause === void 0 ? void 0 : errorText(cause, seen)
    ].filter(Boolean).join("\n");
  }
  if (typeof err === "string") return err;
  if (typeof err !== "object") return String(err);
  if (seen.has(err)) return "";
  seen.add(err);
  const entry = err;
  return ["name", "message", "stack", "url", "status", "code", "cause"].map((key) => errorText(entry[key], seen)).filter(Boolean).join("\n");
}
function isNonFatalUpdaterError(err) {
  const text = errorText(err).toLowerCase();
  if (REPORTABLE_UPDATER_SECURITY_ERRORS.some((marker) => text.includes(marker))) return false;
  if (TRANSIENT_UPDATER_NETWORK_ERRORS.some((code) => text.includes(code))) return true;
  if (process.platform === "win32" && text.includes("spawn") && NON_FATAL_UPDATER_INSTALL_SPAWN_ERRORS.some((code) => text.includes(code))) {
    return true;
  }
  if (text.includes(UPDATE_INSTALL_TARGET_MISMATCH_MARKER)) return true;
  if (text.includes(MAC_NATIVE_STAGING_TIMEOUT_MARKER)) return true;
  if (text.includes(READ_ONLY_VOLUME_UPDATE_MARKER)) return true;
  if (MANUAL_RECOVERY_DIALOG_PRESENTATION_MARKERS.some((marker) => text.includes(marker))) {
    return true;
  }
  if (!text.includes(UPDATE_SERVICE_HOST)) return false;
  return text.includes("cannot download") || text.includes("latest-mac.yml") || text.includes("latest.yml") || text.includes("c-mac.yml") || text.includes("canary-mac.yml") || text.includes("status 410") || text.includes("410") && text.includes("gone") || text.includes("econn") || text.includes("enotfound") || text.includes("timeout");
}
function isReadOnlyVolumeUpdaterError(err) {
  return errorText(err).toLowerCase().includes(READ_ONLY_VOLUME_UPDATE_MARKER);
}
function shouldPromptRecoveryAfterUncorrelatedNativeStage(err) {
  return !isNonFatalUpdaterError(err) || isReadOnlyVolumeUpdaterError(err);
}
function updateLabel(info) {
  return info.version ? `v${info.version}` : "unknown version";
}
function getNativeMacUpdater() {
  const nativeUpdater = electronUpdater.autoUpdater.nativeUpdater;
  if (!nativeUpdater || typeof nativeUpdater.on !== "function") return null;
  return nativeUpdater;
}
async function runLifecycleHook(name) {
  const hook = lifecycleHooks[name];
  if (!hook) return;
  try {
    await hook();
  } catch (err) {
    logError(`${name} hook failed`, err);
  }
}
function updateReadyState(info) {
  return { version: boundedVersion(info.version) };
}
async function notifyUpdateReady(info) {
  const hook = lifecycleHooks.notifyUpdateReady;
  if (!hook) return;
  try {
    await hook(updateReadyState(info));
  } catch (err) {
    logError("notifyUpdateReady hook failed", err);
  }
}
function resumeAfterUpdateCheckOnce() {
  if (!updateLifecyclePaused) return;
  updateLifecyclePaused = false;
  void runLifecycleHook("resumeAfterUpdateCheck");
}
function clearMacNativeStageTimeout() {
  if (macNativeStageState.status === "waiting-for-native") {
    clearTimeout(macNativeStageState.timeout);
  }
}
function resetMacNativeStageState() {
  clearMacNativeStageTimeout();
  macNativeStageState = { status: "idle" };
}
function settleMacNativeStageState() {
  clearMacNativeStageTimeout();
  macNativeStageState = { status: "settled" };
}
function pendingMacNativeStageInfo() {
  const state = macNativeStageState;
  return state.status === "waiting-for-native" ? state.info : null;
}
function hasUncorrelatedMacNativeStage() {
  return macNativeStageState.status === "native-ready-early" || macNativeStageState.status === "waiting-for-native";
}
function blockMacNativeStageRetries(info, reason) {
  macNativeStageRetryBlocked = true;
  log$1.warn("blocking automatic update retries after macOS native staging failure", {
    update_version: info ? updateLabel(info) : "unknown version",
    reason
  });
}
function manualInstallerUrlForReleaseChannel(channel) {
  const prefix = "stable";
  return `https://updates.blume-page.com/desktop/${prefix}/download`;
}
function manualInstallerUrl() {
  return manualInstallerUrlForReleaseChannel();
}
async function openManualInstaller() {
  const url = manualInstallerUrl();
  try {
    await deliveryNative.shell.openExternal(url);
    log$1.info("opened manual update installer", { url });
  } catch (err) {
    logError("failed to open manual update installer", err);
  }
}
async function promptForManualRecovery(message, detail) {
  if (recoveryPromptOpen || installingUpdate || appQuitting) return;
  recoveryPromptOpen = true;
  try {
    const result = await deliveryNative.dialog.showMessageBox({
      type: "warning",
      buttons: ["Download Installer", "Dismiss"],
      defaultId: 0,
      cancelId: 1,
      title: "Update Couldn’t Finish",
      message,
      detail
    });
    if (result.response === 0) await openManualInstaller();
  } catch (err) {
    logError("manual update prompt failed", err);
  } finally {
    recoveryPromptOpen = false;
  }
}
function promptForManualRecoveryOnce(message, detail) {
  if (updateFailurePrompted) return;
  updateFailurePrompted = true;
  void promptForManualRecovery(message, detail);
}
function installAttemptPath() {
  return _n.join(deliveryNative.app.getPath("userData"), UPDATE_INSTALL_ATTEMPT_FILE);
}
function boundedVersion(value) {
  if (typeof value !== "string") return "unknown";
  return value.slice(0, 64);
}
function parseVersionCoreParts(version2) {
  const core = version2.trim().replace(/^v/i, "").split(/[-+]/, 1)[0] ?? "";
  if (!/^\d+(?:\.\d+)*$/.test(core)) return null;
  return core.split(".").map((part) => Number(part));
}
function isCurrentVersionNewerThanTarget(current, target) {
  const left = parseVersionCoreParts(current);
  const right = parseVersionCoreParts(target);
  if (!left || !right) return false;
  const length = Math.max(left.length, right.length);
  for (let index2 = 0; index2 < length; index2 += 1) {
    const leftPart = left[index2] ?? 0;
    const rightPart = right[index2] ?? 0;
    if (leftPart > rightPart) return true;
    if (leftPart < rightPart) return false;
  }
  return false;
}
async function recordUpdateInstallAttempt(info) {
  const attempt = {
    schema: 1,
    sourceVersion: boundedVersion(deliveryNative.app.getVersion()),
    targetVersion: boundedVersion(info.version),
    recordedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  try {
    await require$$0$1.writeFile(installAttemptPath(), JSON.stringify(attempt), {
      encoding: "utf8",
      mode: 384
    });
    log$1.info("recorded update install attempt", {
      source_version: attempt.sourceVersion,
      target_version: attempt.targetVersion
    });
  } catch (err) {
    logError("failed to record update install attempt", err);
  }
}
function isUpdateInstallAttempt(value) {
  if (!value || typeof value !== "object") return false;
  const entry = value;
  return entry.schema === 1 && typeof entry.sourceVersion === "string" && entry.sourceVersion.length <= 64 && typeof entry.targetVersion === "string" && entry.targetVersion.length <= 64 && typeof entry.recordedAt === "string" && entry.recordedAt.length <= 64;
}
async function correlatePreviousUpdateInstallAttempt() {
  let raw = null;
  let shouldDiscardUnreadableRecord = false;
  let handle = null;
  try {
    handle = await require$$0$1.open(installAttemptPath(), "r");
    const buffer = Buffer.alloc(MAX_UPDATE_INSTALL_ATTEMPT_BYTES + 1);
    const { bytesRead } = await handle.read(buffer, 0, MAX_UPDATE_INSTALL_ATTEMPT_BYTES + 1, 0);
    if (bytesRead > MAX_UPDATE_INSTALL_ATTEMPT_BYTES) {
      throw new Error("update install attempt record exceeds size limit");
    }
    raw = buffer.toString("utf8", 0, bytesRead);
  } catch (err) {
    if (err?.code === "ENOENT") return;
    shouldDiscardUnreadableRecord = true;
    logError("failed to read previous update install attempt", err);
  } finally {
    await handle?.close().catch(() => void 0);
  }
  if (shouldDiscardUnreadableRecord || raw === null) {
    await require$$0$1.unlink(installAttemptPath()).catch(() => void 0);
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!isUpdateInstallAttempt(parsed)) throw new Error("invalid update install attempt record");
    const currentVersion = boundedVersion(deliveryNative.app.getVersion());
    if (currentVersion === parsed.targetVersion) {
      log$1.info("update install confirmed on next launch", {
        source_version: parsed.sourceVersion,
        target_version: parsed.targetVersion,
        current_version: currentVersion
      });
    } else if (isCurrentVersionNewerThanTarget(currentVersion, parsed.targetVersion)) {
      log$1.info("previous update install superseded by newer version", {
        source_version: parsed.sourceVersion,
        target_version: parsed.targetVersion,
        current_version: currentVersion
      });
    } else {
      const err = new Error(
        `Update install did not reach target version ${parsed.targetVersion}; current version is ${currentVersion}`
      );
      logError("previous update install was not confirmed", err);
      promptForManualRecoveryOnce(
        `Blume ${parsed.targetVersion} may not have installed.`,
        "Download the installer to update Blume manually. Your data and settings will be preserved."
      );
    }
  } catch (err) {
    logError("failed to correlate previous update install attempt", err);
  } finally {
    await require$$0$1.unlink(installAttemptPath()).catch(() => void 0);
  }
}
function destroyWindowsForUpdateQuit(windows = deliveryNative.BrowserWindow.getAllWindows()) {
  let destroyed = 0;
  for (const win of windows) {
    if (win.isDestroyed()) continue;
    win.destroy();
    destroyed += 1;
  }
  return destroyed;
}
function isInstallingDownloadedUpdateForRestart() {
  return installingUpdate;
}
function getUpdateReadyState() {
  return readyUpdateInfo ? updateReadyState(readyUpdateInfo) : null;
}
function scheduleUpdateFallbackExit(message) {
  return setTimeout(() => {
    try {
      log$1.info(message);
    } catch {
    } finally {
      deliveryNative.app.exit(0);
    }
  }, UPDATE_QUIT_FALLBACK_EXIT_MS);
}
function scheduleExternalUpdateExitWatchdog() {
  try {
    const script = [
      'sleep "$1"',
      'kill -TERM "$2" 2>/dev/null || true',
      'sleep "$3"',
      'kill -KILL "$2" 2>/dev/null || true'
    ].join("; ");
    const child = node_child_process.spawn(
      "/bin/sh",
      [
        "-c",
        script,
        "blume-update-exit-watchdog",
        String(UPDATE_QUIT_EXTERNAL_KILL_GRACE_SECONDS),
        String(process.pid),
        String(UPDATE_QUIT_EXTERNAL_KILL_FORCE_SECONDS)
      ],
      {
        detached: true,
        stdio: "ignore"
      }
    );
    child.unref();
    log$1.info("armed external update exit watchdog", {
      pid: process.pid,
      grace_seconds: UPDATE_QUIT_EXTERNAL_KILL_GRACE_SECONDS,
      force_seconds: UPDATE_QUIT_EXTERNAL_KILL_FORCE_SECONDS
    });
    return child;
  } catch (err) {
    logError("failed to arm external update exit watchdog", err);
    return null;
  }
}
function installDownloadedUpdateForRestart() {
  if (installingUpdate) return;
  installingUpdate = true;
  try {
    const destroyedWindows = destroyWindowsForUpdateQuit();
    log$1.info("quitting to install update", { destroyed_windows: destroyedWindows });
    setTimeout(() => {
      let fallbackTimer;
      let externalWatchdog = null;
      try {
        fallbackTimer = scheduleUpdateFallbackExit(
          "forcing app exit after update quit grace period"
        );
        externalWatchdog = scheduleExternalUpdateExitWatchdog();
        electronUpdater.autoUpdater.quitAndInstall();
      } catch (err) {
        installingUpdate = false;
        if (fallbackTimer) clearTimeout(fallbackTimer);
        if (externalWatchdog) externalWatchdog.kill();
        try {
          logError("quitAndInstall failed", err);
        } finally {
          scheduleUpdateFallbackExit("forcing app exit after quitAndInstall failure");
        }
      }
    }, UPDATE_QUIT_WINDOW_TEARDOWN_MS);
  } catch (err) {
    installingUpdate = false;
    logError("quitAndInstall failed", err);
  }
}
async function restartReadyUpdate() {
  const info = readyUpdateInfo;
  if (!info || restartReadyUpdatePending || installingUpdate) return false;
  restartReadyUpdatePending = true;
  try {
    await recordUpdateInstallAttempt(info);
    installDownloadedUpdateForRestart();
    return installingUpdate;
  } finally {
    if (!installingUpdate) restartReadyUpdatePending = false;
  }
}
function publishUpdateReady(info) {
  if (readyUpdateInfo || installingUpdate) return;
  readyUpdateInfo = info;
  log$1.info("update ready for restart", { update_version: updateLabel(info) });
  resumeAfterUpdateCheckOnce();
  void notifyUpdateReady(info);
}
function promptAfterMacNativeUpdateStaged() {
  if (macNativeStageState.status === "settled") {
    log$1.warn("ignoring late macOS native updater staging event");
    return;
  }
  if (macNativeStageState.status === "idle") {
    macNativeStageState = { status: "native-ready-early" };
    log$1.info("macOS native updater staged update before wrapper download event");
    return;
  }
  if (macNativeStageState.status === "native-ready-early") {
    log$1.warn("ignoring duplicate early macOS native updater staging event");
    return;
  }
  const info = macNativeStageState.info;
  settleMacNativeStageState();
  log$1.info("macOS native updater staged update", {
    update_version: updateLabel(info),
    stage: "native-updater-ready"
  });
  publishUpdateReady(info);
}
function handleUpdateDownloaded(info, nativeMacUpdater) {
  log$1.info("update downloaded", { update_version: updateLabel(info), info });
  if (nativeMacUpdater) {
    if (macNativeStageState.status === "settled") {
      log$1.warn("ignoring late macOS wrapper download event", {
        update_version: updateLabel(info)
      });
      return;
    }
    if (macNativeStageState.status === "native-ready-early") {
      settleMacNativeStageState();
      log$1.info("matched early macOS native staging event to downloaded update", {
        update_version: updateLabel(info),
        stage: "native-updater-ready"
      });
      publishUpdateReady(info);
      return;
    }
    clearMacNativeStageTimeout();
    const timeout = setTimeout(() => {
      const currentStage = macNativeStageState;
      if (currentStage.status !== "waiting-for-native") return;
      const timedOutInfo = currentStage.info;
      blockMacNativeStageRetries(timedOutInfo, "timeout");
      settleMacNativeStageState();
      resumeAfterUpdateCheckOnce();
      const err = new Error(
        `macOS native updater did not stage ${updateLabel(timedOutInfo)} within ${MAC_NATIVE_STAGING_TIMEOUT_MS}ms`
      );
      logError("macOS native updater staging timed out", err);
      promptForManualRecoveryOnce(
        `Blume ${updateLabel(timedOutInfo)} could not be prepared for restart.`,
        "Download the installer to update Blume manually. You can keep using this version in the meantime."
      );
    }, MAC_NATIVE_STAGING_TIMEOUT_MS);
    macNativeStageState = { status: "waiting-for-native", info, timeout };
    log$1.info("waiting for macOS native updater to stage update", {
      update_version: updateLabel(info),
      timeout_ms: MAC_NATIVE_STAGING_TIMEOUT_MS
    });
    return;
  }
  publishUpdateReady(info);
}
function handleUpdaterError(err) {
  const currentMacNativeStage = macNativeStageState;
  const pendingNativeStage = currentMacNativeStage.status === "waiting-for-native" ? currentMacNativeStage : null;
  const hadUncorrelatedNativeStage = currentMacNativeStage.status === "native-ready-early" || pendingNativeStage !== null;
  if (hadUncorrelatedNativeStage) {
    blockMacNativeStageRetries(pendingNativeStage?.info ?? null, "updater-error");
  }
  if (pendingNativeStage) {
    log$1.warn("clearing pending macOS update after updater error", {
      update_version: updateLabel(pendingNativeStage.info)
    });
  }
  settleMacNativeStageState();
  resumeAfterUpdateCheckOnce();
  logError("update check failed", err);
  if (hadUncorrelatedNativeStage && shouldPromptRecoveryAfterUncorrelatedNativeStage(err)) {
    promptForManualRecoveryOnce(
      "Blume could not prepare the downloaded update.",
      "Download the installer to update Blume manually. You can keep using this version in the meantime."
    );
  }
}
function requestUpdateCheck(nativeMacUpdater) {
  if (appQuitting || installingUpdate || readyUpdateInfo || updateCheckInFlight || nativeMacUpdater !== null && macNativeStageRetryBlocked || macNativeStageState.status === "waiting-for-native") {
    return;
  }
  updateLifecyclePaused = nativeMacUpdater !== null;
  resetMacNativeStageState();
  updateFailurePrompted = false;
  const check = (async () => {
    try {
      if (nativeMacUpdater) await runLifecycleHook("prepareForUpdateCheck");
      if (appQuitting) {
        resumeAfterUpdateCheckOnce();
        return;
      }
      const result = await electronUpdater.autoUpdater.checkForUpdates();
      if (!result?.downloadPromise) {
        resumeAfterUpdateCheckOnce();
        return;
      }
      try {
        await result.downloadPromise;
      } catch (err) {
        const hadUncorrelatedNativeStage = hasUncorrelatedMacNativeStage();
        const failedNativeStageInfo = pendingMacNativeStageInfo();
        if (hadUncorrelatedNativeStage) {
          blockMacNativeStageRetries(failedNativeStageInfo, "download-error");
        }
        settleMacNativeStageState();
        resumeAfterUpdateCheckOnce();
        logError("download update failed", err);
        if (hadUncorrelatedNativeStage && shouldPromptRecoveryAfterUncorrelatedNativeStage(err)) {
          promptForManualRecoveryOnce(
            "Blume could not prepare the downloaded update.",
            "Download the installer to update Blume manually. You can keep using this version in the meantime."
          );
        }
      }
    } catch (err) {
      settleMacNativeStageState();
      resumeAfterUpdateCheckOnce();
      logError("checkForUpdates failed", err);
    }
  })();
  updateCheckInFlight = check;
  void check.finally(() => {
    if (updateCheckInFlight === check) updateCheckInFlight = null;
  });
}
function startAutoUpdates(hooks = {}) {
  if (utils.is.dev) {
    log$1.info("skipping update check in dev");
    return;
  }
  lifecycleHooks = hooks;
  const nativeMacUpdater = getNativeMacUpdater();
  updateLifecyclePaused = nativeMacUpdater !== null;
  readyUpdateInfo = null;
  restartReadyUpdatePending = false;
  macNativeStageRetryBlocked = false;
  resetMacNativeStageState();
  updateFailurePrompted = false;
  electronUpdater.autoUpdater.logger = updaterLogger;
  electronUpdater.autoUpdater.autoDownload = true;
  if (nativeMacUpdater) electronUpdater.autoUpdater.disableDifferentialDownload = true;
  electronUpdater.autoUpdater.on("checking-for-update", () => log$1.info("checking for update"));
  electronUpdater.autoUpdater.on("update-available", (info) => {
    resetMacNativeStageState();
    updateFailurePrompted = false;
    log$1.info("update available", { update_version: updateLabel(info), info });
  });
  electronUpdater.autoUpdater.on("update-not-available", (info) => {
    log$1.info("update not available", { update_version: updateLabel(info), info });
    resumeAfterUpdateCheckOnce();
  });
  electronUpdater.autoUpdater.on("update-downloaded", (info) => handleUpdateDownloaded(info, nativeMacUpdater));
  nativeMacUpdater?.on("update-downloaded", promptAfterMacNativeUpdateStaged);
  electronUpdater.autoUpdater.on("error", handleUpdaterError);
  deliveryNative.app.once("before-quit", () => {
    appQuitting = true;
    if (updateCheckTimer) clearInterval(updateCheckTimer);
    updateCheckTimer = null;
    settleMacNativeStageState();
  });
  void correlatePreviousUpdateInstallAttempt().then(() => requestUpdateCheck(nativeMacUpdater)).catch((err) => {
    logError("initial update check setup failed", err);
    requestUpdateCheck(nativeMacUpdater);
  });
  updateCheckTimer = setInterval(
    () => requestUpdateCheck(nativeMacUpdater),
    UPDATE_CHECK_INTERVAL_MS
  );
}
const REFERRALS_BASE = process.env.BLUME_REFERRALS_URL ?? "https://referrals.blume-page.com";
const log = createAppLogger("main.referrals");
async function fetchWithTimeout(input) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), input.timeoutMs);
  try {
    return await fetch(input.url, {
      method: input.method,
      headers: input.headers,
      body: input.body,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}
const referralClient = createReferralClient({
  baseUrl: REFERRALS_BASE,
  getBlumeId: getOrCreateBlumeId,
  readLocalState: async () => await index$1.readBlumeJson("referral") ?? {},
  writeLocalState: (state) => index$1.writeBlumeJson("referral", state),
  hasAnyConversation: () => getStorage().desktopConversations.hasAnyConversation(),
  fetch: fetchWithTimeout,
  logger: log,
  capture: (event, properties) => void captureTelemetryEvent(event, properties)
});
async function getReferralLink() {
  return referralClient.getReferralLink();
}
async function getReferralStatus() {
  return referralClient.getReferralStatus();
}
function registerReferralsIpcHandlers(handleIpc2) {
  handleIpc2("referrals:getLink", () => getReferralLink());
  handleIpc2("referrals:getStatus", () => getReferralStatus());
}
async function claimInvite(code, cid) {
  return referralClient.claimInvite(code, cid);
}
async function maybeReportReferralActivation() {
  try {
    await referralClient.maybeReportActivation();
  } catch (err) {
    reportReferralBackgroundFailure("main.referral-activation", err, {
      logInfo: (message, properties) => log.info(message, properties),
      captureAppError: (source, error) => {
        void captureAppError(source, error);
      }
    });
  }
}
const usageStore = {
  insertAppUsageInterval: (interval) => getStorage().usage.insertAppUsageInterval(interval),
  listUnsentAppUsageIntervals: (limit) => getStorage().usage.listUnsentAppUsageIntervals(limit),
  markAppUsageIntervalSent: (id, sentAtMs) => getStorage().usage.markAppUsageIntervalSent(id, sentAtMs),
  sumAppUsageProcessRunningSeconds: () => getStorage().usage.sumAppUsageProcessRunningSeconds()
};
const tracker = new AppUsageHost({
  usage: usageStore,
  scheduler: {
    setInterval: (callback, ms) => setInterval(callback, ms),
    clearInterval: (handle) => clearInterval(handle)
  },
  power: {
    on: (event, listener) => {
      if (event === "suspend") {
        deliveryNative.powerMonitor.on("suspend", listener);
      } else {
        deliveryNative.powerMonitor.on("resume", listener);
      }
    },
    off: (event, listener) => {
      if (event === "suspend") {
        deliveryNative.powerMonitor.off("suspend", listener);
      } else {
        deliveryNative.powerMonitor.off("resume", listener);
      }
    }
  },
  telemetry: {
    isConfigured: isTelemetryConfigured,
    capture: captureTelemetryEvent
  },
  onInsertError(err) {
    void captureAppError("main.app-usage.insert", err).catch((telemetryErr) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[telemetry] failed to capture app-usage insert error:", telemetryErr);
      }
    });
  },
  onFlushError(err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[posthog] app usage flush failed:", err);
    }
  }
});
function startAppUsageTracking(win) {
  tracker.start(win);
  tracker.setProductAccessAvailable(false);
}
function stopAppUsageTracking() {
  tracker.stop();
}
function setAppUsageProductAccessAvailable(available) {
  tracker.setProductAccessAvailable(available);
}
function getTotalAppUsageProcessRunningSeconds() {
  return tracker.totalProcessRunningSeconds();
}
const MAX_ARTIFACT_SYNC_ITEMS_PER_REQUEST = 500;
async function artifactSyncSelection(value, resolveAllowedPath) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid artifact sync selection.");
  }
  const candidate = value;
  if (typeof candidate.enabled !== "boolean" || !Array.isArray(candidate.artifacts) || candidate.artifacts.length === 0 || candidate.artifacts.length > MAX_ARTIFACT_SYNC_ITEMS_PER_REQUEST || candidate.artifacts.some(
    (artifact) => !artifact || typeof artifact.id !== "string" || typeof artifact.name !== "string" || !artifact.source || artifact.source.type === "external" || typeof artifact.source.runtimePath !== "string" || artifact.source.runtimePath.length > 4096
  )) {
    throw new Error("Invalid artifact sync selection.");
  }
  const artifacts = [];
  for (const artifact of candidate.artifacts) {
    const source = artifact.source;
    const canonicalPath = source?.type === "external" ? null : await resolveAllowedPath(source?.runtimePath ?? "");
    if (!source || source.type === "external" || !canonicalPath) {
      throw new Error("Artifact sync source is outside the allowed setup roots.");
    }
    artifacts.push({ ...artifact, source: { ...source, runtimePath: canonicalPath } });
  }
  return { enabled: candidate.enabled, artifacts };
}
async function artifactSyncPlacement(value, resolveAllowedPath) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid artifact sync placement.");
  }
  const candidate = value;
  if (typeof candidate.artifactId !== "string" || candidate.artifactId.length > 200 || typeof candidate.runtimePath !== "string" || candidate.runtimePath.length === 0 || candidate.runtimePath.length > 4096 || !/^(?:\/|[A-Za-z]:[\\/])/.test(candidate.runtimePath)) {
    throw new Error("Invalid artifact sync placement.");
  }
  const canonicalPath = await resolveAllowedPath(candidate.runtimePath);
  if (!canonicalPath) {
    throw new Error("Artifact sync destination is outside the allowed setup roots.");
  }
  return { artifactId: candidate.artifactId, runtimePath: canonicalPath };
}
async function artifactSyncPreview(value, resolveAllowedPath) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid artifact sync preview request.");
  }
  const candidate = value;
  if (candidate.type === "enable" && Array.isArray(candidate.artifacts)) {
    const selection = await artifactSyncSelection(
      { artifacts: candidate.artifacts, enabled: true },
      resolveAllowedPath
    );
    return { type: "enable", artifacts: selection.artifacts };
  }
  if (candidate.type === "place" && candidate.placement) {
    return {
      type: "place",
      placement: await artifactSyncPlacement(candidate.placement, resolveAllowedPath)
    };
  }
  throw new Error("Invalid artifact sync preview request.");
}
function createSetupDesktopMainFacade(deps) {
  const setupUseCases = createSetupDesktopMainUseCases({
    getSetupStore: deps.getSetupStore,
    browser: {
      listHarnessSetup: () => deps.browser.listHarnessSetup(),
      readHarnessEntry: (path) => deps.browser.readHarnessEntry(path),
      writeHarnessEntry: (path, content, options) => deps.browser.writeHarnessEntry(path, content, options),
      writeProjectFile: (path, content, options) => deps.browser.writeProjectFile(path, content, options)
    }
  });
  const logStartupInstallError = deps.logStartupInstallError ?? ((message, err) => {
    console.error(message, err);
  });
  const handlers = [
    {
      channel: "devFormats:listRoots",
      handler: () => deps.browser.listDevFormatRoots()
    },
    {
      channel: "devFormats:listChildren",
      handler: (_evt, path) => deps.browser.listDevFormatChildren(path)
    },
    {
      channel: "devFormats:readFile",
      handler: (_evt, path) => deps.browser.readDevFormatFile(path)
    },
    {
      channel: "setup:list",
      handler: (_evt, query) => setupUseCases.list(query)
    },
    {
      channel: "setup:listVersions",
      handler: (_evt, artifactId) => setupUseCases.listVersions(artifactId)
    },
    {
      channel: "setup:getVersion",
      handler: (_evt, versionId) => setupUseCases.getVersion(versionId)
    },
    {
      channel: "setup:applyChange",
      handler: (_evt, change) => setupUseCases.applyChange(change)
    },
    {
      channel: "setup:undo",
      handler: (_evt, artifactId) => setupUseCases.undo(artifactId)
    },
    {
      channel: "setup:refresh",
      handler: async () => {
        await setupUseCases.refresh();
      }
    },
    {
      channel: "setup:listSyncStates",
      handler: (_evt, artifacts) => {
        if (artifacts !== void 0 && !Array.isArray(artifacts)) {
          throw new Error("Invalid artifact sync inventory.");
        }
        if (Array.isArray(artifacts) && artifacts.length > MAX_ARTIFACT_SYNC_ITEMS_PER_REQUEST) {
          throw new Error("Artifact sync inventory is too large.");
        }
        return deps.browser.listSyncStates(artifacts);
      }
    },
    {
      channel: "setup:previewSync",
      handler: async (_evt, request2, requestId2) => deps.browser.previewSync(
        await artifactSyncPreview(
          request2,
          (path) => deps.browser.resolveAllowedArtifactSyncPath(path)
        ),
        requestId2
      )
    },
    {
      channel: "setup:cancelPreviewSync",
      handler: (_evt, requestId2) => deps.browser.cancelPreviewSync(requestId2)
    },
    {
      channel: "setup:setSynced",
      handler: async (_evt, selection) => deps.browser.setSynced(
        await artifactSyncSelection(
          selection,
          (path) => deps.browser.resolveAllowedArtifactSyncPath(path)
        )
      )
    },
    {
      channel: "setup:placeSynced",
      handler: async (_evt, placement) => deps.browser.placeSynced(
        await artifactSyncPlacement(
          placement,
          (path) => deps.browser.resolveAllowedArtifactSyncPath(path)
        )
      )
    },
    {
      channel: "harnesses:listSetup",
      handler: () => deps.browser.listHarnessSetup()
    },
    {
      channel: "harnesses:readEntry",
      handler: (_evt, path) => deps.browser.readHarnessEntry(path)
    },
    {
      channel: "harnesses:writeEntry",
      handler: (_evt, path, content, options) => deps.browser.writeHarnessEntry(
        path,
        content,
        options
      )
    },
    {
      channel: "harnesses:scanProject",
      handler: async (_evt, path, requestId2, context) => {
        try {
          return {
            status: "ok",
            value: await deps.browser.scanProject(
              path,
              requestId2,
              context
            )
          };
        } catch (error) {
          if (isExpectedSetupIpcCancellation("harnesses:scanProject", error)) {
            return { status: "cancelled" };
          }
          throw error;
        }
      }
    },
    {
      channel: "harnesses:cancelProjectScan",
      handler: (_evt, requestId2) => deps.browser.cancelProjectScan(requestId2)
    },
    {
      channel: "harnesses:readProjectFile",
      handler: (_evt, path) => deps.browser.readProjectFile(path)
    },
    {
      channel: "harnesses:writeProjectFile",
      handler: (_evt, path, content, options) => deps.browser.writeProjectFile(
        path,
        content,
        options
      )
    },
    {
      channel: "harnesses:deleteArtifact",
      handler: (_evt, artifact) => deps.browser.deleteArtifact(artifact)
    }
  ];
  return {
    runStartupInstall() {
      if (shouldRunStartupInstall({ isDev: deps.isDev, devInstallEnv: deps.devInstallEnv() })) {
        void deps.installHost.runInstall().catch((err) => {
          logStartupInstallError("[blume] harness install failed:", err);
          void deps.captureAppError("main.harness-install", err);
        });
      }
    },
    handlers,
    registerIpcHandlers(handleIpc2) {
      for (const { channel, handler } of handlers) {
        handleIpc2(channel, handler);
      }
    }
  };
}
function createDesktopSetupFacade(deps) {
  const artifactSyncStatePath = () => pn.join(deps.blumeHome(), "artifact-sync.json");
  let artifactSyncRunning = false;
  const syncArtifacts = async () => {
    if (artifactSyncRunning) return;
    artifactSyncRunning = true;
    try {
      if (!await deps.isArtifactSyncEnabled()) return;
      const accessToken = await deps.getArtifactSyncAccessToken();
      await syncArtifactsInSetupWorker({
        statePath: artifactSyncStatePath(),
        accessToken,
        baseUrl: deps.artifactSyncUrl
      });
    } catch {
    } finally {
      artifactSyncRunning = false;
    }
  };
  const installHost = createInstallHost({
    currentAppVersion: deps.currentAppVersion,
    appPath: deps.appPath,
    resourcesPath: deps.resourcesPath,
    isDev: deps.isDev,
    blumeHome: deps.blumeHome,
    homeDir: require$$0$2.homedir,
    platform: () => process.platform,
    pid: () => process.pid,
    fs: {
      copy: (src, dest, options) => promises.cp(src, dest, options),
      async mkdir(path, options) {
        await promises.mkdir(path, options);
      },
      readTextFile: (path) => promises.readFile(path, "utf-8"),
      writeTextFile: (path, contents) => promises.writeFile(path, contents, "utf-8"),
      rename: promises.rename,
      removeFile: (path) => promises.rm(path, { force: true })
    },
    path: { dirname: pn.dirname, join: pn.join },
    now: () => /* @__PURE__ */ new Date()
  });
  const setupFacade = createSetupDesktopMainFacade({
    getSetupStore: deps.getSetupStore,
    browser: {
      listDevFormatRoots: () => setupScanProtocol.desktopSetupBrowserService.listDevFormatRoots(),
      listDevFormatChildren: (path) => setupScanProtocol.desktopSetupBrowserService.listDevFormatChildren(path),
      readDevFormatFile: (path) => setupScanProtocol.desktopSetupBrowserService.readDevFormatFile(path),
      listHarnessSetup: () => scanGlobalSetupInSetupWorker(),
      readHarnessEntry: (path) => setupScanProtocol.desktopSetupBrowserService.readHarnessEntry(path),
      writeHarnessEntry: (path, content, options) => setupScanProtocol.desktopSetupBrowserService.writeHarnessEntry(path, content, options),
      scanProject: async (path, requestId2, context) => {
        const scan = await scanProjectInSetupWorker(path, requestId2, context);
        if (!setupScanProtocol.desktopSetupBrowserService.isUnsafeScanRoot(scan.path)) {
          setupScanProtocol.desktopSetupBrowserService.registerProjectRoot(scan.path);
        }
        return scan;
      },
      cancelProjectScan: (requestId2) => cancelProjectSetupScan(requestId2),
      readProjectFile: (path) => setupScanProtocol.desktopSetupBrowserService.readProjectFile(path),
      writeProjectFile: (path, content, options) => setupScanProtocol.desktopSetupBrowserService.writeProjectFile(path, content, options),
      resolveAllowedArtifactSyncPath: (path) => setupScanProtocol.desktopSetupBrowserService.resolveAllowedArtifactSyncPath(path),
      deleteArtifact: (artifact) => deleteArtifactInSetupWorker(artifact),
      listSyncStates: async (artifacts) => {
        if (!await deps.isArtifactSyncEnabled()) return [];
        try {
          const accessToken = await deps.getArtifactSyncAccessToken();
          return await discoverArtifactSyncStatesInSetupWorker({
            statePath: artifactSyncStatePath(),
            accessToken,
            baseUrl: deps.artifactSyncUrl,
            availableArtifacts: artifacts ?? []
          });
        } catch (error) {
          if (isAccountAuthenticationRequired(error)) return [];
          return listArtifactSyncStatesInSetupWorker(
            artifactSyncStatePath(),
            artifacts?.map((artifact) => artifact.id),
            deps.artifactSyncUrl
          );
        }
      },
      previewSync: async (preview, requestId2) => {
        if (!await deps.isArtifactSyncEnabled()) throw new Error("Artifact sync is disabled.");
        const accessToken = await deps.getArtifactSyncAccessToken();
        return previewArtifactSyncInSetupWorker(
          {
            statePath: artifactSyncStatePath(),
            accessToken,
            baseUrl: deps.artifactSyncUrl,
            preview
          },
          requestId2
        );
      },
      cancelPreviewSync: (requestId2) => cancelArtifactSyncPreviewInSetupWorker(requestId2),
      setSynced: async (selection) => {
        if (!await deps.isArtifactSyncEnabled()) throw new Error("Artifact sync is disabled.");
        const accessToken = await deps.getArtifactSyncAccessToken();
        return setArtifactSyncedInSetupWorker({
          statePath: artifactSyncStatePath(),
          accessToken,
          baseUrl: deps.artifactSyncUrl,
          selection
        });
      },
      placeSynced: async (placement) => {
        if (!await deps.isArtifactSyncEnabled()) throw new Error("Artifact sync is disabled.");
        const accessToken = await deps.getArtifactSyncAccessToken();
        return placeArtifactSyncedInSetupWorker({
          statePath: artifactSyncStatePath(),
          accessToken,
          baseUrl: deps.artifactSyncUrl,
          placement
        });
      }
    },
    installHost,
    isDev: deps.isDev,
    devInstallEnv: deps.devInstallEnv,
    captureAppError: deps.captureAppError
  });
  return {
    runStartupInstall() {
      void syncArtifacts();
      const timer2 = setInterval(() => void syncArtifacts(), 6e4);
      timer2.unref();
      if (!deps.skipStartupInstall) setupFacade.runStartupInstall();
    },
    registerIpcHandlers(handleIpc2) {
      setupFacade.registerIpcHandlers((channel, listener) => {
        handleIpc2(channel, (event, ...args) => listener(event, ...args));
      });
    }
  };
}
function createSettingsIpcController({
  settings,
  terminal,
  launchAtLogin,
  runtime,
  secretSettingKeys = PROVIDER_USAGE_SECRET_SETTING_KEYS,
  onLaunchAtLoginError,
  onPublicSettingChanged,
  userAgentMcp: userAgentMcp2
}) {
  const secretKeys = new Set(secretSettingKeys);
  const appShellSettings = createAppShellSettingsUseCases({
    settings,
    launchAtLogin,
    isDev: runtime.isDev,
    allowLoginItemInDev: runtime.allowLoginItemInDev,
    forceOnboarding: runtime.forceOnboarding,
    onLaunchAtLoginError
  });
  const userAgentMcpSettings = createUserAgentMcpSettingsUseCases({
    settings: {
      getAsync: (key) => settings.getAsync(key),
      async setAsync(key, value) {
        await settings.setAsync(key, value);
        await onPublicSettingChanged?.(key, value);
      }
    },
    runtime: userAgentMcp2 ?? {
      supported: () => false,
      getLaunchSpec: () => ({ command: "", args: [] }),
      getSkillBundle: () => ({ name: "unavailable", displayName: "Unavailable", files: [] }),
      applyClientSetup: async () => {
        throw new Error("Blume MCP is unavailable in this runtime.");
      },
      unavailableReason: "Blume MCP is unavailable in this runtime."
    }
  });
  return {
    supportsLaunchAtLogin() {
      return appShellSettings.supportsLaunchAtLogin();
    },
    initializeLaunchAtLoginDefault() {
      appShellSettings.initializeLaunchAtLoginDefault();
    },
    adoptLegacyLaunchAtLoginMigration() {
      appShellSettings.adoptLegacyLaunchAtLoginMigration();
    },
    handlers: [
      {
        channel: "db:settings:all",
        handler: async () => projectPublicSettings(await settings.getAllAsync(), secretKeys)
      },
      {
        channel: "db:settings:get",
        handler: (_event, key) => {
          const settingKey = key;
          assertPublicSettingKey(settingKey, secretKeys);
          return settings.getAsync(settingKey);
        }
      },
      {
        channel: "db:settings:set",
        handler: async (_event, key, value) => {
          const settingKey = key;
          const settingValue = value;
          assertPublicSettingKey(settingKey, secretKeys);
          await settings.setAsync(settingKey, settingValue);
          await onPublicSettingChanged?.(settingKey, settingValue);
        }
      },
      {
        channel: "settings:getTerminal",
        handler: () => terminal.getPreference()
      },
      {
        channel: "settings:setTerminal",
        handler: (_event, app) => terminal.setPreference(app)
      },
      {
        channel: "onboarding:getState",
        handler: () => appShellSettings.getOnboardingState()
      },
      {
        channel: "onboarding:complete",
        handler: () => {
          appShellSettings.completeOnboarding();
        }
      },
      {
        channel: "settings:conversationParseDefault",
        handler: () => defaultConversationParseInterval()
      },
      {
        channel: "settings:getLaunchAtLogin",
        handler: () => appShellSettings.getLaunchAtLoginStatus()
      },
      {
        channel: "settings:setLaunchAtLogin",
        handler: (_event, enabled) => {
          if (typeof enabled !== "boolean") {
            throw new TypeError("Launch-at-login setting must be a boolean");
          }
          return appShellSettings.setLaunchAtLogin(enabled);
        }
      },
      {
        channel: "settings:openLaunchAtLoginSettings",
        handler: () => appShellSettings.openLaunchAtLoginSettings()
      },
      {
        channel: "settings:userAgentMcp:get",
        handler: () => userAgentMcpSettings.getSettings()
      },
      {
        channel: "settings:userAgentMcp:set",
        handler: (_event, patch) => userAgentMcpSettings.setSettings(patch ?? {})
      },
      {
        channel: "settings:userAgentMcp:applyClientSetup",
        handler: (_event, clientId) => userAgentMcpSettings.applyClientSetup(clientId)
      }
    ]
  };
}
function projectNativeLaunchAtLoginState(input) {
  if (input.platform === "darwin") {
    if (input.status === "requires-approval") return "requires-approval";
    if (input.status === "not-registered" || input.status === "not-found") return "disabled";
    return input.status === "enabled" || input.openAtLogin ? "enabled" : "disabled";
  }
  return input.openAtLogin && input.matchingLaunchItemEnabled !== false ? "enabled" : "disabled";
}
function getNativeLaunchAtLoginState() {
  if (process.platform === "darwin") {
    const settings2 = deliveryNative.app.getLoginItemSettings({ type: "mainAppService" });
    return projectNativeLaunchAtLoginState({
      platform: process.platform,
      openAtLogin: settings2.openAtLogin,
      status: settings2.status
    });
  }
  const settings = deliveryNative.app.getLoginItemSettings({ args: [index$1.LAUNCH_AT_LOGIN_ARG] });
  const matchingLaunchItem = settings.launchItems?.find(
    (item) => item.args.includes(index$1.LAUNCH_AT_LOGIN_ARG)
  );
  return projectNativeLaunchAtLoginState({
    platform: process.platform,
    openAtLogin: settings.openAtLogin,
    matchingLaunchItemEnabled: matchingLaunchItem?.enabled
  });
}
function setNativeLaunchAtLogin(enabled) {
  if (process.platform === "darwin") {
    deliveryNative.app.setLoginItemSettings({ openAtLogin: enabled, type: "mainAppService" });
    return;
  }
  deliveryNative.app.setLoginItemSettings({ openAtLogin: enabled, args: [index$1.LAUNCH_AT_LOGIN_ARG] });
}
async function openNativeLaunchAtLoginSettings() {
  if (process.platform === "darwin") {
    await deliveryNative.shell.openExternal("x-apple.systempreferences:com.apple.LoginItems-Settings.extension");
    return;
  }
  if (process.platform === "win32") await deliveryNative.shell.openExternal("ms-settings:startupapps");
}
function createDesktopSettingsIpcFacade(options = {}) {
  const settingsIpc = createSettingsIpcController({
    settings: {
      get: getSetting,
      set: setSetting,
      getAllAsync: getAllSettingsAsync,
      getAsync: getSettingAsync,
      setAsync: setSettingAsync
    },
    terminal: {
      getPreference: getTerminalPreference,
      setPreference: setTerminalPreference
    },
    launchAtLogin: {
      isSupported: () => process.platform === "darwin" || process.platform === "win32",
      getStatus: getNativeLaunchAtLoginState,
      setEnabled: setNativeLaunchAtLogin,
      openSettings: openNativeLaunchAtLoginSettings
    },
    runtime: {
      isDev: utils.is.dev,
      releaseChannel: index$1.appReleaseChannel(utils.is.dev),
      allowLoginItemInDev: () => process.env.BLUME_ALLOW_LOGIN_ITEM_IN_DEV === "1",
      forceOnboarding: process.env.BLUME_FORCE_ONBOARDING === "1"
    },
    onLaunchAtLoginError: (operation, err) => {
      if (operation === "apply") {
        console.error("[blume] failed to update launch-at-login setting:", err);
        void captureAppError("main.launch-at-login", err);
      } else if (operation === "status") {
        console.error("[blume] failed to read launch-at-login setting:", err);
        void captureAppError("main.launch-at-login-status", err);
      } else {
        console.error("[blume] failed to open launch-at-login settings:", err);
        void captureAppError("main.launch-at-login-settings", err);
      }
    },
    onPublicSettingChanged: async (key, value) => {
      if (key === POSTHOG_TRACKING_DISABLED_SETTING_KEY) {
        if (value === "true") await shutdownPosthogLogging();
        else initPosthogLogging();
      }
      await options.onPublicSettingChanged?.(key, value);
    }
  });
  return {
    supportsLaunchAtLogin() {
      return settingsIpc.supportsLaunchAtLogin();
    },
    initializeLaunchAtLoginDefault() {
      settingsIpc.initializeLaunchAtLoginDefault();
    },
    adoptLegacyLaunchAtLoginMigration() {
      settingsIpc.adoptLegacyLaunchAtLoginMigration();
    },
    registerIpcHandlers(handleIpc2) {
      for (const { channel, handler } of settingsIpc.handlers) {
        handleIpc2(channel, handler);
      }
    }
  };
}
const LEGACY_BLUME_TAURI_LABEL = "Blume Tauri";
const LEGACY_BLUME_TAURI_EXECUTABLE = "blume-desktop";
const LEGACY_BLUME_TAURI_PLIST = `${LEGACY_BLUME_TAURI_LABEL}.plist`;
const LEGACY_PLIST_MAX_BYTES = 64 * 1024;
const LEGACY_BOOTOUT_TIMEOUT_MS = 1500;
function legacyBlumeTauriLaunchAgentPath(homeDir = Nl.homedir()) {
  return _n.join(homeDir, "Library", "LaunchAgents", LEGACY_BLUME_TAURI_PLIST);
}
function isLegacyBlumeTauriLaunchAgent(contents) {
  return contents.includes(LEGACY_BLUME_TAURI_LABEL) && contents.includes(LEGACY_BLUME_TAURI_EXECUTABLE);
}
function defaultBootout(path, signal) {
  if (typeof process.getuid !== "function") return Promise.resolve();
  const uid = process.getuid();
  return new Promise((resolve) => {
    node_child_process.execFile(
      "launchctl",
      ["bootout", `gui/${uid}`, path],
      {
        signal,
        timeout: LEGACY_BOOTOUT_TIMEOUT_MS,
        killSignal: "SIGKILL",
        windowsHide: true,
        maxBuffer: 1024
      },
      () => resolve()
    );
  });
}
async function pathExists(path) {
  try {
    await require$$0$1.access(path);
    return true;
  } catch {
    return false;
  }
}
async function disabledPathFor(path, suffix) {
  const base = `${path}${suffix}`;
  if (!await pathExists(base)) return base;
  return `${base}.${Date.now()}`;
}
async function readLegacyPlist(path) {
  const handle = await require$$0$1.open(path, "r");
  try {
    const metadata = await handle.stat();
    if (metadata.size > LEGACY_PLIST_MAX_BYTES) return null;
    const buffer = Buffer.alloc(Math.max(1, metadata.size));
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    return buffer.subarray(0, bytesRead).toString("utf8");
  } finally {
    await handle.close();
  }
}
async function runBoundedBootout(bootout, path, timeoutMs) {
  const controller = new AbortController();
  let timer2;
  try {
    await Promise.race([
      bootout(path, controller.signal),
      new Promise((resolve) => {
        timer2 = setTimeout(() => {
          controller.abort();
          resolve();
        }, timeoutMs);
      })
    ]);
  } finally {
    if (timer2) clearTimeout(timer2);
    controller.abort();
  }
}
async function cleanupLegacyBlumeTauriLaunchAgent(options = {}) {
  const path = legacyBlumeTauriLaunchAgentPath(options.homeDir);
  const platform = options.platform ?? process.platform;
  if (platform !== "darwin") {
    return { cleaned: false, path, reason: "not-darwin" };
  }
  if (!await pathExists(path)) {
    return { cleaned: false, path, reason: "missing" };
  }
  try {
    const contents = await readLegacyPlist(path);
    if (contents === null) return { cleaned: false, path, reason: "too-large" };
    if (!isLegacyBlumeTauriLaunchAgent(contents)) {
      return { cleaned: false, path, reason: "not-legacy-blume-tauri" };
    }
    const bootout = options.bootout ?? defaultBootout;
    await runBoundedBootout(bootout, path, options.bootoutTimeoutMs ?? LEGACY_BOOTOUT_TIMEOUT_MS);
    const disabledPath = await disabledPathFor(path, options.disabledSuffix ?? ".disabled-by-blume");
    await require$$0$1.rename(path, disabledPath);
    return { cleaned: true, path, disabledPath };
  } catch (err) {
    return {
      cleaned: false,
      path,
      reason: "failed",
      errorMessage: err instanceof Error ? err.message : String(err)
    };
  }
}
async function fetchChatwootWidgetMessages(request2) {
  const fetchRequest = buildChatwootWidgetMessagesFetchRequest(request2);
  const response = await fetch(fetchRequest.url, {
    headers: fetchRequest.headers,
    signal: AbortSignal.timeout(1e4)
  });
  assertChatwootWidgetMessagesResponseOk(response);
  return response.json();
}
async function executeChatwootPost(request2) {
  const response = await fetch(request2.url, {
    method: request2.method,
    headers: request2.headers,
    body: request2.body,
    signal: AbortSignal.timeout(1e4)
  });
  assertChatwootWidgetMessagesResponseOk(response);
  return response.json();
}
async function fetchChatwootWidgetConfig(request2) {
  return executeChatwootPost(buildChatwootWidgetConfigFetchRequest(request2));
}
async function updateChatwootWidgetContact(request2) {
  return executeChatwootPost(buildChatwootWidgetContactUpdateFetchRequest(request2));
}
async function sendChatwootWidgetMessage(request2) {
  return executeChatwootPost(buildChatwootWidgetSendMessageFetchRequest(request2));
}
function allowedChatwootWebviewOrigins() {
  return projectAllowedChatwootWebviewOrigins([process.env.VITE_CHATWOOT_BASE_URL]);
}
function isAllowedChatwootWebviewUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return allowedChatwootWebviewOrigins().has(url.origin);
  } catch {
    return false;
  }
}
function hardenChatwootWebviewPreferences(webPreferences) {
  webPreferences.nodeIntegration = false;
  webPreferences.contextIsolation = true;
  webPreferences.sandbox = false;
  webPreferences.webSecurity = true;
  webPreferences.allowRunningInsecureContent = false;
  delete webPreferences.preload;
  delete webPreferences.preloadURL;
}
function registerChatwootIpcHandlers(handleIpc2) {
  handleIpc2("chatwoot:widgetConfig", (_evt, request2) => fetchChatwootWidgetConfig(request2));
  handleIpc2(
    "chatwoot:widgetContactUpdate",
    (_evt, request2) => updateChatwootWidgetContact(request2)
  );
  handleIpc2(
    "chatwoot:widgetMessages",
    (_evt, request2) => fetchChatwootWidgetMessages(request2)
  );
  handleIpc2(
    "chatwoot:widgetSendMessage",
    (_evt, request2) => sendChatwootWidgetMessage(request2)
  );
}
const WINDOW_BOUNDS_SETTING_KEY = "windowBounds";
const WINDOW_BOUNDS_SAVE_DELAY_MS = 400;
const FULL_WINDOW_SIZE = { width: 1440, height: 933 };
const E2E_CLOSE_AFTER_LOAD_ENV = "BLUME_E2E_CLOSE_AFTER_LOAD";
const EXTERNALLY_OPENABLE_PROTOCOLS = /* @__PURE__ */ new Set(["http:", "https:", "mailto:"]);
function suggestedImageFileName(srcURL) {
  if (srcURL.startsWith("blob:") || srcURL.startsWith("data:")) return "blume-wrapped.png";
  if (!URL.canParse(srcURL)) return "image.png";
  return _n.basename(new URL(srcURL).pathname) || "image.png";
}
function attachImageContextMenu(window) {
  window.webContents.on("context-menu", (_event, params) => {
    if (params.mediaType !== "image" || !params.srcURL) return;
    const contents = window.webContents;
    const reportAction = (action) => {
      if (contents.isDestroyed()) return;
      contents.send("app:image-context-menu-action", action);
    };
    const menu = deliveryNative.Menu.buildFromTemplate([
      {
        label: "Copy Image",
        click: () => {
          reportAction("copy_image");
          contents.copyImageAt(params.x, params.y);
        }
      },
      {
        label: "Save Image As…",
        click: () => {
          reportAction("save_image");
          const suggested = suggestedImageFileName(params.srcURL);
          contents.session.once("will-download", (_downloadEvent, item) => {
            const chosen = deliveryNative.dialog.showSaveDialogSync(window, {
              defaultPath: suggested
            });
            if (chosen) item.setSavePath(chosen);
            else item.cancel();
          });
          contents.downloadURL(params.srcURL);
        }
      }
    ]);
    menu.popup({ window });
  });
}
function isExternallyOpenableUrl(url) {
  try {
    return EXTERNALLY_OPENABLE_PROTOCOLS.has(new URL(url).protocol);
  } catch {
    return false;
  }
}
function isDevRendererNavigation(url, rendererUrl) {
  try {
    return new URL(url).origin === new URL(rendererUrl).origin;
  } catch {
    return false;
  }
}
function createDesktopNativeWindowFacade(deps) {
  let pendingDeepLinkPath = null;
  let pendingOpenConversationRef = null;
  let primaryWindow = null;
  let primaryWindowReadyToShow = false;
  let windowBoundsSaveTimer = null;
  function getPrimaryWindow() {
    if (primaryWindow && !primaryWindow.isDestroyed()) return primaryWindow;
    primaryWindow = null;
    return deliveryNative.BrowserWindow.getAllWindows().find((win) => !win.isDestroyed() && win.isVisible()) ?? null;
  }
  function deliverDeepLinkPath(path) {
    const win = getPrimaryWindow();
    if (!win || win.isDestroyed() || win.webContents.isDestroyed() || !primaryWindowReadyToShow) {
      pendingDeepLinkPath = path;
      return;
    }
    void revealWindow(win).then(() => {
      if (!win.isDestroyed() && !win.webContents.isDestroyed()) {
        win.webContents.send("app:deep-link", path);
      }
    });
  }
  function sendOpenConversationRef(ref) {
    const win = getPrimaryWindow();
    if (!win || win.isDestroyed() || win.webContents.isDestroyed() || !primaryWindowReadyToShow) {
      pendingOpenConversationRef = ref;
      return;
    }
    win.webContents.send("app:open-conversation", ref);
  }
  function keepAppInDock(win) {
    if (!win.isDestroyed()) win.setSkipTaskbar(false);
    if (process.platform === "darwin") {
      void deps.showDockIcon().catch((err) => {
        console.error("[blume] failed to show dock icon:", err);
        deps.captureAppError("main.dock-show", err);
      });
    }
  }
  function fitsInDisplayWorkArea(bounds) {
    return deliveryNative.screen.getAllDisplays().some(({ workArea }) => {
      return bounds.x >= workArea.x && bounds.y >= workArea.y && bounds.x + bounds.width <= workArea.x + workArea.width && bounds.y + bounds.height <= workArea.y + workArea.height;
    });
  }
  function savedWindowBounds() {
    try {
      const raw = deps.getSetting(WINDOW_BOUNDS_SETTING_KEY);
      if (!raw) return null;
      const value = JSON.parse(raw);
      const bounds = {
        x: Math.round(Number(value.x)),
        y: Math.round(Number(value.y)),
        width: Math.round(Number(value.width)),
        height: Math.round(Number(value.height))
      };
      if (!Object.values(bounds).every(Number.isFinite)) return null;
      return fitsInDisplayWorkArea(bounds) ? bounds : null;
    } catch {
      return null;
    }
  }
  function scheduleWindowBoundsSave(win) {
    if (windowBoundsSaveTimer) clearTimeout(windowBoundsSaveTimer);
    windowBoundsSaveTimer = setTimeout(() => {
      windowBoundsSaveTimer = null;
      if (win.isDestroyed() || win.isMinimized() || win.isFullScreen()) return;
      deps.setSetting(WINDOW_BOUNDS_SETTING_KEY, JSON.stringify(win.getNormalBounds()));
    }, WINDOW_BOUNDS_SAVE_DELAY_MS);
  }
  function wireDevToolsShortcut(win) {
    if (process.platform === "darwin") return;
    win.webContents.on("before-input-event", (event, input) => {
      if (input.type !== "keyDown") return;
      const key = input.key.toLowerCase();
      if (key === "f12" || input.control && input.shift && key === "i") {
        event.preventDefault();
        win.webContents.toggleDevTools();
      }
    });
  }
  function wirePreferencesShortcut(win) {
    win.webContents.on("before-input-event", (event, input) => {
      if (input.type !== "keyDown" || input.alt || input.shift || input.key !== ",") return;
      const usesPlatformModifier = process.platform === "darwin" ? input.meta && !input.control : input.control && !input.meta;
      if (!usesPlatformModifier) return;
      if (input.isAutoRepeat) return;
      event.preventDefault();
      void openPathFromNativeMenu("/settings");
    });
  }
  async function openPathFromNativeMenu(path) {
    const win = getPrimaryWindow();
    if (!win || win.isDestroyed() || win.webContents.isDestroyed()) {
      pendingDeepLinkPath = path;
      return;
    }
    await revealWindow(win);
    win.webContents.send("app:deep-link", path);
  }
  async function openConversationFromNativeMenu(ref) {
    const win = getPrimaryWindow();
    if (!win || win.isDestroyed() || win.webContents.isDestroyed()) {
      pendingDeepLinkPath = "/deliveries";
      pendingOpenConversationRef = ref;
      return;
    }
    await openPathFromNativeMenu("/deliveries");
    sendOpenConversationRef(ref);
  }
  function broadcast(channel, ...args) {
    for (const win of deliveryNative.BrowserWindow.getAllWindows()) {
      if (!win.isDestroyed() && !win.webContents.isDestroyed()) {
        win.webContents.send(channel, ...args);
      }
    }
  }
  async function revealWindow(win) {
    if (win.isDestroyed()) return;
    keepAppInDock(win);
    if (process.platform === "darwin") deps.focusApp({ steal: true });
    if (win.isMinimized()) win.restore();
    if (!win.isVisible()) win.show();
    win.focus();
  }
  function focusPrimaryWindow() {
    const win = getPrimaryWindow();
    if (!win || win.isDestroyed() || !primaryWindowReadyToShow) return;
    void revealWindow(win);
  }
  function hasWindows() {
    return getPrimaryWindow() !== null;
  }
  function destroyAllWindows() {
    let destroyed = 0;
    for (const win of deliveryNative.BrowserWindow.getAllWindows()) {
      if (win.isDestroyed()) continue;
      win.destroy();
      destroyed += 1;
    }
    return destroyed;
  }
  function prepareForQuit() {
    if (windowBoundsSaveTimer) {
      clearTimeout(windowBoundsSaveTimer);
      windowBoundsSaveTimer = null;
      const win = getPrimaryWindow();
      if (win && !win.isMinimized() && !win.isFullScreen()) {
        deps.setSetting(WINDOW_BOUNDS_SETTING_KEY, JSON.stringify(win.getNormalBounds()));
      }
    }
  }
  function createWindow(options = {}) {
    primaryWindowReadyToShow = false;
    const { workArea } = deliveryNative.screen.getPrimaryDisplay();
    const initialBounds = savedWindowBounds() ?? {
      width: Math.min(FULL_WINDOW_SIZE.width, workArea.width - 60),
      height: Math.min(FULL_WINDOW_SIZE.height, workArea.height)
    };
    const mainWindow = new deliveryNative.BrowserWindow({
      ...initialBounds,
      minWidth: 360,
      minHeight: 540,
      show: false,
      transparent: true,
      autoHideMenuBar: true,
      title: deps.appDisplayName,
      titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
      trafficLightPosition: process.platform === "darwin" ? { x: 16, y: 24 } : void 0,
      // A transparent window can't carry a native frame on Windows — Electron
      // would silently drop the caption buttons anyway. Make it explicitly
      // frameless and let the renderer draw its own minimize/close controls
      // (renderer/src/components/sidecar/WindowControls.tsx).
      frame: process.platform !== "win32",
      backgroundColor: "#00000000",
      icon: deps.appIcon,
      webPreferences: {
        preload: deps.preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false,
        webviewTag: true,
        // A native focus event below disables throttling before the renderer
        // needs its next frame. Keeping the default here lets Chromium suspend
        // decorative animation while the transparent window is unfocused.
        backgroundThrottling: true
      }
    });
    primaryWindow = mainWindow;
    attachImageContextMenu(mainWindow);
    keepAppInDock(mainWindow);
    mainWindow.on("ready-to-show", () => {
      primaryWindowReadyToShow = true;
      const shouldFocus = options.focusOnReady !== false || pendingDeepLinkPath !== null || pendingOpenConversationRef !== null;
      if (shouldFocus) {
        void revealWindow(mainWindow);
      } else {
        if (mainWindow.isMinimized()) mainWindow.restore();
        if (!mainWindow.isVisible()) mainWindow.showInactive();
      }
      if (pendingDeepLinkPath) {
        const path = pendingDeepLinkPath;
        pendingDeepLinkPath = null;
        deliverDeepLinkPath(path);
      }
      if (pendingOpenConversationRef) {
        const ref = pendingOpenConversationRef;
        pendingOpenConversationRef = null;
        sendOpenConversationRef(ref);
      }
    });
    mainWindow.on("close", (event) => {
      if (deps.isQuitting()) return;
      event.preventDefault();
      deps.requestQuit("window-close");
    });
    mainWindow.on("closed", () => {
      if (primaryWindow === mainWindow) primaryWindow = null;
      primaryWindowReadyToShow = false;
    });
    mainWindow.on("resize", () => scheduleWindowBoundsSave(mainWindow));
    mainWindow.on("move", () => scheduleWindowBoundsSave(mainWindow));
    mainWindow.on("focus", () => {
      if (!mainWindow.webContents.isDestroyed()) {
        mainWindow.webContents.setBackgroundThrottling(false);
      }
    });
    const restoreBackgroundThrottling = () => {
      if (!mainWindow.webContents.isDestroyed()) {
        mainWindow.webContents.setBackgroundThrottling(true);
      }
    };
    mainWindow.on("blur", restoreBackgroundThrottling);
    mainWindow.on("minimize", restoreBackgroundThrottling);
    mainWindow.on("hide", restoreBackgroundThrottling);
    const sendFullscreen = (value) => {
      if (!mainWindow.webContents.isDestroyed()) {
        mainWindow.webContents.send("window:fullscreen-changed", value);
      }
    };
    mainWindow.on("enter-full-screen", () => sendFullscreen(true));
    mainWindow.on("leave-full-screen", () => sendFullscreen(false));
    const openExternallyIfSafe = (url) => {
      if (!isExternallyOpenableUrl(url)) return;
      void deps.openExternal(url).catch(() => void 0);
    };
    mainWindow.webContents.setWindowOpenHandler((details) => {
      openExternallyIfSafe(details.url);
      return { action: "deny" };
    });
    mainWindow.webContents.on("will-navigate", (event, url) => {
      if (url === mainWindow.webContents.getURL()) return;
      if (deps.isDev && deps.rendererUrl && isDevRendererNavigation(url, deps.rendererUrl)) return;
      event.preventDefault();
      openExternallyIfSafe(url);
    });
    wireDevToolsShortcut(mainWindow);
    wirePreferencesShortcut(mainWindow);
    mainWindow.webContents.on("will-attach-webview", (event, webPreferences, params) => {
      if (!deps.isAllowedChatwootWebviewUrl(params.src)) {
        event.preventDefault();
        if (params.src) openExternallyIfSafe(params.src);
        return;
      }
      deps.hardenChatwootWebviewPreferences(webPreferences);
    });
    if (deps.isDev && deps.rendererUrl) {
      mainWindow.loadURL(deps.rendererUrl);
    } else {
      mainWindow.loadFile(deps.rendererFilePath);
    }
    mainWindow.webContents.once("did-finish-load", () => {
      if (pendingDeepLinkPath) {
        const path = pendingDeepLinkPath;
        pendingDeepLinkPath = null;
        deliverDeepLinkPath(path);
      }
      if (pendingOpenConversationRef) {
        const ref = pendingOpenConversationRef;
        pendingOpenConversationRef = null;
        sendOpenConversationRef(ref);
      }
      if (process.env[E2E_CLOSE_AFTER_LOAD_ENV] === "1") {
        mainWindow.close();
      }
    });
    return mainWindow;
  }
  function registerIpcHandlers(handleIpc2) {
    handleIpc2("window:isFullscreen", () => {
      const win = deliveryNative.BrowserWindow.getFocusedWindow() ?? deliveryNative.BrowserWindow.getAllWindows()[0];
      return win?.isFullScreen() ?? false;
    });
    handleIpc2("window:minimize", (evt) => {
      const win = deliveryNative.BrowserWindow.fromWebContents(evt.sender) ?? deliveryNative.BrowserWindow.getAllWindows()[0];
      if (win && !win.isDestroyed()) win.minimize();
    });
    handleIpc2("window:close", (evt) => {
      const win = deliveryNative.BrowserWindow.fromWebContents(evt.sender) ?? deliveryNative.BrowserWindow.getAllWindows()[0];
      if (win && !win.isDestroyed()) win.close();
    });
  }
  return {
    createWindow,
    registerIpcHandlers,
    deliverDeepLinkPath,
    openPathFromNativeMenu,
    openConversationFromNativeMenu,
    focusPrimaryWindow,
    hasWindows,
    destroyAllWindows,
    prepareForQuit,
    broadcast
  };
}
const MAX_DATA_URL_CHARS = 24e6;
const SHARE_FILE_PREFIX = "blume-share-";
const SHARE_FILE_LIFETIME_MS = 3e5;
const IMAGE_MIME_EXTENSIONS = /* @__PURE__ */ new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"]
]);
const IMAGE_EXPORT_TARGETS = /* @__PURE__ */ new Set(["original", "desktop", "phone", "tablet"]);
const MAX_SHARE_TITLE_CHARS = 120;
const MAX_SHARE_TEXT_CHARS = 2e3;
const MAX_SHARE_URL_CHARS = 2048;
function safeSuggestedName(value, extension) {
  const stem = value.replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9._-]+/gi, "-").replace(/^[.-]+|[.-]+$/g, "").slice(0, 100);
  return `${stem || "blume-image"}.${extension}`;
}
function parseImageExportRequest(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("Invalid image export request");
  }
  const value = input;
  if (typeof value.dataUrl !== "string" || value.dataUrl.length > MAX_DATA_URL_CHARS || typeof value.suggestedName !== "string" || typeof value.target !== "string" || !IMAGE_EXPORT_TARGETS.has(value.target)) {
    throw new TypeError("Invalid image export request");
  }
  const match = /^data:(image\/(?:png|jpeg|webp|svg\+xml))(?:;charset=[^;,]+)?(;base64)?,([\s\S]*)$/i.exec(
    value.dataUrl
  );
  if (!match) throw new TypeError("Unsupported image data");
  const mime = match[1].toLowerCase();
  const extension = IMAGE_MIME_EXTENSIONS.get(mime);
  if (!extension) throw new TypeError("Unsupported image data");
  let bytes;
  try {
    bytes = match[2] ? Buffer.from(match[3], "base64") : Buffer.from(decodeURIComponent(match[3]), "utf8");
  } catch {
    throw new TypeError("Invalid image data");
  }
  if (bytes.length === 0 || bytes.length > 16 * 1024 * 1024) {
    throw new TypeError("Image export is too large");
  }
  return {
    bytes,
    extension,
    suggestedName: safeSuggestedName(value.suggestedName, extension),
    target: value.target
  };
}
function parseShareTextRequest(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("Invalid text share request");
  }
  const value = input;
  if (typeof value.title !== "string" || !value.title.trim() || value.title.length > MAX_SHARE_TITLE_CHARS || typeof value.text !== "string" || !value.text.trim() || value.text.length > MAX_SHARE_TEXT_CHARS || typeof value.url !== "string" || !value.url.trim() || value.url.length > MAX_SHARE_URL_CHARS) {
    throw new TypeError("Invalid text share request");
  }
  let url;
  try {
    url = new URL(value.url);
  } catch {
    throw new TypeError("Invalid share URL");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new TypeError("Invalid share URL");
  }
  return { title: value.title.trim(), text: value.text.trim(), url: url.toString() };
}
function createDesktopNativeImageExportFacade() {
  const activeShareFiles = /* @__PURE__ */ new Set();
  const temporaryDirectory = deliveryNative.app.getPath("temp");
  const staleShareCleanup = require$$0$1.readdir(temporaryDirectory).then(
    (entries) => Promise.all(
      entries.map(async (entry) => {
        if (!entry.startsWith(SHARE_FILE_PREFIX)) return;
        const filePath = _n.join(temporaryDirectory, entry);
        const file = await require$$0$1.stat(filePath).catch(() => null);
        if (!file || Date.now() - file.mtimeMs < SHARE_FILE_LIFETIME_MS) return;
        await require$$0$1.unlink(filePath).catch(() => {
        });
      })
    )
  ).then(() => void 0).catch(() => {
  });
  const removeShareFile = async (filePath) => {
    activeShareFiles.delete(filePath);
    await require$$0$1.unlink(filePath).catch(() => {
    });
  };
  deliveryNative.app.once("will-quit", () => {
    for (const filePath of activeShareFiles) {
      try {
        fs.unlinkSync(filePath);
      } catch {
      }
    }
    activeShareFiles.clear();
  });
  return {
    registerIpcHandlers(handleIpc2) {
      handleIpc2("share:text", (event, input) => {
        const request2 = parseShareTextRequest(input);
        if (process.platform !== "darwin") return "unavailable";
        const owner = deliveryNative.BrowserWindow.fromWebContents(event.sender);
        const shareMenu = new deliveryNative.ShareMenu({
          texts: [request2.text],
          urls: [request2.url]
        });
        shareMenu.popup(owner ? { window: owner } : void 0);
        return "opened";
      });
      handleIpc2("image:export", async (event, input) => {
        const request2 = parseImageExportRequest(input);
        const owner = deliveryNative.BrowserWindow.fromWebContents(event.sender);
        if (process.platform === "darwin" && request2.target === "phone") {
          await staleShareCleanup;
          const temporaryPath = _n.join(
            temporaryDirectory,
            `${SHARE_FILE_PREFIX}${require$$0.randomUUID()}.${request2.extension}`
          );
          await require$$0$1.writeFile(temporaryPath, request2.bytes);
          activeShareFiles.add(temporaryPath);
          try {
            const shareMenu = new deliveryNative.ShareMenu({ filePaths: [temporaryPath] });
            shareMenu.popup(owner ? { window: owner } : void 0);
          } catch (error) {
            await removeShareFile(temporaryPath);
            throw error;
          }
          const cleanupTimer = setTimeout(
            () => void removeShareFile(temporaryPath),
            SHARE_FILE_LIFETIME_MS
          );
          cleanupTimer.unref();
          return;
        }
        const options = {
          defaultPath: _n.join(deliveryNative.app.getPath("downloads"), request2.suggestedName),
          filters: [
            { name: "Image", extensions: [request2.extension] },
            { name: "All Files", extensions: ["*"] }
          ]
        };
        const result = owner ? await deliveryNative.dialog.showSaveDialog(owner, options) : await deliveryNative.dialog.showSaveDialog(options);
        if (!result.canceled && result.filePath) {
          await require$$0$1.writeFile(result.filePath, request2.bytes);
        }
      });
    }
  };
}
const LINK_PREVIEW_IPC_CHANNEL = "linkPreview:capture";
const MAX_URL_CHARS = 2048;
function linkPreviewTarget(input) {
  if (typeof input !== "string" || input.length === 0 || input.length > MAX_URL_CHARS) return null;
  let url;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  if (isPrivateNetworkHost(url.hostname)) return null;
  url.hash = "";
  return url;
}
function isAllowedLinkPreviewNavigation(target, next) {
  let url;
  try {
    url = new URL(next);
  } catch {
    return false;
  }
  if (url.origin === target.origin) return true;
  return target.protocol === "http:" && url.protocol === "https:" && url.hostname === target.hostname && (url.port === "" || url.port === target.port);
}
function isAllowedLinkPreviewRequest(requestUrl) {
  let url;
  try {
    url = new URL(requestUrl);
  } catch {
    return false;
  }
  if (url.protocol === "data:" || url.protocol === "blob:") return true;
  if (!["http:", "https:", "ws:", "wss:"].includes(url.protocol)) return false;
  return !isPrivateNetworkHost(url.hostname);
}
function isPrivateNetworkHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  if (!host) return true;
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return true;
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (ipv4) return isPrivateIpv4(ipv4.slice(1).map(Number));
  if (!host.includes(":")) return false;
  if (host === "::" || host === "::1") return true;
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(host);
  if (mapped) return isPrivateIpv4(mapped[1].split(".").map(Number));
  const mappedHex = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(host);
  if (mappedHex) {
    const high = parseInt(mappedHex[1], 16);
    const low = parseInt(mappedHex[2], 16);
    return isPrivateIpv4([high >> 8, high & 255, low >> 8, low & 255]);
  }
  const first = parseInt(host.split(":")[0] || "0", 16);
  return (first & 65024) === 64512 || (first & 65472) === 65152;
}
function isPrivateIpv4([a, b]) {
  return a === 0 || a === 10 || a === 127 || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 168 || a >= 224;
}
function createPublicHostCheck(lookup, options = {}) {
  const ttlMs = options.ttlMs ?? 6e4;
  const maxEntries = options.maxEntries ?? 200;
  const now = options.now ?? Date.now;
  const answers = /* @__PURE__ */ new Map();
  return (hostname) => {
    const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
    if (isPrivateNetworkHost(host)) return Promise.resolve(false);
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":")) return Promise.resolve(true);
    const known = answers.get(host);
    if (known && now() - known.at < ttlMs) return known.value;
    const value = lookup(host).then(
      (addresses) => addresses.length > 0 && addresses.every(({ address }) => !isPrivateNetworkHost(address)),
      () => false
    );
    answers.delete(host);
    answers.set(host, { at: now(), value });
    while (answers.size > maxEntries) answers.delete(answers.keys().next().value);
    return value;
  };
}
function createLinkPreviewService(options) {
  const maxConcurrent = Math.max(1, options.maxConcurrent ?? 2);
  const maxQueued = Math.max(0, options.maxQueued ?? 12);
  const timeoutMs = options.timeoutMs ?? 1e4;
  const settleMs = options.settleMs ?? 750;
  const maxEntries = Math.max(1, options.maxEntries ?? 50);
  const ttlMs = options.ttlMs ?? 15 * 6e4;
  const failureTtlMs = options.failureTtlMs ?? 6e4;
  const now = options.now ?? Date.now;
  const setTimer = options.setTimer ?? ((callback, ms) => setTimeout(callback, ms));
  const clearTimer = options.clearTimer ?? ((timer2) => clearTimeout(timer2));
  const cache = /* @__PURE__ */ new Map();
  const inFlight = /* @__PURE__ */ new Map();
  const waiting = [];
  let active2 = 0;
  function cached2(key) {
    const entry = cache.get(key);
    if (!entry) return void 0;
    cache.delete(key);
    if (entry.expiresAt <= now()) return void 0;
    cache.set(key, entry);
    return entry;
  }
  function remember(key, value) {
    cache.delete(key);
    cache.set(key, { value, expiresAt: now() + (value ? ttlMs : failureTtlMs) });
    while (cache.size > maxEntries) {
      const oldest = cache.keys().next().value;
      if (oldest === void 0) break;
      cache.delete(oldest);
    }
  }
  async function withSlot(run) {
    if (active2 >= maxConcurrent) await new Promise((resolve) => waiting.push(resolve));
    active2 += 1;
    try {
      return await run();
    } finally {
      active2 -= 1;
      waiting.shift()?.();
    }
  }
  function wait2(ms) {
    return new Promise((resolve) => setTimer(resolve, ms));
  }
  async function captureOnce(target) {
    let page;
    let timer2;
    let finished = false;
    try {
      const work = (async () => {
        if (options.isPublicHost && !await options.isPublicHost(target.hostname)) return null;
        if (finished) return null;
        page = options.openPage(target);
        await page.load();
        await wait2(settleMs);
        if (finished) return null;
        return page.capture();
      })().catch(() => null);
      const timeout = new Promise((resolve) => {
        timer2 = setTimer(() => resolve(null), timeoutMs);
      });
      const image = await Promise.race([work, timeout]);
      return typeof image === "string" && image.startsWith("data:image/") ? { image } : null;
    } catch {
      return null;
    } finally {
      finished = true;
      if (timer2 !== void 0) clearTimer(timer2);
      try {
        page?.destroy();
      } catch {
      }
    }
  }
  return {
    preview(input) {
      const target = linkPreviewTarget(input);
      if (!target) return Promise.resolve(null);
      const key = target.href;
      const hit = cached2(key);
      if (hit) return Promise.resolve(hit.value);
      const pending2 = inFlight.get(key);
      if (pending2) return pending2;
      if (active2 >= maxConcurrent && waiting.length >= maxQueued) return Promise.resolve(null);
      const request2 = withSlot(() => captureOnce(target)).then((value) => {
        remember(key, value);
        return value;
      });
      inFlight.set(key, request2);
      void request2.finally(() => inFlight.delete(key));
      return request2;
    }
  };
}
const PARTITION = "blume-link-preview";
const VIEWPORT = { width: 1280, height: 800 };
const THUMBNAIL_WIDTH = 480;
const JPEG_QUALITY = 72;
let previewSession = null;
const isPublicHost = createPublicHostCheck((hostname) => require$$1$1.promises.lookup(hostname, { all: true }));
let openPages = 0;
const previewContents = /* @__PURE__ */ new WeakSet();
function isLinkPreviewContents(contents) {
  return previewContents.has(contents);
}
function linkPreviewSession() {
  if (previewSession) return previewSession;
  const ses = deliveryNative.session.fromPartition(PARTITION, { cache: false });
  ses.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  ses.setPermissionCheckHandler(() => false);
  ses.setDevicePermissionHandler(() => false);
  ses.on("will-download", (event, item) => {
    event.preventDefault();
    item.cancel();
  });
  ses.webRequest.onBeforeRequest((details, callback) => {
    if (!isAllowedLinkPreviewRequest(details.url)) return callback({ cancel: true });
    let hostname;
    try {
      hostname = new URL(details.url).hostname;
    } catch {
      return callback({ cancel: true });
    }
    if (!hostname) return callback({ cancel: false });
    void isPublicHost(hostname).then((ok) => callback({ cancel: !ok }));
  });
  const appName = deliveryNative.app.getName().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  ses.setUserAgent(
    deliveryNative.app.userAgentFallback.replace(new RegExp(`\\s+(?:Electron|${appName})\\/\\S+`, "gi"), "")
  );
  previewSession = ses;
  return ses;
}
function clearSessionWhenIdle(ses) {
  if (openPages > 0) return;
  void ses.clearStorageData().catch(() => {
  });
}
function openLinkPreviewPage(target) {
  const ses = linkPreviewSession();
  const win = new deliveryNative.BrowserWindow({
    show: false,
    width: VIEWPORT.width,
    height: VIEWPORT.height,
    useContentSize: true,
    frame: false,
    focusable: false,
    skipTaskbar: true,
    webPreferences: {
      session: ses,
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInSubFrames: false,
      nodeIntegrationInWorker: false,
      javascript: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      webviewTag: false,
      devTools: false,
      disableDialogs: true,
      navigateOnDragDrop: false,
      spellcheck: false,
      // Hidden windows are throttled by default; a page still hydrating would never paint.
      backgroundThrottling: false
    }
  });
  openPages += 1;
  const contents = win.webContents;
  previewContents.add(contents);
  contents.on("render-process-gone", () => {
    if (!win.isDestroyed()) win.destroy();
  });
  contents.setAudioMuted(true);
  contents.setWindowOpenHandler(() => ({ action: "deny" }));
  contents.on("will-attach-webview", (event) => event.preventDefault());
  contents.on("will-navigate", (event) => {
    if (!isAllowedLinkPreviewNavigation(target, event.url)) event.preventDefault();
  });
  contents.on("will-redirect", (event) => {
    if (event.isMainFrame && !isAllowedLinkPreviewNavigation(target, event.url)) {
      event.preventDefault();
    }
  });
  let status = 0;
  contents.on("did-navigate", (_event, _url, httpResponseCode) => {
    status = httpResponseCode;
  });
  let destroyed = false;
  const closed = new Promise((_resolve, reject) => {
    win.once("closed", () => {
      destroyed = true;
      openPages = Math.max(0, openPages - 1);
      clearSessionWhenIdle(ses);
      reject(new Error("link preview window closed"));
    });
  });
  closed.catch(() => {
  });
  return {
    async load() {
      await Promise.race([contents.loadURL(target.href), closed]);
      if (status >= 400) throw new Error(`link preview page answered ${status}`);
    },
    async capture() {
      if (destroyed || contents.isDestroyed()) return null;
      const image = await Promise.race([
        contents.capturePage(void 0, { stayHidden: true }),
        closed
      ]);
      if (image.isEmpty()) return null;
      const thumbnail = image.resize({ width: THUMBNAIL_WIDTH, quality: "good" });
      return `data:image/jpeg;base64,${thumbnail.toJPEG(JPEG_QUALITY).toString("base64")}`;
    },
    destroy() {
      if (!destroyed && !win.isDestroyed()) win.destroy();
    }
  };
}
function createDesktopLinkPreviewFacade() {
  const service2 = createLinkPreviewService({ openPage: openLinkPreviewPage, isPublicHost });
  return {
    registerIpcHandlers(handleIpc2) {
      handleIpc2(LINK_PREVIEW_IPC_CHANNEL, (_event, url) => service2.preview(url));
    }
  };
}
const LOCAL_LINK_IPC_CHANNEL = "localLink:running";
function connectOnce(host, port, timeoutMs) {
  return new Promise((resolve) => {
    const socket = require$$1$2.createConnection({ host, port });
    const done = (running) => {
      socket.destroy();
      resolve(running);
    };
    socket.setTimeout(timeoutMs, () => done(false));
    socket.once("connect", () => done(true));
    socket.once("error", () => done(false));
  });
}
function createLocalLinkProbe({
  connect = connectOnce,
  timeoutMs = 1500,
  maxInFlight = 4
} = {}) {
  const inFlight = /* @__PURE__ */ new Map();
  return {
    /** `null` for anything that is not a page on this computer. */
    running(input) {
      const url = loopbackLink(input);
      if (!url) return Promise.resolve(null);
      const name = url.hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
      const host = name.endsWith(".localhost") ? "127.0.0.1" : name;
      const port = loopbackPort(url);
      const key = `${host}:${port}`;
      const pending2 = inFlight.get(key);
      if (pending2) return pending2;
      if (inFlight.size >= maxInFlight) return Promise.resolve(null);
      const check = connect(host, port, timeoutMs).finally(() => inFlight.delete(key));
      inFlight.set(key, check);
      return check;
    }
  };
}
const MENU_BAR_POPOVER_WIDTH = 300;
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function harnessGlyph(className, labelValue, colorValue, dataUrl) {
  const color = escapeHtml(colorValue);
  const label = escapeHtml(labelValue);
  if (!dataUrl) {
    return `<span class="${className} harness-letter" style="color:${color}" role="img" aria-label="${label}">${escapeHtml(labelValue.slice(0, 1).toUpperCase())}</span>`;
  }
  const url = escapeHtml(dataUrl);
  const mask = `-webkit-mask-image:url(&quot;${url}&quot;);mask-image:url(&quot;${url}&quot;)`;
  return `<span class="${className}" style="background-color:${color};${mask}" role="img" aria-label="${label}"></span>`;
}
function actionIcon(kind) {
  if (kind === "open") {
    return '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M2 6h12"/></svg>';
  }
  if (kind === "preferences") {
    return '<svg viewBox="0 0 24 24" style="stroke-width:2" aria-hidden="true"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>';
  }
  {
    return '<svg viewBox="0 0 24 24" style="stroke-width:2" aria-hidden="true"><path d="M12 2v10"/><path d="M18.36 6.64a9 9 0 1 1-12.72 0"/></svg>';
  }
}
function actionRow(href, label, icon2, shortcut = "") {
  const iconHtml = icon2 ? `<span class="action-icon">${actionIcon(icon2)}</span>` : '<span class="action-icon" aria-hidden="true"></span>';
  return `<a class="action" href="${href}">${iconHtml}<span>${escapeHtml(label)}</span>${shortcut ? `<kbd>${escapeHtml(shortcut)}</kbd>` : ""}</a>`;
}
function statusIndicator(state, color) {
  const style = `style="color:${escapeHtml(color)}"`;
  if (state === "running") {
    return `<svg class="status status-spinner" viewBox="0 0 12 12" ${style} aria-label="running"><circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="23.28 6.57"/></svg>`;
  }
  if (state === "finished" || state === "idle") {
    return `<svg class="status" viewBox="0 0 12 12" ${style} aria-label="${escapeHtml(state)}"><path d="M1.5 6 L 4.7 9.3 L 9.4 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  if (state === "failed") {
    return `<svg class="status" viewBox="0 0 12 12" ${style} aria-label="failed"><path d="M2.85 2.85 L 9.15 9.15 M 9.15 2.85 L 2.85 9.15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  }
  const ping = state === "needs-approval" ? '<span class="status-ping"></span>' : "";
  return `<span class="status status-dot" ${style} aria-label="${escapeHtml(state)}">${ping}<span></span></span>`;
}
function conversationRow(conversation) {
  const href = `blume-menu://conversation?ref=${encodeURIComponent(conversation.ref)}`;
  return `<a class="conversation" href="${href}" title="${escapeHtml(conversation.title)}">
    ${statusIndicator(conversation.state, conversation.statusColor)}
    <span class="conversation-title">${escapeHtml(conversation.title)}</span>
    ${harnessGlyph("source", conversation.source, conversation.harnessColor, conversation.harnessIconDataUrl)}
  </a>`;
}
function providerGlyph(provider) {
  return harnessGlyph(
    "provider-glyph",
    provider.provider,
    provider.harnessColor,
    provider.harnessIconDataUrl
  );
}
function usageProviderRow(provider) {
  const href = `blume-menu://usage?provider=${encodeURIComponent(provider.provider)}`;
  const windows = provider.windows.map((window) => {
    const remaining = Math.round(Math.min(100, Math.max(0, window.remainingPercent)));
    const detail = `${remaining}% remaining${window.resetText ? ` · ${window.resetText}` : ""}`;
    const reset = window.resetText ? `<span class="usage-window-reset"> · ${escapeHtml(window.resetText)}</span>` : "";
    return `<div class="usage-window">
        <span class="usage-window-label">${escapeHtml(window.label)}${reset}</span>
        <span class="usage-track" role="img" aria-label="${escapeHtml(detail)}"><span style="width:${remaining}%"></span></span>
        <span class="usage-window-value">${remaining}%</span>
      </div>`;
  }).join("");
  return `<a class="usage-provider" href="${href}">
    <div class="provider-header">${providerGlyph(provider)}<strong>${escapeHtml(provider.label)}</strong></div>
    ${windows}
  </a>`;
}
function createMenuBarPopoverHtml(model) {
  const actions = [
    actionRow("blume-menu://open", `Open ${model.appDisplayName}`, "open"),
    actionRow("blume-menu://preferences", "Preferences…", "preferences", "⌘,")
  ].join("");
  const conversationRows = model.conversations.length > 0 ? model.conversations.map(conversationRow).join("") : '<div class="empty">No active conversations</div>';
  const hiddenConversations = model.hiddenConversationCount > 0 ? '<div class="more">More…</div>' : "";
  const conversations = model.showConversations ? `<div class="separator"></div><div class="section-title">Active Conversations</div>${conversationRows}${hiddenConversations}` : "";
  const usage = model.showUsage && model.usage.length > 0 ? `<div class="separator"></div><div class="section-title">Usage</div>${model.usage.map(usageProviderRow).join("")}` : "";
  return `<!doctype html>
<html class="${model.dark ? "dark" : "light"}"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline';">
<meta name="color-scheme" content="${model.dark ? "dark" : "light"}">
<style>
  *{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;color:var(--text);user-select:none;-webkit-user-select:none}
  html{--text:#24211d;--muted:#817b70;--section:#746e64;--hover:rgba(120,105,88,.13);--border:rgba(65,58,49,.28);--panel:rgba(247,243,235,.86);--track:#d7d0c2;--fill:#969187;color-scheme:light}
  html.dark{--text:#f3f1ed;--muted:#b0aaa0;--section:#aaa49a;--hover:rgba(255,255,255,.10);--border:rgba(255,255,255,.20);--panel:rgba(50,49,47,.82);--track:#4b4740;--fill:#aaa59a;color-scheme:dark}
  body{width:${MENU_BAR_POPOVER_WIDTH}px;padding:7px;background:var(--panel);overflow-x:hidden;overflow-y:auto}
  .panel{width:100%}
  a{color:inherit;text-decoration:none;outline:none}.action,.conversation,.usage-provider{border-radius:6px}.action:hover,.action:focus-visible,.conversation:hover,.conversation:focus-visible,.usage-provider:hover,.usage-provider:focus-visible{background:var(--hover)}
  .action{height:31px;display:grid;grid-template-columns:20px minmax(0,1fr) auto;align-items:center;gap:7px;padding:0 7px;font-size:14px}
  .action-icon{width:16px;height:16px;display:grid;place-items:center}.action-icon svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.action-icon svg path:last-child:not(:first-child){fill:none}
  kbd{font:12px -apple-system,BlinkMacSystemFont,"SF Pro Text",sans-serif;color:var(--muted);background:none;border:0;padding:0}
  .separator{width:100%;height:1px;background:var(--border);margin:7px 0}
  .section-title{height:24px;display:flex;align-items:center;padding:0 7px;font-size:13px;font-weight:600;color:var(--section)}
  .conversation{width:100%;height:31px;display:grid;grid-template-columns:12px minmax(0,1fr) 16px;align-items:center;gap:8px;padding:0 7px;font-size:14px}
  .status{width:12px;height:12px;display:block;flex:none}.status-spinner{animation:status-spin 1.8s linear infinite}.status-dot{position:relative}.status-dot>span{position:absolute;inset:.5px;border-radius:50%;background:currentColor}.status-dot>.status-ping{animation:status-ping 1.5s cubic-bezier(0,0,.2,1) infinite;opacity:.6}.conversation-title{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .source{width:10px;height:10px;display:grid;place-items:center;justify-self:end}.source,.provider-glyph{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain}.harness-letter{font-size:8px;font-weight:700;line-height:1;background:none}.source.harness-letter{font-size:6px}
  .empty,.more{height:29px;display:flex;align-items:center;padding:0 7px;color:var(--muted);font-size:13px}.more{font-weight:600}
  .usage-provider{display:block;width:100%;padding:4px 7px 6px}.provider-header{height:20px;display:flex;align-items:center;gap:7px;font-size:13px}.provider-header strong{font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .provider-glyph{width:12px;height:12px;flex:none;display:grid;place-items:center}
  .usage-window{min-height:25px;display:grid;grid-template-columns:minmax(0,1fr) 30px;grid-template-rows:minmax(15px,auto) 4px;align-items:end;column-gap:8px;row-gap:2px;padding:1px 0 3px 21px}
  .usage-window-label{grid-column:1;grid-row:1;min-width:0;font-size:11px;line-height:15px;color:var(--muted);white-space:normal;overflow-wrap:anywhere}.usage-window-reset{opacity:.75}
  .usage-track{grid-column:1/-1;grid-row:2;height:4px;border-radius:2px;background:var(--track);overflow:hidden}.usage-track span{display:block;height:100%;border-radius:inherit;background:var(--fill)}
  .usage-window-value{grid-column:2;grid-row:1;align-self:end;font-size:11px;line-height:15px;color:var(--section);text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}
  .quit{margin-top:1px}
  @keyframes status-spin{to{transform:rotate(360deg)}}@keyframes status-ping{75%,100%{transform:scale(1.8);opacity:0}}@media(prefers-reduced-motion:reduce){.status-spinner,.status-ping{animation:none}}
  body[data-motion=paused] *,body[data-motion=paused] *::before,body[data-motion=paused] *::after{animation-play-state:paused!important}
</style></head><body data-motion="paused"><main class="panel">${actions}${conversations}${usage}<div class="separator"></div><div class="quit">${actionRow("blume-menu://quit", `Quit ${model.appDisplayName}`, "quit", "⌘Q")}</div></main></body></html>`;
}
const TRAY_RENDER_FONT_FAMILY = "IBM Plex Mono";
function createTrayRasterFontOptions(fontFiles) {
  return {
    loadSystemFonts: false,
    fontFiles,
    defaultFontFamily: TRAY_RENDER_FONT_FAMILY,
    sansSerifFamily: TRAY_RENDER_FONT_FAMILY
  };
}
const DATA_TEXT_HTML_MARKER = "data:text/html";
const BLUME_MENU_PROTOCOL_MARKER = "blume-menu://";
const BLUME_MENU_PROTOCOL = "blume-menu:";
const CHROMIUM_LOADING_URL_PATTERN = /loading\s+'([^']+)'/i;
const LEGACY_TRAY_ICON_RENDERER_TITLE = "Blume tray icon renderer";
const MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE = "Menu bar popover load timed out";
const TRANSIENT_CHROMIUM_LOAD_FAILURE_MARKERS = [
  "ERR_FAILED",
  "ERR_ABORTED",
  "ERR_CONNECTION_CLOSED",
  "ERR_CONNECTION_RESET",
  "ERR_EMPTY_RESPONSE"
];
const MAX_SUMMARY_LENGTH = 200;
function errorMessage$1(error) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return String(error);
}
function summarizeMenuBarPopoverLoadErrorMessage(message) {
  const preservedMarkers = [
    ...TRANSIENT_CHROMIUM_LOAD_FAILURE_MARKERS,
    "Object has been destroyed",
    LEGACY_TRAY_ICON_RENDERER_TITLE,
    MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE,
    BLUME_MENU_PROTOCOL_MARKER
  ].filter((marker) => message.includes(marker));
  let summary = message.replace(/data:text\/html[^'"]*/gi, "data:text/html;<redacted>");
  for (const marker of preservedMarkers) {
    if (!summary.includes(marker)) {
      summary = `${summary} [${marker}]`;
    }
  }
  if (summary.length <= MAX_SUMMARY_LENGTH) return summary;
  return `${summary.slice(0, MAX_SUMMARY_LENGTH - 1)}…`;
}
function involvesMenuBarDataUrlDocument(message) {
  return message.includes(DATA_TEXT_HTML_MARKER) || message.includes(LEGACY_TRAY_ICON_RENDERER_TITLE);
}
function extractChromiumLoadingUrl(message) {
  const match = CHROMIUM_LOADING_URL_PATTERN.exec(message);
  const url = match?.[1];
  return url && url.length > 0 ? url : null;
}
function involvesMenuBarBlumeMenuProtocol(message) {
  const loadingUrl = extractChromiumLoadingUrl(message);
  if (!loadingUrl) return false;
  try {
    return new URL(loadingUrl).protocol === BLUME_MENU_PROTOCOL;
  } catch {
    return false;
  }
}
function isTransientChromiumDataUrlLoadFailure(message) {
  if (!involvesMenuBarDataUrlDocument(message)) return false;
  if (TRANSIENT_CHROMIUM_LOAD_FAILURE_MARKERS.some((marker) => message.includes(marker))) {
    return true;
  }
  return message.includes("Object has been destroyed");
}
function isTransientChromiumBlumeMenuLoadFailure(message) {
  if (!involvesMenuBarBlumeMenuProtocol(message)) return false;
  if (TRANSIENT_CHROMIUM_LOAD_FAILURE_MARKERS.some((marker) => message.includes(marker))) {
    return true;
  }
  return message.includes("Object has been destroyed");
}
function isExpectedMenuBarDataUrlLoadFailure(error) {
  return isTransientChromiumDataUrlLoadFailure(errorMessage$1(error));
}
function isExpectedMenuBarBlumeMenuLoadFailure(error) {
  return isTransientChromiumBlumeMenuLoadFailure(errorMessage$1(error));
}
function isExpectedMenuBarPopoverLoadTimeout(error) {
  return errorMessage$1(error) === MENU_BAR_POPOVER_LOAD_TIMEOUT_MESSAGE;
}
function isExpectedMenuBarPopoverLoadFailure(error) {
  return isExpectedMenuBarDataUrlLoadFailure(error) || isExpectedMenuBarBlumeMenuLoadFailure(error) || isExpectedMenuBarPopoverLoadTimeout(error);
}
function shouldCaptureMenuBarPopoverLoadAppError(error) {
  return !isExpectedMenuBarPopoverLoadFailure(error);
}
function reportMenuBarPopoverLoadFailure(source, error, deps) {
  if (!shouldCaptureMenuBarPopoverLoadAppError(error)) {
    const message = errorMessage$1(error);
    const logMessage = isExpectedMenuBarPopoverLoadTimeout(error) ? "expected menu bar popover load timeout" : isExpectedMenuBarBlumeMenuLoadFailure(error) ? "expected menu bar blume-menu protocol load abort" : "expected menu bar data URL load failure";
    deps.logInfo(logMessage, {
      source,
      error_name: error instanceof Error ? error.name : typeof error,
      error_message: summarizeMenuBarPopoverLoadErrorMessage(message),
      reporting_action: "local_log_only"
    });
    return;
  }
  deps.captureAppError(source, error);
}
const THEME_FLOWER_SETTING_KEY = "theme.flower";
const DEFAULT_TRAY_FLOWER = "bluebell";
const TRAY_FLOWER_ACCENT_COLORS = {
  bluebell: "#9172f8",
  forgetmenot: "#75b7fb",
  tulip: "#e73c30",
  sunflower: "#f4a300",
  lantana: "#ff7f50",
  daylily: "#ff8c00"
};
const MENU_BAR_USAGE_REFRESH_MS = 5 * 6e4;
const MENU_BAR_POPOVER_HOVER_PRELOAD_DELAY_MS = 100;
const MENU_BAR_POPOVER_WARM_RETENTION_MS = 2e4;
const MENU_BAR_POPOVER_OPERATION_TIMEOUT_MS = 5e3;
const TRAY_SEPARATOR_WIDTH = 1;
const TRAY_SEPARATOR_HEIGHT = 8;
const TRAY_SEPARATOR_GAP = 4;
const TRAY_STATUS_ORDER = ["running", "waiting", "finished"];
const MENU_BAR_STATUS_COUNTER_SETTING_KEYS = {
  running: MENU_BAR_SHOW_RUNNING_STATUS_SETTING_KEY,
  waiting: MENU_BAR_SHOW_WAITING_STATUS_SETTING_KEY,
  finished: MENU_BAR_SHOW_FINISHED_STATUS_SETTING_KEY
};
const MENU_BAR_USAGE_PROVIDER_SETTING_KEYS = {
  cursor: MENU_BAR_SHOW_CURSOR_USAGE_SETTING_KEY,
  claude: MENU_BAR_SHOW_CLAUDE_USAGE_SETTING_KEY,
  codex: MENU_BAR_SHOW_CODEX_USAGE_SETTING_KEY
};
function readBooleanSetting(getSetting2, key, defaultValue) {
  const value = getSetting2(key);
  if (value === null) return defaultValue;
  return value === "true";
}
function fallbackColor(value) {
  const hex = /^#([0-9a-f]{6})$/i.exec(value);
  if (hex) {
    const parsed = Number.parseInt(hex[1], 16);
    return { r: parsed >> 16, g: parsed >> 8 & 255, b: parsed & 255, a: 255 };
  }
  const rgba = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/.exec(value);
  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: Math.round((rgba[4] === void 0 ? 1 : Number(rgba[4])) * 255)
    };
  }
  return { r: 0, g: 0, b: 0, a: 255 };
}
function createFallbackRasterCanvas(width, height, scale) {
  return {
    width,
    height,
    scale,
    pixels: new Uint8Array(Math.ceil(width * scale) * Math.ceil(height * scale) * 4)
  };
}
function paintFallbackPixel(canvas, x, y, color) {
  const width = Math.ceil(canvas.width * canvas.scale);
  if (x < 0 || y < 0 || x >= width || y >= Math.ceil(canvas.height * canvas.scale)) return;
  const offset = (y * width + x) * 4;
  canvas.pixels[offset] = color.r;
  canvas.pixels[offset + 1] = color.g;
  canvas.pixels[offset + 2] = color.b;
  canvas.pixels[offset + 3] = color.a;
}
function drawFallbackDisc(canvas, cx, cy, radius, color) {
  const scale = canvas.scale;
  for (let y = Math.floor((cy - radius) * scale); y <= Math.ceil((cy + radius) * scale); y++) {
    for (let x = Math.floor((cx - radius) * scale); x <= Math.ceil((cx + radius) * scale); x++) {
      if (Math.hypot((x + 0.5) / scale - cx, (y + 0.5) / scale - cy) <= radius) {
        paintFallbackPixel(canvas, x, y, color);
      }
    }
  }
}
function drawFallbackRing(canvas, cx, cy, radius, width, color, progress = 1) {
  const scale = canvas.scale;
  for (let y = Math.floor((cy - radius - width) * scale); y <= Math.ceil((cy + radius + width) * scale); y++) {
    for (let x = Math.floor((cx - radius - width) * scale); x <= Math.ceil((cx + radius + width) * scale); x++) {
      const dx = (x + 0.5) / scale - cx;
      const dy = (y + 0.5) / scale - cy;
      const distance = Math.hypot(dx, dy);
      const angle = (Math.atan2(dy, dx) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
      if (Math.abs(distance - radius) <= width / 2 && angle <= Math.PI * 2 * progress) {
        paintFallbackPixel(canvas, x, y, color);
      }
    }
  }
}
function drawFallbackLine(canvas, x1, y1, x2, y2, width, color) {
  const steps = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) * canvas.scale));
  for (let step = 0; step <= steps; step++) {
    const progress = step / steps;
    drawFallbackDisc(canvas, x1 + (x2 - x1) * progress, y1 + (y2 - y1) * progress, width / 2, color);
  }
}
function drawFallbackLabel(canvas, label, x, y, color) {
  const glyphs = {
    "0": ["111", "101", "101", "101", "111"],
    "1": ["010", "110", "010", "010", "111"],
    "2": ["111", "001", "111", "100", "111"],
    "3": ["111", "001", "111", "001", "111"],
    "4": ["101", "101", "111", "001", "001"],
    "5": ["111", "100", "111", "001", "111"],
    "6": ["111", "100", "111", "101", "111"],
    "7": ["111", "001", "010", "010", "010"],
    "8": ["111", "101", "111", "101", "111"],
    "9": ["111", "101", "111", "001", "111"],
    "+": ["010", "010", "111", "010", "010"]
  };
  let cursor = x;
  for (const character of label) {
    const glyph = glyphs[character];
    if (!glyph) continue;
    for (let row = 0; row < glyph.length; row++) {
      for (let column = 0; column < glyph[row].length; column++) {
        if (glyph[row][column] === "1")
          drawFallbackDisc(canvas, cursor + column, y + row, 0.55, color);
      }
    }
    cursor += 4;
  }
}
function fallbackTrayIconWidth(payload) {
  let width = payload.flowerSize;
  if (payload.counters.length > 0) {
    width += TRAY_SEPARATOR_GAP * 2 + TRAY_SEPARATOR_WIDTH;
    width += (payload.counters.length - 1) * (payload.statusItemWidth + payload.counterGap) + payload.statusCircleSize;
  }
  if (payload.usageIndicators.length > 0) {
    width += payload.counters.length > 0 ? TRAY_SEPARATOR_GAP * 2 + TRAY_SEPARATOR_WIDTH : payload.statusGap;
    width += payload.usageIndicators.length * payload.statusCircleSize + Math.max(0, payload.usageIndicators.length - 1) * payload.counterGap;
  }
  return Math.ceil(width + 1);
}
function createFallbackMenuBarPng(payload) {
  const canvas = createFallbackRasterCanvas(
    fallbackTrayIconWidth(payload),
    payload.height,
    payload.scale
  );
  const flowerInk = fallbackColor(payload.flowerInk);
  const separator = fallbackColor(
    payload.colored ? "rgba(255, 255, 255, 0.26)" : "rgba(0, 0, 0, 0.28)"
  );
  const flowerX = payload.flowerSize / 2;
  const flowerY = payload.flowerY + payload.flowerSize / 2;
  for (let index2 = 0; index2 < 5; index2++) {
    const angle = Math.PI * 2 * index2 / 5 - Math.PI / 2;
    drawFallbackDisc(
      canvas,
      flowerX + Math.cos(angle) * 4.5,
      flowerY + Math.sin(angle) * 4.5,
      4,
      flowerInk
    );
  }
  drawFallbackDisc(canvas, flowerX, flowerY, 3, flowerInk);
  const drawSeparator = (x2) => {
    for (let y = (payload.height - TRAY_SEPARATOR_HEIGHT) / 2; y < (payload.height + TRAY_SEPARATOR_HEIGHT) / 2; y++) {
      drawFallbackLine(canvas, x2, y, x2 + TRAY_SEPARATOR_WIDTH, y, 1, separator);
    }
  };
  let x = payload.flowerSize;
  if (payload.counters.length > 0) {
    x += TRAY_SEPARATOR_GAP;
    drawSeparator(x);
    x += TRAY_SEPARATOR_WIDTH + TRAY_SEPARATOR_GAP;
  } else if (payload.usageIndicators.length > 0) {
    x += payload.statusGap;
  }
  for (const [index2, counter] of payload.counters.entries()) {
    const centerX = x + payload.statusCircleSize / 2;
    const centerY = payload.height / 2;
    const accent = fallbackColor(
      payload.colored ? payload.statusColors[counter.status] : payload.monoInk
    );
    if (payload.colored && payload.statusIndicatorsFilled) {
      drawFallbackDisc(
        canvas,
        centerX,
        centerY,
        payload.statusCircleSize / 2,
        fallbackColor(payload.statusFillColors[counter.status])
      );
    }
    drawFallbackRing(canvas, centerX, centerY, payload.statusCircleSize / 2 - 0.75, 1.05, accent);
    if (counter.status === "waiting") drawFallbackDisc(canvas, centerX, centerY, 1.55, accent);
    else if (counter.status === "finished") {
      drawFallbackLine(canvas, centerX - 3, centerY, centerX - 1, centerY + 2, 1.05, accent);
      drawFallbackLine(canvas, centerX - 1, centerY + 2, centerX + 3, centerY - 3, 1.05, accent);
    } else {
      drawFallbackRing(canvas, centerX, centerY, 3.05, 1.05, accent, 0.78);
    }
    const badgeWidth = Math.max(
      payload.statusBadgeMinWidth,
      counter.label.length * 4 + payload.statusBadgePaddingX * 2
    );
    const badgeX = x + payload.statusCircleSize - payload.statusBadgeOverhang;
    const badgeY = centerY - payload.statusCircleSize / 2 - 1;
    drawFallbackDisc(
      canvas,
      badgeX + badgeWidth / 2,
      badgeY + payload.statusBadgeHeight / 2,
      payload.statusBadgeHeight / 2,
      accent
    );
    drawFallbackLabel(canvas, counter.label, badgeX + 1.5, badgeY + 1, fallbackColor("#ffffff"));
    x += index2 === payload.counters.length - 1 ? payload.statusCircleSize : payload.statusItemWidth + payload.counterGap;
  }
  if (payload.counters.length > 0 && payload.usageIndicators.length > 0) {
    x += TRAY_SEPARATOR_GAP;
    drawSeparator(x);
    x += TRAY_SEPARATOR_WIDTH + TRAY_SEPARATOR_GAP;
  }
  for (const [index2, indicator] of payload.usageIndicators.entries()) {
    const centerX = x + payload.statusCircleSize / 2;
    const centerY = payload.height / 2;
    const accent = fallbackColor(payload.usageColors[indicator.provider]);
    const backdrop = fallbackColor(payload.usageBackdropColors[indicator.provider]);
    if (payload.colored)
      drawFallbackDisc(canvas, centerX, centerY, payload.statusCircleSize / 2, backdrop);
    drawFallbackRing(canvas, centerX, centerY, payload.statusCircleSize / 2 - 0.6, 1.15, backdrop);
    drawFallbackRing(
      canvas,
      centerX,
      centerY,
      payload.statusCircleSize / 2 - 0.6,
      1.15,
      accent,
      Math.max(0, Math.min(100, indicator.remainingPercent)) / 100
    );
    x += payload.statusCircleSize + (index2 === payload.usageIndicators.length - 1 ? 0 : payload.counterGap);
  }
  const width = Math.ceil(canvas.width * canvas.scale);
  const height = Math.ceil(canvas.height * canvas.scale);
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    const target = y * (width * 4 + 1);
    raw[target] = 0;
    Buffer.from(canvas.pixels).copy(raw, target + 1, y * width * 4, (y + 1) * width * 4);
  }
  const chunk = (type, data) => {
    const header2 = Buffer.alloc(8);
    header2.writeUInt32BE(data.length, 0);
    header2.write(type, 4, 4, "ascii");
    const crc = Buffer.alloc(4);
    let value = 4294967295;
    for (const byte of Buffer.concat([Buffer.from(type), data])) {
      value ^= byte;
      for (let bit = 0; bit < 8; bit++) value = value >>> 1 ^ (value & 1 ? 3988292384 : 0);
    }
    crc.writeUInt32BE((value ^ 4294967295) >>> 0, 0);
    return Buffer.concat([header2, data, crc]);
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0))
  ]);
}
function assetDataUrl(assetPath, mimeType) {
  try {
    return `data:${mimeType};base64,${un.readFileSync(assetPath).toString("base64")}`;
  } catch {
    return null;
  }
}
function readTrayFlower(getSetting2, flowerAssets2) {
  const raw = getSetting2(THEME_FLOWER_SETTING_KEY);
  return raw && Object.prototype.hasOwnProperty.call(flowerAssets2, raw) ? raw : DEFAULT_TRAY_FLOWER;
}
function resizeTrayImage(image) {
  if (image.isEmpty()) return image;
  return image.resize({ width: 18, height: 18, quality: "best" });
}
function menuBarActionDisplayName(appDisplayName) {
  return appDisplayName.split(/\s+[–—-]\s+/, 1)[0]?.trim() || "Blume";
}
function createDesktopNativeMenuBarStatusFacade(deps) {
  let tray = null;
  let popoverWindow = null;
  let popoverRenderId = 0;
  let renderedPopoverHtml = null;
  let renderedPopoverHeight = 400;
  let latestPopoverModel = null;
  let latestConversationProjection = {
    rows: [],
    totalConversationCount: 0,
    counts: { running: 0, waiting: 0, finished: 0 }
  };
  let popoverRenderInFlight = null;
  let popoverRenderPending = false;
  let popoverShowPending = false;
  let popoverHoverPreloadTimer = null;
  let popoverWarmRetentionTimer = null;
  let syncId = 0;
  let updateInFlight = null;
  let updatePending = false;
  let updatePendingConversationRefresh = false;
  let conversationProjectionFailureLogged = false;
  let iconRenderId = 0;
  let iconRenderInFlight = false;
  let iconRenderPending = false;
  let iconRenderFailureLogged = false;
  let iconAnimationFrame = 0;
  let iconAnimationTimer = null;
  let iconFrameCache = null;
  let popoverFocusTimer = null;
  let iconCounts = null;
  let menuOpen = false;
  let harnessIconDataUrls = null;
  let trayFlowerDataUrlCache = null;
  let usageReport = null;
  let usageRefreshInFlight = null;
  let usageRefreshTimer = null;
  let nativeThemeListenerInstalled = false;
  function readMenuBarEnabled() {
    return deps.getSetting(MENU_BAR_ENABLED_SETTING_KEY) !== "false";
  }
  function readMenuBarStatusIndicatorsColored() {
    return readBooleanSetting(deps.getSetting, MENU_BAR_STATUS_INDICATORS_COLORED_SETTING_KEY, true);
  }
  function readMenuBarStatusIndicatorsFilled() {
    return deps.getSetting(MENU_BAR_STATUS_INDICATOR_STYLE_SETTING_KEY) !== "bordered";
  }
  function readMenuBarShowStatusCounter(status) {
    const value = deps.getSetting(MENU_BAR_STATUS_COUNTER_SETTING_KEYS[status]);
    if (value !== null) return value !== "false";
    return deps.getSetting(MENU_BAR_SHOW_STATUS_SETTING_KEY) !== "false";
  }
  function readMenuBarShowConversations() {
    return deps.getSetting(MENU_BAR_SHOW_CONVERSATIONS_SETTING_KEY) !== "false";
  }
  function readMenuBarShowUsageProvider(provider) {
    const value = deps.getSetting(MENU_BAR_USAGE_PROVIDER_SETTING_KEYS[provider]);
    if (value !== null) return value !== "false";
    return deps.getSetting(MENU_BAR_SHOW_USAGE_SETTING_KEY) !== "false";
  }
  function readMenuBarShowUsage() {
    return evidencePins.MENU_BAR_USAGE_PROVIDER_ORDER.some(readMenuBarShowUsageProvider);
  }
  function readMenuBarShowUsageInDropdown() {
    return deps.getSetting(MENU_BAR_SHOW_USAGE_IN_DROPDOWN_SETTING_KEY) !== "false" && readMenuBarShowUsage();
  }
  function isMenuBarUsageSettingKey(key) {
    return key === MENU_BAR_SHOW_USAGE_SETTING_KEY || key === MENU_BAR_SHOW_USAGE_IN_DROPDOWN_SETTING_KEY || Object.values(MENU_BAR_USAGE_PROVIDER_SETTING_KEYS).includes(key);
  }
  function runningAccentColor() {
    return TRAY_FLOWER_ACCENT_COLORS[readTrayFlower(deps.getSetting, deps.flowerAssets)];
  }
  function projectCurrentMenuBarUsage() {
    return evidencePins.projectMenuBarUsage(
      usageReport,
      evidencePins.MENU_BAR_USAGE_PROVIDER_ORDER.filter(readMenuBarShowUsageProvider)
    );
  }
  function usageIndicatorsForRender() {
    if (!readMenuBarShowUsage()) return [];
    return projectCurrentMenuBarUsage().indicators.map(({ provider, remainingPercent }) => ({
      provider,
      remainingPercent
    }));
  }
  function visibleStatusCounts(counts) {
    return TRAY_STATUS_ORDER.reduce(
      (visible, status) => {
        visible[status] = readMenuBarShowStatusCounter(status) ? counts[status] : 0;
        return visible;
      },
      { running: 0, waiting: 0, finished: 0 }
    );
  }
  function createTrayImage() {
    const flower = readTrayFlower(deps.getSetting, deps.flowerAssets);
    const image = deliveryNative.nativeImage.createFromPath(deps.flowerAssets[flower]);
    const resized = resizeTrayImage(
      image.isEmpty() ? deliveryNative.nativeImage.createFromPath(deps.appIcon) : image
    );
    resized.setTemplateImage(!readMenuBarStatusIndicatorsColored());
    return resized;
  }
  function getTrayFlowerDataUrl() {
    const flower = readTrayFlower(deps.getSetting, deps.flowerAssets);
    if (trayFlowerDataUrlCache?.flower === flower) return trayFlowerDataUrlCache.dataUrl;
    const image = deliveryNative.nativeImage.createFromPath(deps.flowerAssets[flower]);
    const dataUrl = image.isEmpty() ? null : image.resize({
      width: Math.round(evidencePins.TRAY_FLOWER_SIZE * evidencePins.TRAY_IMAGE_SCALE),
      height: Math.round(evidencePins.TRAY_FLOWER_SIZE * evidencePins.TRAY_IMAGE_SCALE),
      quality: "best"
    }).toDataURL();
    trayFlowerDataUrlCache = { flower, dataUrl };
    return dataUrl;
  }
  function getHarnessIconDataUrls() {
    if (harnessIconDataUrls) return harnessIconDataUrls;
    harnessIconDataUrls = {};
    for (const [source, assetPath] of Object.entries(deps.harnessIconAssets)) {
      if (!assetPath) {
        harnessIconDataUrls[source] = null;
        continue;
      }
      harnessIconDataUrls[source] = assetDataUrl(assetPath, "image/svg+xml");
    }
    return harnessIconDataUrls;
  }
  function stopPopoverFocusTimer() {
    if (!popoverFocusTimer) return;
    clearInterval(popoverFocusTimer);
    popoverFocusTimer = null;
  }
  function cancelPopoverHoverPreload() {
    if (!popoverHoverPreloadTimer) return;
    clearTimeout(popoverHoverPreloadTimer);
    popoverHoverPreloadTimer = null;
  }
  function cancelPopoverWarmRetention() {
    if (!popoverWarmRetentionTimer) return;
    clearTimeout(popoverWarmRetentionTimer);
    popoverWarmRetentionTimer = null;
  }
  function destroyWarmPopover() {
    if (!popoverWindow || popoverWindow.isDestroyed() || popoverWindow.isVisible()) return;
    popoverRenderId += 1;
    popoverWindow.destroy();
    popoverWindow = null;
    renderedPopoverHtml = null;
  }
  function schedulePopoverWarmTeardown() {
    cancelPopoverWarmRetention();
    if (!popoverWindow || popoverWindow.isDestroyed() || popoverWindow.isVisible()) return;
    popoverWarmRetentionTimer = setTimeout(() => {
      popoverWarmRetentionTimer = null;
      destroyWarmPopover();
    }, MENU_BAR_POPOVER_WARM_RETENTION_MS);
    popoverWarmRetentionTimer.unref?.();
  }
  function setPopoverMotion(window, running) {
    if (window.isDestroyed()) return;
    void window.webContents.executeJavaScript(
      `document.body.dataset.motion = ${running ? "'running'" : "'paused'"}`,
      true
    ).catch(() => void 0);
  }
  function hidePopover() {
    stopPopoverFocusTimer();
    if (!popoverWindow || popoverWindow.isDestroyed() || !popoverWindow.isVisible()) return;
    setPopoverMotion(popoverWindow, false);
    popoverWindow.hide();
    menuOpen = false;
    if (iconCounts) renderMenuBarIcon(iconCounts);
    schedulePopoverWarmTeardown();
  }
  function showPopover(window) {
    cancelPopoverWarmRetention();
    menuOpen = true;
    window.show();
    window.focus();
    setPopoverMotion(window, true);
    stopPopoverFocusTimer();
    const shownAt = Date.now();
    popoverFocusTimer = setInterval(() => {
      if (window.isDestroyed() || !window.isVisible()) {
        stopPopoverFocusTimer();
        return;
      }
      if (Date.now() - shownAt >= 250 && (!deliveryNative.app.isActive() || !window.isFocused())) hidePopover();
    }, 100);
    popoverFocusTimer.unref();
  }
  function handleNativeThemeUpdated() {
    if (!tray) return;
    void update().catch((err) => deps.captureAppError("main.menu-bar-theme", err));
  }
  function installNativeThemeListener() {
    if (nativeThemeListenerInstalled) return;
    deliveryNative.nativeTheme.on("updated", handleNativeThemeUpdated);
    nativeThemeListenerInstalled = true;
  }
  function removeNativeThemeListener() {
    if (!nativeThemeListenerInstalled) return;
    deliveryNative.nativeTheme.removeListener("updated", handleNativeThemeUpdated);
    nativeThemeListenerInstalled = false;
  }
  function handlePopoverAction(url) {
    const action = new URL(url);
    hidePopover();
    switch (action.hostname) {
      case "open":
        deps.nativeWindow.focusPrimaryWindow();
        return;
      case "preferences":
        void deps.nativeWindow.openPathFromNativeMenu("/settings");
        return;
      case "quit":
        deps.requestQuit("menu-bar-popover");
        return;
      case "conversation": {
        const ref = action.searchParams.get("ref");
        if (ref) void deps.nativeWindow.openConversationFromNativeMenu(ref);
        return;
      }
      case "usage": {
        const provider = action.searchParams.get("provider");
        if (provider && evidencePins.MENU_BAR_USAGE_PROVIDER_ORDER.includes(provider)) {
          void deps.nativeWindow.openPathFromNativeMenu("/settings/usage");
        }
      }
    }
  }
  function getPopoverWindow() {
    if (popoverWindow && !popoverWindow.isDestroyed()) return popoverWindow;
    const window = new deliveryNative.BrowserWindow({
      width: MENU_BAR_POPOVER_WIDTH,
      height: 1,
      show: false,
      frame: false,
      transparent: true,
      backgroundColor: "#00000000",
      vibrancy: "menu",
      visualEffectState: "active",
      roundedCorners: true,
      hasShadow: true,
      resizable: false,
      movable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      skipTaskbar: true,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true
      }
    });
    popoverWindow = window;
    window.setAlwaysOnTop(true, "pop-up-menu");
    window.setVisibleOnAllWorkspaces(true, {
      visibleOnFullScreen: true,
      skipTransformProcessType: true
    });
    window.on("blur", hidePopover);
    window.on("closed", () => {
      if (popoverWindow === window) {
        stopPopoverFocusTimer();
        popoverWindow = null;
        renderedPopoverHtml = null;
        popoverShowPending = false;
      }
    });
    window.webContents.on("will-navigate", (event, url) => {
      if (!url.startsWith("blume-menu://")) return;
      event.preventDefault();
      handlePopoverAction(url);
    });
    window.webContents.on("before-input-event", (event, input) => {
      if (input.type !== "keyDown") return;
      if (input.key === "Escape") {
        event.preventDefault();
        hidePopover();
        return;
      }
      if (input.meta && !input.control && !input.alt && input.key === ",") {
        event.preventDefault();
        handlePopoverAction("blume-menu://preferences");
      }
    });
    window.webContents.on("render-process-gone", () => {
      if (!window.isDestroyed()) window.destroy();
    });
    window.webContents.on("unresponsive", () => {
      if (!window.isDestroyed()) window.destroy();
    });
    return window;
  }
  function positionPopover(window, height) {
    if (!tray) return;
    const trayBounds = tray.getBounds();
    const display = deliveryNative.screen.getDisplayNearestPoint({
      x: Math.round(trayBounds.x + trayBounds.width / 2),
      y: Math.round(trayBounds.y + trayBounds.height / 2)
    });
    const workArea = display.workArea;
    const width = MENU_BAR_POPOVER_WIDTH;
    const boundedHeight = Math.min(height, Math.max(120, workArea.height - 16));
    const idealX = Math.round(trayBounds.x + trayBounds.width / 2 - width / 2);
    const x = Math.min(Math.max(idealX, workArea.x + 4), workArea.x + workArea.width - width - 4);
    const belowY = Math.round(trayBounds.y + trayBounds.height + 4);
    const y = belowY + boundedHeight <= workArea.y + workArea.height ? belowY : Math.max(workArea.y + 4, Math.round(trayBounds.y - boundedHeight - 4));
    window.setBounds({ x, y, width, height: boundedHeight }, false);
  }
  async function withPopoverOperationTimeout(window, operation, task) {
    let timeout = null;
    try {
      return await Promise.race([
        task,
        new Promise((_resolve, reject) => {
          timeout = setTimeout(() => {
            if (!window.isDestroyed()) window.destroy();
            reject(new Error(`Menu bar popover ${operation} timed out`));
          }, MENU_BAR_POPOVER_OPERATION_TIMEOUT_MS);
          timeout.unref?.();
        })
      ]);
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }
  async function renderPopoverOnce() {
    const model = latestPopoverModel;
    if (!model || !tray) return;
    const window = getPopoverWindow();
    const html = createMenuBarPopoverHtml(model);
    if (renderedPopoverHtml === html) {
      positionPopover(window, renderedPopoverHeight);
      return;
    }
    const renderId = ++popoverRenderId;
    try {
      await withPopoverOperationTimeout(
        window,
        "load",
        window.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`)
      );
    } catch (err) {
      if (renderId !== popoverRenderId) return;
      throw err;
    }
    if (renderId !== popoverRenderId || window.isDestroyed()) return;
    let measuredHeight = renderedPopoverHeight;
    try {
      measuredHeight = await withPopoverOperationTimeout(
        window,
        "height measurement",
        window.webContents.executeJavaScript(
          `(() => {
            const panel = document.querySelector('.panel')
            const bodyStyle = getComputedStyle(document.body)
            return Math.ceil(
              (panel?.scrollHeight ?? 0) +
                Number.parseFloat(bodyStyle.paddingTop) +
                Number.parseFloat(bodyStyle.paddingBottom)
            )
          })()`,
          true
        )
      );
    } catch (err) {
      deps.captureAppError("main.menu-bar-popover-height", err);
    }
    if (renderId !== popoverRenderId || window.isDestroyed()) return;
    renderedPopoverHtml = html;
    if (window.isVisible()) setPopoverMotion(window, true);
    if (typeof measuredHeight === "number" && Number.isFinite(measuredHeight) && measuredHeight > 0) {
      renderedPopoverHeight = measuredHeight;
    }
    positionPopover(window, renderedPopoverHeight);
  }
  function preparePopover(showAfterRender) {
    if (showAfterRender) popoverShowPending = true;
    if (popoverRenderInFlight) {
      popoverRenderPending = true;
      return popoverRenderInFlight.then(() => {
        if (!popoverRenderPending || !tray) return;
        return preparePopover(false);
      });
    }
    const run = (async () => {
      try {
        do {
          popoverRenderPending = false;
          await renderPopoverOnce();
        } while (popoverRenderPending && tray);
      } catch (error) {
        popoverShowPending = false;
        throw error;
      }
      if (!popoverShowPending) return;
      if (!latestPopoverModel) return;
      if (!popoverWindow || popoverWindow.isDestroyed() || !tray) {
        popoverShowPending = false;
        return;
      }
      popoverShowPending = false;
      showPopover(popoverWindow);
    })();
    const completion = run.finally(() => {
      if (popoverRenderInFlight === completion) popoverRenderInFlight = null;
    });
    popoverRenderInFlight = completion;
    return completion;
  }
  function preloadPopoverOnHover() {
    cancelPopoverWarmRetention();
    if (popoverWindow?.isVisible() || popoverHoverPreloadTimer) return;
    popoverHoverPreloadTimer = setTimeout(() => {
      popoverHoverPreloadTimer = null;
      void preparePopover(false).catch(
        (err) => reportMenuBarPopoverLoadFailure("main.menu-bar-popover-preload", err, {
          logInfo: deps.logInfo,
          captureAppError: deps.captureAppError
        })
      );
    }, MENU_BAR_POPOVER_HOVER_PRELOAD_DELAY_MS);
    popoverHoverPreloadTimer.unref?.();
  }
  function handleTrayMouseLeave() {
    cancelPopoverHoverPreload();
    schedulePopoverWarmTeardown();
  }
  function createPopoverModel(conversations, totalConversationCount, usageItems) {
    const iconDataUrls = getHarnessIconDataUrls();
    const dark = deliveryNative.nativeTheme.shouldUseDarkColors;
    return {
      dark,
      appDisplayName: menuBarActionDisplayName(deps.appDisplayName),
      showConversations: readMenuBarShowConversations(),
      conversations: conversations.map((conversation) => ({
        ref: conversation.ref,
        title: conversation.title,
        source: conversation.source,
        state: conversation.state,
        statusColor: conversation.state === "running" ? runningAccentColor() : evidencePins.menuBarColorForStatus(conversation.state),
        harnessColor: evidencePins.menuBarColorForHarness(conversation.source),
        harnessIconDataUrl: iconDataUrls[conversation.source] ?? null
      })),
      hiddenConversationCount: Math.max(0, totalConversationCount - conversations.length),
      showUsage: readMenuBarShowUsageInDropdown(),
      usage: usageItems.map((item) => ({
        provider: item.provider,
        label: evidencePins.MENU_BAR_USAGE_PROVIDER_LABELS[item.provider],
        harnessColor: evidencePins.menuBarColorForHarness(item.provider),
        harnessIconDataUrl: iconDataUrls[item.provider] ?? null,
        windows: item.windows.map((window) => ({
          id: window.windowId,
          label: window.label,
          remainingPercent: window.remainingPercent,
          resetText: window.resetText
        }))
      }))
    };
  }
  function createMenuBarRenderPayload(counts, colored, animationFrame) {
    return evidencePins.createMenuBarTrayIconRenderPayload({
      counts,
      colored,
      statusIndicatorsFilled: readMenuBarStatusIndicatorsFilled(),
      animationFrame,
      flowerDataUrl: getTrayFlowerDataUrl(),
      usageIndicators: usageIndicatorsForRender(),
      harnessIconDataUrls: getHarnessIconDataUrls()
    });
  }
  function menuBarIconRenderKey(counts) {
    return JSON.stringify({
      counts,
      colored: readMenuBarStatusIndicatorsColored(),
      filled: readMenuBarStatusIndicatorsFilled(),
      flower: readTrayFlower(deps.getSetting, deps.flowerAssets),
      usage: usageIndicatorsForRender()
    });
  }
  async function createRenderedMenuBarImage(counts, animationFrame) {
    const colored = readMenuBarStatusIndicatorsColored();
    const payload = createMenuBarRenderPayload(counts, colored, animationFrame);
    const { renderAsync } = await import("@resvg/resvg-js");
    const rendered = await renderAsync(evidencePins.createMenuBarTrayIconSvg(payload), {
      fitTo: { mode: "zoom", value: payload.scale },
      font: createTrayRasterFontOptions(deps.trayFontFiles),
      logLevel: "off"
    });
    const image = deliveryNative.nativeImage.createFromBuffer(Buffer.from(rendered.asPng()), {
      scaleFactor: payload.scale
    });
    if (image.isEmpty()) throw new Error("Tray SVG rasterizer returned an empty image");
    image.setTemplateImage(!colored);
    return image;
  }
  function createFallbackMenuBarImage(counts, animationFrame) {
    const colored = readMenuBarStatusIndicatorsColored();
    const payload = createMenuBarRenderPayload(counts, colored, animationFrame);
    const image = deliveryNative.nativeImage.createFromBuffer(createFallbackMenuBarPng(payload), {
      scaleFactor: payload.scale
    });
    if (image.isEmpty()) return createTrayImage();
    image.setTemplateImage(!colored);
    return image;
  }
  function stopMenuBarIconAnimation() {
    if (!iconAnimationTimer) return;
    clearInterval(iconAnimationTimer);
    iconAnimationTimer = null;
    iconAnimationFrame = 0;
  }
  function renderMenuBarIcon(counts) {
    if (!tray || menuOpen) return;
    if (iconRenderInFlight) {
      iconRenderPending = true;
      return;
    }
    const cacheKey = menuBarIconRenderKey(counts);
    if (iconFrameCache?.key !== cacheKey) {
      iconFrameCache = { key: cacheKey, frames: /* @__PURE__ */ new Map() };
    }
    const animationFrame = iconAnimationFrame % evidencePins.TRAY_RUNNING_ANIMATION_FRAMES;
    const cachedImage = iconFrameCache.frames.get(animationFrame);
    if (cachedImage) {
      tray.setImage(cachedImage);
      tray.setTitle("");
      return;
    }
    const renderId = ++iconRenderId;
    iconRenderInFlight = true;
    void createRenderedMenuBarImage(counts, animationFrame).then((image) => {
      if (!tray || renderId !== iconRenderId) return;
      if (iconFrameCache?.key === cacheKey) iconFrameCache.frames.set(animationFrame, image);
      iconRenderFailureLogged = false;
      tray.setImage(image);
      tray.setTitle("");
    }).catch((err) => {
      if (!tray || renderId !== iconRenderId) return;
      const fallback = createFallbackMenuBarImage(counts, animationFrame);
      if (iconFrameCache?.key === cacheKey) iconFrameCache.frames.set(animationFrame, fallback);
      tray.setImage(fallback);
      if (!iconRenderFailureLogged) {
        iconRenderFailureLogged = true;
        deps.captureAppError("main.menu-bar-render", err);
      }
    }).finally(() => {
      iconRenderInFlight = false;
      if (!tray || !iconRenderPending) return;
      iconRenderPending = false;
      renderMenuBarIcon(iconCounts ?? counts);
    });
  }
  function syncMenuBarIconAnimation(counts) {
    if (!tray || !evidencePins.shouldAnimateMenuBarIcon(counts)) {
      stopMenuBarIconAnimation();
      return;
    }
    if (iconAnimationTimer) return;
    iconAnimationTimer = setInterval(() => {
      if (!tray) {
        stopMenuBarIconAnimation();
        return;
      }
      const counts2 = iconCounts;
      if (!counts2 || !evidencePins.shouldAnimateMenuBarIcon(counts2)) {
        stopMenuBarIconAnimation();
        return;
      }
      iconAnimationFrame += 1;
      renderMenuBarIcon(counts2);
    }, evidencePins.TRAY_ANIMATION_FRAME_MS);
  }
  async function refreshUsage(force) {
    if (!tray) return;
    if (!readMenuBarShowUsage() && !readMenuBarShowUsageInDropdown()) {
      usageReport = null;
      await update();
      return;
    }
    if (usageRefreshInFlight) return usageRefreshInFlight;
    usageRefreshInFlight = (async () => {
      try {
        const report = await deps.fetchUsageReport(force);
        if (!tray) return;
        usageReport = report;
        await update();
      } catch (err) {
        deps.captureAppError("main.menu-bar-usage", err);
      } finally {
        usageRefreshInFlight = null;
      }
    })();
    return usageRefreshInFlight;
  }
  function stopUsageRefreshTimer() {
    if (!usageRefreshTimer) return;
    clearInterval(usageRefreshTimer);
    usageRefreshTimer = null;
  }
  function syncUsageRefreshTimer() {
    if (!tray || !readMenuBarShowUsage() && !readMenuBarShowUsageInDropdown()) {
      stopUsageRefreshTimer();
      return;
    }
    if (usageRefreshTimer) return;
    usageRefreshTimer = setInterval(() => void refreshUsage(false), MENU_BAR_USAGE_REFRESH_MS);
    usageRefreshTimer.unref?.();
  }
  function showMenu() {
    if (!tray) return;
    cancelPopoverHoverPreload();
    cancelPopoverWarmRetention();
    if (popoverWindow?.isVisible()) {
      hidePopover();
      return;
    }
    void preparePopover(true).catch(
      (err) => reportMenuBarPopoverLoadFailure("main.menu-bar-popover", err, {
        logInfo: deps.logInfo,
        captureAppError: deps.captureAppError
      })
    );
    void refreshUsage(false);
  }
  function update(refreshConversations = false) {
    if (!tray) return Promise.resolve();
    if (updateInFlight) {
      updatePending = true;
      updatePendingConversationRefresh ||= refreshConversations;
      return updateInFlight;
    }
    const run = (async () => {
      const updateSyncId = syncId;
      if (refreshConversations) {
        try {
          latestConversationProjection = await deps.loadConversationProjection();
          conversationProjectionFailureLogged = false;
        } catch (err) {
          if (!conversationProjectionFailureLogged && shouldReportConversationRefreshAppError(err)) {
            conversationProjectionFailureLogged = true;
            deps.captureAppError("main.menu-bar-snapshot", err);
          }
        }
      }
      if (updateSyncId !== syncId || !tray) return;
      const projected = latestConversationProjection;
      const counts = visibleStatusCounts(projected.counts);
      iconCounts = counts;
      syncMenuBarIconAnimation(counts);
      tray.setTitle("");
      const statusTooltip = TRAY_STATUS_ORDER.filter(readMenuBarShowStatusCounter).map((status) => `${counts[status]} ${evidencePins.MENU_BAR_AGENT_STATUS_LABELS[status]}`).join(", ");
      const tooltipParts = statusTooltip ? [statusTooltip] : [];
      const usageProjection = projectCurrentMenuBarUsage();
      if (readMenuBarShowUsage()) {
        const usageTooltip = usageProjection.indicators.map(
          (item) => `${evidencePins.MENU_BAR_USAGE_PROVIDER_LABELS[item.provider]} ${Math.round(item.remainingPercent)}% remaining`
        ).join(", ");
        if (usageTooltip) tooltipParts.push(usageTooltip);
      }
      tray.setToolTip(`${deps.appDisplayName}: ${tooltipParts.join("; ") || "menu bar item"}`);
      const visibleConversations = projected.rows;
      const usageItems = usageProjection.items;
      latestPopoverModel = createPopoverModel(
        visibleConversations,
        projected.totalConversationCount,
        usageItems
      );
      if (!tray) return;
      tray.setContextMenu(null);
      if (popoverShowPending || popoverWindow && !popoverWindow.isDestroyed() && (popoverWindow.isVisible() || popoverRenderInFlight)) {
        void preparePopover(false).catch(
          (err) => reportMenuBarPopoverLoadFailure("main.menu-bar-popover-update", err, {
            logInfo: deps.logInfo,
            captureAppError: deps.captureAppError
          })
        );
      }
      renderMenuBarIcon(counts);
    })();
    const completion = run.finally(async () => {
      if (updateInFlight === completion) updateInFlight = null;
      if (updatePending && tray) {
        const shouldRefreshConversations = updatePendingConversationRefresh;
        updatePending = false;
        updatePendingConversationRefresh = false;
        await update(shouldRefreshConversations);
      }
    });
    updateInFlight = completion;
    return completion;
  }
  function destroy() {
    syncId += 1;
    iconRenderId += 1;
    iconRenderPending = false;
    iconRenderInFlight = false;
    iconCounts = null;
    menuOpen = false;
    harnessIconDataUrls = null;
    trayFlowerDataUrlCache = null;
    iconFrameCache = null;
    latestPopoverModel = null;
    renderedPopoverHtml = null;
    renderedPopoverHeight = 400;
    latestConversationProjection = {
      rows: [],
      totalConversationCount: 0,
      counts: { running: 0, waiting: 0, finished: 0 }
    };
    popoverRenderInFlight = null;
    popoverRenderPending = false;
    popoverShowPending = false;
    usageReport = null;
    usageRefreshInFlight = null;
    updatePending = false;
    updatePendingConversationRefresh = false;
    conversationProjectionFailureLogged = false;
    stopMenuBarIconAnimation();
    stopPopoverFocusTimer();
    cancelPopoverHoverPreload();
    cancelPopoverWarmRetention();
    stopUsageRefreshTimer();
    removeNativeThemeListener();
    if (tray) tray.destroy();
    tray = null;
    popoverRenderId += 1;
    if (popoverWindow && !popoverWindow.isDestroyed()) popoverWindow.destroy();
    popoverWindow = null;
  }
  async function sync() {
    if (process.platform !== "darwin") return;
    if (!readMenuBarEnabled()) {
      destroy();
      return;
    }
    const currentSync = ++syncId;
    const featureEnabled = await deps.isFeatureEnabled(MAC_MENU_BAR_STATUS_ITEM_FLAG);
    if (currentSync !== syncId) return;
    if (!featureEnabled) {
      destroy();
      return;
    }
    try {
      if (!tray) {
        tray = new deliveryNative.Tray(createTrayImage());
        tray.setIgnoreDoubleClickEvents(true);
        tray.on("click", showMenu);
        tray.on("right-click", showMenu);
        tray.on("mouse-enter", preloadPopoverOnHover);
        tray.on("mouse-leave", handleTrayMouseLeave);
        tray.setHighlightMode?.("never");
      }
      installNativeThemeListener();
      syncUsageRefreshTimer();
      void refreshUsage(false);
      await update(true);
    } catch (err) {
      console.error("[blume] failed to sync menu bar icon:", err);
      deps.captureAppError("main.menu-bar-sync", err);
    }
  }
  async function notifySettingChanged(key) {
    if (key === MENU_BAR_ENABLED_SETTING_KEY) {
      await sync();
      return;
    }
    if (key === THEME_FLOWER_SETTING_KEY || key === MENU_BAR_STATUS_INDICATORS_COLORED_SETTING_KEY || key === MENU_BAR_STATUS_INDICATOR_STYLE_SETTING_KEY || key === MENU_BAR_SHOW_STATUS_SETTING_KEY || key === MENU_BAR_SHOW_CONVERSATIONS_SETTING_KEY || isMenuBarUsageSettingKey(key) || TRAY_STATUS_ORDER.some((status) => MENU_BAR_STATUS_COUNTER_SETTING_KEYS[status] === key)) {
      if (key === THEME_FLOWER_SETTING_KEY) harnessIconDataUrls = null;
      if (tray) {
        if (isMenuBarUsageSettingKey(key)) {
          syncUsageRefreshTimer();
          await refreshUsage(false);
        } else {
          await update();
        }
      }
    }
  }
  return {
    sync,
    notifyConversationsChanged() {
      if (!tray) return;
      void update(true).catch((err) => deps.captureAppError("main.menu-bar-update", err));
    },
    notifySettingChanged,
    destroy
  };
}
function createDesktopNativeDockIconFacade(deps) {
  let stopped = false;
  let pending2;
  let active2;
  let applied;
  let persistence;
  let quitPending = false;
  let quitTimer;
  function stop() {
    stopped = true;
    pending2 = void 0;
    if (quitTimer) clearTimeout(quitTimer);
    active2?.abort();
  }
  async function persistLatest() {
    if (active2 || stopped || !deps.setAppIcon) return;
    const controller = new AbortController();
    active2 = controller;
    try {
      while (pending2 && !stopped) {
        const icon2 = pending2;
        pending2 = void 0;
        if (icon2 === applied) continue;
        try {
          await deps.setAppIcon(icon2, controller.signal);
          applied = icon2;
        } catch (err) {
          if (!stopped) deps.captureAppError("main.app-icon-set", err);
        }
      }
    } finally {
      active2 = void 0;
    }
  }
  function applyFlower(value) {
    if (stopped || !deps.setDockIcon && !deps.setAppIcon) return;
    const flower = flowerUnlocks.isFlowerId(value) ? value : flowerUnlocks.DEFAULT_FLOWER;
    try {
      deps.setDockIcon?.(deps.flowerAssets[flower]);
    } catch (err) {
      deps.captureAppError("main.dock-icon-set", err);
    }
    pending2 = deps.flowerAssets[flower];
    if (!active2) persistence = persistLatest();
  }
  return {
    stop,
    deferQuit(resume) {
      if (stopped || !active2) return false;
      if (quitPending) return true;
      quitPending = true;
      const finish2 = () => {
        if (stopped) return;
        stop();
        resume();
      };
      quitTimer = setTimeout(() => {
        if (!stopped)
          deps.captureAppError(
            "main.app-icon-quit-timeout",
            new Error("App icon update exceeded quit grace period")
          );
        finish2();
      }, 2e3);
      void persistence?.then(finish2);
      return true;
    },
    sync() {
      if (stopped || !deps.setDockIcon && !deps.setAppIcon) return;
      applyFlower(deps.getSetting(flowerUnlocks.FLOWER_SETTING_KEY));
    },
    notifySettingChanged(key, value) {
      if (key === flowerUnlocks.FLOWER_SETTING_KEY) applyFlower(value);
    }
  };
}
const SET_APP_ICON_SCRIPT = `
ObjC.import('AppKit');
function run(args) {
  var image = $.NSImage.alloc.initWithContentsOfFile(args[0]);
  if (image.isNil()) throw new Error('Could not load app icon');
  if (!$.NSWorkspace.sharedWorkspace.setIconForFileOptions(image, args[1], 0)) {
    throw new Error('macOS could not set the app icon');
  }
}
`;
function macAppBundlePath(platform, isPackaged, executable) {
  if (platform !== "darwin" || !isPackaged) return null;
  const macOS = _n.dirname(executable);
  const contents = _n.dirname(macOS);
  const bundle = _n.dirname(contents);
  if (_n.basename(macOS) !== "MacOS" || _n.basename(contents) !== "Contents" || !_n.basename(bundle).endsWith(".app"))
    return null;
  return bundle;
}
function setMacAppIcon(bundle, icon2, signal) {
  const unpackedIcon = icon2.replace(/([/\\])app\.asar([/\\])/, "$1app.asar.unpacked$2");
  return new Promise((resolve, reject) => {
    node_child_process.execFile(
      "/usr/bin/osascript",
      ["-l", "JavaScript", "-e", SET_APP_ICON_SCRIPT, unpackedIcon, bundle],
      { timeout: 15e3, maxBuffer: 16 * 1024, signal },
      (error) => error ? reject(error) : resolve()
    );
  });
}
function drainDeliveryRuntimeOnQuit(deps) {
  let drained = false;
  let quittingForUpdate = false;
  deps.updater.on("before-quit-for-update", () => {
    quittingForUpdate = true;
  });
  deps.app.on("before-quit", (event) => {
    if (drained || quittingForUpdate) return;
    event.preventDefault();
    void deps.stop().catch((error) => console.error("[deliveries] shutdown failed", error)).finally(() => {
      drained = true;
      deps.app.quit();
    });
  });
}
const execFileAsync$1 = require$$1.promisify(node_child_process.execFile);
const usageHostService = createProviderUsageHostService({
  ...providerUsageHostPolicyOptions(),
  ports: {
    fetch: (input, init) => fetch(input, init),
    execFile: (file, args, options) => execFileAsync$1(file, args, options),
    fs: {
      async readTextFile(path) {
        return require$$0$1.readFile(path, "utf8");
      },
      async writeTextFile(path, value) {
        await require$$0$1.writeFile(path, value, "utf8");
      },
      rename: require$$0$1.rename,
      async mkdir(path) {
        await require$$0$1.mkdir(path, { recursive: true });
      }
    },
    path: { join: _n.join, dirname: _n.dirname },
    process: {
      env: (name) => process.env[name],
      envObject: () => process.env,
      platform: () => process.platform,
      arch: () => process.arch,
      pid: () => process.pid
    },
    homedir: Nl.homedir,
    settings: {
      get: getSetting,
      set: setSetting
    },
    secrets: {
      get: getSecret,
      set: setSecret,
      clear: clearSecret
    },
    captureTelemetry(event, properties) {
      return captureTelemetryEvent(event, properties);
    }
  }
});
async function fetchUsageReport(cursorCookie, force = false) {
  const cursorEnabled = await isPosthogFeatureEnabled(CURSOR_USAGE_FLAG);
  return usageHostService.fetchUsageReport(cursorCookie, force, { cursorEnabled });
}
function childProcessGoneDiagnosticProperties(details, options) {
  const expectedTermination = options.terminationIntent !== void 0 && options.reportingAction === "ignored";
  return {
    ...details,
    lifecycle_event: "child_process_gone",
    process_kind: "child",
    process_type: details.type,
    process_name: details.name,
    process_service_name: details.serviceName,
    exit_reason: details.reason,
    exit_code: details.exitCode,
    app_is_quitting: options.appIsQuitting,
    reporting_action: options.reportingAction,
    managed_background_process: options.managedBackgroundProcess,
    active_request_count: options.activeRequestCount,
    expected_termination: expectedTermination,
    termination_intent: options.terminationIntent,
    diagnostic_schema_version: 1,
    feature_area: "background_processing",
    failure_class: "process_exit",
    user_impact: expectedTermination ? "no_user_impact_expected" : "background_feature_interrupted",
    impact_scope: expectedTermination ? "none_expected" : "feature_degraded",
    recovery_mode: expectedTermination ? "none_required" : "automatic_retry"
  };
}
function renderProcessGoneDiagnosticProperties(details, options) {
  const closesApplication = options.reportingAction === "captured" || !options.appIsQuitting;
  return {
    ...details,
    lifecycle_event: "render_process_gone",
    process_kind: "renderer",
    exit_reason: details.reason,
    exit_code: details.exitCode,
    app_is_quitting: options.appIsQuitting,
    reporting_action: options.reportingAction,
    diagnostic_schema_version: 1,
    feature_area: "application_runtime",
    failure_class: "process_exit",
    user_impact: closesApplication ? "application_closed_unexpectedly" : "no_user_impact_expected",
    impact_scope: closesApplication ? "app_blocked" : "none_expected",
    recovery_mode: closesApplication ? "next_launch" : "none_required"
  };
}
const SHUTDOWN_REASONS = /* @__PURE__ */ new Set(["abnormal-exit", "killed"]);
const MANAGED_WORKER_NON_EXCEPTION_REASONS = /* @__PURE__ */ new Set([
  "abnormal-exit",
  "killed",
  "crashed"
]);
function shouldCaptureChildProcessGone(details, options) {
  if (!options.managedBackgroundProcess) return false;
  if (details.reason === "clean-exit") return false;
  if (MANAGED_WORKER_NON_EXCEPTION_REASONS.has(details.reason)) return false;
  return true;
}
function shouldCaptureRenderProcessGone(details, _appIsQuitting) {
  if (details.reason === "clean-exit") return false;
  if (SHUTDOWN_REASONS.has(details.reason)) return false;
  return true;
}
const ACCOUNT_OAUTH_CODE_VERIFIER_NOT_FOUND_MESSAGE = "Code verifier not found.";
function isExpectedAccountOAuthCallbackFailure(error) {
  if (isSocialSignInCancelled(error)) return true;
  return error instanceof Error && error.name === "BetterAuthError" && error.message === ACCOUNT_OAUTH_CODE_VERIFIER_NOT_FOUND_MESSAGE;
}
function shouldReportAccountDeepLinkAppError(error) {
  return !isExpectedAccountOAuthCallbackFailure(error);
}
function reportAccountDeepLinkFailure$1(error, deps) {
  if (!shouldReportAccountDeepLinkAppError(error)) {
    deps.logInfo("expected account OAuth callback failure", {
      error_name: error instanceof Error ? error.name : typeof error,
      error_message: error instanceof Error ? error.message : String(error),
      reporting_action: "local_log_only"
    });
    return;
  }
  deps.captureAppError("main.account-deep-link", error);
}
const WRITE_EPIPE_MESSAGE = "write EPIPE";
const EPIPE_CODE = "EPIPE";
const EIO_CODE = "EIO";
const CONSOLE_WRITE_STACK_PATTERN = /\bconsole\.(?:log|info|warn|error|debug|value|trace)\b/;
function readErrnoCode(error) {
  if (!error || typeof error !== "object") return void 0;
  if (!("code" in error)) return void 0;
  const value = error.code;
  return typeof value === "string" ? value : void 0;
}
function errorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function errorStack(error) {
  if (error instanceof Error && typeof error.stack === "string") return error.stack;
  return "";
}
function isWriteEpipeMessage(message) {
  const trimmed = message.trim();
  return trimmed === WRITE_EPIPE_MESSAGE || trimmed.endsWith(`: ${WRITE_EPIPE_MESSAGE}`);
}
function stackLooksLikeConsoleWrite(stack) {
  return CONSOLE_WRITE_STACK_PATTERN.test(stack);
}
function isExpectedConsoleWriteEpipe(error) {
  if (!(error instanceof Error)) return false;
  const messageMatches = isWriteEpipeMessage(errorMessage(error));
  const codeMatches = readErrnoCode(error) === EPIPE_CODE;
  if (!messageMatches && !codeMatches) return false;
  const stack = errorStack(error);
  if (!stack) return false;
  return stackLooksLikeConsoleWrite(stack);
}
function isExpectedBrokenStdioPipeCode(code) {
  return code === EPIPE_CODE || code === EIO_CODE;
}
function ignoreBrokenStdioPipeErrors(streams = [process.stdout, process.stderr], log2) {
  for (const stream of streams) {
    if (!stream || typeof stream.on !== "function") continue;
    if (typeof stream.listenerCount === "function" && stream.listenerCount("error") > 0) {
      continue;
    }
    stream.on("error", (error) => {
      const code = readErrnoCode(error);
      if (isExpectedBrokenStdioPipeCode(code)) {
        return;
      }
      log2?.warn("unexpected stdio stream error", {
        code: code ?? null,
        error_name: error instanceof Error ? error.name : "unknown",
        error_message: error instanceof Error ? error.message : String(error)
      });
      throw error;
    });
  }
}
const QUIT_FALLBACK_EXIT_MS = 2500;
function createDesktopNativeLifecycleFacade(deps) {
  let isQuitting = false;
  let quitFallbackTimer = null;
  let stopBackgroundServices = null;
  let closeDbScheduled = false;
  function exitAfterFatalTelemetry(source, err, properties = {}) {
    const fallback = setTimeout(() => deliveryNative.app.exit(1), 1500);
    void (async () => {
      try {
        await deps.captureAppError(source, err, properties);
        await deps.flushPosthogLogging();
        deps.flushAppLogs();
      } finally {
        clearTimeout(fallback);
        deliveryNative.app.exit(1);
      }
    })();
  }
  function exitOnFatal(label) {
    return (err) => {
      if (isExpectedConsoleWriteEpipe(err)) {
        deps.log.info("ignored expected console write EPIPE", {
          error_name: err instanceof Error ? err.name : "unknown",
          error_message: err instanceof Error ? err.message : String(err),
          reporting_action: "local_log_only",
          label
        });
        return;
      }
      deps.log.fatal(label, err);
      exitAfterFatalTelemetry("main.fatal", err, { label });
    };
  }
  function sampleOwnFileDescriptors() {
    try {
      let fdCount = 0;
      let fdMax = 0;
      for (const entry of un.readdirSync("/dev/fd")) {
        if (!/^\d+$/.test(entry)) continue;
        fdCount += 1;
        fdMax = Math.max(fdMax, Number(entry));
      }
      return { fd_count: fdCount, fd_max: fdMax };
    } catch (err) {
      return { fd_sample_error: err instanceof Error ? err.message : String(err) };
    }
  }
  function scheduleQuitFallback(reason, exitCode) {
    if (quitFallbackTimer) return;
    quitFallbackTimer = setTimeout(() => {
      console.log(`[blume] forcing app exit after slow quit (${reason})`);
      deliveryNative.app.exit(exitCode);
      setTimeout(() => {
        console.log(`[blume] forcing process exit after slow Electron exit (${reason})`);
        process.exit(exitCode);
      }, 250);
    }, QUIT_FALLBACK_EXIT_MS);
  }
  function closeDbAfterRefreshes() {
    if (closeDbScheduled) return;
    closeDbScheduled = true;
    void deps.waitForConversationRefreshes().catch((err) => {
      console.error("[blume] failed while waiting for refresh shutdown:", err);
    }).finally(() => {
      try {
        deps.closeDb();
      } catch (err) {
        console.error("[blume] failed to close DB during quit:", err);
      }
      void deps.shutdownPosthogLogging();
      deps.flushAppLogs();
    });
  }
  function beginAppQuit(reason, exitCode = 0) {
    scheduleQuitFallback(reason, exitCode);
    if (isQuitting) return;
    isQuitting = true;
    void deps.capturePosthogLog("info", "Application quit requested", {
      log_source: "app_lifecycle",
      lifecycle_event: "quit_requested",
      quit_reason: reason,
      exit_code: exitCode,
      diagnostic_schema_version: 1,
      feature_area: "application_runtime",
      failure_class: "none",
      user_impact: "no_user_impact_expected",
      impact_scope: "none_expected",
      recovery_mode: "none_required"
    });
    deps.requestConversationRefreshStop();
    deps.prepareNativeWindowsForQuit();
    deps.stopAppUsageTracking();
    stopBackgroundServices?.();
    const destroyedWindows = deps.destroyAllNativeWindows();
    console.log(`[blume] quit requested (${reason}); destroyed ${destroyedWindows} window(s)`);
    closeDbAfterRefreshes();
  }
  ignoreBrokenStdioPipeErrors([process.stdout, process.stderr], deps.log);
  process.on("uncaughtException", exitOnFatal("uncaught exception"));
  process.on("unhandledRejection", (err) => {
    if (isExpectedAccountOAuthCallbackFailure(err)) {
      deps.log.info("ignored expected account OAuth callback rejection", {
        error_name: err instanceof Error ? err.name : "unknown",
        error_message: err instanceof Error ? err.message : String(err),
        reporting_action: "local_log_only"
      });
      return;
    }
    if (isQuitting && isExpectedConversationRefreshWorkerShutdownError(err)) {
      deps.log.info("ignored expected refresh worker shutdown rejection during quit", {
        error_name: err instanceof Error ? err.name : "unknown",
        error_message: err instanceof Error ? err.message : String(err)
      });
      return;
    }
    if (isQuitting && isExpectedSetupScanWorkerShutdownError(err)) {
      deps.log.info("ignored expected setup scan worker shutdown rejection during quit", {
        error_name: err instanceof Error ? err.name : "unknown",
        error_message: err instanceof Error ? err.message : String(err)
      });
      return;
    }
    if (isQuitting && isExpectedSignalAnalyticsWorkerShutdownError(err)) {
      deps.log.info("ignored expected signal analytics worker shutdown rejection during quit", {
        error_name: err instanceof Error ? err.name : "unknown",
        error_message: err instanceof Error ? err.message : String(err)
      });
      return;
    }
    exitOnFatal("unhandled rejection")(err);
  });
  if (process.platform === "darwin") {
    for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
      process.on(sig, () => {
        deps.log.info("signal received, quitting", { signal: sig });
        beginAppQuit(sig, 1);
        deliveryNative.app.quit();
      });
    }
  }
  deliveryNative.app.on("render-process-gone", (_event, contents, details) => {
    if (details.reason === "clean-exit") return;
    if (deps.isExpendableRenderer(contents)) return;
    const shouldCapture = shouldCaptureRenderProcessGone(details);
    const properties = renderProcessGoneDiagnosticProperties(details, {
      appIsQuitting: isQuitting,
      reportingAction: shouldCapture ? "captured" : "ignored"
    });
    if (!shouldCapture) {
      deps.log.info("render process gone ignored", properties);
      if (isQuitting) {
        void deps.capturePosthogLog("info", "Renderer process gone", {
          ...properties,
          log_source: "process_lifecycle"
        }).catch(() => {
        });
        return;
      }
      const fallback = setTimeout(() => deliveryNative.app.exit(1), 1500);
      void (async () => {
        try {
          try {
            await deps.capturePosthogLog("info", "Renderer process gone", {
              ...properties,
              log_source: "process_lifecycle"
            });
          } catch {
          }
          try {
            await deps.flushPosthogLogging();
          } catch {
          }
          try {
            deps.flushAppLogs();
          } catch {
          }
        } finally {
          clearTimeout(fallback);
          deliveryNative.app.exit(1);
        }
      })();
      return;
    }
    const err = new Error("Renderer process gone");
    deps.log.fatal("render process gone", err, properties);
    exitAfterFatalTelemetry("main.render-process-gone", err, properties);
  });
  deliveryNative.app.on("child-process-gone", (_event, details) => {
    const backgroundProcessIdentity = [details.name, details.serviceName].find(
      (name) => isBlumeBackgroundProcessService(name)
    );
    const backgroundServiceName = getBlumeBackgroundProcessServiceName(backgroundProcessIdentity);
    const managedBackgroundProcess = backgroundServiceName !== void 0;
    const terminationIntent = managedBackgroundProcess ? consumeBackgroundProcessTerminationIntent(backgroundProcessIdentity ?? "") : void 0;
    const shouldCapture = shouldCaptureChildProcessGone(details, {
      managedBackgroundProcess
    });
    const diagnosticDetails = managedBackgroundProcess ? {
      ...details,
      ...isBlumeBackgroundProcessService(details.name) ? { name: backgroundServiceName } : {},
      ...isBlumeBackgroundProcessService(details.serviceName) ? { serviceName: backgroundServiceName } : {}
    } : details;
    const properties = childProcessGoneDiagnosticProperties(diagnosticDetails, {
      appIsQuitting: isQuitting,
      reportingAction: shouldCapture ? "captured" : "ignored",
      managedBackgroundProcess,
      activeRequestCount: backgroundServiceName !== void 0 ? getBackgroundProcessActiveRequestCount(backgroundServiceName) : 0,
      terminationIntent
    });
    if (!shouldCapture) {
      deps.log.info("child process gone ignored", properties);
      void deps.capturePosthogLog("info", "Child process gone", {
        ...properties,
        log_source: "process_lifecycle"
      });
      return;
    }
    const err = new Error("Child process gone");
    deps.log.error("child process gone", err, properties);
    void deps.captureAppError("main.child-process-gone", err, properties);
  });
  function registerBeforeQuitHandler(deferQuit) {
    deliveryNative.app.on("before-quit", (event) => {
      if (deferQuit?.()) {
        event.preventDefault();
        return;
      }
      beginAppQuit("before-quit");
    });
  }
  function registerWindowAllClosedHandler() {
    deliveryNative.app.on("window-all-closed", () => {
      if (deps.shouldSkipWindowAllClosedQuit()) return;
      if (!isQuitting) {
        beginAppQuit("window-all-closed");
        deliveryNative.app.quit();
      }
    });
  }
  return {
    beginAppQuit,
    isQuitting: () => isQuitting,
    registerBeforeQuitHandler,
    registerWindowAllClosedHandler,
    sampleOwnFileDescriptors,
    setStopBackgroundServices: (stop) => {
      stopBackgroundServices = stop;
    }
  };
}
function isRecord$2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function asString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function asCount(value) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}
function asLevel(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.min(10, Math.max(1, Math.round(value)));
}
function toPeriodKind(value) {
  return value === "rolling" ? "rolling" : "weekly";
}
function parseSummary(summaryJson) {
  try {
    const parsed = JSON.parse(summaryJson);
    return isRecord$2(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function toDayCounts(value) {
  if (!Array.isArray(value)) return [];
  return value.map(
    (day) => isRecord$2(day) && Array.isArray(day.sessions) ? day.sessions.length : 0
  );
}
function toBadgeViews(value) {
  if (!Array.isArray(value)) return [];
  const badges = [];
  for (const entry of value) {
    if (!isRecord$2(entry)) continue;
    const id = asString(entry.id);
    if (!id) continue;
    badges.push({
      id,
      name: asString(entry.name, id),
      display: asString(entry.display),
      level: asLevel(entry.level)
    });
  }
  return badges;
}
function fallbackView(row) {
  return {
    id: row.id,
    periodStart: asString(row.period_start),
    periodKind: toPeriodKind(row.period_kind),
    rangeLabel: asString(row.period_start),
    createdAt: asCount(row.created_at),
    persona: "hours",
    heroKicker: "",
    heroValue: "",
    heroDetail: "",
    sessionCount: 0,
    dayCounts: [],
    badges: [],
    summaryJson: ""
  };
}
function projectWrappedView(row) {
  const summary = parseSummary(asString(row.summary_json));
  if (!summary) return fallbackView(row);
  const raw = summary;
  const hero = isRecord$2(raw.hero) ? raw.hero : {};
  const heroUnit = asString(hero.unit);
  const period = isRecord$2(raw.period) ? raw.period : {};
  return {
    id: row.id,
    periodStart: asString(row.period_start) || asString(period.periodStart),
    periodKind: toPeriodKind(row.period_kind ?? period.kind),
    rangeLabel: asString(raw.rangeLabel) || asString(row.period_start),
    createdAt: asCount(row.created_at),
    persona: asString(raw.persona, "hours"),
    heroKicker: asString(hero.kicker),
    heroValue: asString(hero.value),
    ...heroUnit ? { heroUnit } : {},
    heroDetail: asString(hero.detail),
    sessionCount: asCount(raw.sessionCount),
    dayCounts: toDayCounts(raw.days),
    badges: toBadgeViews(raw.badges),
    summaryJson: asString(row.summary_json)
  };
}
const WRAPPED_COHORT_CACHE_SETTING_KEY = "wrapped.cohortCache";
const WRAPPED_COHORT_MAX_AGE_MS = 24 * 60 * 60 * 1e3;
function isRecord$1(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function toBadgeCohort(response) {
  if (!isRecord$1(response) || !isRecord$1(response.badges)) return {};
  const cohort = {};
  for (const [badgeId, raw] of Object.entries(response.badges)) {
    if (!isRecord$1(raw)) continue;
    const { mean, sigma, subjects } = raw;
    if (typeof mean !== "number" || !Number.isFinite(mean)) continue;
    if (typeof sigma !== "number" || !Number.isFinite(sigma) || sigma < 0) continue;
    if (typeof subjects !== "number" || !Number.isSafeInteger(subjects) || subjects < 0) continue;
    cohort[badgeId] = { mean, sigma, subjects };
  }
  return cohort;
}
function serializeCohortCache(cohort, fetchedAtMs) {
  return JSON.stringify({ fetchedAtMs, cohort });
}
function parseCohortCache(value) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    if (!isRecord$1(parsed)) return null;
    const fetchedAtMs = parsed.fetchedAtMs;
    if (typeof fetchedAtMs !== "number" || !Number.isFinite(fetchedAtMs)) return null;
    return { fetchedAtMs, cohort: toBadgeCohort({ badges: parsed.cohort }) };
  } catch {
    return null;
  }
}
function isCohortCacheFresh(fetchedAtMs, nowMs) {
  const age = nowMs - fetchedAtMs;
  return age >= 0 && age < WRAPPED_COHORT_MAX_AGE_MS;
}
function createWrappedCohortService(deps) {
  async function enabled() {
    try {
      return useCases.isWrappedEnabled(await deps.settings.get(useCases.WRAPPED_ENABLED_SETTING_KEY));
    } catch {
      return false;
    }
  }
  return {
    async load() {
      const cached2 = parseCohortCache(
        await deps.settings.get(WRAPPED_COHORT_CACHE_SETTING_KEY).catch(() => null)
      );
      const nowMs = deps.now();
      if (cached2 && isCohortCacheFresh(cached2.fetchedAtMs, nowMs)) return cached2.cohort;
      if (!deps.port || !await enabled()) return cached2?.cohort ?? {};
      try {
        const cohort = toBadgeCohort(await deps.port.fetch());
        await deps.settings.set(WRAPPED_COHORT_CACHE_SETTING_KEY, serializeCohortCache(cohort, nowMs)).catch(() => {
        });
        return cohort;
      } catch {
        return cached2?.cohort ?? {};
      }
    },
    async contribute(metric) {
      if (!deps.port || !await enabled()) return;
      try {
        await deps.port.upload(metric);
      } catch {
      }
    }
  };
}
const COHORT_WINDOW_WEEKS = 26;
const wrappedCohortPort = {
  async upload(metric) {
    const token = await analyticsToken();
    const body = {
      schemaVersion: 1,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      weekly: [metric]
    };
    await requestJson(`${ANALYTICS_URL}/v1/metrics/weekly-wrapped`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify(body)
    });
  },
  async fetch() {
    const token = await analyticsToken();
    return requestJson(
      `${ANALYTICS_URL}/v1/wrapped-cohort?windowWeeks=${COHORT_WINDOW_WEEKS}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
  }
};
const mainSettings = {
  async getAll() {
    return getAllSettings();
  },
  async get(key) {
    return getSetting(key);
  },
  async set(key, value) {
    setSetting(key, value);
  }
};
let service = null;
function getWrappedCohortService() {
  service ??= createWrappedCohortService({
    settings: mainSettings,
    now: () => Date.now(),
    port: wrappedCohortPort
  });
  return service;
}
const RETRY_COOLDOWN_MS = 5 * 6e4;
const WORKER_INACTIVITY_TIMEOUT_MS = 12e4;
const WORKER_IDLE_MS = 6e4;
const MAX_PENDING = 4;
class WrappedGenerateWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "WrappedGenerateWorkerUnavailableError";
  }
}
const WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE = "wrapped generate worker unresponsive";
const WRAPPED_GENERATE_WORKER_DISPOSED_MESSAGE = "wrapped generate worker disposed";
const WRAPPED_GENERATE_WORKER_CIRCUIT_BREAKER_MESSAGE = "wrapped generate worker circuit breaker is cooling down";
const EXPECTED_WRAPPED_GENERATE_WORKER_OPERATIONAL_MESSAGES = /* @__PURE__ */ new Set([
  WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE,
  WRAPPED_GENERATE_WORKER_DISPOSED_MESSAGE,
  WRAPPED_GENERATE_WORKER_CIRCUIT_BREAKER_MESSAGE
]);
function isWrappedGenerateWorkerUnavailableError(error) {
  return error instanceof WrappedGenerateWorkerUnavailableError;
}
function isExpectedWrappedGenerateWorkerOperationalError(error) {
  return isWrappedGenerateWorkerUnavailableError(error) && EXPECTED_WRAPPED_GENERATE_WORKER_OPERATIONAL_MESSAGES.has(error.message);
}
function shouldReportWrappedGenerateAppError(error) {
  return !isExpectedWrappedGenerateWorkerOperationalError(error);
}
let worker$1 = null;
let workerAlive = false;
let lastFailureAtMs$2 = 0;
let requestId = 0;
const pending$2 = /* @__PURE__ */ new Map();
let activeRequestId = null;
const workerIdle = createIdleShutdown(WORKER_IDLE_MS, () => {
  if (pending$2.size > 0) return;
  const idleWorker = worker$1;
  worker$1 = null;
  workerAlive = false;
  try {
    if (idleWorker) {
      terminateBackgroundProcess(
        idleWorker,
        BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate,
        "idle"
      );
    }
  } catch {
  }
});
function responseError(response) {
  const error = new Error(response.errorMessage);
  if (response.errorName) error.name = response.errorName;
  if (response.errorStack) error.stack = response.errorStack;
  return error;
}
function rejectPending(error) {
  for (const [id, entry] of pending$2) {
    if (entry.watchdog) clearTimeout(entry.watchdog);
    entry.removeAbortListener?.();
    if (entry.started) {
      finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate, id);
    }
    entry.reject(error);
  }
  pending$2.clear();
  activeRequestId = null;
}
function failWorker$1(error) {
  const failed = worker$1;
  worker$1 = null;
  workerAlive = false;
  lastFailureAtMs$2 = Date.now();
  rejectPending(error);
  if (shouldReportWrappedGenerateAppError(error)) {
    void captureAppError("main.wrapped.generate_worker_unavailable", error, {
      main_process_fallback: false
    });
  }
  try {
    if (failed) {
      terminateBackgroundProcess(
        failed,
        BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate,
        "worker-unavailable"
      );
    }
  } catch {
  }
}
function resetWatchdog(id, entry) {
  if (entry.watchdog) clearTimeout(entry.watchdog);
  entry.watchdog = setTimeout(() => {
    if (pending$2.get(id) !== entry) return;
    failWorker$1(
      new WrappedGenerateWorkerUnavailableError(WRAPPED_GENERATE_WORKER_UNRESPONSIVE_MESSAGE)
    );
  }, WORKER_INACTIVITY_TIMEOUT_MS);
  entry.watchdog.unref();
}
function takePending$1(id) {
  const entry = pending$2.get(id);
  if (!entry) return void 0;
  pending$2.delete(id);
  entry.removeAbortListener?.();
  if (entry.started) {
    finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate, id);
  }
  if (entry.watchdog) clearTimeout(entry.watchdog);
  entry.watchdog = null;
  activeRequestId = null;
  return entry;
}
function getWrappedGenerateWorkerUnavailableReason() {
  if (process.env.BLUME_DISABLE_WRAPPED_WORKER === "1") {
    return "wrapped generate worker disabled";
  }
  if (typeof deliveryNative.utilityProcess?.fork !== "function") return "wrapped generate worker unavailable";
  return null;
}
function ensureWorker$1() {
  workerIdle.cancel();
  if (worker$1 && workerAlive) return worker$1;
  const unavailable = getWrappedGenerateWorkerUnavailableReason();
  if (unavailable) throw new WrappedGenerateWorkerUnavailableError(unavailable);
  if (lastFailureAtMs$2 > 0 && Date.now() - lastFailureAtMs$2 < RETRY_COOLDOWN_MS) {
    throw new WrappedGenerateWorkerUnavailableError(WRAPPED_GENERATE_WORKER_CIRCUIT_BREAKER_MESSAGE);
  }
  try {
    const next = deliveryNative.utilityProcess.fork(pn.join(__dirname, "wrappedGenerateWorker.js"), [], {
      serviceName: BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate
    });
    next.on("message", (message) => {
      const entry = pending$2.get(message.id);
      if (!entry) return;
      resetWatchdog(message.id, entry);
      if (message.type === "heartbeat") return;
      takePending$1(message.id);
      if (message.type !== "worker-error") {
        lastFailureAtMs$2 = 0;
        entry.resolve(message);
      } else {
        entry.reject(responseError(message));
      }
      pumpWorkerQueue();
    });
    next.on("exit", () => {
      if (worker$1 !== next) return;
      worker$1 = null;
      workerAlive = false;
      lastFailureAtMs$2 = Date.now();
      rejectPending(new WrappedGenerateWorkerUnavailableError("wrapped generate worker exited"));
    });
    worker$1 = next;
    workerAlive = true;
    return next;
  } catch (error) {
    lastFailureAtMs$2 = Date.now();
    void captureAppError("main.wrapped.generate_worker_spawn", error);
    throw new WrappedGenerateWorkerUnavailableError("failed to spawn wrapped generate worker");
  }
}
function pumpWorkerQueue() {
  if (activeRequestId !== null) return;
  const next = [...pending$2.entries()].find(([, entry2]) => !entry2.started);
  if (!next) {
    if (pending$2.size === 0) workerIdle.schedule();
    return;
  }
  const [id, entry] = next;
  let activeWorker;
  try {
    activeWorker = ensureWorker$1();
  } catch (error) {
    rejectPending(error instanceof Error ? error : new Error(String(error)));
    return;
  }
  entry.started = true;
  activeRequestId = id;
  startBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate, id);
  resetWatchdog(id, entry);
  try {
    activeWorker.postMessage(entry.request);
  } catch {
    failWorker$1(
      new WrappedGenerateWorkerUnavailableError("failed to message wrapped generate worker")
    );
  }
}
function abortError() {
  const error = new Error("wrapped available-weeks request aborted");
  error.name = "AbortError";
  return error;
}
function cancelAvailableWeeksRequest(id, entry) {
  if (pending$2.get(id) !== entry) return;
  if (!entry.started) {
    pending$2.delete(id);
    entry.removeAbortListener?.();
    entry.reject(abortError());
    pumpWorkerQueue();
    return;
  }
  try {
    if (!worker$1 || !workerAlive) {
      failWorker$1(new WrappedGenerateWorkerUnavailableError("wrapped generate worker exited"));
      return;
    }
    worker$1.postMessage({ type: "cancel", id });
  } catch {
    failWorker$1(new WrappedGenerateWorkerUnavailableError("failed to cancel wrapped worker request"));
  }
}
async function generateWrappedInWorker(input) {
  if (pending$2.size >= MAX_PENDING) {
    throw new Error("too many pending wrapped generations");
  }
  const cohortService = getWrappedCohortService();
  const cohort = await cohortService.load().catch(() => ({}));
  const success = await postGenerate(input, cohort);
  if (success.badgeValues && success.periodStart) {
    await cohortService.contribute({
      periodStart: success.periodStart,
      badgeValues: success.badgeValues
    });
  }
  return success;
}
function postGenerate(input, cohort) {
  if (pending$2.size >= MAX_PENDING) {
    return Promise.reject(new Error("too many pending wrapped worker requests"));
  }
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const request2 = {
      ...input,
      type: "generate",
      id,
      dbPath: getDbPath(),
      cohort
    };
    const entry = {
      request: request2,
      resolve: (response) => {
        if (response.type === "generate-result") resolve(response);
        else reject(new Error("wrapped worker returned the wrong response"));
      },
      reject,
      watchdog: null,
      started: false
    };
    pending$2.set(id, entry);
    pumpWorkerQueue();
  });
}
function listWrappedAvailableWeeksInWorker(input) {
  if (pending$2.size >= MAX_PENDING) {
    return Promise.reject(new Error("too many pending wrapped worker requests"));
  }
  if (input.signal?.aborted) return Promise.reject(abortError());
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const request2 = {
      type: "list-available-weeks",
      id,
      dbPath: getDbPath(),
      nowMs: input.nowMs,
      limit: input.limit,
      beforePeriodStart: input.beforePeriodStart
    };
    const entry = {
      request: request2,
      resolve: (response) => {
        if (response.type === "available-weeks-result") resolve(response.page);
        else reject(new Error("wrapped worker returned the wrong response"));
      },
      reject,
      watchdog: null,
      started: false
    };
    pending$2.set(id, entry);
    if (input.signal) {
      const onAbort = () => cancelAvailableWeeksRequest(id, entry);
      input.signal.addEventListener("abort", onAbort, { once: true });
      entry.removeAbortListener = () => input.signal?.removeEventListener("abort", onAbort);
      if (input.signal.aborted) {
        cancelAvailableWeeksRequest(id, entry);
        return;
      }
    }
    pumpWorkerQueue();
  });
}
function disposeWrappedGenerateWorker() {
  workerIdle.cancel();
  const activeWorker = worker$1;
  worker$1 = null;
  workerAlive = false;
  clearBackgroundProcessRequests(BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate);
  rejectPending(new WrappedGenerateWorkerUnavailableError(WRAPPED_GENERATE_WORKER_DISPOSED_MESSAGE));
  try {
    if (activeWorker) {
      terminateBackgroundProcess(
        activeWorker,
        BLUME_BACKGROUND_PROCESS_SERVICES.wrappedGenerate,
        "dispose"
      );
    }
  } catch {
  }
}
function createRequestCancellationRegistry(maxPendingCancellations = 256) {
  const active2 = /* @__PURE__ */ new Map();
  const pending2 = /* @__PURE__ */ new Set();
  const boundedPending = Math.max(1, Math.trunc(maxPendingCancellations));
  return {
    register(token) {
      const controller = new AbortController();
      active2.get(token)?.abort();
      active2.set(token, controller);
      if (pending2.delete(token)) controller.abort();
      return controller;
    },
    cancel(token) {
      const controller = active2.get(token);
      if (controller) {
        controller.abort();
        active2.delete(token);
        return;
      }
      pending2.add(token);
      while (pending2.size > boundedPending) {
        const oldest = pending2.values().next().value;
        if (typeof oldest !== "string") break;
        pending2.delete(oldest);
      }
    },
    complete(token, controller) {
      if (active2.get(token) === controller) active2.delete(token);
    }
  };
}
const MAX_LIST_LIMIT = 20;
const MAX_AVAILABLE_WEEK_LIMIT = 52;
function createDesktopWrappedIpcController(deps) {
  const now = deps.now ?? (() => Date.now());
  const useCases$12 = () => useCases.createWrappedUseCases({
    store: getStorage().wrapped,
    settings: getStorage().settings,
    now,
    accountUserId: deps.accountUserId,
    loadExtras: async () => useCases.ZERO_WRAPPED_EXTRAS
  });
  const toView = (row) => projectWrappedView(row);
  const availableWeekCancellations = createRequestCancellationRegistry();
  const controller = {
    async list(limit) {
      const bounded = typeof limit === "number" && limit > 0 ? Math.min(MAX_LIST_LIMIT, Math.floor(limit)) : MAX_LIST_LIMIT;
      return (await useCases$12().list(bounded)).map(toView);
    },
    async get(id) {
      const row = await useCases$12().get(id);
      return row ? toView(row) : null;
    },
    async generateLastSevenDays() {
      const result = await generateWrappedInWorker({
        mode: "rolling",
        accountUserId: await deps.accountUserId(),
        nowMs: now()
      });
      if (result.status === "too-quiet" || result.status === "skipped" || !result.wrappedId) {
        return { status: "too-quiet", wrapped: null };
      }
      const wrapped = await controller.get(result.wrappedId);
      deps.notifyChanged?.();
      return { status: result.status === "replaced" ? "replaced" : "created", wrapped };
    },
    async listAvailableWeeks(limit, beforePeriodStart, signal) {
      const bounded = typeof limit === "number" && limit > 0 ? Math.min(MAX_AVAILABLE_WEEK_LIMIT, Math.floor(limit)) : 24;
      return listWrappedAvailableWeeksInWorker({
        nowMs: now(),
        limit: bounded,
        beforePeriodStart: beforePeriodStart ?? null,
        signal
      });
    },
    async generateWeek(periodStart) {
      const result = await generateWrappedInWorker({
        mode: "archive-week",
        accountUserId: await deps.accountUserId(),
        nowMs: now(),
        periodStart
      });
      if (result.status === "too-quiet" || result.status === "skipped" || !result.wrappedId) {
        return { status: "too-quiet", wrapped: null };
      }
      const wrapped = await controller.get(result.wrappedId);
      deps.notifyChanged?.();
      return { status: result.status === "replaced" ? "replaced" : "created", wrapped };
    },
    async getUnseen() {
      const row = await useCases$12().getUnseen();
      return row ? toView(row) : null;
    },
    async markSeen(id) {
      await useCases$12().markSeen(id);
    },
    registerIpcHandlers(handleIpc2) {
      handleIpc2(
        "wrapped:list",
        (_event, limit) => controller.list(typeof limit === "number" ? limit : void 0)
      );
      handleIpc2("wrapped:get", (_event, id) => controller.get(String(id)));
      handleIpc2("wrapped:generateLastSevenDays", () => controller.generateLastSevenDays());
      handleIpc2(
        "wrapped:listAvailableWeeks",
        async (_event, limit, before, requestToken) => {
          const token = typeof requestToken === "string" ? requestToken : null;
          const abortController = token ? availableWeekCancellations.register(token) : null;
          try {
            return await controller.listAvailableWeeks(
              typeof limit === "number" ? limit : void 0,
              typeof before === "string" ? before : null,
              abortController?.signal
            );
          } finally {
            if (token && abortController)
              availableWeekCancellations.complete(token, abortController);
          }
        }
      );
      handleIpc2("wrapped:cancelListAvailableWeeks", (_event, requestToken) => {
        if (typeof requestToken !== "string") return;
        availableWeekCancellations.cancel(requestToken);
      });
      handleIpc2(
        "wrapped:generateWeek",
        (_event, periodStart) => controller.generateWeek(String(periodStart))
      );
      handleIpc2("wrapped:featureFlagEnabled", () => deps.refreshSchedule?.());
      handleIpc2("wrapped:getUnseen", () => controller.getUnseen());
      handleIpc2("wrapped:markSeen", (_event, id) => controller.markSeen(String(id)));
    }
  };
  return controller;
}
const WRAPPED_WEEKLY_LAST_RUN_META_KEY = "wrapped.weekly.lastRunMs";
const WRAPPED_WEEKLY_LAST_PERIOD_META_KEY = "wrapped.weekly.lastPeriodStart";
function createWrappedWeeklyJob(deps) {
  let inFlight = null;
  async function runTick() {
    let accountUserId = null;
    try {
      accountUserId = await deps.accountUserId();
    } catch {
      return "signed-out";
    }
    if (!accountUserId) return "signed-out";
    const nowMs = deps.now();
    const state = deps.readState();
    if (!useCases.isWeeklyWrappedDue({
      nowMs,
      lastRunMs: state.lastRunMs,
      lastPeriodStart: state.lastPeriodStart
    })) {
      return "not-due";
    }
    let result;
    try {
      result = await deps.generate({
        accountUserId,
        nowMs,
        lastRunMs: state.lastRunMs,
        lastPeriodStart: state.lastPeriodStart
      });
    } catch (error) {
      deps.writeState({ lastRunMs: nowMs, lastPeriodStart: state.lastPeriodStart });
      deps.onUnavailable?.(error);
      return "unavailable";
    }
    if (result.status === "skipped") {
      deps.writeState({ lastRunMs: nowMs, lastPeriodStart: state.lastPeriodStart });
      return "skipped";
    }
    deps.writeState({
      lastRunMs: nowMs,
      lastPeriodStart: result.periodStart ?? state.lastPeriodStart
    });
    if (result.status === "too-quiet") return "too-quiet";
    deps.onGenerated?.(result.periodStart);
    return "generated";
  }
  return {
    tick() {
      if (inFlight) return inFlight;
      const run = runTick().finally(() => {
        inFlight = null;
      });
      inFlight = run;
      return run;
    }
  };
}
function createWrappedScheduledTick(deps) {
  const weeklyJob = createWrappedWeeklyJob({
    now: deps.now,
    accountUserId: deps.accountUserId,
    readState: deps.readState,
    writeState: deps.writeState,
    generate: (input) => deps.generate({ mode: "weekly-if-due", ...input }),
    onGenerated: deps.onWeeklyGenerated,
    onUnavailable: deps.onWeeklyUnavailable
  });
  async function runGatedTick() {
    let featureEnabled = false;
    try {
      featureEnabled = await deps.isFeatureEnabled();
    } catch {
    }
    if (!featureEnabled) return null;
    let wrappedEnabled = true;
    try {
      wrappedEnabled = await deps.isWrappedEnabled();
    } catch {
    }
    if (!wrappedEnabled) return null;
    let accountUserId = null;
    try {
      accountUserId = await deps.accountUserId();
    } catch {
    }
    try {
      const launchResult = await deps.generate({
        mode: "launch-recap",
        accountUserId,
        nowMs: deps.now()
      });
      if (launchResult.wrappedId && (launchResult.status === "created" || launchResult.status === "replaced")) {
        deps.onLaunchGenerated?.();
      }
    } catch {
    }
    return weeklyJob.tick();
  }
  let tickInFlight = null;
  let tickQueued = false;
  function requestTick() {
    if (tickInFlight) {
      tickQueued = true;
      return tickInFlight;
    }
    tickInFlight = (async () => {
      try {
        do {
          tickQueued = false;
          await runGatedTick();
        } while (tickQueued);
      } finally {
        tickQueued = false;
        tickInFlight = null;
      }
    })();
    return tickInFlight;
  }
  return {
    tick: requestTick
  };
}
function readState() {
  const rawLastRun = getMeta(WRAPPED_WEEKLY_LAST_RUN_META_KEY);
  const lastRunMs = rawLastRun === null ? null : Number(rawLastRun);
  return {
    lastRunMs: lastRunMs !== null && Number.isFinite(lastRunMs) ? lastRunMs : null,
    lastPeriodStart: getMeta(WRAPPED_WEEKLY_LAST_PERIOD_META_KEY)
  };
}
function writeState(state) {
  setMeta(WRAPPED_WEEKLY_LAST_RUN_META_KEY, String(state.lastRunMs ?? Date.now()));
  if (state.lastPeriodStart) {
    setMeta(WRAPPED_WEEKLY_LAST_PERIOD_META_KEY, state.lastPeriodStart);
  }
}
function createWrappedWeeklyScheduler(deps) {
  const scheduledTick = createWrappedScheduledTick({
    now: () => Date.now(),
    isFeatureEnabled: () => isPosthogFeatureEnabled(useCases.WRAPPED_FLAG),
    isWrappedEnabled: async () => useCases.isWrappedEnabled(await getStorage().settings.get(useCases.WRAPPED_ENABLED_SETTING_KEY)),
    accountUserId: deps.accountUserId,
    readState,
    writeState,
    generate: (input) => generateWrappedInWorker(input),
    onLaunchGenerated: deps.notifyChanged,
    onWeeklyGenerated: (periodStart) => {
      void captureTelemetryEvent("wrapped_weekly_generated", { period_start: periodStart });
      deps.notifyChanged();
    },
    onWeeklyUnavailable: (error) => {
      if (!shouldReportWrappedGenerateAppError(error)) return;
      void captureAppError("main.wrapped.weekly_skipped", error, {
        main_process_fallback: false
      });
    }
  });
  const runtime = new ImproveSchedulerRuntime({
    intervalMs: useCases.WRAPPED_WEEKLY_TICK_MS,
    isEnabled: deps.isEnabled ?? (() => true),
    tick: () => scheduledTick.tick(),
    clearPending: () => {
    },
    setInterval: (callback, intervalMs) => setInterval(callback, intervalMs),
    clearInterval: (handle) => clearInterval(handle),
    unrefInterval: (handle) => handle.unref?.()
  });
  return {
    start: () => runtime.start(),
    refresh: () => runtime.refresh(),
    stop: () => runtime.stop()
  };
}
const FEEDBACK_BOARD_BASE_URL = process.env.BLUME_FEEDBACK_BOARD_URL?.replace(/\/+$/, "") || "https://feedback.blume-page.com";
const REQUEST_TIMEOUT_MS$2 = 1e4;
function requirePostId(value) {
  if (typeof value !== "string" || !/^[0-9a-f-]{36}$/i.test(value)) {
    throw new TypeError("Invalid feedback post id");
  }
  return value;
}
function requireStatus(value) {
  if (value !== "considering" && value !== "planned" && value !== "in_progress" && value !== "shipped" && value !== "declined") {
    throw new TypeError("Invalid feedback status");
  }
  return value;
}
function requirePostInput(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid feedback post");
  }
  const { title, body, anonymous } = value;
  if (typeof title !== "string" || typeof body !== "string") {
    throw new TypeError("Invalid feedback post");
  }
  if (anonymous !== void 0 && typeof anonymous !== "boolean") {
    throw new TypeError("Invalid feedback post");
  }
  return { title, body, ...anonymous !== void 0 ? { anonymous } : {} };
}
function requireCommentInput(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid feedback comment");
  }
  const { postId, body, anonymous } = value;
  if (typeof body !== "string") throw new TypeError("Invalid feedback comment");
  if (anonymous !== void 0 && typeof anonymous !== "boolean") {
    throw new TypeError("Invalid feedback comment");
  }
  return {
    postId: requirePostId(postId),
    body,
    ...anonymous !== void 0 ? { anonymous } : {}
  };
}
function postListQuery(value) {
  if (value === void 0) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("Invalid feedback list query");
  }
  const query = value;
  if (query.sort !== void 0 && query.sort !== "top" && query.sort !== "new") {
    throw new TypeError("Invalid feedback sort");
  }
  return query;
}
async function request(path, init = {}, authentication = "required") {
  let accessToken = null;
  try {
    accessToken = await getFeedbackAccountAccessToken();
  } catch (error) {
    if (authentication === "required") throw error;
  }
  const response = await fetch(`${FEEDBACK_BOARD_BASE_URL}${path}`, {
    ...init,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS$2),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      ...init.headers
    }
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      typeof body?.error === "string" ? body.error : `Feedback board request failed (${response.status})`
    );
  }
  return response.json();
}
function registerFeedbackBoardIpcHandlers(handleIpc2) {
  handleIpc2(
    "feedbackBoard:getAccess",
    () => request("/v1/access", {}, "optional")
  );
  handleIpc2(
    "feedbackBoard:listTop",
    () => request("/v1/posts/top", {}, "optional")
  );
  handleIpc2("feedbackBoard:listPosts", (_event, input) => {
    const query = postListQuery(input);
    const params = new URLSearchParams();
    if (query.sort) params.set("sort", query.sort);
    if (query.status) params.set("status", query.status);
    if (query.limit !== void 0) params.set("limit", String(query.limit));
    if (query.offset !== void 0) params.set("offset", String(query.offset));
    return request(`/v1/posts?${params.toString()}`);
  });
  handleIpc2(
    "feedbackBoard:createPost",
    (_event, input) => request("/v1/posts", {
      method: "POST",
      body: JSON.stringify(requirePostInput(input))
    })
  );
  handleIpc2("feedbackBoard:addVote", (_event, postId) => {
    return request(
      `/v1/posts/${encodeURIComponent(requirePostId(postId))}/vote`,
      { method: "PUT" }
    );
  });
  handleIpc2(
    "feedbackBoard:listComments",
    (_event, postId) => request(
      `/v1/posts/${encodeURIComponent(requirePostId(postId))}/comments`
    )
  );
  handleIpc2("feedbackBoard:createComment", (_event, input) => {
    const comment = requireCommentInput(input);
    return request(
      `/v1/posts/${encodeURIComponent(comment.postId)}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ body: comment.body, anonymous: comment.anonymous })
      }
    );
  });
  handleIpc2(
    "feedbackBoard:updateStatus",
    (_event, postId, status) => request(`/v1/admin/posts/${encodeURIComponent(requirePostId(postId))}`, {
      method: "PATCH",
      body: JSON.stringify({ status: requireStatus(status) })
    })
  );
  handleIpc2(
    "feedbackBoard:deletePost",
    (_event, postId) => request(`/v1/admin/posts/${encodeURIComponent(requirePostId(postId))}`, {
      method: "DELETE"
    })
  );
  handleIpc2(
    "feedbackBoard:deleteComment",
    (_event, commentId) => request(`/v1/admin/comments/${encodeURIComponent(requirePostId(commentId))}`, {
      method: "DELETE"
    })
  );
}
const REQUEST_TIMEOUT_MS$1 = 1e4;
const MAX_PENDING_RESOLUTIONS = 8;
const pending$1 = /* @__PURE__ */ new Map();
function settle(id, active2, intent) {
  if (active2.settled) return;
  active2.settled = true;
  clearTimeout(active2.timeout);
  pending$1.delete(id);
  finishBackgroundProcessRequest(BLUME_BACKGROUND_PROCESS_SERVICES.projectPathResolution, id);
  if (!intent) return;
  try {
    terminateBackgroundProcess(active2.worker, active2.processServiceName, intent);
  } catch {
  }
}
function resolveProjectPathViaWorker(targetPath, requestId2) {
  if (pending$1.has(requestId2)) {
    return Promise.reject(new Error(`duplicate project path request ${requestId2}`));
  }
  if (pending$1.size >= MAX_PENDING_RESOLUTIONS) {
    return Promise.reject(new Error("too many pending project path requests"));
  }
  return new Promise((resolve, reject) => {
    const processServiceName = backgroundProcessServiceInstanceName(
      BLUME_BACKGROUND_PROCESS_SERVICES.projectPathResolution,
      requestId2
    );
    const worker2 = deliveryNative.utilityProcess.fork(_n.join(__dirname, "projectPathResolutionWorker.js"), [], {
      serviceName: processServiceName
    });
    const active2 = {
      worker: worker2,
      processServiceName,
      reject,
      settled: false,
      timeout: setTimeout(() => {
        settle(requestId2, active2, "request-timeout");
        reject(new Error("project path resolution timed out"));
      }, REQUEST_TIMEOUT_MS$1)
    };
    active2.timeout.unref();
    pending$1.set(requestId2, active2);
    startBackgroundProcessRequest(
      BLUME_BACKGROUND_PROCESS_SERVICES.projectPathResolution,
      requestId2
    );
    worker2.on("message", (message) => {
      if (message.type !== "resolve-project-path-result" || message.id !== requestId2 || active2.settled) {
        return;
      }
      settle(requestId2, active2, "request-settled");
      if (message.ok) {
        resolve(message.resolution);
      } else {
        const error = new Error(message.errorMessage);
        if (message.errorName) error.name = message.errorName;
        if (message.errorStack) error.stack = message.errorStack;
        reject(error);
      }
    });
    worker2.on("exit", () => {
      if (active2.settled) return;
      settle(requestId2, active2);
      reject(new Error("project path resolution worker exited"));
    });
    try {
      worker2.postMessage({
        type: "resolve-project-path",
        id: requestId2,
        dbPath: getDbPath(),
        targetPath
      });
    } catch (error) {
      settle(requestId2, active2, "worker-unavailable");
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}
function cancelProjectPathResolution(requestId2) {
  const active2 = pending$1.get(requestId2);
  if (!active2) return;
  settle(requestId2, active2, "request-settled");
  const error = new DOMException("Project path resolution was cancelled.", "AbortError");
  active2.reject(error);
}
function disposeProjectPathResolutionWorkers() {
  for (const [requestId2] of pending$1) cancelProjectPathResolution(requestId2);
}
function registerDesktopDbIpcHandlers(handleIpc2) {
  const lists = /* @__PURE__ */ new Map();
  const projectLists = /* @__PURE__ */ new Map();
  const listKey = (event, token) => {
    if (typeof token !== "string" || token.length > 128 || !token)
      throw new TypeError("Invalid list request token");
    return `${event.sender.id}:${event.processId}:${event.frameId}:${token}`;
  };
  handleIpc2("db:conversations:listForViewCancelable", async (event, opts, token) => {
    const key = listKey(event, token);
    if (lists.has(key)) throw new Error("Duplicate list request token");
    const controller = new AbortController();
    lists.set(key, controller);
    const cancel = () => controller.abort();
    event.sender.once("destroyed", cancel);
    const navigated = (_event, _url, _inPlace, _main, processId, frameId) => {
      if (event.processId === processId && event.frameId === frameId) cancel();
    };
    event.sender.on("did-start-navigation", navigated);
    try {
      return await listConversationsForViewViaWorker(opts, controller.signal);
    } finally {
      lists.delete(key);
      event.sender.removeListener("destroyed", cancel);
      event.sender.removeListener("did-start-navigation", navigated);
    }
  });
  handleIpc2("db:conversations:cancelList", (event, token) => {
    lists.get(listKey(event, token))?.abort();
  });
  handleIpc2(
    "db:projects:list",
    async () => evidencePins.withProjectSetupSummaries(getStorage(), await getStorage().desktopProjects.listProjects())
  );
  handleIpc2("db:projects:listRecent", (_evt, limit) => listRecentProjectsViaWorker(limit));
  handleIpc2("db:projects:listRecentCancelable", async (event, limit, token) => {
    const key = listKey(event, token);
    if (projectLists.has(key)) throw new Error("Duplicate list request token");
    const controller = new AbortController();
    projectLists.set(key, controller);
    const cancel = () => controller.abort();
    event.sender.once("destroyed", cancel);
    const navigated = (_event, _url, _inPlace, _main, processId, frameId) => {
      if (event.processId === processId && event.frameId === frameId) cancel();
    };
    event.sender.on("did-start-navigation", navigated);
    try {
      return await listRecentProjectsViaWorker(limit, controller.signal);
    } finally {
      projectLists.delete(key);
      event.sender.removeListener("destroyed", cancel);
      event.sender.removeListener("did-start-navigation", navigated);
    }
  });
  handleIpc2("db:projects:cancelList", (event, token) => {
    projectLists.get(listKey(event, token))?.abort();
  });
  handleIpc2("db:projects:get", async (_evt, id) => {
    if (typeof id !== "number" || !Number.isSafeInteger(id)) {
      throw new TypeError("Invalid project id");
    }
    return getStorage().desktopProjects.getProject(id);
  });
  handleIpc2("db:projects:resolvePath", (_evt, path, requestId2) => {
    if (typeof path !== "string" || !path.trim() || path.length > 4096) {
      throw new TypeError("Invalid project path resolution target");
    }
    if (typeof requestId2 !== "number" || !Number.isSafeInteger(requestId2)) {
      throw new TypeError("Invalid project path resolution request id");
    }
    return resolveProjectPathViaWorker(path, requestId2);
  });
  handleIpc2("db:projects:cancelResolvePath", (_evt, requestId2) => {
    if (typeof requestId2 !== "number" || !Number.isSafeInteger(requestId2)) {
      throw new TypeError("Invalid project path resolution request id");
    }
    cancelProjectPathResolution(requestId2);
  });
  handleIpc2("db:userTurns:active", () => getStorage().desktopConversations.listActiveUserTurns());
}
function createUsageIpcHandlers({
  fetchUsageReport: fetchUsageReport2,
  setCursorCookie,
  connectProvider,
  openKeychainAccess: openKeychainAccess2,
  setProductAccessAvailable,
  getTotalProcessRunningSeconds
}) {
  return [
    {
      channel: "usage:fetch",
      handler: (_event, force) => fetchUsageReport2(force === true)
    },
    {
      channel: "usage:setCursorCookie",
      handler: (_event, value) => setCursorCookie(value)
    },
    {
      channel: "usage:connectProvider",
      handler: (_event, provider) => connectProvider(provider)
    },
    {
      channel: "usage:openKeychainAccess",
      handler: () => openKeychainAccess2()
    },
    {
      channel: "appUsage:setProductAccessAvailable",
      handler: (_event, available) => {
        if (typeof available !== "boolean") throw new TypeError("Invalid product access state");
        return setProductAccessAvailable(available);
      }
    },
    {
      channel: "appUsage:getTotalProcessRunningSeconds",
      handler: () => getTotalProcessRunningSeconds()
    }
  ];
}
async function openProviderLogin(provider) {
  const projection = projectProviderLoginLaunch(provider);
  if (projection.status !== "ready") throw new Error(projection.detail);
  try {
    await openInTerminal(projection.harnessId, Nl.homedir(), projection.command);
  } catch {
    throw new Error(
      `Blume couldn't open its terminal. Run “${projection.command}” in a terminal, then return to Blume and try again.`
    );
  }
}
async function openKeychainAccess() {
  const projection = projectKeychainAccessLaunch(process.platform);
  if (projection.status === "unsupported") throw new Error(projection.detail);
  await new Promise((resolve, reject) => {
    const child = node_child_process.spawn(projection.command, projection.args, {
      detached: true,
      stdio: "ignore"
    });
    child.once("error", reject);
    child.once("spawn", () => {
      child.unref();
      resolve();
    });
  });
}
function registerUsageIpcHandlers(handleIpc2) {
  for (const { channel, handler } of createUsageIpcHandlers({
    fetchUsageReport: (force) => fetchUsageReport(getSecret(PROVIDER_USAGE_CURSOR_COOKIE_SETTING_KEY), force),
    setCursorCookie: (value) => {
      setSecret(PROVIDER_USAGE_CURSOR_COOKIE_SETTING_KEY, value);
    },
    connectProvider: (provider) => openProviderLogin(provider),
    openKeychainAccess: () => openKeychainAccess(),
    setProductAccessAvailable: (available) => setAppUsageProductAccessAvailable(available),
    getTotalProcessRunningSeconds: () => getTotalAppUsageProcessRunningSeconds()
  })) {
    handleIpc2(channel, handler);
  }
}
const CODEX_APP_BUNDLE_ID = "com.openai.codex";
const CHATGPT_APP_PATHS = ["/Applications/ChatGPT.app", "~/Applications/ChatGPT.app"];
function resolveCodexBrand(input) {
  if (!input.chatgptBuildInstalled) return "codex";
  return input.dockIconPreference?.startsWith("codex-") ? "codex" : "chatgpt";
}
async function detectCodexBrand(ports) {
  try {
    const bundles = await Promise.all(CHATGPT_APP_PATHS.map((path) => ports.bundleIdentifier(path)));
    const chatgptBuildInstalled = bundles.includes(CODEX_APP_BUNDLE_ID);
    if (!chatgptBuildInstalled) return "codex";
    return resolveCodexBrand({
      dockIconPreference: await ports.dockIconPreference(),
      chatgptBuildInstalled
    });
  } catch {
    return "codex";
  }
}
async function anyExists(ports, paths) {
  for (const path of paths) {
    if (await ports.existsInHome(path)) return true;
  }
  return false;
}
async function detectFirstRunAgentEvidence(ports) {
  const harnesses = await Promise.all(
    index.HARNESS_CATALOG.map(async (harness) => ({
      harnessId: harness.id,
      label: harness.label,
      installEvidence: await anyExists(ports, harness.installEvidencePaths ?? harness.configDirs)
    }))
  );
  const otherTools = (await Promise.all(
    index.KNOWN_AGENT_TOOLS.map(
      async (tool) => await anyExists(ports, tool.evidencePaths) ? { id: tool.id, label: tool.label, kind: tool.kind } : null
    )
  )).filter((tool) => tool !== null);
  return { harnesses, otherTools };
}
function projectHarnessSetupLaunch(harnessId, step) {
  const guide = index.harnessSetupGuide(harnessId);
  const command = step === "install" ? guide?.installCommand : step === "connect" ? guide?.authCommand : guide?.startCommand;
  if (!command) {
    return { status: "unsupported", detail: `No ${step} command for harness: ${harnessId}` };
  }
  return { status: "ready", command };
}
function createHarnessFirstRunIpcHandlers({
  detect,
  codexBrand,
  openSetupTerminal,
  suggestProjectFolders: suggestProjectFolders2,
  createStarterFolder,
  managedRouterEnabled,
  managedRouterStatus: managedRouterStatus2,
  setUpManagedPi: setUpManagedPi2,
  openManagedBilling
}) {
  const requireManagedRouter = async (action) => {
    if (!await managedRouterEnabled()) {
      throw new Error("Blume-managed routing is not available for this account.");
    }
    return action();
  };
  return [
    {
      channel: "harnesses:detectFirstRun",
      handler: () => detect()
    },
    {
      channel: "harnesses:codexBrand",
      handler: () => codexBrand()
    },
    {
      channel: "harnesses:suggestProjectFolders",
      handler: () => suggestProjectFolders2()
    },
    {
      channel: "harnesses:createStarterFolder",
      handler: () => createStarterFolder()
    },
    {
      channel: "harnesses:managedRouterStatus",
      handler: () => requireManagedRouter(managedRouterStatus2)
    },
    {
      channel: "harnesses:setUpManagedPi",
      handler: () => requireManagedRouter(setUpManagedPi2)
    },
    {
      channel: "harnesses:openManagedBilling",
      handler: () => requireManagedRouter(openManagedBilling)
    },
    {
      channel: "harnesses:openSetupTerminal",
      handler: (_event, harnessId, step, cwd) => {
        if (typeof harnessId !== "string") throw new TypeError("Invalid harness id");
        if (step !== "install" && step !== "connect" && step !== "start") {
          throw new TypeError("Invalid setup step");
        }
        if (cwd !== void 0 && typeof cwd !== "string") throw new TypeError("Invalid cwd");
        return openSetupTerminal(harnessId, step, cwd);
      }
    }
  ];
}
const PROJECT_PARENTS = [
  "Projects",
  "projects",
  "Code",
  "code",
  "Developer",
  "dev",
  "src",
  "repos",
  "work",
  "Documents/GitHub",
  "Documents/Projects"
];
const MAX_CHILDREN_PER_PARENT = 40;
const MAX_NESTED_CHILDREN = 20;
const DEFAULT_LIMIT = 4;
const STARTER_FOLDER_SEGMENTS = [".blume", "projects", "first-project"];
const STARTER_README = `# First project

This folder was created by Blume so you have somewhere safe to try an AI agent.

Try asking your agent something like:

- "what files are in this folder?"
- "write me a small script that renames files by date"

Nothing here is precious — experiment freely.
`;
function homeRelative(ports, relative) {
  return ports.join(ports.homeDir(), ...relative.split("/"));
}
async function suggestProjectFolders(ports, limit = DEFAULT_LIMIT) {
  const found = [];
  const seen = /* @__PURE__ */ new Set();
  const consider = async (path, name) => {
    const key = path.toLowerCase();
    if (seen.has(key)) return false;
    const isRepository = await ports.exists(ports.join(path, ".git"));
    seen.add(key);
    found.push({
      path,
      name,
      reason: isRepository ? "git" : "recent",
      modifiedAt: await ports.modifiedAt(path) ?? 0
    });
    return isRepository;
  };
  for (const parent of PROJECT_PARENTS) {
    const parentPath = homeRelative(ports, parent);
    const children2 = (await ports.readDirectories(parentPath)).slice(0, MAX_CHILDREN_PER_PARENT);
    for (const name of children2) {
      if (name.startsWith(".")) continue;
      const path = ports.join(parentPath, name);
      const wasRepository = await consider(path, name);
      if (wasRepository) continue;
      const nested = (await ports.readDirectories(path)).slice(0, MAX_NESTED_CHILDREN);
      for (const child of nested) {
        if (child.startsWith(".")) continue;
        await consider(ports.join(path, child), child);
      }
    }
  }
  return found.sort((a, b) => {
    if (a.reason !== b.reason) return a.reason === "git" ? -1 : 1;
    return b.modifiedAt - a.modifiedAt;
  }).slice(0, limit).map(({ path, name, reason }) => ({ path, name, reason }));
}
async function createStarterProjectFolder(ports) {
  const path = ports.join(ports.homeDir(), ...STARTER_FOLDER_SEGMENTS);
  await ports.makeDirectory(path);
  const readme = ports.join(path, "README.md");
  if (!await ports.exists(readme)) await ports.writeFile(readme, STARTER_README);
  return path;
}
const BLUME_PI_PROVIDER = "blume";
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function stringify(value) {
  return `${JSON.stringify(value, null, 2)}
`;
}
function planManagedPiSetup(input) {
  const { credential, current } = input;
  const providers2 = isRecord(current.models?.providers) ? { ...current.models.providers } : {};
  providers2[BLUME_PI_PROVIDER] = {
    baseUrl: credential.baseUrl,
    api: "openai-completions",
    // The real credential lives in auth.json, which is 0600. Pi still wants a
    // value here so the models count as authenticated; auth.json wins.
    apiKey: "blume-managed",
    models: input.models.map((model) => ({
      id: model.id,
      name: `${model.label} (via Blume)`,
      ...model.contextWindow === void 0 ? {} : { contextWindow: model.contextWindow },
      ...model.maxTokens === void 0 ? {} : { maxTokens: model.maxTokens }
    }))
  };
  const auth = { ...current.auth ?? {} };
  auth[BLUME_PI_PROVIDER] = { type: "api_key", key: credential.apiKey };
  const settings = { ...current.settings ?? {} };
  if (typeof settings.defaultProvider !== "string") {
    settings.defaultProvider = BLUME_PI_PROVIDER;
    settings.defaultModel = credential.model;
  }
  return [
    { path: ".pi/agent/models.json", contents: stringify({ ...current.models ?? {}, providers: providers2 }) },
    { path: ".pi/agent/auth.json", contents: stringify(auth), mode: 384 },
    { path: ".pi/agent/settings.json", contents: stringify(settings) }
  ];
}
function hasManagedPiSetup(current) {
  const providers2 = isRecord(current.models?.providers) ? current.models.providers : null;
  const provider = providers2?.[BLUME_PI_PROVIDER];
  const credential = isRecord(current.auth) ? current.auth[BLUME_PI_PROVIDER] : null;
  return isRecord(provider) && isRecord(credential) && typeof credential.key === "string";
}
const MICRO_USD_PER_USD = 1e6;
const ROUTER_MODELS = [
  {
    id: "google/gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    inputPerMillionUsd: 0.3,
    outputPerMillionUsd: 2.5,
    cachedInputPerMillionUsd: 0.075
  },
  {
    id: "google/gemini-2.5-pro",
    label: "Gemini 2.5 Pro",
    inputPerMillionUsd: 1.25,
    outputPerMillionUsd: 10,
    cachedInputPerMillionUsd: 0.31
  }
];
ROUTER_MODELS[0].id;
function routerModel(id) {
  return ROUTER_MODELS.find((model) => model.id === id) ?? null;
}
function nonEmptyString(value) {
  if (typeof value !== "string") return void 0;
  const trimmed = value.trim();
  return trimmed || void 0;
}
function managedPaymentMethodsFromJson(value) {
  if (!Array.isArray(value)) return void 0;
  return value.flatMap((candidate, index2) => {
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) return [];
    const record = candidate;
    const type = record.type === "card" || record.type === "bank" ? record.type : "other";
    const method = {
      id: nonEmptyString(record.id) ?? `payment-method-${index2 + 1}`,
      type,
      brand: nonEmptyString(record.brand) ?? (type === "card" ? "Card" : type === "bank" ? "Bank account" : "Payment method")
    };
    const last4 = nonEmptyString(record.last4);
    if (last4) method.last4 = last4;
    if (typeof record.expiryMonth === "number" && Number.isInteger(record.expiryMonth) && record.expiryMonth >= 1 && record.expiryMonth <= 12) {
      method.expiryMonth = record.expiryMonth;
    }
    if (typeof record.expiryYear === "number" && Number.isInteger(record.expiryYear) && record.expiryYear > 0) {
      method.expiryYear = record.expiryYear;
    }
    return [method];
  });
}
const ROUTER_URL = process.env.BLUME_ROUTER_URL?.replace(/\/+$/, "");
const REQUEST_TIMEOUT_MS = 1e4;
async function routerFetch(path, init = {}) {
  if (!ROUTER_URL) return null;
  const controller = new AbortController();
  const timer2 = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(`${ROUTER_URL}${path}`, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer2);
  }
}
async function readJson(path) {
  try {
    const parsed = JSON.parse(await require$$0$1.readFile(path, "utf8"));
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
async function readPiConfig() {
  const home = Nl.homedir();
  const [models, auth, settings] = await Promise.all([
    readJson(_n.join(home, ".pi/agent/models.json")),
    readJson(_n.join(home, ".pi/agent/auth.json")),
    readJson(_n.join(home, ".pi/agent/settings.json"))
  ]);
  return { models, auth, settings };
}
async function routerAvailable() {
  const response = await routerFetch("/health");
  if (!response?.ok) return false;
  const body = await response.json().catch(() => null);
  return body?.status === "ready";
}
async function managedRouterStatus() {
  const [available, session, config] = await Promise.all([
    routerAvailable(),
    getAccountSession().catch(() => null),
    readPiConfig()
  ]);
  const base = {
    available,
    signedIn: session !== null,
    configured: hasManagedPiSetup(config)
  };
  if (!available || session === null) return { ...base, grantRemainingUsd: null };
  try {
    const token = await getRouterAccountAccessToken();
    const response = await routerFetch("/v1/account", {
      headers: { authorization: `Bearer ${token}` }
    });
    if (!response?.ok) return { ...base, grantRemainingUsd: null };
    const body = await response.json();
    const paymentMethods = managedPaymentMethodsFromJson(body.paymentMethods);
    return {
      ...base,
      grantRemainingUsd: typeof body.grantRemainingMicroUsd === "number" ? body.grantRemainingMicroUsd / 1e6 : null,
      ...typeof body.billedMicroUsd === "number" ? { billedUsd: body.billedMicroUsd / 1e6 } : {},
      ...typeof body.billingReady === "boolean" ? { billingReady: body.billingReady } : {},
      ...typeof body.monthlyCapMicroUsd === "number" ? { monthlyCapUsd: body.monthlyCapMicroUsd / 1e6 } : {},
      ...paymentMethods === void 0 ? {} : { paymentMethods }
    };
  } catch {
    return { ...base, grantRemainingUsd: null };
  }
}
async function managedBillingUrl() {
  if (!await routerAvailable()) {
    return { status: "unavailable", reason: "The Blume router is not available yet." };
  }
  const session = await getAccountSession().catch(() => null);
  if (!session) return { status: "unavailable", reason: "Sign in to Blume first." };
  let token;
  try {
    token = await getRouterAccountAccessToken();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return { status: "unavailable", reason: `Could not get a token for the router. ${detail}` };
  }
  const response = await routerFetch("/v1/billing/session", {
    method: "POST",
    headers: { authorization: `Bearer ${token}` }
  });
  if (!response?.ok) {
    return {
      status: "unavailable",
      reason: "Billing is not available right now. Try again shortly."
    };
  }
  const body = await response.json().catch(() => null);
  if (typeof body?.url !== "string") {
    return { status: "unavailable", reason: "Billing sent something Blume could not read." };
  }
  try {
    const url = new URL(body.url);
    if (url.protocol !== "https:") throw new Error("unsafe protocol");
    return { status: "ready", url: url.toString() };
  } catch {
    return { status: "unavailable", reason: "Billing sent an unsafe link." };
  }
}
async function setUpManagedPi() {
  if (!await routerAvailable()) {
    return { status: "unavailable", reason: "The Blume router is not available yet." };
  }
  const session = await getAccountSession().catch(() => null);
  if (!session) return { status: "needs-sign-in" };
  if (!await resolveCommand("pi")) return { status: "needs-install" };
  let token;
  try {
    token = await getRouterAccountAccessToken();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return {
      status: "unavailable",
      reason: `Blume is signed in, but could not get a token for the router. ${detail}`
    };
  }
  const response = await routerFetch("/v1/keys", {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({})
  });
  if (!response) {
    return { status: "unavailable", reason: "Blume could not reach the router." };
  }
  if (response.status === 401) {
    return {
      status: "unavailable",
      reason: "The router did not accept this account’s token. Blume’s services may be out of step."
    };
  }
  if (!response.ok) {
    return { status: "unavailable", reason: "The router refused to set this machine up." };
  }
  const body = await response.json().catch(() => null);
  if (typeof body?.apiKey !== "string" || typeof body.baseUrl !== "string" || typeof body.model !== "string") {
    return { status: "unavailable", reason: "The router sent something Blume could not read." };
  }
  const edits = planManagedPiSetup({
    credential: { apiKey: body.apiKey, baseUrl: body.baseUrl, model: body.model },
    models: (routerModel(body.model) ? [routerModel(body.model)] : ROUTER_MODELS).map((model) => ({
      id: model.id,
      label: model.label
    })),
    current: await readPiConfig()
  });
  const home = Nl.homedir();
  for (const edit of edits) {
    const target = _n.join(home, edit.path);
    await require$$0$1.mkdir(_n.dirname(target), { recursive: true });
    await require$$0$1.writeFile(target, edit.contents, "utf8");
    if (edit.mode !== void 0) await require$$0$1.chmod(target, edit.mode);
  }
  const grantMicroUsd = Number(body.account?.grantRemainingMicroUsd ?? 0);
  return {
    status: "ready",
    model: body.model,
    grantRemainingUsd: Number.isFinite(grantMicroUsd) ? grantMicroUsd / MICRO_USD_PER_USD : 0
  };
}
async function existsInHome(relativePath) {
  try {
    await require$$0$1.access(_n.join(Nl.homedir(), ...relativePath.split("/")));
    return true;
  } catch {
    return false;
  }
}
const execFileAsync = require$$1.promisify(node_child_process.execFile);
async function readPlistValue(command, args) {
  try {
    const { stdout } = await execFileAsync(command, args, { timeout: 2e3 });
    return stdout.trim() || null;
  } catch {
    return null;
  }
}
const codexBrandPorts = {
  dockIconPreference: () => readPlistValue("/usr/bin/defaults", ["read", CODEX_APP_BUNDLE_ID, "DockIconPreference"]),
  bundleIdentifier: async (path) => {
    const appPath = path.startsWith("~/") ? _n.join(Nl.homedir(), path.slice(2)) : path;
    if (!await projectSuggestionPorts.exists(_n.join(appPath, "Contents", "Info.plist"))) return null;
    return readPlistValue("/usr/bin/plutil", [
      "-extract",
      "CFBundleIdentifier",
      "raw",
      "-o",
      "-",
      _n.join(appPath, "Contents", "Info.plist")
    ]);
  }
};
const projectSuggestionPorts = {
  homeDir: () => Nl.homedir(),
  join: (...parts) => _n.join(...parts),
  readDirectories: async (path) => {
    try {
      const entries = await require$$0$1.readdir(path, { withFileTypes: true });
      return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch {
      return [];
    }
  },
  exists: async (path) => {
    try {
      await require$$0$1.access(path);
      return true;
    } catch {
      return false;
    }
  },
  modifiedAt: async (path) => {
    try {
      return (await require$$0$1.stat(path)).mtimeMs;
    } catch {
      return null;
    }
  },
  makeDirectory: async (path) => {
    await require$$0$1.mkdir(path, { recursive: true });
  },
  writeFile: async (path, content) => {
    await require$$0$1.writeFile(path, content, "utf8");
  }
};
function registerHarnessFirstRunIpcHandlers(handleIpc2) {
  for (const { channel, handler } of createHarnessFirstRunIpcHandlers({
    detect: () => detectFirstRunAgentEvidence({ existsInHome }),
    codexBrand: async () => process.platform === "darwin" ? detectCodexBrand(codexBrandPorts) : "codex",
    suggestProjectFolders: () => suggestProjectFolders(projectSuggestionPorts),
    createStarterFolder: () => createStarterProjectFolder(projectSuggestionPorts),
    managedRouterEnabled: () => isPosthogFeatureEnabled(FIRST_RUN_BLUME_ROUTER_FLAG),
    managedRouterStatus: () => managedRouterStatus(),
    setUpManagedPi: () => setUpManagedPi(),
    openManagedBilling: async () => {
      const billing = await managedBillingUrl();
      if (billing.status !== "ready") return { ok: false, reason: billing.reason };
      await deliveryNative.shell.openExternal(billing.url);
      return { ok: true };
    },
    openSetupTerminal: async (harnessId, step, cwd) => {
      const projection = projectHarnessSetupLaunch(harnessId, step);
      if (projection.status !== "ready") throw new Error(projection.detail);
      try {
        await launchExternalTerminal(cwd?.trim() || Nl.homedir(), projection.command);
      } catch {
        throw new Error(
          `Blume couldn't open your terminal. Open it manually and run “${projection.command}”.`
        );
      }
    }
  })) {
    handleIpc2(channel, handler);
  }
}
const SEARCH_TIMEOUT_MS = 15e3;
const SEARCH_RETRY_COOLDOWN_MS = 6e4;
const SEARCH_IDLE_MS = 5 * 6e4;
const SERVICE$1 = BLUME_BACKGROUND_PROCESS_SERVICES.search;
let worker = null;
let nextSearchId = 0;
let pending = null;
let lastFailureAtMs$1 = null;
let lastFailureTelemetryAtMs = null;
let disposed$1 = false;
const idleShutdown = createIdleShutdown(SEARCH_IDLE_MS, () => {
  if (!pending) stopWorker("idle");
});
class SearchSupersededError extends Error {
  constructor() {
    super("a newer search replaced this one");
    this.name = "SearchSupersededError";
  }
}
class SearchWorkerUnavailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "SearchWorkerUnavailableError";
  }
}
function unavailableError(error, fallback) {
  const message = error instanceof Error ? error.message : String(error || fallback);
  return new SearchWorkerUnavailableError(message || fallback);
}
function recordWorkerFailure(error, phase) {
  const now = Date.now();
  lastFailureAtMs$1 = now;
  if (lastFailureTelemetryAtMs !== null && now - lastFailureTelemetryAtMs < SEARCH_RETRY_COOLDOWN_MS) {
    return;
  }
  lastFailureTelemetryAtMs = now;
  void captureAppError("main.search.worker_unavailable", error, {
    phase,
    main_process_fallback: false
  });
}
function coolingDown() {
  return lastFailureAtMs$1 !== null && Date.now() - lastFailureAtMs$1 < SEARCH_RETRY_COOLDOWN_MS;
}
function stopWorker(intent) {
  const current = worker;
  worker = null;
  if (!current) return;
  try {
    terminateBackgroundProcess(current, SERVICE$1, intent);
  } catch {
  }
}
function takePending(id) {
  const current = pending;
  if (!current || current.id !== id) return null;
  pending = null;
  clearTimeout(current.timeout);
  finishBackgroundProcessRequest(SERVICE$1, id);
  if (worker) idleShutdown.schedule();
  return current;
}
function failWorker(error, phase) {
  stopWorker(phase === "timeout" ? "request-timeout" : "worker-unavailable");
  recordWorkerFailure(error, phase);
  if (pending) takePending(pending.id)?.reject(error);
}
function ensureWorker() {
  idleShutdown.cancel();
  if (worker) return worker;
  const forked = deliveryNative.utilityProcess.fork(pn.join(__dirname, "searchWorker.js"), [], {
    serviceName: SERVICE$1
  });
  forked.on("message", (message) => {
    if (worker !== forked || message?.type !== "search-result") return;
    const current = takePending(message.id);
    if (!current) return;
    if (message.ok) {
      lastFailureAtMs$1 = null;
      current.resolve(message.page);
      return;
    }
    const error = new SearchWorkerUnavailableError(message.errorMessage);
    if (message.errorName) error.name = message.errorName;
    if (message.errorStack) error.stack = message.errorStack;
    current.reject(error);
  });
  forked.on("exit", () => {
    if (worker !== forked) return;
    worker = null;
    if (pending) failWorker(new SearchWorkerUnavailableError("search worker exited"), "exit");
  });
  worker = forked;
  return forked;
}
function disposeSearchWorker() {
  disposed$1 = true;
  idleShutdown.cancel();
  if (pending) takePending(pending.id)?.reject(new Error("search worker disposed"));
  clearBackgroundProcessRequests(SERVICE$1);
  stopWorker("dispose");
}
function searchViaUtilityProcess(input) {
  if (pending) takePending(pending.id)?.reject(new SearchSupersededError());
  if (disposed$1) return Promise.reject(new Error("search worker disposed"));
  if (coolingDown()) {
    return Promise.reject(
      new SearchWorkerUnavailableError("search worker circuit breaker is cooling down")
    );
  }
  const id = ++nextSearchId;
  return new Promise((resolve, reject) => {
    let target;
    try {
      target = ensureWorker();
    } catch (error) {
      const unavailable = unavailableError(error, "failed to spawn search worker");
      recordWorkerFailure(unavailable, "spawn");
      reject(unavailable);
      return;
    }
    const timeout = setTimeout(() => {
      if (pending?.id !== id) return;
      failWorker(new SearchWorkerUnavailableError("search worker timed out"), "timeout");
    }, SEARCH_TIMEOUT_MS);
    timeout.unref();
    pending = { id, timeout, resolve, reject };
    startBackgroundProcessRequest(SERVICE$1, id);
    try {
      target.postMessage({ type: "search", id, dbPath: getDbPath(), input });
    } catch (error) {
      failWorker(unavailableError(error, "failed to message search worker"), "message");
    }
  });
}
function registerNativeIpcHandlers({
  handleIpc: handleIpc2,
  conversationRuntime: conversationRuntime2,
  notifyRenderersChanged: notifyRenderersChanged2,
  desktopSetup: desktopSetup2,
  desktopSettings: desktopSettings2,
  nativeWindow: nativeWindow2,
  announcements: announcements2,
  careers: careers2,
  nativeImageExport: nativeImageExport2,
  nativeFolderPicker,
  isPosthogFeatureEnabled: isPosthogFeatureEnabled2,
  getPosthogFeatureFlagValue: getPosthogFeatureFlagValue2,
  getPosthogFeatureFlagEvaluations: getPosthogFeatureFlagEvaluations2,
  onConversationOpened
}) {
  const continueConversation = harnessCli.createConversationContinuationService({
    prepare: prepareConversationViaWorker,
    ingest: (prepared) => conversationRuntime2.refreshFromDisk(conversationRuntime2.dayMs, {
      targetPaths: [prepared.sourcePath],
      invalidateDiscoveryCache: true
    }),
    rollback: rollbackConversationViaWorker,
    onCommitted: notifyRenderersChanged2
  });
  for (const { channel, handler } of createConversationMainIpcHandlers({
    runtime: conversationRuntime2,
    notifyChanged: notifyRenderersChanged2,
    onConversationOpened
  })) {
    handleIpc2(channel, handler);
  }
  handleIpc2("conversations:copy", async (_event, ref, kind) => {
    if (typeof ref !== "string" || !ref.trim()) throw new TypeError("Invalid conversation ref");
    if (kind !== "path" && kind !== "full-transcript" && kind !== "user-messages") {
      throw new TypeError("Invalid conversation copy kind");
    }
    await runConversationAction({ action: "copy", ref, kind });
  });
  handleIpc2("conversations:openLocation", async (_event, ref, target) => {
    if (typeof ref !== "string" || !ref.trim()) throw new TypeError("Invalid conversation ref");
    if (target !== "finder" && target !== "vscode" && target !== "zed") {
      throw new TypeError("Invalid conversation open target");
    }
    await runConversationAction({ action: "open", ref, target });
  });
  handleIpc2("system:openFileLocation", async (_event, path, target) => {
    if (typeof path !== "string" || !path.trim()) throw new TypeError("Invalid file path");
    if (target !== "finder" && target !== "vscode" && target !== "zed") {
      throw new TypeError("Invalid file open target");
    }
    await runConversationAction({ action: "open-file", path, target });
  });
  handleIpc2("system:openFolderLocation", async (_event, path) => {
    if (typeof path !== "string" || !path.trim()) throw new TypeError("Invalid folder path");
    await runConversationAction({ action: "open-folder", path });
  });
  handleIpc2("system:selectFolder", () => nativeFolderPicker.selectFolder());
  handleIpc2("conversations:continue", async (_event, ref, target) => {
    if (typeof ref !== "string" || !ref.trim()) throw new TypeError("Invalid conversation ref");
    if (target !== "claude" && target !== "codex") {
      throw new TypeError("Invalid conversation continuation target");
    }
    return continueConversation(ref, target);
  });
  registerDesktopDbIpcHandlers(handleIpc2);
  handleIpc2(
    "search:query",
    (_event, input) => searchViaUtilityProcess(useCases$1.parseGlobalSearchQuery(input))
  );
  registerUsageIpcHandlers(handleIpc2);
  registerHarnessFirstRunIpcHandlers(handleIpc2);
  registerTerminalIpcHandlers(handleIpc2, nativeWindow2);
  handleIpc2(
    "signalAnalytics:getDashboard",
    (_event, input) => getSignalAnalyticsDashboard(
      input?.signals === void 0 ? void 0 : { signals: signalAnalytics.parseHostedSignalFacts(input.signals) }
    )
  );
  registerReferralsIpcHandlers(handleIpc2);
  desktopSettings2.registerIpcHandlers(handleIpc2);
  registerPerfIpcHandlers(handleIpc2);
  registerLoggerIpcHandlers(handleIpc2);
  desktopSetup2.registerIpcHandlers(handleIpc2);
  registerIdentityIpcHandlers(handleIpc2);
  registerChatwootIpcHandlers(handleIpc2);
  registerAccountIpcHandlers(handleIpc2);
  registerFeedbackBoardIpcHandlers(handleIpc2);
  index$1.registerBlumeHomeIpcHandlers(handleIpc2);
  announcements2.registerIpcHandlers(handleIpc2);
  careers2.registerIpcHandlers(handleIpc2);
  handleIpc2("posthog:featureFlagEnabled", (_event, flagKey) => {
    if (!isPosthogFeatureFlagKey(flagKey)) throw new TypeError("Invalid PostHog feature flag key");
    return isPosthogFeatureEnabled2(flagKey);
  });
  handleIpc2("posthog:featureFlagValue", (_event, flagKey) => {
    if (!isPosthogFeatureFlagKey(flagKey) && !isPosthogExperimentKey(flagKey)) {
      throw new TypeError("Invalid PostHog feature flag key");
    }
    return getPosthogFeatureFlagValue2(flagKey);
  });
  handleIpc2("posthog:featureFlagEvaluations", () => getPosthogFeatureFlagEvaluations2());
  handleIpc2(
    "harnesses:list",
    async () => Promise.all(
      LOCAL_HARNESSES.map(async ({ harnessId, label, bin }) => ({
        harnessId,
        label,
        available: await commandExists(bin)
      }))
    )
  );
  nativeWindow2.registerIpcHandlers(handleIpc2);
  nativeImageExport2.registerIpcHandlers(handleIpc2);
}
const LOCAL_HARNESSES = [
  { harnessId: "claude", label: "Claude Code", bin: "claude" },
  { harnessId: "codex", label: "Codex", bin: "codex" }
];
const SEARCH_INDEX_INACTIVITY_MS = 9e4;
const SEARCH_INDEX_RETRY_COOLDOWN_MS = 5 * 6e4;
const SERVICE = BLUME_BACKGROUND_PROCESS_SERVICES.searchIndex;
let active = null;
let nextPassId = 0;
let timer = null;
let started = false;
let disposed = false;
let lastFailureAtMs = null;
function schedule(delayMs) {
  if (disposed) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    runSearchIndexPassNow();
    schedule(searchIndexing.SEARCH_INDEX_INTERVAL_MS);
  }, delayMs);
  timer.unref();
}
function finish(pass, intent) {
  if (active !== pass) return;
  active = null;
  if (pass.watchdog) clearTimeout(pass.watchdog);
  finishBackgroundProcessRequest(SERVICE, pass.id);
  if (intent !== "request-settled") {
    try {
      pass.worker.postMessage({ type: "stop", id: pass.id });
    } catch {
    }
  }
  try {
    terminateBackgroundProcess(pass.worker, SERVICE, intent);
  } catch {
  }
}
function fail(pass, error, phase) {
  if (active !== pass) return;
  lastFailureAtMs = Date.now();
  finish(pass, phase === "timeout" ? "request-timeout" : "request-settled");
  void captureAppError("main.search.index_worker_failed", error, {
    phase,
    main_process_fallback: false
  });
}
function armWatchdog(pass) {
  if (pass.watchdog) clearTimeout(pass.watchdog);
  pass.watchdog = setTimeout(
    () => fail(pass, new Error("search index worker stopped responding"), "timeout"),
    SEARCH_INDEX_INACTIVITY_MS
  );
  pass.watchdog.unref();
}
function runSearchIndexPassNow() {
  if (disposed || active) return false;
  if (lastFailureAtMs !== null && Date.now() - lastFailureAtMs < SEARCH_INDEX_RETRY_COOLDOWN_MS) {
    return false;
  }
  let worker2;
  try {
    worker2 = deliveryNative.utilityProcess.fork(pn.join(__dirname, "searchIndexWorker.js"), [], {
      serviceName: SERVICE
    });
  } catch (error) {
    lastFailureAtMs = Date.now();
    void captureAppError("main.search.index_worker_failed", error, {
      phase: "spawn",
      main_process_fallback: false
    });
    return false;
  }
  const pass = { id: ++nextPassId, worker: worker2, watchdog: null };
  active = pass;
  startBackgroundProcessRequest(SERVICE, pass.id);
  armWatchdog(pass);
  worker2.on("message", (message) => {
    if (active !== pass || message?.id !== pass.id) return;
    if (message.type === "progress") {
      armWatchdog(pass);
      return;
    }
    if (message.ok) {
      lastFailureAtMs = null;
      finish(pass, "request-settled");
    } else {
      const error = new Error(message.errorMessage);
      if (message.errorName) error.name = message.errorName;
      fail(pass, error, "pass");
    }
  });
  worker2.on("exit", () => {
    if (active === pass) fail(pass, new Error("search index worker exited"), "exit");
  });
  try {
    worker2.postMessage({ type: "run", id: pass.id, dbPath: getDbPath(), commits: true });
  } catch (error) {
    fail(pass, error instanceof Error ? error : new Error(String(error)), "message");
  }
  return true;
}
function startSearchIndexing() {
  if (started || disposed) return;
  started = true;
  schedule(searchIndexing.SEARCH_INDEX_START_DELAY_MS);
}
function disposeSearchIndexing() {
  disposed = true;
  if (timer) clearTimeout(timer);
  timer = null;
  if (active) finish(active, "dispose");
  clearBackgroundProcessRequests(SERVICE);
}
const ANNOUNCEMENTS_PRODUCTION_URL = "https://auth.blume.codes";
function announcementPlatform(platform) {
  if (platform === "darwin") return "macos";
  if (platform === "win32") return "windows";
  if (platform === "linux") return "linux";
  return null;
}
function httpsUrl(value) {
  if (typeof value !== "string" || value.length > 2048) throw new TypeError("Invalid URL");
  const parsed = new URL(value);
  if (parsed.protocol !== "https:") throw new TypeError("Announcement URLs must use HTTPS");
  return parsed.toString();
}
function createDesktopAnnouncementsFacade(deps) {
  const platform = announcementPlatform(deps.platform);
  const baseUrl = (deps.baseUrl ?? ANNOUNCEMENTS_PRODUCTION_URL).replace(/\/+$/, "");
  const request2 = deps.fetch ?? ((url, init) => fetch(url, init));
  async function listActive() {
    if (!platform) return [];
    const target = { platform, channel: deps.channel, appVersion: deps.appVersion() };
    const query = new URLSearchParams(target);
    const response = await request2(`${baseUrl}/v1/announcements/active?${query}`, {
      signal: AbortSignal.timeout(IMPROVE_CONTROL_TIMEOUT_MS),
      redirect: "error"
    });
    if (response.status === 404) return [];
    if (!response.ok) throw new Error(`announcements request failed (${response.status})`);
    return userAgentMcp.parseActiveAnnouncementsResponse(await response.json());
  }
  return {
    registerIpcHandlers(handleIpc2) {
      handleIpc2("announcements:listActive", () => listActive());
      handleIpc2("announcements:copyPrompt", (_event, value) => {
        if (typeof value !== "string" || !value.trim() || value.length > 2e4) {
          throw new TypeError("Invalid announcement prompt");
        }
        deps.copyText(value);
      });
      handleIpc2(
        "announcements:openUrl",
        (_event, value) => deps.openExternal(httpsUrl(value))
      );
    }
  };
}
const CAREERS_TIMEOUT_MS = 5e3;
function createDesktopCareersFacade(deps) {
  const endpoint = deps.endpoint?.trim() || CAREERS_PRODUCTION_URL;
  const request2 = deps.fetch ?? globalThis.fetch;
  async function listOpenings() {
    const response = await request2(endpoint, {
      signal: AbortSignal.timeout(CAREERS_TIMEOUT_MS),
      redirect: "error"
    });
    if (!response.ok) throw new Error(`careers request failed (${response.status})`);
    return parseCareerOpeningsResponse(await response.json()).openings;
  }
  return {
    registerIpcHandlers(handleIpc2) {
      handleIpc2("careers:listOpenings", () => listOpenings());
      handleIpc2("careers:openOpening", (_event, value) => {
        if (typeof value !== "string" || !isAllowedCareerDestination(value)) {
          throw new TypeError("Invalid career destination");
        }
        return deps.openExternal(value);
      });
    }
  };
}
const ACCOUNT_SETTING_PREFIX = "account.";
const MAX_ACCOUNT_SETTINGS = 32;
const MAX_ACCOUNT_SETTING_LENGTH = 1e6;
function parseAccountSettings(encoded) {
  const value = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"));
  if (!Array.isArray(value) || value.length > MAX_ACCOUNT_SETTINGS) {
    throw new Error("Invalid dev account session import");
  }
  return value.map((entry) => {
    if (!entry || typeof entry !== "object" || typeof entry.key !== "string" || !entry.key.startsWith(ACCOUNT_SETTING_PREFIX) || typeof entry.value !== "string" || entry.value.length > MAX_ACCOUNT_SETTING_LENGTH) {
      throw new Error("Invalid dev account session setting");
    }
    return { key: entry.key, value: entry.value };
  });
}
async function replaceDevAccountSettings(settings) {
  const current = getAllSettings();
  const incoming = new Map(settings.map(({ key, value }) => [key, value]));
  const writes = [];
  for (const [key, value] of Object.entries(current)) {
    if (key.startsWith(ACCOUNT_SETTING_PREFIX) && !incoming.has(key) && value !== "") {
      writes.push(setSettingAsync(key, ""));
    }
  }
  for (const { key, value } of settings) {
    if (current[key] !== value) writes.push(setSettingAsync(key, value));
  }
  await Promise.all(writes);
}
async function initializeDevAccountSession() {
  if (process.env.BLUME_DEV_INSTALL !== "1") return;
  if (process.env.BLUME_DEV_SIGNED_OUT === "1") {
    await replaceDevAccountSettings([]);
    return;
  }
  const accountSessionImport = process.env.BLUME_DEV_ACCOUNT_SESSION_IMPORT?.trim();
  if (!accountSessionImport) return;
  await replaceDevAccountSettings(parseAccountSettings(accountSessionImport));
}
const __vite_import_meta_env__ = { "MAIN_VITE_BLUME_RELEASE_BUNDLE": "blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9", "MAIN_VITE_BLUME_RELEASE_CHANNEL": "stable", "MAIN_VITE_BLUME_RELEASE_SHA": "bd358244228f4c4fa316832ce3ec57d2bd4b9ce9", "MAIN_VITE_BLUME_RELEASE_VERSION": "2.0.26" };
const devCdpPort = normalizeDevCdpPort(process.env.BLUME_DEV_CDP_PORT);
if (process.env.NODE_ENV === "development" && devCdpPort !== null) {
  deliveryNative.app.commandLine.appendSwitch("remote-debugging-port", String(devCdpPort));
}
initSentry();
const devRuntime = desktopDevRuntimeCapabilities();
deliveryAccounts.onChanged?.(clearPosthogFeatureFlagCache);
const desktopSetup = createDesktopSetupFacade({
  getSetupStore: () => getStorage().setup,
  currentAppVersion: () => deliveryNative.app.getVersion(),
  appPath: () => deliveryNative.app.getAppPath(),
  resourcesPath: () => process.resourcesPath,
  isDev: utils.is.dev,
  // Harness configuration is machine-global. Like dev, canary observes it but
  // does not rewrite stable's hooks/rules automatically at startup.
  skipStartupInstall: !devRuntime.startupInstall,
  blumeHome: index$1.getBlumeRoot,
  getArtifactSyncAccessToken: getArtifactSyncAccountAccessToken,
  isArtifactSyncEnabled: () => isPosthogFeatureEnabled(ARTIFACT_SYNC_FLAG),
  artifactSyncUrl: process.env.BLUME_ARTIFACT_SYNC_URL,
  devInstallEnv: () => process.env.BLUME_DEV_INSTALL,
  captureAppError
});
const announcements = createDesktopAnnouncementsFacade({
  appVersion: () => deliveryNative.app.getVersion(),
  platform: process.platform,
  channel: index$1.desktopReleaseChannel,
  baseUrl: process.env.BLUME_AUTH_URL,
  copyText: (value) => deliveryNative.clipboard.writeText(value),
  openExternal: (url) => deliveryNative.shell.openExternal(url)
});
const careers = createDesktopCareersFacade({
  endpoint: process.env.BLUME_CAREERS_URL,
  openExternal: (url) => deliveryNative.shell.openExternal(url)
});
const releaseMetadata = index$1.resolveDesktopReleaseMetadata(deliveryNative.app.getVersion(), __vite_import_meta_env__);
const appIcon = utils.is.dev ? devIcon : icon;
const flowerAssets = {
  bluebell: bluebellFlowerIcon,
  forgetmenot: forgetmenotFlowerIcon,
  tulip: tulipFlowerIcon,
  sunflower: sunflowerFlowerIcon,
  lantana: lantanaFlowerIcon,
  daylily: daylilyFlowerIcon
};
const stableDockFlowerAssets = {
  bluebell: stableBluebellDockIcon,
  forgetmenot: stableForgetmenotDockIcon,
  tulip: stableTulipDockIcon,
  sunflower: stableSunflowerDockIcon,
  lantana: stableLantanaDockIcon,
  daylily: stableDaylilyDockIcon
};
const devDockFlowerAssets = {
  bluebell: devBluebellDockIcon,
  forgetmenot: devForgetmenotDockIcon,
  tulip: devTulipDockIcon,
  sunflower: devSunflowerDockIcon,
  lantana: devLantanaDockIcon,
  daylily: devDaylilyDockIcon
};
const dockFlowerAssets = utils.is.dev ? devDockFlowerAssets : stableDockFlowerAssets;
const lifecycleLog = createAppLogger("main.lifecycle");
const ipcLog = createAppLogger("main.ipc");
lifecycleLog.info("desktop release identity", { ...releaseMetadata });
lifecycleLog.info("desktop runtime profile", {
  profile: devRuntime.profile,
  conversation_background: devRuntime.conversationBackground,
  menu_bar_status: devRuntime.menuBarStatus
});
let nativeLifecycle;
const appIconBundle = macAppBundlePath(process.platform, deliveryNative.app.isPackaged, process.execPath);
const nativeDockIcon = createDesktopNativeDockIconFacade({
  flowerAssets: dockFlowerAssets,
  setAppIcon: appIconBundle ? (image, signal) => setMacAppIcon(appIconBundle, image, signal) : void 0,
  getSetting,
  setDockIcon: deliveryNative.app.dock ? (image) => deliveryNative.app.dock?.setIcon(image) : void 0,
  captureAppError: (source, err) => {
    void captureAppError(source, err);
  }
});
deliveryNative.autoUpdater.on("before-quit-for-update", () => nativeDockIcon.stop());
const nativeWindow = createDesktopNativeWindowFacade({
  appDisplayName: index$1.appDisplayName,
  appIcon,
  isDev: utils.is.dev,
  rendererUrl: process.env["ELECTRON_RENDERER_URL"],
  preloadPath: pn.join(__dirname, "../preload/index.js"),
  rendererFilePath: pn.join(__dirname, "../renderer/index.html"),
  getSetting,
  setSetting,
  isQuitting: () => nativeLifecycle.isQuitting(),
  requestQuit: (reason) => {
    nativeLifecycle.beginAppQuit(reason);
    deliveryNative.app.quit();
  },
  focusApp: (options) => deliveryNative.app.focus(options),
  showDockIcon: () => deliveryNative.app.dock?.show() ?? Promise.resolve(),
  captureAppError: (source, err) => {
    void captureAppError(source, err);
  },
  openExternal: (url) => deliveryNative.shell.openExternal(url),
  isAllowedChatwootWebviewUrl,
  hardenChatwootWebviewPreferences
});
onPosthogFeatureFlagsChanged(() => nativeWindow.broadcast("posthog:featureFlagsChanged"));
const nativeImageExport = createDesktopNativeImageExportFacade();
const desktopLinkPreview = createDesktopLinkPreviewFacade();
const localLinkProbe = createLocalLinkProbe();
const loadNativeMenuBarConversationProjection = devRuntime.fixtureProductHost ? async () => ({
  rows: [],
  totalConversationCount: 0,
  counts: { running: 0, waiting: 0, finished: 0 }
}) : loadMenuBarConversationProjectionViaWorker;
const nativeMenuBarStatus = createDesktopNativeMenuBarStatusFacade({
  appDisplayName: index$1.appDisplayName,
  appIcon,
  flowerAssets,
  harnessIconAssets: {
    cursor: cursorHarnessIcon,
    claude: claudeHarnessIcon,
    codex: codexHarnessIcon,
    pi: piHarnessIcon,
    omp: ompHarnessIcon
  },
  trayFontFiles: [trayBadgeFont],
  getSetting,
  // Lightweight development profiles intentionally have no real product
  // database. Packaged/full desktop always takes the utility-process path.
  loadConversationProjection: loadNativeMenuBarConversationProjection,
  fetchUsageReport: (force) => fetchUsageReport(getSecret(PROVIDER_USAGE_CURSOR_COOKIE_SETTING_KEY), force),
  isFeatureEnabled: isPosthogFeatureEnabled,
  captureAppError: (source, err) => {
    void captureAppError(source, err);
  },
  logInfo: (message, properties) => {
    lifecycleLog.info(message, properties);
  },
  requestQuit: (reason) => {
    nativeLifecycle.beginAppQuit(reason);
    deliveryNative.app.quit();
  },
  nativeWindow
});
let pluginFlowerChanged;
const desktopSettings = createDesktopSettingsIpcFacade({
  onPublicSettingChanged: async (key, value) => {
    nativeDockIcon.notifySettingChanged(key, value);
    await nativeMenuBarStatus.notifySettingChanged(key);
    if (key === flowerUnlocks.FLOWER_SETTING_KEY) void pluginFlowerChanged?.();
    if (key === CONVERSATION_HISTORY_PAUSED_SETTING) {
      if (value === "true") historyParser?.pause();
      else historyParser?.resume();
    }
    if (key === evidencePins.CONVERSATION_SCOPE_SETTING)
      void refreshFromDisk(WEEK_MS, { invalidateDiscoveryCache: true }, notifyRenderersChanged).then(notifyRenderersChanged).catch((err) => void captureAppError("main.conversation-scope-refresh", err));
    if (key === POSTHOG_TRACKING_DISABLED_SETTING_KEY || key === POSTHOG_FEATURE_FLAG_OVERRIDES_SETTING_KEY) {
      await nativeMenuBarStatus.sync();
    }
  }
});
configureConversationScope(
  () => evidencePins.conversationScopeFromSetting(getSetting(evidencePins.CONVERSATION_SCOPE_SETTING))
);
const conversationParseIntervalMs = () => CONVERSATION_PARSE_INTERVAL_MS[conversationParseInterval(
  getSetting(CONVERSATION_PARSE_INTERVAL_SETTING),
  index$1.appReleaseChannel(utils.is.dev)
)];
let openConversationInBackground = null;
const CONVERSATION_HISTORY_SETTING = "conversations.history";
const CONVERSATION_HISTORY_PAUSED_SETTING = "conversations.historyPaused";
let historyParser = null;
const isE2e = process.env.BLUME_E2E_MODE === "1";
const isPrPreview = process.env.BLUME_PR_PREVIEW === "1";
const shouldTrackNativeUsageTelemetry = index$1.shouldTrackUsageTelemetry({
  isDev: utils.is.dev,
  isE2e,
  isPrPreview
});
nativeLifecycle = createDesktopNativeLifecycleFacade({
  log: lifecycleLog,
  captureAppError,
  capturePosthogLog,
  flushPosthogLogging,
  shutdownPosthogLogging,
  flushAppLogs,
  requestConversationRefreshStop,
  waitForConversationRefreshes,
  closeDb,
  prepareNativeWindowsForQuit: () => {
    disposeConversationRefreshWorker();
    disposeConversationActionWorkers();
    disposeConversationListWorker();
    disposeParserBindingWorker();
    disposeSetupScanWorker();
    disposeSearchWorker();
    disposeSearchIndexing();
    disposeProjectPathResolutionWorkers();
    disposeSignalAnalyticsWorker();
    nativeMenuBarStatus.destroy();
    nativeWindow.prepareForQuit();
  },
  destroyAllNativeWindows: () => nativeWindow.destroyAllWindows(),
  stopAppUsageTracking,
  shouldSkipWindowAllClosedQuit: isInstallingDownloadedUpdateForRestart,
  isExpendableRenderer: isLinkPreviewContents
});
const nativeDeepLinks = createDesktopNativeDeepLinkFacade({
  isDev: utils.is.dev,
  releaseChannel: index$1.desktopReleaseChannel,
  shouldTrackUsageTelemetry: shouldTrackNativeUsageTelemetry,
  appPath: () => deliveryNative.app.getAppPath(),
  execPath: process.execPath,
  argv: process.argv,
  setAsDefaultProtocolClient: (protocol, path, args) => deliveryNative.app.setAsDefaultProtocolClient(protocol, path, args),
  onOpenUrl: index$1.nativeStartupEvents.onOpenUrl,
  deliverDeepLinkPath: (path) => nativeWindow.deliverDeepLinkPath(path),
  claimInvite,
  maybeReportReferralActivation,
  captureTelemetryEvent,
  aliasTelemetryDistinctId,
  captureAppError,
  log: lifecycleLog
});
function reportAccountDeepLinkFailure(error) {
  reportAccountDeepLinkFailure$1(error, {
    logInfo: (message, properties) => lifecycleLog.info(message, properties),
    captureAppError: (source, err) => {
      void captureAppError(source, err);
    }
  });
}
index$1.nativeStartupEvents.onOpenUrl((event, url) => {
  if (process.platform !== "darwin") return;
  event.preventDefault();
  void handleAccountDeepLink(url).then((handled) => {
    if (handled) {
      lifecycleLog.info("account callback received from macOS open-url");
    }
  }).catch((error) => reportAccountDeepLinkFailure(error));
});
index$1.nativeStartupEvents.onSecondInstance((_event, argv) => {
  nativeWindow.focusPrimaryWindow();
  lifecycleLog.info("secondary dev instance forwarded a possible account callback");
  void handleAccountDeepLinkFromArgv(argv).then((handled) => {
    if (!handled) nativeDeepLinks.handleArgv(argv);
  }).catch((error) => reportAccountDeepLinkFailure(error));
});
const handleIpc = (channel, listener) => {
  deliveryNative.ipcMain.handle(channel, async (event, ...args) => {
    if (nativeLifecycle.isQuitting()) return void 0;
    const startedAtMs = Date.now();
    const failureProperties = (error) => ({
      source: "main.ipc",
      channel,
      duration_ms: Math.max(0, Date.now() - startedAtMs),
      online: deliveryNative.net.isOnline(),
      ...diagnosticPropertiesForError("main.ipc", error, { channel })
    });
    return invokeWithIpcErrorReporting({
      channel,
      // Timed per channel (bounded histogram + slow-call warnings), surfaced by perf:snapshot.
      invoke: () => timeIpcHandler(channel, () => listener(event, ...args)),
      readIsOnline: () => deliveryNative.net.isOnline(),
      onPathRejected: () => {
        void captureTelemetryEvent("ipc_path_rejected", {
          channel,
          duration_ms: Math.max(0, Date.now() - startedAtMs)
        });
      },
      onExpectedAuthState: () => {
        ipcLog.info("expected signed-out IPC read", {
          ...failureProperties(new Error("authentication required")),
          reporting_action: "local_log_only"
        });
      },
      onConfirmedOffline: (network, error) => {
        ipcLog.info("expected offline IPC failure", {
          ...failureProperties(error),
          network_failure_kind: network.kind,
          network_error_code: network.code,
          network_hostname_present: Boolean(network.hostname),
          reporting_action: "local_log_only"
        });
      },
      onExpectedServiceFailure: (network, error) => {
        void capturePosthogLog("info", "Expected optional-service IPC failure", {
          ...failureProperties(error),
          network_failure_kind: network.kind,
          network_error_code: network.code,
          network_hostname_present: Boolean(network.hostname),
          reporting_action: "posthog_log_only"
        });
      },
      onUnexpected: (error) => {
        if (!shouldReportConversationRefreshAppError(error)) return;
        if (!shouldReportSetupScanAppError(error)) return;
        if (!shouldReportSignalAnalyticsAppError(error)) return;
        if (!shouldReportWrappedGenerateAppError(error)) return;
        void captureAppError("main.ipc", error, failureProperties(error));
      }
    });
  });
};
nativeDeepLinks.registerOpenUrlHandler();
function notifyWrappedChanged() {
  nativeWindow.broadcast("wrapped:changed");
}
async function resolveWrappedAccountUserId() {
  return (await getAccountSession())?.user.id ?? null;
}
const wrappedWeeklyScheduler = createWrappedWeeklyScheduler({
  accountUserId: resolveWrappedAccountUserId,
  notifyChanged: notifyWrappedChanged
});
const desktopWrapped = createDesktopWrappedIpcController({
  accountUserId: resolveWrappedAccountUserId,
  notifyChanged: notifyWrappedChanged,
  refreshSchedule: () => wrappedWeeklyScheduler.refresh()
});
function notifyRenderersChanged() {
  nativeWindow.broadcast("conversations:changed");
  nativeMenuBarStatus.notifyConversationsChanged();
  void maybeReportReferralActivation();
}
deliveryNative.app.whenReady().then(async () => {
  const wasOpenedAtLogin = process.platform === "darwin" ? deliveryNative.app.getLoginItemSettings({ type: "mainAppService" }).wasOpenedAtLogin : false;
  const launchedAtLogin = index$1.wasNativeShellLaunchedAtLogin({
    platform: process.platform,
    argv: process.argv,
    wasOpenedAtLogin
  });
  nativeDeepLinks.registerProtocol();
  const handledAccountLaunchCallback = process.platform === "darwin" ? false : await handleAccountDeepLinkFromArgv(process.argv).catch((error) => {
    reportAccountDeepLinkFailure(error);
    return false;
  });
  if (!handledAccountLaunchCallback) nativeDeepLinks.handleLaunchArgv();
  getDb();
  await initializeSettingsStore();
  await initializeDevAccountSession();
  await initializeMetaStore();
  void initPosthogLogging();
  await migrateLegacyOverrides().catch((err) => {
    console.error("[blume] overrides migration failed:", err);
    void captureAppError("main.overrides-migration", err);
  });
  const legacyLoginItemCleanup = desktopSettings.supportsLaunchAtLogin() ? await cleanupLegacyBlumeTauriLaunchAgent() : null;
  if (legacyLoginItemCleanup?.cleaned) {
    lifecycleLog.info("disabled legacy Blume Tauri login agent", {
      path: legacyLoginItemCleanup.path,
      disabledPath: legacyLoginItemCleanup.disabledPath
    });
    desktopSettings.adoptLegacyLaunchAtLoginMigration();
  } else if (legacyLoginItemCleanup?.reason === "failed") {
    lifecycleLog.warn("failed to disable legacy Blume Tauri login agent", {
      path: legacyLoginItemCleanup.path,
      error: legacyLoginItemCleanup.errorMessage
    });
  }
  if (legacyLoginItemCleanup?.reason !== "failed") {
    desktopSettings.initializeLaunchAtLoginDefault();
  }
  index$1.bootstrapReadyNativeApp({
    appDisplayName: index$1.appDisplayName,
    appUserModelId: index$1.appIdForReleaseChannel(),
    appIcon,
    openLatestInstaller: () => deliveryNative.shell.openExternal(manualInstallerUrlForReleaseChannel()),
    runStartupInstall: () => desktopSetup.runStartupInstall(),
    writeDevSandboxMeta: index$1.writeDevSandboxMeta
  });
  nativeDockIcon.sync();
  if (devRuntime.menuBarStatus) void nativeMenuBarStatus.sync();
  registerNativeIpcHandlers({
    onConversationOpened: (ref) => openConversationInBackground?.(ref),
    handleIpc,
    conversationRuntime,
    notifyRenderersChanged,
    desktopSetup,
    desktopSettings,
    announcements,
    careers,
    nativeWindow,
    nativeImageExport,
    nativeFolderPicker: {
      async selectFolder() {
        const result = await deliveryNative.dialog.showOpenDialog({
          title: "Select a folder",
          buttonLabel: "Select folder",
          properties: ["openDirectory", "createDirectory"]
        });
        return result.canceled ? null : result.filePaths[0] ?? null;
      }
    },
    isPosthogFeatureEnabled,
    getPosthogFeatureFlagValue,
    getPosthogFeatureFlagEvaluations
  });
  handleIpc("updater:getReadyState", () => getUpdateReadyState());
  handleIpc("updater:restartToInstall", () => restartReadyUpdate());
  desktopWrapped.registerIpcHandlers(handleIpc);
  desktopLinkPreview.registerIpcHandlers(handleIpc);
  handleIpc(LOCAL_LINK_IPC_CHANNEL, (_event, url) => localLinkProbe.running(url));
  handleIpc("app:setAppBadge", (_event, count) => {
    const value = typeof count === "number" && Number.isFinite(count) ? Math.floor(count) : 0;
    deliveryNative.app.setBadgeCount(Math.min(Math.max(value, 0), 999));
  });
  handleIpc("app:setCommandMenu", (event, commands) => {
    index$1.setApplicationMenuCommands(index$1.sanitizeMenuCommands(commands), (id) => {
      if (!event.sender.isDestroyed()) event.sender.send("app:menu-command", id);
    });
  });
  wrappedWeeklyScheduler.start();
  const mainWindow = nativeWindow.createWindow({ focusOnReady: !launchedAtLogin });
  const pluginMaintenance = !isE2e && devRuntime.startupInstall && shouldRunStartupInstall({ isDev: utils.is.dev, devInstallEnv: process.env.BLUME_DEV_INSTALL });
  const deliveryRuntime = startDeliveryRuntime({
    cloudChats: {
      enabled: async () => await getPosthogFeatureFlagValue(CLOUD_AGENT_CHATS_FLAG) === true,
      subscribe: onPosthogFeatureFlagsChanged
    },
    native: {
      userData: deliveryNative.app.getPath("userData"),
      // Its control:* invoke handlers are timed into perf:snapshot like every handleIpc channel.
      ipcMain: timedIpcMain(deliveryNative__namespace.ipcMain),
      fork: (path, args) => deliveryNative__namespace.utilityProcess.fork(path, args),
      messageChannel: () => new deliveryNative__namespace.MessageChannelMain(),
      createWindow: (options) => new deliveryNative__namespace.BrowserWindow(options),
      openExternal: (url) => deliveryNative__namespace.shell.openExternal(url),
      copyText: (text) => deliveryNative__namespace.clipboard.writeText(text),
      workArea: (bounds) => deliveryNative__namespace.screen.getDisplayMatching(bounds).workArea,
      reducedMotion: () => deliveryNative__namespace.systemPreferences.getAnimationSettings().prefersReducedMotion,
      safeStorage: deliveryNative__namespace.safeStorage
    },
    window: mainWindow,
    icon: appIcon,
    accounts: deliveryAccounts,
    ownedTitles: { generate: generateOwnedChatTitle },
    workerPath: pn.join(__dirname, "deliveryWorker.js"),
    windowWidths: {
      read: () => parseWindowWidths(getSetting(WINDOW_WIDTHS_SETTING_KEY)),
      write: (widths) => setSetting(WINDOW_WIDTHS_SETTING_KEY, JSON.stringify(widths))
    },
    appLink: agentAppLink(utils.is.dev),
    plugin: {
      // Packaged: electron-builder's extraResources; dev: the launcher's fresh plugin:bundle.
      bundleDir: utils.is.dev ? process.env.BLUME_PLUGIN_BUNDLE_DIR : pn.join(process.resourcesPath, "plugin-bundle"),
      preferences: {
        read: () => getSetting(PLUGIN_PREFERENCES_SETTING_KEY),
        write: (value) => setSetting(PLUGIN_PREFERENCES_SETTING_KEY, value)
      },
      // Never chosen (or no longer a flower) is the default flower, as the dock and theme read it.
      flower: () => {
        const flower = getSetting(flowerUnlocks.FLOWER_SETTING_KEY);
        return flowerUnlocks.isFlowerId(flower) ? flower : flowerUnlocks.DEFAULT_FLOWER;
      },
      // Agent configuration is machine-global: like the startup install, canary, E2E and partial
      // dev profiles leave it alone. Updates only ever touch this channel's own installations.
      automaticUpdates: pluginMaintenance,
      // Canary still moves the installations it made to its own runtime, endpoint only: the next
      // canary deletes the previous canary's runtime, so their configured address stops answering.
      endpointMoves: pluginMaintenance,
      development: utils.is.dev
    },
    // The plugin router reads this app's keys from its own .blume root (stable, canary or this
    // checkout's dev sandbox); a dev app also claims conversations in its own checkout.
    pluginRegistry: {
      telemetry: pluginTelemetryConfig,
      root: index$1.getBlumeRoot(),
      channel: utils.is.dev ? "development" : "stable",
      checkout: utils.is.dev ? pn.resolve(deliveryNative.app.getAppPath(), "..", "..") : null,
      label: index$1.getAppDisplayName()
    },
    openConversationAt: async (pointer) => conversationLocation(await locateConversationEvidenceViaWorker(pointer))
  });
  pluginFlowerChanged = () => deliveryRuntime.pluginFlowerChanged();
  configureConversationRegistrations(() => deliveryRuntime.conversationPolicy());
  const legacyExclusions2 = startLegacyProjectExclusionMigration({
    signedIn: () => Boolean(deliveryAccounts.cookie()),
    importSkips: (repositories) => deliveryRuntime.importLegacyExclusions(repositories),
    onAccountChanged: deliveryAccounts.onChanged
  });
  deliveryAccounts.onChanged?.(() => invalidateConversationRegistrations());
  configureEvidenceCompletion(
    (pin) => deliveryRuntime.signalEvidenceComplete({ signalId: pin.signalId, messageId: pin.messageId })
  );
  drainDeliveryRuntimeOnQuit({
    app: deliveryNative.app,
    updater: deliveryNative.autoUpdater,
    stop: () => deliveryRuntime.stop()
  });
  if (shouldTrackNativeUsageTelemetry) {
    startAppUsageTracking(mainWindow);
    void captureTelemetryEvent("app_opened", {
      launch_source: launchedAtLogin ? "login" : "normal"
    });
  }
  const shouldDeferBootIngestForInitialUpdate = index$1.shouldDeferInitialBootIngestForUpdateCheck({
    platform: process.platform,
    isDev: utils.is.dev,
    isE2e,
    isPrPreview
  });
  const conversationBackground = createConversationBackgroundService({
    timers: {
      setTimeout,
      clearTimeout,
      setInterval,
      clearInterval,
      yieldToEventLoop: () => new Promise((resolve2) => setImmediate(resolve2))
    },
    conversations: {
      refreshFromDisk,
      bootIngest,
      requestRefreshStop: requestConversationRefreshStop,
      resumeRefreshes: resumeConversationRefreshes,
      waitForRefreshes: waitForConversationRefreshes,
      findChangedConversationSourcePaths: () => conversationRuntime.findChangedConversationSourcePaths(),
      applyCodexLiveStateForChangedSources: (paths) => conversationRuntime.applyCodexLiveStateForChangedSources(paths),
      markStaleConversationsInactive: (cutoffMs) => getStorage().desktopConversations.markStaleConversationsInactive(cutoffMs)
    },
    startWatcher: watchConversations,
    notifyRenderersChanged,
    captureAppError: (source, err) => {
      void captureAppError(source, err);
    },
    log: {
      info: (message, properties) => lifecycleLog.info(message, properties),
      error: (message, err) => console.error(message, err)
    },
    isQuitting: () => nativeLifecycle.isQuitting(),
    canRefreshOnFocus: () => !mainWindow.isDestroyed(),
    shouldPauseForUpdate: process.platform === "darwin",
    shouldDeferBootIngestForInitialUpdate,
    sampleOwnFileDescriptors: nativeLifecycle.sampleOwnFileDescriptors,
    parseIntervalMs: conversationParseIntervalMs
  });
  openConversationInBackground = (ref) => conversationBackground.openConversation(ref);
  const cpuCount = Math.max(1, require$$0$2.cpus().length);
  historyParser = createHistoryParser({
    now: () => Date.now(),
    setTimeout: (fn, ms) => {
      const handle = setTimeout(fn, ms);
      handle.unref();
      return handle;
    },
    clearTimeout: (handle) => clearTimeout(handle),
    isQuiet: () => {
      if (nativeLifecycle.isQuitting() || isConversationRefreshBusy()) return false;
      if (process.platform !== "win32" && require$$0$2.loadavg()[0] / cpuCount < 0.75) return true;
      return deliveryNative.powerMonitor.getSystemIdleTime() >= 120;
    },
    read: (request2) => readConversationHistoryViaWorker(request2),
    load: () => {
      try {
        return JSON.parse(
          getSetting(CONVERSATION_HISTORY_SETTING) ?? "null"
        );
      } catch {
        return null;
      }
    },
    save: (state) => setSetting(CONVERSATION_HISTORY_SETTING, JSON.stringify(state)),
    onChanged: () => notifyRenderersChanged(),
    onError: (error) => {
      if (shouldReportConversationRefreshAppError(error))
        void captureAppError("main.conversation-history", error);
    }
  });
  configureConversationActivityCutoff(() => historyParser?.state().horizonMs ?? null);
  if (getSetting(CONVERSATION_HISTORY_PAUSED_SETTING) === "true") historyParser.pause();
  configureConversationHistoryStart((fromMs) => historyParser?.start(fromMs));
  startAutoUpdates({
    prepareForUpdateCheck: () => conversationBackground.prepareForUpdateCheck(),
    resumeAfterUpdateCheck: () => conversationBackground.resumeAfterUpdateCheck(),
    notifyUpdateReady: (state) => nativeWindow.broadcast("updater:ready-changed", state)
  });
  if (devRuntime.conversationBackground) {
    mainWindow.once("ready-to-show", () => {
      conversationBackground.readyToShow();
      startSearchIndexing();
    });
    mainWindow.on("focus", () => {
      conversationBackground.focus();
    });
  }
  nativeLifecycle.setStopBackgroundServices(() => {
    historyParser?.stop();
    legacyExclusions2.stop();
    void deliveryRuntime.stop().catch((error) => console.error("[deliveries] shutdown failed", error));
    conversationBackground.stop();
    disposeSearchIndexing();
    wrappedWeeklyScheduler.stop();
    disposeWrappedGenerateWorker();
    disposeTerminalWorker();
  });
  nativeLifecycle.registerBeforeQuitHandler(() => nativeDockIcon.deferQuit(() => deliveryNative.app.quit()));
  deliveryNative.app.on("activate", function() {
    if (nativeLifecycle.isQuitting()) return;
    if (!nativeWindow.hasWindows()) {
      const win = nativeWindow.createWindow();
      if (shouldTrackNativeUsageTelemetry) startAppUsageTracking(win);
    } else {
      nativeWindow.focusPrimaryWindow();
    }
  });
});
nativeLifecycle.registerWindowAllClosedHandler();
//# sourceMappingURL=index-DTYVwBun.js.map

//# debugId=49f07bf9-f775-5aa9-9121-c4aafc8c3d41
