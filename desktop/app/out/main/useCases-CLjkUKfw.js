"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="cbf25fdf-0235-58ec-bdd3-aaa461511b66")}catch(e){}}();

const flowerUnlocks = require("./flowerUnlocks-C4stZB4n.js");
function formatHoursMinutes(totalMinutes) {
  const safe = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}
function agentMinutes(activity) {
  return activity.sessions.reduce((total, session) => total + session.minutes, 0);
}
const WRAPPED_BADGES = [
  {
    id: "hours",
    name: "Agent hours",
    thresholds: [300, 900, 1800, 3600, 7200, 12e3, 19200, 3e4, 48e3],
    value: agentMinutes,
    display: formatHoursMinutes
  },
  {
    id: "peak",
    name: "Peak parallel",
    thresholds: [2, 3, 4, 6, 8, 12, 16, 24, 32],
    value: (a) => a.peakParallel,
    display: (v) => `${v} at once`
  },
  {
    id: "flow",
    name: "Average parallel",
    thresholds: [1, 1.3, 1.8, 2.5, 3.5, 5, 7, 9, 12],
    value: (a) => a.averageParallel,
    display: (v) => `${v.toFixed(1)} avg`
  },
  {
    id: "shipped",
    name: "PRs shipped",
    thresholds: [1, 2, 3, 4, 5, 6, 7, 9, 11],
    value: (a) => a.prsMerged,
    display: (v) => `${v} merged`
  },
  {
    id: "tempest",
    name: "Friction weathered",
    thresholds: [0.6, 0.8, 1, 1.2, 1.5, 1.8, 2.1, 2.4, 2.8],
    // Compared against the user's own median, never against other people.
    value: (a) => a.frictionMedian > 0 ? a.frictionSignals / a.frictionMedian : 0,
    display: (v) => `${v.toFixed(1)}× median`
  },
  {
    id: "endurance",
    name: "Longest run",
    thresholds: [15, 30, 60, 120, 240, 480, 960, 1920, 3840],
    value: (a) => a.longestRunMinutes,
    display: formatHoursMinutes
  },
  {
    id: "nightowl",
    name: "Night share",
    thresholds: [5, 10, 16, 22, 30, 40, 50, 62, 72],
    value: (a) => a.nightSharePercent,
    display: (v) => `${Math.round(v)}%`
  },
  {
    id: "craft",
    name: "Setup upgrades",
    thresholds: [1, 2, 3, 4, 5, 6, 7, 9, 11],
    value: (a) => a.setupChanges,
    display: (v) => `${v} upgrades`
  }
];
const WRAPPED_MAX_LEVEL = 10;
function levelFor(value, thresholds) {
  let level = 1;
  for (const threshold of thresholds) if (value >= threshold) level += 1;
  return level;
}
function progressFor(value, thresholds) {
  const level = levelFor(value, thresholds);
  if (level >= WRAPPED_MAX_LEVEL) return 1;
  const low = level === 1 ? 0 : thresholds[level - 2];
  const high = thresholds[level - 1];
  const withinLevel = high > low ? (value - low) / (high - low) : 0;
  const raw = (level - 1 + withinLevel) / (WRAPPED_MAX_LEVEL - 1);
  return Math.min(1, Math.max(0, raw));
}
function bloomCount(level) {
  if (level <= 7) return 1;
  if (level === 8) return 2;
  if (level === 9) return 3;
  return 5;
}
const WRAPPED_MIN_HISTORY_WEEKS = 3;
function normalCdf(z) {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erf = 1 - poly * Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}
const WRAPPED_MIN_COHORT_SUBJECTS = 10;
function levelFromMoments(value, mean, rawSigma) {
  const sigma = Math.max(rawSigma, Math.abs(mean) * 0.15, mean === 0 ? 1 : 0);
  const percentile = normalCdf((value - mean) / sigma);
  const level = Math.min(WRAPPED_MAX_LEVEL, Math.max(1, 1 + Math.floor(percentile * 10)));
  return { level, progress: percentile };
}
function levelFromCohort(value, stats) {
  if (!stats) return null;
  if (!Number.isFinite(stats.mean) || !Number.isFinite(stats.sigma) || stats.sigma < 0) return null;
  if (stats.subjects < WRAPPED_MIN_COHORT_SUBJECTS) return null;
  return levelFromMoments(value, stats.mean, stats.sigma);
}
function levelFromHistory(value, history) {
  if (history.length < WRAPPED_MIN_HISTORY_WEEKS) return null;
  const mean = history.reduce((sum, sample) => sum + sample, 0) / history.length;
  const variance = history.reduce((sum, sample) => sum + (sample - mean) ** 2, 0) / history.length;
  return levelFromMoments(value, mean, Math.sqrt(variance));
}
function computeBadges(activity, options = {}) {
  const { history = {}, cohort = {} } = options;
  return WRAPPED_BADGES.map((def) => {
    const value = def.value(activity);
    const scaled = levelFromCohort(value, cohort[def.id]) ?? levelFromHistory(value, history[def.id] ?? []);
    const level = scaled?.level ?? levelFor(value, def.thresholds);
    const progress = scaled?.progress ?? progressFor(value, def.thresholds);
    return {
      id: def.id,
      name: def.name,
      value,
      display: def.display(value),
      level,
      progress,
      blooms: bloomCount(level)
    };
  });
}
const PERSONA_PRIORITY = [
  "peak",
  "hours",
  "shipped",
  "tempest",
  "endurance",
  "nightowl",
  "flow",
  "craft"
];
function personaFor(badges) {
  const best = badges.reduce((max, badge) => Math.max(max, badge.level), 0);
  for (const id of PERSONA_PRIORITY) {
    const badge = badges.find((candidate) => candidate.id === id);
    if (badge && badge.level === best) return badge.id;
  }
  return "hours";
}
function heroFor(persona, activity, badges) {
  const badge = (id) => badges.find((candidate) => candidate.id === id);
  const agentMinutes2 = activity.sessions.reduce((total, session) => total + session.minutes, 0);
  switch (persona) {
    case "peak":
      return {
        kicker: "at your peak",
        value: String(activity.peakParallel),
        unit: activity.peakParallel === 1 ? "agent" : "agents",
        detail: "running at once, you orchestrating"
      };
    case "shipped":
      return {
        kicker: "shipped this week",
        value: String(activity.prsMerged),
        unit: activity.prsMerged === 1 ? "PR" : "PRs",
        detail: `merged across ${activity.projectCount} ${activity.projectCount === 1 ? "project" : "projects"}`
      };
    case "tempest":
      return {
        kicker: "a rough week, weathered",
        value: (badge("tempest")?.value ?? 0).toFixed(1),
        unit: "×",
        detail: "the usual friction, shipped anyway"
      };
    case "endurance":
      return {
        kicker: "longest unattended run",
        value: formatHoursMinutes(activity.longestRunMinutes),
        detail: "agents working, keyboard untouched"
      };
    case "nightowl":
      return {
        kicker: "while you slept",
        value: String(Math.round(activity.nightSharePercent)),
        unit: "%",
        detail: "of the week ran after 10pm"
      };
    case "flow":
      return {
        kicker: "all week long",
        value: activity.averageParallel.toFixed(1),
        unit: activity.averageParallel === 1 ? "agent" : "agents",
        detail: "running on average, steady output"
      };
    case "craft":
      return {
        kicker: "sharpened the tools",
        value: String(activity.setupChanges),
        unit: activity.setupChanges === 1 ? "upgrade" : "upgrades",
        detail: "skills, hooks and rules improved"
      };
    case "hours":
    default: {
      const leverage = activity.typedMinutes > 0 ? agentMinutes2 / activity.typedMinutes : 0;
      const detail = leverage > 0 ? `you typed for ${formatHoursMinutes(activity.typedMinutes)}, ${leverage.toFixed(
        1
      )}× leverage` : "agents working while you were away";
      return {
        kicker: "your agents worked",
        value: formatHoursMinutes(agentMinutes2),
        detail
      };
    }
  }
}
const DAY_MS = 24 * 60 * 60 * 1e3;
function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function periodFromMonday(start) {
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return {
    periodStart: formatLocalDate(start),
    startMs: start.getTime(),
    endMs: end.getTime(),
    kind: "weekly"
  };
}
function weekStartDate(ms) {
  const date = new Date(ms);
  date.setHours(0, 0, 0, 0);
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  return date;
}
function previousWeekPeriod(nowMs) {
  const thisMonday = weekStartDate(nowMs);
  const start = new Date(thisMonday);
  start.setDate(start.getDate() - 7);
  return periodFromMonday(start);
}
function weeklyPeriodContaining(ms) {
  return periodFromMonday(weekStartDate(ms));
}
function weeklyPeriodFromStart(periodStart) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(periodStart);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const start = new Date(year, month - 1, day);
  start.setHours(0, 0, 0, 0);
  if (start.getFullYear() !== year || start.getMonth() !== month - 1 || start.getDate() !== day || start.getDay() !== 1) {
    return null;
  }
  return periodFromMonday(start);
}
function lastSevenDaysPeriod(nowMs) {
  const end = new Date(nowMs);
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1);
  const start = new Date(end.getTime() - 7 * DAY_MS);
  return {
    periodStart: formatLocalDate(start),
    startMs: start.getTime(),
    endMs: end.getTime(),
    kind: "rolling"
  };
}
function wrappedIdFor(period) {
  return `${period.kind}:${period.periodStart}`;
}
const WRAPPED_SCHEMA_VERSION = 4;
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];
function rangeLabelFor(period) {
  const start = new Date(period.startMs);
  const end = new Date(period.endMs - 1);
  const startMonth = MONTHS[start.getMonth()];
  const endMonth = MONTHS[end.getMonth()];
  if (startMonth === endMonth) return `${startMonth} ${start.getDate()}–${end.getDate()}`;
  return `${startMonth} ${start.getDate()}–${endMonth} ${end.getDate()}`;
}
function bucketDays(period, activity) {
  const days = Array.from({ length: 7 }, () => ({ sessions: [] }));
  const dayMs = 24 * 60 * 60 * 1e3;
  for (const session of activity.sessions) {
    const offset = Math.floor((session.startedAtMs - period.startMs) / dayMs);
    if (offset < 0 || offset > 6) continue;
    days[offset].sessions.push(session);
  }
  for (const day of days) day.sessions.sort((a, b) => a.startedAtMs - b.startedAtMs);
  return days;
}
function buildWrappedSummary(period, activity, options = {}) {
  const badges = computeBadges(activity, { history: options.history, cohort: options.cohort });
  const persona = personaFor(badges);
  const projectKeys = [...new Set(activity.sessions.map((session) => session.projectKey))].sort();
  return {
    schemaVersion: WRAPPED_SCHEMA_VERSION,
    period,
    persona,
    hero: heroFor(persona, activity, badges),
    badges,
    sessionCount: activity.sessions.length,
    days: bucketDays(period, activity),
    projectKeys,
    rangeLabel: rangeLabelFor(period),
    ...options.flowerId ? { flowerId: options.flowerId } : {}
  };
}
function isWrappedWorthShowing(activity) {
  return activity.sessions.length >= 3;
}
const MINUTE_MS = 60 * 1e3;
const MAX_UNMEASURED_SESSION_MS = 4 * 60 * MINUTE_MS;
const NIGHT_START_HOUR = 22;
const NIGHT_END_HOUR = 5;
const ZERO_WRAPPED_EXTRAS = {
  typedMinutes: 0,
  prsMerged: 0,
  filesTouched: 0,
  frictionSignals: 0,
  frictionMedian: 0,
  setupChanges: 0,
  usageCeilingHits: 0
};
function safeNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function roundTo(value, decimals) {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
function isNightStart(startedAtMs) {
  const hour = new Date(startedAtMs).getHours();
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}
function sweepConcurrency(intervals) {
  const events = [];
  for (const interval of intervals) {
    events.push({ ms: interval.startMs, delta: 1 });
    events.push({ ms: interval.endMs, delta: -1 });
  }
  events.sort((a, b) => a.ms === b.ms ? a.delta - b.delta : a.ms - b.ms);
  let depth = 0;
  let peak = 0;
  let activeMs = 0;
  let weightedMs = 0;
  let previousMs = null;
  for (const event of events) {
    if (previousMs !== null && event.ms > previousMs && depth > 0) {
      const elapsed = event.ms - previousMs;
      activeMs += elapsed;
      weightedMs += elapsed * depth;
    }
    depth += event.delta;
    if (depth > peak) peak = depth;
    if (depth < 0) depth = 0;
    previousMs = event.ms;
  }
  return {
    peak,
    activeMinutes: activeMs / MINUTE_MS,
    weightedMinutes: weightedMs / MINUTE_MS
  };
}
function projectWrappedActivity(rows, period, extras) {
  const sessions = [];
  const intervals = [];
  const projectIds = /* @__PURE__ */ new Set();
  for (const row of rows ?? []) {
    if (!row || typeof row !== "object") continue;
    const rawStart = safeNumber(row.started_at);
    const rawEnd = Math.max(rawStart, safeNumber(row.ended_at ?? rawStart));
    const startMs = Math.max(rawStart, period.startMs);
    const endMs = Math.min(rawEnd, period.endMs);
    if (endMs < startMs) continue;
    const spanMs = endMs - startMs;
    const activeMs = typeof row.active_ms === "number" && Number.isFinite(row.active_ms) && row.active_ms >= 0 ? Math.min(row.active_ms, spanMs) : Math.min(spanMs, MAX_UNMEASURED_SESSION_MS);
    const minutes = Math.max(1, Math.round(activeMs / MINUTE_MS));
    if (typeof row.project_id === "number" && Number.isFinite(row.project_id)) {
      projectIds.add(row.project_id);
    }
    sessions.push({
      // The project's avatar seed when the adapter could resolve it, so the
      // meadow shows the flower that project already wears. Falls back to the
      // id, which is stable but yields an unrelated bloom.
      projectKey: typeof row.project_seed === "string" && row.project_seed.length > 0 ? row.project_seed : String(row.project_id ?? "unknown"),
      startedAtMs: startMs,
      minutes,
      turns: Math.max(0, Math.round(safeNumber(row.turns))),
      finished: row.finished === true
    });
    if (Array.isArray(row.active_intervals)) {
      for (const interval of row.active_intervals) {
        const intervalStart = Math.max(safeNumber(interval?.started_at), period.startMs);
        const intervalEnd = Math.min(safeNumber(interval?.ended_at), period.endMs);
        if (intervalEnd > intervalStart) {
          intervals.push({ startMs: intervalStart, endMs: intervalEnd });
        }
      }
    } else if (endMs > startMs) {
      intervals.push({ startMs, endMs });
    }
  }
  sessions.sort((a, b) => a.startedAtMs - b.startedAtMs);
  const totalMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);
  const { peak, activeMinutes, weightedMinutes } = sweepConcurrency(intervals);
  const nightMinutes = sessions.reduce(
    (sum, session) => isNightStart(session.startedAtMs) ? sum + session.minutes : sum,
    0
  );
  return {
    sessions,
    typedMinutes: Math.max(0, safeNumber(extras.typedMinutes)),
    projectCount: projectIds.size,
    prsMerged: Math.max(0, safeNumber(extras.prsMerged)),
    filesTouched: Math.max(0, safeNumber(extras.filesTouched)),
    frictionSignals: Math.max(0, safeNumber(extras.frictionSignals)),
    frictionMedian: Math.max(0, safeNumber(extras.frictionMedian)),
    // Proxy for the longest unattended run: the single longest session, which
    // is the closest stand-in we have until per-turn gaps are persisted.
    longestRunMinutes: sessions.reduce((longest, s) => Math.max(longest, s.minutes), 0),
    peakParallel: peak,
    averageParallel: activeMinutes > 0 ? roundTo(weightedMinutes / activeMinutes, 1) : 0,
    nightSharePercent: totalMinutes > 0 ? roundTo(nightMinutes / totalMinutes * 100, 1) : 0,
    setupChanges: Math.max(0, safeNumber(extras.setupChanges)),
    usageCeilingHits: Math.max(0, safeNumber(extras.usageCeilingHits))
  };
}
const WEEK_MS = 7 * 24 * 60 * 60 * 1e3;
function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function createWrappedExtrasLoader(deps) {
  const { store } = deps;
  const weeksForMedian = Math.max(1, Math.floor(deps.weeksForMedian ?? 4));
  return async (period) => {
    const [typedMinutes, frictionSignals, prsMerged, filesTouched] = await Promise.all([
      // App-visible window time: the closest available proxy for the human's
      // hands-on time (there is no keystroke-level capture).
      store.sumWrappedVisibleMinutes(period.startMs, period.endMs),
      store.countWrappedFrictionSignals(period.startMs, period.endMs),
      store.countWrappedMergedPullRequests(period.startMs, period.endMs),
      store.countWrappedFilesTouched(period.startMs, period.endMs)
    ]);
    const priorCounts = await Promise.all(
      Array.from({ length: weeksForMedian }, (_, index) => {
        const endMs = period.startMs - index * WEEK_MS;
        return store.countWrappedFrictionSignals(endMs - WEEK_MS, endMs);
      })
    );
    const frictionMedian = priorCounts.every((count) => count === 0) ? frictionSignals : median(priorCounts);
    return {
      typedMinutes,
      frictionSignals,
      frictionMedian,
      prsMerged,
      filesTouched,
      // Documented capture gap: the desktop schema has no setup-version
      // history and does not persist usage-ceiling snapshots. Kept at 0
      // rather than silently faked.
      setupChanges: 0,
      usageCeilingHits: 0
    };
  };
}
const WRAPPED_WEEKLY_TICK_MS = 60 * 60 * 1e3;
const WRAPPED_WEEKLY_RETRY_GAP_MS = 30 * 60 * 1e3;
function isWeeklyWrappedDue(input) {
  const targetPeriodStart = previousWeekPeriod(input.nowMs).periodStart;
  if (input.lastPeriodStart === targetPeriodStart) return false;
  const lastRunMs = input.lastRunMs;
  if (lastRunMs !== null && Number.isFinite(lastRunMs)) {
    const elapsed = input.nowMs - lastRunMs;
    if (elapsed >= 0 && elapsed < WRAPPED_WEEKLY_RETRY_GAP_MS) return false;
  }
  return true;
}
const WRAPPED_FLAG = "wrapped";
const WRAPPED_ENABLED_SETTING_KEY = "wrapped.enabled";
const WRAPPED_LAST_SEEN_SETTING_KEY = "wrapped.lastSeenId";
function isWrappedEnabled(value) {
  return value !== "false";
}
function selectWrappedDelivery(input) {
  if (!input.enabled) return null;
  const latest = input.latestWeekly;
  if (!latest || latest.period_kind !== "weekly") return null;
  if (input.lastSeenId !== null && latest.id === input.lastSeenId) return null;
  return latest;
}
const WRAPPED_LAUNCH_RECAP_SETTING_KEY = "wrapped.launchRecapDone";
function shouldAttemptWrappedLaunchRecap(input) {
  if (!input.flagEnabled) return false;
  if (!input.enabled) return false;
  return !input.alreadyDone;
}
function isWrappedLaunchRecapDone(value) {
  return value === "true";
}
const DEFAULT_LIST_LIMIT = 20;
const DEFAULT_AVAILABLE_WEEK_LIMIT = 24;
const MAX_AVAILABLE_WEEK_LIMIT = 52;
const SESSION_START_BATCH_SIZE = 200;
function isRecordRow(value) {
  return typeof value === "object" && value !== null && typeof value.id === "string" && typeof value.summary_json === "string";
}
function rowFromInput(input) {
  return {
    id: input.id,
    period_start: input.periodStart,
    period_kind: input.periodKind,
    started_at_ms: input.startedAtMs,
    ended_at_ms: input.endedAtMs,
    account_user_id: input.accountUserId,
    schema_version: input.schemaVersion,
    summary_json: input.summaryJson,
    created_at: input.createdAt
  };
}
const WRAPPED_HISTORY_BASELINE_ROWS = 16;
function createWrappedUseCases(deps) {
  const loadExtras = deps.loadExtras ?? createWrappedExtrasLoader({ store: deps.store });
  async function readEnabled() {
    return isWrappedEnabled(await deps.settings.get(WRAPPED_ENABLED_SETTING_KEY));
  }
  async function readRow(id) {
    const row = await deps.store.getWrapped(id);
    return isRecordRow(row) ? row : null;
  }
  async function readAccountUserId() {
    try {
      const userId = await deps.accountUserId();
      return typeof userId === "string" && userId.length > 0 ? userId : null;
    } catch {
      return null;
    }
  }
  async function loadBadgeHistory(excludeId) {
    const history = {};
    try {
      const rows = await deps.store.listWrapped(WRAPPED_HISTORY_BASELINE_ROWS);
      for (const row of rows) {
        if (row.id === excludeId || row.period_kind !== "weekly") continue;
        try {
          const summary = JSON.parse(row.summary_json);
          for (const badge of summary.badges ?? []) {
            if (typeof badge.id !== "string" || typeof badge.value !== "number") continue;
            if (!Number.isFinite(badge.value)) continue;
            (history[badge.id] ??= []).push(badge.value);
          }
        } catch {
        }
      }
    } catch {
    }
    return history;
  }
  async function generateForPeriodWithMinimum(period, minimumSessions) {
    const rows = await deps.store.listWrappedActivity(period.startMs, period.endMs);
    const extras = await loadExtras(period);
    const activity = projectWrappedActivity(rows ?? [], period, extras);
    if (minimumSessions > 1 ? !isWrappedWorthShowing(activity) : activity.sessions.length < minimumSessions) {
      return { status: "too-quiet", record: null };
    }
    const id = wrappedIdFor(period);
    const existing = await readRow(id);
    const history = await loadBadgeHistory(id);
    const cohort = await deps.cohort?.load() ?? {};
    const flowerRaw = await deps.settings.get(flowerUnlocks.FLOWER_SETTING_KEY).catch(() => null);
    const flowerId = flowerUnlocks.isFlowerId(flowerRaw) ? flowerRaw : flowerUnlocks.DEFAULT_FLOWER;
    const summary = buildWrappedSummary(period, activity, { flowerId, history, cohort });
    const input = {
      id,
      periodStart: period.periodStart,
      periodKind: period.kind,
      startedAtMs: period.startMs,
      endedAtMs: period.endMs,
      accountUserId: await readAccountUserId(),
      schemaVersion: WRAPPED_SCHEMA_VERSION,
      summaryJson: JSON.stringify(summary),
      createdAt: deps.now()
    };
    await deps.store.saveWrapped(input);
    if (period.kind === "weekly" && deps.cohort) {
      await deps.cohort.contribute({
        periodStart: period.periodStart,
        badgeValues: Object.fromEntries(summary.badges.map((badge) => [badge.id, badge.value]))
      });
    }
    const record = await readRow(id) ?? rowFromInput(input);
    return { status: existing ? "replaced" : "created", record };
  }
  async function generateForPeriod(period) {
    return generateForPeriodWithMinimum(period, 3);
  }
  return {
    async list(limit) {
      const bounded = typeof limit === "number" && limit > 0 ? Math.floor(limit) : DEFAULT_LIST_LIMIT;
      const rows = await deps.store.listWrapped(bounded);
      return Array.isArray(rows) ? rows.filter(isRecordRow) : [];
    },
    get(id) {
      return readRow(id);
    },
    generateForPeriod,
    generateLastSevenDays() {
      return generateForPeriod(lastSevenDaysPeriod(deps.now()));
    },
    async listAvailableWeeks(limit, beforePeriodStart, signal) {
      const bounded = typeof limit === "number" && limit > 0 ? Math.min(MAX_AVAILABLE_WEEK_LIMIT, Math.floor(limit)) : DEFAULT_AVAILABLE_WEEK_LIMIT;
      const currentWeek = weeklyPeriodContaining(deps.now());
      const beforePeriod = beforePeriodStart ? weeklyPeriodFromStart(beforePeriodStart) : currentWeek;
      if (!beforePeriod || beforePeriod.startMs > currentWeek.startMs) {
        return { weeks: [], nextBeforePeriodStart: null };
      }
      const weeks = /* @__PURE__ */ new Map();
      let beforeStartedAtMs = beforePeriod.startMs;
      let beforeSessionId = null;
      let exhausted = false;
      while (weeks.size <= bounded && !exhausted) {
        signal?.throwIfAborted();
        const rows = await deps.store.listWrappedSessionStarts(
          beforeStartedAtMs,
          beforeSessionId,
          SESSION_START_BATCH_SIZE
        );
        if (rows.length < SESSION_START_BATCH_SIZE) exhausted = true;
        if (rows.length === 0) break;
        for (const row of rows) {
          if (!Number.isFinite(row.started_at) || row.started_at >= beforePeriod.startMs) continue;
          const period = weeklyPeriodContaining(row.started_at);
          if (period.endMs > currentWeek.startMs) continue;
          let week = weeks.get(period.startMs);
          if (!week) {
            week = {
              periodStart: period.periodStart,
              rangeLabel: rangeLabelFor(period),
              sessionCount: 0,
              dayCounts: [0, 0, 0, 0, 0, 0, 0],
              wrappedId: null
            };
            weeks.set(period.startMs, week);
          }
          const dayIndex = (new Date(row.started_at).getDay() + 6) % 7;
          week.sessionCount += 1;
          week.dayCounts[dayIndex] = (week.dayCounts[dayIndex] ?? 0) + 1;
        }
        const last = rows.at(-1);
        if (!last) break;
        beforeStartedAtMs = last.started_at;
        beforeSessionId = last.session_id;
        if (signal && !exhausted) await new Promise((resolve) => setTimeout(resolve, 0));
      }
      signal?.throwIfAborted();
      const ordered = [...weeks.entries()].sort(([left], [right]) => right - left).map(([, week]) => week);
      const page = ordered.slice(0, bounded);
      const hydratedPage = await Promise.all(
        page.map(async (week) => {
          const period = weeklyPeriodFromStart(week.periodStart);
          if (!period) return week;
          const existing = await readRow(wrappedIdFor(period));
          return { ...week, wrappedId: existing?.id ?? null };
        })
      );
      return {
        weeks: hydratedPage,
        nextBeforePeriodStart: ordered.length > bounded ? page.at(-1)?.periodStart ?? null : null
      };
    },
    async generateArchiveWeek(periodStart) {
      const period = weeklyPeriodFromStart(periodStart);
      const currentWeek = weeklyPeriodContaining(deps.now());
      if (!period || period.endMs > currentWeek.startMs) {
        return { status: "too-quiet", record: null };
      }
      return generateForPeriodWithMinimum(period, 1);
    },
    async runWeeklyIfDue(lastRunMs, lastPeriodStart) {
      if (!await readEnabled()) return null;
      const nowMs = deps.now();
      if (!isWeeklyWrappedDue({ nowMs, lastRunMs, lastPeriodStart })) return null;
      return generateForPeriod(previousWeekPeriod(nowMs));
    },
    async runLaunchRecapIfDue(flagEnabled) {
      const enabled = await readEnabled();
      if (!flagEnabled || !enabled) return null;
      const nowMs = deps.now();
      const period = previousWeekPeriod(nowMs);
      const existing = await readRow(wrappedIdFor(period));
      if (existing && existing.schema_version < WRAPPED_SCHEMA_VERSION) {
        const outcome2 = await generateForPeriod(period);
        if (outcome2.status !== "too-quiet") {
          await deps.settings.set(WRAPPED_LAUNCH_RECAP_SETTING_KEY, "true");
        }
        return outcome2;
      }
      const alreadyDone = isWrappedLaunchRecapDone(
        await deps.settings.get(WRAPPED_LAUNCH_RECAP_SETTING_KEY).catch(() => null)
      );
      if (!shouldAttemptWrappedLaunchRecap({
        flagEnabled,
        alreadyDone,
        enabled
      })) {
        return null;
      }
      if (existing) {
        await deps.settings.set(WRAPPED_LAUNCH_RECAP_SETTING_KEY, "true");
        return { status: "replaced", record: existing };
      }
      const outcome = await generateForPeriod(period);
      if (outcome.status === "too-quiet") return outcome;
      await deps.settings.set(WRAPPED_LAUNCH_RECAP_SETTING_KEY, "true");
      return outcome;
    },
    async getUnseen() {
      const enabled = await readEnabled();
      if (!enabled) return null;
      const rows = await deps.store.listWrapped(DEFAULT_LIST_LIMIT);
      const latestWeekly = (Array.isArray(rows) ? rows.filter(isRecordRow) : []).find(
        (candidate) => candidate.period_kind === "weekly"
      );
      return selectWrappedDelivery({
        latestWeekly: latestWeekly ?? null,
        lastSeenId: await deps.settings.get(WRAPPED_LAST_SEEN_SETTING_KEY),
        enabled
      });
    },
    async markSeen(id) {
      await deps.settings.set(WRAPPED_LAST_SEEN_SETTING_KEY, id);
    }
  };
}
exports.WRAPPED_ENABLED_SETTING_KEY = WRAPPED_ENABLED_SETTING_KEY;
exports.WRAPPED_FLAG = WRAPPED_FLAG;
exports.WRAPPED_WEEKLY_TICK_MS = WRAPPED_WEEKLY_TICK_MS;
exports.ZERO_WRAPPED_EXTRAS = ZERO_WRAPPED_EXTRAS;
exports.createWrappedUseCases = createWrappedUseCases;
exports.isWeeklyWrappedDue = isWeeklyWrappedDue;
exports.isWrappedEnabled = isWrappedEnabled;
exports.previousWeekPeriod = previousWeekPeriod;
//# sourceMappingURL=useCases-CLjkUKfw.js.map

//# debugId=cbf25fdf-0235-58ec-bdd3-aaa461511b66
