import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world.js';
import { generateUniqueEmail } from '../../src/utils/id-utils.js';
import { saveRegisteredUser, loadRegisteredUser } from '../../src/utils/entity-store.js';
import { loadTestData } from '../../src/config/test-data.js';
import { HomePage } from '../../src/pages/home.page.js';
import { CreateAccountPage } from '../../src/pages/create-account.page.js';
import { LoginPage } from '../../src/pages/login.page.js';
import { AccountDashboardPage } from '../../src/pages/account-dashboard.page.js';

Given('I am on the home page', async function (this: PlaywrightWorld) {
  const homePage = new HomePage(this.page, this.parameters.baseURL);
  await homePage.gotoHome();
});

When('I register a new user with a dynamic email', async function (this: PlaywrightWorld) {
  const testData = await loadTestData();
  const { firstName, lastName, password } = testData.defaultRegistration;
  const email = generateUniqueEmail();
  (this as unknown as { _registeredEmail?: string })._registeredEmail = email;
  (this as unknown as { _registeredPassword?: string })._registeredPassword = password;

  const homePage = new HomePage(this.page, this.parameters.baseURL);
  await homePage.gotoHome();
  await homePage.clickCreateAccount();

  const createAccountPage = new CreateAccountPage(this.page, this.parameters.baseURL);
  await createAccountPage.register({ firstName, lastName, email, password });
});

Then('registration succeeds', async function (this: PlaywrightWorld) {
  const dashboardPage = new AccountDashboardPage(this.page, this.parameters.baseURL);
  await dashboardPage.expectOnDashboard();

  const email = (this as unknown as { _registeredEmail?: string })._registeredEmail;
  const password = (this as unknown as { _registeredPassword?: string })._registeredPassword;
  if (email && password) {
    const entityPath = this.parameters.entityFilePath ?? './data/entities/registered-user.json';
    await saveRegisteredUser(entityPath, { email, password });
  }
});

When('I log out', async function (this: PlaywrightWorld) {
  const dashboardPage = new AccountDashboardPage(this.page, this.parameters.baseURL);
  await dashboardPage.clickSignOut();
});

When('I log in with the saved credentials', async function (this: PlaywrightWorld) {
  const entityPath = this.parameters.entityFilePath ?? './data/entities/registered-user.json';
  const { email, password } = await loadRegisteredUser(entityPath);
  if (!password) throw new Error('Saved user has no password; cannot login.');

  const loginPage = new LoginPage(this.page, this.parameters.baseURL);
  await loginPage.gotoLogin();
  await loginPage.login(email, password);
});

Then('I see my account dashboard', async function (this: PlaywrightWorld) {
  const dashboardPage = new AccountDashboardPage(this.page, this.parameters.baseURL);
  await dashboardPage.expectOnDashboard();
});
