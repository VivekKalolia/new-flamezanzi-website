import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import type { Venture } from "@/lib/site-data";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Props = {
  venture: Venture;
};

export function MenuVenueMeta({ venture }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card className="border border-border/70 py-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock3 className="size-4 text-primary" />
            Opening Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          {weekDays.map((day) => (
            <div key={day} className="flex items-center justify-between text-muted-foreground">
              <span>{day}</span>
              <span>{venture.hours}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-border/70 py-4">
        <CardHeader>
          <CardTitle className="text-lg">Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Phone className="size-4 shrink-0" />
            {venture.contact.phone}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            {venture.area}, {venture.city}
          </p>
          <Link
            href={`https://wa.me/${venture.contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <WhatsAppIcon className="size-[1.05rem] text-[#25D366]" />
            WhatsApp
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
