import { Locator, Page } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutSidebarLink: Locator;
  readonly allItemsSidebarLink: Locator;
  readonly resetSidebarLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutSidebarLink = page.locator('[data-test="logout-sidebar-link"]');
    this.allItemsSidebarLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.resetSidebarLink = page.locator('[data-test="reset-sidebar-link"]');
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async getCartItemCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.innerText();
      return parseInt(text, 10);
    }
    return 0;
  }

  async logout() {
    await this.burgerMenuButton.click();
    await this.logoutSidebarLink.click();
  }
}
