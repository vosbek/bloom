# How to run it

## 1. The website mirror (no dependencies beyond Node)

```
cd website
node serve.cjs
```

Open http://127.0.0.1:8377/.

What you get: the blume.codes homepage, fully functional — React islands hydrate, the SQLite-WASM control-plane fixture boots (OPFS-backed), the demo deliveries window runs, the flower theme system works, and third-party analytics load from their CDNs exactly as on production. `/api/waitlist` and `/api/feedback/chat` don't exist locally (they were the only backend endpoints the site ever called).

Verified against production (2026-11-23, Chrome headless, reduced motion):

- DOM text: 6,202 words on both sides, **0 differing word types** (origin-normalized)
- Screenshot 1280×720: **53 of 921,600 pixels differ (0.01%)**, mean channel delta 0.001 — procedural petal placement only
- Console: identical two lines (`Build version not found`, `Module error handler initialized`), zero 404s
- The only script-src difference in the DOM: the Facebook pixel config's `domain=` parameter

## 2. The desktop app — fully self-contained rebuild (no vendor installer)

One script. Downloads stock Electron 43.1.1 with checksum verification, assembles the payload from this repo, and runs it:

```powershell
cd desktop
powershell -ExecutionPolicy Bypass -File build-and-run.ps1 -Target C:\somewhere\bloom-runtime
```

What happens: the Electron zip (official release, SHA-256 checked against `SHASUMS256.txt`) is extracted, `desktop/app/` becomes `resources\app\`, `desktop/plugin-bundle/` becomes `resources\plugin-bundle\`, and the stock `electron.exe` is renamed to `blume.exe` (the app's `isPackaged` heuristic keys off the executable name). From a fresh clone, nothing else is needed — the app's complete `node_modules` (in-asar packages + unpacked native binaries) is committed in this repo.

Verified on this exact recipe (2026-11-23):

- Window "Blume" at `#/deliveries`, renderer at `<target>\resources\app\out\renderer\index.html` (REA `list-electron-targets` proof)
- The full worker fleet spawns: 5+ Node utility processes + network service, 10 processes total
- The app's own pino logger runs (`%APPDATA%\Blume\logs\main.ndjson`), updater + IPC handlers serve

Two things the vendor binary does that the stock runtime doesn't (by design, not breakage):

- Deep-link protocol registration (`blume://`) is done by the vendor NSIS installer; the stock build doesn't register it until you run the app as admin once or import a `.reg` — the in-app deep-link handling itself is unchanged.
- The vendor exe is a patched Electron build (it accepts the `node:electron` module specifier, and its network service tolerates the app's boot behavior); the stock runtime needed no payload changes to boot, but if you diff behavior, that's the delta.

If you already have the vendor install, you can skip the Electron download entirely and overlay instead (the original recipe):

```powershell
# shell: vendor install without resources\app.asar; payload: this repo
Copy-Item <repo>\desktop\app\* <copy>\resources\app\ -Recurse -Force
& <copy>\blume.exe


### Verification (what we ran and you can re-run)

- `blume.exe --remote-debugging-port=9226`, then `rea list-electron-targets http://127.0.0.1:9226` → renderer must report `<your copy>\resources\app\out\renderer\index.html`
- Deep link: `rea capture-electron-scenario` with `blume://app/agents` → window navigates to `#/agents` (3/3 actions completed when run against the vendor shell)
- `%APPDATA%\Blume\logs\main.ndjson` → fresh `desktop release identity` (bundleId `blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9`), updater check, IPC handlers serving
- The app runs logged out; sign-in only unlocks cloud features
- **Self-contained recipe**: `desktop\build-and-run.ps1` on stock Electron 43.1.1 — window + 5 utility workers + network service + logger all live from the repo payload alone (no vendor installer)

## 3. The diagrams

```
cd diagrams
python -m http.server 8080      # or: npx serve
```

Open `Architecture.dc.html`, `Workflow.dc.html`, `Sequence.dc.html`. They render standalone; the server exists because some browsers block `file://` script loading (the `_runtime/` scripts). DevPin tokens are in `ds/devpin/tokens.json`; the pages carry the light-theme variables inline and follow the DevPin component conventions (surface-0 cards, `border`, radius 10, shadow-panel, brand `#1356c7`, status tints, Geist/Geist Mono).
