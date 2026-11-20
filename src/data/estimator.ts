/**
 * Estimativa ilustrativa de horas liberadas. Premissas conservadoras e
 * visíveis no site; a mesma conta roda no build (valor inicial, sem JS) e no
 * navegador.
 */
export const estimatorDefaults = {
  people: 5,
  hours: 8,
  cost: 4000,
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
/** Horas por mês de uma jornada de 44 h semanais: o divisor 220 da CLT. */
export const HOURS_PER_MONTH = 220;

export type EstimatorInput = { people: number; hours: number; cost: number; share: number };

export function estimate({ people, hours, cost, share }: EstimatorInput) {
  const repetitive = people * hours * WEEKS_PER_MONTH;
  const freed = repetitive * (share / 100);
  const hourCost = cost / HOURS_PER_MONTH;
  const value = freed * hourCost;
  return {
    repetitive,
    freed,
    fte: freed / HOURS_PER_MONTH,
    hourCost,
    month: value,
    year: value * 12,
  };
}

export const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);

export const num = (n: number, decimals = 0) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
