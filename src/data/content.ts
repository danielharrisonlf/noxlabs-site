/** Processo, princípios e perguntas frequentes. */

export const steps = [
  {
    title: "Diagnóstico",
    meta: "Conversa de 30 min",
    text: "Você descreve o problema; eu pergunto até entender o que dói, quanto custa e o que já foi tentado. Se eu não for a pessoa certa para resolver, digo na hora.",
  },
  {
    title: "Proposta",
    meta: "Por escrito",
    text: "Escopo, o que fica de fora, riscos, etapas e preço, numa página que o seu sócio entende sem tradução.",
  },
  {
    title: "Entregas incrementais",
    meta: "Ciclos curtos",
    text: "Cada ciclo termina com algo que você usa ou testa. Toda semana, um resumo por escrito: o que ficou pronto, o que vem e o que travou.",
  },
  {
    title: "Operação",
    meta: "No ar e documentado",
    text: "Deploy, monitoramento, documentação e passagem para o seu time. Se preferir, sigo cuidando do sistema, no formato combinado na proposta.",
  },
] as const;

export const principles = [
  {
    title: "O código é seu",
    text: "Repositório e infraestrutura na sua conta desde o primeiro dia. Se a parceria acabar, nada para.",
  },
  {
    title: "Documentação que alguém lê",
    text: "Como rodar, como operar e por que cada decisão foi tomada, escrito junto com o código.",
  },
  {
    title: "Testes onde o erro custa caro",
    text: "Regras de negócio, permissões e integrações têm teste automatizado. Telas triviais, não.",
  },
  {
    title: "Segurança e LGPD no desenho",
    text: "Dado mínimo, acesso por papel, segredo fora do código e trilha de auditoria quando o caso pede. Não substitui o seu jurídico; facilita o trabalho dele.",
  },
  {
    title: "Comunicação semanal por escrito",
    text: "Você não precisa perguntar como está o projeto. O resumo chega antes.",
  },
  {
    title: "Tecnologia aberta",
    text: "Ferramentas de mercado e código aberto. Nenhuma peça proprietária minha que prenda você à Noxlabs.",
  },
] as const;

export const faq = [
  {
    q: "Quanto custa?",
    a: [
      "Depende do escopo, por isso não publico tabela. Depois da conversa inicial você recebe uma proposta com escopo, formato e preço.",
      "Se o orçamento não cobrir o que você quer, eu digo o que cabe nele e o que fica para depois.",
    ],
  },
  {
    q: "Qual é o prazo?",
    a: [
      "O prazo sai da proposta, etapa por etapa, depois que o escopo está claro. Prefiro cortar escopo a esticar prazo: a primeira entrega é desenhada para entrar em uso cedo.",
      "Você acompanha o andamento toda semana, então atraso nunca é surpresa.",
    ],
  },
  {
    q: "É seguro usar IA com dados sensíveis dos meus clientes?",
    a: [
      "Pode ser, se o desenho cuidar disso. Isso significa mandar ao modelo só o necessário, mascarar dados pessoais, escolher provedor e região com contrato de tratamento de dados, registrar o que o agente fez e exigir aprovação humana nas ações críticas.",
      "Quando o risco não compensa, a recomendação é não usar IA naquele ponto. Você ouve isso no diagnóstico, não depois do contrato.",
    ],
  },
  {
    q: "Quem mantém o sistema depois da entrega?",
    a: [
      "Você escolhe. O seu time assume com documentação e uma passagem acompanhada, ou eu sigo cuidando de correções, atualizações e evolução, no formato que combinarmos.",
    ],
  },
  {
    q: "De quem é o código?",
    a: [
      "Seu. O repositório fica na sua conta, a infraestrutura no seu nome e as credenciais com você. Não uso framework proprietário nem licença que prenda você à Noxlabs.",
    ],
  },
  {
    q: "A Noxlabs é uma pessoa só?",
    a: [
      "Sim. Quem conversa com você é quem desenha a arquitetura e escreve o código, sem repasse para um time que você nunca viu.",
      "Isso limita quantos projetos assumo ao mesmo tempo. Se a agenda estiver cheia, eu aviso a data em que posso começar.",
    ],
  },
] as const;
