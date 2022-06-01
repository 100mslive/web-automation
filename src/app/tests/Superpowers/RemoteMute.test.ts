import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

test.beforeEach(async () => {});

test.afterEach(async () => {});

test(`Remote Mute/Unmute Audio`, async ({ context }) => {
  const pages = await PageWrapper.openPages(context, 2, {
    mic: true,
    cam: true,
  });

  await pages[0].hover(pages[0].center.participant_tile.replace("?", pages[1].localName));
  await pages[0].click(pages[0].center.participant_tile_menu_btn.replace("?", pages[1].localName));

  await pages[0].click(pages[0].center.tile_menu_mute_audio);
  await pages[1].acceptDialogWhenPrompted();
  await pages[1].assertLocalAudioState(false);

  //add more verify
  await pages[0].endRoom();
  await context.close();
});
