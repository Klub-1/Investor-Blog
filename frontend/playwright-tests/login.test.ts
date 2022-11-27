import { test, expect } from '@playwright/test';
import { assert } from 'console';


test('test', async ({ page }) => {
  const api = new API();
  await page.goto('http://localhost:3000/');
  await page.getByRole('link').nth(3).click();
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByRole('button', { name: 'Registrer' }).click();
  await page.getByPlaceholder('Brugernavn').click();
  await page.getByPlaceholder('Brugernavn').fill('test');
  await page.getByPlaceholder('Brugernavn').press('Tab');
  await page.getByPlaceholder('Email').fill('test@test.dk');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByRole('link').nth(3).click();
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Opret konto' }).click();

  // check if the user got token in localstorage
  const token = await page.evaluate(() => localStorage.getItem('portal-jwt-Token')); 
  await expect(page).toHaveURL('http://localhost:3000/');

  await page.getByRole('link').nth(4).click();
  await expect(page.getByRole('heading', { name: 'your user = test' }).click()).toBeTruthy();

  //remove localstorage
  await page.evaluate(() => localStorage.removeItem('portal-jwt-Token'));
  await page.reload();
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/');
  await page.getByRole('link').nth(3).click();
  await page.getByRole('button', { name: 'Login' }).first().click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@test.dk');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();


});