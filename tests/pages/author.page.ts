import { type Locator } from "@playwright/test";
import { BasePage } from "./basePage.page";
import { Page } from "playwright";

export class AuthorPage extends BasePage {
  protected articleImageTopic: Locator;
  protected articleImageAuthor: Locator;

  constructor(protected page: Page) {
    super(page);
    this.articleImageAuthor = page.locator(".article-page-author");
    this.articleImageTopic = page.locator(".article-image-topic-button");
  }

  async goto(): Promise<void> {
    await this.page.goto("/author");
  }

  public get Page(): Page {
    return this.page;
  }
}
