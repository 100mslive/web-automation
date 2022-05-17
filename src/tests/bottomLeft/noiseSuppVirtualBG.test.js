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

test(`Verify noise supp and virtual bg visibility`, async () => {
    await page.assertVisible(page.bottomLeft.virtual_bg_btn)
    await page.assertVisible(page.bottomLeft.noise_supp_btn)
})

test(`Verify noise supp`, async () => {
  for(let i=0; i<3; i++){
    await page.click(page.bottomLeft.noise_supp_btn, page.bottomLeft.virtual_bg_btn)
  }
})

