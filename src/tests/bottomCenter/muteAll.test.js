const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomLeft } = require('../../pages/bottomLeft.js');
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

test.beforeEach(async () => {
  // await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    // await bottomCenter.endRoom(page);
    await page.close()
});

test(`Mute All`, async ({context}) => {
  var pages = [];
  for(let i=1; i<=5; i++){
    name = process.env.peer_name + i;
    pages[i]= await context.newPage();
    await previewPage.gotoMeetingRoom(pages[i], url, name, mic, cam)
  }

  result = await pageMethods.isElementVisible(pages[1], bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(pages[1], bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(pages[1], bottomCenter.mute_all_btn, "mute_all_btn visibility-")
  pageMethods.assertResult(result, "mute_all_btn")
  await pageMethods.clickElement(pages[1], bottomCenter.mute_all_btn, "mute_all_btn")

  result = await pageMethods.isElementVisible(pages[1], bottomCenter.mute_all_apply_btn, "mute_all_apply_btn visibility-")
  pageMethods.assertResult(result, "mute_all_apply_btn")
  await pageMethods.clickElement(pages[1], bottomCenter.mute_all_apply_btn, "mute_all_btn")

  for(let i=2; i<=5; i++){
    result = await pageMethods.isElementVisible(pages[i], bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
    pageMethods.assertResult(result, "meeting_audio_off_btn")
    result = await pageMethods.isElementVisible(pages[i], bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
    pageMethods.assertResult(result, "meeting_video_off_btn")
  }

  for(let i=1; i<5; i++){
    result = await pageMethods.isElementVisible(pages[1], ontile.mute_ontile.replace("?",i), "mute_ontile visibility-")
    pageMethods.assertResult(result, "mute_ontile")
  }
  await bottomCenter.endRoom(pages[1]);
})  
 