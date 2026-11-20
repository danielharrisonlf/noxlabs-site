/** Como funciona, segurança e perguntas frequentes. */
import type { IconName } from "./icons";

export const steps = [
  {
    title: "Você me conta a rotina",
    text: "Por e-mail ou numa conversa de 30 minutos: o que se repete, quem faz e onde trava. Se automação não for o caminho, eu digo.",
  },
  {
    title: "Eu olho de perto",
    text: "Vejo como o trabalho é feito hoje, com quem faz, e mostro onde vai o tempo: o que vale automatizar primeiro e o que não vale.",
  },
  {
    title: "Proposta por escrito",
    text: "O que será feito, o que fica de fora, prazos e preço, em linguagem simples.",
  },
  {
    title: "Uma rotina funcionando",
    text: "A primeira melhoria entra em uso cedo. Vocês usam, a gente ajusta e só então vem a próxima.",
  },
] as const;

/**
 * Segurança em português simples. Compromissos ainda não confirmados pelo
 * Daniel estão escritos como intenção (ver PRODUCT.md, itens em aberto).
 */
export const security: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "lock",
    title: "Cada pessoa vê só o que precisa",
    text: "Acesso por pessoa e por função, que você retira quando alguém sai da equipe.",
  },
  {
    icon: "eye",
    title: "Tudo fica registrado",
    text: "Quem fez o quê e quando, inclusive o que o assistente de IA fez.",
  },
  {
    icon: "person",
    title: "Decisão importante passa por uma pessoa",
    text: "O assistente prepara. Cobrança, envio de documento e resposta sensível podem exigir a aprovação de alguém da equipe.",
  },
  {
    icon: "shield",
    title: "Só o necessário vai para a IA",
    text: "O assistente recebe apenas o que a tarefa pede. A intenção é usar fornecedores com contrato de tratamento de dados.",
  },
  {
    icon: "doc",
    title: "Com a sua empresa",
    text: "A intenção é que contas, acessos e documentação fiquem no nome da sua empresa. Isso é combinado na proposta.",
  },
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
      "A LGPD entra na conversa desde o começo. A responsabilidade legal continua sendo da sua empresa, com o seu jurídico; o desenho ajuda a cumpri-la.",
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
