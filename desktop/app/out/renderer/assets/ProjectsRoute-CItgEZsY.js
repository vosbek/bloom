
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f47d0af2-927c-588a-9a9f-03d0668cdd54")}catch(e){}}();
import { h2 as normalizePathSeparators, fm as array, g2 as discriminatedUnion, h5 as object, gW as literal, ig as string, fe as _enum, h4 as number, fq as boolean, ix as union, cH as PHASE, cI as PHASES, hd as phaseName, hx as reactExports, gP as jsxRuntimeExports, az as CountTabs, fE as cn, cS as PageContent, bR as HeadingText, c3 as Input, ce as ListControls, aX as DropdownMenuRadioGroup, aY as DropdownMenuRadioItem, ar as ConfigurableListGroup, at as ConfigurableListItem, an as ConceptIcon, a0 as Checkbox, cQ as PageActions, Q as Card, J as Button, hs as projectProcess, fi as applicationLadder, h_ as selectedSuiteScenarios, hX as scenarioRuns, iD as useAppSurface, jk as useRelativeActivityClock, im as testApplicationHeaderData, f0 as Verdict, g8 as executionVerdict, aC as DataTable, eK as TableRow, eJ as TableCell, aB as DELIVERY_CONCEPT_ICONS, fP as countLabel, b5 as Empty, eV as TooltipLabel, g7 as executionName, ir as time, j2 as useOptionalAppRoute, cV as PageHeaderViews, dw as Section, io as testCatalogForState, jm as useRouteField, ja as usePageEscape, gb as findTestApplication, ga as findAcceptanceSet, fk as applicationProject, G as Badge, dm as RunTable, eN as TestExecutionView, al as ColumnLayout, cR as PageColumnCard, ed as SidebarSection, cU as PageHeaderPage, U as CardHeaderTabs, W as CardHeaderTabsList, X as CardHeaderTabsTrigger, eD as TEST_ROLE_ICONS, Y as CardHeaderTabsViewport, V as CardHeaderTabsContent, dx as SectionHeader, hQ as resolveTestTarget, l as Alert, gc as findTestProfile, jd as usePlanSource, jc as usePlanCode, f1 as VerdictFacet, i5 as shortRevision, aI as DetailDisclosure, ds as ScenarioSource, eB as SummaryDiff, dy as SectionInset, dA as SectionListHeading, dj as ReferenceFacts, de as PromptCard, e0 as SettingsSegmentControl, eS as Timeline, eT as TimelineItem, bd as EvidenceGallery, bb as ErrorPage, iR as useDraftForm, aL as Dialog, aO as DialogHeader, aP as DialogTitle, aM as DialogBody, cD as NativeSelect, b2 as ENVIRONMENT_KINDS, b3 as ENVIRONMENT_KIND_NAME, u as ArrowUp, p as ArrowDown, fc as X, d7 as Plus, bC as FormError, aN as DialogFooter, eA as SubViewContext, jr as useSubViewState, cW as PageTakeover, f6 as Workflow, ec as ShieldCheck, R as CardControlsContext, ey as SubPageBackdrop, ez as SubPageLayout, ba as EnvironmentHorizontalItem, g5 as environmentOfConfig, aG as DeliveryPhaseIcon, hH as repositoryMatchKey, gT as ledgerProjectForLocal, gg as formatHomePath, hG as repositoryLabel, iC as useAppRoute, iU as useGitHubConnection, hm as projectDeliveries, fW as deliveryListEntries, hk as projectAgents, hq as projectLocalAgents, gz as improveGroups, gZ as matchLocalProjects, gq as githubUrl, hV as sameProject, gM as isSource, gr as globalSetupPath, fJ as conversationPath, hn as projectDeliveriesRoute, gS as latestVerdict, hl as projectArchived, iW as useHostResource, gw as hostSnapshotsEqual, g0 as devBuildLayout, g1 as devBuildSessionArgs, j7 as useOptionalSidecarHost, iQ as useDevBuild, m as AlertDescription, bI as GitMerge, ew as SubHeaderContext, ex as SubHeaderProvider, bc as ErrorState, gH as inProject, f$ as deliveryRepositories, fZ as deliveryProject, fY as deliveryModelOfEntry, aF as DeliveryListItem, fU as deliveryActions, b6 as EmptyPage, bk as FIRST_TEST_PROMPT, eP as TestScenarioCompactItem, ip as testScenarioOfCatalog, fT as date, eQ as TestSuiteListItem, iq as testSuiteOfAcceptanceSet, hF as repositoryFlowerSeed, j as AgentListItem, ff as agentActions, aR as DropdownMenu, b1 as DropdownMenuTrigger, aW as DropdownMenuMoreIcon, aT as DropdownMenuContent, aU as DropdownMenuItem, aZ as DropdownMenuSeparator, aV as DropdownMenuLabel, fK as conversationTitle, gu as harnessLabel, bD as FormField, v as ArrowUpRight, g4 as environmentKindOf, ay as CopyLine, eq as SquareTerminal, dI as Send, fM as copyText, iP as useDeliveryEvent, i4 as setupPrompt, i3 as setupCommand, dk as RefreshCw, d9 as ProjectAvatar, eE as TEST_RUN_STATES, aj as CodingToolReference, fF as codingToolOfHarness, eO as TestResultFacet, fV as deliveryActivityLabel, em as SourceReference, ic as sourceOfLocation, hj as projectActions, iK as useCloudChatFeature, j8 as useOwnedCodexChats, hW as sameRepository, S as CardHeader, T as CardHeaderLabel, dD as Select, dG as SelectTrigger, dH as SelectValue, dE as SelectContent, dF as SelectItem, cF as OWNED_CLOUD_FILES_OPERATION, j4 as useOptionalHostedData, dR as SettingsGroup, a4 as ChoiceGroup, a5 as ChoiceRow, en as SourcesCard, fH as compact, es as StatusSummaryBadge, hw as reactDomExports, h7 as openSettingsRoute, hu as projectSetup, hc as personSetupGap, iI as useCardControls, j1 as useOpenGitHubSettings, fl as applicationsByProject, gU as listProjects, hr as projectMergeSuggestions, hv as projectSummary, hp as projectForRoute, i$ as useLocation, w as Attention, ea as SetupJourney, h as AgentConnectionDetails, b7 as EmptyStateCard, da as ProjectListItem, cY as PaginationBoundary, gK as isDeliveryArchived, fj as applicationOwns, fh as appRouteHref, iX as useHostedData, iY as useHostedNavigation, bU as HostedPage } from "./index-nrW_ocxo.js";
import { E as EntityPageHeader } from "./EntityPageHeader-CWiFWn4l.js";
import { a as useLocalProjects, u as useGitHubRepositories, b as useProjectConversations } from "./projectsPageData-z5SiU3uh.js";
import { S as SetupSurfaceProvider, a as SetupView, G as GlobalSetupGlance, C as CategorySection, i as isArtifactKind } from "./SetupView-CUJajtTh.js";
import { C as ClusterList, c as clusterActions } from "./ImprovePage-DSaRYyc7.js";
import "./ExplanationPageHeader-C2XeRG4B.js";
import "./hash-DXS7Ca7H.js";
import "./SuggestionDiff-D6FifeP0.js";
import "./FileDiff-CNuZdHKn.js";
import "./FileViewer-DHqmfXyV.js";
import "./writeConflict-BhJC2K4f.js";
function normalizeAbsoluteFolderPath(value) {
  if (/[\u0000-\u001f]/.test(value)) return null;
  const windows = /^[A-Za-z]:/.test(value) || value.startsWith("\\\\") || value.startsWith("//");
  const path = windows ? normalizePathSeparators(value) : value;
  if (path.split("/").some((part) => part === "." || part === "..")) return null;
  if (path.startsWith("//")) {
    if (!/^\/\/[^/?]+\/[^/]+(?:\/.*)?$/.test(path)) return null;
  } else if (windows) {
    if (!/^[A-Za-z]:\/.+/.test(path) || /^[A-Za-z]:\/+\s*$/.test(path)) return null;
  } else if (!path.startsWith("/") || /^\/+$/.test(path)) return null;
  return path.replace(/\/+$/, "");
}
function shellEscape(s) {
  return `'${s.replace(/'/g, `'\\''`)}'`;
}
const WebTestPrPolicy = array(
  discriminatedUnion("driverKind", [
    object({
      suiteId: string().min(1).max(120).regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/),
      driverKind: literal("web-lab"),
      previewKind: literal("web-lab")
    }).strict(),
    object({
      suiteId: string().min(1).max(120).regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/),
      driverKind: literal("browser"),
      previewKind: literal("test-dashboard")
    }).strict()
  ])
).min(1).max(20).refine(
  (rules) => new Set(rules.map((rule) => `${rule.suiteId}:${rule.driverKind}`)).size === rules.length,
  "PR policy rules must be unique"
);
const catalogIdentifier = string().min(1).max(120).regex(
  /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/,
  "Use lowercase letters, numbers, dots, dashes, or underscores"
);
const boundedLabel = string().trim().min(1).max(200);
const repositoryIdentity$1 = string().min(3).max(201).regex(/^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/);
const repositoryPath = string().min(1).max(1024).refine(
  (value) => !value.startsWith("/") && !value.includes("\\") && !value.split("/").some((part) => part === "" || part === "." || part === ".."),
  "Source paths must be normalized repository-relative paths"
);
const adapterRef = catalogIdentifier.describe(
  "A trusted runtime adapter registered outside authored scenario content"
);
const WebTestCapability = _enum([
  "actions",
  "assertions",
  "uploads",
  "downloads",
  "popups",
  "multi-page",
  "storage-state",
  "tracing",
  "video",
  "fixtures",
  "native"
]);
const capabilities = array(WebTestCapability).max(50).optional();
const allowedOrigin = string().max(2048).refine((value) => {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && url.username === "" && url.password === "" && url.origin === value;
  } catch {
    return false;
  }
}, "Allowed origins must be exact HTTP(S) origins without credentials, paths, queries, or fragments");
const VersionedCatalogRef = object({ id: catalogIdentifier, version: number().int().positive() }).strict();
const versionedIdentity = {
  id: catalogIdentifier,
  version: number().int().positive(),
  label: boundedLabel
};
const lifecycleIdentity = {
  enabled: boolean(),
  status: _enum(["active", "disabled", "tombstoned"])
};
const WebTestDriver = object({
  ...versionedIdentity,
  kind: _enum(["browser", "web-lab", "electron"]),
  adapter: adapterRef,
  capabilities
}).strict();
const WebTestAuthentication = object({
  ...versionedIdentity,
  kind: _enum([
    "anonymous",
    "scripted-user-flow",
    "better-auth-admin",
    "trusted-service-session",
    "named"
  ]),
  adapter: adapterRef
}).strict();
const WebTestFixture = object({
  ...versionedIdentity,
  kind: _enum(["none", "named"]),
  adapter: adapterRef,
  lifecycle: object({
    provision: adapterRef,
    reset: adapterRef,
    health: adapterRef,
    cleanup: adapterRef,
    ownership: _enum(["run", "suite-run", "repository"]),
    expirySeconds: number().int().positive().max(604800)
  }).strict().optional()
}).strict();
const WebTestEnvironment = object({
  ...versionedIdentity,
  ...lifecycleIdentity,
  kind: _enum(["local", "managed-local", "pull-request", "staging", "production", "custom"]),
  driver: VersionedCatalogRef,
  authentication: VersionedCatalogRef,
  fixture: VersionedCatalogRef,
  endpoint: object({
    resolution: _enum(["managed", "trusted-reference"]),
    reference: catalogIdentifier
  }).strict(),
  remote: boolean()
}).strict();
const WebTestSurface = object({
  ...versionedIdentity,
  ...lifecycleIdentity,
  description: string().trim().min(1).max(2e3),
  driver: VersionedCatalogRef,
  authentication: VersionedCatalogRef,
  fixture: VersionedCatalogRef,
  capabilities: array(WebTestCapability).max(50),
  allowedOrigins: array(allowedOrigin).max(50).optional(),
  routing: _enum(["path", "hash"]).optional(),
  environments: array(WebTestEnvironment).min(1).max(50)
}).strict();
const WebTestApplication = object({
  ...versionedIdentity,
  ...lifecycleIdentity,
  owner: catalogIdentifier,
  description: string().trim().min(1).max(2e3),
  source: object({ repository: repositoryIdentity$1, path: repositoryPath.optional() }).strict(),
  surfaces: array(WebTestSurface).min(1).max(100)
}).strict();
function refKey(value) {
  return `${value.id}@${value.version}`;
}
function requireUniqueVersioned(values, context, path, label) {
  const identities = /* @__PURE__ */ new Set();
  for (const [index, value] of values.entries()) {
    const key = refKey(value);
    if (identities.has(key)) {
      context.addIssue({
        code: "custom",
        message: `Duplicate ${label} identity "${key}"`,
        path: [...path, index]
      });
    }
    identities.add(key);
  }
}
function requireUniqueIds(values, context, path, label) {
  const ids = /* @__PURE__ */ new Set();
  for (const [index, value] of values.entries()) {
    if (ids.has(value.id)) {
      context.addIssue({
        code: "custom",
        message: `Duplicate active ${label} id "${value.id}"`,
        path: [...path, index, "id"]
      });
    }
    ids.add(value.id);
  }
}
function validateLifecycleState(value, context, path) {
  if (value.enabled !== (value.status === "active")) {
    context.addIssue({
      code: "custom",
      message: "Only active catalog entities may be enabled",
      path: [...path, "enabled"]
    });
  }
}
object({
  schemaVersion: literal(1),
  prPolicy: WebTestPrPolicy.optional(),
  drivers: array(WebTestDriver).min(1).max(100),
  authentications: array(WebTestAuthentication).min(1).max(100),
  fixtures: array(WebTestFixture).min(1).max(100),
  applications: array(WebTestApplication).min(1).max(500)
}).strict().superRefine((catalog, context) => {
  requireUniqueVersioned(catalog.drivers, context, ["drivers"], "driver");
  requireUniqueIds(catalog.drivers, context, ["drivers"], "driver");
  for (const [driverIndex, driver] of catalog.drivers.entries()) {
    if (driver.capabilities && new Set(driver.capabilities).size !== driver.capabilities.length) {
      context.addIssue({
        code: "custom",
        message: "Driver capabilities must be unique",
        path: ["drivers", driverIndex, "capabilities"]
      });
    }
  }
  requireUniqueVersioned(catalog.authentications, context, ["authentications"], "authentication");
  requireUniqueIds(catalog.authentications, context, ["authentications"], "authentication");
  requireUniqueVersioned(catalog.fixtures, context, ["fixtures"], "fixture");
  requireUniqueIds(catalog.fixtures, context, ["fixtures"], "fixture");
  requireUniqueVersioned(catalog.applications, context, ["applications"], "application");
  requireUniqueIds(catalog.applications, context, ["applications"], "application");
  const drivers = new Set(catalog.drivers.map(refKey));
  const driverCapabilities = new Map(
    catalog.drivers.map((driver) => [refKey(driver), new Set(driver.capabilities ?? [])])
  );
  const authentications = new Set(catalog.authentications.map(refKey));
  const fixtures = new Set(catalog.fixtures.map(refKey));
  const validateRefs = (value, path) => {
    for (const [field, known] of [
      ["driver", drivers],
      ["authentication", authentications],
      ["fixture", fixtures]
    ]) {
      const ref = value[field];
      if (!known.has(refKey(ref))) {
        context.addIssue({
          code: "custom",
          message: `Unknown ${field} reference "${refKey(ref)}"`,
          path: [...path, field]
        });
      }
    }
  };
  for (const [applicationIndex, application] of catalog.applications.entries()) {
    validateLifecycleState(application, context, ["applications", applicationIndex]);
    requireUniqueVersioned(
      application.surfaces,
      context,
      ["applications", applicationIndex, "surfaces"],
      `surface in application "${application.id}"`
    );
    requireUniqueIds(
      application.surfaces,
      context,
      ["applications", applicationIndex, "surfaces"],
      `surface in application "${application.id}"`
    );
    for (const [surfaceIndex, surface] of application.surfaces.entries()) {
      const surfacePath = ["applications", applicationIndex, "surfaces", surfaceIndex];
      validateLifecycleState(surface, context, surfacePath);
      validateRefs(surface, surfacePath);
      const repeatedCapabilities = (surface.capabilities ?? []).filter(
        (capability, index) => surface.capabilities?.indexOf(capability) !== index
      );
      if (repeatedCapabilities.length > 0) {
        context.addIssue({
          code: "custom",
          message: `Duplicate surface capability "${repeatedCapabilities[0]}"`,
          path: [...surfacePath, "capabilities"]
        });
      }
      const supportedCapabilities = driverCapabilities.get(refKey(surface.driver));
      for (const [capabilityIndex, capability] of (surface.capabilities ?? []).entries()) {
        if (supportedCapabilities && !supportedCapabilities.has(capability)) {
          context.addIssue({
            code: "custom",
            message: `Surface capability "${capability}" is not supported by driver "${refKey(surface.driver)}"`,
            path: [...surfacePath, "capabilities", capabilityIndex]
          });
        }
      }
      if (surface.allowedOrigins && new Set(surface.allowedOrigins).size !== surface.allowedOrigins.length) {
        context.addIssue({
          code: "custom",
          message: "Surface allowed origins must be unique",
          path: [...surfacePath, "allowedOrigins"]
        });
      }
      requireUniqueVersioned(
        surface.environments,
        context,
        [...surfacePath, "environments"],
        `environment in surface "${surface.id}"`
      );
      requireUniqueIds(
        surface.environments,
        context,
        [...surfacePath, "environments"],
        `environment in surface "${surface.id}"`
      );
      for (const [environmentIndex, environment] of surface.environments.entries()) {
        const environmentPath = [...surfacePath, "environments", environmentIndex];
        validateLifecycleState(environment, context, environmentPath);
        validateRefs(environment, environmentPath);
        if (refKey(environment.driver) !== refKey(surface.driver)) {
          context.addIssue({
            code: "custom",
            message: `Environment driver "${refKey(environment.driver)}" must match its surface driver "${refKey(surface.driver)}"`,
            path: [...environmentPath, "driver"]
          });
        }
      }
    }
  }
});
const WebTestTargetProvenance = object({
  application: VersionedCatalogRef,
  surface: VersionedCatalogRef,
  environment: VersionedCatalogRef,
  driver: VersionedCatalogRef,
  authentication: VersionedCatalogRef,
  fixture: VersionedCatalogRef
}).strict();
function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value !== null && typeof value === "object") {
    const output = {};
    for (const key of Object.keys(value).sort()) {
      const entry = value[key];
      if (entry !== void 0) output[key] = normalize(entry);
    }
    return output;
  }
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new TypeError("Canonical JSON does not support non-finite numbers");
  }
  return value;
}
function canonicalJson(value) {
  return JSON.stringify(normalize(value));
}
const identifier$1 = string().min(1).max(120).regex(
  /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/,
  "Use lowercase letters, numbers, dots, dashes, or underscores"
);
const boundedName = string().trim().min(1).max(200);
const emojiPresentation = new RegExp("\\p{Extended_Pictographic}", "u");
const flagEmoji = new RegExp("^\\p{Regional_Indicator}{2}$", "u");
const keycapEmoji = /^[0-9#*]\uFE0F?\u20E3$/u;
const scenarioEmoji = string().trim().min(1).max(32).refine((value) => {
  const segments = typeof Intl.Segmenter === "function" ? [...new Intl.Segmenter(void 0, { granularity: "grapheme" }).segment(value)] : Array.from(value);
  return segments.length === 1 && (emojiPresentation.test(value) || flagEmoji.test(value) || keycapEmoji.test(value));
}, "Emoji must be exactly one emoji grapheme");
const relativeRoute = string().min(1).max(2048).refine((value) => value.startsWith("/") && !value.startsWith("//") && !value.includes("\\"), {
  message: "Routes must start with one slash and cannot be absolute URLs"
});
const WebTestTargetKind = _enum(["web-lab", "electron", "browser"]);
const LocatorHint = discriminatedUnion("by", [
  object({
    by: literal("role"),
    role: boundedName,
    name: boundedName.optional(),
    exact: boolean().optional()
  }).strict(),
  object({ by: literal("label"), value: boundedName, exact: boolean().optional() }).strict(),
  object({ by: literal("placeholder"), value: boundedName, exact: boolean().optional() }).strict(),
  object({ by: literal("text"), value: boundedName, exact: boolean().optional() }).strict(),
  object({ by: literal("test-id"), value: boundedName }).strict(),
  object({
    by: literal("css"),
    value: string().trim().min(1).max(500).refine((value) => !/(?:xpath\s*=|\/\/)|^\.\./i.test(value), {
      message: "XPath locators are not allowed; provide an approved CSS selector"
    }),
    rationale: string().trim().min(1).max(500)
  }).strict()
]);
const modifierKeys = array(_enum(["Alt", "Control", "Meta", "Shift"])).max(4).optional();
const ScenarioAction = discriminatedUnion("kind", [
  object({ kind: literal("navigate"), route: relativeRoute }).strict(),
  object({
    kind: literal("click"),
    target: LocatorHint,
    button: _enum(["left", "right", "middle"]).optional()
  }).strict(),
  object({
    kind: literal("fill"),
    target: LocatorHint,
    value: string().max(2e4),
    sensitive: boolean().optional()
  }).strict(),
  object({
    kind: literal("select"),
    target: LocatorHint,
    value: union([string(), array(string()).min(1)]),
    sensitive: boolean().optional()
  }).strict(),
  object({ kind: literal("check"), target: LocatorHint }).strict(),
  object({ kind: literal("uncheck"), target: LocatorHint }).strict(),
  object({
    kind: literal("press"),
    target: LocatorHint.optional(),
    key: boundedName,
    modifiers: modifierKeys
  }).strict(),
  object({ kind: literal("hover"), target: LocatorHint }).strict(),
  object({ kind: literal("drag"), source: LocatorHint, target: LocatorHint }).strict(),
  object({
    kind: literal("wait"),
    for: discriminatedUnion("kind", [
      object({ kind: literal("visible"), target: LocatorHint }).strict(),
      object({ kind: literal("hidden"), target: LocatorHint }).strict(),
      object({ kind: literal("route"), route: relativeRoute }).strict(),
      object({ kind: literal("text"), target: LocatorHint, value: boundedName }).strict(),
      object({ kind: literal("network-idle") }).strict()
    ])
  }).strict(),
  object({
    kind: literal("upload"),
    target: LocatorHint,
    fixture: identifier$1
  }).strict()
]);
const TextExpectation = object({
  equals: string().max(2e4).optional(),
  contains: string().max(2e4).optional(),
  matches: string().max(1e3).optional()
}).strict().refine((value) => Object.values(value).filter((entry) => entry !== void 0).length === 1, {
  message: "Specify exactly one of equals, contains, or matches"
});
const ScenarioAssertion = discriminatedUnion("kind", [
  object({ kind: literal("visible"), target: LocatorHint }).strict(),
  object({ kind: literal("hidden"), target: LocatorHint }).strict(),
  object({ kind: literal("enabled"), target: LocatorHint, value: boolean().default(true) }).strict(),
  object({ kind: literal("checked"), target: LocatorHint, value: boolean().default(true) }).strict(),
  object({ kind: literal("text"), target: LocatorHint, expect: TextExpectation }).strict(),
  object({ kind: literal("value"), target: LocatorHint, expect: TextExpectation }).strict(),
  object({
    kind: literal("count"),
    target: LocatorHint,
    value: number().int().min(0).max(1e4)
  }).strict(),
  object({ kind: literal("route"), route: relativeRoute }).strict(),
  object({ kind: literal("title"), expect: TextExpectation }).strict(),
  object({
    kind: literal("accessibility"),
    target: LocatorHint,
    name: boundedName.optional(),
    description: string().trim().min(1).max(1e3).optional()
  }).strict(),
  object({
    kind: literal("screenshot"),
    name: identifier$1,
    target: LocatorHint.optional(),
    maxDifferenceRatio: number().min(0).max(1).optional()
  }).strict(),
  object({
    kind: literal("console"),
    allow: array(string().min(1).max(1e3)).max(50).default([])
  }).strict(),
  object({
    kind: literal("network"),
    allow: array(string().min(1).max(1e3)).max(50).default([])
  }).strict()
]);
const ScenarioStep = object({
  id: identifier$1,
  description: string().trim().min(1).max(500),
  action: ScenarioAction.optional(),
  assertions: array(ScenarioAssertion).max(50).default([]),
  timeoutMs: number().int().min(100).max(12e4).optional(),
  explorationHint: string().trim().min(1).max(1e3).optional()
}).strict().refine((step) => step.action !== void 0 || step.assertions.length > 0, {
  message: "A step must contain an action, at least one assertion, or both"
});
const ScenarioLifecycleStep = object({
  id: identifier$1,
  description: string().trim().min(1).max(500),
  action: ScenarioAction,
  timeoutMs: number().int().min(100).max(12e4).optional()
}).strict();
object({
  schemaVersion: literal(1),
  id: identifier$1,
  title: string().trim().min(1).max(200),
  emoji: scenarioEmoji.optional(),
  intent: string().trim().min(1).max(2e3),
  owner: string().trim().min(1).max(200).optional(),
  source: string().trim().min(1).max(500).optional(),
  tags: array(identifier$1).max(50).default([]),
  suites: array(identifier$1).max(20).default(["default"]),
  /** @deprecated Runtime capability hint retained for schema-v1 readers. */
  targets: array(WebTestTargetKind).min(1).max(3).optional(),
  /** Explicit requirements that cannot be inferred from current action/evidence fields. */
  requiredCapabilities: array(WebTestCapability).max(50).optional(),
  /** Versioned application identity for product-grade authored scenarios. */
  application: VersionedCatalogRef.optional(),
  /** Versioned surfaces within `application`; legacy readers use surfaceIds. */
  surfaces: array(VersionedCatalogRef).min(1).max(20).optional(),
  /** @deprecated Unversioned compatibility identity for schema-v1 readers. */
  applicationId: identifier$1.optional(),
  /** @deprecated Unversioned compatibility identities for schema-v1 readers. */
  surfaceIds: array(identifier$1).min(1).max(20).optional(),
  start: object({ route: relativeRoute }).strict(),
  seed: object({ fixture: identifier$1 }).strict().optional(),
  setup: array(ScenarioLifecycleStep).max(50).optional(),
  cleanup: array(ScenarioLifecycleStep).max(50).optional(),
  environment: object({
    viewport: object({
      width: number().int().min(320).max(3840),
      height: number().int().min(480).max(2160)
    }).strict().default({ width: 1440, height: 900 }),
    colorScheme: _enum(["light", "dark", "no-preference"]).default("light"),
    locale: string().min(2).max(40).default("en-US"),
    timezone: string().min(1).max(100).default("UTC"),
    reducedMotion: _enum(["reduce", "no-preference"]).default("reduce")
  }).strict().default({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
    locale: "en-US",
    timezone: "UTC",
    reducedMotion: "reduce"
  }),
  timeoutMs: number().int().min(1e3).max(9e5).default(3e5),
  cleanRetries: number().int().min(0).max(2).default(1),
  artifactPolicy: object({
    screenshots: _enum(["failure", "steps", "all"]).default("steps"),
    trace: _enum(["off", "failure", "all"]).default("failure"),
    recording: _enum(["off", "failure", "all"]).default("off")
  }).strict().default({ screenshots: "steps", trace: "failure", recording: "off" }),
  steps: array(ScenarioStep).min(1).max(200)
}).strict().superRefine((scenario, context) => {
  if (scenario.requiredCapabilities && new Set(scenario.requiredCapabilities).size !== scenario.requiredCapabilities.length) {
    context.addIssue({
      code: "custom",
      message: "Scenario required capabilities must be unique",
      path: ["requiredCapabilities"]
    });
  }
  if (scenario.application === void 0 !== (scenario.surfaces === void 0)) {
    context.addIssue({
      code: "custom",
      message: "application and surfaces must be authored together",
      path: scenario.application === void 0 ? ["application"] : ["surfaces"]
    });
  }
  if (scenario.applicationId === void 0 !== (scenario.surfaceIds === void 0)) {
    context.addIssue({
      code: "custom",
      message: "applicationId and surfaceIds must be authored together",
      path: scenario.applicationId === void 0 ? ["applicationId"] : ["surfaceIds"]
    });
  }
  if (scenario.application && scenario.applicationId !== void 0) {
    if (scenario.application.id !== scenario.applicationId) {
      context.addIssue({
        code: "custom",
        message: "Versioned and legacy application identities must match during migration",
        path: ["applicationId"]
      });
    }
    const versionedSurfaceIds = scenario.surfaces?.map((surface) => surface.id) ?? [];
    if (JSON.stringify(versionedSurfaceIds) !== JSON.stringify(scenario.surfaceIds)) {
      context.addIssue({
        code: "custom",
        message: "Versioned and legacy surface identities must match during migration",
        path: ["surfaceIds"]
      });
    }
  }
  if (scenario.targets?.includes("browser") && scenario.application === void 0 && scenario.applicationId === void 0) {
    context.addIssue({
      code: "custom",
      message: "Generic browser scenarios require an explicit applicationId and surfaceIds binding",
      path: ["applicationId"]
    });
  }
  if (scenario.surfaceIds && new Set(scenario.surfaceIds).size !== scenario.surfaceIds.length) {
    context.addIssue({
      code: "custom",
      message: "Scenario surface identities must be unique",
      path: ["surfaceIds"]
    });
  }
  if (scenario.surfaces && new Set(scenario.surfaces.map((surface) => `${surface.id}@${surface.version}`)).size !== scenario.surfaces.length) {
    context.addIssue({
      code: "custom",
      message: "Scenario versioned surface identities must be unique",
      path: ["surfaces"]
    });
  }
  const stepIds = /* @__PURE__ */ new Set();
  const phases = [
    ["setup", scenario.setup ?? []],
    ["steps", scenario.steps],
    ["cleanup", scenario.cleanup ?? []]
  ];
  for (const [phase, steps] of phases) {
    for (const [index, step] of steps.entries()) {
      if (stepIds.has(step.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate step id "${step.id}"`,
          path: [phase, index, "id"]
        });
      }
      stepIds.add(step.id);
    }
  }
});
const identifier = string().min(1).max(160).regex(/^[a-zA-Z0-9._:-]+$/);
const compiledRelativeRoute = string().min(1).max(2048).refine((value) => value.startsWith("/") && !value.startsWith("//") && !value.includes("\\"), {
  message: "Routes must start with one slash and cannot be absolute URLs"
});
const CompiledLocator = object({
  primary: LocatorHint,
  fallbacks: array(LocatorHint).max(4).default([]),
  rationale: string().trim().min(1).max(1e3)
}).strict().superRefine((locator, context) => {
  const candidates = [locator.primary, ...locator.fallbacks];
  for (let index = 1; index < candidates.length; index += 1) {
    if (locatorPriority(candidates[index]) < locatorPriority(candidates[index - 1])) {
      context.addIssue({
        code: "custom",
        message: "Locator candidates must stay accessibility-first: role, label, placeholder, text, test ID, then approved CSS",
        path: ["fallbacks", index - 1]
      });
    }
  }
});
function locatorPriority(locator) {
  return {
    role: 0,
    label: 1,
    placeholder: 2,
    text: 3,
    "test-id": 4,
    css: 5
  }[locator.by];
}
const CompiledAction = discriminatedUnion("kind", [
  object({ kind: literal("navigate"), route: compiledRelativeRoute }).strict(),
  object({
    kind: literal("click"),
    target: CompiledLocator,
    button: _enum(["left", "right", "middle"]).optional()
  }).strict(),
  object({
    kind: literal("fill"),
    target: CompiledLocator,
    value: string().max(2e4),
    sensitive: boolean().default(false)
  }).strict(),
  object({
    kind: literal("select"),
    target: CompiledLocator,
    value: union([string(), array(string()).min(1)]),
    sensitive: boolean().default(false)
  }).strict(),
  object({ kind: literal("check"), target: CompiledLocator }).strict(),
  object({ kind: literal("uncheck"), target: CompiledLocator }).strict(),
  object({
    kind: literal("press"),
    target: CompiledLocator.optional(),
    key: string().min(1).max(200),
    modifiers: array(_enum(["Alt", "Control", "Meta", "Shift"])).max(4).default([])
  }).strict(),
  object({ kind: literal("hover"), target: CompiledLocator }).strict(),
  object({ kind: literal("drag"), source: CompiledLocator, target: CompiledLocator }).strict(),
  object({ kind: literal("wait-visible"), target: CompiledLocator }).strict(),
  object({ kind: literal("wait-hidden"), target: CompiledLocator }).strict(),
  object({ kind: literal("wait-route"), route: compiledRelativeRoute }).strict(),
  object({
    kind: literal("wait-text"),
    target: CompiledLocator,
    value: string().min(1).max(2e4)
  }).strict(),
  object({ kind: literal("wait-network-idle") }).strict(),
  object({ kind: literal("upload"), target: CompiledLocator, fixture: identifier }).strict()
]);
const CompiledAssertion = object({
  source: ScenarioAssertion,
  target: CompiledLocator.optional()
}).strict();
const ActionPlanStep = object({
  id: identifier,
  scenarioStepId: identifier,
  description: string().trim().min(1).max(500),
  action: CompiledAction.optional(),
  assertions: array(CompiledAssertion).max(50).default([]),
  preconditions: array(string().trim().min(1).max(1e3)).max(20).optional(),
  expectedPostconditions: array(string().trim().min(1).max(1e3)).max(50).optional(),
  timeoutMs: number().int().min(100).max(12e4)
}).strict().refine((step) => step.action !== void 0 || step.assertions.length > 0, {
  message: "A compiled step must contain an action, at least one assertion, or both"
});
function locatorPreservesSource(compiled, source) {
  return compiled.fallbacks.length === 0 && JSON.stringify(compiled.primary) === JSON.stringify(source);
}
function actionPreservesSource(compiled, source) {
  return actionMatchesSource(compiled, source, locatorPreservesSource);
}
function actionMatchesSource(compiled, source, locatorMatches) {
  switch (source.kind) {
    case "navigate":
      return compiled.kind === "navigate" && compiled.route === source.route;
    case "click":
      return compiled.kind === "click" && compiled.button === source.button && locatorMatches(compiled.target, source.target);
    case "fill":
      return compiled.kind === "fill" && compiled.value === source.value && compiled.sensitive === (source.sensitive ?? false) && locatorMatches(compiled.target, source.target);
    case "select":
      return compiled.kind === "select" && JSON.stringify(compiled.value) === JSON.stringify(source.value) && compiled.sensitive === (source.sensitive ?? false) && locatorMatches(compiled.target, source.target);
    case "check":
    case "uncheck":
    case "hover":
      return compiled.kind === source.kind && locatorMatches(compiled.target, source.target);
    case "press":
      return compiled.kind === "press" && compiled.key === source.key && JSON.stringify(compiled.modifiers) === JSON.stringify(source.modifiers ?? []) && (source.target === void 0 ? compiled.target === void 0 : compiled.target !== void 0 && locatorMatches(compiled.target, source.target));
    case "drag":
      return compiled.kind === "drag" && locatorMatches(compiled.source, source.source) && locatorMatches(compiled.target, source.target);
    case "wait":
      switch (source.for.kind) {
        case "visible":
          return compiled.kind === "wait-visible" && locatorMatches(compiled.target, source.for.target);
        case "hidden":
          return compiled.kind === "wait-hidden" && locatorMatches(compiled.target, source.for.target);
        case "route":
          return compiled.kind === "wait-route" && compiled.route === source.for.route;
        case "text":
          return compiled.kind === "wait-text" && compiled.value === source.for.value && locatorMatches(compiled.target, source.for.target);
        case "network-idle":
          return compiled.kind === "wait-network-idle";
      }
    case "upload":
      return compiled.kind === "upload" && compiled.fixture === source.fixture && locatorMatches(compiled.target, source.target);
  }
}
const ActionPlanLifecycleStep = object({
  id: identifier,
  scenarioStepId: identifier,
  description: string().trim().min(1).max(500),
  source: ScenarioAction,
  action: CompiledAction,
  preconditions: array(string().trim().min(1).max(1e3)).max(20).optional(),
  expectedPostconditions: array(string().trim().min(1).max(1e3)).max(50).optional(),
  timeoutMs: number().int().min(100).max(12e4)
}).strict().superRefine((step, context) => {
  if (!actionPreservesSource(step.action, step.source)) {
    context.addIssue({
      code: "custom",
      message: "A lifecycle plan action must preserve the exact scenario-authored action without fallback locators",
      path: ["action"]
    });
  }
});
const ActionPlan = object({
  schemaVersion: literal(1),
  scenarioId: identifier,
  scenarioHash: string().regex(/^[a-f0-9]{64}$/),
  planHash: string().regex(/^[a-f0-9]{64}$/).optional(),
  compilerVersion: string().min(1).max(100),
  executorProtocolVersion: literal(1),
  createdAt: string().datetime(),
  createdBy: _enum(["ai-exploration", "accepted-repair", "hand-authored"]),
  /** Canonical configured execution driver kind. */
  driverKind: WebTestTargetKind.optional(),
  /** @deprecated Historical plan discriminator; use driverKind. */
  target: WebTestTargetKind.optional(),
  targetProvenance: WebTestTargetProvenance.optional(),
  capabilities: array(WebTestCapability).max(50).optional(),
  assumptions: object({
    viewport: object({ width: number().int(), height: number().int() }).strict(),
    locale: string().min(1),
    timezone: string().min(1)
  }).strict(),
  setup: array(ActionPlanLifecycleStep).max(50).optional(),
  steps: array(ActionPlanStep).min(1).max(500),
  cleanup: array(ActionPlanLifecycleStep).max(50).optional()
}).strict().superRefine((plan, context) => {
  const driverKind = plan.driverKind ?? plan.target;
  if (!driverKind) {
    context.addIssue({
      code: "custom",
      message: "Action plans require driverKind; historical plans may use target",
      path: ["driverKind"]
    });
  }
  if (plan.driverKind && plan.target && plan.driverKind !== plan.target) {
    context.addIssue({
      code: "custom",
      message: "Canonical driverKind and historical target must match when both are present",
      path: ["target"]
    });
  }
  if (driverKind === "browser" && plan.targetProvenance === void 0) {
    context.addIssue({
      code: "custom",
      message: "Generic browser plans require exact target provenance",
      path: ["targetProvenance"]
    });
  }
  if (plan.capabilities && new Set(plan.capabilities).size !== plan.capabilities.length) {
    context.addIssue({
      code: "custom",
      message: "Compiled plan capabilities must be unique",
      path: ["capabilities"]
    });
  }
  const stepIds = /* @__PURE__ */ new Set();
  const phases = [
    ["setup", plan.setup ?? []],
    ["steps", plan.steps],
    ["cleanup", plan.cleanup ?? []]
  ];
  for (const [phase, steps] of phases) {
    for (const [stepIndex, step] of steps.entries()) {
      if (stepIds.has(step.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate compiled step id "${step.id}"`,
          path: [phase, stepIndex, "id"]
        });
      }
      stepIds.add(step.id);
      const action = step.action;
      if ((action?.kind === "fill" || action?.kind === "select") && action.sensitive) {
        context.addIssue({
          code: "custom",
          message: "Sensitive input values cannot be serialized into a committed plan; use an approved runtime fixture binding",
          path: [phase, stepIndex, "action", "value"]
        });
      }
    }
  }
  for (const credential of findLikelyCredentials(plan)) {
    context.addIssue({
      code: "custom",
      message: "A recognizable credential or auth token cannot be committed in an action plan",
      path: credential.path
    });
  }
});
const credentialPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bBearer\s+[A-Za-z0-9._~+/-]{12,}=*/i,
  /\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{16,}\b/,
  /\bsk-[A-Za-z0-9_-]{16,}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
  /\bglpat-[A-Za-z0-9_-]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
  /\bAIza[A-Za-z0-9_-]{20,}\b/,
  /\bvercel_[A-Za-z0-9_-]{20,}\b/,
  /\beyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/
];
function containsLikelyCredential(value) {
  return credentialPatterns.some((pattern) => pattern.test(value));
}
function findLikelyCredentials(value, path = []) {
  if (typeof value === "string") {
    return containsLikelyCredential(value) ? [{ path }] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => findLikelyCredentials(item, [...path, index]));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(
      ([key, item]) => findLikelyCredentials(item, [...path, key])
    );
  }
  return [];
}
function planAssertionSourcesArePreserved(before, after) {
  if (before.steps.length !== after.steps.length) return false;
  const beforeByStep = new Map(before.steps.map((step) => [step.scenarioStepId, step]));
  return after.steps.every((step) => {
    const previous = beforeByStep.get(step.scenarioStepId);
    return previous !== void 0 && previous.assertions.length === step.assertions.length && step.assertions.every(
      (assertion, index) => JSON.stringify(assertion.source) === JSON.stringify(previous.assertions[index]?.source)
    );
  });
}
function compareTestPlans(beforeCode, afterCode) {
  try {
    if (beforeCode.length > 3e4 || afterCode.length > 3e4) return void 0;
    const before = ActionPlan.parse(JSON.parse(beforeCode));
    const after = ActionPlan.parse(JSON.parse(afterCode));
    const changes = [];
    const compare = (field, left, right) => {
      const a = left === void 0 ? void 0 : canonicalJson(left);
      const b = right === void 0 ? void 0 : canonicalJson(right);
      if (a !== b)
        changes.push({
          field,
          before: a === void 0 ? void 0 : JSON.stringify(left, null, 2),
          after: b === void 0 ? void 0 : JSON.stringify(right, null, 2)
        });
    };
    for (const key of /* @__PURE__ */ new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (key === "steps" || key === "setup" || key === "cleanup") {
        const a = before[key] ?? [];
        const b = after[key] ?? [];
        for (let index = 0; index < Math.max(a.length, b.length); index++)
          compare(`${key} ${index + 1}`, a[index], b[index]);
      } else compare(key, before[key], after[key]);
    }
    return {
      assertionsPreserved: new Set(before.steps.map((step) => step.scenarioStepId)).size === before.steps.length && new Set(after.steps.map((step) => step.scenarioStepId)).size === after.steps.length && planAssertionSourcesArePreserved(before, after),
      changes
    };
  } catch {
    return void 0;
  }
}
function comparePlaywrightSource(before, after) {
  const a = before.split("\n"), b = after.split("\n");
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  if (start === a.length && start === b.length)
    return { added: 0, removed: 0, diff: "No source changes." };
  let endA = a.length, endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }
  return {
    added: endB - start,
    removed: endA - start,
    diff: [
      `@@ -${start + 1},${endA - start} +${start + 1},${endB - start} @@`,
      ...a.slice(start, endA).map((line) => `-${line}`),
      ...b.slice(start, endB).map((line) => `+${line}`)
    ].join("\n")
  };
}
const WORK_STEPS = [
  { node: "start", label: phaseName(PHASE.start), tone: "start", phase: PHASE.start, approval: false, who: "You and the agent", detail: "You and the agent", when: "You agree on the outcome and settle the open questions" },
  { node: "plan", label: phaseName(PHASE.plan), tone: "plan", phase: PHASE.plan, approval: false, who: "Agent", detail: "Agent", when: "It reads the code and writes the tasks and the tests that prove them" },
  { node: "build", label: phaseName(PHASE.build), tone: "build", phase: PHASE.build, approval: false, who: "Agent", detail: "Agent", when: "It changes the code" },
  { node: "test", label: phaseName(PHASE.test), tone: "test", phase: PHASE.test, approval: false, who: "Delivery tests", detail: "Delivery tests", when: "Until every test passes; a failure goes back to Build" },
  // Review's two steps: the outcome review, then the merge review once the pull requests are ready.
  { node: "review", label: PHASES[PHASE.outcome].step, tone: "review", phase: PHASE.outcome, approval: true, who: "You", detail: "Outcome approval", when: "You approve the outcome or request changes" },
  { node: "merge", label: PHASES[PHASE.code].step, tone: "merge", phase: PHASE.code, approval: true, who: "You", detail: "Merge approval", when: "Once each pull request is ready to merge, you approve merging it" }
];
const ENVIRONMENT_PROCESS_TONE = {
  local: "test",
  preview: "test",
  staging: "deploy",
  canary: "deploy",
  production: "live"
};
const DONE_STEP = {
  node: "done",
  label: "Done",
  tone: "live",
  phase: PHASE.done,
  approval: false,
  who: "Blume",
  detail: "Every application verified",
  when: "Each application it changes is verified on its last step"
};
function releasePhases(releases) {
  if (!releases.some((step) => step.reached)) return null;
  const release = { node: "phase:release", label: phaseName(PHASE.release), tone: "deploy", phase: PHASE.release, approval: false, who: "Each application", when: "Its code moves along its steps to users" };
  const named = releases.slice(0, -1).flatMap(
    (step) => step.reached ? [{ node: `phase:${step.node}`, label: step.reached, tone: step.tone, phase: PHASE.done, approval: false, who: "Blume", when: `Once it is verified on ${step.label}` }] : []
  );
  return {
    phases: [release, ...named],
    deployedIn: releases.map((_, index) => releases.slice(0, index).filter((step) => step.reached).length)
  };
}
function endStep(releases) {
  const reached = releases.at(-1)?.reached;
  return reached ? { ...DONE_STEP, label: reached } : DONE_STEP;
}
function applicationSteps(entry) {
  const id = entry.application.id;
  const shipped2 = entry.ladder.filter((env) => env.kind !== "local");
  const step = (env, after) => {
    const approval = env.approval === "required" && env.kind !== "preview";
    return {
      node: `${id}:${env.id}`,
      label: env.name,
      environment: env,
      tone: ENVIRONMENT_PROCESS_TONE[env.kind],
      approval,
      who: approval ? "You" : "Automatic",
      detail: env.kind === "preview" ? "Each pull request" : approval ? "Release approval" : "Automatic",
      when: env.kind === "preview" ? "Each pull request, before it merges" : `${approval ? "You release it" : "Deploys"} once ${after ? `${after.name} is verified` : "every pull request has merged"}`,
      ...env.githubEnvironment ? { source: `GitHub “${env.githubEnvironment}”` } : {},
      ...env.reachedName ? { reached: env.reachedName } : {}
    };
  };
  const releases = shipped2.filter((env) => env.kind !== "preview");
  return {
    previews: shipped2.filter((env) => env.kind === "preview").map((env) => step(env)),
    releases: releases.map((env, index) => step(env, releases[index - 1]))
  };
}
function applicationCounts(process, applicationId) {
  const lanes = process.deliveries.flatMap(({ track }) => track.lanes.filter((lane) => lane.application.id === applicationId));
  return {
    underway: lanes.filter((lane) => lane.at !== "live").length,
    live: lanes.filter((lane) => lane.at === "live").length,
    waiting: lanes.filter((lane) => lane.at && lane.steps.some((step) => step.environment.id === lane.at && step.waitingFor === "you")).length
  };
}
function EntityContentTabs({
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  ariaLabel = "Entity content",
  padding = "none",
  className
}) {
  const scope = reactExports.useId();
  const [internalTab, setInternalTab] = reactExports.useState(defaultTab ?? tabs[0]?.id ?? "");
  const requestedTab = activeTab ?? internalTab;
  const selected = tabs.find((tab) => tab.id === requestedTab) ?? tabs[0];
  const selectTab = (tab) => {
    if (activeTab === void 0) setInternalTab(tab);
    onTabChange?.(tab);
  };
  if (!selected) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: cn(
        "flex min-h-0 min-w-0 flex-1 flex-col gap-4",
        padding === "inset" && "px-4 pb-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CountTabs,
          {
            ariaLabel,
            overflow: "scroll",
            value: selected.id,
            onValueChange: selectTab,
            tabs: tabs.map((tab, index) => ({
              id: tab.id,
              label: tab.label,
              count: tab.count,
              concept: tab.concept ?? entityTabConcept(tab.id),
              description: tab.description,
              tone: tab.tone,
              group: index === 1 && tabs[0].count === void 0
            }))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "tabpanel",
            id: `${scope}-entity-tabpanel-${selected.id}`,
            "aria-label": labelOf(selected),
            className: "flex min-h-0 min-w-0 flex-1 flex-col",
            children: selected.content
          }
        )
      ]
    }
  );
}
function labelOf(tab) {
  return typeof tab.label === "string" ? tab.label : tab.count === 1 ? tab.label.one : tab.label.other;
}
function entityTabConcept(id) {
  if (id === "setup") return "setup";
  if (id === "conversations" || id === "conversation") return "conversation";
  if (id === "worktrees") return "worktree";
  if (id === "artifacts" || id === "files") return "artifact";
  if (id === "activity") return "activity";
  return "documentation";
}
function AddProjectPage({
  candidates,
  initial = [],
  projectName,
  onCancel,
  onSubmit
}) {
  const titleId = reactExports.useId();
  const nameId = reactExports.useId();
  const formId = reactExports.useId();
  const [query, setQuery] = reactExports.useState("");
  const [kind, setKind] = reactExports.useState("all");
  const [sort, setSort] = reactExports.useState("recent");
  const search = query.trim().toLocaleLowerCase();
  const visible = candidates.filter(
    (candidate) => (kind === "all" || candidate.kind === kind) && [candidate.label, candidate.location, candidate.detail].some(
      (value) => value.toLocaleLowerCase().includes(search)
    )
  ).sort((a, b) => {
    const byName = a.label.localeCompare(b.label, void 0, { numeric: true, sensitivity: "base" }) || a.location.localeCompare(b.location);
    return sort === "recent" ? (b.lastActivityTs ?? 0) - (a.lastActivityTs ?? 0) || byName : sort === "desc" ? -byName : byName;
  });
  const adding = projectName !== void 0;
  const [chosen, setChosen] = reactExports.useState(() => new Set(initial));
  const [name, setName] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [failed, setFailed] = reactExports.useState(false);
  const picked = candidates.filter((c) => chosen.has(c.location));
  const shownName = name.trim() || picked[0]?.label || "";
  const toggle = (location) => setChosen((current) => {
    const next = new Set(current);
    if (!next.delete(location)) next.add(location);
    return next;
  });
  const submit = async () => {
    if (!picked.length || !shownName || busy) return;
    setBusy(true);
    setFailed(false);
    try {
      if (!await onSubmit(shownName, picked)) setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };
  const count2 = picked.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PageContent,
    {
      as: "section",
      padding: "sm",
      stack: true,
      withActions: true,
      className: "min-h-full",
      "aria-labelledby": titleId,
      "data-add-project": true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h1", size: "xl", id: titleId, children: adding ? `Add sources to ${projectName}` : "Add a project" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: adding ? "Choose the repositories and folders this project also covers." : "A project groups the repositories and folders your agents work in. Choose its sources; you can add more later." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "form",
          {
            id: formId,
            className: adding ? "hidden" : "min-w-0",
            onSubmit: (event) => {
              event.preventDefault();
              void submit();
            },
            children: !adding && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: nameId, className: "grid max-w-[360px] gap-1 type-ui-meta text-muted", children: [
              "Name",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: nameId,
                  value: name,
                  maxLength: 120,
                  placeholder: picked[0]?.label ?? "My project",
                  onChange: (event) => setName(event.target.value)
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "aria-label": "Sources found without a project",
            className: "flex min-w-0 flex-col gap-2.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "search",
                  "aria-label": "Search sources",
                  placeholder: "Search sources…",
                  value: query,
                  onChange: (event) => setQuery(event.target.value)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ListControls,
                {
                  variant: "plain",
                  label: "Sources without a project",
                  count: visible.length,
                  filterLabel: "Filter sources",
                  filterActive: kind !== "all",
                  activeCount: kind === "all" ? 0 : 1,
                  filters: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuRadioGroup, { value: kind, onValueChange: setKind, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "all", children: "All sources" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "repository", children: "Repositories" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "folder", children: "Folders" })
                  ] }),
                  sortLabel: "Sort sources",
                  sorting: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuRadioGroup, { value: sort, onValueChange: setSort, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "recent", children: "Recent activity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "asc", children: "Name A–Z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "desc", children: "Name Z–A" })
                  ] })
                }
              ),
              visible.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConfigurableListGroup,
                {
                  variant: "separate",
                  pageSize: 30,
                  moreLabel: "Show more sources",
                  resetKey: JSON.stringify([query, kind, sort]),
                  children: visible.map((candidate) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ConfigurableListItem,
                    {
                      title: candidate.label,
                      leadingAction: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Checkbox,
                        {
                          checked: chosen.has(candidate.location),
                          "aria-label": `Include ${candidate.label}`,
                          disabled: busy,
                          onCheckedChange: () => toggle(candidate.location)
                        }
                      ),
                      leading: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ConceptIcon,
                        {
                          concept: candidate.kind === "folder" ? "folder-project" : "repo-main",
                          surface: "bare",
                          size: 18
                        }
                      ),
                      selected: chosen.has(candidate.location),
                      onSelect: busy ? void 0 : () => toggle(candidate.location),
                      metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: candidate.kind === "folder" ? "Folder" : "Repository" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: candidate.location, children: candidate.detail })
                      ] })
                    },
                    candidate.location
                  ))
                }
              ) : candidates.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "m-0 type-ui-body text-muted", children: "No sources match these filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: "Every repository and folder Blume found is in a project already. Others show here once an agent works in them on this computer, or once Blume can read them on GitHub." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "compact", elevation: "raised", children: [
          failed && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { role: "alert", className: "m-0 type-ui-meta text-danger", children: [
            "Blume could not ",
            adding ? "add them" : "create the project",
            ". One of them may have joined a project meanwhile; try again."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                form: formId,
                variant: "primary",
                disabled: busy || !count2 || !shownName,
                children: busy ? adding ? "Adding…" : "Creating…" : !adding ? "Create project" : count2 ? `Add ${count2} ${count2 === 1 ? "source" : "sources"}` : "Add sources"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", disabled: busy, onClick: onCancel, children: "Cancel" })
          ] })
        ] }) })
      ]
    }
  );
}
function TestControls({
  state,
  applicationId,
  scenario,
  pending,
  act,
  onRun
}) {
  const catalog = state.tests;
  const app = catalog?.applications.find((a) => a.id === applicationId);
  if (!app || !scenario) return null;
  const latest = catalog.executions.flatMap((execution) => execution.runs.map((run) => ({ execution, run }))).filter(({ run }) => run.scenarioId === scenario.id).sort((a, b) => (b.execution.at ?? 0) - (a.execution.at ?? 0))[0];
  const running = latest && ["queued", "running"].includes(latest.run.verdict);
  const candidate = scenario.plans.find((p) => p.status === "candidate");
  const candidateRunning = candidate && catalog.executions.some(
    (execution) => execution.runs.some(
      (run) => run.scenarioId === scenario.id && run.planVersion === candidate.version && ["queued", "running"].includes(run.verdict)
    )
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h3", size: "sm", children: "Run and review" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: "Your agent writes and runs these tests. You can run the latest version again against the same target, for example after a deploy." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      latest && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          disabled: pending || running,
          onClick: async () => {
            const result = await act("tests_retry", { runId: latest.run.id });
            if (result?.executionId) onRun(result.executionId);
          },
          children: running ? "Running…" : "Run again"
        }
      ),
      scenario.role !== "regression" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          disabled: pending,
          onClick: () => void act("tests_promote", { scenarioId: scenario.id, expectedVersion: state.version }),
          children: "Promote to regression"
        }
      ),
      candidate && !candidateRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          disabled: pending,
          onClick: () => void act("tests_discard_plan", {
            scenarioId: scenario.id,
            planId: candidate.id,
            expectedVersion: state.version
          }),
          children: [
            "Discard v",
            candidate.version
          ]
        }
      )
    ] }),
    candidate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: candidateRunning ? `v${candidate.version} is running. Its result decides whether it becomes current.` : `v${candidate.version} has not run yet. It becomes current once a run of it passes or fails; ask your coding agent to run it, or discard it.` })
  ] });
}
const DAY = 864e5;
function applicationEnvironments({ state, catalog, app }, projectId) {
  if (app.environments?.length) return app.environments;
  const process = projectId ? projectProcess({ projects: state.projects, deliveries: state.deliveries, tests: catalog }, projectId) : void 0;
  return process?.applications.find((entry) => entry.application.id === app.id)?.ladder ?? applicationLadder(app, catalog);
}
function applicationModel(input, environments = applicationEnvironments(input, input.project?.id)) {
  const { catalog, app, scenarios, suites } = input;
  const recent = input.executions.filter((execution) => !execution.candidateValidation).sort((a, b) => b.at - a.at);
  const members = new Map(suites.map((suite) => [suite.id, selectedSuiteScenarios(catalog, suite)]));
  const regression = scenarios.filter((scenario) => scenario.role === "regression");
  const stale = regression.filter((scenario) => {
    const last = scenarioRuns(catalog, scenario.id).find(({ execution }) => !execution.candidateValidation);
    return !last || Date.now() - last.execution.at > DAY;
  });
  const unmatched = regression.filter((scenario) => ![...members.values()].some((items) => items.some((item) => item.id === scenario.id)));
  const attentionCount = new Set([...stale, ...unmatched].map((scenario) => scenario.id)).size;
  const overlaps = app.overlaps ?? [];
  const profiles = app.profiles ?? [];
  const profileName = (id) => profiles.find((profile) => profile.id === id)?.name ?? id;
  const derived = !app.environments?.length;
  const suiteName = (execution) => suites.find((suite) => suite.id === execution.suiteId)?.name ?? execution.label ?? input.sets.find((set) => set.deliveryId === execution.deliveryId)?.title;
  return { ...input, recent, members, regression, stale, unmatched, attentionCount, overlaps, profiles, profileName, environments, derived, suiteName };
}
const EnvironmentIcon = DELIVERY_CONCEPT_ICONS.environment;
const ProfileIcon = DELIVERY_CONCEPT_ICONS["test-profile"];
const reveal = (surface, id) => surface.query(`#${id}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
function useApplicationHeader(a, show) {
  const surface = useAppSurface();
  const now = useRelativeActivityClock();
  const jump = (id) => () => {
    show(id);
    requestAnimationFrame(() => reveal(surface, id));
  };
  const { counts: _counts, ...header } = testApplicationHeaderData(
    {
      state: a.state,
      app: a.app,
      scenarios: a.scenarios,
      environments: a.environments,
      suites: a.suites,
      sets: a.sets,
      recent: a.recent,
      status: a.recent[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx(Verdict, { value: executionVerdict(a.recent[0]) }) : void 0,
      attention: { scenarios: a.attentionCount, overlaps: a.overlaps.length },
      project: a.project,
      now
    },
    {
      onOpenProject: a.nav.onOpenProject,
      onShowRuns: jump("test-application-health"),
      onShowEnvironments: jump("test-application-environments"),
      onShowSuites: jump("test-application-suites"),
      onShowDeliveries: a.nav.showDeliveries,
      onShowAttention: jump("test-application-attention")
    }
  );
  return header;
}
function ScenarioLinks({ a, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { variant: "compact", collapsible: false, pageSize: 10, children: items.map((scenario) => /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListItem, { title: scenario.title, icon: DELIVERY_CONCEPT_ICONS.scenario, onSelect: () => a.nav.openScenario(scenario.id) }, scenario.id)) });
}
function AttentionRows({ a }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ConfigurableListGroup, { variant: "compact", collapsible: false, children: [
    a.stale.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurableListItem,
      {
        title: "Not checked in 24 hours",
        metadata: "Includes regression scenarios that have never run.",
        trailing: a.stale.length,
        subItems: /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioLinks, { a, items: a.stale })
      }
    ),
    a.unmatched.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurableListItem,
      {
        title: "Outside a regression suite",
        metadata: "These scenarios are not selected by any suite.",
        trailing: a.unmatched.length,
        subItems: /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioLinks, { a, items: a.unmatched })
      }
    ),
    a.overlaps.map((overlap, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurableListItem,
      {
        title: "Possible overlap",
        metadata: overlap.reason,
        trailing: overlap.scenarioIds.length,
        subItems: /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioLinks, { a, items: a.catalog.scenarios.filter((scenario) => overlap.scenarioIds.includes(scenario.id)) })
      },
      index
    ))
  ] });
}
function attentionClear(a) {
  return a.regression.length ? "Regression scenarios are up to date and belong to a suite. No overlaps reported." : "No regression scenarios to check yet.";
}
function stepReach(step) {
  const build = step.staticDirectory ? `Static build: ${step.staticDirectory}` : step.managedTarget ? `Managed target: ${step.managedTarget}` : void 0;
  return {
    address: step.url ?? build ?? (step.kind === "preview" ? "One per pull request" : void 0),
    detail: step.url ? build : void 0
  };
}
function EnvironmentTable({ a }) {
  const steps = a.environments;
  const auth = steps.some((step) => step.auth);
  const testData = steps.some((step) => step.testData);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      density: "compact",
      columns: ["Environment", "Address", ...auth ? ["Sign-in"] : [], ...testData ? ["Test data"] : []],
      emptyMessage: "No environments yet.",
      children: steps.map((step) => {
        const { address, detail } = stepReach(step);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 whitespace-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-muted data-[kind=preview]:text-accent data-[kind=staging]:text-status-warning-ink data-[kind=canary]:text-status-warning-ink data-[kind=production]:text-success",
                  "data-kind": step.kind,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnvironmentIcon, { size: 12, "aria-hidden": true })
                }
              ),
              step.name
            ] }),
            step.approval === "required" && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "Release approval" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "break-all", children: [
            address ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Not set" }),
            detail && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: detail })
          ] }),
          auth && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: step.auth ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Not set" }) }),
          testData && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: step.testData ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Not set" }) })
        ] }, step.id);
      })
    }
  );
}
function ProfileTable({ a }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { density: "compact", columns: ["Profile", "Device", "Viewport"], emptyMessage: "No profiles registered.", children: a.profiles.map((profile) => {
    const required = a.scenarios.filter((scenario) => scenario.requiredProfileId === profile.id).length;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileIcon, { size: 12, "aria-hidden": true }),
          profile.name
        ] }),
        required > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
          "Required by ",
          countLabel(required, "scenario")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: profile.device }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: profile.viewport })
    ] }, profile.id);
  }) });
}
function suiteRule(a, suite) {
  return `${countLabel(a.members.get(suite.id)?.length ?? 0, "scenario")} · ${suite.rule?.tags?.length ? `Tags: ${suite.rule.tags.join(", ")}` : suite.rule?.ids?.length ? "Hand-picked" : "Recorded membership"}${suite.exclude.length ? ` · ${suite.exclude.length} excluded` : ""}${suite.include.length ? ` · ${suite.include.length} included` : ""}`;
}
function SuiteLatest({ a, suiteId }) {
  const latest = a.recent.find((execution) => execution.suiteId === suiteId);
  return latest ? /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label: `${executionName(latest)} · ${time(latest.at)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { tabIndex: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Verdict, { value: executionVerdict(latest) }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: "Not run yet" });
}
function SuiteRows({ a, policy = false }) {
  if (!a.suites.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "compact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No regression suites configured." }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { variant: "compact", collapsible: false, pageSize: 10, resetKey: a.app.id, children: a.suites.map((suite) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ConfigurableListItem,
    {
      title: suite.name,
      icon: DELIVERY_CONCEPT_ICONS.suite,
      metadata: policy ? `${suiteRule(a, suite)} · ${suite.policy.length ? `Runs ${suite.policy.map((item) => item.trigger.toLowerCase()).join(", ")}` : "No run policy"}` : suiteRule(a, suite),
      trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(SuiteLatest, { a, suiteId: suite.id }),
      onSelect: () => a.nav.openSuite(suite.id)
    },
    suite.id
  )) });
}
function PolicyTable({ a }) {
  if (!a.suites.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "compact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No run policy configured." }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { density: "compact", columns: ["Suite", "Every PR", "Release", "Nightly", "Profiles"], children: a.suites.map((suite) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "xs", onClick: () => a.nav.openSuite(suite.id), children: suite.name }) }),
    ["Every PR", "Release", "Nightly"].map((trigger) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: suite.policy.some((policy) => policy.trigger === trigger) ? "✓" : "·" }, trigger)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: suite.policy.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      TooltipLabel,
      {
        label: suite.policy.map((policy) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          policy.trigger,
          ": ",
          policy.profiles.map(a.profileName).join(", ") || "Not configured"
        ] }, policy.trigger)),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { tabIndex: 0, className: "block max-w-64 truncate text-xs text-muted", children: [...new Set(suite.policy.flatMap((policy) => policy.profiles))].map(a.profileName).join(", ") || "Not configured" })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Not configured" }) })
  ] }, suite.id)) });
}
function ApplicationPage({ a, overview }) {
  const route = useOptionalAppRoute();
  const [localTab, setLocalTab] = reactExports.useState("overview");
  const tab = route?.route.applicationTab ?? localTab;
  const setTab = (next) => route ? route.update((current) => ({ ...current, applicationTab: next })) : setLocalTab(next);
  const header = useApplicationHeader(a, () => setTab("tests"));
  const views = [
    ...overview ? [{ id: "overview", chip: { concept: "application", label: "Overview" }, content: overview }] : [],
    {
      id: "tests",
      chip: { concept: "tests", count: a.scenarios.length, label: a.scenarios.length === 1 ? "test" : "tests" },
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicationTests, { a })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "@container/application flex min-w-0 flex-col gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderViews, { header, views, value: tab, onValueChange: (id) => setTab(id) }) });
}
function ApplicationTests({ a }) {
  const { recent, suites } = a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "test-application-health", title: "Recent health", caption: "Latest recorded results", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 @min-[480px]/application:grid-cols-3 gap-px bg-border-subtle", children: [
      { label: "Latest run", execution: recent[0] },
      { label: "Release", execution: recent.find((item) => item.trigger === "Release") },
      { label: "Nightly", execution: recent.find((item) => item.trigger === "Nightly") }
    ].map(({ label, execution }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col items-start gap-2 bg-inner p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-label uppercase tracking-ui-label text-muted", children: label }),
      execution ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Verdict, { value: executionVerdict(execution) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "xs", onClick: () => a.nav.openRun(execution.id), children: executionName(execution) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: time(execution.at) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-body", children: "Not run yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: "No recorded result" })
      ] })
    ] }, label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        id: "test-application-attention",
        title: "Needs attention",
        caption: `${countLabel(a.attentionCount, "scenario")} · ${countLabel(a.overlaps.length, "possible overlap")}`,
        children: a.attentionCount || a.overlaps.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(AttentionRows, { a }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "compact", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-xs text-body", children: attentionClear(a) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Section,
      {
        id: "test-application-environments",
        title: "Environments",
        caption: a.derived ? "Derived from its runs and deployments" : "Where tests reach each step",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnvironmentTable, { a })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "test-application-profiles", title: "Profiles", caption: "Screens its tests run on", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileTable, { a }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { id: "test-application-suites", title: `Regression suites · ${suites.length}`, caption: "Coverage and latest result", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SuiteRows, { a }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Run policy", caption: "What runs when", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PolicyTable, { a }) })
  ] });
}
function TestApplicationPage({ overview, ...input }) {
  const { state, catalog, app } = input;
  const projectId = input.project?.id;
  const environments = reactExports.useMemo(() => applicationEnvironments({ state, catalog, app }, projectId), [state, catalog, app, projectId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicationPage, { a: applicationModel(input, environments), overview });
}
function Targets({
  catalog,
  scenario,
  compact: compact2 = false
}) {
  if (!scenario.requiredProfileId) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: compact2 ? "flex min-w-0 items-center gap-1 overflow-hidden" : "flex items-center flex-wrap gap-1",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", color: "warning", size: compact2 ? "xs" : void 0, children: findTestProfile(catalog, scenario.requiredProfileId, scenario.applicationId)?.name ?? scenario.requiredProfileId })
    }
  );
}
function ScenarioRows({
  catalog,
  scenarios,
  selectedId,
  onSelect,
  compact: compact2 = false
}) {
  return scenarios.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    ConfigurableListGroup,
    {
      variant: compact2 ? "compact" : void 0,
      collapsible: false,
      itemStyle: compact2 ? { titleWeight: "regular", iconSurface: "bare", titleWrap: false } : void 0,
      children: scenarios.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigurableListItem,
        {
          title: s.title,
          icon: DELIVERY_CONCEPT_ICONS.scenario,
          selected: s.id === selectedId,
          metadata: compact2 ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(Targets, { catalog, scenario: s }),
          trailing: compact2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Targets, { catalog, scenario: s }) : void 0,
          onSelect: () => onSelect(s.id)
        },
        s.id
      ))
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No scenarios match yet." });
}
const planOrigin = (plan) => plan.definitionChange ? `Updated for definition v${plan.definitionChange.version}` : plan.kind === "repaired" ? "Repaired" : plan.kind === "re-explored" ? "Re-explored" : "Generated";
const planStatus = (plan) => plan.status === "candidate" ? "Candidate · not run yet" : plan.status === "current" ? "Current" : plan.status === "superseded" ? "Superseded" : "Discarded";
const diagnosisLabel = {
  "product-failure": "Product defect",
  "test-drift": "Automation drift (for example a stale locator)",
  "scenario-drift": "Scenario drift",
  flaky: "Flaky result",
  "infrastructure-error": "Blocked environment",
  "needs-review": "Needs review",
  unknown: "Unknown cause"
};
function PlanCard({
  entry,
  catalog,
  scenario,
  onRun
}) {
  const plan = "code" in entry ? entry : void 0;
  const execution = catalog.executions.find((e) => e.id === entry.executionId);
  const previousPlan = scenario.plans.find(
    (p) => p.id === plan?.repairSource?.planId || plan?.previousVersion !== void 0 && p.version === plan.previousVersion
  );
  const planSource = usePlanSource(plan);
  const planCode = planSource.code;
  const previousCode = usePlanCode(previousPlan);
  const sourceDiff = previousCode !== void 0 && planCode !== void 0 ? comparePlaywrightSource(previousCode, planCode) : void 0;
  const comparison = reactExports.useMemo(
    () => previousCode !== void 0 && planCode !== void 0 ? compareTestPlans(previousCode, planCode) : void 0,
    [previousCode, planCode]
  );
  const triggerRunId = plan?.repairSource?.runId ?? plan?.repair?.triggeringRunId;
  const triggerExecution = triggerRunId ? catalog.executions.find(
    (e) => plan?.repairSource ? e.id === plan.repairSource.executionId : e.runs.some((r) => r.id === triggerRunId)
  ) : void 0;
  const trigger = triggerExecution?.runs.find((r) => r.id === triggerRunId);
  const diagnosis = trigger?.attempts.find(
    (attempt) => attempt.id === plan?.repairSource?.attemptId
  )?.diagnosis?.result;
  const usedBy = plan ? scenarioRuns(catalog, scenario.id).filter(
    ({ run, execution: execution2 }) => run.planVersion === plan.version && !execution2.candidateValidation
  ) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h3", size: "lg", children: plan ? `v${plan.version}` : "failed for real" }),
      plan ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", title: "Origin: how this version was produced", children: planOrigin(plan) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "neutral",
            color: plan.status === "current" ? "success" : plan.status === "candidate" ? "warning" : "neutral",
            title: "Status: a version becomes current once it runs",
            children: planStatus(plan)
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", children: "failed for real" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "cp-muted", children: [
        time(entry.at),
        " · ",
        entry.by
      ] })
    ] }),
    plan ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      !plan.sourceBinding && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "warn", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Legacy automation artifact. This version uses the earlier execution format. Its history and evidence are preserved." }) }),
      plan.definitionChange && /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "m-0 grid gap-3 [&_dt]:type-ui-meta [&_dt]:text-muted [&_dd]:m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Expected behavior changed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: plan.definitionChange.reason })
      ] }) }),
      plan.kind === "repaired" || plan.repairSource ? /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "m-0 grid gap-3 [&_dt]:type-ui-meta [&_dt]:text-muted [&_dd]:m-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Repair reason" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: plan.note })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Prompted by" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: triggerExecution ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-2", children: [
            trigger && /* @__PURE__ */ jsxRuntimeExports.jsx(
              VerdictFacet,
              {
                form: "badge",
                verdict: trigger.verdict === "failed" ? "failed" : trigger.verdict === "blocked" ? "blocked" : "passed"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "link",
                size: "sm",
                onClick: () => onRun(triggerExecution.id),
                children: [
                  triggerExecution ? executionName(triggerExecution) : "Failed run",
                  trigger ? ` · ${shortRevision(trigger.revision)}` : ""
                ]
              }
            )
          ] }) : "The triggering run was not recorded." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "What broke" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: diagnosis ? `${diagnosisLabel[diagnosis.classification] ?? diagnosis.classification} · ${diagnosis.summary}` : "No diagnosis was recorded; the cause is unknown." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "Agent’s explanation of intent (not independent proof)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: plan.sourceBinding?.intentExplanation || plan.faithfulness })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        !plan.definitionChange && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: plan.note }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "cp-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Agent’s explanation:" }),
          " ",
          plan.faithfulness
        ] })
      ] }),
      plan.provenance && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "cp-muted", children: plan.agentSubmission ? "Agent-submitted source" : "Agent-reported framework result" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Repair considered: ",
        "considered" in entry && entry.considered
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "cp-muted", children: [
        "Rejected: ",
        "rejected" in entry && entry.rejected
      ] })
    ] }),
    execution && !plan?.repairSource && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "link", size: "sm", onClick: () => onRun(execution.id), children: executionName(execution) }),
    plan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      plan.status === "candidate" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "warn", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This version has not run yet. It becomes current once a run of it passes or fails; until then the current version stays in use. Ask your coding agent to run it, or discard it in Run and review." }) }),
      sourceDiff && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DetailDisclosure,
        {
          id: "source-changes",
          title: `Source changes from v${previousPlan?.version}`,
          summary: /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryDiff, { added: sourceDiff.added, removed: sourceDiff.removed }),
          defaultOpen: plan.kind === "repaired",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioSource, { code: sourceDiff.diff, language: "diff" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: "Source differences do not prove that intent was preserved. Review the definition and the runs that used this version." })
          ]
        }
      ),
      plan.repairSource && !plan.sourceBinding && /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailDisclosure,
        {
          id: "plan-comparison",
          title: `Compare with previous plan${previousPlan ? ` v${previousPlan.version}` : ""}`,
          summary: comparison ? `${countLabel(comparison.changes.length, "field")} changed` : void 0,
          fit: "list",
          children: comparison ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionInset, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-body text-body", children: [
              comparison.assertionsPreserved ? "Recorded assertion sources are unchanged." : "Recorded assertion sources differ. Review these changes before it runs.",
              " ",
              "This comparison is not a test result."
            ] }) }),
            comparison.changes.map((change) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionListHeading,
                {
                  trailing: change.before === void 0 ? "added" : change.after === void 0 ? "removed" : "changed",
                  children: change.field
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionInset, { children: [
                change.before !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h4", size: "sm", children: "Previous" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioSource, { code: change.before, language: "typescript" })
                ] }),
                change.after !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h4", size: "sm", children: "Candidate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioSource, { code: change.after, language: "typescript" })
                ] })
              ] })
            ] }, change.field))
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SectionInset, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "Comparison unavailable. Inspect the retained plan source before it runs." }) })
        }
      ),
      plan.sourceBinding && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "cp-muted", children: [
        "Executable Playwright Test source · revision",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: plan.sourceBinding.revision.slice(0, 12) })
      ] }),
      plan.agentSubmission && /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailDisclosure, { id: "agent-exploration", title: "Coding-agent exploration", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "cp-muted", children: [
          "Submitted by ",
          plan.agentSubmission.harness,
          ". These are reported observations, not test results."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: plan.agentSubmission.observations.map((observation, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          observation.stepId,
          ": ",
          observation.description,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: observation.url }),
          observation.captureUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, type: "button", variant: "link", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: observation.captureUrl, target: "_blank", rel: "noreferrer", children: "Open reported capture" }) })
        ] }, index)) })
      ] }),
      planCode === void 0 ? planSource.failed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { role: "alert", className: "cp-muted", children: [
        "Blume could not read this version's source.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "link", size: "sm", onClick: planSource.retry, children: "Try again" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: "Loading this version's source…" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioSource, { code: planCode, language: plan.sourceBinding ? "typescript" : "json" }),
      plan.sourceBinding && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailDisclosure, { id: "source-binding", title: "Source binding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReferenceFacts,
        {
          rows: [
            ["SHA-256", /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: plan.sourceBinding.sourceHash })],
            ["Definition", /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: plan.sourceBinding.definitionHash })]
          ]
        }
      ) }),
      catalog.executions.some((e) => e.candidateValidation?.planId === plan.id) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h4", size: "sm", children: "Earlier validation replays" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: "Kept for history; they are not delivery evidence." }),
        catalog.executions.filter((e) => e.candidateValidation?.planId === plan.id).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "link",
            size: "sm",
            onClick: () => onRun(e.id),
            children: [
              executionName(e),
              " · ",
              e.runs.map((r) => r.verdict).join(", ")
            ]
          },
          e.id
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HeadingText, { as: "h4", size: "sm", children: [
          "Runs that used v",
          plan.version,
          " · ",
          usedBy.length
        ] }),
        usedBy.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 grid list-none gap-1 p-0", children: usedBy.map(({ execution: execution2, run }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Verdict, { value: run.verdict }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "link",
              size: "sm",
              onClick: () => onRun(execution2.id),
              children: executionName(execution2)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "type-ui-meta text-muted", children: [
            shortRevision(run.revision),
            " · ",
            run.environment,
            " · ",
            time(execution2.at)
          ] })
        ] }, run.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted", children: "No run has used this version yet." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "cp-muted", children: [
        plan.previousVersion ? `from v${plan.previousVersion} · +${plan.added ?? 0} −${plan.removed ?? 0} · ` : "",
        planCode === void 0 ? "Source stored" : `${planCode.split("\n").length} lines`
      ] })
    ] })
  ] });
}
function operationValue(value) {
  if (typeof value !== "string") return String(value);
  try {
    const locator = JSON.parse(value);
    if (locator && typeof locator === "object" && "by" in locator) {
      const fields = locator;
      if (typeof fields.by === "string") {
        return Object.entries(fields).filter(([, field]) => typeof field === "string").map(
          ([key, field]) => key === "by" ? field : key === fields.by ? `“${field}”` : `${key} “${field}”`
        ).join(" · ");
      }
    }
  } catch {
  }
  return `“${value}”`;
}
function Operation({ value, assertion = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1 py-1 type-ui-meta leading-relaxed data-[assertion=true]:[&>strong]:text-status-success-ink [&>strong]:text-status-warning-ink [&_[data-operation]]:text-status-warning-ink data-[assertion=true]:[&_[data-operation]]:text-status-success-ink",
      "data-assertion": assertion,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "type-ui-meta font-medium uppercase tracking-ui-label", children: assertion ? "Assert" : "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 font-mono type-ui-meta wrap-anywhere [&_[data-literal=string]]:text-status-success-ink [&_[data-literal=number]]:text-code-number [&_[data-literal=boolean]]:text-code-boolean", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-operation": true, className: "rounded-sm bg-subtle px-1.5 py-0.5", children: value.kind }),
          Object.entries(value.fields).map(([key, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted", children: [
              key,
              " "
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-literal": typeof v, children: operationValue(v) })
          ] }, key))
        ] })
      ]
    }
  );
}
function Definition({ scenario, catalog }) {
  const [raw, setRaw] = reactExports.useState(false);
  const definition = scenario.definition;
  const current = scenario.plans.find((p) => p.status === "current");
  if (!definition)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No scenario.yaml recorded. Ask your agent to register the scenario through MCP." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PromptCard,
        {
          label: "Ask your agent",
          prompt: `Register the scenario.yaml for the Blume test scenario “${scenario.title}”.`
        }
      )
    ] });
  const steps = [...definition.setup, ...definition.steps];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "@container/definition flex min-w-0 flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "code",
          {
            className: "truncate flex-1 min-w-0 font-mono text-xs text-muted",
            title: definition.path,
            children: definition.path
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSegmentControl,
          {
            label: "Scenario definition format",
            value: raw ? "yaml" : "steps",
            options: [
              { value: "steps", label: "Steps" },
              { value: "yaml", label: "Raw YAML" }
            ],
            onValueChange: (value) => setRaw(value === "yaml")
          }
        )
      ] }),
      raw ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScenarioSource, { code: definition.yaml, language: "yaml" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-strong", children: scenario.intent }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-2 @min-[520px]/definition:grid-cols-3 @min-[760px]/definition:grid-cols-4 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle [&_dt]:text-muted [&_dt]:type-ui-label [&_dt]:uppercase [&_dt]:tracking-ui-label [&_dd]:mt-1 [&_dd]:m-0 [&_dd]:text-xs [&_dd]:leading-relaxed", children: [
          ["Scenario id", scenario.id],
          ["Start", [definition.start, definition.seed].filter(Boolean).join(" · ")],
          ["Environment", definition.environment],
          [
            "Profile",
            findTestProfile(catalog, scenario.requiredProfileId, scenario.applicationId)?.name ?? scenario.requiredProfileId ?? "Any"
          ],
          ["Tags", scenario.tags.join(", ") || "None"],
          [
            "Shape",
            definition.schemaVersion === 2 ? `${definition.steps.length} steps · ${steps.reduce((n, s) => n + (s.expectedOutcomes?.length ?? 0), 0)} expected outcomes` : `${definition.steps.length} steps · ${steps.filter((s) => s.action).length} actions · ${steps.reduce((n, s) => n + s.assertions.length, 0)} assertions`
          ],
          [
            "Reference captures",
            current ? `${current.captures.length} · from plan v${current.version}` : "No current version"
          ]
        ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: label === "Reference captures" ? "col-span-full min-w-0 bg-inner p-3" : "min-w-0 bg-inner p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "dd",
                {
                  className: label === "Scenario id" ? "truncate" : "break-words",
                  title: typeof value === "string" ? value : void 0,
                  children: value
                }
              )
            ]
          },
          String(label)
        )) })
      ] })
    ] }),
    !raw && definition.preconditions?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h3", size: "sm", children: "Preconditions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 list-disc pl-4", children: definition.preconditions.map((condition, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: condition }, i)) })
    ] }) : null,
    !raw && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Section,
      {
        title: `Steps · ${definition.steps.length}`,
        caption: definition.schemaVersion === 2 ? `Authored definition v${definition.version ?? 1}` : `Legacy definition · ${definition.setup.length} setup · ${steps.filter((step) => step.action).length} actions · ${steps.reduce((count2, step) => count2 + step.assertions.length, 0)} assertions`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { variant: "steps", density: "compact", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TimelineItem,
            {
              tone: "accent",
              title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block rounded-sm bg-card-soft px-2 py-1 font-medium", children: step.description }),
              marker: i < definition.setup.length ? "INIT" : i - definition.setup.length + 1,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  step.expectedOutcomes && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 list-disc pl-4", children: step.expectedOutcomes.map((outcome, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: outcome }, j)) }),
                  step.action && /* @__PURE__ */ jsxRuntimeExports.jsx(Operation, { value: step.action }),
                  " ",
                  step.assertions.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Operation, { value: a, assertion: true }, j))
                ] }),
                current?.captures.some((c) => c.stepId === step.id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EvidenceGallery,
                  {
                    items: current.captures.map((c) => ({
                      ...c,
                      stepNumber: steps.findIndex((s) => s.id === c.stepId) - definition.setup.length + 1,
                      stepTitle: steps.find((s) => s.id === c.stepId)?.description ?? c.stepTitle
                    })),
                    visibleStep: i - definition.setup.length + 1,
                    compact: true,
                    referenceVersion: current.version,
                    context: `reference · current plan v${current.version} · ${time(current.at)}`
                  }
                ) })
              ] })
            },
            step.id
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "The YAML defines the scenario. Playwright plans are generated from it; reference captures belong to the current plan." })
        ]
      }
    )
  ] });
}
function ScenarioPage({
  scenario,
  catalog,
  onRun,
  onVersions,
  onSuite
}) {
  const [tab, setTab] = useRouteField("scenarioTab");
  const [entryId, setEntryId] = useRouteField("version");
  const entries = [...scenario.plans, ...scenario.failures];
  const current = entryId ? entries.find((e) => e.id === entryId) : scenario.plans.find((p) => p.status === "current") ?? entries.at(-1);
  const history = scenarioRuns(catalog, scenario.id);
  const views = [
    {
      id: "definition",
      label: "Definition",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(Definition, { scenario, catalog })
    },
    {
      id: "playwright",
      label: `Playwright${scenario.plans.find((plan) => plan.status === "current") ? ` v${scenario.plans.find((plan) => plan.status === "current").version}` : ""}`,
      content: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
          entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: current?.id === e.id ? "secondary" : "ghost",
              size: "sm",
              onClick: () => setEntryId(e.id),
              children: "code" in e ? `v${e.version} · ${planOrigin(e)}${e.status === "current" ? " · current" : e.status === "candidate" ? " · candidate" : ""}` : `failed · ${catalog.executions.find((x) => x.id === e.executionId)?.number ?? "run"}`
            },
            e.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "link", size: "sm", onClick: onVersions, children: "All versions ›" })
        ] }),
        current ? /* @__PURE__ */ jsxRuntimeExports.jsx(PlanCard, { entry: current, catalog, scenario, onRun }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: entryId ? "The selected automation version is unavailable." : "No automation generated yet. Use Run and review tests to explore the scenario and review the generated source." })
      ] })
    },
    {
      id: "runs",
      label: "Runs",
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RunTable,
        {
          catalog,
          executions: catalog.executions,
          scenarioId: scenario.id,
          onOpen: onRun
        },
        scenario.id
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EntityPageHeader,
      {
        title: scenario.title,
        subtitle: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", size: "sm", children: scenario.role === "scratch" ? "Ad-hoc" : scenario.role === "regression" ? "Regression" : "Delivery" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: catalog.applications.find((a) => a.id === scenario.applicationId)?.name })
        ] }),
        description: scenario.intent
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "m-0 grid gap-2 text-xs [&>div]:grid [&>div]:grid-cols-[4.5rem_minmax(0,1fr)] [&>div]:items-baseline [&>div]:gap-3 [&_dt]:type-ui-label [&_dt]:tracking-ui-label [&_dt]:text-muted [&_dd]:m-0 [&_dd]:min-w-0 [&_dd]:leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "ORIGIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { children: [
          scenario.origin.deliveryTitle ?? scenario.origin.scratchTitle ?? "No origin recorded",
          scenario.origin.taskTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block type-ui-meta text-muted", children: scenario.origin.taskTitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: "SUITES" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "flex flex-wrap items-center gap-1.5", children: [
          catalog.suites.filter(
            (suite) => selectedSuiteScenarios(catalog, suite).some((item) => item.id === scenario.id)
          ).map((suite) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "xs",
              onClick: () => onSuite(suite.id),
              children: suite.name
            },
            suite.id
          )),
          catalog.acceptanceSets.filter((set) => set.scenarioIds.includes(scenario.id)).map((set) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-normal", children: set.title }) }, set.deliveryId)),
          !catalog.suites.some(
            (suite) => selectedSuiteScenarios(catalog, suite).some((item) => item.id === scenario.id)
          ) && !catalog.acceptanceSets.some((set) => set.scenarioIds.includes(scenario.id)) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted", children: "Standalone scenario" })
        ] })
      ] })
    ] }),
    scenario.requiredProfileId && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "warn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "requires the",
      " ",
      findTestProfile(catalog, scenario.requiredProfileId, scenario.applicationId)?.name ?? scenario.requiredProfileId,
      " ",
      "profile"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EntityContentTabs,
      {
        ariaLabel: "Scenario views",
        activeTab: tab,
        onTabChange: setTab,
        tabs: views.map((view) => ({
          id: view.id,
          concept: view.id === "definition" ? "documentation" : view.id === "runs" ? "test-run" : "command",
          label: view.id === "runs" ? { one: "run", other: "runs" } : view.label,
          count: view.id === "runs" ? history.length : void 0,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col gap-6", children: view.content })
        }))
      }
    )
  ] });
}
function useApplicationView({
  state,
  pending,
  onAction,
  onReadExecution,
  onReview = () => {
  },
  onOpen = () => {
  },
  onOpenWork = () => {
  },
  onOpenDelivery,
  onOpenProject,
  onEvidence = () => {
  },
  overview,
  testInference = false,
  loaded = true
}) {
  const catalog = reactExports.useMemo(() => testCatalogForState(state), [state]);
  const [selection, setSelectedRoute] = useRouteField("selection");
  const [backgroundSelection, setBackgroundSelection] = useRouteField("background");
  const [definitionHistory, setDefinitionHistory] = useRouteField("definitionHistory");
  const [lens, setLens] = useRouteField("lens");
  const [subpage, setSubpage] = useRouteField("panel");
  const [versionId, setVersionId] = useRouteField("version");
  const selected = selection ?? { kind: "application", id: "" };
  const definitionOpen = selected.kind === "scenario" || selected.kind === "suite" || selected.kind === "delivery";
  const selectRoute = (next) => {
    if (next?.kind !== selected.kind || next?.id !== selected.id) setVersionId(void 0);
    setSelectedRoute(next);
  };
  const closeTestCard = () => {
    setSubpage(void 0);
    selectRoute(backgroundSelection ?? (appId ? { kind: "application", id: appId } : void 0));
    setDefinitionHistory([]);
  };
  const clearSelection = () => {
    setSelectedRoute(void 0);
    setBackgroundSelection(void 0);
    setDefinitionHistory([]);
    setSubpage(void 0);
    setVersionId(void 0);
  };
  usePageEscape(selection && !definitionOpen && !subpage ? clearSelection : void 0);
  const setSelection = (next) => {
    if (next.kind === "application" && next.kind === selected.kind && next.id === selected.id) {
      clearSelection();
      return;
    }
    setSubpage(void 0);
    if (next.kind === "application") {
      setBackgroundSelection(next);
      setDefinitionHistory([]);
    } else if (!definitionOpen) {
      setBackgroundSelection(selected);
      setDefinitionHistory([]);
    } else if (next.kind !== selected.kind || next.id !== selected.id || next.applicationId !== selected.applicationId) {
      setDefinitionHistory((history) => [...history, selected]);
    }
    selectRoute(next);
  };
  const scenario = selected.kind === "scenario" ? catalog.scenarios.find((s) => s.id === selected.id) : void 0;
  const suite = selected.kind === "suite" ? catalog.suites.find((s) => s.id === selected.id) : void 0;
  const selectedApp = selected.kind === "application" ? findTestApplication(catalog, selected.id) : void 0;
  const delivery = findAcceptanceSet(catalog, selected.kind === "delivery" ? selected : void 0);
  const appId = scenario?.applicationId ?? suite?.applicationId ?? delivery?.applicationId ?? selectedApp?.id;
  const app = catalog.applications.find((a) => a.id === appId);
  const appProject = app ? applicationProject(state, app) : void 0;
  const appScenarios = catalog.scenarios.filter((s) => s.applicationId === app?.id);
  const suites = catalog.suites.filter((s) => s.applicationId === app?.id);
  const sets = catalog.acceptanceSets.filter((s) => s.applicationId === app?.id);
  const executions = catalog.executions.filter((e) => e.applicationId === app?.id);
  const openScenario = (id) => setSelection({ kind: "scenario", id });
  const openRun = (id) => {
    const target = resolveTestTarget(catalog, id);
    setSubpage({ kind: "execution", id: target?.execution.id ?? id, runId: target?.run?.id });
  };
  const groupsFor = (role) => {
    const visible = appScenarios.filter((s) => s.role === role);
    const groups = role === "delivery" ? sets.map((set) => ({
      id: set.deliveryId,
      title: set.title,
      scenarios: visible.filter((scenario2) => set.scenarioIds.includes(scenario2.id))
    })) : suites.map((suite2) => ({
      id: suite2.id,
      title: suite2.name,
      scenarios: selectedSuiteScenarios(catalog, suite2).filter(
        (scenario2) => visible.some((item) => item.id === scenario2.id)
      )
    }));
    const grouped = new Set(groups.flatMap((g) => g.scenarios.map((s) => s.id)));
    const unmatched = visible.filter((s) => !grouped.has(s.id));
    if (unmatched.length)
      groups.push({
        id: "unmatched",
        title: role === "scratch" ? "Scratch checks" : "Unmatched scenarios",
        scenarios: unmatched
      });
    return groups.filter((g) => g.scenarios.length);
  };
  const execution = subpage?.kind === "execution" ? catalog.executions.find((e) => e.id === subpage.id) : void 0;
  const versionsScenario = subpage?.kind === "versions" ? catalog.scenarios.find((s) => s.id === subpage.id) : void 0;
  const entries = versionsScenario ? [...versionsScenario.plans, ...versionsScenario.failures].sort((a, b) => b.at - a.at) : [];
  const entry = entries.find((e) => e.id === versionId) ?? versionsScenario?.plans.find((p) => p.status === "current") ?? entries[0];
  let content = null;
  if (app)
    content = /* @__PURE__ */ jsxRuntimeExports.jsx(
      TestApplicationPage,
      {
        overview: overview?.(app, appProject),
        state,
        catalog,
        app,
        project: appProject,
        scenarios: appScenarios,
        suites,
        sets,
        executions,
        nav: {
          openRun,
          openScenario,
          openSuite: (id) => setSelection({ kind: "suite", id }),
          openDeliverySuite: (id) => setSelection({ kind: "delivery", id, applicationId: app.id }),
          showDeliveries: () => setLens("delivery"),
          showSuites: () => setLens("regression"),
          onOpenProject,
          onOpenDelivery: onOpenDelivery && ((id) => state.deliveries.some((d) => d.id === id) && onOpenDelivery(id))
        }
      }
    );
  let baseContent = content;
  if (suite)
    content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EntityPageHeader,
        {
          title: suite.name,
          subtitle: `Regression suite · ${app?.name ?? ""}`,
          description: `A selection of regression scenarios.${suite.policy.length ? ` Runs ${suite.policy.map((p) => p.trigger.toLowerCase()).join(" · ")}.` : " No run policy configured."}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Selection rule", caption: "Membership is resolved when the suite runs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", children: "role = regression" }),
          suite.rule?.tags?.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "soft", children: [
            "tag = ",
            tag
          ] }, tag)),
          !suite.rule && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", children: "Recorded membership" })
        ] }),
        [
          { label: "Selected explicitly", ids: suite.rule?.ids ?? [] },
          { label: "Included", ids: suite.include },
          { label: "Excluded", ids: suite.exclude }
        ].filter((group) => group.ids.length).map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted", children: [
            group.label,
            ":"
          ] }),
          group.ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "link",
              size: "sm",
              onClick: () => openScenario(id),
              children: catalog.scenarios.find((scenario2) => scenario2.id === id)?.title ?? id
            },
            id
          ))
        ] }, group.label)),
        suite.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted", children: suite.note })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: `Selected scenarios · ${selectedSuiteScenarios(catalog, suite).length}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScenarioRows,
        {
          compact: true,
          catalog,
          scenarios: selectedSuiteScenarios(catalog, suite),
          onSelect: openScenario
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Executions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RunTable,
        {
          catalog,
          executions: executions.filter((e) => e.suiteId === suite.id),
          onOpen: openRun
        }
      ) })
    ] });
  if (delivery)
    content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EntityPageHeader,
        {
          title: delivery.title,
          subtitle: delivery.approved ? "Delivery suite · promoted to regression" : "Delivery suite",
          trailing: onOpenDelivery && state.deliveries.some((d) => d.id === delivery.deliveryId) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => onOpenDelivery(delivery.deliveryId),
              children: "Open delivery"
            }
          ) : void 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Scenarios", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScenarioRows,
        {
          compact: true,
          catalog,
          scenarios: appScenarios.filter((s) => delivery.scenarioIds.includes(s.id)),
          onSelect: openScenario
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Executions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        RunTable,
        {
          catalog,
          executions: executions.filter((e) => e.deliveryId === delivery.deliveryId),
          onOpen: openRun
        }
      ) })
    ] });
  if (scenario)
    content = /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScenarioPage,
      {
        scenario,
        catalog,
        onRun: openRun,
        onSuite: (id) => setSelection({ kind: "suite", id }),
        onVersions: () => {
          setVersionId(void 0);
          setSubpage({ kind: "versions", id: scenario.id });
        }
      },
      scenario.id
    );
  const missingSelection = Boolean(
    selection && !(selection.kind === "application" ? selectedApp : scenario || suite || delivery)
  );
  if (missingSelection || subpage && !execution && !versionsScenario) {
    content = loaded ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorPage,
      {
        variant: "notFound",
        title: "This test item is not here",
        description: "It is not in this workspace: it may have been removed, or the link is from another workspace."
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "cp-muted", children: "Loading tests…" });
    baseContent = content;
  }
  const controls = /* @__PURE__ */ jsxRuntimeExports.jsx(
    TestControls,
    {
      state,
      applicationId: appId,
      scenario,
      suite,
      deliveryId: delivery?.deliveryId,
      pending,
      act: onAction,
      onRun: openRun
    },
    `${appId}:${scenario?.id ?? suite?.id ?? delivery?.deliveryId ?? ""}`
  );
  const definitionContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { stack: true, children: [
    controls,
    content
  ] });
  return {
    open: Boolean(selection),
    applicationId: app?.id,
    catalog,
    contentKey: selection ? `${selected.kind}:${selected.id}` : void 0,
    close: clearSelection,
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { children: baseContent }),
    columnCard: !app ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(PageColumnCard, { headerTabs: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      CardHeaderTabs,
      {
        value: lens,
        onValueChange: (value) => {
          setLens(value);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderTabsList, { "aria-label": "Test definitions by role", children: ["regression", "delivery", "scratch"].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeaderTabsTrigger,
            {
              value: role,
              concept: "tests",
              icon: TEST_ROLE_ICONS[role],
              coloredIcon: true,
              showCount: true,
              count: appScenarios.filter((s) => s.role === role).length,
              children: role === "delivery" ? "Delivery" : role === "regression" ? "Regression" : "Ad-hoc"
            },
            role
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderTabsViewport, { children: ["regression", "delivery", "scratch"].map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderTabsContent, { value: role, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarSection, { children: [
            [
              {
                label: "SUITES",
                groups: groupsFor(role).filter((group) => group.id !== "unmatched")
              },
              {
                label: "SCENARIOS",
                groups: groupsFor(role).filter((group) => group.id === "unmatched")
              }
            ].filter((section) => section.groups.length).map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                "aria-label": section.label,
                className: "grid min-w-0 gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      label: section.label,
                      count: section.label === "SUITES" ? section.groups.length : section.groups.reduce(
                        (total, group) => total + group.scenarios.length,
                        0
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ConfigurableListGroup,
                    {
                      variant: section.label === "SUITES" ? "cards" : "compact",
                      collapsible: false,
                      itemStyle: {
                        titleWeight: "regular",
                        iconSurface: "bare",
                        titleWrap: false
                      },
                      children: section.groups.map((group) => {
                        const scenarioItems = (items) => items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ConfigurableListItem,
                          {
                            title: s.title,
                            icon: DELIVERY_CONCEPT_ICONS.scenario,
                            selected: scenario?.id === s.id,
                            trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(Targets, { scenario: s, catalog, compact: true }),
                            onSelect: () => openScenario(s.id)
                          },
                          s.id
                        ));
                        if (group.id === "unmatched") return scenarioItems(group.scenarios);
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ConfigurableListItem,
                          {
                            title: group.title,
                            icon: DELIVERY_CONCEPT_ICONS.suite,
                            itemStyle: {
                              titleWeight: "semibold",
                              titleSize: "large",
                              tone: "subtle",
                              iconGlyphSize: 16
                            },
                            selected: selected.kind === (role === "delivery" ? "delivery" : "suite") && selected.id === group.id,
                            trailing: group.scenarios.length,
                            defaultExpanded: true,
                            onSelect: () => setSelection(
                              role === "delivery" ? {
                                kind: "delivery",
                                id: group.id,
                                applicationId: app?.id
                              } : { kind: "suite", id: group.id }
                            ),
                            subItems: scenarioItems(group.scenarios)
                          },
                          group.id
                        );
                      })
                    }
                  )
                ]
              },
              section.label
            )),
            !appScenarios.some((s) => s.role === role) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "SCENARIOS", count: 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No scenarios match yet." })
            ] })
          ] }) }, role)) })
        ]
      }
    ) }),
    subpage: subpage && (execution || versionsScenario) ? {
      id: `${subpage.kind}:${subpage.id}`,
      title: execution ? catalog.scenarios.find(
        (s) => s.id === execution.runs.find((r) => r.id === subpage.runId)?.scenarioId
      )?.title ?? executionName(execution) : "Playwright versions",
      covers: "all",
      concept: execution ? "test-run" : void 0,
      conceptLabel: execution ? "Test run" : "Playwright versions",
      onClose: closeTestCard,
      previousPage: definitionOpen ? {
        label: scenario?.title ?? suite?.name ?? delivery?.title ?? "Tests",
        onNavigate: () => setSubpage(void 0)
      } : void 0,
      content: execution ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        TestExecutionView,
        {
          catalog,
          execution,
          initialRunId: subpage.runId,
          singleRun: Boolean(subpage.runId),
          delivery: state.deliveries.find((d) => d.id === execution.deliveryId),
          pending,
          onReview: (id) => {
            const d = state.deliveries.find((d2) => d2.id === execution.deliveryId);
            if (d) onReview(d, id);
          },
          onOpenWork: (id) => {
            const d = state.deliveries.find((d2) => d2.id === execution.deliveryId);
            if (d) onOpenWork(d, id);
          },
          onOpenInDelivery: (runId) => {
            const d = state.deliveries.find((d2) => d2.id === execution.deliveryId);
            if (d) onOpen(d, runId);
          },
          onArchive: () => void onAction("tests_archive_execution", {
            executionId: execution.id,
            expectedVersion: state.version
          }),
          onRestore: () => void onAction("tests_restore_execution", {
            executionId: execution.id,
            expectedVersion: state.version
          }),
          onLoadDetails: onReadExecution && (() => onReadExecution(execution.id)),
          onCancel: () => void onAction("tests_cancel", { executionId: execution.id }),
          onRetry: (runId) => void onAction("tests_retry", { runId }),
          onRepair: testInference ? (runId, attemptId) => void onAction("tests_repair_plan", {
            runId,
            attemptId,
            expectedVersion: state.version
          }) : void 0,
          onDiagnose: testInference ? (runId, attemptId) => void onAction("tests_diagnose", {
            runId,
            attemptId,
            expectedVersion: state.version
          }) : void 0,
          onCancelDiagnosis: (diagnosisId) => void onAction("tests_cancel_diagnosis", { diagnosisId }),
          onEvidence,
          onReviewRun: (runId, attemptId) => void onAction("tests_review_run", {
            runId,
            attemptId,
            expectedVersion: state.version
          })
        },
        `${execution.id}:${subpage.runId ?? "all"}:${execution.archive?.sha256 ?? "live"}`
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        ColumnLayout,
        {
          primary: null,
          columnCardChip: { label: "Versions", concept: "tests" },
          contentKey: entry?.id,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { stack: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            PageHeaderPage,
            {
              header: {
                view: "testRun",
                kind: "Playwright versions",
                kindConcept: "tests",
                title: `${versionsScenario.plans.length} versions, ${versionsScenario.failures.length} real failures`,
                identity: { node: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "tests", tileSize: "lg" }), shape: "tile" },
                facts: [{ id: "scenario", label: "Scenario", value: versionsScenario.title, concept: "tests" }]
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-muted", children: "A version exists because the plan was explored from the scenario, repaired after test-drift and accepted, or re-explored after the scenario changed. Candidates wait for explicit acceptance." }),
                entry ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PlanCard,
                  {
                    entry,
                    catalog,
                    scenario: versionsScenario,
                    onRun: openRun
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { children: "No generated plan recorded." })
              ]
            }
          ) }),
          columnCard: /* @__PURE__ */ jsxRuntimeExports.jsx(PageColumnCard, { header: "Versions · newest first", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { collapsible: false, children: entries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfigurableListItem,
            {
              title: "code" in e ? `v${e.version} · ${planOrigin(e)} · ${planStatus(e)}` : "failed for real",
              metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "code" in e ? e.note : e.considered }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  time(e.at),
                  " · ",
                  e.by
                ] })
              ] }),
              selected: entry?.id === e.id,
              onSelect: () => setVersionId(e.id)
            },
            e.id
          )) }) }) })
        }
      )
    } : definitionOpen ? {
      id: `${selected.kind}:${selected.id}`,
      title: scenario?.title ?? suite?.name ?? delivery?.title ?? "Tests",
      icon: scenario ? /* @__PURE__ */ jsxRuntimeExports.jsx(DELIVERY_CONCEPT_ICONS.scenario, { size: 14 }) : suite ? /* @__PURE__ */ jsxRuntimeExports.jsx(DELIVERY_CONCEPT_ICONS.suite, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DELIVERY_CONCEPT_ICONS.tests, { size: 14 }),
      concept: "tests",
      conceptLabel: scenario ? "Scenario" : "Suite",
      covers: "content",
      content: definitionContent,
      onClose: closeTestCard,
      previousPage: definitionHistory.length ? {
        label: catalog.suites.find((s) => s.id === definitionHistory.at(-1)?.id)?.name ?? catalog.scenarios.find((s) => s.id === definitionHistory.at(-1)?.id)?.title ?? findAcceptanceSet(catalog, definitionHistory.at(-1))?.title ?? "Tests",
        onNavigate: () => {
          selectRoute(definitionHistory.at(-1));
          setDefinitionHistory((history) => history.slice(0, -1));
        }
      } : void 0
    } : void 0
  };
}
const shipped = (kind) => kind === "staging" || kind === "canary" || kind === "production";
let nextKey = 0;
const environmentsOf = (rows) => rows.map((row) => ({
  ...row.id ? { id: row.id } : {},
  name: row.name.trim(),
  kind: row.kind,
  ...row.githubEnvironment.trim() ? { githubEnvironment: row.githubEnvironment.trim() } : {},
  ...row.url ? { url: row.url } : {},
  approval: row.approval && shipped(row.kind) ? "required" : "automatic",
  ...row.reachedName.trim() && shipped(row.kind) ? { reachedName: row.reachedName.trim() } : {}
}));
function LadderEditorDialog({
  open,
  applicationName,
  draftKey = `ladder:${applicationName}`,
  ladder,
  onClose,
  onSave
}) {
  const titleId = reactExports.useId();
  const initial = reactExports.useMemo(
    () => ({
      rows: ladder.map(
        (env) => ({
          key: `row-${nextKey++}`,
          id: env.id,
          name: env.name,
          kind: env.kind,
          githubEnvironment: env.githubEnvironment ?? "",
          approval: env.approval === "required",
          reachedName: env.reachedName ?? "",
          ...env.url ? { url: env.url } : {}
        })
      )
    }),
    [ladder]
  );
  const form = useDraftForm({
    key: draftKey,
    initial,
    // Each step needs a name of its own: said at the step, by its row.
    validate: ({ rows: rows2 }) => {
      const issues = {};
      const seen = /* @__PURE__ */ new Set();
      for (const row of rows2) {
        const name = row.name.trim().toLocaleLowerCase();
        if (!name) issues[row.key] = "Name this step.";
        else if (seen.has(name)) issues[row.key] = "Another step has this name.";
        seen.add(name);
      }
      return issues;
    },
    submit: ({ rows: rows2 }) => onSave(environmentsOf(rows2)),
    refused: "Blume could not save this ladder. Try again.",
    onSaved: () => onClose()
  });
  const rows = form.values.rows;
  const busy = form.submitting;
  const setRows = (next) => form.set((current) => ({ ...current, rows: next(current.rows) }));
  const update = (key, patch) => setRows((current) => current.map((row) => row.key === key ? { ...row, ...patch } : row));
  const move = (index, by) => setRows((current) => {
    const next = [...current];
    const [row] = next.splice(index, 1);
    next.splice(index + by, 0, row);
    return next;
  });
  const cancel = () => {
    form.reset();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onClose, size: "md", labelledBy: titleId, dismissible: !busy, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { id: titleId, children: [
      applicationName,
      ": where its code goes"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: form.rootRef, className: "grid gap-4 px-5 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "The steps on the way to users, in order. Blume moves deliveries along them from GitHub Deployments and test results. A step that requires approval waits for a person." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "m-0 grid gap-3 p-0 list-none", "aria-label": "Environments", children: rows.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid gap-2 border-t border-border-subtle pt-3 first:border-t-0 first:pt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `ladder-name-${row.key}`,
              "aria-label": `Step ${index + 1} name`,
              "aria-required": true,
              "aria-invalid": form.errors[row.key] ? true : void 0,
              "aria-describedby": form.errors[row.key] ? `ladder-error-${row.key}` : void 0,
              className: "min-w-0 flex-1",
              value: row.name,
              maxLength: 40,
              onChange: (event) => update(row.key, { name: event.target.value })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NativeSelect,
            {
              id: `ladder-kind-${row.key}`,
              "aria-label": `Step ${index + 1} kind`,
              value: row.kind,
              onChange: (event) => update(row.key, { kind: event.target.value }),
              children: ENVIRONMENT_KINDS.map((kind) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: kind, children: ENVIRONMENT_KIND_NAME[kind] }, kind))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", "aria-label": `Move ${row.name || "step"} up`, disabled: index === 0, onClick: () => move(index, -1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 14, "aria-hidden": true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", "aria-label": `Move ${row.name || "step"} down`, disabled: index === rows.length - 1, onClick: () => move(index, 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 14, "aria-hidden": true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon-sm", "aria-label": `Remove ${row.name || "step"}`, disabled: rows.length === 1, onClick: () => setRows((current) => current.filter((item) => item.key !== row.key)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, "aria-hidden": true }) })
        ] }),
        form.errors[row.key] ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: `ladder-error-${row.key}`, className: "m-0 type-ui-meta text-status-danger-ink", children: form.errors[row.key] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: `ladder-github-${row.key}`, className: "grid min-w-0 flex-1 gap-1 type-ui-meta text-muted", children: [
            "GitHub environment that means this step",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `ladder-github-${row.key}`,
                placeholder: "Optional; by default matched by name and kind",
                value: row.githubEnvironment,
                maxLength: 80,
                onChange: (event) => update(row.key, { githubEnvironment: event.target.value })
              }
            )
          ] }),
          shipped(row.kind) && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: `ladder-reached-${row.key}`, className: "grid min-w-0 flex-1 gap-1 type-ui-meta text-muted", children: [
            index === rows.length - 1 ? "Name when reached (ends the process)" : "Name when reached",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `ladder-reached-${row.key}`,
                placeholder: index === rows.length - 1 ? "Optional; otherwise Done" : `Optional, e.g. ${row.name || "Canary"} live`,
                value: row.reachedName,
                maxLength: 40,
                onChange: (event) => update(row.key, { reachedName: event.target.value })
              }
            )
          ] }),
          shipped(row.kind) && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: `ladder-approval-${row.key}`, className: "flex items-center gap-2 type-ui-meta text-body", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: `ladder-approval-${row.key}`, checked: row.approval, onCheckedChange: (approval) => update(row.key, { approval }) }),
            "Requires approval"
          ] })
        ] })
      ] }, row.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "justify-self-start",
          disabled: rows.length >= 8,
          onClick: () => setRows((current) => [...current, { key: `row-${nextKey++}`, name: "", kind: "production", githubEnvironment: "", approval: false, reachedName: "" }]),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, "aria-hidden": true }),
            "Add environment"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { children: form.error })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "justify-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "ghost", disabled: busy, onClick: cancel, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "primary", disabled: busy, onClick: () => void form.submit(), children: busy ? "Saving…" : "Save ladder" })
    ] })
  ] });
}
const SOLID = {
  start: "border-[var(--badge-edge-phase-start)] bg-[var(--badge-soft-phase-start)]",
  learn: "border-[var(--badge-edge-phase-learn)] bg-[var(--badge-soft-phase-learn)]",
  plan: "border-[var(--badge-edge-phase-plan)] bg-[var(--badge-soft-phase-plan)]",
  build: "border-[var(--badge-edge-phase-build)] bg-[var(--badge-soft-phase-build)]",
  test: "border-[var(--badge-edge-phase-test)] bg-[var(--badge-soft-phase-test)]",
  review: "border-[var(--badge-edge-phase-review)] bg-[var(--badge-soft-phase-review)]",
  ready: "border-[var(--badge-edge-phase-ready)] bg-[var(--badge-soft-phase-ready)]",
  merge: "border-[var(--badge-edge-phase-merge)] bg-[var(--badge-soft-phase-merge)]",
  deploy: "border-[var(--badge-edge-phase-deploy)] bg-[var(--badge-soft-phase-deploy)]",
  live: "border-[var(--badge-edge-phase-live)] bg-[var(--badge-soft-phase-live)]",
  neutral: "border-[var(--border-card)] bg-[var(--bg-inner)]"
};
const GHOST = {
  start: "border-dashed border-[var(--badge-edge-phase-start)]",
  learn: "border-dashed border-[var(--badge-edge-phase-learn)]",
  plan: "border-dashed border-[var(--badge-edge-phase-plan)]",
  build: "border-dashed border-[var(--badge-edge-phase-build)]",
  test: "border-dashed border-[var(--badge-edge-phase-test)]",
  review: "border-dashed border-[var(--badge-edge-phase-review)]",
  ready: "border-dashed border-[var(--badge-edge-phase-ready)]",
  merge: "border-dashed border-[var(--badge-edge-phase-merge)]",
  deploy: "border-dashed border-[var(--badge-edge-phase-deploy)]",
  live: "border-dashed border-[var(--badge-edge-phase-live)]",
  neutral: "border-dashed border-[var(--border-card)]"
};
const PROCESS_INK = {
  start: "text-[var(--badge-text-phase-start)]",
  learn: "text-[var(--badge-text-phase-learn)]",
  plan: "text-[var(--badge-text-phase-plan)]",
  build: "text-[var(--badge-text-phase-build)]",
  test: "text-[var(--badge-text-phase-test)]",
  review: "text-[var(--badge-text-phase-review)]",
  ready: "text-[var(--badge-text-phase-ready)]",
  merge: "text-[var(--badge-text-phase-merge)]",
  deploy: "text-[var(--badge-text-phase-deploy)]",
  live: "text-[var(--badge-text-phase-live)]",
  neutral: "text-muted"
};
const PROCESS_LINE = {
  start: "text-[var(--badge-edge-phase-start)]",
  learn: "text-[var(--badge-edge-phase-learn)]",
  plan: "text-[var(--badge-edge-phase-plan)]",
  build: "text-[var(--badge-edge-phase-build)]",
  test: "text-[var(--badge-edge-phase-test)]",
  review: "text-[var(--badge-edge-phase-review)]",
  ready: "text-[var(--badge-edge-phase-ready)]",
  merge: "text-[var(--badge-edge-phase-merge)]",
  deploy: "text-[var(--badge-edge-phase-deploy)]",
  live: "text-[var(--badge-edge-phase-live)]",
  neutral: "text-[var(--border-card)]"
};
function ProcessChip({
  tone,
  icon,
  label,
  detail,
  ghost = false,
  size = "md",
  trailing,
  node,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      "data-process-node": node,
      "data-ghost": ghost || void 0,
      title: description,
      className: cn(
        "relative inline-flex min-w-0 flex-none items-center gap-1.5 rounded-[var(--radius-control)] border text-left text-strong",
        // In a segment that does not fit (`ProcessSegmentFrame`'s density) the steps keep one row:
        // first the detail goes, then the name (it stays in the tooltip and for screen readers).
        size === "md" ? "h-10 pl-2 pr-2.5 group-data-[density=names]/segment:h-7 group-data-[density=icons]/segment:h-7 group-data-[density=icons]/segment:px-1.5" : "h-7 pl-1.5 pr-2 group-data-[density=icons]/segment:px-1.5",
        ghost ? GHOST[tone] : SOLID[tone]
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: cn("inline-flex size-3.5 flex-none items-center justify-center", PROCESS_INK[tone]), children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "grid min-w-0 group-data-[density=icons]/segment:sr-only", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs font-semibold leading-4", children: label }),
          detail && size === "md" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("truncate text-[11px] leading-[14px] group-data-[density=names]/segment:hidden group-data-[density=icons]/segment:hidden", PROCESS_INK[tone]), children: detail })
        ] }),
        trailing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: cn("inline-flex flex-none items-center group-data-[density=icons]/segment:hidden", PROCESS_INK[tone]), children: trailing })
      ]
    }
  );
}
function ProcessArrow({
  tone = "neutral",
  direction = "right",
  className
}) {
  return direction === "down" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: cn("relative block h-4 w-px flex-none bg-current", PROCESS_LINE[tone], className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-px left-1/2 -translate-x-1/2 border-x-[3.5px] border-t-[5px] border-x-transparent border-t-current" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: cn("relative block h-px w-4 flex-none bg-current", PROCESS_LINE[tone], className), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-px top-1/2 -translate-y-1/2 border-y-[3.5px] border-l-[5px] border-y-transparent border-l-current" }) });
}
function ProcessArrowPair({
  to,
  back,
  direction = "right",
  className
}) {
  return direction === "down" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "aria-hidden": true, className: cn("flex h-4 flex-none flex-row gap-1", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("relative block w-px bg-current", PROCESS_LINE[to]), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-px left-1/2 -translate-x-1/2 border-x-[3.5px] border-t-[5px] border-x-transparent border-t-current" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("relative block w-px bg-current", PROCESS_LINE[back]), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-px left-1/2 -translate-x-1/2 border-x-[3.5px] border-b-[5px] border-x-transparent border-b-current" }) })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "aria-hidden": true, className: cn("flex w-4 flex-none flex-col gap-1", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("relative block h-px bg-current", PROCESS_LINE[to]), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-px top-1/2 -translate-y-1/2 border-y-[3.5px] border-l-[5px] border-y-transparent border-l-current" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("relative block h-px bg-current", PROCESS_LINE[back]), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-px top-1/2 -translate-y-1/2 border-y-[3.5px] border-r-[5px] border-y-transparent border-r-current" }) })
  ] });
}
const CORNER = 6;
const HEAD = 5;
function roundedPath(points) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const into = Math.min(CORNER, Math.hypot(x - px, y - py) / 2);
    const out = Math.min(CORNER, Math.hypot(nx - x, ny - y) / 2);
    const a = [x - Math.sign(x - px) * into, y - Math.sign(y - py) * into];
    const b = [x + Math.sign(nx - x) * out, y + Math.sign(ny - y) * out];
    d += ` L${a[0]},${a[1]} Q${x},${y} ${b[0]},${b[1]}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L${lx},${ly}`;
}
function arrowhead(points) {
  const [px, py] = points[points.length - 2];
  const [x, y] = points[points.length - 1];
  const length = Math.hypot(x - px, y - py) || 1;
  const ux = (x - px) / length;
  const uy = (y - py) / length;
  const bx = x - ux * HEAD;
  const by = y - uy * HEAD;
  const half = 3.5;
  return {
    head: `${x},${y} ${bx - uy * half},${by + ux * half} ${bx + uy * half},${by - ux * half}`,
    end: [bx + ux, by + uy]
  };
}
function ProcessConnectors({
  route,
  layoutKey,
  children,
  className
}) {
  const container = reactExports.useRef(null);
  const [drawn, setDrawn] = reactExports.useState({
    width: 0,
    height: 0,
    geometry: { lines: [] }
  });
  const latest = reactExports.useRef(route);
  latest.current = route;
  reactExports.useLayoutEffect(() => {
    const element = container.current;
    if (!element) return void 0;
    const measure = () => {
      const origin = element.getBoundingClientRect();
      const boxes = /* @__PURE__ */ new Map();
      element.querySelectorAll("[data-process-node]").forEach((node) => {
        const rect = node.getBoundingClientRect();
        const left = rect.left - origin.left;
        const top = rect.top - origin.top;
        boxes.set(node.dataset.processNode, {
          left,
          top,
          right: left + rect.width,
          bottom: top + rect.height,
          cx: left + rect.width / 2,
          cy: top + rect.height / 2
        });
      });
      setDrawn({ width: element.scrollWidth, height: element.scrollHeight, geometry: latest.current((id) => boxes.get(id)) });
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(element);
    void document.fonts?.ready.then(measure);
    return () => observer?.disconnect();
  }, [layoutKey]);
  const { width, height, geometry } = drawn;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: container, className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { "aria-hidden": true, width, height, className: "pointer-events-none absolute left-0 top-0 overflow-visible", children: geometry.bands?.map((band) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        "data-process-band": band.id,
        x: band.x,
        y: band.y,
        width: band.width,
        height: band.height,
        rx: 10,
        className: "fill-[color-mix(in_srgb,var(--text-strong)_4%,transparent)]"
      },
      band.id
    )) }),
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "aria-hidden": true, width, height, className: "pointer-events-none absolute left-0 top-0 overflow-visible", children: [
      geometry.lines.map((line) => {
        if (line.points.length < 2) return null;
        const withHead = line.arrow !== false;
        const head = withHead ? arrowhead(line.points) : null;
        const points = head ? [...line.points.slice(0, -1), head.end] : line.points;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: PROCESS_LINE[line.tone], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: roundedPath(points),
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 1.25,
              strokeDasharray: line.dashed ? "3 3" : void 0
            }
          ),
          head && /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: head.head, fill: "currentColor" })
        ] }, line.id);
      }),
      geometry.labels?.map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "text",
        {
          x: label.x,
          y: label.y,
          textAnchor: label.anchor ?? "middle",
          dominantBaseline: "middle",
          className: cn(
            "fill-current stroke-[var(--layout-subpage-bg)] text-[10px] font-semibold [paint-order:stroke]",
            PROCESS_INK[label.tone]
          ),
          strokeWidth: 4,
          children: label.text
        },
        label.id
      ))
    ] })
  ] });
}
function useStepDensity(frame, content, overflows) {
  const [density, setDensity] = reactExports.useState("full");
  const check = reactExports.useRef(overflows);
  check.current = overflows;
  reactExports.useLayoutEffect(() => {
    const element = content.current;
    const over = element && (check.current ? check.current(element) : element.scrollWidth > element.clientWidth + 1);
    if (over && density !== "icons") setDensity(density === "full" ? "names" : "icons");
  }, [density, content]);
  reactExports.useLayoutEffect(() => {
    const parent = frame.current?.parentElement;
    if (!parent || typeof ResizeObserver === "undefined") return void 0;
    let width = parent.clientWidth;
    const observer = new ResizeObserver(() => {
      if (parent.clientWidth === width) return;
      width = parent.clientWidth;
      setDensity("full");
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, [frame]);
  return density;
}
function ProcessColumnFrame({
  label,
  onOpen,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipLabel, { label, side: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      onClick: onOpen,
      "data-slot": "process-column",
      className: "group/process -m-1.5 flex w-[calc(100%+12px)] min-w-0 cursor-pointer flex-col items-stretch rounded-[var(--radius-container)] p-1.5 text-left transition-colors hover:bg-[var(--bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--accent)_45%,transparent)]",
      children
    }
  ) });
}
function ProcessColumnGroup({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-col rounded-[var(--radius-container)] border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-2.5 group-hover/process:border-[var(--border-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 truncate type-ui-label uppercase tracking-ui-label text-muted", children: label }),
    children
  ] });
}
const TOKEN = "process:";
const OPEN_LABEL = "How work ships: see the whole process";
function stepIcon(step) {
  if (step.phase) return /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryPhaseIcon, { phase: step.phase, size: 14 });
  return step.approval ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14, "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DeliveryPhaseIcon, { phase: "Release", size: 14 });
}
function StepChip({
  step,
  ghost = false,
  size = "md",
  node,
  rail = false
}) {
  if (step.environment)
    return (
      // An application's step is its environment, drawn by the environment concept (its kind's
      // glyph and its name; its hover says when code goes there). The map places it: its node, for
      // the connectors drawn to it, and a ghost past the part shown is faded. A step a person's
      // approval lets code into shows the legend's shield beside it.
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          "data-process-node": node,
          "data-ghost": ghost || void 0,
          className: cn(
            "relative inline-flex min-w-0 flex-none items-center gap-1",
            ghost && "opacity-60",
            rail && "pl-1.5"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnvironmentHorizontalItem,
              {
                environment: environmentOfConfig(step.environment),
                member: false,
                peek: false,
                about: [step.when, step.source].filter(Boolean).join(" · ")
              }
            ),
            step.approval && /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 12, "aria-hidden": true, className: "shrink-0 text-muted" })
          ]
        }
      )
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProcessChip,
    {
      tone: step.tone,
      icon: stepIcon(step),
      label: step.label,
      detail: ghost ? void 0 : step.detail,
      ghost,
      size,
      node,
      trailing: size === "sm" && step.approval && step.phase ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 12, "aria-hidden": true }) : void 0,
      description: [`${step.label}: ${step.who}`, step.when, step.source].filter(Boolean).join(" · ")
    }
  );
}
const work = (node) => WORK_STEPS.find((step) => step.node === node);
function useWholeProcess(part, process, projectName) {
  const own = `${TOKEN}${part}`;
  const channel = reactExports.useContext(SubViewContext);
  const foreign = Boolean(channel?.token && channel.token !== own);
  const [open, setOpen] = useSubViewState(null, {
    token: (view) => view === null ? null : `${TOKEN}${view}`,
    title: () => "How work ships",
    parent: () => null,
    resolve: (token) => token === own ? part : null,
    ready: !foreign,
    // Outside the app's page chrome, the shell's bar leads back; never a bar inside the page.
    backBar: true
  });
  return {
    open: () => setOpen(part),
    // Another part's process in the address replaces this one's, even while this one was open.
    page: /* @__PURE__ */ jsxRuntimeExports.jsx(PageTakeover, { active: open !== null && !foreign, outermost: true, children: open !== null && !foreign && /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessSubPage, { process, projectName, highlight: open.split(","), onClose: () => setOpen(null) }) })
  };
}
function ProcessColumn({
  application,
  process,
  projectName
}) {
  const whole = useWholeProcess(application, process, projectName);
  const entry = process.applications.find((candidate) => candidate.application.id === application);
  if (!entry) return null;
  const { previews, releases } = applicationSteps(entry);
  const shared = ["plan", "build", "test", "review", "merge"].map(work);
  const last = releases.at(-1);
  const done = endStep(releases);
  const when = (step) => step.reached && step !== last ? `${step.when}. Then it is “${step.reached}”` : step.when;
  const row = (step, ghost = false) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-44 flex-none items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step, ghost, rail: true }),
      step.node === "test" && previews.map((preview) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "contents", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessArrow, { tone: preview.tone, className: "mx-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step: preview })
      ] }, preview.node))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden min-w-0 type-ui-meta text-muted @min-[420px]/process:block", children: step.node === "test" && previews.length ? `${step.when}. Each pull request deploys to ${previews.map((preview) => preview.label).join(" and ")}` : when(step) })
  ] }, step.node);
  const arrow = (step, inset) => step.node === "test" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessArrowPair, { to: "test", back: "build", direction: "down", className: cn("my-1", inset === "box" ? "ml-[13px]" : "ml-[26px]") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessArrow, { tone: step.tone, direction: "down", className: cn("my-1", inset === "box" ? "ml-[15px]" : "ml-[28px]") });
  const group = (label2, steps, empty) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ProcessColumnGroup, { label: label2, children: [
    steps.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "contents", children: [
      index > 0 && arrow(step, "box"),
      row(step)
    ] }, step.node)),
    !steps.length && empty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: empty })
  ] });
  const label = `${entry.application.name}: how work reaches its users. ${OPEN_LABEL}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "@container/process min-w-0", "data-process-column": application, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ProcessColumnFrame, { label, onOpen: whole.open, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-[13px] flex", children: row(work("start"), true) }),
      arrow(shared[0], "edge"),
      group("Every application", shared),
      arrow(releases[0] ?? done, "edge"),
      group(entry.application.name, releases, "Merging releases it"),
      arrow(done, "edge"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-[13px] flex", children: row(done, true) })
    ] }),
    whole.page
  ] });
}
function ProcessDiagram({
  process,
  application,
  highlight
}) {
  const focused = (part) => highlight.length === 0 || highlight.includes(part);
  const entry = process.applications.find((candidate) => candidate.application.id === application);
  const steps = entry ? applicationSteps(entry) : null;
  const app = entry?.application.id;
  const appGhost = !app || !focused(app);
  const workGhost = !focused("work");
  const releases = steps?.releases ?? [];
  const named = releasePhases(releases);
  const after = named ? named.phases : releases;
  const lanes = process.applications.map((candidate) => ({ id: candidate.application.id, name: candidate.application.name, ...applicationSteps(candidate) }));
  const laneGhost = (id) => id !== app || !focused(id);
  const lane = (node) => `lane:${node}`;
  const doneGhost = workGhost;
  const line = [...WORK_STEPS.map((step) => step.node), ...after.map((step) => step.node), DONE_STEP.node];
  const tones = new Map([...WORK_STEPS, ...after, ...releases, DONE_STEP].map((step) => [step.node, step.tone]));
  const route = (box) => {
    const lines = [];
    const labels = [];
    const bands = [];
    const ghostAt = (node) => WORK_STEPS.some((step) => step.node === node) ? workGhost : node === DONE_STEP.node ? doneGhost : appGhost;
    for (let index = 1; index < line.length; index += 1) {
      const to = line[index];
      if (to === "test") continue;
      const a = box(line[index - 1]);
      const b = box(to);
      if (a && b) lines.push({ id: `flow:${to}`, points: [[a.right, a.cy], [b.left, b.cy]], tone: tones.get(to) ?? "neutral", dashed: ghostAt(to) });
    }
    const build = box("build");
    const test = box("test");
    const review = box("review");
    const merge = box("merge");
    if (build && test) {
      lines.push({ id: "build-test", points: [[build.right, build.cy - 3], [test.left, test.cy - 3]], tone: "test", dashed: workGhost });
      lines.push({ id: "test-build", points: [[test.left, test.cy + 3], [build.right, build.cy + 3]], tone: "build", dashed: workGhost });
    }
    if (build && review) {
      const y = Math.min(build.top, review.top) - 16;
      lines.push({ id: "changes", points: [[review.cx, review.top], [review.cx, y], [build.cx, y], [build.cx, build.top]], tone: "review", dashed: true });
      labels.push({ id: "changes", x: (review.cx + build.cx) / 2, y, text: "Changes requested", tone: "review" });
    }
    if (merge) {
      const y = merge.top - 16;
      const inset = Math.min(14, (merge.right - merge.left) / 4);
      lines.push({ id: "next-pr", points: [[merge.right - inset, merge.top], [merge.right - inset, y], [merge.left + inset, y], [merge.left + inset, merge.top]], tone: "merge", dashed: true });
      labels.push({ id: "next-pr", x: merge.cx, y: y - 9, text: "Another pull request?", tone: "merge" });
    }
    const rows = lanes.map((entry2) => ({ entry: entry2, pre: box(`lane-pre:${entry2.id}`), rel: box(`lane-rel:${entry2.id}`) }));
    const top = Math.min(...rows.flatMap((row) => [row.pre?.top ?? Infinity, row.rel?.top ?? Infinity]));
    const allGhost = lanes.every((entry2) => laneGhost(entry2.id));
    const flow = (id, from, to, tone, dashed) => {
      const a = box(from);
      const b = box(to);
      if (a && b) lines.push({ id, points: [[a.right, a.cy], [b.left, b.cy]], tone, dashed });
    };
    if (Number.isFinite(top)) {
      const withPreviews = rows.filter((row) => row.entry.previews.length > 0);
      const lastPreview = withPreviews.length ? box(lane(withPreviews.at(-1).entry.previews[0].node)) : void 0;
      if (build && test && lastPreview) {
        const x = (build.right + test.left) / 2;
        const bus = top - 26;
        const trunk = Math.min(...rows.map((row) => row.pre?.left ?? Infinity)) - 12;
        lines.push({ id: "previews", points: [[x, Math.max(build.bottom, test.bottom) + 5], [x, bus], [trunk, bus], [trunk, lastPreview.cy]], tone: "test", arrow: false, dashed: allGhost });
        labels.push({ id: "previews", x: (x + trunk) / 2, y: bus, text: "Each pull request", tone: "test" });
      }
      for (const row of withPreviews) {
        const first = box(lane(row.entry.previews[0].node));
        const trunk = Math.min(...rows.map((candidate) => candidate.pre?.left ?? Infinity)) - 12;
        if (first) lines.push({ id: `preview:${row.entry.id}`, points: [[trunk, first.cy], [first.left, first.cy]], tone: "test", dashed: laneGhost(row.entry.id) });
        row.entry.previews.slice(1).forEach((step, index) => flow(`preview:${step.node}`, lane(row.entry.previews[index].node), lane(step.node), step.tone, laneGhost(row.entry.id)));
      }
      const withReleases = rows.filter((row) => row.entry.releases.length > 0);
      const divider = Math.min(...rows.map((row) => row.rel?.left ?? Infinity)) - 14;
      const lastRelease = withReleases.length ? box(lane(withReleases.at(-1).entry.releases[0].node)) : void 0;
      if (merge && lastRelease && Number.isFinite(divider)) {
        const bus = top - 12;
        lines.push({ id: "merged", points: [[merge.cx, merge.bottom + 5], [merge.cx, bus], [divider, bus], [divider, lastRelease.cy]], tone: "merge", arrow: false, dashed: allGhost });
        labels.push({ id: "merged", x: (merge.cx + divider) / 2, y: bus, text: "Merged", tone: "merge" });
      }
      for (const row of withReleases) {
        const first = box(lane(row.entry.releases[0].node));
        if (first) lines.push({ id: `merged:${row.entry.id}`, points: [[divider, first.cy], [first.left, first.cy]], tone: row.entry.releases[0].tone, dashed: laneGhost(row.entry.id) });
        row.entry.releases.slice(1).forEach((step, index) => flow(`release:${step.node}`, lane(row.entry.releases[index].node), lane(step.node), step.tone, laneGhost(row.entry.id)));
      }
    }
    if (named) {
      named.phases.forEach((phase, index) => {
        const from = box(phase.node);
        const deployments = releases.filter((_, at) => named.deployedIn[at] === index);
        const first = deployments[0] && box(deployments[0].node);
        const x = from ? from.right - 14 : 0;
        if (from && first)
          lines.push({
            id: `deploys:${phase.node}`,
            points: x > first.left + 6 && x < first.right - 6 ? [[x, from.bottom], [x, first.top]] : [[from.cx, from.bottom], [from.cx, first.cy], [first.left, first.cy]],
            tone: deployments[0].tone,
            dashed: appGhost
          });
        deployments.slice(1).forEach((step, at) => flow(`deploys:${step.node}`, deployments[at].node, step.node, step.tone, appGhost));
      });
      releases.forEach((step, index) => {
        if (!step.reached) return;
        const chip = box(step.node);
        const target = box(index === releases.length - 1 ? DONE_STEP.node : `phase:${step.node}`);
        if (!chip || !target) return;
        const x = target.left + 14;
        const straight = x > chip.left + 6 && x < chip.right - 6;
        lines.push({
          id: `verified:${step.node}`,
          points: straight ? [[x, chip.top], [x, target.bottom]] : [[chip.right, chip.cy], [target.cx, chip.cy], [target.cx, target.bottom]],
          tone: step.tone,
          dashed: appGhost
        });
        const rise = straight ? x : target.cx;
        labels.push({ id: `verified:${step.node}`, x: rise + 6, y: ((straight ? chip.top : chip.cy) + target.bottom) / 2, text: "Verified", tone: step.tone, anchor: "start" });
      });
    }
    const band = (id, nodes) => {
      const boxes = nodes.map(box).filter((found) => found !== void 0);
      if (!boxes.length) return;
      const pad = 7;
      const left = Math.min(...boxes.map((found) => found.left)) - pad;
      const top2 = Math.min(...boxes.map((found) => found.top)) - pad;
      bands.push({ id, x: left, y: top2, width: Math.max(...boxes.map((found) => found.right)) + pad - left, height: Math.max(...boxes.map((found) => found.bottom)) + pad - top2 });
    };
    if (highlight.includes("work")) band("work", WORK_STEPS.map((step) => step.node));
    if (app && highlight.includes(app)) {
      band(app, [...after, ...named ? releases : []].map((step) => step.node));
      const entry2 = lanes.find((candidate) => candidate.id === app);
      if (entry2) band(`lane:${app}`, [`lane-name:${app}`, ...[...entry2.previews, ...entry2.releases].map((step) => lane(step.node))]);
    }
    return { lines, labels, bands };
  };
  const outer = reactExports.useRef(null);
  const inner = reactExports.useRef(null);
  const density = useStepDensity(outer, inner, (content) => content.scrollWidth > (outer.current?.clientWidth ?? Infinity) + 1);
  const layoutKey = JSON.stringify([highlight, app, density, releases.map((step) => [step.label, step.reached]), lanes.map((entry2) => [entry2.id, entry2.previews.length, entry2.releases.length])]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: outer, className: "group/segment min-w-0 overflow-x-auto", "data-density": density, "data-process-diagram": true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ProcessConnectors, { route, layoutKey, className: "w-max min-w-full px-3 pb-3 pt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: inner, className: "grid w-max auto-cols-max grid-flow-col items-center gap-x-6 gap-y-5", children: [
      WORK_STEPS.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "row-start-1", "data-part": "work", "data-highlighted": focused("work") || void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step, size: "sm", ghost: workGhost, node: step.node }) }, step.node)),
      after.map((step) => (
        // Named phases get room between them for the deployments that move a delivery on.
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("row-start-1 justify-self-center", named && "px-2"), "data-part": app, "data-highlighted": app && focused(app) || void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step, size: "sm", ghost: appGhost, node: step.node }) }, step.node)
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("row-start-1 justify-self-center", named && "px-2"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step: endStep(releases), size: "sm", ghost: doneGhost, node: DONE_STEP.node }) }),
      named?.phases.map((phase, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "mt-10 flex items-center gap-6 justify-self-center",
          style: { "--process-column": WORK_STEPS.length + 1 + index },
          "data-part": app,
          "data-phase-deployments": phase.node,
          children: releases.filter((_, at) => named.deployedIn[at] === index).map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step, size: "sm", ghost: appGhost, node: step.node }, step.node))
        },
        `deploys:${phase.node}`
      ))
    ] }),
    lanes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid w-max grid-cols-[max-content_max-content_max-content] items-center gap-x-10 gap-y-3", "data-process-lanes": true, children: lanes.map((entry2) => {
      const ghost = laneGhost(entry2.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", "data-lane": entry2.id, "data-highlighted": !ghost || void 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-process-node": `lane-name:${entry2.id}`, className: `relative max-w-36 truncate text-xs font-semibold ${entry2.id === app ? "text-strong" : "text-muted"}`, title: entry2.name, children: entry2.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-process-node": `lane-pre:${entry2.id}`, className: "flex items-center gap-6", children: entry2.previews.length ? entry2.previews.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step, size: "sm", ghost, node: lane(step.node) }, step.node)) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta relative whitespace-nowrap text-muted", children: "No preview" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-process-node": `lane-rel:${entry2.id}`, className: "flex items-center gap-6", children: entry2.releases.length ? entry2.releases.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepChip, { step, size: "sm", ghost, node: lane(step.node) }, step.node)) : (
          // No release steps: merging into main is how it reaches its users.
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta relative whitespace-nowrap text-muted", children: "Merging releases it" })
        ) })
      ] }, entry2.id);
    }) })
  ] }) });
}
function ProcessSubPage({
  process,
  projectName,
  highlight,
  onClose
}) {
  const applications = process.applications;
  const [selected, setSelected] = reactExports.useState(highlight[0] ?? applications[0]?.application.id ?? "work");
  const [application, setApplication] = reactExports.useState(
    applications.find((entry) => entry.application.id === selected)?.application.id ?? applications[0]?.application.id
  );
  const choose = (id) => {
    setSelected(id);
    if (id !== "work") setApplication(id);
  };
  const steps = (labels) => labels.join(" → ");
  const primary = /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Parts of the process", className: "flex min-w-0 flex-col gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "APPLICATIONS", count: applications.length }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ConfigurableListGroup, { variant: "separate", revealIndex: applications.findIndex((entry) => entry.application.id === selected), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigurableListItem,
        {
          title: "The shared work",
          leading: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { size: 16, "aria-hidden": true }),
          selected: selected === "work",
          onSelect: () => choose("work"),
          metadata: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: steps(WORK_STEPS.map((step) => step.label)) })
        }
      ),
      applications.map((entry) => {
        const { previews, releases } = applicationSteps(entry);
        const approvals = releases.filter((step) => step.approval).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfigurableListItem,
          {
            title: entry.application.name,
            leading: /* @__PURE__ */ jsxRuntimeExports.jsx(ConceptIcon, { concept: "application", tileSize: "sm" }),
            selected: selected === entry.application.id,
            onSelect: () => choose(entry.application.id),
            metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: releases.length ? steps([...previews, ...releases].map((step) => step.label)) : "Merging releases it" }),
              approvals > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: approvals === 1 ? "1 release approval" : `${approvals} release approvals` })
            ] })
          },
          entry.application.id
        );
      })
    ] })
  ] });
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { as: "section", padding: "sm", stack: true, "data-process-map": true, "data-process-selected": selected, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "type-ui-body m-0 max-w-[68ch] text-body", children: [
      "Every delivery in ",
      projectName,
      " goes through the same work, then along the steps of each application it changes until users have it."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessDiagram, { process, application, highlight: [selected] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "type-ui-meta m-0 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 12, "aria-hidden": true }),
        " A person’s approval"
      ] }),
      applications.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "A delivery is Done once every application it changes is verified on its last step" })
    ] })
  ] });
  return (
    // Its own card session: × closes this card, whatever card it was opened from.
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardControlsContext.Provider, { value: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageBackdrop, { onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubPageLayout,
      {
        id: "process",
        title: "How work ships",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { size: 16, "aria-hidden": true }),
        onClose,
        content: (
          // The list beside the diagram; narrow, above it.
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full min-h-0 min-w-0 @max-[800px]/control:flex-col", "data-process-page": true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-72 shrink-0 overflow-y-auto overflow-x-hidden border-r border-border-subtle p-3 @max-[800px]/control:w-full @max-[800px]/control:border-r-0 @max-[800px]/control:border-b", children: primary }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1 overflow-auto", children: content })
          ] })
        )
      }
    ) }) })
  );
}
function ApplicationOverview({
  applicationId,
  process,
  projectName,
  pending,
  act
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const entry = process.applications.find((item) => item.application.id === applicationId);
  if (!entry)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-muted", children: "This application is not part of a project yet, so Blume cannot show how its work reaches users." });
  const paths = entry.application.paths ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", "data-application-overview": true, children: [
    entry.application.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: entry.application.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "How work ships", className: "flex min-w-0 flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          label: "HOW WORK SHIPS",
          rightItem: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "xs", disabled: pending, onClick: () => setEditing(true), children: "Edit steps" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessColumn, { application: applicationId, process, projectName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: [
        paths.length ? `Owns ${paths.slice(0, 3).join(", ")}${paths.length > 3 ? ` and ${paths.length - 3} more` : ""}` : null,
        entry.application.environments ? "Steps set up" : "Steps Blume derived from deployments and tests"
      ].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LadderEditorDialog,
      {
        open: editing,
        applicationName: entry.application.name,
        draftKey: `ladder:${applicationId}`,
        ladder: entry.ladder,
        onClose: () => setEditing(false),
        onSave: (environments) => act("process_update", { applicationId, environments }, { throws: true })
      }
    )
  ] });
}
function summarizeProjectScan(scan, scannedAt) {
  const counts = { skills: 0, agents: 0, commands: 0, hooks: 0, rules: 0 };
  let totalEntries = 0;
  for (const category of scan.categories) {
    const key = category.name.toLowerCase();
    if (key in counts) counts[key] += category.entries.length;
    totalEntries += category.entries.length;
  }
  return { workspacePath: scan.path, ...counts, totalEntries, scannedAt };
}
function githubProjectView(project, setupSummary) {
  return {
    id: project.id,
    kind: "git",
    name: project.name,
    root: `github.com/${project.fullName}`,
    ...project.pushedAt ? { lastActivityTs: project.pushedAt } : {},
    setupSummary,
    setupAvailable: true,
    canonicalRemote: project.url,
    workspaceLocations: []
  };
}
const surfaces = /* @__PURE__ */ new WeakMap();
function githubSetupSurfaceFor(projects) {
  let surface = surfaces.get(projects);
  if (!surface) {
    surface = createGitHubSetupSurface(projects);
    surfaces.set(projects, surface);
  }
  return surface;
}
function createGitHubSetupSurface(projects, now = Date.now) {
  const listeners = /* @__PURE__ */ new Set();
  const summaries = /* @__PURE__ */ new Map();
  const emit = () => {
    for (const listener of listeners) listener();
  };
  const list = async () => (await projects.list()).projects.map((project) => githubProjectView(project, summaries.get(project.id) ?? null));
  const none = () => () => {
  };
  return {
    projects: {
      list,
      // GitHub lists repositories most recently pushed first.
      listRecent: async (limit) => (await list()).slice(0, limit),
      onChanged(listener) {
        listeners.add(listener);
        const stop = projects.onChanged?.(listener);
        return () => {
          listeners.delete(listener);
          stop?.();
        };
      }
    },
    setup: {
      async scanProject(_path, options) {
        if (!options?.projectId) throw new Error("Project setup is unavailable for this repository.");
        const scan = await projects.scan({ projectId: options.projectId }, { signal: options.signal });
        const previous = summaries.get(options.projectId);
        const summary = summarizeProjectScan(scan, now());
        summaries.set(options.projectId, summary);
        if (previous?.totalEntries !== summary.totalEntries) queueMicrotask(emit);
        return scan;
      },
      browseHarnesses: () => projects.browseGlobal(),
      readEntry: (path) => projects.readGlobalEntry(path),
      readProjectFile: (path) => projects.readFile(path),
      listSyncStates: async () => [],
      onChanged: none
    },
    account: { getSession: async () => null, onChanged: none },
    system: { homeDir: projects.homeDir },
    copy: {
      projectsEmpty: "Repositories you share with the Blume GitHub App appear here.",
      projectSetupDescription: "Artifacts on the default branch on GitHub.",
      artifactQualifier: "",
      lastActivityLabel: "Last pushed"
    },
    features: { worktrees: false }
  };
}
const LEDGER_REPOSITORY = /^[a-z0-9.-]+\.[a-z]{2,}\/[^\s?#@]+$/i;
function repositoryIdentity(remote) {
  const key = repositoryMatchKey(remote);
  if (!key?.startsWith("git:")) return void 0;
  const [host, ...rest] = key.slice("git:".length).split("/");
  const path = rest.join("/");
  const value = remote.trim().replace(/[?#].*$/, "").replace(/\/+$/, "").replace(/\.git$/i, "");
  const at = value.toLowerCase().lastIndexOf(path);
  const identity = `${host}/${at >= 0 ? value.slice(at, at + path.length) : path}`;
  return LEDGER_REPOSITORY.test(identity) ? identity : void 0;
}
function sourceCandidates({
  projects,
  locals,
  github,
  homeDir
}) {
  const claimed = new Set(
    projects.flatMap((p) => p.repositories.map(repositoryMatchKey)).filter((key) => key !== null)
  );
  const seen = /* @__PURE__ */ new Set();
  const add = (candidate) => {
    const key = repositoryMatchKey(candidate.location);
    if (!key || claimed.has(key) || seen.has(key)) return [];
    seen.add(key);
    return [candidate];
  };
  const local = [...locals ?? []].filter((view) => !ledgerProjectForLocal(projects, view)).sort((a, b) => (b.lastActivityTs ?? 0) - (a.lastActivityTs ?? 0)).flatMap((view) => {
    const repository = view.canonicalRemote ? repositoryIdentity(view.canonicalRemote) : void 0;
    return add({
      location: repository ?? view.root,
      kind: repository ? "repository" : "folder",
      label: view.name,
      detail: formatHomePath(view.root, homeDir),
      lastActivityTs: view.lastActivityTs
    });
  });
  const remote = [...github?.projects ?? []].sort((a, b) => (b.pushedAt ?? 0) - (a.pushedAt ?? 0)).flatMap(
    (repo) => add({
      location: `github.com/${repo.fullName}`,
      kind: "repository",
      label: repo.name,
      detail: `On GitHub · ${repo.fullName}`,
      lastActivityTs: repo.pushedAt
    })
  );
  return [...local, ...remote];
}
function sourcesInput(chosen) {
  return {
    repositories: chosen.filter((c) => c.kind === "repository").map((c) => c.location),
    folders: chosen.filter((c) => c.kind === "folder").map((c) => c.location)
  };
}
const isProjectFolder = (identity) => identity.startsWith("/") || identity.startsWith("file:/") || normalizeAbsoluteFolderPath(identity) !== null;
function localProjectSetupSurface(host, locations) {
  const views = locations.filter(isProjectFolder).map((identity) => {
    const path = identity.startsWith("file:") ? decodeURIComponent(new URL(identity).pathname) : identity;
    return {
      id: identity,
      root: path,
      name: repositoryLabel(path),
      kind: "folder",
      setupAvailable: true,
      setupSummary: null,
      workspaceLocations: []
    };
  });
  return {
    projects: {
      list: async () => views,
      listRecent: async (limit) => views.slice(0, limit),
      onChanged: () => () => {
      }
    },
    setup: {
      scanProject: (path, options) => host.setup.scanProject(path, { signal: options?.signal }),
      browseHarnesses: () => host.setup.browseHarnesses(),
      readEntry: (path) => host.setup.readEntry(path),
      readProjectFile: (path) => host.setup.readProjectFile(path),
      listSyncStates: async () => [],
      onChanged: (listener) => host.setup.onChanged(listener)
    },
    account: { getSession: async () => null, onChanged: () => () => {
    } },
    system: { homeDir: host.system.homeDir },
    features: { worktrees: false },
    copy: {
      projectsEmpty: "Ask your agent to register a repository or folder.",
      projectSetupDescription: "Agent setup in this folder.",
      artifactQualifier: "",
      lastActivityLabel: "Updated"
    }
  };
}
const count$1 = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const plural = (n, one, many) => n === 1 ? one : many;
const isFolder = isProjectFolder;
function githubRepository(list, repository) {
  const url = githubUrl(repository);
  if (!url) return void 0;
  const key = url.slice("https://".length).toLowerCase();
  return list?.projects.find((p) => `github.com/${p.fullName}`.toLowerCase() === key);
}
function latestRuns(catalog, scenarios) {
  return scenarios.map((scenario) => ({ scenario, latest: scenarioRuns(catalog, scenario.id)[0] })).sort((a, b) => (b.latest?.execution.at ?? -1) - (a.latest?.execution.at ?? -1));
}
function setupSummaryText(repositories, remote, summary, githubConnected = false) {
  if (!repositories) return githubConnected ? "Reading its setup from GitHub…" : "Connect GitHub to read its setup";
  if (!remote) return "Not shared with the Blume GitHub App";
  if (!summary) return "Setup not read yet";
  if (!summary.totalEntries) return "No agent setup";
  const parts = [
    summary.skills && `${summary.skills} ${summary.skills === 1 ? "skill" : "skills"}`,
    summary.rules && `${summary.rules} ${summary.rules === 1 ? "rule" : "rules"}`,
    summary.agents && `${summary.agents} ${summary.agents === 1 ? "agent" : "agents"}`,
    summary.commands && `${summary.commands} ${summary.commands === 1 ? "command" : "commands"}`,
    summary.hooks && `${summary.hooks} ${summary.hooks === 1 ? "hook" : "hooks"}`
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : `${summary.totalEntries} setup entries`;
}
function useSetupSummaries(surface, remotes) {
  const ids = remotes.map((r) => r?.id ?? "");
  const views = useHostResource(
    () => surface ? surface.projects.list() : Promise.resolve(null),
    (onChanged) => surface ? surface.projects.onChanged(onChanged) : () => {
    },
    [surface],
    { isEqual: hostSnapshotsEqual }
  );
  return ids.map((id) => id ? views.data?.find((v) => v.id === id)?.setupSummary ?? void 0 : void 0);
}
function useRename(props) {
  const { project, act, onOpenProject, renameRequest } = props;
  const [renaming, setRenaming] = reactExports.useState(renameRequest !== void 0);
  const [name, setName] = reactExports.useState(project.name);
  const handledRequest = reactExports.useRef(renameRequest);
  reactExports.useEffect(() => {
    if (renameRequest === void 0 || renameRequest === handledRequest.current) return;
    handledRequest.current = renameRequest;
    setName(project.name);
    setRenaming(true);
  }, [renameRequest, project.name]);
  return {
    renaming,
    name,
    setName,
    start: () => {
      setName(project.name);
      setRenaming(true);
    },
    cancel: () => setRenaming(false),
    submit: async () => {
      const next = name.trim();
      if (next && next !== project.name) {
        const record = await act("project_rename", { projectId: project.id, name: next });
        if (record?.id && record.id !== project.id) onOpenProject(record.id);
      }
      setRenaming(false);
    },
    /** Saves a name typed into the header's title. */
    submitName: async (next) => {
      setRenaming(false);
      if (!next || next === project.name) return;
      const record = await act("project_rename", { projectId: project.id, name: next });
      if (record?.id && record.id !== project.id) onOpenProject(record.id);
    }
  };
}
function useArchive(props, entries) {
  const { project, act, state, onOpenProject } = props;
  return {
    archived: projectArchived(state, project),
    listedDeliveries: entries.filter((entry) => !entry.archived && sameProject(state, entry.delivery.project, project.id)).length,
    toggle: async (archived) => {
      const result = await act("project_archive", { projectId: project.id, archived });
      if (result?.projectId && result.projectId !== project.id) onOpenProject(result.projectId);
    }
  };
}
function useFlower(props) {
  const { project, act, onOpenProject } = props;
  return {
    choose: async (avatar) => {
      const record = await act("project_set_avatar", { projectId: project.id, avatar });
      if (record?.id && record.id !== project.id) onOpenProject(record.id);
    }
  };
}
function useProjectPage(props) {
  const { state, project, catalog, checkouts, conversations, repositories, surface, localHost, projects } = props;
  const { route, update, open } = useAppRoute();
  const github = useGitHubConnection();
  const githubConnected = Boolean(github.status?.connected);
  const now = useRelativeActivityClock();
  const rename = useRename(props);
  const flower = useFlower(props);
  const deliveries = reactExports.useMemo(() => projectDeliveries(state, project), [state, project]);
  const entries = reactExports.useMemo(() => deliveryListEntries(deliveries, state.messages, now), [deliveries, state.messages, now]);
  const archive = useArchive(props, entries);
  const agents = projectAgents(state, project, conversations.data ?? []);
  const localAgents = reactExports.useMemo(() => projectLocalAgents(state, conversations.data ?? []), [state, conversations.data]);
  const clusters = improveGroups(state, { projectId: project.id }).flatMap((g) => g.clusters);
  const tests = reactExports.useMemo(() => {
    if (!catalog) return { applications: [], suites: [] };
    const ids = new Set(deliveries.map((d) => d.id));
    const applications = catalog.applications.filter((app) => applicationProject(state, app)?.id === project.id);
    const appIds = new Set(applications.map((app) => app.id));
    const suites = catalog.acceptanceSets.filter((set) => ids.has(set.deliveryId) || appIds.has(set.applicationId));
    return { applications, suites };
  }, [catalog, deliveries, state, project]);
  const latestExecution = reactExports.useMemo(() => {
    const ids = new Set(tests.applications.map((app) => app.id));
    return (catalog?.executions ?? []).filter((execution) => ids.has(execution.applicationId)).sort((a, b) => b.at - a.at)[0];
  }, [catalog, tests.applications]);
  const summaries = useSetupSummaries(
    project.codeSource ? void 0 : surface,
    project.repositories.map((r) => githubRepository(repositories, r))
  );
  const folders = project.repositories.filter(
    (identity) => isFolder(identity) && !matchLocalProjects([identity], checkouts).length
  );
  const folderSurface = reactExports.useMemo(
    () => localHost && folders.length ? localProjectSetupSurface(localHost, folders) : void 0,
    [localHost, folders.join("\n")]
  );
  const setupOptions = project.codeSource ? [] : [
    ...project.repositories.flatMap((identity) => {
      const remote = githubRepository(repositories, identity);
      return remote && surface ? [
        {
          id: remote.id,
          label: repositoryLabel(identity),
          detail: "On GitHub (default branch)",
          surface,
          projectId: remote.id,
          location: identity
        }
      ] : [];
    }),
    ...localHost ? checkouts.map((local) => ({
      id: `local:${local.id}`,
      label: local.name,
      detail: "On this computer",
      surface: localHost,
      projectId: local.id,
      location: project.repositories.find((identity) => matchLocalProjects([identity], [local]).length) ?? project.repositories[0]
    })) : [],
    ...folderSurface ? folders.map((identity) => ({
      id: identity,
      label: repositoryLabel(identity),
      detail: "Registered folder",
      surface: folderSurface,
      projectId: identity,
      location: identity
    })) : []
  ];
  const linkedSetup = route.localSetupLink ? setupOptions.find((o) => o.id === `local:${route.localSetupLink.projectId}`) : void 0;
  const setup = setupOptions.find((option) => option.id === route.projectSetup) ?? linkedSetup ?? (!route.projectSetup ? setupOptions.find((o) => o.id === `local:${route.projectLocal}`) ?? setupOptions[0] : void 0);
  const locations = project.repositories.map((repository, index) => {
    const remote = githubRepository(repositories, repository);
    return {
      repository,
      label: repositoryLabel(repository),
      folder: isFolder(repository),
      page: githubUrl(repository),
      remote,
      summary: summaries[index],
      checkouts: project.codeSource ? [] : matchLocalProjects([repository], checkouts),
      setupText: project.codeSource ? "Authoritative cloud workspace" : isFolder(repository) ? "Folder on a computer" : setupSummaryText(repositories, remote, summaries[index], githubConnected),
      needsGitHub: !project.codeSource && !isFolder(repository) && !repositories && github.available && !githubConnected,
      setups: setupOptions.filter((option) => option.location === repository)
    };
  });
  const sources = [
    .../* @__PURE__ */ new Set([
      ...state.threads.filter((t) => sameProject(state, t.project, project.id)).map((t) => t.harness),
      ...(conversations.data ?? []).map((c) => c.source)
    ])
  ].filter(isSource);
  const tab = route.projectTab ?? (route.projectLocal || route.projectSetup ? "setup" : void 0);
  const attention = entries.filter((entry) => entry.section === "attention");
  const connected = agents.filter((agent) => !agent.connections[0].revoked);
  const lastActivity = Math.max(
    0,
    ...entries.map((entry) => entry.lastActivityAt),
    ...agents.map((agent) => agent.connections[0].lastSeenAt)
  );
  return {
    now,
    rename,
    flower,
    archive,
    route,
    /** The section or tab the route names (`?tab=`), if any. */
    tab,
    setTab: (next) => update((current) => ({ ...current, projectTab: next })),
    deliveries,
    entries,
    attention,
    active: entries.filter((entry) => entry.section === "active"),
    agents,
    connected,
    localAgents,
    /** Whether this computer's agents could be read: until they are, "no agents" is not known. */
    localRead: conversations.error && !conversations.data ? "failed" : conversations.data === void 0 && localHost ? "loading" : "done",
    clusters,
    needing: clusters.filter((c) => c.status === "needs-improvement"),
    tests,
    latestExecution,
    latestVerdict: latestVerdict(latestExecution),
    locations,
    setupOptions,
    setup,
    sources,
    lastActivity,
    others: projects.filter((p) => p.id !== project.id),
    /** The project's first GitHub page. */
    githubPage: project.repositories.map(githubUrl).find(Boolean) ?? null,
    selectSetup: (id) => update((current) => ({ ...current, projectSetup: id })),
    /** Opens the Setup tab at one location's setup (a repository chosen in the Overview's column). */
    openSetup: (id) => update((current) => ({ ...current, projectSetup: id, projectTab: "setup" })),
    leaveSetup: () => update((current) => ({ ...current, projectSetup: void 0 })),
    openTests: (selection, applicationId) => update((current) => ({
      ...current,
      navigation: { ...current.navigation, page: "projects", selected: null, cardHistory: [] },
      projectId: void 0,
      projectTab: void 0,
      projectSetup: void 0,
      projectAgent: void 0,
      selection,
      background: selection.kind === "application" ? selection : applicationId ? { kind: "application", id: applicationId } : void 0,
      panel: void 0,
      definitionHistory: []
    })),
    openCluster: (key) => update((current) => ({
      ...current,
      navigation: { ...current.navigation, page: "improve", selected: null, cardHistory: [] },
      improveCluster: key
    })),
    /** The Deliveries page, filtered to this project. */
    openDeliveries: () => update((current) => projectDeliveriesRoute(current, project.id)),
    openConversation: (ref) => open(conversationPath(ref)),
    openGlobalSetup: (source) => open(globalSetupPath(source)),
    connectAgent: () => update((current) => ({ ...current, navigation: { ...current.navigation, page: "plugin", selected: null } }))
  };
}
const TERMINAL_AGENTS = [
  { id: "claude", label: "Claude Code" },
  { id: "codex", label: "Codex" }
];
function terminalAgentCommand(agentId, prompt, build) {
  const agent = TERMINAL_AGENTS.find((item) => item.id === agentId);
  if (!agent) throw Error(`No agent ${agentId} to start`);
  if (!build) return `${agent.id} ${shellEscape(prompt)}`;
  const layout = devBuildLayout(build.build, build.version);
  const start = `${agent.id} ${[...devBuildSessionArgs(agent.id, layout), prompt].map(shellEscape).join(" ")}`;
  if (agent.id === "claude") return start;
  return `${["/bin/sh", layout.codexLauncher, layout.codexSession].map(shellEscape).join(" ")} && ${start}`;
}
function terminalAgentTitle(agentId, build) {
  const label = TERMINAL_AGENTS.find((item) => item.id === agentId)?.label ?? agentId;
  const hash = build ? /-dev\.([a-f0-9]{6})/.exec(build.version)?.[1] : void 0;
  return hash ? `${label} · dev ${hash}` : label;
}
function terminalFolder(repositories, locals) {
  const checkouts = matchLocalProjects(repositories, locals ?? []).filter((local) => local.root);
  return checkouts.sort((a, b) => (b.lastActivityTs ?? 0) - (a.lastActivityTs ?? 0))[0]?.root;
}
const readableFolder = (folder) => folder.replace(/^\/(?:Users|home)\/[^/]+(?=\/|$)/, "~");
function canStartInTerminal(host) {
  return Boolean(host?.terminal && host.system.runtime === "electron" && host.system.platform !== "win32");
}
function useStartInTerminal(repositories, prompt) {
  const host = useOptionalSidecarHost();
  const supported = canStartInTerminal(host);
  const locals = useLocalProjects(supported ? host : null);
  const folder = repositories ? terminalFolder(repositories, locals.data) : void 0;
  const devBuild = useDevBuild();
  const pending = devBuild.status === "pending";
  const build = devBuild.status === "ready" ? devBuild.build : null;
  return reactExports.useMemo(() => {
    if (!supported || !folder || pending) return void 0;
    return {
      folder: readableFolder(folder),
      agents: TERMINAL_AGENTS.map((agent) => ({ ...agent })),
      onStart: (agentId) => host.terminal.openPage({
        harnessId: agentId,
        cwd: folder,
        command: terminalAgentCommand(agentId, typeof prompt === "string" ? prompt : prompt(agentId), build),
        title: terminalAgentTitle(agentId, build)
      })
    };
  }, [supported, folder, host, prompt, build, pending]);
}
const DELIVERY_SECTIONS = [
  { id: "attention", label: "NEEDS YOU" },
  { id: "active", label: "IN PROGRESS" },
  { id: "recent", label: "RECENT" },
  { id: "archived", label: "ARCHIVED" }
];
function ProjectDeliveryRow({
  props,
  model,
  entry
}) {
  const { state, project, act, onOpenDelivery } = props;
  const delivery = entry.delivery;
  const deliveryModel = reactExports.useMemo(() => {
    const own = inProject(state, project, delivery);
    const reached = deliveryRepositories(delivery);
    const context = !own ? `From ${deliveryProject(state, delivery).name} · changed ${reached.filter((r) => sameProject(state, r, project.id)).map(repositoryLabel).join(", ")}` : reached.length > 1 || project.repositories.length > 1 ? reached.map(repositoryLabel).join(" · ") : void 0;
    const shown = entry.section === "attention" ? entry : { ...entry, attention: [] };
    return { ...deliveryModelOfEntry(state, shown), ...context ? { context } : {} };
  }, [state, project, delivery, entry]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DeliveryListItem,
    {
      model: deliveryModel,
      now: model.now,
      onSelect: onOpenDelivery,
      menu: deliveryActions(delivery, Boolean(entry.archived), {
        onOpenLink: props.host && ((url) => props.host?.openEvidence(url)),
        onArchive: (item, value) => void act("delivery_archive", { deliveryId: item.id, archived: value })
      })
    }
  );
}
function ProjectDeliveries({
  props,
  model,
  sections = DELIVERY_SECTIONS.map((s) => s.id),
  flat = false,
  pageSize = 10,
  empty = "No deliveries in this project yet. Agents create one when they start work here.",
  action
}) {
  const shown = model.entries.filter((entry) => sections.includes(entry.section));
  if (!shown.length) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: empty });
  const firstGroup = DELIVERY_SECTIONS.find(({ id }) => sections.includes(id) && shown.some((entry) => entry.section === id))?.id;
  if (flat)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurableListGroup,
      {
        variant: "separate",
        pageSize,
        moreLabel: "Show more deliveries",
        children: DELIVERY_SECTIONS.flatMap(({ id }) => shown.filter((entry) => entry.section === id)).map(
          (entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDeliveryRow, { props, model, entry }, entry.delivery.id)
        )
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col gap-5", children: DELIVERY_SECTIONS.filter((s) => sections.includes(s.id)).map(({ id, label }) => {
    const items = shown.filter((entry) => entry.section === id);
    if (!items.length) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": label, className: "flex min-w-0 flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          label,
          count: items.length,
          rightItem: id === firstGroup ? action : void 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigurableListGroup,
        {
          variant: "separate",
          pageSize: id === "attention" ? void 0 : pageSize,
          moreLabel: "Show more deliveries",
          children: items.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDeliveryRow, { props, model, entry }, entry.delivery.id))
        }
      )
    ] }, id);
  }) });
}
function ProjectImprove({
  props,
  model,
  clusters = model.clusters
}) {
  if (!clusters.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyPage,
      {
        variant: "nothingYet",
        size: "compact",
        title: "No signals yet",
        description: "Agents record one when you correct or steer them here; causes that repeat become improvements."
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ClusterList,
    {
      clusters,
      state: props.state,
      onSelect: (cluster) => model.openCluster(cluster.key),
      actions: (cluster) => clusterActions(cluster, props.state.clusters, {
        onSetDismissed: (dismissed) => props.act("cluster_update", {
          clusterKey: cluster.key,
          action: dismissed ? "dismiss" : "restore"
        }),
        onMerge: (into) => props.act("cluster_update", { clusterKey: cluster.key, action: "merge", into: into.key })
      })
    }
  );
}
function ProjectAgents({
  props,
  model,
  agents = model.agents
}) {
  const local = model.localAgents;
  const unread = model.localRead === "failed" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: "Blume could not read this computer’s agents." }) : model.localRead === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: "Looking for agents on this computer…" }) : null;
  if (!agents.length && !local.length && unread) return unread;
  if (!agents.length && !local.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyPage,
      {
        variant: "nothingYet",
        scene: "emptyHive",
        size: "compact",
        title: "No agents here yet",
        description: "Connect an agent through the Blume plugin and it appears here with its conversation and deliveries.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: model.connectAgent, children: "Connect agent" })
      }
    ) });
  const projectRef = {
    id: props.project.id,
    name: props.project.name,
    seed: repositoryFlowerSeed(props.project.repositories[0] ?? props.project.id)
  };
  const list = /* @__PURE__ */ jsxRuntimeExports.jsxs(ConfigurableListGroup, { pageSize: 40, children: [
    agents.map((agent) => {
      const connection = agent.connections[0];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        AgentListItem,
        {
          frame: "tile",
          agent: {
            thread: connection,
            // Its session on this computer, where one is joined: its live state.
            ...agent.session ? { conversation: agent.session } : {},
            project: projectRef
          },
          now: model.now,
          selected: model.route.projectAgent === connection.id,
          onOpen: () => props.onOpenAgent(connection.id),
          menu: agentActions(connection, {
            onOpenConversation: props.onOpenAgentConversation,
            onRevoke: (id) => props.act("thread_revoke", { threadId: id })
          })
        },
        agent.key
      );
    }),
    local.map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LocalAgentItem,
      {
        session,
        project: props.project.repositories[0] ?? props.project.id,
        projectRef,
        now: model.now,
        onOpen: model.openConversation
      },
      session.ref
    ))
  ] });
  return unread ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
    list,
    unread
  ] }) : list;
}
function LocalAgentItem({
  session,
  project,
  projectRef,
  now,
  onOpen
}) {
  const conversation = session;
  const title = conversationTitle(conversation);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AgentListItem,
    {
      frame: "tile",
      agent: {
        thread: {
          id: session.ref,
          title,
          harness: session.source,
          project,
          lastSeenAt: session.lastActivityTs
        },
        conversation,
        ...projectRef ? { project: projectRef } : {}
      },
      now,
      access: "not-connected",
      onOpen: () => onOpen(session.ref)
    }
  );
}
function LocalAgentList({
  project,
  conversations,
  error,
  onOpen
}) {
  if (error && !conversations) return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: "Blume could not read this computer’s agents." });
  if (!conversations)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "cp-muted m-0", children: "Loading agents…" });
  if (!conversations.length) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: "No agent has worked in this folder on this computer yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { pageSize: 20, children: [...conversations].sort((a, b) => b.lastActivityTs - a.lastActivityTs).map((session) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    LocalAgentItem,
    {
      session,
      project,
      now: Date.now(),
      onOpen
    },
    session.ref
  )) });
}
function ProjectTests({
  props,
  model,
  headings = true
}) {
  const { catalog } = props;
  const { applications, suites } = model.tests;
  const terminal = useStartInTerminal(props.project.repositories, FIRST_TEST_PROMPT);
  if (!applications.length && !suites.length)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyPage,
      {
        variant: "nothingYet",
        scene: "greenhouse",
        size: "compact",
        title: "No tests yet",
        description: "Ask your agent to set up testing through the Blume plugin.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { label: "Ask your agent", prompt: FIRST_TEST_PROMPT, terminal })
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-4", children: [
    headings === true && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "APPLICATIONS", count: applications.length }),
    applications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurableListGroup,
      {
        variant: "grouped",
        collapsible: false,
        levelStyles: { 0: { titleWeight: "semibold" }, 1: { density: "dense", titleWeight: "regular" } },
        children: applications.map((app) => {
          const scenarios = catalog.scenarios.filter((s) => s.applicationId === app.id);
          const latest = latestRuns(catalog, scenarios);
          const last = latest[0]?.latest;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfigurableListItem,
            {
              icon: DELIVERY_CONCEPT_ICONS.application,
              title: app.name,
              metadata: `${count$1(scenarios.length, "scenario", "scenarios")}${last ? ` · latest ${executionName(last.execution)}, ${date(last.execution.at)}` : " · not run yet"}`,
              onSelect: () => model.openTests({ kind: "application", id: app.id }),
              subItems: latest.slice(0, 5).map(({ scenario }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TestScenarioCompactItem,
                {
                  scenario: testScenarioOfCatalog(catalog, scenario),
                  now: model.now,
                  onOpen: () => model.openTests({ kind: "scenario", id: scenario.id }, app.id)
                },
                scenario.id
              ))
            },
            app.id
          );
        })
      }
    ),
    headings && suites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "DELIVERY SUITES", count: suites.length }),
    suites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { pageSize: 5, moreLabel: "Show more suites", children: suites.map((suite) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TestSuiteListItem,
      {
        suite: testSuiteOfAcceptanceSet(catalog, suite),
        now: model.now,
        onOpen: () => model.openTests({
          kind: "delivery",
          id: suite.deliveryId,
          applicationId: suite.applicationId
        }),
        onOpenApplication: (id) => model.openTests({ kind: "application", id })
      },
      `${suite.deliveryId}:${suite.applicationId}`
    )) })
  ] });
}
function GlobalSetup({ props, heading = true }) {
  const { localHost } = props;
  if (!localHost) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SetupSurfaceProvider, { host: localHost, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComputerSetup, { localHost, heading }) });
}
function ComputerSetup({ localHost, heading }) {
  const channel = reactExports.useContext(SubViewContext);
  const [local, setLocal] = reactExports.useState(null);
  const token = channel ? channel.token : local;
  const openToken = (next) => channel ? channel.set(next) : setLocal(next);
  const harnesses = useHostResource(
    () => localHost.setup.browseHarnesses(),
    (onChanged) => localHost.setup.onChanged(onChanged),
    [localHost],
    { isEqual: hostSnapshotsEqual }
  );
  const list = harnesses.data ?? [];
  const units = list.flatMap((harness) => harness.artifacts ?? []).filter(
    (unit, index, all) => all.findIndex((other) => other.id === unit.id) === index
  );
  const opened = token ? globalTarget(token, list) : null;
  if (opened)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      GlobalSetupPage,
      {
        target: opened,
        harnesses: harnesses.data ?? void 0,
        onClose: () => openToken(null)
      }
    );
  return harnesses.error && !harnesses.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { message: harnesses.error }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    GlobalSetupGlance,
    {
      heading,
      units: harnesses.data ? units : null,
      onOpen: (kind) => openToken(kind ? `global:${kind}` : "global"),
      fallback: list.some((harness) => harness.categories.length) ? list.filter((harness) => harness.categories.length).map((harness) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": harnessLabel(harness.harnessId), className: "flex min-w-0 flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: `${harnessLabel(harness.harnessId).toUpperCase()} · HOME FOLDER`, variant: "plain" }),
        harness.categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategorySection,
          {
            name: category.name,
            entries: category.entries,
            onOpenEntry: (entry) => openToken(`entry:${entry.contentPath ?? entry.name}`)
          },
          category.name
        ))
      ] }, harness.harnessId)) : void 0
    }
  );
}
function globalTarget(token, harnesses) {
  const [kind, ...rest] = token.split(":");
  const id = rest.join(":");
  if (kind === "global") return { globalArtifacts: id && isArtifactKind(id) ? id : "all" };
  if (kind === "artifact") {
    const unit = harnesses.flatMap((harness) => harness.artifacts ?? []).find((item) => item.id === id);
    return unit ? { source: unit.provider ?? harnesses[0]?.harnessId ?? "claude", artifactId: unit.id } : null;
  }
  if (kind === "entry") {
    for (const harness of harnesses)
      for (const category of harness.categories)
        for (const entry of category.entries)
          if ((entry.contentPath ?? entry.name) === id)
            return { source: harness.harnessId, entryName: entry.name, sourcePath: entry.contentPath };
  }
  return null;
}
function GlobalSetupPage({
  target,
  harnesses,
  onClose
}) {
  const parent = reactExports.useContext(SubHeaderContext);
  const close = reactExports.useRef(onClose);
  close.current = onClose;
  const forward = reactExports.useCallback(
    (state) => parent?.(state ? { ...state, onBack: () => close.current() } : null),
    [parent]
  );
  const preloaded = reactExports.useMemo(() => harnesses ? { harnesses } : void 0, [harnesses]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeaderProvider, { value: forward, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SetupView, { contentOnly: true, deepLink: target, preloadedData: preloaded }) });
}
function ProjectSetup({
  props,
  model,
  global = true
}) {
  const { setup } = model;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 min-w-0 flex-col gap-4", "data-project-setup": true, children: [
    setup ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      SetupPage,
      {
        surface: setup.surface,
        projectId: setup.projectId,
        link: model.route.localSetupLink && setup.id === `local:${model.route.localSetupLink.projectId}` ? model.route.localSetupLink : void 0,
        onLeave: model.leaveSetup
      },
      setup.id
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: model.route.projectSetup ? "This setup location is unavailable." : props.localHost ? "None of this project’s repositories are on this computer. Connect GitHub to read their setup." : "Connect GitHub to read each repository’s setup." }),
    global && !setup && /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalSetup, { props })
  ] });
}
function MergeSuggestions({
  suggestions,
  pending,
  act
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { role: "status", variant: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitMerge, { size: 14, "aria-hidden": true }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { children: [
      "The delivery “",
      s.deliveryTitle,
      "” in ",
      s.into.name,
      " also changed ",
      repositoryLabel(s.repository),
      ", which is in ",
      s.from.name,
      ". Join them so agents in both see each other's deliveries?"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "primary",
          disabled: pending,
          onClick: () => void act("project_merge", { fromProjectId: s.from.id, intoProjectId: s.into.id }),
          children: s.from.repositories.length === 1 ? `Add ${repositoryLabel(s.repository)} to ${s.into.name}` : `Merge ${s.from.name} into ${s.into.name}`
        }
      ),
      s.from.repositories.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          disabled: pending,
          onClick: () => void act("project_move_repository", { repository: s.repository, intoProjectId: s.into.id }),
          children: [
            "Move only ",
            repositoryLabel(s.repository)
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "ghost",
          disabled: pending,
          onClick: () => void act("project_suggestion_dismiss", { repositories: s.repositories }),
          children: "Keep separate"
        }
      )
    ] })
  ] }, `${s.into.id}
