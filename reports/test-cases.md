## Test Case

### Test Case ID: 001

**Test Scenario:** 
Verify that the website opens successfully without any issues  

**Module:** 
Application Launch  

**Preconditions:** 
User has stable internet connection and valid URL  

**Test Data:** 
Website link - `https://test1.gotrade.goquant.io`  

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
Email: `user10@goquant.io`  
Password: 60Re3G9KvvFl4Ihegxpi  

`Invalid`
Email: `user10@goquant.io`  
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

### Test Case ID: 006

**Test Scenario:** 
Verify user is able to modify an existing exchange accounts 

**Module:** 
Admin  

**Preconditions:** 
User logged in at least one exchange account added and visible 

**Test Data:**  
`Exchange Name:` OKX / Binance USDM / Binance CoinM 

**Test Steps:**  
1. Navigate to Accounts → Admin
2. Select an existing connected account
3. Click Modify
4. Update API Key or Secret Key
5. Save the changes

**Expected Result:**  
Account details should be updated successfully, and confirmation message should appear 

**Actual Result:**  
Unable to modify the account; an unclear / non-understandable error popup appears, and changes are not saved

**Status:** Fail  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/18LzzjraBYdKbaeVtA-uY9SD2I2NtXA-r/view?usp=sharing)  

**Technical Details:** 
API returned HTTP 400 (Bad Request) – "delete_credentials() takes from 1 to 2 positional arguments but 3 were given", indicating a backend function parameter mismatch.

**Comments:** 
API-side bug identified. The backend method for deleting credentials is receiving extra arguments. Needs developer fix to handle request parameters properly.

---

### Test Case ID: 007

**Test Scenario:** 
Delete previously added exchange accounts 

**Module:** 
Admin  

**Preconditions:** 
User logged in; at least one exchange account added and visible 

**Test Data:**  
`Exchange Name:` OKX / Binance USDM / Binance CoinM 

**Test Steps:**  
1. Navigate to “Admin” list
2. Select an exchange (e.g., OKX)
3. Click “Delete” button
4. Confirm deletion
5. Repeat for other exchanges if needed
6. Verify exchange is removed from the list

**Expected Result:**  
Selected exchange(s) should be successfully deleted and removed 

**Actual Result:**  
Able to delete exchanges

**Status:** Pass  

**Priority:** Medium  

