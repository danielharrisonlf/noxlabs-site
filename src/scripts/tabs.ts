/**
 * Transforma uma lista de links âncora + painéis num conjunto de abas
 * acessível (padrão WAI-ARIA, ativação automática). Sem JavaScript, os links
 * levam aos painéis, todos visíveis: o conteúdo nunca depende do script.
 *
 * Marcação esperada dentro de `root`:
 *   [data-tablist] > li > a[data-tab="id"][href="#painel"]
 *   [data-panel="id"]#painel
 */
export type TabsOptions = {
  /** Orientação anunciada; pode depender de uma media query. As setas dos dois eixos funcionam sempre. */
  orientation?: "horizontal" | "vertical" | MediaQueryList;
  /** Chamado a cada troca, inclusive na primeira seleção. */
  onChange?: (id: string, index: number, source: "init" | "user" | "api") => void;
};

export type TabsController = {
  select: (index: number, source?: "user" | "api", focus?: boolean) => void;
  current: () => number;
  count: number;
};

export function enhanceTabs(root: HTMLElement, options: TabsOptions = {}): TabsController | null {
  const list = root.querySelector<HTMLElement>("[data-tablist]");
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>("[data-tab]")];
  const panels = tabs.map((tab) => root.querySelector<HTMLElement>(`[data-panel="${tab.dataset.tab}"]`));
  if (!list || tabs.length === 0 || panels.some((p) => p === null)) return null;

  const orientation = options.orientation ?? "horizontal";
  list.setAttribute("role", "tablist");
  const announce = () => {
    const value = typeof orientation === "string" ? orientation : orientation.matches ? "vertical" : "horizontal";
    list.setAttribute("aria-orientation", value);
  };
  announce();
  if (typeof orientation !== "string") orientation.addEventListener("change", announce);
  for (const li of list.querySelectorAll(":scope > li")) li.setAttribute("role", "presentation");

  let active = 0;

  tabs.forEach((tab, i) => {
    const panel = panels[i] as HTMLElement;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    tab.id ||= `${panel.id}-tab`;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
  });

  const select = (index: number, source: "init" | "user" | "api" = "api", focus = false) => {
    active = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const on = i === active;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      (panels[i] as HTMLElement).hidden = !on;
    });
    if (focus) tabs[active].focus();
    root.dataset.active = tabs[active].dataset.tab ?? "";
    options.onChange?.(tabs[active].dataset.tab ?? "", active, source);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      select(i, "user");
    });
    tab.addEventListener("keydown", (event) => {
      let target: number | null = null;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") target = i - 1;
      else if (event.key === "ArrowDown" || event.key === "ArrowRight") target = i + 1;
      else if (event.key === "Home") target = 0;
      else if (event.key === "End") target = tabs.length - 1;
      if (target === null) return;
      event.preventDefault();
      select(target, "user", true);
    });
  });

  root.dataset.enhanced = "true";
  select(0, "init");

  return { select: (index, source = "api", focus = false) => select(index, source, focus), current: () => active, count: tabs.length };
}
