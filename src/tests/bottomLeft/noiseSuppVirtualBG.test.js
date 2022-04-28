const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomLeft } = require('../../pages/bottomLeft.js');
const PageMethods = require('../../utils/PageMethods.js');
const { Ontile } = require('../../pages/onTile.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomLeft= new BottomLeft();
let onTile= new Ontile();

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

test(`Verify noise supp and virtual bg visibility`, async ({page}) => {
    result = await pageMethods.isElementVisible(page, bottomLeft.virtual_bg_btn, "virtual_bg_btn visibility-")
    pageMethods.assertResult(result, "virtual_bg_btn")

//     result = await pageMethods.isElementVisible(page, bottomLeft.noise_supp_btn, "noise_supp_btn visibility-")
//     pageMethods.assertResult(result, "noise_supp_btn")
})


// test(`Verify noise supp`, async ({page}) => {
//   for(let i=0; i<3; i++){
//     page.waitForTimeout(3000)
//     result = await pageMethods.isElementVisible(page, bottomLeft.noise_supp_btn, "noise_supp_btn visibility-")
//     pageMethods.assertResult(result, "noise_supp_btn")
//     await pageMethods.clickElement(page, bottomLeft.noise_supp_btn, "noise_supp_btn")
//   }
// })

test(`Verify virtual bg action`, async ({page}) => {
  for(let i=0; i<3; i++){
    page.waitForTimeout(3000)
    result = await pageMethods.isElementVisible(page, bottomLeft.virtual_bg_btn, "virtual_bg_btn visibility-")
    pageMethods.assertResult(result, "virtual_bg_btn")
    await pageMethods.clickElement(page, bottomLeft.virtual_bg_btn, "virtual_bg_btn")
  }
})
