"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import {
  Drumstick,
  Flame,
  Leaf,
  ListFilter,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OpeningHoursRows } from "@/components/opening-hours-rows";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { cn } from "@/lib/utils";
import type { MenuCategory, Venture } from "@/lib/site-data";

type CartItem = {
  itemName: string;
  price: number;
  quantity: number;
};

type DietFilter = "all" | "veg" | "nonveg";

type Props = {
  venture: Venture;
  categories: MenuCategory[];
};

function cartStorageKey(slug: string) {
  return `flamezanzi-cart-${slug}`;
}

function deliveryStorageKey(slug: string) {
  return `flamezanzi-delivery-${slug}`;
}

function dietStorageKey(slug: string) {
  return `flamezanzi-menu-diet-${slug}`;
}

/** Stable DOM id for in-page scroll targets (Categories nav). */
function menuCategorySectionId(ventureSlug: string, categoryName: string) {
  const slug = categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `menu-${ventureSlug}-${slug}`;
}

export function MenuExperience({ venture, categories }: Props) {
  const [search, setSearch] = useState("");
  /** Defaults match SSR; localStorage applied after mount in `rehydrated` effect. */
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");
  const [deliveryMode, setDeliveryMode] = useState<"pickup" | "delivery">("pickup");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientStateReady, setClientStateReady] = useState(false);
  /** Highlights which category nav was last chosen (scroll target); not used to filter list. */
  const [activeNavCategory, setActiveNavCategory] = useState<string>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartDockMounted, setCartDockMounted] = useState(false);
  const menuBrowseTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCartDockMounted(true);
  }, []);

  /** Rehydrate from localStorage after mount so first client paint matches server HTML. */
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(cartStorageKey(venture.slug));
      if (rawCart) {
        const parsed = JSON.parse(rawCart) as CartItem[];
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } else {
        setCart([]);
      }
      const rawDiet = localStorage.getItem(dietStorageKey(venture.slug));
      if (rawDiet === "veg" || rawDiet === "nonveg") {
        setDietFilter(rawDiet);
      } else {
        setDietFilter("all");
      }
      setDeliveryMode(
        localStorage.getItem(deliveryStorageKey(venture.slug)) === "delivery" ? "delivery" : "pickup",
      );
    } catch {
      setCart([]);
      setDietFilter("all");
      setDeliveryMode("pickup");
    }
    setClientStateReady(true);
  }, [venture.slug]);

  useEffect(() => {
    if (!clientStateReady) {
      return;
    }
    localStorage.setItem(cartStorageKey(venture.slug), JSON.stringify(cart));
  }, [clientStateReady, cart, venture.slug]);

  useEffect(() => {
    if (!clientStateReady) {
      return;
    }
    localStorage.setItem(deliveryStorageKey(venture.slug), deliveryMode);
  }, [clientStateReady, deliveryMode, venture.slug]);

  useEffect(() => {
    if (!clientStateReady) {
      return;
    }
    localStorage.setItem(dietStorageKey(venture.slug), dietFilter);
  }, [clientStateReady, dietFilter, venture.slug]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((category) => {
        const items = category.items.filter((item) => {
          const searchBlob = `${item.name} ${item.description} ${item.tags.join(" ")} ${category.name}`.toLowerCase();
          const matchesSearch = searchBlob.includes(search.toLowerCase());
          const matchesDiet =
            dietFilter === "all" ||
            (dietFilter === "veg" && item.isVegetarian) ||
            (dietFilter === "nonveg" && !item.isVegetarian);
          return matchesSearch && matchesDiet;
        });

        if (items.length === 0) {
          return null;
        }

        return { ...category, items };
      })
      .filter(Boolean) as MenuCategory[];
  }, [categories, search, dietFilter]);

  function scrollToMenuTop() {
    setActiveNavCategory("all");
    menuBrowseTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToCategorySection(categoryName: string) {
    setActiveNavCategory(categoryName);
    const id = menuCategorySectionId(venture.slug, categoryName);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function addToCart(itemName: string, price: number) {
    setCart((current) => {
      const existing = current.find((item) => item.itemName === itemName);
      if (!existing) {
        return [...current, { itemName, price, quantity: 1 }];
      }

      return current.map((item) =>
        item.itemName === itemName ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }

  function adjustQuantity(itemName: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.itemName === itemName
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(itemName: string) {
    setCart((current) => current.filter((item) => item.itemName !== itemName));
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryChargeTzs = deliveryMode === "delivery" ? 8000 : 0;
  const total = subtotal + deliveryChargeTzs;

  const fmtTzs = (n: number) => `TZS ${Math.round(n).toLocaleString("en-US")}`;

  const orderMessageLines = [
    `Hello ${venture.name}, I would like to place an order (${deliveryMode}).`,
    "",
    ...cart.map(
      (item) =>
        `- ${item.itemName} x${item.quantity} = *${fmtTzs(item.price * item.quantity)}*`,
    ),
    "",
    `*Subtotal*: ${fmtTzs(subtotal)}`,
    deliveryMode === "delivery"
      ? `*Delivery*: ${fmtTzs(deliveryChargeTzs)}`
      : "*Pickup*: No charges",
    `*Total*: ${fmtTzs(total)}`,
    "",
    "",
  ];
  const orderText = encodeURIComponent(orderMessageLines.join("\n"));

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  function formatCurrency(amount: number) {
    return `TZS ${Math.round(amount).toLocaleString("en-US")}`;
  }

  const dietOptions: { value: DietFilter; label: string; Icon: typeof Leaf }[] = [
    { value: "all", label: "All", Icon: ListFilter },
    { value: "veg", label: "Veg", Icon: Leaf },
    { value: "nonveg", label: "Non-veg", Icon: Drumstick },
  ];

  return (
    <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <Card className="border border-border/70 py-4">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <button
              type="button"
              onClick={scrollToMenuTop}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeNavCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => scrollToCategorySection(category.name)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeNavCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {category.name}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="hidden space-y-5 lg:block">
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
      </div>

      <div ref={menuBrowseTopRef} className="space-y-6 scroll-mt-28">
        <Card className="border border-border/70 py-4">
          <CardContent className="space-y-4 pt-2">
            <Input
              placeholder="Search dishes, ingredients, categories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Diet
              </p>
              <div className="grid grid-cols-3 gap-2">
                {dietOptions.map(({ value, label, Icon }) => {
                  const active = dietFilter === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDietFilter(value)}
                      className={cn(
                        "flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 text-center text-xs font-medium transition-colors sm:flex-row sm:gap-2 sm:text-sm",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="size-4 shrink-0 opacity-90" strokeWidth={1.75} aria-hidden />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="rounded-xl border border-border/70 bg-muted/25 px-3 py-3">
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Legend
              </p>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
                <li className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700">
                    <Leaf className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>Vegetarian</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-rose-500/15 text-rose-700">
                    <Flame className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>Spicy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground/80 ring-1 ring-border/60">
                    <Tag className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>Chef / category tags</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <section
              key={category.name}
              id={menuCategorySectionId(venture.slug, category.name)}
              className="scroll-mt-28 space-y-3"
            >
              <h3 className="font-heading text-4xl">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
              <div className="space-y-3">
                {category.items.map((item) => {
                  const existingQty = cart.find((entry) => entry.itemName === item.name)?.quantity ?? 0;
                  return (
                    <Card key={item.name} className="border border-border/70 py-0">
                      <CardContent className="flex flex-col gap-4 py-5 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 space-y-2">
                          <h4 className="text-xl font-semibold leading-tight">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="gap-1 font-normal">
                                <Tag className="size-3 opacity-70" aria-hidden />
                                {tag}
                              </Badge>
                            ))}
                            {item.isVegetarian ? (
                              <Badge className="gap-1 border-0 bg-emerald-600/12 font-normal text-emerald-800 hover:bg-emerald-600/12 dark:text-emerald-200">
                                <Leaf className="size-3.5 shrink-0" aria-hidden />
                                Vegetarian
                              </Badge>
                            ) : null}
                            {item.isSpicy ? (
                              <Badge className="gap-1 border-0 bg-rose-600/12 font-normal text-rose-800 hover:bg-rose-600/12 dark:text-rose-200">
                                <Flame className="size-3.5 shrink-0" aria-hidden />
                                Spicy
                              </Badge>
                            ) : null}
                          </div>
                        </div>

                        <div className="flex min-w-[170px] flex-col items-end gap-3">
                          <p className="text-xl font-semibold text-primary">{formatCurrency(item.price)}</p>
                          {existingQty > 0 ? (
                            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-2 py-1">
                              <button
                                type="button"
                                onClick={() => adjustQuantity(item.name, -1)}
                                className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-medium">{existingQty}</span>
                              <button
                                type="button"
                                onClick={() => adjustQuantity(item.name, 1)}
                                className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                          ) : (
                            <Button onClick={() => addToCart(item.name, item.price)} className="h-9 rounded-full px-5">
                              Add
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}

          {filteredCategories.length === 0 ? (
            <Card className="border border-border/70 py-4">
              <CardContent className="text-muted-foreground">
                No menu items found for the current filters.
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      {/* Viewport-bottom dock: portaled to body so position stays fixed (not trapped by grid/transform ancestors). */}
      {cartDockMounted
        ? createPortal(
            <div
              className="pointer-events-none fixed inset-x-0 bottom-0 z-40 isolate flex justify-end px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6"
              aria-live="polite"
            >
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className={cn(
                  "pointer-events-auto relative flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform hover:scale-[1.04] active:scale-[0.98]",
                  "focus-visible:ring-3 focus-visible:ring-ring/50",
                )}
                aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              >
                <ShoppingCart className="size-6" strokeWidth={1.75} />
                {cartCount > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-background bg-card px-1 text-[10px] font-bold text-foreground tabular-nums shadow-sm">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                ) : null}
              </button>
            </div>,
            document.body,
          )
        : null}

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          side="right"
          showCloseButton
          className="flex h-dvh max-h-dvh w-[min(100%,24rem)] flex-col gap-0 border-l p-0 sm:max-w-md"
        >
          <SheetHeader className="shrink-0 space-y-1 border-b border-border/70 px-5 py-4 text-left">
            <SheetTitle className="font-heading text-xl">Your cart</SheetTitle>
            <SheetDescription>{venture.name}</SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty. Add dishes from the menu.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.itemName} className="rounded-xl border border-border/70 bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold leading-snug">{item.itemName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatCurrency(item.price)} × {item.quantity} ={" "}
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.itemName)}
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted"
                        aria-label={`Remove ${item.itemName}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-end">
                      <div className="inline-flex items-center gap-3 rounded-full border border-border bg-muted/40 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.itemName, -1)}
                          className="inline-flex size-7 items-center justify-center rounded-full bg-background transition-colors hover:bg-muted"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.itemName, 1)}
                          className="inline-flex size-7 items-center justify-center rounded-full bg-background transition-colors hover:bg-muted"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div className="rounded-xl border border-dashed border-border p-4 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="tabular-nums">{formatCurrency(deliveryChargeTzs)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3 text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary tabular-nums">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <p className="mb-3 text-sm font-medium text-foreground">Receive your order</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("delivery")}
                    className={cn(
                      "flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg border px-2 text-sm font-medium transition-colors",
                      deliveryMode === "delivery"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted",
                    )}
                  >
                    <Truck className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("pickup")}
                    className={cn(
                      "flex h-12 w-full min-w-0 items-center justify-center gap-2 rounded-lg border px-2 text-sm font-medium transition-colors",
                      deliveryMode === "pickup"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-muted",
                    )}
                  >
                    <ShoppingBag className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">Pickup</span>
                  </button>
                </div>
              </div>

              <Button
                variant="outline"
                className="h-10 w-full border-border text-foreground hover:bg-muted"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Clear cart
              </Button>
            </div>
          </div>

          <SheetFooter className="shrink-0 border-t border-border/70 bg-card px-5 py-4">
            <Link
              href={
                cart.length === 0
                  ? "#"
                  : `https://wa.me/${venture.contact.whatsapp.replace(/\D/g, "")}?text=${orderText}`
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={cart.length === 0}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-11 w-full gap-2",
                cart.length === 0 && "pointer-events-none opacity-50",
              )}
              onClick={(e) => {
                if (cart.length === 0) e.preventDefault();
              }}
            >
              <WhatsAppIcon className="size-[1.05rem] text-[#25D366]" />
              Order on WhatsApp
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
