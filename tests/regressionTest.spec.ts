import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { addAccounts } from "../pages/addAccounts";
import { goTradeOKX } from "../pages/goTradeOKX";
import { goTradeUSDM } from "../pages/goTradeUSDM";

test.describe("Regression", ()=>{
    test.setTimeout(360000);
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
        const USDMKey:string = "fnSrifSofyjR24ybGLIkXm5ETuy9ftDqGPObdUOoxmoKY9dd4TCJrnnNgPxcHt23";
        const USDMSecret:string = "4hBoEvE1SHgfR9GTmF0df7y4wKfqTTET2B2MOmMzWoFTXwz1d8rbDvEAVGhboKkJ";
        // Binance Coin-M
        let CoinMName:string = "AutomationTestCoinM";
        const CoinMKey:string = "fnSrifSofyjR24ybGLIkXm5ETuy9ftDqGPObdUOoxmoKY9dd4TCJrnnNgPxcHt23";
        const CoinMSecret:string = "4hBoEvE1SHgfR9GTmF0df7y4wKfqTTET2B2MOmMzWoFTXwz1d8rbDvEAVGhboKkJ";
        const acc = new addAccounts(page);
        await acc.addAccOKX(Password, OKXName, OKXKey, OKXSecret);
        await acc.addAccUSDM(USDMName, USDMKey, USDMSecret);
        await acc.addAccCoinM(CoinMName, CoinMKey, CoinMSecret);
        await page.pause();
    })
    test.skip("Place Trade Order in OKX",async()=>{
        const randomSymbols: string[] = ['XRP-USDT', 'PI-BRL', 'DOT-USDT', 'SOL-EUR', 'PEPE-BRL', 'BNB-USDT'];
        const randombet: string[] = ['long', 'short']; // To be small case
        const symbolName = randomSymbols.sort(() => 0.5 - Math.random());
        const longorshort = [...Array(6)].map(() => randombet[Math.random() < 0.5 ? 0 : 1]);

        const order = new goTradeOKX(page);
        await order.placeTrade();
        await order.marketEdgeTrade(symbolName[0],longorshort[0]);
        await order.limitEdgeTrade(symbolName[1],longorshort[1]);
        await order.TWAPEdgeTrade(symbolName[2],longorshort[2]);
        await order.marktTrade(symbolName[3],longorshort[3]);
        await order.limitTrade(symbolName[4],longorshort[4]);
        await order.TWAPTrade(symbolName[5],longorshort[5]);
        //await page.pause();
    })
    test("Place Trade Order in USDM",async()=>{
        const randomSymbols: string[] = ['XRPUSDT', 'BCHUSDC', 'DASHUSDT', 'TRXUSDT', 'XMRUSDT', 'XTZUSDT'];
        const randombet: string[] = ['long', 'short']; // To be small case
        const symbolName = randomSymbols.sort(() => 0.5 - Math.random());
        const longorshort = [...Array(6)].map(() => randombet[Math.random() < 0.5 ? 0 : 1]);

        const order = new goTradeUSDM(page);
        await order.placeTrade();
        await order.marketEdgeTrade(symbolName[0],longorshort[0]);
        await order.limitEdgeTrade(symbolName[1],longorshort[1]);
        await order.TWAPEdgeTrade(symbolName[2],longorshort[2]);
        await order.marktTrade(symbolName[3],longorshort[3]);
        await order.limitTrade(symbolName[4],longorshort[4]);
        await order.TWAPTrade(symbolName[5],longorshort[5]);
        //await page.pause();
    })
})
