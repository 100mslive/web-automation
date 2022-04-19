// homepage.spec.js
const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const PageMethods = require('../../utils/PageMethods.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
let bottomCenter= new BottomCenter();
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let name=process.env.peer_name + "1";

test.beforeEach(async ({page}) => {
  await previewPage.gotoPreviewPage(page, previewPage.url_audio_video_ss)
});

test.afterEach(async ({page}) => {
    await page.close()
});


test(`Verify Name Field`, async ({page}) => {
  const result = await pageMethods.isElementVisible(page, previewPage.preview_name_field, "name_filed_visibility-")
  console.log(result)
  await previewPage.SendName(page, name);
})

test(`Verify Join Button`, async ({page}) => {
  await previewPage.SendName(page, name);
  const result = await pageMethods.isElementVisible(page, previewPage.preview_join_btn, "join btn visibility-")
  console.log(result)
  await pageMethods.clickElement(page, previewPage.preview_audio_btn, "preview_audio_btn")
})

test(`Verify Join Room`, async ({page}) => {
  await previewPage.SendName(page, name);
  const result = await pageMethods.isElementVisible(page, previewPage.preview_join_btn, "join btn visibility-")
  console.log(result)
  await pageMethods.clickElement(page, previewPage.preview_join_btn, "preview_join_btn")
  await bottomCenter.endRoom(page);
})
