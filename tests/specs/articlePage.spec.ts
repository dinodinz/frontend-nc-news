import { expect, type Locator } from "@playwright/test";
import { test } from "../fixtures/testFixtures";
import { loginFlow } from "../workflows/login.workflow";
import { logoutFlow } from "../workflows/logout.workflow";

test.describe("test article page", () => {
  test.beforeEach(async ({ loginPage, articleTiles }) => {
    await loginFlow(loginPage, "dinodin");
    await expect(loginPage.logoutButton).toBeVisible();
    await articleTiles.clickTileImage();
  });

  test("clicking topic on the article image redirects to topic page ", async ({
    articlePage,
  }) => {
    const topic = await articlePage.articleTopicText();
    await articlePage.clickArticleTopic();
    await expect(articlePage.Page).toHaveURL(new RegExp(`/topic/${topic}$`));
  });

  test("clicking author on the article image redirects author page", async ({
    articlePage,
  }) => {
    const author = await articlePage.articleAuthorText();
    await articlePage.clickArticleAuthor();
    await expect(articlePage.Page).toHaveURL(new RegExp(`/author/${author}$`));
  });

  test("clicking heart without logged in shows popup instruction", async ({
    articlePage,
    loginPage,
    articleTiles,
  }) => {
    await logoutFlow(loginPage);
    await expect(loginPage.loginButton).toBeVisible();
    await articleTiles.clickTileImage();
    await articlePage.clickArticleImageHeart();
    await expect(articlePage.heartPopupError).toBeVisible();
  });

  test("clicking heart while logged in shows updates the heart state", async ({
    articlePage,
  }) => {
    const heartValueBefore = await articlePage.articleImageHeartValue();
    console.log(heartValueBefore);
    await articlePage.clickArticleImageHeart();
    const fire = await articlePage.articleImageHeartValue();
    console.log(fire);
    await expect
      .poll(async () => await articlePage.articleImageHeartValue())
      .toBeGreaterThan(heartValueBefore);
  });

  // test("clicking author text on the coments redirects to the author page", async ({
  //   page,
  // }) => {
  //   const commentButton = await tileComment.textContent();

  //   await tileComment.click();
  //   await expect(page).toHaveURL(new RegExp(`.*article/\\d{1,3}$`));
  //   await expect(
  //     page.getByRole("button", { name: "Post a Comment" })
  //   ).toBeVisible();
  // });
});
