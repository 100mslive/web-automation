import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";
import { writeFileSync } from "fs";

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
    console.log(message);
    writeFileSync("slackMessage.txt", message);
  }
}
export default slackReporter;
