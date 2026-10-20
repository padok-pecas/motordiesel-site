import { expect, test } from "@playwright/test";

import { site } from "../../src/content/site";

const STORE_URL = site.mercadoLivre.storeUrl ?? "";

test("/como-comprar: passo a passo, canais e metadados", async ({ page }) => {
  await page.goto("/como-comprar");
  await expect(page).toHaveTitle(/Como comprar \| MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Como comprar/i);
  await expect(page.getByRole("heading", { name: /Três passos até a sua peça/i })).toBeVisible();

  const steps = page.locator("#como-comprar ol > li");
  await expect(steps).toHaveCount(3);
  for (const step of ["Encontre a peça", "Confirme a compatibilidade", "Compre com segurança"]) {
    await expect(steps.filter({ hasText: step })).toHaveCount(1);
  }

  const section = page.locator("#como-comprar");
  await expect(section.getByRole("link", { name: /Ir para a loja/i })).toHaveAttribute(
    "href",
    STORE_URL,
  );
  await expect(section.getByRole("link", { name: /Tirar dúvidas no WhatsApp/i })).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\//,
  );
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer #contato")).toBeVisible();
});

test("/sobre: conteúdo institucional, foto e contatos", async ({ page }) => {
  await page.goto("/sobre");
  await expect(page).toHaveTitle(/Sobre \| MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sobre a MotorDiesel/i);
  await expect(
    page.getByRole("heading", { name: /Confiança de quem vive o motor/i }),
  ).toBeVisible();
  if (site.about) await expect(page.locator("#sobre")).toContainText(site.about);
  await expect(page.getByRole("img", { name: /balcão de vendas/i })).toBeVisible();

  await page
    .locator("#sobre")
    .getByRole("link", { name: /Ver contatos/i })
    .click();
  await expect(page.locator("#contato")).toBeInViewport();
});

test("páginas internas: trilha de navegação volta ao início", async ({ page }) => {
  for (const path of ["/como-comprar", "/sobre"]) {
    await page.goto(path);
    const trail = page.getByRole("navigation", { name: "Trilha de navegação" });
    await expect(trail.locator('[aria-current="page"]')).toBeVisible();
    await trail.getByRole("link", { name: "Início" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("#inicio")).toBeVisible();
  }
});

test("menu superior abre as páginas e marca a atual", async ({ page, isMobile }) => {
  test.skip(isMobile, "menu de desktop");
  const nav = page.getByRole("navigation", { name: "Principal" });

  await page.goto("/");
  await nav.getByRole("link", { name: "Como comprar" }).click();
  await expect(page).toHaveURL(/\/como-comprar$/);
  await expect(nav.getByRole("link", { name: "Como comprar" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await nav.getByRole("link", { name: "Sobre nós" }).click();
  await expect(page).toHaveURL(/\/sobre$/);
  await expect(nav.getByRole("link", { name: "Sobre nós" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  // De uma página interna, as seções da home continuam acessíveis.
  await nav.getByRole("link", { name: "Vitrine" }).click();
  await expect(page).toHaveURL(/\/#destaques$/);
  await expect(page.locator("#destaques")).toBeInViewport();
});

test("menu mobile abre a página “Sobre” a partir de outra página", async ({ page, isMobile }) => {
  test.skip(!isMobile, "apenas mobile");
  await page.goto("/como-comprar");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.locator("#menu-mobile");
  await expect(menu.getByRole("link", { name: "Como comprar" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await menu.getByRole("link", { name: "Sobre nós" }).click();
  await expect(page).toHaveURL(/\/sobre$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sobre a MotorDiesel/i);
  await expect(page.locator("#menu-mobile")).toBeHidden();
});

test("rodapé das páginas internas leva às seções da home e às páginas", async ({ page }) => {
  await page.goto("/sobre");
  const footerNav = page.getByRole("navigation", { name: "Rodapé" });
  await expect(footerNav.getByRole("link", { name: "Como comprar", exact: true })).toHaveAttribute(
    "href",
    "/como-comprar",
  );
  await footerNav.getByRole("link", { name: "Categorias", exact: true }).click();
  await expect(page).toHaveURL(/\/#categorias$/);
  await expect(page.locator("#categorias")).toBeInViewport();
});
