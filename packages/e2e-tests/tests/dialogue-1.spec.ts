import { test, expect, type Page } from '@playwright/test';

test('should play dialogue 1', async ({ page }) => {

  await page.goto(".");
  await page.locator("[test-id=load-dialogue-1]").click();

  // locators
  const contentLocator = page.frameLocator("[test-id=frame]").locator("[test-id=content-0]");
  const optionOneLocator = page.frameLocator("[test-id=frame]").locator("[test-id=option-0]");
  const optionTwoLocator = page.frameLocator("[test-id=frame]").locator("[test-id=option-1]");
  const optionThreeLocator = page.frameLocator("[test-id=frame]").locator("[test-id=option-2]");
  const nextLocator = page.frameLocator("[test-id=frame]").locator("[test-id=next]");
  const finLocator = page.frameLocator("[test-id=frame]").locator("[test-id=fin]");
  const restartLocator = page.frameLocator("[test-id=frame]").locator("[test-id=restart]");


  // check first node
  await expect(contentLocator).toHaveText("What to do?");
  await expect(optionOneLocator).toBeEnabled();
  await expect(optionTwoLocator).toBeDisabled();
  await expect(optionThreeLocator).toBeEnabled();
  // select option 1
  await optionOneLocator.click();

  // check 2nd node
  await expect(contentLocator).toHaveText("lolo");
  // select option1
  await optionOneLocator.click();

  // check 3rd node
  await expect(contentLocator).toHaveText("3");
  // select next
  await nextLocator.click();

  // check 4th node
  await expect(contentLocator).toHaveText("4");
  // select next
  await nextLocator.click();

  await expect(finLocator).toBeVisible();

  // press restart
  await restartLocator.click();

  // click 3rd option
  await optionThreeLocator.click();
  await expect(contentLocator).toHaveText("32");
  await nextLocator.click();
  await expect(finLocator).toBeVisible();
});
