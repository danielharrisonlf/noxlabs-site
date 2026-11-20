/** Fatos de contato e links. Fonte única: o site inteiro lê daqui. */

const email = "daniel.harrisonlf@gmail.com";

const diagnosisSubject = "Diagnóstico de 30 min com a Noxlabs";

/** Roteiro que já vem no corpo do e-mail: o visitante só preenche. */
export const mailScript = [
  "Empresa:",
  "Meu cargo:",
  "O problema, em poucas linhas:",
  "O que já tentamos:",
  "Prazo ou data que importa:",
  "Horários bons para uma conversa de 30 min:",
] as const;

function mailBody(context?: string) {
  return ["Olá, Daniel.", "", ...(context ? [`Contexto: ${context}`, ""] : []), ...mailScript].join("\n");
}

/** mailto com assunto e roteiro preenchidos; `topic` entra no assunto e no corpo. */
export function diagnosisMailto(topic?: string) {
  const subject = topic ? `${diagnosisSubject}: ${topic}` : diagnosisSubject;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody(topic))}`;
}

export const site = {
  name: "Noxlabs",
  url: "https://noxlabs.tech",
  title: "Noxlabs — software e IA que saem do papel e ficam no ar",
  description:
    "Consultoria de software e IA de Daniel Harrison. Produtos sob medida, agentes de IA via MCP, integrações, arquitetura e redução de custo de nuvem. Comece por uma conversa de 30 minutos.",
  locale: "pt_BR",
  email,
  mailto: `mailto:${email}`,
  diagnosisMailto: diagnosisMailto(),
  /**
   * PENDENTE: link de agendamento (Cal.com ou similar) ainda não existe.
   * Enquanto for null, o site não mostra botão de agenda e o diagnóstico
   * é pedido por e-mail. Preencha com a URL real para ativar.
   */
  scheduleUrl: null as string | null,
  founder: {
    name: "Daniel Harrison",
    role: "Engenheiro de software e fundador da Noxlabs",
  },
  links: {
    kairos: "https://kairos.noxlabs.tech",
    portfolio: "https://danielharrison.noxlabs.tech",
    blog: "https://blog.noxlabs.tech",
    github: "https://github.com/danielharrisonlf",
    linkedin: "https://www.linkedin.com/in/danielharrison-/",
  },
} as const;

export const nav = [
  { label: "Serviços", href: "/#servicos", id: "servicos" },
  { label: "Kairos", href: "/#kairos", id: "kairos" },
  { label: "Casos", href: "/#casos", id: "casos" },
  { label: "Processo", href: "/#processo", id: "processo" },
  { label: "Sobre", href: "/#sobre", id: "sobre" },
  { label: "Perguntas", href: "/#perguntas", id: "perguntas" },
] as const;
