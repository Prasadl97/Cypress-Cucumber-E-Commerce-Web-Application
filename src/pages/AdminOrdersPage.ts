import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';

export class AdminOrdersPage extends BasePage {
  // ─── Locators ───
  get ordersHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Orders', level: 1 });
  }

  get createNewOrderButton(): Locator {
    return this.page.getByRole('button', { name: 'Create New Order' });
  }

  // ─── Action methods ───
  async gotoOrders(): Promise<void> {
    await this.goto('sales/order/index/');
  }

  // ─── Assertions ───
  async expectOrdersGridLoaded(): Promise<void> {
    await this.ordersHeading.waitFor({ state: 'visible' });
    await this.createNewOrderButton.waitFor({ state: 'visible' });
  }
}
