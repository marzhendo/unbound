import { test, expect } from '@playwright/test';
import { dismissIntroIfPresent } from './helpers';

test.describe('Hero scroll and exit behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissIntroIfPresent(page);
  });

  test('Hero heading is solid yellow and visible after intro', async ({ page }) => {
    const heading = page.locator('#home h1:has-text("A SPACE FOR THE UNBOUND")');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/text-brand-primary/);
  });

  test('Hero content smoothly fades to opacity 0 on scroll before entering Characters', async ({ page }) => {
    await page.waitForTimeout(500);

    // Initial state: hero content visible
    const heroContent = page.locator('#home .relative.z-10.max-w-4xl');
    await expect(heroContent).toBeVisible();

    // Scroll down 600px into Characters section
    await page.evaluate(() => {
      window.scrollTo(0, 600);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(400);

    // Hero content should be completely invisible (opacity 0)
    await expect(heroContent).toHaveCSS('opacity', '0');

    // Characters heading should be visible and unobstructed
    const charsHeading = page.locator('#characters h2:has-text("Tokoh Utama")');
    await expect(charsHeading).toBeInViewport();
  });

  test('Trailer modal opens and closes cleanly', async ({ page }) => {
    await page.click('button:has-text("Tonton Trailer")');
    const iframe = page.locator('iframe[title="Trailer Resmi A Space for the Unbound"]');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('src', /L08ZBQswnus/);

    // Close modal
    await page.keyboard.press('Escape');
    await expect(iframe).not.toBeVisible();
  });
});
