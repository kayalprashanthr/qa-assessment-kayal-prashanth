import { test, } from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { settingsPage } from "../../pages/settingsPage";

test.setTimeout(600000);

test("Settings Shortcut",async({page})=>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000);
    const set = new settingsPage(page);
    await set.keybordActios();
})