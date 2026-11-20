# Design: "Rotina em ordem"

Sistema visual do site da Noxlabs depois do rebranding de novembro de 2026. Plataforma de marca e voz em `BRAND.md`;
referências em `docs/references.md`. Tokens em `src/styles/global.css`.

## Ideia

O mundo de quem compra: o escritório que confere, marca e entrega no prazo. A página é uma folha limpa com papel
quadriculado ao fundo nos pontos certos (a planilha), tinta verde-pinho, marca-texto amarelo para números e para o que pede
atenção, caneta azul para links. O gesto recorrente é o visto: itens que passam de "na fila" para "feito", com um que fica
separado "para você revisar". A tecnologia fica fora de vista; o que aparece é a rotina resolvida.

Recusado de propósito: céu noturno e rastros de luz da versão anterior (falavam com desenvolvedores), gradiente roxo de
SaaS de IA, papel creme com serifa e terracota, vidro, 3D, rótulos em caixa-alta, emoji.

## Tema

Claro, só. O público lê de dia, no computador do escritório e no celular. O escuro foi retirado em vez de mantido pela
metade: `color-scheme: light` e um único `theme-color`. A faixa verde-pinho (`.band`) dá o contraste de ritmo que o
tema escuro dava, invertendo os tokens dentro do trecho (bloco de contabilidade, cenários, contato).

## Cor

| Token | Hex | Uso |
| --- | --- | --- |
| `--bg` | `#f6f8f4` | Papel da página (branco com um toque de sálvia) |
| `--surface` | `#ffffff` | Cartões, faixas brancas, rodapé |
| `--sunken` | `#ebf1ea` | Fundos de ícone, cabeçalho de caso |
| `--line` / `--line-2` | `#d6e0d7` / `#aabdaf` | Bordas, divisórias, papel quadriculado |
| `--ink` | `#0f2a22` | Texto principal |
| `--ink-2` / `--ink-3` | `#3a5047` / `#52665d` | Texto de apoio / legendas e fontes |
| `--pine` | `#0d5c49` | Marca e ação principal |
| `--pine-deep` | `#0b3a2f` | Faixa verde, resultado da calculadora |
| `--pine-soft` / `--pine-ink` | `#d5ece2` / `#0a4a3a` | Etiqueta "feito", fundos de ícone |
| `--marca` / `--marca-soft` / `--marca-ink` | `#ffe15a` / `#fff4b8` / `#5c4a00` | Marca-texto: números, "para revisar", ação na faixa verde |
| `--caneta` | `#2346c0` | Links e trilhas |
| `--prazo` / `--prazo-soft` | `#b23f28` / `#fbe4dc` | Alerta (só "não encontrado" e prazos) |

Na faixa verde, `--ink` vira `#f2f7f3`, `--ink-2` `#c3d8cd`, `--caneta` e `--focus` viram o amarelo. Todo texto passa
AA (verificado por `scripts/check-page.mjs`, que compõe os fundos semitransparentes).

## Tipografia

- **Bricolage Grotesque** (OFL, variável em peso e tamanho óptico, `public/fonts/bricolage-grotesque-latin-var.woff2`):
  títulos, números, nomes de caso. Peso 650 nos títulos, 700 em números; entrelinha 1,03–1,08; espaçamento -0,022 a
  -0,025em.
- **Figtree** (OFL, variável em peso, `public/fonts/figtree-latin-var.woff2`): texto, botões, campos. Corpo de 17–19 px,
  entrelinha 1,6, linhas de até ~60 caracteres.
- Escala fluida: `--t-xs` 13, `--t-sm` 15, `--t-base` 17–19, `--t-md` 19–22, `--t-lg` 22–28, `--t-xl` 28–42, `--t-2xl`
  36–60, `--t-display` 40–80 px.
- Números que mudam usam `tabular-nums`. Rótulos em frase comum, nunca em caixa-alta.
- Subconjunto latino com os acentos do português; fallback Arial com métricas ajustadas para evitar salto.

## Espaço, raio, sombra

- Espaço em base 4 (`--s-1` 4 px a `--s-9` 96 px); seções com `--section-y` de 72 a 128 px.
- Largura máxima de 76rem (84rem acima de 1920 px); acima de 1600 px o rem cresce um pouco para 2560 px não ficar miúdo.
- Raio por hierarquia: etiqueta 6, controle 10–14, cartão 22, painel 32 px. Botões em 14 px, não em pílula.
- Sombras tingidas de pinho (`--shadow-1` a `--shadow-3`), só em peças que flutuam (rotina do topo, cartões de caso,
  resultado da calculadora). O resto é borda de 1 px.

