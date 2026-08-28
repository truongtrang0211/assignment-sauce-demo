import { Locator, expect } from '@playwright/test';
import { SortOptions } from '../constants/sort-options';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly inventoryContainer: Locator = this.page.locator('[data-test="inventory-container"]');
  readonly inventoryItems: Locator = this.page.locator('[data-test="inventory-item"]');
  readonly sortDropdown: Locator = this.page.locator('[data-test="product-sort-container"]');
  readonly itemNames: Locator = this.page.locator('[data-test="inventory-item-name"]');
  readonly itemImages: Locator = this.page.locator('.inventory_item_img img');
  readonly itemPrices: Locator = this.page.locator('[data-test="inventory-item-price"]');
  readonly addToCartButtons: Locator = this.page.locator('button[data-test^="add-to-cart"]');

  async verifyOnInventoryPage() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.inventoryContainer).toBeVisible();
  }

  async getInventoryCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async verifyItemStructure(index: number = 0) {
    await expect(this.itemNames.nth(index)).toBeVisible();
    await expect(this.itemImages.nth(index)).toBeVisible();
    await expect(this.itemPrices.nth(index)).toBeVisible();
    await expect(this.addToCartButtons.nth(index)).toBeVisible();
  }

  async selectSortOption(optionValue: string) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllItemNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getAllItemPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allInnerTexts();
    return priceTexts.map(text => parseFloat(text.replace(/[^0-9.]/g, '')));
  }

  async verifyProductsSortedBy(criteria: string) {
    if (criteria.includes('Name')) {
      const names = await this.getAllItemNames();
      const sorted = [...names].sort((a, b) =>
        criteria === SortOptions.NAME_A_TO_Z.label ? a.localeCompare(b) : b.localeCompare(a)
      );
      expect(names).toEqual(sorted);
    } else if (criteria.includes('Price')) {
      const prices = await this.getAllItemPrices();
      const sorted = [...prices].sort((a, b) =>
        criteria === SortOptions.PRICE_LOW_TO_HIGH.label ? a - b : b - a
      );
      expect(prices).toEqual(sorted);
    }
  }

  async addItemToCartByName(productName: string) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const addButton = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await addButton.click();
  }

  async openCart() {
    await this.header.openCart();
  }
}
