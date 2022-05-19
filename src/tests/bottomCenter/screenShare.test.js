/* eslint-disable no-undef */
const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');
let page;
test.beforeEach(async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {
    await page.endRoom();
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
 