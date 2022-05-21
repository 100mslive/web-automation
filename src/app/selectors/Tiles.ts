import { PageWrapper } from "../PageWrapper";

export class Tiles {
  private page: PageWrapper;

  participant_tile = 'div[data-testid="participant_tile_?"]';
  audio_mute_icon_onTile = 'div[data-testid="participant_audio_mute_icon"]';
  raiseHand_icon_onTile = 'div[data-testid="raiseHand_icon_onTile"]';
  brb_icon_onTile = 'div[data-testid="brb_icon_onTile"]';
  name_onTile = "div[data-testid=participant_tile_?] div[data-testid=participant_name_onTile]";
  first_person_img = 'div[data-testid="first_person_img"]';
  network_ontile = 'div[data-testid="participant_tile_?"] span[data-testid="tile_network"]';
  mute_ontile =
    'div[data-testid="participant_tile_?"] div[data-testid="participant_audio_mute_icon"]';

  constructor(page: PageWrapper) {
    this.page = page;
  }

  async assertTilePresence(peerName: string, present: boolean) {
    if (present) {
      await this.page.assertVisible(this.participant_tile.replace("?", peerName));
    } else {
      await this.page.assertNotVisible(this.participant_tile.replace("?", peerName));
    }
  }

  async assertAudioState(peerName: string, enabled: boolean) {
    if (!enabled) {
      await this.page.assertVisible(this.mute_ontile.replace("?", peerName));
    }
  }
}
