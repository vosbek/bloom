
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="912c6b18-87f0-5031-a65b-8cd28dd1a91c")}catch(e){}}();
import { hx as reactExports, hy as readCached, fs as cachedLoad, gp as githubErrorText, iW as useHostResource, gw as hostSnapshotsEqual } from "./index-nrW_ocxo.js";
const GITHUB_FOCUS_REFRESH_MS = 6e4;
function repositoriesCache(projects, login) {
  return { scope: projects, key: `github.projects.list:${login ?? ""}` };
}
function useGitHubRepositories(projects, connected, login) {
  const cache = reactExports.useMemo(
    () => projects && connected ? repositoriesCache(projects, login) : void 0,
    [projects, connected, login]
  );
  const [list, setList] = reactExports.useState(
    () => cache ? readCached(cache)?.data : void 0
  );
  const [error, setError] = reactExports.useState("");
  const load = reactExports.useCallback(
    (refresh = false) => {
      if (!projects || !cache) return;
      void cachedLoad(cache, () => projects.list({ refresh })).then(
        (next) => {
          setList(next);
          setError("");
        },
        (e) => setError(githubErrorText(e))
      );
    },
    [projects, cache]
  );
  reactExports.useEffect(() => {
    if (!projects || !cache) {
      setList(void 0);
      return;
    }
    setList(readCached(cache)?.data);
    load();
    const onFocus = () => {
      if (Date.now() - (readCached(cache)?.at ?? 0) >= GITHUB_FOCUS_REFRESH_MS) load(true);
    };
    window.addEventListener("focus", onFocus);
    const stop = projects.onChanged?.(() => load());
    return () => {
      window.removeEventListener("focus", onFocus);
      stop?.();
    };
  }, [load, projects, cache]);
  return { list: cache ? list : void 0, error, reload: load };
}
function useLocalProjects(localHost) {
  return useHostResource(
    () => localHost ? localHost.projects.list() : Promise.resolve(null),
    (onChanged) => localHost ? localHost.projects.onChanged(onChanged) : () => {
    },
    [localHost],
    {
      isEqual: hostSnapshotsEqual,
      cache: localHost ? { scope: localHost, key: "projects.list" } : void 0
    }
  );
}
const CONVERSATION_LIMIT = 50;
function useProjectConversations(localHost, locals) {
  const ids = locals.map((local) => local.id).join("\n");
  return useHostResource(
    async () => {
      if (!localHost) return null;
      if (!ids) return [];
      const pages = await Promise.all(
        ids.split("\n").map(
          (projectId) => localHost.conversations.list({
            projectId,
            includeDismissed: true,
            limit: CONVERSATION_LIMIT
          })
        )
      );
      return pages.flat().sort((a, b) => b.lastActivityTs - a.lastActivityTs).slice(0, CONVERSATION_LIMIT);
    },
    (onChanged) => localHost ? localHost.conversations.onChanged(onChanged) : () => {
    },
    [localHost, ids],
    {
      isEqual: hostSnapshotsEqual,
      debounceMs: 500,
      cache: localHost ? { scope: localHost, key: `projects.conversations:${CONVERSATION_LIMIT}:${ids}` } : void 0
    }
  );
}
export {
  useLocalProjects as a,
  useProjectConversations as b,
  useGitHubRepositories as u
};
//# sourceMappingURL=projectsPageData-z5SiU3uh.js.map

//# debugId=912c6b18-87f0-5031-a65b-8cd28dd1a91c
