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

test.skip(`Change self Role`, async () => {
//Chech abscence and prescence of tracks
//change role permission not present
  for(let i=0; i<=5; i++){
    if(i==3)continue
      await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.change_my_role_btn)

      const changeRole = page.bottomCenter.change_to_role_.replace("?",i);

      const bottom_center_role= await page.getText(changeRole)
      await page.click(changeRole)

      await page.click(page.topRight.participant_list)
      await page.assertVisible(page.topRight.participant_role_heading.replace("?",bottom_center_role))

      await page.click('html');
  }
})  

