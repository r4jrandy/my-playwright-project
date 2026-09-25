# Playwright Test Framework

A TypeScript end-to-end testing framework built with Playwright Test. It supports Chromium, Firefox, and WebKit, environment-specific settings, page objects, HTML reports, and GitHub Actions.

[![Playwright 1.57.0](https://img.shields.io/badge/Playwright-1.57.0-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
![Browsers: Chromium, Firefox, WebKit](https://img.shields.io/badge/Browsers-Chromium%20%7C%20Firefox%20%7C%20WebKit-4568A8)
![CI: GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

> :wave: **Welcome!** Start with the Quick Start below. You can get the suite running locally in a few commands, then follow the environment and workflow sections when you need staging or CI.

## Contents

- [Quick start](#quick-start)
- [Prerequisites](#prerequisites)
- [Install the project](#install-the-project)
- [Configure an environment](#configure-an-environment)
- [Run tests locally](#run-tests-locally)
- [View test reports](#view-test-reports)
- [Run tests in GitHub Actions](#run-tests-in-github-actions)
- [Project layout](#project-layout)
- [Troubleshooting](#troubleshooting)

## Quick start

> :rocket: **First run**
>
> 1. Install the project and browsers.
> 2. Copy `.env.example` to `.env.dev` and set the URL and test credentials.
> 3. Run the suite in Chromium.

```bash
npm ci
npx playwright install chromium
cp .env.example .env.dev
# Edit .env.dev with the values for your test application.
ENV_NAME=dev npx playwright test --config=config/test.playwright.config.ts --project=chromium
```

## Prerequisites

:compass: **Before you begin**

- Node.js 20 LTS or newer, with npm
- Git
- Visual Studio Code is recommended, but not required

This project pins Playwright Test to version `1.57.0` to support the repository's macOS 12 setup. Avoid upgrading Playwright independently without checking browser and macOS compatibility.

## Install the project

:package: **Install once after cloning**

Clone the repository and install the exact dependencies from the lockfile:

```bash
git clone <repository-url>
cd my-playwright-project
npm ci
```

Install browser binaries required by the configured projects:

```bash
npx playwright install chromium firefox webkit
```

On Linux CI runners, install the browser system dependencies as well:

```bash
npx playwright install --with-deps chromium firefox webkit
```

## Configure an environment

:key: **Keep credentials local**

The framework loads settings from `.env.<environment>` based on `ENV_NAME`. For example, `ENV_NAME=stage` loads `.env.stage`. The root `.env` is loaded as a fallback for keys that were not defined in the selected environment file. Values already exported by the shell or CI are not overwritten by dotenv.

1. Create `.env.dev` and/or `.env.stage` in the repository root. These files are ignored by Git.
2. Use the following variable names:

```dotenv
ENV_NAME=dev
BASE_URL=https://your-test-application.example/
TEST_USERNAME=your-test-user
TEST_PASSWORD=your-test-password
DB_SERVER=localhost
DB_DATABASE=testdb
DB_CONNECTION_STRING=
```

`BASE_URL`, `TEST_USERNAME`, and `TEST_PASSWORD` are required by the E2E configuration in CI. The database values are optional unless the tests you run need a database. Keep real credentials in your local ignored environment files or in your CI secret store. Do not commit secrets.

> [!IMPORTANT]
> Environment files such as `.env.dev` and `.env.stage` are intentionally excluded from Git. Never paste real credentials into issues, pull requests, screenshots, or test logs.

The committed `.env.example` demonstrates the expected keys and public demo defaults. Copy it to `.env.dev` and change the values for your test system. Create `.env.stage` separately for staging. Do not put a production account or real customer data in test configuration.

## Run tests locally

:test_tube: **Choose an environment, browser, and test scope**

All commands use the environment-specific Playwright config. Set `ENV_NAME` before the command to choose the `.env.<environment>` file.

Run the whole suite in development using Chromium:

```bash
ENV_NAME=dev npx playwright test --config=config/test.playwright.config.ts --project=chromium
```

Run the suite against staging in Firefox:

```bash
ENV_NAME=stage npx playwright test --config=config/test.playwright.config.ts --project=firefox
```

Run one test file:

```bash
ENV_NAME=dev npx playwright test --config=config/test.playwright.config.ts tests/functional/login.spec.ts --project=chromium
```

Run tests in a folder:

```bash
ENV_NAME=stage npx playwright test --config=config/test.playwright.config.ts tests/e2e --project=chromium
```

Filter by a test title or tag. Playwright treats the value of `--grep` as a regular expression:

```bash
ENV_NAME=stage npx playwright test --config=config/test.playwright.config.ts --project=chromium --grep "Way2Automation Login Test"
```

List matching tests without executing them:

```bash
ENV_NAME=stage npx playwright test --config=config/test.playwright.config.ts --project=chromium --list
```

Run with a visible browser window:

```bash
ENV_NAME=dev npx playwright test --config=config/test.playwright.config.ts tests/functional/login.spec.ts --project=chromium --headed
```

Useful options include:

- `--project=chromium`, `--project=firefox`, or `--project=webkit` to select a browser
- `--workers=1` to run tests sequentially while debugging
- `--debug` to open Playwright Inspector
- `--ui` to use Playwright's interactive test runner

The default Playwright config is used if `--config=config/test.playwright.config.ts` is omitted. Use the environment-specific config when tests need `BASE_URL` or credentials.

## View test reports

:bar_chart: **Find failures and artifacts**

The HTML reporter runs after tests. Open the most recent report with:

```bash
npx playwright show-report
```

This starts a local report server. Press `Ctrl+C` to stop it. The test run itself may have succeeded even if you stop the report server afterward.

Screenshots, videos, and traces are captured according to the Playwright settings, with failure artifacts written under `test-results/`. The Allure reporter also writes raw results to `allure-results/`. An Allure report viewer/CLI is not included as a project dependency.

## Run tests in GitHub Actions

:gear: **Automate the same environment choices in CI**

The repository has two workflows in the **Actions** tab.

### Playwright Tests

The existing `Playwright Tests` workflow runs on pushes and pull requests targeting `main` or `master`. Those runs use the `dev` GitHub Environment. It can also be started manually, with a `dev` or `stage` selection, and runs the full suite.

### Selected Playwright Tests

The `Selected Playwright Tests` workflow is started manually and lets you choose:

- Environment: `dev` or `stage`
- Browser: `chromium`, `firefox`, or `webkit`
- Optional test file/folder path under `tests/`
- Optional test title or tag filter

Provide at least one of the path or title/tag fields. Examples:

```text
tests/e2e/e2e.spec.ts
```

or:

```text
@smoke
```

You can also provide both to filter a file/folder by title or tag. Tags must be present in test titles (for example, `test("logs in @smoke", ...)`) for `--grep @smoke` to match them.

To start it, open **Actions → Selected Playwright Tests → Run workflow**, choose the branch and inputs, and click **Run workflow**.

### Configure GitHub Environments

:key: **One set of values per environment**

A repository administrator should configure the values before running either workflow:

1. Open **Settings → Environments** in the GitHub repository.
2. Create environments named exactly `dev` and `stage`.
3. For each environment, add these **Variables** as appropriate: `BASE_URL`, `DB_SERVER`, and `DB_DATABASE`.
4. Add these **Secrets**: `TEST_USERNAME` and `TEST_PASSWORD`. Add `DB_CONNECTION_STRING` as a secret if it contains credentials or other sensitive data.
5. Set values separately for `dev` and `stage`. Variable and secret names are case-sensitive.

The workflows pass the selected GitHub Environment's values to Playwright as process environment variables; no `.env` file is uploaded to GitHub Actions. The CI config stops early if `BASE_URL`, `TEST_USERNAME`, or `TEST_PASSWORD` is missing.

GitHub does not provide repository secrets to workflows triggered by pull requests from forks. The regular workflow skips those fork PR runs. Do not work around this by exposing credentials to untrusted pull-request code.

Workflow reports and test results are uploaded as artifacts and can be downloaded from the completed Actions run.

## Project layout

:open_file_folder: **Where to make changes**

```text
config/
  load-env.ts                   Loads .env.<ENV_NAME> and fallback .env
  test.playwright.config.ts     Shared environment-aware Playwright config
tests/
  e2e/                          End-to-end tests
  functional/                   Functional tests
  page-objects/                 Page object classes
  helpers/                      Shared test utilities and setup
.github/workflows/
  playwright.yml                Full suite on push, pull request, or manual run
  playwright-selected.yml       Manually selected environment/browser/tests
playwright.config.ts            Shared browser projects and runner settings
.env.example                    Example environment variable names and values
```

Add new tests as `*.spec.ts` files under `tests/`. Reuse page objects and helpers where practical. Use descriptive test names; use tags such as `@smoke` in titles when you want to filter a group through `--grep` or the selected workflow.

## Troubleshooting

:life_buoy: **Quick fixes for common setup issues**

### Playwright says the browser executable is missing

Install the browser binaries for this project's pinned Playwright version:

```bash
npx playwright install chromium firefox webkit
```

If the error says Playwright does not support your macOS version, do not upgrade Playwright to the latest version blindly. This repository pins Playwright `1.57.0` for macOS 12; install browsers after running `npm ci`.

### A test uses the wrong URL or credentials

Check that the file is named `.env.<environment>` and that `ENV_NAME` matches the suffix. For example, `ENV_NAME=stage` selects `.env.stage`. Shell variables take precedence over file values. In GitHub Actions, check the Variables and Secrets on the selected GitHub Environment.

### The selected workflow reports that no tests were selected

Enter a path under `tests/`, a title/tag filter, or both. Check the spelling with `--list` locally before dispatching the workflow.

### Firefox or WebKit fails to launch on macOS 12

The project can install macOS 12-compatible browser builds with its pinned Playwright version, but browser support on older macOS releases is limited. This repository has observed a WebKit protocol incompatibility on its Mac 12 setup. Use Chromium or Firefox locally if WebKit fails there; use the Ubuntu GitHub Actions runner for the CI WebKit run.

### A test fails only when running the whole suite

Try the test by itself and with one worker:

```bash
ENV_NAME=dev npx playwright test --config=config/test.playwright.config.ts tests/path/to/test.spec.ts --project=chromium --workers=1
```

Check `test-results/` for the failure context, screenshot, video, or trace. Make sure the selected environment is safe for automated test data and that the configured test account is valid.
