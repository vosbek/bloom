
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a5fe3022-4b31-5322-b74b-3591db517f73")}catch(e){}}();
import { fR as createLucideIcon, gP as jsxRuntimeExports, Q as Card, bR as HeadingText, et as StepTimeline, eu as StepTimelineItem, hx as reactExports, j7 as useOptionalSidecarHost, fE as cn, bx as FlowerShareDialog, gu as harnessLabel, bE as FullListItem, bm as FacetValue, bj as EyeOff, ab as CircleSlash, a9 as CircleCheck, ij as stripExt, gi as formatTokens$1, am as CompactItem, aj as CodingToolReference, fF as codingToolOfHarness, ap as ConceptTile, O as CONCEPT_META, aa as CircleDashed, an as ConceptIcon, dq as SOURCES, jw as userFacingErrorMessage, j0 as useOpenAccountPage, eW as Trash2, dK as Settings2, dl as RefreshCw, c4 as InputGroup, c7 as InputGroupInput, c5 as InputGroupAddon, c6 as InputGroupButton, bB as FolderOpen, jp as useSidecarHost, J as Button, cg as LoaderCircle, aL as Dialog, aM as DialogBody, aN as DialogFooter, eX as TriangleAlert, eS as Timeline, eT as TimelineItem, iW as useHostResource, gw as hostSnapshotsEqual, fQ as createIndexedSearchItem, i_ as useIndexedListSearch, iO as useContextualSearchCommand, jj as useProgressivePagination, hY as scrollElementWithinContainer, aw as ContextualSearchBar, aq as ConfigurableList, ce as ListControls, aS as DropdownMenuCheckboxItem, aZ as DropdownMenuSeparator, cY as PaginationBoundary, fI as conceptStyle, b8 as EntityContextMenu, cf as ListTreeGuides, a2 as ChevronRight, eF as TREE_CHEVRON_SIZE, cb as LIST_ROW_DENSITY_CLASSES, b9 as EntityMoreMenu, gM as isSource, as as ConfigurableListIcon, dv as SearchHighlightText, ak as CodingToolTile, eH as TREE_ICON_LEFT, eG as TREE_DEPTH_STEP, eI as TREE_SPINE_LEFT, bP as HarnessTile, es as StatusSummaryBadge, gg as formatHomePath, hC as relativeTime, d9 as ProjectAvatar, ho as projectFlowerSeed, iS as useExpandableSections, cS as PageContent, cV as PageHeaderViews, cE as OVERVIEW_CHIP, bf as ExpandableSection, x as AttentionLine, cR as PageColumnCard, aK as DetailFacts, T as CardHeaderLabel, aJ as DetailFactValue, cO as PackageOpen, dA as SectionListHeading, dz as SectionList, eo as Sparkles, bt as FileText, ae as Cloud, fb as X, be as ExpandableCard, _ as Check, c_ as Pencil, al as ColumnLayout, b6 as EmptyPage, ey as SubPageBackdrop, ez as SubPageLayout, a3 as ChevronRight$1, dx as SectionHeader, az as CountTabs, bO as HarnessMiniBadge, c as AccountDevicesAccordion, gJ as isAccountAuthenticationRequired, eV as TooltipLabel, q as ArrowLeft, by as Folder, I as BookOpen, bo as FileBraces, eL as Terminal, bp as FileCode, ev as SubHeader, ek as SkeletonSurface, ej as Skeleton, hZ as searchQueryIsPresented, dd as ProjectTypeIcon, c2 as InlineSearchMatchContext, M as COMPACT_STATUS_BADGE_SIZE, cz as Minus, du as Search, iJ as useClock, jr as useSubViewState, iF as useAsync, iZ as useInPageChrome, jq as useSubHeader, j9 as usePageBar, cW as PageTakeover, bM as Globe, bc as ErrorState, hI as requestSharePromotion, jk as useRelativeActivityClock, i as AgentConversationCard, bA as FolderListItem, gj as formatWorkspaceName, gf as folderOfWorkspace } from "./index-nrW_ocxo.js";
import { E as ExplanationPageHeader } from "./ExplanationPageHeader-C2XeRG4B.js";
import { f as fnv1a64Hex } from "./hash-DXS7Ca7H.js";
import { a as OperationPreview, O as OperationPill } from "./SuggestionDiff-D6FifeP0.js";
import { F as FileViewer, S as Settings } from "./FileViewer-DHqmfXyV.js";
const ARTIFACT_KINDS = [
  "instruction",
  "knowledge",
  "skill",
  "mcp-server",
  "plugin",
  "sub-agent",
  "command",
  "hook",
  "configuration",
  "workflow",
  "unknown"
];
const SEP = "\0";
function portablePath$1(value) {
  const slashes = value.replace(/\\/g, "/");
  const withoutDot = slashes.replace(/^\.\//, "");
  return withoutDot.replace(/\/{2,}/g, "/").replace(/\/$/, "");
}
function sourceKey(source) {
  switch (source.type) {
    case "file":
    case "directory":
      return [source.type, portablePath$1(source.path)].join(SEP);
    case "config-entry":
      return [source.type, portablePath$1(source.path), source.keyPath].join(SEP);
    case "installed-package":
      return [source.type, source.packageId, source.path ? portablePath$1(source.path) : ""].join(SEP);
    case "external":
      return [source.type, source.uri].join(SEP);
  }
}
function artifactKey(identity) {
  return [
    identity.scope,
    identity.provider ?? "shared",
    identity.projectId ?? "",
    identity.workspaceLocationId ?? "",
    sourceKey(identity.source)
  ].join(SEP);
}
function artifactId(identity) {
  return `unit_${fnv1a64Hex(artifactKey(identity))}`;
}
const SYNC_FOLDER_MARKER = "folder";
function portablePath(value) {
  return value.replace(/\\/g, "/").replace(/^\.\/+/, "").replace(/^~\/+/, "").replace(/^\/+/, "").replace(/\/{2,}/g, "/").replace(/\/+$/, "");
}
function commonValue(artifacts, key) {
  const value = artifacts[0]?.[key];
  return artifacts.every((artifact) => artifact[key] === value) ? value : void 0;
}
function artifactSyncFolderRuntimePath(folderPath, artifacts) {
  const folder = portablePath(folderPath);
  for (const artifact of artifacts) {
    if (artifact.source.type === "external" || !artifact.source.runtimePath) continue;
    const source = artifact.source.path ? portablePath(artifact.source.path) : "";
    if (source !== folder && !source.startsWith(`${folder}/`)) continue;
    const relativeSegments = source === folder ? [] : source.slice(folder.length + 1).split("/");
    let runtime = artifact.source.runtimePath.replace(/[\\/]+$/, "");
    for (const _segment of relativeSegments) {
      const parent = runtime.replace(/[\\/][^\\/]+$/, "");
      if (parent === runtime) return null;
      runtime = parent;
    }
    return runtime;
  }
  return null;
}
function artifactSyncFolderTarget(folderPath, artifacts) {
  const normalizedPath = portablePath(folderPath);
  const runtimePath = artifactSyncFolderRuntimePath(normalizedPath, artifacts);
  const representative = artifacts[0];
  if (!normalizedPath || !runtimePath || !representative) return null;
  const provider = commonValue(artifacts, "provider");
  const projectId = commonValue(artifacts, "projectId");
  const workspaceLocationId = commonValue(artifacts, "workspaceLocationId");
  const identity = {
    scope: representative.scope,
    ...provider ? { provider } : {},
    ...projectId ? { projectId } : {},
    ...workspaceLocationId ? { workspaceLocationId } : {},
    source: { type: "directory", path: normalizedPath, runtimePath }
  };
  return {
    ...identity,
    id: artifactId(identity),
    name: normalizedPath.split("/").at(-1) ?? normalizedPath,
    kind: "unknown",
    influence: "unknown",
    composition: "composite",
    metadata: { syncTarget: SYNC_FOLDER_MARKER },
    parserVersion: "artifact-sync-folder-v1",
    scannerVersion: "artifact-sync-folder-v1"
  };
}
function isArtifactSyncFolder(artifact) {
  return artifact.metadata?.syncTarget === SYNC_FOLDER_MARKER;
}
const __iconNode$6 = [
  ["path", { d: "M8 3 4 7l4 4", key: "9rb6wj" }],
  ["path", { d: "M4 7h16", key: "6tx8e3" }],
  ["path", { d: "m16 21 4-4-4-4", key: "siv7j2" }],
  ["path", { d: "M20 17H4", key: "h6l3hr" }]
];
const ArrowLeftRight = createLucideIcon("arrow-left-right", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
];
const Boxes = createLucideIcon("boxes", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
  ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }]
];
const CircleOff = createLucideIcon("circle-off", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Earth = createLucideIcon("earth", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
      key: "1dkoa9"
    }
  ],
  ["path", { d: "M12 10v4h4", key: "1czhmt" }],
  ["path", { d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5", key: "lvuxfi" }],
  ["path", { d: "M22 22v-4h-4", key: "1ewp4q" }],
  ["path", { d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5", key: "14ync0" }]
];
const FolderSync = createLucideIcon("folder-sync", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function ChangeCard({
  title,
  headerTrailing,
  children,
  actions,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `w-full min-w-0 max-w-full shrink-0 overflow-hidden !gap-0 !p-0 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2.5 border-b border-[var(--border-subtle)] px-3.5 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "p", size: "sm", className: "min-w-0 flex-1 truncate text-[var(--text-strong)]", children: title }),
      headerTrailing
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col gap-2.5 px-3.5 py-3", children }),
    actions ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 items-center gap-2 border-t border-[var(--border-subtle)] px-3.5 py-2.5", children: actions }) : null
  ] });
}
function ChangeDetailsHeader({
  icon,
  title,
  subtitle,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `flex shrink-0 items-start gap-2.5 border-b border-[var(--border-subtle)] pb-3 ${className}`,
      children: [
        icon,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-[14.5px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--text-strong)] [font-family:var(--font-heading)]", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[3px] text-[10px] text-[var(--text-muted)]", children: subtitle })
        ] })
      ]
    }
  );
}
function ChangeDetailsBody({
  header,
  steps,
  after,
  bottomInset = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-3.5 py-3.5",
      style: bottomInset > 0 ? { paddingBottom: bottomInset } : void 0,
      children: [
        header,
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTimeline, { className: "shrink-0", children: steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepTimelineItem, { marker: step.dot, tone: step.tone, title: step.title, children: step.content }, step.key)) }),
        after
      ]
    }
  );
}
function ChangeDetailsFooter({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "flex shrink-0 gap-[7px] border-t border-[var(--border-card)] bg-[var(--bg-card)] px-3.5 py-[11px]", children });
}
const SetupSurfaceContext = reactExports.createContext(null);
function SetupSurfaceProvider(props) {
  return reactExports.createElement(SetupSurfaceContext.Provider, { value: props.host }, props.children);
}
function useSetupSurfaceHost() {
  const surface = reactExports.useContext(SetupSurfaceContext);
  const host = useOptionalSidecarHost();
  const resolved = surface ?? host;
  if (!resolved) {
    throw new Error("useSetupSurfaceHost must be used within a <SetupSurfaceProvider> or <SidecarHostProvider>");
  }
  return resolved;
}
function SharePageFooter({ onOpenSharePage, className }) {
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-share-promotion-variant": "page_footer",
        "aria-label": "Enjoying Blume? Share it with a friend!",
        onClick: () => setDialogOpen(true),
        className: cn(
          "mt-[100px] flex w-full min-w-0 items-center rounded-[9px] px-3 py-2.5 text-left transition-[background-color,box-shadow,transform] hover:bg-[var(--bg-card-soft)] hover:shadow-[0_2px_8px_rgba(31,26,13,0.04)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40",
          className
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 text-[10px] leading-[1.45] text-[var(--text-muted)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[var(--text-body)]", children: "Enjoying Blume?" }),
          " Share it with a friend."
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FlowerShareDialog,
      {
        open: dialogOpen,
        onClose: () => setDialogOpen(false),
        onOpenSharePage
      }
    )
  ] });
}
const ARTIFACT_KIND_LABELS = {
  instruction: "Instruction",
  knowledge: "Knowledge",
  skill: "Skill",
  "mcp-server": "MCP server",
  plugin: "Plugin",
  "sub-agent": "Sub-agent",
  command: "Command",
  hook: "Hook",
  configuration: "Configuration",
  workflow: "Workflow",
  unknown: "Other"
};
function isArtifactKind(value) {
  return Object.hasOwn(ARTIFACT_KIND_LABELS, value);
}
const ARTIFACT_KIND_CONCEPTS = {
  instruction: "agent-instruction",
  knowledge: "documentation",
  skill: "skill",
  "mcp-server": "mcp",
  plugin: "plugin",
  "sub-agent": "sub-agent",
  command: "command",
  hook: "hook",
  configuration: "setting",
  workflow: "workflow",
  unknown: "artifact"
};
function artifactSourceLabel(artifact) {
  const source = artifact.source;
  if (source.type === "external") return source.uri;
  if (source.type === "installed-package") return source.packageId;
  if (source.type === "config-entry") return `${source.path} › ${source.keyPath}`;
  return source.path;
}
function artifactProviderLabel(artifact) {
  return artifact.provider ? harnessLabel(artifact.provider) : "Shared";
}
function artifactMetadataEntries(artifact) {
  return Object.entries(artifact.metadata ?? {}).flatMap(
    ([key, value]) => {
      if (value === void 0 || value === null) return [];
      if (Array.isArray(value)) {
        const items = value.filter(
          (item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean"
        ).map(String);
        if (items.length === 0) return [];
        return [{ key, value: items.join(", "), items }];
      }
      if (typeof value === "object") return [];
      return [{ key, value: String(value) }];
    }
  );
}
function artifactKindNoun(kind, count) {
  const noun = kind === "mcp-server" ? "MCP server" : ARTIFACT_KIND_LABELS[kind].toLocaleLowerCase();
  return count === 1 ? noun : `${noun}s`;
}
function artifactOf(artifact, facts = {}) {
  return {
    id: artifact.id,
    name: artifact.name,
    kind: artifact.kind,
    ...artifact.provider ? { provider: artifact.provider } : {},
    source: artifactSourceLabel(artifact),
    effect: artifact.enabled === false ? "disabled" : artifact.effective === false ? "shadowed" : "active",
    metadata: artifactMetadataEntries(artifact),
    ...facts
  };
}
function artifactKindOfCategory(category) {
  const name = category.toLowerCase();
  if (name.includes("skill")) return "skill";
  if (name.includes("hook")) return "hook";
  if (name.includes("command")) return "command";
  if (name.includes("mcp")) return "mcp-server";
  if (name.includes("plugin")) return "plugin";
  if (name.includes("agent") && !name.includes(".md")) return "sub-agent";
  if (name.includes("setting") || name.includes("config")) return "configuration";
  if (name.includes("doc") || name.includes("knowledge")) return "knowledge";
  if (name.includes("rule") || name.includes("instruction") || name.includes("memor"))
    return "instruction";
  return "unknown";
}
function artifactOfEntry(entry, category) {
  const files = entry.files?.length ?? 0;
  return {
    id: entry.contentPath ?? `${category}:${entry.name}`,
    name: stripExt(entry.name),
    kind: artifactKindOfCategory(category),
    ...entry.harnessId ? { provider: entry.harnessId } : {},
    ...entry.contentPath ? { source: entry.contentPath } : {},
    ...files > 1 ? { detail: `${files} files` } : {},
    ...entry.tokens !== void 0 ? { tokens: entry.tokens } : {},
    effect: "active",
    metadata: []
  };
}
const ARTIFACT_KIND_RECIPES = Object.fromEntries(
  ARTIFACT_KINDS.map((kind) => {
    const meta = CONCEPT_META[ARTIFACT_KIND_CONCEPTS[kind]];
    return [kind, { label: ARTIFACT_KIND_LABELS[kind], icon: meta.Icon, color: meta.accent }];
  })
);
function ArtifactKindFacet({
  kind,
  form = "glyph",
  size
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FacetValue, { recipe: ARTIFACT_KIND_RECIPES[kind], form, size });
}
const ARTIFACT_SYNC_STATES = {
  synced: { label: "Synced", icon: ArrowLeftRight, color: "var(--sync)" },
  "in-synced-folder": {
    label: "In a synced folder",
    icon: ArrowLeftRight,
    color: "color-mix(in srgb, var(--sync) 55%, var(--text-muted))"
  },
  "not-synced": { label: "Not synced", icon: CircleDashed, color: "var(--text-muted)" }
};
function ArtifactSyncFacet({
  sync,
  form = "glyph",
  size,
  folder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FacetValue,
    {
      recipe: ARTIFACT_SYNC_STATES[sync],
      form,
      size,
      name: sync === "in-synced-folder" && folder ? `Part of the synced “${folder}” folder` : void 0
    }
  );
}
const ARTIFACT_EFFECTS = {
  active: { label: "In effect", icon: CircleCheck, color: "var(--text-muted)" },
  disabled: { label: "Disabled", icon: CircleSlash, color: "var(--text-muted)" },
  shadowed: { label: "Shadowed", icon: EyeOff, color: "var(--badge-color-warning)" }
};
function ArtifactEffectFacet({
  effect,
  form = "badge",
  size = "xs"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FacetValue, { recipe: ARTIFACT_EFFECTS[effect], form, size });
}
function KindTile({ model, size }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptTile, { concept: ARTIFACT_KIND_CONCEPTS[model.kind], size, tone: "tinted" });
}
const KindGlyph = ({ model, size = 12 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: ARTIFACT_KIND_CONCEPTS[model.kind], surface: "bare", size });
function Standing({ model, form }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    model.effect !== "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactEffectFacet, { effect: model.effect }),
    model.sync && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArtifactSyncFacet,
      {
        sync: model.sync,
        form,
        size: form === "badge" ? "xs" : void 0,
        folder: model.syncFolder
      }
    )
  ] });
}
function Meta({ model, source = false }) {
  const parts = [
    model.provider ? /* @__PURE__ */ jsxRuntimeExports.jsx(CodingToolReference, { tool: codingToolOfHarness(model.provider) }, "provider") : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shared" }, "provider"),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ARTIFACT_KIND_LABELS[model.kind] }, "kind"),
    model.detail && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: model.detail }, "detail"),
    model.tokens !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
      formatTokens$1(model.tokens),
      " tokens"
    ] }, "tokens"),
    source && model.source && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", title: model.source, children: model.source }, "source")
  ].filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts.map((part, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [
    index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
    part
  ] }, index)) });
}
const artifactName = (model) => `${ARTIFACT_KIND_LABELS[model.kind]} ${model.name}${model.sync ? `, ${ARTIFACT_SYNC_STATES[model.sync].label.toLowerCase()}` : ""}`;
function ArtifactCompactItem({
  model,
  onSelect
}) {
  const quiet = [model.detail, model.tokens !== void 0 && `${formatTokens$1(model.tokens)} tok`].filter(Boolean).join(" · ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CompactItem,
    {
      mark: /* @__PURE__ */ jsxRuntimeExports.jsx(KindGlyph, { model }),
      trailing: (quiet || model.effect !== "active") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        model.effect !== "active" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactEffectFacet, { effect: model.effect }),
        quiet && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: quiet })
      ] }),
      state: model.sync && /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactSyncFacet, { sync: model.sync, folder: model.syncFolder }),
      onSelect,
      title: onSelect ? `Open ${model.name}` : artifactName(model),
      children: model.name
    }
  );
}
function ArtifactListItem({
  model,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FullListItem,
    {
      variant: "two-line",
      media: /* @__PURE__ */ jsxRuntimeExports.jsx(KindTile, { model, size: 28 }),
      title: model.name,
      meta: /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, { model, source: true }),
      topRight: /* @__PURE__ */ jsxRuntimeExports.jsx(Standing, { model, form: "glyph" }),
      onSelect,
      selectLabel: `Open ${model.name}`
    }
  );
}
const COLLAPSED_HARNESS_ENTRY_COUNT = 5;
function countCategoryEntries(categories) {
  return categories.reduce((total, category) => total + category.entries.length, 0);
}
function countCategoryTokens(categories) {
  return categories.reduce(
    (total, category) => total + category.entries.reduce((categoryTotal, entry) => categoryTotal + (entry.tokens ?? 0), 0),
    0
  );
}
function countHarnessEntries(harnesses) {
  return harnesses.reduce((total, harness) => total + countCategoryEntries(harness.categories), 0);
}
function harnessesWithEntries(harnesses) {
  return harnesses.filter((harness) => countCategoryEntries(harness.categories) > 0);
}
function takeCategoryEntries(categories, limit) {
  let remaining = Math.max(0, limit);
  return categories.flatMap((category) => {
    if (remaining === 0) return [];
    const entries = category.entries.slice(0, remaining);
    remaining -= entries.length;
    return entries.length > 0 ? [{ ...category, entries }] : [];
  });
}
function setupEntryIdentity(entry) {
  return entry.contentPath ?? entry.files?.map((file) => file.absPath).join("\n") ?? entry.name;
}
function removeHarnessDuplicates(categories, harnesses) {
  const harnessEntries = new Set(
    harnesses.flatMap(
      (harness) => harness.categories.flatMap((category) => category.entries.map(setupEntryIdentity))
    )
  );
  return categories.flatMap((category) => {
    const entries = category.entries.filter(
      (entry) => !harnessEntries.has(setupEntryIdentity(entry))
    );
    return entries.length > 0 ? [{ ...category, entries }] : [];
  });
}
function CategorySection({
  name,
  entries,
  onOpenEntry,
  entryNote
}) {
  const sectionTokens = entries.reduce((n, e) => n + (e.tokens ?? 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.06em] text-[var(--text-muted)] px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: entries.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1" }),
      sectionTokens > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums normal-case tracking-normal", children: [
        formatTokens$1(sectionTokens),
        " tok"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-2 py-1", children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EntryRow,
      {
        entry: e,
        category: name,
        note: entryNote?.(e),
        onOpenEntry
      },
      `${setupEntryIdentity(e)}:${e.harnessId ?? ""}`
    )) })
  ] });
}
function EntryRow({
  entry,
  category,
  note,
  onOpenEntry
}) {
  const fileCount = entry.files?.length ?? 0;
  const isFolder = entry.files !== void 0;
  const canOpen = isFolder ? fileCount > 0 : !!entry.contentPath;
  const model = reactExports.useMemo(() => {
    const base = artifactOfEntry(entry, category);
    const detail = [base.detail, note].filter(Boolean).join(" · ");
    return detail ? { ...base, detail } : base;
  }, [entry, category, note]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactCompactItem, { model, onSelect: canOpen ? () => onOpenEntry(entry) : void 0 });
}
const PROJECT_ARTIFACT_KIND_PRIORITY = [
  "instruction",
  "hook",
  "skill"
];
const PROVIDER_ORDER = new Map(SOURCES.map((source, index) => [source, index]));
const KIND_ORDER = new Map(ARTIFACT_KINDS.map((kind, index) => [kind, index]));
function providerRank(artifact) {
  if (!artifact.provider) return -1;
  return PROVIDER_ORDER.get(artifact.provider) ?? SOURCES.length;
}
function compareArtifacts(left, right, kindPriority = []) {
  const fallbackPriority = kindPriority.length;
  const leftPriority = kindPriority.indexOf(left.kind);
  const rightPriority = kindPriority.indexOf(right.kind);
  return (leftPriority < 0 ? fallbackPriority : leftPriority) - (rightPriority < 0 ? fallbackPriority : rightPriority) || providerRank(left) - providerRank(right) || (left.provider ?? "").localeCompare(right.provider ?? "") || (KIND_ORDER.get(left.kind) ?? ARTIFACT_KINDS.length) - (KIND_ORDER.get(right.kind) ?? ARTIFACT_KINDS.length) || left.name.localeCompare(right.name);
}
function artifactRootUnits(artifacts, relationships) {
  const childIds = new Set(
    relationships.filter(
      (relationship) => relationship.kind === "contains" || relationship.kind === "provides"
    ).map((relationship) => relationship.toUnitId)
  );
  return artifacts.filter((artifact) => !childIds.has(artifact.id));
}
function artifactTreeLeafName(artifact) {
  if (artifact.source.type === "external" || artifact.source.type === "config-entry") {
    return artifact.name;
  }
  const sourcePath = artifact.source.path;
  if (!sourcePath) return artifact.name;
  const name = sourcePath.replace(/\\/g, "/").replace(/\/+$/, "").split("/").filter(Boolean).at(-1);
  return name || artifact.name;
}
function artifactContainerSegments(artifact) {
  const source = artifact.source;
  if (source.type === "external") return [];
  const sourcePath = source.path;
  if (!sourcePath) return [];
  const normalized = sourcePath.replace(/\\/g, "/").replace(/^\.\/+/, "").replace(/^~\/+/, "").replace(/^\/+/, "").replace(/\/+$/, "");
  if (!normalized || normalized === ".") return [];
  const segments = normalized.split("/").filter(Boolean);
  segments.pop();
  return segments;
}
function artifactFolderPaths(artifact) {
  const result = [];
  let path = "";
  for (const segment of artifactContainerSegments(artifact)) {
    path = path ? `${path}/${segment}` : segment;
    result.push(path);
  }
  return result;
}
function representativeArtifact(item) {
  if (item.type === "artifact") return item.artifact;
  const firstArtifact = item.items[0];
  if (!firstArtifact) {
    throw new Error(`Artifact folder "${item.path}" must contain at least one artifact`);
  }
  return representativeArtifact(firstArtifact);
}
function finalizeFolder(folder, kindPriority) {
  const items = [
    ...Array.from(folder.folders.values(), (child) => finalizeFolder(child, kindPriority)),
    ...folder.artifacts.map((artifact) => ({ type: "artifact", artifact }))
  ];
  items.sort((left, right) => {
    if (left.type !== right.type) return left.type === "artifact" ? -1 : 1;
    const artifactOrder = compareArtifacts(
      representativeArtifact(left),
      representativeArtifact(right),
      kindPriority
    );
    if (artifactOrder !== 0) return artifactOrder;
    const leftName = left.type === "folder" ? left.name : left.artifact.name;
    const rightName = right.type === "folder" ? right.name : right.artifact.name;
    return leftName.localeCompare(rightName);
  });
  const artifacts = [];
  for (const item of items) {
    if (item.type === "folder") {
      artifacts.push(...item.artifacts);
    } else {
      artifacts.push(item.artifact);
    }
  }
  const artifactIds = new Set(artifacts.map((artifact) => artifact.id));
  return {
    type: "folder",
    name: folder.name,
    path: folder.path,
    artifactCount: artifactIds.size,
    artifacts,
    artifactIds,
    items
  };
}
function buildArtifactTree(artifacts, kindPriority = []) {
  const root = {
    name: "",
    path: "",
    folders: /* @__PURE__ */ new Map(),
    artifacts: []
  };
  for (const artifact of artifacts) {
    let current = root;
    for (const path of artifactFolderPaths(artifact)) {
      const name = path.split("/").at(-1) ?? path;
      let folder = current.folders.get(name);
      if (!folder) {
        folder = { name, path, folders: /* @__PURE__ */ new Map(), artifacts: [] };
        current.folders.set(name, folder);
      }
      current = folder;
    }
    current.artifacts.push(artifact);
  }
  return finalizeFolder(root, kindPriority).items;
}
function folderAutoExpansionPaths(folder) {
  const paths = [];
  let current = folder;
  while (true) {
    paths.push(current.path);
    const childFolders = current.items.filter(
      (item) => item.type === "folder"
    );
    const hasDirectArtifact = current.items.some((item) => item.type === "artifact");
    if (hasDirectArtifact || childFolders.length !== 1) return paths;
    current = childFolders[0];
  }
}
function flattenArtifactTree(items, expandedPaths, depth = 0, ancestorBranchHasNext = []) {
  const rows = [];
  items.forEach((item, index) => {
    const branchHasNext = depth === 0 ? [] : [...ancestorBranchHasNext, index < items.length - 1];
    rows.push({ item, depth, branchHasNext });
    if (item.type === "folder" && expandedPaths.has(item.path)) {
      rows.push(...flattenArtifactTree(item.items, expandedPaths, depth + 1, branchHasNext));
    }
  });
  return rows;
}
function countArtifactsInTreeItems(items) {
  return items.reduce((count, item) => count + (item.type === "folder" ? item.artifactCount : 1), 0);
}
function findArtifactRootIndex(items, artifactId2) {
  return items.findIndex(
    (item) => item.type === "folder" ? item.artifactIds.has(artifactId2) : item.artifact.id === artifactId2
  );
}
const ARTIFACT_SYNC_SIGN_IN_MESSAGE = "Sign in to Blume to sync artifacts between systems.";
function artifactSyncRequiresSignIn(cause) {
  return cause instanceof Error && /sign in required/i.test(cause.message);
}
function artifactSyncErrorMessage(cause, fallback) {
  if (artifactSyncRequiresSignIn(cause)) return ARTIFACT_SYNC_SIGN_IN_MESSAGE;
  const raw = cause instanceof Error ? cause.message : "";
  if (/fetch failed|network|enotfound|could not resolve/i.test(raw)) {
    return "The artifact sync service is unavailable. Try again later.";
  }
  const message = userFacingErrorMessage(cause, fallback);
  return message;
}
function canDeleteArtifact(artifact) {
  return artifact.source.type !== "external" && Boolean(artifact.source.runtimePath);
}
function deletionDescription(artifact) {
  if (artifact.source.type === "config-entry") {
    return `This removes “${artifact.name}” from its configuration file.`;
  }
  if (artifact.source.type === "directory" || artifact.source.type === "installed-package") {
    return `This permanently removes “${artifact.name}” and its contents from disk.`;
  }
  return `This permanently removes “${artifact.name}” from disk.`;
}
function syncFailure(title, fallback, onSignIn) {
  return {
    title,
    message: (cause) => artifactSyncErrorMessage(cause, fallback),
    recover: (cause) => onSignIn && artifactSyncRequiresSignIn(cause) ? { label: "Sign in", onSelect: onSignIn } : void 0
  };
}
function syncSubmenu(sync, { label, failure, settings }) {
  const { synced, disabledReason, onSetSynced } = sync;
  const blocked = synced ? void 0 : disabledReason;
  const toggle = {
    label,
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, {}),
    checked: synced,
    disabled: !onSetSynced || Boolean(blocked),
    detail: blocked,
    failure,
    onSelect: () => onSetSynced?.(!synced)
  };
  return {
    label: "Sync",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, {}),
    entries: [toggle, synced && settings && { label: "Sync settings…", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, {}), onSelect: settings }]
  };
}
function artifactActions(artifact, { sync, onDelete, onSignIn }) {
  const deletable = canDeleteArtifact(artifact);
  const state = sync?.states?.[0];
  return [
    sync && syncSubmenu(sync, {
      label: "Sync between systems",
      failure: syncFailure("Couldn’t sync artifact", "Artifact sync failed.", onSignIn),
      settings: state && sync.onOpenSettings ? () => sync.onOpenSettings?.({ states: [{ ...state, artifact: state.artifact ?? artifact }] }) : void 0
    }),
    { separator: true },
    onDelete && {
      label: deletable ? "Delete artifact" : "Delete unavailable",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}),
      variant: "destructive",
      disabled: !deletable,
      confirm: {
        title: "Delete artifact?",
        body: `${deletionDescription(artifact)} This can’t be undone.`,
        confirmLabel: "Delete",
        busyLabel: "Deleting…"
      },
      failure: { title: "Couldn’t delete artifact", message: (cause) => cause instanceof Error ? cause.message : "Artifact deletion failed." },
      onSelect: () => onDelete(artifact)
    }
  ];
}
function artifactFolderActions(folder, { sync, onSignIn }) {
  const states = sync?.states ?? [];
  return [
    sync && syncSubmenu(sync, {
      label: "Sync folder between systems",
      failure: syncFailure("Couldn’t sync folder", "Folder sync failed.", onSignIn),
      settings: states.length && sync.onOpenSettings ? () => sync.onOpenSettings?.({
        states: states.map((state) => ({
          ...state,
          artifact: state.artifact ?? folder.artifacts.find((artifact) => artifact.id === state.artifactId)
        })),
        folderName: folder.name,
        folderPath: folder.path
      }) : void 0
    })
  ];
}
function useArtifactActions() {
  const openAccountPage = useOpenAccountPage();
  const onSignIn = () => openAccountPage();
  return {
    artifact: (artifact, handlers) => artifactActions(artifact, { onSignIn, ...handlers }),
    folder: (folder, handlers) => artifactFolderActions(folder, { onSignIn, ...handlers })
  };
}
function ChangeOperationList({
  items
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2 text-[11px]", children: [
    item.leading,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-[var(--text-body)]", children: item.summary }),
    item.trailing
  ] }, item.key)) });
}
function artifactSourcePath(artifact) {
  return artifact.source.type === "external" ? "" : artifact.source.path ?? artifact.name;
}
function artifactSyncDisplayPath(path, item) {
  return item.kind === "file" && path === "artifact" ? item.name : path;
}
function pathSeparator(path) {
  return path.includes("\\") ? "\\" : "/";
}
function joinArtifactPath(root, relative) {
  const separator = pathSeparator(root);
  return `${root.replace(/[\\/]+$/, "")}${separator}${relative.replace(/^[\\/]+/, "").replace(/[\\/]+/g, separator)}`;
}
function defaultArtifactDestination(artifact, homeDir) {
  const portable = artifactSourcePath(artifact).replace(/^~?[\\/]+/, "");
  return homeDir ? joinArtifactPath(homeDir, portable) : portable;
}
function relativeToFolder(artifact, folderPath) {
  const portable = artifactSourcePath(artifact).replace(/\\/g, "/").replace(/^\.?\//, "");
  const normalizedFolder = folderPath.replace(/\\/g, "/").replace(/^\.?\//, "").replace(/\/$/, "");
  return portable.startsWith(`${normalizedFolder}/`) ? portable.slice(normalizedFolder.length + 1) : portable.split("/").at(-1) || artifact.name;
}
function artifactSyncPlacementTargets(artifacts, destination, folderPath) {
  const target = destination.trim();
  if (!target) return [];
  const multiple = artifacts.length > 1;
  return artifacts.map((artifact) => ({
    artifact,
    runtimePath: multiple && folderPath ? joinArtifactPath(target, relativeToFolder(artifact, folderPath)) : target
  }));
}
function ArtifactSyncLocationInput({
  id,
  artifacts,
  folderPath,
  destination,
  disabled,
  onDestinationChange
}) {
  const host = useSetupSurfaceHost();
  const first = artifacts[0];
  const folder = artifacts.length > 1 || Boolean(folderPath) || first?.source.type === "directory";
  const label = folder ? "Folder location on this system" : "File location on this system";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, className: "sr-only", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "h-9 bg-[var(--bg-subtle)]/60 shadow-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputGroupInput,
        {
          id,
          value: destination,
          onChange: (event) => onDestinationChange(event.target.value),
          disabled,
          spellCheck: false,
          autoCapitalize: "none"
        }
      ),
      host.system.selectFolder ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputGroupButton,
        {
          disabled,
          title: "Choose folder",
          "aria-label": "Choose folder",
          onClick: () => {
            void host.system.selectFolder?.().then((path) => {
              if (!path || !first) return;
              onDestinationChange(
                folder ? path : joinArtifactPath(
                  path,
                  artifactSourcePath(first).split(/[\\/]/).at(-1) || first.name
                )
              );
            });
          },
          className: "size-7 px-0 text-[var(--text-body)]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 14, strokeWidth: 2, "aria-hidden": true })
        }
      ) }) : null
    ] })
  ] });
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
const ARTIFACT_SYNC_CHANGE_PRESENTATION = {
  add: { dot: "+", title: "Add file", tone: "var(--success)", rail: "success" },
  update: { dot: "~", title: "Update file", tone: "var(--info)", rail: "info" },
  remove: { dot: "−", title: "Remove file", tone: "var(--danger)", rail: "danger" },
  conflict: { dot: "!", title: "Keep both versions", tone: "var(--warn)", rail: "warning" },
  unchanged: { dot: "·", title: "Keep file", tone: "var(--text-muted)", rail: "neutral" }
};
function suggestionAction(action) {
  if (action === "add") return "create";
  if (action === "remove") return "remove";
  return "update";
}
function unavailablePreviewMessage(change) {
  if (change.previewUnavailable === "too-large") {
    return "This file is too large to show here. Its full contents are still included.";
  }
  if (change.previewUnavailable === "binary") {
    return "This binary file cannot be shown as a text diff. Its full contents are still included.";
  }
  if (change.action === "unchanged") return "The local and synced contents already match.";
  return "A text diff is not available for this file.";
}
function artifactSyncSuggestionOperation(change, displayPath = change.path) {
  return {
    action: suggestionAction(change.action),
    artifactType: "doc",
    artifactScope: "global",
    harnessApplicability: "shared",
    targetPath: displayPath,
    pathDisplay: displayPath,
    summary: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].title,
    patchPreview: change.patch ?? ""
  };
}
function ArtifactSyncSummary({ preview }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[7px] rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/45 px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold text-[var(--text-strong)]", children: [
        preview.fileCount,
        " ",
        preview.fileCount === 1 ? "file" : "files",
        " ·",
        " ",
        formatBytes(preview.totalBytes)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[9.5px] text-[var(--text-muted)]", children: [
        preview.addCount,
        " added · ",
        preview.updateCount,
        " updated · ",
        preview.removeCount,
        " removed",
        preview.conflictCount ? ` · ${preview.conflictCount} conflicts preserved` : ""
      ] })
    ] }),
    preview.items.some((item) => item.omittedChanges > 0) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[9px] text-[var(--text-muted)]", children: "Additional paths are included but not shown." }) : null,
    preview.conflictCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex gap-1.5 text-[9.5px] leading-[1.4] text-[var(--warn)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12, className: "mt-px shrink-0", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Local versions are kept as ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: ".blume-local-conflict" }),
        " ",
        "copies instead of being overwritten."
      ] })
    ] }) : null
  ] });
}
function ArtifactSyncChange({
  change,
  displayPath = change.path
}) {
  const presentation = ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[7px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    OperationPreview,
    {
      op: artifactSyncSuggestionOperation(change, displayPath),
      pillLabel: "File",
      pillTooltip: presentation.title,
      pillColor: presentation.tone,
      scopeLabel: "This system",
      previewFallback: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 px-2 py-2 text-[10px] leading-[1.45] text-[var(--text-muted)]", children: unavailablePreviewMessage(change) })
    }
  ) });
}
function artifactSyncDetailsSteps(preview) {
  return [
    {
      key: "summary",
      dot: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSync, { size: 12, strokeWidth: 2, "aria-hidden": true }),
      title: "What sync will change",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactSyncSummary, { preview })
    },
    ...preview.items.flatMap(
      (item) => item.changes.map((change, index) => {
        const displayPath = artifactSyncDisplayPath(change.path, item);
        return {
          key: `${item.artifactId}:${change.action}:${change.path}:${index}`,
          dot: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].dot,
          tone: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].tone,
          title: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].title,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactSyncChange, { change, displayPath })
        };
      })
    )
  ];
}
function combineArtifactSyncPreviews(previews) {
  const items = previews.flatMap((preview) => preview.items);
  return {
    type: previews[0]?.type ?? "place",
    items,
    fileCount: previews.reduce((total, preview) => total + preview.fileCount, 0),
    totalBytes: previews.reduce((total, preview) => total + preview.totalBytes, 0),
    addCount: previews.reduce((total, preview) => total + preview.addCount, 0),
    updateCount: previews.reduce((total, preview) => total + preview.updateCount, 0),
    removeCount: previews.reduce((total, preview) => total + preview.removeCount, 0),
    conflictCount: previews.reduce((total, preview) => total + preview.conflictCount, 0)
  };
}
function ArtifactSyncImpact({ preview }) {
  const changes = preview.items.flatMap(
    (item) => item.changes.map((change) => ({
      change,
      displayPath: artifactSyncDisplayPath(change.path, item)
    }))
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactSyncSummary, { preview }),
    changes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Timeline,
      {
        density: "compact",
        "aria-label": "Changes",
        className: "mt-4 max-h-52 overflow-y-auto overflow-x-hidden pr-1",
        children: changes.map(({ change, displayPath }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TimelineItem,
          {
            marker: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].dot,
            tone: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].rail,
            title: ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action].title,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactSyncChange, { change, displayPath })
          },
          `${change.action}:${change.path}`
        ))
      }
    ) : null
  ] });
}
function ArtifactSyncPreviewPage({
  preview: initialPreview,
  placements: initialPlacements,
  destination: initialDestination,
  states,
  folderPath,
  missing,
  onDone,
  onChanged
}) {
  const host = useSidecarHost();
  const artifacts = reactExports.useMemo(
    () => states.map((state) => state.artifact).filter((item) => Boolean(item)),
    [states]
  );
  const [destination, setDestination] = reactExports.useState(initialDestination);
  const [destinationPreview, setDestinationPreview] = reactExports.useState(null);
  const [destinationPreviewLoading, setDestinationPreviewLoading] = reactExports.useState(false);
  const placementTargets = reactExports.useMemo(
    () => artifactSyncPlacementTargets(artifacts, destination, folderPath),
    [artifacts, destination, folderPath]
  );
  const placements = reactExports.useMemo(
    () => destination === initialDestination ? initialPlacements : placementTargets.map(({ artifact, runtimePath }) => ({
      artifactId: artifact.id,
      runtimePath
    })),
    [destination, initialDestination, initialPlacements, placementTargets]
  );
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const preview = destination === initialDestination ? initialPreview : destinationPreview;
  const previewLoading = destination !== initialDestination && placementTargets.length > 0 && destinationPreviewLoading;
  reactExports.useEffect(() => {
    if (destination === initialDestination) return;
    setDestinationPreview(null);
    if (placementTargets.length === 0) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setDestinationPreviewLoading(true);
      setError(null);
      void Promise.all(
        placementTargets.map(
          ({ artifact, runtimePath }) => host.setup.previewSync(
            { type: "place", placement: { artifactId: artifact.id, runtimePath } },
            { signal: controller.signal }
          )
        )
      ).then((previews) => setDestinationPreview(combineArtifactSyncPreviews(previews))).catch((cause) => {
        if (controller.signal.aborted) return;
        setError(artifactSyncErrorMessage(cause, "Could not preview changes at this location."));
      }).finally(() => {
        if (!controller.signal.aborted) setDestinationPreviewLoading(false);
      });
    }, 350);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [destination, host.setup, initialDestination, placementTargets]);
  const apply = async () => {
    if (!preview || placements.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      for (const placement of placements) await host.setup.placeSynced(placement);
      await host.setup.refresh().catch(() => {
      });
      onChanged();
      onDone();
    } catch (cause) {
      await host.setup.refresh().catch(() => {
      });
      onChanged();
      setError(artifactSyncErrorMessage(cause, "Could not apply these sync changes."));
    } finally {
      setSaving(false);
    }
  };
  const skip = async () => {
    if (artifacts.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      await host.setup.setSynced({ artifacts, enabled: false });
      onChanged();
      onDone();
    } catch (cause) {
      setError(artifactSyncErrorMessage(cause, "Could not skip this synced item."));
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangeDetailsBody,
      {
        header: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChangeDetailsHeader,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-[30px] shrink-0 items-center justify-center rounded-[9px] border border-[var(--sync-border)] bg-[var(--sync-soft)] text-[var(--sync)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSync, { size: 15, strokeWidth: 2.1, "aria-hidden": true }) }),
            title: "Changes on this system",
            subtitle: "Review every file operation before applying it.",
            className: "mb-[15px]"
          }
        ),
        steps: [
          {
            key: "location",
            dot: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 12, strokeWidth: 2, "aria-hidden": true }),
            title: artifacts.length > 1 || folderPath || artifacts[0]?.source.type === "directory" ? "Folder location on this system" : "File location on this system",
            content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[7px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArtifactSyncLocationInput,
                {
                  id: "artifact-sync-preview-destination",
                  artifacts,
                  folderPath,
                  destination,
                  disabled: saving,
                  onDestinationChange: (value) => {
                    setDestination(value);
                    setError(null);
                  }
                }
              ),
              previewLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-[var(--text-muted)]", children: "Checking file changes…" }) : null
            ] })
          },
          ...preview ? artifactSyncDetailsSteps(preview) : []
        ],
        after: error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mt-3 text-[10.5px] text-[var(--danger)]", children: error }) : null
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ChangeDetailsFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "secondary",
          size: "sm",
          disabled: saving,
          onClick: () => void skip(),
          className: "h-[34px] rounded-[8px] text-[12px]",
          children: "Skip on this system"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "primary",
          size: "sm",
          disabled: saving || previewLoading || !preview || placements.length === 0,
          onClick: () => void apply(),
          className: "h-[34px] flex-1 rounded-[8px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[12px] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_20%,var(--tint-base))]",
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin", "aria-hidden": true }) : null,
            saving ? "Applying…" : missing ? "Put on this system" : "Update location"
          ]
        }
      )
    ] })
  ] });
}
function ArtifactSyncPreviewDialog({
  preview,
  artifacts,
  saving,
  error,
  onClose,
  onConfirm
}) {
  const titleId = "artifact-sync-preview-title";
  if (!preview) return null;
  const title = artifacts.length === 1 ? artifacts[0]?.name : `${artifacts.length} items`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: true, onClose, dismissible: !saving, labelledBy: titleId, size: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogBody, { className: "px-5 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--sync-border)] bg-[var(--sync-soft)] text-[var(--sync)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSync, { size: 16, strokeWidth: 2.1, "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              id: titleId,
              className: "text-[15px] font-semibold text-[var(--text-strong)] [font-family:var(--font-heading)]",
              children: [
                "Sync ",
                title
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10.5px] leading-[1.45] text-[var(--text-muted)]", children: "These files will stay synchronized across devices signed in to your account." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactSyncImpact, { preview }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mt-3 text-[10.5px] text-[var(--danger)]", children: error }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "sm", disabled: saving, onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "primary",
          size: "sm",
          disabled: saving,
          onClick: onConfirm,
          className: "ml-auto",
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin", "aria-hidden": true }) : null,
            "Start syncing"
          ]
        }
      )
    ] })
  ] });
}
const NO_KIND_PRIORITY = [];
const COLUMN_ROW_DENSITY = "gap-2 py-1.5";
const ARTIFACT_ROW_SEPARATOR = "border-b border-[var(--border-subtle)] last:border-b-0";
function syncableArtifacts(artifacts) {
  return artifacts.filter(
    (artifact) => artifact.source.type !== "external" && Boolean(artifact.source.runtimePath)
  );
}
function folderSyncTargets(items) {
  return items.flatMap((item) => {
    if (item.type !== "folder") return [];
    const target = artifactSyncFolderTarget(item.path, item.artifacts);
    return [...target ? [target] : [], ...folderSyncTargets(item.items)];
  });
}
function pathLeaf(path) {
  return path.replace(/\\/g, "/").replace(/\/+$/, "").split("/").at(-1) || path;
}
function syncConflictMessage(name) {
  return `Disable sync on “${name}” to sync this item.`;
}
function ArtifactSyncBadge({
  className,
  inherited = false,
  inheritedFolderName
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "z-20 inline-flex shrink-0 select-none items-center justify-center rounded-full bg-[var(--bg-inner)]",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactSyncFacet,
        {
          sync: inherited ? "in-synced-folder" : "synced",
          folder: inheritedFolderName,
          size: 10
        }
      )
    }
  );
}
function createArtifactInventoryViewState() {
  return {
    excludedKinds: /* @__PURE__ */ new Set(),
    expandedFolderPaths: /* @__PURE__ */ new Set()
  };
}
function FolderArtifactTile({ artifacts }) {
  const visibleArtifacts = artifacts.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": true,
      className: "relative z-[1] grid size-5 shrink-0 grid-cols-2 gap-px rounded-[5px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-[3px]",
      children: Array.from({ length: 4 }, (_, index) => {
        const artifact = visibleArtifacts[index];
        if (!artifact) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "rounded-[2px] border border-[color-mix(in_srgb,var(--text-muted)_40%,transparent)] bg-[color-mix(in_srgb,var(--text-muted)_8%,transparent)]"
            },
            index
          );
        }
        const concept = ARTIFACT_KIND_CONCEPTS[artifact.kind];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: conceptStyle(concept),
            className: "rounded-[2px] border border-[color-mix(in_srgb,color-mix(in_srgb,var(--concept-accent),white_var(--mark-lift))_var(--mark-edge),var(--border-subtle))] bg-[color-mix(in_srgb,color-mix(in_srgb,var(--concept-accent),white_var(--mark-lift))_var(--mark-fill),var(--bg-inner))]"
          },
          artifact.id
        );
      })
    }
  );
}
function unitDetail(unit, childUnits) {
  if (childUnits.length > 0) {
    const counts = /* @__PURE__ */ new Map();
    for (const child of childUnits) counts.set(child.kind, (counts.get(child.kind) ?? 0) + 1);
    return [...counts].map(([kind, count]) => `${count} ${artifactKindNoun(kind, count)}`).join(", ");
  }
  if (unit.source.type === "installed-package" && unit.source.version) {
    return `v${unit.source.version}`;
  }
  const metadata = unit.metadata ?? {};
  if (typeof metadata.version === "string" && metadata.version) return `v${metadata.version}`;
  if (typeof metadata.transport === "string" && metadata.transport) return metadata.transport;
  if (typeof metadata.event === "string" && metadata.event) return metadata.event;
  return null;
}
function ArtifactInventory({
  syncEnabled = false,
  units,
  relationships = [],
  diagnostics = [],
  truncated = false,
  onOpenUnit,
  onDeleteUnit,
  onOpenSyncSettings,
  searchCommandKey = "setup-artifacts",
  searchEnabled = false,
  searchScopeLabel = "Artifacts",
  kindPriority = NO_KIND_PRIORITY,
  previewLimit,
  pageSize,
  footer,
  viewState,
  onViewStateChange,
  selectedId,
  bare = false,
  heading,
  typeFilterReachesProvided = false
}) {
  const host = useSetupSurfaceHost();
  const artifactMenus = useArtifactActions();
  const availableSyncTargets = reactExports.useMemo(() => {
    if (!syncEnabled) return [];
    const folders = folderSyncTargets(buildArtifactTree(units, kindPriority));
    return [...syncableArtifacts(units), ...folders];
  }, [kindPriority, syncEnabled, units]);
  const syncArtifactIdsKey = reactExports.useMemo(
    () => availableSyncTargets.map((unit) => unit.id).sort().join(":"),
    [availableSyncTargets]
  );
  const syncStates = useHostResource(
    () => syncEnabled ? host.setup.listSyncStates(availableSyncTargets) : Promise.resolve([]),
    (onChanged) => syncEnabled ? host.setup.onChanged(onChanged) : () => {
    },
    [host, syncArtifactIdsKey, syncEnabled],
    {
      isEqual: hostSnapshotsEqual,
      cache: syncEnabled ? { scope: host, key: `setup.listSyncStates:${syncArtifactIdsKey}` } : void 0
    }
  );
  const syncStateById = reactExports.useMemo(
    () => new Map((syncStates.data ?? []).map((state) => [state.artifactId, state])),
    [syncStates.data]
  );
  const [pendingSync, setPendingSync] = reactExports.useState(null);
  const [confirmingSync, setConfirmingSync] = reactExports.useState(false);
  const [confirmSyncError, setConfirmSyncError] = reactExports.useState();
  const setArtifactsSynced = async (artifacts, enabled) => {
    const { previewSync, setSynced } = host.setup;
    if (!previewSync || !setSynced) throw new Error("Artifact sync is unavailable here.");
    if (enabled) {
      const preview = await previewSync({ type: "enable", artifacts });
      setConfirmSyncError(void 0);
      setPendingSync({ artifacts, preview });
      return;
    }
    const result = await setSynced({ artifacts, enabled });
    syncStates.reload();
    const failed = result.find((state) => state.status === "error");
    if (failed) throw new Error(failed.error || "Artifact sync failed.");
  };
  const [internalViewState, setInternalViewState] = reactExports.useState(createArtifactInventoryViewState);
  const resolvedViewState = viewState ?? internalViewState;
  const excludedKinds = resolvedViewState.excludedKinds;
  const expandedFolderPaths = resolvedViewState.expandedFolderPaths;
  const scrollRef = reactExports.useRef(null);
  const childrenByParent = reactExports.useMemo(() => {
    const result = /* @__PURE__ */ new Map();
    for (const relationship of relationships) {
      if (relationship.kind !== "contains" && relationship.kind !== "provides") continue;
      const children = result.get(relationship.fromUnitId) ?? [];
      children.push(relationship.toUnitId);
      result.set(relationship.fromUnitId, children);
    }
    return result;
  }, [relationships]);
  const childIds = reactExports.useMemo(() => new Set([...childrenByParent.values()].flat()), [childrenByParent]);
  const parentsByChild = reactExports.useMemo(() => {
    const result = /* @__PURE__ */ new Map();
    for (const [parent, children] of childrenByParent)
      for (const child of children) result.set(child, [...result.get(child) ?? [], parent]);
    return result;
  }, [childrenByParent]);
  const unitsById = reactExports.useMemo(() => new Map(units.map((unit) => [unit.id, unit])), [units]);
  const rootUnits = reactExports.useMemo(() => artifactRootUnits(units, relationships), [relationships, units]);
  const filterUnits = typeFilterReachesProvided ? units : rootUnits;
  const kinds = reactExports.useMemo(
    () => [...new Set(filterUnits.map((unit) => unit.kind))].sort(),
    [filterUnits]
  );
  const showScope = reactExports.useMemo(
    () => new Set(rootUnits.map((unit) => unit.scope)).size > 1,
    [rootUnits]
  );
  const kindCounts = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const unit of filterUnits) counts.set(unit.kind, (counts.get(unit.kind) ?? 0) + 1);
    return counts;
  }, [filterUnits]);
  const activeKinds = reactExports.useMemo(
    () => kinds.filter((kind) => !excludedKinds.has(kind)),
    [excludedKinds, kinds]
  );
  const hasTypeFilter = activeKinds.length !== kinds.length;
  const activeKindSet = reactExports.useMemo(() => new Set(activeKinds), [activeKinds]);
  const kindFilterKey = activeKinds.join(":");
  const sortedUnits = reactExports.useMemo(
    () => [...units].sort((left, right) => compareArtifacts(left, right, kindPriority)),
    [kindPriority, units]
  );
  const kindUnits = reactExports.useMemo(
    () => sortedUnits.filter((unit) => activeKindSet.has(unit.kind)),
    [activeKindSet, sortedUnits]
  );
  const searchItems = reactExports.useMemo(
    () => kindUnits.map(
      (unit) => createIndexedSearchItem(unit.id, [
        { label: "Artifact", value: unit.name },
        { label: "Type", value: ARTIFACT_KIND_LABELS[unit.kind] },
        { label: "Provider", value: artifactProviderLabel(unit) },
        { label: "Source", value: artifactSourceLabel(unit) }
      ])
    ),
    [kindUnits]
  );
  const find = useIndexedListSearch(searchItems);
  useContextualSearchCommand({
    key: searchCommandKey,
    enabled: searchEnabled,
    onOpen: find.openSearch
  });
  const activeSearchId = find.activeMatch?.key ?? null;
  const searchMatchIds = reactExports.useMemo(
    () => new Set(find.matches.map((match) => match.key)),
    [find.matches]
  );
  const visible = reactExports.useMemo(() => {
    const parentHidden = (unit) => typeFilterReachesProvided && hasTypeFilter && !(parentsByChild.get(unit.id) ?? []).some((id) => {
      const parent = unitsById.get(id);
      return parent !== void 0 && activeKindSet.has(parent.kind);
    });
    return kindUnits.filter(
      (unit) => !childIds.has(unit.id) || searchMatchIds.has(unit.id) || parentHidden(unit)
    );
  }, [
    activeKindSet,
    childIds,
    hasTypeFilter,
    kindUnits,
    parentsByChild,
    searchMatchIds,
    typeFilterReachesProvided,
    unitsById
  ]);
  const treeItems = reactExports.useMemo(() => buildArtifactTree(visible, kindPriority), [kindPriority, visible]);
  const syncedFolderPaths = reactExports.useMemo(() => {
    const paths = /* @__PURE__ */ new Set();
    const visit = (items) => {
      for (const item of items) {
        if (item.type !== "folder") continue;
        const target = artifactSyncFolderTarget(item.path, item.artifacts);
        if (target && syncStateById.has(target.id)) paths.add(item.path);
        visit(item.items);
      }
    };
    visit(buildArtifactTree(sortedUnits, kindPriority));
    return paths;
  }, [kindPriority, sortedUnits, syncStateById]);
  const searchExpandedFolderPaths = reactExports.useMemo(() => {
    const paths = /* @__PURE__ */ new Set();
    for (const unit of visible) {
      if (!searchMatchIds.has(unit.id)) continue;
      for (const path of artifactFolderPaths(unit)) paths.add(path);
    }
    return paths;
  }, [searchMatchIds, visible]);
  const selectedUnit = selectedId ? unitsById.get(selectedId) : void 0;
  const rowFrame = bare ? "rounded-lg hover:bg-[var(--bg-hover)] hover:shadow-[var(--shadow-hover)]" : cn(
    ARTIFACT_ROW_SEPARATOR,
    "hover:bg-[var(--bg-card-soft)]/80 active:bg-[var(--bg-subtle)]/70"
  );
  const rowDensity = bare ? COLUMN_ROW_DENSITY : LIST_ROW_DENSITY_CLASSES.standard;
  const effectiveExpandedFolderPaths = reactExports.useMemo(
    () => /* @__PURE__ */ new Set([
      ...expandedFolderPaths,
      ...searchExpandedFolderPaths,
      ...selectedUnit ? artifactFolderPaths(selectedUnit) : []
    ]),
    [expandedFolderPaths, searchExpandedFolderPaths, selectedUnit]
  );
  const normalizedPreviewLimit = previewLimit && previewLimit > 0 ? Math.floor(previewLimit) : void 0;
  const normalizedPageSize = pageSize && pageSize > 0 ? Math.floor(pageSize) : void 0;
  const parseDiagnostics = diagnostics.filter((diagnostic) => diagnostic.code === "parse-error");
  const activeSearchPosition = activeSearchId ? findArtifactRootIndex(treeItems, activeSearchId) : -1;
  const pagination = useProgressivePagination({
    itemCount: treeItems.length,
    pageSize: normalizedPageSize,
    initialLimit: normalizedPreviewLimit,
    resetKey: kindFilterKey,
    revealIndex: activeSearchPosition
  });
  reactExports.useEffect(() => {
    if (!activeSearchId) return;
    const frame = window.requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      const element = Array.from(
        container.querySelectorAll("[data-artifact-id]")
      ).find((candidate) => candidate.dataset.artifactId === activeSearchId);
      if (element) scrollElementWithinContainer(container, element);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeSearchId, pagination.renderedCount]);
  if (units.length === 0) return null;
  const updateViewState = (next) => {
    if (viewState) onViewStateChange?.(next);
    else setInternalViewState(next);
  };
  const setExcludedKinds = (next) => {
    updateViewState({ ...resolvedViewState, excludedKinds: next });
  };
  const setKindChecked = (kind, checked) => {
    const next = new Set(excludedKinds);
    if (checked) next.delete(kind);
    else next.add(kind);
    setExcludedKinds(next);
  };
  const toggleFolder = (folder) => {
    const next = new Set(expandedFolderPaths);
    if (next.has(folder.path)) {
      next.delete(folder.path);
    } else {
      for (const path of folderAutoExpansionPaths(folder)) next.add(path);
    }
    updateViewState({ ...resolvedViewState, expandedFolderPaths: next });
  };
  const renderFolder = (folder, depth, branchHasNext) => {
    const expanded = effectiveExpandedFolderPaths.has(folder.path);
    const iconLeft = TREE_ICON_LEFT + depth * TREE_DEPTH_STEP;
    const chevronCenter = TREE_SPINE_LEFT + depth * TREE_DEPTH_STEP;
    const chevronLeft = chevronCenter - TREE_CHEVRON_SIZE / 2;
    const folderSyncTarget = artifactSyncFolderTarget(folder.path, folder.artifacts);
    const folderSyncState = folderSyncTarget ? syncStateById.get(folderSyncTarget.id) : void 0;
    const folderSynced = Boolean(folderSyncState);
    const syncedAncestorPath = [...artifactFolderPaths(folder.artifacts[0])].reverse().find(
      (path) => path !== folder.path && folder.path.startsWith(`${path}/`) && syncedFolderPaths.has(path)
    );
    const inheritedSync = Boolean(syncedAncestorPath);
    const syncedDescendantFolderPath = [...syncedFolderPaths].filter((path) => path.startsWith(`${folder.path}/`)).sort((left, right) => left.length - right.length)[0];
    const syncedDescendantArtifact = folder.artifacts.find(
      (artifact) => syncStateById.has(artifact.id)
    );
    const syncConflictName = syncedAncestorPath ? pathLeaf(syncedAncestorPath) : syncedDescendantFolderPath ? pathLeaf(syncedDescendantFolderPath) : syncedDescendantArtifact ? artifactTreeLeafName(syncedDescendantArtifact) : null;
    const folderMenu = syncEnabled && folderSyncTarget ? artifactMenus.folder(folder, {
      sync: {
        synced: folderSynced,
        states: folderSyncState ? [folderSyncState] : [],
        disabledReason: !folderSynced && syncConflictName ? syncConflictMessage(syncConflictName) : void 0,
        onOpenSettings: onOpenSyncSettings,
        onSetSynced: (enabled) => setArtifactsSynced([folderSyncTarget], enabled)
      }
    }) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EntityContextMenu, { menu: folderMenu, label: `Actions for folder ${folder.name}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-artifact-folder-path": folder.path,
        className: cn(
          "group/folder relative flex w-full min-w-0 items-center text-left transition-colors",
          rowFrame
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "aria-expanded": expanded,
              "aria-label": `${expanded ? "Collapse" : "Expand"} folder ${folder.path}`,
              title: folder.path,
              onClick: () => toggleFolder(folder),
              style: { paddingLeft: `${iconLeft}px` },
              className: cn(
                "relative flex min-w-0 flex-1 items-center pr-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]/40",
                rowDensity
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ListTreeGuides,
                  {
                    depth,
                    branchHasNext,
                    continuesFromRow: expanded && folder.items.length > 0,
                    branchColor: folderSynced || inheritedSync ? "color-mix(in srgb, var(--sync) 65%, transparent)" : void 0,
                    stemColor: inheritedSync ? "color-mix(in srgb, var(--sync) 65%, transparent)" : void 0,
                    childrenColor: folderSynced || inheritedSync ? "color-mix(in srgb, var(--sync) 65%, transparent)" : void 0
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronRight,
                  {
                    size: TREE_CHEVRON_SIZE,
                    strokeWidth: 2.2,
                    "aria-hidden": true,
                    style: { left: `${chevronLeft}px` },
                    className: cn(
                      "absolute top-1/2 z-10 -translate-y-1/2 rounded-sm bg-[var(--bg-inner)] text-[var(--text-muted)] transition-[transform,color,background-color] duration-150 group-hover/folder:bg-[var(--bg-card-soft)] group-hover/folder:text-[var(--text-strong)]",
                      expanded ? "rotate-90" : null
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-[1] shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArtifactTile, { artifacts: folder.artifacts }),
                  folderSynced || inheritedSync ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ArtifactSyncBadge,
                    {
                      inherited: inheritedSync,
                      inheritedFolderName: inheritedSync && syncedAncestorPath ? pathLeaf(syncedAncestorPath) : void 0,
                      className: "absolute -bottom-[3px] -right-[3px] ring-[1.5px] ring-[var(--bg-inner)]"
                    }
                  ) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-[1] min-w-0 flex-1 text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5 truncate text-[12px] font-semibold text-[var(--text-strong)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: folder.name }) }),
                  !bare && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-0.5 block text-[9.5px] text-[var(--text-muted)]", children: [
                    folder.artifactCount,
                    " ",
                    folder.artifactCount === 1 ? "artifact" : "artifacts"
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pr-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EntityMoreMenu, { menu: folderMenu, label: `More actions for folder ${folder.name}`, appearance: "row" }) })
        ]
      }
    ) }, `folder:${folder.path}`);
  };
  const renderUnit = (unit, depth, branchHasNext) => {
    const iconLeft = TREE_ICON_LEFT + depth * TREE_DEPTH_STEP;
    const displayName = depth === 0 ? unit.name : artifactTreeLeafName(unit);
    const childUnits = (childrenByParent.get(unit.id) ?? []).map((id) => unitsById.get(id)).filter((child) => Boolean(child));
    const active = activeSearchId === unit.id;
    const selected = selectedId === unit.id;
    const matching = searchMatchIds.has(unit.id);
    const detail = unitDetail(unit, childUnits);
    const harnessBadge = unit.provider && isSource(unit.provider) ? unit.provider : null;
    const synced = syncStateById.has(unit.id);
    const syncedAncestorPath = [...artifactFolderPaths(unit)].reverse().find((path) => syncedFolderPaths.has(path));
    const inheritedSync = Boolean(syncedAncestorPath);
    const icon = /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          "relative inline-flex shrink-0",
          "transition-transform duration-150 group-hover/row:scale-[1.12]"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListIcon, { concept: ARTIFACT_KIND_CONCEPTS[unit.kind], scale: "compact" }),
          synced || inheritedSync ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArtifactSyncBadge,
            {
              inherited: inheritedSync,
              inheritedFolderName: inheritedSync && syncedAncestorPath ? pathLeaf(syncedAncestorPath) : void 0,
              className: "absolute -bottom-[3px] -right-[3px] ring-[1.5px] ring-[var(--bg-inner)]"
            }
          ) : null
        ]
      }
    );
    const identity = /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[12px] font-semibold text-[var(--text-strong)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchHighlightText, { text: displayName, query: active ? find.query : void 0 }) }),
        unit.enabled === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactEffectFacet, { effect: "disabled" }) : null,
        unit.effective === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactEffectFacet, { effect: "shadowed" }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "mt-0.5 flex min-w-0 items-center gap-1.5 text-[9.5px] text-[var(--text-muted)]",
            bare && "hidden"
          ),
          children: [
            harnessBadge ? /* @__PURE__ */ jsxRuntimeExports.jsx(CodingToolTile, { tool: codingToolOfHarness(harnessBadge), size: "xs" }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: ARTIFACT_KIND_LABELS[unit.kind] }),
            detail ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: detail })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SearchHighlightText,
              {
                text: artifactSourceLabel(unit),
                query: active ? find.query : void 0
              }
            ) })
          ]
        }
      )
    ] });
    const unitMenu = artifactMenus.artifact(unit, {
      sync: syncEnabled ? {
        synced,
        states: syncStateById.has(unit.id) ? [syncStateById.get(unit.id)] : [],
        disabledReason: !synced && syncedAncestorPath ? syncConflictMessage(pathLeaf(syncedAncestorPath)) : void 0,
        onOpenSettings: onOpenSyncSettings,
        onSetSynced: syncableArtifacts([unit]).length > 0 ? (enabled) => setArtifactsSynced([unit], enabled) : void 0
      } : void 0,
      onDelete: onDeleteUnit
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EntityContextMenu, { menu: unitMenu, label: `Actions for ${displayName}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "group/row relative flex w-full min-w-0 items-center transition-colors",
          rowFrame,
          active ? "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] ring-1 ring-inset ring-[var(--accent)]/45" : selected ? "bg-[var(--bg-selected)] shadow-[var(--shadow-selected)] hover:bg-[var(--bg-selected-hover)]" : matching ? "bg-[color-mix(in_srgb,var(--accent)_5%,transparent)]" : null
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-artifact-id": unit.id,
              "data-artifact-kind": unit.kind,
              onClick: () => onOpenUnit(unit),
              "aria-current": selected ? "page" : void 0,
              "aria-label": `Open ${ARTIFACT_KIND_LABELS[unit.kind]} ${displayName}`,
              title: bare ? `${displayName} · ${ARTIFACT_KIND_LABELS[unit.kind]}${detail ? ` · ${detail}` : ""} · ${artifactSourceLabel(unit)}` : `Open ${displayName}`,
              style: { paddingLeft: `${iconLeft}px` },
              className: cn(
                "relative flex min-w-0 flex-1 items-center pr-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]/40",
                rowDensity
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ListTreeGuides,
                  {
                    depth,
                    branchHasNext,
                    continuesFromRow: false,
                    branchColor: synced || inheritedSync ? "color-mix(in srgb, var(--sync) 65%, transparent)" : void 0,
                    stemColor: inheritedSync ? "color-mix(in srgb, var(--sync) 65%, transparent)" : void 0
                  }
                ),
                icon,
                identity,
                showScope ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wide text-[var(--text-muted)]", children: unit.scope }) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pr-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EntityMoreMenu, { menu: unitMenu, label: `More actions for ${unit.name}`, appearance: "row" }) })
        ]
      }
    ) }, unit.id);
  };
  const renderedCount = pagination.renderedCount;
  const renderedTreeItems = treeItems.slice(0, renderedCount);
  const totalArtifactCount = countArtifactsInTreeItems(treeItems);
  const renderedArtifactCount = countArtifactsInTreeItems(renderedTreeItems);
  const renderedRows = flattenArtifactTree(renderedTreeItems, effectiveExpandedFolderPaths);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col", children: [
    find.open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContextualSearchBar,
      {
        inputRef: find.inputRef,
        query: find.query,
        placeholder: "Find in artifacts",
        category: "setup",
        scopeLabel: searchScopeLabel,
        activeMatch: find.activeIndex,
        matchCount: find.matches.length,
        onQueryChange: find.setQuery,
        onPrevious: () => find.moveMatch(-1),
        onNext: () => find.moveMatch(1),
        onClose: find.closeSearch
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ConfigurableList,
      {
        density: "standard",
        divided: false,
        className: bare ? "rounded-none border-0 bg-transparent shadow-none" : void 0,
        children: [
          kinds.length > 1 || heading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListControls,
            {
              variant: heading ? "plain" : "inset",
              count: heading?.count,
              label: heading ? heading.label : hasTypeFilter ? `${activeKinds.length} of ${kinds.length} types` : "All types",
              filterLabel: hasTypeFilter ? `Filter artifact types, ${activeKinds.length} of ${kinds.length} selected` : "Filter artifact types",
              filterTitle: "Filter artifact types",
              filterActive: hasTypeFilter,
              activeCount: hasTypeFilter ? activeKinds.length : void 0,
              filterData: { "data-artifact-type-filter": "" },
              filters: kinds.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  DropdownMenuCheckboxItem,
                  {
                    checked: !hasTypeFilter,
                    onCheckedChange: (checked) => setExcludedKinds(checked === true ? /* @__PURE__ */ new Set() : new Set(kinds)),
                    onSelect: (event) => event.preventDefault(),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "artifact", surface: "bare", className: "size-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All types" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] tabular-nums text-[var(--text-muted)]", children: filterUnits.length })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                kinds.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  DropdownMenuCheckboxItem,
                  {
                    checked: !excludedKinds.has(item),
                    onCheckedChange: (checked) => setKindChecked(item, checked === true),
                    onSelect: (event) => event.preventDefault(),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ConceptIcon,
                        {
                          concept: ARTIFACT_KIND_CONCEPTS[item],
                          surface: "bare",
                          className: "size-3.5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ARTIFACT_KIND_LABELS[item] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] tabular-nums text-[var(--text-muted)]", children: kindCounts.get(item) ?? 0 })
                    ]
                  },
                  item
                ))
              ] }) : void 0
            }
          ) : null,
          truncated ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--warn)_7%,transparent)] px-3 py-2 text-[9px] text-[color-mix(in_srgb,var(--warn)_65%,var(--text-strong))] last:border-b-0", children: "This inventory reached its scan limit. Narrow the project or rescan after reducing generated files." }) : null,
          parseDiagnostics.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--warn)_7%,transparent)] px-3 py-2 text-[9px] text-[color-mix(in_srgb,var(--warn)_65%,var(--text-strong))] last:border-b-0", children: [
            parseDiagnostics.length,
            " configuration",
            " ",
            parseDiagnostics.length === 1 ? "source could" : "sources could",
            " not be parsed."
          ] }) : null,
          renderedRows.length > 0 ? renderedRows.map(
            ({ item, depth, branchHasNext }) => item.type === "folder" ? renderFolder(item, depth, branchHasNext) : renderUnit(item.artifact, depth, branchHasNext)
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-6 text-center text-[11px] text-[var(--text-muted)]", children: "No artifacts match the selected types." })
        ]
      }
    ) }),
    normalizedPageSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaginationBoundary,
      {
        mode: "manual",
        direction: "down",
        hasMore: pagination.hasMore,
        onLoadMore: pagination.loadMore,
        label: "Show more artifacts",
        detail: `${Math.max(0, totalArtifactCount - renderedArtifactCount)} remaining`,
        className: "mt-2"
      }
    ) : null,
    footer && normalizedPreviewLimit && totalArtifactCount > normalizedPreviewLimit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: footer.onSelect,
        "aria-label": footer.ariaLabel,
        className: "mt-2 flex w-full items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-2 text-[9.5px] font-semibold text-[var(--text-muted)] shadow-[0_1px_0_rgba(36,28,12,0.04)] transition-colors hover:bg-[var(--bg-card-soft)]/60 hover:text-[var(--text-strong)]",
        children: footer.label
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArtifactSyncPreviewDialog,
      {
        preview: pendingSync?.preview ?? null,
        artifacts: pendingSync?.artifacts ?? [],
        saving: confirmingSync,
        error: confirmSyncError,
        onClose: () => {
          setPendingSync(null);
          setConfirmSyncError(void 0);
        },
        onConfirm: () => {
          if (!pendingSync) return;
          setConfirmingSync(true);
          setConfirmSyncError(void 0);
          if (!host.setup.setSynced) return;
          void host.setup.setSynced({ artifacts: pendingSync.artifacts, enabled: true }).then((states) => {
            const failed = states.find((state) => state.status === "error");
            if (failed) throw new Error(failed.error || "Artifact sync failed.");
            syncStates.reload();
            setPendingSync(null);
          }).catch((cause) => {
            setConfirmSyncError(cause instanceof Error ? cause.message : "Artifact sync failed.");
          }).finally(() => setConfirmingSync(false));
        }
      }
    )
  ] });
}
const PARENT_RELATIONS = /* @__PURE__ */ new Set(["Contained by", "Provided by"]);
function artifactHeaderData(artifact, context) {
  const concept = ARTIFACT_KIND_CONCEPTS[artifact.kind];
  const provider = artifact.provider && isSource(artifact.provider) ? artifact.provider : null;
  const parents = context.related.filter((group) => PARENT_RELATIONS.has(group.label));
  const trail = parents.flatMap(
    (group) => group.entries.map(({ item }) => ({
      id: `${group.label}:${item.id}`,
      label: item.name,
      concept: ARTIFACT_KIND_CONCEPTS[item.kind],
      target: { onSelect: () => context.onOpenArtifact(item) },
      property: group.label
    }))
  );
  const facts = [
    {
      id: "provider",
      label: "Provider",
      value: artifactProviderLabel(artifact),
      ...provider ? { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HarnessTile, { harness: provider, showTooltip: false }) } : { concept: "harness" }
    },
    // The source path is in the Details card; the top strip says who provides it and its scope.
    { id: "scope", label: "Scope", value: artifact.scope === "global" ? "Global" : "Project", concept: artifact.scope === "global" ? "global" : "folder-project" }
  ];
  return {
    view: "settings",
    kind: ARTIFACT_KIND_LABELS[artifact.kind],
    kindConcept: concept,
    title: artifact.name,
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept, tileSize: "lg" }), shape: "tile" },
    status: artifact.enabled === void 0 ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSummaryBadge, { tone: artifact.enabled ? "success" : "neutral", children: artifact.enabled ? "Enabled" : "Disabled" }),
    summary: context.summary,
    trail,
    facts
  };
}
function artifactAttention(diagnostics) {
  if (!diagnostics.length) return void 0;
  return {
    label: diagnostics.length === 1 ? "Problem reading the source" : `${diagnostics.length} problems reading the source`,
    detail: diagnostics.map((diagnostic) => diagnostic.message).join(" ")
  };
}
function setupProjectHeaderData(project, context) {
  const facts = [
    { id: "path", label: "Location", value: formatHomePath(context.path, context.homeDir), concept: "folder-project" },
    ...project.lastActivityTs ? [{ id: "activity", label: "Last activity", value: relativeTime(project.lastActivityTs, context.now), concept: "activity", metric: true }] : []
  ];
  return {
    view: "project",
    kind: "Project",
    kindConcept: "project",
    title: project.name,
    identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed: projectFlowerSeed(project), size: 34, preview: { alt: `${project.name} avatar`, caption: project.name } }), shape: "tile" },
    facts
  };
}
const RELATIONSHIP_LABELS = {
  contains: "Contains",
  provides: "Provides",
  declares: "Declares",
  references: "References",
  "applies-to": "Applies to",
  overrides: "Overrides",
  "equivalent-to": "Equivalent to"
};
const INCOMING_RELATIONSHIP_LABELS = {
  contains: "Contained by",
  provides: "Provided by",
  declares: "Declared by",
  references: "Referenced by",
  "applies-to": "Applied from",
  overrides: "Overridden by",
  "equivalent-to": "Equivalent to"
};
function sourceTypeLabel(artifact) {
  switch (artifact.source.type) {
    case "file":
      return "File";
    case "directory":
      return "Directory";
    case "config-entry":
      return "Configuration entry";
    case "installed-package":
      return "Installed package";
    case "external":
      return "External service";
  }
}
function artifactDescription(artifact) {
  switch (artifact.kind) {
    case "instruction":
      return "Instructions that are added to the agent context and influence how it responds.";
    case "knowledge":
      return "Reference material the agent can use as context while working in this environment.";
    case "skill":
      return "A reusable capability with instructions and supporting files for a specific task.";
    case "mcp-server":
      return "A Model Context Protocol server that exposes tools or resources to the agent.";
    case "plugin":
      return "An installed package that can provide skills, commands, hooks, or integrations.";
    case "sub-agent":
      return "A specialized agent definition that can be invoked for a narrower role.";
    case "command":
      return "A reusable command or prompt that starts a defined agent workflow.";
    case "hook":
      return "Automation triggered by an agent or lifecycle event.";
    case "configuration":
      return "Settings that change which capabilities are available or how the agent operates.";
    case "workflow":
      return "A multi-step process that coordinates agent behavior or tools.";
    case "unknown":
      return "A discovered non-code artifact that may influence the agent environment.";
  }
}
const METADATA_CHIP_LIMIT = 12;
function MetadataChips({ items }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const overflow = items.length - METADATA_CHIP_LIMIT;
  const visible = expanded || overflow <= 0 ? items : items.slice(0, METADATA_CHIP_LIMIT);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-1", children: [
    visible.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "inline-flex max-w-full items-center truncate rounded-[5px] border border-[var(--border-subtle)] bg-[var(--bg-card-soft)] px-1.5 py-0.5 font-mono text-[10px] leading-[15px] text-[var(--text-body)]",
        children: item
      },
      `${index}:${item}`
    )),
    overflow > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((value) => !value),
        className: "inline-flex items-center rounded-[5px] px-1 py-0.5 text-[10px] font-semibold leading-[15px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]",
        children: expanded ? "Show less" : `+${overflow} more`
      }
    ) : null
  ] });
}
function metadataFactRows(artifact) {
  return artifactMetadataEntries(artifact).map(
    (entry) => entry.items ? [entry.key, /* @__PURE__ */ jsxRuntimeExports.jsx(MetadataChips, { items: entry.items }), true] : [entry.key, entry.value]
  );
}
function DetailSection({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex min-w-0 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "px-0.5 text-[10px] font-bold leading-none tracking-[0.14em] text-[var(--text-muted)]", children: title.toLocaleUpperCase() }),
    children
  ] });
}
function EmptyDetailContent({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[8px] border border-dashed border-[var(--border-subtle)] px-3 py-5 text-center text-[11px] text-[var(--text-muted)]", children });
}
function SourceTypeIcon({ artifact }) {
  const Icon = artifact.source.type === "file" ? FileText : artifact.source.type === "directory" ? FolderOpen : artifact.source.type === "config-entry" ? Settings2 : artifact.source.type === "installed-package" ? PackageOpen : Cloud;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12, strokeWidth: 2, "aria-hidden": true });
}
function EditToggle({
  editing,
  disabled,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": editing ? "Save edit" : "Edit inline",
      title: editing ? "Save edit" : "Edit inline",
      onClick: onToggle,
      disabled,
      className: cn(
        "flex size-7 shrink-0 items-center justify-center rounded-[6px] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        editing ? "text-[var(--accent)] hover:bg-[var(--bg-card-soft)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-card-soft)] hover:text-[var(--text-strong)]"
      ),
      children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3", strokeWidth: 2.3, "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-[10px]", strokeWidth: 2, "aria-hidden": true })
    }
  );
}
function SourceCard({
  icon,
  path,
  hoverPath,
  trailing,
  editing = false,
  open,
  onOpenChange,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExpandableCard,
    {
      stickyHeader: true,
      collapsible: onOpenChange !== void 0,
      open,
      onOpenChange,
      emphasis: editing ? "active" : "default",
      className: editing ? void 0 : "border-[var(--border-subtle)]",
      leading: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex size-3.5 items-center justify-center text-[var(--text-muted)]", children: icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 12, strokeWidth: 2, "aria-hidden": true }) }),
      title: path,
      titlePath: hoverPath,
      titleClassName: "font-mono font-normal text-[10.5px] leading-[18px] text-[var(--text-body)]",
      trailing,
      children
    }
  );
}
function isMarkdownPath(path) {
  return /\.(md|mdc|markdown)$/i.test(path);
}
function EditableSourceCard({
  runtimePath,
  displayPath,
  title,
  icon,
  reader,
  writer,
  collapsible = false,
  extraTrailing,
  open,
  onOpenChange
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [validationError, setValidationError] = reactExports.useState(null);
  const [editSession, setEditSession] = reactExports.useState(0);
  const canEdit = writer != null && !isMarkdownPath(runtimePath);
  const discardEditing = () => {
    setEditing(false);
    setValidationError(null);
    setEditSession((value) => value + 1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SourceCard,
    {
      icon,
      path: displayPath,
      hoverPath: runtimePath,
      editing,
      open,
      onOpenChange,
      trailing: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        extraTrailing,
        canEdit && editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Discard edit",
            title: "Discard edit",
            onClick: discardEditing,
            className: "flex size-7 shrink-0 items-center justify-center rounded-[6px] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card-soft)] hover:text-[var(--text-strong)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3", strokeWidth: 2.3, "aria-hidden": true })
          }
        ) : null,
        canEdit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditToggle,
          {
            editing,
            disabled: editing && validationError !== null,
            onToggle: () => setEditing((value) => !value)
          }
        ) : null
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileViewer,
        {
          embedded: true,
          bare: true,
          collapsible: collapsible && !editing,
          editing,
          onValidationErrorChange: setValidationError,
          onRequestEditing: canEdit ? () => setEditing(true) : void 0,
          path: runtimePath,
          title,
          reader,
          writer
        },
        editSession
      )
    }
  );
}
function relatedArtifactGroups(artifact, artifacts, relationships) {
  const artifactsById = new Map(artifacts.map((item) => [item.id, item]));
  const groups = /* @__PURE__ */ new Map();
  const add = (label, entry) => {
    const existing = groups.get(label);
    if (existing) existing.push(entry);
    else groups.set(label, [entry]);
  };
  for (const relationship of relationships) {
    if (artifact.kind === "plugin" && !(relationship.fromUnitId === artifact.id && (relationship.kind === "contains" || relationship.kind === "provides"))) {
      continue;
    }
    if (relationship.fromUnitId === artifact.id) {
      const item = artifactsById.get(relationship.toUnitId);
      if (item) {
        add(RELATIONSHIP_LABELS[relationship.kind], { item, evidence: relationship.evidence });
      }
    } else if (relationship.toUnitId === artifact.id) {
      const item = artifactsById.get(relationship.fromUnitId);
      if (item) {
        add(INCOMING_RELATIONSHIP_LABELS[relationship.kind], {
          item,
          evidence: relationship.evidence
        });
      }
    }
  }
  return [...groups.entries()].map(([label, entries]) => ({ label, entries }));
}
function RelatedArtifacts({
  groups,
  onOpenArtifact
}) {
  return groups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": group.label, className: "contents", children: [
    groups.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionListHeading, { trailing: group.entries.length, children: group.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionList, { label: group.label, children: group.entries.map(({ item, evidence }) => (
      // Each relation is the artifact concept's row; an inferred one says so in its facts.
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactListItem,
        {
          model: artifactOf(item, evidence === "inferred" ? { detail: "Inferred" } : {}),
          onSelect: () => onOpenArtifact(item)
        },
        item.id
      )
    )) })
  ] }, group.label));
}
function basename$2(path) {
  return path.replace(/\\/g, "/").split("/").pop() || path;
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function resolveConfigKeyPath(value, keyPath) {
  let node = value;
  let rest = keyPath;
  let leafKey = keyPath;
  while (rest !== "") {
    const index = rest.match(/^\[(\d+)\]/);
    if (index) {
      const position = Number(index[1]);
      if (!Array.isArray(node) || position >= node.length) return void 0;
      node = node[position];
      leafKey = `${leafKey}[${position}]`;
      rest = rest.slice(index[0].length).replace(/^\./, "");
      continue;
    }
    if (!isRecord(node)) return void 0;
    const record = node;
    const key = Object.keys(record).filter(
      (candidate) => rest === candidate || rest.startsWith(`${candidate}.`) || rest.startsWith(`${candidate}[`)
    ).sort((a, b) => b.length - a.length)[0];
    if (key === void 0) return void 0;
    node = record[key];
    leafKey = key;
    rest = rest.slice(key.length).replace(/^\./, "");
  }
  return { value: node, leafKey };
}
function normalizeTomlHeader(header) {
  return header.replace(/["']/g, "").replace(/\s+/g, "");
}
function sliceTomlSection(content, keyPath) {
  const lines = content.split(/\r?\n/);
  const wanted = normalizeTomlHeader(keyPath);
  const headerAt = (line) => {
    const match = line.match(/^\s*\[\[?([^\]]+)\]\]?\s*$/);
    return match ? normalizeTomlHeader(match[1]) : null;
  };
  const start = lines.findIndex((line) => headerAt(line) === wanted);
  if (start === -1) return null;
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    const header = headerAt(lines[index]);
    if (header !== null && !header.startsWith(`${wanted}.`)) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n").replace(/\s+$/, "");
}
function ConfigEntryContent({
  runtimePath,
  sourcePath,
  keyPath,
  reader,
  writer,
  open,
  onOpenChange
}) {
  const [entry, setEntry] = reactExports.useState(null);
  const [resolved, setResolved] = reactExports.useState(false);
  const [showFullFile, setShowFullFile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    setEntry(null);
    setResolved(false);
    setShowFullFile(false);
    const isJson = /\.json$/i.test(sourcePath);
    const isToml = /\.toml$/i.test(sourcePath);
    if (!isJson && !isToml) {
      setResolved(true);
      return;
    }
    reader(runtimePath).then((text) => {
      if (cancelled) return;
      try {
        if (isJson) {
          const slice = resolveConfigKeyPath(JSON.parse(text), keyPath);
          if (slice !== void 0) {
            setEntry({
              text: JSON.stringify({ [slice.leafKey]: slice.value }, null, 2),
              language: "json"
            });
          }
        } else {
          const section = sliceTomlSection(text, keyPath);
          if (section !== null) setEntry({ text: section, language: "toml" });
        }
      } catch {
      }
      setResolved(true);
    }).catch(() => {
      if (!cancelled) setResolved(true);
    });
    return () => {
      cancelled = true;
    };
  }, [runtimePath, sourcePath, keyPath]);
  if (!resolved) return null;
  const showEntry = entry !== null && !showFullFile;
  const toggle = entry !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => setShowFullFile((value) => !value),
      className: "shrink-0 px-1 font-sans text-[10px] font-semibold text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]",
      children: showEntry ? "Show full file" : "Show only this entry"
    }
  ) : null;
  if (showEntry && entry !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SourceCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 12, strokeWidth: 2, "aria-hidden": true }),
        path: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          basename$2(sourcePath),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--text-muted)]", children: " › " }),
          keyPath
        ] }),
        hoverPath: runtimePath,
        trailing: toggle,
        open,
        onOpenChange,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileViewer,
          {
            embedded: true,
            bare: true,
            collapsible: true,
            path: runtimePath,
            content: entry.text,
            language: entry.language,
            reader
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    EditableSourceCard,
    {
      collapsible: true,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { size: 12, strokeWidth: 2, "aria-hidden": true }),
      runtimePath,
      displayPath: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        basename$2(sourcePath),
        entry === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--text-muted)]", children: [
          " › ",
          keyPath
        ] }) : null
      ] }),
      reader,
      writer,
      extraTrailing: toggle,
      open,
      onOpenChange
    }
  );
}
function readableSourceSection({
  artifact,
  reader,
  writer
}) {
  if (artifact.source.type !== "file" && artifact.source.type !== "config-entry" || !artifact.source.runtimePath) {
    return {
      id: "content",
      title: "Content",
      icon: FileText,
      empty: true,
      body: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDetailContent, { children: "This artifact has no readable source file." })
    };
  }
  if (artifact.source.type === "config-entry") {
    const { runtimePath: runtimePath2, path: path2, keyPath } = artifact.source;
    return {
      id: "source",
      title: "Source configuration",
      icon: Settings2,
      card: (fold) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigEntryContent,
        {
          ...fold,
          runtimePath: runtimePath2,
          sourcePath: path2,
          keyPath,
          reader,
          writer
        }
      )
    };
  }
  const runtimePath = artifact.source.runtimePath;
  const path = artifact.source.path;
  return {
    id: "content",
    title: "Content",
    icon: FileText,
    card: (fold) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditableSourceCard,
      {
        ...fold,
        collapsible: true,
        runtimePath,
        displayPath: path,
        title: artifact.name,
        reader,
        writer
      }
    )
  };
}
function skillSection(props) {
  const mainFile = props.relationships.filter(
    (relationship) => relationship.fromUnitId === props.artifact.id && relationship.kind === "contains"
  ).map((relationship) => props.artifacts.find((item) => item.id === relationship.toUnitId)).find(
    (item) => Boolean(
      item && item.source.type === "file" && item.source.runtimePath && /(^|\/)SKILL\.md$/i.test(item.source.path)
    )
  );
  const directSkillPath = props.artifact.source.type === "directory" && props.artifact.source.runtimePath ? `${props.artifact.source.runtimePath.replace(/[\\/]$/, "")}${props.artifact.source.runtimePath.includes("\\") ? "\\" : "/"}SKILL.md` : null;
  const skillPath = mainFile?.source.type === "file" && mainFile.source.runtimePath ? mainFile.source.runtimePath : directSkillPath;
  if (!skillPath) return readableSourceSection(props);
  return {
    id: "skill",
    title: "Skill instructions",
    icon: FileText,
    card: (fold) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditableSourceCard,
      {
        ...fold,
        runtimePath: skillPath,
        displayPath: "SKILL.md",
        title: "SKILL.md",
        reader: props.reader,
        writer: props.writer
      }
    )
  };
}
function factsSection(id, title, icon, rows) {
  return rows.length ? [{ id, title, icon, body: /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFacts, { rows, flush: true }) }] : [];
}
function typeSpecificSections(props) {
  const metadata = metadataFactRows(props.artifact);
  const source = readableSourceSection(props);
  switch (props.artifact.kind) {
    case "instruction":
    case "knowledge":
    case "sub-agent":
    case "command":
    case "workflow":
    case "unknown":
      return [source];
    case "skill":
      return [skillSection(props)];
    case "mcp-server":
      return [...factsSection("connection", "Connection", Cloud, metadata), source];
    case "hook":
      return [...factsSection("trigger", "Trigger", Sparkles, metadata), source];
    case "configuration":
      return [...factsSection("settings", "Settings", Settings2, metadata), source];
    case "plugin":
      return [
        ...props.artifact.source.type === "installed-package" ? factsSection("installation", "Installation", PackageOpen, [
          [
            "Package",
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageOpen, { size: 12, strokeWidth: 2, "aria-hidden": true }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10.5px]", children: props.artifact.source.packageId }) })
          ],
          [
            "Version",
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 12, strokeWidth: 2, "aria-hidden": true }), children: props.artifact.source.version ?? "Unknown" })
          ],
          [
            "Status",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailFactValue,
              {
                icon: props.artifact.enabled === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleOff, { size: 12, strokeWidth: 2, "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, strokeWidth: 2, "aria-hidden": true, className: "text-[var(--success)]" }),
                children: props.artifact.enabled === false ? "Disabled" : "Enabled"
              }
            )
          ]
        ]) : [],
        source
      ];
  }
}
function artifactGeneralRows(artifact) {
  const generalRows = [
    // Its kind is the artifact concept's kind facet; the coding tool it belongs to, its reference.
    ["Type", /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactKindFacet, { kind: artifact.kind, form: "badge", size: "xs" })],
    [
      "Provider",
      artifact.provider ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        CodingToolReference,
        {
          tool: codingToolOfHarness(artifact.provider, artifactProviderLabel(artifact))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, strokeWidth: 2, "aria-hidden": true }), children: artifactProviderLabel(artifact) })
    ],
    [
      "Scope",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailFactValue,
        {
          icon: artifact.scope === "global" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { size: 12, strokeWidth: 2, "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 12, strokeWidth: 2, "aria-hidden": true }),
          children: artifact.scope === "global" ? "Global" : "Project"
        }
      )
    ],
    [
      "Influence",
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, strokeWidth: 2, "aria-hidden": true }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: artifact.influence }) })
    ],
    [
      "Composition",
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { size: 12, strokeWidth: 2, "aria-hidden": true }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: artifact.composition }) })
    ],
    [
      "Source type",
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceTypeIcon, { artifact }), children: sourceTypeLabel(artifact) })
    ],
    [
      "Source",
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFactValue, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 12, strokeWidth: 2, "aria-hidden": true }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10.5px]", children: artifactSourceLabel(artifact) }) })
    ]
  ];
  if (artifact.enabled !== void 0) {
    generalRows.push([
      "Status",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailFactValue,
        {
          icon: artifact.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, strokeWidth: 2, "aria-hidden": true, className: "text-[var(--success)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleOff, { size: 12, strokeWidth: 2, "aria-hidden": true }),
          children: artifact.enabled ? "Enabled" : "Disabled"
        }
      )
    ]);
  }
  if (artifact.effective !== void 0) {
    generalRows.push([
      "Effective",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailFactValue,
        {
          icon: artifact.effective ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, strokeWidth: 2, "aria-hidden": true, className: "text-[var(--success)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleOff, { size: 12, strokeWidth: 2, "aria-hidden": true }),
          children: artifact.effective ? "Yes" : "No"
        }
      )
    ]);
  }
  return generalRows;
}
function ArtifactDetailsCard({ artifact }) {
  const metadataRows = metadataFactRows(artifact);
  const showMetadata = metadataRows.length > 0 && artifact.kind !== "mcp-server" && artifact.kind !== "hook" && artifact.kind !== "configuration";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageColumnCard, { header: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: "Details", concept: "documentation" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFacts, { rows: artifactGeneralRows(artifact), flush: true }),
    showMetadata ? /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSection, { title: "Metadata", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DetailFacts, { rows: metadataRows, flush: true }) }) : null
  ] }) });
}
function ArtifactDetailPage(props) {
  const { artifact, artifacts, relationships, diagnostics = [], onOpenArtifact } = props;
  const artifactPath = "path" in artifact.source ? artifact.source.path : null;
  const normalizedArtifactPath = typeof artifactPath === "string" ? artifactPath.replace(/\\/g, "/") : null;
  const sourceDiagnostics = diagnostics.filter(
    (diagnostic) => normalizedArtifactPath !== null && diagnostic.sourcePath.replace(/\\/g, "/") === normalizedArtifactPath
  );
  const relatedGroups = relatedArtifactGroups(artifact, artifacts, relationships);
  const attention = artifactAttention(sourceDiagnostics);
  const relatedCount = relatedGroups.reduce((count, group) => count + group.entries.length, 0);
  const contentSections = typeSpecificSections(props);
  const sections = useExpandableSections(() => contentSections.map((section) => section.id));
  const relatedLabel = artifact.kind === "plugin" ? relatedCount === 1 ? "plugin content" : "plugin contents" : relatedCount === 1 ? "related artifact" : "related artifacts";
  const counts = [
    ...contentSections.map((section) => ({
      id: section.id,
      concept: ARTIFACT_KIND_CONCEPTS[artifact.kind],
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(section.icon, { size: 12, strokeWidth: 2, "aria-hidden": true }),
      label: section.title,
      onSelect: () => sections.jump(section.id)
    })),
    ...relatedCount > 0 ? [
      {
        id: "related",
        concept: "artifact",
        count: relatedCount,
        label: relatedLabel,
        onSelect: () => sections.jump("related")
      }
    ] : []
  ];
  const { counts: _counts, ...header } = artifactHeaderData(artifact, {
    summary: artifactDescription(artifact),
    related: relatedGroups,
    onOpenArtifact
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { as: "section", padding: "sm", className: "flex min-w-0 flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PageHeaderViews,
    {
      header: { ...header, counts, menu: props.menu },
      headerProps: { under: "counts" },
      attention: attention ? /* @__PURE__ */ jsxRuntimeExports.jsx(AttentionLine, { ...attention }) : null,
      views: [
        {
          id: "overview",
          chip: OVERVIEW_CHIP,
          content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-2", children: [
            contentSections.map(
              (section) => section.card ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "section",
                {
                  ref: sections.register(section.id),
                  "aria-label": section.title,
                  "data-section": section.id,
                  className: "min-w-0 scroll-mt-4",
                  children: section.card({
                    open: sections.isOpen(section.id),
                    onOpenChange: (next) => sections.toggle(section.id, next)
                  })
                },
                section.id
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                ExpandableSection,
                {
                  ...sections.props(section.id),
                  icon: section.icon,
                  title: section.title,
                  empty: section.empty,
                  summary: section.empty ? "No readable source" : void 0,
                  children: section.body
                },
                section.id
              )
            ),
            relatedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExpandableSection,
              {
                ...sections.props("related"),
                concept: "artifact",
                title: artifact.kind === "plugin" ? "Plugin contents" : "Related artifacts",
                summary: `${relatedCount} ${relatedLabel}`,
                fit: "list",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedArtifacts, { groups: relatedGroups, onOpenArtifact })
              }
            )
          ] })
        }
      ]
    },
    artifact.id
  ) }) });
}
function ArtifactSubPage({
  artifact,
  title,
  concept,
  sections,
  onSelect,
  details,
  onClose,
  children
}) {
  const layout = /* @__PURE__ */ jsxRuntimeExports.jsx(
    ColumnLayout,
    {
      contentKey: artifact?.id,
      compactBackLabel: "Artifacts",
      primary: /* @__PURE__ */ jsxRuntimeExports.jsx(PageColumnCard, { variant: "flush", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Artifacts", className: "flex min-w-0 flex-col gap-5", children: sections.filter((section) => section.units.length > 0 || section.status).map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          "aria-label": section.label,
          className: "flex min-w-0 flex-col gap-2",
          children: section.units.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArtifactInventory,
            {
              bare: true,
              heading: { label: section.label, count: section.units.length },
              units: section.units,
              relationships: section.relationships,
              diagnostics: section.diagnostics,
              selectedId: artifact?.id,
              searchScopeLabel: `${section.label} artifacts`,
              viewState: section.viewState,
              onViewStateChange: section.onViewStateChange,
              typeFilterReachesProvided: true,
              onOpenUnit: (unit) => onSelect(unit, section)
            }
          ) : section.status
        },
        section.id
      )) }) }),
      content: artifact ? children : /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyPage,
        {
          scene: "seedShelf",
          title: "Choose an artifact",
          description: "Skills, rules, commands and settings your agents grow from. Choose one on the left to see it here."
        }
      ),
      columnCard: artifact ? details : void 0
    }
  );
  return (
    // The card on its own ground: clicking around it closes it. Narrow, it fills the page as every
    // sub-page does: no inset around the card.
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageBackdrop, { onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubPageLayout,
      {
        id: artifact?.id ?? `tree:${title ?? "artifacts"}`,
        title: artifact?.name ?? title ?? "Artifacts",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConceptIcon,
          {
            concept: artifact ? ARTIFACT_KIND_CONCEPTS[artifact.kind] : concept ?? "artifact",
            surface: "bare",
            size: 16
          }
        ),
        content: layout,
        onClose
      }
    ) })
  );
}
const GLOBAL_SETUP_COMMON_KINDS = [
  "skill",
  "plugin",
  "mcp-server",
  "hook",
  "command",
  "instruction"
];
function globalArtifactKindCounts(units) {
  const counts = /* @__PURE__ */ new Map();
  for (const unit of units) counts.set(unit.kind, (counts.get(unit.kind) ?? 0) + 1);
  return [...counts].sort(
    ([leftKind, left], [rightKind, right]) => right - left || ARTIFACT_KIND_LABELS[leftKind].localeCompare(ARTIFACT_KIND_LABELS[rightKind])
  );
}
function globalArtifactTreeState(units, relationships, kind) {
  const expandedFolderPaths = /* @__PURE__ */ new Set();
  for (const item of buildArtifactTree(artifactRootUnits([...units], [...relationships])))
    if (item.type === "folder") for (const path of folderAutoExpansionPaths(item)) expandedFolderPaths.add(path);
  if (kind) {
    for (const unit of units)
      if (unit.kind === kind) for (const path of artifactFolderPaths(unit)) expandedFolderPaths.add(path);
  }
  return { excludedKinds: /* @__PURE__ */ new Set(), expandedFolderPaths };
}
const SEE_ALL = "see-all";
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
function GlobalSetupGlance({
  units,
  heading = true,
  fallback,
  onOpen
}) {
  const tabs = reactExports.useMemo(() => {
    const kinds = units ? globalArtifactKindCounts(units) : GLOBAL_SETUP_COMMON_KINDS.map((kind) => [kind, void 0]);
    return [
      ...kinds.map(([kind, count]) => ({
        id: kind,
        concept: ARTIFACT_KIND_CONCEPTS[kind],
        // Without a count the chip names the type alone ("Skills").
        label: count === void 0 ? capitalize(artifactKindNoun(kind, 2)) : { one: artifactKindNoun(kind, 1), other: artifactKindNoun(kind, 2) },
        count
      })),
      { id: SEE_ALL, label: "See all", trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight$1, { size: 12, "aria-hidden": true }) }
    ];
  }, [units]);
  const empty = units !== null && units.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Global setup", "data-global-setup": true, className: "flex min-w-0 flex-col gap-2", children: [
    heading && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "ALSO APPLIES HERE", count: units ? units.length : void 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 px-0.5 type-ui-meta text-[var(--text-muted)]", children: "Global setup from your home folder, used in every project." }),
    empty ? fallback ?? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 px-0.5 type-ui-meta text-[var(--text-muted)]", children: "No global setup in your home folder yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      CountTabs,
      {
        mode: "jump",
        ariaLabel: "Global setup by type",
        tabs,
        onValueChange: (id) => onOpen(id === SEE_ALL ? void 0 : id)
      }
    )
  ] });
}
function missingSyncedArtifactItems(states) {
  return states.flatMap((state) => {
    if (!state.missingOnSystem || !state.artifact) return [];
    return [
      {
        state,
        artifact: state.artifact,
        folder: isArtifactSyncFolder(state.artifact) || state.artifact.source.type === "directory"
      }
    ];
  });
}
function MissingSyncedArtifacts({
  onOpenSyncSettings
}) {
  const host = useSetupSurfaceHost();
  const syncStates = useHostResource(
    () => host.setup.listSyncStates(),
    (onChanged) => host.setup.onChanged(onChanged),
    [host],
    { isEqual: hostSnapshotsEqual, cache: { scope: host, key: "setup.listSyncStates" } }
  );
  const items = reactExports.useMemo(() => missingSyncedArtifactItems(syncStates.data ?? []), [syncStates.data]);
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-2.5", "data-missing-synced-artifacts": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "SYNCED, NOT ON THIS SYSTEM", count: items.length }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "-mt-1 px-0.5 text-[10px] text-[var(--text-muted)]", children: "Choose where to put these, or skip them on this system." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableList, { density: "standard", divided: false, children: items.map((item) => {
      const { artifact, folder, state } = item;
      const harness = artifact.provider && isSource(artifact.provider) ? artifact.provider : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onOpenSyncSettings({
            states: [state],
            ...folder ? { folderName: artifact.name } : {},
            ...folder && artifact.source.type !== "external" ? { folderPath: artifact.source.path } : {}
          }),
          className: `group/row flex w-full min-w-0 items-center gap-2.5 border-b border-[var(--border-subtle)] px-3 text-left last:border-b-0 hover:bg-[var(--bg-card-soft)] ${LIST_ROW_DENSITY_CLASSES.standard}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative shrink-0 transition-transform duration-150 group-hover/row:scale-[1.12]", children: folder ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderArtifactTile, { artifacts: [artifact] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              ConfigurableListIcon,
              {
                concept: ARTIFACT_KIND_CONCEPTS[artifact.kind],
                scale: "compact"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[12px] font-semibold text-[var(--text-strong)]", children: artifact.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-0.5 flex min-w-0 items-center gap-1.5 text-[9.5px] text-[var(--text-muted)]", children: [
                harness ? /* @__PURE__ */ jsxRuntimeExports.jsx(HarnessMiniBadge, { harness }) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: folder ? "Folder" : ARTIFACT_KIND_LABELS[artifact.kind] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: artifactSourceLabel(artifact) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9.5px] font-semibold text-[var(--sync)]", children: "Choose location" })
          ]
        },
        state.artifactId
      );
    }) })
  ] });
}
function ArtifactSyncSettingsPage({
  states,
  folderName,
  folderPath,
  initialDestination,
  onPreview,
  onDone,
  onChanged
}) {
  const host = useSidecarHost();
  const artifacts = reactExports.useMemo(
    () => states.map((state) => state.artifact).filter((item) => Boolean(item)),
    [states]
  );
  const missing = states.some((state) => state.missingOnSystem);
  const conflicts = states.flatMap((state) => state.conflicts ?? []);
  const multiple = artifacts.length > 1;
  const first = artifacts[0];
  const titleId = `artifact-sync-settings-${states[0]?.artifactId ?? "item"}`;
  const suggested = reactExports.useMemo(() => {
    if (!first) return "";
    if (multiple && folderPath) {
      const normalized = folderPath.replace(/^~?[\\/]+/, "");
      return host.system.homeDir ? joinArtifactPath(host.system.homeDir, normalized) : normalized;
    }
    return states[0]?.localPath ?? defaultArtifactDestination(first, host.system.homeDir);
  }, [first, folderPath, host.system.homeDir, multiple, states]);
  const [destination, setDestination] = reactExports.useState(initialDestination ?? suggested);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [previewLoading, setPreviewLoading] = reactExports.useState(false);
  const [placementPreview, setPlacementPreview] = reactExports.useState(null);
  const pendingPlacements = reactExports.useMemo(
    () => artifactSyncPlacementTargets(artifacts, destination, folderPath),
    [artifacts, destination, folderPath]
  );
  reactExports.useEffect(() => {
    setPlacementPreview(null);
    if (pendingPlacements.length === 0) {
      setPreviewLoading(false);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setPreviewLoading(true);
      setError(null);
      void Promise.all(
        pendingPlacements.map(
          ({ artifact, runtimePath }) => host.setup.previewSync(
            { type: "place", placement: { artifactId: artifact.id, runtimePath } },
            { signal: controller.signal }
          )
        )
      ).then((previews) => setPlacementPreview(combineArtifactSyncPreviews(previews))).catch((cause) => {
        if (controller.signal.aborted) return;
        setError(artifactSyncErrorMessage(cause, "Could not preview changes at this location."));
      }).finally(() => {
        if (!controller.signal.aborted) setPreviewLoading(false);
      });
    }, 350);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [host.setup, pendingPlacements]);
  const previewChanges = placementPreview?.items.flatMap(
    (item) => item.changes.map((change) => ({
      change,
      displayPath: artifactSyncDisplayPath(change.path, item)
    }))
  ) ?? [];
  const skipOrStop = async () => {
    if (artifacts.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      await host.setup.setSynced({ artifacts, enabled: false });
      onChanged();
      onDone();
    } catch (cause) {
      setError(artifactSyncErrorMessage(cause, "Could not update sync settings."));
    } finally {
      setSaving(false);
    }
  };
  if (!first) return null;
  const title = folderName ?? first.name;
  const folder = Boolean(folderName) || first.source.type === "directory";
  const locationTitle = multiple || folder ? "Folder location on this system" : "File location on this system";
  const locationSectionLabel = multiple || folder ? "FOLDER LOCATION" : "FILE LOCATION";
  const previewAction = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      type: "button",
      variant: "primary",
      size: "sm",
      disabled: saving || previewLoading || !placementPreview,
      onClick: () => {
        if (!placementPreview) return;
        onPreview(
          placementPreview,
          destination.trim(),
          pendingPlacements.map(({ artifact, runtimePath }) => ({
            artifactId: artifact.id,
            runtimePath
          }))
        );
      },
      className: "ml-auto h-9",
      children: [
        previewLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin", "aria-hidden": true }) : null,
        previewLoading ? "Checking changes…" : "Preview changes"
      ]
    }
  );
  const stopAction = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      type: "button",
      variant: "secondary",
      size: "sm",
      disabled: saving,
      onClick: () => void skipOrStop(),
      className: "h-9",
      children: missing ? "Skip on this system" : "Stop syncing"
    }
  );
  const locationInput = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArtifactSyncLocationInput,
      {
        id: `${titleId}-destination`,
        artifacts,
        folderPath,
        destination,
        disabled: saving,
        onDestinationChange: (value) => {
          setDestination(value);
          setError(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] leading-[1.45] text-[var(--text-muted)]", children: "This path stays on this system and is never shared with the cloud." })
  ] });
  const previewContent = placementPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-[10px] text-[var(--text-muted)]", children: [
      placementPreview.addCount,
      " added · ",
      placementPreview.updateCount,
      " updated ·",
      " ",
      placementPreview.removeCount,
      " removed",
      placementPreview.conflictCount ? ` · ${placementPreview.conflictCount} conflicts preserved` : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangeOperationList,
      {
        items: previewChanges.map(({ change, displayPath }, index) => {
          const presentation = ARTIFACT_SYNC_CHANGE_PRESENTATION[change.action];
          return {
            key: `${change.action}:${change.path}:${index}`,
            leading: /* @__PURE__ */ jsxRuntimeExports.jsx(
              OperationPill,
              {
                op: artifactSyncSuggestionOperation(change, displayPath),
                label: "File",
                tooltip: presentation.title,
                color: presentation.tone
              }
            ),
            summary: displayPath
          };
        })
      }
    )
  ] }) : previewLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[var(--text-muted)]", children: "Checking file changes…" }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex w-full max-w-[720px] min-w-0 flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--sync-border)] bg-[var(--sync-soft)] text-[var(--sync)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16, strokeWidth: 2.1, "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            id: titleId,
            className: "text-[15px] font-semibold text-[var(--text-strong)] [font-family:var(--font-heading)]",
            children: title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 truncate text-[10.5px] text-[var(--text-muted)]", children: [
          multiple ? `${artifacts.length} synced artifacts` : folder ? "Folder" : ARTIFACT_KIND_LABELS[first.kind],
          missing ? " · Missing on this system" : " · Synced on this system"
        ] })
      ] })
    ] }),
    missing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ChangeCard,
      {
        className: "mt-5",
        title: locationTitle,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          stopAction,
          previewAction
        ] }),
        children: [
          locationInput,
          previewContent ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 border-t border-[var(--border-subtle)] pt-3", children: previewContent }) : null,
          error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mt-3 text-[10.5px] text-[var(--danger)]", children: error }) : null
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: locationSectionLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-0.5", children: locationInput }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-0.5 pt-0.5", children: [
          stopAction,
          previewAction
        ] }),
        error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "px-0.5 text-[10.5px] text-[var(--danger)]", children: error }) : null
      ] }),
      previewContent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "FILE CHANGES", count: previewChanges.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-0.5", children: previewContent })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-5 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "DEVICES" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AccountDevicesAccordion,
        {
          account: host.account,
          defaultOpenCurrent: true,
          renderContent: (device) => device.current ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10.5px] font-semibold text-[var(--text-body)]", children: missing ? "Not placed on this device" : "Synced on this device" }),
            !missing && destination ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "break-all font-mono text-[9.5px] leading-[1.45] text-[var(--text-muted)]", children: destination }) : null
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] leading-[1.45] text-[var(--text-muted)]", children: "Its file path and skip choice stay private to that device. Open Blume there to change them." })
        }
      ) })
    ] }),
    conflicts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-xl border border-[color-mix(in_srgb,var(--warn)_35%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--warn)_7%,transparent)] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-[10.5px] font-semibold text-[var(--text-strong)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 13, className: "text-[var(--warn)]", "aria-hidden": true }),
        conflicts.length,
        " ",
        conflicts.length === 1 ? "conflict was" : "conflicts were",
        "preserved"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1", children: conflicts.slice(0, 8).map((conflict) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "truncate font-mono text-[9px] text-[var(--text-muted)]",
          title: `${conflict.path} → ${conflict.preservedPath}`,
          children: [
            conflict.path,
            " → ",
            conflict.preservedPath
          ]
        },
        `${conflict.path}:${conflict.preservedPath}`
      )) })
    ] }) : null
  ] }) }) });
}
async function readArtifactSyncAccountAvailability(enabled, getSession) {
  if (!enabled) return "signed-out";
  try {
    return await getSession() ? "signed-in" : "signed-out";
  } catch (error) {
    if (isAccountAuthenticationRequired(error)) return "signed-out";
    return "unavailable";
  }
}
function canReadArtifactSyncState(enabled, account) {
  return enabled && (account === "signed-in" || account === "unavailable");
}
const TILE_WIDTH = 76;
const GAP = 6;
const SLOT = TILE_WIDTH + GAP;
const SHOW_MORE_RESERVE = 82;
function formatTokens(n) {
  if (n < 1e3) return `${n}`;
  if (n < 1e4) return `${(n / 1e3).toFixed(1)}k`;
  return `${Math.round(n / 1e3)}k`;
}
function basename$1(p) {
  return p.split("/").pop() || p;
}
function iconFor(relPath) {
  const ext = relPath.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "md" || ext === "mdc" || ext === "markdown") return BookOpen;
  if (ext === "json") return FileBraces;
  if (ext === "toml" || ext === "yaml" || ext === "yml") return Settings;
  if (ext === "sh" || ext === "bash") return Terminal;
  if (ext === "ts" || ext === "tsx" || ext === "js" || ext === "jsx" || ext === "py" || ext === "rs" || ext === "go")
    return FileCode;
  return FileText;
}
function FileGrid({
  files,
  layout,
  activeRelPath,
  mainRelPath,
  nested = true,
  currentDir = "",
  onDirChange,
  onSelect,
  onExpand
}) {
  const items = reactExports.useMemo(
    () => buildItems(files, currentDir, nested, mainRelPath),
    [files, currentDir, nested, mainRelPath]
  );
  const measureRef = reactExports.useRef(null);
  const [maxFit, setMaxFit] = reactExports.useState(items.length);
  const upReserve = nested && !!currentDir && !!onDirChange ? 44 + GAP : 0;
  reactExports.useLayoutEffect(() => {
    if (layout !== "line") return;
    const node = measureRef.current;
    if (!node) return;
    const compute = () => {
      const w = node.clientWidth;
      if (w <= 0) return;
      const avail = Math.max(0, w - upReserve);
      const fitsAll = items.length * SLOT - GAP <= avail;
      if (fitsAll) {
        setMaxFit(items.length);
        return;
      }
      const usable = Math.max(0, avail - SHOW_MORE_RESERVE);
      setMaxFit(Math.max(1, Math.floor((usable + GAP) / SLOT)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(node);
    return () => ro.disconnect();
  }, [items.length, layout, upReserve]);
  const visible = layout === "line" ? items.slice(0, maxFit) : items;
  const hidden = items.length - visible.length;
  const containerCls = layout === "line" ? "flex items-stretch gap-1.5" : "grid grid-cols-[repeat(auto-fill,minmax(76px,1fr))] gap-1.5";
  const showUp = nested && !!currentDir && !!onDirChange;
  const navigateUp = () => {
    if (!onDirChange) return;
    const segs = currentDir.split("/").filter(Boolean);
    segs.pop();
    onDirChange(segs.join("/"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: measureRef, className: containerCls, children: [
    showUp && /* @__PURE__ */ jsxRuntimeExports.jsx(UpFolderTile, { onClick: navigateUp }),
    visible.map(
      (item) => item.type === "file" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileTile,
        {
          file: item.file,
          active: item.file.relPath === activeRelPath,
          main: item.file.relPath === mainRelPath,
          onClick: () => onSelect(item.file)
        },
        item.file.absPath
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        FolderTile,
        {
          folder: item,
          onClick: () => onDirChange?.(item.path),
          disabled: !onDirChange
        },
        item.path
      )
    ),
    layout === "line" && hidden > 0 && onExpand && /* @__PURE__ */ jsxRuntimeExports.jsx(ShowMoreTile, { count: hidden, onClick: onExpand })
  ] });
}
function buildItems(files, currentDir, nested, mainRelPath) {
  if (!nested) {
    const ordered = mainRelPath ? sortMainFirst(files, mainRelPath) : files;
    return ordered.map((f) => ({ type: "file", file: f }));
  }
  const prefix = currentDir ? currentDir + "/" : "";
  const inScope = files.filter((f) => f.relPath.startsWith(prefix));
  const folderMap = /* @__PURE__ */ new Map();
  const fileItems = [];
  for (const f of inScope) {
    const rest = f.relPath.slice(prefix.length);
    const slashIdx = rest.indexOf("/");
    if (slashIdx === -1) {
      fileItems.push({ type: "file", file: f });
      continue;
    }
    const folderName = rest.slice(0, slashIdx);
    const folderPath = prefix + folderName;
    const existing = folderMap.get(folderName);
    if (existing) {
      existing.fileCount++;
      existing.tokens += f.tokens ?? 0;
    } else {
      folderMap.set(folderName, {
        type: "folder",
        name: folderName,
        path: folderPath,
        fileCount: 1,
        tokens: f.tokens ?? 0
      });
    }
  }
  const folders = Array.from(folderMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  fileItems.sort((a, b) => basename$1(a.file.relPath).localeCompare(basename$1(b.file.relPath)));
  const items = [...folders, ...fileItems];
  if (mainRelPath && !currentDir) {
    const mainIdx = items.findIndex((i) => i.type === "file" && i.file.relPath === mainRelPath);
    if (mainIdx > 0) {
      const [main] = items.splice(mainIdx, 1);
      items.unshift(main);
    }
  }
  return items;
}
function sortMainFirst(files, mainRelPath) {
  const idx = files.findIndex((f) => f.relPath === mainRelPath);
  if (idx <= 0) return files;
  const copy = files.slice();
  const [main] = copy.splice(idx, 1);
  copy.unshift(main);
  return copy;
}
function FileTile({
  file,
  active,
  main,
  onClick
}) {
  const Icon = iconFor(file.relPath);
  const iconNode = reactExports.createElement(Icon, {
    size: 20,
    strokeWidth: 1.5,
    className: active ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
    "aria-hidden": true
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: file.relPath, side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "group relative flex flex-col items-center justify-center gap-0.5 h-[68px] min-w-[76px] flex-1 basis-[76px] rounded-md border transition-colors px-1 " + (active ? "bg-[var(--bg-inner)] border-[var(--accent-soft-border)] text-[var(--text-strong)]" : "bg-[var(--bg-card-soft)]/60 border-[var(--border-subtle)] text-[var(--text-body)] hover:bg-[var(--bg-card-soft)] hover:border-[var(--border-subtle)]"),
      children: [
        main && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: "Main file", side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "absolute top-1 right-1 text-[var(--accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 9, fill: "currentColor", strokeWidth: 0 }) }) }),
        iconNode,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block w-full text-center text-[10px] font-medium leading-tight truncate px-0.5", children: basename$1(file.relPath) }),
        file.tokens !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[8.5px] tabular-nums leading-none text-[var(--text-muted)]/80", children: formatTokens(file.tokens) })
      ]
    }
  ) });
}
function FolderTile({
  folder,
  onClick,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: folder.path, side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: "group flex flex-col items-center justify-center gap-0.5 h-[68px] min-w-[76px] flex-1 basis-[76px] rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/60 text-[var(--text-body)] transition-colors px-1 " + (disabled ? "cursor-default" : "hover:bg-[var(--bg-card-soft)] hover:border-[var(--border-subtle)]"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { size: 20, strokeWidth: 1.5, className: "text-[var(--text-muted)]", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block w-full text-center text-[10px] font-medium leading-tight truncate px-0.5", children: folder.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-[8.5px] tabular-nums leading-none text-[var(--text-muted)]/80", children: [
          folder.fileCount,
          " ",
          folder.fileCount === 1 ? "file" : "files"
        ] })
      ]
    }
  ) });
}
function UpFolderTile({ onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: "Go up one folder", side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      className: "group shrink-0 inline-flex flex-col items-center justify-center w-[44px] h-[68px] rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/60 text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-card-soft)] hover:border-[var(--border-subtle)] transition-colors",
      "aria-label": "Go up one folder",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18, strokeWidth: 1.6, "aria-hidden": true })
    }
  ) });
}
function ShowMoreTile({
  count,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: `Show ${count} more`, side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "shrink-0 inline-flex flex-col items-center justify-center w-[76px] h-[68px] rounded-md border border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--bg-card-soft)] hover:border-[var(--border-card)] transition-colors self-stretch",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[14px] font-semibold tabular-nums leading-none", children: [
          "+",
          count
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium tracking-[0.04em] uppercase mt-1", children: "more" })
      ]
    }
  ) });
}
function FilesBar({
  files,
  activeRelPath,
  mainRelPath,
  nested = true,
  currentDir,
  onDirChange,
  onSelect,
  defaultExpanded = false
}) {
  const [expanded, setExpanded] = reactExports.useState(defaultExpanded);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-3 py-2 bg-[var(--bg-card-soft)]/50 border-b border-[var(--border-subtle)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FileGrid,
      {
        files,
        layout: expanded ? "grid" : "line",
        activeRelPath,
        mainRelPath,
        nested,
        currentDir,
        onDirChange,
        onSelect,
        onExpand: () => setExpanded(true)
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: "Collapse", side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setExpanded(false),
        "aria-label": "Collapse files",
        className: "absolute top-1.5 right-1.5 inline-flex items-center justify-center size-[18px] rounded text-[var(--text-muted)]/70 hover:text-[var(--text-strong)] hover:bg-[var(--bg-subtle)]/80 transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] leading-none rotate-180 inline-block", children: "▾" })
      }
    ) })
  ] });
}
function basename(p) {
  return p.split("/").filter(Boolean).pop() || p;
}
function SkillViewer({
  title,
  files,
  onBack,
  embedded = false,
  reader,
  writer
}) {
  const mainFile = files.find((f) => /(^|\/)SKILL\.md$/i.test(f.relPath));
  const initial = mainFile ?? files[0];
  const [current, setCurrent] = reactExports.useState(initial);
  const [currentDir, setCurrentDir] = reactExports.useState("");
  const breadcrumbs = current ? [{ label: title }, { label: basename(current.relPath) }] : [{ label: title }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0", children: [
    !embedded && /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeader, { onBack, breadcrumbs }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto overflow-x-hidden min-h-0", children: [
      files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilesBar,
        {
          files,
          activeRelPath: current?.relPath,
          mainRelPath: mainFile?.relPath,
          currentDir,
          onDirChange: setCurrentDir,
          onSelect: (f) => setCurrent(f)
        }
      ),
      current ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileViewer,
        {
          embedded: true,
          path: current.absPath,
          title: current.relPath,
          reader,
          writer
        },
        current.absPath
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 text-[12px] text-[var(--text-muted)] text-center", children: "No file selected" })
    ] })
  ] });
}
function compareProjects(left, right) {
  return (right.lastActivityTs ?? 0) - (left.lastActivityTs ?? 0) || left.name.localeCompare(right.name);
}
function reconcileProjectOrder(previousOrder, projects) {
  const currentIds = new Set(projects.map((project) => project.id));
  const retained = previousOrder.filter((projectId) => currentIds.has(projectId));
  const retainedIds = new Set(retained);
  const added = projects.filter((project) => !retainedIds.has(project.id)).sort(compareProjects).map((project) => project.id);
  return [...retained, ...added];
}
function projectSetupStatus(setupSummary, qualifier = "local") {
  const artifactCount = setupSummary?.totalEntries ?? 0;
  const hasSetup = artifactCount > 0;
  const scanned = setupSummary != null;
  const prefix = qualifier ? `${qualifier} ` : "";
  const label = hasSetup ? `${artifactCount} ${prefix}${artifactCount === 1 ? "artifact" : "artifacts"}` : scanned ? `No ${prefix}artifacts` : "Not scanned yet";
  return { artifactCount, hasSetup, scanned, label };
}
function formatProjectAge(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1e3));
  if (seconds < 60) return "now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}
