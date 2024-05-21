const { expect } = require("@playwright/test");

exports.CartPage =
class CartPage{
    constructor(page){
        this.page = page;
        this.cartPageButton = "//button[@class='cartBtn']";
        this.products = "//div[@class='course-content']//h2";
        this.cartCount = "//button[@class='cartBtn']/span";
        this.removeFromCartButton = "//button[text()='Remove from Cart']";
        this.enrollNowButton = "//button[text()='Enroll Now']";
        this.enrollAddress = "//textarea[@id='address']";
        this.enrollPhone = "//input[@id='phone']";
        this.confrimEnrollButton = "//div[@class='modal-footer']//button[text()='Enroll Now']";
        this.getOrderId = "//h4[@class='uniqueId']";
    }

    async gotoCartPage(){
        await this.page.click(this.cartPageButton);
    }
    async verifyCartPage(cartUrl){
        await expect(this.page).toHaveURL(cartUrl);
    }

    async verifyProductsinCart(){
        var countText = await this.page.locator(this.cartCount).textContent();
        var count = parseInt(countText);
        if(count>1){
            for (const prod of await this.page.locator(this.products).all()){
                expect(await prod).toBeVisible();
            }
        }
    }

    async verifyRemoveOneItemfromCart(){
        await this.page.waitForSelector(this.removeFromCartButton);
        expect(await this.page.locator(this.removeFromCartButton).first()).toBeVisible();
        await this.page.locator(this.removeFromCartButton).first().click();
    }

    async verifyEnrollNowButton(){
        await expect(this.page.locator(this.enrollNowButton)).toBeVisible();
    }

    async enrollUser(address,phone){
        await this.page.click(this.enrollNowButton);
        await this.page.locator(this.enrollAddress).fill(address);
        await this.page.locator(this.enrollPhone).fill(phone);
        await this.page.locator(this.confrimEnrollButton).click();
        const orderId = await this.page.locator(this.getOrderId).textContent();
        return orderId;
    }

}