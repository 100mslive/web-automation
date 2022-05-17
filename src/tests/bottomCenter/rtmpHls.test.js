/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = "off"
let cam = "on"
var beam_wait_timeout = Number(process.env.beam_wait_timeout);

test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
});

test.afterEach(async () => {
    await page.endRoom();
    await page.close()
});

//webhook implementation
test(`Start and Stop Browser Recording`, async () => {

  await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.recording_checkbox, page.bottomCenter.rtmp_recording_start_btn)

  await page.timeout(beam_wait_timeout)

  await page.click(page.topRight.record_status_dropdown, page.topRight.browser_recording, page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.rtmp_recording_stop_btn)
})  

//hit hls m3u8 file and download
test(`Start and Stop HLS`, async () => {

  await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.hls_checkbox, page.bottomCenter.rtmp_recording_start_btn)

  await page.timeout(40000)

  await page.click(page.topRight.record_status_dropdown, page.topRight.streaming_hls, page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.rtmp_recording_stop_btn)
})  

test(`Start and Stop Rtmp`, async () => {

  await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn)

  page.sendText(page.bottomCenter.streaming_rtmp_url_field, process.env.twitch_rtmp_url)

  await page.click(page.bottomCenter.rtmp_recording_start_btn)

  await page.timeout(40000)

  await page.click(page.topRight.record_status_dropdown, page.topRight.streaming_rtmp, page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.rtmp_recording_stop_btn)

  // const page2 = await context.newPage();
  // await page2.waitForTimeout(2000)
  // await page2.goto(bottomCenter.twitch_url)
  // // result =  (page2.locator(bottomCenter.twitch_live_now)).innerText("Live Now");
  // result = await pageMethods.isElementVisible(page, bottomCenter.twitch_live_now, "twitch_live_now visibility-")
  // pageMethods.assertResult(result, "twitch_live_now")
  // await page2.close()
})  

test(`Start and Stop Rtmp Recording`, async () => {

  await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.recording_checkbox)

  page.sendText(page.bottomCenter.streaming_rtmp_url_field, process.env.twitch_rtmp_url)
  
  await page.click(page.bottomCenter.rtmp_recording_start_btn)

  await page.timeout(40000)

  await page.click(page.topRight.record_status_dropdown, page.topRight.browser_recording, page.topRight.record_status_dropdown, page.topRight.streaming_rtmp, page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.rtmp_recording_stop_btn)
  //add twitch check
})  

test(`Start and Stop HLS Recording`, async () => {

  await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.hls_checkbox, page.bottomCenter.recording_checkbox, page.bottomCenter.rtmp_recording_start_btn)

  await page.timeout(40000)

  await page.click(page.topRight.record_status_dropdown, page.topRight.streaming_hls, page.topRight.record_status_dropdown, page.topRight.hls_recording, page.bottomCenter.more_settings_btn, page.bottomCenter.streaming_recording_btn, page.bottomCenter.rtmp_recording_stop_btn)
  
})  
