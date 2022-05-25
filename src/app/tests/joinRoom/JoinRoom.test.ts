import { PageWrapper } from "../../PageWrapper";
import { expect, test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async () => {});

test.afterEach(async () => {
  console.log("aftereach");
  await page.endRoom();
  await page.close();
});

test.describe("verify join", () => {
  test(`Verify Join Mic-On Cam-On`, async ({ page: nativePage }) => {
    page = await PageWrapper.openMeetingPage(nativePage, {
      mic: true,
      cam: true,
    });

    await page.assertVisible(page.bottomCenter.meeting_audio_on_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);
    await page.assertVisible(page.bottomCenter.meeting_audio_off_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);

    await page.assertVisible(page.bottomCenter.meeting_video_on_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
    await page.assertVisible(page.bottomCenter.meeting_video_off_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
  });

  test(`Verify Join Mic-On Cam-Off`, async ({ page: nativePage }) => {
    page = await PageWrapper.openMeetingPage(nativePage, {
      mic: true,
      cam: false,
    });

    await page.assertVisible(page.bottomCenter.meeting_audio_on_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);
    await page.assertVisible(page.bottomCenter.meeting_audio_off_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);

    await page.assertVisible(page.bottomCenter.meeting_video_off_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
    await page.assertVisible(page.bottomCenter.meeting_video_on_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
  });

  test(`Verify Join Mic-Off Cam-On`, async ({ page: nativePage }) => {
    page = await PageWrapper.openMeetingPage(nativePage, {
      mic: false,
      cam: true,
    });

    await page.assertVisible(page.bottomCenter.meeting_audio_off_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);
    await page.assertVisible(page.bottomCenter.meeting_audio_on_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);

    await page.assertVisible(page.bottomCenter.meeting_video_on_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
    await page.assertVisible(page.bottomCenter.meeting_video_off_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
  });

  test(`Verify Join Mic-Off Cam-Off`, async ({ page: nativePage }) => {
    page = await PageWrapper.openMeetingPage(nativePage, {
      mic: false,
      cam: false,
    });
    await page.assertVisible(page.bottomCenter.meeting_audio_off_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);
    await page.assertVisible(page.bottomCenter.meeting_audio_on_btn);
    await page.click(page.bottomCenter.meeting_audio_btn);

    await page.assertVisible(page.bottomCenter.meeting_video_off_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
    await page.assertVisible(page.bottomCenter.meeting_video_on_btn);
    await page.click(page.bottomCenter.meeting_video_btn);
  });

  test.only(`Measure Join Time`, async ({ page: nativePage }) => {
    const url = process.env.audio_video_screenshare_url.replace("meeting", "leave");
    page = new PageWrapper(nativePage);
    await page.goto({ url });

    await page.click(page.leavePage.join_again_btn);
    console.log("Calculating Join Time");
    const start = performance.now();
    await page.gotoMeetingRoom();
    const diff = performance.now() - start;
    console.log(`Join Time Difference = ${diff}`);
    expect(diff).toBeLessThan(10000);
  });
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
