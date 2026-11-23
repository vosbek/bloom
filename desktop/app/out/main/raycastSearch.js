"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="79456f90-0f8b-527c-a7f1-154fbd1203be")}catch(e){}}();

const Nl = require("node:os");
const _n = require("node:path");
const useCases = require("./useCases-CApkWXtQ.js");
const node = require("./node-PFsNYAlg.js");
const deliveryBriefs = require("./deliveryBriefs-CbTihYeZ.js");
require("node:sqlite");
require("node:fs");
require("./desktopSearch-UUzZxN96.js");
const RAYCAST_SEARCH_PROTOCOL_VERSION = 1;
const RAYCAST_SEARCH_MAX_REQUEST_BYTES = 8 * 1024;
const CATEGORY_SET = new Set(deliveryBriefs.GLOBAL_SEARCH_CATEGORIES);
function createRaycastSearchLineFramer(onLine, onOversizedLine) {
  let buffered = Buffer.alloc(0);
  let discarding = false;
  return {
    push(chunk) {
      let offset = 0;
      while (offset < chunk.length) {
        const newline = chunk.indexOf(10, offset);
        const end = newline === -1 ? chunk.length : newline;
        const segment = chunk.subarray(offset, end);
        if (!discarding) {
          if (buffered.length + segment.length > RAYCAST_SEARCH_MAX_REQUEST_BYTES) {
            buffered = Buffer.alloc(0);
            discarding = true;
            onOversizedLine();
          } else if (segment.length > 0) {
            buffered = Buffer.concat([buffered, segment]);
          }
        }
        if (newline === -1) return;
        if (!discarding) {
          const line = buffered.at(-1) === 13 ? buffered.subarray(0, -1) : buffered;
          onLine(line.toString("utf8"));
        }
        buffered = Buffer.alloc(0);
        discarding = false;
        offset = newline + 1;
      }
    },
    end() {
      if (!discarding && buffered.length > 0) onLine(buffered.toString("utf8"));
      buffered = Buffer.alloc(0);
      discarding = false;
    }
  };
}
function createLatestOnlyLineQueue(run, onSuperseded, onRunError = () => void 0) {
  let active = false;
  let pending = null;
  let closing = null;
  const drain = async (initial) => {
    let current = initial;
    try {
      while (current !== null) {
        try {
          await run(current);
        } catch (error) {
          try {
            onRunError(error, current);
          } catch {
          }
        }
        current = pending;
        pending = null;
      }
    } finally {
      active = false;
      const resolveClosing = closing;
      closing = null;
      resolveClosing?.();
    }
  };
  return {
    submit(line) {
      if (active) {
        if (pending !== null) onSuperseded(pending);
        pending = line;
        return;
      }
      active = true;
      void drain(line);
    },
    close() {
      if (!active) return Promise.resolve();
      return new Promise((resolve) => {
        closing = resolve;
      });
    }
  };
}
function requestId(value) {
  if (!Number.isSafeInteger(value) || value < 1) return 0;
  return value;
}
function parseRaycastSearchRequest(line) {
  if (Buffer.byteLength(line, "utf8") > RAYCAST_SEARCH_MAX_REQUEST_BYTES) {
    throw new TypeError("Search request is too large");
  }
  const value = JSON.parse(line);
  if (value.version !== RAYCAST_SEARCH_PROTOCOL_VERSION || value.type !== "search" || requestId(value.id) === 0 || typeof value.query !== "string" || !Array.isArray(value.categories)) {
    throw new TypeError("Invalid Raycast search request");
  }
  const categories = value.categories.filter(
    (category) => typeof category === "string" && CATEGORY_SET.has(category)
  );
  return {
    version: RAYCAST_SEARCH_PROTOCOL_VERSION,
    type: "search",
    id: value.id,
    query: value.query,
    categories
  };
}
const SEARCH_RESULT_LIMIT = 40;
function databasePath() {
  const root = _n.join(Nl.homedir(), ".blume");
  return _n.join(root, "blume.sqlite");
}
function write(response) {
  process.stdout.write(`${JSON.stringify(response)}
`);
}
async function main() {
  const handle = node.openNodeDesktopSqliteSearch(databasePath());
  const search = useCases.createGlobalSearchUseCases(handle.search);
  const run = async (line) => {
    let id = 0;
    try {
      const request = parseRaycastSearchRequest(line);
      id = request.id;
      const page = await search.query({
        query: request.query,
        categories: request.categories,
        limit: SEARCH_RESULT_LIMIT
      });
      write({
        version: RAYCAST_SEARCH_PROTOCOL_VERSION,
        type: "search-result",
        id,
        ok: true,
        page
      });
    } catch (error) {
      write({
        version: RAYCAST_SEARCH_PROTOCOL_VERSION,
        type: "search-result",
        id,
        ok: false,
        error: error instanceof Error ? error.message : "Search failed"
      });
    }
  };
  const supersede = (line) => {
    try {
      const request = parseRaycastSearchRequest(line);
      write({
        version: RAYCAST_SEARCH_PROTOCOL_VERSION,
        type: "search-result",
        id: request.id,
        ok: false,
        error: "Search request superseded"
      });
    } catch {
    }
  };
  const queue = createLatestOnlyLineQueue(run, supersede, (error) => {
    process.stderr.write(
      `Blume Raycast search queue failed: ${error instanceof Error ? error.message : String(error)}
`
    );
  });
  const framer = createRaycastSearchLineFramer(
    (line) => queue.submit(line),
    () => write({
      version: RAYCAST_SEARCH_PROTOCOL_VERSION,
      type: "search-result",
      id: 0,
      ok: false,
      error: "Search request is too large"
    })
  );
  write({
    version: RAYCAST_SEARCH_PROTOCOL_VERSION,
    type: "ready",
    supportedVersions: [RAYCAST_SEARCH_PROTOCOL_VERSION]
  });
  process.stdin.on("data", (chunk) => framer.push(chunk));
  await new Promise((resolve, reject) => {
    process.stdin.once("end", resolve);
    process.stdin.once("error", reject);
  });
  framer.end();
  await queue.close();
  handle.close();
}
void main().catch((error) => {
  process.stderr.write(
    `Blume Raycast search helper failed: ${error instanceof Error ? error.message : String(error)}
`
  );
  process.exitCode = 1;
});
//# sourceMappingURL=raycastSearch.js.map

//# debugId=79456f90-0f8b-527c-a7f1-154fbd1203be
