import { Page, expect } from "@playwright/test";
export class accountModify{
    readonly page:Page;
    readonly accounts:string;
    readonly admin:string;

    constructor(page:Page){
        this.page = page;
        this.accounts = "//span[text()='Accounts']";
        this.admin = "//a[@href='/admin']";
    }
    async accModify(){
        await this.page.click(this.accounts);
        await this.page.click(this.admin);
        let account = await this.page.locator("//tr[@data-testid='venues-table-row-0']//div[@class='flex flex-row items-center']").textContent();
        let invalidKey:string = "bEpQXXEIkvA5LUX6ahghEv3t0M5";
        let key:string;
        if(account?.trim()=="Binance COIN-M"){
            key = "bEpQXXvnPwHKhdCpSDEIkvA5LUX6KviX4lQJMAasc0ed4XyV5Q7XCME1ZEv3t0M4";
        }else if(account?.trim()=="Binance USDⓈ-M"){
            key = "bEpQXXvnPwHKhdCpSDEIkvA5LUX6KviX4lQJMAasc0ed4XyV5Q7XCME1ZEv3t0M4"
        }else{
            key = "F7089460CD15CE4FCC7C1EA2FA9E800C";
        }
        await this.page.click("//tr[@data-testid='venues-table-row-0']//button[text()='Modify']");
        await this.page.fill("//input[@placeholder='Enter your Binance COIN-M secret key']",invalidKey);
        await this.page.click("//button[text()='Edit Account']");
        await this.page.click("//span[text()='Close']");
        let errorStatusPopup = await this.page.locator("//div[@class='text-[0.7rem] font-medium']").textContent();
        await this.page.click("//tr[@data-testid='venues-table-row-0']//button[text()='Modify']");
        await this.page.fill("//input[@placeholder='Enter your Binance COIN-M secret key']",key);
        await this.page.click("//button[text()='Edit Account']");
        await this.page.click("//span[text()='Close']");
        let modifyStatusPopup = await this.page.locator("//div[@class='text-[0.7rem] font-medium']").textContent();
        if(errorStatusPopup?.trim()==modifyStatusPopup?.trim()){
            console.log("Unable to modify Accounts");
        }else{
            console.log("No error in modify");
        }
    }
}