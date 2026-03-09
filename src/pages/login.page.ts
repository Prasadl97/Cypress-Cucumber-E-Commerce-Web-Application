import { BasePage } from './base.page.js';
import type { Locator } from 'playwright';

export class LoginPage extends BasePage {
  get emailInput(): Locator {
    return this.page.locator('#email_address');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  async gotoLogin(): Promise<void> {
    await this.goto('/customer/account/login/');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }
}
