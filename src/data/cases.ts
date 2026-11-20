/**
 * O que já construí. Todos são sistemas feitos pelo Daniel; nenhum cliente,
 * métrica de negócio ou depoimento é inventado. Os ganhos são qualitativos:
 * descrevem o que o sistema muda na rotina, não números medidos em cliente.
 * O detalhe técnico fica só no rodapé das páginas de caso (`tech`).
 * Fontes: READMEs dos repositórios e PRODUCT.md (Evidence on Hand).
 */
import type { IconName } from "./icons";

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
  /** Uma linha, em linguagem de negócio. */
  summary: string;
  /** Situação, sem inflar: produto próprio, no ar ou não. */
  status: string;
  icon: IconName;
  /** Para quem esse tipo de sistema serve. */
  fits: string[];
  problem: string;
  /** O problema numa frase, para o cartão da página inicial. */
  hook: string;
  does: string[];
  gains: string[];
  image?: CaseImage;
  /** Links opcionais e secundários. */
  links: CaseLink[];
  /** Rodapé técnico, recolhido, para quem quiser. */
  tech: string[];
};

export const clinicflow: CaseStudy = {
  slug: "clinicflow",
  name: "ClinicFlow",
  summary: "A rotina de uma clínica num lugar só: agenda, recepção, sala de espera e retornos.",
  status: "Produto próprio, com versão de demonstração",
  icon: "health",
  fits: ["Clínicas e consultórios", "Qualquer negócio que vive de agenda"],
  problem:
    "Numa clínica pequena, a recepção divide a atenção entre agenda, telefone, WhatsApp e planilha. Consulta que atrasa, paciente esperando sem ninguém saber há quanto tempo e retorno esquecido viram receita perdida e paciente mal atendido.",
  hook: "A recepção dividida entre agenda, telefone, WhatsApp e planilha, e o retorno que alguém esquece.",
  does: [
    "Mostra o dia inteiro numa tela: cada consulta, em que pé está e qual é o próximo passo da recepção.",
    "Organiza a agenda de vários profissionais e impede marcar dois pacientes no mesmo horário.",
    "Exibe a sala de espera com o tempo de espera de cada paciente e um painel de chamada.",
    "Guarda os documentos do paciente e cria tarefas de retorno com data, para ninguém esquecer.",
  ],
  gains: [
    "A recepção sabe o que fazer a seguir sem procurar em três lugares.",
    "Atraso e espera ficam visíveis enquanto ainda dá para resolver.",
    "Retorno vira tarefa com data, não lembrança de alguém.",
  ],
  image: {
    src: "/img/clinicflow-painel.webp",
    width: 1440,
    height: 1000,
    alt: "Painel do dia do ClinicFlow: lista de consultas com horário, paciente, estado e botão do próximo passo; à direita, contadores, próxima chegada, sala de espera e retornos que vencem hoje.",
    caption: "Painel do dia, com dados de demonstração.",
  },
  links: [{ label: "Ver a página do produto", href: "https://clinicflow-landing-orcin.vercel.app" }],
  tech: [
    "Aplicação web com API em NestJS 11 e interface em React 19, num monorepo pnpm e Turborepo.",
    "Banco PostgreSQL 16 com Prisma; Redis para filas; armazenamento de arquivos compatível com S3.",
    "O ciclo da consulta é uma máquina de estados isolada e coberta por testes automatizados.",
    "Código público em github.com/danielharrisonlf/clinicflow.",
  ],
};

