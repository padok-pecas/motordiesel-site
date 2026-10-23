// Seções da home usam "/#id" para funcionar também a partir das páginas internas.
export const navItems = [
  { href: "/#categorias", label: "Categorias" },
  { href: "/leve-e-pesada", label: "Leve e Pesada" },
  { href: "/#destaques", label: "Vitrine" },
  { href: "/como-comprar", label: "Como comprar" },
  { href: "/sobre", label: "Sobre" },
] as const;

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
