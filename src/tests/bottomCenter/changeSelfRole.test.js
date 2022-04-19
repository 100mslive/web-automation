const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomLeft } = require('../../pages/bottomLeft.js');
const { TopRight } = require('../../pages/topRight.js');
const PageMethods = require('../../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomLeft= new BottomLeft();
let topRight= new TopRight();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let  mic = "on"
let cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test(`Change self Role`, async ({page}) => {

  for(i=0; i<=5; i++){
    if(i==3)continue
      result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
      pageMethods.assertResult(result, "more_settings_btn")
      await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

      result = await pageMethods.isElementVisible(page, bottomCenter.change_my_role_btn, "change_my_role_btn visibility-")
      pageMethods.assertResult(result, "change_my_role_btn")
      await pageMethods.clickElement(page, bottomCenter.change_my_role_btn, "change_my_role_btn")

      console.log((bottomCenter.change_to_role_)+i)
      result = await pageMethods.isElementVisible(page, (bottomCenter.change_to_role_).replace("?",i), "change_to_role_ visibility-")
      pageMethods.assertResult(result, "change_to_role_")
      bottom_center_role= await page.locator(bottomCenter.change_to_role_.replace("?",i)).textContent()
      await pageMethods.clickElement(page, (bottomCenter.change_to_role_).replace("?",i), "change_to_role_")
      console.log(bottom_center_role)

      result = await pageMethods.isElementVisible(page, (topRight.participant_list), "participant_list visibility-")
      pageMethods.assertResult(result, "participant_list")
      await pageMethods.clickElement(page, (topRight.participant_list), "participant_list")

      result = await pageMethods.isElementVisible(page, (topRight.participant_role_heading.replace("?",bottom_center_role)), "participant_role_heading visibility-")
      pageMethods.assertResult(result, "participant_role_heading")

      await page.locator('html').click();
  }
})  

