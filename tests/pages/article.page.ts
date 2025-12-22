import { type Locator } from "@playwright/test";
import { BasePage } from "./basePage.page";
import { Page } from "playwright";

export class ArticlePage extends BasePage {
  protected articleImageTopic: Locator;
  protected articleImageAuthor: Locator;
  protected articleCommentButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this.articleImageAuthor = page.locator(".article-page-author");
    this.articleImageTopic = page.locator(".article-image-topic-button");
    this.articleCommentButton = page.getByRole("button", {
      name: "Post a Comment",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/article");
  }

  get articleAuthor(): Locator {
    return this.articleImageAuthor;
  }

  async articleAuthorText(): Promise<string | null> {
    const author = await this.articleAuthor.textContent();
    if (author === null) throw new Error("Article author text not found");
    return author;
  }

  public get Page(): Page {
    return this.page;
  }

  get commentButton(): Locator {
    return this.articleCommentButton;
  }

  public async commentButtonText(): Promise<string | null> {
    const commentButtonText = await this.commentButton.textContent();
    if (commentButtonText === null)
      throw new Error("Comment Button text not found");
    return commentButtonText;
  }

  public async clickCommentButton(): Promise<void> {
    await this.commentButton.waitFor({ state: "visible" });
    this.commentButton.click();
  }
}
