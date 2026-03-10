import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world.js';

Given('I am on the admin login page', async function (this: PlaywrightWorld) {
  await this.adminLoginPage.gotoAdminLogin();
});

When('I log in to the admin with username {string} and password {string}', async function (this: PlaywrightWorld, username: string, password: string) {
  await this.adminLoginPage.login(username, password);
});

Then('I am on the admin dashboard', async function (this: PlaywrightWorld) {
  await this.adminLoginPage.expectOnAdminDashboard();
});

When('I navigate to Orders', async function (this: PlaywrightWorld) {
  await this.adminOrdersPage.gotoOrders();
});

Then('the orders grid is loaded', async function (this: PlaywrightWorld) {
  await this.adminOrdersPage.expectOrdersGridLoaded();
});
