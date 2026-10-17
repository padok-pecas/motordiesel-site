import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { categories, demoProducts } from "@/content/catalog";
import { imageCredits } from "@/content/credits";
import { categorySchema, demoProductSchema, siteSchema } from "@/content/schema";
import { site } from "@/content/site";
import { getStoreUrl, getWhatsappUrl } from "@/lib/store";

const publicDir = join(process.cwd(), "public");

describe("site", () => {
  it("é válido segundo o schema", () => {
    expect(siteSchema.safeParse(site).success).toBe(true);
  });

  it("canais configurados estão em formato válido", () => {
    expect(site.mercadoLivre.storeUrl).toMatch(/^https:\/\/www\.mercadolivre\.com\.br\//);
    if (site.contact.whatsapp) expect(site.contact.whatsapp).toMatch(/^55\d{10,11}$/);
    if (site.contact.phone) expect(site.contact.phone.replace(/\D/g, "")).toMatch(/^\d{10,11}$/);
  });

  it("monta os links dos canais a partir da configuração", () => {
    expect(getStoreUrl()).toBe(site.mercadoLivre.storeUrl);
    if (site.contact.whatsapp)
      expect(getWhatsappUrl()).toBe(
        `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`,
      );
  });

  it("telefone precisa ter DDD", () => {
    const withPhone = (phone: string) =>
      siteSchema.safeParse({ ...site, contact: { ...site.contact, phone } }).success;
    expect(withPhone("(99) 3525-3432")).toBe(true);
    expect(withPhone("3525-3432")).toBe(false);
  });
});

describe("WhatsApp", () => {
  const withNumber = (whatsapp: string) =>
    siteSchema.safeParse({ ...site, contact: { ...site.contact, whatsapp } });

  it("aceita apenas dígitos com DDI e DDD", () => {
    expect(withNumber("5599912345678").success).toBe(true);
    expect(withNumber("(99) 91234-5678").success).toBe(false);
    expect(withNumber("99912345678").success).toBe(false);
  });
});

describe("URL da loja", () => {
  const withStore = (storeUrl: string) =>
    siteSchema.safeParse({ ...site, mercadoLivre: { storeUrl } });

  it("aceita endereços https do Mercado Livre Brasil", () => {
    expect(withStore("https://www.mercadolivre.com.br/pagina/motordiesel").success).toBe(true);
    expect(withStore("https://lista.mercadolivre.com.br/_CustId_123").success).toBe(true);
  });

  it("recusa http, outros domínios e domínios parecidos", () => {
    expect(withStore("http://www.mercadolivre.com.br/loja").success).toBe(false);
    expect(withStore("https://exemplo.com/loja").success).toBe(false);
    expect(withStore("https://mercadolivre.com.br.golpe.com/loja").success).toBe(false);
    expect(withStore("https://fakemercadolivre.com.br/loja").success).toBe(false);
  });
});

describe("catálogo demonstrativo", () => {
  it("todos os produtos são demonstrativos", () => {
    expect(demoProducts.length).toBeGreaterThan(0);
    expect(demoProducts.every((product) => product.demo === true)).toBe(true);
  });

  it("recusa preço, estoque ou link de anúncio em produtos demonstrativos", () => {
    const base = {
      id: "x",
      name: "Peça",
      category: "Motor",
      line: "Leve",
      image: "/images/produto-alternador.webp",
      imageAlt: "Peça",
      demo: true,
    };
    expect(demoProductSchema.safeParse(base).success).toBe(true);
    expect(demoProductSchema.safeParse({ ...base, price: 99.9 }).success).toBe(false);
    expect(demoProductSchema.safeParse({ ...base, stock: 3 }).success).toBe(false);
    expect(
      demoProductSchema.safeParse({ ...base, url: "https://www.mercadolivre.com.br/x" }).success,
    ).toBe(false);
  });

  it("produtos têm foto existente, texto alternativo e ids únicos", () => {
    const ids = new Set(demoProducts.map((product) => product.id));
    expect(ids.size).toBe(demoProducts.length);
    for (const product of demoProducts) {
      expect(existsSync(join(publicDir, product.image)), product.image).toBe(true);
      expect(product.imageAlt.length).toBeGreaterThan(5);
    }
  });

  it("vitrine cobre a linha leve e a pesada", () => {
    const lines = new Set(demoProducts.map((product) => product.line));
    expect(lines.has("Leve")).toBe(true);
    expect(lines.has("Pesada")).toBe(true);
  });

  it("categorias têm imagens existentes e ids únicos", () => {
    const ids = new Set(categories.map((category) => category.id));
    expect(ids.size).toBe(categories.length);
    for (const category of categories) {
      expect(categorySchema.safeParse(category).success).toBe(true);
      expect(existsSync(join(publicDir, category.image)), category.image).toBe(true);
    }
  });
});

describe("créditos das imagens", () => {
  it("cada foto em public/images tem crédito e vice-versa", async () => {
    const { readdirSync } = await import("node:fs");
    const files = readdirSync(join(publicDir, "images")).sort();
    expect(imageCredits.map((credit) => credit.file).sort()).toEqual(files);
  });

  it("créditos não se repetem", () => {
    const files = imageCredits.map((credit) => credit.file);
    expect(new Set(files).size).toBe(files.length);
  });
});
