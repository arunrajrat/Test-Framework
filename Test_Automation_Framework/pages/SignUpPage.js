const { expect } = require("@playwright/test");
exports.SignUpPage = 
class SignUpPage{
    constructor(page){
        this.page = page;
        this.sideMenuBarButton = "//img[@alt='menu']";
        this.loginButton = "//button[text()='Log in']";
        this.newUserButton = "//a[text()='New user? Signup']";
        this.username = "//input[@id='name']";
        this.email = "//input[@id='email']";
        this.password = "//input[@id='password']";
        this.interest = "//label[@class='interest']";
        this.gender = "//div[@class='gender-div']//input";
        this.state = "//select[@id='state']";
        this.hobbies = "//select[@id='hobbies']";
        this.signUpButton = "//button[@type='submit']";
        this.errorMesssage = "//h2[@class='errorMessage false']";
    }

    async gotoSignUpPage(url){
        await this.page.goto(url);
        await this.page.click(this.sideMenuBarButton);
        await this.page.click(this.loginButton);
        await this.page.click(this.newUserButton);
    }

    async enterUserDetails(username,email,password,interests,gender,state,hobbies){
        await this.page.locator(this.username).fill(username);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.password).fill(password);
        await this.page.waitForSelector(this.interest);
        for(let i=0;i<interests.length;i++){
            var count = 0;
            for(const int of await this.page.locator(this.interest).all()){
                if(await int.textContent() == interests[i]){
                    await this.page.locator(this.interest).nth(count).click();
                }
                count++;
            }
            
        } 
        const genderList = await this.page.$$(this.gender);
        for(const g of genderList){
            if(gender == await g.textContent() && g.isChecked() == false){
                await g.click();
            }
        }
        await this.page.locator(this.state).selectOption(state);
        await this.page.locator(this.hobbies).selectOption(hobbies);      
    }
    async clickSignUpButton(){
        await this.page.click(this.signUpButton);
    }
    async verifyInvalidSignup(errorMessage){
        await this.page.waitForSelector(this.errorMesssage);
        await expect(this.page.locator(this.errorMesssage)).toHaveText(errorMessage);
        
    }
}