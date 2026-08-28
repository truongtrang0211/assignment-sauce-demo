import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { defineBddConfig } from 'playwright-bdd';

// 1. Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 2. Safe headless mode resolution (handles whitespace and case insensitivity)
const isHeadless = process.env.HEADLESS?.trim().toLowerCase() === 'false' ? false : true;

// 3. Configure Feature files and Step Definitions location
const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: ['src/steps/**/*.ts', 'src/fixtures/**/*.ts'],
});

export default defineConfig({
  testDir,

  // 4. Parallel / Sequential execution configuration
  // - fullyParallel: true -> enables scenarios within the same file to run in parallel
  fullyParallel: true,

  // - workers: 1 -> Sequential execution (one test at a time)
  // - workers: N (e.g. 2, 4) -> Parallel execution across N worker processes
  // - Default: uses 50% of available logical CPU cores when undefined
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS.trim()) : undefined,

  // 5. Test Reporters
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  // 6. Shared browser settings
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    headless: isHeadless,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // 7. Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
