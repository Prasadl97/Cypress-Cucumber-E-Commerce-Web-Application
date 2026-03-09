import { BasePage } from './base.page.js';
import type { Locator } from 'playwright';

export class AccountDashboardPage extends BasePage {
  get headingMyAccount(): Locator {
    return this.page.getByRole('heading', { name: 'My Account', level: 1 });
  }

  get welcomeText(): Locator {
    return this.page.getByText('Welcome,');
  }

  get accountDropdownTrigger(): Locator {
    return this.page.getByRole('button', { name: 'Change' }).first();
  }

  get signOutLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign Out' });
  }

  async expectDashboardVisible(): Promise<void> {
    await this.headingMyAccount.waitFor({ state: 'visible' });
  }

  async expectWelcomeMessage(): Promise<void> {
    await this.welcomeText.waitFor({ state: 'visible' });
  }

  async expandAccountDropdown(): Promise<void> {
    await this.accountDropdownTrigger.click();
  }

  async clickSignOut(): Promise<void> {
    await this.expandAccountDropdown();
    await this.signOutLink.click();
  }

  async expectOnDashboard(): Promise<void> {
    await this.expectDashboardVisible();
    await this.expectWelcomeMessage();
  }
}
