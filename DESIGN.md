# Design: "Mosaico"

Sistema visual do site da Noxlabs na v4 (novembro de 2026). Marca e voz em `BRAND.md`; por que esta direção, em
`docs/references.md`. Tokens em `src/styles/global.css`.

## Ideia

Cada empresa é uma peça. O azulejo, um ladrilho de cantos arredondados, é a unidade de tudo: a ilustração de um ramo,
a capa de um projeto, a resposta da conta. No topo, a mensagem é a peça do meio de um mosaico de nove ramos, com uma
peça vazia para o ramo de quem lê; o resto da página repete a mesma peça em escalas diferentes. Calor vem das
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
  cores vêm de classes, então a mesma peça serve em qualquer fundo. Doze ramos: clínica (prancheta com cruz e pulso),
  loja, escritório, advocacia, indústria, distribuidora, imobiliária, escola, transportadora, agro, e-commerce, agência.
- **Ícones de interface** (`src/data/icons.ts`): traço único de 1,75 px, pontas arredondadas, 24 px.
- **Telas de exemplo**: a conversa no celular do seletor de ramos (bolhas brancas do cliente, goiaba-claro do
  assistente, lilás da pessoa da equipe e um aviso de passagem), com nomes fictícios e a nota "de exemplo".

## Componentes

- **Botões:** primário goiaba-escuro com texto branco (na faixa escura e no menu, goiaba com texto jabuticaba);
  secundário branco com borda. Altura de 54 px (44 px no `btn-sm`), raio de 14 px.
- **Topo** (`Hero.astro`): grade de 6 colunas; a primeira linha tem seis ramos quadrados; a mensagem ocupa 4×2 no meio,
  com dois ramos de cada lado, e a última peça da direita é a vazia ("E o seu ramo?", leva aos exemplos). Até 64rem:
  quatro ramos, a mensagem e os outros seis em três colunas. No celular, os quatro primeiros ramos vêm antes do título.
- **Seletor de ramos** (`Scenarios.astro`): abas com pictograma, na ordem loja, indústria e distribuidora, clínica,
  imobiliária, escola, escritório e serviços (chips roláveis no celular, setas do teclado, Home e End); celular de
  exemplo, "Hoje", "Com a Noxlabs" e "O que você ganha". Sem JS, os seis cenários aparecem em sequência.
- **Ofertas** (`Solutions.astro`): mosaico de seis peças em xadrez de goiaba, caju e lilás (3×2, 2×3 no tablet, uma
  coluna no celular), cada uma com ícone num círculo branco, título, promessa e três exemplos.
- **Projetos** (`Work.astro`): faixas alternadas, com o recorte legível da tela real (a mensagem no celular; três
  consultas de hoje) em moldura branca sobre uma peça de cor ao lado do texto; "Também construí" em quatro peças de cor,
  duas no tablet, faixa rolável com contador no celular.
- **Dado de mercado** (`MarketData.astro`, `Stat.astro`): título fixo à esquerda e uma lista à direita; cada linha tem o
  número em goiaba-escuro, a frase e a fonte com link, ano e ressalva.
- **A conta** (`Estimator.astro`): uma frase para completar ("Na minha empresa, 6 pessoas passam 6 horas por semana…"),
  com botões de menos e mais de 48 px e campos com teclado numérico; a resposta num azulejo goiaba-claro; premissas num
  bloco que abre; resumo fixo no celular.
- **Fecho** (`Contact.astro`): a única faixa escura. Quem cuida da sua rotina (foto do Daniel numa moldura goiaba e
  texto curto), os quatro passos de como começa em peças, e o cartão de contato com o e-mail, a cópia do endereço e o
  roteiro que o e-mail já traz.
- **Perguntas** (`Faq.astro`): duas colunas de peças lilás que abrem em goiaba-claro.

## Celular

O celular é a experiência principal, não uma adaptação.

- **Cabeçalho:** 64 px, só a marca e "Menu". Some ao rolar para baixo e volta ao rolar para cima; fica visível durante a
  rolagem disparada pelo menu.
- **Menu:** folha que sobe da base (zona do polegar), com fundo escurecido. De cima para baixo: as seis seções em letras
  grandes com "Você está aqui" na atual; a ação principal; e, por último, os contatos e links externos em chips
  ("Copiar e-mail", WhatsApp quando houver, Blog e Portfólio com seta). Com o menu fechado, o botão mostra o nome da
  seção atual. Abre e fecha em 360 ms, sem salto; trava a rolagem do fundo; prende
  o foco; fecha ao tocar num link (e rola até a seção sem escondê-la sob o cabeçalho), ao tocar fora, com Esc, no
  "Fechar" e com o gesto de voltar. Alvos de 48 px; cabe sem rolagem interna em 360×640 e 320×568; respeita a área
  segura do aparelho.
- **CTA da base:** aparece depois do topo e some sobre o seletor de ramos, a calculadora, o contato, o rodapé e com o
  menu aberto.
- **Faixas roláveis** com encaixe e o próximo item cortado na borda: chips do seletor e "Também construí". O topo não
  rola de lado: os ramos aparecem inteiros na primeira tela.
- Sem rolagem horizontal da página de 320 a 2560 px; campos com 16 px ou mais (sem zoom no iOS); nada de hover preso.

## Movimento

Pouco e com propósito; só `transform` e `opacity` (e `width` na barra da calculadora).

- **Um momento orquestrado:** as peças do topo se assentam em volta da mensagem, uma a uma. CSS puro, uma vez.
- **Entradas por rolagem:** subida curta (20 px, 640 ms) uma vez por bloco; sem JS ou com movimento reduzido, tudo nasce
  visível; trava de 3 s se o script não rodar.
- **Respostas à ação:** troca de ramo com a conversa chegando mensagem a mensagem; menu com links que sobem em sequência;
  números da conta deslizam até o novo valor; visto que se desenha ao copiar o e-mail.
- `prefers-reduced-motion: reduce` zera durações: a página aparece no estado final.

## Páginas

Home: topo (mensagem no mosaico de ramos; cada peça abre o exemplo do ramo) → como funcionaria na sua empresa (nove
ramos) → feito por mim (projetos) → o que eu faço (mosaico de seis peças) → números do Sebrae → a conta da sua equipe →
antes de começar (perguntas em duas colunas) → seus dados → fecho escuro: quem cuida da sua rotina, como começa e
contato → rodapé.

`/casos/<slug>/` (ClinicFlow, WhatsApp Control Center, Kairos): cabeçalho com status e "serve para", captura, problema,
o que o sistema faz, o que muda na rotina, rodapé técnico recolhido, outros casos, contato.

404: "Esta peça não está no mosaico.", com o mosaico de ramos e um espaço vazio.

`/contabilidade/` deixou de existir: o nginx redireciona (301) para `/#na-sua-empresa`.
