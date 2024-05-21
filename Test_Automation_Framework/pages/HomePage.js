const { expect } = require("@playwright/test");

exports.HomePage =
class HomePage{
    constructor(page){
        this.page = page;
        this.products = "//div//h2[@class='name']";
        this.addToCartButton = "//button[text()='Add to Cart']";
        this.removeFromCartButton = "//button[text()='Remove from Cart']";
        this.cartPageButton = "//button[@class='cartBtn']";
        this.cartCount = "//button[@class='cartBtn']/span";
    }

    async verifyProductsList(){
        await this.page.waitForSelector(this.products);
        const products = await this.page.$$(this.products);
        if(products.length>1){
            expect(products).toBeTruthy();
        }
        else{
            expect(products).toBeFalsy();
        }
    }

    async addProductstoCart(courses){
        for(const course of courses){
            await this.page.waitForSelector(this.products);
            const products = await this.page.$$(this.products);
            for(let i=0; i<products.length;i++){
                const prod = products[i];
                const text = await prod.textContent();
                const trimmedText = text.trim();
                if(trimmedText.toLowerCase() === course.trim().toLowerCase()){
                    const addToCartButton = this.page.locator(this.addToCartButton).nth(i);
                    await addToCartButton.waitFor({ state: 'visible' });
                    await addToCartButton.click();
                    break;
                }
            }
        }
    }

    async verifyCartCount(cartCount){
        var countText = await this.page.locator(this.cartCount).textContent();
        var count = parseInt(countText);
        expect(cartCount = count).toBeTruthy();
    }

    async verifyRemovefromCartButton(courses,courseCount){
        this.addProductstoCart(courses);
        await this.page.waitForSelector(this.removeFromCartButton);
        expect(await this.page.locator(this.removeFromCartButton).first()).toBeVisible();
        var countText = await this.page.locator(this.cartCount).textContent();
        var count = parseInt(countText);
        expect(count = courseCount ).toBeTruthy();
        for(const remove of await this.page.locator(this.removeFromCartButton).all()){
            await remove.click();
        }
    }
}
