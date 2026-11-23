import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'vitest'

import {
  applyStableBackendManifest,
  applyBundledBackendDefaults,
  bundledStableBackendManifest,
  OPTIONAL_STABLE_BACKEND_ENV,
  parseSelectedStableBackendManifest,
  stableBackendResponseError,
  StableVersionRetiredError,
  parseStableBackendManifest,
  STABLE_BACKEND_ENV
} from '../../src/main/backendManifest'
import {
  isStableBackendRetirementTombstone,
  readBackendManifestCacheFile,
  stableBackendRetirementTombstone,
  writeBackendManifestCacheFile
} from '../../src/main/backendManifestCache'

test('explicit development backend overrides survive bundled defaults but packaged defaults win', () => {
  const bundled = {
    BLUME_ROUTER_URL: 'https://signed.example',
    BLUME_AUTH_URL: 'https://auth.example'
  }
  const dev = { BLUME_ROUTER_URL: 'http://127.0.0.1:8787' }
  applyBundledBackendDefaults(bundled, dev, false)
  assert.equal(dev.BLUME_ROUTER_URL, 'http://127.0.0.1:8787')
  assert.equal((dev as Record<string, string>).BLUME_AUTH_URL, 'https://auth.example')
  applyBundledBackendDefaults(bundled, dev, true)
  assert.equal(dev.BLUME_ROUTER_URL, 'https://signed.example')
})

test('selected stable manifest validation is delegated to the shared product contract', () => {
  const source = readFileSync(new URL('../../src/main/backendManifest.ts', import.meta.url), 'utf8')
  assert.match(source, /validateStableBackendSelection[\s\S]*from '@blume\/insights-control'/)
  assert.match(source, /validateStableBackendSelection\(value, version, expectedBundleId\)/)
  assert.doesNotMatch(source, /expectedServices|components\?\.filter/)
})

test('retirement is terminal while unpublished and unavailable manifests remain retriable', () => {
  assert.ok(stableBackendResponseError(426, '1.2.3') instanceof StableVersionRetiredError)
  assert.equal(stableBackendResponseError(404, '1.2.3').message, 'HTTP 404')
})

test('bootstrap checks HTTP status before consuming a manifest response', () => {
  const source = readFileSync(
    new URL('../../src/main/backendManifestBootstrap.ts', import.meta.url),
    'utf8'
  )
  assert.match(
    source,
    /if \(!response\.ok\) throw stableBackendResponseError\(response\.status, version\)\s+const payload: unknown = await response\.json\(\)/
  )
  for (const status of [400, 401, 403, 404, 429, 500, 503]) {
    const error = stableBackendResponseError(status, '1.2.3')
    assert.equal(error.message, `HTTP ${status}`)
    assert.ok(!(error instanceof StableVersionRetiredError))
  }
})

