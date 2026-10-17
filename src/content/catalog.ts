import { z } from "zod";

import { categorySchema, demoProductSchema } from "./schema";

// Categorias ILUSTRATIVAS para o protótipo — serão revisadas conforme o catálogo real.
export const categories = z.array(categorySchema).parse([
  {
    id: "motor",
    name: "Motor",
    description: "Componentes internos, correias, juntas e periféricos.",
    image: "/images/cat-motor.webp",
    storeUrl: null,
  },
  {
    id: "filtros",
    name: "Filtros",
    description: "Ar, óleo, combustível e cabine.",
    image: "/images/cat-filtros.webp",
    storeUrl: null,
  },
  {
    id: "suspensao",
    name: "Suspensão",
    description: "Amortecedores, molas, buchas e articulações.",
    image: "/images/cat-suspensao.webp",
    storeUrl: null,
  },
  {
    id: "escapamento",
    name: "Escapamento",
    description: "Coletores, silenciosos e componentes do sistema.",
    image: "/images/cat-escapamento.webp",
    storeUrl: null,
  },
  {
    id: "lubrificantes",
    name: "Lubrificantes",
    description: "Óleos e fluidos para manutenção preventiva.",
    image: "/images/cat-lubrificantes.webp",
    storeUrl: null,
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
