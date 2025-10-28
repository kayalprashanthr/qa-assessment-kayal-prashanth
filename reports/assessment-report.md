# GoQuant Test Report

**Application Under Test:** GoQuant – Exchange Management System  
**Test Period:** October 22–27, 2025  
**Tester:** Yal  
**Testing Framework:** Playwright with TypeScript  
**Browsers Tested:** Chromium, Firefox, WebKit  

---

## Executive Summary

This report summarizes the findings from an intensive 5-day manual testing phase focused on assessing the functional stability and user readiness of the core web application. The scope included critical user workflows such as Authentication, Order Placement (GoTrade), Accounts Management, Groups, and the Settings module. Throughout this period, 21 strategic test cases were executed, adopting a concentrated, end-user perspective to validate the reliability of major application interactions and key business scenarios.

The overall assessment indicates significant concerns regarding the application's readiness for a production environment. Only 7 of the 21 executed test cases passed validation, resulting in a high failure rate of 67%. This outcome reveals systemic instability across foundational application components. A total of 14 distinct defects were identified across all severity levels, underscoring the immediate requirement for a focused stabilization effort. Separately, detailed Boundary Validation testing was also successfully conducted, with all findings and specific data points formally recorded for developer review in the accompanying Workbook Reports.

The most concerning discoveries include catastrophic failure in core platform capabilities, with 5 Critical issues identified. These critical defects span key functional areas: the inconsistent ability to add essential external exchange accounts, fundamental failures in trade execution across all major integrated exchanges, and a severe data segregation failure where users view other customers’ private order history. The testing also identified an additional 5 High-Priority concerns, 3 Medium-Priority concerns, and 1 Low-Priority cosmetic issue, highlighting pervasive quality challenges.

The trading platform's core business logic is severely compromised, showing failures where orders are not executed despite the user interface confirming “Order Accepted,” alongside critical communication errors during the API credential setup process. This concentration of critical and high-priority issues demonstrates that the application is not merely buggy, but fundamentally unstable, posing significant risk to user trust and data integrity. Furthermore, while the test environment stability was actively monitored, intermittent connectivity issues (e.g., delayed API responses) were observed, which require further environment-specific troubleshooting.

My primary recommendation is that a production release be deferred until all 5 Critical and 5 High-Priority issues are fully resolved and successfully verified through a formal re-test cycle, focusing on Authentication security and transactional data integrity. Moving forward, I recommend implementing a more robust testing strategy that includes comprehensive Load Testing to evaluate stability under high transaction volume and dedicated Security Audits to protect sensitive user and trading data.  

---

## Testing Methodology

### Testing Approach

I employed a comprehensive risk-based testing strategy that prioritized the most critical user journeys and potential failure points within the core application, specifically targeting components tied to financial transactions and external API communication. This approach was designed to maximize the discovery of high-impact issues while ensuring efficient use of the 5-day testing window. The methodology was structured around three distinct phases, each building upon the previous phase's findings.

The first phase consisted of Smoke Testing, which served as a foundation to verify that core functionalities like user login, module navigation, and basic API connectivity were operational. This phase included fundamental checks to quickly identify any show-stopping issues that would prevent further functional testing.

The second phase involved Comprehensive Functional Testing, where I systematically validated all user workflows and business logic. This phase examined the complete user journey from authentication through order placement, including adding and deleting exchange accounts, order execution, verifying order history, reconciliation data, and wallet transactions. I paid particular attention to state management and the application's behavior under normal operating conditions.

The final phase focused on Edge Case and Boundary Testing. Here, I deliberately stressed the application with scenarios like invalid API keys, attempts to modify accounts with corrupted parameters, and performing rapid, successive actions. This was done to check how the application handled unexpected or rapid user actions that could reveal underlying architectural weaknesses or integration failure points.

### Test Case Selection Rationale and In-Depth Analysis

The selection of the 21 distinct test cases was driven by a thorough risk assessment, considering both high business impact (potential financial loss) and technical complexity (external API reliance). The cases were organized into primary categories addressing specific aspects of application quality.

Authentication and Accounts Management tests were prioritized as the highest risk due to the sensitive nature of external API credentials. I designed cases to validate successful linking and deletion, which immediately revealed the critical API connection inconsistencies and the backend function parameter mismatch when attempting modifications.

Order Execution and Data Integrity received the most comprehensive test coverage, examining execution across all integrated exchanges and the subsequent reflection in Order History. This category proved instrumental in discovering the critical trade failures where the UI confirmed “Order Accepted,” but the execution failed due to UDP Server Errors or subsequent data synchronization issues.

Data Segregation and Reconciliation tests focused on the integrity and security of user data. This validation confirmed the severe data exposure issue where the reconciliation API returned entries belonging to multiple User IDs, indicating a fundamental server-side filtering failure.

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

**CRIT-005: Reconciliation Order History on GoOps.**

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

** HIGH-001: Modify existing exchange account**

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
