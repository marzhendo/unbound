import { Page } from '@playwright/test';

export async function dismissIntroIfPresent(page: Page) {
  const overlay = page.locator('aside[aria-label="Pengantar Interaktif Buku Kenangan"]');
  const skipBtn = page.locator('button:has-text("Lewati Intro")');
  try {
    await skipBtn.waitFor({ state: 'visible', timeout: 6000 });
    await skipBtn.click({ force: true });
    await overlay.waitFor({ state: 'detached', timeout: 6000 });
  } catch {
    // Intro overlay was skipped or already detached
  }
}
