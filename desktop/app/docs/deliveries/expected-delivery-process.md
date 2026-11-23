# Expected delivery process

**Status: draft for user review.** This describes intended behavior, not a claim
that it is implemented. Do not use it as the agent's acceptance checklist until
the user explicitly approves it.

## One connected workflow

Scope: Deliveries in the Blume desktop app (`apps/desktop`; the former standalone
`apps/control-plane` shell is retired) and its plugin, MCP and test framework.

The user describes an outcome. Their agent uses the Blume plugin and MCP to
organize and perform the work. The Electron app shows progress, remaining work,
tests, evidence, and decisions. These surfaces must agree about the same data.

## Setup and conversation entry

- **Minimal setup.** Aim for one copyable prompt to the user's agent or one
  terminal command that installs and connects the plugin. Guide the user through
  any necessary sign-in or consent, then verify the connection. Show the actual
  installed/reported version and capabilities. Avoid manual configuration where
  the agent can do it reliably.
- **Decide whether to use Blume in every new conversation.** Support a preference
  to ask, default to using Blume, or follow rules such as repository scope. Explicit
  user instructions take precedence. Verify GitHub integration and add missing
  support for repository association and the delivery/PR workflow.
- **Make the process discoverable.** The agent must receive the relevant Blume
  instructions at conversation entry. Prefer native harness/plugin mechanisms;
  use hooks if needed for reliable context injection. Verify each supported
  harness rather than assuming installation makes instructions visible.
- **Choose the delivery.** Honor an explicit delivery or new-delivery instruction
  in the initial prompt. Otherwise inspect the repository, branch/PR, and existing
  deliveries. Join a clearly matching delivery; when ambiguous, suggest a match
  or ask whether to join or create. Avoid duplicates and silently joining unrelated
  work. Then start or join through MCP and load its current state before working.

## Phase lifecycle

Use Start, Learn, Plan, Build, Test, Review, Ready, Merge, Deploy, and Live.
Repeated visits and returns to earlier phases retain their history.

The phase says where the work really is ([phases follow reality](../../../../docs/plans/phases-follow-reality.md)).
The lifecycle below is the expected path, not a set of gates: an agent's checkpoint
moves the delivery to the phase it names, and a person can choose any phase from
the phase badge in the delivery's header, forward or back. When a move skips a
step the process expects (approval, evidence, remaining work, a failed deploy),
Blume records it on the new visit and shows it; nothing moves a phase back on its
own.

| Phase | Expected behavior |
| --- | --- |
| **Start** | Establish the outcome and delivery association briefly. Move quickly to Learn if research is needed, otherwise directly to Plan. |
| **Learn** | Resolve relevant unknowns and record findings that inform the work. Then enter Plan. |
| **Plan** | Populate the hierarchical task list and acceptance criteria. Define delivery tests where practical; those tests make the acceptance criteria verifiable. |
| **Build** | Implement the work, using Blume tools to keep tasks and statuses current. Add newly discovered work immediately. Alternate with Test as often as useful. |
| **Test** | Run real ad-hoc tests frequently, inspect results, and return to Build for fixes. Preserve attempts and associate evidence with the tested revision and environment. |
| **Review** | Have the full delivery test suite results ready for human review. Cover all relevant acceptance cases, with steps, screenshots, and other appropriate evidence visible in the review screen. Clearly expose failures and gaps. |
| **Ready** | The human has approved merging the current revision. The agent observes that approval and can proceed to Merge. Passing tests alone is not approval. |
| **Merge** | Show this phase while the agent performs the authorized merge; record its result and evidence. |
| **Deploy** | Show deployment progress and the pipeline/link while deployment is running. Add the deployment URL when available. Follow the established release and promotion process. |
| **Live** | Verify the actual released version and environment, with reviewed evidence. Keep deployment failures, recovery, and rollback history visible. |

### Past phase visits must retain their data

The timeline must explain what actually happened in every previous visit, not
just show a phase name and transition time. Capture visit-specific information
as work happens and retain it when the agent changes phase or revision.

- Learn: relevant findings and decisions. Plan: planned scope, task structure,
  acceptance criteria and material changes.
- Build: tasks worked on/completed, actual file changes and commits when present.
- Test: methods used, related tasks, exact runs/attempts, outcomes and available
  screenshots/artifacts from that pass, including failures before repair.
- Review and later phases: evidence considered, human decisions, merge result,
  deployment pipeline and live verification as applicable.

Bind records to the actual visit, revision and task IDs. Repeated Build/Test
visits must keep their own records; later evidence must not overwrite an earlier
pass or be retroactively attributed to it. Missing or inapplicable data must be
stated honestly, never fabricated. But repeated empty placeholders for work that
actually occurred are a recording/integration defect, not acceptable completion.
Test these historical views in Electron after transitions, reload and resumption.

