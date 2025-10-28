import {Page, test, BrowserContext} from "@playwright/test";
import { loginPage } from "../../pages/loginPage";

test("Login",async({page,context}) =>{
        let email:string = "user10@goquant.io";
        let password:string = "60Re3G9KvvFl4Ihegxpi";
        const login = new loginPage(page);
        await login.goToWebsite();
        await login.signIn(email,password);
        await page.waitForTimeout(5000); 
        await context.storageState({ path: '.auth/sate.json' }); 
})