**Screen records:** [Click](https://drive.google.com/file/d/13V0VXCSdCPIKFYN55aKOyWtxLCfWsTFB/view?usp=sharing)  

**Technical Details:** 
API call DELETE /api/exchange/{id} returned HTTP 200 (OK) confirming successful removal. No backend or console errors observed during operation.

**Comments:** 
Functionality working as expected. Deletion confirmed at both UI and API levels.

---

### Test Case ID: 008

**Test Scenario:** 
Perform trades on GoTrade using OKX with different trade types and symbols 

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; OKX exchange added and connected 

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc.
`Order Types:` Market, Limit, TWAP etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to OKX exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types

**Expected Result:**  
All trades should be executed successfully for different symbols 

**Actual Result:**  
Some trades are not executed even though a pop-up displays “Order Accepted".

**Status:** Fail  

**Priority:** Critical  

**Screen records:** [Click](https://drive.google.com/file/d/1fYUNPs5UwdbLAkxEVaxVUnEHvGnrKylM/view?usp=sharing)  

**Technical Details:** 
All trade API requests returned HTTP 200 (OK) with valid order IDs, confirming successful trade execution and server acknowledgment.

**Comments:** 
Functionality working as expected. Deletion confirmed at both UI and API levels.

---

### Test Case ID: 009

**Test Scenario:** 
Verify OKX trades are displays correctly in Order History 

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; OKX trades placed 

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc.
`Order Types:` Market, Limit, TWAP etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to OKX exchange
3. Place one or more trades (any type) on different symbols
4. Navigate to Order History
5. Check if all OKX trades are visible

**Expected Result:**  
All OKX trades should be displayed in Order History with correct symbol, trade type, quantity, and status. 

**Actual Result:**  
OKX trades are not displayed in Order History.

**Status:** Fail  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/1fYUNPs5UwdbLAkxEVaxVUnEHvGnrKylM/view?usp=sharing)  

**Technical Details:** 
The Order History API intermittently failed to return complete trade data for OKX; some responses lacked symbol or status fields, causing inconsistent display.

**Comments:** 
Trades placed successfully but not reflected consistently in Order History. Backend response needs validation to ensure all OKX trades are captured and displayed.

---

### Test Case ID: 010

**Test Scenario:** 
Perform trades on GoTrade using Binance USD-M with different trade types and symbols 

**Module:** 
GoTrade  

**Preconditions:** 
User logged in Binance USD-M exchange added and connected 

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc.
`Order Types:` Market, Limit, TWAP etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to Binance USD-M exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types

**Expected Result:**  
All trades should be executed successfully for different symbols

**Actual Result:**  
Trades are not executed even though a pop-up displays “Order Accepted,” while others fail with a server error.

**Status:** Fail  

**Priority:** Critical  

**Screen records:** [Click](https://drive.google.com/file/d/1fYUNPs5UwdbLAkxEVaxVUnEHvGnrKylM/view?usp=sharing)  

**Technical Details:** 
The Order History API intermittently failed to return complete trade data for OKX; some responses lacked symbol or status fields, causing inconsistent display.

**Comments:** 
Trades placed successfully but not reflected consistently in Order History. Backend response needs validation to ensure all OKX trades are captured and displayed.

---

### Test Case ID: 011

**Test Scenario:** 
Verify Binance USD-M trades are displayed correctly in Order History 

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; Binance USD-M trades placed 

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc.
`Order Types:` Market, Limit, TWAP etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to Binance USD-M exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types

**Expected Result:**  
All Binance USD-M trades should be displayed in Order History with correct symbol, trade type, quantity, and status

**Actual Result:**  
Binance USD-M trades are not displayed in Order History

**Status:** Fail  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/1e1cfFkKazFQNRh9FKWMCjxwtkk-QMpVk/view?usp=sharing)  

**Technical Details:** 
API call to fetch Order History returned HTTP 400 and response payload did not include recent Binance USD-M trades. No console errors observed — issue likely related to data sync or backend filtering logic.

**Comments:** 
Needs backend validation for trade log persistence or API mapping.

---

### Test Case ID: 012

**Test Scenario:** 
Perform trades on GoTrade using Binance Coin-M with different trade types and symbols

**Module:** 
GoTrade  

**Preconditions:** 
User logged in Binance Coin-M exchange added and connected 

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc.
`Order Types:` Market, Limit, TWAP etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to Binance Coin-M exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types

**Expected Result:**  
All trades should be executed successfully for different symbols

**Actual Result:**  
Trades are not executed even though a pop-up displays “Order Accepted,” while others fail with a server error.

**Status:** Fail  

**Priority:** Critical  

**Screen records:** [Click](https://drive.google.com/file/d/1peHtAkeAQ7k8_aLuh7HYVpNqxWXlGYar/view?usp=sharing)  

**Technical Details:** 
The Order History API intermittently failed to return complete trade data for OKX; some responses lacked symbol or status fields, causing inconsistent display.

**Comments:** 
Trades placed successfully but not reflected consistently in Order History. Backend response needs validation to ensure all OKX trades are captured and displayed.

---

### Test Case ID: 013

**Test Scenario:** 
Verify Binance Coin-M trades are displayed correctly in Order History 

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; Binance Coin-M trades placed successfully

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc.
`Order Types:` Market, Limit, TWAP etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to Binance Coin-M exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types

**Expected Result:**  
All Binance Coin-M trades should be displayed in Order History with correct symbol, trade type, quantity, and status

**Actual Result:**  
Binance Coin-M trades are not displayed in Order History

**Status:** Fail  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/1peHtAkeAQ7k8_aLuh7HYVpNqxWXlGYar/view?usp=sharing)  

**Technical Details:** 
API call to fetch Order History returned HTTP 400 and response payload did not include recent Binance Coin-M trades. No console errors observed — issue likely related to data sync or backend filtering logic.

**Comments:** 
Needs backend validation for trade log persistence or API mapping.

---

### Test Case ID: 014

**Test Scenario:** 
Verify that user can cancel an “In Progress” order from the Waiting Orders section 

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; at least one trade in `In Progress` state under Waiting Orders

**Test Data:**  
-

**Test Steps:**  	
1. Navigate to GoTrade → Waiting Orders
2. Identify an order with status In Progress
3. Click Cancel on that order
4. Verify that the order status updates accordingly

**Expected Result:**  
The selected In Progress order should be cancelled successfully, and its status should change to “Cancelled” or be removed from the list

**Actual Result:**  
Popup appeared showing “Order Cancelled”, but the order status in the list remained In Progress.

**Status:** Fail  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/1NUN3DYyrXkMR56bLe8PaQYGS8WDvG0Gl/view?usp=sharing)  

