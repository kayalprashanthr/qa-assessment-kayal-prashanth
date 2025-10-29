# GoQuant Test Report

**Application Under Test:** GoQuant – Exchange Management System  
**Test Period:** October 22–27, 2025  
**Tester:** Kayal Prashanth R  
**Testing Framework:** Playwright with TypeScript  
**Browsers Tested:** Chromium, Firefox, WebKit  

---

## Executive Summary

This report summarizes the findings from an intensive 5-day manual testing phase focused on assessing the functional stability and user readiness of the core web application. The scope included critical user workflows such as Authentication, Order Placement, Accounts Management, GoOps, and the Settings module. Throughout this period, 21 strategic test cases were executed, adopting a concentrated, end-user perspective to validate the reliability of major application interactions and key business scenarios.

The overall assessment indicates significant concerns regarding the application's readiness for a production environment. Only 7 of the 21 executed test cases passed validation, resulting in a high failure rate of 67%. This outcome reveals systemic instability across foundational application components. A total of 14 distinct defects were identified across all severity levels, underscoring the immediate requirement for a focused stabilization effort. Separately, detailed Boundary Validation testing was also successfully conducted, with all findings and specific data points formally recorded for developer review in the accompanying Workbook Reports.

The most concerning discoveries include catastrophic failure in core platform capabilities, with 5 Critical issues identified. These critical defects span key functional areas: the inconsistent ability to add essential external exchange accounts, fundamental failures in trade execution across all major integrated exchanges, and a severe data segregation failure where users view other customers’ private order history. The testing also identified an additional 5 High-Priority concerns, 3 Medium-Priority concerns, and 1 Low-Priority cosmetic issue, highlighting pervasive quality challenges.

The trading platform's core business logic is severely compromised, showing failures where orders are not executed despite the user interface confirming Order Accepted alongside critical communication errors during the API credential setup process. This concentration of critical and high-priority issues demonstrates that the application is not merely buggy, but fundamentally unstable, posing significant risk to user trust and data integrity. Furthermore, while the test environment stability was actively monitored, intermittent connectivity issues (e.g., delayed API responses) were observed, which require further environment-specific troubleshooting.

My primary recommendation is that a production release be deferred until all 5 Critical and 5 High-Priority issues are fully resolved and successfully verified through a formal re-test cycle, focusing on Authentication security and transactional data integrity. Moving forward, I recommend implementing a more robust testing strategy that includes comprehensive Load Testing to evaluate stability under high transaction volume and dedicated Security Audits to protect sensitive user and trading data.  

---

## Testing Methodology

### Testing Approach

I employed a comprehensive risk-based testing strategy that prioritized the most critical user journeys and potential failure points within the core application, specifically targeting components tied to financial transactions and external API communication. This approach was designed to maximize the discovery of high-impact issues while ensuring efficient use of the 5-day testing window. The methodology was structured around three distinct phases, each building upon the previous phase's findings.

The first phase consisted of Smoke Testing, which served as a foundation to verify that core functionalities like user login, module navigation, and basic API connectivity were operational. This phase included fundamental checks to quickly identify any show-stopping issues that would prevent further functional testing.

The second phase involved Comprehensive Functional Testing, where I systematically validated all user workflows and business logic. This phase examined the complete user journey from authentication through order placement, including adding and deleting exchange accounts, order execution, verifying order history, reconciliation data, and wallet transactions. I paid particular attention to state management and the application's behavior under normal operating conditions.

The final phase focused on Edge Case and Boundary Testing. Here, I deliberately stressed the application with scenarios like invalid API keys, attempts to modify accounts with corrupted parameters, and performing rapid, successive actions. This was done to check how the application handled unexpected or rapid user actions that could reveal underlying architectural weaknesses or integration failure points.

### Test Case Selection Rationale and In-Depth Analysis

The selection of the 21 distinct test cases was driven by a thorough risk assessment, prioritizing functions related to financial transactions and external API integration. The cases were strategically grouped into the following refined categories to maximize issue discovery:

**Authentication and Session Management Test Cases (4 tests):** These tests were foundational, verifying secure user access before proceeding to transactional flows. I designed test cases to validate not only successful authentication and secure sign-out flows but also to probe for correct session handling across browser launches. The tests included scenarios for initial site launch, valid/invalid credential checks, session persistence, and proper session clearance upon sign-out. All critical login and session flows passed successfully, confirming the application's basic security foundation is operational.

