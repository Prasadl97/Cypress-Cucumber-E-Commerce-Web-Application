import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

export interface WorldParameters {
  baseURL: string;
  headed: boolean;
  slowMo: number;
  entityFilePath?: string;
}

export class PlaywrightWorld extends World<WorldParameters> {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions<WorldParameters>) {
    super(options);
  }

  async init(): Promise<void> {
    const { headed = false, slowMo = 0 } = this.parameters;
    this.browser = await chromium.launch({
      headless: !headed,
      slowMo,
    });
    this.context = await this.browser.newContext({
      baseURL: this.parameters.baseURL,
    });
    this.page = await this.context.newPage();
  }

  async destroy(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(PlaywrightWorld);
