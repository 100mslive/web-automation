const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomLeft } = require('../../pages/bottomLeft.js');
const { TopRight } = require('../../pages/TopRight.js');
const PageMethods = require('../../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomLeft= new BottomLeft();
let topRight= new TopRight();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = "on"
let cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test.only(`white board check`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomLeft.white_board_btn, "white_board_btn visibility-")
  pageMethods.assertResult(result, "white_board_btn")
  await pageMethods.clickElement(page, bottomLeft.white_board_btn, "white_board_btn")
  await pageMethods.clickElement(page, bottomLeft.white_board_btn, "white_board_btn")
  await pageMethods.clickElement(page, bottomLeft.white_board_btn, "white_board_btn")
  
  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")
  await pageMethods.clickElement(page, topRight.record_status_dropdown, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.whiteboard_owner, "whiteboard_owner visibility-")
  pageMethods.assertResult(result, "whiteboard_owner")

  result = await pageMethods.isElementVisible(page, topRight.whiteboard_stop, "whiteboard_stop visibility-")
  pageMethods.assertResult(result, "whiteboard_stop")
  await pageMethods.clickElement(page, topRight.whiteboard_stop, "whiteboard_stop")

})  

