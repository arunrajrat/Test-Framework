import {test, expect} from '@playwright/test'
import { SignUpPage } from '../pages/SignUpPage' 

import { sign } from 'crypto';
const testData = JSON.parse(JSON.stringify(require("../testdata.json")));
let page,signUp;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    signUp = new SignUpPage(page);
  });
test.afterAll(async () => {
    await page.close();
  });
test.beforeEach(async ({}) => {
    await signUp.gotoSignUpPage(testData.url);
});
test('NewUserSignUpWithValidDetails', async ({}) =>{
    await signUp.enterUserDetails(testData.newUserValid.username,
        testData.newUserValid.email,
        testData.newUserValid.password,
        testData.newUserValid.interest,
        testData.newUserValid.gender,
        testData.newUserValid.state,
        testData.newUserValid.hobbies);
    await signUp.clickSignUpButton();

})

test('NewUserSignUpwithInvalidDetails', async ({}) =>{
    await signUp.enterUserDetails(testData.newUserInvalid.username,
        testData.newUserInvalid.email,
        testData.newUserInvalid.password,
        testData.newUserInvalid.interest,
        testData.newUserInvalid.gender,
        testData.newUserInvalid.state,
        testData.newUserInvalid.hobbies);
    await signUp.clickSignUpButton();
    await signUp.verifyInvalidSignup(testData.errorMessage);
})