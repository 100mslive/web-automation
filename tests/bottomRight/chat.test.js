const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomRight } = require('../../pages/bottomRight.js');
const PageMethods = require('../../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomRight= new BottomRight();

let url,name,result;

test.beforeEach(async ({page}) => {
  previewPage = new PreviewPage(page);
  url=previewPage.url_audio_video_ss;
  name=previewPage.name;
  mic = "off"
  cam = "off"
});

test.afterEach(async ({page}) => {
    await bottomCenter.leaveRoom(page);
    await page.close()
});
