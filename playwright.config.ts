import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'ipad-pro-11', use: { ...devices['iPad Pro 11'] } },
    { name: 'ipad-mini', use: { ...devices['iPad Mini'] } },
    { name: 'iphone-14', use: { ...devices['iPhone 14'] } }
  ]
});
