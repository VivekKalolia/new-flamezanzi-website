import type { Metadata } from "next";

import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms of Service | FlameZanzi",
  description: "Terms of service for FlameZanzi Restaurant Ltd.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20 text-foreground motion-safe:animate-fade-up md:py-24">
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Legal</p>
      <h1 className="mt-3 font-heading text-5xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-heading text-2xl text-foreground">Use of Website</h2>
          <p className="mt-2">
            This website provides information about FlameZanzi ventures, offerings, and contact channels.
            By using the site, you agree to lawful and respectful use of all content and features.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Reservations and Orders</h2>
          <p className="mt-2">
            Reservation and order requests submitted through external channels (such as WhatsApp) are
            subject to venue availability and direct confirmation from the respective venture.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Intellectual Property</h2>
          <p className="mt-2">
            All branding, designs, and content on this website are owned by {company.name} unless otherwise
            stated and may not be reused without permission.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Contact</h2>
          <p className="mt-2">
            For terms inquiries, contact {company.name} at {company.contact.email} or {company.contact.phone}.
          </p>
        </section>
      </div>
    </main>
  );
}
