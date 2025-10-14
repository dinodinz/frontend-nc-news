import { test, expect, Locator } from "@playwright/test";

test.describe("test create account page", () => {
  let createFullName: Locator;
  let createUserName: Locator;
  let createAccountButton: Locator;
  let loginUsername: Locator;
  let loginButton: Locator;
  let fileInput: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("https://ncnewstagram.netlify.app/create");
    createFullName = page.getByPlaceholder("Enter Full Name");
    createUserName = page.getByPlaceholder("Enter Username");
    fileInput = page.locator(".file-input-field");
    createAccountButton = page.getByRole("button", {
      name: "Create Account",
    });
    loginUsername = page.getByPlaceholder("Enter Username");
    loginButton = page.getByRole("button", {
      name: "Login",
    });
  });

  test("enter valid username format and avatar", async ({ page }) => {
    const uniqueUsername = `newaccount_${Date.now()}`;

    await createFullName.fill("Dino Dinz");
    await createUserName.fill(uniqueUsername);

    const usernameValid = page.getByText("Username is available");
    await expect(usernameValid).toHaveText("Username is available");

    await fileInput.setInputFiles("tests/fixtures/avatarImage.jpeg");
    await expect(page.locator("img[alt='Avatar']")).toBeVisible();
    await createAccountButton.click();

    await page.waitForResponse(
      (resp) =>
        resp.url() === "https://northcoders-reddit.onrender.com/api/users" &&
        resp.status() === 201
    );

    await loginUsername.fill(uniqueUsername);
    await loginButton.click();

    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("enter blank username then show an an error message", async ({
    page,
  }) => {
    await createFullName.fill("invalidname");
    await createUserName.fill("");
    await createAccountButton.click();

    const usernameError =
      page.getByText(`Please enter a username with a minimum of 3 characters!

`);

    await expect(usernameError).toHaveText(
      "Please enter a username with a minimum of 3 characters!"
    );
  });

  test("enter existing username in database should show 'Username is already taken!'", async ({
    page,
  }) => {
    await createFullName.fill("Dino DInz");
    await createUserName.fill("dinodin");

    await page.waitForResponse(
      (resp) =>
        resp.url() === "https://northcoders-reddit.onrender.com/api/users" &&
        resp.status() === 200
    );

    const usernameAvailable = page.getByText("Username is already taken!");

    await expect(usernameAvailable).toHaveText("Username is already taken!");
  });

  test("enter valid username and fullname but without avatar should show 'Please provide a 1x1 avatar Image!''", async ({
    page,
  }) => {
    const uniqueUsername = `newaccount_${Date.now()}`;
    await createFullName.fill("Dino Dinz");
    await createUserName.fill(uniqueUsername);
    await createAccountButton.click();

    const usernameError = page.getByText("Please provide a 1x1 avatar Image!");

    await expect(usernameError).toHaveText(
      "Please provide a 1x1 avatar Image!"
    );
  });

  test("test 'Log in here!' button redirect", async ({ page }) => {
    const logInButton = page.getByText("Log in here!", { exact: true });
    await logInButton.click();

    await expect(page).toHaveURL("https://ncnewstagram.netlify.app/login");
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });
});
