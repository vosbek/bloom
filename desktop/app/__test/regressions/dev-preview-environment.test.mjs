/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { describe, expect, it } from 'vitest'

import { applyPullRequestPreviewEnvironment } from '../../scripts/previewEnvironment.mjs'

const sha = 'a'.repeat(40)
const pr = 1001
const origin = (name) => `https://${name}-pr-${pr}.account.workers.dev`
const services = {
  auth: origin('blume-auth'),
  artifactSync: origin('blume-artifact-sync'),
  feedback: origin('blume-feedback'),
  userAnalytics: origin('blume-analytics'),
  referrals: origin('blume-referrals'),
  insights: origin('blume-insights-control'),
  llm: origin('blume-llm'),
  router: origin('blume-router'),
  webLab: origin('blume-web-lab'),
  runner: `${origin('blume-web-lab')}/runner`,
  deliveriesRuntime: origin('blume-deliveries-runtime')
}
const bundleId = `preview-pr-${pr}-${sha}`
const envelope = (override = {}) => ({
  pullRequestNumber: pr,
  sourceSha: sha,
  bundleId,
  manifest: {
    schemaVersion: 1,
    channel: 'preview',
    bundleId,
    sourceSha: sha,
    services: Object.fromEntries(
      Object.entries({ ...services, ...override }).map(([name, url]) => [name, { url }])
    )
  }
})
const health = (release = { channel: 'preview', bundleId, sourceSha: sha }) =>
  Response.json({ ok: true, component: 'deliveriesRuntime', release })

const frontOrigin = (name) => `https://${name}-pr-${pr}.petal-preview.com`
/** A PR with no Workers Preview yet: the front's catch-all answers 404 without JSON. */
const noFrontSet = () =>
  new Response('not found', { status: 404, headers: { 'content-type': 'text/plain' } })

function resolver({
  manifest = envelope(),
  front = noFrontSet(),
  runtimeHealth = health(),
  runtimeUrl = services.deliveriesRuntime,
  pullRequest = pr,
  branch = 'claude/feature'
} = {}) {
  const fetched = []
  return {
    fetched,
    run: (env) =>
      applyPullRequestPreviewEnvironment(env, {
        sourceSha: () => sha,
        branchName: () => branch,
        pullRequestNumber: () => pullRequest,
        log: () => {},
        fetchImpl: async (url) => {
          fetched.push(url)
          if (url === `${frontOrigin('blume-insights-control')}/v1/preview-manifests/${sha}`)
            return front instanceof Response ? front : Response.json(front)
          if (url.endsWith(`/v1/preview-manifests/${sha}`))
            return manifest instanceof Response ? manifest : Response.json(manifest)
          if (url === `${runtimeUrl}/health`) return runtimeHealth
          throw new Error(`Unexpected ${url}`)
        }
      })
  }
}

