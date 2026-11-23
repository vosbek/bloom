# Context Engineering Audit V1

A project-scoped, agentic Improve task that periodically evaluates the user's
harness setup files against a versioned catalog of context-engineering checks,
and feeds its findings into the existing signal → cluster → promotion →
planning → suggestion pipeline.

The catalog is deliberately multi-source and harness-neutral in structure.
Anthropic's "The new rules of context engineering for Claude 5-generation
models" post is one inspiration among several — its advice skews toward Claude
models and harnesses, and Blume supports more than that. Checks also draw on
the repo's own planning guidance and scorer rubrics (which are already
harness-aware), Cursor-specific rule-scoping practice, and the AGENTS.md
cross-vendor standard. Every check declares which harnesses it applies to, and
the compiled catalog is filtered per project by the harnesses actually
observed there (§4.1, §6.2).

Status: implemented. Companion precedent: `SIGNAL_BASED_SUGGESTIONS_V1.md`.

## As-built notes

- **Landed:** check registry + harness-filtered catalog renderer
  (`features/improve/audit/auditChecks.ts`); `insight_project_audits` ledger
  (desktop migration 27 + shared schema + port + conformance tests);
  project-scope setup persistence (`audit/auditSetupPersistence.ts`, routed
  through `SetupStore.ingestScan` at audit time); `setup_audit` task type,
  report/context schemas, `setup-audit-v1` agent, tool policies, and the
  `suggest-flow-v3` agent set (dataSchemaRev 3 and the code default; pin
  `suggest-flow-v2` as the rollback switch); `list_setup_artifacts` /
  `read_setup_artifact`
  MCP tools + `record_signal` setup-evidence extensions; run orchestration
  (`audit/auditRun.ts`) executing through the controlled-agent use case in the
  improve utility worker (`run-setup-audit` protocol message); severity /
  corroboration promotion rule; audit ranking + 1-active budget in planning
  selection; the scheduler-lane policy module (`audit/auditScheduler.ts`);
  onboarding audit hookup (runs after the backlog scan); manual trigger
  end-to-end (`insights:runSetupAudit` IPC → preload → `ImproveHost
.runSetupAudit` → electron host); setup-artifact evidence rendering
  (artifactPath label) in the shared evidence view.
