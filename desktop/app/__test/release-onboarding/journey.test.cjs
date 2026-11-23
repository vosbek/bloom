const { test: base, expect, _electron: electron } = require('@playwright/test')
const { access, mkdtemp, rm, writeFile } = require('node:fs/promises')
const { tmpdir } = require('node:os')
const path = require('node:path')

// Capture the Electron content surface directly. Chromium's screenshot command can
// stall after a view closes; this also works when another app has focus.
async function captureElectron(app, file) {
  const png = await app.evaluate(async ({ BrowserWindow }) => {
    const image = await BrowserWindow.getAllWindows()[0].webContents.capturePage(undefined, {
      stayHidden: true,
      stayAwake: true
    })
    return image.toPNG().toString('base64')
  })
  await writeFile(file, Buffer.from(png, 'base64'))
}

const test = base.extend({
  agentsAvailable: [true, { option: true }],
  app: async ({ agentsAvailable }, use, info) => {
    const profile = await mkdtemp(path.join(tmpdir(), 'blume-onboarding-release-'))
    let app
    const logs = []
    try {
      const env = {
        ...process.env,
        BLUME_ONBOARDING_PROFILE: profile,
        BLUME_ONBOARDING_AGENTS: agentsAvailable ? 'available' : 'unavailable',
        BLUME_ONBOARDING_OUT: path.resolve(process.env.BLUME_ONBOARDING_OUT || 'out')
      }
      await access(path.join(env.BLUME_ONBOARDING_OUT, 'renderer/index.html'))
      await access(path.join(env.BLUME_ONBOARDING_OUT, 'preload/index.js'))
      delete env.ELECTRON_RUN_AS_NODE
      app = await electron.launch({ args: [path.join(__dirname, 'host.cjs')], env, timeout: 30000 })
      app.process().stderr.on('data', (data) => logs.push(String(data)))
      await use(app)
      expect(
        logs.join(''),
        'The native fixture must cover every requested IPC channel'
      ).not.toContain('No handler registered')
    } finally {
      if (app) {
        await writeFile(info.outputPath('electron.log'), logs.join(''))
        await info.attach('Electron log', {
          path: info.outputPath('electron.log'),
          contentType: 'text/plain'
        })
        await app.close()
      }
      await rm(profile, { recursive: true, force: true, maxRetries: 5 })
    }
  },
  page: async ({ app }, use, info) => {
    const page = await app.firstWindow()
    const errors = []
    page.on('console', (message) => {
      if (message.type() === 'error') console.log('Renderer:', message.text())
    })
    page.on('pageerror', (error) => errors.push(error.message))
    await app.context().tracing.start({ screenshots: true, snapshots: true })
    try {
      await use(page)
      expect(errors, 'Renderer errors').toEqual([])
      expect(
        await app.evaluate(() => global.releaseCheckUnexpected),
        'Demo must not mutate the customer host'
      ).toEqual([])
    } finally {
      await captureElectron(app, info.outputPath('electron.png')).catch(() => {})
      await info
        .attach('Electron screenshot', {
          path: info.outputPath('electron.png'),
          contentType: 'image/png'
        })
        .catch(() => {})
      await app.context().tracing.stop({ path: info.outputPath('trace.zip') })
    }
  }
})

// Skip and Restart live in the guide's More menu (the ellipsis in its header).
async function skipWalkthrough(page) {
  await page
    .getByRole('region', { name: 'Guided walkthrough' })
    .getByRole('button', { name: 'Walkthrough options', exact: true })
    .click()
  await page.getByRole('menuitem', { name: 'Skip walkthrough', exact: true }).click()
}