describe('pnpm dev backend selection', () => {
  it('uses the exact PR preview set, including hosted Deliveries and same-PR Auth', async () => {
    const env = { CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' }
    const r = resolver()
    expect(await r.run(env)).toEqual({ mode: 'preview', pullRequestNumber: pr, bundleId })
    expect(env.BLUME_AUTH_URL).toBe(services.auth)
    expect(env.MAIN_VITE_BLUME_AUTH_URL).toBe(services.auth)
    expect(env.BLUME_CONTROL_REMOTE_ENDPOINT).toBe(services.deliveriesRuntime)
    expect(env.BLUME_CLOUD_OWNER_URL).toBe(services.webLab)
    expect(env.BLUME_ARTIFACT_SYNC_URL).toBe(services.artifactSync)
    expect(env.BLUME_RELEASE_BUNDLE).toBe(bundleId)
    expect(r.fetched).toEqual([
      `${frontOrigin('blume-insights-control')}/v1/preview-manifests/${sha}`,
      `${origin('blume-insights-control')}/v1/preview-manifests/${sha}`,
      `${services.deliveriesRuntime}/health`
    ])
  })

  it('uses a preview set without its optional VPS runner', async () => {
    const { runner: _runner, ...workers } = services
    const withoutRunner = envelope()
    delete withoutRunner.manifest.services.runner
    withoutRunner.manifest.omittedServices = { runner: 'not-requested' }
    const env = { CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' }
    expect(await resolver({ manifest: withoutRunner }).run(env)).toEqual({
      mode: 'preview',
      pullRequestNumber: pr,
      bundleId
    })
    expect(env.BLUME_AUTH_URL).toBe(workers.auth)
    expect(env.BLUME_CONTROL_REMOTE_ENDPOINT).toBe(workers.deliveriesRuntime)
    expect(env.BLUME_RUNNER_URL).toBe('')
  })

  it('uses a Workers Preview behind the petal-preview.com front first', async () => {
    const frontServices = Object.fromEntries(
      Object.entries(services).map(([name, url]) => [
        name,
        url.replace('.account.workers.dev', '.petal-preview.com')
      ])
    )
    const frontEnvelope = envelope(frontServices)
    const env = { CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' }
    const r = resolver({ front: frontEnvelope, runtimeUrl: frontServices.deliveriesRuntime })
    expect(await r.run(env)).toEqual({ mode: 'preview', pullRequestNumber: pr, bundleId })
    expect(env.BLUME_AUTH_URL).toBe(frontServices.auth)
    expect(env.BLUME_CONTROL_REMOTE_ENDPOINT).toBe(frontServices.deliveriesRuntime)
    expect(r.fetched).toEqual([
      `${frontOrigin('blume-insights-control')}/v1/preview-manifests/${sha}`,
      `${frontServices.deliveriesRuntime}/health`
    ])
    // A registry and a manifest that disagree about hosting are refused, in both directions.
    await expect(
      resolver({ front: envelope() }).run({ CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' })
    ).rejects.toThrow(/disagree about hosting/)
    await expect(
      resolver({ manifest: frontEnvelope }).run({ CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' })
    ).rejects.toThrow(/disagree about hosting/)
    // A front that knows the PR but not this commit does not fall back to old Workers.
    await expect(
      resolver({
        front: Response.json({ error: 'not found' }, { status: 404 })
      }).run({ CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' })
    ).rejects.toThrow(/no ready Product PR Preview/)
    // The front's registry may also be configured explicitly.
    const explicit = resolver({ front: frontEnvelope, runtimeUrl: frontServices.deliveriesRuntime })
    expect(
      await explicit.run({
        CLOUDFLARE_WORKERS_SUBDOMAIN: 'account',
        BLUME_DEPLOYMENT_REGISTRY_URL: frontOrigin('blume-insights-control')
      })
    ).toEqual({ mode: 'preview', pullRequestNumber: pr, bundleId })
  })

  it('fails closed without a PR unless backends are explicit HTTPS origins', async () => {
    const none = resolver({ pullRequest: null })
    await expect(none.run({})).rejects.toThrow(/no resolvable PR preview/)
    expect(none.fetched).toEqual([])
    const env = {
      BLUME_USE_PRODUCTION_BACKENDS: '1',
      BLUME_CONTROL_REMOTE_ENDPOINT:
        'https://blume-dlv-runtime-bd-s-1-0-0-abc.release.blume-codes.com/',
      BLUME_AUTH_URL: 'https://auth.blume-codes.com'
    }
    const explicit = resolver({ pullRequest: null })
    expect(await explicit.run(env)).toEqual({
      mode: 'explicit',
      endpoint: 'https://blume-dlv-runtime-bd-s-1-0-0-abc.release.blume-codes.com'
    })
    expect(env.BLUME_CONTROL_REMOTE_ENDPOINT).toBe(
      'https://blume-dlv-runtime-bd-s-1-0-0-abc.release.blume-codes.com'
    )
    expect(explicit.fetched).toEqual([])
    for (const missing of [
      { BLUME_USE_PRODUCTION_BACKENDS: '1' },
      {
        BLUME_USE_PRODUCTION_BACKENDS: '1',
        BLUME_CONTROL_REMOTE_ENDPOINT: 'http://127.0.0.1:6211',
        BLUME_AUTH_URL: 'https://auth.blume-codes.com'
      },
      {
        BLUME_USE_PRODUCTION_BACKENDS: '1',
        BLUME_CONTROL_REMOTE_ENDPOINT: env.BLUME_CONTROL_REMOTE_ENDPOINT
      }
    ])
      await expect(resolver().run(missing)).rejects.toThrow(/explicit HTTPS origin/)
  })

  it('requires the preview account label and the exact PR registry before fetching', async () => {
    for (const env of [
      {},
      { CLOUDFLARE_WORKERS_SUBDOMAIN: 'account.evil.example' },
      {
        CLOUDFLARE_WORKERS_SUBDOMAIN: 'account',
        BLUME_DEPLOYMENT_REGISTRY_URL: origin('blume-insights-control').replace('1001', '1002')
      },
      {
        CLOUDFLARE_WORKERS_SUBDOMAIN: 'account',
        BLUME_DEPLOYMENT_REGISTRY_URL: 'https://agents.blume-codes.com'
      }
    ]) {
      const r = resolver()
      await expect(r.run(env)).rejects.toThrow(/CLOUDFLARE_WORKERS_SUBDOMAIN|exact PR/)
      expect(r.fetched).toEqual([])
    }
  })

  it('never selects a missing, cross-PR, production or stale preview set', async () => {
    const env = () => ({ CLOUDFLARE_WORKERS_SUBDOMAIN: 'account' })
    await expect(
      resolver({ manifest: new Response(null, { status: 404 }) }).run(env())
    ).rejects.toThrow(/no ready Product PR Preview/)
    await expect(
      resolver({
        manifest: envelope({
          deliveriesRuntime: 'https://blume-deliveries-runtime-pr-990.account.workers.dev'
        })
      }).run(env())
    ).rejects.toThrow(/deliveriesRuntime endpoint does not match its PR/)
    await expect(
      resolver({ manifest: envelope({ auth: 'https://auth.blume-codes.com' }) }).run(env())
    ).rejects.toThrow(/auth endpoint does not match its PR/)
    const withoutDeliveries = envelope()
    delete withoutDeliveries.manifest.services.deliveriesRuntime
    await expect(resolver({ manifest: withoutDeliveries }).run(env())).rejects.toThrow(
      /exactly these services/
    )
    await expect(
      resolver({
        runtimeHealth: health({
          channel: 'preview',
          bundleId: `preview-pr-${pr}-${'b'.repeat(40)}`,
          sourceSha: 'b'.repeat(40)
        })
      }).run(env())
    ).rejects.toThrow(/does not report/)
    await expect(
      resolver({ runtimeHealth: new Response(null, { status: 503 }) }).run(env())
    ).rejects.toThrow(/does not report/)
    const conflicting = { ...env(), BLUME_AUTH_URL: 'https://auth.blume-codes.com' }
    await expect(resolver().run(conflicting)).rejects.toThrow(/BLUME_AUTH_URL conflicts/)
    expect(conflicting.BLUME_CONTROL_REMOTE_ENDPOINT).toBeUndefined()
  })

  it('keeps configured defaults on main when no main candidate manifest exists', async () => {
    for (const status of [404, 500]) {
      const env = { BLUME_AUTH_URL: 'https://unchanged.example' }
      const r = resolver({
        pullRequest: null,
        branch: 'main',
        manifest: new Response(null, { status })
      })
      expect(await r.run(env)).toEqual({ mode: 'defaults' })
      expect(env.BLUME_AUTH_URL).toBe('https://unchanged.example')
    }
  })
})
