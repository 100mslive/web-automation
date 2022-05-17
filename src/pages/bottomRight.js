/* eslint-disable no-undef */

exports.BottomRight = class BottomRight {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.raise_hand_btn = '[data-testid="raise_hand_btn"]';
    this.brb_btn = '[data-testid="brb_btn"]';
    this.chat_btn = '[data-testid="chat_btn"]';
  }

}
