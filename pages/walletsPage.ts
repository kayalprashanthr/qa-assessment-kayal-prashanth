import { Page, expect } from "@playwright/test";
export class walletsPage{
    readonly page:Page;
    readonly accounts:string;
    readonly admin:string;
    readonly goops:string;

    constructor(page:Page){
        this.page = page;
        this.accounts = "//span[text()='Accounts']";
        this.admin = "//a[@href='/admin']"
        this.goops = "//a[@href='/goops']";
    }
    async checkWalletsCEX(){
        await this.page.click(this.accounts);
        await this.page.click(this.admin);
        await this.page.waitForSelector("//tr[starts-with(@data-testid,'venues-table-row-')]");
        const rows = this.page.locator("//tr[starts-with(@data-testid,'venues-table-row-')]");
        const count = await rows.count();
        console.log(`Found ${count} accounts`);
        const accounts: string[] = [];
        for (let i = 0; i < count; i++) {
            const locator = this.page.locator(`//td[@data-testid='venues-table-cell-${i}-account_name']`);
            const text = (await locator.textContent())?.trim() || '';
            accounts.push(text);
            console.log(`Account ${i + 1}: ${text}`);
        }
        console.log("All accounts:", accounts);
        await this.page.click(this.accounts);
        await this.page.click(this.goops);
        await this.page.waitForSelector("//h3[@class='font-semibold tracking-tight text-lg']");
        const walletAccounts = await this.page.locator("//h3[@class='font-semibold tracking-tight text-lg']").allInnerTexts();
        const WAccounts = walletAccounts.map(text => text.trim());
        console.log("Wallets Accounts :", WAccounts);
        console.log(accounts.sort().join() === WAccounts.sort().join() ? "Same accounts in Admin" : "Not same accounts");
    }
} 