import { z } from "zod";

import { demoProductSchema, segmentSchema } from "./schema";

// Segmentos atendidos, conforme a descrição comercial da empresa ("peças para automóveis,
// caminhonetes, vans, caminhões, ônibus e micro-ônibus"). Ainda não há catálogo por segmento:
// cada card abre a vitrine filtrada pela linha correspondente.
// Sem foto (`image: null`), o card mostra o ícone do segmento. Ao trocar uma foto, registre o
// crédito em credits.ts.
export const segments = z.array(segmentSchema).parse([
  {
    id: "automoveis",
    name: "Automóveis",
    description: "Carros de passeio, do uso diário à manutenção preventiva.",
    line: "leve",
    // Mesma foto da seção "Linha leve", com outro recorte (o carro inteiro, sem o céu).
    image: { src: "/images/linha-leve.webp", position: "50% 85%" },
  },
  {
    id: "caminhonetes-vans",
    name: "Caminhonetes e vans",
    description: "Picapes e utilitários para trabalho, carga e passageiros.",
    line: "leve",
    image: { src: "/images/segmento-caminhonetes-vans.webp", position: "50% 40%" },
  },
  {
    id: "caminhoes",
    name: "Caminhões",
    description: "Do caminhão leve ao pesado, para quem não pode parar.",
    line: "pesada",
    // Mesma foto da seção "Linha pesada", com outro recorte (a carreta em primeiro plano).
    image: { src: "/images/linha-pesada.webp", position: "35% 72%" },
  },
  {
    id: "onibus",
    name: "Ônibus e micro-ônibus",
    description: "Peças para frotas de transporte de passageiros.",
    line: "pesada",
    image: { src: "/images/segmento-onibus.webp", position: "50% 50%" },
  },
]);

// Produtos DEMONSTRATIVOS: sem preço, estoque ou link de anúncio.
// Ordem "do fusível ao motor": das peças menores às maiores. Para trocar por produtos reais,
// substitua os itens (e as fotos em public/images, com crédito em credits.ts).
export const demoProducts = z.array(demoProductSchema).parse([
  {
    id: "demo-fusiveis",
    name: "Fusíveis de lâmina",
    category: "Elétrica",
    line: "Leve e pesada",
    image: "/images/produto-fusiveis.webp",
    imageAlt: "Fusíveis automotivos de lâmina coloridos",
    demo: true,
  },
  {
    id: "demo-vela",
    name: "Vela de ignição",
    category: "Ignição",
    line: "Leve",
    image: "/images/produto-vela-ignicao.webp",
    imageAlt: "Vela de ignição NGK com a embalagem ao fundo",
    demo: true,
  },
  {
    id: "demo-filtro-combustivel",
    name: "Filtro separador de combustível",
    category: "Filtros",
    line: "Pesada",
    image: "/images/produto-filtro-combustivel.webp",
    imageAlt: "Filtro separador de combustível Mann-Filter WK 1050/1 com copo de dreno",
    demo: true,
  },
  {
    id: "demo-disco-freio",
    name: "Disco de freio",
    category: "Freios",
    line: "Leve",
    image: "/images/produto-disco-freio.webp",
    imageAlt: "Disco de freio com pinça montado no cubo da roda",
    demo: true,
  },
  {
    id: "demo-bomba-agua",
    name: "Bomba d'água",
    category: "Arrefecimento",
    line: "Leve",
    image: "/images/produto-bomba-agua.webp",
    imageAlt: "Bomba d'água automotiva com rotor e engrenagem, em fundo cinza claro",
    demo: true,
  },
  {
    id: "demo-amortecedor",
    name: "Amortecedor com mola",
    category: "Suspensão",
    line: "Leve",
    image: "/images/produto-amortecedor.webp",
    imageAlt: "Conjunto de amortecedor com mola helicoidal",
    demo: true,
  },
  {
    id: "demo-alternador",
    name: "Alternador",
    category: "Elétrica",
    line: "Leve e pesada",
    image: "/images/produto-alternador.webp",
    imageAlt: "Alternador instalado no compartimento do motor",
    demo: true,
  },
  {
    id: "demo-turbo",
    name: "Turbocompressor",
    category: "Motor",
    line: "Pesada",
    image: "/images/produto-turbocompressor.webp",
    imageAlt: "Turbocompressor com atuador da válvula wastegate, em fundo cinza claro",
    demo: true,
  },
]);
