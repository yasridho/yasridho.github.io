---
title: "Vulnerability Assessment: Broken Access Control on OWASP Juice Shop"
description: "Technical report on identifying and exploiting broken access control vulnerabilities in OWASP Juice Shop, including payment bypass and IDOR."
pubDate: "Dec 15 2025"
tags: ["vulnerability-assessment", "broken-access-control", "owasp-top-10", "juice-shop", "burp-suite", "web-security"]
heroImage: "/images/BrokenAccessControl/02_Web_View_Juice_Shop.png"
---

# Vulnerability Assessment: Broken Access Control on OWASP Juice Shop

**Target:** OWASP Juice Shop (Heroku)
**Focus:** Broken Access Control (OWASP Top 10: A01:2021)

---

## 1. Executive Summary

This report details the findings of a technical security assessment conducted on the OWASP Juice Shop application. The primary objective was to identify security weaknesses related to **Broken Access Control** and provide actionable remediation recommendations.

The assessment identified multiple critical vulnerabilities that allow an attacker to perform actions beyond their authorized access levels, ranging from manipulating business transactions to accessing other users' private data.

**Key Findings:**
*   **Payment Bypass (Critical):** Business logic flaw allowing orders without valid payment.
*   **Admin Account Takeover (Critical):** Authentication bypass via login request manipulation.
*   **Insecure Direct Object References (High):** Unauthorized access to other users' shopping baskets.
*   **Review Integrity Violation (Medium):** Spoofing user identity in product reviews.

**Business Impact:**
*   **Financial Loss:** Orders processed without valid payment.
*   **Privacy Violation:** Exposure of user shopping data.
*   **Reputation Damage:** Loss of customer trust due to review manipulation.

---

## 2. Methodology

The assessment followed a **Gray Box Testing** methodology using the **OWASP Testing Guide (v4)**.

*   **Information Gathering:** Identifying entry points and authentication mechanisms.
*   **Threat Modeling:** Analyzing business features for potential logic flaws.
*   **Vulnerability Analysis:** Testing input validation and authorization controls.
*   **Exploitation:** Verifying impact through Proof of Concept (PoC) attacks.

---

## 3. Technical Findings & Proof of Concept

### VULN-01: Business Logic Flaw - Payment Bypass

*   **Severity:** **Critical** (CVSS 9.1)
*   **Location:** `/checkout` (Payment Button)

#### Description
The application fails to validate payment status on the backend before processing an order. The security mechanism relies solely on client-side controls (disabling the "Pay" button). An attacker can manipulate the DOM to enable the button and complete an order without providing valid payment information.

#### Proof of Concept (PoC)
1.  Authenticate and add items to the basket. Proceed to Checkout.
2.  Observe the "Pay" button is disabled (grayed out) when no credit card is selected.
3.  Open **Developer Tools (F12)** and inspect the button element.
    ![Inspect Element](/images/BrokenAccessControl/Checkout_Normal_User/03_Inspect_Element.png)
4.  Remove the `disabled` attribute from the `<button>` tag.
    ![Modify HTML](/images/BrokenAccessControl/Checkout_Normal_User/04_Deleted_Disabled_Things_In_Button_Component.png)
5.  Click the now-active button. The order is successfully processed without payment validation.
    ![Order Completed](/images/BrokenAccessControl/Checkout_Normal_User/10_Order_Completion_Page.png)

---

### VULN-02: Admin Account Takeover

*   **Severity:** **Critical** (CVSS 9.8)
*   **Location:** `/rest/user/login`

#### Description
A critical vulnerability allows an attacker to take over the Administrator account without a valid password. This is achieved by manipulating parameters in the login request to bypass standard authentication logic.

#### Proof of Concept (PoC)
1.  Intercept the login request using **Burp Suite**.
    ![Intercept Login](/images/BrokenAccessControl/12_Login_Intercepted_Burpsuite.png)
2.  Modify the `email` parameter in the JSON payload to the administrator's email and manipulate the authentication logic (e.g., via SQL injection payloads).
    ![Manipulate Email](/images/BrokenAccessControl/13_Edit_Email_And_Forward.png)
3.  Forward the request. The application returns an Administrator session token.
    ![Admin Access](/images/BrokenAccessControl/14_Logged_In_As_Admin.png)

---

### VULN-03: Insecure Direct Object References (IDOR) on Shopping Basket

*   **Severity:** **High** (CVSS 6.5)
*   **Location:** `/rest/basket/<BasketId>`

#### Description
The application exposes internal object references (Basket IDs) directly in the API URL without validating ownership. Authenticated users can access the shopping baskets of other users by simply modifying the `BasketId` in the request.

#### Proof of Concept (PoC)
1.  Login to the application.
2.  Capture the request `GET /rest/basket/18` using Burp Suite.
    ![Intercept Basket Request](/images/BrokenAccessControl/17_Intercepted_Basket_Request.png)
3.  Change the ID `18` to `1` (or another valid user ID).
    ![Modify Basket ID](/images/BrokenAccessControl/18_Edit_And_Forward_Get_Request.png)
4.  Forward the request. The application returns the contents of the victim's basket.
    ![Access Victim Basket](/images/BrokenAccessControl/19_Get_Others_Basket_As_Admin.png)

---

### VULN-04: Review Integrity Violation (Spoofing)

*   **Severity:** **Medium** (CVSS 4.3)
*   **Location:** `/api/Feedbacks`

#### Description
The application trusts client-side input for user identity when posting reviews. Attackers can modify the `author` parameter to post reviews that appear to be from other users.

#### Proof of Concept (PoC)
1.  Initiate a new product review and intercept the `POST` request.
    ![Intercept Review](/images/BrokenAccessControl/UserReview/02_Captured_PUT_Request_Burpsuite.png)
2.  Change the `author` value to a different user identity.
    ![Spoof Author](/images/BrokenAccessControl/UserReview/03_Edit_Author_and_Forward.png)
3.  Forward the request. The review is published with the spoofed identity.
    ![Spoofed Review](/images/BrokenAccessControl/UserReview/04_Review_Posted_Successfully.png)

---

## 4. Recommendations

### Remediation Strategies

1.  **Server-Side Validation:** Implement strict backend validation for all business logic. Ensure the order status cannot transition to "Paid" without a confirmed transaction ID from the payment provider.
2.  **Secure Authentication:** Use established authentication frameworks. Sanitize all inputs to prevent injection attacks and enforce Multi-Factor Authentication (MFA) for administrative accounts.
3.  **Object-Level Access Control:** Prevent IDOR by verifying that the `user_id` of the active session matches the `owner_id` of the requested resource.
    ```php
    // Secure Code Example
    if ($basket->owner_id !== $currentUserId) {
        http_response_code(403);
        die("Access Denied");
    }
    ```
4.  **Implicit Identity:** Ignore identity-related parameters (e.g., `author`) sent from the client. Always derive the user's identity from the secure server-side session token.

### Long-Term Strategy
*   Adopt a **Defense in Depth** architecture, moving away from reliance on client-side security controls.
*   Integrate regular automated security scanning and manual code reviews into the development lifecycle.
