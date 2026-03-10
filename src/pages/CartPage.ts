import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  // ─── Locators ───
  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Shopping Cart', level: 1 });
  }

  get qtySpinbutton(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Qty' }).first();
  }

  get updateCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Update Shopping Cart' });
  }

  get removeItemLink(): Locator {
    return this.page.locator('a:has-text("Remove item")');
  }

  get emptyMessage(): Locator {
    return this.page.getByText('You have no items in your shopping cart.');
  }

  // ─── Action methods ───
  async gotoCart(): Promise<void> {
    await this.goto('/checkout/cart/');
  }

  async setCartItemQty(qty: number): Promise<void> {
    await this.qtySpinbutton.fill(String(qty));
  }

  async clickUpdateShoppingCart(): Promise<void> {
    await this.updateCartButton.click();
  }

  async updateQuantityTo(qty: number): Promise<void> {
    await this.setCartItemQty(qty);
    await this.clickUpdateShoppingCart();
  }

  async removeFirstItem(): Promise<void> {
    await this.removeItemLink.click();
  }

  // ─── Assertions ───
  async expectOnCartPage(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
  }

  async expectEmptyCart(): Promise<void> {
    await this.emptyMessage.waitFor({ state: 'visible' });
  }

  async expectCartItemQty(qty: number): Promise<void> {
    await this.page.getByRole('spinbutton', { name: 'Qty' }).first().waitFor({ state: 'visible' });
    await expect(this.qtySpinbutton).toHaveValue(String(qty));
  }
}
