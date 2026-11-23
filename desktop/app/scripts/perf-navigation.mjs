#!/usr/bin/env node
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * Repeatable navigation benchmark over the Chrome DevTools Protocol. No dependencies (Node 22+
 * global WebSocket and fetch).
 *
 * It attaches to a running app page, clicks through the rail (Deliveries, Projects, Improve,
 * Tests, Plugin), opens the first delivery (and a conversation when given), for several rounds,
 * with real (trusted) mouse input. Per step it prints:
 *   frame    input → the new page's first frame: double rAF after the first DOM change that
 *            follows the URL change (≤100 ms budget); matches the in-app route timing
 *   content  input → the last DOM change before the page went quiet (async data, lazy chunks)
 *   long     renderer long-task time inside the step
 *   inp      slowest Event Timing entry of the click (input → next paint; blank when under 16 ms)
 * and, in Electron, main's IPC handler table and event-loop stalls from perf:snapshot.
 *
 * Electron (dev, sandboxed user data):
 *   pnpm --filter @blume/desktop dev:e2e -- --remoteDebuggingPort 9334
 *   node apps/desktop/scripts/perf-navigation.mjs --cdp 9334
 * Web Lab: start Chrome with --remote-debugging-port=9334, open Web Lab, then
 *   node apps/desktop/scripts/perf-navigation.mjs --cdp 9334 --target localhost:5174
 *
 * Options: --rounds N (default 5), --warmup N (rounds excluded from stats, default 1),
 *   --target <url substring>, --conversation <ref> (open #/agents/<ref> each round),
 *   --quiet-ms N (DOM quiet window, default 150), --timeout-ms N (per step, default 8000),
 *   --pause-ms N (between steps, default 250), --no-reset (keep main's perf counters),
 *   --json <file> (write raw samples). Keep the window visible: hidden pages throttle frames.
 */

import { writeFileSync } from 'node:fs'

const RAIL = ['Deliveries', 'Projects', 'Improve', 'Tests', 'Plugin']
const VIEW_SWITCH_BUDGET_MS = 100
const DELIVERY_ROW = '#hybrid-content button[data-list-interaction]'

function parseArgs(argv) {
  const options = {
    cdp: null,
    rounds: 5,
    warmup: 1,
    target: null,
    conversation: null,
    quietMs: 150,
    timeoutMs: 8_000,
    pauseMs: 250,
    reset: true,
    json: null
  }
  const numeric = {
    '--cdp': 'cdp',
    '--rounds': 'rounds',
    '--warmup': 'warmup',
    '--quiet-ms': 'quietMs',
    '--timeout-ms': 'timeoutMs',
    '--pause-ms': 'pauseMs'
  }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--help' || arg === '-h') {
      options.help = true
    } else if (arg === '--no-reset') {
      options.reset = false
    } else if (numeric[arg]) {
      const value = Number(argv[++index])
      if (!Number.isFinite(value) || value < 0) throw new Error(`${arg} needs a number`)
      options[numeric[arg]] = value
    } else if (arg === '--target' || arg === '--conversation' || arg === '--json') {
      const value = argv[++index]
      if (!value) throw new Error(`${arg} needs a value`)
      options[arg.slice(2)] = value
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }
  return options
}

class CdpSession {
  #ws
  #nextId = 1
  #pending = new Map()

  static async connect(url) {
    const session = new CdpSession()
    session.#ws = new WebSocket(url)
    await new Promise((resolve, reject) => {
      session.#ws.addEventListener('open', resolve, { once: true })
      session.#ws.addEventListener('error', () => reject(new Error(`Cannot connect to ${url}`)), {
        once: true
      })
    })
    session.#ws.addEventListener('message', (event) => {
      const message = JSON.parse(String(event.data))
      const pending = message.id && session.#pending.get(message.id)
      if (!pending) return
      session.#pending.delete(message.id)
      if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`))
      else pending.resolve(message.result)
    })
    session.#ws.addEventListener('close', () => {
      for (const pending of session.#pending.values()) pending.reject(new Error('CDP closed'))
      session.#pending.clear()
    })
    return session
  }

  send(method, params = {}) {
    const id = this.#nextId++
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject, method })
      this.#ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true
    })
    if (result.exceptionDetails) {
      const detail = result.exceptionDetails.exception?.description ?? result.exceptionDetails.text
      throw new Error(`Page evaluation failed: ${detail}`)
    }
    return result.result.value
  }

  close() {
    this.#ws.close()
  }
}

async function findPageTarget(port, filter) {
  const response = await fetch(`http://127.0.0.1:${port}/json/list`)
  if (!response.ok) throw new Error(`CDP /json/list returned ${response.status}`)
  const targets = (await response.json()).filter(
    (target) =>
      target.type === 'page' &&
      target.webSocketDebuggerUrl &&
      !target.url.startsWith('devtools://') &&
      // The menu-bar popover is a data: URL page.
      !target.url.startsWith('data:') &&
      (!filter || target.url.includes(filter))
  )
  if (targets.length === 0) {
    throw new Error(`No page target on port ${port}${filter ? ` matching "${filter}"` : ''}`)
  }
  return targets.find((target) => target.url.includes('#/')) ?? targets[0]
}

