# Larissa Ribeiro | Landing page

Landing page trilíngue (PT, ES e EN) com parallax em camadas, tema claro/escuro e navbar fixa para Larissa Ribeiro, Paralegal (Non attorney) da Berman Law Group, para quem sofreu um acidente de carro nos EUA. Spec: `docs/specs/2026-10-29-landing-parallax.md`.

Stack: Next.js 16 (App Router, `cacheComponents`), React 19, Tailwind CSS 4, shadcn/ui (base-nova sobre `@base-ui/react`), `motion` (parallax e entradas), `next-intl` (i18n) e `next-themes` (tema). Gerenciador de pacotes: bun.

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

Cobertura: rotas e SEO por idioma, redirect por Accept-Language, CTAs de contato, disclaimers, troca de idioma (dropdown em 1280px e sheet em 375px), menu mobile, tema claro/escuro com persistência, parallax (transform das camadas `[data-parallax]` muda ao rolar e não muda com `reducedMotion`), retrato real no hero e no "Sobre" e console sem erros nos 3 idiomas × 2 temas. Helpers compartilhados em `e2e/helpers.ts`.

Os textos esperados vêm de `messages/{pt,es,en}.json` (via `e2e/locales.ts`) e de `src/config/contact.ts`, então trocar a copy ou o número do WhatsApp não quebra os testes. Fora do CI, se já houver servidor na 3200, ele é reaproveitado (rode `bun run build` antes se o código mudou).

Variável de ambiente (veja `.env.example`):

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site. Alimenta `metadataBase`, canonical, hreflang e Open Graph. Sem ela, usa `http://localhost:3000`. |

## Rotas e idiomas

- `/` redireciona (307) para `/pt`, `/es` ou `/en` conforme o `Accept-Language` do navegador; o padrão é `pt`. A lógica está só em `src/proxy.ts` (`resolveLocale` em `src/lib/i18n.ts`).
- `/pt`, `/es` e `/en` são pré-renderizadas estaticamente (`app/[lang]`, com o `<html lang>` definido no layout raiz).
- Qualquer outro valor em `/<lang>` mostra a página 404 no idioma padrão.
- A tradução usa `next-intl` só no servidor: `src/i18n/request.ts` lê o idioma de `next/root-params` (por isso as rotas continuam estáticas com `cacheComponents`) e devolve as mensagens de `messages/<idioma>.json`. Componentes de servidor chamam `getTranslations("secao")`; componentes de cliente recebem os textos por props.
- `src/i18n/messages.ts` exige que os três JSON tenham exatamente as mesmas chaves (erro de tipo se faltar uma). Os tipos das chaves vêm de `messages/pt.json` (`src/types/next-intl.d.ts`).
- O seletor de idioma (dropdown com bandeira, em `src/components/layout/language-switcher.tsx`, e a lista dentro do menu mobile) preserva a seção atual: ao trocar de idioma, a URL leva o `#how`, `#about`, `#coverage` ou `#contact` da seção visível. Os ids ficam em `src/config/sections.ts`.

## Tema claro e escuro

- `next-themes` com `attribute="class"`, padrão do sistema (`prefers-color-scheme`) e escolha salva em `localStorage` (chave `theme`). O script inline do `next-themes` aplica a classe `dark` no `<html>` antes da primeira pintura, então não há flash.
- O React 19 avisa quando um `<script>` é criado no cliente. Por isso `src/components/providers/app-providers.tsx` passa `scriptProps` com `type="text/javascript"` no servidor e `text/plain` no cliente, o padrão do guia `preventing-flash-before-hydration` do Next. O HTML do servidor continua executando o script normalmente.
- Os tokens de cor claro/escuro estão em `src/app/globals.css` (`:root` e `.dark`). O contraste dos pares de texto foi conferido em AA nos dois temas.
- O botão de tema (`src/components/layout/theme-toggle.tsx`) troca os ícones só com CSS (`dark:`), sem depender de estado na hidratação.

## Onde trocar o quê

| O que | Onde |
|---|---|
| Textos, passos, disclaimers, metas SEO, rótulos da navbar e mensagem pré-preenchida do WhatsApp | `messages/{pt,es,en}.json` |
| Ordem e ids dos passos de "Como posso ajudar" | `src/config/steps.ts` (os textos ficam em `how.steps.<id>` nos JSON) |
| WhatsApp, telefone, fax, e-mail, site da Berman e cidade do escritório | `src/config/contact.ts` |
| Nome, cargo, marca, URL do site e imagem de compartilhamento | `src/config/site.ts` |
| Cores da marca (claro e escuro), raio e tokens | `src/app/globals.css` |
| Fontes (Fraunces para o nome e títulos, Nunito para texto e interface, Caveat para a frase manuscrita) | `src/app/[lang]/layout.tsx` |
| Seções da página | `src/components/sections/` |
| Navbar, menu mobile, seletor de idioma e tema | `src/components/layout/` |

