/* eslint-disable no-undef */

const { test, expect } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";

test.beforeEach(async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
});

test.afterEach(async () => {
    await page.endRoom();
    await page.close()
});


test(`Verify Join Mic-On Cam-On`, async () => {
  mic = true
  cam = true
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
  
  await page.assertVisible(page.bottomCenter.meeting_audio_on_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)
  await page.assertVisible(page.bottomCenter.meeting_audio_off_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)

  await page.assertVisible(page.bottomCenter.meeting_video_on_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
  await page.assertVisible(page.bottomCenter.meeting_video_off_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
})

test(`Verify Join Mic-On Cam-Off`, async () => {
  mic = true
  cam = false
  await page.preview.gotoMeetingRoom(url, name, mic, cam)

  await page.assertVisible(page.bottomCenter.meeting_audio_on_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)
  await page.assertVisible(page.bottomCenter.meeting_audio_off_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)

  await page.assertVisible(page.bottomCenter.meeting_video_off_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
  await page.assertVisible(page.bottomCenter.meeting_video_on_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
})

test(`Verify Join Mic-Off Cam-On`, async () => {
  mic = false
  cam = true
  await page.preview.gotoMeetingRoom(url, name, mic, cam)

  await page.assertVisible(page.bottomCenter.meeting_audio_off_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)
  await page.assertVisible(page.bottomCenter.meeting_audio_on_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)

  await page.assertVisible(page.bottomCenter.meeting_video_on_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
  await page.assertVisible(page.bottomCenter.meeting_video_off_btn)
  await page.click(page.bottomCenter.meeting_video_btn) 
})

test(`Verify Join Mic-Off Cam-Off`, async () => {
  mic = false
  cam = false
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
  
  await page.assertVisible(page.bottomCenter.meeting_audio_off_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)
  await page.assertVisible(page.bottomCenter.meeting_audio_on_btn)
  await page.click(page.bottomCenter.meeting_audio_btn)

  await page.assertVisible(page.bottomCenter.meeting_video_off_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
  await page.assertVisible(page.bottomCenter.meeting_video_on_btn)
  await page.click(page.bottomCenter.meeting_video_btn)
})

test(`Measure Join Time`, async () => {
  await page.preview.gotoMeetingRoom(url, name, true, true)
  await page.endRoom();
  await page.click(page.roomLeave.join_again_btn)
  console.log("Calculating Join Time");
  const in_time_total = await page.roomLeave.getStartJoinTime();  
  await page.preview.gotoMeetingRoom(url, name, false, false)
  const out_time_total = await page.roomLeave.getEndJoinTime();
  var diff= out_time_total-in_time_total;
  console.log("Join Time Difference = "+ diff);
  expect(diff).toBeLessThan(5000);
});


// test.skip(`Verify Join Room `, async ({page}) => {
  
//   const option = ["on", "off"];
//   for (let i = 0; i < option.length; i++) {
//     let mic=option[i]
//     for (let j = 0; j < option.length; j++) {
//       let cam=option[j]
//       console.log(i,j)
//       console.log("mic:"+mic+ " cam:"+cam)
//       // let page=newPage(page);
//       await previewPage.gotoMeetingRoom(page, url, mic, cam)
//       if(mic === "on"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//       } 
//       if(mic === "off"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//       }
//       if(cam === "on"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_video_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_video_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//       }
//       if(cam === "off"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_video_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_video_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//       }
//       await bottomCenter.leaveRoom(page)
//     }
//   }
// })

// test(`Verify Join `, async (({page}) => {
// const option = ["on", "off"];
// for(let i=0; i<option.length; i++){
//   let mic=option[i]
//     for (let j = 0; j < option.length; j++) {
//       let cam=option[j]
//       console.log(i,j)
//       console.log("mic:"+mic+ " cam:"+cam)

//     test.step(`Verify Join Room `+mic+cam, async ({}) => {
//       await previewPage.gotoMeetingRoom(page, previewPage.url_audio_video_ss, mic, cam)
//       if(mic === "on"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//       } 
//       if(mic === "off"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_audio_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
//       }
//       if(cam === "on"){
        // result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
        // pageMethods.assertResult(result, "meeting_video_on_btn")
        // await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
        // result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
        // pageMethods.assertResult(result, "meeting_video_off_btn")
        // await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//       }
//       if(cam === "off"){
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
//         pageMethods.assertResult(result, "meeting_video_off_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//         result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
//         pageMethods.assertResult(result, "meeting_video_on_btn")
//         await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
//       }
//       await bottomCenter.leaveRoom(page)
//   })
// }}
// })

