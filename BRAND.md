# Marca Noxlabs: "Mosaico"

Plataforma de marca de novembro de 2026 (v4): donos e gestores de pequenas e médias empresas brasileiras de qualquer
ramo. O sistema visual está em `DESIGN.md`; a escolha da direção, em `docs/references.md`; a fonte de cada número, em
`PRODUCT.md`.

## Posicionamento

Para donos e gestores de pequenas e médias empresas de qualquer ramo (clínica, loja, escritório, indústria,
distribuidora, imobiliária, escola, transportadora, agro, e-commerce, agência) que perdem horas da equipe com trabalho
repetitivo, a Noxlabs cria automações, atendimento pelo WhatsApp com IA e sistemas sob medida que tiram esse trabalho da
rotina e mostram ao dono como o negócio está. Diferente de um software de prateleira ou de uma agência, quem conversa com
você é quem constrói, começa pelo que a empresa já usa e entrega uma rotina de cada vez.

**Promessa em uma linha:** menos trabalho repetitivo, mais tempo para o que faz a empresa crescer.

**Frase de abertura:** "Tire o trabalho repetitivo da rotina da sua empresa."

## Conceito

Cada empresa é uma peça diferente, e a rotina de cada uma tem o seu desenho. A Noxlabs encaixa as peças: o que já existe
(sistema, planilha, WhatsApp) com o que falta (a automação, o assistente, o painel). O azulejo, a peça que se encaixa
com as outras, é a imagem da marca e a unidade de todo o site.

## Para quem

- Qualquer ramo, com o mesmo peso. Contabilidade é um exemplo entre doze, nunca o foco.
- O que eles querem: horas de volta, menos erro e retrabalho, atendimento mais rápido, visão clara do negócio, crescer
  sem contratar na mesma proporção, dados protegidos.

## Pilares de mensagem

1. **Tempo de volta.** O ganho é hora da equipe liberada, não "tecnologia".
2. **Serve para o seu ramo.** O que muda de um negócio para outro é a rotina; o trabalho começa por ela.
3. **Começa pelo que você já usa.** Sem trocar sistemas por trocar.
4. **Uma rotina de cada vez.** Primeira melhoria em uso cedo; o próximo passo se decide com o resultado na mão.
5. **Pessoa no controle.** O assistente prepara, a equipe confere o que importa, tudo fica registrado.
6. **Prova honesta.** Dados de mercado com fonte e ano; sistemas que o Daniel construiu; nenhum cliente, número ou
   depoimento inventado.

## Voz

Clara, próxima, confiante, sem tecnês.

| Somos | Não somos |
| --- | --- |
| Claros: frases curtas, verbo no começo, uma ideia por frase. | Vagos: "soluções inovadoras", "transformação digital". |
| Próximos: "você", "sua equipe", "sua empresa"; o Daniel fala em primeira pessoa. | Distantes: "a organização", voz passiva. |
| Confiantes: dizemos o que dá e o que não dá. | Exagerados: "revolucione", "100% automático", "zero erros". |
| Concretos: a rotina com nome (pedido, boleto, consulta, visita, matrícula). | Técnicos: arquitetura, banco de dados, API, MCP, deploy, nome de linguagem. |
| Abrangentes: exemplos de ramos diferentes lado a lado. | Presos a um setor: o vocabulário de um ramo só no caminho principal. |

### Regras de escrita

- Fale da rotina e do ganho, nunca de como o sistema é construído. O detalhe técnico vive só no rodapé recolhido das
  páginas de caso ("Detalhes técnicos, para quem cuida da TI"). `scripts/check-page.mjs` falha se um termo técnico
  aparecer fora dele.
- Exemplos sempre de vários ramos. Quando um exemplo é de um ramo, o seguinte é de outro.
- Todo número de mercado vem com "Fonte:", ano e link, e vale para qualquer ramo. Dado de setor só dentro do exemplo
  daquele setor. Nunca apresente dado de mercado como resultado da Noxlabs.
- Telas, conversas e números de exemplo são rotulados como exemplo, com nomes fictícios.
- Não prometa o que não está confirmado: "gratuito", preço, prazo fixo, integração com um sistema específico.
- Botões dizem o que acontece: "Pedir uma conversa de 30 min" (abre um e-mail), "Ver como seria no seu ramo",
  "Enviar esta estimativa por e-mail".
- Português do Brasil, frase em caixa normal. Sem caixa-alta em rótulos, sem emoji, sem ponto médio entre itens.
- IA é ferramenta, não tema. Diga o que o assistente faz ("responde preço, estoque e prazo"), não o que ele é.

### Antes e depois

| Antes (v3) | Depois (v4) |
| --- | --- |
| "Sua equipe não foi contratada para copiar e colar." com rotina de escritório contábil ao lado | "Tire o trabalho repetitivo da rotina da sua empresa." com doze ramos no mosaico |
| "Para contabilidade e pequenas e médias empresas" | "Para empresas de todo ramo" |
| Bloco escuro "O escritório cresce. A digitação, não." e página `/contabilidade/` | Seletor "Como funcionaria na sua empresa" com seis ramos de mesmo peso; contabilidade é a aba "Escritório" |
| Dados do CFC e da IOB na página inicial | Microsoft, McKinsey e Sebrae (dois dados): valem para qualquer empresa |

## Identidade visual (resumo)

- **Logo:** quatro azulejos de 15 em 32 px que se encaixam: dois em jabuticaba, um arco de porta em goiaba, um canto
  arredondado em caju. Wordmark "noxlabs" em minúsculas, Parkinsans 700. Arquivos: `src/components/Logo.astro`,
  `public/favicon.svg` (clareia em abas escuras), ícones PNG e OG por `scripts/og-image.mjs`.
- **Cores:** jabuticaba `#2a1430` (tinta), goiaba `#ee5a6f` / `#b42a40` (marca e ação), caju `#ffb23e` (acento raro),
  lilás `#e8dcf2` e rosa `#ffe1e4` (fundos), papel `#fff8f6`.
- **Tipografia:** Parkinsans (títulos, números) e Onest (texto e interface), ambas OFL, hospedadas no site.
- **Ilustração:** pictogramas de ramo planos, construídos numa grade de 64 com a mesma regra (uma forma em tinta, um
  acento, detalhes em papel), dentro de azulejos de cor. `src/data/illustrations.ts`.
- **Imagem:** telas de exemplo desenhadas em HTML (conversa, painel, ordens de serviço), capturas reais dos sistemas com
  dados de demonstração e a foto do Daniel. Sem banco de imagens, sem imagem gerada por IA.

## Faça e não faça

| Faça | Não faça |
| --- | --- |
| Ramos diferentes lado a lado, com o mesmo tamanho. | Destacar um ramo no topo ou na navegação. |
| Uma ação principal por bloco, em goiaba. | Dois botões principais competindo. |
| Mostrar a rotina antes e depois, com o ganho em uma frase. | Listar tecnologias, linguagens ou nomes de ferramentas internas. |
| Rotular exemplos e ilustrações. | Mostrar tela de exemplo como se fosse de cliente. |
| Citar fonte, ano e escopo de cada número. | Número amarelo sobre faixa escura (é a cara da versão recusada). |
| Dizer quando automação não compensa. | Prometer resultado, gratuidade ou prazo sem confirmação. |
| "Pensado para a LGPD." | "Conforme a LGPD" ou "dados protegidos" como garantia: conformidade é do controlador. |
