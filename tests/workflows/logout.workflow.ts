import { LoginPage } from "../pages/login.page";

export async function logoutFlow(loginPage: LoginPage): Promise<void> {
  try {
    await loginPage.clickLogoutButton();
    await loginPage.waitForLoginButton();
  } catch (err) {
    console.warn("Logout failed or login button did not appear");
  }
}
