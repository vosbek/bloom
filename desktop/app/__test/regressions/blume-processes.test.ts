import { describe, expect, test } from 'vitest'
import { readFile } from 'node:fs/promises'
import type { PerfSnapshot } from '../../src/preload/index.d'
import {
  backgroundProcessServiceInstanceName,
  consumeBackgroundProcessTerminationIntent,
  getBlumeBackgroundProcessServiceName,
  getBackgroundProcessActiveRequestCount,
  getBackgroundProcessActivity,
  isBlumeBackgroundProcessService,
  resetBackgroundProcessActivity,
  startBackgroundProcessRequest,
  finishBackgroundProcessRequest,
  terminateBackgroundProcess
} from '../../src/main/backgroundProcessActivity'
import {
  blumeProcessRelationshipLabel,
  buildBlumeProcessForest,
  buildBlumeProcessTree,
  mergeBlumeProcessRecords,
  projectElectronRuntimeProcesses,
  projectBlumeProcessDiagnostics,
  projectBlumeProcesses,
  relatedBlumeProcesses,
  splitBlumeProcessRecords,
  type BlumeProcessView
} from '../../src/renderer/src/lib/blumeProcesses'
import {
  analyticsForPath,
  devProcessPath,
  processIdFromRouteParam,
  ROUTES
} from '../../src/renderer/src/lib/routes'

const processPageUrl = new URL(
  '../../src/renderer/src/components/dev/BlumeProcesses.tsx',
  import.meta.url
)

function snapshot(): PerfSnapshot {
  return {
    uptimeSec: 12,
    main: {
      pid: 100,
      rssMB: 100,
      heapUsedMB: 20,
      heapTotalMB: 30,
      externalMB: 1,
      cpuPercent: 2
    },
    appMetrics: [
      {
        pid: 100,
        type: 'Browser',
        name: 'Blume',
        cpuPercent: 2,
        memoryMB: 100
      },
      {
        pid: 104,
        type: 'Renderer',
        role: 'ui-renderer',
        cpuPercent: 4,
        memoryMB: 70
      },
      {
        pid: 105,
        type: 'Renderer',
        role: 'tray-renderer',
        cpuPercent: 0.5,
        memoryMB: 55
      },
      {
        pid: 106,
        type: 'GPU',
        cpuPercent: 1.5,
        memoryMB: 45
      },
      {
        pid: 101,
        type: 'Utility',
        name: 'blume-refresh-worker',
        cpuPercent: 3,
        memoryMB: 42
      },
      {
        pid: 102,
        type: 'Utility',
        name: 'Network Service',
        cpuPercent: 1,
        memoryMB: 10
      },
      {
        pid: 103,
        type: 'Utility',
        name: 'blume-improve-agent-worker',
        cpuPercent: 9,
        memoryMB: 64
      }
    ],
    externalProcesses: [
      {
        pid: 201,
        ppid: 103,
        role: 'claude cli',
        cpuPercent: 12,
        memoryMB: 80,
        command: '/usr/local/bin/claude --print'
      },
      {
        pid: 202,
        ppid: 1,
        role: 'child process',
        cpuPercent: 0,
        memoryMB: 1,
        command: '/bin/ps -Ao pid=,ppid=,pcpu=,rss=,command='
      },
      {
        pid: 203,
        ppid: 101,
        role: 'parse worker',
        cpuPercent: 4,
        memoryMB: 18,
        command: '/Applications/Blume/blume-parse-worker'
      }
    ],
    backgroundProcesses: [
      { serviceName: 'blume-refresh-worker', activeRequests: 1 },
      { serviceName: 'blume-improve-agent-worker', activeRequests: 1 }
    ],
    history: { retentionMs: 1, sampleIntervalMs: 1, samples: [] },
    sections: {},
    watcher: { eventsTotal: 0, eventsPerSec: 0, debouncedFires: 0 },
    caches: {}
  }
}