### Exercise fresh deliveries, not only one long-running fixture

A persistent delivery is useful for repair and resume tests, but is not a substitute
for exercising creation through completion. Run a small representative set of fresh
deliveries plus an existing-delivery join/resume case. Track which trials created
real app-visible deliveries, which ran in isolated accounts/environments, and which
were simulations. Explain this distinction in the proof record.

Demonstrate the full applicable lifecycle for a shipping outcome, including real
human decision boundaries and authorized merge/deploy/live verification in a
disposable test target. Do not bypass approvals or merge the Blume app into main.
A local-only trial stopping at Review proves only that limited path. Record any
blocked later stages explicitly, and do not treat many iterations on one fixture
as evidence of complete onboarding or start-to-finish workflow coverage.

### Task list: always exhaustive, always current

The task tree is the complete account of known work required before this delivery
ships. Planning is its starting point, not a frozen specification.

- Use root tasks for larger items and subtasks for their concrete work.
- Include **all known in-scope work**; do not do hidden work outside the list.
- Exclude work that will not be done before this delivery ships. If scope changes,
  record the change and remove/defer that work from this delivery explicitly.
- Update statuses as work starts, finishes, fails, or becomes blocked. A parent
  with completed and unfinished children is in progress.
- Expect frequent additions and revisions after Plan. Research, implementation,
  and testing continually reveal more work; keep the list exhaustive throughout.

### Task structure, ordering, and test attribution

**Required:** Keep tasks in intended execution order as far as dependencies allow.
Order siblings consistently; do not imply a strict sequence for work that can run
in parallel. Group by meaningful outcome or workstream, with concrete, independently
trackable subtasks. Avoid overlapping roots, miscellaneous buckets, and mixing
unrelated work merely because it occurs in the same phase.

**Strong preference:** The initial plan identifies the major root tasks for the
whole delivery. Most applicable phases after Plan should have corresponding work
in the task tree, including verification, review preparation, merge, deployment,
and live verification when those are in scope. This is coverage, not a requirement
for one root per phase or an empty placeholder for every phase. A phase reports
where the delivery is; a task describes work to finish.

Add discovered detail primarily as subtasks under the appropriate existing root.
Create, split, reorder, or reparent roots when genuinely new scope or a clearer
breakdown warrants it. Root stability must never hide work or force a poor grouping.
Explain material plan changes, preserve task identity/history where possible, and
keep parent status consistent with the remaining children. Do not add release
work that is explicitly outside the delivery's outcome.

**Ad-hoc test attribution:** On every run, the agent must try to identify and link
all directly relevant implementation tasks and any task tracking the testing work.
A run can verify several tasks; a task can have several runs. Keep these as explicit
task-ID relationships, visible from both the result and the related tasks, rather
than relying on a similar title. Record the tested revision and the behavior or
acceptance criterion being checked. If no reliable task match exists, state that
the run is unattributed and why; do not invent a relationship.

For example, a test checking that checkboxes are red links to “Make checkboxes
red” and, if present, “Verify checkbox appearance.” Describe the assertion and
include appropriate visual evidence. Create a separate testing task when it is
meaningful planned or newly discovered work; do not require a new task for every
retry or trivial check. Failures should identify affected work and lead to a
reopened task or a linked repair task. A passing run does not automatically finish
an entire task unless it demonstrates all of that task's acceptance criteria.

### Evidence and approval

Acceptance criteria define what success means; delivery tests should demonstrate
that those criteria hold. Ad-hoc testing supports iteration, but does not replace
complete delivery-suite results at Review. Do not weaken assertions just to pass.
Explain legitimate test changes and retain previous failed attempts.

Revision changes must not inherit stale approval or present old evidence as proof
of new work. Agents cannot manufacture human approval. Merge, Deploy, and Live
should retain reviewed evidence appropriate to each step; when a delivery reaches
them without it (or without approval), the visit records what was skipped and the
delivery shows a "Not approved" note instead of moving back. Fixture or simulated
runs must be distinguishable from real execution; missing evidence is not success.
Applications, deliveries, tests, and evidence belong to the authenticated account.

### Natural-language definitions and generated Playwright

The authored test definition describes intent, human-readable steps and expected
outcomes. It must not require Playwright commands, selectors or an action DSL.
The agent explores the actual application, generates executable Playwright source,
and the runtime executes that source to collect results and evidence. A JSON
operation plan interpreted through Playwright is not a substitute for this contract.

