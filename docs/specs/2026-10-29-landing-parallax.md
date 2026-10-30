# Landing page parallax — Larissa Ribeiro

Status: **concluída (2026-10-29)**: T1 e T2 entregues; lint, build e 42/42 testes e2e ok; Lighthouse a11y 100 em /pt · Branch: `main`

## Objetivo
Landing page trilíngue (PT/ES/EN) com efeito parallax sutil para Larissa Ribeiro, Paralegal (Non attorney) da Berman Law Group, captando contatos de pessoas que sofreram acidente de carro nos EUA. Identidade visual baseada no flyer atual.

## Critérios de aceite
1. Rotas `/pt`, `/es` e `/en` pré-renderizadas estaticamente, com `<html lang>` correto e todo o texto no idioma da rota.
2. `/` redireciona pelo `Accept-Language` do navegador (pt, es ou en; padrão `pt`) via `proxy.ts` (Next 16).
3. Seletor de idioma visível no topo, preservando a seção atual quando possível.
4. CTA principal abre o WhatsApp (`https://wa.me/<número>` com mensagem pré-preenchida no idioma da rota); os secundários são `tel:` e `mailto:`.
5. Parallax sutil (camadas em velocidades diferentes) no hero e na faixa "Atendo casos em todos os EUA". Desligado com `prefers-reduced-motion` e suavizado no mobile.
6. "Paralegal | Non attorney" visível no hero e no rodapé, mais disclaimer em cada idioma (não é aconselhamento jurídico; não é advogada; "Attorney Advertising").
7. Responsivo de 360px a desktop, sem scroll horizontal. Lighthouse de acessibilidade ≥ 90.
8. SEO: title, description e Open Graph por idioma, `alternates.languages` (hreflang). Sem analytics/pixel.
9. `bun run lint`, `bun run build` e os testes Playwright passando.

## Escopo
Seções, de cima para baixo:
1. **Hero parallax**: fundo do acidente (camada lenta), Larissa recortada em primeiro plano, headline "Sofreu um acidente de carro?", frase manuscrita "estou à disposição para ajudar 💜", CTA do WhatsApp.
2. **Como posso ajudar**: 4 passos (contato → orientação → encaminhamento ao advogado → acompanhamento).
3. **Sobre a Larissa**: foto, texto curto, diferenciais (fala PT/ES/EN, atende em todos os EUA).
4. **Faixa parallax** "Atendo casos em todos os EUA. Conte comigo! 💜".
5. **Contato**: cartão com WhatsApp, telefone (O: 1-800-375-5555 ext 1371 · F: 561-826-5201), e-mail lribeiro@thebermanlawgroup.com, site www.BermanLawGroup.com e "Escritório principal em Boca Raton, FL".
6. **Rodapé**: nome, cargo, disclaimers e marca Berman.

Também entram:
- **Identidade visual**:
  - Roxo principal ~`#4E3D6E`, roxo claro de apoio, off-white quente ~`#F2EFEA`, texto quase preto. Só tema claro.
  - Fontes (Google Fonts, via next/font): serifada para o nome, sans arredondada para os títulos, manuscrita para a frase de destaque.
- **Conteúdo**: rascunho de copy nos 3 idiomas em dicionários (`src/content/{pt,es,en}.ts` ou similar), tipados para garantir as mesmas chaves nos três. Dados de contato num arquivo único de config (`src/config/contact.ts`). O WhatsApp fica como **placeholder** (`TODO`) até a Larissa enviar o número.
- **Imagens**:
  - Placeholders em `public/images/`: Larissa recortada (PNG/WebP com transparência) e foto dela para "Sobre".
  - Fundo do hero e da faixa: foto livre do Unsplash, baixada para `public/images/` com o crédito registrado.
  - Trocar as fotos reais deve ser só substituir os arquivos.

## Fora de escopo
Formulário de contato/backend, deploy e domínio, analytics/pixel, dark mode, FAQ, depoimentos.