describe('Blume process projection', () => {
  test('shows named Blume utilities and their child processes with product labels', () => {
    const processes = projectBlumeProcesses(snapshot())

    expect(processes.map((process) => process.label)).toEqual([
      'Claude suggestion agent',
      'Suggestions run',
      'Parser subprocess',
      'Parsing'
    ])
    expect(processes.map((process) => process.pid)).not.toContain(102)
    expect(processes.map((process) => process.pid)).not.toContain(202)
    expect(processes.map((process) => process.type)).toEqual([
      'suggestions',
      'suggestions',
      'parsing',
      'parsing'
    ])
  })

  test('keeps process-family relationships and bounded diagnostics for detail views', () => {
    const source = snapshot()
    const processes = projectBlumeProcesses(source)
    const suggestions = processes.find((process) => process.pid === 103)
    const parsing = processes.find((process) => process.pid === 101)

    expect(suggestions).toBeDefined()
    expect(parsing).toBeDefined()
    expect(relatedBlumeProcesses(processes, suggestions!.id).map((process) => process.pid)).toEqual(
      [201]
    )
    expect(relatedBlumeProcesses(processes, parsing!.id).map((process) => process.pid)).toEqual([
      203
    ])
    expect(projectBlumeProcessDiagnostics(source)).toEqual({
      appUptimeSec: 12,
      watcher: source.watcher
    })
  })

  test('separates Electron runtime roles from named Blume background workers', () => {
    const runtime = projectElectronRuntimeProcesses(snapshot())

    expect(runtime.map((process) => process.label)).toEqual([
      'Main process',
      'UI renderer',
      'Menu bar popover renderer',
      'GPU process',
      'Network service'
    ])
    expect(runtime.map((process) => process.pid)).not.toContain(101)
    expect(runtime.map((process) => process.pid)).not.toContain(103)
    expect(runtime[0]).toMatchObject({
      pid: 100,
      parentPid: null,
      activityMonitorName: 'Blume'
    })
    expect(runtime[1]).toMatchObject({
      parentPid: 100,
      activityMonitorName: 'Blume Helper (Renderer)'
    })
    expect(runtime.at(-1)).toMatchObject({
      label: 'Network service',
      activityMonitorName: 'Blume Helper'
    })
  })

  test('keeps resident utility workers visible but excludes idle hosts from active work', () => {
    const source = snapshot()
    source.backgroundProcesses = []
    source.externalProcesses = []
    const processes = projectBlumeProcesses(source)
    const records = mergeBlumeProcessRecords(
      [],
      processes,
      projectBlumeProcessDiagnostics(source),
      1_000
    )
    const split = splitBlumeProcessRecords(records)

    expect(processes.map((process) => process.label)).toEqual([
      'Suggestions worker',
      'Parsing worker'
    ])
    expect(processes.every((process) => !process.active)).toBe(true)
    expect(records.every((record) => record.status === 'idle')).toBe(true)
    expect(split.current).toHaveLength(2)
    expect(split.recent).toHaveLength(0)
  })

  test('retains a bounded final snapshot after a process finishes', () => {
    const source = snapshot()
    const diagnostics = projectBlumeProcessDiagnostics(source)
    const processes = projectBlumeProcesses(source)
    const first = mergeBlumeProcessRecords([], processes, diagnostics, 1_000)
    const withoutSuggestionAgent = processes.filter((process) => process.pid !== 201)
    const finished = mergeBlumeProcessRecords(first, withoutSuggestionAgent, diagnostics, 2_000)
    const agentRecord = finished.find((record) => record.process.pid === 201)
    const split = splitBlumeProcessRecords(finished)

    expect(agentRecord).toMatchObject({
      status: 'finished',
      firstSeenAt: 1_000,
      lastSeenAt: 1_000,
      finishedAt: 2_000
    })
    expect(split.current.map((record) => record.process.pid)).not.toContain(201)
    expect(split.recent.map((record) => record.process.pid)).toEqual([201])

    const manyProcesses: BlumeProcessView[] = Array.from({ length: 240 }, (_, index) => ({
      ...processes[0],
      id: `utility:${1_000 + index}`,
      pid: 1_000 + index
    }))
    expect(mergeBlumeProcessRecords([], manyProcesses, diagnostics, 3_000)).toHaveLength(200)
  })

  test('builds nested process trees and explains each relationship to the selection', () => {
    const source = snapshot()
    const diagnostics = projectBlumeProcessDiagnostics(source)
    const processes = projectBlumeProcesses(source)
    const suggestionWorker = processes.find((process) => process.pid === 103)!
    const suggestionAgent = processes.find((process) => process.pid === 201)!
    const nestedChild: BlumeProcessView = {
      ...suggestionAgent,
      id: 'child:301',
      pid: 301,
      parentPid: 201,
      label: 'Nested tool process',
      detail: 'node child'
    }
    const records = mergeBlumeProcessRecords(
      [],
      [suggestionWorker, suggestionAgent, nestedChild],
      diagnostics,
      1_000
    )
    const tree = buildBlumeProcessTree(records, nestedChild.id)
    const forest = buildBlumeProcessForest(records)

    expect(tree).toHaveLength(1)
    expect(forest).toHaveLength(1)
    expect(tree[0].record.process.pid).toBe(103)
    expect(tree[0].children[0].record.process.pid).toBe(201)
    expect(tree[0].children[0].children[0].record.process.pid).toBe(301)
    expect(blumeProcessRelationshipLabel(records, nestedChild.id, suggestionAgent.id)).toBe(
      'Parent'
    )
    expect(blumeProcessRelationshipLabel(records, nestedChild.id, suggestionWorker.id)).toBe(
      'Ancestor · 2 levels up'
    )
    expect(blumeProcessRelationshipLabel(records, suggestionWorker.id, nestedChild.id)).toBe(
      'Descendant · 2 levels down'
    )
  })

  test('process detail routes preserve the process identity and have their own analytics screen', () => {
    const path = devProcessPath('utility:103')

    expect(path).toBe('/dev/processes/utility%3A103')
    expect(processIdFromRouteParam('utility%3A103')).toBe('utility:103')
    expect(analyticsForPath(path)).toMatchObject({
      app_route: ROUTES.devProcessDetails,
      app_screen: 'dev_process_details'
    })
  })

  test('the root can switch between split history and the full tree', async () => {
    const source = await readFile(processPageUrl, 'utf8')

    expect(source).toContain('onClick={() => onOpenProcess(process.id)}')
    expect(source).toContain("if (process.type === 'parsing')")
    expect(source).toContain("if (process.type === 'suggestions')")
    expect(source).toContain('RECENTLY FINISHED')
    expect(source).toContain('Current / recent')
    expect(source).toContain('PROCESS TREE')
    expect(source).toContain('aria-label="Current Blume process hierarchy"')
    expect(source).toContain('aria-label="Recently finished Blume process hierarchy"')
    expect(source).toContain('currentProcessForest')
    expect(source).toContain('recentProcessForest')
    expect(source).toContain('Electron main owns the runtime')
    expect(source).toContain('Why Activity Monitor says “Blume Helper”')
    expect(source).toContain('Background work history')
    expect(source).not.toContain('Root worker')
    expect(source).not.toContain('<DetailSection title="Process tree"')
    expect(source).toContain('state.records ?? []')
  })
})

