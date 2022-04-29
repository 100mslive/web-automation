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
let mic = "off"
let cam = "on"
var beam_wait_timeout = Number(process.env.beam_wait_timeout);

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test(`Start and Stop Browser Recording`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn visibility-")
  pageMethods.assertResult(result, "streaming_recording_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.recording_checkbox, "recording_checkbox visibility-")
  pageMethods.assertResult(result, "recording_checkbox")
  await pageMethods.clickElement(page, bottomCenter.recording_checkbox, "recording_checkbox")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_start_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn")

  await page.waitForTimeout(beam_wait_timeout)

  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")
  await pageMethods.clickElement(page, topRight.record_status_dropdown, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.browser_recording, "browser_recording visibility-")
  pageMethods.assertResult(result, "browser_recording")
  await pageMethods.clickElement(page, topRight.browser_recording, "browser_recording")
 
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")
  page.waitForTimeout(2000)
  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_stop_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn")
  
})  

test(`Start and Stop HLS`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn visibility-")
  pageMethods.assertResult(result, "streaming_recording_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.hls_checkbox, "hls_checkbox visibility-")
  pageMethods.assertResult(result, "hls_checkbox")
  await pageMethods.clickElement(page, bottomCenter.hls_checkbox, "hls_checkbox")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_start_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn")

  await page.waitForTimeout(60000)

  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")
  await pageMethods.clickElement(page, topRight.record_status_dropdown, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.streaming_hls, "streaming_hls visibility-")
  pageMethods.assertResult(result, "streaming_hls")
  await pageMethods.clickElement(page, topRight.streaming_hls, "streaming_hls")
 
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_stop_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn")
  
})  

test(`Start and Stop Rtmp`, async ({page, context}) => {

  result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn visibility-")
  pageMethods.assertResult(result, "streaming_recording_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_metting_url_field, "streaming_metting_url_field visibility-")
  pageMethods.assertResult(result, "streaming_metting_url_field")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_rtmp_url_field, "streaming_rtmp_url_field visibility-")
  pageMethods.assertResult(result, "streaming_rtmp_url_field")
  pageMethods.sendText(page, bottomCenter.streaming_rtmp_url_field, process.env.twitch_rtmp_url)

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_start_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn")

  await page.waitForTimeout(60000)

  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")
  await pageMethods.clickElement(page, topRight.record_status_dropdown, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.streaming_rtmp, "streaming_rtmp visibility-")
  pageMethods.assertResult(result, "streaming_rtmp")
  await pageMethods.clickElement(page, topRight.streaming_rtmp, "streaming_rtmp")

  // const page2 = await context.newPage();
  // await page2.waitForTimeout(2000)
  // await page2.goto(bottomCenter.twitch_url)
  // // result =  (page2.locator(bottomCenter.twitch_live_now)).innerText("Live Now");
  // result = await pageMethods.isElementVisible(page, bottomCenter.twitch_live_now, "twitch_live_now visibility-")
  // pageMethods.assertResult(result, "twitch_live_now")
  // await page2.close()

  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_stop_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn")
  
})  

test(`Start and Stop Rtmp Recording`, async ({page, context}) => {

  result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn visibility-")
  pageMethods.assertResult(result, "streaming_recording_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_metting_url_field, "streaming_metting_url_field visibility-")
  pageMethods.assertResult(result, "streaming_metting_url_field")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_rtmp_url_field, "streaming_rtmp_url_field visibility-")
  pageMethods.assertResult(result, "streaming_rtmp_url_field")
  pageMethods.sendText(page, bottomCenter.streaming_rtmp_url_field, process.env.twitch_rtmp_url)


  result = await pageMethods.isElementVisible(page, bottomCenter.recording_checkbox, "recording_checkbox visibility-")
  pageMethods.assertResult(result, "recording_checkbox")
  await pageMethods.clickElement(page, bottomCenter.recording_checkbox, "recording_checkbox")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_start_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn")

  await page.waitForTimeout(60000)

  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")
  await pageMethods.clickElement(page, topRight.record_status_dropdown, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.browser_recording, "browser_recording visibility-")
  pageMethods.assertResult(result, "browser_recording")

  result = await pageMethods.isElementVisible(page, topRight.streaming_rtmp, "streaming_rtmp visibility-")
  pageMethods.assertResult(result, "streaming_rtmp")
  await pageMethods.clickElement(page, topRight.streaming_rtmp, "streaming_rtmp")
  
  //add twitch check
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_stop_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn")
  
})  

test(`Start and Stop HLS Recording`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomCenter.more_settings_btn, "more_settings_btn visibility-")
  pageMethods.assertResult(result, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn visibility-")
  pageMethods.assertResult(result, "streaming_recording_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.hls_checkbox, "hls_checkbox visibility-")
  pageMethods.assertResult(result, "hls_checkbox")
  await pageMethods.clickElement(page, bottomCenter.hls_checkbox, "hls_checkbox")

  result = await pageMethods.isElementVisible(page, bottomCenter.recording_checkbox, "recording_checkbox visibility-")
  pageMethods.assertResult(result, "recording_checkbox")
  await pageMethods.clickElement(page, bottomCenter.recording_checkbox, "recording_checkbox")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_start_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_start_btn, "rtmp_recording_start_btn")

  await page.waitForTimeout(60000)

  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")
  await pageMethods.clickElement(page, topRight.record_status_dropdown, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.record_status_dropdown, "record_status_dropdown visibility-")
  pageMethods.assertResult(result, "record_status_dropdown")

  result = await pageMethods.isElementVisible(page, topRight.streaming_hls, "streaming_hls visibility-")
  pageMethods.assertResult(result, "streaming_hls")
  await pageMethods.clickElement(page, topRight.streaming_hls, "streaming_hls")
 
  await pageMethods.clickElement(page, bottomCenter.more_settings_btn, "more_settings_btn")
  await pageMethods.clickElement(page, bottomCenter.streaming_recording_btn, "streaming_recording_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn visibility-")
  pageMethods.assertResult(result, "rtmp_recording_stop_btn")
  await pageMethods.clickElement(page, bottomCenter.rtmp_recording_stop_btn, "rtmp_recording_stop_btn")
  
})  