**Technical Details:** 
Cancel API returned a response with status: "timeout" and message "No response received from UDP server". No HTTP 400 or console errors observed. Indicates backend timeout or network latency in UDP order cancel service.

**Comments:** 
The cancel action triggers a popup but backend response times out, preventing UI status update. Likely UDP communication delay or missing retry logic.

---

### Test Case ID: 015

**Test Scenario:** 
Verify quantity updates correctly when Add/Clear percentage is adjusted in Assets

**Module:** 
GoTrade  

**Preconditions:** 
User logged in. Assets page loaded with available balance

**Test Data:**  
`Asset:` BTC / ETH / USDT etc.

**Test Steps:**  	
1. Navigate to Assets
2. Click Add/Clear button
3. Adjust percentage slider or select predefined percentages (e.g., 25%, 50%, 100%)
4. Observe the Quantity field value

**Expected Result:**  
Quantity should update dynamically based on selected percentage of available balance

**Actual Result:**  
Quantity value updates correctly as per selected percentage

**Status:** Pass  

**Priority:** Medium  

**Screen records:** [Click](https://drive.google.com/file/d/1eDgUrcatbGlOSf9PpTnaEvQ-lXLd_6Xh/view?usp=sharing)  

**Technical Details:** 
No console or network errors observed during manual execution. Dropdown responsiveness is slightly delayed on some attempts — likely a UI rendering or debounce issue.

**Comments:** 
Functionality works correctly in manual testing. However, automation validation is partially limited — dropdown occasionally fails to open on first click, and system-generated input values in the Quantity field cannot be extracted via script for verification. Suggest improving dropdown interaction stability and exposing Quantity value as a readable DOM property for automated tests.

---

### Test Case ID: 016

**Test Scenario:** 
Verify Order Book data is displayed correctly for selected symbol on OKX exchange

**Module:** 
GoTrade  

**Preconditions:** 
User logged in. OKX exchange added and connected

**Test Data:**  
`Symbols:` BTC, ETH, SOL, etc 

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to OKX exchange
3. Select any symbol (e.g., BTC)
4. Observe the Order Book section

**Expected Result:**  
Order Book should display accurate and real-time buy/sell orders for all selected symbols

**Actual Result:**  
Order Book data not displayed for certain symbols; inconsistent data load observed

**Status:** Fail  

**Priority:** Medium  

**Screen records:** [Click](https://drive.google.com/file/d/1Q9Rsw9gly_eVw7sff6IkrpZpLZ9yzMMG/view?usp=sharing)  

**Technical Details:** 
WebSocket connection to OKX Order Book stream intermittently fails — some responses show empty payloads or delayed updates. No HTTP/API errors observed in network logs. Indicates unstable or dropped real-time data feed.

**Comments:** 
Order Book fails to update consistently for specific symbols (e.g., ETH, SOL). Likely issue with WebSocket subscription or data parsing logic.

---

### Test Case ID: 017

**Test Scenario:** 
Verify Order Book data is displayed correctly for selected symbols on Binance USDM exchange

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; Binance USDM exchange added

**Test Data:**  
`Symbols:`  BTC, ETH, SOL, LTC, XRP, etc

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to Binance USDM exchange
3. Select multiple symbols
4. Observe the Order Book for each selected symbol

**Expected Result:**  
Order Book should display accurate and real-time buy/sell orders for all selected symbols

**Actual Result:**  
Order Book data not displayed for certain symbols; inconsistent data load observed

**Status:** Fail  

**Priority:** Medium  

**Screen records:** [Click](https://drive.google.com/file/d/16CD7Me7K825rO62baDRzMdLu99_-TKPb/view?usp=sharing)  

**Technical Details:** 
WebSocket stream for Binance USD-M intermittently fails — no data received or delayed payloads for some symbols. No HTTP or console errors found, suggesting backend data stream instability or dropped feed.

**Comments:** 
Real-time data for certain Binance USD-M symbols (e.g., SOL, XRP) not populating in Order Book. Likely caused by unstable WebSocket subscription or missing data relay from backend.

---

### Test Case ID: 018

**Test Scenario:** 
Verify Order Book data is displayed correctly for selected symbols on Binance CoinM exchange

**Module:** 
GoTrade  

**Preconditions:** 
User logged in; Binance CoinM exchange added

**Test Data:**  
`Symbols:`  BTC, ETH, SOL, LTC, XRP, etc

**Test Steps:**  	
1. Navigate to GoTrade page
2. Switch to Binance CoinM exchange
3. Select multiple symbols
4. Observe the Order Book for each selected symbol

**Expected Result:**  
Order Book should display accurate and real-time buy/sell orders for all selected symbols

**Actual Result:**  
Order Book data not displayed for certain symbols; inconsistent or missing data observed (eg; XLMUSD_PERP, ZILUSD_PERP)

**Status:** Fail  

**Priority:** Medium  

**Screen records:** [Click](https://drive.google.com/file/d/1L_qDUZG-qCqP_F0T7vjfzj0DF5pXTJOW/view?usp=sharing)  

**Technical Details:** 
WebSocket connection to Binance Coin-M Order Book stream intermittently fails. Some payloads return empty or mismatched symbol data. No HTTP/API errors observed, suggesting backend stream or symbol mapping inconsistency.

**Comments:** 
Issue could be due to CoinM symbol mapping or server-side data feed issue

---

### Test Case ID: 019

**Test Scenario:** 
Verify that all exchange accounts added in Admin are displayed under Wallets page in GoOps

**Module:** 
GoOps  

**Preconditions:** 
User logged in. multiple exchanges (OKX, Binance USDM, Binance CoinM) added and connected in Admin

**Test Data:**  
Exchange accounts added in Admin panel

**Test Steps:**  	
1. Navigate to GoOps module
2. Open the Wallets page
3. Verify the list of displayed exchange accounts

**Expected Result:**  
All exchange accounts configured in Admin should be visible under Wallets page

**Actual Result:**  
Wallets page displays all exchange accounts correctly as per Admin configuration

**Status:** Pass  

**Priority:** High  

**Screen records:** [Click](https://drive.google.com/file/d/1rfkv4IdCWg2hc-vQ6_6C5Wi87Z6Eyz76/view?usp=sharing)  

**Technical Details:** 
API call to /wallets/accounts returned HTTP 200 (OK) with valid JSON response matching Admin account data. No console or network errors observed during verification.

**Comments:** 
Functionality working as expected; cross-verified account list with Admin configuration

---

### Test Case ID: 020

**Test Scenario:** 
Verify that the Reconciliation page in GoOps displays the correct Order History for the logged-in user

**Module:** 
GoOps  

**Preconditions:** 
User logged in. trades executed on connected exchanges

**Test Data:**  
Valid trade history (OKX, Binance USDM, Binance CoinM)

**Test Steps:**  	
1. Navigate to GoOps module
2. Open the Reconciliation page
3. Observe the list of displayed order histories
4. Cross-check with user’s actual executed orders

**Expected Result:**  
The Reconciliation page should display only the logged-in user’s order history with correct symbol, type, quantity, and status

**Actual Result:**  
Reconciliation page displays other users’ order history instead of current user’s records

**Status:** Fail  

**Priority:** Critical  

**Screen records:** [Click](https://drive.google.com/file/d/1zLuWjiuQPyFD5B6eUw25WP1rZwVyvkDO/view?usp=sharing)  

**Technical Details:** 
The reconciliation API returned order entries belonging to multiple user IDs; responses contain records not filtered by the current user. No frontend console errors observed—issue appears to be server-side (missing/incorrect user filter or query parameter).

**Comments:** 
Logged-in user’s order history not isolated; data exposure issue observed

---

### Test Case ID: 021

**Test Scenario:** 
Verify that Shortcut Categories in Settings respond correctly to valid and invalid key combinations

**Module:** 
Settings  

**Preconditions:** 
User logged in. Shortcut Categories configured

**Test Data:**  
`Example:`                                           
Valid key: Alt + P
Invalid key: Shift + P

**Test Steps:**  	
1. Navigate to Settings → Shortcut Categories
2. Press Alt + P and observe behavior
3. Press Shift + P and observe behavior

**Expected Result:**  
Only valid shortcut (Alt + P) should redirect to GoOps page; invalid shortcuts should have no action

**Actual Result:**  
Both valid (Alt + P) and invalid (Shift + P) shortcuts redirect to GoOps — incorrect behavior

**Status:** Fail  

**Priority:** Low  

**Screen records:** [Click](https://drive.google.com/file/d/1dA5LjOA7jqs-R2gKXByFJP6bwhHhGWVB/view?usp=sharing)  

**Technical Details:** 
No frontend or network errors observed. Shortcut event listeners not differentiating between valid and invalid key combinations; improper key validation logic in UI script.

**Comments:** 
Shortcut validation missing; frontend should filter invalid key combinations

---