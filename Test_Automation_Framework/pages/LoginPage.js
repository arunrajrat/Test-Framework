const { expect } = require("@playwright/test");

exports.LoginPage =
class LoginPage{
    constructor(page){
        this.page = page;
        this.sideMenuBarButton = "//img[@alt='menu']";
        this.loginPageButton = "//button[text()='Log in']";
        this.email = "//input[@id='email1']";
        this.password = "//input[@id='password1']";
        this.loginButton = "//button[@type='submit']";
        this.errorMessage = "//h2[@class='errorMessage']";
        this.signOutButton = "//button[text()='Sign out']";
    }

    async gotoLoginPage(url){
        await this.page.goto(url);
        await this.page.click(this.sideMenuBarButton);
        await this.page.click(this.loginPageButton);
    }

    async loginUser(email,password){
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.page.click(this.loginButton);
    }

    async verifyLogin(url){
        await this.page.waitForTimeout(500);
        await expect(this.page).toHaveURL(url);
    }

    async verifyInvalidLogin(errorMessage){
        const message = await this.page.locator(this.errorMessage).textContent();
        await expect(message.match(errorMessage)).toBeTruthy();
    }

    async signOutUser(){
        await this.page.click(this.sideMenuBarButton);
        await this.page.click(this.signOutButton);
    }

    async verifySignOut(loginUrl){
        await expect(this.page).toHaveURL(loginUrl);
    }
}