export const whatsapp: CaseStudy = {
  slug: "whatsapp-control-center",
  name: "WhatsApp Control Center",
  summary: "Um painel para a empresa cuidar do WhatsApp oficial: números, mensagens prontas, envios e problemas.",
  status: "Produto próprio",
  icon: "chat",
  fits: ["Empresas que atendem e vendem pelo WhatsApp", "Escritórios que enviam avisos e guias em volume"],
  problem:
    "Quem usa o WhatsApp oficial da Meta para atender ou avisar clientes trabalha espalhado: números, perfil da empresa, modelos de mensagem e configurações ficam em telas diferentes, e quando algo falha a mensagem de erro raramente diz o que fazer.",
  hook: "Números, mensagens prontas e configurações do WhatsApp oficial espalhados, e erros que não dizem o que fazer.",
  does: [
    "Reúne num painel só os números da empresa, o perfil comercial, os modelos de mensagem e o histórico de envios.",
    "Tem um editor de modelos de mensagem com a prévia de como ela chega no celular do cliente.",
    "Aponta o que está errado quando um envio falha, em vez de um código de erro.",
    "Controla quem pode fazer o quê, por empresa e por função.",
  ],
  gains: [
    "Quem cuida do atendimento resolve sozinho o que antes dependia de alguém técnico.",
    "Mensagens padronizadas, revisadas antes de sair.",
    "Problema de envio aparece com a causa, não some em silêncio.",
  ],
  image: {
    src: "/img/whatsapp-control-center.webp",
    width: 1440,
    height: 960,
    alt: "Editor de modelo de mensagem do WhatsApp Control Center: formulário com conta, idioma, nome e categoria à esquerda, e prévia da mensagem num celular à direita.",
    caption: "Editor de modelos de mensagem com prévia, em conta de demonstração.",
  },
  links: [],
  tech: [
    "Construído sobre a API oficial do WhatsApp (Meta Graph API). Nada é simulado: o que a Meta não permite pela API, o painel diz e aponta onde fazer.",
    "API em NestJS 11 com Prisma e PostgreSQL; interface em React 19.",
    "Credenciais da Meta guardadas criptografadas; interface em português e inglês.",
    "Código público em github.com/danielharrisonlf/whatsapp-control-center.",
  ],
};

export const kairos: CaseStudy = {
  slug: "kairos",
  name: "Kairos",
  summary: "Gestão de projetos e equipes para várias empresas, com assistentes de IA que trabalham com as permissões de cada pessoa.",
  status: "Produto próprio, no ar",
  icon: "users",
  fits: ["Empresas com equipes e demandas para acompanhar", "Quem quer usar IA sem dar acesso total a ela"],
  problem:
    "Ferramentas de gestão guardam o trabalho da equipe, mas quando um assistente de IA entra nelas costuma ganhar acesso a tudo, sem saber quem está pedindo nem o que essa pessoa pode fazer. O desafio era um sistema para várias empresas em que pessoas e assistentes trabalham nos mesmos dados, com as mesmas regras.",
  hook: "Assistente de IA que entra na ferramenta da empresa com acesso a tudo, sem saber quem está pedindo.",
  does: [
    "Organiza projetos, tarefas e equipes de várias empresas, cada uma vendo só o que é dela.",
    "Cadastro de empresas, convite por link e permissões por empresa, equipe e projeto.",
    "Deixa a pessoa pedir ao assistente de IA (Claude, ChatGPT e outros) para criar tarefas ou consultar o andamento, e o assistente só faz o que aquela pessoa poderia fazer.",
    "Guarda um histórico de cada alteração que ninguém consegue apagar.",
  ],
  gains: [
    "IA útil no dia a dia sem abrir mão do controle de quem vê o quê.",
    "Histórico confiável para saber quem mudou o quê, inclusive o assistente.",
    "Funciona em produção, com cadastro aberto de empresas.",
  ],
  links: [{ label: "Abrir o Kairos", href: "https://kairos.noxlabs.tech" }],
  tech: [
    "Serviços em NestJS, cada um com o próprio banco PostgreSQL, atrás de um gateway; filas com Redis.",
    "Login com OAuth 2.1; os assistentes de IA entram por um servidor MCP com o login do próprio usuário.",
    "Cada alteração e o evento correspondente são gravados juntos (outbox transacional); trilha de auditoria que o banco não deixa editar.",
    "Hospedado numa VPS com Dokploy. Código público em github.com/danielharrisonlf/axial.",
  ],
};

/** Sistemas sem página própria, listados na seção de casos. */
export type CaseEntry = {
  name: string;
  icon: IconName;
  summary: string;
  status: string;
};

export const moreCases: CaseEntry[] = [
  {
    name: "Omni CRM AI",
    icon: "chat",
    summary: "Atendimento e vendas de vários canais num lugar só, com IA ajudando a responder e a organizar os contatos.",
    status: "Projeto privado",
  },
  {
    name: "FinFlow",
    icon: "chart",
    summary: "Finanças pessoais com um assistente de IA, acessíveis pela web e também pelo Telegram.",
    status: "Projeto privado",
  },
  {
    name: "Controle de pátio de veículos",
    icon: "truck",
    summary: "Remoção, chegada, entrada, autorização e entrega de veículos, com cada etapa registrada.",
    status: "Primeira versão",
  },
  {
    name: "Monitoramento de câmeras",
    icon: "eye",
    summary: "Cadastro de câmeras e visualização remota em mosaico, para acompanhar vários locais de uma tela.",
    status: "Projeto privado",
  },
];

export const detailCases = [clinicflow, whatsapp, kairos];
