import { test, expect } from "@playwright/test";
import {log} from "../helpers/logger";

test.describe("Make Appointment", () => {
  test.beforeEach("Go to Login Page", async ({ page }, testInfo) => {
    // Get the config file
    const configFile = testInfo.project.use as any;
    // Log the environment name
    await log("info", `Running in environment: ${configFile.envName}`);

    // Go to the login page and perform login
    await page.goto(configFile.baseURL);
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill(configFile.username);
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill(configFile.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Get login cookies
    const loginCookies = await page.context().cookies();
    process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);
    
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("User should be able to make an appointment with non-default parameters", async ({ page }) => {
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByText("Medicaid").click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("25/07/2026");
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .press("Enter");
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("Bookinng an apopintment\non the monday\nfor the visiting");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
