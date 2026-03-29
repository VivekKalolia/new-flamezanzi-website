"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

/** Monday = 0 … Sunday = 6, matching `WEEK_DAYS` order. */
function mondayFirstIndexFromDate(d: Date): number {
  return (d.getDay() + 6) % 7;
}

type Props = {
  hours: string;
};

export function OpeningHoursRows({ hours }: Props) {
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    setTodayIndex(mondayFirstIndexFromDate(new Date()));
  }, []);

  return (
    <div className="space-y-0 text-sm">
      {WEEK_DAYS.map((day, i) => {
        const isToday = todayIndex !== null && i === todayIndex;
        return (
          <div
            key={day}
            className={cn(
              "flex items-center justify-between border-b border-border/50 py-2 last:border-0",
              isToday &&
                "-mx-2 rounded-md border-b-0 bg-primary/10 px-2 py-2.5 ring-1 ring-primary/15 last:border-b-0",
            )}
          >
            <span className={cn("flex items-center gap-2", isToday && "font-medium text-foreground")}>
              {day}
              {isToday ? (
                <span className="rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
                  Today
                </span>
              ) : null}
            </span>
            <span className={cn("tabular-nums", isToday ? "font-medium text-foreground" : "text-muted-foreground")}>
              {hours}
            </span>
          </div>
        );
      })}
    </div>
  );
}
