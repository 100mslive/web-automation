const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const PageMethods = require('../../utils/PageMethods.js');
const { RoomLeave } = require('../../pages/roomLeave.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let roomLeave= new RoomLeave();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";

test.beforeEach(async ({page}) => {
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test(`Verify Join Mic-On Cam-On`, async ({page}) => {
  mic = "on"
  cam = "on"
  console.log("mic:"+mic+ " cam:"+cam)
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
  
  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
  pageMethods.assertResult(result, "meeting_audio_on_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
  pageMethods.assertResult(result, "meeting_audio_off_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
  pageMethods.assertResult(result, "meeting_video_on_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
  pageMethods.assertResult(result, "meeting_video_off_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
})

test(`Verify Join Mic-On Cam-Off`, async ({page}) => {
  mic = "on"
  cam = "off"
  console.log("mic:"+mic+ " cam:"+cam)
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
  
  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
  pageMethods.assertResult(result, "meeting_audio_on_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
  pageMethods.assertResult(result, "meeting_audio_off_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")

        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
        pageMethods.assertResult(result, "meeting_video_off_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
        pageMethods.assertResult(result, "meeting_video_on_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
})

test(`Verify Join Mic-Off Cam-On`, async ({page}) => {
  mic = "off"
  cam = "on"
  console.log("mic:"+mic+ " cam:"+cam)
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
  
        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
        pageMethods.assertResult(result, "meeting_audio_off_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
        pageMethods.assertResult(result, "meeting_audio_on_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")

  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
  pageMethods.assertResult(result, "meeting_video_on_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
  result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
  pageMethods.assertResult(result, "meeting_video_off_btn")
  await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
})

test(`Verify Join Mic-Off Cam-Off`, async ({page}) => {
  mic = "off"
  cam = "off"
  console.log("mic:"+mic+ " cam:"+cam)
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
  
        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_off_btn, "meeting_audio_off_btn visibility-")
        pageMethods.assertResult(result, "meeting_audio_off_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")
        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_audio_on_btn, "meeting_audio_on_btn visibility-")
        pageMethods.assertResult(result, "meeting_audio_on_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_audio_btn, "meeting_audio_btn")

        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_off_btn, "meeting_video_off_btn visibility-")
        pageMethods.assertResult(result, "meeting_video_off_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
        result = await pageMethods.isElementVisible(page, bottomCenter.meeting_video_on_btn, "meeting_video_on_btn visibility-")
        pageMethods.assertResult(result, "meeting_video_on_btn")
        await pageMethods.clickElement(page, bottomCenter.meeting_video_btn, "meeting_video_btn")
})


test(`Measure Join Time`, async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, "on", "on")
  await bottomCenter.leaveRoom(page);
  await pageMethods.clickElement(page, roomLeave.join_again_btn, "join_again_btn")
  console.log("Calculating Join Time");
  const in_time_total = await roomLeave.getStartJoinTime(page);  
  await previewPage.gotoMeetingRoom(page, url, name, "off", "off")
  const out_time_total = await roomLeave.getEndJoinTime(page);
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


//   test.only(`Verify Join Room `, async ({context}) => {
//     // await browserUtils.launchBrowser()
//     let page = await context.newPage 
//     await page.goto('https://playwright.dev/');
//     const title = page.locator('.navbar__inner .navbar__title');
//     await expect(title).toHaveText('Playwright');
// })
