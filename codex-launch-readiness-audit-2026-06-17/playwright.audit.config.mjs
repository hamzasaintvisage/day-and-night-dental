import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: /browser-audit\.spec\.mjs/,
  timeout: 620000,
  workers: 1,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'evidence/playwright-report.json' }]],
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
    trace: 'off',
    video: 'off',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
  },
})
