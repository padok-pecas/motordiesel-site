import { cn } from "@/lib/cn";

/** Selo que identifica conteúdo provisório/demonstrativo. */
export function DemoBadge({
  children = "Demonstrativo",
  tone = "light",
  className,
}: {
  children?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-1 text-[0.68rem] font-semibold tracking-wider uppercase",
        tone === "light"
          ? "border-steel/50 bg-white/90 text-steel"
          : "border-white/30 bg-white/5 text-white/70",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-amber-500" aria-hidden />
      {children}
    </span>
  );
}
