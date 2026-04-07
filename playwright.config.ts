import { defineConfig, devices } from '@playwright/test';

// noinspection JSUnusedGlobalSymbols: Used by Playwright
export default defineConfig({
  // Find E2E tests here
  testDir: './e2e',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left the test.only */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // page.goto('/') is enough in the test
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  /* Automatically start the dev server before tests if not running */
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
