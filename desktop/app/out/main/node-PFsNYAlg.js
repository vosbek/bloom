"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5711896e-05a6-5ed0-9523-c035970c4ace")}catch(e){}}();

const require$$1 = require("node:sqlite");
const fs = require("node:fs");
require("./deliveryBriefs-CbTihYeZ.js");
const desktopSearch = require("./desktopSearch-UUzZxN96.js");
const DEFAULT_BUSY_TIMEOUT_MS = 3e4;
function openNodeDesktopSqliteSearch(path, options = {}) {
  if (!fs.existsSync(path)) throw new Error(`Blume database does not exist: ${path}`);
  const busyTimeoutMs = options.busyTimeoutMs ?? DEFAULT_BUSY_TIMEOUT_MS;
  const db = new require$$1.DatabaseSync(path, { readOnly: true });
  db.exec(`PRAGMA query_only = ON; PRAGMA busy_timeout = ${busyTimeoutMs};`);
  return {
    search: desktopSearch.createDesktopSearchStore(db),
    close: () => db.close()
  };
}
async function openNodeOwnedChatStore(path) {
  const { createSqlOwnedChatStore } = await Promise.resolve().then(() => require("./index-Cytx1m6a.js"));
  const { createAsyncSql } = await Promise.resolve().then(() => require("./index-DvaJIvS-.js"));
  const db = new require$$1.DatabaseSync(path);
  db.exec("PRAGMA busy_timeout = 5000;");
  return { store: createSqlOwnedChatStore(createAsyncSql(db)), close: () => db.close() };
}
async function openNodeCloudChatStore(path) {
  const { createSqlCloudChatStore } = await Promise.resolve().then(() => require("./index-Cytx1m6a.js"));
  const { createAsyncSql } = await Promise.resolve().then(() => require("./index-DvaJIvS-.js"));
  const db = new require$$1.DatabaseSync(path);
  db.exec("PRAGMA busy_timeout = 5000;");
  return { store: createSqlCloudChatStore(createAsyncSql(db)), close: () => db.close() };
}
exports.openNodeCloudChatStore = openNodeCloudChatStore;
exports.openNodeDesktopSqliteSearch = openNodeDesktopSqliteSearch;
exports.openNodeOwnedChatStore = openNodeOwnedChatStore;
//# sourceMappingURL=node-PFsNYAlg.js.map

//# debugId=5711896e-05a6-5ed0-9523-c035970c4ace
