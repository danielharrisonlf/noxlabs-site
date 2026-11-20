/**
 * Casos. Todos são sistemas que o Daniel construiu; nenhum cliente,
 * métrica de negócio ou depoimento é inventado. Quando o resultado é
 * qualitativo, o texto diz isso. Só repositórios públicos recebem link.
 */
export type CaseLink = { label: string; href: string };

export type CaseImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

/** Variações 720 e 1080 px geradas ao lado da original (mesma origem, ver PRODUCT.md). */
export function srcset(src: string, width: number) {
  const base = src.replace(/\.webp$/, "");
  return `${base}-720.webp 720w, ${base}-1080.webp 1080w, ${src} ${width}w`;
}

export type CaseStudy = {
  slug: string;
  name: string;
  /** Uma linha: o que é, em linguagem de negócio. */
  summary: string;
  status: { label: string; live: boolean };
  links: CaseLink[];
  problem: string;
  built: string[];
  architecture?: string[];
  outcome: string[];
  limits?: string[];
  stack: string[];
  image?: CaseImage;
  /** Tem página própria em /casos/<slug>/ */
  detail: boolean;
  /** Serviço da Noxlabs que o caso comprova. */
  proves: string;
};

export const kairos: CaseStudy = {
  slug: "kairos",
  name: "Kairos",
  summary: "Gestão de projetos multiempresa operada por pessoas e por agentes de IA, com as mesmas permissões.",
  status: { label: "No ar em kairos.noxlabs.tech", live: true },
  links: [
    { label: "Abrir o Kairos", href: "https://kairos.noxlabs.tech" },
    { label: "Código no GitHub", href: "https://github.com/danielharrisonlf/axial" },
  ],
  problem:
    "Ferramentas de gestão guardam o trabalho do time, mas agentes de IA costumam entrar nelas por uma chave de acesso total, sem saber quem está pedindo nem o que essa pessoa pode fazer. O desafio era um sistema multiempresa em que pessoas e agentes trabalham nos mesmos dados, com as mesmas regras, sem perder consistência nem histórico.",
  built: [
    "Cinco serviços NestJS com banco próprio cada: projetos, identidade, notificações, auditoria e tempo real, atrás de um gateway.",
    "Identidade com OAuth 2.1: cadastro de empresas, convite por link e papéis por organização, equipe e projeto.",
    "Servidor MCP com 49 ferramentas. Claude, ChatGPT ou Cursor entram com o login do usuário e só fazem o que ele pode fazer.",
    "Outbox transacional: a alteração e o evento gravam na mesma transação, e um relay publica nas filas com nova tentativa.",
    "Auditoria append-only: o banco recusa UPDATE e DELETE na trilha.",
    "Workspace em React e painel de Insights em Vue, carregado como micro-frontend.",
    "Deploy numa VPS com Dokploy: HTTPS, chaves fora da imagem e migrations que barram o deploy quando falham.",
  ],
  architecture: [
    "Cada serviço só acessa o próprio schema no PostgreSQL. Nenhum consulta tabela de outro.",
    "Organização, papel e projetos vêm de um JWT RS256 verificado em todos os serviços. Cabeçalho ou corpo da requisição não elevam acesso.",
    "Escritas concorrentes usam versão do recurso e bloqueio da linha do projeto. É uma escolha conservadora: privilegia consistência.",
    "O relay reivindica eventos com FOR UPDATE SKIP LOCKED, usa o ID do evento como ID do job e não descarta nada em caso de falha.",
  ],
  outcome: [
    "Em produção, com cadastro aberto de empresas e convites.",
    "Medido: num A/B local com o mesmo código, ligar o keep-alive no gateway levou o p50 de GET /projects de 1,9 s para 27 ms e zerou os erros do teste.",
    "Qualitativo: um agente de IA cria tarefas, move cards e consulta a auditoria com o token do próprio usuário, sem credencial compartilhada.",
  ],
  limits: [
    "Não há entrega exactly-once nem ordem global de eventos: os consumidores deduplicam pelo ID.",
    "O bloqueio por projeto pode virar gargalo num projeto com muitas escritas simultâneas.",
    "Aceite do provedor de e-mail ou WhatsApp não comprova entrega ao destinatário.",
  ],
  stack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis", "BullMQ", "React", "Vue", "MCP", "OAuth 2.1", "Docker", "Dokploy"],
  detail: true,
  proves: "IA aplicada, arquitetura e infraestrutura",
};

/**
 * O caminho de um pedido de agente pelo Kairos, na ordem real.
 * Fontes: axial/docs/architecture.md e axial/apps/mcp-server/README.md.
 * O pedido em si é um exemplo ilustrativo; a ferramenta e o escopo existem.
 */
