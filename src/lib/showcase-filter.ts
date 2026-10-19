import type { ShowcaseLine } from "@/content/schema";

// Canal entre os links de outras seções e o filtro da vitrine (#destaques), que é estado de
// cliente. O link continua sendo uma âncora comum: sem JavaScript, só rola até a vitrine.
const EVENT = "motordiesel:vitrine-filtro";

/** Pede à vitrine que mostre só a linha informada. */
export function requestShowcaseFilter(line: ShowcaseLine) {
  window.dispatchEvent(new CustomEvent<ShowcaseLine>(EVENT, { detail: line }));
}

/** Escuta os pedidos de filtro; devolve a função que cancela a escuta. */
export function onShowcaseFilter(handler: (line: ShowcaseLine) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<ShowcaseLine>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
