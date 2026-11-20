# Design: "Mosaico"

Sistema visual do site da Noxlabs na v4 (novembro de 2026). Marca e voz em `BRAND.md`; por que esta direção, em
`docs/references.md`. Tokens em `src/styles/global.css`.

## Ideia

Cada empresa é uma peça. O azulejo, um ladrilho de cantos arredondados, é a unidade de tudo: a ilustração de um ramo,
uma tela de exemplo do que roda sozinho, um dado com fonte, a capa de um projeto. O topo é um mosaico em que ramos
diferentes e telas de exemplo se encaixam; o resto da página repete a mesma peça em escalas diferentes. Calor vem das
cores de fruta brasileira (jabuticaba, goiaba, caju) sobre papel rosado; confiança vem da disciplina: uma cor de ação,
tinta escura, muito respiro.

Recusado de propósito: grade de cartaz com anil (v1), céu noturno com rastros de luz (v2/v3), verde-pinho com
marca-texto e foco em contabilidade (v3), gradiente roxo, vidro, 3D, papel creme com serifa e terracota, faixa escura
com número amarelo, caixa-alta em rótulos, emoji.

## Tema

Claro, só. O público lê de dia, no computador e no celular. `color-scheme: light` e um único `theme-color`. A única faixa
escura (`.dark`, jabuticaba) é o contato, no fim, e a folha do menu no celular; nenhuma das duas tem número.

## Cor

| Token | Hex | Uso |
| --- | --- | --- |
| `--bg` | `#fff8f6` | Papel da página |
| `--surface` | `#ffffff` | Azulejos brancos, faixa de ramos, calculadora |
| `--tint` | `#f7f0fa` | Fundo de seção alternada, chips, telas de exemplo |
| `--line` / `--line-2` | `#efdfe2` / `#dcc4cb` | Bordas e divisórias |
| `--ink` (`--jabu`) | `#2a1430` | Texto, pictogramas, menu, faixa de contato |
| `--ink-2` / `--ink-3` | `#57435d` / `#6c5a71` | Texto de apoio / legendas e fontes |
| `--goiaba` | `#ee5a6f` | Marca, ilustração, ação sobre fundo escuro |
| `--goiaba-ink` | `#b42a40` | Ação principal (texto branco), links, vistos |
| `--goiaba-soft` | `#ffe1e4` | Azulejos, ganho do cenário, ícones |
| `--caju` / `--caju-soft` / `--caju-ink` | `#ffb23e` / `#ffecc9` / `#6e4300` | Acento raro: um detalhe por peça, "para conferir" |
| `--lila` / `--lila-ink` | `#e8dcf2` / `#563a70` | Só fundo de azulejo e etiquetas neutras |

Todo texto passa AA (verificado por `scripts/check-page.mjs`, que compõe fundos semitransparentes). Amarelo e caju nunca
são cor de texto sobre fundo claro.

## Tipografia

- **Parkinsans** (OFL, variável 300–800, `public/fonts/parkinsans-latin-var.woff2`): títulos e números, peso 700,
  entrelinha 1,02–1,06, espaçamento -0,022 a -0,035em. Geométrica e amigável, com personalidade nos "a" e "g".
- **Onest** (OFL, variável 300–800, `public/fonts/onest-latin-var.woff2`): texto, botões, campos. Corpo de 17–19 px,
  entrelinha 1,6, linhas de até ~60 caracteres.
- Escala fluida: `--t-xs` 13, `--t-sm` 15, `--t-base` 17–19, `--t-md` 19–22, `--t-lg` 22–28, `--t-xl` 28–42, `--t-2xl`
  34–60, título do topo 40–74 px.
- Números que mudam usam `tabular-nums`. Rótulos em frase comum. Subconjunto latino com acentos; fallback Arial com
  métricas ajustadas.

## Espaço, raio, sombra

- Base 4 (`--s-1` 4 px a `--s-9` 96 px); seções com `--section-y` de 64 a 128 px; margem lateral de 18 a 32 px.
- Largura máxima de 76rem (84rem acima de 2240 px); acima de 1600 px o rem cresce para 2560 px não ficar miúdo.
- Raio por hierarquia: etiqueta 999 px, controle 14 px, chip de ramo 16 px, cartão 20 px, azulejo 28 px, painel 40 px.
- Sombras tingidas de jabuticaba (`--shadow-1` a `--shadow-3`), só no que flutua: o painel do topo, o celular de exemplo,
  a calculadora, as telas dentro dos azulejos. O resto é cor de fundo ou borda de 1 px.

## Ilustração e ícones

- **Pictogramas de ramo** (`src/data/illustrations.ts`, componente `Ill.astro`): grade de 64, área útil de 10 a 54, formas
  planas com cantos arredondados, uma forma principal em jabuticaba, um acento em goiaba ou caju, detalhes em papel. As
  cores vêm de classes, então a mesma peça serve em qualquer fundo. Doze ramos: clínica, loja, escritório, advocacia,
  indústria, distribuidora, imobiliária, escola, transportadora, agro, e-commerce, agência.
