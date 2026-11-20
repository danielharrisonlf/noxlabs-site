/**
 * Dados de mercado usados no site. Regra: todo número aparece com a fonte e o
 * ano ao lado, e está registrado em PRODUCT.md com a URL e a citação literal.
 * São dados de terceiros sobre o mercado, nunca resultados da Noxlabs.
 * Escolhidos para valer para qualquer ramo e para o Brasil: pesquisas do
 * Sebrae de 2026 com donos de pequenos negócios.
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
    text: "dos donos de pequenos negócios usaram IA no trabalho nas duas semanas antes da entrevista.",
    source: {
      org: "Sebrae",
      title: "Transformação Digital nos Pequenos Negócios",
      year: "2026",
      url: "https://agenciasebrae.com.br/dados/pequenos-negocios-do-brasil-usam-mais-ia-que-os-norte-americanos-aponta-sebrae/",
    },
    note: "7.182 entrevistas, de março a maio de 2026. Usar não é o mesmo que ter IA na rotina.",
  },
  {
    id: "sebrae-ia-intencao",
    value: 60,
    suffix: "%",
    text: "pretendem começar a usar IA ou usar mais no próximo semestre.",
    source: {
      org: "Sebrae",
      title: "Transformação Digital nos Pequenos Negócios",
      year: "2026",
      url: "https://agenciasebrae.com.br/dados/pequenos-negocios-do-brasil-usam-mais-ia-que-os-norte-americanos-aponta-sebrae/",
    },
    note: "Mesma pesquisa. Intenção declarada, não uso medido.",
  },
];

export function statById(id: string) {
  return stats.find((s) => s.id === id);
}

export function formatStat(stat: Stat) {
  const decimals = stat.decimals ?? 0;
  return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(stat.value);
}
