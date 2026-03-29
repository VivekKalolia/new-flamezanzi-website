import { FaWhatsapp } from "react-icons/fa";

import { cn } from "@/lib/utils";

/** Official WhatsApp mark (react-icons / Font Awesome). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return <FaWhatsapp className={cn("size-[1em] shrink-0", className)} aria-hidden />;
}
