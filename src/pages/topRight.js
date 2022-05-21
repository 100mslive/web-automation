/* eslint-disable no-undef */

exports.TopRight = class TopRight {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.pip_btn = 'button[data-testid="pip_btn"]';
    this.participant_list = 'div[data-testid="participant_list"]';
    this.record_status_dropdown = 'div[data-testid="record_status_dropdown"]';

    this.playlist_playing = "text=Playlist is playing";
    this.playlist_playing_play = "text=Play";
    this.playlist_playing_pause = "text=Pause";

    this.whiteboard_owner = "text=Whiteboard Owner -";
    this.whiteboard_stop = "text=Stop";

    this.streaming_rtmp = 'div[role="menuitem"]:has-text("Streaming (RTMP)")';
    this.streaming_hls = 'div[role="menuitem"]:has-text("Streaming (HLS)")';
    this.browser_recording =
      'div[role="menuitem"]:has-text("Recording (Browser)")';
    this.hls_recording = 'div[role="menuitem"]:has-text("Recording (HLS)")';

    this.participant_number = 'div[data-testid="participant_?"]';
    this.participant_name = 'div[data-testid="participant_?"]';
    this.participant_setting = 'div[data-testid="participant_?"] button';
    this.participant_role_heading = 'p[data-testid="role_?"]';
    this.dialog_select_change_role_to =
      'div[data-testid="dialog_select_Change role to"]';

    this.role_list = [
      "audio",
      "audio-video",
      "audio-video-sshare",
      "hls-viewer",
      "screenshare",
      "video",
      "viewer",
    ];
    this.setting_role_peer0 = 'div[role="group"]:nth-child(?) button';

    this.peerlist_network =
      'div[data-testid="participant_?"] span[data-testid="tile_network"]';

    this.dialog_confirm = "text=Confirm";
    this.dialog_accept = "text=Accept";
  }

  async assertPeerInPeerList(peerName, present) {
    await this.openParticipantList();
    try {
      if (present) {
        await this.page.assertVisible(
          this.participant_name.replace("?", peerName)
        );
      } else {
        await this.page.assertNotVisible(
          this.participant_name.replace("?", peerName)
        );
      }
    } finally {
      await this.closeParticipantList();
    }
  }

  /**
   * @private
   */
  async openParticipantList() {
    await this.page.click(this.participant_list);
  }

  /**
   * @private
   */
  async closeParticipantList() {
    await this.page.click("html");
  }
};
