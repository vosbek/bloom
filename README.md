# bloom — Blume desktop, deconstructed and reconstructed

Reverse-engineered and rebuilt from the shipped product, with evidence at every step.

- **Target**: Blume Desktop 2.0.26 (`Blume-2.0.26-setup.exe`, SHA-256 `f166bf15970b2b3126eaba85ad417dbba4d66daf107a97f843cc90b0d18ce8a0`)
- **Tool**: [REA](https://github.com/morluto/rea) — CDP capture, bundle analysis, full ASAR application graph, feature traces
- **State**: the app **runs locally from the reconstructed code**, and the marketing site is mirrored word-for-word and pixel-equivalent

## Repo map

| Path | What it is |
|---|---|
| `diagrams/` | DevPin-design-system diagram pages (`.dc.html`) — architecture, delivery workflow, tool-call sequence. Serve the folder and open them (see below) |
| `desktop/app/` | The application source, extracted verbatim from `resources/app.asar` (662 files: `out/main`, `out/renderer`, the shipped test suite, scripts, docs, plans, configs) |
| `desktop/plugin-bundle/` | The agent-side MCP bridge (v0.26.5) the harnesses spawn |
| `website/` | Working local mirror of https://blume.codes/ — rebuilt from the captured code + assets, verified word-identical and 0.01%-pixel-equal to production |
| `analysis/` | The complete application pack (repomix, 568 files, 20.6 MB) + REA trace results |
| `docs/` | How it works, how to run it, the full IPC contract, the plugin bridge, traces |

## How it works (30 seconds)

Blume is an **always-on desk companion that watches agent harnesses** (Claude Code, Codex). One Electron main process hosts a **loopback MCP control server**. The harnesses spawn `plugin-bundle/bridge.mjs` as an MCP server, which reaches the app over HTTPS on 127.0.0.1 with `BLUME_CONTROL_TOKEN`. The control plane is **local SQLite** (better-sqlite3). The renderer reviews deliveries and approves revisions — one human decision per revision. Cloud (better-auth account, updates from `updates.blume-page.com`, PostHog/Sentry/Chatwoot telemetry) is optional.

Deeper detail: [docs/how-it-works.md](docs/how-it-works.md) · diagrams: [Architecture](diagrams/Architecture.dc.html) · [Workflow](diagrams/Workflow.dc.html) · [Sequence](diagrams/Sequence.dc.html)

## How to run it

### The website mirror (works offline)

```
cd website
node serve.cjs
```

→ http://127.0.0.1:8377/ — the full blume.codes homepage including its in-browser app replica (SQLite-WASM fixture host, demo deliveries, flower themes). Verified against production: 6,202 DOM words identical, 53/921,600 screenshot pixels differ (0.01%, procedural petals only).

### The desktop app from reconstructed code

The shipped installer puts a signed app at `%LOCALAPPDATA%\Programs\@blumedesktop`. To run **our extracted copy** instead (Electron loads a `resources\app\` directory in preference to `app.asar`):

1. Install Blume 2.0.26 once (any machine), so `blume.exe` + the Chromium runtime exist:
   `Blume-2.0.26-setup.exe /S`
2. Copy the install folder to wherever you want the reconstruction, **without** `resources\app.asar` and `resources\app.asar.unpacked`.
3. Copy this repo's `desktop/app/` contents into `<copy>\resources\app\`.
4. Overlay the unpacked native modules (`.node` binaries) from the original install's `resources\app.asar.unpacked\` into the same tree.
5. Run `<copy>\blume.exe`. Verified: window boots to `#/deliveries`, deep links (`blume://app/agents`) navigate, workers spawn, updater checks in.

Full recipe incl. verification commands: [docs/how-to-run.md](docs/how-to-run.md).

### The diagrams

```
cd diagrams
python -m http.server 8080
# open http://localhost:8080/Architecture.dc.html (and Workflow / Sequence)
```

The pages use the DevPin design system (`ds/devpin/tokens.json`, light+dark) and the same `.dc.html` canvas format as the QCon project they were restyled from.

## What was verified (all evidence in `docs/` and `analysis/`)

- **App graph**: 19,370 modules, 7,732 JS files parsed, 5.4M AST nodes, 151,643 findings from the 180 MB `app.asar`
- **IPC contract**: 154 renderer invoke channels + 27 main handlers — [docs/ipc-contract.md](docs/ipc-contract.md)
- **Plugin bridge**: 9-file MCP bridge, 16-tool surface (`blume_request`, `blume_delivery_update`, `blume_tests`…) — [docs/plugin-bridge.md](docs/plugin-bridge.md)
- **Feature traces**: 700+ nodes / 726 edges per seed through the application graph — [docs/traces.md](docs/traces.md)
- **Runtime proof**: deep-link scenario (3/3 steps), Electron process tree (12 utility workers), renderer confirmed loading **our** extracted path
- **Website parity**: word-for-word DOM text, screenshot diff 0.01%

## Provenance and license

The Blume application is © its authors; this repo contains reverse-engineering artifacts produced for interoperability research from a lawfully obtained installer, plus a mirror of public website assets. The extracted code in `desktop/app/` is the vendor's minified production output — kept as the ground truth this documentation describes, not as a fork. No vendor secrets (tokens, keys) are included; storage values, cookies and auth headers were never captured.
