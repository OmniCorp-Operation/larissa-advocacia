# Larissa Ribeiro | Landing page

Landing page trilíngue (PT, ES e EN) com parallax sutil para Larissa Ribeiro, Paralegal (Non attorney) da Berman Law Group, para quem sofreu um acidente de carro nos EUA. Spec: `docs/specs/2026-10-29-landing-parallax.md`.

Stack: Next.js 16 (App Router, `cacheComponents`), React 19, Tailwind CSS 4, shadcn/ui (base-nova sobre `@base-ui/react`) e `motion` para o parallax. Gerenciador de pacotes: bun.

## Como rodar

```bash
bun install
bun run dev      # http://localhost:3000
bun run lint
bun run build && bun run start
```

## Testes e2e (Playwright)

Testes de fumaça em `e2e/` (Chromium). A config sobe o app por conta própria: `bun run build` + `bun run start` na porta **3200**, com `NEXT_PUBLIC_SITE_URL=http://localhost:3200`. Isso não interfere no `bun run dev` da porta 3000.

```bash
bunx playwright install chromium   # uma vez por máquina
bun run test:e2e
bun run test:e2e:report            # abre o último relatório HTML
```

Cobertura: rotas `/pt`, `/es` e `/en` (`<html lang>` e headline), redirect de `/` por `Accept-Language`, seletor de idioma (com âncora), hrefs de WhatsApp/telefone/e-mail, cargo e disclaimers, overflow horizontal em 375px, `prefers-reduced-motion` sem erros no console e metas SEO (title, description, canonical, hreflang). Os textos esperados vêm de `src/content` e `src/config/contact.ts`, então trocar a copy ou o número do WhatsApp não quebra os testes. Fora do CI, se já houver servidor na 3200, ele é reaproveitado (rode `bun run build` antes se o código mudou).

Variável de ambiente (veja `.env.example`):

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site. Alimenta `metadataBase`, canonical, hreflang e Open Graph. Sem ela, usa `http://localhost:3000`. |

## Rotas

- `/` redireciona (307) para `/pt`, `/es` ou `/en` conforme o `Accept-Language` do navegador; o padrão é `pt`. A lógica está só em `src/proxy.ts`.
- `/pt`, `/es` e `/en` são pré-renderizadas estaticamente (`app/[lang]`, com o `<html lang>` definido no layout raiz).
- Qualquer outro valor em `/<lang>` mostra a página 404 no idioma padrão.

## Onde trocar o quê

| O que | Onde |
|---|---|
| Textos, passos, disclaimers, metas SEO e mensagem pré-preenchida do WhatsApp | `src/content/{pt,es,en}.ts` (o tipo `Dictionary` em `src/types/content.ts` exige as mesmas chaves nos três) |
| WhatsApp, telefone, fax, e-mail, site da Berman e cidade do escritório | `src/config/contact.ts` |
| Nome, cargo, marca, URL do site e imagem de compartilhamento | `src/config/site.ts` |
| Cores da marca, raio e tokens | `src/app/globals.css` (`:root`) |
| Fontes (Nunito, Cormorant Garamond e Caveat) | `src/app/[lang]/layout.tsx` |
| Seções da página | `src/components/sections/` |

O número de WhatsApp em `contact.ts` é um **placeholder** (`TODO`). Troque pelo número real, somente dígitos e com DDI (ex.: `5561999999999`).

## Imagens (`public/images/`)

Para trocar uma foto, basta substituir o arquivo mantendo o nome.

| Arquivo | Uso | Observação |
|---|---|---|
| `larissa-recortada.webp` | Hero, em primeiro plano | **Placeholder** (ilustração). Trocar por foto recortada, fundo transparente, proporção 3:4 (ex.: 900x1200), cortada na cintura. |
| `larissa-sobre.webp` | Seção "Sobre" | **Placeholder** (ilustração). Trocar por retrato, proporção 4:5. |
| `fundo-acidente.jpg` | Fundo do hero (desfocado) | Foto do Unsplash. |
| `fundo-faixa.jpg` | Faixa "Atendo casos em todos os EUA" | Foto do Unsplash. |
| `og-larissa.jpg` | Imagem de compartilhamento (1200x630) | Montada a partir de `fundo-faixa.jpg` com nome e cargo. |

### Créditos das imagens

Fotos publicadas sob a [Unsplash License](https://unsplash.com/license):

- `fundo-acidente.jpg`: "Damaged silver car with crushed hood", de Clark Van Der Beken ([@snapsbyclark](https://unsplash.com/@snapsbyclark)). [Página da foto](https://unsplash.com/photos/damaged-silver-car-with-crushed-hood-CSkriQWeTVs).
- `fundo-faixa.jpg` e `og-larissa.jpg`: "A car that has crashed into another car", de Anthony Maw ([@anthonymaw](https://unsplash.com/@anthonymaw)). [Página da foto](https://unsplash.com/photos/a-car-that-has-crashed-into-another-car-XcjVef6uvYA).

## Parallax e acessibilidade

- O parallax usa `useScroll` e `useTransform` do `motion` (`src/components/parallax/`). Fica desligado com `prefers-reduced-motion` e com metade da intensidade abaixo de 768px.
- O seletor de idioma (`src/components/layout/language-switcher.tsx`) preserva a seção atual: ao trocar de idioma, a URL leva o `#how`, `#about`, `#coverage` ou `#contact` da seção visível. Os ids ficam em `src/config/sections.ts`.
- A imagem de fundo do hero usa `preload` (é o elemento LCP). As qualidades de imagem permitidas estão em `images.qualities`, no `next.config.ts`.

## Pendências com a cliente

- Número de WhatsApp.
- Fotos reais em alta resolução.
- Autorização da Berman Law Group para uso de nome/logo (hoje há só um texto "BERMAN LAW GROUP" em `src/components/shared/berman-wordmark.tsx`) e aprovação dos textos e disclaimers antes de publicar.
- Revisão da copy nos 3 idiomas.
- Domínio final em `NEXT_PUBLIC_SITE_URL`.
