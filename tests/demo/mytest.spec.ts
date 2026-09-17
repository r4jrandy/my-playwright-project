import {test, expect} from '@playwright/test';

test("Should load home page with title", async ({page}) => {
    // Visit home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    // Verify title
    await expect(page).toHaveTitle("CURA Healthcare Service");
    // Verify header test
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

})