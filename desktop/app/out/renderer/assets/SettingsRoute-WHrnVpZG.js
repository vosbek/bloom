
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a48c5201-72f3-5be7-ab58-db2456a779ad")}catch(e){}}();
import { fR as createLucideIcon, jp as useSidecarHost, hx as reactExports, a as AGENT_VIEW_SECTION_MODE_SETTING_KEY, A as AGENT_CARD_MODE_SETTING_KEY, f3 as WRAPPED_ENABLED_SETTING_KEY, gN as isWrappedWeeklyEnabled, gP as jsxRuntimeExports, dR as SettingsGroup, e9 as SettingsToggleRow, O as CONCEPT_META, eo as Sparkles, jA as wrappedEnabledSettingValue, j3 as useOptionalControlTheme, dZ as SettingsScreen, d$ as SettingsSection, e1 as SettingsSegmentRow, eC as Sun, cB as Moon, cA as Monitor, iE as useAppearanceSettings, e3 as SettingsSkeletonGroup, hb as parseUiScale, h$ as serializeUiScale, eY as UI_SCALE_OPTIONS, iw as uiScaleLabel, e4 as SettingsSpecimen, dx as SectionHeader, i as AgentConversationCard, iT as useFlowerTheme, hI as requestSharePromotion, dW as SettingsNote, bw as FlowerInviteCard, dh as REFERRAL_REWARD_MILESTONES, bl as FLOWERS, as as ConfigurableListIcon, fE as cn, _ as Check, dM as SettingsBadge, ci as MENU_BAR_ENABLED_SETTING_KEY, ct as MENU_BAR_STATUS_INDICATORS_COLORED_SETTING_KEY, cu as MENU_BAR_STATUS_INDICATOR_STYLE_SETTING_KEY, cn as MENU_BAR_SHOW_FINISHED_STATUS_SETTING_KEY, cs as MENU_BAR_SHOW_WAITING_STATUS_SETTING_KEY, co as MENU_BAR_SHOW_RUNNING_STATUS_SETTING_KEY, ck as MENU_BAR_SHOW_CODEX_USAGE_SETTING_KEY, cj as MENU_BAR_SHOW_CLAUDE_USAGE_SETTING_KEY, cm as MENU_BAR_SHOW_CURSOR_USAGE_SETTING_KEY, er as StatusBadge, bG as Gauge, bP as HarnessTile, dU as SettingsMultiSelectRow, cp as MENU_BAR_SHOW_STATUS_SETTING_KEY, cr as MENU_BAR_SHOW_USAGE_SETTING_KEY, cl as MENU_BAR_SHOW_CONVERSATIONS_SETTING_KEY, cq as MENU_BAR_SHOW_USAGE_IN_DROPDOWN_SETTING_KEY, a6 as Circle, iF as useAsync, iZ as useInPageChrome, jq as useSubHeader, eX as TriangleAlert, dN as SettingsButton, dQ as SettingsEmpty, aD as Database, dJ as Server, a4 as ChoiceGroup, a5 as ChoiceRow, jB as writeCached, fG as codingToolOfMcpClient, dP as SettingsDisclosureRow, dT as SettingsKeyValue, dO as SettingsCode, de as PromptCard, d5 as PluginVersionFacet, ak as CodingToolTile, g$ as mcpToolOfSpec, cw as McpToolCompactItem, j4 as useOptionalHostedData, ju as useWorkspaceName, dV as SettingsNavRow, bz as FolderGit2, av as ConfirmDialog, bj as EyeOff, cc as Layers, bi as Eye, e2 as SettingsSelectRow, bT as HistoryProgressSettingsRow, bS as History, dY as SettingsRow, e0 as SettingsSegmentControl, d9 as ProjectAvatar, hF as repositoryFlowerSeed, iz as usageProjectRows, fN as countAllConversations, hE as removedConversationsLabel, fO as countConversationsForRepositories, hW as sameRepository, cy as MessageCircle, aa as CircleDashed, iP as useDeliveryEvent, hC as relativeTime, eS as Timeline, bH as GitHubConnect, J as Button, dS as SettingsIconTile, a8 as CircleCheck, bK as GitPullRequest, c9 as IntegrationStateFacet, gp as githubErrorText, eT as TimelineItem, $ as Check$1, jt as useWorkspaceList, je as usePlanUsage, jo as useSettingsPageNavigation, jy as workspacePlan, f9 as WorkspacesUnavailable, he as planLabel, hS as roleLabel, c$ as PlanTierFacet, g6 as errorText, f7 as WorkspaceQuotaMeter, gX as localRunsSummary, G as Badge, gs as grantSummary, ik as subscriptionSummary, Q as Card, bR as HeadingText, cz as Minus, dL as SettingsActionRow, iK as useCloudChatFeature, cG as OWNED_CLOUD_SUBSCRIPTION_OPERATION, jw as userFacingErrorMessage, cS as PageContent, bD as FormField, c3 as Input, bC as FormError, iM as useCodexLabel, iB as useAgentLedger, js as useWorkspaceDetail, iV as useGitHubStatus, ge as flowerById, e$ as Users, el as SlidersHorizontal, eb as Share2, P as Cable, bL as GitPullRequest$1, j2 as useOptionalAppRoute, dg as RAIL, iN as useCompactLayout, bn as FeatureFrame, al as ColumnLayout, d_ as SettingsScreenPresentationProvider, dX as SettingsPageHeaderProvider, f8 as WorkspaceSettings } from "./index-nrW_ocxo.js";
import { u as useGitHubRepositories } from "./projectsPageData-z5SiU3uh.js";
const CONVERSATION_PARSE_INTERVAL_SETTING = "conversations.parseInterval";
const __iconNode$b = [
  ["path", { d: "M11 10.27 7 3.34", key: "16pf9h" }],
  ["path", { d: "m11 13.73-4 6.93", key: "794ttg" }],
  ["path", { d: "M12 22v-2", key: "1osdcq" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M14 12h8", key: "4f43i9" }],
  ["path", { d: "m17 20.66-1-1.73", key: "eq3orb" }],
  ["path", { d: "m17 3.34-1 1.73", key: "2wel8s" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "m20.66 17-1.73-1", key: "sg0v6f" }],
  ["path", { d: "m20.66 7-1.73 1", key: "1ow05n" }],
  ["path", { d: "m3.34 17 1.73-1", key: "nuk764" }],
  ["path", { d: "m3.34 7 1.73 1", key: "1ulond" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["circle", { cx: "12", cy: "12", r: "8", key: "46899m" }]
];
const Cog = createLucideIcon("cog", __iconNode$b);
const __iconNode$a = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
      key: "3pnvol"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["path", { d: "M12 10v12", key: "6ubwww" }],
  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
];
const Flower2 = createLucideIcon("flower-2", __iconNode$a);
const __iconNode$9 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  ["path", { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "1sqzm4" }],
  [
    "path",
    { d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5", key: "kc0143" }
  ],
  ["rect", { x: "3", y: "7", width: "18", height: "4", rx: "1", key: "1hberx" }]
];
const Gift = createLucideIcon("gift", __iconNode$9);
const __iconNode$8 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode$8);
const __iconNode$7 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$6);
const __iconNode$5 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }]
];
const PanelTop = createLucideIcon("panel-top", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M12 2v10", key: "mnfbl" }],
  ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
];
const Power = createLucideIcon("power", __iconNode$4);
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }]
];
const Rows2 = createLucideIcon("rows-2", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M21 7.5H3", key: "1hm9pq" }],
  ["path", { d: "M21 12H3", key: "2avoz0" }],
  ["path", { d: "M21 16.5H3", key: "n7jzkj" }]
];
const Rows4 = createLucideIcon("rows-4", __iconNode$2);
const __iconNode$1 = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
];
const UsersRound = createLucideIcon("users-round", __iconNode);
const FREE_LOCAL_TEST_RUNS_PER_MONTH = 200;
function parseSectionMode(value) {
  return value === "all" ? "all" : "status";
}
function parseCardMode(value) {
  return value === "regular" ? "regular" : "compact";
}
function useAgentViewSettings() {
  const host = useSidecarHost();
  const [sectionMode, setSectionModeState] = reactExports.useState("status");
  const [cardMode, setCardModeState] = reactExports.useState("compact");
  const [loading, setLoading] = reactExports.useState(true);
  const [savingKeys, setSavingKeys] = reactExports.useState(() => /* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    let cancelled = false;
    void Promise.allSettled([
      host.settings.get(AGENT_VIEW_SECTION_MODE_SETTING_KEY),
      host.settings.get(AGENT_CARD_MODE_SETTING_KEY)
    ]).then(([sectionResult, cardResult]) => {
      if (cancelled) return;
      setSectionModeState(
        parseSectionMode(sectionResult.status === "fulfilled" ? sectionResult.value : null)
      );
      setCardModeState(parseCardMode(cardResult.status === "fulfilled" ? cardResult.value : null));
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [host]);
  const updateSetting = reactExports.useCallback(
    (key, current, next, setValue, eventName) => {
      if (loading || savingKeys.has(key) || current === next) return;
      setValue(next);
      setSavingKeys((keys) => new Set(keys).add(key));
      host.system.captureEvent?.(eventName, { mode: next });
      void host.settings.set(key, next).catch(() => {
        setValue(current);
      }).finally(() => {
        setSavingKeys((keys) => {
          const nextKeys = new Set(keys);
          nextKeys.delete(key);
          return nextKeys;
        });
      });
    },
    [host, loading, savingKeys]
  );
  const setSectionMode = reactExports.useCallback(
    (next) => {
      updateSetting(
        AGENT_VIEW_SECTION_MODE_SETTING_KEY,
        sectionMode,
        next,
        setSectionModeState,
        "agent_view_section_mode_changed"
      );
    },
    [sectionMode, updateSetting]
  );
  const setCardMode = reactExports.useCallback(
    (next) => {
      updateSetting(
        AGENT_CARD_MODE_SETTING_KEY,
        cardMode,
        next,
        setCardModeState,
        "agent_view_card_mode_changed"
      );
    },
    [cardMode, updateSetting]
  );
  return {
    sectionMode,
    cardMode,
    loading,
    sectionSaving: savingKeys.has(AGENT_VIEW_SECTION_MODE_SETTING_KEY),
    cardSaving: savingKeys.has(AGENT_CARD_MODE_SETTING_KEY),
    setSectionMode,
    setCardMode
  };
}
function WrappedSettingsToggle() {
  const host = useSidecarHost();
  const [enabled, setEnabled] = reactExports.useState(true);
  const [loaded, setLoaded] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let active = true;
    void host.settings.get(WRAPPED_ENABLED_SETTING_KEY).then((value) => {
      if (active) setEnabled(isWrappedWeeklyEnabled(value));
    }).catch(() => {
    }).finally(() => {
      if (active) setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [host.settings]);
  const toggle = (next) => {
    const previous = enabled;
    setEnabled(next);
    setBusy(true);
    void host.settings.set(WRAPPED_ENABLED_SETTING_KEY, wrappedEnabledSettingValue(next)).catch(() => setEnabled(previous)).finally(() => setBusy(false));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsToggleRow,
    {
      icon: Sparkles,
      iconColor: CONCEPT_META.usage.accent,
      title: "Weekly Wrapped",
      description: "A recap of your week with agents, generated every Monday. Your week is built on this device; only the eight badge numbers are shared, anonymously, to scale everyone's levels.",
      checked: enabled,
      busy: busy || !loaded,
      onCheckedChange: toggle
    }
  ) });
}
function AppearanceSettings({
  initialTab = "general",
  agentViewAvailable = true
} = {}) {
  const colorTheme = useOptionalControlTheme();
  const agentsRef = reactExports.useRef(null);
  const anchor = reactExports.useRef(initialTab).current;
  reactExports.useEffect(() => {
    if (anchor !== "agents") return;
    agentsRef.current?.scrollIntoView({ block: "start" });
  }, [anchor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Appearance",
      description: agentViewAvailable ? "Size, motion and agent presentation." : "Size and motion.",
      children: [
        colorTheme && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Theme", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSegmentRow,
          {
            title: "Color theme",
            value: colorTheme.preference,
            options: [
              { value: "light", label: "Light", icon: Sun },
              { value: "dark", label: "Dark", icon: Moon },
              { value: "system", label: "System", icon: Monitor }
            ],
            onValueChange: colorTheme.setPreference,
            layout: "stacked"
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DisplaySection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MotionSection, {}),
        agentViewAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(AgentViewSection, { sectionRef: agentsRef })
      ]
    }
  );
}
const UI_SCALE_SETTINGS_OPTIONS = UI_SCALE_OPTIONS.map(
  (scale) => ({ value: serializeUiScale(scale), label: uiScaleLabel(scale) })
);
function DisplaySection() {
  const settings = useAppearanceSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      label: "Display",
      footnote: "Scales the entire interface, including spacing and icons.",
      children: settings.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 1 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsSegmentRow,
        {
          title: "Interface size",
          value: serializeUiScale(settings.uiScale),
          options: UI_SCALE_SETTINGS_OPTIONS,
          busy: settings.uiScaleSaving,
          layout: "stacked",
          onValueChange: (value) => settings.setUiScale(parseUiScale(value))
        }
      ) })
    }
  );
}
function MotionSection() {
  const settings = useAppearanceSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      label: "Motion",
      footnote: "Petals fall when actions complete and when the theme changes.",
      children: settings.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 1 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsToggleRow,
        {
          title: "Petal effects",
          checked: settings.petalEffectsEnabled,
          busy: settings.saving,
          onCheckedChange: settings.setPetalEffectsEnabled
        }
      ) })
    }
  );
}
const SECTION_OPTIONS = [
  { value: "all", label: "All" },
  { value: "status", label: "By status" }
];
const CARD_OPTIONS = [
  { value: "regular", label: "Regular", icon: Rows2 },
  { value: "compact", label: "Compact", icon: Rows4 }
];
function AgentViewSection({ sectionRef }) {
  const settings = useAgentViewSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      ref: sectionRef,
      label: "Agent view",
      footnote: "Compact cards drop the latest-activity line to fit more agents on screen.",
      className: "scroll-mt-4",
      preview: /* @__PURE__ */ jsxRuntimeExports.jsx(AgentPreview, { sectionMode: settings.sectionMode, cardMode: settings.cardMode }),
      previewLabel: "agent cards",
      children: settings.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 2 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSegmentRow,
          {
            title: "Sections",
            value: settings.sectionMode,
            options: SECTION_OPTIONS,
            busy: settings.sectionSaving,
            onValueChange: settings.setSectionMode
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSegmentRow,
          {
            title: "Cards",
            value: settings.cardMode,
            options: CARD_OPTIONS,
            busy: settings.cardSaving,
            onValueChange: settings.setCardMode
          }
        )
      ] })
    }
  );
}
const PREVIEW_LOADED_AT = Date.now();
const PREVIEW_CONVERSATION = {
  id: "settings-appearance-agent-preview",
  source: "claude",
  ref: "settings-appearance-agent-preview",
  project: "quick-start-sidecar",
  projectName: "quick-start-sidecar",
  projectKind: "git",
  projectRoot: "~/Projects/quick-start-sidecar",
  // resolveContextLine falls through to "unknown location" unless one of
  // workspaceName / branch / cwd is set; the agents list normally shows a
  // worktree here, so the specimen does too.
  workspaceName: "appearance-settings",
  workspaceKind: "worktree",
  cwd: "~/Projects/quick-start-sidecar",
  title: "Polish appearance settings",
  preview: "Refining layout, controls, and responsive behavior.",
  lastMessage: "Refining layout, controls, and responsive behavior.",
  lastMessageTs: PREVIEW_LOADED_AT,
  lastActivityTs: PREVIEW_LOADED_AT,
  state: "running"
};
const previewNoop = () => {
};
function AgentPreview({
  sectionMode,
  cardMode
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsSpecimen,
    {
      "data-testid": "agent-view-settings-preview",
      "data-section-mode": sectionMode,
      "data-card-mode": cardMode,
      className: "flex flex-col gap-2 rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-inner)] p-2.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            label: sectionMode === "status" ? "RUNNING" : "ACTIVE AGENTS",
            active: true,
            className: "mt-0 px-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AgentConversationCard,
          {
            conv: PREVIEW_CONVERSATION,
            cardMode,
            showTodos: cardMode !== "compact",
            onDismiss: previewNoop
          }
        )
      ]
    }
  );
}
const REFERRAL_FLOWERS = FLOWERS.filter((flower) => flower.lockedByDefault);
function FlowerThemeSettings({
  onOpenShare,
  showUnlockStatus = true
}) {
  const { flower, flowers, unlocked, setFlower, unlockFlower, availableUnlocks } = useFlowerTheme();
  const [unlockMessage, setUnlockMessage] = reactExports.useState(null);
  const chooseFlower = reactExports.useCallback(
    (target, isUnlocked) => {
      if (target.id === flower) return;
      if (isUnlocked) {
        setFlower(target.id);
        setUnlockMessage(null);
        requestSharePromotion("theme-changed");
        return;
      }
      if (availableUnlocks <= 0) return;
      if (unlockFlower(target.id)) {
        setFlower(target.id);
        setUnlockMessage(`${target.name} unlocked`);
        requestSharePromotion("theme-changed");
      }
    },
    [availableUnlocks, flower, setFlower, unlockFlower]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Theme",
      description: "The flower you pick sets the accent color for your whole garden.",
      children: [
        showUnlockStatus ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SettingsNote,
          {
            icon: Gift,
            className: "shrink-0 bg-[var(--accent-soft)]/60 font-medium text-[var(--accent)]",
            children: [
              availableUnlocks,
              " flower unlock",
              availableUnlocks === 1 ? "" : "s",
              " available"
            ]
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsSection, { label: "Flower", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: flowers.map((candidate) => {
            const isUnlocked = unlocked.includes(candidate.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              FlowerRow,
              {
                flower: candidate,
                selected: candidate.id === flower,
                locked: !isUnlocked,
                canUnlock: !isUnlocked && availableUnlocks > 0,
                onSelect: () => chooseFlower(candidate, isUnlocked)
              },
              candidate.id
            );
          }) }),
          unlockMessage ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-0.5 text-[10.5px] font-medium leading-[1.45] text-[var(--accent)]", children: unlockMessage }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlowerInviteCard, { className: "mt-auto", showSharePageLink: true, onOpenSharePage: onOpenShare })
      ]
    }
  );
}
function FlowerShareSettings() {
  const { completedReferrals } = useFlowerTheme();
  const completed = completedReferrals ?? 0;
  const nextMilestone = REFERRAL_REWARD_MILESTONES.find((milestone) => completed < milestone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Share",
      description: "Invite friends to Blume and unlock the rest of the garden.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlowerInviteCard, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            label: "Rewards",
            footnote: nextMilestone ? `Next unlock at ${nextMilestone} total invite${nextMilestone === 1 ? "" : "s"}` : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: REFERRAL_REWARD_MILESTONES.map((milestone, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              RewardTier,
              {
                milestone,
                completed,
                rewardNumber: index + 1,
                flower: REFERRAL_FLOWERS[index] ?? FLOWERS[0]
              },
              milestone
            )) })
          }
        )
      ]
    }
  );
}
const RewardTier = reactExports.memo(function RewardTier2({
  milestone,
  completed,
  rewardNumber,
  flower
}) {
  const earned = completed >= milestone;
  const remaining = Math.max(0, milestone - completed);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-slot": "settings-row",
      className: cn(
        "grid min-h-11 w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-3 py-2",
        earned && "bg-[var(--accent-soft)]/35"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfigurableListIcon,
            {
              scale: "large",
              customSurface: true,
              appearance: { colorMode: "custom" },
              renderIcon: ({ tileSize }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] border bg-[var(--bg-inner)]",
                    earned ? "border-[var(--accent-soft-border)]" : "border-[var(--border-subtle)]"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: flower.icon,
                      alt: "",
                      "aria-hidden": "true",
                      style: { width: Math.max(16, tileSize - 4), height: Math.max(16, tileSize - 4) },
                      className: "scale-110 object-contain opacity-80 blur-[2.5px]"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-col gap-[3px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate text-[12px] font-semibold leading-[1.3] text-[var(--text-strong)]", children: [
              "Flower unlock ",
              rewardNumber
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10.5px] leading-[1.45] text-[var(--text-muted)]", children: [
              milestone,
              " total invite",
              milestone === 1 ? "" : "s"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: earned ? "accent" : "neutral", children: earned ? "Earned" : `${remaining} more` })
      ]
    }
  );
});
function FlowerRow({
  flower,
  selected,
  locked,
  canUnlock,
  onSelect
}) {
  const disabled = locked && !canUnlock;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-slot": "settings-row",
      "aria-pressed": selected,
      "aria-disabled": disabled,
      disabled,
      onClick: onSelect,
      className: cn(
        "grid min-h-11 w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-3 py-2 text-left transition-colors duration-100",
        "outline-none focus-visible:outline-2 focus-visible:outline-[var(--accent)]/40 focus-visible:-outline-offset-2",
        disabled ? "cursor-default" : "hover:bg-[var(--bg-card-soft)]/70 active:bg-[var(--bg-subtle)]/70",
        selected && "bg-[var(--accent-soft)]/35"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfigurableListIcon,
            {
              scale: "large",
              customSurface: true,
              appearance: { colorMode: "custom" },
              renderIcon: ({ tileSize }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: flower.icon,
                  alt: "",
                  draggable: false,
                  style: { width: tileSize, height: tileSize },
                  className: cn(
                    "shrink-0 select-none object-contain",
                    disabled && "opacity-35 grayscale",
                    locked && canUnlock && "opacity-75"
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate text-[12px] font-semibold leading-[1.3] text-[var(--text-strong)]", children: flower.name })
        ] }),
        locked ? canUnlock ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[var(--accent)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { size: 11, strokeWidth: 2.2, "aria-hidden": true }),
          " Unlock"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Lock,
          {
            size: 13,
            strokeWidth: 2,
            "aria-hidden": true,
            className: "shrink-0 text-[var(--text-muted)]"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Check,
          {
            size: 15,
            strokeWidth: 2.4,
            "aria-hidden": true,
            className: cn(
              "shrink-0 text-[var(--accent)] transition-opacity duration-100",
              selected ? "opacity-100" : "opacity-0"
            )
          }
        )
      ]
    }
  );
}
const STATUS_CONTENT_OPTIONS = [
  { id: "running", label: "Running", description: "Active agent counter", state: "running" },
  {
    id: "waiting",
    label: "Approval",
    description: "Waiting-for-approval counter",
    state: "needs-approval"
  },
  { id: "finished", label: "Complete", description: "Finished agent counter", state: "finished" }
];
const MENU_BAR_STATUS_SETTING_KEYS = {
  running: MENU_BAR_SHOW_RUNNING_STATUS_SETTING_KEY,
  waiting: MENU_BAR_SHOW_WAITING_STATUS_SETTING_KEY,
  finished: MENU_BAR_SHOW_FINISHED_STATUS_SETTING_KEY
};
const USAGE_PROVIDER_OPTIONS = [
  { id: "cursor", label: "Cursor", description: "Cursor session usage", source: "cursor" },
  { id: "claude", label: "Claude", description: "Claude session usage", source: "claude" },
  { id: "codex", label: "Codex", description: "Codex session usage", source: "codex" }
];
const MENU_BAR_USAGE_SETTING_KEYS = {
  cursor: MENU_BAR_SHOW_CURSOR_USAGE_SETTING_KEY,
  claude: MENU_BAR_SHOW_CLAUDE_USAGE_SETTING_KEY,
  codex: MENU_BAR_SHOW_CODEX_USAGE_SETTING_KEY
};
const DEFAULT_STATUS_CONTENT = {
  running: true,
  waiting: true,
  finished: true
};
const DEFAULT_MENU_BAR_USAGE_CONTENT = {
  cursor: true,
  claude: true,
  codex: true
};
function settingBoolean(value, fallback) {
  return value === null ? fallback : value !== "false";
}
function createIndicatorShapeIcon(style) {
  return reactExports.forwardRef(
    function IndicatorShapeGlyph(props, ref) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { ...props, ref, fill: style === "filled" ? "currentColor" : "none" });
    }
  );
}
function MenuOptionIconTile({
  accent,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": true,
      style: { "--menu-option-accent": accent },
      className: "flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border border-[color-mix(in_srgb,var(--menu-option-accent)_28%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--menu-option-accent)_11%,var(--bg-inner))] text-[var(--menu-option-accent)]",
      children
    }
  );
}
const INDICATOR_SHAPE_OPTIONS = [
  { value: "filled", label: "Filled", icon: createIndicatorShapeIcon("filled") },
  { value: "bordered", label: "Bordered", icon: createIndicatorShapeIcon("bordered") }
];
function MenuBarSettings({ cursorUsageAvailable = true }) {
  const host = useSidecarHost();
  const [enabled, setEnabled] = reactExports.useState(true);
  const [colored, setColored] = reactExports.useState(true);
  const [indicatorStyle, setIndicatorStyle] = reactExports.useState("filled");
  const [menuBarStatuses, setMenuBarStatuses] = reactExports.useState(DEFAULT_STATUS_CONTENT);
  const [menuBarUsageProviders, setMenuBarUsageProviders] = reactExports.useState(DEFAULT_MENU_BAR_USAGE_CONTENT);
  const [showConversations, setShowConversations] = reactExports.useState(true);
  const [showDropdownUsage, setShowDropdownUsage] = reactExports.useState(true);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    const load = () => {
      void Promise.all([
        host.settings.get(MENU_BAR_ENABLED_SETTING_KEY),
        host.settings.get(MENU_BAR_STATUS_INDICATORS_COLORED_SETTING_KEY),
        host.settings.get(MENU_BAR_STATUS_INDICATOR_STYLE_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_STATUS_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_RUNNING_STATUS_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_WAITING_STATUS_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_FINISHED_STATUS_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_USAGE_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_CURSOR_USAGE_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_CLAUDE_USAGE_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_CODEX_USAGE_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_CONVERSATIONS_SETTING_KEY),
        host.settings.get(MENU_BAR_SHOW_USAGE_IN_DROPDOWN_SETTING_KEY)
      ]).then(
        ([
          enabledValue,
          coloredValue,
          indicatorStyleValue,
          showStatusValue,
          showRunningStatusValue,
          showWaitingStatusValue,
          showFinishedStatusValue,
          showUsageValue,
          showCursorUsageValue,
          showClaudeUsageValue,
          showCodexUsageValue,
          showConversationsValue,
          showDropdownUsageValue
        ]) => {
          if (cancelled) return;
          const menuStatusDefault = showStatusValue !== "false";
          const menuUsageDefault = showUsageValue !== "false";
          setEnabled(enabledValue !== "false");
          setColored(coloredValue !== "false");
          setIndicatorStyle(indicatorStyleValue === "bordered" ? "bordered" : "filled");
          setMenuBarStatuses({
            running: settingBoolean(showRunningStatusValue, menuStatusDefault),
            waiting: settingBoolean(showWaitingStatusValue, menuStatusDefault),
            finished: settingBoolean(showFinishedStatusValue, menuStatusDefault)
          });
          setMenuBarUsageProviders({
            cursor: settingBoolean(showCursorUsageValue, menuUsageDefault),
            claude: settingBoolean(showClaudeUsageValue, menuUsageDefault),
            codex: settingBoolean(showCodexUsageValue, menuUsageDefault)
          });
          setShowConversations(showConversationsValue !== "false");
          setShowDropdownUsage(showDropdownUsageValue !== "false");
        }
      ).catch(() => {
        if (cancelled) return;
        setEnabled(true);
        setColored(true);
        setIndicatorStyle("filled");
        setMenuBarStatuses(DEFAULT_STATUS_CONTENT);
        setMenuBarUsageProviders(DEFAULT_MENU_BAR_USAGE_CONTENT);
        setShowConversations(true);
        setShowDropdownUsage(true);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
    };
    load();
    const unsubscribe = host.settings.onChanged(load);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [host]);
  const toggleEnabled = reactExports.useCallback(() => {
    if (loading || saving) return;
    const next = !enabled;
    setEnabled(next);
    setSaving(true);
    host.system.captureEvent?.("menu_bar_enabled_changed", { enabled: next });
    void host.settings.set(MENU_BAR_ENABLED_SETTING_KEY, next ? "true" : "false").catch(() => {
      setEnabled(!next);
    }).finally(() => {
      setSaving(false);
    });
  }, [enabled, host, loading, saving]);
  const toggleColored = reactExports.useCallback(() => {
    if (loading || saving) return;
    const next = !colored;
    setColored(next);
    setSaving(true);
    host.system.captureEvent?.("menu_bar_status_indicators_changed", { colored: next });
    void host.settings.set(MENU_BAR_STATUS_INDICATORS_COLORED_SETTING_KEY, next ? "true" : "false").catch(() => {
      setColored(!next);
    }).finally(() => {
      setSaving(false);
    });
  }, [colored, host, loading, saving]);
  const setMonochromeIndicatorStyle = reactExports.useCallback(
    (next) => {
      if (loading || saving || indicatorStyle === next) return;
      const previous = indicatorStyle;
      setIndicatorStyle(next);
      setSaving(true);
      host.system.captureEvent?.("menu_bar_status_indicator_style_changed", { style: next });
      void host.settings.set(MENU_BAR_STATUS_INDICATOR_STYLE_SETTING_KEY, next).catch(() => {
        setIndicatorStyle(previous);
      }).finally(() => {
        setSaving(false);
      });
    },
    [host, indicatorStyle, loading, saving]
  );
  const saveBooleanSetting = reactExports.useCallback(
    (key, next, setter, eventName, eventProperties) => {
      if (loading || saving) return;
      setter(next);
      setSaving(true);
      host.system.captureEvent?.(eventName, eventProperties);
      void host.settings.set(key, next ? "true" : "false").catch(() => {
        setter(!next);
      }).finally(() => {
        setSaving(false);
      });
    },
    [host, loading, saving]
  );
  const toggleMenuBarStatus = reactExports.useCallback(
    (id) => {
      if (loading || saving) return;
      const next = !menuBarStatuses[id];
      setMenuBarStatuses((current) => ({ ...current, [id]: next }));
      setSaving(true);
      host.system.captureEvent?.("menu_bar_content_changed", {
        item: `status_${id}`,
        visible: next
      });
      void host.settings.set(MENU_BAR_STATUS_SETTING_KEYS[id], next ? "true" : "false").catch(() => {
        setMenuBarStatuses((current) => ({ ...current, [id]: !next }));
      }).finally(() => {
        setSaving(false);
      });
    },
    [host, loading, menuBarStatuses, saving]
  );
  const toggleMenuBarUsageProvider = reactExports.useCallback(
    (id) => {
      if (loading || saving || id === "cursor" && !cursorUsageAvailable) return;
      const next = !menuBarUsageProviders[id];
      setMenuBarUsageProviders((current) => ({ ...current, [id]: next }));
      setSaving(true);
      host.system.captureEvent?.("menu_bar_content_changed", { item: `usage_${id}`, visible: next });
      void host.settings.set(MENU_BAR_USAGE_SETTING_KEYS[id], next ? "true" : "false").catch(() => {
        setMenuBarUsageProviders((current) => ({ ...current, [id]: !next }));
      }).finally(() => {
        setSaving(false);
      });
    },
    [cursorUsageAvailable, host, loading, menuBarUsageProviders, saving]
  );
  const enabledUsageProviderOptions = USAGE_PROVIDER_OPTIONS.filter(
    (option) => option.id !== "cursor" || cursorUsageAvailable
  );
  const menuBarPickerDisabled = loading || saving || !enabled;
  const menuBarContentOptions = [
    ...STATUS_CONTENT_OPTIONS.map((option) => ({
      value: `status:${option.id}`,
      label: option.label,
      description: option.description,
      group: "Status",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { state: option.state, size: 18, renderSize: 18 })
    })),
    {
      value: "conversations",
      label: "Menu: Agents",
      description: "Agent list",
      group: "Menu Content",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuOptionIconTile, { accent: CONCEPT_META.agent.accent, children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersRound, { size: 12, strokeWidth: 2 }) })
    },
    {
      value: "usage-rows",
      label: "Menu: Usage",
      description: "Usage details",
      group: "Menu Content",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuOptionIconTile, { accent: CONCEPT_META.usage.accent, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { size: 12, strokeWidth: 2 }) })
    },
    ...enabledUsageProviderOptions.map((option) => ({
      value: `usage:${option.id}`,
      label: option.label,
      description: option.description,
      group: "Usage",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HarnessTile, { harness: option.source, size: "sm", showTooltip: false })
    }))
  ];
  const menuBarContentValues = [
    ...STATUS_CONTENT_OPTIONS.filter((option) => menuBarStatuses[option.id]).map(
      (option) => `status:${option.id}`
    ),
    ...showConversations ? ["conversations"] : [],
    ...showDropdownUsage ? ["usage-rows"] : [],
    ...enabledUsageProviderOptions.filter((option) => menuBarUsageProviders[option.id]).map((option) => `usage:${option.id}`)
  ];
  const changeMenuBarContents = (nextValues) => {
    const next = new Set(nextValues);
    const changedStatus = STATUS_CONTENT_OPTIONS.find(
      (option) => menuBarStatuses[option.id] !== next.has(`status:${option.id}`)
    );
    if (changedStatus) {
      toggleMenuBarStatus(changedStatus.id);
      return;
    }
    const changedUsage = enabledUsageProviderOptions.find(
      (option) => menuBarUsageProviders[option.id] !== next.has(`usage:${option.id}`)
    );
    if (changedUsage) {
      toggleMenuBarUsageProvider(changedUsage.id);
      return;
    }
    if (showConversations !== next.has("conversations")) {
      saveBooleanSetting(
        MENU_BAR_SHOW_CONVERSATIONS_SETTING_KEY,
        !showConversations,
        setShowConversations,
        "menu_bar_content_changed",
        { item: "conversations", visible: !showConversations }
      );
      return;
    }
    if (showDropdownUsage !== next.has("usage-rows")) {
      saveBooleanSetting(
        MENU_BAR_SHOW_USAGE_IN_DROPDOWN_SETTING_KEY,
        !showDropdownUsage,
        setShowDropdownUsage,
        "menu_bar_content_changed",
        { item: "dropdown_usage", visible: !showDropdownUsage }
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Menu Bar",
      description: "The macOS status item — flower, counters, and usage.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            label: "Status item",
            footnote: "Colored indicators use status and harness colors in the menu bar; monochrome indicators draw as filled or bordered bubbles.",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 3 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingsToggleRow,
                {
                  title: "Show menu bar item",
                  checked: enabled,
                  busy: saving,
                  onCheckedChange: toggleEnabled
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingsToggleRow,
                {
                  title: "Colored indicators",
                  checked: colored,
                  disabled: !enabled,
                  busy: saving,
                  onCheckedChange: toggleColored
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingsSegmentRow,
                {
                  title: "Indicator shape",
                  value: indicatorStyle,
                  options: INDICATOR_SHAPE_OPTIONS,
                  disabled: !enabled,
                  busy: saving,
                  onValueChange: setMonochromeIndicatorStyle
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            label: "Contents",
            footnote: "Counters and usage gauges sit beside the flower; Menu items appear in the dropdown.",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 1 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsMultiSelectRow,
              {
                title: "Menu bar",
                "aria-label": "Menu bar contents",
                value: menuBarContentValues,
                options: menuBarContentOptions,
                disabled: menuBarPickerDisabled,
                busy: saving,
                removableTags: true,
                compactTags: true,
                maxVisibleTags: 5,
                placeholder: "Choose menu bar contents…",
                onValueChange: changeMenuBarContents
              }
            ) })
          }
        )
      ]
    }
  );
}
const SCREEN_TITLE = "MCP";
const SCREEN_DESCRIPTION = "Control whether local agents can connect and what they can do.";
function McpSettings({ onBack }) {
  const host = useSidecarHost();
  const settings = useAsync(() => host.agentMcp.getSettings(), [host], {
    cache: { scope: host, key: "agentMcp.getSettings" }
  });
  const [saving, setSaving] = reactExports.useState(false);
  const [saveError, setSaveError] = reactExports.useState(null);
  const [applyingClientId, setApplyingClientId] = reactExports.useState(null);
  const [clientResults, setClientResults] = reactExports.useState({});
  const [clientErrors, setClientErrors] = reactExports.useState({});
  const inPageChrome = useInPageChrome();
  useSubHeader({ title: SCREEN_TITLE, onBack: inPageChrome ? void 0 : onBack }, "settings-mcp");
  if (settings.loading && settings.data === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsScreen, { title: SCREEN_TITLE, description: SCREEN_DESCRIPTION, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Server", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 3 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Connect your agent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 3 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "MCP specification", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 6 }) })
    ] });
  }
  if (settings.error && settings.data === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsScreen, { title: SCREEN_TITLE, description: SCREEN_DESCRIPTION, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsSection, { label: "Server", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "danger", icon: TriangleAlert, children: settings.error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsButton, { block: true, onClick: settings.reload, children: "Try again" })
    ] }) });
  }
  const value = settings.data;
  if (!value) return null;
  if (!value.supported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsScreen, { title: SCREEN_TITLE, description: SCREEN_DESCRIPTION, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsEmpty,
      {
        icon: Database,
        title: "Available in Blume Desktop",
        description: value.unavailableReason ?? "The MCP server connects to the local Blume database and requires the desktop app."
      }
    ) }) });
  }
  const patch = async (next) => {
    if (saving) return;
    setSaveError(null);
    setSaving(true);
    try {
      writeCached(
        { scope: host, key: "agentMcp.getSettings" },
        await host.agentMcp.setSettings(next)
      );
      settings.reload();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : String(error));
    } finally {
      setSaving(false);
    }
  };
  const applyClientSetup = async (client) => {
    if (applyingClientId) return;
    setApplyingClientId(client.id);
    setClientErrors((current) => ({ ...current, [client.id]: void 0 }));
    try {
      const result = await host.agentMcp.applyClientSetup(client.id);
      setClientResults((current) => ({ ...current, [client.id]: result.detail }));
      settings.reload();
    } catch (error) {
      setClientErrors((current) => ({
        ...current,
        [client.id]: error instanceof Error ? error.message : String(error)
      }));
    } finally {
      setApplyingClientId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: SCREEN_TITLE,
      description: SCREEN_DESCRIPTION,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: value.enabled ? "success" : "neutral", children: value.enabled ? "On" : "Off" }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SettingsSection,
          {
            label: "Server",
            footnote: "Read only lets agents search and read Blume; Contribute also lets them add signals and drafts. Access changes apply when an agent reconnects.",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingsToggleRow,
                  {
                    title: "Blume MCP",
                    icon: Server,
                    iconColor: CONCEPT_META.mcp.accent,
                    checked: value.enabled,
                    busy: saving,
                    onCheckedChange: (enabled) => void patch({ enabled })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  ChoiceGroup,
                  {
                    "aria-label": "MCP access level",
                    value: value.permission,
                    busy: saving,
                    onValueChange: (permission) => void patch({ permission }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChoiceRow,
                        {
                          value: "read",
                          title: "Read only",
                          description: "Search and read Blume",
                          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: "accent", children: "Recommended" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChoiceRow,
                        {
                          value: "contribute",
                          title: "Contribute",
                          description: "Add signals and drafts"
                        }
                      )
                    ]
                  }
                )
              ] }),
              saveError ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "danger", icon: TriangleAlert, children: saveError }) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            label: "Connect your agent",
            footnote: "Each setup adds Blume to one agent's user-level config. Open a client to review the exact change before applying it.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
              value.clients.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingsEmpty,
                {
                  icon: Server,
                  title: "No supported agents",
                  description: "No user-level agent clients are available for automatic setup on this machine."
                }
              ) : value.clients.map((client) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ClientSetupDisclosure,
                {
                  client,
                  applying: applyingClientId === client.id,
                  result: clientResults[client.id],
                  error: clientErrors[client.id],
                  onApply: () => void applyClientSetup(client)
                },
                client.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PromptExamplesDisclosure, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(McpSpecificationSection, { specification: value.specification })
      ]
    }
  );
}
function ClientSetupDisclosure({
  client,
  applying,
  result,
  error,
  onApply
}) {
  const applied = client.configured || result !== void 0;
  const tool = reactExports.useMemo(() => codingToolOfMcpClient(client), [client]);
  const skillMarkdown = client.skill.files.find((file) => file.path === "SKILL.md")?.content ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsDisclosureRow,
    {
      leading: /* @__PURE__ */ jsxRuntimeExports.jsx(CodingToolTile, { tool, size: "sm" }),
      title: client.label,
      badge: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PluginVersionFacet,
        {
          state: applying ? "installing" : error ? "failed" : applied ? "added" : "missing",
          form: "badge",
          size: "xs",
          of: client.label
        }
      ),
      summary: "MCP + skill",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] leading-[1.55] text-[var(--text-muted)]", children: [
          "Adds Blume as a user-level MCP server and installs the ",
          client.skill.displayName,
          " skill so",
          " ",
          client.label,
          " can recognize when prior agent context would help. Nothing is applied until you confirm."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsKeyValue,
          {
            entries: [
              { key: "MCP server", value: "Blume · user config" },
              { key: "Skill", value: client.skill.targetDirectory },
              { key: "Files", value: client.skill.files.map((file) => file.path).join(" · ") }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsCode, { label: "Exact command", code: client.command }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsCode, { label: "Exact SKILL.md", code: skillMarkdown }),
        result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsNote, { tone: "success", icon: Check, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Applied:" }),
          " ",
          result,
          " Restart ",
          client.label,
          ", then try",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { size: "inline", prompt: client.verifyPrompt })
        ] }) : applied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsNote, { tone: "success", icon: Check, children: [
          "Already in ",
          client.label,
          "’s user config. Try",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { size: "inline", prompt: client.verifyPrompt })
        ] }) : null,
        error ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsNote, { tone: "danger", icon: TriangleAlert, children: [
          error,
          " The setup worker rolls the skill back if the client command fails. You can copy the MCP command and SKILL.md above and apply them manually instead."
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsButton, { variant: "primary", block: true, busy: applying, disabled: applied, onClick: onApply, children: applying ? "Applying…" : applied ? "Applied" : "Apply MCP and skill" })
      ]
    }
  );
}
const PROMPT_EXAMPLES = [
  {
    label: "Continue a handoff",
    prompt: 'Continue the conversation called "Implement Super Cool Feature" from where the other agent left off.'
  },
  {
    label: "Recall decisions",
    prompt: "What did we decide about authentication in the earlier agent conversations, and why?"
  },
  {
    label: "Recover requirements",
    prompt: "Review this against everything I originally asked for and fix what is still missing."
  },
  {
    label: "Reuse a fix",
    prompt: "The better-sqlite3 rebuild error is back. Fix it the way we did last time."
  },
  {
    label: "Capture a pattern",
    prompt: "Use the Blume MCP to find repeated friction in my recent conversations and register the strongest pattern as a signal."
  }
];
function PromptExamplesDisclosure() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsDisclosureRow,
    {
      title: "Things to try",
      badge: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: "neutral", children: PROMPT_EXAMPLES.length }),
      summary: "Copy a prompt",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col gap-2", children: PROMPT_EXAMPLES.map((example) => /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { label: example.label, prompt: example.prompt }, example.label)) })
    }
  );
}
function McpSpecificationSection({
  specification
}) {
  const exposedSpecification = {
    protocolVersion: specification.protocolVersion,
    serverInfo: specification.serverInfo,
    instructions: specification.instructions,
    transport: specification.transport,
    capabilities: specification.capabilities,
    methods: specification.methods,
    resources: specification.resources,
    resourceTemplates: specification.resourceTemplates,
    prompts: specification.prompts,
    tools: specification.tools.map(({ access: _access, ...tool }) => tool),
    limits: specification.limits
  };
  const rawSpecification = JSON.stringify(exposedSpecification, null, 2);
  const capabilityNames = Object.keys(specification.capabilities);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      label: "MCP specification",
      footnote: "The exact contract exposed with the selected access level.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsDisclosureRow,
          {
            title: "Server contract",
            summary: `${specification.serverInfo.name}@${specification.serverInfo.version}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsKeyValue,
              {
                entries: [
                  {
                    key: "Server",
                    value: `${specification.serverInfo.name}@${specification.serverInfo.version}`
                  },
                  { key: "Protocol", value: specification.protocolVersion },
                  { key: "Transport", value: specification.transport },
                  {
                    key: "Capabilities",
                    value: capabilityNames.length ? capabilityNames.join(", ") : "None"
                  },
                  { key: "Methods", value: specification.methods.join(", ") },
                  {
                    key: "Limits",
                    value: `${formatBytes(specification.limits.maxRequestBytes)} request · ${formatBytes(specification.limits.maxResponseBytes)} response`
                  }
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsDisclosureRow,
          {
            title: "Available tools",
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: "neutral", children: specification.tools.length }),
            children: specification.tools.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogEmpty, { label: "No tools exposed at this access level." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col divide-y divide-[var(--border-subtle)]", children: specification.tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(ToolEntry, { tool }, tool.name)) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsDisclosureRow,
          {
            title: "Available resources",
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: "neutral", children: specification.resources.length }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CatalogEntries,
              {
                emptyLabel: "No resources exposed.",
                items: specification.resources.map((resource) => ({
                  key: resource.uri,
                  name: resource.name,
                  locator: resource.uri,
                  description: resource.description,
                  metadata: `${resource.mimeType} · priority ${resource.annotations.priority}`
                }))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsDisclosureRow,
          {
            title: "Resource templates",
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: "neutral", children: specification.resourceTemplates.length }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CatalogEntries,
              {
                emptyLabel: "No resource templates exposed.",
                items: specification.resourceTemplates.map((resource) => ({
                  key: resource.uriTemplate,
                  name: resource.name,
                  locator: resource.uriTemplate,
                  description: resource.description,
                  metadata: `${resource.mimeType} · priority ${resource.annotations.priority}`
                }))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsDisclosureRow,
          {
            title: "Available prompts",
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsBadge, { tone: "neutral", children: specification.prompts.length }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CatalogEntries,
              {
                emptyLabel: "No prompts exposed.",
                items: specification.prompts.map((prompt) => ({
                  key: prompt.name,
                  name: prompt.name,
                  locator: prompt.title,
                  description: prompt.description,
                  metadata: prompt.arguments.length === 0 ? "No arguments" : prompt.arguments.map((argument) => `${argument.name}${argument.required ? "*" : ""}`).join(", ")
                }))
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsDisclosureRow, { title: "Raw manifest", summary: "JSON", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsCode,
          {
            label: "Server manifest",
            code: rawSpecification,
            copyLabel: "Copy",
            maxHeightClassName: "max-h-80"
          }
        ) })
      ] })
    }
  );
}
function ToolEntry({ tool }) {
  const [open, setOpen] = reactExports.useState(false);
  const model = reactExports.useMemo(() => mcpToolOfSpec(tool), [tool]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 py-1 first:pt-0 last:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      McpToolCompactItem,
      {
        tool: model,
        expanded: open,
        onSelect: () => setOpen((current) => !current)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10.5px] leading-[1.45] text-[var(--text-muted)]", children: tool.description }),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex min-w-0 flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsCode, { label: "Input schema", code: JSON.stringify(tool.inputSchema, null, 2) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsCode,
        {
          label: "Output schema and annotations",
          code: JSON.stringify(
            { outputSchema: tool.outputSchema, annotations: tool.annotations },
            null,
            2
          )
        }
      )
    ] }) : null
  ] });
}
function CatalogEmpty({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10.5px] leading-[1.45] text-[var(--text-muted)]", children: label });
}
function CatalogEntries({
  items,
  emptyLabel
}) {
  if (items.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogEmpty, { label: emptyLabel });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 flex-col divide-y divide-[var(--border-subtle)]", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 py-2 first:pt-0 last:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block break-all font-mono text-[9.5px] font-semibold text-[var(--text-strong)]", children: item.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "mt-0.5 block break-all font-mono text-[9.5px] text-[var(--accent)]", children: item.locator }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10.5px] leading-[1.45] text-[var(--text-muted)]", children: item.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 break-words font-mono text-[9.5px] text-[var(--text-muted)]", children: item.metadata })
  ] }, item.key)) });
}
function formatBytes(bytes) {
  return bytes % (1024 * 1024) === 0 ? `${bytes / (1024 * 1024)} MiB` : `${bytes} bytes`;
}
function WorkspaceReviewSetting({ data }) {
  const name = useWorkspaceName(data.host);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      label: "Blume review",
      footnote: `Applies to ${name ?? "the current workspace"} across its projects and connected agents.`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsToggleRow,
        {
          title: "Require Blume review before shipping",
          description: "Pause agents before merging or releasing until Blume review is complete. When off, review is optional.",
          checked: data.state.behavior?.reviewPolicy === "required",
          disabled: !data.loaded || data.pending,
          busy: data.pending,
          onCheckedChange: (checked) => void data.act("behavior_configure", {
            expectedVersion: data.state.version,
            reviewPolicy: checked ? "required" : "advisory"
          })
        }
      ) })
    }
  );
}
function BlumeReviewSettings() {
  const data = useOptionalHostedData();
  return data?.capabilities.workspaceBehavior ? /* @__PURE__ */ jsxRuntimeExports.jsx(WorkspaceReviewSetting, { data }) : null;
}
function BehaviorSettings({
  wrappedEnabled = false,
  onOpenProjects
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsScreen, { title: "Behavior", description: "Control how Blume discovers and tracks projects.", children: [
    wrappedEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(WrappedSettingsToggle, {}) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlumeReviewSettings, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsSection,
      {
        label: "Projects Blume tracks",
        footnote: "A project that skips Blume is left alone: its agents do not use Blume there, and the app does not read its conversations.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsNavRow,
          {
            title: "Projects",
            description: "Which conversations Blume reads, and Use, Skip or the default for each project.",
            icon: FolderGit2,
            iconColor: CONCEPT_META.project.accent,
            iconTile: true,
            onPress: () => onOpenProjects?.(),
            disabled: !onOpenProjects
          }
        ) })
      }
    )
  ] });
}
const CONVERSATION_SCOPE_SETTING = "conversations.scope";
function conversationScopeFromSetting(value) {
  return value === "blume" ? "blume" : "all";
}
function projectSummary(row) {
  const conversations = row.local ? "On this computer" : row.conversations === 0 ? "No conversations yet" : row.conversations === 1 ? "1 conversation" : `${row.conversations} conversations`;
  const state = row.mode === "use" ? "Uses Blume" : row.mode === "skip" ? "Skipped" : row.mode === "ask" ? "Asks before using Blume" : row.mode === "mixed" ? "Differs per repository" : "Asks first · default";
  return `${state} · ${conversations}`;
}
function projectChoiceInput(version, row, choice) {
  return {
    expectedVersion: version,
    ...row.repositories.length === 1 ? { repository: row.repositories[0] } : { repositories: row.repositories },
    mode: choice === "default" ? "inherit" : choice
  };
}
function projectChoiceAction(version, row, choice, {
  recordId = (entry) => entry.id,
  repositoryChoice = false
} = {}) {
  if (row.computerOnly)
    return choice === "ask" ? null : { operation: "usage_configure", input: projectChoiceInput(version, row, choice) };
  return {
    operation: "project_set_usage",
    input: {
      projectId: recordId(row),
      usage: choice,
      // Default asks first: an older repository choice that would still apply goes in
      // the same write.
      ...choice === "default" && repositoryChoice ? { clearRepositoryChoices: true } : {}
    }
  };
}
function projectChoiceRows(rows, local, saved, same) {
  const identityOf = (project) => project.canonicalRemote ?? project.root;
  const onThisComputer = (repository) => local.some((project) => identityOf(project) && same(identityOf(project), repository));
  const ledger = rows.map(
    (row) => row.conversations === 0 && row.repositories.some(onThisComputer) ? { ...row, local: true } : row
  );
  const known = rows.flatMap((row) => row.repositories);
  const extra = [];
  for (const project of local) {
    const identity = identityOf(project);
    if (!identity) continue;
    if ([...known, ...extra.flatMap((row) => row.repositories)].some((r) => same(r, identity)))
      continue;
    extra.push({
      id: `local:${project.id}`,
      name: project.name,
      repositories: [identity],
      mode: saved.find((entry) => same(entry.repository, identity))?.mode ?? null,
      usesBlume: false,
      conversations: 0,
      local: true,
      computerOnly: true
    });
  }
  return [...ledger, ...extra];
}
function DeleteConversationsWarning({
  open,
  title,
  removed,
  confirmLabel,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ConfirmDialog,
    {
      open,
      title,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, {}),
      confirmLabel,
      onConfirm,
      onCancel,
      body: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 grid grid-cols-2 gap-2 type-ui-meta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius-control)] bg-[var(--bg-subtle)] p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold text-danger", children: "Removed from Blume" }),
          removed,
          ", with their titles and states"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[var(--radius-control)] bg-[var(--bg-subtle)] p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold text-success", children: "Kept" }),
          "The transcripts on disk, your agents and your deliveries. Change it back to read them again."
        ] })
      ] })
    }
  );
}
const NARROWING_FALLBACK = "Conversations from projects that do not use Blume";
const SKIP_FALLBACK = "Any conversations stored for this project";
const SCOPE_OPTIONS = [
  {
    value: "all",
    label: "All projects",
    icon: Layers,
    hint: "Every agent conversation on this computer, including those from before Blume was installed: the last day first, then older history a day at a time while the computer is quiet. Projects that skip Blume stay hidden. Conversations never leave this computer."
  },
  {
    value: "blume",
    label: "Projects that use Blume",
    icon: Flower2,
    hint: "Only conversations whose agents used Blume: projects set to Use, projects set up for Blume or with deliveries, and conversations where you answered Yes. Other work never reaches the app."
  }
];
const INTERVAL_MEANING = {
  live: "New activity shows within seconds of an agent writing it. Open conversations always do.",
  "30s": "New activity shows within 30 seconds. Open conversations stay live.",
  "1m": "New activity shows within a minute. Open conversations stay live.",
  "5m": "New activity shows within 5 minutes. Open conversations stay live.",
  "15m": "New activity shows within 15 minutes. Open conversations stay live."
};
const INTERVAL_LABELS = {
  live: "As it happens",
  "30s": "Every 30 seconds",
  "1m": "Every minute",
  "5m": "Every 5 minutes",
  "15m": "Every 15 minutes"
};
function choiceOptions(readsLocally) {
  return [
    {
      value: "use",
      label: "Use Blume",
      icon: Check,
      iconColor: "var(--success)",
      hint: "Agents here always use Blume, without asking. Their conversations show in the app."
    },
    {
      value: "ask",
      label: "Ask first",
      icon: MessageCircle,
      iconColor: "var(--accent)",
      hint: "Agents here ask you once in each conversation before they use Blume."
    },
    {
      value: "default",
      label: "Default: ask first",
      icon: CircleDashed,
      iconColor: "var(--text-muted)",
      hint: "No choice for this project: agents ask you once in each conversation. A folder new to Blume is set up first."
    },
    {
      value: "skip",
      label: "Skip",
      icon: EyeOff,
      iconColor: "var(--warn)",
      hint: readsLocally ? "Blume is off here: agents do not use it, and the app never reads this project’s conversations." : "Blume is off here: agents do not use it."
    }
  ];
}
function useLocalSetting(key) {
  const host = useSidecarHost();
  const [value, setValue] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    let live = true;
    const read = () => void host.settings.get(key).then(
      (next) => live && setValue(next),
      () => live && setValue(null)
    );
    read();
    const unsubscribe = host.settings.onChanged(read);
    return () => {
      live = false;
      unsubscribe();
    };
  }, [host, key]);
  return [
    value,
    (next) => {
      setValue(next);
      void host.settings.set(key, next).catch(() => void 0);
    }
  ];
}
function defaultModeOf(data) {
  return data?.state.usagePolicy?.defaultMode ?? "ask";
}
const LOCAL_PROJECT_LIMIT = 100;
function useProjectChoiceRows(data) {
  const host = useSidecarHost();
  const local = useAsync((signal) => host.projects.listRecent(LOCAL_PROJECT_LIMIT, signal), [host]).data ?? [];
  return choiceRowsOf(data, local);
}
function choiceRowsOf(data, local) {
  if (!data) return [];
  return projectChoiceRows(
    usageProjectRows(data.state),
    local,
    data.state.usagePolicy?.repositories ?? [],
    sameRepository
  );
}
function ProjectSettings({
  onOpenChoices
}) {
  const host = useSidecarHost();
  const data = useOptionalHostedData();
  const [scopeValue, setScope] = useLocalSetting(CONVERSATION_SCOPE_SETTING);
  const [intervalValue, setInterval2] = useLocalSetting(CONVERSATION_PARSE_INTERVAL_SETTING);
  const parseDefault = useAsync(
    () => host.settings.getConversationParseDefault?.() ?? Promise.resolve(null),
    [host]
  ).data;
  const rows = choiceRowsOf(data, []);
  const defaultMode = defaultModeOf(data);
  const [narrowing, setNarrowing] = reactExports.useState(null);
  const changeScope = (next) => {
    if (next !== "blume" || conversationScopeFromSetting(scopeValue) === "blume") {
      setScope(next);
      return;
    }
    void countAllConversations(host).then(
      (counted) => counted.count === 0 && !counted.capped ? setScope(next) : setNarrowing(removedConversationsLabel(counted, NARROWING_FALLBACK)),
      () => setNarrowing(NARROWING_FALLBACK)
    );
  };
  const interval = intervalValue && intervalValue in INTERVAL_LABELS ? intervalValue : parseDefault ?? "live";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Projects",
      description: "Where Blume reads agent conversations and where agents use it.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
          parseDefault ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsSegmentRow,
            {
              icon: Eye,
              iconColor: CONCEPT_META.conversation.accent,
              title: "Show",
              description: "Which agent conversations Blume reads on this computer.",
              display: "icons",
              value: conversationScopeFromSetting(scopeValue),
              options: SCOPE_OPTIONS,
              disabled: scopeValue === void 0,
              onValueChange: changeScope
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsSelectRow,
            {
              icon: Sparkles,
              iconColor: CONCEPT_META.agent.accent,
              title: "Outside a project",
              description: "What agents do in a conversation Blume can’t tie to a folder. Every project has its own choice.",
              value: defaultMode,
              options: [
                { value: "ask", label: "Ask first" },
                { value: "use", label: "Use Blume" }
              ],
              disabled: !data?.loaded,
              busy: data?.pending,
              onValueChange: (next) => void data?.act("usage_configure", {
                expectedVersion: data.state.version,
                defaultMode: next
              })
            }
          ),
          parseDefault ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsSelectRow,
            {
              icon: Timer,
              iconColor: CONCEPT_META.activity.accent,
              title: "Check for activity",
              description: INTERVAL_MEANING[interval],
              value: interval,
              options: Object.keys(INTERVAL_LABELS).map(
                (value) => ({
                  value,
                  label: value === parseDefault ? `${INTERVAL_LABELS[value]} (default)` : INTERVAL_LABELS[value]
                })
              ),
              disabled: intervalValue === void 0,
              onValueChange: setInterval2
            }
          ) : null,
          parseDefault ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            HistoryProgressSettingsRow,
            {
              icon: History,
              iconColor: CONCEPT_META.conversation.accent
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsNavRow,
            {
              icon: FolderGit2,
              iconColor: CONCEPT_META.project.accent,
              title: "Project choices",
              description: "Use, Ask first, the default or Skip, for each project.",
              value: data?.loaded ? [
                `${rows.filter((row) => row.mode === "use").length} use`,
                rows.some((row) => row.mode === "ask") && `${rows.filter((row) => row.mode === "ask").length} ask`,
                `${rows.filter((row) => row.mode === "skip").length} skip`
              ].filter(Boolean).join(" · ") : void 0,
              onPress: onOpenChoices
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeleteConversationsWarning,
          {
            open: narrowing !== null,
            title: "Show only projects that use Blume?",
            removed: narrowing ?? "",
            confirmLabel: "Show only these",
            onConfirm: () => {
              setNarrowing(null);
              setScope("blume");
            },
            onCancel: () => setNarrowing(null)
          }
        )
      ]
    }
  );
}
function ProjectChoicesSettings() {
  const host = useSidecarHost();
  const data = useOptionalHostedData();
  const readsLocally = typeof host.settings.getConversationParseDefault === "function";
  const rows = useProjectChoiceRows(data);
  const options = choiceOptions(readsLocally);
  const recordId = (row) => data?.state.projects?.find((project) => project.id === row.id)?.id ?? data?.state.projects?.find(
    (project) => project.repositories.some(
      (repository) => sameRepository(repository, row.repositories[0] ?? "")
    )
  )?.id ?? row.id;
  const choose = (row, choice) => {
    if (!data) return;
    const action = projectChoiceAction(data.state.version, row, choice, {
      recordId,
      repositoryChoice: row.repositories.some(
        (repository) => data.state.usagePolicy?.repositories.some(
          (saved) => sameRepository(saved.repository, repository)
        )
      )
    });
    if (action) void data.act(action.operation, action.input);
  };
  const [skipping, setSkipping] = reactExports.useState(null);
  const requestChoice = (row, choice) => {
    if (!readsLocally || choice !== "skip" || row.mode === "skip") {
      choose(row, choice);
      return;
    }
    const ask = (counted) => setSkipping({
      row,
      removed: removedConversationsLabel(
        counted && (counted.count > 0 || counted.capped) ? counted : { count: row.conversations, capped: false },
        SKIP_FALLBACK
      )
    });
    void countConversationsForRepositories(host, row.repositories).then(ask, () => ask(null));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Project choices",
      description: "Whether agents use Blume in each project Blume knows.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            footnote: readsLocally ? "A skipped project is left alone: its agents do not use Blume, and the app does not read its conversations." : "A skipped project is left alone: its agents do not use Blume there.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsEmpty,
              {
                icon: FolderGit2,
                title: data?.loaded ? "No projects yet" : "Loading projects",
                description: data?.loaded ? "Projects appear here once an agent works in them." : void 0
              }
            ) : rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsRow,
              {
                leading: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProjectAvatar,
                  {
                    seed: row.avatar ?? repositoryFlowerSeed(row.repositories[0] ?? row.name),
                    size: 20
                  }
                ),
                title: row.name,
                description: projectSummary(row),
                trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingsSegmentControl,
                  {
                    label: `Blume in ${row.name}`,
                    display: "icons",
                    value: row.mode === null ? "default" : row.mode === "mixed" ? "" : row.mode,
                    options: row.computerOnly ? options.filter((option) => option.value !== "ask") : options,
                    disabled: !data?.loaded,
                    busy: data?.pending,
                    onValueChange: (choice) => requestChoice(row, choice)
                  }
                )
              },
              row.id
            )) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeleteConversationsWarning,
          {
            open: skipping !== null,
            title: `Skip ${skipping?.row.name ?? "this project"}?`,
            removed: skipping?.removed ?? "",
            confirmLabel: "Skip project",
            onConfirm: () => {
              if (skipping) choose(skipping.row, "skip");
              setSkipping(null);
            },
            onCancel: () => setSkipping(null)
          }
        )
      ]
    }
  );
}
const installationText = (installation) => `${installation.accountType === "Organization" ? "Organization" : "Your account"} · ${installation.repositorySelection === "all" ? "All repositories" : "Selected repositories"}`;
function GitHubSettings({
  github,
  projects,
  back
}) {
  const capture = useDeliveryEvent();
  const [status, setStatus] = reactExports.useState();
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [waiting, setWaiting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!github) return;
    const load = () => void github.status().then(setStatus, (e) => setError(githubErrorText(e)));
    load();
    const timer = setInterval(load, 15e3);
    const stop = github.onChanged?.(load);
    return () => {
      clearInterval(timer);
      stop?.();
    };
  }, [github]);
  const connected = Boolean(status?.connected);
  const repositories = useGitHubRepositories(projects, connected, status?.login);
  const installations = repositories.list?.installations;
  const ready = connected && (projects ? Boolean(installations?.length) : true);
  const known = !connected || !projects || Boolean(repositories.list || repositories.error);
  const reload = reactExports.useRef(repositories.reload);
  reload.current = repositories.reload;
  reactExports.useEffect(() => {
    if (!waiting || ready) return;
    const look = () => reload.current(true);
    window.addEventListener("focus", look);
    const timer = setInterval(look, 1e4);
    return () => {
      window.removeEventListener("focus", look);
      clearInterval(timer);
    };
  }, [waiting, ready]);
  const [walked, setWalked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (status && (!connected || repositories.list && !ready)) setWalked(true);
  }, [status, connected, repositories.list, ready]);
  if (!github)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsScreen, { title: "GitHub", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "info", children: "GitHub runs in the Blume desktop app, which keeps its authorization on this computer. It is not available here." }) }) });
  const run = async (work) => {
    setBusy(true);
    setError("");
    try {
      const next = await work();
      if (next) setStatus(next);
    } catch (e) {
      setError(githubErrorText(e));
    } finally {
      setBusy(false);
    }
  };
  const choose = github.openInstallation ? (input) => {
    capture("deliveries_github_install_clicked", { action: "install" });
    setWaiting(true);
    void run(() => github.openInstallation(input));
  } : void 0;
  const now = Date.now();
  const paused = status?.rateLimit?.pausedUntil && status.rateLimit.pausedUntil > now ? status.rateLimit.pausedUntil : void 0;
  const facts = status?.connected ? [
    {
      id: "account",
      label: "Account",
      value: status.login ? `@${status.login}` : "GitHub user",
      concept: "repo-main",
      link: status.login ? { href: `https://github.com/${status.login}` } : void 0,
      linkLabel: status.login ? `Open @${status.login} on GitHub` : void 0
    },
    { id: "via", label: "Through", value: "Blume GitHub App", concept: "plugin" },
    ...status.connectedAt ? [{ id: "since", label: "Connected since", value: new Date(status.connectedAt).toLocaleDateString(), concept: "activity", priority: "secondary" }] : [],
    {
      id: "synced",
      label: "Last synced",
      value: status.lastSyncAt ? relativeTime(status.lastSyncAt, now) : status.syncing ? "Syncing now" : "Not yet",
      concept: "activity",
      metric: true
    },
    ...status.rateLimit?.remaining !== void 0 ? [{ id: "requests", label: "API requests left this hour", value: `${status.rateLimit.remaining} requests left`, concept: "usage", metric: true }] : []
  ] : [];
  const repositoryCount = repositories.list?.projects.length ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "GitHub",
      description: "Choose the repositories Blume can read for setup, pull requests, checks and workflow runs. Your agents define which repositories and folders belong to each project.",
      actions: status ? (
        // Connected and reading repositories; connected with none chosen yet needs access.
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IntegrationStateFacet,
          {
            state: ready ? "connected" : connected ? "needs-access" : "not-connected",
            form: "badge",
            size: "sm"
          }
        )
      ) : void 0,
      facts,
      children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "danger", children: error }) }),
        status && known && !ready && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsSection,
          {
            label: "Set up GitHub",
            footnote: "GitHub’s authorization is encrypted in your system keychain and is never sent to the Blume ledger.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Timeline, { density: "compact", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                JourneyStep,
                {
                  step: 1,
                  state: connected ? "done" : "current",
                  title: connected ? `Connected${status.login ? ` as @${status.login}` : ""}` : "Connect your GitHub account",
                  children: !connected && /* @__PURE__ */ jsxRuntimeExports.jsx(GitHubConnect, { github, status, onStatus: setStatus })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyStep, { step: 2, state: connected ? "current" : "next", title: "Choose repositories", children: connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body text-body", children: "Allow all repositories, or only the ones your projects live in. You can change this any time." }),
                choose ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "primary", disabled: busy, onClick: () => choose(), children: "Choose repositories on GitHub" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", disabled: busy, onClick: () => choose({ chooseAccount: true }), children: "Use an organization instead" })
                ] }) : null,
                waiting && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", "aria-live": "polite", children: "Save your choice on GitHub. This page moves on when you come back." }),
                repositories.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "m-0 type-ui-meta text-danger", children: repositories.error })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Blume reads only the repositories you pick." }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JourneyStep, { step: 3, state: "next", title: "Ready", last: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Deliveries show the pull requests, checks and workflow runs of those repositories." }) })
            ] }) }) })
          }
        ),
        ready && walked && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            leading: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsIconTile, { icon: CircleCheck, size: "lg" }),
            title: "GitHub is set up",
            description: repositoryCount ? `Blume can read ${repositoryCount} ${repositoryCount === 1 ? "repository" : "repositories"}.` : "Blume can read the repositories you chose.",
            trailing: back ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "primary", size: "sm", onClick: back.onSelect, children: back.label }) : void 0
          }
        ) }) }),
        ready && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SettingsSection,
            {
              label: "Repositories",
              footnote: "Blume checks linked pull requests about once a minute while the app is open, and when you open a delivery.",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
                  installations?.map((installation) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SettingsRow,
                    {
                      leading: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsIconTile, { icon: GitPullRequest, size: "lg" }),
                      title: installation.account,
                      description: installationText(installation),
                      trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, type: "button", variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: installation.manageUrl, target: "_blank", rel: "noopener noreferrer", children: "Change on GitHub" }) })
                    },
                    installation.id
                  )),
                  choose && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SettingsRow,
                    {
                      title: installations?.length ? "Another account" : "Repositories",
                      description: installations?.length ? "Give Blume an organization’s repositories too. GitHub opens in your browser." : "Choose which accounts and repositories Blume can read. GitHub opens in your browser.",
                      trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          disabled: busy,
                          onClick: () => choose(installations?.length ? { chooseAccount: true } : void 0),
                          children: installations?.length ? "Add an organization" : "Choose on GitHub"
                        }
                      )
                    }
                  )
                ] }),
                repositories.list?.truncated && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "info", children: "Blume lists the first repositories it was granted; there are more." }),
                repositories.error && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "warn", children: repositories.error })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsSection, { label: "Connection", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SettingsRow,
              {
                title: "Authorization",
                trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-body", children: status?.persisted ? "Encrypted in your system keychain" : "This session only (keychain unavailable)" })
              }
            ) }),
            paused && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "warn", children: `GitHub sync is paused until ${new Date(paused).toLocaleTimeString()} to stay within your GitHub rate limit.` }),
            status?.error && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "warn", children: status.error })
          ] })
        ] }),
        connected && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            title: "Disconnect GitHub",
            description: "Blume stops reading pull requests and checks. Deliveries keep what they already show.",
            trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                size: "sm",
                disabled: busy,
                onClick: () => {
                  setWaiting(false);
                  void run(() => github.disconnect());
                },
                children: "Disconnect"
              }
            )
          }
        ) }) })
      ]
    }
  );
}
function JourneyStep({
  step,
  state,
  title,
  last,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TimelineItem,
    {
      marker: state === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check$1, { size: 12, "aria-hidden": true }) : String(step),
      tone: state === "done" ? "success" : state === "current" ? "accent" : "neutral",
      emphasized: state === "current",
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: state === "next" ? "text-muted" : void 0, children: title }),
      "aria-current": state === "current" ? "step" : void 0,
      last,
      children
    }
  );
}
const PLAN_OFFERS = [
  {
    plan: "free",
    name: "Free",
    audience: "To try Blume on your own computer",
    price: { amount: "$0", period: "a month" },
    lines: [
      { text: `${FREE_LOCAL_TEST_RUNS_PER_MONTH} local test runs a month`, included: true },
      { text: "Test evidence kept for 30 days", included: true },
      { text: "Organizations of up to 3 members", included: true },
      { text: "No hosted test runs", included: false }
    ]
  },
  {
    plan: "pro",
    name: "Pro",
    audience: "For your personal workspace",
    price: { amount: "$20", period: "a month" },
    lines: [
      { text: "Unlimited local test runs", included: true },
      { text: "Test evidence kept for 90 days", included: true },
      { text: "Hosted test runs stay on Team", included: false }
    ]
  },
  {
    plan: "team",
    name: "Team",
    audience: "For an organization",
    price: { amount: "$30", period: "a member a month" },
    lines: [
      { text: "Hosted test runs", included: true },
      { text: "Test generation and hosted reruns", included: true },
      { text: "Unlimited local test runs", included: true },
      { text: "Test evidence kept for 90 days", included: true },
      { text: "Up to 100 members", included: true }
    ]
  }
];
const HOSTED_RUNS_EXPLAINED = "Hosted test runs use Blume’s own browsers and AI, so your tests run while your computer is off or busy, and from pull requests.";
const CHECKOUT_EXPLAINED = "Opens a secure Polar checkout in your browser. Cancel any time; the plan applies as soon as payment is confirmed.";
const BILLING_UNAVAILABLE = "Plans are set by Blume while billing is being built.";
const RANK = { free: 0, pro: 1, team: 2 };
const upgradePlan = (kind) => kind === "personal" ? "pro" : "team";
function planCardAction(plan, workspace, current, billing) {
  if (plan === current) return { kind: "current" };
  if (billing?.planOverride?.active) return { kind: "none" };
  const target = upgradePlan(workspace.kind);
  if (plan !== "free" && plan !== target)
    return workspace.kind === "personal" ? {
      kind: "elsewhere",
      text: "Team is an organization’s plan. Create an organization or switch to one to use it.",
      switchWorkspace: true
    } : {
      kind: "elsewhere",
      text: "Pro is for one person’s own workspace. Organizations use Team.",
      switchWorkspace: false
    };
  if (RANK[plan] < RANK[current] || billing === void 0) return { kind: "none" };
  if (!billing?.available) return { kind: "unavailable", text: BILLING_UNAVAILABLE };
  if (!billing.canManage)
    return { kind: "ask", text: `Ask an owner or admin of ${workspace.name} to upgrade.` };
  if (billing.subscription) return { kind: "none" };
  return { kind: "upgrade", label: `Upgrade to ${plan === "team" ? "Team" : "Pro"}` };
}
function useBilling(workspace) {
  const [billing, setBilling] = reactExports.useState();
  const load = reactExports.useCallback(async () => {
    if (!workspace) return;
    try {
      setBilling(await workspace({ action: "billing" }));
    } catch {
      setBilling(null);
    }
  }, [workspace]);
  reactExports.useEffect(() => {
    void load();
    const onFocus = () => void load();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [load]);
  return { billing, reload: load };
}
function PlanSettings({
  workspace,
  ledger,
  onPlanChange
}) {
  const { list, error, reload } = useWorkspaceList(workspace);
  const [planRevision, setPlanRevision] = reactExports.useState(0);
  const usage = usePlanUsage(ledger, planRevision);
  const [switchingPlan, setSwitchingPlan] = reactExports.useState(false);
  const { billing, reload: reloadBilling } = useBilling(workspace);
  const openPage = useSettingsPageNavigation();
  const [opening, setOpening] = reactExports.useState(null);
  const [billingError, setBillingError] = reactExports.useState("");
  const [checkoutFrom, setCheckoutFrom] = reactExports.useState(null);
  const plan = billing?.tier ?? (list ? workspacePlan(list.active) : void 0);
  const openBilling = async (action) => {
    if (!workspace) return;
    setOpening(action);
    setBillingError("");
    try {
      const { url } = await workspace({ action });
      await ledger?.openEvidence?.(url);
      if (action === "checkout" && plan) setCheckoutFrom(plan);
    } catch (e) {
      setBillingError(errorText(e));
    } finally {
      setOpening(null);
      void reloadBilling();
      void reload();
    }
  };
  const changeTestPlan = async (value) => {
    if (!workspace || !list || switchingPlan) return;
    setSwitchingPlan(true);
    setBillingError("");
    try {
      await workspace({
        action: "planOverride",
        plan: value === "actual" ? null : value,
        organizationId: list.active.id
      });
      setCheckoutFrom(null);
    } catch (e) {
      setBillingError(errorText(e));
    } finally {
      await Promise.all([reloadBilling(), reload()]);
      setPlanRevision((value2) => value2 + 1);
      onPlanChange?.();
      setSwitchingPlan(false);
    }
  };
  if (!workspace) return /* @__PURE__ */ jsxRuntimeExports.jsx(WorkspacesUnavailable, { title: "Plan and usage" });
  const problem = error || usage.error || billingError;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SettingsScreen,
    {
      title: "Plan and usage",
      description: "Each workspace has its own plan.",
      actions: plan ? /* @__PURE__ */ jsxRuntimeExports.jsx(PlanTierFacet, { tier: plan, form: "badge", size: "sm" }) : void 0,
      facts: list ? [
        {
          id: "workspace",
          label: "Workspace",
          value: list.active.name,
          concept: "global",
          link: openPage ? { onSelect: () => openPage("workspace") } : void 0,
          linkLabel: `Open workspace ${list.active.name}`
        },
        {
          id: "role",
          label: "Your role",
          value: roleLabel(list.active.role),
          concept: "verification"
        }
      ] : void 0,
      children: [
        problem && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "danger", children: problem }) }),
        !list || !plan ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeletonGroup, { rows: 3 }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          checkoutFrom !== null && checkoutFrom === plan && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "info", children: "Finish the checkout in your browser. This page shows the new plan as soon as Polar confirms the payment." }) }),
          billing?.planOverride && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            SettingsSection,
            {
              label: "Staff plan testing",
              footnote: "Use this workspace for testing. Switching applies the selected plan’s limits to everyone in it. Your subscription and payments stay unchanged.",
              children: [
                billing.planOverride.active && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsNote, { tone: "info", children: `Plan override active: ${planLabel(billing.planOverride.active.plan)}. Actual plan: ${planLabel(billing.planOverride.actualTier)}.` }),
                billing.planOverride.canManage && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingsSelectRow,
                  {
                    title: "Test plan",
                    value: billing.planOverride.active?.plan ?? "actual",
                    options: [
                      { value: "actual", label: "Use actual subscription" },
                      { value: "free", label: "Free" },
                      { value: "pro", label: "Pro" },
                      { value: "team", label: "Team" }
                    ],
                    busy: switchingPlan,
                    onValueChange: (value) => void changeTestPlan(value)
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlanUsage, { usage: usage.plan, plan }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlanBilling,
            {
              billing,
              workspaceName: list.active.name,
              busy: opening !== null,
              onManage: () => void openBilling("portal")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlanComparison,
            {
              workspace: list.active,
              plan,
              billing,
              opening,
              onUpgrade: () => void openBilling("checkout"),
              onOpenWorkspace: openPage ? () => openPage("workspace") : void 0
            }
          )
        ] })
      ]
    }
  );
}
function PlanUsage({
  usage,
  plan
}) {
  const runs = usage?.localTestRuns;
  const limited = runs ? runs.limit !== null : plan === "free";
  const usedUp = runs && runs.limit !== null && runs.thisMonth >= runs.limit;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      label: "This month",
      footnote: limited ? "Local test runs reset on the 1st of each month (UTC)." : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            title: "Local test runs",
            description: !usage ? "Not available from this ledger" : usedUp ? "All used until the 1st. Pro and Team have no limit." : void 0,
            trailing: usage ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta tabular-nums text-body", children: localRunsSummary(usage) }) : void 0,
            children: usage && runs && runs.limit !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(WorkspaceQuotaMeter, { usage }) : null
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            title: "Test evidence kept",
            trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta tabular-nums text-body", children: `${usage?.evidenceDays ?? (plan === "free" ? 30 : 90)} days` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            title: "Hosted test runs",
            trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-body", children: plan === "team" ? "Included" : "Team plan only" })
          }
        )
      ] })
    }
  );
}
function PlanBilling({
  billing,
  workspaceName,
  busy,
  onManage
}) {
  if (!billing || !billing.subscription && !billing.grant) return null;
  const { subscription, grant } = billing;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsSection,
    {
      label: "Billing",
      footnote: !subscription ? void 0 : billing.canManage ? "Manage billing opens Polar’s customer portal in your browser: payment method, invoices and cancelling." : `Only owners and admins of ${workspaceName} can manage billing.`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
        grant && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            title: "Granted by Blume",
            description: grantSummary(grant),
            trailing: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neutral", size: "sm", children: "No charge" })
          }
        ),
        subscription && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            title: `${planLabel(billing.planOverride?.actualTier ?? billing.tier)} subscription`,
            description: subscriptionSummary(subscription),
            trailing: billing.canManage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: busy,
                onClick: onManage,
                children: "Manage billing"
              }
            ) : void 0
          }
        )
      ] })
    }
  );
}
function PlanComparison({
  workspace,
  plan,
  billing,
  opening,
  onUpgrade,
  onOpenWorkspace
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Compare plans", footnote: HOSTED_RUNS_EXPLAINED, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-w-0 gap-3 @min-[680px]/settings-page:grid-cols-3", children: PLAN_OFFERS.map((offer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    PlanCard,
    {
      offer,
      action: planCardAction(offer.plan, workspace, plan, billing),
      opening: opening === "checkout",
      onUpgrade,
      onOpenWorkspace
    },
    offer.plan
  )) }) });
}
function PlanCard({
  offer,
  action,
  opening,
  onUpgrade,
  onOpenWorkspace
}) {
  const titleId = reactExports.useId();
  const highlighted = action.kind === "upgrade" || action.kind === "ask" || action.kind === "unavailable";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      role: "group",
      "aria-labelledby": titleId,
      emphasis: highlighted ? "highlighted" : "default",
      elevation: highlighted ? "raised" : "flat",
      className: "min-w-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { as: "h4", size: "md", id: titleId, children: offer.name }),
            action.kind === "current" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "soft", color: "accent", size: "sm", children: "Current plan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: offer.audience })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "m-0 flex min-w-0 flex-wrap items-baseline gap-x-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingText, { size: "xl", children: offer.price.amount }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "type-ui-meta text-muted", children: offer.price.period })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "m-0 flex list-none flex-col gap-1.5 p-0", children: offer.lines.map((line) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex min-w-0 items-start gap-2 type-ui-body", children: [
          line.included ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Check,
            {
              size: 12,
              strokeWidth: 2.4,
              "aria-hidden": true,
              className: "mt-0.5 shrink-0 text-success"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Minus,
            {
              size: 12,
              strokeWidth: 2.4,
              "aria-hidden": true,
              className: "mt-0.5 shrink-0 text-muted"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: line.included ? "min-w-0 text-body" : "min-w-0 text-muted", children: line.text })
        ] }, line.text)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PlanCardFooter,
          {
            action,
            opening,
            onUpgrade,
            onOpenWorkspace
          }
        )
      ]
    }
  );
}
function PlanCardFooter({
  action,
  opening,
  onUpgrade,
  onOpenWorkspace
}) {
  if (action.kind === "current" || action.kind === "none") return null;
  if (action.kind === "upgrade")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex min-w-0 flex-col gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          className: "w-full",
          disabled: opening,
          onClick: onUpgrade,
          children: opening ? "Opening checkout…" : action.label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: CHECKOUT_EXPLAINED })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex min-w-0 flex-col items-start gap-2 pt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: action.kind === "elsewhere" ? "m-0 type-ui-meta text-muted" : "m-0 type-ui-meta text-body",
        children: action.text
      }
    ),
    action.kind === "elsewhere" && action.switchWorkspace && onOpenWorkspace ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onOpenWorkspace, children: "Go to Workspace" }) : null
  ] });
}
function isLaunchAtLoginSelected(status) {
  return status?.status === "enabled" || status?.status === "requires-approval";
}
function launchAtLoginSummary(status) {
  if (status === null) return "Checking startup setting";
  if (status.status === "enabled") return "On · opens the Blume window";
  if (status.status === "requires-approval") return "Approval required in System Settings";
  if (status.status === "disabled") return "Off";
  return "Unavailable on this platform";
}
function SystemSettings({ composed = false } = {}) {
  const host = useSidecarHost();
  const canManageLaunchAtLogin = typeof host.settings.getLaunchAtLogin === "function" && typeof host.settings.setLaunchAtLogin === "function";
  const [launchAtLogin, setLaunchAtLogin] = reactExports.useState(null);
  const [launchAtLoginBusy, setLaunchAtLoginBusy] = reactExports.useState(false);
  const refreshLaunchAtLogin = reactExports.useCallback(() => {
    if (!host.settings.getLaunchAtLogin) return;
    void host.settings.getLaunchAtLogin().then(setLaunchAtLogin, () => setLaunchAtLogin(null));
  }, [host]);
  reactExports.useEffect(() => {
    if (!canManageLaunchAtLogin) return;
    refreshLaunchAtLogin();
    window.addEventListener("focus", refreshLaunchAtLogin);
    return () => window.removeEventListener("focus", refreshLaunchAtLogin);
  }, [canManageLaunchAtLogin, refreshLaunchAtLogin]);
  const launchAtLoginSupported = launchAtLogin !== null && launchAtLogin.status !== "unsupported";
  const launchAtLoginEnabled = isLaunchAtLoginSelected(launchAtLogin);
  const launchSummary = launchAtLoginSummary(launchAtLogin);
  const launchSummaryVisible = launchAtLogin === null || launchAtLogin.status === "unsupported" || launchAtLogin.status === "requires-approval";
  const showLaunchAtLoginRow = canManageLaunchAtLogin;
  const toggleLaunchAtLogin = () => {
    if (!host.settings.setLaunchAtLogin || !launchAtLoginSupported || launchAtLoginBusy) return;
    const enabled = !launchAtLoginEnabled;
    const previous = launchAtLogin;
    host.system.captureEvent?.("launch_at_login_toggled", { enabled });
    setLaunchAtLogin({ status: enabled ? "enabled" : "disabled" });
    setLaunchAtLoginBusy(true);
    void host.settings.setLaunchAtLogin(enabled).then(setLaunchAtLogin, () => {
      setLaunchAtLogin(previous);
      refreshLaunchAtLogin();
    }).finally(() => setLaunchAtLoginBusy(false));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsScreen, { title: "System", hideHeader: composed, children: showLaunchAtLoginRow ? /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsToggleRow,
      {
        icon: Power,
        iconColor: CONCEPT_META.command.accent,
        title: "Open Blume at login",
        description: launchSummaryVisible ? launchSummary : void 0,
        checked: launchAtLoginEnabled,
        busy: launchAtLoginBusy,
        disabled: !launchAtLoginSupported,
        onCheckedChange: toggleLaunchAtLogin
      }
    ),
    launchAtLogin?.status === "requires-approval" && host.settings.openLaunchAtLoginSettings ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsActionRow,
      {
        tone: "accent",
        label: "Open Login Items in System Settings",
        onPress: () => void host.settings.openLaunchAtLoginSettings?.().catch(() => void 0)
      }
    ) : null
  ] }) }) : null });
}
function AgentSignInSettings({ host }) {
  const enabled = useCloudChatFeature();
  const cloudOnly = host?.ownedChatExecution === "cloud-only";
  const [status, setStatus] = reactExports.useState([]);
  const [error, setError] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [token, setToken] = reactExports.useState("");
  const [showToken, setShowToken] = reactExports.useState(false);
  const [disconnect, setDisconnect] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let stopped = false;
    setStatus([]);
    setToken("");
    if (!enabled) return;
    if (!host) {
      setError("Sign in to Blume to manage cloud agent sign-ins.");
      return;
    }
    void host.call(OWNED_CLOUD_SUBSCRIPTION_OPERATION, { action: "status" }).then(
      (value) => {
        if (!stopped) {
          setStatus(value);
          setError("");
        }
      },
      (cause) => {
        if (!stopped)
          setError(userFacingErrorMessage(cause, "Could not load cloud sign-ins. Try again."));
      }
    );
    return () => {
      stopped = true;
    };
  }, [host, enabled]);
  const act = async (request) => {
    if (!enabled || !host || busy) return;
    setBusy(true);
    setError("");
    try {
      setStatus(
        await host.call(OWNED_CLOUD_SUBSCRIPTION_OPERATION, request)
      );
      setShowToken(false);
      setDisconnect(false);
    } catch (cause) {
      setError(userFacingErrorMessage(cause, "Could not save the agent sign-in."));
    } finally {
      setToken("");
      setBusy(false);
    }
  };
  if (!enabled)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsScreen, { title: "Agents", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { padding: "sm", children: "Cloud agents are not enabled." }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsScreen, { title: "Agents", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Cloud subscriptions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContent, { padding: "sm", stack: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-body", children: "Personal sign-ins for your cloud agents. Updated credentials apply on the next message. Your chats and files stay in place." }),
    ["codex", "claude"].map((harness) => {
      const saved = status.find((item) => item.harness === harness);
      const name = harness === "codex" ? "Codex" : "Claude";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          label: name,
          group: true,
          hint: saved?.configured ? saved.source === "subscription-token" ? "Subscription token saved" : cloudOnly ? "Local sign-in imported. Update it in Blume Desktop." : "Local sign-in imported" : cloudOnly ? `No cloud sign-in saved. Import your ${name} sign-in in Blume Desktop.` : `No cloud sign-in saved. Sign in with ${harness === "codex" ? "codex login" : "claude auth login"} on the computer running your agents.`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            !cloudOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                disabled: busy || !host,
                onClick: () => void act({ action: "import", harness }),
                children: saved?.configured ? `Import ${name} sign-in again` : `Import ${name} sign-in`
              }
            ),
            harness === "claude" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                disabled: busy || !host,
                onClick: () => setShowToken((value) => !value),
                children: "Use subscription token"
              }
            )
          ] })
        },
        harness
      );
    }),
    showToken && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      FormField,
      {
        group: true,
        label: "Claude subscription token",
        hint: "Create a token with claude setup-token using your Claude subscription.",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "password",
              autoComplete: "new-password",
              "aria-label": "Claude subscription token",
              value: token,
              onChange: (event) => setToken(event.target.value),
              disabled: busy,
              maxLength: 4200
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "primary",
              size: "sm",
              disabled: busy || !token.trim(),
              onClick: () => void act({ action: "token", harness: "claude", token }),
              children: "Save subscription token"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "destructive",
        size: "sm",
        disabled: busy || !host,
        onClick: () => {
          setError("");
          setDisconnect(true);
        },
        children: "Disconnect cloud agents"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: disconnect,
        title: "Delete cloud workspaces and disconnect?",
        body: "This deletes every cloud agent workspace and its files in this Blume account and workspace, and removes saved cloud sign-ins. Save any files you need first. Local chats stay on your computer. Provider sessions may also need revoking in your provider account.",
        confirmLabel: "Delete workspaces and disconnect",
        busyLabel: "Disconnecting…",
        busy,
        error,
        onCancel: () => setDisconnect(false),
        onConfirm: () => void act({ action: "disconnect", confirm: "delete-cloud-workspaces" })
      }
    ),
    !disconnect && /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { children: error })
  ] }) }) });
}
const SETTINGS_PAGE_CATEGORY = {
  agents: "intelligence",
  workspace: "workspace",
  plan: "workspace",
  appearance: "personalization",
  behavior: "personalization",
  projects: "personalization",
  theme: "personalization",
  share: "personalization",
  mcp: "intelligence",
  github: "integrations",
  "menu-bar": "app",
  system: "app"
};
const plural = (count, one, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;
function useSettingsEntries(input) {
  const codex = useCodexLabel();
  const cloudEnabled = useCloudChatFeature();
  const host = useSidecarHost();
  const ledgerHost = useAgentLedger()?.host ?? void 0;
  const { list, detail } = useWorkspaceDetail(ledgerHost?.workspace, input.planRevision);
  const plan = usePlanUsage(ledgerHost?.workspace ? ledgerHost : void 0, input.planRevision).plan;
  const github = useGitHubStatus(ledgerHost?.github);
  const theme = useFlowerTheme();
  const appearance = useAppearanceSettings();
  const mcp = useAsync(
    () => input.mcpAvailable ? host.agentMcp.getSettings() : Promise.resolve(null),
    [host, input.mcpAvailable],
    { cache: input.mcpAvailable ? { scope: host, key: "agentMcp.getSettings" } : void 0 }
  );
  const now = Date.now();
  const flower = flowerById(theme.flower);
  const open = (id) => () => input.changeSection(id);
  const workspaceDetail = list ? [
    list.active.name,
    roleLabel(list.active.role),
    detail && detail.workspace.kind === "org" ? plural(detail.members.length, "member") : "Just you",
    detail?.invitations.length ? `${plural(detail.invitations.length, "pending invitation")}` : null,
    list.invitations.length ? `${plural(list.invitations.length, "invitation")} for you` : null
  ].filter(Boolean).join(" · ") : ledgerHost?.workspace ? void 0 : "Needs a signed-in Blume account";
  const entries = [
    {
      id: "workspace",
      category: SETTINGS_PAGE_CATEGORY.workspace,
      title: "Workspace",
      description: "Members, invitations and organizations",
      icon: Users,
      iconColor: CONCEPT_META.global.accent,
      value: list?.active.name,
      detail: workspaceDetail,
      open: open("workspace")
    },
    {
      id: "plan",
      category: SETTINGS_PAGE_CATEGORY.plan,
      title: "Plan and usage",
      description: "Your plan, usage this month and Free, Pro and Team compared",
      icon: Gauge,
      iconColor: CONCEPT_META.tests.accent,
      value: list ? `${planLabel(workspacePlan(list.active))} plan` : void 0,
      detail: plan ? `${planLabel(plan.name)} plan · ${localRunsSummary(plan)} local test runs` : list ? `${planLabel(workspacePlan(list.active))} plan` : void 0,
      meter: plan && plan.localTestRuns.limit !== null ? {
        value: plan.localTestRuns.thisMonth,
        max: plan.localTestRuns.limit,
        label: "Local test runs this month"
      } : void 0,
      open: open("plan")
    },
    {
      id: "appearance",
      category: SETTINGS_PAGE_CATEGORY.appearance,
      title: "Appearance",
      description: "Color theme, interface size, motion and agent cards",
      icon: Sparkles,
      iconColor: CONCEPT_META.agent.accent,
      value: appearance.loading ? void 0 : appearance.petalEffectsEnabled ? "Motion on" : "Motion off",
      detail: appearance.loading ? void 0 : `${uiScaleLabel(appearance.uiScale)} interface size · motion ${appearance.petalEffectsEnabled ? "on" : "off"}`,
      open: open("appearance")
    },
    {
      id: "behavior",
      category: SETTINGS_PAGE_CATEGORY.behavior,
      title: "Behavior",
      description: "Project discovery and tracking",
      icon: SlidersHorizontal,
      iconColor: CONCEPT_META.command.accent,
      open: open("behavior")
    },
    {
      id: "projects",
      category: SETTINGS_PAGE_CATEGORY.projects,
      title: "Projects",
      description: "Where Blume reads conversations and agents use it",
      icon: FolderGit2,
      iconColor: CONCEPT_META.project.accent,
      open: open("projects")
    },
    {
      id: "theme",
      category: SETTINGS_PAGE_CATEGORY.theme,
      title: "Theme",
      description: "Your Blume flower and accent color",
      icon: Palette,
      iconColor: CONCEPT_META.plugin.accent,
      value: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: flower.icon, alt: "", draggable: false, className: "size-4 shrink-0 select-none object-contain" }),
        flower.name
      ] }),
      detail: `${flower.name} flower`,
      open: input.onOpenTheme ?? open("theme")
    },
    {
      id: "share",
      category: SETTINGS_PAGE_CATEGORY.share,
      title: "Share",
      description: "Invite rewards and flower unlocks",
      icon: Share2,
      iconColor: CONCEPT_META.feedback.accent,
      detail: theme.referralAvailable === true ? `${theme.completedReferrals ?? 0} completed · ${plural(theme.availableUnlocks, "unlock")} available` : void 0,
      open: input.onOpenShare ?? open("share")
    },
    input.mcpAvailable && {
      id: "mcp",
      category: SETTINGS_PAGE_CATEGORY.mcp,
      title: "MCP",
      description: `Connect ${codex} or Claude Code`,
      icon: Cable,
      iconColor: CONCEPT_META.mcp.accent,
      value: mcp.data ? mcp.data.enabled ? "On" : "Off" : void 0,
      detail: mcp.data ? mcp.data.enabled ? `On · ${mcp.data.permission === "contribute" ? "can contribute" : "read only"}` : "Off" : void 0,
      open: open("mcp")
    },
    cloudEnabled && {
      id: "agents",
      category: SETTINGS_PAGE_CATEGORY.agents,
      title: "Agents",
      description: "Codex and Claude cloud subscription sign-ins",
      icon: Sparkles,
      iconColor: CONCEPT_META.mcp.accent,
      open: open("agents")
    },
    {
      id: "github",
      category: SETTINGS_PAGE_CATEGORY.github,
      title: "GitHub",
      description: "Pull requests, checks and repositories",
      icon: GitPullRequest$1,
      iconColor: CONCEPT_META["pull-request"].accent,
      value: !ledgerHost?.github ? void 0 : github === void 0 ? void 0 : github.connected ? github.login ? `@${github.login}` : "Connected" : "Not connected",
      detail: !ledgerHost?.github ? "Available in the desktop app" : github === void 0 ? void 0 : github.connected ? [
        `Connected as ${github.login ? `@${github.login}` : "a GitHub user"}`,
        github.lastSyncAt ? `synced ${relativeTime(github.lastSyncAt, now)}` : null
      ].filter(Boolean).join(" · ") : "Not connected · pull request status comes only from agents",
      open: open("github")
    },
    {
      id: "menu-bar",
      category: SETTINGS_PAGE_CATEGORY["menu-bar"],
      title: "Menu Bar",
      description: "Status item, counters and usage",
      icon: PanelTop,
      iconColor: CONCEPT_META.usage.accent,
      open: input.onOpenMenuBar ?? open("menu-bar")
    },
    input.systemAvailable && {
      id: "system",
      category: SETTINGS_PAGE_CATEGORY.system,
      title: "System",
      description: "Startup",
      icon: Cog,
      iconColor: "var(--text-muted)",
      open: open("system")
    }
  ];
  return entries.filter((entry) => Boolean(entry));
}
function settingsPageHeaderInfo(entry, openPage) {
  if (!entry) return {};
  return {
    identity: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsIconTile, { icon: entry.icon, iconColor: entry.iconColor, size: "fill" }),
    openPage: openPage ? (page) => openPage(page) : void 0
  };
}
function SettingsView({
  topSlot,
  bottomSlot,
  onOpenMenuBar,
  onOpenTheme,
  onOpenShare,
  section,
  onSectionChange,
  cursorUsageAvailable = true,
  wrappedEnabled = false,
  mcpAvailable = false,
  agentViewAvailable = true,
  showFlowerUnlockStatus = true,
  embedded = false
} = {}) {
  const ledgerHost = useAgentLedger()?.host;
  const cloudEnabled = useCloudChatFeature();
  const appRoute = useOptionalAppRoute();
  const github = ledgerHost?.github;
  const host = useSidecarHost();
  const theme = useFlowerTheme();
  const appearance = useAppearanceSettings();
  const [planRevision, setPlanRevision] = reactExports.useState(0);
  const workspaces = useWorkspaceList(ledgerHost?.workspace, planRevision).list;
  const githubStatus = useGitHubStatus(github);
  const [internalSection, setInternalSection] = reactExports.useState("list");
  const requestedSection = section ?? internalSection;
  const appearanceTab = requestedSection === "agent-view" ? "agents" : requestedSection === "lists" ? "lists" : "general";
  const normalizedSection = requestedSection === "agent-view" || requestedSection === "lists" ? "appearance" : requestedSection;
  const canManageLaunchAtLogin = typeof host.settings.getLaunchAtLogin === "function" && typeof host.settings.setLaunchAtLogin === "function";
  const currentSection = normalizedSection === "mcp" && !mcpAvailable || normalizedSection === "system" && !canManageLaunchAtLogin ? "list" : normalizedSection;
  const changeSection = reactExports.useCallback(
    (next) => {
      if (onSectionChange) onSectionChange(next);
      else setInternalSection(next);
    },
    [onSectionChange]
  );
  const showSystemSettingsLink = canManageLaunchAtLogin;
  const subPageOpen = currentSection !== "list" && currentSection !== "mcp";
  const inPageChrome = useInPageChrome();
  useSubHeader(
    subPageOpen ? {
      title: currentSection === "agents" ? "Agents" : currentSection === "github" ? "GitHub" : currentSection === "workspace" ? "Workspace" : currentSection === "plan" ? "Plan and usage" : currentSection === "appearance" ? "Appearance" : currentSection === "menu-bar" ? "Menu Bar" : currentSection === "behavior" ? "Behavior" : currentSection === "projects" ? "Projects" : currentSection === "project-choices" ? "Project choices" : currentSection === "system" ? "System" : currentSection === "theme" ? "Theme" : "Share",
      // In the app's page chrome a section is a route: up goes to Settings through it.
      onBack: inPageChrome ? void 0 : () => changeSection(currentSection === "project-choices" ? "projects" : "list")
    } : null,
    subPageOpen ? `settings-${currentSection}` : null
  );
  const detour = appRoute?.route.settingsReturn;
  const detourPage = detour ? RAIL.find((section2) => detour.startsWith(section2.path)) : void 0;
  const githubBack = detour && appRoute ? {
    label: detourPage ? `Back to ${detourPage.label}` : "Back",
    onSelect: () => appRoute.open(detour)
  } : void 0;
  const renderPage = (selectedSection) => {
    if (selectedSection === "agents") return /* @__PURE__ */ jsxRuntimeExports.jsx(AgentSignInSettings, { host: ledgerHost ?? void 0 });
    if (selectedSection === "github")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GitHubSettings, { github, projects: ledgerHost?.projects, back: githubBack });
    if (selectedSection === "workspace")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(WorkspaceSettings, { workspace: ledgerHost?.workspace });
    if (selectedSection === "plan")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlanSettings,
        {
          workspace: ledgerHost?.workspace,
          ledger: ledgerHost ?? void 0,
          onPlanChange: () => setPlanRevision((value) => value + 1)
        }
      );
    if (selectedSection === "theme") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(
        FlowerThemeSettings,
        {
          onOpenShare: () => changeSection("share"),
          showUnlockStatus: showFlowerUnlockStatus
        }
      );
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Theme", children: content2 });
    }
    if (selectedSection === "appearance") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(AppearanceSettings, { initialTab: appearanceTab, agentViewAvailable });
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Appearance", children: content2 });
    }
    if (selectedSection === "share") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(FlowerShareSettings, {});
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Share", children: content2 });
    }
    if (selectedSection === "menu-bar") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBarSettings, { cursorUsageAvailable });
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Menu Bar", children: content2 });
    }
    if (selectedSection === "mcp") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(McpSettings, { onBack: () => changeSection("list") });
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "MCP", children: content2 });
    }
    if (selectedSection === "behavior") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(
        BehaviorSettings,
        {
          wrappedEnabled,
          onOpenProjects: () => changeSection("projects")
        }
      );
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Behavior", children: content2 });
    }
    if (selectedSection === "projects") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectSettings, { onOpenChoices: () => changeSection("project-choices") });
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Projects", children: content2 });
    }
    if (selectedSection === "project-choices") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectChoicesSettings, {});
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Project choices", children: content2 });
    }
    if (selectedSection === "system") {
      const content2 = /* @__PURE__ */ jsxRuntimeExports.jsx(SystemSettings, { composed: true });
      return embedded ? content2 : /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "System", children: content2 });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AppearanceSettings, { initialTab: appearanceTab, agentViewAvailable });
  };
  const entries = useSettingsEntries({
    planRevision,
    changeSection,
    onOpenTheme,
    onOpenShare,
    onOpenMenuBar,
    mcpAvailable,
    systemAvailable: showSystemSettingsLink
  });
  const renderSection = (selectedSection) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsPageHeaderProvider,
    {
      value: settingsPageHeaderInfo(
        // Project choices is a page of Projects and wears its tile.
        entries.find(
          (entry) => entry.id === (selectedSection === "project-choices" ? "projects" : selectedSection)
        ),
        changeSection
      ),
      children: renderPage(selectedSection)
    }
  );
  const currentFlower = flowerById(theme.flower);
  const { ref: layoutProbe, compact } = useCompactLayout();
  const isOpen = (section2) => !compact && (currentSection === "list" ? "appearance" : currentSection === "project-choices" ? "projects" : currentSection) === section2;
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overflow-x-hidden", children: [
    topSlot,
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Workspace", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Users,
          iconColor: CONCEPT_META.global.accent,
          title: "Workspace",
          description: "Members, invitations and organizations",
          value: workspaces?.active.name,
          selected: isOpen("workspace"),
          onPress: () => changeSection("workspace")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Gauge,
          iconColor: CONCEPT_META.tests.accent,
          title: "Plan and usage",
          value: workspaces ? `${planLabel(workspacePlan(workspaces.active))} plan` : void 0,
          selected: isOpen("plan"),
          onPress: () => changeSection("plan")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Personalization", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Sparkles,
          iconColor: CONCEPT_META.agent.accent,
          title: "Appearance",
          selected: isOpen("appearance"),
          value: appearance.loading ? void 0 : appearance.petalEffectsEnabled ? "Motion on" : "Motion off",
          onPress: () => changeSection("appearance")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: SlidersHorizontal,
          iconColor: CONCEPT_META.command.accent,
          title: "Behavior",
          selected: isOpen("behavior"),
          description: "Project discovery and tracking",
          onPress: () => changeSection("behavior")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: FolderGit2,
          iconColor: CONCEPT_META.project.accent,
          title: "Projects",
          selected: isOpen("projects"),
          description: "Where Blume reads conversations and agents use it",
          onPress: () => changeSection("projects")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Palette,
          iconColor: CONCEPT_META.plugin.accent,
          title: "Theme",
          selected: isOpen("theme"),
          value: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: currentFlower.icon,
                alt: "",
                draggable: false,
                className: "size-4 shrink-0 select-none object-contain"
              }
            ),
            currentFlower.name
          ] }),
          onPress: onOpenTheme ?? (() => changeSection("theme"))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Share2,
          iconColor: CONCEPT_META.feedback.accent,
          title: "Share",
          selected: isOpen("share"),
          description: theme.referralAvailable === true ? `${theme.completedReferrals ?? 0} completed · ${theme.availableUnlocks} unlock${theme.availableUnlocks === 1 ? "" : "s"} available` : "Invite rewards and flower unlocks",
          onPress: onOpenShare ?? (() => changeSection("share"))
        }
      )
    ] }) }),
    (mcpAvailable || cloudEnabled) && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Intelligence", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
      mcpAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(McpSettingsLink, { onClick: () => changeSection("mcp") }),
      cloudEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Sparkles,
          iconColor: CONCEPT_META.mcp.accent,
          title: "Agents",
          description: "Cloud subscription sign-ins",
          selected: isOpen("agents"),
          onPress: () => changeSection("agents")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "Integrations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingsNavRow,
      {
        icon: GitPullRequest$1,
        iconColor: CONCEPT_META["pull-request"].accent,
        title: "GitHub",
        description: github ? void 0 : "Available in the desktop app",
        value: githubStatus === void 0 ? void 0 : githubStatus.connected ? githubStatus.login ? `@${githubStatus.login}` : "Connected" : "Not connected",
        selected: isOpen("github"),
        onPress: () => changeSection("github")
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, { label: "App", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingsGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: PanelTop,
          iconColor: CONCEPT_META.usage.accent,
          title: "Menu Bar",
          description: "Status item, counters and usage",
          selected: isOpen("menu-bar"),
          onPress: onOpenMenuBar ?? (() => changeSection("menu-bar"))
        }
      ),
      showSystemSettingsLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingsNavRow,
        {
          icon: Cog,
          iconColor: "var(--text-muted)",
          title: "System",
          selected: isOpen("system"),
          onPress: () => changeSection("system")
        }
      ) : null
    ] }) }),
    bottomSlot
  ] });
  if (!embedded)
    return currentSection === "list" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureFrame, { title: "Settings", children: content }) : renderSection(currentSection);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref: layoutProbe, hidden: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColumnLayout,
      {
        primaryHeader: compact ? void 0 : "Settings",
        primary: compact ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4", children: content }) : content,
        contentKey: currentSection === "list" ? void 0 : currentSection,
        compactBackLabel: "Settings",
        compactBackInHeader: true,
        onCompactBack: () => changeSection("list"),
        content: (
          // The page column centres in the wide detail pane instead of hugging the menu.
          // Every page's header ends with a roomy property strip.
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsScreenPresentationProvider,
            {
              value: { align: "center", pageHeader: { under: "strip" } },
              children: renderSection(currentSection === "list" ? "appearance" : currentSection)
            }
          )
        )
      }
    )
  ] });
}
function McpSettingsLink({ onClick }) {
  const host = useSidecarHost();
  const codex = useCodexLabel();
  const settings = useAsync(() => host.agentMcp.getSettings(), [host], {
    cache: { scope: host, key: "agentMcp.getSettings" }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsNavRow,
    {
      icon: Cable,
      iconColor: CONCEPT_META.mcp.accent,
      title: "MCP",
      description: settings.data?.enabled ? void 0 : `Connect ${codex} or Claude Code`,
      value: settings.data?.enabled ? `On · ${settings.data.permission === "contribute" ? "can contribute" : "read only"}` : void 0,
      onPress: onClick
    }
  );
}
function SettingsRoute({ app }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsView,
    {
      embedded: true,
      wrappedEnabled: app.wrappedEnabled,
      section: app.settingsSection,
      onSectionChange: app.onSettingsSectionChange,
      cursorUsageAvailable: app.settingsCursorUsageAvailable,
      mcpAvailable: app.settingsMcpAvailable,
      agentViewAvailable: app.settingsAgentViewAvailable
    }
  );
}
export {
  SettingsRoute
};
//# sourceMappingURL=SettingsRoute-WHrnVpZG.js.map

//# debugId=a48c5201-72f3-5be7-ab58-db2456a779ad
