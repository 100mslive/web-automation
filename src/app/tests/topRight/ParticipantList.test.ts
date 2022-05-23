import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async () => {});

test.afterEach(async ({ context }) => {
  await context.close();
});

const peersCount = Number(process.env.multi_peer_count);

test(`Verify Number & Name in Participant list`, async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  await page.assertVisible(page.topRight.participant_list);
  await page.hasText(page.topRight.participant_list, "1");

  await page.click(page.topRight.participant_list);
  const participant = page.topRight.participant_name.replace("?", page.localName);

  await page.assertVisible(participant);
  await page.hasText(participant, page.localName);
  await page.click("html");
  await page.endRoom();
  await page.close();
});

test(`Verify Number of multiple participants`, async ({ context }) => {
  const pages = await PageWrapper.openPages(context, peersCount);
  for (let i = 0; i < peersCount; i++) {
    await pages[i].hasText(pages[i].topRight.participant_list, `${peersCount}`);
  }
  await pages[0].endRoom();
});
