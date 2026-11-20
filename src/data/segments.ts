/**
 * Segmentos atendidos e a página de contabilidade. Os cenários são
 * ilustrações de como uma automação funcionaria, não casos de clientes.
 */
import type { IconName } from "./icons";

export type Segment = {
  id: string;
  icon: IconName;
  name: string;
  pains: string;
  ideas: string[];
  /** Algo que já construí e que se aplica ao segmento. */
  proof?: { text: string; href?: string };
};

export const segments: Segment[] = [
  {
    id: "clinicas",
    icon: "health",
    name: "Clínicas e consultórios",
    pains: "Recepção dividida entre agenda, telefone e WhatsApp; paciente que falta; retorno esquecido.",
    ideas: ["Confirmação de consulta pelo WhatsApp", "Sala de espera com tempo visível", "Lembrete automático de retorno"],
    proof: { text: "Já construí o ClinicFlow, da agenda ao retorno.", href: "/casos/clinicflow/" },
  },
  {
    id: "advocacia",
    icon: "scale",
    name: "Escritórios de advocacia",
    pains: "Prazos espalhados, documentos pedidos várias vezes, cliente ligando para saber como está o caso.",
    ideas: ["Controle de prazos com alerta por responsável", "Coleta de documentos guiada", "Andamento do caso para o cliente"],
  },
  {
    id: "imobiliarias",
    icon: "home",
    name: "Imobiliárias",
    pains: "Interessados esperando resposta, papelada de locação incompleta, cobrança e repasse feitos à mão.",
    ideas: ["Primeiro atendimento no WhatsApp", "Checklist de documentos da locação", "Lembretes de cobrança e repasse"],
  },
  {
    id: "comercio",
    icon: "box",
    name: "Comércio e distribuição",
    pains: "Pedido chegando por WhatsApp e indo para a planilha à mão, estoque desencontrado, cobrança atrasada.",
    ideas: ["Pedido do WhatsApp direto no sistema", "Aviso de estoque baixo", "Régua de cobrança automática"],
  },
  {
    id: "servicos",
    icon: "truck",
    name: "Serviços e logística",
    pains: "Ordem de serviço em papel, equipe na rua sem informação, cliente sem saber quando o serviço chega.",
    ideas: ["Ordens de serviço no celular", "Agenda da equipe de campo", "Registro de cada etapa, com foto"],
    proof: { text: "Já construí um controle de pátio de veículos, etapa por etapa." },
  },
];

/* ---------------------------------------------------------------------------
 * Contabilidade
 * ------------------------------------------------------------------------- */

export const accountingPains: { icon: IconName; text: string }[] = [
  { icon: "inbox", text: "Cobrar documento do cliente todo mês, um por um" },
  { icon: "calendar", text: "Prazos e obrigações de dezenas de empresas na cabeça de poucas pessoas" },
  { icon: "chat", text: "WhatsApp cheio de “minha guia já saiu?”" },
  { icon: "repeat", text: "Nota e extrato digitados de novo no sistema" },
  { icon: "search", text: "Conferência manual linha por linha" },
  { icon: "users", text: "Cliente novo que leva semanas para entrar na rotina" },
  { icon: "clock", text: "Fechamento que vira hora extra todo mês" },
];

export type Scenario = {
  id: string;
  icon: IconName;
  title: string;
  today: string;
  then: string[];
  gain: string;
};

