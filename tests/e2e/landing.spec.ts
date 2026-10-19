import { expect, test } from "@playwright/test";

import { imageCredits } from "../../src/content/credits";
import { site } from "../../src/content/site";

const STORE_URL = site.mercadoLivre.storeUrl ?? "";
const WHATSAPP = site.contact.whatsapp ?? "";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("apresenta a marca e o título, sem faixa de protótipo", async ({ page }) => {
  await expect(page).toHaveTitle(/MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Do leve");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Do fusível ao motor");
  await expect(page.getByText("Protótipo visual")).toHaveCount(0);
  await expect(page.getByRole("img", { name: "MotorDiesel" }).first()).toBeVisible();
});

test("antes do lançamento, o site não é indexável", async ({ page }) => {
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("CTAs do Mercado Livre abrem o link oficial em nova aba", async ({ page }) => {
  const ctas = page.locator('[data-channel="store"]');
  expect(await ctas.count()).toBeGreaterThan(3);
  await expect(page.locator('[data-cta-state="placeholder"]')).toHaveCount(0);
  for (const cta of await ctas.all()) {
    await expect(cta).toHaveAttribute("href", STORE_URL);
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);
  }
});

test("WhatsApp: botões e botão flutuante abrem a conversa oficial", async ({ page }) => {
  const links = page.locator('[data-channel="whatsapp"], [data-channel="whatsapp-float"]');
  expect(await links.count()).toBeGreaterThan(2);
  const expected = new RegExp(String.raw`^https://wa\.me/${WHATSAPP}\?text=`);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", expected);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
  const float = page.locator('[data-channel="whatsapp-float"]');
  await expect(float).toBeVisible();
  await expect(float).toHaveAccessibleName(/WhatsApp/);
});

test("“Encontrar minha peça” leva às categorias", async ({ page }) => {
  await page.getByRole("link", { name: "Encontrar minha peça" }).first().click();
  await expect(page).toHaveURL(/#categorias$/);
  await expect(page.getByRole("heading", { name: /Navegue por categoria/i })).toBeInViewport();
});

test("produtos são demonstrativos, têm foto e não exibem preço", async ({ page }) => {
  const products = page.locator("#destaques li article");
  await expect(products).toHaveCount(8);
  // Aviso no cabeçalho da vitrine (não sobre as fotos).
  await expect(page.locator("#destaques").getByText("Produtos demonstrativos")).toBeVisible();
  await expect(products.first()).not.toContainText("Demonstrativo");
  await expect(page.locator("#destaques")).not.toContainText("R$");

  const images = page.locator("#destaques li article img");
  await expect(images).toHaveCount(8);
  for (const alt of await images.evaluateAll((els) => els.map((el) => el.getAttribute("alt")))) {
    expect(alt?.length).toBeGreaterThan(5);
  }
});

test("filtro da vitrine separa linha leve e pesada", async ({ page }) => {
  const products = page.locator("#destaques li article");
  await page.getByRole("button", { name: "Linha pesada" }).click();
  await expect(products).toHaveCount(4);
  await expect(products.filter({ hasText: "Vela de ignição" })).toHaveCount(0);
  await page.getByRole("button", { name: "Linha leve" }).click();
  await expect(products.filter({ hasText: "Turbocompressor" })).toHaveCount(0);
  await page.getByRole("button", { name: "Todas" }).click();
  await expect(products).toHaveCount(8);
});

test("todas as imagens carregam", async ({ page }) => {
  for (let y = 0; y < 12_000; y += 700) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.src),
  );
  expect(broken).toEqual([]);
});

test("não há rolagem horizontal", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("conteúdo aparece mesmo sem JavaScript (sem áreas vazias)", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  for (const selector of ["#categorias li", "#linhas article", "#destaques li", "#sobre img"]) {
    const target = page.locator(selector).first();
    await target.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(150);
    const opacity = await target.evaluate((el) => {
      let node: Element | null = el;
      let value = 1;
      while (node) {
        value *= Number(getComputedStyle(node).opacity);
        node = node.parentElement;
      }
      return value;
    });
    expect(opacity, selector).toBeGreaterThan(0.95);
  }
  await context.close();
});

