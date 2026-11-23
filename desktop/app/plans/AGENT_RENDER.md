Sidecar — agent display behavior

What you're rendering

A live list of coding agents grouped into two sections — RUNNING and WAITING. Each section has a header, and each agent is a card. Agents can have nested sub-agents inside their card. Each agent may have a task list (a structured plan it's working through); when it does, the card surfaces progress and lets the user expand to see the full plan.

The behavior below is the canonical spec — implement against it without reference to mock data or staged rollouts.

Terminology

Task list — the agent's own structured plan, a flat ordered list of items with pending / current / done states. Some harnesses surface this as a "todo list" or "plan"; same concept.

Sub-agent — a child agent spawned by a parent agent. Some harnesses (Claude Code, Cursor) call the mechanism for this the "Task tool" because the parent invokes it via a tool named Task. Despite the name collision with the task list above, a sub-agent is not a task list item — they're distinct concepts. A parent agent can have both: a task list it's working through, AND sub-agents it has spawned to help with some of those tasks.

Running — the agent is actively working.

Waiting — the agent has finished its current turn and is waiting for either the user's next instruction or for a sub-agent it's blocked on. Visually treated the same as "completed" — green check, frozen task list — but the language is "waiting" because the agent isn't gone, it's idle and ready for the next thing.

Section structure

RUNNING ——————————————————————————————————— {count}
[agent cards, oldest startedAt first]

WAITING ——————————————————————————————————— {count}
[agent cards, most recently went idle first]

A section header only renders if its count > 0. If there are zero running agents and one waiting, only the WAITING section header appears (and vice versa). If both counts are zero, neither header appears — the idle empty state takes over instead.

Count = top-level agents only. Sub-agents are never counted in either section.

Sort within RUNNING: ascending by startedAt (oldest at top — newest work pushes down, so the eye follows the timeline naturally).

Sort within WAITING: descending by wentIdleAt (just-finished at top).

Agent card — fields, top to bottom

1. Header row

Avatar (left, 28×28, rounded ~8) — harness brand color background, harness glyph in white.

Eyebrow + meta (next to avatar, two stacked lines):

Line 1: HARNESS NAME in uppercase, bold 10pt, letter-spacing 10%. Use the harness display name: CURSOR, CLAUDE CODE, CODEX, COPILOT.

Line 2: small 13pt muted text, format = {statusVerb} · {elapsed}. statusVerb is Running for running, Waiting for waiting, Failed for failed. elapsed rules below.

Status indicator (right, 18×18):

Running → orange spinner arc, rotating 1.2s linear infinite.

Waiting → filled green disc with white check.

Failed → filled red disc with white ×.

2. Title row

Agent title in bold 15pt, color --fg.

Title hugs its content width — followed immediately by a small inline ↗ icon (11×11, stroke --fg-faint). The icon is part of the title affordance, not a separate column. Clicking title or ↗ opens the agent's URL.

If title is missing (some harnesses don't expose one until first message), use the agent's first user prompt as fallback.

3. Body — exactly one of these renders, in this priority

Priority A: Task list summary (when tasks.length > 0)

A single line:

Left: label of the current task (the one task in state 'current').

Right: {done}/{total} in muted 13pt — where done = tasks.filter(t => t.state === 'done').length and total = tasks.length.

Beneath the line: progress bar, 4px tall, 999 radius, fill ratio = done/total. Color = --purple for running, --green for waiting, --red for failed.

The whole body area is clickable — clicking expands to show the full task list (see Expand interaction below).

Priority B: First message quote (when firstMessage exists and no tasks)

An italic quote of firstMessage, truncated to ~140 chars with ellipsis. Font 13pt, color --fg-muted, wrap to multiple lines. No progress bar.

This is the agent's opening framing — captured on the FIRST agent.message event and never overwritten. Even after the agent has emitted dozens more messages, this stays as "I will start by mapping the route discovery step…" because that's the useful summary.

Priority C: Result text (when status === 'waiting')

The result.text (e.g., "Verified · 5 of 5 retries pass"). Same styling as task summary's left line. Beneath it, a fully-filled progress bar in --green. If the agent had tasks, this replaces the task summary entirely.

Priority D: Nothing

If no tasks, no firstMessage, no result → render no body. Card is just header + title. Don't render an empty container or placeholder text.

4. Sub-agents (when present)

Below the body, nested mini-cards — one per sub-agent. See Sub-agent card below.

Elapsed time formatting

< 60s → 2s, 14s, 59s

1m to 59m → 2m 14s, 18m 02s (always show seconds, zero-pad when < 10)

1h to 23h → 1h 14m, 3h 02m

≥ 24h → 2d 4h

For waiting agents, freeze elapsed at wentIdleAt - startedAt — don't keep it ticking. For running agents, recompute every 1s via a single shared timer (don't put setInterval on every card).

Sub-agent card

Renders inside the parent card, after the parent's body content. Spawned by the parent invoking its Task tool (or equivalent mechanism in that harness). Visual rules:

Indented from the parent's content by ~24px on the left.

L-shaped connector glyph drawn in the gutter — single 1px stroke in --border-subtle.

Background --rule-bg (the cream-on-cream nesting tone), rounded ~8.

Padding tighter than the parent: ~10/12.

Fields, top to bottom:

Small avatar (left, 22×22, rounded ~6) — the sub-agent's harness glyph. Usually the same harness as the parent (a Claude Code agent's Task tool spawns more Claude Code agents) but the data model allows cross-harness, so render whatever the sub-agent reports.

