import { test, expect } from '@playwright/test';

test.describe('BookIntro Component (<BookIntro />)', () => {
  test('should render State 1 (Buku Tertutup) with title, book, prompt, and skip button', async ({ page }) => {
    await page.goto('/');

    // Overlay is present
    const overlay = page.locator('aside[aria-label="Pengantar Interaktif Buku Kenangan"]');
    await expect(overlay).toBeVisible({ timeout: 10000 });

    // Skip button is visible
    const skipBtn = page.locator('button:has-text("Lewati Intro")');
    await expect(skipBtn).toBeVisible();

    // Title and Cover Badge
    await expect(overlay.locator('h1:has-text("A SPACE FOR THE UNBOUND")')).toBeVisible();
    await expect(overlay.locator('text=ATMA • RAYA')).toBeVisible();

    // Prompt is visible
    await expect(overlay.locator('text=Ketuk untuk membuka kenangan...')).toBeVisible();
  });

  test('should skip intro immediately when "Lewati Intro" is clicked', async ({ page }) => {
    await page.goto('/');

    const overlay = page.locator('aside[aria-label="Pengantar Interaktif Buku Kenangan"]');
    await expect(overlay).toBeVisible({ timeout: 10000 });

    // Click "Lewati Intro"
    const skipBtn = page.locator('button:has-text("Lewati Intro")');
    await skipBtn.click();

    // Overlay should smoothly unmount
    await expect(overlay).not.toBeAttached({ timeout: 5000 });

    // Hero should now be fully interactive
    const heroTitle = page.locator('#home h1:has-text("A SPACE FOR THE UNBOUND")');
    await expect(heroTitle).toBeVisible();
  });

  test('should transition through State 1 (Closed) -> 3-Page Spread Navigation -> State 3 (Diving on Portal Click) -> Unmount', async ({ page }) => {
    await page.goto('/');

    const overlay = page.locator('aside[aria-label="Pengantar Interaktif Buku Kenangan"]');
    await expect(overlay).toBeVisible({ timeout: 10000 });

    // Click book to trigger State 2 (Opening to Spread 1)
    const book = page.locator('div[role="button"][aria-label*="Buku diary kenangan"]');
    await book.click({ force: true });

    // Wait for cover swing animation to complete
    await page.waitForTimeout(1000);

    // In Spread 1: Synopsis is visible
    await expect(overlay.locator('text=Halaman 01 • Jejak Cerita')).toBeVisible({ timeout: 5000 });
    await expect(overlay.locator('text=Kisah di Ambang Dewasa')).toBeVisible();

    // Click "Lanjut" to go to Spread 2
    const nextBtn1 = overlay.locator('button:has-text("Lanjut")');
    await nextBtn1.click({ force: true });
    await page.waitForTimeout(750);

    // In Spread 2: Rahasia Spacedive is visible
    await expect(overlay.locator('text=Halaman 02 • Rahasia Spacedive')).toBeVisible({ timeout: 5000 });
    await expect(overlay.locator('text=Kekuatan Spacedive Raya')).toBeVisible();

    // Verify "Kembali" button works to go back to Spread 1
    const backBtn = overlay.locator('button[aria-label="Kembali ke halaman pertama"]');
    await backBtn.click({ force: true });
    await page.waitForTimeout(750);
    await expect(overlay.locator('text=Halaman 01 • Jejak Cerita')).toBeVisible({ timeout: 5000 });

    // Go back to Spread 2, then Spread 3
    await overlay.locator('button:has-text("Lanjut")').click({ force: true });
    await page.waitForTimeout(750);
    await expect(overlay.locator('text=Halaman 02 • Rahasia Spacedive')).toBeVisible({ timeout: 5000 });

    await overlay.locator('button:has-text("Lanjut")').click({ force: true });
    await page.waitForTimeout(750);

    // In Spread 3: Portal should appear on right page with "Sentuh untuk menyelam"
    const portal = overlay.locator('div[role="button"][aria-label*="Portal ingatan Spacedive"]');
    await expect(portal).toBeVisible({ timeout: 5000 });
    await expect(overlay.locator('span:has-text("Sentuh untuk menyelam")')).toBeVisible();

    // Click the portal to trigger State 3 (Diving)
    await portal.click({ force: true });

    // State 3 (Diving) text indicator
    await expect(
      overlay.locator('text=Menyelam ke dalam ingatan...').or(overlay.locator('text=Pintu kenangan terbuka'))
    ).toBeVisible({ timeout: 3000 });

    // Eventually unmounts completely within ~3 seconds after diving
    await expect(overlay).not.toBeAttached({ timeout: 10000 });

    // Underlying content is visible
    await expect(page.locator('#home')).toBeVisible();
  });

  test('should immediately skip intro when prefers-reduced-motion is active', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const overlay = page.locator('aside[aria-label="Pengantar Interaktif Buku Kenangan"]');
    // Overlay should not be present
    await expect(overlay).not.toBeAttached({ timeout: 2000 });

    // Hero title is immediately visible
    await expect(page.locator('#home h1:has-text("A SPACE FOR THE UNBOUND")')).toBeVisible();
  });
});
