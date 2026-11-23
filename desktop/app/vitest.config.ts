import { fileURLToPath } from 'node:url'

import { configDefaults, defineConfig } from 'vitest/config'

// Tests run under plain Node (no Electron runtime), so any main-process module
// that transitively imports Electron-only packages would crash
// at load — `electron` is a CJS module whose named exports (`BrowserWindow`,
// `app`, ...) aren't importable as ESM, and `@electron-toolkit/utils` reads
// `app.isPackaged` at module load. Better Auth's Electron client additionally
// initializes native protocol/session APIs. Alias these to local stubs in
// `__test/stubs/` (the same ones the standalone `__test/loader.mjs` uses) so
// these modules are importable in tests. Only modules that import them are
// affected; electron-free tests are untouched.
const stub = (rel: string): string => fileURLToPath(new URL(rel, import.meta.url))

export default defineConfig({
  test: {
    // This native Electron journey runs only through its Playwright release-check command.
    exclude: [...configDefaults.exclude, '__test/release-onboarding/**'],
    server: { deps: { inline: [/@better-auth\/electron/] } },
    alias: {
      electron: stub('./__test/stubs/electron.mjs'),
      '@electron-toolkit/utils': stub('./__test/stubs/electron-toolkit-utils.mjs'),
      '@better-auth/electron/client': stub('./__test/stubs/better-auth-electron-client.mjs')
    }
  }
})
