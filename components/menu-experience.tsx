"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="space-y-8">
      <Card className="border border-border/70 py-5">
        <CardContent className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Search Menu</p>
            <Input
              placeholder="Search by name, description, tags..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Diet Filter</p>
            <label className="flex items-center gap-3 text-sm">
              <Switch checked={vegOnly} onCheckedChange={setVegOnly} />
              Vegetarian only
            </label>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Order Mode</p>
            <Tabs
              value={deliveryMode}
              onValueChange={(value) => setDeliveryMode(value as "pickup" | "delivery")}
            >
              <TabsList>
                <TabsTrigger value="pickup">Pickup</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`rounded-full border px-4 py-2 text-sm ${
            activeCategory === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveCategory(category.name)}
            className={`rounded-full border px-4 py-2 text-sm ${
              activeCategory === category.name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filteredCategories.map((category) => (
          <section key={category.name} className="space-y-4">
            <h3 className="font-heading text-3xl">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>

            <div className="grid gap-4 md:grid-cols-2">
              {category.items.map((item) => (
                <Card key={item.name} className="border border-border/70 py-4">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-4 text-lg">
                      <span>{item.name}</span>
                      <span className="text-primary">${item.price.toFixed(2)}</span>
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                      {item.isVegetarian ? <Badge variant="secondary">Vegetarian</Badge> : null}
                      {item.isSpicy ? <Badge variant="destructive">Spicy</Badge> : null}
                    </div>
                    <Button onClick={() => addToCart(item.name, item.price)}>Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 ? (
          <Card className="border border-border/70 py-4">
            <CardContent className="text-muted-foreground">No menu items found for the current filters.</CardContent>
          </Card>
        ) : null}
      </div>

      <div className="fixed right-5 bottom-5 z-30">
        <Dialog>
          <DialogTrigger
            render={
              <Button size="lg" className="shadow-lg" />
            }
          >
            <ShoppingBag className="mr-2 size-4" />
            Cart ({cart.reduce((count, item) => count + item.quantity, 0)})
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Summary</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.itemName} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{item.itemName}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => adjustQuantity(item.itemName, -1)}
                        className="rounded border p-1"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-5 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => adjustQuantity(item.itemName, 1)}
                        className="rounded border p-1"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className="rounded-lg border p-3 text-sm">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Delivery: ${deliveryCharge.toFixed(2)}</p>
                <p className="font-medium">Total: ${total.toFixed(2)}</p>
              </div>

              <Link
                href={`https://wa.me/${venture.contact.whatsapp.replace("+", "")}?text=${orderText}`}
                target="_blank"
                className={`inline-flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium ${
                  cart.length === 0
                    ? "pointer-events-none bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Checkout on WhatsApp
              </Link>

              <Link
                href={venture.menuUrl}
                className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border text-sm font-medium hover:bg-muted"
              >
                Download PDF Menu
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
