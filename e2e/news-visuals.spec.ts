import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test.describe('News Section Visuals & Timeline Milestones', () => {
  test('should render News section with subtle atmospheric background and 5 milestone thumbnails', async ({ page }) => {
    await page.goto('/');

    const newsSection = page.locator('#news');
    await expect(newsSection).toBeVisible();

    // Scroll to #news to trigger whileInView animations
    await newsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // Verify section title and folio
    await expect(newsSection.getByRole('heading', { name: /Jejak Perjalanan/i })).toBeVisible();
    await expect(newsSection.locator('text=05')).toBeVisible();

    // Verify 5 milestone articles
    const milestoneCards = newsSection.locator('article');
    await expect(milestoneCards).toHaveCount(5);

    // Verify all 5 thumbnails are present and loaded
    const thumbnails = newsSection.locator('article img[sizes="80px"]');
    await expect(thumbnails).toHaveCount(5);

    // Verify milestone titles
    await expect(newsSection.getByRole('heading', { name: /Best Storytelling/i })).toBeVisible();
    await expect(newsSection.getByRole('heading', { name: /Future Division Award/i })).toBeVisible();
    await expect(newsSection.getByRole('heading', { name: /Rilis Resmi Multi-Platform/i })).toBeVisible();
    await expect(newsSection.getByRole('heading', { name: /Nominee Games for Impact/i })).toBeVisible();
    await expect(newsSection.getByRole('heading', { name: /Ekspansi ke iOS/i })).toBeVisible();

    // Verify clean solid background with theme primary color
    await expect(newsSection).toHaveClass(/bg-bg-primary/);
  });
});
