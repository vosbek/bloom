"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="16b61289-f892-5f9d-ad56-d7a7e00a5052")}catch(e){}}();

const CODEX_SUBAGENT_THREAD_SOURCES = ["subagent", "guardian_review"];
function isCodexSubagentThreadSource(source) {
  return source != null && CODEX_SUBAGENT_THREAD_SOURCES.includes(source);
}
const CONVERSATION_STATES = [
  "running",
  "needs-approval",
  "finished",
  "idle",
  "failed",
  "inactive"
];
function isConversationState(value) {
  return typeof value === "string" && CONVERSATION_STATES.includes(value);
}
function shouldReplaceConversationSnapshot(existingLastActivityTs, incomingLastActivityTs) {
  return existingLastActivityTs == null || incomingLastActivityTs >= existingLastActivityTs;
}
function isBlumeOwnedTitle(source) {
  return source === "user" || source === "llm";
}
function isManualOverrideStillCurrent(stateOverrideTurnPosition, latestUserTurnPosition) {
  return stateOverrideTurnPosition !== null && (latestUserTurnPosition === null || latestUserTurnPosition <= stateOverrideTurnPosition);
}
function mergeConversationPersistenceState(existing, incoming) {
  if (!existing) {
    return {
      title: incoming.title,
      providerTitle: incoming.providerTitle,
      titleSource: incoming.titleSource,
      state: incoming.state,
      dismissedAt: incoming.dismissedAt,
      stateOverrideTurnPosition: incoming.stateOverrideTurnPosition
    };
  }
  const manualOverrideStillCurrent = isManualOverrideStillCurrent(
    existing.stateOverrideTurnPosition,
    incoming.latestUserTurnPosition
  );
  return {
    providerTitle: incoming.providerTitleIsSet ? incoming.providerTitle : existing.providerTitle,
    title: isBlumeOwnedTitle(existing.titleSource) ? existing.title : incoming.title !== null ? incoming.title : existing.title,
    titleSource: isBlumeOwnedTitle(existing.titleSource) ? existing.titleSource : incoming.title !== null ? incoming.titleSource : existing.titleSource,
    state: manualOverrideStillCurrent ? existing.state : incoming.state,
    dismissedAt: manualOverrideStillCurrent ? existing.dismissedAt : existing.stateOverrideTurnPosition === null && existing.dismissedAt !== null && existing.dismissedAt >= incoming.lastActivityTs ? existing.dismissedAt : incoming.dismissedAt,
    stateOverrideTurnPosition: manualOverrideStillCurrent ? existing.stateOverrideTurnPosition : incoming.stateOverrideTurnPosition
  };
}
function mergeSkippedConversationState(existing, incoming) {
  const manualOverrideStillCurrent = isManualOverrideStillCurrent(
    existing.stateOverrideTurnPosition,
    incoming.latestUserTurnPosition
  );
  return {
    state: manualOverrideStillCurrent ? existing.state : incoming.state,
    dismissedAt: manualOverrideStillCurrent ? existing.dismissedAt : existing.stateOverrideTurnPosition === null ? existing.dismissedAt : null,
    stateOverrideTurnPosition: manualOverrideStillCurrent ? existing.stateOverrideTurnPosition : null
  };
}
function planConversationTodoListReplacement(lists, nowMs) {
  const byTurn = /* @__PURE__ */ new Map();
  for (const list of lists) byTurn.set(list.userTurnId, list);
  return [...byTurn.values()].map((list, index) => {
    const createdAt = nowMs + index;
    return {
      userTurnId: list.userTurnId,
      sourceEventId: list.sourceEventId ?? null,
      source: list.source ?? "transcript",
      isInferred: list.isInferred ? 1 : 0,
      createdAt,
      updatedAt: createdAt,
      todos: list.todos.map((todo) => ({
        position: todo.position,
        content: todo.content,
        state: todo.state
      }))
    };
  });
}
exports.CODEX_SUBAGENT_THREAD_SOURCES = CODEX_SUBAGENT_THREAD_SOURCES;
exports.CONVERSATION_STATES = CONVERSATION_STATES;
exports.isCodexSubagentThreadSource = isCodexSubagentThreadSource;
exports.isConversationState = isConversationState;
exports.mergeConversationPersistenceState = mergeConversationPersistenceState;
exports.mergeSkippedConversationState = mergeSkippedConversationState;
exports.planConversationTodoListReplacement = planConversationTodoListReplacement;
exports.shouldReplaceConversationSnapshot = shouldReplaceConversationSnapshot;
//# sourceMappingURL=index-UFoqNX7c.js.map

//# debugId=16b61289-f892-5f9d-ad56-d7a7e00a5052
