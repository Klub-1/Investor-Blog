import { test, expect } from "@playwright/test";

test("Add blogpost", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link").nth(1).click();
  await expect(page).toHaveURL("http://localhost:3000/add");

  await page.getByPlaceholder("Titel").click();

  await page.getByPlaceholder("Titel").fill("This is a test");

  await page.getByPlaceholder("Indlæg").click();

  await page.getByPlaceholder("Indlæg").fill("Test test");

  await page.getByPlaceholder("Tags (F.eks.: APPL, Positivt, Køb)").click();

  await page
    .getByPlaceholder("Tags (F.eks.: APPL, Positivt, Køb)")
    .fill("Test");

  await page.getByRole("button", { name: "Opret indlæg" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");

  expect(await page.textContent("text=This is a test")).toBe("This is a test");
});
