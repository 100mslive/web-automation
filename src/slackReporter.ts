import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import { writeFileSync } from "fs";

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
            text: "Web-Automation build result for ${{env.REGION}}: ${{job.status}}",
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

let message = "";
let passedtest = "";
let failedtest = "";
class slackReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite): void {
    message += `Running Automation on ${process.env.APP_ENV} \nTotal tests:  ${
      suite.allTests().length
    }`;
  }

  onTestBegin(test: TestCase): void {
    console.log(`Starting test ${test.title}`);
  }

  //   onStdOut(chunk: string|Buffer, test: void|TestCase, result: void|TestResult): void{
  //     console.log(chunk);
  //   }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === "failed") {
      failedtest += `${test.title} \n`;
    }
    if (result.status === "passed") {
      passedtest += `${test.title} \n`;
    }
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult): void {
    if (result.status === "failed") {
      message += `\nFailed --> ${failedtest.length}`;
      message += `\nFailed tests: \n${failedtest.length > 0 ? failedtest : "None"}`;
      slackPayload.attachments[0].color = "#af0e20";
    }
    if (result.status === "passed") {
      message += `\nPassed --> ${passedtest}`;
    }

    console.log(`Finished the run: ${result.status}`);
    slackText.text = message;
    const slackJson = JSON.stringify(slackPayload, null, 2);
    console.log(slackJson);
    writeFileSync("slackMessage.json", slackJson);
  }
}
export default slackReporter;
