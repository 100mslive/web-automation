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

test(`Playlist Video`, async () => {
  await page.click(page.bottomLeft.video_playlist, page.bottomLeft.audio_playlist_item.replace("?","1"));

  for(let i=1; i<=2; i++){
    await page.click(page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_next_btn);
    await page.timeout(2000);
  }
  for(let j=1; j<=2; j++){
    await page.click(page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_prev_btn);
    await page.timeout(2000);
  }
  await page.click(page.bottomLeft.videoplayer_cross_btn);
})  

