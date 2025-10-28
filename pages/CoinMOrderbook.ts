import{Page,expect} from "@playwright/test";
export class CoinMOrderbook{
    readonly page:Page;
    readonly trading:string;
    readonly goTradePage:string;

    constructor(page:Page){
        this.page = page;
        this.trading = "//span[text()='Trading']";
        this.goTradePage = "//a[@href='/gotrade']";
    }
    async selectTradeAcc(){
        await this.page.click(this.trading,{ force: true });
        await this.page.click(this.goTradePage,{ force: true });
        await this.page.click("//button[@data-testid='exchange-selector-trigger']",{ force: true });
        await this.page.locator("//input[@data-testid='exchange-search-input']").pressSequentially("CoinM",{delay:100});
        await this.page.click("//span[text()='DemoTestCoinM']",{ force: true });//div[@data-testid='account-row-item']
    }
    async checkEachOrderBook(){
        await this.page.click("//button[@data-testid='symbols-dropdown']");
        // Fetch all option texts once (if possible)
        const optionElements = await this.page.$$("//div[@role='option']");
        const optionTexts = [];
        await this.page.keyboard.press('Enter');
        for (const option of optionElements) {
            const rawText = await option.textContent();
            const text = rawText?.trim()?.replace(/COINM Perpetuals$/, '').trim();
            if (text) optionTexts.push(text);
            }
            console.log(`Found ${optionTexts.length} symbols`);
            for (const text of optionTexts) {
                console.log(`Typing: ${text}`);
                // Reopen dropdown each time
                await this.page.click("//button[@data-testid='symbols-dropdown']");
                const comboBox = this.page.locator("//input[@placeholder='Search symbol...']");
                await comboBox.waitFor({ state: 'visible' });
                // Fill the symbol text
                await comboBox.fill(text);
                await this.page.keyboard.press('Enter');
                // Wait for orderbook load
                await this.page.waitForTimeout(4000);
                const orderBook = this.page.locator("//div[@data-testid='orderbook']").nth(1);
                const isVisible = await orderBook.isVisible();
                console.log(isVisible ? `OrderBook Visible for: ${text}` : `Not Loaded for: ${text}`);
                console.log("_____________________");
            }
    }
}