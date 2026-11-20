# Product

<!-- impeccable:product-schema 1 -->

> Registro escrito a partir do brief do pedido original, sem rodada de entrevista: esta sessão
> rodou como subagente, sem ferramenta de pergunta estruturada. Itens marcados **[inferido]** e
> **[em aberto]** precisam de confirmação do Daniel.

## Platform

web

## Stack

Delegado: Astro 5 com saída estática, CSS próprio com tokens, sem framework de UI e sem JS além do
toggle de tema e do menu mobile. Escolhido porque o site é conteúdo estático, precisa de Lighthouse
95+ e de páginas de case geradas a partir dos mesmos dados. Servido por nginx em contêiner.

## Users

Decisores em empresas brasileiras: founders, CTOs, líderes de operação e de produto. Chegam por
indicação, LinkedIn, GitHub ou pelo produto Kairos. Querem saber em poucos minutos se a Noxlabs
resolve o problema deles (um MVP, uma integração de IA, um sistema que precisa ser modernizado, uma
conta de nuvem alta), se o trabalho é sério e como começar uma conversa.

## Product Purpose

Site institucional da Noxlabs, consultoria de software e IA de Daniel Harrison (noxlabs.tech).
Vende Daniel como especialista e os serviços da Noxlabs. Sucesso: um decisor qualificado agenda o
diagnóstico de 30 minutos ou manda um e-mail descrevendo o problema.

## Positioning

Uma consultoria de uma pessoa sênior que constrói e opera o que vende: o Kairos, plataforma de
gestão de projetos com microsserviços, OAuth 2.1 e servidor MCP, roda em produção em
kairos.noxlabs.tech, numa VPS com Dokploy. O cliente fala direto com quem desenha e escreve o código.

## Operating Context

- Contato por e-mail (daniel.harrisonlf@gmail.com). Sem WhatsApp no site.
- Links reais: portfólio https://danielharrison.noxlabs.tech, blog https://blog.noxlabs.tech,
  Kairos https://kairos.noxlabs.tech, GitHub danielharrisonlf, LinkedIn /in/danielharrison-/.
- Agendamento: **[em aberto]** não existe link de agenda (Cal.com ou similar); o site usa e-mail
  com assunto pré-preenchido e deixa o ponto marcado no código.

## Capabilities and Constraints

Ofertas (escopo sob proposta, sem preço publicado):

- IA aplicada a produtos e operações (assistentes, agentes via MCP, fluxos com LLM e guardrails).
- Software sob medida e MVP (web, mobile, APIs).
- Arquitetura e modernização (microsserviços, eventos, observabilidade, desempenho).
- Automação e integrações (WhatsApp Cloud API, CRMs, ferramentas internas).
- Consultoria técnica / CTO fracionado.
- DevOps e self-hosting para reduzir custo de nuvem (VPS + Dokploy).

Processo: diagnóstico → proposta → entregas incrementais → operação.

## Brand Commitments

- Nome: Noxlabs. Domínio noxlabs.tech. **[inferido]** grafia "Noxlabs" (sem camel case).
- Idioma: português do Brasil. Tom direto, técnico sem jargão gratuito, honesto sobre limites
  (o mesmo do portfólio do Daniel: "gosto de construir e de entrar na decisão do produto").
- Sem logos de clientes, depoimentos, métricas de negócio ou clientes inventados.

## Evidence on Hand

- Kairos (repo público `axial`): microsserviços NestJS (projects, identity com OAuth 2.1,
  notifications, audit, realtime), gateway, PostgreSQL, Redis/BullMQ, outbox transacional, Workspace
  React e micro-frontend Vue de Insights, servidor MCP com 49 ferramentas. Medições reais no
  relatório de desempenho do repositório (A/B do keep-alive do gateway).
- ClinicFlow (público), WhatsApp Control Center (público), Mapbox Vision (público), PC Remote
  (desktop e Android, públicos), Fio/linkanban (público), GymPass API (público).
- FinFlow, Omni CRM AI e gestão de pátio são privados: podem ser descritos, nunca linkados.
- Experiência profissional anterior: não citar nomes de empregadores no site.
- Ausentes: depoimentos, clientes nomeáveis, métricas de negócio, preços. Não fabricar.

## Product Principles

1. Prova antes de promessa: cada afirmação aponta para código, produto no ar ou medição.
2. O cliente é dono do código, da infraestrutura e da documentação.
3. Entregas pequenas e frequentes, com comunicação semanal por escrito.
4. IA com fronteira clara: permissões, dados sensíveis e LGPD tratados no desenho, não depois.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste, teclado, foco visível, `prefers-reduced-motion`, 360 a 1920 px.
