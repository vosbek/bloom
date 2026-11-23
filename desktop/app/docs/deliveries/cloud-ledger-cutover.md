# Moving Blume Deliveries to the cloud ledger

The Deliveries ledger and its MCP server run only in Cloudflare. In the `deliveries-runtime`
Worker, each account has an `AccountLedger` Durable Object that serves its ledger and MCP endpoint;
it wakes in milliseconds and costs nothing while idle. The Worker binds the channel's D1
database, which holds every workspace's ledger rows, and its R2 bucket, which holds evidence.
The database schema comes from `packages/storage/ledger/migrations`. Browsers run only in
single-use containers for a test run or a test generation. The app has no local ledger.

## What decides the ledger

| Build | Ledger |
|---|---|
| Packaged desktop build | The endpoint baked into the build (`MAIN_VITE_BLUME_CONTROL_REMOTE_ENDPOINT`): its own release's `blume-dlv-runtime-<backend id>`. The stable backend selection installed apps read does not carry `deliveriesRuntime`, so a backend hotfix does not move Deliveries (see below). The plugin installations the app made follow it to that runtime, on canary too (see "Keys outlive the Worker"). |
| Web Lab (canary, stable) | The same release's runtime, baked into the build (`VITE_DELIVERIES_RUNTIME_URL`); the runtime accepts only the release's Web Lab origins. |
| `pnpm dev` (desktop) | The checkout's PR preview for its exact head SHA (`apps/desktop/scripts/previewEnvironment.mjs`), or explicit HTTPS origins with `BLUME_USE_PRODUCTION_BACKENDS=1`. A PR branch without a ready preview fails at launch. |

The standalone Blume Deliveries app (`apps/control-plane`) and its preview DMG were retired when
Deliveries moved into the Blume desktop app.

## Local storage policy

Nothing for Deliveries is stored in local SQLite without Olav's approval. On this computer the
app keeps only its account session and GitHub token, both encrypted by the OS, in its user
data directory; Electron keeps its own browser caches there. Conversation
history that Blume parses on this computer (from the desktop app's parsers, when they come to
this app) stays local and is not uploaded.

There is no standalone ledger server. Package tests run the hosted routes in process on an
in-memory SQLite copy of the ledger schema, and Web Lab's fixture runtime keeps its ledger in the
browser.

## Release design (decided October 2026)

- **One release train.** Deliveries joins the coordinated Blume canary and stable releases,
  because the two apps are becoming one. `deliveries-runtime` is `release-coupled` in
  `.github/deploy/services.yaml`; PR Checks validates it on pull requests and `main`.
- **A versioned Worker, per-channel storage.** Each release deploys
  `blume-dlv-runtime-<backend id>` with the job container applications
  `blume-dlv-generation-<backend id>` and `blume-dlv-source-<backend id>`. The Worker binds the
  channel's D1 database (`blume-deliveries-canary`, `blume-deliveries`) and evidence bucket
  (`blume-deliveries-evidence-canary`, `blume-deliveries-evidence`), so ledgers survive every
  release. The release applies the migrations in `packages/storage/ledger/migrations` before it
  deploys the Worker. Migrations stay expand-only.
- **Registry.** Release records carry the `deliveries-runtime` component when Deliveries
  ships. The registry probes it with the rest of the backend set, cleans it up, and leaves it
  out of the stable backend selection installed apps read.
- **Keys outlive the Worker.** A canary or stable runtime binds agent connection tokens and plugin
  installation keys to its channel (`blume-release:canary`, `blume-release:stable`), not to its
  per-release address, which the next canary deletes. When the app's runtime moves within its
  channel, its automatic plugin update points each installation it made at the new runtime and
  keeps the key. Canary does not update plugins on its own, but it still makes this move, and
  only the move: each Claude Code and Codex installation the canary app made (its
  `blume-canary://plugin` app link) for an earlier `*.canary.blume-codes.com` runtime gets the
  new runtime as its endpoint (`.mcp.json` `BLUME_CONTROL_ENDPOINT` and `installation.json`
  `endpoint`), and keeps its key, version, files and icon (`pluginMoveDecision` in
  `packages/app/core/src/features/controlPlane/pluginUpdate.ts`, `setup update --endpoint
  --move-only`). Only a later release moves an installation, by the release order in each
  runtime's backend id (`bd-c-<run>-<attempt>`, `bd-s-<version>-<sha>`), never by plugin version,
  so reopening an older canary never moves it back to its deleted runtime; a newer plugin is never
  moved either. Setup moves or automatically updates an installation only while it is still the
  one the app decided on (app link, channel, version, endpoint, key hash), under a lock every
  setup holds, and journals a move so the next pass finishes or undoes a stopped one (and then
  moves it on to its own runtime); a journal whose installation was replaced since is set aside
  without writing (`packages/agent-mcp-node/src/pluginEndpointMove.ts`). E2E and
  partial dev profiles make no move. Installations from a copied command record no app link, so
  no app moves them; they keep the address they were installed with. A PR preview keeps keys
  bound to its own origin.
