"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7733e536-efe3-5103-8bb2-9ef1db89f438")}catch(e){}}();

const BLUME_HARNESS_RUNS_ID = "qdfpv5";
const BLUME_HARNESS_RUNS_DIRNAME = `harnessruns${BLUME_HARNESS_RUNS_ID}`;
const BLUME_LEGACY_HARNESS_RUNS_DIRNAME = "harness-runs";
const HARNESS_RUNS_SEGMENT = new RegExp(
  `(?:^|/)\\.blume/(?:\\.dev/[^/]+/)?(?:${BLUME_HARNESS_RUNS_DIRNAME}|${BLUME_LEGACY_HARNESS_RUNS_DIRNAME})(?:/|$)`
);
const BLUME_LEGACY_PROBE_ROOTS = ["/tmp/blume-probe", "/private/tmp/blume-probe"];
function normalizeHarnessRunsPath(path) {
  return path.replace(/\\/g, "/").replace(/\/+$/, "");
}
function isHarnessRunsDirSegment(segment) {
  return segment === BLUME_HARNESS_RUNS_DIRNAME || segment === BLUME_LEGACY_HARNESS_RUNS_DIRNAME;
}
function isLegacyProbePath(path) {
  return BLUME_LEGACY_PROBE_ROOTS.some(
    (root) => path === root || path.startsWith(`${root}/`)
  );
}
function joinHarnessRunsSegment(root, segment) {
  const normalizedRoot = normalizeHarnessRunsPath(root);
  if (normalizedRoot) return `${normalizedRoot}/${segment}`;
  return root.startsWith("/") || root.startsWith("\\") ? `/${segment}` : segment;
}
function isUnderBlumeHarnessRunsRoot(path, blumeRoot) {
  const normalizedRoot = normalizeHarnessRunsPath(blumeRoot);
  if (!normalizedRoot || !path.startsWith(`${normalizedRoot}/`)) return false;
  const rel = path.slice(normalizedRoot.length + 1).split("/");
  return isHarnessRunsDirSegment(rel[0]) || rel[0] === ".dev" && rel.length >= 3 && isHarnessRunsDirSegment(rel[2]);
}
function isBlumeHarnessRunsPath(path, options = {}) {
  if (!path) return false;
  if (path.includes(BLUME_HARNESS_RUNS_ID)) return true;
  const normalized = normalizeHarnessRunsPath(path);
  if (isLegacyProbePath(normalized)) return true;
  if (HARNESS_RUNS_SEGMENT.test(normalized)) return true;
  if (options.blumeRoot && isUnderBlumeHarnessRunsRoot(normalized, options.blumeRoot)) {
    return true;
  }
  return false;
}
function realpathOrOriginal(path, realpath) {
  try {
    return realpath(path);
  } catch {
    return path;
  }
}
function isSymlinkAwareBlumeHarnessRunsPath(path, options) {
  if (!path) return false;
  if (isBlumeHarnessRunsPath(path)) return true;
  const resolved = normalizeHarnessRunsPath(realpathOrOriginal(path, options.realpath));
  if (isBlumeHarnessRunsPath(resolved)) return true;
  const resolvedHomeBlumeRoot = normalizeHarnessRunsPath(
    realpathOrOriginal(options.homeBlumeRoot, options.realpath)
  );
  if (isBlumeHarnessRunsPath(resolved, { blumeRoot: resolvedHomeBlumeRoot })) {
    return true;
  }
  const markers = [
    joinHarnessRunsSegment(options.currentBlumeRoot, BLUME_HARNESS_RUNS_DIRNAME),
    joinHarnessRunsSegment(options.homeBlumeRoot, BLUME_HARNESS_RUNS_DIRNAME),
    joinHarnessRunsSegment(options.homeBlumeRoot, BLUME_LEGACY_HARNESS_RUNS_DIRNAME)
  ];
  return markers.some((markerPath) => {
    const marker = normalizeHarnessRunsPath(realpathOrOriginal(markerPath, options.realpath));
    return resolved === marker || resolved.startsWith(`${marker}/`);
  });
}
exports.isSymlinkAwareBlumeHarnessRunsPath = isSymlinkAwareBlumeHarnessRunsPath;
//# sourceMappingURL=harnessRuns-C9zOkWLa.js.map

//# debugId=7733e536-efe3-5103-8bb2-9ef1db89f438
