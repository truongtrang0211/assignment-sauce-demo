import { Page, Locator, expect } from '@playwright/test';
import { HeaderPage } from './shared/header.page';

export abstract class BasePage {
  readonly page: Page;
  readonly header: HeaderPage;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderPage(page);
  }

  async navigate(url: string = '') {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async verifyElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
