"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ab49e2d8-32fa-5001-87f0-c8ec71043ee1")}catch(e){}}();

const fs = require("node:fs");
const _n = require("node:path");
function probeGitIdentity(startPath) {
  let dir = _n.resolve(startPath);
  while (true) {
    const candidate = _n.join(dir, ".git");
    if (fs.existsSync(candidate)) {
      try {
        const st = fs.statSync(candidate);
        if (st.isDirectory()) {
          return finalize(dir, candidate, false);
        }
        const contents = fs.readFileSync(candidate, "utf8").trim();
        const match = contents.match(/^gitdir:\s*(.+)$/m);
        if (match) {
          const ref = match[1].trim();
          const gitdir = _n.isAbsolute(ref) ? ref : _n.resolve(dir, ref);
          const commonDir = resolveCommonDir(gitdir);
          return finalize(dir, commonDir, true);
        }
      } catch {
      }
    }
    const parent = _n.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return { isRepo: false };
}
function resolveCommonDir(gitdir) {
  const commonDirFile = _n.join(gitdir, "commondir");
  try {
    if (fs.existsSync(commonDirFile)) {
      const rel = fs.readFileSync(commonDirFile, "utf8").trim();
      return _n.isAbsolute(rel) ? rel : _n.resolve(gitdir, rel);
    }
  } catch {
  }
  return gitdir;
}
function finalize(worktreeRoot, gitCommonDir, isLinkedWorktree) {
  const repoRoot = gitCommonDir.endsWith(`${"/"}.git`) ? _n.dirname(gitCommonDir) : worktreeRoot;
  const canonicalRemote = parseOriginRemote(gitCommonDir);
  return {
    isRepo: true,
    worktreeRoot,
    repoRoot,
    gitCommonDir,
    isLinkedWorktree,
    ...canonicalRemote ? { canonicalRemote } : {}
  };
}
function parseOriginRemote(gitCommonDir) {
  const configPath = _n.join(gitCommonDir, "config");
  let text;
  try {
    text = fs.readFileSync(configPath, "utf8");
  } catch {
    return void 0;
  }
  const lines = text.split(/\r?\n/);
  let inOrigin = false;
  for (const raw of lines) {
    const line = raw.trim();
    const section = line.match(/^\[(.+?)\]$/);
    if (section) {
      inOrigin = /^remote\s+"origin"$/.test(section[1].trim());
      continue;
    }
    if (inOrigin) {
      const url = line.match(/^url\s*=\s*(.+)$/);
      if (url) return url[1].trim();
    }
  }
  return void 0;
}
exports.probeGitIdentity = probeGitIdentity;
//# sourceMappingURL=probe.node-DZT3fHhO.js.map

//# debugId=ab49e2d8-32fa-5001-87f0-c8ec71043ee1
