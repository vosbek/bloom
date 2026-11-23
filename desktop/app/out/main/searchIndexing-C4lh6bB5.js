"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="283e3055-5b05-5cca-9d94-9ec4888af2b4")}catch(e){}}();

const SEARCH_INDEX_START_DELAY_MS = 3e4;
const SEARCH_INDEX_INTERVAL_MS = 10 * 6e4;
const SEARCH_BACKFILL_PAUSE_MS = 25;
const MAX_COMMIT_INDEX_REPOSITORIES = 64;
const SEARCH_INDEX_HEARTBEAT_MS = 15e3;
const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function aborted(signal) {
  return signal?.aborted === true;
}
function message(error) {
  return error instanceof Error ? error.message : String(error);
}
async function indexRepository(store, git, candidate, signal) {
  let lastError = null;
  for (const root of candidate.paths) {
    if (aborted(signal)) return { commits: 0, error: null };
    let tips;
    try {
      tips = await git.readTips(root, signal);
    } catch (error) {
      lastError = message(error);
      continue;
    }
    const state = await store.getCommitRepositoryState(candidate.repository);
    const indexed = state?.heads ?? [];
    const current = new Set(tips.map((tip) => tip.sha));
    if (state && indexed.length === current.size && indexed.every((sha) => current.has(sha))) {
      await store.writeCommits({
        repository: candidate.repository,
        root,
        projectId: candidate.projectId,
        heads: [...current],
        commits: []
      });
      return { commits: 0, error: null };
    }
    try {
      const commits = await git.readCommits(root, tips, indexed, signal);
      if (aborted(signal)) return { commits: 0, error: null };
      await store.writeCommits({
        repository: candidate.repository,
        root,
        projectId: candidate.projectId,
        heads: [...current],
        commits
      });
      return { commits: commits.length, error: null };
    } catch (error) {
      if (aborted(signal)) return { commits: 0, error: null };
      const reason = message(error);
      await store.recordCommitIndexError({
        repository: candidate.repository,
        root,
        projectId: candidate.projectId,
        error: reason
      });
      return { commits: 0, error: reason };
    }
  }
  if (lastError && !aborted(signal))
    await store.recordCommitIndexError({
      repository: candidate.repository,
      root: candidate.paths[0] ?? candidate.repository,
      projectId: candidate.projectId,
      error: lastError
    });
  return { commits: 0, error: lastError };
}
async function runSearchIndexPass(store, git, options = {}) {
  const sleep = options.sleep ?? defaultSleep;
  const pauseMs = options.pauseMs ?? SEARCH_BACKFILL_PAUSE_MS;
  const progress = {
    phase: "backfill",
    backfilledRows: 0,
    backfillDone: false,
    repositories: 0,
    commits: 0,
    errors: 0
  };
  if (!await store.available()) {
    progress.backfillDone = true;
    return progress;
  }
  while (!aborted(options.signal)) {
    const step = await store.backfillStep();
    progress.backfilledRows += step.indexed;
    progress.backfillDone = step.done;
    options.onProgress?.({ ...progress });
    if (step.done) break;
    await sleep(pauseMs);
  }
  if (aborted(options.signal)) return progress;
  await store.optimize();
  if (!git) return progress;
  progress.phase = "commits";
  const candidates = await store.listCommitRepositories();
  const visitedAt = new Map(
    await Promise.all(
      candidates.map(
        async (candidate) => [
          candidate.repository,
          (await store.getCommitRepositoryState(candidate.repository))?.indexedAt ?? 0
        ]
      )
    )
  );
  const repositories = candidates.map((candidate, order) => ({ candidate, order })).sort(
    (a, b) => (visitedAt.get(a.candidate.repository) ?? 0) - (visitedAt.get(b.candidate.repository) ?? 0) || a.order - b.order
  ).slice(0, MAX_COMMIT_INDEX_REPOSITORIES).map(({ candidate }) => candidate);
  const heartbeat = options.onProgress ? setInterval(
    () => options.onProgress?.({ ...progress }),
    options.heartbeatMs ?? SEARCH_INDEX_HEARTBEAT_MS
  ) : null;
  try {
    for (const candidate of repositories) {
      if (aborted(options.signal)) break;
      const result = await indexRepository(store, git, candidate, options.signal);
      progress.repositories += 1;
      progress.commits += result.commits;
      if (result.error) progress.errors += 1;
      options.onProgress?.({ ...progress });
    }
  } finally {
    if (heartbeat) clearInterval(heartbeat);
  }
  return progress;
}
exports.SEARCH_INDEX_INTERVAL_MS = SEARCH_INDEX_INTERVAL_MS;
exports.SEARCH_INDEX_START_DELAY_MS = SEARCH_INDEX_START_DELAY_MS;
exports.runSearchIndexPass = runSearchIndexPass;
//# sourceMappingURL=searchIndexing-C4lh6bB5.js.map

//# debugId=283e3055-5b05-5cca-9d94-9ec4888af2b4
