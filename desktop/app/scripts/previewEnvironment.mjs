// Backend selection for `pnpm dev` (apps/desktop/scripts/dev.mjs).
//
// A checkout on a PR branch runs against that PR's Product PR Preview deployment set for its exact
// HEAD SHA and fails closed without it: no guessed account, no production fallback. The manifest
// replaces every product backend URL, including the hosted Deliveries runtime the delivery worker
// talks to (BLUME_CONTROL_REMOTE_ENDPOINT) and the same-PR Auth issuer. On `main` a missing main
// candidate manifest keeps the configured defaults. BLUME_USE_PRODUCTION_BACKENDS=1 is the explicit
// escape hatch and then needs the Deliveries runtime and Auth as explicit HTTPS origins.
import { execFileSync } from 'node:child_process'

import {
  PREVIEW_FRONT_HOST_SUFFIX,
  previewFrontOrigin,
  previewWorkerOrigin,
  validatePreviewDeploymentSetEnvelope
} from '@blume/insights-control'

const PRODUCTION_REGISTRY = 'https://blume-insights-control.agentic-cms-olav.workers.dev'
const HINT =
  'Or set BLUME_USE_PRODUCTION_BACKENDS=1 with explicit HTTPS BLUME_CONTROL_REMOTE_ENDPOINT and BLUME_AUTH_URL.'

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    timeout: 5_000
  }).trim()
}

export function currentSourceSha(cwd) {
  try {
    return run('git', ['rev-parse', 'HEAD'], cwd)
  } catch {
    return null
  }
}

export function currentBranchName(cwd) {
  try {
    return run('git', ['branch', '--show-current'], cwd)
  } catch {
    return null
  }
}

export function currentPullRequestNumber(cwd) {
  try {
    const result = JSON.parse(run('gh', ['pr', 'view', '--json', 'number'], cwd))
    return Number.isSafeInteger(result.number) && result.number > 0 ? result.number : null
  } catch {
    return null
  }
}

/** The PR's labels, or null when `gh` cannot read them. Used only to explain a missing preview. */
export function currentPullRequestLabels(cwd) {
  try {
    const result = JSON.parse(run('gh', ['pr', 'view', '--json', 'labels'], cwd))
    return Array.isArray(result.labels) ? result.labels.map((label) => label?.name) : null
  } catch {
    return null
  }
}

export const PREVIEW_ASLEEP_LABEL = 'preview-asleep'

export function previewWakeCommand(pr) {
  return `gh workflow run preview-wake.yml -f pr=${pr}`
}

function explicitHttpsOrigin(env, key) {
  const value = env[key]?.trim().replace(/\/+$/, '')
  if (
    !value ||
    !URL.canParse(value) ||
    new URL(value).protocol !== 'https:' ||
    new URL(value).origin !== value
  )
    throw new Error(`BLUME_USE_PRODUCTION_BACKENDS=1 needs ${key} as an explicit HTTPS origin.`)
  return value
}

/** Environment the desktop main process and its build receive from a validated preview set. */
export function previewBackendEnvironment(preview, sourceSha) {
  const services = preview.manifest.services
  return {
    BLUME_CONTROL_REMOTE_ENDPOINT: services.deliveriesRuntime.url,
    BLUME_AUTH_URL: services.auth.url,
    MAIN_VITE_BLUME_AUTH_URL: services.auth.url,
    BLUME_FEEDBACK_BOARD_URL: services.feedback.url,
    MAIN_VITE_BLUME_FEEDBACK_BOARD_URL: services.feedback.url,
    BLUME_USER_ANALYTICS_URL: services.userAnalytics.url,
    MAIN_VITE_BLUME_USER_ANALYTICS_URL: services.userAnalytics.url,
    BLUME_REFERRALS_URL: services.referrals.url,
    MAIN_VITE_BLUME_REFERRALS_URL: services.referrals.url,
    BLUME_INSIGHTS_CONTROL_URL: services.insights.url,
    MAIN_VITE_BLUME_INSIGHTS_CONTROL_URL: services.insights.url,
    BLUME_LLM_SERVICE_URL: services.llm.url,
    MAIN_VITE_LLM_SERVICE_URL: services.llm.url,
    BLUME_ROUTER_URL: services.router.url,
    MAIN_VITE_BLUME_ROUTER_URL: services.router.url,
    BLUME_ARTIFACT_SYNC_URL: services.artifactSync.url,
    MAIN_VITE_BLUME_ARTIFACT_SYNC_URL: services.artifactSync.url,
    BLUME_WEB_LAB_URL: services.webLab.url,
    BLUME_CLOUD_OWNER_URL: services.webLab.url,
    // The VPS runner is optional in a PR preview (manifest.omittedServices.runner says why).
    BLUME_RUNNER_URL: services.runner?.url ?? '',
    BLUME_RELEASE_CHANNEL: 'preview',
    BLUME_RELEASE_BUNDLE: preview.bundleId,
    BLUME_RELEASE_SHA: sourceSha,
    BLUME_BACKEND_DEPLOYMENT_ID: '',
    BLUME_BACKEND_BUNDLE_ID: '',
    BLUME_BACKEND_MANIFEST_URL: '',
    MAIN_VITE_BLUME_RELEASE_CHANNEL: '',
    MAIN_VITE_BLUME_RELEASE_VERSION: '',
    MAIN_VITE_BLUME_RELEASE_SHA: sourceSha,
    MAIN_VITE_BLUME_RELEASE_BUNDLE: preview.bundleId,
    MAIN_VITE_BLUME_DEPLOYMENT_REGISTRY_URL: ''
  }
}

