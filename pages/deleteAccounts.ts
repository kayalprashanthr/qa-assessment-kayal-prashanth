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

    }
}