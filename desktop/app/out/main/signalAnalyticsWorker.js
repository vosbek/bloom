"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9be54274-6b7a-5595-9d78-fabd355c0aa5")}catch(e){}}();

const signalAnalytics = require("./signalAnalytics-CSLxOeHK.js");
const sqliteStorage = require("./sqliteStorage-BNMiEthf.js");
require("better-sqlite3");
require("fs");
require("path");
require("./index-DvaJIvS-.js");
require("./insights-CJUxz2Be.js");
require("./deliveryBriefs-CbTihYeZ.js");
require("./index-UFoqNX7c.js");
require("./hash-DCMQIns_.js");
require("./identity-C50QOXIb.js");
require("./desktopSearch-UUzZxN96.js");
require("./repositoryKey-CSvrvo7G.js");
const parentPort = process.parentPort;
function post(message) {
  parentPort?.postMessage(message);
}
function failure(id, error) {
  const detail = error instanceof Error ? error : new Error(String(error));
  return {
    type: "aggregate-result",
    id,
    ok: false,
    errorMessage: detail.message,
    errorName: detail.name,
    errorStack: detail.stack
  };
}
async function aggregate(request) {
  const handle = sqliteStorage.openDesktopSignalAnalyticsStorage(request.dbPath);
  try {
    return await signalAnalytics.aggregateStoredSignalAnalytics(handle.signalAnalytics, request.signals);
  } finally {
    handle.close();
  }
}
parentPort?.on("message", async (event) => {
  const request = event.data;
  if (request?.type !== "aggregate") return;
  try {
    post({
      type: "aggregate-result",
      id: request.id,
      ok: true,
      summary: await aggregate(request)
    });
  } catch (error) {
    post(failure(request.id, error));
  }
});
//# sourceMappingURL=signalAnalyticsWorker.js.map

//# debugId=9be54274-6b7a-5595-9d78-fabd355c0aa5
