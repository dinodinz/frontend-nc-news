import { type Locator } from "@playwright/test";
import { BasePage } from "./basePage.page";
import { Page } from "playwright";

export class ArticleTiles extends BasePage {
  protected tiletopic: Locator;
  protected tileauthor: Locator;
  protected tileThumbsUp: Locator;
  protected tilecomment: Locator;
  protected tileimage: Locator;
  protected articleAuthor: Locator;

  constructor(protected page: Page) {
    super(page);
    this.tiletopic = page.locator(".all-article-topic-button").first();
    this.tileauthor = page.locator(".article-tile-author").first();
    this.tileThumbsUp = page.locator(".article-tile-thumbs-up-icon").first();
    this.tilecomment = page.locator(".article-tile-comment-icon").first();
    this.tileimage = page.locator(".article-tile img").first();
    this.articleAuthor = page.locator(".article-page-author");
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  get tileAuthor(): Locator {
    return this.tileauthor;
  }

  async clickTileAuthor(): Promise<void> {
    this.tileAuthor.click();
  }

  async tileAuthorText(): Promise<string | null> {
    const author = await this.tileAuthor.textContent();
    if (author === null) throw new Error("Tile author text not found");
    return author;
  }

  public get Page(): Page {
    return this.page;
  }

  get commentButton(): Locator {
    return this.tilecomment;
  }

  async clickCommentButton(): Promise<void> {
    await this.commentButton.waitFor({ state: "visible" });
    this.commentButton.click();
  }

  async clickTileImage(): Promise<void> {
    await this.tileimage.waitFor({ state: "visible" });
    await this.tileimage.click();
  }

  public get tileTopic(): Locator {
    return this.tiletopic;
  }

  async clickTileTopic(): Promise<void> {
    await this.tileTopic.waitFor({ state: "visible" });
    await this.tileTopic.click();
  }

  async tileTopicText(): Promise<string | null> {
    const topic = await this.tileTopic.textContent();
    if (topic === null) throw new Error("Tile topic text not found");
    return topic;
  }
}