// Installed once per page. Bounded buffers; history is patched only to timestamp route changes.
// A route switch is painted at the double rAF after the first DOM change that follows the URL
// change: React may hold the old page (transitions, lazy chunks, data) well past the URL change.
const PAGE_HELPER = String.raw`(() => {
  if (window.__blumeNavBench?.version === 2) return true
  const longTasks = []
  const events = []
  const keep = (list, item) => { list.push(item); if (list.length > 500) list.shift() }
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) keep(longTasks, { start: e.startTime, ms: e.duration })
    }).observe({ type: 'longtask', buffered: true })
  } catch {}
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (e.interactionId) keep(events, { start: e.startTime, ms: e.duration, name: e.name })
      }
    }).observe({ type: 'event', durationThreshold: 16, buffered: true })
  } catch {}
  let step = null
  let lastMutationAt = performance.now()
  new MutationObserver(() => {
    lastMutationAt = performance.now()
    if (!step || step.urlAt === null || step.commitAt !== null) return
    step.commitAt = lastMutationAt
    afterNextFrame(() => { if (step && step.routeFrameAt === null) step.routeFrameAt = performance.now() })
  }).observe(document.documentElement, {
    subtree: true, childList: true, characterData: true
  })
  const afterNextFrame = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback))
  const markInput = (at) => {
    if (!step || step.inputAt !== null) return
    step.inputAt = at
    afterNextFrame(() => { if (step && step.inputFrameAt === null) step.inputFrameAt = performance.now() })
  }
  const markRoute = () => {
    if (!step || step.urlAt !== null || location.href === step.href) return
    step.urlAt = performance.now()
  }
  addEventListener('pointerdown', (event) => { if (event.isTrusted) markInput(event.timeStamp) }, true)
  addEventListener('hashchange', markRoute, true)
  addEventListener('popstate', markRoute, true)
  for (const method of ['pushState', 'replaceState']) {
    const original = history[method]
    history[method] = function (...args) {
      const result = original.apply(this, args)
      markRoute()
      return result
    }
  }
  const sum = (list, from, to) => list.reduce((acc, item) => acc + Math.max(0, Math.min(item.start + item.ms, to) - Math.max(item.start, from)), 0)
  window.__blumeNavBench = {
    version: 2,
    arm() {
      step = { href: location.href, inputAt: null, inputFrameAt: null, urlAt: null, commitAt: null, routeFrameAt: null }
    },
    hashNavigate(hash) {
      this.arm()
      markInput(performance.now())
      location.hash = hash
    },
    rectOf(selector, label) {
      const candidates = [...document.querySelectorAll(selector)].filter((el) => {
        if (label && el.getAttribute('aria-label') !== label) return false
        const rect = el.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
      })
      const el = candidates[0]
      if (!el) return null
      el.scrollIntoView({ block: 'center', inline: 'nearest' })
      const rect = el.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    },
    settle(quietMs, timeoutMs) {
      const started = performance.now()
      return new Promise((resolve) => {
        const poll = () => {
          const now = performance.now()
          const s = step
          const frameAt = s.urlAt !== null ? s.routeFrameAt : s.inputFrameAt
          const timedOut = now - started > timeoutMs
          // After a URL change, quiet only counts once the new page has started to render.
          const quiet = now - lastMutationAt >= quietMs && (s.urlAt === null || s.commitAt !== null)
          if (!timedOut && (s.inputAt === null || frameAt === null || !quiet)) {
            setTimeout(poll, 16)
            return
          }
          const inputAt = s.inputAt ?? started
          const contentAt = quiet ? Math.max(lastMutationAt, frameAt ?? s.urlAt ?? inputAt) : null
          const end = Math.max(frameAt ?? now, contentAt ?? now)
          const clickEvents = events.filter((e) => e.start >= inputAt - 1 && e.start <= end)
          resolve({
            route: location.hash || location.pathname,
            navigated: s.urlAt !== null,
            frameMs: frameAt === null ? null : frameAt - inputAt,
            contentMs: contentAt === null ? null : contentAt - inputAt,
            longTaskMs: sum(longTasks, inputAt, end),
            longTaskCount: longTasks.filter((t) => t.start + t.ms > inputAt && t.start < end).length,
            inpMs: clickEvents.length ? Math.max(...clickEvents.map((e) => e.ms)) : null,
            hidden: document.hidden
          })
          step = null
        }
        poll()
      })
    }
  }
  return true
})()`

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function click(session, point) {
  const base = { x: point.x, y: point.y, button: 'left', clickCount: 1 }
  await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x, y: point.y })
  await session.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...base })
  await session.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...base })
}

