import {test,expect} from "@playwright/test"
import {LoginPage} from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"

const testData = JSON.parse(JSON.stringify(require("../testdata.json")));
let page,login,home;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    login = new LoginPage(page);
    home = new HomePage(page);
  });
test.afterAll(async () => {
    await page.close();
  });
test.beforeEach(async ({}) => {
    await login.gotoLoginPage(testData.url);
    await login.loginUser(testData.loginUserValid.email,testData.loginUserValid.password);
});

test('verifyHomepageFunctionality', async({})=>{
    await home.verifyProductsList();
})

test('verifyAddProductsFunctionality', async ({})=>{
    await home.addProductstoCart(testData.loginUserValid.courses);
    await home.verifyCartCount(testData.loginUserValid.coursesCount);
})

test('verifyRemovefromCartFunctionality', async ({})=>{
    await home.verifyRemovefromCartButton(testData.loginUserValid.courses,testData.loginUserValid.coursesCount);
})