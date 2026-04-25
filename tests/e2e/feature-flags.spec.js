const { test, expect } = require("@playwright/test");
const fs = require("fs/promises");
const path = require("path");

const flagsPath = path.join(__dirname, "../../flags.json");

let originalFlags;

test.beforeAll(async () => {
  originalFlags = await fs.readFile(flagsPath, "utf-8");
});

test.afterAll(async () => {
  await fs.writeFile(flagsPath, originalFlags);
});

async function setBetaDashboard(value) {
  const flags = {
    betaDashboard: value,
  };

  await fs.writeFile(flagsPath, JSON.stringify(flags, null, 2) + "\n");
}

test("API returns JSON with betaDashboard flag", async ({ request }) => {
  await setBetaDashboard(false);

  const response = await request.get("/api/features");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/json");

  const body = await response.json();

  expect(body).toHaveProperty("betaDashboard");
  expect(typeof body.betaDashboard).toBe("boolean");
});

test("frontend hides beta dashboard when flag is false", async ({ page }) => {
  await setBetaDashboard(false);

  await page.goto("/");

  await expect(page.locator("#beta-area")).toBeHidden();
});

test("frontend shows beta dashboard when flag is true", async ({ page }) => {
  await setBetaDashboard(true);

  await page.goto("/");

  await expect(page.locator("#beta-area")).toBeVisible();
  await expect(page.locator("#beta-area")).toContainText("Future beta area");
});