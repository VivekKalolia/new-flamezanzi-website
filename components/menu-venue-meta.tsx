import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OpeningHoursRows } from "@/components/opening-hours-rows";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { Venture } from "@/lib/site-data";

type Props = {
  venture: Venture;
};

export function MenuVenueMeta({ venture }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="border border-border/70 py-4">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Opening Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <OpeningHoursRows hours={venture.hours} />
        </CardContent>
      </Card>

      <Card className="border border-border/70 py-4">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Phone className="size-4 shrink-0" /> {venture.contact.phone}
          </p>
          <p>{venture.contact.email}</p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" /> {venture.area}, {venture.city}
          </p>
          <Link
            href={`https://wa.me/${venture.contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary transition-colors hover:underline"
          >
            <WhatsAppIcon className="size-[1.05rem] shrink-0 text-[#25D366]" />
            WhatsApp
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
