/* eslint-disable no-undef */

const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = true;
let cam = false;

test.beforeEach(async () => {
});

test.afterEach(async () => {
});

test(`Verify Peerlist in Preview Page`, async ({context}) => {
  var pages = [];
  pages[0]= new PageWrapper(await context.newPage());
  await pages[0].preview.gotoPreviewPage(url)

  for(let i=1; i<5; i++){
    name = process.env.peer_name + i;
    pages[i]= new PageWrapper(await context.newPage());
    await pages[i].preview.gotoMeetingRoom(url, name, mic, cam)
    await pages[0].timeout(6000)
  }
  await pages[0].timeout(5000);
  await pages[0].click(pages[0].topRight.participant_list)

  for(let i=1; i<5; i++){
    await pages[0].assertVisible(pages[0].topRight.participant_number.replace("?",i-1));
    await pages[0].hasText(pages[0].topRight.participant_number.replace("?",i-1), process.env.peer_name + i);
  }
  await pages[1].endRoom();
  await context.close();
})
