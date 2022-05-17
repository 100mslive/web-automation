/* eslint-disable no-undef */
const { expect } = require('@playwright/test');
const { PreviewPage } = require('../pages/previewPage.js');
const { BottomCenter } = require('../pages/bottomCenter.js');
const { BottomLeft } = require('../pages/bottomLeft.js');
const { BottomRight } = require('../pages/bottomRight.js');
const { TopRight } = require('../pages/topRight.js');
const { Ontile } = require('../pages/onTile.js');
const { RoomLeave } = require('../pages/roomLeave.js');


class PageWrapper{

    constructor(page) {
        this.page = page;
        this.preview = new PreviewPage(this);
        this.topRight = new TopRight(this);
        this.bottomCenter= new BottomCenter(this);
        this.ontile= new Ontile(this);
        this.roomLeave= new RoomLeave(this);
        this.bottomLeft= new BottomLeft(this);
        this.bottomRight= new BottomRight(this);
        this.roomLeave= new RoomLeave(this);
    }

    async click(...elementIds){
        for(let element of elementIds) {
            await this.clickOnce(element);
        }
    }

    async assertVisible(elementId){
        console.log("going to assert visibility", elementId);
        await this.page.waitForSelector(elementId);
        await expect(this.page.locator(elementId)).toBeVisible();
        console.log("asserted visibility for", elementId);
    }

    async assertNotVisible(elementId){
        console.log("going to assert non visibility", elementId);
        await expect(this.page.locator(elementId)).not.toBeVisible();
        console.log("asserted non visibility for", elementId);
    }

    async sendText(elementId, text){
        await this.assertVisible(elementId);
        await this.page.locator(elementId).fill(text);
        console.log("Text sent: ", text, "to element", elementId);
    }

    async hasText(elementId, text) {
        await this.assertVisible(elementId);
        await expect(this.page.locator(elementId)).toContainText(text);
    }

    async getText(elementId) {
        let text = this.page.locator(elementId).textContent();
        console.log("Text Found- ", text);
        return text;
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async timeout(time) {
        await this.page.waitForTimeout(time);
    }

    async close() {
        await this.page.close();
    }

    async endRoom() {
        await this.bottomCenter.endRoom();
    }

    async getUrl() {
        let currentUrl = this.page.url();
        console.log("currentURL: ", currentUrl);
        return currentUrl;
    }

    async selectPopupOption(elementId) {
      await this.page.locator('select').selectOption(elementId);
    }
    

    /**
     * @internal
     * @private
     */
    async clickOnce(elementId) {
        await this.assertVisible(elementId);
        await this.page.locator(elementId).click();
        console.log("Clicked: ", elementId);
    }
}
module.exports = PageWrapper;