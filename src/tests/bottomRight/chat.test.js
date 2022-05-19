/* eslint-disable no-undef */

const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

test.beforeEach(async ({page: nativePage}) => {
  page = await PageWrapper.openMeetingPage(nativePage);
});

test.afterEach(async () => {
    await page.endRoom();
    await page.close()
});
