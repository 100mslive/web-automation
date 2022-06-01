import { PageWrapper } from "../../PageWrapper";
import { test } from "@playwright/test";

test.beforeEach(async () => {});

test.afterEach(async () => {});

const peersCount = Number(process.env.multi_peer_count);

test(`Send msg to everyone`, async ({ context }) => {
  const msg = 'Hello, how are you ?';
  const pages = await PageWrapper.openPages(context, peersCount);
  await pages[0].sendMessageToEveryone(msg);
  for (let i = 1; i < peersCount; i++) {
    await pages[i].click(pages[i].footer.chat_btn);
    await pages[i].hasText(pages[i].footer.first_chat_msg, msg);
  }
  await context.close();
});
