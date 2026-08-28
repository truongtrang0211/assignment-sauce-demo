import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly cartItems: Locator = this.page.locator('[data-test="inventory-item"]');
  readonly checkoutButton: Locator = this.page.locator('[data-test="checkout"]');

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
  }

  async removeItemByName(productName: string) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
