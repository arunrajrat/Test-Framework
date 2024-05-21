import {test,expect} from "@playwright/test"
import {LoginPage} from "../pages/LoginPage"
import {HomePage} from "../pages/HomePage"
import {CartPage} from "../pages/CartPage"
 
const testData = JSON.parse(JSON.stringify(require("../testdata.json")));
let page,login,home,cart;
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    login = new LoginPage(page);
    home = new HomePage(page);
    cart = new CartPage(page);
  });
  
test.afterAll(async () => {
    await page.close();
  });
test.beforeEach(async ({ page }) => {
    await login.gotoLoginPage(testData.url);
    await login.loginUser(testData.loginUserValid.email,testData.loginUserValid.password);
    await home.addProductstoCart(testData.loginUserValid.courses);
    await cart.gotoCartPage();  
})

test('ManageCartFunctionality', async({})=>{
  await cart.verifyCartPage(testData.cartUrl);
  await cart.verifyProductsinCart();
  await cart.verifyRemoveOneItemfromCart();
})

test('VerifyEnrollFuntionality', async({})=>{
  await cart.verifyEnrollNowButton();
  const orderId = await cart.enrollUser(testData.loginUserValid.enrollAddress,testData.loginUserValid.enrollPhone);
  console.log(`Order placed successfully: ${orderId}`);
})