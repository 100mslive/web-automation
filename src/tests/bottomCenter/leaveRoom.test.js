/* eslint-disable no-undef */
const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let  mic = "on"
let cam = "on"

test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
});

test.afterEach(async () => {
    await page.close()
});

//leave and join again
test(`Verify leave room`, async () => {
  await page.bottomCenter.leaveRoom();
  await page.assertVisible(page.roomLeave.go_to_dashboard_btn);
  await page.click(page.roomLeave.join_again_btn)
  await page.assertVisible(page.preview.preview_join_btn)
});

test(`Verify End room for all`, async () => {
  await page.bottomCenter.endRoom();
  await page.assertVisible(page.roomLeave.go_to_dashboard_btn)
  await page.click(page.roomLeave.join_again_btn)
  await page.assertVisible(page.preview.preview_join_btn)
});
