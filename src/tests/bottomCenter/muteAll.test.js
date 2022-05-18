const { test} = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

test(`Mute All`, async ({context}) => {
  var pages = await PageWrapper.openPages(context, 5);

  await pages[0].bottomCenter.muteAll();

  // peer tile has muted
  for (let i = 1; i<5; i++) {
    // my footer is showing me muted
    await pages[i].assertLocalAudioState(false);
    await pages[i].assertLocalVideoState(false);

    // others are seeing me as muted on video tile
    for(let j=0; j<5; j++) {
      await pages[j].tiles.assertAudioState(pages[i].localName, false);
    }
  }

  await pages[0].endRoom();
  await context.close()
})  
 