export type FlowStep = {
  id: string;
  title: string;
  text: string;
  detail: string;
};

export const kairosFlow: FlowStep[] = [
  {
    id: "pedido",
    title: "Você pede",
    text: "Você escreve para o seu agente de IA, no Claude, no ChatGPT ou no Cursor: “crie a tarefa Revisar contrato no projeto Onboarding e atribua para mim”.",
    detail: "Exemplo ilustrativo de pedido",
  },
  {
    id: "mcp",
    title: "O agente entra com o seu login",
    text: "O agente não tem senha própria. Ele usa o seu login e recebe só a permissão de que precisa para criar a tarefa.",
    detail: "OAuth 2.1, ferramenta create-task, escopo projects:write",
  },
  {
    id: "projetos",
    title: "Confere quem pediu",
    text: "Antes de mexer em qualquer coisa, o serviço de projetos confere sua empresa, seu papel e o projeto. Se você não pode criar ali, o agente também não pode.",
    detail: "JWT RS256 verificado em cada serviço",
  },
  {
    id: "transacao",
    title: "Grava tudo ou nada",
    text: "A tarefa e o registro do que aconteceu são gravados juntos, ou nenhum dos dois. Duas pessoas mexendo no mesmo projeto ao mesmo tempo não se atropelam.",
    detail: "Outbox transacional, versão do recurso e bloqueio da linha",
  },
  {
    id: "relay",
    title: "O aviso entra na fila",
    text: "Um processo separado leva o registro para a fila de avisos. Se algo falhar no caminho, ele tenta de novo, e nada é descartado.",
    detail: "Relay com FOR UPDATE SKIP LOCKED, Redis e BullMQ",
  },
  {
    id: "consumidores",
    title: "Todo mundo fica sabendo",
    text: "A tela de quem está no projeto atualiza, as pessoas certas recebem o aviso e a auditoria guarda uma trilha que o banco não deixa editar.",
    detail: "Tempo real, notificações e auditoria append-only, sem repetir evento",
  },
];

export const clinicflow: CaseStudy = {
  slug: "clinicflow",
  name: "ClinicFlow",
  summary: "Operação de clínica da agenda ao retorno: recepção, sala de espera, documentos e tarefas de acompanhamento.",
  status: { label: "Código público e landing publicada", live: false },
  links: [
    { label: "Código no GitHub", href: "https://github.com/danielharrisonlf/clinicflow" },
    { label: "Landing do produto", href: "https://clinicflow-landing-orcin.vercel.app" },
  ],
  problem:
    "Numa clínica pequena, a recepção divide a atenção entre agenda, telefone, WhatsApp e planilha. Consulta que atrasa, paciente esperando sem ninguém saber há quanto tempo e retorno esquecido viram receita perdida e paciente mal atendido.",
  built: [
    "Painel do dia com cada consulta, seu estado e o próximo passo da recepção.",
    "Ciclo da consulta, do agendamento à conclusão, como máquina de estados isolada e coberta por testes.",
    "Agenda multiprofissional com verificação de disponibilidade por profissional.",
    "Sala de espera com painel de chamada e tempo de espera visível.",
    "Documentos com armazenamento compatível com S3 e tarefas de retorno com vencimento.",
  ],
  architecture: [
    "Monorepo pnpm e Turborepo com API NestJS 11 e frontend React 19.",
    "Prisma e PostgreSQL 16; Redis para filas e cache; MinIO como armazenamento S3 local.",
    "Testes com Jest, Supertest, Vitest, Testing Library e Playwright.",
  ],
  outcome: [
    "Qualitativo: o fluxo completo da consulta roda de ponta a ponta, com regras de transição cobertas por testes.",
    "Os nomes de pacientes e da clínica nas capturas são dados de demonstração do próprio projeto.",
  ],
  stack: ["React", "NestJS", "Prisma", "PostgreSQL", "Redis", "Tailwind", "Turborepo", "Playwright"],
  image: {
    src: "/img/clinicflow-painel.webp",
    width: 1440,
    height: 1000,
    alt: "Painel do dia do ClinicFlow: lista de consultas com horário, paciente, estado e botão do próximo passo; à direita, contadores, próxima chegada, sala de espera e retornos que vencem hoje.",
    caption: "Painel do dia, com dados de demonstração.",
  },
  detail: true,
  proves: "Software sob medida e MVP",
};

