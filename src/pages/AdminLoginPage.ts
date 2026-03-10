import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';

export class AdminLoginPage extends BasePage {
  // ─── Locators ───
  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  // ─── Action methods ───
  async gotoAdminLogin(): Promise<void> {
    await this.goto('');
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  // ─── Assertions ───
  async expectOnAdminDashboard(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Dashboard', level: 1 }).waitFor({ state: 'visible' });
  }
}
