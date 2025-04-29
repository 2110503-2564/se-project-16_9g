import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(120_000); // 2 minutes
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('div').filter({ hasText: /^Email$/ }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Table Management' }).click();
  await page.getByRole('combobox', { name: 'Select Restaurant' }).click();
  await page.getByRole('option', { name: 'Sushi World' }).click();
  await page.getByRole('button', { name: 'View' }).click();
  await page.getByRole('link', { name: 'Locking Table' }).click();
  await page.getByRole('button', { name: 'Lock New Table' }).click();
  await page.getByLabel('', { exact: true }).click();
  await page.getByRole('option', { name: 'Fam Time Steak and Pasta' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is' }).click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.waitForTimeout(2000); // Wait 1 second
  await page.getByRole('gridcell', { name: '2', exact: true }).click();
  await page.getByRole('button', { name: 'Choose time, selected time is' }).first().click();
  await page.getByRole('option', { name: '11 hours' }).click();
  await page.getByRole('option', { name: '5 minutes', exact: true }).click();
  await page.getByRole('option', { name: 'AM' }).click();
  await page.waitForTimeout(1000); // Wait 1 second
  await page.getByRole('button', { name: /Choose time, selected time is/ }).nth(1).click();
  await page.getByRole('option', { name: '9 hours' }).click();
  await page.getByRole('option', { name: '0 minutes', exact: true }).click();
  await page.getByRole('option', { name: 'PM' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Lock Table' }).click();
  await page.getByRole('combobox', { name: 'Select Restaurant' }).click();
  await page.getByRole('option', { name: 'Fam Time Steak and Pasta' }).click();
});