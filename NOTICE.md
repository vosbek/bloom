# NOTICE — what is ours and what is not

This repository mixes two kinds of material. The license files draw the line
explicitly so nobody has to guess.

## Ours — MIT (see LICENSE)

| Path | Content |
|---|---|
| `README.md`, `docs/` | All reverse-engineering documentation, findings, evidence writeups |
| `diagrams/*.dc.html` | The three diagram pages we authored |
| `desktop/build-and-run.ps1` | The assembly/launch script |
| `website/serve.cjs` | The static server for the website mirror |
| `analysis/` | Repomix pack note + REA trace evidence (facts we derived) |
| `.gitattributes`, scaffolding | Repo glue |

## Not ours — third-party material, included as reference

| Path | What it is | Status |
|---|---|---|
| `desktop/app/` | The Blume desktop application payload, extracted verbatim from the shipped `app.asar` (v2.0.26) — minified bundles, `node_modules`, native binaries | © Blume Corporation. Reuse terms are documented at https://blume.codes/terms §3 (internal-use license only; no copy/modify/distribute) and §14 (no rights granted except §3). No open-source license exists for it. Kept as interoperability-research reference of a lawfully obtained copy. Do not treat as reusable under this repo's MIT license. |
| `desktop/plugin-bundle/` | The agent-side MCP bridge shipped inside the app | Same terms as `desktop/app/` — see https://blume.codes/terms §3, §14 |
| `desktop/app-update.yml` | Vendor update manifest | Same as above |
| `website/` | A mirror of the public blume.codes site (HTML, JS chunks, images) | © Blume / its authors — public web assets, mirrored for offline study. Not relicensed by us. |
| `desktop/app/node_modules/**/LICENSE*` | Third-party package licenses (MIT/BSD/ISC etc.) | Must be retained; they govern those packages |

## Practical rules

- Use, copy, modify, and share everything under **MIT** freely.
- Treat the extracted vendor material as **reference-only**. Study it, run it
  locally, learn from it — but its copyright and reuse terms belong to its
  authors, and nothing in this repo changes that.
- If Blume ever publishes an open-source license for their app, the NOTICE
  rows above for their material become superseded by it.

The repo's purpose is documentation and interoperability research on a lawfully
obtained copy of the software, with every claim traceable to evidence in
`docs/evidence.md`.
