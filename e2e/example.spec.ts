import { test, expect } from '@playwright/test';
import { dismissIntroIfPresent } from './helpers';

test.use({ reducedMotion: 'reduce' });

test.describe('Navbar anchor navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissIntroIfPresent(page);
  });

  test('should scroll to Characters section', async ({ page }) => {
    await page.click('nav a[href="#characters"]');
    await expect(page.locator('#characters')).toBeInViewport();
  });

  test('should scroll to Play section via CTA', async ({ page }) => {
    await page.click('nav a[href="#play"]');
    await expect(page.locator('#play')).toBeInViewport({ timeout: 10000 });
  });
});

test.describe('Trailer modal', () => {
  test('should open video modal on click', async ({ page }) => {
    await page.goto('/');
    await dismissIntroIfPresent(page);
    await page.click('text=Tonton Trailer');
    await expect(page.locator('iframe[title="Trailer Resmi A Space for the Unbound"]')).toBeVisible();
  });
});