import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';

export class HomePage extends BasePage {
  // ─── Locators ───
  get createAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Create an Account' });
  }

  get signInLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign In' });
  }

  get searchCombobox(): Locator {
    return this.page.getByRole('combobox', { name: 'Search' });
  }

  // ─── Action methods ───
  async search(query: string): Promise<void> {
    await this.searchCombobox.fill(query);
    await this.searchCombobox.press('Enter');
  }

  async clickProductLink(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).first().click();
  }

  async expectSearchResultsFor(query: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: `Search results for: '${query}'` });
    await heading.waitFor({ state: 'visible' });
  }
  async gotoHome(): Promise<void> {
    await this.goto('/');
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountLink.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
  }
}
