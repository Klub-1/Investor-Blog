import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.getByRole('link').nth(2).click();
  await expect(page).toHaveURL('http://localhost:3000/stocks');

  await page.getByPlaceholder('Søg efter aktie...').click();

  await page.getByPlaceholder('Søg efter aktie...').fill('nvo');

  await page.getByRole('button').click();

  await page.getByRole('button').nth(1).click();

  await page.getByPlaceholder('Søg efter aktie...').click();

  await page.getByPlaceholder('Søg efter aktie...').fill('');

  await page.locator('#root div:has-text("Søg efter aktie")').nth(1).click();

  await page.getByRole('link').first().click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link').nth(2).click();
  await expect(page).toHaveURL('http://localhost:3000/stocks');

  await page.getByRole('heading', { name: 'NVO' }).click();

  await page.getByRole('heading', { name: '+2.61%' }).click();

  await page.getByText('NVO+2.61%').click();

  await page.getByRole('button').nth(1).click();

});