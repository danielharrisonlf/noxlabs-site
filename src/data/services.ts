/**
 * Ofertas, apresentadas a partir do problema de quem chega.
 * Sem preço publicado: escopo e valor saem da proposta.
 * `proof` aponta para algo que já existe e pode ser aberto.
 */
export type Service = {
  id: string;
  /** O problema, na voz de quem tem: vira o rótulo do seletor e o assunto do e-mail. */
  problem: string;
  /** Versão curta do problema para os chips do celular. */
  short: string;
  title: string;
  when: string;
  deliver: string[];
  outcome: string;
  proof: { text: string; label: string; href: string };
};

export const services: Service[] = [
  {
    id: "ia",
    short: "Tarefas que uma IA faria",
    problem: "Minha equipe repete tarefas que uma IA faria",
    title: "IA dentro do produto e da operação",
    when: "Sua equipe repete tarefas que um modelo faria com supervisão, ou seus clientes já esperam um assistente que conheça os dados da empresa.",
    deliver: [
      "Assistentes ligados aos seus dados e documentos",
      "Agentes que operam seus sistemas via MCP, com as permissões de cada usuário",
      "Fluxos com LLM com validação de saída, registro e aprovação humana onde o erro custa caro",
    ],
    outcome: "A IA age dentro das regras do seu sistema e deixa rastro do que fez.",
    proof: {
      text: "No Kairos, um agente cria tarefas e consulta a auditoria com o token do próprio usuário.",
      label: "Ver o caso Kairos",
      href: "/casos/kairos/",
    },
  },
  {
    id: "mvp",
    short: "Tirar do papel",
    problem: "Preciso tirar um produto ou processo do papel",
    title: "Software sob medida e MVP",
    when: "Você tem um processo rodando em planilha e WhatsApp, ou uma ideia de produto que precisa sair do papel sem virar dívida técnica.",
    deliver: [
      "Aplicações web, apps mobile e APIs",
      "Painel administrativo, permissões por papel e multiempresa quando o negócio pede",
      "Testes, deploy e documentação desde a primeira entrega",
    ],
    outcome: "Uma primeira versão em uso cedo, com escopo cortado ao essencial e base para crescer.",
    proof: {
      text: "O ClinicFlow leva a operação de uma clínica da agenda ao retorno, com o ciclo da consulta coberto por testes.",
      label: "Ver o caso ClinicFlow",
      href: "/casos/clinicflow/",
    },
  },
  {
    id: "arquitetura",
    short: "Sistema lento e frágil",
    problem: "O sistema ficou lento e cada mudança quebra outra coisa",
    title: "Arquitetura e modernização",
    when: "O sistema ficou lento, cada mudança quebra outra coisa, ou ninguém mais sabe explicar como ele funciona.",
    deliver: [
      "Diagnóstico de arquitetura com gargalos medidos, não adivinhados",
      "Serviços separados quando compensa, monólito modular quando não",
      "Eventos com outbox, filas, observabilidade e testes de carga",
    ],
    outcome: "Um plano de mudança em ordem de risco, e a execução se você quiser.",
    proof: {
      text: "No Kairos, ligar o keep-alive no gateway levou o p50 de 1,9 s para 27 ms num A/B local com o mesmo código.",
      label: "Ver a medição no caso",
      href: "/casos/kairos/",
    },
  },
  {
    id: "integracoes",
    short: "Trabalho manual repetido",
    problem: "Dados digitados duas vezes, mensagens disparadas à mão",
    title: "Automação e integrações",
    when: "Dados digitados duas vezes, mensagens disparadas à mão, CRM que ninguém atualiza.",
    deliver: [
      "WhatsApp Cloud API: templates, mensagens, webhooks e diagnóstico",
      "Integrações com CRMs, e-mail, filas e sistemas legados",
      "Ferramentas internas sob medida para a sua operação",
    ],
    outcome: "Menos trabalho manual, e falhas que aparecem em vez de sumirem em silêncio.",
    proof: {
      text: "O WhatsApp Control Center opera a Cloud API inteira num painel e diz o que está errado na integração.",
      label: "Ver o caso WhatsApp",
      href: "/casos/whatsapp-control-center/",
    },
  },
  {
    id: "cto",
    short: "Sem CTO",
    problem: "Não tenho CTO, ou meu time precisa de direção",
    title: "Consultoria técnica e CTO fracionado",
    when: "Você não tem CTO, ou tem um time pequeno que precisa de direção, revisão e ajuda para contratar.",
    deliver: [
      "Revisão de arquitetura e de código",
      "Roadmap técnico e avaliação de fornecedores",
      "Apoio em contratação e acompanhamento do time",
    ],
    outcome: "Decisões técnicas com custo e risco escritos, que o sócio não técnico também entende.",
    proof: {
      text: "As decisões de arquitetura do Kairos, e os limites delas, estão escritas no repositório público.",
      label: "Ler no GitHub",
      href: "https://github.com/danielharrisonlf/axial",
    },
  },
  {
    id: "infra",
    short: "Conta de nuvem alta",
    problem: "A conta da nuvem cresce mais rápido que o uso",
    title: "Infraestrutura e custo de nuvem",
    when: "A fatura da nuvem cresce mais rápido que o uso, e boa parte dela paga serviços gerenciados que você não precisa.",
    deliver: [
      "Migração para VPS com Docker e Dokploy, HTTPS e deploy por Git",
      "Backups, migrations seguras e monitoramento",
      "Uma análise honesta de onde a nuvem gerenciada ainda vale o preço",
    ],
    outcome: "Custo previsível, sem abrir mão de HTTPS, backup e deploy automático.",
    proof: {
      text: "O Kairos inteiro, com sete serviços, PostgreSQL e Redis, roda numa única VPS com Dokploy.",
      label: "Ver o caso Kairos",
      href: "/casos/kairos/",
    },
  },
];