- **Ícones de interface** (`src/data/icons.ts`): traço único de 1,75 px, pontas arredondadas, 24 px.
- **Telas de exemplo**: conversa (bolhas brancas do cliente, goiaba-claro do assistente, lilás da pessoa da equipe e um
  aviso de passagem), registro do dia, painel de números, ordens de serviço, fluxo de integração, mapa de tempo. Sempre
  com a nota "de exemplo".

## Componentes

- **Botões:** primário goiaba-escuro com texto branco (na faixa escura e no menu, goiaba com texto jabuticaba);
  secundário branco com borda. Altura de 54 px (44 px no `btn-sm`), raio de 14 px, texto equilibrado em duas linhas.
- **Mosaico do topo** (`Hero.astro`): 4 colunas por 3 linhas no desktop; no celular, duas linhas que rolam de lado, com o
  painel e a conversa ocupando 2×2.
- **Faixa de ramos** (`SectorStrip.astro`): doze ramos com pictograma; 6 colunas, 4 no tablet, duas linhas roláveis no
  celular.
- **Dado de mercado** (`Stat.astro`): azulejo claro, número em tinta, frase, linha de fonte com link, ano e ressalva. O
  número conta até o valor ao entrar na tela; faixas ("60 a 70%") não animam.
- **Ofertas** (`Solutions.astro`): grade de azulejos 3 colunas (2 no tablet, 1 no celular), cada um com uma tela de
  exemplo; abaixo, "O que muda na empresa" em seis linhas.
- **Seletor de ramos** (`Scenarios.astro`): abas com pictograma (chips roláveis no celular, setas do teclado, Home e End);
  celular de exemplo, "Hoje", "Com a Noxlabs" e "O que você ganha". Sem JS, os seis cenários aparecem em sequência.
- **Projetos** (`Work.astro`): capturas reais assentadas em azulejos de cor; "Também construí" vira faixa rolável com
  contador no celular.
- **Calculadora** (`Estimator.astro`): botões de menos e mais de 44 px ao lado de cada controle deslizante (alça de 28 px
  em trilho de 44 px); custo com teclado decimal; resumo fixo no celular; resultado num azulejo branco; premissas sempre
  visíveis.
- **Contato** (`Contact.astro`): a faixa escura, com o roteiro do e-mail num cartão branco e cópia do endereço.

## Celular

O celular é a experiência principal, não uma adaptação.

- **Cabeçalho:** 64 px, só a marca e "Menu". Some ao rolar para baixo e volta ao rolar para cima; fica visível durante a
  rolagem disparada pelo menu.
- **Menu:** folha que sobe da base (zona do polegar), com fundo escurecido. Ordem de cima para baixo: outros contatos
  (e-mail com "Copiar"; WhatsApp quando houver) e links externos com seta; as seis seções em letras grandes com "Você
  está aqui" na atual; a ação principal fixa na base. Abre e fecha em 360 ms, sem salto; trava a rolagem do fundo; prende
  o foco; fecha ao tocar num link (e rola até a seção sem escondê-la sob o cabeçalho), ao tocar fora, com Esc, no
  "Fechar" e com o gesto de voltar. Alvos de 48 px; telas baixas (até 704 px de altura) reduzem os links; respeita a
  área segura do aparelho.
- **CTA da base:** aparece depois do topo e some sobre o seletor de ramos, a calculadora, o contato, o rodapé e com o
  menu aberto.
- **Faixas roláveis** com encaixe e o próximo item cortado na borda: mosaico, ramos, chips do seletor, "Também construí".
- Sem rolagem horizontal da página de 320 a 2560 px; campos com 16 px ou mais (sem zoom no iOS); nada de hover preso.

## Movimento

Pouco e com propósito; só `transform` e `opacity` (e `width` na barra da calculadora).

- **Um momento orquestrado:** os azulejos do topo se assentam um a um; a conversa mostra "digitando" e recebe a resposta;
  o painel marca as rotinas do dia e as barras sobem. CSS puro, uma vez.
- **Entradas por rolagem:** subida curta (20 px, 640 ms) uma vez por bloco; sem JS ou com movimento reduzido, tudo nasce
  visível; trava de 3 s se o script não rodar.
- **Respostas à ação:** troca de ramo com a conversa chegando mensagem a mensagem; menu com links que sobem em sequência;
  números da calculadora deslizam até o novo valor; visto que se desenha ao copiar o e-mail.
- `prefers-reduced-motion: reduce` zera durações: a página aparece no estado final.

## Páginas

Home: topo com mosaico → ramos → quatro dados de mercado → o que eu faço (ofertas e o que muda) → como funcionaria na
sua empresa (seis ramos) → como funciona (4 passos) → o que já construí → estimativa → quem faz → segurança e LGPD →
perguntas → contato → rodapé.

`/casos/<slug>/` (ClinicFlow, WhatsApp Control Center, Kairos): cabeçalho com status e "serve para", captura, problema,
o que o sistema faz, o que muda na rotina, rodapé técnico recolhido, outros casos, contato.

404: "Esta peça não está no mosaico.", com o mosaico de ramos e um espaço vazio.

`/contabilidade/` deixou de existir: o nginx redireciona (301) para `/#na-sua-empresa`.
