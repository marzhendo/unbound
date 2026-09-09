import { test, expect } from '@playwright/test';
import { dismissIntroIfPresent } from './helpers';

test.describe('Deep Dive Section (<DeepDive />)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissIntroIfPresent(page);
  });

  test('should render Deep Dive section with folio, heading, and navbar anchor', async ({ page }) => {

    const section = page.locator('#deep-dive');
    await expect(section).toBeAttached();

    // Check Folio Indicator
    const folio = section.locator('text=Kenangan 03');
    await expect(folio).toBeAttached();

    // Check Heading & Subheading
    const heading = section.getByRole('heading', { name: 'Sisi Lain yang Tersembunyi' });
    await expect(heading).toBeAttached();
    await expect(section.locator('text=Setiap orang punya lapisan yang tak terlihat dari luar.')).toBeAttached();

    // Verify Deep Dive is hidden from the main Navbar menu (secret discovery section)
    const navLink = page.locator('nav a[href="#deep-dive"]');
    await expect(navLink).not.toBeAttached();
  });

  test('should switch tabs smoothly between Atma, Raya, and ??? without reload', async ({ page }) => {
    const section = page.locator('#deep-dive');
    await section.scrollIntoViewIfNeeded();

    // 1. Default Tab: Atma
    const tabAtma = section.locator('#tab-atma');
    const tabRaya = section.locator('#tab-raya');
    const tabMystery = section.locator('#tab-mystery');

    await expect(tabAtma).toHaveAttribute('aria-selected', 'true');
    await expect(section.locator('text=Tenang & Observatif')).toBeVisible();
    await expect(section.locator('text=Pendiam namun penuh perhatian')).toBeVisible();
    await expect(section.locator('text=Penulis diary')).toBeVisible();
    await expect(section.locator('text=Peka terhadap detail kecil di sekitarnya')).toBeVisible();

    // 2. Click Tab Raya
    await tabRaya.click();
    await expect(tabRaya).toHaveAttribute('aria-selected', 'true');
    await expect(tabAtma).toHaveAttribute('aria-selected', 'false');
    await expect(section.locator('text=Hangat namun Menyimpan Beban')).toBeVisible();
    await expect(section.locator('text=Ceria di permukaan')).toBeVisible();
    await expect(section.locator('text=Protektif pada orang terdekat')).toBeVisible();
    await expect(section.locator('text=Berani menghadapi risiko besar demi orang lain')).toBeVisible();

    // 3. Click Tab ??? (Sosok Misterius)
    await tabMystery.click();
    await expect(tabMystery).toHaveAttribute('aria-selected', 'true');
    await expect(tabRaya).toHaveAttribute('aria-selected', 'false');
    await expect(section.locator('text=Sosok dalam Ingatan')).toBeVisible();
    await expect(section.locator('text=Muncul di antara mimpi dan kenyataan')).toBeVisible();
    await expect(section.locator('text=Terhubung dengan masa lalu yang belum terungkap')).toBeVisible();
    await expect(section.locator('text=Kunci dari sebuah rahasia yang lebih besar')).toBeVisible();
    await expect(section.locator('text=Identitas Terkunci')).toBeVisible();
    await expect(
      section.locator('text=Detail lengkap akan terungkap saat kamu memainkan game-nya langsung.')
    ).toBeVisible();

    // 4. Return to Tab Atma
    await tabAtma.click();
    await expect(tabAtma).toHaveAttribute('aria-selected', 'true');
    await expect(section.locator('text=Tenang & Observatif')).toBeVisible();
  });
});
