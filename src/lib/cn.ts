/** Junta classes condicionais (sem dependência externa). */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
