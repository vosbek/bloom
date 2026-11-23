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

## 2. The desktop app from the reconstructed code

You need the shipped installer once (it carries the signed `blume.exe` and the Chromium runtime — 138 MB, sha512-signed by the vendor):

```
Blume-2.0.26-setup.exe /S          # silent NSIS install
```

Then build the reconstruction (PowerShell):

```powershell
$src = "$env:LOCALAPPDATA\Programs\@blumedesktop"
$dst = "C:\somewhere\bloom-local"           # your copy
New-Item -ItemType Directory -Force -Path "$dst\resources" | Out-Null

# shell: everything except the app payload and the uninstaller
Get-ChildItem $src | Where-Object { $_.Name -notin @('resources','Uninstall blume.exe') } |
  ForEach-Object { Copy-Item $_.FullName $dst -Recurse -Force }
Copy-Item "$src\resources\app-update.yml", "$src\resources\plugin-bundle", "$src\resources\elevate.exe" $dst\resources -Recurse -Force

# app: the extracted source from this repo
Copy-Item <repo>\desktop\app\* "$dst\resources\app\" -Recurse -Force

# natives: overlay the unpacked .node binaries from the original install
Copy-Item "$src\resources\app.asar.unpacked\*" "$dst\resources\app\" -Recurse -Force

& "$dst\blume.exe"
```

Electron loads `resources\app\` (a directory) in preference to `app.asar`, so the window runs **this repo's extracted code**, not the vendor archive.

### Verification (what we ran and you can re-run)

- `blume.exe --remote-debugging-port=9224`, then `rea list-electron-targets http://127.0.0.1:9224` → renderer must report `<your copy>\resources\app\out\renderer\index.html`
- Deep link: `rea capture-electron-scenario` with `blume://app/agents` → window navigates to `#/agents` (3/3 actions completed when run)
- `%APPDATA%\Blume\logs\main.ndjson` → fresh `desktop release identity` (bundleId `blume-2.0.26-bd358244228f4c4fa316832ce3ec57d2bd4b9ce9`), updater check, IPC handlers serving
- The app runs logged out; sign-in only unlocks cloud features

## 3. The diagrams

```
cd diagrams
python -m http.server 8080      # or: npx serve
```

Open `Architecture.dc.html`, `Workflow.dc.html`, `Sequence.dc.html`. They render standalone; the server exists because some browsers block `file://` script loading (the `_runtime/` scripts). DevPin tokens are in `ds/devpin/tokens.json`; the pages carry the light-theme variables inline and follow the DevPin component conventions (surface-0 cards, `border`, radius 10, shadow-panel, brand `#1356c7`, status tints, Geist/Geist Mono).
