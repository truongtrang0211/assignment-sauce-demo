import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SuccessMessages } from '../constants/success-messages';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator = this.page.locator('[data-test="firstName"]');
  readonly lastNameInput: Locator = this.page.locator('[data-test="lastName"]');
  readonly postalCodeInput: Locator = this.page.locator('[data-test="postalCode"]');
  readonly continueButton: Locator = this.page.locator('[data-test="continue"]');

  readonly itemTotal: Locator = this.page.locator('[data-test="subtotal-label"]');
  readonly taxLabel: Locator = this.page.locator('[data-test="tax-label"]');
  readonly totalLabel: Locator = this.page.locator('[data-test="total-label"]');
  readonly finishButton: Locator = this.page.locator('[data-test="finish"]');
  readonly completeHeader: Locator = this.page.locator('[data-test="complete-header"]');

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async getCalculatedTotals() {
    const itemTotalText = await this.itemTotal.innerText();
    const taxText = await this.taxLabel.innerText();
    const totalText = await this.totalLabel.innerText();

    const subtotal = parseFloat(itemTotalText.replace(/[^0-9.]/g, ''));
    const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
    const total = parseFloat(totalText.replace(/[^0-9.]/g, ''));

    return { subtotal, tax, total };
  }

  async completeCheckout() {
    await this.finishButton.click();
  }

  async verifyOrderCompleted(expectedText: string = SuccessMessages.ORDER_COMPLETED) {
    await expect(this.completeHeader).toHaveText(expectedText);
  }
}
