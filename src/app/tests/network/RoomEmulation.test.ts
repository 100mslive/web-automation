import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async () => {});

test.afterEach(async () => {});

test(`Verify you are offline now notification @network`, async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage);
  await page.assertVisible(page.center.first_person_img);
  await page.emulateNetwork(true, -1, -1, -1);
  await page.assertVisible(page.center.network_offline_notification);
  await page.close();
});

test(`Verify you are now connected notification @network`, async ({ page: nativePage }) => {
    page = await PageWrapper.openMeetingPage(nativePage);
    await page.assertVisible(page.center.first_person_img);
    await page.emulateNetwork(true, -1, -1, -1);
    await page.assertVisible(page.center.network_offline_notification);
    await page.emulateNetwork(false, 0, 500, 500);
    await page.assertVisible(page.center.network_connected_notification);
    await page.close();
  });