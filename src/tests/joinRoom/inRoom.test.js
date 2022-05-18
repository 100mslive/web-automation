/* eslint-disable no-undef */

const { test, expect } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = true;
let cam = true;

test.beforeEach(async () => {
});

test.afterEach(async () => {
});

test(`Verify greeting tile for first participant`, async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
  await page.assertVisible(page.tiles.first_person_img)
  await page.endRoom();
  await page.close()
})

test(`Verify room URL`, async ({page: nativePage}) => {
  page = new PageWrapper(nativePage);
  await page.preview.gotoMeetingRoom(url, name, mic, cam)
  await page.timeout(2000);
  const currentURL = await page.getUrl();
  expect(currentURL).toBe(url);
  await page.endRoom();
})

//publishing role and non publishing roll
test(`Verify Join peers`, async ({context}) => {
  var pages = [];
  for(let i=0; i<5; i++){
    name = process.env.peer_name + i;
    pages[i]= new PageWrapper(await context.newPage());
    await pages[i].preview.gotoMeetingRoom(url, name, mic, cam)
    pages[i].timeout(2000);
  }

  await pages[0].click(pages[0].topRight.participant_list)

  for(let i=1; i<5; i++){
    await pages[0].assertVisible(pages[0].topRight.participant_number.replace("?",i))

    const participantName = pages[0].topRight.participant_number.replace("?",i);
    // expect(pages[0].locator(participantName).toContainText(process.env.peer_name + i));
    pages[0].hasText(participantName, process.env.peer_name + i);

  }
  // await pages[0].click(pages[0].topRight.participant_number.replace("?","0"))
  await pages[0].click('html')
  await pages[0].endRoom();
  await context.close();
})

test(`Verify network on tile and peerlist`, async ({context}) => {
  name=process.env.peer_name + 1;
  page1= new PageWrapper(await context.newPage());
  await page1.preview.gotoMeetingRoom(url, name, mic, cam);

  name = process.env.peer_name + 2;
  page2 = new PageWrapper(await context.newPage());
  await page2.preview.gotoMeetingRoom(url, name, mic, cam);
  await page1.timeout(2000);

  await page1.click(page1.topRight.participant_list, page1.topRight.peerlist_network.replace("?",1));
  await page1.assertVisible(page1.tiles.network_ontile.replace("?",0));
  await page1.endRoom();
  await context.close();
})