/** "Como funcionaria no seu escritório": ilustrações, não resultados medidos. */
export const accountingScenarios: Scenario[] = [
  {
    id: "documentos",
    icon: "inbox",
    title: "Coleta de documentos do mês",
    today: "Alguém da equipe manda mensagem para cada cliente, espera, cobra de novo e salva os arquivos à mão.",
    then: [
      "No dia combinado, cada cliente recebe pelo WhatsApp ou e-mail a lista do que falta, com o nome dele",
      "O que chega é salvo na pasta certa do cliente, com o mês no nome",
      "Quem não mandou recebe um lembrete educado; a equipe só é chamada para os casos que travaram",
    ],
    gain: "A equipe para de correr atrás de papel e começa o mês sabendo o que já tem.",
  },
  {
    id: "prazos",
    icon: "calendar",
    title: "Prazos e obrigações",
    today: "Vencimentos controlados em planilha ou de memória; o risco de esquecer cresce junto com a carteira.",
    then: [
      "Um calendário por cliente mostra o que vence, quem é o responsável e o que já foi feito",
      "Lembretes saem antes do vencimento, para a equipe e, se você quiser, para o cliente",
      "O que está atrasado aparece no topo, sem ninguém precisar montar relatório",
    ],
    gain: "Menos multa por esquecimento e um dono que sabe, numa tela, como está a carteira.",
  },
  {
    id: "atendimento",
    icon: "chat",
    title: "Status para o cliente",
    today: "O cliente pergunta se a guia saiu, alguém para o que está fazendo, procura e responde.",
    then: [
      "Um assistente no WhatsApp responde com base no que está registrado: guia enviada, documento pendente, data de vencimento",
      "Pergunta fora do padrão vai para a pessoa certa, com o histórico junto",
      "Tudo o que o assistente respondeu fica registrado",
    ],
    gain: "Resposta na hora para o cliente e menos interrupção para quem está fechando o mês.",
  },
  {
    id: "digitacao",
    icon: "repeat",
    title: "Fim da digitação dupla",
    today: "Notas, extratos e planilhas do cliente são digitados de novo no sistema contábil.",
    then: [
      "Notas e extratos são importados e organizados automaticamente, quando o sistema contábil permite",
      "O que não bate (valor diferente, lançamento duplicado) é separado para conferência",
      "A pessoa revisa só as exceções, em vez de cada linha",
    ],
    gain: "Menos erro de digitação e horas devolvidas à análise, que é o que o cliente valoriza.",
  },
  {
    id: "onboarding",
    icon: "users",
    title: "Entrada de cliente novo",
    today: "Pedido de documentos, acessos e informações em mensagens soltas, sem saber o que já chegou.",
    then: [
      "O cliente recebe um link com a lista do que enviar, e vê o que já foi entregue",
      "A equipe acompanha cada entrada num quadro com as etapas",
      "Quando está tudo completo, o cliente entra automaticamente na rotina mensal",
    ],
    gain: "Cliente novo produtivo mais cedo e uma primeira impressão organizada.",
  },
  {
    id: "fechamento",
    icon: "clock",
    title: "Pico de fechamento",
    today: "Todo mundo apagando incêndio ao mesmo tempo, sem visão de quem está com o quê.",
    then: [
      "Uma fila de trabalho por cliente e por responsável, em ordem de prazo",
      "O que depende do cliente fica marcado como aguardando, e o lembrete sai sozinho",
      "O dono vê o andamento do fechamento sem precisar chamar reunião",
    ],
    gain: "Um fechamento previsível, com a carga distribuída antes de virar hora extra.",
  },
];

/** O que não muda: limites claros para quem é responsável técnico. */
export const accountingKeeps = [
  "O seu sistema contábil continua sendo o seu sistema contábil.",
  "A responsabilidade técnica continua com o contador: a automação prepara, a pessoa confere e assina.",
  "Nenhuma mensagem sai para o cliente com um tom que não seja o do seu escritório: os textos são combinados com você.",
  "Os dados dos clientes ficam com acesso controlado e registro do que foi feito.",
];

export const accountingFaq = [
  {
    q: "Funciona com o sistema contábil que eu uso?",
    a: [
      "Depende do que o sistema permite: alguns importam arquivos, outros têm integração, outros só exportam relatórios. Isso é verificado no diagnóstico, antes de qualquer proposta.",
      "Mesmo sem integração direta, boa parte do ganho vem de antes do sistema: coleta de documentos, prazos e atendimento.",
    ],
  },
  {
    q: "Meus clientes vão aceitar falar com um assistente?",
    a: [
      "O assistente cuida do que é repetitivo (lembrete, status, lista de documentos) e passa para uma pessoa o que precisa de conversa. As mensagens têm o tom do seu escritório e você decide o que ele pode responder.",
    ],
  },
  {
    q: "Dá para começar pequeno?",
    a: [
      "Sim, e é o recomendado. Uma rotina só, como a coleta de documentos, já mostra se o ganho compensa antes de ir para a próxima.",
    ],
  },
] as const;
