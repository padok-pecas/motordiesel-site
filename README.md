# MotorDiesel — Landing page

Landing page institucional e comercial da MotorDiesel (Imperatriz — MA, Grupo Padok).
Objetivo principal: levar o cliente à loja oficial da MotorDiesel no Mercado Livre.

> **Status:** protótipo visual. Produtos demonstrativos, link da loja e contatos em configuração.
> Enquanto `site.isPrototype` for `true`, a página exibe a faixa de protótipo e não é indexada.

## Requisitos

- Node.js 24+
- pnpm (`corepack enable pnpm`)

## Comandos

| Comando                        | Descrição                                      |
| ------------------------------ | ---------------------------------------------- |
| `pnpm install`                 | Instala as dependências                        |
| `pnpm dev`                     | Desenvolvimento em http://localhost:3000       |
| `pnpm build`                   | Gera o site estático em `out/`                 |
| `pnpm preview`                 | Serve a pasta `out/` localmente (após o build) |
| `pnpm lint` / `typecheck`      | ESLint / TypeScript                            |
| `pnpm format` / `format:check` | Prettier                                       |
| `pnpm test`                    | Testes unitários (conteúdo e regras de links)  |
| `pnpm test:e2e`                | Testes E2E (Playwright, desktop + mobile)      |

## Onde alterar o conteúdo

Tudo fica em `src/content/` — os componentes não têm textos comerciais fixos.

| O quê                         | Arquivo                  | Campo                        |
| ----------------------------- | ------------------------ | ---------------------------- |
| **URL da loja Mercado Livre** | `src/content/site.ts`    | `mercadoLivre.storeUrl`      |
| WhatsApp, telefone, e-mail…   | `src/content/site.ts`    | `contact`                    |
| Razão social, CNPJ, "Sobre"   | `src/content/site.ts`    | `legalName`, `cnpj`, `about` |
| Sair do modo protótipo        | `src/content/site.ts`    | `isPrototype: false`         |
| Categorias                    | `src/content/catalog.ts` | `categories`                 |
| Produtos (demonstrativos)     | `src/content/catalog.ts` | `demoProducts`               |
| Créditos das fotos            | `src/content/credits.ts` | —                            |
| **Cor da marca**              | `src/app/globals.css`    | `--brand-red`                |

- Campos `null` não aparecem no site (ou aparecem como "em configuração") — nunca com valor inventado.
- A URL da loja é validada: só aceita `https` em `mercadolivre.com.br`.
- Produtos demonstrativos não aceitam preço, estoque ou link (o schema recusa).

## Identidade visual

- Logos oficiais em `public/brand/` (cópias sem alteração dos arquivos fornecidos).
- O logo MotorDiesel tem o slogan em tom claro: em fundo branco usa-se só o selo
  (`MotorDieselBadge`, recorte via CSS); o logo completo fica em fundos escuros.
- Vermelho `#DB1D21` extraído do logo; grafite e preto apenas como contraste.
- Tipografia: Saira (títulos) e Archivo (texto), via `next/font`.

## Imagens

Fotos provisórias do Unsplash (Unsplash License), já otimizadas em WebP em `public/images/`.
Ao trocar por fotos próprias, mantenha nomes ou atualize `catalog.ts`/seções e `credits.ts`
(um teste garante que toda foto tenha crédito).

## Publicação

`pnpm build` gera HTML/CSS/JS estáticos em `out/`, publicáveis em qualquer hospedagem
estática (Vercel, Netlify, Cloudflare Pages, servidor próprio). Nenhum deploy foi feito.
