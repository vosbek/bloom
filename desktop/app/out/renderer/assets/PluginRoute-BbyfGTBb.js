
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="43cc582c-9848-5fbc-b3f3-9fff7c1fe5ec")}catch(e){}}();
import { gP as jsxRuntimeExports, dx as SectionHeader, ar as ConfigurableListGroup, fg as agentPluginFacts, gt as harnessKey, fF as codingToolOfHarness, gv as harnessName, at as ConfigurableListItem, hC as relativeTime, aj as CodingToolReference, hG as repositoryLabel, d4 as PluginKeyReference, hh as pluginKeyOf, f as AgentAccessFacet, d5 as PluginVersionFacet, g as AgentAvatar, ep as SquareTerminal, dl as RefreshCw, jk as useRelativeActivityClock, ji as usePluginScan, jg as usePluginInstallKeys, hf as pluginHarnessRows, E as BLUME_PLUGIN, hi as pluginNextStep, hx as reactExports, d2 as PluginInstallCard, es as StatusSummaryBadge, an as ConceptIcon, gM as isSource, bP as HarnessTile, Q as Card, hg as pluginInstallerView, d1 as PluginAgentToolbar, iM as useCodexLabel, ak as CodingToolTile, bR as HeadingText, J as Button, s as ArrowRight, dk as RefreshCw$1, bf as ExpandableSection, c1 as Info, gO as joinNames, dC as SectionSummary, cT as PageHeader, eS as Timeline, eT as TimelineItem, ca as KeyRound, eM as Terminal, ad as Clock3, cP as PackageOpen, ec as ShieldCheck, p as ArrowDown, fL as convertBlumePlugin, gV as listedToolCounts, fo as blumeHooksConfig, fp as blumeMcpConfig, iS as useExpandableSections, b as AccordionCard, dy as SectionInset, g_ as mcpToolGroups, dB as SectionListRow, v as ArrowUpRight, dA as SectionListHeading, bs as FilePreview, a7 as Circle, eZ as Undo2, a8 as CircleCheck, fE as cn, f2 as ViewHeader, cJ as PLUGIN_ADAPTERS, jh as usePluginInstaller, jf as usePluginAgents, ju as useWorkspaceName, jb as usePageState, iC as useAppRoute, fH as compact, cV as PageHeaderViews, d3 as PluginInstallationPanel, ff as agentActions, cL as PLUGIN_WORKFLOW, aI as DetailDisclosure, cK as PLUGIN_CONTRACTS, cx as McpToolReferencePanel, iX as useHostedData, iY as useHostedNavigation, bU as HostedPage, cX as PageTakeoverRegion, hP as resolveProject } from "./index-nrW_ocxo.js";
function PluginAgentList({
  threads,
  keys,
  latest,
  now,
  onOpenAgent,
  menu,
  showCount = true
}) {
  const connected = threads.filter((thread) => !thread.revoked).length;
  const ordered = [...threads].sort(
    (a, b) => Number(a.revoked) - Number(b.revoked) || (b.pluginReport?.seenAt ?? b.lastSeenAt) - (a.pluginReport?.seenAt ?? a.lastSeenAt)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Connected agents", className: "flex flex-col gap-2 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeader,
      {
        label: "AGENTS",
        count: showCount ? connected : void 0,
        rightItem: showCount && threads.length > connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "type-ui-meta text-muted", children: [
          threads.length - connected,
          " revoked"
        ] }) : void 0
      }
    ),
    threads.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { pageSize: 8, moreLabel: "Show more agents", children: ordered.map((thread) => {
      const facts = agentPluginFacts(thread, keys, latest);
      const harness = harnessKey(thread.harness);
      const tool = codingToolOfHarness(harness, harnessName(harness, thread.harness));
      const key = thread.installationId ? keys.find((item) => item.id === thread.installationId) : void 0;
      const seenAt = thread.pluginReport?.seenAt ?? thread.lastSeenAt;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigurableListItem,
        {
          title: thread.title,
          leading: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentAvatar, { agent: thread }),
          onSelect: onOpenAgent && (() => onOpenAgent(thread.id)),
          menu: menu?.(thread),
          menuLabel: `Actions for ${thread.title}`,
          status: thread.revoked ? /* @__PURE__ */ jsxRuntimeExports.jsx(AgentAccessFacet, { access: "revoked" }) : facts.outdated ? /* @__PURE__ */ jsxRuntimeExports.jsx(PluginVersionFacet, { state: "outdated", form: "badge", size: "xs", of: tool.label }) : void 0,
          metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CodingToolReference, { tool }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: repositoryLabel(thread.project) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: facts.version ? `Plugin ${facts.version}` : "Plugin version not reported" }),
            key ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex min-w-0 items-center gap-1", children: [
              "Key ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(PluginKeyReference, { model: pluginKeyOf(key, { now, tool }), now })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: facts.via }),
            thread.usage?.intent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: thread.usage.intent === "use" ? "Chose to use Blume" : "Chose to skip Blume" })
          ] }),
          trailing: seenAt ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "type-ui-meta text-muted tabular-nums whitespace-nowrap",
              title: `Last seen ${new Date(seenAt).toLocaleString()}`,
              children: relativeTime(seenAt, now)
            }
          ) : void 0
        },
        thread.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-ui-body text-muted", children: "No agent has connected yet. Install the plugin, then start a new conversation." })
  ] });
}
function pluginActions(model, handlers = {}) {
  return [
    handlers.onInstallFromTerminal && model.installHarness === null && model.installKeys.supported && {
      label: "Install from a terminal",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, {}),
      onSelect: handlers.onInstallFromTerminal
    },
    {
      label: model.scan.busy ? "Checking…" : "Check again",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, {}),
      disabled: model.scan.busy,
      onSelect: model.refresh
    }
  ];
}
function usePluginPage(props) {
  const { host, threads, state } = props;
  const now = useRelativeActivityClock();
  const scan = usePluginScan(host);
  const installKeys = usePluginInstallKeys(host);
  const latest = BLUME_PLUGIN.version;
  const rows = pluginHarnessRows({ threads, scan: scan.scan, keys: installKeys.keys, latest, now });
  const step = pluginNextStep(rows, latest);
  const [installHarness, setInstallHarness] = reactExports.useState(null);
  const installRef = reactExports.useRef(null);
  const connected = threads.filter((thread) => !thread.revoked).length;
  const activeKeys = rows.flatMap((row) => row.keys);
  return {
    now,
    scan,
    installKeys,
    latest,
    rows,
    step,
    installHarness,
    setInstallHarness,
    installRef,
    openInstall: (harness) => {
      setInstallHarness(harness);
      requestAnimationFrame(() => installRef.current?.scrollIntoView({ block: "nearest" }));
    },
    refresh: () => {
      void scan.refresh();
      void installKeys.refresh();
    },
    inUse: rows.filter((row) => row.connected > 0 || row.local?.status === "installed"),
    current: rows.filter((row) => row.status.tone === "success").length,
    outdated: rows.filter((row) => row.status.label === "Update available"),
    connected,
    revoked: threads.length - connected,
    activeKeys,
    savedRepositories: state.usagePolicy?.repositories.length ?? 0,
    defaultMode: state.usagePolicy?.defaultMode === "use" ? "Use Blume" : "Ask when unclear"
  };
}
const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;
const PLUGIN_DESCRIPTION = "Tools and instructions that let your agents plan work, share progress and bring back evidence for you to review.";
function PluginInstallSection({
  props,
  model,
  harness,
  onHarnessChange = model.setInstallHarness,
  framed,
  intro
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: model.installRef, className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PluginInstallCard,
    {
      host: props.host,
      step: model.step,
      harness: harness ?? model.installHarness ?? model.step?.harness ?? "codex",
      onHarnessChange,
      onCreated: () => void model.installKeys.refresh(),
      framed,
      intro
    }
  ) });
}
function scanText(model) {
  const { scan } = model.scan;
  if (model.scan.error) return model.scan.error;
  if (!scan) return "Checking this computer…";
  return scan.scope === "local" ? `Checked ${relativeTime(scan.checkedAt, model.now)}` : scan.note;
}
function pluginStatus(model) {
  if (model.outdated.length) return { label: "Update available", tone: "warn" };
  if (model.step?.kind === "repair") return { label: "Install unfinished", tone: "warn" };
  if (model.inUse.length) return { label: "In use", tone: "success" };
  if (model.step?.kind === "start") return { label: "Waiting for a conversation", tone: "info" };
  return { label: "Not set up", tone: "neutral" };
}
const harnessIcon = (key) => isSource(key) ? /* @__PURE__ */ jsxRuntimeExports.jsx(HarnessTile, { harness: key, showTooltip: false }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "harness", tileSize: "sm" });
const PACKAGE_WORDS = {
  MCP: "MCP tools",
  Skills: "skill",
  Scripts: "connection script",
  Docs: "docs",
  Hooks: "hooks"
};
function pluginFacts(model, nav = {}, { sentence = false } = {}) {
  const at = (place) => place ? { place } : {};
  const lastReport = model.rows.reduce(
    (latest, row) => row.lastSeenAt && (!latest || row.lastSeenAt > latest) ? row.lastSeenAt : latest,
    null
  );
  const inUse = new Set(model.inUse.map((row) => row.key));
  const outdated = new Set(model.outdated.map((row) => row.key));
  const rank = (key) => outdated.has(key) ? 2 : inUse.has(key) ? 1 : 0;
  return {
    version: (place) => ({
      id: "version",
      label: "Latest version",
      value: sentence ? `Latest v${model.latest}` : `v${model.latest}`,
      concept: "plugin",
      ...at(place)
    }),
    lastReport: (place) => lastReport ? {
      id: "report",
      label: "Last report from an agent",
      value: sentence ? `Last report ${relativeTime(lastReport, model.now)}` : relativeTime(lastReport, model.now),
      concept: "activity",
      metric: true,
      ...at(place)
    } : null,
    computer: (place) => ({
      id: "computer",
      label: "This computer",
      value: sentence && model.scan.scan?.scope === "local" ? `This computer ${scanText(model).toLowerCase()}` : scanText(model),
      concept: "harness",
      metric: true,
      priority: "secondary",
      ...at(place)
    }),
    agents: (place) => ({
      id: "agents",
      label: "Agents",
      value: `${model.connected} connected${model.revoked ? `, ${model.revoked} revoked` : ""}`,
      concept: "agent",
      link: nav.onShowAgents ? { onSelect: nav.onShowAgents } : void 0,
      ...at(place)
    }),
    keys: (place) => model.installKeys.supported ? {
      id: "keys",
      label: "Installation keys",
      value: plural(model.activeKeys.length, "key"),
      concept: "setup",
      link: nav.onShowKeys ? { onSelect: nav.onShowKeys } : void 0,
      ...at(place)
    } : null,
    harnesses: (place) => [...model.rows].sort((a, b) => rank(b.key) - rank(a.key)).map((row) => ({
      id: `harness-${row.key}`,
      label: row.label,
      value: row.status.label,
      icon: harnessIcon(row.key),
      link: nav.onShowHarness ? { onSelect: () => nav.onShowHarness(row.key) } : void 0,
      priority: inUse.has(row.key) || outdated.has(row.key) ? "primary" : "secondary",
      ...at(place)
    })),
    /** What the package installs: MCP tools, skills, rules…; it leads to How it works. */
    package: (place) => ({
      id: "package",
      label: "Package",
      value: (() => {
        const parts = BLUME_PLUGIN.contents.filter((item) => item.included).map((item) => PACKAGE_WORDS[item.kind] ?? item.kind);
        const shown = parts.slice(0, 3).join(", ");
        return parts.length > 3 ? `${shown} +${parts.length - 3}` : shown;
      })(),
      concept: "artifact",
      link: nav.onShowGuide ? { onSelect: nav.onShowGuide } : void 0,
      linkLabel: "What the package includes",
      ...at(place)
    }),
    usage: (place) => ({
      id: "usage",
      label: "New conversations",
      value: model.defaultMode,
      concept: "usage",
      link: nav.onShowUsage ? { onSelect: nav.onShowUsage } : void 0,
      ...at(place)
    })
  };
}
function pluginHeader(model, parts, handlers = {}) {
  const status = pluginStatus(model);
  return {
    view: "plugin",
    kind: "Plugin",
    kindConcept: "plugin",
    title: "Blume plugin",
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "plugin", tileSize: "lg" }), shape: "tile" },
    status: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSummaryBadge, { tone: status.tone, children: status.label }),
    summary: PLUGIN_DESCRIPTION,
    ...parts,
    menu: pluginActions(model, handlers)
  };
}
const CARD_SURFACE = "@container relative min-w-0 rounded-[var(--radius-container)] bg-[var(--layout-panel-bg)] shadow-[var(--shadow-list)] overflow-visible";
const CARD_FOOTER = "flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-4 border-t border-[var(--border-subtle)]";
function SectionsCard({
  header,
  footer,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "none", ...props, className: CARD_SURFACE, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "grid min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-5", children: header }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-3 px-5 pt-4 pb-5", children: [
      children,
      footer && /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: CARD_FOOTER, children: footer })
    ] })
  ] }) });
}
function whatHappens(agents, workspace) {
  return [
    {
      id: "key",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 12, "aria-hidden": true }),
      title: "A private key for each agent",
      body: `Blume creates one${workspace ? ` in ${workspace}` : " in this workspace"}. It stays in the agent’s own settings on this computer.`
    },
    {
      id: "plugin",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { size: 12, "aria-hidden": true }),
      title: `Blume in ${agents || "your agents"}`,
      body: "Its tools, a skill, rules and hooks, added as a plugin."
    },
    {
      id: "nothing-else",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 12, "aria-hidden": true }),
      title: "Nothing else changes",
      body: "Your projects, other plugins and settings stay as they are."
    },
    {
      id: "seconds",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 12, "aria-hidden": true }),
      title: "Ready in a few seconds",
      body: "New conversations pick Blume up. Ones that are already open don’t."
    },
    {
      id: "updates",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { size: 12, "aria-hidden": true }),
      title: "Kept up to date",
      body: "Blume updates itself in each agent. Turn that off per agent, or remove Blume any time."
    }
  ];
}
function ExplainedSteps({
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { density: "compact", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    TimelineItem,
    {
      marker: item.icon,
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-normal text-body", children: item.body })
      ] })
    },
    item.id
  )) });
}
function PluginInstallerPanel({
  view,
  statusError,
  checking = false,
  onCheck,
  toolbar,
  workspace,
  onOpenDeliveries
}) {
  const codex = useCodexLabel();
  const phase = view?.phase ?? "intro";
  const running = phase === "running";
  const intro = (view?.layout ?? "intro") === "intro";
  const agents = view?.agents ?? [];
  const outcome = view?.outcome;
  const [explainOpen, setExplainOpen] = reactExports.useState(intro);
  const noAgents = view !== null && !agents.some((agent) => agent.state !== "missing");
  const toInstall = agents.filter((agent) => agent.state === "available");
  const outdated = agents.some((agent) => agent.state === "outdated");
  const disconnected = agents.some((agent) => agent.state === "disconnected");
  const title = outcome ? outcome.title : running ? "Installing Blume…" : intro ? "Add Blume to your agents" : "Blume on this computer";
  const state = outcome ? outcome.tone === "failed" ? "failed" : "current" : running ? "installing" : intro ? "missing" : disconnected ? "disconnected" : outdated ? "outdated" : "current";
  const status = /* @__PURE__ */ jsxRuntimeExports.jsx(PluginVersionFacet, { state, form: "badge", size: "sm" });
  const header = {
    view: "plugin",
    kind: "Plugin",
    kindConcept: "plugin",
    title,
    status,
    summary: outcome ? void 0 : running ? "This takes a few seconds. You can keep using the app." : intro ? view?.availableNames ? `Found ${view.availableNames} on this computer` : void 0 : view?.summary,
    facts: [],
    actions: outcome && outcome.tone !== "failed" && onOpenDeliveries ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "primary", size: "sm", onClick: onOpenDeliveries, children: [
      "Open Deliveries ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { "aria-hidden": true })
    ] }) : !intro && !running ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "xs",
        onClick: onCheck,
        disabled: checking,
        "aria-label": "Check the agents on this computer again",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { "aria-hidden": true }),
          checking ? "Checking…" : "Check again"
        ]
      }
    ) : void 0
  };
  const lead = outcome ? outcome.next : intro && !running ? "Your agents plan their work in Blume, keep you posted as they go, and bring back evidence for you to review." : null;
  const explain = !running && !noAgents && (intro || toInstall.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SectionsCard,
    {
      "aria-label": title,
      "data-plugin-installer": phase,
      header: /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { size: "card", under: "none", header }),
      children: [
        lead && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: outcome?.tone === "failed" ? "m-0 type-ui-body text-danger" : "m-0 type-ui-body text-body",
            children: lead
          }
        ),
        statusError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "m-0 type-ui-body text-danger", children: statusError }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "xs", onClick: onCheck, disabled: checking, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { "aria-hidden": true }),
            " Check again"
          ] })
        ] }) : !view ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", "aria-busy": true, children: "Checking which agents are on this computer…" }) : toolbar,
        noAgents && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-body text-body", children: [
            "Blume installs into Claude Code and ",
            codex,
            " with one click. Install one of them and check again, or add Blume to another agent from More."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: onCheck, disabled: checking, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw$1, { "aria-hidden": true }),
            " ",
            checking ? "Checking…" : "Check again"
          ] })
        ] }),
        explain && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExpandableSection,
          {
            id: "what-happens",
            open: explainOpen,
            onOpenChange: setExplainOpen,
            icon: Info,
            title: "What happens when you install",
            summary: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSummary, { parts: ["Nothing else changes"] }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExplainedSteps,
              {
                items: whatHappens(
                  intro ? view?.availableNames ?? "" : joinNames(toInstall.map((agent) => agent.label)),
                  workspace
                )
              }
            )
          }
        )
      ]
    }
  );
}
function PluginInstaller({
  installer,
  others,
  workspace,
  onOpenDeliveries,
  onKeyCreated
}) {
  const now = useRelativeActivityClock();
  const view = installer.statuses ? pluginInstallerView({
    statuses: installer.statuses,
    run: installer.run,
    now,
    relative: relativeTime
  }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PluginInstallerPanel,
    {
      view,
      statusError: installer.statusError,
      checking: installer.checking,
      onCheck: () => {
        void installer.check();
        void others.load();
      },
      toolbar: /* @__PURE__ */ jsxRuntimeExports.jsx(PluginAgentToolbar, { installer, others, onKeyCreated }),
      workspace,
      onOpenDeliveries
    }
  );
}
function terminalSteps(workspace, codex = "Codex") {
  return [
    {
      id: "command",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { size: 12, "aria-hidden": true }),
      title: "Create a one-time command",
      body: `Choose Claude Code or ${codex}. The command carries a private key${workspace ? ` for ${workspace}` : ""} and is shown once.`
    },
    {
      id: "run",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { size: 12, "aria-hidden": true }),
      title: "Run it in a terminal",
      body: "On the computer where your agent runs. It adds Blume’s tools, a skill, rules and hooks to that agent, and nothing else."
    },
    {
      id: "conversation",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { size: 12, "aria-hidden": true }),
      title: "Start a new conversation",
      body: "The agent connects by itself and shows up under Deliveries as soon as it uses Blume."
    }
  ];
}
function PluginTerminalInstallPanel({
  workspace,
  another = false,
  children
}) {
  const codex = useCodexLabel();
  const headingId = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "none", "aria-labelledby": headingId, "data-plugin-installer": "terminal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-x-8 gap-y-5 p-5 min-w-0 @2xl/control:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 min-w-0 @2xl/control:col-start-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", "aria-hidden": true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodingToolTile, { tool: codingToolOfHarness("claude") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodingToolTile, { tool: codingToolOfHarness("codex") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h2", size: "lg", id: headingId, children: another ? "Add Blume to another agent" : "Add Blume to your agents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "Your agents plan their work in Blume, keep you posted as they go, and bring back evidence for you to review." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "aria-label": "How installing from a terminal works",
        className: "flex flex-col gap-3 min-w-0 @2xl/control:col-start-2 @2xl/control:row-start-1 @2xl/control:row-span-2 @2xl/control:border-l @2xl/control:border-border-subtle @2xl/control:pl-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "HOW IT WORKS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExplainedSteps, { items: terminalSteps(workspace, codex) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 @2xl/control:col-start-1", children })
  ] }) });
}
const STAGES = [
  {
    id: "agent",
    label: "YOUR AGENT",
    lines: [
      ["Always", "The session card, the skill’s description and the tool list"],
      ["When it uses Blume", "The full process, tool results and waiting messages"]
    ]
  },
  {
    id: "computer",
    label: "THIS COMPUTER",
    lines: [
      ["The bridge", "Adds this conversation and repository to Blume tool calls"],
      ["The hooks", "Start each conversation with the card and bring in messages"]
    ]
  },
  {
    id: "blume",
    label: "BLUME",
    lines: [["Your workspace", "Deliveries, tests and evidence, messages and improvements"]]
  }
];
const HOPS = ["tool calls", "this agent’s key"];
function PluginFlow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ol",
    {
      "aria-label": "How Blume reaches your agent",
      className: "m-0 grid list-none gap-3 p-0 min-w-0 @2xl/control:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] @2xl/control:items-stretch",
      children: STAGES.map((stage, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex min-w-0 flex-col gap-2", "data-stage": stage.id, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: stage.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "m-0 flex flex-col gap-2 type-ui-body", children: stage.lines.map(([term, detail]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-strong", children: term }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0 text-body", children: detail })
          ] }, term)) })
        ] }),
        index < HOPS.length && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            "aria-hidden": true,
            className: "flex items-center gap-2 type-ui-meta text-muted @2xl/control:flex-col @2xl/control:justify-center @2xl/control:px-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 14, className: "@2xl/control:hidden" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "hidden @2xl/control:block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: HOPS[index] })
            ]
          }
        )
      ] }, stage.id))
    }
  );
}
const PLUGIN_FOLDER = "<plugin folder>";
const PLUGIN_HOOK_EVENTS = [
  {
    event: "SessionStart",
    description: "Starts every conversation with Blume’s short operating card, plus any messages waiting for this agent."
  },
  {
    event: "PostToolUse",
    description: "Between tool calls, at most every 10 seconds, it brings in new messages. Blume’s own tools carry them already."
  },
  {
    event: "Stop",
    description: "Before a turn ends, new messages keep the agent working on them once. It never blocks when Blume is unreachable."
  }
];
const describe = (kind) => BLUME_PLUGIN.contents.find((item) => item.kind === kind)?.description ?? "";
function pluginContents() {
  const marker = "/__blume_plugin__";
  const files = Object.fromEntries(
    Object.entries(convertBlumePlugin("claude", `${marker}/scripts/serve.mjs`)).map(
      ([path, content]) => [path, content.replaceAll(marker, PLUGIN_FOLDER)]
    )
  );
  const file = (path, language = "markdown") => ({
    path,
    content: files[path] ?? "",
    language
  });
  const tools = listedToolCounts();
  return [
    {
      id: "mcp",
      concept: "mcp",
      title: "MCP tools",
      summary: `${tools.total} tools · ${tools.reads} read, ${tools.writes} write`,
      description: describe("MCP"),
      reach: { when: "always", label: "Tool list always; results when called" },
      files: []
    },
    {
      id: "skills",
      concept: "skill",
      title: "Skills",
      summary: "blume, setup",
      description: describe("Skills"),
      reach: { when: "on-use", label: "Its description always; the process when used" },
      files: [
        file("skills/blume/SKILL.md"),
        file("skills/blume/references/testing.md"),
        file("skills/blume/references/tools.md"),
        file("skills/setup/SKILL.md")
      ]
    },
    {
      id: "hooks",
      concept: "hook",
      title: "Hooks",
      summary: PLUGIN_HOOK_EVENTS.map((hook) => hook.event).join(", "),
      description: describe("Hooks"),
      reach: {
        when: "always",
        label: "The card at every conversation start; messages when waiting"
      },
      files: [
        { path: "Session-start card", content: BLUME_PLUGIN.card + "\n", language: "markdown" },
        {
          path: "hooks/hooks.json",
          // The installer's own builder, with the plugin's path shown as a placeholder.
          content: JSON.stringify(
            blumeHooksConfig(
              `'/bin/sh' '${PLUGIN_FOLDER}/scripts/node.sh' '${PLUGIN_FOLDER}/scripts/hook.mjs'`
            ),
            null,
            2
          ) + "\n",
          language: "json"
        }
      ]
    },
    {
      id: "scripts",
      concept: "command",
      title: "Connection script",
      summary: ".mcp.json",
      description: describe("Scripts"),
      reach: { when: "never", label: "Not in context: it runs the tools" },
      files: [
        {
          // As the installer writes it; the key stays in the agent's own settings, never shown here.
          path: ".mcp.json",
          content: JSON.stringify(
            blumeMcpConfig(
              {
                command: "/bin/sh",
                args: [`${PLUGIN_FOLDER}/scripts/node.sh`, `${PLUGIN_FOLDER}/scripts/serve.mjs`]
              },
              {
                endpoint: "<your workspace in Blume>",
                key: "<this agent’s private key>",
                appLink: "<how the agent opens Blume, when the app gives one>"
              },
              "<claude or codex>"
            ),
            null,
            2
          ) + "\n",
          language: "json"
        }
      ]
    },
    {
      id: "docs",
      concept: "documentation",
      title: "README",
      summary: "README.md",
      description: describe("Docs"),
      reach: { when: "never", label: "Not in context: for people" },
      files: [file("README.md")]
    }
  ];
}
const REACH = {
  always: "Always in context",
  "on-use": "In context when used",
  never: { text: "Not in context", tone: "muted" }
};
function PluginContents({
  onOpenTool
}) {
  const sections = reactExports.useMemo(pluginContents, []);
  const open = useExpandableSections(() => [], { single: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionCard,
    {
      title: "What’s included",
      concept: "plugin",
      trailing: `v${BLUME_PLUGIN.version}`,
      variant: "subtle",
      intro: /* @__PURE__ */ jsxRuntimeExports.jsx(PluginFlow, {}),
      "data-slot": "plugin-contents",
      children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        ExpandableSection,
        {
          ...open.props(section.id),
          fit: "list",
          concept: section.concept,
          title: section.title,
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSummary, { parts: [REACH[section.reach.when]] }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionInset, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: section.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-meta text-muted", children: [
                section.reach.label,
                " · ",
                section.summary
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBody, { section, onOpenTool })
          ]
        },
        section.id
      ))
    }
  );
}
function SectionBody({
  section,
  onOpenTool
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    section.id === "mcp" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      mcpToolGroups().map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-x-4 gap-y-1 @xl/control:grid-cols-[10rem_minmax(0,1fr)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: group.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex min-w-0 flex-wrap gap-x-3 gap-y-1", children: group.tools.map(
          (tool) => onOpenTool ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "link",
              size: "inline",
              title: tool.label,
              "aria-label": `${tool.name}: ${tool.label}. Open its reference`,
              onClick: () => onOpenTool(tool.name),
              children: tool.short
            },
            tool.name
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("code", { title: tool.label, children: tool.short }, tool.name)
        ) })
      ] }) }, group.id)),
      onOpenTool && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionInset, { variant: "actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "xs", onClick: () => onOpenTool(), children: [
        "Inputs and examples for every tool ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { "aria-hidden": true })
      ] }) }) })
    ] }),
    section.id === "hooks" && PLUGIN_HOOK_EVENTS.map((hook) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-strong", children: hook.event }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children: hook.description })
    ] }) }, hook.event)),
    section.files.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListHeading, { children: file.path }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionInset, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilePreview,
        {
          code: file.content,
          path: file.path,
          language: file.language,
          wrap: file.language === "markdown",
          capLines: 24,
          bordered: true
        }
      ) })
    ] }, file.path))
  ] });
}
const SUPPORT_TIERS = [
  {
    id: "plugin",
    title: "Plugin agents",
    examples: "Claude Code, Codex",
    capabilities: "MCP, skills and hooks",
    status: "one-click"
  },
  {
    id: "mcp",
    title: "Other MCP agents",
    examples: "Editors and CLIs with MCP and project instructions",
    capabilities: "MCP and always-on instructions",
    status: "manual"
  },
  {
    id: "remote",
    title: "Cloud agents",
    examples: "Hosted agents that reach MCP over HTTPS",
    capabilities: "Remote MCP only",
    status: "manual"
  }
];
const SUPPORT_ROWS = [
  {
    id: "when",
    need: "Knows when to use Blume",
    cells: {
      plugin: { text: "The session card and the skill’s description", level: "full" },
      mcp: { text: "The card in INSTRUCTIONS.md, always on", level: "full" },
      remote: { text: "A short note from the MCP server", level: "fallback" }
    }
  },
  {
    id: "process",
    need: "Follows the process",
    cells: {
      plugin: { text: "The blume skill", level: "full" },
      mcp: { text: "INSTRUCTIONS.md, always on", level: "full" },
      remote: { text: "From the first blume_context", level: "fallback" }
    }
  },
  {
    id: "tools",
    need: "Uses Blume’s tools",
    cells: {
      plugin: { text: "Through the bridge on this computer", level: "full" },
      mcp: { text: "Through the bridge, added to its MCP settings", level: "full" },
      remote: { text: "Blume’s hosted MCP endpoint", level: "full" }
    }
  },
  {
    id: "identity",
    need: "Knows the conversation and repository",
    cells: {
      plugin: { text: "From the agent’s session and git", level: "full" },
      mcp: { text: "One per bridge process; repository from git", level: "fallback" },
      remote: { text: "The agent reports the repository", level: "fallback" }
    }
  },
  {
    id: "messages",
    need: "Gets messages while it works",
    cells: {
      plugin: { text: "Between tool calls and before a turn ends", level: "full" },
      mcp: { text: "On Blume tool results", level: "fallback" },
      remote: { text: "On Blume tool results", level: "fallback" }
    }
  },
  {
    id: "tests",
    need: "Records test evidence",
    cells: {
      plugin: { text: "Reports from checks the agent runs with its own tools", level: "full" },
      mcp: { text: "Reports from checks the agent runs with its own tools", level: "full" },
      remote: { text: "Reports from checks the agent runs with its own tools", level: "full" }
    }
  },
  {
    id: "install",
    need: "Install and updates",
    cells: {
      plugin: { text: "One click; kept up to date by the app", level: "full" },
      mcp: { text: "By hand from the portable package", level: "manual" },
      remote: { text: "Connect it in the agent’s own settings", level: "manual" }
    }
  }
];
const LEVEL = {
  full: { icon: CircleCheck, className: "text-status-success-ink", label: "Built in" },
  fallback: { icon: Undo2, className: "text-status-warning-ink", label: "Fallback" },
  manual: { icon: Circle, className: "text-muted", label: "By hand" }
};
function PluginSupport() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "none", "aria-label": "What Blume gets in each kind of agent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-160 border-collapse type-ui-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border-subtle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            scope: "col",
            className: "w-48 p-3 text-left align-bottom type-ui-meta font-normal text-muted",
            children: "The flow needs"
          }
        ),
        SUPPORT_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            scope: "col",
            className: "p-3 text-left align-bottom font-normal",
            "data-tier": tier.id,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-strong", children: tier.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusSummaryBadge,
                  {
                    variant: "ghost",
                    tone: tier.status === "one-click" ? "success" : "neutral",
                    children: tier.status === "one-click" ? "One click" : "Set up by hand"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: tier.examples }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: tier.capabilities })
            ] })
          },
          tier.id
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: SUPPORT_ROWS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border-subtle last:border-b-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { scope: "row", className: "p-3 text-left align-top font-normal text-strong", children: row.need }),
        SUPPORT_TIERS.map((tier) => {
          const cell = row.cells[tier.id];
          const level = LEVEL[cell.level];
          const Icon = level.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 align-top text-body", "data-level": cell.level, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                size: 14,
                "aria-label": level.label,
                className: cn("mt-0.5 shrink-0", level.className)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cell.text })
          ] }) }, tier.id);
        })
      ] }, row.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex flex-wrap items-center gap-x-4 gap-y-1 type-ui-meta text-muted", children: [
      Object.keys(LEVEL).map((key) => {
        const Icon = LEVEL[key].icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12, "aria-hidden": true, className: LEVEL[key].className }),
          LEVEL[key].label
        ] }, key);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Only plugin agents are installed and certified by Blume today." })
    ] })
  ] });
}
const GENERATE = "pnpm --filter @blume/agent-mcp-node plugin:generate --out /tmp/blume-plugins";
function PluginWorksWith({ onOpenOverview }) {
  const sections = useExpandableSections(() => []);
  const codex = useCodexLabel();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewHeader,
      {
        title: "Works with",
        description: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "What Blume’s flow gets in each kind of agent, and the fallback where an agent cannot do something. Claude Code and ",
          codex,
          " install with one click from the",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "link", size: "inline", onClick: onOpenOverview, children: "Overview" }),
          "."
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PluginSupport, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      AccordionCard,
      {
        title: "Set up by hand",
        concept: "setting",
        variant: "subtle",
        "data-slot": "plugin-manual-setup",
        children: [
          PLUGIN_ADAPTERS.map((adapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ExpandableSection,
            {
              ...sections.props(adapter.id),
              fit: "list",
              concept: "plugin",
              title: adapter.title,
              summary: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionSummary,
                {
                  parts: [
                    adapter.id === "portable" ? "Other MCP agents" : "One click from the Overview"
                  ]
                }
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListHeading, { children: "Steps" }),
                adapter.manual.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted tabular-nums", children: index + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children: step })
                ] }) }, step)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListHeading, { children: "Includes" }),
                adapter.included.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children: item }) }, item)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListHeading, { children: "Limits" }),
                adapter.limitations.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children: item }) }, item))
              ]
            },
            adapter.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ExpandableSection,
            {
              ...sections.props("generate"),
              fit: "inset",
              concept: "command",
              title: "Generate packages from a checkout",
              summary: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSummary, { parts: ["For developers"] }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FilePreview, { code: GENERATE, language: "bash", lineNumbers: false, bordered: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "Writes the Codex, Claude Code and portable packages with an absolute bridge path. Keep this checkout and its dependencies on the agent’s computer. No connection secrets are written to the packages." })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function PluginPage(props) {
  const { act, threads } = props;
  const model = usePluginPage(props);
  const installer = usePluginInstaller(props.host.pluginInstaller, model.refresh);
  const others = usePluginAgents(props.host.pluginInstaller?.agents, model.refresh);
  const workspace = useWorkspaceName(props.host);
  const [tab, setTab] = usePageState("plugin-view", "overview");
  const [toolFocus, setToolFocus] = reactExports.useState(null);
  const openTool = (tool) => {
    setToolFocus(tool ? { tool, at: Date.now() } : null);
    setTab("tools");
  };
  const facts = pluginFacts(model, { onShowAgents: () => setTab("installation") });
  const openTerminal = (harness) => {
    setTab("overview");
    model.openInstall(harness);
  };
  const install = (harness) => {
    if (installer.supported && (harness === "claude" || harness === "codex")) {
      setTab("overview");
      void installer.install([harness]);
    } else openTerminal(harness);
  };
  const { route, update } = useAppRoute();
  const requested = route.pluginInstall;
  const consumed = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!requested?.length) return;
    if (!installer.supported) {
      update((current) => ({ ...current, pluginInstall: void 0 }), { replace: true });
      return;
    }
    if (!installer.statuses) return;
    const key = requested.join(",");
    if (consumed.current === key) return;
    consumed.current = key;
    update((current) => ({ ...current, pluginInstall: void 0 }), { replace: true });
    setTab("overview");
    const ready = requested.filter(
      (harness) => installer.statuses.some(
        (status) => status.harness === harness && status.available && !status.installed
      )
    );
    if (ready.length) void installer.install(ready);
  }, [requested, installer, update, setTab]);
  const { counts: _counts, ...header } = pluginHeader(
    model,
    { facts: compact([facts.lastReport(), facts.version(), facts.agents()]) }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-240 my-0 mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PageHeaderViews,
    {
      header,
      value: tab,
      onValueChange: setTab,
      views: pluginViews([
        {
          id: "overview",
          label: "Overview",
          content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 min-w-0 pt-2", children: [
            installer.supported ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              PluginInstaller,
              {
                installer,
                others,
                workspace,
                onKeyCreated: () => void model.installKeys.refresh(),
                onOpenDeliveries: props.onOpenDeliveries
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              model.inUse.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                PluginInstallationPanel,
                {
                  rows: model.rows,
                  threads,
                  scan: model.scan.scan,
                  scanBusy: model.scan.busy,
                  scanError: model.scan.error,
                  now: model.now,
                  onRefresh: model.refresh,
                  onInstall: install,
                  showKeys: false,
                  scanControls: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PluginTerminalInstallPanel,
                {
                  workspace,
                  another: model.inUse.length > 0,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PluginInstallSection,
                    {
                      props,
                      model,
                      framed: false,
                      intro: Boolean(model.step && model.step.kind !== "install")
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PluginContents, { onOpenTool: openTool }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => setTab("workflow"),
                  children: [
                    "How agents use it ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, "aria-hidden": true })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setTab("tools"), children: [
                "Browse tools ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, "aria-hidden": true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16, "aria-hidden": true, className: "shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-ui-body text-body", children: "Your agent does the work. Blume keeps the shared record. You review the evidence and approve the revision." })
            ] })
          ] })
        },
        {
          id: "installation",
          // The harnesses with their installation keys, and the agents connected through them.
          label: "Connections",
          content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 pt-5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PluginInstallationPanel,
              {
                rows: model.rows,
                threads,
                scan: model.scan.scan,
                scanBusy: model.scan.busy,
                scanError: model.scan.error,
                now: model.now,
                onRefresh: model.refresh,
                onInstall: install,
                onRevokeKey: (id) => void model.installKeys.revoke(id),
                footer: model.installKeys.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "type-ui-body text-danger", children: model.installKeys.error })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PluginAgentList,
              {
                threads,
                keys: model.installKeys.keys,
                latest: model.latest,
                now: model.now,
                onOpenAgent: props.onOpenAgent,
                menu: (thread) => agentActions(thread, {
                  onOpenConversation: props.onOpenAgentConversation,
                  onRevoke: (id) => act("thread_revoke", { threadId: id })
                })
              }
            )
          ] })
        },
        {
          id: "workflow",
          label: "Workflow",
          content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ViewHeader,
              {
                title: "How your agent uses Blume",
                description: "Blume stores coordination state. Your harness does the work. People review evidence and decide whether the result is ready."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { density: "compact", children: PLUGIN_WORKFLOW.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineItem, { marker: index + 1, title: step.title, collapsible: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-2 mx-0 type-ui-body text-body", children: step.trigger }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-2 type-ui-body my-3 mx-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted", children: "Agent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0 text-body", children: step.agentAction }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted", children: "Blume" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0 text-body", children: step.blumeAction }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted", children: "You" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0 text-body", children: step.humanAction })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 my-3 mx-0", children: step.tools.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "xs",
                  onClick: () => openTool(name),
                  children: [
                    name.replace("blume_", ""),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 11 })
                  ]
                },
                name
              )) })
            ] }, step.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailDisclosure, { id: "full-process", title: "Read the full process", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 whitespace-pre-line type-ui-body text-body", children: BLUME_PLUGIN.process }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailDisclosure, { id: "safeguards", title: "Boundaries and safeguards", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "@max-[620px]/control:grid-cols-1 grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-5", children: PLUGIN_CONTRACTS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex shrink-0 text-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h3", size: "sm", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-ui-body text-body", children: item.description })
              ] })
            ] }, item.title)) }) })
          ] })
        },
        {
          id: "tools",
          label: "MCP tools",
          count: listedToolCounts().total,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(McpToolReferencePanel, { focus: toolFocus })
        },
        {
          id: "setup",
          // What the flow gets in each kind of agent; Claude Code and Codex install from the Overview.
          label: "Works with",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(PluginWorksWith, { onOpenOverview: () => setTab("overview") })
        }
      ])
    }
  ) });
}
const VIEW_CONCEPTS = {
  overview: "plugin",
  installation: "agent",
  workflow: "workflow",
  tools: "mcp",
  setup: "setting"
};
function pluginViews(tabs) {
  return tabs.map((tab) => ({
    id: tab.id,
    chip: { concept: VIEW_CONCEPTS[tab.id] ?? "documentation", label: tab.label, count: tab.count },
    content: tab.content
  }));
}
function PluginRoute() {
  const { host, state, pending, act } = useHostedData();
  const { setPage, routeContext, openAgentConversation } = useHostedNavigation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HostedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cp-plugin-page flex h-full min-h-0 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageTakeoverRegion, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cp-plugin-scroll h-full min-h-0 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PluginPage,
    {
      host,
      state,
      pending,
      act,
      threads: state.threads.filter((thread) => !thread.mergedInto),
      onOpenAgentConversation: openAgentConversation,
      onOpenDeliveries: () => setPage("deliveries"),
      onOpenAgent: (threadId) => {
        const thread = state.threads.find((t) => t.id === threadId);
        if (!thread) return;
        setPage("projects");
        routeContext.update((route) => ({
          ...route,
          projectId: resolveProject(state, thread.project).id,
          projectSetup: void 0,
          projectAgent: threadId
        }));
      }
    }
  ) }) }) }) });
}
export {
  PluginRoute
};
//# sourceMappingURL=PluginRoute-BbyfGTBb.js.map

//# debugId=43cc582c-9848-5fbc-b3f3-9fff7c1fe5ec
