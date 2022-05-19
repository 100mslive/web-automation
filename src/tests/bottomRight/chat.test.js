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
