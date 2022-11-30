import { test, expect } from '@playwright/test';

test('AddBlogPost - test', async ({ page }) => {

  const testid = Math.random() * 1000;

  await page.goto('http://localhost:3000/');

  await page.getByRole('link').nth(4).click();
  await expect(page).toHaveURL('http://localhost:3000/account');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'Registrer' }).click();

  await page.getByPlaceholder('Brugernavn').click();

  await page.getByPlaceholder('Brugernavn').fill('addtest' + testid.toString());

  await page.getByPlaceholder('Email').click();

  await page.getByPlaceholder('Email').fill('addtest' + testid.toString() + '@test.dk');

  await page.getByPlaceholder('Email').press('Tab');

  await page.getByPlaceholder('Password').fill('1234');

  await page.getByRole('button', { name: 'Opret konto' }).click();

  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link').nth(1).click();

  await expect(page).toHaveURL('http://localhost:3000/add');

  await page.getByPlaceholder('Titel').click();

  await page.getByPlaceholder('Titel').fill('Dette er et test post');

  await page.getByPlaceholder('Indlæg').click();

  await page.getByPlaceholder('Indlæg').fill('Dette er en test med id ' + testid.toString());

  await page.getByPlaceholder('Tags (F.eks.: APPL, Positivt, Køb)').click();

  await page.getByPlaceholder('Tags (F.eks.: APPL, Positivt, Køb)').fill('TEST');

  await page.getByRole('button', { name: 'Opret indlæg' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');

  const innertext = await page.getByText('Dette er en test med id ' + testid.toString()).innerText();

  await expect(innertext).toBe('Dette er en test med id ' + testid.toString());


});