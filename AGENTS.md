# Project overview
Playwright + TypeScript test framework for practicesoftwaretesting.com, covering UI tests and API tests.

# Commands
- Install: `npm install`, then `npx playwright install`
- Run all tests: `npx playwright test`
- Run UI only: `npx playwright test --project=ui`
- Run API only: `npx playwright test --project=api`
- Run one file: `npx playwright test tests/ui/<file>.spec.ts`
- Open report: `npx playwright show-report`

# Folder structure
- `tests/ui/`: UI test scenarios, assertions and validations
- `tests/api/`: API test scenarios and assertions
- `src/ui/pages/`: page objects (locators and actions, one class per page)
- `src/api/clients/`: API clients (one class per service, one method per endpoint)
- `src/api/models/`: TypeScript types for request and response bodies
- `src/fixtures/`: reusable setup that provides page objects and clients to tests
- `src/test-data/`: test data
- `src/utils/`: shared helpers

# Rules for writing UI tests
- Locator order: getByRole, getByLabel, getByTestId, then CSS or XPath as a last resort.
- Use parameterised locators for repeated elements (for example a product card by name), never index numbers.
- Avoid brittle selectors coupled to layout or styling.
- Never use `waitForTimeout`. Rely on auto-waiting and web-first assertions.
- Every page gets a page object class in `src/ui/pages/`.
- Keep locators and UI interactions in page objects; expose task-level methods rather than raw locators.
- Tests contain no locators. They call page object methods and own test-specific assertions. Page objects may provide reusable page-state checks.

# Rules for writing API tests
- Tests never make raw requests. They use client classes in `src/api/clients/`.
- Every client extends `BaseClient`.
- Assert status code, response body and key headers.
- Validate response shapes against the relevant model or schema where appropriate.
- Preserve useful request and response details when reporting failures; do not hide errors behind fallback results.
- Clean up any data a test creates.

# Rules for all tests
- Use fixtures, not repeated setup code.
- Each test is independent and can run alone.
- Do not share mutable state between tests. Use unique test data when tests may run in parallel, and clean up created data even when a test fails.
- Test names describe behaviour, for example "user sees error on invalid login".
- Focus tests on observable behaviour; avoid duplicating checks across layers without a clear reason.
- Use explicit TypeScript types; avoid `any` unless there is a clear reason.
- No hard-coded URLs. Use `baseURL`.
- No secrets or passwords in code. Use environment variables.
- Run the relevant tests before finishing a change and report the result.

# Do not
- Do not edit `playwright.config.ts` without asking.
- Do not delete or skip existing tests.
- Do not commit `node_modules` or test reports.