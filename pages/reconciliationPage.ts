import { Page, expect } from "@playwright/test";
export class reconciliationPage{
    readonly page:Page;
    readonly accounts:string;
    readonly goops:string;

    constructor(page:Page){
        this.page = page;
        this.accounts = "//span[text()='Accounts']";
        this.goops = "//a[@href='/goops']";
    }
    async checkReconciliationHistory(){
        await this.page.click(this.accounts);
        await this.page.click(this.goops);
        await this.page.waitForSelector("//h3[@class='font-semibold tracking-tight text-lg']");
        await this.page.waitForTimeout(3000);
        const walletAccounts = await this.page.locator("//h3[@class='font-semibold tracking-tight text-lg']").allInnerTexts();
        const WAccounts = walletAccounts.map(text => text.trim());
        console.log("Wallets Accounts :", WAccounts);
        await this.page.click(this.accounts);
        await this.page.click(this.goops);
        await this.page.click("//button[@data-testid='goops-reconciliation-tab']");
        await this.page.waitForSelector("//td")
        const allTds = await this.page.locator("//td");
        const total = await allTds.count();
        const result: string[] = [];
        let index = 11;
        while (index < total) {
            const text = (await allTds.nth(index).textContent())?.trim() || '';
            result.push(text);
            index += 17; // jump to next 17th element
        }
        console.log("Collected texts:", result);
        const Match = result.some(r => 
        WAccounts.some(w => w.trim().toLowerCase() === r.trim().toLowerCase())
        );
        console.log(Match ? "Match found" : "No match");
    }
}    