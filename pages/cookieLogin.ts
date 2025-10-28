import {Locator, Page, expect,  } from "@playwright/test";
export class cookieLogin{

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
    async cookieSignIn(){
        let logo:any = this.page.getByAltText("Go Quant Logo").nth(1);
        await expect(logo).toBeVisible();
    }
}