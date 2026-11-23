
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="241f47f0-e811-5d6e-a0fd-fe041e16a6ad")}catch(e){}}();
import { j7 as useOptionalSidecarHost, iA as useAccountScope, hx as reactExports, hy as readCached, fs as cachedLoad, jB as writeCached, gI as invalidateCached, ft as calendarSignalAnalyticsWindow, gP as jsxRuntimeExports, Q as Card, bR as HeadingText, eV as TooltipLabel, c1 as Info, J as Button, a3 as ChevronRight, dn as SIGNAL_TYPES, gY as localSignalRate, i6 as signalTrend, gh as formatRate, dp as SIGNAL_TYPE_META, h8 as ordinal, an as ConceptIcon, G as Badge, it as trendBadge, iu as trendText, hT as rollingRates, i8 as smoothChartPath, O as CONCEPT_META, fE as cn, ek as SkeletonSurface, gl as gaugeArc, ej as Skeleton, fD as clustersWithType, jv as useWorkspaceSignals, i7 as signalTypeOf, iS as useExpandableSections, cS as PageContent, cT as PageHeader, bf as ExpandableSection, ar as ConfigurableListGroup, ah as ClusterRow, dC as SectionSummary, eh as SignalRowsSkeleton, eg as SignalRows, gn as gaugeZoneForPercentile, gm as gaugePoint, bF as GAUGE_ZONES, gk as formingClusters, fy as clusterFirstSignalAt, c_ as Pencil, db as ProjectReference, hF as repositoryFlowerSeed, e$ as Users, fT as date, fV as deliveryActivityLabel, ai as ClusterStatusFacet, cU as PageHeaderPage, af as ClusterImprovement, d8 as Progress, h1 as noImprovementText, b$ as ImprovementStateFacet, gE as improvementStateOf, ag as ClusterKindMix, at as ConfigurableListItem, aE as DeliveryAvatar, jz as wornEmoji, fZ as deliveryProject, gM as isSource, bN as HARNESS_LABEL, g as AgentAvatar, hP as resolveProject, fA as clusterProject, k as AgentReference, aj as CodingToolReference, fF as codingToolOfHarness, aH as DeliveryReference, f_ as deliveryRefOf, fX as deliveryModelOf, ef as SignalKindFacet, gR as kindLabel, al as ColumnLayout, iC as useAppRoute, jn as useScopedExpansionStore, cR as PageColumnCard, bg as ExpansionStoreProvider, ax as ConversationTranscriptPreview, T as CardHeaderLabel, v as ArrowUpRight, fJ as conversationPath, fu as canOpenSignalMessage, h0 as mergeTargets, bJ as GitMerge, o as ArchiveRestore, fb as X, j5 as useOptionalNavigator, gz as improveGroups, h6 as openImprovements, hR as resolvedImprovements, fz as clusterImprovement, jr as useSubViewState, hO as resolveImproveSubView, gB as improveSubViewTitle, gC as improveSubViewToken, gA as improveSubViewParent, bV as IMPROVE_PAGE, iL as useClusterDetail, fB as clusterSignature, iN as useCompactLayout, fC as clusterSubView, dx as SectionHeader, b_ as ImprovementRowsSkeleton, bZ as ImprovementRow, gD as improvementActions, c0 as ImprovementsEmptyState, bb as ErrorPage, bY as ImprovementPreview, aQ as DismissImprovementDialog, bX as ImprovementHistory, ei as SignalsAndClustersPage, bW as ImprovementEvidence, gG as improvementStatusLabel, d9 as ProjectAvatar, fx as clusterCountsText, gd as fixTargetLabel, L as CLUSTER_STATUS_LABEL, K as CLUSTER_STATUS_COLOR, gF as improvementStatusColor } from "./index-nrW_ocxo.js";
function signalsSignature(clusters) {
  let signals = 0;
  let lastAt = 0;
  for (const cluster of clusters) {
    signals += cluster.counts?.signals ?? 0;
    lastAt = Math.max(lastAt, cluster.counts?.lastAt ?? 0);
  }
  return `${clusters.length}|${signals}|${lastAt}`;
}
const ANALYTICS_KEY = "improve/analytics";
const ANALYTICS_MAX_AGE_MS = 6e4;
const NO_ACTIVITY = "This workspace’s ledger does not report signal activity yet.";
const NO_COMPARISON = "Blume could not compare your signals right now.";
function useImproveAnalytics(ledger, revision) {
  const local = useOptionalSidecarHost();
  const scope = useAccountScope(ledger);
  const [attempt, setAttempt] = reactExports.useState(0);
  const [answer, setAnswer] = reactExports.useState(null);
  const last = answer?.scope === scope ? null : readCached({ scope, key: ANALYTICS_KEY });
  const result = answer?.scope === scope ? answer : last ? { data: last.data, error: null } : null;
  reactExports.useEffect(() => {
    let live = true;
    const settle = (data, error) => {
      if (live) setAnswer({ scope, data, error });
    };
    if (!local) {
      settle(null, "Analytics count your messages on this computer: open the Blume app here.");
      return;
    }
    cachedLoad(
      { scope, key: `${ANALYTICS_KEY}#${revision}` },
      async () => {
        const value = await ledger.call("improve_activity", {}).catch(() => {
          throw new Error(NO_ACTIVITY);
        });
        const signals = (
          // A ledger without this read answers nothing: no hosted signals.
          (value?.signals ?? []).flatMap((signal) => signal.kind ? [{ at: signal.at, kind: signal.kind }] : [])
        );
        const data = await local.improve.getSignalAnalytics({ signals }).catch(() => {
          throw new Error(NO_COMPARISON);
        });
        writeCached({ scope, key: ANALYTICS_KEY }, data);
        return data;
      },
      ANALYTICS_MAX_AGE_MS
    ).then(
      (data) => settle(data, null),
      (error) => settle(null, error instanceof Error && error.message === NO_ACTIVITY ? NO_ACTIVITY : NO_COMPARISON)
    );
    return () => {
      live = false;
    };
  }, [ledger, scope, local, revision, attempt]);
  return {
    data: result?.data ?? null,
    loading: result === null,
    error: result?.error ?? null,
    reload: reactExports.useCallback(() => {
      invalidateCached(scope, `${ANALYTICS_KEY}#`);
      setAttempt((value) => value + 1);
    }, [scope])
  };
}
function GaugeZones({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: gaugeArc(0.015, 0.985),
        fill: "none",
        stroke: "var(--border-subtle)",
        strokeWidth: "11",
        strokeLinecap: "round",
        opacity: "0.7"
      }
    ),
    GAUGE_ZONES.map((zone) => {
      const highlighted = active === zone.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { "data-gauge-zone-state": highlighted ? "highlighted" : "resting", children: [
        highlighted && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: gaugeArc(zone.start, zone.end),
            fill: "none",
            stroke: zone.tone,
            strokeWidth: "17",
            strokeLinecap: "round",
            opacity: "0.28"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: gaugeArc(zone.start, zone.end),
            fill: "none",
            stroke: zone.tone,
            strokeWidth: highlighted ? 11 : 8,
            strokeLinecap: "round",
            opacity: active === null ? 0.7 : highlighted ? 1 : 0.45
          }
        )
      ] }, zone.id);
    })
  ] });
}
function KpiGauge({
  type,
  value,
  percentile,
  label
}) {
  const needle = percentile === null ? null : gaugePoint(percentile / 100, 32);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "4 2 112 72",
      role: "img",
      "aria-label": label,
      "data-signal-gauge": type,
      className: "block size-auto w-full max-w-40 self-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GaugeZones, { active: gaugeZoneForPercentile(percentile) }),
        needle && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: "60",
              y1: "52",
              x2: needle.x,
              y2: needle.y,
              stroke: "var(--text-strong)",
              strokeWidth: "2.5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "52", r: "4", fill: "var(--text-strong)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "52", r: "1.5", fill: "var(--bg-inner)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "60",
            y: needle ? 71 : 58,
            textAnchor: "middle",
            fill: "var(--text-strong)",
            fontSize: needle ? 13 : 17,
            fontWeight: "650",
            className: "tabular-nums",
            children: formatRate(value)
          }
        )
      ]
    }
  );
}
const TREND_COLOR = {
  decrease: "success",
  increase: "warning",
  new: "info",
  unchanged: "neutral"
};
function activeDays(local) {
  const first = local.daily.findIndex((day) => day.totalTurns > 0);
  return first < 0 ? 0 : first;
}
function Sparkline({ type, rates }) {
  if (rates.length < 2) return null;
  const max = Math.max(0.01, ...rates) * 1.15;
  const points = rates.map((rate, index) => ({
    x: index / (rates.length - 1) * 100,
    y: 30 - rate / max * 28
  }));
  const line = smoothChartPath(points);
  const accent = CONCEPT_META[type].accent;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 30", preserveAspectRatio: "none", "aria-hidden": true, className: "block size-auto h-7 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: `${line} L 100 30 L 0 30 Z`, fill: accent, opacity: "0.12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: line, fill: "none", stroke: accent, strokeWidth: "1.5", vectorEffect: "non-scaling-stroke" })
  ] });
}
function SignalKpi({
  type,
  local,
  benchmark,
  onOpen
}) {
  const value = benchmark?.value ?? localSignalRate(local, type);
  const percentile = benchmark?.percentile ?? null;
  const trend = signalTrend(local, type);
  const signals = local.signalCounts[type];
  const zones = benchmark?.zones ? `Green through ${formatRate(benchmark.zones.greenMax)}, amber through ${formatRate(benchmark.zones.yellowMax)}, red above ${formatRate(benchmark.zones.yellowMax)}.` : "Cohort thresholds are not available yet.";
  const label = `${SIGNAL_TYPE_META[type].label}: ${formatRate(value)} of your messages, ${signals} signals. ${percentile === null ? "Comparison pending." : `${ordinal(percentile)} percentile.`} ${zones}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "media",
      onClick: onOpen,
      "aria-label": `Open details for ${SIGNAL_TYPE_META[type].label.toLowerCase()}`,
      className: "flex min-w-0 flex-col items-stretch gap-1.5 px-3 py-3 text-left",
      "data-signal-gauge-card": type,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1.5 type-ui-meta font-medium text-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: type, surface: "bare", size: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: SIGNAL_TYPE_META[type].label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiGauge, { type, value, percentile, label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-wrap items-center justify-center gap-x-1.5 gap-y-1 type-ui-label text-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: percentile === null ? "Comparison pending" : `${ordinal(percentile)} percentile` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { side: "top", label: trendText(trend), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "soft", color: TREND_COLOR[trend.direction], children: trendBadge(trend) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { type, rates: rollingRates(local, type).slice(activeDays(local)) })
      ]
    }
  );
}
const shortDate = (periodStart) => (/* @__PURE__ */ new Date(`${periodStart}T12:00:00`)).toLocaleDateString(void 0, { month: "short", day: "numeric" });
function SignalRatesChart({
  local,
  types = SIGNAL_TYPES
}) {
  const [hover, setHover] = reactExports.useState(null);
  const empty = local.daily.filter((day) => day.totalTurns > 0).length < 2;
  const from = empty ? 0 : activeDays(local);
  const days = local.daily.slice(from);
  const series = empty ? [] : types.map((type) => ({ type, rates: rollingRates(local, type).slice(from) }));
  const single = types.length === 1 ? types[0] : null;
  const max = Math.max(0.02, ...series.flatMap((line) => line.rates)) * 1.15;
  const x = (index) => index / (days.length - 1) * 100;
  const y = (rate) => 100 - rate / max * 100;
  const ticks = [max, max / 2, 0];
  const at = hover === null ? null : days[hover];
  const label = single ? `${SIGNAL_TYPE_META[single].label}: three-day rolling rate over the last ${days.length} days` : `Three-day rolling rate of each kind over the last ${days.length} days`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-36 w-9 shrink-0 flex-col justify-between text-right type-ui-label tabular-nums text-muted", "aria-hidden": true, children: ticks.map((tick) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "-translate-y-1/2 first:translate-y-0 last:translate-y-0", children: formatRate(tick) }, tick)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative h-36 min-w-0 flex-1",
          onPointerMove: (event) => {
            if (empty) return;
            const box = event.currentTarget.getBoundingClientRect();
            const fraction = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
            setHover(Math.round(fraction * (days.length - 1)));
          },
          onPointerLeave: () => setHover(null),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 100 100",
                preserveAspectRatio: "none",
                role: "img",
                "aria-label": `${label}: ${series.map((line) => `${SIGNAL_TYPE_META[line.type].label} now ${formatRate(line.rates.at(-1) ?? 0)}`).join(", ")}.`,
                ...single ? { "data-signal-history-chart": single } : { "data-signal-rates-chart": true },
                className: "block h-full w-full overflow-visible",
                children: [
                  ticks.map((tick) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: "0",
                      x2: "100",
                      y1: y(tick),
                      y2: y(tick),
                      stroke: "var(--border-subtle)",
                      strokeDasharray: tick === 0 ? void 0 : "3 3",
                      vectorEffect: "non-scaling-stroke"
                    },
                    tick
                  )),
                  series.map((line) => {
                    const path = smoothChartPath(
                      line.rates.map((rate, index) => ({ x: x(index), y: y(rate) }))
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                      single && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: `${path} L 100 100 L 0 100 Z`,
                          fill: CONCEPT_META[line.type].accent,
                          opacity: "0.12"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: path,
                          fill: "none",
                          stroke: CONCEPT_META[line.type].accent,
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          vectorEffect: "non-scaling-stroke",
                          opacity: hover === null ? 1 : 0.9
                        }
                      )
                    ] }, line.type);
                  }),
                  hover !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "line",
                    {
                      x1: x(hover),
                      x2: x(hover),
                      y1: "0",
                      y2: "100",
                      stroke: "var(--text-muted)",
                      strokeOpacity: "0.5",
                      vectorEffect: "non-scaling-stroke"
                    }
                  )
                ]
              }
            ),
            empty && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute inset-0 m-0 flex items-center justify-center px-4 text-center type-ui-meta text-muted", children: "The chart appears once you have messages on more than one day." }),
            at && hover !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "pointer-events-none absolute top-1 z-10 grid min-w-32 gap-1 rounded-control border border-border-subtle bg-inner px-2.5 py-2",
                  hover > (days.length - 1) / 2 ? "right-[calc(100%-var(--chart-x)+8px)]" : "left-[calc(var(--chart-x)+8px)]"
                ),
                style: { "--chart-x": `${x(hover)}%` },
                "data-signal-chart-readout": true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-label font-medium text-strong", children: shortDate(at.periodStart) }),
                  series.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 type-ui-label text-body", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: line.type, surface: "bare", size: 11 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: SIGNAL_TYPE_META[line.type].label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-strong", children: formatRate(line.rates[hover] ?? 0) })
                  ] }, line.type))
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pl-11 type-ui-label tabular-nums text-muted", "aria-hidden": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: days[0] ? shortDate(days[0].periodStart) : "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: days.length > 2 ? shortDate(days[Math.floor((days.length - 1) / 2)].periodStart) : "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Today" })
    ] })
  ] });
}
function SignalAnalyticsPanel({
  analytics,
  nowMs,
  onOpen,
  onOpenType
}) {
  const { data, loading, error, reload } = analytics;
  const clock = useOptionalSidecarHost()?.system.now?.();
  const local = data ? calendarSignalAnalyticsWindow(data.local, 30, nowMs ?? clock) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Analytics", "data-signal-analytics-card": true, "aria-busy": loading, className: "flex min-w-0 flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex min-w-0 items-center gap-2 px-3.5 pt-3 pb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 flex-1 gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h2", size: "sm", children: "Signal rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate type-ui-meta text-muted", children: "Share of your messages · last 30 days" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipLabel,
        {
          side: "top",
          label: "The share of your messages with each kind of signal. The gauge compares your 30-day rate with other Blume users; lower is better. Trends compare this week with the window's first.",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { tabIndex: 0, "aria-label": "About the 30-day comparison", className: "inline-flex text-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 13, "aria-hidden": true }) })
        }
      ),
      data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "xs", onClick: onOpen, children: [
        "View details",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12, "aria-hidden": true })
      ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "xs", onClick: reload, children: "Try again" }) : null
    ] }),
    data && local ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 divide-x divide-border-subtle border-y border-border-subtle", children: SIGNAL_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SignalKpi,
        {
          type,
          local,
          benchmark: data.comparison?.typeRates?.[type] ?? null,
          onOpen: () => onOpenType(type)
        },
        type
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3.5 pt-3 pb-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalRatesChart, { local }) })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 border-t border-border-subtle px-3.5 py-4 type-ui-meta text-muted", children: error }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SignalAnalyticsSkeleton, {})
  ] }) });
}
function SkeletonLine({ d, className, viewBox = "0 0 100 30" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox, preserveAspectRatio: "none", "aria-hidden": true, className: cn("block w-full", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "path",
    {
      d,
      fill: "none",
      stroke: "var(--text-muted)",
      strokeOpacity: "0.22",
      strokeWidth: "2",
      strokeLinecap: "round",
      vectorEffect: "non-scaling-stroke"
    }
  ) });
}
function SignalAnalyticsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SkeletonSurface, { label: "Comparing your signals", className: "flex min-w-0 flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 divide-x divide-border-subtle border-y border-border-subtle", children: SIGNAL_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col items-stretch gap-1.5 px-3 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1.5 type-ui-meta font-medium text-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: type, surface: "bare", size: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: SIGNAL_TYPE_META[type].label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "4 2 112 72", "aria-hidden": true, className: "block size-auto w-full max-w-40 self-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: gaugeArc(0, 1),
          fill: "none",
          stroke: "var(--text-muted)",
          strokeOpacity: "0.16",
          strokeWidth: "8",
          strokeLinecap: "round"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-16 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "h-7", d: "M0 22 C 14 20, 22 12, 36 15 S 62 25, 78 16 S 92 9, 100 10" })
    ] }, type)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 px-3.5 pt-3 pb-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-36 w-9 shrink-0 flex-col items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-6 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-6 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-4 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-36 min-w-0 flex-1 flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block border-t border-dashed border-border-subtle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block border-t border-dashed border-border-subtle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block border-t border-border-subtle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SkeletonLine,
            {
              className: "absolute inset-0 h-full",
              d: "M0 70 C 10 64, 18 48, 30 54 S 50 74, 62 60 S 82 36, 100 42",
              viewBox: "0 0 100 100"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pl-11", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-10 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-10 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-8 rounded" })
      ] })
    ] })
  ] });
}
function SignalAnalyticsLoading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalAnalyticsSkeleton, {}) });
}
function kindCount(type, count) {
  const meta = CONCEPT_META[type];
  return `${count} ${(count === 1 ? meta.label : meta.pluralLabel).toLowerCase()}`;
}
function TrendBadge({ trend }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { side: "top", label: trendText(trend), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "xs", variant: "soft", color: TREND_COLOR[trend.direction], children: trendBadge(trend) }) }) });
}
function SignalAnalyticsPage({
  data,
  nowMs,
  onOpenType
}) {
  const clock = useOptionalSidecarHost()?.system.now?.();
  const local = calendarSignalAnalyticsWindow(data.local, 30, nowMs ?? clock);
  const sections = useExpandableSections(() => SIGNAL_TYPES);
  const kinds = SIGNAL_TYPES.map((type) => {
    const benchmark = data.comparison?.typeRates?.[type] ?? null;
    return {
      type,
      rate: benchmark?.value ?? localSignalRate(local, type),
      percentile: benchmark?.percentile == null ? null : `${ordinal(benchmark.percentile)} percentile`,
      trend: signalTrend(local, type)
    };
  });
  const header = {
    view: "improve",
    kind: "Analytics",
    kindConcept: "signal",
    title: "Signal analytics",
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "signal", tileSize: "lg" }), shape: "tile" },
    summary: "How often each kind of signal shows up in your messages, over the last 30 days.",
    facts: [
      {
        id: "messages",
        label: "Your messages, counted on this computer",
        value: `${local.totalTurns} ${local.totalTurns === 1 ? "message" : "messages"}`,
        concept: "message"
      },
      {
        id: "window",
        label: "Window",
        value: "Last 30 days",
        concept: "activity"
      },
      {
        id: "cohort",
        label: "Compared with",
        value: data.comparison ? `${data.comparison.cohortSize} Blume ${data.comparison.cohortSize === 1 ? "user" : "users"}` : "Comparison pending",
        concept: "usage",
        priority: "secondary"
      }
    ],
    counts: kinds.map(({ type, rate, percentile }) => {
      const count = local.signalCounts[type];
      const meta = CONCEPT_META[type];
      return {
        id: type,
        concept: type,
        count,
        label: (count === 1 ? meta.label : meta.pluralLabel).toLowerCase(),
        description: `${formatRate(rate)} of your messages · ${percentile ?? "comparison pending"}`,
        onSelect: () => sections.jump(type)
      };
    })
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { as: "section", padding: "sm", stack: true, "data-signal-analytics-layout": "sections", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { header, under: "counts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-w-0 gap-2", children: kinds.map(({ type, rate, percentile, trend }) => {
      const label = SIGNAL_TYPE_META[type].label;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpandableSection,
        {
          ...sections.props(type),
          concept: type,
          title: label,
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionSummary,
            {
              badge: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendBadge, { trend }),
              parts: [`${formatRate(rate)} of messages`, percentile ?? { text: "Comparison pending", tone: "muted" }]
            }
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-3", "data-signal-type-card": type, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-body text-body", children: [
              SIGNAL_TYPE_META[type].description,
              " Each point is the share of your messages with",
              " ",
              label.toLowerCase(),
              " over the three days up to it."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SignalRatesChart, { local, types: [type] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "xs",
                "aria-label": `Open details for ${label.toLowerCase()}`,
                onClick: () => onOpenType(type),
                children: [
                  "Open details",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12, "aria-hidden": true })
                ]
              }
            ) })
          ] })
        },
        type
      );
    }) })
  ] });
}
function SignalTypeDetailsPage({
  host,
  type,
  state,
  onOpenCluster,
  onOpenDelivery,
  onOpenSignal,
  clusterMenu
}) {
  const now = Date.now();
  const matching = reactExports.useMemo(() => clustersWithType(state.clusters, type), [state.clusters, type]);
  const byKey = reactExports.useMemo(
    () => new Map(state.clusters.map((cluster) => [cluster.key, cluster])),
    [state.clusters]
  );
  const workspace = useWorkspaceSignals(
    host,
    matching.map((entry) => entry.cluster),
    state.improvements
  );
  const signals = workspace.signals?.filter((signal) => signalTypeOf(signal.kind) === type) ?? null;
  const sections = useExpandableSections(() => ["clusters", "signals"]);
  const meta = SIGNAL_TYPE_META[type];
  const label = meta.label.toLowerCase();
  const signalCount = signals?.length ?? matching.reduce((total, entry) => total + entry.count, 0);
  const clusterCount = `${matching.length} ${matching.length === 1 ? "cluster" : "clusters"}`;
  const header = {
    view: "improve",
    kind: "Signal kind",
    kindConcept: type,
    title: meta.label,
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: type, tileSize: "lg" }), shape: "tile" },
    summary: meta.description,
    facts: [],
    counts: [
      {
        id: "clusters",
        concept: "cluster",
        count: matching.length,
        label: matching.length === 1 ? "cluster" : "clusters",
        description: `Clusters with ${label}, most first`,
        onSelect: () => sections.jump("clusters")
      },
      {
        id: "signals",
        concept: type,
        count: signalCount,
        label: signalCount === 1 ? "signal" : "signals",
        description: `Recent ${label}, newest first`,
        onSelect: () => sections.jump("signals")
      }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { as: "section", padding: "sm", stack: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { header, under: "counts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpandableSection,
        {
          ...sections.props("clusters"),
          concept: "cluster",
          title: "Clusters",
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionSummary,
            {
              parts: [matching.length ? `${clusterCount} with ${label}` : "None yet"]
            }
          ),
          fit: matching.length ? "list" : "inset",
          children: matching.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { variant: "separate", pageSize: 12, moreLabel: "Show more clusters", children: matching.map(({ cluster }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClusterRow,
            {
              state,
              cluster,
              now,
              onOpen: () => onOpenCluster(cluster),
              actions: clusterMenu?.(cluster)
            },
            cluster.key
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-meta text-muted", children: [
            "No clusters with ",
            label,
            " yet. They appear as your agents record related signals."
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpandableSection,
        {
          ...sections.props("signals"),
          concept: type,
          title: `Recent ${label}`,
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionSummary,
            {
              parts: [
                signals ? signals.length ? kindCount(type, signals.length) : "None kept" : workspace.error ? { text: "Could not load", tone: "danger" } : "Loading…"
              ]
            }
          ),
          fit: signals?.length ? "list" : "inset",
          children: workspace.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "m-0 type-ui-meta text-danger", children: workspace.error }) : !signals ? /* @__PURE__ */ jsxRuntimeExports.jsx(SignalRowsSkeleton, { count: 3 }) : signals.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SignalRows,
            {
              host,
              state,
              signals,
              clusters: byKey,
              pageSize: 20,
              onOpenSignal: onOpenSignal ? (signal) => onOpenSignal(signal) : void 0,
              onOpenCluster,
              onOpenDelivery
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-meta text-muted", children: [
            "No ",
            label,
            " kept. Signals expire after 90 days; clusters keep their counts."
          ] })
        }
      )
    ] })
  ] });
}
function improveHeaderData(clusters, nav) {
  const forming = formingClusters(clusters);
  return {
    view: "improve",
    kind: "Improve",
    kindConcept: "suggestion",
    title: "Improve",
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "suggestion", tileSize: "lg" }), shape: "tile" },
    status: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "soft", color: "accent", children: "Beta" }),
    summary: "Make your agents better at working with you and your repositories.",
    facts: [
      {
        id: "signals",
        label: "Signals",
        value: nav.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-14 rounded" }) : `${forming.signals} found`,
        concept: "signal",
        link: { onSelect: () => nav.onOpenClusters(true) },
        linkLabel: "View signals"
      },
      {
        id: "clusters",
        label: "Clusters",
        value: nav.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-16 rounded" }) : `${forming.clusters} forming`,
        concept: "cluster",
        link: { onSelect: () => nav.onOpenClusters(false) },
        linkLabel: "View clusters"
      }
    ],
    actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "xs", onClick: nav.onOpenFeedback, children: "Share feedback" })
  };
}
const PROPOSAL_SIGNALS = 3;
const PROPOSAL_CONVERSATIONS = 2;
const KINDS = ["correction", "steering", "frustration", "preference"];
const plural = (count, one, many) => `${count} ${count === 1 ? one : many}`;
function ClusterDetails({
  data,
  actions
}) {
  const { cluster, project, improvements, signals, state, now } = data;
  const [renaming, setRenaming] = reactExports.useState(false);
  const sections = useExpandableSections(() => ["improvement"]);
  const current = improvements.find((item) => item.id === cluster.improvementId) ?? improvements[0];
  const earlier = improvements.filter((item) => item !== current);
  const counts = cluster.counts;
  const list = signals ?? [];
  const signalCount = counts?.signals ?? list.length;
  const conversations = counts?.conversations ?? 0;
  const people = counts?.people ?? 0;
  const lastAt = counts?.lastAt ?? list[0]?.createdAt ?? null;
  const firstAt = clusterFirstSignalAt(cluster, list);
  const kinds = KINDS.map((kind) => ({
    kind,
    count: counts?.kinds?.[kind] ?? list.filter((signal) => signal.kind === kind).length
  })).filter((entry) => entry.count > 0);
  const deliveryIds = [
    ...new Set(list.flatMap((signal) => signal.deliveryId ? [signal.deliveryId] : []))
  ];
  const deliveries = deliveryIds.flatMap((id) => {
    const delivery = state.deliveries.find((candidate) => candidate.id === id);
    return delivery ? [{ delivery, count: list.filter((signal) => signal.deliveryId === id).length }] : [];
  });
  const threadIds = [
    ...new Set(list.flatMap((signal) => signal.threadId ? [signal.threadId] : []))
  ];
  const agents = threadIds.flatMap((id) => {
    const thread = state.threads.find((candidate) => candidate.id === id);
    return thread ? [{ thread, count: list.filter((signal) => signal.threadId === id).length }] : [];
  });
  const header = {
    view: "improve",
    kind: "Cluster",
    kindConcept: "cluster",
    title: cluster.title,
    titleEdit: {
      label: "Cluster name",
      maxLength: 160,
      editing: renaming,
      onEditingChange: setRenaming,
      onSubmit: async (title) => {
        const next = title.trim();
        if (next && next !== cluster.title) await actions.onRename(next);
        setRenaming(false);
      }
    },
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "cluster", tileSize: "lg" }), shape: "tile" },
    status: /* @__PURE__ */ jsxRuntimeExports.jsx(ClusterStatusFacet, { status: cluster.status, form: "badge", size: "sm" }),
    summary: [
      plural(signalCount, "signal", "signals"),
      plural(conversations, "conversation", "conversations"),
      plural(people, "person", "people")
    ].join(" · "),
    facts: [
      project ? {
        id: "project",
        label: "Project",
        // The fact is the link; the project is its reference (its flower and name, its Peek).
        value: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProjectReference,
          {
            project: {
              id: project.id,
              name: project.name,
              seed: repositoryFlowerSeed(project.repositories[0])
            }
          }
        ),
        link: { onSelect: () => actions.onOpenProject(project.id) },
        linkLabel: `Open project ${project.name}`
      } : { id: "visibility", label: "Visible to", value: "Only you", concept: "global" },
      ...project ? [
        {
          id: "visibility",
          label: "Visible to",
          value: "The project",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14, "aria-hidden": true })
        }
      ] : [],
      {
        id: "fix",
        label: "Fix lands in",
        value: cluster.fixTarget === "repo" ? "The repository" : "Global setup",
        concept: cluster.fixTarget === "repo" ? "project" : "global"
      },
      { id: "first", label: "First signal", value: date(firstAt), concept: "activity" },
      ...cluster.aliases?.length ? [
        {
          id: "merged",
          label: "Merged from",
          value: plural(cluster.aliases.length, "cluster", "clusters"),
          concept: "cluster"
        }
      ] : [],
      ...lastAt ? [
        {
          id: "last",
          label: "Last signal",
          value: deliveryActivityLabel(lastAt, now),
          concept: "activity",
          metric: true
        }
      ] : []
    ],
    menu: [
      { label: "Open cluster page", onSelect: actions.onOpenClusterPage },
      { label: "Rename", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { "aria-hidden": true }), onSelect: () => setRenaming(true) },
      ...actions.menu
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PageContent,
    {
      as: "section",
      padding: "sm",
      stack: true,
      "data-cluster-details": cluster.key,
      "aria-label": cluster.title,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderPage, { header, bodyClassName: "grid min-w-0 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExpandableSection,
          {
            ...sections.props("improvement"),
            concept: "suggestion",
            title: current?.title ?? "Improvement",
            summary: current ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionSummary,
              {
                badge: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ImprovementStateFacet,
                  {
                    state: improvementStateOf(current),
                    form: "badge",
                    size: "sm"
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSummary, { parts: ["None yet"] }),
            children: current ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              ClusterImprovement,
              {
                improvement: current,
                pending: actions.pending,
                onPreview: actions.onPreview,
                onAccept: actions.onAccept,
                onDismiss: actions.onDismiss,
                onUndo: actions.onUndo,
                onOpenLink: actions.onOpenLink
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-3", children: [
              cluster.status === "open" && [
                { id: "signals", label: "Signals", value: signalCount, max: PROPOSAL_SIGNALS },
                {
                  id: "conversations",
                  label: "Conversations",
                  value: conversations,
                  max: PROPOSAL_CONVERSATIONS
                }
              ].map(({ id, label, value, max }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex justify-between type-ui-meta text-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                    Math.min(value, max),
                    " of ",
                    max
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Progress,
                  {
                    value: Math.min(value, max) / max * 100,
                    indicatorClassName: "bg-accent-soft-border",
                    "aria-label": `${label} towards an improvement`
                  }
                )
              ] }, id)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: noImprovementText(cluster) })
            ] })
          }
        ),
        kinds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExpandableSection,
          {
            ...sections.props("kinds"),
            concept: "signal",
            title: "What kept happening",
            summary: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2", children: kinds.map(({ kind, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-0.5",
                title: `${count} ${(count === 1 ? CONCEPT_META[kind].label : CONCEPT_META[kind].pluralLabel).toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: kind, surface: "bare", size: 11 }),
                  count
                ]
              },
              kind
            )) }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClusterKindMix, { cluster })
          }
        ),
        earlier.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExpandableSection,
          {
            ...sections.props("earlier"),
            concept: "activity",
            title: "Earlier improvements",
            summary: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSummary, { parts: [`${earlier.length}`] }),
            fit: "list",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { "aria-label": "Earlier improvements", children: earlier.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ConfigurableListItem,
              {
                concept: "suggestion",
                title: item.title,
                status: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ImprovementStateFacet,
                  {
                    state: improvementStateOf({ status: item.status }),
                    form: "badge",
                    size: "sm"
                  }
                ),
                metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date(item.decidedAt ?? item.createdAt) }),
                  item.dismissal?.reason && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: item.dismissal.reason }),
                  item.revision && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate", children: [
                    "Asked: ",
                    item.revision.feedback
                  ] })
                ] })
              },
              item.id
            )) })
          }
        ),
        (deliveries.length > 0 || agents.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExpandableSection,
          {
            ...sections.props("origins"),
            concept: "delivery",
            title: "Where it came up",
            summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionSummary,
              {
                parts: [
                  deliveries.length ? plural(deliveries.length, "delivery", "deliveries") : null,
                  agents.length ? plural(agents.length, "agent", "agents") : null
                ]
              }
            ),
            fit: "list",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ConfigurableListGroup, { "aria-label": "Where it came up", children: [
              deliveries.map(({ delivery, count }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConfigurableListItem,
                {
                  title: delivery.title,
                  leading: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DeliveryAvatar,
                    {
                      projectSeed: repositoryFlowerSeed(
                        deliveryProject({ projects: state.projects }, delivery).repositories[0]
                      ),
                      deliveryId: delivery.id,
                      title: delivery.title,
                      outcome: delivery.outcome,
                      emoji: wornEmoji(delivery),
                      size: 18
                    }
                  ),
                  metadata: plural(count, "signal", "signals"),
                  onSelect: () => actions.onOpenDelivery(delivery.id)
                },
                delivery.id
              )),
              agents.map(({ thread, count }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConfigurableListItem,
                {
                  title: thread.title,
                  leading: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentAvatar, { agent: thread, size: 18 }),
                  metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    isSource(thread.harness) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: HARNESS_LABEL[thread.harness] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: plural(count, "signal", "signals") })
                  ] })
                },
                thread.id
              ))
            ] })
          }
        )
      ] })
    }
  );
}
const TRANSCRIPT_WINDOW = 8;
function useSignalMessage(host, signal) {
  const sidecar = useOptionalSidecarHost();
  const pointer = signal.evidence.find((evidence) => evidence.sessionId);
  const own = canOpenSignalMessage(signal);
  const [state, setState] = reactExports.useState({ status: "loading" });
  reactExports.useEffect(() => {
    let live = true;
    const done = (next) => {
      if (live) setState(next);
    };
    if (!own || !pointer?.sessionId) {
      done({
        status: "unavailable",
        message: signal.mine ? "This signal was recorded without a pointer to its message." : "Only the person whose message it was can read it. A signal carries the agent’s summary, never anyone’s words."
      });
      return;
    }
    if (!host.openConversationAt || !sidecar) {
      done({
        status: "unavailable",
        message: "Open the Blume desktop app on the computer where this was recorded to read the message."
      });
      return;
    }
    setState({ status: "loading" });
    host.openConversationAt({
      harness: pointer.harness,
      sessionId: pointer.sessionId,
      messageId: pointer.messageId ?? null
    }).then(async (location) => {
      if (location.status !== "local") {
        done({ status: "unavailable", message: "This message is on another computer." });
        return;
      }
      const transcript = await sidecar.conversations.getTranscript(location.conversationRef, {
        ...location.focus ? { aroundPosition: location.focus.turnPosition, focusEventId: location.focus.eventId } : {},
        limit: TRANSCRIPT_WINDOW
      });
      done({ status: "local", location, transcript });
    }).catch(
      () => done({
        status: "unavailable",
        message: "Blume could not open this conversation. Try again in a moment."
      })
    );
    return () => {
      live = false;
    };
  }, [host, sidecar, signal.id, own, pointer?.harness, pointer?.sessionId, pointer?.messageId, signal.mine]);
  return state;
}
function SignalMessage({ host, signal }) {
  const state = useSignalMessage(host, signal);
  const { open } = useAppRoute();
  const expansion = useScopedExpansionStore(`signal:${signal.id}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PageColumnCard,
    {
      header: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeaderLabel,
        {
          title: "Message",
          concept: "message",
          trailing: state.status === "local" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "xs",
              onClick: () => open(conversationPath(state.location.conversationRef, state.location.focus)),
              children: [
                "Open conversation",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 12, "aria-hidden": true })
              ]
            }
          )
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", "data-signal-message": true, children: state.status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "m-0 cp-muted", children: "Finding the message on this computer…" }) : state.status === "unavailable" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 cp-muted", children: state.message }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExpansionStoreProvider, { value: expansion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConversationTranscriptPreview,
        {
          compact: true,
          transcript: { loaded: true, value: state.transcript },
          activeSignalSourceTurnPosition: state.location.focus?.turnPosition ?? null
        }
      ) }) })
    }
  );
}
function SignalPage({
  host,
  state,
  cluster,
  signal,
  signals,
  onOpenCluster,
  onOpenSignal,
  onOpenDelivery
}) {
  const delivery = signal.deliveryId ? state.deliveries.find((candidate) => candidate.id === signal.deliveryId) : void 0;
  const harness = signal.evidence[0]?.harness;
  const agent = signal.threadId ? state.threads.find((thread) => thread.id === signal.threadId) : void 0;
  const project = signal.project ? resolveProject(state, signal.project) : clusterProject(state, cluster);
  const others = signals.filter((other) => other.id !== signal.id);
  const sections = useExpandableSections(() => ["others"]);
  const facts = [
    ...agent ? [
      {
        id: "agent",
        label: "Agent",
        value: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentReference, { agent: { thread: agent } })
      }
    ] : [],
    ...project ? [
      {
        id: "project",
        label: "Project",
        value: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProjectReference,
          {
            project: {
              id: project.id,
              name: project.name,
              seed: repositoryFlowerSeed(project.repositories[0])
            }
          }
        )
      }
    ] : [],
    ...harness ? [
      {
        id: "harness",
        label: "Harness",
        value: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CodingToolReference,
          {
            tool: codingToolOfHarness(
              harness,
              isSource(harness) ? HARNESS_LABEL[harness] : harness
            )
          }
        )
      }
    ] : [],
    ...delivery ? [
      {
        id: "delivery",
        label: "During",
        // The fact is the link; the delivery is its reference.
        value: /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryReference, { delivery: deliveryRefOf(deliveryModelOf(state, delivery)) }),
        link: { onSelect: () => onOpenDelivery(delivery.id) },
        linkLabel: `Open delivery ${delivery.title}`
      }
    ] : [],
    {
      id: "cluster",
      label: "Cluster",
      value: cluster.title,
      concept: "cluster",
      link: { onSelect: onOpenCluster },
      linkLabel: `Open cluster ${cluster.title}`
    },
    { id: "recorded", label: "Recorded", value: date(signal.createdAt), concept: "activity", metric: true }
  ];
  const header = {
    view: "improve",
    kind: kindLabel(signal.kind),
    kindConcept: signal.kind,
    title: signal.summary,
    identity: agent ? { node: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentAvatar, { agent, size: 44 }), shape: "circle" } : { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "signal", tileSize: "lg" }), shape: "tile" },
    status: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalKindFacet, { kind: signal.kind, form: "badge", size: "sm" }),
    facts
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ColumnLayout,
    {
      primary: null,
      contentKey: signal.id,
      compactBackLabel: "Signal",
      columnCardChip: { label: "Message", concept: "message" },
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { as: "section", padding: "sm", stack: true, "data-signal-page": signal.id, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderPage, { header, bodyClassName: "flex min-w-0 flex-col gap-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpandableSection,
        {
          ...sections.props("others"),
          empty: others.length === 0,
          hideWhenEmpty: true,
          concept: "signal",
          title: "Others in this cluster",
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionSummary,
            {
              parts: [`${others.length} ${others.length === 1 ? "signal" : "signals"}`]
            }
          ),
          fit: others.length ? "list" : "inset",
          children: others.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SignalRows,
            {
              host,
              state,
              signals: others,
              pageSize: 8,
              onOpenSignal,
              onOpenDelivery
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 cp-muted", children: "This is the cluster’s only signal so far." })
        }
      ) }) }),
      columnCard: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalMessage, { host, signal })
    }
  );
}
function clusterActions(cluster, clusters, { onRename, onSetDismissed, onMerge }) {
  const targets = onMerge ? mergeTargets(clusters, cluster) : [];
  return [
    onRename && { label: "Rename", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { "aria-hidden": true }), onSelect: onRename },
    onMerge && targets.length > 0 && {
      label: "Merge into",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitMerge, { "aria-hidden": true }),
      entries: targets.map((target) => ({
        label: target.title,
        onSelect: async () => {
          await onMerge(target);
        },
        confirm: {
          title: `Merge into “${target.title}”?`,
          body: "This cluster’s signals and improvement move into that one; agents may keep using either name.",
          confirmLabel: "Merge",
          busyLabel: "Merging…"
        }
      }))
    },
    { separator: true },
    onSetDismissed && (cluster.status === "dismissed" ? {
      label: "Restore cluster",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArchiveRestore, { "aria-hidden": true }),
      onSelect: async () => {
        await onSetDismissed(false);
      }
    } : {
      label: "Dismiss cluster",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": true }),
      onSelect: async () => {
        await onSetDismissed(true);
      }
    })
  ];
}
const CLUSTER_SIGNAL_PREVIEW = 3;
function ImprovePage({
  host,
  state,
  loaded,
  pending,
  act,
  analyticsNowMs,
  onOpenProject,
  onOpenDelivery
}) {
  const { route, open } = useAppRoute();
  const navigator = useOptionalNavigator();
  const groups = reactExports.useMemo(() => improveGroups(state), [state]);
  const all = groups.flatMap((group) => group.clusters);
  const waiting = reactExports.useMemo(() => openImprovements(state), [state]);
  const resolved = reactExports.useMemo(() => resolvedImprovements(state), [state]);
  const selectedKey = route.improveCluster;
  const selected = all.find(
    (cluster) => cluster.key === selectedKey || cluster.aliases?.includes(selectedKey ?? "")
  );
  const selectedImprovement = selected ? clusterImprovement(state, selected) : void 0;
  const [view, setView] = useSubViewState(IMPROVE_PAGE, {
    token: improveSubViewToken,
    title: improveSubViewTitle,
    parent: (current) => improveSubViewParent(current, Boolean(selectedImprovement)),
    resolve: resolveImproveSubView,
    ready: loaded
  });
  const analytics = useImproveAnalytics(host, signalsSignature(state.clusters));
  const detail = useClusterDetail(
    host,
    selected?.key,
    selected ? clusterSignature(selected, state.improvements) : ""
  );
  const [dismissing, setDismissing] = reactExports.useState(null);
  const preview = (entry) => {
    const href = `/improve?${new URLSearchParams({ cluster: entry.cluster.key, sub: "improvement" })}`;
    go(href);
  };
  const go = (href) => navigator ? navigator.go(href) : open(href);
  const openClusters = (signals) => setView({ kind: signals ? "signals" : "clusters" });
  const { ref: layoutProbe, compact } = useCompactLayout();
  const overview = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        header: improveHeaderData(all, {
          loading: !loaded,
          onOpenClusters: openClusters,
          onOpenFeedback: () => go("/feedback")
        }),
        strip: compact ? { density: "compact" } : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SignalAnalyticsPanel,
      {
        analytics,
        nowMs: analyticsNowMs,
        onOpen: () => setView({ kind: "analytics" }),
        onOpenType: (type) => setView({ kind: "signal-kind", type })
      }
    )
  ] });
  const clusterView = selected && clusterSubView(view) ? view : null;
  const pageView = clusterSubView(view) || view.kind === "page" ? null : view;
  const hrefFor = (target) => {
    const token = improveSubViewToken(target);
    const query = new URLSearchParams();
    if (clusterSubView(target) && selected) query.set("cluster", selected.key);
    if (token) query.set("sub", token);
    const search = query.toString();
    return search ? `/improve?${search}` : "/improve";
  };
  const openClusterFrom = (key, from) => {
    const sub = improveSubViewToken({ kind: "cluster", ...from ? { from } : {} });
    go(`/improve?${new URLSearchParams({ cluster: key, sub })}`);
  };
  const openSignalFrom = (clusterKey, id, from) => {
    const sub = improveSubViewToken({ kind: "signal", id, ...from ? { from } : {} });
    go(`/improve?${new URLSearchParams({ cluster: clusterKey, sub })}`);
  };
  const [renamingKey, setRenamingKey] = reactExports.useState(null);
  const clusterMenu = (cluster, from) => clusterActions(cluster, state.clusters, {
    onRename: () => {
      setRenamingKey(cluster.key);
      if (selected?.key !== cluster.key || !clusterCard) openClusterFrom(cluster.key, from);
    },
    onSetDismissed: (dismissed) => act("cluster_update", { clusterKey: cluster.key, action: dismissed ? "dismiss" : "restore" }),
    onMerge: async (into) => {
      const result = await act("cluster_update", { clusterKey: cluster.key, action: "merge", into: into.key });
      if (result && selected?.key === cluster.key) openClusterFrom(into.key, from);
    }
  });
  const clusterCard = selected && (clusterView?.kind === "cluster" || view.kind === "page" && selectedKey) ? clusterView ?? { kind: "cluster" } : null;
  const evidenceCard = selected && clusterView?.kind === "evidence" ? clusterView : null;
  const listCluster = clusterCard?.from && (clusterCard.from.kind === "clusters" || clusterCard.from.kind === "signals") ? clusterCard : null;
  const signalCard = selected && clusterView?.kind === "signal" ? clusterView : null;
  const openedSignal = signalCard ? detail.signals?.find((signal) => signal.id === signalCard.id) : void 0;
  const showingImprovement = Boolean(
    selected && clusterView?.kind === "improvement" && selectedImprovement
  );
  const listSelected = showingImprovement ? selected?.key : void 0;
  const backTo = (target) => ({
    label: target.kind === "clusters" || target.kind === "signals" ? "Signals and clusters" : target.kind === "improvement" ? selectedImprovement?.title ?? "Improvement" : target.kind === "cluster" ? selected?.title ?? "Cluster" : target.kind === "evidence" ? "All evidence" : improveSubViewTitle(target),
    onNavigate: () => go(hrefFor(target))
  });
  const clusterPage = (from) => selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    ClusterDetailPage,
    {
      host,
      state,
      cluster: selected,
      signals: detail.signals,
      signalsError: detail.error,
      pending,
      act,
      onOpenProject,
      onOpenDelivery,
      onPreview: () => go(hrefFor({ kind: "improvement" })),
      onSeeEvidence: () => go(hrefFor({ kind: "evidence" })),
      onDismissImprovement: setDismissing,
      onOpenSignal: (signal) => openSignalFrom(selected.key, signal.id, from),
      renaming: renamingKey === selected.key,
      onRenamingChange: (next) => setRenamingKey(next ? selected.key : null),
      menu: clusterMenu(selected, from.from ?? null)
    },
    selected.key
  ) : null;
  const pageCard = (pageView2) => {
    const list = pageView2.kind === "clusters" || pageView2.kind === "signals";
    return {
      id: improveSubViewToken(pageView2) ?? "improve",
      title: list ? "Signals and clusters" : improveSubViewTitle(pageView2),
      concept: pageView2.kind === "history" ? "suggestion" : list ? "cluster" : "signal",
      conceptLabel: "Improve",
      covers: "all",
      ...pageView2.kind === "signal-kind" ? { previousPage: backTo({ kind: "analytics" }) } : {},
      // A cluster shown beside the list: back (and Esc) returns to every signal.
      ...list && listCluster ? { previousPage: { label: "Signals and clusters", onNavigate: () => go(hrefFor(pageView2)) } } : {},
      onClose: () => setView(IMPROVE_PAGE),
      content: pageView2.kind === "history" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ImprovementHistory, { entries: resolved, onOpen: preview }) : pageView2.kind === "clusters" || pageView2.kind === "signals" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SignalsAndClustersPage,
        {
          host,
          state,
          clusters: all,
          selectedKey: listCluster ? selected?.key : void 0,
          clusterContent: listCluster && selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClusterDetails,
            {
              data: {
                cluster: selected,
                project: clusterProject(state, selected),
                improvements: (state.improvements ?? []).filter((item) => item.clusterKey === selected.key).sort((a, b) => b.createdAt - a.createdAt),
                signals: detail.signals,
                state,
                now: Date.now()
              },
              actions: {
                pending,
                onRename: (title) => act("cluster_update", { clusterKey: selected.key, action: "rename", title }),
                onOpenClusterPage: () => openClusterFrom(selected.key, null),
                onOpenProject,
                onOpenDelivery,
                onPreview: () => go(hrefFor({ kind: "improvement" })),
                onAccept: () => {
                  const improvement = clusterImprovement(state, selected);
                  if (improvement)
                    void act("improvement_decide", { improvementId: improvement.id, decision: "accepted" });
                },
                onDismiss: () => {
                  const improvement = clusterImprovement(state, selected);
                  if (improvement) setDismissing(improvement);
                },
                onUndo: async () => {
                  const improvement = clusterImprovement(state, selected);
                  return improvement ? act("improvement_revert", { improvementId: improvement.id }) : void 0;
                },
                onOpenLink: (url) => void host.openEvidence(url),
                // Rename is the card's own: its header's title turns into a name field.
                menu: clusterActions(selected, state.clusters, {
                  onSetDismissed: (dismissed) => act("cluster_update", {
                    clusterKey: selected.key,
                    action: dismissed ? "dismiss" : "restore"
                  }),
                  onMerge: async (into) => {
                    const result = await act("cluster_update", {
                      clusterKey: selected.key,
                      action: "merge",
                      into: into.key
                    });
                    if (result) openClusterFrom(into.key, pageView2);
                  }
                })
              }
            },
            selected.key
          ) : void 0,
          onDeselect: () => go(hrefFor(pageView2)),
          onOpenCluster: (cluster) => openClusterFrom(cluster.key, pageView2),
          onOpenDelivery,
          onOpenSignal: (signal) => openSignalFrom(signal.clusterKey, signal.id, listCluster ?? pageView2),
          clusterMenu: (cluster) => clusterMenu(cluster, pageView2)
        }
      ) : pageView2.kind === "signal-kind" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SignalTypeDetailsPage,
        {
          host,
          type: pageView2.type,
          state,
          onOpenCluster: (cluster) => openClusterFrom(cluster.key, pageView2),
          onOpenDelivery,
          onOpenSignal: (signal) => openSignalFrom(signal.clusterKey, signal.id, pageView2),
          clusterMenu: (cluster) => clusterMenu(cluster, pageView2)
        }
      ) : analytics.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SignalAnalyticsPage,
        {
          data: analytics.data,
          nowMs: analyticsNowMs,
          onOpenType: (type) => setView({ kind: "signal-kind", type })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { as: "section", padding: "sm", stack: true, children: analytics.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: analytics.error }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SignalAnalyticsLoading, {}) })
    };
  };
  const subpage = pageView ? pageCard(pageView) : listCluster?.from ? pageCard(listCluster.from) : signalCard && selected ? {
    id: `signal:${signalCard.id}`,
    title: openedSignal?.summary ?? "Signal",
    concept: openedSignal?.kind ?? "signal",
    conceptLabel: "Signal",
    covers: "all",
    previousPage: backTo(improveSubViewParent(signalCard, Boolean(selectedImprovement))),
    onClose: () => go("/improve"),
    content: openedSignal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      SignalPage,
      {
        host,
        state,
        cluster: selected,
        signal: openedSignal,
        signals: detail.signals ?? [],
        onOpenCluster: () => openClusterFrom(
          selected.key,
          signalCard.from?.kind === "cluster" ? signalCard.from.from ?? null : signalCard.from ?? null
        ),
        onOpenSignal: (signal) => openSignalFrom(selected.key, signal.id, signalCard.from ?? null),
        onOpenDelivery
      },
      openedSignal.id
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { as: "section", padding: "sm", stack: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", role: detail.signals ? void 0 : "status", children: detail.error || (detail.signals ? "This signal has expired. Clusters keep counts for 90 days." : "Loading the signal…") }) })
  } : clusterCard && selected ? {
    id: `cluster:${selected.key}`,
    title: selected.title,
    concept: "cluster",
    conceptLabel: "Cluster",
    covers: "all",
    ...clusterCard.from ? { previousPage: backTo(clusterCard.from) } : {},
    onClose: () => go("/improve"),
    content: clusterPage(clusterCard)
  } : evidenceCard && selected ? {
    id: `evidence:${selected.key}`,
    title: "All evidence",
    concept: "signal",
    conceptLabel: "Evidence",
    covers: "all",
    previousPage: backTo(improveSubViewParent(evidenceCard, Boolean(selectedImprovement))),
    onClose: () => go("/improve"),
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImprovementEvidence,
      {
        host,
        state,
        cluster: selected,
        signals: detail.signals,
        error: detail.error,
        onOpenSignal: (signal) => openSignalFrom(selected.key, signal.id, evidenceCard),
        onOpenDelivery
      }
    )
  } : void 0;
  const primary = !loaded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Improvements", className: "flex min-w-0 flex-col gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "IMPROVEMENTS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ImprovementRowsSkeleton, {})
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-5", children: [
    compact && overview,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Improvements", className: "flex min-w-0 flex-col gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "IMPROVEMENTS", count: waiting.length }),
      waiting.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigurableListGroup,
        {
          variant: "separate",
          pageSize: 40,
          revealIndex: waiting.findIndex((entry) => entry.cluster.key === listSelected),
          moreLabel: "Show more improvements",
          children: waiting.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImprovementRow,
            {
              entry,
              place: entry.improvement.target === "global" ? "Global setup" : clusterProject(state, entry.cluster)?.name ?? "Repository",
              selected: entry.cluster.key === listSelected,
              pending,
              onSelect: () => preview(entry),
              onDismiss: improvementActions(entry.improvement).dismiss ? () => setDismissing(entry.improvement) : void 0
            },
            entry.improvement.id
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImprovementsEmptyState, { clusters: all })
    ] }),
    resolved.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "pill", size: "sm", onClick: () => setView({ kind: "history" }), children: [
      "Show resolved improvements (",
      resolved.length,
      ")",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12, "aria-hidden": true })
    ] }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref: layoutProbe, hidden: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColumnLayout,
      {
        primaryHeader: compact ? void 0 : "Improve",
        compactBackLabel: "Improve",
        onCompactBack: () => go("/improve"),
        contentKey: showingImprovement ? `${selectedKey}:improvement` : void 0,
        primary: compact ? (
          // Compact has no column card or title section around the list: the page's own inset.
          /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { padding: "sm", children: primary })
        ) : primary,
        subpage,
        content: selectedKey && loaded && !selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorPage,
          {
            variant: "notFound",
            title: "This cluster is not here",
            description: "It may have been merged into another cluster or expired. Choose one on the left."
          }
        ) : showingImprovement && selected && selectedImprovement ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ImprovementPreview,
          {
            state,
            cluster: selected,
            improvement: selectedImprovement,
            signals: detail.signals,
            patches: detail.patches?.[selectedImprovement.id],
            pending,
            act,
            onSeeEvidence: () => setView({ kind: "evidence" }),
            onOpenLink: (url) => void host.openEvidence(url)
          },
          selectedImprovement.id
        ) : compact ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { as: "section", padding: "sm", stack: true, children: overview })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DismissImprovementDialog,
      {
        improvement: dismissing,
        onClose: () => setDismissing(null),
        onDismiss: (feedback) => act("improvement_decide", { improvementId: dismissing.id, decision: "dismissed", ...feedback })
      }
    )
  ] });
}
function ClusterList({
  clusters,
  state,
  onSelect,
  actions
}) {
  const now = Date.now();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { variant: "separate", pageSize: 20, moreLabel: "Show more clusters", children: clusters.map((cluster) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ClusterRow,
    {
      state,
      cluster,
      now,
      onOpen: () => onSelect(cluster),
      actions: actions?.(cluster)
    },
    cluster.key
  )) });
}
function ClusterDetailPage({
  host,
  state,
  cluster,
  signals,
  signalsError,
  pending,
  act,
  onOpenProject,
  onOpenDelivery,
  onPreview,
  onSeeEvidence,
  onDismissImprovement,
  onOpenSignal,
  renaming,
  onRenamingChange,
  menu
}) {
  const project = clusterProject(state, cluster);
  const improvement = clusterImprovement(state, cluster);
  const signalCount = cluster.counts?.signals ?? signals?.length ?? 0;
  const lastAt = cluster.counts?.lastAt;
  const sections = useExpandableSections(() => ["improvement", "signals"]);
  const header = {
    view: "improve",
    kind: "Cluster",
    kindConcept: "cluster",
    title: cluster.title,
    titleEdit: {
      label: "Cluster name",
      maxLength: 160,
      editing: renaming,
      onEditingChange: onRenamingChange,
      onSubmit: async (title) => {
        const next = title.trim();
        if (next && next !== cluster.title)
          await act("cluster_update", { clusterKey: cluster.key, action: "rename", title: next });
        onRenamingChange(false);
      }
    },
    menu,
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "cluster", tileSize: "lg" }), shape: "tile" },
    status: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "neutral", color: CLUSTER_STATUS_COLOR[cluster.status], children: CLUSTER_STATUS_LABEL[cluster.status] }),
    summary: `${clusterCountsText(cluster)} · ${fixTargetLabel(cluster.fixTarget)}`,
    facts: [
      project ? {
        id: "project",
        label: "Project",
        value: project.name,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed: repositoryFlowerSeed(project.repositories[0]), size: 14 }),
        link: { onSelect: () => onOpenProject(project.id) },
        linkLabel: `Open project ${project.name}`,
        place: "top"
      } : { id: "private", label: "Visibility", value: "Private", concept: "global", place: "top" },
      ...lastAt ? [{ id: "last", label: "Last seen", value: date(lastAt), concept: "activity", metric: true }] : []
    ],
    counts: [
      {
        id: "improvement",
        concept: "suggestion",
        count: improvement ? 1 : 0,
        label: "improvement",
        description: improvement ? improvementStatusLabel(improvement.status) : "None proposed yet",
        onSelect: () => sections.jump("improvement")
      },
      {
        id: "signals",
        concept: "signal",
        count: signalCount,
        label: signalCount === 1 ? "signal" : "signals",
        onSelect: () => sections.jump("signals")
      }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { as: "section", padding: "sm", stack: true, "data-improve-cluster": cluster.key, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { header, under: "counts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClusterKindMix, { cluster }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpandableSection,
        {
          ...sections.props("improvement"),
          concept: "suggestion",
          title: improvement?.title ?? "Improvement",
          summary: improvement ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionSummary,
            {
              badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "neutral", color: improvementStatusColor(improvement.status), children: improvementStatusLabel(improvement.status) })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSummary, { parts: ["None yet"] }),
          children: improvement ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClusterImprovement,
            {
              improvement,
              pending,
              onPreview,
              onAccept: () => void act("improvement_decide", { improvementId: improvement.id, decision: "accepted" }),
              onDismiss: () => onDismissImprovement(improvement),
              onUndo: () => act("improvement_revert", { improvementId: improvement.id }),
              onOpenLink: (url) => void host.openEvidence(url)
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 cp-muted", children: noImprovementText(cluster) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExpandableSection,
        {
          ...sections.props("signals"),
          empty: signals !== null && signals.length === 0 && signalCount === 0 && !signalsError,
          concept: "signal",
          title: "Signals",
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionSummary,
            {
              parts: [
                `${signalCount} ${signalCount === 1 ? "signal" : "signals"}`,
                lastAt ? `last ${deliveryActivityLabel(lastAt, Date.now())}` : null
              ]
            }
          ),
          fit: signals?.length ? "list" : "inset",
          children: signalsError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "m-0 type-ui-meta text-danger", children: signalsError }) : !signals ? /* @__PURE__ */ jsxRuntimeExports.jsx(SignalRowsSkeleton, { count: Math.min(CLUSTER_SIGNAL_PREVIEW, Math.max(1, signalCount)) }) : signals.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SignalRows,
              {
                host,
                state,
                signals,
                pageSize: CLUSTER_SIGNAL_PREVIEW,
                onOpenSignal,
                onOpenDelivery
              }
            ),
            signalCount > CLUSTER_SIGNAL_PREVIEW && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: onSeeEvidence, children: [
              "See all ",
              signalCount,
              " signals",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12, "aria-hidden": true })
            ] }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 cp-muted", children: "Its signals have expired. Clusters keep counts for 90 days." })
        }
      )
    ] })
  ] });
}
export {
  ClusterList as C,
  ImprovePage as I,
  clusterActions as c
};
//# sourceMappingURL=ImprovePage-DSaRYyc7.js.map

//# debugId=241f47f0-e811-5d6e-a0fd-fe041e16a6ad
