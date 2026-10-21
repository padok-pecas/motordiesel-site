import { showcaseLines, type ShowcaseLine } from "@/content/showcase";

// Canal entre os links de outras seções e o filtro da vitrine (#destaques), que é estado de
// cliente. A linha vai no próprio endereço ("#destaques-leve"): sem JavaScript o link só rola
// até a vitrine, e um clique feito antes da hidratação é aplicado assim que ela termina.
const EVENT = "motordiesel:vitrine-filtro";

/** Âncora da vitrine já filtrada pela linha (existe na seção #destaques). */
export function showcaseAnchor(line: ShowcaseLine) {
  return `destaques-${line}`;
}

/** Linha pedida no endereço atual (ex.: "#destaques-pesada"), se houver. */
export function lineFromHash(hash: string): ShowcaseLine | null {
  return showcaseLines.find((line) => hash === `#${showcaseAnchor(line)}`) ?? null;
}

/** Pede à vitrine que mostre só a linha informada. */
export function requestShowcaseFilter(line: ShowcaseLine) {
  window.dispatchEvent(new CustomEvent<ShowcaseLine>(EVENT, { detail: line }));
}

/**
 * Aplica a linha pedida pelo endereço (agora e a cada mudança) e pelos cliques nos links;
 * devolve a função que cancela a escuta.
 */
export function onShowcaseFilter(handler: (line: ShowcaseLine) => void) {
  const fromHash = () => {
    const line = lineFromHash(window.location.hash);
    if (line) handler(line);
  };
  const fromEvent = (event: Event) => handler((event as CustomEvent<ShowcaseLine>).detail);
  fromHash();
  window.addEventListener("hashchange", fromHash);
  window.addEventListener(EVENT, fromEvent);
  return () => {
    window.removeEventListener("hashchange", fromHash);
    window.removeEventListener(EVENT, fromEvent);
  };
}
