const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomLeft } = require('../../pages/bottomLeft.js');
const { TopRight } = require('../../pages/TopRight.js');
const PageMethods = require('../../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomLeft= new BottomLeft();
let topRight= new TopRight();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = "on"
let cam = "off"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test(`Verify My Name in Participant list`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, topRight.participant_list, "participant_list visibility-")
  pageMethods.assertResult(result, "participant_list")
  await pageMethods.clickElement(page, topRight.participant_list, "participant_list")

  result = await pageMethods.isElementVisible(page, topRight.participant_number.replace("?","0"), "participant_number visibility-")
  pageMethods.assertResult(result, "participant_number")

  await expect(page.locator(topRight.participant_number.replace("?","0"))).toContainText(name);

  await pageMethods.clickElement(page, topRight.participant_number.replace("?","0"), "participant_number")

})  

test(`Verify My Number of participants`, async ({page}) => {
  result = await pageMethods.isElementVisible(page, topRight.participant_list, "participant_list visibility-")
  pageMethods.assertResult(result, "participant_list")
  await expect(page.locator(topRight.participant_list)).toContainText("1");
})  

test(`Verify My Number of multiple participants`, async ({page, context}) => {

  for(let i=2; i<=5; i++){
    
    const new_page = await context.newPage();
    await new_page.waitForTimeout(3000)
    await previewPage.gotoMeetingRoom(new_page, url, mic, cam)
  }

  result = await pageMethods.isElementVisible(page, topRight.participant_list, "participant_list visibility-")
  pageMethods.assertResult(result, "participant_list")
  await expect(page.locator(topRight.participant_list)).toContainText("5");
})  