- **Landed after the first pass:** deterministic post-run clustering
  (`clusterAndPromoteAuditFindings` in `audit/auditRun.ts`) — the audit agent
  records signals only, so code (not the model) attaches each finding to its
  exact-key cluster, refreshes stats, and applies the audit promotion rule;
  promoted clusters wait in the promoted backlog for the next planning pass.
  Without this step, audit signals would strand unclustered (the conversation
  pipeline's clustering stage only sees its own extraction output).
- **Intentional representation choice:** `EvidenceRef` gained additive optional
  fields (`artifactPath`, `versionHash`, `lineStart`, `lineEnd`) instead of a
  discriminated-union variant — flat optional fields match the existing
  EvidenceRef style and are back-compatible by construction.
- **Landed after the first pass (2):** the dev-panel "Run setup audit"
  trigger (project picker in `ControlledAgentDevPanel`, hidden where the
  runtime lacks `runSetupAudit`), and a decision change: **an empty setup is
  a finding, not a skip** — projects with zero setup artifacts still audit,
  and `ce-missing-essentials` covers the missing-rules-file limit case (the
  agent verifies repo facts, then records the absence against the rules-file
  path the primary harness would read).
- **Landed after the architectural review (fix pass):** the rollout gate now
  holds — `runSetupAuditAgent` requires `auditEnabled()` (active set has a
  `setup_audit` member) as an in-run defense-in-depth check, and the
  onboarding hookup pre-checks the same condition (skipReason
  `audit-not-enabled`); primary-project resolution moved off Electron main
  into the worker via bounded row queries (`projectPath` optional on the
  protocol request); audit target/prior-findings policy moved to app-core
  (`audit/auditProjectContext.ts`); audit keys are project-scoped
  (`audit:<projectKey>:<checkId>:<artifactRelPath>`, legacy 2-part keys
  still parse and never suppress a known project); the §6.4 deterministic
  dedupe backstop exists (`audit/auditDedupe.ts`, suppressed re-records are
  excluded from clustering and counted in telemetry); the 1-active audit
  budget is wired into the production slot model
  (`countActiveAuditSuggestionsInNamespace` in `pipelineOrchestration.ts`);
  `run-setup-audit` is cancellable between phases (the controlled-agent run
  itself is not abortable mid-flight); the audit ledger is implemented in the
  memory adapter and its conformance case is a hard requirement; skip
  labeling gained `project-not-found`.
- **§6.5 promotion rule as-built (tightened vs the spec below):** high
  promotes alone; medium promotes on recurrence (≥2 audits) or ≥1
  conversation signal; LOW promotes only when the cluster's
  conversation-derived members ALONE reach ≥0.5 of a normal conversation
  threshold — one weak conversation signal is not corroboration. The spec's
  cross-cluster "no higher-severity audit cluster pending" gate is not
  implemented (not expressible per-cluster); the stronger low-severity
  corroboration bar replaces it.
- **Completed after the first pass:** `suggest-flow-v3` is the default active
  set with an explicit membership gate and v2 rollback; the setup-audit toggle
  and 1–30 day cadence are in shared settings; the desktop 60-second scheduler
  ticks the subordinate audit lane; manual, onboarding, and scheduled audits
  share the prioritized Improve queue and utility worker; the Web Lab runner
  and both required hosts expose the same app-core use case; the dev panel
  supports focused `checkIds`; setup evidence carries check title, goal,
  sources, path, and version; and the live runner eval plus content-free
  per-check lifecycle counters are implemented.
- **Landed after the completion pass (consistency review + main merge):**
  the ledger's `setupStateHash` producers are unified — the audit run, the
  desktop worker's scheduler facts, and the runner's `listAuditProjects` all
  hash through the shared `auditSetupStateHash` / `filterAuditRelevantArtifacts`
  (overlay filter) with observed harnesses derived one way
  (`observedHarnessesForAuditRows` + `deriveAuditObservedHarnesses`). Before
  this, the providers hashed the unfiltered gather, so any project whose
  observed harnesses did not read every user-global file compared unequal
  forever and 'setup-changed' fired on every cadence tick (parity regression
  tests in `improveAuditSetupPersistence.test.ts`). Separately, main's
  suggestion-details redesign moved evidence rendering out of ImproveView's
  inline block: the setup-audit evidence context (check chip + quoted file
  path/line/version hash) now lives in `SuggestionPreview`'s dedicated
  evidence page.
- **Per-project global overlay semantics:** each project audit includes only
  the current user's global setup artifacts that are relevant to harnesses
  observed for that project. Global content participates in that project's
  setup hash and finding identity, so a changed user-global file re-qualifies
  each affected project independently. Project files remain repository-owned
  and shared with collaborators; global files remain user-owned and shared
  across that user's projects. A global finding is therefore project-keyed,
  and planner guidance warns about cross-project blast radius and prefers a
  project-local fix unless evidence supports changing the user-global overlay.
- **Execution anchor:** audit semantics use setup files, the project path, and
  observed harnesses only. A conversation id remains an internal persistence
  anchor where legacy run/signal storage requires one; transcript content is
  not read to decide audit findings or select the audit execution harness.

---

## 1. Why (user value)

Today every suggestion is anchored to friction observed in _user messages_ of
recent conversations. That misses a whole class of value:

- Setups that quietly waste always-on context on every turn of every session
  (bloated rules files, redundant repetition, obsolete constraint-heavy
  prompting styles that Claude-5-generation models no longer need).
- Contradictions and stale facts across `CLAUDE.md` / `AGENTS.md` / skills /
  global scope that cause inconsistent agent behavior the user never connects
  back to their config.
- Setups that predate current best practice (tool-usage examples inline,
  emphasis inflation, fact-sheet "skills", no progressive disclosure) and would
  benefit from modernization even when the user hasn't complained.

The audit turns "here's what current context-engineering guidance says" into
concrete, applyable suggestions on the user's _actual files_, using the same
Apply/Undo/evidence UX users already know. Guardrail: the product philosophy
stays "pain over best practice" — audit findings are deliberately rate-limited
and rank _below_ conversation-derived suggestions (§7.4) so the feature reads
as "Blume noticed something real about my setup", never as a lint nag.

---

## 2. Feature in one paragraph

A new agentic `AgentTaskType` (`setup_audit`) runs in the existing
`improveAgentWorker` utility process on a per-project cadence (setup content
changed, or enough new sessions since last audit). The agent receives the
project's setup artifacts (persisted + hashed), a compiled **check catalog**
(§4), and read-only tools. For each check it either _declines_ (the default,
success) or records a signal with setup-artifact evidence. Signals flow through
the existing clustering/promotion/planning machinery, so the planner —
unchanged — authors the actual suggestion operations, and the existing
apply/undo, feedback, run-trace, and analytics surfaces all work for free.

```text
setup change / session count trigger (per project)
  → ImproveScheduler (new audit lane) → ImproveRunQueue → improveAgentWorker
  → controlled agent (setup-audit-v1): check catalog + setup artifacts + read-only tools
       → record_signal (normalized_key = audit:<project-key>:<check>:<artifact>) | decline
  → existing clustering → audit promotion rule → watch-planner-v3
  → suggestions table → ImproveView → Apply/Undo
```

---

## 3. Design principles (requirements traceability)

| Requirement                      | How the plan satisfies it                                                                                                                                                                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consistent with codebase         | No new package; extends `packages/app/core/src/features/improve/` (feature-placement default). Reuses controlled-agent runtime, MCP-tool pattern, `ImproveScheduler`/`ImproveRunQueue`, utility-process execution, agent-set namespacing, storage ports, SidecarHost parity.                                     |
| Adds user value                  | Suggestions target measurable waste (always-on tokens, contradictions) with before/after diffs; severity + corroboration gates keep precision high; "declining is a successful outcome" is in the prompt contract.                                                                                               |
| Checks easy to understand/define | One declarative registry (`auditChecks.ts`, §4): each check is a typed object stating _goal_, _look for_, _evidence required_, and _suggested fix shape_, with pass/fail examples. The registry compiles into the prompt and stamps check ids onto every signal, suggestion, feedback event, and eval assertion. |
| Testing/observability parity     | Audit runs are `insight_runs` rows with `insight_harness_calls` traces, controlled-agent spans, usage capture, RunDetail visibility, dev-panel trigger; per-check eval suite in `packages/insights-eval`; feedback events carry `check_id` (§9, §10).                                                            |

---

## 4. The check registry — the heart of the feature

### 4.1 Shape

New file: `packages/app/core/src/features/improve/audit/auditChecks.ts`.

```ts
export type AuditCheckSeverity = 'high' | 'medium' | 'low'

export interface AuditCheck {
  /** Stable id, never reused. Stamped on signals, suggestions, feedback, evals. */
  id: string                       // e.g. 'ce-redundant-repetition'
  title: string                    // short human label for UI + run detail
  /** What user outcome this check protects. One or two sentences, plain language. */
  goal: string
  /** What the agent should look for — concrete, observable conditions. */
  lookFor: string
  /** What must be quoted/referenced for a finding to count. */
  evidenceRequired: string
  /** The shape of the fix the planner should be steered toward. */
  suggestedFix: string
  /** Maps onto the existing SignalKind for clustering/planning compatibility. */
  signalKind: SignalKind           // 'preference' | 'domain' | 'workflow' | ...
  defaultSeverity: AuditCheckSeverity
  /**
   * Which harnesses the check is meaningful for — reuses the existing
   * HarnessApplicability shape from domainTypes. 'shared' for checks about
   * cross-harness artifacts (AGENTS.md, docs); a harness list for
   * harness-specific practice (e.g. Cursor rule scoping, Claude auto-memory).
   * The compiled catalog only includes checks matching harnesses observed in
   * the project, so users never see advice for tools they don't run.
   */
  harnessApplicability: HarnessApplicability
  /**
   * Where the rule comes from; shown in evidence UI and kept for provenance.
   * Multiple refs allowed — most checks are corroborated by more than one
   * source, and no check may rest on a single vendor blog post alone unless
   * it is scoped to that vendor's harness.
   */
  sourceRefs: string[]             // 'claude-blog/context-engineering-claude5#...' | 'planning-guidance#...' | 'scorer/agents-md#...' | 'cursor-docs#...'
  /** Few-shot anchors for the prompt AND seeds for the eval suite. */
  failExample: string
  passExample: string
  /** Checks the model must NOT conflate this with (precision guard). */
  notThis?: string
}

export const AUDIT_CHECKS: readonly AuditCheck[] = [ ... ]
export const AUDIT_CHECK_CATALOG_VERSION = 1
```

Rules for the registry (enforced by unit test, §9.1):

- ids unique, kebab-case, prefixed `ce-`; never renumbered or reused.
- Every check has both a fail and a pass example.
- `renderAuditCheckCatalog(observedHarnesses)` deterministically compiles the
  registry into the prompt block, filtered by `harnessApplicability` —
  snapshot-tested (per harness combination) so prompt drift is visible in
  review.
- Adding/removing/materially editing a check bumps `AUDIT_CHECK_CATALOG_VERSION`
  and requires a new stage-agent version (§6.2) — same discipline as prompt
  changes today.

This single file is the answer to "what are the checks looking for and why":
a reviewer, a PM, or the eval suite can read/target it without touching
pipeline code.

### 4.2 V1 catalog

Sources, in priority order: the repo's own planning guidance
(`defaultPlanningGuidance.ts`, `planningGuidance.ts`) and scorer rubrics
(AGENTS.md / CLAUDE.md / Cursor-rules scorers) — which are already
harness-aware and are what the planner will write, so the audit can never
contradict them; the Claude 5 context-engineering post (harness-scoped where
its advice is Claude-specific); and Cursor / AGENTS.md-standard practice for
non-Claude harnesses. "applies to" uses the `HarnessApplicability` field:
`all` = any observed harness, `shared` = cross-harness artifacts.

| id                            | goal                                                                                                              | looks for                                                                                                                                                                                          | suggested fix                                                                                                                         | severity | applies to            | sources                                                                    |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------- | -------------------------------------------------------------------------- |
| `ce-over-constraint`          | Stop paying tokens for micro-rules current-generation models don't need; over-constraint degrades judgment.       | Dense clusters of prescriptive prohibitions / step-by-step hand-holding for things models now do well ("never write multi-paragraph docstrings", exhaustive formatting edicts) in always-on rules. | Replace the cluster with one judgment-level line (e.g. "Match surrounding code style"); delete the rest.                              | medium   | all                   | claude-blog §1; scorer "token economy"                                     |
| `ce-redundant-repetition`     | Same instruction repeated across locations wastes tokens on every turn; models listen equally throughout context. | Semantically duplicate guidance across project rules, global rules, skills, and hooks (not just verbatim dupes).                                                                                   | Keep the instruction in the cheapest single location per the context-cost ladder; delete the copies.                                  | medium   | all                   | planning-guidance operations; claude-blog "obsolete practices"             |
| `ce-progressive-disclosure`   | Always-on context should hold invariants only; procedures/reference belong behind on-demand loading.              | Multi-step procedures, long reference sections, or >~200-line rules files; content that has "grown into a procedure".                                                                              | Extract to a skill (procedure) or `.blume/insights` doc (reference) + one-line pointer; shrink the rule.                              | high     | all                   | planning-guidance ladder; claude-blog §3                                   |
| `ce-derivable-content`        | Don't state what the agent discovers from the filesystem; it wastes tokens and rots.                              | File trees, directory tours, restated code structure, standard language conventions in rules files.                                                                                                | Delete; keep only non-derivable gotchas/intent.                                                                                       | medium   | all                   | scorer "documents the non-derivable"; claude-blog CLAUDE.md recs           |
| `ce-contradiction`            | Contradictory guidance makes agent behavior nondeterministic and erodes trust in the whole file.                  | Instructions that conflict between artifacts or with repo reality (rules say npm, lockfile is pnpm; two files give different test commands).                                                       | Resolve to the verified fact (lockfile/package.json wins); fix or delete the loser.                                                   | high     | all                   | planning-guidance ("a lockfile decides pnpm vs npm")                       |
| `ce-skill-quality`            | A skill only pays off if it triggers; fact-sheet or vague-description skills never fire or fire wrong.            | Skills with vague descriptions ("helps with X"), missing when-to-use, bodies that are fact sheets with no steps, or monoliths that should split into progressive-disclosure files.                 | Rewrite description (what + when, natural keywords); convert fact-sheets to docs; split monoliths.                                    | medium   | claude, codex, cursor | authoring spec in `defaultPlanningGuidance.ts`; claude-blog skills design  |
| `ce-obsolete-practices`       | Practices that helped older models now cost tokens or constrain exploration.                                      | Inline tool-usage examples, emphasis inflation (IMPORTANT/YOU MUST on everything), manual memory dumps of session history in rules files, "as of <date>" freshness markers.                        | Remove examples in favor of clear interfaces; strip emphasis to the few real invariants; move session context out of always-on rules. | low      | all                   | claude-blog "obsolete practices"; scorer "structure & scannability"        |
| `ce-missing-essentials`       | The one place always-on context is cheap: commands the agent cannot guess.                                        | Rules file lacks build/test/lint commands, or lacks a run-a-single-test command, in a repo where those exist.                                                                                      | Add the minimal command block (verified against package.json/scripts).                                                                | medium   | all                   | scorer "commands & workflows"                                              |
| `ce-cursor-rule-scoping`      | Cursor rules should activate precisely; always-on-by-default bloats every request.                                | Legacy unscoped `.cursorrules`; `.mdc` rules with `alwaysApply: true` that could be glob- or description-scoped; kitchen-sink rules covering unrelated concerns.                                   | Migrate `.cursorrules` to scoped `.mdc`; switch `alwaysApply` to `globs`/description scoping; split multi-concern rules.              | medium   | cursor                | cursor-rules scorer; cursor-docs                                           |
| `ce-shared-rules-portability` | AGENTS.md is a cross-vendor standard; tool-specific phrasing in it degrades every other harness reading it.       | Claude-/Cursor-specific instructions, tool names, or file references inside AGENTS.md where neutral phrasing would serve all agents; guidance marked shared without cross-harness evidence.        | Neutralize the phrasing, or move genuinely harness-specific guidance into that harness's own artifact.                                | medium   | shared                | agents-md scorer "tool-agnostic & portable"; planning-guidance scope rules |

Anything cut from this catalog during implementation, and all v2 check
candidates, are tracked in §14 — not silently dropped.

### 4.3 Catalog v2 additions (post-merge)

Catalog v2 (`AUDIT_CHECK_CATALOG_VERSION = 2`, agent `setup-audit-v2`) added
eight checks after the v1 merge and extended three v1 checks. Every new check
rests on sources published within the four months before 2026-07-27, from
model providers or named high-trust practitioners (provenance table below).

| id                           | goal                                                                                                                             | looks for                                                                                                                                                                                                                                                                  | suggested fix                                                                                                                   | severity | applies to            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------- |
| `ce-plugin-adoption`         | Projects verifiably using a tool with an official harness plugin/MCP server should be prodded toward the first-class setup.      | Repo dependencies or tool config for tools with a well-known official plugin or vendor MCP server, with no integration in the observed harness's config (`.claude/settings.json`/`.mcp.json`, `.codex/config.toml`, `.cursor/mcp.json` — all audited artifact candidates). | Install the official plugin / add the MCP server; findings anchor at the observed harness's integration config artifact.        | medium   | claude, codex, cursor |
| `ce-skill-scope`             | Setup content should live where it applies — and only once.                                                                       | Global skills encoding one project's specifics; repo skills that are personal; same-name skills shadowing each other across scopes; tracked `CLAUDE.local.md`.                                                                                                              | Move content to its scope, delete shadowed duplicates, gitignore personal files.                                                | medium   | claude, codex, cursor |
| `ce-unenforced-invariants`   | Must-always/must-never rules should be enforced by hooks, permission denies, or executable checks, not prose alone.               | Hookable directives (lint-after-edit, never-touch-path) with no matching hook/deny config; architectural boundary rules with no boundary-check tooling in the repo.                                                                                                         | Wire the rule into the enforcement layer; shrink the prose to a pointer.                                                        | medium   | claude, codex, cursor |
| `ce-dead-setup-content`      | Guidance that looks configured but silently never loads is worse than missing.                                                    | Directives in stripped HTML comments; backticked/broken `@imports`; plain `.md` in `.cursor/rules`; codex chains past the 32 KiB budget, zero-byte AGENTS.md, committed `AGENTS.override.md` masks.                                                                         | Move content where it loads; fix imports; convert to frontmattered `.mdc`; fit or raise the codex budget; merge override files. | high     | claude, codex, cursor |
| `ce-rules-file-parity`       | Each observed harness should get the shared guidance through its own entry point.                                                 | An observed harness whose native rules file is absent while another harness's file carries the guidance; parallel near-copy rules files.                                                                                                                                   | Bridge (`CLAUDE.md` containing `@AGENTS.md`), keeping one source of truth.                                                      | medium   | shared                |
| `ce-skill-listing-budget`    | Skill listings have hard budgets (claude ~1,536 chars/skill entry; codex ~8k chars total); oversize makes skills undiscoverable. | Descriptions far past ~1,500 chars; trigger keywords buried last; catalogs plausibly past the listing budget.                                                                                                                                                              | Shorten descriptions (use case first); prune/merge skills.                                                                      | medium   | claude, codex         |
| `ce-skill-invocation-safety` | Side-effect skills must not be model-invocable, and checked-in skills must not grant themselves broad tool access.                | Deploy/publish/send-type skills without `disable-model-invocation: true`; `allowed-tools` grants beyond the body's documented commands.                                                                                                                                    | Add the frontmatter lock; narrow the grant.                                                                                     | high     | claude, cursor        |
| `ce-undiscoverable-docs`     | Institutional docs only help agents if the setup says they exist and when to read them.                                           | Architecture docs/runbooks/ADRs referenced nowhere in setup files; unannotated doc-path piles.                                                                                                                                                                             | Add a short annotated index (path + when to read) to the rules file.                                                            | low      | all                   |

V1 checks extended in v2: `ce-progressive-disclosure` (monorepo fix path:
nested per-package rules files), `ce-obsolete-practices` (stale model pins),
and `.cursor/rules` is now an audited discovery source (both `.mdc` and dead
`.md` files), so `ce-cursor-rule-scoping` and `ce-dead-setup-content`
findings anchor robustly.

Provenance for the v2 additions (dates verified during the 2026-07-27
research pass; slugs are the `sourceRefs` used in the registry):

| slug | source | date |
| ---- | ------ | ---- |
| `claude-blog/steering-claude-code` | claude.com/blog "Steering Claude Code: when to use CLAUDE.md, skills, hooks, rules, subagents, and more" | 2026-06-18 |
| `claude-docs/memory` | code.claude.com/docs/en/memory — AGENTS.md import bridge, HTML-comment stripping, import rules, nested CLAUDE.md, CLAUDE.local.md | ≤2026-07 (feature markers 2.1.206–2.1.217) |
| `claude-docs/skills` | code.claude.com/docs/en/skills — listing budgets, `disable-model-invocation`, `allowed-tools`, where-skills-live precedence | ≤2026-07 (feature markers to 2.1.218) |
| `claude-docs/plugins` | code.claude.com docs — plugins/marketplace | ≤2026-07 |
| `codex-docs/agents-md` | developers.openai.com/codex/guides/agents-md — 32 KiB `project_doc_max_bytes`, override files, fallback filenames | ≥2026-06 (verified via openai/codex repo history) |
| `codex-docs/skills` | developers.openai.com/codex/skills — 8k-char / 2%-context skill listing | 2026 (changelog-corroborated) |
| `codex-docs/mcp` | Codex config docs — `[mcp_servers]` in config.toml | ≥2026-05 (repo commits) |
| `cursor-docs/rules` | cursor.com/docs/rules — plain `.md` ignored (added after 2026-04-12 per snapshot diff) | post-2026-04-12 |
| `cursor-docs/mcp`, `cursor-docs/skills` | cursor.com docs — MCP + Agent Skills | 2026 (changelog-corroborated) |
| `fowler-blog/harness-engineering` | martinfowler.com "Harness engineering for coding agent users" (Birgitta Böckeler) | 2026-04-02 |
| `fowler-blog/maintainability-sensors` | martinfowler.com "Maintainability sensors for coding agents" (Birgitta Böckeler) | 2026-05-27 |
| `every-blog/the-folder-is-the-agent` | every.to "The Folder Is the Agent" (Kieran Klaassen) | 2026-04-13 |
| `eugeneyan-blog/working-with-ai` | eugeneyan.com "How to Work and Compound with AI" | 2026-05-03 |
| `latent-space/aiewf-2026-trends` | latent.space "5 Trends That Defined AI Engineering at World's Fair 2026" | 2026-07-14 |

---

## 5. Prerequisite: persist project-scoped setup (Phase 0)

The audit needs stable artifact versions to (a) hash-trigger runs, (b) anchor
evidence, and (c) dedupe findings until content actually changes. Global setup
already flows through `SetupService.refreshHarnessSetup` →
`SetupStore.ingestScan` → `setup_artifacts`/`setup_versions`. Project scope is
currently scan-on-demand + counts only (`project_setup_summaries`).

Changes:

- `packages/app/core/src/features/setup/service.ts`: add
  `refreshProjectSetup(projectPath)` that routes the existing project scan
  through `SetupStore.ingestScan` with `scope: 'project'` and
  `created_by: 'scanner'`. Reuse `gatherImproveSetupContext`'s path allowlist
  (`improveSetupTargetCandidates` + discovery specs) so the audit sees exactly
  the artifact set the planner already sees.
- Trigger points (no new watcher; pull-based like today): before an audit run,
  and piggybacked on the existing lazy `setup:list` hydration. Hash comparison
  makes re-ingest cheap and idempotent.
- Storage: no schema change — `setup_versions` already stores content, hash,
  and delta history. Add `SetupStore` conformance-test coverage for
  project-scope ingest (`packages/storage/*` conformance suites).
- Runs in the existing `setupScanWorker` utility process (scan) +
  `improveAgentWorker` (read); nothing on Electron main.

---

## 6. Pipeline integration

### 6.1 Task type and contracts (`@blume/insights-control`)

- Add `'setup_audit'` to `AGENT_TASK_TYPES`.
- `DEFAULT_AGENT_CONTEXT_SCHEMAS['setup_audit']`: blocks
  `audit_check_catalog` (compiled from the registry **filtered by the
  harnesses observed in the project's conversations** — the same
  `observed_harness` data signals already carry — so a Cursor-less project
  never sees `ce-cursor-rule-scoping`, and Claude-scoped advice never fires on
  a Codex-only setup), `setup_artifacts` (full content, per-file cap reusing
  `IMPROVE_SETUP_CONTEXT_MAX_FILE_CHARS`), `project_metadata` (including
  observed harnesses), `recent_signal_themes` (so the agent can note
  corroboration), and `prior_audit_findings` (dedupe context).
- `DEFAULT_AGENT_REPORT_SCHEMAS['setup_audit']`: summary + per-check verdict
  (`declined | finding-recorded`) + decline reasons — this makes "the agent
  chose to do nothing" observable, not silent.

### 6.2 Stage agent (`stageAgents.ts`)

- `EXECUTION_BY_TASK['setup_audit'] = 'agentic'`; add to
  `CONTROLLED_AGENT_TASK_TYPES`.
- New version `setup-audit-v1` in `LOCAL_STAGE_AGENTS` with
  `SETUP_AUDIT_MAIN_PROMPT`. Prompt contract, in order:
  1. Role: skeptical setup auditor. **Declining a check is a successful
     outcome**; a finding requires quotable evidence meeting the check's
     `evidenceRequired`.
  2. The compiled check catalog (`{{block:audit_check_catalog}}`).
  3. Hard rules: never invent file content; verify factual claims with the
     read tools (lockfile, package.json) before recording `ce-contradiction`
     or `ce-missing-essentials`; at most one signal per (check, artifact);
     respect `prior_audit_findings` — do not re-record a finding whose
     artifact hash is unchanged since it was dismissed.
  4. Output: `record_signal` calls only; no drafting suggestions directly
     (the planner owns authoring — same division of labor as extraction).
- Tool policy (`PLANNER_TOOL_POLICIES` sibling `SETUP_AUDIT_TOOL_POLICIES`):
  allow `list_setup_artifacts`, `read_setup_artifact`, `list_files`,
  `search_files`, `read_file` (scoped to project root + harness dirs, same
  allowlist enforcement as apply targets), `search_signals`, `record_signal`.
  Deny conversation-content tools in v1 (keeps the audit content-cheap and its
  privacy surface to setup files) and all suggestion-draft tools.
- New agent set `suggest-flow-v3` = v2 members + `setup_audit:setup-audit-v1`.
  Per the existing gating rule, new signal-producing semantics ⇒ new set id +
  `dataSchemaRev` bump; rollout flips `insights.experiments.agentSetId`.

### 6.3 New MCP tools (`mcpTools.ts` + `controlledToolHandlers.ts`)

- `list_setup_artifacts { scope?, harness? }` → id, path, kind, scope, size,
  contentHash, currentVersionId (from `SetupStore`).
- `read_setup_artifact { artifactId, versionId? }` → content (capped) + hash.
- Extend `record_signal` input with optional `auditCheckId` and
  `setupEvidence: { artifactPath, versionHash, excerpt, lineStart?, lineEnd? }[]`.

### 6.4 Signals, evidence, dedupe (`domainTypes.ts`, storage)

- `EvidenceRef` gains a discriminated variant:
  `{ type: 'setup-artifact', path, versionHash, excerpt, lineRange? }`
  (existing variant becomes `type: 'user-turn'` with a back-compat default in
  `parseEvidence`). Stored in the existing `signals.evidence_json` /
  `setup_refs_json` — no new columns.
- `normalized_key = 'audit:<checkId>:<artifactRelPath>'` gives clustering
  exact-match dedupe for free; `tags_json` gets
  `['audit', 'check:<id>', 'catalog:v<AUDIT_CHECK_CATALOG_VERSION>']`.
  **As-built correction:** keys are project-scoped —
  `audit:<projectKey>:<checkId>:<artifactRelPath>` with a 16-hex hashed
  project key (see the as-built notes); this spec paragraph predates the
  cross-project-collision fix. Legacy 2-part keys still parse with a null
  project and never suppress a known project. (An intermediate, never-released
  dev format `audit:<checkId>:<projectPath>::<rel>` parses degraded via the
  legacy branch — harmless, dev databases only.)
- **Decision: audit signals live in the same cluster space as
  conversation-derived signals** (one `signal_clusters` table, one clustering
  pass). Corroboration in §6.5 is therefore literal cluster membership: the
  clustering agent may attach a conversation signal to an audit cluster (or
  vice versa) when they describe the same underlying pain.
- Dedupe/suppression rule (`audit/auditDedupe.ts`): a dismissed audit cluster
  suppresses re-emission of the same `(checkId, artifact)` until the artifact's
  content hash changes; an applied one suppresses it permanently unless undone.
  Implemented as `prior_audit_findings` context + a deterministic post-filter
  on recorded signals (belt and braces — never rely on the model alone).

### 6.5 Promotion (`promotion.ts`)

Existing thresholds are conversation-count-based and don't fit single-run audit
signals. Add an audit-specific rule in `evaluatePromotionSignals`:

- `high` severity finding → promote immediately.
- `medium` → promote when corroborated (cluster also contains a
  conversation-derived signal, or the same finding recurs across 2 audit runs
  on changed content) — this is the "pain over best practice" gate.
- `low` → promote only with corroboration, and only if no higher-severity
  audit cluster is pending.

### 6.6 Planning — unchanged planner, better inputs

`watch-planner-v3` already receives cluster + member signals + guidance targets
and already knows the context-cost ladder. Only additions:

- `planningSourceTurns.ts`: when evidence is `setup-artifact`, render the
  quoted excerpt + path + hash instead of transcript turns.
- Append a short audit section to `PLANNING_GUIDANCE` (the check's
  `suggestedFix` text rides along in the cluster payload) so the planner's fix
  matches the check's intent. The planner keeps its skeptic role — it can
  still decline a promoted audit cluster.

### 6.7 Scheduling (`scheduler.ts` + new `audit/auditScheduler.ts`)

- New ledger table (migration 27, `desktopMigrationSql.ts` +
  shared `SCHEMA`): `insight_project_audits (project_path, agent_version_id,
setup_state_hash, conversations_seen_count, last_run_id, last_run_at)`.
  `setup_state_hash` = hash of sorted (scope, path, contentHash) tuples for the
  project's files plus the current user's global artifacts relevant to that
  project's observed harnesses.
- Eligibility (`collectAuditEligible`, mirroring `collectIdle`): project has
  ≥1 processed conversation in the last 14 days; AND (`setup_state_hash`
  changed OR ≥ `AUDIT_MIN_NEW_CONVERSATIONS` (default 10) processed since last
  audit); AND cooldown ≥ `AUDIT_COOLDOWN_MS` (default 7 days); AND the same
  quota/session-window gates as conversation runs (`sessionGate.ts`).
- Drained through the existing `ImproveRunQueue` (audits share the ≤3/tick
  budget and always yield to conversation runs), executed inside
  `improveAgentWorker`. **No new worker, no Electron-main work, no fallback.**
- Config in `config.ts` under an `AUDIT` namespace next to `PROMOTION`/`RUN_CAPS`.

### 6.8 Suggestion budget

Audit-originated suggestions (identifiable via `check:` tag) are capped at
**1 visible active** at a time, inside the existing `maxActiveSuggestions = 3`
slot model — conversation-pain suggestions always keep priority. Enforced in
`planningSelection.ts` ranking.

### 6.9 Onboarding audit

**Decision: onboarding runs an audit.** Good suggestions fast is the point of
onboarding, and a setup audit needs no conversation history to be useful. After
`onboardingBootstrap.ts` completes its whole-history run, enqueue one
`setup_audit` for the user's primary project (the project with the most recent
conversations; fall back to the most conversation-dense project). Details:

