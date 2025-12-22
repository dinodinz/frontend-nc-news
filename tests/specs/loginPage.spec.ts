import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";

test.describe("test log in Process", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("enter valid login credentials", async ({ loginPage }) => {
    await loginPage.login("dinodinfinal");
    const successLogin = await loginPage.assertLoginSuccess("dinodinfinal");
    expect(successLogin.status()).toBe(200);
    await expect(loginPage.logoutButton).toBeVisible();
  });

  test("enter invalid login and show error", async ({ loginPage }) => {
    await loginPage.login("invalidname");
    const invalidLogin = await loginPage.assertLoginSuccess("invalidname");
    expect(invalidLogin.status()).toBe(404);
    await expect(loginPage.loginError).toHaveText("Username does not exist");
  });

  test("enter a blank value and show an error", async ({ loginPage }) => {
    await loginPage.login("");
    await expect(loginPage.loginError).toHaveText(
      "Please enter a username Value!!"
    );
  });

  test("Click Sign Up Now redirect", async ({ loginPage, createPage }) => {
    await loginPage.clickSignUp();
    await loginPage.waitForLoading();
    await expect(loginPage.Page).toHaveURL(
      "https://ncnewstagram.netlify.app/create"
    );
    await expect(createPage.createAccountButton).toBeVisible();
  });
});
