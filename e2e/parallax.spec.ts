import { expect, test } from "@playwright/test";
import { changedLayers, parallaxTransforms, settledParallaxTransforms } from "./helpers";

const scrollBy = (page: import("@playwright/test").Page, y: number) =>
  page.evaluate((offset) => window.scrollBy(0, offset), y);

test("rolar o hero muda o transform de pelo menos 2 camadas de parallax", async ({ page }) => {
  await page.goto("/pt");
  await expect(page.locator("[data-parallax='hero-portrait']")).toBeVisible();
  const before = await settledParallaxTransforms(page);

  await scrollBy(page, 500);

  await expect
    .poll(async () => changedLayers(before, await parallaxTransforms(page)).length)
    .toBeGreaterThanOrEqual(2);
});

test.describe("com reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("rolar nao altera o transform das camadas", async ({ page }) => {
    await page.goto("/pt");
    const before = await settledParallaxTransforms(page);

    await scrollBy(page, 500);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);
    const after = await settledParallaxTransforms(page);

    expect(changedLayers(before, after)).toEqual([]);
  });
});
