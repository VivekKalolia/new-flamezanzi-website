"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { MenuCategory, Venture } from "@/lib/site-data";

type CartItem = {
  itemName: string;
  price: number;
  quantity: number;
};

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

export function MenuExperience({ venture, categories }: Props) {
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"pickup" | "delivery">(() => {
    if (typeof window === "undefined") {
      return "pickup";
    }
    return localStorage.getItem(deliveryStorageKey(venture.slug)) === "delivery"
      ? "delivery"
      : "pickup";
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    const raw = localStorage.getItem(cartStorageKey(venture.slug));
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(cartStorageKey(venture.slug), JSON.stringify(cart));
  }, [cart, venture.slug]);

  useEffect(() => {
    localStorage.setItem(deliveryStorageKey(venture.slug), deliveryMode);
  }, [deliveryMode, venture.slug]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((category) => {
        const categoryMatch = activeCategory === "all" || activeCategory === category.name;
        if (!categoryMatch) {
          return null;
        }

        const items = category.items.filter((item) => {
          const searchBlob = `${item.name} ${item.description} ${item.tags.join(" ")} ${category.name}`.toLowerCase();
          const matchesSearch = searchBlob.includes(search.toLowerCase());
          const matchesVeg = !vegOnly || item.isVegetarian;
          return matchesSearch && matchesVeg;
        });

        if (items.length === 0) {
          return null;
        }

        return { ...category, items };
      })
      .filter(Boolean) as MenuCategory[];
  }, [activeCategory, categories, search, vegOnly]);

  const allFilteredItems = useMemo(
    () => filteredCategories.flatMap((category) => category.items),
    [filteredCategories]
  );

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
  const deliveryCharge = deliveryMode === "delivery" ? 3 : 0;
  const total = subtotal + deliveryCharge;

  const orderText = encodeURIComponent(
    [
      `Hello ${venture.name}, I would like to place an order (${deliveryMode}).`,
      ...cart.map(
        (item) => `- ${item.itemName} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
      ),
      `Subtotal: $${subtotal.toFixed(2)}`,
      `Delivery: $${deliveryCharge.toFixed(2)}`,
      `Total: $${total.toFixed(2)}`,
    ].join("\n")
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  function formatCurrency(amount: number) {
    return `TZS ${Math.round(amount).toLocaleString("en-US")}`;
  }

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
              onClick={() => setActiveCategory("all")}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeCategory === "all"
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
                onClick={() => setActiveCategory(category.name)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {category.name}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border border-border/70 py-4">
          <CardContent className="space-y-4">
            <Input
              placeholder="Search dishes, ingredients, categories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <button
                type="button"
                onClick={() => setVegOnly(false)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  !vegOnly
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setVegOnly(true)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  vegOnly
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted"
                }`}
              >
                Vegetarian
              </button>
              <label className="ml-auto hidden items-center gap-2 text-sm text-muted-foreground md:flex">
                <Switch checked={vegOnly} onCheckedChange={setVegOnly} />
                Veg only
              </label>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Legend:</span> Vegetarian (green) and Spicy (red) badges
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <section key={category.name} className="space-y-3">
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
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                            {item.isVegetarian ? (
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Vegetarian</Badge>
                            ) : null}
                            {item.isSpicy ? (
                              <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-50">Spicy</Badge>
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
              <CardContent className="text-muted-foreground">No menu items found for the current filters.</CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
        <Dialog open={cartOpen} onOpenChange={setCartOpen}>
          <DialogTrigger
            render={
              <button
                type="button"
                className={cn(
                  "relative flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform hover:scale-[1.04] active:scale-[0.98]",
                  "focus-visible:ring-3 focus-visible:ring-ring/50",
                )}
                aria-label={`Shopping cart, ${cartCount} items`}
              />
            }
          >
            <ShoppingCart className="size-6" strokeWidth={1.75} />
            {cartCount > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-background bg-card px-1 text-[10px] font-bold text-foreground tabular-nums shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </DialogTrigger>
          <DialogContent className="max-h-[min(92vh,640px)] gap-5 overflow-y-auto rounded-xl p-5 ring-1 ring-foreground/10 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Your order</DialogTitle>
              <p className="text-xs text-muted-foreground">{venture.name}</p>
            </DialogHeader>

            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.itemName} className="rounded-xl border border-border/70 bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold">{item.itemName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.itemName)}
                        className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted"
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
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-muted-foreground">
                  <span>Delivery Charge</span>
                  <span>{formatCurrency(deliveryCharge)}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3 text-xl font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              <Card className="border border-border/70 bg-muted/20 py-4">
                <CardContent className="space-y-3">
                  <p className="font-medium">How would you like to receive your order?</p>
                  <Tabs
                    value={deliveryMode}
                    onValueChange={(value) => setDeliveryMode(value as "pickup" | "delivery")}
                  >
                    <TabsList className="grid h-auto w-full grid-cols-2 gap-3 bg-transparent p-0">
                      <TabsTrigger
                        value="delivery"
                        className="h-12 rounded-lg border border-border data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <Truck className="mr-2 size-4" />
                        Delivery
                      </TabsTrigger>
                      <TabsTrigger
                        value="pickup"
                        className="h-12 rounded-lg border border-border data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <ShoppingBag className="mr-2 size-4" />
                        Pickup
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                className="h-10 w-full border-border text-foreground hover:bg-muted"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Clear cart
              </Button>

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
                  "h-10 w-full gap-2",
                  cart.length === 0 && "pointer-events-none opacity-50",
                )}
                onClick={(e) => {
                  if (cart.length === 0) e.preventDefault();
                }}
              >
                <WhatsAppIcon className="size-[1.05rem] text-[#25D366]" />
                Order on WhatsApp
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
