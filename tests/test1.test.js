import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('testpw@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Reserve' }).first().click();
  await page.getByRole('button', { name: 'Choose date, selected date is' }).click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.waitForTimeout(1000); // Wait 1 second
  await page.getByRole('gridcell', { name: '8', exact: true }).click();
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('listitem').filter({ hasText: ':00 - 17:00smallReserve' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('test');
  await page.getByRole('textbox', { name: 'Contact *' }).click();
  await page.getByRole('textbox', { name: 'Contact *' }).fill('1234567890');
  await page.locator('form').filter({ hasText: 'Make Reservation' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Go to My Reservations' }).click();
  await page.getByRole('button', { name: 'Pending' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is' }).click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.waitForTimeout(1000); // Wait 1 second
  await page.getByRole('gridcell', { name: '5', exact: true }).click();
  await page.getByPlaceholder('Duration (hours)').click();
  await page.getByPlaceholder('Duration (hours)').fill('2');
  await page.getByPlaceholder('Party Size').click();
  await page.getByPlaceholder('Party Size').fill('5');
  await page.getByRole('button', { name: 'Check' }).click();
  await page.getByRole('listitem').filter({ hasText: ':00 - 19:00mediumReserve' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page.getByRole('button', { name: 'Go to My Reservations' }).click();
  await page.getByRole('button', { name: 'Pending' }).click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
});