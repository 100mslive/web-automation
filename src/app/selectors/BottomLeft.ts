import { PageWrapper } from "../PageWrapper";

export class BottomLeft {
  private page: PageWrapper;
  screenshare_audio = 'button[data-testid="screenshare_audio"]';
  audio_playlist = 'button[data-testid="audio_playlist"]';
  video_playlist = 'button[data-testid="video_playlist"]';

  playlist_play_pause_btn = 'button[data-testid="playlist_play_pause_btn"]';
  playlist_next_btn = 'button[data-testid="playlist_next_btn"]';
  playlist_prev_btn = 'button[data-testid="playlist_prev_btn"]';
  playlist_cross_btn = "text=Audio PlayerBrowse >> button";
  videoplayer_cross_btn = 'button[data-testid="videoplaylist_cross_btn"]';

  white_board_btn = 'button[data-testid="white_board_btn"]';
  virtual_bg_btn = 'button[data-testid="virtual_bg_btn"]';
  noise_supp_btn = "button:nth-child(6) >> nth=0";

  audio_playlist_item = 'div[role="menuitem"]:nth-child(?)';

  constructor(page: PageWrapper) {
    this.page = page;
  }
}
