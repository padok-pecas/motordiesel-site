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
  await expect(page).toHaveTitle(/Sobre nós \| MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sobre nós/i);
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

test("/leve-e-pesada: as duas linhas, com links para a vitrine da home", async ({ page }) => {
  await page.goto("/leve-e-pesada");
  await expect(page).toHaveTitle(/Leve e Pesada \| MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Leve e Pesada/i);
  await expect(page.getByRole("heading", { name: /Uma loja, duas linhas/i })).toBeVisible();
  const lines = page.locator("#linhas article");
  await expect(lines).toHaveCount(2);
  for (const name of ["Linha leve", "Linha pesada"]) {
    await expect(page.getByRole("heading", { level: 3, name })).toBeVisible();
  }
  for (const img of await page.locator("#linhas img").all()) {
    expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(
      true,
    );
  }
  const links = page.locator("#linhas").getByRole("link", { name: /Ver peças em destaque/i });
  await expect(links).toHaveCount(2);
  await links.first().click();
  await expect(page).toHaveURL(/\/#destaques$/);
  await expect(page.locator("#destaques")).toBeInViewport();
});

test("páginas internas: trilha de navegação volta ao início", async ({ page }) => {
  for (const path of ["/como-comprar", "/sobre", "/leve-e-pesada"]) {
    await page.goto(path);
    const trail = page.getByRole("navigation", { name: "Trilha de navegação" });
    await expect(trail.locator('[aria-current="page"]')).toBeVisible();
    await trail.getByRole("link", { name: "Início" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("#inicio")).toBeVisible();
  }
});

test("menu superior: Home, menus suspensos e item atual", async ({ page, isMobile }) => {
  test.skip(isMobile, "menu de desktop");
  const nav = page.getByRole("navigation", { name: "Principal" });
  const open = async (label: string) => {
    const button = nav.getByRole("button", { name: label });
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
  };

  await page.goto("/sobre");
  // Institucional: exatamente as três opções.
  await open("Institucional");
  const institutional = nav
    .locator("li", { has: page.getByRole("button", { name: "Institucional" }) })
    .getByRole("link");
  await expect(institutional).toHaveText(["Sobre nós", "Missão, Visão e Valores", "Nossa marca"]);
  await expect(nav.getByRole("link", { name: "Sobre nós" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  // Esc fecha e devolve o foco ao botão.
  await page.keyboard.press("Escape");
  await expect(nav.getByRole("button", { name: "Institucional" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(nav.getByRole("button", { name: "Institucional" })).toBeFocused();

  await open("Institucional");
  await nav.getByRole("link", { name: "Missão, Visão e Valores" }).click();
  await expect(page).toHaveURL(/\/missao-visao-valores$/);
  await open("Institucional");
  await nav.getByRole("link", { name: "Nossa marca" }).click();
  await expect(page).toHaveURL(/\/nossa-marca$/);

  // Produtos: Categorias, Vitrine e Leve e Pesada.
  await open("Produtos");
  await expect(
    nav.locator("li", { has: page.getByRole("button", { name: "Produtos" }) }).getByRole("link"),
  ).toHaveText(["Categorias", "Vitrine", "Leve e Pesada"]);
  await nav.getByRole("link", { name: "Leve e Pesada" }).click();
  await expect(page).toHaveURL(/\/leve-e-pesada$/);
  await open("Produtos");
  await nav.getByRole("link", { name: "Vitrine" }).click();
  await expect(page).toHaveURL(/\/#destaques$/);
  await expect(page.locator("#destaques")).toBeInViewport();

  // Como comprar segue como link direto; Home volta ao topo, na Hero com o vídeo.
  await nav.getByRole("link", { name: "Como comprar" }).click();
  await expect(page).toHaveURL(/\/como-comprar$/);
  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/#inicio$/);
  await expect(page.locator("#inicio")).toBeInViewport();
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(10);
});

test("menu suspenso funciona pelo teclado", async ({ page, isMobile }) => {
  test.skip(isMobile, "menu de desktop");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Principal" });
  const button = nav.getByRole("button", { name: "Institucional" });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Sobre nós" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/sobre$/);
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
  for (const label of [
    "Home",
    "Categorias",
    "Vitrine",
    "Leve e Pesada",
    "Sobre nós",
    "Missão, Visão e Valores",
    "Nossa marca",
  ]) {
    await expect(menu.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await menu.getByRole("link", { name: "Sobre nós" }).click();
  await expect(page).toHaveURL(/\/sobre$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Sobre nós/i);
  await expect(page.locator("#menu-mobile")).toBeHidden();
});

test("/missao-visao-valores: missão, visão e os cinco valores", async ({ page }) => {
  await page.goto("/missao-visao-valores");
  await expect(page).toHaveTitle(/Missão, Visão e Valores \| MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Missão, Visão e Valores/i);
  for (const name of ["Nossa missão", "Nossa visão", "Nossos valores"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.getByText(/impulsionar a mobilidade/)).toBeVisible();
  await expect(page.getByText(/regiões Norte e Nordeste/)).toBeVisible();
  await expect(page.locator("[aria-labelledby='valores-title'] li")).toHaveText([
    "Integridade em cada situação.",
    "Proximidade que gera valor.",
    "Crescimento com responsabilidade.",
    "Excelência operacional.",
    "Valorização das pessoas.",
  ]);
});

test("/nossa-marca: texto da marca e manual (botões só com o PDF publicado)", async ({
  page,
  request,
}) => {
  await page.goto("/nossa-marca");
  await expect(page).toHaveTitle(/Nossa marca \| MotorDiesel/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Nossa marca/i);
  await expect(page.getByText("Padok Peças: uma marca, uma identidade.")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Manual da Marca Padok Peças" }),
  ).toBeVisible();

  const pdf = await request.get("/documentos/manual-da-marca-padok-pecas.pdf");
  const view = page.locator('[data-manual="view"]');
  const download = page.locator('[data-manual="download"]');
  if (pdf.ok()) {
    await expect(view).toHaveAttribute("href", "/documentos/manual-da-marca-padok-pecas.pdf");
    await expect(view).toHaveAttribute("target", "_blank");
    await expect(download).toHaveAttribute("download", "manual-da-marca-padok-pecas.pdf");
  } else {
    // Sem o arquivo, nenhum botão simulado.
    await expect(view).toHaveCount(0);
    await expect(download).toHaveCount(0);
    await expect(page.getByText(/disponível para consulta e download em breve/)).toBeVisible();
  }
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
