import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
const testData = JSON.parse(JSON.stringify(require("../testdata.json")));

let page,login;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    login = new LoginPage(page);
  });
  
test.afterAll(async () => {
    await page.close();
  });
test.beforeEach(async ({}) => {
    await login.gotoLoginPage(testData.url);
});
test('LoginUserWithValidDetails', async ({})=> {
    await login.loginUser(testData.loginUserValid.email,testData.loginUserValid.password);
    await login.verifyLogin(testData.url);
});

test('LoginUserWithInValidDetails', async ({})=> {
    await login.loginUser(testData.loginUserInvalid.email,testData.loginUserInvalid.password);
    await login.verifyInvalidLogin(testData.loginUserInvalid.errorMessage);
})

test('LoginUserWithSpecialCharacters', async ({})=> {
    await login.loginUser(testData.loginWithSpecialChar.email,testData.loginWithSpecialChar.password);
    await expect(await page).toHaveURL(testData.loginUrl);
})

test('SignOutFunctionality', async ({})=>{
    await login.loginUser(testData.loginUserValid.email,testData.loginUserValid.password);
    await login.verifyLogin(testData.url);
    await login.signOutUser();
    await login.verifySignOut(testData.loginUrl);

})
