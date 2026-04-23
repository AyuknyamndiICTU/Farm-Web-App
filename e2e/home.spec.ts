import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  // Next.js default page has "Get started" text
  await expect(page.getByText('Get started')).toBeVisible();
});
