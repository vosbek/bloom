# UI principle screenshot provenance

## Layout captures — 24 September 2026

These are crops of actual Blume control-plane Electron screenshots. They illustrate layout and styling with demo data, not evidence of backend behavior. Coordinates are source pixels `(left, top, right, bottom)`. No UI was reconstructed or recolored. The layout agent did not navigate or resize the live window.

| Asset | Source | Crop / output | Scope and limitations |
| --- | --- | --- | --- |
| `layout-sidecar-two-tabs.png` | `/tmp/sidecar-two-tabs.png`, implementation task, 16:49 | `(0,108,400,286)` → 400×178 | Untabbed right column becomes Overview + Linked tasks. Current screenshot supplied by implementation task. |
| `layout-subpage-shadow-junction.png` | `/tmp/subpage-shadows.png`, implementation task, 17:07 | `(80,120,600,350)` → 520×230 | Header and scenario sidebar shadow into sub-page content. Subtle shadows intentionally retained unchanged. |
| `layout-base-shadow-junction.png` | `/tmp/notifications-sidecard-1440.png`, implementation task, 17:00 | `(65,65,585,295)` → 520×230 | Base pagebar/sidebar junction for comparison. Notification sidecard is visible in sidebar; crop is about boundary shadows, not notification styling. |
| `layout-sidecar-flush-task.png` | `/tmp/sidecar-flush-task.png`, implementation task, 16:20 | `(0,109,400,291)` → 400×182 | Flush sidecar task surface using main-content background. Earlier capture; navigation details and header weights may have evolved. |
| `layout-sidecar-overview-tabs.png` | `/tmp/sidecar-reviewed.png`, implementation task, 16:09 | `(0,109,400,220)` → 400×111 | Overview followed by supporting column tabs. Earlier capture predates latest phase graph; use only for tab conversion. |
| `layout-expanded-regions.png` | `/tmp/subpage-shadows.png`, implementation task, 17:07 | `(80,120,1428,343)` scaled to 900×149 | Restrained wide exception showing scenario list → evidence → linked tasks together. Text is reduced; dedicated crops show details. |
| `layout-empty-delivery-purpose.png` | `/tmp/docs-components-empty.png`, docs component capture agent, captured this documentation session | `(449,148,1057,470)` scaled to 520×275 | Unselected delivery explains purpose and primary action in the main area. |
| `layout-empty-delivery-steps.png` | `/tmp/docs-components-empty.png`, docs component capture agent, captured this documentation session | `(1081,115,1436,475)` → 355×360 | Separate right card contains How to use Blume and process steps. Shows first two steps to keep screenshot focused. |

Window expansion animation and preservation of native monitor/height cannot be proved by these still screenshots. Existing captures supplied by the implementation task were used to avoid conflicting with active UI work. The empty-state source was captured fresh by the component screenshot agent; outdated `/tmp/blume-process-guide.png` was rejected because it predates the main/right-column split.

## Component captures — 24 September 2026

Captured fresh from the running Blume Deliveries control-plane Electron renderer (`http://localhost:5197/`, local CDP 9237) using app-only `Page.captureScreenshot`. The window was 1440×933; these assets are tight, unscaled crops. Demo data is illustrative. No UI was reconstructed, recolored, or repositioned for capture.

| Assets | Full capture source | What the crop illustrates |
| --- | --- | --- |
| `components-tabs-counts.png`, `components-test-review-badges.png`, `components-phase-badge.png`, `components-delivery-list.png` | `/tmp/docs-components-full.png` | Selected Plan delivery, Tests card tab, separate outcome/review badges, canonical phase badge, delivery list content. |
| `components-delivery-board.png` | `/tmp/docs-components-board.png` | The same Plan delivery in Board mode; matching title, phase, task progress, and segmented progress indicator. |
| `components-section-header.png` | `/tmp/docs-components-empty.png` | How to use Blume section header: SN Pro emphasis, small concept icon, and divider. |
| `components-entity-header.png`, `components-detail-tabs.png`, `components-task-states-tree.png`, `components-task-number-status.png`, `components-breadcrumb-task-icons.png` | `/tmp/docs-components-entity.png` | Compare interview findings task: emphasized Task prefix, regular name, detail tabs, nested task states/numbers, and task icons in breadcrumbs. |

The capture session clicked the existing List/Board controls, selected the Plan delivery, opened its Tasks tab, and opened a child task. This establishes that those destinations were reached in the live renderer. These still images document appearance only: they do not verify hover parity, keyboard navigation, animations, persistence, status derivation, backend data, or every viewport. No keyboard behavior was tested by the component capture agent. Live-app control was handed to the navigation capture agent afterward.

## Navigation and evidence captures — 24 September 2026

Captured from the control-plane Electron renderer via local CDP port 9237. This is the real shared UI with illustrative demo delivery/test data; screenshots do not prove test execution. No task/review/approval data was changed.

- `navigation-subpage-shadow.png`, `navigation-expanded-close.png`, `navigation-bottom-review-bar.png`, `navigation-scenario-reviewed.png`, `navigation-evidence-pair.png`: focused crops of `/tmp/subpage-shadows.png`, captured by the implementation task at 17:07. Before/after pair scaled to 520px wide; other crops retain natural size. The pair includes the step number and shows screenshot grouping, not successful test execution.
- `navigation-revision-approval.png`, `navigation-step-timeline.png`, `navigation-review-progress.png`, `navigation-disclosure-closed.png`: captured during this documentation session from verification, source `/tmp/docs-navigation-verification.png`. Approval was already recorded in the demo; no approval button was pressed.
- Expanded verification was opened via the actual Start the review control. Technical details was clicked, but the renderer returned to its empty selection before the open-state capture, so no open-state image is retained or claimed.
- These images do not establish keyboard history, reduced-motion behavior, native resizing, or gallery keyboard behavior. Further capture stopped after repeated unexpected navigation resets to avoid fighting another active session.

### Successful final navigation pass

After implementation hot reload finished, verification remained stable. `navigation-gallery-tools.png`, `navigation-gallery-controls.png`, and `navigation-screenshot-guidance.png` are focused crops of the current screenshot dialog (`/tmp/docs-navigation-gallery.png`). The guidance tool has the app's visible focus ring. Dispatching ArrowRight to the dialog advanced its counter from Before · 1 / 2 to After · 2 / 2; this checks the shared keyboard handler, not native OS keyboard dispatch. Closed the gallery using its Close capture button. `navigation-disclosure-open.png` then captures the same Technical details section expanded with recorded log content. App left on verification with technical details open; no revision approval or review mutations were performed.

- `navigation-sidecar-back.png`: crop `(0,108,124,157)` of implementation-task `/tmp/sidecar-two-tabs.png`; shows the concise Scenarios return label, not a history test.

## Layout-system additions, 24 September 2026

Captured from the running control-plane Electron renderer in this checkout:

- `layout-shell-hierarchy.png`: app navigation, page bar, and workspace junction.
- `layout-columns-overview.png`: Columns with primary list, main content, and supporting card.
- `layout-custom-board.png`: Custom with the delivery kanban board.

These are cropped runtime screenshots. They demonstrate spatial hierarchy, not
navigation behavior or correctness of the illustrative delivery data. The guide
uses wider strips only where the relationship between regions must remain visible.

## Shared timeline, 24 September 2026

`timeline-shared-steps.png` and `timeline-shared-events.png` are focused crops from
the migrated Electron verification and phase-history views. Keyboard Enter/Space,
graph-driven reveal, reduced motion, and compact overflow were checked separately.