**External Accounts and Admin Management Test Cases (3 tests):** This category was prioritized as the highest technical and business risk, as it involves handling sensitive external API keys and managing the primary connection to the trading exchanges. The tests examined the complete CRUD lifecycle for exchange accounts (Add, Modify, Delete). This category proved immediately valuable by revealing critical API connection instabilities when adding accounts (failing with "UDP Server Error") and exposing a severe backend function parameter mismatch when attempting account modifications, indicating a fundamental architectural flaw in the account management service.

**Core Order Execution and Transaction Integrity Test Cases (8 tests):** As the primary financial functionality, Core Order Execution received the most comprehensive test coverage. These tests systematically examined trade placement, order cancellation, history logging, and pre-trade quantity calculation across all three integrated exchanges. The testing here was paramount in discovering the most critical defects: multiple instances of silent order execution failure (UI confirmed "Order Accepted," but the trade did not execute), persistent data synchronization issues where confirmed trades were missing from Order History, and a high-severity backend UDP timeout issue when attempting to cancel an "In Progress" order.

**Real-Time Data Feed Integrity Test Cases (3 tests):** These tests focused on the stability of the application's dynamic and real-time features, specifically the live market data feeds critical for trading. The tests validated the continuous streaming of real-time Order Book data across different exchanges and symbols. The Order Book tests were invaluable in identifying unstable WebSocket connections and inconsistent data loading, where the order books frequently showed missing or delayed information for various symbols, directly impacting the user's ability to make timely trading decisions.

**GoOps Data Validation and Segregation Test Cases (2 tests):** These two highly critical tests focused on end-to-end data integrity and security within the GoOps module. The tests included validating the synchronization of exchange accounts from the Admin setup to the Wallets page, and, crucially, checking data isolation in the Reconciliation module. This validation confirmed the discovery of the most severe bug: a critical data exposure issue in the Reconciliation API, which returned order history belonging to multiple User IDs. This finding confirmed a fundamental, non-negotiable failure of server-side data security.

**User Experience (UX) and Accessibility Test Cases (1 test):** This specific test focused on the quality and usability of frontend controls, particularly system-wide keyboard shortcuts defined in the Settings module. The test exposed a minor but important defect where the application's shortcut logic was faulty, failing to differentiate between valid and invalid key combinations and improperly triggering navigation for keys that should have been ignored.

### Tools and Techniques Employed

The foundation of the testing was a Black Box Manual Testing approach to accurately replicate genuine user interaction across all target environments. For detailed observation and technical logging, I actively leveraged Browser Developer Tools, specifically the Console and Network tabs, on a continuous basis. This method allowed for the capture of crucial technical evidence, including specific HTTP error codes, the raw API response payloads, and WebSocket stream failures for the Order Book.

The overall test design and documentation utilized principles from modern automation practices, including TypeScript, Playwright, and the Page Object Model structure. This knowledge ensured that all manual steps were organized, repeatable, and easily translatable for future automation efforts. All technical evidence, screen recordings, and defect commentary were meticulously aggregated in the accompanying Workbook Reports.

### Challenges Encountered and Solutions Implemented

Throughout the testing process, I encountered several technical challenges that required focused investigation and demonstrated the complexity of testing modern web applications and external integrations.

A major constraint was the infeasibility of comprehensive cross-device testing due to severe instability in the User Interface (UI). Specifically, environments like Firefox exhibited significantly slower performance and often rendered certain elements unclickable, preventing test completion and requiring explicit technical mitigation. Dynamic content loading was also challenging due to occasional page loads exceeding 36 seconds, which exceeded standard timeout protocols. These issues were mitigated by implementing aggressive interaction settings and leveraging explicit wait conditions for selectors and visual confirmation of elements before proceeding. Additionally, confirming the data segregation failure without backend access was critical. I addressed this by cross-referencing the displayed data in the Reconciliation UI with the raw API response in the Network tab, confirming the server-side failure.

---

## Detailed Findings

### Critical Issues

**CRIT-001: Add multiple exchange accounts with API credentials**

**Severity:** Critical  
**Browser:** All  
**Description:** Adding an account is inconsistent — sometimes it succeeds, sometimes it throws an error.

**Steps to Reproduce:**  
1. Log in and go to **Admin → Add Exchange**  
2. Add **OKX** with valid API key and secret  
3. Repeat for **Binance USDM** and **Binance CoinM**  
4. Observe whether each account is added successfully  

