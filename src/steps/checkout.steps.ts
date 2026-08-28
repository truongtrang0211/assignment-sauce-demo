import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';
import { SuccessMessages } from '../constants/success-messages';

const { When, Then } = createBdd(test);

When('the user adds {string} to the cart', async ({ inventoryPage }, productName: string) => {
  await inventoryPage.addItemToCartByName(productName);
});

Then('the cart should contain {string} and {string}', async ({ cartPage }, item1: string, item2: string) => {
  const items = await cartPage.getCartItemNames();
  expect(items).toContain(item1);
  expect(items).toContain(item2);
});

When('the user removes {string} from the cart', async ({ cartPage }, itemToRemove: string) => {
  await cartPage.removeItemByName(itemToRemove);
});

Then('the cart should only contain {string}', async ({ cartPage }, item: string) => {
  const items = await cartPage.getCartItemNames();
  expect(items).toEqual([item]);
});

When('the user proceeds to checkout with details {string}, {string}, {string}', async (
  { cartPage, checkoutPage },
  first: string,
  last: string,
  zip: string
) => {
  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation(first, last, zip);
});

Then('the checkout overview total must equal subtotal plus tax', async ({ checkoutPage }) => {
  const { subtotal, tax, total } = await checkoutPage.getCalculatedTotals();
  const expectedTotal = parseFloat((subtotal + tax).toFixed(2));
  expect(total).toBe(expectedTotal);
});

When('the user finishes the checkout', async ({ checkoutPage }) => {
  await checkoutPage.completeCheckout();
});

Then('the order confirmation message should be displayed', async ({ checkoutPage }) => {
  await checkoutPage.verifyOrderCompleted(SuccessMessages.ORDER_COMPLETED);
});
