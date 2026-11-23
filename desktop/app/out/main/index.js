"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3d5b39c4-c4fe-5dd5-9745-c3f179c6abc7")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const deliveryNative = require("electron");
const _n = require("node:path");
const utils = require("@electron-toolkit/utils");
const require$$0$1 = require("node:crypto");
const harnessRuns = require("./harnessRuns-C9zOkWLa.js");
require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
require("./useCases-CApkWXtQ.js");
const un = require("fs");
const promises = require("fs/promises");
const require$$0 = require("os");
const pn = require("path");
const client = require("@better-auth/electron/client");
const require$$0$2 = require("node:fs/promises");
require("./hash-DCMQIns_.js");
const LAUNCH_AT_LOGIN_ARG = "--launch-at-login";
function wasNativeShellLaunchedAtLogin({
  platform,
  argv,
  wasOpenedAtLogin = false
}) {
  if (platform === "darwin") return wasOpenedAtLogin;
  if (platform === "win32") return argv.includes(LAUNCH_AT_LOGIN_ARG);
  return false;
}
function shouldTrackUsageTelemetry({
  isDev,
  isE2e: isE2e2,
  isPrPreview
}) {
  return !isDev && !isE2e2 && !isPrPreview;
}
function shouldEnforceSingleInstanceLock({
  isDev,
  isE2e: isE2e2,
  forceSingleInstanceLock = false
}) {
  if (forceSingleInstanceLock) return true;
  return !isDev && !isE2e2;
}
function shouldDeferInitialBootIngestForUpdateCheck({
  platform,
  isDev,
  isE2e: isE2e2,
  isPrPreview
}) {
  return platform === "darwin" && !isDev && !isE2e2 && !isPrPreview;
}
const BLUME_HOME_JSON_NAME_PATTERN = /^[a-z0-9-]+$/;
function assertBlumeHomeJsonName(name) {
  if (!BLUME_HOME_JSON_NAME_PATTERN.test(name)) {
    throw new Error(`invalid blume-home name: ${name}`);
  }
}
function blumeHomeJsonPath(rootDir, path, name) {
  assertBlumeHomeJsonName(name);
  return path.join(rootDir, `${name}.json`);
}
function blumeHomeJsonTempPath(target, processPid) {
  return `${target}.${processPid}.tmp`;
}
function serializeBlumeHomeJson(data) {
  return JSON.stringify(data, null, 2);
}
function createBlumeHomeJsonStore(ports) {
  function targetPath(name) {
    return blumeHomeJsonPath(ports.getRootDir(), ports.path, name);
  }
  async function read(name) {
    try {
      const raw = await ports.fs.readFile(targetPath(name));
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  async function write(name, data) {
    const rootDir = ports.getRootDir();
    await ports.fs.mkdir(rootDir);
    const target = blumeHomeJsonPath(rootDir, ports.path, name);
    const tmp = blumeHomeJsonTempPath(target, ports.processPid);
    await ports.fs.writeFile(tmp, serializeBlumeHomeJson(data));
    await ports.fs.rename(tmp, target);
  }
  return { read, write };
}
const BLUME_APP_NAME = "Blume";
const BLUME_DEV_APP_NAME = "Blume Dev";
const DEV_RUNTIME_PROFILES = ["full", "ui", "conversations", "native"];
function normalizeDevCdpPort(value) {
  if (value === null || value === void 0 || value === "") return null;
  const port = typeof value === "number" ? value : Number(value);
  return Number.isSafeInteger(port) && port >= 1 && port <= 65535 ? port : null;
}
function normalizeDevRuntimeProfile(value) {
  return DEV_RUNTIME_PROFILES.includes(value) ? value : "full";
}
function projectNameFromDevAppPath(appPath) {
  const projectRoot = appPath.replace(/[/\\]apps[/\\]desktop[/\\]?$/, "");
  const trimmed = projectRoot.replace(/[/\\]+$/, "");
  if (!trimmed) return "";
  const segments = trimmed.split(/[/\\]/).filter(Boolean);
  return segments[segments.length - 1] ?? "";
}
function formatDevAppName(conversationName) {
  const name = conversationName.trim();
  return name ? `${BLUME_DEV_APP_NAME} - ${name}` : BLUME_DEV_APP_NAME;
}
function createDevProjectInfo(input) {
  const projectName = projectNameFromDevAppPath(input.appPath);
  const conversationName = input.conversationName?.trim() || projectName;
  const worktreeName = input.worktreeName?.trim() || null;
  return {
    projectPath: input.appPath,
    projectName,
    conversationName,
    worktreeName,
    appName: formatDevAppName(conversationName),
    appVersion: input.appVersion,
    cdpPort: normalizeDevCdpPort(input.cdpPort),
    runtimeProfile: normalizeDevRuntimeProfile(input.runtimeProfile),
    signedOut: input.signedOut === true || input.signedOut === "1"
  };
}
function appDisplayNameForDevProjectInfo(info) {
  return info?.appName ?? BLUME_APP_NAME;
}
const DEPLOYMENT_SET_SERVICE_GROUPS = {
  product: [
    "auth",
    "feedback",
    "userAnalytics",
    "referrals",
    "insights",
    "llm",
    "router",
    "webLab",
    "runner"
  ],
  backend: ["auth", "feedback", "userAnalytics", "referrals", "insights", "llm", "router"],
  // PR previews also carry unreleased services. Canary and stable sets never include these.
  preview: [
    "auth",
    "feedback",
    "userAnalytics",
    "referrals",
    "insights",
    "llm",
    "router",
    "webLab",
    "runner",
    "deliveriesRuntime"
  ]
};
const DELIVERIES_SERVICES = ["deliveriesRuntime"];
const OPTIONAL_PREVIEW_SERVICES = ["runner"];
const PREVIEW_SERVICE_OMISSION_REASONS = ["not-requested", "failed"];
const MANIFEST_TO_COMPONENT_NAME = {
  artifactSync: "artifact-sync",
  userAnalytics: "user-analytics",
  deliveriesRuntime: "deliveries-runtime"
};
function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function requiredHttpsUrl(value, serviceName) {
  if (typeof value !== "string") {
    throw new Error(`Deployment set is missing the ${serviceName} HTTPS endpoint.`);
  }
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) throw new Error();
    return parsed.toString().replace(/\/$/, "");
  } catch {
    throw new Error(`Deployment set is missing the ${serviceName} HTTPS endpoint.`);
  }
}
function validateDeploymentSetManifest(value, options = {}) {
  if (!isObject(value)) throw new Error("Deployment set manifest must be an object.");
  if (value.schemaVersion !== 1) throw new Error("Unsupported deployment set schemaVersion.");
  if (!["preview", "canary", "stable"].includes(String(value.channel))) {
    throw new Error("Deployment set channel is invalid.");
  }
  const channel = value.channel;
  if (options.channel && channel !== options.channel) {
    throw new Error("Deployment set channel does not match its operation.");
  }
  if (channel === "stable" && !/^\d+\.\d+\.\d+$/.test(String(value.version ?? ""))) {
    throw new Error("Stable deployment set version must be X.Y.Z.");
  }
  if (channel === "canary" && !/^\d+\.\d+\.\d+-c\.\d+$/.test(String(value.version ?? ""))) {
    throw new Error("Canary deployment set version must be X.Y.Z-c.N.");
  }
  if (typeof value.bundleId !== "string" || !value.bundleId.trim()) {
    throw new Error("Deployment set bundleId is required.");
  }
  if (typeof value.sourceSha !== "string" || !/^[0-9a-f]{40}$/.test(value.sourceSha)) {
    throw new Error("Deployment set sourceSha must be an exact commit.");
  }
  if (!isObject(value.services)) throw new Error("Deployment set services are required.");
  const group = options.group ?? "product";
  const knownGroup = DEPLOYMENT_SET_SERVICE_GROUPS[group];
  if (!knownGroup) throw new Error(`Unknown deployment set service group: ${group}.`);
  const omittedServices = deploymentSetOmissions(value.omittedServices, group, channel);
  const required = (options.requireArtifactSync ? [...knownGroup, "artifactSync"] : [...knownGroup]).filter((name) => !(name in omittedServices));
  const actualServiceNames = Object.keys(value.services);
  for (const name of Object.keys(omittedServices))
    if (actualServiceNames.includes(name))
      throw new Error(`Deployment set cannot both include and omit the ${name} service.`);
  if (group === "preview") {
    for (const name of OPTIONAL_PREVIEW_SERVICES)
      if (!actualServiceNames.includes(name) && !(name in omittedServices))
        throw new Error(`Preview deployment set must include the ${name} or say why it is omitted.`);
  }
  if (options.allowDeliveries && group !== "preview")
    required.push(...DELIVERIES_SERVICES.filter((name) => actualServiceNames.includes(name)));
  if (actualServiceNames.length !== required.length || actualServiceNames.some((name) => !required.includes(name))) {
    throw new Error(
      `Deployment set must contain exactly these services: ${required.slice().sort().join(", ")}.`
    );
  }
  const services = {};
  for (const [name, service] of Object.entries(value.services)) {
    if (!isObject(service)) {
      throw new Error(`Deployment set is missing the ${name} HTTPS endpoint.`);
    }
    services[name] = { url: requiredHttpsUrl(service.url, name) };
  }
  for (const name of required) {
    if (!services[name]) throw new Error(`Deployment set is missing the ${name} HTTPS endpoint.`);
  }
  return {
    schemaVersion: 1,
    ...typeof value.version === "string" ? { version: value.version } : {},
    channel,
    bundleId: value.bundleId,
    sourceSha: value.sourceSha,
    services,
    ...Object.keys(omittedServices).length > 0 ? { omittedServices } : {}
  };
}
function deploymentSetOmissions(value, group, channel) {
  if (value === void 0) return {};
  if (group !== "preview" || channel !== "preview")
    throw new Error("Only a preview deployment set may omit a service.");
  if (!isObject(value)) throw new Error("Deployment set omittedServices must be an object.");
  const omissions = {};
  for (const [name, reason] of Object.entries(value)) {
    if (!OPTIONAL_PREVIEW_SERVICES.includes(name))
      throw new Error(`Deployment set cannot omit the ${name} service.`);
    if (!PREVIEW_SERVICE_OMISSION_REASONS.includes(reason))
      throw new Error(
        `Deployment set omits the ${name} for an unknown reason; use one of: ${PREVIEW_SERVICE_OMISSION_REASONS.join(", ")}.`
      );
    omissions[name] = reason;
  }
  return omissions;
}
function validateDeploymentSetEnvelope(input, options) {
  const manifest = validateDeploymentSetManifest(input.manifest, options);
  if (input.bundleId !== manifest.bundleId || input.sourceSha !== manifest.sourceSha) {
    throw new Error("Deployment set envelope identity does not match its manifest.");
  }
  return manifest;
}
const STABLE_SERVICE_WORKERS = {
  auth: "blume-auth",
  feedback: "blume-feedback",
  userAnalytics: "blume-analytics",
  referrals: "blume-referrals",
  insights: "blume-insights",
  llm: "blume-llm",
  router: "blume-router",
  artifactSync: "blume-artifact-sync",
  deliveriesRuntime: "blume-dlv-runtime"
};
const STABLE_LLM_DOMAIN = "agentic-cms-olav.workers.dev";
const LEGACY_STABLE_HOSTS = {
  auth: ["auth.blume-codes.com", "auth.blume-page.com"],
  feedback: ["feedback.blume-page.com"],
  userAnalytics: ["analytics.blume-page.com"],
  referrals: ["referrals.blume-page.com"],
  insights: ["agents.blume-codes.com", "blume-insights-control.agentic-cms-olav.workers.dev"],
  llm: ["blume-llm-service.agentic-cms-olav.workers.dev"],
  router: ["router.blume-page.com"],
  artifactSync: ["sync.blume-codes.com"]
};
function validateStableBackendServiceUrl(value, service, backendDeploymentId) {
  if (typeof value !== "string" || !/^https:\/\/[a-z0-9.-]+\/?$/i.test(value)) {
    throw new Error(`Stable backend ${service} HTTPS endpoint must be an owned origin.`);
  }
  const url = new URL(value);
  const worker = STABLE_SERVICE_WORKERS[service];
  const domains = service === "llm" ? [STABLE_LLM_DOMAIN, "release.blume-codes.com"] : ["release.blume-codes.com"];
  const prefix = `${worker}-`;
  const suffix = domains.map((domain) => `.${domain}`).find((end) => url.hostname.endsWith(end));
  const deploymentId = suffix ? url.hostname.slice(prefix.length, -suffix.length) : "";
  const versioned = !!worker && !!suffix && url.hostname.startsWith(prefix) && /^(?:bd-s|bd-h)-[a-z0-9-]+$/.test(deploymentId);
  const allowed = backendDeploymentId !== void 0 ? versioned && deploymentId === backendDeploymentId : versioned || LEGACY_STABLE_HOSTS[service]?.includes(url.hostname);
  if (!allowed) {
    throw new Error(`Stable backend ${service} HTTPS endpoint must match its owned deployment.`);
  }
  return url.origin;
}
function validateStableBackendSelection(value, expectedVersion, expectedAppBundleId) {
  if (!isObject(value) || value.version !== expectedVersion || value.channel !== "stable" || value.bundleId !== expectedAppBundleId) {
    throw new Error("Stable backend manifest identity does not match this product version.");
  }
  if (typeof value.backendDeploymentId !== "string" || !/^(?:bd-s|bd-h)-[a-z0-9-]+$/.test(value.backendDeploymentId) || typeof value.backendBundleId !== "string" || !value.backendBundleId || typeof value.sourceSha !== "string" || !/^[0-9a-f]{40}$/.test(value.sourceSha)) {
    throw new Error("Stable backend payload is missing its selected deployment identity.");
  }
  const manifest = validateDeploymentSetEnvelope(
    { sourceSha: value.sourceSha, bundleId: value.backendBundleId, manifest: value.manifest },
    { channel: "stable", group: "backend", requireArtifactSync: true }
  );
  if (manifest.version !== expectedVersion) {
    throw new Error("Stable backend manifest version does not match this product version.");
  }
  if (!Array.isArray(value.components)) {
    throw new Error("Stable backend payload is missing its component inventory.");
  }
  const expectedServices = [...DEPLOYMENT_SET_SERVICE_GROUPS.backend, "artifactSync"];
  if (value.components.length !== expectedServices.length) {
    throw new Error(
      "Stable backend component inventory must contain exactly one entry per service."
    );
  }
  for (const manifestName of expectedServices) {
    validateStableBackendServiceUrl(
      value.manifest.services[manifestName]?.url,
      manifestName,
      value.backendDeploymentId
    );
    const componentName = MANIFEST_TO_COMPONENT_NAME[manifestName] ?? manifestName;
    const candidates = value.components.filter(
      (candidate) => isObject(candidate) && candidate.name === componentName
    );
    if (candidates.length !== 1) {
      throw new Error(`Stable backend component inventory does not match ${componentName}.`);
    }
    const componentUrl = requiredHttpsUrl(candidates[0]?.url, componentName);
    if (componentUrl !== manifest.services[manifestName]?.url) {
      throw new Error(`Stable backend component inventory does not match ${componentName}.`);
    }
    validateStableBackendServiceUrl(candidates[0]?.url, manifestName, value.backendDeploymentId);
  }
  return {
    backendDeploymentId: value.backendDeploymentId,
    backendBundleId: value.backendBundleId,
    sourceSha: value.sourceSha,
    services: Object.fromEntries(
      expectedServices.map((name) => [name, manifest.services[name]])
    )
  };
}
function resolveDesktopReleaseMetadata(appVersion, env) {
  return {
    version: env.MAIN_VITE_BLUME_RELEASE_VERSION || appVersion,
    channel: env.MAIN_VITE_BLUME_RELEASE_CHANNEL || "development",
    sourceSha: env.MAIN_VITE_BLUME_RELEASE_SHA || null,
    bundleId: env.MAIN_VITE_BLUME_RELEASE_BUNDLE || null
  };
}
const STABLE_APP_ID = "page.blume.sidecar";
const STABLE_APP_NAME = "Blume";
const CANARY_APP_NAME = "Blume Canary";
function normalizeDesktopReleaseChannel(value) {
  return "stable";
}
const desktopReleaseChannel = normalizeDesktopReleaseChannel();
function appIdForReleaseChannel(channel) {
  return STABLE_APP_ID;
}
function appNameForReleaseChannel(channel) {
  return channel === "canary" ? CANARY_APP_NAME : STABLE_APP_NAME;
}
function appReleaseChannel(isDev) {
  return isDev ? "development" : desktopReleaseChannel;
}
const __vite_import_meta_env__ = { "MAIN_VITE_BLUME_RELEASE_BUNDLE": "blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9", "MAIN_VITE_BLUME_RELEASE_CHANNEL": "stable", "MAIN_VITE_BLUME_RELEASE_SHA": "bd358244228f4c4fa316832ce3ec57d2bd4b9ce9", "MAIN_VITE_BLUME_RELEASE_VERSION": "2.0.26" };
function resolveBlumeRoot(options) {
  const base = pn.join(options.homeDir, ".blume");
  if (!options.isDev) {
    return base;
  }
  const slug = options.appPath.replace(/^\//, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
  return pn.join(base, ".dev", slug);
}
function getBlumeRoot() {
  return resolveBlumeRoot({
    homeDir: require$$0.homedir(),
    isDev: utils.is.dev,
    appPath: deliveryNative.app.getAppPath()
  });
}
function getCanaryUserDataDir() {
  if (utils.is.dev || desktopReleaseChannel !== "canary") return null;
}
function isHarnessRunsPath(p) {
  if (!p) return false;
  return harnessRuns.isSymlinkAwareBlumeHarnessRunsPath(p, {
    currentBlumeRoot: getBlumeRoot(),
    homeBlumeRoot: pn.join(require$$0.homedir(), ".blume"),
    realpath: (path) => un.realpathSync.native(path)
  });
}
function getAppDisplayName() {
  const devProjectInfo = getDevProjectInfo();
  return devProjectInfo ? appDisplayNameForDevProjectInfo(devProjectInfo) : appNameForReleaseChannel(desktopReleaseChannel);
}
function getDevProjectInfo() {
  if (!utils.is.dev) return null;
  return createDevProjectInfo({
    appPath: deliveryNative.app.getAppPath(),
    appVersion: deliveryNative.app.getVersion(),
    conversationName: process.env.BLUME_DEV_CONVERSATION_TITLE,
    worktreeName: process.env.BLUME_DEV_WORKTREE_NAME,
    cdpPort: process.env.BLUME_DEV_CDP_PORT,
    runtimeProfile: process.env.BLUME_DEV_PROFILE,
    signedOut: process.env.BLUME_DEV_SIGNED_OUT
  });
}
async function writeDevSandboxMeta() {
  const info = getDevProjectInfo();
  if (!info) return;
  await writeBlumeJson("meta", {
    ...info,
    lastRunAt: Date.now()
  });
}
const blumeHomeJsonStore = createBlumeHomeJsonStore({
  getRootDir: getBlumeRoot,
  path: { join: pn.join },
  processPid: process.pid,
  fs: {
    mkdir: async (dir) => {
      await promises.mkdir(dir, { recursive: true });
    },
    readFile: (file) => promises.readFile(file, "utf-8"),
    writeFile: (file, data) => promises.writeFile(file, data, "utf-8"),
    rename: promises.rename
  }
});
async function readBlumeJson(name) {
  return blumeHomeJsonStore.read(name);
}
async function writeBlumeJson(name, data) {
  await blumeHomeJsonStore.write(name, data);
}
async function getOrCreateBlumeDeviceIdAtRoot(root, createId = require$$0$1.randomUUID) {
  const file = pn.join(root, "device-id");
  const read = async () => {
    const value = (await promises.readFile(file, "utf8")).trim();
    if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/.test(value)) {
      throw new Error("The shared Blume device identity is invalid.");
    }
    return value;
  };
  try {
    return await read();
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await promises.mkdir(root, { recursive: true });
  const created = createId();
  try {
    await promises.writeFile(file, `${created}
`, { encoding: "utf8", flag: "wx", mode: 384 });
    return created;
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    return read();
  }
}
function getOrCreateSharedBlumeDeviceId() {
  return getOrCreateBlumeDeviceIdAtRoot(pn.join(require$$0.homedir(), ".blume"));
}
function registerBlumeHomeIpcHandlers(handleIpc) {
  handleIpc("dev:info", () => getDevProjectInfo());
  handleIpc("release:info", () => resolveDesktopReleaseMetadata(deliveryNative.app.getVersion(), __vite_import_meta_env__));
}
function applyNativeAppDisplayName(appDisplayName2) {
  deliveryNative.app.setName(appDisplayName2);
  process.title = appDisplayName2;
}
function bootstrapReadyNativeApp(options) {
  applyNativeAppDisplayName(options.appDisplayName);
  utils.electronApp.setAppUserModelId(options.appUserModelId);
  setupApplicationMenu(options.openLatestInstaller);
  setupDockIcon(options.appIcon);
  registerWindowShortcutOptimizer();
  options.runStartupInstall();
  void options.writeDevSandboxMeta().catch((err) => {
    console.error("[blume] failed to write dev sandbox meta:", err);
  });
}
function menuAccelerator(keys) {
  if (!keys || !/^[A-Za-z0-9+[\],]+$/.test(keys)) return void 0;
  return keys.replace(/\bMod\b/, "CmdOrCtrl");
}
function sanitizeMenuCommands(value) {
  if (!Array.isArray(value)) return [];
  const text = (item, max) => typeof item === "string" && item.length > 0 && item.length <= max ? item : void 0;
  return value.slice(0, 60).flatMap((raw) => {
    const item = raw ?? {};
    const id = text(item.id, 80);
    const label = text(item.label, 80);
    if (!id || !label) return [];
    return [{ id, label, keys: text(item.keys, 40), group: text(item.group, 40) }];
  });
}
let installerOpener = null;
function goMenuItems(commands, run) {
  const groups = [...new Set(commands.map((command) => command.group ?? ""))];
  return groups.flatMap((group, index) => [
    ...index > 0 ? [{ type: "separator" }] : [],
    ...commands.filter((command) => (command.group ?? "") === group).map(
      (command) => ({
        label: command.label,
        accelerator: menuAccelerator(command.keys),
        registerAccelerator: false,
        click: (_item, _window, event) => {
          if (!event.triggeredByAccelerator) run(command.id);
        }
      })
    )
  ]);
}
function setApplicationMenuCommands(commands, run) {
  if (process.platform !== "darwin" || !installerOpener) return;
  buildDarwinMenu(installerOpener, goMenuItems(commands, run));
}
function buildDarwinMenu(openLatestInstaller, go) {
  deliveryNative.Menu.setApplicationMenu(
    deliveryNative.Menu.buildFromTemplate([
      { role: "appMenu" },
      { role: "editMenu" },
      { role: "viewMenu" },
      ...go.length ? [{ label: "Go", submenu: go }] : [],
      { role: "windowMenu" },
      {
        role: "help",
        submenu: [
          {
            label: "Download Latest Blume…",
            click: () => {
              void openLatestInstaller().catch((err) => {
                console.error("[blume] failed to open latest installer:", err);
              });
            }
          }
        ]
      }
    ])
  );
}
function setupApplicationMenu(openLatestInstaller) {
  installerOpener = openLatestInstaller;
  if (process.platform === "darwin") buildDarwinMenu(openLatestInstaller, []);
  else deliveryNative.Menu.setApplicationMenu(null);
}
function setupDockIcon(appIcon) {
  if (process.platform === "darwin" && deliveryNative.app.dock) {
    try {
      deliveryNative.app.dock.setIcon(appIcon);
    } catch {
    }
  }
}
function registerWindowShortcutOptimizer() {
  deliveryNative.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
}
const MAX_PENDING_EVENTS = 32;
const MAX_ARGUMENTS = 64;
const MAX_EVENT_CHARACTERS = 16384;
function createNativeStartupEvents(onOverflow = () => void 0) {
  const pending = [];
  const urlListeners = [];
  const instanceListeners = [];
  let active = false;
  let disposed = false;
  function deliver(event) {
    if (event.kind === "url") {
      for (const listener of urlListeners) listener({ preventDefault() {
      } }, event.url);
    } else {
      for (const listener of instanceListeners) listener({}, event.argv);
    }
  }
  function receive(event) {
    if (disposed) return;
    if (active) return deliver(event);
    if (pending.length === MAX_PENDING_EVENTS) {
      pending.shift();
      onOverflow();
    }
    pending.push(event);
  }
  return {
    receiveContinueActivity(event, type, _userInfo, details) {
      if (type !== "NSUserActivityTypeBrowsingWeb" || typeof details?.webpageURL !== "string")
        return;
      event.preventDefault();
      if (details.webpageURL.length > MAX_EVENT_CHARACTERS) return onOverflow();
      receive({ kind: "url", url: details.webpageURL });
    },
    receiveOpenUrl(event, url) {
      event.preventDefault();
      if (url.length > MAX_EVENT_CHARACTERS) return onOverflow();
      receive({ kind: "url", url });
    },
    receiveSecondInstance(_event, argv) {
      if (argv.length > MAX_ARGUMENTS || argv.reduce((size, value) => size + value.length, 0) > MAX_EVENT_CHARACTERS)
        return onOverflow();
      receive({ kind: "argv", argv: [...argv] });
    },
    onOpenUrl(listener) {
      urlListeners.push(listener);
    },
    onSecondInstance(listener) {
      instanceListeners.push(listener);
    },
    activate() {
      if (active || disposed) return;
      active = true;
      for (const event of pending.splice(0)) deliver(event);
    },
    dispose() {
      disposed = true;
      pending.length = urlListeners.length = instanceListeners.length = 0;
    }
  };
}
client.registerUserImageScheme();
const appDisplayName = getAppDisplayName();
applyNativeAppDisplayName(appDisplayName);
const userDataOverride = process.env.ELECTRON_USER_DATA_DIR ?? getCanaryUserDataDir();
if (userDataOverride) {
  deliveryNative.app.setPath(
    "userData",
    _n.isAbsolute(userDataOverride) ? userDataOverride : _n.resolve(process.cwd(), userDataOverride)
  );
}
const nativeStartupEvents = createNativeStartupEvents(() => {
  console.warn("[startup] discarded an oversized or excess pending native event");
});
deliveryNative.app.on("open-url", nativeStartupEvents.receiveOpenUrl);
deliveryNative.app.on("continue-activity", nativeStartupEvents.receiveContinueActivity);
deliveryNative.app.on("second-instance", nativeStartupEvents.receiveSecondInstance);
const isE2e = process.env.BLUME_E2E_MODE === "1";
const enforceLock = shouldEnforceSingleInstanceLock({
  isDev: utils.is.dev,
  isE2e,
  forceSingleInstanceLock: isE2e && process.env.BLUME_E2E_SINGLE_INSTANCE_LOCK === "1"
});
const mayStartNativeRuntime = !enforceLock || deliveryNative.app.requestSingleInstanceLock();
function applyBundledBackendDefaults(bundled, env, packaged) {
  for (const [name, value] of Object.entries(bundled)) {
    if (value && (packaged || !env[name])) env[name] = value;
  }
}
const STABLE_BACKEND_ENV = {
  auth: "BLUME_AUTH_URL",
  feedback: "BLUME_FEEDBACK_BOARD_URL",
  userAnalytics: "BLUME_USER_ANALYTICS_URL",
  referrals: "BLUME_REFERRALS_URL",
  insights: "BLUME_INSIGHTS_CONTROL_URL",
  llm: "BLUME_LLM_SERVICE_URL",
  router: "BLUME_ROUTER_URL"
};
const OPTIONAL_STABLE_BACKEND_ENV = {
  artifactSync: "BLUME_ARTIFACT_SYNC_URL",
  deliveriesRuntime: "BLUME_CONTROL_REMOTE_ENDPOINT"
};
class StableVersionRetiredError extends Error {
}
function stableBackendResponseError(status, version2) {
  if (status === 426) {
    return new StableVersionRetiredError(
      `Blume ${version2} is no longer supported. Install the latest stable version to continue.`
    );
  }
  return new Error(`HTTP ${status}`);
}
function bundledStableBackendManifest(version2, bundleId2, urls) {
  const optionalServices = {};
  for (const [service, envName] of Object.entries(OPTIONAL_STABLE_BACKEND_ENV)) {
    const url = urls[envName];
    if (url) optionalServices[service] = { url };
  }
  return parseStableBackendManifest(
    {
      version: version2,
      channel: "stable",
      bundleId: bundleId2,
      manifest: {
        services: {
          ...Object.fromEntries(
            Object.entries(STABLE_BACKEND_ENV).map(([service, envName]) => [
              service,
              { url: urls[envName] }
            ])
          ),
          ...optionalServices
        }
      }
    },
    version2,
    bundleId2
  );
}
function exactHttpsUrl(value, service) {
  try {
    return validateStableBackendServiceUrl(value, service);
  } catch {
    throw new Error(`Backend manifest is missing ${service}.`);
  }
}
function parseStableBackendManifest(value, version2, expectedBundleId, requireSelectedDeployment = false) {
  if (!value || typeof value !== "object") throw new Error("Backend manifest is not an object.");
  const envelope = value;
  if (envelope.version !== version2 || envelope.channel !== "stable" || envelope.bundleId !== expectedBundleId)
    throw new Error("Backend manifest release identity does not match the app.");
  if (!envelope.bundleId || !envelope.manifest?.services)
    throw new Error("Backend manifest is incomplete.");
  if (requireSelectedDeployment || envelope.backendDeploymentId !== void 0) {
    validateStableBackendSelection(value, version2, expectedBundleId);
    return envelope;
  }
  if (envelope.backendBundleId !== void 0 || envelope.sourceSha !== void 0 || envelope.components !== void 0) {
    throw new Error("Partial selected backend deployment identity is not allowed.");
  }
  for (const service of Object.keys(STABLE_BACKEND_ENV)) {
    exactHttpsUrl(envelope.manifest.services[service]?.url, service);
  }
  for (const service of Object.keys(OPTIONAL_STABLE_BACKEND_ENV)) {
    const url = envelope.manifest.services[service]?.url;
    if (url !== void 0) {
      try {
        exactHttpsUrl(url, service);
      } catch {
        throw new Error(`Backend manifest is missing optional ${service} endpoint.`);
      }
    }
  }
  return envelope;
}
function parseSelectedStableBackendManifest(value, version2, expectedBundleId) {
  return parseStableBackendManifest(value, version2, expectedBundleId, true);
}
function applyStableBackendManifest(envelope, env) {
  for (const [service, envName] of Object.entries(STABLE_BACKEND_ENV)) {
    env[envName] = envelope.manifest.services[service].url;
  }
  for (const [service, envName] of Object.entries(OPTIONAL_STABLE_BACKEND_ENV)) {
    const url = envelope.manifest.services[service]?.url;
    if (url) env[envName] = url;
  }
  env.BLUME_RELEASE_BUNDLE = envelope.bundleId;
  if (envelope.backendDeploymentId) {
    env.BLUME_BACKEND_DEPLOYMENT_ID = envelope.backendDeploymentId;
    env.BLUME_BACKEND_BUNDLE_ID = envelope.backendBundleId;
  }
}
function reportBackendStartupFailure(error, version2, showErrorBox, exit) {
  try {
    if (error instanceof StableVersionRetiredError) {
      showErrorBox(
        "Update Blume to continue",
        `Blume ${version2} is no longer supported. Install the latest stable version to open the app.

Download: https://updates.blume-page.com/desktop/stable/download

Keep your existing Blume data folder when installing the update.`
      );
    } else {
      showErrorBox(
        "Blume could not start",
        "Try opening Blume again. If the problem continues, reinstall the latest stable version.\n\nDownload: https://updates.blume-page.com/desktop/stable/download\n\nKeep your existing Blume data folder when reinstalling."
      );
    }
  } finally {
    exit(1);
  }
}
function stableBackendRetirementTombstone(version2, bundleId2) {
  return { kind: "stable-version-retired", version: version2, bundleId: bundleId2 };
}
function isStableBackendRetirementTombstone(value, version2, bundleId2) {
  return value !== null && typeof value === "object" && value.kind === "stable-version-retired" && value.version === version2 && value.bundleId === bundleId2;
}
async function readBackendManifestCacheFile(path) {
  try {
    return JSON.parse(await require$$0$2.readFile(path, "utf8"));
  } catch {
    return null;
  }
}
async function writeBackendManifestCacheFile(path, value) {
  await require$$0$2.mkdir(_n.dirname(path), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.${require$$0$1.randomUUID()}.tmp`;
  try {
    await require$$0$2.writeFile(temporaryPath, `${JSON.stringify(value)}
`, { mode: 384 });
    await require$$0$2.rename(temporaryPath, path);
  } catch (error) {
    await require$$0$2.unlink(temporaryPath).catch(() => void 0);
    throw error;
  }
}
const version = "2.0.26";
const bundleId = "blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9";
const registry = "https://blume-insights-control.agentic-cms-olav.workers.dev".replace(/\/+$/, "");
const bundledBackends = {
  BLUME_CONTROL_REMOTE_ENDPOINT: "https://blume-dlv-runtime-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  // Both release channels use the hosted client. Stable backend selection below
  // updates the deployment identity; the versioned Web Lab origin stays signed.
  BLUME_CLOUD_OWNER_URL: "https://blume-web-lab-release-2-0-26-bd358244.release.blume-codes.com",
  BLUME_BACKEND_DEPLOYMENT_ID: "bd-s-2-0-26-bd358244228f",
  BLUME_AUTH_URL: "https://blume-auth-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  BLUME_FEEDBACK_BOARD_URL: "https://blume-feedback-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  BLUME_USER_ANALYTICS_URL: "https://blume-analytics-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  BLUME_REFERRALS_URL: "https://blume-referrals-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  BLUME_INSIGHTS_CONTROL_URL: "https://blume-insights-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  BLUME_LLM_SERVICE_URL: "https://blume-llm-bd-s-2-0-26-bd358244228f.agentic-cms-olav.workers.dev",
  BLUME_ROUTER_URL: "https://blume-router-bd-s-2-0-26-bd358244228f.release.blume-codes.com",
  BLUME_ARTIFACT_SYNC_URL: "https://blume-artifact-sync-bd-s-2-0-26-bd358244228f.release.blume-codes.com"
};
applyBundledBackendDefaults(bundledBackends, process.env, deliveryNative.app.isPackaged);
async function configureStableBackends() {
  const cachePath = _n.join(deliveryNative.app.getPath("userData"), "release", `backend-${version}.json`);
  const retirementPath = `${cachePath}.retired`;
  const persistedRetirement = await readBackendManifestCacheFile(retirementPath);
  if (isStableBackendRetirementTombstone(persistedRetirement, version, bundleId)) {
    throw new StableVersionRetiredError(
      `Blume ${version} is no longer supported. Install the latest stable version to continue.`
    );
  }
  const cached = await readCachedSelection(cachePath);
  const fromRegistry = selectFromRegistry(cachePath, retirementPath);
  const manifest = cached ? await Promise.race([
    fromRegistry.catch((error) => {
      if (error instanceof StableVersionRetiredError) throw error;
      return cached;
    }),
    new Promise(
      (resolve) => setTimeout(() => resolve(cached), CACHED_REGISTRY_WAIT_MS)
    )
  ]) : await fromRegistry.catch((networkError) => {
    if (networkError instanceof StableVersionRetiredError) throw networkError;
    console.warn(
      `[backend-manifest] registry and cache unavailable; using the signed app's embedded backend bundle: ${networkError instanceof Error ? networkError.message : String(networkError)}`
    );
    return bundledStableBackendManifest(version, bundleId, process.env);
  });
  fromRegistry.catch(() => {
  });
  applyStableBackendManifest(manifest, process.env);
}
const CACHED_REGISTRY_WAIT_MS = 1500;
async function readCachedSelection(cachePath) {
  try {
    return parseSelectedStableBackendManifest(
      await readBackendManifestCacheFile(cachePath),
      version,
      bundleId
    );
  } catch {
    return null;
  }
}
async function selectFromRegistry(cachePath, retirementPath) {
  try {
    const response = await fetch(
      `${registry}/v1/backend-manifests/${encodeURIComponent(version)}`,
      {
        headers: { "cache-control": "no-cache" },
        redirect: "error",
        signal: AbortSignal.timeout(1e4)
      }
    );
    if (!response.ok) throw stableBackendResponseError(response.status, version);
    const payload = await response.json();
    const manifest = parseSelectedStableBackendManifest(payload, version, bundleId);
    try {
      await writeBackendManifestCacheFile(cachePath, manifest);
    } catch (cacheError) {
      console.warn(
        `[backend-manifest] selected registry backend but could not update its local cache: ${cacheError instanceof Error ? cacheError.message : String(cacheError)}`
      );
    }
    return manifest;
  } catch (networkError) {
    if (networkError instanceof StableVersionRetiredError) {
      try {
        await writeBackendManifestCacheFile(
          retirementPath,
          stableBackendRetirementTombstone(version, bundleId)
        );
      } catch (cacheError) {
        console.warn(
          `[backend-manifest] could not persist stable retirement: ${cacheError instanceof Error ? cacheError.message : String(cacheError)}`
        );
      }
    }
    throw networkError;
  }
}
if (!mayStartNativeRuntime) {
  nativeStartupEvents.dispose();
  deliveryNative.app.exit(0);
} else {
  void configureStableBackends().then(() => Promise.resolve().then(() => require("./index-DTYVwBun.js"))).then(() => nativeStartupEvents.activate()).catch((error) => {
    nativeStartupEvents.dispose();
    console.error("[backend-manifest] startup failed", error);
    reportBackendStartupFailure(error, version, deliveryNative.dialog.showErrorBox, (code) => deliveryNative.app.exit(code));
  });
}
exports.LAUNCH_AT_LOGIN_ARG = LAUNCH_AT_LOGIN_ARG;
exports.appDisplayName = appDisplayName;
exports.appIdForReleaseChannel = appIdForReleaseChannel;
exports.appReleaseChannel = appReleaseChannel;
exports.bootstrapReadyNativeApp = bootstrapReadyNativeApp;
exports.desktopReleaseChannel = desktopReleaseChannel;
exports.getAppDisplayName = getAppDisplayName;
exports.getBlumeRoot = getBlumeRoot;
exports.getOrCreateSharedBlumeDeviceId = getOrCreateSharedBlumeDeviceId;
exports.isHarnessRunsPath = isHarnessRunsPath;
exports.nativeStartupEvents = nativeStartupEvents;
exports.normalizeDevRuntimeProfile = normalizeDevRuntimeProfile;
exports.readBlumeJson = readBlumeJson;
exports.registerBlumeHomeIpcHandlers = registerBlumeHomeIpcHandlers;
exports.resolveDesktopReleaseMetadata = resolveDesktopReleaseMetadata;
exports.sanitizeMenuCommands = sanitizeMenuCommands;
exports.setApplicationMenuCommands = setApplicationMenuCommands;
exports.shouldDeferInitialBootIngestForUpdateCheck = shouldDeferInitialBootIngestForUpdateCheck;
exports.shouldTrackUsageTelemetry = shouldTrackUsageTelemetry;
exports.wasNativeShellLaunchedAtLogin = wasNativeShellLaunchedAtLogin;
exports.writeBlumeJson = writeBlumeJson;
exports.writeDevSandboxMeta = writeDevSandboxMeta;
//# sourceMappingURL=index.js.map

//# debugId=3d5b39c4-c4fe-5dd5-9745-c3f179c6abc7
