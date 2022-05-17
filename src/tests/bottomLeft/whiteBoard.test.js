/* eslint-disable no-undef */

const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = true;
let cam = false;

test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
});

test.afterEach(async () => {
    await page.endRoom();
    await page.close()
});

//not present in prod
test.skip(`white board check`, async () => {

  await page.click(page.bottomLeft.white_board_btn, page.bottomLeft.white_board_btn, page.bottomLeft.white_board_btn);

  await page.click(page.topRight.record_status_dropdown);
  await page.assertVisible(page.topRight.whiteboard_owner)
  await page.click(page.topRight.whiteboard_stop);
})  

