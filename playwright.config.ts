import { defineConfig, devices } from "@playwright/test";

const port = 3200;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `bun run build && bun run start -p ${port}`,
    url: `${baseURL}/pt`,
    env: { NEXT_PUBLIC_SITE_URL: baseURL },
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
