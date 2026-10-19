"use client";

import { useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type NetworkInfo = { connection?: { saveData?: boolean } };

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Só reproduz quando o visitante não pediu movimento reduzido nem economia de dados.
function canPlay() {
  const saveData = (navigator as Navigator & NetworkInfo).connection?.saveData === true;
  return !saveData && !window.matchMedia(REDUCED_MOTION).matches;
}

type Props = { src: string; className?: string };

/**
 * Vídeo decorativo de fundo: sem áudio, em loop, sem controles e fora da árvore de
 * acessibilidade. Não vai no HTML estático — só entra após a hidratação, se permitido —,
 * então quem prefere movimento reduzido ou economiza dados nem baixa o arquivo.
 * Enquanto o primeiro quadro não toca (ou se a reprodução falhar/for bloqueada), o vídeo
 * fica transparente e o fundo que estiver atrás dele aparece no lugar.
 */
export function BackgroundVideo({ src, className }: Props) {
  const allowed = useSyncExternalStore(subscribe, canPlay, () => false);
  return allowed ? <Player src={src} className={className} /> : null;
}

function Player({ src, className }: Props) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      aria-hidden
      onPlaying={() => setPlaying(true)}
      onError={() => setFailed(true)}
      className={cn(
        "pointer-events-none object-cover transition-opacity duration-1000 ease-out",
        playing ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
