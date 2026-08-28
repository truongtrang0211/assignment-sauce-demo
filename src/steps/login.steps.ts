import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { Config } from '../core/config';
import { test } from '../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('the user is on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When('the user logs in with username {string} and password {string}', async ({ loginPage }, u: string, p: string) => {
  await loginPage.login(u, p);
});

When('the user logs in with valid standard credentials', async ({ loginPage }) => {
  // pull credentials safely from config / .env
  await loginPage.login(Config.users.standard.username, Config.users.standard.password);
});

Then('an error message {string} should be displayed', async ({ loginPage }, msg: string) => {
  const actualError = await loginPage.getErrorMessage();
  expect(actualError).toContain(msg);
});

Then('the user should land on the inventory page', async ({ inventoryPage }) => {
  await inventoryPage.verifyOnInventoryPage();
});

Then('the product list should contain at least {int} item', async ({ inventoryPage }, minCount: number) => {
  const count = await inventoryPage.getInventoryCount();
  expect(count).toBeGreaterThanOrEqual(minCount);
});

Then('every product should display a name, image, price, and add to cart button', async ({ inventoryPage }) => {
  await inventoryPage.verifyItemStructure(0);
});
