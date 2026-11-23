"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="aabe02ba-2485-5c7d-a8e6-c19de34e9dd6")}catch(e){}}();

const deliveryBridge = require("electron");
const preload = require("@electron-toolkit/preload");
const node_os = require("node:os");
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
const deliveryBridge__namespace = /* @__PURE__ */ _interopNamespaceDefault(deliveryBridge);
const OWNED_CHAT_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
];
const OWNED_CHAT_IMAGE_LIMITS = {
  count: 8,
  bytes: 2 * 1024 * 1024,
  nameLength: 120
};
const OWNED_CHAT_OPERATION = "owned_codex_chat";
const OWNED_CHAT_EFFORT_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;
function validateOwnedChatRequest(value) {
  if (!value || typeof value !== "object") throw Error("Invalid chat request");
  const input = value;
  const text = (key, limit) => typeof input[key] === "string" && input[key].trim().length > 0 && input[key].length <= limit;
  if (input.action === "modelCatalog") {
    if (!["codex", "claude"].includes(String(input.harness)) || !text("cwd", 4096))
      throw Error("Choose an agent and project folder");
    return {
      action: "modelCatalog",
      harness: input.harness,
      cwd: input.cwd
    };
  }
  if ((input.action === "create" || input.action === "setModel") && input.model !== void 0 && (!text("model", 200) || !/^[a-zA-Z0-9][a-zA-Z0-9._:/+-]*$/.test(String(input.model))))
    throw Error("Choose a valid model");
  if ((input.action === "create" || input.action === "setModel") && input.effort !== void 0 && (typeof input.effort !== "string" || !OWNED_CHAT_EFFORT_PATTERN.test(input.effort)))
    throw Error("Choose a valid reasoning effort");
  if (input.action === "create" && input.harness !== void 0 && !["codex", "claude"].includes(String(input.harness)))
    throw Error("Choose Codex or Claude");
  if (input.action === "create" && input.projectId !== void 0 && !text("projectId", 200))
    throw Error("Choose a project");
  if (input.action === "list") return { action: "list" };
  let images;
  if (input.action === "create" && input.cloud !== void 0) {
    const cloud = input.cloud;
    if (cloud?.workspaceId !== void 0 && (typeof cloud.workspaceId !== "string" || !/^[a-zA-Z0-9_-]{1,160}$/.test(cloud.workspaceId)))
      throw Error("Choose a cloud workspace");
    if (cloud?.importSubscription !== true)
      throw Error("Allow subscription sign-in import to create a cloud agent");
    if (!cloud || typeof cloud.repository !== "string" || cloud.repository.length > 2e3 || !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(
      cloud.repository
    ) || typeof cloud.revision !== "string" || !cloud.revision.trim() || cloud.revision.length > 256 || cloud.revision.startsWith("-") || /[\s\x00-\x1f]/.test(cloud.revision))
      throw Error("Choose a GitHub repository URL and starting branch or commit");
  }
  if (input.action === "create" || input.action === "send") {
    images = validateOwnedChatImages(input.images);
    if (!text("requestId", 160)) throw Error("Invalid message request");
    if (typeof input.message !== "string" || input.message.length > 32e3)
      throw Error("Enter a message of at most 32,000 characters");
    if (!input.message.trim() && !images?.length) throw Error("Enter a message or attach an image");
    if (input.action === "create" && !text("cwd", 4096)) throw Error("Choose a project folder");
  }
  if (input.action !== "create" && !text("id", 160)) throw Error("Choose a chat");
  if ((input.action === "dismissUncertain" || input.action === "dismissDelivery") && !text("requestId", 160))
    throw Error("Choose the uncertain message");
  if (input.action === "approval" && (!text("approvalId", 160) || typeof input.approved !== "boolean"))
    throw Error("Invalid approval answer");
  if (![
    "create",
    "get",
    "models",
    "setModel",
    "send",
    "interrupt",
    "approval",
    "dismissUncertain",
    "retryDelivery",
    "dismissDelivery"
  ].includes(String(input.action)))
    throw Error("Unknown chat action");
  return { ...input, ...images ? { images } : {} };
}
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/;
function validateOwnedChatImages(value) {
  if (value === void 0) return void 0;
  if (!Array.isArray(value)) throw Error("Invalid image attachments");
  if (value.length > OWNED_CHAT_IMAGE_LIMITS.count)
    throw Error(`Attach at most ${OWNED_CHAT_IMAGE_LIMITS.count} images to one message`);
  return value.map((item) => {
    if (!item || typeof item !== "object") throw Error("Invalid image attachment");
    const { name, mediaType, data } = item;
    if (typeof name !== "string" || !name.trim() || name.length > OWNED_CHAT_IMAGE_LIMITS.nameLength)
      throw Error("Invalid image name");
    if (!OWNED_CHAT_IMAGE_TYPES.includes(mediaType))
      throw Error("Attach PNG, JPEG, WebP or GIF images");
    if (typeof data !== "string" || !data || data.length % 4 !== 0)
      throw Error("Invalid image data");
    if (data.length > Math.ceil(OWNED_CHAT_IMAGE_LIMITS.bytes / 3) * 4)
      throw Error("Each image must be smaller than 2 MB");
    if (!BASE64.test(data)) throw Error("Invalid image data");
    return { name, mediaType, data };
  });
}
function ownedImageRequest(value) {
  if (!value || typeof value !== "object") throw Error("Invalid image chat request");
  const input = value;
  if (input.action !== "create" && input.action !== "send")
    throw Error("Only image create and send requests may use this port");
  if (input.action === "create" && (input.cloud !== void 0 || input.projectId !== void 0))
    throw Error("Images are available in chats on this computer.");
  const request = validateOwnedChatRequest({
    action: input.action,
    requestId: input.requestId,
    message: input.message,
    images: input.images,
    ...input.action === "create" ? { cwd: input.cwd, harness: input.harness } : { id: input.id }
  });
  if (!request.images?.length) throw Error("Attach an image to use this port");
  return request;
}
function createFeedClient(openPort, timeoutMs = 65e3) {
  let port;
  let cancelOpening;
  let opened = 0;
  const pending = /* @__PURE__ */ new Map();
  const listeners = /* @__PURE__ */ new Set();
  let sequence = 0;
  let imagePending = false;
  function receive(data) {
    const message = data;
    if (!message || typeof message !== "object") return;
    if (typeof message.id === "string") {
      const waiting = pending.get(message.id);
      if (!waiting) return;
      pending.delete(message.id);
      clearTimeout(waiting.timer);
      if (typeof message.error === "string") waiting.reject(Error(message.error));
      else waiting.resolve(message.result);
    } else if ("moved" in message) {
      const cursor = Number.isSafeInteger(message.moved) ? message.moved : void 0;
      for (const listener of listeners) listener(cursor);
    }
  }
  function connect() {
    if (!port) {
      const generation = ++opened;
      const handshake = new AbortController();
      let deadline;
      port = Promise.race([
        openPort(handshake.signal),
        new Promise((_, reject) => {
          cancelOpening = () => {
            clearTimeout(deadline);
            handshake.abort();
            reject(Error("Account changed. Try again."));
          };
          deadline = setTimeout(() => {
            handshake.abort();
            reject(Error("Blume ledger did not connect. Refresh before retrying."));
          }, timeoutMs);
        })
      ]).then(
        (next) => {
          clearTimeout(deadline);
          if (generation === opened) cancelOpening = void 0;
          if (generation !== opened) {
            next.close();
            throw Error("Account changed. Try again.");
          }
          next.addEventListener("message", (event) => {
            if (generation === opened) receive(event.data);
          });
          next.start();
          if (listeners.size) next.postMessage({ op: "follow" });
          return next;
        },
        (error) => {
          clearTimeout(deadline);
          if (generation === opened) cancelOpening = void 0;
          throw error;
        }
      );
      port.catch(() => {
        if (generation === opened) port = void 0;
      });
    }
    return port;
  }
  return {
    /** Image bytes cross only this port, not ipcRenderer.invoke or Electron main. One submission
     * at a time bounds retained payloads; a timeout is surfaced, never automatically retried. */
    async ownedImage(value) {
      if (imagePending)
        throw Error("An image message is already being submitted. Wait before retrying.");
      const input = ownedImageRequest(value);
      imagePending = true;
      try {
        const connection = connect();
        const generation = opened;
        const current = await connection;
        if (generation !== opened) throw Error("Account changed. Try again.");
        const id = `${++sequence}`;
        return await new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            pending.delete(id);
            reject(Error("Image submission timed out. Check the chat before retrying."));
          }, timeoutMs);
          pending.set(id, { resolve, reject, timer });
          try {
            current.postMessage({ id, op: "owned-image", input });
          } catch (error) {
            clearTimeout(timer);
            pending.delete(id);
            reject(error);
          }
        });
      } finally {
        imagePending = false;
      }
    },
    async changes(cursor, ledger) {
      if (!Number.isSafeInteger(cursor) || cursor < 0) throw Error("Invalid change cursor");
      if (ledger !== void 0 && (typeof ledger !== "string" || !/^[a-f0-9]{1,64}$/.test(ledger)))
        throw Error("Invalid ledger");
      const current = await connect();
      const id = `${++sequence}`;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(Error("Blume ledger timed out. Refresh before retrying."));
        }, timeoutMs);
        pending.set(id, { resolve, reject, timer });
        current.postMessage({
          id,
          op: "changes",
          cursor,
          ...ledger === void 0 ? {} : { ledger }
        });
      });
    },
    subscribe(listener) {
      const first = listeners.size === 0;
      listeners.add(listener);
      if (first) {
        const existing = port;
        if (existing)
          void existing.then(
            (current) => current.postMessage({ op: "follow" }),
            () => {
            }
          );
        else void connect().catch(() => {
        });
      }
      return () => {
        listeners.delete(listener);
        if (!listeners.size)
          void port?.then(
            (current) => current.postMessage({ op: "unfollow" }),
            () => {
            }
          );
      };
    },
    /** The account (or its workspace) changed: requests in flight are dropped and the next goes
     * through a port for the new one; followers are moved over and told to check. */
    reset() {
      const previous = port;
      cancelOpening?.();
      cancelOpening = void 0;
      port = void 0;
      opened++;
      void previous?.then(
        (current) => current.close(),
        () => {
        }
      );
      for (const [id, waiting] of pending) {
        clearTimeout(waiting.timer);
        waiting.reject(Error("Account changed. Try again."));
        pending.delete(id);
      }
      if (listeners.size) {
        void connect().catch(() => {
        });
        for (const listener of listeners) listener(void 0);
      }
    }
  };
}
function exposeDeliveryBridge(contextBridge, ipcRenderer, platform, build = {}) {
  const feed = createFeedClient(
    (signal) => new Promise((resolve, reject) => {
      const stop = () => {
        ipcRenderer.removeListener("control:feed", receive);
        signal.removeEventListener("abort", stop);
      };
      const receive = (event) => {
        stop();
        const port = event.ports?.[0];
        if (port) resolve(port);
        else reject(Error("Blume ledger is unavailable. Restart the app to reconnect."));
      };
      signal.addEventListener("abort", stop);
      ipcRenderer.on("control:feed", receive);
      ipcRenderer.send("control:feed");
    })
  );
  ipcRenderer.on("control:account-changed", () => feed.reset());
  function agentCall(operation, id) {
    if (typeof id !== "string" || !/^[a-z][a-z0-9-]{0,39}$/.test(id))
      return Promise.reject(new Error("Unknown agent"));
    return ipcRenderer.invoke("control:plugin", operation, { id });
  }
  function boundedRequest(operation, input) {
    const serialized = JSON.stringify(input ?? {});
    if (new TextEncoder().encode(serialized).byteLength > 64 * 1024) {
      return Promise.reject(new Error("Request exceeds 64 KiB. Send a smaller batch."));
    }
    return ipcRenderer.invoke("control:request", operation, input);
  }
  function accountRequest(operation, input) {
    if (new TextEncoder().encode(JSON.stringify(input ?? {})).byteLength > 1024)
      return Promise.reject(new Error("Account request is too large"));
    return ipcRenderer.invoke("control:account", operation, input);
  }
  function boundedPath(path) {
    return typeof path === "string" && path.length > 0 && path.length <= 4096 ? Promise.resolve(path) : Promise.reject(new Error("Invalid path"));
  }
  function homeDir() {
    const flag = process.argv.find((value) => value.startsWith("--blume-home="));
    return flag ? flag.slice("--blume-home=".length) : void 0;
  }
  contextBridge.exposeInMainWorld("blumeControl", {
    build: Object.freeze({ ...build, platform }),
    accountSignUp: (input) => accountRequest("signUp", input),
    accountProviders: () => accountRequest("providers"),
    accountCancelSocialSignIn: () => accountRequest("cancelSocialSignIn"),
    accountSignInSocial: (provider) => accountRequest("signInSocial", provider),
    accountSession: () => accountRequest("session"),
    accountSignIn: (input) => accountRequest("signIn", input),
    accountSignOut: () => accountRequest("signOut"),
    onAccountChanged: (listener) => {
      const notify = () => listener();
      ipcRenderer.on("control:account-changed", notify);
      return () => ipcRenderer.removeListener("control:account-changed", notify);
    },
    changes: (cursor, ledger) => feed.changes(cursor, ledger),
    subscribe: (listener) => feed.subscribe((cursor) => listener(cursor)),
    call: (operation, input) => operation === OWNED_CHAT_OPERATION && Array.isArray(input?.images) && input.images.length ? feed.ownedImage(input) : boundedRequest("call", { operation, input }),
    connect: (input) => boundedRequest("connect", input),
    installations: (input) => boundedRequest("installations", input),
    workspace: (input) => boundedRequest("workspace", input),
    openEvidence: (url) => {
      if (typeof url !== "string" || url.length > 2e3)
        return Promise.reject(new Error("Invalid evidence URL"));
      return ipcRenderer.invoke("control:open", url);
    },
    expand: () => ipcRenderer.invoke("control:expand"),
    openConversationAt: (pointer) => {
      const bounded = (value) => typeof value === "string" && value.length > 0 && value.length <= 256;
      if (!bounded(pointer?.harness) || !bounded(pointer?.sessionId) || pointer.messageId != null && !bounded(pointer.messageId))
        return Promise.reject(new Error("Invalid evidence pointer"));
      return ipcRenderer.invoke("control:open-conversation-at", {
        harness: pointer.harness,
        sessionId: pointer.sessionId,
        messageId: pointer.messageId ?? null
      });
    },
    // Status views only come back; the GitHub credential stays in main and the worker.
    github: {
      status: () => ipcRenderer.invoke("control:github", "status"),
      connect: () => ipcRenderer.invoke("control:github", "connect"),
      cancelConnect: () => ipcRenderer.invoke("control:github", "cancel"),
      openAuthorization: () => ipcRenderer.invoke("control:github", "openAuthorization"),
      openInstallation: (input) => ipcRenderer.invoke("control:github", "openInstallation", { chooseAccount: input?.chooseAccount === true }),
      disconnect: () => ipcRenderer.invoke("control:github", "disconnect"),
      sync: (input) => {
        const deliveryId = typeof input?.deliveryId === "string" ? input.deliveryId.slice(0, 160) : void 0;
        return ipcRenderer.invoke("control:github", "sync", deliveryId ? { deliveryId } : {});
      },
      // Only the pull request, its head, base and update cross; main validates them and the worker reads GitHub.
      pullRequestContent: (input) => ipcRenderer.invoke("control:github", "pullRequestContent", {
        pullRequestUrl: String(input?.pullRequestUrl ?? "").slice(0, 500),
        headSha: String(input?.headSha ?? "").slice(0, 40),
        ...Number.isSafeInteger(input?.updatedAt) ? { updatedAt: input.updatedAt } : {},
        ...typeof input?.baseBranch === "string" && input.baseBranch ? { baseBranch: input.baseBranch.slice(0, 200) } : {}
      }),
      onChanged: (listener) => {
        const notify = () => listener();
        ipcRenderer.on("control:github-changed", notify);
        return () => ipcRenderer.removeListener("control:github-changed", notify);
      }
    },
    // Installs and updates run in the utility worker; only agent ids and choices cross here.
    pluginInstaller: {
      status: () => ipcRenderer.invoke("control:plugin", "status"),
      devBuild: () => ipcRenderer.invoke("control:plugin", "devBuild"),
      install: (harnesses) => {
        if (!Array.isArray(harnesses) || harnesses.length === 0 || harnesses.length > 2 || !harnesses.every((harness) => harness === "claude" || harness === "codex"))
          return Promise.reject(new Error("Choose Claude Code, Codex or both"));
        return ipcRenderer.invoke("control:plugin", "install", { harnesses: [...harnesses] });
      },
      setAutoUpdate: (harness, enabled) => {
        if (harness !== "claude" && harness !== "codex" || typeof enabled !== "boolean")
          return Promise.reject(new Error("Invalid automatic update choice"));
        return ipcRenderer.invoke("control:plugin", "setAutoUpdate", { harness, enabled });
      },
      installation: (harness) => {
        if (harness !== "claude" && harness !== "codex") return Promise.reject(new Error("Unknown agent"));
        return ipcRenderer.invoke("control:plugin", "installation", { harness });
      },
      agents: {
        status: () => ipcRenderer.invoke("control:plugin", "agents"),
        install: (id) => agentCall("agentInstall", id),
        remove: (id) => agentCall("agentRemove", id),
        prompt: (id) => agentCall("agentPrompt", id),
        setupMessage: (id) => agentCall("agentSetup", id),
        installation: (id) => agentCall("agentInstallation", id)
      },
      onProgress: (listener) => {
        const notify = (_event, progress) => listener(progress);
        ipcRenderer.on("control:plugin-progress", notify);
        return () => ipcRenderer.removeListener("control:plugin-progress", notify);
      },
      onChanged: (listener) => {
        const notify = () => listener();
        ipcRenderer.on("control:plugin-changed", notify);
        return () => ipcRenderer.removeListener("control:plugin-changed", notify);
      }
    },
    projects: {
      homeDir: homeDir(),
      list: (input) => ipcRenderer.invoke("control:projects", "list", { refresh: input?.refresh === true }),
      scan: (input) => {
        if (typeof input?.projectId !== "string" || input.projectId.length > 64)
          return Promise.reject(new Error("Invalid project"));
        return ipcRenderer.invoke("control:projects", "scan", { projectId: input.projectId });
      },
      readFile: (path) => boundedPath(path).then(
        (value) => ipcRenderer.invoke("control:projects", "readFile", { path: value })
      ),
      browseGlobal: () => ipcRenderer.invoke("control:projects", "browseGlobal"),
      readGlobalEntry: (path) => boundedPath(path).then(
        (value) => ipcRenderer.invoke("control:projects", "readGlobalEntry", { path: value })
      ),
      onChanged: (listener) => {
        const notify = () => listener();
        ipcRenderer.on("control:projects-changed", notify);
        return () => ipcRenderer.removeListener("control:projects-changed", notify);
      }
    }
  });
}
exposeDeliveryBridge(deliveryBridge__namespace.contextBridge, deliveryBridge__namespace.ipcRenderer, process.platform);
const MAX_ARTIFACT_SYNC_ITEMS_PER_MESSAGE = 500;
const MAX_ARTIFACT_SYNC_MESSAGE_BYTES = 1024 * 1024;
function boundedArtifactSyncInvoke(channel, value, itemCount, ...args) {
  try {
    if (itemCount > MAX_ARTIFACT_SYNC_ITEMS_PER_MESSAGE) {
      throw new Error(
        `Artifact sync supports at most ${MAX_ARTIFACT_SYNC_ITEMS_PER_MESSAGE} items per request.`
      );
    }
    const serializedValue = JSON.stringify(value);
    if (serializedValue !== void 0 && Buffer.byteLength(serializedValue, "utf8") > MAX_ARTIFACT_SYNC_MESSAGE_BYTES) {
      throw new Error("Artifact sync request exceeds the 1 MB IPC limit.");
    }
    return deliveryBridge.ipcRenderer.invoke(channel, value, ...args);
  } catch (error) {
    return Promise.reject(error);
  }
}
const api = {
  search: (input) => deliveryBridge.ipcRenderer.invoke("search:query", input),
  // ---- conversations ----
  refreshConversations: (maxAgeMs) => deliveryBridge.ipcRenderer.invoke("db:conversations:refresh", maxAgeMs),
  listConversations: (opts) => deliveryBridge.ipcRenderer.invoke("db:conversations:list", opts),
  listConversationsForView: (opts, requestId) => requestId ? deliveryBridge.ipcRenderer.invoke("db:conversations:listForViewCancelable", opts, requestId) : deliveryBridge.ipcRenderer.invoke("db:conversations:listForView", opts),
  cancelConversationList: (requestId) => deliveryBridge.ipcRenderer.invoke("db:conversations:cancelList", requestId),
  getConversation: (ref) => deliveryBridge.ipcRenderer.invoke("db:conversations:get", ref),
  getTranscript: (ref, opts) => deliveryBridge.ipcRenderer.invoke("db:conversations:transcript", ref, opts),
  searchTranscript: (ref, query, beforeTurnPosition) => deliveryBridge.ipcRenderer.invoke("db:conversations:searchTranscript", ref, query, beforeTurnPosition),
  copyConversation: (ref, kind) => deliveryBridge.ipcRenderer.invoke("conversations:copy", ref, kind),
  openConversationLocation: (ref, target) => deliveryBridge.ipcRenderer.invoke("conversations:openLocation", ref, target),
  openFileLocation: (path, target) => deliveryBridge.ipcRenderer.invoke("system:openFileLocation", path, target),
  openFolderLocation: (path) => deliveryBridge.ipcRenderer.invoke("system:openFolderLocation", path),
  selectFolder: () => deliveryBridge.ipcRenderer.invoke("system:selectFolder"),
  continueConversation: (ref, target) => deliveryBridge.ipcRenderer.invoke("conversations:continue", ref, target),
  dismissConversation: (ref) => deliveryBridge.ipcRenderer.invoke("db:conversations:dismiss", ref),
  setConversationIdle: (ref) => deliveryBridge.ipcRenderer.invoke("db:conversations:idle", ref),
  resumeConversation: (ref) => deliveryBridge.ipcRenderer.invoke("db:conversations:resume", ref),
  regenerateConversationTitle: (source, ref) => deliveryBridge.ipcRenderer.invoke("db:conversations:regenerateTitle", source, ref),
  applyConversationTitleToHarness: (source, ref, title) => deliveryBridge.ipcRenderer.invoke("db:conversations:applyTitleToHarness", source, ref, title),
  revertConversationTitleToProvider: (ref) => deliveryBridge.ipcRenderer.invoke("db:conversations:revertTitleToProvider", ref),
  setConversationTitle: (ref, title) => deliveryBridge.ipcRenderer.invoke("db:conversations:setTitle", ref, title),
  // ---- projects / user turns ----
  listProjects: () => deliveryBridge.ipcRenderer.invoke("db:projects:list"),
  listRecentProjects: (limit, requestId) => requestId ? deliveryBridge.ipcRenderer.invoke("db:projects:listRecentCancelable", limit, requestId) : deliveryBridge.ipcRenderer.invoke("db:projects:listRecent", limit),
  cancelProjectList: (requestId) => deliveryBridge.ipcRenderer.invoke("db:projects:cancelList", requestId),
  getProject: (id) => deliveryBridge.ipcRenderer.invoke("db:projects:get", id),
  resolveProjectPath: (path, requestId) => deliveryBridge.ipcRenderer.invoke("db:projects:resolvePath", path, requestId),
  cancelProjectPathResolution: (requestId) => deliveryBridge.ipcRenderer.invoke("db:projects:cancelResolvePath", requestId),
  listActiveUserTurns: () => deliveryBridge.ipcRenderer.invoke("db:userTurns:active"),
  // ---- provider usage ----
  getUsageReport: (force) => deliveryBridge.ipcRenderer.invoke("usage:fetch", force),
  setCursorUsageCookie: (value) => deliveryBridge.ipcRenderer.invoke("usage:setCursorCookie", value),
  connectUsageProvider: (provider) => deliveryBridge.ipcRenderer.invoke("usage:connectProvider", provider),
  openKeychainAccess: () => deliveryBridge.ipcRenderer.invoke("usage:openKeychainAccess"),
  setAppUsageProductAccessAvailable: (available) => deliveryBridge.ipcRenderer.invoke("appUsage:setProductAccessAvailable", available),
  getAppUsageProcessRunningSeconds: () => deliveryBridge.ipcRenderer.invoke("appUsage:getTotalProcessRunningSeconds"),
  // ---- settings ----
  getAllSettings: () => deliveryBridge.ipcRenderer.invoke("db:settings:all"),
  getSetting: (key) => deliveryBridge.ipcRenderer.invoke("db:settings:get", key),
  setSetting: (key, value) => deliveryBridge.ipcRenderer.invoke("db:settings:set", key, value),
  listActiveAnnouncements: () => deliveryBridge.ipcRenderer.invoke("announcements:listActive"),
  copyAnnouncementPrompt: (prompt) => deliveryBridge.ipcRenderer.invoke("announcements:copyPrompt", prompt),
  openAnnouncementUrl: (url) => deliveryBridge.ipcRenderer.invoke("announcements:openUrl", url),
  listCareerOpenings: () => deliveryBridge.ipcRenderer.invoke("careers:listOpenings"),
  openCareerOpening: (url) => deliveryBridge.ipcRenderer.invoke("careers:openOpening", url),
  getTerminal: () => deliveryBridge.ipcRenderer.invoke("settings:getTerminal"),
  setTerminal: (app) => deliveryBridge.ipcRenderer.invoke("settings:setTerminal", app),
  // ---- embedded terminal ----
  listTerminalTabs: () => deliveryBridge.ipcRenderer.invoke("terminal:list"),
  openTerminalTab: (input) => deliveryBridge.ipcRenderer.invoke("terminal:open", input),
  openTerminalPage: (input) => deliveryBridge.ipcRenderer.invoke("terminal:openPage", input),
  writeTerminal: (tabId, data) => deliveryBridge.ipcRenderer.invoke("terminal:write", tabId, data),
  resizeTerminal: (tabId, size) => deliveryBridge.ipcRenderer.invoke("terminal:resize", tabId, size),
  restartTerminal: (tabId) => deliveryBridge.ipcRenderer.invoke("terminal:restart", tabId),
  closeTerminal: (tabId) => deliveryBridge.ipcRenderer.invoke("terminal:close", tabId),
  onTerminalOutput: (tabId, callback) => {
    const maxQueuedChars = 128 * 1024;
    let attached = false;
    let stopped = false;
    let queuedChars = 0;
    const queued = [];
    const listener = (_event, outputTabId, data) => {
      if (outputTabId !== tabId || stopped) return;
      if (attached) callback(data);
      else {
        queued.push(data);
        queuedChars += data.length;
        while (queuedChars > maxQueuedChars && queued.length > 1) {
          queuedChars -= queued.shift()?.length ?? 0;
        }
      }
    };
    deliveryBridge.ipcRenderer.on("terminal:output", listener);
    void deliveryBridge.ipcRenderer.invoke("terminal:attach", tabId).then((backlog) => {
      if (stopped) return;
      if (typeof backlog === "string" && backlog) callback(backlog);
      attached = true;
      for (const data of queued) callback(data);
      queued.length = 0;
      queuedChars = 0;
    });
    return () => {
      stopped = true;
      deliveryBridge.ipcRenderer.removeListener("terminal:output", listener);
      void deliveryBridge.ipcRenderer.invoke("terminal:detach", tabId);
    };
  },
  onTerminalStatus: (callback) => {
    const listener = (_event, tab) => callback(tab);
    deliveryBridge.ipcRenderer.on("terminal:status", listener);
    return () => deliveryBridge.ipcRenderer.removeListener("terminal:status", listener);
  },
  openTerminalAppForTab: (tabId) => deliveryBridge.ipcRenderer.invoke("terminal:openTerminalApp", tabId),
  onTerminalCommandExit: (callback) => {
    const listener = (_event, tabId, exitCode) => callback(tabId, exitCode);
    deliveryBridge.ipcRenderer.on("terminal:commandExit", listener);
    return () => deliveryBridge.ipcRenderer.removeListener("terminal:commandExit", listener);
  },
  onTerminalPageRequested: (callback) => {
    const listener = (_event, tab) => callback(tab);
    deliveryBridge.ipcRenderer.on("terminal:page-requested", listener);
    return () => deliveryBridge.ipcRenderer.removeListener("terminal:page-requested", listener);
  },
  // ---- referrals ----
  getReferralLink: () => deliveryBridge.ipcRenderer.invoke("referrals:getLink"),
  getReferralStatus: () => deliveryBridge.ipcRenderer.invoke("referrals:getStatus"),
  getOnboardingState: () => deliveryBridge.ipcRenderer.invoke("onboarding:getState"),
  completeOnboarding: () => deliveryBridge.ipcRenderer.invoke("onboarding:complete"),
  getConversationParseDefault: () => deliveryBridge.ipcRenderer.invoke("settings:conversationParseDefault"),
  getLaunchAtLogin: () => deliveryBridge.ipcRenderer.invoke("settings:getLaunchAtLogin"),
  setLaunchAtLogin: (enabled) => deliveryBridge.ipcRenderer.invoke("settings:setLaunchAtLogin", enabled),
  openLaunchAtLoginSettings: () => deliveryBridge.ipcRenderer.invoke("settings:openLaunchAtLoginSettings"),
  // ---- diagnostics / system ----
  getPerfSnapshot: () => deliveryBridge.ipcRenderer.invoke("perf:snapshot"),
  resetPerf: () => deliveryBridge.ipcRenderer.invoke("perf:reset"),
  log: (entry) => deliveryBridge.ipcRenderer.invoke("diagnostics:log", entry),
  getLogFilePath: () => deliveryBridge.ipcRenderer.invoke("diagnostics:getLogFilePath"),
  listDevFormatRoots: () => deliveryBridge.ipcRenderer.invoke("devFormats:listRoots"),
  listDevFormatChildren: (path) => deliveryBridge.ipcRenderer.invoke("devFormats:listChildren", path),
  readDevFormatFile: (path) => deliveryBridge.ipcRenderer.invoke("devFormats:readFile", path),
  getBlumeId: () => deliveryBridge.ipcRenderer.invoke("identity:get"),
  getBlumeProfile: () => deliveryBridge.ipcRenderer.invoke("identity:getProfile"),
  setBlumeProfileEmail: (email) => deliveryBridge.ipcRenderer.invoke("identity:setEmail", email),
  feedbackBoardGetAccess: () => deliveryBridge.ipcRenderer.invoke("feedbackBoard:getAccess"),
  feedbackBoardListTop: () => deliveryBridge.ipcRenderer.invoke("feedbackBoard:listTop"),
  accountGetSession: () => deliveryBridge.ipcRenderer.invoke("account:getSession"),
  accountRequestPasswordReset: (email) => deliveryBridge.ipcRenderer.invoke("account:requestPasswordReset", email),
  accountGetSocialProviders: () => deliveryBridge.ipcRenderer.invoke("account:getSocialProviders"),
  accountSignUp: (input) => deliveryBridge.ipcRenderer.invoke("account:signUp", input),
  accountSignIn: (input) => deliveryBridge.ipcRenderer.invoke("account:signIn", input),
  accountCancelSocialSignIn: () => deliveryBridge.ipcRenderer.invoke("account:cancelSocialSignIn"),
  accountSignInSocial: (provider) => deliveryBridge.ipcRenderer.invoke("account:signInSocial", provider),
  accountUpdateProfile: (input) => deliveryBridge.ipcRenderer.invoke("account:updateProfile", input),
  accountChangePassword: (input) => deliveryBridge.ipcRenderer.invoke("account:changePassword", input),
  accountListSessions: () => deliveryBridge.ipcRenderer.invoke("account:listSessions"),
  accountListDevices: () => deliveryBridge.ipcRenderer.invoke("account:listDevices"),
  accountRevokeSession: (sessionId) => deliveryBridge.ipcRenderer.invoke("account:revokeSession", sessionId),
  accountRevokeOtherSessions: () => deliveryBridge.ipcRenderer.invoke("account:revokeOtherSessions"),
  accountDelete: (input) => deliveryBridge.ipcRenderer.invoke("account:delete", input),
  accountSignOut: () => deliveryBridge.ipcRenderer.invoke("account:signOut"),
  feedbackBoardListPosts: (query) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:listPosts", query),
  feedbackBoardCreatePost: (input) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:createPost", input),
  feedbackBoardAddVote: (postId) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:addVote", postId),
  feedbackBoardListComments: (postId) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:listComments", postId),
  feedbackBoardCreateComment: (input) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:createComment", input),
  feedbackBoardUpdateStatus: (postId, status) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:updateStatus", postId, status),
  feedbackBoardDeletePost: (postId) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:deletePost", postId),
  feedbackBoardDeleteComment: (commentId) => deliveryBridge.ipcRenderer.invoke("feedbackBoard:deleteComment", commentId),
  chatwootWidgetMessages: (request) => deliveryBridge.ipcRenderer.invoke("chatwoot:widgetMessages", request),
  chatwootWidgetConfig: (request) => deliveryBridge.ipcRenderer.invoke("chatwoot:widgetConfig", request),
  chatwootWidgetContactUpdate: (request) => deliveryBridge.ipcRenderer.invoke("chatwoot:widgetContactUpdate", request),
  chatwootWidgetSendMessage: (request) => deliveryBridge.ipcRenderer.invoke("chatwoot:widgetSendMessage", request),
  getDevInfo: () => deliveryBridge.ipcRenderer.invoke("dev:info"),
  getPosthogFeatureFlagEvaluations: () => deliveryBridge.ipcRenderer.invoke("posthog:featureFlagEvaluations"),
  getPosthogFeatureFlagEnabled: (key) => deliveryBridge.ipcRenderer.invoke("posthog:featureFlagEnabled", key),
  getPosthogFeatureFlagValue: (key) => deliveryBridge.ipcRenderer.invoke("posthog:featureFlagValue", key),
  onPosthogFeatureFlagsChanged: (cb) => {
    const handler = () => cb();
    deliveryBridge.ipcRenderer.on("posthog:featureFlagsChanged", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("posthog:featureFlagsChanged", handler);
    };
  },
  getReleaseInfo: () => deliveryBridge.ipcRenderer.invoke("release:info"),
  getUpdateReadyState: () => deliveryBridge.ipcRenderer.invoke("updater:getReadyState"),
  restartToInstallUpdate: () => deliveryBridge.ipcRenderer.invoke("updater:restartToInstall"),
  isFullscreen: () => deliveryBridge.ipcRenderer.invoke("window:isFullscreen"),
  minimizeWindow: () => deliveryBridge.ipcRenderer.invoke("window:minimize"),
  closeWindow: () => deliveryBridge.ipcRenderer.invoke("window:close"),
  exportImage: (request) => deliveryBridge.ipcRenderer.invoke("image:export", request),
  shareText: (request) => deliveryBridge.ipcRenderer.invoke("share:text", request),
  linkPreview: (url) => deliveryBridge.ipcRenderer.invoke("linkPreview:capture", url),
  localLinkRunning: (url) => deliveryBridge.ipcRenderer.invoke("localLink:running", url),
  setAppBadge: (count) => deliveryBridge.ipcRenderer.invoke("app:setAppBadge", count),
  setCommandMenu: (commands) => deliveryBridge.ipcRenderer.invoke("app:setCommandMenu", commands),
  onMenuCommand: (cb) => {
    const handler = (_e, id) => cb(id);
    deliveryBridge.ipcRenderer.on("app:menu-command", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("app:menu-command", handler);
    };
  },
  // Frameless on Windows means the renderer draws its own window controls;
  // it needs the platform to decide. Plain value, not IPC.
  platform: process.platform,
  // Plain runtime metadata for display-only `~` path abbreviation.
  homeDir: node_os.homedir(),
  // ---- harnesses (system + per-project setup file scanning) ----
  listHarnessSetup: () => deliveryBridge.ipcRenderer.invoke("harnesses:listSetup"),
  listSetup: (query) => deliveryBridge.ipcRenderer.invoke("setup:list", query),
  listSetupVersions: (artifactId) => deliveryBridge.ipcRenderer.invoke("setup:listVersions", artifactId),
  getSetupVersion: (versionId) => deliveryBridge.ipcRenderer.invoke("setup:getVersion", versionId),
  applySetupChange: (change) => deliveryBridge.ipcRenderer.invoke("setup:applyChange", change),
  undoSetupArtifact: (artifactId) => deliveryBridge.ipcRenderer.invoke("setup:undo", artifactId),
  refreshSetup: () => deliveryBridge.ipcRenderer.invoke("setup:refresh"),
  readHarnessEntry: (path) => deliveryBridge.ipcRenderer.invoke("harnesses:readEntry", path),
  writeHarnessEntry: (path, content, options) => deliveryBridge.ipcRenderer.invoke("harnesses:writeEntry", path, content, options),
  scanProject: (path, requestId, context) => deliveryBridge.ipcRenderer.invoke("harnesses:scanProject", path, requestId, context),
  cancelProjectScan: (requestId) => deliveryBridge.ipcRenderer.invoke("harnesses:cancelProjectScan", requestId),
  readProjectFile: (path) => deliveryBridge.ipcRenderer.invoke("harnesses:readProjectFile", path),
  writeProjectFile: (path, content, options) => deliveryBridge.ipcRenderer.invoke("harnesses:writeProjectFile", path, content, options),
  deleteSetupArtifact: (artifact) => deliveryBridge.ipcRenderer.invoke("harnesses:deleteArtifact", artifact),
  listArtifactSyncStates: (artifacts) => boundedArtifactSyncInvoke("setup:listSyncStates", artifacts, artifacts?.length ?? 0),
  previewArtifactSync: (request, requestId) => boundedArtifactSyncInvoke(
    "setup:previewSync",
    request,
    Array.isArray(request?.artifacts) ? request.artifacts.length : 1,
    requestId
  ),
  cancelArtifactSyncPreview: (requestId) => deliveryBridge.ipcRenderer.invoke("setup:cancelPreviewSync", requestId),
  setArtifactSynced: (selection) => boundedArtifactSyncInvoke(
    "setup:setSynced",
    selection,
    Array.isArray(selection?.artifacts) ? selection.artifacts.length : 0
  ),
  placeArtifactSynced: (placement) => boundedArtifactSyncInvoke("setup:placeSynced", placement, 1),
  // ---- harnesses ----
  listHarnesses: () => deliveryBridge.ipcRenderer.invoke("harnesses:list"),
  detectFirstRunHarnesses: () => deliveryBridge.ipcRenderer.invoke("harnesses:detectFirstRun"),
  codexBrand: () => deliveryBridge.ipcRenderer.invoke("harnesses:codexBrand"),
  suggestFirstRunProjectFolders: () => deliveryBridge.ipcRenderer.invoke("harnesses:suggestProjectFolders"),
  createFirstRunStarterFolder: () => deliveryBridge.ipcRenderer.invoke("harnesses:createStarterFolder"),
  openHarnessSetupTerminal: (harnessId, step, cwd) => deliveryBridge.ipcRenderer.invoke("harnesses:openSetupTerminal", harnessId, step, cwd),
  managedRouterStatus: () => deliveryBridge.ipcRenderer.invoke("harnesses:managedRouterStatus"),
  setUpManagedPi: () => deliveryBridge.ipcRenderer.invoke("harnesses:setUpManagedPi"),
  openManagedBilling: () => deliveryBridge.ipcRenderer.invoke("harnesses:openManagedBilling"),
  signalAnalyticsGetDashboard: (input) => deliveryBridge.ipcRenderer.invoke("signalAnalytics:getDashboard", input),
  // ---- wrapped ----
  listWrapped: (limit) => deliveryBridge.ipcRenderer.invoke("wrapped:list", limit),
  getWrapped: (id) => deliveryBridge.ipcRenderer.invoke("wrapped:get", id),
  generateWrappedLastSevenDays: () => deliveryBridge.ipcRenderer.invoke("wrapped:generateLastSevenDays"),
  listWrappedAvailableWeeks: (limit, beforePeriodStart, requestToken) => deliveryBridge.ipcRenderer.invoke("wrapped:listAvailableWeeks", limit, beforePeriodStart, requestToken),
  cancelWrappedAvailableWeeks: (requestToken) => deliveryBridge.ipcRenderer.invoke("wrapped:cancelListAvailableWeeks", requestToken),
  generateWrappedWeek: (periodStart) => deliveryBridge.ipcRenderer.invoke("wrapped:generateWeek", periodStart),
  notifyWrappedFeatureFlagEnabled: () => deliveryBridge.ipcRenderer.invoke("wrapped:featureFlagEnabled"),
  getUnseenWrapped: () => deliveryBridge.ipcRenderer.invoke("wrapped:getUnseen"),
  markWrappedSeen: (id) => deliveryBridge.ipcRenderer.invoke("wrapped:markSeen", id),
  // ---- subscriptions ----
  onImageContextMenuAction: (cb) => {
    const handler = (_event, action) => cb(action);
    deliveryBridge.ipcRenderer.on("app:image-context-menu-action", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("app:image-context-menu-action", handler);
    };
  },
  onWrappedChanged: (cb) => {
    const handler = () => cb();
    deliveryBridge.ipcRenderer.on("wrapped:changed", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("wrapped:changed", handler);
    };
  },
  onConversationsChanged: (cb) => {
    const handler = () => cb();
    deliveryBridge.ipcRenderer.on("conversations:changed", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("conversations:changed", handler);
    };
  },
  onFullscreenChanged: (cb) => {
    const handler = (_e, value) => cb(value);
    deliveryBridge.ipcRenderer.on("window:fullscreen-changed", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("window:fullscreen-changed", handler);
    };
  },
  onUpdateReadyChanged: (cb) => {
    const handler = (_e, state) => cb(state);
    deliveryBridge.ipcRenderer.on("updater:ready-changed", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("updater:ready-changed", handler);
    };
  },
  onDeepLink: (cb) => {
    const handler = (_e, path) => cb(path);
    deliveryBridge.ipcRenderer.on("app:deep-link", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("app:deep-link", handler);
    };
  },
  onOpenConversation: (cb) => {
    const handler = (_e, ref) => cb(ref);
    deliveryBridge.ipcRenderer.on("app:open-conversation", handler);
    return () => {
      deliveryBridge.ipcRenderer.removeListener("app:open-conversation", handler);
    };
  }
};
if (process.contextIsolated) {
  try {
    deliveryBridge.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    deliveryBridge.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
//# sourceMappingURL=index.js.map

//# debugId=aabe02ba-2485-5c7d-a8e6-c19de34e9dd6
