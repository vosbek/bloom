# Signal-Based Suggestions V1 — Implementation Plan

> Status: in progress. This file is the working plan for the feature. The
> product spec is reproduced at the bottom (verbatim) under **Appendix: Spec**.
> The sections above it describe **how we are actually building it** in this
> codebase and the decisions that shaped the first testable pass.

## Goal (for this pass)

Finish a slice that the user can **run with `pnpm dev` and inspect quickly**.
The whole pipeline is wired with **real local-harness calls** (Claude / Codex
CLI), and progress is observable so a multi-minute run isn't a black box.

### Decisions locked with the user
- **Real harness calls are fine even if slow.** No mocking of the CLI on the
  real path. (A `fixture` adapter still exists as a selectable, instant option
  for sanity-checking the UI without burning CLI time — it implements the same
  adapter contract.)
- **Trigger = a Dev "Run now" button** that lets the user **pick which
  conversation** to analyze (maps to the spec's `insights:runForConversation`).
  The automatic 10-minute-inactivity trigger is also wired but is not the
  primary way to test.
- **Show progress on the Dev page**: current stage, run status, and harness
  stdout/stderr snippets, updated live as the run advances.
- **Single-conversation promotion behind a dev flag** so one Run-now actually
  produces a visible suggestion. The spec forbids single-conversation promotion
  in normal V1 and explicitly allows it behind a dev/debug flag — this is that
  flag, default ON in dev.

## How it maps onto the existing app

- **DB**: SQLite behind `@blume/storage-port` / `@blume/storage-sqlite`.
  Historical desktop migrations are package-owned by `@blume/storage-sqlite`;
  Improve row DTOs and persistence live in the shared storage packages.
- **Conversation data**: read via `getTranscript(ref)` / `listEventsForConversation`
  (`src/main/conversations`). Transcript hash computed locally (not stored on
  the conversations row).
- **Harness spawn**: re-implements the reference worktree's untracked
  `runPrompt.ts` skeleton — `spawn('/bin/zsh', ['-lc', cmd])`, prompt written to
  a temp file and redirected to stdin, stdout/stderr to temp files,
  SIGTERM→SIGKILL timeout. Adds strict-JSON parsing + secret-scrubbed env, which
  the reference did not have. (See "Electron spawn EBADF" project memo — login
  shell + `stdio:'ignore'` + temp-file redirect is required in the packaged app.)
- **IPC**: `handleIpc('insights:…')` in `src/main/index.ts`; preload wrappers in
  `src/preload/index.ts`; `Api` contract in `src/preload/index.d.ts`; renderer
  calls `window.api.*`. Progress is pushed over a `insights:progress` channel
  (mirrors `conversations:changed` + `onConversationsChanged`).
- **UI**: new top-level **Suggestions** tab (`MainTab 'suggestions'`, route
  `/suggestions`) rendered by `SuggestionsView.tsx`, styled with the existing
  `Card` / `Button` primitives. Dev diagnostics live as a new page inside
  `DevView.tsx`.
- **Web Lab parity**: every new shared host capability is implemented through
  both Electron and Web Lab adapters so the same shared UI can test it.

## Legacy module layout sketch

```
src/main/insights/
  types.ts            # Signal, SuggestionOperation, Suggestion, adapter contract, progress events
  config.ts           # promotion thresholds + dev flags (constants)
  packet.ts           # build cleaned conversation packet + synthetic filtering + transcript hash
  setup context       # capped, read-only setup context (AGENTS.md/CLAUDE.md, rule files)
  prompts.ts          # the 3 prompt templates (extraction / clustering / planning)
  retrieval.ts        # recall-oriented candidate-cluster retrieval
  promotion.ts        # threshold evaluation
  apply.ts            # base-hash check + create/update/remove guidance files
  pipeline.ts         # orchestrator: runForConversation(...) + progress emitter
  queue.ts            # bounded (concurrency 1) run queue + dedupe by transcript hash + inactivity scan
  harness/
    adapter.ts        # InsightHarnessAdapter type + registry + JSON extraction helpers
    runProcess.ts     # zsh -lc spawn + temp-file redirect + timeout (ported skeleton)
    claude.ts         # claude --print … adapter
    codex.ts          # codex exec … adapter
    fixture.ts        # deterministic instant adapter (dev/testing)
    index.ts          # getAdapter(harnessId), listAvailableAdapters()
  index.ts            # public surface used by IPC layer

packages/storage/sqlite/src/desktopMigrations.ts
packages/storage/sqlite/src/desktopImprove.ts

src/renderer/src/SuggestionsView.tsx
src/renderer/src/components/insights/SuggestionCard.tsx
src/renderer/src/components/insights/InsightsDevPanel.tsx   # picker + run now + progress + diagnostics
```

This sketch predates the shared-product migration. Most product modules listed
above now live in `@blume/app-core` or shared domain packages; desktop main keeps
only native adapter composition.

## Pipeline stages (and the progress events they emit)

`runForConversation({ conversationId | ref, harnessId, dev })`:

1. `queued` → `building-packet`: build conversation packet (synthetic-filtered),
   setup context, metadata; compute `transcript_hash`. Dedupe: skip if a
   completed run exists for `conversation_id + transcript_hash` (unless forced).
2. `extracting`: harness call #1 (extraction prompt). Store every valid signal,
   including weak one-offs. Record an `insight_runs` row with stdout/stderr
   snippets and timing.
3. `retrieving`: local candidate-cluster retrieval (≤25) — exact key, shared
   command/path/code tokens, shared setup refs, lexical overlap; project/scope/
   harness as boosts.
4. `clustering`: harness call #2 (batch clustering). Assign each new signal once;
   create/extend clusters; record duplicate-cluster candidates.
5. `promoting`: recompute cluster stats; evaluate thresholds (dev flag allows
   single-conversation promotion).
6. `planning`: harness call #3 per newly-promoted cluster (capped; the cap is
   logged, never silent). Store suggestions with operations + patch previews +
   base hashes.