- Runs through the same queue/worker path; the onboarding audit does not
  bypass promotion or the 1-active budget — it just doesn't wait for the
  scheduler's natural trigger.
- Seed the `insight_project_audits` ledger from this run so the periodic lane
  starts its cooldown clock correctly.
- One project only during onboarding; remaining projects are picked up by the
  normal scheduler lane over subsequent days (avoids an install-time burst of
  agentic runs and suggestion spam).

---

## 7. Runtime parity and host surface

- New required `SidecarHost.improve` method: `runSetupAudit(projectPath)` +
  audit rows appearing in existing `listRuns`/`getRunDetail` (they're normal
  `insight_runs`). Implement in **both** hosts:
  - Electron: `ipcController.ts` channel `insights:runSetupAudit` → facade →
    worker host (mirror of `runForConversation`).
  - Web Lab: `services/interactive-runner` — extend the improve analysis
    adapter to expose the same use case; app-core owns all audit logic so the
    runner path is composition only.
- Settings: `ImproveSettings.tsx` gains a "Setup audit" toggle + cadence,
  persisted via existing `get/setImproveSettings`.
- Evidence UI: `SuggestionEvidence`/`SuggestionPreview` render setup-artifact
  evidence as file-path + quoted excerpt (+ "why": check title, goal, and
  `sourceRefs`). This is the only UI change of substance; Apply/Undo/diff views
  work unchanged because operations are ordinary `SuggestionOperation`s.
