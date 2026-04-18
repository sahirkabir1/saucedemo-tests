# SauceDemo – Playwright Test Suite

End-to-end tests for [saucedemo.com](https://www.saucedemo.com) built with **Playwright** and **TypeScript**, following the Page Object Model pattern.

---

## Project Structure

```
saucedemo-tests/
├── fixtures/
│   ├── testData.ts          # Test users, shipping data
│   └── pages.ts             # Custom Playwright fixtures (pre-authenticated page objects)
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductDetailPage.ts
├── tests/
│   ├── auth.spec.ts          # Login / logout flows
│   ├── inventory.spec.ts     # Product listing & sorting
│   ├── cart.spec.ts          # Cart management
│   └── checkout.spec.ts      # Checkout end-to-end
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## Setup

**Prerequisites:** Node.js ≥ 18

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/saucedemo-tests.git
cd saucedemo-tests

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Running the Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless, all browsers) |
| `npm run test:smoke` | Run `@smoke` tests only (all browsers) |
| `npm run test:smoke:chrome` | Run `@smoke` tests on Chromium only |
| `npm run test:chrome` | Run all tests on Chromium only |
| `npm run test:firefox` | Run all tests on Firefox only |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:report` | Open the last HTML report |
| `npm run lint` | TypeScript type-check (no emit) |

Run a specific spec file:
```bash
npx playwright test tests/auth.spec.ts
```

Run a specific test by title:
```bash
npx playwright test --grep "complete checkout end-to-end"
```

---

## Test Coverage

| Area | Tests |
|---|---|
| **Auth** | Valid login, locked user, wrong password, missing username/password, logout |
| **Inventory** | Product count, sort A–Z / Z–A / price low–high / price high–low, product detail navigation |
| **Cart** | Add single/multiple items, badge count, cart page contents, remove from inventory & cart, cart persistence |
| **Checkout** | Full happy path, missing first/last name, missing postal code, total price validation |

---

## 🧭 Engineering Approach

This project is designed with a focus on maintainability, scalability, and real-world usability rather than just test coverage. I’ve used Playwright with a Page Object Model to promote reuse and separation of concerns, keeping test logic clean and readable. Tests are written to reflect critical user journeys (e.g. login, add to cart, checkout) with meaningful assertions to validate behaviour rather than implementation details. The structure is intentionally lightweight but extensible, allowing for easy integration of additional layers such as API testing, visual regression, and CI/CD pipelines. Overall, the approach mirrors how I would bootstrap a production-ready automation framework, balancing simplicity with good engineering practices.

---

## To Do

Given more time, I would automate and improve the following:

### Additional Test Coverage
- **Visual regression** – Screenshot comparisons for the inventory grid, product cards, and checkout summary using `expect(page).toHaveScreenshot()` or intgrate tools like Chromatic/SmartUI/Percy.
- **Accessibility checks** – Integrate `@axe-core/playwright` to catch WCAG violations.

### Framework & Infrastructure

- **Expand CI matrix** – The current GitHub Actions setup runs smoke tests on every push/PR (Chromium only) and the full suite nightly + on merge to `main` (all browsers). Enhancements could include separate per-browser jobs with a matrix strategy, and Slack/Teams notifications on failure.
- **Cross-browser matrix** – Add Safari/WebKit and a mobile viewport project (e.g. `iPhone 14`) to the Playwright config.
- **Cross-device matrix** – Add TestMu AI/BrowserStack real devices (e.g. `iPhone 14`/ `Samsung S24`) to the Playwright config.
- **Environment config** – Move `baseURL` and credentials into a `.env` file with `dotenv` so the suite can target staging vs production without code changes.

### 🤖 Agent-Based Testing Roadmap

As a forward-looking enhancement, I would introduce AI-assisted “agents” to improve test quality, coverage, and maintenance.

### 🧠 Planning & Strategy Agents
**Test Planner Agent**
Determines required test coverage based on feature changes.
Breaks down testing into unit, integration, E2E, visual, and accessibility layers using risk-based analysis.

**Change Impact Agent**
Analyses code changes to identify affected areas.
Maps modified files to user journeys and determines which tests should be executed or updated.

**Coverage Gap Agent**
Identifies untested or under-tested areas of the application.
Highlights gaps across routes, features, and critical user flows.

**Orchestrator Agent**
Coordinates execution of all testing agents based on triggers such as PR creation, CI failures, or feature changes.
Ensures agents operate cohesively as a system rather than in isolation.

### ✍️ Test Authoring & Quality Agents
**Locator Intelligence Agent**
Generates stable Playwright selectors using DOM analysis.
Prioritises data-testid, accessibility roles, and resilient attributes.

**Test Review Agent**
Reviews test code for best practices and maintainability.
Flags brittle selectors, poor synchronisation, and missing assertions.

**Visual Regression Agent**
Manages UI snapshot testing and detects unintended visual changes.