/**
 * Selects the backends for a development launch and writes them into `env`.
 * Returns `{ mode: 'explicit' | 'preview' | 'defaults', ... }`; throws with the missing
 * prerequisite when a PR checkout cannot use its exact preview.
 */
export async function applyPullRequestPreviewEnvironment(
  env,
  {
    cwd,
    sourceSha = () => currentSourceSha(cwd),
    branchName = () => currentBranchName(cwd),
    pullRequestNumber = () => currentPullRequestNumber(cwd),
    pullRequestLabels = () => currentPullRequestLabels(cwd),
    fetchImpl = globalThis.fetch,
    log = console.log
  } = {}
) {
  if (env.BLUME_USE_PRODUCTION_BACKENDS === '1') {
    const endpoint = explicitHttpsOrigin(env, 'BLUME_CONTROL_REMOTE_ENDPOINT')
    const auth = explicitHttpsOrigin(env, 'BLUME_AUTH_URL')
    Object.assign(env, { BLUME_CONTROL_REMOTE_ENDPOINT: endpoint, BLUME_AUTH_URL: auth })
    log(`[pre-dev] backend environment: explicit production override · Deliveries ${endpoint}`)
    return { mode: 'explicit', endpoint }
  }
  const branch = branchName()
  const requirePreview = branch !== 'main'
  const sha = sourceSha()
  if (!sha || !/^[a-f0-9]{40}$/.test(sha)) {
    if (requirePreview)
      throw new Error(
        `Unable to resolve the exact HEAD commit, so no PR preview can be selected. ${HINT}`
      )
    return { mode: 'defaults' }
  }
  const pr = pullRequestNumber()
  if (requirePreview && !pr)
    throw new Error(
      `Branch ${branch || '(detached HEAD)'} has no resolvable PR preview. Open a draft PR, opt it in to previews with \`gh workflow run preview-wake.yml -f pr=<N>\`, and wait for Product PR Preview. ${HINT}`
    )
  const workersSubdomain = env.CLOUDFLARE_WORKERS_SUBDOMAIN?.trim() ?? ''
  // A PR's registry is its own Insights: in its Workers Preview behind the petal-preview.com
  // front, or (for a set deployed before step 5) its own workers.dev Worker.
  let expectedRegistries = []
  if (pr) {
    try {
      expectedRegistries = [
        previewFrontOrigin(`blume-insights-control-pr-${pr}`),
        previewWorkerOrigin(`blume-insights-control-pr-${pr}`, workersSubdomain)
      ]
    } catch {
      throw new Error(
        `PR #${pr}: set CLOUDFLARE_WORKERS_SUBDOMAIN to the configured preview account DNS label. ${HINT}`
      )
    }
  }
  const configured = env.BLUME_DEPLOYMENT_REGISTRY_URL?.trim().replace(/\/+$/, '')
  if (configured && expectedRegistries.length && !expectedRegistries.includes(configured))
    throw new Error(
      "Preview registry must be this exact PR's preview front or its configured workers.dev account."
    )
  const registries = configured
    ? [configured]
    : expectedRegistries.length
      ? expectedRegistries
      : [PRODUCTION_REGISTRY]
  const label = pr ? `PR #${pr}` : 'main'
  const request = async (url, what) => {
    try {
      return await fetchImpl(url, {
        headers: { 'cache-control': 'no-cache' },
        redirect: 'error',
        signal: AbortSignal.timeout(8_000)
      })
    } catch (error) {
      throw new Error(
        `${label}: ${what} is unreachable (${error instanceof Error ? error.message : String(error)}). ${HINT}`
      )
    }
  }
  // The PR's own Insights answers an unknown SHA with JSON; anything else means no set there.
  const absent = (candidate) =>
    candidate.status === 404 &&
    !(candidate.headers?.get?.('content-type') ?? '').includes('application/json')
  let response
  let registry = registries[0]
  for (const [index, candidate] of registries.entries()) {
    const last = index === registries.length - 1
    registry = candidate
    try {
      response = await request(`${candidate}/v1/preview-manifests/${sha}`, 'preview registry')
    } catch (error) {
      if (!last) continue
      if (requirePreview) throw error
      return { mode: 'defaults' }
    }
    if (last || !absent(response)) break
  }
  if (response.status === 404) {
    if (!requirePreview) return { mode: 'defaults' }
    // The PR's own Insights Worker answers an unknown SHA with JSON. Any other 404 means that
    // Worker does not exist: the preview is asleep (or was never deployed). Fail closed and say
    // how to wake it; never fall back to production.
    const contentType = response.headers?.get?.('content-type') ?? null
    if (pr && contentType !== null && !contentType.includes('application/json')) {
      const asleep = pullRequestLabels()?.includes(PREVIEW_ASLEEP_LABEL) ?? false
      throw new Error(
        asleep
          ? `${label}'s Product PR Preview is asleep or was never requested: previews are opt-in, an idle preview sleeps (after 24 hours, or 2 if nobody opted in), and an opted-in PR that changes no deployable path does not deploy. Wake it with \`${previewWakeCommand(pr)}\`, wait for Product PR Preview to finish (about 8 minutes), then run pnpm dev again.`
          : `${label} has no deployed Product PR Preview (it is asleep or not deployed yet). Wake or deploy it with \`${previewWakeCommand(pr)}\`, wait for Product PR Preview to finish, then run pnpm dev again.`
      )
    }
    throw new Error(
      `${label} has no ready Product PR Preview for ${sha.slice(0, 8)}. Push this exact commit and wait for the preview workflow. ${HINT}`
    )
  }
  if (!response.ok) {
    if (!requirePreview) return { mode: 'defaults' }
    throw new Error(`${label}: preview lookup returned HTTP ${response.status}.`)
  }
  const preview = validatePreviewDeploymentSetEnvelope(await response.json(), {
    workersSubdomain,
    ...(pr ? { pullRequestNumber: pr } : {}),
    sourceSha: sha
  })
  // A set served behind the front comes from the front's registry, and the reverse.
  if (pr && (preview.hosting === 'front') !== registry.endsWith(`.${PREVIEW_FRONT_HOST_SUFFIX}`))
    throw new Error(`${label}: the preview registry and its manifest disagree about hosting.`)
  const { auth, deliveriesRuntime } = preview.manifest.services
  if (!deliveriesRuntime?.url)
    throw new Error(`${label}: the preview set has no hosted Deliveries runtime.`)
  if (pr) {
    // The manifest is immutable, but the live runtime must still be this exact build.
    const health = await request(`${deliveriesRuntime.url}/health`, 'Deliveries runtime')
    const identity = health.ok ? await health.json().catch(() => null) : null
    const release = identity?.release
    if (
      identity?.ok !== true ||
      identity.component !== 'deliveriesRuntime' ||
      Object.keys(release ?? {})
        .sort()
        .join(',') !== 'bundleId,channel,sourceSha' ||
      release.channel !== 'preview' ||
      release.bundleId !== preview.bundleId ||
      release.sourceSha !== sha
    )
      throw new Error(`${label}: the Deliveries runtime does not report ${preview.bundleId}.`)
  }
  for (const [key, value] of [
    ['BLUME_AUTH_URL', auth.url],
    ['BLUME_CONTROL_REMOTE_ENDPOINT', deliveriesRuntime.url]
  ])
    if (env[key] && env[key].trim().replace(/\/+$/, '') !== value)
      throw new Error(`${key} conflicts with ${label}'s preview. Unset it.`)
  Object.assign(env, previewBackendEnvironment(preview, sha))
  log(`[pre-dev] backend environment: ${label} · ${preview.bundleId}`)
  return { mode: 'preview', pullRequestNumber: pr ?? null, bundleId: preview.bundleId }
}
