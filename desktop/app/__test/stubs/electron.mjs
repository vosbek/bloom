// Stub of the `electron` module surface used by src/main/install/*.
// Only the bits we actually touch: app.getVersion() and app.getAppPath().
import { resolve } from 'node:path'

export const app = {
  userAgentFallback: 'Blume Test',
  getVersion: () => '1.0.10-test',
  getAppPath: () => resolve(process.cwd()),
  getPath: (name) => resolve(process.cwd(), '.test-electron', name)
}

export class BrowserWindow {
  static getFocusedWindow() {
    return null
  }
}

export const safeStorage = {
  isEncryptionAvailable: () => true,
  encryptString: (value) => Buffer.from(value, 'utf8'),
  decryptString: (value) => Buffer.from(value).toString('utf8')
}

// No utility processes under plain Node — src/main/conversations/parseHost.ts
// checks `typeof utilityProcess?.fork` and keeps parsing in-process when the
// runtime can't fork one.
export const utilityProcess = undefined