test('setup: plugin controls and the complete prompt in light and dark themes', async ({
  page,
  app
}, info) => {
  await skipWalkthrough(page)
  await expect(page.getByRole('heading', { name: 'Welcome to Blume', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: /^(Resume|Try) example deliveries$/ })).toHaveCount(
    0
  )
  const install = page.getByRole('button', { name: 'Install Blume in Codex', exact: true })
  const prompt = page.locator('[data-prompt-card]')
  await expect(install).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Install Blume in Claude Code', exact: true })
  ).toBeVisible()
  await expect(prompt).toHaveCount(0)

  const theme = async (name) => {
    const toggle = page.getByRole('button', { name: `Switch to ${name} theme`, exact: true })
    if (await toggle.count()) await toggle.click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', name)
    await expect(page.locator('html')).not.toHaveAttribute('data-theme-wave', '')
  }
  const capture = async (name, target) => {
    for (const width of [430, 1440]) {
      await app.evaluate(
        ({ BrowserWindow }, width) => BrowserWindow.getAllWindows()[0].setContentSize(width, 1000),
        width
      )
      await expect.poll(() => page.evaluate(() => innerWidth)).toBe(width)
      await target.scrollIntoViewIfNeeded()
      await expect(target).toBeVisible()
      await page.waitForTimeout(350)
      await captureElectron(app, info.outputPath(`${name}-${width}.png`))
    }
  }
  for (const name of ['light', 'dark']) {
    await theme(name)
    await capture(`${name}-plugin-install`, install)
  }
  await install.click()
  await expect(prompt).toBeVisible()
  expect(await app.evaluate(() => global.releaseCheckInstalls)).toEqual([['codex']])
  for (const text of [
    'Find one small, useful improvement in this project.',
    'Name the delivery after the result a user will get.',
    'Include clear acceptance checks in the plan.',
    'Leave it in Plan, give me its link',
    "Don't change project files other than the delivery's plan file"
  ])
    await expect(prompt).toContainText(text)
  await expect(prompt.getByRole('button', { name: 'Copy prompt', exact: true })).toBeEnabled()
  for (const name of ['dark', 'light']) {
    await theme(name)
    await capture(`${name}-delivery-prompt`, prompt)
    // Keep a complete, readable view of the prompt even when the setup page scrolls.
    await prompt.screenshot({ path: info.outputPath(`${name}-complete-prompt.png`) })
  }
  await page.reload()
  await expect(prompt).toBeVisible()
  await expect(prompt).toContainText('Find one small, useful improvement')
})

test.describe('setup without a local agent', () => {
  test.use({ agentsAvailable: false })
  test('known agents remain visible instead of an empty install toolbar', async ({
    page,
    app
  }, info) => {
    await skipWalkthrough(page)
    await expect(page.getByRole('heading', { name: 'Welcome to Blume', exact: true })).toBeVisible()
    const agents = page.getByRole('group', { name: 'Blume in your agents' })
    await expect(agents).toContainText('Claude Code')
    await expect(agents).toContainText('Codex')
    await expect(page.locator('[data-step="connect"]')).toContainText('Install Claude Code')
    await expect(page.locator('[data-prompt-card]')).toHaveCount(0)
    await page.waitForTimeout(350)
    await captureElectron(app, info.outputPath('no-local-agent.png'))
  })
})

