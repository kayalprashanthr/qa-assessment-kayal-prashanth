import { test, } from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { addAccounts } from "../../pages/addAccounts";
import { accountModify } from "../../pages/accountModify";

test.setTimeout(600000);

test("Accounts Modify",async({page})=>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000); 
    // Account Modify
    const accMod = new accountModify(page);
    await accMod.accModify();
})