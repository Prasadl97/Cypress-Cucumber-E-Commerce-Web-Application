# Magento Demo UI – MCP Exploration Findings

Captured via **cursor-ide-browser** MCP. Use these for Playwright selectors in page objects (prefer role/label over refs; refs are session-specific).

## URLs

| Page            | URL                                              |
|-----------------|--------------------------------------------------|
| Home            | `https://magento2-demo.magebit.com/`             |
| Create Account  | `https://magento2-demo.magebit.com/customer/account/create/` |
| Customer Login  | `https://magento2-demo.magebit.com/customer/account/login/`  |
| My Account      | `https://magento2-demo.magebit.com/customer/account/`       |

---

## Home Page

- **Create an Account**: `getByRole('link', { name: 'Create an Account' })`
- **Sign In**: `getByRole('link', { name: 'Sign In' })`

---

## Create Account (`/customer/account/create/`)

- **First Name**: `getByRole('textbox', { name: 'First Name' })`
- **Last Name**: `getByRole('textbox', { name: 'Last Name' })`
- **Sign Up for Newsletter**: `getByRole('checkbox', { name: 'Sign Up for Newsletter' })`
- **Email**: `getByRole('textbox', { name: 'Email' })`
- **Password**: `getByRole('textbox', { name: 'Password' })`
- **Confirm Password**: `getByRole('textbox', { name: 'Confirm Password' })`
- **Submit**: `getByRole('button', { name: 'Create an Account' })`

Success: redirect to `/customer/account/` and title "My Account".

---

## Customer Login (`/customer/account/login/`)

- **Email**: `getByRole('textbox', { name: 'Email' })`
- **Password**: `getByRole('textbox', { name: 'Password' })`
- **Sign In**: `getByRole('button', { name: 'Sign In' })`
- **Forgot Your Password?**: `getByRole('link', { name: 'Forgot Your Password?' })`

Success: redirect to `/customer/account/`.

---

## My Account / Dashboard (`/customer/account/`)

- **Heading**: `getByRole('heading', { name: 'My Account', level: 1 })`
- **User info**: page contains "Welcome, Test User!" and email (e.g. "Test User testuser9847@example.com")
- **Logout**: expand dropdown then click Sign Out:
  - Dropdown trigger: `getByRole('button', { name: 'Change' }).first()`
  - **Sign Out**: `getByRole('link', { name: 'Sign Out' })` (visible after expanding dropdown)

Other dashboard elements: "My Orders", "Account Information", "My Wish List", "Address Book".

---

## Flow verified via MCP

1. Home → Create Account → fill form (dynamic email e.g. `testuser9847@example.com`, password `TestPass123!`) → Create an Account → **My Account**.
2. On My Account → click "Change" → click "Sign Out" → home/login.
3. Navigate to Login → fill Email + Password → Sign In → **My Account**.

Use these selectors in `src/pages/*.ts` (Playwright `page.getByRole(...)`) for the Cucumber step definitions.
