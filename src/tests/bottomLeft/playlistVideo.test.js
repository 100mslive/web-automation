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
let mic = "on"
let cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test(`Playlist Video`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomLeft.video_playlist, "video_playlist visibility-")
  pageMethods.assertResult(result, "video_playlist")
  await pageMethods.clickElement(page, bottomLeft.video_playlist, "video_playlist")

  result = await pageMethods.isElementVisible(page, bottomLeft.audio_playlist_item.replace("?","1"), "audio_playlist_item visibility-")
    pageMethods.assertResult(result, "audio_playlist_item")
    await pageMethods.clickElement(page, bottomLeft.audio_playlist_item.replace("?","1"), "audio_playlist_item")

    result = await pageMethods.isElementVisible(page, bottomLeft.playlist_play_pause_btn, "playlist_play_pause_btn visibility-")
    pageMethods.assertResult(result, "playlist_play_pause_btn")
    result = await pageMethods.isElementVisible(page, bottomLeft.playlist_next_btn, "playlist_next_btn visibility-")
    pageMethods.assertResult(result, "playlist_next_btn")
    result = await pageMethods.isElementVisible(page, bottomLeft.playlist_prev_btn, "playlist_prev_btn visibility-")
    pageMethods.assertResult(result, "playlist_prev_btn")

  for(let i=1; i<=2; i++){
    await pageMethods.clickElement(page, bottomLeft.playlist_play_pause_btn, "playlist_play_pause_btn")
    await pageMethods.clickElement(page, bottomLeft.playlist_play_pause_btn, "playlist_play_pause_btn")
    await pageMethods.clickElement(page, bottomLeft.playlist_next_btn, "playlist_next_btn")
    await page.waitForTimeout(1000)
  }
  for(let j=1; j<=2; j++){
    await pageMethods.clickElement(page, bottomLeft.playlist_play_pause_btn, "playlist_play_pause_btn")
    await pageMethods.clickElement(page, bottomLeft.playlist_play_pause_btn, "playlist_play_pause_btn")
    await pageMethods.clickElement(page, bottomLeft.playlist_prev_btn, "playlist_prev_btn")
    await page.waitForTimeout(1000)
  }
  result = await pageMethods.isElementVisible(page, bottomLeft.videoplayer_cross_btn, "videoplayer_cross_btn visibility-")
  pageMethods.assertResult(result, "videoplayer_cross_btn")
  await pageMethods.clickElement(page, bottomLeft.videoplayer_cross_btn, "videoplayer_cross_btn")
})  