**Expected Behavior:**  
All exchanges should be added successfully, each showing the status “Connected to the exchange” with no error messages.  

**Actual Behavior:**  
Using the same credentials, account addition sometimes succeeds and sometimes fails with the error “UDP Server Error.”.Previously added accounts show the status “Can’t communicate with exchanges.”

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1Zj0Sfntaw2R1i9E2447B7Ia0ANFasS7i/view?usp=sharing)

**CRIT-002: Trade on GoTrade using Binance USD-M.**

**Severity:** Critical  
**Browser:** All  
**Description:** Perform trades on GoTrade using Binance USD-M with different trade types and symbols.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to Binance USD-M exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types 

**Expected Behavior:**  
All trades should be executed successfully for different symbols.  

**Actual Behavior:**  
Trades are not executed even though a pop-up displays “Order Accepted,” while others fail with a server error.

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1e1cfFkKazFQNRh9FKWMCjxwtkk-QMpVk/view?usp=sharing)

**CRIT-003: Trade on GoTrade using Binance Coin-M.**

**Severity:** Critical  
**Browser:** All  
**Description:** Perform trades on GoTrade using Binance Coin-M with different trade types and symbols.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to Binance Coin-M exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types 

**Expected Behavior:**  
All trades should be executed successfully for different symbols.  

**Actual Behavior:**  
Trades are not executed even though a pop-up displays “Order Accepted".

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1peHtAkeAQ7k8_aLuh7HYVpNqxWXlGYar/view?usp=sharing)

**CRIT-004: Trade on GoTrade using OKX.**

**Severity:** Critical  
**Browser:** All  
**Description:** Perform trades on GoTrade using OKX with different trade types and symbols.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to OKX exchange
3. Select a symbol (e.g., BTC)
4. Place a Market Edge trade
5. Repeat steps with other symbols and trade types 

**Expected Behavior:**  
All trades should be executed successfully for different symbols.  

**Actual Behavior:**  
Trades are not executed even though a pop-up displays “Order Accepted".

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1fYUNPs5UwdbLAkxEVaxVUnEHvGnrKylM/view?usp=sharing)

**CRIT-005: Reconciliation Order History on GoOps**

**Severity:** Critical  
**Browser:** All  
**Description:** Reconciliation page shows the correct Order History for the logged-in user.

**Steps to Reproduce:**  
1. Navigate to GoOps module
2. Open the Reconciliation page
3. Observe the list of displayed order histories
4. Cross-check with user’s actual executed order

**Expected Behavior:**  
The Reconciliation page should display only the logged-in user’s order history with correct symbol, type, quantity, and status  

**Actual Behavior:**  
Reconciliation page displays other user order history instead of current user’s records.

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1zLuWjiuQPyFD5B6eUw25WP1rZwVyvkDO/view?usp=sharing)

### High Priority Issues

**HIGH-001: Modify existing exchange account**

**Severity:** High  
**Browser:** All  
**Description:** User can modify API secrets of an existing exchange account.

**Steps to Reproduce:**  
1. Navigate to Accounts → Admin
2. Select an existing connected account
3. Click Modify
4. Update API Secret Key
5. Save the changes

**Expected Behavior:**  
All trades should be executed successfully for different symbols.  

**Actual Behavior:**  
Trades are not executed even though a pop-up displays “Order Accepted".

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1fYUNPs5UwdbLAkxEVaxVUnEHvGnrKylM/view?usp=sharing)

**HIGH-002: View OKX trades in Order History**

**Severity:** High  
**Browser:** All 
**Description:**  OKX trades are displays in Order History.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to OKX exchange
3. Place one or more trades (any type) on different symbols
4. Navigate to Order History
5. Check if all OKX trades are visible

**Expected Behavior:**  
All OKX trades should be displayed in Order History with correct symbol, trade type, quantity, and status.  

**Actual Behavior:**  
OKX trades are not displayed in Order History.

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1fYUNPs5UwdbLAkxEVaxVUnEHvGnrKylM/view?usp=sharing)

**HIGH-003: View Binance USD-M trades in Order History**

**Severity:** High  
**Browser:** All 
**Description:**  Binance USD-M trades are displays in Order History.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to Binance USD-M exchange
3. Place one or more trades (any type) on different symbols
4. Navigate to Order History
5. Check if all Binance USD-M trades are visible

**Expected Behavior:**  
All Binance USD-M trades should be displayed in Order History with correct symbol, trade type, quantity, and status.  

