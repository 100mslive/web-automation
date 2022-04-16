const { expect } = require('@playwright/test');
const  PageMethods = require('../utils/PageMethods')
const { PreviewPage } = require('./previewPage.js');
let pageMethods = new PageMethods();
let previewPage= new PreviewPage();

exports.Ontile = class Ontile {
   /**
   * @param {import('@playwright/test').Page} page
   */

  constructor() {
    this.participant_tile = 'div[data-testid="participant_tile"]:nth-child(?)';

    this.audio_mute_icon_onTile = 'div[data-testid="participant_audio_mute_icon"]';
    
    this.raiseHand_icon_onTile = 'div[data-testid="raiseHand_icon_onTile"]';
    this.brb_icon_onTile = 'div[data-testid="brb_icon_onTile"]';

    this.name_onTile = 'div[data-testid=participant_tile_?] div[data-testid=participant_name_onTile]';

    this.first_person_img = 'div[data-testid="first_person_img"]';

    this.network_ontile = 'div[data-testid="participant_tile_?"] span[data-testid="tile_network"]';
    this.mute_ontile = 'div[data-testid="participant_tile_?"] div[data-testid="participant_audio_mute_icon"]';

  }
  

}