- Shared UI stays platform-free; all file access remains behind
  ports/worker as today.

---

## 8. Privacy / analytics boundary

Per `docs/signal-analytics-architecture.md` (update in the same change):

- Setup file _content_ never leaves the app — evidence excerpts live only in
  local SQLite, same as transcript evidence today.
- The content-free aggregate contract gains per-`check_id` counts
  (found/promoted/suggested/applied/dismissed). Check ids are product-defined
  constants ⇒ content-free by construction. Extend `SignalTypeCounts` /
  `DailySignalMetric` in `@blume/user-analytics` + the
  `signalAnalyticsWorker` rollup.
- Control-plane `FeedbackEvent.metadata_json` gains `check_id` and
  `audit_catalog_version` for suggestion-level outcomes (no content).

---

## 9. Testing (parity with existing suggestion testing)

### 9.1 Deterministic unit tests (node test runner, per package)

- `auditChecks.test.ts`: unique/stable ids, both examples present, catalog
  render snapshot (prompt drift visible in diffs), severity/kind validity.
- `auditScheduler.test.ts`: eligibility matrix (hash change, session count,
  cooldown, quota gate), ledger updates, yield-to-conversation-runs ordering.
- `auditDedupe.test.ts`: suppression across dismissed/applied/hash-changed.
- `promotion.test.ts` additions: severity/corroboration matrix.
- `parseEvidence` back-compat: legacy evidence JSON (no `type`) still parses.
- Storage conformance: project-scope `ingestScan`, `insight_project_audits`
  CRUD in sqlite + memory adapters.
