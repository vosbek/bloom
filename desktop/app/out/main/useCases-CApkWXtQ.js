"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bd6897b2-b505-5f34-a250-ccd4d455f20d")}catch(e){}}();

const deliveryBriefs = require("./deliveryBriefs-CbTihYeZ.js");
const CATEGORY_SET = new Set(deliveryBriefs.GLOBAL_SEARCH_CATEGORIES);
const MAX_QUERY_CHARS = 500;
const MAX_CONVERSATION_REF_CHARS = 2e3;
const SHA_PREFIX_PATTERN = /^[0-9a-f]{4,40}$/;
const EXACT_ID_PATTERN = /^(?:\d{2,6}|[0-9a-f]{4,40})$/;
const QUERY_EXACT_ID_PATTERN = /^#?(?:\d{2,6}|(?=[a-f]*\d)[0-9a-f]{4,40})$/;
function exactIdFromGlobalSearchText(query) {
  const value = query.trim().toLowerCase();
  return QUERY_EXACT_ID_PATTERN.test(value) ? value.replace(/^#/, "") : void 0;
}
function normalizeGlobalSearchExactId(value) {
  if (typeof value !== "string") return void 0;
  const id = value.trim().replace(/^#/, "").toLowerCase();
  return EXACT_ID_PATTERN.test(id) ? id : void 0;
}
function normalizeConversationRefs(values) {
  const refs = [];
  const seen = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (typeof value !== "string") continue;
    const ref = value.trim();
    if (!ref || ref.length > MAX_CONVERSATION_REF_CHARS || seen.has(ref)) continue;
    seen.add(ref);
    refs.push(ref);
    if (refs.length === deliveryBriefs.MAX_GLOBAL_SEARCH_SCOPE_IDS) break;
  }
  return refs;
}
function normalizeCommitShas(values) {
  const shas = [];
  const seen = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (typeof value !== "string") continue;
    const sha = value.trim().toLowerCase();
    if (!SHA_PREFIX_PATTERN.test(sha) || seen.has(sha)) continue;
    seen.add(sha);
    shas.push(sha);
    if (shas.length === deliveryBriefs.MAX_GLOBAL_SEARCH_SCOPE_IDS) break;
  }
  return shas;
}
const MAX_SESSION_PART_CHARS = 256;
const HARNESS_PATTERN = /^[a-z0-9._-]{1,64}$/;
function normalizeConversationSessions(sessions) {
  const seen = /* @__PURE__ */ new Set();
  const normalized = [];
  for (const session of sessions) {
    const harness = session.harness.trim().toLowerCase();
    const sessionId = session.sessionId.trim();
    if (!HARNESS_PATTERN.test(harness) || !sessionId || sessionId.length > MAX_SESSION_PART_CHARS)
      continue;
    const key = `${harness}\0${sessionId}`;
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push({ harness, sessionId });
    if (normalized.length === deliveryBriefs.MAX_GLOBAL_SEARCH_SCOPE_IDS) break;
  }
  return normalized;
}
function normalizeHarnesses(harnesses) {
  return [
    ...new Set(
      harnesses.map((harness) => harness.trim().toLowerCase()).filter((harness) => HARNESS_PATTERN.test(harness))
    )
  ].slice(0, 20);
}
const MAX_SEARCH_CURSOR_CHARS = 4e3;
function normalizeGlobalSearchQuery(input) {
  const categories = [];
  const seen = /* @__PURE__ */ new Set();
  for (const category of input.categories) {
    if (!CATEGORY_SET.has(category) || seen.has(category)) continue;
    seen.add(category);
    categories.push(category);
  }
  const query = input.query.trim().slice(0, MAX_QUERY_CHARS);
  const exactId = input.exactId === void 0 ? exactIdFromGlobalSearchText(query) : normalizeGlobalSearchExactId(input.exactId);
  return {
    query,
    categories,
    ...input.conversationRef?.trim() ? { conversationRef: input.conversationRef.trim().slice(0, MAX_CONVERSATION_REF_CHARS) } : {},
    // An empty scope list is kept: it means "nothing matches", not "unscoped".
    ...Array.isArray(input.conversationRefs) ? { conversationRefs: normalizeConversationRefs(input.conversationRefs) } : {},
    ...Array.isArray(input.commitShas) ? { commitShas: normalizeCommitShas(input.commitShas) } : {},
    ...Array.isArray(input.conversationSessions) ? { conversationSessions: normalizeConversationSessions(input.conversationSessions) } : {},
    ...Array.isArray(input.harnesses) && input.harnesses.length ? { harnesses: normalizeHarnesses(input.harnesses) } : {},
    ...exactId ? { exactId } : {},
    ...input.matching === "substring" ? { matching: "substring" } : {},
    // An opaque page cursor; adapters decode and validate their own part of it.
    ...typeof input.after === "string" && input.after.length <= MAX_SEARCH_CURSOR_CHARS ? { after: input.after } : {},
    limit: deliveryBriefs.normalizeGlobalSearchLimit(input.limit)
  };
}
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function isSessionArray(value) {
  return Array.isArray(value) && value.every(
    (item) => item !== null && typeof item === "object" && typeof item.harness === "string" && typeof item.sessionId === "string"
  );
}
function parseGlobalSearchQuery(input, options = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("Invalid global search request");
  }
  const value = input;
  if (typeof value.query !== "string" || !Array.isArray(value.categories) || !value.categories.every((category) => typeof category === "string") || options.unknownCategories !== "drop" && !value.categories.every((category) => CATEGORY_SET.has(category)) || value.conversationRef !== void 0 && typeof value.conversationRef !== "string" || value.conversationRefs !== void 0 && !isStringArray(value.conversationRefs) || value.commitShas !== void 0 && !isStringArray(value.commitShas) || value.conversationSessions !== void 0 && !isSessionArray(value.conversationSessions) || value.harnesses !== void 0 && !isStringArray(value.harnesses) || value.exactId !== void 0 && typeof value.exactId !== "string" || value.after !== void 0 && typeof value.after !== "string" || value.matching !== void 0 && value.matching !== "words" && value.matching !== "substring" || value.limit !== void 0 && (typeof value.limit !== "number" || !Number.isFinite(value.limit))) {
    throw new TypeError("Invalid global search request");
  }
  const scopeSlice = (list) => list.slice(0, deliveryBriefs.MAX_GLOBAL_SEARCH_SCOPE_IDS * 4);
  return normalizeGlobalSearchQuery({
    query: value.query,
    categories: value.categories.filter(
      (category) => CATEGORY_SET.has(category)
    ),
    ...value.conversationRef !== void 0 ? { conversationRef: value.conversationRef } : {},
    ...value.conversationRefs !== void 0 ? { conversationRefs: scopeSlice(value.conversationRefs) } : {},
    ...value.commitShas !== void 0 ? { commitShas: scopeSlice(value.commitShas) } : {},
    ...value.conversationSessions !== void 0 ? {
      conversationSessions: value.conversationSessions.slice(0, deliveryBriefs.MAX_GLOBAL_SEARCH_SCOPE_IDS * 4)
    } : {},
    ...value.harnesses !== void 0 ? { harnesses: value.harnesses.slice(0, 80) } : {},
    ...value.exactId !== void 0 ? { exactId: value.exactId } : {},
    ...value.after !== void 0 ? { after: value.after } : {},
    ...value.matching !== void 0 ? { matching: value.matching } : {},
    ...value.limit !== void 0 ? { limit: value.limit } : {}
  });
}
function isSearchableGlobalSearchQuery(query) {
  if (query.categories.length === 0) return false;
  return query.query.length >= 2 || query.exactId !== void 0 || query.conversationRefs !== void 0 || query.conversationSessions !== void 0 || query.commitShas !== void 0;
}
function createGlobalSearchUseCases(search) {
  return {
    async query(input, options) {
      const normalized = normalizeGlobalSearchQuery(input);
      if (!isSearchableGlobalSearchQuery(normalized)) {
        return { results: [], truncated: false };
      }
      return options ? search.query(normalized, options) : search.query(normalized);
    }
  };
}
exports.createGlobalSearchUseCases = createGlobalSearchUseCases;
exports.parseGlobalSearchQuery = parseGlobalSearchQuery;
//# sourceMappingURL=useCases-CApkWXtQ.js.map

//# debugId=bd6897b2-b505-5f34-a250-ccd4d455f20d