Title (15pt semi-bold) + inline ↗, single-line truncate with ellipsis. The title is whatever prompt the parent passed when invoking the Task tool ("Audit existing meta tags").

Status line: Sub-agent · {elapsed} in 11pt, color --fg-faint.

Status indicator on the right edge (14×14, smaller than parent): spinner / check / ×.

Sub-agents NEVER show their own task list summary inline. If a sub-agent has tasks (it often will — sub-agents make their own plans), this is invisible at the parent level — the parent card stays uncluttered. When the user clicks the sub-agent card, it expands to show its own task list (same expand interaction as parent cards). Don't auto-expand.

Multiple sub-agents stack vertically with a small gap (8px). Waiting sub-agents stay visible under their parent for as long as the parent is alive — they don't disappear when they go idle. (The parent might invoke another Task with the same sub-agent's results, so the user wants the history visible.)

Expand interaction (the load-bearing one)

Each agent card with a task list can be expanded — parent or sub-agent, same mechanism. Clicking anywhere in the body area (the task summary line OR the progress bar) toggles expanded state. A small chevron in the body's right area indicates state (▾ collapsed, ▴ expanded), and rotates 180° on toggle.

Expanded view replaces the single-line task summary with the full vertical task list. Progress bar disappears in expanded state — the list itself communicates progress.

Task row anatomy:

Leading icon (14×14):

done → green check ✓

current → orange spinner arc (animating)

pending → empty gray circle (1.5 stroke, --harness-inactive)

Label (13pt):

done → strikethrough, color --fg-faint, regular weight

current → no strikethrough, color --fg, semi-bold

pending → no strikethrough, color --fg-faint, regular weight

Tasks stack vertically with 6px gap. No icons on the right — the leading icon carries all the state.

Animation: the card grows in height with a 200ms ease-out. Use a height-auto measurement (ResizeObserver or framer-motion's layout prop) so the transition is smooth regardless of how many tasks there are.

Click-through: clicking on a task row does nothing in v1. The list is informational. (You can wire row clicks to open the agent at that step later, but no harness exposes that today.)

State invariants (write tests for these)

These are the load-bearing assumptions the UI rests on. The reducer must enforce them — don't trust the events alone.

Single-current invariant. At any time, an agent has zero or one task in state === 'current'. If a tasks.update event sets a task to current, find any other task currently in current and auto-demote it to done (with completedAt = now). Without this, Cursor in particular produces brief states with two "in progress" tasks during transitions, and the UI's "current task" line becomes nondeterministic.

Progress is derived, never stored. done/total and the bar fill come from counting tasks every render. Never cache them on the agent.

firstMessage is set once. Reducer for agent.message only writes the field if it's currently undefined. Subsequent messages update lastMessage (which the UI doesn't currently surface but might later).

Sub-agents never appear in rootIds. agent.started with non-null parentId adds the agent to the agent map only — never to the root list. Selector that produces the section render tree only walks rootIds.

A waiting parent keeps its still-running sub-agents. When a parent transitions to waiting while one of its sub-agents is still running, move the parent to the WAITING section but render the sub-agents underneath, still in their running state, still animating. This is actually common — a parent that invokes its Task tool then awaits the result is itself "waiting" while the sub-agent runs.