O número de WhatsApp em `contact.ts` é um **placeholder** (`TODO`). Troque pelo número real, somente dígitos e com DDI (ex.: `5561999999999`).

## Imagens (`public/images/`)

Para trocar uma foto, basta substituir o arquivo mantendo o nome.

| Arquivo | Uso | Observação |
|---|---|---|
| `larissa-retrato.webp` | Retrato no hero (cartão flutuante) e na seção "Sobre" (arco) | Foto real da Larissa, 356x408. A moldura, a sombra e os cantos arredondados do arquivo original foram cortados e o fundo creme foi mantido; a moldura agora vem do CSS. Para trocar por uma foto em alta resolução, use proporção próxima de 7:8 (ou 4:5); o `object-cover` ajusta o corte. |
| `fundo-acidente.jpg` | Fundo do hero (tratamento lilás, com zoom-out no scroll) | Foto do Unsplash. |
| `fundo-faixa.jpg` | Faixa "Atendo casos em todos os EUA" | Foto do Unsplash. |
| `og-larissa.jpg` | Imagem de compartilhamento (1200x630) | Montada a partir de `fundo-faixa.jpg` com nome e cargo. |

O arquivo original do retrato (com moldura e sombra) fica em `docs/assets/larissa-retrato-original.png`. O corte usado foi `extract` de 356x408 a partir de (42, 24), achatado sobre o creme `#f7f1e8`, exportado em WebP qualidade 94.

### Créditos das imagens

Fotos publicadas sob a [Unsplash License](https://unsplash.com/license):

- `fundo-acidente.jpg`: "Damaged silver car with crushed hood", de Clark Van Der Beken ([@snapsbyclark](https://unsplash.com/@snapsbyclark)). [Página da foto](https://unsplash.com/photos/damaged-silver-car-with-crushed-hood-CSkriQWeTVs).
- `fundo-faixa.jpg` e `og-larissa.jpg`: "A car that has crashed into another car", de Anthony Maw ([@anthonymaw](https://unsplash.com/@anthonymaw)). [Página da foto](https://unsplash.com/photos/a-car-that-has-crashed-into-another-car-XcjVef6uvYA).

## Movimento e parallax

- O parallax usa `useScroll`, `useSpring` e `useTransform` do `motion`. `ParallaxScene` (`src/components/parallax/parallax-scene.tsx`) mede o scroll de uma seção; cada `ParallaxLayer` anima `y`, `x`, `rotate`, `scale` e `opacity` entre dois valores. Toda camada tem `data-parallax="<nome>"` (ex.: `hero-background`, `hero-portrait`, `coverage-marquee-forward`), útil para testar que o `transform` muda ao rolar.
- Hero: fundo com zoom-out, disco e anel tracejado, retrato inclinado e flutuando, selos em velocidades diferentes e a headline se desfazendo palavra por palavra (`scroll-words.tsx`). A entrada em sequência acontece uma vez, ao carregar.
- "Como posso ajudar": coluna esquerda fixa (sticky) com o numeral do passo ativo; linha de progresso e marcadores ligados ao scroll (`how-steps.tsx`).
- Faixa "todos os EUA": foto com parallax forte e duas linhas de texto grande deslizando em sentidos opostos.
- Navbar fixa (`header-shell.tsx`): transparente sobre o hero, sólida com blur depois de 24px de scroll, com barra de progresso de leitura. Abaixo de 1024px os links e o idioma vão para um menu lateral (`mobile-menu.tsx`).
- Micro-interações dos botões em `src/components/shared/cta-link.tsx` (elevação, press e brilho no hover).
- `prefers-reduced-motion: reduce` desliga tudo: o parallax vira posição fixa (`useParallaxStrength` devolve 0), as entradas aparecem prontas (regra CSS em `globals.css` para `[data-reveal]`) e o `MotionConfig` do `motion` fica em `reducedMotion="user"`. Abaixo de 768px o parallax usa 55% da intensidade.
- A imagem do retrato no hero usa `preload`. As qualidades de imagem permitidas estão em `images.qualities`, no `next.config.ts`.

## Pendências com a cliente

- Número de WhatsApp.
- Fotos reais em alta resolução (o retrato atual tem só 356x408 e fica um pouco suave em telas de alta densidade).
- Autorização da Berman Law Group para uso de nome/logo (hoje há só um texto "BERMAN LAW GROUP" em `src/components/shared/berman-wordmark.tsx`) e aprovação dos textos e disclaimers antes de publicar.
- Revisão da copy nos 3 idiomas.
- Domínio final em `NEXT_PUBLIC_SITE_URL`.
