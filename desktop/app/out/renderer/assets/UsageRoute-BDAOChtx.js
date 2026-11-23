
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b61c1546-b56a-5a6f-8d2e-9fd38926ab67")}catch(e){}}();
import { jp as useSidecarHost, hx as reactExports, ie as startVisibleInterval, gP as jsxRuntimeExports, cT as PageHeader, dl as RefreshCw, ej as Skeleton, hC as relativeTime, an as ConceptIcon, fr as byUrgency, iy as usagePlanOf, Q as Card, bb as ErrorPage, J as Button, b6 as EmptyPage, e_ as UsagePlanColumnCard, j7 as useOptionalSidecarHost, bU as HostedPage } from "./index-nrW_ocxo.js";
const AUTO_REFRESH_MS = 5 * 6e4;
function useUsageReport() {
  const host = useSidecarHost();
  const [report, setReport] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const sequence = reactExports.useRef(0);
  const load = reactExports.useCallback(
    (force = false) => {
      const current = ++sequence.current;
      host.usage.getReport(force).then(
        (next) => {
          if (current !== sequence.current) return;
          setReport(next);
          setError(null);
          setLoading(false);
        },
        (caught) => {
          if (current !== sequence.current) return;
          setError(caught instanceof Error ? caught.message : "Usage could not be read.");
          setLoading(false);
        }
      );
    },
    [host]
  );
  const refresh = reactExports.useCallback(() => {
    setLoading(true);
    load(true);
  }, [load]);
  reactExports.useEffect(() => {
    load();
    return startVisibleInterval(() => load(), AUTO_REFRESH_MS);
  }, [load]);
  return { report, loading, error, refresh };
}
function usageHeaderData(report, loading, refresh, now) {
  const plans = report?.providers.length ?? 0;
  return {
    view: "usage",
    kind: "Usage",
    kindConcept: "usage",
    title: "Usage",
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "usage", tileSize: "lg" }), shape: "tile" },
    summary: "What is left on your AI plans, whichever agent spends them.",
    facts: [
      {
        id: "plans",
        label: "Plans",
        value: report ? `${plans} ${plans === 1 ? "plan" : "plans"}` : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-12 rounded" }),
        concept: "usage"
      },
      {
        id: "checked",
        label: "Last checked",
        value: report ? relativeTime(report.fetchedAt, now) : /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-14 rounded" }),
        concept: "activity",
        metric: true
      }
    ],
    // Page commands live in the header's "…" menu at the far right of its top strip.
    menu: [
      {
        label: loading ? "Refreshing…" : "Refresh",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { "aria-hidden": true }),
        detail: "Read every plan’s quota again",
        disabled: loading,
        onSelect: refresh
      }
    ]
  };
}
function UsageDashboard() {
  const usage = useUsageReport();
  return (
    // The hosted page region pads its content (as on Plugin); no inset of its own on top.
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Usage", className: "flex min-w-0 flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { header: usageHeaderData(usage.report, usage.loading, usage.refresh, Date.now()) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(UsagePlanCards, { ...usage })
    ] })
  );
}
function UsagePlanCards({
  report,
  loading,
  error,
  refresh
}) {
  const now = Date.now();
  const plans = reactExports.useMemo(
    () => report ? byUrgency(report.providers).map(usagePlanOf) : [],
    [report]
  );
  if (!report && loading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrid, { children: [0, 1, 2].map((index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "min-w-0", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-full" })
    ] }, index)) });
  if (!report)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorPage,
      {
        title: "Usage could not be read",
        description: "Blume could not read your plans' usage on this computer.",
        detail: error ?? void 0,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "xs", onClick: refresh, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { "aria-hidden": true }),
          "Try again"
        ] })
      }
    );
  if (!report.providers.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyPage,
      {
        variant: "nothingYet",
        scene: "laptop",
        title: "No plans to show yet",
        description: "None of the AI plans on this computer report their usage yet. They appear here once an agent you use does."
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrid, { children: plans.map((plan) => (
    // Each plan is one group, named by the plan, in the grid.
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "group",
        "aria-label": plan.title,
        className: "grid min-w-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsagePlanColumnCard, { plan, now, onRefresh: refresh })
      },
      plan.report.harnessId
    )
  )) });
}
function CardGrid({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "@container/usage", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 @xl/usage:grid-cols-2 @5xl/usage:grid-cols-3 @7xl/usage:grid-cols-4", children }) });
}
function UsageRoute() {
  const local = useOptionalSidecarHost();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HostedPage, { children: local ? /* @__PURE__ */ jsxRuntimeExports.jsx(UsageDashboard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    EmptyPage,
    {
      variant: "nothingYet",
      scene: "laptop",
      title: "Usage is read on your computer",
      description: "Open the Blume desktop app to see what is left on your AI plans."
    }
  ) });
}
export {
  UsageRoute
};
//# sourceMappingURL=UsageRoute-BDAOChtx.js.map

//# debugId=b61c1546-b56a-5a6f-8d2e-9fd38926ab67
