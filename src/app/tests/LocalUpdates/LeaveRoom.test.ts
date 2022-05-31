import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {
  await page.close();
});

//leave and join again
test(`Verify leave room`, async () => {
  await page.footer.leaveRoom();
  await page.assertVisible(page.center.go_to_dashboard_btn);
  await page.click(page.center.join_again_btn);
  await page.assertVisible(page.preview.preview_join_btn);
});

test(`Verify End room for all`, async () => {
  await page.footer.endRoom();
  await page.assertVisible(page.center.go_to_dashboard_btn);
  await page.click(page.center.join_again_btn);
  await page.assertVisible(page.preview.preview_join_btn);
});
