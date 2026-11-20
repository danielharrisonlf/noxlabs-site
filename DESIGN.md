# Design: Noxlabs "Longa exposição"

Registrado a partir do site construído (`src/styles/global.css` e componentes). Substitui inteiramente o sistema
"Concreto" (grade de 12 colunas à mostra, régua de marcas, formas com significado fixo, cantos retos), que deixou de
valer. Referências e o que se tirou de cada uma: `docs/references.md`.

## Conceito

A fotografia de longa exposição transforma movimento invisível em linhas de luz. A Noxlabs faz o mesmo com sistemas:
torna visível o caminho de um pedido, de um evento, de um agente. Nox é noite; o Kairos é o momento certo; a hora azul
é quando as luzes da cidade acendem, e o site trata "entrar no ar" desse jeito.

Isso responde ao "engessado" da versão anterior: a linha reta da grade deu lugar à curva do rastro, o bloco chapado ao
céu com profundidade, o texto parado a peças que se movem quando a pessoa age.

## Dois planos, não uma inversão

| Papel | Manhã (claro) | Noite (escuro) | Uso |
| --- | --- | --- | --- |
| `--bg` | `#f5f6fc` | `#0d1438` | fundo da página |
| `--bg-2` | `#ffffff` | `#141c4b` | superfícies elevadas: painel de serviço, carta, FAQ |
| `--bg-3` | `#e8ebf8` | `#0a1030` | superfícies afundadas: princípios, resultado, botões redondos |
| `--line` / `--line-2` | `#d6dbef` / `#aeb6d8` | `#26306b` / `#3b478c` | divisórias e contornos |
| `--fg` | `#111a45` | `#eef0ff` | texto |
| `--fg-2` | `#3e4777` | `#b8bfe8` | texto secundário |
| `--fg-3` | `#565e8a` | `#98a2d4` | metadados (≥ 4,5:1 nos dois) |
| `--link` | `#2a43c6` | `#ffc56e` | links |
| `--accent` / `--accent-fg` | `#111a45` / branco | `#ffb547` / `#0a1030` | botão primário: tinta de dia, luz de sódio à noite |
| `--sodio` | `#c46a00` | `#ffb547` | luz principal: rastro ativo, pontos, CTA noturno |
| `--freio` | `#d43c2a` | `#ff7a5c` | lanterna; também o sinal "no ar" (`--live`) |
| `--mercurio` | `#1f6fd1` | `#8fd3ff` | luz fria: trechos já percorridos, código público |

Céus (`--sky-top`, `--sky-mid`, `--sky-low`, `--haze`, `--haze-2`) desenham o topo, a abertura dos casos e o 404. De
manhã o céu é o próprio papel, sem gradiente, com uma névoa âmbar fraca só na origem dos rastros; à noite vai de índigo
profundo a um horizonte violeta e se dissolve no fundo da página.

`.night` força o plano noturno num trecho, nos dois temas: o palco do Kairos e a faixa de contato são ilhas de noite
dentro da página de manhã, e o fechamento da página é sempre noturno.

Regras: nenhum preto puro, nenhum gradiente em texto. A cor forte é luz (traço, ponto, botão), não fundo de seção.
Texto sobre âmbar é sempre `#0a1030`.

## Tipografia

- **Funnel Display** (variável 300–800, OFL, Dicotype/NORD ID) para títulos, nomes e números de prova. Curvas largas e
  terminais que lembram o rastro. Peso 500 nos títulos, 600 em nomes curtos.
- **Atkinson Hyperlegible Next** (variável 200–800, OFL, Braille Institute) para texto e interface. 400 no corpo,
  700 em rótulos e botões. O zero cortado é dela e fica.
- Hospedadas em `/fonts/`, subconjunto latino, `font-display: swap`, fallback com métricas ajustadas, licenças ao lado.

| Token | Valor | Uso |
| --- | --- | --- |
| `--t-xs` | 13px | legendas, rodapé legal |
| `--t-sm` | 15px | rótulos, botões, metadados |
| `--t-base` | 17–19px | corpo, entrelinha 1.6 |
| `--t-md` | 19–23px | lede, texto do passo |
| `--t-lg` | 22–30px | perguntas, títulos de etapa, provas |
| `--t-xl` | 28–48px | títulos de painel e de bloco |
| `--t-2xl` | 38–72px | títulos de seção |
| `--t-display` | 44–96px | topo, contato e 404; entrelinha 0.98, tracking -0.04em |

Títulos com `text-wrap: balance`; corpo entre 40 e 62ch. Sem caixa-alta, sem rótulo acima de título.

## Forma e espaço

