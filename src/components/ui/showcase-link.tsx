"use client";

import type { ShowcaseLine } from "@/content/schema";
import { requestShowcaseFilter } from "@/lib/showcase-filter";

/** Âncora para a vitrine que, ao clicar, já aplica o filtro de linha. */
export function ShowcaseLink({
  line,
  ...props
}: { line: ShowcaseLine } & Omit<React.ComponentProps<"a">, "href" | "onClick">) {
  return <a href="#destaques" onClick={() => requestShowcaseFilter(line)} {...props} />;
}
