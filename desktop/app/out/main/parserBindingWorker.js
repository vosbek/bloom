"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8a52d53b-71a8-5135-91ac-3a17ea855bf3")}catch(e){}}();

const rustBinding_node = require("./rustBinding.node-BougJ60f.js");
require("node:child_process");
require("node:fs");
require("node:os");
require("node:path");
require("./index-UFoqNX7c.js");
const bindings = /* @__PURE__ */ new Map();
const parentPort = process.parentPort;
function getBinding(binaryPath) {
  let binding = bindings.get(binaryPath);
  if (!binding) {
    binding = rustBinding_node.createSubprocessBinding({ binaryPath });
    bindings.set(binaryPath, binding);
  }
  return binding;
}
function serializeError(id, err) {
  if (err instanceof Error) {
    return {
      type: "parse-result",
      id,
      ok: false,
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack
    };
  }
  return {
    type: "parse-result",
    id,
    ok: false,
    errorMessage: String(err)
  };
}
async function handleRequest(request) {
  if (request.type !== "parse") return;
  let response;
  try {
    const parsed = await getBinding(request.binaryPath).parse(request.input);
    response = {
      type: "parse-result",
      id: request.id,
      ok: true,
      parsed
    };
  } catch (err) {
    response = serializeError(request.id, err);
  }
  parentPort?.postMessage(response);
}
parentPort?.on("message", (event) => {
  void handleRequest(event.data);
});
//# sourceMappingURL=parserBindingWorker.js.map

//# debugId=8a52d53b-71a8-5135-91ac-3a17ea855bf3
