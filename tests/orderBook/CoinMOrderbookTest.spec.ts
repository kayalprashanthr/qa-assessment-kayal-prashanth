import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { CoinMOrderbook } from "../../pages/CoinMOrderbook";

test.setTimeout(600000);
test("Place Trade Order in OKX",async({page})=>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000);
    const check = new CoinMOrderbook(page);;
    await check.selectTradeAcc();
    await check.checkEachOrderBook();
})