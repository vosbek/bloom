"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8423a435-f1f6-5c66-83bb-9f5b1ee9acf1")}catch(e){}}();

const SIGNAL_TYPES = ["correction", "steering", "frustration"];
function emptyCounts() {
  return { correction: 0, steering: 0, frustration: 0 };
}
function emptyAuditCheckCounts() {
  return { found: 0, promoted: 0, suggested: 0, applied: 0, dismissed: 0 };
}
function utcDay(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10);
}
function evidenceTurns(signal) {
  try {
    const parsed = JSON.parse(signal.evidenceJson);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const evidence = entry;
      if (evidence.role !== void 0 && evidence.role !== "user") return [];
      return typeof evidence.turn === "number" && Number.isSafeInteger(evidence.turn) && evidence.turn >= 0 ? [evidence.turn] : [];
    });
  } catch {
    return [];
  }
}
function aggregateSignalAnalytics(turns, signals, auditEvents = []) {
  const turnByKey = /* @__PURE__ */ new Map();
  const daily = /* @__PURE__ */ new Map();
  const allAffected = /* @__PURE__ */ new Set();
  const affectedByType = {
    correction: /* @__PURE__ */ new Set(),
    steering: /* @__PURE__ */ new Set(),
    frustration: /* @__PURE__ */ new Set()
  };
  const signalCounts = emptyCounts();
  const dayMetric = (periodStart) => {
    let metric = daily.get(periodStart);
    if (!metric) {
      metric = {
        periodStart,
        totalTurns: 0,
        turnsWithAnySignal: 0,
        signalCounts: emptyCounts(),
        affectedTurnCounts: emptyCounts(),
        auditCheckCounts: {}
      };
      daily.set(periodStart, metric);
    }
    return metric;
  };
  for (const turn of turns) {
    const key = `${turn.conversationId}:${turn.position}`;
    turnByKey.set(key, turn);
    if (turn.occurredAt !== null && Number.isFinite(turn.occurredAt)) {
      dayMetric(utcDay(turn.occurredAt)).totalTurns += 1;
    }
  }
  for (const signal of signals) {
    signalCounts[signal.type] += 1;
    if (Number.isFinite(signal.createdAt)) {
      dayMetric(utcDay(signal.createdAt)).signalCounts[signal.type] += 1;
    }
    for (const position of evidenceTurns(signal)) {
      const key = `${signal.conversationId}:${position}`;
      const turn = turnByKey.get(key);
      if (!turn) continue;
      const day = turn.occurredAt !== null && Number.isFinite(turn.occurredAt) ? dayMetric(utcDay(turn.occurredAt)) : null;
      if (!allAffected.has(key)) {
        allAffected.add(key);
        if (day) day.turnsWithAnySignal += 1;
      }
      if (!affectedByType[signal.type].has(key)) {
        affectedByType[signal.type].add(key);
        if (day) day.affectedTurnCounts[signal.type] += 1;
      }
    }
  }
  const auditCheckCounts = {};
  for (const event of auditEvents) {
    if (!event.checkId || !Number.isSafeInteger(event.catalogVersion) || event.catalogVersion < 1 || !Number.isFinite(event.createdAt)) {
      continue;
    }
    const total = auditCheckCounts[event.checkId] ??= emptyAuditCheckCounts();
    total[event.type] += 1;
    const day = dayMetric(utcDay(event.createdAt));
    const dayCounts = day.auditCheckCounts[event.checkId] ??= emptyAuditCheckCounts();
    dayCounts[event.type] += 1;
  }
  const totalTurns = turns.length;
  return {
    totalTurns,
    turnsWithAnySignal: allAffected.size,
    signalRate: totalTurns > 0 ? allAffected.size / totalTurns : 0,
    signalCounts,
    affectedTurnCounts: {
      correction: affectedByType.correction.size,
      steering: affectedByType.steering.size,
      frustration: affectedByType.frustration.size
    },
    auditCheckCounts,
    daily: [...daily.values()].sort((left, right) => left.periodStart.localeCompare(right.periodStart)).slice(-90)
  };
}
const MAX_HOSTED_SIGNAL_FACTS = 5e3;
function parseHostedSignalFacts(value) {
  if (!Array.isArray(value) || value.length > MAX_HOSTED_SIGNAL_FACTS)
    throw new Error(`signals must list at most ${MAX_HOSTED_SIGNAL_FACTS} facts`);
  return value.map((raw) => {
    const fact = raw;
    if (!fact || typeof fact.at !== "number" || !Number.isFinite(fact.at) || !["correction", "steering", "frustration", "preference"].includes(fact.kind))
      throw new Error("signals must be { at, kind } facts");
    return { at: fact.at, kind: fact.kind };
  });
}
function aggregateHostedSignalAnalytics(turns, signals, auditEvents = []) {
  const base = aggregateSignalAnalytics(turns, [], auditEvents);
  const byDay = new Map(base.daily.map((day) => [day.periodStart, day]));
  const signalCounts = emptyCounts();
  for (const signal of signals) {
    const type = signal.kind === "preference" ? "steering" : signal.kind;
    signalCounts[type] += 1;
    const periodStart = utcDay(signal.at);
    let day = byDay.get(periodStart);
    if (!day) {
      day = {
        periodStart,
        totalTurns: 0,
        turnsWithAnySignal: 0,
        signalCounts: emptyCounts(),
        affectedTurnCounts: emptyCounts(),
        auditCheckCounts: {}
      };
      byDay.set(periodStart, day);
    }
    day.signalCounts[type] += 1;
  }
  const affectedTurnCounts = emptyCounts();
  let turnsWithAnySignal = 0;
  for (const day of byDay.values()) {
    for (const type of SIGNAL_TYPES) {
      day.affectedTurnCounts[type] = Math.min(day.signalCounts[type], day.totalTurns);
      affectedTurnCounts[type] += day.affectedTurnCounts[type];
    }
    day.turnsWithAnySignal = Math.min(
      SIGNAL_TYPES.reduce((total, type) => total + day.signalCounts[type], 0),
      day.totalTurns
    );
    turnsWithAnySignal += day.turnsWithAnySignal;
  }
  return {
    ...base,
    turnsWithAnySignal,
    signalRate: base.totalTurns > 0 ? turnsWithAnySignal / base.totalTurns : 0,
    signalCounts,
    affectedTurnCounts,
    daily: [...byDay.values()].sort((left, right) => left.periodStart.localeCompare(right.periodStart)).slice(-90)
  };
}
async function aggregateStoredSignalAnalytics(store, hostedSignals) {
  if (hostedSignals) {
    const [turns2, auditEvents2] = await Promise.all([store.listTurns(), store.listAuditCheckEvents()]);
    return aggregateHostedSignalAnalytics(turns2, hostedSignals, auditEvents2);
  }
  const [turns, signals, auditEvents] = await Promise.all([
    store.listTurns(),
    store.listSignals(),
    store.listAuditCheckEvents()
  ]);
  return aggregateSignalAnalytics(turns, signals, auditEvents);
}
function createSignalAnalyticsUseCases(deps) {
  return {
    async getDashboard(input) {
      const local = await deps.local.summarize(input?.signals);
      if (!deps.remote) {
        return {
          local,
          comparison: null,
          syncStatus: "local-only",
          lastSyncedAt: null
        };
      }
      try {
        const synced = await deps.remote.sync(local);
        return {
          local,
          comparison: synced.comparison,
          syncStatus: "synced",
          lastSyncedAt: synced.syncedAt
        };
      } catch (error) {
        return {
          local,
          comparison: null,
          syncStatus: "failed",
          lastSyncedAt: null,
          error: error instanceof Error ? error.message : String(error)
        };
      }
    }
  };
}
exports.aggregateStoredSignalAnalytics = aggregateStoredSignalAnalytics;
exports.createSignalAnalyticsUseCases = createSignalAnalyticsUseCases;
exports.parseHostedSignalFacts = parseHostedSignalFacts;
//# sourceMappingURL=signalAnalytics-CSLxOeHK.js.map

//# debugId=8423a435-f1f6-5c66-83bb-9f5b1ee9acf1
