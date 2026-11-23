import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { SignalAnalyticsSummary } from '@blume/user-analytics'

const mocks = vi.hoisted(() => {
  const handlers = {
    message: null as null | ((message: unknown) => void),
    exit: null as null | (() => void)
  }
  const createWorker = () => {
    const worker = {
      on: vi.fn((event: string, handler: (...args: unknown[]) => void) => {
        if (event === 'message') handlers.message = handler as (message: unknown) => void
        if (event === 'exit') handlers.exit = handler as () => void
        return worker
      }),
      postMessage: vi.fn(),
      kill: vi.fn(() => true)
    }
    return worker
  }
  return {
    handlers,
    createWorker,
    worker: createWorker(),
    fork: vi.fn(),
    startBackgroundProcessRequest: vi.fn(),
    finishBackgroundProcessRequest: vi.fn(),
    clearBackgroundProcessRequests: vi.fn(),
    terminateBackgroundProcess: vi.fn((process: { kill: () => boolean }) => process.kill())
  }
})

vi.mock('electron', () => ({ utilityProcess: { fork: mocks.fork } }))
vi.mock('../../src/main/db', () => ({ getDbPath: () => '/tmp/blume-signal-analytics-test.sqlite' }))
vi.mock('../../src/main/analyticsCredentials', () => ({
  ANALYTICS_URL: 'http://localhost',
  analyticsToken: async () => 'test-token',
  requestJson: async () => ({})
}))
vi.mock('../../src/main/backgroundProcessActivity', () => ({
  BLUME_BACKGROUND_PROCESS_SERVICES: { signalAnalytics: 'blume-signal-analytics-worker' },
  startBackgroundProcessRequest: mocks.startBackgroundProcessRequest,
  finishBackgroundProcessRequest: mocks.finishBackgroundProcessRequest,
  clearBackgroundProcessRequests: mocks.clearBackgroundProcessRequests,
  terminateBackgroundProcess: mocks.terminateBackgroundProcess
}))

const emptySummary: SignalAnalyticsSummary = {
  totalTurns: 0,
  turnsWithAnySignal: 0,
  signalRate: 0,
  signalCounts: { correction: 0, steering: 0, frustration: 0 },
  affectedTurnCounts: { correction: 0, steering: 0, frustration: 0 },
  auditCheckCounts: {},
  daily: []
}

async function waitForPostMessage(worker: { postMessage: ReturnType<typeof vi.fn> }): Promise<{
  type: string
  id: number
  dbPath: string
}> {
  await vi.waitFor(() => {
    expect(worker.postMessage).toHaveBeenCalled()
  })
  return worker.postMessage.mock.calls.at(-1)?.[0] as {
    type: string
    id: number
    dbPath: string
  }
}

describe('signal analytics worker host exit retry', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.handlers.message = null
    mocks.handlers.exit = null
    mocks.worker = mocks.createWorker()
    mocks.fork.mockReset()
    mocks.fork.mockImplementation(() => mocks.worker)
    mocks.startBackgroundProcessRequest.mockClear()
    mocks.finishBackgroundProcessRequest.mockClear()
    mocks.clearBackgroundProcessRequests.mockClear()
    mocks.terminateBackgroundProcess.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retries once when the active worker exits before responding', async () => {
    const { aggregateLocalSignalAnalytics } = await import('../../src/main/signalAnalyticsHost')

    const firstWorker = mocks.worker
    const pending = aggregateLocalSignalAnalytics()
    const firstRequest = await waitForPostMessage(firstWorker)

    const secondWorker = mocks.createWorker()
    mocks.fork.mockImplementation(() => secondWorker)
    mocks.handlers.exit?.()

    const secondRequest = await waitForPostMessage(secondWorker)
    expect(secondRequest.id).not.toBe(firstRequest.id)
    expect(mocks.fork).toHaveBeenCalledTimes(2)

    mocks.handlers.message?.({
      type: 'aggregate-result',
      id: secondRequest.id,
      ok: true,
      summary: emptySummary
    })

    await expect(pending).resolves.toEqual(emptySummary)
  })

  it('hands the hosted signals to the worker, also on its retry', async () => {
    const { aggregateLocalSignalAnalytics } = await import('../../src/main/signalAnalyticsHost')
    const signals = [{ at: 1_000, kind: 'correction' as const }]

    const firstWorker = mocks.worker
    const pending = aggregateLocalSignalAnalytics(signals)
    expect(await waitForPostMessage(firstWorker)).toMatchObject({ type: 'aggregate', signals })

    const secondWorker = mocks.createWorker()
    mocks.fork.mockImplementation(() => secondWorker)
    mocks.handlers.exit?.()
    const retry = await waitForPostMessage(secondWorker)
    expect(retry).toMatchObject({ type: 'aggregate', signals })

    mocks.handlers.message?.({ type: 'aggregate-result', id: retry.id, ok: true, summary: emptySummary })
    await expect(pending).resolves.toEqual(emptySummary)
  })

  it('rejects EXITED after a second consecutive worker exit without reporting capture policy', async () => {
    const {
      aggregateLocalSignalAnalytics,
      shouldReportSignalAnalyticsAppError,
      SignalAnalyticsWorkerUnavailableError,
      SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE
    } = await import('../../src/main/signalAnalyticsHost')

    const firstWorker = mocks.worker
    const pending = aggregateLocalSignalAnalytics()
    await waitForPostMessage(firstWorker)

    const secondWorker = mocks.createWorker()
    mocks.fork.mockImplementation(() => secondWorker)
    mocks.handlers.exit?.()
    await waitForPostMessage(secondWorker)
    mocks.handlers.exit?.()

    await expect(pending).rejects.toMatchObject({
      name: 'SignalAnalyticsWorkerUnavailableError',
      message: 'signal analytics worker exited'
    })
    expect(mocks.fork).toHaveBeenCalledTimes(2)
    expect(
      shouldReportSignalAnalyticsAppError(
        new SignalAnalyticsWorkerUnavailableError(SIGNAL_ANALYTICS_WORKER_EXITED_MESSAGE)
      )
    ).toBe(false)
  })

  it('retries once when postMessage fails against a dead worker', async () => {
    const { aggregateLocalSignalAnalytics } = await import('../../src/main/signalAnalyticsHost')

    const firstWorker = mocks.worker
    firstWorker.postMessage.mockImplementationOnce(() => {
      throw new Error('Object has been destroyed')
    })
    const secondWorker = mocks.createWorker()
    let forks = 0
    mocks.fork.mockImplementation(() => {
      forks += 1
      return forks === 1 ? firstWorker : secondWorker
    })

    const pending = aggregateLocalSignalAnalytics()
    const secondRequest = await waitForPostMessage(secondWorker)
    expect(mocks.fork).toHaveBeenCalledTimes(2)

    mocks.handlers.message?.({
      type: 'aggregate-result',
      id: secondRequest.id,
      ok: true,
      summary: emptySummary
    })

    await expect(pending).resolves.toEqual(emptySummary)
  })

  it('does not retry EXITED after dispose', async () => {
    const { aggregateLocalSignalAnalytics, disposeSignalAnalyticsWorker } =
      await import('../../src/main/signalAnalyticsHost')

    const pending = aggregateLocalSignalAnalytics()
    await waitForPostMessage(mocks.worker)
    disposeSignalAnalyticsWorker()

    await expect(pending).rejects.toMatchObject({
      name: 'SignalAnalyticsWorkerUnavailableError',
      message: 'signal analytics worker disposed'
    })
    expect(mocks.fork).toHaveBeenCalledTimes(1)
  })
})
