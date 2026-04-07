import { expect, test } from '@playwright/test';

/**
 * Tests a basic workflow
 */
test('basic functions work (smoke test)', async ({ page }) => {
  // 1. Open the app (assuming the dev server is running)
  await page.goto('/');

  // 2. Check the address
  await expect(page).toHaveTitle(/MovieFinder/i);

  // 3. Search a movie
  const searchInput = page.getByPlaceholder(/search movies/i);
  await searchInput.fill('Inception');
  await searchInput.press('Enter');

  // 4. Wait until the card appears
  const movieCard = page.getByRole('button', { name: /inception/i }).first();
  await expect(movieCard).toBeVisible();

  // 5. Click on the card
  await movieCard.click();

  // 6. Check if the Wikipedia section is there in the Modal
  await expect(page.getByText(/Wikipedia Insights/i)).toBeVisible();

  // 7. Close the modal
  const closeButton = page.getByRole('dialog').getByRole('button').filter({ hasText: '' }).first();
  await closeButton.click();
  await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });
});
