const { expect } = require('@playwright/test');
const  PageMethods = require('../utils/PageMethods')
const { PreviewPage } = require('./previewPage.js');
let pageMethods = new PageMethods();
let previewPage= new PreviewPage();

exports.TopRight = class TopRight {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor() {
    this.pip_btn = 'button[data-testid="pip_btn"]';
    this.participant_list = 'div[data-testid="participant_list"]';
    this.record_status_dropdown = 'div[data-testid="record_status_dropdown"]';
    
    this.playlist_playing = 'text=Playlist is playing';
    this.playlist_playing_play = 'text=Play';
    this.playlist_playing_pause = 'text=Pause';

    this.whiteboard_owner = 'text=Whiteboard Owner -';
    this.whiteboard_stop = 'text=Stop';

    this.streaming_rtmp = 'div[role="menuitem"]:has-text("Streaming (RTMP)")';
    this.browser_recording = 'div[role="menuitem"]:has-text("Recording (Browser)")';
    this.streaming_hls = 'div[role="menuitem"]:has-text("Streaming (HLS)")';


    this.participant_number = 'div[data-testid="participant_?"]';

    this.participant_role_heading = 'div[role="group"] div p:nth-child(1)';

  }

}
