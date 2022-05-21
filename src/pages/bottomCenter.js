/* eslint-disable no-undef */
exports.BottomCenter = class BottomCenter {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.meeting_audio_btn = 'button[data-testid="audio_btn"]';
    this.meeting_audio_on_btn =
      'button[data-testid="audio_btn"] > svg[data-testid="audio_on_btn"]';
    this.meeting_audio_off_btn =
      'button[data-testid="audio_btn"] > svg[data-testid="audio_off_btn"]';

    this.meeting_video_btn = 'button[data-testid="video_btn"]';
    this.meeting_video_on_btn =
      'button[data-testid="video_btn"] > svg[data-testid="video_on_btn"]';
    this.meeting_video_off_btn =
      'button[data-testid="video_btn"] > svg[data-testid="video_off_btn"]';

    this.leave_room_btn = 'button[data-testid="leave_room_btn"]';
    this.just_leave_btn = 'button[data-testid="just_leave_btn"]';
    this.end_room_btn = 'button[data-testid="end_room_btn"]';
    this.lock_end_room = 'button[data-testid="lock_end_room"]';

    this.screen_share_btn = 'button[data-testid="screen_share_btn"]';
    this.stop_screen_share_btn = 'button[data-testid="stop_screen_share_btn"]';

    this.more_settings_btn = 'button[data-testid="more_settings_btn"]';

    this.change_name_btn = 'div[data-testid="change_name_btn"]';
    this.change_name_field = 'input[data-testid="change_name_field"]';
    this.popup_change_btn = 'button[data-testid="popup_change_btn"]';

    this.streaming_recording_btn = 'div[data-testid="streaming_recording_btn"]';
    this.streaming_metting_url_field = 'input[data-testid="metting_url_field"]';
    this.streaming_rtmp_url_field = 'input[data-testid="rtmp_url_field"]';
    this.rtmp_recording_stop_btn = 'button[data-testid="rtmp_recording_stop"]';
    this.rtmp_recording_start_btn =
      'button[data-testid="rtmp_recording_start"]';
    this.hls_checkbox = "#hlsCheckbox";
    this.recording_checkbox = "#recordingCheckbox";

    this.twitch_live_now = '(//div[@class="Layout-sc-nxg1ff-0 KEuEf"])[1]';
    this.twitch_url = "https://www.twitch.tv/ronit100ms";

    this.full_screen_btn = 'div[data-testid="full_screen_btn"]';
    this.mute_all_btn = 'div[data-testid="mute_all_btn"]';
    this.mute_all_apply_btn = "text=Apply";

    this.ui_settings_btn = 'div[data-testid="ui_settings_btn"]';
    this.device_settings_btn = 'div[data-testid="device_settings_btn"]';
    this.stats_for_nreds_btn = 'div[data-testid="stats_for_nreds_btn"]';

    this.change_my_role_btn = 'div[data-testid="change_my_role_btn"]';
    this.change_to_role_ = 'div[data-testid="change_to_role_?"]';

    this.dialoge_cross_icon = 'button[data-testid="dialoge_cross_icon"]';
  }

  // async gotoPreviewPage(url) {
  //   // this.page = await this.browser();
  //   await this.page.goto(url);
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  //   page.goto(url);
  // }

  async leaveRoom() {
    await this.page.click(this.leave_room_btn, this.just_leave_btn);
  }

  async endRoom() {
    await this.page.click(
      this.leave_room_btn,
      this.end_room_btn,
      this.lock_end_room
    );
  }

  /**
   * enabled = true => audio unmuted
   * enabled = false => audio muted
   * enabled = undefined => audio button not visible
   */
  async assertLocalAudioState(enabled) {
    if (enabled) {
      await this.page.assertVisible(this.meeting_audio_on_btn);
    } else if (enabled === false) {
      await this.page.assertVisible(this.meeting_audio_off_btn);
    } else {
      await this.page.assertNotVisible(this.meeting_audio_btn);
    }
  }

  /**
   * enabled = true => audio unmuted
   * enabled = false => audio muted
   * enabled = undefined => audio button not visible
   */
  async assertLocalVideoState(enabled) {
    if (enabled) {
      await this.page.assertVisible(this.meeting_video_on_btn);
    } else if (enabled === false) {
      await this.page.assertVisible(this.meeting_video_off_btn);
    } else {
      await this.page.assertNotVisible(this.meeting_video_btn);
    }
  }

  /**
   * TODO: take {source: string, type: "audio/video", state: true/false}
   */
  async muteAll() {
    await this.openMoreSettings();
    await this.page.click(this.mute_all_btn, this.mute_all_apply_btn);
  }

  async changeName(newName) {
    await this.openMoreSettings();
    await this.page.click(this.change_name_btn);
    await this.page.sendText(this.change_name_field, newName);
    await this.page.click(this.popup_change_btn);
  }

  /**
   * @private
   */
  async openMoreSettings() {
    await this.page.click(this.more_settings_btn);
  }
};
