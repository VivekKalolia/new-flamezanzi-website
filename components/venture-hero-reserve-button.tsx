"use client";

import { dispatchOpenVentureReservation } from "@/lib/reservation-events";

export function VentureHeroReserveButton() {
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
