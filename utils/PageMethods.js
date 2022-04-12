const { expect } = require('@playwright/test');

class PageMethods{

    async clickElement(page,test_id, text){
        await page.waitForTimeout(1000)
        await page.waitForSelector(test_id);
        await page.locator(test_id).click()
        console.log("Clicked: "+ text);
    }

    async isElementVisible(page, test_id, message){
        await page.waitForTimeout(1000)
        await page.waitForSelector(test_id);
        if(expect(page.locator(test_id)).toBeVisible()){
            console.log(message + true);
            return true;
        }
        else{
            console.log(message + false);
            return false;
        }
    }

    async isElementNotVisible(page, test_id, message){
        if(expect(page.locator(test_id)).not.toBeVisible()){
            console.log(message + true);
            return true;
        }
        else{
            console.log(message + false);
            return false;
        }
    }

    async sendText(page, test_id, text){
        await page.waitForSelector(test_id);
        await page.locator(test_id).fill(text)
        console.log("Text sent: "+ text)
    }

      async assertResult(result, message){
        if(result == true){
            console.log("Result for "+ message + ":"+ true);
            return true;
        }
        else{
            console.log("Result for "+ message + ":" + false);
            return false;
        }
    }


}
module.exports = PageMethods;