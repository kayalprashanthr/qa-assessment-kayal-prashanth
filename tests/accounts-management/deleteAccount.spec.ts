import { test, } from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { deleteAccounts } from "../../pages/deleteAccounts";

test.setTimeout(600000);

test("Accounts Delete",async({page})=>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000); 
    const accdel = new deleteAccounts(page);
    await accdel.accDelete();
})