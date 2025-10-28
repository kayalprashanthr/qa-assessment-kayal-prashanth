import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { assertsPage } from "../../pages/assertsPage";

test.setTimeout(600000);

test("Cancel waiting order",async({page}) =>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000);
    let percentage: string = "90 %";
    const assert = new assertsPage(page);
    await assert.checkAsserts(percentage);
})