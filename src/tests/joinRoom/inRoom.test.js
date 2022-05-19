const { test, expect } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');
let page;
test.beforeEach(async () => {
});

test.afterEach(async () => {
});

test(`Verify greeting tile for first participant`, async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  await page.assertVisible(page.tiles.first_person_img)
  await page.endRoom();
  await page.close()
})

test(`Verify room URL`, async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  await page.timeout(2000);
  var currentURL = await page.getUrl();
  currentURL = currentURL.replace("preview", "meeting");
  expect(currentURL).toBe(process.env.audio_video_screenshare_url);
  await page.endRoom();
})

//publishing role and non publishing roll
test.skip(`Verify Join peers`, async ({context}) => {
  var pages = [];
  for(let i=0; i<5; i++){
    pages[i]= new PageWrapper(await context.newPage());
    await pages[i].gotoMeetingRoom()
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

test.skip(`Verify network on tile and peerlist`, async ({context}) => {
  var pages = await PageWrapper.openPages(context, 2);

  await pages[0].click(pages[0].topRight.participant_list, pages[0].topRight.peerlist_network.replace("?",1));
  await pages[0].assertVisible(pages[0].tiles.network_ontile.replace("?",0));
  await pages[0].endRoom();
  await context.close();
})
