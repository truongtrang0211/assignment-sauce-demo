import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When, Then } = createBdd(test);

When('the user sorts products by {string}', async ({ inventoryPage }, option: string) => {
  await inventoryPage.selectSortOption(option);
});

Then('products should be ordered according to {string}', async ({ inventoryPage }, criteria: string) => {
  await inventoryPage.verifyProductsSortedBy(criteria);
});