/** Clicks the first visible match and measures until the page settles; null when absent. */
async function clickStep(session, options, selector, label) {
  const point = await session.evaluate(
    `window.__blumeNavBench.rectOf(${JSON.stringify(selector)}, ${JSON.stringify(label ?? null)})`
  )
  if (!point) return null
  // Let scrollIntoView land before the input.
  await sleep(50)
  await session.evaluate('window.__blumeNavBench.arm()')
  await click(session, point)
  return session.evaluate(`window.__blumeNavBench.settle(${options.quietMs}, ${options.timeoutMs})`)
}

async function hashStep(session, options, hash) {
  await session.evaluate(`window.__blumeNavBench.hashNavigate(${JSON.stringify(hash)})`)
  return session.evaluate(`window.__blumeNavBench.settle(${options.quietMs}, ${options.timeoutMs})`)
}

function percentile(values, p) {
  if (values.length === 0) return null
  const sorted = values.slice().sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1))]
}

const ms = (value) => (value === null || value === undefined ? '—' : `${Math.round(value)}`)

function printTable(headers, rows) {
  const widths = headers.map((header, column) =>
    Math.max(header.length, ...rows.map((row) => String(row[column]).length))
  )
  const line = (cells) =>
    cells
      .map((cell, column) =>
        column === 0 ? String(cell).padEnd(widths[column]) : String(cell).padStart(widths[column])
      )
      .join('  ')
  console.log(line(headers))
  console.log(widths.map((width) => '-'.repeat(width)).join('  '))
  for (const row of rows) console.log(line(row))
}

function summarize(samples) {
  const byStep = new Map()
  for (const sample of samples) {
    const list = byStep.get(sample.step) ?? []
    list.push(sample)
    byStep.set(sample.step, list)
  }
  const rows = []
  for (const [step, list] of byStep) {
    const frames = list.map((s) => s.frameMs).filter((v) => v !== null)
    const contents = list.map((s) => s.contentMs).filter((v) => v !== null)
    const inps = list.map((s) => s.inpMs).filter((v) => v !== null)
    const frameP95 = percentile(frames, 95)
    rows.push([
      `${frameP95 !== null && frameP95 > VIEW_SWITCH_BUDGET_MS ? '! ' : '  '}${step}`,
      list.length,
      ms(percentile(frames, 50)),
      ms(frameP95),
      ms(frames.length ? Math.max(...frames) : null),
      ms(percentile(contents, 50)),
      ms(percentile(contents, 95)),
      ms(list.reduce((acc, s) => acc + s.longTaskMs, 0)),
      list.reduce((acc, s) => acc + s.longTaskCount, 0),
      ms(percentile(inps, 95)),
      list.filter((s) => s.contentMs === null).length
    ])
  }
  printTable(
    [
      'step',
      'n',
      'frame p50',
      'p95',
      'max',
      'content p50',
      'p95',
      'long ms',
      'long n',
      'inp p95',
      'busy'
    ],
    rows
  )
}