function ProjectLastUsed({ timestamp }) {
  const now = useClock();
  const label = useSetupSurfaceHost().copy?.lastActivityLabel ?? "Last used";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: `${label} ${new Date(timestamp).toLocaleString()}`, side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8.5px] font-medium tabular-nums text-[var(--text-muted)]", children: formatProjectAge(now - timestamp) }) });
}
function ProjectSetupStatus({ project }) {
  const { artifactCount, hasSetup, scanned, label } = projectSetupStatus(
    project.setupSummary,
    useSetupSurfaceHost().copy?.artifactQualifier
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label, side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      style: { width: COMPACT_STATUS_BADGE_SIZE, height: COMPACT_STATUS_BADGE_SIZE },
      className: "inline-flex shrink-0 items-center justify-center rounded-full border text-[6.5px] font-semibold tabular-nums leading-none " + (hasSetup ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]" : "border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/65 text-[var(--text-muted)]"),
      children: [
        hasSetup ? artifactCount : scanned ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 7, strokeWidth: 2.2, "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 6.5, strokeWidth: 2.2, "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: label })
      ]
    }
  ) });
}
function ProjectList({
  projects,
  homeDir,
  onSelectProject,
  selectedProjectId,
  searchMatchIds,
  activeSearchId,
  activeSearchContext,
  activeSearchQuery,
  pageSize,
  footer
}) {
  const normalizedPageSize = pageSize && pageSize > 0 ? Math.floor(pageSize) : void 0;
  const projectOrderRef = reactExports.useRef([]);
  const reconciledProjectOrder = reconcileProjectOrder(projectOrderRef.current, projects);
  reactExports.useEffect(() => {
    projectOrderRef.current = reconciledProjectOrder;
  }, [reconciledProjectOrder]);
  const projectsById = new Map(projects.map((project) => [project.id, project]));
  const orderedProjects = reconciledProjectOrder.flatMap((projectId) => {
    const project = projectsById.get(projectId);
    return project ? [project] : [];
  });
  const activeSearchPosition = activeSearchId ? orderedProjects.findIndex((project) => project.id === activeSearchId) : -1;
  const pagination = useProgressivePagination({
    itemCount: orderedProjects.length,
    pageSize: normalizedPageSize,
    revealIndex: activeSearchPosition
  });
  const renderedCount = pagination.renderedCount;
  const visibleProjects = normalizedPageSize ? orderedProjects.slice(0, renderedCount) : orderedProjects;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    visibleProjects.map((project) => {
      const active = activeSearchId === project.id;
      const searchQuery = active ? activeSearchQuery : void 0;
      const presentsSearchQuery = searchQueryIsPresented(searchQuery, [
        project.name,
        formatHomePath(project.root, homeDir)
      ]);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-project-search-id": project.id,
          className: cn(
            "overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] shadow-[0_1px_0_rgba(36,28,12,0.04)] transition-[background-color,box-shadow]",
            active || selectedProjectId === project.id ? "bg-[color-mix(in_srgb,var(--accent)_10%,var(--bg-inner))] ring-1 ring-inset ring-[var(--accent)]/45" : searchMatchIds?.has(project.id) ? "bg-[color-mix(in_srgb,var(--accent)_5%,var(--bg-inner))]" : null
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 grid-cols-[32px_minmax(0,1fr)_auto] gap-x-2.5 gap-y-0.5 px-2.5 py-2 transition-colors hover:bg-[var(--bg-card-soft)]/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "aria-label": `Open setup for ${project.name}`,
                  "aria-current": selectedProjectId === project.id ? "page" : void 0,
                  "data-slot": "entity-list-row",
                  onClick: () => onSelectProject(project),
                  className: "col-span-2 flex min-w-0 items-center gap-2.5 text-left",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-8 shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed: projectFlowerSeed(project), size: 29 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex min-w-0 items-baseline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[12px] font-medium text-[var(--text-strong)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchHighlightText, { text: project.name, query: searchQuery }) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1 text-[9px] leading-3 text-[var(--text-muted)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ProjectTypeIcon,
                          {
                            kind: project.kind === "git" ? "repo" : "folder",
                            size: 8,
                            strokeWidth: 2,
                            className: "shrink-0 translate-y-px",
                            "aria-hidden": true
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SearchHighlightText,
                          {
                            text: formatHomePath(project.root, homeDir),
                            query: searchQuery
                          }
                        ) })
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "col-start-3 row-start-1 row-span-2 flex shrink-0 flex-col items-end gap-1 self-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSetupStatus, { project }) }),
                project.lastActivityTs ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectLastUsed, { timestamp: project.lastActivityTs }) : null
              ] })
            ] }),
            active && activeSearchContext && !presentsSearchQuery ? /* @__PURE__ */ jsxRuntimeExports.jsx(InlineSearchMatchContext, { category: "projects", context: activeSearchContext }) : null
          ]
        },
        project.id
      );
    }),
    normalizedPageSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaginationBoundary,
      {
        mode: "manual",
        direction: "down",
        hasMore: pagination.hasMore,
        onLoadMore: pagination.loadMore,
        label: "Show more projects",
        detail: `${pagination.remaining} remaining`
      }
    ) : null,
    footer ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: footer.onSelect,
        "aria-label": footer.ariaLabel,
        className: "flex w-full items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-2 text-[9.5px] font-semibold text-[var(--text-muted)] shadow-[0_1px_0_rgba(36,28,12,0.04)] transition-colors hover:bg-[var(--bg-card-soft)]/60 hover:text-[var(--text-strong)]",
        children: footer.label
      }
    ) : null
  ] });
}
function ProjectListSkeleton({ count = 5 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonSurface, { label: "Loading projects", className: "flex flex-col gap-1.5", children: Array.from({ length: count }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-[58px] items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-2.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-1 flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-2/5 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-3/5 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-[13px] rounded-full" })
      ]
    },
    index
  )) });
}
const PROJECT_LIST_PAGE_SIZE = 30;
const PROJECT_CONVERSATION_LIMIT = 50;
function uniqueArtifacts(units) {
  return [...new Map(units.map((unit) => [unit.id, unit])).values()];
}
function uniqueArtifactRelationships(relationships) {
  return [
    ...new Map(
      relationships.map((relationship) => [
        `${relationship.fromUnitId}:${relationship.kind}:${relationship.toUnitId}`,
        relationship
      ])
    ).values()
  ];
}
function SetupOverview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ExplanationPageHeader,
    {
      title: "Global",
      description: "Artifacts and instructions shared across projects."
    }
  );
}
function InventoryHeader({
  label,
  description,
  count,
  countLoading = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 px-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-0.5 w-5 rounded-[2px] bg-[var(--accent)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold tracking-[0.14em] text-[var(--text-strong)]", children: label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] leading-4 text-[var(--text-muted)]", children: description })
    ] }),
    countLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mb-0.5 h-2.5 w-6 shrink-0 rounded" }) : count !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[11px] tabular-nums text-[var(--text-muted)]", children: count }) : null
  ] });
}
function EmptyInventory({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-[var(--border-subtle)] px-3 py-4 text-center text-[11px] text-[var(--text-muted)]", children });
}
function InventorySkeleton({ rows = 4 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SkeletonSurface,
    {
      label: "Loading artifacts",
      className: "divide-y divide-[var(--border-subtle)] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inner)] shadow-[0_1px_0_rgba(36,28,12,0.04)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 bg-[var(--bg-card-soft)]/60 py-1.5 pl-3 pr-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-14 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-7 rounded-lg" })
        ] }),
        Array.from({ length: rows }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-5 rounded-[5px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "block h-2.5 w-2/5 max-w-32 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-1.5 block h-2 w-3/5 max-w-48 rounded" })
          ] })
        ] }, index))
      ]
    }
  );
}
function orderedHarnesses(harnesses) {
  const order = new Map(SOURCES.map((source, index) => [source, index]));
  return [...harnesses].sort(
    (left, right) => (order.get(left.harnessId) ?? Number.MAX_SAFE_INTEGER) - (order.get(right.harnessId) ?? Number.MAX_SAFE_INTEGER) || left.harnessId.localeCompare(right.harnessId)
  );
}
function HarnessInventoryContent({
  harnesses,
  emptyMessage,
  onOpenEntry,
  entryNote,
  showAllEntries = false
}) {
  const [expandedHarnesses, setExpandedHarnesses] = reactExports.useState(() => /* @__PURE__ */ new Set());
  const ordered = orderedHarnesses(harnesses);
  const toggleExpanded = (harnessId) => {
    setExpandedHarnesses((current) => {
      const next = new Set(current);
      if (next.has(harnessId)) next.delete(harnessId);
      else next.add(harnessId);
      return next;
    });
  };
  if (ordered.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyInventory, { children: emptyMessage });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/20", children: ordered.map((harness, index) => {
    const entryCount = countCategoryEntries(harness.categories);
    const tokenCount = countCategoryTokens(harness.categories);
    const expanded = showAllEntries || expandedHarnesses.has(harness.harnessId);
    const visibleCategories = expanded ? harness.categories : takeCategoryEntries(harness.categories, COLLAPSED_HARNESS_ENTRY_COUNT);
    const hiddenCount = showAllEntries ? 0 : Math.max(0, entryCount - COLLAPSED_HARNESS_ENTRY_COUNT);
    const label = harnessLabel(harness.harnessId);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-harness-setup": harness.harnessId,
        className: "px-2.5 py-3 " + (index > 0 ? "border-t border-[var(--border-subtle)]" : ""),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2.5 flex min-w-0 items-center gap-2 px-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CodingToolTile,
              {
                tool: { ...codingToolOfHarness(harness.harnessId, label), present: harness.exists },
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-[11px] font-semibold text-[var(--text-strong)]", children: [
                label,
                " setup"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-[9px] text-[var(--text-muted)]", children: [
                entryCount,
                " ",
                entryCount === 1 ? "instruction" : "instructions",
                tokenCount > 0 ? ` · ${formatTokens$1(tokenCount)} tokens` : ""
              ] })
            ] })
          ] }),
          harness.categories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-dashed border-[var(--border-subtle)] px-3 py-3 text-center text-[11px] text-[var(--text-muted)]", children: "No instructions found for this tool." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            visibleCategories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              CategorySection,
              {
                name: category.name,
                entries: category.entries,
                onOpenEntry,
                entryNote
              },
              category.name
            )),
            hiddenCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleExpanded(harness.harnessId),
                "aria-expanded": expanded,
                "aria-label": `${expanded ? "Show fewer" : `Show ${hiddenCount} more`} ${label} instructions`,
                className: "w-full rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-center text-[10px] font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card-soft)]/70 hover:text-[var(--text-strong)]",
                children: expanded ? "Show less" : `Show ${hiddenCount} more`
              }
            ) : null
          ] })
        ]
      },
      `${harness.harnessId}:${harness.path}`
    );
  }) });
}
const HarnessInventory = reactExports.memo(HarnessInventoryContent);
function SharedProjectInventory({
  categories,
  onOpenEntry,
  entryNote
}) {
  if (categories.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-0.5 text-[10px] font-semibold text-[var(--text-muted)]", children: "Shared project files" }),
    categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategorySection,
      {
        name: category.name,
        entries: category.entries,
        onOpenEntry,
        entryNote
      },
      category.name
    ))
  ] });
}
function ProjectConversationList({
  conversations,
  loading,
  error,
  onOpenConversation
}) {
  if (loading && !conversations) return /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySkeleton, { rows: 5 });
  if (error && !conversations) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: error });
  if (!conversations?.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyInventory, { children: "No conversations found for this project." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    conversations.map((conversation) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AgentConversationCard,
      {
        conv: conversation,
        onSelect: onOpenConversation ? () => onOpenConversation(conversation.ref) : void 0,
        showHeaderAction: false,
        showUserPrompt: false,
        showAgentReply: false,
        showSubAgents: false,
        showTodos: false,
        cardMode: "compact"
      },
      conversation.ref
    )),
    conversations.length >= PROJECT_CONVERSATION_LIMIT ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1 text-center text-[10px] text-[var(--text-muted)]", children: "Showing the 50 most recent conversations" }) : null
  ] });
}
function ProjectWorktreeList({
  project,
  selectedWorkspace,
  homeDir,
  onSelectWorkspace
}) {
  const worktrees = project.workspaceLocations.filter((location) => location.kind === "worktree");
  if (worktrees.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyInventory, { children: "No worktrees found for this project." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "data-testid": "project-worktree-list", className: "m-0 grid list-none gap-0.5 p-0", children: worktrees.map((worktree) => (
    // Each worktree is the folder concept's row; the one the page reads is selected.
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FolderListItem,
      {
        folder: {
          ...folderOfWorkspace(worktree, project, homeDir),
          ...worktree.setupAvailable ? { setupText: "Setup" } : {}
        },
        selected: worktree.id === selectedWorkspace?.id,
        onSelect: () => onSelectWorkspace(worktree),
        selectLabel: `Open setup for ${formatWorkspaceName(worktree.path, project.name, homeDir)}`
      }
    ) }, worktree.id)
  )) });
}
function createSetupPageViewState(contentTab = "setup") {
  return {
    contentTab,
    artifactInventories: {}
  };
}
function artifactInventoryViewState(pageState, key) {
  return pageState.artifactInventories[key] ?? createArtifactInventoryViewState();
}
function ProjectDetail({
  setupOnly = false,
  artifactSyncEnabled,
  project,
  workspace,
  pageState,
  onPageStateChange,
  globalHarnesses,
  onOpenGlobalArtifacts,
  onOpenLocalEntry,
  onOpenGlobalEntry,
  onOpenLocalArtifact,
  onOpenSyncSettings,
  deepLinkSourcePath,
  deepLinkArtifactId,
  onDeepLinkHandled,
  contentTab,
  onContentTabChange,
  onOpenConversation,
  onSelectWorkspace,
  artifactListOpen = false,
  onShowAllArtifacts
}) {
  const host = useSetupSurfaceHost();
  const now = useRelativeActivityClock();
  const setupPath = workspace?.path ?? project.root;
  const { data, loading, error, reload } = useAsync(
    (signal) => setupPath ? host.setup.scanProject(setupPath, {
      signal,
      projectId: project.id,
      workspaceLocationId: workspace?.id
    }) : Promise.reject(new Error("Project setup is unavailable in this runtime.")),
    [host, project.id, setupPath, workspace?.id],
    {
      timeoutMs: 15e3,
      timeoutMessage: "Project artifacts took too long to load."
      // Not cached: a cached read outlives its reader, and leaving a project must cancel its scan.
    }
  );
  const conversations = host.conversations;
  const projectConversations = useAsync(
    () => conversations ? conversations.list({
      projectId: project.id,
      includeDismissed: true,
      limit: PROJECT_CONVERSATION_LIMIT
    }) : Promise.resolve([]),
    [conversations, project.id],
    {
      cache: conversations ? {
        scope: conversations,
        key: `conversations.list:project=${project.id}:dismissed:limit=${PROJECT_CONVERSATION_LIMIT}`
      } : void 0
    }
  );
  reactExports.useEffect(() => {
    if (!conversations) return void 0;
    let timer = null;
    const unsubscribe = conversations.onChanged(() => {
      if (timer !== null) return;
      timer = setTimeout(() => {
        timer = null;
        projectConversations.reload();
      }, 250);
    });
    return () => {
      unsubscribe();
      if (timer !== null) clearTimeout(timer);
    };
  }, [conversations, projectConversations.reload]);
  const rootHarnesses = (data?.harnesses ?? []).filter((harness) => harness.categories.length > 0);
  const rootCategories = removeHarnessDuplicates(data?.categories ?? [], rootHarnesses);
  const localHarnesses = rootHarnesses;
  const sharedCategories = rootCategories;
  const localUnits = uniqueArtifacts(data?.artifacts ?? []);
  const localRelationships = uniqueArtifactRelationships(data?.artifactRelationships ?? []);
  const localDiagnostics = data?.artifactDiagnostics ?? [];
  const localUnitsTruncated = Boolean(data?.artifactsTruncated);
  const legacyLocalCount = countHarnessEntries(localHarnesses) + countCategoryEntries(sharedCategories);
  const localCount = localUnits.length || legacyLocalCount;
  const localLoading = loading && !data;
  const globalUnits = uniqueArtifacts(
    (globalHarnesses ?? []).flatMap((harness) => harness.artifacts ?? [])
  );
  const deleteArtifact = host.setup.deleteArtifact;
  const deleteLocalArtifact = deleteArtifact ? async (artifact) => {
    await deleteArtifact(artifact);
    requestSharePromotion("setup-artifact-deleted");
    reload();
  } : void 0;
  const updateArtifactInventoryViewState = (key) => (state) => {
    onPageStateChange({
      ...pageState,
      artifactInventories: {
        ...pageState.artifactInventories,
        [key]: state
      }
    });
  };
  const appliedDeepLinkPathRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (deepLinkArtifactId) return;
    if (!deepLinkSourcePath || appliedDeepLinkPathRef.current === deepLinkSourcePath) return;
    const normalizedTarget = deepLinkSourcePath.replace(/\\/g, "/");
    const entries = [
      ...localHarnesses.flatMap(
        (harness) => harness.categories.flatMap((category) => category.entries)
      ),
      ...sharedCategories.flatMap((category) => category.entries)
    ];
    const entry = entries.find((candidate) => {
      const paths = [
        candidate.contentPath,
        ...(candidate.files ?? []).flatMap((file) => [file.absPath, file.relPath])
      ];
      return paths.some((path) => path?.replace(/\\/g, "/") === normalizedTarget);
    });
    if (!entry) return;
    appliedDeepLinkPathRef.current = deepLinkSourcePath;
    onOpenLocalEntry(entry);
    onDeepLinkHandled?.();
  }, [
    deepLinkArtifactId,
    deepLinkSourcePath,
    localHarnesses,
    onDeepLinkHandled,
    onOpenLocalEntry,
    sharedCategories
  ]);
  const appliedDeepLinkArtifactRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!deepLinkArtifactId || appliedDeepLinkArtifactRef.current === deepLinkArtifactId || localLoading) {
      return;
    }
    const artifact = localUnits.find((item) => item.id === deepLinkArtifactId);
    if (!artifact) return;
    appliedDeepLinkArtifactRef.current = deepLinkArtifactId;
    onOpenLocalArtifact(artifact, localUnits, localRelationships, localDiagnostics);
    onDeepLinkHandled?.();
  }, [
    deepLinkArtifactId,
    localDiagnostics,
    localLoading,
    localRelationships,
    localUnits,
    onDeepLinkHandled,
    onOpenLocalArtifact
  ]);
  if (artifactListOpen) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex w-full max-w-[1040px] min-w-0 flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InventoryHeader,
        {
          label: "PROJECT ARTIFACTS",
          description: `Everything in ${project.name} that can shape agent behavior, excluding application code.`,
          count: localLoading ? void 0 : localCount,
          countLoading: localLoading
        }
      ),
      localLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySkeleton, { rows: 7 }) : error && !data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: error, onRetry: reload }) : localUnits.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactInventory,
        {
          syncEnabled: artifactSyncEnabled,
          units: localUnits,
          relationships: localRelationships,
          diagnostics: localDiagnostics,
          truncated: localUnitsTruncated,
          kindPriority: PROJECT_ARTIFACT_KIND_PRIORITY,
          pageSize: 30,
          searchCommandKey: `setup-project-artifacts:${project.id}:${workspace?.id ?? "root"}`,
          searchScopeLabel: `${project.name} artifacts`,
          viewState: artifactInventoryViewState(pageState, "project-full"),
          onViewStateChange: updateArtifactInventoryViewState("project-full"),
          onOpenUnit: (unit) => onOpenLocalArtifact(unit, localUnits, localRelationships, localDiagnostics),
          onDeleteUnit: deleteLocalArtifact,
          onOpenSyncSettings
        }
      ) : localCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyInventory, { children: "No project-specific artifacts found." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HarnessInventory,
          {
            harnesses: localHarnesses,
            emptyMessage: "No project-specific tool artifacts found.",
            onOpenEntry: onOpenLocalEntry,
            showAllEntries: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SharedProjectInventory,
          {
            categories: sharedCategories,
            onOpenEntry: onOpenLocalEntry
          }
        )
      ] })
    ] }) });
  }
  const setupContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InventoryHeader,
        {
          label: "IN THIS PROJECT",
          description: host.copy?.projectSetupDescription ? host.copy.projectSetupDescription : workspace ? "Artifacts stored in this worktree." : project.kind === "git" ? "Artifacts stored in the main project folder." : "Artifacts stored in this project folder.",
          count: localLoading ? void 0 : localCount,
          countLoading: localLoading
        }
      ),
      localLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySkeleton, {}) : error && !data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: error, onRetry: reload }) : localCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyInventory, { children: "No project-specific artifacts found." }) : localUnits.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactInventory,
        {
          syncEnabled: artifactSyncEnabled,
          units: localUnits,
          relationships: localRelationships,
          diagnostics: localDiagnostics,
          truncated: localUnitsTruncated,
          kindPriority: PROJECT_ARTIFACT_KIND_PRIORITY,
          previewLimit: 5,
          searchCommandKey: `setup-project-preview:${project.id}:${workspace?.id ?? "root"}`,
          searchScopeLabel: `${project.name} artifacts`,
          viewState: artifactInventoryViewState(pageState, "project-preview"),
          onViewStateChange: updateArtifactInventoryViewState("project-preview"),
          footer: onShowAllArtifacts ? {
            label: "Show all artifacts",
            ariaLabel: `Show all artifacts for ${project.name}`,
            onSelect: onShowAllArtifacts
          } : void 0,
          onOpenUnit: (unit) => onOpenLocalArtifact(unit, localUnits, localRelationships, localDiagnostics),
          onDeleteUnit: deleteLocalArtifact,
          onOpenSyncSettings
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        localHarnesses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          HarnessInventory,
          {
            harnesses: localHarnesses,
            emptyMessage: "No project-specific tool artifacts found.",
            onOpenEntry: onOpenLocalEntry
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(SharedProjectInventory, { categories: sharedCategories, onOpenEntry: onOpenLocalEntry })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlobalSetupGlance,
      {
        units: globalHarnesses ? globalUnits : null,
        onOpen: onOpenGlobalArtifacts,
        fallback: globalHarnesses && harnessesWithEntries(globalHarnesses).length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          HarnessInventory,
          {
            harnesses: harnessesWithEntries(globalHarnesses),
            emptyMessage: "No global artifacts found.",
            onOpenEntry: onOpenGlobalEntry
          }
        ) : void 0
      }
    )
  ] });
  const workspaces = project.workspaceLocations.length ? project.workspaceLocations : [
    {
      id: `${project.id}:root`,
      path: project.root,
      kind: project.kind === "git" ? "repo-root" : "folder-root"
    }
  ];
  const worktrees = workspaces.filter((location) => location.kind === "worktree");
  if (setupOnly) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col gap-3", children: setupContent });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto flex min-h-full w-full max-w-[1040px] min-w-0 flex-col gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PageHeaderViews,
    {
      header: setupProjectHeaderData(project, {
        path: workspace?.path ?? project.root,
        homeDir: host.system.homeDir,
        now
      }),
      value: contentTab ?? pageState.contentTab,
      onValueChange: (tab) => {
        const nextTab = tab;
        onPageStateChange({ ...pageState, contentTab: nextTab });
        onContentTabChange?.(nextTab);
      },
      views: [
        { id: "setup", chip: { concept: "setup", label: "Setup" }, content: setupContent },
        ...conversations ? [
          {
            id: "conversations",
            chip: {
              concept: "conversation",
              count: projectConversations.data?.length,
              label: projectConversations.data?.length === 1 ? "conversation" : "conversations"
            },
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProjectConversationList,
              {
                conversations: projectConversations.data,
                loading: projectConversations.loading,
                error: projectConversations.error,
                onOpenConversation
              }
            )
          }
        ] : [],
        ...host.features?.worktrees === false ? [] : [
          {
            id: "worktrees",
            chip: {
              concept: "worktree",
              count: worktrees.length,
              label: worktrees.length === 1 ? "worktree" : "worktrees"
            },
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProjectWorktreeList,
              {
                project,
                selectedWorkspace: workspace,
                homeDir: host.system.homeDir,
                onSelectWorkspace
              }
            )
          }
        ]
      ]
    }
  ) }) });
}
function createHomeView() {
  return { kind: "home", pageState: createSetupPageViewState() };
}
const syncTargetKey = (target) => target.states.map((state) => state.artifactId).join(",");
function setupViewToken(view, deepLink, pending = null) {
  switch (view.kind) {
    case "home":
      return null;
    case "project":
      if (view.page === "artifacts") return "artifacts";
      return view.project.id === deepLink?.projectId ? pending : `project:${view.project.id}`;
    case "entry":
      return !view.projectScoped && deepLink?.source && deepLink.entryName ? null : `entry:${view.entry.contentPath ?? view.entry.name}`;
    case "artifact":
      return `artifact:${view.artifact.id}`;
    case "global-artifacts":
      return view.artifactKind ? `global:${view.artifactKind}` : "global";
    case "sync-settings":
      return `sync:${syncTargetKey(view.target)}`;
    case "sync-preview":
      return `sync-preview:${syncTargetKey(view.target)}`;
  }
}
function setupViewTitle(view) {
  switch (view.kind) {
    case "home":
      return "Setup";
    case "project":
      return view.page === "artifacts" ? "Artifacts" : view.project.name;
    case "entry":
      return stripExt(view.entry.name);
    case "artifact":
      return view.artifact.name;
    case "global-artifacts":
      return "Global setup";
    case "sync-settings":
      return "Sync settings";
    case "sync-preview":
      return "Sync preview";
  }
}
function setupViewBar(view) {
  if (view.kind === "artifact")
    return {
      concept: ARTIFACT_KIND_LABELS[view.artifact.kind].toLocaleUpperCase(),
      titleLeading: view.artifact.provider && isSource(view.artifact.provider) ? /* @__PURE__ */ jsxRuntimeExports.jsx(HarnessMiniBadge, { harness: view.artifact.provider }) : void 0
    };
  if (view.kind === "sync-settings" || view.kind === "sync-preview") return { concept: "SYNC" };
  if (view.kind === "global-artifacts") return { concept: "GLOBAL" };
  if (view.kind === "project")
    return { concept: view.page === "artifacts" ? "ARTIFACTS" : "PROJECT" };
  return {};
}
function SetupView({
  contentOnly = false,
  namesProject = false,
  artifactSyncEnabled = false,
  appSection,
  deepLink,
  onDeepLinkHandled,
  onLeaveProject,
  onOpenGlobalEntry,
  onProjectContentTabChange,
  onOpenConversation,
  sharePromotionVariant = null,
  onOpenSharePage,
  preloadedData
} = {}) {
  const host = useSetupSurfaceHost();
  const [dataReady, setDataReady] = reactExports.useState(false);
  const artifactMenus = useArtifactActions();
  const pendingToken = reactExports.useRef(null);
  const [view, setView] = useSubViewState(createHomeView, {
    token: (view2) => setupViewToken(view2, deepLink, pendingToken.current),
    title: setupViewTitle,
    bar: setupViewBar,
    parent: (view2) => view2.kind === "project" && view2.page === "artifacts" ? { ...view2, page: "detail" } : "back" in view2 ? view2.back : view2,
    resolve: (token) => resolveSetupToken(token),
    ready: dataReady
  });
  const artifactSyncAccount = useHostResource(
    () => readArtifactSyncAccountAvailability(artifactSyncEnabled, () => host.account.getSession()),
    (onChanged) => artifactSyncEnabled ? host.account.onChanged(onChanged) : () => {
    },
    [host, artifactSyncEnabled],
    // No data reads as 'checking' until the first read (or the last one, cached) answers.
    {
      isEqual: hostSnapshotsEqual,
      cache: { scope: host, key: `setup.artifactSyncAccount:${artifactSyncEnabled}` }
    }
  );
  const artifactSyncAvailable = canReadArtifactSyncState(
    artifactSyncEnabled,
    artifactSyncAccount.data ?? "checking"
  );
  const activeArtifactId = view.kind === "artifact" ? view.artifact.id : null;
  const activeArtifactSync = useHostResource(
    () => artifactSyncAvailable && view.kind === "artifact" ? host.setup.listSyncStates([view.artifact]) : Promise.resolve([]),
    (onChanged) => artifactSyncAvailable ? host.setup.onChanged(onChanged) : () => {
    },
    [host, activeArtifactId, artifactSyncAvailable],
    {
      isEqual: hostSnapshotsEqual,
      cache: artifactSyncAvailable && activeArtifactId !== null ? { scope: host, key: `setup.listSyncStates:${activeArtifactId}` } : void 0
    }
  );
  const [pendingProjectEntryPath, setPendingProjectEntryPath] = reactExports.useState();
  const [pendingProjectArtifactId, setPendingProjectArtifactId] = reactExports.useState();
  const [globalHarnessesRequested, setGlobalHarnessesRequested] = reactExports.useState(
    () => Boolean(preloadedData?.harnesses) || !deepLink?.projectId
  );
  const needsGlobalHarnesses = globalHarnessesRequested || view.kind === "home" && !deepLink?.projectId || Boolean(deepLink?.source) || Boolean(deepLink?.globalArtifacts) || Boolean(deepLink?.sourcePath && !deepLink.projectId);
  const harnesses = useAsync(
    () => needsGlobalHarnesses ? host.setup.browseHarnesses() : Promise.resolve(null),
    [host, needsGlobalHarnesses],
    {
      initialData: preloadedData?.harnesses,
      cache: needsGlobalHarnesses ? { scope: host, key: "setup.browseHarnesses" } : void 0
    }
  );
  const projects = useHostResource(
    () => host.projects.list(),
    (onChanged) => host.projects.onChanged(onChanged),
    [host],
    {
      initialData: preloadedData?.projects,
      isEqual: hostSnapshotsEqual,
      cache: { scope: host, key: "projects.list" }
    }
  );
  reactExports.useEffect(() => setDataReady(harnessesReady() && projectsReady()));
  function harnessesReady() {
    return !needsGlobalHarnesses || harnesses.data != null;
  }
  function projectsReady() {
    return !deepLink?.projectId || projects.data != null;
  }
  function resolveSetupToken(token) {
    const top = (() => {
      let current = view;
      while ("back" in current) current = current.back;
      return current;
    })();
    const projectView = (() => {
      let current = view;
      while (current.kind !== "project" && "back" in current) current = current.back;
      return current.kind === "project" ? current : null;
    })();
    if (token === "artifacts" && projectView) return { ...projectView, page: "artifacts" };
    const [kind, ...rest] = token.split(":");
    const id = rest.join(":");
    if (kind === "global") {
      const artifactKind = id && isArtifactKind(id) ? id : void 0;
      if (!projectView && deepLink?.projectId) return null;
      return { kind: "global-artifacts", artifactKind, back: projectView ?? top };
    }
    if (projectView && deepLink?.projectId) {
      if (kind === "artifact") setPendingProjectArtifactId(id);
      else if (kind === "entry") setPendingProjectEntryPath(id);
      if (kind !== "artifact" && kind !== "entry") return null;
      pendingToken.current = token;
      return { ...projectView, page: "detail" };
    }
    const harnessList = harnesses.data ?? [];
    if (kind === "artifact") {
      const artifacts = uniqueArtifacts(harnessList.flatMap((item) => item.artifacts ?? []));
      const artifact = artifacts.find((item) => item.id === id);
      return artifact ? {
        kind: "artifact",
        artifact,
        artifacts,
        relationships: uniqueArtifactRelationships(
          harnessList.flatMap((item) => item.artifactRelationships ?? [])
        ),
        diagnostics: harnessList.flatMap((item) => item.artifactDiagnostics ?? []),
        projectScoped: false,
        back: top
      } : null;
    }
    if (kind === "entry") {
      const entry = harnessList.flatMap((harness) => harness.categories.flatMap((category) => category.entries)).find((item) => (item.contentPath ?? item.name) === id);
      return entry ? { kind: "entry", entry, projectScoped: false, back: top } : null;
    }
    if (kind === "project") {
      const project = projects.data?.find((item) => item.id === id);
      return project ? {
        kind: "project",
        project,
        back: top,
        pageState: createSetupPageViewState()
      } : null;
    }
    return null;
  }
  const globalTreeOpen = view.kind === "artifact" && view.projectScoped || view.kind === "global-artifacts";
  reactExports.useEffect(() => {
    if (globalTreeOpen) setGlobalHarnessesRequested(true);
  }, [globalTreeOpen]);
  const globalKindToOpen = view.kind === "global-artifacts" && view.artifactKind && !view.tree ? view.artifactKind : void 0;
  const globalHarnessData = harnesses.data;
  reactExports.useEffect(() => {
    if (!globalKindToOpen || !globalHarnessData) return;
    const units = uniqueArtifacts(globalHarnessData.flatMap((harness) => harness.artifacts ?? []));
    const relationships = uniqueArtifactRelationships(
      globalHarnessData.flatMap((harness) => harness.artifactRelationships ?? [])
    );
    const roots = new Set(artifactRootUnits(units, relationships).map((unit) => unit.id));
    const first = units.filter((unit) => unit.kind === globalKindToOpen).sort((a, b) => Number(roots.has(b.id)) - Number(roots.has(a.id)) || compareArtifacts(a, b))[0];
    if (!first) return;
    setView(
      (current) => current.kind === "global-artifacts" && current.artifactKind === globalKindToOpen && !current.tree ? {
        kind: "artifact",
        artifact: first,
        artifacts: units,
        relationships,
        diagnostics: globalHarnessData.flatMap((harness) => harness.artifactDiagnostics ?? []),
        projectScoped: false,
        back: current.back,
        tree: globalArtifactTreeState(units, relationships, globalKindToOpen)
      } : current
    );
  }, [globalKindToOpen, globalHarnessData]);
  const deleteArtifact = host.setup.deleteArtifact;
  const deleteGlobalArtifact = deleteArtifact ? async (artifact) => {
    await deleteArtifact(artifact);
    requestSharePromotion("setup-artifact-deleted");
    harnesses.reload();
  } : void 0;
  const setSynced = host.setup.setSynced;
  const openGlobalEntry = (entry, back) => {
    const source = entry.harnessId ?? deepLink?.source;
    if (onOpenGlobalEntry && source) onOpenGlobalEntry(source, stripExt(entry.name));
    else setView({ kind: "entry", entry, projectScoped: false, back });
  };
  const subHeader = view.kind === "sync-settings" ? { concept: "SYNC", title: "Sync settings", onBack: () => setView(view.back) } : view.kind === "sync-preview" ? { concept: "SYNC", title: "Sync preview", onBack: () => setView(view.back) } : view.kind === "project" ? view.page === "artifacts" ? {
    concept: "ARTIFACTS",
    title: view.project.name,
    onBack: () => setView({ ...view, page: "detail" })
  } : {
    concept: "PROJECT",
    title: view.project.name,
    onBack: onLeaveProject && view.back.kind === "home" ? onLeaveProject : () => setView(view.back)
  } : view.kind === "entry" ? !view.projectScoped && deepLink?.source && deepLink.entryName ? (
    // The address names this entry: it is a page of its own; up goes to its source.
    { title: stripExt(view.entry.name) }
  ) : { title: stripExt(view.entry.name), onBack: () => setView(view.back) } : view.kind === "artifact" ? {
    concept: ARTIFACT_KIND_LABELS[view.artifact.kind].toLocaleUpperCase(),
    title: view.artifact.name,
    titleLeading: view.artifact.provider && isSource(view.artifact.provider) ? /* @__PURE__ */ jsxRuntimeExports.jsx(HarnessMiniBadge, { harness: view.artifact.provider }) : void 0,
    onBack: () => setView(view.back)
  } : view.kind === "global-artifacts" ? { concept: "GLOBAL", title: "Global setup", onBack: () => setView(view.back) } : null;
  const subKey = view.kind === "home" ? null : view.kind === "sync-settings" ? `sync-settings:${view.target.states.map((state) => state.artifactId).join(":")}` : view.kind === "sync-preview" ? `sync-preview:${view.target.states.map((state) => state.artifactId).join(":")}` : view.kind === "entry" ? `entry:${view.entry.contentPath ?? view.entry.name}` : view.kind === "artifact" ? `artifact:${view.artifact.id}` : view.kind === "global-artifacts" ? `global:${view.artifactKind ?? "all"}` : `project:${view.project.id}:${view.workspace?.id ?? "root"}:${view.page ?? "detail"}`;
  const inPageChrome = useInPageChrome();
  useSubHeader(inPageChrome ? null : subHeader, inPageChrome ? null : subKey);
  const projectTitle = !namesProject ? void 0 : view.kind === "project" ? view.project.name : (view.kind === "artifact" || view.kind === "entry" || view.kind === "global-artifacts") && view.back.kind === "project" ? view.back.project.name : void 0;
  usePageBar(
    inPageChrome && projectTitle ? { title: projectTitle } : null,
    inPageChrome ? `${subKey}:${projectTitle ?? ""}` : null
  );
  const appliedDeepLinkRef = reactExports.useRef(null);
  const harnessData = harnesses.data;
  const projectData = projects.data;
  reactExports.useEffect(() => {
    if (!deepLink) return;
    const key = `${deepLink.source ?? ""}|${deepLink.projectId ?? ""}|${deepLink.workspaceLocationId ?? ""}|${deepLink.tab ?? ""}|${deepLink.entryName ?? ""}|${deepLink.sourcePath ?? ""}|${deepLink.artifactId ?? ""}|${deepLink.globalArtifacts ?? ""}`;
    if (!key.replace(/\|/g, "") || appliedDeepLinkRef.current === key) return;
    if (deepLink.globalArtifacts) {
      appliedDeepLinkRef.current = key;
      const artifactKind = deepLink.globalArtifacts === "all" ? void 0 : deepLink.globalArtifacts;
      setView(
        (current) => current.kind === "global-artifacts" && current.artifactKind === artifactKind ? current : { kind: "global-artifacts", artifactKind, back: createHomeView() }
      );
      onDeepLinkHandled?.();
      return;
    }
    if (deepLink.projectId) {
      const project = projectData?.find((item) => item.id === deepLink.projectId);
      if (!project) return;
      appliedDeepLinkRef.current = key;
      setPendingProjectEntryPath(deepLink.sourcePath);
      setPendingProjectArtifactId(deepLink.artifactId);
      setView({
        kind: "project",
        project,
        workspace: project.workspaceLocations.find(
          (location) => location.id === deepLink.workspaceLocationId
        ),
        back: createHomeView(),
        pageState: createSetupPageViewState(deepLink.tab)
      });
      onDeepLinkHandled?.();
      return;
    }
    if (deepLink.source) {
      const harness = harnessData?.find((item) => item.harnessId === deepLink.source);
      if (!harness) return;
      appliedDeepLinkRef.current = key;
      if (deepLink.artifactId) {
        const artifacts = uniqueArtifacts(
          harnessData?.flatMap((item) => item.artifacts ?? []) ?? []
        );
        const artifact = artifacts.find((item) => item.id === deepLink.artifactId);
        if (artifact) {
          setView(
            (current) => current.kind === "artifact" && current.artifact.id === artifact.id ? current : {
              kind: "artifact",
              artifact,
              artifacts,
              relationships: uniqueArtifactRelationships(
                harnessData?.flatMap((item) => item.artifactRelationships ?? []) ?? []
              ),
              diagnostics: harnessData?.flatMap((item) => item.artifactDiagnostics ?? []) ?? [],
              projectScoped: false,
              back: createHomeView()
            }
          );
          onDeepLinkHandled?.();
          return;
        }
      }
      if (deepLink.sourcePath || deepLink.entryName) {
        const normalizedTarget = deepLink.sourcePath?.replace(/\\/g, "/");
        const entry = harness.categories.flatMap((category) => category.entries).find((item) => {
          if (normalizedTarget) {
            const paths = [
              item.contentPath,
              ...(item.files ?? []).flatMap((file) => [file.absPath, file.relPath])
            ];
            if (paths.some((path) => path?.replace(/\\/g, "/") === normalizedTarget)) return true;
          }
          return item.name === deepLink.entryName || stripExt(item.name) === deepLink.entryName;
        });
        if (entry) {
          setView({ kind: "entry", entry, projectScoped: false, back: createHomeView() });
          onDeepLinkHandled?.();
          return;
        }
      }
      setView(createHomeView());
      onDeepLinkHandled?.();
      return;
    }
    if (deepLink.sourcePath) {
      const normalizedTarget = deepLink.sourcePath.replace(/\\/g, "/");
      const match = harnessData?.flatMap((harness) => harness.categories.flatMap((category) => category.entries)).find((item) => {
        const paths = [
          item.contentPath,
          ...(item.files ?? []).flatMap((file) => [file.absPath, file.relPath])
        ];
        return paths.some((path) => path?.replace(/\\/g, "/") === normalizedTarget);
      });
      if (!harnessData) return;
      appliedDeepLinkRef.current = key;
      if (match) {
        setView({ kind: "entry", entry: match, projectScoped: false, back: createHomeView() });
      } else {
        setView(createHomeView());
      }
      onDeepLinkHandled?.();
    }
  }, [deepLink, harnessData, onDeepLinkHandled, projectData]);
  let selectedView = view;
  while ("back" in selectedView && selectedView.kind !== "project") {
    selectedView = selectedView.back;
  }
  let homeView = view;
  while ("back" in homeView) homeView = homeView.back;
  const selectedProjectId = selectedView.kind === "project" ? selectedView.project.id : void 0;
  const selectGlobal = () => {
    setPendingProjectEntryPath(void 0);
    setPendingProjectArtifactId(void 0);
    setView(homeView);
    setGlobalHarnessesRequested(true);
  };
  const renderContent = () => {
    if (view.kind === "sync-settings") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactSyncSettingsPage,
        {
          ...view.target,
          initialDestination: view.initialDestination,
          onPreview: (preview, destination, placements) => setView({
            kind: "sync-preview",
            target: view.target,
            destination,
            placements,
            preview,
            back: { ...view, initialDestination: destination }
          }),
          onDone: () => setView(view.back),
          onChanged: () => {
            activeArtifactSync.reload();
            harnesses.reload();
          }
        },
        view.target.states.map((state) => state.artifactId).join(":")
      );
    }
    if (view.kind === "sync-preview") {
      const destination = view.back.kind === "sync-settings" ? view.back.back : createHomeView();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactSyncPreviewPage,
        {
          preview: view.preview,
          placements: view.placements,
          destination: view.destination,
          states: view.target.states,
          folderPath: view.target.folderPath,
          missing: view.target.states.some((state) => state.missingOnSystem),
          onDone: () => setView(destination),
          onChanged: () => {
            activeArtifactSync.reload();
            harnesses.reload();
          }
        }
      );
    }
    if (view.kind === "entry") {
      const reader = view.projectScoped ? (path) => host.setup.readProjectFile(path) : (path) => host.setup.readEntry(path);
      const write = view.projectScoped ? host.setup.writeProjectFile : host.setup.writeEntry;
      const writer = write ? (path, content2, options) => write(path, content2, options) : null;
      if (view.entry.files && view.entry.files.length > 0) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          SkillViewer,
          {
            embedded: true,
            title: stripExt(view.entry.name),
            files: view.entry.files,
            onBack: () => setView(view.back),
            reader,
            writer
          }
        );
      }
      if (view.entry.contentPath) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileViewer,
          {
            embedded: true,
            path: view.entry.contentPath,
            title: view.entry.name,
            reader,
            writer
          }
        ) });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" });
    }
    if (view.kind === "global-artifacts") {
      const globalList = harnesses.data ?? [];
      const units = uniqueArtifacts(globalList.flatMap((harness) => harness.artifacts ?? []));
      const relationships = uniqueArtifactRelationships(
        globalList.flatMap((harness) => harness.artifactRelationships ?? [])
      );
      const tree = view.tree ?? globalArtifactTreeState(units, relationships, view.artifactKind);
      const section = {
        id: "global",
        label: "Global",
        units,
        relationships,
        diagnostics: globalList.flatMap((harness) => harness.artifactDiagnostics ?? []),
        viewState: tree,
        onViewStateChange: (next) => setView(
          (current) => current.kind === "global-artifacts" ? { ...current, tree: next } : current
        ),
        status: harnesses.error && !harnesses.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: harnesses.error, onRetry: harnesses.reload }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "m-0 px-0.5 type-ui-meta text-[var(--text-muted)]", children: harnesses.data ? "No global artifacts in your home folder." : "Reading your home folder…" })
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactSubPage,
        {
          title: "Global setup",
          concept: "global",
          sections: [section],
          onClose: () => setView(view.back),
          onSelect: (artifact, chosen) => setView({
            kind: "artifact",
            artifact,
            artifacts: chosen.units,
            relationships: chosen.relationships,
            diagnostics: chosen.diagnostics,
            projectScoped: false,
            back: view.back,
            tree
          })
        }
      );
    }
    if (view.kind === "artifact") {
      const reader = view.projectScoped ? (path) => host.setup.readProjectFile(path) : (path) => host.setup.readEntry(path);
      const write = view.projectScoped ? host.setup.writeProjectFile : host.setup.writeEntry;
      const writer = write ? (path, content2, options) => write(path, content2, options) : null;
      const globalList = harnesses.data ?? [];
      const global = view.projectScoped ? {
        id: "global",
        label: "Global",
        units: uniqueArtifacts(globalList.flatMap((harness) => harness.artifacts ?? [])),
        relationships: uniqueArtifactRelationships(
          globalList.flatMap((harness) => harness.artifactRelationships ?? [])
        ),
        diagnostics: globalList.flatMap((harness) => harness.artifactDiagnostics ?? [])
      } : {
        id: "global",
        label: "Global",
        units: view.artifacts,
        relationships: view.relationships,
        diagnostics: view.diagnostics,
        // Chosen in the global tree (a type chip's): the tree keeps its filter and folders.
        ...view.tree ? {
          viewState: view.tree,
          onViewStateChange: (tree) => setView(
            (current) => current.kind === "artifact" ? { ...current, tree } : current
          )
        } : {}
      };
      const sections = view.projectScoped ? [
        {
          id: "project",
          // The project's own name heads its artifacts.
          label: view.back.kind === "project" ? view.back.project.name : "In this project",
          units: view.artifacts,
          relationships: view.relationships,
          diagnostics: view.diagnostics
        },
        global
      ] : [global];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ArtifactSubPage,
        {
          artifact: view.artifact,
          sections,
          details: /* @__PURE__ */ jsxRuntimeExports.jsx(ArtifactDetailsCard, { artifact: view.artifact }),
          onClose: () => setView(view.back),
          onSelect: (artifact, section) => setView({
            ...view,
            artifact,
            artifacts: section.units,
            relationships: section.relationships,
            diagnostics: section.diagnostics,
            projectScoped: section.id === "project"
          }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ArtifactDetailPage,
            {
              artifact: view.artifact,
              menu: artifactMenus.artifact(view.artifact, {
                sync: artifactSyncAvailable ? {
                  synced: Boolean(activeArtifactSync.data?.some((state) => state.artifactId === view.artifact.id)),
                  states: activeArtifactSync.data?.filter((state) => state.artifactId === view.artifact.id),
                  onOpenSettings: (target) => setView({ kind: "sync-settings", target, back: view }),
                  onSetSynced: setSynced && view.artifact.source.type !== "external" && view.artifact.source.runtimePath ? async (enabled) => {
                    const states = await setSynced({ artifacts: [view.artifact], enabled });
                    activeArtifactSync.reload();
                    const failed = states.find((state) => state.status === "error");
                    if (failed) throw new Error(failed.error || "Artifact sync failed.");
                  } : void 0
                } : void 0,
                onDelete: deleteArtifact ? async (artifact) => {
                  await deleteArtifact(artifact);
                  requestSharePromotion("setup-artifact-deleted");
                  if (!view.projectScoped) harnesses.reload();
                  let destination = view.back;
                  while (destination.kind === "artifact") destination = destination.back;
                  setView(destination);
                } : void 0
              }),
              artifacts: view.artifacts,
              relationships: view.relationships,
              diagnostics: view.diagnostics,
              reader,
              writer,
              onOpenArtifact: (artifact) => setView({
                ...view,
                artifact,
                back: view
              })
            },
            view.artifact.id
          )
        }
      );
    }
    const harnessList = harnesses.data ?? [];
    const globalHarnesses = harnessesWithEntries(harnessList);
    const globalHarnessesResolved = harnesses.data !== null;
    const globalUnits = uniqueArtifacts(harnessList.flatMap((harness) => harness.artifacts ?? []));
    const globalRelationships = uniqueArtifactRelationships(
      harnessList.flatMap((harness) => harness.artifactRelationships ?? [])
    );
    const globalDiagnostics = harnessList.flatMap((harness) => harness.artifactDiagnostics ?? []);
    const globalArtifactCount = globalUnits.length || countHarnessEntries(globalHarnesses);
    if (view.kind === "project") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProjectDetail,
        {
          setupOnly: contentOnly,
          artifactSyncEnabled: artifactSyncAvailable,
          project: view.project,
          workspace: view.workspace,
          pageState: view.pageState,
          onPageStateChange: (pageState) => setView(
            (current) => current.kind === "project" && current.project.id === view.project.id && current.workspace?.id === view.workspace?.id ? { ...current, pageState } : current
          ),
          globalHarnesses: harnesses.data,
          onOpenGlobalArtifacts: (artifactKind) => setView({ kind: "global-artifacts", artifactKind, back: view }),
          onOpenLocalEntry: (entry) => setView({ kind: "entry", entry, projectScoped: true, back: view }),
          onOpenGlobalEntry: (entry) => openGlobalEntry(entry, view),
          onOpenLocalArtifact: (artifact, artifacts, relationships, diagnostics) => setView({
            kind: "artifact",
            artifact,
            artifacts,
            relationships,
            diagnostics,
            projectScoped: true,
            back: view
          }),
          onOpenSyncSettings: (target) => setView({ kind: "sync-settings", target, back: view }),
          deepLinkSourcePath: pendingProjectEntryPath,
          deepLinkArtifactId: pendingProjectArtifactId,
          onDeepLinkHandled: () => {
            pendingToken.current = null;
            setPendingProjectEntryPath(void 0);
            setPendingProjectArtifactId(void 0);
          },
          contentTab: deepLink?.projectId === view.project.id ? deepLink?.tab : void 0,
          onContentTabChange: onProjectContentTabChange,
          onOpenConversation,
          onSelectWorkspace: (workspace) => {
            pendingToken.current = null;
            setPendingProjectEntryPath(void 0);
            setPendingProjectArtifactId(void 0);
            setView({
              ...view,
              workspace,
              page: "detail",
              pageState: createSetupPageViewState(view.pageState.contentTab)
            });
          },
          artifactListOpen: view.page === "artifacts",
          onShowAllArtifacts: () => setView({ ...view, page: "artifacts" })
        },
        `${view.project.id}:${view.workspace?.id ?? "root"}`
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto overflow-x-hidden px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SetupOverview, {}),
      artifactSyncAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        MissingSyncedArtifacts,
        {
          onOpenSyncSettings: (target) => setView({ kind: "sync-settings", target, back: view })
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            label: "GLOBAL ARTIFACTS",
            count: globalHarnessesResolved ? globalArtifactCount : void 0
          }
        ),
        harnesses.loading && !harnesses.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySkeleton, {}) : harnesses.error && !harnesses.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: harnesses.error }) : globalUnits.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArtifactInventory,
          {
            syncEnabled: artifactSyncAvailable,
            units: globalUnits,
            relationships: globalRelationships,
            diagnostics: globalDiagnostics,
            searchCommandKey: "setup-global-artifacts",
            searchScopeLabel: "Global artifacts",
            viewState: artifactInventoryViewState(view.pageState, "home-global"),
            onViewStateChange: (state) => setView(
              (current) => current.kind === "home" ? {
                ...current,
                pageState: {
                  ...current.pageState,
                  artifactInventories: {
                    ...current.pageState.artifactInventories,
                    "home-global": state
                  }
                }
              } : current
            ),
            onOpenUnit: (artifact) => setView({
              kind: "artifact",
              artifact,
              artifacts: globalUnits,
              relationships: globalRelationships,
              diagnostics: globalDiagnostics,
              projectScoped: false,
              back: view
            }),
            onDeleteUnit: deleteGlobalArtifact,
            onOpenSyncSettings: (target) => setView({ kind: "sync-settings", target, back: view })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          HarnessInventory,
          {
            harnesses: globalHarnesses,
            emptyMessage: "No global artifacts found in your home directory.",
            onOpenEntry: (entry) => openGlobalEntry(entry, view)
          }
        )
      ] }),
      appSection ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "APP" }),
        appSection
      ] }) : null,
      sharePromotionVariant === "page_footer" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SharePageFooter, { onOpenSharePage }) : null
    ] });
  };
  const subPage = view.kind !== "home" && !(view.kind === "project" && view.page !== "artifacts");
  const content = /* @__PURE__ */ jsxRuntimeExports.jsx(PageTakeover, { active: subPage, children: renderContent() });
  if (contentOnly) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: content });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ColumnLayout,
    {
      primaryHeader: "Setup",
      contentKey: subKey ?? "global",
      compactBackLabel: "Projects",
      primary: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": "Setup projects", className: "flex min-w-0 flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-slot": "entity-list-row",
            "aria-current": !selectedProjectId ? "page" : void 0,
            onClick: selectGlobal,
            className: "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--text-strong)] hover:bg-[var(--bg-card-soft)] aria-[current=page]:bg-[var(--accent-soft)] aria-[current=page]:text-[var(--accent)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 18, "aria-hidden": true }),
              "Global"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex min-w-0 flex-col gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "PROJECTS", count: projects.data?.length }),
          projects.loading && !projects.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectListSkeleton, {}) : projects.error && !projects.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: projects.error }) : !projects.data?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyInventory, { children: "Projects appear here after you use a coding agent in them." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProjectList,
            {
              projects: projects.data,
              homeDir: host.system.homeDir,
              selectedProjectId,
              pageSize: PROJECT_LIST_PAGE_SIZE,
              onSelectProject: (project) => {
                setPendingProjectEntryPath(void 0);
                setPendingProjectArtifactId(void 0);
                setView({
                  kind: "project",
                  project,
                  back: homeView,
                  pageState: createSetupPageViewState()
                });
              }
            }
          )
        ] })
      ] }),
      content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-full min-w-0 flex-col", children: content })
    }
  );
}
export {
  CategorySection as C,
  GlobalSetupGlance as G,
  SetupSurfaceProvider as S,
  SetupView as a,
  isArtifactKind as i
};
//# sourceMappingURL=SetupView-CUJajtTh.js.map

//# debugId=a5fe3022-4b31-5322-b74b-3591db517f73
