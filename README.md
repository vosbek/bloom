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

### The desktop app — one command, no vendor installer

```
cd desktop
powershell -ExecutionPolicy Bypass -File build-and-run.ps1
```

Downloads stock Electron 43.1.1 (checksum-verified), assembles `resources\app` from this repo's complete payload — the app's own `node_modules` (in-asar packages + unpacked native binaries) is committed — renames the exe, and launches. Verified: window at `#/deliveries`, the full utility-worker fleet, app logger live.

### The website mirror (works offline)

```
cd website
node serve.cjs
```

→ http://127.0.0.1:8377/ — the full blume.codes homepage including its in-browser app replica (SQLite-WASM fixture host, demo deliveries, flower themes). Verified against production: 6,202 DOM words identical, 53/921,600 screenshot pixels differ (0.01%, procedural petals only).

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

## License

Two kinds of material live here, and the licensing says so precisely:

- **[LICENSE](LICENSE)** (MIT) — covers our original work: all documentation, the DevPin diagram pages, the build/serve scripts, and the analysis artifacts. Use, modify, and reuse those freely.
- **[NOTICE.md](NOTICE.md)** — names the third-party material (`desktop/app/`, `desktop/plugin-bundle/`, `website/`): the extracted Blume application payload and public site assets. That material retains its original copyright; it is included as reverse-engineering reference from a lawfully obtained copy and is **not** relicensed by this repo. The `node_modules` package licenses (MIT/BSD/ISC) stay in place as those licenses require.

Produced for interoperability research; every claim traces to evidence in [docs/evidence.md](docs/evidence.md). No vendor secrets (tokens, keys) are included — storage values, cookies, and auth headers were never captured.
