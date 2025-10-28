import { Page, expect } from "@playwright/test";
import { Console } from "console";
export class settingsPage{
    readonly page:Page;
    readonly accounts:string;
    readonly settings:string;

    constructor(page:Page){
        this.page = page;
        this.accounts = "//span[text()='Accounts']";
        this.settings = "//a[@href='/settings']";
    }
    async keybordActios(){
        await this.page.click(this.accounts);
        await this.page.click(this.settings);
        await this.page.click("//button[text()='Shortcuts']");
        let keyName = await this.page.locator("//div[@class='flex items-center gap-1.5']").nth(1).textContent();
        keyName = (keyName || "").trim().replace(/\s+/g, "");
        console.log("Pressing key:", keyName);
        const oldUrl = this.page.url();
        await this.page.keyboard.press(keyName);
        await this.page.waitForTimeout(3000)
        const newUrl = this.page.url();
        await this.page.waitForTimeout(3000)
        if (newUrl !== oldUrl) {
            console.log("Redirected as per Key");
        } else {
            console.log("Not redirected");
        }
        await this.page.click(this.accounts);
        await this.page.click(this.settings);
        let invalidkey:string = "Shift+R";
        await this.page.waitForTimeout(3000);
        const oldUrl2 = this.page.url();
        await this.page.keyboard.press(invalidkey);
        await this.page.waitForTimeout(3000);
        const newUrl2 = this.page.url();
        if (newUrl2 !== oldUrl2) {
            console.log("Accepts dublicate keys its a bug");
        } else {
            console.log("Only Mentioned Keys");
        }
    }
} 