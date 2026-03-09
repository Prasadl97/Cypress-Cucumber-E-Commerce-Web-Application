# Playwright + Cucumber

E2E tests using [Playwright](https://playwright.dev/) for browser automation and [Cucumber](https://cucumber.io/) for BDD (Gherkin) scenarios.

**Application under test:** [Magento 2 Demo](https://magento2-demo.magebit.com/)

## Setup

```bash
cd playwright-cucumber
npm install
npx playwright install
```

## Run tests

```bash
# Headless (default)
npm test

# With browser visible
npm run test:headed

# With browser visible and slowed down (e.g. 500ms per action)
npm run test:ui
```

## Project layout

```
playwright-cucumber/
├── cucumber.mjs             # Cucumber config (paths, formatter, world params)
├── playwright.config.ts   # Playwright config (browsers, baseURL, etc.)
├── package.json
├── src/
│   ├── config/            # Test data loader (loadTestData)
│   ├── utils/             # IDUtils (dynamic email), entity-store (JSON user data)
│   └── pages/             # Page objects (home, create-account, login, dashboard)
├── data/
│   ├── test-data.json     # External test data (e.g. default registration)
│   └── entities/          # Persisted test data (e.g. registered-user.json)
├── features/
│   ├── support/
│   │   ├── world.ts       # Custom World with browser, context, page
│   │   └── hooks.ts      # Before/After (init & close browser)
│   ├── step-definitions/
│   │   └── *.ts          # Step definitions using this.page and page objects
│   └── *.feature         # Gherkin feature files
├── docs/
│   └── magento-ui-findings.md   # Selectors captured via MCP
└── README.md
```

## Writing scenarios

1. Add or edit `.feature` files under `features/`.
2. Implement steps in `features/step-definitions/` using `this.page` and page objects from `src/pages/`.
3. Use `this.parameters.baseURL` and `this.parameters.entityFilePath` for the app and persisted user file.

## Environment

- **BASE_URL** – Override app URL (default: `https://magento2-demo.magebit.com/`).
- **ENTITY_FILE_PATH** – Override path for saved registered user JSON (default: `./data/entities/registered-user.json`).
- **DATA_FILE_PATH** – Override path for test data JSON (default: `data/test-data.json`).

Config is read from `process.env` in `cucumber.mjs`; override via env or world parameters.

## Run by tag

```bash
node --import tsx node_modules/@cucumber/cucumber/bin/cucumber-js --tags "@smoke"
```

## Notes

- Tests run in Chromium by default (edit `world.ts` to use `firefox` or `webkit`).
- Registration flow saves email/password to the entity file after success; the login step reads from it.
- `playwright.config.ts` is for optional Playwright-native runs; Cucumber uses the custom World and `playwright` inside step definitions.

## Technical requirements

| Requirement | Implementation |
|-------------|----------------|
| **Page Object Model** | `src/pages/`: `BasePage` plus `HomePage`, `CreateAccountPage`, `LoginPage`, `AccountDashboardPage`. Selectors and actions encapsulated; steps use World getters (`getHomePage()`, etc.). |
| **Async/await correctness** | All hooks, steps, and page methods are `async` and use `await`; no `.then()` or sync blocking. |
| **Environment configuration** | `BASE_URL`, `ENTITY_FILE_PATH` (and `DATA_FILE_PATH`) read from `process.env` in `cucumber.mjs` with fallbacks. |
| **External test data** | `data/test-data.json` for default registration; `src/config/test-data.ts` loads it. Entity store for persisted user (`data/entities/registered-user.json`). |
| **Hooks** | `features/support/hooks.ts`: `Before` (init browser/context/page), `After` (destroy). |
| **No hardcoded waits** | Only Playwright auto-waiting (`waitFor({ state: 'visible' })`, `fill`, `click`); no `waitForTimeout` or `setTimeout`. |
| **Clean reusable code** | World exposes page getters; shared base URL and test data loader; no duplicated page construction in steps. |
