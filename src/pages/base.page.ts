import { Page } from 'playwright';

export abstract class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly baseURL: string
  ) {}

  protected async goto(path: string): Promise<void> {
    const url = path.startsWith('http') ? path : new URL(path, this.baseURL).toString();
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
