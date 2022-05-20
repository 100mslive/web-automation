/* eslint-disable no-undef */

exports.PreviewPage = class PreviewPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
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
    this.dialoge_select_settings = 'div[data-testid="dialog_select_?"]'; 
    this.preview_setting_btn_list = ["Video", "Microphone", "Speaker"]; 

  }


  async gotoPreviewPage() {
    await this.page.goto();
  }

  async gotoMeetingRoom(url, name, mic, cam) {
    await this.gotoPreviewPage(url);
    if(!cam){
      await this.page.click(this.preview_video_btn);
    }
    if(!mic){
      await this.page.click(this.preview_audio_btn);
    }
    await this.page.sendText(this.preview_name_field, name);
    await this.page.click(this.preview_join_btn);
    console.log("Joined room with : ", "mic:", mic,  " cam:", cam)
  } 

}