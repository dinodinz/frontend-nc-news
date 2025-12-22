import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page.ts";
import { CreatePage } from "../pages/create.page.ts";
import { ArticleTiles } from "../pages/articleTiles.page.ts";
import { ArticlePage } from "../pages/article.page.ts";
import { AuthorPage } from "../pages/author.page.ts";

type Fixtures = {
  loginPage: LoginPage;
  createPage: CreatePage;
  articleTiles: ArticleTiles;
  articlePage: ArticlePage;
  authorPage: AuthorPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  createPage: async ({ page }, use) => {
    const createPage = new CreatePage(page);
    await use(createPage);
  },

  articleTiles: async ({ page }, use) => {
    const articleTiles = new ArticleTiles(page);
    await use(articleTiles);
  },

  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },

  authorPage: async ({ page }, use) => {
    const authorPage = new AuthorPage(page);
    await use(authorPage);
  },
});
