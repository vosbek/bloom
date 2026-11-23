import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { app, BrowserWindow, ipcMain, safeStorage, utilityProcess } from 'electron'
import { startDeliveryRuntime } from '../../../../packages/sidecar/host-electron/src/control-runtime/runtime.ts'

app.setPath('userData', process.env.BLUME_CACHE_TEST_ROOT!)
app.on('window-all-closed', () => {})
process.on('uncaughtException', (error) => {
  console.error(error)
  app.exit(1)
})
const remote = 'https://evidence-cache.example.invalid/evidence/shot'
let cookie = 'session=synthetic-fixture'
let changed: (() => void) | undefined
void app
  .whenReady()
  .then(async () => {
    const root = process.env.BLUME_CACHE_TEST_ROOT!
    const preload = join(root, 'preload.cjs')
    await writeFile(
      preload,
      "const { contextBridge, ipcRenderer } = require('electron'); contextBridge.exposeInMainWorld('cacheTest', { call: (operation) => ipcRenderer.invoke('control:request', 'call', { operation }), open: (url) => ipcRenderer.invoke('control:open', url) });"
    )
    const window = new BrowserWindow({
      show: false,
      webPreferences: { preload, sandbox: true, contextIsolation: true, nodeIntegration: false }
    })
    let viewer: BrowserWindow | undefined
    const runtime = startDeliveryRuntime({
      native: {
        userData: root,
        ipcMain,
        safeStorage,
        fork: (path, args) => utilityProcess.fork(path, args),
        createWindow: (options) => (viewer = new BrowserWindow({ ...options, show: false })),
        openExternal: async () => {},
        workArea: () => ({ x: 0, y: 0, width: 1400, height: 900 }),
        reducedMotion: () => true
      },
      window,
      workerPath: process.env.BLUME_CACHE_TEST_WORKER!,
      icon: '',
      accounts: {
        cookie: () => cookie,
        session: async () => null,
        providers: async () => [],
        signIn: async () => null,
        signUp: async () => null,
        cancelSocialSignIn: async () => true,
        signInSocial: async () => null,
        signOut: async () => {},
        onChanged: (listener) => {
          changed = listener
          return () => {}
        }
      }
    })
    try {
      const html = await readFile(process.env.BLUME_CACHE_TEST_HTML!, 'utf8')
      const policy = /content="(default-src[^"]+)"/.exec(html)![1]
      const page = join(root, 'page.html')
      await writeFile(
        page,
        `<meta http-equiv="Content-Security-Policy" content="${policy}"><h1>Evidence cache</h1>`
      )
      await window.loadFile(page)
      const initial = await window.webContents.executeJavaScript("window.cacheTest.call('seed')")
      assert.equal(initial.downloads, 1)
      const draw = () =>
        window.webContents.executeJavaScript(
          `new Promise(resolve => { const image = new Image(); image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight }); image.onerror = () => resolve({ error: true }); image.src = ${JSON.stringify(remote)}; document.body.append(image) })`
        )
      assert.deepEqual(await draw(), { width: 1, height: 1 })
      assert.deepEqual(await draw(), { width: 1, height: 1 })
      await window.webContents.executeJavaScript(`window.cacheTest.open(${JSON.stringify(remote)})`)
      assert.equal(await viewer!.webContents.executeJavaScript('document.querySelector("img")?.naturalWidth'), 1)
      assert.ok(viewer!.webContents.getURL().startsWith('http://127.0.0.1:'))
      assert.equal(
        (await window.webContents.executeJavaScript("window.cacheTest.call('stats')")).downloads,
        1
      )
      cookie = ''
      changed!()
      await window.webContents.session.clearCache()
      // Discard already-decoded pixels from the old account's visible images.
      await window.loadFile(page)
      assert.deepEqual(
        await draw(),
        { error: true },
        'signed out app cannot see the cached private image'
      )
      console.log(
        'PASS: real Electron rendered repeated inline and standalone cache hits with one download; sign-out revoked access'
      )
    } finally {
      await runtime.stop()
      window.destroy()
    }
    // Session hooks still receive requests after the window that installed them is gone.
    // This failed with Object has been destroyed in the onBeforeRequest callback.
    const survivor = new BrowserWindow({ show: false })
    try {
      await survivor.loadFile(join(root, 'page.html'))
      assert.equal(await survivor.webContents.executeJavaScript('document.querySelector("h1")?.textContent'), 'Evidence cache')
      console.log('PASS: another window loads through the retained session hooks after owner destruction')
    } finally {
      survivor.destroy()
    }
    app.exit(0)
  })
  .catch((error) => {
    console.error(error)
    app.exit(1)
  })