- Tool handler tests: `list/read_setup_artifacts` scoping + caps,
  `record_signal` with `setupEvidence`.
- `pnpm test:architecture` must stay green (worker placement, no shell logic).

### 9.2 Eval suite (`packages/insights-eval`) — the behavioral bar

Following `docs/insights-agent-local-eval-suite-authoring.md`, add a
`setup-audit` suite where **cases are keyed by check id**, so the catalog and
the eval stay 1:1:

- Per check: ≥1 positive fixture (a small synthetic project dir whose setup
  violates the check → assert a signal with that `check_id` and evidence
  pointing at the right artifact) and ≥1 **near-miss negative** (setup that
  superficially resembles the violation but is fine → assert decline). The
  check's `failExample`/`passExample` seed these fixtures.
- One "excellent setup" fixture asserting **zero findings** (declining is a
  successful outcome — this is the suite's most important case).
- End-to-end cases: audit signal → promotion → planner produces an operation
  of the expected artifact tier (e.g. `ce-progressive-disclosure` must yield a
  skill/doc extraction, not a rules rewrite) — reusing the existing
  suggestion-content eval assertions from
  `docs/insights-agent-eval-suggestion-content.md`.
- Regression rejects: catalog of "bad audit suggestions" (nitpicks on a
  200-token CLAUDE.md, restyling preferences, findings without quotes).

### 9.3 Runtime validation

- `pnpm dev:e2e` scripted pass: seed a fixture project + sessions in sandboxed
  state, trigger `insights:runSetupAudit` from the dev panel, verify run
  detail, suggestion card, apply → file diff on disk, undo → restore.
- Web Lab live-runner (per `web-lab-testing` skill): same flow through the
  runner adapter; fixture mode is not sufficient. Do not report parity until
  both surfaces agree.

## 10. Observability (parity with existing runs)

All of this falls out of reusing the run infrastructure, plus small additions:

- **Runs**: each audit is an `insight_runs` row (`task_type` recorded; stage
  values reuse `queued/…/planning/done`); visible in `ImproveProcessingView`
  and `RunDetailView` like any run.
- **Traces**: every LLM call logged to `insight_harness_calls`; controlled-agent
  spans/tool calls uploaded to the control plane exactly as `watch-planner-v3`
  does today; usage into `insight_runs.usage_json` via `usageCapture.ts`.
- **Per-check outcomes**: the report schema's per-check verdicts land in the
  run's `json_output`, so "which checks fired / declined and why" is inspectable
  per run; `check_id` on feedback events gives apply/dismiss rates per check —
  the signal we use to retire or retune noisy checks.
- **Dev panel**: `ControlledAgentDevPanel` gains "Run setup audit" (project
  picker + optional check-id filter) for tight prompt-iteration loops.
- **Gauges**: add audit counters to the existing Improve gauges rollup
  (runs, findings, decline rate) within the content-free contract.

---

## 11. Phases

| Phase | Scope                                                                                                                                                    | Depends on |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 0     | Project-scope setup persistence (§5) + `insight_project_audits` migration + conformance tests                                                            | —          |
| 1     | Check registry + prompt + `setup_audit` task type + MCP tools + tool policies + `setup-audit-v1` + `suggest-flow-v3` set (manual dev-panel trigger only) | 0          |
| 2     | Evidence variant + dedupe + promotion rule + planner source rendering + suggestion budget                                                                | 1          |
| 3     | Scheduler lane + onboarding audit (§6.9) + settings toggle + host/IPC + runner parity + evidence UI                                                      | 2          |
| 4     | Eval suite + analytics/feedback additions + docs updates (`signal-analytics-architecture.md`, this plan → as-built notes)                                | 1–3        |

Each phase lands green on `pnpm typecheck`, `pnpm test:packages`,
`pnpm test:architecture`.

## 12. Risks and mitigations

- **Best-practice spam / nagging** — the core product risk. Mitigations:
  severity+corroboration promotion gates, 1-active-suggestion cap, per-(check,
  artifact-hash) suppression after dismissal, "declining is success" prompt
  framing, per-check apply/dismiss telemetry to retire noisy checks.
- **False positives on intentional setups** (e.g. a deliberately strict rules
  file). Mitigations: `notThis` precision guards in checks, near-miss negative
  evals, planner keeps veto power, evidence must quote the actual text.
- **Advice churn** as model generations evolve, and **vendor skew** (advice
  from one vendor's blog applied to another's harness). Mitigations: versioned
  catalog with multi-`sourceRefs` provenance; single-vendor-sourced checks must
  be scoped to that vendor's harness; catalog edits force a stage-agent version
  bump so behavior changes are namespaced and comparable.
- **Fictional/verified facts**: `ce-contradiction`/`ce-missing-essentials`
  require tool-verified repo facts before recording — mirrors the planner's
  "verify every concrete fact" rule.
- **Cost**: one agentic run per project per ≥7 days, sharing the existing
  quota/session-window gates; setup-only context keeps prompts small.

## 13. Resolved decisions

1. **Onboarding runs an audit** — we want good suggestions in front of the
   user quickly. Design in §6.9.
2. **Global artifacts are project overlays** — relevant user-global artifacts
   are included in every affected project's analysis and setup hash. Findings
   remain project-keyed; planner guidance treats a global edit as a
   cross-project user-level change and prefers a project-local operation unless
   the evidence justifies the broader blast radius.
3. **Same cluster space** — audit and conversation signals share
   `signal_clusters`, so corroboration is literal cluster membership (§6.4).
4. **Multi-source, harness-aware catalog** — the Claude 5 blog is one input,
   not the spec; every check declares `harnessApplicability` and the compiled
   catalog is filtered by the project's observed harnesses (§4.1, §6.1).

## 14. V2 backlog and deferred work — tracked here

This section is the single tracking point for everything deliberately cut
from v1. **Rule: anything descoped during implementation must land here (or in
a linked issue) in the same PR that descopes it** — nothing is silently
dropped. Promote items out of this list into a
`CONTEXT_ENGINEERING_AUDIT_V2.md` plan when v2 is scoped.

Deferred features:

- **Behavioral corroboration miners** — deterministic SQL analyzers over
  `tool_calls` (repeated command rediscovery, session-start rituals, recurring
  failures) whose signals would strengthen §6.5 corroboration. Designed in the
  research notes preceding this plan; separate feature.

Deferred / candidate checks:

- **Tool-description quality** (MCP servers, custom tools) — blocked on
  parsing tool-description content; today's MCP inventory is metadata-only by
  design (privacy scrubbing in `artifactInventory.ts`).
- **Auto-memory adoption** (Claude-scoped) — suggest retiring manual memory
  dumps where the harness version supports auto-memory; blocked on
  harness-version awareness in the audit context.
- **Rich code-based references** — suggest upgrading markdown specs to
  code/test references; needs repo-content judgment beyond setup files and a
  careful precision eval.
- **Hook/permission gap analysis** — missing format-on-edit hooks, allowlist
  gaps; strongest with approval/denial behavioral data (parser boundary work).
- **Per-harness deep checks** for pi / omp / opencode / gemini once their
  setup conventions are cataloged in `@blume/setup-scanners`.

Deferred infrastructure:

- Config-file watcher (v1 is pull-based hash checking; revisit only if
  staleness proves to be a real problem).
- `setup:list` persistence piggyback (project setup is persisted at audit time;
  setup-browser hydration does not independently ingest a version snapshot).
- Audit-specific gauges beyond counters (e.g. always-on token-cost estimates
  per project — pairs with future token-usage parsing).

Completed from the first implementation pass's descoped list:

- The `SetupAuditScheduler` now ticks beside `ImproveScheduler` every 60
  seconds, yields to conversation work, applies the shared usage/session
  gates, and queues audit work through the same priority-aware worker path.
- Shared Improve settings now include the enabled-by-default setup-audit
  toggle and a bounded cadence.
- `ImproveHost.runSetupAudit` is required and implemented by Electron and Web
  Lab; the runner route executes the app-core audit and exposes the same run
  detail, evidence, settings, and suggestion lifecycle.
- `packages/insights-eval` now has a live runner setup-audit suite keyed by
  check id, including positive fixtures, focused near-miss negatives, a
  global-overlay case, and an excellent-setup zero-findings case. Its
  `afterAudit` hook supports promoted-cluster planning/artifact-tier assertions
  without changing production audit semantics.
- Content-free analytics now count found/promoted/suggested/applied/dismissed
  lifecycle events per product-defined `check_id`; suggestion feedback carries
  `check_id` and `audit_catalog_version`; the local and service contracts use
  schema version 2 with schema-1 ingestion compatibility.
- The dev-panel request supports an optional focused check-id list end to end.
