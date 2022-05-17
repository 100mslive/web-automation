/* eslint-disable no-undef */
const { test} = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = "on"
let cam = "on"

test.beforeEach(async () => {
});

test.afterEach(async () => {
});

test(`Mute All`, async ({context}) => {
  var pages = [];
  for(let i=1; i<=5; i++){
    name = process.env.peer_name + i;
    pages[i]= new PageWrapper(await context.newPage());
    await pages[i].preview.gotoMeetingRoom(url, name, mic, cam)
  }

  // await pages[1].bottomCenter.openMoreSettings();

  await pages[1].click(pages[1].bottomCenter.more_settings_btn)

  await pages[1].click(pages[1].bottomCenter.mute_all_btn);


  await pages[1].click(pages[1].bottomCenter.mute_all_apply_btn)

  for(let i=2; i<=5; i++){
    await pages[i].assertVisible(pages[i].bottomCenter.meeting_audio_off_btn)

    await pages[i].assertVisible(pages[i].bottomCenter.meeting_video_off_btn)
  }

  for(let i=1; i<5; i++){
    result = await pages[1].assertVisible(pages[1].ontile.mute_ontile.replace("?",i))
  }
  await pages[1].bottomCenter.endRoom();
  await context.close()

})  
 