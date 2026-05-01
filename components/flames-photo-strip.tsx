import Image from "next/image";

import type { flamesContent } from "@/lib/site-data";

type Props = {
  collage: typeof flamesContent.heroCollage;
};

/**
 * Visual photo strip rendered immediately under the Flames hero.
 * Breaks up the long text sections with food / ambiance / staff imagery.
 */
export function FlamesPhotoStrip({ collage }: Props) {
  if (!collage.length) return null;

  return (
    <section className="page-section border-b border-border/70 bg-card">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
        <div className="mb-7 flex flex-col gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              Inside Flames
            </p>
            <h2 className="font-heading text-3xl md:text-4xl">A look at the room, the plates, and the people</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Real photographs from our Masaki dining room: placeholder selections from our gallery; final brand imagery will be swapped in as it&rsquo;s captured.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {collage.map((item, index) => (
            <figure
              key={`${item.src}-${index}`}
              className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-muted ${
                index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-4/5" : "aspect-4/3"
              }`}
            >
              <Image
                src={item.src}
                alt={`Flames Restaurant: ${item.label.toLowerCase()}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent p-3 md:p-4">
                <figcaption className="text-[10px] tracking-[0.18em] uppercase text-white/85 sm:text-[11px]">
                  {item.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
