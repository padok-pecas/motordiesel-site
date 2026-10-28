"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { BrandStripe } from "@/components/ui/brand-stripe";
import { PadokMotorDieselLogo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

import { NavDropdown } from "./nav-dropdown";
import { isNavGroup, navItems } from "./nav-items";

/**
 * Parte interativa do cabeçalho (menu mobile, sombra ao rolar, item atual). Recebe os dados e
 * os botões dos canais já prontos do `Header` (servidor): assim a configuração do site e a
 * validação com zod não vão para o JavaScript do navegador.
 */
/** Ícones dos canais no cabeçalho, na ordem do layout aprovado. */
const socialChannels = [
  { key: "whatsapp", name: "WhatsApp", Icon: WhatsAppIcon },
  { key: "instagram", name: "Instagram", Icon: InstagramIcon },
  { key: "facebook", name: "Facebook", Icon: FacebookIcon },
] as const;

type SocialLinks = Record<(typeof socialChannels)[number]["key"], string | null>;

export function HeaderClient({
  socialLinks,
  storeCta,
  mobileCtas,
}: {
  /** Endereços oficiais; canais sem endereço (`null`) não aparecem. */
  socialLinks: SocialLinks;
  /** Botão da loja no cabeçalho (desktop). */
  storeCta: React.ReactNode;
  /** Botões dos canais no menu mobile. */
  mobileCtas: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Marca no menu a página interna aberta (/como-comprar, /sobre...).
  const pathname = usePathname();
  const current = (href: string) => (href === pathname ? "page" : undefined);
  const instagramUrl = socialLinks.instagram;

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
        {/* Assinatura: Padok Peças | MotorDiesel */}
        <Link href="/" aria-label="MotorDiesel — início" className="shrink-0">
          <PadokMotorDieselLogo preload className="w-60 sm:w-80 lg:w-96" />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-7 2xl:gap-9">
            {navItems.map((item) =>
              isNavGroup(item) ? (
                <NavDropdown key={item.label} group={item} pathname={pathname} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current(item.href)}
                    className="relative py-2 text-sm font-medium whitespace-nowrap text-ink/85 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100 aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex xl:ml-0">
          <ul className="flex items-center" aria-label="Canais da MotorDiesel">
            {socialChannels.map(({ key, name, Icon }) =>
              socialLinks[key] ? (
                <li key={key}>
                  <a
                    href={socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} da MotorDiesel (abre em nova aba)`}
                    title={`${name} da MotorDiesel`}
                    className="flex size-10 items-center justify-center text-ink transition-colors hover:text-brand"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ) : null,
            )}
          </ul>
          {storeCta}
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
      {/* Faixa tricolor da marca na base do cabeçalho */}
      <BrandStripe className="absolute inset-x-0 -bottom-px h-1.5" />

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-white lg:top-18 xl:hidden"
      >
        <nav aria-label="Menu mobile" className="px-4 pt-4 pb-10 sm:px-6">
          <ul className="divide-y divide-line">
            {/* No celular os grupos aparecem abertos (título + links), sem submenu escondido. */}
            {navItems.map((item) =>
              isNavGroup(item) ? (
                <li key={item.label} className="py-3">
                  <p className="text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                    {item.label}
                  </p>
                  <ul className="mt-1">
                    {item.items.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={current(child.href)}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center border-l-2 border-line pl-4 font-display-wide text-xl font-bold text-ink uppercase aria-[current=page]:border-brand aria-[current=page]:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current(item.href)}
                    onClick={() => setOpen(false)}
                    className="flex items-center py-4 font-display-wide text-2xl font-bold text-ink uppercase aria-[current=page]:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div className="mt-8 grid gap-3">{mobileCtas}</div>
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