test("hero: vídeo de fundo mudo, em loop e decorativo", async ({ page, request }) => {
  const file = await request.get("/videos/motor-diesel-hero.mp4");
  expect(file.status()).toBe(200);
  expect(file.headers()["content-type"]).toContain("video/mp4");

  // O Chromium do Playwright pode não ter o codec H.264: aí o vídeo sai e fica o fundo.
  const playable = await page.evaluate(() =>
    document.createElement("video").canPlayType("video/mp4"),
  );
  test.skip(!playable, "navegador de teste sem suporte a MP4");

  const video = page.locator("#inicio video");
  await expect(video).toHaveAttribute("src", "/videos/motor-diesel-hero.mp4");
  await expect(video).toHaveAttribute("aria-hidden", "true");
  for (const attr of ["autoplay", "loop", "playsinline"]) {
    await expect(video).toHaveAttribute(attr, "");
  }
  expect(await video.evaluate((el: HTMLVideoElement) => el.muted)).toBe(true);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("hero: com movimento reduzido, o vídeo não é carregado", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const requested: string[] = [];
  page.on("request", (req) => requested.push(req.url()));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.waitForLoadState("networkidle");
  await expect(page.locator("#inicio video")).toHaveCount(0);
  expect(requested.some((url) => url.includes("/videos/"))).toBe(false);
  await context.close();
});

test("menu mobile abre, navega e fecha com Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "apenas mobile");
  const toggle = page.getByRole("button", { name: "Abrir menu" });
  await toggle.click();
  const menu = page.locator("#menu-mobile");
  await expect(menu).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();

  await toggle.click();
  await menu.getByRole("link", { name: "Como comprar" }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#como-comprar$/);
});

test("todos os links internos levam a seções existentes", async ({ page }) => {
  const hrefs = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
  expect(hrefs.length).toBeGreaterThan(5);
  for (const href of hrefs) {
    await expect(page.locator(href!), href!).toHaveCount(1);
  }
});

test("rodapé: navegação completa e “Contato” leva aos contatos", async ({ page }) => {
  const footerNav = page.getByRole("navigation", { name: "Rodapé" });
  for (const label of [
    "Início",
    "Categorias",
    "Linha leve e pesada",
    "Destaques",
    "Como comprar",
    "Sobre",
    "Contato",
  ]) {
    await expect(footerNav.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await footerNav.getByRole("link", { name: "Contato", exact: true }).click();
  await expect(page).toHaveURL(/#contato$/);
  await expect(page.locator("#contato")).toBeInViewport();
});

test("final da página não exibe dados não confirmados", async ({ page }) => {
  // Só o Instagram foi informado: nenhuma outra rede nem página de privacidade.
  await expect(
    page.locator("a[href*='facebook.com'], a[href*='tiktok.com'], a[href*='youtube.com']"),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: /privacidade/i })).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText(/loja oficial/i);
});

test("Instagram oficial no rodapé (e no cabeçalho ou no menu mobile)", async ({
  page,
  isMobile,
}) => {
  const url = "https://www.instagram.com/motordieselauto";
  const footerLink = page
    .getByRole("contentinfo")
    .getByRole("link", { name: /Instagram da MotorDiesel/ });
  await expect(footerLink).toHaveAttribute("href", url);
  await expect(footerLink).toHaveAttribute("target", "_blank");
  await expect(footerLink).toHaveAttribute("rel", /noopener/);
  await expect(footerLink).toContainText("Instagram");

  const header = page.getByRole("banner");
  if (isMobile) {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(
      page.locator("#menu-mobile").getByRole("link", { name: /Instagram da MotorDiesel/ }),
    ).toHaveAttribute("href", url);
  } else {
    const headerLink = header.locator(`a[href="${url}"]`).first();
    await expect(headerLink).toBeVisible();
    await expect(headerLink).toHaveAttribute("rel", /noopener/);
  }
});

test("avaliações: nota conferida e link para o perfil oficial no Google", async ({ page }) => {
  const section = page.locator("#confianca");
  await expect(section).not.toContainText(/após confirmação/i);
  await expect(section).toContainText("4,5");
  await expect(section).toContainText(/conferida em \d{2}\/\d{2}\/\d{4}/);
  const link = section.getByRole("link", { name: /Ver todas as avaliações no Google/ });
  await expect(link).toHaveAttribute("href", "https://maps.app.goo.gl/1LnuvznFca8aMC2c8");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
});

test("faixa do Mercado Livre leva à loja", async ({ page }) => {
  const cta = page.locator('#loja [data-channel="store"]');
  await expect(cta).toHaveAttribute("href", STORE_URL);
  await expect(cta).toContainText("Visitar nossa loja");
});

test("rodapé não exibe o link de créditos", async ({ page }) => {
  await expect(page.getByRole("contentinfo").getByRole("link", { name: /Créditos/ })).toHaveCount(
    0,
  );
});

test("página de créditos lista as fotos", async ({ page }) => {
  await page.goto("/creditos");
  await expect(page.getByRole("heading", { name: "Créditos das imagens" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Ver no / })).toHaveCount(
    imageCredits.filter((credit) => credit.url).length,
  );
});
