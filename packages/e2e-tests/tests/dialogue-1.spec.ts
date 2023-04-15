import { test, expect, type Page } from '@playwright/test';
import jsonDialogue from '../../example/assets/example-dialogue-json.json';

test('should play dialogue 1', async ({ page }) => {

  await page.goto(".");

  page.evaluate(`
    const frame = document.getElementsByTagName("iframe")[0];
    console.log(frame);
    window.postMessage(JSON.stringify(jsonDialogue), "*");
  `);


  const frame = await page.locator("[test-id=load-dialogue-1]");

  await page.frameLocator("[test-id=frame]").locator("[test-id=node-content]").waitFor();
  const content = await page.frameLocator("[test-id=frame]").locator("[test-id=content-0]");
  expect(content).toHaveText("What to do?");
});
