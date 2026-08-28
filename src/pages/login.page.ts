import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator = this.page.locator('[data-test="username"]');
  readonly passwordInput: Locator = this.page.locator('[data-test="password"]');
  readonly loginButton: Locator = this.page.locator('[data-test="login-button"]');
  readonly errorMessage: Locator = this.page.locator('[data-test="error"]');

  async open() {
    await this.navigate('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return (await this.errorMessage.innerText()).trim();
  }
}
