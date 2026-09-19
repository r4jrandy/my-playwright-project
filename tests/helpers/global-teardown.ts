import { FullConfig } from "@playwright/test";
import { exec } from "child_process";

async function globalTeardown(config: FullConfig) {
  // Perform any necessary cleanup or teardown tasks here
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    exec("allure serve", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing allure serve: ${error.message}`);
        return;
      }
    });
  }
}

export default globalTeardown;
