# Clickable links from agent chats

Agents continue to share HTTPS links. They do not call `blume_open_app` as a side
effect of posting updates. A click can go through macOS's Universal Links handler
to Blume; the existing website remains the fallback for unsupported clients,
older apps and development-channel links.

## Contract and ownership

The website serves `/.well-known/apple-app-site-association` as JSON with no
redirect. Only `/open/deliveries/*` is associated. The stable app
`5YWNUNABHW.page.blume.sidecar` handles absent/empty `app` or `app=stable`; Canary
`5YWNUNABHW.page.blume.sidecar.canary` handles `app=canary`. Explicit other
channels are excluded from Stable. The team and bundle identifiers were checked
against the installed signed apps and existing release configuration.

The shared `@blume/app-core/app-links` decoder preserves valid delivery, task and
workspace IDs. Native receipt rejects wrong origins, channels, ambiguous IDs and
unsupported routes. Unknown query fields, including the existing per-link
`launch` nonce, never enter app navigation. Saved URLs have no expiry.

Electron registers `continue-activity` before asynchronous backend selection.
Browsing activities enter the same bounded startup queue as custom-scheme links;
only `details.webpageURL` is retained. Existing window delivery handles startup
and navigation. The local `deep link routed` log records `transport: universal-link`
or `custom-scheme`, so a browser's fallback cannot masquerade as direct receipt.
Rejected HTTPS destinations emit `deep link rejected` with a fixed reason and
transport, without recording the raw URL or its private identifiers.
Product behavior still uses the shared route table; Web Lab does not claim a
native association.

## Signing prerequisites and rollout

1. Enable Associated Domains for both explicit macOS App IDs in the Apple
   Developer account. Generate **Developer ID** provisioning profiles for each,
   using the existing release signing certificate. A wildcard App ID, App Store
   profile or development profile is not sufficient.
2. Store each profile's base64 encoding in the repository Actions secrets
   `MAC_PROVISION_PROFILE_STABLE` and `MAC_PROVISION_PROFILE_CANARY`. Do not commit
   profiles or signing keys. No certificate rotation is needed.
3. Deploy the website association through the website's normal Vercel main path.
   Verify a 200 JSON response, no redirect/authentication, and Apple's CDN copy:
   `https://app-site-association.cdn-apple.com/a/v1/blume.codes`.
4. Ship the desktop changes through the canonical reviewed release process.
   Release packaging selects only that channel's profile, validates its grant,
   embeds it and checks the **signed** main executable's entitlements. Helpers
   retain their original runtime entitlements and do not claim the association.
   After signing, the actual leaf certificate's SHA-256 must occur in the
   embedded profile's `DeveloperCertificates`; a mismatched certificate fails
   packaging. Certificate extraction uses a temporary directory outside the
   app, preserving sealed bundle bytes and any stapled notarization ticket.
   Missing/expired/wrong-channel profiles fail packaging rather than shipping an
   app that appears to support links but cannot establish trust.
5. On an isolated test installation, launch the signed app once. Verify macOS's
   domain approval and then the source-client matrix below. Keep Stable and
   Canary separate. Never claim a generic unsigned Electron dev build proves
   Universal Links.

Adding an entitlement changes signing. Before merge, the repository's Mac updater
safety gate requires signed/notarized physical update evidence: previous published
production source to the candidate through **Restart to Update**, with exact SHAs,
versions, bundle identities, feed, ZIP/DMG and latest-mac.yml integrity recorded.
Use the approved isolated certification process; a plain install or a future
canary-check promise is not equivalent. This change does not alter updater code,
feed paths, version selection or metadata generation.

For PR #1479 the owner explicitly approved the scoped Canary-first exception on
10 November 2026: “Approve Canary-first”. The preceding question covered merge
after code review/CI, Canary publication, deferred physical link/update tests,
Stable blocked, and possible manual reinstall after a signing failure. See the
agent-reported chat provenance in `docs/plans/universal-links.md`. This exception
applies only to #1479; the ordinary rule above remains unchanged. The
colleague-device test is cancelled. Keep verification issue #1522 open, inspect
the published signed artifacts, and record actual installed association, clicks
and Restart to Update results before any Stable promotion. Until then those
outcomes remain unverified.

The website can deploy first: old apps keep using the fallback. Roll back the
association file to stop future associations, allowing for Apple's/OS caches;
existing installed associations may persist. The fallback remains available.
Do not remove provisioning/signing grants from an otherwise released binary.

## Required click matrix

Record source app/version, macOS version, installed Blume version/source SHA,
signed identifier/profile, association response, initial browser tabs and the
exact saved URL. Use a disposable account and delivery on the selected test
deployment. Obtain a Markdown link in dedicated Codex and Claude Desktop chats
and a clickable URL from Claude Code in a terminal. Record the terminal name,
version and click gesture as well as the Claude Code version. Click each actual
rendered link, not the address bar, `open`, or the native tool.

For each client test Stable and Canary, cold and warm app state, a saved link
clicked twice, and task/workspace navigation. Observe all of:

- No browser tab/window appears as part of the successful direct handoff.
- The correct app/channel becomes visible at the expected destination.
- Its route log reports `transport: universal-link`.
- Older/absent apps and `app=dev` still have a usable website fallback.

If a client opens an embedded browser, record that behavior separately. OS trust,
client routing and user preference can each prevent direct opening. Never change
the system's default browser or reset the person's link preferences just to get a
passing result.

## Initial verification, 9 November 2026

- Codex and Claude Desktop are installed. Claude Code in a terminal is also in
  scope; record its version and terminal during the final matrix.
- The website PR preview serves the expected 817-byte association with HTTP 200
  and `application/json`. This proves serving on the preview, not OS association
  with the production domain.
- The public association endpoint currently returns **404 text/html**.
- This machine reports **0 valid code-signing identities**. Both explicit App IDs
  and Developer ID profiles were subsequently created with owner authorization;
  validated profiles are stored as `MAC_PROVISION_PROFILE_STABLE` and
  `MAC_PROVISION_PROFILE_CANARY` in repository Actions secrets. Each contains only
  the existing release certificate expiring 30 July 2031.
- The real profiles pass the preparation CLI, including Apple's string `*` domain
  grant. Profile/certification regression coverage: 82 passed.
- Existing updater certification uses a disposable bundle ID and trusted main
  signing configuration. It cannot serve as Universal Links click evidence for
  the real Stable/Canary identities; a matching signed candidate is still needed.
- Native parser/startup tests can run locally, but the modified signed app and
  public association are not yet deployed. Codex/Claude direct-click results are
  therefore **not tested**, not passed or failed.
- `swcutil verify` was attempted against the local file, but this macOS install
  requires root and passwordless sudo is unavailable. No system preferences were
  changed.

References: [Apple associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains),
[Apple Universal Link debugging](https://developer.apple.com/documentation/technotes/tn3155-debugging-universal-links),
[Electron continue-activity](https://www.electronjs.org/docs/latest/api/app#event-continue-activity-macos).
