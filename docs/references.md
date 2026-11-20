# Referências e decisão de direção (v4, novembro de 2026)

Pesquisa e escolha feitas para a quarta versão do site, depois do retorno do Daniel sobre a versão "Rotina em ordem"
(verde-pinho, marca-texto amarelo, contabilidade em primeiro plano): "cara, contabilidade foi apenas um exemplo, não era
pra focar nisso somente. tem que ser algo abrangente. refaça e escolha outro design, esse ficou péssimo." Durante o
trabalho veio um segundo pedido: "melhore a experiência no mobile, o menu mobile está ruim etc".

Nenhum layout, marca, ilustração ou asset foi copiado. As capturas de referência e as das versões recusadas ficam fora do
git, em `docs/screenshots/local/`.

## O que não repetir

| Versão recusada | Por quê | Capturas locais |
| --- | --- | --- |
| v1, cartaz modernista brasileiro com anil, grade rígida | "Engessado" | `marca-anterior/antes/` |
| v2/v3, "longa exposição": céu noturno com rastros de luz | Falava com desenvolvedores, técnico demais | `marca-anterior/` |
| v3 "Rotina em ordem": verde-pinho, marca-texto amarelo, Bricolage Grotesque + Figtree, contabilidade primeiro | Focada num setor só e visualmente "péssima" | `marca-v3-verde/` |

Também evitados: gradiente roxo de SaaS de IA, cartões de vidro, blobs 3D, papel creme com serifa e terracota, faixa
escura com número amarelo (a estrutura da versão verde), rótulos em caixa-alta, texto separado por ponto médio.

## Referências vistas

Capturas reais pela Lazyweb (ferramenta de pesquisa de interfaces) e leitura das páginas públicas. O que levei de cada uma:

| Referência | O que vi | O que levei |
| --- | --- | --- |
| Square, páginas por ramo (ex.: salão) | Cada ramo com a cena do próprio negócio; o produto aparece dentro da rotina de quem atende | Ramos com o mesmo peso e cenas de rotina por ramo, não um setor-vitrine |
| Slack, Workflow Builder | Telas de produto pequenas sobre blocos de cor, uma por recurso | Telas de exemplo (conversa, painel, ordens de serviço) dentro de azulejos de cor |
| Gusto e Billy (software para pequenas empresas) | Tom próximo, foco no dono, prova sem jargão; Billy repete o mesmo bloco de foto e texto | Linguagem de dono; evitar o bloco repetido foto-texto-botão em sequência |
| Attio e Basecamp | Título grande, uma ação principal, produto visível logo abaixo | Uma ação principal por bloco; o produto (as telas de exemplo) já no topo |
| Treble e Plivo (WhatsApp com IA) | Conversa real como prova do que o assistente faz | A conversa de exemplo no celular, com a passagem para uma pessoa ("Marina assumiu") |
| n8n e Asana (automação) | Fluxos e regras como diagrama técnico | O contrário: a automação contada pelo resultado ("38 pedidos lançados"), nunca pelo diagrama |
| Nubank (marca brasileira) | Uma cor própria, forte e reconhecível, aplicada com disciplina | Uma cor de ação (goiaba) e um acento raro (caju); o resto é tinta e papel |

## As três direções

Cada uma com topo e a seção "Como funcionaria na sua empresa", em 1440 e 390 px, e o menu do celular aberto (390×844 e
360×740). Mockups em `.impeccable/mocks/v4/` e capturas em `docs/screenshots/local/v4-direcoes/`.

| Direção | Tipo, cor e recurso visual | Capturas |
| --- | --- | --- |
| A, "Operação à vista" | Funnel Display e Funnel Sans; grafite, porcelana e tangerina; colagem de janelas de produto (conversa, registro do dia, painel) num palco laranja | `a-operacao-*.png` |
| B, "Azulejo" | Parkinsans e Onest; jabuticaba, goiaba, caju e lilás; mosaico de azulejos em que cada peça é um ramo ilustrado ou uma tela de exemplo | `b-azulejo-*.png` |
| C, "Conversa" | Instrument Sans condensada; tinta azul-marinho, azul-céu e pêssego; frases de dor de donos de vários ramos como balões em volta do título | `c-conversa-*.png` |

## Avaliação independente

