import { test } from "@playwright/test";
import { loginPage } from "../../pages/loginPage";
import { invalidLogin } from "../../pages/invalidLogin";

test("Login",async({page}) =>{
    let invalidEmail:string = "user10@goquant.io";
    let invalidPassword:string = "345sdfghj";
    let email:string = "user10@goquant.io";
    let password:string = "60Re3G9KvvFl4Ihegxpi";
    const login = new loginPage(page);
    await login.goToWebsite();
    const invalid = new invalidLogin(page);
    await invalid.invalidSignIn(invalidEmail,invalidPassword);
    await login.signIn(email,password);
    await page.waitForTimeout(5000);  
})