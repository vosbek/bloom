const { readFileSync } = require('node:fs')
const { DatabaseSync } = require('node:sqlite')
const { app, safeStorage } = require('electron')

const ACCOUNT_SETTING_PREFIX = 'account.'
const ENC_PREFIX = 'enc:v1:'
const MAX_ACCOUNT_SETTINGS = 32
const MAX_ACCOUNT_SETTING_LENGTH = 1_000_000

const mode = process.argv[2]
const appName = process.argv[3]
app.setName(appName)

function validSettings(value) {
  if (!Array.isArray(value) || value.length > MAX_ACCOUNT_SETTINGS) {
    throw new Error('Invalid account session payload')
  }
  return value.map((entry) => {
    if (
      !entry ||
      typeof entry !== 'object' ||
      typeof entry.key !== 'string' ||
      !entry.key.startsWith(ACCOUNT_SETTING_PREFIX) ||
      typeof entry.value !== 'string' ||
      entry.value.length > MAX_ACCOUNT_SETTING_LENGTH
    ) {
      throw new Error('Invalid account session setting')
    }
    return { key: entry.key, value: entry.value }
  })
}

function readEncryptedSettings(dbPath) {
  let db
  try {
    db = new DatabaseSync(dbPath, { readOnly: true })
    return validSettings(
      db
        .prepare(
          `SELECT key, value FROM settings
           WHERE key LIKE 'account.%' AND value != ''
           ORDER BY key
           LIMIT ${MAX_ACCOUNT_SETTINGS + 1}`
        )
        .all()
    )
  } finally {
    db?.close()
  }
}

app.whenReady().then(() => {
  try {
    if (!safeStorage.isEncryptionAvailable()) {
      throw new Error('OS secure storage is unavailable')
    }
    if (mode === 'decrypt') {
      const settings = readEncryptedSettings(process.argv[4]).map(({ key, value }) => {
        if (!value.startsWith(ENC_PREFIX)) throw new Error('Account setting is not encrypted')
        return {
          key,
          value: safeStorage.decryptString(Buffer.from(value.slice(ENC_PREFIX.length), 'base64'))
        }
      })
      process.stdout.write(JSON.stringify(settings))
    } else if (mode === 'encrypt') {
      const settings = validSettings(JSON.parse(readFileSync(0, 'utf8'))).map(({ key, value }) => ({
        key,
        value: ENC_PREFIX + safeStorage.encryptString(value).toString('base64')
      }))
      process.stdout.write(JSON.stringify(settings))
    } else {
      throw new Error('Unknown account session helper mode')
    }
    app.quit()
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
    app.exit(1)
  }
})
