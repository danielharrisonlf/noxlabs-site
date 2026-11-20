/**
 * Soluções, contadas pela rotina que mudam e não pela tecnologia.
 * Sem preço publicado: escopo e valor saem da proposta.
 */
import type { IconName } from "./icons";

export type Solution = {
  id: string;
  icon: IconName;
  title: string;
  /** Uma frase: o que muda para quem trabalha. */
  promise: string;
  /** Exemplos concretos de rotina. */
  examples: string[];
};

export const solutions: Solution[] = [
  {
    id: "rotinas",
    icon: "repeat",
    title: "Automação de rotinas",
    promise:
      "O que a equipe faz igual toda semana passa a acontecer sozinho, e as pessoas só olham o que saiu do padrão.",
    examples: [
      "Conciliação de extratos",
      "Cobrança e lembretes de pagamento",
      "Envio de documentos e guias",
      "Organização de notas fiscais",
      "Lembretes de prazos",
    ],
  },
  {
    id: "atendimento",
    icon: "chat",
    title: "Atendimento e WhatsApp com IA",
    promise:
      "Um assistente responde as perguntas de sempre, pede o que falta, informa o andamento e chama uma pessoa quando o assunto pede.",
    examples: ["Triagem de mensagens", "Respostas às dúvidas frequentes", "Coleta de documentos", "Status para o cliente"],
  },
  {
    id: "sistemas",
    icon: "layout",
    title: "Sistemas sob medida",
    promise: "Quando a planilha não dá mais conta, um sistema feito do jeito que a sua empresa trabalha.",
    examples: ["Portal do cliente", "Controle de processos e demandas", "Agenda e cadastro", "Ordens de serviço"],
  },
  {
    id: "integracoes",
    icon: "link",
    title: "Integração do que você já usa",
    promise:
      "A informação é digitada uma vez e aparece onde precisa: no sistema de gestão, no contábil, na planilha, no e-mail.",
    examples: ["Sistema de gestão", "Sistema contábil", "Planilhas", "Bancos", "E-mail"],
  },
  {
    id: "paineis",
    icon: "chart",
    title: "Painéis para o dono",
    promise: "O que está atrasado, quem está com o quê e como o mês está indo, numa tela, sem precisar perguntar.",
    examples: ["Prazos por cliente", "Produtividade da equipe", "Recebimentos e pendências", "Relatório semanal automático"],
  },
  {
    id: "diagnostico",
    icon: "search",
    title: "Diagnóstico de processos",
    promise:
      "Antes de construir qualquer coisa: onde vai o tempo da equipe, o que vale automatizar primeiro e o que não vale.",
    examples: ["Mapa da rotina atual", "Lista de prioridades", "Estimativa de ganho por etapa"],
  },
];
