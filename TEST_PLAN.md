# Swag Labs (SauceDemo) - Test Plan & Notes

Hi! Here is a summary of the test strategy, what I automated for this assignment, and my notes on risks, edge cases, and assumptions.

---

## 1. Test Cases Automated

I focused on the core user journeys across the application, covering both happy paths and negative validation scenarios:

### A. Authentication & Inventory Loading (`@login`)
- **Negative tests:** Attempting to log in with a locked-out account (`locked_out_user`) and an invalid password for `standard_user`. Verified that the correct error banners are displayed.
- **Positive test:** Logging in with `standard_user`, verifying redirection to `/inventory.html`, and checking that product cards render properly (product name, image, price, and the "Add to cart" button).

### B. Product Sorting (`@inventory`)
- Tested all 4 sorting options:
  - **Name (A to Z)** & **Name (Z to A)**
  - **Price (low to high)** & **Price (high to low)**
- **How it's verified:** Instead of hardcoding expected order, I dynamically extract item names and prices from the DOM, then compare them against an independently sorted copy using JavaScript (`localeCompare` and numeric comparator). This prevents false passes if data changes.

### C. Cart & Checkout Flow (`@checkout`)
- Added multiple products to the cart (`Sauce Labs Backpack` and `Sauce Labs Bike Light`).
- Verified cart contents, removed one item, and verified the cart updated accurately.
- Proceeded to checkout, filled in customer details, and verified the financial calculation: `Item total + Tax = Total` (normalized to 2 decimal places to avoid floating-point math issues).
- Completed checkout and confirmed the "Thank you for your order!" screen.

### D. Email Address Validator (`src/utils/email-validator.ts`)
- Implemented the utility function matching the requirements:
  - Validates `<username>@<domain>.<tld>` format using regex.
  - Rejects spaces and uppercase characters.
  - Tracks duplicates and returns an object with `{ validEmails, invalidEmails, duplicateEmails }`.
- Verified via unit tests in `src/utils/email-validator.spec.ts` using the provided sample dataset.

---

## 2. Additional Tests I Would Cover (Given More Time)

If I had more time to expand this into a full production test suite, I would prioritize:

1. **Session & URL Guards:** Ensure that navigating directly to `/cart.html` or `/checkout-step-one.html` without logging in redirects back to the login page.
2. **Checkout Validation Edge Cases:**
   - Attempting to checkout with an empty cart.
   - Missing fields on the checkout form (e.g. leaving Postal Code or Last Name blank to verify error messages).
3. **Visual Regression:** Adding Playwright snapshot testing (`toHaveScreenshot`) to catch unintended layout or CSS regressions on product cards.
4. **Cross-Browser & Mobile:** Running the suite on WebKit (Safari), Firefox, and mobile viewport presets (e.g. iPhone / Pixel).
5. **Slow Network / Latency Handling:** Testing how the app behaves with the `performance_glitch_user` under simulated network throttling.

---

## 3. Risks & Flaky Areas Noticed

Here are a few potential gotchas I identified and handled in code:

- **Floating-point rounding in totals:** JavaScript's `0.1 + 0.2` quirk can break price total assertions. I extracted raw numbers with regex `/[^0-9.]/g` and compared values using `parseFloat(sum.toFixed(2))`.
- **Selector stability:** Rather than relying on fragile CSS class names that change across builds, I stuck strictly to `data-test` attributes (e.g., `[data-test="inventory-item-name"]`).
- **Secret management:** Avoided hardcoding credentials in test files or feature files. Passwords are pulled securely from `.env` via a centralized config.

---

## 4. Questions & Assumptions Made

### Assumptions:
1. **Catalog state is static:** Assumed the demo site catalog items and prices don't change dynamically mid-session.
2. **Email case sensitivity:** Treated uppercase emails (e.g. `JOHN@test.com`) strictly as invalid, based on the *"Only lowercase allowed"* requirement.
3. **Duplicate handling:** Kept duplicate valid emails in the `validEmails` array (maintaining original order/count) while also listing their unique address in `duplicateEmails`.

### Questions I'd clarify with the team / PM:
1. Should users be allowed to proceed through checkout if their cart is completely empty? (SauceDemo currently allows this).
2. For error messages, do we need to test clicking the `(x)` close button to dismiss the banner, or is verifying display sufficient?
