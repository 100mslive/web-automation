const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const PageMethods = require('../../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();

test.beforeEach(async ({page}) => {
  await previewPage.gotoPreviewPage(page, previewPage.url_audio_video_ss)
});

test.afterEach(async ({page}) => {
  await pageMethods.clickElement(page, previewPage.preview_video_btn, "preview_video_btn")
    await page.close()
});


test(`Verify Network Btn`, async ({page}) => {
  let result = await pageMethods.isElementVisible(page, previewPage.preview_tile_network, "preview_tile_network visibility-")
  pageMethods.assertResult(result, "preview_tile_network")
})

test(`Verify Preview Settings Btn`, async ({page}) => {
  let result = await pageMethods.isElementVisible(page, previewPage.preview_setting_btn, "preview_setting_btn visibility-")
  pageMethods.assertResult(result, "preview_setting_btn")
  await pageMethods.clickElement(page, previewPage.preview_setting_btn, "preview_setting_btn")

  for (let i = 0; i < previewPage.preview_setting_btn_list.length; i++) {
    result = await pageMethods.isElementVisible(page, previewPage.dialoge_select_settings.replace("?",(previewPage.preview_setting_btn_list[i])), "preview_setting_btn_list visibility-")
    pageMethods.assertResult(result, "preview_setting_btn_list")
  }

  await pageMethods.clickElement(page, previewPage.dialoge_cross_icon, "dialoge_cross_icon")
})

