/* eslint-disable no-undef */
exports.RoomLeave = class RoomLeave {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.join_again_btn = 'button[data-testid="join_again_btn"]';
    this.go_to_dashboard_btn = 'button[data-testid="go_to_dashboard_btn"]';
  
  }
}
