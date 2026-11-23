"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3c9d888f-58c6-518a-b238-f8e90b74eab2")}catch(e){}}();

const OFFSET = 0xcbf29ce484222325n;
const PRIME = 0x100000001b3n;
const MASK = 0xffffffffffffffffn;
function fnv1a64Hex(input) {
  let hash = OFFSET;
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    hash ^= BigInt(code & 255);
    hash = hash * PRIME & MASK;
    hash ^= BigInt(code >> 8 & 255);
    hash = hash * PRIME & MASK;
  }
  return hash.toString(16).padStart(16, "0");
}
function normalizePath(input) {
  let p = input.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}
function stableId(prefix, key) {
  return `${prefix}_${fnv1a64Hex(normalizePath(key))}`;
}
function deriveRepoRoot(gitCommonDir, fallback) {
  const normalized = normalizePath(gitCommonDir);
  if (normalized.endsWith("/.git") || normalized === ".git") {
    const parent = normalized.slice(0, -"/.git".length);
    return parent.length ? parent : fallback;
  }
  return fallback;
}
function identify(path, probe) {
  const inputPath = normalizePath(path);
  if (probe.isRepo && probe.gitCommonDir) {
    const gitCommonDir = normalizePath(probe.gitCommonDir);
    const worktreeRoot = normalizePath(probe.worktreeRoot ?? inputPath);
    const repoRoot = probe.repoRoot ? normalizePath(probe.repoRoot) : deriveRepoRoot(gitCommonDir, worktreeRoot);
    const canonicalRemote = probe.canonicalRemote?.trim() || void 0;
    const canonicalKey = canonicalRemote ?? gitCommonDir;
    const projectId2 = stableId("git", canonicalKey);
    const project2 = {
      kind: "git",
      id: projectId2,
      repoRoot,
      gitCommonDir,
      ...canonicalRemote ? { canonicalRemote } : {}
    };
    const isLinked = probe.isLinkedWorktree ?? worktreeRoot !== repoRoot;
    const workspace2 = {
      id: stableId("ws", worktreeRoot),
      projectId: projectId2,
      path: worktreeRoot,
      kind: isLinked ? "worktree" : "repo-root"
    };
    return { project: project2, workspace: workspace2 };
  }
  const projectId = stableId("folder", inputPath);
  const project = { kind: "folder", id: projectId, root: inputPath };
  const workspace = {
    id: stableId("ws", inputPath),
    projectId,
    path: inputPath,
    kind: "folder-root"
  };
  return { project, workspace };
}
function projectRootOf(project) {
  return project.kind === "git" ? project.repoRoot : project.root;
}
function displayNameFor(fields) {
  if (fields.kind === "git" && fields.canonicalRemote) {
    const remote = fields.canonicalRemote.trim().replace(/[?#].*$/, "").replace(/\.git\/?$/i, "");
    const separator = Math.max(remote.lastIndexOf("/"), remote.lastIndexOf(":"));
    const name = separator >= 0 ? remote.slice(separator + 1) : remote;
    if (name) return name;
  }
  const root = fields.root.replace(/[\\/]+$/, "");
  return root.split(/[\\/]/).at(-1) || fields.root;
}
function projectDisplayName(project) {
  return displayNameFor(identityFieldsOf(project));
}
function identityFieldsOf(project) {
  return {
    kind: project.kind,
    root: projectRootOf(project),
    canonicalRemote: project.kind === "git" ? project.canonicalRemote ?? null : null
  };
}
function projectFlowerSeedFor(fields) {
  if (fields.kind === "git" && fields.canonicalRemote?.trim()) return displayNameFor(fields);
  const normalized = fields.root.replace(/\\/g, "/").replace(/\/+$/, "");
  return normalized || "/";
}
exports.fnv1a64Hex = fnv1a64Hex;
exports.identify = identify;
exports.projectDisplayName = projectDisplayName;
exports.projectFlowerSeedFor = projectFlowerSeedFor;
exports.projectRootOf = projectRootOf;
//# sourceMappingURL=identity-C50QOXIb.js.map

//# debugId=3c9d888f-58c6-518a-b238-f8e90b74eab2
