const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomRight } = require('../../pages/bottomRight.js');
const PageMethods = require('../../utils/PageMethods.js');
const { Ontile } = require('../../pages/onTile.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomRight= new BottomRight();
let onTile= new Ontile();

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = "on"
let cam = "on"

test.beforeEach(async ({page}) => {
  await previewPage.gotoMeetingRoom(page, url, name, mic, cam)
});

test.afterEach(async ({page}) => {
    await bottomCenter.endRoom(page);
    await page.close()
});

test.skip(`Verify Raise Hand Brb icons`, async ({page}) => {

  result = await pageMethods.isElementVisible(page, bottomRight.raise_hand_btn, "raise_hand_btn visibility-")
  pageMethods.assertResult(result, "raise_hand_btn")

  result = await pageMethods.isElementVisible(page, bottomRight.brb_btn, "brb_btn visibility-")
  pageMethods.assertResult(result, "brb_btn")
  await pageMethods.clickElement(page, bottomRight.brb_btn, "brb_btn")
})  

test.skip(`Verify Raise Hand Brb on Tile`, async ({page}) => {

    for(let i=0; i<3; i++){
      result = await pageMethods.isElementVisible(page, bottomRight.raise_hand_btn, "raise_hand_btn visibility-")
      pageMethods.assertResult(result, "raise_hand_btn")
      await pageMethods.clickElement(page, bottomRight.raise_hand_btn, "raise_hand_btn")

      result = await pageMethods.isElementVisible(page, onTile.raiseHand_icon_onTile, "raiseHand_icon_onTile visibility-")
      pageMethods.assertResult(result, "raiseHand_icon_onTile")
      result = await pageMethods.isElementNotVisible(page, onTile.brb_icon_onTile, "brb_icon_onTile Hidden-")
      pageMethods.assertResult(result, "brb_icon_onTile")

      result = await pageMethods.isElementVisible(page, bottomRight.brb_btn, "brb_btn visibility-")
      pageMethods.assertResult(result, "brb_btn")
      await pageMethods.clickElement(page, bottomRight.brb_btn, "raise_hand_btn")

      result = await pageMethods.isElementVisible(page, onTile.brb_icon_onTile, "brb_icon_onTile visibility-")
      pageMethods.assertResult(result, "brb_icon_onTile")
      result = await pageMethods.isElementNotVisible(page, onTile.raiseHand_icon_onTile, "raiseHand_icon_onTile Hidden-")
      pageMethods.assertResult(result, "raiseHand_icon_onTile")
    }
})
