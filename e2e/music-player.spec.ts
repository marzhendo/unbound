import { test, expect } from '@playwright/test';
import { dismissIntroIfPresent } from './helpers';

test.describe('Floating MusicPlayer Component (<MusicPlayer />)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissIntroIfPresent(page);
  });

  test('should render collapsed button at bottom-right without mounting any Spotify iframe', async ({ page }) => {
    const collapsedBtn = page.locator('button[aria-label*="Buka pemutar musik OST resmi"]');
    await expect(collapsedBtn).toBeVisible();

    // Verify ZERO iframe elements exist before user interaction
    const iframesCount = await page.evaluate(() => {
      return document.querySelectorAll('iframe[src*="spotify"]').length;
    });
    expect(iframesCount).toBe(0);
  });

  test('should expand card and mount Spotify iframe on click', async ({ page }) => {
    const collapsedBtn = page.locator('button[aria-label*="Buka pemutar musik OST resmi"]');
    await collapsedBtn.click();

    // Expanded card should appear
    const expandedCard = page.locator('div[role="region"][aria-label*="Pemutar musik OST resmi"]');
    await expect(expandedCard).toBeVisible();

    // Title and credits
    await expect(page.locator('h3:has-text("Dengarkan OST Resmi")')).toBeVisible();
    await expect(page.locator('text=Masdito ‘ittou’ Bachtiar')).toBeVisible();

    // Spotify iframe is now mounted in tabpanel
    const iframe = page.locator('div[role="tabpanel"] iframe');
    await expect(iframe).toBeVisible();
  });

  test('should render 90s Cassette Tape icon and maintain exact viewport position across open/minimize cycles', async ({ page }) => {
    const collapsedBtn = page.locator('button[aria-label*="Buka pemutar musik OST resmi"]');
    await expect(collapsedBtn).toBeVisible();

    // Verify CassetteTape icon is rendered
    await expect(collapsedBtn.locator('svg.lucide-cassette-tape')).toBeVisible();

    // Record initial viewport coordinates (unhovered)
    await page.mouse.move(0, 0);
    const initialBox = await collapsedBtn.boundingBox();
    expect(initialBox).not.toBeNull();

    // Cycle 1: Open and minimize via Minus button
    await collapsedBtn.click();
    const expandedCard = page.locator('div[role="region"][aria-label*="Pemutar musik OST resmi"]');
    await expect(expandedCard).toBeVisible();
    await expect(expandedCard.locator('svg.lucide-cassette-tape')).toBeVisible();
    await page.waitForTimeout(200);

    await page.click('button[aria-label*="Minimize"]');
    await expect(expandedCard).not.toBeVisible();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(350);

    const boxAfterCycle1 = await collapsedBtn.boundingBox();
    expect(boxAfterCycle1).not.toBeNull();
    expect(Math.abs((boxAfterCycle1?.x ?? 0) - (initialBox?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((boxAfterCycle1?.y ?? 0) - (initialBox?.y ?? 0))).toBeLessThanOrEqual(1);

    // Cycle 2: Open and minimize via Escape key
    await collapsedBtn.click();
    await expect(expandedCard).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(expandedCard).not.toBeVisible();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(350);

    const boxAfterCycle2 = await collapsedBtn.boundingBox();
    expect(boxAfterCycle2).not.toBeNull();
    expect(Math.abs((boxAfterCycle2?.x ?? 0) - (initialBox?.x ?? 0))).toBeLessThanOrEqual(1);
    expect(Math.abs((boxAfterCycle2?.y ?? 0) - (initialBox?.y ?? 0))).toBeLessThanOrEqual(1);
  });

  test('should switch Spotify albums between Part 1, Part 2, and Part 3 tabs', async ({ page }) => {
    await page.click('button[aria-label*="Buka pemutar musik OST resmi"]');
    const expandedCard = page.locator('div[role="region"][aria-label*="Pemutar musik OST resmi"]');
    await expect(expandedCard).toBeVisible();
    await page.waitForTimeout(200);

    // Tab 2: Part 2
    await page.click('button[role="tab"]:has-text("Part 2")');
    await expect(page.locator('button[role="tab"]:has-text("Part 2")')).toHaveAttribute('aria-selected', 'true');

    // Tab 3: Part 3
    await page.click('button[role="tab"]:has-text("Part 3")');
    await expect(page.locator('button[role="tab"]:has-text("Part 3")')).toHaveAttribute('aria-selected', 'true');

    // Tab 1: Part 1
    await page.click('button[role="tab"]:has-text("Part 1")');
    await expect(page.locator('button[role="tab"]:has-text("Part 1")')).toHaveAttribute('aria-selected', 'true');
  });

  test('should NOT unmount Spotify iframe when collapsed/minimized, keeping it in DOM for uninterrupted playback', async ({ page }) => {
    await page.click('button[aria-label*="Buka pemutar musik OST resmi"]');
    const expandedCard = page.locator('div[role="region"][aria-label*="Pemutar musik OST resmi"]');
    await expect(expandedCard).toBeVisible();
    await expect(page.locator('div[role="tabpanel"] iframe')).toBeVisible();
    await page.waitForTimeout(200);

    // Minimize via Minus button
    await page.click('button[aria-label*="Minimize"]');

    // Card should be visually collapsed/hidden
    await expect(expandedCard).not.toBeVisible();

    // CRITICAL REQUIREMENT: Iframe MUST STILL REMAIN in DOM!
    const iframesAfterMinimize = await page.evaluate(() => {
      return document.querySelectorAll('div[role="tabpanel"] iframe').length;
    });
    expect(iframesAfterMinimize).toBe(1);

    // Collapsed button should be visible again
    const collapsedBtn = page.locator('button[aria-label*="Buka pemutar musik OST resmi"]');
    await expect(collapsedBtn).toBeVisible();

    // Reopen and minimize via Escape key
    await collapsedBtn.click();
    await expect(expandedCard).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(expandedCard).not.toBeVisible();

    // Still in DOM!
    const iframesAfterEsc = await page.evaluate(() => {
      return document.querySelectorAll('div[role="tabpanel"] iframe').length;
    });
    expect(iframesAfterEsc).toBe(1);
  });

  test('should pause music when YouTube trailer modal opens', async ({ page }) => {
    // Open music player first so iframe is mounted
    await page.click('button[aria-label*="Buka pemutar musik OST resmi"]');
    await expect(page.locator('div[role="tabpanel"] iframe')).toBeVisible();

    // Spy on asftu:pause-music event
    const pauseEventPromise = page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        window.addEventListener('asftu:pause-music', () => resolve(true), { once: true });
      });
    });

    // Click "Tonton Trailer" button in Hero
    const trailerBtn = page.locator('button:has-text("Tonton Trailer")');
    await trailerBtn.click();

    // Expect the custom event to have fired
    const eventFired = await pauseEventPromise;
    expect(eventFired).toBe(true);

    // Verify trailer modal is open
    await expect(page.locator('iframe[title="Trailer Resmi A Space for the Unbound"]')).toBeVisible();
  });

  test('should verify Best Storytelling badge in Hero is repositioned to bottom-left', async ({ page }) => {
    const badge = page.locator('div.pointer-events-auto:has-text("Best Storytelling • SEA Game Awards 2020")');
    await expect(badge).toBeVisible();

    // Verify position relative to viewport (left half of the screen)
    const box = await badge.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      const viewport = page.viewportSize();
      if (viewport && viewport.width >= 640) {
        // On desktop/tablet, badge must be on the left half of the screen (< 50% width)
        expect(box.x).toBeLessThan(viewport.width / 2);
      }
    }
  });
});


