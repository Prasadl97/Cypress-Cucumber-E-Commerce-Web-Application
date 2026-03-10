import { BasePage } from './base.page.js';
import type { Locator } from 'playwright';

export class AccountDashboardPage extends BasePage {
  // ─── Locators ───
  get headingMyAccount(): Locator {
    return this.page.locator('span', { hasText: 'My Account' });
  }

  get accountDropdownTrigger(): Locator {
    return this.page.getByRole('button', { name: /Change/ }).first();
  }

  get signOutLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign Out' });
  }

  get registrationSuccessMessage(): Locator {
    return this.page.getByText('Thank you for registering with Main Website Store.');
  }

  // ─── Action methods ───
  async expectDashboardVisible(): Promise<void> {
    await this.headingMyAccount.waitFor({ state: 'visible', timeout: 15000 });
  }

  async expectRegistrationSuccessMessage(): Promise<void> {
    await this.registrationSuccessMessage.waitFor({ state: 'visible', timeout: 15000 });
  }

  async expandAccountDropdown(): Promise<void> {
    await this.accountDropdownTrigger.click();
    await this.signOutLink.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickSignOut(): Promise<void> {
    await this.expandAccountDropdown();
    await this.signOutLink.click();
  }

  async expectOnDashboard(): Promise<void> {
    await this.expectDashboardVisible();
  }
}
