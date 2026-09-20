import {type Locator, type Page, expect} from "@playwright/test";
import {log} from "../helpers/logger";

export default class BasePage {
    constructor(protected readonly page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await log("info", `Navigating to URL: ${url}`);
        await this.page.goto(url);
    }

    async clickElement(locator: Locator) {
        await log("info", `Clicking on element: ${await locator.textContent()}`);
        await locator.click();
    }

    async fillInput(locator: Locator, value: string) {
        await log("info", `Filling input with value: ${value}`);
        await locator.fill(value);
    }

    async expectText(locator: Locator, expectedText: string) {
        await log("info", `Expecting text: ${expectedText}`);
        await expect(locator).toContainText(expectedText);
    }
}
