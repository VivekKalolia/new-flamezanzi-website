import { UtensilsCrossed } from "lucide-react";

/** Polished teaser for the “View Our Menu” sidebar card — centered, minimal chrome. */
export function MenuCardVisual() {
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/25"
      style={{ aspectRatio: "5 / 3", minHeight: "7.5rem", maxHeight: "10rem" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/[0.07] to-transparent"
      />
      <div className="relative z-1 flex flex-col items-center justify-center gap-2.5 px-4 py-6 text-center">
        <span className="flex size-13 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border/50">
          <UtensilsCrossed className="size-7 text-primary" strokeWidth={1.5} aria-hidden />
        </span>
        <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Browse menu
        </p>
      </div>
    </div>
  );
}
