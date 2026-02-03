import { test as setup, expect } from '@playwright/test';
import { bypassIfNeeded, getDomain } from '../helpers/bypass.helper';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    console.log('Authenticating...');
    await bypassIfNeeded(page);
    await page.context().storageState({ path: authFile });
    
    console.log('Authentication saved to ' + authFile);
});