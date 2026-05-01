import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { flamesContent } from "@/lib/site-data";

type Props = {
  halls: typeof flamesContent.eventHalls;
  phone: string;
  whatsapp: string;
};

function buildHallEnquiry(hallName: string) {
  return encodeURIComponent(
    `Hello Flames Restaurant, I'd like to enquire about hosting an event at ${hallName}. Could you share availability, pricing, and menu options? Thank you.`,
  );
}

/**
 * Two private event halls (the brief asked for these to be advertised)
 * as bookable spaces for weddings, birthdays, and other occasions.
 */
export function FlamesEventHalls({ halls, phone, whatsapp }: Props) {
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const waBase = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <section className="page-section bg-[#0b0f14] py-16 text-white md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12 max-w-3xl space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-white/60">
            Event spaces & private dining
          </p>
          <h2 className="font-heading text-3xl leading-tight md:text-4xl">
            Two private halls, ready for the moments that matter
          </h2>
          <p className="text-base leading-relaxed text-white/75">
            Host weddings, milestone birthdays, anniversaries, baby showers, and corporate
            functions in our dedicated private halls: full event management, custom menus,
            and a team that has hosted hundreds of celebrations across Dar es Salaam.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {halls.map((hall) => (
            <article
              key={hall.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/4 backdrop-blur transition-colors hover:border-white/30"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={hall.image}
                  alt={`${hall.name} at Flames Restaurant`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />
                {hall.badge ? (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground shadow">
                    <Users className="size-3.5" strokeWidth={2} aria-hidden />
                    {hall.badge}
                  </span>
                ) : null}
                <div className="absolute right-5 bottom-5 left-5">
                  <p className="text-xs tracking-[0.18em] uppercase text-white/70">
                    {hall.capacity}
                  </p>
                  <p className="mt-1 font-heading text-2xl text-white md:text-3xl">{hall.name}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
                <p className="text-sm leading-relaxed text-white/75">{hall.description}</p>

                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-white/55 uppercase">
                    Perfect for
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {hall.occasions.map((occasion) => (
                      <Badge
                        key={occasion}
                        variant="outline"
                        className="border-white/25 bg-white/10 font-normal text-white"
                      >
                        {occasion}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-white/55 uppercase">
                    What&rsquo;s included
                  </p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {hall.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-white/80"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          strokeWidth={2}
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
                  <Link
                    href={`${waBase}?text=${buildHallEnquiry(hall.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe57]"
                  >
                    <WhatsAppIcon className="size-[1.1rem]" />
                    Enquire on WhatsApp
                  </Link>
                  <Link
                    href={phoneHref}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <Phone className="size-4" />
                    Call to book
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-heading text-xl">Planning something special?</p>
            <p className="mt-1 text-sm text-white/70">
              Tell us your guest count, occasion, and date; we&rsquo;ll send a custom
              proposal within one business day.
            </p>
          </div>
          <Link
            href={`${waBase}?text=${encodeURIComponent("Hello Flames Restaurant, I'd like to plan a private event. Could you share availability and packages? Thank you.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 self-stretch rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:self-auto"
          >
            Plan my event <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
