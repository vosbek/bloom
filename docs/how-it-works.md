# How it works — Blume Desktop 2.0.26

Everything below was recovered from the shipped build: static analysis of the 180 MB `app.asar` (7,732 JS files, 5.4M AST nodes), CDP inspection of the running app, its logs, and the plugin bundle the harnesses spawn.

## The stack

| Layer | Finding |
|---|---|
| Shell | Electron 43.1.1 / Chrome 150, exe `blume.exe` (SHA-256 `86f573f2…`), per-user NSIS install at `%LOCALAPPDATA%\Programs\@blumedesktop` |
| Main process | `out/main/index.js` + 45 sibling modules; 10+ Node utility workers (`conversation-list`, `refresh`, `wrapped-generate`, terminal PTY, search, setup-scan, claude-metadata, signal-analytics, parser-binding) |
| Renderer | React SPA from `out/renderer/index.html`; routes `#/deliveries`, `#/projects`, `#/setup`, `#/usage`, `#/improve`, `#/plugin`, `#/terminal`, `#/feedback`, `#/account`, `#/settings` |
| Control plane | better-sqlite3 (local). `db:conversations:*`, `db:projects:*`, `db:settings:*` IPC families |
| Auth | better-auth + @better-auth/electron 1.6.25 — optional; gates cloud features only |
| Native addons | better_sqlite3.node, conpty/winpty (node-pty multiarch), a Rust binding module |
| Deep links | `blume:` (stable), `blume-canary:`, `blume-dev:` — registered via better-auth's protocol registration; single-instance forwarding to the primary window |
| Updater | electron-updater, generic provider → `https://updates.blume-page.com/desktop/stable`, sha512-signed `latest.yml`, release 2.0.26 dated 2026-11-18 |
| Telemetry | PostHog EU (`eu.i.posthog.com`), @sentry/electron 7.13, Chatwoot support widget, OpenTelemetry log exporter |
| Deps of note | pino (NDJSON logs), node-pty, @resvg/resvg-js, neverthrow, diff, yaml |

## The agent bridge (the interesting part)

The desktop app is one half of a pair. The other half ships inside it: `resources/plugin-bundle/` (v0.26.5, per-file SHA-256 manifest, requires Node ≥ 24).

1. The app writes `mcpServers.blume.env = { BLUME_CONTROL_ENDPOINT, BLUME_CONTROL_TOKEN }` into the harness config (Claude Code settings / Codex config).
2. The harness spawns `bridge.mjs` as an MCP server over stdio.
3. The bridge connects back to the app's **loopback control server** with the token. Remote endpoints must be HTTPS without credentials, query or fragment — enforced in bridge code.
4. Tools the harness can call: `blume_request`, `blume_delivery_update`, `blume_delivery_get`, `blume_context`, `blume_setup`, `blume_messages`, `blume_inbox`, `blume_improve`, `blume_improve_get`, `blume_improve_update`, `blume_tests`, `blume_test_run`, `blume_tests_rerun`, `blume_checkpoint`, `blume_usage_resolve`, `blume_signal_record`, `blume_project_get`.

The tool prompts embed the delivery contract: approvals per step, evidence registered against an exact revision, "a localhost target is a local check whatever its label", deployment records with commit + version.

## The delivery model

Recovered lifecycle: **Start → Plan → Build → Test → Review (outcome + code) → Release → Done**, with brief slide kinds `what-changes, user-impact, proof-plan, risks, not-proven, rollback, why-now`. Bug reports are reproduced with a failing test first, then fixed and rerun. Only passing runs pin evidence to a revision; the review pulls the ledger via `db:conversations:listForView`; the reviewer makes exactly one approve per revision.

## The control-plane schema

The marketing site embeds a working SQLite-WASM replica of the desktop control plane, whose schema matches the app's: `test_plans`, `test_scenarios`, `test_executions`, `test_runs`, `test_retention_runs`, `active_test_jobs` (with heartbeat/stale reaper), retention triggers, all `workspace_id`-partitioned.

## The IPC surface

154 renderer invoke channels, 27 main handlers, 14 renderer event listeners. The preload (`out/preload/index.js`) maps every `api.*` closure to `ipcRenderer.invoke/on` — proven by REA traces: `db:conversations:refresh → preload → api.openTerminalPage → ipcRenderer.invoke` and 168 more terminal paths. Full table: [ipc-contract.md](ipc-contract.md).

## Telemetry taxonomy

Event properties: `app_product: "blume", app_surface: "desktop", app_client: "electron"`. The website flags experiment on the desktop too: `desktop-menu-bar-status-item`, `sidecar-desktop-download-cta`, `wrapped`, `accounts-and-feature-requests`, `require-login-before-use` (control = not required), `job-board`, `cloud-improve-processing`, `desktop-conversation-continuation-menu`.

## Fuses and hardening

RunAsNode **enabled**; CookieEncryption disabled; EnableNodeCliInspectArguments present; embedded-protection and only-fused-integrity visible in the fuse wire (see `docs/evidence.md` for the raw fuse read).
