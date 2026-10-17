import { z } from "zod";

// Só aceita endereços oficiais do Mercado Livre Brasil (https). `null` = ainda não configurado.
const mercadoLivreUrl = z.url({ protocol: /^https$/ }).refine((value) => {
  const host = new URL(value).hostname;
  return host === "mercadolivre.com.br" || host.endsWith(".mercadolivre.com.br");
}, "A URL precisa ser do Mercado Livre Brasil (mercadolivre.com.br).");

const optionalText = z.string().trim().min(1).nullable();

/** URL https de um dos domínios informados (ou subdomínio deles). */
function urlOn(domains: string[], label: string) {
  return z
    .url({ protocol: /^https$/ })
    .refine((value) => {
      const host = new URL(value).hostname;
      return domains.some((domain) => host === domain || host.endsWith(`.${domain}`));
    }, `A URL precisa ser do ${label}.`)
    .nullable();
}

// Perfil da empresa no Google (Maps/Perfil da Empresa). Links curtos oficiais também valem.
const googleProfileUrl = z
  .url({ protocol: /^https$/ })
  .refine((value) => {
    const { hostname, pathname } = new URL(value);
    if (hostname === "maps.app.goo.gl" || hostname === "g.page") return true;
    if (hostname === "maps.google.com" || hostname === "maps.google.com.br") return true;
    return /^(www\.)?google\.com(\.br)?$/.test(hostname) && pathname.startsWith("/maps");
  }, "Use o link do perfil da empresa no Google Maps.")
  .nullable();

/**
 * Depoimento copiado FIELMENTE de uma avaliação pública no Google. Use só os dados que aparecem
 * na avaliação (nome público, estrelas, data); o que não estiver visível fica `null`.
 */
export const testimonialSchema = z
  .object({
    text: z.string().trim().min(1),
    author: z.string().trim().min(1).nullable(),
    stars: z.number().int().min(1).max(5).nullable(),
    /** Data como aparece no Google (ex.: "setembro de 2026"). */
    date: z.string().trim().min(1).nullable(),
  })
  .strict();

/**
 * Avaliações do Google. Nada aparece no site sem `verifiedAt` (data em que a nota, a quantidade
 * e os depoimentos foram conferidos no perfil oficial).
 */
export const reviewsSchema = z
  .object({
    rating: z.number().min(1).max(5).multipleOf(0.1).nullable(),
    /** Quantidade de avaliações — só quando visível no perfil. */
    count: z.number().int().positive().nullable(),
    profileUrl: googleProfileUrl,
    verifiedAt: z.iso.date().nullable(),
    testimonials: z.array(testimonialSchema).max(6),
  })
  .refine(
    (reviews) =>
      reviews.verifiedAt !== null ||
      (reviews.rating === null && reviews.count === null && reviews.testimonials.length === 0),
    "Nota, quantidade e depoimentos só podem ser preenchidos com `verifiedAt` (data da conferência).",
  )
  .refine(
    (reviews) => reviews.count === null || reviews.rating !== null,
    "A quantidade de avaliações precisa vir acompanhada da nota.",
  );

export const siteSchema = z.object({
  name: z.string().min(1),
  slogan: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2),
  group: z.string().min(1),
  /** Enquanto `true`, o site não é indexado por buscadores (noindex). */
  isPrototype: z.boolean(),
  /** Razão social, CNPJ e textos institucionais só entram depois de confirmados. */
  legalName: optionalText,
  cnpj: optionalText,
  about: optionalText,
  mercadoLivre: z.object({ storeUrl: mercadoLivreUrl.nullable() }),
  /** Mensagem que já vem escrita ao abrir a conversa no WhatsApp. */
  whatsappMessage: z.string().trim().min(1),
  contact: z.object({
    /** Somente dígitos, com DDI e DDD (ex.: 5599XXXXXXXXX). */
    whatsapp: z
      .string()
      .regex(/^\d{12,13}$/)
      .nullable(),
    /** Com DDD, ex.: "(99) 3525-3432" — vira link de ligação (tel:). */
    phone: z
      .string()
      .trim()
      .refine(
        (value) => /^\d{10,11}$/.test(value.replace(/\D/g, "")),
        "Informe o telefone com DDD.",
      )
      .nullable(),
    email: z.email().nullable(),
    address: optionalText,
    hours: optionalText,
  }),
  /** Redes sociais: só aparecem no rodapé quando o endereço oficial for informado. */
  social: z.object({
    instagram: urlOn(["instagram.com"], "Instagram"),
    facebook: urlOn(["facebook.com"], "Facebook"),
    tiktok: urlOn(["tiktok.com"], "TikTok"),
    youtube: urlOn(["youtube.com"], "YouTube"),
  }),
  reviews: reviewsSchema,
});

export const categorySchema = z.object({
  id: z.string().regex(/^[a-z-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().startsWith("/images/"),
  /** Link da categoria na loja; `null` até existir o endereço oficial. */
  storeUrl: mercadoLivreUrl.nullable(),
});

export const productLines = ["Leve", "Pesada", "Leve e pesada"] as const;

// `strict()` impede que preço, estoque ou link de anúncio sejam adicionados a um produto
// demonstrativo por engano.
export const demoProductSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    category: z.string().min(1),
    line: z.enum(productLines),
    /** Foto ilustrativa em public/images — precisa mostrar a peça do título. */
    image: z.string().startsWith("/images/"),
    imageAlt: z.string().min(1),
    demo: z.literal(true),
  })
  .strict();

export const imageCreditSchema = z.object({
  file: z.string().regex(/^[a-z0-9-]+\.webp$/),
  author: z.string().min(1),
  source: z.enum(["Unsplash", "Wikimedia Commons", "Acervo MotorDiesel"]),
  license: z.string().min(1),
  /** Página original da foto; `null` para fotos próprias da empresa. */
  url: z.url({ protocol: /^https$/ }).nullable(),
  licenseUrl: z.url({ protocol: /^https$/ }).nullable(),
});

export type Site = z.infer<typeof siteSchema>;
export type Category = z.infer<typeof categorySchema>;
export type DemoProduct = z.infer<typeof demoProductSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type ProductLine = (typeof productLines)[number];
