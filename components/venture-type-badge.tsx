import type { LucideIcon } from "lucide-react";
import { Coffee, Hotel, UtensilsCrossed } from "lucide-react";

import type { VentureType } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const typeConfig: Record<VentureType, { label: string; Icon: LucideIcon }> = {
  restaurant: { label: "Restaurant", Icon: UtensilsCrossed },
  cafe: { label: "Cafe & bakery", Icon: Coffee },
  hotel: { label: "Hotel", Icon: Hotel },
};

type Props = {
  type: VentureType;
  /** Venture theme colour (hex), used as a subtle accent */
  accentColor: string;
  /** `onDark` for hero overlays; `default` for cards */
  variant?: "default" | "onDark";
  className?: string;
};

export function VentureTypeBadge({ type, accentColor, variant = "default", className }: Props) {
  const { label, Icon } = typeConfig[type];

  if (variant === "onDark") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/11 px-0.5 py-0.5 pr-3 text-[10px] font-semibold tracking-[0.12em] text-white uppercase shadow-[0_1px_12px_rgba(0,0,0,0.2)] backdrop-blur-md sm:gap-2 sm:px-1 sm:py-1 sm:pr-4 sm:text-[11px] sm:tracking-[0.16em]",
          className,
        )}
      >
        <span
          className="flex size-7 items-center justify-center rounded-full bg-black/35 ring-1 ring-white/25 sm:size-8"
          style={{ color: accentColor }}
        >
          <Icon className="size-3.5 drop-shadow-sm sm:size-4" strokeWidth={2} aria-hidden />
        </span>
        <span className="text-white/95">{label}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-border/70 py-0.5 pr-3 pl-0.5 text-[10px] font-semibold tracking-[0.11em] text-foreground/90 uppercase shadow-sm sm:gap-2 sm:py-1 sm:pr-3.5 sm:pl-1 sm:text-[11px] sm:tracking-[0.14em]",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      <span
        className="relative z-10 flex size-7 items-center justify-center rounded-full border border-border/50 bg-card/95 shadow-sm ring-1 ring-black/4 sm:size-8 dark:ring-white/10"
        style={{ color: accentColor }}
      >
        <Icon className="size-3.5 sm:size-4" strokeWidth={2} aria-hidden />
      </span>
      <span className="relative z-10">{label}</span>
    </span>
  );
}
