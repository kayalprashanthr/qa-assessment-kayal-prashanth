import {Locator, Page, expect,  } from "@playwright/test";
export class invalidLogin{

    readonly page:Page;
    readonly emailField:string;
    readonly passwordField:string;
    readonly signInField:string;

    constructor(page:Page){
        this.page = page;
        this.emailField = "#_r_0_-form-item";
        this.passwordField = "input[type='password']";
        this.signInField = "//button[text()='Sign In']";
    }
    async goToWebsite(){
        await this.page.goto("https://test1.gotrade.goquant.io/");
    }
    async invalidSignIn(invalidEmail:string,invalidPassword:string){
        await this.page.locator(this.emailField).pressSequentially(invalidEmail,{delay:200});
        await this.page.locator(this.passwordField).pressSequentially(invalidPassword,{delay:200});
        await this.page.click(this.signInField);
        await this.page.locator("//div[text()='The password is invalid']").isVisible();
        await this.page.locator(this.emailField).click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');

        await this.page.locator(this.passwordField).click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Delete');

    }
}