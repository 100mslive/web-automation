const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');
let page;
let url=process.env.audio_video_screenshare_url;

test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoPreviewPage(url)
});

test.afterEach(async () => {
    await page.close()
});

// test.afterEach(async ({page}) => {
//   await pageMethods.clickElement(page, previewPage.preview_video_btn, "preview_video_btn")
//     await page.close()
// });

test(`Verify Network Btn`, async () => {
  await page.assertVisible(page.preview.preview_tile_network)
})

test(`Verify Preview Settings Btn`, async () => {
  await page.click(page.preview.preview_audio_btn, page.preview.preview_setting_btn)

  for (let i = 0; i < page.preview.preview_setting_btn_list.length; i++) {
  await page.assertVisible(page.preview.dialoge_select_settings.replace("?",(page.preview.preview_setting_btn_list[i])))
  }
  await page.click(page.preview.dialoge_cross_icon)
})

