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

test(`Playlist Audio`, async () => {
  await page.timeout(5000);

  await page.click(
    // timeout,
    page.footer.audio_playlist,
    page.footer.audio_playlist_item.replace("?", "1")
  );

  for (let i = 1; i <= 5; i++) {
    await page.click(
      page.footer.playlist_play_pause_btn,
      page.footer.playlist_play_pause_btn,
      page.footer.playlist_next_btn
    );
    await page.timeout(2000);
  }
  for (let j = 1; j <= 5; j++) {
    await page.click(
      page.footer.playlist_play_pause_btn,
      page.footer.playlist_play_pause_btn,
      page.footer.playlist_prev_btn
    );
    await page.timeout(2000);
  }
  await page.click(page.footer.playlist_cross_btn);
});

//webhook track added in webhook
test(`Playlist Audio check header`, async () => {
  // await page.timeout(500);
  await page.clickWithTimeout(
    timeout,
    page.footer.audio_playlist,
    page.footer.audio_playlist_item.replace("?", "1")
  );
  await page.click("html");

  await page.click(
    page.header.record_status_dropdown,
    page.header.playlist_playing_play,
    page.header.record_status_dropdown,
    page.header.playlist_playing_pause
  );

  await page.assertVisible(page.header.playlist_playing);
  await page.click("html");
});
