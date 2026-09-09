import { test, expect } from '@playwright/test';
import { dismissIntroIfPresent } from './helpers';

test.use({ reducedMotion: 'reduce' });

test.describe('PetalField component and whole-page scroll journey', () => {
  test('should render PetalField canvas alongside Starfield without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await dismissIntroIfPresent(page);

    // Verify PetalField container is attached
    const petalField = page.locator('#tsparticles-petals');
    await expect(petalField).toBeAttached({ timeout: 10000 });

    // Verify Starfield container in Hero also exists
    const starfield = page.locator('#tsparticles-hero');
    await expect(starfield).toBeAttached();

    // Scroll through each section to test scroll performance and continuous particle rendering
    await page.locator('#characters').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    await page.locator('#gameplay').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    await page.locator('#news').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    await page.locator('#play').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Filter out external YouTube iframe network/ad errors if any
    const realErrors = consoleErrors.filter(
      (err) => !err.includes('youtube') && !err.includes('doubleclick') && !err.includes('googlevideo')
    );
    expect(realErrors).toHaveLength(0);
  });
});
