import { type Response, type Locator } from "@playwright/test";
import { Page } from "playwright";
import { BasePage } from "./basePage.page";

export class CreatePage extends BasePage {
  protected usernameField: Locator;
  protected fullnameField: Locator;
  protected createAccount: Locator;
  protected fileInput: Locator;
  protected loginButton: Locator;
  protected loginHere: Locator;
  private readonly usersAPI =
    "https://northcoders-reddit.onrender.com/api/users";

  constructor(protected page: Page) {
    super(page);
    this.usernameField = page.getByPlaceholder("Enter Username");
    this.fullnameField = page.getByPlaceholder("Enter Full Name");
    this.fileInput = page.locator(".file-input-field");
    this.createAccount = page.getByRole("button", {
      name: "Create account",
    });
    this.loginButton = page.getByRole("button", {
      name: "Login",
    });
    this.loginHere = page.getByText("Log in here!", {
      exact: true,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("/create");
  }

  public get Page(): Page {
    return this.page;
  }

  async createUser(fullname: string, username: string): Promise<void> {
    await this.fullnameField.fill(fullname);
    await this.usernameField.fill(username);
    await this.fileInput.setInputFiles("tests/fixtures/avatarImage.jpeg");
    await this.page.locator("img[alt='Avatar']").waitFor({ state: "visible" });
    await this.createAccountButton.click();
    await this.page.waitForResponse(
      (response: Response) =>
        response.url() === this.usersAPI && response.status() === 201
    );
  }

  async fillFields(fullname: string, username: string): Promise<void> {
    await this.fullnameField.fill(fullname);
    await this.usernameField.fill(username);
  }

  public get validUserWarning(): Locator {
    return this.page.locator(".valid-username-validation");
  }

  public get invalidUserWarning(): Locator {
    return this.page.locator(".invalid-username-error");
  }

  public get createAccountButton(): Locator {
    return this.createAccount;
  }

  async clickCreateUser(): Promise<void> {
    await this.createAccountButton.click();
  }

  async clickLoginHere(): Promise<void> {
    await this.loginHere.click();
  }

  async uploadAvatar(): Promise<void> {
    await this.fileInput.setInputFiles("tests/fixtures/avatarImage.jpeg");
    await this.page.locator("img[alt='Avatar']").waitFor({ state: "visible" });
    await this.createAccountButton.click();
    await this.page.waitForResponse(
      (resp) => resp.url() === this.usersAPI && resp.status() === 201
    );
  }

  async assertUserCreation(): Promise<Response> {
    return await this.page.waitForResponse(
      (response: Response) =>
        response.url() === this.usersAPI && response.status() === 200
    );
  }
}
