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
Valid  
Email: user10@goquant.io  
Password: 60Re3G9KvvFl4Ihegxpi  

Invalid  
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
