"use client";

import type { ShowcaseLine } from "@/content/schema";
import { requestShowcaseFilter, showcaseAnchor } from "@/lib/showcase-filter";

/** Âncora para a vitrine que já aplica o filtro de linha (pelo endereço e pelo clique). */
export function ShowcaseLink({
  line,
  ...props
}: { line: ShowcaseLine } & Omit<React.ComponentProps<"a">, "href" | "onClick">) {
  return (
    <a href={`#${showcaseAnchor(line)}`} onClick={() => requestShowcaseFilter(line)} {...props} />
  );
}
