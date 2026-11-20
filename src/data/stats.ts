/**
 * Dados de mercado usados no site. Regra: todo número aparece com a fonte e o
 * ano ao lado, e está registrado em PRODUCT.md com a URL e a citação literal.
 * São dados de terceiros sobre o mercado, nunca resultados da Noxlabs.
 * Escolhidos para valer para qualquer ramo: nenhum é de um setor só.
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
    note: "Mais de 8,2 mil empreendedores, fevereiro e março de 2026.",
  },
  {
    id: "sebrae-ia",
    value: 52,
    suffix: "%",
    text: "dos donos de pequenos negócios no Brasil usaram IA no trabalho nas duas semanas antes da entrevista.",
    source: {
      org: "Sebrae",
      title: "Transformação Digital nos Pequenos Negócios",
      year: "2026",
      url: "https://agenciasebrae.com.br/dados/pequenos-negocios-do-brasil-usam-mais-ia-que-os-norte-americanos-aponta-sebrae/",
    },
    note: "7.182 entrevistas, de março a maio de 2026. Usar não é o mesmo que ter IA na rotina.",
  },
];

export function statById(id: string) {
  return stats.find((s) => s.id === id);
}

export function formatStat(stat: Stat) {
  const decimals = stat.decimals ?? 0;
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(stat.value);
}
