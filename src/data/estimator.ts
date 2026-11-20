/**
 * Estimativa ilustrativa de horas liberadas. Premissas conservadoras e
 * visíveis no site; a mesma conta roda no build (valor inicial, sem JS) e no
 * navegador.
 */
export const estimatorDefaults = {
  people: 6,
  hours: 6,
  cost: 3500,
  share: 30,
} as const;

export const estimatorLimits = {
  people: { min: 1, max: 100, step: 1 },
  hours: { min: 1, max: 40, step: 1 },
  cost: { min: 1500, max: 40000, step: 100 },
  share: { min: 10, max: 60, step: 5 },
} as const;

/** Semanas por mês: 4, abaixo das 4,33 do calendário, para não inflar. */
export const WEEKS_PER_MONTH = 4;
/** Divisor do custo da hora: 220, o usado na CLT para a jornada de 44 h semanais (deixa a hora mais barata). */
export const HOURS_PER_MONTH = 220;
/** Uma pessoa em tempo integral no mesmo mês de 4 semanas usado nas horas: 44 h × 4 = 176 h. */
export const FULL_TIME_HOURS = 44 * WEEKS_PER_MONTH;

export type EstimatorInput = { people: number; hours: number; cost: number; share: number };

export function estimate({ people, hours, cost, share }: EstimatorInput) {
  const repetitive = people * hours * WEEKS_PER_MONTH;
  const freed = repetitive * (share / 100);
  const hourCost = cost / HOURS_PER_MONTH;
  const value = freed * hourCost;
  return {
    repetitive,
    freed,
    fte: freed / FULL_TIME_HOURS,
    hourCost,
    month: value,
    year: value * 12,
  };
}

export const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);

export const num = (n: number, decimals = 0) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

/** "0,3 de uma pessoa", "1,2 pessoa", "2,5 pessoas" em tempo integral. */
export function fteText(fte: number) {
  const n = num(fte, 1);
  if (fte < 0.95) return `${n} de uma pessoa em tempo integral`;
  if (fte < 1.95) return `${n} pessoa em tempo integral`;
  return `${n} pessoas em tempo integral`;
}

/**
 * Lê um valor em reais como o brasileiro digita: "4000", "4.000", "4.000,50",
 * "R$ 4.000". Devolve null se não for um número.
 */
export function parseMoney(raw: string) {
  const clean = raw.replace(/R\$|\s/g, "");
  if (!/^\d{1,3}(\.\d{3})*(,\d{1,2})?$|^\d+(,\d{1,2})?$/.test(clean)) return null;
  return Number(clean.replace(/\./g, "").replace(",", "."));
}

export const moneyInput = (n: number) => num(n);

export function estimateMail(x: EstimatorInput) {
  const r = estimate(x);
  return [
    "Fiz a estimativa no site:",
    `- ${x.people} pessoas, ${x.hours} h por semana cada em tarefas repetitivas`,
    `- Custo mensal por pessoa: ${brl(x.cost)}`,
    `- Parte automatizável considerada: ${x.share}%`,
    `- Resultado: ${num(r.freed)} horas por mês, cerca de ${brl(r.month)} por mês em horas de trabalho`,
  ];
}

/** Resumo curto para leitor de tela, anunciado só depois que a pessoa para de ajustar. */
export function estimateSummary(x: EstimatorInput) {
  const r = estimate(x);
  return `Estimativa: ${num(r.freed)} horas por mês, ${fteText(r.fte)}, cerca de ${brl(r.month)} por mês em horas de trabalho.`;
}
