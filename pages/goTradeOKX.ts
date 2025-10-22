import{Page,expect} from "@playwright/test";
export class goTrade{
    readonly page:Page;
    readonly trading:string;
    readonly goTradePage:string;

    constructor(page:Page){
        this.page = page;
        this.trading = "//span[text()='Trading']";
        this.goTradePage = "//a[@href='/gotrade']";
    }
    async placeTrade(){
        await this.page.click(this.trading,{ force: true });
        await this.page.click(this.goTradePage,{ force: true });
        await this.page.click("//button[@data-testid='exchange-selector-trigger']",{ force: true });
        await this.page.locator("//input[@data-testid='exchange-search-input']").pressSequentially("OKX",{delay:100});
        await this.page.click("//span[text()='DemoTestOKX']",{ force: true });//div[@data-testid='account-row-item']
    }
    async marketEdgeTrade(symbolName:string){
        await this.page.click("//span[text()='Market-Edge']");
        await this.page.click("//button[@data-testid='symbols-dropdown']");
        await this.page.locator("//input[@role='combobox']").pressSequentially(symbolName,{delay:100});
        await this.page.keyboard.press('Enter');
        await this.page.fill("//input[@data-testid='quantity']","5");
        await this.page.fill("//input[@data-testid='duration']","2");
        
    }
}
