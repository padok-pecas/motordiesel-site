import { z } from "zod";

import { imageCreditSchema } from "./schema";

const UNSPLASH = {
  source: "Unsplash",
  license: "Unsplash License",
  licenseUrl: "https://unsplash.com/license",
} as const;

// Fotos provisórias. Licença e autoria conferidas em 13/10/2026 (categorias) e 14/10/2026
// (demais). Todas foram recortadas, redimensionadas e convertidas para WebP.
// Substituir por fotos próprias quando disponíveis — um teste exige crédito para cada arquivo
// de public/images.
export const imageCredits = z.array(imageCreditSchema).parse([
  {
    // Foto própria do balcão de vendas, cedida pela empresa (uso autorizado em 14/10/2026).
    file: "sobre-balcao.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Foto própria — uso autorizado pela empresa",
    licenseUrl: null,
  },
  {
    file: "hero-motor-diesel.webp",
    author: "Franco Baldoni",
    url: "https://unsplash.com/photos/oT8V4mQxVGY",
    ...UNSPLASH,
  },
  {
    file: "linha-leve.webp",
    author: "Hannes Egler",
    url: "https://unsplash.com/photos/3iHW2HLqTXU",
    ...UNSPLASH,
  },
  {
    file: "linha-pesada.webp",
    author: "Vitalii Onyshchuk",
    url: "https://unsplash.com/photos/qms-kprAgJM",
    ...UNSPLASH,
  },
  {
    file: "cta-rodovia.webp",
    author: "Joshua Woroniecki",
    url: "https://unsplash.com/photos/AYpTClfno2U",
    ...UNSPLASH,
  },
  {
    file: "cat-motor.webp",
    author: "Chad Kirchoff",
    url: "https://unsplash.com/photos/xe-e69j6-Ds",
    ...UNSPLASH,
  },
  {
    file: "cat-filtros.webp",
    author: "Rahul Bhogal",
    url: "https://unsplash.com/photos/9mxviB2BBOE",
    ...UNSPLASH,
  },
  {
    file: "cat-suspensao.webp",
    author: "Sam Loyd",
    url: "https://unsplash.com/photos/qy27JnsH9sU",
    ...UNSPLASH,
  },
  {
    file: "cat-escapamento.webp",
    author: "engin akyurt",
    url: "https://unsplash.com/photos/-ShTRctVXlk",
    ...UNSPLASH,
  },
  {
    file: "cat-lubrificantes.webp",
    author: "Tim Mossholder",
    url: "https://unsplash.com/photos/V37iTrYZz2E",
    ...UNSPLASH,
  },
  {
    // CC BY-SA: a versão recortada usada aqui segue disponível sob a mesma licença.
    file: "produto-fusiveis.webp",
    author: "Illusive255",
    url: "https://commons.wikimedia.org/wiki/File:Fuse255.jpg",
    source: "Wikimedia Commons",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  {
    // Foto de produto enviada pela MotorDiesel em 17/10/2026.
    file: "produto-vela-ignicao.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Imagem fornecida pela empresa",
    licenseUrl: null,
  },
  {
    // Foto de produto enviada pela MotorDiesel em 17/10/2026.
    file: "produto-filtro-combustivel.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Imagem fornecida pela empresa",
    licenseUrl: null,
  },
  {
    file: "produto-disco-freio.webp",
    author: "Benjamin Brunner",
    url: "https://unsplash.com/photos/al01Ad0f_KI",
    ...UNSPLASH,
  },
  {
    // Foto de produto enviada pela MotorDiesel em 17/10/2026.
    file: "produto-bomba-agua.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Imagem fornecida pela empresa",
    licenseUrl: null,
  },
  {
    file: "produto-amortecedor.webp",
    author: "Jason Leung",
    url: "https://unsplash.com/photos/j6hSBrP3PBk",
    ...UNSPLASH,
  },
  {
    file: "produto-alternador.webp",
    author: "Manuel E Sankitts",
    url: "https://unsplash.com/photos/i2kOA2p0DTo",
    ...UNSPLASH,
  },
  {
    // Foto de produto enviada pela MotorDiesel em 16/10/2026.
    file: "produto-turbocompressor.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Imagem fornecida pela empresa",
    licenseUrl: null,
  },
  {
    // Imagem criada e enviada pela MotorDiesel em 19/10/2026 (card "Caminhonetes e vans").
    file: "segmento-caminhonetes-vans.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Imagem fornecida pela empresa",
    licenseUrl: null,
  },
  {
    // Imagem criada e enviada pela MotorDiesel em 19/10/2026 (card "Ônibus e micro-ônibus").
    file: "segmento-onibus.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Imagem fornecida pela empresa",
    licenseUrl: null,
  },
  {
    // Foto da fachada da loja, enviada pela MotorDiesel em 19/10/2026 (faixa "Compre online").
    file: "fachada-loja.webp",
    author: "MotorDiesel",
    url: null,
    source: "Acervo MotorDiesel",
    license: "Foto própria — uso autorizado pela empresa",
    licenseUrl: null,
  },
]);
