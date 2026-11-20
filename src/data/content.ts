/** Como funciona, segurança e perguntas frequentes. */
import type { IconName } from "./icons";

export const steps = [
  {
    title: "Conversa de 30 minutos",
    text: "Você conta qual rotina toma mais tempo da equipe. Se automação não for o caminho, eu digo na hora.",
  },
  {
    title: "Diagnóstico da rotina",
    text: "Vejo como o trabalho é feito hoje, com quem faz: onde se digita duas vezes, onde se espera resposta, onde o erro aparece.",
  },
  {
    title: "Proposta por escrito",
    text: "O que será feito, o que fica de fora, prazo de cada etapa e preço. Numa página que você lê em cinco minutos.",
  },
  {
    title: "Primeira rotina em uso",
    text: "Começo pela rotina que mais devolve tempo. A equipe usa, a gente mede, ajusta e só então passa para a próxima.",
  },
] as const;

export const security: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "lock",
    title: "Cada pessoa vê só o que deve",
    text: "Acesso por pessoa e por função, que você retira quando alguém sai da equipe.",
  },
  {
    icon: "eye",
    title: "Tudo fica registrado",
    text: "Quem fez o quê e quando, inclusive o que o assistente de IA fez. Se alguém perguntar, há resposta.",
  },
  {
    icon: "person",
    title: "Decisão importante passa por uma pessoa",
    text: "O assistente prepara, a equipe aprova. Cobrança, envio de documento e resposta sensível não saem sem conferência, se for assim que você quiser.",
  },
  {
    icon: "shield",
    title: "Dado do cliente sai só o necessário",
    text: "A IA recebe apenas o que precisa para a tarefa, de preferência por fornecedores com contrato de tratamento de dados.",
  },
  {
    icon: "doc",
    title: "Os dados e o sistema são seus",
    text: "Contas, acessos e documentação ficam no nome da sua empresa, para que nada dependa da Noxlabs.",
  },
];

/** O que muda na empresa, em uma linha cada. */
export const outcomes: { icon: IconName; title: string; text: string }[] = [
  { icon: "clock", title: "Horas de volta", text: "O repetitivo sai da mesa da equipe." },
  { icon: "check", title: "Menos erro e retrabalho", text: "O que é digitado uma vez não é digitado de novo." },
  { icon: "chat", title: "Atendimento mais rápido", text: "Resposta na hora para as perguntas de sempre." },
  { icon: "chart", title: "Visão clara do negócio", text: "Atrasos, vendas e pendências numa tela." },
  { icon: "users", title: "Crescer sem inchar a equipe", text: "Mais clientes sem contratar na mesma proporção." },
  { icon: "shield", title: "Dados protegidos", text: "Acesso por pessoa, registro de tudo, LGPD desde o começo." },
];

export const faq = [
  {
    q: "Quanto custa?",
    a: [
      "Depende do tamanho da rotina, por isso não há tabela. Depois da conversa inicial você recebe uma proposta por escrito com escopo, prazo e preço.",
      "Se o orçamento não cobrir tudo, a proposta mostra o que cabe agora e o que pode ficar para depois. Começar por uma rotina só é comum.",
    ],
  },
  {
    q: "Quanto tempo leva?",
    a: [
      "O prazo sai da proposta, etapa por etapa. A primeira entrega é pensada para entrar em uso cedo, com uma rotina de cada vez, em vez de um projeto grande que só aparece no fim.",
    ],
  },
  {
    q: "Preciso trocar os sistemas que já uso?",
    a: [
      "Na maioria das vezes, não. O ponto de partida é o que a sua empresa já usa: sistema de gestão, agenda, loja virtual, planilhas, e-mail, WhatsApp.",
      "Se um sistema não permite nenhum tipo de integração, isso aparece no diagnóstico, com as alternativas e o custo de cada uma, antes de qualquer contrato.",
    ],
  },
  {
    q: "Minha equipe vai conseguir usar?",
    a: [
      "A ideia é que a equipe faça menos coisas, não aprenda mais telas. Boa parte das automações roda sem ninguém abrir nada: a pessoa só recebe o que precisa conferir.",
      "Quando há tela nova, ela é desenhada com quem vai usar e vem com um guia curto e acompanhamento no começo, no formato combinado na proposta.",
    ],
  },
  {
    q: "E os dados dos meus clientes?",
    a: [
      "O desenho prevê acesso controlado por pessoa, registro do que foi feito e só o necessário saindo para serviços de IA, de preferência por fornecedores com contrato de tratamento de dados.",
      "Tudo é pensado para a LGPD desde o começo. Não substitui o seu jurídico, mas facilita o trabalho dele.",
    ],
  },
  {
    q: "A IA não vai errar com o meu cliente?",
    a: [
      "Pode errar, como uma pessoa. Por isso ela trabalha com limites: responde o que está registrado, encaminha o que não sabe e não envia nada sensível sem aprovação, se você preferir assim.",
      "Onde o risco não compensa, a recomendação é não usar IA naquele ponto. Você ouve isso no diagnóstico.",
    ],
  },
  {
    q: "E depois da entrega, quem cuida?",
    a: [
      "Você escolhe: eu sigo cuidando de ajustes, atualizações e novas rotinas no formato que combinarmos, ou a sua equipe de TI assume com documentação e uma passagem acompanhada.",
    ],
  },
  {
    q: "Serve para o meu ramo?",
    a: [
      "Se a sua empresa tem tarefa que se repete toda semana, mensagem que se responde igual e informação digitada duas vezes, serve. Isso existe em clínica, loja, escritório, indústria, distribuidora, imobiliária, escola e em quase todo negócio.",
      "O que muda de um ramo para outro é a rotina, e é por ela que o trabalho começa.",
    ],
  },
  {
    q: "A Noxlabs é uma pessoa só?",
    a: [
      "Sim. Quem conversa com você é quem desenha a solução e constrói, sem repasse para uma equipe que você nunca viu.",
      "Isso limita quantos projetos entram ao mesmo tempo. Se a agenda estiver cheia, você fica sabendo a data em que dá para começar.",
    ],
  },
] as const;
