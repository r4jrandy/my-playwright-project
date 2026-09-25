import {type Page} from "@playwright/test";
import BasePage from "./base.page";
import {log} from "../helpers/logger";

export default class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    // Elements
    get homePageLoginButton() { return this.page.locator('span').filter({ hasText: 'Login' }); }
    get usernameInput() { return this. page.locator('#login-username'); }
    get passwordInput() { return this.page.locator('#login-password'); }
    get loginButton() { return this.page.getByRole('button', { name: 'Login' }); }
    get featuredProductsHeading() { return this.page.getByRole('heading', { name: 'Featured Products' }); }

    // Actions
    async navigateToHomePage(url: string) {
        await log("info", "Navigating to Home Page");
        await this.navigateTo(url);
    }

    async clickLoginButton() {
        await log("info", "Clicking on Login button");
        await this.clickElement(this.homePageLoginButton);
    }

    async login(username: string, password: string) {
        await log("info", "Submitting login credentials");
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    async verifyLoginSuccess() {
        await log("info", "Verifying login success");
        await this.expectText(this.featuredProductsHeading, "Featured Products");
    }
}
