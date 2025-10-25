import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { waitingOrdersPage } from "../../pages/waitingOrdersPage";

test.setTimeout(600000);
let context: BrowserContext;
let page: Page;

test("Cancel waiting order",async({browser}) =>{
    context = await browser.newContext();     
    page = await context.newPage(); 
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000);
    const cancel = new waitingOrdersPage(page);
    await cancel.cancelWaitings();  
})
