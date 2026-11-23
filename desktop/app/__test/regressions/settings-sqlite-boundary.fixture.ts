import { createRequire } from 'node:module'
import { performance } from 'node:perf_hooks'
import { Worker } from 'node:worker_threads'

import { closeSettingsStorage, getSettingsStorage } from '../../src/main/db/settingsStorage'
import { openDesktopSqliteStorage } from '../../src/main/db/sqliteStorage'

const require = createRequire(import.meta.url)

async function holdWriteLock(path: string): Promise<Worker> {
  const worker = new Worker(
    `
      const { parentPort, workerData } = require('node:worker_threads')
      const Database = require(workerData.betterSqlite3Path)
      const db = new Database(workerData.path)
      db.exec('BEGIN IMMEDIATE')
      parentPort.postMessage('locked')
      setTimeout(() => {
        db.exec('ROLLBACK')
        db.close()
      }, 1000)
    `,
    {
      eval: true,
      workerData: {
        betterSqlite3Path: require.resolve('better-sqlite3'),
        path
      }
    }
  )
  await new Promise<void>((resolve, reject) => {
    const cleanup = (): void => {
      worker.off('message', handleMessage)
      worker.off('error', handleError)
      worker.off('exit', handleExit)
    }
    const handleMessage = (message: unknown): void => {
      cleanup()
      if (message !== 'locked') {
        reject(new Error(`Unexpected write-lock worker message: ${String(message)}`))
        return
      }
      resolve()
    }
    const handleError = (error: Error): void => {
      cleanup()
      reject(error)
    }
    const handleExit = (code: number): void => {
      cleanup()
      reject(new Error(`Write-lock worker exited before acquiring the lock (code ${code})`))
    }

    worker.once('message', handleMessage)
    worker.once('error', handleError)
    worker.once('exit', handleExit)
  })
  return worker
}

async function main(): Promise<void> {
  const path = process.argv[2]
  if (!path) throw new Error('Expected a SQLite database path')

  const mainStorage = openDesktopSqliteStorage(path)
  const settings = getSettingsStorage(path)
  await settings.getAll()
  const lockWorker = await holdWriteLock(path)

  try {
    const startedAt = performance.now()
    let timerElapsedMs = 0
    const timer = new Promise<void>((resolve) => {
      setTimeout(() => {
        timerElapsedMs = performance.now() - startedAt
        resolve()
      }, 10)
    })
    const attempt = settings.set('menuBar.enabled', 'false').then(
      () => ({ status: 'resolved' }),
      (error: unknown) => ({
        status: 'rejected',
        code:
          error && typeof error === 'object' && 'code' in error
            ? String((error as { code?: unknown }).code)
            : undefined
      })
    )

    const [result] = await Promise.all([attempt, timer])
    process.stdout.write(`${JSON.stringify({ ...result, timerElapsedMs })}\n`)
  } finally {
    await lockWorker.terminate()
    closeSettingsStorage()
    mainStorage.close()
  }
}

void main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
