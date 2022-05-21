import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {});

test(`Change self Role`, async () => {
  //Chech abscence and prescence of tracks
  //change role permission not present
  for (let i = 0; i <= 5; i++) {
    if (i === 3) {
      continue;
    }
    await page.click(page.bottomCenter.more_settings_btn, page.bottomCenter.change_my_role_btn);

    const changeRole = page.bottomCenter.change_to_role_.replace("?", page.topRight.role_list[i]);

    //getting Text Found-  Promise { <pending> }
    //needs improvement
    const bottom_center_role = await page.getText(changeRole);
    await page.click(changeRole);

    await page.click(page.topRight.participant_list);
    await page.assertVisible(
      page.topRight.participant_role_heading.replace("?", bottom_center_role!)
    );
    await page.click("html");
  }
  await page.endRoom();
  await page.close();
});
