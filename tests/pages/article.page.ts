import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./basePage.page";

export class ArticlePage extends BasePage {
  protected articleImageTopic: Locator;
  protected articleImageAuthor: Locator;
  protected articleCommentButton: Locator;
  protected articleImageHeart: Locator;
  protected _articleImageHeartValue: Locator;

  constructor(protected page: Page) {
    super(page);
    this.articleImageAuthor = page.locator(".article-page-author");
    this.articleImageTopic = page.locator(".article-image-topic-button");
    this.articleCommentButton = page.getByRole("button", {
      name: "Post a Comment",
    });
    this.articleImageHeart = page.locator(".article-page-heart-icon");
    this._articleImageHeartValue = page.locator(
      ".article-tile-heart-count span"
    );
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
    return author.toLowerCase();
  }

  async clickArticleImageHeart(): Promise<void> {
    this.articleImageHeart.click();
  }

  async articleImageHeartValue(): Promise<number> {
    return Number(await this._articleImageHeartValue.textContent());
  }

  async clickArticleAuthor(): Promise<void> {
    this.articleAuthor.click();
  }

  get articleTopic(): Locator {
    return this.articleImageTopic;
  }

  async articleTopicText(): Promise<string | null> {
    const topic = await this.articleTopic.textContent();
    if (topic === null) throw new Error("Article topic text not found");
    return topic.toLowerCase();
  }

  async clickArticleTopic(): Promise<void> {
    this.articleTopic.click();
  }

  get Page(): Page {
    return this.page;
  }

  get heartPopupError(): Locator {
    return this.page.locator(".article-page-heart-error-msg");
  }

  get commentButton(): Locator {
    return this.articleCommentButton;
  }

  async commentButtonText(): Promise<string | null> {
    const commentButtonText = await this.commentButton.textContent();
    if (commentButtonText === null)
      throw new Error("Comment Button text not found");
    return commentButtonText;
  }

  async clickCommentButton(): Promise<void> {
    await this.commentButton.waitFor({ state: "visible" });
    this.commentButton.click();
  }
}
