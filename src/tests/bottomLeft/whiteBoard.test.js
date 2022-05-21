const { test } = require("@playwright/test");
const PageWrapper = require("../../utils/PageWrapper.js");
let page;
test.beforeEach(async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {
  await page.endRoom();
  await page.close();
});

//not present in prod
test.skip(`white board check`, async () => {
  await page.click(
    page.bottomLeft.white_board_btn,
    page.bottomLeft.white_board_btn,
    page.bottomLeft.white_board_btn
  );

  await page.click(page.topRight.record_status_dropdown);
  await page.assertVisible(page.topRight.whiteboard_owner);
  await page.click(page.topRight.whiteboard_stop);
});
