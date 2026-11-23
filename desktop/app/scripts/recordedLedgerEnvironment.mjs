import { isAbsolute } from 'node:path'
import { readFileSync, statSync } from 'node:fs'

/** Local inspection of an exported test ledger; never a hosted integration test. */
export function configureRecordedLedger(env, args, userDataDir = env.ELECTRON_USER_DATA_DIR) {
  const path = env.BLUME_DEV_LEDGER_RECORDING
  if (!path) return false
  if (
    !isAbsolute(path) ||
    args.runtimeProfile !== 'ui' ||
    !args.signedOut ||
    args.runnerMode === 'static' ||
    env.BLUME_E2E_MODE !== '1' ||
    !userDataDir ||
    !isAbsolute(userDataDir)
  ) {
    throw new Error(
      'A ledger recording needs an absolute file, --profile ui --signed-out, BLUME_E2E_MODE=1 and isolated ELECTRON_USER_DATA_DIR (HMR mode).'
    )
  }
  readRecordedLedger(path)
  // No production/preview account or ledger participates in this viewer.
  for (const key of Object.keys(env)) {
    if (/^(MAIN_VITE_|VITE_)?BLUME_.*(URL|ENDPOINT)$/.test(key)) env[key] = 'http://127.0.0.1:9'
  }
  for (const key of ['BLUME_AUTH_URL', 'BLUME_CONTROL_REMOTE_ENDPOINT'])
    env[key] = 'http://127.0.0.1:9'
  env.VITE_POSTHOG_KEY = ''
  env.MAIN_VITE_BLUME_RELEASE_CHANNEL = ''
  env.VITE_BLUME_DELIVERIES_MOCK = '1'
  return true
}

export function readRecordedLedger(path) {
  if (statSync(path).size > 20 * 1024 * 1024) throw new Error('Ledger recording exceeds 20 MiB')
  const value = JSON.parse(readFileSync(path, 'utf8'))
  if (value.reset !== true || !Array.isArray(value.deliveries) || !Array.isArray(value.projects))
    throw new Error('Expected a complete /control/changes ledger recording')
  return value
}
