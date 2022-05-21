/* eslint-disable no-undef */

exports.Tiles = class Tiles {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.participant_tile = 'div[data-testid="participant_tile_?"]';

    this.audio_mute_icon_onTile =
      'div[data-testid="participant_audio_mute_icon"]';

    this.raiseHand_icon_onTile = 'div[data-testid="raiseHand_icon_onTile"]';
    this.brb_icon_onTile = 'div[data-testid="brb_icon_onTile"]';

    this.name_onTile =
      "div[data-testid=participant_tile_?] div[data-testid=participant_name_onTile]";

    this.first_person_img = 'div[data-testid="first_person_img"]';

    this.network_ontile =
      'div[data-testid="participant_tile_?"] span[data-testid="tile_network"]';
    this.mute_ontile =
      'div[data-testid="participant_tile_?"] div[data-testid="participant_audio_mute_icon"]';
  }

  async assertTilePresence(peerName, present) {
    if (present) {
      await this.page.assertVisible(
        this.participant_tile.replace("?", peerName)
      );
    } else {
      await this.page.assertNotVisible(
        this.participant_tile.replace("?", peerName)
      );
    }
  }

  async assertAudioState(peerName, enabled) {
    if (!enabled) {
      await this.page.assertVisible(this.mute_ontile.replace("?", peerName));
    }
  }
};
