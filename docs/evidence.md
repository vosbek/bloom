# Evidence inventory

Every claim in this repo traces to one of these artifacts. Hashes are SHA-256.

## The shipped build

| Artifact | Value |
|---|---|
| Installer | `Blume-2.0.26-setup.exe`, 138,408,072 bytes, `f166bf15970b2b3126eaba85ad417dbba4d66daf107a97f843cc90b0d18ce8a0` |
| App exe | `blume.exe`, 225,475,584 bytes, `86f573f23e121ea56bb4e81873f9c21c4c9666db79f2ec1ca182fc2b3e23aecd` |
| App payload | `resources/app.asar`, 179,873,350 bytes, subject sha `c71eb068fa6c51c24fd2cff18c44bebc8c736f5cab93487208951a8bc35b7a9d` |
| Release identity (from the app's own log) | bundleId `blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9`, channel `stable`, releaseDate 2026-11-18, sha512 `XYLTl7gO…` over the setup.exe |

## Static analysis (REA v6.10.1)

| Run | Numbers |
|---|---|
| `analyze-javascript-application` on `app.asar` | 13,318 relevant files, 7,732 JS parsed, 5,438,916 AST nodes, 151,643 findings, 2 parse failures; 19,370 modules in graph; Electron boundary: 8 browser windows, 33 webPreferences, 7 contextBridge APIs, 239 IPC operations / 174 literal channels, 12 utility processes, 8 protocol registrations, 17 native addons |
| Same on `plugin-bundle` | 8 modules parsed, 935,702 AST nodes, 1,407 findings, 0 failures |
| Fuses (`inspect-electron-fuses`) | RunAsNode enabled; CookieEncryption disabled; wire v1 sentinel at offset 181,321,872 |
| Feature traces | see [traces.md](traces.md) |

Not committed for size: the 1 GB ASAR evidence bundle and the 233 MB website deep-evidence bundle. Regenerate with the commands in [traces.md](traces.md) against the installer above; the extraction in `desktop/app/` lets every static claim be re-derived without re-downloading anything.

## Runtime verification

| Check | Result |
|---|---|
| Launch scenario (REA `capture-electron-scenario`) | boot 7,502 ms → renderer-reload → settle; window `#/deliveries`, visible; 8 process types incl. 3 named Node utility workers |
| Deep-link scenario | `blume://app/agents?source=website_download` → window at `#/agents`, 3/3 actions completed |
| Single-instance | second instance forwards to primary and exits (log: "secondary dev instance forwarded a possible account callback") |
| Reconstruction proof | `rea list-electron-targets` reports the renderer at the **copied** `resources\app\out\renderer\index.html`, not the vendor asar |
| **Self-contained rebuild (stock Electron 43.1.1, no vendor installer)** | `build-and-run.ps1` → window "Blume", 10 processes incl. 5+ Node utility workers + network service, app logger serving; renderer at `<runtime>\resources\app\out\renderer\index.html` |
| Main log | `%APPDATA%\Blume\logs\main.ndjson` — pino NDJSON with app_product/app_surface/app_client fields; perf warnings expose IPC handler latencies |

The self-contained rebuild needed one debugging insight, recorded here for reproducibility: the vendor binary is a **patched Electron** — it resolves the `node:electron` module specifier and ships its own runtime; on stock Electron the payload boots unchanged once the app's complete `node_modules` is present (the in-asar packages are not bundled into the chunks — `out/main/index.js` requires `@electron-toolkit/utils` & co. at runtime). The failure mode without them is a silent pre-window hang with a Chromium "A JavaScript error occurred in the main process" dialog; the fix is the committed `node_modules`, not a code change.

## Website mirror verification

| Check | Result |
|---|---|
| DOM text | 6,202 words each side, 0 differing word types (origin-normalized) |
| Screenshot 1280×720 (reduced motion) | 53 / 921,600 px differ (0.01%), mean Δ 0.001; production PNG sha `072aa3af64fbaeed76661c9d4dac4f08a0d6151093e2a47903bd0107e2f9b675`, local sha `1e0a355ee14897e6952a2540bc1da493b360c6bd2d490ad67b5427f752b77fbb` |
| Console | identical two lines; zero 404s after runtime-asset sweep (645 files) |
| Captured evidence (not committed) | `page-inspect.json` 8.0 MB; `web-bundle.json` 340 KB; `app-graph-deep.json` 233 MB |

## Known limitations (honest)

- ASAR static analysis ran at default semantic precision (512 alias-selections); 58k application-graph + 100k semantic unknowns retained as explicit unknowns
- Electron runtime IPC hooking hit `hook_conflict` on Electron 43 — the runtime event timeline is unavailable; the IPC contract is static + log-derived
- The sequence/archify HTML diagram from the analysis session fails viewport containment in the diagram tool used (its own example fails identically); the committed `.dc.html` pages are hand-built to DevPin and don't carry that issue
- Vendor secrets were never captured: REA redacts storage values, cookies, auth headers by design; no tokens or keys appear in this repo