describe('background process activity registry', () => {
  test('counts request lifecycles per utility service', () => {
    resetBackgroundProcessActivity()
    startBackgroundProcessRequest('blume-refresh-worker', 1)
    startBackgroundProcessRequest('blume-refresh-worker', 2)

    expect(getBackgroundProcessActivity()).toEqual([
      { serviceName: 'blume-refresh-worker', activeRequests: 2 }
    ])

    finishBackgroundProcessRequest('blume-refresh-worker', 1)
    finishBackgroundProcessRequest('blume-refresh-worker', 2)
    expect(getBackgroundProcessActivity()).toEqual([])
    expect(getBackgroundProcessActiveRequestCount('blume-refresh-worker')).toBe(0)
  })

  test('records successful app-requested worker terminations for later exit correlation', () => {
    resetBackgroundProcessActivity()
    const process = { kill: () => true }

    expect(terminateBackgroundProcess(process, 'blume-refresh-worker', 'idle')).toBe(true)
    expect(consumeBackgroundProcessTerminationIntent('blume-refresh-worker')).toBe('idle')
    expect(consumeBackgroundProcessTerminationIntent('blume-refresh-worker')).toBeUndefined()
  })

  test('correlates concurrent worker terminations by process instance', () => {
    resetBackgroundProcessActivity()
    const first = backgroundProcessServiceInstanceName('blume-project-path-resolution-worker', 1)
    const second = backgroundProcessServiceInstanceName('blume-project-path-resolution-worker', 2)
    const process = { kill: () => true }

    terminateBackgroundProcess(process, first, 'request-timeout')
    terminateBackgroundProcess(process, second, 'request-settled')

    expect(consumeBackgroundProcessTerminationIntent(second)).toBe('request-settled')
    expect(consumeBackgroundProcessTerminationIntent(first)).toBe('request-timeout')
    expect(getBlumeBackgroundProcessServiceName(second)).toBe(
      'blume-project-path-resolution-worker'
    )
  })

  test('does not record a termination intent when the worker was already gone', () => {
    resetBackgroundProcessActivity()
    const process = { kill: () => false }

    expect(terminateBackgroundProcess(process, 'blume-refresh-worker', 'dispose')).toBe(false)
    expect(consumeBackgroundProcessTerminationIntent('blume-refresh-worker')).toBeUndefined()
  })

  test('recognizes only Blume-owned utility service names', () => {
    expect(isBlumeBackgroundProcessService('blume-refresh-worker')).toBe(true)
    expect(isBlumeBackgroundProcessService('blume-project-path-resolution-worker')).toBe(true)
    expect(isBlumeBackgroundProcessService('blume-project-path-resolution-worker#42')).toBe(true)
    expect(isBlumeBackgroundProcessService('blume-terminal')).toBe(true)
    expect(isBlumeBackgroundProcessService('Network Service')).toBe(false)
  })
})
