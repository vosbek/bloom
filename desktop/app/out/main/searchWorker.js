"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="de623cbc-759f-5b89-b4c6-d8058775dc70")}catch(e){}}();

const useCases = require("./useCases-CApkWXtQ.js");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("./deliveryBriefs-CbTihYeZ.js");
require("better-sqlite3");
require("fs");
require("path");
require("./index-DvaJIvS-.js");
require("./insights-CJUxz2Be.js");
require("./index-UFoqNX7c.js");
require("./hash-DCMQIns_.js");
require("./identity-C50QOXIb.js");
require("./desktopSearch-UUzZxN96.js");
require("./repositoryKey-CSvrvo7G.js");
const parentPort = process.parentPort;
let handle = null;
let handlePath = null;
let search = null;
let running = null;
function post(message) {
  parentPort?.postMessage(message);
}
function searchFor(dbPath) {
  if (search && handlePath === dbPath) return search;
  handle?.close();
  handle = null;
  search = null;
  handle = sqliteStorage.openDesktopSqliteSearch(dbPath);
  handlePath = dbPath;
  search = useCases.createGlobalSearchUseCases(handle.search);
  return search;
}
async function runSearch(request) {
  running?.abort();
  const controller = new AbortController();
  running = controller;
  try {
    const page = await searchFor(request.dbPath).query(request.input, {
      signal: controller.signal
    });
    if (!controller.signal.aborted) post({ type: "search-result", id: request.id, ok: true, page });
  } catch (error) {
    if (controller.signal.aborted) return;
    const err = error instanceof Error ? error : new Error(String(error));
    post({
      type: "search-result",
      id: request.id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack
    });
  } finally {
    if (running === controller) running = null;
  }
}
parentPort?.on("message", (event) => {
  const request = event.data;
  if (request?.type !== "search") return;
  void runSearch(request);
});
//# sourceMappingURL=searchWorker.js.map

//# debugId=de623cbc-759f-5b89-b4c6-d8058775dc70
