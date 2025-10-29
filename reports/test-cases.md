## Test Case

### Test Case ID: 001

**Test Scenario:** 
Verify that the website opens successfully without any issues  

**Module:** 
Application Launch  

**Preconditions:** 
User has stable internet connection and valid URL  

**Test Data:** 
Website link - https://test1.gotrade.goquant.io  

**Test Steps:**  
1. Open a web browser  
2. Enter the website URL in the address bar  
3. Press Enter  

**Expected Result:** 
The website should load completely without any delay or error messages  

**Actual Result:** 
Website loaded successfully

**Status:** Pass  

**Priority:** High

**Screen records:** [Click](https://drive.google.com/file/d/1vETf-AfXrMFXzg-uN5IXzHMzuaVKbQ_r/view?usp=sharing)  

**Technical Details:** 
The website returned HTTP status code 200 (OK), confirming successful server connectivity  

**Comments:** 
Website launched successfully and displayed all components correctly  

---

### Test Case ID: 002

**Test Scenario:** 
Verify login functionality using both valid and invalid credentials  

**Module:** 
Authentication  

**Preconditions:** 
User must be on the login page  

**Test Data:**  
`Valid` 
Email: user10@goquant.io  
Password: 60Re3G9KvvFl4Ihegxpi  

`Invalid`
Email: user10@goquant.io  
Password: Invalid123@  

**Test Steps:**  
1. Launch the website  
2. Navigate to the Login page  
3. Enter invalid credentials and click Login  
4. Observe the message  
5. Clear the fields  
6. Enter valid credentials and click Login  
7. Observe the result  

**Expected Result:**  
Invalid credentials → Error message should be displayed “Invalid email or password”  
Valid credentials → User should be redirected to the Dashboard or Home page  

**Actual Result:**  
Invalid credentials → Error message displayed correctly  
Valid credentials → User logged in successfully  

**Status:** Pass  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/16bEJAb3-EiqlKTaSfdY8d-zlzs1yyHLA/view?usp=sharing)  

**Technical Details:** 
Network request /auth/login returns HTTP 200 for valid credentials and HTTP 401 (Unauthorized) for invalid ones. No console errors observed. Response payload includes JWT token and user details upon success.

**Comments:** 
Login flow functions as expected for both valid and invalid credentials. Input field validation and error handling are properly implemented.

---

### Test Case ID: 003

**Test Scenario:** 
Verify that when valid login cookies are saved, reopening the website skips both the login page and the start tour popup  

**Module:** 
Authentication  

**Preconditions:** 
1. User has successfully logged in previously
2. Valid session cookies and localStorage tokens are present
3. User has already completed or skiped the start tour once  

**Test Data:**  
`Valid` 
Email: user10@goquant.io  
Password: 60Re3G9KvvFl4Ihegxpi   

**Test Steps:**  
1. Login with valid credentials
2. Verify dashboard loads successfully
3. Skip or complete the start tour
4. Close the browser or tab (without logging out)
5. Reopen the website in the same browser session 

**Expected Result:**  
Website should detect saved session cookies
- Bypass the login page
- Skip the start tour popup and load the main dashboard directly 

**Actual Result:**  
Login page and start tour both skipped; dashboard opened directly 

**Status:** Pass  

**Priority:** Low  

**Screen records:** [Click](https://drive.google.com/file/d/12s47OKxWeBaNCM5XRSQYWzeNf5mgQI0U/view?usp=sharing)  

**Technical Details:** 
Browser retained valid authentication cookies and localStorage tokens (accessToken, refreshToken). On relaunch, initial /auth/session API returned HTTP 200, confirming session validity. No console errors observed.

**Comments:** 
Session persistence works as expected. System correctly bypasses login and onboarding flow when valid session tokens exist..

---

### Test Case ID: 004

**Test Scenario:** 
Verify that user is able to sign out successfully 

**Module:** 
Authentication  

**Preconditions:** 
User logged in successfully 

**Test Data:**  
Valid user session active  

**Test Steps:**  
1. Navigate to the user profile 
2. Click Sign Out button
3. Observe if redirected to login page
4. Try re-accessing the app URL to ensure session is cleared

**Expected Result:**  
User should be logged out successfully, redirected to login page, and session should be cleared 

**Actual Result:**  
User successfully signed out; redirected to login page and session cleared

**Status:** Pass  

**Priority:** Medium  

**Screen records:** [Click](https://drive.google.com/file/d/1uDhfci1tc_mvHCpT5Et96p5fJvMpr9wH/view?usp=sharing)  

**Technical Details:** 
The sign-out API returned status code 200 (OK), confirming that the session token was invalidated and cleared successfully.

**Comments:** 
Sign-out functionality verified and working as expected

---

### Test Case ID: 005

**Test Scenario:** 
Add multiple exchange accounts with API credentials 

**Module:** 
Admin  

**Preconditions:** 
User is logged in and on “Admin” page; valid API credentials available 

**Test Data:**  
- OKX: API Key + Secret
- Binance USDM: API Key + Secret
- Binance CoinM: API Key + Secret 

**Test Steps:**  
1. Click “Add Exchange”
2. Select OKX, enter API key & secret, click Save
3. Select Binance USDM, enter API key & secret, click Save
4. Select Binance CoinM, enter API key & secret, click Save
5. Verify all exchanges appear in connected list

**Expected Result:**  
All exchanges should be added successfully, each showing the status “Connected to the exchange” with no error messages 

**Actual Result:**  
Using the same credentials, account addition sometimes succeeds and sometimes fails with the error “UDP Server Error.”.Previously added accounts show the status “Can’t communicate with exchanges.”

**Status:** Fail  

**Priority:** Critical  

**Screen records:** [Click](https://drive.google.com/file/d/1Zj0Sfntaw2R1i9E2447B7Ia0ANFasS7i/view?usp=sharing)  

**Technical Details:** 
Network calls to /api/exchange/connect/* returned 400 error; console shows connection errors.

**Comments:** 
Likely backend/API issue; devs need to check connectivity or API key validity

---
