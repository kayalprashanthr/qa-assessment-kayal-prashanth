## GoQuant QA-Bootcamp Assesment

## Overview

These tests are designed to verify the critical user flows and key functionality of the application across modern web browsers. They simulate real user interactions to ensure the application behaves as expected from start to finish.

---

## Getting Started

Follow these steps to set up the project locally and run the tests.

### 1. Pull the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/kayalprashanthr/qa-assessment-kayal-prashanth.git
cd qa-assessment-kayal-prashanth
```
### 2. Install Dependencies

You need Node.js installed to run this project. Once in the project directory, install Playwright and other dependencies.
```bash
npm install playwright@latest
```

### 3.Run the Tests

**Run Specific Tests on Chromium (Recommended)**
```bash
npx playwright test tests/[folderName]/[testFileName].spec.ts --headed --project=chromium
```

**Run All Tests in Chromium**
```bash
npx playwright test --headed --project=chromium
```

**Run All Tests in Different Browser**
```bash
npx playwright test --headed
```

