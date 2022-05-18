const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let page;

test.beforeEach(async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {
    await page.endRoom();
    await page.close()
});

test(`Change name check`, async () => {
  const oldName = page.localName;
  const newName = "peer_new_name";

  await page.tiles.assertTilePresence(oldName, true);
  await page.topRight.assertPeerInPeerList(oldName, true);

  await page.bottomCenter.changeName(newName);

  // name changed for both tile and participant list
  await page.topRight.assertPeerInPeerList(oldName, false);
  await page.tiles.assertTilePresence(oldName, false);
  
  await page.topRight.assertPeerInPeerList(newName, true);
  await page.tiles.assertTilePresence(newName, true);
  
  // const peerTileName = page.tiles.getNameOnTile(0);
  // await page.hasText(peerTileName, "peer_2");
})  
