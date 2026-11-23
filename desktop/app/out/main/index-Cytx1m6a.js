"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f42c0ae8-d3ca-50c7-a3c1-1eb4e3393062")}catch(e){}}();

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const insights = require("./insights-CJUxz2Be.js");
const desktopSearch = require("./desktopSearch-UUzZxN96.js");
require("./deliveryBriefs-CbTihYeZ.js");
require("./index-UFoqNX7c.js");
require("./hash-DCMQIns_.js");
require("./identity-C50QOXIb.js");
function createSqlOwnedChatStore(sql) {
  let ready;
  const initialize = () => ready ??= sql.exec("CREATE TABLE IF NOT EXISTS owned_chat_state (id INTEGER PRIMARY KEY, snapshot TEXT NOT NULL)");
  return {
    async load() {
      await initialize();
      const row = await sql.get("SELECT snapshot FROM owned_chat_state WHERE id = 1", []);
      return row ? JSON.parse(String(row.snapshot)) : null;
    },
    async save(snapshot) {
      const content = JSON.stringify(snapshot);
      if (content.length > 32 * 1024 * 1024) throw Error("Saved chat index is too large");
      await initialize();
      await sql.run("INSERT INTO owned_chat_state (id, snapshot) VALUES (1, ?) ON CONFLICT (id) DO UPDATE SET snapshot = excluded.snapshot", [content]);
    }
  };
}
function createSqlCloudChatStore(sql) {
  let ready;
  const initialize = () => ready ??= sql.exec(
    "CREATE TABLE IF NOT EXISTS cloud_chat_state (id INTEGER PRIMARY KEY, snapshot TEXT NOT NULL)"
  );
  return {
    async load() {
      await initialize();
      const row = await sql.get("SELECT snapshot FROM cloud_chat_state WHERE id = 1", []);
      return row ? JSON.parse(String(row.snapshot)) : null;
    },
    async save(snapshot) {
      const content = JSON.stringify(snapshot);
      if (content.length > 16 * 1024 * 1024) throw Error("Cloud chat index is too large");
      await initialize();
      await sql.run(
        "INSERT INTO cloud_chat_state (id, snapshot) VALUES (1, ?) ON CONFLICT (id) DO UPDATE SET snapshot = excluded.snapshot",
        [content]
      );
    }
  };
}
exports.DEFAULT_TRANSCRIPT_EVENTS_PER_TURN = insights.DEFAULT_TRANSCRIPT_EVENTS_PER_TURN;
exports.INSIGHTS_SCHEMA_VERSION = insights.INSIGHTS_SCHEMA_VERSION;
exports.RESOLVED_SUGGESTIONS_WHERE = insights.RESOLVED_SUGGESTIONS_WHERE;
exports.SCHEMA = insights.SCHEMA;
exports.VISIBLE_SUGGESTIONS_WHERE = insights.VISIBLE_SUGGESTIONS_WHERE;
exports.createReadOnlySqlSourceCursorStore = insights.createReadOnlySqlSourceCursorStore;
exports.createSqlStorage = insights.createSqlStorage;
exports.createSqlWrappedStore = insights.createSqlWrappedStore;
exports.eventsForTurnsCappedSql = insights.eventsForTurnsCappedSql;
exports.improveSearchBackfill = insights.improveSearchBackfill;
exports.improveSearchWhere = insights.improveSearchWhere;
exports.int = insights.int;
exports.intOrNull = insights.intOrNull;
exports.isRecord = insights.isRecord;
exports.json = insights.json;
exports.text = insights.text;
exports.textOrNull = insights.textOrNull;
exports.MAX_SEARCH_TERMS = desktopSearch.MAX_SEARCH_TERMS;
exports.buildFtsMatchExpression = desktopSearch.buildFtsMatchExpression;
exports.escapeLikePattern = desktopSearch.escapeLikePattern;
exports.foldSearchText = desktopSearch.foldSearchText;
exports.ftsColumnExpression = desktopSearch.ftsColumnExpression;
exports.likePatternsForTerms = desktopSearch.likePatternsForTerms;
exports.parseSearchTerms = desktopSearch.parseSearchTerms;
exports.searchExcerpt = desktopSearch.searchExcerpt;
exports.searchRank = desktopSearch.searchRank;
exports.termsMatchText = desktopSearch.termsMatchText;
exports.createSqlCloudChatStore = createSqlCloudChatStore;
exports.createSqlOwnedChatStore = createSqlOwnedChatStore;
//# sourceMappingURL=index-Cytx1m6a.js.map

//# debugId=f42c0ae8-d3ca-50c7-a3c1-1eb4e3393062
