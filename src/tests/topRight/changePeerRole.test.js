const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');

let url=process.env.audio_video_screenshare_url;
let name=process.env.peer_name + "1";
let mic = true;
let cam = false;
test(`Change peer Role`, async ({context}) => {

  name=process.env.peer_name + "1";
  let page1 = new PageWrapper(await context.newPage())
  await page1.preview.gotoMeetingRoom(url, name, mic, cam)

  name = process.env.peer_name + 2;
  let page2 = new PageWrapper(await context.newPage())
  await page2.preview.gotoMeetingRoom(url, name, mic, cam)

  for(let i=0; i < page1.topRight.role_list.length; i++){
    if(i==2)continue

    await page1.click(page1.topRight.participant_list, page1.topRight.participant_setting.replace("?",1), page1.topRight.dialog_select_change_role_to)

    await page1.selectPopupOption(page1.topRight.role_list[i]);
    await page1.click(page1.topRight.dialog_confirm)


    //page2 check
    page2.timeout(2000)
    await page2.click(page2.topRight.dialog_accept, page2.topRight.participant_list)
    await page2.assertVisible(page2.topRight.participant_role_heading.replace("?",page2.topRight.role_list[i]))
    await page2.click('html');
    await page2.timeout(2000);
      
    //page1
    await page1.click(page1.topRight.participant_list, page1.topRight.setting_role_peer0.replace("?",2), page1.topRight.dialog_select_change_role_to)

    await page1.selectPopupOption(page1.topRight.role_list[2]);
    await page1.click(page1.topRight.dialog_confirm)
      
    //page2 click Accept
    await page2.click(page2.topRight.dialog_accept)
  }

  await page1.endRoom();
  await context.close();
})  

