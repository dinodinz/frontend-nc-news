import { type Locator, type Response, type Page } from "@playwright/test";
import { BasePage } from "./basePage.page";

export class LoginPage extends BasePage {
  protected _usernameField: Locator;
  protected _loginButton: Locator;
  protected _signUpButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this._usernameField = page.getByRole("textbox");
    this._loginButton = page.getByRole("button", { name: "Login" });
    this._signUpButton = page.getByText("Sign up now!", {
      exact: true,
    });
  }

  private get usernameField(): Locator {
    return this._usernameField;
  }

  public async fillUsername(username: string): Promise<void> {
    await this.usernameField.waitFor({ state: "visible" });
    this.usernameField.fill(username);
  }

  public async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  public get Page(): Page {
    return this.page;
  }

  public get loginButton(): Locator {
    return this._loginButton;
  }

  public async clickLoginButton(): Promise<void> {
    await this.loginButton.waitFor({ state: "visible" });
    this.loginButton.click();
  }

  public async waitForLoginButton(): Promise<void> {
    await this.loginButton.waitFor({ state: "visible" });
  }

  public get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Logout" });
  }

  public async clickLogoutButton(): Promise<void> {
    await this.logoutButton.waitFor({ state: "visible" });
    this.logoutButton.click();
  }

  public get loginError(): Locator {
    return this.page.locator(".invalid-username-error");
  }

  public async clickSignUp(): Promise<void> {
    await this._signUpButton.waitFor({ state: "visible" });
    await this._signUpButton.click();
  }

  public async assertLoginSuccess(username: string): Promise<Response> {
    const response = await this.page.waitForResponse(
      `https://northcoders-reddit.onrender.com/api/users/${username}`
    );
    return response;
  }
}
