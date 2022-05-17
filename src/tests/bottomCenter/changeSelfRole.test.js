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
    await page.endRoom();
    await page.close()
});

test(`Change self Role`, async () => {
//Chech abscence and prescence of tracks
//change role permission not present
  for(i=0; i<=5; i++){
    if(i==3)continue
      await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.change_my_role_btn)

      const changeRole = page.bottomCenter.change_to_role_.replace("?",i);

      const bottom_center_role= await page.getText(changeRole)
      await page.click(changeRole)

      await page.click(page.topRight.participant_list)
      await page.assertVisible(page.topRight.participant_role_heading.replace("?",bottom_center_role))

      await page.click('html');
  }
})  

