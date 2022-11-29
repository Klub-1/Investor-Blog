import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.getByRole('link').nth(4).click();
  await expect(page).toHaveURL('http://localhost:3000/account');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Registrer' }).click();

  await page.getByPlaceholder('Brugernavn').click();

  await page.getByPlaceholder('Brugernavn').fill('test');

  await page.getByPlaceholder('Brugernavn').press('Tab');

  await page.getByPlaceholder('Email').fill('test');

  await page.getByPlaceholder('Email').press('Tab');

  await page.getByPlaceholder('Password').fill('test');

  await page.getByRole('button', { name: 'Opret konto' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');
  await new Promise(f => setTimeout(f, 1000));

  await page.locator('a:nth-child(4)').click();
  await expect(page).toHaveURL('http://localhost:3000/stocks');

  await page.getByPlaceholder('Søg efter aktie...').click();

  await page.getByPlaceholder('Søg efter aktie...').fill('APLE');

  await page.getByRole('button').click();

  await page.getByRole('button').nth(1).click();

  await page.getByPlaceholder('Søg efter aktie...').click();

  await page.getByPlaceholder('Søg efter aktie...').fill('');

  await page.locator('#root div:has-text("Søg efter aktie")').nth(1).click();

  await page.locator('.rounded-full').first().click();
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.locator('a:nth-child(4)').click();
  await expect(page).toHaveURL('http://localhost:3000//stocks');

  await expect(page.getByRole('heading', { name: 'APLE' })).toBeTruthy();

  await page.getByRole('button').nth(1).click();

});