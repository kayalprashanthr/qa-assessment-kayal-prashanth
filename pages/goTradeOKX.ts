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
    async marketEdgeTrade(symbolName:string, longorshort:string){
        console.log("OKX Market Edge Trade");
        console.log("_____________________");
        await this.page.click("//span[text()='Market-Edge']");
        await this.page.click("//button[@data-testid='symbols-dropdown']");
        await this.page.locator("//input[@role='combobox']").pressSequentially(symbolName,{delay:100});
        await this.page.keyboard.press('Enter');
        await this.page.fill("//input[@data-testid='quantity']","5");
        await this.page.fill("//input[@data-testid='duration']","2");
        await this.page.click(`//button[@data-testid='${longorshort}-button']`);
        await this.page.click("//button[@data-testid='trade-button']");
        await this.page.click("//button[text()='Order History']");
        await this.page.waitForTimeout(5000);
        let ordercheck = this.page.locator(`//p[@data-testid='symbol-name'][text()='${symbolName}']`).first();
        if(await ordercheck.isVisible()){
            console.log("Order Placed");
            await this.page.waitForTimeout(4000);
            let marketEdgeOrderStatus = await this.page.locator("//p[@data-testid='order-status']").first().textContent();
            console.log("Order Status: ",marketEdgeOrderStatus);
        }else{
            console.log("Order not Placed");
        }
    }
    async limitEdgeTrade(symbolName:string, longorshort:string){
        console.log("OKX Limit Edge Trade");
        console.log("____________________");
        await this.page.click("//button[@data-testid='GOTRADE_ORDERTYPE_LIMIT_EDGE']");
        await this.page.click("//button[@data-testid='symbols-dropdown']");
        await this.page.locator("//input[@role='combobox']").pressSequentially(symbolName,{delay:100});
        await this.page.keyboard.press('Enter');
        await this.page.fill("//input[@data-testid='quantity']","5");
        await this.page.fill("//input[@data-testid='duration']","2");
        await this.page.click(`//button[@data-testid='${longorshort}-button']`);
        await this.page.click("//button[@data-testid='trade-button']");
        await this.page.click("//button[text()='Order History']");
        await this.page.waitForTimeout(5000);
        let ordercheck = this.page.locator(`//p[@data-testid='symbol-name'][text()='${symbolName}']`).first();
        if(await ordercheck.isVisible()){
            console.log("Order Placed");
            await this.page.waitForTimeout(4000);
            let limitEdgeOrderStatus = await this.page.locator("//p[@data-testid='order-status']").first().textContent();
            console.log("Order Status: ",limitEdgeOrderStatus);
        }else{
            console.log("Order not Placed");
        }
    }
    async TWAPEdgeTrade(symbolName:string, longorshort:string){
        console.log("OKX TWAP Edge Trade");
        console.log("___________________");
        await this.page.click("//button[@data-testid='GOTRADE_ORDERTYPE_TWAP_EDGE']");
        await this.page.click("//button[@data-testid='symbols-dropdown']");
        await this.page.locator("//input[@role='combobox']").pressSequentially(symbolName,{delay:100});
        await this.page.keyboard.press('Enter');
        await this.page.fill("//input[@data-testid='quantity']","5");
        await this.page.fill("//input[@data-testid='duration']","2");
        await this.page.fill("//input[@data-testid='interval']","1");
        await this.page.click(`//button[@data-testid='${longorshort}-button']`);
        await this.page.click("//button[@data-testid='trade-button']");
        await this.page.click("//button[text()='Order History']");
        await this.page.waitForTimeout(5000);
        let ordercheck = this.page.locator(`//p[@data-testid='symbol-name'][text()='${symbolName}']`).first();
        if(await ordercheck.isVisible()){
            console.log("Order Placed");
            await this.page.waitForTimeout(4000);
            let TWAPEdgeOrderStatus = await this.page.locator("//p[@data-testid='order-status']").first().textContent();
            console.log("Order Status: ",TWAPEdgeOrderStatus);
        }else{
            console.log("Order not Placed");
        }
    }
    async marktTrade(symbolName:string, longorshort:string){
        await this.page.click("//div[@data-testid='GOTRADE_ORDERTYPE_MORE']");
        await this.page.click("//div[@data-testid='GOTRADE_ORDERTYPE_MARKET']");
        console.log("OKX Market Trade");
        console.log("________________");
        await this.page.click("//button[@data-testid='symbols-dropdown']");
        await this.page.locator("//input[@role='combobox']").pressSequentially(symbolName,{delay:100});
        await this.page.keyboard.press('Enter');
        await this.page.fill("//input[@data-testid='quantity']","5");
        await this.page.click(`//button[@data-testid='${longorshort}-button']`);
        await this.page.click("//button[@data-testid='trade-button']");
        await this.page.click("//button[text()='Order History']");
        await this.page.waitForTimeout(5000);
        let ordercheck = this.page.locator(`//p[@data-testid='symbol-name'][text()='${symbolName}']`).first();
        if(await ordercheck.isVisible()){
            console.log("Order Placed");
            await this.page.waitForTimeout(4000);
            let marketOrderStatus = await this.page.locator("//p[@data-testid='order-status']").first().textContent();
            console.log("Order Status: ",marketOrderStatus);
        }else{
            console.log("Order not Placed");
        }
    }
}
