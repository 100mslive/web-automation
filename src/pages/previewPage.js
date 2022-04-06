const { expect, default: test } = require('@playwright/test');
const  PageMethods = require('../utils/PageMethods')
let pageMethods = new PageMethods();

exports.PreviewPage = class PreviewPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    
    // this.page = page;
    // this.name = process.env.peer_name;
    this.url_audio_video_ss = process.env.audio_video_screenshare_url;
    this.preview_name_field = 'input[data-testid="preview_name_field"]';
    this.preview_join_btn = 'button[data-testid="preview_join_btn"]'
    this.preview_join_btn_1 = 'data-testid="preview_join_btn"';

    this.preview_audio_btn = 'button[data-testid="audio_btn"]';
    this.preview_audio_on_btn = 'button[data-testid="audio_btn"] > svg[data-testid="audio_on_btn"]';
    this.preview_audio_off_btn = 'button[data-testid="audio_btn"] > svg[data-testid="audio_off_btn"]';

    this.preview_video_btn = 'button[data-testid="video_btn"]';
    this.preview_video_on_btn = 'button[data-testid="video_btn"] > svg[data-testid="video_on_btn"]'; 
    this.preview_video_off_btn = 'button[data-testid="video_btn"] > svg[data-testid="video_off_btn"]';

    this.preview_setting_btn = 'button[data-testid="preview_setting_btn"]'; 
    this.preview_tile_network = 'span[data-testid="tile_network"]'; 

    this.preview_tile = 'video[data-testid="preview_tile"]'; 
    this.preview_avatar_tile = 'div[data-testid="preview_avatar_tile"]'; 
    
    this.dialoge_cross_icon = 'button[data-testid="dialoge_cross_icon"]'; 
    // this.preview_video_off_btn = 'data-testid="video_off_btn"'; 
    // this.preview_video_off_btn = 'data-testid="video_off_btn"'; 

  }


  async gotoPreviewPage(page, url) {
    // this.page = await this.browser();
    // let page = await context.newPage() 
    await page.goto(url);
  }


  async SendName(page, name){ 
    await page.waitForSelector(this.preview_name_field); 
    await pageMethods.sendText(page, this.preview_name_field, name)
    console.log("Name: " + name )
  }

  async gotoMeetingRoom(page, url, name, mic, cam) {
    await this.gotoPreviewPage(page,url);
    if(cam == "off"){
        await page.waitForSelector(this.preview_video_btn);
        await page.locator(this.preview_video_btn).click()
    }
    if(mic == "off"){
        await page.waitForSelector(this.preview_audio_btn);
        await page.locator(this.preview_audio_btn).click()
    }
    this.SendName(page, name)
    await page.waitForSelector(this.preview_join_btn);
    await pageMethods.clickElement(page, this.preview_join_btn, "preview_join_btn")
  } 

}