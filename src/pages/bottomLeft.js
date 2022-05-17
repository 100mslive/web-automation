/* eslint-disable no-undef */
exports.BottomLeft = class BottomLeft {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.screenshare_audio = 'button[data-testid="screenshare_audio"]';
    this.audio_playlist = 'button[data-testid="audio_playlist"]';
    this.video_playlist = 'button[data-testid="video_playlist"]';

    this.playlist_play_pause_btn = 'button[data-testid="playlist_play_pause_btn"]';
    this.playlist_next_btn = 'button[data-testid="playlist_next_btn"]';
    this.playlist_prev_btn = 'button[data-testid="playlist_prev_btn"]';
    this.playlist_cross_btn = 'text=Audio PlayerBrowse >> button';
    this.videoplayer_cross_btn = 'button[data-testid="videoplaylist_cross_btn"]';



    this.white_board_btn = 'button[data-testid="white_board_btn"]';
    this.virtual_bg_btn = 'button[data-testid="virtual_bg_btn"]'; 
    this.noise_supp_btn = 'button:nth-child(6) >> nth=0'; 

    this.audio_playlist_item = 'div[role="menuitem"]:nth-child(?)';

  }
}