test('persists identity-bound retirement and atomically replaces the desktop cache', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'blume-desktop-backend-cache-'))
  const cachePath = join(directory, 'backend.json')
  try {
    await writeBackendManifestCacheFile(cachePath, { generation: 1 })
    await writeBackendManifestCacheFile(cachePath, { generation: 2 })
    assert.deepEqual(JSON.parse(await readFile(cachePath, 'utf8')), { generation: 2 })
    assert.deepEqual(await readdir(directory), ['backend.json'])

    const tombstone = stableBackendRetirementTombstone('1.2.3', 'bundle-123')
    await writeBackendManifestCacheFile(`${cachePath}.retired`, tombstone)
    const persisted = await readBackendManifestCacheFile(`${cachePath}.retired`)
    assert.equal(isStableBackendRetirementTombstone(persisted, '1.2.3', 'bundle-123'), true)
    assert.equal(isStableBackendRetirementTombstone(persisted, '1.2.3', 'other-bundle'), false)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

function stableServiceUrl(name: string, backendDeploymentId: string): string {
  const worker =
    ({ userAnalytics: 'analytics', artifactSync: 'artifact-sync' } as Record<string, string>)[
      name
    ] ?? name
  const domain = name === 'llm' ? 'agentic-cms-olav.workers.dev' : 'release.blume-codes.com'
  return `https://blume-${worker}-${backendDeploymentId}.${domain}`
}

const canonicalServices: Record<string, string> = {
  auth: 'https://auth.blume-codes.com',
  feedback: 'https://feedback.blume-page.com',
  userAnalytics: 'https://analytics.blume-page.com',
  referrals: 'https://referrals.blume-page.com',
  insights: 'https://blume-insights-control.agentic-cms-olav.workers.dev',
  llm: 'https://blume-llm-service.agentic-cms-olav.workers.dev',
  router: 'https://router.blume-page.com'
}

function envelope(version = '1.2.3') {
  return {
    version,
    channel: 'stable',
    bundleId: 'bundle-123',
    manifest: {
      services: Object.fromEntries(
        Object.keys(STABLE_BACKEND_ENV).map((name) => [name, { url: canonicalServices[name] }])
      )
    }
  }
}

function selectedEnvelope(
  version = '1.2.3',
  backendDeploymentId = `bd-s-${version.replaceAll('.', '-')}-aaaaaaaaaaaa`
) {
  const value = envelope(version)
  const sourceSha = 'a'.repeat(40)
  const backendBundleId = `backend-${version}`
  value.manifest = {
    ...value.manifest,
    schemaVersion: 1,
    version,
    channel: 'stable',
    bundleId: backendBundleId,
    sourceSha
  }
  value.manifest.services = Object.fromEntries(
    [...Object.keys(STABLE_BACKEND_ENV), 'artifactSync'].map((name) => [
      name,
      { url: stableServiceUrl(name, backendDeploymentId) }
    ])
  )
  return {
    ...value,
    backendDeploymentId,
    backendBundleId,
    sourceSha,
    components: Object.entries(value.manifest.services).map(([name, service]) => ({
      name:
        name === 'userAnalytics'
          ? 'user-analytics'
          : name === 'artifactSync'
            ? 'artifact-sync'
            : name,
      url: service.url
    }))
  }
}

test('accepts only a complete exact-version stable backend manifest', () => {
  assert.equal(parseStableBackendManifest(envelope(), '1.2.3', 'bundle-123').bundleId, 'bundle-123')
  assert.throws(
    () => parseStableBackendManifest(envelope('1.2.4'), '1.2.3', 'bundle-123'),
    /does not match/
  )
  assert.throws(
    () => parseStableBackendManifest(envelope(), '1.2.3', 'different-bundle'),
    /does not match/
  )
  const missing = envelope()
  delete missing.manifest.services.auth
  assert.throws(() => parseStableBackendManifest(missing, '1.2.3', 'bundle-123'), /missing auth/)
  const deceptive = envelope()
  deceptive.manifest.services.auth.url = 'http://attacker.test'
  assert.throws(() => parseStableBackendManifest(deceptive, '1.2.3', 'bundle-123'), /missing auth/)
})

test('accepts a version-scoped backend hotfix while preserving the signed app bundle identity', () => {
  const hotfix = selectedEnvelope('1.2.3', 'bd-h-123-1')
  hotfix.backendBundleId = 'backend-hotfix-1.2.3-123-1'
  hotfix.manifest.bundleId = hotfix.backendBundleId
  const parsed = parseSelectedStableBackendManifest(hotfix, '1.2.3', 'bundle-123')
  assert.equal(parsed.bundleId, 'bundle-123')
  assert.equal(parsed.backendBundleId, 'backend-hotfix-1.2.3-123-1')
})

test('accepts the set LLM on its release hostname (blume-cloud) and its workers.dev host', () => {
  const id = 'bd-s-1-2-3-aaaaaaaaaaaa'
  for (const url of [
    `https://blume-llm-${id}.release.blume-codes.com`,
    `https://blume-llm-${id}.agentic-cms-olav.workers.dev`
  ]) {
    const selected = selectedEnvelope('1.2.3', id)
    selected.manifest.services.llm.url = url
    selected.components.find((component) => component.name === 'llm')!.url = url
    const parsed = parseSelectedStableBackendManifest(selected, '1.2.3', 'bundle-123')
    assert.equal(parsed.manifest.services.llm.url, url)
  }
  for (const url of [
    `https://blume-llm-${id}.canary.blume-codes.com`,
    `https://blume-llm-bd-s-9-9-9-bbbbbbbbbbbb.release.blume-codes.com`,
    `https://blume-auth-${id}.release.blume-codes.com`
  ]) {
    const selected = selectedEnvelope('1.2.3', id)
    selected.manifest.services.llm.url = url
    selected.components.find((component) => component.name === 'llm')!.url = url
    assert.throws(() => parseSelectedStableBackendManifest(selected, '1.2.3', 'bundle-123'), url)
  }
})

test('rejects registry payloads without full selected-deployment identity', () => {
  assert.throws(
    () => parseSelectedStableBackendManifest(envelope(), '1.2.3', 'bundle-123'),
    /missing its selected deployment identity/
  )
  const selected = selectedEnvelope()
  const artifactSync = selected.components.find((component) => component.name === 'artifact-sync')
  assert.ok(artifactSync)
  artifactSync.url = 'https://different.example.test'
  assert.throws(
    () => parseSelectedStableBackendManifest(selected, '1.2.3', 'bundle-123'),
    /does not match artifact-sync/
  )

  const duplicated = selectedEnvelope()
  duplicated.components.push(duplicated.components[0])
  assert.throws(
    () => parseSelectedStableBackendManifest(duplicated, '1.2.3', 'bundle-123'),
    /exactly one entry per service/
  )

  const extra = selectedEnvelope()
  extra.manifest.services.unexpected = { url: 'https://unexpected.example.test' }
  extra.components.push({ name: 'unexpected', url: 'https://unexpected.example.test' })
  assert.throws(
    () => parseSelectedStableBackendManifest(extra, '1.2.3', 'bundle-123'),
    /exactly these services/
  )
})

test('rejects credential-bearing backend URLs', () => {
  const selected = selectedEnvelope()
  selected.manifest.services.auth.url = 'https://token@example.test'
  assert.throws(
    () => parseSelectedStableBackendManifest(selected, '1.2.3', 'bundle-123'),
    /missing the auth HTTPS endpoint/
  )
})

test('rejects hostile selected and cached fallback destinations before changing environment', () => {
  for (const url of [
    'https://attacker.example',
    'https://blume-auth-bd-s-1-2-3-aaaaaaaaaaaa.release.blume-codes.com:443',
    'https://auth.blume-codes.com?redirect=attacker',
    'https://auth.blume-codes.com#fragment'
  ]) {
    for (const value of [envelope(), selectedEnvelope()]) {
      value.manifest.services.auth.url = url
      if ('components' in value)
        value.components.find((component) => component.name === 'auth')!.url = url
      const env = { BLUME_AUTH_URL: canonicalServices.auth, BLUME_RELEASE_BUNDLE: 'original' }
      assert.throws(() =>
        applyStableBackendManifest(parseStableBackendManifest(value, '1.2.3', 'bundle-123'), env)
      )
      assert.deepEqual(env, {
        BLUME_AUTH_URL: canonicalServices.auth,
        BLUME_RELEASE_BUNDLE: 'original'
      })
    }
  }
})

test('signed fallback accepts generated stable origins as well as exact legacy service hosts', () => {
  const value = selectedEnvelope()
  const urls = Object.fromEntries(
    Object.entries(STABLE_BACKEND_ENV).map(([service, envName]) => [
      envName,
      value.manifest.services[service].url
    ])
  )
  const bundled = bundledStableBackendManifest('1.2.3', 'bundle-123', urls)
  assert.equal(bundled.manifest.services.auth.url, value.manifest.services.auth.url)
  const confused = envelope()
  confused.manifest.services.auth.url = canonicalServices.router
  assert.throws(() => parseStableBackendManifest(confused, '1.2.3', 'bundle-123'), /missing auth/)
})

test('applies an optional Artifact Sync endpoint without breaking older stable manifests', () => {
  const current = envelope()
  current.manifest.services.artifactSync = { url: 'https://sync.blume-codes.com' }
  const env: NodeJS.ProcessEnv = {}
  applyStableBackendManifest(parseStableBackendManifest(current, '1.2.3', 'bundle-123'), env)
  assert.equal(
    env[OPTIONAL_STABLE_BACKEND_ENV.artifactSync],
    current.manifest.services.artifactSync.url
  )

  const invalid = envelope()
  invalid.manifest.services.artifactSync = { url: 'http://sync.invalid' }
  assert.throws(
    () => parseStableBackendManifest(invalid, '1.2.3', 'bundle-123'),
    /missing optional artifactSync endpoint/
  )
})

test('uses a complete embedded bundle when the registry and cache are unavailable', () => {
  const urls = Object.fromEntries(
    Object.entries(STABLE_BACKEND_ENV).map(([service, envName]) => [
      envName,
      canonicalServices[service]
    ])
  )
  const manifest = bundledStableBackendManifest('1.2.3', 'signed-bundle', urls)
  assert.equal(manifest.bundleId, 'signed-bundle')
  assert.deepEqual(
    Object.keys(manifest.manifest.services).sort(),
    Object.keys(STABLE_BACKEND_ENV).sort()
  )
})

test('applies every endpoint before the main process loads', () => {
  const env: NodeJS.ProcessEnv = {}
  applyStableBackendManifest(parseStableBackendManifest(envelope(), '1.2.3', 'bundle-123'), env)
  assert.equal(env.BLUME_AUTH_URL, canonicalServices.auth)
  assert.equal(env.BLUME_LLM_SERVICE_URL, canonicalServices.llm)
  assert.equal(env.BLUME_ROUTER_URL, canonicalServices.router)
  assert.equal(env.BLUME_RELEASE_BUNDLE, 'bundle-123')
})

test('development preview selection fails closed when the source SHA cannot be resolved', () => {
  const launcher = readFileSync(
    new URL('../../scripts/previewEnvironment.mjs', import.meta.url),
    'utf8'
  )
  const branchLookup = launcher.indexOf('const branch = branchName()')
  const sourceLookup = launcher.indexOf('const sha = sourceSha()')
  const missingSourceGuard = launcher.indexOf('if (!sha || !/^[a-f0-9]{40}$/.test(sha)) {')

  assert.ok(branchLookup >= 0)
  assert.ok(sourceLookup > branchLookup)
  assert.ok(missingSourceGuard > sourceLookup)
  assert.match(
    launcher.slice(missingSourceGuard, missingSourceGuard + 500),
    /if \(requirePreview\)[\s\S]*?Unable to resolve the exact HEAD commit/
  )
})

test('invalid cached stable manifests fall back to the embedded signed bundle', () => {
  const bootstrap = readFileSync(
    new URL('../../src/main/backendManifestBootstrap.ts', import.meta.url),
    'utf8'
  )

  // An unreadable or invalid cache reads as no cache at all...
  assert.match(
    bootstrap,
    /parseSelectedStableBackendManifest\(\s*await readBackendManifestCacheFile\(cachePath\),\s*version,\s*bundleId\s*\)[\s\S]*?\} catch \{\s*return null/
  )
  // ...and without a cache an unreachable registry starts on the embedded signed bundle.
  assert.match(
    bootstrap,
    /: await fromRegistry\.catch\([\s\S]*?return bundledStableBackendManifest\(version, bundleId, process\.env\)/
  )
})

test('a cached stable selection bounds how long launch waits for the registry', () => {
  const bootstrap = readFileSync(
    new URL('../../src/main/backendManifestBootstrap.ts', import.meta.url),
    'utf8'
  )

  assert.match(bootstrap, /const CACHED_REGISTRY_WAIT_MS = 1_500/)
  assert.match(
    bootstrap,
    /cached\s*\?\s*await Promise\.race\(\[[\s\S]*?StableVersionRetiredError\) throw error[\s\S]*?setTimeout\(\(\) => resolve\(cached\), CACHED_REGISTRY_WAIT_MS\)/
  )
})

test('a cache write failure cannot discard a validated registry selection', () => {
  const bootstrap = readFileSync(
    new URL('../../src/main/backendManifestBootstrap.ts', import.meta.url),
    'utf8'
  )

  assert.match(bootstrap, /redirect: 'error'/)
  assert.match(
    bootstrap,
    /const manifest = parseSelectedStableBackendManifest\(payload, version, bundleId\)[\s\S]*?try \{[\s\S]*?writeBackendManifestCacheFile\(cachePath, manifest\)[\s\S]*?\} catch \(cacheError\) \{[\s\S]*?selected registry backend/
  )
})

test('hybrid desktop selects the hosted Deliveries endpoint from its backend set', () => {
  const value = envelope()
  const url = 'https://blume-dlv-runtime-bd-s-1-2-3-aaaaaaaaaaaa.release.blume-codes.com'
  value.manifest.services.deliveriesRuntime = { url }
  const parsed = parseStableBackendManifest(value, '1.2.3', 'bundle-123')
  const env: NodeJS.ProcessEnv = {}
  applyStableBackendManifest(parsed, env)
  assert.equal(env.BLUME_CONTROL_REMOTE_ENDPOINT, url)
  value.manifest.services.deliveriesRuntime = { url: 'http://localhost:6211' }
  assert.throws(() => parseStableBackendManifest(value, '1.2.3', 'bundle-123'), /deliveriesRuntime/)
})

test('stable cloud keeps its signed origin while selected backend identity replaces the default', () => {
  const origin = 'https://blume-web-lab-release-1-2-3-aaaaaaaa.release.blume-codes.com'
  const env: NodeJS.ProcessEnv = {}
  applyBundledBackendDefaults(
    {
      BLUME_CLOUD_OWNER_URL: origin,
      BLUME_BACKEND_DEPLOYMENT_ID: 'bd-s-1-2-3-aaaaaaaaaaaa'
    },
    env,
    true
  )
  // A registry outage retains the signed cloud pair when applying the embedded fallback.
  const fallback = bundledStableBackendManifest(
    '1.2.3',
    'bundle-123',
    Object.fromEntries(
      Object.entries(STABLE_BACKEND_ENV).map(([service, name]) => [
        name,
        canonicalServices[service]
      ])
    )
  )
  applyStableBackendManifest(fallback, env)
  assert.equal(env.BLUME_CLOUD_OWNER_URL, origin)
  assert.equal(env.BLUME_BACKEND_DEPLOYMENT_ID, 'bd-s-1-2-3-aaaaaaaaaaaa')

  // Web Lab verifies this selected identity; an override must not send the baked ID.
  const selected = parseSelectedStableBackendManifest(
    selectedEnvelope('1.2.3', 'bd-h-123-1'),
    '1.2.3',
    'bundle-123'
  )
  applyStableBackendManifest(selected, env)
  assert.equal(env.BLUME_CLOUD_OWNER_URL, origin)
  assert.equal(env.BLUME_BACKEND_DEPLOYMENT_ID, 'bd-h-123-1')
})
