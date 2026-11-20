/**
 * Ilustrações de ramo, desenhadas para o site (nenhuma gerada por IA).
 * Construção única: grade de 64×64, área útil de 10 a 54, formas planas com
 * cantos arredondados, uma forma principal em jabuticaba, um acento em
 * goiaba ou caju e detalhes em papel. As cores vêm de classes (global.css),
 * então a mesma peça funciona em qualquer fundo de azulejo.
 */
export const illustrations = {
  clinica: `
    <rect class="f-ink" x="12" y="50" width="40" height="4" rx="2"/>
    <path class="f-ink" d="M19 51V29a13 13 0 0 1 26 0v22Z"/>
    <rect class="f-goi" x="29" y="29" width="6" height="16" rx="1.5"/>
    <rect class="f-goi" x="24" y="34" width="16" height="6" rx="1.5"/>`,
  loja: `
    <rect class="f-paper" x="16" y="26" width="32" height="25"/>
    <rect class="f-caju" x="27" y="36" width="10" height="15" rx="2"/>
    <rect class="f-ink" x="12" y="50" width="40" height="4" rx="2"/>
    <path class="f-ink" d="M13 16h38v8a4.75 4.75 0 0 1-9.5 0 4.75 4.75 0 0 1-9.5 0 4.75 4.75 0 0 1-9.5 0 4.75 4.75 0 0 1-9.5 0Z"/>
    <path class="f-goi" d="M22.5 16H32v8a4.75 4.75 0 0 1-9.5 0ZM41.5 16H51v8a4.75 4.75 0 0 1-9.5 0Z"/>`,
  escritorio: `
    <path class="f-caju" d="M11 21a4 4 0 0 1 4-4h10.5l4 4H49a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4Z"/>
    <rect class="f-paper" x="17" y="25" width="20" height="3.5" rx="1.75"/>
    <rect class="f-paper" x="17" y="32" width="13" height="3.5" rx="1.75"/>
    <circle class="f-ink" cx="43" cy="43" r="10"/>
    <path class="s-paper" d="m38.5 43 3 3 6-6.5"/>`,
  advocacia: `
    <rect class="f-ink" x="30" y="14" width="4" height="34" rx="2"/>
    <rect class="f-ink" x="21" y="47" width="22" height="5" rx="2.5"/>
    <rect class="f-ink" x="12" y="19" width="40" height="4.5" rx="2.25"/>
    <rect class="f-ink" x="17" y="22" width="2.5" height="11" rx="1.25"/>
    <rect class="f-ink" x="44.5" y="22" width="2.5" height="11" rx="1.25"/>
    <path class="f-goi" d="M9.5 33h18a9 9 0 0 1-18 0Z"/>
    <path class="f-caju" d="M36.5 33h18a9 9 0 0 1-18 0Z"/>`,
  industria: `
    <path class="f-ink" d="M10 52V31l11-7.5V31l11-7.5V31l11-7.5V13h8v39Z"/>
    <rect class="f-caju" x="15" y="38" width="6" height="6" rx="1.5"/>
    <rect class="f-caju" x="26" y="38" width="6" height="6" rx="1.5"/>
    <rect class="f-goi" x="37" y="38" width="6" height="6" rx="1.5"/>`,
  distribuidora: `
    <rect class="f-caju" x="12" y="32" width="19" height="19" rx="2.5"/>
    <rect class="f-ink" x="33" y="32" width="19" height="19" rx="2.5"/>
    <rect class="f-goi" x="22.5" y="12" width="19" height="19" rx="2.5"/>
    <rect class="f-paper" x="19.5" y="32" width="4" height="7" rx="1"/>
    <rect class="f-paper" x="40.5" y="32" width="4" height="7" rx="1"/>
    <rect class="f-paper" x="30" y="12" width="4" height="7" rx="1"/>`,
  imobiliaria: `
    <path class="f-goi" d="M11 30.5 32 13l21 17.5V52H11Z"/>
    <path class="f-ink" d="M26 52V42a6 6 0 0 1 12 0v10Z"/>
    <rect class="f-paper" x="17" y="32" width="7" height="7" rx="1.5"/>
    <rect class="f-paper" x="40" y="32" width="7" height="7" rx="1.5"/>
    <rect class="f-ink" x="40" y="14" width="6" height="10" rx="1.5"/>`,
  escola: `
    <path class="f-ink" d="M32 19c-5.5-4-13-5.5-20-4.5v31c7-1 14.5.5 20 4.5Z"/>
    <path class="f-goi" d="M32 19c5.5-4 13-5.5 20-4.5v31c-7-1-14.5.5-20 4.5Z"/>
    <path class="s-paper" d="M17 23c3.5-.3 7 .4 10 1.8M17 30c3.5-.3 7 .4 10 1.8M37 24.8c3-1.4 6.5-2.1 10-1.8M37 31.8c3-1.4 6.5-2.1 10-1.8"/>`,
  transportadora: `
    <rect class="f-ink" x="8" y="20" width="30" height="22" rx="2.5"/>
    <path class="f-goi" d="M38 26h8.5l7.5 8.5V42H38Z"/>
    <rect class="f-paper" x="41" y="29" width="6" height="5" rx="1"/>
    <circle class="f-ink" cx="18" cy="44" r="6"/>
    <circle class="f-paper" cx="18" cy="44" r="2.2"/>
    <circle class="f-ink" cx="45" cy="44" r="6"/>
    <circle class="f-paper" cx="45" cy="44" r="2.2"/>`,
  agro: `
    <circle class="f-caju" cx="47" cy="17" r="6.5"/>
    <path class="f-ink" d="M6 55c9-13 43-13 52 0Z"/>
    <path class="s-ink" d="M31 44V27"/>
    <path class="f-goi" d="M31 33c-9 0-13.5-5.5-13.5-12.5 8 0 13.5 4.5 13.5 12.5Z"/>
    <path class="f-ink" d="M31 30c0-8 5.5-12.5 13.5-12.5 0 7-4.5 12.5-13.5 12.5Z"/>`,
  ecommerce: `
    <path class="f-goi" d="M14 24h36l-2.5 28h-31Z"/>
    <path class="s-ink" d="M24.5 27v-5a7.5 7.5 0 0 1 15 0v5"/>
    <circle class="f-ink" cx="24.5" cy="28" r="2.5"/>
    <circle class="f-ink" cx="39.5" cy="28" r="2.5"/>
    <rect class="f-paper" x="22" y="38" width="20" height="4" rx="2"/>`,
  agencia: `
    <path class="f-ink" d="M13 27h9l19-11v32L22 37h-9a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z"/>
    <path class="f-goi" d="M19 37h7l2.5 13.5h-6.5Z"/>
    <path class="s-ink" d="M47.5 25.5c2.5 3.5 2.5 9.5 0 13"/>
    <rect class="f-caju" x="41" y="16" width="4" height="32" rx="2"/>`,
} as const;

export type IllustrationName = keyof typeof illustrations;
