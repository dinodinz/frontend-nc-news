import { test, expect, Locator } from "@playwright/test";

test.describe("test article page", () => {
  let tileTopic: Locator;
  let tileAuthor: Locator;
  let tileThumbsUp: Locator;
  let tileComment: Locator;
  let tileImage: Locator;
  let articleAuthor: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://ncnewstagram.netlify.app/login");
    await page.getByPlaceholder("Enter Username").fill("dinodin");
    await page.getByRole("button", { name: "Login" }).click();
    await page
      .getByRole("button", { name: "Logout" })
      .waitFor({ state: "visible" });
    tileImage = page.locator(".article-tile img").first();
    tileTopic = page.locator(".all-article-topic-button").first();
    tileAuthor = page.locator(".article-tile-author").first();
    tileThumbsUp = page.locator(".article-tile-thumbs-up-icon").first();
    tileComment = page.locator(".article-tile-comment-icon").first();
    articleAuthor = page.locator(".article-page-author");
  });

  test("clicking topic on the article image redirects to topic page ", async ({
    page,
  }) => {
    const authorTile = await tileAuthor.textContent();
    await tileImage.click();
    await expect(page).toHaveURL(/.*article.*/);
    const authorArticle = await articleAuthor.textContent();

    expect(authorTile).toEqual(authorArticle);
  });

  test("clicking author on the article image redirects author page", async ({
    page,
  }) => {
    const topic = await tileTopic.textContent();
    await tileTopic.click();
    await expect(page).toHaveURL(new RegExp(`.*topic/${topic}$`));
  });

  test("clicking heart without logged in shows popup instruction", async ({
    page,
  }) => {
    const author = await tileAuthor.textContent();
    await tileAuthor.click();
    await expect(page).toHaveURL(new RegExp(`.*author/${author}$`));
  });

  test("clicking heart while logged in shows updates the heart state", async ({
    page,
  }) => {
    const commentButton = await tileComment.textContent();

    await tileComment.click();
    await expect(page).toHaveURL(new RegExp(`.*article/\\d{1,3}$`));
    await expect(
      page.getByRole("button", { name: "Post a Comment" })
    ).toBeVisible();
  });

  test("clicking author text on the coments redirects to the author page", async ({
    page,
  }) => {
    const commentButton = await tileComment.textContent();

    await tileComment.click();
    await expect(page).toHaveURL(new RegExp(`.*article/\\d{1,3}$`));
    await expect(
      page.getByRole("button", { name: "Post a Comment" })
    ).toBeVisible();
  });
});
