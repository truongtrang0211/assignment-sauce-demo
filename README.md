# 🛒 Swag Labs (SauceDemo) - Playwright BDD Test Automation Framework

This repository contains an enterprise-grade End-to-End (E2E) Test Automation Framework built with **Playwright**, **TypeScript**, and **Playwright-BDD** (Gherkin syntax) targeting the [SauceDemo](https://www.saucedemo.com) e-commerce web application.

---

## 🏗️ Architecture & Key Highlights

- **BDD & Gherkin Specifications:** Clean, declarative business scenarios organized under `src/features/`.
- **Modern Page Object Model (POM):** Encapsulated locators and user actions under `src/pages/` with an abstract `BasePage` and a shared `HeaderPage`.
- **Playwright Fixtures (`test.extend`):** Pure dependency injection providing isolated browser contexts and clean Page Objects per scenario.
- **Resilient Locators:** Strict adherence to official `[data-test="..."]` attributes eliminating flaky tests.
- **Dynamic Sort Assertions:** Complete array extraction and validation against independently sorted JavaScript references (Name & Price).
- **Clean Separation of Concerns:**
  - `src/constants/`: Centralized system invariants (`error-messages.ts`, `sort-options.ts`, `success-messages.ts`).
  - `src/data/`: Sanitized test data payloads (`users.json`, `checkout-data.json`).
  - `src/core/`: Configuration loading with secure `.env` support.
  - `src/steps/shared/common.steps.ts`: Reusable global background & navigation steps.
- **Standalone Email Validator:** Robust TypeScript utility enforcing strict `<username>@<domain>.<tld>` regex with duplicate detection.

---

## 📁 Project Directory Structure

```text
saucedemo-playwright-bdd/
├── .github/workflows/          # GitHub Actions CI/CD pipeline
│   └── playwright.yml
├── src/
│   ├── constants/              # System constants & message definitions
│   │   ├── error-messages.ts
│   │   ├── sort-options.ts
│   │   └── success-messages.ts
│   ├── core/                   # Framework configuration & environment variables
│   │   └── config.ts
│   ├── data/                   # Test data & user profiles (passwords sanitized)
│   │   ├── checkout-data.json
│   │   └── users.json
│   ├── features/               # Gherkin Feature Files (Scenarios)
│   │   ├── checkout.feature
│   │   ├── inventory.feature
│   │   └── login.feature
│   ├── fixtures/               # Playwright BDD custom test fixtures
│   │   └── fixtures.ts
│   ├── pages/                  # Page Object Model (POM)
│   │   ├── shared/             # Shared components (Header, Navigation)
│   │   │   └── header.page.ts
│   │   ├── base.page.ts        # Abstract Base Page
│   │   ├── cart.page.ts
│   │   ├── checkout.page.ts
│   │   ├── inventory.page.ts
│   │   └── login.page.ts
│   ├── steps/                  # Step Definitions (Glue Code)
│   │   ├── shared/
│   │   │   └── common.steps.ts
│   │   ├── checkout.steps.ts
│   │   ├── inventory.steps.ts
│   │   └── login.steps.ts
│   └── utils/                  # Standalone Utilities & Unit Tests
│       ├── email-validator.ts
│       └── email-validator.spec.ts
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies & npm scripts
├── playwright.config.ts        # Playwright runner configuration
├── TEST_PLAN.md                # Detailed test strategy & coverage matrix
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **npm** or **yarn**

### 2. Installation
Clone the repository, switch to the `feature/test` branch, and install dependencies:
```bash
# Clone the repository
git clone <repository-url>
cd <repository-directory>

# Switch to the feature/test branch
git checkout feature/test
git pull origin feature/test

# Install dependencies
npm install
```

Install the required Playwright browser binaries:
```bash
npx playwright install --with-deps
```

### 3. Environment Configuration
Copy `.env.example` to create your local `.env` file:
```bash
cp .env.example .env
```
Ensure `.env` contains:
```env
BASE_URL=https://www.saucedemo.com
STANDARD_PASSWORD=secret_sauce
HEADLESS=true
BROWSER=chromium
```

---

## 🧪 Test Execution Scripts

All test commands automatically generate BDD spec files (`bddgen`) prior to test execution:

| Command | Description |
| :--- | :--- |
| `npm test` | Run the complete E2E test suite |
| `npm run test:smoke` | Run all `@smoke` tagged scenarios |
| `npm run test:login` | Run authentication & login scenarios (`@login`) |
| `npm run test:inventory` | Run product sorting & catalog scenarios (`@inventory`) |
| `npm run test:checkout` | Run cart management & checkout scenarios (`@checkout`) |
| `npm run test:ui` | Open interactive Playwright UI Mode |
| `npm run test:headed` | Execute tests in headed browser mode |
| `npm run test:email` | Run unit tests for the standalone Email Validator |
| `npm run test:report` | Open the HTML test execution report |

---

## 📊 CI/CD Integration

Continuous Integration is pre-configured via **GitHub Actions** (`.github/workflows/playwright.yml`). On every pull request and push to `main`/`master`, the pipeline:
1. Sets up the Node.js environment.
2. Installs dependencies and Playwright browser binaries.
3. Generates BDD specs and executes the full test suite.
4. Archives and uploads the `playwright-report/` as a build artifact.