# Design: Noxlabs "Concreto"

Registrado a partir do site construído (`src/styles/global.css` e componentes), não do plano. Fonte das decisões de
direção: `.impeccable/surfaces/src-pages-index-astro.md`.

## Mundo

Poesia concreta e programas de identidade do modernismo brasileiro: palavra e forma geométrica num grid rígido, com a
estrutura à mostra. Três formas com significado fixo em todo o site, do poema do hero ao diagrama do Kairos:

| Forma | Significa |
| --- | --- |
| Círculo vazado | interface, diagnóstico, algo que olha para fora |
| Círculo anil cheio | serviço, agente, processamento |
| Quadrado | dado, proposta, algo que fica |
| Barra | entrega, fila, progresso |
| Ponto vermelhão | **no ar**. Único uso do vermelho |

Onde as formas se cruzam, a tinta sobreimprime (`mix-blend-mode: multiply` no claro; `screen` ou opacidade no escuro).

## Cor

Estratégia comprometida: o anil é campo, não acento. Ocupa a metade direita do hero, o bloco de contato e os
serviços do diagrama.

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--papel` / `--bg` | `#ffffff` | `#0e0f12` | fundo |
| `--papel-2` / `--bg-2` | `#eef0f3` | `#16181d` | faixa do processo, fundo do diagrama, molduras de captura |
| `--nanquim` / `--fg` | `#0e0f12` | `#eceef2` | texto, linhas fortes, quadrados |
| `--grafite` / `--fg-2` | `#4a4e57` | `#a6abb6` | texto secundário (≥ 7:1) |
| `--linha` / `--rule` | `#d5d8de` | `#2b2e36` | divisórias |
| `--anil` | `#2433c9` | `#2f3fe0` | campos, botão primário, formas |
| `--anil-tinta` / `--link` | `#2433c9` | `#9aa4ff` | links e texto anil sobre o fundo |
| `--anil-sobre-2` | `#d6daff` | `#d6daff` | texto secundário sobre anil (6,3:1) |
| `--vermelhao` | `#e2401c` | `#ff5a33` | só o sinal "no ar" e "operação" |

Regras: vermelho nunca é decoração nem texto. Amarelo não existe. Texto sobre anil é branco ou `--anil-sobre-2`.

## Tipografia

- **Jost** (variável, OFL, herdeira da Futura dos poetas concretos) para display, títulos e o poema. Peso 500.
- **Archivo** (variável, OFL, Omnibus-Type) para texto, rótulos e interface. 400 no corpo, 600 em rótulos.
- Ambas hospedadas em `/fonts/`, subconjunto latino, `font-display: swap` com fallback de métricas ajustadas.

| Token | Valor | Uso |
| --- | --- | --- |
| `--t-xs` | 13px | legendas, rodapé legal |
| `--t-sm` | 15px | rótulos, botões, metadados |
| `--t-base` | 17–18px | corpo, entrelinha 1.6 |
| `--t-md` | 19–21px | lede, respostas destacadas |
| `--t-lg` | 22–26px | perguntas do FAQ, títulos de etapa |
| `--t-xl` | 28–40px | títulos de serviço e de bloco |
| `--t-2xl` | 36–60px | títulos de seção |
| `--t-display` | 44–92px | hero e contato, entrelinha 0.98, tracking -0.035em |
| nome do caso | 56–136px | "Kairos" e títulos das páginas de caso, entrelinha 0.85–0.88 |

Títulos com `text-wrap: balance`; corpo com medida de 40 a 62ch. Sem caixa-alta, sem rótulo acima de título.

## Espaço e grid

- Base 4px: `--s-1` 4 até `--s-10` 128. Seções com `--section-y` de 72 a 144px.
- Grid de 12 colunas, largura máxima 84rem (1344px), calha `--gutter` de 16 a 48px, intervalo `--col-gap` de 16 a 32px.
- Texto alinhado à esquerda. Títulos de seção ocupam 7 colunas; a introdução fica nas colunas 8–12, alinhada à base.
- O hero sangra o campo anil até a borda direita da janela; abaixo de 64rem o campo vira faixa inteira sob o texto.

## Estrutura à mostra

O único ornamento é a régua do grid: cada seção abre com uma linha de nanquim e uma marca de 7px em cada uma das 12
colunas (`.seam`). Divisórias internas são linhas de 1px; cartões com sombra não existem.

## Componentes

- **Botões**: arestas retas, altura mínima 52px (44px no cabeçalho). Primário anil; fantasma com contorno de nanquim
  que inverte no hover; sobre anil, papel ou contorno branco. Foco com contorno de 3px e afastamento de 3px.
- **Linha de serviço**: glifo concreto 56px, título Jost, e um `<dl>` com "Quando faz sentido", "O que entrego"
  (marcadores quadrados anil) e "Resultado".
- **Diagrama do Kairos**: SVG desenhado, duas composições (horizontal a partir de 75rem, vertical com espinha
  central abaixo), rótulos com halo da cor do fundo, legenda em HTML.
- **Linhas de índice**: nome em Jost, resumo, stack e link ou "Código privado", separados por regra de 1px.
- **FAQ**: `<details>` nativo; sinal de mais que vira barra.
- **Ícones**: traço de 1,75px com pontas retas, desenhados no projeto (`Icon.astro`).

## Movimento

Um único momento orquestrado: o poema do hero entra linha a linha e as barras de entrega crescem, partindo de estado
visível (opacidade 0,55 e barra a 25%). Interações ficam abaixo de 200ms. `prefers-reduced-motion` desliga tudo.

## Não canonizado

O detector apontou `cramped-padding` em seções e linhas com régua no topo: o espaçamento vem de custom properties
que a análise estática não resolve, e as capturas mostram o respiro correto. O `radial-halo` apontado é o ponto
"no ar" do poema, desenhado com gradiente radial de dois tons; não é brilho decorativo.
