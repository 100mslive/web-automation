const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let name=process.env.peer_name + "0";
let page;
test.beforeEach(async () => {
});

test.afterEach(async ({context}) => {
  await context.close();
});

test(`Verify Number & Name in Participant list`, async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  await page.assertVisible(page.topRight.participant_list);
  await page.hasText(page.topRight.participant_list, "1");

  await page.click(page.topRight.participant_list);
  const participant = page.topRight.participant_name.replace("?",page.localName);

  await page.assertVisible(participant);
  await page.hasText(participant, page.localName);
  await page.click('html');
  await page.endRoom();
  await page.close();
})  


test(`Verify Number of multiple participants`, async ({context}) => {
  let pages = await PageWrapper.openPages(context, 5);
  for(let i=0; i<5; i++)
    await pages[i].hasText(pages[i].topRight.participant_list, "5");
  await pages[0].endRoom();
})