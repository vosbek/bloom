# REA traces — through the 19,370-module application graph

Method: `rea analyze-javascript-application` on `resources/app.asar` → 19,370 modules, 7,732 JS files parsed, 5,438,916 AST nodes, 151,643 findings, complete-within-view. Evidence record `ev_73949f6190d98c73e78eb54e258961ce0b4ea941d8f51c4e5c83a6994465db62`.

Then `rea trace-application-feature` per seed (direction: both) through that graph.

## Results

| Seed | Matches | Traced nodes / edges | Terminal paths | Facts (observed + inferred) |
|---|---|---|---|---|
| `db:conversations:refresh` | 4 | 725 / 726 | 168 | 223 + 1,229 |
| `wrapped:generateWeek` | 4 | 725 / 726 | 168 | 223 + 1,229 |
| `terminal:attach` (+`onTerminalOutput`) | 5 | 734 / 741 | 170 | 226 + 1,257 |
| `BLUME_CONTROL_TOKEN` | 0 | — | — | literal lives in `plugin-bundle` evidence (`ev_36f6a81a…`), not the ASAR |
| `blume://app/agents` | 0 | — | — | URL built at runtime; path proven live (deep-link scenario → `#/agents`) |

Edge census per trace: ~155 `invokes`, ~189 `contains`, ~177 `calls`, ~172 `maps_to`, 15 `handles`, ~9-18 `imports`, 4 `sends`, 5 `exposes`.

## The preload pattern (the structural finding)

Every IPC channel resolves through one bridge file:

```
channel literal → out/preload/index.js → api.<method> closure → electron.ipcRenderer.invoke|on
```

Sample recovered terminal paths:

```
db:conversations:refresh → preload/index.js → api.openTerminalPage    → ipcRenderer.invoke
db:conversations:refresh → preload/index.js → api.getReferralStatus    → ipcRenderer.invoke
db:conversations:refresh → preload/index.js → api.listProjects         → ipcRenderer.invoke
db:conversations:refresh → preload/index.js → api.onMenuCommand        → ipcRenderer.on
wrapped:generateWeek     → preload/index.js → api.listConversationsForView → ipcRenderer.invoke
api.onTerminalOutput      → preload/index.js → api.accountSignIn        → ipcRenderer.invoke
api.onTerminalOutput      → preload/index.js → api.getLogFilePath      → ipcRenderer.invoke
```

This corrects the flat Electron summary (`preload_entrypoints: 0`): the preload exists and maps all 154 channels.

## Raw evidence

`analysis/traces/trace-{conv,wrapped,terminal,token,deeplink}-out.json` — REA Evidence records, self-verifying (each carries its own identity, provenance, coverage and limitations). Read them with:

```
rea trace-application-feature <seed-request.json> --evidence-bundle asar-evidence.json
```

(the 1 GB `asar-evidence.json` is not committed; regenerate with the command at the top of this file)

## Website-side deep graph (context)

The same method on the captured site scripts (109 files) with raised semantic precision: 509 modules, semantic relation graph with 68,920 retained unknowns; flower-feature trace = 707 nodes / 1,792 edges / 59 terminal paths, including 19 `persists_to` localStorage edges (`flowerStore → DeliveriesAppWindow → DeliveryList → local-storage`) and two lazy chunks (`FactoryBoardAppWindow`, `AutonomousAppWindow`) the homepage references but the server 404s.
