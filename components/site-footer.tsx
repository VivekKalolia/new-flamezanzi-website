import Link from "next/link";
import Image from "next/image";
import { Building2, Hotel, Leaf, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { BRAND_WORDMARK, company, navLinks, ventures } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#17130f] py-14 text-neutral-200">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Image
            src={company.logo}
            alt={`${BRAND_WORDMARK} logo`}
            width={200}
            height={44}
            className="h-10 w-auto"
          />
          <p className="max-w-md text-sm leading-relaxed text-neutral-300/80">
            {company.elevatorPitch}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Quick Links</p>
          <div className="space-y-2 text-neutral-300/85">
            {navLinks.map((link) => (
              <p key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Our Ventures</p>
          <div className="space-y-2 text-neutral-300/85">
            {ventures.map((venture) => (
              <p key={venture.slug}>
                <Link href={`/ventures/${venture.slug}`}>{venture.name}</Link>
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white">Contact</p>
          <div className="space-y-2 text-neutral-300/85">
            <p className="flex items-center gap-2">
              <Building2 className="size-4" /> <span>{company.contact.hqFull}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4" /> {company.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <Hotel className="size-4" /> Restaurants, Cafe & Hotel
            </p>
            <p className="flex items-center gap-2">
              <Leaf className="size-4" /> Premium Hospitality Since {company.founded}
            </p>
          </div>
          <Link
            href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm text-white transition-colors hover:bg-white/10"
          >
            <WhatsAppIcon className="size-[1.05rem] text-[#25D366]" />
            WhatsApp
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/15 px-6 pt-6 text-xs text-neutral-400">
        <p>© {new Date().getFullYear()} {company.name}.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
