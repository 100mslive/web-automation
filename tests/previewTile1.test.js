const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../pages/previewPage.js');
const PageMethods = require('../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let name=process.env.peer_name + "1";

test.beforeEach(async ({page}) => {
  await previewPage.gotoPreviewPage(page, previewPage.url_audio_video_ss)
});

test.afterEach(async ({page}) => {
    await pageMethods.clickElement(page, previewPage.preview_video_btn, "preview_video_btn")
    await page.close()
});


test(`Verify MicBtn on off`, async ({page}) => {
  let result = await pageMethods.isElementVisible(page, previewPage.preview_audio_on_btn, "preview_audio_on_btn visibility-")
  pageMethods.assertResult(result, "preview_audio_on_btn")
  await pageMethods.clickElement(page, previewPage.preview_audio_btn, "preview_audio_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_audio_off_btn, "preview_audio_off_btn visibility-")
  pageMethods.assertResult(result, "preview_audio_off_btn")
  await pageMethods.clickElement(page, previewPage.preview_audio_btn, "preview_audio_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_audio_on_btn, "preview_audio_on_btn visibility-")
  pageMethods.assertResult(result, "preview_audio_on_btn")
})

test(`Verify CamBtn on off`, async ({page}) => {
  let result = await pageMethods.isElementVisible(page, previewPage.preview_video_on_btn, "preview_video_on_btn visibility-")
  pageMethods.assertResult(result, "preview_video_on_btn")
  await pageMethods.clickElement(page, previewPage.preview_video_btn, "preview_video_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_video_off_btn, "preview_video_off_btn visibility-")
  pageMethods.assertResult(result, "preview_video_off_btn")
  await pageMethods.clickElement(page, previewPage.preview_video_btn, "preview_video_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_video_on_btn, "preview_video_on_btn visibility-")
  pageMethods.assertResult(result, "preview_video_on_btn")
})

test(`Verify video tile and avatar tile`, async ({page}) => {
  await previewPage.SendName(page, name);
  let result = await pageMethods.isElementVisible(page, previewPage.preview_video_on_btn, "preview_video_on_btn visibility-")
  pageMethods.assertResult(result, "preview_video_on_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_tile, "preview_tile visibility-")
  pageMethods.assertResult(result, "preview_tile")
  result = await pageMethods.isElementNotVisible(page, previewPage.preview_avatar_tile, "preview_avatar_tile not visibile-")
  pageMethods.assertResult(result, "preview_avatar_tile")

  await pageMethods.clickElement(page, previewPage.preview_video_btn, "preview_video_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_video_off_btn, "preview_video_off_btn visibility-")
  pageMethods.assertResult(result, "preview_video_on_btn")
  result = await pageMethods.isElementVisible(page, previewPage.preview_avatar_tile, "preview_avatar_tile visibility-")
  pageMethods.assertResult(result, "preview_avatar_tile")

})


