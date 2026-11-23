"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="81c6a8dd-3c26-5cba-936f-b52baae9f108")}catch(e){}}();

const promises = require("fs/promises");
const require$$0 = require("os");
const pn = require("path");
require("neverthrow");
require("./flowerUnlocks-C4stZB4n.js");
require("./index-TxTRDZxy.js");
const browser = require("./browser-DmfmUSN8.js");
require("./userAgentMcp-eMSr23l4.js");
require("diff");
require("./deliveryBriefs-CbTihYeZ.js");
require("./useCases-CApkWXtQ.js");
const desktopSetupBrowserService = new browser.SetupBrowserService({
  home: require$$0.homedir(),
  fs: {
    readdir: promises.readdir,
    readdirEntries: (path) => promises.readdir(path, { withFileTypes: true }),
    stat: promises.stat,
    readFile: (path) => promises.readFile(path, "utf8")
  },
  accessFs: {
    lstat: promises.lstat,
    realpath: promises.realpath,
    readFile: (path) => promises.readFile(path, "utf8"),
    writeFile: (path, content) => promises.writeFile(path, content, "utf8"),
    removeFile: (path) => promises.rm(path, { force: true }),
    removeDirectory: (path) => promises.rm(path, { recursive: true, force: true })
  },
  devFormatFs: { readdir: promises.readdir, stat: promises.stat },
  path: { resolve: pn.resolve, relative: pn.relative, isAbsolute: pn.isAbsolute, dirname: pn.dirname, basename: pn.basename, join: pn.join, sep: pn.sep },
  platform: process.platform
});
const MAX_ARTIFACT_SYNC_ITEMS_PER_MESSAGE = 500;
const MAX_ARTIFACT_SYNC_MESSAGE_BYTES = 1024 * 1024;
function assertBoundedArtifactSyncMessage(value, itemCount) {
  if (itemCount > MAX_ARTIFACT_SYNC_ITEMS_PER_MESSAGE) {
    throw new Error(
      `Artifact sync supports at most ${MAX_ARTIFACT_SYNC_ITEMS_PER_MESSAGE} items per request.`
    );
  }
  if (Buffer.byteLength(JSON.stringify(value), "utf8") > MAX_ARTIFACT_SYNC_MESSAGE_BYTES) {
    throw new Error("Artifact sync request exceeds the 1 MB IPC limit.");
  }
}
exports.assertBoundedArtifactSyncMessage = assertBoundedArtifactSyncMessage;
exports.desktopSetupBrowserService = desktopSetupBrowserService;
//# sourceMappingURL=setupScanProtocol-IIuZVeL1.js.map

//# debugId=81c6a8dd-3c26-5cba-936f-b52baae9f108
