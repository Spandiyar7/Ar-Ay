import { expect, test } from "@playwright/test";

const pagesWithH1 = [
  "/ru",
  "/kk",
  "/ru/services",
  "/ru/services/caries-treatment",
  "/ru/doctors",
  "/ru/prices",
  "/ru/about",
  "/ru/reviews",
  "/ru/contacts",
  "/ru/faq",
  "/ru/privacy",
  "/ru/terms",
  "/ru/medical-disclaimer"
];

test("home opens in Russian and Kazakh", async ({ page }) => {
  await page.goto("/ru");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ар-Ай");

  await page.goto("/kk");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ар-Ай");
});

test("language switch keeps current service page", async ({ page }) => {
  await page.goto("/ru/services/caries-treatment");
  await page.getByRole("link", { name: /KK/ }).first().click();
  await expect(page).toHaveURL(/\/kk\/services\/caries-treatment$/);
});

test("appointment form does not submit without consent", async ({ page }) => {
  await page.goto("/ru/contacts");
  await page.getByLabel("Имя").fill("Айгуль");
  await page.getByLabel("Телефон").fill("+7 771 439 22 70");
  await page.getByLabel("Интересующая услуга").selectOption({ index: 1 });
  await page.getByRole("button", { name: "Отправить заявку" }).click();
  await expect(
    page.getByText("Нужно согласие на обработку персональных данных.")
  ).toBeVisible();
});

test("invalid phone shows a clear error", async ({ page }) => {
  await page.goto("/ru/contacts");
  await page.getByLabel("Имя").fill("Айгуль");
  await page.getByLabel("Телефон").fill("123");
  await page.getByLabel("Интересующая услуга").selectOption({ index: 1 });
  await page.getByLabel(/Я согласен/).check();
  await page.getByRole("button", { name: "Отправить заявку" }).click();
  await expect(
    page.getByText("Введите корректный номер Казахстана в формате +7.")
  ).toBeVisible();
});

test("sticky mobile CTA is visible on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ru");
  await expect(page.getByTestId("sticky-mobile-cta")).toBeVisible();
});

for (const path of pagesWithH1) {
  test(`page ${path} has exactly one h1`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("sitemap is generated", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const body = await response.text();
  expect(body).toContain("/ru/services");
  expect(body).toContain("/kk/services/caries-treatment");
});
