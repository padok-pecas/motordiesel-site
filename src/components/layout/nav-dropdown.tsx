"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";

import type { NavGroup } from "./nav-items";

const triggerClasses =
  "relative inline-flex items-center gap-1 py-2 text-sm whitespace-nowrap font-medium text-ink/85 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100";

/**
 * Menu suspenso do cabeçalho (desktop). Botão com `aria-expanded` que abre uma lista de links:
 * funciona com clique, toque e teclado; fecha com Esc (devolvendo o foco ao botão), com clique
 * fora ou quando o foco sai do menu.
 */
export function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const active = group.items.some((item) => item.href === pathname);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          triggerClasses,
          (open || active) && "text-ink after:scale-x-100",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
        )}
      >
        {group.label}
        <ChevronDown
          className={cn("size-4 text-brand transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="absolute top-full left-1/2 z-10 mt-3 min-w-56 -translate-x-1/2 border-t-2 border-brand bg-white py-2 shadow-[0_24px_50px_-24px_rgba(18,20,23,0.45)] ring-1 ring-line"
      >
        {group.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.href === pathname ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center px-5 text-sm font-semibold whitespace-nowrap text-ink/80 transition-colors hover:bg-mist hover:text-brand focus-visible:bg-mist focus-visible:text-brand focus-visible:outline-none aria-[current=page]:text-brand"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
