import { type Response, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./basePage.page";

export class CreatePage extends BasePage {
  protected _usernameField: Locator;
  protected _fullnameField: Locator;
  protected _createAccount: Locator;
  protected _fileInput: Locator;
  protected _loginButton: Locator;
  protected _loginHere: Locator;
  private readonly usersAPI =
    "https://northcoders-reddit.onrender.com/api/users";

  constructor(protected page: Page) {
    super(page);
    this._usernameField = page.getByPlaceholder("Enter Username");
    this._fullnameField = page.getByPlaceholder("Enter Full Name");
    this._fileInput = page.locator(".file-input-field");
    this._createAccount = page.getByRole("button", {
      name: "Create account",
    });
    this._loginButton = page.getByRole("button", {
      name: "Login",
    });
    this._loginHere = page.getByText("Log in here!", {
      exact: true,
    });
  }

  public async goto(): Promise<void> {
    await this.page.goto("/create");
  }

  public get Page(): Page {
    return this.page;
  }

  public async createUser(fullname: string, username: string): Promise<void> {
    await this._fullnameField.fill(fullname);
    await this._usernameField.fill(username);
    await this._fileInput.setInputFiles("tests/fixtures/avatarImage.jpeg");
    await this.page.locator("img[alt='Avatar']").waitFor({ state: "visible" });
    await this.clickCreateUser();
    await this.page.waitForResponse(
      (response: Response) =>
        response.url() === this.usersAPI && response.status() === 201,
    );
  }

  public async fillFields(fullname: string, username: string): Promise<void> {
    await this._fullnameField.fill(fullname);
    await this._usernameField.fill(username);
  }

  public get validUserWarning(): Locator {
    return this.page.locator(".valid-username-validation");
  }

  public get invalidUserWarning(): Locator {
    return this.page.locator(".invalid-username-error");
  }

  public get createAccountButton(): Locator {
    return this._createAccount;
  }

  public async clickCreateUser(): Promise<void> {
    await this.createAccountButton.click();
  }

  public async clickLoginHere(): Promise<void> {
    await this._loginHere.click();
  }

  public async uploadAvatar(): Promise<void> {
    await this._fileInput.setInputFiles("tests/fixtures/avatarImage.jpeg");
    await this.page.locator("img[alt='Avatar']").waitFor({ state: "visible" });
    await this.createAccountButton.click();
    await this.page.waitForResponse(
      (resp) => resp.url() === this.usersAPI && resp.status() === 201,
    );
  }

  public async assertUserCreation(): Promise<Response> {
    return await this.page.waitForResponse(
      (response: Response) =>
        response.url() === this.usersAPI && response.status() === 200,
    );
  }
}