- Cantos: `--r-sm` 10, `--r-md` 18, `--r-lg` 28, `--r-xl` 40, cápsula 999. Céus e o palco usam 40; painéis 28;
  itens de lista e FAQ 18; botões e chips são cápsulas.
- Céus sangram até a borda da janela, sem moldura; a navegação flutua por cima. O que tem canto é o que se pega: palco
  do Kairos (40px), painel de serviço, molduras de caso e carta (28px).
- Largura máxima 80rem, calha de 16 a 48px, seções de 64 a 112px. Composições variam por seção: título e lede
  empilhados (serviços), título e texto lado a lado (Kairos), título no vão acima do segundo caso desencontrado
  (casos), abertura centralizada sobre a onda (processo), retrato e texto (sobre), cabeçalho fixo e lista (perguntas),
  texto e carta numa faixa noturna (contato).
- Profundidade com sombra de deslocamento e desfoque (`--shadow-1`, `--shadow-2`), névoa radial nos céus e
  granulação de filme (`.grain`, SVG de 1 KB em `overlay`).

## Rastro de luz

O único ornamento, sempre em três camadas: brilho largo (16px, opacidade baixa), brilho (6–10px) e núcleo (1,75–2,25px),
pontas arredondadas. Pontos de luz: núcleo cheio com anel da cor do fundo e halo de 20%.

- Topo: seis rastros sobem da borda de baixo à direita do texto e terminam nas três provas (Kairos no ar, agentes com
  as permissões de cada usuário, código aberto). Nunca cruzam texto. No celular, "Kairos no ar" sobe para a primeira
  tela numa faixa curta de rastros.
- Seletor de serviços: um rastro liga o problema escolhido ao painel da resposta.
- Kairos: linha-chave tracejada do caminho inteiro; o trecho atual acende em âmbar; os já percorridos ficam em
  mercúrio, como numa exposição acumulada.
- Processo: onda que passa pelas quatro etapas e se desenha com a rolagem.
- Contato: faixa de rastros ao pé do bloco. 404: um rastro abaixo do botão que se apaga no caminho.
- Sobre: um rastro contínuo passando por trás do retrato.
- Marca: um "n" desenhado por um único rastro (âmbar para coral) com a fonte da luz acesa na ponta.

## Componentes

- **Navegação**: cápsula flutuante com desfoque, links com ponto de luz na seção atual, progresso de leitura na borda
  de baixo (rolagem), tema e CTA fixo "Pedir diagnóstico". Abaixo de 70rem, menu em cartão sob a cápsula.
- **Botões**: cápsula de 52px (44px no cabeçalho). Primário com reflexo que atravessa no hover; fantasma com
  contorno. Seta desliza 3px. Foco: contorno de 2px com afastamento.
- **Seletor de problemas**: abas verticais (WAI-ARIA, setas, Home, End) a partir de links âncora; sem script, todos os
  painéis aparecem. O botão de cada painel abre o e-mail com o problema no assunto.
- **Palco do Kairos**: dois desenhos (largo a partir de 64rem, zigue-zague abaixo), trilho de seis passos em abas,
  painel de altura fixa, anterior, próximo e reproduzir/pausar/repetir. Reproduz sozinho uma vez ao aparecer; parado
  com movimento reduzido.
- **Casos**: molduras neutras com a captura inteira, deslocadas em altura; no hover a moldura sobe e uma faixa de luz
  passa. A captura usa `view-transition-name` e continua na página do caso. "Também construí" mostra quatro e dobra o
  resto num `<details>`.
- **Kairos, fatos**: "Em produção" em corpo de display; a medição do gateway e o limite assumido em notas menores ao lado.
- **Princípios**: texto corrido em duas colunas, o título abre a frase.
- **FAQ**: `<details>` em lista com fios, ponto de luz na pergunta aberta, mais que gira para xis, altura animada onde
  o navegador sabe.
- **Contato**: mailto com assunto e roteiro preenchidos, copiar e-mail com confirmação no botão, carta que mostra o
  roteiro. Botão de agenda aparece só se `scheduleUrl` existir.

## Movimento

Um momento orquestrado no carregamento: a exposição do topo se forma (rastros em 2,2s, um pacote de luz por prova,
provas acendendo), uma vez, sem laço. Depois disso, movimento só responde à pessoa ou à rolagem: passos do Kairos,
rastro do seletor, onda do processo, hover. Curva padrão `--ease-out`; mola leve (`--ease-spring`) só em transições de
hover e seta. Troca de tema e navegação entre páginas usam transição de visão. `prefers-reduced-motion` desliga
desenhos, pacotes, autoplay e transições; tudo começa visível.

## Não canonizado

O detector aponta `bounce-easing` quando uma animação usa `--ease-spring`; ela fica restrita a transições de hover, sem
animações de entrada.
