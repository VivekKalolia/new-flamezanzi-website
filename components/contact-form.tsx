"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ventures } from "@/lib/site-data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  venture: string;
  subject: string;
  message: string;
  _gotcha: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  venture: "general",
  subject: "",
  message: "",
  _gotcha: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xwvqaqle", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Contact submission failed");
      }

      if (typeof window !== "undefined" && "gtag" in window) {
        // Optional analytics hook as documented in the legacy behavior.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "form_submission");
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(event) => setForm((state) => ({ ...state, phone: event.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Venture</Label>
          <Select
            value={form.venture}
            onValueChange={(value) =>
              setForm((state) => ({ ...state, venture: value ?? "general" }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General inquiry</SelectItem>
              {ventures.map((venture) => (
                <SelectItem key={venture.slug} value={venture.slug}>
                  {venture.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          required
          value={form.subject}
          onChange={(event) => setForm((state) => ({ ...state, subject: event.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          required
          value={form.message}
          onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))}
        />
      </div>

      <input
        type="text"
        value={form._gotcha}
        onChange={(event) => setForm((state) => ({ ...state, _gotcha: event.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button type="submit" disabled={status === "loading"} className="gap-2">
        <Send className="size-4" />
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>

      {status === "success" ? (
        <p className="text-sm text-green-700">Message sent successfully. Our team will contact you shortly.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700">Unable to submit right now. Please try again.</p>
      ) : null}
    </form>
  );
}
