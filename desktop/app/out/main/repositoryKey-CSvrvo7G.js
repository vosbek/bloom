"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3f0d045c-352a-5f39-960b-0724baa293d2")}catch(e){}}();

const desktopSearch = require("./desktopSearch-UUzZxN96.js");
function repositoryMatchKey(identity) {
  const value = identity?.trim();
  if (!value) return null;
  if (value.startsWith("file:")) {
    let path2 = value.replace(/^file:(\/\/)?/, "");
    try {
      const url2 = new URL(value);
      path2 = `${url2.hostname ? `//${url2.hostname}` : ""}${url2.pathname}`;
    } catch {
    }
    try {
      path2 = decodeURIComponent(path2);
    } catch {
    }
    if (/^\/[A-Za-z]:[\\/]/.test(path2)) path2 = path2.slice(1);
    return folderKey(path2.startsWith("/") || /^[A-Za-z]:[\\/]/.test(path2) ? path2 : `/${path2}`);
  }
  if (value.startsWith("/") || /^[A-Za-z]:[\\/]/.test(value) || value.startsWith("\\\\"))
    return folderKey(value);
  let host;
  let path;
  const url = /^[a-z][a-z\d+.-]*:\/\/(?:[^@/]*@)?([^/:]+)(?::\d+)?\/(.+)$/i.exec(value);
  const scp = /^(?:[^@\s/]+@)?([^:/\s]+):(?!\/)(.+)$/.exec(value);
  const bare = /^([a-z0-9.-]+\.[a-z]{2,})\/(.+)$/i.exec(value);
  if (url) [, host, path] = url;
  else if (scp) [, host, path] = scp;
  else if (bare) [, host, path] = bare;
  else return null;
  path = path.replace(/[?#].*$/, "").replace(/\/+$/, "").replace(/\.git$/i, "").replace(/^\/+/, "");
  if (!path) return null;
  return `git:${host.toLowerCase()}/${path.toLowerCase()}`;
}
function folderKey(path) {
  const normalized = desktopSearch.normalizePathSeparators(path).replace(/^[a-z]:/, (drive) => drive.toUpperCase()).replace(/^\/\/[^/]+/, (host) => {
    try {
      const canonical = new URL(`file:${host}/`).hostname;
      return canonical ? `//${canonical}` : "";
    } catch {
      return host.toLowerCase();
    }
  });
  return `path:${normalized.replace(/\/+$/, "") || "/"}`;
}
function windowsFolderMatchKey(identity) {
  const key = repositoryMatchKey(identity);
  return key && /^path:(?:[A-Z]:\/|\/\/)/.test(key) ? key.toLowerCase() : null;
}
exports.repositoryMatchKey = repositoryMatchKey;
exports.windowsFolderMatchKey = windowsFolderMatchKey;
//# sourceMappingURL=repositoryKey-CSvrvo7G.js.map

//# debugId=3f0d045c-352a-5f39-960b-0724baa293d2
