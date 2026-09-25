import { test, expect } from "@playwright/test";
import HomePage from "../page-objects/home.page";
import { log } from "../helpers/logger";

test.describe("Way2Automation Login Test",{ tag: "@stage" }, () => {
  test.skip(process.env.ENV_NAME === "dev", "Skipping test in dev environment");
  test("Way2Automation Login Test", async ({ page }, testInfo) => {
    // Get the config file
    const configFile = testInfo.project.use as any;
    // Log the environment name
    await log("info", `Running in environment: ${configFile.envName}`);
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage(configFile.baseUrl);
    await homePage.clickLoginButton();
    await homePage.login(configFile.testUsername, configFile.testPassword);
    await homePage.verifyLoginSuccess();
  });
});
