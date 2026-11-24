# NOTICE — what is ours and what is not

## Ours — MIT (see LICENSE)

| Path | Content |
|---|---|
| `README.md`, `docs/` | All reverse-engineering documentation, findings, evidence writeups |
| `diagrams/*.dc.html` | The three diagram pages we authored |
| `desktop/build-and-run.ps1` | The assembly/launch script |
| `website/serve.cjs` | The static server for the website mirror |
| `analysis/` | Repomix pack note + REA trace evidence (facts we derived) |
| `.gitattributes`, scaffolding | Repo glue |

| Path | What it is | Status |
|---|---|---|
| `desktop/app/` | The Blume desktop application payload, extracted verbatim from the shipped `app.asar` (v2.0.26) — minified bundles, `node_modules`, native binaries 
| `desktop/plugin-bundle/` | The agent-side MCP bridge shipped inside the app | Same terms as `desktop/app/` 
| `desktop/app-update.yml` | Vendor update manifest | Same as above |
| `website/` | A mirror of the public blume.codes site (HTML, JS chunks, images) | © Blume / its authors — public web assets, mirrored for offline study.
| `desktop/app/node_modules/**/LICENSE*` | Third-party package licenses (MIT/BSD/ISC etc.) | Must be retained; they govern those packages |

## Practical rules

- Use, copy, modify, and share everything under **MIT** freely.
- Treat the extracted vendor material as **reference-only**. Study it, run it
  locally, learn from it — but its copyright and reuse terms belong to its
  authors, and nothing in this repo changes that.

The repo's purpose is documentation and interoperability research on a lawfully
obtained copy of the software, with every claim traceable to evidence in
`docs/evidence.md`.
