const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const PageMethods = require('../../utils/PageMethods.js');
const { RoomLeave } = require('../../pages/roomLeave.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let roomLeave= new RoomLeave();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let  mic = "on"
let cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await page.close()
});

test(`Verify leave room`, async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, "on", "on")
  await bottomCenter.leaveRoom(page);
  result = await pageMethods.isElementVisible(page, roomLeave.join_again_btn, "join_again_btn visibility-")
  expect(result).toBe(true);
  result = await pageMethods.isElementVisible(page, roomLeave.go_to_dashboard_btn, "go_to_dashboard_btn visibility-")
  expect(result).toBe(true);
  await pageMethods.clickElement(page, roomLeave.join_again_btn, "join_again_btn")

});

test(`Verify End room for all`, async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, "on", "on")
  await bottomCenter.endRoom(page);
  result = await pageMethods.isElementVisible(page, roomLeave.join_again_btn, "join_again_btn visibility-")
  expect(result).toBe(true);
  result = await pageMethods.isElementVisible(page, roomLeave.go_to_dashboard_btn, "go_to_dashboard_btn visibility-")
  expect(result).toBe(true);
  await pageMethods.clickElement(page, roomLeave.join_again_btn, "join_again_btn")

});
