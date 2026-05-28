import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Benefits } from "@/components/Benefits";
import { SocialProof } from "@/components/SocialProof";
import { Guarantee } from "@/components/Guarantee";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum — Tiny upgrades. Massive vibes." },
      { name: "description", content: "Shop trending viral products. Free US shipping, 24h dispatch, 30-day money-back guarantee." },
      { property: "og:title", content: "Aurum — Tiny upgrades. Massive vibes." },
      { property: "og:description", content: "Shop trending viral products. Free US shipping, 24h dispatch, 30-day money-back guarantee." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <Benefits />
        <Guarantee />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
}