export const whatsapp: CaseStudy = {
  slug: "whatsapp-control-center",
  name: "WhatsApp Control Center",
  summary: "Um painel para operar a WhatsApp Cloud API inteira: contas, números, templates, mensagens e webhooks.",
  status: { label: "Código público", live: false },
  links: [{ label: "Código no GitHub", href: "https://github.com/danielharrisonlf/whatsapp-control-center" }],
  problem:
    "Quem opera WhatsApp pela API oficial da Meta trabalha espalhado: contas, números, perfis, templates e webhooks ficam em telas diferentes, e quando algo falha a mensagem de erro raramente diz o que fazer.",
  built: [
    "Painel único sobre a Graph API oficial da Meta para contas, números, perfil comercial, templates, fluxos, mídia, mensagens e webhooks.",
    "Editor de templates com prévia ao vivo de como a mensagem chega ao cliente.",
    "Diagnóstico que aponta exatamente o que está errado na integração.",
    "Acesso por organização e papel, com credenciais da Meta criptografadas.",
    "Interface em português e inglês, temas claro e escuro.",
  ],
  architecture: [
    "Nada é simulado: quando a Meta não expõe uma operação pela API, a interface diz isso e aponta o WhatsApp Manager.",
    "NestJS 11 com Prisma e PostgreSQL; validação e OpenAPI a partir de schemas Zod.",
    "React 19 com TanStack Query e React Hook Form, em monorepo pnpm e Turborepo.",
  ],
  outcome: [
    "Qualitativo: a operação e o diagnóstico de uma integração WhatsApp ficam num só lugar, com contratos tipados de ponta a ponta.",
    "A captura usa organização e conta de demonstração; nenhuma mensagem real foi enviada para produzi-la.",
  ],
  stack: ["NestJS", "React", "PostgreSQL", "Prisma", "Zod", "TanStack Query", "Meta Graph API"],
  image: {
    src: "/img/whatsapp-control-center.webp",
    width: 1440,
    height: 960,
    alt: "Editor de template do WhatsApp Control Center: formulário com conta, idioma, nome e categoria à esquerda, e prévia da mensagem num celular à direita.",
    caption: "Editor de templates com prévia, em conta de demonstração.",
  },
  detail: true,
  proves: "Automação e integrações",
};

/** Casos sem página própria, listados no índice. */
export type CaseEntry = {
  name: string;
  summary: string;
  stack: string;
  link?: CaseLink;
  visibility: "público" | "privado";
};

export const moreCases: CaseEntry[] = [
  {
    name: "FinFlow",
    summary: "Finanças pessoais com uma API e quatro interfaces: web, linha de comando, servidor MCP para agentes de IA e bot do Telegram.",
    stack: "NestJS, Prisma, React, MCP",
    link: { label: "Landing", href: "https://finflow-landing-umber.vercel.app" },
    visibility: "privado",
  },
  {
    name: "Omni CRM AI",
    summary: "CRM omnichannel B2B: atendimento, contatos, oportunidades e assistência de IA, com dados separados por organização.",
    stack: "NestJS, React, PostgreSQL, Redis",
    visibility: "privado",
  },
  {
    name: "Mapbox Vision",
    summary: "Prova de conceito geoespacial: estações e áreas de cobertura num mapa, consultas espaciais no PostGIS e cruzamento com dados do IBGE.",
    stack: "React, Mapbox GL, NestJS, PostGIS",
    link: { label: "Código", href: "https://github.com/danielharrisonlf/mapbox" },
    visibility: "público",
  },
  {
    name: "PC Remote",
    summary: "Controle do Windows pelo Android na rede local, sem conta e sem nuvem, com pareamento por código e TLS. Código aberto, com releases públicas.",
    stack: "Rust, Tauri 2, Kotlin",
    link: { label: "Código", href: "https://github.com/danielharrisonlf/pc-remote-desktop" },
    visibility: "público",
  },
  {
    name: "Fio",
    summary: "Kanban de candidaturas e follow-ups. A interface web e uma CLI em Go usam a mesma API.",
    stack: "React, ASP.NET Core, PostgreSQL, Go",
    link: { label: "Código", href: "https://github.com/danielharrisonlf/linkanban" },
    visibility: "público",
  },
  {
    name: "GymPass API",
    summary: "API de check-in em academias com regras de negócio testadas: raio de 100 m, um check-in por dia, validação em até 20 minutos.",
    stack: "Fastify, Prisma, Vitest",
    link: { label: "Código", href: "https://github.com/danielharrisonlf/GymPass" },
    visibility: "público",
  },
  {
    name: "Custódia de veículos",
    summary: "MVP de gestão de pátio: remoção, chegada, entrada, autorização e entrega, cada etapa registrada.",
    stack: "NestJS, Prisma, React",
    visibility: "privado",
  },
  {
    name: "Câmeras e streams",
    summary: "Cadastro de câmeras e orquestração de streams com go2rtc para monitoramento remoto em mosaico.",
    stack: "NestJS, go2rtc, RTSP",
    visibility: "privado",
  },
];

export const detailCases = [kairos, clinicflow, whatsapp];