Failed agents render in WAITING, not a separate section. Status indicator differentiates them. There's no FAILED section.

Empty / edge cases the UI must handle

Agent with no tasks declared yet, but firstMessage exists. → Show the italic quote. No progress bar, no expand affordance. As soon as agent.tasks.set fires, the body switches to the task summary view (this is a real state transition; animate the body content swap with a 150ms crossfade, no height jump if avoidable).

Agent with no tasks and no message yet. → Show header + title only. The card looks "thin" — that's correct; it's a placeholder for an agent that's just starting up. Add a subtle pulsing dot or shimmer somewhere if you want to communicate "waiting for first message" but it's not required.

Agent with tasks but no task in current state (all pending). → Show "Planning…" as the current-task line, in italic muted text. Progress bar shows 0/N at 0% fill. This happens immediately after tasks.set if the agent declared a plan before starting to execute it.

Agent with a single task. → Same rules. 1/1 becomes 0/1 then 1/1. Don't special-case.

Agent with 50+ tasks. → Collapsed view stays one line. Expanded view scrolls inside the card if it exceeds the body's max-height (~400px). Don't let a single expanded card push everything else off-screen.

Sub-agent of a sub-agent. → Sub-agents can spawn their own sub-agents via the same Task tool mechanism. Render up to two levels deep. Third-level sub-agents get flattened into the second level visually (still tracked correctly in state). In practice rare today, but defensible because the data model allows it.

Same agent ID reused (harness restarted the agent). → Treat the new agent.started as a no-op if an agent with that ID already exists and is still in the map. Don't replace, don't duplicate. If the existing one is waiting/failed, replace it.

What the user actually sees over time — a worked example

T+0s — User asks Cursor to refactor the auth flow.

agent.started → card appears in RUNNING, header + title visible, no body. Section header RUNNING · 1.

T+2s — Cursor emits its first assistant message.

agent.message → firstMessage set. Body now shows the italic quote.

T+4s — Cursor declares its plan (7 tasks, first one in progress).

agent.tasks.set → body swaps from quote to task summary. Line reads "Auditing current useAuth hook · 0/7", progress bar at 0%.

T+30s through T+1m — tasks progress.

tasks.update fires repeatedly. Current task line updates to the new current task; progress bar grows. No layout jumps — only the text and bar fill change.

T+1m 12s — Cursor invokes its Task tool to spawn a sub-agent ("Audit existing meta tags") to help with one of its own tasks.

agent.started with parentId = cursor's id → sub-agent mini-card slides down into the parent card (250ms cubic-bezier). Parent card grows in height. Parent stays in RUNNING if it continues other work in parallel; transitions to WAITING if it's blocked on the sub-agent's result.

T+2m — user clicks the parent card's body.

Expansion animation: body height grows from ~40px to ~200px over 200ms. Single-line summary is replaced by the 7-task list. Chevron rotates 180°.

T+3m — sub-agent finishes its work and goes idle.

agent.waiting for sub-agent → its status indicator becomes a green check. Sub-agent card stays nested under the parent, no animation out. If parent was blocked on it, parent now resumes (transitions back to RUNNING).

T+5m — parent agent completes its task list and goes idle.

agent.waiting for parent → card animates out of RUNNING section (200ms) and into WAITING section (200ms slide in at top). Status indicator becomes green check. Body now shows result text + full green progress bar. Tasks list is frozen — clicking still expands to show all 7 done. Sub-agent still nested, still showing its waiting state.

T+8m — user sends parent a follow-up instruction.

agent.started is NOT emitted (same agent). New events stream in against the existing ID. Parent transitions back to RUNNING, moves out of WAITING back into RUNNING. Old task list either gets replaced (tasks.set) or extended (tasks.update adds new items) depending on what the harness does.

This is the whole behavior surface. Build the reducer to honor it and the selectors to produce the render tree; the components above are straightforward once the data is right.

The waiting reframing is a real improvement — "completed" implied a terminal state but agents almost always come back when you talk to them again, and the UI now reflects that they're paused rather than gone. The one place this affects implementation more than rename is the resume-from-waiting path in the worked example's T+8m step: the reducer needs to handle a new event stream against an existing agent ID without treating it as duplicate. That's a small change but worth a test.
