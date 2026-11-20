/** Fatos de contato e links. Fonte única: o site inteiro lê daqui. */

const email = "daniel.harrisonlf@gmail.com";

const diagnosisSubject = "Diagnóstico de 30 min com a Noxlabs";
const diagnosisBody = [
  "Olá, Daniel.",
  "",
  "Empresa:",
  "Meu cargo:",
  "O problema, em poucas linhas:",
  "O que já tentamos:",
  "Prazo ou data que importa:",
  "",
  "Horários bons para uma conversa de 30 min:",
].join("\n");

export const site = {
  name: "Noxlabs",
  url: "https://noxlabs.tech",
  title: "Noxlabs — software e IA aplicada, do diagnóstico à operação",
  description:
    "Consultoria de software e IA de Daniel Harrison. Produtos sob medida, agentes de IA via MCP, integrações, arquitetura e redução de custo de nuvem. Diagnóstico gratuito de 30 minutos.",
  locale: "pt_BR",
  email,
  mailto: `mailto:${email}`,
  diagnosisMailto: `mailto:${email}?subject=${encodeURIComponent(diagnosisSubject)}&body=${encodeURIComponent(diagnosisBody)}`,
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
  { label: "Serviços", href: "/#servicos" },
  { label: "Casos", href: "/#casos" },
  { label: "Como trabalho", href: "/#processo" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Perguntas", href: "/#perguntas" },
] as const;
