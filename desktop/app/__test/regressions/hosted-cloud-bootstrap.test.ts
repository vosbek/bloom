import { afterEach, expect, test, vi } from 'vitest'

vi.mock('electron', () => ({
  app: { isPackaged: true, exit: vi.fn() },
  dialog: { showErrorBox: vi.fn() }
}))
// Stop after bundled defaults are installed, before launching the actual app or network.
vi.mock('../../src/main/nativeStartup', () => ({
  mayStartNativeRuntime: false,
  nativeStartupEvents: { dispose: vi.fn() }
}))

const original = { ...process.env }
afterEach(() => {
  vi.unstubAllEnvs()
  for (const key of Object.keys(process.env)) {
    if (!(key in original)) delete process.env[key]
  }
  Object.assign(process.env, original)
  vi.resetModules()
})

for (const channel of ['stable', 'canary']) {
  test(`${channel} installs signed hosted cloud routing before starting the worker`, async () => {
    vi.stubEnv('MAIN_VITE_BLUME_RELEASE_CHANNEL', channel)
    vi.stubEnv('MAIN_VITE_BLUME_RELEASE_VERSION', '2.0.22')
    vi.stubEnv('MAIN_VITE_BLUME_RELEASE_BUNDLE', 'bundle-2.0.22')
    vi.stubEnv('MAIN_VITE_BLUME_CLOUD_OWNER_URL', 'https://signed-cloud.example')
    vi.stubEnv('MAIN_VITE_BLUME_BACKEND_DEPLOYMENT_ID', 'bd-s-2-0-22-aaaaaaaaaaaa')
    process.env.BLUME_CLOUD_OWNER_URL = 'https://stale-cloud.example'
    process.env.BLUME_BACKEND_DEPLOYMENT_ID = 'stale-deployment'

    await import('../../src/main/backendManifestBootstrap')

    expect(process.env.BLUME_CLOUD_OWNER_URL).toBe('https://signed-cloud.example')
    expect(process.env.BLUME_BACKEND_DEPLOYMENT_ID).toBe('bd-s-2-0-22-aaaaaaaaaaaa')
  })
}
