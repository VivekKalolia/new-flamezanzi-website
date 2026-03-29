"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  numeric: number;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
};

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function AnimatedStat({ value, numeric, label, className, valueClassName, labelClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  // Determine suffix (e.g. "K+" from "50K+", "+" from "120+")
  const suffix = value.replace(/[0-9,]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const startTime = performance.now();
    // For large numbers (50000) we display in the readable unit (50)
    const displayTarget = numeric >= 1000 ? Math.round(numeric / 1000) : numeric;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setDisplayed(Math.round(eased * displayTarget));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, numeric]);

  // Format the number with appropriate suffix
  function format() {
    if (numeric >= 1000) {
      return `${displayed}K${suffix.replace("K", "")}`;
    }
    return `${displayed}${suffix}`;
  }

  return (
    <div ref={ref} className={className ?? "text-center"}>
      <p className={valueClassName ?? "font-heading text-4xl font-semibold tabular-nums"}>{format()}</p>
      <p className={labelClassName ?? "mt-2 text-xs tracking-[0.18em] uppercase opacity-80"}>{label}</p>
    </div>
  );
}
