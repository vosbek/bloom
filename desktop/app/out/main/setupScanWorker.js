"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2045a7ec-7748-59f8-bcc0-8a0e4d0550ca")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const setupScanProtocol = require("./setupScanProtocol-IIuZVeL1.js");
const require$$0 = require("node:crypto");
const fs = require("node:fs");
const require$$0$1 = require("node:fs/promises");
const _n = require("node:path");
require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
require("./userAgentMcp-eMSr23l4.js");
const diff = require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
require("./useCases-CApkWXtQ.js");
require("fs/promises");
require("os");
require("path");
require("./browser-DmfmUSN8.js");
require("./hash-DCMQIns_.js");
const SYNC_FOLDER_MARKER = "folder";
function portablePath(value) {
  return value.replace(/\\/g, "/").replace(/^\.\/+/, "").replace(/^~\/+/, "").replace(/^\/+/, "").replace(/\/{2,}/g, "/").replace(/\/+$/, "");
}
function isArtifactSyncFolder(artifact) {
  return artifact.metadata?.syncTarget === SYNC_FOLDER_MARKER;
}
function sameSyncScope(left, right) {
  return left.scope === right.scope && left.provider === right.provider && left.projectId === right.projectId && left.workspaceLocationId === right.workspaceLocationId;
}
function artifactSyncCovers(container, candidate) {
  if (container.id === candidate.id) return true;
  if (!isArtifactSyncFolder(container) || !sameSyncScope(container, candidate)) return false;
  if (container.source.type === "external" || candidate.source.type === "external") return false;
  const parent = container.source.path ? portablePath(container.source.path) : "";
  const child = candidate.source.path ? portablePath(candidate.source.path) : "";
  return Boolean(parent && child && (child === parent || child.startsWith(`${parent}/`)));
}
function portableSyncArtifact(artifact) {
  const source = artifact.source.type === "external" ? artifact.source : Object.fromEntries(
    Object.entries(artifact.source).filter(([key]) => key !== "runtimePath")
  );
  return {
    id: artifact.id,
    name: artifact.name,
    kind: artifact.kind,
    influence: artifact.influence,
    composition: artifact.composition,
    scope: artifact.scope,
    ...artifact.provider ? { provider: artifact.provider } : {},
    ...artifact.projectId ? { projectId: artifact.projectId } : {},
    ...artifact.workspaceLocationId ? { workspaceLocationId: artifact.workspaceLocationId } : {},
    source,
    ...artifact.metadata ? { metadata: artifact.metadata } : {},
    parserVersion: artifact.parserVersion,
    scannerVersion: artifact.scannerVersion
  };
}
function artifactSyncKey(artifact) {
  return artifact.id;
}
function decideArtifactCloudSyncDirection(input) {
  const remote = input.remote;
  if (!remote) return "upload";
  if (remote.contentHash === input.localHash) return "unchanged";
  const localChanged = input.lastSyncedHash !== void 0 && input.localHash !== input.lastSyncedHash;
  const remoteChanged = input.lastSyncedHash !== void 0 && remote.contentHash !== input.lastSyncedHash;
  if (remoteChanged) return "download";
  return localChanged ? "upload" : "download";
}
function makeUnifiedPatch(displayPath, oldText, newText) {
  const name = displayPath || "file";
  return diff.createTwoFilesPatch(name, name, oldText, newText, "", "", { context: 3 });
}
function sameIdentity(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}
function missing(error) {
  return error?.code === "ENOENT";
}
function unsafePath() {
  return new Error("Artifact sync path changed during an operation.");
}
function createDesktopArtifactSyncFilePort(policy) {
  let operationTail = Promise.resolve();
  const exclusive = async (operation) => {
    const previous = operationTail;
    let release;
    operationTail = new Promise((resolveOperation) => {
      release = resolveOperation;
    });
    await previous;
    const previousCwd = process.cwd();
    try {
      return await operation();
    } finally {
      try {
        process.chdir(previousCwd);
      } finally {
        release();
      }
    }
  };
  const authorized = async (path) => {
    const allowed = await policy.resolveAllowedArtifactSyncPath(path);
    if (!allowed) throw new Error("Artifact sync path is outside the allowed setup roots.");
    return _n.resolve(allowed);
  };
  const enterDirectory = async (path, create) => {
    const canonical = await authorized(path);
    const root = _n.parse(canonical).root;
    process.chdir(root);
    for (const component of _n.relative(root, canonical).split(_n.sep).filter(Boolean)) {
      let before;
      try {
        before = await require$$0$1.lstat(component);
      } catch (error) {
        if (!create || !missing(error)) throw error;
        await require$$0$1.mkdir(component, { mode: 448 });
        before = await require$$0$1.lstat(component);
      }
      if (!before.isDirectory() || before.isSymbolicLink()) throw unsafePath();
      process.chdir(component);
      if (!sameIdentity(before, await require$$0$1.stat("."))) throw unsafePath();
    }
    const [visible, entered, allowedAgain] = await Promise.all([
      require$$0$1.lstat(canonical),
      require$$0$1.stat("."),
      policy.resolveAllowedArtifactSyncPath(canonical)
    ]);
    if (!allowedAgain || _n.resolve(allowedAgain) !== canonical || visible.isSymbolicLink() || !visible.isDirectory() || !sameIdentity(visible, entered)) {
      throw unsafePath();
    }
    return canonical;
  };
  const openVerified = async (path) => {
    const canonical = await authorized(path);
    await enterDirectory(_n.dirname(canonical), false);
    const name = _n.basename(canonical);
    if (!name) throw unsafePath();
    const noFollow = fs.constants.O_NOFOLLOW ?? 0;
    const handle = await require$$0$1.open(name, fs.constants.O_RDONLY | noFollow);
    try {
      const [opened, visible] = await Promise.all([handle.stat(), require$$0$1.lstat(name)]);
      if (visible.isSymbolicLink() || !visible.isFile() || !sameIdentity(opened, visible)) {
        throw unsafePath();
      }
      return handle;
    } catch (error) {
      await handle.close();
      throw error;
    }
  };
  const writeFile = async (path, content) => {
    const canonical = await authorized(path);
    await enterDirectory(_n.dirname(canonical), true);
    const target = _n.basename(canonical);
    if (!target) throw unsafePath();
    const temporary = `.${target}.blume-sync-${require$$0.randomUUID()}.tmp`;
    const noFollow = fs.constants.O_NOFOLLOW ?? 0;
    try {
      const handle = await require$$0$1.open(
        temporary,
        fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | noFollow,
        384
      );
      try {
        const temporaryIdentity2 = await handle.stat();
        const visibleTemporary = await require$$0$1.lstat(temporary);
        if (!sameIdentity(temporaryIdentity2, visibleTemporary)) throw unsafePath();
        await handle.writeFile(content);
        await handle.sync();
      } finally {
        await handle.close();
      }
      const temporaryIdentity = await require$$0$1.lstat(temporary);
      if (temporaryIdentity.isSymbolicLink() || !temporaryIdentity.isFile()) throw unsafePath();
      await require$$0$1.rename(temporary, target);
      if (!sameIdentity(temporaryIdentity, await require$$0$1.lstat(target))) throw unsafePath();
    } finally {
      await require$$0$1.rm(temporary, { force: true }).catch(() => {
      });
    }
  };
  const port = {
    stat: (path) => exclusive(async () => {
      const canonical = await authorized(path);
      await enterDirectory(_n.dirname(canonical), false);
      const value = await require$$0$1.lstat(_n.basename(canonical));
      if (value.isSymbolicLink()) throw unsafePath();
      return { isDirectory: value.isDirectory() };
    }),
    listFiles: (root) => exclusive(async () => {
      const canonicalRoot = await enterDirectory(root, false);
      const files = [];
      const walk = async (displayPath) => {
        const [parentIdentity, entries] = await Promise.all([
          require$$0$1.stat("."),
          require$$0$1.readdir(".", { withFileTypes: true })
        ]);
        entries.sort((left, right) => left.name.localeCompare(right.name));
        for (const entry of entries) {
          const before = await require$$0$1.lstat(entry.name).catch(() => null);
          if (!before || before.isSymbolicLink()) continue;
          if (before.isDirectory()) {
            process.chdir(entry.name);
            if (!sameIdentity(before, await require$$0$1.stat("."))) throw unsafePath();
            await walk(_n.join(displayPath, entry.name));
            process.chdir("..");
            if (!sameIdentity(parentIdentity, await require$$0$1.stat("."))) throw unsafePath();
          } else if (before.isFile()) {
            files.push(_n.join(displayPath, entry.name));
          }
        }
      };
      await walk(canonicalRoot);
      return files;
    }),
    readFile: (path) => exclusive(async () => {
      const handle = await openVerified(path);
      try {
        return await handle.readFile();
      } finally {
        await handle.close();
      }
    }),
    writeFile: (path, content) => exclusive(() => writeFile(path, content)),
    replaceDirectory: (root, files) => exclusive(async () => {
      const canonicalRoot = await authorized(root);
      const canonicalParent = await enterDirectory(_n.dirname(canonicalRoot), true);
      const target = _n.basename(canonicalRoot);
      if (!target) throw unsafePath();
      const suffix = require$$0.randomUUID();
      const temporary = `.${target}.blume-sync-${suffix}.tmp`;
      const backup = `.${target}.blume-sync-${suffix}.bak`;
      await require$$0$1.mkdir(temporary, { mode: 448 });
      const temporaryIdentity = await require$$0$1.lstat(temporary);
      try {
        for (const file of files) {
          await writeFile(_n.join(canonicalParent, temporary, file.path), file.content);
        }
        await enterDirectory(canonicalParent, false);
        const visibleTemporary = await require$$0$1.lstat(temporary);
        if (visibleTemporary.isSymbolicLink() || !visibleTemporary.isDirectory() || !sameIdentity(temporaryIdentity, visibleTemporary)) {
          throw unsafePath();
        }
        await require$$0$1.rm(backup, { recursive: true, force: true });
        let hasBackup = false;
        try {
          await require$$0$1.rename(target, backup);
          hasBackup = true;
        } catch (error) {
          if (!missing(error)) throw error;
        }
        try {
          await require$$0$1.rename(temporary, target);
          if (!sameIdentity(temporaryIdentity, await require$$0$1.lstat(target))) throw unsafePath();
          if (hasBackup) await require$$0$1.rm(backup, { recursive: true, force: true });
        } catch (error) {
          await require$$0$1.rm(target, { recursive: true, force: true });
          if (hasBackup) await require$$0$1.rename(backup, target).catch(() => {
          });
          throw error;
        }
      } finally {
        try {
          await enterDirectory(canonicalParent, false);
          await require$$0$1.rm(temporary, { recursive: true, force: true });
          await require$$0$1.rm(backup, { recursive: true, force: true });
        } catch {
        }
      }
    })
  };
  return port;
}
const MAX_FILES = 2e3;
const MAX_BYTES = 9 * 1024 * 1024;
const MAX_PREVIEW_TEXT_BYTES = 64 * 1024;
function remoteSummaryArtifact(summary) {
  if (!summary.artifact) return null;
  try {
    return remoteArtifact(summary.artifact, summary.id);
  } catch {
    return null;
  }
}
const stateLocks = /* @__PURE__ */ new Map();
async function withStateLock(path, operation) {
  const previous = stateLocks.get(path) ?? Promise.resolve();
  let release;
  const current = new Promise((resolveLock) => {
    release = resolveLock;
  });
  const queued = previous.then(() => current);
  stateLocks.set(path, queued);
  await previous;
  try {
    return await operation();
  } finally {
    release();
    if (stateLocks.get(path) === queued) stateLocks.delete(path);
  }
}
const MAX_PREVIEW_CHANGES = 100;
function runtimePath(artifact) {
  if (artifact.source.type === "external" || !artifact.source.runtimePath) {
    throw new Error(`“${artifact.name}” has no local path to sync.`);
  }
  return _n.resolve(artifact.source.runtimePath);
}
function artifactAtRuntimePath(artifact, path) {
  if (artifact.source.type === "external") throw new Error("External artifacts cannot be placed.");
  return { ...artifact, source: { ...artifact.source, runtimePath: _n.resolve(path) } };
}
function remoteArtifact(value, expectedId) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("This synced item is missing portable placement information.");
  }
  const artifact = value;
  if (artifact.id !== expectedId || typeof artifact.name !== "string" || !artifact.source || artifact.source.type === "external") {
    throw new Error("This synced item has invalid placement information.");
  }
  return portableSyncArtifact(artifact);
}
function isMissingPath(error) {
  return error?.code === "ENOENT" || /ENOENT|not found/i.test(error instanceof Error ? error.message : String(error));
}
function portableRelative(root, path) {
  const value = _n.relative(root, path).split(_n.sep).join("/");
  if (!value || value === "." || value.startsWith("../") || value.includes("/../")) {
    throw new Error("Artifact contains an unsafe path.");
  }
  return value;
}
async function captureSnapshot(artifact, filePort, signal) {
  signal?.throwIfAborted();
  const root = runtimePath(artifact);
  const stat = filePort ? await filePort.stat(root) : await require$$0$1.lstat(root);
  const files = [];
  let bytes = 0;
  const addFile = async (path, relPath) => {
    signal?.throwIfAborted();
    const value = filePort ? Buffer.from(await filePort.readFile(path)) : await require$$0$1.readFile(path);
    bytes += value.byteLength;
    if (bytes > MAX_BYTES) throw new Error("Artifact exceeds the 9 MB sync limit.");
    if (files.length >= MAX_FILES) throw new Error("Artifact exceeds the 2,000-file sync limit.");
    files.push({ path: relPath, data: value.toString("base64") });
  };
  const walk = async (directory) => {
    signal?.throwIfAborted();
    const entries = await require$$0$1.readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const path = _n.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) await addFile(path, portableRelative(root, path));
    }
  };
  const isDirectory = filePort ? stat.isDirectory : stat.isDirectory();
  const kind = isDirectory ? "directory" : "file";
  if (kind === "directory" && filePort) {
    for (const path of (await filePort.listFiles(root)).sort()) {
      await addFile(path, portableRelative(root, path));
    }
  } else if (kind === "directory") await walk(root);
  else await addFile(root, "artifact");
  const snapshot = { version: 1, kind, files };
  return {
    snapshot,
    hash: snapshotHash(snapshot)
  };
}
function snapshotHash(snapshot) {
  return require$$0.createHash("sha256").update(JSON.stringify(snapshot)).digest("hex");
}
function safeSnapshot(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid sync snapshot.");
  const candidate = value;
  if (candidate.version !== 1 || candidate.kind !== "file" && candidate.kind !== "directory" || !Array.isArray(candidate.files)) {
    throw new Error("Unsupported sync snapshot.");
  }
  let bytes = 0;
  const files = candidate.files.map((file) => {
    if (!file || typeof file.path !== "string" || typeof file.data !== "string")
      throw new Error("Invalid sync file.");
    const normalized = file.path.replace(/\\/g, "/");
    if (!normalized || normalized.startsWith("/") || normalized.split("/").includes(".."))
      throw new Error("Unsafe sync file path.");
    bytes += Buffer.byteLength(file.data, "base64");
    if (bytes > MAX_BYTES) throw new Error("Sync snapshot exceeds the size limit.");
    return { path: normalized, data: file.data };
  });
  if (files.length > MAX_FILES) throw new Error("Sync snapshot exceeds the file limit.");
  return { version: 1, kind: candidate.kind, files };
}
function snapshotFiles(snapshot) {
  return new Map(snapshot.files.map((file) => [file.path, file]));
}
function sameFile(left, right) {
  return left?.data === right?.data;
}
function conflictPath(path, revision, occupied) {
  const suffix = `.blume-local-conflict-r${revision}`;
  let candidate = `${path}${suffix}`;
  let copy = 2;
  while (occupied.has(candidate)) candidate = `${path}${suffix}-${copy++}`;
  occupied.add(candidate);
  return candidate;
}
function decodeText(file) {
  const bytes = Buffer.from(file.data, "base64");
  if (bytes.byteLength > 256 * 1024 || bytes.includes(0)) return null;
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}
function previewText(file) {
  if (!file) return { text: "" };
  const bytes = Buffer.from(file.data, "base64");
  if (bytes.byteLength > MAX_PREVIEW_TEXT_BYTES) return { unavailable: "too-large" };
  if (bytes.includes(0)) return { unavailable: "binary" };
  try {
    return { text: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { unavailable: "binary" };
  }
}
function contentPreview(path, before, after) {
  const beforeText = previewText(before);
  const afterText = previewText(after);
  const unavailable = beforeText && "unavailable" in beforeText ? beforeText.unavailable : afterText && "unavailable" in afterText ? afterText.unavailable : void 0;
  if (unavailable) return { previewUnavailable: unavailable };
  return {
    patch: makeUnifiedPatch(
      path,
      beforeText && "text" in beforeText ? beforeText.text : "",
      afterText && "text" in afterText ? afterText.text : ""
    )
  };
}
function mergeTextFiles(baseFile, localFile, remoteFile) {
  if (!baseFile || !localFile || !remoteFile) return null;
  const base = decodeText(baseFile);
  const local = decodeText(localFile);
  const remote = decodeText(remoteFile);
  if (base === null || local === null || remote === null) return null;
  const edit = (variant) => {
    let start = 0;
    while (start < base.length && start < variant.length && base[start] === variant[start]) start++;
    let baseEnd = base.length;
    let variantEnd = variant.length;
    while (baseEnd > start && variantEnd > start && base[baseEnd - 1] === variant[variantEnd - 1]) {
      baseEnd--;
      variantEnd--;
    }
    return { start, end: baseEnd, replacement: variant.slice(start, variantEnd) };
  };
  const localEdit = edit(local);
  const remoteEdit = edit(remote);
  if (localEdit.start === remoteEdit.start && localEdit.end === remoteEdit.end && localEdit.replacement === remoteEdit.replacement) {
    return localFile;
  }
  const localInsertion = localEdit.start === localEdit.end;
  const remoteInsertion = remoteEdit.start === remoteEdit.end;
  const overlaps = localInsertion ? remoteInsertion ? localEdit.start === remoteEdit.start : localEdit.start > remoteEdit.start && localEdit.start < remoteEdit.end : remoteInsertion ? remoteEdit.start > localEdit.start && remoteEdit.start < localEdit.end : localEdit.start < remoteEdit.end && remoteEdit.start < localEdit.end;
  if (overlaps) return null;
  const edits = [localEdit, remoteEdit].sort((left, right) => right.start - left.start);
  let merged = base;
  for (const item of edits) {
    merged = `${merged.slice(0, item.start)}${item.replacement}${merged.slice(item.end)}`;
  }
  return { path: localFile.path, data: Buffer.from(merged).toString("base64") };
}
function reconcileSnapshots(base, local, remote, remoteRevision) {
  if (local.kind === "file" || remote.kind === "file") {
    const localFile = local.files[0];
    const remoteFile = remote.files[0];
    const baseFile = base?.kind === "file" ? base.files[0] : void 0;
    if (sameFile(localFile, remoteFile)) return { snapshot: remote, conflicts: [] };
    if (base && sameFile(localFile, baseFile)) return { snapshot: remote, conflicts: [] };
    if (base && sameFile(remoteFile, baseFile)) return { snapshot: local, conflicts: [] };
    const merged = mergeTextFiles(baseFile, localFile, remoteFile);
    if (merged) {
      return {
        snapshot: { version: 1, kind: "file", files: [merged] },
        conflicts: []
      };
    }
    return {
      snapshot: remote,
      conflicts: [
        { path: "artifact", preservedPath: `artifact.blume-local-conflict-r${remoteRevision}` }
      ],
      ...localFile ? { fileConflict: Buffer.from(localFile.data, "base64") } : {}
    };
  }
  const baseByPath = base?.kind === "directory" ? snapshotFiles(base) : /* @__PURE__ */ new Map();
  const localByPath = snapshotFiles(local);
  const remoteByPath = snapshotFiles(remote);
  const occupied = /* @__PURE__ */ new Set([...baseByPath.keys(), ...localByPath.keys(), ...remoteByPath.keys()]);
  const paths = [...occupied].sort();
  const files = [];
  const conflicts = [];
  for (const path of paths) {
    const baseFile = baseByPath.get(path);
    const localFile = localByPath.get(path);
    const remoteFile = remoteByPath.get(path);
    if (sameFile(localFile, remoteFile)) {
      if (localFile) files.push(localFile);
      continue;
    }
    if (base && sameFile(localFile, baseFile)) {
      if (remoteFile) files.push(remoteFile);
      continue;
    }
    if (base && sameFile(remoteFile, baseFile)) {
      if (localFile) files.push(localFile);
      continue;
    }
    const merged = mergeTextFiles(baseFile, localFile, remoteFile);
    if (merged) {
      files.push(merged);
      continue;
    }
    if (!baseFile && !localFile && remoteFile) {
      files.push(remoteFile);
      continue;
    }
    if (!baseFile && localFile && !remoteFile) {
      files.push(localFile);
      continue;
    }
    if (remoteFile) files.push(remoteFile);
    if (localFile) {
      const preservedPath = conflictPath(path, remoteRevision, occupied);
      files.push({ ...localFile, path: preservedPath });
      conflicts.push({ path, preservedPath });
    } else {
      const preservedPath = conflictPath(`${path}.deleted`, remoteRevision, occupied);
      files.push({
        path: preservedPath,
        data: Buffer.from(`Local deletion conflicted with remote changes to ${path}.
`).toString(
          "base64"
        )
      });
      conflicts.push({ path, preservedPath });
    }
  }
  files.sort((left, right) => left.path.localeCompare(right.path));
  return { snapshot: { version: 1, kind: "directory", files }, conflicts };
}
function snapshotPreviewChanges(local, remote, type) {
  const localFiles = local ? snapshotFiles(local) : /* @__PURE__ */ new Map();
  const remoteFiles = remote ? snapshotFiles(remote) : /* @__PURE__ */ new Map();
  return [.../* @__PURE__ */ new Set([...localFiles.keys(), ...remoteFiles.keys()])].sort().map((path) => {
    const localFile = localFiles.get(path);
    const remoteFile = remoteFiles.get(path);
    const bytes = Buffer.byteLength((localFile ?? remoteFile)?.data ?? "", "base64");
    const before = type === "place" ? localFile : remoteFile;
    const after = type === "place" ? remoteFile : localFile;
    if (!localFile) {
      return {
        path,
        action: "add",
        bytes,
        ...contentPreview(path, before, after)
      };
    }
    if (!remoteFile)
      return {
        path,
        action: type === "place" ? "unchanged" : "add",
        bytes,
        ...type === "place" ? {} : contentPreview(path, before, after)
      };
    if (sameFile(localFile, remoteFile)) return { path, action: "unchanged", bytes };
    return {
      path,
      action: "conflict",
      bytes,
      ...contentPreview(path, before, after)
    };
  });
}
function previewItem(artifact, local, remote, type) {
  const allChanges = snapshotPreviewChanges(local, remote, type);
  const changed = allChanges.filter((change) => change.action !== "unchanged");
  const visibleChanges = changed.slice(0, MAX_PREVIEW_CHANGES);
  const source = local ?? remote;
  return {
    artifactId: artifact.id,
    name: artifact.name,
    kind: source?.kind ?? "file",
    fileCount: source?.files.length ?? 0,
    totalBytes: source?.files.reduce((total, file) => total + Buffer.byteLength(file.data, "base64"), 0) ?? 0,
    changes: visibleChanges,
    omittedChanges: Math.max(0, changed.length - visibleChanges.length),
    addCount: changed.filter((change) => change.action === "add").length,
    updateCount: changed.filter((change) => change.action === "update").length,
    removeCount: changed.filter((change) => change.action === "remove").length,
    conflictCount: changed.filter((change) => change.action === "conflict").length
  };
}
function combinePreview(type, items) {
  return {
    type,
    items,
    fileCount: items.reduce((total, item) => total + item.fileCount, 0),
    totalBytes: items.reduce((total, item) => total + item.totalBytes, 0),
    addCount: items.reduce((total, item) => total + item.addCount, 0),
    updateCount: items.reduce((total, item) => total + item.updateCount, 0),
    removeCount: items.reduce((total, item) => total + item.removeCount, 0),
    conflictCount: items.reduce((total, item) => total + item.conflictCount, 0)
  };
}
async function applySnapshot(artifact, value, filePort, signal) {
  signal?.throwIfAborted();
  const snapshot = safeSnapshot(value);
  const target = runtimePath(artifact);
  if (snapshot.kind === "file") {
    const file = snapshot.files[0];
    if (!file) throw new Error("Synced file is empty.");
    if (filePort) {
      await filePort.writeFile(target, Buffer.from(file.data, "base64"));
      return;
    }
    await require$$0$1.mkdir(_n.dirname(target), { recursive: true });
    const temporary2 = `${target}.blume-sync-${process.pid}-${require$$0.randomUUID()}.tmp`;
    await require$$0$1.writeFile(temporary2, Buffer.from(file.data, "base64"), { mode: 384 });
    await require$$0$1.rename(temporary2, target);
    return;
  }
  if (filePort) {
    await filePort.replaceDirectory(
      target,
      snapshot.files.map((file) => ({
        path: file.path,
        content: Buffer.from(file.data, "base64")
      }))
    );
    return;
  }
  const suffix = `${process.pid}-${require$$0.randomUUID()}`;
  const temporary = `${target}.blume-sync-${suffix}.tmp`;
  const backup = `${target}.blume-sync-${suffix}.bak`;
  await require$$0$1.rm(temporary, { recursive: true, force: true });
  await require$$0$1.mkdir(temporary, { recursive: true });
  for (const file of snapshot.files) {
    signal?.throwIfAborted();
    const destination = _n.resolve(temporary, file.path);
    if (!destination.startsWith(`${_n.resolve(temporary)}${_n.sep}`))
      throw new Error("Unsafe sync destination.");
    await require$$0$1.mkdir(_n.dirname(destination), { recursive: true });
    await require$$0$1.writeFile(destination, Buffer.from(file.data, "base64"), { mode: 384 });
  }
  await require$$0$1.rm(backup, { recursive: true, force: true });
  try {
    await require$$0$1.rename(target, backup);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  try {
    await require$$0$1.rename(temporary, target);
    await require$$0$1.rm(backup, { recursive: true, force: true });
  } catch (error) {
    await require$$0$1.rename(backup, target).catch(() => {
    });
    throw error;
  }
}
async function readState(path) {
  try {
    const value = JSON.parse(await require$$0$1.readFile(path, "utf8"));
    return value.version === 1 && Array.isArray(value.mappings) ? { ...value, ignoredIds: Array.isArray(value.ignoredIds) ? value.ignoredIds : [] } : { version: 1, mappings: [], ignoredIds: [] };
  } catch (error) {
    if (error instanceof SyntaxError || error.code === "ENOENT") {
      return { version: 1, mappings: [], ignoredIds: [] };
    }
    throw error;
  }
}
async function writeState(path, state) {
  await require$$0$1.mkdir(_n.dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}-${require$$0.randomUUID()}.tmp`;
  await require$$0$1.writeFile(temporary, `${JSON.stringify(state, null, 2)}
`, { mode: 384 });
  await require$$0$1.rename(temporary, path);
}
function parseState(value) {
  if (value === null) return { version: 1, mappings: [], ignoredIds: [] };
  try {
    const parsed = JSON.parse(value);
    return parsed.version === 1 && Array.isArray(parsed.mappings) ? { ...parsed, ignoredIds: Array.isArray(parsed.ignoredIds) ? parsed.ignoredIds : [] } : { version: 1, mappings: [], ignoredIds: [] };
  } catch (error) {
    if (error instanceof SyntaxError) return { version: 1, mappings: [], ignoredIds: [] };
    throw error;
  }
}
async function requestJson(url, token, init) {
  const timeout = AbortSignal.timeout(15e3);
  const signal = init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout;
  const response = await fetch(url, {
    ...init,
    signal,
    headers: { accept: "application/json", authorization: `Bearer ${token}`, ...init?.headers }
  });
  if (!response.ok) {
    const body2 = await response.json().catch(() => null);
    throw new Error(body2?.error || `Artifact sync failed (${response.status}).`);
  }
  if (response.status === 204) return void 0;
  const body = await response.text();
  if (!body) return void 0;
  return JSON.parse(body);
}
function createArtifactCloudSyncRuntime(options) {
  if (!options.statePath && !options.stateStore) {
    throw new Error("Artifact sync requires a state path or state store.");
  }
  const stateLockKey = options.stateStore?.key ?? options.statePath;
  const loadState = () => options.stateStore ? options.stateStore.read().then(parseState) : readState(options.statePath);
  const saveState = (state) => options.stateStore ? options.stateStore.write(`${JSON.stringify(state, null, 2)}
`) : writeState(options.statePath, state);
  const baseUrl = (options.baseUrl || "https://sync.blume-codes.com").replace(/\/+$/, "");
  const listRemoteItems = async (token, signal) => {
    const items = [];
    let cursor;
    do {
      const url = new URL(`${baseUrl}/v1/items`);
      if (cursor) url.searchParams.set("cursor", cursor);
      const page = await requestJson(url.href, token, {
        signal
      });
      items.push(...page.items);
      cursor = page.cursor;
    } while (cursor);
    return items;
  };
  const deleteRemoteItem = (id, revision, token, signal) => {
    const url = new URL(`${baseUrl}/v1/items/${encodeURIComponent(id)}`);
    url.searchParams.set("baseRevision", String(revision));
    return requestJson(url.href, token, { method: "DELETE", signal });
  };
  const remoteItem = (id, token, signal) => requestJson(`${baseUrl}/v1/items/${encodeURIComponent(id)}`, token, { signal });
  const uploadSnapshot = (artifact, snapshot, baseRevision, token, signal) => requestJson(
    `${baseUrl}/v1/items/${encodeURIComponent(artifactSyncKey(artifact))}`,
    token,
    {
      method: "PUT",
      signal,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        baseRevision,
        contentHash: snapshotHash(snapshot),
        artifact: portableSyncArtifact(artifact),
        snapshot
      })
    }
  );
  const syncMappings = async (state, token, availableArtifacts = [], signal) => {
    signal?.throwIfAborted();
    const summaries = await listRemoteItems(token, signal);
    const remoteArtifacts = summaries.flatMap((summary) => {
      const artifact = remoteSummaryArtifact(summary);
      return artifact ? [{ summary, artifact }] : [];
    });
    const redundantRemoteIds = /* @__PURE__ */ new Set();
    for (const current of remoteArtifacts) {
      for (const candidate of remoteArtifacts) {
        if (candidate.summary.id === current.summary.id) continue;
        if (!artifactSyncCovers(candidate.artifact, current.artifact)) continue;
        const mutual = artifactSyncCovers(current.artifact, candidate.artifact);
        if (!mutual || candidate.summary.id.localeCompare(current.summary.id) < 0) {
          redundantRemoteIds.add(current.summary.id);
          break;
        }
      }
    }
    for (const id of redundantRemoteIds) {
      const summary = summaries.find((item) => item.id === id);
      if (summary) await deleteRemoteItem(id, summary.revision, token, signal);
    }
    const canonicalRemoteItems = summaries.filter((item) => !redundantRemoteIds.has(item.id));
    const canonicalRemoteArtifacts = remoteArtifacts.filter(
      ({ summary }) => !redundantRemoteIds.has(summary.id)
    );
    const remoteById = new Map(canonicalRemoteItems.map((item) => [item.id, item]));
    state.mappings = state.mappings.filter(
      (mapping) => !canonicalRemoteArtifacts.some(
        ({ summary, artifact }) => summary.id !== artifactSyncKey(mapping.artifact) && artifactSyncCovers(artifact, mapping.artifact)
      )
    );
    const mappedIds = new Set(state.mappings.map((mapping) => artifactSyncKey(mapping.artifact)));
    const ignoredIds = new Set(state.ignoredIds);
    const availableById = new Map(
      availableArtifacts.map((artifact) => [artifactSyncKey(artifact), artifact])
    );
    for (const mapping of state.mappings) {
      signal?.throwIfAborted();
      const available = availableById.get(artifactSyncKey(mapping.artifact));
      if (available) mapping.artifact = available;
    }
    for (const artifact of availableArtifacts) {
      const id = artifactSyncKey(artifact);
      if (remoteById.has(id) && !mappedIds.has(id) && !ignoredIds.has(id)) {
        state.mappings.push({ artifact, revision: 0 });
        mappedIds.add(id);
      }
    }
    for (const mapping of state.mappings) {
      try {
        const id = artifactSyncKey(mapping.artifact);
        const remote = remoteById.get(id);
        let local;
        try {
          local = await captureSnapshot(mapping.artifact, options.filePort, signal);
        } catch (error) {
          if (remote && isMissingPath(error)) {
            mapping.missingOnSystem = true;
            delete mapping.error;
            continue;
          }
          throw error;
        }
        delete mapping.missingOnSystem;
        const direction = remote?.deleted ? "upload" : decideArtifactCloudSyncDirection({
          localHash: local.hash,
          lastSyncedHash: mapping.lastSyncedHash,
          remote
        });
        if (direction === "download" && remote) {
          const body = await remoteItem(id, token, signal);
          const remoteSnapshot = safeSnapshot(body.snapshot);
          const localChanged = mapping.lastSyncedHash === void 0 || local.hash !== mapping.lastSyncedHash;
          const remoteChanged = mapping.lastSyncedHash === void 0 || remote.contentHash !== mapping.lastSyncedHash;
          if (localChanged && remoteChanged) {
            const reconciled = reconcileSnapshots(
              mapping.lastSyncedSnapshot,
              local.snapshot,
              remoteSnapshot,
              remote.revision
            );
            if (reconciled.fileConflict) {
              const target = runtimePath(mapping.artifact);
              const path = `${target}.blume-local-conflict-r${remote.revision}`;
              if (options.filePort) await options.filePort.writeFile(path, reconciled.fileConflict);
              else {
                await require$$0$1.mkdir(_n.dirname(path), { recursive: true });
                await require$$0$1.writeFile(path, reconciled.fileConflict, { mode: 384 });
              }
              reconciled.conflicts = [{ path: _n.basename(target), preservedPath: _n.basename(path) }];
            }
            await applySnapshot(mapping.artifact, reconciled.snapshot, options.filePort, signal);
            const mergedHash = snapshotHash(reconciled.snapshot);
            if (mergedHash !== remote.contentHash) {
              const result = await uploadSnapshot(
                mapping.artifact,
                reconciled.snapshot,
                remote.revision,
                token,
                signal
              );
              mapping.revision = result.revision;
              mapping.lastSyncedHash = result.contentHash;
            } else {
              mapping.revision = remote.revision;
              mapping.lastSyncedHash = remote.contentHash;
            }
            mapping.lastSyncedSnapshot = reconciled.snapshot;
            mapping.conflicts = reconciled.conflicts;
          } else {
            await applySnapshot(mapping.artifact, remoteSnapshot, options.filePort, signal);
            mapping.revision = remote.revision;
            mapping.lastSyncedHash = remote.contentHash;
            mapping.lastSyncedSnapshot = remoteSnapshot;
            delete mapping.conflicts;
          }
        } else if (direction === "upload") {
          const result = await uploadSnapshot(
            mapping.artifact,
            local.snapshot,
            remote?.revision ?? 0,
            token,
            signal
          );
          mapping.revision = result.revision;
          mapping.lastSyncedHash = result.contentHash;
          mapping.lastSyncedSnapshot = local.snapshot;
          delete mapping.conflicts;
        } else if (remote) {
          if (!remote.artifact) {
            const result = await uploadSnapshot(
              mapping.artifact,
              local.snapshot,
              remote.revision,
              token,
              signal
            );
            mapping.revision = result.revision;
            mapping.lastSyncedHash = result.contentHash;
          } else {
            mapping.revision = remote.revision;
            mapping.lastSyncedHash = remote.contentHash;
          }
          mapping.lastSyncedSnapshot = local.snapshot;
        }
        delete mapping.error;
      } catch (error) {
        signal?.throwIfAborted();
        mapping.error = error instanceof Error ? error.message : String(error);
      }
    }
    return canonicalRemoteItems;
  };
  const states = (state, ids, remoteItems = []) => {
    const selected = ids?.length ? new Set(ids) : null;
    const mappedIds = new Set(state.mappings.map((mapping) => artifactSyncKey(mapping.artifact)));
    const ignoredIds = new Set(state.ignoredIds);
    const localStates = state.mappings.filter((mapping) => !selected || selected.has(mapping.artifact.id)).map(
      (mapping) => ({
        artifactId: mapping.artifact.id,
        status: mapping.error ? "error" : "synced",
        revision: mapping.revision,
        artifact: portableSyncArtifact(mapping.artifact),
        ...mapping.artifact.source.type !== "external" && mapping.artifact.source.runtimePath ? { localPath: mapping.artifact.source.runtimePath } : {},
        ...mapping.missingOnSystem ? { missingOnSystem: true } : {},
        ...mapping.error ? { error: mapping.error } : {},
        ...mapping.conflicts?.length ? { conflicts: mapping.conflicts } : {}
      })
    );
    if (selected) return localStates;
    const remoteOnlyStates = remoteItems.flatMap((item) => {
      if (mappedIds.has(item.id) || ignoredIds.has(item.id)) return [];
      const artifact = remoteSummaryArtifact(item);
      return artifact ? [
        {
          artifactId: item.id,
          status: "synced",
          revision: item.revision,
          artifact,
          missingOnSystem: true
        }
      ] : [];
    });
    return [...localStates, ...remoteOnlyStates];
  };
  return {
    async preview(request, token, signal) {
      signal?.throwIfAborted();
      const summaries = await listRemoteItems(token, signal);
      if (request.type === "enable") {
        const items = [];
        for (const artifact2 of request.artifacts) {
          signal?.throwIfAborted();
          const local2 = await captureSnapshot(artifact2, options.filePort, signal);
          const summary2 = summaries.find(
            (item) => item.id === artifactSyncKey(artifact2) && !item.deleted
          );
          const remote2 = summary2 ? safeSnapshot((await remoteItem(summary2.id, token, signal)).snapshot) : void 0;
          items.push(previewItem(artifact2, local2.snapshot, remote2, "enable"));
        }
        return combinePreview("enable", items);
      }
      const summary = summaries.find(
        (item) => item.id === request.placement.artifactId && !item.deleted
      );
      if (!summary) throw new Error("This synced item no longer exists in the cloud.");
      const body = await remoteItem(summary.id, token, signal);
      const artifact = artifactAtRuntimePath(
        remoteArtifact(body.artifact ?? summary.artifact, summary.id),
        request.placement.runtimePath
      );
      const remote = safeSnapshot(body.snapshot);
      let local;
      try {
        local = (await captureSnapshot(artifact, options.filePort, signal)).snapshot;
      } catch (error) {
        if (!isMissingPath(error)) throw error;
      }
      return combinePreview("place", [previewItem(artifact, local, remote, "place")]);
    },
    async listStates(ids, signal) {
      return withStateLock(stateLockKey, async () => {
        signal?.throwIfAborted();
        return states(await loadState(), ids);
      });
    },
    async setSynced(selection, token, signal) {
      return withStateLock(stateLockKey, async () => {
        signal?.throwIfAborted();
        const state = await loadState();
        const selected = new Set(selection.artifacts.map(artifactSyncKey));
        state.mappings = state.mappings.filter(
          (mapping) => !selected.has(artifactSyncKey(mapping.artifact))
        );
        if (selection.enabled) {
          const summaries = await listRemoteItems(token, signal);
          const remoteArtifacts = summaries.flatMap((summary) => {
            const artifact = remoteSummaryArtifact(summary);
            return artifact ? [{ summary, artifact }] : [];
          });
          for (const artifact of selection.artifacts) {
            const coveringRemote = remoteArtifacts.find(
              ({ summary, artifact: remote }) => summary.id !== artifactSyncKey(artifact) && artifactSyncCovers(remote, artifact)
            );
            if (coveringRemote) {
              throw new Error(
                `“${artifact.name}” is already synced as part of “${coveringRemote.artifact.name}”.`
              );
            }
          }
          const descendants = /* @__PURE__ */ new Set();
          for (const artifact of selection.artifacts) {
            for (const mapping of state.mappings) {
              if (artifactSyncKey(mapping.artifact) !== artifactSyncKey(artifact) && artifactSyncCovers(artifact, mapping.artifact)) {
                descendants.add(artifactSyncKey(mapping.artifact));
              }
            }
            for (const { summary, artifact: remote } of remoteArtifacts) {
              if (summary.id !== artifactSyncKey(artifact) && artifactSyncCovers(artifact, remote)) {
                descendants.add(summary.id);
              }
            }
          }
          state.mappings = state.mappings.filter(
            (mapping) => !descendants.has(artifactSyncKey(mapping.artifact))
          );
          state.ignoredIds = state.ignoredIds.filter((id) => !descendants.has(id));
          for (const id of descendants) {
            const summary = summaries.find((item) => item.id === id);
            if (summary) await deleteRemoteItem(id, summary.revision, token, signal);
          }
          state.ignoredIds = state.ignoredIds.filter((id) => !selected.has(id));
          state.mappings.push(...selection.artifacts.map((artifact) => ({ artifact, revision: 0 })));
          await syncMappings(state, token, [], signal);
        } else {
          state.ignoredIds = [.../* @__PURE__ */ new Set([...state.ignoredIds, ...selected])];
        }
        signal?.throwIfAborted();
        await saveState(state);
        return states(
          state,
          selection.artifacts.map((artifact) => artifact.id)
        );
      });
    },
    async placeSynced(placement, token, signal) {
      return withStateLock(stateLockKey, async () => {
        signal?.throwIfAborted();
        const state = await loadState();
        const summaries = await listRemoteItems(token, signal);
        const summary = summaries.find((item) => item.id === placement.artifactId && !item.deleted);
        if (!summary) throw new Error("This synced item no longer exists in the cloud.");
        const body = await remoteItem(placement.artifactId, token, signal);
        const artifact = artifactAtRuntimePath(
          remoteArtifact(body.artifact ?? summary.artifact, placement.artifactId),
          placement.runtimePath
        );
        const remoteSnapshot = safeSnapshot(body.snapshot);
        let local;
        try {
          local = (await captureSnapshot(artifact, options.filePort, signal)).snapshot;
        } catch (error) {
          if (!isMissingPath(error)) throw error;
        }
        const reconciled = local ? reconcileSnapshots(void 0, local, remoteSnapshot, summary.revision) : { snapshot: remoteSnapshot, conflicts: [] };
        if (reconciled.fileConflict) {
          const target = runtimePath(artifact);
          const path = `${target}.blume-local-conflict-r${summary.revision}`;
          if (options.filePort) await options.filePort.writeFile(path, reconciled.fileConflict);
          else {
            await require$$0$1.mkdir(_n.dirname(path), { recursive: true });
            await require$$0$1.writeFile(path, reconciled.fileConflict, { mode: 384 });
          }
          reconciled.conflicts = [{ path: _n.basename(target), preservedPath: _n.basename(path) }];
        }
        await applySnapshot(artifact, reconciled.snapshot, options.filePort, signal);
        const mergedHash = snapshotHash(reconciled.snapshot);
        const result = mergedHash === summary.contentHash ? summary : await uploadSnapshot(artifact, reconciled.snapshot, summary.revision, token, signal);
        state.ignoredIds = state.ignoredIds.filter((id) => id !== placement.artifactId);
        state.mappings = state.mappings.filter(
          (mapping) => artifactSyncKey(mapping.artifact) !== placement.artifactId
        );
        state.mappings.push({
          artifact,
          revision: result.revision,
          lastSyncedHash: result.contentHash,
          lastSyncedSnapshot: reconciled.snapshot,
          ...reconciled.conflicts.length ? { conflicts: reconciled.conflicts } : {}
        });
        signal?.throwIfAborted();
        await saveState(state);
        return states(state, [placement.artifactId], summaries);
      });
    },
    async syncAll(token, availableArtifacts, signal) {
      return withStateLock(stateLockKey, async () => {
        signal?.throwIfAborted();
        const state = await loadState();
        let remoteItems = [];
        if (state.mappings.length > 0 || availableArtifacts?.length) {
          remoteItems = await syncMappings(state, token, availableArtifacts, signal);
        } else {
          remoteItems = (await listRemoteItems(token, signal)).filter((item) => !item.deleted);
        }
        signal?.throwIfAborted();
        await saveState(state);
        return states(state, void 0, remoteItems);
      });
    }
  };
}
const parentPort = process.parentPort;
const SETUP_SCAN_WORKER_HEARTBEAT_INTERVAL_MS = 1e4;
const SETUP_SCAN_WORKER_MAX_QUEUE = 32;
const queue = [];
let active = null;
function post(message) {
  parentPort?.postMessage(message);
}
function serializeError(id, error) {
  const err = error instanceof Error ? error : new Error(String(error));
  return {
    type: "scan-result",
    id,
    ok: false,
    errorMessage: err.message,
    errorName: err.name,
    errorStack: err.stack
  };
}
async function canonicalArtifact(artifact) {
  if (artifact.source.type === "external" || !artifact.source.runtimePath) {
    throw new Error("Artifact sync source is outside the allowed setup roots.");
  }
  const runtimePath2 = await setupScanProtocol.desktopSetupBrowserService.resolveAllowedArtifactSyncPath(
    artifact.source.runtimePath
  );
  if (!runtimePath2) throw new Error("Artifact sync source is outside the allowed setup roots.");
  return { ...artifact, source: { ...artifact.source, runtimePath: runtimePath2 } };
}
async function canonicalSelection(selection) {
  return {
    ...selection,
    artifacts: await Promise.all(selection.artifacts.map(canonicalArtifact))
  };
}
async function canonicalPlacement(placement) {
  const runtimePath2 = await setupScanProtocol.desktopSetupBrowserService.resolveAllowedArtifactSyncPath(
    placement.runtimePath
  );
  if (!runtimePath2) throw new Error("Artifact sync destination is outside the allowed setup roots.");
  return { ...placement, runtimePath: runtimePath2 };
}
async function runNext() {
  if (active || queue.length === 0) return;
  const request = queue.shift();
  if (!request) return;
  const controller = new AbortController();
  active = { request, controller };
  const heartbeat = setInterval(() => {
    post({ type: "heartbeat", id: request.id });
    for (const queued of queue) post({ type: "heartbeat", id: queued.id });
  }, SETUP_SCAN_WORKER_HEARTBEAT_INTERVAL_MS);
  try {
    if (request.type === "scan-global") {
      const setups = await setupScanProtocol.desktopSetupBrowserService.listHarnessSetup();
      post({ type: "global-result", id: request.id, ok: true, setups });
    } else if (request.type === "scan-project") {
      const scan = await setupScanProtocol.desktopSetupBrowserService.scanProject(request.path, {
        signal: controller.signal,
        projectId: request.projectId,
        workspaceLocationId: request.workspaceLocationId
      });
      post({ type: "project-result", id: request.id, ok: true, scan });
    } else if (request.type === "delete-artifact") {
      await setupScanProtocol.desktopSetupBrowserService.deleteArtifact(request.artifact);
      post({ type: "delete-result", id: request.id, ok: true });
    } else {
      const itemCount = request.type === "list-artifact-sync" ? request.artifactIds?.length ?? 0 : request.type === "preview-artifact-sync" ? request.preview.type === "enable" ? request.preview.artifacts.length : 1 : request.availableArtifacts?.length ?? request.selection?.artifacts.length ?? 0;
      setupScanProtocol.assertBoundedArtifactSyncMessage(request, itemCount);
      const runtime = createArtifactCloudSyncRuntime({
        statePath: request.statePath,
        filePort: createDesktopArtifactSyncFilePort(setupScanProtocol.desktopSetupBrowserService),
        ...request.baseUrl ? { baseUrl: request.baseUrl } : {}
      });
      if (request.type === "preview-artifact-sync") {
        const preview = request.preview.type === "enable" ? {
          type: "enable",
          artifacts: await canonicalSelection({
            artifacts: request.preview.artifacts,
            enabled: true
          }).then((selection) => selection.artifacts)
        } : {
          type: "place",
          placement: await canonicalPlacement(request.preview.placement)
        };
        post({
          type: "artifact-sync-preview-result",
          id: request.id,
          ok: true,
          preview: await runtime.preview(preview, request.accessToken, controller.signal)
        });
        return;
      }
      const states = request.type === "list-artifact-sync" ? await runtime.listStates(request.artifactIds, controller.signal) : request.placement ? await runtime.placeSynced(
        await canonicalPlacement(request.placement),
        request.accessToken,
        controller.signal
      ) : request.selection ? await runtime.setSynced(
        await canonicalSelection(request.selection),
        request.accessToken,
        controller.signal
      ) : await runtime.syncAll(
        request.accessToken,
        request.availableArtifacts ? await Promise.all(request.availableArtifacts.map(canonicalArtifact)) : void 0,
        controller.signal
      );
      post({ type: "artifact-sync-result", id: request.id, ok: true, states });
    }
  } catch (error) {
    post(serializeError(request.id, error));
  } finally {
    clearInterval(heartbeat);
    active = null;
    void runNext();
  }
}
function handleMessage(message) {
  if (message.type === "cancel") {
    if (active?.request.id === message.id) {
      active.controller.abort();
      return;
    }
    const index = queue.findIndex((request) => request.id === message.id);
    if (index >= 0) queue.splice(index, 1);
    return;
  }
  if (queue.length + (active ? 1 : 0) >= SETUP_SCAN_WORKER_MAX_QUEUE) {
    post(serializeError(message.id, new Error("setup scan worker queue is full")));
    return;
  }
  queue.push(message);
  void runNext();
}
parentPort?.on("message", (event) => {
  handleMessage(event.data);
});
exports.SETUP_SCAN_WORKER_HEARTBEAT_INTERVAL_MS = SETUP_SCAN_WORKER_HEARTBEAT_INTERVAL_MS;
exports.SETUP_SCAN_WORKER_MAX_QUEUE = SETUP_SCAN_WORKER_MAX_QUEUE;
//# sourceMappingURL=setupScanWorker.js.map

//# debugId=2045a7ec-7748-59f8-bcc0-8a0e4d0550ca
