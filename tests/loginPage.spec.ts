import { test, expect, Locator } from "@playwright/test";

test.describe("test log in Process", () => {
  let loginField: Locator;
  let loginButton: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://ncnewstagram.netlify.app/login");
    loginField = page.getByRole("textbox");
    loginButton = page.getByRole("button", { name: "Login" });
  });

  test("enter valid login credentials", async ({ page }) => {
    await loginField.fill("dinodinfinal");
    await loginButton.click();
    await page.waitForResponse(
      "https://northcoders-reddit.onrender.com/api/users/dinodinfinal"
    );
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("enter invalid login and show error", async ({ page }) => {
    await loginField.fill("invalidname");
    await loginButton.click();
    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/users") && response.status() === 404
    );
    const usernameError = page.getByText("Username does not exist");

    await expect(usernameError).toHaveText("Username does not exist");
  });

  test("enter a blank value and show an error", async ({ page }) => {
    await loginField.fill("");
    await loginButton.click();

    const usernameError = page.getByText("Please enter a username Value!!");

    await expect(usernameError).toHaveText("Please enter a username Value!!");
  });

  test("enter Sign Up Now redirect", async ({ page }) => {
    const signUpButton = page.getByText("Sign up now!", { exact: true });
    await signUpButton.click();

    await expect(page).toHaveURL("https://ncnewstagram.netlify.app/create");

    await expect(
      page.getByRole("button", { name: "Create Account" })
    ).toBeVisible();
  });
});
