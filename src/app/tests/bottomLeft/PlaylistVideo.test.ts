import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

let page: PageWrapper;
let timeout: 2000;

test.beforeEach(async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {
  await page.endRoom();
  await page.close();
});

test(`Playlist Video`, async () => {
  await page.clickWithTimeout(
    timeout,
    page.bottomLeft.video_playlist,
    page.bottomLeft.audio_playlist_item.replace("?", "1")
  );

  await page.click(
    page.bottomLeft.playlist_play_pause_btn,
    page.bottomLeft.playlist_play_pause_btn,
    page.bottomLeft.playlist_next_btn
  );
  await page.timeout(2000);

  await page.click(
    page.bottomLeft.playlist_play_pause_btn,
    page.bottomLeft.playlist_play_pause_btn,
    page.bottomLeft.playlist_prev_btn
  );
  await page.click(page.bottomLeft.videoplayer_cross_btn);
});
