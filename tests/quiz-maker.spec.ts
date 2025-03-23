import { expect, test } from "@playwright/test";

test("run a quiz", async ({ page }) => {
  await page.routeFromHAR("./tests/hars/categories.har", {
    url: "https://opentdb.com/api_category.php",
    update: false,
  });

  await page.routeFromHAR("./tests/hars/questions.har", {
    url: "https://opentdb.com/api.php?**",
    update: false,
  });

  await page.goto("http://localhost:5173/");

  await page.getByLabel("Category").selectOption("General Knowledge");
  await page.getByLabel("Difficulty").selectOption("Easy");
  await page.getByRole("button", { name: "Create" }).click();

  await page.waitForLoadState("networkidle");

  const questions = await page.getByTestId("question").all();

  for (let i = 0; i < questions.length; i++) {
    await questions[i].getByRole("button").first().click();
  }

  await page.getByRole("button", { name: "Submit" }).click();

  const score = await page.getByText(/You scored/);

  await expect(score).toBeVisible();

  await page.getByRole("button", { name: "Create a new quiz" }).click();

  await expect(page).toHaveURL("http://localhost:5173/config");
});
