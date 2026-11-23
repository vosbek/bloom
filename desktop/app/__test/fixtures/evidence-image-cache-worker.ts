import { createEvidenceImageCache } from '../../../../packages/sidecar/host-electron/src/control-runtime/evidenceImageCache.ts'
import { createEvidenceImageWarmer } from '../../../../packages/sidecar/host-electron/src/control-runtime/evidenceImageWarmer.ts'
const parent = (
  process as unknown as {
    parentPort: {
      on(type: string, cb: (event: { data: any }) => void): void
      postMessage(data: unknown): void
    }
  }
).parentPort
const endpoint = 'https://evidence-cache.example.invalid'
const url = `${endpoint}/evidence/shot`
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aY1sAAAAASUVORK5CYII=',
  'base64'
)
let downloads = 0
void (async () => {
  const cache = await createEvidenceImageCache({
    root: process.env.BLUME_CACHE_TEST_ROOT!,
    endpoint,
    fetch: async () => {
      downloads++
      return new Response(png, { headers: { 'content-type': 'image/png' } })
    }
  })
  const warmer = createEvidenceImageWarmer(cache, endpoint)
  parent.on('message', ({ data }) => {
    void (async () => {
      if (data.feedClose) {
        warmer.reset()
        return
      }
      let result: unknown
      if (data.operation === 'call') {
        if (data.input.operation === 'seed') {
          warmer.changes(
            {
              ledger: 'test',
              reset: true,
              deliveries: [
                { id: 'd', evidence: [{ id: 'e', createdAt: Date.now(), screenshots: [{ url }] }] }
              ]
            },
            data.cookie,
            async () => ({})
          )
          await cache.drain()
        }
        result = { downloads }
      } else if (data.operation === 'evidence-cache-lookup')
        result = await cache.lookup(data.input.url, data.cookie)
      else if (data.operation === 'shutdown') {
        warmer.reset()
        await cache.stop()
        result = { closed: true }
      }
      parent.postMessage({ id: data.id, result })
    })().catch((error) => parent.postMessage({ id: data.id, error: String(error) }))
  })
  parent.postMessage({ ready: true, endpoint, evidenceCacheOrigin: cache.origin })
})()