**Actual Behavior:**  
Binance USD-M trades are not displayed in Order History.

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1e1cfFkKazFQNRh9FKWMCjxwtkk-QMpVk/view?usp=sharing)

**HIGH-004: View Binance Coin-M trades in Order History**

**Severity:** High  
**Browser:** All 
**Description:**  Binance Coin-M trades are displays in Order History.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to Binance Coin-M exchange
3. Place one or more trades (any type) on different symbols
4. Navigate to Order History
5. Check if all Binance Coin-M trades are visible

**Expected Behavior:**  
All Binance Coin-M trades should be displayed in Order History with correct symbol, trade type, quantity, and status.  

**Actual Behavior:**  
Binance Coin-M trades are not displayed in Order History.

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1peHtAkeAQ7k8_aLuh7HYVpNqxWXlGYar/view?usp=sharing)

**HIGH-005: Cancel `In Progress` order from Waiting Orders**

**Severity:** High  
**Browser:** All 
**Description:**  User can cancel an `In Progress` order from the Waiting Orders.

**Steps to Reproduce:**  
1. Navigate to GoTrade → Waiting Orders
2. Identify an order with status In Progress
3. Click Cancel on that order
4. Verify that the order status updates accordingly

**Expected Behavior:**  
`In Progress` order should be cancelled successfully, and its status should change to “Cancelled” or be removed from the list  

**Actual Behavior:**  
Popup appeared showing “Order Cancelled”, but the order status in the list remained In Progress

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1NUN3DYyrXkMR56bLe8PaQYGS8WDvG0Gl/view?usp=sharing)

### Medium Priority Issues

**MED-001: Check Order Book for selected OKX symbol**

**Severity:** High  
**Browser:** All 
**Description:**  Order Book data is displayed for the selected symbol on OKX exchange.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to OKX exchange
3. Select multiple symbols
4. Observe the Order Book for each selected symbol

**Expected Behavior:**  
Order Book should display accurate and real-time buy/sell orders for all selected symbols 

**Actual Behavior:**  
Order Book data not displayed for certain symbols; inconsistent data load observed

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1Q9Rsw9gly_eVw7sff6IkrpZpLZ9yzMMG/view?usp=sharing)

**MED-002: Check Order Book for selected Binance USDM symbol**

**Severity:** High  
**Browser:** All 
**Description:**  Order Book data is displayed for the selected symbol on Binance USDM exchange.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to Binance USDM exchange
3. Select multiple symbols
4. Observe the Order Book for each selected symbol

**Expected Behavior:**  
Order Book should display accurate and real-time buy/sell orders for all selected symbols 

**Actual Behavior:**  
Order Book data not displayed for certain symbols; inconsistent data load observed

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/16CD7Me7K825rO62baDRzMdLu99_-TKPb/view?usp=sharing)

**MED-003: Check Order Book for selected Binance Coin-M symbol**

**Severity:** High  
**Browser:** All 
**Description:**  Order Book data is displayed for the selected symbol on Binance Coin-M exchange.

**Steps to Reproduce:**  
1. Navigate to GoTrade page
2. Switch to Binance Coin-M exchange
3. Select multiple symbols
4. Observe the Order Book for each selected symbol

**Expected Behavior:**  
Order Book should display accurate and real-time buy/sell orders for all selected symbols 

**Actual Behavior:**  
Order Book data not displayed for certain symbols; inconsistent data load observed

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1L_qDUZG-qCqP_F0T7vjfzj0DF5pXTJOW/view?usp=sharing)

###  Low Priority Issues

**LOW-001: Test Shortcut Categories with valid and invalid keys**

**Severity:** Low  
**Browser:** All 
**Description:**  Shortcut Categories in Settings respond correctly to valid and invalid key combinations.

**Steps to Reproduce:**  
1. Navigate to Settings → Shortcut Categories
2. Press Alt + P and observe behavior
3. Press Shift + P and observe behavior

**Expected Behavior:**  
Only valid shortcut (Alt + P) should redirect to GoOps page; invalid shortcuts should have no action.

**Actual Behavior:**  
Both valid (Alt + P) and invalid (Shift + P) shortcuts redirect to GoOps.

**Evidence:**  
[Screen Recording](https://drive.google.com/file/d/1dA5LjOA7jqs-R2gKXByFJP6bwhHhGWVB/view?usp=sharing)

---

