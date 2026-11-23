# The plugin bridge — agent-side MCP surface

Source: `resources/plugin-bundle/` (copied verbatim to `desktop/plugin-bundle/`), REA-analyzed (8 modules parsed, 935,702 AST nodes, 1,407 findings, 0 parse failures).

## Files

| File | Role |
|---|---|
| `bridge.mjs` | The MCP server the harness spawns; connects to the app via `BLUME_CONTROL_ENDPOINT` + `BLUME_CONTROL_TOKEN` from the harness config (`mcpServers.blume.env`) |
| `setup.mjs` | Project/workspace setup operations |
| `hook.mjs` | The Claude Code hook entry |
| `claude-metadata.mjs` | Claude Code settings parsing (incl. corporate launchers, policyHelper chains, apiKeyHelper, AWS/GCP auth refresh) |
| `codex-session.mjs` | Codex session handling |
| `cloud-owner.mjs` | Cloud workspace access ("Cloud access is not enabled…") |
| `mac-command.mjs`, `mac-tools.mjs` | macOS integrations |
| `bundle.json` | Manifest v0.26.5, Node ≥ 24, per-file SHA-256 integrity map |

## Enforced trust rules (from bridge code)

- Endpoint must be loopback (`127.0.0.1` / `localhost`) **or** HTTPS — "Remote Blume connections require HTTPS"
- No credentials, query parameters or fragments in the endpoint URL
- Token required and non-empty; read back from the harness's own config, never inline

## Tool surface (call counts = occurrences across the bundle)

| Tool | Occurrences |
|---|---|
| `blume_request` | 89 |
| `blume_delivery_update` | 54 |
| `blume_delivery_get` | 50 |
| `blume_context` | 41 |
| `blume_setup` | 30 |
| `blume_messages` | 23 |
| `blume_inbox` | 20 |
| `blume_improve` / `_get` / `_update` | 16 / 12 / 9 |
| `blume_tests` / `blume_test_run` / `blume_tests_rerun` | 15 / 15 / 14 |
| `blume_checkpoint` | 14 |
| `blume_usage_resolve` | 9 |
| `blume_signal_record` | 9 |
| `blume_project_get` | 8 |

Environment variables: `BLUME_CONTROL_ENDPOINT`, `BLUME_CONTROL_TOKEN`, `BLUME_HOME`.

## The delivery contract embedded in tool prompts

From `deliveryWorker.js` (main-process side, mirrored in the site's fixture):

- A step's approval can be requested once its application is deployed to the step before it; "One step's approval never covers another."
- "Never drive the person's own app or account to check a step: use an instance of your own… signed in with a test account you create."
- "A localhost target is a local check whatever its label."
- Record deployments with kind `deployment`: application, step, url, commit, version.
- This conversation has no project yet → "Register or join its project first with `blume_setup op update` (resource project, operation create)…"
- Outdated plugin → "If `blume_tests op run` takes no application field, your Blume plugin is out of date: update it from the Blume app's Plugin page."
