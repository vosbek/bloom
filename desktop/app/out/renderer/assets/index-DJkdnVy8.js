
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4fbc8375-a16f-583b-8f87-42dd105f5583")}catch(e){}}();
import { S as SetupWriteConflictError } from "./writeConflict-BhJC2K4f.js";
import { gQ as kindFromPath, ht as projectProductAnalyticsIdentity, go as getUserAgentMcpSpecification } from "./index-nrW_ocxo.js";
import { f as fnv1a64Hex, c as contentHash } from "./hash-DXS7Ca7H.js";
const SEP = "\0";
function setupArtifactKey(obs) {
  return [
    obs.harnessId,
    obs.scope,
    obs.kind,
    obs.projectId ?? "",
    obs.workspaceLocationId ?? "",
    obs.sourcePath ?? ""
  ].join(SEP);
}
function setupArtifactId(key) {
  return `setup_${fnv1a64Hex(key)}`;
}
function setupVersionId(artifactId, seq) {
  return `${artifactId}_v${seq}`;
}
class SetupHistory {
  constructor(options = {}) {
    this.artifacts = /* @__PURE__ */ new Map();
    this.versions = /* @__PURE__ */ new Map();
    this.hash = options.hash ?? contentHash;
    this.now = options.now ?? (() => (/* @__PURE__ */ new Date()).toISOString());
  }
  /**
   * Observe one artifact's content. Creates the artifact + initial version when
   * new; appends a version when content changed; no-ops (returns the current
   * version) when content is unchanged. Metadata (parser/scanner version,
   * sourcePath) is refreshed on every observation regardless.
   */
  record(observation) {
    const id = setupArtifactId(setupArtifactKey(observation));
    const hash = this.hash(observation.content);
    const existing = this.artifacts.get(id);
    if (!existing) {
      const version2 = this.makeVersion(id, 1, hash, observation);
      const artifact = {
        id,
        harnessId: observation.harnessId,
        scope: observation.scope,
        kind: observation.kind,
        currentVersionId: version2.id,
        parserVersion: observation.parserVersion,
        scannerVersion: observation.scannerVersion,
        ...observation.projectId ? { projectId: observation.projectId } : {},
        ...observation.workspaceLocationId ? { workspaceLocationId: observation.workspaceLocationId } : {},
        ...observation.sourcePath ? { sourcePath: observation.sourcePath } : {}
      };
      this.artifacts.set(id, artifact);
      this.versions.set(id, [version2]);
      return { artifact, version: version2, changed: true, created: true };
    }
    const history = this.versions.get(id);
    const current = history.find((v) => v.id === existing.currentVersionId);
    existing.parserVersion = observation.parserVersion;
    existing.scannerVersion = observation.scannerVersion;
    if (observation.sourcePath) existing.sourcePath = observation.sourcePath;
    if (current.contentHash === hash) {
      return { artifact: existing, version: current, changed: false, created: false };
    }
    const version = this.makeVersion(id, history.length + 1, hash, observation);
    history.push(version);
    existing.currentVersionId = version.id;
    return { artifact: existing, version, changed: true, created: false };
  }
  /**
   * Move the current pointer back one version (undo the latest change). Returns
   * the version that is now current, or `null` when already at the first
   * version (nothing to undo). History is preserved — re-applying creates a new
   * version on top.
   */
  undo(artifactId) {
    const artifact = this.artifacts.get(artifactId);
    const history = this.versions.get(artifactId);
    if (!artifact || !history) return null;
    const index = history.findIndex((v) => v.id === artifact.currentVersionId);
    if (index <= 0) return null;
    const previous = history[index - 1];
    artifact.currentVersionId = previous.id;
    return previous;
  }
  getArtifact(artifactId) {
    return this.artifacts.get(artifactId) ?? null;
  }
  currentVersion(artifactId) {
    const artifact = this.artifacts.get(artifactId);
    if (!artifact) return null;
    return this.versions.get(artifactId)?.find((v) => v.id === artifact.currentVersionId) ?? null;
  }
  listVersions(artifactId) {
    return [...this.versions.get(artifactId) ?? []];
  }
  getVersion(versionId) {
    for (const history of this.versions.values()) {
      const found = history.find((v) => v.id === versionId);
      if (found) return found;
    }
    return null;
  }
  listArtifacts(filter = {}) {
    const out = [];
    for (const artifact of this.artifacts.values()) {
      if (filter.scope && artifact.scope !== filter.scope) continue;
      if (filter.kind && artifact.kind !== filter.kind) continue;
      if (filter.harnessId && artifact.harnessId !== filter.harnessId) continue;
      if (filter.projectId && artifact.projectId !== filter.projectId) continue;
      const current = this.currentVersion(artifact.id);
      if (current) out.push({ artifact, current });
    }
    return out;
  }
  makeVersion(artifactId, seq, hash, obs) {
    return {
      id: setupVersionId(artifactId, seq),
      artifactId,
      content: obs.content,
      parsedShape: obs.parsedShape ?? null,
      rawShape: obs.rawShape ?? null,
      contentHash: hash,
      createdAt: this.now(),
      createdBy: obs.createdBy ?? "scanner"
    };
  }
}
class SetupService {
  constructor(deps) {
    this.deps = deps;
  }
  list(filter) {
    return this.deps.setup.listSetup(filter);
  }
  listVersions(artifactId) {
    return this.deps.setup.listVersions(artifactId);
  }
  getVersion(versionId) {
    return this.deps.setup.getVersion(versionId);
  }
  async applyChange(change) {
    const version = await this.deps.setup.createSetupVersion(change);
    if (this.deps.sync && change.sourcePath) {
      await this.deps.sync.write(change.scope, change.sourcePath, change.content);
    }
    return version;
  }
  async undo(artifactId) {
    const version = await this.deps.setup.undoSetupArtifact(artifactId);
    if (version && this.deps.sync) {
      const artifact = await this.deps.setup.getArtifact(artifactId);
      if (artifact?.sourcePath) {
        await this.deps.sync.write(artifact.scope, artifact.sourcePath, version.content);
      }
    }
    return version;
  }
  async refreshHarnessSetup(input) {
    const setups = await input.listHarnessSetup();
    const observations = [];
    for (const setup of setups) {
      for (const category of setup.categories) {
        for (const entry of category.entries) {
          if (!entry.contentPath) continue;
          let content;
          try {
            content = await input.readHarnessEntry(entry.contentPath);
          } catch {
            continue;
          }
          observations.push({
            harnessId: setup.source,
            scope: "global",
            kind: kindFromPath(entry.contentPath),
            sourcePath: entry.contentPath,
            content,
            parserVersion: input.parserVersion,
            scannerVersion: input.scannerVersion,
            createdBy: "scanner"
          });
        }
      }
    }
    return this.deps.setup.ingestScan(observations);
  }
}
function normalizeProjectResolutionPath(path) {
  const value = path.trim().replace(/\\/g, "/");
  if (!value) return null;
  let prefix;
  let remainder;
  let protectedSegments = 0;
  if (/^[A-Za-z]:\//.test(value)) {
    prefix = `${value[0].toUpperCase()}:/`;
    remainder = value.slice(3);
  } else if (value.startsWith("//")) {
    prefix = "//";
    remainder = value.slice(2);
    protectedSegments = 2;
  } else if (value.startsWith("/")) {
    prefix = "/";
    remainder = value.slice(1);
  } else {
    return null;
  }
  const segments = [];
  for (const segment of remainder.split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") {
      if (segments.length > protectedSegments) segments.pop();
      continue;
    }
    segments.push(segment);
  }
  if (prefix === "//") {
    if (segments.length < protectedSegments) return null;
    return `//${segments.join("/")}`;
  }
  return segments.length === 0 ? prefix : `${prefix}${segments.join("/")}`;
}
function projectResolutionPathContains(root, target) {
  if (root.endsWith("/")) return target.startsWith(root);
  return target === root || target.startsWith(`${root}/`);
}
function resolveProjectLocationForPath(projects, targetPath) {
  const candidates = projects.flatMap((project) => [
    {
      projectId: project.id,
      path: project.root
    },
    ...project.workspaceLocations.map((workspace) => ({
      projectId: project.id,
      workspaceLocationId: workspace.id,
      path: workspace.path
    }))
  ]);
  return resolveProjectLocationCandidates(candidates, targetPath);
}
function resolveProjectLocationCandidates(candidates, targetPath) {
  const target = normalizeProjectResolutionPath(targetPath);
  if (!target) return null;
  const match = candidates.flatMap((candidate) => {
    const path = normalizeProjectResolutionPath(candidate.path);
    return path ? [{ ...candidate, path }] : [];
  }).filter((candidate) => projectResolutionPathContains(candidate.path, target)).sort((left, right) => right.path.length - left.path.length)[0];
  if (!match) return null;
  return {
    projectId: match.projectId,
    ...match.workspaceLocationId ? { workspaceLocationId: match.workspaceLocationId } : {}
  };
}
const USER_AGENT_MCP_ENABLED_SETTING_KEY = "userAgentMcp.enabled";
const USER_AGENT_MCP_PERMISSION_SETTING_KEY = "userAgentMcp.permission";
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
function createMemorySetupStore(options) {
  const history = new SetupHistory(options);
  return {
    history,
    async listSetup(filter) {
      return history.listArtifacts(filter);
    },
    async getArtifact(artifactId) {
      return history.getArtifact(artifactId);
    },
    async getCurrentVersion(artifactId) {
      return history.currentVersion(artifactId);
    },
    async listVersions(artifactId) {
      return history.listVersions(artifactId);
    },
    async getVersion(versionId) {
      return history.getVersion(versionId);
    },
    async ingestScan(observations) {
      let created = 0;
      let changed = 0;
      let unchanged = 0;
      for (const observation of observations) {
        const result = history.record(observation);
        if (result.created) created++;
        else if (result.changed) changed++;
        else unchanged++;
      }
      return { created, changed, unchanged };
    },
    async createSetupVersion(change) {
      const result = history.record({ createdBy: "user", ...change });
      return result.version;
    },
    async undoSetupArtifact(artifactId) {
      return history.undo(artifactId);
    }
  };
}
function createMemorySettingsStore(seed = {}) {
  const map = new Map(Object.entries(seed));
  return {
    async getAll() {
      return Object.fromEntries(map);
    },
    async get(key) {
      return map.get(key) ?? null;
    },
    async set(key, value) {
      map.set(key, value);
    }
  };
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function asString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function asCount(value) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}
function asLevel(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.min(10, Math.max(1, Math.round(value)));
}
function toPeriodKind(value) {
  return value === "rolling" ? "rolling" : "weekly";
}
function parseSummary(summaryJson) {
  try {
    const parsed = JSON.parse(summaryJson);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function toDayCounts(value) {
  if (!Array.isArray(value)) return [];
  return value.map(
    (day) => isRecord(day) && Array.isArray(day.sessions) ? day.sessions.length : 0
  );
}
function toBadgeViews(value) {
  if (!Array.isArray(value)) return [];
  const badges = [];
  for (const entry of value) {
    if (!isRecord(entry)) continue;
    const id = asString(entry.id);
    if (!id) continue;
    badges.push({
      id,
      name: asString(entry.name, id),
      display: asString(entry.display),
      level: asLevel(entry.level)
    });
  }
  return badges;
}
function fallbackView(row) {
  return {
    id: row.id,
    periodStart: asString(row.period_start),
    periodKind: toPeriodKind(row.period_kind),
    rangeLabel: asString(row.period_start),
    createdAt: asCount(row.created_at),
    persona: "hours",
    heroKicker: "",
    heroValue: "",
    heroDetail: "",
    sessionCount: 0,
    dayCounts: [],
    badges: [],
    summaryJson: ""
  };
}
function projectWrappedView(row) {
  const summary = parseSummary(asString(row.summary_json));
  if (!summary) return fallbackView(row);
  const raw = summary;
  const hero = isRecord(raw.hero) ? raw.hero : {};
  const heroUnit = asString(hero.unit);
  const period = isRecord(raw.period) ? raw.period : {};
  return {
    id: row.id,
    periodStart: asString(row.period_start) || asString(period.periodStart),
    periodKind: toPeriodKind(row.period_kind ?? period.kind),
    rangeLabel: asString(raw.rangeLabel) || asString(row.period_start),
    createdAt: asCount(row.created_at),
    persona: asString(raw.persona, "hours"),
    heroKicker: asString(hero.kicker),
    heroValue: asString(hero.value),
    ...heroUnit ? { heroUnit } : {},
    heroDetail: asString(hero.detail),
    sessionCount: asCount(raw.sessionCount),
    dayCounts: toDayCounts(raw.days),
    badges: toBadgeViews(raw.badges),
    summaryJson: asString(row.summary_json)
  };
}
const fixtureProjects = [
  {
    id: "git_acme",
    kind: "git",
    name: "acme",
    root: "/code/acme",
    setupSummary: null,
    setupAvailable: true,
    canonicalRemote: "git@github.com:acme/acme.git",
    workspaceLocations: [
      {
        id: "ws_acme_root",
        path: "/code/acme",
        kind: "repo-root",
        setupSummary: null,
        setupAvailable: true
      },
      {
        id: "ws_acme_feat",
        path: "/code/acme-feature",
        kind: "worktree",
        setupSummary: null,
        setupAvailable: true
      }
    ]
  },
  {
    id: "folder_notes",
    kind: "folder",
    name: "journal",
    root: "/notes/journal",
    setupSummary: null,
    setupAvailable: true,
    workspaceLocations: [
      {
        id: "ws_notes",
        path: "/notes/journal",
        kind: "folder-root",
        setupSummary: null,
        setupAvailable: true
      }
    ]
  }
];
const fixtureConversations = [
  {
    id: "conv_1",
    ref: "claude/acme/abc123",
    harnessId: "claude",
    projectId: "git_acme",
    workspaceLocationId: "ws_acme_root",
    title: "Wire up the settings store",
    preview: "Extracted the SidecarHost contract and backed it with the store.",
    state: "finished",
    branch: "main",
    lastActivityTs: 17000005e5
  },
  {
    id: "conv_2",
    ref: "codex/acme/def456",
    harnessId: "codex",
    projectId: "git_acme",
    workspaceLocationId: "ws_acme_feat",
    title: "Fix flaky worktree detection",
    preview: "The worktree commondir resolves to ../..",
    state: "needs-approval",
    branch: "feature/worktree",
    lastActivityTs: 17000004e5
  },
  {
    id: "conv_3",
    ref: "claude/journal/ghi789",
    harnessId: "claude",
    projectId: "folder_notes",
    workspaceLocationId: "ws_notes",
    title: "Summarize this week",
    preview: "Here is a recap of the week…",
    state: "finished",
    branch: null,
    lastActivityTs: 17000003e5
  }
];
const agentsNow = Date.now();
const agentsMin = (n) => agentsNow - n * 6e4;
const fixtureAgentConversations = [
  {
    id: "c1",
    source: "claude",
    ref: "claude/blume/main",
    projectId: "git_acme",
    project: "/Users/dev/blume",
    projectName: "blume",
    projectRoot: "/Users/dev/blume",
    branch: "main",
    cwd: "/Users/dev/blume",
    title: "Wire up the settings store",
    preview: "Wire up the settings store",
    lastActivityTs: agentsMin(0),
    startedAt: agentsMin(14),
    lastUserMessage: "Wire up the settings store so the theme choice persists across restarts.",
    lastMessage: "Extracted the `SidecarHost` settings contract and backed it with the store.",
    lastMessageTs: agentsMin(1),
    lastToolCall: "Edit · packages/sidecar/host/src/host.ts",
    lastToolCallTs: agentsMin(0),
    lastToolResult: "Updated SettingsHost with get/set/onChanged.",
    lastToolResultTs: agentsMin(0),
    todos: [
      { content: "Extract SettingsHost contract", state: "done" },
      { content: "Back it with the SQL store", state: "done" },
      { content: "Persist theme + reload", state: "done" }
    ],
    state: "finished"
  },
  {
    id: "c2",
    source: "codex",
    ref: "codex/blume/worktree",
    projectId: "git_acme",
    project: "/Users/dev/blume",
    projectName: "blume",
    projectRoot: "/Users/dev/blume",
    workspaceName: "feature/worktree",
    workspaceKind: "worktree",
    cwd: "/Users/dev/blume/.worktrees/feature",
    title: "Fix flaky worktree detection",
    preview: "Fix flaky worktree detection",
    lastActivityTs: agentsMin(3),
    startedAt: agentsMin(40),
    lastUserMessage: "The worktree commondir resolves to ../.. on nested checkouts — fix it.",
    lastMessage: "Proposed normalizing the commondir before comparing. Ready to apply?",
    lastMessageTs: agentsMin(3),
    lastToolCall: "Bash · git rev-parse --git-common-dir",
    lastToolCallTs: agentsMin(3),
    state: "needs-approval"
  },
  {
    id: "c3",
    source: "claude",
    ref: "claude/notes/week",
    projectId: "folder_notes",
    project: "/Users/dev/notes",
    projectName: "notes",
    cwd: "/Users/dev/notes",
    title: "Summarize this week",
    preview: "Summarize this week",
    lastActivityTs: agentsMin(58),
    startedAt: agentsMin(70),
    lastUserMessage: "Summarize what shipped this week across the repos.",
    lastMessage: "Here is a recap of the week: 5 PRs merged, web-lab brought to parity…",
    lastMessageTs: agentsMin(58),
    state: "finished"
  },
  {
    id: "c4",
    source: "claude",
    ref: "claude/blume/migrate",
    projectId: "git_acme",
    project: "/Users/dev/blume",
    projectName: "blume",
    cwd: "/Users/dev/blume",
    title: "Migrate storage to ports",
    preview: "Migrate storage to ports",
    lastActivityTs: agentsMin(0),
    startedAt: agentsMin(22),
    lastUserMessage: "Move the storage layer behind ports + adapters.",
    lastMessage: "Running the conformance suite across all four backends…",
    lastMessageTs: agentsMin(0),
    lastToolCall: "Bash · pnpm test:packages",
    lastToolCallTs: agentsMin(0),
    subAgents: [
      {
        id: "s1",
        title: "Port the SQLite adapter",
        prompt: "Implement the SQLite driver against AsyncSql",
        state: "running",
        startedAt: agentsMin(4)
      }
    ],
    todos: [
      { content: "Define storage ports", state: "done" },
      { content: "Memory + SQLite adapters", state: "current" },
      { content: "Postgres + libSQL", state: "pending" },
      { content: "Conformance suite", state: "pending" }
    ],
    state: "running"
  },
  {
    id: "c5",
    source: "codex",
    ref: "codex/blume/deploy",
    projectId: "git_acme",
    project: "/Users/dev/blume",
    projectName: "blume",
    cwd: "/Users/dev/blume",
    title: "Deploy the updater feed",
    preview: "Deploy the updater feed",
    lastActivityTs: agentsMin(6),
    startedAt: agentsMin(30),
    lastUserMessage: "Publish the updater feed to the canary bucket.",
    lastMessage: "The upload failed: the bucket refused the signed request.",
    lastMessageTs: agentsMin(6),
    state: "failed"
  },
  {
    id: "c6",
    source: "claude",
    ref: "claude/blume/copy",
    projectId: "git_acme",
    project: "/Users/dev/blume",
    projectName: "blume",
    cwd: "/Users/dev/blume",
    title: "Tidy the onboarding copy",
    preview: "Tidy the onboarding copy",
    lastActivityTs: agentsMin(3),
    startedAt: agentsMin(18),
    lastUserMessage: "Tighten the onboarding copy on the first two screens.",
    lastMessage: "Updated both screens; waiting for your next message.",
    lastMessageTs: agentsMin(3),
    state: "idle"
  }
];
const fixtureSuggestions = [
  {
    id: "sugg_1",
    title: "Verify changes before handing work off",
    summary: "In 4 conversations, you asked agents to run the relevant package tests and typecheck before saying a change was ready.",
    feedbackReasons: [
      "It's close, but not quite right.",
      "The changes are in the wrong place",
      "The project already enforces this"
    ],
    status: "open",
    evidenceCount: 4,
    operations: [
      {
        action: "update",
        artifactType: "rule",
        artifactScope: "project",
        harnessApplicability: "shared",
        summary: "Add a verification section to the project agent guidance",
        patchPreview: "diff --git a/AGENTS.md b/AGENTS.md\nindex 1f3a80b..a87e24f 100644\n--- a/AGENTS.md\n+++ b/AGENTS.md\n@@ -4,3 +4,8 @@\n - Prefer pnpm for workspace commands.\n - Keep runtime-specific code in its adapter.\n - Reuse the shared UI for product behavior.\n+\n+## Verification\n+\n+- Run tests for every package you changed before handing work off.\n+- Run `pnpm typecheck` for TypeScript changes and report any checks you could not run.\n",
        targetPath: "/code/acme/AGENTS.md",
        pathDisplay: "AGENTS.md",
        locationLabel: "blume",
        projectFlowerSeed: "blume"
      }
    ],
    createdAt: 17e11,
    updatedAt: 17000001e5
  },
  {
    id: "sugg_2",
    title: "Turn the desktop release checklist into a skill",
    summary: "The same control-plane, signing, feed-promotion, and smoke-test sequence was re-explained in 3 desktop release conversations.",
    status: "open",
    evidenceCount: 3,
    operations: [
      {
        action: "create",
        artifactType: "skill",
        artifactScope: "project",
        harnessApplicability: ["claude"],
        summary: "Create a Claude Code skill for preparing desktop releases",
        patchPreview: "diff --git a/.claude/skills/desktop-release/SKILL.md b/.claude/skills/desktop-release/SKILL.md\nnew file mode 100644\n--- /dev/null\n+++ b/.claude/skills/desktop-release/SKILL.md\n@@ -0,0 +1,15 @@\n+---\n+name: desktop-release\n+description: Prepare and verify a signed Blume desktop release.\n+---\n+\n+# Desktop release\n+\n+1. Confirm the exact source SHA is contained in green `main`.\n+2. Start a tracked operation through the admin Deployments page or `pnpm release:start`.\n+3. Build the signed macOS artifacts from that exact SHA.\n+4. Install the generated app and smoke-test launch, pinning, and updates.\n+5. Promote the verified artifacts to the Cloudflare R2 feed only after approval.\n+\n+Report the artifact paths and any skipped verification.\n+Normal canary and stable releases never publish GitHub Releases.\n",
        targetPath: "/code/acme/.claude/skills/desktop-release/SKILL.md",
        pathDisplay: ".claude/skills/desktop-release/SKILL.md",
        locationLabel: "blume",
        projectFlowerSeed: "blume"
      },
      {
        action: "create",
        artifactType: "skill",
        artifactScope: "project",
        harnessApplicability: ["codex"],
        summary: "Expose the same release workflow to Codex",
        patchPreview: "diff --git a/.agents/skills/desktop-release/SKILL.md b/.agents/skills/desktop-release/SKILL.md\nnew file mode 100644\n--- /dev/null\n+++ b/.agents/skills/desktop-release/SKILL.md\n@@ -0,0 +1,15 @@\n+---\n+name: desktop-release\n+description: Prepare and verify a signed Blume desktop release.\n+---\n+\n+# Desktop release\n+\n+1. Confirm the exact source SHA is contained in green `main`.\n+2. Start a tracked operation through the admin Deployments page or `pnpm release:start`.\n+3. Build the signed macOS artifacts from that exact SHA.\n+4. Install the generated app and smoke-test launch, pinning, and updates.\n+5. Promote the verified artifacts to the Cloudflare R2 feed only after approval.\n+\n+Report the artifact paths and any skipped verification.\n+Normal canary and stable releases never publish GitHub Releases.\n",
        targetPath: "/code/acme/.agents/skills/desktop-release/SKILL.md",
        pathDisplay: ".agents/skills/desktop-release/SKILL.md",
        locationLabel: "blume",
        projectFlowerSeed: "blume"
      }
    ],
    createdAt: 170000001e4,
    updatedAt: 170000011e4
  }
];
const fixtureUsage = {
  fetchedAt: 17000006e5,
  providers: [
    {
      harnessId: "claude",
      status: "ok",
      account: "olav@blume.page",
      plan: "Max",
      costUsd: 0,
      detail: null,
      cta: null,
      windows: [
        { id: "5h", label: "5-hour", usedPercent: 38, resetsAt: 1700018e6 },
        { id: "week", label: "Weekly", usedPercent: 61, resetsAt: 17004e8 }
      ]
    },
    {
      harnessId: "codex",
      status: "ok",
      account: "olav@blume.page",
      plan: "Plus",
      costUsd: 0,
      detail: null,
      cta: null,
      windows: [
        { id: "5h", label: "5-hour", usedPercent: 24, resetsAt: 1700018e6 },
        { id: "week", label: "Weekly", usedPercent: 46, resetsAt: 17004e8 }
      ]
    }
  ]
};
const fixtureHarnessOptions = [
  { harnessId: "claude", label: "Claude Code", available: true },
  { harnessId: "codex", label: "Codex", available: true },
  { harnessId: "cursor", label: "Cursor", available: false }
];
const fixtureHarnessSetups = [
  {
    harnessId: "claude",
    path: "~/.claude",
    exists: true,
    categories: [
      {
        name: "rules",
        entries: [
          { name: "CLAUDE.md", contentPath: "~/.claude/CLAUDE.md", harnessId: "claude" },
          {
            name: "commit-style.md",
            contentPath: "~/.claude/rules/commit-style.md",
            harnessId: "claude"
          }
        ]
      },
      {
        name: "skills",
        entries: [
          {
            name: "code-review",
            contentPath: "~/.claude/skills/code-review/SKILL.md",
            harnessId: "claude"
          }
        ]
      }
    ],
    artifacts: [
      {
        id: "fixture_claude_instruction",
        name: "CLAUDE.md",
        kind: "instruction",
        influence: "instructions",
        composition: "atomic",
        scope: "global",
        provider: "claude",
        source: { type: "file", path: ".claude/CLAUDE.md", runtimePath: "~/.claude/CLAUDE.md" },
        parserVersion: "fixture-1",
        scannerVersion: "fixture-1"
      },
      {
        id: "fixture_claude_plugin",
        name: "review-tools",
        kind: "plugin",
        influence: "capability",
        composition: "composite",
        scope: "global",
        provider: "claude",
        enabled: true,
        source: {
          type: "installed-package",
          packageId: "review-tools@official",
          version: "1.4.0",
          path: ".claude/plugins/cache/official/review-tools"
        },
        metadata: { version: "1.4.0", installed: true },
        parserVersion: "fixture-1",
        scannerVersion: "fixture-1"
      },
      {
        id: "fixture_claude_skill",
        name: "code-review",
        kind: "skill",
        influence: "capability",
        composition: "composite",
        scope: "global",
        provider: "claude",
        source: {
          type: "directory",
          path: ".claude/plugins/cache/official/review-tools/skills/code-review",
          runtimePath: "~/.claude/plugins/cache/official/review-tools/skills/code-review"
        },
        parserVersion: "fixture-1",
        scannerVersion: "fixture-1"
      },
      {
        id: "fixture_claude_settings",
        name: "Claude settings",
        kind: "configuration",
        influence: "configuration",
        composition: "composite",
        scope: "global",
        provider: "claude",
        source: {
          type: "file",
          path: ".claude/settings.json",
          runtimePath: "~/.claude/settings.json"
        },
        metadata: { keys: ["env", "hooks", "model", "permissions", "statusLine"] },
        parserVersion: "fixture-1",
        scannerVersion: "fixture-1"
      },
      {
        id: "fixture_claude_mcp",
        name: "linear",
        kind: "mcp-server",
        influence: "capability",
        composition: "atomic",
        scope: "global",
        provider: "claude",
        enabled: true,
        source: {
          type: "config-entry",
          path: ".claude/settings.json",
          runtimePath: "~/.claude/settings.json",
          keyPath: "mcpServers.linear"
        },
        metadata: {
          transport: "http",
          url: "https://mcp.linear.app/mcp",
          argumentCount: 0,
          headerNames: ["Authorization"]
        },
        parserVersion: "fixture-1",
        scannerVersion: "fixture-1"
      }
    ],
    artifactRelationships: [
      {
        fromUnitId: "fixture_claude_plugin",
        toUnitId: "fixture_claude_skill",
        kind: "provides",
        evidence: "confirmed"
      },
      {
        fromUnitId: "fixture_claude_settings",
        toUnitId: "fixture_claude_mcp",
        kind: "declares",
        evidence: "confirmed"
      }
    ],
    artifactDiagnostics: []
  },
  {
    harnessId: "codex",
    path: "~/.codex",
    exists: true,
    categories: [
      {
        name: "rules",
        entries: [{ name: "AGENTS.md", contentPath: "~/.codex/AGENTS.md", harnessId: "codex" }]
      }
    ],
    artifacts: [
      {
        id: "fixture_codex_mcp",
        name: "github",
        kind: "mcp-server",
        influence: "capability",
        composition: "atomic",
        scope: "global",
        provider: "codex",
        enabled: true,
        source: {
          type: "config-entry",
          path: ".codex/config.toml",
          runtimePath: "~/.codex/config.toml",
          keyPath: "mcp_servers.github"
        },
        metadata: {
          transport: "stdio",
          command: "npx",
          argumentCount: 2,
          envNames: ["GITHUB_TOKEN"]
        },
        parserVersion: "fixture-1",
        scannerVersion: "fixture-1"
      }
    ],
    artifactRelationships: [],
    artifactDiagnostics: []
  },
  {
    harnessId: "cursor",
    path: "~/.cursor",
    exists: false,
    categories: [],
    artifacts: [],
    artifactRelationships: [],
    artifactDiagnostics: []
  }
];
const fixtureImproveSettings = {
  processingProvider: "local-plans",
  cloudStatus: "ready",
  cloudConsentVersion: null,
  automaticProcessing: false,
  scheduleMode: "manual",
  analysisHarness: "claude",
  analysisHarnesses: ["claude"],
  excludedHarnesses: [],
  scopes: ["project", "global"],
  artifacts: ["rules", "skills"],
  setupAuditsEnabled: true,
  setupAuditCadenceDays: 7
};
const fixtureArchitectureSkill = `---
name: blume-architecture
description: Place shared product changes in the correct package and preserve Electron and Web Lab parity.
---

# Blume Architecture

Use this skill when a change affects package ownership, shared UI, host contracts, storage, parsing, or Electron background work.

## Decision path

1. Classify the change as shared UI, host contract, app-core policy, domain behavior, port, adapter, or shell-only behavior.
2. Trace the request through both Electron and Web Lab before changing a public contract.
3. Keep product behavior in shared packages and platform APIs in runtime adapters.
4. Move filesystem walks, parsing, and bulk database work out of Electron main.

## Required checks

- Run pnpm test:architecture.
- Run tests for every affected package.
- Compare Electron and Web Lab at the same sidecar width for user-visible changes.

Never fix a parity mismatch with a second shell-specific implementation.
`;
const fixtureElectronTestingSkill = `---
name: electron-app-testing
description: Validate Blume workflows in the real Electron development runtime without relying on browser fixtures.
---

# Electron App Testing

Use this skill for navigation, IPC, persistence, filesystem behavior, window pinning, and release smoke tests.

## Workflow

1. Confirm the command is running from the intended worktree.
2. Start the real desktop runtime with pnpm dev:e2e for scripted checks or pnpm dev for manual inspection.
3. Exercise the complete workflow, including reload and relaunch when persistence matters.
4. Record the exact route, state, and runtime evidence for any failure.
5. Stop only the processes started by the current test run.

Web Lab fixture mode is acceptable for static spacing and color checks, but it does not prove IPC, storage, or native window behavior.
`;
const fixtureReleaseSkill = `---
name: blume-release-workflow
description: Prepare, sign, smoke-test, and promote a Blume desktop release without skipping approval gates.
---

# Blume Release Workflow

Use this skill for signed artifacts, notarization, Cloudflare R2 updater feeds, and update-channel checks.

## Preflight

- Confirm the target branch and release type.
- Verify CI is green and the worktree contains no unrelated changes.
- Check signing, notarization, and update-service credentials without printing secrets.

## Release sequence

1. Start a tracked release operation through the admin Deployments page or pnpm release:start.
2. Build signed macOS artifacts from the exact control-plane-selected SHA.
3. Install the generated app and smoke-test launch, feedback, pinning, and updates.
4. Verify artifact names, checksums, and update metadata.
5. Promote the verified artifacts into the channel's R2 feed only after explicit approval.

GitHub Actions builds releases, while Cloudflare R2 and updates.blume-page.com distribute them. Normal canary and stable releases never publish GitHub Releases. Report artifact paths and any skipped checks.
`;
const fixtureSetupObservations = [
  {
    harnessId: "claude",
    scope: "project",
    kind: "rule",
    sourcePath: ".claude/rules/style.md",
    projectId: "git_acme",
    workspaceLocationId: "ws_acme_root",
    content: "# Style\n\n- Prefer small, composable functions.\n- No `as any`.\n",
    parserVersion: "fixture",
    scannerVersion: "fixture"
  },
  {
    harnessId: "codex",
    scope: "project",
    kind: "skill",
    sourcePath: ".agents/skills/blume-architecture/SKILL.md",
    projectId: "git_acme",
    workspaceLocationId: "ws_acme_root",
    content: fixtureArchitectureSkill,
    parserVersion: "fixture",
    scannerVersion: "fixture"
  },
  {
    harnessId: "codex",
    scope: "project",
    kind: "skill",
    sourcePath: ".agents/skills/electron-app-testing/SKILL.md",
    projectId: "git_acme",
    workspaceLocationId: "ws_acme_root",
    content: fixtureElectronTestingSkill,
    parserVersion: "fixture",
    scannerVersion: "fixture"
  },
  {
    harnessId: "codex",
    scope: "project",
    kind: "skill",
    sourcePath: ".agents/skills/blume-release-workflow/SKILL.md",
    projectId: "git_acme",
    workspaceLocationId: "ws_acme_root",
    content: fixtureReleaseSkill,
    parserVersion: "fixture",
    scannerVersion: "fixture"
  },
  {
    harnessId: "claude",
    scope: "global",
    kind: "mcp",
    sourcePath: "~/.claude/mcp.json",
    content: '{\n  "mcpServers": {\n    "linear": { "command": "linear-mcp" }\n  }\n}\n',
    parserVersion: "fixture",
    scannerVersion: "fixture"
  },
  {
    harnessId: "codex",
    scope: "global",
    kind: "auth-layout",
    sourcePath: "~/.codex/auth.json",
    content: '{ "tokens": "<redacted>" }\n',
    parserVersion: "fixture",
    scannerVersion: "fixture"
  }
];
function createEmitter() {
  const subscribers = /* @__PURE__ */ new Set();
  return {
    emit(value) {
      for (const subscriber of subscribers) subscriber(value);
    },
    subscribe(callback) {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    }
  };
}
const TOTAL_TURNS = [
  46,
  49,
  44,
  52,
  48,
  47,
  53,
  50,
  49,
  55,
  51,
  48,
  54,
  52,
  50,
  56,
  53,
  49,
  55,
  52,
  57,
  54,
  51,
  56,
  53,
  58,
  55,
  57
];
const AFFECTED_TURNS = {
  correction: [5, 4, 4, 5, 4, 4, 5, 4, 4, 4, 4, 3, 4, 4, 3, 4, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  steering: [4, 3, 4, 3, 4, 3, 3, 4, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2],
  frustration: [1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]
};
const emptyCounts = () => ({
  correction: 0,
  steering: 0,
  frustration: 0
});
function createSignalAnalyticsFixture(nowMs = Date.now()) {
  const daily = TOTAL_TURNS.map((totalTurns2, index) => {
    const affectedTurnCounts2 = {
      correction: AFFECTED_TURNS.correction[index],
      steering: AFFECTED_TURNS.steering[index],
      frustration: AFFECTED_TURNS.frustration[index]
    };
    const signalCounts2 = {
      correction: affectedTurnCounts2.correction + (index % 6 === 1 ? 1 : 0),
      steering: affectedTurnCounts2.steering + (index % 10 === 2 ? 1 : 0),
      frustration: affectedTurnCounts2.frustration
    };
    return {
      periodStart: new Date(nowMs - (TOTAL_TURNS.length - 1 - index) * 864e5).toISOString().slice(0, 10),
      totalTurns: totalTurns2,
      turnsWithAnySignal: Math.max(affectedTurnCounts2.correction, affectedTurnCounts2.steering) + affectedTurnCounts2.frustration,
      signalCounts: signalCounts2,
      affectedTurnCounts: affectedTurnCounts2,
      auditCheckCounts: {}
    };
  });
  const totalTurns = daily.reduce((total, day) => total + day.totalTurns, 0);
  const turnsWithAnySignal = daily.reduce((total, day) => total + day.turnsWithAnySignal, 0);
  const signalCounts = daily.reduce((totals, day) => {
    for (const type of Object.keys(totals)) totals[type] += day.signalCounts[type];
    return totals;
  }, emptyCounts());
  const affectedTurnCounts = daily.reduce((totals, day) => {
    for (const type of Object.keys(totals))
      totals[type] += day.affectedTurnCounts[type];
    return totals;
  }, emptyCounts());
  const signalRate = turnsWithAnySignal / totalTurns;
  return {
    local: {
      totalTurns,
      turnsWithAnySignal,
      signalRate,
      signalCounts,
      affectedTurnCounts,
      auditCheckCounts: {},
      daily
    },
    comparison: {
      schemaVersion: 1,
      windowDays: 30,
      cohortKind: "installation",
      cohortSize: 284,
      privacyThresholdMet: true,
      signalRate: { value: signalRate, percentile: 49 },
      signalsPerHundredTurns: {
        value: (signalCounts.correction + signalCounts.steering + signalCounts.frustration) / totalTurns * 100,
        percentile: 52
      },
      typeRates: {
        correction: {
          value: affectedTurnCounts.correction / totalTurns,
          percentile: 63,
          zones: { greenMax: 0.045, yellowMax: 0.08 }
        },
        steering: {
          value: affectedTurnCounts.steering / totalTurns,
          percentile: 48,
          zones: { greenMax: 0.055, yellowMax: 0.09 }
        },
        frustration: {
          value: affectedTurnCounts.frustration / totalTurns,
          percentile: 61,
          zones: { greenMax: 8e-3, yellowMax: 0.022 }
        }
      }
    },
    syncStatus: "synced",
    lastSyncedAt: new Date(nowMs).toISOString()
  };
}
function createFixtureFeedbackHost() {
  const messages = [
    {
      id: "fixture-welcome",
      content: "Hi! Send us feedback or ask a question here.",
      direction: "agent",
      senderName: "Blume",
      createdAt: 1
    }
  ];
  let profile = {
    id: "fixture-user",
    displayName: "Fixture User",
    email: null
  };
  return {
    board: null,
    chat: { conversationKey: "fixture-feedback" },
    async loadChat() {
      return {
        authToken: "fixture-auth-token",
        messages: messages.map((message) => ({ ...message }))
      };
    },
    async sendChat(_authToken, content) {
      const message = {
        id: `fixture-${messages.length + 1}`,
        content,
        direction: "user",
        createdAt: Date.now()
      };
      messages.push(message);
      return { authToken: "fixture-auth-token", message: { ...message } };
    },
    async getProfile() {
      return { ...profile };
    },
    async submitEmail(email) {
      profile = { ...profile, email };
      return { ...profile };
    }
  };
}
function fixtureWrappedSessions(period, count) {
  const projects = ["blume/sidecar", "blume/website", "blume/runner"];
  const dayMs = 24 * 60 * 60 * 1e3;
  return Array.from({ length: count }, (_, index) => {
    const dayOffset = index % 7;
    const hour = 9 + index * 3 % 11;
    const startedAtMs = period.startMs + dayOffset * dayMs + hour * 60 * 60 * 1e3;
    return {
      projectKey: projects[index % projects.length],
      startedAtMs,
      minutes: 18 + index * 13 % 95,
      turns: 3 + index * 5 % 22,
      finished: index % 4 !== 0
    };
  });
}
function fixtureWrappedActivity(period, count) {
  const sessions = fixtureWrappedSessions(period, count);
  return {
    sessions,
    typedMinutes: 214,
    projectCount: 3,
    prsMerged: 7,
    filesTouched: 168,
    frictionSignals: 12,
    frictionMedian: 19,
    longestRunMinutes: 74,
    peakParallel: 3,
    averageParallel: 1.4,
    nightSharePercent: 22,
    setupChanges: 5,
    usageCeilingHits: 2
  };
}
function fixtureWrappedView(period, count, createdAt) {
  const summary = buildWrappedSummary(period, fixtureWrappedActivity(period, count));
  return projectWrappedView({
    id: wrappedIdFor(period),
    period_start: period.periodStart,
    period_kind: period.kind,
    started_at_ms: period.startMs,
    ended_at_ms: period.endMs,
    summary_json: JSON.stringify(summary),
    created_at: createdAt
  });
}
const FIXTURE_SETTINGS_JSON = `${JSON.stringify(
  {
    model: "opus",
    permissions: {
      allow: ["Bash(pnpm test:*)", "Bash(pnpm typecheck)", "Read(~/.zshrc)"],
      deny: ["Read(./.env)", "Read(./secrets/**)"]
    },
    env: { CLAUDE_CODE_ENABLE_TELEMETRY: "0" },
    statusLine: { type: "command", command: "~/.claude/statusline.sh" },
    hooks: {
      PreToolUse: [
        {
          matcher: "Write|Edit",
          hooks: [{ type: "command", command: "pnpm format --staged" }]
        }
      ]
    },
    mcpServers: {
      linear: {
        type: "http",
        url: "https://mcp.linear.app/mcp",
        headers: { Authorization: "Bearer …" }
      }
    }
  },
  null,
  2
)}
`;
function createFixtureHost(options = {}) {
  const setupStore = createMemorySetupStore({ now: options.now });
  for (const observation of fixtureSetupObservations) setupStore.history.record(observation);
  const setupService = new SetupService({ setup: setupStore });
  const settingsStore = createMemorySettingsStore(options.settings ?? { theme: "dark" });
  const firstRun = options.seed?.firstRun === true;
  const agents = structuredClone(
    options.seed?.agentConversations ?? (firstRun ? [] : fixtureAgentConversations)
  );
  const conversations = structuredClone(
    options.seed?.conversations ?? (firstRun ? [] : fixtureConversations)
  );
  const suggestions = structuredClone(options.seed?.suggestions ?? fixtureSuggestions);
  const projects = structuredClone(options.seed?.projects ?? fixtureProjects);
  const harnesses = structuredClone(options.seed?.harnesses ?? fixtureHarnessOptions);
  const usage = structuredClone(options.seed?.usage ?? fixtureUsage);
  const matchesConversationId = (conversation, idOrRef) => conversation.id === idOrRef || conversation.ref === idOrRef;
  const conversationsChanged = createEmitter();
  const projectsChanged = createEmitter();
  const setupChanged = createEmitter();
  const deletedSetupArtifactIds = /* @__PURE__ */ new Set();
  const syncedSetupArtifactIds = /* @__PURE__ */ new Set();
  const setupFileEdits = /* @__PURE__ */ new Map();
  const fixtureSetupFileContent = (path) => {
    if (/(^|\/)SKILL\.md$/i.test(path.replace(/\\/g, "/"))) {
      return "# Code review\n\nUse this skill to review changes for correctness, security, and maintainability.\n";
    }
    if (/settings\.json$/i.test(path)) return FIXTURE_SETTINGS_JSON;
    return "# Run tests before committing\n\nAlways run `pnpm test` before creating a commit.\nIf the tests fail, fix them first.\n";
  };
  const FIXTURE_PROJECT_FILE = "# Project setup\n\nProject-scoped rules live under `.claude/`.\n";
  const currentSetupFileContent = (path) => setupFileEdits.get(path) ?? fixtureSetupFileContent(path);
  const currentProjectFileContent = (path) => setupFileEdits.get(path) ?? FIXTURE_PROJECT_FILE;
  const writeSetupFile = (path, content, options2, currentContent) => {
    if (options2?.expectedContent !== void 0 && currentContent(path) !== options2.expectedContent) {
      throw new SetupWriteConflictError(path);
    }
    setupFileEdits.set(path, content);
  };
  const usageChanged = createEmitter();
  const settingsChanged = createEmitter();
  const wrappedChanged = createEmitter();
  const fixtureNowMs = Date.parse("2026-08-17T12:00:00Z");
  const weekMs = 7 * 24 * 60 * 60 * 1e3;
  const wrapped = [
    fixtureWrappedView(previousWeekPeriod(fixtureNowMs), 24, fixtureNowMs),
    fixtureWrappedView(previousWeekPeriod(fixtureNowMs - weekMs), 11, fixtureNowMs - weekMs)
  ];
  const availableWrappedWeeks = [0, 1, 2, 3].map((offset) => {
    const period = previousWeekPeriod(fixtureNowMs - offset * weekMs);
    const existing = wrapped.find((view) => view.periodStart === period.periodStart);
    const sessionCount = [24, 11, 8, 4][offset] ?? 1;
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    for (const session of fixtureWrappedSessions(period, sessionCount)) {
      const dayIndex = Math.floor((session.startedAtMs - period.startMs) / (24 * 60 * 60 * 1e3));
      if (dayIndex >= 0 && dayIndex < dayCounts.length) {
        dayCounts[dayIndex] = (dayCounts[dayIndex] ?? 0) + 1;
      }
    }
    return {
      periodStart: period.periodStart,
      rangeLabel: rangeLabelFor(period),
      sessionCount,
      dayCounts,
      wrappedId: existing?.id ?? null
    };
  });
  const wrappedSeenIds = /* @__PURE__ */ new Set([wrapped[1].id]);
  const improveProgress = createEmitter();
  const controlledAgentProgress = createEmitter();
  const accountChanged = createEmitter();
  let accountSession = options.accountSession === void 0 ? {
    user: {
      id: "fixture-account",
      name: "Fixture User",
      email: "fixture@blume.test",
      image: null,
      hasPassword: true,
      roles: ["user"]
    },
    expiresAt: Date.now() + 864e5
  } : structuredClone(options.accountSession);
  let accountSessions = accountSession === null ? [] : [
    {
      id: "fixture-current-session",
      current: true,
      createdAt: Date.now() - 36e5,
      updatedAt: Date.now(),
      expiresAt: accountSession.expiresAt,
      ipAddress: "127.0.0.1",
      userAgent: "Blume fixture"
    }
  ];
  const improveSettings = {
    ...fixtureImproveSettings,
    analysisHarnesses: [...fixtureImproveSettings.analysisHarnesses],
    excludedHarnesses: [...fixtureImproveSettings.excludedHarnesses],
    scopes: [...fixtureImproveSettings.scopes],
    artifacts: [...fixtureImproveSettings.artifacts]
  };
  const system = {
    // The fixture's own moment, so the app's windows ("the last 30 days") match its data.
    ...options.now ? { now: () => Date.parse(options.now()) } : {},
    platform: options.system?.platform ?? "web",
    runtime: options.system?.runtime ?? "web-lab",
    fileOpenTargets: options.system?.fileOpenTargets ?? [],
    openFile: options.system?.openFile ?? (async () => {
      throw new Error("Native file launchers are unavailable in this fixture");
    }),
    openFolder: options.system?.openFolder ?? (async () => {
      throw new Error("Native folder launchers are unavailable in this fixture");
    }),
    exportImage: options.system?.exportImage ?? (async () => {
    }),
    shareText: options.system?.shareText ?? (async () => "unavailable"),
    // No page capture in fixtures: a canned picture would pass for a real one. Tests that need a
    // thumbnail pass their own `system.linkPreview`.
    ...options.system?.linkPreview ? { linkPreview: options.system.linkPreview } : {},
    // Whether a page on this computer runs: unknown (fixtures reach no network, the public site's
    // demos included), unless a caller passes its own check.
    localLinkRunning: options.system?.localLinkRunning ?? (async () => null),
    getProductAnalyticsIdentity: options.system?.getProductAnalyticsIdentity ?? (async () => {
      const [session, profile] = await Promise.all([
        host.account.getSession(),
        host.feedback.getProfile()
      ]);
      return projectProductAnalyticsIdentity(session?.user ?? null, profile);
    })
  };
  const host = {
    account: {
      async getSession() {
        return accountSession ? structuredClone(accountSession) : null;
      },
      async requestPasswordReset() {
      },
      async getSocialProviders() {
        return [
          { id: "google", enabled: true },
          { id: "github", enabled: true }
        ];
      },
      async signUp(input) {
        accountSession = {
          user: {
            id: `fixture-${input.email.toLowerCase()}`,
            name: input.name,
            email: input.email.toLowerCase(),
            image: null,
            hasPassword: true,
            roles: ["user"]
          },
          expiresAt: Date.now() + 864e5
        };
        accountSessions = [
          {
            id: "fixture-current-session",
            current: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            expiresAt: accountSession.expiresAt,
            ipAddress: "127.0.0.1",
            userAgent: "Blume fixture"
          }
        ];
        accountChanged.emit();
        return structuredClone(accountSession);
      },
      async signIn(input) {
        accountSession = {
          user: {
            id: `fixture-${input.email.toLowerCase()}`,
            name: input.email.split("@")[0] || "Fixture User",
            email: input.email.toLowerCase(),
            image: null,
            hasPassword: true,
            roles: ["user"]
          },
          expiresAt: Date.now() + 864e5
        };
        accountSessions = [
          {
            id: "fixture-current-session",
            current: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            expiresAt: accountSession.expiresAt,
            ipAddress: "127.0.0.1",
            userAgent: "Blume fixture"
          }
        ];
        accountChanged.emit();
        return structuredClone(accountSession);
      },
      cancelSocialSignIn: async () => true,
      async signInSocial(provider) {
        const name = provider === "google" ? "Google User" : "GitHub User";
        accountSession = {
          user: {
            id: `fixture-${provider}`,
            name,
            email: `${provider}@example.com`,
            image: null,
            hasPassword: false,
            roles: ["user"]
          },
          expiresAt: Date.now() + 864e5
        };
        accountSessions = [
          {
            id: "fixture-current-session",
            current: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            expiresAt: accountSession.expiresAt,
            ipAddress: "127.0.0.1",
            userAgent: "Blume fixture"
          }
        ];
        accountChanged.emit();
        return structuredClone(accountSession);
      },
      async updateProfile(input) {
        if (!accountSession) throw new Error("Sign in required");
        accountSession = {
          ...accountSession,
          user: {
            ...accountSession.user,
            ...input.name === void 0 ? {} : { name: input.name },
            ...input.image === void 0 ? {} : { image: input.image }
          }
        };
        accountChanged.emit();
        return structuredClone(accountSession);
      },
      async changePassword() {
      },
      async listDevices() {
        return accountSession ? [
          {
            id: "fixture-installation",
            current: true,
            createdAt: Date.now() - 864e5,
            lastSeenAt: Date.now(),
            kind: "desktop",
            platform: "macos",
            name: "Blume desktop"
          }
        ] : [];
      },
      async listSessions() {
        return structuredClone(accountSessions);
      },
      async revokeSession(sessionId) {
        accountSessions = accountSessions.filter((session) => session.id !== sessionId);
        if (!accountSessions.some((session) => session.current)) accountSession = null;
        accountChanged.emit();
      },
      async revokeOtherSessions() {
        accountSessions = accountSessions.filter((session) => session.current);
        accountChanged.emit();
      },
      async deleteAccount() {
        accountSession = null;
        accountSessions = [];
        accountChanged.emit();
      },
      async signOut() {
        accountSession = null;
        accountSessions = [];
        accountChanged.emit();
      },
      onChanged(callback) {
        return accountChanged.subscribe(callback);
      }
    },
    system,
    announcements: {
      async listActive() {
        return (options.announcements ?? []).map((announcement) => ({
          ...announcement,
          ...announcement.action ? { action: { ...announcement.action } } : {}
        }));
      },
      async copyPrompt(prompt) {
        await globalThis.navigator?.clipboard?.writeText(prompt);
      },
      async openUrl(url) {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") throw new TypeError("Announcement URLs must use HTTPS");
        globalThis.open?.(parsed.toString(), "_blank", "noopener,noreferrer");
      }
    },
    careers: {
      async listOpenings() {
        return (options.careers ?? []).map((opening) => ({ ...opening }));
      },
      async openOpening(url) {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") throw new TypeError("Career URLs must use HTTPS");
        globalThis.open?.(parsed.toString(), "_blank", "noopener,noreferrer");
      }
    },
    search: {
      async query(input) {
        const needle = input.query.trim().toLocaleLowerCase();
        if (needle.length < 2) return { results: [], truncated: false };
        const categories = new Set(input.categories);
        const results = [];
        if (categories.has("conversations")) {
          for (const conversation of agents) {
            const storedConversation = conversations.find(
              (candidate) => matchesConversationId(candidate, conversation.ref)
            );
            const haystack = `${conversation.title ?? ""} ${conversation.ref} ${conversation.projectName} ${conversation.project} ${conversation.projectRoot ?? ""} ${conversation.workspaceName ?? ""} ${conversation.cwd ?? ""} ${conversation.branch ?? ""}`;
            if (!haystack.toLocaleLowerCase().includes(needle)) continue;
            results.push({
              id: `conversation:${conversation.id}`,
              category: "conversations",
              title: conversation.title ?? conversation.ref,
              subtitle: `${conversation.projectName} · ${conversation.source}`,
              excerpt: conversation.workspaceName ?? conversation.cwd ?? conversation.preview,
              rank: 1,
              updatedAt: conversation.lastActivityTs,
              conversationRef: conversation.ref,
              conversationId: conversation.id,
              projectId: storedConversation?.projectId ?? null,
              workspaceLocationId: storedConversation?.workspaceLocationId ?? null,
              harnessId: conversation.source
            });
          }
        }
        if (categories.has("messages")) {
          for (const conversation of agents) {
            if (input.conversationRef && conversation.ref !== input.conversationRef) continue;
            const userText = conversation.lastUserMessage ?? conversation.title ?? conversation.ref ?? "Hello";
            const assistantText = conversation.lastMessage ?? conversation.preview ?? "…";
            const isUserMatch = userText.toLocaleLowerCase().includes(needle);
            const isAssistantMatch = assistantText.toLocaleLowerCase().includes(needle);
            if (!isUserMatch && !isAssistantMatch) continue;
            const eventId = isUserMatch ? 1 : 2;
            results.push({
              id: `message:${conversation.id}`,
              category: "messages",
              title: conversation.title ?? conversation.ref,
              subtitle: `${conversation.projectName} · ${conversation.source}`,
              excerpt: isUserMatch ? userText : assistantText,
              rank: 1,
              updatedAt: conversation.lastActivityTs,
              conversationRef: conversation.ref,
              conversationId: conversation.id,
              transcriptMatchKey: `event-${eventId}`,
              matchLabel: isUserMatch ? "User" : "Assistant",
              turnPosition: 0,
              focusEventId: eventId,
              focusToolCallId: null
            });
          }
        }
        if (categories.has("projects")) {
          for (const project of projects) {
            if (!`${project.name} ${project.root}`.toLocaleLowerCase().includes(needle)) continue;
            results.push({
              id: `project:${project.id}`,
              category: "projects",
              title: project.name,
              subtitle: project.canonicalRemote ?? null,
              excerpt: project.root,
              rank: 10,
              updatedAt: project.lastActivityTs ?? 0,
              projectId: project.id,
              root: project.root
            });
          }
        }
        if (categories.has("setup")) {
          for (const { artifact, current } of await setupService.list()) {
            const haystack = `${artifact.kind} ${artifact.scope} ${artifact.harnessId} ${artifact.sourcePath ?? ""} ${artifact.projectId ?? ""} ${current.content}`;
            if (!haystack.toLocaleLowerCase().includes(needle)) continue;
            results.push({
              id: `setup:${artifact.id}`,
              category: "setup",
              title: artifact.sourcePath ?? artifact.kind,
              subtitle: `${artifact.harnessId} · ${artifact.kind}`,
              excerpt: current.content,
              rank: 20,
              updatedAt: Date.parse(current.createdAt),
              artifactId: artifact.id,
              projectId: artifact.projectId ?? null,
              harnessId: artifact.harnessId,
              sourcePath: artifact.sourcePath ?? null
            });
          }
        }
        if (categories.has("suggestions")) {
          for (const suggestion of suggestions) {
            if (!`${suggestion.title} ${suggestion.summary}`.toLocaleLowerCase().includes(needle))
              continue;
            results.push({
              id: `suggestion:${suggestion.id}`,
              category: "suggestions",
              title: suggestion.title,
              subtitle: suggestion.status,
              excerpt: suggestion.summary,
              rank: 30,
              updatedAt: suggestion.updatedAt,
              suggestionId: suggestion.id,
              status: suggestion.status
            });
          }
        }
        const limit = Math.max(1, Math.min(100, input.limit ?? 40));
        results.sort((left, right) => left.rank - right.rank || right.updatedAt - left.updatedAt);
        return { results: results.slice(0, limit), truncated: results.length > limit };
      }
    },
    feedback: options.feedback ?? createFixtureFeedbackHost(),
    referrals: {
      async getLink() {
        return {
          code: "delicate-bluebell-in-rain",
          inviteUrl: "https://blume.codes/invite/delicate-bluebell-in-rain"
        };
      },
      async getStatus() {
        return {
          visits: 12,
          downloads: 7,
          activatedReferrals: 3,
          completedReferrals: 3,
          earnedUnlocks: 2,
          rewardMilestones: [1, 3, 5, 10]
        };
      }
    },
    settings: {
      getAll: () => settingsStore.getAll(),
      get: (key) => settingsStore.get(key),
      async set(key, value) {
        await settingsStore.set(key, value);
        settingsChanged.emit();
      },
      onChanged: (callback) => settingsChanged.subscribe(callback)
    },
    wrapped: {
      async list(limit) {
        const bounded = typeof limit === "number" && limit > 0 ? Math.floor(limit) : wrapped.length;
        return wrapped.slice(0, bounded).map((view) => ({ ...view }));
      },
      async get(id) {
        const found = wrapped.find((view) => view.id === id);
        return found ? { ...found } : null;
      },
      async generateLastSevenDays() {
        const period = lastSevenDaysPeriod(Date.now());
        const view = fixtureWrappedView(period, 21, Date.now());
        const index = wrapped.findIndex((existing) => existing.id === view.id);
        const status = index >= 0 ? "replaced" : "created";
        if (index >= 0) wrapped[index] = view;
        else wrapped.unshift(view);
        wrappedChanged.emit();
        return { status, wrapped: { ...view } };
      },
      async listAvailableWeeks(limit, beforePeriodStart) {
        const bounded = typeof limit === "number" && limit > 0 ? Math.floor(limit) : 24;
        const filtered = beforePeriodStart ? availableWrappedWeeks.filter((week) => week.periodStart < beforePeriodStart) : availableWrappedWeeks;
        const weeks = filtered.slice(0, bounded).map((week) => ({ ...week }));
        return {
          weeks,
          nextBeforePeriodStart: filtered.length > bounded ? weeks.at(-1)?.periodStart ?? null : null
        };
      },
      async generateWeek(periodStart) {
        const period = weeklyPeriodFromStart(periodStart);
        const available = availableWrappedWeeks.find((week) => week.periodStart === periodStart);
        if (!period || !available) return { status: "too-quiet", wrapped: null };
        const view = fixtureWrappedView(period, available.sessionCount, Date.now());
        const index = wrapped.findIndex((existing) => existing.id === view.id);
        const status = index >= 0 ? "replaced" : "created";
        if (index >= 0) wrapped[index] = view;
        else wrapped.push(view);
        available.wrappedId = view.id;
        wrapped.sort((left, right) => right.periodStart.localeCompare(left.periodStart));
        wrappedChanged.emit();
        return { status, wrapped: { ...view } };
      },
      async getUnseen() {
        const unseen = wrapped.find(
          (view) => view.periodKind === "weekly" && !wrappedSeenIds.has(view.id)
        );
        return unseen ? { ...unseen } : null;
      },
      async markSeen(id) {
        wrappedSeenIds.add(id);
        wrappedChanged.emit();
      },
      onChanged: (callback) => wrappedChanged.subscribe(callback)
    },
    agentMcp: {
      async getSettings() {
        const permission = await settingsStore.get(USER_AGENT_MCP_PERMISSION_SETTING_KEY) === "contribute" ? "contribute" : "read";
        return {
          supported: true,
          enabled: await settingsStore.get(USER_AGENT_MCP_ENABLED_SETTING_KEY) === "true",
          permission,
          clients: [
            {
              id: "codex",
              label: "Codex",
              configured: await settingsStore.get("userAgentMcp.client.codex.configured") === "true",
              command: "codex mcp add blume -- '/Applications/Blume.app/Contents/MacOS/Blume'",
              verifyPrompt: "Continue the most recent work another agent did on this branch. Tell me what you found before changing anything.",
              skill: {
                name: "blume-continuity",
                displayName: "Blume Continuity",
                targetDirectory: "~/.agents/skills/blume-continuity",
                files: [
                  {
                    path: "SKILL.md",
                    content: "---\nname: blume-continuity\ndescription: Use Blume for relevant prior-agent context.\n---\n"
                  },
                  {
                    path: "agents/openai.yaml",
                    content: 'interface:\n  display_name: "Blume Continuity"\n'
                  }
                ]
              }
            },
            {
              id: "claude-code",
              label: "Claude Code",
              configured: await settingsStore.get("userAgentMcp.client.claude-code.configured") === "true",
              command: `claude mcp add-json --scope user blume '{"type":"stdio"}'`,
              verifyPrompt: "Continue the most recent work another agent did on this branch. Tell me what you found before changing anything.",
              skill: {
                name: "blume-continuity",
                displayName: "Blume Continuity",
                targetDirectory: "~/.claude/skills/blume-continuity",
                files: [
                  {
                    path: "SKILL.md",
                    content: "---\nname: blume-continuity\ndescription: Use Blume for relevant prior-agent context.\n---\n"
                  },
                  {
                    path: "agents/openai.yaml",
                    content: 'interface:\n  display_name: "Blume Continuity"\n'
                  }
                ]
              }
            }
          ],
          specification: getUserAgentMcpSpecification(permission)
        };
      },
      async setSettings(patch) {
        if (patch.enabled !== void 0)
          await settingsStore.set(USER_AGENT_MCP_ENABLED_SETTING_KEY, String(patch.enabled));
        if (patch.permission !== void 0)
          await settingsStore.set(USER_AGENT_MCP_PERMISSION_SETTING_KEY, patch.permission);
        return this.getSettings();
      },
      async applyClientSetup(clientId) {
        await settingsStore.set(USER_AGENT_MCP_ENABLED_SETTING_KEY, "true");
        await settingsStore.set(`userAgentMcp.client.${clientId}.configured`, "true");
        return {
          clientId,
          status: "applied",
          detail: `${clientId === "codex" ? "Codex" : "Claude Code"} can now use Blume.`
        };
      }
    },
    conversations: {
      actions: { copy: false, openTargets: [], continueTargets: [] },
      async list(query, signal) {
        signal?.throwIfAborted();
        let result = agents;
        if (query?.projectId) result = result.filter((c) => c.projectId === query.projectId);
        if (query?.harnessId) result = result.filter((c) => c.source === query.harnessId);
        if (query?.state) {
          const states = Array.isArray(query.state) ? query.state : [query.state];
          result = result.filter((c) => states.includes(c.state));
        }
        return result.map((c) => ({ ...c })).sort((a, b) => b.lastActivityTs - a.lastActivityTs).slice(
          query?.offset ?? 0,
          query?.limit === void 0 ? void 0 : (query.offset ?? 0) + query.limit
        );
      },
      async get(id) {
        const found = conversations.find((c) => matchesConversationId(c, id));
        return found ? { ...found } : null;
      },
      async getTranscript(id) {
        const agent = agents.find((candidate) => matchesConversationId(candidate, id));
        const conversation = conversations.find((candidate) => matchesConversationId(candidate, id)) ?? (agent ? {
          id: agent.id,
          ref: agent.ref,
          harnessId: agent.source,
          projectId: null,
          workspaceLocationId: null,
          title: agent.title ?? null,
          preview: agent.lastMessage ?? agent.preview ?? null,
          state: agent.state,
          branch: agent.branch ?? null,
          lastActivityTs: agent.lastActivityTs
        } : {
          id,
          ref: id,
          harnessId: "claude",
          projectId: null,
          workspaceLocationId: null,
          title: "Conversation",
          preview: null,
          state: "finished",
          branch: null,
          lastActivityTs: Date.now()
        });
        const userText = agent?.lastUserMessage ?? conversation.title ?? "Hello";
        const assistantText = agent?.lastMessage ?? conversation.preview ?? "…";
        return {
          conversation: { ...conversation },
          events: [
            {
              id: 1,
              user_turn_id: 1,
              position: 0,
              kind: "user_text",
              text: userText,
              timestamp_ms: conversation.lastActivityTs - 5e3,
              tool_call_id: null
            },
            {
              id: 2,
              user_turn_id: 1,
              position: 1,
              kind: "assistant_text",
              text: assistantText,
              timestamp_ms: conversation.lastActivityTs,
              tool_call_id: null
            }
          ],
          toolCalls: [],
          todoLists: [],
          userTurns: [
            {
              id: 1,
              conversation_id: 1,
              position: 0,
              prompt: userText,
              state: "completed",
              started_at: conversation.lastActivityTs - 5e3,
              ended_at: conversation.lastActivityTs
            }
          ],
          pagination: {
            totalTurns: 1,
            totalActivityEvents: 1,
            returnedTurns: 1,
            hasMoreBefore: false,
            nextBeforeTurnPosition: null
          }
        };
      },
      async searchTranscript(id, query) {
        const transcript = await this.getTranscript(id);
        const normalized = query.trim().toLocaleLowerCase();
        if (!transcript || normalized.length < 2) {
          return { matches: [], nextBeforeTurnPosition: null, done: true };
        }
        const positions = new Map(transcript.userTurns.map((turn) => [turn.id, turn.position]));
        return {
          matches: transcript.events.flatMap((event) => {
            const text = event.text ?? "";
            if (!text.toLocaleLowerCase().includes(normalized)) return [];
            return [
              {
                key: `event-${event.id}`,
                label: event.kind === "user_text" ? "User" : event.kind === "tool_result" ? "Tool result" : "Assistant",
                excerpt: text,
                turnPosition: positions.get(event.user_turn_id) ?? 0,
                focusEventId: event.id,
                focusToolCallId: null
              }
            ];
          }),
          nextBeforeTurnPosition: null,
          done: true
        };
      },
      async copy() {
      },
      async openLocation() {
      },
      async continueIn(_id, target) {
        return {
          conversationRef: "fixture-continuation",
          cwd: "/workspace/project",
          branch: `blume/continue-${target}-fixture`,
          sourcePath: `/home/fixture/.${target}/fixture.jsonl`,
          sessionId: "fixture-continuation",
          target
        };
      },
      async setIdle(id) {
        const agent = agents.find((c) => matchesConversationId(c, id));
        if (agent) agent.state = "idle";
        const target = conversations.find((c) => matchesConversationId(c, id));
        if (target) target.state = "idle";
        conversationsChanged.emit();
      },
      async dismiss(id) {
        const agent = agents.find((c) => matchesConversationId(c, id));
        if (agent) agent.state = "inactive";
        const target = conversations.find((c) => matchesConversationId(c, id));
        if (target) target.state = "inactive";
        conversationsChanged.emit();
      },
      async setTitle(id, title) {
        const agent = agents.find((c) => matchesConversationId(c, id));
        if (agent) agent.title = title;
        const target = conversations.find((c) => matchesConversationId(c, id));
        if (target) target.title = title;
        conversationsChanged.emit();
      },
      async regenerateTitle(id) {
        const title = "Generated title";
        const agent = agents.find((c) => matchesConversationId(c, id));
        if (agent) agent.title = title;
        const target = conversations.find((c) => matchesConversationId(c, id));
        if (target) target.title = title;
        conversationsChanged.emit();
        return title;
      },
      async applyTitleToHarness() {
      },
      async revertTitleToProvider(id) {
        const conversation = conversations.find((c) => matchesConversationId(c, id)) ?? agents.find((c) => matchesConversationId(c, id));
        conversationsChanged.emit();
        return conversation?.title ?? "Conversation";
      },
      async refresh() {
        conversationsChanged.emit();
      },
      onChanged: (callback) => conversationsChanged.subscribe(callback)
    },
    projects: {
      async list() {
        return structuredClone(projects);
      },
      async listRecent(limit) {
        return structuredClone(projects.slice(0, limit));
      },
      async get(id) {
        const found = projects.find((p) => p.id === id);
        return found ? structuredClone(found) : null;
      },
      async resolvePath(path, signal) {
        if (signal?.aborted) throw new Error("Project path resolution was cancelled.");
        return resolveProjectLocationForPath(projects, path);
      },
      onChanged: (callback) => projectsChanged.subscribe(callback)
    },
    setup: {
      list: (query) => setupService.list(query),
      listVersions: (artifactId) => setupService.listVersions(artifactId),
      getVersion: (versionId) => setupService.getVersion(versionId),
      async applyChange(change) {
        const version = await setupService.applyChange({
          ...change,
          parserVersion: "fixture",
          scannerVersion: "fixture"
        });
        setupChanged.emit();
        return version;
      },
      async undo(artifactId) {
        const version = await setupService.undo(artifactId);
        setupChanged.emit();
        return version;
      },
      async refresh() {
        setupChanged.emit();
      },
      onChanged: (callback) => setupChanged.subscribe(callback),
      async browseHarnesses() {
        return fixtureHarnessSetups.map((harness) => ({
          ...harness,
          artifacts: harness.artifacts?.filter(
            (artifact) => !deletedSetupArtifactIds.has(artifact.id)
          ),
          artifactRelationships: harness.artifactRelationships?.filter(
            (relationship) => !deletedSetupArtifactIds.has(relationship.fromUnitId) && !deletedSetupArtifactIds.has(relationship.toUnitId)
          ),
          categories: harness.categories.map((category) => ({
            ...category,
            entries: category.entries.map((entry) => ({ ...entry }))
          }))
        }));
      },
      async readEntry(path) {
        return currentSetupFileContent(path);
      },
      async writeEntry(path, content, options2) {
        writeSetupFile(path, content, options2, currentSetupFileContent);
      },
      async readProjectFile(path) {
        return currentProjectFileContent(path);
      },
      async writeProjectFile(path, content, options2) {
        writeSetupFile(path, content, options2, currentProjectFileContent);
      },
      async deleteArtifact(artifact) {
        deletedSetupArtifactIds.add(artifact.id);
        setupChanged.emit();
      },
      async listSyncStates(artifacts = []) {
        const selected = new Set(artifacts.map((artifact) => artifact.id));
        return [...syncedSetupArtifactIds].filter((artifactId) => selected.size === 0 || selected.has(artifactId)).map((artifactId) => ({ artifactId, status: "synced", revision: 1 }));
      },
      async previewSync(request) {
        const artifacts = request.type === "enable" ? request.artifacts : [];
        const items = artifacts.map((artifact) => ({
          artifactId: artifact.id,
          name: artifact.name,
          kind: artifact.source.type === "directory" ? "directory" : "file",
          fileCount: 1,
          totalBytes: 0,
          changes: [
            {
              path: artifact.source.type === "external" ? artifact.name : artifact.source.path ?? artifact.name,
              action: "add",
              bytes: 0
            }
          ],
          omittedChanges: 0,
          addCount: 1,
          updateCount: 0,
          removeCount: 0,
          conflictCount: 0
        }));
        return {
          type: request.type,
          items,
          fileCount: items.length,
          totalBytes: 0,
          addCount: items.length,
          updateCount: 0,
          removeCount: 0,
          conflictCount: 0
        };
      },
      async setSynced(selection) {
        for (const artifact of selection.artifacts) {
          if (selection.enabled) syncedSetupArtifactIds.add(artifact.id);
          else syncedSetupArtifactIds.delete(artifact.id);
        }
        setupChanged.emit();
        return selection.enabled ? selection.artifacts.map((artifact) => ({
          artifactId: artifact.id,
          status: "synced",
          revision: 1
        })) : [];
      },
      async placeSynced(placement) {
        syncedSetupArtifactIds.add(placement.artifactId);
        setupChanged.emit();
        return [
          {
            artifactId: placement.artifactId,
            status: "synced",
            revision: 1,
            localPath: placement.runtimePath
          }
        ];
      },
      async scanProject(path) {
        const unit = (suffix, value) => ({
          id: `fixture_project_${suffix}`,
          influence: "capability",
          composition: "atomic",
          scope: "project",
          provider: "claude",
          parserVersion: "fixture-1",
          scannerVersion: "fixture-1",
          ...value
        });
        const scan = {
          path,
          name: "demo",
          harnesses: [],
          scattered: [],
          categories: [
            {
              name: "skills",
              entries: [{ name: "review.md", contentPath: `${path}/.claude/skills/review.md` }]
            }
          ],
          artifacts: [
            unit("claude_md", {
              name: "CLAUDE.md",
              kind: "instruction",
              influence: "instructions",
              source: { type: "file", path: "CLAUDE.md", runtimePath: `${path}/CLAUDE.md` }
            }),
            unit("agents_md", {
              name: "AGENTS.md",
              kind: "instruction",
              influence: "instructions",
              provider: void 0,
              source: { type: "file", path: "AGENTS.md", runtimePath: `${path}/AGENTS.md` }
            }),
            unit("review_skill", {
              name: "review",
              kind: "skill",
              source: {
                type: "file",
                path: ".claude/skills/review.md",
                runtimePath: `${path}/.claude/skills/review.md`
              }
            }),
            unit("deploy_command", {
              name: "deploy",
              kind: "command",
              source: {
                type: "file",
                path: ".claude/commands/deploy.md",
                runtimePath: `${path}/.claude/commands/deploy.md`
              }
            }),
            unit("pre_commit_hook", {
              name: "pre-commit checks",
              kind: "hook",
              metadata: { event: "PreToolUse", matcher: "Bash" },
              source: {
                type: "config-entry",
                path: ".claude/settings.json",
                runtimePath: `${path}/.claude/settings.json`,
                keyPath: "hooks.PreToolUse[0]"
              }
            }),
            unit("settings", {
              name: "settings.json",
              kind: "configuration",
              influence: "configuration",
              source: {
                type: "file",
                path: ".claude/settings.json",
                runtimePath: `${path}/.claude/settings.json`
              }
            }),
            unit("architecture_doc", {
              name: "ARCHITECTURE.md",
              kind: "knowledge",
              influence: "knowledge",
              provider: void 0,
              source: {
                type: "file",
                path: "docs/ARCHITECTURE.md",
                runtimePath: `${path}/docs/ARCHITECTURE.md`
              }
            })
          ],
          artifactRelationships: [],
          artifactDiagnostics: [],
          artifactsTruncated: false
        };
        scan.artifacts = scan.artifacts.filter(
          (artifact) => !deletedSetupArtifactIds.has(artifact.id)
        );
        return scan;
      }
    },
    improve: {
      async getSignalAnalytics() {
        return createSignalAnalyticsFixture(Date.parse(options.now?.() ?? (/* @__PURE__ */ new Date()).toISOString()));
      },
      async listSuggestions(filter) {
        const all = suggestions.map((s) => ({ ...s }));
        return filter?.status ? all.filter((s) => s.status === filter.status) : all;
      },
      async markSuggestionsShown() {
      },
      async listClusters() {
        const now = Date.parse(options.now?.() ?? (/* @__PURE__ */ new Date()).toISOString());
        return [
          {
            id: 1,
            normalizedKey: "verify-before-changing-direction",
            canonicalSummary: "Confirm the intended direction before replacing an existing approach.",
            status: "open",
            signalCount: 2,
            conversationCount: 2,
            projectCount: 2,
            harnesses: ["codex", "claude"],
            highPainConversationCount: 1,
            dismissedCount: 0,
            promotedAt: null,
            firstSeenAt: now - 18 * 864e5,
            lastSeenAt: now - 2 * 864e5,
            signalTypeCounts: { correction: 1, steering: 1, frustration: 0 },
            promotion: { promoted: false, ratio: 0.72, reason: "repeated pattern" }
          },
          {
            id: 2,
            normalizedKey: "preserve-shared-architecture",
            canonicalSummary: "Keep product behavior in shared packages so Electron and Web Lab stay aligned.",
            status: "open",
            signalCount: 1,
            conversationCount: 1,
            projectCount: 1,
            harnesses: ["codex"],
            highPainConversationCount: 0,
            dismissedCount: 0,
            promotedAt: null,
            firstSeenAt: now - 13 * 864e5,
            lastSeenAt: now - 864e5,
            signalTypeCounts: { correction: 0, steering: 1, frustration: 0 },
            promotion: { promoted: false, ratio: 0.64, reason: "repeated pattern" }
          },
          {
            id: 3,
            normalizedKey: "test-without-browser-friction",
            canonicalSummary: "Use reliable automated checks without repeatedly interrupting the user.",
            status: "open",
            signalCount: 1,
            conversationCount: 1,
            projectCount: 1,
            harnesses: ["codex"],
            highPainConversationCount: 2,
            dismissedCount: 0,
            promotedAt: null,
            firstSeenAt: now - 9 * 864e5,
            lastSeenAt: now - 3 * 864e5,
            signalTypeCounts: { correction: 0, steering: 0, frustration: 1 },
            promotion: { promoted: false, ratio: 0.81, reason: "high-pain pattern" }
          }
        ];
      },
      async listClusterSignals(clusterId) {
        const now = Date.parse(options.now?.() ?? (/* @__PURE__ */ new Date()).toISOString());
        const byCluster = {
          1: [
            {
              id: "signal-1",
              type: "correction",
              kind: "workflow",
              summary: "The assistant replaced the chosen direction without confirming first.",
              conversationId: "conversation-17",
              observedHarness: "codex",
              capturedAt: now - 2 * 864e5,
              messages: [
                {
                  text: "Wait, do not replace the existing approach. I only asked you to make the layout more compact.",
                  role: "user",
                  turn: 14
                }
              ]
            },
            {
              id: "signal-2",
              type: "steering",
              kind: "preference",
              summary: "The user asked for confirmation before a broad implementation change.",
              conversationId: "conversation-11",
              observedHarness: "claude",
              capturedAt: now - 6 * 864e5,
              messages: [
                {
                  text: "Show me the shared boundary first, then we can decide whether to change the host contract.",
                  role: "user",
                  turn: 8
                }
              ]
            }
          ],
          2: [
            {
              id: "signal-3",
              type: "steering",
              kind: "architecture",
              summary: "Reusable product UI should live outside the Electron shell.",
              conversationId: "conversation-22",
              observedHarness: "codex",
              capturedAt: now - 864e5,
              messages: [
                {
                  text: "Please put this in reusable packages so web-lab and Electron render the same product.",
                  role: "user",
                  turn: 21
                }
              ]
            }
          ],
          3: [
            {
              id: "signal-4",
              type: "frustration",
              kind: "workflow",
              summary: "Browser-based testing repeatedly interrupted the user.",
              conversationId: "conversation-29",
              observedHarness: "codex",
              capturedAt: now - 3 * 864e5,
              messages: [
                {
                  text: "Can you do this without opening the browser window and making me finish the test?",
                  role: "user",
                  turn: 31
                }
              ]
            }
          ]
        };
        return byCluster[clusterId] ?? [];
      },
      async listHistory() {
        return suggestions.filter((s) => s.status !== "open").map((s) => ({ ...s }));
      },
      async listReadyConversations() {
        return agents.filter((conversation) => conversation.state === "inactive").slice(0, 4).map((conversation) => ({
          conversationId: conversation.id,
          conversationRef: conversation.ref,
          conversationTitle: conversation.title ?? null,
          projectId: conversation.projectId ?? null,
          projectName: conversation.projectName,
          harnessId: conversation.source,
          lastActivityTs: conversation.lastActivityTs,
          latestMessagePosition: 6,
          lastProcessedMessagePosition: null
        }));
      },
      async countProcessedConversations() {
        return 0;
      },
      async processReadyConversations(conversationIds) {
        const selected = conversationIds ? new Set(conversationIds) : null;
        const ready = (await host.improve.listReadyConversations()).filter(
          (item) => selected === null || selected.has(item.conversationId)
        );
        return {
          queued: ready.length,
          conversationIds: ready.map((item) => item.conversationId),
          batchId: ready.length > 0 ? "fixture-manual-batch" : null
        };
      },
      async cancelReadyConversationProcessing() {
        return true;
      },
      async listRuns() {
        return [];
      },
      async getRunDetail() {
        return null;
      },
      async run() {
        return { runId: "run_fixture", status: "succeeded", suggestionsCreated: 0, signalsFound: 2 };
      },
      async runSetupAudit(request) {
        return {
          status: request.projectPath ? "succeeded" : "skipped",
          runId: request.projectPath ? "setup_audit_fixture" : null,
          signalsCreated: request.checkIds?.length ?? 1,
          ...request.projectPath ? {} : { skipReason: "no-observed-harnesses" }
        };
      },
      async apply(id) {
        const target = suggestions.find((s) => s.id === id);
        if (target) target.status = "applied";
        return { status: "applied", changedPaths: [".claude/rules/generated.md"] };
      },
      async undo(id) {
        const target = suggestions.find((s) => s.id === id);
        if (target) target.status = "open";
        return { status: "reverted" };
      },
      async snooze(id) {
        const target = suggestions.find((s) => s.id === id);
        if (target) target.status = "snoozed";
      },
      async dismiss(id) {
        const target = suggestions.find((s) => s.id === id);
        if (target) target.status = "dismissed";
      },
      async revise(id) {
        const target = suggestions.find((s) => s.id === id);
        if (target) target.status = "archived";
      },
      async getEvidence(suggestionId) {
        return [
          {
            signalId: `sig_${suggestionId}`,
            kind: "friction",
            summary: "Repeated manual step the assistant had to be reminded of.",
            observedHarness: "claude",
            capturedAt: 170000008e4,
            excerpts: [
              {
                text: "Please remember to run the linter before committing.",
                role: "user",
                turnPosition: 0,
                eventId: 1,
                toolCallId: null
              }
            ],
            conversation: {
              id: "conv_1",
              title: "Wire up the settings store",
              project: "acme",
              date: 170000008e4
            }
          }
        ];
      },
      async getSettings() {
        return {
          ...improveSettings,
          excludedHarnesses: [...improveSettings.excludedHarnesses],
          scopes: [...improveSettings.scopes],
          artifacts: [...improveSettings.artifacts]
        };
      },
      async setSettings(patch) {
        Object.assign(improveSettings, patch);
        return {
          ...improveSettings,
          excludedHarnesses: [...improveSettings.excludedHarnesses],
          scopes: [...improveSettings.scopes],
          artifacts: [...improveSettings.artifacts]
        };
      },
      onProgress: (callback) => improveProgress.subscribe(callback),
      onControlledAgentProgress: (callback) => controlledAgentProgress.subscribe(callback)
    },
    harnesses: {
      async list() {
        return structuredClone(harnesses);
      },
      async suggestProjectFolders() {
        return [
          { path: "/home/blume/code/orchard", name: "orchard", reason: "git" },
          { path: "/home/blume/code/notes", name: "notes", reason: "recent" }
        ];
      },
      async createStarterProjectFolder() {
        return "/home/blume/.blume/projects/first-project";
      },
      async openSetupTerminal() {
      },
      async detectFirstRun() {
        return structuredClone(
          options.seed?.firstRunDetection ?? {
            harnesses: harnesses.map((option) => ({
              harnessId: option.harnessId,
              label: option.label,
              installEvidence: false
            })),
            otherTools: []
          }
        );
      },
      async managedRouterStatus() {
        return structuredClone(
          options.seed?.managedRouterStatus ?? (firstRun ? {
            available: true,
            signedIn: true,
            configured: true,
            grantRemainingUsd: 3.42,
            billedUsd: 0,
            billingReady: false,
            paymentMethods: []
          } : {
            available: true,
            signedIn: true,
            configured: true,
            grantRemainingUsd: 3.42,
            billedUsd: 1.58,
            billingReady: true,
            paymentMethods: [
              {
                id: "pm_fixture_visa",
                type: "card",
                brand: "visa",
                last4: "4242",
                expiryMonth: 12,
                expiryYear: 2030
              }
            ]
          })
        );
      },
      async openManagedBilling() {
        return { ok: true };
      },
      ...firstRun ? {
        async setUpManagedPi() {
          await new Promise((resolve) => setTimeout(resolve, 900));
          return { status: "ready", model: "gemini-3-flash", grantRemainingUsd: 5 };
        }
      } : {}
    },
    usage: {
      async getReport() {
        return structuredClone(usage);
      },
      async setCursorCookie() {
      },
      async connectProvider() {
      },
      async openKeychainAccess() {
      },
      onChanged: (callback) => usageChanged.subscribe(callback)
    }
  };
  if (options.withTerminal !== false) {
    host.terminal = createEchoTerminalHost(
      firstRun ? {
        onCommandRun: (_tabId, command, io) => {
          if (command === "pi" || command.startsWith("pi ") || command.includes("pi-gui")) {
            setTimeout(
              () => {
                agents.push(firstRunDiscoveredConversation());
                conversationsChanged.emit();
              },
              command.includes("pi-gui") ? 4500 : 2500
            );
            if (!command.includes("pi-gui")) return;
          }
          if (/install|brew/.test(command)) {
            const lines = [
              `$ ${command}\r
`,
              "resolving packages…\r\n",
              "added 42 packages in 1.8s\r\n"
            ];
            lines.forEach((line, index) => setTimeout(() => io.write(line), 250 * (index + 1)));
          }
          setTimeout(() => io.fire(0), 1400);
        }
      } : {}
    );
  }
  return host;
}
function firstRunDiscoveredConversation() {
  const now = Date.now();
  return {
    id: "first-run-pi",
    ref: "pi:first-run-pi",
    source: "pi",
    title: "What files are in this folder?",
    state: "running",
    project: "first-project",
    projectId: "first-project",
    projectName: "first-project",
    preview: "Listing the files in this folder…",
    lastActivityTs: now,
    startedAt: now
  };
}
function createEchoTerminalHost(options = {}) {
  const tabs = /* @__PURE__ */ new Map();
  const output = /* @__PURE__ */ new Map();
  const statusChanged = createEmitter();
  const pageRequested = createEmitter();
  const commandExits = /* @__PURE__ */ new Map();
  let counter = 0;
  const open = async (input, requestPage) => {
    const id = `tab_${++counter}`;
    const tab = {
      id,
      harnessId: input.harnessId,
      title: input.title ?? input.harnessId,
      status: "running",
      cwd: input.cwd ?? "/home/blume-session/project",
      ..."suggestions" in input && input.suggestions?.length ? { suggestions: input.suggestions } : {}
    };
    tabs.set(id, tab);
    output.set(id, createEmitter());
    commandExits.set(id, createEmitter());
    statusChanged.emit({ ...tab });
    if (requestPage) pageRequested.emit({ ...tab });
    if (input.command) {
      options.onCommandRun?.(id, input.command, {
        fire: (exitCode) => commandExits.get(id)?.emit(exitCode),
        write: (data) => output.get(id)?.emit(data)
      });
    }
    return { ...tab };
  };
  return {
    async listTabs() {
      return [...tabs.values()].map((t) => ({ ...t }));
    },
    openTab: (input) => open(input, false),
    openPage: (input) => open(input, true),
    async write(tabId, data) {
      output.get(tabId)?.emit(data);
    },
    async resize() {
    },
    async restart(tabId) {
      const tab = tabs.get(tabId);
      if (tab) {
        tab.status = "running";
        statusChanged.emit({ ...tab });
      }
    },
    async close(tabId) {
      tabs.delete(tabId);
      output.delete(tabId);
    },
    onCommandExit(tabId, callback) {
      let emitter = commandExits.get(tabId);
      if (!emitter) {
        emitter = createEmitter();
        commandExits.set(tabId, emitter);
      }
      return emitter.subscribe(callback);
    },
    onOutput(tabId, callback) {
      let emitter = output.get(tabId);
      if (!emitter) {
        emitter = createEmitter();
        output.set(tabId, emitter);
      }
      return emitter.subscribe(callback);
    },
    onStatus: (callback) => statusChanged.subscribe(callback),
    onPageRequested: (callback) => pageRequested.subscribe(callback)
  };
}
export {
  createEmitter,
  createFixtureHost,
  createSignalAnalyticsFixture,
  fixtureAgentConversations,
  fixtureConversations,
  fixtureHarnessOptions,
  fixtureHarnessSetups,
  fixtureImproveSettings,
  fixtureProjects,
  fixtureSetupObservations,
  fixtureSuggestions,
  fixtureUsage
};
//# sourceMappingURL=index-DJkdnVy8.js.map

//# debugId=4fbc8375-a16f-583b-8f87-42dd105f5583