## Notas técnicas (Next 16.4 / React 19 / Tailwind 4 / shadcn base-ui / bun)
- Ler `node_modules/next/dist/docs/` antes de codar (AGENTS.md).
- Animação com `motion` (`motion/react`: `useScroll`/`useTransform`), em componentes `"use client"` pequenos. Páginas e layout continuam Server Components.
- next/image: usar `preload` (não `priority`) na imagem LCP do hero; configurar `images.qualities`.
- `cacheComponents` está ligado: as rotas de idioma não podem ler headers/cookies. A detecção de idioma fica só no `proxy.ts`.
- **Ajustes de base:**
  - `--font-sans` em `globals.css` aponta para si mesmo; alinhar com a variável do next/font.
  - Trocar os tokens neutros pelos da marca.
  - Verificar se o pacote npm `cn` faz merge de classes Tailwind; se não fizer, trocar por `clsx` + `tailwind-merge` (padrão shadcn).
- Remover o boilerplate do create-next-app (`page.tsx`, SVGs de `public/`).

## Tarefas
| # | Responsável | Entrega | Depende de |
|---|---|---|---|
| T1 | `dev-frontend-ui-ux` | Tudo do escopo: ajustes de base, i18n + proxy, seções, parallax, imagens placeholder, SEO, README atualizado | — |
| T2 | `dev-tester` | Instalar Playwright; testes de fumaça (3 rotas renderizam no idioma certo, seletor troca idioma, hrefs de `wa.me`/`tel:`/`mailto:`, redirect de `/` por Accept-Language, sem overflow horizontal em 375px, reduced-motion sem quebrar); rodar lint + build + testes | T1 |

Entrega em um PR só (sem divisão).

## Fase 2: redesign (aprovada e concluída em 2026-10-29; 62/62 e2e, Lighthouse a11y 100 claro e escuro)
Mudança de escopo pedida pelo usuário. Onde houver conflito, ela substitui as seções acima.
- **Design:** página bem trabalhada, seguindo a skill `frontend-design` (direção estética intencional, sem cara de template).
- **Retrato real:** `public/images/Retrato de Larissa Ribeiro.png` substitui as ilustrações. É um cartão com moldura e fundo creme, não um recorte. No hero, vira um cartão de retrato flutuante numa camada de parallax própria, com inclinação e flutuação no scroll. Na seção "Sobre", aparece com outro enquadramento. Sem remoção de fundo.
- **Parallax marcante com `motion`:**
  - Hero com várias camadas (fundo com zoom-out, retrato, formas e texto em velocidades diferentes) e headline se desfazendo no scroll.
  - Entrada animada em sequência nas seções.
  - "Como posso ajudar" com passos fixos na tela e linha de progresso ligada ao scroll.
  - Faixa "todos os EUA" com fundo em parallax forte e texto grande deslizando na horizontal.
  - Micro-interações nos botões e barra de progresso de leitura.
  - `prefers-reduced-motion` desliga tudo.
- **Navbar:**
  - Fixa, transparente sobre o hero, sólida com blur ao rolar.
  - Nome à esquerda; links das seções, toggle de tema, dropdown de idioma com bandeira e CTA do WhatsApp à direita.
  - No mobile, menu lateral (sheet).
- **Tema claro/escuro:** `next-themes`, padrão do sistema, escolha persistida, sem flash na hidratação. Paleta escura própria (roxo noite + lavanda), com contraste AA.
- **i18n:** migrar para `next-intl` com `messages/{pt,es,en}.json`, mantendo `/pt`, `/es` e `/en` estáticas (com `cacheComponents`) e o redirect por Accept-Language. Se a `next-intl` for incompatível com Next 16.4 + cacheComponents, manter os dicionários atuais e reportar.
- **Novos critérios de aceite:**
  - Toggle de tema funciona e persiste após reload.
  - Elementos com transform mudam ao rolar (parallax verificável).
  - Retrato real aparece no hero e no "Sobre".
  - Nav mobile abre e fecha.
  - Os critérios 1–9 anteriores continuam valendo.

| # | Responsável | Entrega | Depende de |
|---|---|---|---|
| T3 | `dev-frontend-ui-ux` | Redesign completo da fase 2 + README | — |
| T4 | `dev-tester` | Ajustar e2e e cobrir os novos critérios; lint + build + suíte + Lighthouse a11y em /pt e no tema escuro | T3 |

## Pendências com a cliente
- Número de WhatsApp.
- Fotos reais em alta resolução.
- Autorização da Berman Law Group para uso de nome/logo e aprovação dos textos e disclaimers antes de publicar.
- Revisão da copy nos 3 idiomas.
