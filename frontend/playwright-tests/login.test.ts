import { test, expect } from '@playwright/test';


test('register, remove token and login - test', async ({ page }) => {

  const testid = Math.random() * 1000;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link').nth(4).click();
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.getByPlaceholder('Brugernavn').click();
  await page.getByPlaceholder('Brugernavn').fill('test' + testid.toString());
  await page.getByPlaceholder('Brugernavn').press('Tab');
  await page.getByPlaceholder('Email').fill('test'  + testid.toString() + '@test.dk');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Opret konto' }).click();

  // check if the user got token in localstorage
  const token = await page.evaluate(() => localStorage.getItem('portal-jwt-Token')); 
  await expect(page).toHaveURL('http://localhost:3000/', { timeout: 10000 });

  //wait for the page to be authenticated by waiting for role link to have 6 elements
  await new Promise(f => setTimeout(f, 1000));
  await page.getByRole('link').nth(5).click();
  await page.goto('http://localhost:3000/account');
  await expect(page.getByRole('heading', { name: 'your user = test' })).toBeTruthy();

  //remove localstorage
  await page.evaluate(() => localStorage.removeItem('portal-jwt-Token'));
  await page.reload();
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/');
  await page.getByRole('link').nth(4).click();
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test' + testid.toString() + '@test.dk');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();


});