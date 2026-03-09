import { BasePage } from './base.page.js';
import type { Locator } from 'playwright';

export class HomePage extends BasePage {
  get createAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Create an Account' });
  }

  get signInLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign In' });
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
