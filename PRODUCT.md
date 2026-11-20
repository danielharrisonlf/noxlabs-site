# Product

<!-- impeccable:product-schema 1 -->

> Reescrito no rebranding de novembro de 2026 a partir do pedido do Daniel ("não é algo voltado para devs, mas sim donos
> de empresas, gestores... traga dados... não cite coisas como arquitetura, banco de dados") e atualizado na v4, depois
> de "contabilidade foi apenas um exemplo, não era pra focar nisso somente. tem que ser algo abrangente". Itens
> **[em aberto]** precisam de confirmação dele.

## Platform

web

## Stack

Astro com saída estática, CSS próprio com tokens, sem framework de UI. JavaScript pequeno e sem biblioteca: menu, seção
atual, contadores, calculadora e cópia de e-mail; todo o conteúdo aparece sem script. Servido por nginx em contêiner.

## Users

Donos e gestores de pequenas e médias empresas brasileiras de qualquer ramo, sem um setor em primeiro plano: clínicas e
consultórios, lojas e varejo, escritórios de contabilidade e de advocacia, indústrias, distribuidoras, imobiliárias,
escolas e cursos, transportadoras, agro, e-commerce e agências. Têm trabalho manual repetido, planilhas, WhatsApp desorganizado, retrabalho, prazos perdidos, dado digitado duas vezes e
clientes pedindo status; querem crescer sem contratar na mesma proporção. Não são técnicos e não querem ouvir sobre
tecnologia: querem saber o que muda na rotina, quanto tempo volta, se é seguro e como começar.

## Product Purpose

Site da Noxlabs (noxlabs.tech), de Daniel Harrison. Vende automações de rotina, atendimento e WhatsApp com IA, sistemas
sob medida, integrações, painéis para o dono e diagnóstico de processos. Sucesso: um dono ou gestor manda um e-mail
descrevendo a rotina e marca a conversa de 30 minutos.

## Positioning

Ver `BRAND.md`. Em uma linha: menos trabalho repetitivo, mais tempo para o que faz a empresa crescer, em qualquer ramo;
quem conversa com você é quem constrói, começando pelo que a empresa já usa, uma rotina de cada vez.

## Operating Context

- Contato por e-mail (daniel.harrisonlf@gmail.com), com assunto e roteiro pré-preenchidos e botão de copiar.
- **[em aberto]** WhatsApp comercial: não existe número nos dados. `src/data/site.ts` → `whatsapp: null`; ao preencher
  (só dígitos com DDI e DDD), o botão "Chamar no WhatsApp" aparece no contato.
- **[em aberto]** Agenda: não existe link (Cal.com ou similar). `scheduleUrl: null`; ao preencher, aparece "Escolher
  horário na agenda".
- **[em aberto]** E-mail no domínio (por exemplo contato@noxlabs.tech): hoje o site usa o Gmail.
- **[em aberto]** Se a conversa inicial de 30 minutos é gratuita: o site não promete.
- **[em aberto]** Compromissos de trabalho que o site descreve como intenção ("a intenção é", "combinado na proposta")
  e que o Daniel precisa confirmar: contas, acessos e documentação no nome do cliente; acompanhamento no começo;
  fornecedores de IA com contrato de tratamento de dados; seguir cuidando do sistema depois da entrega. Sobre LGPD, o
  site diz que ela "entra no desenho desde a primeira conversa" e que a responsabilidade legal é da empresa cliente; não
  diz "conforme a LGPD".
- FinFlow (finanças pessoais) saiu da vitrine de projetos, por não ser voltado a empresas.
- Links: portfólio https://danielharrison.noxlabs.tech, blog https://blog.noxlabs.tech, Kairos https://kairos.noxlabs.tech,
  LinkedIn /in/danielharrison-/. GitHub só no JSON-LD da pessoa e nos rodapés técnicos. Blog e portfólio também no menu do
  celular, separados das seções.

## Capabilities and Constraints

Ofertas (escopo sob proposta, sem preço publicado): automação de rotinas, atendimento e WhatsApp com IA, sistemas sob
medida, integração do que a empresa já usa, painéis para o dono, diagnóstico de processos.

Processo: conversa de 30 min → diagnóstico da rotina → proposta por escrito → primeira rotina em uso, uma de cada vez.

Ramos mostrados com o mesmo peso: os nove ramos do topo (loja, indústria, clínica, agro, escola, transportadora,
imobiliária, distribuidora, e-commerce) mais a peça "E o seu ramo?", e o seletor "Como funcionaria na sua empresa" com
seis cenários (loja, indústria e distribuidora, clínica, imobiliária, escola e cursos, escritório e serviços), em
`src/data/sectors.ts`. As conversas dos cenários são de exemplo, com nomes fictícios, e o site diz isso. A antiga página
`/contabilidade/` saiu; o nginx redireciona para o seletor.

## Brand Commitments

- Nome Noxlabs, domínio noxlabs.tech. Português do Brasil.
- Sem tecnês no caminho principal. Detalhe técnico só no rodapé recolhido das páginas de caso. `scripts/check-page.mjs`
  falha se um termo técnico aparecer fora dele.
- Sem clientes, depoimentos, logos, métricas ou preços inventados. Dados de mercado nunca apresentados como resultado da
  Noxlabs.
- Todo número com fonte e ano na própria tela, e registrado abaixo com URL e citação literal.

## Evidence on Hand

- Kairos (produto próprio no ar, repositório público `axial`), ClinicFlow (público, com landing), WhatsApp Control Center
  (público). FinFlow, Omni CRM AI (no site, "Omni, atendimento e vendas com IA"), controle de pátio e monitoramento de câmeras são privados: descritos, nunca linkados.
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
- `public/img/whatsapp-editor*.webp` e `whatsapp-celular.webp`: recortes da captura do frontend real do WhatsApp Control
  Center (conta de demonstração), sem o menu lateral e a barra de ferramentas, que mostravam termos de desenvolvedor.
  A captura inteira saiu do repositório.
- `public/img/clinicflow-consultas.webp`: recorte legível da tabela "Consultas de hoje" de `clinicflow-painel.webp`.
- `public/og.png`, `favicon.svg`, `favicon.ico` e ícones PNG: desenhados neste projeto e gerados por
  `scripts/og-image.mjs`.
- Pictogramas de ramo (`src/data/illustrations.ts`): desenhados à mão em SVG para o site; nenhum gerado por IA.
- Telas de exemplo do topo, das ofertas e dos cenários: HTML do próprio site, com nomes e números fictícios, rotuladas
  como exemplo.

## Dados de mercado usados no site

Definidos em `src/data/stats.ts`; cada um aparece com "Fonte:", título, ano de publicação e link. Escolhidos para valer
para qualquer ramo e para o Brasil: três números de pesquisas do Sebrae de 2026 com donos de pequenos negócios. Dados de
um setor só ficariam dentro do exemplo daquele setor; hoje nenhum é usado.

| Id | Número no site | Fonte e ano | URL | Citação literal | Ressalva exibida | Conferido |
| --- | --- | --- | --- | --- | --- | --- |
| `sebrae-whatsapp` | 8 em 10 | Sebrae, Pesquisa Pulso dos Pequenos Negócios, 12ª edição, Agência Sebrae em 16/04/2026 (mais de 8,2 mil empreendedores, fev.–mar. 2026) | https://agenciasebrae.com.br/dados/whatsapp-se-consolida-nas-vendas-on-line-enquanto-facebook-e-lojas-proprias-perdem-folego/ | "Oito em cada dez donos de pequenos negócios apontam que o WhatsApp é o seu principal canal de comunicação e de vendas." | "Mais de 8,2 mil empreendedores, fevereiro e março de 2026." | 20/11/2026 |
| `sebrae-ia` | 52% | Sebrae com Meta Instituto de Pesquisa, "Transformação Digital nos Pequenos Negócios", Agência Sebrae em 17/08/2026 (7.182 entrevistas com MEI, ME e EPP, de 24/03 a 08/05) | https://agenciasebrae.com.br/dados/pequenos-negocios-do-brasil-usam-mais-ia-que-os-norte-americanos-aponta-sebrae/ | "Segundo o levantamento, 52% dos empreendedores brasileiros de pequenos negócios usaram IA em suas atividades nas duas semanas anteriores à entrevista da pesquisa, contra apenas 21% registrados pela pesquisa equivalente do U.S. Census Bureau (BTOS), dos EUA." | "7.182 entrevistas, de março a maio de 2026. Usar não é o mesmo que ter IA na rotina." | 20/11/2026 |
| `sebrae-ia-intencao` | 60% | idem | idem | "O interesse no uso de IA também é forte: 60% dos empresários brasileiros pretendem adotar ou ampliar o uso de IA no próximo semestre, enquanto o índice de intenção de uso entre os norte-americanos é de apenas 24%." | "Mesma pesquisa. Intenção declarada, não uso medido." | 20/11/2026 |

### Retirados na revisão da v4

- Microsoft, Work Trend Index 2025 ("80% of the global workforce [...] lacking enough time or energy"): verificado, mas
  global; a frase "Brasil incluído" que o site exibia não está na citação registrada. Retirado.
- McKinsey, "The economic potential of generative AI" (60 a 70%): global e, na v4, a página não abriu para nova
  conferência. Retirado.

### Verificados e guardados para uso futuro

- Sebrae, mesma pesquisa de `sebrae-ia`: "No mercado brasileiro, 46% dos negócios precisaram desenvolver novos fluxos de
  trabalho para incorporar essas ferramentas."
- Cetic.br, TIC Empresas 2025 (empresas com 10 ou mais pessoas ocupadas, 4.174 respondentes, campo de fev./2025 a
  jan./2026, resultados de 15/06/2026), resumo executivo
  https://cetic.br/media/docs/publicacoes/2/pt-br/20260831091252/TIC_EMPRESAS_2025_PT_RE.pdf : "Em 2025, a pesquisa TIC
  Empresas apontou um aumento no uso de aplicações de IA nas empresas brasileiras: 17% afirmaram utilizá-las, proporção
  que foi de 13% em 2024." e "Das empresas que venderam pela Internet, 79% utilizaram o WhatsApp ou o Telegram." (texto
  em colunas, conferir no PDF renderizado). O dado de ERP (58% não usam; 62% entre 10 e 49 pessoas) é valor de tabela do
  indicador G2 (https://cetic.br/pt/tics/pesquisa/2025/empresas/G2/), não frase: citar como tabela.
- Sebrae com FGV Ibre e Google, Agência Sebrae em 22/01/2026
  (https://agenciasebrae.com.br/dados/pequenos-negocios-abracam-a-inteligencia-artificial-para-otimizar-o-tempo-e-inovar/):
  "Já o uso frequente dessas ferramentas está em 35% entre médias e grandes, 15% entre as MPEs". Google foi parceiro.

### Retirados na v4 (dados de um setor só)

Saíram com a página de contabilidade e o bloco de contabilidade da página inicial, porque a v4 não tem um setor em
primeiro plano. Continuam verificados (citações literais na v3, commit `8c6cf25`): CFC, Relato Integrado 2025 (101.880
organizações contábeis; 539 mil profissionais); IOB com CFC e Fenacon (34% citam retrabalho manual; 78% usam IA toda
semana); IBPT (569.469 normas tributárias desde 1988); Thomson Reuters, Future of Professionals 2025 (5 h por semana).

### Pesquisados e não usados

- Nu Empresas com Bridge Research, "9 horas por semana com burocracia" (out./2026): encomendada por fintech; só vista em
  notícias, sem página primária nem método.
- Conta Simples com Visa, "21 horas semanais": de fornecedor e não comparável.
- Banco Mundial, Doing Business (1.501 horas por ano com impostos): dados de 2019, série descontinuada.
- Sebrae Pulso 13ª edição ("51% usam IA em marketing") e números estaduais do Sebrae: página primária não aberta.
- IBGE Pintec e CNI sobre IA: só indústria, puxados para empresas grandes.
- FGV EAESP, Pesquisa Anual de TI ("80% declararam utilizar IA, mas 75% admitem que o uso ainda é limitado"): só médias e
  grandes empresas.
- Expectativa de tempo de resposta no Brasil: só material de fornecedores de chatbot, sem método. "90% esperam resposta
  em 10 minutos" é distorção de uma pesquisa da HubSpot de 2018.
- Salesforce, State of the Connected Customer: Brasil fora da amostra.

## Estimativa de horas liberadas

`src/data/estimator.ts`. Apresentada como uma frase para completar. Valores iniciais: 6 pessoas, 6 h/semana cada,
R$ 3.500 de custo mensal, 30% automatizável (43 horas por mês).
Premissas visíveis abaixo da calculadora: 4 semanas por mês (abaixo das 4,3 do calendário); custo da hora = custo
mensal ÷ 220 (divisor da CLT para 44 h semanais, que deixa a hora mais barata); tempo integral = horas ÷ 176 (44 h nas
mesmas 4 semanas). O custo aceita o formato brasileiro (4.000 ou 4.000,50); valor inválido mostra um aviso e mantém a
última conta válida. A parte automatizável é hipótese do
visitante, de 10% a 60%, começando em 30% para não exagerar. Rotulada como estimativa
ilustrativa; o texto diz que horas liberadas viram capacidade, não economia automática de salário. Nada é enviado: a
conta roda no navegador, e o botão monta um e-mail com os números.

## Product Principles

1. Fale da rotina e do ganho, não da tecnologia. Exemplos de vários ramos, nenhum em primeiro plano.
2. Prova antes de promessa: dado com fonte, sistema que existe, ganho qualitativo quando não há medição.
3. Começa pelo que o cliente já usa, uma rotina de cada vez.
4. Pessoa no controle: a automação prepara, a equipe confere o que importa, tudo fica registrado.
5. LGPD no desenho, explicada em português.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, teclado, foco visível, alvos de 44 px (48 px no menu do celular), `prefers-reduced-motion`,
conteúdo completo sem JavaScript, 320 a 2560 px. O celular é a experiência principal (ver `DESIGN.md`, "Celular").
