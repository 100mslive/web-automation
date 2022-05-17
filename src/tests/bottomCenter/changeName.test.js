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

test(`Change name check`, async () => {
  // change name from
  await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.change_name_btn);
  await page.sendText(page.bottomCenter.change_name_field, "peer_2");
  await page.click(page.bottomCenter.popup_change_btn);

  // check in participant list
  await page.topRight.openParticipantList();
  const peerInList = page.topRight.getPeerLocator(0);
  await page.hasText(peerInList, "peer_2");
  await page.topRight.closeParticipantList();

  // check on peer's tile
  const peerTileName = page.ontile.getNameOnTile(0);
  await page.hasText(peerTileName, "peer_2");
})  
