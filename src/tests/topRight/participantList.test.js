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

test(`Verify My Number & Name in Participant list`, async () => {
  await page.assertVisible(page.topRight.participant_list);
  await page.hasText(page.topRight.participant_list, "1");

  await page.click(page.topRight.participant_list);
  const participant = page.topRight.participant_number.replace("?","0");

  await page.assertVisible(participant);
  await page.hasText(participant, name);
  await page.click('html');
})  


test(`Verify Number of multiple participants`, async ({context}) => {
  for(let i=2; i<=5; i++){
    name=process.env.peer_name + i;
    const new_page = new PageWrapper(await context.newPage());
    await page.timeout(3000)
    await new_page.preview.gotoMeetingRoom(url, name, mic, cam)
  }
  await page.hasText(page.topRight.participant_list, "5");
})