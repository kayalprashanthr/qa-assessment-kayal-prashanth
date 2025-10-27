import { test, } from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { addAccounts } from "../../pages/addAccounts";

test.setTimeout(600000);

test("addAccounts",async({page})=>{
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    await login.signIn(email,password);
    await page.waitForTimeout(5000); 
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