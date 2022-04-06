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
let cam = "on"

test.beforeEach(async ({page}) => {
  // await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test.skip(`Screenshare check`, async ({context}) => {
  const page2 = await context.newPage();
  await previewPage.gotoMeetingRoom(page2, url, name, mic, cam)

  result = await pageMethods.isElementVisible(page2, bottomCenter.screen_share_btn, "screen_share_btn visibility-")
  pageMethods.assertResult(result, "screen_share_btn")
  await pageMethods.clickElement(page2, bottomCenter.screen_share_btn, "screen_share_btn")
  await page2.waitForTimeout(2000)

//not able to accept screen share
  //code to accept popup dialogue on pageone
  // page.on('dialog', (dialog) => dialog.accept())
  page2.on('dialog', async(dialog)=>{
    console.log(dialog.message());
    await dialog.accept();
})

  result = await pageMethods.isElementVisible(page2, bottomCenter.stop_screen_share_btn, "stop_screen_share_btn visibility-")
  pageMethods.assertResult(result, "stop_screen_share_btn")
  await pageMethods.clickElement(page2, bottomCenter.stop_screen_share_btn, "stop_screen_share_btn")

})  
 