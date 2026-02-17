import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";
import { loginFlow } from "../workflows/login.workflow";

test.describe("test log in Process", () => {
  test("enter valid login credentials", async ({ loginPage }) => {
    await loginFlow(loginPage, "dinodinfinal");
    await loginPage.waitForLoading();
    const successLogin = await loginPage.assertLoginSuccess("dinodinfinal");
    expect(successLogin.status()).toBe(200);
    await expect(loginPage.logoutButton).toBeVisible();
  });

  test("enter invalid login and show error", async ({ loginPage }) => {
    await loginFlow(loginPage, "invalidname");
    await loginPage.waitForLoading();
    const invalidLogin = await loginPage.assertLoginSuccess("invalidname");
    expect(invalidLogin.status()).toBe(404);
    await expect(loginPage.loginError).toHaveText("Username does not exist");
  });

  test("enter a blank value and show an error", async ({ loginPage }) => {
    await loginFlow(loginPage, "");
    await loginPage.waitForLoading();
    await expect(loginPage.loginError).toHaveText(
      "Please enter a username Value!!"
    );
  });

  test("Click Sign Up Now redirect", async ({ loginPage, createPage }) => {
    await loginPage.goto();
    await loginPage.clickSignUp();
    await loginPage.waitForLoading();
    await expect(loginPage.Page).toHaveURL(
      "https://ncnewstagram.netlify.app/create"
    );
    await expect(createPage.createAccountButton).toBeVisible();
  });
});
