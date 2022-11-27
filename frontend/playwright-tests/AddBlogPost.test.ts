import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  //create user
  await page.goto('http://localhost:3000/');
  await page.getByRole('link').nth(3).click();
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.getByPlaceholder('Brugernavn').click();
  await page.getByPlaceholder('Brugernavn').fill('test2');
  await page.getByPlaceholder('Brugernavn').press('Tab');
  await page.getByPlaceholder('Email').fill('test2@test.dk');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByRole('link').nth(3).click();
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Opret konto' }).click();
  const token = await page.evaluate(() => localStorage.getItem('portal-jwt-Token')); 
  await expect(page).toHaveURL('http://localhost:3000/');

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