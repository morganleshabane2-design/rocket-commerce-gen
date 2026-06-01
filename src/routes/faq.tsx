import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SITE_URL = "https://rocket-commerce-gen.lovable.app";

const faqs = [
  { q: "How fast do you ship?", a: "Every in-stock order ships from our US warehouse within 24 hours (Mon–Fri). Standard delivery is 2–5 business days." },
  { q: "Is shipping really free?", a: "Yes — free standard US shipping on every order, no minimum." },
  { q: "What's your return policy?", a: "Try anything for 30 days. If it's not perfect, send it back with our pre-paid label for a full refund. No restocking fees, no questions." },
  { q: "Do you ship internationally?", a: "Not yet — we currently ship within the US only. International is coming soon." },
  { q: "Where do your products come from?", a: "We work directly with manufacturers and small studios. Every product is hand-tested by our team before being listed." },
  { q: "How do I track my order?", a: "You'll get a tracking link by email as soon as your order ships — usually within 24 hours of ordering." },
  { q: "Can I change or cancel my order?", a: "Reach out to support@aurum.shop within 2 hours of ordering and we'll do our best. After that, orders ship fast." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Aurum" },
      { name: "description", content: "Answers to common questions about shipping, returns, products, and orders at Aurum." },
      { property: "og:title", content: "Aurum FAQ" },
      { property: "og:description", content: "Shipping, returns, products, orders — answered." },
      { property: "og:url", content: SITE_URL + "/faq" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28 w-full">
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-4">Help</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">Questions, answered.</h1>
        <p className="mt-4 text-muted-foreground">
          Still need help? Email <a className="underline" href="mailto:support@aurum.shop">support@aurum.shop</a>.
        </p>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  );
}
