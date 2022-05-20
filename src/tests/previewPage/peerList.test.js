const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');


test.beforeEach(async () => {
});

test.afterEach(async () => {
});

test(`Verify Peerlist in Preview Page`, async ({context}) => {
  let pages = await PageWrapper.openPages(context, 5);

  pages[5]= new PageWrapper(await context.newPage());
  await pages[5].preview.gotoPreviewPage()
  await pages[5].click(pages[5].topRight.participant_list)

  for(let i=0; i<5; i++){
    await pages[5].assertVisible(pages[5].topRight.participant_number.replace("?",pages[i].localName));
    await pages[5].hasText(pages[5].topRight.participant_number.replace("?",pages[i].localName), process.env.peer_name + i);
  }
  await pages[0].endRoom();
  await context.close();
})
