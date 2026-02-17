import { type Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected page: Page) {}

  protected abstract goto(): Promise<void>;

  public get currentUrl(): string {
    return this.page.url();
  }

  public async gotoPath(path: string): Promise<void> {
    await this.page.goto(`${process.env.BASE_URL}${path}`);
  }

  public async waitForLoading(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
