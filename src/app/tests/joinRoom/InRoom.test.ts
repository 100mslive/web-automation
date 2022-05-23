import { PageWrapper } from "../../PageWrapper";
import { expect, test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async () => {});

test.afterEach(async () => {});

test(`Verify greeting tile for first participant`, async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  await page.assertVisible(page.tiles.first_person_img);
  await page.endRoom();
  await page.close();
});

test(`Verify room URL`, async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  const currentURL = await page.getUrl();
  const meetingURL = currentURL.replace("preview", "meeting");
  expect(meetingURL).toBe(process.env.audio_video_screenshare_url);
  await page.endRoom();
});

//publishing role and non publishing roll
test(`Verify Join peers`, async ({ context }) => {
  const pages = await PageWrapper.openPages(context, 5);

  for (let i = 0; i < 5; i++) {
    await pages[i].click(pages[i].topRight.participant_list);
    for (let j = 0; j < 5; j++) {
      const participantName = pages[i].topRight.participant_number.replace("?", pages[j].localName);
      await pages[i].assertVisible(participantName);
      await pages[i].hasText(participantName, process.env.peer_name + j);
    }
    await pages[i].click("html");
  }
  // await pages[0].click(pages[0].topRight.participant_number.replace("?","0"))
  await pages[0].endRoom();
  await context.close();
});

test(`Verify network on tile and peerlist`, async ({ context }) => {
  const pages = await PageWrapper.openPages(context, 2);
  for (let i = 0; i < 2; i++) {
    await pages[i].click(
      pages[i].topRight.participant_list,
      pages[i].topRight.peerlist_network.replace("?", pages[i].localName)
    );
    await pages[i].assertVisible(pages[i].tiles.network_ontile.replace("?", pages[i].localName));
  }
  await pages[0].endRoom();
  await context.close();
});