- **Hotfixes do not move Deliveries.** A backend hotfix deploys the other backends; installed apps
  keep the Deliveries runtime their release baked in, which binds its own release's Auth. Web Lab
  keeps that pair too: while the selection names no Deliveries runtime, it signs in at the Auth
  baked beside its runtime, because the runtime rejects another Auth's tokens
  (`apps/web-lab/src/backendConfig.ts`). Change Deliveries with a release.
- **Expand-only schema.** Every release of a channel reads one database at the same time, so
  migrations after the first only add (`packages/storage/ledger/src/migrationsExpandOnly.test.ts`
  enforces it).
- **Off at launch.** Releases set no Workers AI model (`WEB_TEST_WORKERS_AI_MODEL` is empty), so
  model-led test generation answers that hosted inference is not configured; agents write and
  run their own tests. Auth releases carry no Polar secrets, so checkout answers that billing is
  not configured. Turn either on with its secrets and a canary smoke first.
- **No import.** There are no Deliveries users yet, so existing local ledgers are not imported.

Details are in
[Deliveries in releases](../../../../services/deliveries-runtime/docs/preview.md#deliveries-in-releases).

## Before the first release that carries Deliveries (Olav)

1. Decide job container capacity. Accounts need no container; only test runs (`SourceRuntime`)
   and model-led test generation (`GenerationRuntime`) do, one single-use container per job.
   `max_instances` in `services/deliveries-runtime/wrangler.jsonc` is 3 for each, so at most
   three test runs and three generations run at once across all accounts; a further job cannot
   start until one finishes.
   Set the release numbers before real users arrive.
2. Merge PR #1000.
3. Let canonical Insights Control deploy from main (its workflow runs on the merge), so the
   registry accepts the Deliveries components before a release records them. Releases check this
   first: they stop before any deploy until `https://agents.blume-codes.com/health` reports
   `capabilities.deliveriesRuntime`.
4. Make sure the canary and stable `CLOUDFLARE_API_TOKEN` has Containers and Workers AI access
   besides Workers, and that `CLOUDFLARE_D1_API_TOKEN` can create D1 databases. The release
   runner (`ubuntu-latest`) builds the container images with Docker.
5. Start a canary release (`pnpm release:start -- canary --sha <main sha>` or the admin
   button). It creates the canary database and bucket, applies the ledger migrations, deploys
   the runtime Worker and checks its release identity.
6. After the canary is healthy, promote to stable through the normal stable release.

## Desktop builds

Deliveries is part of the one Blume app, built by the release workflows. A canary or stable build
bakes in its release's Deliveries runtime: the release workflows set
`MAIN_VITE_BLUME_CONTROL_REMOTE_ENDPOINT` to that release's `blume-dlv-runtime-<backend id>`
origin, beside the release's own Auth, and Web Lab gets the same origin as
`VITE_DELIVERIES_RUNTIME_URL`.

## Development plugin installs

Development installs that point at the old local ledger (`127.0.0.1:6211`) stop working. Before
the production release, remove them from `~/.claude` and `~/.codex`
(`node ~/.claude/blume-deliveries/blume-setup.mjs uninstall --harness claude`,
`node ~/.codex/blume-deliveries/blume-setup.mjs uninstall --harness codex`), delete the three
leftover `hooks.state."blume-deliveries@blume:hooks/hooks.json:*"` entries in
`~/.codex/config.toml`, and install the plugin again from the app's Plugin page, which now
installs against the hosted runtime.
