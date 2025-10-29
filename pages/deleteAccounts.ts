import { Page, expect } from "@playwright/test";
export class deleteAccounts{
    readonly page:Page;
    readonly accounts:string;
    readonly admin:string;

    constructor(page:Page){
        this.page = page;
        this.accounts = "//span[text()='Accounts']";
        this.admin = "//a[@href='/admin']";
    }
    async accDelete(){ 
        await this.page.click(this.accounts);
        await this.page.click(this.admin);
        await this.page.click("(//button[text()='Delete'])[3]");
        await this.page.fill("//input[@data-testid='delete-account-dialog-delete-confirmation']","DELETE");
        await this.page.click("//button[@data-testid='delete-account-dialog-delete']");
        await this.page.waitForTimeout(10000)
    }
}