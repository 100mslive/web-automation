const { test, expect } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let page;
test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoPreviewPage(url)
});

test.afterEach(async () => {
    // await page.endRoom();
    await page.close()
});

test(`Verify Name Field and Join Button and Room`, async () => {
  await page.sendText(page.preview.preview_name_field, name);
  await page.click(page.preview.preview_join_btn)
  await page.endRoom();
})

test(`Verify room URL`, async () => {
  var currentURL = await page.getUrl();
  currentURL = currentURL.replace("preview", "meeting")
  console.log(currentURL)
  expect(currentURL).toBe(url);
  await page.close();
})
 


