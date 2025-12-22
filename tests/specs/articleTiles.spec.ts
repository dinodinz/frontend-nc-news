import { expect, type Locator } from "@playwright/test";
import { test } from "../fixtures/testFixtures";

test.describe("test article tile buttons", () => {
  test.beforeEach(async ({ articleTiles }) => {
    await articleTiles.goto();
  });

  test("clicking article image redirects to article page", async ({
    articleTiles,
    articlePage,
  }) => {
    const tileAuthor = await articleTiles.tileAuthorText();
    await articleTiles.clickTileImage();
    await expect(articlePage.Page).toHaveURL(/\/article\/\d+$/);
    expect(tileAuthor).toBe(await articlePage.articleAuthorText());
  });

  test("clicking topic on the tile article redirects to main topic page", async ({
    articleTiles,
    articlePage,
  }) => {
    const topic = await articleTiles.tileTopicText();
    await articleTiles.clickTileTopic();
    await expect(articlePage.Page).toHaveURL(new RegExp(`.*topic/${topic}$`));
  });

  test("clicking author name on the tile article redirects to the authors page", async ({
    articleTiles,
    authorPage,
  }) => {
    const author = await articleTiles.tileAuthorText();
    await articleTiles.clickTileAuthor();
    await expect(authorPage.Page).toHaveURL(new RegExp(`.*author/${author}$`));
  });

  test("clicking the comment icon on the tile article tile redirects to the article page", async ({
    articleTiles,
    articlePage,
  }) => {
    await articleTiles.clickCommentButton();
    await expect(articlePage.Page).toHaveURL(new RegExp(`.*article/\\d{1,3}$`));
    await expect(articlePage.commentButton).toBeVisible();
  });
});
