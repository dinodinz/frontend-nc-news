import { BasePage } from "./basePage.page";
import { type Page } from "@playwright/test";

export class TopicPage extends BasePage {
  constructor(protected page: Page) {
    super(page);
  }
  public async goto(): Promise<void> {
    this.page.goto("/topic");
  }
}
