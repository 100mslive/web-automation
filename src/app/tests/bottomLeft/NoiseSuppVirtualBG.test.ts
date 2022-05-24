import { PageWrapper } from "../../PageWrapper";
import { expect, test } from "@playwright/test";

let page: PageWrapper;

test.beforeEach(async ({ page: nativePage }) => {
  page = await PageWrapper.openMeetingPage(nativePage, { cam: true });
});

test.afterEach(async () => {
  await page.endRoom();
  await page.close();
});

test.only(`Verify noise supp and virtual background`, async () => {
  const virtualBg = page.locator(page.bottomLeft.virtual_bg_btn);
  const noiseSupp = page.locator(page.bottomLeft.noise_supp_btn);
  const btnDisabled = /active-true/;
  const btnEnabled = /active-false/;
  await expect(virtualBg).toHaveClass(btnDisabled);
  await expect(noiseSupp).toHaveClass(btnDisabled);
  await virtualBg.click();
  await noiseSupp.click();
  await expect(virtualBg).toHaveClass(btnEnabled);
  await expect(noiseSupp).toHaveClass(btnEnabled);
  await virtualBg.click();
  await noiseSupp.click();
  await expect(virtualBg).toHaveClass(btnDisabled);
  await expect(noiseSupp).toHaveClass(btnDisabled);
});
