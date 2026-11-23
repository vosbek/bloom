"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ded4410c-7cf2-5445-bad8-7dfa2d724237")}catch(e){}}();

const Database = require("better-sqlite3");
const un = require("fs");
const pn = require("path");
const index = require("./index-DvaJIvS-.js");
const desktopSearch = require("./desktopSearch-UUzZxN96.js");
const DEFAULT_AGENT_SET_ID = "suggest-flow-v3";
let activeNamespace = DEFAULT_AGENT_SET_ID;
function activeImproveNamespace() {
  return activeNamespace;
}
const DB_BUSY_TIMEOUT_MS = 3e4;
function openDesktopSqliteDatabase(path, options = {}) {
  const busyTimeoutMs = options.busyTimeoutMs ?? DB_BUSY_TIMEOUT_MS;
  un.mkdirSync(pn.dirname(path), { recursive: true });
  const db = new Database(path, { timeout: busyTimeoutMs });
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("synchronous = NORMAL");
  db.pragma(`busy_timeout = ${busyTimeoutMs}`);
  index.runDesktopMigrations({
    exec: (sql) => db.exec(sql),
    prepare(sql) {
      const statement = db.prepare(sql);
      return {
        get: (...params) => statement.get(...params),
        run: (...params) => statement.run(...params)
      };
    },
    pragma: (sql) => db.pragma(sql),
    transaction: (fn) => db.transaction(fn)
  });
  return db;
}
function openDesktopSqliteStorage(path, options = {}) {
  const db = openDesktopSqliteDatabase(path, options);
  return {
    db,
    storage: index.createDesktopSqliteStorage(db, {
      improveNamespace: options.improveNamespace ?? (() => activeImproveNamespace())
    }),
    close() {
      db.close();
    }
  };
}
function openDesktopSqliteSearch(path, options = {}) {
  const busyTimeoutMs = options.busyTimeoutMs ?? DB_BUSY_TIMEOUT_MS;
  const db = new Database(path, {
    readonly: true,
    fileMustExist: true,
    timeout: busyTimeoutMs
  });
  db.pragma("query_only = ON");
  db.pragma(`busy_timeout = ${busyTimeoutMs}`);
  return {
    db,
    search: desktopSearch.createDesktopSearchStore(db),
    close() {
      db.close();
    }
  };
}
function openDesktopSqliteConversationReads(path, options = {}) {
  const busyTimeoutMs = options.busyTimeoutMs ?? DB_BUSY_TIMEOUT_MS;
  const db = new Database(path, {
    readonly: true,
    fileMustExist: true,
    timeout: busyTimeoutMs
  });
  db.pragma("query_only = ON");
  db.pragma(`busy_timeout = ${busyTimeoutMs}`);
  return {
    db,
    conversations: index.createDesktopConversationStore(db),
    sourceCursors: index.createReadOnlySqliteSourceCursorStore(db),
    close() {
      db.close();
    }
  };
}
function openDesktopSignalAnalyticsStorage(path, options = {}) {
  const busyTimeoutMs = options.busyTimeoutMs ?? DB_BUSY_TIMEOUT_MS;
  const db = new Database(path, {
    readonly: true,
    fileMustExist: true,
    timeout: busyTimeoutMs
  });
  db.pragma("query_only = ON");
  db.pragma(`busy_timeout = ${busyTimeoutMs}`);
  return {
    db,
    signalAnalytics: index.createDesktopSignalAnalyticsStore(db),
    close() {
      db.close();
    }
  };
}
function openDesktopSearchIndex(path, options = {}) {
  const busyTimeoutMs = options.busyTimeoutMs ?? DB_BUSY_TIMEOUT_MS;
  const db = new Database(path, { fileMustExist: true, timeout: busyTimeoutMs });
  db.pragma("synchronous = NORMAL");
  db.pragma(`busy_timeout = ${busyTimeoutMs}`);
  return {
    db,
    index: index.createSqliteSearchIndexStore(db),
    close() {
      db.close();
    }
  };
}
exports.DB_BUSY_TIMEOUT_MS = DB_BUSY_TIMEOUT_MS;
exports.activeImproveNamespace = activeImproveNamespace;
exports.openDesktopSearchIndex = openDesktopSearchIndex;
exports.openDesktopSignalAnalyticsStorage = openDesktopSignalAnalyticsStorage;
exports.openDesktopSqliteConversationReads = openDesktopSqliteConversationReads;
exports.openDesktopSqliteDatabase = openDesktopSqliteDatabase;
exports.openDesktopSqliteSearch = openDesktopSqliteSearch;
exports.openDesktopSqliteStorage = openDesktopSqliteStorage;
//# sourceMappingURL=sqliteStorage-BNMiEthf.js.map

//# debugId=ded4410c-7cf2-5445-bad8-7dfa2d724237
