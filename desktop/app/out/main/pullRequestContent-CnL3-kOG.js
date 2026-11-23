"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f4bdab54-84cb-5e8a-b936-7d6f7cb0f0a6")}catch(e){}}();

const require$$0 = require("process");
const require$$0$1 = require("buffer");
const OWNED_CHAT_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
];
const messages = {
  "cloud-request-failed": "The cloud request could not finish. Retry, or check cloud access in Settings → Agents.",
  "sign-in-required": "Sign in to Blume again to use cloud agents.",
  "account-forbidden": "Cloud access is not enabled for this Blume account. Check that you are signed in to the intended account and deployment.",
  "installation-conflict": "This Blume installation is linked to another account. Sign in with that account to use cloud agents.",
  "installation-revoked": "This Blume installation has been revoked. Restore its access before using cloud agents.",
  "account-changed": "Your Blume account or workspace changed. Retry from the current workspace.",
  "account-unavailable": "Blume could not verify your account. Try again shortly."
};
class CloudAccountFailure extends Error {
  constructor(code) {
    super(messages[code]);
    this.cloudAccountFailure = code;
  }
}
function readCloudAccountFailure(value) {
  const code = value?.cloudAccountFailure;
  return new CloudAccountFailure(
    typeof code === "string" && Object.hasOwn(messages, code) ? code : "account-unavailable"
  );
}
function cloudAccountTokenFailure(status) {
  return new CloudAccountFailure(
    status === 401 ? "sign-in-required" : status === 403 ? "account-forbidden" : status === 409 ? "installation-conflict" : status === 410 ? "installation-revoked" : "account-unavailable"
  );
}
const LOCAL_TOOLS_OPERATION = "owned_local_tools";
function isLocalToolDeviceAction(action) {
  return typeof action === "string" && ["status", "connect", "disconnect", "heartbeat", "complete"].includes(action);
}
function validateLocalTool(value) {
  if (!value || typeof value !== "object") throw Error("Invalid Mac tool request");
  const v = value;
  const text2 = (key, max) => typeof v[key] === "string" && v[key].length > 0 && v[key].length <= max && !v[key].includes("\0");
  const integer = (key, max) => Number.isSafeInteger(v[key]) && Number(v[key]) >= 0 && Number(v[key]) <= max;
  switch (v.action) {
    case "command":
      if (!text2("command", 16384) || !integer("timeoutMs", 3e5) || Number(v.timeoutMs) < 1e3)
        break;
      return { action: v.action, command: v.command, timeoutMs: Number(v.timeoutMs) };
    case "windows":
      return { action: v.action };
    case "capture":
      if (integer("windowId", 4294967295) && Number(v.windowId) > 0)
        return { action: v.action, windowId: Number(v.windowId) };
      break;
    case "click":
      if (text2("view", 100) && integer("x", 32768) && integer("y", 32768))
        return { action: v.action, view: v.view, x: Number(v.x), y: Number(v.y) };
      break;
    case "type":
      if (text2("view", 100) && text2("text", 4e3))
        return { action: v.action, view: v.view, text: v.text };
      break;
    case "key":
      if (text2("view", 100) && ["enter", "tab", "escape", "backspace", "up", "down", "left", "right"].includes(
        String(v.key)
      ))
        return {
          action: v.action,
          view: v.view,
          key: v.key
        };
  }
  throw Error("Invalid or oversized Mac tool request");
}
function toolAllowed(tool, grant) {
  return tool.action === "command" ? grant.commands : grant.computer;
}
const OWNED_CHAT_IMAGE_LIMITS = {
  count: 8,
  bytes: 2 * 1024 * 1024,
  fileBytes: 25 * 1024 * 1024,
  retainedBytes: 256 * 1024 * 1024,
  edge: 1568,
  nameLength: 120
};
const OWNED_CHAT_OPERATION = "owned_codex_chat";
const OWNED_CLOUD_SUBSCRIPTION_OPERATION = "owned_cloud_subscription";
const CLOUD_ACCESS_RECONNECT_MESSAGE = "Cloud access needs to be reconnected. Open Settings → Agents in Blume on your computer and reconnect cloud access. Your chats and files are preserved.";
function validateCloudSubscriptionRequest(value) {
  const input = value;
  if (input?.action === "disconnect" && input.confirm === "delete-cloud-workspaces")
    return { action: "disconnect", confirm: "delete-cloud-workspaces" };
  if (input?.action === "status") return { action: "status" };
  if (input?.action === "reconnect") return { action: "reconnect" };
  if (input?.action === "import" && ["codex", "claude"].includes(String(input.harness)))
    return { action: "import", harness: input.harness };
  if (input?.action === "token" && input.harness === "claude" && typeof input.token === "string" && /^sk-ant-oat01-[A-Za-z0-9_-]{20,4096}$/.test(input.token.trim()))
    return { action: "token", harness: "claude", token: input.token.trim() };
  throw Error("Choose an agent sign-in or a Claude subscription token from claude setup-token.");
}
const OWNED_CHAT_EFFORT_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;
function validateOwnedChatRequest(value) {
  if (!value || typeof value !== "object") throw Error("Invalid chat request");
  const input = value;
  const text2 = (key, limit) => typeof input[key] === "string" && input[key].trim().length > 0 && input[key].length <= limit;
  if (input.action === "modelCatalog") {
    if (!["codex", "claude"].includes(String(input.harness)) || !text2("cwd", 4096))
      throw Error("Choose an agent and project folder");
    return {
      action: "modelCatalog",
      harness: input.harness,
      cwd: input.cwd
    };
  }
  if ((input.action === "create" || input.action === "setModel") && input.model !== void 0 && (!text2("model", 200) || !/^[a-zA-Z0-9][a-zA-Z0-9._:/+-]*$/.test(String(input.model))))
    throw Error("Choose a valid model");
  if ((input.action === "create" || input.action === "setModel") && input.effort !== void 0 && (typeof input.effort !== "string" || !OWNED_CHAT_EFFORT_PATTERN.test(input.effort)))
    throw Error("Choose a valid reasoning effort");
  if (input.action === "create" && input.harness !== void 0 && !["codex", "claude"].includes(String(input.harness)))
    throw Error("Choose Codex or Claude");
  if (input.action === "create" && input.projectId !== void 0 && !text2("projectId", 200))
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
    if (!text2("requestId", 160)) throw Error("Invalid message request");
    if (typeof input.message !== "string" || input.message.length > 32e3)
      throw Error("Enter a message of at most 32,000 characters");
    if (!input.message.trim() && !images?.length) throw Error("Enter a message or attach an image");
    if (input.action === "create" && !text2("cwd", 4096)) throw Error("Choose a project folder");
  }
  if (input.action !== "create" && !text2("id", 160)) throw Error("Choose a chat");
  if ((input.action === "dismissUncertain" || input.action === "dismissDelivery") && !text2("requestId", 160))
    throw Error("Choose the uncertain message");
  if (input.action === "approval" && (!text2("approvalId", 160) || typeof input.approved !== "boolean"))
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
const ascii = (bytes, start, end) => String.fromCharCode(...bytes.subarray(start, end));
function sniffImageType(bytes) {
  if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte))
    return "image/png";
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return "image/jpeg";
  if (bytes.length >= 6 && ["GIF87a", "GIF89a"].includes(ascii(bytes, 0, 6))) return "image/gif";
  if (bytes.length >= 12 && ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 12) === "WEBP")
    return "image/webp";
  return void 0;
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
const OWNED_CLOUD_FILES_OPERATION = "owned_cloud_files";
function validateCloudFilesRequest(value) {
  const input = value;
  if (!input || typeof input.id !== "string" || !input.id || input.id.length > 160 || !["list", "read"].includes(input.action) || typeof input.path !== "string" || input.path.length > 2048 || input.path.startsWith("/") || input.path.includes("\\") || /[\x00-\x1f]/.test(input.path) || input.path.split("/").some((part) => part === ".." || part === ".git"))
    throw Error("Choose a file inside the cloud project");
  return { id: input.id, path: input.path, action: input.action };
}
async function bindOwnedChatProject(value, read, cloudProjectCwd) {
  const candidate = value;
  if (candidate?.action !== "create" || candidate.projectId === void 0)
    return validateOwnedChatRequest(value);
  if (typeof candidate.projectId !== "string" || !/^[a-zA-Z0-9_-]{1,160}$/.test(candidate.projectId))
    throw Error("Choose an existing project");
  const projectId = candidate.projectId;
  const project = (await read(projectId)).items?.find((item) => item.id === projectId);
  if (!project || !Object.hasOwn(project, "codeSource"))
    throw Error("Reconnect to the current project configuration before creating this chat");
  if (!project.codeSource)
    throw Error("This project no longer uses cloud code. Choose its current code location again.");
  if (candidate.cloud?.importSubscription !== true)
    throw Error(
      "This project uses cloud code. Allow subscription sign-in import to start its agent."
    );
  return validateOwnedChatRequest({
    ...value,
    cwd: cloudProjectCwd,
    cloud: {
      repository: project.codeSource.repository,
      revision: project.codeSource.revision,
      workspaceId: project.codeSource.workspaceId,
      importSubscription: true
    }
  });
}
async function readOwnedChatModels(rpc) {
  const models = /* @__PURE__ */ new Map();
  let cursor;
  const seen = /* @__PURE__ */ new Set();
  for (let page = 0; page < 5; page++) {
    const result = await rpc.request("model/list", { limit: 100, ...cursor ? { cursor } : {}, includeHidden: false });
    if (!Array.isArray(result.data)) throw Error("The agent could not list its models. Try again.");
    for (const item of result.data.slice(0, 100)) {
      if (item.hidden || typeof item.model !== "string" || !/^[a-zA-Z0-9][a-zA-Z0-9._:/+-]{0,199}$/.test(item.model))
        continue;
      const efforts = readEfforts(item.supportedReasoningEfforts);
      const defaultEffort = typeof item.defaultReasoningEffort === "string" && efforts.some((effort) => effort.id === item.defaultReasoningEffort) ? item.defaultReasoningEffort : void 0;
      models.set(item.model, {
        id: item.model,
        name: typeof item.displayName === "string" ? item.displayName.slice(0, 120) : item.model,
        description: typeof item.description === "string" ? item.description.slice(0, 240) : "",
        ...item.isDefault ? { isDefault: true } : {},
        ...efforts.length ? { efforts } : {},
        ...defaultEffort ? { defaultEffort } : {}
      });
      if (models.size > 100)
        throw Error(
          "The agent returned too many models. Narrow its model configuration and try again."
        );
    }
    if (!result.nextCursor) return [...models.values()];
    if (typeof result.nextCursor !== "string" || seen.has(result.nextCursor)) break;
    cursor = result.nextCursor;
    seen.add(cursor);
  }
  throw Error("The agent model list could not be loaded completely. Try again.");
}
function readEfforts(value) {
  if (!Array.isArray(value)) return [];
  const efforts = /* @__PURE__ */ new Map();
  for (const option of value.slice(0, 12)) {
    const id = option?.reasoningEffort;
    if (typeof id !== "string" || !OWNED_CHAT_EFFORT_PATTERN.test(id) || efforts.has(id)) continue;
    const description = option.description;
    efforts.set(id, {
      id,
      description: typeof description === "string" ? description.slice(0, 240) : ""
    });
  }
  return [...efforts.values()];
}
class OwnedDirectRejected extends Error {
}
const OWNED_DIRECT_OPERATION = "owned_chat_dispatch";
const OWNED_DIRECT_ACTIONS = /* @__PURE__ */ new Set([
  "message_send",
  "approval_decide",
  "approve",
  "request_changes",
  "request_answer",
  "release_approval",
  "plan_comment"
]);
function validateOwnedDirectCommand(value) {
  const c = value;
  if (!c || !OWNED_DIRECT_ACTIONS.has(c.operation) || typeof c.id !== "string" || !c.id || c.id.length > 120 || !c.input || typeof c.input !== "object" || Array.isArray(c.input) || c.input.requestId !== c.id || !Array.isArray(c.threadIds) || c.threadIds.length > 100 || c.threadIds.some((id) => typeof id !== "string" || !id || id.length > 160) || JSON.stringify(c).length > 64e3)
    throw Error("Invalid owned chat delivery");
  return c;
}
class CodexRequestRejected extends Error {
}
const MAX_ACTIVE_CHATS = 50;
const REVIEW_DECISIONS = /* @__PURE__ */ new Set([
  "approve",
  "approval_decide",
  "request_changes",
  "release_approval"
]);
function isReviewDecision(operation) {
  return REVIEW_DECISIONS.has(operation ?? "");
}
const OWNED_TITLE_EXCERPT = { messages: 8, chars: 2e3 };
function ownedTitleExcerpt(messages2) {
  const said = messages2.filter(
    (message) => (message.role === "user" || message.role === "assistant") && Boolean(message.text.trim())
  );
  const first = said.find((message) => message.role === "user");
  const latest = said.slice(-7);
  return (first && !latest.includes(first) ? [first, ...latest] : latest).map((message) => ({
    role: message.role,
    text: message.text.trim().slice(0, OWNED_TITLE_EXCERPT.chars)
  }));
}
function createOwnedCodexChats(options) {
  const chats = /* @__PURE__ */ new Map();
  const live = /* @__PURE__ */ new Map();
  const pumping = /* @__PURE__ */ new Set();
  const jobs = /* @__PURE__ */ new Set();
  const connecting = /* @__PURE__ */ new Set();
  const connections = /* @__PURE__ */ new Map();
  const creating = /* @__PURE__ */ new Map();
  const reservations = /* @__PURE__ */ new Set();
  const modelLists = /* @__PURE__ */ new Map();
  let modelListGeneration = 0;
  let commands = [];
  let loaded;
  let mutation = Promise.resolve();
  let disk = Promise.resolve();
  let stopped = false;
  let saveTimer;
  let externalIndex = structuredClone(options.initialExternalChats ?? []);
  let externalIndexKey = JSON.stringify(externalIndex);
  let externalIndexError;
  let externalGeneration = 0;
  let externalRead;
  function cacheExternalIndex(items) {
    if (stopped) return;
    const summaries = items.map((chat) => ({ ...chat, messages: [] })).sort((a, b) => a.id.localeCompare(b.id));
    const key = JSON.stringify(summaries);
    if (key === externalIndexKey && !externalIndexError) return;
    externalIndexError = void 0;
    externalIndex = summaries;
    externalIndexKey = key;
    options.changed?.();
  }
  function cacheExternalChat(chat) {
    externalGeneration++;
    cacheExternalIndex([...externalIndex.filter((item) => item.id !== chat.id), chat]);
  }
  function refreshExternalIndex() {
    if (!options.external || externalRead || stopped) return;
    const generation = externalGeneration;
    externalRead = Promise.resolve().then(() => options.external.list()).then((items) => {
      if (generation === externalGeneration) cacheExternalIndex(items);
    }).catch(() => {
      if (stopped || generation !== externalGeneration || externalIndexError) return;
      externalIndexError = "Cloud connection unavailable. Showing saved cloud chats.";
      options.changed?.();
    }).finally(() => {
      externalRead = void 0;
    });
  }
  function isLocalRecipient(threadId) {
    return [...chats.values()].some(
      (chat) => chat.threadId === threadId && !reservations.has(chat.id)
    );
  }
  function pendingFor(chat) {
    const own = commands.filter((command) => command.threadIds.includes(chat.threadId));
    const ids = [
      .../* @__PURE__ */ new Set([...chat.pendingDeliveryIds ?? [], ...own.map((command) => command.id)])
    ];
    return {
      pendingDeliveries: ids.length || chat.pendingDeliveries || void 0,
      pendingDeliveryIds: ids
    };
  }
  const view = (chat) => {
    trim(chat);
    const {
      queue: _queue,
      accepted: _accepted,
      ledgerSeen: _ledgerSeen,
      spent: _spent,
      ...result
    } = chat;
    const uncertain = chat.status === "error" ? chat.queue.find((item) => item.state === "sending") : void 0;
    return structuredClone({
      ...result,
      ...pendingFor(result),
      // The renderer gets where to load each saved image from, never where it is on disk.
      messages: result.messages.map(
        (message) => message.images?.length ? {
          ...message,
          images: message.images.map(({ file, ...image }) => {
            const src = file ? options.attachments?.url?.({ ...image, file }) : void 0;
            return src ? { ...image, src } : image;
          })
        } : message
      ),
      queuedMessageIds: chat.queue.filter((message) => message.state !== "sent").map((message) => message.id),
      uncertainMessage: uncertain ? {
        id: uncertain.id,
        text: uncertain.text || (uncertain.images ?? []).map((image) => `Image: ${image.name}`).join("\n")
      } : void 0
    });
  };
  const turnInput = (message) => [
    ...message.text.trim() || !message.images?.length ? [{ type: "text", text: message.text, text_elements: [] }] : [],
    ...(message.images ?? []).map((image) => ({ type: "localImage", path: image.path }))
  ];
  const shown = (images) => images?.length ? images.map(({ name, mediaType, bytes, file }) => ({
    name,
    mediaType,
    bytes,
    ...file ? { file } : {}
  })) : void 0;
  const discard = async (images) => {
    if (images?.length && options.attachments)
      await (options.attachments.removeRetained ? options.attachments.removeRetained(images) : options.attachments.remove(
        images.filter(
          (image) => "path" in image && typeof image.path === "string"
        )
      )).catch(() => {
      });
  };
  const dropped = (before, chat) => {
    const kept = new Set(chat.messages);
    const queued = new Set(chat.queue.map((message) => message.id));
    return before.filter((message) => !kept.has(message) && !queued.has(message.id)).flatMap((message) => message.images?.filter((image) => image.file) ?? []);
  };
  function bound() {
    const retained = [];
    for (const chat of chats.values()) {
      const queued = new Set(chat.queue.map((item) => item.id));
      for (const [index, message] of chat.messages.entries())
        if (!queued.has(message.id)) {
          for (const image of message.images ?? [])
            if (image.file) retained.push({ chat, image, at: message.at ?? chat.createdAt + index });
        }
    }
    let total = retained.reduce((sum, item) => sum + item.image.bytes, 0);
    if (total <= OWNED_CHAT_IMAGE_LIMITS.retainedBytes) return false;
    retained.sort((a, b) => a.at - b.at);
    const evicted = [];
    for (const item of retained) {
      if (total <= OWNED_CHAT_IMAGE_LIMITS.retainedBytes) break;
      total -= item.image.bytes;
      evicted.push({ ...item.image });
      delete item.image.file;
    }
    void discard(evicted);
    return true;
  }
  function flushLegacy(chat) {
    const current = live.get(chat.id);
    if (current?.turnId || current?.starting) return;
    const spent = chat.spent ?? [];
    chat.spent = [];
    void discard(spent);
  }
  function retire(chat, messages2) {
    const ids = new Set(messages2.map((message) => message.id));
    chat.queue = chat.queue.filter((message) => !ids.has(message.id));
    const shown2 = new Set(chat.messages.map((message) => message.id));
    chat.spent = [
      ...chat.spent ?? [],
      ...messages2.flatMap(
        (message) => shown2.has(message.id) ? (message.images ?? []).filter((image) => !image.file) : []
      )
    ];
    flushLegacy(chat);
    void discard(
      messages2.flatMap((message) => shown2.has(message.id) ? [] : message.images ?? [])
    );
    bound();
  }
  function load() {
    return loaded ??= (async () => {
      const saved = await options.store.load() ?? { version: 1, chats: [] };
      if (saved.version !== 1 || !Array.isArray(saved.chats))
        throw Error("Unknown saved chat format");
      commands = (saved.commands ?? []).map(validateOwnedDirectCommand);
      for (const chat of saved.chats) {
        if (!chat.threadId) continue;
        if (!chat.id || !options.isAbsolutePath(chat.cwd) || !Array.isArray(chat.queue) || !Array.isArray(chat.messages))
          throw Error("Invalid saved chat");
        const uncertain = chat.queue.some((message) => message.state === "sending");
        const interrupted = chat.status === "running" || chat.status === "approval" || uncertain;
        const resume = chat.status === "running" && !uncertain;
        if (resume && !chat.queue.some((message) => message.state === "queued")) {
          const id = options.newId();
          chat.queue.push({
            id,
            text: "Blume restarted while you were working. Continue the unfinished task from the existing conversation. Check the current state before repeating any action that may already have completed. Preserve all previous instructions and approval requirements; this restart does not grant any new approval.",
            state: "queued"
          });
          chat.messages.push({
            id,
            role: "system",
            at: Date.now(),
            text: "Blume restarted. Automatically resuming the interrupted work."
          });
        }
        const { spent: _spent, ...kept } = chat;
        chats.set(chat.id, {
          ...kept,
          spent: [],
          ledgerSeen: chat.ledgerSeen ?? [],
          approvals: [],
          status: resume ? "idle" : interrupted ? "error" : chat.status,
          ...resume ? { error: void 0 } : interrupted ? {
            error: "Blume restarted while the agent was working. Send a message to resume this chat."
          } : {}
        });
      }
      const retained = [...chats.values()].flatMap((chat) => [
        ...chat.queue.flatMap((item) => item.images?.map((image) => image.path) ?? []),
        ...chat.messages.flatMap(
          (message) => message.images?.flatMap((image) => image.file ? [image.file] : []) ?? []
        )
      ]);
      if (options.attachments?.pruneRetained)
        await options.attachments.pruneRetained(retained).catch(() => {
        });
      else if (options.attachments?.prune) {
        const hasRetained = [...chats.values()].some(
          (chat) => chat.messages.some((message) => message.images?.some((image) => image.file))
        );
        if (!hasRetained)
          await options.attachments.prune(
            [...chats.values()].flatMap(
              (chat) => chat.queue.flatMap((message) => message.images ?? [])
            )
          ).catch(() => {
          });
      }
      if (!options.attachments?.pruneRetained && !options.attachments?.prune) {
        const keep = new Set(
          [...chats.values()].flatMap(
            (chat) => chat.queue.flatMap((message) => message.images?.map((image) => image.path) ?? [])
          )
        );
        await discard(
          saved.chats.flatMap((chat) => chat.spent ?? []).filter((image) => !keep.has(image.path))
        );
      }
      const evicted = bound();
      if (evicted || saved.chats.some((chat) => chat.status === "running")) await save();
    })();
  }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = void 0;
    const snapshot = structuredClone({
      version: 1,
      chats: [...chats.values()].filter((chat) => chat.threadId).map(
        (chat) => live.get(chat.id)?.cancelRequested && chat.status === "running" ? { ...chat, status: "idle" } : chat
      ),
      commands
    });
    const next = disk.then(() => options.store.save(snapshot));
    disk = next.catch(() => {
    });
    return next;
  }
  function changed(chat) {
    chat.updatedAt = Math.max(Date.now(), chat.updatedAt + 1);
    options.changed?.();
    if (!stopped && !saveTimer)
      saveTimer = setTimeout(() => {
        saveTimer = void 0;
        void save().catch((error2) => {
          chat.status = "error";
          chat.error = `Could not save chat: ${String(error2)}`;
          options.changed?.();
        });
      }, 150);
  }
  function trim(chat) {
    const before = chat.messages;
    const encoder = new TextEncoder();
    let bytes = 2;
    const messages2 = chat.messages.slice(-200);
    let start = messages2.length;
    for (let i = messages2.length - 1; i >= 0; i--) {
      const message = messages2[i];
      message.text = message.text.slice(-32e3);
      if (message.tool)
        message.tool = {
          ...message.tool,
          name: message.tool.name.slice(0, 200),
          input: message.tool.input?.slice(0, 16e3),
          result: message.tool.result?.slice(0, 16e3)
        };
      let size = encoder.encode(JSON.stringify(message)).byteLength + 1;
      for (let attempts = 0; size > 96e3 && attempts < 4; attempts++) {
        message.text = message.text.slice(-Math.floor(message.text.length / 2));
        if (message.tool) {
          message.tool.input = message.tool.input?.slice(
            0,
            Math.floor(message.tool.input.length / 2)
          );
          message.tool.result = message.tool.result?.slice(
            0,
            Math.floor(message.tool.result.length / 2)
          );
        }
        size = encoder.encode(JSON.stringify(message)).byteLength + 1;
      }
      if (bytes + size > 2e5) break;
      bytes += size;
      start = i;
    }
    chat.messages = messages2.slice(start);
    void discard(dropped(before, chat));
  }
  function error(chat, cause) {
    if (stopped) return;
    chat.status = "error";
    chat.error = cause instanceof Error ? cause.message : String(cause);
    changed(chat);
  }
  function idle(chat, current) {
    clearTimeout(current.idleTimer);
    clearTimeout(current.titleTimer);
    if (live.get(chat.id) !== current) return;
    flushLegacy(chat);
    current.idleTimer = setTimeout(() => {
      if (live.get(chat.id) !== current) return;
      if (current.turnId || current.starting || chat.approvals.length) return;
      current.rpc.close();
      live.delete(chat.id);
    }, options.idleMs ?? 3e4);
    current.idleTimer.unref?.();
  }
  async function interrupt(chat, current) {
    if (!current.cancelRequested || !current.turnId || current.interruptSent) return;
    current.interruptSent = true;
    const turnId = current.turnId;
    try {
      const result = await current.rpc.request("turn/interrupt", {
        threadId: chat.threadId,
        turnId
      });
      if (result.closed && live.get(chat.id) === current) {
        live.delete(chat.id);
        current.turnId = void 0;
        flushLegacy(chat);
        chat.status = "idle";
        changed(chat);
      }
    } catch (cause) {
      current.interruptSent = false;
      if (cause instanceof CodexRequestRejected && cause.message === "no active turn to interrupt") {
        if (live.get(chat.id) === current && current.turnId === turnId) {
          current.turnId = void 0;
          flushLegacy(chat);
          chat.status = "idle";
          if (!current.starting) idle(chat, current);
          changed(chat);
        }
        return;
      }
      throw cause;
    }
  }
  function notification(chat, message) {
    const current = live.get(chat.id);
    const params = message.params ?? {};
    if (params.threadId && params.threadId !== chat.threadId) return;
    if (message.id !== void 0 && message.method) {
      if (!current) return;
      if (["item/commandExecution/requestApproval", "item/fileChange/requestApproval"].includes(
        message.method
      )) {
        current.rpc.reply(message.id, { decision: "accept" });
      } else if (message.method === "mcpServer/elicitation/request" && params.mode === "form" && params._meta?.codex_approval_kind === "mcp_tool_call" && !Object.keys(
        params.requestedSchema?.properties ?? {}
      ).length) {
        current.rpc.reply(message.id, { action: "accept", content: {}, _meta: null });
      } else {
        current.rpc.reject(
          message.id,
          "This request is not supported in Blume. Ask the person in a chat message or with Blume MCP."
        );
        chat.messages.push({
          id: options.newId(),
          role: "system",
          text: `The agent requested input Blume cannot display yet (${message.method}). Ask the agent to continue using chat messages.`
        });
        trim(chat);
      }
    } else if (message.method === "thread/model/updated") {
      if (!current || params.threadId !== chat.threadId) return;
      if (!adoptModel(chat, params.model)) return;
    } else if (message.method === "thread/name/updated") {
      if (!current || params.threadId !== chat.threadId) return;
      current.titleVersion = (current.titleVersion ?? 0) + 1;
      adoptTitle(chat, params.threadName);
      return;
    } else if (message.method === "turn/started" && current) {
      current.turnId = String(params.turn?.id ?? "");
      chat.status = "running";
      void interrupt(chat, current).catch((cause) => error(chat, cause));
    } else if (message.method === "item/agentMessage/delta") {
      const id = String(params.itemId);
      let item = chat.messages.find((item2) => item2.id === id);
      if (!item) {
        item = { id, role: "assistant", at: Date.now(), text: "" };
        chat.messages.push(item);
      }
      item.text += String(params.delta ?? "");
      trim(chat);
    } else if (message.method === "item/completed" || message.method === "item/started") {
      const item = params.item;
      if (item?.id && ["commandExecution", "fileChange", "mcpToolCall"].includes(item.type ?? "")) {
        const existing = chat.messages.find((message2) => message2.id === item.id);
        const tool = {
          name: item.tool ?? item.command ?? item.type,
          input: JSON.stringify(item.arguments ?? {}).slice(0, 16e3),
          result: (item.aggregatedOutput ?? JSON.stringify(item.result ?? "")).slice(0, 16e3),
          status: item.status === "failed" ? "failed" : message.method === "item/completed" ? "completed" : "running"
        };
        if (existing) existing.tool = tool;
        else chat.messages.push({ id: item.id, role: "tool", text: "", at: Date.now(), tool });
        trim(chat);
      }
      if (item?.type === "agentMessage" && item.id && typeof item.text === "string") {
        const existing = chat.messages.find((message2) => message2.id === item.id);
        if (existing) existing.text = item.text;
        else chat.messages.push({ id: item.id, role: "assistant", at: Date.now(), text: item.text });
        trim(chat);
      }
    } else if (message.method === "turn/completed" && current) {
      const turn = params.turn;
      current.turnId = void 0;
      chat.approvals = [];
      current.requests.clear();
      chat.status = turn?.status === "failed" ? "error" : "idle";
      if (turn?.status === "failed")
        chat.error = turn.error?.message ?? "The agent could not finish this turn";
      else delete chat.error;
      idle(chat, current);
      refreshTitle(chat, current);
      if (turn?.status !== "failed") nameChat(chat, current);
      if (!current.starting) kick(chat);
    } else if (message.method === "serverRequest/resolved") {
      const id = String(params.requestId);
      current?.requests.delete(id);
      chat.approvals = chat.approvals.filter((item) => item.id !== id);
    } else return;
    changed(chat);
  }
  function adoptModel(chat, value) {
    if (typeof value !== "string" || !/^[a-zA-Z0-9][a-zA-Z0-9._:/+-]{0,199}$/.test(value) || chat.model === value)
      return false;
    chat.model = value;
    return true;
  }
  function adoptTitle(chat, value) {
    if (stopped || typeof value !== "string" || !value.trim()) return;
    const title = value.trim().slice(0, 500);
    if (chat.title === title && chat.titleSource === "provider") return;
    chat.title = title;
    chat.titleSource = "provider";
    changed(chat);
  }
  function refreshTitle(chat, current) {
    if (stopped || live.get(chat.id) !== current || current.titleRead) return;
    clearTimeout(current.titleTimer);
    const version = current.titleVersion;
    current.titleRead = current.rpc.request("thread/read", {
      threadId: chat.threadId,
      includeTurns: false
    }).then((result) => {
      if (!stopped && live.get(chat.id) === current && current.titleVersion === version && result.thread?.id === chat.threadId)
        adoptTitle(chat, result.thread.name);
    }).catch(() => {
    }).finally(() => {
      current.titleRead = void 0;
      if (!stopped && live.get(chat.id) === current) {
        current.titleTimer = setTimeout(() => refreshTitle(chat, current), 5e3);
        current.titleTimer.unref?.();
      }
    });
  }
  function nameChat(chat, current) {
    const generate = options.generateTitle;
    if (!generate || stopped || live.get(chat.id) !== current || current.titleNamed || (chat.harness ?? "codex") !== "codex" || !chat.threadId || chat.titleSource === "provider")
      return;
    const messages2 = ownedTitleExcerpt(chat.messages);
    if (!messages2.some((message) => message.role === "user")) return;
    current.titleNamed = true;
    const version = current.titleVersion;
    const stillWanted = () => !stopped && live.get(chat.id) === current && current.titleVersion === version && chat.titleSource !== "provider";
    void generate(messages2).then(async (generated) => {
      const name = generated?.trim().slice(0, 100);
      if (!name || !stillWanted()) return;
      await current.rpc.request("thread/name/set", { threadId: chat.threadId, name });
      if (stillWanted()) adoptTitle(chat, name);
    }).catch(() => {
    });
  }
  async function connect(chat, creating2 = false) {
    const pending = connections.get(chat.id);
    if (pending) return pending;
    const job = connectOnce(chat, creating2);
    connections.set(chat.id, job);
    try {
      return await job;
    } finally {
      connections.delete(chat.id);
    }
  }
  async function connectOnce(chat, creating2 = false) {
    if (stopped) throw Error("Chat runtime stopped");
    const existing = live.get(chat.id);
    if (existing) {
      clearTimeout(existing.idleTimer);
      return existing;
    }
    if (live.size + connecting.size >= MAX_ACTIVE_CHATS)
      throw Error(`${MAX_ACTIVE_CHATS} agent chats are active. Stop one or wait for it to finish.`);
    connecting.add(chat.id);
    try {
      const config = await options.configuration(chat.cwd, chat.harness ?? "codex");
      if (stopped) throw Error("Chat runtime stopped");
      const rpc = options.createTransport({
        cwd: chat.cwd,
        harness: chat.harness ?? "codex",
        onMessage: (message) => {
          if (!stopped && live.get(chat.id)?.rpc === rpc) notification(chat, message);
        },
        onExit: (cause) => {
          const current2 = live.get(chat.id);
          if (current2?.rpc !== rpc) return;
          clearTimeout(current2.idleTimer);
          clearTimeout(current2.titleTimer);
          live.delete(chat.id);
          current2.turnId = void 0;
          flushLegacy(chat);
          chat.approvals = [];
          error(chat, cause);
        }
      });
      const current = { rpc, starting: false, requests: /* @__PURE__ */ new Map() };
      live.set(chat.id, current);
      connecting.delete(chat.id);
      try {
        await rpc.initialize();
        if (stopped) throw Error("Chat runtime stopped");
        const result = await rpc.request(creating2 ? "thread/start" : "thread/resume", {
          ...creating2 ? {} : { threadId: chat.threadId, excludeTurns: true },
          cwd: chat.cwd,
          ...chat.model ? { model: chat.model } : {},
          ...chat.effort ? { effort: chat.effort } : {},
          config,
          sandbox: "workspace-write",
          approvalPolicy: "on-request",
          developerInstructions: "This chat is owned by Blume. Messages and recorded review decisions arrive directly as user turns on this session. Do not poll or read the Blume inbox to receive them and do not acknowledge them through MCP. Use blume_owned for Blume tools when the work requires them. Do not invent approvals. When an image helps answer the person, include it in your reply with Markdown image syntax: ![Description](<image source>). Use an HTTPS image URL" + (options.externallySandboxed ? ". Local cloud workspace paths cannot be displayed; use an accessible image URL supplied by your tools." : " or an absolute path to a PNG, JPEG, WebP or GIF inside this chat’s working directory. Save generated images there before referencing them. Local images must be at most 20 MiB. Do not embed base64 image data in your reply.")
        });
        if (stopped) throw Error("Chat runtime stopped");
        if (!result.thread?.id || !creating2 && result.thread.id !== chat.threadId)
          throw Error("The agent returned a different chat identity");
        chat.threadId = result.thread.id;
        adoptModel(chat, result.model);
        adoptTitle(chat, result.thread.name);
        const mcp = await rpc.request("mcpServerStatus/list", { threadId: chat.threadId, serverName: "blume_owned" });
        const server = mcp.data.find((item) => item.name === "blume_owned");
        if (!server || server.toolsError || !Object.keys(server.tools).some((name) => name.endsWith("blume_context")))
          throw Error("Blume MCP did not connect. Check your Blume sign-in and try again.");
        chat.mcpReady = true;
        refreshTitle(chat, current);
        for (const pending of chat.queue.filter((item) => item.state === "sending")) {
          const history = await rpc.request("thread/turns/list", {
            threadId: chat.threadId,
            limit: 20,
            itemsView: "full",
            sortDirection: "desc"
          });
          if (history.data.some(
            (turn) => turn.items?.some(
              (item) => item.type === "userMessage" && item.clientId === pending.id
            )
          )) {
            pending.state = "sent";
            retire(chat, [pending]);
            chat.accepted = [...chat.accepted, pending.id].slice(-2e3);
          } else
            throw Error(
              "The previous message has an uncertain delivery status. Check the conversation, then dismiss this send before continuing. It will not be sent again automatically."
            );
        }
        await save();
        return current;
      } catch (cause) {
        rpc.close();
        live.delete(chat.id);
        chat.mcpReady = false;
        throw cause;
      }
    } finally {
      connecting.delete(chat.id);
    }
  }
  function kick(chat) {
    if (stopped) return;
    const job = pump(chat).catch((cause) => error(chat, cause));
    jobs.add(job);
    void job.finally(() => jobs.delete(job));
  }
  async function pump(chat) {
    if (stopped || pumping.has(chat.id)) return;
    const active = live.get(chat.id);
    if (!canSend(active)) return;
    if (!chat.queue.some((item) => item.state === "queued")) return;
    pumping.add(chat.id);
    try {
      const current = await connect(chat);
      if (stopped) return;
      if (!canSend(current)) return;
      const message = chat.queue.find((item) => item.state === "queued");
      if (!message) {
        if (!current.turnId) idle(chat, current);
        return;
      }
      current.starting = true;
      const steering = current.turnId;
      if (!steering) {
        current.cancelRequested = false;
        current.interruptSent = false;
      }
      try {
        message.state = "sending";
        chat.status = "running";
        delete chat.error;
        changed(chat);
        await save();
        if (stopped) {
          message.state = "queued";
          chat.status = "idle";
          return;
        }
        const result = await current.rpc.request(steering ? "turn/steer" : "turn/start", {
          threadId: chat.threadId,
          ...steering ? { expectedTurnId: steering } : {},
          clientUserMessageId: message.id,
          ...!steering && chat.model ? { model: chat.model } : {},
          ...!steering && chat.effort ? { effort: chat.effort } : {},
          ...!steering && options.externallySandboxed && (chat.harness ?? "codex") === "codex" ? { sandboxPolicy: { type: "externalSandbox", networkAccess: "enabled" } } : {},
          input: turnInput(message)
        });
        message.state = "sent";
        chat.accepted = [...chat.accepted, message.id].slice(-2e3);
        retire(
          chat,
          chat.queue.filter((item) => item.state === "sent")
        );
        if (!steering && chat.status === "running" && result.turn?.status === "inProgress")
          current.turnId = result.turn.id;
        await interrupt(chat, current);
        bound();
        await save();
      } catch (cause) {
        if (current.cancelRequested) {
          retire(chat, [message]);
          chat.accepted = [...chat.accepted, message.id].slice(-2e3);
          bound();
        } else if (steering && cause instanceof CodexRequestRejected) {
          message.state = "queued";
          current.steerRejectedTurnId = steering;
        } else {
          if (cause instanceof CodexRequestRejected) message.state = "queued";
          error(chat, cause);
          current.rpc.close();
          live.delete(chat.id);
        }
      } finally {
        current.starting = false;
        flushLegacy(chat);
        changed(chat);
      }
      if (!current.turnId && chat.status !== "error") idle(chat, current);
    } catch (cause) {
      error(chat, cause);
    } finally {
      pumping.delete(chat.id);
      if (!stopped && chat.status !== "error" && canSend(live.get(chat.id)) && chat.queue.some((item) => item.state === "queued"))
        kick(chat);
    }
  }
  function canSend(current) {
    return !current?.starting && (!current?.turnId || !current.cancelRequested && current.steerRejectedTurnId !== current.turnId);
  }
  async function enqueue(chat, requestId, text2, images) {
    if (chat.accepted.includes(requestId)) return;
    if (chat.queue.some((item) => item.id === requestId)) {
      kick(chat);
      return;
    }
    if (chat.queue.length >= 50)
      throw Error("This chat has too many queued messages. Wait for the agent to reply.");
    let saved;
    if (images?.length) {
      if (!options.attachments) throw Error("Images cannot be attached in this chat runtime");
      saved = await options.attachments.save(chat.id, requestId, images);
    }
    const before = saved ? { queue: [...chat.queue], messages: [...chat.messages], status: chat.status } : void 0;
    chat.queue.push({ id: requestId, text: text2, state: "queued", ...saved ? { images: saved } : {} });
    chat.messages.push({
      id: requestId,
      role: "user",
      at: Date.now(),
      text: text2,
      ...saved ? { images: shown(saved) } : {}
    });
    if (chat.status === "idle") chat.status = "running";
    trim(chat);
    try {
      await save();
    } catch (cause) {
      if (before) {
        chat.queue = before.queue;
        chat.messages = before.messages;
        chat.status = before.status;
        void discard(saved);
      }
      throw cause;
    }
    if (saved && bound()) await save().catch(() => {
    });
    kick(chat);
    changed(chat);
  }
  const delivering = /* @__PURE__ */ new Map();
  function commandChanged(command) {
    for (const chat of chats.values()) if (command.threadIds.includes(chat.threadId)) changed(chat);
  }
  function deliverCommand(command, resolved) {
    const active = delivering.get(command.id);
    if (active) return active;
    const job = deliverCommandOnce(command, resolved).finally(() => delivering.delete(command.id));
    delivering.set(command.id, job);
    return job;
  }
  async function deliverCommandOnce(command, resolved) {
    if (stopped || !options.dispatch) throw Error("Direct review delivery is unavailable");
    let result;
    const uncertain = command.uncertain;
    await serialize(async () => {
      command.uncertain = true;
      await save();
    });
    try {
      result = await options.dispatch(command);
    } catch (cause) {
      await serialize(async () => {
        if (stopped) return;
        if (cause instanceof OwnedDirectRejected && !uncertain)
          commands = commands.filter((item) => item.id !== command.id);
        else command.uncertain = true;
        commandChanged(command);
        await save();
      });
      throw cause;
    }
    const remoteMessages = [];
    if (!Array.isArray(result.directMessages))
      throw Error("This backend does not support direct chat delivery");
    const known = resolved ?? [];
    const external = result.directMessages.every(
      ({ threadId }) => isLocalRecipient(threadId) || known.some((chat) => chat.threadId === threadId)
    ) ? known : await options.external?.list() ?? [];
    await serialize(async () => {
      if (stopped) throw Error("Chat runtime stopped");
      const touched = /* @__PURE__ */ new Set();
      for (const message of result.directMessages) {
        const chat = [...chats.values()].find((chat2) => chat2.threadId === message.threadId);
        const remote = external.find((chat2) => chat2.threadId === message.threadId);
        if (!chat && !remote || !command.threadIds.includes(message.threadId))
          throw Error("Decision targets a chat this runtime does not own");
        if (typeof message.id !== "string" || typeof message.text !== "string" || message.text.length > 32e3)
          throw Error("Invalid direct review message");
        const id = `decision:${message.id}`;
        if (!chat && remote) {
          remoteMessages.push({
            id: remote.id,
            requestId: id,
            message: message.text
          });
          continue;
        }
        if (!chat) throw Error("Decision targets an unavailable chat");
        if (!chat.accepted.includes(id) && !chat.queue.some((item) => item.id === id)) {
          if (chat.queue.length >= 50) throw Error("This chat has too many queued messages");
          chat.queue.push({ id, text: message.text, state: "queued" });
          chat.messages.push({ id, role: "user", at: Date.now(), text: message.text });
          trim(chat);
        }
        touched.add(chat);
      }
      await save();
      for (const chat of touched) {
        changed(chat);
        kick(chat);
      }
    });
    for (const message of remoteMessages)
      await options.external.request({ action: "send", ...message });
    return serialize(async () => {
      if (stopped) throw Error("Chat runtime stopped");
      const previous = commands;
      commands = commands.filter((item) => item.id !== command.id);
      try {
        await save();
      } catch (cause) {
        commands = previous;
        throw cause;
      }
      commandChanged(command);
      return result;
    });
  }
  function serialize(work) {
    const next = mutation.then(work);
    mutation = next.catch(() => {
    });
    return next;
  }
  return {
    /** Ownership routing must never use the eventually refreshed UI discovery cache. */
    async resolveRecipients(recipients, operation) {
      await load();
      if (stopped) throw Error("Chat runtime stopped");
      let external = [];
      if (options.external && !recipients.every(isLocalRecipient)) {
        try {
          external = await options.external.list();
        } catch (error2) {
          if (!isReviewDecision(operation) || error2 instanceof CloudAccountFailure && error2.cloudAccountFailure === "account-changed")
            throw error2;
        }
      }
      if (stopped) throw Error("Chat runtime stopped");
      return [
        ...[...chats.values()].filter((chat) => !reservations.has(chat.id) && recipients.includes(chat.threadId)).map(view),
        ...external
      ].filter((chat) => recipients.includes(chat.threadId));
    },
    async files(input) {
      if (stopped || !options.external?.files) throw Error("Cloud files are unavailable");
      return options.external.files(input);
    },
    async macSnapshot(id, input) {
      if (typeof id !== "string" || !id || id.length > 160) throw Error("Choose a cloud chat");
      if (stopped || !options.external?.snapshot) throw Error("Cloud snapshots are unavailable");
      return options.external.snapshot(id, input);
    },
    async localTools(id, input) {
      if (typeof id !== "string" || !id || id.length > 160) throw Error("Choose a cloud chat");
      if (stopped || !options.external?.localTools) throw Error("Mac tools are unavailable");
      const action = input?.action;
      if (!isLocalToolDeviceAction(action)) throw Error("Unsupported Mac device operation");
      return options.external.localTools(id, input);
    },
    async macStatus(id) {
      if (typeof id !== "string" || !id || id.length > 160) throw Error("Choose a cloud chat");
      if (stopped || !options.external?.localTools)
        throw Error("Mac connection status is unavailable");
      return options.external.localTools(id, { action: "status" });
    },
    async subscriptions(input) {
      if (stopped || !options.external?.subscriptions)
        throw Error("Cloud agent sign-in is unavailable");
      return options.external.subscriptions(input);
    },
    get hasChats() {
      return chats.size > 0;
    },
    async request(value) {
      const request = validateOwnedChatRequest(value);
      if (request.action === "modelCatalog") {
        if (stopped || !options.modelCatalog)
          throw Error("Model discovery is unavailable in this runtime");
        if (!options.isAbsolutePath(request.cwd) || !await options.isDirectory(request.cwd))
          throw Error("Choose an existing absolute project folder");
        return options.modelCatalog(request.harness, request.cwd);
      }
      await load();
      if (stopped) throw Error("Chat runtime stopped");
      if (request.action === "create" && request.cloud) {
        if (request.images?.length) throw Error("Images are available in chats on this computer.");
        if (!options.external) throw Error("Cloud agents are not configured for this runtime");
        const external = await options.external.list();
        if (external.length >= 100 && !external.some((chat) => chat.id === request.requestId))
          throw Error("This workspace already has 100 owned chats");
        const remote = await options.external.request(request);
        cacheExternalChat(remote);
        return remote;
      }
      if (request.action !== "create" && request.action !== "list" && request.action !== "retryDelivery" && request.action !== "dismissDelivery" && !chats.has(request.id) && options.external) {
        if (request.action === "send" && request.images?.length)
          throw Error("Images are available in chats on this computer.");
        const remote = await options.external.request(request);
        cacheExternalChat(remote);
        return { ...remote, ...pendingFor(remote) };
      }
      if (request.action === "create") {
        const pending = creating.get(request.requestId);
        if (pending) return pending;
        const job = (async () => {
          const reservation = await serialize(async () => {
            await load();
            if (stopped) throw Error("Chat runtime stopped");
            const existing = chats.get(request.requestId);
            if (existing) return { chat: existing, created: false };
            if (!options.isAbsolutePath(request.cwd) || !await options.isDirectory(request.cwd))
              throw Error("Choose an existing absolute project folder");
            if (chats.size >= 100) throw Error("This workspace already has 100 owned chats");
            const chat2 = {
              id: request.requestId,
              threadId: "",
              harness: request.harness ?? "codex",
              ...request.model ? { model: request.model } : {},
              ...request.effort ? { effort: request.effort } : {},
              title: request.message.trim().split("\n")[0].slice(0, 100) || request.images?.[0]?.name.slice(0, 100) || "Image",
              cwd: request.cwd,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              status: "idle",
              messages: [],
              approvals: [],
              mcpReady: false,
              queue: [],
              accepted: [],
              ledgerSeen: []
            };
            chats.set(chat2.id, chat2);
            reservations.add(chat2.id);
            return { chat: chat2, created: true };
          });
          const { chat } = reservation;
          if (!reservation.created) return view(chat);
          try {
            await connect(chat, true);
            return await serialize(async () => {
              if (stopped) throw Error("Chat runtime stopped");
              await enqueue(chat, options.newId(), request.message, request.images);
              return view(chat);
            });
          } catch (cause) {
            await serialize(async () => {
              chats.delete(chat.id);
              live.get(chat.id)?.rpc.close();
              live.delete(chat.id);
              for (const item of chat.queue) void discard(item.images);
              await save();
            });
            throw cause;
          }
        })().finally(() => {
          reservations.delete(request.requestId);
          creating.delete(request.requestId);
        });
        creating.set(request.requestId, job);
        return job;
      }
      if (request.action === "models" || request.action === "setModel") {
        const chat = chats.get(request.id);
        if (!chat || reservations.has(chat.id))
          throw Error("This runtime does not own a ready chat with that ID");
        const kept = modelLists.get(chat.id);
        const wanted = request.action === "setModel" ? request.model ?? chat.model : void 0;
        let models;
        if (kept && (!wanted || kept.some((item) => item.id === wanted))) {
          models = kept;
          const running = live.get(chat.id);
          if (request.action === "models" && running && !connections.has(chat.id)) {
            const generation = modelListGeneration;
            void readOwnedChatModels(running.rpc).then(
              (fresh) => {
                if (generation === modelListGeneration && chats.has(chat.id))
                  modelLists.set(chat.id, fresh);
              },
              () => {
              }
            );
          }
        } else {
          const generation = modelListGeneration;
          const current = await connect(chat, false);
          try {
            models = await readOwnedChatModels(current.rpc);
          } finally {
            idle(chat, current);
          }
          if (generation === modelListGeneration) modelLists.set(chat.id, models);
        }
        if (request.action === "models") return { ...view(chat), availableModels: models };
        return serialize(async () => {
          if (stopped) throw Error("Chat runtime stopped");
          if (chat.status === "running" || chat.status === "approval" || pumping.has(chat.id) || chat.queue.length || connecting.has(chat.id))
            throw Error("Wait for the current response to finish before changing models.");
          const model = request.model ?? chat.model;
          const target = model ? models.find((item) => item.id === model) : models.find((item) => item.isDefault);
          if (model && !target)
            throw Error("That model is no longer available. Reopen the model menu.");
          if (request.effort && target && !target.efforts?.some((effort2) => effort2.id === request.effort))
            throw Error("That model does not offer this reasoning effort. Reopen the model menu.");
          const effort = request.effort ?? target?.defaultEffort;
          const previous = { model: chat.model, effort: chat.effort };
          chat.model = model;
          chat.effort = effort;
          if (!model) delete chat.model;
          if (!effort) delete chat.effort;
          const previousUpdatedAt = chat.updatedAt;
          chat.updatedAt = Math.max(Date.now(), previousUpdatedAt + 1);
          try {
            await save();
          } catch (cause) {
            chat.model = previous.model;
            chat.effort = previous.effort;
            if (!previous.model) delete chat.model;
            if (!previous.effort) delete chat.effort;
            chat.updatedAt = previousUpdatedAt;
            throw cause;
          }
          const current = live.get(chat.id);
          if (current) {
            clearTimeout(current.idleTimer);
            clearTimeout(current.titleTimer);
            current.rpc.close();
            live.delete(chat.id);
          }
          changed(chat);
          return { ...view(chat), availableModels: models };
        });
      }
      if (request.action === "retryDelivery" || request.action === "dismissDelivery") {
        const chat = chats.get(request.id) ?? (await options.external?.list())?.find((chat2) => chat2.id === request.id);
        if (!chat) throw Error("This runtime does not own that chat");
        if (request.action === "retryDelivery") {
          await Promise.all(
            commands.filter((command) => command.threadIds.includes(chat.threadId)).map((command) => deliverCommand(command))
          );
        } else {
          const command = commands.find(
            (command2) => command2.id === request.requestId && command2.threadIds.includes(chat.threadId)
          );
          if (!command) {
            if (!chats.has(chat.id) && options.external) return options.external.request(request);
            throw Error("Choose a pending decision for this chat");
          }
          if (delivering.has(command.id))
            throw Error("Wait for the current delivery attempt to finish");
          await serialize(async () => {
            const previous = commands;
            commands = commands.filter((item) => item !== command);
            try {
              await save();
            } catch (cause) {
              commands = previous;
              throw cause;
            }
            commandChanged(command);
          });
        }
        if (!chats.has(request.id) && options.external) {
          const remote = await options.external.request(
            request.action === "retryDelivery" ? request : { action: "get", id: request.id }
          );
          return { ...remote, ...pendingFor(remote) };
        }
      }
      if (request.action === "list") refreshExternalIndex();
      return serialize(async () => {
        await load();
        if (stopped) throw Error("Chat runtime stopped");
        if (request.action === "list")
          return [
            ...[...chats.values()].filter((chat2) => !reservations.has(chat2.id)).map(view),
            ...externalIndex.map(
              (chat2) => externalIndexError ? { ...chat2, status: "error", error: externalIndexError } : chat2
            )
          ].sort((a, b) => b.updatedAt - a.updatedAt).map((chat2) => ({
            ...chat2,
            messages: [],
            ...pendingFor(chat2)
          }));
        const chat = chats.get(request.id);
        if (!chat) throw Error("This runtime does not own that chat");
        if (reservations.has(chat.id)) throw Error("This chat is still starting");
        if (request.action === "dismissUncertain") {
          if (chat.status !== "error" || pumping.has(chat.id) || live.has(chat.id))
            throw Error("Wait for the agent to stop before dismissing this send");
          const pending = chat.queue.find(
            (item) => item.id === request.requestId && item.state === "sending"
          );
          if (!pending) throw Error("That send is no longer uncertain");
          retire(chat, [pending]);
          chat.accepted = [...chat.accepted, pending.id].slice(-2e3);
          chat.status = "idle";
          delete chat.error;
          chat.messages.push({
            id: options.newId(),
            role: "system",
            text: "Uncertain send dismissed. Blume will not send that message again."
          });
          trim(chat);
          changed(chat);
          await save();
          kick(chat);
        }
        if (request.action === "send") {
          await enqueue(chat, request.requestId, request.message, request.images);
        }
        if (request.action === "interrupt") {
          const current = live.get(chat.id);
          retire(
            chat,
            chat.queue.filter((item) => item.state === "queued")
          );
          if (current) {
            current.cancelRequested = true;
            try {
              await save();
            } finally {
              await interrupt(chat, current);
            }
          }
          if (!current?.turnId && !current?.starting && chat.status === "running") {
            chat.status = "idle";
            changed(chat);
          }
          await save();
        }
        if (request.action === "approval") {
          const current = live.get(chat.id);
          const rpcId = current?.requests.get(request.approvalId);
          if (!current || rpcId === void 0)
            throw Error("This permission request is no longer active");
          const approval = chat.approvals.find((item) => item.id === request.approvalId);
          current.rpc.reply(
            rpcId,
            approval?.method === "mcpServer/elicitation/request" ? {
              action: request.approved ? "accept" : "decline",
              content: request.approved ? {} : null,
              _meta: null
            } : { decision: request.approved ? "accept" : "decline" }
          );
          current.requests.delete(request.approvalId);
          chat.approvals = chat.approvals.filter((item) => item.id !== request.approvalId);
          chat.status = chat.approvals.length ? "approval" : "running";
          changed(chat);
        }
        return view(chat);
      });
    },
    async dispatch(operation, input, recipients, resolved) {
      await load();
      if (stopped) throw Error("Chat runtime stopped");
      if (resolved?.length === 0 && isReviewDecision(operation)) {
        if (!options.dispatch) throw Error("Direct review delivery is unavailable");
        return options.dispatch(
          validateOwnedDirectCommand({
            id: input.requestId,
            operation,
            input,
            threadIds: []
          })
        );
      }
      const resolvedExternal = resolved?.filter((chat) => !chats.has(chat.id));
      const external = resolvedExternal ?? (recipients?.every(isLocalRecipient) ? [] : await options.external?.list() ?? []);
      return serialize(async () => {
        await load();
        if (stopped) throw Error("Chat runtime stopped");
        const command = validateOwnedDirectCommand({
          id: input.requestId,
          operation,
          input,
          threadIds: [
            ...[...chats.values()].filter((chat) => !reservations.has(chat.id)),
            ...external
          ].map((chat) => chat.threadId).filter((id) => !recipients || recipients.includes(id))
        });
        if (!command.threadIds.length)
          throw new OwnedDirectRejected("No Blume-owned chat receives this decision");
        const prior = commands.find((item) => item.id === command.id) ?? commands.find((item) => {
          const { requestId: _old, ...oldInput } = item.input;
          const { requestId: _new, ...newInput } = input;
          return item.operation === operation && JSON.stringify(oldInput) === JSON.stringify(newInput);
        });
        if (prior?.id === command.id && JSON.stringify([prior.operation, prior.input]) !== JSON.stringify([operation, input]))
          throw Error("Delivery request ID was reused");
        if (!prior) {
          if (commands.length >= 50)
            throw Error("Too many pending review decisions. Retry the existing decisions first.");
          commands.push(command);
          commandChanged(command);
          await save();
        }
        return prior ?? command;
      }).then((command) => deliverCommand(command, resolvedExternal));
    },
    async resumePending() {
      const pending = await serialize(async () => {
        await load();
        for (const chat of chats.values())
          if (!reservations.has(chat.id) && chat.status === "idle") kick(chat);
        return [...commands];
      });
      await Promise.all(pending.map((command) => deliverCommand(command)));
    },
    /** Replace credentials only between turns, then rebuild disposable provider processes. */
    refreshConfiguration(update) {
      return serialize(async () => {
        await load();
        if (stopped) throw Error("Chat runtime stopped");
        if (connecting.size || pumping.size || [...chats.values()].some(
          (chat) => chat.status === "running" || chat.status === "approval"
        ))
          throw Error("Wait for cloud agents to finish before refreshing the Blume connection.");
        await update();
        modelLists.clear();
        modelListGeneration++;
        for (const current of live.values()) {
          clearTimeout(current.idleTimer);
          clearTimeout(current.titleTimer);
          current.rpc.close();
        }
        live.clear();
      });
    },
    async stop() {
      stopped = true;
      await options.external?.close();
      clearTimeout(saveTimer);
      saveTimer = void 0;
      for (const chat of chats.values()) {
        const current = live.get(chat.id);
        if (chat.status === "running" && (current?.cancelRequested || !current?.turnId && !current?.starting && chat.queue.some((item) => item.state === "queued")))
          chat.status = "idle";
      }
      for (const current of live.values()) {
        clearTimeout(current.idleTimer);
        clearTimeout(current.titleTimer);
        current.rpc.close();
      }
      live.clear();
      await mutation;
      await Promise.allSettled([...jobs, ...creating.values()]);
      if (loaded) {
        await loaded;
        await save();
      }
    }
  };
}
const sameRepository = (a, b) => (a.repository ?? "").toLowerCase() === (b.repository ?? "").toLowerCase();
function linkedMerges(d) {
  return (d.github?.prs ?? []).filter((pr) => pr.state === "merged" && Boolean(pr.mergeCommitSha));
}
function mergedCurrentPullRequests(d) {
  const heads = [d.revision, ...d.committedAs ?? []].filter(Boolean);
  const revision = d.revisions?.at(-1);
  const listed = new Set(revision && heads.includes(revision.commit) ? revision.pullRequests.map((pr) => pr.url.toLowerCase()) : []);
  return linkedMerges(d).filter((pr) => heads.includes(pr.headSha) || heads.includes(pr.mergeCommitSha) || listed.has(pr.url.toLowerCase()));
}
function terminalMerge(pr, linked, seen = /* @__PURE__ */ new Set()) {
  const defaultBranch = pr.defaultBranch;
  if (defaultBranch && pr.baseBranch === defaultBranch) return pr;
  const parent = linked.find((other) => other !== pr && !seen.has(other) && sameRepository(other, pr) && other.headBranch === pr.baseBranch && Boolean(other.headRepository) && other.headRepository.toLowerCase() === pr.repository.toLowerCase());
  if (!parent) return defaultBranch ? void 0 : pr;
  if (parent.state !== "merged" || !parent.mergeCommitSha) return void 0;
  if (pr.mergedAt !== void 0 && parent.mergedAt !== void 0 && pr.mergedAt > parent.mergedAt) return void 0;
  return terminalMerge(parent, linked, /* @__PURE__ */ new Set([...seen, pr]));
}
function shippedCode(d) {
  const linked = d.github?.prs ?? [];
  const current = mergedCurrentPullRequests(d);
  const terminals = current.flatMap((pr) => {
    const terminal = terminalMerge(pr, linked);
    return terminal && terminal !== pr ? [terminal] : [];
  });
  const pullRequests = [.../* @__PURE__ */ new Set([...current, ...terminals])];
  const reached = pullRequests.filter((pr) => terminalMerge(pr, linked) === pr);
  const elsewhere = pullRequests.filter((pr) => !terminalMerge(pr, linked) && !reached.some((other) => sameRepository(other, pr)));
  return {
    pullRequests,
    newest: newestMerges([...reached, ...elsewhere]),
    agentShas: new Set([d.revision, ...d.committedAs ?? [], ...pullRequests.map((pr) => pr.mergeCommitSha)].filter(Boolean))
  };
}
function newestMerges(merges) {
  const byRepository = /* @__PURE__ */ new Map();
  for (const pr of merges) {
    const repository = (pr.repository ?? "").toLowerCase();
    byRepository.set(repository, [...byRepository.get(repository) ?? [], pr]);
  }
  return [...byRepository.values()].flatMap((prs) => {
    if (prs.some((pr) => pr.mergedAt === void 0)) return prs;
    const last = Math.max(...prs.map((pr) => pr.mergedAt));
    return prs.filter((pr) => pr.mergedAt === last);
  });
}
const GITHUB_SYNC_BYTES = 48 * 1024;
const GITHUB_LIMITS = {
  prs: 5,
  checkItems: 25,
  runs: 6,
  jobs: 40,
  /** A pull request's ready, draft, close and reopen events kept, newest. */
  events: 20
};
const NAME = /^[A-Za-z0-9_.-]{1,100}$/;
const repoOf = (owner, repo) => {
  repo = repo.replace(/\.git$/i, "");
  return NAME.test(owner) && NAME.test(repo) && repo !== "." && repo !== ".." ? { owner, repo } : void 0;
};
function githubRepoFromProject(project) {
  if (!project) return void 0;
  const value = project.trim();
  const scp = /^git@github\.com:([^/]+)\/([^/]+?)\/?$/i.exec(value);
  if (scp) return repoOf(scp[1], scp[2]);
  const bare = /^(?:(?:https?|ssh|git):\/\/(?:[^@/]+@)?)?(?:www\.)?github\.com[:/]([^/]+)\/([^/?#]+?)\/?(?:[?#].*)?$/i.exec(
    value
  );
  return bare ? repoOf(bare[1], bare[2]) : void 0;
}
function githubPullFromUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return void 0;
  }
  if (parsed.protocol !== "https:" || !/^(www\.)?github\.com$/i.test(parsed.hostname))
    return void 0;
  const match = /^\/([^/]+)\/([^/]+)\/pull\/(\d{1,9})(?:\/.*)?$/.exec(parsed.pathname);
  const repo = match && repoOf(match[1], match[2]);
  if (!repo) return void 0;
  const number = Number(match[3]);
  return {
    ...repo,
    number,
    url: `https://github.com/${repo.owner}/${repo.repo}/pull/${number}`
  };
}
const sameRepo = (a, b) => Boolean(
  a && b && a.owner.toLowerCase() === b.owner.toLowerCase() && a.repo.toLowerCase() === b.repo.toLowerCase()
);
function revisionMatches(revision, sha) {
  if (!revision || !sha || !/^[0-9a-f]{7,40}$/i.test(revision)) return false;
  return sha.toLowerCase().startsWith(revision.toLowerCase());
}
function runMatchesDelivery(delivery, prs, headSha) {
  const code = typeof delivery === "object" ? delivery : { revision: delivery ?? "" };
  const sha = headSha.toLowerCase();
  if (revisionMatches(code.revision, sha)) return true;
  if (prs.some((pr) => pr.state === "merged" && pr.mergeCommitSha?.toLowerCase() === sha && revisionMatches(code.revision, pr.headSha))) return true;
  const whole = prs.filter((pr) => "baseBranch" in pr && "headBranch" in pr && "repository" in pr);
  if (!whole.length) return false;
  return shippedCode({ ...code, github: { prs: whole, syncedAt: 0 } }).pullRequests.some((pr) => pr.mergeCommitSha?.toLowerCase() === sha);
}
const time = (value) => {
  const ms = typeof value === "string" ? Date.parse(value) : NaN;
  return Number.isFinite(ms) ? ms : void 0;
};
const text = (value, max = 160) => typeof value === "string" ? value.slice(0, max) : "";
const duration = (start, end) => {
  const a = time(start);
  const b = time(end);
  return a !== void 0 && b !== void 0 && b >= a ? b - a : void 0;
};
const nonnegative = (value) => Number.isSafeInteger(value) && value >= 0 ? value : void 0;
const githubUrl = (value) => typeof value === "string" && /^https:\/\/github\.com\//.test(value) && value.length <= 500 ? value : void 0;
const githubLogin = (value) => typeof value === "string" && /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})(?:\[bot\])?$/.test(value) ? value : void 0;
function checkRunState(status, conclusion) {
  if (status !== "completed") return status === "in_progress" ? "running" : "queued";
  switch (conclusion) {
    case "success":
      return "passed";
    case "cancelled":
      return "cancelled";
    case "skipped":
      return "skipped";
    case "neutral":
    case "stale":
      return "neutral";
    default:
      return "failed";
  }
}
function commitStatusState(state) {
  return state === "success" ? "passed" : state === "pending" ? "queued" : "failed";
}
const ORDER = {
  failed: 0,
  cancelled: 1,
  running: 2,
  queued: 3,
  passed: 4,
  neutral: 5,
  skipped: 6
};
function checkIdentity(run, workflows) {
  const actionsRun = Number(/\/actions\/runs\/(\d+)\//.exec(String(run.html_url ?? ""))?.[1]);
  const workflow = workflows.get(actionsRun) ?? (Number.isSafeInteger(actionsRun) ? "actions" : `app:${run.app?.id ?? ""}`);
  return { workflow, key: `${workflow}
${text(run.name) || "Unnamed check"}` };
}
function mapChecks(checkRuns, combinedStatus, workflows = /* @__PURE__ */ new Map()) {
  const items = [];
  const newest = /* @__PURE__ */ new Map();
  const started = (run) => time(run.started_at) ?? Infinity;
  const later = (a, b) => {
    const [ai, bi] = [Number(a.id), Number(b.id)];
    return Number.isFinite(ai) && Number.isFinite(bi) ? ai > bi : started(a) > started(b);
  };
  for (const run of Array.isArray(checkRuns?.check_runs) ? checkRuns.check_runs : []) {
    const { workflow, key } = checkIdentity(run, workflows);
    const kept = newest.get(key)?.run;
    if (!kept || later(run, kept)) newest.set(key, { run, workflow });
  }
  for (const { run, workflow } of newest.values()) {
    const durationMs = duration(run.started_at, run.completed_at);
    items.push({
      name: text(run.name) || "Unnamed check",
      state: checkRunState(run.status, run.conclusion),
      ...githubUrl(run.html_url) ? { url: githubUrl(run.html_url) } : {},
      ...durationMs === void 0 ? {} : { durationMs },
      ...time(run.completed_at) ? { completedAt: time(run.completed_at) } : {},
      workflow: workflow.slice(0, 300)
    });
  }
  for (const status of Array.isArray(combinedStatus?.statuses) ? combinedStatus.statuses : []) {
    const name = text(status.context) || "Commit status";
    if (items.some((item) => item.name === name)) continue;
    items.push({
      name,
      state: commitStatusState(status.state),
      ...githubUrl(status.target_url) ? { url: githubUrl(status.target_url) } : {}
    });
  }
  const count2 = (states) => items.filter((item) => states.includes(item.state)).length;
  return {
    passed: count2(["passed"]),
    failed: count2(["failed", "cancelled"]),
    pending: count2(["queued", "running"]),
    skipped: count2(["skipped", "neutral"]),
    items: items.map((item, index) => ({ item, index })).sort((a, b) => ORDER[a.item.state] - ORDER[b.item.state] || a.index - b.index).slice(0, GITHUB_LIMITS.checkItems).map(({ item }) => item)
  };
}
function reviewDecision(reviews, pull) {
  const latest = /* @__PURE__ */ new Map();
  for (const review of Array.isArray(reviews) ? reviews : []) {
    const who = review?.user?.login;
    if (typeof who !== "string") continue;
    if (review.state === "APPROVED" || review.state === "CHANGES_REQUESTED") latest.set(who, review.state);
    else if (review.state === "DISMISSED") latest.delete(who);
  }
  const states = [...latest.values()];
  if (states.includes("CHANGES_REQUESTED")) return "changes_requested";
  if (states.includes("APPROVED")) return "approved";
  if (pull.requested_reviewers?.length || pull.requested_teams?.length) return "review_required";
  return "none";
}
const TRUSTED_REVIEWERS = /* @__PURE__ */ new Set(["OWNER", "MEMBER", "COLLABORATOR"]);
function approvedAtHead(reviews, pull) {
  const head = String(pull?.head?.sha ?? "").toLowerCase();
  const author = pull?.user?.login;
  const latest = /* @__PURE__ */ new Map();
  for (const review of Array.isArray(reviews) ? reviews : []) {
    const who = review?.user?.login;
    if (typeof who !== "string") continue;
    if (review.state === "APPROVED" || review.state === "CHANGES_REQUESTED") latest.set(who, review);
    else if (review.state === "DISMISSED") latest.delete(who);
  }
  return [...latest.values()].some((review) => review.state === "APPROVED" && review.user?.type === "User" && review.user.login !== author && TRUSTED_REVIEWERS.has(String(review.author_association ?? "")) && String(review.commit_id ?? "").toLowerCase() === head && head.length === 40);
}
function pullState(pull) {
  if (pull.merged || pull.merged_at) return "merged";
  if (pull.state === "closed") return "closed";
  return pull.draft ? "draft" : "open";
}
function mapRun(run) {
  return {
    id: Number(run.id),
    name: text(run.name) || text(run.path).split("/").pop() || "Workflow",
    url: githubUrl(run.html_url) ?? "",
    headSha: text(run.head_sha, 40).toLowerCase(),
    event: text(run.event, 40) || "unknown",
    attempt: Number.isSafeInteger(run.run_attempt) ? run.run_attempt : 1,
    status: run.status === "completed" ? "completed" : run.status === "in_progress" ? "running" : "queued",
    ...typeof run.conclusion === "string" ? { conclusion: text(run.conclusion, 40) } : {},
    createdAt: time(run.created_at) ?? 0,
    ...run.status === "completed" && time(run.updated_at) ? { completedAt: time(run.updated_at) } : {},
    ...nonnegative(run.run_number) === void 0 ? {} : { number: run.run_number },
    ...typeof run.path === "string" ? { path: run.path.slice(0, 300) } : {}
  };
}
function latestRuns(payload) {
  const runs = (Array.isArray(payload?.workflow_runs) ? payload.workflow_runs : []).map(mapRun).filter((run) => run.url && /^[0-9a-f]{40}$/.test(run.headSha)).sort((a, b) => b.createdAt - a.createdAt);
  const seen = /* @__PURE__ */ new Set();
  return runs.filter((run) => {
    const key = `${run.headSha}:${run.path ?? run.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
const PULL_EVENTS = {
  ready_for_review: "ready",
  convert_to_draft: "draft",
  closed: "closed",
  reopened: "reopened"
};
function pullEvents(events, pull) {
  const merged = time(pull.merged_at);
  return (Array.isArray(events) ? events : []).flatMap((event) => {
    const kind = PULL_EVENTS[String(event?.event ?? "")];
    const at2 = time(event?.created_at);
    if (!kind || !at2) return [];
    if (kind === "closed" && merged && Math.abs(at2 - merged) <= 6e4) return [];
    return [{ kind, at: at2 }];
  }).sort((a, b) => a.at - b.at).slice(-20);
}
function openedAsDraft(first, pull) {
  return first ? first === "ready_for_review" : Boolean(pull.draft);
}
function mapPullRequest(input) {
  const { pull, repo } = input;
  const decision = reviewDecision(input.reviews, pull);
  const truncated = input.reviewsTruncated === true;
  const state = pullState(pull);
  const number = Number(pull.number);
  const merge2 = text(pull.merge_commit_sha, 40).toLowerCase();
  const events = input.events ? pullEvents(input.events, pull) : void 0;
  const opened = time(pull.created_at);
  return {
    url: `https://github.com/${repo.owner}/${repo.repo}/pull/${number}`,
    repository: `${repo.owner}/${repo.repo}`,
    number,
    title: text(pull.title) || `#${number}`,
    ...githubLogin(pull.user?.login) ? { author: githubLogin(pull.user?.login) } : {},
    state,
    headBranch: text(pull.head?.ref, 200),
    ...text(pull.head?.repo?.full_name, 200) ? { headRepository: text(pull.head?.repo?.full_name, 200) } : {},
    headSha: text(pull.head?.sha, 40).toLowerCase(),
    baseBranch: text(pull.base?.ref, 200),
    ...text(pull.base?.repo?.default_branch, 200) ? { defaultBranch: text(pull.base?.repo?.default_branch, 200) } : {},
    ...state === "merged" && /^[0-9a-f]{40}$/.test(merge2) ? { mergeCommitSha: merge2 } : {},
    ...state === "merged" && time(pull.merged_at) ? { mergedAt: time(pull.merged_at) } : {},
    ...opened ? { openedAt: opened } : {},
    ...events && openedAsDraft(
      input.firstMove ?? input.events.find((event) => event?.event === "ready_for_review" || event?.event === "convert_to_draft")?.event,
      pull
    ) ? { openedAsDraft: true } : {},
    // Read is kept even when empty: it says the moves were read, so they are not read again.
    ...events ? { events } : {},
    ...nonnegative(pull.additions) === void 0 ? {} : { additions: pull.additions },
    ...nonnegative(pull.deletions) === void 0 ? {} : { deletions: pull.deletions },
    ...nonnegative(pull.changed_files) === void 0 ? {} : { changedFiles: pull.changed_files },
    mergeable: typeof pull.mergeable === "boolean" ? pull.mergeable : null,
    ...typeof pull.mergeable_state === "string" ? { mergeState: text(pull.mergeable_state, 40) } : {},
    reviewDecision: truncated && decision === "approved" ? reviewDecision([], pull) : decision,
    ...!truncated && approvedAtHead(input.reviews, pull) ? { approvedAtHead: true } : {},
    ...truncated ? { reviewsTruncated: true } : {},
    checks: mapChecks(
      input.checkRuns,
      input.status,
      // A workflow run's id names its workflow; one workflow's runs (a re-run, a newer trigger)
      // share it. Without its path, a run's own name is the best it has.
      input.workflows ?? new Map((input.runs ?? []).map((run) => [run.id, run.path ?? run.name]))
    ),
    runs: (input.runs ?? []).slice(0, GITHUB_LIMITS.runs).map(({ path: _path, ...run }) => run),
    updatedAt: time(pull.updated_at) ?? 0
  };
}
function jobState(status, conclusion) {
  if (status !== "completed") return status === "in_progress" ? "running" : "queued";
  if (conclusion === "success") return "passed";
  if (conclusion === "cancelled") return "cancelled";
  if (conclusion === "skipped" || conclusion === "neutral") return "skipped";
  return "failed";
}
function workflowJobKey(apiName, jobs) {
  let best;
  for (const [key, job] of jobs) {
    const display = job.name ?? key;
    const prefix = display.includes("${{") ? display.slice(0, display.indexOf("${{")).trim() : display;
    const exact = apiName === display || apiName === key;
    const derived = apiName.startsWith(`${display} (`) || apiName.startsWith(`${display} / `) || prefix.length >= 3 && prefix !== display && apiName.startsWith(prefix);
    const length = exact ? Number.MAX_SAFE_INTEGER : derived ? prefix.length : -1;
    if (length >= 0 && (!best || length > best.length)) best = { key, length };
  }
  return best?.key;
}
function pipelineJobs(payload, workflow) {
  const raw = (Array.isArray(payload?.jobs) ? payload.jobs : []).slice(0, GITHUB_LIMITS.jobs);
  const keys = raw.map((job) => workflow ? workflowJobKey(text(job.name, 300), workflow) : void 0);
  const counts = /* @__PURE__ */ new Map();
  for (const key of keys) if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  const ids = raw.map(
    (job, index) => keys[index] && counts.get(keys[index]) === 1 ? keys[index] : `${keys[index] ?? "job"}:${job.id}`
  );
  const needsResolved = Boolean(workflow) && raw.length > 0 && keys.every(Boolean);
  const jobs = raw.map((job, index) => {
    const durationMs = duration(job.started_at, job.completed_at);
    const startedAt = time(job.started_at);
    const environment = keys[index] ? workflow?.get(keys[index])?.environment : void 0;
    const needs = needsResolved ? workflow.get(keys[index]).needs.flatMap((need) => ids.filter((_, i) => keys[i] === need)) : void 0;
    return {
      id: ids[index],
      name: text(job.name) || ids[index],
      state: jobState(job.status, job.conclusion),
      ...needs?.length ? { needs } : {},
      ...githubUrl(job.html_url) ? { url: githubUrl(job.html_url) } : {},
      ...durationMs === void 0 ? {} : { durationMs },
      ...startedAt === void 0 ? {} : { startedAt },
      ...environment ? { environment } : {}
    };
  });
  return { jobs, needsResolved };
}
const DEPLOY = /deploy|release|publish|ship|production|\bcd\b/i;
function selectDeploymentRun(delivery, prs, runs) {
  const matching = runs.filter((run) => runMatchesDelivery(delivery, prs, run.headSha));
  const newest = (items) => items.slice().sort((a, b) => b.createdAt - a.createdAt)[0];
  const reportedId = /\/actions\/runs\/(\d+)/.exec(delivery.reported?.url ?? "")?.[1];
  const byId = matching.find((run) => String(run.id) === reportedId);
  if (byId) return byId;
  const byName = matching.filter((run) => run.name === delivery.reported?.name);
  if (byName.length) return newest(byName);
  const deploy = matching.filter((run) => DEPLOY.test(run.name) || DEPLOY.test(run.path ?? ""));
  if (deploy.length) {
    const merged = new Set(prs.map((pr) => pr.mergeCommitSha).filter(Boolean));
    return newest(deploy.filter((run) => merged.has(run.headSha))) ?? newest(deploy);
  }
  return matching.length === 1 ? matching[0] : void 0;
}
function deliveryGitHubRepos(delivery) {
  return [delivery.project, ...delivery.repositories ?? []].flatMap((repository) => githubRepoFromProject(repository) ?? []);
}
const DEPLOYMENT_DESCRIPTION = 300;
const DEPLOYMENT_VERSION = 120;
function deploymentVersion(ref, pr) {
  if (typeof ref !== "string" || !ref || ref.length > DEPLOYMENT_VERSION || /[\s\x00-\x1f\x7f]/.test(ref)) return void 0;
  const tag = ref.startsWith("refs/tags/") ? ref.slice("refs/tags/".length) : ref;
  if (!tag || tag.startsWith("refs/") || /^[0-9a-f]{7,40}$/i.test(tag) || tag === pr.headBranch || tag === pr.baseBranch) return void 0;
  return /^v?\d|\d+\.\d+/i.test(tag) ? tag : void 0;
}
function runWorkflows(...payloads) {
  const workflows = /* @__PURE__ */ new Map();
  for (const payload of payloads)
    for (const run of Array.isArray(payload?.workflow_runs) ? payload.workflow_runs : [])
      if (Number.isSafeInteger(run?.id)) workflows.set(run.id, text(run.path, 300) || text(run.name) || "workflow");
  return workflows;
}
var dist = {};
var composer = {};
var directives = {};
var identity = {};
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity) return identity;
  hasRequiredIdentity = 1;
  const ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
  const DOC = /* @__PURE__ */ Symbol.for("yaml.document");
  const MAP = /* @__PURE__ */ Symbol.for("yaml.map");
  const PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
  const SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
  const SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
  const NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
  const isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
  const isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
  const isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
  const isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
  const isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
  const isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
  function isCollection(node) {
    if (node && typeof node === "object")
      switch (node[NODE_TYPE]) {
        case MAP:
        case SEQ:
          return true;
      }
    return false;
  }
  function isNode(node) {
    if (node && typeof node === "object")
      switch (node[NODE_TYPE]) {
        case ALIAS:
        case MAP:
        case SCALAR:
        case SEQ:
          return true;
      }
    return false;
  }
  const hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
  identity.ALIAS = ALIAS;
  identity.DOC = DOC;
  identity.MAP = MAP;
  identity.NODE_TYPE = NODE_TYPE;
  identity.PAIR = PAIR;
  identity.SCALAR = SCALAR;
  identity.SEQ = SEQ;
  identity.hasAnchor = hasAnchor;
  identity.isAlias = isAlias;
  identity.isCollection = isCollection;
  identity.isDocument = isDocument;
  identity.isMap = isMap;
  identity.isNode = isNode;
  identity.isPair = isPair;
  identity.isScalar = isScalar;
  identity.isSeq = isSeq;
  return identity;
}
var visit = {};
var hasRequiredVisit;
function requireVisit() {
  if (hasRequiredVisit) return visit;
  hasRequiredVisit = 1;
  var identity2 = requireIdentity();
  const BREAK = /* @__PURE__ */ Symbol("break visit");
  const SKIP = /* @__PURE__ */ Symbol("skip children");
  const REMOVE = /* @__PURE__ */ Symbol("remove node");
  function visit$1(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (identity2.isDocument(node)) {
      const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
      if (cd === REMOVE)
        node.contents = null;
    } else
      visit_(null, node, visitor_, Object.freeze([]));
  }
  visit$1.BREAK = BREAK;
  visit$1.SKIP = SKIP;
  visit$1.REMOVE = REMOVE;
  function visit_(key, node, visitor, path2) {
    const ctrl = callVisitor(key, node, visitor, path2);
    if (identity2.isNode(ctrl) || identity2.isPair(ctrl)) {
      replaceNode(key, path2, ctrl);
      return visit_(key, ctrl, visitor, path2);
    }
    if (typeof ctrl !== "symbol") {
      if (identity2.isCollection(node)) {
        path2 = Object.freeze(path2.concat(node));
        for (let i = 0; i < node.items.length; ++i) {
          const ci = visit_(i, node.items[i], visitor, path2);
          if (typeof ci === "number")
            i = ci - 1;
          else if (ci === BREAK)
            return BREAK;
          else if (ci === REMOVE) {
            node.items.splice(i, 1);
            i -= 1;
          }
        }
      } else if (identity2.isPair(node)) {
        path2 = Object.freeze(path2.concat(node));
        const ck = visit_("key", node.key, visitor, path2);
        if (ck === BREAK)
          return BREAK;
        else if (ck === REMOVE)
          node.key = null;
        const cv = visit_("value", node.value, visitor, path2);
        if (cv === BREAK)
          return BREAK;
        else if (cv === REMOVE)
          node.value = null;
      }
    }
    return ctrl;
  }
  async function visitAsync(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (identity2.isDocument(node)) {
      const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
      if (cd === REMOVE)
        node.contents = null;
    } else
      await visitAsync_(null, node, visitor_, Object.freeze([]));
  }
  visitAsync.BREAK = BREAK;
  visitAsync.SKIP = SKIP;
  visitAsync.REMOVE = REMOVE;
  async function visitAsync_(key, node, visitor, path2) {
    const ctrl = await callVisitor(key, node, visitor, path2);
    if (identity2.isNode(ctrl) || identity2.isPair(ctrl)) {
      replaceNode(key, path2, ctrl);
      return visitAsync_(key, ctrl, visitor, path2);
    }
    if (typeof ctrl !== "symbol") {
      if (identity2.isCollection(node)) {
        path2 = Object.freeze(path2.concat(node));
        for (let i = 0; i < node.items.length; ++i) {
          const ci = await visitAsync_(i, node.items[i], visitor, path2);
          if (typeof ci === "number")
            i = ci - 1;
          else if (ci === BREAK)
            return BREAK;
          else if (ci === REMOVE) {
            node.items.splice(i, 1);
            i -= 1;
          }
        }
      } else if (identity2.isPair(node)) {
        path2 = Object.freeze(path2.concat(node));
        const ck = await visitAsync_("key", node.key, visitor, path2);
        if (ck === BREAK)
          return BREAK;
        else if (ck === REMOVE)
          node.key = null;
        const cv = await visitAsync_("value", node.value, visitor, path2);
        if (cv === BREAK)
          return BREAK;
        else if (cv === REMOVE)
          node.value = null;
      }
    }
    return ctrl;
  }
  function initVisitor(visitor) {
    if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
      return Object.assign({
        Alias: visitor.Node,
        Map: visitor.Node,
        Scalar: visitor.Node,
        Seq: visitor.Node
      }, visitor.Value && {
        Map: visitor.Value,
        Scalar: visitor.Value,
        Seq: visitor.Value
      }, visitor.Collection && {
        Map: visitor.Collection,
        Seq: visitor.Collection
      }, visitor);
    }
    return visitor;
  }
  function callVisitor(key, node, visitor, path2) {
    if (typeof visitor === "function")
      return visitor(key, node, path2);
    if (identity2.isMap(node))
      return visitor.Map?.(key, node, path2);
    if (identity2.isSeq(node))
      return visitor.Seq?.(key, node, path2);
    if (identity2.isPair(node))
      return visitor.Pair?.(key, node, path2);
    if (identity2.isScalar(node))
      return visitor.Scalar?.(key, node, path2);
    if (identity2.isAlias(node))
      return visitor.Alias?.(key, node, path2);
    return void 0;
  }
  function replaceNode(key, path2, node) {
    const parent = path2[path2.length - 1];
    if (identity2.isCollection(parent)) {
      parent.items[key] = node;
    } else if (identity2.isPair(parent)) {
      if (key === "key")
        parent.key = node;
      else
        parent.value = node;
    } else if (identity2.isDocument(parent)) {
      parent.contents = node;
    } else {
      const pt = identity2.isAlias(parent) ? "alias" : "scalar";
      throw new Error(`Cannot replace node with ${pt} parent`);
    }
  }
  visit.visit = visit$1;
  visit.visitAsync = visitAsync;
  return visit;
}
var hasRequiredDirectives;
function requireDirectives() {
  if (hasRequiredDirectives) return directives;
  hasRequiredDirectives = 1;
  var identity2 = requireIdentity();
  var visit2 = requireVisit();
  const escapeChars = {
    "!": "%21",
    ",": "%2C",
    "[": "%5B",
    "]": "%5D",
    "{": "%7B",
    "}": "%7D"
  };
  const escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
  class Directives {
    constructor(yaml, tags2) {
      this.docStart = null;
      this.docEnd = false;
      this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
      this.tags = Object.assign({}, Directives.defaultTags, tags2);
    }
    clone() {
      const copy = new Directives(this.yaml, this.tags);
      copy.docStart = this.docStart;
      return copy;
    }
    /**
     * During parsing, get a Directives instance for the current document and
     * update the stream state according to the current version's spec.
     */
    atDocument() {
      const res = new Directives(this.yaml, this.tags);
      switch (this.yaml.version) {
        case "1.1":
          this.atNextDocument = true;
          break;
        case "1.2":
          this.atNextDocument = false;
          this.yaml = {
            explicit: Directives.defaultYaml.explicit,
            version: "1.2"
          };
          this.tags = Object.assign({}, Directives.defaultTags);
          break;
      }
      return res;
    }
    /**
     * @param onError - May be called even if the action was successful
     * @returns `true` on success
     */
    add(line2, onError) {
      if (this.atNextDocument) {
        this.yaml = { explicit: Directives.defaultYaml.explicit, version: "1.1" };
        this.tags = Object.assign({}, Directives.defaultTags);
        this.atNextDocument = false;
      }
      const parts = line2.trim().split(/[ \t]+/);
      const name = parts.shift();
      switch (name) {
        case "%TAG": {
          if (parts.length !== 2) {
            onError(0, "%TAG directive should contain exactly two parts");
            if (parts.length < 2)
              return false;
          }
          const [handle, prefix] = parts;
          this.tags[handle] = prefix;
          return true;
        }
        case "%YAML": {
          this.yaml.explicit = true;
          if (parts.length !== 1) {
            onError(0, "%YAML directive should contain exactly one part");
            return false;
          }
          const [version] = parts;
          if (version === "1.1" || version === "1.2") {
            this.yaml.version = version;
            return true;
          } else {
            const isValid = /^\d+\.\d+$/.test(version);
            onError(6, `Unsupported YAML version ${version}`, isValid);
            return false;
          }
        }
        default:
          onError(0, `Unknown directive ${name}`, true);
          return false;
      }
    }
    /**
     * Resolves a tag, matching handles to those defined in %TAG directives.
     *
     * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
     *   `'!local'` tag, or `null` if unresolvable.
     */
    tagName(source, onError) {
      if (source === "!")
        return "!";
      if (source[0] !== "!") {
        onError(`Not a valid tag: ${source}`);
        return null;
      }
      if (source[1] === "<") {
        const verbatim = source.slice(2, -1);
        if (verbatim === "!" || verbatim === "!!") {
          onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
          return null;
        }
        if (source[source.length - 1] !== ">")
          onError("Verbatim tags must end with a >");
        return verbatim;
      }
      const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
      if (!suffix)
        onError(`The ${source} tag has no suffix`);
      const prefix = this.tags[handle];
      if (prefix) {
        try {
          return prefix + decodeURIComponent(suffix);
        } catch (error) {
          onError(String(error));
          return null;
        }
      }
      if (handle === "!")
        return source;
      onError(`Could not resolve tag: ${source}`);
      return null;
    }
    /**
     * Given a fully resolved tag, returns its printable string form,
     * taking into account current tag prefixes and defaults.
     */
    tagString(tag) {
      for (const [handle, prefix] of Object.entries(this.tags)) {
        if (tag.startsWith(prefix))
          return handle + escapeTagName(tag.substring(prefix.length));
      }
      return tag[0] === "!" ? tag : `!<${tag}>`;
    }
    toString(doc) {
      const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
      const tagEntries = Object.entries(this.tags);
      let tagNames;
      if (doc && tagEntries.length > 0 && identity2.isNode(doc.contents)) {
        const tags2 = {};
        visit2.visit(doc.contents, (_key, node) => {
          if (identity2.isNode(node) && node.tag)
            tags2[node.tag] = true;
        });
        tagNames = Object.keys(tags2);
      } else
        tagNames = [];
      for (const [handle, prefix] of tagEntries) {
        if (handle === "!!" && prefix === "tag:yaml.org,2002:")
          continue;
        if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
          lines.push(`%TAG ${handle} ${prefix}`);
      }
      return lines.join("\n");
    }
  }
  Directives.defaultYaml = { explicit: false, version: "1.2" };
  Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
  directives.Directives = Directives;
  return directives;
}
var Document = {};
var Alias = {};
var anchors = {};
var hasRequiredAnchors;
function requireAnchors() {
  if (hasRequiredAnchors) return anchors;
  hasRequiredAnchors = 1;
  var identity2 = requireIdentity();
  var visit2 = requireVisit();
  function anchorIsValid(anchor) {
    if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
      const sa = JSON.stringify(anchor);
      const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
      throw new Error(msg);
    }
    return true;
  }
  function anchorNames(root) {
    const anchors2 = /* @__PURE__ */ new Set();
    visit2.visit(root, {
      Value(_key, node) {
        if (node.anchor)
          anchors2.add(node.anchor);
      }
    });
    return anchors2;
  }
  function findNewAnchor(prefix, exclude) {
    for (let i = 1; true; ++i) {
      const name = `${prefix}${i}`;
      if (!exclude.has(name))
        return name;
    }
  }
  function createNodeAnchors(doc, prefix) {
    const aliasObjects = [];
    const sourceObjects = /* @__PURE__ */ new Map();
    let prevAnchors = null;
    return {
      onAnchor: (source) => {
        aliasObjects.push(source);
        prevAnchors ?? (prevAnchors = anchorNames(doc));
        const anchor = findNewAnchor(prefix, prevAnchors);
        prevAnchors.add(anchor);
        return anchor;
      },
      /**
       * With circular references, the source node is only resolved after all
       * of its child nodes are. This is why anchors are set only after all of
       * the nodes have been created.
       */
      setAnchors: () => {
        for (const source of aliasObjects) {
          const ref = sourceObjects.get(source);
          if (typeof ref === "object" && ref.anchor && (identity2.isScalar(ref.node) || identity2.isCollection(ref.node))) {
            ref.node.anchor = ref.anchor;
          } else {
            const error = new Error("Failed to resolve repeated object (this should not happen)");
            error.source = source;
            throw error;
          }
        }
      },
      sourceObjects
    };
  }
  anchors.anchorIsValid = anchorIsValid;
  anchors.anchorNames = anchorNames;
  anchors.createNodeAnchors = createNodeAnchors;
  anchors.findNewAnchor = findNewAnchor;
  return anchors;
}
var Node = {};
var applyReviver = {};
var hasRequiredApplyReviver;
function requireApplyReviver() {
  if (hasRequiredApplyReviver) return applyReviver;
  hasRequiredApplyReviver = 1;
  function applyReviver$1(reviver, obj, key, val) {
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        for (let i = 0, len = val.length; i < len; ++i) {
          const v0 = val[i];
          const v1 = applyReviver$1(reviver, val, String(i), v0);
          if (v1 === void 0)
            delete val[i];
          else if (v1 !== v0)
            val[i] = v1;
        }
      } else if (val instanceof Map) {
        for (const k of Array.from(val.keys())) {
          const v0 = val.get(k);
          const v1 = applyReviver$1(reviver, val, k, v0);
          if (v1 === void 0)
            val.delete(k);
          else if (v1 !== v0)
            val.set(k, v1);
        }
      } else if (val instanceof Set) {
        for (const v0 of Array.from(val)) {
          const v1 = applyReviver$1(reviver, val, v0, v0);
          if (v1 === void 0)
            val.delete(v0);
          else if (v1 !== v0) {
            val.delete(v0);
            val.add(v1);
          }
        }
      } else {
        for (const [k, v0] of Object.entries(val)) {
          const v1 = applyReviver$1(reviver, val, k, v0);
          if (v1 === void 0)
            delete val[k];
          else if (v1 !== v0)
            val[k] = v1;
        }
      }
    }
    return reviver.call(obj, key, val);
  }
  applyReviver.applyReviver = applyReviver$1;
  return applyReviver;
}
var toJS = {};
var hasRequiredToJS;
function requireToJS() {
  if (hasRequiredToJS) return toJS;
  hasRequiredToJS = 1;
  var identity2 = requireIdentity();
  function toJS$1(value, arg, ctx) {
    if (Array.isArray(value))
      return value.map((v, i) => toJS$1(v, String(i), ctx));
    if (value && typeof value.toJSON === "function") {
      if (!ctx || !identity2.hasAnchor(value))
        return value.toJSON(arg, ctx);
      const data = { aliasCount: 0, count: 1, res: void 0 };
      ctx.anchors.set(value, data);
      ctx.onCreate = (res2) => {
        data.res = res2;
        delete ctx.onCreate;
      };
      const res = value.toJSON(arg, ctx);
      if (ctx.onCreate)
        ctx.onCreate(res);
      return res;
    }
    if (typeof value === "bigint" && !ctx?.keep)
      return Number(value);
    return value;
  }
  toJS.toJS = toJS$1;
  return toJS;
}
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return Node;
  hasRequiredNode = 1;
  var applyReviver2 = requireApplyReviver();
  var identity2 = requireIdentity();
  var toJS2 = requireToJS();
  class NodeBase {
    constructor(type) {
      Object.defineProperty(this, identity2.NODE_TYPE, { value: type });
    }
    /** Create a copy of this node.  */
    clone() {
      const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
      if (this.range)
        copy.range = this.range.slice();
      return copy;
    }
    /** A plain JavaScript representation of this node. */
    toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
      if (!identity2.isDocument(doc))
        throw new TypeError("A document argument is required");
      const ctx = {
        anchors: /* @__PURE__ */ new Map(),
        doc,
        keep: true,
        mapAsMap: mapAsMap === true,
        mapKeyWarned: false,
        maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
      };
      const res = toJS2.toJS(this, "", ctx);
      if (typeof onAnchor === "function")
        for (const { count: count2, res: res2 } of ctx.anchors.values())
          onAnchor(res2, count2);
      return typeof reviver === "function" ? applyReviver2.applyReviver(reviver, { "": res }, "", res) : res;
    }
  }
  Node.NodeBase = NodeBase;
  return Node;
}
var hasRequiredAlias;
function requireAlias() {
  if (hasRequiredAlias) return Alias;
  hasRequiredAlias = 1;
  var anchors2 = requireAnchors();
  var visit2 = requireVisit();
  var identity2 = requireIdentity();
  var Node2 = requireNode();
  var toJS2 = requireToJS();
  let Alias$1 = class Alias extends Node2.NodeBase {
    constructor(source) {
      super(identity2.ALIAS);
      this.source = source;
      Object.defineProperty(this, "tag", {
        set() {
          throw new Error("Alias nodes cannot have tags");
        }
      });
    }
    /**
     * Resolve the value of this alias within `doc`, finding the last
     * instance of the `source` anchor before this node.
     */
    resolve(doc, ctx) {
      if (ctx?.maxAliasCount === 0)
        throw new ReferenceError("Alias resolution is disabled");
      let nodes;
      if (ctx?.aliasResolveCache) {
        nodes = ctx.aliasResolveCache;
      } else {
        nodes = [];
        visit2.visit(doc, {
          Node: (_key, node) => {
            if (identity2.isAlias(node) || identity2.hasAnchor(node))
              nodes.push(node);
          }
        });
        if (ctx)
          ctx.aliasResolveCache = nodes;
      }
      let found = void 0;
      for (const node of nodes) {
        if (node === this)
          break;
        if (node.anchor === this.source)
          found = node;
      }
      return found;
    }
    toJSON(_arg, ctx) {
      if (!ctx)
        return { source: this.source };
      const { anchors: anchors3, doc, maxAliasCount } = ctx;
      const source = this.resolve(doc, ctx);
      if (!source) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new ReferenceError(msg);
      }
      let data = anchors3.get(source);
      if (!data) {
        toJS2.toJS(source, null, ctx);
        data = anchors3.get(source);
      }
      if (data?.res === void 0) {
        const msg = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(msg);
      }
      if (maxAliasCount >= 0) {
        data.count += 1;
        if (data.aliasCount === 0)
          data.aliasCount = getAliasCount(doc, source, anchors3);
        if (data.count * data.aliasCount > maxAliasCount) {
          const msg = "Excessive alias count indicates a resource exhaustion attack";
          throw new ReferenceError(msg);
        }
      }
      return data.res;
    }
    toString(ctx, _onComment, _onChompKeep) {
      const src = `*${this.source}`;
      if (ctx) {
        anchors2.anchorIsValid(this.source);
        if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new Error(msg);
        }
        if (ctx.implicitKey)
          return `${src} `;
      }
      return src;
    }
  };
  function getAliasCount(doc, node, anchors3) {
    if (identity2.isAlias(node)) {
      const source = node.resolve(doc);
      const anchor = anchors3 && source && anchors3.get(source);
      return anchor ? anchor.count * anchor.aliasCount : 0;
    } else if (identity2.isCollection(node)) {
      let count2 = 0;
      for (const item of node.items) {
        const c = getAliasCount(doc, item, anchors3);
        if (c > count2)
          count2 = c;
      }
      return count2;
    } else if (identity2.isPair(node)) {
      const kc = getAliasCount(doc, node.key, anchors3);
      const vc = getAliasCount(doc, node.value, anchors3);
      return Math.max(kc, vc);
    }
    return 1;
  }
  Alias.Alias = Alias$1;
  return Alias;
}
var Collection = {};
var createNode = {};
var Scalar = {};
var hasRequiredScalar;
function requireScalar() {
  if (hasRequiredScalar) return Scalar;
  hasRequiredScalar = 1;
  var identity2 = requireIdentity();
  var Node2 = requireNode();
  var toJS2 = requireToJS();
  const isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
  let Scalar$1 = class Scalar extends Node2.NodeBase {
    constructor(value) {
      super(identity2.SCALAR);
      this.value = value;
    }
    toJSON(arg, ctx) {
      return ctx?.keep ? this.value : toJS2.toJS(this.value, arg, ctx);
    }
    toString() {
      return String(this.value);
    }
  };
  Scalar$1.BLOCK_FOLDED = "BLOCK_FOLDED";
  Scalar$1.BLOCK_LITERAL = "BLOCK_LITERAL";
  Scalar$1.PLAIN = "PLAIN";
  Scalar$1.QUOTE_DOUBLE = "QUOTE_DOUBLE";
  Scalar$1.QUOTE_SINGLE = "QUOTE_SINGLE";
  Scalar.Scalar = Scalar$1;
  Scalar.isScalarValue = isScalarValue;
  return Scalar;
}
var hasRequiredCreateNode;
function requireCreateNode() {
  if (hasRequiredCreateNode) return createNode;
  hasRequiredCreateNode = 1;
  var Alias2 = requireAlias();
  var identity2 = requireIdentity();
  var Scalar2 = requireScalar();
  const defaultTagPrefix = "tag:yaml.org,2002:";
  function findTagObject(value, tagName, tags2) {
    if (tagName) {
      const match = tags2.filter((t) => t.tag === tagName);
      const tagObj = match.find((t) => !t.format) ?? match[0];
      if (!tagObj)
        throw new Error(`Tag ${tagName} not found`);
      return tagObj;
    }
    return tags2.find((t) => t.identify?.(value) && !t.format);
  }
  function createNode$1(value, tagName, ctx) {
    if (identity2.isDocument(value))
      value = value.contents;
    if (identity2.isNode(value))
      return value;
    if (identity2.isPair(value)) {
      const map2 = ctx.schema[identity2.MAP].createNode?.(ctx.schema, null, ctx);
      map2.items.push(value);
      return map2;
    }
    if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
      value = value.valueOf();
    }
    const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema2, sourceObjects } = ctx;
    let ref = void 0;
    if (aliasDuplicateObjects && value && typeof value === "object") {
      ref = sourceObjects.get(value);
      if (ref) {
        ref.anchor ?? (ref.anchor = onAnchor(value));
        return new Alias2.Alias(ref.anchor);
      } else {
        ref = { anchor: null, node: null };
        sourceObjects.set(value, ref);
      }
    }
    if (tagName?.startsWith("!!"))
      tagName = defaultTagPrefix + tagName.slice(2);
    let tagObj = findTagObject(value, tagName, schema2.tags);
    if (!tagObj) {
      if (value && typeof value.toJSON === "function") {
        value = value.toJSON();
      }
      if (!value || typeof value !== "object") {
        const node2 = new Scalar2.Scalar(value);
        if (ref)
          ref.node = node2;
        return node2;
      }
      tagObj = value instanceof Map ? schema2[identity2.MAP] : Symbol.iterator in Object(value) ? schema2[identity2.SEQ] : schema2[identity2.MAP];
    }
    if (onTagObj) {
      onTagObj(tagObj);
      delete ctx.onTagObj;
    }
    const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar2.Scalar(value);
    if (tagName)
      node.tag = tagName;
    else if (!tagObj.default)
      node.tag = tagObj.tag;
    if (ref)
      ref.node = node;
    return node;
  }
  createNode.createNode = createNode$1;
  return createNode;
}
var hasRequiredCollection;
function requireCollection() {
  if (hasRequiredCollection) return Collection;
  hasRequiredCollection = 1;
  var createNode2 = requireCreateNode();
  var identity2 = requireIdentity();
  var Node2 = requireNode();
  function collectionFromPath(schema2, path2, value) {
    let v = value;
    for (let i = path2.length - 1; i >= 0; --i) {
      const k = path2[i];
      if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
        const a = [];
        a[k] = v;
        v = a;
      } else {
        v = /* @__PURE__ */ new Map([[k, v]]);
      }
    }
    return createNode2.createNode(v, void 0, {
      aliasDuplicateObjects: false,
      keepUndefined: false,
      onAnchor: () => {
        throw new Error("This should not happen, please report a bug.");
      },
      schema: schema2,
      sourceObjects: /* @__PURE__ */ new Map()
    });
  }
  const isEmptyPath = (path2) => path2 == null || typeof path2 === "object" && !!path2[Symbol.iterator]().next().done;
  let Collection$1 = class Collection extends Node2.NodeBase {
    constructor(type, schema2) {
      super(type);
      Object.defineProperty(this, "schema", {
        value: schema2,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
    /**
     * Create a copy of this collection.
     *
     * @param schema - If defined, overwrites the original's schema
     */
    clone(schema2) {
      const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
      if (schema2)
        copy.schema = schema2;
      copy.items = copy.items.map((it) => identity2.isNode(it) || identity2.isPair(it) ? it.clone(schema2) : it);
      if (this.range)
        copy.range = this.range.slice();
      return copy;
    }
    /**
     * Adds a value to the collection. For `!!map` and `!!omap` the value must
     * be a Pair instance or a `{ key, value }` object, which may not have a key
     * that already exists in the map.
     */
    addIn(path2, value) {
      if (isEmptyPath(path2))
        this.add(value);
      else {
        const [key, ...rest] = path2;
        const node = this.get(key, true);
        if (identity2.isCollection(node))
          node.addIn(rest, value);
        else if (node === void 0 && this.schema)
          this.set(key, collectionFromPath(this.schema, rest, value));
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
    }
    /**
     * Removes a value from the collection.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path2) {
      const [key, ...rest] = path2;
      if (rest.length === 0)
        return this.delete(key);
      const node = this.get(key, true);
      if (identity2.isCollection(node))
        return node.deleteIn(rest);
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path2, keepScalar) {
      const [key, ...rest] = path2;
      const node = this.get(key, true);
      if (rest.length === 0)
        return !keepScalar && identity2.isScalar(node) ? node.value : node;
      else
        return identity2.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
    }
    hasAllNullValues(allowScalar) {
      return this.items.every((node) => {
        if (!identity2.isPair(node))
          return false;
        const n = node.value;
        return n == null || allowScalar && identity2.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
      });
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     */
    hasIn(path2) {
      const [key, ...rest] = path2;
      if (rest.length === 0)
        return this.has(key);
      const node = this.get(key, true);
      return identity2.isCollection(node) ? node.hasIn(rest) : false;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path2, value) {
      const [key, ...rest] = path2;
      if (rest.length === 0) {
        this.set(key, value);
      } else {
        const node = this.get(key, true);
        if (identity2.isCollection(node))
          node.setIn(rest, value);
        else if (node === void 0 && this.schema)
          this.set(key, collectionFromPath(this.schema, rest, value));
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
    }
  };
  Collection.Collection = Collection$1;
  Collection.collectionFromPath = collectionFromPath;
  Collection.isEmptyPath = isEmptyPath;
  return Collection;
}
var Pair = {};
var stringifyPair = {};
var stringify = {};
var stringifyComment = {};
var hasRequiredStringifyComment;
function requireStringifyComment() {
  if (hasRequiredStringifyComment) return stringifyComment;
  hasRequiredStringifyComment = 1;
  const stringifyComment$1 = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
  function indentComment(comment, indent) {
    if (/^\n+$/.test(comment))
      return comment.substring(1);
    return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
  }
  const lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
  stringifyComment.indentComment = indentComment;
  stringifyComment.lineComment = lineComment;
  stringifyComment.stringifyComment = stringifyComment$1;
  return stringifyComment;
}
var stringifyString = {};
var foldFlowLines = {};
var hasRequiredFoldFlowLines;
function requireFoldFlowLines() {
  if (hasRequiredFoldFlowLines) return foldFlowLines;
  hasRequiredFoldFlowLines = 1;
  const FOLD_FLOW = "flow";
  const FOLD_BLOCK = "block";
  const FOLD_QUOTED = "quoted";
  function foldFlowLines$1(text2, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
    if (!lineWidth || lineWidth < 0)
      return text2;
    if (lineWidth < minContentWidth)
      minContentWidth = 0;
    const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
    if (text2.length <= endStep)
      return text2;
    const folds = [];
    const escapedFolds = {};
    let end = lineWidth - indent.length;
    if (typeof indentAtStart === "number") {
      if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
        folds.push(0);
      else
        end = lineWidth - indentAtStart;
    }
    let split = void 0;
    let prev = void 0;
    let overflow = false;
    let i = -1;
    let escStart = -1;
    let escEnd = -1;
    if (mode === FOLD_BLOCK) {
      i = consumeMoreIndentedLines(text2, i, indent.length);
      if (i !== -1)
        end = i + endStep;
    }
    for (let ch; ch = text2[i += 1]; ) {
      if (mode === FOLD_QUOTED && ch === "\\") {
        escStart = i;
        switch (text2[i + 1]) {
          case "x":
            i += 3;
            break;
          case "u":
            i += 5;
            break;
          case "U":
            i += 9;
            break;
          default:
            i += 1;
        }
        escEnd = i;
      }
      if (ch === "\n") {
        if (mode === FOLD_BLOCK)
          i = consumeMoreIndentedLines(text2, i, indent.length);
        end = i + indent.length + endStep;
        split = void 0;
      } else {
        if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
          const next = text2[i + 1];
          if (next && next !== " " && next !== "\n" && next !== "	")
            split = i;
        }
        if (i >= end) {
          if (split) {
            folds.push(split);
            end = split + endStep;
            split = void 0;
          } else if (mode === FOLD_QUOTED) {
            while (prev === " " || prev === "	") {
              prev = ch;
              ch = text2[i += 1];
              overflow = true;
            }
            const j = i > escEnd + 1 ? i - 2 : escStart - 1;
            if (escapedFolds[j])
              return text2;
            folds.push(j);
            escapedFolds[j] = true;
            end = j + endStep;
            split = void 0;
          } else {
            overflow = true;
          }
        }
      }
      prev = ch;
    }
    if (overflow && onOverflow)
      onOverflow();
    if (folds.length === 0)
      return text2;
    if (onFold)
      onFold();
    let res = text2.slice(0, folds[0]);
    for (let i2 = 0; i2 < folds.length; ++i2) {
      const fold = folds[i2];
      const end2 = folds[i2 + 1] || text2.length;
      if (fold === 0)
        res = `
${indent}${text2.slice(0, end2)}`;
      else {
        if (mode === FOLD_QUOTED && escapedFolds[fold])
          res += `${text2[fold]}\\`;
        res += `
${indent}${text2.slice(fold + 1, end2)}`;
      }
    }
    return res;
  }
  function consumeMoreIndentedLines(text2, i, indent) {
    let end = i;
    let start = i + 1;
    let ch = text2[start];
    while (ch === " " || ch === "	") {
      if (i < start + indent) {
        ch = text2[++i];
      } else {
        do {
          ch = text2[++i];
        } while (ch && ch !== "\n");
        end = i;
        start = i + 1;
        ch = text2[start];
      }
    }
    return end;
  }
  foldFlowLines.FOLD_BLOCK = FOLD_BLOCK;
  foldFlowLines.FOLD_FLOW = FOLD_FLOW;
  foldFlowLines.FOLD_QUOTED = FOLD_QUOTED;
  foldFlowLines.foldFlowLines = foldFlowLines$1;
  return foldFlowLines;
}
var hasRequiredStringifyString;
function requireStringifyString() {
  if (hasRequiredStringifyString) return stringifyString;
  hasRequiredStringifyString = 1;
  var Scalar2 = requireScalar();
  var foldFlowLines2 = requireFoldFlowLines();
  const getFoldOptions = (ctx, isBlock) => ({
    indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
    lineWidth: ctx.options.lineWidth,
    minContentWidth: ctx.options.minContentWidth
  });
  const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
  function lineLengthOverLimit(str, lineWidth, indentLength) {
    if (!lineWidth || lineWidth < 0)
      return false;
    const limit = lineWidth - indentLength;
    const strLen = str.length;
    if (strLen <= limit)
      return false;
    for (let i = 0, start = 0; i < strLen; ++i) {
      if (str[i] === "\n") {
        if (i - start > limit)
          return true;
        start = i + 1;
        if (strLen - start <= limit)
          return false;
      }
    }
    return true;
  }
  function doubleQuotedString(value, ctx) {
    const json = JSON.stringify(value);
    if (ctx.options.doubleQuotedAsJSON)
      return json;
    const { implicitKey } = ctx;
    const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
    const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
    let str = "";
    let start = 0;
    for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
      if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
        str += json.slice(start, i) + "\\ ";
        i += 1;
        start = i;
        ch = "\\";
      }
      if (ch === "\\")
        switch (json[i + 1]) {
          case "u":
            {
              str += json.slice(start, i);
              const code = json.substr(i + 2, 4);
              switch (code) {
                case "0000":
                  str += "\\0";
                  break;
                case "0007":
                  str += "\\a";
                  break;
                case "000b":
                  str += "\\v";
                  break;
                case "001b":
                  str += "\\e";
                  break;
                case "0085":
                  str += "\\N";
                  break;
                case "00a0":
                  str += "\\_";
                  break;
                case "2028":
                  str += "\\L";
                  break;
                case "2029":
                  str += "\\P";
                  break;
                default:
                  if (code.substr(0, 2) === "00")
                    str += "\\x" + code.substr(2);
                  else
                    str += json.substr(i, 6);
              }
              i += 5;
              start = i + 1;
            }
            break;
          case "n":
            if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
              i += 1;
            } else {
              str += json.slice(start, i) + "\n\n";
              while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                str += "\n";
                i += 2;
              }
              str += indent;
              if (json[i + 2] === " ")
                str += "\\";
              i += 1;
              start = i + 1;
            }
            break;
          default:
            i += 1;
        }
    }
    str = start ? str + json.slice(start) : json;
    return implicitKey ? str : foldFlowLines2.foldFlowLines(str, indent, foldFlowLines2.FOLD_QUOTED, getFoldOptions(ctx, false));
  }
  function singleQuotedString(value, ctx) {
    if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
      return doubleQuotedString(value, ctx);
    const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
    const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
    return ctx.implicitKey ? res : foldFlowLines2.foldFlowLines(res, indent, foldFlowLines2.FOLD_FLOW, getFoldOptions(ctx, false));
  }
  function quotedString(value, ctx) {
    const { singleQuote } = ctx.options;
    let qs;
    if (singleQuote === false)
      qs = doubleQuotedString;
    else {
      const hasDouble = value.includes('"');
      const hasSingle = value.includes("'");
      if (hasDouble && !hasSingle)
        qs = singleQuotedString;
      else if (hasSingle && !hasDouble)
        qs = doubleQuotedString;
      else
        qs = singleQuote ? singleQuotedString : doubleQuotedString;
    }
    return qs(value, ctx);
  }
  let blockEndNewlines;
  try {
    blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
  } catch {
    blockEndNewlines = /\n+(?!\n|$)/g;
  }
  function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
    const { blockQuote, commentString, lineWidth } = ctx.options;
    if (!blockQuote || /\n[\t ]+$/.test(value)) {
      return quotedString(value, ctx);
    }
    const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
    const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar2.Scalar.BLOCK_FOLDED ? false : type === Scalar2.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
    if (!value)
      return literal ? "|\n" : ">\n";
    let chomp;
    let endStart;
    for (endStart = value.length; endStart > 0; --endStart) {
      const ch = value[endStart - 1];
      if (ch !== "\n" && ch !== "	" && ch !== " ")
        break;
    }
    let end = value.substring(endStart);
    const endNlPos = end.indexOf("\n");
    if (endNlPos === -1) {
      chomp = "-";
    } else if (value === end || endNlPos !== end.length - 1) {
      chomp = "+";
      if (onChompKeep)
        onChompKeep();
    } else {
      chomp = "";
    }
    if (end) {
      value = value.slice(0, -end.length);
      if (end[end.length - 1] === "\n")
        end = end.slice(0, -1);
      end = end.replace(blockEndNewlines, `$&${indent}`);
    }
    let startWithSpace = false;
    let startEnd;
    let startNlPos = -1;
    for (startEnd = 0; startEnd < value.length; ++startEnd) {
      const ch = value[startEnd];
      if (ch === " ")
        startWithSpace = true;
      else if (ch === "\n")
        startNlPos = startEnd;
      else
        break;
    }
    let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
    if (start) {
      value = value.substring(start.length);
      start = start.replace(/\n+/g, `$&${indent}`);
    }
    const indentSize = indent ? "2" : "1";
    let header = (startWithSpace ? indentSize : "") + chomp;
    if (comment) {
      header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
      if (onComment)
        onComment();
    }
    if (!literal) {
      const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      let literalFallback = false;
      const foldOptions = getFoldOptions(ctx, true);
      if (blockQuote !== "folded" && type !== Scalar2.Scalar.BLOCK_FOLDED) {
        foldOptions.onOverflow = () => {
          literalFallback = true;
        };
      }
      const body = foldFlowLines2.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines2.FOLD_BLOCK, foldOptions);
      if (!literalFallback)
        return `>${header}
${indent}${body}`;
    }
    value = value.replace(/\n+/g, `$&${indent}`);
    return `|${header}
${indent}${start}${value}${end}`;
  }
  function plainString(item, ctx, onComment, onChompKeep) {
    const { type, value } = item;
    const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
    if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
      return quotedString(value, ctx);
    }
    if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
      return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
    }
    if (!implicitKey && !inFlow && type !== Scalar2.Scalar.PLAIN && value.includes("\n")) {
      return blockString(item, ctx, onComment, onChompKeep);
    }
    if (containsDocumentMarker(value)) {
      if (indent === "") {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      } else if (implicitKey && indent === indentStep) {
        return quotedString(value, ctx);
      }
    }
    const str = value.replace(/\n+/g, `$&
${indent}`);
    if (actualString) {
      const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
      const { compat, tags: tags2 } = ctx.doc.schema;
      if (tags2.some(test) || compat?.some(test))
        return quotedString(value, ctx);
    }
    return implicitKey ? str : foldFlowLines2.foldFlowLines(str, indent, foldFlowLines2.FOLD_FLOW, getFoldOptions(ctx, false));
  }
  function stringifyString$1(item, ctx, onComment, onChompKeep) {
    const { implicitKey, inFlow } = ctx;
    const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
    let { type } = item;
    if (type !== Scalar2.Scalar.QUOTE_DOUBLE) {
      if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
        type = Scalar2.Scalar.QUOTE_DOUBLE;
    }
    const _stringify = (_type) => {
      switch (_type) {
        case Scalar2.Scalar.BLOCK_FOLDED:
        case Scalar2.Scalar.BLOCK_LITERAL:
          return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
        case Scalar2.Scalar.QUOTE_DOUBLE:
          return doubleQuotedString(ss.value, ctx);
        case Scalar2.Scalar.QUOTE_SINGLE:
          return singleQuotedString(ss.value, ctx);
        case Scalar2.Scalar.PLAIN:
          return plainString(ss, ctx, onComment, onChompKeep);
        default:
          return null;
      }
    };
    let res = _stringify(type);
    if (res === null) {
      const { defaultKeyType, defaultStringType } = ctx.options;
      const t = implicitKey && defaultKeyType || defaultStringType;
      res = _stringify(t);
      if (res === null)
        throw new Error(`Unsupported default string type ${t}`);
    }
    return res;
  }
  stringifyString.stringifyString = stringifyString$1;
  return stringifyString;
}
var hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  var anchors2 = requireAnchors();
  var identity2 = requireIdentity();
  var stringifyComment2 = requireStringifyComment();
  var stringifyString2 = requireStringifyString();
  function createStringifyContext(doc, options) {
    const opt = Object.assign({
      blockQuote: true,
      commentString: stringifyComment2.stringifyComment,
      defaultKeyType: null,
      defaultStringType: "PLAIN",
      directives: null,
      doubleQuotedAsJSON: false,
      doubleQuotedMinMultiLineLength: 40,
      falseStr: "false",
      flowCollectionPadding: true,
      indentSeq: true,
      lineWidth: 80,
      minContentWidth: 20,
      nullStr: "null",
      simpleKeys: false,
      singleQuote: null,
      trailingComma: false,
      trueStr: "true",
      verifyAliasOrder: true
    }, doc.schema.toStringOptions, options);
    let inFlow;
    switch (opt.collectionStyle) {
      case "block":
        inFlow = false;
        break;
      case "flow":
        inFlow = true;
        break;
      default:
        inFlow = null;
    }
    return {
      anchors: /* @__PURE__ */ new Set(),
      doc,
      flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
      indent: "",
      indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
      inFlow,
      options: opt
    };
  }
  function getTagObject(tags2, item) {
    if (item.tag) {
      const match = tags2.filter((t) => t.tag === item.tag);
      if (match.length > 0)
        return match.find((t) => t.format === item.format) ?? match[0];
    }
    let tagObj = void 0;
    let obj;
    if (identity2.isScalar(item)) {
      obj = item.value;
      let match = tags2.filter((t) => t.identify?.(obj));
      if (match.length > 1) {
        const testMatch = match.filter((t) => t.test);
        if (testMatch.length > 0)
          match = testMatch;
      }
      tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
    } else {
      obj = item;
      tagObj = tags2.find((t) => t.nodeClass && obj instanceof t.nodeClass);
    }
    if (!tagObj) {
      const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
      throw new Error(`Tag not resolved for ${name} value`);
    }
    return tagObj;
  }
  function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
    if (!doc.directives)
      return "";
    const props = [];
    const anchor = (identity2.isScalar(node) || identity2.isCollection(node)) && node.anchor;
    if (anchor && anchors2.anchorIsValid(anchor)) {
      anchors$1.add(anchor);
      props.push(`&${anchor}`);
    }
    const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
    if (tag)
      props.push(doc.directives.tagString(tag));
    return props.join(" ");
  }
  function stringify$1(item, ctx, onComment, onChompKeep) {
    if (identity2.isPair(item))
      return item.toString(ctx, onComment, onChompKeep);
    if (identity2.isAlias(item)) {
      if (ctx.doc.directives)
        return item.toString(ctx);
      if (ctx.resolvedAliases?.has(item)) {
        throw new TypeError(`Cannot stringify circular structure without alias nodes`);
      } else {
        if (ctx.resolvedAliases)
          ctx.resolvedAliases.add(item);
        else
          ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
        item = item.resolve(ctx.doc);
      }
    }
    let tagObj = void 0;
    const node = identity2.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
    tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
    const props = stringifyProps(node, tagObj, ctx);
    if (props.length > 0)
      ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
    const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity2.isScalar(node) ? stringifyString2.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
    if (!props)
      return str;
    return identity2.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
  }
  stringify.createStringifyContext = createStringifyContext;
  stringify.stringify = stringify$1;
  return stringify;
}
var hasRequiredStringifyPair;
function requireStringifyPair() {
  if (hasRequiredStringifyPair) return stringifyPair;
  hasRequiredStringifyPair = 1;
  var identity2 = requireIdentity();
  var Scalar2 = requireScalar();
  var stringify2 = requireStringify();
  var stringifyComment2 = requireStringifyComment();
  function stringifyPair$1({ key, value }, ctx, onComment, onChompKeep) {
    const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
    let keyComment = identity2.isNode(key) && key.comment || null;
    if (simpleKeys) {
      if (keyComment) {
        throw new Error("With simple keys, key nodes cannot have comments");
      }
      if (identity2.isCollection(key) || !identity2.isNode(key) && typeof key === "object") {
        const msg = "With simple keys, collection cannot be used as a key value";
        throw new Error(msg);
      }
    }
    let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity2.isCollection(key) || (identity2.isScalar(key) ? key.type === Scalar2.Scalar.BLOCK_FOLDED || key.type === Scalar2.Scalar.BLOCK_LITERAL : typeof key === "object"));
    ctx = Object.assign({}, ctx, {
      allNullValues: false,
      implicitKey: !explicitKey && (simpleKeys || !allNullValues),
      indent: indent + indentStep
    });
    let keyCommentDone = false;
    let chompKeep = false;
    let str = stringify2.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
    if (!explicitKey && !ctx.inFlow && str.length > 1024) {
      if (simpleKeys)
        throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
      explicitKey = true;
    }
    if (ctx.inFlow) {
      if (allNullValues || value == null) {
        if (keyCommentDone && onComment)
          onComment();
        return str === "" ? "?" : explicitKey ? `? ${str}` : str;
      }
    } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
      str = `? ${str}`;
      if (keyComment && !keyCommentDone) {
        str += stringifyComment2.lineComment(str, ctx.indent, commentString(keyComment));
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    if (keyCommentDone)
      keyComment = null;
    if (explicitKey) {
      if (keyComment)
        str += stringifyComment2.lineComment(str, ctx.indent, commentString(keyComment));
      str = `? ${str}
${indent}:`;
    } else {
      str = `${str}:`;
      if (keyComment)
        str += stringifyComment2.lineComment(str, ctx.indent, commentString(keyComment));
    }
    let vsb, vcb, valueComment;
    if (identity2.isNode(value)) {
      vsb = !!value.spaceBefore;
      vcb = value.commentBefore;
      valueComment = value.comment;
    } else {
      vsb = false;
      vcb = null;
      valueComment = null;
      if (value && typeof value === "object")
        value = doc.createNode(value);
    }
    ctx.implicitKey = false;
    if (!explicitKey && !keyComment && identity2.isScalar(value))
      ctx.indentAtStart = str.length + 1;
    chompKeep = false;
    if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity2.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
      ctx.indent = ctx.indent.substring(2);
    }
    let valueCommentDone = false;
    const valueStr = stringify2.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
    let ws = " ";
    if (keyComment || vsb || vcb) {
      ws = vsb ? "\n" : "";
      if (vcb) {
        const cs = commentString(vcb);
        ws += `
${stringifyComment2.indentComment(cs, ctx.indent)}`;
      }
      if (valueStr === "" && !ctx.inFlow) {
        if (ws === "\n" && valueComment)
          ws = "\n\n";
      } else {
        ws += `
${ctx.indent}`;
      }
    } else if (!explicitKey && identity2.isCollection(value)) {
      const vs0 = valueStr[0];
      const nl0 = valueStr.indexOf("\n");
      const hasNewline = nl0 !== -1;
      const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
      if (hasNewline || !flow) {
        let hasPropsLine = false;
        if (hasNewline && (vs0 === "&" || vs0 === "!")) {
          let sp0 = valueStr.indexOf(" ");
          if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
            sp0 = valueStr.indexOf(" ", sp0 + 1);
          }
          if (sp0 === -1 || nl0 < sp0)
            hasPropsLine = true;
        }
        if (!hasPropsLine)
          ws = `
${ctx.indent}`;
      }
    } else if (valueStr === "" || valueStr[0] === "\n") {
      ws = "";
    }
    str += ws + valueStr;
    if (ctx.inFlow) {
      if (valueCommentDone && onComment)
        onComment();
    } else if (valueComment && !valueCommentDone) {
      str += stringifyComment2.lineComment(str, ctx.indent, commentString(valueComment));
    } else if (chompKeep && onChompKeep) {
      onChompKeep();
    }
    return str;
  }
  stringifyPair.stringifyPair = stringifyPair$1;
  return stringifyPair;
}
var addPairToJSMap = {};
var log = {};
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog) return log;
  hasRequiredLog = 1;
  var node_process = require$$0;
  function debug(logLevel, ...messages2) {
    if (logLevel === "debug")
      console.log(...messages2);
  }
  function warn(logLevel, warning) {
    if (logLevel === "debug" || logLevel === "warn") {
      if (typeof node_process.emitWarning === "function")
        node_process.emitWarning(warning);
      else
        console.warn(warning);
    }
  }
  log.debug = debug;
  log.warn = warn;
  return log;
}
var merge = {};
var hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge;
  hasRequiredMerge = 1;
  var identity2 = requireIdentity();
  var Scalar2 = requireScalar();
  const MERGE_KEY = "<<";
  const merge$1 = {
    identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
    default: "key",
    tag: "tag:yaml.org,2002:merge",
    test: /^<<$/,
    resolve: () => Object.assign(new Scalar2.Scalar(Symbol(MERGE_KEY)), {
      addToJSMap: addMergeToJSMap
    }),
    stringify: () => MERGE_KEY
  };
  const isMergeKey = (ctx, key) => (merge$1.identify(key) || identity2.isScalar(key) && (!key.type || key.type === Scalar2.Scalar.PLAIN) && merge$1.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge$1.tag && tag.default);
  function addMergeToJSMap(ctx, map2, value) {
    const source = resolveAliasValue(ctx, value);
    if (identity2.isSeq(source))
      for (const it of source.items)
        mergeValue(ctx, map2, it);
    else if (Array.isArray(source))
      for (const it of source)
        mergeValue(ctx, map2, it);
    else
      mergeValue(ctx, map2, source);
  }
  function mergeValue(ctx, map2, value) {
    const source = resolveAliasValue(ctx, value);
    if (!identity2.isMap(source))
      throw new Error("Merge sources must be maps or map aliases");
    const srcMap = source.toJSON(null, ctx, Map);
    for (const [key, value2] of srcMap) {
      if (map2 instanceof Map) {
        if (!map2.has(key))
          map2.set(key, value2);
      } else if (map2 instanceof Set) {
        map2.add(key);
      } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
        Object.defineProperty(map2, key, {
          value: value2,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    }
    return map2;
  }
  function resolveAliasValue(ctx, value) {
    return ctx && identity2.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
  }
  merge.addMergeToJSMap = addMergeToJSMap;
  merge.isMergeKey = isMergeKey;
  merge.merge = merge$1;
  return merge;
}
var hasRequiredAddPairToJSMap;
function requireAddPairToJSMap() {
  if (hasRequiredAddPairToJSMap) return addPairToJSMap;
  hasRequiredAddPairToJSMap = 1;
  var log2 = requireLog();
  var merge2 = requireMerge();
  var stringify2 = requireStringify();
  var identity2 = requireIdentity();
  var toJS2 = requireToJS();
  function addPairToJSMap$1(ctx, map2, { key, value }) {
    if (identity2.isNode(key) && key.addToJSMap)
      key.addToJSMap(ctx, map2, value);
    else if (merge2.isMergeKey(ctx, key))
      merge2.addMergeToJSMap(ctx, map2, value);
    else {
      const jsKey = toJS2.toJS(key, "", ctx);
      if (map2 instanceof Map) {
        map2.set(jsKey, toJS2.toJS(value, jsKey, ctx));
      } else if (map2 instanceof Set) {
        map2.add(jsKey);
      } else {
        const stringKey = stringifyKey(key, jsKey, ctx);
        const jsValue = toJS2.toJS(value, stringKey, ctx);
        if (stringKey in map2)
          Object.defineProperty(map2, stringKey, {
            value: jsValue,
            writable: true,
            enumerable: true,
            configurable: true
          });
        else
          map2[stringKey] = jsValue;
      }
    }
    return map2;
  }
  function stringifyKey(key, jsKey, ctx) {
    if (jsKey === null)
      return "";
    if (typeof jsKey !== "object")
      return String(jsKey);
    if (identity2.isNode(key) && ctx?.doc) {
      const strCtx = stringify2.createStringifyContext(ctx.doc, {});
      strCtx.anchors = /* @__PURE__ */ new Set();
      for (const node of ctx.anchors.keys())
        strCtx.anchors.add(node.anchor);
      strCtx.inFlow = true;
      strCtx.inStringifyKey = true;
      const strKey = key.toString(strCtx);
      if (!ctx.mapKeyWarned) {
        let jsonStr = JSON.stringify(strKey);
        if (jsonStr.length > 40)
          jsonStr = jsonStr.substring(0, 36) + '..."';
        log2.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
        ctx.mapKeyWarned = true;
      }
      return strKey;
    }
    return JSON.stringify(jsKey);
  }
  addPairToJSMap.addPairToJSMap = addPairToJSMap$1;
  return addPairToJSMap;
}
var hasRequiredPair;
function requirePair() {
  if (hasRequiredPair) return Pair;
  hasRequiredPair = 1;
  var createNode2 = requireCreateNode();
  var stringifyPair2 = requireStringifyPair();
  var addPairToJSMap2 = requireAddPairToJSMap();
  var identity2 = requireIdentity();
  function createPair(key, value, ctx) {
    const k = createNode2.createNode(key, void 0, ctx);
    const v = createNode2.createNode(value, void 0, ctx);
    return new Pair$1(k, v);
  }
  let Pair$1 = class Pair2 {
    constructor(key, value = null) {
      Object.defineProperty(this, identity2.NODE_TYPE, { value: identity2.PAIR });
      this.key = key;
      this.value = value;
    }
    clone(schema2) {
      let { key, value } = this;
      if (identity2.isNode(key))
        key = key.clone(schema2);
      if (identity2.isNode(value))
        value = value.clone(schema2);
      return new Pair2(key, value);
    }
    toJSON(_, ctx) {
      const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
      return addPairToJSMap2.addPairToJSMap(ctx, pair, this);
    }
    toString(ctx, onComment, onChompKeep) {
      return ctx?.doc ? stringifyPair2.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
    }
  };
  Pair.Pair = Pair$1;
  Pair.createPair = createPair;
  return Pair;
}
var Schema = {};
var map = {};
var YAMLMap = {};
var stringifyCollection = {};
var hasRequiredStringifyCollection;
function requireStringifyCollection() {
  if (hasRequiredStringifyCollection) return stringifyCollection;
  hasRequiredStringifyCollection = 1;
  var identity2 = requireIdentity();
  var stringify2 = requireStringify();
  var stringifyComment2 = requireStringifyComment();
  function stringifyCollection$1(collection, ctx, options) {
    const flow = ctx.inFlow ?? collection.flow;
    const stringify3 = flow ? stringifyFlowCollection : stringifyBlockCollection;
    return stringify3(collection, ctx, options);
  }
  function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
    const { indent, options: { commentString } } = ctx;
    const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
    let chompKeep = false;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      let comment2 = null;
      if (identity2.isNode(item)) {
        if (!chompKeep && item.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
        if (item.comment)
          comment2 = item.comment;
      } else if (identity2.isPair(item)) {
        const ik = identity2.isNode(item.key) ? item.key : null;
        if (ik) {
          if (!chompKeep && ik.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
        }
      }
      chompKeep = false;
      let str2 = stringify2.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
      if (comment2)
        str2 += stringifyComment2.lineComment(str2, itemIndent, commentString(comment2));
      if (chompKeep && comment2)
        chompKeep = false;
      lines.push(blockItemPrefix + str2);
    }
    let str;
    if (lines.length === 0) {
      str = flowChars.start + flowChars.end;
    } else {
      str = lines[0];
      for (let i = 1; i < lines.length; ++i) {
        const line2 = lines[i];
        str += line2 ? `
${indent}${line2}` : "\n";
      }
    }
    if (comment) {
      str += "\n" + stringifyComment2.indentComment(commentString(comment), indent);
      if (onComment)
        onComment();
    } else if (chompKeep && onChompKeep)
      onChompKeep();
    return str;
  }
  function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
    const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
    itemIndent += indentStep;
    const itemCtx = Object.assign({}, ctx, {
      indent: itemIndent,
      inFlow: true,
      type: null
    });
    let reqNewline = false;
    let linesAtValue = 0;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      let comment = null;
      if (identity2.isNode(item)) {
        if (item.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, item.commentBefore, false);
        if (item.comment)
          comment = item.comment;
      } else if (identity2.isPair(item)) {
        const ik = identity2.isNode(item.key) ? item.key : null;
        if (ik) {
          if (ik.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, ik.commentBefore, false);
          if (ik.comment)
            reqNewline = true;
        }
        const iv = identity2.isNode(item.value) ? item.value : null;
        if (iv) {
          if (iv.comment)
            comment = iv.comment;
          if (iv.commentBefore)
            reqNewline = true;
        } else if (item.value == null && ik?.comment) {
          comment = ik.comment;
        }
      }
      if (comment)
        reqNewline = true;
      let str = stringify2.stringify(item, itemCtx, () => comment = null);
      reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
      if (i < items.length - 1) {
        str += ",";
      } else if (ctx.options.trailingComma) {
        if (ctx.options.lineWidth > 0) {
          reqNewline || (reqNewline = lines.reduce((sum, line2) => sum + line2.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
        }
        if (reqNewline) {
          str += ",";
        }
      }
      if (comment)
        str += stringifyComment2.lineComment(str, itemIndent, commentString(comment));
      lines.push(str);
      linesAtValue = lines.length;
    }
    const { start, end } = flowChars;
    if (lines.length === 0) {
      return start + end;
    } else {
      if (!reqNewline) {
        const len = lines.reduce((sum, line2) => sum + line2.length + 2, 2);
        reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
      }
      if (reqNewline) {
        let str = start;
        for (const line2 of lines)
          str += line2 ? `
${indentStep}${indent}${line2}` : "\n";
        return `${str}
${indent}${end}`;
      } else {
        return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
      }
    }
  }
  function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
    if (comment && chompKeep)
      comment = comment.replace(/^\n+/, "");
    if (comment) {
      const ic = stringifyComment2.indentComment(commentString(comment), indent);
      lines.push(ic.trimStart());
    }
  }
  stringifyCollection.stringifyCollection = stringifyCollection$1;
  return stringifyCollection;
}
var hasRequiredYAMLMap;
function requireYAMLMap() {
  if (hasRequiredYAMLMap) return YAMLMap;
  hasRequiredYAMLMap = 1;
  var stringifyCollection2 = requireStringifyCollection();
  var addPairToJSMap2 = requireAddPairToJSMap();
  var Collection2 = requireCollection();
  var identity2 = requireIdentity();
  var Pair2 = requirePair();
  var Scalar2 = requireScalar();
  function findPair(items, key) {
    const k = identity2.isScalar(key) ? key.value : key;
    for (const it of items) {
      if (identity2.isPair(it)) {
        if (it.key === key || it.key === k)
          return it;
        if (identity2.isScalar(it.key) && it.key.value === k)
          return it;
      }
    }
    return void 0;
  }
  let YAMLMap$1 = class YAMLMap extends Collection2.Collection {
    static get tagName() {
      return "tag:yaml.org,2002:map";
    }
    constructor(schema2) {
      super(identity2.MAP, schema2);
      this.items = [];
    }
    /**
     * A generic collection parsing method that can be extended
     * to other node classes that inherit from YAMLMap
     */
    static from(schema2, obj, ctx) {
      const { keepUndefined, replacer } = ctx;
      const map2 = new this(schema2);
      const add = (key, value) => {
        if (typeof replacer === "function")
          value = replacer.call(obj, key, value);
        else if (Array.isArray(replacer) && !replacer.includes(key))
          return;
        if (value !== void 0 || keepUndefined)
          map2.items.push(Pair2.createPair(key, value, ctx));
      };
      if (obj instanceof Map) {
        for (const [key, value] of obj)
          add(key, value);
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj))
          add(key, obj[key]);
      }
      if (typeof schema2.sortMapEntries === "function") {
        map2.items.sort(schema2.sortMapEntries);
      }
      return map2;
    }
    /**
     * Adds a value to the collection.
     *
     * @param overwrite - If not set `true`, using a key that is already in the
     *   collection will throw. Otherwise, overwrites the previous value.
     */
    add(pair, overwrite) {
      let _pair;
      if (identity2.isPair(pair))
        _pair = pair;
      else if (!pair || typeof pair !== "object" || !("key" in pair)) {
        _pair = new Pair2.Pair(pair, pair?.value);
      } else
        _pair = new Pair2.Pair(pair.key, pair.value);
      const prev = findPair(this.items, _pair.key);
      const sortEntries = this.schema?.sortMapEntries;
      if (prev) {
        if (!overwrite)
          throw new Error(`Key ${_pair.key} already set`);
        if (identity2.isScalar(prev.value) && Scalar2.isScalarValue(_pair.value))
          prev.value.value = _pair.value;
        else
          prev.value = _pair.value;
      } else if (sortEntries) {
        const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
        if (i === -1)
          this.items.push(_pair);
        else
          this.items.splice(i, 0, _pair);
      } else {
        this.items.push(_pair);
      }
    }
    delete(key) {
      const it = findPair(this.items, key);
      if (!it)
        return false;
      const del = this.items.splice(this.items.indexOf(it), 1);
      return del.length > 0;
    }
    get(key, keepScalar) {
      const it = findPair(this.items, key);
      const node = it?.value;
      return (!keepScalar && identity2.isScalar(node) ? node.value : node) ?? void 0;
    }
    has(key) {
      return !!findPair(this.items, key);
    }
    set(key, value) {
      this.add(new Pair2.Pair(key, value), true);
    }
    /**
     * @param ctx - Conversion context, originally set in Document#toJS()
     * @param {Class} Type - If set, forces the returned collection type
     * @returns Instance of Type, Map, or Object
     */
    toJSON(_, ctx, Type) {
      const map2 = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
      if (ctx?.onCreate)
        ctx.onCreate(map2);
      for (const item of this.items)
        addPairToJSMap2.addPairToJSMap(ctx, map2, item);
      return map2;
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx)
        return JSON.stringify(this);
      for (const item of this.items) {
        if (!identity2.isPair(item))
          throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
      }
      if (!ctx.allNullValues && this.hasAllNullValues(false))
        ctx = Object.assign({}, ctx, { allNullValues: true });
      return stringifyCollection2.stringifyCollection(this, ctx, {
        blockItemPrefix: "",
        flowChars: { start: "{", end: "}" },
        itemIndent: ctx.indent || "",
        onChompKeep,
        onComment
      });
    }
  };
  YAMLMap.YAMLMap = YAMLMap$1;
  YAMLMap.findPair = findPair;
  return YAMLMap;
}
var hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  var identity2 = requireIdentity();
  var YAMLMap2 = requireYAMLMap();
  const map$1 = {
    collection: "map",
    default: true,
    nodeClass: YAMLMap2.YAMLMap,
    tag: "tag:yaml.org,2002:map",
    resolve(map2, onError) {
      if (!identity2.isMap(map2))
        onError("Expected a mapping for this tag");
      return map2;
    },
    createNode: (schema2, obj, ctx) => YAMLMap2.YAMLMap.from(schema2, obj, ctx)
  };
  map.map = map$1;
  return map;
}
var seq = {};
var YAMLSeq = {};
var hasRequiredYAMLSeq;
function requireYAMLSeq() {
  if (hasRequiredYAMLSeq) return YAMLSeq;
  hasRequiredYAMLSeq = 1;
  var createNode2 = requireCreateNode();
  var stringifyCollection2 = requireStringifyCollection();
  var Collection2 = requireCollection();
  var identity2 = requireIdentity();
  var Scalar2 = requireScalar();
  var toJS2 = requireToJS();
  let YAMLSeq$1 = class YAMLSeq extends Collection2.Collection {
    static get tagName() {
      return "tag:yaml.org,2002:seq";
    }
    constructor(schema2) {
      super(identity2.SEQ, schema2);
      this.items = [];
    }
    add(value) {
      this.items.push(value);
    }
    /**
     * Removes a value from the collection.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     *
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number")
        return false;
      const del = this.items.splice(idx, 1);
      return del.length > 0;
    }
    get(key, keepScalar) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number")
        return void 0;
      const it = this.items[idx];
      return !keepScalar && identity2.isScalar(it) ? it.value : it;
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     */
    has(key) {
      const idx = asItemIndex(key);
      return typeof idx === "number" && idx < this.items.length;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     *
     * If `key` does not contain a representation of an integer, this will throw.
     * It may be wrapped in a `Scalar`.
     */
    set(key, value) {
      const idx = asItemIndex(key);
      if (typeof idx !== "number")
        throw new Error(`Expected a valid index, not ${key}.`);
      const prev = this.items[idx];
      if (identity2.isScalar(prev) && Scalar2.isScalarValue(value))
        prev.value = value;
      else
        this.items[idx] = value;
    }
    toJSON(_, ctx) {
      const seq2 = [];
      if (ctx?.onCreate)
        ctx.onCreate(seq2);
      let i = 0;
      for (const item of this.items)
        seq2.push(toJS2.toJS(item, String(i++), ctx));
      return seq2;
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx)
        return JSON.stringify(this);
      return stringifyCollection2.stringifyCollection(this, ctx, {
        blockItemPrefix: "- ",
        flowChars: { start: "[", end: "]" },
        itemIndent: (ctx.indent || "") + "  ",
        onChompKeep,
        onComment
      });
    }
    static from(schema2, obj, ctx) {
      const { replacer } = ctx;
      const seq2 = new this(schema2);
      if (obj && Symbol.iterator in Object(obj)) {
        let i = 0;
        for (let it of obj) {
          if (typeof replacer === "function") {
            const key = obj instanceof Set ? it : String(i++);
            it = replacer.call(obj, key, it);
          }
          seq2.items.push(createNode2.createNode(it, void 0, ctx));
        }
      }
      return seq2;
    }
  };
  function asItemIndex(key) {
    let idx = identity2.isScalar(key) ? key.value : key;
    if (idx && typeof idx === "string")
      idx = Number(idx);
    return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
  }
  YAMLSeq.YAMLSeq = YAMLSeq$1;
  return YAMLSeq;
}
var hasRequiredSeq;
function requireSeq() {
  if (hasRequiredSeq) return seq;
  hasRequiredSeq = 1;
  var identity2 = requireIdentity();
  var YAMLSeq2 = requireYAMLSeq();
  const seq$1 = {
    collection: "seq",
    default: true,
    nodeClass: YAMLSeq2.YAMLSeq,
    tag: "tag:yaml.org,2002:seq",
    resolve(seq2, onError) {
      if (!identity2.isSeq(seq2))
        onError("Expected a sequence for this tag");
      return seq2;
    },
    createNode: (schema2, obj, ctx) => YAMLSeq2.YAMLSeq.from(schema2, obj, ctx)
  };
  seq.seq = seq$1;
  return seq;
}
var string = {};
var hasRequiredString;
function requireString() {
  if (hasRequiredString) return string;
  hasRequiredString = 1;
  var stringifyString2 = requireStringifyString();
  const string$1 = {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify(item, ctx, onComment, onChompKeep) {
      ctx = Object.assign({ actualString: true }, ctx);
      return stringifyString2.stringifyString(item, ctx, onComment, onChompKeep);
    }
  };
  string.string = string$1;
  return string;
}
var tags = {};
var _null = {};
var hasRequired_null;
function require_null() {
  if (hasRequired_null) return _null;
  hasRequired_null = 1;
  var Scalar2 = requireScalar();
  const nullTag = {
    identify: (value) => value == null,
    createNode: () => new Scalar2.Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new Scalar2.Scalar(null),
    stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
  };
  _null.nullTag = nullTag;
  return _null;
}
var bool$1 = {};
var hasRequiredBool$1;
function requireBool$1() {
  if (hasRequiredBool$1) return bool$1;
  hasRequiredBool$1 = 1;
  var Scalar2 = requireScalar();
  const boolTag = {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: (str) => new Scalar2.Scalar(str[0] === "t" || str[0] === "T"),
    stringify({ source, value }, ctx) {
      if (source && boolTag.test.test(source)) {
        const sv = source[0] === "t" || source[0] === "T";
        if (value === sv)
          return source;
      }
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
  };
  bool$1.boolTag = boolTag;
  return bool$1;
}
var float$1 = {};
var stringifyNumber = {};
var hasRequiredStringifyNumber;
function requireStringifyNumber() {
  if (hasRequiredStringifyNumber) return stringifyNumber;
  hasRequiredStringifyNumber = 1;
  function stringifyNumber$1({ format, minFractionDigits, tag, value }) {
    if (typeof value === "bigint")
      return String(value);
    const num = typeof value === "number" ? value : Number(value);
    if (!isFinite(num))
      return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
    let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
    if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
      let i = n.indexOf(".");
      if (i < 0) {
        i = n.length;
        n += ".";
      }
      let d = minFractionDigits - (n.length - i - 1);
      while (d-- > 0)
        n += "0";
    }
    return n;
  }
  stringifyNumber.stringifyNumber = stringifyNumber$1;
  return stringifyNumber;
}
var hasRequiredFloat$1;
function requireFloat$1() {
  if (hasRequiredFloat$1) return float$1;
  hasRequiredFloat$1 = 1;
  var Scalar2 = requireScalar();
  var stringifyNumber2 = requireStringifyNumber();
  const floatNaN = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber2.stringifyNumber
  };
  const floatExp = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "EXP",
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str),
    stringify(node) {
      const num = Number(node.value);
      return isFinite(num) ? num.toExponential() : stringifyNumber2.stringifyNumber(node);
    }
  };
  const float2 = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(str) {
      const node = new Scalar2.Scalar(parseFloat(str));
      const dot = str.indexOf(".");
      if (dot !== -1 && str[str.length - 1] === "0")
        node.minFractionDigits = str.length - dot - 1;
      return node;
    },
    stringify: stringifyNumber2.stringifyNumber
  };
  float$1.float = float2;
  float$1.floatExp = floatExp;
  float$1.floatNaN = floatNaN;
  return float$1;
}
var int$1 = {};
var hasRequiredInt$1;
function requireInt$1() {
  if (hasRequiredInt$1) return int$1;
  hasRequiredInt$1 = 1;
  var stringifyNumber2 = requireStringifyNumber();
  const intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
  const intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
  function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value) && value >= 0)
      return prefix + value.toString(radix);
    return stringifyNumber2.stringifyNumber(node);
  }
  const intOct = {
    identify: (value) => intIdentify(value) && value >= 0,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "OCT",
    test: /^0o[0-7]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
    stringify: (node) => intStringify(node, 8, "0o")
  };
  const int2 = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^[-+]?[0-9]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber2.stringifyNumber
  };
  const intHex = {
    identify: (value) => intIdentify(value) && value >= 0,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "HEX",
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: (node) => intStringify(node, 16, "0x")
  };
  int$1.int = int2;
  int$1.intHex = intHex;
  int$1.intOct = intOct;
  return int$1;
}
var schema$2 = {};
var hasRequiredSchema$3;
function requireSchema$3() {
  if (hasRequiredSchema$3) return schema$2;
  hasRequiredSchema$3 = 1;
  var map2 = requireMap();
  var _null2 = require_null();
  var seq2 = requireSeq();
  var string2 = requireString();
  var bool2 = requireBool$1();
  var float2 = requireFloat$1();
  var int2 = requireInt$1();
  const schema2 = [
    map2.map,
    seq2.seq,
    string2.string,
    _null2.nullTag,
    bool2.boolTag,
    int2.intOct,
    int2.int,
    int2.intHex,
    float2.floatNaN,
    float2.floatExp,
    float2.float
  ];
  schema$2.schema = schema2;
  return schema$2;
}
var schema$1 = {};
var hasRequiredSchema$2;
function requireSchema$2() {
  if (hasRequiredSchema$2) return schema$1;
  hasRequiredSchema$2 = 1;
  var Scalar2 = requireScalar();
  var map2 = requireMap();
  var seq2 = requireSeq();
  function intIdentify(value) {
    return typeof value === "bigint" || Number.isInteger(value);
  }
  const stringifyJSON = ({ value }) => JSON.stringify(value);
  const jsonScalars = [
    {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify: stringifyJSON
    },
    {
      identify: (value) => value == null,
      createNode: () => new Scalar2.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^null$/,
      resolve: () => null,
      stringify: stringifyJSON
    },
    {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^true$|^false$/,
      resolve: (str) => str === "true",
      stringify: stringifyJSON
    },
    {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
      stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
    },
    {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: (str) => parseFloat(str),
      stringify: stringifyJSON
    }
  ];
  const jsonError = {
    default: true,
    tag: "",
    test: /^/,
    resolve(str, onError) {
      onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
      return str;
    }
  };
  const schema2 = [map2.map, seq2.seq].concat(jsonScalars, jsonError);
  schema$1.schema = schema2;
  return schema$1;
}
var binary = {};
var hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary;
  hasRequiredBinary = 1;
  var node_buffer = require$$0$1;
  var Scalar2 = requireScalar();
  var stringifyString2 = requireStringifyString();
  const binary$1 = {
    identify: (value) => value instanceof Uint8Array,
    // Buffer inherits from Uint8Array
    default: false,
    tag: "tag:yaml.org,2002:binary",
    /**
     * Returns a Buffer in node and an Uint8Array in browsers
     *
     * To use the resulting buffer as an image, you'll want to do something like:
     *
     *   const blob = new Blob([buffer], { type: 'image/jpeg' })
     *   document.querySelector('#photo').src = URL.createObjectURL(blob)
     */
    resolve(src, onError) {
      if (typeof node_buffer.Buffer === "function") {
        return node_buffer.Buffer.from(src, "base64");
      } else if (typeof atob === "function") {
        const str = atob(src.replace(/[\n\r]/g, ""));
        const buffer = new Uint8Array(str.length);
        for (let i = 0; i < str.length; ++i)
          buffer[i] = str.charCodeAt(i);
        return buffer;
      } else {
        onError("This environment does not support reading binary tags; either Buffer or atob is required");
        return src;
      }
    },
    stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
      if (!value)
        return "";
      const buf = value;
      let str;
      if (typeof node_buffer.Buffer === "function") {
        str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
      } else if (typeof btoa === "function") {
        let s = "";
        for (let i = 0; i < buf.length; ++i)
          s += String.fromCharCode(buf[i]);
        str = btoa(s);
      } else {
        throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
      }
      type ?? (type = Scalar2.Scalar.BLOCK_LITERAL);
      if (type !== Scalar2.Scalar.QUOTE_DOUBLE) {
        const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
        const n = Math.ceil(str.length / lineWidth);
        const lines = new Array(n);
        for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
          lines[i] = str.substr(o, lineWidth);
        }
        str = lines.join(type === Scalar2.Scalar.BLOCK_LITERAL ? "\n" : " ");
      }
      return stringifyString2.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
    }
  };
  binary.binary = binary$1;
  return binary;
}
var omap = {};
var pairs = {};
var hasRequiredPairs;
function requirePairs() {
  if (hasRequiredPairs) return pairs;
  hasRequiredPairs = 1;
  var identity2 = requireIdentity();
  var Pair2 = requirePair();
  var Scalar2 = requireScalar();
  var YAMLSeq2 = requireYAMLSeq();
  function resolvePairs(seq2, onError) {
    if (identity2.isSeq(seq2)) {
      for (let i = 0; i < seq2.items.length; ++i) {
        let item = seq2.items[i];
        if (identity2.isPair(item))
          continue;
        else if (identity2.isMap(item)) {
          if (item.items.length > 1)
            onError("Each pair must have its own sequence indicator");
          const pair = item.items[0] || new Pair2.Pair(new Scalar2.Scalar(null));
          if (item.commentBefore)
            pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
          if (item.comment) {
            const cn = pair.value ?? pair.key;
            cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
          }
          item = pair;
        }
        seq2.items[i] = identity2.isPair(item) ? item : new Pair2.Pair(item);
      }
    } else
      onError("Expected a sequence for this tag");
    return seq2;
  }
  function createPairs(schema2, iterable, ctx) {
    const { replacer } = ctx;
    const pairs2 = new YAMLSeq2.YAMLSeq(schema2);
    pairs2.tag = "tag:yaml.org,2002:pairs";
    let i = 0;
    if (iterable && Symbol.iterator in Object(iterable))
      for (let it of iterable) {
        if (typeof replacer === "function")
          it = replacer.call(iterable, String(i++), it);
        let key, value;
        if (Array.isArray(it)) {
          if (it.length === 2) {
            key = it[0];
            value = it[1];
          } else
            throw new TypeError(`Expected [key, value] tuple: ${it}`);
        } else if (it && it instanceof Object) {
          const keys = Object.keys(it);
          if (keys.length === 1) {
            key = keys[0];
            value = it[key];
          } else {
            throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
          }
        } else {
          key = it;
        }
        pairs2.items.push(Pair2.createPair(key, value, ctx));
      }
    return pairs2;
  }
  const pairs$1 = {
    collection: "seq",
    default: false,
    tag: "tag:yaml.org,2002:pairs",
    resolve: resolvePairs,
    createNode: createPairs
  };
  pairs.createPairs = createPairs;
  pairs.pairs = pairs$1;
  pairs.resolvePairs = resolvePairs;
  return pairs;
}
var hasRequiredOmap;
function requireOmap() {
  if (hasRequiredOmap) return omap;
  hasRequiredOmap = 1;
  var identity2 = requireIdentity();
  var toJS2 = requireToJS();
  var YAMLMap2 = requireYAMLMap();
  var YAMLSeq2 = requireYAMLSeq();
  var pairs2 = requirePairs();
  class YAMLOMap extends YAMLSeq2.YAMLSeq {
    constructor() {
      super();
      this.add = YAMLMap2.YAMLMap.prototype.add.bind(this);
      this.delete = YAMLMap2.YAMLMap.prototype.delete.bind(this);
      this.get = YAMLMap2.YAMLMap.prototype.get.bind(this);
      this.has = YAMLMap2.YAMLMap.prototype.has.bind(this);
      this.set = YAMLMap2.YAMLMap.prototype.set.bind(this);
      this.tag = YAMLOMap.tag;
    }
    /**
     * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
     * but TypeScript won't allow widening the signature of a child method.
     */
    toJSON(_, ctx) {
      if (!ctx)
        return super.toJSON(_);
      const map2 = /* @__PURE__ */ new Map();
      if (ctx?.onCreate)
        ctx.onCreate(map2);
      for (const pair of this.items) {
        let key, value;
        if (identity2.isPair(pair)) {
          key = toJS2.toJS(pair.key, "", ctx);
          value = toJS2.toJS(pair.value, key, ctx);
        } else {
          key = toJS2.toJS(pair, "", ctx);
        }
        if (map2.has(key))
          throw new Error("Ordered maps must not include duplicate keys");
        map2.set(key, value);
      }
      return map2;
    }
    static from(schema2, iterable, ctx) {
      const pairs$1 = pairs2.createPairs(schema2, iterable, ctx);
      const omap2 = new this();
      omap2.items = pairs$1.items;
      return omap2;
    }
  }
  YAMLOMap.tag = "tag:yaml.org,2002:omap";
  const omap$1 = {
    collection: "seq",
    identify: (value) => value instanceof Map,
    nodeClass: YAMLOMap,
    default: false,
    tag: "tag:yaml.org,2002:omap",
    resolve(seq2, onError) {
      const pairs$1 = pairs2.resolvePairs(seq2, onError);
      const seenKeys = [];
      for (const { key } of pairs$1.items) {
        if (identity2.isScalar(key)) {
          if (seenKeys.includes(key.value)) {
            onError(`Ordered maps must not include duplicate keys: ${key.value}`);
          } else {
            seenKeys.push(key.value);
          }
        }
      }
      return Object.assign(new YAMLOMap(), pairs$1);
    },
    createNode: (schema2, iterable, ctx) => YAMLOMap.from(schema2, iterable, ctx)
  };
  omap.YAMLOMap = YAMLOMap;
  omap.omap = omap$1;
  return omap;
}
var schema = {};
var bool = {};
var hasRequiredBool;
function requireBool() {
  if (hasRequiredBool) return bool;
  hasRequiredBool = 1;
  var Scalar2 = requireScalar();
  function boolStringify({ value, source }, ctx) {
    const boolObj = value ? trueTag : falseTag;
    if (source && boolObj.test.test(source))
      return source;
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
  const trueTag = {
    identify: (value) => value === true,
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new Scalar2.Scalar(true),
    stringify: boolStringify
  };
  const falseTag = {
    identify: (value) => value === false,
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new Scalar2.Scalar(false),
    stringify: boolStringify
  };
  bool.falseTag = falseTag;
  bool.trueTag = trueTag;
  return bool;
}
var float = {};
var hasRequiredFloat;
function requireFloat() {
  if (hasRequiredFloat) return float;
  hasRequiredFloat = 1;
  var Scalar2 = requireScalar();
  var stringifyNumber2 = requireStringifyNumber();
  const floatNaN = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber2.stringifyNumber
  };
  const floatExp = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "EXP",
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str.replace(/_/g, "")),
    stringify(node) {
      const num = Number(node.value);
      return isFinite(num) ? num.toExponential() : stringifyNumber2.stringifyNumber(node);
    }
  };
  const float$12 = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(str) {
      const node = new Scalar2.Scalar(parseFloat(str.replace(/_/g, "")));
      const dot = str.indexOf(".");
      if (dot !== -1) {
        const f = str.substring(dot + 1).replace(/_/g, "");
        if (f[f.length - 1] === "0")
          node.minFractionDigits = f.length;
      }
      return node;
    },
    stringify: stringifyNumber2.stringifyNumber
  };
  float.float = float$12;
  float.floatExp = floatExp;
  float.floatNaN = floatNaN;
  return float;
}
var int = {};
var hasRequiredInt;
function requireInt() {
  if (hasRequiredInt) return int;
  hasRequiredInt = 1;
  var stringifyNumber2 = requireStringifyNumber();
  const intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
  function intResolve(str, offset, radix, { intAsBigInt }) {
    const sign = str[0];
    if (sign === "-" || sign === "+")
      offset += 1;
    str = str.substring(offset).replace(/_/g, "");
    if (intAsBigInt) {
      switch (radix) {
        case 2:
          str = `0b${str}`;
          break;
        case 8:
          str = `0o${str}`;
          break;
        case 16:
          str = `0x${str}`;
          break;
      }
      const n2 = BigInt(str);
      return sign === "-" ? BigInt(-1) * n2 : n2;
    }
    const n = parseInt(str, radix);
    return sign === "-" ? -1 * n : n;
  }
  function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value)) {
      const str = value.toString(radix);
      return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
    }
    return stringifyNumber2.stringifyNumber(node);
  }
  const intBin = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "BIN",
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
    stringify: (node) => intStringify(node, 2, "0b")
  };
  const intOct = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "OCT",
    test: /^[-+]?0[0-7_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
    stringify: (node) => intStringify(node, 8, "0")
  };
  const int$12 = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber2.stringifyNumber
  };
  const intHex = {
    identify: intIdentify,
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "HEX",
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: (node) => intStringify(node, 16, "0x")
  };
  int.int = int$12;
  int.intBin = intBin;
  int.intHex = intHex;
  int.intOct = intOct;
  return int;
}
var set = {};
var hasRequiredSet;
function requireSet() {
  if (hasRequiredSet) return set;
  hasRequiredSet = 1;
  var identity2 = requireIdentity();
  var Pair2 = requirePair();
  var YAMLMap2 = requireYAMLMap();
  class YAMLSet extends YAMLMap2.YAMLMap {
    constructor(schema2) {
      super(schema2);
      this.tag = YAMLSet.tag;
    }
    add(key) {
      let pair;
      if (identity2.isPair(key))
        pair = key;
      else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
        pair = new Pair2.Pair(key.key, null);
      else
        pair = new Pair2.Pair(key, null);
      const prev = YAMLMap2.findPair(this.items, pair.key);
      if (!prev)
        this.items.push(pair);
    }
    /**
     * If `keepPair` is `true`, returns the Pair matching `key`.
     * Otherwise, returns the value of that Pair's key.
     */
    get(key, keepPair) {
      const pair = YAMLMap2.findPair(this.items, key);
      return !keepPair && identity2.isPair(pair) ? identity2.isScalar(pair.key) ? pair.key.value : pair.key : pair;
    }
    set(key, value) {
      if (typeof value !== "boolean")
        throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
      const prev = YAMLMap2.findPair(this.items, key);
      if (prev && !value) {
        this.items.splice(this.items.indexOf(prev), 1);
      } else if (!prev && value) {
        this.items.push(new Pair2.Pair(key));
      }
    }
    toJSON(_, ctx) {
      return super.toJSON(_, ctx, Set);
    }
    toString(ctx, onComment, onChompKeep) {
      if (!ctx)
        return JSON.stringify(this);
      if (this.hasAllNullValues(true))
        return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
      else
        throw new Error("Set items must all have null values");
    }
    static from(schema2, iterable, ctx) {
      const { replacer } = ctx;
      const set2 = new this(schema2);
      if (iterable && Symbol.iterator in Object(iterable))
        for (let value of iterable) {
          if (typeof replacer === "function")
            value = replacer.call(iterable, value, value);
          set2.items.push(Pair2.createPair(value, null, ctx));
        }
      return set2;
    }
  }
  YAMLSet.tag = "tag:yaml.org,2002:set";
  const set$1 = {
    collection: "map",
    identify: (value) => value instanceof Set,
    nodeClass: YAMLSet,
    default: false,
    tag: "tag:yaml.org,2002:set",
    createNode: (schema2, iterable, ctx) => YAMLSet.from(schema2, iterable, ctx),
    resolve(map2, onError) {
      if (identity2.isMap(map2)) {
        if (map2.hasAllNullValues(true))
          return Object.assign(new YAMLSet(), map2);
        else
          onError("Set items must all have null values");
      } else
        onError("Expected a mapping for this tag");
      return map2;
    }
  };
  set.YAMLSet = YAMLSet;
  set.set = set$1;
  return set;
}
var timestamp = {};
var hasRequiredTimestamp;
function requireTimestamp() {
  if (hasRequiredTimestamp) return timestamp;
  hasRequiredTimestamp = 1;
  var stringifyNumber2 = requireStringifyNumber();
  function parseSexagesimal(str, asBigInt) {
    const sign = str[0];
    const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
    const num = (n) => asBigInt ? BigInt(n) : Number(n);
    const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
    return sign === "-" ? num(-1) * res : res;
  }
  function stringifySexagesimal(node) {
    let { value } = node;
    let num = (n) => n;
    if (typeof value === "bigint")
      num = (n) => BigInt(n);
    else if (isNaN(value) || !isFinite(value))
      return stringifyNumber2.stringifyNumber(node);
    let sign = "";
    if (value < 0) {
      sign = "-";
      value *= num(-1);
    }
    const _60 = num(60);
    const parts = [value % _60];
    if (value < 60) {
      parts.unshift(0);
    } else {
      value = (value - parts[0]) / _60;
      parts.unshift(value % _60);
      if (value >= 60) {
        value = (value - parts[0]) / _60;
        parts.unshift(value);
      }
    }
    return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
  }
  const intTime = {
    identify: (value) => typeof value === "bigint" || Number.isInteger(value),
    default: true,
    tag: "tag:yaml.org,2002:int",
    format: "TIME",
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
    stringify: stringifySexagesimal
  };
  const floatTime = {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    format: "TIME",
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: (str) => parseSexagesimal(str, false),
    stringify: stringifySexagesimal
  };
  const timestamp$1 = {
    identify: (value) => value instanceof Date,
    default: true,
    tag: "tag:yaml.org,2002:timestamp",
    // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
    // may be omitted altogether, resulting in a date format. In such a case, the time part is
    // assumed to be 00:00:00Z (start of day, UTC).
    test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
    resolve(str) {
      const match = str.match(timestamp$1.test);
      if (!match)
        throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
      const [, year, month, day, hour, minute, second] = match.map(Number);
      const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
      let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
      const tz = match[8];
      if (tz && tz !== "Z") {
        let d = parseSexagesimal(tz, false);
        if (Math.abs(d) < 30)
          d *= 60;
        date -= 6e4 * d;
      }
      return new Date(date);
    },
    stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
  };
  timestamp.floatTime = floatTime;
  timestamp.intTime = intTime;
  timestamp.timestamp = timestamp$1;
  return timestamp;
}
var hasRequiredSchema$1;
function requireSchema$1() {
  if (hasRequiredSchema$1) return schema;
  hasRequiredSchema$1 = 1;
  var map2 = requireMap();
  var _null2 = require_null();
  var seq2 = requireSeq();
  var string2 = requireString();
  var binary2 = requireBinary();
  var bool2 = requireBool();
  var float2 = requireFloat();
  var int2 = requireInt();
  var merge2 = requireMerge();
  var omap2 = requireOmap();
  var pairs2 = requirePairs();
  var set2 = requireSet();
  var timestamp2 = requireTimestamp();
  const schema$12 = [
    map2.map,
    seq2.seq,
    string2.string,
    _null2.nullTag,
    bool2.trueTag,
    bool2.falseTag,
    int2.intBin,
    int2.intOct,
    int2.int,
    int2.intHex,
    float2.floatNaN,
    float2.floatExp,
    float2.float,
    binary2.binary,
    merge2.merge,
    omap2.omap,
    pairs2.pairs,
    set2.set,
    timestamp2.intTime,
    timestamp2.floatTime,
    timestamp2.timestamp
  ];
  schema.schema = schema$12;
  return schema;
}
var hasRequiredTags;
function requireTags() {
  if (hasRequiredTags) return tags;
  hasRequiredTags = 1;
  var map2 = requireMap();
  var _null2 = require_null();
  var seq2 = requireSeq();
  var string2 = requireString();
  var bool2 = requireBool$1();
  var float2 = requireFloat$1();
  var int2 = requireInt$1();
  var schema2 = requireSchema$3();
  var schema$12 = requireSchema$2();
  var binary2 = requireBinary();
  var merge2 = requireMerge();
  var omap2 = requireOmap();
  var pairs2 = requirePairs();
  var schema$22 = requireSchema$1();
  var set2 = requireSet();
  var timestamp2 = requireTimestamp();
  const schemas = /* @__PURE__ */ new Map([
    ["core", schema2.schema],
    ["failsafe", [map2.map, seq2.seq, string2.string]],
    ["json", schema$12.schema],
    ["yaml11", schema$22.schema],
    ["yaml-1.1", schema$22.schema]
  ]);
  const tagsByName = {
    binary: binary2.binary,
    bool: bool2.boolTag,
    float: float2.float,
    floatExp: float2.floatExp,
    floatNaN: float2.floatNaN,
    floatTime: timestamp2.floatTime,
    int: int2.int,
    intHex: int2.intHex,
    intOct: int2.intOct,
    intTime: timestamp2.intTime,
    map: map2.map,
    merge: merge2.merge,
    null: _null2.nullTag,
    omap: omap2.omap,
    pairs: pairs2.pairs,
    seq: seq2.seq,
    set: set2.set,
    timestamp: timestamp2.timestamp
  };
  const coreKnownTags = {
    "tag:yaml.org,2002:binary": binary2.binary,
    "tag:yaml.org,2002:merge": merge2.merge,
    "tag:yaml.org,2002:omap": omap2.omap,
    "tag:yaml.org,2002:pairs": pairs2.pairs,
    "tag:yaml.org,2002:set": set2.set,
    "tag:yaml.org,2002:timestamp": timestamp2.timestamp
  };
  function getTags(customTags, schemaName, addMergeTag) {
    const schemaTags = schemas.get(schemaName);
    if (schemaTags && !customTags) {
      return addMergeTag && !schemaTags.includes(merge2.merge) ? schemaTags.concat(merge2.merge) : schemaTags.slice();
    }
    let tags2 = schemaTags;
    if (!tags2) {
      if (Array.isArray(customTags))
        tags2 = [];
      else {
        const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
      }
    }
    if (Array.isArray(customTags)) {
      for (const tag of customTags)
        tags2 = tags2.concat(tag);
    } else if (typeof customTags === "function") {
      tags2 = customTags(tags2.slice());
    }
    if (addMergeTag)
      tags2 = tags2.concat(merge2.merge);
    return tags2.reduce((tags3, tag) => {
      const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
      if (!tagObj) {
        const tagName = JSON.stringify(tag);
        const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
      }
      if (!tags3.includes(tagObj))
        tags3.push(tagObj);
      return tags3;
    }, []);
  }
  tags.coreKnownTags = coreKnownTags;
  tags.getTags = getTags;
  return tags;
}
var hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return Schema;
  hasRequiredSchema = 1;
  var identity2 = requireIdentity();
  var map2 = requireMap();
  var seq2 = requireSeq();
  var string2 = requireString();
  var tags2 = requireTags();
  const sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
  let Schema$1 = class Schema2 {
    constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema2, sortMapEntries, toStringDefaults }) {
      this.compat = Array.isArray(compat) ? tags2.getTags(compat, "compat") : compat ? tags2.getTags(null, compat) : null;
      this.name = typeof schema2 === "string" && schema2 || "core";
      this.knownTags = resolveKnownTags ? tags2.coreKnownTags : {};
      this.tags = tags2.getTags(customTags, this.name, merge2);
      this.toStringOptions = toStringDefaults ?? null;
      Object.defineProperty(this, identity2.MAP, { value: map2.map });
      Object.defineProperty(this, identity2.SCALAR, { value: string2.string });
      Object.defineProperty(this, identity2.SEQ, { value: seq2.seq });
      this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
    }
    clone() {
      const copy = Object.create(Schema2.prototype, Object.getOwnPropertyDescriptors(this));
      copy.tags = this.tags.slice();
      return copy;
    }
  };
  Schema.Schema = Schema$1;
  return Schema;
}
var stringifyDocument = {};
var hasRequiredStringifyDocument;
function requireStringifyDocument() {
  if (hasRequiredStringifyDocument) return stringifyDocument;
  hasRequiredStringifyDocument = 1;
  var identity2 = requireIdentity();
  var stringify2 = requireStringify();
  var stringifyComment2 = requireStringifyComment();
  function stringifyDocument$1(doc, options) {
    const lines = [];
    let hasDirectives = options.directives === true;
    if (options.directives !== false && doc.directives) {
      const dir = doc.directives.toString(doc);
      if (dir) {
        lines.push(dir);
        hasDirectives = true;
      } else if (doc.directives.docStart)
        hasDirectives = true;
    }
    if (hasDirectives)
      lines.push("---");
    const ctx = stringify2.createStringifyContext(doc, options);
    const { commentString } = ctx.options;
    if (doc.commentBefore) {
      if (lines.length !== 1)
        lines.unshift("");
      const cs = commentString(doc.commentBefore);
      lines.unshift(stringifyComment2.indentComment(cs, ""));
    }
    let chompKeep = false;
    let contentComment = null;
    if (doc.contents) {
      if (identity2.isNode(doc.contents)) {
        if (doc.contents.spaceBefore && hasDirectives)
          lines.push("");
        if (doc.contents.commentBefore) {
          const cs = commentString(doc.contents.commentBefore);
          lines.push(stringifyComment2.indentComment(cs, ""));
        }
        ctx.forceBlockIndent = !!doc.comment;
        contentComment = doc.contents.comment;
      }
      const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
      let body = stringify2.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
      if (contentComment)
        body += stringifyComment2.lineComment(body, "", commentString(contentComment));
      if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
        lines[lines.length - 1] = `--- ${body}`;
      } else
        lines.push(body);
    } else {
      lines.push(stringify2.stringify(doc.contents, ctx));
    }
    if (doc.directives?.docEnd) {
      if (doc.comment) {
        const cs = commentString(doc.comment);
        if (cs.includes("\n")) {
          lines.push("...");
          lines.push(stringifyComment2.indentComment(cs, ""));
        } else {
          lines.push(`... ${cs}`);
        }
      } else {
        lines.push("...");
      }
    } else {
      let dc = doc.comment;
      if (dc && chompKeep)
        dc = dc.replace(/^\n+/, "");
      if (dc) {
        if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
          lines.push("");
        lines.push(stringifyComment2.indentComment(commentString(dc), ""));
      }
    }
    return lines.join("\n") + "\n";
  }
  stringifyDocument.stringifyDocument = stringifyDocument$1;
  return stringifyDocument;
}
var hasRequiredDocument;
function requireDocument() {
  if (hasRequiredDocument) return Document;
  hasRequiredDocument = 1;
  var Alias2 = requireAlias();
  var Collection2 = requireCollection();
  var identity2 = requireIdentity();
  var Pair2 = requirePair();
  var toJS2 = requireToJS();
  var Schema2 = requireSchema();
  var stringifyDocument2 = requireStringifyDocument();
  var anchors2 = requireAnchors();
  var applyReviver2 = requireApplyReviver();
  var createNode2 = requireCreateNode();
  var directives2 = requireDirectives();
  let Document$1 = class Document2 {
    constructor(value, replacer, options) {
      this.commentBefore = null;
      this.comment = null;
      this.errors = [];
      this.warnings = [];
      Object.defineProperty(this, identity2.NODE_TYPE, { value: identity2.DOC });
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
        replacer = void 0;
      }
      const opt = Object.assign({
        intAsBigInt: false,
        keepSourceTokens: false,
        logLevel: "warn",
        prettyErrors: true,
        strict: true,
        stringKeys: false,
        uniqueKeys: true,
        version: "1.2"
      }, options);
      this.options = opt;
      let { version } = opt;
      if (options?._directives) {
        this.directives = options._directives.atDocument();
        if (this.directives.yaml.explicit)
          version = this.directives.yaml.version;
      } else
        this.directives = new directives2.Directives({ version });
      this.setSchema(version, options);
      this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
    }
    /**
     * Create a deep copy of this Document and its contents.
     *
     * Custom Node values that inherit from `Object` still refer to their original instances.
     */
    clone() {
      const copy = Object.create(Document2.prototype, {
        [identity2.NODE_TYPE]: { value: identity2.DOC }
      });
      copy.commentBefore = this.commentBefore;
      copy.comment = this.comment;
      copy.errors = this.errors.slice();
      copy.warnings = this.warnings.slice();
      copy.options = Object.assign({}, this.options);
      if (this.directives)
        copy.directives = this.directives.clone();
      copy.schema = this.schema.clone();
      copy.contents = identity2.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
      if (this.range)
        copy.range = this.range.slice();
      return copy;
    }
    /** Adds a value to the document. */
    add(value) {
      if (assertCollection(this.contents))
        this.contents.add(value);
    }
    /** Adds a value to the document. */
    addIn(path2, value) {
      if (assertCollection(this.contents))
        this.contents.addIn(path2, value);
    }
    /**
     * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
     *
     * If `node` already has an anchor, `name` is ignored.
     * Otherwise, the `node.anchor` value will be set to `name`,
     * or if an anchor with that name is already present in the document,
     * `name` will be used as a prefix for a new unique anchor.
     * If `name` is undefined, the generated anchor will use 'a' as a prefix.
     */
    createAlias(node, name) {
      if (!node.anchor) {
        const prev = anchors2.anchorNames(this);
        node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        !name || prev.has(name) ? anchors2.findNewAnchor(name || "a", prev) : name;
      }
      return new Alias2.Alias(node.anchor);
    }
    createNode(value, replacer, options) {
      let _replacer = void 0;
      if (typeof replacer === "function") {
        value = replacer.call({ "": value }, "", value);
        _replacer = replacer;
      } else if (Array.isArray(replacer)) {
        const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
        const asStr = replacer.filter(keyToStr).map(String);
        if (asStr.length > 0)
          replacer = replacer.concat(asStr);
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
        replacer = void 0;
      }
      const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
      const { onAnchor, setAnchors, sourceObjects } = anchors2.createNodeAnchors(
        this,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        anchorPrefix || "a"
      );
      const ctx = {
        aliasDuplicateObjects: aliasDuplicateObjects ?? true,
        keepUndefined: keepUndefined ?? false,
        onAnchor,
        onTagObj,
        replacer: _replacer,
        schema: this.schema,
        sourceObjects
      };
      const node = createNode2.createNode(value, tag, ctx);
      if (flow && identity2.isCollection(node))
        node.flow = true;
      setAnchors();
      return node;
    }
    /**
     * Convert a key and a value into a `Pair` using the current schema,
     * recursively wrapping all values as `Scalar` or `Collection` nodes.
     */
    createPair(key, value, options = {}) {
      const k = this.createNode(key, null, options);
      const v = this.createNode(value, null, options);
      return new Pair2.Pair(k, v);
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
      return assertCollection(this.contents) ? this.contents.delete(key) : false;
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path2) {
      if (Collection2.isEmptyPath(path2)) {
        if (this.contents == null)
          return false;
        this.contents = null;
        return true;
      }
      return assertCollection(this.contents) ? this.contents.deleteIn(path2) : false;
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    get(key, keepScalar) {
      return identity2.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
    }
    /**
     * Returns item at `path`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path2, keepScalar) {
      if (Collection2.isEmptyPath(path2))
        return !keepScalar && identity2.isScalar(this.contents) ? this.contents.value : this.contents;
      return identity2.isCollection(this.contents) ? this.contents.getIn(path2, keepScalar) : void 0;
    }
    /**
     * Checks if the document includes a value with the key `key`.
     */
    has(key) {
      return identity2.isCollection(this.contents) ? this.contents.has(key) : false;
    }
    /**
     * Checks if the document includes a value at `path`.
     */
    hasIn(path2) {
      if (Collection2.isEmptyPath(path2))
        return this.contents !== void 0;
      return identity2.isCollection(this.contents) ? this.contents.hasIn(path2) : false;
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    set(key, value) {
      if (this.contents == null) {
        this.contents = Collection2.collectionFromPath(this.schema, [key], value);
      } else if (assertCollection(this.contents)) {
        this.contents.set(key, value);
      }
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path2, value) {
      if (Collection2.isEmptyPath(path2)) {
        this.contents = value;
      } else if (this.contents == null) {
        this.contents = Collection2.collectionFromPath(this.schema, Array.from(path2), value);
      } else if (assertCollection(this.contents)) {
        this.contents.setIn(path2, value);
      }
    }
    /**
     * Change the YAML version and schema used by the document.
     * A `null` version disables support for directives, explicit tags, anchors, and aliases.
     * It also requires the `schema` option to be given as a `Schema` instance value.
     *
     * Overrides all previously set schema options.
     */
    setSchema(version, options = {}) {
      if (typeof version === "number")
        version = String(version);
      let opt;
      switch (version) {
        case "1.1":
          if (this.directives)
            this.directives.yaml.version = "1.1";
          else
            this.directives = new directives2.Directives({ version: "1.1" });
          opt = { resolveKnownTags: false, schema: "yaml-1.1" };
          break;
        case "1.2":
        case "next":
          if (this.directives)
            this.directives.yaml.version = version;
          else
            this.directives = new directives2.Directives({ version });
          opt = { resolveKnownTags: true, schema: "core" };
          break;
        case null:
          if (this.directives)
            delete this.directives;
          opt = null;
          break;
        default: {
          const sv = JSON.stringify(version);
          throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
        }
      }
      if (options.schema instanceof Object)
        this.schema = options.schema;
      else if (opt)
        this.schema = new Schema2.Schema(Object.assign(opt, options));
      else
        throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
    }
    // json & jsonArg are only used from toJSON()
    toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
      const ctx = {
        anchors: /* @__PURE__ */ new Map(),
        doc: this,
        keep: !json,
        mapAsMap: mapAsMap === true,
        mapKeyWarned: false,
        maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
      };
      const res = toJS2.toJS(this.contents, jsonArg ?? "", ctx);
      if (typeof onAnchor === "function")
        for (const { count: count2, res: res2 } of ctx.anchors.values())
          onAnchor(res2, count2);
      return typeof reviver === "function" ? applyReviver2.applyReviver(reviver, { "": res }, "", res) : res;
    }
    /**
     * A JSON representation of the document `contents`.
     *
     * @param jsonArg Used by `JSON.stringify` to indicate the array index or
     *   property name.
     */
    toJSON(jsonArg, onAnchor) {
      return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
    }
    /** A YAML representation of the document. */
    toString(options = {}) {
      if (this.errors.length > 0)
        throw new Error("Document with errors cannot be stringified");
      if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
        const s = JSON.stringify(options.indent);
        throw new Error(`"indent" option must be a positive integer, not ${s}`);
      }
      return stringifyDocument2.stringifyDocument(this, options);
    }
  };
  function assertCollection(contents) {
    if (identity2.isCollection(contents))
      return true;
    throw new Error("Expected a YAML collection as document contents");
  }
  Document.Document = Document$1;
  return Document;
}
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  class YAMLError extends Error {
    constructor(name, pos, code, message) {
      super();
      this.name = name;
      this.code = code;
      this.message = message;
      this.pos = pos;
    }
  }
  class YAMLParseError extends YAMLError {
    constructor(pos, code, message) {
      super("YAMLParseError", pos, code, message);
    }
  }
  class YAMLWarning extends YAMLError {
    constructor(pos, code, message) {
      super("YAMLWarning", pos, code, message);
    }
  }
  const prettifyError = (src, lc) => (error) => {
    if (error.pos[0] === -1)
      return;
    error.linePos = error.pos.map((pos) => lc.linePos(pos));
    const { line: line2, col } = error.linePos[0];
    error.message += ` at line ${line2}, column ${col}`;
    let ci = col - 1;
    let lineStr = src.substring(lc.lineStarts[line2 - 1], lc.lineStarts[line2]).replace(/[\n\r]+$/, "");
    if (ci >= 60 && lineStr.length > 80) {
      const trimStart = Math.min(ci - 39, lineStr.length - 79);
      lineStr = "…" + lineStr.substring(trimStart);
      ci -= trimStart - 1;
    }
    if (lineStr.length > 80)
      lineStr = lineStr.substring(0, 79) + "…";
    if (line2 > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
      let prev = src.substring(lc.lineStarts[line2 - 2], lc.lineStarts[line2 - 1]);
      if (prev.length > 80)
        prev = prev.substring(0, 79) + "…\n";
      lineStr = prev + lineStr;
    }
    if (/[^ ]/.test(lineStr)) {
      let count2 = 1;
      const end = error.linePos[1];
      if (end?.line === line2 && end.col > col) {
        count2 = Math.max(1, Math.min(end.col - col, 80 - ci));
      }
      const pointer = " ".repeat(ci) + "^".repeat(count2);
      error.message += `:

${lineStr}
${pointer}
`;
    }
  };
  errors.YAMLError = YAMLError;
  errors.YAMLParseError = YAMLParseError;
  errors.YAMLWarning = YAMLWarning;
  errors.prettifyError = prettifyError;
  return errors;
}
var composeDoc = {};
var composeNode = {};
var composeCollection = {};
var resolveBlockMap = {};
var resolveProps = {};
var hasRequiredResolveProps;
function requireResolveProps() {
  if (hasRequiredResolveProps) return resolveProps;
  hasRequiredResolveProps = 1;
  function resolveProps$1(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
    let spaceBefore = false;
    let atNewline = startOnNewline;
    let hasSpace = startOnNewline;
    let comment = "";
    let commentSep = "";
    let hasNewline = false;
    let reqSpace = false;
    let tab = null;
    let anchor = null;
    let tag = null;
    let newlineAfterProp = null;
    let comma = null;
    let found = null;
    let start = null;
    for (const token of tokens) {
      if (reqSpace) {
        if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
          onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
        reqSpace = false;
      }
      if (tab) {
        if (atNewline && token.type !== "comment" && token.type !== "newline") {
          onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
        }
        tab = null;
      }
      switch (token.type) {
        case "space":
          if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
            tab = token;
          }
          hasSpace = true;
          break;
        case "comment": {
          if (!hasSpace)
            onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const cb = token.source.substring(1) || " ";
          if (!comment)
            comment = cb;
          else
            comment += commentSep + cb;
          commentSep = "";
          atNewline = false;
          break;
        }
        case "newline":
          if (atNewline) {
            if (comment)
              comment += token.source;
            else if (!found || indicator !== "seq-item-ind")
              spaceBefore = true;
          } else
            commentSep += token.source;
          atNewline = true;
          hasNewline = true;
          if (anchor || tag)
            newlineAfterProp = token;
          hasSpace = true;
          break;
        case "anchor":
          if (anchor)
            onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
          if (token.source.endsWith(":"))
            onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
          anchor = token;
          start ?? (start = token.offset);
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        case "tag": {
          if (tag)
            onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
          tag = token;
          start ?? (start = token.offset);
          atNewline = false;
          hasSpace = false;
          reqSpace = true;
          break;
        }
        case indicator:
          if (anchor || tag)
            onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
          if (found)
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
          found = token;
          atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
          hasSpace = false;
          break;
        case "comma":
          if (flow) {
            if (comma)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
            comma = token;
            atNewline = false;
            hasSpace = false;
            break;
          }
        // else fallthrough
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
          atNewline = false;
          hasSpace = false;
      }
    }
    const last = tokens[tokens.length - 1];
    const end = last ? last.offset + last.source.length : offset;
    if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
      onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
    }
    if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
      onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
    return {
      comma,
      found,
      spaceBefore,
      comment,
      hasNewline,
      anchor,
      tag,
      newlineAfterProp,
      end,
      start: start ?? end
    };
  }
  resolveProps.resolveProps = resolveProps$1;
  return resolveProps;
}
var utilContainsNewline = {};
var hasRequiredUtilContainsNewline;
function requireUtilContainsNewline() {
  if (hasRequiredUtilContainsNewline) return utilContainsNewline;
  hasRequiredUtilContainsNewline = 1;
  function containsNewline(key) {
    if (!key)
      return null;
    switch (key.type) {
      case "alias":
      case "scalar":
      case "double-quoted-scalar":
      case "single-quoted-scalar":
        if (key.source.includes("\n"))
          return true;
        if (key.end) {
          for (const st of key.end)
            if (st.type === "newline")
              return true;
        }
        return false;
      case "flow-collection":
        for (const it of key.items) {
          for (const st of it.start)
            if (st.type === "newline")
              return true;
          if (it.sep) {
            for (const st of it.sep)
              if (st.type === "newline")
                return true;
          }
          if (containsNewline(it.key) || containsNewline(it.value))
            return true;
        }
        return false;
      default:
        return true;
    }
  }
  utilContainsNewline.containsNewline = containsNewline;
  return utilContainsNewline;
}
var utilFlowIndentCheck = {};
var hasRequiredUtilFlowIndentCheck;
function requireUtilFlowIndentCheck() {
  if (hasRequiredUtilFlowIndentCheck) return utilFlowIndentCheck;
  hasRequiredUtilFlowIndentCheck = 1;
  var utilContainsNewline2 = requireUtilContainsNewline();
  function flowIndentCheck(indent, fc, onError) {
    if (fc?.type === "flow-collection") {
      const end = fc.end[0];
      if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline2.containsNewline(fc)) {
        const msg = "Flow end indicator should be more indented than parent";
        onError(end, "BAD_INDENT", msg, true);
      }
    }
  }
  utilFlowIndentCheck.flowIndentCheck = flowIndentCheck;
  return utilFlowIndentCheck;
}
var utilMapIncludes = {};
var hasRequiredUtilMapIncludes;
function requireUtilMapIncludes() {
  if (hasRequiredUtilMapIncludes) return utilMapIncludes;
  hasRequiredUtilMapIncludes = 1;
  var identity2 = requireIdentity();
  function mapIncludes(ctx, items, search) {
    const { uniqueKeys } = ctx.options;
    if (uniqueKeys === false)
      return false;
    const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity2.isScalar(a) && identity2.isScalar(b) && a.value === b.value;
    return items.some((pair) => isEqual(pair.key, search));
  }
  utilMapIncludes.mapIncludes = mapIncludes;
  return utilMapIncludes;
}
var hasRequiredResolveBlockMap;
function requireResolveBlockMap() {
  if (hasRequiredResolveBlockMap) return resolveBlockMap;
  hasRequiredResolveBlockMap = 1;
  var Pair2 = requirePair();
  var YAMLMap2 = requireYAMLMap();
  var resolveProps2 = requireResolveProps();
  var utilContainsNewline2 = requireUtilContainsNewline();
  var utilFlowIndentCheck2 = requireUtilFlowIndentCheck();
  var utilMapIncludes2 = requireUtilMapIncludes();
  const startColMsg = "All mapping items must start at the same column";
  function resolveBlockMap$1({ composeNode: composeNode2, composeEmptyNode }, ctx, bm, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLMap2.YAMLMap;
    const map2 = new NodeClass(ctx.schema);
    if (ctx.atRoot)
      ctx.atRoot = false;
    let offset = bm.offset;
    let commentEnd = null;
    for (const collItem of bm.items) {
      const { start, key, sep, value } = collItem;
      const keyProps = resolveProps2.resolveProps(start, {
        indicator: "explicit-key-ind",
        next: key ?? sep?.[0],
        offset,
        onError,
        parentIndent: bm.indent,
        startOnNewline: true
      });
      const implicitKey = !keyProps.found;
      if (implicitKey) {
        if (key) {
          if (key.type === "block-seq")
            onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
          else if ("indent" in key && key.indent !== bm.indent)
            onError(offset, "BAD_INDENT", startColMsg);
        }
        if (!keyProps.anchor && !keyProps.tag && !sep) {
          commentEnd = keyProps.end;
          if (keyProps.comment) {
            if (map2.comment)
              map2.comment += "\n" + keyProps.comment;
            else
              map2.comment = keyProps.comment;
          }
          continue;
        }
        if (keyProps.newlineAfterProp || utilContainsNewline2.containsNewline(key)) {
          onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
        }
      } else if (keyProps.found?.indent !== bm.indent) {
        onError(offset, "BAD_INDENT", startColMsg);
      }
      ctx.atKey = true;
      const keyStart = keyProps.end;
      const keyNode = key ? composeNode2(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
      if (ctx.schema.compat)
        utilFlowIndentCheck2.flowIndentCheck(bm.indent, key, onError);
      ctx.atKey = false;
      if (utilMapIncludes2.mapIncludes(ctx, map2.items, keyNode))
        onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
      const valueProps = resolveProps2.resolveProps(sep ?? [], {
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: bm.indent,
        startOnNewline: !key || key.type === "block-scalar"
      });
      offset = valueProps.end;
      if (valueProps.found) {
        if (implicitKey) {
          if (value?.type === "block-map" && !valueProps.hasNewline)
            onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
          if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
            onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
        }
        const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck2.flowIndentCheck(bm.indent, value, onError);
        offset = valueNode.range[2];
        const pair = new Pair2.Pair(keyNode, valueNode);
        if (ctx.options.keepSourceTokens)
          pair.srcToken = collItem;
        map2.items.push(pair);
      } else {
        if (implicitKey)
          onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
        if (valueProps.comment) {
          if (keyNode.comment)
            keyNode.comment += "\n" + valueProps.comment;
          else
            keyNode.comment = valueProps.comment;
        }
        const pair = new Pair2.Pair(keyNode);
        if (ctx.options.keepSourceTokens)
          pair.srcToken = collItem;
        map2.items.push(pair);
      }
    }
    if (commentEnd && commentEnd < offset)
      onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
    map2.range = [bm.offset, offset, commentEnd ?? offset];
    return map2;
  }
  resolveBlockMap.resolveBlockMap = resolveBlockMap$1;
  return resolveBlockMap;
}
var resolveBlockSeq = {};
var hasRequiredResolveBlockSeq;
function requireResolveBlockSeq() {
  if (hasRequiredResolveBlockSeq) return resolveBlockSeq;
  hasRequiredResolveBlockSeq = 1;
  var YAMLSeq2 = requireYAMLSeq();
  var resolveProps2 = requireResolveProps();
  var utilFlowIndentCheck2 = requireUtilFlowIndentCheck();
  function resolveBlockSeq$1({ composeNode: composeNode2, composeEmptyNode }, ctx, bs, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLSeq2.YAMLSeq;
    const seq2 = new NodeClass(ctx.schema);
    if (ctx.atRoot)
      ctx.atRoot = false;
    if (ctx.atKey)
      ctx.atKey = false;
    let offset = bs.offset;
    let commentEnd = null;
    for (const { start, value } of bs.items) {
      const props = resolveProps2.resolveProps(start, {
        indicator: "seq-item-ind",
        next: value,
        offset,
        onError,
        parentIndent: bs.indent,
        startOnNewline: true
      });
      if (!props.found) {
        if (props.anchor || props.tag || value) {
          if (value?.type === "block-seq")
            onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
          else
            onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
        } else {
          commentEnd = props.end;
          if (props.comment)
            seq2.comment = props.comment;
          continue;
        }
      }
      const node = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
      if (ctx.schema.compat)
        utilFlowIndentCheck2.flowIndentCheck(bs.indent, value, onError);
      offset = node.range[2];
      seq2.items.push(node);
    }
    seq2.range = [bs.offset, offset, commentEnd ?? offset];
    return seq2;
  }
  resolveBlockSeq.resolveBlockSeq = resolveBlockSeq$1;
  return resolveBlockSeq;
}
var resolveFlowCollection = {};
var resolveEnd = {};
var hasRequiredResolveEnd;
function requireResolveEnd() {
  if (hasRequiredResolveEnd) return resolveEnd;
  hasRequiredResolveEnd = 1;
  function resolveEnd$1(end, offset, reqSpace, onError) {
    let comment = "";
    if (end) {
      let hasSpace = false;
      let sep = "";
      for (const token of end) {
        const { source, type } = token;
        switch (type) {
          case "space":
            hasSpace = true;
            break;
          case "comment": {
            if (reqSpace && !hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += sep + cb;
            sep = "";
            break;
          }
          case "newline":
            if (comment)
              sep += source;
            hasSpace = true;
            break;
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
        }
        offset += source.length;
      }
    }
    return { comment, offset };
  }
  resolveEnd.resolveEnd = resolveEnd$1;
  return resolveEnd;
}
var hasRequiredResolveFlowCollection;
function requireResolveFlowCollection() {
  if (hasRequiredResolveFlowCollection) return resolveFlowCollection;
  hasRequiredResolveFlowCollection = 1;
  var identity2 = requireIdentity();
  var Pair2 = requirePair();
  var YAMLMap2 = requireYAMLMap();
  var YAMLSeq2 = requireYAMLSeq();
  var resolveEnd2 = requireResolveEnd();
  var resolveProps2 = requireResolveProps();
  var utilContainsNewline2 = requireUtilContainsNewline();
  var utilMapIncludes2 = requireUtilMapIncludes();
  const blockMsg = "Block collections are not allowed within flow collections";
  const isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
  function resolveFlowCollection$1({ composeNode: composeNode2, composeEmptyNode }, ctx, fc, onError, tag) {
    const isMap = fc.start.source === "{";
    const fcName = isMap ? "flow map" : "flow sequence";
    const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap2.YAMLMap : YAMLSeq2.YAMLSeq);
    const coll = new NodeClass(ctx.schema);
    coll.flow = true;
    const atRoot = ctx.atRoot;
    if (atRoot)
      ctx.atRoot = false;
    if (ctx.atKey)
      ctx.atKey = false;
    let offset = fc.offset + fc.start.source.length;
    for (let i = 0; i < fc.items.length; ++i) {
      const collItem = fc.items[i];
      const { start, key, sep, value } = collItem;
      const props = resolveProps2.resolveProps(start, {
        flow: fcName,
        indicator: "explicit-key-ind",
        next: key ?? sep?.[0],
        offset,
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (!props.found) {
        if (!props.anchor && !props.tag && !sep && !value) {
          if (i === 0 && props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
          else if (i < fc.items.length - 1)
            onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
          if (props.comment) {
            if (coll.comment)
              coll.comment += "\n" + props.comment;
            else
              coll.comment = props.comment;
          }
          offset = props.end;
          continue;
        }
        if (!isMap && ctx.options.strict && utilContainsNewline2.containsNewline(key))
          onError(
            key,
            // checked by containsNewline()
            "MULTILINE_IMPLICIT_KEY",
            "Implicit keys of flow sequence pairs need to be on a single line"
          );
      }
      if (i === 0) {
        if (props.comma)
          onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
      } else {
        if (!props.comma)
          onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
        if (props.comment) {
          let prevItemComment = "";
          loop: for (const st of start) {
            switch (st.type) {
              case "comma":
              case "space":
                break;
              case "comment":
                prevItemComment = st.source.substring(1);
                break loop;
              default:
                break loop;
            }
          }
          if (prevItemComment) {
            let prev = coll.items[coll.items.length - 1];
            if (identity2.isPair(prev))
              prev = prev.value ?? prev.key;
            if (prev.comment)
              prev.comment += "\n" + prevItemComment;
            else
              prev.comment = prevItemComment;
            props.comment = props.comment.substring(prevItemComment.length + 1);
          }
        }
      }
      if (!isMap && !sep && !props.found) {
        const valueNode = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
        coll.items.push(valueNode);
        offset = valueNode.range[2];
        if (isBlock(value))
          onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else {
        ctx.atKey = true;
        const keyStart = props.end;
        const keyNode = key ? composeNode2(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
        if (isBlock(key))
          onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
        ctx.atKey = false;
        const valueProps = resolveProps2.resolveProps(sep ?? [], {
          flow: fcName,
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (valueProps.found) {
          if (!isMap && !props.found && ctx.options.strict) {
            if (sep)
              for (const st of sep) {
                if (st === valueProps.found)
                  break;
                if (st.type === "newline") {
                  onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                  break;
                }
              }
            if (props.start < valueProps.found.offset - 1024)
              onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
          }
        } else if (value) {
          if ("source" in value && value.source?.[0] === ":")
            onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
          else
            onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
        }
        const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
        if (valueNode) {
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else if (valueProps.comment) {
          if (keyNode.comment)
            keyNode.comment += "\n" + valueProps.comment;
          else
            keyNode.comment = valueProps.comment;
        }
        const pair = new Pair2.Pair(keyNode, valueNode);
        if (ctx.options.keepSourceTokens)
          pair.srcToken = collItem;
        if (isMap) {
          const map2 = coll;
          if (utilMapIncludes2.mapIncludes(ctx, map2.items, keyNode))
            onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
          map2.items.push(pair);
        } else {
          const map2 = new YAMLMap2.YAMLMap(ctx.schema);
          map2.flow = true;
          map2.items.push(pair);
          const endRange = (valueNode ?? keyNode).range;
          map2.range = [keyNode.range[0], endRange[1], endRange[2]];
          coll.items.push(map2);
        }
        offset = valueNode ? valueNode.range[2] : valueProps.end;
      }
    }
    const expectedEnd = isMap ? "}" : "]";
    const [ce, ...ee] = fc.end;
    let cePos = offset;
    if (ce?.source === expectedEnd)
      cePos = ce.offset + ce.source.length;
    else {
      const name = fcName[0].toUpperCase() + fcName.substring(1);
      const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
      onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
      if (ce && ce.source.length !== 1)
        ee.unshift(ce);
    }
    if (ee.length > 0) {
      const end = resolveEnd2.resolveEnd(ee, cePos, ctx.options.strict, onError);
      if (end.comment) {
        if (coll.comment)
          coll.comment += "\n" + end.comment;
        else
          coll.comment = end.comment;
      }
      coll.range = [fc.offset, cePos, end.offset];
    } else {
      coll.range = [fc.offset, cePos, cePos];
    }
    return coll;
  }
  resolveFlowCollection.resolveFlowCollection = resolveFlowCollection$1;
  return resolveFlowCollection;
}
var hasRequiredComposeCollection;
function requireComposeCollection() {
  if (hasRequiredComposeCollection) return composeCollection;
  hasRequiredComposeCollection = 1;
  var identity2 = requireIdentity();
  var Scalar2 = requireScalar();
  var YAMLMap2 = requireYAMLMap();
  var YAMLSeq2 = requireYAMLSeq();
  var resolveBlockMap2 = requireResolveBlockMap();
  var resolveBlockSeq2 = requireResolveBlockSeq();
  var resolveFlowCollection2 = requireResolveFlowCollection();
  function resolveCollection(CN, ctx, token, onError, tagName, tag) {
    const coll = token.type === "block-map" ? resolveBlockMap2.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq2.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection2.resolveFlowCollection(CN, ctx, token, onError, tag);
    const Coll = coll.constructor;
    if (tagName === "!" || tagName === Coll.tagName) {
      coll.tag = Coll.tagName;
      return coll;
    }
    if (tagName)
      coll.tag = tagName;
    return coll;
  }
  function composeCollection$1(CN, ctx, token, props, onError) {
    const tagToken = props.tag;
    const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
    if (token.type === "block-seq") {
      const { anchor, newlineAfterProp: nl } = props;
      const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
      if (lastProp && (!nl || nl.offset < lastProp.offset)) {
        const message = "Missing newline after block sequence props";
        onError(lastProp, "MISSING_CHAR", message);
      }
    }
    const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
    if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap2.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq2.YAMLSeq.tagName && expType === "seq") {
      return resolveCollection(CN, ctx, token, onError, tagName);
    }
    let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
    if (!tag) {
      const kt = ctx.schema.knownTags[tagName];
      if (kt?.collection === expType) {
        ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
        tag = kt;
      } else {
        if (kt) {
          onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
        } else {
          onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
        }
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
    }
    const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
    const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
    const node = identity2.isNode(res) ? res : new Scalar2.Scalar(res);
    node.range = coll.range;
    node.tag = tagName;
    if (tag?.format)
      node.format = tag.format;
    return node;
  }
  composeCollection.composeCollection = composeCollection$1;
  return composeCollection;
}
var composeScalar = {};
var resolveBlockScalar = {};
var hasRequiredResolveBlockScalar;
function requireResolveBlockScalar() {
  if (hasRequiredResolveBlockScalar) return resolveBlockScalar;
  hasRequiredResolveBlockScalar = 1;
  var Scalar2 = requireScalar();
  function resolveBlockScalar$1(ctx, scalar, onError) {
    const start = scalar.offset;
    const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
    if (!header)
      return { value: "", type: null, comment: "", range: [start, start, start] };
    const type = header.mode === ">" ? Scalar2.Scalar.BLOCK_FOLDED : Scalar2.Scalar.BLOCK_LITERAL;
    const lines = scalar.source ? splitLines(scalar.source) : [];
    let chompStart = lines.length;
    for (let i = lines.length - 1; i >= 0; --i) {
      const content = lines[i][1];
      if (content === "" || content === "\r")
        chompStart = i;
      else
        break;
    }
    if (chompStart === 0) {
      const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
      let end2 = start + header.length;
      if (scalar.source)
        end2 += scalar.source.length;
      return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
    }
    let trimIndent = scalar.indent + header.indent;
    let offset = scalar.offset + header.length;
    let contentStart = 0;
    for (let i = 0; i < chompStart; ++i) {
      const [indent, content] = lines[i];
      if (content === "" || content === "\r") {
        if (header.indent === 0 && indent.length > trimIndent)
          trimIndent = indent.length;
      } else {
        if (indent.length < trimIndent) {
          const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
          onError(offset + indent.length, "MISSING_CHAR", message);
        }
        if (header.indent === 0)
          trimIndent = indent.length;
        contentStart = i;
        if (trimIndent === 0 && !ctx.atRoot) {
          const message = "Block scalar values in collections must be indented";
          onError(offset, "BAD_INDENT", message);
        }
        break;
      }
      offset += indent.length + content.length + 1;
    }
    for (let i = lines.length - 1; i >= chompStart; --i) {
      if (lines[i][0].length > trimIndent)
        chompStart = i + 1;
    }
    let value = "";
    let sep = "";
    let prevMoreIndented = false;
    for (let i = 0; i < contentStart; ++i)
      value += lines[i][0].slice(trimIndent) + "\n";
    for (let i = contentStart; i < chompStart; ++i) {
      let [indent, content] = lines[i];
      offset += indent.length + content.length + 1;
      const crlf = content[content.length - 1] === "\r";
      if (crlf)
        content = content.slice(0, -1);
      if (content && indent.length < trimIndent) {
        const src = header.indent ? "explicit indentation indicator" : "first line";
        const message = `Block scalar lines must not be less indented than their ${src}`;
        onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
        indent = "";
      }
      if (type === Scalar2.Scalar.BLOCK_LITERAL) {
        value += sep + indent.slice(trimIndent) + content;
        sep = "\n";
      } else if (indent.length > trimIndent || content[0] === "	") {
        if (sep === " ")
          sep = "\n";
        else if (!prevMoreIndented && sep === "\n")
          sep = "\n\n";
        value += sep + indent.slice(trimIndent) + content;
        sep = "\n";
        prevMoreIndented = true;
      } else if (content === "") {
        if (sep === "\n")
          value += "\n";
        else
          sep = "\n";
      } else {
        value += sep + content;
        sep = " ";
        prevMoreIndented = false;
      }
    }
    switch (header.chomp) {
      case "-":
        break;
      case "+":
        for (let i = chompStart; i < lines.length; ++i)
          value += "\n" + lines[i][0].slice(trimIndent);
        if (value[value.length - 1] !== "\n")
          value += "\n";
        break;
      default:
        value += "\n";
    }
    const end = start + header.length + scalar.source.length;
    return { value, type, comment: header.comment, range: [start, end, end] };
  }
  function parseBlockScalarHeader({ offset, props }, strict, onError) {
    if (props[0].type !== "block-scalar-header") {
      onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
      return null;
    }
    const { source } = props[0];
    const mode = source[0];
    let indent = 0;
    let chomp = "";
    let error = -1;
    for (let i = 1; i < source.length; ++i) {
      const ch = source[i];
      if (!chomp && (ch === "-" || ch === "+"))
        chomp = ch;
      else {
        const n = Number(ch);
        if (!indent && n)
          indent = n;
        else if (error === -1)
          error = offset + i;
      }
    }
    if (error !== -1)
      onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
    let hasSpace = false;
    let comment = "";
    let length = source.length;
    for (let i = 1; i < props.length; ++i) {
      const token = props[i];
      switch (token.type) {
        case "space":
          hasSpace = true;
        // fallthrough
        case "newline":
          length += token.source.length;
          break;
        case "comment":
          if (strict && !hasSpace) {
            const message = "Comments must be separated from other tokens by white space characters";
            onError(token, "MISSING_CHAR", message);
          }
          length += token.source.length;
          comment = token.source.substring(1);
          break;
        case "error":
          onError(token, "UNEXPECTED_TOKEN", token.message);
          length += token.source.length;
          break;
        /* istanbul ignore next should not happen */
        default: {
          const message = `Unexpected token in block scalar header: ${token.type}`;
          onError(token, "UNEXPECTED_TOKEN", message);
          const ts = token.source;
          if (ts && typeof ts === "string")
            length += ts.length;
        }
      }
    }
    return { mode, indent, chomp, comment, length };
  }
  function splitLines(source) {
    const split = source.split(/\n( *)/);
    const first = split[0];
    const m = first.match(/^( *)/);
    const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
    const lines = [line0];
    for (let i = 1; i < split.length; i += 2)
      lines.push([split[i], split[i + 1]]);
    return lines;
  }
  resolveBlockScalar.resolveBlockScalar = resolveBlockScalar$1;
  return resolveBlockScalar;
}
var resolveFlowScalar = {};
var hasRequiredResolveFlowScalar;
function requireResolveFlowScalar() {
  if (hasRequiredResolveFlowScalar) return resolveFlowScalar;
  hasRequiredResolveFlowScalar = 1;
  var Scalar2 = requireScalar();
  var resolveEnd2 = requireResolveEnd();
  function resolveFlowScalar$1(scalar, strict, onError) {
    const { offset, type, source, end } = scalar;
    let _type;
    let value;
    const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
    switch (type) {
      case "scalar":
        _type = Scalar2.Scalar.PLAIN;
        value = plainValue(source, _onError);
        break;
      case "single-quoted-scalar":
        _type = Scalar2.Scalar.QUOTE_SINGLE;
        value = singleQuotedValue(source, _onError);
        break;
      case "double-quoted-scalar":
        _type = Scalar2.Scalar.QUOTE_DOUBLE;
        value = doubleQuotedValue(source, _onError);
        break;
      /* istanbul ignore next should not happen */
      default:
        onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
        return {
          value: "",
          type: null,
          comment: "",
          range: [offset, offset + source.length, offset + source.length]
        };
    }
    const valueEnd = offset + source.length;
    const re = resolveEnd2.resolveEnd(end, valueEnd, strict, onError);
    return {
      value,
      type: _type,
      comment: re.comment,
      range: [offset, valueEnd, re.offset]
    };
  }
  function plainValue(source, onError) {
    let badChar = "";
    switch (source[0]) {
      /* istanbul ignore next should not happen */
      case "	":
        badChar = "a tab character";
        break;
      case ",":
        badChar = "flow indicator character ,";
        break;
      case "%":
        badChar = "directive indicator character %";
        break;
      case "|":
      case ">": {
        badChar = `block scalar indicator ${source[0]}`;
        break;
      }
      case "@":
      case "`": {
        badChar = `reserved character ${source[0]}`;
        break;
      }
    }
    if (badChar)
      onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
    return foldLines(source);
  }
  function singleQuotedValue(source, onError) {
    if (source[source.length - 1] !== "'" || source.length === 1)
      onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
    return foldLines(source.slice(1, -1)).replace(/''/g, "'");
  }
  function foldLines(source) {
    let first, line2;
    try {
      first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
      line2 = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
    } catch {
      first = /(.*?)[ \t]*\r?\n/sy;
      line2 = /[ \t]*(.*?)[ \t]*\r?\n/sy;
    }
    let match = first.exec(source);
    if (!match)
      return source;
    let res = match[1];
    let sep = " ";
    let pos = first.lastIndex;
    line2.lastIndex = pos;
    while (match = line2.exec(source)) {
      if (match[1] === "") {
        if (sep === "\n")
          res += sep;
        else
          sep = "\n";
      } else {
        res += sep + match[1];
        sep = " ";
      }
      pos = line2.lastIndex;
    }
    const last = /[ \t]*(.*)/sy;
    last.lastIndex = pos;
    match = last.exec(source);
    return res + sep + (match?.[1] ?? "");
  }
  function doubleQuotedValue(source, onError) {
    let res = "";
    for (let i = 1; i < source.length - 1; ++i) {
      const ch = source[i];
      if (ch === "\r" && source[i + 1] === "\n")
        continue;
      if (ch === "\n") {
        const { fold, offset } = foldNewline(source, i);
        res += fold;
        i = offset;
      } else if (ch === "\\") {
        let next = source[++i];
        const cc = escapeCodes[next];
        if (cc)
          res += cc;
        else if (next === "\n") {
          next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
        } else if (next === "\r" && source[i + 1] === "\n") {
          next = source[++i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
        } else if (next === "x" || next === "u" || next === "U") {
          const length = next === "x" ? 2 : next === "u" ? 4 : 8;
          res += parseCharCode(source, i + 1, length, onError);
          i += length;
        } else {
          const raw = source.substr(i - 1, 2);
          onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
          res += raw;
        }
      } else if (ch === " " || ch === "	") {
        const wsStart = i;
        let next = source[i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
        if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
          res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
      } else {
        res += ch;
      }
    }
    if (source[source.length - 1] !== '"' || source.length === 1)
      onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
    return res;
  }
  function foldNewline(source, offset) {
    let fold = "";
    let ch = source[offset + 1];
    while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
      if (ch === "\r" && source[offset + 2] !== "\n")
        break;
      if (ch === "\n")
        fold += "\n";
      offset += 1;
      ch = source[offset + 1];
    }
    if (!fold)
      fold = " ";
    return { fold, offset };
  }
  const escapeCodes = {
    "0": "\0",
    // null character
    a: "\x07",
    // bell character
    b: "\b",
    // backspace
    e: "\x1B",
    // escape character
    f: "\f",
    // form feed
    n: "\n",
    // line feed
    r: "\r",
    // carriage return
    t: "	",
    // horizontal tab
    v: "\v",
    // vertical tab
    N: "",
    // Unicode next line
    _: " ",
    // Unicode non-breaking space
    L: "\u2028",
    // Unicode line separator
    P: "\u2029",
    // Unicode paragraph separator
    " ": " ",
    '"': '"',
    "/": "/",
    "\\": "\\",
    "	": "	"
  };
  function parseCharCode(source, offset, length, onError) {
    const cc = source.substr(offset, length);
    const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
    const code = ok ? parseInt(cc, 16) : NaN;
    try {
      return String.fromCodePoint(code);
    } catch {
      const raw = source.substr(offset - 2, length + 2);
      onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
      return raw;
    }
  }
  resolveFlowScalar.resolveFlowScalar = resolveFlowScalar$1;
  return resolveFlowScalar;
}
var hasRequiredComposeScalar;
function requireComposeScalar() {
  if (hasRequiredComposeScalar) return composeScalar;
  hasRequiredComposeScalar = 1;
  var identity2 = requireIdentity();
  var Scalar2 = requireScalar();
  var resolveBlockScalar2 = requireResolveBlockScalar();
  var resolveFlowScalar2 = requireResolveFlowScalar();
  function composeScalar$1(ctx, token, tagToken, onError) {
    const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar2.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar2.resolveFlowScalar(token, ctx.options.strict, onError);
    const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
    let tag;
    if (ctx.options.stringKeys && ctx.atKey) {
      tag = ctx.schema[identity2.SCALAR];
    } else if (tagName)
      tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
    else if (token.type === "scalar")
      tag = findScalarTagByTest(ctx, value, token, onError);
    else
      tag = ctx.schema[identity2.SCALAR];
    let scalar;
    try {
      const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
      scalar = identity2.isScalar(res) ? res : new Scalar2.Scalar(res);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
      scalar = new Scalar2.Scalar(value);
    }
    scalar.range = range;
    scalar.source = value;
    if (type)
      scalar.type = type;
    if (tagName)
      scalar.tag = tagName;
    if (tag.format)
      scalar.format = tag.format;
    if (comment)
      scalar.comment = comment;
    return scalar;
  }
  function findScalarTagByName(schema2, value, tagName, tagToken, onError) {
    if (tagName === "!")
      return schema2[identity2.SCALAR];
    const matchWithTest = [];
    for (const tag of schema2.tags) {
      if (!tag.collection && tag.tag === tagName) {
        if (tag.default && tag.test)
          matchWithTest.push(tag);
        else
          return tag;
      }
    }
    for (const tag of matchWithTest)
      if (tag.test?.test(value))
        return tag;
    const kt = schema2.knownTags[tagName];
    if (kt && !kt.collection) {
      schema2.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
      return kt;
    }
    onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
    return schema2[identity2.SCALAR];
  }
  function findScalarTagByTest({ atKey, directives: directives2, schema: schema2 }, value, token, onError) {
    const tag = schema2.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema2[identity2.SCALAR];
    if (schema2.compat) {
      const compat = schema2.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema2[identity2.SCALAR];
      if (tag.tag !== compat.tag) {
        const ts = directives2.tagString(tag.tag);
        const cs = directives2.tagString(compat.tag);
        const msg = `Value may be parsed as either ${ts} or ${cs}`;
        onError(token, "TAG_RESOLVE_FAILED", msg, true);
      }
    }
    return tag;
  }
  composeScalar.composeScalar = composeScalar$1;
  return composeScalar;
}
var utilEmptyScalarPosition = {};
var hasRequiredUtilEmptyScalarPosition;
function requireUtilEmptyScalarPosition() {
  if (hasRequiredUtilEmptyScalarPosition) return utilEmptyScalarPosition;
  hasRequiredUtilEmptyScalarPosition = 1;
  function emptyScalarPosition(offset, before, pos) {
    if (before) {
      pos ?? (pos = before.length);
      for (let i = pos - 1; i >= 0; --i) {
        let st = before[i];
        switch (st.type) {
          case "space":
          case "comment":
          case "newline":
            offset -= st.source.length;
            continue;
        }
        st = before[++i];
        while (st?.type === "space") {
          offset += st.source.length;
          st = before[++i];
        }
        break;
      }
    }
    return offset;
  }
  utilEmptyScalarPosition.emptyScalarPosition = emptyScalarPosition;
  return utilEmptyScalarPosition;
}
var hasRequiredComposeNode;
function requireComposeNode() {
  if (hasRequiredComposeNode) return composeNode;
  hasRequiredComposeNode = 1;
  var Alias2 = requireAlias();
  var identity2 = requireIdentity();
  var composeCollection2 = requireComposeCollection();
  var composeScalar2 = requireComposeScalar();
  var resolveEnd2 = requireResolveEnd();
  var utilEmptyScalarPosition2 = requireUtilEmptyScalarPosition();
  const CN = { composeNode: composeNode$1, composeEmptyNode };
  function composeNode$1(ctx, token, props, onError) {
    const atKey = ctx.atKey;
    const { spaceBefore, comment, anchor, tag } = props;
    let node;
    let isSrcToken = true;
    switch (token.type) {
      case "alias":
        node = composeAlias(ctx, token, onError);
        if (anchor || tag)
          onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
        break;
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
      case "block-scalar":
        node = composeScalar2.composeScalar(ctx, token, tag, onError);
        if (anchor)
          node.anchor = anchor.source.substring(1);
        break;
      case "block-map":
      case "block-seq":
      case "flow-collection":
        try {
          node = composeCollection2.composeCollection(CN, ctx, token, props, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          onError(token, "RESOURCE_EXHAUSTION", message);
        }
        break;
      default: {
        const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
        onError(token, "UNEXPECTED_TOKEN", message);
        isSrcToken = false;
      }
    }
    node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
    if (anchor && node.anchor === "")
      onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
    if (atKey && ctx.options.stringKeys && (!identity2.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
      const msg = "With stringKeys, all keys must be strings";
      onError(tag ?? token, "NON_STRING_KEY", msg);
    }
    if (spaceBefore)
      node.spaceBefore = true;
    if (comment) {
      if (token.type === "scalar" && token.source === "")
        node.comment = comment;
      else
        node.commentBefore = comment;
    }
    if (ctx.options.keepSourceTokens && isSrcToken)
      node.srcToken = token;
    return node;
  }
  function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
    const token = {
      type: "scalar",
      offset: utilEmptyScalarPosition2.emptyScalarPosition(offset, before, pos),
      indent: -1,
      source: ""
    };
    const node = composeScalar2.composeScalar(ctx, token, tag, onError);
    if (anchor) {
      node.anchor = anchor.source.substring(1);
      if (node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
    }
    if (spaceBefore)
      node.spaceBefore = true;
    if (comment) {
      node.comment = comment;
      node.range[2] = end;
    }
    return node;
  }
  function composeAlias({ options }, { offset, source, end }, onError) {
    const alias = new Alias2.Alias(source.substring(1));
    if (alias.source === "")
      onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
    if (alias.source.endsWith(":"))
      onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
    const valueEnd = offset + source.length;
    const re = resolveEnd2.resolveEnd(end, valueEnd, options.strict, onError);
    alias.range = [offset, valueEnd, re.offset];
    if (re.comment)
      alias.comment = re.comment;
    return alias;
  }
  composeNode.composeEmptyNode = composeEmptyNode;
  composeNode.composeNode = composeNode$1;
  return composeNode;
}
var hasRequiredComposeDoc;
function requireComposeDoc() {
  if (hasRequiredComposeDoc) return composeDoc;
  hasRequiredComposeDoc = 1;
  var Document2 = requireDocument();
  var composeNode2 = requireComposeNode();
  var resolveEnd2 = requireResolveEnd();
  var resolveProps2 = requireResolveProps();
  function composeDoc$1(options, directives2, { offset, start, value, end }, onError) {
    const opts = Object.assign({ _directives: directives2 }, options);
    const doc = new Document2.Document(void 0, opts);
    const ctx = {
      atKey: false,
      atRoot: true,
      directives: doc.directives,
      options: doc.options,
      schema: doc.schema
    };
    const props = resolveProps2.resolveProps(start, {
      indicator: "doc-start",
      next: value ?? end?.[0],
      offset,
      onError,
      parentIndent: 0,
      startOnNewline: true
    });
    if (props.found) {
      doc.directives.docStart = true;
      if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
        onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
    }
    doc.contents = value ? composeNode2.composeNode(ctx, value, props, onError) : composeNode2.composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re = resolveEnd2.resolveEnd(end, contentEnd, false, onError);
    if (re.comment)
      doc.comment = re.comment;
    doc.range = [offset, contentEnd, re.offset];
    return doc;
  }
  composeDoc.composeDoc = composeDoc$1;
  return composeDoc;
}
var hasRequiredComposer;
function requireComposer() {
  if (hasRequiredComposer) return composer;
  hasRequiredComposer = 1;
  var node_process = require$$0;
  var directives2 = requireDirectives();
  var Document2 = requireDocument();
  var errors2 = requireErrors();
  var identity2 = requireIdentity();
  var composeDoc2 = requireComposeDoc();
  var resolveEnd2 = requireResolveEnd();
  function getErrorPos(src) {
    if (typeof src === "number")
      return [src, src + 1];
    if (Array.isArray(src))
      return src.length === 2 ? src : [src[0], src[1]];
    const { offset, source } = src;
    return [offset, offset + (typeof source === "string" ? source.length : 1)];
  }
  function parsePrelude(prelude) {
    let comment = "";
    let atComment = false;
    let afterEmptyLine = false;
    for (let i = 0; i < prelude.length; ++i) {
      const source = prelude[i];
      switch (source[0]) {
        case "#":
          comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
          atComment = true;
          afterEmptyLine = false;
          break;
        case "%":
          if (prelude[i + 1]?.[0] !== "#")
            i += 1;
          atComment = false;
          break;
        default:
          if (!atComment)
            afterEmptyLine = true;
          atComment = false;
      }
    }
    return { comment, afterEmptyLine };
  }
  class Composer {
    constructor(options = {}) {
      this.doc = null;
      this.atDirectives = false;
      this.prelude = [];
      this.errors = [];
      this.warnings = [];
      this.onError = (source, code, message, warning) => {
        const pos = getErrorPos(source);
        if (warning)
          this.warnings.push(new errors2.YAMLWarning(pos, code, message));
        else
          this.errors.push(new errors2.YAMLParseError(pos, code, message));
      };
      this.directives = new directives2.Directives({ version: options.version || "1.2" });
      this.options = options;
    }
    decorate(doc, afterDoc) {
      const { comment, afterEmptyLine } = parsePrelude(this.prelude);
      if (comment) {
        const dc = doc.contents;
        if (afterDoc) {
          doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
        } else if (afterEmptyLine || doc.directives.docStart || !dc) {
          doc.commentBefore = comment;
        } else if (identity2.isCollection(dc) && !dc.flow && dc.items.length > 0) {
          let it = dc.items[0];
          if (identity2.isPair(it))
            it = it.key;
          const cb = it.commentBefore;
          it.commentBefore = cb ? `${comment}
${cb}` : comment;
        } else {
          const cb = dc.commentBefore;
          dc.commentBefore = cb ? `${comment}
${cb}` : comment;
        }
      }
      if (afterDoc) {
        for (let i = 0; i < this.errors.length; ++i)
          doc.errors.push(this.errors[i]);
        for (let i = 0; i < this.warnings.length; ++i)
          doc.warnings.push(this.warnings[i]);
      } else {
        doc.errors = this.errors;
        doc.warnings = this.warnings;
      }
      this.prelude = [];
      this.errors = [];
      this.warnings = [];
    }
    /**
     * Current stream status information.
     *
     * Mostly useful at the end of input for an empty stream.
     */
    streamInfo() {
      return {
        comment: parsePrelude(this.prelude).comment,
        directives: this.directives,
        errors: this.errors,
        warnings: this.warnings
      };
    }
    /**
     * Compose tokens into documents.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *compose(tokens, forceDoc = false, endOffset = -1) {
      for (const token of tokens)
        yield* this.next(token);
      yield* this.end(forceDoc, endOffset);
    }
    /** Advance the composer by one CST token. */
    *next(token) {
      if (node_process.env.LOG_STREAM)
        console.dir(token, { depth: null });
      switch (token.type) {
        case "directive":
          this.directives.add(token.source, (offset, message, warning) => {
            const pos = getErrorPos(token);
            pos[0] += offset;
            this.onError(pos, "BAD_DIRECTIVE", message, warning);
          });
          this.prelude.push(token.source);
          this.atDirectives = true;
          break;
        case "document": {
          const doc = composeDoc2.composeDoc(this.options, this.directives, token, this.onError);
          if (this.atDirectives && !doc.directives.docStart)
            this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
          this.decorate(doc, false);
          if (this.doc)
            yield this.doc;
          this.doc = doc;
          this.atDirectives = false;
          break;
        }
        case "byte-order-mark":
        case "space":
          break;
        case "comment":
        case "newline":
          this.prelude.push(token.source);
          break;
        case "error": {
          const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
          const error = new errors2.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
          if (this.atDirectives || !this.doc)
            this.errors.push(error);
          else
            this.doc.errors.push(error);
          break;
        }
        case "doc-end": {
          if (!this.doc) {
            const msg = "Unexpected doc-end without preceding document";
            this.errors.push(new errors2.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
            break;
          }
          this.doc.directives.docEnd = true;
          const end = resolveEnd2.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
          this.decorate(this.doc, true);
          if (end.comment) {
            const dc = this.doc.comment;
            this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
          }
          this.doc.range[2] = end.offset;
          break;
        }
        default:
          this.errors.push(new errors2.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
      }
    }
    /**
     * Call at end of input to yield any remaining document.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *end(forceDoc = false, endOffset = -1) {
      if (this.doc) {
        this.decorate(this.doc, true);
        yield this.doc;
        this.doc = null;
      } else if (forceDoc) {
        const opts = Object.assign({ _directives: this.directives }, this.options);
        const doc = new Document2.Document(void 0, opts);
        if (this.atDirectives)
          this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
        doc.range = [0, endOffset, endOffset];
        this.decorate(doc, false);
        yield doc;
      }
    }
  }
  composer.Composer = Composer;
  return composer;
}
var cst = {};
var cstScalar = {};
var hasRequiredCstScalar;
function requireCstScalar() {
  if (hasRequiredCstScalar) return cstScalar;
  hasRequiredCstScalar = 1;
  var resolveBlockScalar2 = requireResolveBlockScalar();
  var resolveFlowScalar2 = requireResolveFlowScalar();
  var errors2 = requireErrors();
  var stringifyString2 = requireStringifyString();
  function resolveAsScalar(token, strict = true, onError) {
    if (token) {
      const _onError = (pos, code, message) => {
        const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
        if (onError)
          onError(offset, code, message);
        else
          throw new errors2.YAMLParseError([offset, offset + 1], code, message);
      };
      switch (token.type) {
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return resolveFlowScalar2.resolveFlowScalar(token, strict, _onError);
        case "block-scalar":
          return resolveBlockScalar2.resolveBlockScalar({ options: { strict } }, token, _onError);
      }
    }
    return null;
  }
  function createScalarToken(value, context) {
    const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
    const source = stringifyString2.stringifyString({ type, value }, {
      implicitKey,
      indent: indent > 0 ? " ".repeat(indent) : "",
      inFlow,
      options: { blockQuote: true, lineWidth: -1 }
    });
    const end = context.end ?? [
      { type: "newline", offset: -1, indent, source: "\n" }
    ];
    switch (source[0]) {
      case "|":
      case ">": {
        const he = source.indexOf("\n");
        const head = source.substring(0, he);
        const body = source.substring(he + 1) + "\n";
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, end))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        return { type: "block-scalar", offset, indent, props, source: body };
      }
      case '"':
        return { type: "double-quoted-scalar", offset, indent, source, end };
      case "'":
        return { type: "single-quoted-scalar", offset, indent, source, end };
      default:
        return { type: "scalar", offset, indent, source, end };
    }
  }
  function setScalarValue(token, value, context = {}) {
    let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
    let indent = "indent" in token ? token.indent : null;
    if (afterKey && typeof indent === "number")
      indent += 2;
    if (!type)
      switch (token.type) {
        case "single-quoted-scalar":
          type = "QUOTE_SINGLE";
          break;
        case "double-quoted-scalar":
          type = "QUOTE_DOUBLE";
          break;
        case "block-scalar": {
          const header = token.props[0];
          if (header.type !== "block-scalar-header")
            throw new Error("Invalid block scalar header");
          type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
          break;
        }
        default:
          type = "PLAIN";
      }
    const source = stringifyString2.stringifyString({ type, value }, {
      implicitKey: implicitKey || indent === null,
      indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
      inFlow,
      options: { blockQuote: true, lineWidth: -1 }
    });
    switch (source[0]) {
      case "|":
      case ">":
        setBlockScalarValue(token, source);
        break;
      case '"':
        setFlowScalarValue(token, source, "double-quoted-scalar");
        break;
      case "'":
        setFlowScalarValue(token, source, "single-quoted-scalar");
        break;
      default:
        setFlowScalarValue(token, source, "scalar");
    }
  }
  function setBlockScalarValue(token, source) {
    const he = source.indexOf("\n");
    const head = source.substring(0, he);
    const body = source.substring(he + 1) + "\n";
    if (token.type === "block-scalar") {
      const header = token.props[0];
      if (header.type !== "block-scalar-header")
        throw new Error("Invalid block scalar header");
      header.source = head;
      token.source = body;
    } else {
      const { offset } = token;
      const indent = "indent" in token ? token.indent : -1;
      const props = [
        { type: "block-scalar-header", offset, indent, source: head }
      ];
      if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
        props.push({ type: "newline", offset: -1, indent, source: "\n" });
      for (const key of Object.keys(token))
        if (key !== "type" && key !== "offset")
          delete token[key];
      Object.assign(token, { type: "block-scalar", indent, props, source: body });
    }
  }
  function addEndtoBlockProps(props, end) {
    if (end)
      for (const st of end)
        switch (st.type) {
          case "space":
          case "comment":
            props.push(st);
            break;
          case "newline":
            props.push(st);
            return true;
        }
    return false;
  }
  function setFlowScalarValue(token, source, type) {
    switch (token.type) {
      case "scalar":
      case "double-quoted-scalar":
      case "single-quoted-scalar":
        token.type = type;
        token.source = source;
        break;
      case "block-scalar": {
        const end = token.props.slice(1);
        let oa = source.length;
        if (token.props[0].type === "block-scalar-header")
          oa -= token.props[0].source.length;
        for (const tok of end)
          tok.offset += oa;
        delete token.props;
        Object.assign(token, { type, source, end });
        break;
      }
      case "block-map":
      case "block-seq": {
        const offset = token.offset + source.length;
        const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
        delete token.items;
        Object.assign(token, { type, source, end: [nl] });
        break;
      }
      default: {
        const indent = "indent" in token ? token.indent : -1;
        const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type, indent, source, end });
      }
    }
  }
  cstScalar.createScalarToken = createScalarToken;
  cstScalar.resolveAsScalar = resolveAsScalar;
  cstScalar.setScalarValue = setScalarValue;
  return cstScalar;
}
var cstStringify = {};
var hasRequiredCstStringify;
function requireCstStringify() {
  if (hasRequiredCstStringify) return cstStringify;
  hasRequiredCstStringify = 1;
  const stringify2 = (cst2) => "type" in cst2 ? stringifyToken(cst2) : stringifyItem(cst2);
  function stringifyToken(token) {
    switch (token.type) {
      case "block-scalar": {
        let res = "";
        for (const tok of token.props)
          res += stringifyToken(tok);
        return res + token.source;
      }
      case "block-map":
      case "block-seq": {
        let res = "";
        for (const item of token.items)
          res += stringifyItem(item);
        return res;
      }
      case "flow-collection": {
        let res = token.start.source;
        for (const item of token.items)
          res += stringifyItem(item);
        for (const st of token.end)
          res += st.source;
        return res;
      }
      case "document": {
        let res = stringifyItem(token);
        if (token.end)
          for (const st of token.end)
            res += st.source;
        return res;
      }
      default: {
        let res = token.source;
        if ("end" in token && token.end)
          for (const st of token.end)
            res += st.source;
        return res;
      }
    }
  }
  function stringifyItem({ start, key, sep, value }) {
    let res = "";
    for (const st of start)
      res += st.source;
    if (key)
      res += stringifyToken(key);
    if (sep)
      for (const st of sep)
        res += st.source;
    if (value)
      res += stringifyToken(value);
    return res;
  }
  cstStringify.stringify = stringify2;
  return cstStringify;
}
var cstVisit = {};
var hasRequiredCstVisit;
function requireCstVisit() {
  if (hasRequiredCstVisit) return cstVisit;
  hasRequiredCstVisit = 1;
  const BREAK = /* @__PURE__ */ Symbol("break visit");
  const SKIP = /* @__PURE__ */ Symbol("skip children");
  const REMOVE = /* @__PURE__ */ Symbol("remove item");
  function visit2(cst2, visitor) {
    if ("type" in cst2 && cst2.type === "document")
      cst2 = { start: cst2.start, value: cst2.value };
    _visit(Object.freeze([]), cst2, visitor);
  }
  visit2.BREAK = BREAK;
  visit2.SKIP = SKIP;
  visit2.REMOVE = REMOVE;
  visit2.itemAtPath = (cst2, path2) => {
    let item = cst2;
    for (const [field, index] of path2) {
      const tok = item?.[field];
      if (tok && "items" in tok) {
        item = tok.items[index];
      } else
        return void 0;
    }
    return item;
  };
  visit2.parentCollection = (cst2, path2) => {
    const parent = visit2.itemAtPath(cst2, path2.slice(0, -1));
    const field = path2[path2.length - 1][0];
    const coll = parent?.[field];
    if (coll && "items" in coll)
      return coll;
    throw new Error("Parent collection not found");
  };
  function _visit(path2, item, visitor) {
    let ctrl = visitor(item, path2);
    if (typeof ctrl === "symbol")
      return ctrl;
    for (const field of ["key", "value"]) {
      const token = item[field];
      if (token && "items" in token) {
        for (let i = 0; i < token.items.length; ++i) {
          const ci = _visit(Object.freeze(path2.concat([[field, i]])), token.items[i], visitor);
          if (typeof ci === "number")
            i = ci - 1;
          else if (ci === BREAK)
            return BREAK;
          else if (ci === REMOVE) {
            token.items.splice(i, 1);
            i -= 1;
          }
        }
        if (typeof ctrl === "function" && field === "key")
          ctrl = ctrl(item, path2);
      }
    }
    return typeof ctrl === "function" ? ctrl(item, path2) : ctrl;
  }
  cstVisit.visit = visit2;
  return cstVisit;
}
var hasRequiredCst;
function requireCst() {
  if (hasRequiredCst) return cst;
  hasRequiredCst = 1;
  var cstScalar2 = requireCstScalar();
  var cstStringify2 = requireCstStringify();
  var cstVisit2 = requireCstVisit();
  const BOM = "\uFEFF";
  const DOCUMENT = "";
  const FLOW_END = "";
  const SCALAR = "";
  const isCollection = (token) => !!token && "items" in token;
  const isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
  function prettyToken(token) {
    switch (token) {
      case BOM:
        return "<BOM>";
      case DOCUMENT:
        return "<DOC>";
      case FLOW_END:
        return "<FLOW_END>";
      case SCALAR:
        return "<SCALAR>";
      default:
        return JSON.stringify(token);
    }
  }
  function tokenType(source) {
    switch (source) {
      case BOM:
        return "byte-order-mark";
      case DOCUMENT:
        return "doc-mode";
      case FLOW_END:
        return "flow-error-end";
      case SCALAR:
        return "scalar";
      case "---":
        return "doc-start";
      case "...":
        return "doc-end";
      case "":
      case "\n":
      case "\r\n":
        return "newline";
      case "-":
        return "seq-item-ind";
      case "?":
        return "explicit-key-ind";
      case ":":
        return "map-value-ind";
      case "{":
        return "flow-map-start";
      case "}":
        return "flow-map-end";
      case "[":
        return "flow-seq-start";
      case "]":
        return "flow-seq-end";
      case ",":
        return "comma";
    }
    switch (source[0]) {
      case " ":
      case "	":
        return "space";
      case "#":
        return "comment";
      case "%":
        return "directive-line";
      case "*":
        return "alias";
      case "&":
        return "anchor";
      case "!":
        return "tag";
      case "'":
        return "single-quoted-scalar";
      case '"':
        return "double-quoted-scalar";
      case "|":
      case ">":
        return "block-scalar-header";
    }
    return null;
  }
  cst.createScalarToken = cstScalar2.createScalarToken;
  cst.resolveAsScalar = cstScalar2.resolveAsScalar;
  cst.setScalarValue = cstScalar2.setScalarValue;
  cst.stringify = cstStringify2.stringify;
  cst.visit = cstVisit2.visit;
  cst.BOM = BOM;
  cst.DOCUMENT = DOCUMENT;
  cst.FLOW_END = FLOW_END;
  cst.SCALAR = SCALAR;
  cst.isCollection = isCollection;
  cst.isScalar = isScalar;
  cst.prettyToken = prettyToken;
  cst.tokenType = tokenType;
  return cst;
}
var lexer = {};
var hasRequiredLexer;
function requireLexer() {
  if (hasRequiredLexer) return lexer;
  hasRequiredLexer = 1;
  var cst2 = requireCst();
  function isEmpty(ch) {
    switch (ch) {
      case void 0:
      case " ":
      case "\n":
      case "\r":
      case "	":
        return true;
      default:
        return false;
    }
  }
  const hexDigits = new Set("0123456789ABCDEFabcdef");
  const tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
  const flowIndicatorChars = new Set(",[]{}");
  const invalidAnchorChars = new Set(" ,[]{}\n\r	");
  const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
  class Lexer {
    constructor() {
      this.atEnd = false;
      this.blockScalarIndent = -1;
      this.blockScalarKeep = false;
      this.buffer = "";
      this.flowKey = false;
      this.flowLevel = 0;
      this.indentNext = 0;
      this.indentValue = 0;
      this.lineEndPos = null;
      this.next = null;
      this.pos = 0;
    }
    /**
     * Generate YAML tokens from the `source` string. If `incomplete`,
     * a part of the last line may be left as a buffer for the next call.
     *
     * @returns A generator of lexical tokens
     */
    *lex(source, incomplete = false) {
      if (source) {
        if (typeof source !== "string")
          throw TypeError("source is not a string");
        this.buffer = this.buffer ? this.buffer + source : source;
        this.lineEndPos = null;
      }
      this.atEnd = !incomplete;
      let next = this.next ?? "stream";
      while (next && (incomplete || this.hasChars(1)))
        next = yield* this.parseNext(next);
    }
    atLineEnd() {
      let i = this.pos;
      let ch = this.buffer[i];
      while (ch === " " || ch === "	")
        ch = this.buffer[++i];
      if (!ch || ch === "#" || ch === "\n")
        return true;
      if (ch === "\r")
        return this.buffer[i + 1] === "\n";
      return false;
    }
    charAt(n) {
      return this.buffer[this.pos + n];
    }
    continueScalar(offset) {
      let ch = this.buffer[offset];
      if (this.indentNext > 0) {
        let indent = 0;
        while (ch === " ")
          ch = this.buffer[++indent + offset];
        if (ch === "\r") {
          const next = this.buffer[indent + offset + 1];
          if (next === "\n" || !next && !this.atEnd)
            return offset + indent + 1;
        }
        return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
      }
      if (ch === "-" || ch === ".") {
        const dt = this.buffer.substr(offset, 3);
        if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
          return -1;
      }
      return offset;
    }
    getLine() {
      let end = this.lineEndPos;
      if (typeof end !== "number" || end !== -1 && end < this.pos) {
        end = this.buffer.indexOf("\n", this.pos);
        this.lineEndPos = end;
      }
      if (end === -1)
        return this.atEnd ? this.buffer.substring(this.pos) : null;
      if (this.buffer[end - 1] === "\r")
        end -= 1;
      return this.buffer.substring(this.pos, end);
    }
    hasChars(n) {
      return this.pos + n <= this.buffer.length;
    }
    setNext(state) {
      this.buffer = this.buffer.substring(this.pos);
      this.pos = 0;
      this.lineEndPos = null;
      this.next = state;
      return null;
    }
    peek(n) {
      return this.buffer.substr(this.pos, n);
    }
    *parseNext(next) {
      switch (next) {
        case "stream":
          return yield* this.parseStream();
        case "line-start":
          return yield* this.parseLineStart();
        case "block-start":
          return yield* this.parseBlockStart();
        case "doc":
          return yield* this.parseDocument();
        case "flow":
          return yield* this.parseFlowCollection();
        case "quoted-scalar":
          return yield* this.parseQuotedScalar();
        case "block-scalar":
          return yield* this.parseBlockScalar();
        case "plain-scalar":
          return yield* this.parsePlainScalar();
      }
    }
    *parseStream() {
      let line2 = this.getLine();
      if (line2 === null)
        return this.setNext("stream");
      if (line2[0] === cst2.BOM) {
        yield* this.pushCount(1);
        line2 = line2.substring(1);
      }
      if (line2[0] === "%") {
        let dirEnd = line2.length;
        let cs = line2.indexOf("#");
        while (cs !== -1) {
          const ch = line2[cs - 1];
          if (ch === " " || ch === "	") {
            dirEnd = cs - 1;
            break;
          } else {
            cs = line2.indexOf("#", cs + 1);
          }
        }
        while (true) {
          const ch = line2[dirEnd - 1];
          if (ch === " " || ch === "	")
            dirEnd -= 1;
          else
            break;
        }
        const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
        yield* this.pushCount(line2.length - n);
        this.pushNewline();
        return "stream";
      }
      if (this.atLineEnd()) {
        const sp = yield* this.pushSpaces(true);
        yield* this.pushCount(line2.length - sp);
        yield* this.pushNewline();
        return "stream";
      }
      yield cst2.DOCUMENT;
      return yield* this.parseLineStart();
    }
    *parseLineStart() {
      const ch = this.charAt(0);
      if (!ch && !this.atEnd)
        return this.setNext("line-start");
      if (ch === "-" || ch === ".") {
        if (!this.atEnd && !this.hasChars(4))
          return this.setNext("line-start");
        const s = this.peek(3);
        if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
          yield* this.pushCount(3);
          this.indentValue = 0;
          this.indentNext = 0;
          return s === "---" ? "doc" : "stream";
        }
      }
      this.indentValue = yield* this.pushSpaces(false);
      if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
        this.indentNext = this.indentValue;
      return yield* this.parseBlockStart();
    }
    *parseBlockStart() {
      const [ch0, ch1] = this.peek(2);
      if (!ch1 && !this.atEnd)
        return this.setNext("block-start");
      if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
        const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
        this.indentNext = this.indentValue + 1;
        this.indentValue += n;
        return "block-start";
      }
      return "doc";
    }
    *parseDocument() {
      yield* this.pushSpaces(true);
      const line2 = this.getLine();
      if (line2 === null)
        return this.setNext("doc");
      let n = yield* this.pushIndicators();
      switch (line2[n]) {
        case "#":
          yield* this.pushCount(line2.length - n);
        // fallthrough
        case void 0:
          yield* this.pushNewline();
          return yield* this.parseLineStart();
        case "{":
        case "[":
          yield* this.pushCount(1);
          this.flowKey = false;
          this.flowLevel = 1;
          return "flow";
        case "}":
        case "]":
          yield* this.pushCount(1);
          return "doc";
        case "*":
          yield* this.pushUntil(isNotAnchorChar);
          return "doc";
        case '"':
        case "'":
          return yield* this.parseQuotedScalar();
        case "|":
        case ">":
          n += yield* this.parseBlockScalarHeader();
          n += yield* this.pushSpaces(true);
          yield* this.pushCount(line2.length - n);
          yield* this.pushNewline();
          return yield* this.parseBlockScalar();
        default:
          return yield* this.parsePlainScalar();
      }
    }
    *parseFlowCollection() {
      let nl, sp;
      let indent = -1;
      do {
        nl = yield* this.pushNewline();
        if (nl > 0) {
          sp = yield* this.pushSpaces(false);
          this.indentValue = indent = sp;
        } else {
          sp = 0;
        }
        sp += yield* this.pushSpaces(true);
      } while (nl + sp > 0);
      const line2 = this.getLine();
      if (line2 === null)
        return this.setNext("flow");
      if (indent !== -1 && indent < this.indentNext && line2[0] !== "#" || indent === 0 && (line2.startsWith("---") || line2.startsWith("...")) && isEmpty(line2[3])) {
        const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line2[0] === "]" || line2[0] === "}");
        if (!atFlowEndMarker) {
          this.flowLevel = 0;
          yield cst2.FLOW_END;
          return yield* this.parseLineStart();
        }
      }
      let n = 0;
      while (line2[n] === ",") {
        n += yield* this.pushCount(1);
        n += yield* this.pushSpaces(true);
        this.flowKey = false;
      }
      n += yield* this.pushIndicators();
      switch (line2[n]) {
        case void 0:
          return "flow";
        case "#":
          yield* this.pushCount(line2.length - n);
          return "flow";
        case "{":
        case "[":
          yield* this.pushCount(1);
          this.flowKey = false;
          this.flowLevel += 1;
          return "flow";
        case "}":
        case "]":
          yield* this.pushCount(1);
          this.flowKey = true;
          this.flowLevel -= 1;
          return this.flowLevel ? "flow" : "doc";
        case "*":
          yield* this.pushUntil(isNotAnchorChar);
          return "flow";
        case '"':
        case "'":
          this.flowKey = true;
          return yield* this.parseQuotedScalar();
        case ":": {
          const next = this.charAt(1);
          if (this.flowKey || isEmpty(next) || next === ",") {
            this.flowKey = false;
            yield* this.pushCount(1);
            yield* this.pushSpaces(true);
            return "flow";
          }
        }
        // fallthrough
        default:
          this.flowKey = false;
          return yield* this.parsePlainScalar();
      }
    }
    *parseQuotedScalar() {
      const quote = this.charAt(0);
      let end = this.buffer.indexOf(quote, this.pos + 1);
      if (quote === "'") {
        while (end !== -1 && this.buffer[end + 1] === "'")
          end = this.buffer.indexOf("'", end + 2);
      } else {
        while (end !== -1) {
          let n = 0;
          while (this.buffer[end - 1 - n] === "\\")
            n += 1;
          if (n % 2 === 0)
            break;
          end = this.buffer.indexOf('"', end + 1);
        }
      }
      const qb = this.buffer.substring(0, end);
      let nl = qb.indexOf("\n", this.pos);
      if (nl !== -1) {
        while (nl !== -1) {
          const cs = this.continueScalar(nl + 1);
          if (cs === -1)
            break;
          nl = qb.indexOf("\n", cs);
        }
        if (nl !== -1) {
          end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
        }
      }
      if (end === -1) {
        if (!this.atEnd)
          return this.setNext("quoted-scalar");
        end = this.buffer.length;
      }
      yield* this.pushToIndex(end + 1, false);
      return this.flowLevel ? "flow" : "doc";
    }
    *parseBlockScalarHeader() {
      this.blockScalarIndent = -1;
      this.blockScalarKeep = false;
      let i = this.pos;
      while (true) {
        const ch = this.buffer[++i];
        if (ch === "+")
          this.blockScalarKeep = true;
        else if (ch > "0" && ch <= "9")
          this.blockScalarIndent = Number(ch) - 1;
        else if (ch !== "-")
          break;
      }
      return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
    }
    *parseBlockScalar() {
      let nl = this.pos - 1;
      let indent = 0;
      let ch;
      loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
        switch (ch) {
          case " ":
            indent += 1;
            break;
          case "\n":
            nl = i2;
            indent = 0;
            break;
          case "\r": {
            const next = this.buffer[i2 + 1];
            if (!next && !this.atEnd)
              return this.setNext("block-scalar");
            if (next === "\n")
              break;
          }
          // fallthrough
          default:
            break loop;
        }
      }
      if (!ch && !this.atEnd)
        return this.setNext("block-scalar");
      if (indent >= this.indentNext) {
        if (this.blockScalarIndent === -1)
          this.indentNext = indent;
        else {
          this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
        }
        do {
          const cs = this.continueScalar(nl + 1);
          if (cs === -1)
            break;
          nl = this.buffer.indexOf("\n", cs);
        } while (nl !== -1);
        if (nl === -1) {
          if (!this.atEnd)
            return this.setNext("block-scalar");
          nl = this.buffer.length;
        }
      }
      let i = nl + 1;
      ch = this.buffer[i];
      while (ch === " ")
        ch = this.buffer[++i];
      if (ch === "	") {
        while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
          ch = this.buffer[++i];
        nl = i - 1;
      } else if (!this.blockScalarKeep) {
        do {
          let i2 = nl - 1;
          let ch2 = this.buffer[i2];
          if (ch2 === "\r")
            ch2 = this.buffer[--i2];
          const lastChar = i2;
          while (ch2 === " ")
            ch2 = this.buffer[--i2];
          if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
            nl = i2;
          else
            break;
        } while (true);
      }
      yield cst2.SCALAR;
      yield* this.pushToIndex(nl + 1, true);
      return yield* this.parseLineStart();
    }
    *parsePlainScalar() {
      const inFlow = this.flowLevel > 0;
      let end = this.pos - 1;
      let i = this.pos - 1;
      let ch;
      while (ch = this.buffer[++i]) {
        if (ch === ":") {
          const next = this.buffer[i + 1];
          if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
            break;
          end = i;
        } else if (isEmpty(ch)) {
          let next = this.buffer[i + 1];
          if (ch === "\r") {
            if (next === "\n") {
              i += 1;
              ch = "\n";
              next = this.buffer[i + 1];
            } else
              end = i;
          }
          if (next === "#" || inFlow && flowIndicatorChars.has(next))
            break;
          if (ch === "\n") {
            const cs = this.continueScalar(i + 1);
            if (cs === -1)
              break;
            i = Math.max(i, cs - 2);
          }
        } else {
          if (inFlow && flowIndicatorChars.has(ch))
            break;
          end = i;
        }
      }
      if (!ch && !this.atEnd)
        return this.setNext("plain-scalar");
      yield cst2.SCALAR;
      yield* this.pushToIndex(end + 1, true);
      return inFlow ? "flow" : "doc";
    }
    *pushCount(n) {
      if (n > 0) {
        yield this.buffer.substr(this.pos, n);
        this.pos += n;
        return n;
      }
      return 0;
    }
    *pushToIndex(i, allowEmpty) {
      const s = this.buffer.slice(this.pos, i);
      if (s) {
        yield s;
        this.pos += s.length;
        return s.length;
      } else if (allowEmpty)
        yield "";
      return 0;
    }
    *pushIndicators() {
      let n = 0;
      loop: while (true) {
        switch (this.charAt(0)) {
          case "!":
            n += yield* this.pushTag();
            n += yield* this.pushSpaces(true);
            continue loop;
          case "&":
            n += yield* this.pushUntil(isNotAnchorChar);
            n += yield* this.pushSpaces(true);
            continue loop;
          case "-":
          // this is an error
          case "?":
          // this is an error outside flow collections
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
              if (!inFlow)
                this.indentNext = this.indentValue + 1;
              else if (this.flowKey)
                this.flowKey = false;
              n += yield* this.pushCount(1);
              n += yield* this.pushSpaces(true);
              continue loop;
            }
          }
        }
        break loop;
      }
      return n;
    }
    *pushTag() {
      if (this.charAt(1) === "<") {
        let i = this.pos + 2;
        let ch = this.buffer[i];
        while (!isEmpty(ch) && ch !== ">")
          ch = this.buffer[++i];
        return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
      } else {
        let i = this.pos + 1;
        let ch = this.buffer[i];
        while (ch) {
          if (tagChars.has(ch))
            ch = this.buffer[++i];
          else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
            ch = this.buffer[i += 3];
          } else
            break;
        }
        return yield* this.pushToIndex(i, false);
      }
    }
    *pushNewline() {
      const ch = this.buffer[this.pos];
      if (ch === "\n")
        return yield* this.pushCount(1);
      else if (ch === "\r" && this.charAt(1) === "\n")
        return yield* this.pushCount(2);
      else
        return 0;
    }
    *pushSpaces(allowTabs) {
      let i = this.pos - 1;
      let ch;
      do {
        ch = this.buffer[++i];
      } while (ch === " " || allowTabs && ch === "	");
      const n = i - this.pos;
      if (n > 0) {
        yield this.buffer.substr(this.pos, n);
        this.pos = i;
      }
      return n;
    }
    *pushUntil(test) {
      let i = this.pos;
      let ch = this.buffer[i];
      while (!test(ch))
        ch = this.buffer[++i];
      return yield* this.pushToIndex(i, false);
    }
  }
  lexer.Lexer = Lexer;
  return lexer;
}
var lineCounter = {};
var hasRequiredLineCounter;
function requireLineCounter() {
  if (hasRequiredLineCounter) return lineCounter;
  hasRequiredLineCounter = 1;
  class LineCounter {
    constructor() {
      this.lineStarts = [];
      this.addNewLine = (offset) => this.lineStarts.push(offset);
      this.linePos = (offset) => {
        let low = 0;
        let high = this.lineStarts.length;
        while (low < high) {
          const mid = low + high >> 1;
          if (this.lineStarts[mid] < offset)
            low = mid + 1;
          else
            high = mid;
        }
        if (this.lineStarts[low] === offset)
          return { line: low + 1, col: 1 };
        if (low === 0)
          return { line: 0, col: offset };
        const start = this.lineStarts[low - 1];
        return { line: low, col: offset - start + 1 };
      };
    }
  }
  lineCounter.LineCounter = LineCounter;
  return lineCounter;
}
var parser = {};
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser;
  hasRequiredParser = 1;
  var node_process = require$$0;
  var cst2 = requireCst();
  var lexer2 = requireLexer();
  function includesToken(list, type) {
    for (let i = 0; i < list.length; ++i)
      if (list[i].type === type)
        return true;
    return false;
  }
  function findNonEmptyIndex(list) {
    for (let i = 0; i < list.length; ++i) {
      switch (list[i].type) {
        case "space":
        case "comment":
        case "newline":
          break;
        default:
          return i;
      }
    }
    return -1;
  }
  function isFlowToken(token) {
    switch (token?.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
      case "flow-collection":
        return true;
      default:
        return false;
    }
  }
  function getPrevProps(parent) {
    switch (parent.type) {
      case "document":
        return parent.start;
      case "block-map": {
        const it = parent.items[parent.items.length - 1];
        return it.sep ?? it.start;
      }
      case "block-seq":
        return parent.items[parent.items.length - 1].start;
      /* istanbul ignore next should not happen */
      default:
        return [];
    }
  }
  function getFirstKeyStartProps(prev) {
    if (prev.length === 0)
      return [];
    let i = prev.length;
    loop: while (--i >= 0) {
      switch (prev[i].type) {
        case "doc-start":
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
        case "newline":
          break loop;
      }
    }
    while (prev[++i]?.type === "space") {
    }
    return prev.splice(i, prev.length);
  }
  function arrayPushArray(target, source) {
    if (source.length < 1e5)
      Array.prototype.push.apply(target, source);
    else
      for (let i = 0; i < source.length; ++i)
        target.push(source[i]);
  }
  function fixFlowSeqItems(fc) {
    if (fc.start.type === "flow-seq-start") {
      for (const it of fc.items) {
        if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
          if (it.key)
            it.value = it.key;
          delete it.key;
          if (isFlowToken(it.value)) {
            if (it.value.end)
              arrayPushArray(it.value.end, it.sep);
            else
              it.value.end = it.sep;
          } else
            arrayPushArray(it.start, it.sep);
          delete it.sep;
        }
      }
    }
  }
  class Parser {
    /**
     * @param onNewLine - If defined, called separately with the start position of
     *   each new line (in `parse()`, including the start of input).
     */
    constructor(onNewLine) {
      this.atNewLine = true;
      this.atScalar = false;
      this.indent = 0;
      this.offset = 0;
      this.onKeyLine = false;
      this.stack = [];
      this.source = "";
      this.type = "";
      this.lexer = new lexer2.Lexer();
      this.onNewLine = onNewLine;
    }
    /**
     * Parse `source` as a YAML stream.
     * If `incomplete`, a part of the last line may be left as a buffer for the next call.
     *
     * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
     *
     * @returns A generator of tokens representing each directive, document, and other structure.
     */
    *parse(source, incomplete = false) {
      if (this.onNewLine && this.offset === 0)
        this.onNewLine(0);
      for (const lexeme of this.lexer.lex(source, incomplete))
        yield* this.next(lexeme);
      if (!incomplete)
        yield* this.end();
    }
    /**
     * Advance the parser by the `source` of one lexical token.
     */
    *next(source) {
      this.source = source;
      if (node_process.env.LOG_TOKENS)
        console.log("|", cst2.prettyToken(source));
      if (this.atScalar) {
        this.atScalar = false;
        yield* this.step();
        this.offset += source.length;
        return;
      }
      const type = cst2.tokenType(source);
      if (!type) {
        const message = `Not a YAML token: ${source}`;
        yield* this.pop({ type: "error", offset: this.offset, message, source });
        this.offset += source.length;
      } else if (type === "scalar") {
        this.atNewLine = false;
        this.atScalar = true;
        this.type = "scalar";
      } else {
        this.type = type;
        yield* this.step();
        switch (type) {
          case "newline":
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine)
              this.onNewLine(this.offset + source.length);
            break;
          case "space":
            if (this.atNewLine && source[0] === " ")
              this.indent += source.length;
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            if (this.atNewLine)
              this.indent += source.length;
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = false;
        }
        this.offset += source.length;
      }
    }
    /** Call at end of input to push out any remaining constructions */
    *end() {
      while (this.stack.length > 0)
        yield* this.pop();
    }
    get sourceToken() {
      const st = {
        type: this.type,
        offset: this.offset,
        indent: this.indent,
        source: this.source
      };
      return st;
    }
    *step() {
      const top = this.peek(1);
      if (this.type === "doc-end" && top?.type !== "doc-end") {
        while (this.stack.length > 0)
          yield* this.pop();
        this.stack.push({
          type: "doc-end",
          offset: this.offset,
          source: this.source
        });
        return;
      }
      if (!top)
        return yield* this.stream();
      switch (top.type) {
        case "document":
          return yield* this.document(top);
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return yield* this.scalar(top);
        case "block-scalar":
          return yield* this.blockScalar(top);
        case "block-map":
          return yield* this.blockMap(top);
        case "block-seq":
          return yield* this.blockSequence(top);
        case "flow-collection":
          return yield* this.flowCollection(top);
        case "doc-end":
          return yield* this.documentEnd(top);
      }
      yield* this.pop();
    }
    peek(n) {
      return this.stack[this.stack.length - n];
    }
    *pop(error) {
      const token = error ?? this.stack.pop();
      if (!token) {
        const message = "Tried to pop an empty stack";
        yield { type: "error", offset: this.offset, source: "", message };
      } else if (this.stack.length === 0) {
        yield token;
      } else {
        const top = this.peek(1);
        if (token.type === "block-scalar") {
          token.indent = "indent" in top ? top.indent : 0;
        } else if (token.type === "flow-collection" && top.type === "document") {
          token.indent = 0;
        }
        if (token.type === "flow-collection")
          fixFlowSeqItems(token);
        switch (top.type) {
          case "document":
            top.value = token;
            break;
          case "block-scalar":
            top.props.push(token);
            break;
          case "block-map": {
            const it = top.items[top.items.length - 1];
            if (it.value) {
              top.items.push({ start: [], key: token, sep: [] });
              this.onKeyLine = true;
              return;
            } else if (it.sep) {
              it.value = token;
            } else {
              Object.assign(it, { key: token, sep: [] });
              this.onKeyLine = !it.explicitKey;
              return;
            }
            break;
          }
          case "block-seq": {
            const it = top.items[top.items.length - 1];
            if (it.value)
              top.items.push({ start: [], value: token });
            else
              it.value = token;
            break;
          }
          case "flow-collection": {
            const it = top.items[top.items.length - 1];
            if (!it || it.value)
              top.items.push({ start: [], key: token, sep: [] });
            else if (it.sep)
              it.value = token;
            else
              Object.assign(it, { key: token, sep: [] });
            return;
          }
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.pop(token);
        }
        if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
          const last = token.items[token.items.length - 1];
          if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
            if (top.type === "document")
              top.end = last.start;
            else
              top.items.push({ start: last.start });
            token.items.splice(-1, 1);
          }
        }
      }
    }
    *stream() {
      switch (this.type) {
        case "directive-line":
          yield { type: "directive", offset: this.offset, source: this.source };
          return;
        case "byte-order-mark":
        case "space":
        case "comment":
        case "newline":
          yield this.sourceToken;
          return;
        case "doc-mode":
        case "doc-start": {
          const doc = {
            type: "document",
            offset: this.offset,
            start: []
          };
          if (this.type === "doc-start")
            doc.start.push(this.sourceToken);
          this.stack.push(doc);
          return;
        }
      }
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML stream`,
        source: this.source
      };
    }
    *document(doc) {
      if (doc.value)
        return yield* this.lineEnd(doc);
      switch (this.type) {
        case "doc-start": {
          if (findNonEmptyIndex(doc.start) !== -1) {
            yield* this.pop();
            yield* this.step();
          } else
            doc.start.push(this.sourceToken);
          return;
        }
        case "anchor":
        case "tag":
        case "space":
        case "comment":
        case "newline":
          doc.start.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(doc);
      if (bv)
        this.stack.push(bv);
      else {
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML document`,
          source: this.source
        };
      }
    }
    *scalar(scalar) {
      if (this.type === "map-value-ind") {
        const prev = getPrevProps(this.peek(2));
        const start = getFirstKeyStartProps(prev);
        let sep;
        if (scalar.end) {
          sep = scalar.end;
          sep.push(this.sourceToken);
          delete scalar.end;
        } else
          sep = [this.sourceToken];
        const map2 = {
          type: "block-map",
          offset: scalar.offset,
          indent: scalar.indent,
          items: [{ start, key: scalar, sep }]
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map2;
      } else
        yield* this.lineEnd(scalar);
    }
    *blockScalar(scalar) {
      switch (this.type) {
        case "space":
        case "comment":
        case "newline":
          scalar.props.push(this.sourceToken);
          return;
        case "scalar":
          scalar.source = this.source;
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine) {
            let nl = this.source.indexOf("\n") + 1;
            while (nl !== 0) {
              this.onNewLine(this.offset + nl);
              nl = this.source.indexOf("\n", nl) + 1;
            }
          }
          yield* this.pop();
          break;
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop();
          yield* this.step();
      }
    }
    *blockMap(map2) {
      const it = map2.items[map2.items.length - 1];
      switch (this.type) {
        case "newline":
          this.onKeyLine = false;
          if (it.value) {
            const end = "end" in it.value ? it.value.end : void 0;
            const last = Array.isArray(end) ? end[end.length - 1] : void 0;
            if (last?.type === "comment")
              end?.push(this.sourceToken);
            else
              map2.items.push({ start: [this.sourceToken] });
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            it.start.push(this.sourceToken);
          }
          return;
        case "space":
        case "comment":
          if (it.value) {
            map2.items.push({ start: [this.sourceToken] });
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            if (this.atIndentedComment(it.start, map2.indent)) {
              const prev = map2.items[map2.items.length - 2];
              const end = prev?.value?.end;
              if (Array.isArray(end)) {
                arrayPushArray(end, it.start);
                end.push(this.sourceToken);
                map2.items.pop();
                return;
              }
            }
            it.start.push(this.sourceToken);
          }
          return;
      }
      if (this.indent >= map2.indent) {
        const atMapIndent = !this.onKeyLine && this.indent === map2.indent;
        const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
        let start = [];
        if (atNextItem && it.sep && !it.value) {
          const nl = [];
          for (let i = 0; i < it.sep.length; ++i) {
            const st = it.sep[i];
            switch (st.type) {
              case "newline":
                nl.push(i);
                break;
              case "space":
                break;
              case "comment":
                if (st.indent > map2.indent)
                  nl.length = 0;
                break;
              default:
                nl.length = 0;
            }
          }
          if (nl.length >= 2)
            start = it.sep.splice(nl[1]);
        }
        switch (this.type) {
          case "anchor":
          case "tag":
            if (atNextItem || it.value) {
              start.push(this.sourceToken);
              map2.items.push({ start });
              this.onKeyLine = true;
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "explicit-key-ind":
            if (!it.sep && !it.explicitKey) {
              it.start.push(this.sourceToken);
              it.explicitKey = true;
            } else if (atNextItem || it.value) {
              start.push(this.sourceToken);
              map2.items.push({ start, explicitKey: true });
            } else {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: [this.sourceToken], explicitKey: true }]
              });
            }
            this.onKeyLine = true;
            return;
          case "map-value-ind":
            if (it.explicitKey) {
              if (!it.sep) {
                if (includesToken(it.start, "newline")) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else {
                  const start2 = getFirstKeyStartProps(it.start);
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                  });
                }
              } else if (it.value) {
                map2.items.push({ start: [], key: null, sep: [this.sourceToken] });
              } else if (includesToken(it.sep, "map-value-ind")) {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start, key: null, sep: [this.sourceToken] }]
                });
              } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                const start2 = getFirstKeyStartProps(it.start);
                const key = it.key;
                const sep = it.sep;
                sep.push(this.sourceToken);
                delete it.key;
                delete it.sep;
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: start2, key, sep }]
                });
              } else if (start.length > 0) {
                it.sep = it.sep.concat(start, this.sourceToken);
              } else {
                it.sep.push(this.sourceToken);
              }
            } else {
              if (!it.sep) {
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              } else if (it.value || atNextItem) {
                map2.items.push({ start, key: null, sep: [this.sourceToken] });
              } else if (includesToken(it.sep, "map-value-ind")) {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [], key: null, sep: [this.sourceToken] }]
                });
              } else {
                it.sep.push(this.sourceToken);
              }
            }
            this.onKeyLine = true;
            return;
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar": {
            const fs = this.flowScalar(this.type);
            if (atNextItem || it.value) {
              map2.items.push({ start, key: fs, sep: [] });
              this.onKeyLine = true;
            } else if (it.sep) {
              this.stack.push(fs);
            } else {
              Object.assign(it, { key: fs, sep: [] });
              this.onKeyLine = true;
            }
            return;
          }
          default: {
            const bv = this.startBlockValue(map2);
            if (bv) {
              if (bv.type === "block-seq") {
                if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                  yield* this.pop({
                    type: "error",
                    offset: this.offset,
                    message: "Unexpected block-seq-ind on same line with key",
                    source: this.source
                  });
                  return;
                }
              } else if (atMapIndent) {
                map2.items.push({ start });
              }
              this.stack.push(bv);
              return;
            }
          }
        }
      }
      yield* this.pop();
      yield* this.step();
    }
    *blockSequence(seq2) {
      const it = seq2.items[seq2.items.length - 1];
      switch (this.type) {
        case "newline":
          if (it.value) {
            const end = "end" in it.value ? it.value.end : void 0;
            const last = Array.isArray(end) ? end[end.length - 1] : void 0;
            if (last?.type === "comment")
              end?.push(this.sourceToken);
            else
              seq2.items.push({ start: [this.sourceToken] });
          } else
            it.start.push(this.sourceToken);
          return;
        case "space":
        case "comment":
          if (it.value)
            seq2.items.push({ start: [this.sourceToken] });
          else {
            if (this.atIndentedComment(it.start, seq2.indent)) {
              const prev = seq2.items[seq2.items.length - 2];
              const end = prev?.value?.end;
              if (Array.isArray(end)) {
                arrayPushArray(end, it.start);
                end.push(this.sourceToken);
                seq2.items.pop();
                return;
              }
            }
            it.start.push(this.sourceToken);
          }
          return;
        case "anchor":
        case "tag":
          if (it.value || this.indent <= seq2.indent)
            break;
          it.start.push(this.sourceToken);
          return;
        case "seq-item-ind":
          if (this.indent !== seq2.indent)
            break;
          if (it.value || includesToken(it.start, "seq-item-ind"))
            seq2.items.push({ start: [this.sourceToken] });
          else
            it.start.push(this.sourceToken);
          return;
      }
      if (this.indent > seq2.indent) {
        const bv = this.startBlockValue(seq2);
        if (bv) {
          this.stack.push(bv);
          return;
        }
      }
      yield* this.pop();
      yield* this.step();
    }
    *flowCollection(fc) {
      const it = fc.items[fc.items.length - 1];
      if (this.type === "flow-error-end") {
        let top;
        do {
          yield* this.pop();
          top = this.peek(1);
        } while (top?.type === "flow-collection");
      } else if (fc.end.length === 0) {
        switch (this.type) {
          case "comma":
          case "explicit-key-ind":
            if (!it || it.sep)
              fc.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
          case "map-value-ind":
            if (!it || it.value)
              fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
            else if (it.sep)
              it.sep.push(this.sourceToken);
            else
              Object.assign(it, { key: null, sep: [this.sourceToken] });
            return;
          case "space":
          case "comment":
          case "newline":
          case "anchor":
          case "tag":
            if (!it || it.value)
              fc.items.push({ start: [this.sourceToken] });
            else if (it.sep)
              it.sep.push(this.sourceToken);
            else
              it.start.push(this.sourceToken);
            return;
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar": {
            const fs = this.flowScalar(this.type);
            if (!it || it.value)
              fc.items.push({ start: [], key: fs, sep: [] });
            else if (it.sep)
              this.stack.push(fs);
            else
              Object.assign(it, { key: fs, sep: [] });
            return;
          }
          case "flow-map-end":
          case "flow-seq-end":
            fc.end.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(fc);
        if (bv)
          this.stack.push(bv);
        else {
          yield* this.pop();
          yield* this.step();
        }
      } else {
        const parent = this.peek(2);
        if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
          yield* this.pop();
          yield* this.step();
        } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          fixFlowSeqItems(fc);
          const sep = fc.end.splice(1, fc.end.length);
          sep.push(this.sourceToken);
          const map2 = {
            type: "block-map",
            offset: fc.offset,
            indent: fc.indent,
            items: [{ start, key: fc, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map2;
        } else {
          yield* this.lineEnd(fc);
        }
      }
    }
    flowScalar(type) {
      if (this.onNewLine) {
        let nl = this.source.indexOf("\n") + 1;
        while (nl !== 0) {
          this.onNewLine(this.offset + nl);
          nl = this.source.indexOf("\n", nl) + 1;
        }
      }
      return {
        type,
        offset: this.offset,
        indent: this.indent,
        source: this.source
      };
    }
    startBlockValue(parent) {
      switch (this.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
          return this.flowScalar(this.type);
        case "block-scalar-header":
          return {
            type: "block-scalar",
            offset: this.offset,
            indent: this.indent,
            props: [this.sourceToken],
            source: ""
          };
        case "flow-map-start":
        case "flow-seq-start":
          return {
            type: "flow-collection",
            offset: this.offset,
            indent: this.indent,
            start: this.sourceToken,
            items: [],
            end: []
          };
        case "seq-item-ind":
          return {
            type: "block-seq",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken] }]
          };
        case "explicit-key-ind": {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          start.push(this.sourceToken);
          return {
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start, explicitKey: true }]
          };
        }
        case "map-value-ind": {
          this.onKeyLine = true;
          const prev = getPrevProps(parent);
          const start = getFirstKeyStartProps(prev);
          return {
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start, key: null, sep: [this.sourceToken] }]
          };
        }
      }
      return null;
    }
    atIndentedComment(start, indent) {
      if (this.type !== "comment")
        return false;
      if (this.indent <= indent)
        return false;
      return start.every((st) => st.type === "newline" || st.type === "space");
    }
    *documentEnd(docEnd) {
      if (this.type !== "doc-mode") {
        if (docEnd.end)
          docEnd.end.push(this.sourceToken);
        else
          docEnd.end = [this.sourceToken];
        if (this.type === "newline")
          yield* this.pop();
      }
    }
    *lineEnd(token) {
      switch (this.type) {
        case "comma":
        case "doc-start":
        case "doc-end":
        case "flow-seq-end":
        case "flow-map-end":
        case "map-value-ind":
          yield* this.pop();
          yield* this.step();
          break;
        case "newline":
          this.onKeyLine = false;
        // fallthrough
        case "space":
        case "comment":
        default:
          if (token.end)
            token.end.push(this.sourceToken);
          else
            token.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
      }
    }
  }
  parser.Parser = Parser;
  return parser;
}
var publicApi = {};
var hasRequiredPublicApi;
function requirePublicApi() {
  if (hasRequiredPublicApi) return publicApi;
  hasRequiredPublicApi = 1;
  var composer2 = requireComposer();
  var Document2 = requireDocument();
  var errors2 = requireErrors();
  var log2 = requireLog();
  var identity2 = requireIdentity();
  var lineCounter2 = requireLineCounter();
  var parser2 = requireParser();
  function parseOptions(options) {
    const prettyErrors = options.prettyErrors !== false;
    const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter2.LineCounter() || null;
    return { lineCounter: lineCounter$1, prettyErrors };
  }
  function parseAllDocuments(source, options = {}) {
    const { lineCounter: lineCounter3, prettyErrors } = parseOptions(options);
    const parser$1 = new parser2.Parser(lineCounter3?.addNewLine);
    const composer$1 = new composer2.Composer(options);
    const docs = Array.from(composer$1.compose(parser$1.parse(source)));
    if (prettyErrors && lineCounter3)
      for (const doc of docs) {
        doc.errors.forEach(errors2.prettifyError(source, lineCounter3));
        doc.warnings.forEach(errors2.prettifyError(source, lineCounter3));
      }
    if (docs.length > 0)
      return docs;
    return Object.assign([], { empty: true }, composer$1.streamInfo());
  }
  function parseDocument(source, options = {}) {
    const { lineCounter: lineCounter3, prettyErrors } = parseOptions(options);
    const parser$1 = new parser2.Parser(lineCounter3?.addNewLine);
    const composer$1 = new composer2.Composer(options);
    let doc = null;
    for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
      if (!doc)
        doc = _doc;
      else if (doc.options.logLevel !== "silent") {
        doc.errors.push(new errors2.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
        break;
      }
    }
    if (prettyErrors && lineCounter3) {
      doc.errors.forEach(errors2.prettifyError(source, lineCounter3));
      doc.warnings.forEach(errors2.prettifyError(source, lineCounter3));
    }
    return doc;
  }
  function parse(src, reviver, options) {
    let _reviver = void 0;
    if (typeof reviver === "function") {
      _reviver = reviver;
    } else if (options === void 0 && reviver && typeof reviver === "object") {
      options = reviver;
    }
    const doc = parseDocument(src, options);
    if (!doc)
      return null;
    doc.warnings.forEach((warning) => log2.warn(doc.options.logLevel, warning));
    if (doc.errors.length > 0) {
      if (doc.options.logLevel !== "silent")
        throw doc.errors[0];
      else
        doc.errors = [];
    }
    return doc.toJS(Object.assign({ reviver: _reviver }, options));
  }
  function stringify2(value, replacer, options) {
    let _replacer = null;
    if (typeof replacer === "function" || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
    }
    if (typeof options === "string")
      options = options.length;
    if (typeof options === "number") {
      const indent = Math.round(options);
      options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
    }
    if (value === void 0) {
      const { keepUndefined } = options ?? replacer ?? {};
      if (!keepUndefined)
        return void 0;
    }
    if (identity2.isDocument(value) && !_replacer)
      return value.toString(options);
    return new Document2.Document(value, _replacer, options).toString(options);
  }
  publicApi.parse = parse;
  publicApi.parseAllDocuments = parseAllDocuments;
  publicApi.parseDocument = parseDocument;
  publicApi.stringify = stringify2;
  return publicApi;
}
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  var composer2 = requireComposer();
  var Document2 = requireDocument();
  var Schema2 = requireSchema();
  var errors2 = requireErrors();
  var Alias2 = requireAlias();
  var identity2 = requireIdentity();
  var Pair2 = requirePair();
  var Scalar2 = requireScalar();
  var YAMLMap2 = requireYAMLMap();
  var YAMLSeq2 = requireYAMLSeq();
  var cst2 = requireCst();
  var lexer2 = requireLexer();
  var lineCounter2 = requireLineCounter();
  var parser2 = requireParser();
  var publicApi2 = requirePublicApi();
  var visit2 = requireVisit();
  dist.Composer = composer2.Composer;
  dist.Document = Document2.Document;
  dist.Schema = Schema2.Schema;
  dist.YAMLError = errors2.YAMLError;
  dist.YAMLParseError = errors2.YAMLParseError;
  dist.YAMLWarning = errors2.YAMLWarning;
  dist.Alias = Alias2.Alias;
  dist.isAlias = identity2.isAlias;
  dist.isCollection = identity2.isCollection;
  dist.isDocument = identity2.isDocument;
  dist.isMap = identity2.isMap;
  dist.isNode = identity2.isNode;
  dist.isPair = identity2.isPair;
  dist.isScalar = identity2.isScalar;
  dist.isSeq = identity2.isSeq;
  dist.Pair = Pair2.Pair;
  dist.Scalar = Scalar2.Scalar;
  dist.YAMLMap = YAMLMap2.YAMLMap;
  dist.YAMLSeq = YAMLSeq2.YAMLSeq;
  dist.CST = cst2;
  dist.Lexer = lexer2.Lexer;
  dist.LineCounter = lineCounter2.LineCounter;
  dist.Parser = parser2.Parser;
  dist.parse = publicApi2.parse;
  dist.parseAllDocuments = publicApi2.parseAllDocuments;
  dist.parseDocument = publicApi2.parseDocument;
  dist.stringify = publicApi2.stringify;
  dist.visit = visit2.visit;
  dist.visitAsync = visit2.visitAsync;
  return dist;
}
var distExports = requireDist();
function releaseChannel(url) {
  if (url.protocol !== "https:" || url.username || url.password || url.port) return;
  return /^blume-dlv-runtime-[a-z0-9][a-z0-9-]{0,40}\.(release|canary)\.blume-codes\.com$/.exec(url.hostname)?.[1];
}
const URL_FIELDS = /* @__PURE__ */ new Set(["url", "receiptUrl", "thumbUrl", "captureUrl"]);
const evidencePath = /^\/evidence\/[a-f0-9-]{36}\/[a-f0-9-]{36}\/(?:[a-f0-9-]{36}|receipt)$/;
function channelEvidenceUrl(value, endpoint) {
  if (!value.startsWith("https://blume-dlv-runtime-")) return;
  let current;
  let saved;
  try {
    current = new URL(endpoint);
    saved = new URL(value);
  } catch {
    return;
  }
  const channel = releaseChannel(current);
  if (!channel || saved.origin === current.origin || releaseChannel(saved) !== channel) return;
  if (!evidencePath.test(saved.pathname) || !saved.searchParams.get("key")) return;
  return current.origin + saved.pathname + saved.search + saved.hash;
}
function resolveControlEvidenceUrls(response, endpoint) {
  const current = new URL(endpoint);
  if (!releaseChannel(current)) return response;
  const resolve = (value) => channelEvidenceUrl(value, current) ?? value;
  const pending = [response];
  while (pending.length) {
    const item = pending.pop();
    if (!item || typeof item !== "object") continue;
    for (const [key, value] of Object.entries(item)) {
      if (URL_FIELDS.has(key) && typeof value === "string") {
        item[key] = resolve(value);
      } else if (key === "screenshots" && Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
          if (typeof value[index] === "string") value[index] = resolve(value[index]);
          else pending.push(value[index]);
        }
      } else if (value && typeof value === "object") pending.push(value);
    }
  }
  return response;
}
const EVIDENCE_IMAGE_CACHE_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
function recentEvidenceImages(evidence, endpoint, now) {
  const expiresAt = evidence.createdAt + EVIDENCE_IMAGE_CACHE_AGE_MS;
  if (!Number.isFinite(expiresAt) || evidence.createdAt > now || expiresAt <= now) return [];
  const origin = new URL(endpoint).origin;
  const urls = /* @__PURE__ */ new Set();
  const add = (value) => {
    if (typeof value !== "string" || value.length > 8192) return;
    try {
      const url = new URL(channelEvidenceUrl(value, endpoint) ?? value);
      url.hash = "";
      if (url.protocol === "https:" && url.origin === origin && !url.username && !url.password && url.pathname.startsWith("/evidence/")) urls.add(url.href);
    } catch {
    }
  };
  const pending = [evidence];
  while (pending.length) {
    const item = pending.pop();
    if (!item || typeof item !== "object") continue;
    const record = item;
    add(record.url);
    add(record.thumbUrl);
    add(record.captureUrl);
    for (const [key, value] of Object.entries(record)) {
      if (key === "screenshots" && Array.isArray(value)) for (const image of value) add(image);
      if (value && typeof value === "object") pending.push(value);
    }
  }
  return [...urls].map((url) => ({ url, expiresAt }));
}
class GitHubReadError extends Error {
  constructor(message, status, retryAt, denied) {
    super(message);
    this.name = "GitHubReadError";
    this.status = status;
    if (retryAt !== void 0) this.retryAt = retryAt;
    if (denied) this.denied = true;
  }
}
function lastPageOf(link) {
  const last = /<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/.exec(link ?? "");
  return last ? Math.max(1, Number(last[1])) : 1;
}
function githubEndpointShape(path2) {
  const [route, query] = path2.split("?");
  const shape = route.replace(/^\/repos\/[^/]+\/[^/]+/, "/repos/{repo}").replace(/\/[0-9a-f]{40}(?=\/|$)/g, "/{sha}").replace(/\/compare\/[^/]+$/, "/compare/{range}").replace(/\/contents\/.*$/, "/contents/{path}").replace(/\/\d+(?=\/|$)/g, "/{n}");
  const keys = query ? [...new URLSearchParams(query).keys()].filter((key) => key !== "per_page" && key !== "page") : [];
  return `${shape}${keys.length ? `?${keys.join("&")}` : ""}`;
}
const API = "https://api.github.com";
const PATH = /^\/(user(?:\/installations(?:\/\d{1,12}\/repositories)?)?|repos\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.%\-/]*)?)(\?[A-Za-z0-9_.%=&:\-/]*)?$/;
const COMPARE = /^\/repos\/[A-Za-z0-9_-][A-Za-z0-9_.-]*\/[A-Za-z0-9_-][A-Za-z0-9_.-]*\/compare\/[0-9a-f]{40}\.\.\.[0-9a-f]{40}$/;
function createGitHubReader(options) {
  if (!/^[\x21-\x7e]{20,512}$/.test(options.token)) throw new GitHubReadError("GitHub token has an invalid format", 0);
  const cache = /* @__PURE__ */ new Map();
  const limit = {};
  const usage = { billed: 0, notModified: 0, failed: 0, endpoints: {} };
  const count2 = (path2, ...kinds) => {
    const counts = usage.endpoints[githubEndpointShape(path2)] ??= { billed: 0, notModified: 0, failed: 0 };
    for (const kind of kinds) {
      usage[kind]++;
      counts[kind]++;
    }
  };
  let active = 0;
  const waiting = [];
  const acquire = async () => {
    if (active >= (options.maxConcurrent ?? 4)) await new Promise((resolve) => waiting.push(resolve));
    active++;
  };
  const release = () => {
    active--;
    waiting.shift()?.();
  };
  async function get(path2, getOptions = {}) {
    if (!PATH.test(path2) || path2.includes("..") && !COMPARE.test(path2)) throw new GitHubReadError("Unsupported GitHub path", 0);
    const url = new URL(path2, API);
    if (url.origin !== API) throw new GitHubReadError("Unsupported GitHub host", 0);
    if (limit.pausedUntil && options.now() < limit.pausedUntil)
      throw new GitHubReadError("GitHub rate limit reached; waiting before retrying", 429, limit.pausedUntil);
    await acquire();
    try {
      const cached = cache.get(url.href);
      let response;
      try {
        response = await options.fetch(url.href, {
          method: "GET",
          redirect: "error",
          signal: AbortSignal.timeout(options.timeoutMs ?? 15e3),
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${options.token}`,
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "Blume-Deliveries",
            ...cached ? { "If-None-Match": cached.etag } : {}
          }
        });
      } catch {
        count2(path2, "failed");
        throw new GitHubReadError("GitHub could not be reached", 0);
      }
      const now = options.now();
      const remaining = Number(response.headers.get("x-ratelimit-remaining"));
      const reset = Number(response.headers.get("x-ratelimit-reset")) * 1e3;
      const quota = Number(response.headers.get("x-ratelimit-limit"));
      if (response.headers.has("x-ratelimit-remaining") && Number.isFinite(remaining)) limit.remaining = remaining;
      if (Number.isFinite(reset) && reset > 0) limit.resetAt = reset;
      if (Number.isFinite(quota) && quota > 0) limit.limit = quota;
      if (response.status === 304) count2(path2, "notModified");
      else if (response.ok) count2(path2, "billed");
      else count2(path2, "billed", "failed");
      if (response.status === 304 && cached) {
        getOptions.pages?.(response.headers.has("link") ? lastPageOf(response.headers.get("link")) : cached.last);
        return cached.body;
      }
      if (response.status === 403 || response.status === 429) {
        const retryAfter = Number(response.headers.get("retry-after"));
        const reason = response.status === 403 ? await response.text().then((text2) => JSON.parse(text2.slice(0, 4096)).message).catch(() => void 0) : void 0;
        if (response.status === 429 || remaining === 0 || Number.isFinite(retryAfter) && retryAfter > 0 || typeof reason === "string" && /rate limit/i.test(reason)) {
          const until = Math.max(
            now + 6e4,
            remaining === 0 && reset ? reset : 0,
            Number.isFinite(retryAfter) ? now + retryAfter * 1e3 : 0
          );
          limit.pausedUntil = Math.min(until, now + 60 * 6e4);
          throw new GitHubReadError("GitHub rate limit reached; waiting before retrying", 429, limit.pausedUntil);
        }
        if (typeof reason === "string" && /not accessible by integration/i.test(reason))
          throw new GitHubReadError("GitHub denied access: the Blume GitHub App lacks the permission for this read (Resource not accessible by integration)", 403, void 0, true);
        throw new GitHubReadError(
          `GitHub denied access. The token needs read access to this repository.${typeof reason === "string" && reason ? ` (${reason.slice(0, 120)})` : ""}`,
          403,
          void 0,
          // A fine-grained token without this repository says so; anything else (single sign-on,
          // an IP allow list) is left to the person.
          typeof reason === "string" && /not accessible by personal access token/i.test(reason) ? true : void 0
        );
      }
      if (response.status === 401) throw new GitHubReadError("GitHub rejected the token. Reconnect GitHub in Settings.", 401);
      if (response.status === 404) throw new GitHubReadError("Not found, or the token cannot read this repository", 404);
      if (!response.ok) throw new GitHubReadError(`GitHub responded with ${response.status}`, response.status);
      const bodyText = await response.text();
      if (bodyText.length > Math.min(getOptions.maxBytes ?? 4 * 1024 * 1024, 16 * 1024 * 1024)) throw new GitHubReadError("GitHub response is too large", 413);
      let body;
      try {
        body = JSON.parse(bodyText);
      } catch {
        throw new GitHubReadError("GitHub returned an unreadable response", 502);
      }
      if (response.headers.has("x-ratelimit-remaining") && remaining < 25 && reset > now)
        limit.pausedUntil = reset;
      const etag = response.headers.get("etag");
      if (etag && etag.length < 200 && getOptions.cache !== false) {
        cache.delete(url.href);
        cache.set(url.href, { etag, body, last: lastPageOf(response.headers.get("link")) });
        if (cache.size > (options.cacheEntries ?? 500)) cache.delete(cache.keys().next().value);
      }
      getOptions.pages?.(lastPageOf(response.headers.get("link")));
      return body;
    } finally {
      release();
    }
  }
  let graphPausedUntil = 0;
  async function query(document, variables) {
    if (!/^\s*query\b/.test(document) || /\b(mutation|subscription)\b/i.test(document))
      throw new GitHubReadError("Only GraphQL queries are supported", 0);
    if (options.now() < graphPausedUntil)
      throw new GitHubReadError("GitHub GraphQL limit reached; waiting before retrying", 503, graphPausedUntil);
    await acquire();
    try {
      let response;
      try {
        response = await options.fetch(`${API}/graphql`, {
          method: "POST",
          redirect: "error",
          signal: AbortSignal.timeout(options.timeoutMs ?? 15e3),
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${options.token}`,
            "Content-Type": "application/json",
            "User-Agent": "Blume-Deliveries"
          },
          body: JSON.stringify({ query: document, variables })
        });
      } catch {
        throw new GitHubReadError("GitHub could not be reached", 0);
      }
      const now = options.now();
      const reset = Number(response.headers.get("x-ratelimit-reset")) * 1e3;
      const pause = () => {
        graphPausedUntil = Math.min(Math.max(now + 6e4, Number.isFinite(reset) ? reset : 0), now + 60 * 6e4);
        return new GitHubReadError("GitHub GraphQL limit reached; waiting before retrying", 503, graphPausedUntil);
      };
      if (response.status === 401) throw new GitHubReadError("GitHub rejected the token. Reconnect GitHub in Settings.", 401);
      if (response.status === 429 || response.status === 403 && (response.headers.get("x-ratelimit-remaining") === "0" || response.headers.has("retry-after")))
        throw pause();
      if (response.status === 403) throw new GitHubReadError("GitHub denied the GraphQL read. The token needs read access to this repository.", 403);
      if (!response.ok) throw new GitHubReadError(`GitHub responded with ${response.status}`, response.status);
      const bodyText = await response.text();
      if (bodyText.length > 1024 * 1024) throw new GitHubReadError("GitHub response is too large", 413);
      let body;
      try {
        body = JSON.parse(bodyText);
      } catch {
        throw new GitHubReadError("GitHub returned an unreadable response", 502);
      }
      if (Array.isArray(body.errors) && body.errors.length) {
        if (body.errors.some((error) => error?.type === "RATE_LIMITED")) throw pause();
        const reason = typeof body.errors[0]?.message === "string" ? body.errors[0].message.slice(0, 120) : "";
        throw new GitHubReadError(`GitHub could not answer the query${reason ? ` (${reason})` : ""}`, 502);
      }
      return body.data;
    } finally {
      release();
    }
  }
  return {
    get,
    query,
    rateLimit: () => ({ ...limit }),
    usage: () => ({
      ...usage,
      endpoints: Object.fromEntries(Object.entries(usage.endpoints).map(([key, counts]) => [key, { ...counts }]))
    })
  };
}
const PULL_REQUEST_CONTENT_LIMITS = {
  /** The description kept, in UTF-8 bytes. */
  bodyBytes: 64 * 1024,
  /** GitHub lists at most 3,000 files of a pull request, 100 a page. */
  files: 3e3,
  filesPerPage: 100,
  /** One file's patch kept, and all of a pull request's patches together, in UTF-8 bytes. */
  patchBytes: 1024 * 1024,
  patchesBytes: 8 * 1024 * 1024,
  /** One page of files can carry large patches: past the reader's usual 4 MiB. */
  pageBytes: 16 * 1024 * 1024,
  /** Its reviews and comments together, newest kept; one comment at most. */
  conversationBytes: 256 * 1024,
  commentBytes: 64 * 1024,
  /** Pages of each conversation list read (100 entries a page). */
  conversationPages: 10
};
const SHA = /^[0-9a-f]{40}$/;
function utf8Bytes(value) {
  let bytes = 0;
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code < 128) bytes += 1;
    else if (code < 2048) bytes += 2;
    else if (code >= 55296 && code <= 56319 && i + 1 < value.length && (value.charCodeAt(i + 1) & 64512) === 56320) {
      bytes += 4;
      i++;
    } else bytes += 3;
  }
  return bytes;
}
function capUtf8(value, bytes) {
  const encoded = new TextEncoder().encode(value);
  if (encoded.byteLength <= bytes) return { text: value, truncated: false };
  let end = bytes;
  while (end > 0 && (encoded[end] & 192) === 128) end--;
  return { text: new TextDecoder().decode(encoded.subarray(0, end)), truncated: true };
}
function mapPullRequestBody(pull) {
  const raw = typeof pull?.body === "string" ? pull.body : "";
  const { text: text2, truncated } = capUtf8(raw, PULL_REQUEST_CONTENT_LIMITS.bodyBytes);
  return { body: text2, ...truncated ? { bodyTruncated: true } : {} };
}
const STATUS = {
  added: "added",
  copied: "added",
  removed: "removed",
  renamed: "renamed",
  modified: "modified",
  changed: "modified",
  unchanged: "modified"
};
const count = (value) => Number.isSafeInteger(value) && value >= 0 ? value : 0;
const path = (value) => typeof value === "string" && value.length > 0 ? value.slice(0, 4096) : void 0;
function mapPullRequestFile(raw) {
  const filename = path(raw?.filename);
  if (!filename) return void 0;
  const status = STATUS[String(raw.status ?? "")] ?? "modified";
  const added = count(raw.additions);
  const removed = count(raw.deletions);
  const moved = raw.status === "renamed" || raw.status === "copied";
  const previous = moved ? path(raw.previous_filename) : void 0;
  const patch = typeof raw.patch === "string" ? raw.patch : void 0;
  const lines = added + removed;
  const patchMissing = patch !== void 0 ? void 0 : lines > 0 ? "too-large" : moved ? void 0 : "binary";
  return {
    path: filename,
    status,
    added,
    removed,
    ...previous && previous !== filename ? { previousPath: previous } : {},
    ...patch !== void 0 ? { patch } : {},
    ...patchMissing ? { patchMissing } : {}
  };
}
function createPullRequestFilesMapper() {
  const files = [];
  let budget = PULL_REQUEST_CONTENT_LIMITS.patchesBytes;
  let cut = false;
  return {
    add(page) {
      for (const raw of page) {
        if (files.length >= PULL_REQUEST_CONTENT_LIMITS.files) return;
        const file = mapPullRequestFile(raw);
        if (!file) continue;
        if (file.patch !== void 0) {
          const size = utf8Bytes(file.patch);
          if (size > PULL_REQUEST_CONTENT_LIMITS.patchBytes || size > budget) {
            delete file.patch;
            file.patchMissing = "too-large";
            cut = true;
          } else budget -= size;
        }
        files.push(file);
      }
    },
    result: () => ({ files, cut })
  };
}
async function readPullRequestContentParts(reader, target, now, known) {
  const base = `/repos/${target.owner}/${target.repo}/pulls/${target.number}`;
  const revisionOf = (raw) => {
    const headSha = String(raw?.head?.sha ?? "").toLowerCase();
    if (!SHA.test(headSha)) throw new GitHubReadError("Pull request has no head commit", 502);
    const baseSha = String(raw?.base?.sha ?? "").toLowerCase();
    const baseBranch = typeof raw?.base?.ref === "string" ? raw.base.ref.slice(0, 200) : "";
    return { headSha, ...SHA.test(baseSha) ? { baseSha } : {}, ...baseBranch ? { baseBranch } : {} };
  };
  const same = (a, b) => a.headSha === b.headSha && a.baseSha === b.baseSha && a.baseBranch === b.baseBranch;
  let pull = await reader.get(base);
  let revision = revisionOf(pull);
  let diff;
  for (let attempt = 0; ; attempt++) {
    if (known?.files && same(revision, known)) {
      diff = { files: known.files, changedFiles: known.changedFiles ?? known.files.length, ...known.truncated ? { truncated: true } : {} };
      break;
    }
    diff = await readPullRequestFiles(reader, base, pull);
    const after = await reader.get(base);
    const moved = revisionOf(after);
    pull = after;
    if (same(moved, revision)) break;
    if (attempt > 0) throw new GitHubReadError("The pull request kept moving while Blume read its diff; open it again", 409);
    revision = moved;
  }
  const notes = [];
  let conversation;
  let conversationRead = false;
  try {
    conversation = await readPullRequestConversation(reader, target);
    conversationRead = true;
  } catch (error) {
    if (error instanceof GitHubReadError && (error.status === 401 || error.status === 429)) throw error;
    const reason = error instanceof GitHubReadError ? error.message : "GitHub could not be read";
    conversation = known?.conversation;
    notes.push(conversation ? `Showing the conversation as last read; it could not be read again: ${reason}` : `The conversation could not be read: ${reason}`);
  }
  const updated = Date.parse(String(pull.updated_at ?? ""));
  return {
    conversationRead,
    content: {
      status: "ready",
      pullRequestUrl: target.url,
      ...revision,
      ...mapPullRequestBody(pull),
      ...diff,
      ...conversation ? { conversation } : {},
      ...Number.isFinite(updated) ? { updatedAt: updated } : {},
      ...notes.length ? { message: notes.join(" ").slice(0, 300) } : {},
      fetchedAt: now()
    }
  };
}
async function readPullRequestFiles(reader, base, pull) {
  const changed = Number.isSafeInteger(pull.changed_files) ? pull.changed_files : void 0;
  const { filesPerPage, files: maxFiles, pageBytes } = PULL_REQUEST_CONTENT_LIMITS;
  const mapper = createPullRequestFilesMapper();
  let listed = 0;
  for (let page = 1; listed < maxFiles; page++) {
    if (changed !== void 0 && listed >= changed) break;
    const items = await reader.get(`${base}/files?per_page=${filesPerPage}&page=${page}`, { maxBytes: pageBytes, cache: false });
    const list = Array.isArray(items) ? items : [];
    mapper.add(list);
    listed += list.length;
    if (list.length < filesPerPage) break;
  }
  const { files, cut } = mapper.result();
  const total = changed ?? files.length;
  return { files, changedFiles: total, ...cut || files.length < total ? { truncated: true } : {} };
}
const listOf = (value) => Array.isArray(value) ? value : [];
async function readNewestPages(reader, path2, maxPages) {
  let last = 1;
  const first = listOf(await reader.get(`${path2}?per_page=100&page=1`, { pages: (page) => last = page }));
  if (last <= 1) return { items: first, more: false };
  const newest = Math.max(2, last - maxPages + 1);
  const items = [];
  for (let page = last; page >= newest; page--) items.push(...listOf(await reader.get(`${path2}?per_page=100&page=${page}`)));
  return last <= maxPages ? { items: [...first, ...items], more: false } : { items, more: true };
}
async function readNewestFirst(reader, path2, maxPages) {
  const items = [];
  for (let page = 1; page <= maxPages; page++) {
    const entries = listOf(await reader.get(`${path2}?sort=created&direction=desc&per_page=100&page=${page}`));
    items.push(...entries);
    if (entries.length < 100) return { items, more: false };
  }
  return { items, more: true };
}
const login = (user) => githubLogin(user?.login) ?? "ghost";
const at = (value) => {
  const ms = typeof value === "string" ? Date.parse(value) : NaN;
  return Number.isFinite(ms) ? ms : void 0;
};
const htmlUrl = (value) => typeof value === "string" && /^https:\/\/github\.com\//.test(value) && value.length <= 500 ? value : void 0;
const markdown = (value) => capUtf8(typeof value === "string" ? value : "", PULL_REQUEST_CONTENT_LIMITS.commentBytes).text;
const line = (value) => Number.isSafeInteger(value) && value > 0 ? value : void 0;
const commitOf = (value) => typeof value === "string" && SHA.test(value.toLowerCase()) ? value.toLowerCase() : void 0;
const REVIEW_STATES = {
  APPROVED: "approved",
  CHANGES_REQUESTED: "changes_requested",
  COMMENTED: "commented",
  DISMISSED: "dismissed"
};
function mapPullRequestReview(raw) {
  const state = REVIEW_STATES[String(raw?.state ?? "")];
  if (!state) return void 0;
  const body = markdown(raw.body);
  const submitted = at(raw.submitted_at);
  const commit = commitOf(raw.commit_id);
  const url = htmlUrl(raw.html_url);
  return {
    author: login(raw.user),
    state,
    ...body ? { body } : {},
    ...submitted !== void 0 ? { at: submitted } : {},
    ...commit ? { commit } : {},
    ...url ? { url } : {}
  };
}
function mapPullRequestLineComment(raw) {
  const id = Number.isSafeInteger(raw?.id) ? raw.id : void 0;
  const file = path(raw?.path);
  const created = at(raw?.created_at);
  if (id === void 0 || !file || created === void 0) return void 0;
  const current = line(raw.line);
  const original = line(raw.original_line);
  const reply = Number.isSafeInteger(raw.in_reply_to_id) ? raw.in_reply_to_id : void 0;
  const commit = commitOf(raw.commit_id);
  const url = htmlUrl(raw.html_url);
  const outdated = raw.position === null || raw.position === void 0 && current === void 0;
  return {
    id,
    author: login(raw.user),
    body: markdown(raw.body),
    at: created,
    path: file,
    ...current !== void 0 ? { line: current } : {},
    ...original !== void 0 ? { originalLine: original } : {},
    ...raw.side === "LEFT" || raw.side === "RIGHT" ? { side: raw.side } : {},
    ...reply !== void 0 ? { inReplyTo: reply } : {},
    ...commit ? { commit } : {},
    ...url ? { url } : {},
    ...outdated ? { outdated: true } : {}
  };
}
function mapPullRequestIssueComment(raw) {
  const created = at(raw?.created_at);
  if (created === void 0) return void 0;
  const url = htmlUrl(raw.html_url);
  return { author: login(raw.user), body: markdown(raw.body), at: created, ...url ? { url } : {} };
}
function pullRequestThreads(comments) {
  const threads = /* @__PURE__ */ new Map();
  for (const comment of [...comments].sort((a, b) => a.at - b.at || (a.id ?? 0) - (b.id ?? 0))) {
    const root = comment.inReplyTo ?? comment.id;
    if (root === void 0) continue;
    let thread = threads.get(root);
    if (!thread) {
      thread = { id: root, path: comment.path ?? "", comments: [] };
      threads.set(root, thread);
    }
    thread.comments.push(comment);
    const first = thread.comments[0];
    if (first.line !== void 0) thread.line = first.line;
    else delete thread.line;
    if (first.originalLine !== void 0) thread.originalLine = first.originalLine;
    if (first.side) thread.side = first.side;
    if (first.outdated) thread.outdated = true;
    else delete thread.outdated;
  }
  return [...threads.values()];
}
function mapPullRequestConversation(input) {
  const sizeOfEntry = (value) => new TextEncoder().encode(JSON.stringify(value)).byteLength;
  const entries = [
    ...input.reviews.flatMap((raw) => {
      const value = mapPullRequestReview(raw);
      return value ? [{ kind: "review", value, at: value.at ?? 0, size: sizeOfEntry(value) }] : [];
    }),
    ...input.lineComments.flatMap((raw) => {
      const value = mapPullRequestLineComment(raw);
      return value ? [{ kind: "line", value, at: value.at, size: sizeOfEntry(value) + sizeOfEntry({ id: value.id, path: value.path, line: value.line, originalLine: value.originalLine, side: value.side, outdated: value.outdated, comments: [] }) }] : [];
    }),
    ...input.comments.flatMap((raw) => {
      const value = mapPullRequestIssueComment(raw);
      return value ? [{ kind: "comment", value, at: value.at, size: sizeOfEntry(value) }] : [];
    })
  ];
  let budget = PULL_REQUEST_CONTENT_LIMITS.conversationBytes;
  const kept = [];
  let cut = Boolean(input.more);
  for (const entry of [...entries].sort((a, b) => b.at - a.at)) {
    if (entry.size > budget) {
      cut = true;
      break;
    }
    budget -= entry.size;
    kept.push(entry);
  }
  const oldestFirst = (kind) => kept.filter((entry) => entry.kind === kind).sort((a, b) => a.at - b.at).map((entry) => entry.value);
  return {
    reviews: oldestFirst("review"),
    threads: pullRequestThreads(oldestFirst("line")),
    comments: oldestFirst("comment"),
    ...cut ? { truncated: true } : {}
  };
}
async function readPullRequestConversation(reader, target) {
  const repo = `/repos/${target.owner}/${target.repo}`;
  const pages = PULL_REQUEST_CONTENT_LIMITS.conversationPages;
  const [reviews, lineComments, comments] = await Promise.all([
    readNewestPages(reader, `${repo}/pulls/${target.number}/reviews`, pages),
    readNewestFirst(reader, `${repo}/pulls/${target.number}/comments`, pages),
    readNewestPages(reader, `${repo}/issues/${target.number}/comments`, pages)
  ]);
  return mapPullRequestConversation({
    reviews: reviews.items,
    lineComments: lineComments.items,
    comments: comments.items,
    more: reviews.more || lineComments.more || comments.more
  });
}
function pullRequestContentRequest(value) {
  const input = value ?? {};
  const target = typeof input.pullRequestUrl === "string" && input.pullRequestUrl.length <= 500 ? githubPullFromUrl(input.pullRequestUrl) : void 0;
  const headSha = typeof input.headSha === "string" ? input.headSha.toLowerCase() : "";
  if (!target || !SHA.test(headSha)) throw Error("A GitHub pull request URL and its full head commit are required");
  const updatedAt = Number.isSafeInteger(input.updatedAt) && input.updatedAt > 0 ? input.updatedAt : void 0;
  const baseBranch = typeof input.baseBranch === "string" && input.baseBranch.length > 0 && input.baseBranch.length <= 200 ? input.baseBranch : void 0;
  return { target, headSha, ...updatedAt !== void 0 ? { updatedAt } : {}, ...baseBranch ? { baseBranch } : {} };
}
function pullRequestContentFailure(request, error) {
  if (error instanceof GitHubReadError && (error.status === 429 || error.status === 503))
    return {
      status: "rate-limited",
      ...request,
      message: "GitHub’s rate limit was reached; the diff loads once it resets.",
      ...error.retryAt ? { retryAt: error.retryAt } : {}
    };
  const message = error instanceof GitHubReadError || error instanceof Error && /GitHub/.test(error.message) ? error.message : "GitHub could not be read";
  return { status: "failed", ...request, message: message.slice(0, 300) };
}
const accountChanged = (request) => ({
  status: "failed",
  ...request,
  message: "The GitHub account changed while this was read; open it again."
});
const keyOf = (target, headSha) => `${target.owner.toLowerCase()}/${target.repo.toLowerCase()}#${target.number}@${headSha}`;
const pullRequestContentBytes = (content) => utf8Bytes(content.body ?? "") + (content.files ?? []).reduce((sum, file) => sum + utf8Bytes(file.path) + utf8Bytes(file.patch ?? "") + utf8Bytes(file.previousPath ?? "") + 64, 0) + (content.conversation ? utf8Bytes(JSON.stringify(content.conversation)) : 0);
const sizeOf = pullRequestContentBytes;
function createPullRequestContentLoader(deps) {
  const cache = /* @__PURE__ */ new Map();
  const reading = /* @__PURE__ */ new Map();
  let generation = 0;
  let bytes = 0;
  const maxBytes = deps.maxBytes ?? 64 * 1024 * 1024;
  const maxEntries = deps.maxEntries ?? 40;
  const remember = (key, content, conversationRead) => {
    const size = sizeOf(content);
    if (size > maxBytes) return;
    const old = cache.get(key);
    if (old) {
      cache.delete(key);
      bytes -= old.size;
    }
    cache.set(key, { content, size, conversationRead });
    bytes += size;
    while (cache.size > maxEntries || bytes > maxBytes) {
      const [oldest, entry] = cache.entries().next().value;
      cache.delete(oldest);
      bytes -= entry.size;
    }
  };
  const cached = (key) => {
    const entry = cache.get(key);
    if (!entry) return void 0;
    cache.delete(key);
    cache.set(key, entry);
    return entry;
  };
  return {
    async load(reader, value, options = {}) {
      const { target, headSha, updatedAt, baseBranch } = pullRequestContentRequest(value);
      const request = { pullRequestUrl: target.url, headSha };
      const key = keyOf(target, headSha);
      const entry = cached(key);
      const hit = entry?.content;
      const stale = hit && (updatedAt !== void 0 && (hit.updatedAt === void 0 || updatedAt > hit.updatedAt) || baseBranch !== void 0 && hit.baseBranch !== baseBranch || entry?.conversationRead === false);
      if (hit && !stale) return hit;
      if (!reader) return hit ?? { status: "failed", ...request, message: "Connect GitHub to read this pull request." };
      const token = generation;
      let read = reading.get(key);
      if (!read) {
        const started = readPullRequestContentParts(reader, target, deps.now, hit).then(({ content, conversationRead }) => {
          const answer = content.headSha === headSha ? content : { ...content, message: "GitHub has a newer commit on this pull request than Blume synced; this is that commit’s diff." };
          if (token === generation) {
            if (content.headSha !== headSha) remember(keyOf(target, content.headSha), content, conversationRead);
            remember(key, answer, conversationRead);
          }
          return answer;
        }).catch((error) => {
          const failure = pullRequestContentFailure(request, error);
          return hit ? { ...hit, message: `Showing the last read: ${failure.message}`.slice(0, 300) } : failure;
        }).finally(() => {
          if (reading.get(key) === started) reading.delete(key);
        });
        reading.set(key, started);
        read = started;
      }
      const waitMs = options.waitMs ?? deps.waitMs ?? 3e4;
      let timer;
      const pending = new Promise((resolve) => {
        timer = setTimeout(() => resolve({ status: "loading", ...request }), waitMs);
      });
      try {
        const answer = await Promise.race([read, pending]);
        return token === generation ? answer : accountChanged(request);
      } finally {
        clearTimeout(timer);
      }
    },
    /** Another account, or none: nothing read with the last one is shown again. */
    clear() {
      generation++;
      cache.clear();
      reading.clear();
      bytes = 0;
    },
    size: () => ({ entries: cache.size, bytes })
  };
}
exports.CLOUD_ACCESS_RECONNECT_MESSAGE = CLOUD_ACCESS_RECONNECT_MESSAGE;
exports.CloudAccountFailure = CloudAccountFailure;
exports.CodexRequestRejected = CodexRequestRejected;
exports.DEPLOYMENT_DESCRIPTION = DEPLOYMENT_DESCRIPTION;
exports.EVIDENCE_IMAGE_CACHE_AGE_MS = EVIDENCE_IMAGE_CACHE_AGE_MS;
exports.GITHUB_LIMITS = GITHUB_LIMITS;
exports.GITHUB_SYNC_BYTES = GITHUB_SYNC_BYTES;
exports.GitHubReadError = GitHubReadError;
exports.LOCAL_TOOLS_OPERATION = LOCAL_TOOLS_OPERATION;
exports.OWNED_CHAT_IMAGE_LIMITS = OWNED_CHAT_IMAGE_LIMITS;
exports.OWNED_CHAT_OPERATION = OWNED_CHAT_OPERATION;
exports.OWNED_CLOUD_FILES_OPERATION = OWNED_CLOUD_FILES_OPERATION;
exports.OWNED_CLOUD_SUBSCRIPTION_OPERATION = OWNED_CLOUD_SUBSCRIPTION_OPERATION;
exports.OWNED_DIRECT_ACTIONS = OWNED_DIRECT_ACTIONS;
exports.OWNED_DIRECT_OPERATION = OWNED_DIRECT_OPERATION;
exports.OWNED_TITLE_EXCERPT = OWNED_TITLE_EXCERPT;
exports.OwnedDirectRejected = OwnedDirectRejected;
exports.accountChanged = accountChanged;
exports.bindOwnedChatProject = bindOwnedChatProject;
exports.channelEvidenceUrl = channelEvidenceUrl;
exports.cloudAccountTokenFailure = cloudAccountTokenFailure;
exports.createGitHubReader = createGitHubReader;
exports.createOwnedCodexChats = createOwnedCodexChats;
exports.createPullRequestContentLoader = createPullRequestContentLoader;
exports.deliveryGitHubRepos = deliveryGitHubRepos;
exports.deploymentVersion = deploymentVersion;
exports.distExports = distExports;
exports.githubPullFromUrl = githubPullFromUrl;
exports.githubRepoFromProject = githubRepoFromProject;
exports.isLocalToolDeviceAction = isLocalToolDeviceAction;
exports.isReviewDecision = isReviewDecision;
exports.latestRuns = latestRuns;
exports.mapPullRequest = mapPullRequest;
exports.pipelineJobs = pipelineJobs;
exports.pullRequestContentFailure = pullRequestContentFailure;
exports.pullRequestContentRequest = pullRequestContentRequest;
exports.pullState = pullState;
exports.readCloudAccountFailure = readCloudAccountFailure;
exports.readOwnedChatModels = readOwnedChatModels;
exports.recentEvidenceImages = recentEvidenceImages;
exports.resolveControlEvidenceUrls = resolveControlEvidenceUrls;
exports.runWorkflows = runWorkflows;
exports.sameRepo = sameRepo;
exports.selectDeploymentRun = selectDeploymentRun;
exports.sniffImageType = sniffImageType;
exports.toolAllowed = toolAllowed;
exports.utf8Bytes = utf8Bytes;
exports.validateCloudFilesRequest = validateCloudFilesRequest;
exports.validateCloudSubscriptionRequest = validateCloudSubscriptionRequest;
exports.validateLocalTool = validateLocalTool;
exports.validateOwnedChatRequest = validateOwnedChatRequest;
//# sourceMappingURL=pullRequestContent-CnL3-kOG.js.map

//# debugId=f4bdab54-84cb-5e8a-b936-7d6f7cb0f0a6
