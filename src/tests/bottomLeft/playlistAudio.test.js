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

test(`Playlist Audio`, async () => {

  await page.click(page.bottomLeft.audio_playlist, page.bottomLeft.audio_playlist_item.replace("?","1"));

  for(let i=1; i<=5; i++){
    await page.click(page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_next_btn);
    await page.timeout(2000);
  }
  for(let j=1; j<=5; j++){
    await page.click(page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_play_pause_btn, page.bottomLeft.playlist_prev_btn);
    await page.timeout(2000);
  }
  await page.click(page.bottomLeft.playlist_cross_btn);
})  

//webhook track added in webhook
test(`Playlist Audio check TopRight`, async () => {

  await page.click(page.bottomLeft.audio_playlist, page.bottomLeft.audio_playlist_item.replace("?","1"));
  await page.click('html');
    
  await page.click(page.topRight.record_status_dropdown, page.topRight.playlist_playing_play, page.topRight.record_status_dropdown, page.topRight.playlist_playing_pause);

  await page.assertVisible(page.topRight.playlist_playing);
  await page.click('html');
})  
