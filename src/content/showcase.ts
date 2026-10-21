// Linhas da vitrine (os filtros "Linha leve" e "Linha pesada"). Arquivo sem zod de propósito:
// é importado por código que roda no navegador (links e filtro da vitrine).
export const showcaseLines = ["leve", "pesada"] as const;

export type ShowcaseLine = (typeof showcaseLines)[number];
