/* eslint-disable no-undef */

const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = true;
let cam = true;

test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
});

test.afterEach(async () => {
    await page.endRoom();
    await page.close()
});

test.skip(`Verify Raise Hand Brb icons`, async () => {

  await page.click(page.bottomRight.raise_hand_btn);
  // await page.click(page.bottomRight.brb_btn);
})  

test.skip(`Verify Raise Hand Brb on Tile`, async () => {

    for(let i=0; i<3; i++){
      await page.click(page.bottomRight.raise_hand_btn);
      await page.assertVisible(page.tiles.raiseHand_icon_onTile)
      await page.assertNotVisible(page.tiles.brb_icon_onTile)

      await page.click(page.bottomRight.brb_btn);
      await page.assertVisible(page.tiles.brb_icon_onTile)
      await page.assertNotVisible(page.tiles.raiseHand_icon_onTile)
    }
})
