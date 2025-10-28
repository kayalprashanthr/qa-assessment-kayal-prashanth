import{Page,expect} from "@playwright/test";
export class assertsPage{
    readonly page:Page;
    readonly trading:string;
    readonly goTradePage:string;

    constructor(page:Page){
        this.page = page;
        this.trading = "//span[text()='Trading']";
        this.goTradePage = "//a[@href='/gotrade']";
    }
    async checkAsserts(percentage:string){
        await this.page.click(this.trading,{ force: true });
        await this.page.click(this.goTradePage,{ force: true });
        await this.page.click("//button[text()='Assets']");
        let assertValueUnknown = await this.page.locator("(//div[@class='font-inter text-xsm 4k:text-sm flex flex-col justify-center font-medium'])[1]");
        let assertvalue: string = (await assertValueUnknown.textContent()) ?? "0";
        await this.page.click("(//button[text()='Add/Clear'])[1]");
        try {
        // Try waiting for the dropdown option to appear within 3 seconds
            await this.page.waitForSelector(`//div[@data-value='${percentage}']`, { timeout: 3000 });
        } catch (error) {
            console.warn("⚠️ Percentage option not visible, retrying 'Add/Clear' click...");
            await this.page.click("(//button[text()='Add/Clear'])[1]");
            await this.page.waitForSelector(`//div[@data-value='${percentage}']`, { timeout: 3000 });
        }
        const percentageOption = this.page.locator(`//div[@data-value='${percentage}']`);
        await percentageOption.waitFor({ state: 'visible' });
        await percentageOption.click();
        let changedQuantityUnknown = await this.page.locator("//input[@data-testid='quantity']");
        let changedQuantityText: string = (await changedQuantityUnknown.textContent()) ?? "0";
        let changedQuantity: number = parseFloat(changedQuantityText);
        const newPercentage = percentage?.trim()?.replace(/%$/, '').trim();
        const newAssertValue = assertvalue?.trim()?.replace(/ BTC$/, '').trim();
        const result = (parseFloat(newPercentage) / 100) * parseFloat(newAssertValue);
        console.log(newPercentage);
        console.log(newAssertValue);
        console.log(changedQuantity);
        if(result == changedQuantity){
            console.log("Add/Clear working")
        }else{
            console.log("Not working")
        }
    }
}