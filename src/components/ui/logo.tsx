import Image from "next/image";

import { cn } from "@/lib/cn";

// Dimensões reais dos arquivos oficiais em public/brand (não alterados).
const MOTORDIESEL = { src: "/brand/motordiesel.png", width: 4145, height: 1072 };
// O selo vermelho ocupa as linhas 0–835; abaixo dele vem o slogan em tom claro (#ECF3FF),
// que some sobre fundo branco. A variante "badge" mostra só o selo, recortado por CSS.
const BADGE_HEIGHT = 840;
const PADOK = { src: "/brand/grupo-padok.png", width: 1937, height: 470 };

type Props = {
  className?: string;
  preload?: boolean;
  /** Carrega mesmo fora da tela (ex.: dentro de um bloco oculto no celular). */
  eager?: boolean;
};

/** Selo MotorDiesel sem o slogan — para fundos claros. */
export function MotorDieselBadge({ className, preload, eager }: Props) {
  return (
    <span
      className={cn("block overflow-hidden", className)}
      style={{ aspectRatio: `${MOTORDIESEL.width} / ${BADGE_HEIGHT}` }}
    >
      <Image
        {...MOTORDIESEL}
        alt="MotorDiesel"
        preload={preload}
        loading={eager ? "eager" : undefined}
        className="block h-auto w-full max-w-none"
      />
    </span>
  );
}

/** Logo completo, com o slogan — somente sobre fundos escuros. */
export function MotorDieselLogo({ className }: Props) {
  return (
    <Image
      {...MOTORDIESEL}
      alt="MotorDiesel — Do leve ao pesado, simplesmente a melhor"
      className={cn("h-auto", className)}
    />
  );
}

// Assinatura combinada Padok Peças | MotorDiesel, já proporcionada (fundo transparente,
// margens recortadas). O slogan é cinza-escuro: usar sobre fundos claros.
// WebP com 768px (o dobro da maior largura exibida, 384px); o PNG original (2944px) fica em
// public/brand como matriz.
const ASSINATURA = { src: "/brand/padok-motordiesel.webp", width: 768, height: 100 };

/** Assinatura Padok Peças | MotorDiesel — para o cabeçalho (fundo claro). */
export function PadokMotorDieselLogo({ className, preload }: Props) {
  return (
    <Image
      {...ASSINATURA}
      alt="Padok Peças | MotorDiesel — Do leve ao pesado, simplesmente a melhor"
      preload={preload}
      className={cn("h-auto", className)}
    />
  );
}

// Assinatura empilhada Padok Peças / MotorDiesel (fundo transparente). WebP com 640px (o dobro
// da maior largura exibida, 240px, com folga); o PNG de 1200px fica em public/brand como matriz.
// Versão monocromática branca (o vermelho vira branco e os vazados mostram o fundo), para o
// rodapé azul royal. A versão colorida segue em padok-motordiesel-vertical.webp.
const ASSINATURA_VERTICAL = {
  src: "/brand/padok-motordiesel-vertical-branco.webp",
  width: 640,
  height: 357,
};

/** Assinatura empilhada Padok Peças / MotorDiesel, em branco — para o rodapé (fundo azul). */
export function PadokMotorDieselStackedLogo({ className }: Props) {
  return (
    <Image
      {...ASSINATURA_VERTICAL}
      alt="Padok Peças | MotorDiesel — Do leve ao pesado, simplesmente a melhor"
      sizes="(min-width: 640px) 240px, 208px"
      className={cn("h-auto", className)}
    />
  );
}

export function GrupoPadokLogo({ className, preload }: Props) {
  return (
    <Image {...PADOK} alt="Grupo Padok" preload={preload} className={cn("h-auto", className)} />
  );
}
