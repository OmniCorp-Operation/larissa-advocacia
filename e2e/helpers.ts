import { expect, type Page } from "@playwright/test";

export const collectConsoleErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
};

export const parallaxTransforms = (page: Page) =>
  page.evaluate(() =>
    Object.fromEntries(
      [...document.querySelectorAll<HTMLElement>("[data-parallax]")].map((layer) => [
        layer.dataset.parallax as string,
        getComputedStyle(layer).transform,
      ]),
    ),
  );

export const settledParallaxTransforms = async (page: Page) => {
  let previous = "";
  await expect
    .poll(async () => {
      const current = JSON.stringify(await parallaxTransforms(page));
      const settled = current === previous;
      previous = current;
      return settled;
    })
    .toBe(true);
  return JSON.parse(previous) as Record<string, string>;
};

export const changedLayers = (before: Record<string, string>, after: Record<string, string>) =>
  Object.keys(before).filter((name) => before[name] !== after[name]);