Keep Definition, generated Playwright versions, and Runs distinct. Show the actual
executed source with syntax highlighting, current/version history, author/time,
repair reason and triggering run, intent-preservation explanation, source changes,
and run usage. Support re-exploration from the scenario. Bind each version to its
definition and each run to its actual source/revision. Repairs must preserve the
scenario's intent; preserve older versions and evidence during migration.

### Make automation changes understandable in the UI

Every generated-source version must visibly identify its origin: **Generated**,
**Repaired**, or **Re-explored**. Separately show whether it is a candidate, current,
superseded, or discarded version. Creation of a repair does not mean it was
validated, accepted, or that the product now passes.

For a repair, show who made it and when, the failed run that prompted it, what
broke, what the agent changed, and why the change still tests the same intended
behavior. Show the actual source diff and the validation/replay results, with
links to their steps and captures. Distinguish an automation failure (such as a
stale locator) from a product defect and from a blocked environment; retain an
unknown category when diagnosis is uncertain. Never repair away a product defect
by silently weakening the expected outcome.

Keep authored-definition changes separate from automation repairs. If expected
behavior changes, show a definition revision with its reason and invalidate or
re-evaluate dependent automation and approval as appropriate. An agent's claim
that intent was preserved must be labeled as its explanation, not independent
proof; show the evidence needed to assess that claim.

Use the Playwright version list and detail view for the full change story, a
compact generation/repair status while work runs, and a clear link from each run
to the exact source version it used. Review must show which version and validation
results support the proposed approval, including pending or failed repairs.

### Deployment visibility

For GitHub Actions deployments, the Deploy phase card should show the pipeline
as a graph of jobs and their dependencies, with live queued, running, passed,
failed, cancelled, or skipped states. Include job durations and links to the
workflow run and job logs. Match the run to the delivery's commit and target
environment, including retries; do not display an unrelated latest run.

Use workflow job dependencies for the graph and actual run data for status. If
those dependencies cannot be resolved, show a clear job list instead. While the
pipeline is running, its progress is the primary content. Add the deployment URL
when available; workflow success alone does not prove the release is live.

### Decisions to validate through use

- Keep Build and Test separate initially. Observe real ad-hoc testing during
  implementation before deciding whether merging those phases would work better.
- Validate when the agent can confidently infer an existing delivery and when a
  brief suggestion or question is necessary.
- Verify which harnesses need hooks, and what GitHub integration already exists.
  These are investigation items, not claims of implemented support.

## The agent's iteration loop

**Exercise → observe → diagnose → fix → repeat → record.**

- Start from a realistic user outcome and run the journey using the actual plugin,
  MCP, test runtime, and Electron app. Include both a successful path and a
  deliberate failure followed by recovery.
- Inspect what the user can understand and act on, not just tool responses.
  Identify missing information, confusing transitions, stale state, and unnecessary
  manual work. Fix the underlying issue and repeat the affected journey.
- Check reconnects, restarts, cancellation/retry, account isolation, and revision
  changes. Durable results and evidence must survive replacement of ephemeral
  execution infrastructure. Partial failures must not become false success.
- Leave a short record: scenario, exact code/plugin versions, environment,
  observations, evidence, fixes, and remaining gaps. Separate verified behavior
  from assumptions and prerequisites that are still blocked.

## Challenge the plugin architecture

Use the [architecture levers inventory](plugin-architecture-levers.md) to identify
the available pieces and verify harness support before composing experiments.

**Assume the current tool set and plugin configuration are unlikely to be the
right final design.** They are a baseline to test, not constraints to defend.
Repeated instruction patches are not enough if the tools or interaction model
encourage the wrong behavior. The reviewer should challenge these choices often.

- Draw state and flow diagrams for materially different architectures: how a
  conversation discovers Blume, chooses a delivery, plans, updates work, tests,
  submits evidence, handles human decisions, and resumes after interruption.
  Show which transitions the model chooses and which the system enforces.
- Compare genuinely different tool sets and plugin configurations, not only
  wording changes. Candidates might use many granular tools, a few workflow
  operations, or a state-aware interface that offers the next valid actions.
  Compare native instruction discovery and hooks where relevant.
- Reuse the existing isolated Codex installation as one test environment. Create
  additional separate installations when useful to test alternatives in parallel,
  with independent configuration, plugin versions, project data, and sessions.
  Do not modify the user's normal Codex installation or let variants contaminate
  one another's state.
- Run the same representative outcomes and failure/recovery scenarios against
  each candidate. Keep model, starting state, permissions, and scenario comparable;
  record differences and repeat trials to distinguish reliable behavior from luck.
  Include fresh conversations and resumed/joined deliveries.
