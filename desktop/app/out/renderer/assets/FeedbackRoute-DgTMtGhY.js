
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="614d7b2e-7d80-564f-b52c-fa5351d4db88")}catch(e){}}();
import { fR as createLucideIcon, gP as jsxRuntimeExports, t as ArrowUp, bE as FullListItem, bm as FacetValue, cz as Minus, _ as Check, cg as LoaderCircle, bi as Eye, fE as cn, am as CompactItem, hx as reactExports, ce as ListControls, aV as DropdownMenuLabel, aX as DropdownMenuRadioGroup, aY as DropdownMenuRadioItem, aS as DropdownMenuCheckboxItem, aZ as DropdownMenuSeparator, aU as DropdownMenuItem, J as Button, d6 as Plus, cY as PaginationBoundary, jl as useRewardEffect, iR as useDraftForm, aR as DropdownMenu, b1 as DropdownMenuTrigger, a1 as ChevronDown, aT as DropdownMenuContent, eW as Trash2, c4 as InputGroup, c8 as InputGroupTextarea, c5 as InputGroupAddon, c6 as InputGroupButton, dI as Send, bC as FormError, cU as PageHeaderPage, al as ColumnLayout, cR as PageColumnCard, T as CardHeaderLabel, cS as PageContent, d7 as Plus$1, j6 as useOptionalSession, iN as useCompactLayout, jp as useSidecarHost, iT as useFlowerTheme, jr as useSubViewState, bc as ErrorState, ch as Loading, ge as flowerById, ee as SignInPage, cy as MessageCircle, a2 as ChevronRight, as as ConfigurableListIcon, eo as Sparkles, bh as ExternalLink, hI as requestSharePromotion } from "./index-nrW_ocxo.js";
import { E as ExplanationPageHeader } from "./ExplanationPageHeader-C2XeRG4B.js";
const __iconNode$2 = [
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2", key: "1ksdt3" }],
  ["path", { d: "M22 13a18.15 18.15 0 0 1-20 0", key: "12hx5q" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const BriefcaseBusiness = createLucideIcon("briefcase-business", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function FeedbackVoteButton({
  post,
  onVote,
  disabled = false,
  allowRepeatVote = false,
  showFocusRing = true,
  layout = "pill"
}) {
  const completedVote = post.viewerHasVoted && !allowRepeatVote;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "aria-label": `${allowRepeatVote ? "Add another vote for" : post.viewerHasVoted ? "Upvoted" : "Vote for"} ${post.title}`,
      "aria-pressed": post.viewerHasVoted,
      disabled: disabled || completedVote,
      onClick: onVote,
      className: (layout === "stacked" ? "group/vote inline-flex size-9 shrink-0 flex-col items-center justify-center gap-0 squircle-tile border text-[10px] leading-none font-semibold tabular-nums transition-colors focus-visible:outline-none " : "group/vote inline-flex h-5 min-w-6 shrink-0 items-center justify-center gap-0.5 rounded-full border px-1 text-[8.5px] font-semibold tabular-nums transition-colors focus-visible:outline-none ") + (showFocusRing ? "focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 " : "") + (completedVote ? "cursor-default border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]" : post.viewerHasVoted ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_16%,var(--bg-inner))] disabled:cursor-wait disabled:opacity-60" : "border-[var(--border-subtle)] bg-[var(--bg-inner)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-strong)] disabled:cursor-wait disabled:opacity-60"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArrowUp,
          {
            size: layout === "stacked" ? 11 : 8,
            strokeWidth: 2.4,
            className: completedVote ? void 0 : "transition-transform group-hover/vote:-translate-y-px",
            "aria-hidden": true
          }
        ),
        post.voteCount
      ]
    }
  );
}
const FEEDBACK_STATUSES = {
  considering: {
    label: "Considering",
    icon: Eye,
    color: "var(--badge-color-neutral)"
  },
  planned: {
    label: "Planned",
    icon: CalendarClock,
    color: "var(--badge-color-accent)"
  },
  in_progress: {
    label: "In progress",
    icon: LoaderCircle,
    color: "var(--badge-color-warning)"
  },
  shipped: {
    label: "Shipped",
    icon: Check,
    color: "var(--badge-color-success)"
  },
  declined: {
    label: "Not planned",
    icon: Minus,
    color: "var(--badge-color-danger)"
  }
};
function FeedbackStatusFacet({
  status,
  form = "glyph",
  size
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FacetValue,
    {
      recipe: FEEDBACK_STATUSES[status],
      form,
      size,
      name: `Status: ${FEEDBACK_STATUSES[status].label}`
    }
  );
}
const plural$1 = (count, one, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;
const shortDate$1 = (at) => new Date(at).toLocaleDateString(void 0, { month: "short", day: "numeric" });
function VoteTally({ post, arrow = true }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      role: "img",
      "aria-label": `${plural$1(post.voteCount, "vote")}${post.viewerHasVoted ? ", including yours" : ""}`,
      className: cn(
        "squircle-tile flex size-9 shrink-0 flex-col items-center justify-center border type-ui-meta font-semibold tabular-nums",
        post.viewerHasVoted ? "border-accent/35 bg-accent-soft text-accent" : "border-border-subtle bg-inner text-muted"
      ),
      children: [
        arrow && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { "aria-hidden": true, size: 11, strokeWidth: 2.4 }),
        post.voteCount
      ]
    }
  );
}
function Facts({ post }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 truncate", children: post.body }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: plural$1(post.commentCount, "comment") })
  ] });
}
function CommentMark({ comment }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": true,
      className: cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border type-ui-label font-bold",
        comment.isTeam ? "border-accent/35 bg-accent-soft text-accent" : "border-border-subtle bg-subtle text-muted"
      ),
      children: comment.authorName.trim().charAt(0).toUpperCase() || "?"
    }
  );
}
function FeedbackCommentItem({ comment }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "grid min-w-0 gap-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompactItem,
      {
        mark: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentMark, { comment }),
        trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: [comment.isTeam ? "Blume team" : void 0, shortDate$1(comment.createdAt)].filter(Boolean).join(" · ") }),
        strong: true,
        children: comment.authorName
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 pl-6 whitespace-pre-wrap type-ui-body text-body", children: comment.body })
  ] });
}
function FeedbackPostListItem({
  post,
  selected = false,
  onOpen,
  onVote,
  voting = false,
  allowRepeatVote = false,
  arrow = true
}) {
  const row = /* @__PURE__ */ jsxRuntimeExports.jsx(
    FullListItem,
    {
      variant: "two-line",
      media: onVote ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx(VoteTally, { post, arrow }),
      title: post.title,
      meta: /* @__PURE__ */ jsxRuntimeExports.jsx(Facts, { post }),
      topRight: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackStatusFacet, { status: post.status, form: "badge", size: "xs" }),
      selected,
      onSelect: onOpen,
      selectLabel: onOpen ? `Open “${post.title}”` : void 0
    }
  );
  if (!onVote) return row;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-0.5 pl-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackVoteButton,
      {
        post,
        onVote,
        disabled: voting,
        allowRepeatVote,
        layout: "stacked"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: row })
  ] });
}
const FEEDBACK_POST_STATUS_LABELS = {
  considering: "Considering",
  planned: "Planned",
  in_progress: "In progress",
  shipped: "Shipped",
  declined: "Not planned"
};
function FeedbackPostList({
  posts,
  loading = false,
  error = null,
  onRetry,
  onOpen,
  onVote,
  votingPostId = null,
  allowRepeatVote = false,
  header,
  emptyTitle = "No requests yet",
  emptyDescription,
  skeletonRows = 5
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "isolate rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inner)] shadow-[0_1px_0_rgba(36,28,12,0.04)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[11px]", children: [
    header ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-[var(--border-subtle)]", children: header }) : null,
    error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-36 flex-col items-center justify-center gap-2 px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] font-semibold text-[var(--text-body)]", children: "Couldn't load requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10.5px] text-[var(--text-muted)]", children: error }),
      onRetry ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-1.5 text-[10.5px] font-medium text-[var(--text-body)] hover:bg-[var(--bg-subtle)]",
          onClick: onRetry,
          children: "Retry"
        }
      ) : null
    ] }) : loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-[var(--border-subtle)]", "aria-label": "Loading requests", children: Array.from({ length: skeletonRows }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[58px] items-center gap-2.5 px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-10 shrink-0 animate-pulse rounded-lg bg-[var(--bg-subtle)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "block h-3 animate-pulse rounded bg-[var(--bg-subtle)]",
            style: { width: `${[76, 58, 82, 67, 73][index % 5]}%` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 block h-2.5 w-3/5 animate-pulse rounded bg-[var(--bg-subtle)]" })
      ] })
    ] }, index)) }) : posts.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "aria-label": "Feature requests", className: "m-0 grid list-none gap-0.5 p-1", children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackPostListItem,
      {
        post,
        onOpen: () => onOpen(post),
        onVote: onVote ? (event) => onVote(post, event) : void 0,
        voting: votingPostId === post.id,
        allowRepeatVote
      }
    ) }, post.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-36 flex-col items-center justify-center gap-1.5 px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] font-semibold text-[var(--text-body)]", children: emptyTitle }),
      emptyDescription ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10.5px] text-[var(--text-muted)]", children: emptyDescription }) : null
    ] })
  ] }) });
}
const ACTIVE_REQUEST_STATUSES = [
  "considering",
  "planned",
  "in_progress"
];
async function loadFeedbackRequests(board) {
  const posts = /* @__PURE__ */ new Map();
  let offset;
  do {
    const page = await board.listPosts({
      sort: "new",
      limit: 50,
      ...offset === void 0 ? {} : { offset }
    });
    for (const post of page.posts) posts.set(post.id, post);
    if (page.nextOffset === null) break;
    if (page.nextOffset <= (offset ?? 0))
      throw new Error("Could not load the remaining requests. Try again.");
    offset = page.nextOffset;
  } while (true);
  return [...posts.values()];
}
function visibleFeedbackRequests(posts, statuses, sort) {
  return posts.filter((post) => statuses.includes(post.status)).sort(
    (a, b) => (sort === "top" ? b.voteCount - a.voteCount || b.commentCount - a.commentCount : 0) || b.createdAt - a.createdAt || a.id.localeCompare(b.id)
  );
}
function useFeedbackRequestControls() {
  const [statuses, setStatuses] = reactExports.useState([...ACTIVE_REQUEST_STATUSES]);
  const [sort, setSort] = reactExports.useState("top");
  return { statuses, setStatuses, sort, setSort };
}
function FeedbackRequestControls({
  count,
  statuses,
  onStatusesChange,
  sort,
  onSortChange,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ListControls,
    {
      variant: "plain",
      label: "Requests",
      count,
      actions,
      filterLabel: "Filter feature requests",
      filterActive: statuses.length !== Object.keys(FEEDBACK_POST_STATUS_LABELS).length,
      filters: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Status" }),
        Object.entries(FEEDBACK_POST_STATUS_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DropdownMenuCheckboxItem,
          {
            checked: statuses.includes(value),
            onSelect: (event) => event.preventDefault(),
            onCheckedChange: (checked) => onStatusesChange(
              checked ? [...statuses, value] : statuses.filter((status) => status !== value)
            ),
            children: label
          },
          value
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onSelect: () => onStatusesChange([...ACTIVE_REQUEST_STATUSES]), children: "Reset filters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DropdownMenuItem,
          {
            onSelect: () => onStatusesChange(Object.keys(FEEDBACK_POST_STATUS_LABELS)),
            children: "Show all statuses"
          }
        )
      ] }),
      sortLabel: "Sort feature requests",
      sorting: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Sort requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuRadioGroup,
          {
            value: sort,
            onValueChange: (value) => onSortChange(value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "top", children: "Top" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value: "new", children: "Newest" })
            ]
          }
        )
      ] })
    }
  );
}
const TOP_POST_LIMIT = 5;
const FULL_PAGE_SIZE = 10;
function message(error) {
  return error instanceof Error ? error.message : "Something went wrong";
}
function shortDate(value) {
  return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric" }).format(value);
}
function FeedbackSectionHeader({
  label,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-0.5 w-5 rounded-[2px] bg-[var(--accent)]", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold tracking-[0.14em] text-[var(--text-strong)]", children: label }),
    count !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[11px] tabular-nums text-[var(--text-muted)]", children: count }) : null
  ] });
}
function useTopPosts(board) {
  const [posts, setPosts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [revision, setRevision] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let active = true;
    setLoading(true);
    board.listTop().then((items) => {
      if (!active) return;
      setPosts(items.slice(0, TOP_POST_LIMIT));
      setError(null);
    }).catch((caught) => {
      if (active) setError(message(caught));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [board, revision]);
  return {
    posts,
    loading,
    error,
    reload: () => setRevision((value) => value + 1),
    updatePost: (post) => setPosts((items) => items.map((item) => item.id === post.id ? post : item))
  };
}
function useImmutableUpvote(board, allowRepeatVote, onUpdated, onError) {
  const { triggerElementRewardFromEvent } = useRewardEffect();
  const [votingPostId, setVotingPostId] = reactExports.useState(null);
  const onVote = (post, event) => {
    if (!allowRepeatVote && post.viewerHasVoted || votingPostId === post.id) return;
    triggerElementRewardFromEvent(event, {
      petalCount: 1 + Math.floor(Math.random() * 2)
    });
    setVotingPostId(post.id);
    void board.addVote(post.id).then(onUpdated).catch((caught) => onError(message(caught))).finally(() => setVotingPostId(null));
  };
  return { votingPostId, onVote };
}
function FeedbackBoardPreview({
  board,
  access,
  onOpen,
  onRequireAuthentication
}) {
  const { posts, loading, error, reload, updatePost } = useTopPosts(board);
  const allowRepeatVote = access.level === "admin";
  const { votingPostId, onVote } = useImmutableUpvote(
    board,
    allowRepeatVote,
    updatePost,
    () => reload()
  );
  const open = (post) => {
    if (access.level === "guest") {
      onRequireAuthentication(post);
      return;
    }
    onOpen(post);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackSectionHeader, { label: "FEATURE REQUESTS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackPostList,
      {
        posts,
        loading,
        error,
        onRetry: reload,
        onOpen: (post) => open(post),
        onVote: access.level === "guest" ? (post) => onRequireAuthentication(post) : onVote,
        votingPostId,
        allowRepeatVote,
        skeletonRows: 3,
        emptyDescription: "Be the first to suggest something."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => open(),
        className: "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-2.5 text-[11px] font-semibold text-[var(--text-muted)] shadow-[0_1px_0_rgba(36,28,12,0.04)] transition-colors hover:bg-[var(--bg-card-soft)]/60 hover:text-[var(--text-body)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40",
        children: "See all requests"
      }
    )
  ] });
}
function FeedbackBoardView({
  requestControls,
  board,
  access,
  screen,
  onScreenChange
}) {
  const localControls = useFeedbackRequestControls();
  const { statuses, setStatuses, sort, setSort } = requestControls ?? localControls;
  const [posts, setPosts] = reactExports.useState([]);
  const [visibleLimit, setVisibleLimit] = reactExports.useState(FULL_PAGE_SIZE);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [revision, setRevision] = reactExports.useState(0);
  const { votingPostId, onVote: handleVote } = useImmutableUpvote(
    board,
    access.level === "admin",
    (updated) => {
      setPosts((items) => items.map((item) => item.id === updated.id ? updated : item));
      if (screen.kind === "post" && screen.post.id === updated.id) {
        onScreenChange({ kind: "post", post: updated });
      }
      setError(null);
    },
    setError
  );
  reactExports.useEffect(() => {
    if (screen.kind !== "list") return;
    let active = true;
    setLoading(true);
    loadFeedbackRequests(board).then((items) => {
      if (!active) return;
      setPosts(items);
      setError(null);
    }).catch((caught) => {
      if (active) setError(message(caught));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [board, revision, screen.kind]);
  const filteredPosts = visibleFeedbackRequests(posts, statuses, sort);
  const shownPosts = filteredPosts.slice(0, visibleLimit);
  if (screen.kind === "create") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreatePost,
      {
        board,
        access,
        onCancel: () => onScreenChange({ kind: "list" }),
        onCreated: (post) => {
          setPosts((items) => [post, ...items]);
          onScreenChange({ kind: "post", post });
        }
      }
    );
  }
  if (screen.kind === "post") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PostDetail,
      {
        board,
        access,
        post: screen.post,
        voting: votingPostId === screen.post.id,
        onVote: (event) => handleVote(screen.post, event),
        onUpdated: (post) => {
          setPosts((items) => items.map((item) => item.id === post.id ? post : item));
          onScreenChange({ kind: "post", post });
        },
        onDeleted: () => {
          setPosts((items) => items.filter((item) => item.id !== screen.post.id));
          onScreenChange({ kind: "list" });
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExplanationPageHeader,
      {
        title: "Feature requests",
        description: "Vote on what matters most, or suggest something new."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeedbackPostList,
        {
          posts: shownPosts,
          loading,
          error,
          onRetry: () => setRevision((value) => value + 1),
          onOpen: (post) => onScreenChange({ kind: "post", post }),
          onVote: handleVote,
          votingPostId,
          allowRepeatVote: access.level === "admin",
          emptyTitle: "No requests match these filters",
          emptyDescription: "Change the status filter to see more requests.",
          header: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeedbackRequestControls,
            {
              count: filteredPosts.length,
              statuses,
              onStatusesChange: (value) => {
                setStatuses(value);
                setVisibleLimit(FULL_PAGE_SIZE);
              },
              sort,
              onSortChange: (value) => {
                setSort(value);
                setVisibleLimit(FULL_PAGE_SIZE);
              },
              actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "xs",
                  onClick: () => onScreenChange({ kind: "create" }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": true }),
                    "New request"
                  ]
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaginationBoundary,
        {
          mode: "manual",
          direction: "down",
          hasMore: shownPosts.length < filteredPosts.length,
          onLoadMore: () => setVisibleLimit((value) => value + FULL_PAGE_SIZE),
          label: "Show more requests",
          detail: `${shownPosts.length} of ${filteredPosts.length} shown`,
          className: "mt-2"
        }
      )
    ] })
  ] });
}
function CreatePost({
  board,
  access,
  onCancel,
  onCreated
}) {
  const form = useDraftForm({
    key: "feedback-post:new",
    initial: { title: "", body: "", anonymous: false },
    validate: ({ title: title2, body: body2 }) => {
      const issues = {};
      if (title2.trim().length < 5) issues.title = "Give it a title of at least 5 characters.";
      if (body2.trim().length < 10) issues.body = "Describe it in at least 10 characters.";
      return issues;
    },
    submit: async ({ title: title2, body: body2, anonymous: anonymous2 }) => {
      try {
        return await board.createPost({ title: title2, body: body2, anonymous: anonymous2 });
      } catch (caught) {
        throw Error(message(caught));
      }
    },
    refused: "Blume couldn’t post your request. Try again.",
    onSaved: (post) => onCreated(post)
  });
  const { title, body, anonymous } = form.values;
  const saving = form.submitting;
  const posterName = access.displayName?.trim() || "you";
  const postIdentityLabel = anonymous ? "Anonymous" : `as ${posterName}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExplanationPageHeader,
      {
        title: "New feature request",
        description: "Describe the problem and the result you would like to see."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { ...form.formProps, className: "mt-4 flex max-w-[520px] flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[11px] font-semibold text-[var(--text-body)]", children: [
        "Title",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            "aria-required": true,
            "aria-invalid": form.errors.title ? true : void 0,
            "aria-describedby": form.errors.title ? "feature-request-title-error" : void 0,
            maxLength: 120,
            value: title,
            onChange: (event) => form.setField("title", event.target.value),
            className: "mt-1.5 h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 text-[12px] font-normal text-[var(--text-strong)] outline-none transition-shadow placeholder:text-[var(--text-muted)] focus:border-[var(--accent-soft-border)] focus:ring-2 focus:ring-[var(--accent-soft)]",
            placeholder: "A short, specific request"
          }
        ),
        form.errors.title ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            id: "feature-request-title-error",
            className: "mt-1 block text-[10.5px] font-normal text-[var(--danger)]",
            children: form.errors.title
          }
        ) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "feature-request-description",
            className: "text-[11px] font-semibold text-[var(--text-body)]",
            children: "Description"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "mt-1.5 h-auto min-h-28 flex-col items-stretch rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputGroupTextarea,
            {
              id: "feature-request-description",
              "aria-required": true,
              "aria-invalid": form.errors.body ? true : void 0,
              "aria-describedby": form.errors.body ? "feature-request-description-error" : void 0,
              maxLength: 4e3,
              value: body,
              onChange: (event) => form.setField("body", event.target.value),
              className: "min-h-24 resize-none px-3 py-2.5 text-[12px] font-normal leading-[1.5] text-[var(--text-strong)]",
              placeholder: "What problem would this solve?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputGroupAddon,
            {
              "data-align": "block-end",
              className: "h-8 w-full justify-start px-1.5 pb-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                InputGroupButton,
                {
                  type: "button",
                  "aria-pressed": anonymous,
                  onClick: () => form.setField("anonymous", !anonymous),
                  className: anonymous ? "bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent-soft)]" : "text-[var(--text-muted)]",
                  children: [
                    anonymous ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, "aria-hidden": true }) : null,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[140px] truncate", children: postIdentityLabel })
                  ]
                }
              )
            }
          )
        ] }),
        form.errors.body ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            id: "feature-request-description-error",
            className: "mt-1 text-[10.5px] text-[var(--danger)]",
            children: form.errors.body
          }
        ) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { children: form.error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              form.reset();
              onCancel();
            },
            className: "h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 text-[10.5px] font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-body)]",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: saving,
            className: "h-8 rounded-lg border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] px-3 text-[10.5px] font-semibold text-[var(--accent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_16%,var(--bg-inner))] disabled:cursor-not-allowed disabled:opacity-50",
            children: saving ? "Posting…" : "Submit request"
          }
        )
      ] })
    ] })
  ] });
}
function PostDetail({
  board,
  access,
  post,
  voting,
  onVote,
  onUpdated,
  onDeleted,
  pageHeader
}) {
  const [comments, setComments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [moderating, setModerating] = reactExports.useState(false);
  const [deletingCommentId, setDeletingCommentId] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const comment = useDraftForm({
    key: `feedback-comment:${post.id}`,
    initial: { content: "", anonymous: false },
    validate: ({ content: content2 }) => content2.trim().length >= 2 ? {} : { content: "Write at least 2 characters." },
    submit: async ({ content: content2, anonymous: anonymous2 }) => {
      try {
        return await board.createComment({ postId: post.id, body: content2.trim(), anonymous: anonymous2 });
      } catch (caught) {
        throw Error(message(caught));
      }
    },
    refused: "Blume couldn’t post your comment. Try again.",
    afterSave: (sent) => ({ ...sent, content: "" }),
    onSaved: (created) => setComments((items) => [...items, created])
  });
  const { content, anonymous } = comment.values;
  const saving = comment.submitting;
  const canComment = content.trim().length > 0 && !saving;
  const commenterName = access.displayName?.trim() || "you";
  const commentIdentityLabel = anonymous ? "Anonymous" : `as ${commenterName}`;
  reactExports.useEffect(() => {
    let active = true;
    board.listComments(post.id).then((items) => {
      if (active) setComments(items);
    }).catch((caught) => {
      if (active) setError(message(caught));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [board, post.id]);
  const updateStatus = async (status) => {
    if (status === post.status || moderating) return;
    setModerating(true);
    try {
      onUpdated(await board.updateStatus(post.id, status));
      setError(null);
    } catch (caught) {
      setError(message(caught));
    } finally {
      setModerating(false);
    }
  };
  const deletePost = async () => {
    if (moderating) return;
    setModerating(true);
    try {
      await board.deletePost(post.id);
      onDeleted();
    } catch (caught) {
      setError(message(caught));
      setModerating(false);
    }
  };
  const deleteComment = async (commentId) => {
    if (deletingCommentId) return;
    setDeletingCommentId(commentId);
    try {
      await board.deleteComment(commentId);
      setComments((items) => items.filter((comment2) => comment2.id !== commentId));
      setError(null);
    } catch (caught) {
      setError(message(caught));
    } finally {
      setDeletingCommentId(null);
    }
  };
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      pageHeader ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[18px] font-semibold leading-[1.22] tracking-[-0.02em] text-[var(--text-strong)] [font-family:var(--font-heading)] [overflow-wrap:anywhere]", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-[var(--text-muted)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Requested by ",
              post.authorName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: shortDate(post.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackStatusFacet, { status: post.status, form: "badge", size: "xs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FeedbackVoteButton,
          {
            post,
            onVote,
            disabled: voting,
            allowRepeatVote: access.level === "admin"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-[600px] whitespace-pre-wrap text-[12px] leading-[1.6] text-[var(--text-body)]", children: post.body }),
      access.level === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/40 p-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-auto text-[9px] font-bold tracking-[0.12em] text-[var(--text-muted)]", children: "ADMIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              disabled: moderating,
              className: "inline-flex h-7 items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-2.5 text-[10px] font-semibold text-[var(--text-body)] disabled:opacity-50",
              children: [
                FEEDBACK_POST_STATUS_LABELS[post.status],
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 10, "aria-hidden": true })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-[190px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Change status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DropdownMenuRadioGroup,
              {
                value: post.status,
                onValueChange: (value) => void updateStatus(value),
                children: Object.entries(FEEDBACK_POST_STATUS_LABELS).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuRadioItem, { value, children: label }, value))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: moderating,
            onClick: () => void deletePost(),
            className: "inline-flex h-7 items-center gap-1 rounded-lg border border-[color-mix(in_srgb,var(--danger)_28%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--danger)_7%,var(--bg-inner))] px-2.5 text-[10px] font-semibold text-[var(--danger)] disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11, "aria-hidden": true }),
              "Delete"
            ]
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackSectionHeader, { label: "COMMENTS", count: comments.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mt-2.5 overflow-hidden rounded-xl border border-[var(--border-subtle)] shadow-[0_1px_0_rgba(36,28,12,0.04)] " + (!loading && comments.length === 0 ? "bg-transparent" : "bg-[var(--bg-inner)]"),
          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 items-center justify-center text-[var(--text-muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin", "aria-label": "Loading comments" }) }) : comments.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-[var(--border-subtle)]", children: comments.map((comment2) => (
            // Each comment is the request's own comment item; an admin's delete sits beside it.
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 px-3 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackCommentItem, { comment: comment2 }) }),
              access.level === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled: deletingCommentId !== null,
                  onClick: () => void deleteComment(comment2.id),
                  "aria-label": `Delete comment by ${comment2.authorName}`,
                  className: "flex size-7 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--danger)_7%,var(--bg-inner))] hover:text-[var(--danger)] disabled:opacity-40",
                  children: deletingCommentId === comment2.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 12, className: "animate-spin", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12, "aria-hidden": true })
                }
              ) : null
            ] }, comment2.id)
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-4 text-center text-[10.5px] text-[var(--text-muted)]", children: "No comments yet" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { ...comment.formProps, className: "mt-4 border-t border-[var(--border-subtle)] pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "h-auto min-h-10 flex-col items-stretch rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputGroupTextarea,
            {
              "aria-required": true,
              "aria-invalid": comment.errors.content ? true : void 0,
              "aria-describedby": comment.errors.content ? `feedback-comment-error-${post.id}` : void 0,
              rows: 1,
              maxLength: 2e3,
              value: content,
              onChange: (event) => comment.setField("content", event.target.value),
              "aria-label": "Add a comment",
              placeholder: "Add a comment…",
              className: "min-h-10 resize-none py-[11px] text-[11.5px] text-[var(--text-body)]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            InputGroupAddon,
            {
              "data-align": "block-end",
              className: "h-8 w-full justify-between gap-0.5 px-1.5 pb-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  InputGroupButton,
                  {
                    type: "button",
                    "aria-pressed": anonymous,
                    onClick: () => comment.setField("anonymous", !anonymous),
                    className: anonymous ? "bg-[var(--accent-soft)] text-[var(--accent)] hover:bg-[var(--accent-soft)]" : "text-[var(--text-muted)]",
                    children: [
                      anonymous ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 10, "aria-hidden": true }) : null,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[140px] truncate", children: commentIdentityLabel })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputGroupButton,
                  {
                    type: "submit",
                    disabled: !canComment,
                    "aria-label": "Post comment",
                    className: "w-7 px-0 text-[var(--accent)] hover:bg-[var(--accent-soft)]",
                    children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 12, className: "animate-spin", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 12, "aria-hidden": true })
                  }
                )
              ]
            }
          )
        ] }),
        comment.errors.content ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            id: `feedback-comment-error-${post.id}`,
            className: "mt-1 text-[10.5px] text-[var(--danger)]",
            children: comment.errors.content
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormError, { className: "mt-2", children: comment.error })
      ] }),
      error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mt-2 text-[10.5px] text-[var(--danger)]", children: error }) : null
    ] })
  ] });
  if (!pageHeader)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4", children: body });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderPage, { ...pageHeader, bodyClassName: "min-w-0", children: body });
}
const plural = (count, one) => `${count} ${one}${count === 1 ? "" : "s"}`;
function FeedbackWorkspace({
  requestControls,
  board,
  access,
  screen,
  onScreenChange,
  side,
  intro
}) {
  const localControls = useFeedbackRequestControls();
  const { statuses, setStatuses, sort, setSort } = requestControls ?? localControls;
  const [posts, setPosts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [revision, setRevision] = reactExports.useState(0);
  const update = (post) => {
    setPosts((items) => items.map((item) => item.id === post.id ? post : item));
    if (screen.kind === "post" && screen.post.id === post.id) onScreenChange({ kind: "post", post });
  };
  const { votingPostId, onVote } = useImmutableUpvote(
    board,
    access.level === "admin",
    update,
    setError
  );
  reactExports.useEffect(() => {
    let active = true;
    setLoading(true);
    loadFeedbackRequests(board).then((posts2) => {
      if (!active) return;
      setPosts(posts2);
      setError(null);
    }).catch((caught) => {
      if (active)
        setError(caught instanceof Error ? caught.message : "Blume could not load the requests.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [board, revision]);
  const visiblePosts = visibleFeedbackRequests(posts, statuses, sort);
  const selectedId = screen.kind === "post" ? screen.post.id : null;
  const list = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackRequestControls,
      {
        count: visiblePosts.length,
        statuses,
        onStatusesChange: setStatuses,
        sort,
        onSortChange: setSort
      }
    ),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-2 type-ui-meta text-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: () => setRevision((value) => value + 1),
          children: "Retry"
        }
      )
    ] }) : loading && posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Loading requests…" }) : visiblePosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 px-2 py-3 type-ui-meta text-muted", children: "No requests match these filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "aria-label": "Feature requests", className: "m-0 grid list-none gap-0.5 p-0", children: visiblePosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackPostListItem,
      {
        post,
        selected: post.id === selectedId,
        onOpen: () => onScreenChange({ kind: "post", post }),
        onVote: (event) => onVote(post, event),
        voting: votingPostId === post.id,
        allowRepeatVote: access.level === "admin"
      }
    ) }, post.id)) })
  ] });
  const content = screen.kind === "post" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    PostDetail,
    {
      pageHeader: {
        headerProps: { under: "facts" },
        header: {
          view: "featureRequest",
          kind: "Feature request",
          kindConcept: "feedback",
          title: screen.post.title,
          status: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackStatusFacet, { status: screen.post.status, form: "badge", size: "sm" }),
          facts: [
            { id: "author", label: "Requested by", value: screen.post.authorName },
            {
              id: "date",
              label: "Requested",
              value: new Date(screen.post.createdAt).toLocaleDateString(void 0, {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            },
            {
              id: "comments",
              label: "Comments",
              value: plural(screen.post.commentCount, "comment")
            }
          ],
          // The upvote is the page's action, at the end of the top strip.
          actions: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FeedbackVoteButton,
            {
              post: screen.post,
              onVote: (event) => onVote(screen.post, event),
              disabled: votingPostId === screen.post.id,
              allowRepeatVote: access.level === "admin"
            }
          )
        }
      },
      board,
      access,
      post: screen.post,
      voting: votingPostId === screen.post.id,
      onVote: (event) => onVote(screen.post, event),
      onUpdated: update,
      onDeleted: () => {
        setPosts((items) => items.filter((item) => item.id !== screen.post.id));
        onScreenChange({ kind: "list" });
      }
    }
  ) : screen.kind === "create" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    CreatePost,
    {
      board,
      access,
      onCancel: () => onScreenChange({ kind: "list" }),
      onCreated: (post) => {
        setPosts((items) => [post, ...items]);
        onScreenChange({ kind: "post", post });
      }
    }
  ) : intro;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ColumnLayout,
    {
      primaryHeader: "Feature requests",
      primaryHeaderTrailing: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "xs",
          onClick: () => onScreenChange({ kind: "create" }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus$1, { "aria-hidden": true }),
            "New"
          ]
        }
      ),
      primary: list,
      contentKey: screen.kind === "post" ? screen.post.id : screen.kind,
      compactBackLabel: "Feature requests",
      columnCardChip: { label: side.label, concept: "feedback" },
      onCompactBack: () => onScreenChange({ kind: "list" }),
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { stack: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex w-full max-w-3xl flex-col gap-6", children: content }) }),
      columnCard: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageColumnCard,
        {
          fill: side.fill,
          header: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: side.label, concept: side.concept }),
          children: side.node
        }
      )
    }
  );
}
const GUEST_BOARD_ACCESS = { level: "guest" };
function useFeedbackBoardAccess(board) {
  const session = useOptionalSession();
  const status = session?.status;
  const userId = session?.session?.user.id;
  const [attempt, setAttempt] = reactExports.useState(0);
  const retry = reactExports.useCallback(() => setAttempt((value) => value + 1), []);
  const generation = reactExports.useRef(0);
  const [result, setResult] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!board || status === "signedOut" || status === "restoring") {
      setResult(null);
      return;
    }
    const retained = (previous) => userId && previous?.board === board && previous.userId === userId && previous.access && previous.access.level !== "guest" ? previous : null;
    const unavailable = () => setResult((previous) => retained(previous) ?? { board, userId, access: null, error: true });
    const load = () => {
      const current = ++generation.current;
      setResult(retained);
      void board.getAccess().then(
        (access) => {
          if (current !== generation.current) return;
          if (access.level === "guest" && status !== void 0) unavailable();
          else setResult({ board, userId, access, error: false });
        },
        () => {
          if (current === generation.current) unavailable();
        }
      );
    };
    const unsubscribe = board.onAccessChanged(load);
    window.addEventListener("online", load);
    load();
    return () => {
      generation.current++;
      unsubscribe();
      window.removeEventListener("online", load);
    };
  }, [board, status, userId, attempt]);
  if (!board || status === "signedOut") return { access: GUEST_BOARD_ACCESS, error: false, retry };
  if (status === "restoring" || result?.board !== board || result.userId !== userId)
    return { access: null, error: false, retry };
  return { access: result.access, error: result.error, retry };
}
const RATING_VALUES = [1, 2, 3, 4, 5];
const BOARD_LIST = { kind: "list" };
const FEEDBACK_PAGE = { sub: null, board: BOARD_LIST };
function feedbackToken({ sub, board }) {
  if (sub !== "board") return sub;
  if (board.kind === "post") return `board/post:${board.post.id}`;
  return board.kind === "create" ? "board/new" : "board";
}
function feedbackPlace(token, posts) {
  if (token === "chat" || token === "involve" || token === "careers")
    return { sub: token, board: BOARD_LIST };
  if (token === "board") return { sub: "board", board: BOARD_LIST };
  if (token === "board/new") return { sub: "board", board: { kind: "create" } };
  if (!token.startsWith("board/post:")) return null;
  const post = posts.get(token.slice("board/post:".length));
  return { sub: "board", board: post ? { kind: "post", post } : BOARD_LIST };
}
function feedbackTitle({ sub, board }) {
  if (sub === "board")
    return board.kind === "post" ? board.post.title : board.kind === "create" ? "New request" : "Feature requests";
  if (sub === "chat") return "Blume Feedback";
  if (sub === "involve") return "Get involved";
  if (sub === "careers") return "We’re hiring";
  return "Feedback";
}
function feedbackBar({ sub, board }) {
  if (sub === "board" && board.kind === "post") return { concept: "FEATURE REQUEST" };
  if (sub === "chat")
    return {
      titleLeading: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 15, strokeWidth: 2, "aria-hidden": true }),
      titleSubtitle: "Typically replies in a few minutes"
    };
  if (sub === "careers")
    return { titleLeading: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefcaseBusiness, { size: 15, strokeWidth: 2, "aria-hidden": true }) };
  return {};
}
function FeedbackView(props) {
  const { ref, compact } = useCompactLayout();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "contents", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackViewContent, { ...props, expanded: !compact }) });
}
function FeedbackViewContent({
  expanded,
  homeLayout = "stacked",
  featureRequestsEnabled = false,
  jobBoardEnabled = false,
  mode = "full",
  feedbackAvailable = false,
  feedbackUnreadCount = 0,
  initialSubView = null,
  surveySubmitted = false,
  thankYouIconSrc,
  onSurveySubmit = () => false,
  onContactOpen = () => {
  },
  onContactSubmit = async () => false,
  onAuthenticationRequired = () => {
  }
}) {
  const host = useSidecarHost();
  const { flower, grantFeedbackContactUnlock } = useFlowerTheme();
  const knownPosts = reactExports.useRef(/* @__PURE__ */ new Map());
  const chatFirst = mode === "chat-first";
  const requestControls = useFeedbackRequestControls();
  const [place, setPlace] = useSubViewState(
    { sub: chatFirst ? "chat" : initialSubView, board: BOARD_LIST },
    {
      token: (place2) => chatFirst && place2.sub === "chat" ? null : feedbackToken(place2),
      title: feedbackTitle,
      bar: feedbackBar,
      backBar: true,
      parent: (place2) => place2.sub === "board" && place2.board.kind !== "list" ? { sub: "board", board: BOARD_LIST } : chatFirst ? place2 : FEEDBACK_PAGE,
      resolve: (token) => {
        const place2 = feedbackPlace(token, knownPosts.current);
        const unavailable = place2?.sub === "board" && !featureRequestsEnabled || place2?.sub === "careers" && !jobBoardEnabled;
        return unavailable ? null : place2;
      }
    }
  );
  const subView = place.sub;
  const boardScreen = place.board;
  const setSubView = (sub) => setPlace({ sub, board: BOARD_LIST });
  const setBoardScreen = (board2) => {
    if (board2.kind === "post") knownPosts.current.set(board2.post.id, board2.post);
    setPlace({ sub: "board", board: board2 });
  };
  const board = featureRequestsEnabled ? host.feedback.board : null;
  const {
    access: boardAccess,
    error: boardAccessError,
    retry: retryBoardAccess
  } = useFeedbackBoardAccess(board);
  const resolvedBoardAccess = boardAccess ?? GUEST_BOARD_ACCESS;
  const [openings, setOpenings] = reactExports.useState([]);
  const [careersLoading, setCareersLoading] = reactExports.useState(jobBoardEnabled && mode === "full");
  const [careersError, setCareersError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!jobBoardEnabled || mode !== "full") {
      setOpenings([]);
      setCareersLoading(false);
      setCareersError(false);
      return;
    }
    let live = true;
    setCareersLoading(true);
    setCareersError(false);
    void host.careers.listOpenings().then(
      (next) => {
        if (!live) return;
        setOpenings(next);
        setCareersLoading(false);
      },
      () => {
        if (!live) return;
        setCareersError(true);
        setCareersLoading(false);
      }
    );
    return () => {
      live = false;
    };
  }, [host.careers, jobBoardEnabled, mode]);
  const activeSubView = !featureRequestsEnabled && subView === "board" || !jobBoardEnabled && subView === "careers" ? null : subView;
  const extras = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    jobBoardEnabled && openings.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(CareersCard, { count: openings.length, onOpen: () => setSubView("careers") }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InvolveCard,
      {
        onOpen: () => {
          onContactOpen();
          setSubView("involve");
        }
      }
    )
  ] });
  if (board && boardAccessError && (activeSubView === "board" || expanded && activeSubView === null)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorState,
      {
        message: "Feature requests could not be loaded. Please try again.",
        onRetry: retryBoardAccess
      }
    );
  }
  if (expanded && board && (activeSubView === null || activeSubView === "board")) {
    if (boardAccess === null) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, { label: "Checking access…" });
    if (boardAccess.level !== "guest")
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        FeedbackWorkspace,
        {
          requestControls,
          board,
          access: boardAccess,
          screen: activeSubView === "board" ? boardScreen : BOARD_LIST,
          onScreenChange: (screen) => screen.kind === "list" ? setPlace(FEEDBACK_PAGE) : setBoardScreen(screen),
          side: surveySubmitted ? {
            label: "Your feedback",
            concept: "feedback",
            node: /* @__PURE__ */ jsxRuntimeExports.jsx(ThankYouView, { iconSrc: thankYouIconSrc ?? flowerById(flower).icon })
          } : feedbackAvailable ? {
            label: "Your feedback",
            concept: "feedback",
            node: /* @__PURE__ */ jsxRuntimeExports.jsx(SurveyForm, { onSubmit: onSurveySubmit, inCard: true })
          } : {
            label: "Chat",
            concept: "message",
            fill: true,
            node: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackChatView, { feedback: host.feedback })
          },
          intro: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExplanationPageHeader,
              {
                title: "Shape what Blume builds next",
                description: "The requests are on the left, most voted first. Choose one to read, vote and comment, or add your own with New."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5", children: extras })
          ] })
        }
      );
  }
  if (activeSubView === "board" && board) {
    if (boardAccess === null) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, { label: "Checking access…" });
    if (boardAccess.level === "guest") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        SignInPage,
        {
          title: "Sign in to request features",
          description: "Your requests, votes, and comments stay connected to your Blume account."
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackBoardView,
      {
        requestControls,
        board,
        access: boardAccess,
        screen: boardScreen,
        onScreenChange: setBoardScreen
      }
    );
  }
  if (activeSubView === "chat") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackChatView, { feedback: host.feedback });
  }
  if (activeSubView === "involve") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      InvolveForm,
      {
        onSubmit: async (contact) => {
          const submitted = await onContactSubmit(contact);
          if (submitted) grantFeedbackContactUnlock();
          return submitted;
        }
      }
    );
  }
  if (activeSubView === "careers") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CareersView,
      {
        openings,
        loading: careersLoading,
        error: careersError,
        onOpen: (opening) => {
          host.system.captureEvent?.("career_opening_clicked", {
            jobId: opening.id,
            surface: "feedback"
          });
          void host.careers.openOpening(opening.applyUrl);
        }
      }
    );
  }
  const survey = (inCard) => surveySubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(ThankYouView, { iconSrc: thankYouIconSrc ?? flowerById(flower).icon }) : feedbackAvailable ? /* @__PURE__ */ jsxRuntimeExports.jsx(SurveyForm, { onSubmit: onSurveySubmit, inCard }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackSectionHeader, { label: "CHAT" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChatEntryPanel,
      {
        chatConfigured: host.feedback.chat !== null,
        unreadCount: feedbackUnreadCount,
        onOpen: () => setSubView("chat")
      }
    )
  ] });
  const requests = board ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    FeedbackBoardPreview,
    {
      board,
      access: resolvedBoardAccess,
      onRequireAuthentication: (post) => {
        setBoardScreen(post ? { kind: "post", post } : BOARD_LIST);
        onAuthenticationRequired();
      },
      onOpen: (post) => setBoardScreen(post ? { kind: "post", post } : BOARD_LIST)
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackHome, { layout: homeLayout, survey, requests, extras });
}
function FeedbackHome({
  layout,
  survey,
  requests,
  extras
}) {
  const { ref, compact } = useCompactLayout();
  const stacked = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-4 py-4", children: [
    survey(false),
    requests,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto flex flex-col gap-2.5", children: extras })
  ] });
  if (layout === "stacked" || compact) return stacked;
  const parts = {
    survey: { label: "Your feedback", node: survey(layout === "survey-column") },
    requests: { label: "Feature requests", node: requests },
    extras: { label: "Take part", node: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2.5", children: extras }) }
  };
  const regions = {
    "requests-sidebar": { left: "requests", content: ["survey", "extras"] },
    "requests-column": { content: ["survey", "extras"], right: "requests" },
    "survey-column": { content: ["requests", "extras"], right: "survey" },
    "survey-sidebar": { left: "survey", content: ["requests"], right: "extras" },
    "three-regions": { left: "requests", content: ["survey"], right: "extras" }
  };
  const { left, content, right } = regions[layout];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "flex min-h-0 min-w-0 flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ColumnLayout,
    {
      primary: left ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4", children: parts[left].node }) : null,
      compactBackLabel: left ? parts[left].label : "Feedback",
      columnCardChip: { label: right ? parts[right].label : "Details", concept: "feedback" },
      content: /* @__PURE__ */ jsxRuntimeExports.jsx(PageContent, { stack: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col gap-8", children: content.map((part) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: parts[part].node }, part)) }) }),
      columnCard: right ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        PageColumnCard,
        {
          header: /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeaderLabel, { title: parts[right].label, concept: "feedback" }),
          children: parts[right].node
        }
      ) : void 0
    }
  ) });
}
function CareersCard({ count, onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: "group flex w-full items-center gap-3 rounded-[8px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] px-4 py-3.5 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_18%,var(--bg-card))]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[var(--bg-card)] text-[var(--accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefcaseBusiness, { size: 18, strokeWidth: 2, "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[13px] font-bold text-[var(--text-strong)]", children: "We’re hiring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-0.5 block text-[11.5px] text-[var(--text-muted)]", children: [
            count,
            " open ",
            count === 1 ? "position" : "positions",
            " at Blume"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 17, "aria-hidden": true, className: "text-[var(--accent)]" })
      ]
    }
  );
}
function CareersView({
  openings,
  loading,
  error,
  onOpen
}) {
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, { label: "Loading positions…" });
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center px-6 text-center text-[12px] text-[var(--text-muted)]", children: "Open positions could not be loaded right now." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] leading-[1.5] text-[var(--text-muted)]", children: "Help us build a calmer way to work with coding agents." }),
    openings.map((opening) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onOpen(opening),
        className: "group rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-inner)] p-4 text-left transition-colors hover:border-[var(--accent-soft-border)] hover:bg-[var(--bg-card-soft)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-[var(--text-strong)]", children: opening.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14, className: "shrink-0 text-[var(--accent)]", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 block text-[11.5px] leading-[1.5] text-[var(--text-muted)]", children: opening.pitch }),
          opening.location || opening.department || opening.employmentType ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] font-medium text-[var(--text-muted)]", children: [
            opening.location ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11, "aria-hidden": true }),
              opening.location
            ] }) : null,
            opening.department ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opening.department }) : null,
            opening.employmentType ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opening.employmentType }) : null
          ] }) : null
        ]
      },
      opening.id
    ))
  ] });
}
function ThankYouView({ iconSrc }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[280px] flex-1 flex-col items-center justify-center gap-2 px-4 py-8", children: [
    iconSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: iconSrc,
        alt: "",
        draggable: false,
        className: "pointer-events-none size-[120px] select-none opacity-90"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-[72px] items-center justify-center rounded-[18px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 32, strokeWidth: 2.2, "aria-hidden": true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[22px] font-bold text-[var(--text-strong)]", children: "Thank you" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex w-full max-w-[180px] flex-col gap-1.5", "aria-label": "Redirecting", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[11px] font-semibold text-[var(--text-muted)]", children: "Redirecting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 overflow-hidden rounded-full bg-[var(--border-subtle)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feedback-redirect-progress h-full rounded-full bg-[var(--accent)]" }) })
    ] })
  ] });
}
function SurveyForm({
  onSubmit,
  inCard = false
}) {
  const [rating, setRating] = reactExports.useState(null);
  const [improvement, setImprovement] = reactExports.useState("");
  const trimmedImprovement = improvement.trim();
  const canSubmit = rating !== null;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    const submitted = await onSubmit({
      ...rating !== null ? { rating } : {},
      ...trimmedImprovement ? { improvement: trimmedImprovement } : {}
    });
    if (!submitted) return;
    if (rating !== null && rating >= 4) requestSharePromotion("positive-feedback");
    setRating(null);
    setImprovement("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "w-full", onSubmit: handleSubmit, children: [
    inCard ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 type-ui-meta text-muted", children: "Your feedback helps us decide what to improve next." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExplanationPageHeader,
      {
        title: "Tell us what you think",
        description: "Your feedback helps us decide what to improve next."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex w-full flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "m-0 flex min-w-0 flex-col gap-2 border-0 p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-[11px] font-semibold text-[var(--text-body)]", children: "How much do you like Blume so far?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full grid-cols-5 gap-1.5", children: RATING_VALUES.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": rating === value,
            onClick: () => setRating(value),
            className: "h-9 rounded-lg border text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-soft)] " + (rating === value ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]" : (
              // On a page column card, the card's own raised surface, so they read as buttons.
              inCard ? "border-[var(--border-card)] bg-[var(--bg-card-soft)] text-[var(--text-body)] hover:bg-[var(--bg-subtle)]" : "border-[var(--border-subtle)] bg-[var(--bg-inner)] text-[var(--text-body)] hover:bg-[var(--bg-subtle)]"
            )),
            children: value
          },
          value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10.5px] text-[var(--text-muted)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Not much" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Love it" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[11px] font-semibold text-[var(--text-body)]", children: [
        "What should we improve?",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: improvement,
            onChange: (event) => setImprovement(event.target.value),
            "aria-label": "What would you like to see improved or changed?",
            placeholder: "Share anything that would make Blume more useful for you.",
            className: "mt-1.5 min-h-28 w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-2.5 text-[12px] font-normal leading-[1.5] text-[var(--text-strong)] outline-none transition-shadow placeholder:text-[var(--text-muted)] focus:border-[var(--accent-soft-border)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: !canSubmit,
          className: "h-8 rounded-lg border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] px-3 text-[10.5px] font-semibold text-[var(--accent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_16%,var(--bg-inner))] disabled:cursor-not-allowed disabled:opacity-50",
          children: "Submit feedback"
        }
      ) })
    ] })
  ] });
}
function ChatEntryPanel({
  chatConfigured,
  unreadCount,
  onOpen
}) {
  const unreadLabel = chatUnreadBadgeLabel(unreadCount);
  if (!chatConfigured) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-disabled": "true",
        className: "flex min-h-[68px] w-full cursor-not-allowed items-center gap-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-3 text-left",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-11 shrink-0 items-center justify-center rounded-[6px] bg-[var(--border-subtle)] text-[var(--text-muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 20, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold text-[var(--text-muted)]", children: "Chat unavailable" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[11.5px] leading-[1.45] text-[var(--text-muted)] opacity-80", children: "Feedback chat is not configured for this build." })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: "group flex min-h-[68px] w-full items-center gap-3 rounded-[8px] border border-[var(--border-card)] bg-[var(--bg-card)] px-3 py-3 text-left transition-colors hover:bg-[var(--bg-inner)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListIcon, { concept: "feedback", icon: MessageCircle, scale: "prominent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[13px] font-semibold text-[var(--text-strong)]", children: "Chat with us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 block truncate text-[11.5px] leading-[1.45] text-[var(--text-muted)]", children: "Share feedback directly with the Blume team." })
        ] }),
        unreadLabel ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "shrink-0 whitespace-nowrap rounded-full bg-[var(--accent)] px-2 py-1 text-[10.5px] font-semibold leading-none text-white",
            "aria-label": `${unreadLabel} messages`,
            children: unreadLabel
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            size: 17,
            strokeWidth: 2.1,
            "aria-hidden": true,
            className: "shrink-0 text-[var(--text-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--text-body)]"
          }
        )
      ]
    }
  );
}
function FeedbackChatView({ feedback }) {
  const descriptor = feedback.chat;
  if (!descriptor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex max-w-[260px] flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18, strokeWidth: 2, "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold text-[var(--text-strong)]", children: "Chat unavailable" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] leading-[1.5] text-[var(--text-muted)]", children: "Feedback chat is not configured for this build." })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SharedFeedbackChat, { feedback, conversationKey: descriptor.conversationKey });
}
function SharedFeedbackChat({
  feedback,
  conversationKey
}) {
  const [authToken, setAuthToken] = reactExports.useState(
    () => readStoredChatwootConversationToken(conversationKey)
  );
  const [messages, setMessages] = reactExports.useState([]);
  const [draft, setDraft] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [sending, setSending] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let live = true;
    setLoading(true);
    void feedback.loadChat(authToken).then(
      (session) => {
        if (!live) return;
        setAuthToken(session.authToken);
        persistChatwootConversationToken(conversationKey, session.authToken);
        setMessages(session.messages);
        setLoading(false);
      },
      () => {
        if (!live) return;
        setError("Could not connect to feedback chat.");
        setLoading(false);
      }
    );
    return () => {
      live = false;
    };
  }, [feedback, conversationKey]);
  reactExports.useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, loading]);
  reactExports.useEffect(() => {
    if (!authToken) return;
    const interval = window.setInterval(() => {
      void feedback.loadChat(authToken).then(
        (session) => {
          setAuthToken(session.authToken);
          persistChatwootConversationToken(conversationKey, session.authToken);
          setMessages((current) => mergeFeedbackChatMessages(current, session.messages));
        },
        () => {
        }
      );
    }, 15e3);
    return () => window.clearInterval(interval);
  }, [authToken, feedback, conversationKey]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    setError(null);
    try {
      const result = await feedback.sendChat(authToken, content);
      setAuthToken(result.authToken);
      persistChatwootConversationToken(conversationKey, result.authToken);
      setMessages((current) => mergeFeedbackChatMessages(current, [result.message]));
      setDraft("");
    } catch {
      setError("Your message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex min-h-0 flex-1 flex-col",
      "aria-label": "Blume feedback conversation",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-4 py-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, { label: "Connecting…" }) : messages.length ? messages.map((message2) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackChatBubble, { message: message2 }, message2.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-10 items-center justify-center rounded-[8px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18, strokeWidth: 2, "aria-hidden": true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[250px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] font-semibold text-[var(--text-strong)]", children: "Start a conversation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11.5px] leading-[1.5] text-[var(--text-muted)]", children: "Share feedback, report an issue, or ask the Blume team a question." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "shrink-0 p-3 pt-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "h-auto items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputGroupTextarea,
                  {
                    value: draft,
                    onChange: (event) => setDraft(event.target.value),
                    onKeyDown: (event) => {
                      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                        event.preventDefault();
                        event.currentTarget.form?.requestSubmit();
                      }
                    },
                    rows: 1,
                    placeholder: "Write a message…",
                    "aria-label": "Feedback message",
                    className: "min-h-10 resize-none text-[13px]"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { className: "self-end pb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputGroupButton,
                  {
                    type: "submit",
                    variant: "soft",
                    disabled: !draft.trim() || sending,
                    "aria-label": "Send message",
                    children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 15, className: "animate-spin", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 15, strokeWidth: 2.2, "aria-hidden": true })
                  }
                ) })
              ] }),
              error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "mt-1.5 px-1 text-[10.5px] font-medium text-[var(--danger)]", children: error }) : null
            ]
          }
        )
      ]
    }
  );
}
function FeedbackChatBubble({ message: message2 }) {
  const isUser = message2.direction === "user";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex max-w-[84%] flex-col gap-1 ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`,
      children: [
        !isUser && message2.senderName ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1 text-[10px] font-medium text-[var(--text-muted)]", children: message2.senderName }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `rounded-[8px] border px-2.5 py-2 text-[13px] leading-[18px] shadow-[0_2px_8px_rgba(26,20,10,0.05)] ${isUser ? "border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]" : "border-[var(--border-subtle)] bg-[var(--bg-inner)] text-[var(--text-body)]"}`,
            children: message2.content
          }
        )
      ]
    }
  );
}
function mergeFeedbackChatMessages(current, incoming) {
  const byId = new Map(current.map((message2) => [message2.id, message2]));
  for (const message2 of incoming) byId.set(message2.id, message2);
  return [...byId.values()].sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
}
const CONVERSATION_TOKEN_STORAGE_PREFIX = "blume.chatwoot.conversationToken";
function chatUnreadBadgeLabel(unreadCount) {
  if (!Number.isFinite(unreadCount) || unreadCount <= 0) return null;
  const count = Math.floor(unreadCount);
  return `${count > 99 ? "99+" : count} unread`;
}
function chatwootConversationTokenStorageKey(websiteToken) {
  return `${CONVERSATION_TOKEN_STORAGE_PREFIX}.${websiteToken}`;
}
function readStoredChatwootConversationToken(websiteToken) {
  try {
    const token = window.localStorage.getItem(chatwootConversationTokenStorageKey(websiteToken))?.trim();
    return token || null;
  } catch {
    return null;
  }
}
function persistChatwootConversationToken(websiteToken, token) {
  if (!token) return;
  try {
    window.localStorage.setItem(chatwootConversationTokenStorageKey(websiteToken), token);
  } catch {
  }
}
function InvolveCard({ onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: "group flex w-full items-center gap-2.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-card-soft)]/40 px-3 py-2.5 text-left transition-colors hover:bg-[var(--bg-card-soft)]/75",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfigurableListIcon, { concept: "feedback", icon: Sparkles, scale: "large" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[12.5px] font-semibold text-[var(--text-strong)]", children: "Would you like to be more involved?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[11px] leading-[1.45] text-[var(--text-muted)]", children: "Help shape Blume. Leave your email and we will be in touch." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            size: 16,
            strokeWidth: 2,
            "aria-hidden": true,
            className: "shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5"
          }
        )
      ]
    }
  );
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function InvolveForm({
  onSubmit
}) {
  const [email, setEmail] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedNote = note.trim();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy) return;
    if (!EMAIL_RE.test(normalizedEmail)) {
      setError("Enter a valid email.");
      return;
    }
    setBusy(true);
    setError(null);
    const ok = await onSubmit({
      email: normalizedEmail,
      ...trimmedNote ? { note: trimmedNote } : {}
    });
    setBusy(false);
    if (!ok) {
      setError("Could not send. Try again later.");
      return;
    }
    setSubmitted(true);
    setEmail("");
    setNote("");
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex max-w-[260px] flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-[8px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] text-[var(--accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18, strokeWidth: 2.2, "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-semibold text-[var(--text-strong)]", children: "Thank you" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] leading-[1.5] text-[var(--text-muted)]", children: "We will be in touch." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-4 py-4",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "feedback-contact-email",
              className: "text-[11px] font-semibold text-[var(--text-strong)]",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "feedback-contact-email",
              type: "email",
              value: email,
              onChange: (event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              },
              placeholder: "you@example.com",
              className: "h-9 rounded-[7px] border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 text-[13px] text-[var(--text-strong)] outline-none placeholder:text-[var(--text-muted)] focus:ring-1 focus:ring-[var(--accent)]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "feedback-contact-note",
              className: "text-[11px] font-semibold text-[var(--text-strong)]",
              children: "Note"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "feedback-contact-note",
              value: note,
              onChange: (event) => setNote(event.target.value),
              placeholder: "What would you like to help with?",
              className: "min-h-[96px] resize-none rounded-[7px] border border-[var(--border-subtle)] bg-[var(--bg-inner)] px-3 py-2 text-[13px] leading-[1.45] text-[var(--text-strong)] outline-none placeholder:text-[var(--text-muted)] focus:ring-1 focus:ring-[var(--accent)]"
            }
          )
        ] }),
        error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "text-[11px] leading-relaxed text-red-600", children: error }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: busy,
            className: "mt-auto h-9 rounded-[7px] border border-[var(--accent-soft-border)] bg-[var(--accent-soft)] px-3 text-[12px] font-semibold text-[var(--accent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_20%,var(--tint-base))] disabled:cursor-not-allowed disabled:opacity-50",
            children: busy ? "Sending..." : "Send"
          }
        )
      ]
    }
  );
}
function FeedbackRoute({ app }) {
  const { accountsAndFeatureRequestsEnabled, jobBoardEnabled } = app;
  if (!app.feedbackReady) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, { label: "Loading feedback…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FeedbackView,
    {
      homeLayout: "survey-column",
      featureRequestsEnabled: accountsAndFeatureRequestsEnabled,
      jobBoardEnabled,
      feedbackAvailable: app.feedbackAvailable,
      feedbackUnreadCount: app.feedbackUnreadCount,
      surveySubmitted: app.feedbackSurveySubmitted,
      onSurveySubmit: app.onFeedbackSurveySubmit,
      onContactOpen: app.onFeedbackContactOpen,
      onContactSubmit: app.onFeedbackContactSubmit
    }
  );
}
export {
  FeedbackRoute
};
//# sourceMappingURL=FeedbackRoute-DgTMtGhY.js.map

//# debugId=614d7b2e-7d80-564f-b52c-fa5351d4db88
