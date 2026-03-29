/** Dispatched to open the venture reservation dialog from anywhere (e.g. hero “Reserve Table”). */
export const OPEN_VENTURE_RESERVATION = "flamezanzi:open-venture-reservation";

export function dispatchOpenVentureReservation() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_VENTURE_RESERVATION));
}
