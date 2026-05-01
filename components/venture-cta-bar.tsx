"use client";

import Link from "next/link";
import { CalendarHeart, PhoneCall } from "lucide-react";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { dispatchOpenVentureReservation } from "@/lib/reservation-events";

type Props = {
  phone: string;
  whatsapp: string;
  reservePrimary?: string;
  reserveSecondary?: string;
};

/**
 * Prominent Call / WhatsApp / reserve strip below the venture hero on every venue page.
 */
export function VentureCtaBar({
  phone,
  whatsapp,
  reservePrimary = "Book A Table",
  reserveSecondary = "Reserve in 30 seconds",
}: Props) {
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <section className="page-section border-b border-border/70 bg-linear-to-br from-primary/6 via-background to-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:py-10">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href={telHref}
            className="group flex min-h-16 items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <PhoneCall className="size-5" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Call Now
              </span>
              <span className="block truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                {phone}
              </span>
            </span>
          </Link>

          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-16 items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#25D366]/60 hover:shadow-md"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm">
              <WhatsAppIcon className="size-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                WhatsApp
              </span>
              <span className="block truncate text-base font-semibold text-foreground transition-colors group-hover:text-[#0d8a3f]">
                Chat with us instantly
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => dispatchOpenVentureReservation()}
            className="group flex min-h-16 items-center gap-4 rounded-2xl border border-primary bg-primary p-4 text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
              <CalendarHeart className="size-5" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-primary-foreground/85 uppercase">
                {reservePrimary}
              </span>
              <span className="block truncate text-base font-semibold">{reserveSecondary}</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
