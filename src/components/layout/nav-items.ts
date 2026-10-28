// Seções da home usam "/#id" para funcionar também a partir das páginas internas.
export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; items: readonly NavLink[] };
export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

/** Menu superior: links diretos e menus suspensos ("Produtos", "Institucional"). */
export const navItems: readonly NavEntry[] = [
  // "#inicio" é a Hero com o vídeo, no topo da página principal.
  { href: "/#inicio", label: "Home" },
  {
    label: "Institucional",
    items: [
      { href: "/sobre", label: "Sobre nós" },
      { href: "/missao-visao-valores", label: "Missão, Visão e Valores" },
      { href: "/nossa-marca", label: "Nossa marca" },
    ],
  },
  {
    label: "Produtos",
    items: [
      { href: "/#categorias", label: "Categorias" },
      { href: "/#destaques", label: "Vitrine" },
      { href: "/leve-e-pesada", label: "Leve e Pesada" },
    ],
  },
  { href: "/como-comprar", label: "Como comprar" },
];

/**
 * Navegação completa do rodapé. "Contato" é a coluna do próprio rodapé (`#contato`), presente
 * em todas as páginas.
 */
export const footerNavItems = [
  { href: "/", label: "Início" },
  { href: "/#categorias", label: "Categorias" },
  { href: "/leve-e-pesada", label: "Linha leve e pesada" },
  { href: "/#destaques", label: "Destaques" },
  { href: "/como-comprar", label: "Como comprar" },
  { href: "/sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;
