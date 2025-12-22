import { type Locator, type Response } from "@playwright/test";
import { Page } from "playwright";
import { BasePage } from "./basePage.page";

export class LoginPage extends BasePage {
  protected usernameField: Locator;
  protected loginbutton: Locator;
  protected signUpButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this.usernameField = page.getByRole("textbox");
    this.loginbutton = page.getByRole("button", { name: "Login" });
    this.signUpButton = page.getByText("Sign up now!", {
      exact: true,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  public get Page(): Page {
    return this.page;
  }

  public get loginButton(): Locator {
    return this.loginbutton;
  }

  public get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout" });
  }

  public get loginError(): Locator {
    return this.page.locator(".invalid-username-error");
  }

  async clickSignUp(): Promise<void> {
    await this.signUpButton.waitFor({ state: "visible" });
    await this.signUpButton.click();
  }

  async login(username: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.loginbutton.click();
  }

  async assertLoginSuccess(username: string): Promise<Response> {
    const response = await this.page.waitForResponse(
      `https://northcoders-reddit.onrender.com/api/users/${username}`
    );
    return response;
  }
}
