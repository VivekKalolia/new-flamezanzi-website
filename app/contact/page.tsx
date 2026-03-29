import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Send } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { company, ventures } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact | FlameZanzi",
  description: "Get in touch with FlameZanzi Restaurant Ltd. for partnerships and venue inquiries.",
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="page-section border-b border-border/70 bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Contact</p>
          <h1 className="mt-3 font-heading text-5xl">Let’s Start a Conversation</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">
            Reach FlameZanzi headquarters for partnerships, events, and group-wide hospitality inquiries.
          </p>
        </div>
      </section>

      <section className="page-section mx-auto grid w-full max-w-6xl gap-6 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <Card className="border border-border/70 py-5">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <Card className="border border-border/70 py-5">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Headquarters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-4" /> {company.contact.hq}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4" /> {company.contact.phone}
            </p>
            <p className="flex items-center gap-2">
              <Send className="size-4" /> {company.contact.email}
            </p>
            <Link
              href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <WhatsAppIcon className="size-[1.05rem] text-[#25D366]" />
              WhatsApp
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="page-section bg-secondary/40 py-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="font-heading text-4xl">Our Venture Locations</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {ventures.map((venture) => (
              <Card key={venture.slug} className="border border-border/70 py-4">
                <CardHeader>
                  <CardTitle>{venture.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    {venture.area}, {venture.city}
                  </p>
                  <p>{venture.contact.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border/70">
            <iframe
              title="FlameZanzi HQ map"
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-6.7924,39.2083&z=12&output=embed"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