## Componentes

- **Botões:** primário pinho com texto branco (na faixa verde, amarelo com texto escuro); secundário branco com borda.
  Altura mínima de 52 px (44 px no `btn-sm`). Seta que avança 3 px no hover.
- **Link de texto:** caneta azul, sublinhado de 1,5 px que escurece no hover, alvo de 44 px.
- **Etiquetas:** `tag-done` (feito), `tag-review` (para revisar, marca-texto), `tag-late` (prazo), `tag-neutral`.
- **Chips de exemplo:** borda fina e fundo branco, não clicáveis.
- **Lista com visto** (`.checks`): círculo pinho-claro com visto; na faixa verde, visto amarelo.
- **Dado de mercado** (`Stat.astro`): número grande com marca-texto (amarelo puro na faixa verde), frase curta e a linha
  "Fonte: organização, título, ano." com link e ressalva. O número conta até o valor ao entrar na tela; o leitor de tela
  lê a frase completa, que não se mexe.
- **Prova sem depoimento** (`Work.astro`, páginas de caso): status honesto ("Produto próprio", "Projeto privado"), o
  problema numa frase, o que o sistema faz, o que muda na rotina, e a nota de que os ganhos não são medições.
- **Cenário** (`/contabilidade/`): ícone, "Hoje", "Com a automação" (lista com visto) e "O que você ganha" numa faixa
  marca-texto.
- **Perguntas:** `details` em cartão, com o sinal de mais que gira e vira marca-texto quando aberto.
- **Calculadora** (`Estimator.astro`): campos em cartões sobre papel quadriculado; controles deslizantes com alça de
  28 px em trilho de 44 px e preenchimento pinho; resultado em painel pinho profundo com o número em amarelo, barra de
  proporção, lista de equivalências e premissas abertas num `details`.
- **Formulários:** o campo de custo segue o mesmo cartão; foco com anel pinho-claro; 16 px no mínimo para o iOS não dar
  zoom.

## Ícones e imagem

Ícones de traço único, 24 px, 1,75 px, pontas e junções arredondadas (`src/data/icons.ts`), dentro de ladrilhos de
fundo suave. Fotografia: só a foto do Daniel (do portfólio) e capturas reais dos sistemas com dados de demonstração,
emolduradas como cartão. Sem banco de imagens, sem ilustração gerada. Quando não há captura (Kairos), o cartão usa o
ícone do sistema em marca-texto sobre papel quadriculado verde.

## Movimento

Pouco e com propósito. Tudo usa só `transform` e `opacity` (e `width` na barra da calculadora).

- **Um momento orquestrado:** a rotina do topo se marca como "feito" item por item (420 ms entre itens), uma vez, em
  CSS puro; o último vira "para você revisar".
- **Entradas por rolagem:** subida curta (24 px, 600–700 ms) uma vez por bloco, via IntersectionObserver; sem JS ou com
  movimento reduzido, tudo nasce visível; trava de 3 s se o script não rodar.
- **Contadores** nos dados de mercado (1,1 s, desaceleração cúbica).
- **Retorno da calculadora:** números deslizam até o novo valor em 320 ms; a barra acompanha.
- **Microinterações:** botões sobem 1 px, setas avançam, o visto se desenha ao copiar o e-mail, perguntas abrem com
  altura animada, cabeçalho ganha fundo ao rolar.
- `prefers-reduced-motion: reduce` zera durações e atrasos: a página aparece no estado final.

## Layout e páginas

Home: topo (dor e promessa, rotina de exemplo) → números do mercado → soluções por rotina → como funciona (4 passos) →
contabilidade (faixa verde) → outros segmentos → o que já construí → estimativa → quem faz → segurança e LGPD →
perguntas → contato (faixa verde) → rodapé.

`/contabilidade/`: topo com dores → dados do setor → seis cenários (faixa verde) → o que não muda → como funciona →
estimativa → perguntas de escritório → contato com assunto próprio.

`/casos/<slug>/`: cabeçalho com status e "serve para", captura, problema do negócio, o que o sistema faz, o que muda na
rotina, rodapé técnico recolhido, outros casos, contato.

404: "Este documento não está na pasta.", com uma pasta de exemplo em que só esta página falta.

Responsivo de 320 a 2560 px, inclusive paisagem e alturas baixas. Menu em tela cheia abaixo de 1024 px; abaixo de
640 px o CTA vai para a base da tela e some sobre a calculadora, o contato e o rodapé. Alvos de toque de 44 px.
