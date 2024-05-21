Test Automation Framework:
 - Using Javascript and PlayWright.
Prerequisites:
1. Need JavaScript installed.
2. Use VS code editor (or similar code editor) to view and verify the framework.
3. Import the framework into the code editor.

Dependencies:
1. Need to add PlayWright as dependencies.
   - Use command npm (init playwright@latest) without braces in the terminal.
2. Need to add allure reports dependencies to generate allure reports of test cases.
   - Use below commands to install allure reports 
      1. npm i -D @playwright/test allure-playwright
      2. npm install -g allure-commandline --save-dev
3. Incase of any playwright update or version mismatch of any dependencies, use the below command:
   - npx playwright install --with-deps

Commands to Run Framework:
1. To a complete run of the framework without any specifications:
   - npx playwright test  (by default playwright will run headless)
   - npx playwright test --headed (to run in headed mode with browser)
   - npx playwright test --headed --project=chromium (to run only on chrome based web browsers)
2. To run a specific spec file from the framework: 
   - npx playwright test LoginUser.spec.js 
3. To run all spec files from the framework:
   - npx playwright tests/
4. To run a specific test case within the framework:
   - 
