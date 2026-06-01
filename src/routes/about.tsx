import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SITE_URL = "https://rocket-commerce-gen.lovable.app";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aurum — small upgrades, big difference" },
      { name: "description", content: "Aurum is a Brooklyn-based team curating obsession-worthy products that actually deliver. Here's how we pick them." },
      { property: "og:title", content: "About Aurum" },
      { property: "og:description", content: "Brooklyn-based curators of obsession-worthy products. Free US shipping, 30-day guarantee." },
      { property: "og:url", content: SITE_URL + "/about" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">About</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] text-balance">
              We hunt the internet so you don't have to.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-balance">
              Aurum is a tiny team in Brooklyn obsessed with the kind of products that feel like an upgrade — pocketable, well-made, weirdly satisfying.
              Every item is tested by hand before it ever makes it onto the shop.
            </p>
          </div>
        </section>

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">The promise</h2>
              <p className="mt-3 text-muted-foreground">
                We don't drop-ship from anonymous warehouses. Every product ships from our US warehouse within 24 hours, and every order is backed by a 30-day money-back guarantee.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight">The process</h2>
              <p className="mt-3 text-muted-foreground">
                We test hundreds of products a month. The ones that survive — the ones we actually keep using — are the only ones that make the cut.
              </p>
            </div>
          </div>

          <div className="rounded-3xl p-10 bg-foreground text-background text-center">
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Ready to find your next tiny obsession?
            </h3>
            <Button asChild size="lg" className="mt-6 h-14 px-8 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/">Shop the drop <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
