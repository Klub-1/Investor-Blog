import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.getByRole('link').nth(1).click();
  await expect(page).toHaveURL('http://localhost:3000/add');

  await page.getByPlaceholder('Titel').click();

  await page.getByPlaceholder('Titel').fill('Dette er en test');

  await page.getByPlaceholder('Indlæg').click();

  await page.getByPlaceholder('Indlæg').fill('Jeg har lavet en test');

  await page.getByPlaceholder('Tags (F.eks.: APPL, Positivt, Køb)').click();

  await page.getByPlaceholder('Tags (F.eks.: APPL, Positivt, Køb)').fill('Dette, er, et, tag');

  await page.getByRole('button', { name: 'Opret indlæg' }).click();

  await page.getByRole('link').first().click();
  await expect(page).toHaveURL('http://localhost:3000/');

  // check if the post is there
  await expect(page.getByText('Dette er en test')).toBeTruthy();

});