import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { addAccounts } from "../pages/addAccounts";
import { goTrade } from "../pages/goTrade";

test.describe("Regression", ()=>{
    test.setTimeout(36000);
    let page:Page;
    let context:BrowserContext;
    test.beforeAll(async({browser}) =>{
        context = await browser.newContext();
        page = await context.newPage();
        const getin = new loginPage(page);
        await getin.goToWebsite();
    })
    test("Login",async() =>{
        let email:string = "user10@goquant.io";
        let password:string = "60Re3G9KvvFl4Ihegxpi";
        const login = new loginPage(page);
        await login.signIn(email,password);
        await page.waitForTimeout(5000);
    })
    test.skip("addAccounts",async()=>{
        // OKX
        const Password:string = "Ethishan03$";
        let OKXName:string = "AutomationTestOKX";
        const OKXKey:string = "8aa95d56-a96c-4df1-b8d6-791ee57d1b58";
        const OKXSecret:string = "EB067275097F317095DDAC7F89CBBDB0";
        // Binance USD-M
        let USDMName:string = "AutomationTestUSDM";
        const USDMKey:string = "yPV4io5RORontRvfVklqa7NEfFebzae3CfIW7Vp64mPwO2y6smLmSAxYcZ6cCMb8";
        const USDMSecret:string = "IBPOkRCNSXidSWstIXSHW4UFhIYAsSLS7kiPgiOJE1g2JTrN7jLba4CMJmboo2MY";
        // Binance Coin-M
        let CoinMName:string = "AutomationTestCoinM";
        const CoinMKey:string = "yPV4io5RORontRvfVklqa7NEfFebzae3CfIW7Vp64mPwO2y6smLmSAxYcZ6cCMb8";
        const CoinMSecret:string = "IBPOkRCNSXidSWstIXSHW4UFhIYAsSLS7kiPgiOJE1g2JTrN7jLba4CMJmboo2MY";
        const acc = new addAccounts(page);
        await acc.addAccOKX(Password, OKXName, OKXKey, OKXSecret);
        await acc.addAccUSDM(USDMName, USDMKey, USDMSecret);
        await acc.addAccCoinM(CoinMName, CoinMKey, CoinMSecret);
    })
    test("Place Trade Order in OKX",async()=>{
        let symbolName:string = "DOT-USDT"
        const order = new goTrade(page);
        await order.placeTrade();
        await order.marketEdgeTrade(symbolName);
        await page.pause();
    })
})
