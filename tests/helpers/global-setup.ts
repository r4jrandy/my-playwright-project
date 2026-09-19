import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  if (process.env.RUNNER === "local") {
    console.log("[INFO]: Running tests locally");
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log(`Allure results directory: ${resultsDir}`);
    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log("[INFO]: Allure results directory cleaned up");
    }
  }

  // Login cookies
  process.env.LOGIN_COOKIES = undefined;
  
}
