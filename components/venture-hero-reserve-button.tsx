"use client";

import { CalendarHeart } from "lucide-react";

import { dispatchOpenVentureReservation } from "@/lib/reservation-events";

type Props = {
  /** When true, renders the larger gold-trim CTA used on Flames. */
  prominent?: boolean;
};

export function VentureHeroReserveButton({ prominent = false }: Props) {
  if (prominent) {
    return (
      <button
        type="button"
        onClick={() => dispatchOpenVentureReservation()}
        className="inline-flex h-12 items-center gap-2.5 rounded-xl border-2 border-white/80 bg-white/10 px-6 text-base font-semibold text-white shadow-lg shadow-black/20 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-primary hover:shadow-xl"
      >
        <CalendarHeart className="size-5" strokeWidth={2} />
        Reserve Table
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => dispatchOpenVentureReservation()}
      className="inline-flex h-10 items-center rounded-lg border border-white/40 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10"
    >
      Reserve Table
    </button>
  );
}
