# Product

<!-- impeccable:product-schema 1 -->

> Reescrito no rebranding de novembro de 2026 a partir do pedido do Daniel ("não é algo voltado para devs, mas sim donos
> de empresas, gestores... traga dados... não cite coisas como arquitetura, banco de dados"). Itens **[em aberto]**
> precisam de confirmação dele.

## Platform

web

## Stack

Astro com saída estática, CSS próprio com tokens, sem framework de UI. JavaScript pequeno e sem biblioteca: menu, seção
atual, contadores, calculadora e cópia de e-mail; todo o conteúdo aparece sem script. Servido por nginx em contêiner.

## Users

Donos e gestores de pequenas e médias empresas brasileiras. Primeiro foco: escritórios de contabilidade. Também
clínicas e consultórios, escritórios de advocacia, imobiliárias, comércio e distribuição, serviços e logística. Têm
trabalho manual repetido, planilhas, WhatsApp desorganizado, retrabalho, prazos perdidos, dado digitado duas vezes e
clientes pedindo status; querem crescer sem contratar na mesma proporção. Não são técnicos e não querem ouvir sobre
tecnologia: querem saber o que muda na rotina, quanto tempo volta, se é seguro e como começar.

## Product Purpose

Site da Noxlabs (noxlabs.tech), de Daniel Harrison. Vende automações de rotina, atendimento e WhatsApp com IA, sistemas
sob medida, integrações, painéis para o dono e diagnóstico de processos. Sucesso: um dono ou gestor manda um e-mail
descrevendo a rotina e marca a conversa de 30 minutos.

## Positioning

Ver `BRAND.md`. Em uma linha: menos tarefa manual, mais tempo para o que dá resultado; quem conversa com você é quem
constrói, começando pelo que a empresa já usa, uma rotina de cada vez.

## Operating Context

- Contato por e-mail (daniel.harrisonlf@gmail.com), com assunto e roteiro pré-preenchidos e botão de copiar.
- **[em aberto]** WhatsApp comercial: não existe número nos dados. `src/data/site.ts` → `whatsapp: null`; ao preencher
  (só dígitos com DDI e DDD), o botão "Chamar no WhatsApp" aparece no contato.
- **[em aberto]** Agenda: não existe link (Cal.com ou similar). `scheduleUrl: null`; ao preencher, aparece "Escolher
  horário na agenda".
- **[em aberto]** E-mail no domínio (por exemplo contato@noxlabs.tech): hoje o site usa o Gmail.
- **[em aberto]** Se a conversa inicial de 30 minutos é gratuita: o site não promete.
- Links: portfólio https://danielharrison.noxlabs.tech, blog https://blog.noxlabs.tech, Kairos https://kairos.noxlabs.tech,
  LinkedIn /in/danielharrison-/. GitHub só no JSON-LD da pessoa e nos rodapés técnicos.

## Capabilities and Constraints

Ofertas (escopo sob proposta, sem preço publicado): automação de rotinas, atendimento e WhatsApp com IA, sistemas sob
medida, integração do que a empresa já usa, painéis para o dono, diagnóstico de processos.

Processo: conversa de 30 min → diagnóstico da rotina → proposta por escrito → primeira rotina em uso, uma de cada vez.

## Brand Commitments

- Nome Noxlabs, domínio noxlabs.tech. Português do Brasil.
- Sem tecnês no caminho principal. Detalhe técnico só no rodapé recolhido das páginas de caso. `scripts/check-page.mjs`
  falha se um termo técnico aparecer fora dele.
- Sem clientes, depoimentos, logos, métricas ou preços inventados. Dados de mercado nunca apresentados como resultado da
  Noxlabs.
- Todo número com fonte e ano na própria tela, e registrado abaixo com URL e citação literal.

## Evidence on Hand

- Kairos (produto próprio no ar, repositório público `axial`), ClinicFlow (público, com landing), WhatsApp Control Center
  (público). FinFlow, Omni CRM AI, controle de pátio e monitoramento de câmeras são privados: descritos, nunca linkados.
- Experiência anterior do Daniel (portfólio, `danielharrisonlf/portfolio`, `src/data/portfolioData.ts`): setores
  engenharia, controle de acesso e locação de equipamentos (campo `context`); portal de suporte com fila e prazos,
  notificações WhatsApp/Telegram, câmeras de obra (`experiences[0].bullets`); catracas e leitores biométricos
  (`experiences[1].bullets`). Nomes de empregadores não aparecem no site.
- Os textos dos casos foram traduzidos para linguagem de negócio a partir dos READMEs e mantêm só o que eles afirmam. O
  ganho de cada caso é qualitativo e o site diz isso.
- Ausentes: depoimentos, clientes nomeáveis, métricas de negócio, preços.

### Proveniência das imagens

Vêm do repositório público do portfólio (`danielharrisonlf/portfolio`, `public/uploads/`); nenhuma gerada por IA.

- `public/img/daniel-harrison.webp`: `public/uploads/backback.webp` (foto do Daniel).
- `public/img/clinicflow-painel*.webp`: captura do frontend real do ClinicFlow, com dados de demonstração.
- `public/img/whatsapp-control-center*.webp`: captura do frontend real, com organização e conta de demonstração.
- `public/og.png`, `favicon.svg`, `favicon.ico` e ícones PNG: desenhados neste projeto e gerados por
  `scripts/og-image.mjs`. A lista de rotina do OG e do topo é ilustrativa e rotulada como exemplo.

## Dados de mercado usados no site

Todos lidos em 20/11/2026 nas URLs abaixo. Definidos em `src/data/stats.ts`; cada um aparece com "Fonte:", ano e link.
Onde um PDF tem texto em colunas, a citação junta os fragmentos da mesma frase.

| Id | Número no site | Fonte e ano | URL | Citação literal | Ressalva exibida |
| --- | --- | --- | --- | --- | --- |
| `cfc-escritorios` | 101.880 | CFC, Relato Integrado 2025, publicado em 2026 (posição no fim de 2025) | https://cfc.org.br/wp-content/uploads/2026/05/RI_2025.pdf (p. 21 do PDF) | "Profissionais e empresas com registro ativo Profissionais Registrados 404.572 Contadores 134.614 Téc. em contabilidade Organizações Contábeis 101.880 Empresas Contábeis" | — (organizações com registro, não escritórios em atividade) |
| `cfc-profissionais` | 539 mil | idem (404.572 + 134.614 = 539.186; a p. 12 arredonda para "cerca de 540 mil") | idem | idem | — |
| `contabil-retrabalho` | 34% | IOB com CFC e Fenacon, notícia do CFC de 03/09/2026 (campo em abril e maio de 2026) | https://cfc.org.br/noticias/pesquisa-mostra-avanco-da-inteligencia-artificial-na-rotina-dos-profissionais-da-contabilidade/ | "Entre os principais desafios apontados pelos profissionais na rotina estão o excesso de retrabalho manual, citado por 34% dos entrevistados; a falta de tempo para análise e consultoria, por 20%; a dificuldade de integração entre sistemas e dados, por 17%; e os erros humanos em tarefas repetitivas, por 15%." | "393 profissionais ouvidos." |
| `contabil-ia-semanal` | 78% | idem | idem | "78% dos participantes utilizam ferramentas de IA no trabalho pelo menos uma vez por semana." | "393 profissionais ouvidos." |
| `bm-horas-impostos` | 1.501 h | Banco Mundial, Doing Business 2020, perfil do Brasil (dados de 2019) | https://subnational.doingbusiness.org/content/dam/doingBusiness/country/b/brazil/BRA-LITE.pdf | "Paying Taxes … Time (hours per year) 1,501" | "Empresa-modelo; dados de 2019, último ano da série." |
| `ibpt-normas` | 569.469 | IBPT, publicado em 27/10/2026 (outubro de 1988 a setembro de 2026) | https://ibpt.org.br/brasil-editou-862-milhoes-de-normas-desde-1988-quase-7-sao-tributarias/ | "Entre 1988 e setembro de 2026, foram editadas 569.469 normas tributárias no Brasil, o que representa uma média superior a 40 por dia." | "Federais, estaduais e municipais." |
| `tr-5h` | 5 h | Thomson Reuters, Future of Professionals Report 2025, comunicado de junho de 2025 (pesquisa de fevereiro e março de 2025) | https://thomsonreuters.com/en/press-releases/2025/june/the-ai-adoption-reality-check-firms-with-ai-strategies-are-twice-as-likely-to-see-ai-driven-revenue-growth-those-without-risk-falling-behind | "Globally, survey respondents across industries also predict that professionals using AI will save 5 hours weekly […] within the next year, up from 4 hours predicted in 2024"; método: "online survey of 2,275 professionals across the globe" | "Previsão de 2.275 profissionais de vários países." |
| `ms-sem-tempo` | 80% | Microsoft, 2025 Work Trend Index Annual Report (31 mil pessoas, 31 mercados, fev.–mar. 2025) | https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born | "80% of the global workforce—both employees and leaders—say they're lacking enough time or energy to do their work." | "31 mil pessoas em 31 países, Brasil incluído." |
| `mckinsey-potencial` | 60 a 70% | McKinsey, "The economic potential of generative AI", 14/06/2023 | https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier | "Current generative AI and other technologies have the potential to automate work activities that absorb 60 to 70 percent of employees' time today." | "Potencial técnico, não previsão de corte de vagas." |
| `salesforce-imediato` | 77% | Salesforce, State of the Connected Customer, 6ª edição, 28/08/2023 | https://www.salesforce.com/au/news/stories/customer-engagement-research-2023/ | "77% of customers expect to interact with someone immediately when they contact a company"; método: "a double-blind survey of 11,000 consumers and 3,300 business buyers conducted from May 3 through July 14, 2023." | "11 mil consumidores e 3.300 compradores de empresas em 25 países." |
| `sebrae-whatsapp` | 8 em 10 | Sebrae, Pesquisa Pulso dos Pequenos Negócios, 12ª edição, Agência Sebrae em 16/04/2026 (mais de 8,2 mil empreendedores, fev.–mar. 2026) | https://agenciasebrae.com.br/dados/whatsapp-se-consolida-nas-vendas-on-line-enquanto-facebook-e-lojas-proprias-perdem-folego/ | "Oito em cada dez donos de pequenos negócios apontam que o WhatsApp é o seu principal canal de comunicação e de vendas." | — |
| `cetic-ia` | 17% (15% nas pequenas) | Cetic.br/NIC.br, TIC Empresas 2025, Resumo Executivo, publicado em 2026 | https://cetic.br/media/docs/publicacoes/2/pt-br/20260831091252/TIC_EMPRESAS_2025_PT_RE.pdf (p. 3) | "Em 2025, a pesquisa TIC Empresas apontou um aumento no uso de aplicações de IA nas empresas brasileiras: 17% afirmaram utilizá-las, proporção que foi de 13% em 2024. […] Houve crescimento entre as pequenas empresas, que foram de 10% em 2024 para 15% em 2025" | "Empresas com 10 ou mais pessoas." |
| `cetic-erp` | 58% | Cetic.br, TIC Empresas 2025, tabela G2 | https://cetic.br/pt/tics/pesquisa/2025/empresas/G2/ | Título "G2 - EMPRESAS QUE UTILIZARAM PACOTES DE SOFTWARE ERP PARA INTEGRAR OS DADOS E PROCESSOS DE SEUS DEPARTAMENTOS EM UM SISTEMA ÚNICO NOS ÚLTIMOS 12 MESES"; linha "TOTAL 36 58 6" (Sim / Não / Não sabe) | "Empresas com 10 ou mais pessoas." |

### Pesquisados e não usados

- Contagem ao vivo do CFC (www3.cfc.org.br): o servidor recusou a conexão; usado o Relato Integrado.
- "90% dos clientes esperam resposta em até 10 minutos": distorção de uma pesquisa da HubSpot de 2018 (90% acham
  importante resposta imediata; 60% entendem "imediato" como até 10 minutos). Não usado.
- Horas perdidas por escritórios contábeis na coleta de documentos: nenhuma pesquisa com metodologia identificável.
- "79% dos escritórios usam IA generativa" (Retrato do Mercado Contábil 2026): visto só em resumos de blog.
- AWS/Strand (50% das empresas usam IA): metodologia diferente do Cetic.br e encomendado por fornecedor; preferido o
  dado oficial.
- Asana "62% do dia em tarefas repetitivas", Intuit "25 horas por semana", Smartsheet 2017: verificados ou parcialmente
  verificados, mas com escopo fora do Brasil, amostra de fornecedor ou ano antigo. Ficaram de fora para manter poucos
  números fortes.

## Estimativa de horas liberadas

`src/data/estimator.ts`. Valores iniciais: 5 pessoas, 8 h/semana cada, R$ 4.000 de custo mensal, 30% automatizável.
Premissas na tela: 4 semanas por mês (abaixo das 4,3 do calendário); custo da hora = custo mensal ÷ 220 (divisor da CLT
para 44 h semanais, que deixa a hora mais barata); tempo integral = horas ÷ 220. A parte automatizável é hipótese do
visitante, de 10% a 60%, começando em 30% (abaixo do potencial técnico de 60–70% da McKinsey). Rotulada como estimativa
ilustrativa; o texto diz que horas liberadas viram capacidade, não economia automática de salário. Nada é enviado: a
conta roda no navegador, e o botão monta um e-mail com os números.

## Product Principles

1. Fale da rotina e do ganho, não da tecnologia.
2. Prova antes de promessa: dado com fonte, sistema que existe, ganho qualitativo quando não há medição.
3. Começa pelo que o cliente já usa, uma rotina de cada vez.
4. Pessoa no controle: a automação prepara, a equipe confere o que importa, tudo fica registrado.
5. LGPD no desenho, explicada em português.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, teclado, foco visível, alvos de 44 px, `prefers-reduced-motion`, conteúdo completo sem
JavaScript, 320 a 2560 px.
