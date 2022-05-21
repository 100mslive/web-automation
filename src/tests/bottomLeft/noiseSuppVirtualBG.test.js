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

test(`Verify noise supp and virtual bg visibility`, async () => {
  await page.assertVisible(page.bottomLeft.virtual_bg_btn);
  await page.assertVisible(page.bottomLeft.noise_supp_btn);
});

test(`Verify noise supp`, async () => {
  for (let i = 0; i < 3; i++) {
    await page.click(
      page.bottomLeft.noise_supp_btn,
      page.bottomLeft.virtual_bg_btn
    );
  }
});
