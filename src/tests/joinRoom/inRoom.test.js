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
let name=process.env.peer_name + "1";
mic = "on"
cam = "on"

test.beforeEach(async () => {
  // await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    // await bottomCenter.endRoom(page);
    await page.close()
});


test(`Verify greeting tile for first participant`, async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
  result = await pageMethods.isElementVisible(page, ontile.first_person_img, "first_person_img visibility-")
  pageMethods.assertResult(result, "first_person_img")
    await bottomCenter.endRoom(page);

})

test(`Verify room URL`, async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
      const currentURL = page.url();
      console.log("currentURL: " + currentURL);
      if(currentURL === url){
        console.log("URL Match: " + true);
      }
      else{
        console.log("URL Match: " + false);
      }
    await bottomCenter.endRoom(page);
})

test(`Verify Join peers`, async ({context}) => {
  var pages = [];
  for(let i=0; i<5; i++){
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

test(`Verify network on tile and peerlist`, async ({context}) => {
  name=process.env.peer_name + "1";
  pages1 = await context.newPage();
  await previewPage.gotoMeetingRoom(pages1, url, name, mic, cam)

  name = process.env.peer_name + 2;
  pages2 = await context.newPage();
  await previewPage.gotoMeetingRoom(pages2, url, name, mic, cam)

  for(let i=0; i<=1; i++){
    result = await pageMethods.isElementVisible(pages1, ontile.network_ontile.replace("?",i), "network_ontile visibility-")
    pageMethods.assertResult(result, "network_ontile")
    await pageMethods.clickElement(pages1, topRight.participant_list, "participant_list")
    result = await pageMethods.isElementVisible(pages1, topRight.peerlist_network.replace("?",i), "network_ontile visibility-")
    pageMethods.assertResult(result, "network_ontile")
    await pages1.locator('html').click();
  }
  for(let i=0; i<=1; i++){
    result = await pageMethods.isElementVisible(pages2, ontile.network_ontile.replace("?",i), "network_ontile visibility-")
    pageMethods.assertResult(result, "network_ontile")
    await pageMethods.clickElement(pages2, topRight.participant_list, "participant_list")
    result = await pageMethods.isElementVisible(pages2, topRight.peerlist_network.replace("?",i), "network_ontile visibility-")
    pageMethods.assertResult(result, "network_ontile")
    await pages2.locator('html').click();
  }
  await bottomCenter.endRoom(pages1);
})
