---
$schema: .github/schemas/project-docs-index.schema.json
schemaVersion: 2
title: Desktop
summary: Electron product runtime, local adapters, preview integration, and release-channel behavior.
overview: Blume’s packaged Electron shell composes the shared product with native window,
  filesystem, process, SQLite, updater, and IPC adapters. Product behavior remains in shared
  packages so Electron and Web Lab keep equivalent semantics.
responsibleFor:
  - id: electron-shell
    label: Electron shell
    description:
      Window lifecycle, main/preload boundaries, IPC wiring, menus, deep links, and native
      integration.
  - id: native-adapters
    label: Native adapters
    description: Composition of local filesystem, process, SQLite, harness, telemetry, and updater
      capabilities behind shared contracts.
  - id: desktop-packaging
    label: Desktop packaging
    description: Signed application packaging, channel configuration, and installed-client update integration.
notResponsibleFor:
  - id: shared-product-policy
    label: Shared product policy
    description: Use cases, domain rules, and reusable product behavior belong in app-core and domain packages.
  - id: shared-ui
    label: Shared product UI
    description: Reusable views and interactions belong in packages/sidecar/ui.
  - id: remote-services
    label: Remote service deployment
    description: Backend and Web Lab lifecycle is owned by deployment-set automation and the relevant services.
relatedProjects:
  - projectPath: packages/sidecar/ui
    description: Provides the shared product UI rendered by Electron.
  - projectPath: packages/sidecar/host-electron
    description: Implements the SidecarHost contract over Electron capabilities.
  - projectPath: packages/app/core
    description: Owns runtime-neutral product orchestration.
  - projectPath: packages/llm-router
    description: Provides managed-route model metadata and price formatting used during Pi setup.
  - projectPath: apps/web-lab
    description: Runs the same shared product through browser and runner adapters.
  - projectPath: services/desktop-updates
    description: Serves external updater feeds consumed by packaged desktop builds.
  - projectPath: services/router
    description: Provisions the managed Pi credential and serves the account-scoped model route.
deploymentSpecialCases:
  - id: local-preview-consumer
    title: Local preview consumer
    catalogIds:
      - desktop
    stages:
      - preview
    description: A PR does not host a preview desktop binary. pnpm dev resolves the exact pushed PR
      manifest and runs the local app against that isolated deployment set.
  - id: stable-starts-next-canary
    title: Stable promotion starts the next canary
    catalogIds:
      - desktop
    stages:
      - stable
      - canary
    description: After publishing the stable version, release automation publishes the next canary
      version from the same source SHA so both channels initially contain identical code.
pointers:
  - id: universal-links
    label: Clickable agent links
    target: apps/desktop/docs/universal-links.md
    description: Universal Link routing, Apple domain association, channel-specific signing prerequisites and physical Codex/Claude click verification.
    kind: runbook
    topics: [deep-links, desktop, website, signing, testing]
    audience: [agents, engineers, operators, reviewers]
  - id: deliveries-expected-process
    label: Expected delivery process
    description: Read before changing the plugin, MCP tools or test framework; defines how agents should run a delivery.
    target: apps/desktop/docs/deliveries/expected-delivery-process.md
    kind: guide
    topics: [deliveries, plugin, mcp, testing]
    audience: [agents, engineers, product]
  - id: deliveries-plugin-architecture-levers
    label: Plugin architecture levers
    description: Inventory of harness plugin, skill, hook and MCP capabilities to compose the plugin from.
    target: apps/desktop/docs/deliveries/plugin-architecture-levers.md
    kind: reference
    topics: [plugin, mcp, harnesses]
    audience: [agents, engineers]
  - id: deliveries-agent-messaging
    label: Agent messaging
    description: How agents and people message any agent on the account, and which plugin components deliver messages in each harness.
    target: apps/desktop/docs/deliveries/agent-messaging.md
    kind: architecture
    topics: [messaging, plugin, hooks, harnesses]
    audience: [agents, engineers, product]
  - id: deliveries-cloud-ledger
    label: Deliveries cloud ledger
    description: Which hosted Deliveries ledger a build uses, the local storage policy, and the release design of the hosted runtime.
    target: apps/desktop/docs/deliveries/cloud-ledger-cutover.md
    kind: runbook
    topics: [ledger, cloud, storage, release, plugin]
    audience: [agents, engineers, product]
  - id: deliveries-projects
    label: Projects
    description: How repositories group into projects, what agents see across repositories, and when Blume joins projects or asks first.
    target: apps/desktop/docs/deliveries/projects.md
    kind: architecture
    topics: [projects, repositories, setup, visibility]
    audience: [agents, engineers, product]
  - id: deliveries-ui-principles
    label: Deliveries UI principles
    description: Illustrated design contract for Deliveries screens.
    target: apps/desktop/docs/deliveries/ui-principles.md
    kind: reference
    topics: [design, ui]
    audience: [agents, engineers, reviewers]
  - id: deliveries-preview-development
    label: Running against a PR preview
    description: Read before testing hosted services from local Electron; covers PR manifest resolution in pnpm dev, required environment, fail-closed behavior and preview sign-in.
    target: apps/desktop/docs/deliveries/preview-development.md
    kind: guide
    topics: [deliveries, preview, auth, testing]
    audience: [agents, engineers]
  - id: deliveries-timeline-component
    label: Timeline component
    description: Variants, props and usage of the Deliveries phase timeline.
    target: apps/desktop/docs/deliveries/components/timeline.md
    kind: reference
    topics: [design, timeline]
    audience: [agents, engineers]
---
