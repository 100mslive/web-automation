const { test } = require('@playwright/test');
const PageWrapper = require('../../utils/PageWrapper.js');


test(`Change peer Role`, async ({context}) => {
  let pages = await PageWrapper.openPages(context, 2);


  for(let i=0; i < pages[0].topRight.role_list.length; i++){
    if(i==2)continue

    await pages[0].click(pages[0].topRight.participant_list, pages[0].topRight.participant_setting.replace("?",pages[1].localName), pages[0].topRight.dialog_select_change_role_to)

    await pages[0].selectPopupOption(pages[0].topRight.role_list[i]);
    await pages[0].click(pages[0].topRight.dialog_confirm)


    //page2 check
    pages[1].timeout(2000)
    await pages[1].click(pages[1].topRight.dialog_accept, pages[1].topRight.participant_list)
    await pages[1].assertVisible(pages[1].topRight.participant_role_heading.replace("?",pages[1].topRight.role_list[i]))
    await pages[1].click('html');
    await pages[1].timeout(2000);
      
    //page1
    await pages[0].click(pages[0].topRight.participant_list, pages[0].topRight.setting_role_peer0.replace("?",2), pages[0].topRight.dialog_select_change_role_to)

    await pages[0].selectPopupOption(pages[0].topRight.role_list[2]);
    await pages[0].click(pages[0].topRight.dialog_confirm)
      
    //page2 click Accept
    await pages[1].click(pages[1].topRight.dialog_accept)
  }

  await pages[0].endRoom();
  await context.close();
})  