function printMainStats(snapshot) {
  const channels = Object.entries(snapshot.ipcHandlers?.channels ?? {})
  console.log(
    `\nElectron main: IPC handlers (top 15 by p95, budget ${snapshot.ipcHandlers?.budgetMs ?? 50} ms)`
  )
  if (channels.length === 0) console.log('  no IPC calls recorded')
  else {
    printTable(
      ['channel', 'n', 'p50', 'p95', 'max', 'sync max', 'over'],
      channels
        .sort((a, b) => b[1].p95Ms - a[1].p95Ms)
        .slice(0, 15)
        .map(([channel, s]) => [
          `  ${channel}`,
          s.count,
          s.p50Ms.toFixed(1),
          ms(s.p95Ms),
          ms(s.maxMs),
          ms(s.maxSyncMs),
          s.overBudget
        ])
    )
  }
  for (const call of (snapshot.ipcHandlers?.slowCalls ?? []).slice(0, 5)) {
    console.log(`  slow: ${call.channel} ${ms(call.ms)} ms (sync ${ms(call.syncMs)} ms)`)
  }
  const loop = snapshot.eventLoop
  if (!loop?.enabled) {
    console.log('\nElectron main event loop: monitor not running')
    return
  }
  const windows = loop.windows ?? []
  console.log(
    `\nElectron main event loop (${loop.windowMs / 1000}s windows, budget ${loop.budgetMs} ms): ` +
      `${loop.stallCount} stalls, worst ${ms(loop.worstMs)} ms, ` +
      `window max p95 ${ms(
        percentile(
          windows.map((w) => w.maxMs),
          95
        )
      )} ms`
  )
  if (loop.lastStall) {
    console.log(
      `  last stall: ${ms(loop.lastStall.maxMs)} ms` +
        (loop.lastStall.culprit
          ? ` · longest sync block ${loop.lastStall.culprit} ${ms(loop.lastStall.culpritMs)} ms`
          : '')
    )
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help || options.cdp === null) {
    console.log('Usage: node apps/desktop/scripts/perf-navigation.mjs --cdp <port> [options]')
    console.log('See the header comment of this file for options.')
    process.exit(options.help ? 0 : 1)
  }
  const target = await findPageTarget(options.cdp, options.target)
  console.log(`Attached to ${target.url}`)
  const session = await CdpSession.connect(target.webSocketDebuggerUrl)
  try {
    await session.send('Page.bringToFront').catch(() => undefined)
    await session.evaluate(PAGE_HELPER)
    const electron = await session.evaluate('typeof window.api?.getPerfSnapshot === "function"')
    if (electron && options.reset) {
      await session.evaluate('window.api.resetPerf()')
      // The first snapshot also starts main's loop monitor in builds where it is off by default.
      await session.evaluate('window.api.getPerfSnapshot().then(() => true)')
    }
    if (await session.evaluate('document.hidden')) {
      // Hidden or fully covered windows produce no frames, so nothing below would settle.
      throw new Error('The app window is hidden or covered; bring it to the front and rerun.')
    }

    const samples = []
    let missingDelivery = false
    let reloads = 0
    const record = async (round, step, run) => {
      let result
      try {
        result = await run()
      } catch (error) {
        // A dev-server reload (HMR full reload) drops the page helper; re-install and move on.
        if (!/navigated or closed|Cannot find context/i.test(String(error?.message))) throw error
        reloads += 1
        console.warn(`Page reloaded during ${step}; sample skipped`)
        await sleep(2_000)
        await session.evaluate(PAGE_HELPER)
        return { skipped: true }
      }
      if (result) {
        if (round >= options.warmup) samples.push({ round, step, ...result })
        if (result.hidden) console.warn(`Warning: page hidden during ${step}; frames paused`)
      }
      await sleep(options.pauseMs)
      return result
    }
    const total = options.warmup + options.rounds
    for (let round = 0; round < total; round += 1) {
      process.stdout.write(
        `round ${round + 1}/${total}${round < options.warmup ? ' (warm-up)' : ''}\r`
      )
      for (const label of RAIL) {
        const result = await record(round, `rail ${label}`, () =>
          clickStep(session, options, 'nav[role="tablist"] [role="tab"]', label)
        )
        if (!result) throw new Error(`Rail tab "${label}" not found; is the app on a rail page?`)
      }
      await record(round, 'rail Deliveries', () =>
        clickStep(session, options, 'nav[role="tablist"] [role="tab"]', 'Deliveries')
      )
      const opened = await record(round, 'open delivery', () =>
        clickStep(session, options, DELIVERY_ROW)
      )
      if (!opened) missingDelivery = true
      if (!options.conversation) continue
      await record(round, 'open conversation', () =>
        hashStep(session, options, `#/agents/${encodeURIComponent(options.conversation)}`)
      )
    }
    process.stdout.write('\n')
    if (missingDelivery) console.log('Note: no delivery row was found to open on some rounds.')
    if (reloads)
      console.log(`Note: the page reloaded ${reloads}× (dev server); those steps are skipped.`)

    console.log(
      `\nRenderer (${options.rounds} rounds after ${options.warmup} warm-up; ms; ` +
        `"!" = frame p95 over the ${VIEW_SWITCH_BUDGET_MS} ms view-switch budget; ` +
        'busy = DOM never went quiet)'
    )
    summarize(samples)

    let mainSnapshot = null
    if (electron) {
      mainSnapshot = await session.evaluate('window.api.getPerfSnapshot()')
      printMainStats(mainSnapshot)
    }
    if (options.json) {
      writeFileSync(
        options.json,
        JSON.stringify(
          {
            capturedAt: new Date().toISOString(),
            target: target.url,
            options,
            samples,
            main: mainSnapshot
          },
          null,
          2
        )
      )
      console.log(`\nWrote ${options.json}`)
    }
  } finally {
    session.close()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
