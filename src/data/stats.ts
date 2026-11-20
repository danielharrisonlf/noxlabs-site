/**
 * Dados de mercado usados no site. Regra: todo número aparece com a fonte e o
 * ano ao lado, e está registrado em PRODUCT.md com a URL e a citação literal.
 * São dados de terceiros sobre o mercado, nunca resultados da Noxlabs.
 */
export type Stat = {
  id: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** A frase que acompanha o número, para dono de empresa. */
  text: string;
  source: { org: string; title: string; year: string; url: string };
  /** Ressalva curta exibida junto da fonte (escopo, amostra). */
  note?: string;
};

export const stats: Stat[] = [
  /* ---- Contabilidade no Brasil ---- */
  {
    id: "cfc-escritorios",
    value: 101880,
    text: "escritórios e empresas de contabilidade com registro ativo no Brasil no fim de 2025.",
    source: {
      org: "CFC",
      title: "Relato Integrado 2025",
      year: "2026",
      url: "https://cfc.org.br/wp-content/uploads/2026/05/RI_2025.pdf",
    },
  },
  {
    id: "cfc-profissionais",
    value: 539,
    suffix: " mil",
    text: "contadores e técnicos em contabilidade com registro ativo no país no fim de 2025.",
    source: {
      org: "CFC",
      title: "Relato Integrado 2025",
      year: "2026",
      url: "https://cfc.org.br/wp-content/uploads/2026/05/RI_2025.pdf",
    },
  },
  {
    id: "contabil-retrabalho",
    value: 34,
    suffix: "%",
    text: "dos profissionais de contabilidade citam o excesso de retrabalho manual como desafio da rotina, o mais citado da pesquisa.",
    source: {
      org: "IOB, CFC e Fenacon",
      title: "pesquisa sobre IA na rotina contábil",
      year: "2026",
      url: "https://cfc.org.br/noticias/pesquisa-mostra-avanco-da-inteligencia-artificial-na-rotina-dos-profissionais-da-contabilidade/",
    },
    note: "393 profissionais ouvidos.",
  },
  {
    id: "contabil-ia-semanal",
    value: 78,
    suffix: "%",
    text: "dos profissionais de contabilidade já usam ferramentas de IA no trabalho pelo menos uma vez por semana.",
    source: {
      org: "IOB, CFC e Fenacon",
      title: "pesquisa sobre IA na rotina contábil",
      year: "2026",
      url: "https://cfc.org.br/noticias/pesquisa-mostra-avanco-da-inteligencia-artificial-na-rotina-dos-profissionais-da-contabilidade/",
    },
    note: "393 profissionais ouvidos.",
  },
  {
    id: "bm-horas-impostos",
    value: 1501,
    suffix: " h",
    text: "por ano era o tempo que uma empresa de porte médio levava no Brasil só para cumprir as obrigações de impostos.",
    source: {
      org: "Banco Mundial",
      title: "Doing Business 2020, perfil do Brasil",
      year: "2019",
      url: "https://subnational.doingbusiness.org/content/dam/doingBusiness/country/b/brazil/BRA-LITE.pdf",
    },
    note: "Empresa-modelo; dados de 2019, último ano da série.",
  },
  {
    id: "ibpt-normas",
    value: 569469,
    text: "normas sobre impostos foram editadas no Brasil de outubro de 1988 a setembro de 2026, mais de 40 por dia.",
    source: {
      org: "IBPT",
      title: "estudo sobre normas editadas desde 1988",
      year: "2026",
      url: "https://ibpt.org.br/brasil-editou-862-milhoes-de-normas-desde-1988-quase-7-sao-tributarias/",
    },
    note: "Federais, estaduais e municipais.",
  },

  {
    id: "tr-5h",
    value: 5,
    suffix: " h",
    text: "por semana é quanto profissionais contábeis, tributários e jurídicos esperam economizar com IA já no próximo ano.",
    source: {
      org: "Thomson Reuters",
      title: "Future of Professionals Report",
      year: "2025",
      url: "https://thomsonreuters.com/en/press-releases/2025/june/the-ai-adoption-reality-check-firms-with-ai-strategies-are-twice-as-likely-to-see-ai-driven-revenue-growth-those-without-risk-falling-behind",
    },
    note: "Previsão de 2.275 profissionais de vários países.",
  },

  /* ---- Trabalho e atendimento ---- */
  {
    id: "ms-sem-tempo",
    value: 80,
    suffix: "%",
    text: "dos profissionais, entre funcionários e gestores, dizem que falta tempo ou energia para dar conta do trabalho.",
    source: {
      org: "Microsoft",
      title: "Work Trend Index",
      year: "2025",
      url: "https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born",
    },
    note: "31 mil pessoas em 31 países, Brasil incluído.",
  },
  {
    id: "mckinsey-potencial",
    value: 70,
    prefix: "60 a ",
    suffix: "%",
    text: "do tempo dos funcionários vai em atividades que a tecnologia atual já teria potencial para automatizar.",
    source: {
      org: "McKinsey",
      title: "The economic potential of generative AI",
      year: "2023",
      url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
    },
    note: "Potencial técnico, não previsão de corte de vagas.",
  },
  {
    id: "salesforce-imediato",
    value: 77,
    suffix: "%",
    text: "dos clientes esperam falar com alguém imediatamente quando entram em contato com uma empresa.",
    source: {
      org: "Salesforce",
      title: "State of the Connected Customer",
      year: "2023",
      url: "https://www.salesforce.com/au/news/stories/customer-engagement-research-2023/",
    },
    note: "11 mil consumidores e 3.300 compradores de empresas em 25 países.",
  },

  /* ---- Empresas brasileiras ---- */
  {
    id: "sebrae-whatsapp",
    value: 8,
    suffix: " em 10",
    text: "donos de pequenos negócios dizem que o WhatsApp é o seu principal canal de comunicação e de vendas.",
    source: {
      org: "Sebrae",
      title: "Pesquisa Pulso dos Pequenos Negócios",
      year: "2026",
      url: "https://agenciasebrae.com.br/dados/whatsapp-se-consolida-nas-vendas-on-line-enquanto-facebook-e-lojas-proprias-perdem-folego/",
    },
  },
  {
    id: "cetic-ia",
    value: 17,
    suffix: "%",
    text: "das empresas brasileiras usam inteligência artificial. Entre as pequenas, 15%.",
    source: {
      org: "Cetic.br",
      title: "TIC Empresas 2025",
      year: "2026",
      url: "https://cetic.br/media/docs/publicacoes/2/pt-br/20260831091252/TIC_EMPRESAS_2025_PT_RE.pdf",
    },
    note: "Empresas com 10 ou mais pessoas.",
  },
  {
    id: "cetic-erp",
    value: 58,
    suffix: "%",
    text: "das empresas brasileiras não usam um sistema de gestão que integre os dados dos departamentos.",
    source: {
      org: "Cetic.br",
      title: "TIC Empresas 2025, tabela G2",
      year: "2026",
      url: "https://cetic.br/pt/tics/pesquisa/2025/empresas/G2/",
    },
    note: "Empresas com 10 ou mais pessoas.",
  },
];

export function statById(id: string) {
  return stats.find((s) => s.id === id);
}

export function formatStat(stat: Stat) {
  const decimals = stat.decimals ?? 0;
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(stat.value);
}