Um revisor sem acesso à minha preferência recebeu as capturas, as versões recusadas e as palavras do Daniel, e ordenou
as três. Depois do pedido sobre o celular, refez a ordem pesando celular e desktop igualmente.

- **B, primeira.** Única em que a abrangência está na imagem, não só no texto; a mais distante das recusadas; escala bem
  para o site inteiro (o azulejo vira capa de projeto, cartão de dado, resultado da calculadora); melhor menu (indicação
  da seção atual que não depende só de cor, contatos separados, ação na metade de baixo). Riscos apontados: pictogramas
  grosseiros, faixa escura com destaque âmbar parecida com a versão verde, mosaico 3×3 apertado no celular.
- **C, segunda.** A melhor peça de produto (a conversa no celular com a passagem para uma pessoa), mas composição de
  título central com cartões inclinados é molde de landing gerada, e a paleta não tem identidade.
- **A, descartada.** Título à esquerda e cartão com lista por horário à direita: a versão verde com outra cor.

## Decisão

Direção B, com o que o revisor indicou das outras:

1. Da C: o celular com a conversa de exemplo dentro de "Como funcionaria na sua empresa", com a passagem para uma pessoa.
2. Da A: a faixa de ramos logo depois do topo (doze ramos, mesmo peso) e o painel "Hoje, enquanto a equipe atendia" como
   peça grande do mosaico, que mostra a visão do dono.
3. Da A: a contenção. Goiaba é a única cor de ação; caju é acento raro; lilás e rosa claro são só fundo.
4. Pictogramas redesenhados numa construção única (grade de 64, formas planas arredondadas, uma forma em tinta, um
   acento, detalhes em papel).
5. Nada de faixa escura com número amarelo: os dados ficam em azulejos claros, com a fonte embaixo. A única faixa escura é
   o contato, sem número.
6. Celular como experiência principal: menu em folha que sobe da base, mosaico em duas linhas que rolam de lado, chips de
   ramo roláveis, cabeçalho que some ao descer.

## Revisão crítica e reconstrução do esqueleto

A primeira montagem completa foi reprovada por um revisor independente: a direção B estava certa, mas o esqueleto era o
da v3 recolorido (título à esquerda com cartão de "rotina do dia" à direita, a mesma ordem de seções, a mesma calculadora
e as mesmas frases). Também apontou o ícone de clínica com cara de lápide, a captura do WhatsApp Control Center com o
menu de desenvolvedor visível, telas de exemplo miúdas em grade de cartões e números globais sem dizer que eram globais.

O que mudou de verdade:

| v3 | v4 |
| --- | --- |
| Título à esquerda, cartão de rotina à direita | A mensagem é uma peça no meio do mosaico de nove ramos, com uma peça vazia para o ramo de quem lê |
| "Sua equipe não foi contratada para copiar e colar." | "Cada negócio é de um jeito. O trabalho repetitivo é igual em todos." |
| Números → soluções → como funciona → contabilidade → segmentos → casos → estimativa → sobre → segurança → perguntas → contato | Ramos na prática → o que eu faço → projetos → números do Sebrae → a conta → quem cuida → dados → perguntas → como começa e contato |
| Microsoft, McKinsey, Sebrae, CFC, IOB | Só Sebrae 2026, com donos de pequenos negócios do Brasil |
| Calculadora com controles deslizantes e painel escuro | Uma frase para completar, com botões de menos e mais, e a resposta num azulejo claro |
| Contato com carta inclinada | Os quatro passos de como começa ao lado do contato, na única faixa escura |
| Menu em tela cheia, e-mail embaixo | Folha que sobe da base: seções, ação, contatos; o botão fechado mostra a seção atual |

Comparação lado a lado em `docs/screenshots/local/comparacao/` (`topo-1440-v3-x-v4.png`, `topo-390-v3-x-v4.png`,
`menu-390-v3-x-v4.png`).

## Desvios conscientes

- O revisor sugeriu trocar o e-mail do menu por WhatsApp e um e-mail no domínio. Não há número nem domínio confirmados:
  o site usa o e-mail atual e mostra WhatsApp automaticamente quando `site.whatsapp` for preenchido.
- O revisor sugeriu juntar as garantias do topo numa linha com "·". Ponto médio é um tique de página gerada; ficaram como
  lista curta com ícones.
