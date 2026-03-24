import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us | FlameZanzi",
  description: "Learn about FlameZanzi Restaurant Ltd., our mission, vision, values, and leadership.",
};

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="page-section border-b border-border/70 bg-card">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">About FlameZanzi</p>
          <h1 className="mt-3 font-heading text-5xl">Our Story</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">{company.description}</p>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-border/70 py-5">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{company.mission}</p>
            </CardContent>
          </Card>
          <Card className="border border-border/70 py-5">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{company.vision}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="page-section bg-secondary/40 py-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Core Values</p>
          <h2 className="mt-3 font-heading text-4xl">How We Operate</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {company.values.map((value) => (
              <Card key={value.title} className="border border-border/70 py-5">
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Milestones</p>
        <h2 className="mt-3 font-heading text-4xl">Growth Timeline</h2>
        <div className="mt-10 space-y-4">
          {company.milestones.map((milestone) => (
            <Card key={milestone.year} className="border border-border/70 py-4">
              <CardContent className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="font-heading text-2xl text-primary">{milestone.year}</p>
                <Separator className="hidden md:block md:w-20" />
                <p className="text-muted-foreground">{milestone.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section bg-card py-20 md:py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Leadership</p>
          <h2 className="mt-3 font-heading text-4xl">Meet Our Team</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {company.leadership.map((leader) => (
              <Card key={leader.name} className="border border-border/70 py-5">
                <CardHeader>
                  <CardTitle>{leader.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{leader.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
