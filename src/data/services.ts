/**
 * Ofertas. Sem preço publicado: escopo e valor saem da proposta.
 * `glyph` escolhe a composição geométrica desenhada em ServiceGlyph.astro.
 */
export type Service = {
  id: string;
  glyph: "ia" | "mvp" | "arquitetura" | "integracoes" | "cto" | "infra";
  title: string;
  when: string;
  deliver: string[];
  outcome: string;
  format: string;
};

export const services: Service[] = [
  {
    id: "ia",
    glyph: "ia",
    title: "IA dentro do produto e da operação",
    when: "Sua equipe repete tarefas que um modelo faria com supervisão, ou seus clientes já esperam um assistente que conheça os dados da empresa.",
    deliver: [
      "Assistentes ligados aos seus dados e documentos",
      "Agentes que operam seus sistemas via MCP, com as permissões de cada usuário",
      "Fluxos com LLM com validação de saída, registro e aprovação humana onde o erro custa caro",
    ],
    outcome: "A IA age dentro das regras do seu sistema e deixa rastro do que fez.",
    format: "Piloto com escopo curto; depois, projeto por etapas.",
  },
  {
    id: "mvp",
    glyph: "mvp",
    title: "Software sob medida e MVP",
    when: "Você tem um processo rodando em planilha e WhatsApp, ou uma ideia de produto que precisa sair do papel sem virar dívida técnica.",
    deliver: [
      "Aplicações web, apps mobile e APIs",
      "Painel administrativo, permissões por papel e multiempresa quando o negócio pede",
      "Testes, deploy e documentação desde a primeira entrega",
    ],
    outcome: "Uma primeira versão em uso cedo, com escopo cortado ao essencial e base para crescer.",
    format: "Projeto por etapas, cada uma com entrega utilizável.",
  },
  {
    id: "arquitetura",
    glyph: "arquitetura",
    title: "Arquitetura e modernização",
    when: "O sistema ficou lento, cada mudança quebra outra coisa, ou ninguém mais sabe explicar como ele funciona.",
    deliver: [
      "Diagnóstico de arquitetura com gargalos medidos, não adivinhados",
      "Serviços separados quando compensa, monólito modular quando não",
      "Eventos com outbox, filas, observabilidade e testes de carga",
    ],
    outcome: "Um plano de mudança em ordem de risco, e a execução se você quiser.",
    format: "Diagnóstico com plano escrito; execução opcional.",
  },
  {
    id: "integracoes",
    glyph: "integracoes",
    title: "Automação e integrações",
    when: "Dados digitados duas vezes, mensagens disparadas à mão, CRM que ninguém atualiza.",
    deliver: [
      "WhatsApp Cloud API: templates, mensagens, webhooks e diagnóstico",
      "Integrações com CRMs, e-mail, filas e sistemas legados",
      "Ferramentas internas sob medida para a sua operação",
    ],
    outcome: "Menos trabalho manual, e falhas que aparecem em vez de sumirem em silêncio.",
    format: "Projeto fechado por integração.",
  },
  {
    id: "cto",
    glyph: "cto",
    title: "Consultoria técnica e CTO fracionado",
    when: "Você não tem CTO, ou tem um time pequeno que precisa de direção, revisão e ajuda para contratar.",
    deliver: [
      "Revisão de arquitetura e de código",
      "Roadmap técnico e avaliação de fornecedores",
      "Apoio em contratação e acompanhamento do time",
    ],
    outcome: "Decisões técnicas com custo e risco escritos, que o sócio não técnico também entende.",
    format: "Mensal, com horas reservadas.",
  },
  {
    id: "infra",
    glyph: "infra",
    title: "Infraestrutura e custo de nuvem",
    when: "A fatura da nuvem cresce mais rápido que o uso, e boa parte dela paga serviços gerenciados que você não precisa.",
    deliver: [
      "Migração para VPS com Docker e Dokploy, HTTPS e deploy por Git",
      "Backups, migrations seguras e monitoramento",
      "Uma análise honesta de onde a nuvem gerenciada ainda vale o preço",
    ],
    outcome: "Custo previsível. O Kairos inteiro, com sete serviços, PostgreSQL e Redis, roda numa única VPS.",
    format: "Projeto de migração; suporte mensal opcional.",
  },
];
