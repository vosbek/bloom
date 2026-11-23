// Custom resolver that swaps `electron` and `@electron-toolkit/utils`
// for local stubs, so we can exercise the install module under plain
// Node + tsx without launching Electron.
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { pathToFileURL } from 'node:url'
import { resolve as resolvePath, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const STUBS = {
  electron: pathToFileURL(resolvePath(here, 'stubs/electron.mjs')).href,
  '@electron-toolkit/utils': pathToFileURL(resolvePath(here, 'stubs/electron-toolkit-utils.mjs'))
    .href
}

export async function resolve(specifier, context, nextResolve) {
  if (STUBS[specifier]) {
    return { url: STUBS[specifier], format: 'module', shortCircuit: true }
  }
  // Node's --experimental-strip-types doesn't auto-append `.ts` for
  // extensionless relative imports. Try the bare specifier first; if it
  // 404s and the specifier is relative, retry with `.ts`.
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (
      err?.code === 'ERR_MODULE_NOT_FOUND' &&
      (specifier.startsWith('./') || specifier.startsWith('../'))
    ) {
      return nextResolve(`${specifier}.ts`, context)
    }
    throw err
  }
}
