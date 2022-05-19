const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');
let page;
test.beforeEach(async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
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

