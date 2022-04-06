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

    this.name_onTile = 'div[data-testid=participant_tile]:nth-child(?) div:nth-child(2)';

  }
  

}
