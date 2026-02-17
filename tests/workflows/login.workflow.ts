import { LoginPage } from "../pages/login.page";

export async function loginFlow(
  loginPage: LoginPage,
  username: string
): Promise<void> {
  await loginPage.goto();
  await loginPage.fillUsername(username);
  await loginPage.clickLoginButton();
}
