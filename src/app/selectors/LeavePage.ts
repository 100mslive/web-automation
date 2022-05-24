import { PageWrapper } from "../PageWrapper";

export class LeavePage {
  private page: PageWrapper;

  join_again_btn = 'button[data-testid="join_again_btn"]';
  go_to_dashboard_btn = 'button[data-testid="go_to_dashboard_btn"]';

  constructor(page: PageWrapper) {
    this.page = page;
  }
}
