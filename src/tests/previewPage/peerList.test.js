const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const PageMethods = require('../../utils/PageMethods.js');
const { TopRight } = require('../../pages/TopRight.js');
const { Ontile } = require('../../pages/onTile.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let ontile= new Ontile();
let topRight= new TopRight();


let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "0";
mic = "on"
cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoPreviewPage(page, url)
});

test.afterEach(async ({page}) => {
    // await bottomCenter.endRoom(page);
    await page.close()
});


test(`Verify room URL`, async ({page}) => {
      url = url.replace("meeting","preview")
      const currentURL = page.url();
      console.log("currentURL: " + currentURL);
      if(currentURL === url){
        console.log("URL Match: " + true);
      }
      else{
        console.log("URL Match: " + false);
      }
})

test(`Verify Peerlist in Preview Page`, async ({context}) => {
  var pages = [];
  for(let i=1; i<5; i++){
    name = process.env.peer_name + i;
    pages[i]= await context.newPage();
    await previewPage.gotoMeetingRoom(pages[i], url, name, mic, cam)
  }

  result = await pageMethods.isElementVisible(pages[0], topRight.participant_list, "participant_list visibility-")
  pageMethods.assertResult(result, "participant_list")
  await pageMethods.clickElement(pages[0], topRight.participant_list, "participant_list")
  for(let i=1; i<5; i++){
    result = await pageMethods.isElementVisible(pages[0], topRight.participant_number.replace("?",i), "participant_number visibility-")
    pageMethods.assertResult(result, "participant_number")

    await expect(pages[0].locator(topRight.participant_number.replace("?",i))).toContainText(process.env.peer_name + i);
  }
  await pageMethods.clickElement(pages[0], topRight.participant_number.replace("?","0"), "participant_number")
  await bottomCenter.endRoom(pages[0]);

})
