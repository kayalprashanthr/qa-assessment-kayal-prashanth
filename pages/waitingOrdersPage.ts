import{Page,expect} from "@playwright/test";
export class waitingOrdersPage{
    readonly page:Page;
    readonly trading:string;
    readonly goTradePage:string;

    constructor(page:Page){
        this.page = page;
        this.trading = "//span[text()='Trading']";
        this.goTradePage = "//a[@href='/gotrade']";
    }
    async cancelWaitings(){
        await this.page.click(this.trading,{ force: true });
        await this.page.click(this.goTradePage,{ force: true });
        await this.page.click("//button[text()='Working Orders']");
        let nowStatus = await this.page.locator("(//p[text()='In Progress'])[1]").textContent();
        await this.page.click("(//button[text()='Cancel'])[1]");
        await this.page.waitForSelector("//div[text()='Order cancel received']");
        let afterStatus = await this.page.locator("(//p[text()='In Progress'])[1]").textContent();
        if(nowStatus?.trim() == afterStatus?.trim()){ // this works when status changes 
            console.log("Order not Cancelled");
        }else{
            console.log("Order Cancelled")
        }
    } 
}