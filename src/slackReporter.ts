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
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Web-Automation build result ${{ env.REGION }}: ${{ job.status }}\n https://web-automation-git-${{ env.REGION }}-100mslive.vercel.app/",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: slackText,
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
