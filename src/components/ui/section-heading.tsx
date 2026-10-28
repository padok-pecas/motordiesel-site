import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
          tone === "dark" ? "text-brand-on-dark" : "text-brand",
          align === "center" && "justify-center",
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 font-display-wide text-3xl leading-[1.05] font-extrabold uppercase sm:text-4xl lg:text-5xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "dark" ? "text-white/70" : "text-ink",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
