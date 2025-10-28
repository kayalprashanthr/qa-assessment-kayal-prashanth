import {Page, test, BrowserContext} from "@playwright/test";
import { cookieLogin } from "../../pages/cookieLogin";
test.use({ storageState : '.auth/sate.json'})

test("Login with cookies",async({page}) =>{
        const login = new cookieLogin(page);
        await login.goToWebsite();
        await login.cookieSignIn();
        await page.waitForTimeout(5000); 
})