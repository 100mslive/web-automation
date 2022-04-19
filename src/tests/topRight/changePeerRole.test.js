const { test, expect } = require('@playwright/test');
const { PreviewPage } = require('../../pages/previewPage.js');
const { BottomCenter } = require('../../pages/bottomCenter.js');
const { BottomLeft } = require('../../pages/bottomLeft.js');
const { TopRight } = require('../../pages/topRight.js');
const PageMethods = require('../../utils/PageMethods.js');
let previewPage= new PreviewPage();
let pageMethods= new PageMethods();
let bottomCenter= new BottomCenter();
let bottomLeft= new BottomLeft();
let topRight= new TopRight();

let url=process.env.audio_video_screenshare_url;
let name;
let  mic = "on"
let cam = "on"

test.only(`Change peer Role`, async ({context}) => {

  name=process.env.peer_name + "1";
  pages1 = await context.newPage();
  await previewPage.gotoMeetingRoom(pages1, url, name, mic, cam)

  name = process.env.peer_name + 2;
  pages2 = await context.newPage();
  await previewPage.gotoMeetingRoom(pages2, url, name, mic, cam)

  for(i=0; i < topRight.role_list.length; i++){
    if(i==2)continue
      await pageMethods.clickElement(pages1, topRight.participant_list, "participant_list")
      await pageMethods.clickElement(pages1, topRight.participant_setting.replace("?",1), "participant_setting")
      await pageMethods.clickElement(pages1, topRight.dialog_select_change_role_to, "dialog_select_change_role_to")

      await pages1.locator('select').selectOption(topRight.role_list[i]);
      await pageMethods.clickElement(pages1, topRight.dialog_confirm, "dialog_confirm")

        //page2 check
        result = await pageMethods.isElementVisible(pages2, topRight.dialog_accept, "dialog_accept visibility-")
        pageMethods.assertResult(result, "dialog_accept")
        await pageMethods.clickElement(pages2, topRight.dialog_accept, "dialog_accept")

        await pageMethods.clickElement(pages2, (topRight.participant_list), "participant_list")
        result = await pageMethods.isElementVisible(pages2, (topRight.participant_role_heading.replace("?",topRight.role_list[i])), "participant_role_heading visibility-")
        pageMethods.assertResult(result, "participant_role_heading")
        await pages2.locator('html').click();
        await pages2.waitForTimeout(2000);
      
      //page1
      await pageMethods.clickElement(pages1, (topRight.participant_list), "participant_list")
      await pageMethods.clickElement(pages1, topRight.setting_role_peer0.replace("?",2), "role2 peer1 settings btn ")
      await pageMethods.clickElement(pages1, topRight.dialog_select_change_role_to, "dialog_select_change_role_to")

      await pages1.locator('select').selectOption(topRight.role_list[2]);
      await pageMethods.clickElement(pages1, topRight.dialog_confirm, "dialog_confirm")
      
        //page2 click Accept
        await pageMethods.clickElement(pages2, topRight.dialog_accept, "dialog_accept")
  }
  await bottomCenter.endRoom(pages1);
  await pages1.close();
  await pages2.close();
})  

