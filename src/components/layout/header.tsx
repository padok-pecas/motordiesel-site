"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { InstagramIcon } from "@/components/ui/brand-icons";
import { GrupoPadokLogo, MotorDieselBadge } from "@/components/ui/logo";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

import { navItems } from "./nav-items";

const instagramUrl = site.social.instagram;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-[border-color,box-shadow] duration-300",
        scrolled
          ? "border-line shadow-[0_8px_30px_-20px_rgba(18,20,23,0.35)]"
          : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-18 lg:px-10">
        {/* Assinatura: Grupo Padok | MotorDiesel */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <GrupoPadokLogo preload className="w-[4.5rem] sm:w-24" />
          <span className="h-8 w-px bg-line sm:h-9" aria-hidden />
          <a href="#inicio" aria-label="MotorDiesel — início">
            <MotorDieselBadge preload className="w-32 sm:w-44" />
          </a>
        </div>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 text-sm font-semibold text-ink/80 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex xl:ml-0">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da MotorDiesel (abre em nova aba)"
              title="Instagram da MotorDiesel"
              className="flex size-11 items-center justify-center text-ink/70 transition-colors hover:text-brand"
            >
              <InstagramIcon className="size-5" />
            </a>
          )}
          <StoreButton label="Loja no Mercado Livre" size="sm" />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-white lg:top-18 xl:hidden"
      >
        <nav aria-label="Menu mobile" className="px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-line">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display-wide text-2xl font-bold text-ink uppercase italic"
                >
                  {item.label}
                  <span className="text-sm font-semibold text-brand not-italic">0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <StoreButton fullWidth />
            <WhatsAppButton variant="dark" fullWidth />
          </div>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da MotorDiesel (abre em nova aba)"
              className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-ink/80 hover:text-brand"
            >
              <InstagramIcon className="size-5 text-brand" />
              Siga a MotorDiesel no Instagram
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
