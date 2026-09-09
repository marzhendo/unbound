import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test.describe('PlayNow and Footer sections', () => {
  test('should display PlayNow section with folio, heading, trailer, and 5 platforms', async ({ page }) => {
    await page.goto('/');

    const playSection = page.locator('#play');
    await expect(playSection).toBeAttached();

    // Check Folio Indicator
    const folio = playSection.locator('text=Kenangan 06');
    await expect(folio).toBeAttached();
    await expect(playSection.locator('text=Panggilan untuk Menyelam')).toBeAttached();

    // Check Heading
    const heading = playSection.locator('h2:has-text("Dapatkan & Mainkan Sekarang")');
    await expect(heading).toBeAttached();

    // Check In-section Trailer
    const inSectionTrailer = playSection.locator('iframe[title="A Space for the Unbound Official Trailer"]');
    await expect(inSectionTrailer).toBeAttached();

    // Check 5 Platform Buttons with official URLs and target=_blank
    const steamBtn = playSection.getByRole('link', { name: /Steam/i });
    const psBtn = playSection.getByRole('link', { name: /PlayStation/i });
    const xboxBtn = playSection.getByRole('link', { name: /Xbox/i });
    const switchBtn = playSection.getByRole('link', { name: /Switch/i });
    const iosBtn = playSection.getByRole('link', { name: /iOS/i });

    await expect(steamBtn).toBeAttached();
    await expect(steamBtn).toHaveAttribute('href', 'https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/');
    await expect(steamBtn).toHaveAttribute('target', '_blank');
    await expect(steamBtn).toHaveAttribute('rel', 'noopener noreferrer');

    await expect(psBtn).toBeAttached();
    await expect(psBtn).toHaveAttribute('href', 'https://www.playstation.com/en-us/games/a-space-for-the-unbound/');
    await expect(psBtn).toHaveAttribute('target', '_blank');

    await expect(xboxBtn).toBeAttached();
    await expect(xboxBtn).toHaveAttribute('href', 'https://www.xbox.com/en-US/games/store/a-space-for-the-unbound/9pg2rz8gvzcj');
    await expect(xboxBtn).toHaveAttribute('target', '_blank');

    await expect(switchBtn).toBeAttached();
    await expect(switchBtn).toHaveAttribute('href', 'https://www.nintendo.com/us/store/products/a-space-for-the-unbound-switch/');
    await expect(switchBtn).toHaveAttribute('target', '_blank');

    await expect(iosBtn).toBeAttached();
    await expect(iosBtn).toHaveAttribute('href', 'https://apps.apple.com/us/app/a-space-for-the-unbound/id6544796348');
    await expect(iosBtn).toHaveAttribute('target', '_blank');
  });

  test('should display Footer with competition disclaimer and copyright attribution', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeAttached();

    // Check disclaimer text
    await expect(footer.locator('text=Dibuat untuk Lomba Web Development IT FEST UNW 2026.')).toBeAttached();
    await expect(footer.locator('text=Ini adalah proyek fan-made non-komersial untuk kepentingan kompetisi, bukan situs resmi.')).toBeAttached();
    await expect(footer.locator('text=Mojiken Studio')).toBeAttached();
    await expect(footer.locator('text=Toge Productions')).toBeAttached();

    // Check Vintage Stamp Seal
    await expect(footer.locator('text=Stempel Arsip Resmi • Dokumen Fan-Made')).toBeAttached();

    // Check Team Credits (Compact format without individual roles)
    await expect(footer.locator('text=Dibuat oleh')).toBeAttached();
    await expect(footer.locator('text=Aedil')).toBeAttached();
    await expect(footer.locator('text=Galang')).toBeAttached();
    await expect(footer.locator('text=Fatir')).toBeAttached();
    await expect(footer.locator('text=Raysa')).toBeAttached();

    // Check Instagram Social Link
    const instaLink = footer.locator('a[href*="instagram.com/itfest.unw"]');
    await expect(instaLink).toBeAttached();
    await expect(instaLink).toHaveAttribute('target', '_blank');
    await expect(instaLink).toContainText('@itfest.unw');
  });
});