test('release: actual onboarding journey, reload and clear', async ({ page, app }, info) => {
  const guide = page.getByRole('region', { name: 'Guided walkthrough' })
  const highlighted = async (target) => {
    await expect
      .poll(
        async () => {
          const ring = await page.locator('[data-guided-overlay] > [aria-hidden]').boundingBox()
          const box = await target.boundingBox()
          return Boolean(
            ring &&
            box &&
            ['x', 'y', 'width', 'height'].every((key) => Math.abs(ring[key] - box[key]) < 3)
          )
        },
        { message: 'Guide must highlight the actual next control' }
      )
      .toBe(true)
  }
  const click = async (name) => {
    // Approve is the bar's: the Decision part repeats it at the document's foot.
    // The guide's own action repeats the control it points at; press the page's control.
    const button = String(name).startsWith('/^Approve')
      ? page.locator('button[data-decision-entry][data-approve]')
      : page
          .getByRole('button', { name, exact: typeof name === 'string' })
          .and(page.locator(':not([data-arrow-popover] *)'))
    if (name === 'Mark reviewed' || name === 'Send answer' || String(name).startsWith('/^Approve'))
      await highlighted(button)
    await button.click()
  }
  const captures = []
  let currentStage = 'Start'
  const shot = async (name) => {
    // Let the coachmark's geometry observer catch up with native page motion.
    await page.waitForTimeout(350)
    const title = `${String(captures.length + 1).padStart(2, '0')} · ${name}`
    const file = info.outputPath(`${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.png`)
    await captureElectron(app, file)
    await info.attach(title, { path: file, contentType: 'image/png' })
    captures.push({ title, file })
    await writeFile(info.outputPath('flow.json'), JSON.stringify(captures, null, 2))
  }
  const invoiceRow = page
    .locator('[data-list-item]')
    .filter({ hasText: 'Example · Export invoices as PDF' })
  const stage = async (n, phase, list = false) => {
    currentStage = phase
    console.log(`Checking stop ${n}: ${phase}`)
    await expect(guide).toContainText(`${n} of 4`)
    if (list) {
      // The walkthrough shows the deliveries as a list, never the phase board.
      await expect(invoiceRow).toContainText(phase)
      await expect(page.getByRole('region', { name: 'Deliveries by phase' })).toHaveCount(0)
    } else {
      await expect(page.getByRole('region', { name: 'The delivery', exact: true })).toBeVisible()
      await expect(page).toHaveURL(/delivery=onboarding-example-invoice/)
    }
    await shot(`${currentStage} ${list ? 'list' : 'delivery'}`)
  }
  const layouts = async (label) => {
    for (const width of [360, 430, 900, 1440]) {
      await app.evaluate(
        ({ BrowserWindow }, width) => BrowserWindow.getAllWindows()[0].setContentSize(width, 900),
        width
      )
      await expect.poll(() => page.evaluate(() => innerWidth)).toBe(width)
      await expect
        .poll(async () => {
          const box = await guide.boundingBox()
          return Boolean(
            box &&
            box.x >= 0 &&
            box.y >= 0 &&
            box.x + box.width <= width + 1 &&
            box.y + box.height <= 901
          )
        })
        .toBe(true)
      if (label.startsWith('Outcome brief') || label === 'Outcome all evidence') {
        // The bar's Approve stays on screen; the Decision part repeats it at the document's foot.
        const approve = page.locator('button[data-decision-entry][data-approve]')
        await expect
          .poll(
            async () => {
              const box = await approve.boundingBox()
              return Boolean(box && box.x >= 0 && box.x + box.width <= width + 1)
            },
            { message: 'Approval must stay fully inside the window' }
          )
          .toBe(true)
        if (width < 640) {
          // In verification the guide collapses; More shows its points, Less folds them.
          const more = guide.getByRole('button', { name: 'More', exact: true })
          await expect(more).toBeVisible()
          await expect(guide).not.toContainText('Inspect the evidence')
          await more.click()
          await expect(guide).toContainText('Inspect the evidence')
          await guide.getByRole('button', { name: 'Less', exact: true }).click()
          await expect(guide).not.toContainText('Inspect the evidence')
        }
      }
      await shot(`${label} at ${width}px`)
    }
  }
  await expect(guide).toBeVisible()
  expect(await page.evaluate(() => Boolean(window.api && window.blumeControl))).toBe(true)
  await stage(1, 'Start', true)
  await test.step('phases, who acts and the guide on the invoice row', async () => {
    for (const phase of ['Start', 'Plan', 'Build', 'Test', 'Review', 'Release', 'Done'])
      await expect(guide).toContainText(phase)
    await expect(guide).toContainText('Your agent does the work; you make the calls')
    await expect(guide).toContainText('You approve outcome, then merge')
    await expect(guide).toContainText('Your approval, or live on merge')
    await expect(guide.getByRole('button', { name: 'Open example', exact: true })).toBeVisible()
    await layouts('Phase overview')
    // Next goes to where the example needs you: its outcome review.
    await guide.getByRole('button', { name: 'Next', exact: true }).click()
    await stage(2, 'Review')
    await expect(guide).toContainText('The agent brings the result, its proof and its limits')
  })
  await test.step('active outcome review survives reload', async () => {
    const review = page
      .getByRole('group', { name: 'Outcome review', exact: true })
      .getByRole('button', { name: 'Review', exact: true })
    await highlighted(review)
    await review.click()
    await expect(
      page.getByRole('heading', { name: 'Your invoice, ready to send.', exact: true })
    ).toBeVisible()
    const reviewUrl = page.url()
    await page.reload()
    await expect(page).toHaveURL(reviewUrl)
    await expect(
      page.getByRole('heading', { name: 'Your invoice, ready to send.', exact: true })
    ).toBeVisible()
    await expect(guide).toContainText('open the invoice evidence')
    await layouts('Outcome brief cover')
    await page.getByRole('button', { name: 'Next in the brief', exact: true }).click()
    await expect(
      page.getByRole('heading', { name: 'Every line item makes it into the PDF.', exact: true })
    ).toBeVisible()
    await layouts('Outcome brief matching details')
    await page.getByRole('button', { name: 'Next in the brief', exact: true }).click()
    await expect(
      page.getByRole('heading', {
        name: 'One invoice checked. The edge cases still need proof.',
        exact: true
      })
    ).toBeVisible()
    await layouts('Outcome brief limits')
    // Resizing reflows the document and the page follows the reading, so go by the contents.
    await page
      .getByRole('navigation', { name: 'Contents', exact: true })
      .getByRole('button', { name: /All the evidence/ })
      .click()
    await expect(page.getByRole('main', { name: 'All the evidence', exact: true })).toBeVisible()
    await expect(
      page.getByRole('region', { name: 'Every line item makes it into the PDF.', exact: true })
    ).toContainText('Both line items and the $320.00 total match')
    await layouts('Outcome all evidence')
    // macOS CI can constrain the content height to 656px. Follow the guide's
    // persistent evidence tab: scrolling an offscreen card into view can move
    // the guide over the click while the active document part changes.
    await app.evaluate(({ BrowserWindow }) =>
      BrowserWindow.getAllWindows()[0].setContentSize(1440, 656)
    )
    await expect.poll(() => page.evaluate(() => innerHeight)).toBe(656)
    const evidenceTab = page
      .locator('nav[aria-label="This part and its evidence"] [data-evidence-row] button')
      .first()
    await highlighted(evidenceTab)
    await evidenceTab.click()
    await expect(
      page
        .getByRole('button', { name: 'Mark reviewed', exact: true })
        .and(page.locator(':not([data-arrow-popover] *)'))
    ).toBeVisible()
    const evidence = page.locator('[data-walkthrough-surface]')
    await expect(evidence).toContainText('Compare the invoice with the downloaded PDF')
    await expect(evidence).toContainText('INV-1042')
    await expect(evidence).toContainText('$320.00')
    await expect(evidence).toContainText('not a real browser test')
    await expect(evidence).not.toContainText('Not reported')
    await expect(evidence).toContainText('ask the agent for those checks before approving')
    await layouts('Outcome evidence')
    await page.getByRole('button', { name: 'Switch to dark theme', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect(page.locator('html')).not.toHaveAttribute('data-theme-wave', '')
    await layouts('Dark outcome evidence')
    await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect(page.locator('html')).not.toHaveAttribute('data-theme-wave', '')
    await click('Mark reviewed')
    await shot('Outcome reviewed and ready to approve')
    await click(/^Approve/)
    await stage(3, 'Release')
  })
  await test.step('direct review to deployment flow and completion', async () => {
    await expect(guide).toContainText('goes out the way your workspace is set up')
    await expect(guide).toContainText('goes live on merge')
    await expect(guide).toContainText('set it up with the Blume plugin')
    await expect(page.getByRole('region', { name: 'The delivery', exact: true })).toContainText(
      'Production'
    )
    await layouts('Deployment')
    await guide.getByRole('button', { name: 'Next', exact: true }).click()
    await expect(guide).toContainText('4 of 4')
    await expect(guide).toContainText('The invoice delivery went from Start to Done')
    await shot('Done')
    await guide.getByRole('button', { name: 'Finish onboarding', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Welcome to Blume', exact: true })).toBeVisible()
    await shot('Welcome after completing onboarding')
  })
  await test.step('completion persists without a replay banner', async () => {
    await expect(guide).toHaveCount(0)
    await expect(
      page.getByRole('button', { name: /Example · Export invoices as PDF/ })
    ).toHaveCount(0)
    await expect(page.getByRole('alert')).toHaveCount(0)
    await shot('Demo board cleared and real workspace restored')
    await page.reload()
    await expect(
      page.getByRole('button', { name: /^(Resume|Try) example deliveries$/ })
    ).toHaveCount(0)
    await expect(guide).toHaveCount(0)
    await expect(page.getByRole('alert')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Welcome to Blume', exact: true })).toBeVisible()
    await shot('Welcome persists after reload')
  })
})
