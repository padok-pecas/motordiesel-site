import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ChannelButton } from "@/components/ui/channel-button";
import { WhatsAppFloatLink } from "@/components/ui/whatsapp-button";
import { reviewsSchema, siteSchema } from "@/content/schema";
import { site } from "@/content/site";

const emptyReviews = {
  rating: null,
  count: null,
  profileUrl: null,
  verifiedAt: null,
  testimonials: [],
};

const review = { text: "Ótimo atendimento.", author: null, stars: 5, date: null };

describe("avaliações do Google", () => {
  it("usa o perfil oficial e a nota conferida, sem quantidade nem depoimentos não verificados", () => {
    expect(site.reviews.profileUrl).toBe("https://maps.app.goo.gl/1LnuvznFca8aMC2c8");
    expect(site.reviews.rating).toBe(4.5);
    expect(site.reviews.verifiedAt).not.toBeNull();
    // Não visíveis na consulta pública (14/10/2026): só entram quando conferidos.
    expect(site.reviews.count).toBeNull();
    expect(site.reviews.testimonials).toEqual([]);
  });

  it("recusa nota, quantidade ou depoimentos sem data de conferência", () => {
    expect(reviewsSchema.safeParse(emptyReviews).success).toBe(true);
    expect(reviewsSchema.safeParse({ ...emptyReviews, rating: 4.5 }).success).toBe(false);
    expect(reviewsSchema.safeParse({ ...emptyReviews, testimonials: [review] }).success).toBe(
      false,
    );
  });

  it("aceita dados conferidos; quantidade só com nota", () => {
    const verified = { ...emptyReviews, verifiedAt: "2026-10-14" };
    expect(reviewsSchema.safeParse({ ...verified, rating: 4.5 }).success).toBe(true);
    expect(reviewsSchema.safeParse({ ...verified, rating: 4.5, count: 188 }).success).toBe(true);
    expect(reviewsSchema.safeParse({ ...verified, count: 188 }).success).toBe(false);
    expect(reviewsSchema.safeParse({ ...verified, rating: 6 }).success).toBe(false);
  });

  it("depoimentos: estrelas inteiras de 1 a 5 e nenhum campo extra", () => {
    const verified = { ...emptyReviews, verifiedAt: "2026-10-14" };
    const withReview = (item: object) =>
      reviewsSchema.safeParse({ ...verified, testimonials: [item] }).success;
    expect(withReview(review)).toBe(true);
    expect(withReview({ ...review, stars: 4.5 })).toBe(false);
    expect(withReview({ ...review, photo: "https://x.com/a.jpg" })).toBe(false);
  });

  it("só aceita o link do perfil no Google Maps", () => {
    const withUrl = (profileUrl: string) =>
      reviewsSchema.safeParse({ ...emptyReviews, profileUrl }).success;
    expect(withUrl("https://maps.app.goo.gl/abc123")).toBe(true);
    expect(withUrl("https://www.google.com/maps/place/MotorDiesel")).toBe(true);
    expect(withUrl("https://www.google.com/search?q=motordiesel")).toBe(false);
    expect(withUrl("https://maps.google.com.golpe.com/x")).toBe(false);
  });
});

describe("redes sociais", () => {
  const withSocial = (social: Partial<typeof site.social>) =>
    siteSchema.safeParse({ ...site, social: { ...site.social, ...social } }).success;

  it("usa o perfil oficial do Instagram e nenhuma rede não informada", () => {
    expect(site.social.instagram).toBe("https://www.instagram.com/motordieselauto");
    if (!site.isPrototype) return;
    expect([site.social.facebook, site.social.tiktok, site.social.youtube]).toEqual([
      null,
      null,
      null,
    ]);
  });

  it("valida o domínio de cada rede", () => {
    expect(withSocial({ instagram: "https://www.instagram.com/motordiesel" })).toBe(true);
    expect(withSocial({ instagram: "https://instagram.com.golpe.com/x" })).toBe(false);
    expect(withSocial({ facebook: "http://facebook.com/motordiesel" })).toBe(false);
  });
});

describe("botão flutuante do WhatsApp", () => {
  it("com número configurado, abre a conversa em nova aba e tem rótulo acessível", () => {
    const html = renderToStaticMarkup(
      createElement(WhatsAppFloatLink, { href: "https://wa.me/5599912345678" }),
    );
    expect(html).toContain('href="https://wa.me/5599912345678"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('aria-label="Conversar com a MotorDiesel no WhatsApp');
  });
});

describe("CTA de canal sem endereço", () => {
  it("vira um botão de aviso, sem link", () => {
    const html = renderToStaticMarkup(
      createElement(ChannelButton, {
        href: null,
        label: "Loja",
        icon: null,
        channel: "store",
        pendingMessage: "Em configuração",
      }),
    );
    expect(html).toContain("<button");
    expect(html).toContain('data-cta-state="placeholder"');
    expect(html).not.toContain("href=");
  });
});
