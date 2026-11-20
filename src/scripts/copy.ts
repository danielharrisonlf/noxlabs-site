/**
 * Botões "Copiar e-mail" (contato, menu). Cada botão troca o próprio rótulo
 * e mostra o visto; se o navegador não deixar copiar, a mensagem de status
 * mais próxima explica o que fazer.
 */
export function initCopy() {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    const label = button.querySelector<HTMLElement>("[data-copy-label]");
    const original = label?.textContent ?? "";
    const done = button.dataset.copyDone ?? "Copiado";
    let timer: number | undefined;
    button.addEventListener("click", async () => {
      const scope = button.closest("[data-copy-scope]") ?? document;
      const status = scope.querySelector<HTMLElement>("[data-copy-status]");
      window.clearTimeout(timer);
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? "");
        button.dataset.copied = "true";
        if (label) label.textContent = done;
        if (status) status.textContent = "";
      } catch {
        button.dataset.copied = "false";
        if (status) status.textContent = "O navegador não permitiu copiar. Selecione o endereço e copie manualmente.";
      }
      timer = window.setTimeout(() => {
        delete button.dataset.copied;
        if (label) label.textContent = original;
      }, 2400);
    });
  }
}
