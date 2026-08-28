import { createBdd } from 'playwright-bdd';
import { Config } from '../../core/config';
import { test } from '../../fixtures/fixtures';

const { Given, When } = createBdd(test);

/**
 * Common Background Step: Logs in with standard user credentials
 * and verifies landing on the inventory page.
 */
Given('the user is logged in as standard user', async ({ loginPage, inventoryPage }) => {
   await loginPage.open();
   await loginPage.login(Config.users.standard.username, Config.users.standard.password);
   await inventoryPage.verifyOnInventoryPage();
});

/**
 * Common Navigation Step: Clicks the shopping cart icon in the shared header.
 */
When('the user navigates to the cart', async ({ inventoryPage }) => {
   await inventoryPage.openCart();
});
