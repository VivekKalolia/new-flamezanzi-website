"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Venture } from "@/lib/site-data";

type Props = {
  venture: Venture;
};

function parseHours(hours: string) {
  if (hours.startsWith("24h")) {
    return { open: "00:00", close: "23:59" };
  }
  // Match simple HH:MM-HH:MM pattern
  const match = hours.match(/(\d{2}:\d{2})[–-](\d{2}:\d{2})/);
  if (match) {
    return { open: match[1], close: match[2] };
  }
  return { open: "00:00", close: "23:59" };
}

function toMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function toTimeLabel(totalMinutes: number) {
  const hour = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minute = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

export function VentureReservation({ venture }: Props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("2");

  const timeOptions = useMemo(() => {
    const parsed = parseHours(venture.hours);
    const open = toMinutes(parsed.open);
    const close = toMinutes(parsed.close);
    const latestBooking = Math.max(open, close - 120);

    const options: string[] = [];
    for (let slot = open; slot <= latestBooking; slot += 60) {
      options.push(toTimeLabel(slot));
    }
    return options;
  }, [venture.hours]);

  const minDate = new Date().toISOString().split("T")[0];

  const whatsappMessage = encodeURIComponent(
    `Hello ${venture.name}, I'd like to request a reservation.\nDate: ${date}\nTime: ${time}\nParty size: ${partySize}\nThank you.`
  );

  const whatsappLink = `https://wa.me/${venture.contact.whatsapp.replace(/\D/g, "")}?text=${whatsappMessage}`;

  return (
    <Dialog>
      <DialogTrigger render={<Button size="lg" />}>
        Request Reservation
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservation Request - {venture.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reservation-date">Date</Label>
            <Input
              id="reservation-date"
              type="date"
              min={minDate}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <Select value={time} onValueChange={(value) => setTime(value ?? "")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reservation-party">Party Size</Label>
            <Input
              id="reservation-party"
              value={partySize}
              onChange={(event) => setPartySize(event.target.value)}
              type="number"
              min={1}
              max={20}
            />
          </div>

          <Link
            href={whatsappLink}
            target="_blank"
            className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors ${
              date && time
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "pointer-events-none bg-muted text-muted-foreground"
            }`}
          >
            <WhatsAppIcon className="size-[1.05rem] text-[#25D366]" />
            Send via WhatsApp
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
