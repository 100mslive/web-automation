import { PageWrapper } from "../PageWrapper";

export class BottomRight {
  private page: PageWrapper;
  raise_hand_btn = '[data-testid="raise_hand_btn"]';
  brb_btn = '[data-testid="brb_btn"]';
  chat_btn = '[data-testid="chat_btn"]';

  constructor(page: PageWrapper) {
    this.page = page;
  }
}
