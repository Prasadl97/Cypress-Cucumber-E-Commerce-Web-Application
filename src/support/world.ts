import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountDashboardPage } from '../pages/AccountDashboardPage';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminOrdersPage } from '../pages/AdminOrdersPage';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export interface WorldParameters {
  baseURL: string;
  adminBaseURL: string;
  browserName: BrowserName;
  headed: boolean;
  slowMo: number;
  entityFilePath?: string;
}

export class PlaywrightWorld extends World<WorldParameters> {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page objects (instantiated in init())
  homePage!: HomePage;
  productPage!: ProductPage;
  cartPage!: CartPage;
  createAccountPage!: CreateAccountPage;
  loginPage!: LoginPage;
  accountDashboardPage!: AccountDashboardPage;
  adminLoginPage!: AdminLoginPage;
  adminOrdersPage!: AdminOrdersPage;

  constructor(options: IWorldOptions<WorldParameters>) {
    super(options);
  }

  async init(): Promise<void> {
    const { headed = false, slowMo = 0, baseURL, adminBaseURL, browserName = 'chromium' } = this.parameters;
    const launchOptions = { headless: !headed, slowMo };
    const browserType = browserName === 'firefox' ? firefox : browserName === 'webkit' ? webkit : chromium;
    this.browser = await browserType.launch(launchOptions);
    this.context = await this.browser.newContext({
      baseURL,
    });
    this.page = await this.context.newPage();

    // Instantiate page objects
    this.homePage = new HomePage(this.page, baseURL);
    this.productPage = new ProductPage(this.page, baseURL);
    this.cartPage = new CartPage(this.page, baseURL);
    this.createAccountPage = new CreateAccountPage(this.page, baseURL);
    this.loginPage = new LoginPage(this.page, baseURL);
    this.accountDashboardPage = new AccountDashboardPage(this.page, baseURL);
    this.adminLoginPage = new AdminLoginPage(this.page, adminBaseURL);
    this.adminOrdersPage = new AdminOrdersPage(this.page, adminBaseURL);
  }

  async destroy(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(PlaywrightWorld);
