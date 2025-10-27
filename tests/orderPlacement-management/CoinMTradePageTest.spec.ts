import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { goTradeCoinM } from "../../pages/goTradeCoinM";

test.setTimeout(600000);
test("Place Trade Order in CoinM",async({page})=>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000); 
    const randomSymbols: string[] = ['LINKUSD_PERP', 'ETCUSD_PERP', 'SOLUSD_PERP', 'XLMUSD_PERP', 'THETAUSD_PERP', 'LICUSD_PERP'];
    const randombet: string[] = ['long', 'short']; // To be small case
    const symbolName = randomSymbols.sort(() => 0.5 - Math.random());
    const longorshort = [...Array(6)].map(() => randombet[Math.random() < 0.5 ? 0 : 1]);
    const order = new goTradeCoinM(page);
    await order.placeTrade();
    await order.marketEdgeTrade(symbolName[0],longorshort[0]);
    await order.limitEdgeTrade(symbolName[1],longorshort[1]);
    await order.TWAPEdgeTrade(symbolName[2],longorshort[2]);
    await order.marktTrade(symbolName[3],longorshort[3]);
    await order.limitTrade(symbolName[4],longorshort[4]);
    await order.TWAPTrade(symbolName[5],longorshort[5]);
    //await page.pause();
})