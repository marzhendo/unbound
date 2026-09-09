import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test.describe('Characters Section Overlap & Text Legibility', () => {
  const resolutions = [1024, 1280, 1440, 1920];

  for (const width of resolutions) {
    test(`should never cover Atma description text or badge at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');

      const charsSection = page.locator('#characters');
      await expect(charsSection).toBeVisible();
      await charsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      // Verify full Atma description text is completely visible
      const fullText =
        'Pelajar SMA biasa di kota Loka. Tenang, sedikit pendiam, tapi diam-diam menyimpan mimpi menjadi penulis. Hidupnya berubah total ketika ia mulai memahami rahasia besar yang disimpan Raya.';
      const atmaParagraph = charsSection.locator('article').first().getByText(fullText);
      await expect(atmaParagraph).toBeVisible();

      // Verify bounding boxes: Atma text must end before Raya card begins
      const atmaTextBox = await atmaParagraph.boundingBox();
      const rayaCard = charsSection.locator('article').nth(1);
      const rayaBox = await rayaCard.boundingBox();

      expect(atmaTextBox).not.toBeNull();
      expect(rayaBox).not.toBeNull();

      if (atmaTextBox && rayaBox) {
        // Text right edge must strictly be to the left of Raya's card x coordinate
        const textRightEdge = atmaTextBox.x + atmaTextBox.width;
        expect(textRightEdge).toBeLessThan(rayaBox.x);

        // Gap must be at least 30px
        const safetyGap = rayaBox.x - textRightEdge;
        expect(safetyGap).toBeGreaterThanOrEqual(30);
      }
    });
  }

  test('should render properly on mobile without horizontal overlap collision', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const charsSection = page.locator('#characters');
    await expect(charsSection).toBeVisible();
    await charsSection.scrollIntoViewIfNeeded();

    const atmaCard = charsSection.locator('article').first();
    const rayaCard = charsSection.locator('article').nth(1);

    await expect(atmaCard).toBeVisible();
    await expect(rayaCard).toBeVisible();

    // Verify text is visible
    await expect(
      atmaCard.getByText('Hidupnya berubah total ketika ia mulai memahami rahasia besar yang disimpan Raya.')
    ).toBeVisible();
  });
});
