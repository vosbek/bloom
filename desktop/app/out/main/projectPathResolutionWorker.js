"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="61c13e57-922f-524a-bab3-afa944c3407f")}catch(e){}}();

require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
const insights = require("./insights-CJUxz2Be.js");
require("./useCases-CApkWXtQ.js");
const index = require("./index-DvaJIvS-.js");
require("./desktopSearch-UUzZxN96.js");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("./hash-DCMQIns_.js");
require("./index-UFoqNX7c.js");
require("./identity-C50QOXIb.js");
require("./repositoryKey-CSvrvo7G.js");
require("better-sqlite3");
require("fs");
require("path");
function resolveProjectLocationCandidates(candidates, targetPath) {
  const target = insights.normalizeProjectResolutionPath(targetPath);
  if (!target) return null;
  const match = candidates.flatMap((candidate) => {
    const path = insights.normalizeProjectResolutionPath(candidate.path);
    return path ? [{ ...candidate, path }] : [];
  }).filter((candidate) => insights.projectResolutionPathContains(candidate.path, target)).sort((left, right) => right.path.length - left.path.length)[0];
  if (!match) return null;
  return {
    projectId: match.projectId,
    ...match.workspaceLocationId ? { workspaceLocationId: match.workspaceLocationId } : {}
  };
}
const parentPort = process.parentPort;
function post(message) {
  parentPort?.postMessage(message);
}
parentPort?.once("message", (event) => {
  const request = event.data;
  if (request.type !== "resolve-project-path") return;
  let handle = null;
  try {
    handle = sqliteStorage.openDesktopSqliteSearch(request.dbPath);
    const candidates = index.listDesktopProjectPathResolutionCandidates(
      handle.db,
      request.targetPath
    );
    post({
      type: "resolve-project-path-result",
      id: request.id,
      ok: true,
      resolution: resolveProjectLocationCandidates(candidates, request.targetPath)
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    post({
      type: "resolve-project-path-result",
      id: request.id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack
    });
  } finally {
    handle?.close();
    setImmediate(() => process.exit(0));
  }
});
//# sourceMappingURL=projectPathResolutionWorker.js.map

//# debugId=61c13e57-922f-524a-bab3-afa944c3407f
