import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { AdminLoginPage } from '../../pages/AdminLoginPage.js';
import { AdminOrdersPage } from '../../pages/AdminOrdersPage.js';

const adminLoginPage = new AdminLoginPage();
const adminOrdersPage = new AdminOrdersPage();

Given('I am on the admin login page', function () {
  adminLoginPage.gotoAdminLogin();
});

When('I log in to the admin', function () {
  const { username, password } = TestDataLoader.load().admin;
  adminLoginPage.login(username, password);
});;

Then('I am on the admin dashboard', function () {
  cy.then(async () => {
    await adminLoginPage.expectOnAdminDashboard();
  });
});

When('I navigate to Orders', function () {
  adminOrdersPage.gotoOrders();
});

Then('the orders grid is loaded', function () {
  cy.then(async () => {
    await adminOrdersPage.expectOrdersGridLoaded();
  });
});
