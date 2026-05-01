import type { Metadata } from "next";

import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy | FlameZanzi",
  description: `Privacy policy for ${company.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-20 text-foreground motion-safe:animate-fade-up md:py-24">
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
        Legal
      </p>
      <h1 className="mt-3 font-heading text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: January 2026
      </p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-heading text-2xl text-foreground">
            Information We Collect
          </h2>
          <p className="mt-2">
            We may collect personal information submitted through contact forms,
            reservation requests, and order interactions, including name, email,
            phone number, and inquiry details.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">
            How We Use Information
          </h2>
          <p className="mt-2">
            Information is used to respond to inquiries, process service
            requests, improve operations, and maintain service quality across
            FlameZanzi ventures.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">
            Data Sharing
          </h2>
          <p className="mt-2">
            We do not sell personal data. Information may be processed with
            service providers required for operations, communication, and
            analytics under appropriate safeguards.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl text-foreground">Contact</h2>
          <p className="mt-2">
            For privacy inquiries, contact {company.name} at{" "}
            {company.contact.email} or {company.contact.phone}.
          </p>
        </section>
      </div>
    </main>
  );
}
