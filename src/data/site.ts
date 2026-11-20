/** Fatos de contato e links. Fonte única: o site inteiro lê daqui. */

const email = "daniel.harrisonlf@gmail.com";

const talkSubject = "Conversa de 30 min com a Noxlabs";

/** Roteiro que já vem no corpo do e-mail: o visitante só preenche. */
export const mailScript = [
  "Empresa e ramo:",
  "Meu cargo:",
  "Quantas pessoas trabalham na rotina que quero melhorar:",
  "A tarefa que mais toma tempo hoje:",
  "Sistemas e planilhas que usamos:",
  "Horários bons para uma conversa de 30 min:",
] as const;

function mailBody(context?: string, extra: string[] = []) {
  return ["Olá, Daniel.", "", ...(context ? [`Sobre: ${context}`, ""] : []), ...extra, ...(extra.length ? [""] : []), ...mailScript].join(
    "\n",
  );
}

/** mailto com assunto e roteiro preenchidos; `topic` entra no assunto e no corpo. */
export function talkMailto(topic?: string, extra: string[] = []) {
  const subject = topic ? `${talkSubject}: ${topic}` : talkSubject;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody(topic, extra))}`;
}

export const site = {
  name: "Noxlabs",
  url: "https://noxlabs.tech",
  title: "Noxlabs | Automação, sistemas sob medida e IA para empresas",
  description:
    "Automação de rotinas, atendimento no WhatsApp com IA e sistemas sob medida para escritórios de contabilidade e pequenas e médias empresas. Menos tarefa manual, menos erro, mais tempo para atender e crescer.",
  locale: "pt_BR",
  email,
  mailto: `mailto:${email}`,
  talkMailto: talkMailto(),
  talkSubject,
  /**
   * PENDENTE: link de agendamento (Cal.com ou similar) ainda não existe.
   * Enquanto for null, o site não mostra botão de agenda e a conversa
   * é pedida por e-mail. Preencha com a URL real para ativar.
   */
  scheduleUrl: null as string | null,
  /**
   * PENDENTE: número de WhatsApp comercial. Enquanto for null, nenhum botão
   * de WhatsApp aparece. Formato esperado: só dígitos com DDI e DDD, por
   * exemplo "5511999999999"; o site monta o link wa.me.
   */
  whatsapp: null as string | null,
  founder: {
    name: "Daniel Harrison",
    role: "Fundador da Noxlabs",
  },
  links: {
    kairos: "https://kairos.noxlabs.tech",
    portfolio: "https://danielharrison.noxlabs.tech",
    blog: "https://blog.noxlabs.tech",
    github: "https://github.com/danielharrisonlf",
    linkedin: "https://www.linkedin.com/in/danielharrison-/",
  },
} as const;

/** Link de WhatsApp com mensagem pronta, ou null se o número não estiver configurado. */
export function whatsappHref(text = "Olá, Daniel. Quero conversar sobre automatizar uma rotina da minha empresa.") {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;
}

export const nav = [
  { label: "Soluções", href: "/#solucoes", id: "solucoes" },
  { label: "Contabilidade", href: "/contabilidade/", id: "contabilidade" },
  { label: "Segmentos", href: "/#segmentos", id: "segmentos" },
  { label: "Casos", href: "/#casos", id: "casos" },
  { label: "Estimativa", href: "/#estimativa", id: "estimativa" },
  { label: "Perguntas", href: "/#perguntas", id: "perguntas" },
] as const;
