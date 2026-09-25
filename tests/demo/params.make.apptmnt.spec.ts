import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";

const appointmentData = TestData.makeAppointmentData();
for (const data of appointmentData) {
  test.describe(
    "Make Appointment with different parameters",
    { tag: "@dev" },
    () => {
      test.beforeEach("Go to Login Page", async ({ page }) => {
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make")).toBeVisible();
        await page.getByLabel("Username").click();
        await page.getByLabel("Username").fill("John Doe");
        await page.getByLabel("Password").click();
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page.locator("h2")).toContainText("Make Appointment");
      });

      test(`${data.testId} User should be able to make an appointment`, async ({
        page,
      }) => {
        await expect(page.locator("h2")).toContainText("Make Appointment");
        await page.getByLabel("Facility").selectOption(data.facility);
        await page
          .getByRole("checkbox", { name: "Apply for hospital readmission" })
          .check();
        await page.getByText(data.program).click();
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .click();
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .fill(data.visitDate);
        await page
          .getByRole("textbox", { name: "Visit Date (Required)" })
          .press("Enter");
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page.getByRole("textbox", { name: "Comment" }).fill(data.comment);
        await page.getByRole("button", { name: "Book Appointment" }).click();
        await expect(page.locator("h2")).toContainText(
          "Appointment Confirmation",
        );
        await expect(
          page.getByRole("link", { name: "Go to Homepage" }),
        ).toBeVisible();
      });
    },
  );
}
