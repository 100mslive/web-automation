import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
  TestStatus,
} from "@playwright/test/reporter";
import { writeFileSync } from "fs";
import * as HandleBars from "handlebars";

class slackReporter implements Reporter {
  private message = "";
  private counters: Record<TestStatus, number> = { failed: 0, passed: 0, skipped: 0, timedOut: 0 };
  private failures = "";

  onBegin(config: FullConfig, suite: Suite): void {
    this.addCountToMessage("Total", suite.allTests().length);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.counters[result.status]++;
    if (result.status === "failed" || result.status === "timedOut") {
      this.failures += `${test.title} \n`;
    }
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult): void {
    this.addCountToMessage("Passed", this.counters.passed);
    this.addCountToMessage("Failed", this.counters.failed);
    this.addCountToMessage("Timed Out", this.counters.timedOut);
    this.addCountToMessage("Skipped", this.counters.skipped);

    if (result.status === "failed") {
      slackPayload.attachments[0].color = "#af0e20";
      this.message += "\n*Failed Tests - *\n";
      this.message += this.failures;
    }

    console.log(`Finished the run: ${result.status}`);
    slackText.text = this.message;
    let slackJson = JSON.stringify(slackPayload, null, 2);
    const emoji = result.status === "passed" ? ":tada:" : ":cry:";
    slackJson = this.interpolateSlackTemplate(slackJson, { jobStatus: result.status, emoji });
    console.log("slack message payload", slackJson);
    writeFileSync("slackMessage.json", slackJson);
  }

  interpolateSlackTemplate(payload: string, variables: Record<string, string>) {
    payload = payload.replaceAll("$", "");
    const context = {
      env: process.env,
      ...variables,
    };
    const template = HandleBars.compile(payload);
    return template(context);
  }

  addCountToMessage(label: string, count: number) {
    if (count) {
      this.message += `*${label}:*  ${count}\n`;
    }
  }
}

const slackText = {
  type: "mrkdwn",
  text: "",
};

const slackPayload = {
  attachments: [
    {
      color: "#1cba2c",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Web-Automation results for ${{env.REGION}}: ${{jobStatus}} ${{emoji}}*",
          },
        },
        {
          type: "section",
          text: slackText,
        },
        {
          type: "divider",
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Test Run",
                emoji: true,
              },
              url: "${{env.GITHUB_SERVER_URL}}/${{env.GITHUB_REPOSITORY}}/actions/runs/${{env.GITHUB_RUN_ID}}",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Results",
                emoji: true,
              },
              url: "https://web-automation-git-${{env.REGION}}-100mslive.vercel.app/",
            },
          ],
        },
      ],
    },
  ],
};

export default slackReporter;