- Compare actual agent actions with this document: correct delivery selection,
  exhaustive ordered tasks, phase changes that follow where the work is, task-linked
  tests, revision-correct immutable evidence, and respected human approval (asked
  for and waited on; any skip recorded and told to the person). Also compare
  setup effort, unnecessary questions, tool errors, recovery, latency, and cost.
- Maintain a concise comparison table with transcripts/evidence, failures,
  tradeoffs, and a justified choice. Do not declare a winner from unit tests or
  one successful run. List requirements no candidate has demonstrated yet.

The reviewer should repeatedly ask: **Is this an instruction failure, a tool/API
problem, or a missing system constraint? What alternative architecture was tried?
What evidence shows the chosen design makes the expected behavior reliable?**
Architecture experiments must preserve account isolation and human approval (only a
person approves; Blume records any phase reached without it); changing a tool set is
not permission to bypass those requirements.

### Test with realistic user prompts

Early scripted exercises may test tool contracts and isolated failure handling,
but they do not demonstrate that the plugin supplies the context an agent needs.
Once major mechanical issues are resolved, the primary evaluation must use prompts
similar to what a real user would type. Begin those trials early enough to expose
missing discovery and guidance, rather than saving them for a final demonstration.

For example: “Add a way to save my habits so they are still there when I reopen
the app.” A follow-up might be “It loses them when I restart. Can you fix that?”
An explicit request such as “Continue the checkout delivery” is also realistic.
The user provides the desired outcome, relevant constraints, and genuine decisions.
The plugin, tools, and persisted context must supply the Blume-specific process.

Do not put phase sequences, tool names, task/criterion IDs, revision bookkeeping,
evidence rules, retry instructions, or review gates in the user prompt merely to
make the agent succeed. If the agent needs them, establish whether they belong in
plugin discovery/instructions, tool results, or server-enforced behavior. Asking
the user is appropriate for real ambiguity, not missing internal process guidance.

Keep two evaluation tracks and label results separately:

- **Mechanics tests:** detailed scripted or simulated exercises checking APIs,
  state invariants, and recovery. Useful diagnostics, not product-readiness proof.
- **User-realistic trials:** fresh conversations with ordinary outcome prompts,
  the installed plugin, and the same context available to a normal user. Check
  whether the agent discovers Blume, starts/joins correctly, maintains work,
  generates/runs tests, links evidence, and respects review boundaries without
  procedural coaching. Include corrections, ambiguous delivery association,
  resumed conversations, and prompts that should not activate Blume.

Keep the evaluator's expected sequence and assertions outside the tested agent's
context. Configure disposable environments and permission boundaries through the
harness, rather than embedding the answer in the prompt. Retain both the initial
prompt and all injected instructions/tool context so failures can be attributed
to the correct layer. Record any human/evaluator rescue as intervention; a coached
recovery must not count as an unassisted pass. Repeat with varied natural phrasing
and reserve unseen scenarios to avoid tuning solely to the benchmark prompts.

Architecture comparisons must eventually use this user-realistic track. A design
that succeeds only when the prompt tells it the entire Blume process has not
shown that its plugin configuration is sufficient.

### Stage model usage deliberately

Use Terra for economical early iteration and mechanical debugging. Its results
alone do not establish how the finished experience performs with stronger models.
Preserve this staged evaluation plan to control usage:

1. **Terra:** resolve major tool, runtime, discovery, and workflow defects first.
2. **GPT-5.6 Sol:** once a set of tests is further along and major defects are
   addressed, run a small, deliberately selected set of realistic user trials.
   Focus on representative end-to-end behavior and unresolved model-sensitive
   questions; do not repeat the entire exploratory matrix on the stronger model.
3. **GPT-6 Astra:** eventually run **one** carefully prepared realistic end-to-end
   trial when the app and plugin are ready for a meaningful final evaluation.

Before each stronger-model trial, confirm the environment works with inexpensive
checks, define what the trial should establish, and retain the exact model,
configuration, prompt, evidence, interventions, and usage. Do not use expensive
trials to rediscover known infrastructure failures. Fix those first. Do not launch
additional Astra trials automatically; further runs require a user decision.

Keep the same realistic-prompt standard across models. Report stronger-model
results separately from Terra results. One Astra success is valuable evidence,
not proof of universal reliability; avoid broad claims from this deliberately
small sample.

## Completion standard — proposed

Completion means a reproducible end-to-end journey with working user decisions,
real execution and evidence, durable state, and no known critical gaps. Passing
unit tests, a deployed service, or a polished fixture demonstration alone is
insufficient. State any remaining limitations explicitly; do not call an
unexercised path complete. Nothing here authorizes merging into main.

After approval, the hourly reviewer will challenge completion claims against
this document and request concrete proof or further work where gaps remain.
