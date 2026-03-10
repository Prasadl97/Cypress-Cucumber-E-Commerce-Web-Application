import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class CreateAccountPage extends BasePage {
  // ─── Locators ───
  get firstnameInput(): Locator {
    return this.page.locator('#firstname');
  }

  get lastnameInput(): Locator {
    return this.page.locator('#lastname');
  }

  get emailInput(): Locator {
    return this.page.locator('#email_address');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get passwordConfirmationInput(): Locator {
    return this.page.locator('#password-confirmation');
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create an Account' });
  }

  // ─── Action methods ───
  async gotoCreateAccount(): Promise<void> {
    await this.goto('/customer/account/create/');
  }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.firstnameInput.fill(data.firstName);
    await this.lastnameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.passwordConfirmationInput.fill(data.password);
  }

  async submitCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillRegistrationForm(data);
    await this.submitCreateAccount();
  }
}
