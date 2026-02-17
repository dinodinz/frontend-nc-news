import { CreatePage } from "../pages/create.page";
import { LoginPage } from "../pages/login.page";

export async function createUserFlow(
  createPage: CreatePage,
  loginPage: LoginPage,
  fullname: string,
  username: string,
): Promise<void> {
  await createPage.goto();
  try {
    await createPage.createUser(fullname, username);
  } catch (err) {
    throw new Error("User Creation Failed");
  }
  await loginPage.fillUsername(username);
  await loginPage.clickLoginButton();
}
