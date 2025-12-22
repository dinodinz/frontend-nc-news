import { test } from "../fixtures/testFixtures";
import { expect } from "@playwright/test";

test.describe("test create account page", () => {
  test.beforeEach(async ({ createPage }) => {
    await createPage.goto();
  });

  test("enter valid username format and avatar", async ({
    createPage,
    loginPage,
  }) => {
    const uniqueUsername = `newaccount_${Date.now()}`;

    await createPage.fillFields("Dino Dinz", uniqueUsername);
    expect(createPage.validUserWarning).toHaveText("Username is available");
    await createPage.uploadAvatar();
    await loginPage.login(uniqueUsername);
    const validUsername = await loginPage.assertLoginSuccess(uniqueUsername);
    expect(validUsername.status()).toBe(200);
  });

  test("enter blank username then show an an error message", async ({
    createPage,
  }) => {
    await createPage.fillFields("invalidname", "");
    await createPage.clickCreateUser();
    await createPage.waitForLoading();
    await expect(createPage.invalidUserWarning).toHaveText(
      "Please enter a username with a minimum of 3 characters!"
    );
  });

  test("enter existing username in database should show 'Username is already taken!'", async ({
    createPage,
  }) => {
    await createPage.fillFields("Dino DInz", "dinodin");
    await createPage.assertUserCreation();
    await expect(createPage.invalidUserWarning).toHaveText(
      "Username is already taken!"
    );
  });

  test("enter valid username and fullname but without avatar should show 'Please provide a 1x1 avatar Image!''", async ({
    createPage,
  }) => {
    const uniqueUsername = `newaccount_${Date.now()}`;
    await createPage.fillFields("Dino Dinz", uniqueUsername);
    await createPage.clickCreateUser();
    await expect(createPage.invalidUserWarning).toHaveText(
      "Please provide a 1x1 avatar Image!"
    );
  });

  test("test 'Log in here!' button redirect", async ({
    createPage,
    loginPage,
  }) => {
    await createPage.clickLoginHere();
    await createPage.waitForLoading();
    await expect(createPage.Page).toHaveURL(
      "https://ncnewstagram.netlify.app/login"
    );
    await expect(loginPage.loginButton).toBeVisible();
  });
});
