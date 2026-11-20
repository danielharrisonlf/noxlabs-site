/** Movimento compartilhado, sem dependências: entradas por rolagem e contadores. */

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const formatter = (decimals: number) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Conta de zero até o valor final quando o número entra na tela. O HTML já
 * traz o valor final (sem JS ou com movimento reduzido, nada muda) e o
 * leitor de tela lê o texto do elemento pai, que não é animado.
 */
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  if (!Number.isFinite(target)) return;
  const fmt = formatter(decimals);
  const duration = 1100;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = fmt.format(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = fmt.format(target);
  };
  el.textContent = fmt.format(0);
  requestAnimationFrame(tick);
}

export function initMotion() {
  const root = document.documentElement;
  if (!root.classList.contains("reveal-on")) return;
  root.classList.add("reveal-ready");

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        if (el.dataset.count !== undefined) countUp(el);
        else el.classList.add("is-in");
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]")) io.observe(el);
}