7. `done` (or `failed` with an error snippet).

Each transition is persisted on the run row **and** pushed to the renderer over
`insights:progress` so the Dev page updates live.

## Harness adapter contract (as built)

```ts
type InsightHarnessAdapter = {
  harnessId: string                       // 'claude' | 'codex' | 'fixture'
  label: string
  isAvailable(): Promise<boolean>
  runJsonAnalysis(input: {
    prompt: string
    schemaName: string                    // which stage (for fixture + logging)
    cwd: string
    timeoutMs: number
  }): Promise<{
    json: unknown
    stdoutSnippet: string
    stderrSnippet: string
    exitCode: number | null
    durationMs: number
  }>
}
```

CLI flags (from the reference runner):
- Claude one-shot: `claude --print --output-format text --model opus` (prompt
  on stdin; we parse strict JSON out of the text, tolerating ```json fences).
- Codex one-shot: `codex exec --color never --skip-git-repo-check
  --ignore-user-config --ignore-rules -m gpt-5-codex -`.
- Env is scrubbed (drop `*KEY*`, `*TOKEN*`, `*SECRET*`, `*PASSWORD*`,
  `*COOKIE*`, AWS creds, etc.) before spawn; output snippets are capped.

## IPC surface

```
insights:listSuggestions()                       -> Suggestion list (UI cards)
insights:listSignals({ conversationId? })        -> signals (diagnostics)
insights:listClusters({ status? })               -> clusters + promotion progress (diagnostics)
insights:listDuplicateClusters()                 -> duplicate-cluster candidates (diagnostics)
insights:listRuns({ limit? })                    -> recent runs (diagnostics)
insights:runForConversation({ ref, harnessId, dev }) -> run id (async; progress via channel)
insights:applySuggestion({ id })                 -> { status: 'applied' | 'needs_review' | ... }
insights:snoozeSuggestion({ id, until? })
insights:dismissSuggestion({ id })
insights:archiveSuggestion({ id })
insights:listHarnesses()                         -> [{ harnessId, label, available }]
insights:onProgress(cb)                          -> subscription (unsubscribe fn)
```

## Suggestions tab (what the user sees)
- Card per suggestion: title, summary, the files/artifacts it changes, planned
  operations + patch preview, artifact scope + harness applicability.
- **Apply / Snooze / Dismiss** buttons.
- **See evidence** from the preview page: users can inspect the raw captured
  excerpts that caused a suggestion, with conversation/project/date context.
- Empty state explains how to generate suggestions (Dev → Insights → Run now).

## Dev page (Insights)
- Conversation picker (recent conversations), harness picker (claude/codex/
  fixture, with availability), **Run now**.
- Live progress: stage, status, elapsed, last stdout/stderr snippet.
- Diagnostics: recent runs; clusters with progress-toward-promotion; signals for
  the selected conversation; duplicate-cluster candidates. Raw harness traces
  stay here.

## Test plan for this pass (manual, fast)
1. `pnpm dev`. Confirm the **Suggestions** tab appears and shows the empty state.
2. Open **Dev → Insights**. Pick a recent conversation. Pick the **fixture**
   harness first → **Run now**: progress should march through the stages in ~a
   second and a suggestion should appear in the Suggestions tab. This proves the
   whole pipeline + UI without waiting on a CLI.
3. Switch the harness to **claude** (or codex) → **Run now** on a real
   conversation: watch the live progress through extraction → clustering →
   planning (minutes), then a real suggestion lands.
4. On a suggestion, click **Apply** → confirm the target guidance file is
   written (or `needs_review` if the base hash no longer matches), **Snooze** →
   it hides, **Dismiss** → it hides and is suppressed.

Automated tests (`__test/regressions/insights.test.ts`, 15 cases) cover the
riskiest DB-free logic: untrusted-harness-JSON extraction (`extractJson`),
the extraction/planning validators (`parseExtraction`/`parsePlanning`), and the
all-or-nothing Apply with its base-hash safety (applies on match, `needs_review`
without overwrite on mismatch, create/remove). `db-migrations.test.ts` is
updated for schema v9. The DB-dependent fixtures from the spec's Test Plan
(synthetic filtering, retrieval overlap, promotion thresholds) are deferred:
those modules import the repository layer, and `better-sqlite3` is built for
Electron's ABI, so they need an Electron test runner or a thin DB seam — tracked
as a follow-up.

## Deviations from the spec (called out)
- `fixture` harness adapter added (not in spec) purely as a fast/deterministic
  dev path; the real Claude/Codex adapters are the spec's "initial
  implementations."
- `SuggestionOperation` carries an internal `newContent?` field (used by Apply
  to write the resulting file) in addition to the spec's human-facing
  `patchPreview`. Apply needs concrete bytes; the diff stays for display.
- Dev single-conversation promotion flag defaults ON in dev so a single Run-now
  yields a suggestion. Thresholds for "normal" promotion are unchanged config
  constants.
- Planning is capped to a small number of promoted clusters per run in dev; the
  cap is logged, not silent.

## Planner guidance (artifact-selection rubric)

Suggestions must not default to "rule" artifacts — rules (CLAUDE.md / AGENTS.md /
Cursor "Always") are loaded into an agent's context on **every turn**, so
overusing them is a standing context tax. The planner is steered by an editable
guidance doc that encodes a context-cost ladder and a per-signal-kind rubric:

- **Ladder (cheapest → most expensive):** hook (zero context, deterministic) ▸
  doc (read on demand) ▸ skill (name+description always on; body on trigger —
  "progressive disclosure") ▸ rule/memory (always on). Default bias is *down* the
  ladder; land on a rule only when the guidance is short and needed every turn.
- Mapping examples: `permission` → hook (enforced, not advisory); `workflow` →
  skill; `domain` → doc/skill reference; `command` → hook if it must run, else a
  short AGENTS.md line; `preference` → skill if situational, rule only if
  universal+short.
- Operation bias: prefer `update` over `create`; `remove` stale/conflicting
  guidance; keep rule edits tiny.

Mechanism (the "how we use it"):
- Default lives in the repo at `packages/app/core/src/features/improve/defaultPlanningGuidance.ts`.
  A per-machine override can be written to
  `<blumeRoot>/insights/planning-guidance.md` (`getPlanningGuidance()` prefers it).
- It is injected **only** into the planning prompt as a `<planning_guidance>`
  block (`buildPlanningPrompt`) — it is never installed into a project or loaded
  into any analyzed agent's runtime context. This is the key distinction: it's
  authoring-time guidance for the suggestion *generator*, not a runtime rule.
- Inspectable in **Dev → Insights → Planning guidance** (shows the active text +
  the override path), via `insights:getPlanningGuidance`.
- Grounded in current (2026) docs: Claude Code memory/skills/hooks loading
  semantics, Cursor rule types (Always/Auto-Attached/Agent-Requested/Manual), and
  the AGENTS.md standard (progressive disclosure; pair every "don't" with a "do").

---

## Appendix: Spec

(The full product spec as provided is the source of truth for behavior; this
plan implements it with the deviations noted above. See the original task
description for the complete prompt templates, data model, promotion rules,
public interfaces, queue behavior, and test plan.)
