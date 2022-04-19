const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { TopRight } = require('../../pages/topRight.js');
const PageMethods = require('../../utils/PageMethods.js');
const { Ontile } = require('../../pages/onTile.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let ontile= new Ontile();
let topRight= new TopRight();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = "on"
let cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test(`Change name check`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.change_name_btn, "change_name_btn visibility-")
  pageMethods.assertResult(result, "change_name_btn")
  await pageMethods.clickElement(page, bottomCenter.change_name_btn, "change_name_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.change_name_field, "change_name_field visibility-")
  pageMethods.assertResult(result, "change_name_field")
  
  pageMethods.sendText(page, bottomCenter.change_name_field, "peer_2")

  result = await pageMethods.isElementVisible(page, bottomCenter.popup_change_btn, "popup_change_btn visibility-")
  pageMethods.assertResult(result, "popup_change_btn")
  await pageMethods.clickElement(page, bottomCenter.popup_change_btn, "popup_change_btn")

  await pageMethods.clickElement(page, topRight.participant_list, "participant_list")
  await expect(page.locator((topRight.participant_number).replace("?","0"))).toContainText("peer_2");
  await pageMethods.clickElement(page, topRight.participant_number.replace("?","0"), "participant_list")

  result = await pageMethods.isElementVisible(page, ontile.name_onTile.replace("?","0"), "name_onTile visibility-")
  pageMethods.assertResult(result, "name_onTile")

  result = await expect(page.locator(ontile.name_onTile.replace("?","0"))).toContainText("peer_2");
  pageMethods.assertResult(result, "name_onTile")

})  
