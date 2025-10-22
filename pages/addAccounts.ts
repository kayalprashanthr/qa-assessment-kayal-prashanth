import { Page, expect } from "@playwright/test";

export class addAccounts{
    readonly page:Page;
    readonly accounts:string;
    readonly admin:string;

    constructor(page:Page){
        this.page = page;
        this.accounts = "//span[text()='Accounts']";
        this.admin = "//a[@href='/admin']";
    }
    async addAccOKX(Password:string, OKXName:string, OKXKey:string, OKXSecret:string){
        await this.page.click(this.accounts);
        await this.page.click(this.admin);
        await this.page.click("//button[text()='Add Account']");
        //For OKX
        await this.page.locator("//input[@name='accountName']").pressSequentially(OKXName,{delay:50})
        await this.page.locator("//input[@name='apiKey']").pressSequentially(OKXKey,{delay:50});
        await this.page.locator("//input[@name='apiSecret']").pressSequentially(OKXSecret,{delay:50})
        await this.page.locator("//input[@name='passphrase']").pressSequentially(Password,{delay:50});
        await this.page.click("//button[@role='switch']");
        await this.page.click("(//button[text()='Add Account'])[2]");
        await this.page.waitForTimeout(10000);
    }
    async addAccUSDM(USDMName:string, USDMKey:string, USDMSecret:string){
        //For Binance USD-M
        await this.page.click("//button[text()='Add Account']");
        await this.page.click("//div[@class='flex items-center gap-x-2 px-1']");
        await this.page.fill("//input[@data-testid='exchange-search-input']","USD");
        await this.page.click("//div[@data-testid='exchange-option-BINANCEUSDM']");
        await this.page.locator("//input[@name='accountName']").pressSequentially(USDMName,{delay:50});
        await this.page.locator("//input[@name='apiKey']").pressSequentially(USDMKey,{delay:50});
        await this.page.locator("//input[@name='apiSecret']").pressSequentially(USDMSecret,{delay:50});
        await this.page.click("//button[@role='switch']");
        await this.page.click("(//button[text()='Add Account'])[2]");
        await this.page.waitForTimeout(10000);
    }
    async addAccCoinM(CoinMName:string, CoinMKey:string, CoinMSecret:string){
        await this.page.click("//button[text()='Add Account']");
        await this.page.click("//div[@class='flex items-center gap-x-2 px-1']");
        await this.page.fill("//input[@data-testid='exchange-search-input']","Coin");
        await this.page.click("//div[@data-testid='exchange-option-BINANCECOINM']");
        await this.page.locator("//input[@name='accountName']").pressSequentially(CoinMName,{delay:50});
        await this.page.locator("//input[@name='apiKey']").pressSequentially(CoinMKey,{delay:50});
        await this.page.locator("//input[@name='apiSecret']").pressSequentially(CoinMSecret,{delay:50});
        await this.page.click("//button[@role='switch']");
        await this.page.click("(//button[text()='Add Account'])[2]");
        await this.page.waitForTimeout(10000);
    }
}