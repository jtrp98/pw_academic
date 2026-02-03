import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false, 
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  workers: 1, 

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: false,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'],
    },
  ],
});