import { Page, type Locator } from "@playwright/test";

export abstract class BasePage {
  constructor(protected page: Page) {}

  abstract goto(): Promise<void>;

  protected get currentUrl(): string {
    return this.page.url();
  }

  protected async gotoPath(path: string) {
    await this.page.goto(`${process.env.BASE_URL}${path}`);
  }

  public async waitForLoading() {
    await this.page.waitForLoadState("networkidle");
  }
}
