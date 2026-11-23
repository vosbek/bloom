const { defineConfig } = require('@playwright/test')
const path = require('node:path')
const results = path.resolve(
  process.env.BLUME_ONBOARDING_RESULTS || 'test-results/release-onboarding'
)
module.exports = defineConfig({
  testDir: __dirname,
  testMatch: 'journey.test.cjs',
  workers: 1,
  retries: 0,
  timeout: 180000,
  expect: { timeout: 15000 },
  outputDir: path.join(results, 'artifacts'),
  reporter: [['list'], ['junit', { outputFile: path.join(results, 'results.xml') }]],
  use: { actionTimeout: 15000 }
})
