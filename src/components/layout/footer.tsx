import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { PadokMotorDieselStackedLogo } from "@/components/ui/logo";
import { StoreButton } from "@/components/ui/store-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { site } from "@/content/site";
import { getWhatsappUrl } from "@/lib/store";
import { cn } from "@/lib/cn";

import { footerNavItems } from "./nav-items";

type ContactLine = {
  icon: LucideIcon | typeof WhatsAppIcon;
  label: string;
  value: string;
  href?: string;
};

/** Formata "5599912345678" como "(99) 91234-5678". */
function formatWhatsapp(digits: string) {
  const local = digits.slice(2);
  const ddd = local.slice(0, 2);
  const number = local.slice(2);
  return `(${ddd}) ${number.slice(0, -4)}-${number.slice(-4)}`;
}

// Só entram os campos preenchidos em src/content/site.ts — nada de contato inventado.
function contactLines(): ContactLine[] {
  const { contact } = site;
  const whatsappUrl = getWhatsappUrl();
  const lines: ContactLine[] = [];
  if (contact.address) lines.push({ icon: MapPin, label: "Endereço", value: contact.address });
  if (contact.phone)
    lines.push({
      icon: Phone,
      label: "Telefone",
      value: contact.phone,
      href: `tel:+55${contact.phone.replace(/\D/g, "")}`,
    });
  if (contact.whatsapp && whatsappUrl)
    lines.push({
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: formatWhatsapp(contact.whatsapp),
      href: whatsappUrl,
    });
  if (contact.email)
    lines.push({
      icon: Mail,
      label: "E-mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
    });
  if (contact.hours) lines.push({ icon: Clock, label: "Horário", value: contact.hours });
  return lines;
}

const socialLinks = [
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
  { key: "facebook", label: "Facebook", icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", icon: TikTokIcon },
  { key: "youtube", label: "YouTube", icon: YouTubeIcon },
] as const;

/** ["telefone", "horário"] → "Telefone e horário". */
function pendingText(items: string[]) {
  const last = items.at(-1) ?? "";
  const text = items.length > 1 ? `${items.slice(0, -1).join(", ")} e ${last}` : last;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white uppercase">
      {children}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const lines = contactLines();
  // Campos de contato ainda não informados, para avisar sem deixar linhas quebradas.
  const pending = [
    !site.contact.address && "endereço",
    !site.contact.phone && "telefone",
    !site.contact.hours && "horário de atendimento",
  ].filter((item): item is string => Boolean(item));
  const socials = socialLinks.flatMap((social) => {
    const href = site.social[social.key];
    return href ? [{ ...social, href }] : [];
  });
  // Com o botão flutuante ativo, a barra inferior ganha espaço para não ficar coberta.
  const hasFloat = getWhatsappUrl() !== null;

  return (
    <footer className="relative bg-ink text-white/70">
      <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden />

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_1.1fr_1fr] lg:gap-8 lg:py-14">
        <div>
          <PadokMotorDieselStackedLogo className="w-52 max-w-full sm:w-60" />
        </div>

        <nav aria-label="Rodapé">
          <ColumnTitle>Navegação</ColumnTitle>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-0.5 text-sm">
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div id="contato">
          <ColumnTitle>Contato</ColumnTitle>
          <ul className="mt-4 grid gap-3 text-sm">
            {!site.contact.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>
                  {site.city} – {site.state}
                </span>
              </li>
            )}
            {lines.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>
                  <span className="sr-only">{label}: </span>
                  {href ? (
                    <a href={href} className="text-white/85 hover:text-white">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </span>
              </li>
            ))}
          </ul>
          {pending.length > 0 && (
            <p className="mt-3 text-xs leading-relaxed text-white/50">
              {pendingText(pending)} em configuração.
            </p>
          )}
        </div>

        <div>
          <ColumnTitle>Canais digitais</ColumnTitle>
          <div className="mt-4 grid max-w-xs gap-3">
            <StoreButton label="Loja no Mercado Livre" size="sm" variant="light" fullWidth />
            <WhatsAppButton size="sm" variant="light" fullWidth />
          </div>
          {socials.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs text-white/50">Siga a MotorDiesel</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1" aria-label="Redes sociais">
                {socials.map(({ key, label, icon: Icon, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} da MotorDiesel (abre em nova aba)`}
                      className="group inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                    >
                      <span className="flex size-8 items-center justify-center border border-white/15 transition-colors group-hover:border-brand group-hover:bg-brand group-focus-visible:border-brand">
                        <Icon className="size-4" />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container
          className={cn(
            "flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between",
            hasFloat && "pb-20 sm:pr-20 sm:pb-5",
          )}
        >
          <p>
            © {year} {site.legalName ?? site.name}. Todos os direitos reservados.
            {site.cnpj && <> CNPJ {site.cnpj}.</>}
          </p>
        </Container>
      </div>
    </footer>
  );
}
