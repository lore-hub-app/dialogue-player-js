import { test, expect, type Page } from '@playwright/test';


test('should play dialogue 1', async ({ page }) => {

  await page.goto(".");
  await page.locator("[id-test=load-dialogue-1]").click();

});
