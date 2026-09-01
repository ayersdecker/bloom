import { expect, test } from '@playwright/test';

test('players can unlock and solve all lectern puzzles', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /the bloom lectern/i })).toBeVisible();
  await page.getByRole('link', { name: /open lectern/i }).click();

  await page.getByLabel(/seal code/i).fill('rose');
  await page.getByRole('button', { name: /unlock puzzle/i }).click();
  await page.getByLabel(/plaintext answer/i).fill('BLOOM');
  await page.getByRole('button', { name: /check cipher/i }).click();

  await page.getByLabel(/seal code/i).fill('sigil');
  await page.getByRole('button', { name: /unlock puzzle/i }).click();
  await page.getByLabel(/second symbol/i).selectOption('2');
  await page.getByLabel(/third symbol/i).selectOption('1');
  await page.getByRole('button', { name: /check lock/i }).click();

  await page.getByLabel(/seal code/i).fill('star');
  await page.getByRole('button', { name: /unlock puzzle/i }).click();
  for (let index = 0; index < 6; index += 1) {
    await page.getByRole('button', { name: /turn star dial clockwise/i }).click();
  }
  await page.getByRole('button', { name: /align dial/i }).click();

  await expect(page.getByRole('heading', { name: /final line assembled/i })).toBeVisible();
  await expect(page.getByText(/the roots remember, the petals endure, and the bloom returns\./i)).toBeVisible();
});
