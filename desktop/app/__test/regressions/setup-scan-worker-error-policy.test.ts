import { describe, expect, it } from 'vitest'

import {
  SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE,
  SETUP_SCAN_WORKER_DISPOSED_MESSAGE,
  SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE,
  SetupScanWorkerUnavailableError,
  isExpectedSetupScanWorkerOperationalError,
  isExpectedSetupScanWorkerShutdownError,
  isSetupScanWorkerUnavailableError,
  shouldReportSetupScanAppError
} from '../../src/main/setupScanHost'

describe('setup scan worker operational error policy', () => {
  it('classifies unresponsive, dispose, and circuit-breaker as expected operational skips', () => {
    const errors = [
      new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE),
      new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_DISPOSED_MESSAGE),
      new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE)
    ]

    for (const error of errors) {
      expect(isSetupScanWorkerUnavailableError(error)).toBe(true)
      expect(isExpectedSetupScanWorkerOperationalError(error)).toBe(true)
      expect(shouldReportSetupScanAppError(error)).toBe(false)
    }
  })

  it('keeps dispose-on-quit as the only expected shutdown rejection', () => {
    const dispose = new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_DISPOSED_MESSAGE)
    expect(isExpectedSetupScanWorkerShutdownError(dispose)).toBe(true)

    const operationalButNotShutdown = [
      new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE),
      new SetupScanWorkerUnavailableError(SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE)
    ]
    for (const error of operationalButNotShutdown) {
      expect(isExpectedSetupScanWorkerShutdownError(error)).toBe(false)
      expect(isExpectedSetupScanWorkerOperationalError(error)).toBe(true)
    }
  })

  it('still reports exit, spawn, message, and unavailable failures', () => {
    const errors = [
      new SetupScanWorkerUnavailableError('setup scan worker exited'),
      new SetupScanWorkerUnavailableError('failed to spawn setup scan worker'),
      new SetupScanWorkerUnavailableError('failed to message setup scan worker'),
      new SetupScanWorkerUnavailableError('setup scan worker unavailable'),
      new Error(SETUP_SCAN_WORKER_DISPOSED_MESSAGE),
      new Error(SETUP_SCAN_WORKER_CIRCUIT_BREAKER_MESSAGE),
      new Error(SETUP_SCAN_WORKER_UNRESPONSIVE_MESSAGE)
    ]

    for (const error of errors) {
      expect(isExpectedSetupScanWorkerOperationalError(error)).toBe(false)
      expect(isExpectedSetupScanWorkerShutdownError(error)).toBe(false)
      expect(shouldReportSetupScanAppError(error)).toBe(true)
    }
  })
})
