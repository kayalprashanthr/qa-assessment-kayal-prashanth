import {Locator, Page, expect,  } from "@playwright/test";
export class logoutpage{

    readonly page:Page;
    readonly profileButton:string;
    readonly signOutButton:string;

    constructor(page:Page){
        this.page = page;
        this.profileButton = "(//button[@aria-haspopup='menu'])[1]";
        this.signOutButton = "//div[text()='Sign out']";

    }
    async signout(){
        await this.page.click(this.profileButton);
        await this.page.click(this.signOutButton); 
        await this.page.waitForTimeout(2000);
        let logo = this.page.locator("//h3[text()='Welcome']");
        await expect(logo).toBeVisible();
    }
}