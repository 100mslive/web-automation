const { expect } = require('@playwright/test');
const  PageMethods = require('../utils/PageMethods')
const { PreviewPage } = require('./previewPage.js');
let pageMethods = new PageMethods();
let previewPage= new PreviewPage();

exports.BottomRight = class BottomRight {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor() {
    this.raise_hand_btn = '[data-testid="raise_hand_btn"]';
    this.brb_btn = '[data-testid="brb_btn"]';
    this.chat_btn = 'button[data-testid="chat_btn"]';
  }
  

}
