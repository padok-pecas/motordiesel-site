import { siteSchema } from "./schema";

/**
 * FONTE ÚNICA dos dados da MotorDiesel.
 *
 * - Campos `null` ainda não foram fornecidos/confirmados: a página mostra um aviso de
 *   "em configuração" ou oculta o item — nunca um valor inventado.
 * - Para ativar a loja, preencha `mercadoLivre.storeUrl` com o endereço oficial (https).
 * - Para ativar contatos, preencha `contact`. O WhatsApp usa apenas dígitos com DDI + DDD
 *   (ex.: "5599XXXXXXXXX"); ao preencher, os botões de WhatsApp e o botão flutuante passam a
 *   abrir a conversa com `whatsappMessage`.
 * - Redes sociais (`social`) e avaliações (`reviews`) seguem a mesma regra: só aparecem quando
 *   preenchidas com dados oficiais e confirmados.
 */
export const site = siteSchema.parse({
  name: "MotorDiesel",
  // Slogan presente no logo oficial.
  slogan: "Do leve ao pesado, simplesmente a melhor",
  city: "Imperatriz",
  state: "MA",
  group: "Grupo Padok",
  // Enquanto `true`, o site não é indexado pelos buscadores (noindex). Defina `false` no
  // lançamento.
  isPrototype: true,

  // A confirmar: em documento interno aparece "AUTO MOTOR DIESEL LTDA".
  legalName: null,
  cnpj: null,
  about:
    "A MotorDiesel constituída em dezembro de 1995 a partir do espírito visionário e empreendedor de Roberval Lira. Com 31 anos de expertise, somos referência no segmento de peças para automóveis, caminhonetes, vans, caminhões, ônibus e micro-ônibus. Em 2025 nasceu a Padok, uma marca única, mais curta, mais memorável, mais forte visualmente, mais moderna e mais expansível. Com intuito de atender tanto o atacado, varejo, linha leve, linha pesada, peças elétricas e peças mecânicas.",

  mercadoLivre: {
    // Lista de produtos do vendedor MotorDiesel no Mercado Livre, informada pela empresa em
    // 21/10/2026.
    storeUrl:
      null,
  },

  // Texto inicial da conversa. Só é usado quando `contact.whatsapp` estiver preenchido.
  whatsappMessage: "Olá, MotorDiesel! Vim pelo site e gostaria de ajuda para encontrar uma peça.",

  contact: {
    // +55 (99) 8226-0041, informado pela empresa em 17/10/2026.
    whatsapp: "559935253432",
    phone: "(99) 3525-3432",
    email: "suporte@motordiesel.com.br",
    // Endereço da loja física, informado pela empresa em 14/10/2026.
    address: "BR-010 - Entroncamento, Imperatriz - MA, 65910-140",
    hours: "Segunda a sexta das 8h às 18h, sábado das 8h às 12h",
  },

  social: {
    // Perfil oficial confirmado em 14/10/2026.
    instagram: "https://www.instagram.com/motordieselauto",
    // Página oficial informada pela empresa em 20/10/2026.
    facebook: "https://www.facebook.com/motordieselautopecas",
    tiktok: null,
    youtube: null,
  },

  // Perfil oficial no Google Maps ("MotorDiesel/Padok"). Nota 4,5 conferida em 14/10/2026.
  // A quantidade de avaliações e os comentários não aparecem na visualização pública sem login,
  // por isso ficam vazios. Para incluir depoimentos, copie o texto FIELMENTE do Google:
  //   { text: "…", author: "Nome público ou null", stars: 5, date: "setembro de 2026" }
  // Os 3 primeiros aparecem no site; os demais ficam acessíveis pelo link do perfil.
  reviews: {
    rating: 4.5,
    count: null,
    profileUrl: "https://maps.app.goo.gl/1LnuvznFca8aMC2c8",
    verifiedAt: "2026-10-14",
    testimonials: [],
  },
});
