import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
  // ─── Locators ───
  get sizeListbox(): Locator {
    return this.page.getByRole('listbox', { name: 'Size' });
  }

  get colorListbox(): Locator {
    return this.page.getByRole('listbox', { name: 'Color' });
  }

  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to Cart' });
  }

  // ─── Action methods ───
  async selectSize(size: string): Promise<void> {
    await this.sizeListbox.click();
    await this.page.locator(`[data-option-label="${size}"]`).click();
  }

  async selectColor(color: string): Promise<void> {
    await this.colorListbox.click();
    await this.page.locator(`[data-option-label="${color}"]`).click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async addConfigurableToCart(size: string, color: string): Promise<void> {
    await this.selectSize(size);
    await this.selectColor(color);
    await this.addToCart();
  }

  // ─── Assertions ───
  async expectAddedToCartMessage(productName: string): Promise<void> {
    const message = this.page.getByText(`You added ${productName} to your shopping cart.`);
    await message.waitFor({ state: 'visible' });
    await expect(message).toBeVisible();
  }
}
