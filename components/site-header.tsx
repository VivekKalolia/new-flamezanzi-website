"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { company, navLinks } from "@/lib/site-data";

function navLinkClass(isActive: boolean) {
  return isActive ? "text-white" : "text-white/70 hover:text-white";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={company.logo}
            alt="FlameZanzi logo"
            width={200}
            height={44}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${navLinkClass(pathname === link.href)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
        >
          Contact Us
        </Link>

        {/* Mobile hamburger slides in from right */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-72 border-l border-white/10 bg-[#0b0f14] p-0 text-white"
          >
            {/* Header inside sheet */}
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <Image
                src={company.logo}
                alt="FlameZanzi logo"
                width={180}
                height={40}
                className="h-7 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex flex-col gap-0.5 px-4 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/10 px-4 py-5">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-auto border-t border-white/10 px-4 py-4 text-center">
              <p className="text-[11px] tracking-[0.12em] text-white/65 uppercase">
                {company.name}
              </p>
              <p className="mt-1 text-xs text-white/50">
                © {new Date().getFullYear()} {company.name}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
