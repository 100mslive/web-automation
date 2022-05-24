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
  expect(meetingURL).toContain(process.env.audio_video_screenshare_url);
  await page.endRoom();
});

const peersCount = Number(process.env.multi_peer_count);

//publishing role and non publishing roll
test(`Verify Join peers`, async ({ context }) => {
  const pages = await PageWrapper.openPages(context, peersCount);

  for (let i = 0; i < peersCount; i++) {
    await pages[i].click(pages[i].topRight.participant_list);
    for (let j = 0; j < peersCount; j++) {
      const participantName = pages[i].topRight.participant_name.replace("?", pages[j].localName);
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
  const pages = await PageWrapper.openPages(context, 2, { mic: true, cam: true });
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

test(`Beam Url check`, async ({ page: nativePage }) => {
  let url = process.env.audio_video_screenshare_url+'/?skip_preview=true' ;
  url = url.replace("meeting", "preview");
  console.log(url);
  page = new PageWrapper(nativePage);
  await page.goto({url});
  await page.assertVisible(page.tiles.name_onTile.replace("?", "Beam"));
  await page.close();
});