${s.from.id}`)) });
}
function RepositoryMenu({
  repository,
  others,
  canSplit,
  pending,
  onMove,
  onSplit
}) {
  if (!others.length && !canSplit) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "icon-sm",
        variant: "ghost",
        "aria-label": `More actions for ${repositoryLabel(repository)}`,
        disabled: pending,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuMoreIcon, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", "aria-label": "Repository actions", children: [
      canSplit && /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onSelect: () => void onSplit(), children: "Make it its own project" }),
      canSplit && others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
      others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Move to" }),
      others.slice(0, 20).map((other) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onSelect: () => void onMove(other), children: other.name }, other.id))
    ] })
  ] });
}
function SetupPage({
  surface,
  projectId,
  link,
  onLeave,
  namesProject = false
}) {
  const deepLink = reactExports.useMemo(() => ({ ...link, projectId, tab: "setup" }), [link, projectId]);
  const parent = reactExports.useContext(SubHeaderContext);
  const forward = reactExports.useCallback(
    (state) => parent?.(state && state.concept !== "PROJECT" ? state : null),
    [parent]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SetupSurfaceProvider, { host: surface, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeaderProvider, { value: forward, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SetupView, { contentOnly: true, namesProject, deepLink, onLeaveProject: onLeave }) }) });
}
function AddApplicationDialog({
  open,
  draftKey = "add-application",
  onClose,
  onSave
}) {
  const titleId = reactExports.useId();
  const formId = reactExports.useId();
  const form = useDraftForm({
    key: draftKey,
    initial: { name: "" },
    validate: ({ name }) => name.trim() ? {} : { name: "Name the application." },
    submit: ({ name }) => onSave(name.trim()),
    refused: "Blume could not add it. Try again.",
    onSaved: () => onClose()
  });
  const cancel = () => {
    form.reset();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog,
    {
      open,
      onClose,
      size: "sm",
      labelledBy: titleId,
      dismissible: !form.submitting,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { id: titleId, children: "Add an application" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { id: formId, ...form.formProps, className: "grid gap-3 px-5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "Something this project ships to its own users, with its own environments: a website, an admin panel, a desktop app." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Name", required: true, error: form.errors.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ...form.fieldProps("name"),
              autoFocus: true,
              maxLength: 60,
              placeholder: "Admin panel"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { children: form.error })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              disabled: form.submitting,
              onClick: cancel,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              form: formId,
              size: "sm",
              variant: "primary",
              disabled: form.submitting,
              children: form.submitting ? "Adding…" : "Add application"
            }
          )
        ] })
      ]
    }
  );
}
const count = (n, one, many) => `${n} ${n === 1 ? one : many}`;
function ladderWith(entry, observed) {
  const kind = environmentKindOf(observed.name, observed.url);
  const rank = (k) => ENVIRONMENT_KINDS.indexOf(k);
  const steps = entry.ladder.map((env) => ({
    id: env.id,
    name: env.name,
    kind: env.kind,
    approval: env.approval,
    ...env.githubEnvironment ? { githubEnvironment: env.githubEnvironment } : {},
    ...env.url ? { url: env.url } : {}
  }));
  const name = observed.name.trim().slice(0, 40);
  const step = { name: name[0].toUpperCase() + name.slice(1), kind, approval: "automatic", githubEnvironment: observed.name, ...observed.url ? { url: observed.url } : {} };
  const at = steps.findIndex((env) => rank(env.kind) > rank(kind));
  return at < 0 ? [...steps, step] : [...steps.slice(0, at), step, ...steps.slice(at)];
}
function ProjectApplicationsView({
  projectId,
  process,
  catalog,
  pending,
  act,
  onOpenApplication,
  setupChange,
  setup,
  setupCommand: setupCommand2
}) {
  const [adding, setAdding] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", "data-project-applications": true, children: [
    setup && setup.gaps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Setup", className: "flex min-w-0 flex-col gap-2.5", "data-setup-gaps": true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "SETUP · NEEDS YOU", count: setup.gaps.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 grid list-disc gap-1 pl-5 type-ui-body text-body", children: setup.gaps.map((gap) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: gap.detail }, gap.detail)) }),
      setup.onOpenGitHub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "primary", size: "sm", onClick: setup.onOpenGitHub, children: [
        "Choose repositories ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, "aria-hidden": true })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Applications", className: "flex min-w-0 flex-col gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          label: "APPLICATIONS",
          count: process.applications.length,
          rightItem: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "ghost", size: "xs", onClick: () => setAdding(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, "aria-hidden": true }),
            "Add application"
          ] })
        }
      ),
      setupChange && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2 px-0.5", "data-setup-change": true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1 truncate type-ui-meta text-muted", title: setupChange.summary, children: [
          "Set up by ",
          setupChange.by,
          " · ",
          setupChange.when,
          " · ",
          setupChange.summary
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "xs",
            disabled: pending || Boolean(setupChange.undoBlockedReason),
            title: setupChange.undoBlockedReason,
            onClick: () => void act("setup_undo", { projectId, changeId: setupChange.id }),
            children: "Undo"
          }
        )
      ] }),
      process.applications.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { "aria-label": "Applications", children: process.applications.map((entry) => {
        const id = entry.application.id;
        const counts = applicationCounts(process, id);
        const scenarios = catalog?.scenarios.filter((scenario) => scenario.applicationId === id).length ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfigurableListItem,
          {
            concept: "application",
            title: entry.application.name,
            onSelect: () => onOpenApplication(id),
            status: counts.waiting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "soft", color: "warning", size: "sm", children: [
              counts.waiting,
              " waiting for you"
            ] }) : void 0,
            metadata: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: entry.ladder.length ? entry.ladder.map((environment) => environment.name).join(" → ") : "Released by the merge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: count(scenarios, "test", "tests") }),
              counts.underway > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                counts.underway,
                " on the way"
              ] }),
              counts.live > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                counts.live,
                " live"
              ] })
            ] })
          },
          id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: setupCommand2 ? "No applications yet. Run Blume's setup in your agent: it reads how the project is built and shipped, and describes each application it ships." : "No applications yet. Add the things this project ships (a website, an admin panel, a desktop app), or let an agent add one when it first tests it." }),
        setupCommand2
      ] })
    ] }),
    process.unassigned.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Deployments without an application", className: "flex min-w-0 flex-col gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "DEPLOYMENTS WITHOUT AN APPLICATION", count: process.unassigned.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Code was deployed here, but Blume can’t tell which application it is. Assign it, and deliveries move along that application’s steps." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListGroup, { children: process.unassigned.map((observed) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConfigurableListItem,
        {
          title: observed.name,
          metadata: observed.url,
          trailing: process.applications.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "xs", disabled: pending, children: "Assign to…" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", "aria-label": `Assign ${observed.name} to an application`, children: process.applications.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              DropdownMenuItem,
              {
                onSelect: () => void act("process_update", { applicationId: entry.application.id, environments: ladderWith(entry, observed) }),
                children: entry.application.name
              },
              entry.application.id
            )) })
          ] }) : void 0
        },
        observed.name
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddApplicationDialog,
      {
        open: adding,
        draftKey: `add-application:${projectId}`,
        onClose: () => setAdding(false),
        onSave: (name) => act("application_create", { projectId, name }, { throws: true })
      }
    )
  ] });
}
const errorMessage = (error, fallback) => error instanceof Error && error.message ? error.message : fallback;
function AgentCommand({
  options,
  defaultOption,
  label,
  run,
  agents = [],
  onSend,
  onCopy,
  prompt,
  className
}) {
  const selectId = reactExports.useId();
  const [agentId, setAgentId] = reactExports.useState(agents[0]?.id ?? "");
  const [feedback, setFeedback] = reactExports.useState({ state: "idle" });
  const option = options[0];
  const target = agents.find((agent) => agent.id === agentId) ?? agents[0];
  reactExports.useEffect(() => {
    if (feedback.state !== "copied") return;
    const timeout = window.setTimeout(() => setFeedback({ state: "idle" }), 1800);
    return () => window.clearTimeout(timeout);
  }, [feedback]);
  if (!option) return null;
  const runAgent = options.find((item) => item.id === defaultOption) ?? option;
  const copyPrompt = async () => {
    if (!prompt) return;
    setFeedback(await copyText(prompt) ? { state: "copied" } : { state: "error", message: "Could not copy. Select the text and copy it." });
  };
  const start = async () => {
    if (!run) return;
    setFeedback({ state: "busy" });
    try {
      await run.onRun(runAgent.id);
      setFeedback({ state: "idle" });
    } catch (error) {
      setFeedback({ state: "error", message: errorMessage(error, "Terminal did not start. Copy the command instead.") });
    }
  };
  const send = async () => {
    if (!onSend || !target) return;
    setFeedback({ state: "busy" });
    try {
      await onSend(target.id);
      setFeedback({ state: "sent", to: target.label });
    } catch (error) {
      setFeedback({ state: "error", message: errorMessage(error, "Could not send it. Copy the command instead.") });
    }
  };
  const canSend = Boolean(onSend && target && prompt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid min-w-0 gap-2", className), "data-agent-command": runAgent.id, children: [
    label ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta font-semibold text-muted", children: label }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(CopyLine, { type: "agent", value: option.command, petalEffect: true, onCopy: (copied) => {
      if (copied) onCopy?.(option.id);
    } }),
    (run || canSend) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2", children: [
      run && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          title: `Start ${runAgent.label} in ${run.folder} with ${runAgent.command}`,
          disabled: feedback.state === "busy",
          onClick: () => void start(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquareTerminal, { size: 14, "aria-hidden": true }),
            "Run in ",
            runAgent.label
          ]
        }
      ),
      run && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate type-ui-meta text-muted", children: [
        "in ",
        run.folder
      ] }),
      canSend && agents.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        NativeSelect,
        {
          id: selectId,
          "aria-label": "Agent to send it to",
          className: "min-w-0 max-w-full",
          value: target.id,
          onChange: (event) => setAgentId(event.target.value),
          children: agents.map((agent) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: agent.id, children: agent.label }, agent.id))
        }
      ),
      canSend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: run ? "outline" : "primary",
          size: "sm",
          className: "min-w-0 max-w-full",
          title: `Send to ${target.label}`,
          disabled: feedback.state === "busy",
          onClick: () => void send(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14, "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: agents.length > 1 ? "Send" : `Send to ${target.label}` })
          ]
        }
      )
    ] }),
    prompt && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-meta text-muted", children: [
      "Other agent?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "link", size: "inline", onClick: () => void copyPrompt(), children: feedback.state === "copied" ? "Prompt copied" : "Copy as a prompt" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", role: "status", "aria-live": "polite", children: feedback.state === "copied" ? "Prompt copied" : "" }),
    feedback.state === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 type-ui-meta text-body", role: "status", children: [
      "Sent. ",
      feedback.to,
      " reads it on its next Blume call or new conversation."
    ] }),
    feedback.state === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-danger", role: "alert", children: feedback.message })
  ] });
}
const SETUP_OPTIONS = TERMINAL_AGENTS.map((agent) => ({
  id: agent.id,
  label: agent.label,
  command: setupCommand(agent.id)
}));
const commandFor = (agentId) => setupCommand(agentId);
function SetupCommand({
  state,
  setup,
  label,
  className
}) {
  const capture = useDeliveryEvent();
  const run = useStartInTerminal(setup?.project.repositories, commandFor);
  const prompt = setupPrompt(setup);
  const lastHarness = [...state.threads].filter((thread) => !thread.revoked).sort((a, b) => b.lastSeenAt - a.lastSeenAt).find((thread) => SETUP_OPTIONS.some((option) => option.id === thread.harness))?.harness;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AgentCommand,
    {
      options: SETUP_OPTIONS,
      onCopy: (harness) => capture("deliveries_setup_command_copied", { harness }),
      defaultOption: lastHarness,
      label,
      run: run && { folder: run.folder, onRun: run.onStart },
      prompt,
      className
    }
  );
}
function projectFlowerChoice(projectSeed, n) {
  return `${projectSeed} · flower ${n}`;
}
function ProjectFlowerPicker({
  projectSeed,
  projectName,
  current,
  disabled,
  onChoose
}) {
  const [page, setPage] = reactExports.useState(0);
  const choices = Array.from({ length: 9 }, (_, index) => projectFlowerChoice(projectSeed, page * 9 + index + 1));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta font-medium text-[var(--text-strong)]", children: "Choose a flower" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "icon-xs",
          variant: "ghost",
          "aria-label": "Show nine other flowers",
          title: "Show nine other flowers",
          onClick: () => setPage((value) => value + 1),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: choices.map((seed, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled,
        "aria-label": `Flower ${page * 9 + index + 1} for ${projectName}`,
        "aria-pressed": seed === current,
        onClick: () => onChoose(seed),
        className: cn(
          "flex cursor-pointer rounded-[30%] [corner-shape:squircle] p-0.5 outline-none",
          "hover:bg-[var(--bg-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-default disabled:opacity-60",
          seed === current && "ring-2 ring-[var(--accent)]"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed, size: 56 })
      },
      seed
    )) })
  ] });
}
const VERDICT_STATE = {
  passed: "passed",
  failed: "failed",
  blocked: "blocked",
  running: "running",
  pending: "queued"
};
const VERDICT_LABEL = {
  passed: TEST_RUN_STATES.passed.label,
  failed: TEST_RUN_STATES.failed.label,
  blocked: TEST_RUN_STATES.blocked.label,
  running: TEST_RUN_STATES.running.label,
  pending: TEST_RUN_STATES.queued.label
};
function projectCounts(props, model, ids, onSelect) {
  const waiting = model.attention.length + props.suggestions.length;
  const all = {
    attention: waiting ? {
      concept: "verification",
      count: waiting,
      label: plural(waiting, "needs you", "need you"),
      tone: "attention",
      description: [
        model.attention.length && count$1(model.attention.length, "delivery waits on you", "deliveries wait on you"),
        props.suggestions.length && count$1(props.suggestions.length, "join suggestion", "join suggestions")
      ].filter(Boolean).join(", ")
    } : null,
    deliveries: {
      concept: "delivery",
      count: model.deliveries.length,
      label: plural(model.deliveries.length, "delivery", "deliveries")
    },
    improve: {
      concept: "cluster",
      count: model.clusters.length,
      label: plural(model.clusters.length, "improvement", "improvements")
    },
    // Every agent with its conversation: the connected ones and those only on this computer.
    agents: {
      concept: "agent",
      count: model.connected.length + model.localAgents.length,
      label: plural(model.connected.length + model.localAgents.length, "agent", "agents"),
      avatars: projectPeople(model)?.items
    },
    tests: {
      concept: "tests",
      count: model.tests.applications.length,
      label: plural(model.tests.applications.length, "test application", "test applications")
    },
    locations: {
      concept: "repo-main",
      count: model.locations.length,
      label: plural(model.locations.length, "location", "locations")
    }
  };
  return ids.flatMap((id) => {
    const item = all[id];
    return item ? [{ ...item, id, onSelect: void 0 }] : [];
  });
}
function projectFacts(props, model, nav = {}) {
  const at = (place) => place ? { place } : {};
  const checkouts = model.locations.reduce((sum, location) => sum + location.checkouts.length, 0);
  const verdict = model.latestVerdict;
  const latestApp = model.latestExecution ? model.tests.applications.find((app) => app.id === model.latestExecution.applicationId) : void 0;
  return {
    activity: (place) => model.lastActivity ? {
      id: "activity",
      label: "Last activity",
      value: deliveryActivityLabel(model.lastActivity, model.now),
      concept: "activity",
      metric: true,
      ...at(place)
    } : null,
    /** Each repository and folder; GitHub repositories link out, folders to their setup. */
    locations: (place) => model.locations.map((location, index) => ({
      id: `location-${location.repository}`,
      label: location.folder ? "Folder" : "Repository",
      // The fact is the link (GitHub, or its setup); the location is its source's reference.
      value: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SourceReference,
        {
          source: sourceOfLocation(
            location,
            props.localHost ? { homeDir: props.localHost.system.homeDir } : null
          )
        }
      ),
      priority: index ? "secondary" : "primary",
      link: location.page ? { href: location.page } : nav.onShowLocation ? { onSelect: () => nav.onShowLocation(location) } : void 0,
      linkLabel: location.page ? `Open ${location.label} on GitHub` : `Show the setup of ${location.label}`,
      ...at(place)
    })),
    computer: (place) => props.localHost ? {
      id: "computer",
      label: "This computer",
      value: checkouts ? count$1(checkouts, "checkout", "checkouts") : "Not checked out",
      concept: "worktree",
      link: checkouts && nav.onShowComputer ? { onSelect: nav.onShowComputer } : void 0,
      linkLabel: "Show the agents on this computer",
      ...at(place)
    } : null,
    /** `sentence` says "Tests passed 2 h ago" for bars that hide the label. */
    tests: (place, sentence = false) => model.tests.applications.length ? {
      id: "tests",
      label: "Latest test run",
      value: verdict && model.latestExecution ? `${sentence ? `Tests ${VERDICT_LABEL[verdict].toLowerCase()}` : VERDICT_LABEL[verdict]} ${deliveryActivityLabel(model.latestExecution.at, model.now)}` : sentence ? "Tests not run yet" : "Not run yet",
      ...verdict && model.latestExecution ? {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TestResultFacet,
          {
            value: VERDICT_STATE[verdict],
            size: 14,
            name: VERDICT_LABEL[verdict]
          }
        )
      } : { concept: "tests" },
      link: latestApp ? { onSelect: () => model.openTests({ kind: "application", id: latestApp.id }) } : void 0,
      linkLabel: latestApp ? `Open test application ${latestApp.name}` : void 0,
      ...at(place)
    } : null,
    harnesses: (place) => model.sources.length ? {
      id: "harnesses",
      label: plural(model.sources.length, "Harness", "Harnesses"),
      value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex min-w-0 items-center gap-2", children: model.sources.map((harness) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CodingToolReference,
        {
          tool: codingToolOfHarness(harness, harnessLabel(harness))
        },
        harness
      )) }),
      priority: "secondary",
      ...at(place)
    } : null,
    deliveries: (place) => ({
      id: "deliveries",
      label: "Deliveries",
      value: model.deliveries.length ? `${model.active.length + model.attention.length} of ${count$1(model.deliveries.length, "delivery", "deliveries")} in progress` : "No deliveries yet",
      concept: "delivery",
      link: model.deliveries.length ? { onSelect: model.openDeliveries } : void 0,
      linkLabel: "Open this project in Deliveries",
      ...at(place)
    }),
    agents: (place) => ({
      id: "agents",
      label: "Agents",
      value: model.agents.length ? `${count$1(model.connected.length, "agent", "agents")} connected${model.agents.length > model.connected.length ? `, ${model.agents.length - model.connected.length} revoked` : ""}` : "No agents yet",
      concept: "agent",
      link: model.agents.length && nav.onShowAgents ? { onSelect: nav.onShowAgents } : void 0,
      ...at(place)
    }),
    improve: (place) => ({
      id: "improve",
      label: "Improve",
      value: model.clusters.length ? `${count$1(model.clusters.length, "improvement", "improvements")}${model.needing.length ? `, ${model.needing.length} to make` : ""}` : "No signals yet",
      concept: "cluster",
      priority: "secondary",
      ...at(place)
    })
  };
}
function projectPeople(model, onSelect) {
  if (!model.connected.length) return void 0;
  return {
    items: model.connected.map((agent) => {
      const connection = agent.connections[0];
      return { id: connection.id, title: connection.title, harness: connection.harness, project: connection.project };
    }),
    label: "Agents in this project",
    onSelect,
    selectLabel: "Show this project’s agents"
  };
}
function projectHeader(props, model, parts) {
  const { project, pending } = props;
  const seed = repositoryFlowerSeed(project.repositories[0]);
  return {
    view: "project",
    kind: "Project",
    kindConcept: "project",
    title: project.name,
    titleEdit: {
      label: "Project name",
      maxLength: 120,
      editing: model.rename.renaming,
      onEditingChange: (editing) => editing ? model.rename.start() : model.rename.cancel(),
      onSubmit: model.rename.submitName
    },
    identity: {
      node: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed, label: project.name }),
      shape: "tile",
      picker: {
        label: `Change ${project.name}'s flower`,
        content: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProjectFlowerPicker,
          {
            projectSeed: seed,
            projectName: project.name,
            ...project.avatar ? { current: project.avatar } : {},
            disabled: pending,
            onChoose: (avatar) => void model.flower.choose(avatar)
          }
        )
      }
    },
    ...parts,
    menu: projectActions({
      onRename: model.rename.start,
      onArchive: model.archive.toggle,
      archived: model.archive.archived,
      listedDeliveries: model.archive.listedDeliveries
    })
  };
}
function CloudProjectCard({ props }) {
  const { project, host, act, pending } = props;
  const enabled = useCloudChatFeature();
  const owned = useOwnedCodexChats(host);
  const [error, setError] = reactExports.useState("");
  const source = project.codeSource;
  const workspaces = [
    ...new Map(
      owned.chats.filter(
        (chat) => chat.execution && project.repositories.some((repo) => sameRepository(repo, chat.execution.repository))
      ).map((chat) => [chat.execution.workspaceId ?? chat.id, chat])
    ).entries()
  ];
  if (!enabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: "Project code", titleAs: "h2", concept: "repo-main" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          label: "Code location",
          hint: source ? "The cloud workspace is the source of truth. Chats share its current files, including uncommitted changes." : "Use a cloud workspace to keep this project’s working files in the cloud.",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: source?.workspaceId ?? "local",
              disabled: pending,
              onValueChange: async (value) => {
                setError("");
                const chat = workspaces.find(([id]) => id === value)?.[1];
                try {
                  const saved = await act("project_set_code_source", {
                    projectId: project.id,
                    codeSource: value === "local" ? null : chat?.execution ? {
                      kind: "cloud",
                      workspaceId: value,
                      repository: chat.execution.repository,
                      revision: chat.execution.revision
                    } : void 0
                  });
                  if (saved?.id && saved.id !== project.id) props.onOpenProject(saved.id);
                } catch (cause) {
                  setError(cause instanceof Error ? cause.message : "Could not save code location");
                }
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "Code location", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "local", children: "Local project" }),
                  workspaces.map(([id, chat]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: id, children: [
                    "Cloud · ",
                    chat.title
                  ] }, id)),
                  source && !workspaces.some(([id]) => id === source.workspaceId) && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: source.workspaceId, children: "Cloud workspace · reconnect required" })
                ] })
              ]
            }
          )
        }
      ),
      !source && !workspaces.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Create a cloud agent for this repository in Agents, then select its workspace here." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { children: error })
    ] })
  ] });
}
function CloudProjectFiles({ props }) {
  const enabled = useCloudChatFeature();
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const source = props.project.codeSource;
  const read = async (path, action) => {
    if (!enabled) return;
    setBusy(true);
    setError("");
    setResult(null);
    try {
      if (!props.host) throw Error("Connect to this project’s cloud owner to read its files");
      setResult(
        await props.host.call(OWNED_CLOUD_FILES_OPERATION, {
          id: source.workspaceId,
          path,
          action
        })
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not read cloud files");
    } finally {
      setBusy(false);
    }
  };
  if (!enabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: "Cloud files", titleAs: "h2", concept: "repo-main" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "Current files in the authoritative cloud workspace." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            disabled: busy,
            onClick: () => void read("", "list"),
            children: busy ? "Reading…" : "Browse cloud files"
          }
        ),
        result?.path && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            disabled: busy,
            onClick: () => void read(result.path.split("/").slice(0, -1).join("/"), "list"),
            children: "Up one folder"
          }
        ),
        result && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            disabled: busy,
            onClick: () => void read(result.path, "content" in result ? "read" : "list"),
            children: "Refresh"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { children: error }),
      result && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: result.path || "/" }),
      result && "entries" in result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1", children: [
        result.entries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            disabled: busy,
            onClick: () => void read(
              [result.path, entry.name].filter(Boolean).join("/"),
              entry.kind === "directory" ? "list" : "read"
            ),
            children: [
              entry.name,
              entry.kind === "directory" ? "/" : ""
            ]
          },
          entry.name
        )),
        result.truncated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Showing the first 200 entries. Open a folder to continue." })
      ] }),
      result && "content" in result && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-96 overflow-auto whitespace-pre-wrap break-words type-ui-meta", children: result.content })
    ] })
  ] });
}
function PlanReviewCard({ props }) {
  const { project, act, pending } = props;
  const data = useOptionalHostedData();
  const recording = data ? Boolean(data.capabilities.approvalRecording?.enabled) : true;
  const value = project.planReview ?? "off";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "none", className: "gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: "Plan review", titleAs: "h2", concept: "plan-review" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 p-4", children: [
      !recording && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "This workspace does not record approvals yet, so agents are not asked to have their plans reviewed. The choice below applies once it does." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        ChoiceGroup,
        {
          "aria-label": "Plan review",
          value,
          busy: pending,
          disabled: !recording,
          onValueChange: (next) => {
            if (next !== value)
              void act("project_set_plan_review", { projectId: project.id, planReview: next });
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChoiceRow,
              {
                value: "off",
                title: "Off",
                description: "Agents plan and build without a review of the plan."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChoiceRow,
              {
                value: "advisory",
                title: "Optional",
                description: "Agents ask you to look at the plan and carry on."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChoiceRow,
              {
                value: "required",
                title: "Required",
                description: "Build waits until you approve the plan in Blume."
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function ProtectSettingsCard({ props }) {
  const { project, act, pending } = props;
  const value = project.settingsLocked ? "locked" : "off";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "none", className: "gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: "Protect settings", titleAs: "h2", concept: "agent" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ChoiceGroup,
      {
        "aria-label": "Protect settings",
        value,
        busy: pending,
        onValueChange: (next) => {
          if (next !== value)
            void act("project_set_settings_lock", { projectId: project.id, locked: next === "locked" });
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChoiceRow,
            {
              value: "off",
              title: "Off",
              description: "Agents can update this project's settings while they work."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChoiceRow,
            {
              value: "locked",
              title: "Locked",
              description: "Agents can read the settings but not change them. They ask you to unlock first."
            }
          )
        ]
      }
    ) }) })
  ] });
}
function preferredSetup(location, current) {
  return location.setups.find((option) => option.detail === current?.detail) ?? location.setups[0];
}
const sourceAction = (option) => option.id.startsWith("local:") ? "Read this computer’s checkout" : option.detail.startsWith("On GitHub") ? "Read GitHub’s default branch" : "Read the registered folder";
function ProjectSourcesCard({
  props,
  model
}) {
  const { host, localHost, project, pending, act, onOpenProject, onAddSources } = props;
  const homeDir = localHost?.system.homeDir;
  const entries = reactExports.useMemo(
    () => model.locations.map((location) => ({
      location,
      source: sourceOfLocation(location, localHost ? { homeDir } : null),
      setup: preferredSetup(location, model.setup)
    })),
    [model.locations, model.setup, localHost, homeDir]
  );
  const entryOf = (source) => entries.find((entry) => entry.source === source);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SourcesCard,
    {
      sources: entries.map((entry) => entry.source),
      className: "h-full",
      selectable: (source) => Boolean(entryOf(source)?.setup),
      onSelect: (source) => {
        const setup = entryOf(source)?.setup;
        if (setup) model.openSetup(setup.id);
      },
      action: onAddSources && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", size: "xs", variant: "ghost", onClick: onAddSources, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": true }),
        "Add"
      ] }),
      rowActions: (source) => {
        const location = entryOf(source)?.location;
        if (!location) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          location.page && host && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "icon-sm",
              variant: "ghost",
              "aria-label": `Open ${location.label} on GitHub`,
              onClick: () => void host.openEvidence(location.page),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, "aria-hidden": true })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RepositoryMenu,
            {
              repository: location.repository,
              others: model.others,
              canSplit: project.repositories.length > 1,
              pending,
              onMove: async (into) => {
                await act("project_move_repository", {
                  repository: location.repository,
                  intoProjectId: into.id
                });
              },
              onSplit: async () => {
                await act("project_split_repository", { repository: location.repository });
                onOpenProject(location.repository);
              }
            }
          )
        ] });
      }
    }
  );
}
function ProjectSetupTab({
  props,
  model
}) {
  if (props.project.codeSource)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CloudProjectCard, { props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CloudProjectFiles, { props }, props.project.codeSource.workspaceId),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlanReviewCard, { props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectSettingsCard, { props })
    ] });
  const current = model.setup;
  const location = model.locations.find((item) => item.repository === current?.location);
  const other = location?.setups.find((option) => option.id !== current?.id);
  const readable = model.locations.filter((item) => item.setups.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CloudProjectCard, { props }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlanReviewCard, { props }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectSettingsCard, { props }),
    readable.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CountTabs,
      {
        ariaLabel: "Sources",
        value: location?.repository,
        onValueChange: (repository) => {
          const next = readable.find((item) => item.repository === repository);
          const option = next && preferredSetup(next, current);
          if (option) model.selectSetup(option.id);
        },
        tabs: readable.map((item) => ({
          id: item.repository,
          label: item.label,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed: repositoryFlowerSeed(item.repository), size: 14 })
        }))
      }
    ),
    current && other && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-2 px-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "type-ui-meta text-muted", children: [
        current.label,
        " · ",
        current.detail
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "xs",
          onClick: () => model.selectSetup(other.id),
          children: sourceAction(other)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSetup, { props, model })
  ] });
}
const viewFor = (tab) => !tab ? "setup" : tab === "conversations" ? "agents" : tab;
function ProjectPage(props) {
  const model = useProjectPage(props);
  const view = viewFor(model.tab);
  const facts = projectFacts(props, model);
  const { counts: _counts, ...header } = projectHeader(props, model, {
    // The bar's left is the project's status: connected while an agent is. The latest test run
    // and the last activity sit on its right. The agents' faces are on the Agents chip.
    status: model.connected.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSummaryBadge, { tone: "success", size: "md", children: "Connected" }) : void 0,
    facts: compact([facts.tests("top", true), facts.activity()])
  });
  const chips = projectCounts(props, model, ["deliveries", "improve", "agents", "tests"]);
  const content = {
    deliveries: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectDeliveries,
      {
        props,
        model,
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "xs", onClick: model.openDeliveries, children: "Open in Deliveries" })
      }
    ),
    improve: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectImprove, { props, model }),
    agents: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAgents, { props, model }),
    tests: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectTests, { props, model })
  };
  const views = [
    { id: "setup", chip: { concept: "setup", label: "Setup" }, content: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSetupTab, { props, model }) },
    { id: "applications", chip: { concept: "application", label: "Applications" }, content: /* @__PURE__ */ jsxRuntimeExports.jsx(Applications, { props, model }) },
    ...chips.map((chip) => ({
      id: chip.id,
      chip: { concept: chip.concept, count: chip.count, label: chip.label, avatars: chip.avatars },
      content: content[chip.id]
    }))
  ];
  const value = views.some((item) => item.id === view) ? view : "setup";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { as: "section", padding: "sm", stack: true, "data-project-page": true, children: [
    !props.project.codeSource && props.githubNotice,
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderViews, { header, views, value, onValueChange: (id) => model.setTab(id) }),
    props.columnSlot && reactDomExports.createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSourcesCard, { props, model }),
      props.columnSlot
    )
  ] });
}
function latestSetupChange(props) {
  const change = (props.state.setupChanges ?? []).filter((item) => item.projectId === props.project.id).at(-1);
  if (!change) return void 0;
  const thread = props.state.threads.find((item) => item.id === change.actorId);
  return {
    id: change.id,
    summary: change.summary,
    undoBlockedReason: change.undoBlockedReason,
    by: change.actorId === "human" ? "you" : thread ? `${harnessLabel(thread.harness)} (${thread.title})` : "an agent",
    when: new Date(change.at).toLocaleString(void 0, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
  };
}
function Applications({ props, model }) {
  const process = reactExports.useMemo(
    () => projectProcess({ projects: props.state.projects, deliveries: props.state.deliveries, tests: props.catalog ?? props.state.tests }, props.project.id),
    [props.state.projects, props.state.deliveries, props.catalog, props.state.tests, props.project.id]
  );
  const route = useOptionalAppRoute();
  const openGitHub = route ? () => route.update((current) => ({ ...openSettingsRoute(current), settingsSection: "github" })) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-6", children: [
    !props.project.codeSource && props.githubNotice,
    props.suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MergeSuggestions, { suggestions: props.suggestions, pending: props.pending, act: props.act }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectApplicationsView,
      {
        projectId: props.project.id,
        process,
        catalog: props.catalog ?? props.state.tests,
        pending: props.pending,
        act: props.act,
        onOpenApplication: (id) => model.openTests({ kind: "application", id }),
        setupChange: latestSetupChange(props),
        setup: { gaps: personSetupGaps(props), onOpenGitHub: openGitHub },
        setupCommand: /* @__PURE__ */ jsxRuntimeExports.jsx(SetupCommand, { state: props.state, setup: { project: props.project } })
      }
    )
  ] });
}
function personSetupGaps(props) {
  return projectSetup({ ...props.state, tests: props.catalog ?? props.state.tests }, props.project).gaps.filter(personSetupGap);
}
function ProjectsPage({
  host,
  projects,
  github,
  state,
  loaded = true,
  catalog,
  pending,
  act,
  onOpenDelivery,
  onOpenAgentConversation,
  onSubHeader,
  tests
}) {
  const { route, update } = useAppRoute();
  const card = useCardControls();
  const localHost = useOptionalSidecarHost();
  const capture = useDeliveryEvent();
  const go = reactExports.useCallback(
    (projectId, tab) => update((current) => ({
      ...current,
      projectId,
      projectTab: tab,
      projectSetup: void 0,
      projectAgent: void 0,
      projectLocal: void 0,
      projectAdd: void 0,
      ...CLOSED_APPLICATION
    })),
    [update]
  );
  const openApplication = (id) => update((current) => ({
    ...current,
    ...CLOSED_APPLICATION,
    projectId: void 0,
    projectTab: void 0,
    projectSetup: void 0,
    projectAgent: void 0,
    projectLocal: void 0,
    projectAdd: void 0,
    selection: { kind: "application", id },
    background: { kind: "application", id }
  }));
  const openAdd = reactExports.useCallback(
    (projectId, local) => update((current) => ({
      ...current,
      projectId,
      projectLocal: local,
      projectTab: projectId === current.projectId ? current.projectTab : void 0,
      projectSetup: void 0,
      projectAgent: void 0,
      projectAdd: true,
      // Add project replaces an open application, so the address changes and nothing is left
      // to reopen Add project once the application closes.
      ...CLOSED_APPLICATION
    })),
    [update]
  );
  const closeAdd = () => card?.close ? card.close() : update((current) => ({ ...current, projectAdd: void 0 }));
  const [renameRequest, setRenameRequest] = reactExports.useState();
  const [columnSlot, setColumnSlot] = reactExports.useState(null);
  const { status } = useGitHubConnection();
  const connected = Boolean(status?.connected);
  const openGitHubSettings = useOpenGitHubSettings();
  const repositories = useGitHubRepositories(projects, connected, status?.login);
  const surface = reactExports.useMemo(
    () => projects ? githubSetupSurfaceFor(projects) : void 0,
    [projects]
  );
  reactExports.useEffect(() => () => onSubHeader?.(null), [onSubHeader]);
  const localProjects = useLocalProjects(localHost);
  const application = useApplicationView({
    ...tests,
    state,
    pending,
    loaded,
    onAction: act,
    onOpenProject: (id) => go(id, "applications"),
    overview: (app, project) => project ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ApplicationOverview,
      {
        applicationId: app.id,
        process: projectProcess(
          {
            projects: state.projects,
            deliveries: state.deliveries,
            tests: catalog ?? state.tests
          },
          project.id
        ),
        projectName: project.name,
        pending,
        act
      }
    ) : void 0
  });
  const projectApplications = reactExports.useMemo(
    () => applicationsByProject(state, application.catalog),
    [state, application.catalog]
  );
  const [moreApplications, setMoreApplications] = reactExports.useState(/* @__PURE__ */ new Set());
  const all = reactExports.useMemo(() => {
    const projects2 = listProjects(state);
    const named = projectApplications.map((group) => group.project).filter((project) => !projects2.some((item) => sameProject(state, item.id, project.id)));
    return [...projects2, ...named];
  }, [state, projectApplications]);
  const [listed, archived] = reactExports.useMemo(() => {
    const isArchived = (project) => projectArchived(state, project);
    return [all.filter((p) => !isArchived(p)), all.filter(isArchived)];
  }, [all, state]);
  const suggestions = reactExports.useMemo(() => projectMergeSuggestions(state), [state]);
  const summaries = reactExports.useMemo(
    () => new Map(all.map((project) => [project.id, projectSummary(state, project)])),
    [all, state]
  );
  const candidates = reactExports.useMemo(
    () => sourceCandidates({
      projects: all,
      locals: localProjects.data,
      github: repositories.list,
      homeDir: localHost?.system.homeDir
    }),
    [all, localProjects.data, repositories.list, localHost]
  );
  const linkedLocal = route.projectLocal ? localProjects.data?.find((local) => local.id === route.projectLocal) : void 0;
  const selected = route.projectId ? projectForRoute(state, all, route.projectId) : linkedLocal ? ledgerProjectForLocal(all, linkedLocal) : void 0;
  const renameAsked = useLocation().state?.renameProject;
  const selectedId = selected?.id;
  reactExports.useEffect(() => {
    if (renameAsked && selectedId) setRenameRequest({ projectId: selectedId, at: renameAsked });
  }, [renameAsked, selectedId]);
  const resolving = !loaded || Boolean(route.projectLocal) && !route.projectId && !localProjects.data && localProjects.loading;
  const selectedAgent = state.threads.find(
    (thread) => thread.id === route.projectAgent && selected && sameProject(state, thread.project, selected.id)
  );
  const checkouts = reactExports.useMemo(
    () => localProjects.data && selected ? matchLocalProjects(selected.repositories, localProjects.data) : [],
    [localProjects.data, selected]
  );
  const conversations = useProjectConversations(localHost, checkouts);
  const { open } = useAppRoute();
  const openAgentConversation = (() => {
    const sessions = new Map(
      selected ? projectAgents(state, selected, conversations.data ?? []).flatMap(
        (agent) => agent.session ? agent.connections.map((c) => [c.id, agent.session.ref]) : []
      ) : []
    );
    if (!sessions.size && !onOpenAgentConversation) return void 0;
    return async (thread) => {
      const ref = sessions.get(thread.id);
      if (ref) {
        open(conversationPath(ref));
        return "opened";
      }
      return onOpenAgentConversation ? onOpenAgentConversation(thread) : "elsewhere";
    };
  })();
  const githubNeed = !github || !status ? null : !connected ? status.appConfigured === false ? null : "connect" : repositories.list && repositories.list.installations.length === 0 ? "repositories" : null;
  const chooseRepositories = github?.openInstallation ? () => {
    capture("deliveries_github_install_clicked", { action: "install" });
    void github.openInstallation().catch(() => repositories.reload(true));
  } : void 0;
  const githubPage = (more) => githubNeed === "connect" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    EmptyPage,
    {
      scene: "hose",
      size: "hero",
      title: "Connect GitHub to fill in your projects",
      description: "Blume reads each repository’s agent setup from GitHub: its skills, rules, commands and hooks. Connect once and every project here shows what its agents work with.",
      action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "primary", onClick: openGitHubSettings, children: "Connect GitHub" }),
      children: more
    }
  ) : githubNeed === "repositories" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    EmptyPage,
    {
      scene: "hose",
      size: "hero",
      title: "Choose the repositories Blume can read",
      description: "GitHub is connected. Pick the repositories Blume may read, and their projects fill in with what their agents work with.",
      action: chooseRepositories ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "primary", onClick: chooseRepositories, children: "Choose repositories on GitHub" }) : void 0,
      children: more
    }
  ) : null;
  const githubNotice = !github ? null : !status ? null : !connected ? status.appConfigured === false ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Attention,
    {
      placement: "page-bar",
      id: "github-connect",
      message: "Connect GitHub to see each repository's agent setup.",
      action: { label: "Connect GitHub", onSelect: openGitHubSettings }
    }
  ) : repositories.list && repositories.list.installations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Attention,
    {
      placement: "page-bar",
      id: "github-repositories",
      message: "Choose the repositories Blume can read.",
      action: chooseRepositories ? {
        label: "Choose repositories on GitHub",
        onSelect: chooseRepositories
      } : void 0
    }
  ) : repositories.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "m-0 type-ui-meta text-danger", children: repositories.error }) : null;
  const archiveProject = async (project, value) => {
    const result = await act("project_archive", { projectId: project.id, archived: value });
    if (result?.projectId && result.projectId !== project.id && selected?.id === project.id)
      go(result.projectId);
  };
  const projectRow = (project) => {
    const deliveries = projectDeliveries(state, project);
    const summary = summaries.get(project.id) ?? projectSummary(state, project);
    const waiting = suggestions.filter(
      (s) => s.into.id === project.id || s.from.id === project.id
    ).length;
    const applications = rankApplications(
      projectApplications.filter((group) => sameProject(state, group.project.id, project.id)).flatMap((group) => group.applications),
      application.catalog
    );
    const selectedAt = applications.findIndex((app) => app.id === application.applicationId);
    const showAll = moreApplications.has(project.id) || selectedAt >= APPLICATIONS_SHOWN;
    const shown = showAll ? applications : applications.slice(0, APPLICATIONS_SHOWN);
    const hidden = applications.length - shown.length;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProjectListItem,
      {
        frame: "card",
        summary,
        now: Date.now(),
        selected: !application.open && selected?.id === project.id,
        onOpen: () => go(project.id),
        menu: projectActions({
          onRename: () => {
            if (selected?.id !== project.id) go(project.id);
            setRenameRequest({ projectId: project.id, at: Date.now() });
          },
          onArchive: (value) => archiveProject(project, value),
          archived: archived.includes(project),
          listedDeliveries: deliveries.filter(
            (d) => sameProject(state, d.project, project.id) && !isDeliveryArchived(d, state.messages, Date.now())
          ).length
        }),
        aside: waiting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "soft",
            color: "accent",
            size: "sm",
            title: "A delivery spans this and another project",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitMerge, { "aria-hidden": "true" }),
              waiting
            ]
          }
        ) : void 0,
        children: [
          ...shown.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfigurableListItem,
            {
              title: app.name,
              concept: "application",
              selected: application.applicationId === app.id,
              onSelect: () => openApplication(app.id)
            },
            app.id
          )),
          ...hidden > 0 ? [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PaginationBoundary,
              {
                hasMore: true,
                onLoadMore: () => setMoreApplications((current) => new Set(current).add(project.id)),
                label: "Show more",
                detail: countLabel(hidden, "application")
              },
              "more"
            )
          ] : []
        ]
      },
      project.id
    );
  };
  return (
    // A sub-view opened inside a project (an artifact from its setup) gets the shell's back bar
    // where there is no page chrome; never a bar of its own inside the page.
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubHeaderProvider, { value: onSubHeader ?? null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColumnLayout,
      {
        primaryHeader: "Projects",
        primaryHeaderTrailing: loaded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "xs", onClick: () => openAdd(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": true }),
          "Add project"
        ] }) : void 0,
        compactBackLabel: "Projects",
        onCompactBack: application.open ? application.close : () => go(void 0),
        contentKey: application.open ? application.contentKey : selected?.id ?? route.projectLocal ?? route.projectId,
        primary: !loaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "cp-muted", children: "Loading projects…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Projects", className: "flex min-w-0 flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "PROJECTS", count: listed.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ConfigurableListGroup,
              {
                variant: "cards",
                collapsible: false,
                levelStyles: PROJECT_CARD_LEVELS,
                pageSize: 40,
                moreLabel: "Show more projects",
                revealIndex: listed.findIndex((p) => p.id === selected?.id),
                children: listed.map(projectRow)
              }
            ),
            all.length > 0 && !listed.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "cp-muted m-0", children: "Every project is archived. A project comes back when an agent works in it again." }),
            !all.length && /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyStateCard,
              {
                title: "No projects yet",
                description: "Add one from the repositories and folders Blume found, or let your agents add one the first time they work in it with Blume.",
                action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "primary", onClick: () => openAdd(), children: "Add project" })
              }
            )
          ] }),
          archived.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Archived projects", className: "flex min-w-0 flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { label: "ARCHIVED", count: archived.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ConfigurableListGroup,
              {
                variant: "cards",
                collapsible: false,
                levelStyles: PROJECT_CARD_LEVELS,
                pageSize: 10,
                revealIndex: archived.findIndex((p) => p.id === selected?.id),
                moreLabel: "Show more projects",
                children: archived.map(projectRow)
              }
            )
          ] })
        ] }),
        subpage: application.open ? application.subpage : route.projectAdd && loaded && (!route.projectId || selected) ? {
          id: `add-project:${selected?.id ?? route.projectLocal ?? "new"}`,
          covers: "content-sidebar",
          title: selected ? `Add sources to ${selected.name}` : "Create project",
          concept: "project",
          onClose: closeAdd,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddProjectPage,
            {
              candidates,
              initial: linkedLocal ? sourceCandidates({ projects: [], locals: [linkedLocal] }).map(
                (c) => c.location
              ) : [],
              projectName: selected?.name,
              onCancel: closeAdd,
              onSubmit: async (name, chosen) => {
                const record = await act(
                  selected ? "project_add_sources" : "project_create",
                  selected ? { projectId: selected.id, ...sourcesInput(chosen) } : { name, ...sourcesInput(chosen) }
                );
                if (!record?.id) return false;
                go(record.id);
                return true;
              }
            },
            selected?.id ?? "new"
          )
        } : selectedAgent ? {
          id: selectedAgent.id,
          title: selectedAgent.title,
          concept: "agent",
          onClose: () => update((current) => ({ ...current, projectAgent: void 0 })),
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AgentConnectionDetails,
            {
              selected: selectedAgent,
              state,
              pending,
              act,
              onRevoke: (id) => void act("thread_revoke", { threadId: id }),
              onOpenDelivery,
              onOpenProject: (id) => go(id),
              onOpenConversation: openAgentConversation
            }
          )
        } : void 0,
        content: application.open ? application.content : resolving && (route.projectId || route.projectLocal) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: "cp-muted", children: "Loading project…" }) : selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProjectPage,
          {
            host,
            localHost,
            project: selected,
            projects: all,
            state,
            catalog,
            checkouts,
            conversations,
            suggestions: suggestions.filter(
              (s) => s.into.id === selected.id || s.from.id === selected.id
            ),
            repositories: repositories.list,
            surface,
            githubNotice,
            pending,
            act,
            onOpenProject: (id) => go(id),
            onOpenDelivery,
            onOpenAgent: (id) => update((current) => ({ ...current, projectAgent: id })),
            onOpenAgentConversation: openAgentConversation,
            renameRequest: renameRequest?.projectId === selected.id ? renameRequest.at : void 0,
            columnSlot,
            onAddSources: () => openAdd(selected.id)
          },
          selected.id
        ) : linkedLocal && localHost ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          LocalOnlyProject,
          {
            local: linkedLocal,
            localHost,
            onAddProject: () => openAdd(void 0, linkedLocal.id)
          }
        ) : route.projectId || route.projectLocal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorPage,
          {
            variant: "notFound",
            title: "This project is not here",
            description: "It may have been merged into another project, or it belongs to a workspace you are not in."
          }
        ) : !all.length ? (
          // Getting set up, in the column card, is what adds the first project.
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyPage,
            {
              variant: "nothingYet",
              scene: "seedTray",
              title: "No projects yet",
              description: "A project groups the repositories and folders your agents work in. Your agents add one the first time they work in it with Blume, or hand setup to an agent now."
            }
          )
        ) : githubNeed ? githubPage(
          suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MergeSuggestions, { suggestions, pending, act })
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          EmptyPage,
          {
            scene: "allotment",
            title: "Choose a project",
            description: "A project groups the repositories and folders your agents work in. Choose one to see its deliveries, improvements, agents, conversations, setup and tests.",
            children: [
              suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MergeSuggestions, { suggestions, pending, act }),
              githubNotice
            ]
          }
        ),
        columnCardChip: application.open ? { label: "Scenarios", concept: "tests" } : selected ? { label: "Sources", concept: "repo-main" } : { label: "Getting started", concept: "setup" },
        columnCard: (
          // An application's suites and scenarios beside its details.
          application.open ? application.columnCard : (
            // Keep the project underneath its routed source-selection card.
            selected && !resolving ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: setColumnSlot, className: "contents" }) : loaded && !all.length && !route.projectId && !route.projectLocal && host ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SetupJourney,
              {
                host,
                state,
                onOpenPlugin: () => open("/plugin"),
                onOpenProject: (id) => go(id)
              }
            ) : void 0
          )
        )
      }
    ) })
  );
}
function LocalOnlyProject({
  local,
  localHost,
  onAddProject
}) {
  const { route, update, open } = useAppRoute();
  const conversations = useProjectConversations(localHost, [local]);
  const view = route.projectTab === "conversations" ? "conversations" : "setup";
  const count2 = conversations.data?.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { as: "section", padding: "sm", stack: true, "data-project-page": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PageHeaderViews,
    {
      header: {
        view: "project",
        kind: "Project",
        kindConcept: "project",
        title: local.name,
        summary: "This folder is not in a Blume project yet. Add a project with it, or let an agent working here register it through the Blume plugin.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "primary", size: "sm", onClick: onAddProject, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": true }),
          "Add project"
        ] }),
        identity: {
          node: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectAvatar, { seed: repositoryFlowerSeed(local.root), label: local.name }),
          shape: "tile"
        },
        facts: [
          {
            id: "computer",
            label: "Where",
            value: "On this computer",
            concept: "worktree",
            place: "top"
          }
        ]
      },
      value: view,
      onValueChange: (id) => update((current) => ({ ...current, projectTab: id })),
      views: [
        {
          id: "setup",
          chip: { concept: "setup", label: "Setup" },
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SetupPage,
            {
              surface: localHost,
              namesProject: true,
              projectId: local.id,
              link: route.localSetupLink?.projectId === local.id ? route.localSetupLink : void 0,
              onLeave: () => {
              }
            }
          )
        },
        {
          // Kept as `conversations` so existing links still open it: each is an agent with its
          // conversation.
          id: "conversations",
          chip: {
            concept: "agent",
            count: count2,
            label: count2 === 1 ? "agent" : "agents"
          },
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LocalAgentList,
            {
              project: local.root,
              conversations: conversations.data ?? null,
              error: conversations.error,
              onOpen: (ref) => open(conversationPath(ref))
            }
          )
        }
      ]
    }
  ) });
}
const APPLICATIONS_SHOWN = 3;
const CLOSED_APPLICATION = {
  selection: void 0,
  background: void 0,
  panel: void 0,
  version: void 0,
  definitionHistory: []
};
const PROJECT_CARD_LEVELS = {
  0: { titleWeight: "semibold" },
  1: { titleWeight: "regular" }
};
function rankApplications(applications, catalog) {
  const latest = (app) => catalog.executions.reduce(
    (at, execution) => !execution.candidateValidation && applicationOwns(app, execution.applicationId) ? Math.max(at, execution.at) : at,
    0
  );
  return applications.map((app, index) => ({ app, index, at: latest(app) })).sort((a, b) => b.at - a.at || a.index - b.index).map(({ app }) => app);
}
function routeBreadcrumbs(crumbs, current, update) {
  return crumbs.map((crumb, index) => ({
    id: crumb.id,
    label: crumb.label,
    concept: crumb.concept,
    icon: crumb.icon,
    ...index < crumbs.length - 1 && appRouteHref(crumb.route) !== appRouteHref(current) ? { onClick: () => update(() => crumb.route) } : {}
  }));
}
function testBreadcrumbs(route, catalog, update, state) {
  const base = {
    ...route,
    definitionHistory: [],
    selection: void 0,
    background: void 0,
    panel: void 0,
    version: void 0,
    scenarioTab: "definition"
  };
  const crumbs = [{ id: "projects", label: "Projects", concept: "project", route: base }];
  const selected = route.selection;
  const scenario = catalog.scenarios.find(
    (s) => s.id === (selected?.kind === "scenario" ? selected.id : route.panel?.kind === "versions" ? route.panel.id : void 0)
  );
  const suite = catalog.suites.find((s) => selected?.kind === "suite" && s.id === selected.id);
  const delivery = findAcceptanceSet(catalog, selected?.kind === "delivery" ? selected : void 0);
  const execution = catalog.executions.find(
    (e) => route.panel?.kind === "execution" && e.id === route.panel.id
  );
  const applicationId = scenario?.applicationId ?? suite?.applicationId ?? delivery?.applicationId ?? execution?.applicationId ?? (selected?.kind === "application" ? selected.id : void 0);
  const app = findTestApplication(catalog, applicationId);
  const add = (selection, label) => crumbs.push({
    id: `${selection.kind}:${selection.id}`,
    label,
    icon: reactExports.createElement(DELIVERY_CONCEPT_ICONS[selection.kind], {
      size: 12,
      "aria-hidden": true
    }),
    route: { ...base, selection }
  });
  const project = app && state ? applicationProject(state, app) : void 0;
  if (project)
    crumbs.push({
      id: `project:${project.id}`,
      label: project.name,
      concept: "project",
      route: { ...base, projectId: project.id, projectTab: "applications" }
    });
  if (app) add({ kind: "application", id: app.id }, app.name);
  if (selected && selected.kind !== "application")
    add(
      selected,
      scenario?.title ?? suite?.name ?? delivery?.title ?? "Unavailable item"
    );
  if (route.panel)
    crumbs.push({
      id: `${route.panel.kind}:${route.panel.id}`,
      label: route.panel.kind === "versions" ? "Plan versions" : route.panel.runId ? "Scenario run" : execution?.number ? `Run #${execution.number}` : "Test execution",
      concept: route.panel.kind === "execution" ? "test-run" : "command",
      route
    });
  return routeBreadcrumbs(crumbs, route, update);
}
function ProjectsRoute() {
  const { host, state, loaded, pending, act, capabilities: capabilities2, testCatalog, readExecution } = useHostedData();
  const {
    routeContext,
    setPage,
    setSelected,
    setWorkId,
    setRunId,
    setVerificationOpen,
    setRunFromTests,
    openAgentConversation
  } = useHostedNavigation();
  const breadcrumbs = routeContext.route.selection ? testBreadcrumbs(routeContext.route, testCatalog, routeContext.update, state) : [];
  const parent = breadcrumbs[breadcrumbs.length - 2];
  usePageEscape(breadcrumbs.length > 1 ? () => parent?.onClick?.() : void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HostedPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full min-h-0 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProjectsPage,
    {
      host,
      projects: host.projects,
      github: host.github,
      state,
      loaded,
      catalog: testCatalog,
      pending,
      act,
      onOpenDelivery: (delivery) => {
        setPage("deliveries");
        setSelected(delivery.id);
      },
      onOpenAgentConversation: openAgentConversation,
      tests: {
        onReadExecution: readExecution,
        testInference: capabilities2.testInference,
        onEvidence: (url) => void host.openEvidence(url),
        onOpen: (delivery, id) => {
          setPage("deliveries");
          setSelected(delivery.id);
          setWorkId(null);
          setVerificationOpen(false);
          setRunFromTests(true);
          setRunId(id);
        },
        onOpenDelivery: (deliveryId) => {
          setPage("deliveries");
          setSelected(deliveryId);
        },
        onOpenWork: (delivery, id) => {
          setPage("deliveries");
          setSelected(delivery.id);
          setRunId(null);
          setVerificationOpen(false);
          setWorkId(id);
        },
        onReview: (delivery, evidenceId) => {
          void act("evidence_review", {
            deliveryId: delivery.id,
            evidenceId,
            revision: delivery.revision
          });
        }
      }
    }
  ) }) });
}
export {
  ProjectsRoute
};
//# sourceMappingURL=ProjectsRoute-CItgEZsY.js.map

//# debugId=f47d0af2-927c-588a-9a9f-03d0668cdd54
