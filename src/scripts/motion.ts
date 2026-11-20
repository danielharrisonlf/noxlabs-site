/** Utilidades de movimento compartilhadas, sem dependências. */

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Fallback das entradas por rolagem: só roda quando o <head> marcou
 * html.reveal-io (navegador sem animation-timeline e movimento permitido).
 */
export function revealFallback() {
  const root = document.documentElement;
  if (!root.classList.contains("reveal-io")) return;
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    for (const el of items) el.classList.add("is-in");
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  for (const el of items) io.observe(el);
}

/** Pausa animações contínuas de um bloco enquanto ele está fora da tela. */
export function pauseOffscreen(el: HTMLElement) {
  if (!("IntersectionObserver" in window)) return;
  new IntersectionObserver((entries) => {
    for (const entry of entries) el.classList.toggle("is-offscreen", !entry.isIntersecting);
  }).observe(el);
}

/**
 * Gesto horizontal de toque: chama `onNext` (para a esquerda) ou `onPrev`
 * (para a direita). A rolagem vertical segue livre (touch-action: pan-y).
 */
export function onSwipe(el: HTMLElement, onNext: () => void, onPrev: () => void) {
  let x0 = 0;
  let y0 = 0;
  let id: number | null = null;
  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch") return;
    id = e.pointerId;
    x0 = e.clientX;
    y0 = e.clientY;
  });
  const end = (e: PointerEvent) => {
    if (id !== e.pointerId) return;
    id = null;
    const dx = e.clientX - x0;
    const dy = e.clientY - y0;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) onNext();
    else onPrev();
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", () => {
    id = null;
  });
}
